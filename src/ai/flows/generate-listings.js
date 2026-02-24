'use server';
/**
 * @fileOverview This file provides an AI-powered tool for generating listings of homestays and tour guides for a given city.
 *
 * - generateListings - A function that generates homestay or tour guide listings.
 * - GenerateListingsInput - The input type for the generateListings function.
 * - GenerateListingsOutput - The return type for the generateListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateListingsInputSchema = z.object({
  city: z.string().describe('The city for which to generate listings.'),
  listingType: z.enum(['homestays', 'guides']).describe('The type of listings to generate.'),
});
export type GenerateListingsInput = z.infer<typeof GenerateListingsInputSchema>;

const HomestaySchema = z.object({
    name: z.string().describe('The name of the homestay.'),
    location: z.string().describe('A nearby tourist location, landmark, or area within the city.'),
    price: z.number().describe('The cost per night in the local currency (e.g., INR).'),
    rating: z.number().min(3).max(5).describe('The rating of the homestay, on a scale of 1 to 5.'),
    imageHint: z.string().describe('Two-word hint for a placeholder image (e.g., "modern room").')
});

const GuideSchema = z.object({
    name: z.string().describe('The full name of the tour guide.'),
    specialty: z.string().describe('The guide\'s area of expertise (e.g., "Historical Tours", "Food & Culinary", "Spiritual Sites").'),
    rate: z.number().describe('The guide\'s hourly or daily rate in the local currency (e.g., INR).'),
    rating: z.number().min(3).max(5).describe('The guide\'s rating, on a scale of 1 to 5.'),
    imageHint: z.string().describe('Two-word hint for a placeholder image (e.g., "friendly guide").')
});

const GenerateListingsOutputSchema = z.object({
  listings: z.array(z.union([HomestaySchema, GuideSchema])).describe('An array of generated listings.')
});


const HomestayWithIdSchema = HomestaySchema.extend({
  id: z.string(),
});

const GuideWithIdSchema = GuideSchema.extend({
  id: z.string(),
});

const GenerateListingsFlowOutputSchema = z.object({
  listings: z.array(z.union([HomestayWithIdSchema, GuideWithIdSchema]))
});

export type GenerateListingsOutput = z.infer<typeof GenerateListingsFlowOutputSchema>;


export async function generateListings(input) {
  return generateListingsFlow(input);
}

const generateListingsPrompt = ai.definePrompt({
  name: 'generateListingsPrompt',
  input: {schema: GenerateListingsInputSchema},
  output: {schema: GenerateListingsOutputSchema},
  prompt: `You are an expert travel agent. Generate a list of at least 30 realistic {{listingType}} for the city of {{city}}.

Provide a diverse range of options, including different price points, locations, and specialties.

For homestays, the location should be a well-known landmark or area. The price should be a realistic nightly rate in INR.
For guides, the rate should be a realistic hourly rate in INR.

Ensure your output is a JSON object matching the requested schema.
`,
});

const generateListingsFlow = ai.defineFlow(
  {
    name: 'generateListingsFlow',
    inputSchema: GenerateListingsInputSchema,
    outputSchema: GenerateListingsFlowOutputSchema,
  },
  async (input) => {
    const {output} = await generateListingsPrompt(input);
    const listingsWithIds = output.listings.map((item, index) => ({
      ...item,
      id: `${input.city.replace(/\s/g, '-')}-${input.listingType}-${index}`,
    }));
    return { listings: listingsWithIds };
  }
);
