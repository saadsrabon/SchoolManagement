
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import GuardianDashboard from "./pages/GuardianDashboard";
import ChatPage from "./pages/ChatPage";
import AttendancePage from "./pages/admin/AttendancePage";
import ClassesPage from "./pages/admin/ClassesPage";
import FeesPage from "./pages/admin/FeesPage";
import ReportsPage from "./pages/admin/ReportsPage";
import ExamPage from "./pages/admin/ExamPage";
import RoutinePage from "./pages/admin/RoutinePage";
import LeaveRequestPage from "./pages/admin/LeaveRequestPage";
import StudentsPage from "./pages/admin/StudentsPage";
import TeachersPage from "./pages/admin/TeachersPage";
import StudentFeesPage from "./pages/admin/StudentFeesPage";
import SubjectsPage from "./pages/admin/SubjectsPage";
import MyClassesPage from "./pages/teacher/MyClassesPage";
import TeacherAttendancePage from "./pages/teacher/AttendancePage";
import GradesPage from "./pages/teacher/GradesPage";
import SchedulePage from "./pages/teacher/SchedulePage";
import AssignmentsPage from "./pages/teacher/AssignmentsPage";
import ExamManagementPage from "./pages/teacher/ExamManagementPage";
import FeePage from "./pages/parent/FeePage";
import ResultsPage from "./pages/parent/ResultsPage";
import NotFound from "./pages/NotFound";
import TeacherStudentFeesPage from "./pages/teacher/StudentFeesPage";
import VideoChatPage from "./pages/admin/VideoChatPage";
import VideoChat from "./components/video/VideoChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/parent" element={<GuardianDashboard />} />
          
          {/* Chat Routes - Available to all roles */}
          <Route path="/chat" element={<ChatPage />} />
          
          {/* Admin Routes */}
          <Route path="/dashboard/admin/students" element={<StudentsPage />} />
          <Route path="/dashboard/admin/teachers" element={<TeachersPage />} />
          <Route path="/dashboard/admin/student-fees" element={<StudentFeesPage />} />
          <Route path="/dashboard/admin/subjects" element={<SubjectsPage />} />
          <Route path="/dashboard/admin/attendance" element={<AttendancePage />} />
          <Route path="/dashboard/admin/classes" element={<ClassesPage />} />
          <Route path="/dashboard/admin/fees" element={<FeesPage />} />
          <Route path="/dashboard/admin/reports" element={<ReportsPage />} />
          <Route path="/dashboard/admin/exams" element={<ExamPage />} />
          <Route path="/dashboard/admin/routine" element={<RoutinePage />} />
          <Route path="/dashboard/admin/leave-requests" element={<LeaveRequestPage />} />
          <Route path="/dashboard/admin/video-chat" element={<VideoChat />} />
          
          {/* Teacher Routes */}
          <Route path="/dashboard/teacher/classes" element={<MyClassesPage />} />
          <Route path="/dashboard/teacher/student-fees" element={<TeacherStudentFeesPage />} />
          <Route path="/dashboard/teacher/attendance" element={<TeacherAttendancePage />} />
          <Route path="/dashboard/teacher/grades" element={<GradesPage />} />
          <Route path="/dashboard/teacher/schedule" element={<SchedulePage />} />
          <Route path="/dashboard/teacher/assignments" element={<AssignmentsPage />} />
          <Route path="/dashboard/teacher/exam-management" element={<ExamManagementPage />} />
          
          {/* Parent Routes */}
          <Route path="/dashboard/parent/fees" element={<FeePage />} />
          <Route path="/dashboard/parent/results" element={<ResultsPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
