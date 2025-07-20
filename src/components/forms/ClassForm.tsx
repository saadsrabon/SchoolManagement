
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Class {
  id?: number;
  className: string;
  classTeacher: string;
  room: string;
  totalStudents: number;
  subjects: string[];
  capacity?: number;
  section?: string;
}

interface ClassFormProps {
  classData?: Class;
  onSubmit: (classData: Class) => void;
  onCancel: () => void;
}

const ClassForm = ({ classData, onSubmit, onCancel }: ClassFormProps) => {
  const [formData, setFormData] = useState<Class>({
    className: classData?.className || '',
    classTeacher: classData?.classTeacher || '',
    room: classData?.room || '',
    totalStudents: classData?.totalStudents || 0,
    subjects: classData?.subjects || [],
    capacity: classData?.capacity || 40,
    section: classData?.section || 'A',
    ...(classData?.id && { id: classData.id })
  });

  const availableSubjects = [
    'Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 
    'Biology', 'History', 'Geography', 'Art', 'Music', 'PE'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof Class, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = (subject: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ 
        ...prev, 
        subjects: [...prev.subjects, subject] 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        subjects: prev.subjects.filter(s => s !== subject) 
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="className">Class Name</Label>
          <Input
            id="className"
            value={formData.className}
            onChange={(e) => handleChange('className', e.target.value)}
            placeholder="e.g., Grade 10A"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="section">Section</Label>
          <select
            id="section"
            value={formData.section}
            onChange={(e) => handleChange('section', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="classTeacher">Class Teacher</Label>
          <select
            id="classTeacher"
            value={formData.classTeacher}
            onChange={(e) => handleChange('classTeacher', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Teacher</option>
            <option value="Mrs. Sarah Johnson">Mrs. Sarah Johnson</option>
            <option value="Mr. David Wilson">Mr. David Wilson</option>
            <option value="Ms. Emily Davis">Ms. Emily Davis</option>
            <option value="Mr. Michael Brown">Mr. Michael Brown</option>
            <option value="Mrs. Lisa Anderson">Mrs. Lisa Anderson</option>
          </select>
        </div>

        <div>
          <Label htmlFor="room">Room</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => handleChange('room', e.target.value)}
            placeholder="e.g., Room 101"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => handleChange('capacity', parseInt(e.target.value))}
            min="1"
            max="60"
          />
        </div>

        <div>
          <Label htmlFor="totalStudents">Current Students</Label>
          <Input
            id="totalStudents"
            type="number"
            value={formData.totalStudents}
            onChange={(e) => handleChange('totalStudents', parseInt(e.target.value))}
            min="0"
          />
        </div>
      </div>

      <div>
        <Label>Subjects</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {availableSubjects.map((subject) => (
            <label key={subject} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={(e) => handleSubjectChange(subject, e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {classData ? 'Update Class' : 'Add Class'}
        </Button>
      </div>
    </form>
  );
};

export default ClassForm;
