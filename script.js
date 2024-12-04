// Quiz Data: Array of 10 questions
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "Who invented JavaScript?",
    options: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich", "Steve Jobs"],
    correct: "Brendan Eich"
  },
  {
    question: "What is the most used programming language in 2023?",
    options: ["Python", "JavaScript", "C#", "Java"],
    correct: "JavaScript"
  },
  {
    question: "Which company developed the React framework?",
    options: ["Google", "Facebook", "Microsoft", "Amazon"],
    correct: "Facebook"
  },
  {
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"],
    correct: "Mitochondria"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: "Mars"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correct: "Blue Whale"
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"],
    correct: "Water"
  }
];

// Initialize Variables
let currentPage = 0;
let score = 0;
let answers = new Array(quizData.length).fill(null); // Store user answers

const questionsPerPage = 1; // One question per page
const quizContainer = document.getElementById('quiz');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const timerEl = document.getElementById('timer');
const timerBar = document.getElementById('timerBar');

let timer; // Timer variable
const totalTime = 150; // Total time in seconds (2:30 minutes)
let timeLeft = totalTime;

// Function to Start the Timer
function startTimer() {
  clearInterval(timer); // Clear any existing timer

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateTimerBar();

    if (timeLeft <= 0) {
      clearInterval(timer);
      showTimeUpModal();
    }
  }, 1000);
}

// Function to Update Timer Display
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutes`;
}

// Function to Update Timer Bar
function updateTimerBar() {
  const percentage = (timeLeft / totalTime) * 100;
  timerBar.style.width = `${percentage}%`;
}

// Function to Show Time Up Modal
function showTimeUpModal() {
  document.getElementById('timeUpModal').style.display = 'block';
}

// Close Modal and Show Results when clicking 'X'
document.querySelector('.close').onclick = function() {
  document.getElementById('timeUpModal').style.display = 'none';
  showResults(); // Show results when modal is closed
};

// Show Results when clicking 'View Results'
document.getElementById('viewResults').onclick = function() {
  document.getElementById('timeUpModal').style.display = 'none';
  showResults(); // Show results when button is clicked
};

// Function to Load Quiz Question
function loadQuiz() {
  // Clear existing quiz content
  quizContainer.innerHTML = '';

  // Get current question data
  const currentQuestion = quizData[currentPage];

  // Create card for question
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  // Add question title
  const questionTitle = document.createElement('h5');
  questionTitle.textContent = currentQuestion.question;
  cardDiv.appendChild(questionTitle);

  // Add options
  currentQuestion.options.forEach(option => {
    const optionLabel = document.createElement('label');
    const optionInput = document.createElement('input');
    optionInput.type = 'radio';
    optionInput.name = `question${currentPage}`;
    optionInput.value = option;

    // Preserve user's selected answer
    if (answers[currentPage] === option) {
      optionInput.checked = true;
      optionLabel.classList.add('selected');
    }

    // Event listener for option selection
    optionInput.addEventListener('change', () => {
      // If changing from a correct answer, decrement score
      if (answers[currentPage] === currentQuestion.correct) {
        score--;
      }

      // Update answer
      answers[currentPage] = option;

      // If new answer is correct, increment score
      if (option === currentQuestion.correct) {
        score++;
      }

      // Update selected class
      const allLabels = cardDiv.querySelectorAll('label');
      allLabels.forEach(label => label.classList.remove('selected'));
      optionLabel.classList.add('selected');
    });

    optionLabel.appendChild(optionInput);
    optionLabel.appendChild(document.createTextNode(option));
    cardDiv.appendChild(optionLabel);
  });

  // Append card to quiz container
  quizContainer.appendChild(cardDiv);

  // Update Progress Bar
  updateProgressBar();

  // Update Navigation Buttons
  updateNavigationButtons();
}

// Function to Update Progress Bar
function updateProgressBar() {
  const progress = ((currentPage + 1) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Function to Update Navigation Buttons
function updateNavigationButtons() {
  // Enable/Disable Previous Button
  if (currentPage === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Enable/Disable Next Button
  if (currentPage === quizData.length - 1) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }

  // Show Submit Button only on last page
  if (currentPage === quizData.length - 1) {
    submitBtn.style.display = 'inline-block';
  } else {
    submitBtn.style.display = 'none';
  }
}

// Function to Show Results
function showResults() {
  // Clear timer
  clearInterval(timer);

  // Hide timer elements
  document.getElementById('timer').style.display = 'none';
  document.getElementById('timerContainer').style.display = 'none';
  submitBtn.style.display = 'none';
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';

  // Clear quiz container
  quizContainer.innerHTML = '<h4 class="text-center mb-4">Quiz Results</h4>';

  // Display each question with result
  quizData.forEach((question, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const questionTitle = document.createElement('h5');
    questionTitle.textContent = `${index + 1}. ${question.question}`;
    cardDiv.appendChild(questionTitle);

    const userAnswer = answers[index];
    const resultText = userAnswer === question.correct 
      ? 'Correct' 
      : `Incorrect, the correct answer is: ${question.correct}`;
    const resultClass = userAnswer === question.correct ? 'correct' : 'incorrect';

    const resultLabel = document.createElement('p');
    resultLabel.classList.add(resultClass);
    resultLabel.textContent = resultText;
    cardDiv.appendChild(resultLabel);

    quizContainer.appendChild(cardDiv);
  });

  // Display final score
  const finalScore = document.createElement('h5');
  finalScore.classList.add('text-center', 'mt-4');
  finalScore.textContent = `Your score: ${score} out of ${quizData.length}`;
  quizContainer.appendChild(finalScore);

  // Add Restart Button
  const restartContainer = document.createElement('div');
  restartContainer.classList.add('restart-container', 'text-center', 'mt-4');

  const restartButton = document.createElement('button');
  restartButton.classList.add('btn', 'btn-accent', 'btn-lg');
  restartButton.textContent = 'Restart Quiz';
  restartButton.addEventListener('click', restartQuiz);

  restartContainer.appendChild(restartButton);
  quizContainer.appendChild(restartContainer);
}

// Function to Restart Quiz
function restartQuiz() {
  // Reset variables
  currentPage = 0;
  score = 0;
  answers = new Array(quizData.length).fill(null);
  timeLeft = totalTime;

  // Show timer elements
  document.getElementById('timer').style.display = 'block';
  document.getElementById('timerContainer').style.display = 'block';

  // Hide modal if visible
  document.getElementById('timeUpModal').style.display = 'none';

  // Restart timer
  startTimer();

  // Load first question
  loadQuiz();

  // Ensure navigation buttons are visible
  prevBtn.style.display = 'inline-block';
  nextBtn.style.display = 'inline-block';
}

// Initial Load of Quiz
loadQuiz();
startTimer();

// Event Listeners for Navigation Buttons
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    loadQuiz();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < quizData.length - 1) {
    currentPage++;
    loadQuiz();
  }
});

// Event Listener for Submit Button
submitBtn.addEventListener('click', () => {
  showResults();
});

// Function to Update Progress Bar
function updateProgressBar() {
  const progress = ((currentPage + 1) / quizData.length) * 100;
  progressBar.style.transition = 'width 0.6s ease-in-out'; // Add this line for smooth animation
  progressBar.style.width = `${progress}%`;
}
