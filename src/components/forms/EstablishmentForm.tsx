"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EstablishmentFormSchema, useEstablishmentForm } from "@/schema/establishment.schema"
import { DialogClose, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { Loader2Icon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEstablishment, updateEstablishment } from "@/lib/api/establishment"
import { toast } from "sonner"
import { Establishment } from "@/@types"
import { useEffect } from "react"
import { isObjectSharedKeyMatched } from "@/lib/helpers"

export default function EstablishmentForm({ 
   establishment, 
   setOpen,
}: { 
   establishment?: Establishment;
   setOpen: (value: boolean) => void;
}) {
   const form = useEstablishmentForm();
   const queryClient = useQueryClient();

   const addEstablishment = useMutation({
      mutationFn: createEstablishment,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["establishments"] });
         toast.success("Success!", { description: data.message });
         setOpen(false);
      },
      onError: (error) => {
         toast.error("Error!", { description: error.message});
      }
   });

   const editEstablishment = useMutation({
      mutationFn: updateEstablishment,
      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ["establishments"] });
         toast.success("Success!", { description: data.message });
         setOpen(false);
      },
      onError: (error) => {
         toast.error("Error!", { description: error.message});
      }
   });

   async function onSubmit(values: EstablishmentFormSchema): Promise<void> {
      values.phone = `+63${values.phone}`;

      if (!establishment) {
         const result = await addEstablishment.mutateAsync(values);
         console.log(result);
      } else {
         if (!isObjectSharedKeyMatched(values, establishment)) {
            const updatedEstablishmentObject = {...establishment, ...values};
            const updateResult = await editEstablishment.mutateAsync(updatedEstablishmentObject);
            console.log("Updated values: ", updateResult);
            return;
         }
         toast.warning("No changes has been made.")
      }
   }

   useEffect(() => {
      if (establishment) {
         form.reset({
            name: establishment.name ?? "",
            address: establishment.address ?? "",
            phone: establishment.phone.slice(3) ?? "",
         });
      }
   }, [establishment]);

   return (
      <>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid gap-6 mb-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="address"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Address</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Phone</FormLabel>
                           <FormControl>
                              <div className="relative">
                                 <Input
                                 className="pl-10"
                                    {...field}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={10}
                                    onChange={(e) => {
                                       const numeric = e.target.value.replace(/\D/g, "");
                                       if (numeric.length <= 10) {
                                          field.onChange(numeric);
                                       }
                                    }}
                                 />
                                 <span className="absolute top-[9px] left-2 text-sm">+63</span>
                              </div>
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
               </div>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Discard</Button>
                  </DialogClose>
                  <Button disabled={form.formState.isSubmitting} type="submit">
                     {form.formState.isSubmitting ? (
                        <>
                           <Loader2Icon className="animate-spin" />
                           {establishment ? "Updating" : "Submitting"}
                        </>
                     ) : (
                        establishment ? "Update" : "Submit"
                     )}
                  </Button>
               </DialogFooter>
            </form>
         </Form>
      </>
   )
}