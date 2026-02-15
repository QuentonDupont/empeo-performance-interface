"use client"

import { X, Phone, Mail, Calendar } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function EmployeeHeader() {
  return (
    <div className="relative bg-primary rounded-t-lg px-6 py-5">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 text-primary-foreground hover:bg-primary-foreground/10"
        aria-label="Close employee profile"
      >
        <X className="h-5 w-5" />
      </Button>

      <div className="flex items-start gap-5">
        <Avatar className="h-20 w-20 border-2 border-primary-foreground/30 shrink-0">
          <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-2xl font-semibold">
            PH
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-primary-foreground">
            Piyapong Huayhongthong (Best)
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-0.5">
            Senior UX Designer (O2)
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-primary-foreground/70">
            <span className="font-mono">#80180</span>
            <span>Product Development &gt; Product Team</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              15 Mar 2021 (4 yrs 11 mos)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            aria-label="Call employee"
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9"
            aria-label="Email employee"
          >
            <Mail className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
