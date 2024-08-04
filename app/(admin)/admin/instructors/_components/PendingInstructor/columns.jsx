"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Trash } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

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
                <Badge className={cn("bg-gray-500 ml-4", status === "Active" ? "bg-success" : "bg-red-500 text-white")}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "actions",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Actions <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const status = row.original.status;

            return (
                <div className="flex items-center gap-1.5">
                    <Button variant="destructive" size="sm" className="flex items-center gap-1 bg-green-500 cursor-pointer hover:bg-green-400">
                        <Check className="w-4 h-4" />
                        Accept
                    </Button>
                    <Button variant="destructive" size="sm" className="flex items-center gap-1 cursor-pointer">
                        <Trash className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            );
        },
    }
];
