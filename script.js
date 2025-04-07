
let entradaEditando = null;

const formulario = document.getElementById('formulario-entrada');
const btnNuevaEntrada = document.getElementById('btn-nueva-entrada');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const listaEntradas = document.getElementById('lista-entradas');
const inputTitulo = document.getElementById('input-titulo');
const inputFecha = document.getElementById('input-fecha');
const inputContenido = document.getElementById('input-contenido');
const btnTema = document.getElementById('btn-tema');
const fechaActual = document.getElementById('fecha-actual');

const meses = {
    '01': 'enero', '02': 'febrero', '03': 'marzo',
    '04': 'abril', '05': 'mayo', '06': 'junio',
    '07': 'julio', '08': 'agosto', '09': 'septiembre',
    '10': 'octubre', '11': 'noviembre', '12': 'diciembre'
};

function actualizarFecha() {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const hoy = new Date();
    fechaActual.textContent = hoy.toLocaleDateString('es-ES', opciones);
    
    // Establecer fecha predeterminada en el formulario
    const fechaFormateada = hoy.toISOString().split('T')[0];
    inputFecha.value = fechaFormateada;
}

function formatearFecha(fechaISO) {
    const [año, mes, dia] = fechaISO.split('-');
    return `${dia} de ${meses[mes]} de ${año}`;
}

function toggleFormulario(mostrar) {
    if (mostrar) {
        formulario.classList.add('mostrar');
    } else {
        formulario.classList.remove('mostrar');
        limpiarFormulario();
    }
}

function limpiarFormulario() {
    inputTitulo.value = '';
    inputFecha.value = new Date().toISOString().split('T')[0];
    inputContenido.value = '';
    entradaEditando = null;
}

function guardarEntrada() {
    const titulo = inputTitulo.value.trim();
    const fecha = inputFecha.value;
    const contenido = inputContenido.value.trim();

    if (!titulo || !contenido) {
        alert('Por favor completa el título y el contenido');
        return;
    }

    const entradaHTML = `
        <div class="entrada" data-id="${Date.now()}">
            <h3>${titulo}</h3>
            <span class="fecha-entrada">${formatearFecha(fecha)}</span>
            <p class="contenido">${contenido}</p>
            <button class="editar">✏️ Editar</button>
        </div>
    `;

    if (entradaEditando) {
        entradaEditando.innerHTML = `
            <h3>${titulo}</h3>
            <span class="fecha-entrada">${formatearFecha(fecha)}</span>
            <p class="contenido">${contenido}</p>
            <button class="editar">✏️ Editar</button>
        `;
    } else {
        listaEntradas.insertAdjacentHTML('afterbegin', entradaHTML);
    }

    toggleFormulario(false);
}

function cargarEntrada(entrada) {
    const titulo = entrada.querySelector('h3').textContent;
    const fechaTexto = entrada.querySelector('.fecha-entrada').textContent;
    const contenido = entrada.querySelector('.contenido').textContent;
    
    // Convertir fecha texto a formato input date (YYYY-MM-DD)
    const [dia, mes, año] = fechaTexto.split(' de ');
    const mesNumero = Object.keys(meses).find(key => meses[key] === mes.toLowerCase());
    const fechaFormateada = `${año}-${mesNumero}-${dia.padStart(2, '0')}`;
    
    inputTitulo.value = titulo;
    inputFecha.value = fechaFormateada;
    inputContenido.value = contenido;
    
    entradaEditando = entrada;
    toggleFormulario(true);
}


btnNuevaEntrada.addEventListener('click', () => {
    toggleFormulario(true);
});

btnGuardar.addEventListener('click', (e) => {
    e.preventDefault();
    guardarEntrada();
});

btnCancelar.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFormulario(false);
});

listaEntradas.addEventListener('click', (e) => {
    if (e.target.classList.contains('editar')) {
        const entrada = e.target.closest('.entrada');
        cargarEntrada(entrada);
    }
});

// Modo oscuro/claro
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
    const icono = btnTema.querySelector('.icono');
    const texto = btnTema.querySelector('.texto');
    
    if (document.body.classList.contains('modo-oscuro')) {
        icono.textContent = '☀️';
        texto.textContent = 'Modo Día';
    } else {
        icono.textContent = '🌙';
        texto.textContent = 'Modo Noche';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    actualizarFecha();
    
    // Ejemplo de entrada inicial
    const fechaEjemplo = new Date().toISOString().split('T')[0];
    const entradaEjemplo = `
        <div class="entrada" data-id="1">
            <h3>Mi primera entrada</h3>
            <span class="fecha-entrada">${formatearFecha(fechaEjemplo)}</span>
            <p class="contenido">¡Bienvenido a tu diario personal! Haz clic en ✏️ para editar esta entrada.</p>
            <button class="editar">✏️ Editar</button>
        </div>
    `;
    listaEntradas.innerHTML = entradaEjemplo;
});