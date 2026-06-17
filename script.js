const startButton = document.getElementById("start");
const contentBox = document.getElementById("content-box");
let questionNumber = 0;
const questionScreenElements = {};
const questions = [ 
    {
        question: "Question 1: What state is San Antonio located in?", 
        choices: ["Kansas", "Texas", "Missouri", "Oklahoma"],
        answer: 1
    },
    {
        question: "Question 2: What is the longest river in the U.S?", 
        choices: ["Mississippi", "Missouri", "Delaware", "Meramec"],
        answer: 1 
    }, 
    {
        question: "Question 3: Which major US river flows north to south eventually reaching Canada?", 
        choices: ["Red River of the North", "Red River of the South", "Red River of the East", "Blue River"],
        answer: 0
    }, 
    {   question: "Question 4: What city was the first capital of Missouri?", 
        choices: ["Kansas City", "St. Louis", "Jefferson City", "St. Charles"],
        answer: 3
    }
];

// Helper Functions

const startQuiz = () => {
    contentBox.innerHTML = "";
    const curQuestion = document.createElement("p");
    const answerButtonOne = document.createElement("button");
    const answerButtonTwo = document.createElement("button");
    const answerButtonThree = document.createElement("button");
    const answerButtonFour = document.createElement("button");
    const replyText = document.createElement("p");
    const nextButton = document.createElement("button");

    contentBox.append(curQuestion, answerButtonOne, answerButtonTwo, answerButtonThree, answerButtonFour, replyText, nextButton);

    Object.assign(questionScreenElements, {
        question: curQuestion,
        answerBtns: [answerButtonOne, answerButtonTwo, answerButtonThree, answerButtonFour],
        reply: replyText,
        next: nextButton
    })
    
    replyText.style.visibility = "hidden";
    replyText.innerText = "Invisible text here";
    nextButton.innerText = "Next Question!";
    nextButton.disabled = true;

    nextButton.addEventListener("click", handlenNextQuestion);
    for (const btn of questionScreenElements.answerBtns) {
        btn.addEventListener("click", handleChoice);
        btn.setAttribute("data-iscorrect", "false");
    }
    
    assignQuestionInformation();
}

const assignQuestionInformation = () => {
    const questionInfo = questions[questionNumber];
    console.log(questionInfo)
    const allChoices = questionInfo.choices;
    const answerBtns = questionScreenElements.answerBtns;
    questionScreenElements.question.innerText = questionInfo.question;  
    answerBtns[0].innerText = allChoices[0];
    answerBtns[1].innerText = allChoices[1];
    answerBtns[2].innerText = allChoices[2];
    answerBtns[3].innerText = allChoices[3];
    answerBtns[questionInfo.answer].setAttribute("data-iscorrect", "true");
};

const isCorrectAnswer = (button) => button.dataset.iscorrect === "true";

const handleCorrectAnswer = (btnClicked) => {
    for (const btn of questionScreenElements.answerBtns) btn.disabled = true;
    const reply = questionScreenElements.reply;
    reply.innerText = "Congrats! You got it right! Click the button below to move to the next question!";
    reply.style.visibility = "visible";
    questionScreenElements.next.disabled = false;
    btnClicked.setAttribute("data-iscorrect", "false");
    questionNumber++;
}

const handleIncorrectAnswer = (btnClicked) => {
    btnClicked.disabled = true;
    const reply = questionScreenElements.reply;
    reply.innerText = "Wrong answer, try again!";
    reply.style.visibility = "visible";
}

const handleChoice = (event) => {
    const btnClicked = event.target;
    if (isCorrectAnswer(btnClicked)) handleCorrectAnswer(btnClicked);
    else handleIncorrectAnswer(btnClicked);
}

const handlenNextQuestion = () => {
    if (questionNumber < questions.length) {
        assignQuestionInformation();
        for (const btn of questionScreenElements.answerBtns) btn.disabled = false;
        questionScreenElements.reply.style.visibility = "hidden";
        questionScreenElements.next.disabled = true;
    }
    else {
        questionNumber = 0;
        endQuiz();
    }
}

const endQuiz = () => {
    contentBox.innerHTML = "";
    const endingText = document.createElement("p");
    const restartBtn = document.createElement("button");
    endingText.innerHTML = "Congratulations! You finished the quiz!<br />Press the button below to restart it!";
    restartBtn.innerText = "Restart";
    restartBtn.addEventListener("click", startQuiz);
    contentBox.append(endingText, restartBtn);
    
}

// Event Listeners

startButton.addEventListener("click", startQuiz);