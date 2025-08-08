# Instagram Content Generator

A modern web application that uses AI to generate engaging Instagram content. Built with Django (backend) and Next.js (frontend), this tool helps creators, marketers, and businesses create compelling social media content quickly and efficiently.

## �� Features

- **AI-Powered Content Generation**: Uses Google's Gemini AI to create engaging Instagram posts
- **Multiple Content Types**: Generate Feed Posts, Stories, Carousels, and Reels
- **Customizable Parameters**: 
  - Tone of voice (Professional, Casual, Friendly, etc.)
  - Target audience
  - Content goals (Engagement, Sales, Awareness, etc.)
  - Emoji inclusion
  - Call-to-action options
- **Image Prompt Generation**: Get AI-generated prompts for creating visuals
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Docker Support**: Easy deployment with Docker and Docker Compose

## 🛠️ Tech Stack

### Backend
- **Django 5.2.4** - Python web framework
- **Django REST Framework** - API development
- **Google Generative AI** - Content generation
- **SQLite** - Database (development)
- **Gunicorn** - Production WSGI server

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## 📋 Prerequisites

- Python 3.12+
- Node.js 18+
- Docker & Docker Compose (optional)
- Google Gemini API key

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd instabot
   ```

2. **Create environment file**
   ```bash
   # Create backend/.env file
   SECRET_KEY=your-generated-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   DEBUG=False
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create environment file**
   ```bash
   # Create .env file in backend directory
   SECRET_KEY=your-generated-secret-key
   GEMINI_API_KEY=your-gemini-api-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Start the server**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## �� Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Django Settings
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1

# API Keys
GEMINI_API_KEY=your-gemini-api-key
```

### Generating a Secret Key

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

## 📱 Usage

1. **Open the application** in your browser (http://localhost:3000)
2. **Enter your content idea** in the input field
3. **Select content type** (Feed Post, Story, Carousel, Reel)
4. **Choose your preferences**:
   - Tone of voice
   - Target audience
   - Content goal
   - Include emojis (optional)
   - Include call-to-action (optional)
5. **Generate content** and get AI-powered Instagram posts
6. **Copy the generated content** and use it on Instagram

## ��️ Project Structure

```
