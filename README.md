Samples Project
A minimal full-stack web application that validates a sample ID, confirms patient details, and records sample collection data.


This project consists of:
Backend: Django REST API using in-memory data (no database)
Frontend: React single-page application
Workflow: Two-step sample lookup and submission flow

Persistence is not required — data resets on server restart.


You can use the following preloaded sample IDs:
- SAMPLE001
- SAMPLE002

Each will return a valid patient name and date of birth.


Backend Setup:
1. Navigate to backend 
cd Samples_Backend/backend
2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate
3. Install dependencies
pip install -r requirements.txt
4. Run the server
python manage.py runserver
Backend will run at: http://127.0.0.1:8000


Backend API Endpoints:
Lookup sample
GET /api/sample/<sample_id>
Success(200):
{
  "name": "John Doe",
  "date_of_birth": "1990-01-01"
}
Failure(404):
Sample NOT Found

Submit sample data:
POST /api/sample/submit
Request Body:
{
  "sample_id": "SAMPLE001",
  "collection_date": "2024-01-10",
  "notes": "Optional notes"
}
Validation:
sample_id must exist
collection_date is required
notes is optional


Frontend Setup (React)
1. Navigate to frontend
cd Samples_Frontend/frontend
2. Install dependencies
npm install
3. Start the app
npm start

Frontend will run at:
http://localhost:3000


Application Flow:
Step 1 – Sample Lookup
Enter Sample ID
Backend validates existence
Displays patient name and date of birth
User confirms to proceed

Step 2 – Data Submission
Enter collection date (required)
Enter optional notes
Submit data to backend


Design Decisions
In-memory storage used to keep setup simple and within time constraints
No database required per assignment instructions
Minimal UI styling to focus on functionality and clarity
Explicit confirmation step to prevent accidental submissions


Testing Notes
Backend endpoints were tested using Postman
Frontend tested manually through browser
Error handling implemented for invalid sample IDs and missing fields
