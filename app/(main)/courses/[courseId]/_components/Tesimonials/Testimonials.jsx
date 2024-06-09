import { SectionTitle } from "@/components/globals/SectionTitle/SectionTitle";
import TestimonialCard from "@/components/globals/TestimonialCard/TestimonialCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Testimonials = ({ testimonials }) => {
    const { } = testimonials;
    console.log(testimonials);

    return (
        <section className='pb-8 md:pb-12 lg:pb-24'>
            <div className='container'>
                <SectionTitle className='mb-6'>Testimonials</SectionTitle>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    className='max-2xl:w-[90%] w-full mx-auto'
                >
                    <CarouselPrevious />
                    <CarouselNext />
                    <CarouselContent className='py-4'>
                        {testimonials.map((testimonial) => (
                            <CarouselItem key={testimonial.id} className='md:basis-1/2 lg:basis-1/3'>
                                <TestimonialCard testimonial={testimonial} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )

};

export default Testimonials;