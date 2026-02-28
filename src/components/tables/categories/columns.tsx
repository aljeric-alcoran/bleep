"use client"
 
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "../data-table-column-header";
import { UpdateCategory } from "@/app/(account)/categories/update-category";
import { useState } from "react";
import { DeleteCategory } from "@/app/(account)/categories/delete-category";
 
export type Category = {
   _id?: string
   name: string
   order?: number
   isActive?: boolean
}
 
export const columns: ColumnDef<Category>[] = [
   {
      id: "select",
      header: ({ table }) => (
         <Checkbox
            checked={
               table.getIsAllPageRowsSelected() ||
               (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
         />
      ),
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorKey: "name",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Name" />
      ),
   },
   {
      accessorKey: "description",
      header: ({ column }) => (
         <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({row}) => {
         const description = row.getValue("description") as string | undefined;
         return ( description ? <div className="w-90 truncate">{description}</div> : 'No description provided.')
      }
   },
   {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
         const active = row.getValue("isActive");
         return (
            <span
               className={
                  active
                     ? "text-green-600 font-medium"
                     : "text-red-500 font-medium"
               }
            >
               {active ? "Active" : "Inactive"}
            </span>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const [openEdit, setOpenEdit] = useState(false);
         const [openDelete, setOpenDelete] = useState(false);
         const category = row.original;
         return (
            <>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                        Edit
                     </DropdownMenuItem>
                     <DropdownMenuItem className="text-primary" onClick={() => setOpenDelete(true)}>
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
               <UpdateCategory open={openEdit} setOpen={setOpenEdit} category={category} />
               <DeleteCategory open={openDelete} setOpen={setOpenDelete} category={category} />
            </>
         )
      },
   },
]