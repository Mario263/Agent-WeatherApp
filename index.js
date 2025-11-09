import OpenAI from 'openai'
import dotenv from 'dotenv'

import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync'


dotenv.config()

const genAI = new GoogleGenAI({apiKey: process.env.GOOGLE_API_KEY});

// this is the part where I make the respective tool for the llm to interact with my own assigned task and the respective tools

function getWeatherData(city = ''){
    if (city.toLowerCase() === 'edmonton') return '4°C';
    if (city.toLowerCase() === 'calgary') return '7°C';
    if (city.toLowerCase() === 'reddeer') return '9°C'
}

const tools = {
    'getWeatherData': getWeatherData

}

// ...existing code...

const SYSTEM_PROMPT= `
You are an AI assistant with START, PLAN, ACTION, Observations and Output state.
Wait for the user prompt and first PLAN using available tools.
After Planning, take the ACTION with appropriate tools and wait for the Observation based on Action.
Once you get the Observations, return the AI response based on START prompt and observations.

IMPORTANT: Return ONLY ONE JSON object at a time. Do not return multiple JSON objects in one response.
STRICTLY follow the JSON output as in examples. DO NOT wrap JSON in markdown code blocks.

Available tools:
- function getWeatherData(city: string): string
getWeatherData is a function that accepts city name as string and returns the weather data of that city.


Example:
START
{
    "type": "user",
    "user": "what is the sum of weather of edmonton and calgary today?"
}
{
    "type": "plan",
    "plan": "I will call the getWeatherData for Edmonton"
}
{
    "type":"action",
    "function": "getWeatherData", "input":"edmonton"
}
{
    "type":"observation",
    "observation": "4°C"
}
{
    "type":"plan",
    "plan": "I will call the getWeatherData for Calgary"
}
{
    "type":"action",
    "function": "getWeatherData", "input":"calgary"
}
{
    "type":"observation",
    "observation": "7°C"
}
{
    "type":"output",
    "output": "The sum of weather of edmonton and calgary today is 11°C"
}
`;

// ...existing code...

const messages = [SYSTEM_PROMPT]; 


while(true){
    const query = readlineSync.question('>> ');
    const q = {
        type: 'user',
        user: query,
    };
    messages.push(JSON.stringify(q));

    while(true){
        const fullPrompt = messages.join('\n\n');
        const response = await genAI.models.generateContent({
            model: "gemini-2.0-flash-exp",
            contents: fullPrompt,
        });
        let text = response.text;
        
        // Remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        // Extract only the first JSON object
        const firstBraceIndex = text.indexOf('{');
        if (firstBraceIndex !== -1) {
            let braceCount = 0;
            let endIndex = firstBraceIndex;
            
            for (let i = firstBraceIndex; i < text.length; i++) {
                if (text[i] === '{') braceCount++;
                if (text[i] === '}') braceCount--;
                if (braceCount === 0) {
                    endIndex = i + 1;
                    break;
                }
            }
            
            text = text.substring(firstBraceIndex, endIndex);
        }
        
        messages.push(text);

        const call = JSON.parse(text);

        if (call.type == 'output'){
            console.log(`${call.output}`);
            break;
        
        } else if (call.type == 'action'){
            const fn = tools[call.function]
            const observation = fn(call.input)
            const obs = {"type": 'observation', "observation": observation}
            messages.push(JSON.stringify(obs))

        }

    }
}