# Next.js Frontend - Ingenious Plebs

## Overview

This project is intended for lecturers of HMS to create, edit, and view assignments. They can also view student submissions for each assignment and grade them, as well as export the marks per assignment. The web app features a dedicated admin dashboard where admins can manage users and modules, as well as oversee lecturers' assignments and students' submissions.

## Getting Started

### Install Dependencies

This project is built extensively with [shadcn](https://ui.shadcn.com/). To get started with the project, you need to install the necessary dependencies:

```bash
npm install
```

### Environment Variables

Add a `.env` file to the project. Refer to `.env.example` in the project root for the required environment variables.

### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```

You can open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

After building, you can start the production server using:

```bash
npm start
```

This will serve the application at [http://localhost:3000](http://localhost:3000).

## Middleware

The middleware in this application validates a user's token and ensures that users have the required privileges to visit different routes:

- If a user is not logged in, they will be redirected to the login page at `/login`.
- Authenticated admin users will be redirected to the admin dashboard at `/admin/dashboard`.
- Authenticated lecturers will be taken to `/home`.
- Students are denied access to the web app.

## Django Backend

This web app requires the Django backend to function properly. You can find the Django repository [here](https://github.com/bernard-paetzold/HMS-TLS-ingenious-plebs).

## Learn More

To learn more about Next.js, take a look at the [Next.js Documentation](https://nextjs.org/docs)
