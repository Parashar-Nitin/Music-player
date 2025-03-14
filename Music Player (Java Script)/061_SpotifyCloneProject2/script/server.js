// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const serveIndex = require('serve-index');
// const app = express();

// app.use(cors());  // Enable CORS for all routes

// // Define your /songs route that sends JSON data
// app.get('/songs', (req, res) => {
//     const songs = [
//         { name: 'Song1', artist: 'Artist1' },
//         { name: 'Song2', artist: 'Artist2' }
//     ];
//     res.json(songs);  // Send JSON response
// });

// // Serve static files and directory listing from the "Songs" directory
// app.use('/songs', express.static(path.join(__dirname, 'Songs')), serveIndex(path.join(__dirname, 'Songs'), {'icons': true}));

// // Start the server on port 3000
// app.listen(3000, () => {
//     console.log('Server is running on http://127.0.0.1:3000');
// });


const express = require('express');
const cors = require('cors');
const path = require('path');
const serveIndex = require('serve-index');
const app = express();

app.use(cors());  // Enable CORS for all routes

// Serve static files from the "Songs" folder and also show directory listing
app.use('/songs', express.static(path.join(__dirname, 'Songs')), serveIndex(path.join(__dirname, 'Songs'), { 'icons': true }));

// Serve your index.html and other assets
app.use(express.static(path.join(__dirname, 'public')));

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});
