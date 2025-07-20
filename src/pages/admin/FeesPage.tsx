
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, Users, Calendar, Download, Plus, Eye } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const FeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('2024-12');

  const feeData = [
    { 
      id: 1, 
      studentName: "John Doe", 
      rollNo: "2024001", 
      class: "Grade 10A", 
      totalFee: 5000, 
      paidAmount: 5000, 
      dueAmount: 0, 
      status: "paid", 
      dueDate: "2024-12-10",
      paymentDate: "2024-12-08"
    },
    { 
      id: 2, 
      studentName: "Jane Smith", 
      rollNo: "2024002", 
      class: "Grade 10A", 
      totalFee: 5000, 
      paidAmount: 3000, 
      dueAmount: 2000, 
      status: "partial", 
      dueDate: "2024-12-10",
      paymentDate: "2024-11-15"
    },
    { 
      id: 3, 
      studentName: "Mike Johnson", 
      rollNo: "2024003", 
      class: "Grade 10B", 
      totalFee: 5000, 
      paidAmount: 0, 
      dueAmount: 5000, 
      status: "pending", 
      dueDate: "2024-12-10",
      paymentDate: "-"
    },
    { 
      id: 4, 
      studentName: "Sarah Wilson", 
      rollNo: "2024004", 
      class: "Grade 10B", 
      totalFee: 5500, 
      paidAmount: 5500, 
      dueAmount: 0, 
      status: "paid", 
      dueDate: "2024-12-10",
      paymentDate: "2024-12-05"
    },
    { 
      id: 5, 
      studentName: "David Brown", 
      rollNo: "2024005", 
      class: "Grade 9A", 
      totalFee: 4800, 
      paidAmount: 2400, 
      dueAmount: 2400, 
      status: "overdue", 
      dueDate: "2024-11-10",
      paymentDate: "2024-10-15"
    },
  ];

  const feeStats = {
    totalCollected: 14250000,
    totalDue: 3850000,
    collectionRate: 78.7,
    totalStudents: 2847,
    paidStudents: 2242,
    pendingStudents: 605
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = feeData.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.includes(searchTerm) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin" title="Fee Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Collected</p>
                  <p className="text-2xl font-bold text-green-600">₹{(feeStats.totalCollected / 100000).toFixed(1)}L</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+12.5%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Due</p>
                  <p className="text-2xl font-bold text-red-600">₹{(feeStats.totalDue / 100000).toFixed(1)}L</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-red-500 mr-1 rotate-180" />
                    <span className="text-xs text-red-600 font-medium">-5.2%</span>
                  </div>
                </div>
                <Calendar className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{feeStats.collectionRate}%</p>
                  <Progress value={feeStats.collectionRate} className="h-2 mt-2" />
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid Students</p>
                  <p className="text-2xl font-bold text-purple-600">{feeStats.paidStudents}</p>
                  <p className="text-xs text-gray-500 mt-1">of {feeStats.totalStudents} total</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fee Collection Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Collection Progress</CardTitle>
              <CardDescription>Track fee collection progress for the current month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">December 2024 Collection</span>
                  <span className="text-lg font-bold text-green-600">₹{(feeStats.totalCollected * 0.08 / 100000).toFixed(1)}L</span>
                </div>
                <Progress value={feeStats.collectionRate} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Target: ₹{(feeStats.totalCollected * 0.1 / 100000).toFixed(1)}L</span>
                  <span>{feeStats.collectionRate}% Complete</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common fee management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                Generate Invoices
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Set Due Dates
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Send Reminders
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Fee Records */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Fee Records</CardTitle>
              <CardDescription>Manage student fee payments and dues</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, roll number, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="2024-12">December 2024</option>
                  <option value="2024-11">November 2024</option>
                  <option value="2024-10">October 2024</option>
                </select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
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
                  {filteredData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
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
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Record Payment
                          </Button>
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

export default FeesPage;
