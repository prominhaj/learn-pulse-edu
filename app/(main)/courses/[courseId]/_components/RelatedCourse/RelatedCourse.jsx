import CourseCard from "@/components/globals/CourseCard/CourseCard";
import { SectionTitle } from "@/components/globals/SectionTitle/SectionTitle";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const RelatedCourse = ({ relatedCourses }) => {

    return (
        <section className='pb-8 sm:pb-10 md:pb-16'>
            <div className='container'>
                <SectionTitle className='mb-6'>Related Courses</SectionTitle>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    className='max-2xl:w-[90%] w-full mx-auto'
                >
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent>
                        {relatedCourses.map((course) => (
                            <CarouselItem key={course.id} className='md:basis-1/2 lg:basis-1/3'>
                                <CourseCard course={course} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default RelatedCourse;