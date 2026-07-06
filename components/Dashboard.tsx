import React, { useState } from 'react';
import { User, UserRole, Student, Teacher } from '../types';
import { MOCK_HOMEWORK } from '../constants';
import { 
  LogOut, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Clock, 
  Award,
  Bell,
  Menu,
  School,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  Users,
  Image as ImageIcon,
  GraduationCap,
  TrendingUp,
  AlertCircle,
  Share2,
  CheckCircle2,
  Coffee,
  CreditCard,
  ClipboardList,
  Receipt,
  Download,
  Eye,
  CalendarDays,
  PenTool,
  Trophy,
  Medal,
  Upload
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

// --- Sub-components ---

const FeatureCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  emoji?: string;
  delayMs?: number;
  onClick?: () => void;
}> = ({ title, subtitle, icon, gradient, emoji, delayMs = 0, onClick }) => (
  <button
    onClick={onClick}
    style={{ animationDelay: `${delayMs}ms` }}
    className={`relative group overflow-hidden bg-gradient-to-br ${gradient} p-4 rounded-3xl kid-card-shadow text-left transition-all duration-300 hover:-translate-y-1.5 hover:rotate-1 active:scale-95 animate-pop-in w-full aspect-[1/0.92]`}
  >
    {/* playful bubbles */}
    <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-white/25"></div>
    <div className="absolute right-6 top-8 w-8 h-8 rounded-full bg-white/20"></div>
    {emoji && (
      <span className="absolute top-2.5 right-3 text-lg opacity-90 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{emoji}</span>
    )}

    <div className="relative z-10 flex flex-col h-full justify-between gap-2">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/30 backdrop-blur-sm shadow-inner transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6 text-white drop-shadow' })}
      </div>
      <div>
        <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-sm">{title}</h3>
        <p className="text-[11px] text-white/90 font-bold">{subtitle}</p>
      </div>
    </div>
  </button>
);

