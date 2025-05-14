// use server'

/**
 * @fileOverview Predicts employee attrition risk based on factors like tenure, performance, and sentiment.
 *
 * - analyzeAttritionRisk - A function that analyzes the attrition risk of an employee.
 * - AttritionRiskInput - The input type for the analyzeAttritionRisk function.
 * - AttritionRiskOutput - The return type for the analyzeAttritionRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AttritionRiskInputSchema = z.object({
  employeeId: z.string().describe('The unique ID of the employee.'),
  tenure: z.number().describe('The employee’s tenure in months.'),
  lastAppraisalScore: z.number().describe('The employee’s score in the last performance appraisal.'),
  recentLeaves: z.number().describe('Number of leave days taken in the last 3 months.'),
  sentimentTrend: z.string().describe('The recent trend of employee sentiment (positive, negative, neutral).'),
  feedbackText: z.string().optional().describe('Optional: Recent feedback text from the employee.'),
});
export type AttritionRiskInput = z.infer<typeof AttritionRiskInputSchema>;

const AttritionRiskOutputSchema = z.object({
  riskScore: z.number().describe('The predicted attrition risk score (0-100).'),
  riskLevel: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('The level of attrition risk.'),
  reason: z.string().describe('The primary reason for the predicted risk level.'),
  suggestedAction: z
    .string()
    .optional()
    .describe('A suggested action for HR based on the analysis.'),
});
export type AttritionRiskOutput = z.infer<typeof AttritionRiskOutputSchema>;

export async function analyzeAttritionRisk(input: AttritionRiskInput): Promise<AttritionRiskOutput> {
  return analyzeAttritionRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'attritionRiskPrompt',
  input: {schema: AttritionRiskInputSchema},
  output: {schema: AttritionRiskOutputSchema},
  prompt: `You are an HR analyst specializing in predicting employee attrition risk.

  Analyze the provided employee data and predict the likelihood of attrition.
  Provide a risk score (0-100), a risk level (LOW, MEDIUM, HIGH), and the primary reason for the predicted risk.
  Also, suggest a specific action that HR can take to address the potential issue.

  Employee ID: {{{employeeId}}}
  Tenure: {{{tenure}}} months
  Last Appraisal Score: {{{lastAppraisalScore}}}
  Recent Leaves: {{{recentLeaves}}} days
  Sentiment Trend: {{{sentimentTrend}}}
  Feedback Text: {{{feedbackText}}}

  Format your response as a JSON object with the following keys:
  - riskScore: number (0-100)
  - riskLevel: string (LOW, MEDIUM, HIGH)
  - reason: string
  - suggestedAction: string (optional)

  Consider these factors when determining risk:
  - Low appraisal scores and negative sentiment trends increase risk.
  - Frequent leaves may indicate disengagement or health issues.
  - Short tenures may indicate a lack of commitment, while very long tenures may indicate stagnation.
`,
});

const analyzeAttritionRiskFlow = ai.defineFlow(
  {
    name: 'analyzeAttritionRiskFlow',
    inputSchema: AttritionRiskInputSchema,
    outputSchema: AttritionRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
