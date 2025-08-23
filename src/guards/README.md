# Authentication Guards

This directory contains guard functions for handling authentication and role-based access control in the KJO Academy application.

## Files

- `withAuthProtected.server.tsx` - Server-side guards for protecting pages and layouts
- `withAuthProtected.client.tsx` - Client-side guards for protecting interactive components

## Role-Based Access Control Rules

The guard functions implement the following access control rules:

### 🔒 **Student Access Rules**
- **Can access**: Student pages (`/user/*`, `/course/*`, etc.)
- **Cannot access**: Admin pages (`/admin/*`)
- **If student tries to access admin pages**: Redirected to student front page (`/`)
- **If logged-in student visits `/login`**: Redirected to student front page (`/`)

### 🔐 **Admin Access Rules**
- **Can access**: Admin pages (`/admin/*`)
- **Cannot access**: Student pages (`/user/*`, `/course/*`, etc.)
- **If admin tries to access student pages**: Redirected to admin overview page (`/admin`)
- **If logged-in admin visits `/admin/login`**: Redirected to admin overview page (`/admin`)

## Server-Side Guards

### Main Guard Function

```typescript
import { withAuthProtectedServer } from "@/guards/withAuthProtected.server";

const authResult = await withAuthProtectedServer({
  requireAuth: true,
  allowedRoles: ["admin"],
  redirectTo: "/admin/login", // Optional custom redirect
});
```

### Helper Functions

#### `withAdminAreaProtection()`
Protects admin-only areas and redirects students to student site.

```typescript
import { withAdminAreaProtection } from "@/guards/withAuthProtected.server";

// In admin layout or page
const authResult = await withAdminAreaProtection();
```

**Behavior:**
- ✅ **Authenticated admin**: Access granted
- ❌ **Unauthenticated user**: Redirected to `/admin/login`
- ❌ **Authenticated student**: Redirected to `/` (student front page)

#### `withStudentAreaProtection()`
Protects student-only areas and redirects admins to admin site.

```typescript
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";

// In student layout or page
const authResult = await withStudentAreaProtection();
```

**Behavior:**
- ✅ **Authenticated student**: Access granted
- ❌ **Unauthenticated user**: Redirected to `/login`
- ❌ **Authenticated admin**: Redirected to `/admin` (admin overview page)

#### `withAdminAuthProtection()`
Protects admin auth pages (login, register, etc.) and redirects authenticated users.

```typescript
import { withAdminAuthProtection } from "@/guards/withAuthProtected.server";

// In admin auth layout
const authResult = await withAdminAuthProtection();
```

**Behavior:**
- ✅ **Unauthenticated user**: Access granted to login page
- 🔄 **Authenticated admin**: Redirected to `/admin` (admin overview page)
- 🔄 **Authenticated student**: Redirected to `/` (student front page)

#### `withStudentAuthProtection()`
Protects student auth pages (login, register, etc.) and redirects authenticated users.

```typescript
import { withStudentAuthProtection } from "@/guards/withAuthProtected.server";

// In student auth layout
const authResult = await withStudentAuthProtection();
```

**Behavior:**
- ✅ **Unauthenticated user**: Access granted to login page
- 🔄 **Authenticated student**: Redirected to `/` (student front page)
- 🔄 **Authenticated admin**: Redirected to `/admin` (admin overview page)

#### `withAdminProtection()`
Legacy function for admin-only pages.

```typescript
import { withAdminProtection } from "@/guards/withAuthProtected.server";

const authResult = await withAdminProtection();
```

#### `withStudentProtection()`
Legacy function for student-only pages.

```typescript
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";

const authResult = await withStudentAreaProtection();
```

#### `withAuthProtection()`
Protects pages that require authentication but allow any role.

```typescript
import { withAuthProtection } from "@/guards/withAuthProtected.server";

const authResult = await withAuthProtection();
```

## Client-Side Guards

### Main Guard Hook

```typescript
import { useAuthProtectedClient } from "@/guards/withAuthProtected.client";

function ProtectedComponent() {
  const { isAuthenticated, user, hasRequiredRole, isLoading } = useAuthProtectedClient({
    requireAuth: true,
    allowedRoles: ["admin"],
    redirectTo: "/admin/login",
  });

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated || !hasRequiredRole) return <div>Access denied</div>;

  return <div>Welcome, {user?.name}!</div>;
}
```

### Helper Hooks

#### `useAdminAreaProtection()`
```typescript
import { useAdminAreaProtection } from "@/guards/withAuthProtected.client";

function AdminComponent() {
  const { user, isLoading } = useAdminAreaProtection();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>Admin panel for {user?.name}</div>;
}
```

