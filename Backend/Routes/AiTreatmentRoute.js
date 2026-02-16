import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn("Warning: GEMINI_API_KEY is not configured. AI features will use fallback responses.");
}

const genAI = apiKey && apiKey !== 'your_gemini_api_key_here' ? new GoogleGenerativeAI(apiKey) : null;

// Initialize Gemini model only if API key is valid
// Using gemini-1.5-flash for fast and efficient AI responses
const model = genAI ? genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "Generate AI-based treatment recommendations for plant diseases in JSON format. Use simple and clear English.",
}) : null;

// Fallback treatment response when API key is not configured
const getFallbackTreatment = (plantName, detectedDisease, preferredTreatmentType) => ({
  disease_explanation: `${detectedDisease} is a common plant disease affecting ${plantName}. It typically causes damage to plant tissues and can spread if not treated promptly.`,
  treatment_recommendations: {
    organic: preferredTreatmentType === 'Organic' || preferredTreatmentType === 'Both' 
      ? "Apply neem oil spray (5ml per liter of water) weekly. Use compost tea to boost plant immunity. Remove and destroy infected plant parts."
      : null,
    chemical: preferredTreatmentType === 'Chemical' || preferredTreatmentType === 'Both'
      ? "Apply appropriate fungicide or pesticide as per label instructions. Ensure proper dosage and safety measures. Repeat application as recommended."
      : null,
    both: preferredTreatmentType === 'Both'
      ? "Combine organic methods (neem oil, compost tea) with targeted chemical treatments for severe cases. Start with organic methods and use chemicals only if necessary."
      : null
  },
  preventive_measures: "Maintain proper plant spacing for air circulation. Water at the base to keep foliage dry. Remove infected plant debris. Practice crop rotation. Use disease-resistant varieties when possible.",
  best_recovery_practices: "Ensure adequate nutrition with balanced fertilizer. Maintain consistent watering schedule. Prune affected areas. Monitor plants regularly for early detection. Improve soil drainage if needed.",
  expert_advice: "Note: This is a general recommendation. For accurate diagnosis and treatment, please consult with a local agricultural extension officer or plant pathologist. Consider getting a soil test and ensure proper plant nutrition for better disease resistance."
});

router.post("/treatment", async (req, res) => {
  const {
    plantName,
    detectedDisease,
    observedSymptoms,
    affectedParts,
    severityLevel,
    spreadRate,
    weatherConditions,
    preferredTreatmentType,
    previousDiseaseHistory,
  } = req.body;

  try {
    // Ensure required fields are present
    if (!plantName || !detectedDisease || !observedSymptoms) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // If no valid API key, use fallback response
    if (!genAI || !model) {
      console.log("Using fallback treatment response (API key not configured)");
      const fallbackTreatment = getFallbackTreatment(plantName, detectedDisease, preferredTreatmentType);
      return res.json({ treatment: fallbackTreatment });
    }

    const prompt = `
     Based on the following input from a farmer, provide treatment recommendations strictly in JSON format. Ensure the output is always valid JSON without any extra text or markdown formatting.

      **Input Details:**
      - **Plant Name:** ${plantName}
      - **Detected Disease:** ${detectedDisease}
      - **Observed Symptoms:** ${observedSymptoms}
      - **Affected Parts:** ${affectedParts}
      - **Severity Level:** ${severityLevel}
      - **Spread Rate:** ${spreadRate}
      - **Weather Conditions:** ${weatherConditions}
      - **Preferred Treatment Type:** ${preferredTreatmentType}
      - **Previous Disease History:** ${previousDiseaseHistory}

      **Expected JSON Output Format:**
      {
        "disease_explanation": "<Brief explanation of the disease>",
        "treatment_recommendations": {
          "organic": "<Organic treatment options (if applicable)>",
          "chemical": "<Chemical treatment options (if applicable)>",
          "both": "<Both organic and chemical treatment options>"
        },
        "preventive_measures": "<Preventive measures to avoid future outbreaks>",
        "best_recovery_practices": "<Best practices for plant recovery>",
        "expert_advice": "<Any additional expert advice>"
      }
    `;

    try {
      // Call Gemini AI
      let aiResponse = await model.generateContent(prompt);
      aiResponse = await aiResponse.response.text();

      console.log("Raw AI Response:", aiResponse);

      // Clean up markdown formatting if present
      aiResponse = aiResponse.replace(/```json|```/g, "").trim();

      // Parse JSON safely
      const parsedResponse = JSON.parse(aiResponse);

      res.json({ treatment: parsedResponse });
    } catch (aiError) {
      console.error("AI generation failed, using fallback:", aiError.message);
      // If AI fails, use fallback
      const fallbackTreatment = getFallbackTreatment(plantName, detectedDisease, preferredTreatmentType);
      return res.json({ treatment: fallbackTreatment });
    }
  } catch (error) {
    console.error("Error generating AI treatment:", error);
    // Always return fallback on any error
    try {
      const fallbackTreatment = getFallbackTreatment(plantName, detectedDisease, preferredTreatmentType);
      return res.json({ treatment: fallbackTreatment });
    } catch (fallbackError) {
      return res.status(500).json({ message: "Error generating treatment recommendation", error: error.message });
    }
  }
});

export default router;
