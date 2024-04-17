//here i used fetch to fetch the api there is also the another way which is axios but this mainly for large scale so use fetch here
fetch('http://localhost:3000/v1/api/quiz')
    .then(response => response.json())
    .then(questions => {
        const form = document.getElementById('quiz');
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = `
                <h4>${index + 1}. ${question.question}</h4>
                <ul>
                    ${question.options.map((option, optionIndex) => `
                        <li>
                            <input type="radio" name="question${index}" value="${optionIndex}" required>
                            <label>${option}</label>
                        </li>
                    `).join('')}
                </ul>
                <p id="feedback${index}"></p>
            `;
            form.insertBefore(questionElement, form.lastElementChild);
        });
    });

document.getElementById('quiz').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const answers = [];
    for (const pair of formData.entries()) {
        answers.push(parseInt(pair[1]));
    }
    fetch('http://localhost:3000/v1/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
        .then(response => response.json())
        .then(feedback => {
            feedback.feedback.forEach((item, index) => {
                const feedbackElement = document.getElementById(`feedback${index}`);
                if (item.correct) {
                    feedbackElement.textContent = "Correct";
                    feedbackElement.classList.add('correct'); // Add 'correct' class for correct answers
                    feedbackElement.classList.remove('incorrect'); // Remove 'incorrect' class if present
                } else {
                    feedbackElement.textContent = `Incorrect. Correct answer: ${item.correctAnswer}`;
                    feedbackElement.classList.add('incorrect'); // Add 'incorrect' class for incorrect answers
                    feedbackElement.classList.remove('correct'); // Remove 'correct' class if present
                }
            });
            alert(`Your score: ${feedback.score.toFixed(2)}%\nCorrect Answers: ${feedback.correctAnswers}\nIncorrect Answers: ${feedback.incorrectAnswers}`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
});
