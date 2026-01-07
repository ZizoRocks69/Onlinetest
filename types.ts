
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  subject: string;
  date: string;
  priority: Priority;
  completed: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  status: 'new' | 'learning' | 'learned';
  lastReviewed?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  score?: number;
  total?: number;
  date: string;
}

export interface StudyPlan {
  topic: string;
  plan: {
    phase: string;
    description: string;
    technique: string;
    duration: string;
  }[];
  summary: string;
}

export interface StudyLog {
  date: string;
  hours: number;
  tasksCompleted: number;
}

export interface UserStats {
  streak: number;
  totalQuizzes: number;
  totalStudyHours: number;
  completedTopics: number;
}
