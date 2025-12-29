import { Calculator, FileText, Home, TrendingUp } from 'lucide-react'

interface QuickActionsProps {
  onAction: (action: string) => void
}

const actions = [
  { icon: Calculator, label: 'Calculate Affordability', prompt: 'Help me calculate how much house I can afford' },
  { icon: FileText, label: 'Pre-Qualification', prompt: 'I want to get pre-qualified for a mortgage' },
  { icon: Home, label: 'Loan Types', prompt: 'What types of mortgage loans are available?' },
  { icon: TrendingUp, label: 'Current Rates', prompt: 'What are the current mortgage rates?' },
]

export default function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction(action.prompt)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
        >
          <action.icon className="h-4 w-4 text-primary-600" />
          <span className="text-gray-700 truncate">{action.label}</span>
        </button>
      ))}
    </div>
  )
}
