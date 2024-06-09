import Image from "next/image";
import Ratings from "../Ratings/Ratings";

const TestimonialCard = ({ testimonial }) => {

    return (
        <div className='sm:break-inside-avoid'>
            <blockquote className='p-6 border rounded-lg shadow-sm bg-background dark:shadow-gray-800 sm:p-8'>
                <div className='flex items-center gap-4'>
                    <Image
                        src={testimonial?.userId?.profile_picture?.url}
                        width={56}
                        height={56}
                        className='object-cover rounded-full size-14'
                        alt="User Profile Photo"
                    />
                    <div>
                        <p className='mt-0.5 text-lg font-medium text-gray-900 dark:text-gray-100'>
                            {testimonial?.userId?.first_name} {""} {testimonial?.userId?.last_name}
                        </p>
                        <Ratings rating={testimonial?.rating} />
                    </div>
                </div>
                <p className='mt-4 text-gray-700 dark:text-gray-200'>
                    {testimonial?.content}
                </p>
            </blockquote>
        </div>
    );
};

export default TestimonialCard;