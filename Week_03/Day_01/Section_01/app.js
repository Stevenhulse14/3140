/**
 * This demo is to explain how js can manipulate the DOM
 * 
 */


// get a node list 
const nodelist = document.querySelectorAll('img');

// this is a node list so we need to convert it to an array

const arrlist = [...nodelist];

// we need to add a setInterval to each image
/**
  
 * we need to add a degree variable to each image
 * we need to add a degree increment to each image
 * we need to add a degree rotation to each image
 * we need to add a degree reset to each image
 * we need to add a degree increment to each image
 * we need to add a degree rotation to each image
 * we need to add a degree reset to each image
 */
arrlist.forEach(img => {
    let degree = 0; 


    if(degree ===360) degree = 0;

    setInterval(()=>{
        degree++;
        img.style.transform = `rotate(${degree}deg)`;
    },20);
})


// This setInterval function is to change the background color of the main content


let MainContent = document.querySelector('#content');

setInterval(()=>{
    const colorarray = ["red","blue","green","yellow"]

    let selected = colorarray[Math.floor(Math.random()*colorarray.length)];

    MainContent.style.backgroundColor = selected;

},200)
