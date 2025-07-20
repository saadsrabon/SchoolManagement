
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Subject {
  id: number;
  name: string;
  code: string;
  class: string;
  teacher: string;
  credits: number;
  description?: string;
}

const SubjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const [subjects, setSubjects] = useState<Subject[]>([
    { 
      id: 1, 
      name: "Mathematics", 
      code: "MATH-10A-001", 
      class: "Grade 10A", 
      teacher: "Dr. Sarah Wilson", 
      credits: 4,
      description: "Advanced mathematics for grade 10"
    },
    { 
      id: 2, 
      name: "Mathematics", 
      code: "MATH-10B-001", 
      class: "Grade 10B", 
      teacher: "Dr. Sarah Wilson", 
      credits: 4,
      description: "Advanced mathematics for grade 10"
    },
    { 
      id: 3, 
      name: "English", 
      code: "ENG-10A-001", 
      class: "Grade 10A", 
      teacher: "Prof. Michael Brown", 
      credits: 3,
      description: "English literature and grammar"
    },
    { 
      id: 4, 
      name: "Science", 
      code: "SCI-9A-001", 
      class: "Grade 9A", 
      teacher: "Ms. Emily Davis", 
      credits: 4,
      description: "General science concepts"
    },
  ]);

  const [formData, setFormData] = useState<Omit<Subject, 'id'>>({
    name: '',
    code: '',
    class: '',
    teacher: '',
    credits: 1,
    description: ''
  });

  const classes = ["Grade 8A", "Grade 9A", "Grade 9B", "Grade 10A", "Grade 10B", "Grade 11A"];
  const teachers = ["Dr. Sarah Wilson", "Prof. Michael Brown", "Ms. Emily Davis", "Mr. David Wilson", "Mrs. Lisa Anderson"];
  const subjectNames = ["Mathematics", "English", "Science", "Physics", "Chemistry", "Biology", "History", "Geography", "Art", "Music", "PE"];

  const handleAddSubject = () => {
    if (formData.name && formData.class && formData.teacher) {
      const newSubject: Subject = {
        ...formData,
        id: Date.now(),
        code: generateSubjectCode(formData.name, formData.class)
      };
      setSubjects([...subjects, newSubject]);
      resetForm();
      setShowAddModal(false);
    }
  };

  const handleEditSubject = () => {
    if (selectedSubject && formData.name && formData.class && formData.teacher) {
      const updatedSubject = {
        ...selectedSubject,
        ...formData,
        code: generateSubjectCode(formData.name, formData.class)
      };
      setSubjects(subjects.map(s => s.id === selectedSubject.id ? updatedSubject : s));
      resetForm();
      setShowEditModal(false);
      setSelectedSubject(null);
    }
  };

  const handleDeleteSubject = (id: number) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const generateSubjectCode = (name: string, className: string) => {
    const subjectCode = name.substring(0, 3).toUpperCase();
    const classCode = className.replace(' ', '-');
    const timestamp = Date.now().toString().slice(-3);
    return `${subjectCode}-${classCode}-${timestamp}`;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      class: '',
      teacher: '',
      credits: 1,
      description: ''
    });
  };

  const openEditModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      class: subject.class,
      teacher: subject.teacher,
      credits: subject.credits,
      description: subject.description || ''
    });
    setShowEditModal(true);
  };

  const filteredSubjects = subjects.filter(subject => 
    (selectedClass === 'all' || subject.class === selectedClass) &&
    (subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
     subject.teacher.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const subjectStats = {
    totalSubjects: subjects.length,
    totalClasses: new Set(subjects.map(s => s.class)).size,
    totalTeachers: new Set(subjects.map(s => s.teacher)).size,
    averageCredits: subjects.reduce((acc, s) => acc + s.credits, 0) / subjects.length
  };

  return (
    <DashboardLayout role="admin" title="Subject Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-gray-900">{subjectStats.totalSubjects}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Classes Covered</p>
                  <p className="text-2xl font-bold text-green-600">{subjectStats.totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Teachers Assigned</p>
                  <p className="text-2xl font-bold text-purple-600">{subjectStats.totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Credits</p>
                  <p className="text-2xl font-bold text-orange-600">{subjectStats.averageCredits.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Management */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Subject Management</CardTitle>
                <CardDescription>Manage subjects and their assignments to classes</CardDescription>
              </div>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>
              <select 
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="all">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Code</TableHead>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.code}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{subject.class}</Badge>
                      </TableCell>
                      <TableCell>{subject.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{subject.credits} credits</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(subject)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleDeleteSubject(subject.id)}
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

        {/* Add Subject Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subjectName">Subject Name</Label>
                <select
                  id="subjectName"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjectNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="class">Class</Label>
                <select
                  id="class"
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="teacher">Teacher</Label>
                <select
                  id="teacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Optional description"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddSubject}>
                  Add Subject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Subject Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Subject</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="editSubjectName">Subject Name</Label>
                <select
                  id="editSubjectName"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Subject</option>
                  {subjectNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="editClass">Class</Label>
                <select
                  id="editClass"
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="editTeacher">Teacher</Label>
                <select
                  id="editTeacher"
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="editCredits">Credits</Label>
                <Input
                  id="editCredits"
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <Label htmlFor="editDescription">Description</Label>
                <Input
                  id="editDescription"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Optional description"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSubject}>
                  Update Subject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default SubjectsPage;
