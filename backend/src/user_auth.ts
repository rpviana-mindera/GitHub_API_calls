import axios from "axios"; // Import axios to make HTTP requests to the GitHub API

/**
 * Function to check if a GitHub user exists
 * @param username - the username to check
 * @param token - GitHub token for authentication
 * @returns "Sim" if user exists, "Não" if user does not exist
 */
export async function checkUserExists(username: string, token: string): Promise<string> {
  try {
    // Make a GET request to GitHub API to check user
    await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${token}` // Send token in header for authenticated requests
      }
    });

    // If request succeeds, the user exists
    return "Sim";
  } catch (error: any) {
    // If the error status is 404, the user does not exist
    if (error.response && error.response.status === 404) {
      return "Não";
    }

    // Other errors (rate limit, network issues, etc.)
    throw new Error(error.message);
  }
}
