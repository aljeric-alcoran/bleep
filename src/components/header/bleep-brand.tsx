import Link from "next/link";
import Image from "next/image";

export default function BleepBrand({
   optext
} : {
   optext?: string
}) {
   return (
      <Link href="/" className="flex gap-2 items-center mr-4">
         <Image
            src="/logo-white.png"
            width={38}
            height={38}
            alt="Bleep logo"
            priority
         />
         <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Bleep</span>
         {optext && (
            <>
               <span className="self-center text-xl mx-2 whitespace-nowrap dark:text-white">|</span>
               <span className="self-center text-xl whitespace-nowrap dark:text-white">{optext}</span>
            </>
         )}
      </Link>
   );
}