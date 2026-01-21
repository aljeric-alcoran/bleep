"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormLabelRequired, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Establishment, Product } from "@/@types";
import { numberInputOnly, isObjectSharedKeyMatched, parseDecimalToString } from "@/lib/helpers";
import { ProductFormSchema, useProductForm } from "@/schema/product.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { fetchEstablishments } from "@/lib/api/establishment";
import { fetchCategories } from "@/lib/api/categories";
import { createProduct } from "@/lib/api/products";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductForm({ 
   product, 
}: { 
   product?: Product;
}) {
   const router = useRouter();
   const form = useProductForm();
   const queryClient = useQueryClient();

   const { isLoading, data: establishments } = useQuery({ queryKey: ['establishments'], queryFn: fetchEstablishments });
   const { data: categories, isLoading: categoryLoading } = useQuery({ queryKey: ['categories'], queryFn: fetchCategories });

   const addProduct = useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["products"] });
         toast.success("Success!", { description: data.message });
         router.push("/products");
      },
      onError: (error) => {
         toast.error("Error!", { description: error.message});
      }
   });

   function modifyFormPayload(values: any) {
      return {
         ...values,
         price: values.price ? Number(values.price) : 0,
         discount_price: values.discount_price ? Number(values.discount_price) : 0,
         stock: values.stock ? Number(values.stock) : 0,
         metadata: {
            keywords: values.metadata?.keywords?.split(" "),
            seoTitle: values.metadata?.seoTitle,
            seoDescription: values.metadata?.seoDescription
         }
      }
   }

   async function onSubmit(values: ProductFormSchema): Promise<void> {
      const payload = modifyFormPayload(values);
      const result = await addProduct.mutateAsync(payload);
      console.log(result);
   }

   useEffect(() => {
      if (product) {
         form.reset({
            establishment_id: product.establishment_id ?? undefined,
            category_id: product.category_id ?? undefined,
            item_name: product.item_name ?? "",
            description: product.description ?? "",
            price: parseDecimalToString(product.price) ?? "",
            stock: parseDecimalToString(product.stock) ?? "",
            discount_price: parseDecimalToString(product.discount_price) ?? "",
            isAvailable: product.isAvailable ?? true,
            metadata: {
               keywords: product.metadata?.keywords?.join(" ") ?? "",
               seoTitle: product.metadata?.seoTitle ?? "",
               seoDescription: product.metadata?.seoDescription ?? "",
            },
         });
      }
   }, [product]);

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-6 my-3">
                  <div className="grid grid-cols-2 items-center gap-4">
                     <FormField
                        control={form.control}
                        name="establishment_id"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabelRequired>Establishment</FormLabelRequired>
                              <FormControl>
                                 <Select
                                    disabled={isLoading}
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                 >
                                    <SelectTrigger className="w-full">
                                       <SelectValue placeholder="Select establishment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {establishments?.data.map((establishment: Establishment) => (
                                          <SelectItem
                                             key={establishment._id ?? establishment.name}
                                             value={String(establishment._id ?? "")}
                                          >
                                             {establishment.name}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="category_id"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabelRequired>Category</FormLabelRequired>
                              <FormControl>
                                 <Select
                                 disabled={categoryLoading}
                                    onValueChange={field.onChange}
                                    value={field.value ?? ""}
                                 >
                                    <SelectTrigger className="w-full">
                                       <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       {categories?.data
                                       .filter(category => category.isActive)
                                       .map(category => (
                                          <SelectItem
                                             key={category._id ?? category.name}
                                             value={String(category._id ?? "")}
                                          >
                                             {category.name}
                                          </SelectItem>
                                       ))}
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name="item_name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabelRequired>Product name</FormLabelRequired>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabelRequired>Description</FormLabelRequired>
                           <FormControl>
                              <Textarea rows={6} {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />

                  <div className="grid grid-cols-2 items-center gap-4">
                     <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                 <div className="relative w-full">
                                    <Input
                                       placeholder="00.00"
                                       className="pl-6"
                                       {...field}
                                       type="text"
                                       inputMode="numeric"
                                       pattern="[0-9.]*"
                                       onChange={(e) => {
                                          field.onChange(numberInputOnly(e));
                                       }}
                                    />
                                    <span className="absolute top-[9px] left-2 text-sm">₱</span>
                                 </div>
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="discount_price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>{"Discount (%)"}</FormLabel>
                              <FormControl>
                                 <div className="relative w-full">
                                    <Input
                                       placeholder="e.g. 10"
                                       className="pr-6"
                                       {...field}
                                       type="text"
                                       inputMode="numeric"
                                       pattern="[0-9]*"
                                       onChange={(e) => {
                                          field.onChange(numberInputOnly(e));
                                       }}
                                    />
                                    <span className="absolute top-[9px] right-3 text-sm">%</span>
                                 </div>
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />
                  </div>

                  <div className="grid grid-cols-2 items-center gap-4">
                     <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="Total items in stock"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    onChange={(e) => {
                                       field.onChange(e.target.value.replace(/\D/g, ""));
                                    }}
                                 />
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name="isAvailable"
                     render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                           <div className="gap-2">
                              <FormLabel>Product availability</FormLabel>
                              <span className="text-xs text-muted-foreground">Toggle to show or hide this product from customers.</span>
                           </div>
                           <FormControl>
                              <Switch
                                 checked={field.value}
                                 onCheckedChange={field.onChange}
                              />
                           </FormControl>
                        </FormItem>
                     )}
                  />

               </div>
               <Accordion
                  type="single"
                  collapsible
                  className="w-full"
               >
                  <AccordionItem value="item-1">
                     <AccordionTrigger className="flex items-center mt-2 mb-8 py-2 rounded-none border-y bg-gray-50 px-2">
                        <div className="flex flex-col gap-1">
                           Add SEO Metadata
                           <p className="text-xs font-normal">This helps improve your product’s visibility and help users find your content more easily.</p>
                        </div>
                     </AccordionTrigger>
                     <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="grid gap-6 mb-4">
                           <FormField
                              control={form.control}
                              name="metadata.seoTitle"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                       <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="metadata.seoDescription"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                       <Input {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                 </FormItem>
                              )}
                           />
                           <FormField
                              control={form.control}
                              name="metadata.keywords"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Keywords</FormLabel>
                                    <FormControl>
                                       <Textarea rows={6} {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                 </FormItem>
                              )}
                           />
                        </div>
                     </AccordionContent>
                  </AccordionItem>
               </Accordion>
               <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => router.replace("/products")}>Cancel</Button>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                     {form.formState.isSubmitting ? (
                        <>
                           <Loader2Icon className="animate-spin" />
                           {product ? "Updating" : "Submitting"}
                        </>
                     ) : (
                        product ? "Update" : "Create"
                     )}
                  </Button>
               </div>
            </form>
         </Form>
      </>
   )
}