const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navLinks.classList.toggle('open', !open);
});

navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

document.querySelectorAll('.photo-button').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector('img')?.alt || '';
    lightboxCaption.textContent = button.dataset.caption || '';
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

const quiz = document.querySelector('.quiz-body');
quiz.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    if (quiz.dataset.answered === 'true') return;
    quiz.dataset.answered = 'true';
    const correct = button.dataset.correct === 'true';
    button.classList.add(correct ? 'correct' : 'wrong');
    if (!correct) quiz.querySelector('[data-correct="true"]').classList.add('correct');
    quiz.querySelector('.quiz-result').textContent = correct
      ? '정답! 약 1억 년 전 공룡들의 집단 산란지로 추정됩니다.'
      : '아쉽습니다. 정답은 ‘공룡의 집단 산란지’입니다.';
  });
});
