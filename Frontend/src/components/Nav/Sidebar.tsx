import { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsOpen(!isOpen);
  };

  const handleProfileClick = (): void => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <div className={`flex ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
      
      <div className="bg-gray-800 text-white h-screen p-4">
        <div className="flex items-center justify-between mb-6">
         
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleProfileClick}>
            <img 
              src="/path-to-avatar.jpg" 
              alt="User Avatar" 
              className="w-8 h-8 rounded-full" 
            />
            <span className="text-sm">User Name</span>
          </div>

          
          {settingsVisible && (
            <div className="absolute left-16 top-12 bg-gray-700 p-2 rounded-md text-white w-40">
              Settings
            </div>
          )}
        </div>

        {/* Dashboard Link */}
        <div className="mb-4">
          <button 
            className="w-full text-left p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
            onClick={() => alert('Dashboard clicked')}
          >
            Dashboard
          </button>
        </div>

        <div className="mb-4">
          <button 
            className="w-full text-left p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
            onClick={() => alert('Charts clicked')}
          >
            Charts
          </button>
        </div>
      </div>

      {/* main content */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* content will go here */}
      </div>
    </div>
  );
};

export default Sidebar;
