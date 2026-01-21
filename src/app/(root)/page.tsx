import AppFooter from "@/components/app-footer";
import AppHomeCategories from "@/components/app-home-categories";
import AppProductListings from "@/components/app-product-listings";

export default function Home() {
   return (
      <>
         <div className="w-full mx-auto bg-gray-50 py-8">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
               <AppHomeCategories />
               <AppProductListings/>
            </div>
         </div>
         <AppFooter />
      </>
   );
}
