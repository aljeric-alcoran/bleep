export default function AppHomeCategories() {
   return (
      <>
         <div className="w-full border border-gray-200 rounded-sm bg-white">
            <div className="uppercase text-sm font-semibold p-5 border-b">
               Categories
            </div>
            <div className="grid grid-cols-10">
               <div className="flex flex-col items-center gap-6 border border-gray-100 py-5 hover:shadow-xs cursor-pointer">
                  <span className="p-2 rounded-full bg-gray-100 w-12 h-12">
                     { /* Image here */}
                  </span>
                  <span className="text-xs text-center">Men's Apparell</span>
               </div>

               <div className="flex flex-col items-center gap-6 border border-gray-100 py-5 hover:shadow-xs cursor-pointer">
                  <span className="p-2 rounded-full bg-gray-100 w-12 h-12">
                     { /* Image here */}
                  </span>
                  <span className="text-xs text-center">Men's Apparell</span>
               </div>

               <div className="flex flex-col items-center gap-6 border border-gray-100 py-5 hover:shadow-xs cursor-pointer">
                  <span className="p-2 rounded-full bg-gray-100 w-12 h-12">
                     { /* Image here */}
                  </span>
                  <span className="text-xs text-center">Men's Apparell</span>
               </div>

               <div className="flex flex-col items-center gap-6 border border-gray-100 py-5 hover:shadow-xs cursor-pointer">
                  <span className="p-2 rounded-full bg-gray-100 w-12 h-12">
                     { /* Image here */}
                  </span>
                  <span className="text-xs text-center">Men's Apparell</span>
               </div>
            </div>
         </div>
      </>
   );
}