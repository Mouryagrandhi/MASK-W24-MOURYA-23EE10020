

let questions = [];
let userAns = [];
let currentQuestionIndex = 0;
let score = 0;
const chrimg = document.getElementById('image');
const hint = document.getElementById('hint');
const ans = document.getElementById('input');
const nxt = document.getElementById('nxtbtn');
const prev = document.getElementById('prevbtn');
const sub = document.getElementById('submitbtn');
const finsub = document.getElementById('finalsubbtn');
const result = document.getElementById('result-area');
const questarea = document.getElementById('questionarea');
const quizcont= document.getElementById('quizcontainer');

fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    displayQuestion();
  });

function displayQuestion() {
  questarea.classList.remove('active'); // Start fade out

  setTimeout(() => {
    const question = questions[currentQuestionIndex];
  
    chrimg.src = question.image;
    hint.innerHTML = `<p>${question.hint}</p>`;
    ans.value = userAns[currentQuestionIndex] || ''; 
    nxt.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'block';
    prev.style.display = currentQuestionIndex === 0 ? 'none' : 'block';

    questarea.classList.add('active'); // start fade in
  }, 300); 
}

sub.addEventListener('click', () => {
  const userAnswer = ans.value.trim();
  const correctAnswer = questions[currentQuestionIndex].answer;

  userAns[currentQuestionIndex] = userAnswer || ''; 

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
  }
  alert('Successful Submission, Your answer is safe with us!!!');
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  }
});

nxt.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  }
});

prev.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
});

finsub.addEventListener('click', () => {
  questarea.classList.remove('active');//start fadeout
  
  
  setTimeout(() => {
    let resultsHTML = `<h2>Quiz Results</h2><p>Your Score: ${score}/${questions.length}</p>`;
  
    questions.forEach((q, index) => {
      const userAnswer = userAns[index] || 'N/A';
      const isCorrect = userAnswer.toLowerCase() === q.answer.toLowerCase();
      resultsHTML += `
        <div>
          <p>Question: ${q.hint}</p>
          <p>Your Answer: ${userAnswer}</p>
          <p>${isCorrect ? 'Correct!' : `Incorrect! The correct answer was ${q.answer}.`}</p>
        </div>`;
    });

    result.innerHTML = resultsHTML;
    questarea.style.display = 'none';
    result.style.display = 'block';
    
    setTimeout(() => {
      result.classList.add('active');
    }, 300);
    
  }, 300);
});


