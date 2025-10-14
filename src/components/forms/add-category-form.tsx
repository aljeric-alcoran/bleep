"use client"

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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/lib/types/category-type";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function AddCategoryForm({ 
   categories 
} : { 
   categories: Category[] 
}) {
   return (
      <Dialog>
         <form>
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
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <Label htmlFor="name">Category name</Label>
                     <Input id="category-name" name="name" />
                  </div>
                  <div className="grid gap-3">
                     <Label htmlFor="parent">Parent category</Label>
                     <Select>
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem key="none" value="null">
                              None
                           </SelectItem>

                           {categories
                              .filter(category => category.isActive)
                              .map(category => (
                                 <SelectItem 
                                    key={category._id ?? category.name} 
                                    value={String(category._id ?? '')}
                                 >
                                    {category.name}
                                 </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="grid gap-3">
                     <Label htmlFor="description">Description</Label>
                     <Textarea
                        id="description"
                        rows={6}
                     />
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
                           <div className="grid gap-4">
                              <div className="grid gap-3">
                                 <Label htmlFor="title">Title</Label>
                                 <Input id="metadata-title" name="title" />
                              </div>
                              <div className="grid gap-3">
                                 <Label htmlFor="metadata-desc">Description</Label>
                                 <Input id="metadata-desc" name="metadata-desc" />
                              </div>
                              <div className="grid gap-3">
                                 <Label htmlFor="keywords">Keywords</Label>
                                 <Textarea
                                    id="keywords"
                                    name="keywords"
                                    placeholder="e.g. hello world people"
                                    rows={6}
                                 />
                              </div>
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
            </DialogContent>
         </form>
      </Dialog>
   )
}