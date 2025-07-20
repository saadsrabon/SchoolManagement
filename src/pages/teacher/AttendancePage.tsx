
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, CheckCircle, XCircle, Clock, Save } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  
  const [attendance, setAttendance] = useState([
    { id: 1, rollNo: "2024001", name: "John Doe", status: "present" },
    { id: 2, rollNo: "2024002", name: "Jane Smith", status: "present" },
    { id: 3, rollNo: "2024003", name: "Mike Johnson", status: "absent" },
    { id: 4, rollNo: "2024004", name: "Sarah Wilson", status: "present" },
    { id: 5, rollNo: "2024005", name: "David Brown", status: "late" },
    { id: 6, rollNo: "2024006", name: "Emma Davis", status: "present" }
  ]);

  const attendanceStats = {
    totalStudents: attendance.length,
    presentStudents: attendance.filter(s => s.status === 'present').length,
    absentStudents: attendance.filter(s => s.status === 'absent').length,
    lateStudents: attendance.filter(s => s.status === 'late').length
  };

  const handleAttendanceChange = (studentId: number, status: string) => {
    setAttendance(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout role="teacher" title="Attendance Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Present</p>
                  <p className="text-2xl font-bold text-green-600">{attendanceStats.presentStudents}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Absent</p>
                  <p className="text-2xl font-bold text-red-600">{attendanceStats.absentStudents}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Late</p>
                  <p className="text-2xl font-bold text-yellow-600">{attendanceStats.lateStudents}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Attendance Marking */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Mark Attendance</CardTitle>
                  <CardDescription>
                    {selectedClass} - {selectedDate?.toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <select 
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="Grade 10A">Grade 10A</option>
                    <option value="Grade 11B">Grade 11B</option>
                    <option value="Grade 9A">Grade 9A</option>
                  </select>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNo}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(student.status)}
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant={student.status === 'present' ? 'default' : 'outline'}
                              onClick={() => handleAttendanceChange(student.id, 'present')}
                            >
                              P
                            </Button>
                            <Button 
                              size="sm" 
                              variant={student.status === 'absent' ? 'destructive' : 'outline'}
                              onClick={() => handleAttendanceChange(student.id, 'absent')}
                            >
                              A
                            </Button>
                            <Button 
                              size="sm" 
                              variant={student.status === 'late' ? 'default' : 'outline'}
                              onClick={() => handleAttendanceChange(student.id, 'late')}
                            >
                              L
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

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose date for attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
