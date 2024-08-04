"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GraduationCap, Trash } from "lucide-react";
import { Star } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

export const columns = [
    {
        accessorKey: "image",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                >
                    Photo
                </Button>
            );
        },
        cell: ({ row }) => {
            const photo = row?.original?.image;
            const name = row?.original?.name;

            return <div className="ml-3">
                <Avatar>
                    <AvatarImage className="object-cover" src={photo} alt={name} />
                    <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>
            </div>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        }
    },
    {
        accessorKey: "courses",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Course <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const courses = row.original.courses;

            return (
                <div className="ml-4">
                    {courses}
                </div>
            );
        },
    },
    {
        accessorKey: "enrollments",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Enrollment <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const enrollments = row.original.enrollments;

            return (
                <div className="ml-4">
                    {enrollments}
                </div>
            );
        },
    },
    {
        accessorKey: "ratings",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rating <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const ratings = row.original.ratings;

            return (
                <div className="ml-4">
                    {ratings}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <Badge className={cn("bg-gray-500 ml-4", status === "Active" && "bg-success")}>
                    {status === "Active" && "Active"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <button className="w-full">
                            <DropdownMenuItem className="flex items-center w-full gap-2 cursor-pointer">
                                <Trash className="w-4 h-4" />
                                Delete
                            </DropdownMenuItem>
                        </button>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
