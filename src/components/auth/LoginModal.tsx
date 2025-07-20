
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, User, GraduationCap, Users } from 'lucide-react';
import { toast } from "sonner";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [role, setRole] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const roles = [
    { value: 'admin', label: 'Admin', icon: Shield, color: 'bg-red-500' },
    { value: 'teacher', label: 'Teacher', icon: GraduationCap, color: 'bg-blue-500' },
    { value: 'student', label: 'Student', icon: User, color: 'bg-green-500' },
    { value: 'parent', label: 'Parent', icon: Users, color: 'bg-purple-500' }
  ];

  const handleLogin = () => {
    if (!role || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Demo login - store role in localStorage for demo purposes
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    toast.success(`Logged in as ${role.charAt(0).toUpperCase() + role.slice(1)}`);
    onOpenChange(false);
    
    // Navigate to appropriate dashboard
    navigate(`/dashboard/${role}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome Back
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="role">Select Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((roleOption) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 ${roleOption.color} rounded-full flex items-center justify-center`}>
                        <roleOption.icon className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span>{roleOption.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">Demo Credentials:</p>
            <div className="text-xs text-gray-500 mt-1">
              Email: demo@school.com | Password: demo123
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
