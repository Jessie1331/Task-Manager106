let isImportant = false;
let isVisible = false;
function saveTask(){
         
         const title  = $("#txtTitle").val();
         const discription = $("#txtDiscription").val();
         const budget= $("#numBudget").val();
         const startDate = $("#selStartDate").val();
         const dueDate  = $("#selDueDate ").val();
         const color = $("#selColor").val();
         const status = $("#selStatus ").val();

console.log(title,discription,budget,startDate,dueDate,color,status);
taskToSave= new Task(isImportant,title,discription,budget,startDate,dueDate,color,status);
console.log(taskToSave);



    //get,post,put,patch,delete;
    $.ajax({
    type: "POST",//reads
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(taskToSave),
    contentType: "application/json",
        success: function(response){
        console.log(response);
       },
        error: function(error)
       {
        console.log(error);
    },
});

displayTask(taskToSave);
clearForm();
}
function loadTask(){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function (res) {
            let data = JSON.parse(res);
            // console.log(res);
            console.log(data);
            for ( let i=o; i < data.length; i++) {
                let task = data[i];
                if(task.name == "jesenia") {
                    console.log(task);
                    displayTask(task);
                }
            }
        },
        error: function(error)
        {
            console.log(error);
        },


});
}

function clearForm(){
    $("#txtTitle").val("");
    $("#txtDiscription").val("");
    $("#numBudget").val("");
    $("#selStartDate").val("");
    $("#selDueDate").val("");
    $("#selColor").val('');
    $("#selStatus").val("");
}


function displayTask(task)
{
    let syntax = `
    
    <h2 class='b'>${task.title}"</h2>
    <p class='b'>${task.discription}</p>
    <div>
    <lable class='b'>Budget:</lable>
    <lable>${task.budget}</lable>
      </div>
      <div>
    <lable class='b'>Start Date:</lable>
    <lable>${task.startDate}</lable>
    </div>
    <div>
    <lable class='b'>Due Date:</lable>
    <lable>${task.dueDate}</lable>
     </div>
     <div>
     <lable class='b'>Color:</lable>
    <lable>${task.color}</lable>
    </div>
    <div>
    <lable class='b'>status:</lable>
    <lable>${task.status}</lable>
    </div>
    
    
    `
    ;

    

    $(".pending-task").append(syntax);
}
function toggleImportant(){
     const nonImportantIcon = "fa-solid fa-star";
    const importantIcon = "fa-regular fa-star";
    if(isImportant){
    $("#iImportant").removeClass(importantIcon).addClass(nonImportantIcon);
       isImportant = false;
    }else{
        $("#iImportant").removeClass(nonImportantIcon).addClass(importantIcon);
       isImportant = true;
    } 
}




function toggleVisibility(){
    if (isVisible){
        $("#form").fadeOut();
        isVisible = false;
    }
    else
    {
         
      $("#form").fadeIn();
      isVisible = true;

    }
}

function testRequest(){
    //get,post,put,patch,delete;
    $.ajax({
    type: "GET",//reads
    url: "http://fsdiapi.azurewebsites.net/",
    success: function(response){
        console.log(response);
    },
    error: function(error)
    {
        console.log(error)
    }
});
}

function init(){
    console.log("task manager");
    loadTask();


    //hook events
    $("#btnSave").click(saveTask);
    $("#iImportant").click(toggleImportant);
    $("#btnDetails").click(toggleVisibility)
} 

window.onload = init();