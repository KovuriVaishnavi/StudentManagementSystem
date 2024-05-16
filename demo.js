document.addEventListener("DOMContentLoaded", function () {
    display()
})

function addStudent(event) {
    event.preventDefault();
    let rollno = document.querySelector("#rollno").value;
    let name = document.querySelector("#name").value;
    let age = document.querySelector("#age").value;
    let course = document.querySelector("#course").value;
    let id = Math.floor(Math.random() * 1000).toString();

    if (rollno === '' || name === '' || age === '' || course === '') {
        alert("Please fill all the fields");
    } else {
        const tb = document.getElementById('t-body');
        axios.get(`http://localhost:3000/students`)
            .then(response => {
                const data = response.data;
                const existingStudent = data.find(student => student.rollno === rollno);
                if (existingStudent) {
                    alert("Entered student already exists");
                } else {
                    axios.post(`http://localhost:3000/students`, { id, rollno, name, age, course })
                        .then(response => {
                            display();
                        })
                        
                }
            })
            
    }
}


function display(){
    
    axios.get(`http://localhost:3000/students`)
        .then(response => {
            const data = response.data
            displayDataInTable(data) 
        })
}


function displayDataInTable(dataa) {
    let tb = document.querySelector("#t-body");
    tb.innerHTML = "";

    dataa.forEach(element => {
        const row = tb.insertRow();
        row.insertCell().textContent = element.rollno;
        row.insertCell().textContent = element.name;
        row.insertCell().textContent = element.age;
        row.insertCell().textContent = element.course;
        row.insertCell().innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')" id="b"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})" id="b"><i class="fa-solid fa-trash"></i></button>`;
    });
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
  
  function sortByFieldAsc(field) {
    
    return function (a, b) {
        let num1;
    let num2;
    if(field=='rollno'||field=='id'){
        num1=Number(a[field])
        num2=Number(b[field])
    }
    else{
        num1=a[field]
        num2=b[field]
    }
        if (num1 > num2) {
            return 1;
        } else if (num1 <num2) {
            return -1;
        }
        else {
            return 0;
        }
    }
}
function sortByFieldDesc(field) {
    
    return function (a, b) {
        let num1;
    let num2;
    if(field=='rollno'||field=='id'){
        num1=Number(a[field])
        num2=Number(b[field])
    }
    else{
        num1=a[field]
        num2=b[field]
    }
        if (num1 < num2) {
            return 1;
        } else if (num1 >num2) {
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
            data.sort(sortByFieldAsc(str))
            data.forEach(element => {
                const row=tb.insertRow();
                row.insertCell().textContent=element.rollno;
                row.insertCell().textContent=element.name;
                row.insertCell().textContent=element.age;
                row.insertCell().textContent=element.course;
                row.insertCell().innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')" id="b"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})" id="b"><i class="fa-solid fa-trash"></i></button>`;
        
        
            })}
        )};

        function sortDesc(str) {
            const tb = document.getElementById('t-body');
            axios(`http://localhost:3000/students`)
                .then(response => {
                    tb.innerHTML = ""
                    const data = response.data
                    data.sort(sortByFieldDesc(str))
                    data.forEach(element => {
                        const row=tb.insertRow();
                        row.insertCell().textContent=element.rollno;
                        row.insertCell().textContent=element.name;
                        row.insertCell().textContent=element.age;
                        row.insertCell().textContent=element.course;
                        row.insertCell().innerHTML = `<button onclick="edit('${element.id}','${element.rollno}','${element.name}','${element.age}','${element.course}')" id="b"><i class="fa-solid fa-pen-to-square"></i></button>` + `<button onclick="deleteData(${element.id})" id="b"><i class="fa-solid fa-trash"></i></button>`;
                
                
                    })}
                )};

   
                async function searchDisplay()
{   ele=[]
    let b=false
    let a=document.getElementById("rollno").value
    await axios.get(`http://localhost:3000/students`)
    .then(response=>{
        const data=response.data
        data.forEach(element=>{
            if(element.rollno==a){
                ele.push(element)
                b=true
            }
        })
       
    })
   console.log(ele)
    displayDataInTable(ele)
    return b
}
       