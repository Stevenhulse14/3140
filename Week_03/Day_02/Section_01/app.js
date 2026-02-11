const board = document.querySelector(".gameboard");

const body = document.querySelector("body");

let temparr = [
  [, ,],
  [, ,],
  [, ,],
];

let turnPlayer = 0;

function tictactoeB(e) {
  e.stopPropagation();
  console.log(e.target.id);
  console.dir(e.target.innerHTML);

  if (e.target.innerHTML === "") {
    if (turnPlayer % 2 === 0) {
      e.target.innerHTML = "X";
    } else {
      e.target.innerHTML = "O";
    }
    turnPlayer++;
  }
}

board.addEventListener("click", tictactoeB);

body.addEventListener("click", (e) => {
  e.target.style.backgroundColor = "red";
});
