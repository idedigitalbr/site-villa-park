/**
 * ============================================================================
 * VILLA PLAZA PARK — JAVASCRIPT PRINCIPAL & INTERATIVIDADE CANÔNICA
 * ============================================================================
 * Localização: src/js/main.js
 * Módulos:
 *  1. FAQ Accordion (a11y)
 *  2. Mobile Menu Drawer (Off-Canvas, Backdrop, Scroll-Lock)
 *  3. ScrollSpy & Dynamic Header (Auto Hide / Show no Scroll)
 *  4. Carrossel Hero (Autoplay, Touch/Swipe, Keyboard, Reduced-Motion)
 *  5. Carrossel de Bannerzinhos (S3)
 *  6. Carrossel de Banners Horizontais (S4)
 *  7. Botão Voltar ao Topo
 *  8. Modais (Vídeo Institucional, Privacidade/LGPD, Contato/Pedido)
 *  9. Interatividade de Categorias e Depoimentos
 * 10. Inicialização de Ícones Lucide
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialização de Ícones Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ----------------------------------------------------------------------------
   1. FAQ ACCORDION COM ACESSIBILIDADE
   ---------------------------------------------------------------------------- */
function toggleFaq(button) {
  const item = button.closest('.faq-item') || button.closest('.ds-faq-card');
  if (!item) return;
  const isActive = item.classList.toggle('active');
  button.setAttribute('aria-expanded', isActive ? 'true' : 'false');
}
window.toggleFaq = toggleFaq;

/* ----------------------------------------------------------------------------
   2. MOBILE MENU DRAWER OFF-CANVAS
   ---------------------------------------------------------------------------- */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const toggleBtn = document.getElementById('mobileMenuBtn');
  if (!menu) return;

  const isOpen = menu.classList.contains('is-open');
  if (!isOpen) {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('is-open');
    if (toggleBtn) {
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  } else {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('is-open');
    if (toggleBtn) {
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }
}
window.toggleMobileMenu = toggleMobileMenu;

/* ----------------------------------------------------------------------------
   3. SCROLLSPY & HEADER DINÂMICO
   ---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');
  const trackedSections = Array.from(document.querySelectorAll('section[id]')).filter(sec => {
    return ['home', 'ofertas', 'categorias', 'filiais', 'sobre', 'atracoes', 'faq'].includes(sec.id);
  });

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 130;
    let currentId = '';

    for (let i = 0; i < trackedSections.length; i++) {
      const section = trackedSections[i];
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
        break;
      }
    }

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else if (href && href.startsWith('#') && href !== `#${currentId}`) {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});

// Comportamento do Header Dinâmico Inteligente
(function initDynamicHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  let lastScrollY = Math.max(0, window.scrollY || window.pageYOffset);
  let ticking = false;
  const SCROLL_THRESHOLD = 8;
  const TOP_OFFSET = 50;

  function updateHeader() {
    const currentScrollY = Math.max(0, window.scrollY || window.pageYOffset);
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenu && mobileMenu.classList.contains('is-open')) {
      header.classList.remove('header-hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    if (currentScrollY <= TOP_OFFSET) {
      header.classList.remove('header-hidden');
      header.classList.remove('header-scrolled');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    header.classList.add('header-scrolled');
    const diff = currentScrollY - lastScrollY;

    if (Math.abs(diff) >= SCROLL_THRESHOLD) {
      if (diff > 0 && currentScrollY > TOP_OFFSET) {
        header.classList.add('header-hidden');
      } else if (diff < 0) {
        header.classList.remove('header-hidden');
      }
      lastScrollY = currentScrollY;
    }

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
})();

/* ----------------------------------------------------------------------------
   4. CARROSSEL HERO
   ---------------------------------------------------------------------------- */
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slide-dot');
const heroSection = document.getElementById('home');
let autoplayTimer = null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateCarousel() {
  slides.forEach((s, idx) => {
    if (idx === currentSlide) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
  dots.forEach((d, idx) => {
    if (idx === currentSlide) {
      d.className = 'slide-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#1b4329] border border-white/50 transition-all duration-300 flex-shrink-0 shadow-sm';
    } else {
      d.className = 'slide-dot w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#3e6f4f]/80 hover:bg-[#1b4329] transition-all duration-300 flex-shrink-0';
    }
  });
}

function nextSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  if (!slides.length) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
}

function setSlide(idx) {
  currentSlide = idx;
  updateCarousel();
}

function startAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  if (prefersReducedMotion || slides.length < 2) return;
  autoplayTimer = setInterval(nextSlide, 6000);
}

function resetAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  startAutoplay();
}

