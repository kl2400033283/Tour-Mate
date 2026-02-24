'use server';
/**
 * @fileOverview This file provides an AI-powered design tool that suggests optimal layouts and design elements
 * based on a brief description of a website's purpose. It exports a function to get AI design suggestions
 * and their corresponding input/output types.
 *
 * - getAiDesignSuggestions - A function that generates design layouts and elements.
 * - AiDesignSuggestionsInput - The input type for the getAiDesignSuggestions function.
 * - AiDesignSuggestionsOutput - The return type for the getAiDesignSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiDesignSuggestionsInputSchema = z.object({
  websiteDescription: z
    .string()
    .describe('A brief description of the website\'s purpose and content.'),
});


const AiDesignSuggestionsOutputSchema = z.object({
  layoutDescription: z
    .string()
    .describe(
      'A high-level description of the suggested page layout (e.g., "A single-page layout with a prominent hero section, followed by feature blocks, testimonials, and a footer.")'
    ),
  suggestedElements: z
    .array(
      z.object({
        type: z
          .string()
          .describe('The type of website element (e.g., "header", "hero", "text-block", "image", "button", "footer", "navigation").'),
        description: z
          .string()
          .describe('A brief description of the element\'s content and purpose.'),
        placeholderContent: z
          .string()
          .optional()
          .describe('Optional: Placeholder text or a description of what the content should be.'),
      })
    )
    .describe('An array of suggested website elements with their types and descriptions.'),
});


export async function getAiDesignSuggestions(
  input
) {
  return aiDesignSuggestionsFlow(input);
}

const aiDesignSuggestionsPrompt = ai.definePrompt({
  name: 'aiDesignSuggestionsPrompt',
  input: {schema: AiDesignSuggestionsInputSchema},
  output: {schema: AiDesignSuggestionsOutputSchema},
  prompt: `You are an AI-powered website design assistant. Your task is to generate an optimal layout and suggest appropriate design elements for a website based on a user's description.

Be concise and provide actionable suggestions.

Website Description: {{{websiteDescription}}}

Based on the description, please provide:
1. A high-level description of the overall page layout.
2. A list of suggested website elements, including their type, a description of their content/purpose, and optional placeholder content.

Ensure your output is a JSON object matching the following schema:
`,
});

const aiDesignSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiDesignSuggestionsFlow',
    inputSchema: AiDesignSuggestionsInputSchema,
    outputSchema: AiDesignSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await aiDesignSuggestionsPrompt(input);
    return output;
  }
);
