import AppHeader from "@/components/app-header";
import AppHomeCategories from "@/components/app-home-categories";
import AppSearch from "@/components/app-search";

export default function Home() {
   return (
      <>
         <header className="border-b pb-6 bg-linear-to-t from-red-600 to-red-800 text-white">
            <nav className="bg-transparent border-gray-200 px-4 lg:px-6 mx-auto max-w-screen-xl">
               <div className="w-full flex flex-wrap justify-between items-center">
                  <AppHeader />
                  <AppSearch />
               </div>
            </nav>
         </header>
         <div className="w-full mx-auto bg-gray-50 py-8">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
               <AppHomeCategories />
            </div>
         </div>
      </>
   );
}
