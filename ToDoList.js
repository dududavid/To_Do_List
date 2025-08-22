const express = require('express');
const app = express();
const port = 3000;
const tasks = [];
let nextID = 1;
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ToDoList.html')
});

app.listen(port, () => {console.log(`http://localhost:${port}`)})

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
});

app.post('/task', (req, res) => {
    let text = req.body.txt;
    if (!text) {
        return res.status(400).json({message: 'text is required'});
    }
    let id = nextID++;
    let task = {id,text};
    tasks[id] = task;
    res.status(200).json({message: 'task created'});
});