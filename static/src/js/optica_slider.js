/** @odoo-module **/


$(document).ready(function() {
    initOpticaSlider();
    initTransmittanceChart();
});

// ── Slider ──────────────────────────────────────────────────────────
function initOpticaSlider() {
    const slider      = document.getElementById('wavelength-slider');
    if (!slider) return;   // si el bloque no está en esta página, salimos

    const nmDisplay   = document.getElementById('nm-display');
    const specLabel   = document.getElementById('spectrum-label');
    const energyLevel = document.getElementById('energy-level');
    const bioImpact   = document.getElementById('bio-impact');
    const clinicalRec = document.getElementById('clinical-rec');
    const physDisplay = document.getElementById('physics-display');

    // Definimos los rangos como datos, no como if/else repetidos
    // Piénsalo como una tabla de refracción: cada rango tiene sus propiedades
    const ranges = [
        {
            max: 379,
            bg: '#e2e8f0', border: '#94a3b8', labelColor: '#475569',
            label: 'Radiación Ultravioleta (UV)',
            nmColor: '#7c3aed',
            energy: 'Extrema (Tóxica)',
            impact: 'Daño comprobado a tejidos oculares profundos y superficiales.',
            rec:    'Bloqueo UV 100% indispensable.'
        },
        {
            max: 440,
            bg: '#dbeafe', border: '#60a5fa', labelColor: '#1e40af',
            label: 'Luz Azul-Violeta (HEV)',
            nmColor: '#1d4ed8',
            energy: 'Muy Alta (Pico Energético)',
            impact: 'Estrés oxidativo (ROS), daño mitocondrial en fotorreceptores.',
            rec:    'Bloqueo selectivo recomendado (Filtro Azul).'
        },
        {
            max: 495,
            bg: '#ecfdf5', border: '#34d399', labelColor: '#065f46',
            label: 'Luz Azul-Turquesa',
            nmColor: '#0d9488',
            energy: 'Moderada',
            impact: 'Regulación de melatonina y ritmo circadiano. Percepción cromática.',
            rec:    'Debe transmitirse al ojo (no bloquear).'
        },
        {
            max: 750,
            bg: '#fefce8', border: '#fcd34d', labelColor: '#92400e',
            label: 'Espectro Visible (Verde / Amarillo / Rojo)',
            nmColor: '#b45309',
            energy: 'Baja',
            impact: 'Visión funcional estándar sin estrés metabólico adicional.',
            rec:    'No requiere bloqueo especial.'
        }
    ];

    function updatePhysics(val) {
        val = parseInt(val);

        // Busca el rango que corresponde (como un switch pero más limpio)
        const r = ranges.find(range => val <= range.max);
        if (!r) return;

        nmDisplay.textContent    = val + ' nm';
        nmDisplay.style.color    = r.nmColor;
        specLabel.textContent    = r.label;
        specLabel.style.color    = r.labelColor;
        energyLevel.textContent  = r.energy;
        bioImpact.textContent    = r.impact;
        clinicalRec.textContent  = r.rec;

        physDisplay.style.backgroundColor = r.bg;
        physDisplay.style.borderColor     = r.border;
        physDisplay.style.borderWidth     = '2px';
        physDisplay.style.borderStyle     = 'solid';
        physDisplay.style.transition      = 'all 0.4s ease';
    }

    // Carga inicial con el valor por defecto del slider
    updatePhysics(slider.value);

    // ✅ Event listener correcto
    slider.addEventListener('input', (e) => updatePhysics(e.target.value));
}

// ── Gráfica Chart.js ─────────────────────────────────────────────────
function initTransmittanceChart() {
    const canvas = document.getElementById('transmittanceChart');
    if (!canvas) return;

    // Chart.js se carga vía CDN declarado en __manifest__.py
    // Esperamos un momento para asegurarnos que ya está disponible
    if (typeof Chart === 'undefined') {
        setTimeout(initTransmittanceChart, 200);
        return;
    }

    const ctx    = canvas.getContext('2d');
    const labels = ['380','390','400','410','420','430','440','450','460','470','480','495','500+'];
    const data   = [5, 10, 20, 35, 45, 60, 75, 90, 95, 98, 99, 100, 100];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: '% de Transmitancia (Paso de Luz)',
                data,
                borderColor: '#1E3A8A',
                backgroundColor: 'rgba(59,130,246,0.15)',
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#1E3A8A',
                pointRadius: 4,
                pointHoverRadius: 7,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'bottom' },
                tooltip: {
                    callbacks: {
                        title: (c) => c[0].label + ' nm',
                        label: (c) => ' Transmitancia: ' + c.raw + '%',
                        afterBody: (c) => {
                            const v = parseInt(c[0].label);
                            if (v >= 400 && v <= 440) return '⚠ ZONA DE BLOQUEO HEV (Dañina)';
                            if (v >= 450 && v <= 495) return '✅ ZONA DE TRANSMISIÓN (Benéfica)';
                            return '';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    title: { display: true, text: 'Transmitancia (%)', font: { weight: 'bold' } }
                },
                x: {
                    title: { display: true, text: 'Longitud de Onda (nm)', font: { weight: 'bold' } }
                }
            }
        }
    });
}
