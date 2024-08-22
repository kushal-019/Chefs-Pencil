import {paragraph , questionset}  from "./data.js"; 

let single = document.getElementById("single");
let double = document.getElementById("double");
let singleplayer = document.getElementById("singleplayer");
let doubleplayer = document.getElementById("doubleplayer");
let submitBtn = document.getElementById("submitBtn");

let questionsArray =  '';
let AnswerArray = [];

function createQuestionArray(){
    questionsArray =  '';
    AnswerArray = [];
    for(let i=0;i<questionset.length ; i++){
        questionsArray += `<div key=${i}>
        <input type="radio" class="radio" name="${i}_option" id="${i}_option1" value="${questionset[i].set[0]}">
        <label for="${i}_option1">${questionset[i].set[0]}</label>
        <br>
        <input type="radio" class="radio" name="${i}_option" id="${i}_option2" value="${questionset[i].set[1]}">
        <label for="${i}_option2">${questionset[i].set[1]}</label>
        <br>
        <input type="radio" class="radio" name="${i}_option" id="${i}_option3" value="${questionset[i].set[2]}">
        <label for="${i}_option3">${questionset[i].set[2]}</label>
        <br>
        <br>
    </div>`
    
        AnswerArray.push(questionset[i].answer);
    }
    questionsArray = "<br></br>"+questionsArray;
    return ;
}


function evaluate(){
    let score = 0;
    
    for (let i = 0; i < questionset.length; i++) {
        const selected = document.querySelector(`input[name="${i}_option"]:checked`);
        if(selected && AnswerArray[i] == selected.value)score++;
    } 
    
    alert(`You scored ${score} out of ${questionset.length}`);
}

function displaySingleplayerData(){
    const paraDiv = document.createElement('div');
    const questionDiv = document.createElement('div');
    paraDiv.innerHTML = paragraph;    

    createQuestionArray();
    questionDiv.innerHTML = questionsArray;

    while (singleplayer.firstChild) {
        singleplayer.removeChild(singleplayer.firstChild);
    }
    singleplayer.appendChild(paraDiv);
    singleplayer.appendChild(questionDiv);
    
}
submitBtn.style.display = "none";

single.addEventListener('click' , ()=>{
    submitBtn.style.display = "block";
    displaySingleplayerData();
})

submitBtn.addEventListener('click' , ()=>{
    evaluate();
})