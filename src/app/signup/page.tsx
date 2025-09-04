import GoogleSignup from "@/components/google";
import SignupForm from "@/app/signup/Form";
import { Button } from "@/components/ui/button"
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import Link from "next/link";

export default function Signup() {
   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">Welcome to Bleep</CardTitle>
               <CardDescription>Register a new account</CardDescription>
               <CardAction>
                  <Link href="/">
                     <Button className="">
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                        </svg>
                     </Button>
                  </Link>
               </CardAction>
            </CardHeader>
            <CardContent>
               <SignupForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
               <p className="text-xs text-gray-400 dark:text-white">Or sign up using</p>
               <GoogleSignup />
            </CardFooter>
         </Card>
      </div>
   );
}