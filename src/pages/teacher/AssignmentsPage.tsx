
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, Users, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AssignmentForm from '@/components/forms/AssignmentForm';
import AssignmentDetailsModal from '@/components/modals/AssignmentDetailsModal';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

const AssignmentsPage = () => {
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [viewingAssignment, setViewingAssignment] = useState(null);
  const [deletingAssignment, setDeletingAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: 'Quadratic Equations Problem Set',
      subject: 'Mathematics',
      class: 'Grade 10A',
      dueDate: '2024-02-20',
      assignedDate: '2024-02-10',
      totalMarks: 50,
      status: 'active',
      submittedCount: 25,
      totalStudents: 30,
      description: 'Solve the given quadratic equations using different methods'
    },
    {
      id: 2,
      title: 'Newton\'s Laws Essay',
      subject: 'Physics',
      class: 'Grade 11B',
      dueDate: '2024-02-25',
      assignedDate: '2024-02-15',
      totalMarks: 100,
      status: 'active',
      submittedCount: 18,
      totalStudents: 28,
      description: 'Write a comprehensive essay on Newton\'s three laws of motion'
    },
    {
      id: 3,
      title: 'Chemical Bonding Lab Report',
      subject: 'Chemistry',
      class: 'Grade 12A',
      dueDate: '2024-02-15',
      assignedDate: '2024-02-05',
      totalMarks: 75,
      status: 'completed',
      submittedCount: 32,
      totalStudents: 32,
      description: 'Submit a detailed lab report on chemical bonding experiments'
    }
  ];

  const handleCreateAssignment = () => {
    setEditingAssignment(null);
    setShowAssignmentForm(true);
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setShowAssignmentForm(true);
  };

  const handleViewAssignment = (assignment) => {
    setViewingAssignment(assignment);
  };

  const handleDeleteAssignment = (assignment) => {
    setDeletingAssignment(assignment);
  };

  const confirmDelete = () => {
    console.log('Deleting assignment:', deletingAssignment);
    setDeletingAssignment(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout role="teacher" title="Assignment Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Assignment Management</h1>
            <p className="text-gray-600">Create and manage student assignments</p>
          </div>
          <Button onClick={handleCreateAssignment}>
            <Plus className="h-4 w-4 mr-2" />
            Create Assignment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                  <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">
                    {assignments.filter(a => a.status === 'active').length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {assignments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Submissions</p>
                  <p className="text-2xl font-bold text-purple-600">85%</p>
                </div>
                <FileText className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Assignments</CardTitle>
            <CardDescription>Manage your class assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment Title</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Total Marks</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-500">{assignment.subject}</div>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.class}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{assignment.submittedCount}/{assignment.totalStudents}</div>
                        <div className="text-gray-500">
                          {Math.round((assignment.submittedCount / assignment.totalStudents) * 100)}% submitted
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{assignment.totalMarks}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewAssignment(assignment)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAssignment(assignment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAssignment(assignment)}
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

        <AssignmentForm
          open={showAssignmentForm}
          onClose={() => setShowAssignmentForm(false)}
          assignment={editingAssignment}
        />

        <AssignmentDetailsModal
          open={!!viewingAssignment}
          onClose={() => setViewingAssignment(null)}
          assignment={viewingAssignment}
        />

        <DeleteConfirmationModal
          open={!!deletingAssignment}
          onClose={() => setDeletingAssignment(null)}
          onConfirm={confirmDelete}
          title="Delete Assignment"
          description={`Are you sure you want to delete the assignment: ${deletingAssignment?.title}?`}
        />
      </div>
    </DashboardLayout>
  );
};

export default AssignmentsPage;
