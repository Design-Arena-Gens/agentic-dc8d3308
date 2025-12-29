interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function processMessage(
  userMessage: string,
  workflowState: any,
  conversationHistory: Message[]
) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 800))

  const lowerMessage = userMessage.toLowerCase()

  // Affordability Calculator
  if (lowerMessage.includes('afford') || lowerMessage.includes('calculate')) {
    return {
      message: `Great! Let's calculate your home affordability. I'll need a few details:

1. **Annual household income** - Your total yearly income before taxes
2. **Monthly debt payments** - Car loans, credit cards, student loans, etc.
3. **Down payment amount** - How much you can put down
4. **Credit score range** - This affects your interest rate

What's your annual household income?`,
      workflowUpdate: {
        stage: 'financial',
        data: { ...workflowState.data, startedAffordability: true }
      }
    }
  }

  // Extract financial information
  const incomeMatch = userMessage.match(/\$?([\d,]+)k?/i)
  if (incomeMatch && (lowerMessage.includes('income') || lowerMessage.includes('make') || lowerMessage.includes('earn') || workflowState.data.startedAffordability)) {
    const income = parseInt(incomeMatch[1].replace(/,/g, '')) * (userMessage.includes('k') ? 1000 : 1)

    // Calculate affordability (simplified)
    const maxLoan = income * 3.5
    const monthlyPayment = Math.round((maxLoan * 0.07) / 12)

    return {
      message: `Based on an annual income of $${income.toLocaleString()}, here's your estimated affordability:

📊 **Affordability Analysis:**
• **Maximum home price:** $${Math.round(maxLoan).toLocaleString()}
• **Estimated monthly payment:** $${monthlyPayment.toLocaleString()}
• **Recommended down payment (20%):** $${Math.round(maxLoan * 0.2).toLocaleString()}

This is based on the standard debt-to-income ratio of 28-36%. Your actual buying power may vary based on:
- Credit score
- Existing debt obligations
- Down payment amount
- Current interest rates

What's your credit score range? (Excellent: 740+, Good: 670-739, Fair: 580-669)`,
      workflowUpdate: {
        stage: 'financial',
        data: { ...workflowState.data, income, loanAmount: Math.round(maxLoan) }
      }
    }
  }

  // Credit Score
  if (lowerMessage.match(/\b(740|750|760|770|780|790|800)\b/) || lowerMessage.includes('excellent')) {
    const creditScore = parseInt(userMessage.match(/\d+/)?.[0] || '750')
    return {
      message: `Excellent! A credit score of ${creditScore} puts you in a great position for favorable rates.

🎯 **Current Rate Estimates (as of December 2025):**
• **30-year fixed:** 6.25% - 6.75%
• **15-year fixed:** 5.50% - 6.00%
• **5/1 ARM:** 5.75% - 6.25%

With your credit profile, you'll likely qualify for the lower end of these ranges.

Would you like to:
1. **Get pre-qualified** - Quick estimate of loan amount
2. **Compare loan types** - Fixed vs. ARM, 15 vs. 30 year
3. **Start the application** - Begin formal pre-approval process`,
      workflowUpdate: {
        stage: 'prequalification',
        data: { ...workflowState.data, creditScore }
      }
    }
  }

  // Pre-qualification
  if (lowerMessage.includes('pre-qual') || lowerMessage.includes('pre qual') || lowerMessage.includes('prequalif')) {
    return {
      message: `Perfect! Pre-qualification helps you understand your budget before house hunting. Here's what I need:

📋 **Pre-Qualification Checklist:**
1. ✓ Annual income
2. ✓ Credit score range
3. ☐ Monthly debt obligations (car, student loans, credit cards)
4. ☐ Available down payment
5. ☐ Desired loan type

You've already provided some information. What are your total monthly debt payments? (Enter a dollar amount)`,
      workflowUpdate: {
        stage: 'prequalification',
        data: { ...workflowState.data, prequalStarted: true }
      }
    }
  }

  // Loan types
  if (lowerMessage.includes('loan type') || lowerMessage.includes('mortgage type') || (lowerMessage.includes('type') && lowerMessage.includes('loan'))) {
    return {
      message: `Here are the main mortgage loan types available:

🏠 **Conventional Loans**
• Down payment: 3-20%
• Best for: Good credit (620+), stable income
• No upfront mortgage insurance with 20% down

🏛️ **FHA Loans**
• Down payment: As low as 3.5%
• Best for: First-time buyers, lower credit scores (580+)
• Requires mortgage insurance

🎖️ **VA Loans**
• Down payment: 0%
• Best for: Veterans and active military
• No mortgage insurance required

🌾 **USDA Loans**
• Down payment: 0%
• Best for: Rural property buyers
• Income limits apply

🏦 **Jumbo Loans**
• For amounts exceeding $766,550
• Stricter credit requirements
• Higher interest rates

Which type sounds most suitable for your situation?`,
      workflowUpdate: workflowState
    }
  }

  // Current rates
  if (lowerMessage.includes('rate') || lowerMessage.includes('interest')) {
    return {
      message: `Here are today's estimated mortgage rates:

📈 **Current Mortgage Rates (Dec 2025):**

**Fixed-Rate Mortgages:**
• 30-year fixed: 6.50% (APR 6.72%)
• 20-year fixed: 6.25% (APR 6.45%)
• 15-year fixed: 5.75% (APR 5.95%)
• 10-year fixed: 5.50% (APR 5.68%)

**Adjustable-Rate Mortgages (ARMs):**
• 7/1 ARM: 6.00% (APR 6.85%)
• 5/1 ARM: 6.00% (APR 6.95%)
• 3/1 ARM: 6.25% (APR 7.15%)

*Rates vary based on credit score, down payment, and loan type*

**Sample Monthly Payment:**
$400,000 loan at 6.50% for 30 years = **$2,528/month** (principal & interest)

Would you like me to calculate your specific payment?`,
      workflowUpdate: workflowState
    }
  }

  // Documentation
  if (lowerMessage.includes('document') || lowerMessage.includes('paperwork') || lowerMessage.includes('need to provide')) {
    return {
      message: `Here's what documentation you'll need for your mortgage application:

📄 **Required Documents:**

**Income Verification:**
• Last 2 years of tax returns
• Recent pay stubs (last 30-60 days)
• W-2 forms (last 2 years)
• Bank statements (last 2 months)

**For Self-Employed:**
• Business tax returns (2 years)
• Profit & loss statements
• Business bank statements

**Assets:**
• All bank account statements
• Investment account statements
• Retirement account statements
• Gift letter (if applicable)

**Property:**
• Purchase agreement
• Property appraisal
• Homeowner's insurance quote

**Identity:**
• Government-issued photo ID
• Social Security card
• Proof of residence

I can help you organize these. Which stage are you at in gathering documents?`,
      workflowUpdate: {
        stage: 'documentation',
        data: workflowState.data
      }
    }
  }

  // First-time buyer
  if (lowerMessage.includes('first time') || lowerMessage.includes('first-time')) {
    return {
      message: `Welcome! First-time homebuyers have several advantages:

🎉 **First-Time Buyer Benefits:**

**Lower Down Payments:**
• FHA loans: 3.5% down
• Conventional loans: 3% down
• State programs: Often 0-3% down

**Tax Benefits:**
• Mortgage interest deduction
• Property tax deduction
• First-time buyer tax credits (varies by state)

**Special Programs:**
• Down payment assistance grants
• Closing cost assistance
• Lower interest rates

**Educational Resources:**
• Free homebuyer education courses
• HUD-approved housing counseling
• First-time buyer workshops

**Key Tips:**
1. Get pre-approved first
2. Budget for closing costs (2-5% of home price)
3. Factor in property taxes and insurance
4. Keep an emergency fund

What aspect would you like to explore further?`,
      workflowUpdate: workflowState
    }
  }

  // Down payment
  if (lowerMessage.includes('down payment') || lowerMessage.includes('how much down')) {
    return {
      message: `Down payment requirements vary by loan type:

💰 **Down Payment Options:**

**Minimum Requirements:**
• Conventional: 3-5% (PMI required if <20%)
• FHA: 3.5%
• VA: 0% (for eligible veterans)
• USDA: 0% (for eligible rural properties)

**Recommended: 20%**
• No private mortgage insurance (PMI)
• Lower interest rates
• Smaller monthly payments
• More equity from day one

**Example for $400,000 home:**
• 3.5% down = $14,000
• 5% down = $20,000
• 10% down = $40,000
• 20% down = $80,000

**Down Payment Assistance:**
Many states and cities offer programs:
• Grants (don't need to be repaid)
• Low-interest loans
• Matched savings programs
• Tax credits

How much are you planning to put down?`,
      workflowUpdate: workflowState
    }
  }

  // Default helpful response
  return {
    message: `I'm here to help with your mortgage journey! I can assist with:

🏠 **Services I Offer:**
• Calculate home affordability
• Explain loan types (FHA, VA, Conventional, etc.)
• Provide current interest rates
• Pre-qualification guidance
• Document preparation checklist
• First-time buyer programs
• Down payment strategies
• Refinancing options

**Common Questions:**
• "How much house can I afford?"
• "What are current mortgage rates?"
• "What documents do I need?"
• "Compare loan types"
• "Help me get pre-qualified"

What would you like to know more about?`,
    workflowUpdate: workflowState
  }
}
