// assets/js/script.js

// Configuration
const CONFIG = {
    smoothScroll: true,
    animations: true,
    theme: 'auto'
};

// Initialisation quand la page est chargée
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation du portfolio...');
    initPortfolio();
});

function initPortfolio() {
    // Initialiser le défilement fluide
    if (CONFIG.smoothScroll) {
        initSmoothScroll();
    }

    // Initialiser les animations
    if (CONFIG.animations) {
        initAnimations();
    }

    // Initialiser la gestion des thèmes
    initTheme();

    // Initialiser la navigation des projets
    initProjectNavigation();

    // Initialiser les interactions
    initInteractions();

    // Initialiser le formulaire de contact
    initContactForm();

    console.log('✅ Portfolio initialisé avec succès !');
}

// Défilement fluide pour les ancres
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Vérifier si c'est une ancre (commence par #)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    console.log(`🔍 Défilement vers: ${href}`);
                }
            }
        });
    });
}

// Animations au scroll
function initAnimations() {
    // Vérifier si l'API IntersectionObserver est supportée
    if (!('IntersectionObserver' in window)) {
        console.log('⚠️ IntersectionObserver non supporté - animations désactivées');
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Arrêter d'observer après l'animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.project-card, .section, .feature, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    console.log(`🎬 ${elementsToAnimate.length} éléments observés pour animation`);
}

// Gestion des thèmes (clair/sombre)
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme');

    // Appliquer le thème sauvegardé ou auto-détection
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }

    // Écouter les changements de préférence système
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!localStorage.getItem('portfolio-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Gérer le bouton de changement de thème s'il existe
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        console.log('🎨 Bouton de thème initialisé');
    }
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    console.log(`🎨 Thème appliqué: ${theme}`);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    applyTheme(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);

    // Animation de transition
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    // Afficher une notification
    showNotification(`Thème ${newTheme === 'dark' ? 'sombre' : 'clair'} activé`, 'info');
}

// Navigation entre les sections de projet
function initProjectNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const projectSections = document.querySelectorAll('.project-section');

    if (navButtons.length === 0) return;

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Mettre à jour les boutons actifs
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Faire défiler vers la section cible
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                console.log(`📍 Navigation vers: ${targetSection}`);
            }
        });
    });

    // Observer les sections pour mettre à jour la navigation active
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeSection = entry.target.id;
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-section') === activeSection) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    projectSections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Interactions utilisateur améliorées
function initInteractions() {
    // Effet de survol sur les cartes de projet
    const projectCards = document.querySelectorAll('.project-card, .feature-card, .demo-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Animation des badges de technologie
    const techTags = document.querySelectorAll('.tech-tag, .badge, .tech-item');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Gestion des images de galerie
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // Fallback si l'image est déjà chargée
        if (img.complete) {
            img.style.opacity = '1';
        }
    });

    // Gestion des clics sur les liens externes
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Laisser le lien s'ouvrir normalement
            console.log(`🔗 Lien externe ouvert: ${this.href}`);
            trackExternalLink(this.href);
        });
    });

    console.log('🎮 Interactions utilisateur initialisées');
}

// Fonction pour tracker les clics (pour analytics futur)
function trackExternalLink(url) {
    // Vous pouvez intégrer Google Analytics ici plus tard
    if (typeof gtag !== 'undefined') {
        gtag('event', 'external_link_click', {
            'event_category': 'Outbound',
            'event_label': url
        });
    }

    // Tracking basique dans la console
    const linkData = {
        url: url,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    };

    console.log('📊 Lien externe tracké:', linkData);
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validation basique
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            return;
        }

        // Simulation d'envoi
        console.log('📧 Formulaire soumis:', data);
        showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');

        // Réinitialiser le formulaire
        this.reset();

        // Animation de confirmation
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✅ Envoyé !';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });

    console.log('📝 Formulaire de contact initialisé');
}

// Validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;

    // Icônes selon le type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    notification.innerHTML = `
        <span class="notification-icon">${icons[type] || icons.info}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    // Styles pour la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease'
    });

    // Styles pour les éléments internes
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;

    document.body.appendChild(notification);

    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    console.log(`💬 Notification: ${message}`);
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
    console.error('Fichier:', e.filename);
    console.error('Ligne:', e.lineno);
});

// Gestion des promesses non catchées
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesse rejetée non gérée:', e.reason);
});

// Performance - Chargement progressif des images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les navigateurs sans IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

// API pour récupérer les stats GitHub (optionnel)
async function fetchGitHubStats(username) {
    if (!username) return null;

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Erreur API GitHub');

        const data = await response.json();
        console.log('📊 Stats GitHub:', data);

        // Vous pouvez utiliser ces données pour afficher des stats
        updateGitHubStats(data);

        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des stats GitHub:', error);
        return null;
    }
}

function updateGitHubStats(data) {
    // Exemple: Mettre à jour un élément avec les followers
    const followersElement = document.getElementById('github-followers');
    if (followersElement && data.followers !== undefined) {
        followersElement.textContent = data.followers;
    }
}

// Mode développement - fonctions utiles
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Mode développement activé');

    // Exposer certaines fonctions globalement pour le débogage
    window.portfolioDebug = {
        refreshAnimations: () => {
            document.querySelectorAll('.fade-up').forEach(el => {
                el.classList.remove('animate-in');
            });
            setTimeout(initAnimations, 100);
        },
        toggleTheme: toggleTheme,
        showNotification: showNotification,
        testError: () => { throw new Error('Test error'); }
    };
}

// Service Worker pour le cache (optionnel pour PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Vous pouvez ajouter un service worker plus tard
        console.log('ℹ️ Service Worker peut être ajouté pour le cache');
    });
}

// Export pour les modules (si besoin)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initPortfolio,
        showNotification,
        toggleTheme
    };
}