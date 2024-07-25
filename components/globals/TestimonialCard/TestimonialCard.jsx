import Ratings from "../Ratings/Ratings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialCard = ({ testimonial }) => {

    return (
        <div className='sm:break-inside-avoid'>
            <blockquote className='p-6 border rounded-lg shadow-sm bg-background dark:shadow-gray-800 sm:p-8'>
                <div className='flex items-center gap-4'>
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial?.userId?.profilePicture?.url} />
                        <AvatarFallback>{testimonial?.userId?.firstName}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='mt-0.5 text-lg font-medium text-gray-900 dark:text-gray-100'>
                            {testimonial?.userId?.firstName} {""} {testimonial?.userId?.lastName}
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