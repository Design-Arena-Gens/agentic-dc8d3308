'use client'

import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import WorkflowPanel from './components/WorkflowPanel'
import Header from './components/Header'

export default function Home() {
  const [workflowState, setWorkflowState] = useState({
    stage: 'initial',
    data: {} as any
  })

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <ChatInterface
            workflowState={workflowState}
            setWorkflowState={setWorkflowState}
          />
        </div>
        <WorkflowPanel workflowState={workflowState} />
      </div>
    </main>
  )
}
