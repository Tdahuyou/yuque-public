//#region Imports
const express = require('express');
const app = express();
const PORT = 3000;
//#endregion

//#region Configurations
app.use(express.json());
//#endregion

//#region Database Mock Functions
// ...
// This region simulates some database operations

/**
 * Simulate fetching data from a database.
 */
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }]);
    }, 1000);
  });
}
//#endregion

//#region API Endpoints
// ...
// Setup a simple API endpoint

/**
 * GET /users endpoint to fetch a list of users.
 */
app.get('/users', async (req, res) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});
//#endregion

//#region Server Startup
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//#endregion