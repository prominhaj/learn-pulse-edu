"use client";

import useAuth from "@/hooks/useAuth";
import { SidebarItem } from "./sidebar-item";
import { BarChart, Users } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { BookA } from 'lucide-react';
import { Radio } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

const instructorRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/dashboard'
  },
  {
    icon: BookOpen,
    label: 'Courses',
    href: '/dashboard/courses'
  },
  {
    icon: BookOpen,
    label: 'Add Course',
    href: '/dashboard/courses/add'
  },
  {
    icon: Radio,
    label: 'Lives',
    href: '/dashboard/lives'
  },
  {
    icon: BookA,
    label: 'Quizes',
    href: '/dashboard/quiz-sets'
  }
];

const adminRoutes = [
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/admin/dashboard'
  },
  {
    icon: BookOpen,
    label: 'Courses',
    href: '/admin/courses'
  },
  {
    icon: Users,
    label: 'Instructors',
    href: '/admin/instructors'
  },
]


export const SidebarRoutes = () => {
  const { user, status } = useAuth();
  const routes = user?.role === "Admin" ? adminRoutes : instructorRoutes;

  return (
    <div className="flex flex-col w-full">
      {
        status === "loading" ? (
          <div className="flex flex-col gap-1.5 mt-4 items-center justify-center px-5">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        ) : (
          routes?.map((route) => (
            <SidebarItem
              key={route.href}
              icon={route.icon}
              label={route.label}
              href={route.href}
            />
          ))
        )
      }
    </div>
  );
};
