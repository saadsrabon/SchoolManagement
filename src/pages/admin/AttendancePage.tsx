
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Users, Calendar as CalendarIcon, Edit, Eye, Search, Filter } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AttendanceEditModal from '@/components/modals/AttendanceEditModal';
import AttendanceDetailsModal from '@/components/modals/AttendanceDetailsModal';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [viewingDetails, setViewingDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const attendanceData = [
    {
      id: 1,
      studentName: 'John Doe',
      rollNo: '2024001',
      class: 'Grade 10A',
      date: '2024-01-15',
      status: 'present',
      totalPresent: 85,
      totalAbsent: 15,
      attendancePercentage: 85
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNo: '2024002',  
      class: 'Grade 10A',
      date: '2024-01-15',
      status: 'absent',
      totalPresent: 78,
      totalAbsent: 22,
      attendancePercentage: 78
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNo: '2024003',
      class: 'Grade 11B',
      date: '2024-01-15',
      status: 'present',
      totalPresent: 92,
      totalAbsent: 8,
      attendancePercentage: 92
    }
  ];

  const classes = ['Grade 10A', 'Grade 10B', 'Grade 11A', 'Grade 11B', 'Grade 12A'];

  const filteredData = attendanceData.filter(record => {
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNo.includes(searchTerm);
    return matchesClass && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + recordsPerPage);

  const getStatusColor = (status: string) => {
    return status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleEditAttendance = (record) => {
    setEditingAttendance(record);
  };

  const handleViewDetails = (record) => {
    setViewingDetails(record);
  };

  return (
    <DashboardLayout role="admin" title="Attendance Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-gray-600">Track and manage student attendance</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Search student..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={selectedDate?.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Student attendance for selected date and class</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Attendance %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.rollNo}</TableCell>
                    <TableCell>{record.studentName}</TableCell>
                    <TableCell>{record.class}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.attendancePercentage}%</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAttendance(record)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(record)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredData.length)} of {filteredData.length} records
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

        <AttendanceEditModal
          open={!!editingAttendance}
          onClose={() => setEditingAttendance(null)}
          attendance={editingAttendance}
        />

        <AttendanceDetailsModal
          open={!!viewingDetails}
          onClose={() => setViewingDetails(null)}
          student={viewingDetails}
        />
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
