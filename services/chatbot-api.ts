import type { DiseaseAnalysis } from '../types/chatbot';

const DISEASE_API_URL = process.env.NEXT_PUBLIC_DISEASE_API_URL || 'https://plant-disease-api-891533437525.us-central1.run.app/predict';
const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://langbot-backend-service-891533437525.us-central1.run.app/chat';

export const analyzePlantDisease = async (file: File): Promise<DiseaseAnalysis> => {
  const formData = new FormData();
  // The FormData API is designed to work directly with File objects.
  // Removing the manual conversion to a Blob simplifies the code and is more reliable.
  formData.append('file', file, file.name);

  const response = await fetch(DISEASE_API_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Disease analysis failed: ${response.statusText}. Body: ${errorBody}`);
  }
  return response.json();
};

export const askChatbot = async (question: string): Promise<string> => {
    const response = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Chatbot request failed: ${response.statusText}. Body: ${errorBody}`);
    }
    const data = await response.json();
    return data.answer;
};
