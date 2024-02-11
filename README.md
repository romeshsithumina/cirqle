# cirQle: Streamline Issue Tracking with Modernity and Efficiency

## Overview:

![cirQle demo iamge](/public/assets/demo/cirqle-demo.png)

cirQle is a robust and user-friendly bug tracking system built on cutting-edge technologies to empower collaboration and streamline issue management. It leverages the power of Next.js, React, Tailwind CSS, and more to provide a modern UI design and intuitive functionality.

## Key Features:

- Issue Creation and Management:
  - Users can effortlessly create, edit, and delete issues with ease.
  - Comprehensive details can be specified, including title, description, image, type, assigned user, and priority.
  - A modern interface empowers clear and concise issue reporting.
- Project Organization:
  - Create and manage distinct projects within the application, enabling focused issue tracking for various endeavors.
- Modern UI Design:
  - Visually appealing user interface.
  - Intuitive navigation and clear information hierarchies enhance usability.
- Technical Stack:
  - Frontend: Next.js, React, Tailwind CSS, React Hook Form, Zod
  - Backend: Next.js, Node.js, TypeScript, Prisma, SQL Server
  - Authentication: Clerk
  - API Requests: Axios
  - Image Management: Cloudinary

## Getting Started

1. Prerequisites:

   - [Node.js](https://nodejs.org/en) (version 14 or later) and npm, pnpm, yarn, or bun.
   - A SQL Server [Express] database (see [Get Started](https://learn.microsoft.com/en-us/sql/relational-databases/tutorial-getting-started-with-the-database-engine?view=sql-server-ver16))
   - A [Clerk account](https://dashboard.clerk.com/sign-in)
   - A [Cloudinary account](https://cloudinary.com/) (optional, for image uploads)

2. Clone the Repository:

```bash
git clone https://github.com/romeshsithumina/cirqle.git
cd cirqle
```

3. Install Dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Copy .env.local.example to .env.local and .env.example to .env and Configure Environment Variables:

```bash
cp .env.local.example .env.local
cp .env.example .env
```

- Add the following environment variables, replacing placeholders with your actual values:

```bash
DATABASE_URL=<your-database-url>
CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_CLERK_WEBHOOK_SECRET=<your-clerk-webhook-secret>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
```

5. Initialize Prisma:

```bash
npx prisma generate
```

6. Start the Development Server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Access the application in your browser at [http://localhost:3000](http://localhost:3000).

## Acknowledgements

- UI Design inspired by Franta Toman @[Dribble](https://dribbble.com/shots/17185374-Cirqle-App)
