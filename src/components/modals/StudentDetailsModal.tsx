
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  email: string;
  phone: string;
  guardian: string;
  status: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
}

interface StudentDetailsModalProps {
  student: Student | null;
  open: boolean;
  onClose: () => void;
}

const StudentDetailsModal = ({ student, open, onClose }: StudentDetailsModalProps) => {
  if (!student) return null;

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Student Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <Badge className={getStatusColor(student.status)}>
              {student.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Roll No:</strong> {student.rollNo}</div>
                  <div><strong>Class:</strong> {student.class}</div>
                  <div><strong>Gender:</strong> {student.gender || 'Not specified'}</div>
                  <div><strong>Date of Birth:</strong> {student.dateOfBirth || 'Not specified'}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Email:</strong> {student.email}</div>
                  <div><strong>Phone:</strong> {student.phone}</div>
                  <div><strong>Guardian:</strong> {student.guardian}</div>
                  <div><strong>Address:</strong> {student.address || 'Not specified'}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Academic Information</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Current Class:</strong>
                  <div className="mt-1">{student.class}</div>
                </div>
                <div>
                  <strong>Attendance:</strong>
                  <div className="mt-1 text-green-600">95%</div>
                </div>
                <div>
                  <strong>Performance:</strong>
                  <div className="mt-1 text-blue-600">Good</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDetailsModal;
