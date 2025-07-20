
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Teacher {
  id: number;
  name: string;
  employeeId: string;
  department: string;
  email: string;
  phone: string;
  experience: string;
  status: string;
  classes: string[];
  qualification?: string;
  address?: string;
  dateOfJoining?: string;
  salary?: string;
}

interface TeacherDetailsModalProps {
  teacher: Teacher | null;
  open: boolean;
  onClose: () => void;
}

const TeacherDetailsModal = ({ teacher, open, onClose }: TeacherDetailsModalProps) => {
  if (!teacher) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Teacher Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{teacher.name}</h3>
            <Badge className={getStatusColor(teacher.status)}>
              {teacher.status.replace('_', ' ')}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Employee ID:</strong> {teacher.employeeId}</div>
                  <div><strong>Department:</strong> {teacher.department}</div>
                  <div><strong>Qualification:</strong> {teacher.qualification || 'Not specified'}</div>
                  <div><strong>Experience:</strong> {teacher.experience}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Email:</strong> {teacher.email}</div>
                  <div><strong>Phone:</strong> {teacher.phone}</div>
                  <div><strong>Address:</strong> {teacher.address || 'Not specified'}</div>
                  <div><strong>Date of Joining:</strong> {teacher.dateOfJoining || 'Not specified'}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Teaching Assignment</h4>
              <div className="space-y-2">
                <div>
                  <strong>Assigned Classes:</strong>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teacher.classes.map((cls, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cls}
                      </Badge>
                    ))}
                  </div>
                </div>
                {teacher.salary && (
                  <div className="mt-3">
                    <strong>Salary:</strong> ${teacher.salary}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeacherDetailsModal;
