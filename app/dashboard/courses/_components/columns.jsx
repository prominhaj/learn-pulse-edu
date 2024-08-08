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
import { Star } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import AdminCourseDelete from "./admin-course-delete";

export const columns = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="ml-3">{formatted}</div>;
    },
  },
  {
    accessorKey: "modules",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Module <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const modules = row.getValue("modules") || false;
      return <div className="ml-3">{modules?.length}</div>;
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Published <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("active") || false;

      return (
        <Badge className={cn("bg-gray-500 ml-4", isPublished && "bg-success")}>
          {isPublished ? "Published" : "Unpublished"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Update <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const lastUpdate = row.getValue("updatedAt");
      return (
        <>
          <div className="ml-3">{moment(lastUpdate).calendar()}</div>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;
      const admin = row?.original?.admin;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {
              admin ? (
                <>

                  <Link href={`/admin/courses/${id}/enrollments`}>
                    <DropdownMenuItem className="cursor-pointer">
                      Enrollments
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer">
                    <AdminCourseDelete id={id} />
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href={`/dashboard/courses/${id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/dashboard/courses/${id}/enrollments`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      View Enrollments
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/dashboard/courses/${id}/reviews`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Star className="w-4 h-4 mr-2 fill-primary" />
                      View Reviews
                    </DropdownMenuItem>
                  </Link>
                </>
              )
            }

          </DropdownMenuContent>
        </DropdownMenu >
      );
    },
  },
];
