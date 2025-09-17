import LoginForm from "./forms/login-form";
import GoogleSignup from "./google";
import Image from "next/image";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

export default function Login({ onSuccess }: { onSuccess: () => void }) {
   return (
      <div className="w-full flex justify-center items-center">
         <Card className="w-full shadow-none border-transparent p-0">
            <CardHeader className="p-0">
               <CardTitle className="text-lg font-semibold text-center">
                  <Image
                     className="mx-auto mb-2"
                     src="/logo.png"
                     width={40}
                     height={40}
                     alt="Bleep logo"
                     priority
                  />
                  Welcome Back!
               </CardTitle>
               <CardDescription className="text-center">Login to your existing bleep account</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-4">
               <LoginForm onSuccess={onSuccess}/>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 p-0">
               <p className="text-xs text-gray-400 dark:text-white">Or login using</p>
               <GoogleSignup />
            </CardFooter>
         </Card>
      </div>
   );
}