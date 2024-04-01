from dotenv import load_dotenv
import os
import predictionguard as pg
import os
from langchain_community.llms import PredictionGuard
from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain
load_dotenv()
os.environ['PREDICTIONGUARD_TOKEN'] = "q1VuOjnffJ3NO2oFN8Q9m8vghYc84ld13jaqdF7E"
description="I have a programming assignment due in 1 month. How do I start it generically?"
template = """Respond to the following query based on the context.
    
    Context: You will receive input frmm the user that contains the description of an assignment or project. 
    The user may input a due date in the form of plain text or may give a date, or no date at all. Based on what the user has given you and the 
    description of their assignment or project, your task is to create a list of subtasks ordered from what has to be done first to what has to be done last.
    Essentially, you are creating a plan and breaking this assignment into digestible chunks that has to be spread out over the days until the user's given due date.
    please give your response as a json with the keys as the number of the task and the value as the actual task description
    
    Query: {query}
    Result: """
prompt = PromptTemplate(template=template, input_variables=["query"],
                        )
result = pg.Completion.create(
    model="Nous-Hermes-Llama2-13B",
    prompt=prompt.format(query=description)
)
print(result['choices'][0]['text'])