window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.setSlide = setSlide;

if (heroSection) {
  let touchStartX = 0;
  let touchEndX = 0;

  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide();
      resetAutoplay();
    }
  }, { passive: true });

  heroSection.addEventListener('mouseenter', () => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  });
  heroSection.addEventListener('mouseleave', () => {
    if (!prefersReducedMotion) startAutoplay();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevSlide();
    resetAutoplay();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    resetAutoplay();
  }
});

updateCarousel();
startAutoplay();

/* ----------------------------------------------------------------------------
   5. CARROSSEL DE DESTAQUES INFINITO (S2 DESTAQUES / OFERTAS)
   ---------------------------------------------------------------------------- */
(function initDestaquesCarousel() {
  const track = document.getElementById('destaquesTrack');
  const viewport = document.getElementById('destaquesViewport') || track;
  const carouselContainer = document.getElementById('destaquesCarousel') || viewport;
  if (!track || !viewport) return;

  const origCards = Array.from(track.querySelectorAll('.destaque-card-wrap'));
  const N = origCards.length;
  if (N < 2) return;

  // Limpa clones pré-existentes se houver
  track.querySelectorAll('.destaque-clone-wrap').forEach(el => el.remove());

  // Cria clones antes e depois para navegação infinita e contínua sem quebras
  const clonesBefore = origCards.map((c, i) => {
    const clone = c.cloneNode(true);
    clone.className = clone.className.replace('destaque-card-wrap', 'destaque-clone-wrap');
    clone.setAttribute('data-clone', 'before');
    clone.setAttribute('data-card-idx', i);
    return clone;
  });

  const clonesAfter = origCards.map((c, i) => {
    const clone = c.cloneNode(true);
    clone.className = clone.className.replace('destaque-card-wrap', 'destaque-clone-wrap');
    clone.setAttribute('data-clone', 'after');
    clone.setAttribute('data-card-idx', i);
    return clone;
  });

  clonesBefore.reverse().forEach(cl => track.insertBefore(cl, track.firstChild));
  clonesAfter.forEach(cl => track.appendChild(cl));

  // Índice no trilho (começa no primeiro card original, que é N)
  let currentTrackIdx = N;
  let isAnimating = false;
  let autoplayTimer = null;

  function getCardOffset(idx) {
    const children = track.children;
    if (!children.length) return 0;
    const clamped = Math.max(0, Math.min(idx, children.length - 1));
    return children[clamped].offsetLeft - children[0].offsetLeft;
  }

  function updateDestaquesDots(cardIdx) {
    const dots = document.querySelectorAll('.destaques-dot');
    if (!dots.length) return;
    dots.forEach((dot, idx) => {
      if (idx === cardIdx) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });
  }

  function setTrackPosition(idx, animated = true) {
    if (animated) {
      isAnimating = true;
      track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    currentTrackIdx = idx;
    const offset = getCardOffset(currentTrackIdx);
    track.style.transform = `translateX(-${offset}px)`;

    const cardIdx = ((currentTrackIdx - N) % N + N) % N;
    updateDestaquesDots(cardIdx);
  }

  // Normalização invisível ao alcançar clones nos extremos
  track.addEventListener('transitionend', (e) => {
    if (e.target !== track) return;
    isAnimating = false;
    if (currentTrackIdx >= 2 * N) {
      currentTrackIdx -= N;
      track.style.transition = 'none';
      const offset = getCardOffset(currentTrackIdx);
      track.style.transform = `translateX(-${offset}px)`;
      void track.offsetHeight;
    } else if (currentTrackIdx < N) {
      currentTrackIdx += N;
      track.style.transition = 'none';
      const offset = getCardOffset(currentTrackIdx);
      track.style.transform = `translateX(-${offset}px)`;
      void track.offsetHeight;
    }
  });

  function destaquesNext() {
    if (isAnimating) return;
    setTrackPosition(currentTrackIdx + 1, true);
    resetDestaquesAutoplay();
  }

  function destaquesPrev() {
    if (isAnimating) return;
    setTrackPosition(currentTrackIdx - 1, true);
    resetDestaquesAutoplay();
  }

  function destaquesGoTo(targetCardIdx) {
    if (isAnimating) return;
    const currentCardIdx = ((currentTrackIdx - N) % N + N) % N;
    let diff = targetCardIdx - currentCardIdx;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    setTrackPosition(currentTrackIdx + diff, true);
    resetDestaquesAutoplay();
  }

  // Autoplay suave e respeitoso
  function startDestaquesAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    autoplayTimer = setInterval(() => {
      if (!document.hidden && !isMouseDragging && !isTouchDragging) {
        destaquesNext();
      }
    }, 5000);
  }

  function resetDestaquesAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    startDestaquesAutoplay();
  }

  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      if (autoplayTimer) clearInterval(autoplayTimer);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      startDestaquesAutoplay();
    });
  }

  // Touch & Mouse Drag Interativo
  let isTouchDragging = false;
  let isMouseDragging = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isHorizontal = null;
  let initialTranslate = 0;
  let dragMoved = false;

  viewport.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    if (autoplayTimer) clearInterval(autoplayTimer);
    isTouchDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    currentX = startX;
    isHorizontal = null;
    dragMoved = false;
    initialTranslate = getCardOffset(currentTrackIdx);
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!isTouchDragging || e.touches.length !== 1) return;
    currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    if (isHorizontal === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontal) {
      if (e.cancelable) e.preventDefault();
      dragMoved = true;
      track.style.transform = `translateX(-${initialTranslate - deltaX}px)`;
    }
  }, { passive: false });

  viewport.addEventListener('touchend', () => {
    if (!isTouchDragging) return;
    isTouchDragging = false;
    const deltaX = currentX - startX;
    const threshold = 40;

    if (isHorizontal && dragMoved) {
      if (deltaX < -threshold) {
        destaquesNext();
      } else if (deltaX > threshold) {
        destaquesPrev();
      } else {
        setTrackPosition(currentTrackIdx, true);
      }
    } else {
      setTrackPosition(currentTrackIdx, true);
    }
    setTimeout(() => { dragMoved = false; }, 120);
    startDestaquesAutoplay();
  }, { passive: true });

  viewport.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    if (autoplayTimer) clearInterval(autoplayTimer);
    isMouseDragging = true;
    startX = e.clientX;
    currentX = startX;
    dragMoved = false;
    initialTranslate = getCardOffset(currentTrackIdx);
    track.style.transition = 'none';
    track.classList.add('cursor-grabbing');
    track.classList.remove('cursor-grab');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isMouseDragging) return;
    currentX = e.clientX;
    const deltaX = currentX - startX;
    if (Math.abs(deltaX) > 6) {
      dragMoved = true;
      track.style.transform = `translateX(-${initialTranslate - deltaX}px)`;
    }
  });

  window.addEventListener('mouseup', () => {
    if (!isMouseDragging) return;
    isMouseDragging = false;
    track.classList.remove('cursor-grabbing');
    track.classList.add('cursor-grab');
    const deltaX = currentX - startX;
    const threshold = 40;

    if (dragMoved) {
      if (deltaX < -threshold) {
        destaquesNext();
      } else if (deltaX > threshold) {
        destaquesPrev();
      } else {
        setTrackPosition(currentTrackIdx, true);
      }
    } else {
      setTrackPosition(currentTrackIdx, true);
    }
    setTimeout(() => { dragMoved = false; }, 120);
    startDestaquesAutoplay();
  });

  // Previne clique involuntário nos cards durante swipe/drag
  track.addEventListener('click', (e) => {
    if (dragMoved) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Recalcula alinhamento ao redimensionar tela
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setTrackPosition(currentTrackIdx, false);
    }, 100);
  }, { passive: true });

  // Inicializa na posição do primeiro card original
  setTrackPosition(N, false);
  startDestaquesAutoplay();

  // Exposição global para botões HTML inline (onclick="destaquesNext()", etc.)
  window.destaquesGoTo = destaquesGoTo;
  window.destaquesNext = destaquesNext;
  window.destaquesPrev = destaquesPrev;
  window.scrollBanners = function(dir) { if (dir === 'left') destaquesPrev(); else destaquesNext(); };
  window.scrollToBanner = function(idx) { destaquesGoTo(idx); };

  Object.defineProperty(window, 'currentDestaque', {
    get() { return ((currentTrackIdx - N) % N + N) % N; },
    set(val) { destaquesGoTo(val); },
    configurable: true
  });
})();

