# Diseño de aplicación de salud mental para trastorno esquizoafectivo

## 1. Propósito clínico y humano

Esta app está diseñada **exclusivamente** para personas con trastorno esquizoafectivo, con enfoque en:

- Monitoreo de estado de ánimo.
- Monitoreo de síntomas psicóticos.
- Prevención de recaídas con alertas tempranas.

Principios rectores:

1. **No estigmatizante**: lenguaje neutral, respetuoso y centrado en la persona.
2. **Calma visual**: interfaz limpia, poco ruido, colores suaves.
3. **Accesibilidad cognitiva**: interacción simple para momentos de confusión o desorganización.
4. **Utilidad clínica**: datos estructurados para apoyar seguimiento terapéutico.

---

## 2. Objetivo principal

Ayudar al usuario a:

- Detectar cambios tempranos entre:
  - estado depresivo
  - estado estable
  - hipomanía/manía
  - descompensación psicótica
- Identificar patrones previos a recaídas.
- Mejorar la conciencia de síntomas (**insight**) sin culpabilizar.

---

## 3. Arquitectura funcional (módulos clave)

## 3.1 Check-in diario de 2 minutos

Flujo ultra corto, siempre igual para reducir carga mental:

1. **¿Cómo estuvo tu ánimo hoy?** (escala visual 1–7)
2. **¿Cómo estuvo tu energía/activación?** (1–7)
3. **¿Qué tan clara estuvo tu mente?** (1–7)
4. **Síntomas psicóticos hoy** (interruptores simples):
   - ideas de referencia/persecución
   - voces o percepciones inusuales
   - desorganización del pensamiento/habla
5. **Sueño**: horas + calidad subjetiva.
6. **Adherencia farmacológica**: tomado/parcial/no tomado.
7. **Estrés y consumo** (alcohol/cannabis/otras sustancias, sí/no).

> Diseño de interacción: si hay fatiga cognitiva, el usuario puede marcar “**modo rápido**” y completar solo 4 ítems críticos.

## 3.2 Detector de estado clínico diario

La app clasifica cada día en cuatro dominios orientativos (no diagnóstico):

- **Depresivo**
- **Estable**
- **Hipomanía/Manía**
- **Riesgo psicótico**

Se basa en reglas transparentes (explicables al usuario):

- Depresivo: ánimo bajo + energía baja + anhedonia + enlentecimiento/sueño alterado.
- Hipomanía/Manía: energía alta sostenida + menor necesidad de dormir + aceleración cognitiva/irritabilidad.
- Riesgo psicótico: incremento de percepciones inusuales, ideas delirantes, desorganización, insomnio marcado.

La interfaz muestra:

- “**Hoy parece un día de perfil estable / depresivo / activado / con señales psicóticas**”.
- “**Qué señales detectamos**” en lenguaje claro.

## 3.3 Línea de tiempo de patrones

Vista semanal y mensual con capas:

- Ánimo.
- Activación.
- Sueño.
- Síntomas psicóticos.
- Medicación.
- Eventos de estrés.

Objetivo: detectar combinaciones de riesgo (ej.: 3 noches de poco sueño + subida de energía + aparición de ideas de referencia).

## 3.4 Plan personal de prevención de recaídas

Co-creado con usuario y clínico:

- **Señales tempranas personales** (top 5).
- **Semáforo de riesgo**:
  - Verde: estable.
  - Amarillo: cambios iniciales.
  - Naranja: deterioro funcional.
  - Rojo: riesgo alto / posible crisis.
- **Acciones por color**:
  - estrategias de regulación
  - contacto de apoyo
  - ajuste de rutina (sueño, estímulos, estrés)
  - cuándo contactar equipo tratante

## 3.5 Centro de insight (psicoeducación breve)

Microcontenidos de 1 minuto:

- “Cómo diferenciar activación saludable vs hipomanía”.
- “Por qué el sueño es un biomarcador temprano”.
- “Qué hacer si aumentan las percepciones inusuales”.

Con preguntas de reflexión:

- “¿Qué noté antes de la última descompensación?”
- “¿Qué me ayudó a recuperar estabilidad?”

## 3.6 Modo crisis (1 toque)

Botón fijo “**Necesito ayuda ahora**” que abre:

1. Respiración guiada de 60–90 segundos.
2. Recordatorio de orientación (fecha/lugar/persona de apoyo).
3. Contacto rápido (familiar, terapeuta, urgencias).
4. Instrucciones personalizadas acordadas previamente.