const AttendanceModal: React.FC<{ percentage: number; onClose: () => void }> = ({ percentage, onClose }) => {
  const isGood = percentage >= 60;
  const colorClass = isGood ? 'text-green-500' : 'text-red-500';
  const bgClass = isGood ? 'bg-green-50' : 'bg-red-50';
  const strokeColor = isGood ? '#22c55e' : '#ef4444'; // green-500 : red-500

  // SVG Chart Configuration
  const size = 160;
  const strokeWidth = 12;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 px-4">
      <div 
        className="bg-white w-full max-w-sm rounded-[1.5rem] p-5 shadow-2xl transform transition-transform animate-zoom-in relative overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Blob */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 ${bgClass} rounded-full opacity-40 blur-3xl pointer-events-none z-0`}></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-2 relative z-50 shrink-0">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <div className={`p-2 rounded-xl ${bgClass} bg-opacity-60`}>
                <Calendar className={`w-4 h-4 ${colorClass}`} />
            </div>
            Attendance 📅
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-500 hover:text-gray-900"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center relative z-10 overflow-y-auto no-scrollbar pt-2">
            
            {/* Chart Section */}
            <div className="py-4 relative flex items-center justify-center">
                <div className="relative" style={{ width: size, height: size }}>
                    <svg width={size} height={size} className="transform -rotate-90 block">
                        {/* Track Circle */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="transparent"
                            stroke="#f3f4f6" // gray-100
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="transparent"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    
                    {/* Centered Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-4xl font-black ${colorClass} tracking-tight leading-none`}>
                            {percentage}%
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            Overall
                        </span>
                    </div>
                </div>
            </div>

            {/* Status Card */}
            <div className={`w-full p-4 rounded-2xl ${bgClass} border border-opacity-60 ${isGood ? 'border-green-200' : 'border-red-200'} mb-4 mt-2`}>
                <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-full bg-white bg-opacity-60 shrink-0`}>
                        {isGood ? (
                            <TrendingUp className={`w-4 h-4 ${colorClass}`} />
                        ) : (
                            <AlertCircle className={`w-4 h-4 ${colorClass}`} />
                        )}
                    </div>
                    <div>
                        <h3 className={`font-bold text-sm ${colorClass} mb-0.5`}>
                            {isGood ? 'On Track' : 'Attention Needed'}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed opacity-90">
                            {isGood 
                            ? "Your attendance record is excellent. Keep up the consistency!" 
                            : "You are falling below the 75% requirement. Please meet your coordinator."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-gray-200 transition-colors">
                    <span className="text-xl font-black text-gray-900">142</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Working Days</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-1 hover:border-gray-200 transition-colors">
                    <span className={`text-xl font-black ${colorClass}`}>
                        {Math.round(142 * (percentage/100))}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wide">Days Present</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const HomeworkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-purple-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-indigo-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <BookOpen className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                    Homework 📚
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Assigned Tasks & Deadlines</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
        {MOCK_HOMEWORK.length > 0 ? (
          MOCK_HOMEWORK.map((hw, index) => (
            <div 
              key={hw.id} 
              className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 ${hw.status === 'Completed' ? 'border-gray-100 opacity-70' : 'border-purple-100 ring-1 ring-purple-50'}`}
              style={{ animationDelay: `${index * 50 + 100}ms` }}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2.5">
                   <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${hw.status === 'Completed' ? 'bg-green-400' : 'bg-purple-500 animate-pulse'}`}></div>
                   <span className="font-bold text-base text-gray-900">{hw.subject}</span>
                </div>
                {hw.status === 'Completed' && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              
              <p className={`text-sm text-gray-600 mb-4 leading-relaxed font-medium ${hw.status === 'Completed' ? 'line-through decoration-gray-300 decoration-2' : ''}`}>
                {hw.topic}
              </p>
              
              <div className="flex items-center gap-4 border-t border-gray-50 pt-3">
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-widest">Assigned</span>
                     <span className="text-xs font-bold text-gray-700">{hw.assignedDate}</span>
                  </div>
                  <div className="w-px h-8 bg-gray-100"></div>
                  <div className="flex flex-col">
                     <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-widest">Deadline</span>
                     <span className={`text-xs font-bold ${hw.status === 'Completed' ? 'text-gray-500' : 'text-red-500'}`}>
                       {hw.dueDate}
                     </span>
                  </div>
              </div>
            </div>
          ))
        ) : (
           <div className="h-full flex flex-col items-center justify-center text-gray-400 pb-20">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 opacity-40" />
             </div>
             <p className="text-base font-medium text-gray-500">No homework assigned</p>
           </div>
        )}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

const TimetableModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const className = user.role === UserRole.STUDENT 
    ? `${(user as Student).classGrade} - ${(user as Student).section}` 
    : "10 - C";

  const getSubjectsForDay = (day: string) => {
    const subjectsPool = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science', 'Tamil', 'History', 'Geography', 'PT'];
    const offset = day.length; 
    return [
      { time: '09:00 - 09:45', subject: subjectsPool[(0 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-600 bg-blue-50' },
      { time: '09:45 - 10:30', subject: subjectsPool[(1 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-indigo-600 bg-indigo-50' },
      { time: '10:30 - 11:15', subject: subjectsPool[(2 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50' },
      { time: '11:15 - 11:30', subject: 'Short Break', icon: <Coffee className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50', isBreak: true },
      { time: '11:30 - 12:15', subject: subjectsPool[(3 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-green-600 bg-green-50' },
      { time: '12:15 - 01:00', subject: subjectsPool[(4 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-teal-600 bg-teal-50' },
      { time: '01:00 - 01:45', subject: 'Lunch Break', icon: <Coffee className="w-4 h-4" />, color: 'text-orange-600 bg-orange-50', isBreak: true },
      { time: '01:45 - 02:30', subject: subjectsPool[(5 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-pink-600 bg-pink-50' },
      { time: '02:30 - 03:15', subject: subjectsPool[(6 + offset) % subjectsPool.length], icon: <BookOpen className="w-4 h-4" />, color: 'text-cyan-600 bg-cyan-50' },
      { time: '03:15 - 04:00', subject: 'Physical Education', icon: <Users className="w-4 h-4" />, color: 'text-red-600 bg-red-50' },
    ];
  };

  const periods = getSubjectsForDay(selectedDay);

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-blue-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-sky-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 pt-12 pb-2 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center px-5 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Clock className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                    Time Table ⏰
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Class {className} Schedule</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-2 px-5 pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedDay === day 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-105' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider w-12">#</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">Subject</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {periods.map((period, index) => (
                <tr 
                  key={index} 
                  className={`transition-colors ${period.isBreak ? 'bg-amber-50/60' : 'hover:bg-gray-50/50'}`}
                >
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-black ${
                      period.isBreak ? 'bg-amber-100 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {period.isBreak ? <Coffee className="w-3.5 h-3.5" /> : index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-bold text-gray-400 font-mono">{period.time}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${period.color} shrink-0`}>
                        {period.icon}
                      </div>
                      <span className={`text-sm font-bold ${period.isBreak ? 'text-amber-800 italic' : 'text-gray-900'}`}>
                        {period.subject}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ResultsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const exams = [
    { id: 'mt1', title: 'Mid Term 1', date: 'Aug 2023', total: 482, max: 500, status: 'Pass' },
    { id: 'qt', title: 'Quarterly Exam', date: 'Sep 2023', total: 465, max: 500, status: 'Pass' },
    { id: 'mt2', title: 'Mid Term 2', date: 'Nov 2023', total: 490, max: 500, status: 'Pass' },
    { id: 'hy', title: 'Half Yearly', date: 'Dec 2023', total: 475, max: 500, status: 'Pass' },
  ];

  const getExamResults = (examId: string) => {
    return [
      { subject: 'Language (Tamil)', marks: 95, max: 100, grade: 'A+' },
      { subject: 'English', marks: 88, max: 100, grade: 'A' },
      { subject: 'Mathematics', marks: 99, max: 100, grade: 'O' },
      { subject: 'Physics', marks: 92, max: 100, grade: 'A+' },
      { subject: 'Chemistry', marks: 85, max: 100, grade: 'A' },
      { subject: 'Biology', marks: 96, max: 100, grade: 'O' },
    ];
  };

  const selectedExamData = selectedExam ? exams.find(e => e.id === selectedExam) : null;
  const results = selectedExam ? getExamResults(selectedExam) : [];

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-amber-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-orange-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 pt-12 pb-4 border-b border-gray-100 shadow-sm px-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             {selectedExam ? (
               <button 
                 onClick={() => setSelectedExam(null)}
                 className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-1"
               >
                 <ChevronLeft className="w-5 h-5 text-gray-600" />
               </button>
             ) : (
               <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="w-6 h-6" />
               </div>
             )}
            
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                    {selectedExam ? selectedExamData?.title : 'Results'}
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  {selectedExam ? 'Detailed Marksheet' : 'Exam Performance History'}
                </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
         {!selectedExam ? (
           <div className="space-y-4 pb-20">
             {exams.map((exam, index) => (
               <button 
                 key={exam.id}
                 onClick={() => setSelectedExam(exam.id)}
                 className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-md hover:border-amber-200 hover:-translate-y-0.5 active:scale-95 animate-in fade-in slide-in-from-bottom-2"
                 style={{ animationDelay: `${index * 50}ms` }}
               >
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-lg">
                      {exam.title.charAt(0)}
                   </div>
                   <div className="text-left">
                     <h3 className="text-base font-bold text-gray-900">{exam.title}</h3>
                     <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                       <Calendar className="w-3 h-3" /> {exam.date}
                     </span>
                   </div>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-lg font-black text-gray-900">{exam.total}<span className="text-xs text-gray-400 font-medium">/{exam.max}</span></span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {exam.status}
                    </span>
                 </div>
               </button>
             ))}
           </div>
         ) : (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20">
             <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 text-white shadow-lg shadow-orange-200 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="flex justify-between items-end relative z-10">
                   <div>
                     <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">Total Score</p>
                     <h3 className="text-3xl font-black">{selectedExamData?.total} <span className="text-lg opacity-60 font-medium">/ {selectedExamData?.max}</span></h3>
                   </div>
                   <div className="text-right">
                      <p className="text-orange-100 text-xs font-bold uppercase tracking-wider mb-1">Percentage</p>
                      <h3 className="text-3xl font-black">{((selectedExamData?.total || 0) / (selectedExamData?.max || 1) * 100).toFixed(1)}%</h3>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
               <table className="w-full">
                 <thead>
                   <tr className="bg-gray-50 border-b border-gray-100">
                     <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                     <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Marks</th>
                     <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Grade</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {results.map((row, idx) => (
                     <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{row.subject}</td>
                       <td className="px-4 py-3.5 text-center text-sm font-medium text-gray-600">
                         {row.marks} <span className="text-[10px] text-gray-400">/ {row.max}</span>
                       </td>
                       <td className="px-4 py-3.5 text-center">
                         <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                           row.grade === 'O' ? 'bg-purple-100 text-purple-700' :
                           row.grade === 'A+' || row.grade === 'A' ? 'bg-green-100 text-green-700' :
                           'bg-blue-100 text-blue-700'
                         }`}>
                           {row.grade}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

const AssignmentsModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const assignments = [
    { id: 1, subject: 'Science', title: 'Solar System Model', due: 'Nov 15', status: 'Pending', description: 'Create a working model of the solar system using recyclable materials.' },
    { id: 2, subject: 'English', title: 'Essay on Environment', due: 'Nov 18', status: 'Submitted', description: 'Write a 500-word essay on the importance of environmental conservation.' },
    { id: 3, subject: 'Math', title: 'Trigonometry Worksheet', due: 'Nov 20', status: 'Pending', description: 'Complete the worksheet attached in the class group.' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-pink-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-rose-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600">
                <ClipboardList className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                  {user.role === UserRole.TEACHER ? 'Upload Assignment' : 'Assignments'}
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  {user.role === UserRole.TEACHER ? 'Manage & Post Projects' : 'Projects & Tasks'}
                </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 pb-20">
        {assignments.map((assign, index) => (
          <div key={assign.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex justify-between items-start mb-2">
              <span className="px-2 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-600 uppercase">{assign.subject}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${assign.status === 'Submitted' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{assign.status}</span>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">{assign.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{assign.description}</p>
            <div className="flex items-center justify-between border-t border-gray-50 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <Clock className="w-3.5 h-3.5" /> Due: {assign.due}
              </div>
              <button className="text-xs font-bold text-blue-600 hover:underline">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'history'>('structure');
  const [selectedReceipt, setSelectedReceipt] = useState<{ id: string, amount: string, date: string, title: string, method?: string } | null>(null);

  const feeStructure = [
    { type: 'Tuition Fee (Annual)', amount: '₹25,000', mandatory: true },
    { type: 'Books & Stationery', amount: '₹4,200', mandatory: true },
    { type: 'Uniform Sets (2)', amount: '₹3,500', mandatory: true },
    { type: 'Transportation', amount: '₹12,000', mandatory: false },
    { type: 'Special Lab Fee', amount: '₹1,500', mandatory: true },
    { type: 'Annual Day Contribution', amount: '₹1,000', mandatory: true },
  ];

  const paymentHistory = [
    { id: 'REC-2023-001', title: 'Term 1 Tuition', amount: '₹12,500', date: 'Jun 15, 2023', method: 'UPI' },
    { id: 'REC-2023-002', title: 'Books & Uniform', amount: '₹7,700', date: 'Jun 01, 2023', method: 'Cash' },
    { id: 'REC-2023-003', title: 'Lab Fee', amount: '₹1,500', date: 'Jul 10, 2023', method: 'Card' },
  ];

  const totalFee = feeStructure.reduce((acc, item) => acc + parseInt(item.amount.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-teal-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-2 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600">
                <CreditCard className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">Fees 💰</h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Finance & Records</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-2">
          <button 
            onClick={() => setActiveTab('structure')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'structure' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Fee Structure
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-teal-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Payment History
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 pb-20">
         
         {activeTab === 'structure' ? (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
             {/* Total Summary Card */}
             <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <p className="text-teal-100 text-xs font-bold uppercase tracking-wider mb-1">Total Annual Fee</p>
                <h3 className="text-3xl font-black">₹{totalFee.toLocaleString()}</h3>
                <p className="text-xs text-teal-100 mt-2 opacity-80">Includes all mandatory and optional academic charges for the academic year 2023-2024.</p>
             </div>

             {/* Fee Breakdown List */}
             <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
                   <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide">Detailed Breakdown</h4>
                </div>
                <div className="divide-y divide-gray-50">
                  {feeStructure.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors">
                       <div>
                          <p className="text-sm font-bold text-gray-900">{item.type}</p>
                          {item.mandatory ? (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">Mandatory</span>
                          ) : (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">Optional</span>
                          )}
                       </div>
                       <span className="font-bold text-gray-800">{item.amount}</span>
                    </div>
                  ))}
                </div>
             </div>
           </div>
         ) : (
           <div className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-300">
              {paymentHistory.map((payment, idx) => (
                <div key={payment.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group transition-all hover:shadow-md hover:border-teal-100">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                         <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 text-sm">{payment.title}</h4>
                         <p className="text-xs text-gray-500 font-medium">{payment.date} • {payment.method}</p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-2">
                      <span className="font-bold text-gray-900">{payment.amount}</span>
                      <button 
                        onClick={() => setSelectedReceipt(payment)}
                        className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                      >
                        <Eye className="w-3 h-3" /> View Receipt
                      </button>
                   </div>
                </div>
              ))}
              
              <div className="mt-8 text-center px-6">
                <p className="text-xs text-gray-400">Showing all transactions for the current academic year.</p>
              </div>
           </div>
         )}
      </div>

      {/* Receipt Modal Overlay - Fixed & High Z-Index for robustness */}
      {selectedReceipt && (
        <div 
          className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedReceipt(null)}
        >
           <div 
             className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-zoom-in relative flex flex-col max-h-[90vh]"
             onClick={(e) => e.stopPropagation()}
           >
              {/* Receipt Header */}
              <div className="bg-gray-900 p-4 text-white flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/10 rounded-lg">
                       <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm leading-tight">Payment Receipt</h3>
                        <p className="text-[10px] text-gray-400 font-mono">{selectedReceipt.id}</p>
                    </div>
                 </div>
                 <button 
                    onClick={() => setSelectedReceipt(null)} 
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              {/* Scrollable Receipt Content */}
              <div className="overflow-y-auto p-5 bg-gray-50">
                 {/* Receipt "Paper" Visual */}
                 <div className="bg-white border border-gray-200 shadow-sm p-0 mb-4 text-center relative overflow-hidden">
                    {/* Decorative Receipt jagged edge top */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI0Ij48cGF0aCBkPSJMNiA0TDEyIDBMMCAwWiIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==')] bg-repeat-x"></div>
                    
                    <div className="p-6 pb-8 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                        
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Total Paid</p>
                            <h2 className="text-3xl font-black text-gray-900 mt-1">{selectedReceipt.amount}</h2>
                        </div>

                        <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Date</span>
                                <span className="font-bold text-gray-900">{selectedReceipt.date}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Payment Mode</span>
                                <span className="font-bold text-gray-900">{selectedReceipt.method || 'Online'}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Category</span>
                                <span className="font-bold text-gray-900">{selectedReceipt.title}</span>
                            </div>
                            <div className="flex justify-between text-xs pt-2 border-t border-gray-100 mt-2">
                                <span className="text-gray-500">Status</span>
                                <span className="font-bold text-green-600 uppercase text-[10px] bg-green-50 px-2 py-0.5 rounded-full">Success</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Receipt jagged edge bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI0Ij48cGF0aCBkPSJMNiAwbDYgNEgwWiIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==')] bg-repeat-x"></div>
                 </div>

                 {/* Placeholder for Scanned Copy */}
                 <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Attached Document</p>
                    <div className="bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 h-32 flex flex-col items-center justify-center gap-2">
                         <div className="p-2 bg-white rounded-full shadow-sm">
                             <ImageIcon className="w-5 h-5 text-gray-400" />
                         </div>
                         <p className="text-[10px] text-gray-500">Official Receipt Scan<br/>(Coming Soon)</p>
                    </div>
                 </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                 <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors active:scale-95">
                    <Download className="w-4 h-4" /> Download Statement
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const EventsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const events = [
    { id: 1, title: 'Annual Sports Day', date: 'Nov 24', day: 'Fri', time: '08:30 AM', location: 'School Ground', type: 'Sports', color: 'bg-red-50 text-red-600' },
    { id: 2, title: 'Science Exhibition', date: 'Dec 05', day: 'Tue', time: '10:00 AM', location: 'Auditorium', type: 'Academic', color: 'bg-blue-50 text-blue-600' },
    { id: 3, title: 'Christmas Celebration', date: 'Dec 22', day: 'Fri', time: '02:00 PM', location: 'Main Hall', type: 'Cultural', color: 'bg-green-50 text-green-600' },
    { id: 4, title: 'Parent-Teacher Meet', date: 'Jan 10', day: 'Wed', time: '09:00 AM', location: 'Classrooms', type: 'Meeting', color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-red-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-orange-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                <MapPin className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">Upcoming Events 🎉</h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">School Calendar & Activities</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4 pb-20">
        {events.map((event, index) => (
          <div 
            key={event.id} 
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
             <div className="flex flex-col items-center justify-center w-14 h-16 bg-gray-50 rounded-xl border border-gray-100 shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{event.date.split(' ')[0]}</span>
                <span className="text-xl font-black text-gray-900 leading-none">{event.date.split(' ')[1]}</span>
             </div>
             
             <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="font-bold text-gray-900 text-sm">{event.title}</h3>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${event.color}`}>
                     {event.type}
                   </span>
                </div>
                
                <div className="space-y-1">
                   <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <Clock className="w-3.5 h-3.5" /> {event.day}, {event.time}
                   </div>
                   <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {event.location}
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CircularsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedCircular, setSelectedCircular] = useState<any | null>(null);

  // Helper to generate dates relative to today
  const getDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Generate circulars (Some recent, some old)
  const allCirculars = [
    { 
      id: 1, 
      title: 'Revised School Timings', 
      rawDate: getDate(0),
      date: 'Today', 
      sender: 'Principal Desk', 
      tag: 'Important', 
      fullText: 'Dear Students and Parents,\n\nDue to the onset of the winter season and expected fog conditions, the school administration has decided to revise the daily reporting time. Effective from tomorrow, the school assembly will commence at 8:30 AM instead of 8:00 AM. Departure timings remain unchanged. Please ensure students arrive on time safely.\n\nWarm Regards,\nPrincipal',
      preview: 'Due to the upcoming winter season, the school timings will be shifted by 30 minutes effective from Nov 1st.',
      isNew: true 
    },
    { 
      id: 2, 
      title: 'Annual Sports Day Selection', 
      rawDate: getDate(1),
      date: 'Yesterday', 
      sender: 'Sports Dept', 
      tag: 'Sports', 
      fullText: 'The Physical Education Department is announcing the selection trials for the Annual Sports Day meet. Trials for track events (100m, 200m, 400m) and field events (Long Jump, Shot Put) will be held this Friday. Interested students must register their names with their respective House Captains by Thursday.',
      preview: 'Selection trials for track and field events will commence this Friday. Interested students must register with...',
      isNew: false 
    },
    { 
      id: 3, 
      title: 'Exam Schedule Notice', 
      rawDate: getDate(4),
      date: formatDate(getDate(4)), 
      sender: 'Examination Cell', 
      tag: 'Academic', 
      fullText: 'This is to inform all students of Class 10 and 12 that the pre-board practical examinations schedule has been finalized. The practicals will commence from next Monday. Detailed batch-wise lists have been pasted on the main notice board. Attendance is mandatory for all sessions.',
      preview: 'Pre-board practical examination dates have been finalized. Check the notice board for batch details.',
      isNew: false 
    },
    { 
      id: 4, 
      title: 'Science Exhibition Guidelines', 
      rawDate: getDate(10), // Old circular (> 7 days)
      date: formatDate(getDate(10)), 
      sender: 'Science HOD', 
      tag: 'Academic', 
      fullText: 'Students participating in the district level exhibition must submit their project synopsis by...',
      preview: 'Students participating in the district level exhibition must submit their project synopsis by...',
      isNew: false 
    }
  ];

  // Filter for past 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const recentCirculars = allCirculars.filter(c => c.rawDate >= oneWeekAgo);

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-indigo-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-violet-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
             {selectedCircular ? (
                <button 
                  onClick={() => setSelectedCircular(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-1"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
             ) : (
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                    <FileText className="w-6 h-6" />
                </div>
             )}
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">Circulars 📢</h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                    {selectedCircular ? 'Detailed View' : 'Last 7 Days Updates'}
                </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 pb-20">
        {!selectedCircular ? (
            <div className="space-y-4">
                {recentCirculars.length > 0 ? (
                    recentCirculars.map((item, index) => (
                    <button 
                        key={item.id} 
                        onClick={() => setSelectedCircular(item)}
                        className="w-full text-left bg-white p-5 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden group transition-all hover:shadow-md active:scale-[0.98]"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {item.isNew && (
                            <div className="absolute top-0 right-0">
                                <div className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg shadow-sm">NEW</div>
                            </div>
                        )}
                        
                        <div className="flex justify-between items-start mb-2">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                                item.tag === 'Important' ? 'bg-red-50 text-red-600' :
                                item.tag === 'Holiday' ? 'bg-green-50 text-green-600' :
                                item.tag === 'Sports' ? 'bg-orange-50 text-orange-600' :
                                'bg-indigo-50 text-indigo-600'
                            }`}>
                                {item.tag}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {item.date}
                            </span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug pr-4">{item.title}</h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <School className="w-2.5 h-2.5 text-gray-500" />
                            </div>
                            <span className="text-xs font-medium text-gray-500">{item.sender}</span>
                        </div>

                        <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-2">
                            {item.preview}
                        </p>

                        <div className="pt-3 border-t border-gray-50 flex justify-end items-center">
                            <div className="text-xs font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                Read Circular <ChevronRight className="w-3 h-3" />
                            </div>
                        </div>
                    </button>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center mt-10 opacity-50">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                            <FileText className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium text-gray-500">No new circulars this week.</p>
                    </div>
                )}
            </div>
        ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in slide-in-from-right-4 duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div className="flex justify-between items-start mb-6 mt-2">
                    <div>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Subject</span>
                         <h3 className="text-lg font-bold text-gray-900 leading-tight">{selectedCircular.title}</h3>
                    </div>
                    <div className="text-right shrink-0">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Date</span>
                         <span className="text-sm font-bold text-gray-800 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">{selectedCircular.date}</span>
                    </div>
                </div>

                <div className="prose prose-sm max-w-none mb-8">
                     <p className="text-xs text-gray-600 leading-7 whitespace-pre-line font-medium text-justify">
                         {selectedCircular.fullText}
                     </p>
                </div>

                {/* Principal Confirmation / Signature */}
                <div className="flex flex-col items-end mt-8 pt-4">
                    <div className="relative p-2">
                         <div className="absolute inset-0 border-2 border-green-600 rounded-lg opacity-20 transform -rotate-2"></div>
                         <div className="flex items-center gap-1.5 text-green-700 relative z-10 px-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Verified & Signed</span>
                         </div>
                    </div>
                    <div className="mt-2 text-right">
                        <div className="font-serif text-lg text-indigo-900 italic opacity-80 leading-none mb-1 pr-2">Dr. S. Ranganathan</div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Principal</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const UploadHomeworkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<'class' | 'form'>('class');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [homeworkText, setHomeworkText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  // Get current day
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  
  // Mock classes for the faculty today (derived from similar logic as Timetable)
  const getTodayClasses = () => {
    const classPool = ['10 - A', '10 - C', '9 - B', '12 - A', '11 - C', '8 - D'];
    // Deterministic shuffle based on day length
    const offset = today.length % classPool.length;
    return [
      { id: '1', name: classPool[(0 + offset) % classPool.length], time: '09:00 AM', subject: 'Mathematics' },
      { id: '2', name: classPool[(1 + offset) % classPool.length], time: '10:30 AM', subject: 'Physics' },
      { id: '3', name: classPool[(2 + offset) % classPool.length], time: '01:45 PM', subject: 'Advanced Algebra' },
    ];
  };

  const todayClasses = getTodayClasses();

  const handlePost = () => {
    if (!homeworkText.trim()) return;
    setIsPosting(true);
    // Mock API delay
    setTimeout(() => {
      setIsPosting(false);
      onClose();
      alert(`Homework posted to Class ${selectedClass}!`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-purple-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step === 'form' ? (
              <button 
                onClick={() => setStep('class')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-1"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Upload className="w-6 h-6" />
              </div>
            )}
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                  {step === 'class' ? 'Select Class' : 'Post Homework'}
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                  {step === 'class' ? `Your Schedule for ${today}` : `Class ${selectedClass} • ${todayClasses.find(c => c.name === selectedClass)?.subject}`}
                </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        {step === 'class' ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">Today's Classes</h3>
            {todayClasses.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedClass(item.name);
                  setStep('form');
                }}
                className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-purple-200 hover:shadow-md transition-all active:scale-98"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-black text-sm">
                    {item.name.split(' ')[0]}
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold text-gray-900">Class {item.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold text-purple-500 uppercase tracking-tight bg-purple-50 px-1.5 py-0.5 rounded-md">{item.subject}</span>
                      <span className="text-[10px] font-medium text-gray-400">• {item.time}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm">
               <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Homework Details</label>
               <textarea
                 autoFocus
                 value={homeworkText}
                 onChange={(e) => setHomeworkText(e.target.value)}
                 placeholder="Enter homework instructions, topics, or page numbers..."
                 className="w-full h-48 bg-gray-50 border-none rounded-2xl p-4 text-gray-900 text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/20 resize-none transition-all"
               />
            </div>

            <div className="space-y-3">
              <button
                onClick={handlePost}
                disabled={!homeworkText.trim() || isPosting}
                className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 text-white font-black shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:grayscale ${
                  isPosting ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
                }`}
              >
                {isPosting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    POSTING...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    POST HOMEWORK
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest px-4">
                This will be instantly notified to all students of Class {selectedClass}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const UploadMarksModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
  const [step, setStep] = useState<'exam' | 'class' | 'students'>('exam');
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [studentMarks, setStudentMarks] = useState<Record<string, string>>({});
  const [isPublishing, setIsPublishing] = useState(false);

  // Mock Data
  const exams = ['Mid Term 1', 'Quarterly Exam', 'Mid Term 2', 'Half Yearly'];
  const classes = ['10 - A', '10 - C', '9 - B', '12 - A'];
  const students = [
    { id: '101', name: 'Zaidan Khan' },
    { id: '102', name: 'Fathima Beevi' },
    { id: '103', name: 'Arjun Kumar' },
    { id: '104', name: 'Sara Williams' },
    { id: '105', name: 'Mohamed Rizwan' },
    { id: '106', name: 'Lakshmi Priya' },
    { id: '107', name: 'Kevin Thomas' },
    { id: '108', name: 'Ananya S' }
  ];

  // Derive handled subject (mocked for demo)
  const teacherSubject = (user as Teacher).subject || 'Mathematics';

  const handleMarkChange = (id: string, value: string) => {
    // Only allow numbers and max 100
    const numValue = parseInt(value);
    if (value === '' || (!isNaN(numValue) && numValue <= 100)) {
      setStudentMarks(prev => ({ ...prev, [id]: value }));
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      onClose();
      alert(`Marks for ${teacherSubject} (${selectedExam} - Class ${selectedClass}) have been published!`);
    }, 2000);
  };

  const handleBack = () => {
    if (step === 'students') setStep('class');
    else if (step === 'class') setStep('exam');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-amber-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step !== 'exam' ? (
              <button 
                onClick={handleBack}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-1"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                  <Award className="w-6 h-6" />
              </div>
            )}
            <div>
                <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                  {step === 'exam' ? 'Select Exam' : step === 'class' ? 'Select Class' : 'Enter Marks'}
                </h2>
                <p className="text-xs font-medium text-gray-500 mt-0.5 uppercase tracking-wider">
                  {step === 'exam' ? 'Step 1 of 3' : step === 'class' ? `${selectedExam} • Step 2` : `${selectedExam} • Class ${selectedClass}`}
                </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        {step === 'exam' && (
          <div className="grid grid-cols-1 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {exams.map((exam, index) => (
              <button
                key={exam}
                onClick={() => {
                  setSelectedExam(exam);
                  setStep('class');
                }}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-amber-200 hover:shadow-md transition-all active:scale-98"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-gray-900">{exam}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Held Recently</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}

        {step === 'class' && (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
            {classes.map((cls, index) => (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClass(cls);
                  setStep('students');
                }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 group hover:border-amber-200 hover:shadow-md transition-all active:scale-95"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-lg">
                  {cls.split(' ')[0]}
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-black text-gray-900">Class {cls}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Section {cls.split(' ')[2]}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 'students' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6 pb-20">
             <div className="bg-amber-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="flex items-center gap-3 mb-1">
                   <PenTool className="w-4 h-4 opacity-70" />
                   <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Subject Handling</span>
                </div>
                <h3 className="text-2xl font-black tracking-tight">{teacherSubject}</h3>
                <p className="text-amber-100 text-xs font-bold mt-1 opacity-90">Class {selectedClass} • Max Marks: 100</p>
             </div>

             <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-5 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                      <th className="px-5 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {students.map((student) => (
                      <tr key={student.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{student.name}</span>
                            <span className="text-[10px] font-bold text-gray-400">Roll: {student.id}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <input 
                            type="number"
                            value={studentMarks[student.id] || ''}
                            onChange={(e) => handleMarkChange(student.id, e.target.value)}
                            placeholder="00"
                            className="w-16 bg-gray-50 border-none rounded-xl px-3 py-2 text-right font-black text-gray-900 focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-gray-200"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div className="fixed bottom-6 left-5 right-5 z-20">
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`w-full h-14 rounded-2xl text-white font-black shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    isPublishing ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                  }`}
                >
                  {isPublishing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      PUBLISHING...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      PUBLISH MARKS
                    </>
                  )}
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CamConnectModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[70] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-in slide-in-from-bottom duration-300">
       <div className="bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                <Users className="w-5 h-5" />
             </div>
             <div>
               <h2 className="text-lg font-bold text-gray-900">Community 🎪</h2>
               <p className="text-xs text-gray-500 font-medium">Student Achievements</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors border border-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
       </div>

       <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-28 h-28 bg-gradient-to-br from-violet-400 to-indigo-500 rounded-[2rem] flex items-center justify-center mb-6 kid-card-shadow animate-floaty rotate-3">
             <Award className="w-12 h-12 text-white drop-shadow" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Coming Soon! 🚀</h3>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-semibold">
            A fun space to show off your awesome work and cheer on your friends. Stay tuned! ⭐
          </p>
       </div>
    </div>
  );
};

const ProfileModal: React.FC<{ user: User; onClose: () => void; onLogout: () => void }> = ({ user, onClose, onLogout }) => (
  <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
    <div 
      className="bg-white w-full max-w-md sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom-10 duration-300 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">My Profile 🙂</h2>
        <button 
          onClick={onClose} 
          className="p-2 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-500 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 rounded-[1.75rem] border-4 border-white shadow-xl overflow-hidden mb-3 relative rotate-3 ring-4 ring-amber-300/40">
           <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 text-center">{user.name}</h2>
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold mt-2 tracking-wide uppercase ${
          user.role === UserRole.STUDENT ? 'bg-mmes-pale text-mmes' : 'bg-gray-100 text-gray-700'
        }`}>
          {user.role}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {user.role === UserRole.STUDENT ? (
          <>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Class & Section</span>
              <span className="text-sm font-bold text-gray-900">{(user as Student).classGrade} - {(user as Student).section}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Roll Number</span>
              <span className="text-sm font-bold text-gray-900">{(user as Student).rollNumber}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Stream</span>
              <span className="text-sm font-bold text-gray-900">{(user as Student).stream || 'N/A'}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Employee ID</span>
              <span className="text-sm font-bold text-gray-900">{user.id}</span>
            </div>
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Department</span>
              <span className="text-sm font-bold text-gray-900">{(user as Teacher).subject}</span>
            </div>
          </>
        )}
      </div>

      <button 
        onClick={onLogout}
        className="w-full py-3.5 rounded-xl bg-red-50 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors text-sm"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  </div>
);

const RankModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState<'class' | 'exam' | 'leaderboard'>('class');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);

  const classes = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  const exams = ['Mid term', 'Quarterly', 'Halfyearly'];

  const leaderboardData = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    name: `Student ${i + 1}`,
    score: 500 - (i * 5) - Math.floor(Math.random() * 5),
    total: 500
  }));

  const handleClassSelect = (cls: string) => {
    setSelectedClass(cls);
    setStep('exam');
  };

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setStep('leaderboard');
  };

  const handleBack = () => {
    if (step === 'leaderboard') setStep('exam');
    else if (step === 'exam') setStep('class');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#eef4ff] via-white to-[#fdf1f7] flex flex-col animate-zoom-in origin-center">
      <div className="absolute top-0 right-0 w-80 h-80 -mr-20 -mt-20 bg-yellow-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 -ml-16 -mb-16 bg-orange-500 rounded-full opacity-10 blur-3xl pointer-events-none animate-blob"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-20 px-5 pt-12 pb-4 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step !== 'class' ? (
              <button 
                onClick={handleBack}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors mr-1"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            ) : (
              <div className="p-2.5 rounded-xl bg-yellow-50 text-yellow-600">
                  <Trophy className="w-6 h-6" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                {step === 'class' ? 'Select Class' : step === 'exam' ? `Class ${selectedClass}` : `${selectedExam} Ranks`}
              </h2>
              <p className="text-xs font-medium text-gray-500 mt-0.5">
                {step === 'class' ? 'Choose a grade to view ranks' : step === 'exam' ? 'Select an examination' : `Top 20 Performers - Class ${selectedClass}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 bg-gray-100 border border-gray-200 rounded-full hover:bg-gray-200 active:scale-95 transition-all cursor-pointer shadow-sm text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-5">
        {step === 'class' && (
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            {classes.map((cls, index) => (
              <button
                key={cls}
                onClick={() => handleClassSelect(cls)}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-yellow-200 hover:shadow-md transition-all active:scale-95 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-lg font-bold text-gray-900">{cls}</span>
              </button>
            ))}
          </div>
        )}

        {step === 'exam' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            {exams.map((exam, index) => (
              <button
                key={exam}
                onClick={() => handleExamSelect(exam)}
                className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-yellow-200 hover:shadow-md transition-all active:scale-98"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-gray-900">{exam}</h3>
                    <p className="text-xs text-gray-500">Recent Examination</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        )}

        {step === 'leaderboard' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-20">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Top 20 Rankings</h3>
                  <p className="text-yellow-100 text-xs font-bold uppercase tracking-wider">{selectedExam} • Class {selectedClass}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {leaderboardData.map((student, index) => (
                <div 
                  key={student.rank}
                  className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 ${index < 3 ? 'ring-2 ring-yellow-400/20' : ''}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                      index === 0 ? 'bg-yellow-400 text-white shadow-lg shadow-yellow-200' :
                      index === 1 ? 'bg-gray-300 text-white shadow-lg shadow-gray-200' :
                      index === 2 ? 'bg-amber-600 text-white shadow-lg shadow-amber-200' :
                      'bg-gray-50 text-gray-400'
                    }`}>
                      {index === 0 ? <Medal className="w-5 h-5" /> : student.rank}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{student.name}</h4>
                      <p className="text-[10px] text-gray-500 font-medium">Class {selectedClass}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-gray-900">{student.score}</span>
                    <span className="text-[10px] text-gray-400 font-medium block">/ {student.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Dashboard Component ---

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showHomework, setShowHomework] = useState(false);
  const [showTimetable, setShowTimetable] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [showFees, setShowFees] = useState(false);
  const [showCamConnect, setShowCamConnect] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showCirculars, setShowCirculars] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showUploadHomework, setShowUploadHomework] = useState(false);
  const [showUploadMarks, setShowUploadMarks] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Determine greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  // Mock attendance data handling
  // Mock data handling
  const attendancePercentage = user.role === UserRole.STUDENT 
    ? (user as Student).attendanceRate 
    : 98; // Faculty attendance
  
  const pendingHomeworkCount = MOCK_HOMEWORK.filter(h => h.status === 'Pending').length;

  return (
    <div className="min-h-screen pb-20 relative overflow-x-hidden" style={{backgroundColor: '#f5f7f2'}}>
      
      {/* 1. Header Section — MMES Dark Gradient */}
      <header className="px-5 pt-10 pb-5 mmes-header-grad sticky top-0 z-30 shadow-[0_4px_24px_-4px_rgba(26,26,26,0.45)] rounded-b-[1.75rem]">
        <div className="flex justify-between items-center">
          {/* Logo + School name */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white/20 shadow-inner bg-white/10 flex items-center justify-center shrink-0">
              <img src="/mmes-logo.png" alt="MMES" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-white/60 text-[9px] font-bold tracking-[0.18em] uppercase block leading-none">{greeting} 👋</span>
              <h1 className="text-lg font-extrabold text-white tracking-tight leading-tight">
                {user.name.split(' ')[0]}<span className="text-mmes-gold">!</span>
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/80 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-400 rounded-full border-2 border-transparent"></span>
            </button>
            
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="w-10 h-10 rounded-full border-2 shadow-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 focus:outline-none border-mmes-gold"
            >
              <img src={user.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-5 py-5 max-w-md mx-auto space-y-6">
        
        {/* 2. Academics Grid */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-extrabold text-gray-800">
              {user.role === UserRole.STUDENT ? '🎨 My Learning' : '🧑‍🏫 Faculty Tools'}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {user.role === UserRole.STUDENT ? (
              <>
                <FeatureCard
                  title="Attendance"
                  subtitle="View Reports"
                  icon={<Calendar />}
                  gradient="from-sky-400 to-blue-500"
                  emoji="📅"
                  delayMs={60}
                  onClick={() => setShowAttendance(true)}
                />
                <FeatureCard
                  title="Homework"
                  subtitle={`${pendingHomeworkCount} to do`}
                  icon={<BookOpen />}
                  gradient="from-violet-400 to-purple-500"
                  emoji="📚"
                  delayMs={120}
                  onClick={() => setShowHomework(true)}
                />
                <FeatureCard
                  title="Time Table"
                  subtitle="Class Schedule"
                  icon={<Clock />}
                  gradient="from-teal-400 to-emerald-500"
                  emoji="⏰"
                  delayMs={180}
                  onClick={() => setShowTimetable(true)}
                />
                <FeatureCard
                  title="Results"
                  subtitle="Term Exams"
                  icon={<Award />}
                  gradient="from-amber-400 to-orange-500"
                  emoji="🌟"
                  delayMs={240}
                  onClick={() => setShowResults(true)}
                />
                <FeatureCard
                  title="Assignments"
                  subtitle="Projects & Tasks"
                  icon={<ClipboardList />}
                  gradient="from-pink-400 to-rose-500"
                  emoji="✏️"
                  delayMs={300}
                  onClick={() => setShowAssignments(true)}
                />
                <FeatureCard
                  title="Fees"
                  subtitle="Payment Status"
                  icon={<CreditCard />}
                  gradient="from-lime-400 to-green-500"
                  emoji="💰"
                  delayMs={360}
                  onClick={() => setShowFees(true)}
                />
                <FeatureCard
                  title="Rank"
                  subtitle="Top Performers"
                  icon={<Trophy />}
                  gradient="from-yellow-400 to-amber-500"
                  emoji="🏆"
                  delayMs={420}
                  onClick={() => setShowRank(true)}
                />
              </>
            ) : (
              <>
                <FeatureCard
                  title="Attendance"
                  subtitle="View Reports"
                  icon={<Calendar />}
                  gradient="from-sky-400 to-blue-500"
                  emoji="📅"
                  delayMs={60}
                  onClick={() => setShowAttendance(true)}
                />
                <FeatureCard
                  title="Time Table"
                  subtitle="Faculty Schedule"
                  icon={<Clock />}
                  gradient="from-teal-400 to-emerald-500"
                  emoji="⏰"
                  delayMs={120}
                  onClick={() => setShowTimetable(true)}
                />
                <FeatureCard
                  title="Upload Homework"
                  subtitle="Assign Tasks"
                  icon={<Upload />}
                  gradient="from-violet-400 to-purple-500"
                  emoji="📚"
                  delayMs={180}
                  onClick={() => setShowUploadHomework(true)}
                />
                <FeatureCard
                  title="Upload Marks"
                  subtitle="Results Entry"
                  icon={<Award />}
                  gradient="from-amber-400 to-orange-500"
                  emoji="🌟"
                  delayMs={240}
                  onClick={() => setShowUploadMarks(true)}
                />
                <FeatureCard
                  title="Upload Assignment"
                  subtitle="Manage Projects"
                  icon={<ClipboardList />}
                  gradient="from-pink-400 to-rose-500"
                  emoji="✏️"
                  delayMs={300}
                  onClick={() => setShowAssignments(true)}
                />
              </>
            )}
          </div>
        </section>

        {/* 3. Community & Campus */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-lg font-extrabold text-gray-800">🎪 Community & Campus</h2>
          </div>
          
          <div className="space-y-3">
             {/* Upcoming Events */}
             <button
                onClick={() => setShowEvents(true)}
                className="w-full bg-white p-3.5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3 transition-transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98"
             >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-400 to-red-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-extrabold text-gray-900">Upcoming Events 🎉</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Annual Sports Day • Next Friday</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
             </button>

             {/* Circulars - Full Width */}
             <button
               onClick={() => setShowCirculars(true)}
               className="w-full bg-white p-3.5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-3 transition-transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-98"
             >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-extrabold text-gray-900">Circulars 📢</h3>
                  <p className="text-[11px] text-gray-500 font-semibold">Official Notices & Updates</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
             </button>
          </div>
        </section>

        {/* School Info Footer */}
        <div className="flex items-center justify-center gap-2.5 mt-6 pb-6">
          <div className="w-6 h-6 overflow-hidden opacity-70">
            <img 
              src="/mmes-logo.png" 
              alt="MMES Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{color: '#3d6b10', opacity: 0.7}}>MMES PUBLIC School</span>
        </div>
      </main>


      {/* Modals */}
      {isProfileOpen && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} onLogout={onLogout} />}
      {showAttendance && <AttendanceModal percentage={attendancePercentage} onClose={() => setShowAttendance(false)} />}
      {showHomework && <HomeworkModal onClose={() => setShowHomework(false)} />}
      {showTimetable && <TimetableModal user={user} onClose={() => setShowTimetable(false)} />}
      {showResults && <ResultsModal onClose={() => setShowResults(false)} />}
      {showAssignments && <AssignmentsModal user={user} onClose={() => setShowAssignments(false)} />}
      {showFees && <FeesModal onClose={() => setShowFees(false)} />}

      {showEvents && <EventsModal onClose={() => setShowEvents(false)} />}
      {showCirculars && <CircularsModal onClose={() => setShowCirculars(false)} />}
      {showRank && <RankModal onClose={() => setShowRank(false)} />}
      {showUploadHomework && <UploadHomeworkModal onClose={() => setShowUploadHomework(false)} />}
      {showUploadMarks && <UploadMarksModal user={user} onClose={() => setShowUploadMarks(false)} />}
    </div>
  );
};