#### `useStudentAreaProtection()`
```typescript
import { useStudentAreaProtection } from "@/guards/withAuthProtected.client";

function StudentComponent() {
  const { user, isLoading } = useStudentAreaProtection();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>Student dashboard for {user?.name}</div>;
}
```

#### `useAdminAuthProtection()`
```typescript
import { useAdminAuthProtection } from "@/guards/withAuthProtected.client";

function AdminLoginComponent() {
  const { isLoading } = useAdminAuthProtection();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>Admin login form</div>;
}
```

#### `useStudentAuthProtection()`
```typescript
import { useStudentAuthProtection } from "@/guards/withAuthProtected.client";

function StudentLoginComponent() {
  const { isLoading } = useStudentAuthProtection();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>Student login form</div>;
}
```

## Usage Examples

### 1. Admin Layout Protection

```typescript
// src/app/admin/(protected)/layout.tsx
import { withAdminAreaProtection } from "@/guards/withAuthProtected.server";

export default async function AdminLayout({ children }) {
  // Protects all admin pages - redirects students to student site
  await withAdminAreaProtection();
  
  return <div>{children}</div>;
}
```

### 2. Student Layout Protection

```typescript
// src/app/(main)/user/layout.tsx
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";

export default async function UserLayout({ children }) {
  // Protects all student pages - redirects admins to admin site
  await withStudentAreaProtection();
  
  return <div>{children}</div>;
}
```

### 3. Admin Auth Layout Protection

```typescript
// src/app/admin/(auth)/layout.tsx
import { withAdminAuthProtection } from "@/guards/withAuthProtected.server";

export default async function AdminAuthLayout({ children }) {
  // Redirects authenticated users to their appropriate areas
  await withAdminAuthProtection();
  
  return <div>{children}</div>;
}
```

### 4. Student Auth Layout Protection

```typescript
// src/app/(main)/(auth)/layout.tsx
import { withStudentAuthProtection } from "@/guards/withAuthProtected.server";

export default async function StudentAuthLayout({ children }) {
  // Redirects authenticated users to their appropriate areas
  await withStudentAuthProtection();
  
  return <div>{children}</div>;
}
```

### 5. Individual Page Protection

```typescript
// src/app/(main)/course/[slug]/page.tsx
import { withStudentAreaProtection } from "@/guards/withAuthProtected.server";

export default async function CoursePage({ params }) {
  // Protects individual course page
  await withStudentAreaProtection();
  
  return <div>Course content</div>;
}
```

### 6. Client-Side Component Protection

```typescript
// components/admin/admin-panel.tsx
"use client";
import { useAdminAreaProtection } from "@/guards/withAuthProtected.client";

export function AdminPanel() {
  const { user, isLoading } = useAdminAreaProtection();
  
  if (isLoading) return <div>Loading...</div>;
  return <div>Admin panel for {user?.name}</div>;
}
```

## Return Values

### Server-Side Guards Return
```typescript
interface AuthResult {
  isAuthenticated: boolean;
  user: User | null;
  hasRequiredRole: boolean;
}
```

### Client-Side Guards Return
```typescript
interface AuthResult {
  isAuthenticated: boolean;
  user: User | null;
  hasRequiredRole: boolean;
  isLoading: boolean;
}
```

## Redirect Behavior

| User Type | Tries to Access | Redirected To |
|-----------|----------------|---------------|
| Unauthenticated | Admin page | `/admin/login` |
| Unauthenticated | Student page | `/login` |
| Authenticated Student | Admin page | `/` (student front page) |
| Authenticated Admin | Student page | `/admin` (admin overview page) |
| Authenticated Student | `/login` | `/` (student front page) |
| Authenticated Admin | `/admin/login` | `/admin` (admin overview page) |

## Best Practices

1. **Use Area Protection**: Prefer `withAdminAreaProtection()` and `withStudentAreaProtection()` over the legacy functions
2. **Use Auth Protection**: Use `withAdminAuthProtection()` and `withStudentAuthProtection()` for login pages
3. **Apply at Layout Level**: Protect entire sections by applying guards in layout files
4. **Handle Loading States**: Always handle loading states in client-side components
5. **Consistent Redirects**: Use the default redirect paths unless you have specific requirements
6. **Type Safety**: All guards provide full TypeScript support

## Migration from Legacy Functions

If you're using the legacy functions, consider migrating to the area protection functions:

```typescript
// Old
await withAdminProtection();
await withStudentProtection();

// New (recommended)
await withAdminAreaProtection();
await withStudentAreaProtection();
```

The new functions provide clearer semantics and better separation of concerns.
