// below are qs array
const questions=[
    {
        question: "Which language is called Hyper Text Markup Language?",
        answers:[
            {text:"CSS", correct:false},
            {text:"HTML", correct:true},
            {text:"JS", correct:false},
            {text:"SQL", correct:false},   
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers:[
            {text:"var", correct:true},
            {text:"int", correct:false},
            {text:"String", correct:false},
            {text:"define", correct:false},   
        ]
    },
    {
        question: "Which method selects an element by its ID?",
        answers:[
            {text:"getElementByClass()", correct:false},
            {text:"querySelectorAll()", correct:false},
            {text:"getElementById()", correct:true},
            {text:"selectElement()", correct:false},    
        ]
    },
    {
        question: "Which CSS property is used to change text color?",
        answers:[
            {text:"font-style", correct:false},
            {text:"text-color", correct:false},
            {text:"color", correct:true},
            {text:"background-color", correct:false},    
        ]
    },
    {
        question: "Which JavaScript method prints something in the console?",
        answers:[
            {text:"print()", correct:false},
            {text:"console.log()", correct:true},
            {text:"display()", correct:false},
            {text:"log.console()", correct:false}
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers:[
            {text:"Microsoft", correct:false},
            {text:"Google", correct:false},
            {text:"Netscape", correct:true},
            {text:"Apple", correct:false}
        ]
    },
    {
        question: "Which HTML tag is used to insert an image?",
        answers:[
            {text:"<img>", correct:true},
            {text:"<image>", correct:false},
            {text:"<pic>", correct:false},
            {text:"<src>", correct:false}
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        answers:[
            {text:"//", correct:true},
            {text:"<!-- -->", correct:false},
            {text:"#", correct:false},
            {text:"/* */", correct:false}
        ]
    },
    {
        question: "Which CSS property controls font size?",
        answers:[
            {text:"font-style", correct:false},
            {text:"font-size", correct:true},
            {text:"text-size", correct:false},
            {text:"size", correct:false}
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers:[
            {text:"<link>", correct:false},
            {text:"<a>", correct:true},
            {text:"<href>", correct:false},
            {text:"<hyper>", correct:false}
        ]
    }
];

// below are dom variables:

let questionElement=document.getElementById("question");
let answerButtons = document.getElementById("ans-buttons");
let nextButton=document.getElementById("next-btn");

// qs index solution
let currentQsIndex=0;
let score=0;

// ✅ ADD SHUFFLE FUNCTION HERE
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

//below function begins the quiz:
function startQuiz(){
    currentQsIndex=0;
    score=0;
    shuffle(questions);   // ✅ ADD THIS LINE
    nextButton.innerHTML="Next";
    showQs();
}

//below function shows the quiz questions:
//displays qss
 function showQs(){
    // this function resets the previous qs and ans...
    resetState();

    let currentQs = questions[currentQsIndex];
    let qsNo = currentQsIndex + 1;
    questionElement.innerHTML= `Question ${qsNo} of ${questions.length}: ${currentQs.question}`;
    // qsNo + ". " + currentQs.question;
    
    //displays answer in the button
    currentQs.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn"); // adding classname for the button
        answerButtons.appendChild(button); //adding button on the div where the all  buttons exist
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
 }


// below function used to reset :
 // reset function -
 function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        // removes all the previous answer
        answerButtons.removeChild(answerButtons.firstChild);
    }

 }


// below function used to select answer:
 function selectAnswer(e){
    
    // ✅ ADD THIS LINE FIRST
    if (nextButton.style.display === "block") return;

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    // if selected dataset is true :
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButton.style.display = "block";
 }



// below function shows the score scored.:
 function showScore(){
    resetState();

    // get stored high score (or 0 if none)
    let highScore = localStorage.getItem("highScore") || 0;
    
    if (score > highScore) {
        localStorage.setItem("highScore", score);
        highScore = score;
    }

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!  <br>
    Highest Score: ${highScore}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";

 }

// below function handles the next button:
 function handleNextButton(){
    currentQsIndex++;
    if(currentQsIndex < questions.length){
        showQs();
    }else{
        showScore();
    }
 }

// below function enables eventlistener: 
 nextButton.addEventListener("click", () =>{
    if(currentQsIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
 })

 

// function that starts the quiz:
 // function call to dispaly output
 startQuiz();