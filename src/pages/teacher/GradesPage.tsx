
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit, Save, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const GradesPage = () => {
  const [selectedClass, setSelectedClass] = useState('Grade 10A');
  const [selectedExam, setSelectedExam] = useState('Mid-term');
  const [searchTerm, setSearchTerm] = useState('');

  const studentGrades = [
    {
      id: 1,
      rollNo: "2024001",
      name: "John Doe",
      marks: 85,
      totalMarks: 100,
      grade: "A",
      status: "submitted"
    },
    {
      id: 2,
      rollNo: "2024002",
      name: "Jane Smith",
      marks: 92,
      totalMarks: 100,
      grade: "A+",
      status: "submitted"
    },
    {
      id: 3,
      rollNo: "2024003",
      name: "Mike Johnson",
      marks: 78,
      totalMarks: 100,
      grade: "B+",
      status: "pending"
    },
    {
      id: 4,
      rollNo: "2024004",
      name: "Sarah Wilson",
      marks: 95,
      totalMarks: 100,
      grade: "A+",
      status: "submitted"
    }
  ];

  const gradeStats = {
    totalStudents: studentGrades.length,
    averageMarks: studentGrades.reduce((sum, student) => sum + student.marks, 0) / studentGrades.length,
    highestMarks: Math.max(...studentGrades.map(s => s.marks)),
    lowestMarks: Math.min(...studentGrades.map(s => s.marks))
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const filteredData = studentGrades.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="teacher" title="Grade Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{gradeStats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Marks</p>
                  <p className="text-2xl font-bold text-blue-600">{gradeStats.averageMarks.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Highest Marks</p>
                  <p className="text-2xl font-bold text-green-600">{gradeStats.highestMarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Lowest Marks</p>
                  <p className="text-2xl font-bold text-red-600">{gradeStats.lowestMarks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Grade Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Student Grades</CardTitle>
                <CardDescription>Manage and update student grades</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Grades
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="Grade 10A">Grade 10A</option>
                <option value="Grade 11B">Grade 11B</option>
                <option value="Grade 9A">Grade 9A</option>
              </select>
              
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="Mid-term">Mid-term Exam</option>
                <option value="Final">Final Exam</option>
                <option value="Unit Test">Unit Test</option>
              </select>
              
              <div className="flex-1">
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Marks Obtained</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          defaultValue={student.marks} 
                          className="w-20 h-8"
                          max={student.totalMarks}
                        />
                      </TableCell>
                      <TableCell>{student.totalMarks}</TableCell>
                      <TableCell>{((student.marks / student.totalMarks) * 100).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(student.grade)}>
                          {student.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
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

export default GradesPage;
