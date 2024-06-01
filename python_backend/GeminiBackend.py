from flask import Flask, redirect, url_for, render_template, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Enable CORS
load_dotenv()
genai.configure(api_key=os.environ["GEMINI_API_KEY"])


@app.route("/api/generate", methods=['POST'])
def generate_subtasks():

    # The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    model = genai.GenerativeModel('gemini-1.5-pro')

    data = request.get_json()
    description = data['text'] if 'text' in data else "I have a programming assignment due in 1 month. How do I start it generically?"

    template = """Respond to the following query based on the context.
    
    Context: You will receive input from the user that contains the description of an assignment or project. 
    The user may input a due date in the form of plain text or may give a date, or no date at all. Based on what the user has given you and the 
    description of their assignment or project, your task is to create a list of subtasks ordered from what has to be done first to what has to be done last.
    Essentially, you are creating a plan and breaking this assignment into digestible chunks that has to be spread out over the days until the user's given due date.
    please give your response as a json with the keys as the number of the task and the value as the actual task description.
    
    Query: {query}
    Result: """
    response = model.generate_content(template + " The input from the user is: " + description)

    # Parse the response and send it to the frontend
    return jsonify({ 'content': response.text })

if __name__ == '__main__':
    app.run(debug=True)

