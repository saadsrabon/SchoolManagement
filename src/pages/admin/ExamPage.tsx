
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ExamForm from '@/components/forms/ExamForm';
import ExamDetailsModal from '@/components/modals/ExamDetailsModal';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

const ExamPage = () => {
  const [showExamForm, setShowExamForm] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [viewingExam, setViewingExam] = useState(null);
  const [deletingExam, setDeletingExam] = useState(null);

  const exams = [
    {
      id: 1,
      title: 'Mid-Term Mathematics',
      subject: 'Mathematics',
      class: 'Grade 10A',
      date: '2024-02-15',
      time: '09:00 AM - 11:00 AM',
      duration: '2 hours',
      totalMarks: 100,
      status: 'scheduled',
      instructor: 'John Smith',
      room: 'Room 101'
    },
    {
      id: 2,
      title: 'Physics Unit Test',
      subject: 'Physics',
      class: 'Grade 11B',
      date: '2024-02-18',
      time: '10:00 AM - 12:00 PM',
      duration: '2 hours',
      totalMarks: 80,
      status: 'scheduled',
      instructor: 'Jane Doe',
      room: 'Lab 1'
    },
    {
      id: 3,
      title: 'Final Chemistry Exam',
      subject: 'Chemistry',
      class: 'Grade 12A',
      date: '2024-02-20',
      time: '02:00 PM - 05:00 PM',
      duration: '3 hours',
      totalMarks: 150,
      status: 'completed',
      instructor: 'Mike Johnson',
      room: 'Lab 2'
    }
  ];

  const handleAddExam = () => {
    setEditingExam(null);
    setShowExamForm(true);
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setShowExamForm(true);
  };

  const handleViewExam = (exam) => {
    setViewingExam(exam);
  };

  const handleDeleteExam = (exam) => {
    setDeletingExam(exam);
  };

  const confirmDelete = () => {
    console.log('Deleting exam:', deletingExam);
    setDeletingExam(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="admin" title="Exam Schedule">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Exam Schedule Management</h1>
            <p className="text-gray-600">Schedule and manage examinations</p>
          </div>
          <Button onClick={handleAddExam}>
            <Plus className="h-4 w-4 mr-2" />
            Add Exam
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Exams</CardTitle>
            <CardDescription>All upcoming and completed examinations</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exam Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.class}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {exam.date}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {exam.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{exam.duration}</TableCell>
                    <TableCell>{exam.totalMarks}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewExam(exam)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditExam(exam)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteExam(exam)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <ExamForm
          open={showExamForm}
          onClose={() => setShowExamForm(false)}
          exam={editingExam}
        />

        <ExamDetailsModal
          open={!!viewingExam}
          onClose={() => setViewingExam(null)}
          exam={viewingExam}
        />

        <DeleteConfirmationModal
          open={!!deletingExam}
          onClose={() => setDeletingExam(null)}
          onConfirm={confirmDelete}
          title="Delete Exam"
          description={`Are you sure you want to delete the exam: ${deletingExam?.title}?`}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExamPage;
