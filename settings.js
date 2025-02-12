// settings.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const languageToggle = document.getElementById('change-language');

    // Fonction pour le mode sombre
    function initDarkMode() {
        // Vérifier si le mode sombre était activé
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        
        // Appliquer le mode sombre si nécessaire
        if (isDarkMode) {
            applyDarkMode();
        }

        // Gestionnaire d'événement pour le toggle du mode sombre
        darkModeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-mode');
            if (isDark) {
                removeDarkMode();
            } else {
                applyDarkMode();
            }
        });
    }

    // Appliquer le mode sombre
    function applyDarkMode() {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('bg-gray-50');
        document.body.classList.add('bg-gray-900');
        
        // Modifier les éléments spécifiques
        document.querySelectorAll('.bg-white').forEach(el => {
            el.classList.remove('bg-white');
            el.classList.add('bg-gray-800');
        });
        
        document.querySelectorAll('.text-gray-700, .text-gray-600').forEach(el => {
            el.classList.add('text-gray-300');
        });
        
        localStorage.setItem('darkMode', 'true');
    }

    // Retirer le mode sombre
    function removeDarkMode() {
        document.body.classList.remove('dark-mode');
        document.body.classList.remove('bg-gray-900');
        document.body.classList.add('bg-gray-50');
        
        // Restaurer les éléments spécifiques
        document.querySelectorAll('.bg-gray-800').forEach(el => {
            el.classList.remove('bg-gray-800');
            el.classList.add('bg-white');
        });
        
        document.querySelectorAll('.text-gray-300').forEach(el => {
            el.classList.remove('text-gray-300');
            if (el.classList.contains('text-gray-700')) {
                el.classList.add('text-gray-700');
            } else {
                el.classList.add('text-gray-600');
            }
        });
        
        localStorage.setItem('darkMode', 'false');
    }

    // Gestion du changement de langue
    let currentLang = localStorage.getItem('language') || 'fr';
    
    const translations = {
        fr: {
            home: 'Accueil',
            portfolio: 'Portfolio',
            projects: 'Nos Projets',
            contact: 'Contact',
            store: 'Magasin',
            darkMode: 'Mode Sombre',
            changeLanguage: 'Changer la Langue'
        },
        en: {
            home: 'Home',
            portfolio: 'Portfolio',
            projects: 'Our Projects',
            contact: 'Contact',
            store: 'Store',
            darkMode: 'Dark Mode',
            changeLanguage: 'Change Language'
        }
    };

    languageToggle.addEventListener('click', function() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', currentLang);
        updateLanguage();
    });

    function updateLanguage() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
    }

    // Initialisation
    initDarkMode();
    updateLanguage();
});