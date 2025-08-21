import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, BookOpen, Users, Clock } from "lucide-react";

export default function AdminCoursesPage() {
  const courses = [
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
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{course.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {course.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Instructor:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.instructor}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Students:</span>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{course.students.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Modules:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.modules}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Statistics</CardTitle>
          <CardDescription>
            Overview of your course performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">6</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Courses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">4</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5,160</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Students</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
