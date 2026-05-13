import { MOCK_STUDENTS, MOCK_TEACHERS } from '../constants';
import { User, UserRole } from '../types';

export const login = async (identifier: string, dob: string, role: UserRole): Promise<User> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let user: User | undefined;

  // 1. Try to find the user in the existing mock database
  // Note: Mock data doesn't have DOB yet, so we match on identifier
  if (role === UserRole.STUDENT) {
    user = MOCK_STUDENTS.find(
      s => s.rollNumber.toLowerCase() === identifier.toLowerCase()
    );
  } else {
    user = MOCK_TEACHERS.find(
      t => t.id.toLowerCase() === identifier.toLowerCase()
    );
  }

  // 2. If not found in mock DB, create a temporary session user
  if (!user) {
    if (role === UserRole.STUDENT) {
      user = {
        id: `TEMP-STU-${Date.now()}`,
        name: "Student User",
        role: UserRole.STUDENT,
        classGrade: "11",
        section: "A",
        stream: "Science",
        rollNumber: identifier || "0000",
        attendanceRate: 100,
        avatarUrl: `https://ui-avatars.com/api/?name=Student&background=0D9488&color=fff`
      };
    } else {
      user = {
        id: identifier || `TEMP-TCH-${Date.now()}`,
        name: "Teacher User",
        role: UserRole.TEACHER,
        subject: "General",
        assignedClasses: ["10-A", "11-B"],
        avatarUrl: `https://ui-avatars.com/api/?name=Teacher&background=4F46E5&color=fff`
      };
    }
  }

  return user;
};