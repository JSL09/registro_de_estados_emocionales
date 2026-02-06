const form = document.getElementById('checkinForm');
const modoRapido = document.getElementById('modoRapido');
const resultadoEstado = document.getElementById('resultadoEstado');
const resultadoExplicacion = document.getElementById('resultadoExplicacion');
const semaforo = document.getElementById('semaforo');
const timelineBody = document.getElementById('timelineBody');
const crisisBtn = document.getElementById('crisisBtn');
const crisisDialog = document.getElementById('crisisDialog');
const cerrarCrisis = document.getElementById('cerrarCrisis');
const fechaActual = document.getElementById('fechaActual');

const STORAGE_KEY = 'sza_checkins_v1';

function loadData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveData(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(max, num));
}

function classify(entry, previous) {
  const sintomas = entry.referencia + entry.voces + entry.desorganizacion;
  const suenoBajo = entry.suenoHoras < 5 ? 1 : 0;

  const id = clamp((4 - entry.animo) + (4 - entry.energia) + (4 - entry.claridad) + suenoBajo + (2 - entry.adherencia), 0, 12);
  const iam = clamp((entry.energia - 4) + (entry.animo - 4) + (suenoBajo * 2) + (entry.estres / 2), 0, 10);
  const ip = clamp((sintomas * 2) + suenoBajo + (entry.claridad <= 2 ? 1 : 0), 0, 10);

  let deltaEnergia = 0;
  let deltaSueno = 0;
  if (previous) {
    deltaEnergia = Math.max(0, entry.energia - previous.energia);
    deltaSueno = Math.max(0, previous.suenoHoras - entry.suenoHoras);
  }

  const iri = clamp(Math.round((id * 2.2) + (iam * 3.2) + (ip * 4.1) + (deltaEnergia * 4) + (deltaSueno * 3) + (entry.consumo * 8)), 0, 100);

  let perfil = 'Estado estable';
  let explicacion = 'Se observan señales dentro de un rango de estabilidad.';

  if (ip >= 5) {
    perfil = 'Señales psicóticas en aumento';
    explicacion = 'Se detectan más percepciones inusuales o desorganización. Conviene activar apoyo temprano.';
  } else if (iam >= 5 && entry.suenoHoras < 6) {
    perfil = 'Perfil de activación alta (hipomanía/manía probable)';
    explicacion = 'Hay aumento de energía con reducción de sueño. Es útil bajar estímulos y avisar al equipo tratante.';
  } else if (id >= 6) {
    perfil = 'Perfil depresivo';
    explicacion = 'Se observa ánimo/energía bajos y posible desgaste. Prioriza descanso, apoyo y seguimiento clínico.';
  }

  let color = 'Verde';
  let bg = '#d8eadf';
  let fg = '#225f3f';
  if (iri >= 70) {
    color = 'Rojo';
    bg = '#f3d4d4';
    fg = '#7f2121';
  } else if (iri >= 50) {
    color = 'Naranja';
    bg = '#f8e0d0';
    fg = '#8d4c20';
  } else if (iri >= 30) {
    color = 'Amarillo';
    bg = '#f5ecce';
    fg = '#725b19';
  }

  return { id, iam, ip, iri, perfil, explicacion, color, bg, fg };
}

function renderTimeline(data) {
  timelineBody.innerHTML = '';
  const last14 = [...data].slice(-14).reverse();
  last14.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.fecha}</td>
      <td>${item.animo}</td>
      <td>${item.energia}</td>
      <td>${item.suenoHoras}h</td>
      <td>${item.iri}</td>
      <td>${item.perfil}</td>
    `;
    timelineBody.appendChild(row);
  });
}

function renderLatest(data) {
  if (!data.length) {
    return;
  }
  const latest = data[data.length - 1];
  resultadoEstado.textContent = `${latest.perfil} · IRI ${latest.iri}/100`;
  resultadoExplicacion.textContent = latest.explicacion;
  semaforo.textContent = `Semáforo: ${latest.color}`;
  semaforo.style.background = latest.bg;
  semaforo.style.color = latest.fg;
}

function setFastMode(enabled) {
  const hiddenZones = document.querySelectorAll('[data-fast="hide"]');
  hiddenZones.forEach((zone) => {
    zone.classList.toggle('hidden-fast', enabled);
    const zoneInputs = zone.querySelectorAll('input, select, textarea, button');
    zoneInputs.forEach((input) => {
      input.disabled = enabled;
    });
  });
}

modoRapido.addEventListener('change', () => {
  setFastMode(modoRapido.checked);
});

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const fd = new FormData(form);

  const entry = {
    fecha: new Date().toLocaleDateString('es-ES'),
    animo: Number(fd.get('animo')),
    energia: Number(fd.get('energia')),
    claridad: Number(fd.get('claridad') || 4),
    referencia: fd.get('referencia') ? 1 : 0,
    voces: fd.get('voces') ? 1 : 0,
    desorganizacion: fd.get('desorganizacion') ? 1 : 0,
    suenoHoras: Number(fd.get('suenoHoras') || 7),
    suenoCalidad: Number(fd.get('suenoCalidad') || 3),
    adherencia: Number(fd.get('adherencia') ?? 2),
    estres: Number(fd.get('estres') || 1),
    consumo: Number(fd.get('consumo') || 0),
  };

  const data = loadData();
  const previous = data.length ? data[data.length - 1] : null;
  const calc = classify(entry, previous);
  data.push({ ...entry, ...calc });
  saveData(data);

  renderLatest(data);
  renderTimeline(data);
});

crisisBtn.addEventListener('click', () => {
  fechaActual.textContent = new Date().toLocaleDateString('es-ES');
  crisisDialog.showModal();
});

cerrarCrisis.addEventListener('click', () => {
  crisisDialog.close();
});

const initial = loadData();
renderLatest(initial);
renderTimeline(initial);
setFastMode(modoRapido.checked);
