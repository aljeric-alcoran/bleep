export default function CartHeader() {
   return (
      <div className="w-full shadow rounded-sm bg-white p-5 px-8 text-sm font-medium text-gray-800">
         <div className="grid grid-cols-2 items-center gap-4">
            <div>
               <p>Product</p>
            </div>
            <div className="grid grid-cols-4 justify-items-center gap-4">
               <p>Unit Price</p>
               <p>Quantity</p>
               <p>Total Price</p>
               <p>Actions</p>
            </div>
         </div>
      </div>
   );
}