
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Users, BookOpen, DollarSign, Calendar, Bell, MessageSquare, TrendingUp, FileText, ClipboardList, UserCheck, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const GuardianDashboard = () => {
  const [guardianStats] = useState({
    totalChildren: 2,
    pendingFees: 25000,
    upcomingEvents: 3,
    unreadMessages: 5
  });

  const [selectedChild, setSelectedChild] = useState(0);
  const [leaveRequest, setLeaveRequest] = useState({ reason: '', startDate: '', endDate: '' });

  const children = [
    {
      id: 1,
      name: "Alice Johnson",
      class: "Grade 10A",
      rollNo: "2024001",
      attendance: 92,
      pendingFees: 15000,
      lastExamScore: 87,
      totalDays: 180,
      presentDays: 165,
      absentDays: 15,
      leaveTaken: 8,
      examsTaken: 12,
      totalExams: 15,
      complaints: 1
    },
    {
      id: 2,
      name: "Bob Johnson", 
      class: "Grade 8B",
      rollNo: "2024156",
      attendance: 88,
      pendingFees: 10000,
      lastExamScore: 91,
      totalDays: 180,
      presentDays: 158,
      absentDays: 22,
      leaveTaken: 5,
      examsTaken: 10,
      totalExams: 12,
      complaints: 0
    }
  ];

  const childResults = [
    { subject: "Mathematics", marks: 85, grade: "A", total: 100, status: "Pass" },
    { subject: "Science", marks: 78, grade: "B+", total: 100, status: "Pass" },
    { subject: "English", marks: 92, grade: "A+", total: 100, status: "Pass" },
    { subject: "History", marks: 75, grade: "B", total: 100, status: "Pass" },
    { subject: "Geography", marks: 88, grade: "A", total: 100, status: "Pass" }
  ];

  const classRoutine = [
    { day: "Monday", time: "9:00-10:00", subject: "Mathematics", teacher: "Mr. Smith" },
    { day: "Monday", time: "10:00-11:00", subject: "Science", teacher: "Ms. Johnson" },
    { day: "Tuesday", time: "9:00-10:00", subject: "English", teacher: "Mrs. Brown" },
    { day: "Tuesday", time: "10:00-11:00", subject: "History", teacher: "Mr. Davis" },
    { day: "Wednesday", time: "9:00-10:00", subject: "Geography", teacher: "Ms. Wilson" }
  ];

  const examDetails = [
    { examName: "Mid-term Mathematics", date: "2024-01-15", status: "Completed", marks: 85 },
    { examName: "Science Quiz", date: "2024-01-20", status: "Completed", marks: 78 },
    { examName: "English Essay", date: "2024-01-25", status: "Pending", marks: "-" },
    { examName: "History Project", date: "2024-01-30", status: "Completed", marks: 92 }
  ];

  const assignments = [
    { title: "Math Problem Set 5", subject: "Mathematics", dueDate: "2024-01-18", status: "Submitted", grade: "A" },
    { title: "Science Lab Report", subject: "Science", dueDate: "2024-01-20", status: "Pending", grade: "-" },
    { title: "English Essay", subject: "English", dueDate: "2024-01-22", status: "Submitted", grade: "B+" },
    { title: "History Timeline", subject: "History", dueDate: "2024-01-25", status: "Not Submitted", grade: "-" }
  ];

  const quickStats = [
    {
      title: "My Children",
      value: guardianStats.totalChildren.toString(),
      icon: Users,
      color: "bg-blue-500",
      description: "Enrolled students"
    },
    {
      title: "Pending Fees",
      value: `₹${guardianStats.pendingFees.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-red-500",
      description: "Total outstanding"
    },
    {
      title: "Upcoming Events",
      value: guardianStats.upcomingEvents.toString(),
      icon: Calendar,
      color: "bg-purple-500",
      description: "School events"
    },
    {
      title: "Messages",
      value: guardianStats.unreadMessages.toString(),
      icon: MessageSquare,
      color: "bg-green-500", 
      description: "Unread messages"
    }
  ];

  const recentUpdates = [
    { type: "attendance", message: "Alice marked present today", time: "2 hours ago" },
    { type: "fee", message: "Monthly fee reminder for Bob", time: "1 day ago" },
    { type: "exam", message: "Mid-term results published for Alice", time: "2 days ago" },
    { type: "notice", message: "Parent-teacher meeting scheduled", time: "3 days ago" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Meeting", date: "Dec 15, 2024", type: "meeting" },
    { title: "Annual Sports Day", date: "Dec 20, 2024", type: "event" },
    { title: "Fee Payment Due", date: "Dec 25, 2024", type: "payment" }
  ];

  const handleLeaveSubmit = () => {
    console.log('Leave request submitted:', leaveRequest);
    setLeaveRequest({ reason: '', startDate: '', endDate: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Submitted':
      case 'Pass':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Submitted':
      case 'Fail':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="parent" title="Parent Dashboard">
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

        {/* Children Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>My Children</CardTitle>
            <CardDescription>Detailed information about your children</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={children[selectedChild]?.name} onValueChange={(value) => {
              const index = children.findIndex(child => child.name === value);
              setSelectedChild(index);
            }}>
              <TabsList className="grid w-full grid-cols-2">
                {children.map((child) => (
                  <TabsTrigger key={child.id} value={child.name}>
                    {child.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {children.map((child, childIndex) => (
                <TabsContent key={child.id} value={child.name} className="space-y-6">
                  {/* Child Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Class</p>
                          <p className="text-lg font-bold">{child.class}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Attendance</p>
                          <p className="text-lg font-bold text-green-600">{child.attendance}%</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Last Exam</p>
                          <p className="text-lg font-bold text-blue-600">{child.lastExamScore}%</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Pending Fees</p>
                          <p className="text-lg font-bold text-red-600">₹{child.pendingFees.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Detailed Tabs */}
                  <Tabs defaultValue="attendance" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="attendance">Attendance</TabsTrigger>
                      <TabsTrigger value="results">Results</TabsTrigger>
                      <TabsTrigger value="routine">Routine</TabsTrigger>
                      <TabsTrigger value="exams">Exams</TabsTrigger>
                      <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    </TabsList>

                    {/* Attendance Tab */}
                    <TabsContent value="attendance" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-5 w-5 text-green-500" />
                              <div>
                                <p className="text-sm text-gray-600">Present Days</p>
                                <p className="text-xl font-bold">{child.presentDays}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <XCircle className="h-5 w-5 text-red-500" />
                              <div>
                                <p className="text-sm text-gray-600">Absent Days</p>
                                <p className="text-xl font-bold">{child.absentDays}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-5 w-5 text-yellow-500" />
                              <div>
                                <p className="text-sm text-gray-600">Leave Taken</p>
                                <p className="text-xl font-bold">{child.leaveTaken}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-5 w-5 text-orange-500" />
                              <div>
                                <p className="text-sm text-gray-600">Complaints</p>
                                <p className="text-xl font-bold">{child.complaints}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Leave Request Form */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Submit Leave Request</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Start Date</label>
                              <Input
                                type="date"
                                value={leaveRequest.startDate}
                                onChange={(e) => setLeaveRequest({...leaveRequest, startDate: e.target.value})}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">End Date</label>
                              <Input
                                type="date"
                                value={leaveRequest.endDate}
                                onChange={(e) => setLeaveRequest({...leaveRequest, endDate: e.target.value})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Reason</label>
                            <Textarea
                              placeholder="Enter reason for leave..."
                              value={leaveRequest.reason}
                              onChange={(e) => setLeaveRequest({...leaveRequest, reason: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleLeaveSubmit}>Submit Leave Request</Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Results Tab */}
                    <TabsContent value="results">
                      <Card>
                        <CardHeader>
                          <CardTitle>Academic Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Subject</TableHead>
                                  <TableHead>Marks Obtained</TableHead>
                                  <TableHead>Total Marks</TableHead>
                                  <TableHead>Grade</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {childResults.map((result, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{result.subject}</TableCell>
                                    <TableCell>{result.marks}</TableCell>
                                    <TableCell>{result.total}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{result.grade}</Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge className={getStatusColor(result.status)}>
                                        {result.status}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Routine Tab */}
                    <TabsContent value="routine">
                      <Card>
                        <CardHeader>
                          <CardTitle>Class Routine</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Day</TableHead>
                                  <TableHead>Time</TableHead>
                                  <TableHead>Subject</TableHead>
                                  <TableHead>Teacher</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {classRoutine.map((schedule, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{schedule.day}</TableCell>
                                    <TableCell>{schedule.time}</TableCell>
                                    <TableCell>{schedule.subject}</TableCell>
                                    <TableCell>{schedule.teacher}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Exams Tab */}
                    <TabsContent value="exams">
                      <Card>
                        <CardHeader>
                          <CardTitle>Exam Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Exam Name</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Marks</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {examDetails.map((exam, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{exam.examName}</TableCell>
                                    <TableCell>{exam.date}</TableCell>
                                    <TableCell>
                                      <Badge className={getStatusColor(exam.status)}>
                                        {exam.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>{exam.marks}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Assignments Tab */}
                    <TabsContent value="assignments">
                      <Card>
                        <CardHeader>
                          <CardTitle>Assignment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="rounded-md border">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Assignment Title</TableHead>
                                  <TableHead>Subject</TableHead>
                                  <TableHead>Due Date</TableHead>
                                  <TableHead>Status</TableHead>
                                  <TableHead>Grade</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {assignments.map((assignment, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{assignment.title}</TableCell>
                                    <TableCell>{assignment.subject}</TableCell>
                                    <TableCell>{assignment.dueDate}</TableCell>
                                    <TableCell>
                                      <Badge className={getStatusColor(assignment.status)}>
                                        {assignment.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant="outline">{assignment.grade}</Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>Latest news about your children</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      update.type === 'attendance' ? 'bg-green-500' :
                      update.type === 'fee' ? 'bg-red-500' :
                      update.type === 'exam' ? 'bg-blue-500' : 'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{update.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{update.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Updates
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates and deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-600">{event.date}</p>
                    </div>
                    <Badge variant={
                      event.type === 'payment' ? 'destructive' :
                      event.type === 'meeting' ? 'default' : 'outline'
                    }>
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuardianDashboard;
