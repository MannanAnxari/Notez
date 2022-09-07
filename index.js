const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express();
const port = 45;
const cors = require('cors');
app.use(cors())

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get("/", (req, res) => {
//   res.send("Hell! It`s Working");
// });


if(process.env.NODE_ENV=='production'){
  const path = require('path')
  app.get('/', (req,res) => {
    app.use(express.static(path.resolve(__dirname, 'client','build')))
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
  })
}

app.listen(port, () => { 
  console.log(`Nota Backend listening at http://localhost:${port}`)
})