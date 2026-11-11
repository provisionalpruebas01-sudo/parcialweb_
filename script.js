document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------
    // 1. MANEJO DEL BOTÓN INTERACTIVO (SECCIÓN HERO)
    // Requerimientos: Eventos, Funciones y Manipulación del DOM
    // ----------------------------------------------------
    const btnInteractivo = document.getElementById('btn-interactivo');
    const textoDinamico = document.getElementById('texto-dinamico');

    // Banco de datos técnicos sobre Inteligencia Artificial
    const datosCuriososIA = [
        "Dato Clave: El término 'Inteligencia Artificial' fue acuñado en 1956 durante la histórica Conferencia de Dartmouth.",
        "Dato Clave: Las Redes Neuronales Convolucionales (CNN) imitan la corteza visual humana para procesar imágenes.",
        "Dato Clave: Los modelos de lenguaje actuales (LLMs) procesan cientos de miles de millones de parámetros para inferir contexto.",
        "Dato Clave: La prueba de Turing, propuesta en 1950, evalúa si una máquina puede exhibir un comportamiento inteligente indistinguible de un humano.",
        "Dato Clave: El aprendizaje por refuerzo utiliza recompensas y castigos para entrenar agentes en entornos dinámicos complejos."
    ];

    /**
     * Selecciona e inserta un dato aleatorio en el DOM
     */
    function mostrarDatoAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * datosCuriososIA.length);
        textoDinamico.textContent = datosCuriososIA[indiceAleatorio];
        
        // Transición ligera de opacidad manipulando el estilo directo
        textoDinamico.style.opacity = '0';
        setTimeout(() => {
            textoDinamico.style.opacity = '1';
            textoDinamico.style.transition = 'opacity 0.4s ease-in-out';
        }, 50);
    }

    // Asignación de evento de clic al botón principal
    if (btnInteractivo) {
        btnInteractivo.addEventListener('click', mostrarDatoAleatorio);
    }

    // ----------------------------------------------------
    // 2. VALIDACIÓN DE FORMULARIO Y CONTROL DE RESPUESTAS
    // Requerimientos: Validación de datos y mensajes de respuesta
    // ----------------------------------------------------
    const formulario = document.getElementById('formulario-registro');
    const mensajeRespuesta = document.getElementById('mensaje-respuesta');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            // Detiene la recarga del navegador predeterminada
            evento.preventDefault();

            // Captura y limpieza de valores de los inputs
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const area = document.getElementById('area').value;

            // Validación 1: Campos vacíos
            if (nombre === "" || correo === "" || area === "") {
                mostrarMensajeEstado("Por favor, completa todos los campos del formulario antes de enviar.", "error");
                return;
            }

            // Validación 2: Formato de correo electrónico
            if (!validarFormatoCorreo(correo)) {
                mostrarMensajeEstado("Ingresa una dirección de correo electrónico válida (ejemplo@dominio.com).", "error");
                return;
            }

            // Validación exitosa: Procesamiento y retroalimentación al usuario
            mostrarMensajeEstado(`¡Registro completado con éxito, ${nombre}! Te hemos suscrito al área seleccionada.`, "exito");
            
            // Reinicia los campos del formulario
            formulario.reset();
        });
    }

    /**
     * Valida la estructura básica de un correo mediante expresión regular
     * @param {string} email 
     * @returns {boolean}
     */
    function validarFormatoCorreo(email) {
        const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return patronCorreo.test(email);
    }

    /**
     * Muestra mensajes dinámicos de éxito o error en el DOM
     * @param {string} mensaje 
     * @param {string} tipoExitoError ('exito' | 'error')
     */
    function mostrarMensajeEstado(mensaje, tipoExitoError) {
        mensajeRespuesta.textContent = mensaje;
        mensajeRespuesta.className = `alerta-oculta ${tipoExitoError}`;

        // Limpia el mensaje de forma automática tras 6 segundos
        setTimeout(() => {
            mensajeRespuesta.textContent = "";
            mensajeRespuesta.className = "alerta-oculta";
        }, 6000);
    }

    // ----------------------------------------------------
    // 3. DESPLAZAMIENTO SUAVE ENTRE SECCIONES (MENÚ)
    // ----------------------------------------------------
    const enlacesNavegacion = document.querySelectorAll('.menu-navegacion a');

    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            const destinoId = enlace.getAttribute('href');
            if (destinoId.startsWith('#')) {
                const elementoDestino = document.querySelector(destinoId);
                if (elementoDestino) {
                    e.preventDefault();
                    elementoDestino.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});