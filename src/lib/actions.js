'use server';

import {
  getAiDesignSuggestions,
} from '@/ai/flows/ai-design-suggestions';
import { generateListings } from '@/ai/flows/generate-listings';

export async function getAiDesignSuggestionsAction(
  input
) {
  try {
    const suggestions = await getAiDesignSuggestions(input);
    return suggestions;
  } catch (error) {
    console.error('Error in getAiDesignSuggestionsAction:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get AI suggestions: ${error.message}`);
    }
    throw new Error('An unknown error occurred while getting AI suggestions.');
  }
}

export async function generateListingsAction(input) {
    try {
        const result = await generateListings(input);
        return result.listings;
    } catch (error) {
        console.error('Error in generateListingsAction:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate listings: ${error.message}`);
        }
        throw new Error('An unknown error occurred while generating listings.');
    }
}
