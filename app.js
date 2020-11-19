/* eslint-disable no-undef */
/* eslint-disable strict */
const store = {
  questions: [
    {
      question: 'What anime involves ninjas, jutsu, and hidden villages?',
      answers: [
        'Attack on Titan',
        'Bleach',
        'Naruto',
        'One Piece'
      ],
      correctAnswer: 'Naruto'
    },
    {
      question: 'Who is noted as the creator of the Dragon Ball series?',
      answers: [
        'Hayao Miyazaki',
        'Masashi Kishimoto',
        'Hiro Mashima',
        'Akira Toriyama'
      ],
      correctAnswer: 'Akira Toriyama'
    },
    {
      question: 'Which of these anime plots revolve around time travel?',
      answers: [
        'Erased',
        'My Hero Academia',
        'Gintama',
        'Clannad'
      ],
      correctAnswer: 'Erased'
    },
    {
      question: 'Which character underwent a transformation that forced him/her to eat humans?',
      answers: [
        'Kurisu Makise',
        'Ken Kaneki',
        'Hinata Hyuga',
        'Light Yagami'
      ],
      correctAnswer: 'Ken Kaneki'
    },
    {
      question: 'What anime started its run this year(2020)?',
      answers: [
        'Demon Slayer',
        'The Promised Neverland',
        'Jujutsu Kaisen',
        'Violet Evergarden'
      ],
      correctAnswer: 'Jujutsu Kaisen'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateHomePage() {
  return `<div class="homePage">
    This quiz will test your knowledge of anime!</br>
    </div
    ><button id="startQuiz">Begin Quiz</button>`;
}

function generateQuestion() {
  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, idx) => {
    if (idx === 0) {
      return `<input type="radio" id="${answer}" name="answer" value=${answer} required>
    <label for="${answer}">${answer}</label><br>`;
    }
    return `<input type="radio" id="${answer}" name="answer" value=${answer}>
    <label for="${answer}">${answer}</label><br>`;
  });
  return `<div class="questionSection">
    <div class="question">Question ${store.questionNumber + 1}/${store.questions.length}</div>
    <div class="score">Score: ${store.score} correct, ${store.questionNumber - store.score} incorrect</div>
    <h2>${question.question}</h2>
    <form class="options">
      ${answers.join('')}
      <button id="submitAnswer" class="hideButton">Submit</button>
    </form>
    </div>`;
}

function generateGoodFeedback() {
  return `<div>
    <h2 class="right">Correct!</h2>
    <button id="nextQuestion">Next</button>
    </div>`;
}

function generateBadFeedBack() {
  let correct = store.questions[store.questionNumber].correctAnswer;
  return `<div>
  <h2 class="wrong">Incorrect. The answer is ${correct}.</h2>
  <button id="nextQuestion">Next</button>
</div>`;
}

function generateFeedback(chosen, correct) {
  let feedback = ``;
  $('.hideButton').hide();
  if (chosen === correct) {
    feedback = generateGoodFeedback();
    store.questionNumber += 1;
    store.score += 1;
  } else {
    feedback = generateBadFeedBack();
    store.questionNumber += 1;
  }
  $('main').append(feedback);
}


function generateResults() {
  return `<div class="results">
      <h2>Final Score: ${store.score}</h2>
      ${store.score} out of ${store.questions.length} questions correct.
      </br><button id="restartQuiz">Restart Quiz</button>
    </div>`;  
}

/********** EVENT HANDLER FUNCTIONS **********/

function handleQuiz() {
  $('main').on('click', '#startQuiz', function() {
    store.quizStarted = true;
    render();
  });
}

function handleSubmit() {
  $('main').on('submit', '.options', function(event) {
    event.preventDefault();
    let correct = store.questions[store.questionNumber].correctAnswer;
    let chosen = $('input[name="answer"]:checked').attr('id');
    generateFeedback(chosen, correct);
  });
}

function handleNext() {
  $('main').on('click', '#nextQuestion', function(event) {
    event.preventDefault();
    if (store.questionNumber === store.questions.length) {
      renderResults();
    } else {
      render();
    }
  });
}

function handleRestart() {
  $('main').on('click', '#restartQuiz', function(event) {
    event.preventDefault();
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    render();
  });
}

/********** RENDER FUNCTION(S) **********/

function render() {
  let html = ``;
  if (!store.quizStarted) {
    html = generateHomePage();
    $('main').html(html);
  } else if (store.quizStarted) {
    html = generateQuestion();
    $('main').html(html);
  }
}

function renderResults() {
  let html = ``;
  html = generateResults();
  $('main').html(html);
}

function main() {
  render();
  handleQuiz();
  handleSubmit();
  handleNext();
  handleRestart();
}

$(main);