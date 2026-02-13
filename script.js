// ========================================
// WISEC.BE - SCRIPT.JS AMÉLIORÉ
// Version 2.0 - JavaScript Moderne
// ========================================

// ===== MENU MOBILE =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Hauteur du header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajouter une ombre plus prononcée au scroll
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER - ANIMATIONS AU SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Délai progressif pour chaque carte
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            
            // Arrêter d'observer une fois visible
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer toutes les cartes de service
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Observer les autres sections si nécessaire
document.querySelectorAll('.about-text, .about-image').forEach(el => {
    observer.observe(el);
});

// ===== FORM SUBMISSION (si formulaire présent) =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation basique
        const inputs = this.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            alert('Merci pour votre demande ! Nous vous contacterons rapidement.');
            this.reset();
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observer toutes les images avec data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE: DEBOUNCE SCROLL =====
function debounce(func, wait = 10) {
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

// Optimiser les événements de scroll
const optimizedScroll = debounce(() => {
    // Mettre ici du code qui doit s'exécuter au scroll
    // (déjà géré ci-dessus avec l'effet header)
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===== ACCESSIBILITÉ: FOCUS VISIBLE =====
// Améliorer la navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===== CONSOLE INFO =====
console.log('%c🔒 WiSec.be - Site sécurisé', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cVersion 2.0 - Développé avec ❤️', 'color: #666; font-size: 12px;');

// ===== DÉTECTION DU NAVIGATEUR (pour debug) =====
const userAgent = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

if (isMobile) {
    document.body.classList.add('is-mobile');
} else {
    document.body.classList.add('is-desktop');
}

// ===== EASTER EGG (optionnel - à retirer en production) =====
let clickCount = 0;
const logo = document.querySelector('.logo');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            console.log('🎉 Vous avez trouvé l\'easter egg ! Bravo !');
            clickCount = 0;
        }
    });
}

// ===== EXPORT POUR MODULES (si nécessaire) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        // Ajouter d'autres fonctions à exporter
    };
}
