import ForgotPasswordForm from "./Form";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"


export default function ForgotPassword() {
   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">Forgot Password</CardTitle>
               <CardDescription>Enter your email to reset your password.</CardDescription>
            </CardHeader>
            <CardContent>
               <ForgotPasswordForm />
            </CardContent>
         </Card>
      </div>
   );
}