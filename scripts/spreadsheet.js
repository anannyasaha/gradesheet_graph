// YOUR CODE GOES HERE
window.onload=function(){
var table=document.getElementById("dataTable");
for(var i =0;i<4;i++){
var row=table.insertRow(i);
for(var j =0;j<4;j++){
    var cell=row.insertCell(j);
    cell.setAttribute("id","cell"+i+j);
    cell.setAttribute("class","tableData");
    cell.innerHTML="4.2";
}
}
for (var i=0;i<4;i++){
    var cell=document.getElementById("cell0"+i);
    cell.setAttribute("class","tableheader");
    if(i==0){
        cell.innerHTML="StudentID"
    }
    if(i>0){
        cell.innerHTML="Assmnt"+i;
    } 
}
for (var i=1;i<4;i++){
    var cell=document.getElementById("cell"+i+"0");
    cell.setAttribute("class","rowheader");
}
for (var i=1;i<4;i++){
    var cell=document.getElementById("cell"+i+"0");
    cell.innerHTML="100000"+i; 
}

    //var cell=document.getElementsByClassName("tableheader");
    $('.tableheader').click(
        function(){
            deselectAll();

            var column=this.id.slice(5);
            if(column==0){
                return false;
            }
            selectcolumn(column);
            return false;
           })

};

function selectRow(row_number){
    for (var i=1;i<4;i++){
        var cell=document.getElementById("cell"+row_number+i);
        cell.style.background="#f0f0ff";
    }
}
function selectcolumn(col_number){
    for (var i=1;i<4;i++){
        console.log(i,col_number)
        var cell=document.getElementById("cell"+i+col_number);
        cell.style.background="#f0f0ff";
    }
}
function deselectAll(){
    for(var i=1;i<4;i++){
        for(var j=1;j<4;j++){
            var cell=document.getElementById("cell"+i+j)
            cell.style.background='white';
        }
    }
}