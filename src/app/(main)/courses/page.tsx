import { CourseList } from "@/components/courses/course-list";
import { Course } from "@/types/course";

// Mock course data for demonstration
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Cryptocurrency Fundamentals",
    slug: "cryptocurrency-fundamentals",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop",
    enrolled_count: 1250,
  },
  {
    id: 2,
    title: "Advanced Trading Strategies",
    slug: "advanced-trading-strategies",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    enrolled_count: 890,
  },
  {
    id: 3,
    title: "DeFi & Smart Contracts",
    slug: "defi-smart-contracts",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
    enrolled_count: 567,
  },
  {
    id: 4,
    title: "Blockchain Development",
    slug: "blockchain-development",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&h=600&fit=crop",
    enrolled_count: 432,
  },
  {
    id: 5,
    title: "NFT & Digital Art",
    slug: "nft-digital-art",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=1200&h=600&fit=crop",
    enrolled_count: 789,
  },
  {
    id: 6,
    title: "Crypto Portfolio Management",
    slug: "crypto-portfolio-management",
    description:
      "Master the fundamentals of cryptocurrency trading with our comprehensive course designed for beginners and intermediate traders.",
    thumbnail_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    bg_img_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    enrolled_count: 654,
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Courses
        </h1>
        <p className="text-muted-foreground">
          This is the courses page of KJO Academy. Explore our comprehensive
          curriculum designed to take you from beginner to expert.
        </p>
      </div>

      <CourseList courses={mockCourses} />
    </div>
  );
}
