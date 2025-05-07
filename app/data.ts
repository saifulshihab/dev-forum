export type TQuestion = {
  id: string;
  title: string;
  description: string;
  user: string;
  created_at: Date;
  views: number;
  tags?: string[];
  answers?: {
    id: string;
    description: string;
    user: string;
    upvote: number;
    downvote: number;
  }[];
};

export const questions: TQuestion[] = [
  {
    id: "1",
    title: "What is SSR?",
    description: `Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.
        Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.`,
    user: "Jon doe",
    views: 10,
    created_at: new Date(12 - 11 - 2024),
    tags: ["react", "javascript", "web", "js"],
    answers: [
      {
        id: "11",
        description: "This is your answer",
        user: "shihab",
        upvote: 0,
        downvote: 1
      },
      {
        id: "sdsd",
        description: `This contrasts with client-side rendering (CSR), where the browser handles generating the HTML content. SSR provides benefits like faster initial page load times, improved SEO, and a better user experience, especially for applications with dynamic content.`,
        user: "jon",
        upvote: 0,
        downvote: 1
      }
    ]
  },
  {
    id: "2",
    title: "What is SSG?",
    description: `Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.
        Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.`,
    views: 10,
    user: "Jon doe",
    created_at: new Date(12 - 11 - 2024)
  },
  {
    id: "3",
    title: "What nextjs app router?",
    description: `Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.
        Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.`,
    views: 10,
    user: "Jon doe",
    created_at: new Date(12 - 11 - 2024),
    tags: ["css", "ruby", "rust", "html", "matlab"]
  },
  {
    id: "4",
    title:
      "Can't resolve '@vercel/turbopack-next/internal/font/google/font' sporadically on next dev --turbo.",
    description: `This document offers a detailed guide on fixing the "Built-in next/font " error in Next.js, which typically occurs when you're still using the @next/font package in Next.js 13.2 and later.
next/font will automatically optimize your fonts (including custom fonts) and remove external network requests for improved privacy and performance.
The "Built-in next/font" error is triggered when the @next/font package is still installed and used in your Next.js application.
From version 13.2 onward, next/font has been built into Next.js, making the @next/font package redundant. The @next/font package will be completely removed in Next.js 14.
`,
    views: 10,
    user: "Jon doe",
    created_at: new Date(12 - 11 - 2024),
    tags: ["vercel", "turbopack", "next"]
  },
  {
    id: "5",
    title: "What is SSR?",
    description: `Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.
        Server-Side Rendering (SSR) is a web development technique where a
        webpage's content is generated on the server before being sent to the
        client's browser. This contrasts with client-side rendering (CSR), where
        the browser handles generating the HTML content. SSR provides benefits
        like faster initial page load times, improved SEO, and a better user
        experience, especially for applications with dynamic content.`,
    views: 10,
    user: "Jon doe",
    created_at: new Date(12 - 11 - 2024)
  }
];
