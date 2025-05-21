
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

// Import Lucide icons
import { 
  Compass, 
  FileText, 
  Calendar, 
  BarChart2, 
  Settings, 
  Users, 
  Search, 
  User, 
  PenTool 
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  onClick?: () => void;
  badge?: string | number;
  comingSoon?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  active, 
  onClick,
  badge,
  comingSoon
}) => {
  return (
    <Link
      to={comingSoon ? "#" : to}
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer mb-1 transition-colors",
        active 
          ? "bg-fundsprout-light text-fundsprout-dark font-medium"
          : "text-gray-600 hover:bg-fundsprout-light/50 hover:text-fundsprout-dark",
        comingSoon && "opacity-60 cursor-not-allowed hover:bg-transparent hover:text-gray-600"
      )}
      onClick={(e) => {
        if (comingSoon) {
          e.preventDefault();
        } else if (onClick) {
          onClick();
        }
      }}
    >
      <div className="flex items-center space-x-3">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
      
      {badge && (
        <span className="inline-flex items-center justify-center h-5 min-w-5 px-1 text-xs font-medium rounded-md bg-fundsprout-primary/20 text-fundsprout-primary">
          {badge}
        </span>
      )}
      
      {comingSoon && (
        <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-600">
          Soon
        </span>
      )}
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Check if the user has completed onboarding
  const hasCompletedOnboarding = localStorage.getItem('onboarding-completed') === 'true';

  return (
    <div className={cn("w-64 h-screen flex flex-col bg-white border-r border-gray-200", className)}>
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-fundsprout-primary flex items-center justify-center text-white font-bold">
            FS
          </div>
          <span className="text-xl font-bold text-fundsprout-dark">Fundsprout</span>
        </Link>
        <div className="text-xs text-gray-500 mt-1">Grant Management Solution</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        {/* If onboarding is not completed, only show the Onboarding link */}
        {!hasCompletedOnboarding ? (
          <SidebarItem 
            icon={<Compass />} 
            label="Onboarding" 
            to="/welcome"
            active={path === '/welcome'} 
          />
        ) : (
          <>
            <SidebarItem 
              icon={<Compass />} 
              label="Discovery" 
              to="/discovery"
              active={path === '/discovery'} 
            />
            
            <SidebarItem 
              icon={<PenTool />} 
              label="Draft Workspace" 
              to="/draft-workspace"
              comingSoon={true}
            />
            
            <SidebarItem 
              icon={<Search />} 
              label="Find Grants" 
              to="/find-grants"
              comingSoon={true}
            />

            <SidebarItem 
              icon={<FileText />} 
              label="Applications" 
              to="/applications"
              comingSoon={true}
              badge="3"
            />

            <SidebarItem 
              icon={<Calendar />} 
              label="Compliance Calendar" 
              to="/calendar"
              comingSoon={true}
            />
            
            <SidebarItem 
              icon={<Users />} 
              label="Team Collaboration" 
              to="/collaboration"
              comingSoon={true}
            />
            
            <SidebarItem 
              icon={<BarChart2 />} 
              label="Analytics & Reports" 
              to="/reports"
              comingSoon={true}
            />

            <div className="mt-6 pt-6 border-t border-gray-200">
              <SidebarItem 
                icon={<User />}
                label="Organization Profile" 
                to="/organization"
                comingSoon={true}
              />
              
              <SidebarItem 
                icon={<Settings />} 
                label="Settings" 
                to="/settings"
                comingSoon={true}
              />
            </div>
          </>
        )}
      </nav>

      {/* User profile */}
      {hasCompletedOnboarding && (
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
      )}
    </div>
  );
};

export default Sidebar;
