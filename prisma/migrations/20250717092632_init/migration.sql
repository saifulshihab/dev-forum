-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "platform" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME,
    "present" BOOLEAN,
    "description" TEXT,
    "userId" TEXT,
    CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institute" TEXT NOT NULL,
    "from" DATETIME NOT NULL,
    "to" DATETIME,
    "present" BOOLEAN,
    "description" TEXT,
    "userId" TEXT,
    CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT,
    "image" BLOB,
    "userId" TEXT,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "dob" DATETIME,
    "bio" TEXT,
    "dp" BLOB,
    "dpUrl" TEXT,
    "cover" BLOB,
    "websiteUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
