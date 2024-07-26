import { CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const InstructorCard = async ({ instructor }) => {
    const { id, firstName, lastName, role, designation, profilePicture: { url }, bio } = instructor;

    return (
        <>
            <div className="flex flex-col justify-between w-full transition-all duration-500 ease-in-out border rounded-md bg-background">
                <CardHeader className="bg-[#F8FAFC] dark:bg-[#0F172A] p-6 flex flex-col items-center">
                    <Avatar className="w-20 h-20">
                        <AvatarImage className="object-cover" src={url} />
                        <AvatarFallback>{firstName}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                        <h3 className="text-xl font-semibold">{firstName + " " + lastName}</h3>
                        <p className="text-muted-foreground">{designation}</p>
                        <p className="text-sm text-muted-foreground">{role}</p>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div>
                        <h4 className="text-sm font-medium">About</h4>
                        <p className="text-muted-foreground">
                            {bio}
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/instructor/${id}/courses`}
                        className={cn(buttonVariants({ variant: "secondary" }), "w-full rounded-3xl")}>Details</Link>
                </CardFooter>
            </div>
        </>
    )
}

export default InstructorCard;