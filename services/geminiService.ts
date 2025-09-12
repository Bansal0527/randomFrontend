
import { GoogleGenAI, Type } from "@google/genai";
import type { Activity } from '../types';
import { ActivityCategory, Mood } from '../types';
import { Sparkles } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const activitySchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING,
      description: 'A creative and engaging name for the activity. Should be 3-5 words.'
    },
    description: {
      type: Type.STRING,
      description: 'A brief, one-sentence description of the activity.'
    },
    category: {
      type: Type.STRING,
      enum: Object.values(ActivityCategory).filter(c => c !== ActivityCategory.AI),
      description: 'The best-fitting category for this activity.'
    }
  },
  required: ['name', 'description', 'category']
};

export const fetchAISuggestions = async (themeName: string): Promise<Partial<Activity>[]> => {
  if (!API_KEY) {
    return Promise.resolve([]);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 3 unique and creative weekend activity ideas for a '${themeName}' themed weekend.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: activitySchema,
              description: 'An array of 3 activity suggestions.'
            }
          }
        },
      },
    });

    const jsonString = typeof response.text === "string" ? response.text.trim() : "";
    const parsedResponse = jsonString ? JSON.parse(jsonString) : { suggestions: [] };
    
    if (parsedResponse.suggestions && Array.isArray(parsedResponse.suggestions)) {
      return parsedResponse.suggestions.map((suggestion: any) => ({
        ...suggestion,
        category: suggestion.category || ActivityCategory.AI,
        icon: Sparkles,
      }));
    }
    return [];

  } catch (error) {
    console.error("Error fetching AI suggestions:", error);
    return [];
  }
};
