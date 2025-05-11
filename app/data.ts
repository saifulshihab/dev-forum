import { IJobCircular } from "@/types/job";
import { BudgetType, IProject } from "@/types/project";
import { TQuestion } from "@/types/question";

export const questions: TQuestion[] = [
  {
    id: "q-001",
    title: "How to implement authentication with NextAuth.js?",
    description:
      "I'm building a Next.js application and want to add authentication. Has anyone implemented NextAuth.js with custom credentials provider? Any example code or best practices would be greatly appreciated.",
    user: "dev_sarah",
    created_at: new Date("2025-04-15T09:30:00Z"),
    views: 342,
    tags: ["next.js", "authentication", "nextauth", "react"],
    answers: [
      {
        id: "a-001-1",
        description:
          "I've implemented NextAuth in several projects. Here's how I set it up with a custom credentials provider: [code snippet]. Make sure you properly configure your environment variables and handle the session on both client and server side.",
        user: "react_pro92",
        upvote: 24,
        downvote: 2
      },
      {
        id: "a-001-2",
        description:
          "NextAuth.js documentation is quite thorough but I found this tutorial helpful: [link]. The key is setting up your session callbacks correctly and understanding the JWT flow.",
        user: "webdev_jane",
        upvote: 15,
        downvote: 0
      }
    ]
  },
  {
    id: "q-002",
    title: "Optimizing database queries with large datasets",
    description:
      "Our application is facing performance issues with PostgreSQL as our dataset grows. We're currently using standard SELECT queries with multiple JOINs that worked fine with smaller datasets. What strategies should we implement for optimizing these queries?",
    user: "db_optimizer",
    created_at: new Date("2025-05-01T14:20:00Z"),
    views: 189,
    tags: ["postgresql", "database-optimization", "performance", "sql"],
    answers: [
      {
        id: "a-002-1",
        description:
          "Have you checked your indexes? Make sure you have proper indexes on columns used in JOIN conditions and WHERE clauses. Also consider using EXPLAIN ANALYZE to identify bottlenecks in your query execution plan.",
        user: "sql_master",
        upvote: 31,
        downvote: 1
      }
    ]
  },
  {
    id: "q-003",
    title: "Understanding React Server Components",
    description:
      "I'm trying to understand when to use Server Components vs. Client Components in React. What are the best use cases for each, and how do they communicate with each other?",
    user: "new_to_react",
    created_at: new Date("2025-04-22T11:45:00Z"),
    views: 521,
    tags: ["react", "server-components", "next.js"],
    answers: [
      {
        id: "a-003-1",
        description:
          "Server Components are great for data fetching, accessing backend resources directly, and keeping large dependencies server-side. Client Components should be used when you need interactivity, browser APIs, or React hooks.",
        user: "react_architect",
        upvote: 47,
        downvote: 3
      },
      {
        id: "a-003-2",
        description:
          "One pattern I've found effective is to use Server Components as containers that fetch data and pass it down to Client Components that handle the UI interactions. This gives you the best of both worlds.",
        user: "frontend_lead",
        upvote: 39,
        downvote: 2
      },
      {
        id: "a-003-3",
        description:
          "Remember that Server Components can't use hooks or browser APIs. They run only on the server and never on the client. Communication is one-way: Server Components can pass props to Client Components, but not vice versa.",
        user: "next_expert",
        upvote: 26,
        downvote: 1
      }
    ]
  },
  {
    id: "q-004",
    title: "Deploying Docker containers on AWS ECS vs Kubernetes",
    description:
      "Our team is debating between AWS ECS and Kubernetes for container orchestration. We have about 20 microservices and need good scaling capabilities. Has anyone compared both in production?",
    user: "cloud_architect",
    created_at: new Date("2025-05-03T08:15:00Z"),
    views: 276,
    tags: ["aws", "docker", "kubernetes", "ecs", "devops"],
    answers: []
  },
  {
    id: "q-005",
    title: "Best practices for handling file uploads in a web application",
    description:
      "I'm building a feature that allows users to upload images and documents (up to 20MB). What's the best way to handle these uploads securely and efficiently? Should I use direct uploads to S3 or process them through my server?",
    user: "fullstack_dev",
    created_at: new Date("2025-04-29T16:50:00Z"),
    views: 412,
    tags: ["file-upload", "s3", "security", "web-development"],
    answers: [
      {
        id: "a-005-1",
        description:
          "For files this size, I recommend direct uploads to S3 using presigned URLs. This takes the load off your server and improves user experience. Just make sure to implement proper validation on both client and server sides.",
        user: "aws_specialist",
        upvote: 28,
        downvote: 0
      },
      {
        id: "a-005-2",
        description:
          "Consider implementing a chunked upload approach for better user experience, especially for larger files or users with less stable internet connections.",
        user: "ux_engineer",
        upvote: 19,
        downvote: 1
      }
    ]
  }
];

