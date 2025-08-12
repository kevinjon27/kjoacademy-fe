export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to Courses
        </h1>
        <p className="text-muted-foreground">
          This is the courses page of KJO Academy. Use the sidebar menu to navigate between different courses.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Getting Started</h3>
          <p className="text-sm text-muted-foreground">
            Start with the onboarding module to get familiar with the platform.
          </p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Module A</h3>
          <p className="text-sm text-muted-foreground">
            Explore Module A to learn about the first set of concepts.
          </p>
        </div>
        
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Module B</h3>
          <p className="text-sm text-muted-foreground">
            Continue with Module B to advance your knowledge further.
          </p>
        </div>
      </div>
    </div>
  );
}
