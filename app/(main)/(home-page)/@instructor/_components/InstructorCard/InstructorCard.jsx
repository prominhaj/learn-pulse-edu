import { CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCourseDetailsByInstructor } from "@/queries/courses";

const InstructorCard = async ({ instructor }) => {
    const { courses, enrollments, reviews, ratings } = await getCourseDetailsByInstructor(instructor?.id);

    return (
        <>
            <div className="relative flex flex-col justify-between w-full transition-all duration-500 ease-in-out border rounded-md bg-background">
                <div className="absolute h-[150px] w-40 -rotate-45 rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-800 opacity-30 blur-3xl filter lg:h-28 lg:w-[250px] lg:opacity-20 xl:h-40" />

                <CardHeader className="bg-[#F8FAFC] dark:bg-[#0F172A] p-6 flex flex-col items-center">
                    <Avatar className="w-20 h-20">
                        <AvatarImage className="object-cover" src={instructor?.profilePicture?.url} />
                        <AvatarFallback>{instructor?.firstName}</AvatarFallback>
                    </Avatar>
                    <div className="mt-4 text-center">
                        <h3 className="text-xl font-semibold">{instructor?.firstName + " " + instructor?.lastName}</h3>
                        <p className="text-muted-foreground">{instructor?.designation}</p>
                        <p className="text-sm text-muted-foreground">{instructor?.role}</p>
                    </div>
                </CardHeader>
                <CardContent className="grid items-center justify-between gap-2 p-6 sm:grid-cols-2 text-muted-foreground">
                    <h4 className="text-sm font-medium">Courses: {courses}</h4>
                    <h4 className="text-sm font-medium">Enrollments: {enrollments}</h4>
                    <h4 className="text-sm font-medium">Reviews: {reviews}</h4>
                    <h4 className="text-sm font-medium">Ratings: {ratings}</h4>
                </CardContent>
                <CardFooter>
                    <Link
                        href={`/instructor/${instructor?.id}/courses`}
                        className={cn(buttonVariants({ variant: "outline" }), "w-full rounded-3xl")}>Details</Link>
                </CardFooter>
            </div>
        </>
    )
}

export default InstructorCard;