function toggleAnswers(toggleElement) {
  const content = toggleElement.nextElementSibling;
  if (content && content.classList.contains('answers-content')) {
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }
}

function addQuestion() {
  const nameInput = document.getElementById('nameInput');
  const questionInput = document.getElementById('questionInput');
  const questionsList = document.getElementById('questionsList');

  const name = nameInput.value.trim();
  const question = questionInput.value.trim();

  if (name && question) {
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.innerHTML = `
      <div class="user-info">
        <div class="avatar">
          <img src="../ware-card/img/avatar-icon.png" alt="avatar-icon" class="avatar-icon">
        </div>
        <div class="question-content">
          <div class="questioner-name">${name}:</div>
          <div class="question-text">${question}</div>
        </div>
      </div>
      <div class="answers-section">
        <div class="answers-toggle" onclick="toggleAnswers(this)">Відповіді (0)</div>
        <div class="answers-content" style="display: none;"></div>
      </div>
    `;

    questionsList.insertBefore(questionItem, questionsList.querySelector('.add-question-section'));
    nameInput.value = '';
    questionInput.value = '';

    questionItem.style.opacity = '0';
    questionItem.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      questionItem.style.transition = 'opacity 0.3s, transform 0.3s';
      questionItem.style.opacity = '1';
      questionItem.style.transform = 'translateY(0)';
    }, 10);
  } else {
    alert('Будь ласка, заповніть усі поля (ім’я та запитання).');
  }
}