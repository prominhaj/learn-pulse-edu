import { replaceMongoIdInArray, replaceMongoIdInObject } from '@/lib/convertData';
import Category from '@/modals/categories-modal';
import Course from '@/modals/courses-modal';
import Module from '@/modals/modules-modal';
import Testimonial from '@/modals/testimonials-modal';
import User from '@/modals/users-modal';
import { getTestimonialsForCourse } from './testimonials';
import { getEnrollmentsForCourse } from './enrollments';
import { getUserData } from '@/lib/getUserData';
import Lesson from '@/modals/lessons-modal';

export const getCourses = async (isHome) => {
    try {
        const courses = await Course.find({
            active: true
        })
            .select([
                'title',
                'subtitle',
                'thumbnail',
                'modules',
                'price',
                'category',
                'updatedAt',
                'active'
            ])
            .populate({
                path: 'category',
                model: Category
            })
            .populate({
                path: 'modules',
                model: Module,
                match: { active: true },
                options: { sort: { order: 1 } }
            })
            .limit(isHome && 8)
            .sort(isHome && { _id: -1 })
            .lean();

        return replaceMongoIdInArray(courses);
    } catch (error) {
        throw new Error(error);
    }
};

// Create Course
export const createCourse = async (courseData) => {
    try {
        const user = await getUserData();
        const course = await Course.create({
            ...courseData,
            instructor: user?.id
        });

        return JSON.parse(JSON.stringify(course));
    } catch (error) {
        throw new Error(error);
    }
};

export const getCourseDetails = async (id, isCourseEditPage) => {
    try {
        const course = await Course.findById(id)
            .populate({
                path: 'category',
                model: Category
            })
            .populate({
                path: 'instructor',
                model: User
            })
            .populate({
                path: 'testimonials',
                model: Testimonial,
                populate: {
                    path: 'userId',
                    model: User
                }
            })
            .populate({
                path: 'modules',
                model: Module,
                options: { sort: { order: 1 } },
                populate: {
                    path: 'lessonIds',
                    model: Lesson,
                    options: { sort: { order: 1 } }
                }
            })
            .lean();

        // use isCourseEditPage
        if (isCourseEditPage) {
            return replaceMongoIdInObject(course);
        }

        // Check Course Not Active
        if (!course.active) {
            throw new Error('Course is not active');
        }

        const relatedCourse = await Course.find({
            category: course.category._id,
            active: true,
            _id: { $ne: id }
        }).lean();

        return {
            course: replaceMongoIdInObject(course),
            relatedCourses: relatedCourse?.length > 0 ? replaceMongoIdInArray(relatedCourse) : false
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const getCourseDetailsByInstructor = async (instructorId) => {
    // Fetch all courses by instructor in one query
    const courses = await Course.find({ instructor: instructorId }).lean();

    if (courses.length === 0) {
        return {
            courses: 0,
            enrollments: 0,
            reviews: 0,
            ratings: 0
        };
    }

    // Extract course IDs for batch processing
    const courseIds = courses.map((course) => course._id.toString());

    // Fetch all enrollments and testimonials in parallel
    const [enrollments, testimonials] = await Promise.all([
        Promise.all(courseIds.map((courseId) => getEnrollmentsForCourse(courseId))),
        Promise.all(courseIds.map((courseId) => getTestimonialsForCourse(courseId)))
    ]);

    // Flatten the enrollments and testimonials arrays
    const totalEnrollments = enrollments.flat().length;
    const totalTestimonials = testimonials.flat();

    // Calculate average rating
    const avgRating =
        totalTestimonials.reduce((acc, { rating }) => acc + rating, 0) / totalTestimonials.length;

    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: totalTestimonials.length > 0 ? avgRating.toPrecision(2) : 0
    };
};

export const getCoursesByInstructorId = async (instructorId) => {
    try {
        const courses = await Course.find({ instructor: instructorId }).lean();

        return replaceMongoIdInArray(courses);
    } catch (error) {
        throw new Error(error);
    }
};

export const getCourseByCourseId = async (courseId) => {
    try {
        const course = await Course.findById(courseId)
            .populate({
                path: 'modules',
                model: Module,
                match: { active: true },
                options: { sort: { order: 1 } },
                populate: {
                    path: 'lessonIds',
                    model: Lesson,
                    match: { active: true }
                }
            })
            .lean();

        if (!course) {
            return {
                success: false,
                message: 'Course not found'
            };
        }

        return replaceMongoIdInObject(course);
    } catch (error) {
        throw new Error(error);
    }
};

export const coursesByFilter = async ({ search, categories, price, sort }) => {
    try {
        let filter = { active: true };

        // Handle search query
        if (search) {
            const regex = new RegExp(search, 'i');
            filter.$or = [{ title: { $regex: regex } }, { sub_title: { $regex: regex } }];
        }

        // Handle categories filter
        if (categories && categories.length > 0) {
            const categoryNames = categories;
            const categoryIds = await Category.find({ title: { $in: categoryNames } }).distinct(
                '_id'
            );
            filter.category = { $in: categoryIds };
        }

        // Handle price filter
        if (price) {
            if (price === 'free') {
                filter.price = { $eq: 0 };
            } else if (price === 'paid') {
                filter.price = { $gt: 0 };
            }
        }

        // Determine sort order based on price
        let sortCriteria = {};
        if (sort === 'asc') {
            sortCriteria = { price: 1 };
        } else if (sort === 'desc') {
            sortCriteria = { price: -1 };
        }

        // Query courses based on filter and sort criteria
        const courses = await Course.find(filter)
            .select(['title', 'sub_title', 'thumbnail', 'modules', 'price', 'category'])
            .populate({
                path: 'category',
                model: Category,
                select: 'title'
            })
            .populate({
                path: 'modules',
                model: Module,
                select: 'title'
            })
            .sort(sortCriteria)
            .lean();

        return replaceMongoIdInArray(courses);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTotalCourse = async () => {
    try {
        const totalCourse = await Course.estimatedDocumentCount();
        return totalCourse;
    } catch (error) {
        throw new Error(error);
    }
};
