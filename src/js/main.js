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
  const item = button.closest('.faq-item');
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
   5. CARROSSEL DE BANNERS (S3 BANNERZINHOS)
   ---------------------------------------------------------------------------- */
function updateBannerDots() {
  const track = document.getElementById('bannersTrack');
  const bannerDots = document.querySelectorAll('.banner-dot');
  if (!track || !bannerDots.length) return;
  const cards = track.querySelectorAll('[data-banner-card]');
  if (!cards.length) return;
  const firstCard = cards[0];
  const cardWidth = firstCard.offsetWidth;
  const computedGap = parseFloat(window.getComputedStyle(track).gap) || 24;
  const step = cardWidth + computedGap;
  const maxIndex = bannerDots.length - 1;
  const currentIndex = Math.min(Math.max(0, Math.round(track.scrollLeft / step)), maxIndex);

  bannerDots.forEach((dot, idx) => {
    if (idx === currentIndex) {
      dot.className = 'banner-dot w-6 sm:w-8 h-2 sm:h-2.5 rounded-full bg-brand-red transition-all duration-300 flex-shrink-0 focus:outline-none';
    } else {
      dot.className = 'banner-dot w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-bf-ink/20 hover:bg-bf-ink/40 transition-all duration-300 flex-shrink-0 focus:outline-none';
    }
  });
}

function scrollBanners(direction) {
  const track = document.getElementById('bannersTrack');
  if (!track) return;
  const firstCard = track.querySelector('[data-banner-card]');
  const computedGap = parseFloat(window.getComputedStyle(track).gap) || 24;
  const cardWidth = firstCard ? firstCard.offsetWidth + computedGap : 360;
  const maxScroll = track.scrollWidth - track.clientWidth;

  if (direction === 'left') {
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  } else {
    if (track.scrollLeft >= maxScroll - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  }
  setTimeout(updateBannerDots, 350);
}

function scrollToBanner(index) {
  const track = document.getElementById('bannersTrack');
  if (!track) return;
  const cards = track.querySelectorAll('[data-banner-card]');
  if (cards[index]) {
    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setTimeout(updateBannerDots, 350);
  }
}

window.scrollBanners = scrollBanners;
window.scrollToBanner = scrollToBanner;

// Suporte a Touch Swipe & Drag com Mouse em Bannerzinhos
const bannersTrack = document.getElementById('bannersTrack');
if (bannersTrack) {
  let isDragging = false;
  let hasMoved = false;
  let startX = 0;
  let scrollLeftPos = 0;
  let scrollDebounce = null;

  bannersTrack.addEventListener('scroll', () => {
    if (scrollDebounce) clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(updateBannerDots, 80);
  }, { passive: true });

  bannersTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    hasMoved = false;
    bannersTrack.classList.add('cursor-grabbing');
    bannersTrack.classList.remove('cursor-grab', 'scroll-smooth');
    startX = e.pageX - bannersTrack.offsetLeft;
    scrollLeftPos = bannersTrack.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      bannersTrack.classList.remove('cursor-grabbing');
      bannersTrack.classList.add('cursor-grab', 'scroll-smooth');
      updateBannerDots();
    }
  });

  bannersTrack.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - bannersTrack.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMoved = true;
      e.preventDefault();
    }
    bannersTrack.scrollLeft = scrollLeftPos - walk;
  });

  bannersTrack.addEventListener('click', (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
    }
  }, true);
}

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
   9. DEPOIMENTOS & CATEGORIAS
   ---------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const testimonialSection = document.getElementById('depoimentos');
  if (testimonialSection) {
    const testimonialTracks = testimonialSection.querySelectorAll('.animate-marquee-left, .animate-marquee-right');
    testimonialSection.addEventListener('touchstart', () => {
      testimonialTracks.forEach(track => track.style.animationPlayState = 'paused');
    }, { passive: true });
    testimonialSection.addEventListener('touchend', () => {
      setTimeout(() => testimonialTracks.forEach(track => track.style.animationPlayState = 'running'), 2200);
    }, { passive: true });
  }

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
   14. CARROSSEL DE ATRAÇÕES (O QUE VOCÊ ENCONTRA NO VILA PARK)
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



