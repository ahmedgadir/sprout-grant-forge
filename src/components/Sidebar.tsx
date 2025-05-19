
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer mb-1 transition-colors",
        active 
          ? "bg-fundsprout-light text-fundsprout-dark font-medium"
          : "text-gray-600 hover:bg-fundsprout-light/50 hover:text-fundsprout-dark"
      )}
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className={cn("w-64 h-screen flex flex-col bg-white border-r border-gray-200", className)}>
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-fundsprout-primary flex items-center justify-center text-white font-bold">
            FS
          </div>
          <span className="text-xl font-bold text-fundsprout-dark">Fundsprout</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Grant Management Solution</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>} 
          label="Dashboard" 
          active={activeItem === 'dashboard'} 
          onClick={() => setActiveItem('dashboard')}
        />

        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>} 
          label="Find Grants" 
          active={activeItem === 'find'} 
          onClick={() => setActiveItem('find')}
        />

        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>} 
          label="Applications" 
          active={activeItem === 'applications'} 
          onClick={() => setActiveItem('applications')}
        />

        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>} 
          label="Calendar" 
          active={activeItem === 'calendar'} 
          onClick={() => setActiveItem('calendar')}
        />
        
        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} 
          label="Organization" 
          active={activeItem === 'profile'} 
          onClick={() => setActiveItem('profile')}
        />

        <SidebarItem 
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>} 
          label="Reports" 
          active={activeItem === 'reports'} 
          onClick={() => setActiveItem('reports')}
        />

        <div className="mt-6 pt-6 border-t border-gray-200">
          <SidebarItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>} 
            label="Settings" 
            active={activeItem === 'settings'} 
            onClick={() => setActiveItem('settings')}
          />
        </div>
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            MG
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">Maria Garcia</div>
            <div className="text-xs text-gray-500">Program Director</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
