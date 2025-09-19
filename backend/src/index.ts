import express from "express"; // Import Express to create server and routes
import dotenv from "dotenv";   // Import dotenv to load environment variables
import { checkUserExists } from "./user_auth"; // Import fuction to check GitHub user

dotenv.config(); // Load variables from .env into process.env

const app = express(); // Create an Express app
const port = 3000;     // Define port for server

//START USER AUTENTICATION
// Route to check if a GitHub user exists
app.get("/check-user/:username", async (req, res) => {
  const username = req.params.username; // Get the "username" param from URL

  try {
    // Call our function to check user
    const result = await checkUserExists(username, process.env.GITHUB_TOKEN!);

    // Respond with JSON
    res.json({ exists: result }); // e.g., { exists: "Sim" } or { exists: "Não" }
  } catch (error: any) {
    // If something goes wrong, return 500 error with message
    res.status(500).json({ error: error.message });
  }
});
//END USER AUTENTICATION

// Start server
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
