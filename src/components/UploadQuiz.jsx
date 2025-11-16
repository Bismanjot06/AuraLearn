import React, { useState } from 'react';
import { generateQuizFromFile, generateMockQuiz, exportQuizAsJSON, saveQuizToLocalStorage } from '../services/aiQuizService';
import { Sparkles, FileText, Loader2, CheckCircle, XCircle, Download, RefreshCw, Settings } from 'lucide-react';

const UploadQuiz = () => {
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState({ step: '', progress: 0, message: '' });
  const [activeTab, setActiveTab] = useState('mcqs');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    mcqCount: 10,
    shortAnswerCount: 5,
    difficulty: 'medium',
    includeExplanations: true,
  });

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setQuizData(null);
    setError(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setQuizData(null);
    setError(null);
  };

  const handleGenerateQuiz = async () => {
    setIsGenerating(true);
    setError(null);
    setQuizData(null);

    try {
      // Using real OpenAI API
      const result = await generateQuizFromFile(file, settings, setProgress);
      // const result = await generateMockQuiz(file, settings, setProgress);
      
      setQuizData(result);
      
      // Save to localStorage
      const quizId = `quiz_${Date.now()}`;
      saveQuizToLocalStorage(result, quizId);
      
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
      console.error('Quiz generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExport = () => {
    if (quizData) {
      exportQuizAsJSON(quizData.data, file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleRegenerate = () => {
    setQuizData(null);
    setError(null);
    handleGenerateQuiz();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              AI Quiz Generator
            </h1>
            <p className="text-white/70">
              Upload your syllabus and let AI create comprehensive quizzes instantly
            </p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn-secondary p-3 rounded-xl"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="glass-card p-6 animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Quiz Settings</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">MCQ Count</label>
              <input
                type="number"
                value={settings.mcqCount}
                onChange={(e) => setSettings({ ...settings, mcqCount: parseInt(e.target.value) })}
                min="1"
                max="50"
                className="w-full bg-dark-card/50 border border-white/10 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Short Answer Count</label>
              <input
                type="number"
                value={settings.shortAnswerCount}
                onChange={(e) => setSettings({ ...settings, shortAnswerCount: parseInt(e.target.value) })}
                min="1"
                max="20"
                className="w-full bg-dark-card/50 border border-white/10 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Difficulty</label>
              <select
                value={settings.difficulty}
                onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
                className="w-full bg-dark-card/50 border border-white/10 rounded-lg px-3 py-2 text-white"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.includeExplanations}
                  onChange={(e) => setSettings({ ...settings, includeExplanations: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-white/70">Include Explanations</span>
              </label>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: File Upload */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Upload Syllabus
            </h2>
            
            {/* Drag & Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                file
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-white/30 hover:border-primary/50 hover:bg-dark-card/40'
              }`}
            >
              <input
                type="file"
                id="fileUpload"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
              <label htmlFor="fileUpload" className="cursor-pointer">
                <div className="text-6xl mb-4">
                  {file ? '✅' : '📄'}
                </div>
                <p className="text-white/70 mb-2 font-medium">
                  {file ? file.name : 'Drag & drop your file here'}
                </p>
                <p className="text-white/50 text-sm">
                  {file
                    ? `Size: ${(file.size / 1024).toFixed(2)} KB`
                    : 'or click to browse (PDF, DOC, DOCX, TXT - Max 10MB)'}
                </p>
              </label>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 animate-fade-in">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium mb-1">Generation Failed</p>
                  <p className="text-red-400/80 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Generate Button */}
            {file && !isGenerating && !quizData && (
              <button
                onClick={handleGenerateQuiz}
                className="w-full btn-primary mt-6 py-4 text-lg font-semibold flex items-center justify-center gap-3 animate-glow"
              >
                <Sparkles className="w-5 h-5" />
                Generate Quiz using AI
              </button>
            )}

            {/* Loading Animation */}
            {isGenerating && (
              <div className="mt-6 animate-fade-in">
                <div className="text-center mb-4">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-3" />
                  <p className="text-white/90 font-medium mb-1">{progress.message}</p>
                  <p className="text-white/50 text-sm">{progress.step}</p>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-dark-card/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
                    style={{ width: progress.progress + '%' }}
                  ></div>
                </div>
                
                {/* AI Analysis Steps */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      progress.progress >= 10 ? 'bg-primary/20 text-primary' : 'bg-dark-card text-white/30'
                    }`}>
                      {progress.progress >= 10 ? '✓' : '1'}
                    </div>
                    <span className={progress.progress >= 10 ? 'text-white/90' : 'text-white/50'}>
                      Validating file format and size
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      progress.progress >= 30 ? 'bg-primary/20 text-primary' : 'bg-dark-card text-white/30'
                    }`}>
                      {progress.progress >= 30 ? '✓' : '2'}
                    </div>
                    <span className={progress.progress >= 30 ? 'text-white/90' : 'text-white/50'}>
                      Extracting content from document
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      progress.progress >= 50 ? 'bg-primary/20 text-primary' : 'bg-dark-card text-white/30'
                    }`}>
                      {progress.progress >= 50 ? '✓' : '3'}
                    </div>
                    <span className={progress.progress >= 50 ? 'text-white/90' : 'text-white/50'}>
                      Preparing AI analysis prompt
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      progress.progress >= 70 ? 'bg-primary/20 text-primary' : 'bg-dark-card text-white/30'
                    }`}>
                      {progress.progress >= 70 ? '✓' : '4'}
                    </div>
                    <span className={progress.progress >= 70 ? 'text-white/90' : 'text-white/50'}>
                      AI analyzing syllabus content
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      progress.progress >= 90 ? 'bg-primary/20 text-primary' : 'bg-dark-card text-white/30'
                    }`}>
                      {progress.progress >= 90 ? '✓' : '5'}
                    </div>
                    <span className={progress.progress >= 90 ? 'text-white/90' : 'text-white/50'}>
                      Generating questions and study guide
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {quizData && !isGenerating && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 animate-fade-in">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-400 font-medium mb-1">Quiz Generated Successfully!</p>
                  <p className="text-green-400/80 text-sm">
                    {quizData.metadata.questionsCount.total} questions created from your syllabus
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* AI Info Panel */}
          {!quizData && !isGenerating && (
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                How AI Quiz Generation Works
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex gap-3">
                  <span className="text-primary">1.</span>
                  <p>Upload your syllabus document (PDF, DOC, DOCX, or TXT)</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary">2.</span>
                  <p>AI analyzes the content, identifies key topics and concepts</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary">3.</span>
                  <p>Generates MCQs, short answer questions with proper difficulty levels</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary">4.</span>
                  <p>Creates a comprehensive study guide summary</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-primary">5.</span>
                  <p>Download or save quiz for your students</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: AI Output */}
        <div className="space-y-6">
          {quizData && (
            <div className="glass-card p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Generated Quiz
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleRegenerate}
                    className="btn-secondary py-2 px-4 text-sm flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleExport}
                    className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Quiz Metadata */}
              {quizData.data.analysis && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-dark-card/40 rounded-lg p-3 text-center">
                    <p className="text-white/50 text-xs mb-1">Total Questions</p>
                    <p className="text-xl font-bold text-primary">{quizData.metadata.questionsCount.total}</p>
                  </div>
                  <div className="bg-dark-card/40 rounded-lg p-3 text-center">
                    <p className="text-white/50 text-xs mb-1">Difficulty</p>
                    <p className="text-lg font-semibold text-white capitalize">{quizData.data.analysis.difficultyLevel}</p>
                  </div>
                  <div className="bg-dark-card/40 rounded-lg p-3 text-center">
                    <p className="text-white/50 text-xs mb-1">Study Time</p>
                    <p className="text-lg font-semibold text-white">{quizData.data.analysis.estimatedStudyTime}</p>
                  </div>
                </div>
              )}

              {/* Main Topics */}
              {quizData.data.analysis?.mainTopics && (
                <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-xs text-white/50 mb-2">Main Topics Covered:</p>
                  <div className="flex flex-wrap gap-2">
                    {quizData.data.analysis.mainTopics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="flex gap-2 mb-4 border-b border-white/10">
                <button
                  onClick={() => setActiveTab('mcqs')}
                  className={`px-4 py-2 font-medium transition-all ${
                    activeTab === 'mcqs'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  MCQs ({quizData.metadata.questionsCount.mcqs})
                </button>
                <button
                  onClick={() => setActiveTab('short')}
                  className={`px-4 py-2 font-medium transition-all ${
                    activeTab === 'short'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Short Answer ({quizData.metadata.questionsCount.shortAnswers})
                </button>
                <button
                  onClick={() => setActiveTab('guide')}
                  className={`px-4 py-2 font-medium transition-all ${
                    activeTab === 'guide'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-white/60 hover:text-white/80'
                  }`}
                >
                  Study Guide
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {/* MCQs Section */}
                {activeTab === 'mcqs' && (
                  <div className="space-y-4">
                    {quizData.data.mcqs.map((mcq, index) => (
                      <div key={index} className="glass-panel p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white/90 font-medium flex-1">
                            {index + 1}. {mcq.question}
                          </p>
                          <span className={`px-2 py-1 text-xs rounded-full ml-2 ${
                            mcq.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                            mcq.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {mcq.difficulty}
                          </span>
                        </div>
                        <div className="space-y-2 ml-4 mb-3">
                          {mcq.options.map((opt, i) => (
                            <div
                              key={i}
                              className={`text-sm px-3 py-2 rounded-lg ${
                                i === mcq.correctAnswer
                                  ? 'bg-green-500/10 text-green-400 font-medium border border-green-500/30'
                                  : 'bg-dark-card/40 text-white/60'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}. {opt}
                            </div>
                          ))}
                        </div>
                        {mcq.explanation && settings.includeExplanations && (
                          <div className="mt-3 pt-3 border-t border-white/10">
                            <p className="text-xs text-white/50 mb-1">Explanation:</p>
                            <p className="text-sm text-white/70">{mcq.explanation}</p>
                          </div>
                        )}
                        <div className="mt-2">
                          <span className="text-xs text-primary/70">Topic: {mcq.topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Short Questions */}
                {activeTab === 'short' && (
                  <div className="space-y-4">
                    {quizData.data.shortAnswerQuestions.map((q, index) => (
                      <div key={index} className="glass-panel p-4">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-white/90 font-medium flex-1">
                            {index + 1}. {q.question}
                          </p>
                          <span className={`px-2 py-1 text-xs rounded-full ml-2 ${
                            q.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                            q.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {q.difficulty}
                          </span>
                        </div>
                        {q.keyPoints && (
                          <div className="mt-3">
                            <p className="text-xs text-white/50 mb-2">Key Points to Cover:</p>
                            <ul className="space-y-1 ml-4">
                              {q.keyPoints.map((point, idx) => (
                                <li key={idx} className="text-sm text-white/70 list-disc">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-3">
                          <span className="text-xs text-primary/70">Topic: {q.topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Study Guide */}
                {activeTab === 'guide' && quizData.data.studyGuide && (
                  <div className="space-y-4">
                    <div className="glass-panel p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        📚 Summary
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {quizData.data.studyGuide.summary}
                      </p>
                    </div>

                    <div className="glass-panel p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        💡 Important Concepts
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {quizData.data.studyGuide.importantConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg border border-primary/20"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {quizData.data.studyGuide.suggestedReadings && (
                      <div className="glass-panel p-4">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          📖 Suggested Readings
                        </h3>
                        <ul className="space-y-2">
                          {quizData.data.studyGuide.suggestedReadings.map((reading, idx) => (
                            <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {reading}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {!quizData && !isGenerating && (
            <div className="glass-card p-12 text-center">
              <Sparkles className="w-16 h-16 text-primary/30 mx-auto mb-4" />
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