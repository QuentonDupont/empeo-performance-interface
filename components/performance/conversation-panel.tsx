"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Sparkles,
  Save,
  FileDown,
  Mail,
  ChevronDown,
} from "lucide-react"

export function ConversationPanel() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [notes, setNotes] = useState(
    "Discussion focused on Q1 deliverables and UX improvements. Best showed strong initiative in leading the design sprint. Areas for growth include documentation habits and more structured user research methods."
  )
  const [isSaving, setIsSaving] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const maxChars = 2000

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1500)
  }

  const handleGenerateSummary = () => {
    setShowSummary(true)
  }

  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Performance conversation">
      <button
        className="w-full text-left p-5 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            Performance Discussion Summary
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
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div>
              <span className="font-medium text-foreground">Date:</span>{" "}
              14 Feb 2026, 10:30 AM
            </div>
            <div>
              <span className="font-medium text-foreground">Participants:</span>{" "}
              Somchai Prasert (Manager), Piyapong H. (Employee)
            </div>
          </div>

          {/* Notes area */}
          <div className="relative">
            <label htmlFor="conversation-notes" className="text-sm font-medium text-foreground mb-2 block">
              Conversation Notes
            </label>
            <Textarea
              id="conversation-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[120px] text-sm leading-relaxed resize-y bg-secondary/30"
              maxLength={maxChars}
              placeholder="Record key discussion points..."
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">
                {notes.length}/{maxChars} characters
              </span>
              {isSaving && (
                <span className="text-xs text-success font-medium">Saving...</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Button onClick={handleSave} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-3.5 w-3.5 mr-1.5" />
              Record Key Discussion Points
            </Button>
            <Button
              onClick={handleGenerateSummary}
              variant="outline"
              size="sm"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Generate AI Summary
            </Button>
            <div className="flex gap-1 ml-auto">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <FileDown className="h-3.5 w-3.5 mr-1.5" />
                PDF
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                Email
              </Button>
            </div>
          </div>

          {/* AI Summary */}
          {showSummary && (
            <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <h4 className="text-sm font-semibold text-foreground">AI Summary</h4>
              </div>
              <ul className="text-sm text-foreground/80 space-y-1.5 list-disc list-inside leading-relaxed">
                <li>Strong initiative in design sprint leadership</li>
                <li>Q1 deliverables on track with minor timeline adjustments</li>
                <li>Growth area: Documentation habits need improvement</li>
                <li>Growth area: More structured user research approach recommended</li>
                <li>Overall positive trajectory with clear development path</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
