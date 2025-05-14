// src/ai/flows/smart-candidate-matching.ts
'use server';
/**
 * @fileOverview Smart Candidate Matching AI agent.
 *
 * - smartCandidateMatching - A function that handles the candidate matching process.
 * - SmartCandidateMatchingInput - The input type for the smartCandidateMatching function.
 * - SmartCandidateMatchingOutput - The return type for the smartCandidateMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartCandidateMatchingInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The candidate's resume file content as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description text.'),
});
export type SmartCandidateMatchingInput = z.infer<typeof SmartCandidateMatchingInputSchema>;

const SmartCandidateMatchingOutputSchema = z.object({
  jobMatchScore: z.number().describe('The job match score as a percentage.'),
  suggestedQuestions: z.string().describe('Suggested interview questions.'),
});
export type SmartCandidateMatchingOutput = z.infer<typeof SmartCandidateMatchingOutputSchema>;

export async function smartCandidateMatching(input: SmartCandidateMatchingInput): Promise<SmartCandidateMatchingOutput> {
  return smartCandidateMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartCandidateMatchingPrompt',
  input: {schema: SmartCandidateMatchingInputSchema},
  output: {schema: SmartCandidateMatchingOutputSchema},
  prompt: `You are an expert HR assistant specializing in candidate screening and interview question generation.

You will use the candidate's resume (provided as a media object) and the job description text to assess the fit and generate relevant interview questions.

Candidate Resume: {{media url=resumeDataUri}}
Job Description: {{{jobDescription}}}

Based on the above information, generate a job match score as a percentage and suggest interview questions to assess the candidate's suitability for the role.
`,
});

const smartCandidateMatchingFlow = ai.defineFlow(
  {
    name: 'smartCandidateMatchingFlow',
    inputSchema: SmartCandidateMatchingInputSchema,
    outputSchema: SmartCandidateMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
