import requests
import os
import json

from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

rapid_api_key = os.getenv("RAPID_API_KEY")


url = "https://gpt-4o-mini2.p.rapidapi.com/v1/chat/completions"

system_prompt = """You are an expert coding challenge creator.
    Your task is to generate a coding question with multiple choice answers.
    The question should be appropriate for the specified difficulty level.

    For easy questions: Focus on basic syntax, simple operations, or common programming concepts.
    For medium questions: Cover intermediate concepts like data structures, algorithms, or language features.
    For hard questions: Include advanced topics, design patterns, optimization techniques, or complex algorithms.

    Return the challenge in the following JSON structure:
    {
        "title": "The question title",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correct_answer_id": 0, // Index of the correct answer (0-3)
        "explanation": "Detailed explanation of why the correct answer is right"
    }

    Make sure the options are plausible but with only one clearly correct answer.
    """


def generate_challenge_with_ai(difficulty: str) -> Dict[str, Any]:
    try:
        payload = {
            'messages': [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Generate a {difficulty} difficulty coding challenge."}
            ],
            'response_format': {"type": "json_object"},
            'temperature': 0.7,
            "model": "gpt-4o-mini",
            "max_tokens": 100,
        }
        headers = {
            "x-rapidapi-key": rapid_api_key,
            "x-rapidapi-host": "gpt-4o-mini2.p.rapidapi.com",
            "Content-Type": "application/json"
        }

        response = requests.post(url, json=payload, headers=headers)

        content = response.choices[0].message.content
        challenge_data = json.loads(content)

        required_fields = ["title", "options",
                           "correct_answer_id", "explanation"]

        for field in required_fields:
            if field not in challenge_data:
                raise ValueError(f'Missing required filed: {field}')

        return challenge_data

    except Exception as e:
        print(e)
        return {
            "title": "Basic Python List Operation",
            "options": [
                "my_list.append(5)",
                "my_list.add(5)",
                "my_list.push(5)",
                "my_list.insert(5)",
            ],
            "correct_answer_id": 0,
            "explanation": "In Python, append() is the correct method to add an element to the end of a list."
        }
