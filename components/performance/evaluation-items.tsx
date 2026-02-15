"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Star, Heart } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type RatingType = "text" | "star" | "heart"

interface EvaluationItem {
  id: string
  title: string
  ratingLabel: string
  ratingType: RatingType
  ratingValue: number
  ratingMax: number
  weight: number
  details?: string
}

const evaluationItems: EvaluationItem[] = [
  {
    id: "1",
    title: "1. สเตคโฮลเดอร์ทุกประเภทอ้างความขุด",
    ratingLabel: "4 - Good",
    ratingType: "text",
    ratingValue: 4,
    ratingMax: 5,
    weight: 10,
    details:
      "Employee demonstrates good stakeholder management skills with consistent communication and delivery. Minor improvements needed in cross-functional collaboration.",
  },
  {
    id: "2",
    title: "2. สเตคโฮลเดอร์ทุกประเภทอ้างความค่าง",
    ratingLabel: "2 - Dissatisfied",
    ratingType: "text",
    ratingValue: 2,
    ratingMax: 5,
    weight: 10,
    details:
      "Needs improvement in managing expectations across different stakeholder types. Recommended additional training in stakeholder communication frameworks.",
  },
  {
    id: "3",
    title: "3. สเตคโฮลเดอร์ทุกประเภทอ้างตาว",
    ratingLabel: "ดีมาก",
    ratingType: "star",
    ratingValue: 4,
    ratingMax: 5,
    weight: 10,
    details:
      "Excellent performance in this area. Demonstrates strong understanding of stakeholder needs and effectively translates them into actionable UX designs.",
  },
  {
    id: "4",
    title: "4. สเตคโฮลเดอร์ทุกประเภทอ้างหัวใจ",
    ratingLabel: "ยอดมาก",
    ratingType: "heart",
    ratingValue: 5,
    ratingMax: 5,
    weight: 20,
    details:
      "Exceptional dedication and passion. Goes above and beyond to ensure stakeholder satisfaction and has become a role model for the team.",
  },
]

function RatingDisplay({ item }: { item: EvaluationItem }) {
  if (item.ratingType === "star") {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: item.ratingMax }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < item.ratingValue
                ? "fill-warning text-warning"
                : "text-border"
            )}
          />
        ))}
        <span className="ml-2 text-xs text-muted-foreground">{item.ratingLabel}</span>
      </div>
    )
  }

  if (item.ratingType === "heart") {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: item.ratingMax }).map((_, i) => (
          <Heart
            key={i}
            className={cn(
              "h-4 w-4",
              i < item.ratingValue
                ? "fill-destructive text-destructive"
                : "text-border"
            )}
          />
        ))}
        <span className="ml-2 text-xs text-muted-foreground">{item.ratingLabel}</span>
      </div>
    )
  }

  return (
    <span
      className={cn(
        "px-2.5 py-0.5 rounded-full text-xs font-medium",
        item.ratingValue >= 4
          ? "bg-success/10 text-success"
          : item.ratingValue >= 3
          ? "bg-warning/10 text-warning"
          : "bg-destructive/10 text-destructive"
      )}
    >
      {item.ratingLabel}
    </span>
  )
}

export function EvaluationItems() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Evaluation items detail">
      <div className="p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">
          หัวข้อการประเมิน
        </h2>

        <div className="space-y-3">
          {evaluationItems.map((item) => {
            const isExpanded = expandedId === item.id
            const scorePercent = (item.ratingValue / item.ratingMax) * 100

            return (
              <div
                key={item.id}
                className={cn(
                  "border border-border rounded-lg transition-all",
                  isExpanded ? "shadow-sm" : "hover:shadow-sm"
                )}
              >
                <button
                  className="w-full text-left p-4 flex items-center gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  aria-expanded={isExpanded}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <RatingDisplay item={item} />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="text-sm font-semibold text-foreground">{item.weight}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Score</p>
                      <p className="text-sm font-semibold text-foreground">
                        {item.ratingValue}/{item.ratingMax}
                      </p>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-border pt-3">
                    <div className="mb-3">
                      <Progress value={scorePercent} className="h-2" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
