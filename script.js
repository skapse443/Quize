const questions = [
	{
		question: "What is the capital city of Japan?",
		answers: [
				{text: "Osaka",correct :"false"},
				{text: "Tokyo",correct :"true"},
				{text: "Kyoto",correct :"false"},
				{text: "Nagoya",correct :"false"},
			]
	},
	{
		question:" In which year did the Titanic sink?",
		answers: [
				{text: "1990",correct :"false"},
				{text: "1993",correct :"false"},
				{text: "1912",correct :"true"},
				{text: "1910",correct :"false"},
			]
	},
	{
		question:"What is the largest planet in our solar system?",
		answers: [
				{text: "Jupiter",correct :"true"},
				{text: "Mars",correct :"false"},
				{text: "Earth",correct :"false"},
				{text: "Saturn",correct :"false"},
			]
	},
	{
	question:"What is the currency of Australia?",
		answers: [
				{text: "United States Dollar",correct :"false"},
				{text: "Indian Rupee",correct :"false"},
				{text: "Australian Dollar",correct :"true"},
				{text: "Euro",correct :"false"},
			]
	},
	{
	question:"In which year did World War II end?",
		answers:[
				{text: "1940",correct :"false"},
				{text: "1945",correct :"true"},
				{text: "1930",correct :"false"},
				{text: "1935",correct :"false"},
			]
	}
	];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next" ;
	showQuestion();

}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

	currentQuestion.answers.forEach(answer=>{
		const button = document.createElement("button");
		button.innerHTML = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if(answer.correct){
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click",selectAnswer);
	});
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score++;
	}
	else{
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button =>{
		if(button.dataset.correct === "true"){
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";

}

function showScore(){

	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display = "block";


}

function handleNextButton(){
	currentQuestionIndex++;
	if(currentQuestionIndex < questions.length){
		showQuestion();
	}
	else{
		showScore();
	}
}
nextButton.addEventListener("click",()=>{
	if(currentQuestionIndex < questions.length){
		handleNextButton();
	}
	else{
		startQuiz();
	}
});
startQuiz();
