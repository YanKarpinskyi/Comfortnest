// function toggleAnswers(toggleElement) {
//   const content = toggleElement.nextElementSibling;
//   if (content.style.display === 'block') {
//     content.style.display = 'none';
//   } else {
//     content.style.display = 'block';
//   }
// }

// function addQuestion() {
//   const nameInput = document.getElementById('nameInput');
//   const questionInput = document.getElementById('questionInput');
//   const starRating = document.getElementById('starRating');
//   const questionsList = document.getElementById('questionsList');

//   const name = nameInput.value.trim();
//   const question = questionInput.value.trim();
//   const rating = starRating.querySelectorAll('.active').length;

//   if (name && question && rating > 0) {
//     const questionItem = document.createElement('div');
//     questionItem.className = 'question-item';
//     questionItem.innerHTML = `
//       <div class="avatar">
//         <img src="../ware-card/img/avatar-icon.png" alt="avatar-icon" class="avatar-icon">
//       </div>
//       <div class="question-content">
//         <div class="questioner-name">${name}:</div>
//         <div class="question-text">${question}</div>
//       </div>
//       <div class="rating">
//         ${Array.from({ length: 5 }, (_, i) => `<span class="star ${i < rating ? 'active' : ''}" data-rating="${i + 1}">★</span>`).join('')}
//       </div>
//       <div class="answers-section">
//         <div class="answers-toggle" onclick="toggleAnswers(this)">Відповіді (0)</div>
//         <div class="answers-content" style="display: none;"></div>
//       </div>
//     `;

//     questionsList.insertBefore(questionItem, questionsList.lastElementChild); // Додаємо перед формою
//     nameInput.value = '';
//     questionInput.value = '';
//     starRating.querySelectorAll('.interactive-star').forEach(star => star.classList.remove('active'));
//   } else {
//     alert('Будь ласка, заповніть усі поля та оцініть запитання.');
//   }
// }

// // Обробка рейтингу
// document.getElementById('starRating').addEventListener('click', (e) => {
//   if (e.target.classList.contains('interactive-star')) {
//     const rating = e.target.getAttribute('data-rating');
//     const stars = document.querySelectorAll('#starRating .interactive-star');
//     stars.forEach(star => star.classList.remove('active'));
//     stars.forEach(star => {
//       if (star.getAttribute('data-rating') <= rating) {
//         star.classList.add('active');
//       }
//     });
//   }
// });






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

    // Додаємо анімацію для нового питання
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