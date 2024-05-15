
document.addEventListener('DOMContentLoaded', function ()
{
    display();

});

function addStudent(event){
    event.preventDefault();
    let rollno=document.querySelector("#rollno").value;
    let name=document.querySelector("#name").value;
    let age=document.querySelector("#age").value;
    let course=document.querySelector("#course").value
    let id=Math.floor(Math.random()*1000).toString();
    axios.post(`http://localhost:3000/students`,{id,rollno,name,age,course}).then(Response=>display());
       
    
}

function display(){
    
    axios.get(`http://localhost:3000/students`).then(response=>
        displayDataInTable(response.data))
}

function displayDataInTable(data) {
    let tb=document.querySelector("#t-body");
    tb.innerHTML = '';
  
    data.forEach(element => {
        const row=tb.insertRow();
        row.insertCell().textContent=element.rollno;
        row.insertCell().textContent=element.name;
        row.insertCell().textContent=element.age;
        row.insertCell().textContent=element.course;
        row.insertCell().innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')" id="b"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})" id="b"><i class="fa-solid fa-trash"></i></button>`;


    });
  }
  function resetForm(){
    document.querySelector("#t-body").innerHTML="";
  }
  function edit(i,r,n,a,c){
    let rollno=document.querySelector("#rollno").value;
    let name=document.querySelector("#name").value;
    let age=document.querySelector("#age").value;
    let course=document.querySelector("#course").value;
    data={}
    if(rollno!==null&&rollno!=='')
        data.rollno=rollno;
    if(name!==null&&name!=='')
        data.name=name;
    if(age!==null&&age!=='')
        data.age=age;
    if(course!==null&&course!=='')
        data.course=course;
    axios.patch(`http://localhost:3000/students/${i}`,data).then(response=>
        displayDataInTable(response.data))
  }
  function deleteData(id){
    alert("deleting el");
    axios.delete(`http://localhost:3000/students/${id}`)
  }
  
  function sortByField(field) {
    return function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        } else if (a[field] < b[field]) {
            return -1;
        }
        else {
            return 0;
        }
    }
}

function sortAsc(str) {
    const tb = document.getElementById('t-body');
    axios(`http://localhost:3000/students`)
        .then(response => {
            tb.innerHTML = ""
            const data = response.data
            data.sort(sortByField(str))
            data.forEach(element => {
                const row=tb.insertRow();
                row.insertCell().textContent=element.rollno;
                row.insertCell().textContent=element.name;
                row.insertCell().textContent=element.age;
                row.insertCell().textContent=element.course;
                row.insertCell().innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')" id="b"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})" id="b"><i class="fa-solid fa-trash"></i></button>`;
        
        
            })}
        )};
