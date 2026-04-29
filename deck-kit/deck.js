    const slides = Array.from(document.querySelectorAll('.slide'));
    const counter = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let index = 0;

    function prepareSlides() {
      slides.forEach((slide) => {
        if (slide.querySelector('.slide-frame')) {
          return;
        }

        const frame = document.createElement('div');
        frame.className = 'slide-frame';
        const header = document.createElement('div');
        header.className = 'slide-header';
        const body = document.createElement('div');
        body.className = 'slide-body';
        const bodySelectors = ['.content', '.big-quote'];
        let startedBody = false;

        Array.from(slide.childNodes).forEach((node) => {
          const isElement = node.nodeType === Node.ELEMENT_NODE;
          const isBodyNode = isElement && bodySelectors.some((selector) => node.matches(selector));

          if (isBodyNode) {
            startedBody = true;
          }

          if (!startedBody && isElement) {
            header.appendChild(node);
            return;
          }

          if (!startedBody && !isElement && node.textContent.trim() === '') {
            return;
          }

          body.appendChild(node);
        });

        if (header.childNodes.length > 0) {
          frame.appendChild(header);
        }

        if (body.childNodes.length > 0) {
          frame.appendChild(body);
        }

        slide.replaceChildren(frame);
      });
    }

    function fitActiveSlide() {
      const slide = slides[index];
      if (!slide) {
        return;
      }

      const frame = slide.querySelector('.slide-frame');
      if (!frame) {
        return;
      }

      frame.style.transform = 'scale(1)';

      const fitPadding = 12;
      const availableWidth = Math.max(0, slide.clientWidth - fitPadding);
      const availableHeight = Math.max(0, slide.clientHeight - fitPadding);
      const requiredWidth = frame.scrollWidth;
      const requiredHeight = frame.scrollHeight;
      const scale = Math.min(1, availableWidth / requiredWidth, availableHeight / requiredHeight) * 0.995;

      frame.style.transform = `scale(${scale})`;
    }

    function render() {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      counter.textContent = `${index + 1} / ${slides.length}`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === slides.length - 1;
      fitActiveSlide();
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

    function initTouchNavigation() {
      const swipeThreshold = 48;
      let touchStartX = null;
      let touchStartY = null;

      const container = document.querySelector('.slides');
      if (!container) {
        return;
      }

      container.addEventListener('touchstart', (e) => {
        const touch = e.changedTouches?.[0];
        if (!touch) {
          return;
        }

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      }, { passive: true });

      container.addEventListener('touchend', (e) => {
        const touch = e.changedTouches?.[0];
        if (!touch || touchStartX === null || touchStartY === null) {
          return;
        }

        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        touchStartX = null;
        touchStartY = null;

        if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
          return;
        }

        if (deltaX < 0) {
          next();
          return;
        }

        prev();
      }, { passive: true });
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

    window.addEventListener('resize', fitActiveSlide);

    prepareSlides();
    initTouchNavigation();
    render();
