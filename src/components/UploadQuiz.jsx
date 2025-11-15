import React, { useState } from 'react';

const UploadQuiz = () => {
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizGenerated, setQuizGenerated] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setQuizGenerated(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setQuizGenerated(false);
  };

  const handleGenerateQuiz = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setQuizGenerated(true);
    }, 3000);
  };

  const sampleQuiz = {
    mcqs: [
      { q: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin', 'Madrid'], correct: 1 },
      { q: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
    ],
    shortQuestions: [
      'Explain the process of photosynthesis.',
      'Describe the water cycle in detail.',
    ],
    summary: 'This quiz covers fundamental concepts in Geography and Science, focusing on capitals, planetary systems, and natural processes.'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 bg-gradient-to-r from-primary/10 to-accent/10">
        <h1 className="text-3xl font-display font-bold mb-2">
          AI Quiz Generator ✨
        </h1>
        <p className="text-white/70">
          Upload your syllabus and let AI create comprehensive quizzes instantly
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: File Upload */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Syllabus</h2>
            
            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-dark-card/40 transition-all duration-300 cursor-pointer"
            >
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-white/70 mb-2">
                  {file ? file.name : 'Drag & drop your file here'}
                </p>
                <p className="text-white/50 text-sm">
                  or click to browse (PDF, DOC, TXT)
                </p>
              </label>
            </div>

            {/* Generate Button */}
            {file && !isGenerating && !quizGenerated && (
              <button
                onClick={handleGenerateQuiz}
                className="w-full btn-primary mt-6 py-4 text-lg animate-glow"
              >
                🤖 Generate Quiz using AI
              </button>
            )}

            {/* Loading Animation */}
            {isGenerating && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="inline-block w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                <p className="text-white/70 animate-pulse">Analyzing your syllabus...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: AI Output */}
        <div className="space-y-6">
          {quizGenerated && (
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Generated Quiz</h2>
                <div className="flex gap-2">
                  <button className="btn-secondary py-2 px-4 text-sm">
                    🔄 Regenerate
                  </button>
                  <button className="btn-primary py-2 px-4 text-sm">
                    📥 Download
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="space-y-4">
                {/* MCQs Section */}
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span>✅</span> Multiple Choice Questions
                  </h3>
                  <div className="space-y-3">
                    {sampleQuiz.mcqs.map((mcq, index) => (
                      <div key={index} className="bg-dark-card/40 rounded-lg p-3">
                        <p className="text-white/90 mb-2 font-medium">
                          {index + 1}. {mcq.q}
                        </p>
                        <div className="space-y-1 ml-4">
                          {mcq.options.map((opt, i) => (
                            <p
                              key={i}
                              className={`text-sm ${
                                i === mcq.correct ? 'text-emerald-400 font-medium' : 'text-white/60'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Short Questions */}
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <span>📝</span> Short Answer Questions
                  </h3>
                  <div className="space-y-2">
                    {sampleQuiz.shortQuestions.map((q, index) => (
                      <p key={index} className="text-white/80 text-sm">
                        {index + 1}. {q}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <span>📚</span> Study Guide Summary
                  </h3>
                  <p className="text-white/70 text-sm">{sampleQuiz.summary}</p>
                </div>
              </div>
            </div>
          )}

          {!quizGenerated && !isGenerating && (
            <div className="glass-card p-12 text-center">
              <div className="text-6xl mb-4 opacity-30">🤖</div>
              <p className="text-white/50">
                Upload a syllabus to see AI-generated quizzes here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadQuiz;
