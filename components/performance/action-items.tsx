"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, ChevronDown, Trash2 } from "lucide-react"

interface ActionItem {
  id: string
  description: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "not-started" | "in-progress" | "completed"
  completed: boolean
}

const priorityColors = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
}

const statusLabels = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  completed: "Completed",
}

const initialManagerItems: ActionItem[] = [
  {
    id: "m1",
    description: "Provide advanced UX design training resources",
    dueDate: "2026-03-15",
    priority: "high",
    status: "in-progress",
    completed: false,
  },
  {
    id: "m2",
    description: "Schedule bi-weekly 1-on-1 mentoring sessions",
    dueDate: "2026-02-28",
    priority: "medium",
    status: "completed",
    completed: true,
  },
]

const initialEmployeeItems: ActionItem[] = [
  {
    id: "e1",
    description: "Complete design system documentation",
    dueDate: "2026-03-01",
    priority: "high",
    status: "in-progress",
    completed: false,
  },
  {
    id: "e2",
    description: "Present user research findings to team",
    dueDate: "2026-03-10",
    priority: "medium",
    status: "not-started",
    completed: false,
  },
  {
    id: "e3",
    description: "Shadow senior lead on next project kickoff",
    dueDate: "2026-04-01",
    priority: "low",
    status: "not-started",
    completed: false,
  },
]

function ActionItemCard({
  item,
  onToggle,
  onStatusChange,
  onDelete,
}: {
  item: ActionItem
  onToggle: () => void
  onStatusChange: (status: ActionItem["status"]) => void
  onDelete: () => void
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border border-border transition-all hover:shadow-sm",
        item.completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={item.completed}
        onCheckedChange={onToggle}
        className="mt-0.5"
        aria-label={`Mark "${item.description}" as ${item.completed ? "incomplete" : "complete"}`}
      />
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm text-foreground",
            item.completed && "line-through"
          )}
        >
          {item.description}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className={cn("px-2 py-0.5 rounded text-xs font-medium", priorityColors[item.priority])}>
            {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">
            Due: {new Date(item.dueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>
        <div className="mt-2">
          <Select value={item.status} onValueChange={(val) => onStatusChange(val as ActionItem["status"])}>
            <SelectTrigger className="h-7 w-[130px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="not-started">{statusLabels["not-started"]}</SelectItem>
              <SelectItem value="in-progress">{statusLabels["in-progress"]}</SelectItem>
              <SelectItem value="completed">{statusLabels.completed}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
        onClick={onDelete}
        aria-label={`Delete "${item.description}"`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

function ActionItemColumn({
  title,
  items,
  setItems,
}: {
  title: string
  items: ActionItem[]
  setItems: React.Dispatch<React.SetStateAction<ActionItem[]>>
}) {
  const addItem = () => {
    const newItem: ActionItem = {
      id: `new-${Date.now()}`,
      description: "New action item",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: "medium",
      status: "not-started",
      completed: false,
    }
    setItems((prev) => [...prev, newItem])
  }

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed, status: !item.completed ? "completed" : "not-started" }
          : item
      )
    )
  }

  const updateStatus = (id: string, status: ActionItem["status"]) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, completed: status === "completed" } : item
      )
    )
  }

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={addItem}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ActionItemCard
            key={item.id}
            item={item}
            onToggle={() => toggleItem(item.id)}
            onStatusChange={(status) => updateStatus(item.id, status)}
            onDelete={() => deleteItem(item.id)}
          />
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            No action items yet
          </p>
        )}
      </div>
    </div>
  )
}

export function ActionItems() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [managerItems, setManagerItems] = useState<ActionItem[]>(initialManagerItems)
  const [employeeItems, setEmployeeItems] = useState<ActionItem[]>(initialEmployeeItems)

  return (
    <section className="bg-card rounded-lg border border-border" aria-label="Action items">
      <button
        className="w-full text-left p-5 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h2 className="text-base font-semibold text-foreground">
          Action Items
        </h2>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform",
            isExpanded && "rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActionItemColumn
              title="Manager Commitments"
              items={managerItems}
              setItems={setManagerItems}
            />
            <ActionItemColumn
              title="Employee Commitments"
              items={employeeItems}
              setItems={setEmployeeItems}
            />
          </div>
        </div>
      )}
    </section>
  )
}
