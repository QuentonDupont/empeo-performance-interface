"use client"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "overview", label: "ภาพรวม" },
  { id: "employment", label: "การจ้างงาน" },
  { id: "work", label: "เวิร์คอิม" },
  { id: "competency", label: "ความสามารถ" },
  { id: "compensation", label: "ช่องเงินเดือน" },
  { id: "benefits", label: "สวัสดิการ" },
]

interface NavigationTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <nav className="bg-card border-b border-border" aria-label="Employee navigation">
      <div className="px-6 flex gap-0 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
