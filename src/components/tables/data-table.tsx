"use client"
 
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table"
 
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input";
import { useState } from "react"
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { Spinner } from "@/components/ui/spinner";
 
interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[],
   addActionSlot?: React.ReactNode,
   loading?: boolean
}
 
export function DataTable<TData, TValue>({
   columns,
   data,
   addActionSlot,
   loading
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
   const [rowSelection, setRowSelection] = useState({});

   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
         rowSelection,
      },
   })
 
   return (
      <>
         <div className="flex justify-between items-center">
            <div className="flex items-center py-4">
               <Input
                  placeholder="Filter name..."
                  value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                     table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="w-96 max-w-sm"
               />
            </div>
            <div className="flex justify-center items-center gap-2">
               <DataTableViewOptions table={table} />
               {addActionSlot && (addActionSlot)}
            </div>
         </div>
         <div className="overflow-hidden rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                       header.column.columnDef.header,
                                       header.getContext()
                                    )
                                 }
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               {loading ? (
                  <TableBody>
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24">
                           <div className="w-full flex justify-center items-center gap-2">
                              <Spinner/> Fetching data...
                           </div>
                        </TableCell>
                     </TableRow>
                  </TableBody>
               ) : (
                  <TableBody>
                     {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && "selected"}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell colSpan={columns.length} className="h-24 text-center">
                              No results.
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               )}
            </Table>
         </div>
         <DataTablePagination table={table}/>
      </>
   )
}