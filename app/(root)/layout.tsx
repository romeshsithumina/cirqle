import LeftSidebar from "@/components/shared/LeftSidebar"
import Sidebar from "@/components/shared/Sidebar";
import React from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex">
      <LeftSidebar />
      <Sidebar />
      <div>{children}</div>
    </main>
  )
}

export default Layout;