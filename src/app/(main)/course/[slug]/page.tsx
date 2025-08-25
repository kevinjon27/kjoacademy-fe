import { Header } from "@/components/student/header";
import { Footer } from "@/components/student/footer";
import { CourseDetails } from "@/components/student/course/course-details";
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";
import { Course, CourseModule, CourseLesson } from "@/types/course";

export type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// Mock data for demonstration
const mockCourse: Course = {
  id: 1,
  title: "Cryptocurrency Fundamentals",
  slug: "cryptocurrency-fundamentals",
  description:
    "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
  thumbnail_url:
    "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=225&fit=crop",
  bg_img_url:
    "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&h=600&fit=crop",
  enrolled_count: 1250,
};

const mockModules: CourseModule[] = [
  {
    id: 1,
    title: "Introduction to Cryptocurrency",
    lectures_count: 5,
    duration_seeconds: 3600, // 1 hour
  },
  {
    id: 2,
    title: "Blockchain Technology Basics",
    lectures_count: 7,
    duration_seeconds: 5400, // 1.5 hours
  },
  {
    id: 3,
    title: "Trading Fundamentals",
    lectures_count: 8,
    duration_seeconds: 7200, // 2 hours
  },
  {
    id: 4,
    title: "Advanced Trading Strategies",
    lectures_count: 6,
    duration_seeconds: 5400, // 1.5 hours
  },
];

const mockLessons: Record<number, CourseLesson[]> = {
  1: [
    {
      id: 1,
      title: "What is Cryptocurrency?",
      media_url: "https://example.com/video1.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
    {
      id: 2,
      title: "History of Bitcoin",
      media_url: "https://example.com/video2.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 3,
      title: "Types of Cryptocurrencies",
      media_url: "https://example.com/video3.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
    {
      id: 4,
      title: "Cryptocurrency vs Traditional Money",
      media_url: "https://example.com/image1.jpg",
      media_type: "image",
      duration_seconds: 300, // 5 minutes
    },
    {
      id: 5,
      title: "Quiz: Cryptocurrency Basics",
      media_url: "https://example.com/audio1.mp3",
      media_type: "audio",
      duration_seconds: 300, // 5 minutes
    },
  ],
  2: [
    {
      id: 6,
      title: "What is Blockchain?",
      media_url: "https://example.com/video4.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 7,
      title: "How Blockchain Works",
      media_url: "https://example.com/video5.mp4",
      media_type: "video",
      duration_seconds: 1500, // 25 minutes
    },
    {
      id: 8,
      title: "Consensus Mechanisms",
      media_url: "https://example.com/video6.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
    {
      id: 9,
      title: "Smart Contracts Introduction",
      media_url: "https://example.com/video7.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 10,
      title: "Blockchain Use Cases",
      media_url: "https://example.com/image2.jpg",
      media_type: "image",
      duration_seconds: 600, // 10 minutes
    },
    {
      id: 11,
      title: "Decentralized Applications (DApps)",
      media_url: "https://example.com/video8.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
    {
      id: 12,
      title: "Quiz: Blockchain Technology",
      media_url: "https://example.com/audio2.mp3",
      media_type: "audio",
      duration_seconds: 300, // 5 minutes
    },
  ],
  3: [
    {
      id: 13,
      title: "Understanding Market Orders",
      media_url: "https://example.com/video9.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 14,
      title: "Technical Analysis Basics",
      media_url: "https://example.com/video10.mp4",
      media_type: "video",
      duration_seconds: 1500, // 25 minutes
    },
    {
      id: 15,
      title: "Chart Patterns",
      media_url: "https://example.com/video11.mp4",
      media_type: "video",
      duration_seconds: 1800, // 30 minutes
    },
    {
      id: 16,
      title: "Risk Management",
      media_url: "https://example.com/video12.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 17,
      title: "Portfolio Diversification",
      media_url: "https://example.com/image3.jpg",
      media_type: "image",
      duration_seconds: 600, // 10 minutes
    },
    {
      id: 18,
      title: "Trading Psychology",
      media_url: "https://example.com/video13.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
    {
      id: 19,
      title: "Common Trading Mistakes",
      media_url: "https://example.com/video14.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 20,
      title: "Quiz: Trading Fundamentals",
      media_url: "https://example.com/audio3.mp3",
      media_type: "audio",
      duration_seconds: 300, // 5 minutes
    },
  ],
  4: [
    {
      id: 21,
      title: "Advanced Chart Analysis",
      media_url: "https://example.com/video15.mp4",
      media_type: "video",
      duration_seconds: 1500, // 25 minutes
    },
    {
      id: 22,
      title: "Trading Strategies: Scalping",
      media_url: "https://example.com/video16.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 23,
      title: "Trading Strategies: Swing Trading",
      media_url: "https://example.com/video17.mp4",
      media_type: "video",
      duration_seconds: 1200, // 20 minutes
    },
    {
      id: 24,
      title: "Algorithmic Trading Basics",
      media_url: "https://example.com/video18.mp4",
      media_type: "video",
      duration_seconds: 1800, // 30 minutes
    },
    {
      id: 25,
      title: "Advanced Risk Management",
      media_url: "https://example.com/image4.jpg",
      media_type: "image",
      duration_seconds: 600, // 10 minutes
    },
    {
      id: 26,
      title: "Final Project: Trading Strategy",
      media_url: "https://example.com/video19.mp4",
      media_type: "video",
      duration_seconds: 900, // 15 minutes
    },
  ],
};

export default async function CourseDetailPage({ params }: Props) {
  // Check authentication and role access - redirects admins to admin site
  await withStudentAreaProtection();
  
  const { slug } = await params;

  // TODO: Fetch real course data based on slug
  // For now, using mock data
  const course = mockCourse;
  const modules = mockModules;
  const lectures = mockLessons;

  return (
    <>
      <Header />
      <section className="container mx-auto px-4 py-8">
        <CourseDetails course={course} modules={modules} lectures={lectures} />
      </section>
      <Footer />
    </>
  );
}
