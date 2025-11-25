import Image from 'next/image'
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Product } from '@/lib/models';
import { parseDecimal128 } from '@/lib/helpers';

export default function ProductCard({ 
   product 
}: {
   product: Product
}) {
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
                        sizes="(max-width: 640px) 100vw, 640px"
                        priority
                        fill
                     />
                  </div>
                  <div className='p-3'>
                     <ItemTitle className="text-xs">{product.item_name}</ItemTitle>
                     <ItemDescription className="text-xs line-clamp-1">
                        {product.description}
                     </ItemDescription>
                     <div className='mt-4 font-semibold'>₱ {parseDecimal128(product.price)}</div>
                     <p className='mt-4 text-gray-500 text-xs line-clamp-1'>{product.establishment?.name}</p>
                     <p className='text-gray-500 text-xs line-clamp-1'>{product.establishment?.address}</p>
                  </div>
               </ItemContent>
            </Item>
         </div>
      </>
   )
}