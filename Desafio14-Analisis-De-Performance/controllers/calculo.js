process.on('message', function (message) {
    console.log(`Message from app.js: ${message}`);
});
let count = parseInt(process.argv[2]);

function calculo(cant) {
    const numeros = [];
    for (let i = 1; i <= 1000; i++) {
        let number = { indice: i, valor: 0 };
        numeros.push(number);
    }
    const generador = (inicio, fin) =>
        Math.floor(Math.random() * (fin - inicio + 1) + inicio);

    for (let i = 0; i <= cant; i++) {
        const random = generador(1, 1000);

        numeros.map((numero) => {
            if (numero.indice === random) {
                numero.valor = numero.valor + 1;
            }
        });
    }

    return numeros;
}

process.send(calculo(count));