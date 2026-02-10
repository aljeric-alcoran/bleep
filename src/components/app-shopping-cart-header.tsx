import AppHeader from "@/components/app-header";
import SearchMain from "./header/search-main";
import BleepBrand from "./header/bleep-brand";

export default function AppShoppingCartHeader() {
   return (
      <header className="border-b pb-6 bg-linear-to-t from-red-600 to-red-800 text-white">
         <nav className="bg-transparent border-gray-200 px-4 lg:px-6 mx-auto max-w-screen-xl">
            <div className="w-full flex flex-wrap justify-between items-center">

               <AppHeader />

               <div className="w-full max-w-7xl flex flex-wrap justify-between items-center py-5">
                  <div className="w-full flex items-center justify-between gap-10">
                     <BleepBrand optext="Shopping Cart"/>
                     <SearchMain inputWidth="600px"/>
                  </div>
               </div>
            </div>
         </nav>
      </header>
   )
}