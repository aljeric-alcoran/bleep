import Image from 'next/image'
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { Product } from '@/@types';
import { parseDecimalToLocalString, priceDiscountCaculator, productHasDiscount } from '@/lib/helpers';
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
                        {productHasDiscount(product.discount_price) && (
                           <span className="absolute text-xs top-0 right-0 bg-red-50 text-red-500 p-1 px-2">-{product.discount_price["$numberDecimal"]}%</span>
                        )}
                     </div>
                     <div className='p-3'>
                        <ItemTitle className="text-sm mb-2 line-clamp-2 font-normal">{product.item_name}</ItemTitle>

                        <div className="h-[38px]">
                           <div className='font-semibold'><small>₱</small> {priceDiscountCaculator(product.price, product.discount_price)}</div>
                           {productHasDiscount(product.discount_price) && (
                              <div className='text-xs line-through text-gray-500'>₱ {parseDecimalToLocalString(product.price)}</div>
                           )}
                        </div>
                        
                        <div className='mt-6 text-xs flex items-center justify-between'>
                           <div className='flex items-center gap-1'>{product.establishment?.name}</div>
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