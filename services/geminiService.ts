
import { GoogleGenAI, Type } from "@google/genai";
import type { WeatherData } from "../types";
import { marked } from 'marked';


const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const weatherSchema = {
    type: Type.OBJECT,
    properties: {
        location: { type: Type.STRING },
        forecast: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING },
                    highTemp: { type: Type.INTEGER, description: "High temperature in Celsius" },
                    lowTemp: { type: Type.INTEGER, description: "Low temperature in Celsius" },
                    condition: { type: Type.STRING },
                    icon: { 
                        type: Type.STRING,
                        enum: ['SUNNY', 'CLOUDY', 'PARTLY_CLOUDY', 'RAIN', 'STORM', 'SNOW', 'WINDY', 'FOGGY'],
                    },
                },
                required: ["day", "highTemp", "lowTemp", "condition", "icon"],
            },
        },
        explanation: {
            type: Type.OBJECT,
            properties: {
                algorithm: { type: Type.STRING, description: "The name of the ML algorithm being explained, e.g., 'Random Forest'." },
                description: { type: Type.STRING, description: "A detailed explanation of how the algorithm is used in weather forecasting. Should be in Markdown format." },
            },
            required: ["algorithm", "description"],
        },
    },
    required: ["location", "forecast", "explanation"],
};

export const fetchWeatherForecast = async (location: string): Promise<WeatherData> => {
    const prompt = `
        Generate a realistic 7-day weather forecast for ${location}.
        Also, provide a detailed but easy-to-understand explanation of how one of the following machine learning algorithms is used for weather forecasting: Random Forest, Decision Tree, or Bayesian Learning. Pick one algorithm and explain it.
        
        The output must be a single JSON object that conforms to the provided schema. Ensure the 'description' in the explanation is in Markdown format.
        Temperatures should be in Celsius.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: weatherSchema,
            },
        });
        
        const jsonText = response.text.trim();
        const data: WeatherData = JSON.parse(jsonText);
        
        // Sanitize and parse markdown
        if (data.explanation && data.explanation.description) {
            data.explanation.description = marked.parse(data.explanation.description) as string;
        }

        return data;

    } catch (error) {
        console.error("Error fetching or parsing weather data from Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};
