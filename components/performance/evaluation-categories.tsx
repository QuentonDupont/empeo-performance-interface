"use client"

import { cn } from "@/lib/utils"
import { Users } from "lucide-react"

interface Category {
  id: string
  name: string
  weight: string
  score: string
  highlighted?: boolean
  hasPeerIcon?: boolean
}

const categories: Category[] = [
  { id: "self", name: "ประเมินของตนเอง", weight: "20%", score: "4.2/5" },
  { id: "manager", name: "ประเมินจากหัวหน้า", weight: "30%", score: "4.5/5" },
  { id: "org", name: "ประเมินองค์กร", weight: "20%", score: "4.0/5", highlighted: true },
  { id: "peer", name: "ประเมินจากเพื่อนร่วมงาน", weight: "15%", score: "4.3/5", hasPeerIcon: true },
  { id: "org2", name: "ประเมินองค์กร (รวม)", weight: "15%", score: "4.1/5" },
]

export function EvaluationCategories() {
  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Evaluation categories">
      <div className="p-5">
        <h2 className="text-base font-semibold text-foreground mb-4">
          ประเมินตนเอง
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Category
                </th>
                <th className="text-center py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Weight
                </th>
                <th className="text-right py-2.5 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className={cn(
                    "border-b border-border/50 transition-colors hover:bg-muted/50",
                    cat.highlighted && "bg-primary/5"
                  )}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className={cn("text-foreground", cat.highlighted && "font-medium")}>
                        {cat.name}
                      </span>
                      {cat.hasPeerIcon && (
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center text-muted-foreground">{cat.weight}</td>
                  <td className="py-3 px-3 text-right font-medium text-foreground">{cat.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
