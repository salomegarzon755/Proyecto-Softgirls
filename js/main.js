// Esperar a que todo el HTML de la página esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFECTO ANIMADO PARA LAS ESTADÍSTICAS (.stats)
    // ==========================================
    const incrementarEstadisticas = () => {
        const items = document.querySelectorAll(".stat-item h3");
        
        items.forEach(item => {
            const textoOriginal = item.innerText; // Guarda "15k+", "24/7", "20+"
            
            // Solo animaremos los que tienen números incrementales (como 15k o 20)
            if (textoOriginal.includes('k') || textoOriginal.includes('+')) {
                const numeroMeta = parseInt(textoOriginal); // Extrae el 15 o el 20
                let contadorActual = 0;
                
                const intervalo = setInterval(() => {
                    contadorActual++;
                    if (textoOriginal.includes('k')) {
                        item.innerText = `${contadorActual}k+`;
                    } else {
                        item.innerText = `${contadorActual}+`;
                    }
                    
                    if (contadorActual >= numeroMeta) {
                        clearInterval(intervalo);
                        item.innerText = textoOriginal; // Asegura dejar el texto exacto al final
                    }
                }, 40); // Velocidad de la animación
            }
        });
    };

    // Ejecutar la animación de números al cargar la pestaña
    incrementarEstadisticas();


    // ==========================================
    // 2. CAPTURA Y PROCESAMIENTO DE FORMULARIOS
    // ==========================================
    // Buscamos cualquier formulario con la clase '.form' (el de vacunación, consultas o peluquería)
    const formulario = document.querySelector(".form");

    if (formulario) {
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evita que la página se recargue al presionar enviar

            // Capturamos los datos de los inputs usando su atributo 'name'
            const datosUnificados = new FormData(formulario);
            
            // Creamos un objeto organizado con la información recogida
            const citaMascota = {
                propietario: datosUnificados.get("nombre_dueno"),
                telefono: datosUnificados.get("telefono"),
                mascota: datosUnificados.get("nombre_mascota"),
                tipo: datosUnificados.get("tipo_mascota") || datosUnificados.get("tamano_mascota"),
                servicio: datosUnificados.get("tipo_vacuna") || datosUnificados.get("motivo_consulta") || datosUnificados.get("servicio_estetica"),
                detalles: datosUnificados.get("notas")
            };

            // Aquí simulamos el guardado exitoso
            // Mostramos una alerta personalizada usando los datos que escribió el usuario
            alert(`¡Excelente noticia, ${citaMascota.propietario}!\n\nHuellitas Medellín ha recibido tu solicitud para registrar a [${citaMascota.mascota}]. Nos comunicaremos al teléfono ${citaMascota.telefono} muy pronto para confirmar tu cupo.`);

            // Limpiamos los campos del formulario para que quede vacío de nuevo
            formulario.reset();
        });
    }
});