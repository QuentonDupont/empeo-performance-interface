"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScoreBandIndicator, getScoreBand } from "./score-band-indicator"

interface EvaluationSummary {
  name: string
  grade: string
  gradeColor: string
}

interface YearData {
  year: number
  overallScore: number
  evaluator: string
  evaluations: EvaluationSummary[]
}

const yearData: YearData[] = [
  {
    year: 2025,
    overallScore: 90,
    evaluator: "Somchai Prasert",
    evaluations: [
      { name: "Gofive RefleX 2025", grade: "Excellence", gradeColor: "bg-accent text-accent-foreground" },
      { name: "TCS RefleX 2025", grade: "Excellence", gradeColor: "bg-accent text-accent-foreground" },
    ],
  },
  {
    year: 2024,
    overallScore: 78,
    evaluator: "Somchai Prasert",
    evaluations: [
      { name: "Gofive RefleX 2024", grade: "Outstanding", gradeColor: "bg-success text-success-foreground" },
      { name: "TCS RefleX 2024", grade: "Good", gradeColor: "bg-warning text-warning-foreground" },
    ],
  },
]

export function PerformanceOverview() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const currentData = yearData.find((y) => y.year === selectedYear) || yearData[0]
  const band = getScoreBand(currentData.overallScore)

  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Performance overview">
      <div className="p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">
          ผลการประเมิน
        </h2>

        {/* Year tabs */}
        <div className="flex gap-0 mb-5 border-b border-border">
          {yearData.map((yd) => (
            <button
              key={yd.year}
              onClick={() => setSelectedYear(yd.year)}
              className={cn(
                "px-4 py-2 text-sm font-medium relative transition-colors",
                selectedYear === yd.year
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {yd.year}
              {selectedYear === yd.year && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Evaluations list */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Overall Grade
            </h3>
            <div className="space-y-3">
              {currentData.evaluations.map((ev) => (
                <div
                  key={ev.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <span className="text-sm text-foreground font-medium">{ev.name}</span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      ev.gradeColor
                    )}
                  >
                    {ev.grade}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Overall score display */}
          <div>
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  SP
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs text-muted-foreground">Evaluated by</p>
                <p className="text-sm font-medium text-foreground">{currentData.evaluator}</p>
              </div>
            </div>

            <div className="flex items-end gap-3 mb-4">
              <span className="text-5xl font-bold text-foreground tracking-tight">
                {currentData.overallScore}
              </span>
              <span className="text-2xl text-muted-foreground font-light mb-1">/100</span>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold ml-2 mb-2",
                  band.bgColor,
                  band.textColor
                )}
              >
                {band.label}
              </span>
            </div>

            <ScoreBandIndicator score={currentData.overallScore} />
          </div>
        </div>
      </div>
    </section>
  )
}
