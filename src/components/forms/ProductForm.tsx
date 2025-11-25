"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormLabelRequired, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Establishment, Product } from "@/lib/models";
import { useEffect, useState } from "react";
import { isObjectSharedKeyMatched } from "@/lib/helpers";
import { ProductFormSchema, useProductForm } from "@/schema/product.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { fetchEstablishments } from "@/lib/api/establishment";

export default function ProductForm({ 
   product, 
   setOpen,
}: { 
   product?: Product;
   setOpen: (value: boolean) => void;
}) {
   const form = useProductForm();
   const queryClient = useQueryClient();

   const { 
      isLoading, 
      isError, 
      data, 
      error 
   } = useQuery({ queryKey: ['establishments'], queryFn: fetchEstablishments});
   const establishments = data?.data ?? [];

   async function onSubmit(values: ProductFormSchema): Promise<void> {
      console.log(values);
   }

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-6 my-3">
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
                                    {establishments.map((establishment: Establishment) => (
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
                                       className="pl-6"
                                       {...field}
                                       type="text"
                                       inputMode="numeric"
                                       pattern="[0-9]*"
                                       onChange={(e) => {
                                          field.onChange(e.target.value.replace(/\D/g, ""));
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
                              <FormLabel>Discount</FormLabel>
                              <FormControl>
                                 <div className="relative w-full">
                                    <Input
                                       className="pl-6"
                                       {...field}
                                       type="text"
                                       inputMode="numeric"
                                       pattern="[0-9]*"
                                       onChange={(e) => {
                                          field.onChange(e.target.value.replace(/\D/g, ""));
                                       }}
                                    />
                                    <span className="absolute top-[9px] left-2 text-sm">₱</span>
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
                     <AccordionTrigger className="mt-2 mb-8 py-1 rounded-none border-y bg-gray-50 px-2">Add Metadata for SEO</AccordionTrigger>
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
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Discard</Button>
                  </DialogClose>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                     {form.formState.isSubmitting ? (
                        <>
                           <Loader2Icon className="animate-spin" />
                           {product ? "Updating" : "Submitting"}
                        </>
                     ) : (
                        product ? "Update" : "Submit"
                     )}
                  </Button>
               </DialogFooter>
            </form>
         </Form>
      </>
   )
}