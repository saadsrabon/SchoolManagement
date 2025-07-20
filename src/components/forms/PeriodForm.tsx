
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PeriodFormProps {
  open: boolean;
  onClose: () => void;
  period?: any;
}

const PeriodForm = ({ open, onClose, period }: PeriodFormProps) => {
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: '',
    subject: '',
    class: '',
    teacher: '',
    room: ''
  });

  useEffect(() => {
    if (period) {
      const [startTime, endTime] = period.time.split(' - ');
      setFormData({
        day: period.day,
        startTime: startTime,
        endTime: endTime,
        subject: period.subject,
        class: period.class,
        teacher: period.teacher,
        room: period.room
      });
    } else {
      setFormData({
        day: '',
        startTime: '',
        endTime: '',
        subject: '',
        class: '',
        teacher: '',
        room: ''
      });
    }
  }, [period]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving period:', formData);
    onClose();
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{period ? 'Edit Period' : 'Add New Period'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="day">Day</Label>
            <Select value={formData.day} onValueChange={(value) => setFormData({...formData, day: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>{day}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="class">Class</Label>
            <Input
              id="class"
              value={formData.class}
              onChange={(e) => setFormData({...formData, class: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="teacher">Teacher</Label>
            <Input
              id="teacher"
              value={formData.teacher}
              onChange={(e) => setFormData({...formData, teacher: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={formData.room}
              onChange={(e) => setFormData({...formData, room: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {period ? 'Update Period' : 'Add Period'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PeriodForm;
