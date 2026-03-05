# PC Hardware Assistant

A topic-restricted AI chat system where users can authenticate and create AI conversations about PC hardware. Built with React and Redux.

## Features

- User registration and login
- AI-powered conversations restricted to PC hardware topics
- Conversation history per user
- Persistent storage using localStorage
- Clean, modern dark-themed UI

## Allowed AI Topics

- CPU and motherboard compatibility
- GPU recommendations
- RAM compatibility
- Power supply recommendations
- PC hardware diagnostics and troubleshooting
- Component recommendations by budget
- Cooling solutions

## Tech Stack

### Frontend

- React 18
- Redux with Redux Thunk
- React Router v6
- CSS (custom styling)

### Data Layer

- localStorage-based mock API (structured for easy replacement with a real backend)
- Client-side AI response engine

## Project Structure

```
project-root
│
├── backend/                  # Django REST API (optional, not required for frontend)
│   ├── config/
│   ├── api/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── services/
│   │       └── ai_service.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   └── store.js
    │   ├── redux/
    │   │   ├── actions/
    │   │   ├── reducers/
    │   │   └── constants/
    │   ├── screens/
    │   │   ├── LoginScreen/
    │   │   ├── RegisterScreen/
    │   │   └── HomeScreen/
    │   ├── components/
    │   │   ├── FormComponent/
    │   │   ├── Loader/
    │   │   ├── Message/
    │   │   ├── ConversationItem/
    │   │   └── EmptyState/
    │   ├── services/
    │   │   ├── api.js
    │   │   └── aiService.js
    │   └── App.js
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
cd frontend
npm install
```

### Running the Application

```bash
npm run dev
```

The app will open at `http://localhost:3000`.

## Usage

1. **Register** a new account on the Register page
2. **Login** with your credentials
3. **Start a new conversation** by clicking "+ New Chat"
4. **Ask about PC hardware** — the AI will respond to hardware-related questions
5. **View conversation history** in the left sidebar
6. **Reopen past conversations** by clicking on them

## Currency

All component prices are displayed in Philippine Pesos (₱).

## API Structure

The frontend uses a localStorage-based mock API (`src/services/api.js`) that mirrors a real REST API structure:

| Function | Description |
|---|---|
| `api.auth.register()` | Register a new user |
| `api.auth.login()` | Authenticate a user |
| `api.conversations.list()` | Get user's conversations |
| `api.conversations.getDetail()` | Get conversation with messages |
| `api.conversations.create()` | Create a new conversation |
| `api.chat.send()` | Send a message and get AI response |

To connect a real backend, replace `src/services/api.js` with axios calls to your API endpoints.
