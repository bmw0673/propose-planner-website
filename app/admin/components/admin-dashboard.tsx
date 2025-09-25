"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import AdminHeader from "./admin-header"

const ConsultationList = dynamic(() => import("./consultation-list"), { ssr: false })
const NoticeManager = dynamic(() => import("./notice-manager"), { ssr: false })

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"consultation" | "notice">("consultation")

  return (
    <>
      <AdminHeader onTabChange={setActiveTab} activeTab={activeTab} />
      <div className="w-full max-w-2xl">
        {activeTab === "consultation" ? <ConsultationList /> : <NoticeManager />}
      </div>
    </>
  )
}
