document.addEventListener('DOMContentLoaded', () => {
  const product = JSON.parse(localStorage.getItem('product')) || {};

  if (!product || !product.name) {
    document.querySelector('main').innerHTML = '<p>Інформація про товар відсутня.</p>';
    return;
  }

  console.log('Loaded product:', product);

  document.getElementById('product-name').textContent = product.name || 'Назва не вказана';
  document.getElementById('product-img').src = product.img;
  document.getElementById('product-style').textContent = product.style || 'Невідомо';
  document.getElementById('product-color').textContent = product.color || 'Невідомо';
  document.getElementById('product-materials').textContent = product.materials || 'Невідомо';
  document.getElementById('product-price').textContent = product.price || 'Ціна не вказана';

  const lengthSelect = document.getElementById('length-select');
  const widthSelect = document.getElementById('width-select');
  const heightSelect = document.getElementById('height-select');
  const extraInfo = document.getElementById('extra-info');

  const addOptions = (select, values) => {
    const valueArray = Array.isArray(values) ? values : (values ? values.split(',').map(v => v.trim()) : ['Невідомо']);
    select.innerHTML = '';
    valueArray.forEach((value, index) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value + ' см';
      if (index === 0) option.selected = true;
      select.appendChild(option);
    });
  };

  addOptions(lengthSelect, product.lengths);
  addOptions(widthSelect, product.widths);
  addOptions(heightSelect, product.heights);

  const heightLabel = document.querySelector('label[for="height-select"]');
  if (product.type === 'ковдра' || product.type === 'матрац') {
    heightLabel.innerHTML = '<strong>Товщина:</strong>';
  } else if (product.type === 'крісло' || product.type === 'стілець' || product.type === 'ліжко' || product.type === 'диван') {
    heightLabel.innerHTML = '<strong>Висота над підлогою:</strong>';
  } else {
    heightLabel.innerHTML = '<strong>Висота:</strong>';
  }

  const updateExtraInfo = () => {
    extraInfo.innerHTML = '';
    console.log('Product type in updateExtraInfo:', product.type); 

    if (product.type === 'ковдра' || product.type === 'матрац') {
      const sizeTitle = document.createElement('p');
      sizeTitle.innerHTML = '<strong>Розміри ліжка, до якого найбільше пасуватиме:</strong>';
      extraInfo.appendChild(sizeTitle);

      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      const lengths = Array.isArray(product.lengths) ? product.lengths : [product.lengths || 'Невідомо'];
      const widths = Array.isArray(product.widths) ? product.widths : [product.widths || 'Невідомо'];
      const heights = Array.isArray(product.heights) ? product.heights : [product.heights || 'Невідомо'];
      list.innerHTML = `
        <li>Довжина: ${lengths.join(' / ')} см</li>
        <li>Ширина: ${widths.join(' / ')} см</li>
        <li>Висота: ${heights.join(' / ')} см</li>
      `;
      extraInfo.appendChild(list);

      if (product.type === 'ковдра') {
        const tempInfo = document.createElement('p');
        tempInfo.className = 'temperature';
        tempInfo.innerHTML = '<strong>Температура для комфортного використання:</strong> 10–18°C';
        extraInfo.appendChild(tempInfo);
      }
    }
  };

  const slidesContainer = document.querySelector('.slider');
  const indicatorsContainer = document.querySelector('.indicators');
  let currentSlide = 0;
  let slides = [];
  const indicators = [];

  document.querySelectorAll('.slide').forEach(el => el.remove());
  while (indicatorsContainer.firstChild) {
    indicatorsContainer.removeChild(indicatorsContainer.firstChild);
  }

  const images = product.images || [product.img || '../main-page/img/default.jpg'];
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src.trim();
    img.alt = `slide-${index}`;
    img.classList.add('slide');
    if (index === 0) img.classList.add('active');
    slidesContainer.insertBefore(img, indicatorsContainer);
  });

  slides = document.querySelectorAll('.slide');

  slides.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
  });

  window.changeSlide = (direction) => {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  };

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  let currentRating = 0;
  let reviewCount = 3;

  const stars = document.querySelectorAll('.star');
  stars.forEach(star => {
    star.addEventListener('click', function() {
      currentRating = parseInt(this.dataset.rating) || 0;
      updateStars();
    });
    star.addEventListener('mouseover', function() {
      const rating = parseInt(this.dataset.rating) || 0;
      highlightStars(rating);
    });
  });

  document.getElementById('starRating')?.addEventListener('mouseleave', function() {
    updateStars();
  });

  function highlightStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) star.classList.add('active');
      else star.classList.remove('active');
    });
  }

  function updateStars() {
    highlightStars(currentRating);
  }

  function addReview() {
    const reviewText = document.getElementById('reviewInput')?.value.trim() || '';
    const reviewerName = document.getElementById('nameInput')?.value.trim() || '';

    if (!reviewText || !reviewerName || currentRating === 0) {
      alert('Будь ласка, заповніть всі поля та оберіть рейтинг');
      return;
    }

    const reviewsList = document.getElementById('reviewsList');
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    newReview.innerHTML = `
      <div class="avatar"><div class="avatar-icon"></div></div>
      <div class="review-content">
        <div class="reviewer-name">${reviewerName}:</div>
        <div class="review-text">${reviewText}</div>
      </div>
    `;

    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    reviewCount++;
    document.querySelector('.reviews-header').textContent = `Відгуки (${reviewCount})`;

    document.getElementById('reviewInput').value = '';
    document.getElementById('nameInput').value = '';
    currentRating = 0;
    updateStars();

    newReview.style.opacity = '0';
    newReview.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      newReview.style.transition = 'opacity 0.3s, transform 0.3s';
      newReview.style.opacity = '1';
      newReview.style.transform = 'translateY(0)';
    }, 10);
  }

  document.getElementById('reviewInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addReview();
  });
  document.getElementById('nameInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addReview();
  });

  [lengthSelect, widthSelect, heightSelect].forEach(select => {
    select?.addEventListener('change', updateExtraInfo);
  });

  updateExtraInfo();
});