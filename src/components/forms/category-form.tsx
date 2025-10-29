"use client"
import { Button } from "@/components/ui/button";
import {
   DialogClose,
   DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "../ui/switch";
import { useCategoryStore } from '@/store/useCategoryStore';
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";
import { CategoryFormSchema } from "@/schema/category.schema"
import { UseFormReturn } from "react-hook-form";

export function CategoryForm({ 
   form, 
   error, 
   onSubmit 
} : {
   form: UseFormReturn<CategoryFormSchema>;
   error: string | null;
   onSubmit: (values: CategoryFormSchema) => Promise<void>;
}) {
   const categories = useCategoryStore((state) => state.categories);

   return (
      <>
         {error ? (
            <Alert className="mb-6 bg-red-50 text-red-700">
               <CircleX />
               <AlertTitle className="text-xs mt-0.5 -ml-1">{error}</AlertTitle>
            </Alert>
         ) : null}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-6 mb-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category name</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="parent"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Parent category</FormLabel>
                           <FormControl>
                              <Select
                                 onValueChange={field.onChange}
                                 value={field.value ?? ""}
                              >
                                 <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select category" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem key="none" value="none">
                                       None
                                    </SelectItem>

                                    {categories
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
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category description</FormLabel>
                           <FormControl>
                              <Textarea rows={6} {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="isActive"
                     render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                           <div className="gap-2">
                              <FormLabel>Visibility</FormLabel>
                              <span className="text-xs text-muted-foreground">Toggle to show/hide this category from users.</span>
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
                  <div className="flex items-center justify-between">
                     
                     
                  </div>
               </div>
                  <Accordion
                     type="single"
                     collapsible
                     className="w-full"
                  >
                     <AccordionItem value="item-1">
                        <AccordionTrigger>Add Metadata</AccordionTrigger>
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
                  <Button type="submit">Save changes</Button>
               </DialogFooter>
            </form>
         </Form>
      </>
   )
}