import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  // // for Together.ai. Get your api-key and save it in .env file with TOGETHER_API_KEY name
  const openai = createOpenAI({
    baseURL: "https://api.together.xyz/v1",
    apiKey: process.env.TOGETHER_API_KEY,
  });

  const result = await streamText({
    model: openai("meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"),
    prompt: prompt,
  });


  // // for Groq. Get your api-key and save it in .env file with GROQ_API_KEY name
  // const openai = createOpenAI({
  //   baseURL:'https://api.groq.com/openai/v1',
  //   apiKey: process.env.GROQ_API_KEY
  // });

  // const result = await streamText({
  //   model: openai('llama-3.1-70b-versatile'),
  //   prompt: prompt
  // });


  // // For Fireworks.ai. Get your api-key and save it in .env file with FIREWORKS_API_KEY name
  // const openai = createOpenAI({
  //   baseURL:'https://api.fireworks.ai/inference/v1',
  //   apiKey: process.env.FIREWORKS_API_KEY
  // });

  // const result = await streamText({
  //   model: openai('accounts/fireworks/models/llama-v3p1-405b-instruct'),
  //   prompt: prompt
  // });

  return result.toDataStreamResponse();
}
