import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseCard } from "@/components/admin/courses/course-card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, BookOpen, Users, Clock } from "lucide-react";
import { Course } from "@/types/course";

export default function AdminCoursesPage() {
  const courses: Course = [
    {
      id: 1,
      title: "Complete React Developer Course",
      description: "Learn React from scratch to advanced concepts",
      category: "Web Development",
      instructor: "John Doe",
      students: 1250,
      duration: "12 hours",
      modules: 8,
      status: "published",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Advanced JavaScript Patterns",
      description: "Master advanced JavaScript concepts and patterns",
      category: "Web Development",
      instructor: "Jane Smith",
      students: 890,
      duration: "8 hours",
      modules: 6,
      status: "published",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "iOS App Development with Swift",
      description: "Build iOS applications using Swift and SwiftUI",
      category: "Mobile Development",
      instructor: "Mike Johnson",
      students: 650,
      duration: "15 hours",
      modules: 10,
      status: "draft",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Data Science Fundamentals",
      description: "Introduction to data science and machine learning",
      category: "Data Science",
      instructor: "Sarah Wilson",
      students: 1100,
      duration: "20 hours",
      modules: 12,
      status: "published",
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description: "Learn the fundamentals of user interface design",
      category: "Design & UX",
      instructor: "Alex Brown",
      students: 750,
      duration: "10 hours",
      modules: 7,
      status: "published",
      image: "/api/placeholder/300/200",
    },
    {
      id: 6,
      title: "DevOps with Docker & Kubernetes",
      description: "Containerization and orchestration for modern applications",
      category: "DevOps & Cloud",
      instructor: "David Lee",
      students: 520,
      duration: "18 hours",
      modules: 9,
      status: "draft",
      image: "/api/placeholder/300/200",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all courses in your LMS
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
