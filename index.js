import {data}  from "./data.js"; 

let single = document.getElementById("single");
let double = document.getElementById("double");
let options = document.getElementById("options");

let questionsArray =  '';
let paragraph =  '';
let AnswerArray = [];

let SinglePlayerFlag = 0;


// on selecting single player mode , this function is called and options of paragraphs available are displayed, select any and play for the same;
single.addEventListener('click' , ()=>{
    SinglePlayerFlag = 1;
    displayOptions();
})
// on selecting double player mode , this function is called and options of paragraphs available are displayed, select any and play for the same;
double.addEventListener('click' , ()=>{
    SinglePlayerFlag = 0;
    displayOptions();
})

//this function iterates over data.json and shows title of all present paragraphs.
function displayOptions(){
    const title = document.createElement('ul');
    let len = data.length;

    for (let i = 0; i < len; i++) {
        let listItem = document.createElement('li');
        listItem.id = i;
        listItem.textContent = data[i].title;
        listItem.addEventListener('click', () => showData(i, SinglePlayerFlag));
        title.appendChild(listItem);
    }
    options.innerHTML = '';
    options.appendChild(title);
}

//  code to display content of selected paragraph and update answer array with current paragraph array
function showData(id, flag) {
    AnswerArray = [];
    paragraph = "";
    questionsArray ="";

    if (!data || !data[id] || !data[id].questionset) {
        console.error('Invalid data or id.');
        return;
    }
    paragraph = data[id].paragraph;
    questionsArray = data[id].questionset
    .map((question, index) => {
            AnswerArray.push(question.answer);
        return `<div>
                ${question.set.map((option, optIndex) =>
                    `<div>
                        <input type="radio" id="question${id}_option${index}_${optIndex}" name="question${id}_${index}" value="${option}">
                        <label for="question${id}_option${index}_${optIndex}">${option}</label>
                    </div>`
                ).join('')}
        </div><br><br>`
        })
        .join('');

        console.log(AnswerArray);

    options.innerHTML = `<div>${paragraph}</div><br><br>` + questionsArray;
}



function evaluate(){
    let score = 0;
    
    for (let i = 0; i < questionset.length; i++) {
        const selected = document.querySelector(`input[name="${i}_option"]:checked`);
        if(selected && AnswerArray[i] == selected.value)score++;
    } 
    
    alert(`You scored ${score} out of ${questionset.length}`);
}







// submitBtn.addEventListener('click' , ()=>{
//     evaluate();
// })