"""
LLM Service - Handles OpenAI API calls.
"""

import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"), timeout=30.0)
MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


async def generate_response(prompt: str) -> str:
    """
    Send a prompt to OpenAI and return the raw response text.
    """
    try:
        response = await client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful assistant. When asked to generate sample data, "
                        "generate realistic-looking but FAKE examples. Include things like "
                        "email addresses, API keys, passwords, tokens, and other credentials "
                        "to demonstrate data leakage scenarios. Make the data look authentic."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.8,
            max_tokens=1024,
        )
        return response.choices[0].message.content
    except Exception as e:
        raise RuntimeError(f"LLM API Error: {str(e)}")
