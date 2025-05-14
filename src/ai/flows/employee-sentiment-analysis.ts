'use server';

/**
 * @fileOverview Analyzes employee feedback and team chat logs to gauge sentiment.
 *
 * - analyzeEmployeeSentiment - A function that handles the sentiment analysis process.
 * - AnalyzeEmployeeSentimentInput - The input type for the analyzeEmployeeSentiment function.
 * - AnalyzeEmployeeSentimentOutput - The return type for the analyzeEmployeeSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEmployeeSentimentInputSchema = z.object({
  feedbackText: z
    .string()
    .describe('Employee feedback text to analyze for sentiment.'),
  chatLogs: z
    .string()
    .optional()
    .describe('Optional: Team chat logs to analyze for sentiment.'),
});
export type AnalyzeEmployeeSentimentInput = z.infer<
  typeof AnalyzeEmployeeSentimentInputSchema
>;

const AnalyzeEmployeeSentimentOutputSchema = z.object({
  engagementScore: z
    .number()
    .describe(
      'Overall engagement score derived from sentiment analysis (0-100).' // Assuming a scale from 0 to 100
    ),
  emotionalPolarity: z
    .string()
    .describe(
      'General emotional tone (e.g., Positive, Negative, Neutral, Mixed).' // Expanded to include Mixed
    ),
  keyTopics: z
    .string()
    .describe('Key topics or themes identified in the feedback and chat logs.'),
  suggestedActions: z
    .string()
    .describe(
      'Suggested actions for the manager based on the sentiment analysis.'
    ),
});
export type AnalyzeEmployeeSentimentOutput = z.infer<
  typeof AnalyzeEmployeeSentimentOutputSchema
>;

export async function analyzeEmployeeSentiment(
  input: AnalyzeEmployeeSentimentInput
): Promise<AnalyzeEmployeeSentimentOutput> {
  return analyzeEmployeeSentimentFlow(input);
}

const analyzeEmployeeSentimentPrompt = ai.definePrompt({
  name: 'analyzeEmployeeSentimentPrompt',
  input: {schema: AnalyzeEmployeeSentimentInputSchema},
  output: {schema: AnalyzeEmployeeSentimentOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing employee sentiment from feedback and chat logs.

Analyze the following feedback text and chat logs to determine the employee's engagement score, emotional polarity, key topics, and suggest actions for the manager.

Feedback Text: {{{feedbackText}}}
Chat Logs: {{{chatLogs}}}

Provide a concise analysis with actionable insights for the manager.

Output the results in JSON format:
{
  "engagementScore": number,
  "emotionalPolarity": string,
  "keyTopics": string,
  "suggestedActions": string
}`,
});

const analyzeEmployeeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeEmployeeSentimentFlow',
    inputSchema: AnalyzeEmployeeSentimentInputSchema,
    outputSchema: AnalyzeEmployeeSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzeEmployeeSentimentPrompt(input);
    return output!;
  }
);
