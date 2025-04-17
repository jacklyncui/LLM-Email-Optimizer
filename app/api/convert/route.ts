import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { text, tone } = body;
    
    console.log('Received request:', { text: text.substring(0, 50) + '...', tone });
    
    if (!text || !tone) {
      console.log('Missing required fields');
      return NextResponse.json({ error: 'Text and tone are required' }, { status: 400 });
    }
    
    // Create completion with OpenAI
    console.log('Calling OpenAI API...');
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert email editor. Rewrite the user's email to sound ${tone}, while preserving all the original information and intent. The tone should be natural and appropriate for professional communication.`
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
    });
    
    const result = completion.choices[0].message.content;
    console.log('OpenAI response received:', result?.substring(0, 50) + '...');
    
    // Return the result
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: 'An error occurred processing your request',
      details: (error as Error).message 
    }, { status: 500 });
  }
}