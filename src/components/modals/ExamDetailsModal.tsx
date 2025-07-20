
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, MapPin, FileText, Target } from 'lucide-react';

interface ExamDetailsModalProps {
  open: boolean;
  onClose: () => void;
  exam: any;
}

const ExamDetailsModal = ({ open, onClose, exam }: ExamDetailsModalProps) => {
  if (!exam) return null;

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Exam Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{exam.title}</h3>
            <Badge className={getStatusColor(exam.status)}>
              {exam.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Subject:</strong> <span className="ml-2">{exam.subject}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Class:</strong> <span className="ml-2">{exam.class}</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Total Marks:</strong> <span className="ml-2">{exam.totalMarks}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Duration:</strong> <span className="ml-2">{exam.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Schedule & Location</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Date:</strong> <span className="ml-2">{exam.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Time:</strong> <span className="ml-2">{exam.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Room:</strong> <span className="ml-2">{exam.room}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <strong>Instructor:</strong> <span className="ml-2">{exam.instructor}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {exam.instructions && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Exam Instructions</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {exam.instructions || "No specific instructions provided."}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Exam Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">45</div>
                  <div className="text-sm text-gray-600">Registered Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">42</div>
                  <div className="text-sm text-gray-600">Submitted Papers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">85%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDetailsModal;
