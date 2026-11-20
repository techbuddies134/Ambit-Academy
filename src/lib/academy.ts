import type { AcademyProgram } from '@/db/schema';

export const academy = {
  // email hata diya gaya hai
  phone: '+92 301 3178389', 
  phoneHref: 'tel:+923013178389',
  location: 'Chungi no. 6, Barkat Town, Near Govt College (Boys), Daska',
  hours: 'Monday–Saturday, 9 am–6 pm', 
  session: '2026–27',
};

export const programmes: AcademyProgram[] = [
  {
    slug: 'primary-years', title: 'Primary Years', gradeFrom: 1, gradeTo: 5, stage: 'Foundation',
    summary: 'Strong foundations through playful, hands-on learning.',
    introduction: 'A welcoming first step for curious learners. Children build confident reading, number sense, and an understanding of the world through stories, games, and guided discovery.',
    subjects: ['Mathematics', 'English', 'General Science', 'Urdu'],
    outcomes: ['Read with understanding and express ideas in complete sentences.', 'Explore number patterns and solve everyday maths problems.', 'Ask questions, observe carefully, and share discoveries with others.'],
    sessions: [{ days: 'Monday', time: '3:00–4:00 pm', focus: 'Number explorers' }, { days: 'Wednesday', time: '3:00–4:00 pm', focus: 'Reading & expression' }, { days: 'Friday', time: '3:00–4:00 pm', focus: 'Discovery workshop' }],
    duration: 60, image: '/academy/primary.webp', theme: 'lilac', position: 1,
  },
  {
    slug: 'middle-school', title: 'Middle School', gradeFrom: 6, gradeTo: 8, stage: 'Discovery',
    summary: 'Deeper understanding for growing, inquisitive minds.',
    introduction: 'Turn big questions into independent thinking. Subject-focused teaching and collaborative projects connect classroom concepts to the world beyond the textbook.',
    subjects: ['Mathematics', 'English', 'Science', 'Computer Studies'],
    outcomes: ['Build algebra, geometry, and reasoning skills through visual models.', 'Plan investigations and explain scientific ideas with evidence.', 'Present an argument, work in teams, and manage independent projects.'],
    sessions: [{ days: 'Tuesday', time: '4:00–5:15 pm', focus: 'Maths & reasoning' }, { days: 'Thursday', time: '4:00–5:15 pm', focus: 'Science & computing' }, { days: 'Saturday', time: '4:00–5:15 pm', focus: 'Communication lab' }],
    duration: 75, image: '/academy/middle.webp', theme: 'mint', position: 2,
  },
  {
    slug: 'senior-school', title: 'Senior School', gradeFrom: 9, gradeTo: 12, stage: 'Mastery',
    summary: 'Focused learning and confident exam preparation.',
    introduction: 'A structured path from subject mastery to exam confidence. Small-group coaching, worked examples, and regular practice help students connect concepts and find their own study rhythm.',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
    outcomes: ['Break complex problems into clear, manageable steps.', 'Apply concepts to exam-style questions and timed practice.', 'Create a personal revision plan using useful, regular feedback.'],
    sessions: [{ days: 'Monday', time: '4:30–6:00 pm', focus: 'Advanced mathematics' }, { days: 'Wednesday', time: '4:30–6:00 pm', focus: 'Concepts in science' }, { days: 'Friday', time: '4:30–6:00 pm', focus: 'Exam skills studio' }],
    duration: 90, image: '/academy/senior.webp', theme: 'peach', position: 3,
  },
];

export const enquiryTypes = ['Admissions', 'Trial class', 'Campus visit'] as const;

// TIMING YAHAN UPDATE KI GAYI HAI
export const contactTimes = ['Afternoon · 2 pm–5 pm'] as const;

export const faqs = [
  ['Which classes can my child join?', 'Our Primary Years programme supports Grades 1–5, Middle School covers Grades 6–8, and Senior School supports Grades 9–12. Each programme adapts its activities to the child’s current grade.'],
  ['Can we try a class before enrolling?', 'Yes. Choose “Trial class” in the enquiry form and tell us your child’s grade. Our admissions team will help you find a suitable session before you decide.'],
  ['How are smart boards used in lessons?', 'Teachers use touch-friendly diagrams, visual models, quizzes, and live annotations to make abstract concepts easier to understand. Board time is balanced with discussion, writing, and hands-on practice.'],
  ['How large is each learning group?', 'We plan for a maximum of twelve learners per teacher, giving children time to ask questions and receive individual feedback.'],
  ['How will I know how my child is doing?', 'Families receive regular progress conversations with their child’s educator, including strengths, areas to practise, and a simple plan for the next learning milestone.'],
];