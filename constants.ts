import { Student, Teacher, UserRole, Homework } from './types';

export const MOCK_STUDENTS: Student[] = [
  {
    id: "STU001",
    name: "Rahul Kumar",
    role: UserRole.STUDENT,
    classGrade: "11",
    section: "A",
    stream: "Science",
    rollNumber: "11121", // Class 11, Sec 1 (A), Roll 21
    attendanceRate: 92,
    avatarUrl: "https://picsum.photos/200/200?random=1"
  },
  {
    id: "STU002",
    name: "Priya Sharma",
    role: UserRole.STUDENT,
    classGrade: "12",
    section: "B",
    stream: "Commerce",
    rollNumber: "12205", // Class 12, Sec 2 (B), Roll 05
    attendanceRate: 88,
    avatarUrl: "https://picsum.photos/200/200?random=2"
  },
  {
    id: "STU003",
    name: "Amit Patel",
    role: UserRole.STUDENT,
    classGrade: "10",
    section: "C",
    stream: undefined,
    rollNumber: "10312", // Class 10, Sec 3 (C), Roll 12
    attendanceRate: 95,
    avatarUrl: "https://picsum.photos/200/200?random=3"
  }
];

export const MOCK_TEACHERS: Teacher[] = [
  {
    id: "TCH001",
    name: "Anita Roy",
    role: UserRole.TEACHER,
    subject: "Physics",
    assignedClasses: ["11-A", "12-A"],
    avatarUrl: "https://picsum.photos/200/200?random=10"
  },
  {
    id: "TCH002",
    name: "Suresh Gupta",
    role: UserRole.TEACHER,
    subject: "Mathematics",
    assignedClasses: ["10-C", "11-B"],
    avatarUrl: "https://picsum.photos/200/200?random=11"
  }
];

export const MOCK_HOMEWORK: Homework[] = [
  {
    id: "HW1",
    subject: "Mathematics",
    topic: "Complete Exercise 4.2 (Quadratic Equations) - Problems 1 to 15",
    assignedDate: "Oct 24",
    dueDate: "Oct 26",
    status: 'Pending'
  },
  {
    id: "HW2",
    subject: "Physics",
    topic: "Write observation record for Ohm's Law experiment",
    assignedDate: "Oct 24",
    dueDate: "Oct 28",
    status: 'Pending'
  },
  {
    id: "HW3",
    subject: "English",
    topic: "Read Chapter 5 'The Last Lesson' and answer summary questions",
    assignedDate: "Oct 23",
    dueDate: "Oct 25",
    status: 'Pending'
  },
  {
    id: "HW4",
    subject: "Chemistry",
    topic: "Balance chemical equations worksheet #4",
    assignedDate: "Oct 20",
    dueDate: "Oct 22",
    status: 'Completed'
  },
  {
    id: "HW5",
    subject: "Computer Science",
    topic: "Write a Python program to check palindrome",
    assignedDate: "Oct 19",
    dueDate: "Oct 21",
    status: 'Completed'
  }
];