export default function UserPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to users
        </h1>
        <p className="text-muted-foreground">
          This is the users page of KJO Academy. Use the sidebar menu to navigate.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="font-semibold mb-2">Quick Actions</h3>
          <p className="text-sm text-muted-foreground">
            Access your profile, notifications, and other user features from the sidebar.
          </p>
        </div>
      </div>
    </div>
  );
}
