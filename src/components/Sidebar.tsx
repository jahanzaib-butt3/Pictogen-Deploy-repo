import React from 'react';
import { Bot, Video, X } from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const tools = [
  { id: 'llm', name: 'AI Chat', icon: Bot },
  { id: 'video', name: 'Text to Video', icon: Video },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, setSelectedTool, isOpen, onClose }) => {
  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-gray-800 border-r border-gray-700 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="text-xl font-semibold text-white">Menu</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              className={`w-full px-4 py-3 rounded-lg transition duration-200 flex items-center ${
                selectedTool === tool.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleToolSelect(tool.id)}
            >
              <tool.icon className="mr-3 h-5 w-5" />
              {tool.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;