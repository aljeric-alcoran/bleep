export default function AppFooter() {
   const year  = new Date().getFullYear();
   return (
      <footer className="w-full bg-gray-50">
         <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
            <div className="w-full py-12 border-t flex items-center justify-between">
               <p className="text-center text-sm leading-6 text-gray-500">
                  &copy; {year} Bleep. All rights reserved.
               </p>
               <p className="text-center text-sm leading-6 text-gray-500">
                  Country & Region: Philippines
               </p>
            </div>
         </div>
      </footer>
   );
}