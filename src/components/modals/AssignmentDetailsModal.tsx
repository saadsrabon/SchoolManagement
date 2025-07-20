
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, FileText, Users, Target, Clock, Download } from 'lucide-react';

interface AssignmentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  assignment: any;
}

const AssignmentDetailsModal = ({ open, onClose, assignment }: AssignmentDetailsModalProps) => {
  if (!assignment) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mock submission data
  const submissions = [
    { id: 1, studentName: 'John Doe', rollNo: '2024001', submittedDate: '2024-02-18', status: 'submitted', grade: null },
    { id: 2, studentName: 'Jane Smith', rollNo: '2024002', submittedDate: '2024-02-19', status: 'graded', grade: 45 },
    { id: 3, studentName: 'Mike Johnson', rollNo: '2024003', submittedDate: null, status: 'pending', grade: null }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assignment Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{assignment.title}</h3>
            <Badge className={getStatusColor(assignment.status)}>
              {assignment.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Assignment Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Subject:</strong> <span className="ml-2">{assignment.subject}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Class:</strong> <span className="ml-2">{assignment.class}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Total Marks:</strong> <span className="ml-2">{assignment.totalMarks}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Assigned:</strong> <span className="ml-2">{assignment.assignedDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Due Date:</strong> <span className="ml-2">{assignment.dueDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Submission Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{assignment.submittedCount}</div>
                    <div className="text-sm text-gray-600">Submitted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{assignment.totalStudents - assignment.submittedCount}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{Math.round((assignment.submittedCount / assignment.totalStudents) * 100)}%</div>
                    <div className="text-sm text-gray-600">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-600">Graded</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Description</h4>
              <p className="text-sm text-gray-600">{assignment.description}</p>
            </CardContent>
          </Card>

          {assignment.instructions && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Instructions</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{assignment.instructions}</p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Student Submissions</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.rollNo}</TableCell>
                      <TableCell>{submission.studentName}</TableCell>
                      <TableCell>{submission.submittedDate || 'Not submitted'}</TableCell>
                      <TableCell>
                        <Badge variant={submission.status === 'graded' ? 'default' : submission.status === 'submitted' ? 'secondary' : 'destructive'}>
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {submission.grade ? `${submission.grade}/${assignment.totalMarks}` : '-'}
                      </TableCell>
                      <TableCell>
                        {submission.status === 'submitted' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDetailsModal;
