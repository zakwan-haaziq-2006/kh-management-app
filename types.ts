export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER'
}

export interface BaseUser {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Student extends BaseUser {
  role: UserRole.STUDENT;
  classGrade: string; // e.g. "11th"
  section: string;    // e.g. "A"
  stream?: string;    // e.g. "Science", "Commerce"
  rollNumber: string;
  attendanceRate: number;
}

export interface Teacher extends BaseUser {
  role: UserRole.TEACHER;
  subject: string;
  assignedClasses: string[];
}

export type User = Student | Teacher;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Homework {
  id: string;
  subject: string;
  topic: string;
  assignedDate: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}