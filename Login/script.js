/* ============================================================
   AulaConecta - script.js
   ------------------------------------------------------------
   Este archivo ya esta conectado al index.html.

     form                  -> formulario de login
     #correo               -> input de correo institucional
     #password              -> input de contraseña
     #mostrarPassword        -> botón mostrar/ocultar contraseña
     .btn-login                -> botón de envío
     .btn-google                 -> botón de acceso con correo SoySENA
     .login-links a                -> enlaces "olvidé contraseña" / "contactar instructor"

   
   el script agrega/quita las siguientes clases
     .error          -> se agrega a .form-group cuando el campo es inválido
     .error-message   -> <span> que este script inserta con el texto del error
     .shake            -> se agrega brevemente al form si el envío falla
     .is-loading        -> se agrega a .btn-login mientras "inicia sesión"
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Referencias a elementos ----------
  const form = document.querySelector('form');
  const inputCorreo = document.getElementById('correo');
  const inputPassword = document.getElementById('password');
  const btnMostrarPassword = document.getElementById('mostrarPassword');
  const btnLogin = document.querySelector('.btn-login');
  const btnGoogle = document.querySelector('.btn-google');
  const loginLinks = document.querySelectorAll('.login-links a');

  // ---------- 1. Mostrar / ocultar contraseña ----------
  const togglePassword = () => {
    if (!inputPassword || !btnMostrarPassword) return;

    const esPassword = inputPassword.type === 'password';
    inputPassword.type = esPassword ? 'text' : 'password';
    btnMostrarPassword.textContent = esPassword ? 'Ocultar' : 'Mostrar';
  };

  btnMostrarPassword?.addEventListener('click', togglePassword);

  // ---------- 2. Validaciones ----------
  const mostrarError = (input, mensaje) => {
    const grupo = input.closest('.form-group');
    if (!grupo) return;

    grupo.classList.add('error');

    let error = grupo.querySelector('.error-message');
    if (!error) {
      error = document.createElement('span');
      error.classList.add('error-message');
      grupo.appendChild(error);
    }
    error.textContent = mensaje;
  };

  const limpiarError = (input) => {
    const grupo = input.closest('.form-group');
    if (!grupo) return;

    grupo.classList.remove('error');
    grupo.querySelector('.error-message')?.remove();
  };

  const validarCorreo = () => {
    const valor = inputCorreo.value.trim();
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === '') {
      mostrarError(inputCorreo, 'El correo es obligatorio.');
      return false;
    }
    if (!regexCorreo.test(valor)) {
      mostrarError(inputCorreo, 'Ingresa un correo válido.');
      return false;
    }
    limpiarError(inputCorreo);
    return true;
  };

  const validarPassword = () => {
    const valor = inputPassword.value;

    if (valor === '') {
      mostrarError(inputPassword, 'La contraseña es obligatoria.');
      return false;
    }
    if (valor.length < 6) {
      mostrarError(inputPassword, 'Debe tener al menos 6 caracteres.');
      return false;
    }
    limpiarError(inputPassword);
    return true;
  };

  // Validar cuando el usuario sale del campo (blur)
  inputCorreo?.addEventListener('blur', validarCorreo);
  inputPassword?.addEventListener('blur', validarPassword);

  // ---------- 3. Envío del formulario ----------
  form?.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const correoValido = validarCorreo();
    const passwordValido = validarPassword();

    if (!correoValido || !passwordValido) {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 400);
      return;
    }

    // Simulación de inicio de sesión (aquí se conectará el backend real)
    const textoOriginal = btnLogin.textContent;
    btnLogin.disabled = true;
    btnLogin.classList.add('is-loading');
    btnLogin.textContent = 'Iniciando sesión...';

    setTimeout(() => {
      btnLogin.disabled = false;
      btnLogin.classList.remove('is-loading');
      btnLogin.textContent = textoOriginal;
      alert(`Bienvenido/a, ${inputCorreo.value}. (Simulación: aquí iría la redirección real)`);
      // Cuando exista backend o una página siguiente:
      window.location.href = 'dashboard.html';
    }, 1200);
  });

  // ---------- 4. Botón "Inicio rápido correo SoySENA" ----------
  btnGoogle?.addEventListener('click', () => {
    const textoOriginal = btnGoogle.textContent;
    btnGoogle.disabled = true;
    btnGoogle.textContent = 'Conectando...';

    setTimeout(() => {
      btnGoogle.disabled = false;
      btnGoogle.textContent = textoOriginal;
      alert('Funcionalidad pendiente de integración con el correo institucional SoySENA.');
    }, 1000);
  });

  // ---------- 5. Enlaces "¿Olvidaste tu contraseña?" / "Contacta a tu instructor" ----------
  loginLinks.forEach((enlace) => {
    enlace.addEventListener('click', (evento) => {
      // Solo interceptamos si el href sigue siendo "#" (placeholder)
      if (enlace.getAttribute('href') === '#') {
        evento.preventDefault();
        alert(`Próximamente: "${enlace.textContent.trim()}"`);
      }
    });
  });

});