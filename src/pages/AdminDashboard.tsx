
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Users, GraduationCap, BookOpen, DollarSign, Calendar as CalendarIcon, TrendingUp, Bell, Plus } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 2847,
    totalTeachers: 156,
    totalClasses: 84,
    feeCollection: 89.5,
    attendanceRate: 92.3,
    pendingFees: 125000
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  const quickStats = [
    {
      title: "Total Students",
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: "bg-blue-500",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Teachers",
      value: stats.totalTeachers.toString(),
      icon: GraduationCap,
      color: "bg-green-500",
      change: "+3.2%", 
      changeType: "positive"
    },
    {
      title: "Active Classes",
      value: stats.totalClasses.toString(),
      icon: BookOpen,
      color: "bg-purple-500",
      change: "+5.8%",
      changeType: "positive"
    },
    {
      title: "Fee Collection",
      value: `${stats.feeCollection}%`,
      icon: DollarSign,
      color: "bg-orange-500",
      change: "+2.1%",
      changeType: "positive"
    }
  ];

  const recentActivities = [
    { action: "New student enrollment", details: "John Doe - Grade 10A", time: "2 hours ago", type: "student" },
    { action: "Fee payment received", details: "₹25,000 from Grade 8B", time: "4 hours ago", type: "payment" },
    { action: "Teacher attendance", details: "All teachers marked present", time: "6 hours ago", type: "attendance" },
    { action: "Exam results published", details: "Mid-term results for Grade 9", time: "1 day ago", type: "result" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Dec 15, 2024", type: "meeting" },
    { title: "Annual Sports Day", date: "Dec 20, 2024", type: "event" },
    { title: "Winter Break Starts", date: "Dec 25, 2024", type: "holiday" },
    { title: "Semester Exams", date: "Jan 10, 2025", type: "exam" }
  ];

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">
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
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Fee Collection Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Fee Collection Overview</CardTitle>
              <CardDescription>Current month collection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Collected</span>
                  <span className="text-lg font-bold text-green-600">₹{(stats.pendingFees * stats.feeCollection / 100).toLocaleString()}</span>
                </div>
                <Progress value={stats.feeCollection} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Target: ₹{(stats.pendingFees * 1.4).toLocaleString()}</span>
                  <span>{stats.feeCollection}% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Important dates and events</CardDescription>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'student' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'attendance' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and events</CardDescription>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    <Badge variant={
                      event.type === 'exam' ? 'destructive' :
                      event.type === 'meeting' ? 'default' :
                      event.type === 'holiday' ? 'secondary' : 'outline'
                    }>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
