
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Clock, MapPin, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SchedulePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const weekSchedule = [
    {
      day: "Monday",
      classes: [
        { time: "09:00 AM", subject: "Mathematics", class: "Grade 10A", room: "Room 101", duration: "1 hour" },
        { time: "11:00 AM", subject: "Physics", class: "Grade 11B", room: "Room 203", duration: "1 hour" },
        { time: "02:00 PM", subject: "Mathematics", class: "Grade 9A", room: "Room 101", duration: "1 hour" }
      ]
    },
    {
      day: "Tuesday",
      classes: [
        { time: "10:00 AM", subject: "Physics", class: "Grade 10C", room: "Room 203", duration: "1 hour" },
        { time: "01:00 PM", subject: "Mathematics", class: "Grade 11A", room: "Room 101", duration: "1 hour" },
        { time: "03:00 PM", subject: "Physics", class: "Grade 9B", room: "Room 203", duration: "1 hour" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { time: "09:00 AM", subject: "Mathematics", class: "Grade 10A", room: "Room 101", duration: "1 hour" },
        { time: "11:30 AM", subject: "Physics", class: "Grade 11B", room: "Room 203", duration: "1 hour" },
        { time: "02:30 PM", subject: "Mathematics", class: "Grade 8A", room: "Room 101", duration: "1 hour" }
      ]
    },
    {
      day: "Thursday",
      classes: [
        { time: "10:00 AM", subject: "Physics", class: "Grade 10C", room: "Room 203", duration: "1 hour" },
        { time: "12:00 PM", subject: "Mathematics", class: "Grade 9A", room: "Room 101", duration: "1 hour" },
        { time: "03:00 PM", subject: "Physics", class: "Grade 11A", room: "Room 203", duration: "1 hour" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { time: "09:00 AM", subject: "Mathematics", class: "Grade 10A", room: "Room 101", duration: "1 hour" },
        { time: "11:00 AM", subject: "Physics", class: "Grade 11B", room: "Room 203", duration: "1 hour" }
      ]
    }
  ];

  const todaySchedule = weekSchedule.find(day => 
    day.day === new Date().toLocaleDateString('en-US', { weekday: 'long' })
  )?.classes || [];

  return (
    <DashboardLayout role="teacher" title="My Schedule">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Classes</CardTitle>
              <CardDescription>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.length > 0 ? (
                  todaySchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <Clock className="h-5 w-5 text-blue-500 mb-1" />
                          <span className="text-sm font-medium">{schedule.time}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{schedule.subject}</h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {schedule.class}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {schedule.room}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{schedule.duration}</Badge>
                        <div className="mt-2">
                          <Button size="sm">Join Class</Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No classes scheduled for today</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Weekly Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>Your complete weekly timetable</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {weekSchedule.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <h3 className="font-semibold text-lg mb-3 text-gray-800">{day.day}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {day.classes.map((schedule, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-blue-600">{schedule.time}</span>
                          <Badge variant="secondary">{schedule.duration}</Badge>
                        </div>
                        <h4 className="font-medium">{schedule.subject}</h4>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          {schedule.class}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {schedule.room}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SchedulePage;
