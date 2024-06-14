# Plena-finance-Backend

Sure, here's a basic README file following your instructions:

```markdown
# User Management Microservice

This microservice is built with Nest.js and manages user data using MongoDB through Mongoose. It includes CRUD operations for users, blocking functionality, and user authentication.

## Getting Started

To run this project locally, follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/PrinceGarg10/PRINCE-GARG-Plena-finance-Backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-management-microservice
   ```

3. Install dependencies using Yarn or npm:

   ```bash
   yarn install
   # or
   npm install
   ```

4. Create a `.env` file using the provided `.env.example` file and fill in the necessary details:

   ```bash
   cp .env.example .env
   ```

   Fill in the required environment variables in the `.env` file.

5. Start the development server using nodemon:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   This command will start the server using nodemon, which will automatically restart the server when changes are detected.

## Building for Production

To build the project for production, run:

```bash
yarn build
# or
npm run build
```

This command will compile TypeScript files into JavaScript and output the build files in the `dist` directory.

## Starting the Production Server

To start the production server, run:

```bash
yarn start
# or
npm start
```

This will start the server using the compiled JavaScript files in the `dist` directory.
