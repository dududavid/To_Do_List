const express = require('express');
const app = express();
const port = 3000;
let list = [];
app.use(express.json());
app.get('/', (req, res) =>
{res.sendFile(__dirname + '/ToDoList.html')});
app.listen(port, () => {console.log(`http://localhost:${port}`)});
app.get('/list', (req, res) => {
    res.json(list);
})