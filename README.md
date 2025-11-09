# Agent Weather (Real-time)

An AI-powered weather assistant that uses Google's Gemini AI to fetch and process weather data for Canadian cities. The agent follows a structured workflow with PLAN, ACTION, OBSERVATION, and OUTPUT states.

## Features

- 🤖 AI-driven conversational interface
- 🌡️ Real-time weather data for Edmonton, Calgary, and Red Deer
- 🔄 Multi-step reasoning with tool execution
- 📝 Structured JSON-based agent workflow

## Prerequisites

- Node.js v12 or higher (tested on v22.20.0)
- Google API Key for Gemini AI
- npm or yarn package manager

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Agent-weather( Real time )"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file:**
   ```bash
   touch .env
   ```

4. **Add your Google API key to `.env`:**
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

   Get your API key from: [Google AI Studio](https://makersuite.google.com/app/apikey)

## Usage

Run the application:

```bash
node index.js
```

### Example Queries

```
>> what is the weather of edmonton
The weather in Edmonton is 4°C

>> what is the sum of weather of edmonton and calgary
The sum of weather of edmonton and calgary is 11°C

>> what is the weather of reddeer
The weather in Red Deer is 9°C
```

## How It Works

The agent follows a structured workflow:

1. **START**: User provides a query
2. **PLAN**: AI decides which tool to use
3. **ACTION**: Execute the chosen tool
4. **OBSERVATION**: Receive the result
5. **OUTPUT**: Return the final answer to the user

### Available Tools

- `getWeatherData(city: string)`: Fetches weather data for a specified city
  - Supported cities: Edmonton, Calgary, Red Deer

## Project Structure

```
Agent-weather( Real time )/
├── index.js           # Main application file
├── .env              # Environment variables (not in git)
├── .gitignore        # Git ignore rules
├── package.json      # Project dependencies
└── README.md         # This file
```

## Dependencies

- `@google/genai` - Google Generative AI SDK
- `readline-sync` - Synchronous readline for CLI input
- `dotenv` - Environment variable management
- `openai` - OpenAI SDK (imported but not currently used)

## Configuration

The agent uses the following configuration:

- **Model**: `gemini-2.0-flash-exp`
- **Temperature**: 0.7 (for balanced creativity)
- **Response Format**: JSON objects

## Error Handling

The application includes:

- Retry logic (3 attempts) for network failures
- Automatic delay between requests to avoid rate limiting
- JSON parsing with markdown code block removal
- Extraction of single JSON objects from responses

## Limitations

- Currently supports only 3 Canadian cities
- Weather data is static (hardcoded values)
- Requires active internet connection for AI requests

## Future Enhancements

- [ ] Integration with real weather APIs
- [ ] Support for more cities
- [ ] Historical weather data
- [ ] Weather forecasts
- [ ] Unit conversion (Celsius/Fahrenheit)
- [ ] Error recovery and graceful degradation

## Troubleshooting

**Error: Cannot find package '@google/genai'**
```bash
npm install @google/genai
```

**Error: Cannot find package 'dotenv'**
```bash
npm install dotenv
```

**Error: fetch failed sending request**
- Check your internet connection
- Verify your API key is valid
- Wait a few minutes (might be rate limited)

**Error: Unexpected token in JSON**
- The AI response format might have changed
- Check the system prompt in `index.js`

## License

[Add your license here]

## Contributing

[Add contribution guidelines here]

## Contact

[Add contact information here]