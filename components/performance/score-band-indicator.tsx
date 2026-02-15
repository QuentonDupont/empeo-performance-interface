"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, BookOpen, Zap, Star, Trophy } from "lucide-react"

export interface ScoreBand {
  range: string
  label: string
  labelTh: string
  description: string
  color: string
  bgColor: string
  textColor: string
  icon: React.ReactNode
  actions: string[]
}

export const scoreBands: ScoreBand[] = [
  {
    range: "10-30",
    label: "Needs Immediate Support",
    labelTh: "ต้องการการสนับสนุนเร่งด่วน",
    description:
      "Critical performance gaps identified. Employee needs immediate assistance with key job duties. Consider Performance Improvement Plan (PIP) or formal warning.",
    color: "bg-destructive",
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    icon: <AlertTriangle className="h-5 w-5" />,
    actions: ["PIP", "Warning", "Additional Training"],
  },
  {
    range: "30-50",
    label: "Development Required",
    labelTh: "ต้องการการพัฒนา",
    description:
      "Performance lacks several requirements. Employee needs dedicated development support including learning materials and frequent 1-on-1 sessions.",
    color: "bg-primary",
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    icon: <BookOpen className="h-5 w-5" />,
    actions: ["Learning Plan", "Weekly 1-on-1s", "Mentorship"],
  },
  {
    range: "50-70",
    label: "Refinement Needed",
    labelTh: "ต้องปรับปรุง",
    description:
      "Good performance with minor mistakes. Focus on skill sharpening and specific area improvements to reach excellence.",
    color: "bg-warning",
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    icon: <Zap className="h-5 w-5" />,
    actions: ["Skill Development", "Targeted Coaching"],
  },
  {
    range: "70-90",
    label: "Outstanding",
    labelTh: "โดดเด่น",
    description:
      "Outstanding performance. Address small areas of doubt and provide advanced development opportunities.",
    color: "bg-success",
    bgColor: "bg-success/10",
    textColor: "text-success",
    icon: <Star className="h-5 w-5" />,
    actions: ["Advanced Training", "Leadership Opportunities"],
  },
  {
    range: "90-100",
    label: "Exceptional",
    labelTh: "ยอดเยี่ยม",
    description:
      "Exceptional performance exceeding all expectations. Consider for promotion, special projects, and recognition.",
    color: "bg-accent",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
    icon: <Trophy className="h-5 w-5" />,
    actions: ["Promotion Consideration", "Special Projects", "Recognition"],
  },
]

export function getScoreBand(score: number): ScoreBand {
  if (score >= 90) return scoreBands[4]
  if (score >= 70) return scoreBands[3]
  if (score >= 50) return scoreBands[2]
  if (score >= 30) return scoreBands[1]
  return scoreBands[0]
}

interface ScoreBandIndicatorProps {
  score: number
  compact?: boolean
}

export function ScoreBandIndicator({ score, compact = false }: ScoreBandIndicatorProps) {
  const band = getScoreBand(score)

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
          band.bgColor,
          band.textColor
        )}
      >
        {band.icon}
        {band.label}
      </span>
    )
  }

  return (
    <div className={cn("rounded-lg border p-4", band.bgColor)}>
      <div className={cn("flex items-center gap-2 mb-2", band.textColor)}>
        {band.icon}
        <h4 className="font-semibold text-sm">
          {band.label} ({band.range} Range)
        </h4>
      </div>
      <p className="text-xs text-foreground/70 leading-relaxed">{band.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {band.actions.map((action) => (
          <span
            key={action}
            className={cn(
              "px-2 py-0.5 rounded text-xs font-medium",
              band.bgColor,
              band.textColor
            )}
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  )
}
