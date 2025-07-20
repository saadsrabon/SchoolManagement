
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Award, TrendingUp, Download, Eye, Calendar, BarChart3 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ResultsPage = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedMarksheetImage, setSelectedMarksheetImage] = useState(null);

  const children = [
    {
      id: 1,
      name: "Alice Johnson",
      class: "Grade 10A",
      rollNo: "2024001"
    },
    {
      id: 2,
      name: "Bob Johnson",
      class: "Grade 8B",
      rollNo: "2024156"
    }
  ];

  const examResults = [
    {
      examId: 1,
      examName: "Mid-term Examination",
      examDate: "2024-01-15",
      examType: "Mid-term",
      totalMarks: 500,
      obtainedMarks: 427,
      percentage: 85.4,
      grade: "A",
      position: 3,
      totalStudents: 45,
      subjects: [
        { name: "Mathematics", marks: 85, total: 100, grade: "A", status: "Pass", marksheetPhoto: "math_marksheet.jpg" },
        { name: "Science", marks: 78, total: 100, grade: "B+", status: "Pass", marksheetPhoto: null },
        { name: "English", marks: 92, total: 100, grade: "A+", status: "Pass", marksheetPhoto: "english_marksheet.jpg" },
        { name: "History", marks: 75, total: 100, grade: "B", status: "Pass", marksheetPhoto: null },
        { name: "Geography", marks: 97, total: 100, grade: "A+", status: "Pass", marksheetPhoto: "geo_marksheet.jpg" }
      ]
    },
    {
      examId: 2,
      examName: "Unit Test 1",
      examDate: "2024-01-02",
      examType: "Unit Test",
      totalMarks: 300,
      obtainedMarks: 255,
      percentage: 85.0,
      grade: "A",
      position: 5,
      totalStudents: 45,
      subjects: [
        { name: "Mathematics", marks: 88, total: 100, grade: "A", status: "Pass", marksheetPhoto: null },
        { name: "Science", marks: 82, total: 100, grade: "A", status: "Pass", marksheetPhoto: "science_unit1.jpg" },
        { name: "English", marks: 85, total: 100, grade: "A", status: "Pass", marksheetPhoto: null }
      ]
    },
    {
      examId: 3,
      examName: "Final Examination",
      examDate: "2024-05-20",
      examType: "Final",
      totalMarks: 600,
      obtainedMarks: 515,
      percentage: 85.8,
      grade: "A",
      position: 2,
      totalStudents: 45,
      subjects: [
        { name: "Mathematics", marks: 87, total: 100, grade: "A", status: "Pass", marksheetPhoto: "final_math.jpg" },
        { name: "Science", marks: 85, total: 100, grade: "A", status: "Pass", marksheetPhoto: null },
        { name: "English", marks: 95, total: 100, grade: "A+", status: "Pass", marksheetPhoto: "final_english.jpg" },
        { name: "History", marks: 82, total: 100, grade: "A", status: "Pass", marksheetPhoto: null },
        { name: "Geography", marks: 91, total: 100, grade: "A+", status: "Pass", marksheetPhoto: null },
        { name: "Bengali", marks: 75, total: 100, grade: "B", status: "Pass", marksheetPhoto: "final_bengali.jpg" }
      ]
    }
  ];

  const currentChild = children[selectedChild];
  const filteredResults = selectedExam === 'all' 
    ? examResults 
    : examResults.filter(result => result.examId.toString() === selectedExam);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleDownloadResult = (examId: number) => {
    console.log(`Downloading result for exam ${examId}`);
    // Implement download functionality
  };

  const handleViewMarksheet = (photo: string) => {
    setSelectedMarksheetImage(photo);
  };

  const calculateOverallStats = () => {
    const totalExams = examResults.length;
    const avgPercentage = examResults.reduce((sum, exam) => sum + exam.percentage, 0) / totalExams;
    const bestPerformance = Math.max(...examResults.map(exam => exam.percentage));
    const improvementTrend = examResults.length > 1 
      ? examResults[examResults.length - 1].percentage - examResults[0].percentage 
      : 0;

    return { totalExams, avgPercentage, bestPerformance, improvementTrend };
  };

  const stats = calculateOverallStats();

  return (
    <DashboardLayout role="parent" title="Exam Results">
      <div className="space-y-6">
        {/* Child Selection */}
        <div className="flex space-x-2">
          {children.map((child, index) => (
            <Button
              key={child.id}
              variant={selectedChild === index ? "default" : "outline"}
              onClick={() => setSelectedChild(index)}
            >
              {child.name}
            </Button>
          ))}
        </div>

        {/* Overall Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Exams</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalExams}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(stats.avgPercentage)}`}>
                    {stats.avgPercentage.toFixed(1)}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Best Performance</p>
                  <p className="text-2xl font-bold text-green-600">{stats.bestPerformance.toFixed(1)}%</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improvement</p>
                  <p className={`text-2xl font-bold ${stats.improvementTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.improvementTrend >= 0 ? '+' : ''}{stats.improvementTrend.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exam Filter */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Exam Results for {currentChild.name}</CardTitle>
                <CardDescription>Detailed examination results and performance analysis</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Exams</SelectItem>
                    {examResults.map(exam => (
                      <SelectItem key={exam.examId} value={exam.examId.toString()}>
                        {exam.examName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredResults.map((exam) => (
                <Card key={exam.examId} className="border-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{exam.examName}</CardTitle>
                        <CardDescription className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {exam.examDate}
                          </span>
                          <Badge variant="outline">{exam.examType}</Badge>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={getGradeColor(exam.grade)} variant="secondary">
                            Grade {exam.grade}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadResult(exam.examId)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Position: {exam.position} of {exam.totalStudents}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Overall Result Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Total Marks</p>
                        <p className="text-2xl font-bold">{exam.obtainedMarks}/{exam.totalMarks}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Percentage</p>
                        <p className={`text-2xl font-bold ${getPerformanceColor(exam.percentage)}`}>
                          {exam.percentage}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Grade</p>
                        <p className="text-2xl font-bold">{exam.grade}</p>
                      </div>
                    </div>

                    {/* Subject-wise Results */}
                    <div>
                      <h4 className="font-semibold mb-3">Subject-wise Performance</h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Subject</TableHead>
                              <TableHead>Marks Obtained</TableHead>
                              <TableHead>Total Marks</TableHead>
                              <TableHead>Percentage</TableHead>
                              <TableHead>Grade</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Marksheet</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {exam.subjects.map((subject, index) => (
                              <TableRow key={index}>
                                <TableCell className="font-medium">{subject.name}</TableCell>
                                <TableCell>{subject.marks}</TableCell>
                                <TableCell>{subject.total}</TableCell>
                                <TableCell>
                                  <span className={getPerformanceColor((subject.marks / subject.total) * 100)}>
                                    {((subject.marks / subject.total) * 100).toFixed(1)}%
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <Badge className={getGradeColor(subject.grade)} variant="secondary">
                                    {subject.grade}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={subject.status === 'Pass' ? 'default' : 'destructive'}>
                                    {subject.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {subject.marksheetPhoto ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleViewMarksheet(subject.marksheetPhoto)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  ) : (
                                    <span className="text-sm text-gray-500">Not available</span>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Marksheet Photo Dialog */}
        <Dialog open={!!selectedMarksheetImage} onOpenChange={() => setSelectedMarksheetImage(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Answer Script / Marksheet</DialogTitle>
              <DialogDescription>View the uploaded marksheet photo</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              {selectedMarksheetImage && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-center text-gray-600 mb-4">Marksheet Photo: {selectedMarksheetImage}</p>
                  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Image would be displayed here</p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ResultsPage;
