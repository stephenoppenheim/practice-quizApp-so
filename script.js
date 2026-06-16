const startButton = document.getElementById("start");
const contentBox = document.getElementById("content-box");
const questionNumber = 0;
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

    Object.assign(questionScreenElements, {
        question: curQuestion,
        answerOne: answerButtonOne,
        answerTwo: answerButtonTwo,
        answerThree: answerButtonThree,
        answerFour: answerButtonFour,
        reply: replyText,
        next: nextButton
    })

    console.log(questionScreenElements)
    
    replyText.style.visibility = "hidden";
    replyText.innerText = "Invisible text here";
    nextButton.innerText = "Next Question!";
    assignQuestionInformation(curQuestion, answerButtonOne, answerButtonTwo, answerButtonThree, answerButtonFour);
    contentBox.append(curQuestion);
    contentBox.append(answerButtonOne);
    contentBox.append(answerButtonTwo);
    contentBox.append(answerButtonThree);
    contentBox.append(answerButtonFour);
    contentBox.append(replyText);
    contentBox.append(nextButton);
}

const assignQuestionInformation = (curQuestion, answerButtonOne, answerButtonTwo, answerButtonThree, answerButtonFour) => {
    const questionInfo = questions[questionNumber]
    const allChoices = questionInfo.choices;    
    curQuestion.innerText = questionInfo.question;  
    answerButtonOne.innerText = allChoices[0];
    answerButtonTwo.innerText = allChoices[1];
    answerButtonThree.innerText = allChoices[2];
    answerButtonFour.innerText = allChoices[3];
    const answerButtons = [answerButtonOne, answerButtonTwo, answerButtonThree, answerButtonFour];
    answerButtons[questionInfo.answer].setAttribute("data-iscorrect", "true");
    for (const btn of answerButtons) btn.addEventListener("click", handleChoice);
};

const isCorrectAnswer = (button) => button.dataset.iscorrect === "true";

const handleCorrectAnswer = () => {

}

const handleIncorrectAnswer = (btnClicked) => {
    btnClicked.disabled = true;
    const reply = questionScreenElements.reply;
    reply.innerText = "Wrong answer, try again!";
    reply.style.visibility = "visible";
}

const handleChoice = (event) => {
    const btnClicked = event.target;
    if (isCorrectAnswer(btnClicked)) handleCorrectAnswer()
    else handleIncorrectAnswer(btnClicked);
}

// Event Listeners

startButton.addEventListener("click", startQuiz);