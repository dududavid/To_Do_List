async function getData(){
    let res = await fetch('/tasks');
    let data = await res.json();
    console.log(data);
    createTable(data);
};
getData();

function createTable(data) {
    let text = "";
    for(obj of data){
        if(obj){
            text += `<tr>`;
            text += `<td>${obj.id}</td>`;
            text += `<td>${obj.text}</td>`;
            text += `<td>${obj.isDone}</td>`;
            text += `<td><button>edit</button></td>`;
            text += `<td><button>delete</button></td>`;
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

async function deleteText(id){

}
