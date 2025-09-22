import OpenAI from "openai";
import configuration from "../config";

const openai = new OpenAI({
  apiKey: configuration.open_api_key, 
  organization: configuration.open_org_id,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return response.data[0].embedding;
}
