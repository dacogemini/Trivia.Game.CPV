var quesIndex;
var gameTimer;
var timeAllotted = 30; //seconds

var questionBank = [{
        question: " Which of the following function of Number object formats a number with a specific number of digits to the right of the decimal?",
        answers: [{
                ansID: 1000,
                answer: "toExponential()"
            },
            {
                ansID: 1001,
                answer: "toPrecision()"
            },
            {
                ansID: 1002,
                answer: "toFixed()"
            },
            {
                ansID: 1003,
                answer: "tolocalString()"
            },
        ],
        correct: 1002,
        selected: null,
        reason: "toFixed() −- Formats a number with a specific number of digits to the right of the decimal."
    },
    {
        question: "What does API stand for?",
        answers: [{
                ansID: 1003,
                answer: " Application Protocol Interface"
            },
            {
                ansID: 1004,
                answer: "Application Program Interface"
            },
            {
                ansID: 1005,
                answer: " Applied Program Interface"
            },
            {
                ansID: 1006,
                answer: "Application Protocol Integration"
            },
        ],
        correct: 1004,
        selected: null,
        reason: "An application program interface (API) is a set of routines, protocols, and tools for building software applications."
    },
    {
        question: "What is a closure?",
        answers: [{
                ansID: 1007,
                answer: "The correct way to end a function"
            },
            {
                ansID: 1008,
                answer: "A command that stops a loop"
            },
            {
                ansID: 1009,
                answer: "A method used to check for null"
            },
            {
                ansID: 1010,
                answer: "A function within a function"
            },
        ],
        correct: 1010,
        selected: null,
        reason: "A closure is an inner function that has access to the outer (enclosing) function's variables—scope chain which makes it a function withon a."
    },
    {
        question: "What is the value of the following expression? 8 % 3",
        answers: [{
                ansID: 1011,
                answer: "2"
            },
            {
                ansID: 1012,
                answer: "5"
            },
            {
                ansID: 1012,
                answer: "North Carolina"
            },
            {
                ansID: 1013,
                answer: "Nan"
            },
        ],
        correct: 1011,
        selected: null,
        reason: "% is known as a modulo operator and it is used to get the remainder after integer division. "
    },
]

function populateQuestionDetails() {
    $("#answer-response").hide();

    $("#question-container").empty();
    $("#answers-container").empty();
    $("#answer-response").empty();

    $("#question-container").html(questionBank[quesIndex].question);

    var quesAnswers = questionBank[quesIndex].answers;

    for (var i = 0; i < quesAnswers.length; i++) {
        $("#answers-container").append('<div class="answer" data-content="' + quesAnswers[i].ansID + '">' + quesAnswers[i].answer + '</div>');
    }

    renderQuesControls();
}

function renderQuesControls() {
    if (quesIndex === 0) {
        $("#previousQ").hide();
        $("#nextQ").show();
    } else if (quesIndex === questionBank.length - 1) {
        $("#previousQ").show();
        $("#nextQ").hide();
        $("#finish").show();
    } else {
        $("#previousQ").show();
        $("#nextQ").show();
    }
    // console.log("quesIndex: " + quesIndex + " length: " + questionBank.length);
}

function getPreviousQuestion() {
    quesIndex--;
    populateQuestionDetails();
}

function getNextQuestion() {
    quesIndex++;
    populateQuestionDetails();
}

function processAnswer() {
    var selectedAnsID = parseInt($(this).attr("data-content"));
    var correctAnsID = questionBank[quesIndex].correct;

    if (selectedAnsID === correctAnsID) {
        $("#answer-response").html("<h4>Correct!</h4>");
    } else {
        $("#answer-response").html("<h4>Sorry that's not right.</h4>");
    }

    $("#answer-response").append(questionBank[quesIndex].reason);
    $("#answer-response").show();

    //save the answer the user selected in the questionBank
    questionBank[quesIndex].selected = selectedAnsID;

    console.log(questionBank[quesIndex].selected);
}

$(document).ready(function () {
    //pre init routine
    $("#main-game").hide();
    $("#results-display").hide();
    $("#previousQ").hide();
    $("#nextQ").hide();
    $("#finish").hide();
});

function updateClock() {
    timeAllotted--;
    $("#game-timer").html(timeAllotted);
    if (timeAllotted === 0) {
        clearInterval(gameTimer);
        endGame();
    }
}

$("#start").on("click", function () {
    $("#splash-screen").hide();
    $("#main-game").show();

    gameTimer = setInterval(updateClock, 1000);

    quesIndex = 0;
    populateQuestionDetails(quesIndex);
});


$(document).on("click", ".answer", processAnswer);

$("#previousQ").on("click", getPreviousQuestion);

$("#nextQ").on("click", getNextQuestion);

$("#finish").on("click", endGame);

function endGame() {
    $("#main-game").hide();
    processResults();
    $("#results-display").show();
}

$("#restart").on("click", function () {
    console.log("reload the game.");
    window.location.reload()
});

function processResults() {
    var status;
    var correct = 0;
    var incorrect = 0;
    var score = 0;

    for (var i = 0; i < questionBank.length; i++) {
        if (questionBank[i].correct === questionBank[i].selected) {
            correct++;
            status = "Correct!";
        } else {
            incorrect++;
            status = "Incorrect!";
        }

        if (questionBank[i].selected !== null) {
            //get selected text
            var selectedText = "NA";
            for (var j = 0; j < questionBank[i].answers.length; j++) {
                if (questionBank[i].answers[j].ansID === questionBank[i].selected) {
                    selectedText = questionBank[i].answers[j].answer;
                    break;
                }
            }
        } else {
            selectedText = "--";
        }
        // Correct Answer Text
        var correctText = "NA";
        for (var k = 0; k < questionBank[i].answers.length; k++) {
            if (questionBank[i].answers[k].ansID === questionBank[i].correct) {
                correctText = questionBank[i].answers[k].answer;
                break;
            }
        }

        $("#result-rows").append("<tr><td>" + questionBank[i].question + "</td><td>" + selectedText + "</td><td>" + correctText + "</td><td>" + status + "</td></tr>");
    }


}