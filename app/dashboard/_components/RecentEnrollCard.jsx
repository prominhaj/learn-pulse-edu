import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/formatPrice";

const RecentEnrollCard = ({ enroll }) => {
    const { user_id, course_id } = enroll;

    return (
        <>
            <div className='flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4'>
                <Avatar className='h-9 w-9'>
                    <AvatarImage src={user_id?.profilePicture?.url} alt={user_id?.firstName + user_id?.lastName} />
                    <AvatarFallback>{user_id?.firstName?.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                    <p className='text-sm font-medium leading-none'>
                        {user_id?.firstName + " " + user_id?.lastName}
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        {user_id?.email}
                    </p>
                </div>
                <div className='ml-auto font-medium'>{formatPrice(course_id?.price)}</div>
            </div>
        </>
    );
};

export default RecentEnrollCard;