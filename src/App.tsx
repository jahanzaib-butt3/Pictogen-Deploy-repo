import React, { useState } from 'react';
import { ImageIcon, Menu } from 'lucide-react';
import ImageGenerator from './components/ImageGenerator';
import VideoGenerator from './components/VideoGenerator';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';

function App() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('llm');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar 
        selectedTool={selectedTool} 
        setSelectedTool={setSelectedTool}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col w-full">
        <header className="bg-gray-800 border-b border-gray-700 shadow-lg z-20 sticky top-0">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center">
              <ImageIcon className="mr-3 h-8 w-8" />
              Pictogen
            </h1>
            <div className="w-8 md:hidden" /> {/* Spacer for centering */}
          </div>
        </header>

        <main className="flex-1 bg-gray-900 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Image Generation Section */}
              <div className="w-full lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4 text-indigo-400 flex items-center sticky top-0">
                  <ImageIcon className="mr-2" />
                  Text to Image
                </h2>
                <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
                  <ImageGenerator setGeneratedImage={setGeneratedImage} />
                  {generatedImage && (
                    <div className="mt-6">
                      <h3 className="text-xl font-semibold mb-4 text-indigo-400">Generated Image:</h3>
                      <div className="rounded-lg overflow-hidden shadow-2xl">
                        <img 
                          src={generatedImage} 
                          alt="Generated" 
                          className="w-full h-auto"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat/Video Section */}
              <div className="w-full lg:w-1/2">
                {selectedTool === 'llm' ? (
                  <div className="h-full">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-400 flex items-center sticky top-0">
                      <ImageIcon className="mr-2" />
                      AI Chat Assistant
                    </h2>
                    <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
                      <Chat model="llama-3.2-90b-text-preview" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full">
                    <h2 className="text-2xl font-semibold mb-4 text-indigo-400 flex items-center sticky top-0">
                      <ImageIcon className="mr-2" />
                      Text to Video
                    </h2>
                    <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
                      <VideoGenerator setGeneratedVideo={setGeneratedVideo} />
                      {generatedVideo && (
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold mb-4 text-indigo-400">Generated Video:</h3>
                          <div className="rounded-lg overflow-hidden shadow-2xl">
                            <video 
                              src={generatedVideo} 
                              controls 
                              className="w-full h-auto"
                            >
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;