/* ----------------------------------------------------------------------------
   6. CARROSSEL DE BANNERS HORIZONTAIS (S4)
   ---------------------------------------------------------------------------- */
let currentHSlide = 0;
const hTrack = document.getElementById('hBannersTrack');
const hDots = document.querySelectorAll('.h-slide-dot');
const hCarouselSection = document.getElementById('horizontalBannerCarousel');
const totalHSlides = hTrack ? hTrack.children.length : 0;
let hAutoplayTimer = null;

function updateHCarousel() {
  if (!hTrack) return;
  hTrack.style.transform = `translateX(-${currentHSlide * 100}%)`;
  hDots.forEach((dot, idx) => {
    if (idx === currentHSlide) {
      dot.className = 'h-slide-dot w-7 sm:w-8 h-2 sm:h-2.5 rounded-full bg-brand-red transition-all duration-300 focus:outline-none';
    } else {
      dot.className = 'h-slide-dot w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white/60 hover:bg-white transition-all duration-300 focus:outline-none';
    }
  });
}

function nextHSlide() {
  if (totalHSlides <= 1) return;
  currentHSlide = (currentHSlide + 1) % totalHSlides;
  updateHCarousel();
}

function prevHSlide() {
  if (totalHSlides <= 1) return;
  currentHSlide = (currentHSlide - 1 + totalHSlides) % totalHSlides;
  updateHCarousel();
}

