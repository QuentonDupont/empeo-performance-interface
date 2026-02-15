"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TrendingUp, TrendingDown, Minus, ChevronDown, DollarSign, Save } from "lucide-react"

type SalaryStatus = "increased" | "decreased" | "no-change"

export function CompensationPanel() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [status, setStatus] = useState<SalaryStatus>("increased")
  const [percentage, setPercentage] = useState("8.5")
  const [effectiveDate, setEffectiveDate] = useState("2026-04-01")
  const [justification, setJustification] = useState(
    "Based on outstanding performance scores (90/100) and consistent delivery of high-quality UX work. Employee has exceeded expectations in stakeholder management and team leadership."
  )
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const badges: { value: SalaryStatus; label: string; icon: React.ReactNode; color: string }[] = [
    {
      value: "increased",
      label: "Salary Increased +",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "bg-success text-success-foreground",
    },
    {
      value: "decreased",
      label: "Salary Decreased -",
      icon: <TrendingDown className="h-4 w-4" />,
      color: "bg-destructive text-destructive-foreground",
    },
    {
      value: "no-change",
      label: "No Change",
      icon: <Minus className="h-4 w-4" />,
      color: "bg-muted text-muted-foreground",
    },
  ]

  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Compensation review">
      <button
        className="w-full text-left p-5 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Compensation Review
          </h2>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          {/* Badge selection */}
          <div className="mb-5">
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Salary Decision
            </Label>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <button
                  key={badge.value}
                  onClick={() => setStatus(badge.value)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all border-2",
                    status === badge.value
                      ? cn(badge.color, "border-transparent shadow-sm")
                      : "bg-card text-muted-foreground border-border hover:border-primary/30"
                  )}
                  aria-pressed={status === badge.value}
                >
                  {badge.icon}
                  {badge.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Percentage */}
            <div>
              <Label htmlFor="adjustment-percent" className="text-sm font-medium text-foreground mb-1.5 block">
                Adjustment (%)
              </Label>
              <div className="relative">
                <Input
                  id="adjustment-percent"
                  type="number"
                  step="0.5"
                  min="-50"
                  max="50"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>

            {/* Effective date */}
            <div>
              <Label htmlFor="effective-date" className="text-sm font-medium text-foreground mb-1.5 block">
                Effective Date
              </Label>
              <Input
                id="effective-date"
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
            </div>
          </div>

          {/* Justification */}
          <div className="mb-4">
            <Label htmlFor="justification" className="text-sm font-medium text-foreground mb-1.5 block">
              Notes / Justification
            </Label>
            <Textarea
              id="justification"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="min-h-[80px] text-sm bg-secondary/30"
              placeholder="Provide justification for the salary decision..."
            />
          </div>

          {/* Save */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Decision
            </Button>
            {isSaved && (
              <span className="text-sm text-success font-medium">Decision saved successfully</span>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
