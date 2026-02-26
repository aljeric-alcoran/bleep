import Image from 'next/image'
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Product } from '@/@types';
import { parseDecimalToLocalString } from '@/lib/helpers';
import Link from 'next/link';

export default function ProductCard({ 
   product 
}: {
   product: Product
}) {
   return (
      <>
         <Link href={`/${product._id}`}>
            <div className="w-full bg-white">
               <Item variant="outline" className="p-0 overflow-hidden h-full">
                  <ItemContent>
                     <div className="w-full h-[200px] relative border-b m-0">
                        <Image
                           className="object-cover"
                           src="/default-product.jpg"
                           alt="Product Image"
                           sizes="(max-width: 640px) 100vw, 640px"
                           priority
                           fill
                        />
                        {product.hasDiscount && (
                           <span className="absolute text-xs top-0 right-0 bg-red-50 text-red-500 p-1 px-2">-{product.discount_label}</span>
                        )}
                     </div>
                     <div className='p-3 pt-2'>
                        <ItemTitle className="text-sm mb-2 line-clamp-2 font-normal">{product.item_name}</ItemTitle>

                        <div className='mt-6 text-xs flex items-end justify-between'>
                           <div className="h-[30px] flex flex-col justify-end">
                              {product.hasDiscount && (
                                 <div className='text-xs line-through text-gray-500'>₱ {parseDecimalToLocalString(product.price)}</div>
                              )}
                              <div className='font-semibold text-sm'><small>₱</small> {parseDecimalToLocalString(product.discounted_price)}</div>
                           </div>
                           <span>{product.stock} in stock</span>
                        </div>
                     </div>
                  </ItemContent>
               </Item>
            </div>
         </Link>
      </>
   )
}