
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Plus, Edit, Trash2, Users } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PeriodForm from '@/components/forms/PeriodForm';
import DeleteConfirmationModal from '@/components/modals/DeleteConfirmationModal';

const RoutinePage = () => {
  const [showPeriodForm, setShowPeriodForm] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);
  const [deletingPeriod, setDeletingPeriod] = useState(null);

  const periods = [
    {
      id: 1,
      day: 'Monday',
      time: '09:00 AM - 10:00 AM',
      subject: 'Mathematics',
      class: 'Grade 10A',
      teacher: 'John Smith',
      room: 'Room 101'
    },
    {
      id: 2,
      day: 'Monday',
      time: '10:00 AM - 11:00 AM',
      subject: 'Physics',
      class: 'Grade 11B',
      teacher: 'Jane Doe',
      room: 'Room 203'
    },
    {
      id: 3,
      day: 'Tuesday',
      time: '09:00 AM - 10:00 AM',
      subject: 'Chemistry',
      class: 'Grade 12A',
      teacher: 'Mike Johnson',
      room: 'Lab 1'
    }
  ];

  const handleAddPeriod = () => {
    setEditingPeriod(null);
    setShowPeriodForm(true);
  };

  const handleEditPeriod = (period) => {
    setEditingPeriod(period);
    setShowPeriodForm(true);
  };

  const handleDeletePeriod = (period) => {
    setDeletingPeriod(period);
  };

  const confirmDelete = () => {
    console.log('Deleting period:', deletingPeriod);
    setDeletingPeriod(null);
  };

  return (
    <DashboardLayout role="admin" title="Class Routine">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Class Routine Management</h1>
            <p className="text-gray-600">Manage class schedules and time periods</p>
          </div>
          <Button onClick={handleAddPeriod}>
            <Plus className="h-4 w-4 mr-2" />
            Add Period
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Class Periods</CardTitle>
            <CardDescription>All scheduled class periods</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {periods.map((period) => (
                  <TableRow key={period.id}>
                    <TableCell className="font-medium">{period.day}</TableCell>
                    <TableCell>{period.time}</TableCell>
                    <TableCell>{period.subject}</TableCell>
                    <TableCell>{period.class}</TableCell>
                    <TableCell>{period.teacher}</TableCell>
                    <TableCell>{period.room}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPeriod(period)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePeriod(period)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <PeriodForm
          open={showPeriodForm}
          onClose={() => setShowPeriodForm(false)}
          period={editingPeriod}
        />

        <DeleteConfirmationModal
          open={!!deletingPeriod}
          onClose={() => setDeletingPeriod(null)}
          onConfirm={confirmDelete}
          title="Delete Period"
          description={`Are you sure you want to delete this period: ${deletingPeriod?.subject} - ${deletingPeriod?.time}?`}
        />
      </div>
    </DashboardLayout>
  );
};

export default RoutinePage;