export const projects: IProject[] = [
  {
    id: "11-22qqwfqwf",
    user_id: "8a7b6c5d-4e3f-2a1b-9c8d-7e6f5a4b3c2d",
    title: "E-commerce Website Redesign",
    description:
      "Looking for an experienced web designer to modernize our online store. The current site is outdated and not mobile-friendly. We need a complete redesign with focus on user experience and conversion optimization.",

    budget: 5000,
    budget_type: BudgetType.FIXED,
    estimated_duration: "4 weeks",
    skills_required: [
      "UI/UX Design",
      "HTML/CSS",
      "JavaScript",
      "Shopify",
      "Responsive Design"
    ],
    created_at: "2025-05-01T10:30:00Z",
    updated_at: "2025-05-01T10:30:00Z"
  },
  {
    id: "11-22352353252",
    user_id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    title: "Mobile App Development for Health Tracking",
    description:
      "We need a mobile app that helps users track their daily health metrics including steps, workouts, water intake, and calories. The app should sync with popular fitness devices and have an intuitive dashboard.",

    budget: 12000,
    budget_type: BudgetType.FIXED,
    estimated_duration: "3 months",
    skills_required: [
      "React Native",
      "iOS Development",
      "Android Development",
      "API Integration",
      "UI/UX Design"
    ],
    created_at: "2025-05-02T14:15:00Z",
    updated_at: "2025-05-02T14:15:00Z"
  },
  {
    id: "11-22352362",
    user_id: "7d8e9f0a-1b2c-3d4e-5f6a-7b8c9d0e1f2a",
    title: "Content Writer for Tech Blog",
    description:
      "Seeking a talented content writer to create engaging articles for our tech blog. Topics will include AI, blockchain, cybersecurity, and emerging technologies. Must have excellent research skills and the ability to explain complex topics in simple terms.",
    budget_type: BudgetType.HOURLY,
    budget: 40,
    skills_required: [
      "Content Writing",
      "SEO",
      "Technology Knowledge",
      "Research"
    ],

    created_at: "2025-05-03T09:45:00Z",
    updated_at: "2025-05-03T09:45:00Z"
  },
  {
    id: "11236236-22",
    user_id: "3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
    title: "Logo Design for Startup",
    description:
      "Our fintech startup needs a professional logo that reflects innovation, security, and trust. We prefer minimalist designs with a modern touch. The logo will be used on our website, app, business cards, and marketing materials.",
    budget_type: BudgetType.FIXED,
    budget: 1000,
    estimated_duration: "2 weeks",
    skills_required: [
      "Logo Design",
      "Branding",
      "Adobe Illustrator",
      "Graphic Design"
    ],
    created_at: "2025-05-04T16:20:00Z",
    updated_at: "2025-05-04T16:20:00Z"
  },
  {
    id: "11-2236236",
    user_id: "5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b",
    title: "Backend API Development for Social Platform",
    description:
      "Need an experienced backend developer to build a robust API for our social networking platform. The API needs to handle user authentication, content posting, notifications, and real-time messaging.",
    budget_type: BudgetType.NEGOTIABLE,
    estimated_duration: "2 months",
    skills_required: [
      "Node.js",
      "Express",
      "MongoDB",
      "WebSockets",
      "OAuth",
      "AWS"
    ],
    created_at: "2025-05-05T11:10:00Z",
    updated_at: "2025-05-05T11:10:00Z"
  },
  {
    id: "11-22362362",
    user_id: "9a0b1c2d-3e4f-5a6b-7c8d-9e0f1a2b3c4d",
    title: "Data Analysis for E-commerce Sales",
    description:
      "Looking for a data analyst to help us make sense of our e-commerce sales data. Need comprehensive insights, trend analysis, and actionable recommendations to improve sales and customer retention.",
    budget_type: BudgetType.HOURLY,
    budget: 50,
    estimated_duration: "3 weeks",
    skills_required: [
      "Data Analysis",
      "Python",
      "SQL",
      "Excel",
      "Data Visualization",
      "Power BI"
    ],
    created_at: "2025-05-06T13:40:00Z",
    updated_at: "2025-05-06T13:40:00Z"
  },
  {
    id: "123623621-22",
    user_id: "2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e",
    title: "WordPress Website for Local Restaurant",
    description:
      "Our restaurant needs a new WordPress website with online ordering capabilities. The site should showcase our menu, location, hours, and allow customers to place orders for pickup or delivery.",
    budget_type: BudgetType.FIXED,
    budget: 2500,
    estimated_duration: "3 weeks",
    skills_required: [
      "WordPress",
      "WooCommerce",
      "PHP",
      "Web Design",
      "Responsive Design"
    ],
    created_at: "2025-05-07T10:00:00Z",
    updated_at: "2025-05-07T10:00:00Z"
  },
  {
    id: "13262361-22",
    user_id: "4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    title: "Video Editing for YouTube Channel",
    description:
      "Seeking a video editor for our growing tech review YouTube channel. Need someone to edit weekly review videos, add effects, transitions, and help improve overall video quality and viewer engagement.",
    budget_type: BudgetType.HOURLY,
    budget: 35,
    skills_required: [
      "Video Editing",
      "Adobe Premiere Pro",
      "After Effects",
      "Sound Editing",
      "Thumbnail Design"
    ],
    created_at: "2025-05-08T15:30:00Z",
    updated_at: "2025-05-08T15:30:00Z"
  },
  {
    id: "12363262361-22",
    user_id: "6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c",
    title: "SEO Optimization for B2B Website",
    description:
      "Our B2B software company needs SEO optimization to improve organic traffic and lead generation.",
    budget_type: BudgetType.FIXED,

    budget: 3500,
    estimated_duration: "1 month",
    skills_required: [
      "SEO",
      "Google Analytics",
      "Keyword Research",
      "Link Building",
      "Content Optimization"
    ],
    created_at: "2025-05-08T09:20:00Z",
    updated_at: "2025-05-08T09:20:00Z"
  },
  {
    id: "11-22rher",
    user_id: "8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e",
    title: "Frontend Development for Real Estate Platform",
    description:
      "We are building a real estate listing platform and need a frontend developer to create an intuitive and responsive user interface. The platform will include property listings, search filters, user accounts, and interactive maps.",
    budget_type: BudgetType.FIXED,

    budget: 9000,
    estimated_duration: "2.5 months",
    skills_required: [
      "React.js",
      "TypeScript",
      "CSS/SASS",
      "Responsive Design",
      "Google Maps API"
    ],
    created_at: "2025-05-09T08:00:00Z",
    updated_at: "2025-05-09T08:00:00Z"
  }
];

