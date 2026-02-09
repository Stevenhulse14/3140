// Your code here
const newTable = document.getElementsByTagName('table')[0];

function addRows(){
    const newRow = document.createElement('tr');
    for(let i =0; i < 21; i++){
        const newCell = document.createElement('td');
        newRow.appendChild(newCell);
    }
    newTable.appendChild(newRow);
}


const rowButton = document.getElementById('add-row');
rowButton.addEventListener('click',function(){
    addRows();
});

//const clickbox = document.querySelector('td')

newTable.addEventListener('click',function(cell){

    if(cell.target.matches('td')){
        cell.target.style.background = 'red'
    }
})