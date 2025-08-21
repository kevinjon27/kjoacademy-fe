import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, FileText, Play, Clock, Layers } from "lucide-react";

export default function AdminLessonsPage() {
  const lessons = [
    {
      id: 1,
      title: "What is React?",
      module: "Introduction to React",
      course: "Complete React Developer Course",
      description: "Introduction to React library and its core concepts",
      duration: "15 minutes",
      type: "video",
      order: 1,
      status: "published",
    },
    {
      id: 2,
      title: "Setting up React Environment",
      module: "Introduction to React",
      course: "Complete React Developer Course",
      description: "Learn how to set up your development environment for React",
      duration: "20 minutes",
      type: "video",
      order: 2,
      status: "published",
    },
    {
      id: 3,
      title: "Your First React Component",
      module: "Introduction to React",
      course: "Complete React Developer Course",
      description: "Create your first React component and understand JSX",
      duration: "25 minutes",
      type: "video",
      order: 3,
      status: "published",
    },
    {
      id: 4,
      title: "Understanding Props",
      module: "Components and Props",
      course: "Complete React Developer Course",
      description: "Learn how to pass data between components using props",
      duration: "30 minutes",
      type: "video",
      order: 1,
      status: "published",
    },
    {
      id: 5,
      title: "Component Composition",
      module: "Components and Props",
      course: "Complete React Developer Course",
      description: "Learn how to compose components together",
      duration: "35 minutes",
      type: "video",
      order: 2,
      status: "draft",
    },
    {
      id: 6,
      title: "JavaScript Variables",
      module: "JavaScript Fundamentals",
      course: "Advanced JavaScript Patterns",
      description: "Understanding variables, let, const, and var",
      duration: "20 minutes",
      type: "video",
      order: 1,
      status: "published",
    },
    {
      id: 7,
      title: "Functions in JavaScript",
      module: "JavaScript Fundamentals",
      course: "Advanced JavaScript Patterns",
      description: "Learn about functions, parameters, and return values",
      duration: "40 minutes",
      type: "video",
      order: 2,
      status: "published",
    },
    {
      id: 8,
      title: "Arrays and Objects",
      module: "JavaScript Fundamentals",
      course: "Advanced JavaScript Patterns",
      description: "Working with arrays and objects in JavaScript",
      duration: "45 minutes",
      type: "video",
      order: 3,
      status: "published",
    },
    {
      id: 9,
      title: "Introduction to Swift",
      module: "Swift Basics",
      course: "iOS App Development with Swift",
      description: "Overview of Swift programming language",
      duration: "30 minutes",
      type: "video",
      order: 1,
      status: "published",
    },
    {
      id: 10,
      title: "Swift Variables and Constants",
      module: "Swift Basics",
      course: "iOS App Development with Swift",
      description: "Learn about variables and constants in Swift",
      duration: "25 minutes",
      type: "video",
      order: 2,
      status: "draft",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4" />;
      case "document":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "document":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Course Lessons
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage individual lessons within course modules
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Lesson
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${getTypeColor(lesson.type)}`}>
                    {getTypeIcon(lesson.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.module}</p>
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
                {lesson.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Course:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{lesson.course}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Order:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{lesson.order}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">{lesson.type}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{lesson.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                    {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
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
          <CardTitle>Lesson Statistics</CardTitle>
          <CardDescription>
            Overview of your course lessons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">10</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Published</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">2</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Drafts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5.5h</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Duration</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
