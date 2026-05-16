'use server';
/**
 * @fileOverview A Genkit flow that simulates a YC partner interview.
 *
 * - simulateInvestorInterview - A function that handles the simulated investor interview interaction.
 * - SimulateInvestorInterviewInput - The input type for the simulateInvestorInterview function.
 * - SimulateInvestorInterviewOutput - The return type for the simulateInvestorInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationMessageSchema = z.object({
  speaker: z.enum(['Investor', 'Founder']),
  message: z.string(),
});

const SimulateInvestorInterviewInputSchema = z.object({
  startupSummary: z.string().describe('A comprehensive summary of the startup idea, brand, market analysis, GTM, pricing, etc.'),
  conversationHistory: z.array(ConversationMessageSchema).describe('The historical conversation between the investor and the founder.').default([]),
  founderResponse: z.string().optional().describe('The founder\'s latest response to the investor\'s question.'),
  currentInvestorScore: z.number().min(0).max(100).describe('The current investor score for the startup (0-100).'),
});
export type SimulateInvestorInterviewInput = z.infer<typeof SimulateInvestorInterviewInputSchema>;

const SimulateInvestorInterviewOutputSchema = z.object({
  investorQuestion: z.string().describe('The AI investor\'s next tough question or critical feedback.'),
  scoreAdjustmentFeedback: z.string().describe('Feedback on how the founder\'s last response impacted the score.'),
  newInvestorScore: z.number().min(0).max(100).describe('The dynamically updated investor score (0-100).'),
  conversationHistory: z.array(ConversationMessageSchema).describe('The updated conversation history including the AI\'s response.'),
});
export type SimulateInvestorInterviewOutput = z.infer<typeof SimulateInvestorInterviewOutputSchema>;

export async function simulateInvestorInterview(input: SimulateInvestorInterviewInput): Promise<SimulateInvestorInterviewOutput> {
  return simulateInvestorInterviewFlow(input);
}

const investorInterviewPrompt = ai.definePrompt({
  name: 'investorInterviewPrompt',
  input: {schema: SimulateInvestorInterviewInputSchema},
  output: {schema: SimulateInvestorInterviewOutputSchema},
  prompt: `You are a critical but fair YC Partner conducting a tough interview with a founder.
Your goal is to simulate a realistic, challenging, and insightful interview experience.

Here is the current startup's summary:
{{{startupSummary}}}

Current investor score: {{{currentInvestorScore}}}/100.

Conversation History:
{{#each conversationHistory}}
  {{this.speaker}}: {{this.message}}
{{/each}}

{{#if founderResponse}}
The founder's latest response was: "{{{founderResponse}}}"

Critically evaluate this response. Identify its strengths and weaknesses.
Based on the founder's response and the overall startup context, adjust the currentInvestorScore. The adjustment should be proportional to the quality of the response, maintaining a score between 0 and 100.
Explain *why* the score changed in the scoreAdjustmentFeedback.
Then, ask a challenging follow-up question or provide critical feedback to push the founder further.
{{else}}
Welcome the founder to the interview. Set the initial scoreAdjustmentFeedback to "Initial assessment based on startup summary. Let's begin the interview."
Your newInvestorScore should be the currentInvestorScore (as this is the first question).
Then, ask your first challenging question based on the startup summary to probe their understanding of the market, problem, or solution.
{{/if}}

Ensure your response is structured exactly as a JSON object matching the output schema.`,
});

const simulateInvestorInterviewFlow = ai.defineFlow(
  {
    name: 'simulateInvestorInterviewFlow',
    inputSchema: SimulateInvestorInterviewInputSchema,
    outputSchema: SimulateInvestorInterviewOutputSchema,
  },
  async input => {
    // Add founder's response to history if it exists
    const updatedConversationHistory = [...input.conversationHistory];
    if (input.founderResponse) {
      updatedConversationHistory.push({ speaker: 'Founder', message: input.founderResponse });
    }

    const promptInput = {
      ...input,
      conversationHistory: updatedConversationHistory, // Pass updated history to prompt
    };

    const {output} = await investorInterviewPrompt(promptInput);

    if (!output) {
      throw new Error('Failed to get output from investor interview prompt.');
    }

    // Add investor's response to history before returning
    output.conversationHistory = [
      ...updatedConversationHistory,
      { speaker: 'Investor', message: output.investorQuestion },
    ];

    return output;
  }
);