function setHSlide(idx) {
  currentHSlide = idx;
  updateHCarousel();
}

function startHAutoplay() {
  if (hAutoplayTimer) clearInterval(hAutoplayTimer);
  if (prefersReducedMotion || totalHSlides <= 1) return;
  hAutoplayTimer = setInterval(nextHSlide, 5500);
}

function resetHAutoplay() {
  if (hAutoplayTimer) clearInterval(hAutoplayTimer);
  startHAutoplay();
}

window.nextHSlide = nextHSlide;
window.prevHSlide = prevHSlide;
window.setHSlide = setHSlide;

if (hCarouselSection) {
  let hTouchStartX = 0;
  let hTouchEndX = 0;

  hCarouselSection.addEventListener('touchstart', (e) => {
    hTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  hCarouselSection.addEventListener('touchend', (e) => {
    hTouchEndX = e.changedTouches[0].screenX;
    const threshold = 40;
    if (hTouchEndX < hTouchStartX - threshold) {
      nextHSlide();
      resetHAutoplay();
    } else if (touchEndX > touchStartX + threshold) {
      prevHSlide();
      resetHAutoplay();
    }
  }, { passive: true });

  hCarouselSection.addEventListener('mouseenter', () => {
    if (hAutoplayTimer) clearInterval(hAutoplayTimer);
  });
  hCarouselSection.addEventListener('mouseleave', () => {
    startHAutoplay();
  });
}

updateHCarousel();
startHAutoplay();

/* ----------------------------------------------------------------------------
   7. BOTÃO VOLTAR AO TOPO
   ---------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;
  if (window.scrollY > 350) {
    btn.classList.remove('opacity-0', 'pointer-events-none');
    btn.classList.add('opacity-100', 'pointer-events-auto');
  } else {
    btn.classList.remove('opacity-100', 'pointer-events-auto');
    btn.classList.add('opacity-0', 'pointer-events-none');
  }
}, { passive: true });

/* ----------------------------------------------------------------------------
   8. CONTROLE DE MODAIS (VÍDEO, PRIVACIDADE, PEDIDO/CONTATO)
   ---------------------------------------------------------------------------- */
// Vídeo Institucional
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoModalContainer');
  const video = document.getElementById('institutionalVideo');
  if (!modal || !video) return;

  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  if (container) {
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
  }
  document.body.style.overflow = 'hidden';

  video.currentTime = 0;
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(function(err) {
      console.warn('Autoplay bloqueado pelo navegador:', err);
    });
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const container = document.getElementById('videoModalContainer');
  const video = document.getElementById('institutionalVideo');
  if (!modal) return;

  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  if (container) {
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
  }
  document.body.style.overflow = '';
  if (video) {
    video.pause();
  }
}

// Termos & Privacidade (LGPD)
function openPrivacyModal() {
  const modal = document.getElementById('privacyModal');
  const container = document.getElementById('privacyModalContainer');
  if (!modal) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  if (container) {
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
  }
  document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
  const modal = document.getElementById('privacyModal');
  const container = document.getElementById('privacyModalContainer');
  if (!modal) return;
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  if (container) {
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
  }
  document.body.style.overflow = '';
}

// Modal de Pedido / Contato
function openOrderModal() {
  const modal = document.getElementById('orderModal');
  const container = document.getElementById('orderModalContainer');
  if (!modal) return;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100', 'pointer-events-auto');
  if (container) {
    container.classList.remove('translate-y-4', 'scale-95');
    container.classList.add('translate-y-0', 'scale-100');
  }
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  const container = document.getElementById('orderModalContainer');
  if (!modal) return;
  modal.classList.remove('opacity-100', 'pointer-events-auto');
  modal.classList.add('opacity-0', 'pointer-events-none');
  if (container) {
    container.classList.remove('translate-y-0', 'scale-100');
    container.classList.add('translate-y-4', 'scale-95');
  }
  document.body.style.overflow = '';
}

window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;

// Fechar modais e drawer ao pressionar ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const vModal = document.getElementById('videoModal');
    if (vModal && !vModal.classList.contains('pointer-events-none')) {
      closeVideoModal();
    }
    const pModal = document.getElementById('privacyModal');
    if (pModal && !pModal.classList.contains('pointer-events-none')) {
      closePrivacyModal();
    }
    const oModal = document.getElementById('orderModal');
    if (oModal && !oModal.classList.contains('pointer-events-none')) {
      closeOrderModal();
    }
    const menu = document.getElementById('mobileMenu');
    if (menu && menu.classList.contains('is-open')) {
      toggleMobileMenu();
    }
  }
});

