import { differenceInCalendarDays, formatISO } from 'date-fns'
import type {
  DayPlan,
  Lesson,
  LessonAttempt,
  TrackPlan,
  TrackProgressSummary,
  DayProgressSummary,
} from '@/lib/types/training'

const baseDate = new Date('2024-03-01T09:00:00Z')

const lessonsDay1: Lesson[] = [
  {
    id: 'day-1-video-culture',
    dayId: 'day-1',
    order: 1,
    title: 'Культура сервісу «Галя Балувана»',
    type: 'video',
    durationMinutes: 6,
    summary: 'Знайомство зі стандартами гостинності і брендовими обіцянками.',
    kind: 'video',
    data: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      platform: 'youtube',
      transcript:
        'Що означає гостинність у кожній зміні і які фрази допомагають створити перше враження.',
      thumbnailUrl: '/images/lessons/day1-video.jpg',
    },
  },
  {
    id: 'day-1-quiz-service',
    dayId: 'day-1',
    order: 2,
    title: 'Мікро-тест: стандарти сервісу',
    type: 'quiz',
    durationMinutes: 4,
    summary: 'Перевіряємо ключові правила спілкування з відвідувачем.',
    kind: 'quiz',
    data: {
      passingScore: 3,
      maxAttempts: 2,
      questions: [
        {
          id: 'service-1',
          prompt: 'Яка фраза найкраще відкриває розмову із гостем?',
          options: [
            { id: 'a', text: 'Вам щось треба?', isCorrect: false },
            { id: 'b', text: 'Доброго дня! Чим можу допомогти?', isCorrect: true, feedback: 'Привітання + пропозиція допомоги.' },
            { id: 'c', text: 'Акція сьогодні на ковбасу.', isCorrect: false },
          ],
        },
        {
          id: 'service-2',
          prompt: 'Що робимо, якщо покупець не хоче допомоги?',
          options: [
            { id: 'a', text: 'Ігноруємо гостя.', isCorrect: false },
            {
              id: 'b',
              text: 'Залишаємо простір і пропонуємо звертатись у будь-який момент.',
              isCorrect: true,
              feedback: 'Показуємо готовність повернутись до діалогу.',
            },
            { id: 'c', text: 'Відходимо і не підходимо більше.', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    id: 'day-1-roleplay-greeting',
    dayId: 'day-1',
    order: 3,
    title: 'Симуляція: перше знайомство',
    type: 'roleplay',
    durationMinutes: 5,
    summary: 'Тренуємо тепле вітання та уточнюємо потребу клієнта.',
    kind: 'roleplay',
    data: {
      scenario: 'Новий клієнт заходить у магазин під час ранкової зміни.',
      objective: 'Продемонструвати впевнене привітання та активне слухання.',
      steps: [
        {
          id: 'step-1',
          actor: 'customer',
          text: 'Добрий день... я вперше у вас.',
        },
        {
          id: 'step-2',
          actor: 'trainee',
          text: 'Вітаємо! Мене звати Оксана, я допоможу вам знайти потрібне.',
          hint: 'Представтесь і створіть дружню атмосферу.',
        },
        {
          id: 'step-3',
          actor: 'customer',
          text: 'Я шукаю щось до ранкової кави.',
        },
      ],
      evaluationCriteria: [
        'Привітання протягом перших 5 секунд',
        'Пропозиція допомоги з іменем',
        'Уточнення очікувань клієнта',
      ],
    },
  },
  {
    id: 'day-1-checklist-hygiene',
    dayId: 'day-1',
    order: 4,
    title: 'Чек-лист: гігієна та форма',
    type: 'checklist',
    durationMinutes: 3,
    summary: 'Фото-звіт та самооцінка зовнішнього вигляду перед зміною.',
    kind: 'checklist',
    data: {
      instructions: 'Перед початком зміни зафіксуйте, що форма відповідає стандарту.',
      locationContext: 'Службова кімната',
      items: [
        { id: 'item-1', label: 'Форма чиста й випрасувана', requiresPhoto: true },
        { id: 'item-2', label: 'Значок з іменем на видному місці', requiresPhoto: false },
        { id: 'item-3', label: 'Волосся зібране/прикрите відповідно до норм', requiresPhoto: true },
      ],
    },
  },
]

const lessonsDay2: Lesson[] = [
  {
    id: 'day-2-video-categories',
    dayId: 'day-2',
    order: 1,
    title: 'Категорії магазину: хліб, молочка, фреш',
    type: 'video',
    durationMinutes: 7,
    summary: 'Розкладаємо зони магазину і пріоритети поповнення.',
    kind: 'video',
    data: {
      url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
      platform: 'youtube',
      transcript: 'Основні SKU кожної категорії та сезонні поради.',
      thumbnailUrl: '/images/lessons/day2-video.jpg',
    },
  },
  {
    id: 'day-2-checklist-planogram',
    dayId: 'day-2',
    order: 2,
    title: 'Фото-планограма: хлібний відділ',
    type: 'checklist',
    durationMinutes: 6,
    summary: 'Закріплюємо стандарт викладки через фото-доказ.',
    kind: 'checklist',
    data: {
      instructions: 'Зробіть фото кожної полиці та відзначте ключові SKU.',
      locationContext: 'Торгова зала',
      items: [
        { id: 'item-1', label: 'Вся викладка відповідає планограмі', requiresPhoto: true },
        { id: 'item-2', label: 'Акційні цінники на місці', requiresPhoto: true },
        { id: 'item-3', label: 'Запас на підсобці перевірений', requiresPhoto: false },
      ],
    },
  },
  {
    id: 'day-2-sku-scanner',
    dayId: 'day-2',
    order: 3,
    title: 'Скануємо 3 SKU дня',
    type: 'sku',
    durationMinutes: 5,
    summary: 'Вивчаємо ключові SKU та аргументи продажу.',
    kind: 'sku',
    data: {
      instructions: 'Відскануйте товари тижня і збережіть нотатки про аргументи продажу.',
      requiredSkuIds: ['4820000000017', '4820000000451', '4820000000780'],
      successCriteria: [
        'Вірно визначені SKU',
        'Додані аргументи для кожного товару',
        'Фото полки з акційними товарами',
      ],
    },
  },
]

const lessonsDay3: Lesson[] = [
  {
    id: 'day-3-video-cross-sell',
    dayId: 'day-3',
    order: 1,
    title: 'Техніки крос-продажу',
    type: 'video',
    durationMinutes: 5,
    summary: 'Як збільшити середній чек, пропонуючи додаткові товари.',
    kind: 'video',
    data: {
      url: 'https://www.youtube.com/watch?v=6_b7RDuLwcI',
      platform: 'youtube',
      transcript: 'Скрипти пропозицій до кави, сніданку та вечері.',
      thumbnailUrl: '/images/lessons/day3-video.jpg',
    },
  },
  {
    id: 'day-3-roleplay-hesitation',
    dayId: 'day-3',
    order: 2,
    title: 'Симуляція: клієнт вагається',
    type: 'roleplay',
    durationMinutes: 6,
    summary: 'Вчимося слухати сумніви гостя та пропонувати рішення.',
    kind: 'roleplay',
    data: {
      scenario: 'Гість не впевнений, чи брати свіжі десерти до кави.',
      objective: 'Підібрати альтернативи і довести цінність пропозиції.',
      steps: [
        { id: 'step-1', actor: 'customer', text: 'Я не впевнений, чи воно свіже...' },
        {
          id: 'step-2',
          actor: 'trainee',
          text: 'Ми отримали поставку зранку. Можу запропонувати вам...',
          hint: 'Підкресліть свіжість і підберіть пару до кави.',
        },
      ],
      evaluationCriteria: [
        'Виявлення сумніву клієнта',
        'Підкріплення пропозиції фактами',
        'Фінальне уточнення рішення',
      ],
    },
  },
  {
    id: 'day-3-quiz-cross-sell',
    dayId: 'day-3',
    order: 3,
    title: 'Квіз: комплектуємо кошик',
    type: 'quiz',
    durationMinutes: 4,
    summary: 'Визначаємо найкращі пари товарів до основної покупки.',
    kind: 'quiz',
    data: {
      passingScore: 3,
      maxAttempts: 3,
      questions: [
        {
          id: 'cross-1',
          prompt: 'Що запропонувати до зернової кави в зернах?',
          options: [
            { id: 'a', text: 'Мило для рук', isCorrect: false },
            { id: 'b', text: 'Свіжі круасани', isCorrect: true },
            { id: 'c', text: 'Пакет для сміття', isCorrect: false },
          ],
        },
      ],
    },
  },
]

const lessonsDay4: Lesson[] = [
  {
    id: 'day-4-video-objections',
    dayId: 'day-4',
    order: 1,
    title: 'Працюємо з запереченням «дорого»',
    type: 'video',
    durationMinutes: 6,
    summary: 'Фокус на цінності, а не ціні.',
    kind: 'video',
    data: {
      url: 'https://www.youtube.com/watch?v=oHg5SJYRHA0',
      platform: 'youtube',
      transcript: 'Техніка sandwich та соціальні докази.',
      thumbnailUrl: '/images/lessons/day4-video.jpg',
    },
  },
  {
    id: 'day-4-roleplay-objection',
    dayId: 'day-4',
    order: 2,
    title: 'Role-play: «У мене немає часу»',
    type: 'roleplay',
    durationMinutes: 7,
    summary: 'Вчимося стисло й переконливо пропонувати рішення.',
    kind: 'roleplay',
    data: {
      scenario: 'Клієнт поспішає й сумнівається, чи брати акційний набір.',
      objective: 'Зробити релевантну пропозицію до 30 секунд.',
      steps: [
        { id: 'step-1', actor: 'customer', text: 'Я не маю часу слухати про знижки.' },
        {
          id: 'step-2',
          actor: 'trainee',
          text: 'Розумію вас. За 10 секунд покажу пропозицію, яка зекономить вам час і гроші.',
        },
      ],
      evaluationCriteria: [
        'Визнання заперечення',
        'Пропозиція з вигодою',
        'Фінальне підтвердження',
      ],
    },
  },
  {
    id: 'day-4-quiz-objections',
    dayId: 'day-4',
    order: 3,
    title: 'Мікро-квіз: розбираємо ситуації',
    type: 'quiz',
    durationMinutes: 5,
    summary: 'Три кейси на відпрацювання заперечень.',
    kind: 'quiz',
    data: {
      passingScore: 2,
      maxAttempts: 3,
      questions: [
        {
          id: 'obj-1',
          prompt: 'Клієнт каже «дорого». Що відповісти?',
          options: [
            { id: 'a', text: 'У нас така ціна.', isCorrect: false },
            {
              id: 'b',
              text: 'Ця ціна включає доставку з ферми за 12 годин.',
              isCorrect: true,
              feedback: 'Посилаємось на цінність.',
            },
            { id: 'c', text: 'Можу дати знижку зі своєї зарплати.', isCorrect: false },
          ],
        },
      ],
    },
  },
]

const lessonsDay5: Lesson[] = [
  {
    id: 'day-5-video-promo',
    dayId: 'day-5',
    order: 1,
    title: 'Акція тижня: набір «Сніданок чемпіона»',
    type: 'video',
    durationMinutes: 4,
    summary: 'Розбираємо склад набору і ключові вигоди.',
    kind: 'video',
    data: {
      url: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
      platform: 'youtube',
      transcript: 'Чому набір вигідний для родин і поціновувачів спорту.',
      thumbnailUrl: '/images/lessons/day5-video.jpg',
    },
  },
  {
    id: 'day-5-roleplay-promo',
    dayId: 'day-5',
    order: 2,
    title: 'Симуляція: пропонуємо акційний товар',
    type: 'roleplay',
    durationMinutes: 6,
    summary: 'Вміємо показати користь і створити терміновість.',
    kind: 'roleplay',
    data: {
      scenario: 'Постійний гість проходить повз акційну викладку.',
      objective: 'Сформувати пропозицію, що відповідає його звичкам.',
      steps: [
        { id: 'step-1', actor: 'trainee', text: 'Пане Олеже, зверніть увагу на наш новий набір...' },
        {
          id: 'step-2',
          actor: 'customer',
          text: 'Мені це не потрібно.',
        },
        {
          id: 'step-3',
          actor: 'trainee',
          text: 'Для вашої родини це економія 18% на звичних продуктах + бонуси.',
        },
      ],
      evaluationCriteria: [
        'Персоналізація пропозиції',
        'Вигода в цифрах',
        'Призив до дії',
      ],
    },
  },
  {
    id: 'day-5-checklist-merchandising',
    dayId: 'day-5',
    order: 3,
    title: 'Чек-лист викладки акції',
    type: 'checklist',
    durationMinutes: 5,
    summary: 'Перевіряємо POS-матеріали та запас.',
    kind: 'checklist',
    data: {
      instructions: 'Завантажте фото викладки до та після корекції.',
      items: [
        { id: 'item-1', label: 'POS-матеріали на місці', requiresPhoto: true },
        { id: 'item-2', label: 'Запас у холодильнику поповнений', requiresPhoto: false },
        { id: 'item-3', label: 'Є цінник зі знижкою', requiresPhoto: true },
      ],
    },
  },
]

const lessonsDay6: Lesson[] = [
  {
    id: 'day-6-exam-quiz',
    dayId: 'day-6',
    order: 1,
    title: 'Фінальний квіз «Галя PRO»',
    type: 'quiz',
    durationMinutes: 8,
    summary: 'Комплексний тест з попередніх тем.',
    kind: 'quiz',
    data: {
      passingScore: 8,
      maxAttempts: 2,
      questions: [
        {
          id: 'final-1',
          prompt: 'Що робимо, якщо клієнт сумнівається через ціну?',
          options: [
            { id: 'a', text: 'Ігноруємо заперечення.', isCorrect: false },
            { id: 'b', text: 'Підкреслюємо цінність і наводимо приклад.', isCorrect: true },
            { id: 'c', text: 'Змінюємо тему.', isCorrect: false },
          ],
        },
      ],
    },
  },
  {
    id: 'day-6-roleplay-exam',
    dayId: 'day-6',
    order: 2,
    title: 'Role-play: «Комплексна ситуація»',
    type: 'roleplay',
    durationMinutes: 8,
    summary: 'Поєднуємо вітання, вияв потреби й пропозицію акції.',
    kind: 'roleplay',
    data: {
      scenario: 'Сімейна пара хоче швидко зібрати продукти на вечірку.',
      objective: 'Виявити потреби та запропонувати вигідну комбінацію товарів.',
      steps: [
        { id: 'step-1', actor: 'customer', text: 'Нам потрібні закуски, але часу мало.' },
        {
          id: 'step-2',
          actor: 'trainee',
          text: 'Я підкажу, що взяти. Скільки гостей очікуєте?',
        },
      ],
      evaluationCriteria: [
        'Чітке виявлення потреб',
        'Пропозиція з декількох категорій',
        'Закриття продажу з акцією тижня',
      ],
    },
  },
  {
    id: 'day-6-checklist-certification',
    dayId: 'day-6',
    order: 3,
    title: 'Чек-лист фінального дня',
    type: 'checklist',
    durationMinutes: 4,
    summary: 'Фіксуємо результати і запит на сертифікацію.',
    kind: 'checklist',
    data: {
      instructions: 'Завантажте фото сертифіката та напишіть короткий відгук.',
      items: [
        { id: 'item-1', label: 'Фото з бейджем випускника', requiresPhoto: true },
        { id: 'item-2', label: 'Заповнений чек-лист наставника', requiresPhoto: false },
      ],
    },
  },
]

const days: DayPlan[] = [
  { id: 'day-1', dayIndex: 1, title: 'День 1. Гість завжди правий', focus: 'Сервіс та привітання', lessons: lessonsDay1 },
  { id: 'day-2', dayIndex: 2, title: 'День 2. Категорії та викладка', focus: 'Знання полиць', lessons: lessonsDay2 },
  { id: 'day-3', dayIndex: 3, title: 'День 3. Крос-продаж', focus: 'Додаємо до кошика', lessons: lessonsDay3 },
  { id: 'day-4', dayIndex: 4, title: 'День 4. Робота із запереченнями', focus: 'Перемагаємо сумніви', lessons: lessonsDay4 },
  { id: 'day-5', dayIndex: 5, title: 'День 5. Акція тижня', focus: 'Просуваємо промо', lessons: lessonsDay5 },
  { id: 'day-6', dayIndex: 6, title: 'День 6. Фінальний іспит', focus: 'Підсумовуємо навички', lessons: lessonsDay6 },
]

export const sixDayOnboardingTrack: TrackPlan = {
  id: 'track-six-day-onboarding',
  slug: 'six-day-onboarding',
  title: '6-денний онбординг продавця',
  description:
    'Комбінує відео, квізи, рольові ігри, чек-листи та роботу зі SKU, щоб сформувати впевнені навички за перший тиждень.',
  targetRoles: ['trainee'],
  days,
}

export const demoAttempts: LessonAttempt[] = [
  {
    id: 'attempt-1',
    lessonId: 'day-1-video-culture',
    status: 'passed',
    score: 1,
    maxScore: 1,
    updatedAt: formatISO(baseDate),
  },
  {
    id: 'attempt-2',
    lessonId: 'day-1-quiz-service',
    status: 'passed',
    score: 4,
    maxScore: 4,
    updatedAt: formatISO(baseDate),
  },
  {
    id: 'attempt-3',
    lessonId: 'day-1-roleplay-greeting',
    status: 'passed',
    score: 85,
    maxScore: 100,
    feedback: 'Чудове привітання! Попрацюй над завершенням діалогу.',
    updatedAt: formatISO(baseDate),
  },
  {
    id: 'attempt-4',
    lessonId: 'day-1-checklist-hygiene',
    status: 'passed',
    updatedAt: formatISO(baseDate),
  },
  {
    id: 'attempt-5',
    lessonId: 'day-2-video-categories',
    status: 'passed',
    score: 1,
    maxScore: 1,
    updatedAt: formatISO(baseDate),
  },
  {
    id: 'attempt-6',
    lessonId: 'day-2-checklist-planogram',
    status: 'in_progress',
    updatedAt: formatISO(new Date(baseDate.getTime() + 1000 * 60 * 60)),
  },
  {
    id: 'attempt-7',
    lessonId: 'day-3-video-cross-sell',
    status: 'not_started',
    updatedAt: formatISO(new Date(baseDate.getTime() + 1000 * 60 * 120)),
  },
]

export function getDemoTrack(): TrackPlan {
  return sixDayOnboardingTrack
}

export function getDemoAttempts(): LessonAttempt[] {
  return demoAttempts
}

export function calculateDayProgress(day: DayPlan, attempts: LessonAttempt[]): DayProgressSummary {
  const totalLessons = day.lessons.length
  let completedLessons = 0
  let failedLessons = 0
  let nextLessonId: string | undefined

  day.lessons.forEach((lesson) => {
    const attempt = attempts.find((item) => item.lessonId === lesson.id)

    if (!attempt) {
      if (!nextLessonId) {
        nextLessonId = lesson.id
      }
      return
    }

    if (attempt.status === 'passed') {
      completedLessons += 1
    } else if (attempt.status === 'failed') {
      failedLessons += 1
      if (!nextLessonId) {
        nextLessonId = lesson.id
      }
    } else if (attempt.status === 'in_progress' && !nextLessonId) {
      nextLessonId = lesson.id
    }
  })

  const status: DayProgressSummary['status'] =
    completedLessons === totalLessons
      ? 'passed'
      : completedLessons > 0 || failedLessons > 0
        ? 'in_progress'
        : 'not_started'

  return {
    totalLessons,
    completedLessons,
    failedLessons,
    status,
    nextLessonId,
  }
}

export function calculateTrackProgress(track: TrackPlan, attempts: LessonAttempt[]): TrackProgressSummary {
  const totals = track.days.reduce(
    (acc, day) => {
      const dayProgress = calculateDayProgress(day, attempts)
      acc.totalLessons += dayProgress.totalLessons
      acc.completedLessons += dayProgress.completedLessons
      acc.failedLessons += dayProgress.failedLessons

      if (!acc.activeDayId && dayProgress.status !== 'passed') {
        acc.activeDayId = day.id
      }

      return acc
    },
    { totalLessons: 0, completedLessons: 0, failedLessons: 0, activeDayId: undefined as string | undefined }
  )

  const completionRate = totals.totalLessons === 0 ? 0 : Math.round((totals.completedLessons / totals.totalLessons) * 100)

  return {
    totalLessons: totals.totalLessons,
    completedLessons: totals.completedLessons,
    failedLessons: totals.failedLessons,
    activeDayId: totals.activeDayId,
    completionRate,
  }
}

export function getSuggestedRetryDate(attempt?: LessonAttempt | null) {
  if (!attempt?.retryAfter) {
    return null
  }

  const retryDate = new Date(attempt.retryAfter)
  const daysUntilRetry = differenceInCalendarDays(retryDate, new Date())

  return daysUntilRetry <= 0 ? 'Сьогодні' : `Через ${daysUntilRetry} дн.`
}
