## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Steps to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/lekhrajtank/Event_management_dashboard.git

2. Navigate to the backend folder:   
   ```bash
     cd backend
 + Install dependencies and start the server:
    ```bash
      npm install
      npm install
      npm start

3. Open a new terminal, navigate to the frontend folder:
   ```bash
      cd ../frontend

 4.Visit http://localhost:3000 to access the application.
  
---

# **API Details**  
  
## API Documentation

### 1. **Authentication**
   - **POST** `/api/auth/login`
     - Request: `{ "email": "user@example.com", "password": "password" }`
     - Response: `{ "token": "jwt-token" }`

   - **POST** `/api/auth/register`
     - Request: `{ "name": "John Doe", "email": "user@example.com", "password": "password" }`
     - Response: `{ "message": "User registered successfully" }`

### 2. **Events**
   - **GET** `/api/events`
     - Response: `[ { "id": "1", "name": "Event 1", "date": "2025-01-12" } ]`

   - **POST** `/api/events`
     - Request: `{ "name": "New Event", "date": "2025-01-15", "description": "Description here" }`
     - Response: `{ "id": "2", "name": "New Event" }`

   - **DELETE** `/api/events/:id`
     - Response: `{ "message": "Event deleted successfully" }`

### 3. **Attendees**
   - Similar endpoints for managing attendees.

### 4. **Tasks**
   - Similar endpoints for managing tasks.

    


