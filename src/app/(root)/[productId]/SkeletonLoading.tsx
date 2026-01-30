import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoading() {
   return (
      <>
         <div className="w-full shadow rounded-sm bg-white">
            <div className="flex">
               <div className="w-[750px] p-5">
                  <Skeleton className="w-full h-100 rounded-sm"/>
                  <div className="flex items-center justify-between gap-2 mt-3">
                     <Skeleton className="w-20 h-20 rounded-sm"/>
                     <Skeleton className="w-20 h-20 rounded-sm"/>
                     <Skeleton className="w-20 h-20 rounded-sm"/>
                     <Skeleton className="w-20 h-20 rounded-sm"/>
                     <Skeleton className="w-20 h-20 rounded-sm"/>
                  </div>
               </div>
               <div className="w-full p-5 pr-8">
                  <Skeleton className="h-[32px] w-full rounded-sm" />

                  <div className="flex items-center bg-accent p-4 mt-3 rounded-sm">
                     <span className="font-bold text-base text-accent mt-1">₱</span>
                  </div>

                  <div className="flex gap-10 items-center text-sm mt-8">
                     <Skeleton className="h-4 w-18 rounded-sm" />
                     <Skeleton className="h-4 w-24 rounded-sm" />
                  </div>
                  
                  <div className="flex gap-10 items-center text-sm mt-8">
                     <Skeleton className="h-4 w-18 rounded-sm" />
                     <Skeleton className="h-[32px] w-34 rounded-sm" />
                  </div>

                  <div className="flex space-x-4 mt-8">
                     <Skeleton className="h-[45px] w-50 rounded-sm" />
                     <Skeleton className="h-[45px] w-50 rounded-sm" />
                  </div>
               </div>

            </div>
         </div>

         <div className="w-full shadow rounded-sm bg-white mt-5 p-5">
            <div className="flex items-center gap-4">
               <Skeleton className="w-20 h-20 rounded-sm"/>
               <div className="flex flex-col gap-4">
                  <Skeleton className="h-[20px] w-38 rounded-sm" />
                  <div className="flex space-x-2">
                     <Skeleton className="h-[32px] w-28 rounded-sm" />
                     <Skeleton className="h-[32px] w-28 rounded-sm" />
                  </div>
               </div>
            </div>
         </div>

         <div className="w-full shadow rounded-sm bg-white mt-5 p-5">
            <h2 className="rounded-xs py-2 px-4 bg-gray-100 text-md font-medium text-gray-100">Product Details</h2>
            <div className="space-y-3 text-sm mt-5">
               <Skeleton className="h-3 w-2/3 rounded-sm" />
               <Skeleton className="h-3 w-2/3 rounded-sm" />
               <Skeleton className="h-3 max-w-1/3 rounded-sm" />
               <Skeleton className="h-3 w-2/3 mt-5 rounded-sm" />
               <Skeleton className="h-3 w-2/3 rounded-sm" />
               <Skeleton className="h-3 max-w-1/4 rounded-sm" />
            </div>
         </div>
      </>
   );
}