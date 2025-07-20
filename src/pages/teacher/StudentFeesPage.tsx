
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Eye, CreditCard, Download, Search, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const StudentFeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Teacher's assigned classes only
  const teacherClasses = ['Grade 10A', 'Grade 10B', 'Grade 9A'];

  const students = [
    {
      id: 1,
      name: "John Doe",
      rollNo: "2024001",
      class: "Grade 10A",
      totalFee: 15000,
      paidAmount: 15000,
      dueAmount: 0,
      status: "paid",
      paymentHistory: [
        { month: "December 2024", amount: 5000, date: "2024-12-05", method: "Bank Transfer" },
        { month: "November 2024", amount: 5000, date: "2024-11-05", method: "Cash" },
        { month: "October 2024", amount: 5000, date: "2024-10-05", method: "bKash" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      rollNo: "2024002",
      class: "Grade 10A",
      totalFee: 15000,
      paidAmount: 10000,
      dueAmount: 5000,
      status: "partial",
      paymentHistory: [
        { month: "November 2024", amount: 5000, date: "2024-11-05", method: "Bank Transfer" },
        { month: "October 2024", amount: 5000, date: "2024-10-05", method: "Cash" }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      rollNo: "2024003",
      class: "Grade 9A",
      totalFee: 14000,
      paidAmount: 0,
      dueAmount: 14000,
      status: "pending",
      paymentHistory: []
    },
    {
      id: 4,
      name: "Sarah Wilson",
      rollNo: "2024004",
      class: "Grade 10B",
      totalFee: 15000,
      paidAmount: 8000,
      dueAmount: 7000,
      status: "overdue",
      paymentHistory: [
        { month: "September 2024", amount: 4000, date: "2024-09-15", method: "bKash" },
        { month: "August 2024", amount: 4000, date: "2024-08-10", method: "Cash" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter students to only show those in teacher's classes
  const teacherStudents = students.filter(student => teacherClasses.includes(student.class));

  const filteredStudents = teacherStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleReportFeeIssue = (studentId: number) => {
    console.log(`Reporting fee issue for student ${studentId} to admin`);
    // Logic to notify admin about fee issues
  };

  return (
    <DashboardLayout role="teacher" title="Class Fee Management">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">My Students</p>
                  <p className="text-2xl font-bold text-gray-900">{teacherStudents.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid Students</p>
                  <p className="text-2xl font-bold text-green-600">{teacherStudents.filter(s => s.status === 'paid').length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">{teacherStudents.filter(s => s.status === 'partial' || s.status === 'pending').length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">{teacherStudents.filter(s => s.status === 'overdue').length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Classes Overview */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Fee status overview for your assigned classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teacherClasses.map((className) => {
                const classStudents = teacherStudents.filter(s => s.class === className);
                const paidStudents = classStudents.filter(s => s.status === 'paid').length;
                const totalStudents = classStudents.length;
                const paymentRate = totalStudents > 0 ? (paidStudents / totalStudents * 100).toFixed(1) : '0';
                
                return (
                  <div key={className} className="p-4 border rounded-lg">
                    <h3 className="font-semibold">{className}</h3>
                    <p className="text-sm text-gray-600">{totalStudents} students</p>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Payment Rate</span>
                        <span>{paymentRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${paymentRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Fee Status</CardTitle>
            <CardDescription>Monitor fee payments for your class students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, roll number, or class..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All My Classes</SelectItem>
                  {teacherClasses.map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Total Fee</TableHead>
                    <TableHead>Paid Amount</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>₹{student.totalFee.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">₹{student.paidAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-red-600">₹{student.dueAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedStudent(student)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Fee Details - {student.name}</DialogTitle>
                                <DialogDescription>
                                  Student fee information and payment history
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Student Information</p>
                                    <div className="mt-2 space-y-1">
                                      <p><strong>Name:</strong> {student.name}</p>
                                      <p><strong>Roll No:</strong> {student.rollNo}</p>
                                      <p><strong>Class:</strong> {student.class}</p>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium text-gray-600">Fee Summary</p>
                                    <div className="mt-2 space-y-1">
                                      <p><strong>Total Fee:</strong> ₹{student.totalFee.toLocaleString()}</p>
                                      <p className="text-green-600"><strong>Paid:</strong> ₹{student.paidAmount.toLocaleString()}</p>
                                      <p className="text-red-600"><strong>Due:</strong> ₹{student.dueAmount.toLocaleString()}</p>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-gray-600 mb-3">Payment History</p>
                                  {student.paymentHistory.length > 0 ? (
                                    <div className="space-y-2">
                                      {student.paymentHistory.map((payment, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                          <div>
                                            <p className="font-medium">{payment.month}</p>
                                            <p className="text-sm text-gray-600">{payment.method}</p>
                                          </div>
                                          <div className="text-right">
                                            <p className="font-medium text-green-600">₹{payment.amount.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">{payment.date}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <p className="text-gray-500">No payment history available</p>
                                  )}
                                </div>

                                {student.dueAmount > 0 && (
                                  <div className="bg-yellow-50 p-4 rounded-lg">
                                    <p className="text-sm text-yellow-800 mb-3">
                                      This student has pending fee payments. As a teacher, you can notify the admin about fee issues.
                                    </p>
                                    <Button 
                                      variant="outline"
                                      onClick={() => handleReportFeeIssue(student.id)}
                                      className="w-full"
                                    >
                                      Report to Admin
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          {student.dueAmount > 0 && (
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleReportFeeIssue(student.id)}
                            >
                              Report Issue
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentFeesPage;
