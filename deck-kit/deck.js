    const slides = Array.from(document.querySelectorAll('.slide'));
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let index = 0;

    function render() {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      counter.textContent = `${index + 1} / ${slides.length}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
    }

    function next() {
      if (index < slides.length - 1) {
        index += 1;
        render();
      }
    }

    function prev() {
      if (index > 0) {
        index -= 1;
        render();
      }
    }

    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    window.addEventListener('keydown', (e) => {
      if (["ArrowRight", " ", "PageDown"].includes(e.key)) {
        e.preventDefault();
        next();
      }
      if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        prev();
      }
      if (e.key === 'Home') {
        index = 0;
        render();
      }
      if (e.key === 'End') {
        index = slides.length - 1;
        render();
      }
    });

    render();
