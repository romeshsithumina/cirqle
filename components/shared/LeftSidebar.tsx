import Image from "next/image"

const LeftSidebar = () => {
  return (
    <div className="sticky left-0 top-0 flex h-screen w-[80px] flex-col items-center justify-between overflow-y-auto border border-r-[1px]">
      <div className="pt-3">
        <Image 
          alt="logo"
          src="/assets/logo.svg"
          width={40}
          height={40}
        />
      </div>
      <div>
        <div className="">icon1</div>
        <div className="">icon2</div>
        <div className="">icon3</div>
      </div>
      <div>Profile</div>
    </div>
  )
}
export default LeftSidebar