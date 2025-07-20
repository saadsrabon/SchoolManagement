import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { BookOpen, Users, GraduationCap, Plus, Edit, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClassForm from '@/components/forms/ClassForm';
import ClassStudentsModal from '@/components/modals/ClassStudentsModal';

interface Class {
  id: number;
  className: string;
  classTeacher: string;
  totalStudents: number;
  subjects: string[];
  room: string;
  capacity?: number;
  section?: string;
}

const ClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStudentsModal, setShowStudentsModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  const [classes, setClasses] = useState<Class[]>([
    { 
      id: 1, 
      className: "Grade 10A", 
      classTeacher: "Mrs. Sarah Johnson", 
      totalStudents: 35, 
      subjects: ["Math", "Science", "English", "History"], 
      room: "Room 101",
      capacity: 40,
      section: "A"
    },
    { 
      id: 2, 
      className: "Grade 10B", 
      classTeacher: "Mr. David Wilson", 
      totalStudents: 32, 
      subjects: ["Math", "Science", "English", "Geography"], 
      room: "Room 102"
    },
    { 
      id: 3, 
      className: "Grade 9A", 
      classTeacher: "Ms. Emily Davis", 
      totalStudents: 38, 
      subjects: ["Math", "Science", "English", "Art"], 
      room: "Room 201"
    },
    { 
      id: 4, 
      className: "Grade 9B", 
      classTeacher: "Mr. Michael Brown", 
      totalStudents: 36, 
      subjects: ["Math", "Science", "English", "Music"], 
      room: "Room 202"
    },
    { 
      id: 5, 
      className: "Grade 8A", 
      classTeacher: "Mrs. Lisa Anderson", 
      totalStudents: 40, 
      subjects: ["Math", "Science", "English", "PE"], 
      room: "Room 301"
    },
  ]);

  const classStats = {
    totalClasses: 84,
    totalStudents: 2847,
    totalTeachers: 156,
    averageClassSize: 34
  };

  const handleAddClass = (classData: Class) => {
    const newClass = { ...classData, id: Date.now() };
    setClasses([...classes, newClass]);
    setShowAddModal(false);
  };

  const handleEditClass = (classData: Class) => {
    if (selectedClass) {
      const updatedClass = { ...classData, id: selectedClass.id };
      setClasses(classes.map(c => c.id === selectedClass.id ? updatedClass : c));
      setShowEditModal(false);
      setSelectedClass(null);
    }
  };

  const handleDeleteClass = () => {
    if (selectedClass) {
      setClasses(classes.filter(c => c.id !== selectedClass.id));
      setShowDeleteDialog(false);
      setSelectedClass(null);
    }
  };

  const openEditModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowEditModal(true);
  };

  const openDeleteDialog = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowDeleteDialog(true);
  };

  const openStudentsModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowStudentsModal(true);
  };

  const filteredClasses = classes.filter(classItem => 
    classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin" title="Class Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Classes</p>
                  <p className="text-2xl font-bold text-gray-900">{classStats.totalClasses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-green-600">{classStats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-purple-600">{classStats.totalTeachers}</p>
                </div>
                <GraduationCap className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Class Size</p>
                  <p className="text-2xl font-bold text-orange-600">{classStats.averageClassSize}</p>
                </div>
                <Users className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Manage classes, sections, and assignments</CardDescription>
            </div>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Class
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search classes or teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class Name</TableHead>
                    <TableHead>Class Teacher</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Subjects</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClasses.map((classItem) => (
                    <TableRow key={classItem.id}>
                      <TableCell className="font-medium">{classItem.className}</TableCell>
                      <TableCell>{classItem.classTeacher}</TableCell>
                      <TableCell>{classItem.room}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {classItem.totalStudents} students
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {classItem.subjects.slice(0, 2).map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                          {classItem.subjects.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{classItem.subjects.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(classItem)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openStudentsModal(classItem)}
                            title="View Students"
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => openDeleteDialog(classItem)}
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

        {/* Add Class Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <ClassForm
              onSubmit={handleAddClass}
              onCancel={() => setShowAddModal(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Class Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
            </DialogHeader>
            <ClassForm
              classData={selectedClass}
              onSubmit={handleEditClass}
              onCancel={() => setShowEditModal(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Class Students Modal */}
        <ClassStudentsModal
          className={selectedClass?.className || ''}
          open={showStudentsModal}
          onClose={() => setShowStudentsModal(false)}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Class</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedClass?.className}? This action cannot be undone and will affect all students in this class.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteClass} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default ClassesPage;
