// auth.js - Version mise à jour
document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:5000/api';

    // Formulaire d'inscription
    const inscriptionForm = document.getElementById('inscription-form');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
             
            const pseudo = document.getElementById('pseudo').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas.');
                return;
            }

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pseudo, email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Inscription réussie !');
                    window.location.href = 'connexion.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Erreur lors de l\'inscription');
            }
        });
    }

    // Formulaire de connexion
    const connexionForm = document.getElementById('connexion-form');
    if (connexionForm) {
        connexionForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    if (rememberMe) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                    } else {
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                    }
                    window.location.href = 'profile.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Erreur lors de la connexion');
            }
        });
    }
});