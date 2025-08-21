import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3, TrendingUp, Download, FileText, Users, DollarSign, Calendar, GraduationCap, Printer, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ReportData {
  name: string;
  description: string;
  data: any;
  type: 'academic' | 'attendance' | 'financial' | 'administrative';
}

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReport, setCurrentReport] = useState<ReportData | null>(null);

  const reportStats = {
    totalStudents: 2847,
    totalRevenue: 14250000,
    attendanceRate: 92.3,
    passRate: 87.5,
    teacherEfficiency: 94.2,
    parentEngagement: 78.9
  };

  // Mock data for all reports
  const mockReportData: { [key: string]: ReportData } = {
    "Student Performance Report": {
      name: "Student Performance Report",
      description: "Detailed grade analysis for all students",
      type: "academic",
      data: {
        summary: {
          totalStudents: 2847,
          averageGrade: 78.5,
          topPerformers: 156,
          needsImprovement: 89
        },
        gradeDistribution: [
          { grade: "A+", count: 234, percentage: 8.2 },
          { grade: "A", count: 456, percentage: 16.0 },
          { grade: "B+", count: 678, percentage: 23.8 },
          { grade: "B", count: 567, percentage: 19.9 },
          { grade: "C+", count: 445, percentage: 15.6 },
          { grade: "C", count: 234, percentage: 8.2 },
          { grade: "D", count: 156, percentage: 5.5 },
          { grade: "F", count: 77, percentage: 2.7 }
        ],
        topStudents: [
          { name: "Priya Sharma", class: "12A", average: 95.2, subjects: 6 },
          { name: "Rahul Kumar", class: "11B", average: 94.8, subjects: 6 },
          { name: "Anjali Patel", class: "12C", average: 93.5, subjects: 6 },
          { name: "Vikram Singh", class: "10A", average: 92.9, subjects: 5 },
          { name: "Meera Reddy", class: "11A", average: 92.1, subjects: 6 }
        ]
      }
    },
    "Class Comparison Report": {
      name: "Class Comparison Report",
      description: "Performance comparison across different classes",
      type: "academic",
      data: {
        classPerformance: [
          { class: "12A", averageGrade: 82.3, totalStudents: 45, attendance: 94.2 },
          { class: "12B", averageGrade: 79.8, totalStudents: 42, attendance: 91.5 },
          { class: "12C", averageGrade: 81.1, totalStudents: 48, attendance: 93.8 },
          { class: "11A", averageGrade: 78.9, totalStudents: 46, attendance: 89.7 },
          { class: "11B", averageGrade: 76.4, totalStudents: 44, attendance: 87.3 },
          { class: "10A", averageGrade: 75.2, totalStudents: 47, attendance: 85.9 }
        ],
        subjectComparison: [
          { subject: "Mathematics", class12A: 85.2, class12B: 82.1, class12C: 83.7 },
          { subject: "Science", class12A: 88.9, class12B: 86.3, class12C: 87.1 },
          { subject: "English", class12A: 79.4, class12B: 77.8, class12C: 78.9 },
          { subject: "History", class12A: 81.7, class12B: 79.2, class12C: 80.5 }
        ]
      }
    },
    "Daily Attendance Report": {
      name: "Daily Attendance Report",
      description: "Day-wise attendance data for all classes",
      type: "attendance",
      data: {
        date: "2024-12-15",
        totalStudents: 2847,
        present: 2628,
        absent: 219,
        attendanceRate: 92.3,
        classWiseAttendance: [
          { class: "12A", total: 45, present: 43, absent: 2, rate: 95.6 },
          { class: "12B", total: 42, present: 39, absent: 3, rate: 92.9 },
          { class: "12C", total: 48, present: 45, absent: 3, rate: 93.8 },
          { class: "11A", total: 46, present: 41, absent: 5, rate: 89.1 },
          { class: "11B", total: 44, present: 38, absent: 6, rate: 86.4 },
          { class: "10A", total: 47, present: 42, absent: 5, rate: 89.4 }
        ],
        absentStudents: [
          { name: "Amit Kumar", class: "12A", reason: "Medical Leave" },
          { name: "Sneha Patel", class: "12B", reason: "Personal" },
          { name: "Rajesh Singh", class: "12C", reason: "Medical Leave" },
          { name: "Priya Sharma", class: "11A", reason: "Family Function" },
          { name: "Vikram Reddy", class: "11B", reason: "Medical Leave" }
        ]
      }
    },
    "Fee Collection Report": {
      name: "Fee Collection Report",
      description: "Payment tracking and analysis for all students",
      type: "financial",
      data: {
        period: "December 2024",
        totalFees: 28470000,
        collected: 25623000,
        pending: 2847000,
        collectionRate: 90.0,
        paymentMethods: [
          { method: "Online Banking", amount: 12811500, percentage: 50.0 },
          { method: "Credit Card", amount: 5124600, percentage: 20.0 },
          { method: "Cash", amount: 7686900, percentage: 30.0 }
        ],
        classWiseCollection: [
          { class: "12A", totalFees: 2250000, collected: 2137500, pending: 112500 },
          { class: "12B", totalFees: 2100000, collected: 1995000, pending: 105000 },
          { class: "12C", totalFees: 2400000, collected: 2280000, pending: 120000 },
          { class: "11A", totalFees: 2300000, collected: 2070000, pending: 230000 },
          { class: "11B", totalFees: 2200000, collected: 1980000, pending: 220000 },
          { class: "10A", totalFees: 2350000, collected: 2115000, pending: 235000 }
        ],
        outstandingDues: [
          { name: "Rahul Kumar", class: "12A", amount: 25000, dueDate: "2024-12-20" },
          { name: "Anjali Patel", class: "12B", amount: 30000, dueDate: "2024-12-18" },
          { name: "Vikram Singh", class: "11A", amount: 35000, dueDate: "2024-12-25" },
          { name: "Meera Reddy", class: "11B", amount: 28000, dueDate: "2024-12-22" },
          { name: "Amit Sharma", class: "10A", amount: 32000, dueDate: "2024-12-30" }
        ]
      }
    },
    "Teacher Performance Report": {
      name: "Teacher Performance Report",
      description: "Staff efficiency and performance metrics",
      type: "administrative",
      data: {
        totalTeachers: 89,
        averageRating: 4.2,
        topPerformers: 12,
        needsImprovement: 3,
        teacherPerformance: [
          { name: "Dr. Sarah Johnson", subject: "Mathematics", rating: 4.8, students: 156, attendance: 96.2 },
          { name: "Prof. Michael Chen", subject: "Physics", rating: 4.7, students: 142, attendance: 94.8 },
          { name: "Ms. Emily Davis", subject: "English", rating: 4.6, students: 134, attendance: 93.1 },
          { name: "Dr. Robert Wilson", subject: "Chemistry", rating: 4.5, students: 128, attendance: 92.7 },
          { name: "Mrs. Lisa Brown", subject: "History", rating: 4.4, students: 145, attendance: 91.9 }
        ],
        subjectPerformance: [
          { subject: "Mathematics", averageRating: 4.3, totalTeachers: 8 },
          { subject: "Science", averageRating: 4.4, totalTeachers: 12 },
          { subject: "English", averageRating: 4.1, totalTeachers: 6 },
          { subject: "History", averageRating: 4.2, totalTeachers: 5 },
          { subject: "Computer Science", averageRating: 4.5, totalTeachers: 4 }
        ],
        attendanceMetrics: [
          { teacher: "Dr. Sarah Johnson", present: 95, absent: 5, rate: 95.0 },
          { teacher: "Prof. Michael Chen", present: 92, absent: 8, rate: 92.0 },
          { teacher: "Ms. Emily Davis", present: 94, absent: 6, rate: 94.0 },
          { teacher: "Dr. Robert Wilson", present: 91, absent: 9, rate: 91.0 },
          { teacher: "Mrs. Lisa Brown", present: 93, absent: 7, rate: 93.0 }
        ]
      }
    }
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

  const handleGenerateReport = (reportName: string) => {
    const reportData = mockReportData[reportName];
    if (reportData) {
      setCurrentReport(reportData);
      setShowReportModal(true);
    }
  };

  const handleDownloadReport = () => {
    if (currentReport) {
      // Simulate download
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(currentReport.data, null, 2)], { type: 'application/json' });
      element.href = URL.createObjectURL(file);
      element.download = `${currentReport.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handlePrintReport = () => {
    if (currentReport) {
      window.print();
    }
  };

  const renderReportContent = (report: ReportData) => {
    switch (report.type) {
      case 'academic':
        return (
          <div className="space-y-6">
            {report.name === "Student Performance Report" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{report.data.summary.totalStudents}</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">{report.data.summary.averageGrade}%</p>
                      <p className="text-sm text-gray-600">Average Grade</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">{report.data.summary.topPerformers}</p>
                      <p className="text-sm text-gray-600">Top Performers</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">{report.data.summary.needsImprovement}</p>
                      <p className="text-sm text-gray-600">Needs Improvement</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Grade</TableHead>
                          <TableHead>Count</TableHead>
                          <TableHead>Percentage</TableHead>
                          <TableHead>Progress</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.data.gradeDistribution.map((grade: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{grade.grade}</TableCell>
                            <TableCell>{grade.count}</TableCell>
                            <TableCell>{grade.percentage}%</TableCell>
                            <TableCell>
                              <Progress value={grade.percentage} className="w-20" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Average</TableHead>
                          <TableHead>Subjects</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.data.topStudents.map((student: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>{student.average}%</TableCell>
                            <TableCell>{student.subjects}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}

            {report.name === "Class Comparison Report" && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Class Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Class</TableHead>
                          <TableHead>Average Grade</TableHead>
                          <TableHead>Total Students</TableHead>
                          <TableHead>Attendance Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.data.classPerformance.map((classData: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{classData.class}</TableCell>
                            <TableCell>{classData.averageGrade}%</TableCell>
                            <TableCell>{classData.totalStudents}</TableCell>
                            <TableCell>{classData.attendance}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject-wise Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>12A</TableHead>
                          <TableHead>12B</TableHead>
                          <TableHead>12C</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.data.subjectComparison.map((subject: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{subject.subject}</TableCell>
                            <TableCell>{subject.class12A}%</TableCell>
                            <TableCell>{subject.class12B}%</TableCell>
                            <TableCell>{subject.class12C}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{report.data.totalStudents}</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{report.data.present}</p>
                  <p className="text-sm text-gray-600">Present</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">{report.data.absent}</p>
                  <p className="text-sm text-gray-600">Absent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{report.data.attendanceRate}%</p>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Class-wise Attendance - {report.data.date}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Present</TableHead>
                      <TableHead>Absent</TableHead>
                      <TableHead>Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.data.classWiseAttendance.map((classData: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{classData.class}</TableCell>
                        <TableCell>{classData.total}</TableCell>
                        <TableCell className="text-green-600">{classData.present}</TableCell>
                        <TableCell className="text-red-600">{classData.absent}</TableCell>
                        <TableCell>{classData.rate}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Absent Students</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.data.absentStudents.map((student: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.class}</TableCell>
                        <TableCell>{student.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">₹{(report.data.totalFees / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600">Total Fees</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">₹{(report.data.collected / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600">Collected</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">₹{(report.data.pending / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{report.data.collectionRate}%</p>
                  <p className="text-sm text-gray-600">Collection Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods - {report.data.period}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Method</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.data.paymentMethods.map((method: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{method.method}</TableCell>
                        <TableCell>₹{(method.amount / 100000).toFixed(1)}L</TableCell>
                        <TableCell>{method.percentage}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Outstanding Dues</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.data.outstandingDues.map((due: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{due.name}</TableCell>
                        <TableCell>{due.class}</TableCell>
                        <TableCell className="text-red-600">₹{due.amount.toLocaleString()}</TableCell>
                        <TableCell>{due.dueDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case 'administrative':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{report.data.totalTeachers}</p>
                  <p className="text-sm text-gray-600">Total Teachers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">{report.data.averageRating}/5</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-purple-600">{report.data.topPerformers}</p>
                  <p className="text-sm text-gray-600">Top Performers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-orange-600">{report.data.needsImprovement}</p>
                  <p className="text-sm text-gray-600">Needs Improvement</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.data.teacherPerformance.map((teacher: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.rating}/5</TableCell>
                        <TableCell>{teacher.students}</TableCell>
                        <TableCell>{teacher.attendance}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Report content not available</div>;
    }
  };

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
              
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleGenerateReport("Daily Attendance Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Attendance Report
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleGenerateReport("Fee Collection Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Fee Collection Report
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleGenerateReport("Student Performance Report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Academic Report
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleGenerateReport("Teacher Performance Report")}
              >
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateReport(report.name)}
                      >
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

      {/* Report Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">{currentReport?.name}</DialogTitle>
                <DialogDescription className="text-lg">{currentReport?.description}</DialogDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleDownloadReport} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handlePrintReport} variant="outline">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button onClick={() => setShowReportModal(false)} variant="outline" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="mt-6">
            {currentReport && renderReportContent(currentReport)}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ReportsPage;