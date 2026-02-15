"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { scoreBands } from "./score-band-indicator"
import { Info, X } from "lucide-react"

export function ScoreBandsPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setIsOpen(true)}
      >
        <Info className="h-3.5 w-3.5 mr-1.5" />
        View Score Bands
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end" role="dialog" aria-modal="true" aria-label="Performance band descriptions">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-md h-full bg-card border-l border-border shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between z-10">
              <h2 className="text-lg font-semibold text-foreground">
                Performance Band Descriptions
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close panel"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-5 space-y-4">
              {scoreBands.map((band) => (
                <div
                  key={band.range}
                  className={cn(
                    "rounded-lg border p-4 transition-all hover:shadow-sm",
                    band.bgColor
                  )}
                >
                  <div className={cn("flex items-center gap-2 mb-2", band.textColor)}>
                    {band.icon}
                    <h3 className="font-semibold text-sm">
                      {band.range} Points: {band.label}
                    </h3>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    {band.description}
                  </p>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                      Recommended Actions
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {band.actions.map((action) => (
                        <span
                          key={action}
                          className="px-2 py-0.5 rounded bg-card text-xs font-medium text-foreground border border-border"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
