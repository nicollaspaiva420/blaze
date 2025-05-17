document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startQuizBtn = document.getElementById('start-quiz-btn');
    const questionImage = document.getElementById('question-image');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const motivationalMessageContainer = document.getElementById('motivational-message');
    
    const progressBar = document.querySelector('.progress-bar');
    const currentQuestionNumberSpan = document.getElementById('current-question-number');
    const totalQuestionsSpan = document.getElementById('total-questions');

    const finalScoreSpan = document.getElementById('final-score');
    const resultMessageSpan = document.getElementById('result-message');
    const productImageResult = document.getElementById('product-image-result');
    const ctaResultBtn = document.getElementById('cta-result-btn');

    let currentQuestionIndex = 0;
    let score = 0;
    totalQuestionsSpan.textContent = quizData.length;

    function showScreen(screenElement) {
        document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
        screenElement.classList.add('active');
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        motivationalMessageContainer.style.display = 'none';
        motivationalMessageContainer.textContent = '';
        showScreen(quizScreen);
        loadQuestion();
    }

    function updateProgressBar() {
        const progressPercentage = ((currentQuestionIndex + 1) / quizData.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        currentQuestionNumberSpan.textContent = currentQuestionIndex + 1;
    }

    function loadQuestion() {
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionImage.src = currentQuestion.image;
            questionImage.alt = `Imagem para: ${currentQuestion.question.substring(0, 30)}...`;
            questionText.textContent = currentQuestion.question;
            answersContainer.innerHTML = '';

            currentQuestion.answers.forEach(answer => {
                const button = document.createElement('button');
                button.classList.add('answer-button');
                button.innerHTML = `${answer.text} <span class="answer-points">+${answer.points} pontos</span>`;
                button.addEventListener('click', () => selectAnswer(answer.points));
                answersContainer.appendChild(button);
            });

            if (currentQuestion.motivationalMessage) {
                motivationalMessageContainer.textContent = currentQuestion.motivationalMessage;
                motivationalMessageContainer.style.display = 'block';
            } else {
                motivationalMessageContainer.style.display = 'none';
            }
            updateProgressBar();
        } else {
            showResult();
        }
    }

    function selectAnswer(points) {
        score += points;
        currentQuestionIndex++;
        // Esconde a mensagem motivacional anterior antes de carregar a próxima ou resultado
        if(quizData[currentQuestionIndex-1] && quizData[currentQuestionIndex-1].motivationalMessage){
             // A mensagem será atualizada ou escondida no loadQuestion()
        } else {
            motivationalMessageContainer.style.display = 'none';
        }
        loadQuestion();
    }

    function showResult() {
        finalScoreSpan.textContent = score;
        // A mensagem de resultado e imagem do produto já estão no HTML, mas poderiam ser dinâmicas também.
        // Exemplo: resultMessageSpan.textContent = `Sua pontuação foi ${score}! Você desbloqueou o bônus!`;
        // productImageResult.src = 'images/resultado_volumetrao_bonus.png'; 
        showScreen(resultScreen);
    }

    startQuizBtn.addEventListener('click', startQuiz);
    ctaResultBtn.addEventListener('click', () => {
        // Ação do CTA final - pode ser um redirecionamento ou outra lógica
        // alert('Botão CTA clicado! Redirecionando para a página de oferta...');
        // window.location.href = 'https://seusite.com/oferta-volumetrao';
        console.log('Botão CTA final clicado. Pontuação: ', score);
    });

    // Exibir a tela de boas-vindas inicialmente
    showScreen(welcomeScreen);
});

