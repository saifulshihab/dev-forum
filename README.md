# Dev Forum

Dev Forum is an online platform where software developers can showcase their portfolios, bid on projects, and connect with recruiters to get hired.

<img alt='screenshot' src='https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/508a45121098563.68c131f10f6fb.png' />

## Stack

- Next.js 14 (App Router)
- Shadcn/UI
- Tailwind CSS
- Prisma/Postgres

## Setup & Installation

### Clone the repository

```cmd
git clone https://github.com/saifulshihab/dev-forum.git
cd dev-forum
```

### Install dependencies

```cmd
npm install
```

### Environment variables

There is an .env.example file. Copy it to .env.

```cmd
cp .env.example .env
```

Open .env and set all necessary values.

### Database setup with Prisma

- Generate the Prisma client:

```cmd
npx prisma generate
```

- Run migrations (if any) to set up database schema:

```cmd
npx prisma migrate deploy
```

or (for development)

```cmd
npx prisma migrate dev
```

### Build / Start the application

- For development mode:

```cmd
npm run dev
```

- For production build:

```cmd
npm run build
npm start
```

### Live

https://dev-forum-rho.vercel.app
