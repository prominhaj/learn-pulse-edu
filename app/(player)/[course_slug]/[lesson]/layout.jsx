// import { CourseProgress } from "@/components/course-progress";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { Lock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { CourseSidebar } from "./_components/course-sidebar";

const CourseLayout = ({ children }) => {
  return (
    <div className="">
      <div className="h-[80px] lg:pl-96 fixed inset-y-0 w-full z-50">
        <div className="flex items-center h-full p-4 bg-white border-b shadow-sm">
          {/* Course Sidebar For Mobile */}
          <CourseSidebarMobile />
          {/* <NavbarRoutes /> */}
        </div>
      </div>
      <div className="fixed inset-y-0 z-50 flex-col hidden h-full lg:flex w-96">
        {/* sidebar starts */}
        <CourseSidebar />
        {/* sidebar ends */}
      </div>
      <main className="lg:pl-96 pt-[80px] h-full">{children}</main>
    </div>
  );
};
export default CourseLayout;
