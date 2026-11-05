document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Resaltar la pestaña activa en el Menú
    // ==========================================
    const navLinks = document.querySelectorAll('nav a');
    const rutaActual = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const hrefLink = link.getAttribute('href');
        if (hrefLink === rutaActual) {
            link.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            link.style.fontWeight = 'bold';
            link.style.color = '#ffffff';
        }
    });

    // ==========================================
    // 2. Validación interactiva del Formulario
    // ==========================================
    const formulario = document.querySelector('form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el recargo de página para la demo
            
            const inputs = formulario.querySelectorAll('input, textarea');
            let valido = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valido = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = 'var(--gris-borde)';
                }
            });

            // Crear o reutilizar un contenedor de mensaje de éxito/error
            let mensaje = document.getElementById('mensaje-formulario');
            if (!mensaje) {
                mensaje = document.createElement('p');
                mensaje.id = 'mensaje-formulario';
                mensaje.style.marginTop = '15px';
                mensaje.style.fontWeight = '600';
                mensaje.style.borderRadius = '6px';
                mensaje.style.padding = '10px 15px';
                formulario.appendChild(mensaje);
            }

            if (valido) {
                mensaje.style.backgroundColor = '#d4edda';
                mensaje.style.color = '#155724';
                mensaje.textContent = '¡Solicitud enviada con éxito! Nos pondremos en contacto a la brevedad.';
                formulario.reset();
            } else {
                mensaje.style.backgroundColor = '#f8d7da';
                mensaje.style.color = '#721c24';
                mensaje.textContent = 'Por favor, completa todos los campos requeridos.';
            }
        });

        // Limpiar mensaje de error al escribir
        formulario.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = 'var(--verde-principal)';
            });
        });
    }

    // ==========================================
    // 3. Botón flotante "Volver Arriba"
    // ==========================================
    const btnArriba = document.createElement('button');
    btnArriba.innerHTML = '↑';
    btnArriba.id = 'btn-volver-arriba';
    btnArriba.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(btnArriba);

    // Estilos dinámicos para el botón
    Object.assign(btnArriba.style, {
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        backgroundColor: 'var(--verde-principal)',
        color: 'white',
        fontSize: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.2s ease',
        zIndex: '1000',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btnArriba.style.opacity = '1';
            btnArriba.style.visibility = 'visible';
        } else {
            btnArriba.style.opacity = '0';
            btnArriba.style.visibility = 'hidden';
        }
    });

    btnArriba.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 4. Animación de revelado al hacer Scroll
    // ==========================================
    const secciones = document.querySelectorAll('section');
    secciones.forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s ease';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    secciones.forEach(sec => observer.observe(sec));
});