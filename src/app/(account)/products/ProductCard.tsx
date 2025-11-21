import Image from 'next/image'
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

export default function ProductCard() {
   return (
      <>
         <div className="w-54">
            <Item variant="outline" className="p-0 overflow-hidden shadow">
               <ItemContent className="gap-0">
                  <div className="w-full h-[200px] relative border-b">
                     <Image
                        className="object-cover"
                        src="/default-product.jpg"
                        alt="Product Image"
                        priority
                        fill
                     />
                  </div>
                  <div className='p-3'>
                     <ItemTitle className="text-xs">iPhone Case</ItemTitle>
                     <ItemDescription className="text-xs line-clamp-1">
                        iPhone case - iPhone X, iPhone 11, iPhone 12, iPhone 13, iPhone 14.
                     </ItemDescription>
                     <div className='mt-4 font-semibold'>₱ 1000.00</div>
                     <p className='mt-4 text-gray-500 text-xs line-clamp-1'>Poblacion, Ramon Magsaysay</p>
                  </div>
               </ItemContent>
            </Item>
         </div>
      </>
   )
}