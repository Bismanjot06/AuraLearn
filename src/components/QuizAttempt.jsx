import React, { useState } from 'react';

const QuizAttempt = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quiz = {
    title: 'Calculus Fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is the derivative of x²?',
        options: ['x', '2x', 'x²', '2x²'],
        correct: 1,
      },
      {
        id: 2,
        question: 'What is the integral of 1/x?',
        options: ['x²', 'ln(x)', '1/x²', 'e^x'],
        correct: 1,
      },
      {
        id: 3,
        question: 'What is the limit of (x² - 1)/(x - 1) as x approaches 1?',
        options: ['0', '1', '2', 'undefined'],
        correct: 2,
      },
    ],
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return { correct, total: quiz.questions.length };
  };

  // Start Screen
  if (!quizStarted && !quizSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-panel p-12 max-w-2xl text-center animate-scale-in relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-6xl mb-6">📝</div>
            <h1 className="text-4xl font-display font-bold mb-4">{quiz.title}</h1>
            <p className="text-white/70 mb-2">
              Test your knowledge with {quiz.questions.length} questions
            </p>
            <p className="text-white/50 text-sm mb-8">
              ⏱️ Estimated time: 10 minutes
            </p>
            <button
              onClick={() => setQuizStarted(true)}
              className="btn-primary px-12 py-4 text-lg"
            >
              Start Quiz
            </button>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    );
  }

  // Quiz Submitted - Results Screen
  if (quizSubmitted) {
    const score = calculateScore();
    const percentage = Math.round((score.correct / score.total) * 100);

    return (
      <div className="space-y-6">
        <div className="glass-panel p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-6xl mb-4">
              {percentage >= 70 ? '🎉' : percentage >= 50 ? '👍' : '📚'}
            </div>
            <h1 className="text-4xl font-display font-bold mb-2">Quiz Complete!</h1>
            <p className="text-white/70">Here are your results</p>
          </div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        {/* Score Summary */}
        <div className="glass-card p-8 text-center">
          <p className="text-white/60 mb-2">Your Score</p>
          <p className="text-6xl font-bold text-iridescent mb-4">{percentage}%</p>
          <p className="text-white/70">
            {score.correct} out of {score.total} correct
          </p>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-2xl font-bold text-emerald-400">{score.correct}</p>
            <p className="text-white/60 text-sm">Correct</p>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-4xl mb-2">❌</div>
            <p className="text-2xl font-bold text-red-400">{score.total - score.correct}</p>
            <p className="text-white/60 text-sm">Incorrect</p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>💡</span> Recommended for You
          </h2>
          <div className="space-y-3">
            {[
              { title: 'Derivative Rules - Video Tutorial', type: 'video', duration: '12 min' },
              { title: 'Integration Techniques - Article', type: 'article', duration: '8 min read' },
            ].map((rec, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-dark-card/40 hover:bg-dark-card/60 transition-all duration-300"
              >
                <div>
                  <p className="text-white/90 font-medium">{rec.title}</p>
                  <p className="text-white/50 text-sm">{rec.duration}</p>
                </div>
                <button className="btn-primary py-2 px-4 text-sm">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 btn-secondary py-3">Review Answers</button>
          <button className="flex-1 btn-primary py-3">Retake Quiz</button>
        </div>
      </div>
    );
  }

  // Question Screen
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white/70 text-sm">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </p>
          <p className="text-white/70 text-sm">{Math.round(progress)}% Complete</p>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel p-8 animate-slide-up">
        <h2 className="text-2xl font-semibold mb-6">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.id, index)}
              className={`w-full text-left p-4 rounded-xl font-medium transition-all duration-300 ${
                answers[question.id] === index
                  ? 'bg-gradient-to-r from-primary-dark to-accent text-white shadow-lg'
                  : 'bg-dark-card/40 border border-primary/20 hover:bg-dark-card/60 text-white/80'
              }`}
            >
              <span className="mr-3 text-white/60">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn-secondary px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {currentQuestion === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="btn-primary px-8 py-3 animate-glow"
          >
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary px-6 py-3">
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizAttempt;
