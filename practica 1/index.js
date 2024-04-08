const botones = document.querySelectorAll('.boton');
const pantalla = document.querySelector('#pantalla');

pantalla.addEventListener('keydown', (e) => {
	let regex = /^[\d\(\)+\-*x\/]?([\d\(\)+\-*\/]*[\d\)])?$/;

	if (regex.test(e.key)) {
		const ultimoCaracter = pantalla.value.slice(-1);
		if (esOperador(e.key)) {
			if (esOperador(ultimoCaracter)) {
				pantalla.value = pantalla.value.slice(0, -1) + e.key;
			} else {
				pantalla.value += e.key;
			}
		} else {
			pantalla.value += e.key;
		}
	}

	if (e.keyCode === 8) {
		pantalla.value = pantalla.value.slice(0, -1);
	}

	if (e.keyCode === 13) {
		console.log('enter');
		calcular();
	}
});

botones.forEach((boton) => {
	if (boton.value != 'CE' && boton.value != '=') {
		boton.addEventListener('click', () => {
			pantalla.focus();
			const ultimoCaracter = pantalla.value.slice(-1);
			if (esOperador(boton.value)) {
				if (esOperador(ultimoCaracter)) {
					pantalla.value = pantalla.value.slice(0, -1) + boton.value;
				} else {
					pantalla.value += boton.value;
				}
			} else {
				pantalla.value += boton.value;
			}
		});
	}

	if (boton.value === 'CE') {
		boton.addEventListener('click', () => {
			pantalla.value = pantalla.value.slice(0, -1);
			pantalla.focus();
		});
	}

	if (boton.value === 'CE') {
		boton.addEventListener('dblclick', () => {
			pantalla.value = '';
			pantalla.focus();
		});
	}

	if (boton.value === '=') {
		boton.addEventListener('click', () => {
			calcular();
			pantalla.focus();
		});
	}
});

function calcular() {
	const valorPantalla = pantalla.value.replaceAll('x', '*');
	const resultado = eval(valorPantalla);
	pantalla.value = resultado;
}

function esOperador(caracter) {
	return ['+', '-', '*', '/', 'x', '.'].includes(caracter);
}
