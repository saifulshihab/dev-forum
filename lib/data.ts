import { IJobCircular } from "@/types/job";
import { BudgetType, IProject } from "@/types/project";

export const questions: any[] = [
  {
    id: "q1",
    title: "What is the difference between let, var, and const in JavaScript?",
    description:
      "I am confused about when to use let, var, and const in JavaScript. Can someone explain with examples?",
    tags: ["javascript", "variables", "es6"],
    user: {
      id: "0",
      fullName: "saiful",
      email: "user@gmail.com",
      bio: "",
      createdAt: new Date(),
      dob: new Date(),
      dpUrl: "",
      location: "",
      updatedAt: new Date(),
      username: "",
      websiteUrl: ""
    },
    userId: "u1",
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 0,
    answers: [
      {
        id: "a1",
        content:
          "`var` is function-scoped, `let` and `const` are block-scoped. `const` cannot be reassigned.",
        user: {
          id: "0",
          fullName: "saiful",
          email: "user@gmail.com",
          bio: "",
          createdAt: new Date(),
          dob: new Date(),
          dpUrl: "",
          location: "",
          updatedAt: new Date(),
          username: "",
          websiteUrl: ""
        },
        userId: "u2",
        like: 0,
        dislike: 0,
        questionId: "q1",
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        replies: [
          {
            id: "a2",
            content:
              "Exactly! Also, avoid `var` in modern JavaScript unless you need legacy support.",
            userId: "u3",
            like: 0,
            dislike: 0,
            questionId: "q1",
            parentId: "a1",
            createdAt: new Date(),
            updatedAt: "2025-08-14T10:06:00Z",
            user: { id: "", name: "shihab" },
            replies: [
              {
                id: "a6",
                content:
                  "True, but `var` can still be useful in certain closure patterns.",
                userId: "u4",
                like: 1,
                dislike: 0,
                questionId: "q1",
                parentId: "a2",
                createdAt: new Date(),
                updatedAt: "2025-08-14T10:07:00Z",
                user: { id: "1", name: "rahim" },
                replies: [
                  {
                    id: "a7",
                    content:
                      "Right, but those cases are rare in ES6+ projects.",
                    userId: "u5",
                    like: 0,
                    dislike: 0,
                    questionId: "q1",
                    parentId: "a6",
                    createdAt: new Date(),
                    updatedAt: "2025-08-14T10:08:00Z",
                    user: { id: "2", name: "karim" },
                    replies: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "q2",
    title: "How to optimize SQL queries for large datasets?",
    description:
      "My database queries are getting slow when dealing with millions of rows. What can I do to improve performance?",
    tags: ["sql", "database", "optimization"],
    user: { id: "0", name: "saiful" },
    userId: "u2",
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    answers: [
      {
        id: "a3",
        content: "Use proper indexing and avoid SELECT * when possible.",
        user: { id: "0", name: "saiful" },
        userId: "u1",
        questionId: "q2",
        like: 0,
        dislike: 0,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        replies: [
          {
            id: "a4",
            content:
              "Also, consider using query caching if your data isn't changing frequently.",
            user: { id: "0", name: "saiful" },
            userId: "u3",
            questionId: "q2",
            like: 0,
            dislike: 0,
            parentId: "a3",
            createdAt: new Date(),
            updatedAt: new Date(),
            replies: [
              {
                id: "a5",
                content:
                  "Yes, caching can significantly reduce load on your DB.",
                user: { id: "0", name: "saiful" },
                like: 0,
                dislike: 0,
                userId: "u2",
                questionId: "q2",
                parentId: "a4",
                createdAt: new Date(),
                updatedAt: new Date(),
                replies: [
                  {
                    id: "a8",
                    content:
                      "Also, partitioning large tables can help improve query performance.",
                    user: { id: "3", name: "jalal" },
                    like: 0,
                    dislike: 0,
                    userId: "u6",
                    questionId: "q2",
                    parentId: "a5",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    replies: [
                      {
                        id: "a9",
                        content:
                          "Agreed! Especially for time-series data, partitioning is very effective.",
                        user: { id: "4", name: "habib" },
                        like: 0,
                        dislike: 0,
                        userId: "u7",
                        questionId: "q2",
                        parentId: "a8",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        replies: [
                          {
                            id: "2232",
                            content: "This is awesome reply. Created by saiful",
                            createdAt: new Date(),
                            dislike: 0,
                            like: 0,
                            replies: [],
                            questionId: "q90",
                            user: {
                              id: "sdd",
                              name: "shihab"
                            },
                            userId: "79079",
                            updatedAt: new Date()
                          },
                          {
                            id: "2232",
                            content: "This is awesome reply. Created by saiful",
                            createdAt: new Date(),
                            dislike: 0,
                            like: 0,
                            replies: [],
                            questionId: "q90",
                            user: {
                              id: "sdd",
                              name: "shihab"
                            },
                            userId: "79079",
                            updatedAt: new Date()
                          },
                          {
                            id: "2232",
                            content: "This is awesome reply. Created by saiful",
                            createdAt: new Date(),
                            dislike: 0,
                            like: 0,
                            replies: [],
                            questionId: "q90",
                            user: {
                              id: "sdd",
                              name: "shihab"
                            },
                            userId: "79079",
                            updatedAt: new Date()
                          },
                          {
                            id: "2232",
                            content: "This is awesome reply. Created by saiful",
                            createdAt: new Date(),
                            dislike: 0,
                            like: 0,
                            replies: [],
                            questionId: "q90",
                            user: {
                              id: "sdd",
                              name: "shihab"
                            },
                            userId: "79079",
                            updatedAt: new Date()
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: "2232",
        content: "This is awesome answer. Made by shihab",
        createdAt: new Date(),
        dislike: 0,
        like: 0,
        replies: [
          {
            id: "2232",
            content: "This is awesome reply. Created by saiful",
            createdAt: new Date(),
            dislike: 0,
            like: 0,
            replies: [
              {
                id: "2232",
                content: "This is awesome answer. Made by shihab",
                createdAt: new Date(),
                dislike: 0,
                like: 0,
                replies: [
                  {
                    id: "2232",
                    content: "This is awesome reply. Created by saiful",
                    createdAt: new Date(),
                    dislike: 0,
                    like: 0,
                    replies: [],
                    questionId: "q90",
                    user: {
                      id: "sdd",
                      name: "shihab"
                    },
                    userId: "79079",
                    updatedAt: new Date()
                  },
                  {
                    id: "2232",
                    content: "This is awesome reply. Created by saiful",
                    createdAt: new Date(),
                    dislike: 0,
                    like: 0,
                    replies: [],
                    questionId: "q90",
                    user: {
                      id: "sdd",
                      name: "shihab"
                    },
                    userId: "79079",
                    updatedAt: new Date()
                  },
                  {
                    id: "2232",
                    content: "This is awesome reply. Created by saiful",
                    createdAt: new Date(),
                    dislike: 0,
                    like: 0,
                    replies: [],
                    questionId: "q90",
                    user: {
                      id: "sdd",
                      name: "shihab"
                    },
                    userId: "79079",
                    updatedAt: new Date()
                  },
                  {
                    id: "2232",
                    content: "This is awesome reply. Created by saiful",
                    createdAt: new Date(),
                    dislike: 0,
                    like: 0,
                    replies: [],
                    questionId: "q90",
                    user: {
                      id: "sdd",
                      name: "shihab"
                    },
                    userId: "79079",
                    updatedAt: new Date()
                  }
                ],
                questionId: "q90",
                user: {
                  id: "sdd",
                  name: "shihab"
                },
                userId: "79079",
                updatedAt: new Date()
              }
            ],
            questionId: "q90",
            user: {
              id: "sdd",
              name: "shihab"
            },
            userId: "79079",
            updatedAt: new Date()
          }
        ],
        questionId: "q90",
        user: {
          id: "sdd",
          name: "shihab"
        },
        userId: "79079",
        updatedAt: new Date()
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

import { sleep } from "@/lib/utils";

export async function getQuestions() {
  await sleep(5000);
  return questions;
}

export async function getQuestion(id: string) {
  await sleep(1000);
  return questions.find((question) => question.id === id);
}

export async function getProjects() {
  await sleep(500);
  return projects;
}

export async function getJobs() {
  await sleep(500);
  return jobs;
}

export async function getCommunityActivity() {
  await sleep(500);

  // Mock activity data - in real app, this would come from database
  const activities = [
    {
      id: "act-001",
      type: "question" as const,
      title: "New question about React Server Components",
      description: "Understanding React Server Components and their use cases",
      user: "react_dev",
      stats: {
        views: 45,
        answers: 2
      },
      tags: ["react", "server-components"]
    },
    {
      id: "act-002",
      type: "answer" as const,
      title: "Great answer on NextAuth.js implementation",
      description: "Detailed explanation with code examples",
      user: "auth_expert",
      stats: {
        upvotes: 12
      },
      tags: ["nextauth", "authentication"]
    },
    {
      id: "act-003",
      type: "user" as const,
      title: "New member joined: Shihab",
      description: "Full-stack developer with 5 years experience",
      user: "shiha6"
    },
    {
      id: "act-004",
      type: "trending" as const,
      title: "Docker vs Kubernetes discussion trending",
      description: "Hot debate about container orchestration choices",
      user: "cloud_architect",
      stats: {
        views: 234,
        answers: 8
      },
      tags: ["docker", "kubernetes", "devops"]
    }
  ];

  return activities;
}

export async function getCommunityStats() {
  await sleep(300);

  // Mock community statistics - in real app, this would be calculated from database
  const stats = {
    totalUsers: 1247,
    totalQuestions: 892,
    totalAnswers: 2156,
    jobsPosted: 156,
    freelanceProjects: 89,
    trendingTopics: ["react", "nextjs", "typescript", "docker", "aws", "python"]
  };

  return stats;
}

export const countries = [
  {
    name: "Afghanistan"
  },
  {
    name: "Albania"
  },
  {
    name: "Algeria"
  },
  {
    name: "Andorra"
  },
  {
    name: "Angola"
  },
  {
    name: "Antigua and Barbuda"
  },
  {
    name: "Argentina"
  },
  {
    name: "Armenia"
  },
  {
    name: "Australia"
  },
  {
    name: "Austria"
  },
  {
    name: "Azerbaijan"
  },
  {
    name: "Bahamas"
  },
  {
    name: "Bahrain"
  },
  {
    name: "Bangladesh"
  },
  {
    name: "Barbados"
  },
  {
    name: "Belarus"
  },
  {
    name: "Belgium"
  },
  {
    name: "Belize"
  },
  {
    name: "Benin"
  },
  {
    name: "Bhutan"
  },
  {
    name: "Bolivia"
  },
  {
    name: "Bosnia and Herzegovina"
  },
  {
    name: "Botswana"
  },
  {
    name: "Brazil"
  },
  {
    name: "Brunei"
  },
  {
    name: "Bulgaria"
  },
  {
    name: "Burkina Faso"
  },
  {
    name: "Burundi"
  },
  {
    name: "Cabo Verde"
  },
  {
    name: "Cambodia"
  },
  {
    name: "Cameroon"
  },
  {
    name: "Canada"
  },
  {
    name: "Central African Republic"
  },
  {
    name: "Chad"
  },
  {
    name: "Chile"
  },
  {
    name: "China"
  },
  {
    name: "Colombia"
  },
  {
    name: "Comoros"
  },
  {
    name: "Congo"
  },
  {
    name: "Costa Rica"
  },
  {
    name: "Croatia"
  },
  {
    name: "Cuba"
  },
  {
    name: "Cyprus"
  },
  {
    name: "Czechia"
  },
  {
    name: "Democratic Republic of the Congo"
  },
  {
    name: "Denmark"
  },
  {
    name: "Djibouti"
  },
  {
    name: "Dominica"
  },
  {
    name: "Dominican Republic"
  },
  {
    name: "Ecuador"
  },
  {
    name: "Egypt"
  },
  {
    name: "El Salvador"
  },
  {
    name: "Equatorial Guinea"
  },
  {
    name: "Eritrea"
  },
  {
    name: "Estonia"
  },
  {
    name: "Eswatini"
  },
  {
    name: "Ethiopia"
  },
  {
    name: "Fiji"
  },
  {
    name: "Finland"
  },
  {
    name: "France"
  },
  {
    name: "Gabon"
  },
  {
    name: "Gambia"
  },
  {
    name: "Georgia"
  },
  {
    name: "Germany"
  },
  {
    name: "Ghana"
  },
  {
    name: "Greece"
  },
  {
    name: "Grenada"
  },
  {
    name: "Guatemala"
  },
  {
    name: "Guinea"
  },
  {
    name: "Guinea-Bissau"
  },
  {
    name: "Guyana"
  },
  {
    name: "Haiti"
  },
  {
    name: "Honduras"
  },
  {
    name: "Hungary"
  },
  {
    name: "Iceland"
  },
  {
    name: "India"
  },
  {
    name: "Indonesia"
  },
  {
    name: "Iran"
  },
  {
    name: "Iraq"
  },
  {
    name: "Ireland"
  },
  {
    name: "Israel"
  },
  {
    name: "Italy"
  },
  {
    name: "Ivory Coast"
  },
  {
    name: "Jamaica"
  },
  {
    name: "Japan"
  },
  {
    name: "Jordan"
  },
  {
    name: "Kazakhstan"
  },
  {
    name: "Kenya"
  },
  {
    name: "Kiribati"
  },
  {
    name: "Kuwait"
  },
  {
    name: "Kyrgyzstan"
  },
  {
    name: "Laos"
  },
  {
    name: "Latvia"
  },
  {
    name: "Lebanon"
  },
  {
    name: "Lesotho"
  },
  {
    name: "Liberia"
  },
  {
    name: "Libya"
  },
  {
    name: "Liechtenstein"
  },
  {
    name: "Lithuania"
  },
  {
    name: "Luxembourg"
  },
  {
    name: "Madagascar"
  },
  {
    name: "Malawi"
  },
  {
    name: "Malaysia"
  },
  {
    name: "Maldives"
  },
  {
    name: "Mali"
  },
  {
    name: "Malta"
  },
  {
    name: "Marshall Islands"
  },
  {
    name: "Mauritania"
  },
  {
    name: "Mauritius"
  },
  {
    name: "Mexico"
  },
  {
    name: "Micronesia"
  },
  {
    name: "Moldova"
  },
  {
    name: "Monaco"
  },
  {
    name: "Mongolia"
  },
  {
    name: "Montenegro"
  },
  {
    name: "Morocco"
  },
  {
    name: "Mozambique"
  },
  {
    name: "Myanmar"
  },
  {
    name: "Namibia"
  },
  {
    name: "Nauru"
  },
  {
    name: "Nepal"
  },
  {
    name: "Netherlands"
  },
  {
    name: "New Zealand"
  },
  {
    name: "Nicaragua"
  },
  {
    name: "Niger"
  },
  {
    name: "Nigeria"
  },
  {
    name: "North Korea"
  },
  {
    name: "North Macedonia"
  },
  {
    name: "Norway"
  },
  {
    name: "Oman"
  },
  {
    name: "Pakistan"
  },
  {
    name: "Palau"
  },
  {
    name: "Palestine"
  },
  {
    name: "Panama"
  },
  {
    name: "Papua New Guinea"
  },
  {
    name: "Paraguay"
  },
  {
    name: "Peru"
  },
  {
    name: "Philippines"
  },
  {
    name: "Poland"
  },
  {
    name: "Portugal"
  },
  {
    name: "Qatar"
  },
  {
    name: "Romania"
  },
  {
    name: "Russia"
  },
  {
    name: "Rwanda"
  },
  {
    name: "Saint Kitts and Nevis"
  },
  {
    name: "Saint Lucia"
  },
  {
    name: "Saint Vincent and the Grenadines"
  },
  {
    name: "Samoa"
  },
  {
    name: "San Marino"
  },
  {
    name: "Sao Tome and Principe"
  },
  {
    name: "Saudi Arabia"
  },
  {
    name: "Senegal"
  },
  {
    name: "Serbia"
  },
  {
    name: "Seychelles"
  },
  {
    name: "Sierra Leone"
  },
  {
    name: "Singapore"
  },
  {
    name: "Slovakia"
  },
  {
    name: "Slovenia"
  },
  {
    name: "Solomon Islands"
  },
  {
    name: "Somalia"
  },
  {
    name: "South Africa"
  },
  {
    name: "South Korea"
  },
  {
    name: "South Sudan"
  },
  {
    name: "Spain"
  },
  {
    name: "Sri Lanka"
  },
  {
    name: "Sudan"
  },
  {
    name: "Suriname"
  },
  {
    name: "Sweden"
  },
  {
    name: "Switzerland"
  },
  {
    name: "Syria"
  },
  {
    name: "Taiwan"
  },
  {
    name: "Tajikistan"
  },
  {
    name: "Tanzania"
  },
  {
    name: "Thailand"
  },
  {
    name: "Timor-Leste"
  },
  {
    name: "Togo"
  },
  {
    name: "Tonga"
  },
  {
    name: "Trinidad and Tobago"
  },
  {
    name: "Tunisia"
  },
  {
    name: "Turkey"
  },
  {
    name: "Turkmenistan"
  },
  {
    name: "Tuvalu"
  },
  {
    name: "Uganda"
  },
  {
    name: "Ukraine"
  },
  {
    name: "United Arab Emirates"
  },
  {
    name: "United Kingdom"
  },
  {
    name: "United States"
  },
  {
    name: "Uruguay"
  },
  {
    name: "Uzbekistan"
  },
  {
    name: "Vanuatu"
  },
  {
    name: "Vatican City"
  },
  {
    name: "Venezuela"
  },
  {
    name: "Vietnam"
  },
  {
    name: "Yemen"
  },
  {
    name: "Zambia"
  },
  {
    name: "Zimbabwe"
  }
];
