let boxes = document.querySelectorAll(".box")
let resetbutton = document.querySelector("#rstbtn")
let newGame = document.querySelector(".nwgm")
let msgcont = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")

let turnO = true; // playerX and playerO
// 2D array
const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,5,8],
    [2,4,6],
    [3,4,8],
    [6,7,8],
    [1,4,7],
];
const resetgame = ()=>{
    turnO = true;
    enableboxes()
    msgcont.classList.add("hide")

}

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("box was clicked")
       if(turnO) {
        box.innerText = "O"
        turnO = false;
       } else{
        box.innerText = "X";
        turnO= true;
       }
       box.disabled = true;
       checkwinner();
    })
})

const disableboxes =()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableboxes =()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText= ""
    }
}
const showwinner = (winner)=>{
    msg.innerText = `WINNER IS:${winner}`
    msgcont.classList.remove("hide")
    disableboxes();
}

const checkwinner =()=>{
   for(let pattern of winpatterns){
    console.log(pattern[0], pattern[1], pattern[2])
    console.log(
        boxes[pattern[0]].innerText,
        boxes[pattern[1]].innerText, 
        boxes[pattern[2]].innerText
    )
    let pos1val = boxes[pattern[0]].innerText
    let pos2val = boxes[pattern[1]].innerText
    let pos3val = boxes[pattern[2]].innerText
    if(pos1val !="" && pos2val != "" && pos3val !=""){
        if(pos1val === pos2val && pos2val === pos3val){
            showwinner(pos1val);
        }
    }
   }
}

newGame.addEventListener("click", resetgame)
resetbutton.addEventListener("click", resetgame)