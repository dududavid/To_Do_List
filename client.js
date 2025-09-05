let data = [];
async function getData(){
    let res = await fetch('/tasks',{
    method: 'GET'
});
    data = await res.json();
    createTable(data);
};


function createTable(data) {
    let text = "";
    for(obj of data){
        if(obj){
            let row = obj.isDone ? "rowClass" : "";
            let check = obj.isDone ? "checked" : "";
            text += `<tr class='${row}'>`;
            text += `<td>${obj.id}</td>`;
            text += `<td>${obj.text}</td>`;
            text += `<td><input type="checkbox" onchange="isChecked(this, ${obj.id})" ${obj.isDone ? "checked" : ""} 
            onchange = "toggleTask(${obj.id}, this.checked)"></td>`;
            /*text += `<td>${obj.isDone}</td>`;*/
            text += `<td><button onclick="taskById(${obj.id})">✏️</button></td>`;
            text += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            text += `</tr>`
        }
    }
    document.getElementById('myTable').innerHTML = text;
}

async function addTask(){
    try{
        let txt = document.getElementById('txt').value;
        let res = await fetch('/tasks',{
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({txt})
        });
        if(res.status === 200){
            alert("נוסף בהצלחה");
        }
        getData();
        document.getElementById('txt').value = '';
    }catch(err){
        alert(arr);
    }
}

async function deleteTask(id){
    try{
        let res = await fetch(`/tasks/${id}`,{
            method: 'DELETE'
        });
        getData();
    }catch(err){
        alert(err);
    }
}

async function taskById(id){
    try{
        let res = await fetch(`/tasks/${id}`,{
            method: 'GET'
        });
        let obj = await res.json();
        document.getElementById('id').value = obj.id;
        document.getElementById('txt').value = obj.text;

    }catch(err){
        alert(err);
    }
}

async function isChecked(element, id){
    try{
        let isDone = element.checked;
        let res = await fetch(`/tasks/${id}`,{
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({isDone})
        })
        getData();
    }catch(err){
        alert(err);
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        editTask(id);
    }else {
        addTask();
    }
}

async function editTask(id){
    try{
        let txt = document.getElementById('txt').value;
        let res = await fetch(`/tasks/${id}`,{
            method: 'PATCH',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({txt})
        })
        getData();
        document.getElementById('id').value = "";
        document.getElementById('txt').value = "";
    }catch (err){
        alert(err);
    }
}

async function toggleTask(id, isDone){
    let res = await fetch(`/tasks/${id}`,{
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({isDone})
    });
    if(res.ok){
        getData();
    }
}
function search(){
    let val = document.getElementById('search').value;
    let sorted = data.filter(obj => obj && obj.text.includes(val));
    if(sorted) {
        createTable(sorted);
    }else{
        createTable(data);
    }
}

getData();