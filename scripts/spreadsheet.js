// YOUR CODE GOES HERE
var row_number=9;
var column_number=6;
var grad_dict=[];
window.onload=function(){
var table=document.getElementById("dataTable");

for(var i =0;i<row_number;i++){
var row=table.insertRow(i);
for(var j =0;j<column_number;j++){
    var cell=row.insertCell(j);
    cell.setAttribute("id","cell"+i+j);
    cell.setAttribute("class","tableData");
    cell.innerHTML="4.2";
    if(j==4){
        cell.innerHTML="50";
    }
    if(j==5){
        cell.innerHTML="60";
    }
}
}
for (var i=0;i<column_number;i++){
    var cell=document.getElementById("cell0"+i);
    cell.setAttribute("class","tableheader");
    if(i==0){
        cell.innerHTML="StudentID"
    }
    if(i>0&&i<4){
        cell.innerHTML="Assmnt"+i;
    } 
    if(i==4)cell.innerHTML="Midterm";
    if(i==5)cell.innerHTML="Final";
}
for (var i=1;i<row_number;i++){
    var cell=document.getElementById("cell"+i+"0");
    cell.setAttribute("class","rowheader");
}
for (var i=1;i<row_number;i++){
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
            grade(column);
            makeGraph();
            return false;
           })
    $('.rowheader').click(
        function(){
            deselectAll();
    
            var row=this.id.slice(4,5);
            if(row==0){
                return false;
            }
            
            return false;
               })
    $('.tableData').on('click', function() {
        deselectAll();
        this.style.background="#B2FFFF";
        var $this = $(this);
        var $input = $('<input>', {
            value: $this.text(),
            type: 'text',
            width:'60px',
            blur: function() {
            $this.text(this.value);
            },
            keyup: function(e) {
                if (e.which === 13) $input.blur();
            }
            }).appendTo( $this.empty() ).focus();
        });
    

};
function grade(column_no){
    d3.select("svg").remove();
    
        var A_count=0;
        var B_count=0;
        var C_count=0;
        var D_count=0;
        var F_count=0;
        
    for (var i=1;i<row_number;i++){
        var cell=document.getElementById("cell"+i+column_no);
        if(cell.innerHTML>85){
            A_count++;
        }
        else if(cell.innerHTML>75&&cell.innerHTML<86){
            B_count++;
        }
        else if(cell.innerHTML>65&&cell.innerHTML<76){
            C_count++;
        }
        else if(cell.innerHTML>55&&cell.innerHTML<66){
            D_count++;
        }
        else F_count++;
    }
    grad_dict=
    [{"grade": "A", "frequency": A_count/(row_number-1)},
    {"grade": "B", "frequency": B_count/(row_number-1)},
    {"grade": "C", "frequency": C_count/(row_number-1)},
    {"grade": "D", "frequency": D_count/(row_number-1)},
    {"grade": "F", "frequency": F_count/(row_number-1)}]
    console.log(grad_dict);
    

}
function makeGraph(){
    const margin = 50;
    const width = 500;
    const height = 250;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                            .domain([0, 1])
                            .range(['#A3D4FF','#9F9CFF']);
    const xScale = d3.scaleBand() // discrete, bucket
                            .domain(grad_dict.map((data) => data.grade))
                            .range([0, chartWidth])
                            .padding(0.3);
    const yScale = d3.scaleLinear()
                            .domain([0, 1])
                            .range([chartHeight, 0]);
    
    let svg = d3.select('body')
                        .append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .attr("align","center");
    $("svg").css({top: 600, left: 300, position:'absolute'});
    //d3.select('body').attr('align',center);                       
    svg.append('text')
                .attr('x', width / 2)
                .attr('y', margin)
                .attr('text-anchor', 'middle')
                .text('Grade Distribution');
                let g = svg.append('g')
                .attr('transform', `translate(${margin}, ${margin})`);
    svg.append("text")
                .attr("class", "y label")
                .attr("transform", "rotate(-90)")
                .attr("y", 15)
                .attr("x",-25)
                .attr('text-anchor', 'end')
                .text("Frequency(%)");
    svg.append("text")
                .attr("class", "x label")
                .attr("y",240)
                .attr("x",295)
                .attr('text-anchor', 'end')
                .text("Grades");

// y-axis
g.append('g')
    .call(d3.axisLeft(yScale));

// x-axis
g.append('g')
    .attr('transform', `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(xScale));

let rectangles = g.selectAll('rect')
    .data(grad_dict)
    .enter()
        .append('rect')
            .attr('x', (data) => xScale(data.grade))
            .attr('y', (data) => chartHeight)
            .attr('width', xScale.bandwidth())
            .attr('height', (data) => 0)
            .attr('fill', (data) => colourScale(data.frequency))
            .on('mouseenter', function(source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.5);
            })
            .on('mouseleave', function(source, index) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1.0);
            });

rectangles.transition()
    .ease(d3.easeElastic)
    .attr('height', (data) => chartHeight - yScale(data.frequency))
    .attr('y', (data) => yScale(data.frequency))
    .duration(1000)
    .delay((data, index) => index * 50);
        
    }
function selectRow(row_no){
    for (var i=1;i<column_number;i++){
        var cell=document.getElemnetById("cell"+row_no+i);
        cell.style.background="#B2FFFF";
    }
}
function selectcolumn(col_number){
    for (var i=1;i<row_number;i++){
        var cell=document.getElementById("cell"+i+col_number);
        cell.style.background="#B2FFFF";
    }
}
function deselectAll(){
    for(var i=1;i<row_number;i++){
        for(var j=1;j<column_number;j++){
            var cell=document.getElementById("cell"+i+j)
            cell.style.background='white';
        }
    }
}