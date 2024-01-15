# Project Name

This is the CoqinuPay Directory. Users will sign in with Ethereum then edit their profiles to include their twitter usernames. The chrome extension will look users up by twitter username to find their wallet address

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/) (version >= v18.17.0)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the Repository**

   ```bash
   git clone [URL to your repository]
   cd [repository name]
   ```

2. **Set up Environment Variables**

   ```bash
   cp .env.example .env
   ```

   Change the example env values to your own

3. **Install Dependencies**

   ```bash
   npm install
   ```

   Make sure to run this in the root of the turborepo

4. **Setting up Prisma**

   ```bash
    POSTGRES_PRISMA_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```

   Set your own `POSTGRES_PRISMA_URL`

   Then run

   ```bash
   npx prisma generate
   ```

   ```bash
   npx prisma studio
   ```

   To open prisma visual editor

5. **Start Dev Server**

   ```bash
   npm run dev
   ```
