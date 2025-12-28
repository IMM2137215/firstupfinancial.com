import { GoogleGenAI } from "@google/genai";
import { CreditAccount } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Analyze for factual inconsistencies across bureaus
export const analyzeCreditAccount = async (account: CreditAccount): Promise<string> => {
  const modelId = 'gemini-3-flash-preview';
  const prompt = `
    You are an expert FCRA (Fair Credit Reporting Act) compliance analyst. 
    Analyze the following credit account data for a single trade line across three bureaus (Experian, Equifax, TransUnion).
    Identify SPECIFIC factual inconsistencies such as:
    - Mismatched balances
    - Mismatched "Date Opened" or "Date of Last Activity"
    - Inconsistent account status (e.g., Current vs Late)
    - Missing data from one bureau

    Data:
    ${JSON.stringify(account, null, 2)}

    Output Format:
    Return a bulleted list of 2-3 key factual errors found. If the data looks consistent, suggest verifying the "Method of Verification".
    Keep the tone professional and analytical. Do not promise a deletion.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
    });
    return response.text || "Analysis incomplete. Please review manually.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Unable to perform AI analysis at this time. Please check your connection.";
  }
};

// Generate a compliant dispute letter
export const generateDisputeLetter = async (
  account: CreditAccount, 
  inconsistencies: string, 
  round: 'ROUND_1_CREDITOR' | 'ROUND_2_BUREAU'
): Promise<string> => {
  const modelId = 'gemini-3-flash-preview'; // Flash is sufficient for structured drafting
  
  let promptContext = "";
  if (round === 'ROUND_1_CREDITOR') {
    promptContext = `
      Write a "Validation Demand Letter" to the DATA FURNISHER (Creditor: ${account.creditorName}).
      OBJECTIVE: Demand proof of the debt and accuracy of reporting under FCRA Section 623.
      KEY FACTS:
      ${inconsistencies}
      
      INSTRUCTIONS:
      - Use a formal, legalistic but polite tone.
      - Reference the factual inconsistencies explicitly.
      - Demand "original wet-ink contract" or "proof of accounting".
      - DO NOT admit ownership of the debt. Use phrases like "alleged account".
      - Structure it with placeholders for [My Name], [My Address], [Date].
    `;
  } else {
    promptContext = `
      Write a "Method of Verification Request" to the CREDIT BUREAUS.
      OBJECTIVE: Follow up on a previous dispute under FCRA Section 611(a)(7).
      KEY FACTS:
      The creditor failed to validate the debt properly in Round 1.
      ${inconsistencies}

      INSTRUCTIONS:
      - Demand the specific description of the procedure used to determine the accuracy.
      - Ask for the name and address of the person contacted at the creditor.
      - Cite FCRA Section 611 explicitly.
      - Structure it with placeholders for [My Name], [My Address], [Date].
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: promptContext,
    });
    return response.text || "Error generating letter.";
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    return "Unable to generate letter at this time.";
  }
};
