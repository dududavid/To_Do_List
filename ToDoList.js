const express = require('express');
const app = express();
const port = 3000;
const tasks = [];
let nextID = 1;
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ToDoList.html')
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
});

app.post('/task', (req, res) => {
    let text = req.body.txt;
    if (!text) {
        return res.status(400).json({message: 'text is required'});
    }
    let id = nextID++;
    let isDone = false;
    let task = {id,text,isDone};
    tasks[id] = task;
    res.status(200).json({message: 'task created'});
});

app.delete('/tasks/:id', (req, res) => {
    let id = req.params.id;
    if(tasks.length < id || id < 0 || tasks[id] == null){
        return res.status(400).json({message: 'not found'});
    }
    tasks[id] = null;
    res.status(200).json({message: 'task removed'});
})

app.get('/tasks/:id', (req, res) => {
    let id = req.params.id;
    if(tasks.length < id || id < 0 || tasks[id] == null){
        return res.status(400).json({message: 'not found'});
    }
    res.json(tasks[id]);
})

app.patch('/tasks/:id', (req, res) => {
    let id = req.params.id;
    if(tasks.length < id || id < 0 || tasks[id] == null){
        return res.status(400).json({message: 'not found'});
    }
    let isDone = req.body.isDone;
    if(isDone != undefined){
        tasks[id].isDone = isDone;
    }
    let text = req.body.txt;
    if (text) {
        tasks[id].text = text;
    }
    res.json(tasks[id]);
})


app.listen(port, () => {console.log(`http://localhost:${port}`)})