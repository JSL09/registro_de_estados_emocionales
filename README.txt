Descripción del proyecto
Brújula SZA es una aplicación web local orientada al monitoreo diario de personas con trastorno esquizoafectivo, con enfoque clínico, humano y no estigmatizante.

Incluye:
- Check-in diario de 2 minutos (con modo rápido para días de mayor carga mental).
- Clasificación orientativa del día: estable, depresivo, activación alta o señales psicóticas.
- Cálculo de índice de riesgo de recaída (IRI) con explicación clara de señales detectadas.
- Semáforo de prevención (verde, amarillo, naranja, rojo).
- Línea de tiempo de los últimos 14 registros.
- Modo crisis con acciones concretas de contención y búsqueda de ayuda.

Ejecución local
1. Desde este directorio, iniciar un servidor estático:
   python3 -m http.server 8000
2. Abrir en navegador:
   http://localhost:8000

Archivos principales
- index.html: estructura de la interfaz.
- styles.css: diseño visual calmado y accesible.
- app.js: lógica de check-in, clasificación, semáforo e historial.
- DISENO_APP_ESQUIZOAFECTIVO.md: diseño clínico-funcional de referencia.
