import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Layers, BookOpen, Clock, FileText } from "lucide-react";

export default function AdminModulesPage() {
  const modules = [
    {
      id: 1,
      title: "Introduction to React",
      course: "Complete React Developer Course",
      description: "Learn the basics of React and its core concepts",
      lessons: 5,
      duration: "2 hours",
      order: 1,
      status: "published",
    },
    {
      id: 2,
      title: "Components and Props",
      course: "Complete React Developer Course",
      description: "Understanding React components and props system",
      lessons: 4,
      duration: "1.5 hours",
      order: 2,
      status: "published",
    },
    {
      id: 3,
      title: "State Management",
      course: "Complete React Developer Course",
      description: "Managing component state and lifecycle",
      lessons: 6,
      duration: "3 hours",
      order: 3,
      status: "published",
    },
    {
      id: 4,
      title: "JavaScript Fundamentals",
      course: "Advanced JavaScript Patterns",
      description: "Core JavaScript concepts and syntax",
      lessons: 8,
      duration: "4 hours",
      order: 1,
      status: "published",
    },
    {
      id: 5,
      title: "ES6+ Features",
      course: "Advanced JavaScript Patterns",
      description: "Modern JavaScript features and syntax",
      lessons: 6,
      duration: "3 hours",
      order: 2,
      status: "draft",
    },
    {
      id: 6,
      title: "Swift Basics",
      course: "iOS App Development with Swift",
      description: "Introduction to Swift programming language",
      lessons: 7,
      duration: "3.5 hours",
      order: 1,
      status: "published",
    },
    {
      id: 7,
      title: "SwiftUI Fundamentals",
      course: "iOS App Development with Swift",
      description: "Building user interfaces with SwiftUI",
      lessons: 5,
      duration: "2.5 hours",
      order: 2,
      status: "draft",
    },
    {
      id: 8,
      title: "Data Analysis Basics",
      course: "Data Science Fundamentals",
      description: "Introduction to data analysis and visualization",
      lessons: 9,
      duration: "5 hours",
      order: 1,
      status: "published",
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
            Course Modules
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage course modules and their content
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Module
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{module.course}</p>
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
              <CardDescription className="mb-4">
                {module.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Order:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{module.order}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Lessons:</span>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{module.lessons}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{module.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                    {module.status.charAt(0).toUpperCase() + module.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Lessons
                    </Button>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Module Statistics</CardTitle>
          <CardDescription>
            Overview of your course modules
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">6</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">50</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Lessons</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
