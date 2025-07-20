
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Filter } from 'lucide-react';

interface AttendanceDetailsModalProps {
  open: boolean;
  onClose: () => void;
  student: any;
}

const AttendanceDetailsModal = ({ open, onClose, student }: AttendanceDetailsModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState('');
  const recordsPerPage = 15;

  // Mock attendance history data
  const attendanceHistory = [
    { date: '2024-01-15', status: 'present' },
    { date: '2024-01-14', status: 'present' },
    { date: '2024-01-13', status: 'absent' },
    { date: '2024-01-12', status: 'present' },
    { date: '2024-01-11', status: 'late' },
    { date: '2024-01-10', status: 'present' },
    { date: '2024-01-09', status: 'present' },
    { date: '2024-01-08', status: 'excused' },
    { date: '2024-01-07', status: 'present' },
    { date: '2024-01-06', status: 'present' },
    { date: '2024-01-05', status: 'absent' },
    { date: '2024-01-04', status: 'present' },
    { date: '2024-01-03', status: 'present' },
    { date: '2024-01-02', status: 'present' },
    { date: '2024-01-01', status: 'present' }
  ];

  const filteredHistory = attendanceHistory.filter(record => 
    !dateFilter || record.date.includes(dateFilter)
  );

  const totalPages = Math.ceil(filteredHistory.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + recordsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'excused': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Attendance Details - {student.studentName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Summary */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{student.totalPresent}</div>
                  <div className="text-sm text-gray-600">Days Present</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{student.totalAbsent}</div>
                  <div className="text-sm text-gray-600">Days Absent</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{student.attendancePercentage}%</div>
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex space-x-4">
            <Input
              type="date"
              placeholder="Filter by date..."
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" onClick={() => setDateFilter('')}>
              Clear Filter
            </Button>
          </div>

          {/* Attendance History */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHistory.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString('en-US', { weekday: 'long' })}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredHistory.length)} of {filteredHistory.length} records
                </p>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-3 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDetailsModal;
