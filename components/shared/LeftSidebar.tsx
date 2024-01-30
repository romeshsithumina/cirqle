import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { PiDotsNineBold } from "react-icons/pi";
import { CiFolderOn } from "react-icons/ci";

const LeftSidebar = () => {
  return (
    <div className="sticky left-0 top-0 flex h-screen w-[80px] flex-col items-center justify-between overflow-y-auto border border-r-[1px] py-3">
      <div>
        <Link href={"/"}>
          <Image alt="logo" src="/assets/logo.svg" width={40} height={40} />
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <PiDotsNineBold color="#f53162" size={29} />
        <CiFolderOn color="black" opacity={0.4} size={29} />
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default LeftSidebar;
