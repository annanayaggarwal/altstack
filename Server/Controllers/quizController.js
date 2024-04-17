const questions = require("../Data/Questions.json");

const quiz = async (req, res) => {
  res.json(questions);
};

const submit = async (req, res) => {
  const userAnswers = req.body;
  let score = 0;
  const feedback = [];

  userAnswers.forEach((userAnswer, index) => {
    const question = questions[index];
    const isCorrect = userAnswer === question.correctAnswer;
    if (isCorrect) {
      score++;
      feedback.push({
        question: question.question,
        answer: userAnswer,
        correct: true,
      });
    } else {
      feedback.push({
        question: question.question,
        answer: userAnswer,
        correct: false,
        correctAnswer: question.options[question.correctAnswer],
      });
    }
  });

  const percentageScore = (score / questions.length) * 100;

  const overallFeedback = {
    score: percentageScore,
    totalQuestions: questions.length,
    correctAnswers: score,
    incorrectAnswers: questions.length - score,
    feedback: feedback,
  };

  res.json(overallFeedback);
};

module.exports = { quiz, submit };
