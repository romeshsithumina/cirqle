import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LeftSidebar = () => {
  return (
    <div className="sticky left-0 top-0 flex h-screen w-[80px] flex-col items-center justify-between overflow-y-auto border border-r-[1px] py-3">
      <div>
        <Link href={"/"}>
          <Image alt="logo" src="/assets/logo.svg" width={40} height={40} />
        </Link>
      </div>
      <div>
        <div className="">icon1</div>
        <div className="">icon2</div>
        <div className="">icon3</div>
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
