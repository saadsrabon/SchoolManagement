
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, Calendar, Clock, Bell, Plus, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const TeacherDashboard = () => {
  const [teacherStats] = useState({
    totalClasses: 8,
    totalStudents: 240,
    todayClasses: 6,
    leaveBalance: 15,
    pendingLeaves: 1,
    upcomingExams: 3
  });

  const quickStats = [
    {
      title: "My Classes",
      value: teacherStats.totalClasses.toString(),
      icon: BookOpen,
      color: "bg-blue-500",
      description: "Active classes"
    },
    {
      title: "Total Students",
      value: teacherStats.totalStudents.toString(),
      icon: Users,
      color: "bg-green-500",
      description: "Across all classes"
    },
    {
      title: "Today's Classes",
      value: teacherStats.todayClasses.toString(),
      icon: Calendar,
      color: "bg-purple-500",
      description: "Scheduled for today"
    },
    {
      title: "Leave Balance",
      value: teacherStats.leaveBalance.toString(),
      icon: Clock,
      color: "bg-orange-500",
      description: "Days remaining"
    }
  ];

  const todaySchedule = [
    { time: "09:00 AM", subject: "Mathematics", class: "Grade 10A", room: "Room 101" },
    { time: "10:00 AM", subject: "Physics", class: "Grade 11B", room: "Room 203" },
    { time: "11:30 AM", subject: "Mathematics", class: "Grade 9A", room: "Room 101" },
    { time: "02:00 PM", subject: "Physics", class: "Grade 10C", room: "Room 203" }
  ];

  const recentActivities = [
    { action: "Attendance marked", details: "Grade 10A - Mathematics", time: "2 hours ago" },
    { action: "Assignment uploaded", details: "Physics homework for Grade 11B", time: "4 hours ago" },
    { action: "Grades updated", details: "Mid-term results for Grade 9A", time: "1 day ago" }
  ];

  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leave Management */}
          <Card>
            <CardHeader>
              <CardTitle>Leave Management</CardTitle>
              <CardDescription>Your leave balance and requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Leave Balance</span>
                  <span className="text-lg font-bold text-green-600">{teacherStats.leaveBalance} days</span>
                </div>
                <Progress value={(teacherStats.leaveBalance / 30) * 100} className="h-2" />
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <p className="text-sm text-gray-600">Pending Requests: {teacherStats.pendingLeaves}</p>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Request Leave
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{schedule.subject}</p>
                      <p className="text-xs text-gray-600">{schedule.class} • {schedule.room}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{schedule.time}</p>
                      <Badge variant="secondary" className="text-xs">
                        Scheduled
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your recent actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Mark Attendance</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BookOpen className="h-6 w-6 mb-2" />
                  <span className="text-sm">Upload Assignment</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span className="text-sm">View Schedule</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Bell className="h-6 w-6 mb-2" />
                  <span className="text-sm">Send Notice</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
