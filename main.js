/**
 * WiSec.be - JavaScript
 * Expert IT & Téléphonie Professionnelle en Belgique
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const isOpen = mobileMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 64; // Height of fixed header
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentProject = null;
  let currentImageIndex = 0;

  const projects = [
    {
      title: "Cablage Rack Informatique & Patch Panel",
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
      title: "Deplacement Armoire & Cablage",
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
      title: "Controle d'acces",
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

  // Open lightbox
  window.openLightbox = function(projectIndex, imageIndex) {
    currentProject = projectIndex;
    currentImageIndex = imageIndex;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Navigate lightbox
  function navigateLightbox(direction) {
    const project = projects[currentProject];
    if (direction === 'next') {
      currentImageIndex = (currentImageIndex + 1) % project.images.length;
    } else {
      currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    }
    updateLightbox();
  }

  // Update lightbox image and caption
  function updateLightbox() {
    const project = projects[currentProject];
    lightboxImage.src = project.images[currentImageIndex];
    lightboxImage.alt = `${project.title} - Photo ${currentImageIndex + 1}`;
    lightboxCaption.textContent = `${project.title} — ${currentImageIndex + 1} / ${project.images.length}`;

    // Show/hide navigation buttons
    if (project.images.length > 1) {
      lightboxPrev.style.display = 'block';
      lightboxNext.style.display = 'block';
    } else {
      lightboxPrev.style.display = 'none';
      lightboxNext.style.display = 'none';
    }
  }

  // Event listeners for lightbox
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

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    }
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
