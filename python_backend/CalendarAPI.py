# calendar_api.py
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import os
import pickle

def create_event(description):
    # Load credentials from a 'token.pickle' file, if it exists
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', ['https://www.googleapis.com/auth/calendar'])
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    # Call the Google Calendar API
    service = build('calendar', 'v3', credentials=creds)
    event = {
        'summary': 'Generated Subtask',
        'description': description,
        # Add more event details here...
    }
    event = service.events().insert(calendarId='primary', body=event).execute()

    return event['id']