# 🎤 AI Mock Interviewer

A SaaS-based AI mock interviewer that simulates real interview experiences through real-time voice conversations. Built with Next.js, VAPI, and OpenRouter, the platform provides AI-generated feedback, credit-based access, and secure payments using Razorpay.

## ✨ Features

### 🤖 AI Interviews
- Real-time voice conversations powered by VAPI.
- AI-generated interview questions based on selected roles.
- OpenRouter integration for LLM-powered responses.
- Natural, interactive interview experience.

### 📊 Performance Feedback
- Detailed AI evaluation after every interview.
- Scores based on communication, technical knowledge, confidence, and problem-solving.
- Personalized strengths and improvement suggestions.
- Structured interview summary.

### 💳 Credit-Based System
- Free interview credits for new users.
- Purchase additional credits using Razorpay.
- Secure payment integration.
- Usage tracking for every interview session.

### 🔐 Authentication
- Secure user authentication.
- Protected dashboard and interview history.
- User profile management.

### 📱 Modern UI
- Responsive design for desktop and mobile.
- Fast performance with Next.js.
- Clean and intuitive user experience.

---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- JavaScript
- Tailwind CSS
- Shadcn UI

### Backend
- Node.js
- Next.js API Routes

### AI & Voice
- VAPI
- OpenRouter

### Database & Authentication
- Supabase

### Payments
- Razorpay

### Deployment
- Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Supabase Project
- VAPI API Key
- OpenRouter API Key
- Razorpay Account

### Installation

```bash
git clone https://github.com/your-username/ai-mock-interviewer.git

cd ai-mock-interviewer

npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

OPENROUTER_API_KEY=
VAPI_API_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Run the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
app/
components/
lib/
hooks/
public/
utils/
```

---

## 🎯 Key Highlights

- Real-time AI voice interviews
- LLM-powered conversations
- AI-generated interview feedback
- Credit-based SaaS model
- Razorpay payment integration
- Secure authentication
- Responsive modern UI

---

## 📌 Future Improvements

- Resume-based interview generation
- Multiple interview difficulty levels
- Company-specific interview rounds
- Coding interview support
- Mock HR and behavioral interviews
- Analytics dashboard
- Leaderboards and achievements

---

## 👨‍💻 Author

**Ayush Sahu**

- GitHub: https://github.com/Charlie8989
- Portfolio: https://portfolio.ayush-codes.tech
- LinkedIn: https://www.linkedin.com/in/ayush-sahu-83r

---

## 📄 License

This project is licensed under the MIT License.
