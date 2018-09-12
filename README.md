# Setup

1. Create firebase project
2. Setup realtime database
3. Copy the credentials to file `/src/utils/firebase-config/live.json`

Example of config file:

    "apiKey": "...",
    "authDomain": "PROJECT_ID.firebaseapp.com",
    "databaseURL": "https://PROJECT_ID.firebaseio.com",
    "projectId": "PROJECT_ID",
    "storageBucket": "...",
    "messagingSenderId": "..."

# TODO LIST:
- add trigger function to recalculate players' points
- add players nationalities and emoji flags next to names
- Show medium points for teams
- Integrate physical button