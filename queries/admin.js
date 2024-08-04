import { replaceMongoIdInArray } from '@/lib/convertData';
import Enrollment from '@/modals/enrollment-model';
import User from '@/modals/users-modal';

export const calculateSales = async () => {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Calculate Total Sales
    const totalSalesData = await Enrollment.aggregate([
        { $match: { status: 'complete' } },
        {
            $lookup: {
                from: 'courses',
                localField: 'course_id',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: '$course' },
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$course.price' }
            }
        }
    ]);

    const totalSales = totalSalesData.length ? totalSalesData[0].totalSales : 0;

    // Calculate Last Month's Sales
    const lastMonthSalesData = await Enrollment.aggregate([
        {
            $match: {
                status: 'complete',
                enrollment_date: { $gte: startOfLastMonth, $lt: startOfThisMonth }
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course_id',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: '$course' },
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$course.price' }
            }
        }
    ]);

    const lastMonthSales = lastMonthSalesData.length ? lastMonthSalesData[0].totalSales : 0;

    // Calculate This Month's Sales
    const thisMonthSalesData = await Enrollment.aggregate([
        {
            $match: {
                status: 'complete',
                enrollment_date: { $gte: startOfThisMonth }
            }
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course_id',
                foreignField: '_id',
                as: 'course'
            }
        },
        { $unwind: '$course' },
        {
            $group: {
                _id: null,
                totalSales: { $sum: '$course.price' }
            }
        }
    ]);

    const thisMonthSales = thisMonthSalesData.length ? thisMonthSalesData[0].totalSales : 0;

    // Calculate the Percentage Change
    let percentChange = 0;
    if (lastMonthSales > 0) {
        percentChange = ((thisMonthSales - lastMonthSales) / lastMonthSales) * 100;
    }

    return {
        totalSales,
        lastMonthSales,
        thisMonthSales,
        percentChange: parseFloat(percentChange.toFixed(2))
    };
};

export const getAdminInstructors = async (type) => {
    try {
        const adminInstructors = await User.find({
            role: type
        })
            .select('-password')
            .lean();

        return replaceMongoIdInArray(adminInstructors);
    } catch (error) {
        throw new Error(error);
    }
};
