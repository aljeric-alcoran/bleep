"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Switch } from "../ui/switch";
import { addNewCategory } from "@/lib/api/categories";
import { useCategoryStore } from '@/store/useCategoryStore';
import { useState } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { CircleX } from "lucide-react";

const formSchema = z.object({
   name: z.string().trim().min(1, "Name cannot be empty"),
   description: z.string().optional(),
   parent: z.string().optional(),
   isActive: z.boolean(),
   order: z.number(),
   metadata: z.object({
      keywords: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
   })
});

export function AddCategoryForm() {
   const { categories, addToCategoryStore } = useCategoryStore((state) => state);
   const [open, setOpen] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         description: "",
         parent: "",
         isActive: true,
         order: 0,
         metadata: {
            keywords: "",
            seoTitle: "",
            seoDescription: ""
         }
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
         const { metadata, parent, ...data } = values;
         const payload = {
            ...data,
            parent: parent === '' ? null : parent,
            metadata: {
               keywords: metadata?.keywords?.split(" "),
               seoTitle: metadata.seoTitle,
               seoDescription: metadata.seoDescription
            }
         }
         const response = await addNewCategory(payload);
         addToCategoryStore(response.data);
         setOpen(false);
      } catch (error: any) {
         setError(error.message)
         console.log(error);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button>Add Category</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Add New Category</DialogTitle>
               <DialogDescription>
                  Fill in the details below to create a new category.
               </DialogDescription>
            </DialogHeader>
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
         </DialogContent>
      </Dialog>
   )
}