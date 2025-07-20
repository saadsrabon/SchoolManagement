import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  MessageSquare,
  BarChart3,
  Settings,
  Home,
  UserCheck,
  ClipboardList,
  FileText,
  CalendarDays,
  UserX,
  Book
} from 'lucide-react';

interface AppSidebarProps {
  role: 'admin' | 'teacher' | 'student' | 'parent';
}

const AppSidebar = ({ role }: AppSidebarProps) => {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const adminMenuItems = [
    { title: "Dashboard", url: "/dashboard/admin", icon: Home },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Students", url: "/dashboard/admin/students", icon: Users },
    { title: "Teachers", url: "/dashboard/admin/teachers", icon: GraduationCap },
    { title: "Classes", url: "/dashboard/admin/classes", icon: BookOpen },
    { title: "Subjects", url: "/dashboard/admin/subjects", icon: Book },
    { title: "Attendance", url: "/dashboard/admin/attendance", icon: UserCheck },
    { title: "Fees", url: "/dashboard/admin/fees", icon: DollarSign },
    { title: "Student Fees", url: "/dashboard/admin/student-fees", icon: DollarSign },
    { title: "Exams", url: "/dashboard/admin/exams", icon: ClipboardList },
    { title: "Routine", url: "/dashboard/admin/routine", icon: CalendarDays },
    { title: "Leave Requests", url: "/dashboard/admin/leave-requests", icon: UserX },
    { title: "Reports", url: "/dashboard/admin/reports", icon: BarChart3 },
  ];

  const teacherMenuItems = [
    { title: "Dashboard", url: "/dashboard/teacher", icon: Home },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "My Classes", url: "/dashboard/teacher/classes", icon: BookOpen },
    { title: "Student Fees", url: "/dashboard/teacher/student-fees", icon: DollarSign },
    { title: "Attendance", url: "/dashboard/teacher/attendance", icon: UserCheck },
    { title: "Grades", url: "/dashboard/teacher/grades", icon: ClipboardList },
    { title: "Schedule", url: "/dashboard/teacher/schedule", icon: Calendar },
    { title: "Assignments", url: "/dashboard/teacher/assignments", icon: FileText },
    { title: "Exam Management", url: "/dashboard/teacher/exam-management", icon: ClipboardList },
  ];

  const studentMenuItems = [
    { title: "Dashboard", url: "/dashboard/student", icon: Home },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "My Classes", url: "/dashboard/student/classes", icon: BookOpen },
    { title: "Attendance", url: "/dashboard/student/attendance", icon: UserCheck },
    { title: "Grades", url: "/dashboard/student/grades", icon: ClipboardList },
    { title: "Schedule", url: "/dashboard/student/schedule", icon: Calendar },
    { title: "Fees", url: "/dashboard/student/fees", icon: DollarSign },
  ];

  const parentMenuItems = [
    { title: "Dashboard", url: "/dashboard/parent", icon: Home },
    { title: "Chat", url: "/chat", icon: MessageSquare },
    { title: "Children", url: "/dashboard/parent/children", icon: Users },
    { title: "Attendance", url: "/dashboard/parent/attendance", icon: UserCheck },
    { title: "Grades", url: "/dashboard/parent/grades", icon: ClipboardList },
    { title: "Fees", url: "/dashboard/parent/fees", icon: DollarSign },
  ];

  const getMenuItems = () => {
    switch (role) {
      case 'admin': return adminMenuItems;
      case 'teacher': return teacherMenuItems;
      case 'student': return studentMenuItems;
      case 'parent': return parentMenuItems;
      default: return [];
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">EduManage Pro</h2>
                <p className="text-xs text-gray-500">School Management</p>
              </div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            {!isCollapsed && "Main Menu"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 border-r-2 border-blue-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-gray-200">
          <SidebarMenuButton asChild>
            <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Settings className="h-5 w-5 mr-3 flex-shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
