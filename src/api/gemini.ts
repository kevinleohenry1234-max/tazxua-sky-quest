// Gemini API integration for prompt generation
const GEMINI_API_KEY = import.meta.env.VITE_AIML_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export const generatePromptWithGemini = async (systemPrompt: string, context: any): Promise<string> => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not found in environment variables');
  }

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: systemPrompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = `Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`;
      console.error('Gemini API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      const errorMessage = 'No response generated from Gemini API';
      console.error('Gemini API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return generatedText.trim();

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};

// Fallback prompt templates for when Gemini API is not available
export const generateFallbackPrompt = (context: {
  userIdea: string;
  instrument?: string;
  mood?: string;
  timeOfDay?: string;
}): string => {
  const templates = [
    `A ${context.mood || 'peaceful'} instrumental piece featuring ${context.instrument || 'traditional Vietnamese ethnic instruments'} that captures ${context.userIdea}. The music flows like mountain streams in Tà Xùa, with gentle melodies that echo through misty valleys during ${context.timeOfDay || 'dawn'}. Soft bamboo flutes interweave with subtle percussion, creating an atmosphere of tranquil meditation and connection with nature.`,
    
    `Ethereal ${context.instrument || 'ethnic Vietnamese music'} composition inspired by ${context.userIdea}. The melody dances like morning mist over Tà Xùa peaks, with ${context.mood || 'contemplative'} tones that speak of ancient traditions. Natural reverb and organic rhythms create a soundscape perfect for ${context.timeOfDay || 'peaceful moments'}, blending traditional techniques with the soul of Vietnamese mountain culture.`,
    
    `A ${context.mood || 'serene'} musical journey through ${context.userIdea}, performed on ${context.instrument || 'traditional Vietnamese instruments'}. The composition captures the essence of ${context.timeOfDay || 'mountain mornings'} in Tà Xùa, with flowing melodies that mirror the gentle sway of bamboo forests and the whispered songs of ethnic communities living in harmony with nature.`,

    `Mystical ${context.instrument || 'Vietnamese ethnic instruments'} that evoke ${context.userIdea}. The ${context.mood || 'meditative'} soundscape transports listeners to the sacred mountains of Tà Xùa during ${context.timeOfDay || 'twilight hours'}. Ancient melodies blend with the natural acoustics of mountain caves, creating a spiritual connection between earth and sky through traditional Vietnamese musical heritage.`,

    `Delicate ${context.instrument || 'traditional instruments'} weaving together ${context.userIdea} in a ${context.mood || 'harmonious'} tapestry of sound. The music captures the essence of ${context.timeOfDay || 'early morning'} in Vietnamese highlands, where ethnic communities have preserved their musical traditions for generations. Each note resonates with the wisdom of ancestors and the beauty of untouched nature.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};