/* ----------------------------------------------------------------------------
   9. CARROSSEL DE DEPOIMENTOS INFINITO (SEM VÃO, LOOP SUAVE E TEXTO SINCRONIZADO)
   ---------------------------------------------------------------------------- */
(function initDepoimentosSlider() {
  const testimonials = [
    {
      stars: 5,
      quote: "Fizemos a comemoração de aniversário de 5 anos no Villa Plaza Park e foi sensacional! Monitores atenciosos, brinquedos limpinhos e seguros. As crianças não queriam ir embora!",
      author: "Camila Ferreira",
      role: "Mãe do Enzo (5 anos)",
      badge: "Festa de Aniversário",
      location: "Unidade Plaza — Belém/PA"
    },
    {
      stars: 5,
      quote: "O melhor parque infantil em Belém para deixar as crianças se divertirem com segurança enquanto fazemos compras. A tranquilidade e o cuidado dos monitores são nota 10!",
      author: "Fernanda Rocha",
      role: "Mãe da Alice (4 anos)",
      badge: "Passaporte & Compras",
      location: "Unidade Plaza — Belém/PA"
    },
    {
      stars: 5,
      quote: "O Espaço Baby é simplesmente impecável, acolchoado e super higienizado! Nosso filho de 2 anos brincou à vontade sem risco nenhum. Pais super tranquilos.",
      author: "Juliana & Marcos",
      role: "Pais do Benício (2 anos)",
      badge: "Espaço Baby",
      location: "Unidade Plaza — Belém/PA"
    },
    {
      stars: 5,
      quote: "Ambiente climatizado, estrutura de padrão internacional e passaporte com ótimo custo-benefício. O circuito de trampolins e o tobogã espiral são os preferidos da minha filha!",
      author: "Lucas Menezes",
      role: "Pai da Sofia (6 anos)",
      badge: "Diversão em Família",
      location: "Unidade Plaza — Belém/PA"
    }
  ];

  let track = null;
  let allCards = [];
  let numOriginals = 4;
  let currentPos = 4; // Começa no primeiro item original (offset de 1 conjunto de clones)
  let isTransitioning = false;
  let safetyTimer = null;

  function getCardStep() {
    if (!track || !allCards.length) return 0;
    const first = allCards[0];
    const width = first.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 16;
    return width + gap;
  }

  function setTrackPosition(pos, animate) {
    if (!track) return;
    const step = getCardStep();
    const shift = pos * step;
    if (animate) {
      track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translateX(-${shift}px)`;
    if (!animate) {
      void track.offsetWidth; // Força reflow síncrono para o navegador registrar a nova posição sem animação
    }
  }

  function updateActiveCardAndText() {
    if (!allCards.length) return;
    const realIdx = ((currentPos % numOriginals) + numOriginals) % numOriginals;

    allCards.forEach((card, idx) => {
      if (idx === currentPos) {
        card.classList.add('is-active');
        card.style.opacity = '1';
        card.style.transform = 'translateY(-4px)';
      } else {
        card.classList.remove('is-active');
        card.style.opacity = '0.78';
        card.style.transform = 'translateY(0)';
      }
    });

    const textBox = document.getElementById('depoimentosTextBox');
    if (textBox && testimonials[realIdx]) {
      const data = testimonials[realIdx];
      textBox.style.opacity = '0';
      textBox.style.transform = 'translateY(6px)';

      setTimeout(() => {
        let starsHtml = '';
        for (let s = 0; s < data.stars; s++) {
          starsHtml += '<i class="fa-solid fa-star text-[#F59E0B] text-sm sm:text-base mr-1"></i>';
        }

        textBox.innerHTML = `
          <div class="flex items-center gap-1 mb-3">
            ${starsHtml}
          </div>
          <blockquote class="text-sm sm:text-base lg:text-[16px] text-[#4A4D59] font-medium leading-relaxed italic mb-4">
            "${data.quote}"
          </blockquote>
          <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <span class="font-extrabold text-[#005D3E]">${data.author}</span>
            <span class="hidden sm:inline text-slate-300">•</span>
            <span class="text-[#757885]">${data.role}</span>
          </div>
          <div class="text-[11px] text-[#9EA2B0] mt-1 font-semibold">
            ${data.location}
          </div>
        `;
        textBox.style.opacity = '1';
        textBox.style.transform = 'translateY(0)';
      }, 160);
    }
  }

  function checkLoopBounds() {
    clearTimeout(safetyTimer);
    isTransitioning = false;

    // Se avançou além do conjunto original (pos >= 2 * N)
    if (currentPos >= 2 * numOriginals) {
      currentPos = currentPos - numOriginals;
      setTrackPosition(currentPos, false);
      updateActiveCardAndText();
    }
    // Se recuou antes do conjunto original (pos < N)
    else if (currentPos < numOriginals) {
      currentPos = currentPos + numOriginals;
      setTrackPosition(currentPos, false);
      updateActiveCardAndText();
    }
  }

  function moveTo(targetPos) {
    if (isTransitioning) return;
    isTransitioning = true;
    currentPos = targetPos;
    setTrackPosition(currentPos, true);
    updateActiveCardAndText();

    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(checkLoopBounds, 450);
  }

  window.depoimentosPrev = function() {
    if (isTransitioning) return;
    moveTo(currentPos - 1);
  };

  window.depoimentosNext = function() {
    if (isTransitioning) return;
    moveTo(currentPos + 1);
  };

  window.depoimentosGoTo = function(targetRealIdx) {
    if (isTransitioning) return;
    const currentRealIdx = ((currentPos % numOriginals) + numOriginals) % numOriginals;
    if (targetRealIdx === currentRealIdx) return;
    let diff = targetRealIdx - currentRealIdx;
    if (diff > numOriginals / 2) diff -= numOriginals;
    if (diff < -numOriginals / 2) diff += numOriginals;
    moveTo(currentPos + diff);
  };

  function setupSlider() {
    track = document.getElementById('reelsTrack');
    if (!track) return;

    const baseCards = Array.from(track.querySelectorAll('.ds-reel-card'));
    numOriginals = baseCards.length;
    if (numOriginals === 0) return;

    // Clones para carrossel 100% infinito sem vão/fresta
    const clonesBefore = baseCards.map(c => {
      const clone = c.cloneNode(true);
      clone.setAttribute('data-clone', 'before');
      return clone;
    });
    const clonesAfter = baseCards.map(c => {
      const clone = c.cloneNode(true);
      clone.setAttribute('data-clone', 'after');
      return clone;
    });

    track.innerHTML = '';
    clonesBefore.forEach(c => track.appendChild(c));
    baseCards.forEach(c => track.appendChild(c));
    clonesAfter.forEach(c => track.appendChild(c));

    allCards = Array.from(track.querySelectorAll('.ds-reel-card'));

    allCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (isTransitioning) return;
        if (idx === currentPos) return;
        moveTo(idx);
      });
    });

    currentPos = numOriginals;
    setTrackPosition(currentPos, false);
    updateActiveCardAndText();

    track.addEventListener('transitionend', (e) => {
      if (e.target !== track) return;
      checkLoopBounds();
    });

    // Touch Swipe Mobile
    let startX = 0;
    let moveDiff = 0;
    track.addEventListener('touchstart', (e) => {
      if (isTransitioning) return;
      startX = e.touches[0].clientX;
      moveDiff = 0;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      moveDiff = startX - e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (Math.abs(moveDiff) > 40) {
        if (moveDiff > 0) window.depoimentosNext();
        else window.depoimentosPrev();
      }
    }, { passive: true });

    // Redimensionamento
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setTrackPosition(currentPos, false);
      }, 80);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSlider);
  } else {
    setupSlider();
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.category-item').forEach(function(item) {
    item.addEventListener('click', function() {
      document.querySelectorAll('.category-item').forEach(function(el) {
        el.classList.remove('is-active');
      });
      this.classList.add('is-active');
    });
  });

  /* ----------------------------------------------------------------------------
     13. PARALLAX SUTIL PARA ELEMENTOS 3D (DESLOCAMENTO VERTICAL CONTROLADO)
     ---------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  if (parallaxItems.length && !prefersReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-parallax')) || 0.05;
            const parent = item.closest('section') || item.parentElement;
            const parentTop = parent ? parent.offsetTop : 0;
            const relativeScroll = scrollY - parentTop;
            const yOffset = -(relativeScroll * speed);
            item.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
});

/* ----------------------------------------------------------------------------
   14. CARROSSEL DE ATRAÇÕES (O QUE VOCÊ ENCONTRA NO VILLA PLAZA PARK)
   ---------------------------------------------------------------------------- */
(function initAtracoesSlider() {
  let currentIdx = 0;
  let autoTimer = null;
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getElements() {
    const slides = document.querySelectorAll('.atracoes-slide');
    const dots = document.querySelectorAll('.atracoes-dot');
    const cards = document.querySelectorAll('.atracoes-card');
    const track = document.getElementById('atracoesSlidesTrack');
    return { slides, dots, cards, track };
  }

  function updateAtracoes(newIdx) {
    const { slides, dots, cards } = getElements();
    if (!slides.length) return;

    currentIdx = (newIdx + slides.length) % slides.length;

    // Atualiza slides
    slides.forEach((slide, i) => {
      if (i === currentIdx) {
        slide.classList.add('active');
        slide.style.opacity = '1';
        slide.style.pointerEvents = 'auto';
        slide.style.zIndex = '2';
      } else {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.zIndex = '1';
      }
    });

    // Atualiza dots
    dots.forEach((dot, i) => {
      if (i === currentIdx) {
        dot.classList.add('active');
        dot.style.width = '24px';
        dot.style.backgroundColor = '#1C1D22';
        dot.style.opacity = '1';
      } else {
        dot.classList.remove('active');
        dot.style.width = '10px';
        dot.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
        dot.style.opacity = '0.85';
      }
    });

    // Atualiza cards inferiores
    cards.forEach((card, i) => {
      if (i === currentIdx) {
        card.classList.add('active');
        card.style.borderColor = '#0D6E2A';
        card.style.transform = 'translateY(-4px)';
        card.style.boxShadow = '0 12px 24px -6px rgba(13, 110, 42, 0.25), 0 4px 10px rgba(0, 0, 0, 0.06)';
      } else {
        card.classList.remove('active');
        card.style.borderColor = 'transparent';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
      }
    });

    // Centraliza suavemente o card ativo no container quando em rolagem horizontal (mobile)
    if (cards[currentIdx]) {
      const rail = cards[currentIdx].parentElement;
      if (rail && rail.scrollWidth > rail.clientWidth) {
        cards[currentIdx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  function nextAtracao() {
    updateAtracoes(currentIdx + 1);
  }

  function prevAtracao() {
    updateAtracoes(currentIdx - 1);
  }

  function setAtracao(idx) {
    updateAtracoes(idx);
    resetAuto();
  }

  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    if (prefersReduced) return;
    const { slides } = getElements();
    if (slides.length < 2) return;
    autoTimer = setInterval(nextAtracao, 5000);
  }

  function resetAuto() {
    if (autoTimer) clearInterval(autoTimer);
    startAuto();
  }

  // Bind global para handlers embutidos
  window.atracoesNextSlide = function() {
    nextAtracao();
    resetAuto();
  };

  window.atracoesPrevSlide = function() {
    prevAtracao();
    resetAuto();
  };

  window.atracoesSetSlide = function(idx) {
    setAtracao(idx);
  };

  // Inicialização no DOM
  document.addEventListener('DOMContentLoaded', () => {
    const { track } = getElements();
    if (!track) return;

    // Swipe em mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          nextAtracao();
        } else {
          prevAtracao();
        }
        resetAuto();
      }
    }, { passive: true });

    // Pausa no hover do slider principal
    const sliderBox = track.closest('.group\\/slider') || track.parentElement;
    if (sliderBox) {
      sliderBox.addEventListener('mouseenter', () => {
        if (autoTimer) clearInterval(autoTimer);
      });
      sliderBox.addEventListener('mouseleave', () => {
        startAuto();
      });
    }

    // Suporte a teclado acessível quando focado na seção
    const sec = document.getElementById('atracoes');
    if (sec) {
      sec.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          prevAtracao();
          resetAuto();
        } else if (e.key === 'ArrowRight') {
          nextAtracao();
          resetAuto();
        }
      });
    }

    updateAtracoes(0);
    startAuto();
  });
})();

/* ----------------------------------------------------------------------------
   11. SELETOR DE UNIDADES (TABS) - VALORES POR ESTADIA (TAPANÃ & PLAZA)
   ---------------------------------------------------------------------------- */
function switchEstadiaTab(unit) {
  const tabTapana = document.getElementById('tab-tapana');
  const tabPlaza = document.getElementById('tab-plaza');
  const panelTapana = document.getElementById('panel-tapana');
  const panelPlaza = document.getElementById('panel-plaza');

  if (unit === 'tapana') {
    if (tabTapana) {
      tabTapana.classList.add('is-active');
      tabTapana.setAttribute('aria-selected', 'true');
    }
    if (tabPlaza) {
      tabPlaza.classList.remove('is-active');
      tabPlaza.setAttribute('aria-selected', 'false');
    }
    if (panelTapana) panelTapana.classList.remove('hidden');
    if (panelPlaza) panelPlaza.classList.add('hidden');
  } else {
    if (tabPlaza) {
      tabPlaza.classList.add('is-active');
      tabPlaza.setAttribute('aria-selected', 'true');
    }
    if (tabTapana) {
      tabTapana.classList.remove('is-active');
      tabTapana.setAttribute('aria-selected', 'false');
    }
    if (panelPlaza) panelPlaza.classList.remove('hidden');
    if (panelTapana) panelTapana.classList.add('hidden');
  }
}
window.switchEstadiaTab = switchEstadiaTab;




