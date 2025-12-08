# JSON Prompt Builder 🎨

A beautiful, dark-themed web application for creating structured JSON prompts for AI models. Built with React + Vite.

## ✨ Features

- 🎨 **Dark Mode UI** - Sleek purple gradient theme
- 🤖 **AI-Powered Generation** - Generate prompts using Groq API
- 🌐 **Bilingual** - English & Indonesian support
- 📋 **Copy & Download** - Export JSON with one click
- ✨ **Magic Enhance** - AI text expansion for fields
- 📱 **Responsive** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Groq API key ([Get one here](https://console.groq.com/keys))

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd PromtGenerator

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your Groq API key to .env
# VITE_GROQ_API_KEY=your_actual_api_key_here

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 📦 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `VITE_GROQ_API_KEY`
   - Value: Your Groq API key
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add VITE_GROQ_API_KEY

# Deploy to production
vercel --prod
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Your Groq API key for AI generation | Yes |

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS with CSS Variables
- **AI**: Groq API (llama-3.3-70b-versatile)
- **Deployment**: Vercel

## 📝 Available Templates

1. **Chatbot Persona** - Create AI chatbot configurations
2. **Image Generation** - Build detailed image prompts

## 🎯 Usage

1. Select a template from the header
2. Fill in the form fields
3. Use ✨ Magic Enhance for AI text expansion
4. Click "Generate with AI" for full prompt generation
5. Copy or download the JSON output

## 🌍 Language Support

Switch between English and Indonesian using the language toggle in the header.

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Made with 💜
