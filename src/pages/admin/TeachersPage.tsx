import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Eye, Download } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TeacherForm from '@/components/forms/TeacherForm';
import TeacherDetailsModal from '@/components/modals/TeacherDetailsModal';

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

const TeachersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [teachers, setTeachers] = useState<Teacher[]>([
    { 
      id: 1, 
      name: "Dr. Sarah Wilson", 
      employeeId: "EMP001",
      department: "Mathematics", 
      email: "sarah.wilson@school.com",
      phone: "+1234567890",
      experience: "8 years",
      status: "active",
      classes: ["Grade 10A", "Grade 11B"],
      qualification: "PhD in Mathematics",
      address: "456 Oak Street",
      dateOfJoining: "2016-08-15",
      salary: "75000"
    },
    { 
      id: 2, 
      name: "Prof. Michael Brown", 
      employeeId: "EMP002",
      department: "English", 
      email: "michael.brown@school.com",
      phone: "+1234567891",
      experience: "12 years",
      status: "active",
      classes: ["Grade 9A", "Grade 10B"]
    },
    { 
      id: 3, 
      name: "Ms. Emily Davis", 
      employeeId: "EMP003",
      department: "Science", 
      email: "emily.davis@school.com",
      phone: "+1234567892",
      experience: "5 years",
      status: "on_leave",
      classes: ["Grade 8A", "Grade 9B"]
    },
  ]);

  const teacherStats = {
    totalTeachers: 156,
    activeTeachers: 142,
    onLeave: 8,
    newHires: 6
  };

  const handleAddTeacher = (teacherData: Teacher) => {
    const newTeacher = { ...teacherData, id: Date.now() };
    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
  };

  const handleEditTeacher = (teacherData: Teacher) => {
    if (selectedTeacher) {
      const updatedTeacher = { ...teacherData, id: selectedTeacher.id };
      setTeachers(teachers.map(t => t.id === selectedTeacher.id ? updatedTeacher : t));
      setShowEditModal(false);
      setSelectedTeacher(null);
    }
  };

  const handleDeleteTeacher = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter(t => t.id !== selectedTeacher.id));
      setShowDeleteDialog(false);
      setSelectedTeacher(null);
    }
  };

  const openEditModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteDialog(true);
  };

  const openDetailsModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = teachers.filter(teacher => 
    (selectedDepartment === 'all' || teacher.department === selectedDepartment) &&
    (teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardLayout role="admin" title="Teacher Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-gray-900">{teacherStats.totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Teachers</p>
                  <p className="text-2xl font-bold text-green-600">{teacherStats.activeTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Leave</p>
                  <p className="text-2xl font-bold text-yellow-600">{teacherStats.onLeave}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Hires</p>
                  <p className="text-2xl font-bold text-blue-600">{teacherStats.newHires}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Teaching Staff</CardTitle>
                <CardDescription>Manage teacher information and assignments</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={() => setShowAddModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Teacher
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
              </select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell className="font-medium">{teacher.employeeId}</TableCell>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>{teacher.experience}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.classes.map((cls, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(teacher.status)}>
                          {teacher.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDetailsModal(teacher)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(teacher)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => openDeleteDialog(teacher)}
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Add Teacher Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Teacher</DialogTitle>
            </DialogHeader>
            <TeacherForm
              onSubmit={handleAddTeacher}
              onCancel={() => setShowAddModal(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Teacher Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Teacher</DialogTitle>
            </DialogHeader>
            <TeacherForm
              teacher={selectedTeacher}
              onSubmit={handleEditTeacher}
              onCancel={() => setShowEditModal(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Teacher Details Modal */}
        <TeacherDetailsModal
          teacher={selectedTeacher}
          open={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedTeacher?.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteTeacher} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default TeachersPage;
