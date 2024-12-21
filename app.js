let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector(".btn-reset");
let newbtn = document.querySelector(".btn-new");
let msgcontainer = document.querySelector(".msg-container");
let resultmsg = document.querySelector(".msg");
let turnmsg = document.querySelector(".turn-container");

let turnO = true;
const winpattern = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6], // Top-right to bottom-left diagonal
];

const disabledboxes = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enabledboxes = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const reset_btn = () => {
    turnO = true;
    enabledboxes();
    msgcontainer.classList.add("hidden");
    turnmsg.innerText = "Player O starts!";
};

const showWinner = (winner) => {
    resultmsg.innerText = `Hurray! Winner is ${winner}`;
    msgcontainer.classList.remove("hidden");
    disabledboxes();
};

const draw = () => {
    if ([...boxes].every((box) => box.innerText != "")) {
        resultmsg.innerText = "It's a Draw!";
        msgcontainer.classList.remove("hidden");
        disabledboxes();
    }
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    draw(); // for draw
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            turnO = false;
            turnmsg.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            turnO = true;
            turnmsg.innerText = "Player O's Turn";
        }
        box.disabled = true;
        checkwinner(); // Check for winner after every move
    });
});

newbtn.addEventListener("click", reset_btn);
resetbtn.addEventListener("click", reset_btn);