---

## 4. Modelo de puntuación clínica orientativa

## 4.1 Variables principales

- Ánimo (1–7)
- Energía (1–7)
- Claridad mental (1–7)
- Sueño (horas + calidad)
- Síntomas psicóticos (0–3 por ítem)
- Adherencia farmacológica (0/1/2)
- Estrés agudo (0–3)
- Consumo de sustancias (0/1)

## 4.2 Índices derivados

- **Índice depresivo (ID)**
- **Índice de activación/manía (IAM)**
- **Índice psicótico (IP)**
- **Índice de recaída inminente (IRI, 0–100)**

El IRI se calcula combinando incrementos recientes (delta 3–7 días) y factores críticos:

- caída abrupta de sueño
- aumento sostenido de activación
- ascenso de síntomas psicóticos
- reducción de adherencia
- aumento de estrés/consumo

## 4.3 Umbrales y explicabilidad

- La app **siempre explica** por qué subió el riesgo:
  - “Riesgo aumentó por 4 noches con sueño <5h y más percepciones inusuales”.
- Sin etiquetas absolutas (“estás en psicosis”), solo lenguaje probabilístico y de cuidado.

---

## 5. Experiencia de usuario (UX/UI)

## 5.1 Principios visuales

- Paleta suave (azules/grises cálidos, bajo contraste agresivo).
- Tipografía grande y legible.
- Íconos simples + texto explícito.
- Una tarea por pantalla.
- Animaciones lentas y opcionales.

## 5.2 Estados cognitivos contemplados

- **Modo simplificado** automático cuando hay alta carga sintomática:
  - menos opciones
  - textos más cortos
  - botones grandes
- Lectura en voz alta opcional.
- Confirmaciones claras para evitar errores.

## 5.3 Lenguaje

- Evitar: “fallaste”, “incumpliste”, “estás mal”.
- Usar: “hoy fue difícil”, “observamos cambios”, “podemos actuar temprano”.

---

## 6. Alertas inteligentes y escalamiento

## 6.1 Tipos de alertas

1. **Autocuidado** (bajo riesgo):
   - “Hoy conviene priorizar descanso y reducir estímulos”.
2. **Seguimiento** (riesgo medio):
   - “Se detectan señales tempranas. ¿Quieres activar tu plan amarillo?”
3. **Escalamiento clínico** (riesgo alto):
   - “Sería recomendable contactar a tu red de apoyo hoy”.

## 6.2 Reglas de seguridad

- Nunca reemplaza atención médica.
- Si hay riesgo alto sostenido o ideación autolesiva reportada:
  - guía directa a recursos de emergencia definidos por país/usuario.

---

## 7. Funcionalidades para equipo clínico (opt-in)

Panel compartible (con consentimiento explícito):

- Tendencias semanales.
- Adherencia y sueño.
- Alertas registradas.
- Eventos de recaída y contexto.

Exportación:

- PDF clínico para consulta.
- Resumen de “señales tempranas personales” y respuesta a intervenciones.

---

## 8. Privacidad, ética y seguridad

- Consentimiento informado granular (qué se registra y con quién se comparte).
- Datos cifrados en tránsito y reposo.
- Opción de uso local sin nube (si es viable técnicamente).
- Control total del usuario sobre contactos de emergencia.
- Auditoría de algoritmo para minimizar falsos positivos/negativos.

---

## 9. Flujo MVP (versión inicial)

1. Onboarding humano y breve.
2. Configuración de plan de recaída y red de apoyo.
3. Check-in diario + clasificación orientativa.
4. Línea de tiempo de 14 días.
5. Alertas y acciones por semáforo.
6. Modo crisis.

### Métricas de éxito MVP

- Tasa de check-in >60% en 30 días.
- Detección de señales tempranas reportada por usuario.
- Reducción de recaídas no planificadas (a evaluar longitudinalmente).
- Mejora percibida de insight y autoeficacia.

---

## 10. Roadmap posterior

- Personalización con modelos temporales por paciente.
- Integración con wearables (sueño/actividad).
- Detección pasiva de cambios de rutina (opt-in estricto).
- Módulos para familiares/cuidadores con límites de privacidad.

---

## 11. Mensaje clínico final

Esta aplicación no busca etiquetar a la persona por su diagnóstico, sino ofrecer una herramienta de **autoconocimiento, prevención y acompañamiento temprano**, especialmente útil cuando la estabilidad es frágil y el acceso rápido a señales claras puede evitar una crisis mayor.
