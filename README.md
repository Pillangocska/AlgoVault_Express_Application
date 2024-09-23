# AlgoVault

Basic web application designed to store, manage, and share algorithms. Users can create, edit, and delete algorithm entries, as well as manage their user profiles. Made for the VITMAV42 course.

## Technologies

- Node.js
- Express.js
- MongoDB
- EJS (Embedded JavaScript templates)
- Tailwind CSS

## Setup

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB connection:
   - Create a `.env` file in the root directory
   - Add your MongoDB connection:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

4. Start the application:
   ```
   node index.js
   ```

5. Open a web browser and navigate to `http://localhost:3000`

## Project Structure

- `/config` - Database configuration
- `/middleware` - Middleware functions
- `/models` - MongoDB schema definitions
- `/routes` - Express route definitions
- `/views` - EJS templates
- `/public` - Static assets (there are none right now)
