const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text")); /* creates an array */
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question : 'Which player holds the record for the fastest fifty in IPL?',
        choice1 : 'Yuvraj Singh',
        choice2 : 'Chris Gayle',
        choice3 : 'Andre Rusell',
        choice4 : 'KL Rahul',
        answer: 4,
    },
    {
        question : 'Which team has never made the IPL final?',
        choice1 : 'Punjab Kings',
        choice2 : 'Royal Challengers Bangalore',
        choice3 : 'Delhi Capitals',
        choice4 : 'None of the Above',
        answer: 4,
    },
    {
        question : 'Which batsman has scored the most number of hundreds in the IPL',
        choice1 : 'Virat Kohli',
        choice2 : 'Chris Gayle',
        choice3 : 'David Warner',
        choice4 : 'KL Rahul',
        answer: 2,
    },
    {
        question : 'Which pacer has bowled the highest number of dot balls in the IPL?',
        choice1 : 'Jasprit Bumrah',
        choice2 : 'Dale Steyn',
        choice3 : 'Bhuvneshwar Kumar',
        choice4 : 'Lasith Malinga',
        answer: 3,
    }
    
]

const SCORE_POINTS = 100; 
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; /* spread function */
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 ||  questionCounter>MAX_QUESTIONS)
        {
            localStorage.setItem('mostRecentScore',score);
            return window.location.assign("/end.html");
        }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
        
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question;
    
     choices.forEach(choice => {
          const number = choice.dataset['number']
          choice.innerText = currentQuestion['choice' + number]
     })
                     
    availableQuestions.splice(questionsIndex,1) 
    
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click',e =>{
         if(!acceptingAnswers) return
         
         acceptingAnswers = false
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }
        
        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num =>{
    score+=num
    scoreText.innerText = score
}

startGame()

    



