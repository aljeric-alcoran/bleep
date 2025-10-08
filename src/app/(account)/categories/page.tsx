import { columns, Category } from '@/components/tables/categories/columns'
import { DataTable } from '@/components/tables/data-table';

async function getData(): Promise<Category[]> {
   return [
      {
         id: "728ed52f",
         name: "Electronics",
         order: 1,
         isActive: "Active",
      }
   ]
}

export default async function Categories() {
   const data = await getData()

   return (
      <>
         <div className="flex">
            <h1 className="text-lg font-semibold">Categories</h1>
         </div>

         <div className="container mx-auto pt-5 pb-10">
            <DataTable columns={columns} data={data} />
         </div>
      </>
   );
}