export type DocPage = {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: DocSection[];
};

export type DocSection =
  | { type: "paragraph"; content: string }
  | { type: "heading2"; content: string }
  | { type: "heading3"; content: string }
  | { type: "code"; filename?: string; language?: string; content: string }
  | { type: "callout"; calloutType: "info" | "warning" | "tip"; content: string }
  | { type: "steps"; steps: { title: string; body: string; code?: string }[] }
  | { type: "features"; items: { icon: string; title: string; description: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export const allDocs: DocPage[] = [
  {
    id: "introduction",
    title: "Introduction",
    description: "Get started with AXION - a full featured project management app built with Next js , shadcn and Prisma.",
    category: "Getting Started",
    sections: [
      {
        type: "paragraph",
        content: "This is a production ready platform built to replicate the core features of Atlassian Jira - including boards, sprints , issues , epics and team collaboration. Built with Next js 14 , TypeScript , shadcn , Prisma ORM and Postgres.",
      },
      {
        type: "callout",
        calloutType: "info",
        content: "This project is open source and free to use. You own the code - fork it , customize it and ship it as your own.",
      },
      {
        type: "heading2",
        content: "What is this project ?",
      },
      {
        type: "paragraph",
        content: "The Jira Clone provides a complete project management workflow - create workspaces , organize work into projects , plan sprints , track issues and collaborate with your team. It's designed as both a learning resource and a production ready starter.",
      },
      {
        type: "heading2",
        content: "Key Features",
      },
      {
        type: "features",
        items: [
          { icon: "🗂️", title: "Kanban Boards", description: "Drag-and-drop boards with customizable columns and swimlanes." },
          { icon: "🏃", title: "Sprint Planning", description: "Create and manage sprints with backlog grooming and velocity tracking." },
          { icon: "🐛", title: "Issue Tracking", description: "Full issue lifecycle — create, assign, label, prioritize, and resolve." },
          { icon: "👥", title: "Team Management", description: "Invite members, manage roles, and set per-project permissions." },
          { icon: "📊", title: "Reporting", description: "Burndown charts, velocity reports, and sprint retrospectives." },
          { icon: "🔔", title: "Notifications", description: "Real-time notifications for mentions, assignments, and status changes." },
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    description: "Set up the Jira Clone on your local machine in a few minutes.",
    category: "Getting Started",
    sections: [
      {
        type: "paragraph",
        content: "Follow the steps below to clone the repository and run the project locally. Make sure you have <strong>Node.js 18+</strong> and <strong>PostgreSQL</strong> installed.",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Clone the repository",
            body: "Clone the repo and navigate into the project directory.",
            code: "git clone https://github.com/your-org/jira-clone.git\ncd jira-clone",
          },
          {
            title: "Install dependencies",
            body: "Install all required packages using your preferred package manager.",
            code: "npm install\n# or\npnpm install",
          },
          {
            title: "Configure environment variables",
            body: "Copy the example env file and fill in your database URL, auth secret, and other config.",
            code: "cp .env.example .env.local",
          },
          {
            title: "Run database migrations",
            body: "Push the Prisma schema to your PostgreSQL database.",
            code: "npx prisma migrate dev --name init\nnpx prisma db seed",
          },
          {
            title: "Start the development server",
            body: "Launch the app on localhost:3000.",
            code: "npm run dev",
          },
        ],
      },
      {
        type: "callout",
        calloutType: "warning",
        content: "Make sure your PostgreSQL instance is running before running migrations. Check your DATABASE_URL in .env.local.",
      },
    ],
  },
  {
    id: "environment-variables",
    title: "Environment Variables",
    description: "All required and optional environment variables for configuring the app.",
    category: "Getting Started",
    sections: [
      {
        type: "paragraph",
        content: "The Jira Clone uses environment variables for database connection, authentication, file storage, and third-party integrations. Create a <code>.env.local</code> file in the root of your project.",
      },
      {
        type: "code",
        filename: ".env.local",
        language: "bash",
        content: `# Database
DATABASE_URL="postgresql://user:password@localhost:5432/jira_clone"

# Auth (NextAuth.js)
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers (optional)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# File uploads (Uploadthing)
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""`,
      },
      {
        type: "heading2",
        content: "Variable Reference",
      },
      {
        type: "table",
        headers: ["Variable", "Required", "Description"],
        rows: [
          ["DATABASE_URL", "Yes", "PostgreSQL connection string"],
          ["NEXTAUTH_SECRET", "Yes", "Random string used to encrypt sessions"],
          ["NEXTAUTH_URL", "Yes", "Base URL of your app"],
          ["GITHUB_CLIENT_ID", "No", "For GitHub OAuth login"],
          ["GOOGLE_CLIENT_ID", "No", "For Google OAuth login"],
          ["UPLOADTHING_SECRET", "No", "For file/image uploads"],
        ],
      },
    ],
  },
  {
    id: "project-structure",
    title: "Project Structure",
    description: "Understand how the codebase is organized.",
    category: "Getting Started",
    sections: [
      {
        type: "paragraph",
        content: "The project follows the Next.js App Router conventions with a feature-based folder structure for scalability.",
      },
      {
        type: "code",
        filename: "Project Structure",
        language: "bash",
        content: `jira-clone/
├── app/
│   ├── (auth)/          # Login, Register pages
│   ├── (dashboard)/     # Main app layout
│   │   ├── board/       # Kanban board view
│   │   ├── backlog/     # Backlog management
│   │   ├── sprints/     # Sprint planning
│   │   └── settings/    # Project settings
│   └── api/             # API route handlers
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── board/           # Board-specific components
│   ├── issues/          # Issue components
│   └── shared/          # Shared components
├── lib/
│   ├── db.ts            # Prisma client
│   ├── auth.ts          # NextAuth config
│   └── utils.ts         # Utility functions
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
└── types/               # Global TypeScript types`,
      },
    ],
  },
  {
    id: "issues",
    title: "Issues",
    description: "Learn how to create, manage, and track issues in your project.",
    category: "Core Concepts",
    sections: [
      {
        type: "paragraph",
        content: "Issues are the core unit of work in the Jira Clone. An issue can be a <strong>Story</strong>, <strong>Bug</strong>, <strong>Task</strong>, or <strong>Epic</strong>. Every issue belongs to a project and can be assigned to a sprint.",
      },
      {
        type: "heading2",
        content: "Issue Types",
      },
      {
        type: "table",
        headers: ["Type", "Icon", "Description"],
        rows: [
          ["Story", "📗", "A user-facing feature or requirement"],
          ["Bug", "🐛", "Something that is broken or not working as expected"],
          ["Task", "✅", "A technical task or chore"],
          ["Epic", "⚡", "A large body of work that contains multiple stories"],
          ["Subtask", "🔹", "A smaller piece of work within a story or task"],
        ],
      },
      {
        type: "heading2",
        content: "Issue Priority",
      },
      {
        type: "table",
        headers: ["Priority", "Color", "Description"],
        rows: [
          ["Highest", "🔴 Red", "Critical — must be fixed immediately"],
          ["High", "🟠 Orange", "Important — address in current sprint"],
          ["Medium", "🟡 Yellow", "Normal priority (default)"],
          ["Low", "🔵 Blue", "Can wait for a future sprint"],
          ["Lowest", "⚪ Gray", "Nice to have — no urgency"],
        ],
      },
      {
        type: "heading2",
        content: "Creating an Issue via API",
      },
      {
        type: "code",
        filename: "app/api/issues/route.ts",
        language: "typescript",
        content: `import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      type: body.type,       // STORY | BUG | TASK | EPIC
      priority: body.priority, // HIGHEST | HIGH | MEDIUM | LOW | LOWEST
      status: "TODO",
      projectId: body.projectId,
      assigneeId: body.assigneeId,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}`,
      },
    ],
  },
  {
    id: "boards",
    title: "Kanban Board",
    description: "Set up and customize your Kanban board with drag-and-drop support.",
    category: "Core Concepts",
    sections: [
      {
        type: "paragraph",
        content: "The Kanban board gives your team a visual overview of work in progress. Issues are organized into columns representing their current status. Drag and drop issues between columns to update their status in real-time.",
      },
      {
        type: "heading2",
        content: "Default Columns",
      },
      {
        type: "table",
        headers: ["Column", "Status Value", "Description"],
        rows: [
          ["To Do", "TODO", "Work that hasn't started yet"],
          ["In Progress", "IN_PROGRESS", "Actively being worked on"],
          ["In Review", "IN_REVIEW", "Awaiting code review or QA"],
          ["Done", "DONE", "Completed and verified"],
        ],
      },
      {
        type: "heading2",
        content: "Drag & Drop Setup",
      },
      {
        type: "paragraph",
        content: "The board uses <code>@hello-pangea/dnd</code> (a maintained fork of react-beautiful-dnd) for drag-and-drop. Install it with:",
      },
      {
        type: "code",
        filename: "terminal",
        language: "bash",
        content: "npm install @hello-pangea/dnd",
      },
      {
        type: "callout",
        calloutType: "tip",
        content: "For best performance, wrap your board in a DragDropContext at the page level, not inside a re-rendering component.",
      },
    ],
  },
  {
    id: "sprints",
    title: "Sprints",
    description: "Plan and manage sprints, move issues from backlog, and track progress.",
    category: "Core Concepts",
    sections: [
      {
        type: "paragraph",
        content: "Sprints are time-boxed iterations of work, typically 1–4 weeks long. Issues are moved from the backlog into a sprint during sprint planning. Once a sprint starts, the board reflects only sprint issues.",
      },
      {
        type: "heading2",
        content: "Sprint Lifecycle",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Create a Sprint",
            body: "Go to Backlog and click 'Create Sprint'. Set a name, goal, start date, and end date.",
          },
          {
            title: "Add Issues to Sprint",
            body: "Drag issues from the backlog into the sprint, or right-click an issue and select 'Move to Sprint'.",
          },
          {
            title: "Start the Sprint",
            body: "Click 'Start Sprint' to make it active. Only one sprint can be active at a time per project.",
          },
          {
            title: "Track Progress",
            body: "Use the Kanban board and burndown chart to track sprint velocity and completion.",
          },
          {
            title: "Complete the Sprint",
            body: "Click 'Complete Sprint'. Incomplete issues can be moved to the next sprint or back to backlog.",
          },
        ],
      },
    ],
  },
  {
    id: "database-schema",
    title: "Database Schema",
    description: "Prisma schema for all models — User, Project, Issue, Sprint, and more.",
    category: "Reference",
    sections: [
      {
        type: "paragraph",
        content: "The Jira Clone uses Prisma ORM with PostgreSQL. Below is the full schema definition for the core models.",
      },
      {
        type: "code",
        filename: "prisma/schema.prisma",
        language: "prisma",
        content: `model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  avatarUrl String?
  createdAt DateTime @default(now())
  issues    Issue[]  @relation("AssignedIssues")
  projects  ProjectMember[]
}

model Project {
  id          String   @id @default(cuid())
  name        String
  key         String   @unique  // e.g. "PROJ"
  description String?
  createdAt   DateTime @default(now())
  issues      Issue[]
  sprints     Sprint[]
  members     ProjectMember[]
}

model Issue {
  id          String      @id @default(cuid())
  title       String
  description String?
  type        IssueType   @default(TASK)
  status      IssueStatus @default(TODO)
  priority    Priority    @default(MEDIUM)
  order       Int         @default(0)
  projectId   String
  project     Project     @relation(fields: [projectId], references: [id])
  assigneeId  String?
  assignee    User?       @relation("AssignedIssues", fields: [assigneeId], references: [id])
  sprintId    String?
  sprint      Sprint?     @relation(fields: [sprintId], references: [id])
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Sprint {
  id        String       @id @default(cuid())
  name      String
  goal      String?
  status    SprintStatus @default(PLANNED)
  startDate DateTime?
  endDate   DateTime?
  projectId String
  project   Project      @relation(fields: [projectId], references: [id])
  issues    Issue[]
}

enum IssueType   { STORY BUG TASK EPIC SUBTASK }
enum IssueStatus { TODO IN_PROGRESS IN_REVIEW DONE }
enum Priority    { HIGHEST HIGH MEDIUM LOW LOWEST }
enum SprintStatus { PLANNED ACTIVE COMPLETED }`,
      },
    ],
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Full REST API reference for all endpoints.",
    category: "Reference",
    sections: [
      {
        type: "paragraph",
        content: "All API routes are built with Next.js Route Handlers under <code>app/api/</code>. They return JSON and follow standard HTTP conventions.",
      },
      {
        type: "heading2",
        content: "Issues",
      },
      {
        type: "table",
        headers: ["Method", "Endpoint", "Description"],
        rows: [
          ["GET", "/api/issues", "List all issues for a project"],
          ["POST", "/api/issues", "Create a new issue"],
          ["GET", "/api/issues/:id", "Get a single issue by ID"],
          ["PATCH", "/api/issues/:id", "Update an issue"],
          ["DELETE", "/api/issues/:id", "Delete an issue"],
        ],
      },
      {
        type: "heading2",
        content: "Sprints",
      },
      {
        type: "table",
        headers: ["Method", "Endpoint", "Description"],
        rows: [
          ["GET", "/api/sprints", "List sprints for a project"],
          ["POST", "/api/sprints", "Create a new sprint"],
          ["PATCH", "/api/sprints/:id/start", "Start a sprint"],
          ["PATCH", "/api/sprints/:id/complete", "Complete a sprint"],
        ],
      },
      {
        type: "heading2",
        content: "Projects",
      },
      {
        type: "table",
        headers: ["Method", "Endpoint", "Description"],
        rows: [
          ["GET", "/api/projects", "List all projects for current user"],
          ["POST", "/api/projects", "Create a new project"],
          ["GET", "/api/projects/:id", "Get project details"],
          ["PATCH", "/api/projects/:id", "Update project settings"],
          ["DELETE", "/api/projects/:id", "Delete a project"],
        ],
      },
    ],
  },
  {
    id: "theming",
    title: "Theming",
    description: "Customize colors, fonts, and dark mode using CSS variables and Tailwind.",
    category: "Customization",
    sections: [
      {
        type: "paragraph",
        content: "The Jira Clone uses <strong>shadcn/ui</strong> theming built on CSS variables. You can customize the entire color palette by editing your <code>globals.css</code>.",
      },
      {
        type: "code",
        filename: "app/globals.css",
        language: "css",
        content: `:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;     /* Jira Blue */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.375rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --secondary: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
  --border: 217.2 32.6% 17.5%;
}`,
      },
      {
        type: "callout",
        calloutType: "tip",
        content: "Use the shadcn/ui Themes page at ui.shadcn.com/themes to generate a custom theme and paste it directly into your globals.css.",
      },
    ],
  },
  {
    id: "deployment",
    title: "Deployment",
    description: "Deploy your Jira Clone to Vercel, Railway, or any Node.js host.",
    category: "Customization",
    sections: [
      {
        type: "paragraph",
        content: "The recommended way to deploy is with <strong>Vercel</strong> for the Next.js app and <strong>Railway</strong> or <strong>Supabase</strong> for PostgreSQL.",
      },
      {
        type: "heading2",
        content: "Deploy to Vercel",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Push to GitHub",
            body: "Make sure your project is on GitHub.",
            code: "git push origin main",
          },
          {
            title: "Import on Vercel",
            body: "Go to vercel.com/new, import your repository, and set the framework to Next.js.",
          },
          {
            title: "Add Environment Variables",
            body: "Add all variables from your .env.local in the Vercel dashboard under Settings → Environment Variables.",
          },
          {
            title: "Deploy",
            body: "Click Deploy. Vercel will build and deploy your app automatically on every push to main.",
          },
        ],
      },
      {
        type: "callout",
        calloutType: "warning",
        content: "Don't forget to update NEXTAUTH_URL to your production domain (e.g. https://yourapp.vercel.app) in Vercel's environment variables.",
      },
    ],
  },
];

export const sidebarSections: { label: string; pages: DocPage[] }[] = [
  {
    label: "Getting Started",
    pages: allDocs.filter((d) => d.category === "Getting Started"),
  },
  {
    label: "Core Concepts",
    pages: allDocs.filter((d) => d.category === "Core Concepts"),
  },
  {
    label: "Reference",
    pages: allDocs.filter((d) => d.category === "Reference"),
  },
  {
    label: "Customization",
    pages: allDocs.filter((d) => d.category === "Customization"),
  },
];