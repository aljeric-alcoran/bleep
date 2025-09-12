import GoogleSignup from "@/components/google";
import SignupForm from "./forms/signup-form";
import Image from "next/image";
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export default function Signup() {
   return (
      <div className="w-full flex justify-center items-center">
         <Card className="w-full shadow-none border-transparent p-0">
            <CardHeader className="p-0">
               <CardTitle className="text-lg font-semibold">Welcome to Bleep</CardTitle>
               <CardDescription>Register a new account</CardDescription>
               <CardAction>
                  <Image
                     src="/logo.png"
                     width={40}
                     height={40}
                     alt="Bleep logo"
                     priority
                  />
               </CardAction>
            </CardHeader>
            <CardContent className="p-0 pt-4">
               <SignupForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-0">
               <p className="text-xs text-gray-400 dark:text-white">Or sign in using</p>
               <GoogleSignup />
            </CardFooter>
         </Card>
      </div>
   );
}