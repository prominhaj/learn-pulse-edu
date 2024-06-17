"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const studentName = row.original.studentName;
      return (
        <div className="ml-3">
          {studentName}
        </div>
      );
    }
  },
  {
    accessorKey: "studentEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Email <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "quizMark",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quiz Mark <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quizMark = row.original.quizMark;
      return (
        <div className="ml-5">
          {quizMark}
        </div>
      );
    }
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Progress <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const progress = row.original.progress;
      return (
        <div className="ml-5">
          {progress || 0} %
        </div>
      );
    }
  },
  {
    accessorKey: "enrollment_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Enroll Date <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const enrollment_date = row.original.enrollment_date;
      return (
        <div className="ml-3">
          {moment(enrollment_date).format('lll')}
        </div>
      );
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const { id } = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="w-8 h-4 p-0">
  //             <span className="sr-only">Open Menu</span>
  //             <MoreHorizontal className="w-4 h-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <Link href={`/dashboard/courses/${id}`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               <Pencil className="w-4 h-4 mr-2" />
  //               Edit
  //             </DropdownMenuItem>
  //           </Link>
  //           <Link href={`/dashboard/courses/${id}/enrollments`}>
  //             <DropdownMenuItem className="cursor-pointer">
  //               <GraduationCap className="w-4 h-4 mr-2" />
  //               View Enrollments
  //             </DropdownMenuItem>
  //           </Link>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
