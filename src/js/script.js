document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signUpButton = document.getElementById('sign-up');
    const togglePasswordButton = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Mostrar/Ocultar contraseña
    togglePasswordButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    });

    // Registro de usuarios
    signUpButton.addEventListener('click', () => {
        const username = prompt('usuario:');
        const password = prompt('contraseña:');
        if (username && password) {
            localStorage.setItem(username, password);
            alert('Usuario creado exitosamente!');
        } else {
            alert('El nombre y el usuario no pueden estar vacios.');
        }
    });

    // Inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (localStorage.getItem(username) === password) {
            alert('Inicio de sesion exitosamente!');
            // Redirige al usuario a otra ventana
            window.location.href = 'dashboard.html'; // Cambia 'dashboard.html' por el archivo de destino
        } else {
            alert('Usuario o contraseña invalido.');
        }
    });
});
