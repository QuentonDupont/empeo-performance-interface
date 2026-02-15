"use client"

import { useState } from "react"
import { EmployeeHeader } from "@/components/performance/employee-header"
import { NavigationTabs } from "@/components/performance/navigation-tabs"
import { PerformanceOverview } from "@/components/performance/performance-overview"
import { EvaluationCategories } from "@/components/performance/evaluation-categories"
import { EvaluationItems } from "@/components/performance/evaluation-items"
import { ConversationPanel } from "@/components/performance/conversation-panel"
import { ActionItems } from "@/components/performance/action-items"
import { CompensationPanel } from "@/components/performance/compensation-panel"
import { ScoreBandsPanel } from "@/components/performance/score-bands-panel"

export default function PerformanceManagementPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto py-6 px-4">
        {/* Employee header */}
        <EmployeeHeader />

        {/* Navigation tabs */}
        <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main content */}
        <div className="mt-6 space-y-5">
          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              Performance Evaluation
            </h1>
            <ScoreBandsPanel />
          </div>

          {/* Performance Overview with Score */}
          <PerformanceOverview />

          {/* Evaluation Categories Table */}
          <EvaluationCategories />

          {/* Detailed Evaluation Items */}
          <EvaluationItems />

          {/* Performance Conversation */}
          <ConversationPanel />

          {/* Action Items Split View */}
          <ActionItems />

          {/* Compensation Decision */}
          <CompensationPanel />
        </div>
      </div>
    </div>
  )
}
