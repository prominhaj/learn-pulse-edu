import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const RecentEnrollCard = () => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center justify-between gap-3">
                <Avatar>
                    <AvatarImage src="/assets/images/profile.jpg" alt="Profile Photo" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                    <h4 className="font-medium">Md Minhaj</h4>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
                        parsonal322532@gmail.com
                    </p>
                </div>
            </div>
            <div className="mr-3">$5000</div>
        </div>
    );
};

export default RecentEnrollCard;