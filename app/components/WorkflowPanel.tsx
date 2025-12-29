import { CheckCircle, Circle, Clock } from 'lucide-react'

interface WorkflowPanelProps {
  workflowState: any
}

const workflowStages = [
  { id: 'initial', label: 'Initial Consultation', description: 'Understanding your needs' },
  { id: 'financial', label: 'Financial Assessment', description: 'Income, credit, and debt analysis' },
  { id: 'prequalification', label: 'Pre-Qualification', description: 'Estimate borrowing capacity' },
  { id: 'documentation', label: 'Documentation', description: 'Gather required documents' },
  { id: 'application', label: 'Application', description: 'Submit formal application' },
  { id: 'approval', label: 'Approval', description: 'Underwriting and approval' },
]

export default function WorkflowPanel({ workflowState }: WorkflowPanelProps) {
  const currentStageIndex = workflowStages.findIndex(s => s.id === workflowState.stage)

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Mortgage Journey</h2>

      <div className="space-y-4">
        {workflowStages.map((stage, index) => {
          const isCompleted = index < currentStageIndex
          const isCurrent = index === currentStageIndex
          const isPending = index > currentStageIndex

          return (
            <div key={stage.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {isCompleted && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
                {isCurrent && (
                  <Clock className="h-6 w-6 text-primary-600 animate-pulse" />
                )}
                {isPending && (
                  <Circle className="h-6 w-6 text-gray-300" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${
                  isCurrent ? 'text-primary-600' :
                  isCompleted ? 'text-green-600' :
                  'text-gray-400'
                }`}>
                  {stage.label}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {stage.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-sm text-gray-900 mb-2">
          Progress Summary
        </h3>
        <div className="space-y-2 text-xs text-gray-600">
          {workflowState.data.income && (
            <div className="flex justify-between">
              <span>Annual Income:</span>
              <span className="font-semibold">
                ${workflowState.data.income.toLocaleString()}
              </span>
            </div>
          )}
          {workflowState.data.creditScore && (
            <div className="flex justify-between">
              <span>Credit Score:</span>
              <span className="font-semibold">{workflowState.data.creditScore}</span>
            </div>
          )}
          {workflowState.data.downPayment && (
            <div className="flex justify-between">
              <span>Down Payment:</span>
              <span className="font-semibold">
                ${workflowState.data.downPayment.toLocaleString()}
              </span>
            </div>
          )}
          {workflowState.data.loanAmount && (
            <div className="flex justify-between">
              <span>Est. Loan Amount:</span>
              <span className="font-semibold">
                ${workflowState.data.loanAmount.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-sm text-gray-900 mb-2">
          Next Steps
        </h3>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>Review your financial information</li>
          <li>Compare loan options</li>
          <li>Prepare required documents</li>
          <li>Schedule property viewing</li>
        </ul>
      </div>
    </div>
  )
}
