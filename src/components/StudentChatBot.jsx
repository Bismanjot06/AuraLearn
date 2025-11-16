import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Trash2, BookOpen } from 'lucide-react';

// TODO: Move Gemini API key and call to backend for security in production!
const StudentChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI study assistant. I can help you with:\n\n• Explaining concepts\n• Solving problems\n• Study tips and strategies\n• Answering questions\n• Exam preparation\n\nWhat would you like to learn today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Call Gemini API
  const callGeminiAPI = async (userMessage) => {
  const API_KEY = 'AIzaSyCPSvf_AHQlzMH_NAWq1JP0Lrb3KmT33HQ';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    console.log('Calling Gemini API for chatbot...');
    console.log('User message:', userMessage);

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
                  text: `You are a helpful AI tutor for students. Provide clear, educational, and encouraging responses. 
                  
Student's question: ${userMessage}

Please provide a helpful, educational response that:
1.⁠ ⁠Answers the question clearly
2.⁠ ⁠Provides examples when relevant
3.⁠ ⁠Encourages learning
4.⁠ ⁠Uses simple language
5.⁠ ⁠Keeps responses concise but informative`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error?.message || 'Failed to get response from AI');
      }

      const data = await response.json();
      console.log('Full API Response:', data);
      
      const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('Extracted bot response:', botResponse);

      if (!botResponse) {
        console.error('No response text found in:', data);
        throw new Error('No response received from AI');
      }

      return botResponse;
    } catch (error) {
      console.error('Gemini API Error:', error);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    const userMessageObj = {
      id: Date.now(),
      type: 'user',
      text: userMessage,
      timestamp: new Date(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessageObj]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await callGeminiAPI(userMessage);

      // Add bot message
      const botMessageObj = {
        id: Date.now() + 1,
        type: 'bot',
        text: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessageObj]);
    } catch (error) {
      // Add error message
      const errorMessageObj = {
        id: Date.now() + 1,
        type: 'bot',
        text: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Chat cleared! How can I help you today?',
        timestamp: new Date(),
      },
    ]);
  };

  // Quick prompts
  const quickPrompts = [
    'Explain photosynthesis',
    'Help me with algebra',
    'Study tips for exams',
    'What is Newton\'s law?',
  ];

  const handleQuickPrompt = (prompt) => {
    setInputMessage(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="glass-panel p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                AI Study Assistant
                <Sparkles className="w-5 h-5 text-primary" />
              </h1>
              <p className="text-white/60 text-sm">Ask me anything about your studies</p>
            </div>
          </div>
          <button
            onClick={handleClearChat}
            className="btn-secondary p-3 rounded-xl flex items-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div className="glass-card flex-1 flex flex-col overflow-hidden">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-fade-in ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gradient-to-r from-primary to-accent text-white'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex-1 max-w-[80%] ${
                  message.type === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : message.isError
                      ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                      : 'bg-dark-card/60 backdrop-blur-md border border-white/10 text-white/90'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-white/60' : 'text-white/40'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-dark-card/60 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-sm text-white/70">Thinking...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-xs text-white/50 mb-2 flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              Quick prompts:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-3 py-1.5 bg-dark-card/40 hover:bg-primary/20 border border-white/10 hover:border-primary/30 rounded-lg text-xs text-white/70 hover:text-white transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                rows="1"
                className="w-full bg-dark-card/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary transition-all resize-none max-h-32"
                style={{
                  minHeight: '48px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="btn-primary p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentChatBot;