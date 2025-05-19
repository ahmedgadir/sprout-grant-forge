
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Calendar } from "@/components/ui/calendar";
import { mockCalendarEvents, CalendarEvent } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { addDays, format, isSameDay } from "date-fns";

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  // Group events by date for easy lookup
  const eventsByDate = mockCalendarEvents.reduce((acc, event) => {
    const dateKey = event.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, CalendarEvent[]>);

  // Get events for the selected date
  const selectedDateEvents = date 
    ? eventsByDate[format(date, 'yyyy-MM-dd')] || []
    : [];

  // Function to determine if a date has events
  const hasEventsOn = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return !!eventsByDate[dateStr];
  };

  // Function to get event type badge color
  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'deadline': return 'bg-red-100 text-red-800';
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'submission': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Calendar</h1>
            <p className="text-gray-600">Track important dates, deadlines, and meetings for your grants.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full"
                  modifiersClassNames={{
                    selected: 'bg-fundsprout-primary text-white hover:bg-fundsprout-primary hover:text-white',
                    today: 'bg-fundsprout-light text-fundsprout-dark'
                  }}
                  modifiers={{
                    hasEvent: (date) => hasEventsOn(date)
                  }}
                  modifiersStyles={{
                    hasEvent: {
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      textDecorationColor: '#2C6E49',
                      textDecorationThickness: '2px'
                    }
                  }}
                />
                
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <h3 className="font-medium mb-2 text-gray-700">Legend</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="text-sm">Deadline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span className="text-sm">Meeting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      <span className="text-sm">Submission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                      <span className="text-sm">Report</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <h2 className="text-lg font-semibold mb-4">
                  {date ? format(date, 'MMMM d, yyyy') : 'No date selected'}
                </h2>
                
                {selectedDateEvents.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar mx-auto mb-3 text-gray-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <p>No events scheduled for this day</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          if (event.relatedId) {
                            if (event.type === 'deadline' || event.type === 'submission') {
                              navigate(`/grants/${event.relatedId}`);
                            } else if (event.type === 'report') {
                              navigate(`/reports/${event.relatedId}`);
                            }
                          }
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-fundsprout-dark">{event.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                          <div>
                            <Badge className={getEventTypeColor(event.type)}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium mb-4">Upcoming Events</h3>
                  {mockCalendarEvents
                    .filter(event => {
                      const eventDate = new Date(event.date);
                      const today = new Date();
                      return eventDate >= today;
                    })
                    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                    .slice(0, 3)
                    .map(event => (
                      <div key={event.id} className="flex items-center gap-4 mb-4 last:mb-0">
                        <div className="w-12 h-12 bg-fundsprout-light rounded-lg flex flex-col items-center justify-center">
                          <span className="text-xs text-fundsprout-dark">{format(new Date(event.date), 'MMM')}</span>
                          <span className="font-bold text-fundsprout-dark">{format(new Date(event.date), 'd')}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-xs text-gray-500">{event.description}</p>
                        </div>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
