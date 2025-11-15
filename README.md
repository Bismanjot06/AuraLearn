<<<<<<< HEAD
# 🌟 AuraLearn - Intelligent Learning Management System

**Intelligent Learning Begins Here**

A modern, AI-powered Learning Management System built with React + Vite + Tailwind CSS, featuring a stunning iridescent design and glassmorphism UI.

---

## ✨ Features

### 🎨 Design System
- **Soft iridescent gradient color scheme** (violet → teal → neon blue → soft pink)
- **Glassmorphism panels** with blurred layers
- **Smooth rounded corners** (16-20px)
- **Modern typography** (Inter / Poppins)
- **Subtle micro-animations** (hover glows, transitions, opacity fades)
- **Fully responsive** via Tailwind grid and flex
- **Premium minimalistic look**

### 👨‍🏫 Teacher Portal
1. **Dashboard Home**
   - Welcome banner with gradient background
   - Quick stats cards (Total Students, Quizzes Created, At-Risk Alerts)
   - Recent activity feed
   - Quick action buttons

2. **AI Quiz Generator** (⭐ Main Feature)
   - Drag-and-drop file upload (PDF, DOC, TXT)
   - AI-powered quiz generation from syllabus
   - Generates MCQs, short questions, and study guides
   - Download and regenerate options
   - Beautiful loading animations

3. **Analytics Dashboard**
   - At-risk student detection
   - Performance trends visualization
   - Insight cards with key metrics
   - Student table with risk levels (color-coded badges)
   - Recommended actions for teachers

### 🎓 Student Portal
1. **Student Home**
   - Personalized welcome banner
   - Learning path visualization
   - Recommended content cards (videos, articles, quizzes)
   - Progress summary (points, courses, streak)

2. **Quiz Attempt Screen**
   - Clean quiz start interface
   - One question at a time with progress bar
   - Multiple choice question handling
   - Navigation controls (Previous/Next)
   - Score summary with recommendations
   - Personalized content suggestions based on performance

### 🧩 Reusable Components
- **Sidebar** (Teacher & Student versions)
- **Topbar** with search, notifications, and profile
- **Toast notifications** (success, error, warning, info)
- **Modal dialogs** with glassmorphism
- **Glass cards** and panels
- **Gradient buttons** with hover effects

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5174` (or the port shown in terminal)

---

## 🎯 Usage

### Login
1. Open the application
2. Enter any email address
3. Enter any password
4. Select role: **Teacher** or **Student**
5. Click **Login**

### Teacher Flow
1. **Home**: View dashboard statistics
2. **Upload**: Upload syllabus → Generate AI quiz
3. **Analytics**: View at-risk students and performance data
4. **Quizzes**: Manage created quizzes

### Student Flow
1. **Home**: View personalized learning path
2. **Learning Path**: Access recommended content
3. **Take Quiz**: Start quiz → Answer questions → View results
4. **Progress**: Track your learning journey

---

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Design System** - Iridescent gradients and glassmorphism

---

## 📁 Project Structure

```
auralearn/
├── src/
│   ├── components/
│   │   ├── LoginPage.jsx         # Landing/Login screen
│   │   ├── Sidebar.jsx            # Teacher navigation
│   │   ├── StudentSidebar.jsx     # Student navigation
│   │   ├── Topbar.jsx             # Header bar
│   │   ├── TeacherHome.jsx        # Teacher dashboard
│   │   ├── UploadQuiz.jsx         # AI quiz generator ⭐
│   │   ├── TeacherAnalytics.jsx   # Analytics dashboard
│   │   ├── StudentHome.jsx        # Student dashboard
│   │   ├── QuizAttempt.jsx        # Quiz taking interface
│   │   ├── Modal.jsx              # Reusable modal
│   │   └── Toast.jsx              # Notification toasts
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # App-specific styles
│   ├── index.css                  # Global Tailwind styles
│   └── main.jsx                   # Entry point
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

---

## 🎨 Color Palette

- **Violet**: `#8B5CF6`
- **Teal**: `#14B8A6`
- **Neon Blue**: `#06B6D4`
- **Soft Pink**: `#F472B6`
- **Background**: Dark gradient (slate-950 → purple-950 → slate-900)

---

## 🌟 Key Highlights for Hackathon Judges

### 🤖 AI-Powered Quiz Generation
The **Upload & Quiz Generator** screen is the centerpiece, showcasing:
- Instant AI processing of syllabus documents
- Automatic generation of comprehensive quizzes
- Beautiful loading animations
- Professional output formatting

### 📊 Predictive Analytics
Teacher analytics provide:
- At-risk student detection
- Performance trend visualization
- Actionable insights
- Color-coded risk indicators

### 🎓 Personalized Learning
Student interface offers:
- AI-recommended content
- Adaptive learning paths
- Performance-based suggestions
- Engaging quiz experience

### 💎 Premium Design
- Glassmorphism effects
- Iridescent gradients
- Smooth micro-animations
- Professional, modern aesthetic

---

## 🔧 Customization

### Modify Colors
Edit `tailwind.config.js` to change the color scheme:

```js
colors: {
  violet: { DEFAULT: '#8B5CF6', ... },
  teal: { DEFAULT: '#14B8A6', ... },
  // Add your colors here
}
```

### Add New Components
Create new components in `src/components/` and import them in `App.jsx`.

---

## 📝 Future Enhancements

- [ ] Integrate real AI API (OpenAI, Gemini, etc.)
- [ ] Add chart library (Recharts/Chart.js) for analytics
- [ ] Implement real-time collaboration
- [ ] Add user authentication (Firebase, Auth0)
- [ ] Build quiz results database
- [ ] Add export functionality (PDF, CSV)
- [ ] Implement dark/light theme toggle
- [ ] Add mobile responsiveness improvements

---

## 📄 License

MIT License - Feel free to use this project for your hackathon or learning purposes.

---

## 🙌 Acknowledgments

Built with ❤️ using React, Vite, and Tailwind CSS

**AuraLearn** - Intelligent Learning Begins Here ✨


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# AuraLearn
AuraLearn is a dual-interface adaptive Learning Management System (LMS) designed to solve the problem of “one-size-fits-all” education.
>>>>>>> 2c8d940a6ce856f5d53acf4a1fcc0f48063f4b41
