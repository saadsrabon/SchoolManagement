
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Download, FileText, Users, DollarSign, Calendar, GraduationCap } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportStats = {
    totalStudents: 2847,
    totalRevenue: 14250000,
    attendanceRate: 92.3,
    passRate: 87.5,
    teacherEfficiency: 94.2,
    parentEngagement: 78.9
  };

  const reportCategories = [
    {
      title: "Academic Reports",
      description: "Student performance and academic analytics",
      icon: GraduationCap,
      color: "bg-blue-500",
      reports: [
        { name: "Student Performance Report", description: "Detailed grade analysis" },
        { name: "Class Comparison Report", description: "Performance across classes" },
        { name: "Subject-wise Analysis", description: "Subject performance metrics" },
        { name: "Exam Results Summary", description: "Comprehensive exam analytics" }
      ]
    },
    {
      title: "Attendance Reports",
      description: "Attendance tracking and analysis",
      icon: Users,
      color: "bg-green-500",
      reports: [
        { name: "Daily Attendance Report", description: "Day-wise attendance data" },
        { name: "Monthly Attendance Summary", description: "Monthly trends and patterns" },
        { name: "Student Attendance Profile", description: "Individual student records" },
        { name: "Class Attendance Analysis", description: "Class-wise attendance metrics" }
      ]
    },
    {
      title: "Financial Reports",
      description: "Fee collection and financial analytics",
      icon: DollarSign,
      color: "bg-orange-500",
      reports: [
        { name: "Fee Collection Report", description: "Payment tracking and analysis" },
        { name: "Outstanding Dues Report", description: "Pending payment details" },
        { name: "Monthly Revenue Report", description: "Revenue trends and insights" },
        { name: "Expense Analysis Report", description: "School expenditure breakdown" }
      ]
    },
    {
      title: "Administrative Reports",
      description: "Staff and operational analytics",
      icon: BarChart3,
      color: "bg-purple-500",
      reports: [
        { name: "Teacher Performance Report", description: "Staff efficiency metrics" },
        { name: "Resource Utilization Report", description: "Facility and resource usage" },
        { name: "Parent Engagement Report", description: "Parent interaction analytics" },
        { name: "School Overview Report", description: "Comprehensive school metrics" }
      ]
    }
  ];

  const quickStats = [
    { title: "Total Students", value: reportStats.totalStudents.toLocaleString(), change: "+12.5%", positive: true },
    { title: "Monthly Revenue", value: `₹${(reportStats.totalRevenue / 100000).toFixed(1)}L`, change: "+8.3%", positive: true },
    { title: "Attendance Rate", value: `${reportStats.attendanceRate}%`, change: "+2.1%", positive: true },
    { title: "Pass Rate", value: `${reportStats.passRate}%`, change: "+5.7%", positive: true }
  ];

  return (
    <DashboardLayout role="admin" title="Reports & Analytics">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className={`h-3 w-3 mr-1 ${stat.positive ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                      <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>School Performance Overview</CardTitle>
              <CardDescription>Key performance indicators for the current academic year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Student Attendance Rate</span>
                  <span className="text-sm font-bold">{reportStats.attendanceRate}%</span>
                </div>
                <Progress value={reportStats.attendanceRate} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Academic Pass Rate</span>
                  <span className="text-sm font-bold">{reportStats.passRate}%</span>
                </div>
                <Progress value={reportStats.passRate} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Teacher Efficiency</span>
                  <span className="text-sm font-bold">{reportStats.teacherEfficiency}%</span>
                </div>
                <Progress value={reportStats.teacherEfficiency} className="h-2" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Parent Engagement</span>
                  <span className="text-sm font-bold">{reportStats.parentEngagement}%</span>
                </div>
                <Progress value={reportStats.parentEngagement} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Export</CardTitle>
              <CardDescription>Generate commonly used reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2 mb-4">
                <select 
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Attendance Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Fee Collection Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Academic Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Complete Summary
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.reports.map((report, reportIndex) => (
                    <div key={reportIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{report.name}</p>
                        <p className="text-xs text-gray-600">{report.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
