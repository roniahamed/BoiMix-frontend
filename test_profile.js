// eslint-disable-next-line @typescript-eslint/no-require-imports
const axios = require("axios");

async function test() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loginRes = await axios.post(
      "http://localhost:8000/api/v1/auth/login/",
      {
        email: "admin@boimix.com",
        password: "password123",
      },
    );

    // Fallback if the standard email login isn't setup. Let's just create a token or assume we can't login easily.
  } catch (e) {
    console.error(e.response?.data || e.message);
  }
}
test();
