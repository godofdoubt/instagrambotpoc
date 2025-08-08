# C:\Users\Mert\Desktop\instabot\backend\content_generator\views.py

import os
import google.generativeai as genai
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
# from .serializers import ContentSerializer # Keep for later if you use the library feature
# from .models import GeneratedContent      # Keep for later if you use the library feature

# --- Gemini API Configuration ---
# This part securely loads your API key from the .env file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# It's good practice to check if the key exists and raise an error if it doesn't
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file in the 'backend' directory.")

genai.configure(api_key=GEMINI_API_KEY)

# Initialize the generative model you want to use
# 'gemini-pro' is great for text-based tasks
model = genai.GenerativeModel('gemini-2.0-flash')


# --- Helper function to generate content with Gemini ---
def generate_gemini_content(content_type, input_text, tone, audience, content_goal, include_emojis, include_cta):
    # This is "Prompt Engineering": creating a detailed instruction for the AI
    prompt_parts = [
        f"You are an expert Instagram content creator. Your task is to generate a complete {content_type} post.",
        f"The core idea or topic is: '{input_text}'.",
        f"The desired tone of voice is: {tone}.",
        f"The target audience is: {audience}.",
        f"The main goal of this content is: {content_goal}.",
        f"Should it include emojis? {'Yes' if include_emojis else 'No'}.",
        f"Should it include a call-to-action (CTA)? {'Yes' if include_cta else 'No'}.",
        "\n---INSTRUCTIONS---",
        "Based on the above, please provide the full content. For a Feed Post, include a hook, the main body, and relevant hashtags. For a Story or Carousel, suggest content for each slide. For a Reel, provide a script with scene ideas.",
        "Format the output clearly and make it ready to be copied and pasted to Instagram. If core idea is Turkish respond in Turkish.",
    ]

    try:
        # This is the actual call to the Gemini API
        response = model.generate_content(prompt_parts)
        # We access the generated text from the response object
        return response.text
    except Exception as e:
        # Basic error handling
        print(f"Error during Gemini content generation: {e}")
        return f"An error occurred while generating content. Please check the server logs. Error: {e}"

# --- Helper function to generate an image prompt with Gemini ---
def generate_gemini_image_prompt(content_type, input_text, tone):
    # A different, specialized prompt for creating image generation instructions
    prompt_parts = [
        f"You are an AI assistant specializing in creating image prompts for models like Midjourney or DALL-E.",
        f"Generate a single, concise, and descriptive image prompt for an Instagram {content_type}.",
        f"The image should visually capture the essence of this idea: '{input_text}'.",
        f"The visual tone should be: {tone}.",
        "Describe the scene, subject, style, and composition. Be specific and evocative.",
        "Example for a feed post: 'cinematic photo, a woman entrepreneur working on a laptop in a cozy, plant-filled cafe, warm morning light, candid shot, detailed, high resolution'",
        "\n---PROMPT---"
    ]

    try:
        # Calling the Gemini API again for the image prompt
        response = model.generate_content(prompt_parts)
        return response.text
    except Exception as e:
        print(f"Error during Gemini image prompt generation: {e}")
        return f"An error occurred while generating the image prompt. Error: {e}"


# --- Main API View ---
class GenerateContentAPIView(APIView):
    def post(self, request, *args, **kwargs):
        # This part remains the same: it gets the data from your frontend
        content_type = request.data.get('contentType')
        input_text = request.data.get('inputText')
        tone = request.data.get('tone')
        audience = request.data.get('audience')
        content_goal = request.data.get('contentGoal')
        include_emojis = request.data.get('includeEmojis', False) # Default to False if not provided
        include_cta = request.data.get('includeCTA', False)       # Default to False if not provided


        if not input_text or not content_type:
            return Response({"error": "Input text and content type are required."}, status=400)

        # NOW, we call our new Gemini helper functions instead of the old mock ones
        generated_text = generate_gemini_content(
            content_type, input_text, tone, audience, content_goal, include_emojis, include_cta
        )
        
        generated_image_prompt = generate_gemini_image_prompt(content_type, input_text, tone)

        # This section for saving content is still here and commented out.
        # You can implement it later if you build a "saved content" library.
        # try:
        #     content_instance = GeneratedContent.objects.create(...)
        # except Exception as e:
        #     print(f"Error saving to DB: {e}")

        # Return the AI-generated content to the frontend
        return Response({
            "generatedContent": generated_text,
            "generatedImagePrompt": generated_image_prompt
        })


# --- Library Views (Keep for future use) ---
# These are unchanged as they are for a different feature (saving/loading content)
# class SavedContentListView(generics.ListCreateAPIView):
#     queryset = GeneratedContent.objects.all().order_by('-created_at')
#     serializer_class = ContentSerializer

# class SavedContentDetailView(generics.RetrieveDestroyAPIView):
#     queryset = GeneratedContent.objects.all()
#     serializer_class = ContentSerializer