export type Role = 'trainee' | 'mentor' | 'admin'

export type LessonType = 'video' | 'quiz' | 'roleplay' | 'checklist' | 'sku'

export interface BaseLesson {
  id: string
  dayId: string
  order: number
  title: string
  type: LessonType
  durationMinutes: number
  summary?: string
}

export interface VideoLessonPayload {
  url: string
  platform: 'youtube' | 'vimeo' | 'file'
  transcript?: string
  thumbnailUrl?: string
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
  feedback?: string
}

export interface QuizQuestion {
  id: string
  prompt: string
  options: QuizOption[]
  rationale?: string
}

export interface QuizPayload {
  questions: QuizQuestion[]
  passingScore: number
  maxAttempts: number
}

export interface RoleplayStep {
  id: string
  actor: 'trainee' | 'customer'
  text: string
  hint?: string
}

export interface RoleplayPayload {
  scenario: string
  objective: string
  steps: RoleplayStep[]
  evaluationCriteria: string[]
}

export interface ChecklistItem {
  id: string
  label: string
  requiresPhoto?: boolean
  helperText?: string
}

export interface ChecklistPayload {
  instructions: string
  items: ChecklistItem[]
  locationContext?: string
}

export interface SkuActivityPayload {
  requiredSkuIds: string[]
  instructions: string
  successCriteria: string[]
}

export type LessonPayload =
  | { kind: 'video'; data: VideoLessonPayload }
  | { kind: 'quiz'; data: QuizPayload }
  | { kind: 'roleplay'; data: RoleplayPayload }
  | { kind: 'checklist'; data: ChecklistPayload }
  | { kind: 'sku'; data: SkuActivityPayload }

export type Lesson = BaseLesson & LessonPayload

export interface DayPlan {
  id: string
  dayIndex: number
  title: string
  focus: string
  lessons: Lesson[]
}

export interface TrackPlan {
  id: string
  slug: string
  title: string
  description: string
  targetRoles: Role[]
  days: DayPlan[]
}

export type AttemptStatus = 'not_started' | 'in_progress' | 'passed' | 'failed'

export interface LessonAttempt {
  id: string
  lessonId: string
  status: AttemptStatus
  score?: number
  maxScore?: number
  feedback?: string
  retryAfter?: string
  updatedAt: string
}

export interface DayProgressSummary {
  totalLessons: number
  completedLessons: number
  failedLessons: number
  status: AttemptStatus
  nextLessonId?: string
}

export interface TrackProgressSummary {
  totalLessons: number
  completedLessons: number
  failedLessons: number
  activeDayId?: string
  completionRate: number
}
