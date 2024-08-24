const express = require('express');
const path = require('path');
const app = express();

// Set up EJS as the template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

const messages = [
    { text: "Hi there!", user: "Amando", added: new Date() },
    { text: "Hello World!", user: "Charles", added: new Date() }
  ];
  
  // Index route
  app.get('/', (req, res) => {
    res.render('index', { title: "Mini Messageboard", messages: messages });
  });
  
  // New message form route
  app.get('/new', (req, res) => {
    res.render('form');
  });
  // Route to display a single message
app.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];
    res.render('message', { message });
  });
  
  
  // Handle new message submission
  app.post('/new', (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
  });
  

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
