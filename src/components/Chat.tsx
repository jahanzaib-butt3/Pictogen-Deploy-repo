import React, { useState, useEffect, useRef } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { generateChatResponse } from '../utils/api';

interface ChatProps {
  model: string;
}

interface Message {
  role: string;
  content: string;
}

const Chat: React.FC<ChatProps> = ({ model }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await generateChatResponse([...messages, userMessage], model);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[90%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-700 text-gray-100 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="mx-4 my-2 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-t border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                     text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     disabled:opacity-50 transition-colors"
            disabled={isLoading || !input.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;