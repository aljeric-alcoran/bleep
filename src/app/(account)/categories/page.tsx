"use client"

import { columns } from '@/components/tables/categories/columns'
import { DataTable } from '@/components/tables/data-table';
import { AddCategoryForm } from '@/components/forms/add-category-form';
import { LayoutList } from 'lucide-react';
import { allCategories } from '@/lib/api/categories';
import { useEffect, useState } from 'react';

export default function Categories() {
   const [categories, setCategories] = useState([])


   useEffect(() => {
      async function fetchCategories() {
        const { data } = await allCategories();
        setCategories(data)
        console.log(data);
      }
  
      fetchCategories();
    }, []);

   return (
      <>
         <div className="flex items-center gap-2">
            <LayoutList className="w-5"/>
            <h1 className="text-lg font-semibold">Categories</h1>
         </div>

         <div className="container mx-auto pt-5 pb-10">
            <DataTable 
               columns={columns} 
               data={categories} 
               addActionSlot={
                  <AddCategoryForm/>
               }
            />
         </div>
      </>
   );
}