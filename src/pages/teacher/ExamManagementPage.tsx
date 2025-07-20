import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Plus, Upload, Edit, Save, Search, Filter, Camera } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';

const ExamManagementPage = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);

  const [examForm, setExamForm] = useState({
    name: '',
    category: '',
    totalMarks: '',
    subjects: [],
    classes: [],
    date: '',
    description: ''
  });

  const exams = [
    {
      id: 1,
      name: "Mid-term Examination",
      category: "Mid-term",
      date: "2024-02-15",
      subjects: ["Mathematics", "Science", "English"],
      classes: ["Grade 10A", "Grade 10B"],
      totalMarks: 100,
      status: "Active"
    },
    {
      id: 2,
      name: "Final Examination",
      category: "Final",
      date: "2024-05-20",
      subjects: ["Mathematics", "Science", "English", "History"],
      classes: ["Grade 10A", "Grade 10B", "Grade 9A"],
      totalMarks: 100,
      status: "Scheduled"
    }
  ];

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      rollNo: "2024001",
      class: "Grade 10A",
      marks: {
        Mathematics: 85,
        Science: 78,
        English: 92
      },
      photos: {
        Mathematics: null,
        Science: "photo1.jpg",
        English: null
      }
    },
    {
      id: 2,
      name: "Bob Smith",
      rollNo: "2024002",
      class: "Grade 10A",
      marks: {
        Mathematics: 78,
        Science: 85,
        English: 88
      },
      photos: {
        Mathematics: "photo2.jpg",
        Science: null,
        English: null
      }
    },
    {
      id: 3,
      name: "Carol Davis",
      rollNo: "2024003",
      class: "Grade 10A",
      marks: {
        Mathematics: 92,
        Science: 89,
        English: 85
      },
      photos: {
        Mathematics: null,
        Science: null,
        English: "photo3.jpg"
      }
    }
  ];

  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
  const classes = ["Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B", "Grade 11A"];
  const examCategories = ["Mid-term", "Final", "Unit Test", "Monthly Test", "Quiz"];

  const handleCreateExam = () => {
    if (!examForm.name || !examForm.category || !examForm.totalMarks) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    toast.success('Exam created successfully!');
    setIsCreateExamOpen(false);
    setExamForm({
      name: '',
      category: '',
      totalMarks: '',
      subjects: [],
      classes: [],
      date: '',
      description: ''
    });
  };

  const handleMarkUpdate = (studentId: number, subject: string, marks: number) => {
    toast.success(`Marks updated for ${subject}: ${marks}`);
    console.log(`Updated marks for student ${studentId}, subject ${subject}: ${marks}`);
  };

  const handlePhotoUpload = (studentId: number, subject: string) => {
    toast.success(`Photo uploaded for ${subject}`);
    console.log(`Photo uploaded for student ${studentId}, subject ${subject}`);
  };

  const filteredStudents = students.filter(student => 
    (selectedClass === '' || student.class === selectedClass) &&
    (searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     student.rollNo.includes(searchTerm))
  );

  const getSubjectsForExam = (examId: number) => {
    const exam = exams.find(e => e.id === examId);
    return exam ? exam.subjects : [];
  };

  return (
    <DashboardLayout role="teacher" title="Exam Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Exams</p>
                  <p className="text-2xl font-bold text-gray-900">{exams.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Exams</p>
                  <p className="text-2xl font-bold text-green-600">
                    {exams.filter(e => e.status === 'Active').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Students</p>
                  <p className="text-2xl font-bold text-purple-600">{students.length}</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Subjects</p>
                  <p className="text-2xl font-bold text-orange-600">{subjects.length}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage">Manage Exams</TabsTrigger>
            <TabsTrigger value="marks">Input Marks</TabsTrigger>
            <TabsTrigger value="results">View Results</TabsTrigger>
          </TabsList>

          {/* Manage Exams Tab */}
          <TabsContent value="manage" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Exam Management</CardTitle>
                    <CardDescription>Create and manage examinations</CardDescription>
                  </div>
                  <Dialog open={isCreateExamOpen} onOpenChange={setIsCreateExamOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Exam
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Create New Exam</DialogTitle>
                        <DialogDescription>Set up a new examination with subjects and classes</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="examName">Exam Name</Label>
                            <Input
                              id="examName"
                              placeholder="e.g., Mid-term Examination"
                              value={examForm.name}
                              onChange={(e) => setExamForm({...examForm, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={examForm.category} onValueChange={(value) => setExamForm({...examForm, category: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {examCategories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="totalMarks">Total Marks</Label>
                            <Input
                              id="totalMarks"
                              type="number"
                              placeholder="100"
                              value={examForm.totalMarks}
                              onChange={(e) => setExamForm({...examForm, totalMarks: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="examDate">Exam Date</Label>
                            <Input
                              id="examDate"
                              type="date"
                              value={examForm.date}
                              onChange={(e) => setExamForm({...examForm, date: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Subjects (Select multiple)</Label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {subjects.map(subject => (
                              <label key={subject} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={examForm.subjects.includes(subject)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setExamForm({...examForm, subjects: [...examForm.subjects, subject]});
                                    } else {
                                      setExamForm({...examForm, subjects: examForm.subjects.filter(s => s !== subject)});
                                    }
                                  }}
                                />
                                <span className="text-sm">{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Classes (Select multiple)</Label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {classes.map(cls => (
                              <label key={cls} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={examForm.classes.includes(cls)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setExamForm({...examForm, classes: [...examForm.classes, cls]});
                                    } else {
                                      setExamForm({...examForm, classes: examForm.classes.filter(c => c !== cls)});
                                    }
                                  }}
                                />
                                <span className="text-sm">{cls}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Textarea
                            id="description"
                            placeholder="Exam instructions or notes..."
                            value={examForm.description}
                            onChange={(e) => setExamForm({...examForm, description: e.target.value})}
                          />
                        </div>
                        <Button onClick={handleCreateExam} className="w-full">
                          Create Exam
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Exam Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Subjects</TableHead>
                        <TableHead>Classes</TableHead>
                        <TableHead>Total Marks</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">{exam.name}</TableCell>
                          <TableCell>{exam.category}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>{exam.subjects.join(', ')}</TableCell>
                          <TableCell>{exam.classes.join(', ')}</TableCell>
                          <TableCell>{exam.totalMarks}</TableCell>
                          <TableCell>
                            <Badge variant={exam.status === 'Active' ? 'default' : 'secondary'}>
                              {exam.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
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
          </TabsContent>

          {/* Input Marks Tab */}
          <TabsContent value="marks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Input Student Marks</CardTitle>
                <CardDescription>Enter marks for students by exam and subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map(exam => (
                        <SelectItem key={exam.id} value={exam.id.toString()}>{exam.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedExam && getSubjectsForExam(parseInt(selectedExam)).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Marks Input Table */}
                {selectedExam && selectedSubject && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Class</TableHead>
                          <TableHead>Marks ({selectedSubject})</TableHead>
                          <TableHead>Upload Photo</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.rollNo}</TableCell>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                min="0"
                                max="100"
                                className="w-20"
                                defaultValue={student.marks[selectedSubject] || ''}
                                onChange={(e) => handleMarkUpdate(student.id, selectedSubject, parseInt(e.target.value))}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePhotoUpload(student.id, selectedSubject)}
                                >
                                  <Camera className="h-4 w-4" />
                                </Button>
                                {student.photos[selectedSubject] && (
                                  <Badge variant="secondary">Photo uploaded</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleMarkUpdate(student.id, selectedSubject, student.marks[selectedSubject] || 0)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* View Results Tab */}
          <TabsContent value="results" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exam Results Overview</CardTitle>
                <CardDescription>View and analyze exam results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map(exam => (
                        <SelectItem key={exam.id} value={exam.id.toString()}>{exam.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Classes</SelectItem>
                      {classes.map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedExam && (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Roll No</TableHead>
                          <TableHead>Student Name</TableHead>
                          <TableHead>Class</TableHead>
                          {getSubjectsForExam(parseInt(selectedExam)).map(subject => (
                            <TableHead key={subject}>{subject}</TableHead>
                          ))}
                          <TableHead>Total</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => {
                          const examSubjects = getSubjectsForExam(parseInt(selectedExam));
                          const totalMarks = examSubjects.reduce((sum, subject) => sum + (student.marks[subject] || 0), 0);
                          const percentage = ((totalMarks / (examSubjects.length * 100)) * 100).toFixed(1);
                          const percentageNum = parseFloat(percentage);
                          
                          return (
                            <TableRow key={student.id}>
                              <TableCell>{student.rollNo}</TableCell>
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.class}</TableCell>
                              {examSubjects.map(subject => (
                                <TableCell key={subject}>
                                  {student.marks[subject] || '-'}
                                </TableCell>
                              ))}
                              <TableCell className="font-bold">{totalMarks}</TableCell>
                              <TableCell>
                                <Badge variant={percentageNum >= 80 ? 'default' : percentageNum >= 60 ? 'secondary' : 'destructive'}>
                                  {percentage}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ExamManagementPage;
