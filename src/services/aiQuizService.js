// AI Quiz Service - Handles quiz generation from files using Gemini API

// Generate quiz from uploaded file
export const generateQuizFromFile = async (file, settings, setProgress) => {
  try {
    setProgress({ step: 'Validating file...', progress: 10, message: 'Starting file validation' });

    // 1. Validate file
    if (!file) throw new Error('No file selected');
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) throw new Error('File size exceeds 10MB limit');

    const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExt)) throw new Error('Invalid file format');

    setProgress({ step: 'Extracting content...', progress: 30, message: 'Reading file content' });

    // 2. Read file content
    const fileContent = await readFileContent(file);
    
    setProgress({ step: 'Preparing AI prompt...', progress: 50, message: 'Preparing analysis request' });

    // 3. Call Gemini API to generate quiz
    const result = await callGeminiAPI(fileContent, settings, setProgress);

    setProgress({ step: 'Finalizing quiz...', progress: 95, message: 'Quiz generation complete' });

    return {
      data: result,
      metadata: {
        fileName: file.name,
        fileSize: file.size,
        questionsCount: {
          mcqs: result.mcqs?.length || 0,
          shortAnswers: result.shortAnswerQuestions?.length || 0,
          total: (result.mcqs?.length || 0) + (result.shortAnswerQuestions?.length || 0),
        },
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

// Read file content based on file type
const readFileContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        resolve(content);
      } catch (err) {
        reject(new Error('Failed to read file content'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

// Call Gemini API for quiz generation
const callGeminiAPI = async (fileContent, settings, setProgress) => {
  const API_KEY = 'AIzaSyCPSvf_AHQlzMH_NAWq1JP0Lrb3KmT33HQ';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  setProgress({ step: 'Analyzing content with AI...', progress: 70, message: 'AI is analyzing your document' });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert quiz generator. Analyze the following document and generate a comprehensive quiz.

Document Content:
${fileContent.substring(0, 8000)}

Generate a JSON response with this exact structure (no markdown, just pure JSON):
{
  "analysis": {
    "mainTopics": ["topic1", "topic2", ...],
    "difficultyLevel": "medium",
    "estimatedStudyTime": "2-3 hours"
  },
  "mcqs": [
    {
      "question": "Question text?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 0,
      "difficulty": "medium",
      "topic": "topic_name",
      "explanation": "Why this is correct..."
    }
  ],
  "shortAnswerQuestions": [
    {
      "question": "Question text?",
      "difficulty": "medium",
      "topic": "topic_name",
      "keyPoints": ["point1", "point2"]
    }
  ],
  "studyGuide": {
    "summary": "Overview of the document",
    "importantConcepts": ["concept1", "concept2"],
    "suggestedReadings": ["reading1", "reading2"]
  }
}

Requirements:
- Generate ${settings.mcqCount} MCQs
- Generate ${settings.shortAnswerCount} short answer questions
- Set difficulty to ${settings.difficulty}
- Include explanations: ${settings.includeExplanations}
- Ensure all MCQs have exactly 4 options
- Set correctAnswer as index (0-3)
- Return ONLY valid JSON, no additional text`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        },
      }),
    });

    setProgress({ step: 'Processing response...', progress: 85, message: 'Finalizing quiz data' });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate quiz');
    }

    const data = await response.json();
    let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botResponse) {
      throw new Error('No response received from AI');
    }

    // Remove markdown code blocks if present (e.g., ```json ... ```)
    botResponse = botResponse.trim();
    if (botResponse.startsWith('```json')) {
      botResponse = botResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (botResponse.startsWith('```')) {
      botResponse = botResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    // Parse JSON response
    const quizData = JSON.parse(botResponse);
    return quizData;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate quiz: ' + error.message);
  }
};

// Generate mock quiz for testing
export const generateMockQuiz = async (file, settings, setProgress) => {
  setProgress({ step: 'Generating mock quiz...', progress: 50, message: 'Creating sample questions' });

  const mockData = {
    analysis: {
      mainTopics: ['Topic 1', 'Topic 2', 'Topic 3'],
      difficultyLevel: settings.difficulty,
      estimatedStudyTime: '2-3 hours',
    },
    mcqs: Array(settings.mcqCount).fill(null).map((_, i) => ({
      question: `Sample MCQ Question ${i + 1}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: Math.floor(Math.random() * 4),
      difficulty: settings.difficulty,
      topic: 'Sample Topic',
      explanation: 'This is the explanation for the correct answer.',
    })),
    shortAnswerQuestions: Array(settings.shortAnswerCount).fill(null).map((_, i) => ({
      question: `Sample Short Answer Question ${i + 1}?`,
      difficulty: settings.difficulty,
      topic: 'Sample Topic',
      keyPoints: ['Point 1', 'Point 2', 'Point 3'],
    })),
    studyGuide: {
      summary: 'This is a mock study guide summary.',
      importantConcepts: ['Concept 1', 'Concept 2', 'Concept 3'],
      suggestedReadings: ['Reading 1', 'Reading 2', 'Reading 3'],
    },
  };

  setProgress({ step: 'Finalizing...', progress: 100, message: 'Quiz ready!' });

  return {
    data: mockData,
    metadata: {
      fileName: file.name,
      fileSize: file.size,
      questionsCount: {
        mcqs: settings.mcqCount,
        shortAnswers: settings.shortAnswerCount,
        total: settings.mcqCount + settings.shortAnswerCount,
      },
      generatedAt: new Date().toISOString(),
    },
  };
};

// Export quiz as JSON file
export const exportQuizAsJSON = (quizData, fileName) => {
  const jsonString = JSON.stringify(quizData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}_quiz.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Save quiz to localStorage
export const saveQuizToLocalStorage = (quizData, quizId) => {
  try {
    const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    allQuizzes[quizId] = {
      data: quizData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('quizzes', JSON.stringify(allQuizzes));
    console.log('Quiz saved to localStorage:', quizId);
  } catch (error) {
    console.error('Failed to save quiz to localStorage:', error);
  }
};

// Get all saved quizzes from localStorage
export const getAllSavedQuizzes = () => {
  try {
    return JSON.parse(localStorage.getItem('quizzes')) || {};
  } catch (error) {
    console.error('Failed to retrieve quizzes from localStorage:', error);
    return {};
  }
};

// Get specific quiz from localStorage
export const getQuizFromLocalStorage = (quizId) => {
  try {
    const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    return allQuizzes[quizId] || null;
  } catch (error) {
    console.error('Failed to retrieve quiz from localStorage:', error);
    return null;
  }
};

// Delete quiz from localStorage
export const deleteQuizFromLocalStorage = (quizId) => {
  try {
    const allQuizzes = JSON.parse(localStorage.getItem('quizzes')) || {};
    delete allQuizzes[quizId];
    localStorage.setItem('quizzes', JSON.stringify(allQuizzes));
    console.log('Quiz deleted from localStorage:', quizId);
  } catch (error) {
    console.error('Failed to delete quiz from localStorage:', error);
  }
};
