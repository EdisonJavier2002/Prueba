document.addEventListener("DOMContentLoaded", function() {
    // Configura Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyD73Mp6G2pi_pWS66rvaINg30d-n5ArP9c",
        authDomain: "mascotascrud.firebaseapp.com",
        projectId: "mascotascrud",
        storageBucket: "mascotascrud.appspot.com",
        messagingSenderId: "1060241153",
        appId: "1:1060241153:web:84ecde2965957fa39ee500",
        measurementId: "G-T0EXQLHXFH"
    };

    // Inicializa Firebase
    firebase.initializeApp(firebaseConfig);

    // Función para manejar los errores
    function handleAuthError(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
            case 'auth/user-not-found':
                alert('El usuario no existe. Por favor, regístrese primero.');
                break;
            case 'auth/wrong-password':
                alert('Contraseña incorrecta. Inténtelo de nuevo.');
                break;
            case 'auth/email-already-in-use':
                alert('Este correo electrónico ya está en uso. Por favor, utilice otro.');
                break;
            default:
                alert(errorMessage);
                break;
        }
    }

    // Función para iniciar sesión
    async function signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            window.location.href = 'mascotas.html'; // Redirige a la página de mascotas después de iniciar sesión
        } catch (error) {
            console.error(error);
            handleAuthError(error); // Maneja los errores de inicio de sesión
        }
    }

    // Función para registrar un nuevo usuario
    async function signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            window.location.href = 'mascotas.html'; // Redirige a la página de mascotas después del registro
        } catch (error) {
            console.error(error);
            handleAuthError(error); // Maneja los errores de registro
        }
    }

    // Función para iniciar sesión con Google
    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            await firebase.auth().signInWithPopup(provider);
            window.location.href = 'mascotas.html'; // Redirige a la página de mascotas después de iniciar sesión con Google
        } catch (error) {
            console.error(error);
            handleAuthError(error); // Maneja los errores de inicio de sesión con Google
        }
    }

    // Asigna las funciones a los botones
    document.getElementById('signInButton').addEventListener('click', signIn);
    document.getElementById('signUpButton').addEventListener('click', signUp);
    document.getElementById('googleSignInButton').addEventListener('click', signInWithGoogle);
});
