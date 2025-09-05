import ResetPasswordForm from "./Form";
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
               <CardTitle className="text-lg font-semibold">Reset Password</CardTitle>
               <CardDescription>Enter your new password.</CardDescription>
            </CardHeader>
            <CardContent>
               <ResetPasswordForm />
            </CardContent>
         </Card>
      </div>
   );
}