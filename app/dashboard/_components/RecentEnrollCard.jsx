import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/formatPrice";

const RecentEnrollCard = ({ enroll }) => {
    const { user_id, course_id } = enroll;

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center justify-between gap-3">
                <Avatar>
                    <AvatarImage src={user_id?.profilePicture.url} alt={user_id?.firstName + user_id?.lastName} />
                    <AvatarFallback>{user_id?.firstName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                    <h4 className="font-medium">
                        {user_id?.firstName + " " + user_id?.lastName}
                    </h4>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                        {user_id?.email}
                    </p>
                </div>
            </div>
            <h4 className="mr-3 font-medium">{formatPrice(course_id?.price)}</h4>
        </div>
    );
};

export default RecentEnrollCard;