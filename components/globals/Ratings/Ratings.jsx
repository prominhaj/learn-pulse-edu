import Image from "next/image";
import ratingIcon from "@/assets/Courses/rating-icon.png";

const Ratings = ({ rating }) => {
    const validRating = Math.max(0, Math.min(rating, 5));

    return (
        <div className='flex items-center gap-0.5'>
            {
                Array.from({ length: validRating }).map((_, index) => (
                    <Image key={index} src={ratingIcon} width={20} height={20} alt="Rating" />
                ))
            }
        </div>
    );
};

export default Ratings;
