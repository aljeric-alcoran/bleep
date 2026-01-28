import { Product } from "@/@types";

export default function ProductDetails({ 
   product 
} : { 
   product: Product 
}) {
   return (
      <div className="w-full shadow rounded-sm bg-white mt-5 p-5">
         <h2 className="rounded-xs py-2 px-4 bg-gray-100 text-md font-medium">Product Description</h2>
         <div className="px-4 text-sm mt-5">
            {product.description}
         </div>
      </div>
   )
}