export const jobs: IJobCircular[] = [
  {
    id: "job-123",
    title: "Senior Frontend Developer",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "TechCorp Solutions",
    location: "San Francisco, CA (Remote)",
    employment_type: "Full-time",
    salary: {
      min: 120000,
      max: 150000,
      currency: "USD",
      period: "yearly"
    },
    experience_level: "Senior level",
    posted_date: "2025-05-02",
    application_deadline: "2025-06-02",
    responsibilities: [
      "Build responsive web applications using React",
      "Collaborate with design team to implement UI/UX",
      "Write clean, maintainable, and efficient code",
      "Perform code reviews and mentor junior developers"
    ],
    requirements: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with state management libraries",
      "CSS-in-JS and component libraries expertise"
    ],
    benefits: [
      "Flexible working hours",
      "Remote work options",
      "Health insurance",
      "401(k) matching"
    ],
    tags: ["React", "TypeScript", "Frontend", "Remote"],
    logo: "https://picsum.photos/48/48"
  },
  {
    id: "job-456",
    title: "Data Scientist",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "AnalyticsMind",
    location: "Boston, MA (Hybrid)",
    employment_type: "Full-time",
    salary: {
      min: 110000,
      max: 140000,
      currency: "USD",
      period: "yearly"
    },
    experience_level: "Mid level",
    posted_date: "2025-05-07",
    application_deadline: "2025-05-28",
    responsibilities: [
      "Develop and implement machine learning models",
      "Clean and preprocess large datasets",
      "Present insights and findings to stakeholders",
      "Collaborate with engineering teams to deploy models"
    ],
    requirements: [
      "Masters or PhD in Statistics, Computer Science, or related field",
      "3+ years experience with Python and data science libraries",
      "Knowledge of SQL and database structures",
      "Experience with cloud-based ML platforms (AWS, GCP, or Azure)"
    ],
    benefits: [
      "Professional development budget",
      "Flexible work schedule",
      "Comprehensive health benefits",
      "Annual company retreat"
    ],
    tags: ["Python", "Machine Learning", "Data Science", "SQL"],
    logo: "https://picsum.photos/48/48"
  },
  {
    id: "job-789",
    title: "UX/UI Designer",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "CreativeWave",
    location: "New York, NY (On-site)",
    employment_type: "Full-time",
    salary: {
      min: 90000,
      max: 115000,
      currency: "USD",
      period: "yearly"
    },
    experience_level: "Mid level",
    posted_date: "2025-05-05",
    application_deadline: "2025-05-30",
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Develop wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with product managers and developers"
    ],
    requirements: [
      "Bachelor's degree in Design or related field",
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Adobe XD)",
      "Strong portfolio demonstrating user-centered design process"
    ],
    benefits: [
      "Design conference stipend",
      "Latest design hardware and software",
      "Wellness program",
      "Catered lunches"
    ],
    tags: ["UX Design", "UI Design", "Figma", "User Research"],
    logo: "https://picsum.photos/48/48"
  },
  {
    id: "job-101",
    title: "DevOps Engineer",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "CloudNative Systems",
    location: "Austin, TX (Remote)",
    employment_type: "Contract",
    salary: {
      min: 75,
      max: 95,
      currency: "USD",
      period: "hourly"
    },
    experience_level: "Senior level",
    posted_date: "2025-05-09",
    application_deadline: "2025-05-25",
    responsibilities: [
      "Manage CI/CD pipelines and infrastructure as code",
      "Optimize system performance and reliability",
      "Implement security best practices",
      "Support development teams with deployment automation"
    ],
    requirements: [
      "5+ years of experience with Docker, Kubernetes, and containerization",
      "Strong knowledge of cloud platforms (AWS/Azure/GCP)",
      "Experience with monitoring and alerting tools",
      "Scripting abilities in Python, Bash, or similar"
    ],
    benefits: [
      "Flexible hours",
      "Remote work",
      "Contract extension possibility",
      "Weekly team social activities"
    ],
    tags: ["DevOps", "Kubernetes", "AWS", "CI/CD"],
    logo: "https://picsum.photos/48/48"
  },
  {
    id: "job-202",
    title: "Marketing Coordinator",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "BrandSpark Media",
    location: "Chicago, IL (Hybrid)",
    employment_type: "Part-time",
    salary: {
      min: 35,
      max: 45,
      currency: "USD",
      period: "hourly"
    },
    experience_level: "Entry level",
    posted_date: "2025-05-08",
    application_deadline: "2025-05-22",
    responsibilities: [
      "Assist with social media management and content creation",
      "Help plan and execute marketing campaigns",
      "Track and report on marketing metrics",
      "Support event coordination and promotion"
    ],
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Excellent communication and writing skills",
      "Familiarity with social media platforms",
      "Basic graphic design skills"
    ],
    benefits: [
      "Flexible schedule (20-25 hours/week)",
      "Professional development opportunities",
      "Potential for full-time conversion",
      "Team outings and events"
    ],
    tags: ["Marketing", "Social Media", "Part-time", "Entry Level"],
    logo: "https://picsum.photos/48/48"
  },
  {
    id: "job-303",
    title: "Healthcare Administrator",
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    company: "MediCare Health Services",
    location: "Denver, CO (On-site)",
    employment_type: "Full-time",
    salary: {
      min: 65000,
      max: 80000,
      currency: "USD",
      period: "yearly"
    },
    experience_level: "Mid level",
    posted_date: "2025-05-01",
    application_deadline: "2025-05-31",
    responsibilities: [
      "Oversee daily operations of healthcare facility",
      "Manage staff scheduling and resource allocation",
      "Ensure compliance with healthcare regulations",
      "Coordinate with medical staff on patient care improvements"
    ],
    requirements: [
      "Bachelor's degree in Healthcare Administration or related field",
      "2+ years experience in healthcare management",
      "Knowledge of healthcare regulations and compliance",
      "Strong organizational and leadership skills"
    ],
    benefits: [
      "Medical and dental insurance",
      "Retirement plan with employer match",
      "Paid time off and sick leave",
      "Continuing education assistance"
    ],
    tags: ["Healthcare", "Administration", "Management", "Medical"],
    logo: "https://picsum.photos/48/48"
  }
];
