/**
 * WiSec.be - JavaScript Corrigé
 * Expert IT & Téléphonie Professionnelle en Belgique
 * Version 2.0 - Tous les bugs corrigés
 */

// =======================
// CONFIGURATION
// =======================
const CONFIG = {
  headerOffset: 80, // Hauteur du header fixe
  animationDuration: 300
};

// =======================
// MENU MOBILE
// =======================
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileMenuToggle && mobileMenu) {
    // Toggle du menu mobile
    mobileMenuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.toggle('active');
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
      
      // Empêcher le scroll du body quand le menu est ouvert
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Fermer le menu mobile lors du clic sur un lien
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu mobile lors du clic en dehors
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  }

  // =======================
  // SMOOTH SCROLL - CORRIGÉ
  // =======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Ignorer les liens "#" vides
      if (href === '#' || href.length <= 1) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - CONFIG.headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Fermer le menu mobile si ouvert
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // =======================
  // LIGHTBOX - CORRIGÉ ET FONCTIONNEL
  // =======================
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentProject = null;
  let currentImageIndex = 0;

  // Données des projets avec toutes les images
  const projects = [
    {
      title: "Câblage Rack Informatique & Patch Panel",
      location: "Bruxelles",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles1.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles2.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles3.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles4.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles5.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles6.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles7.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cablage+rack-informatique-patch_pannel-Bruxelles8.jpg"
      ]
    },
    {
      title: "Cleaning Armoire & Cloudkey",
      location: "Uccle",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cleaning+armoire+cloudkey-Uccle1.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cleaning+armoire+cloudkey-Uccle2.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cleaning+armoire+cloudkey-Uccle3.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Cleaning+armoire+cloudkey-Uccle4.jpg"
      ]
    },
    {
      title: "Cleaning Infrastructure Informatique",
      location: "Sivry",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/1cleanig-infra-avant-sivry.png",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/2cleaning-infra-apres-sivry.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/3cleaning-infra-apres-sivry.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/4cleaning-infra-apres-sivry.jpg"
      ]
    },
    {
      title: "Déplacement Armoire & Câblage",
      location: "Bruxelles",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles1.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles2.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles3.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles4.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles5.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles6.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/D%C3%A9placement-armoire%2Bcablage-Bruxelles7.jpg"
      ]
    },
    {
      title: "Contrôle d'accès",
      location: "Belgique",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/1Controle-d-acces.jpg",
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/2Controle-d-acces.jpg"
      ]
    },
    {
      title: "Installation Armoire & Serveur",
      location: "Charleroi",
      images: [
        "https://raw.githubusercontent.com/YassSek/test-w/main/images/Installe%20armire%2Bserveur-Charleori.JPG"
      ]
    }
  ];

  // Fonction pour ouvrir le lightbox (exposée globalement)
  window.openLightbox = function(projectIndex, imageIndex) {
    currentProject = projectIndex;
    currentImageIndex = imageIndex;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Fonction pour fermer le lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Fonction pour naviguer dans le lightbox
  function navigateLightbox(direction) {
    const project = projects[currentProject];
    if (!project) return;
    
    if (direction === 'next') {
      currentImageIndex = (currentImageIndex + 1) % project.images.length;
    } else {
      currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    }
    updateLightbox();
  }

  // Fonction pour mettre à jour l'image et la légende du lightbox
  function updateLightbox() {
    const project = projects[currentProject];
    if (!project) return;

    lightboxImage.src = project.images[currentImageIndex];
    lightboxImage.alt = `${project.title} - Photo ${currentImageIndex + 1}`;
    
    if (lightboxCaption) {
      lightboxCaption.textContent = `${project.title} — ${currentImageIndex + 1} / ${project.images.length}`;
    }

    // Afficher/masquer les boutons de navigation
    if (project.images.length > 1) {
      if (lightboxPrev) lightboxPrev.style.display = 'flex';
      if (lightboxNext) lightboxNext.style.display = 'flex';
    } else {
      if (lightboxPrev) lightboxPrev.style.display = 'none';
      if (lightboxNext) lightboxNext.style.display = 'none';
    }
  }

  // Event listeners pour le lightbox
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox('prev');
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox('next');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Navigation clavier pour le lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    }
  });

  // =======================
  // LAZY LOADING IMAGES
  // =======================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img.lazy, img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // =======================
  // ANIMATIONS AU SCROLL
  // =======================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les cartes et sections
  document.querySelectorAll('.service-card, .card, .zone-card, .feature-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
  });

  // =======================
  // HEADER SCROLL EFFECT
  // =======================
  let lastScroll = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
    }
    
    lastScroll = currentScroll;
  }, { passive: true });

  
 console.log('Bienvenu');

  // =======================
  // DÉTECTION MOBILE
  // =======================
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    document.body.classList.add('is-mobile');
  } else {
    document.body.classList.add('is-desktop');
  }

  // =======================
  // PERFORMANCE MONITORING
  // =======================
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.loadTime > 3000) {
            console.warn('Slow resource loaded:', entry.name, entry.loadTime + 'ms');
          }
        }
      });
      perfObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // PerformanceObserver not supported
    }
  }
});

// =======================
// UTILITAIRES
// =======================

// Fonction de debounce pour optimiser les événements
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Fonction pour détecter si un élément est visible
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Exporter les fonctions utiles
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    debounce,
    isElementInViewport
  };
}
