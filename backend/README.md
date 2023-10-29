# Todo List / Task management BackEnd Node.js

Welcome to the README.md for the Todo List / Task management BackEnd Node.js project! This project is a robust and scalable backend API built with Node.js, Express.js, and MySQL for managing an Todo list platform. It incorporates various essential features and design patterns to ensure security, scalability, and maintainability.

## Table of Contents

- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Features](#features)
- [Design Patterns](#design-patterns)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)

## Dependencies

The project relies on the following npm packages as its core dependencies:

- [bcrypt](https://www.npmjs.com/package/bcrypt) - For password hashing and salting.
- [crypto](https://www.npmjs.com/package/crypto) - For cryptographic functionality.
- [dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables.
- [express](https://www.npmjs.com/package/express) - A fast and minimalist web framework.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating and verifying JSON Web Tokens (JWT).
- [lodash](https://www.npmjs.com/package/lodash) - Utility functions for JavaScript.
- [slugify](https://www.npmjs.com/package/slugify) - For generating slugs from strings.
- [prisma](https://www.npmjs.com/package/prisma) - Prisma is a next-generation ORM that consists of these tools.

## Dev Dependencies

These are development dependencies used for enhancing the development experience:

- [compression](https://www.npmjs.com/package/compression) - Middleware for response compression.
- [helmet](https://www.npmjs.com/package/helmet) - Middleware to secure Express apps.
- [morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware.
- [cors](https://www.npmjs.com/package/cors) - HTTP request logger middleware.

## Features

The Todo list BackEnd Node.js project includes the following key features:

- **API Key Management**: The API provides functionality for managing API keys securely.

- **Authentication**: Users can register, log in, and authenticate with the API using JWT (JSON Web Tokens).

- **Authorization**: Role-based authorization ensures that only authorized users can access specific endpoints and perform actions.

- **Todo Management**: Create, read, update, and delete todo in the platform.

- **User Management**: Admins can manage users, including creating and updating user roles.

- **Subscription Plan Processing**: Subscription plan with more feature

- **Payment Integration**: Integration with payment gateways for accepting payments.

## Design Patterns

This project incorporates zero essential design patterns:

## Getting Started

Follow these steps to get started with the project:

1. Clone the repository: `git clone https://github.com/kigaijidev/task-manager-full-stack-developer`
2. Move to the repository: `cd task-manager-full-stack-developer`
3. Install dependencies: `cd backend & npm install`
4. Create a `.env` file with necessary environment variables (follow `.env.example`).
5. Migrate Prisma: `npx prisma db push`
6. Generate Prisma: `npx prisma prisma`
7. Run: `npm run start:dev`

## Usage

To run the project, use the following command:

```bash
npm run start
```

The API will be accessible at `http://localhost:PORT`, where `PORT` is the specified port in your `.env` file.

## API Routes
API need `x-api-key` in Headers and `x-client-id`, `authorization` when using API have Authentication.
Here is a brief overview of the API routes and their functionalities:

## Contributing

We welcome contributions from the community. Feel free to submit issues or pull requests to help improve this project.

## License

This project is licensed under the [MIT License](LICENSE.md).

Thank you for using the Todo list BackEnd Node.js project! If you have any questions or need further assistance, please don't hesitate to reach out.
