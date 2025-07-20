
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, Calendar, CheckCircle, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const MyClassesPage = () => {
  const [classes] = useState([
    {
      id: 1,
      name: "Grade 10A",
      subject: "Mathematics",
      totalStudents: 35,
      presentToday: 32,
      averageAttendance: 91.4,
      nextClass: "Tomorrow 10:00 AM",
      room: "Room 101",
      status: "active"
    },
    {
      id: 2,
      name: "Grade 11B",
      subject: "Physics",
      totalStudents: 28,
      presentToday: 26,
      averageAttendance: 92.8,
      nextClass: "Today 2:00 PM",
      room: "Room 203",
      status: "active"
    },
    {
      id: 3,
      name: "Grade 9A",
      subject: "Mathematics",
      totalStudents: 30,
      presentToday: 28,
      averageAttendance: 93.3,
      nextClass: "Tomorrow 11:30 AM",
      room: "Room 101",
      status: "active"
    }
  ]);

  const classStats = {
    totalClasses: classes.length,
    totalStudents: classes.reduce((sum, cls) => sum + cls.totalStudents, 0),
    averageAttendance: classes.reduce((sum, cls) => sum + cls.averageAttendance, 0) / classes.length,
    todayPresent: classes.reduce((sum, cls) => sum + cls.presentToday, 0)
  };

  return (
    <DashboardLayout role="teacher" title="My Classes">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">{classStats.totalClasses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-green-600">{classStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                  <p className="text-2xl font-bold text-purple-600">{classStats.averageAttendance.toFixed(1)}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present Today</p>
                  <p className="text-2xl font-bold text-orange-600">{classStats.todayPresent}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <CardDescription>{classItem.subject}</CardDescription>
                  </div>
                  <Badge variant="secondary">{classItem.room}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="font-medium">{classItem.totalStudents}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Today's Attendance</span>
                    <span className="font-medium">{classItem.presentToday}/{classItem.totalStudents}</span>
                  </div>
                  <Progress 
                    value={(classItem.presentToday / classItem.totalStudents) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Attendance</span>
                    <span className="font-medium">{classItem.averageAttendance}%</span>
                  </div>
                  <Progress value={classItem.averageAttendance} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {classItem.nextClass}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">View Details</Button>
                  <Button size="sm" variant="outline" className="flex-1">Mark Attendance</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyClassesPage;
