// Ejercicio Práctico
// Este ejercicio consiste en construir una cadena con fichas de dominó.
// Implemente una forma de ordenar un conjunto dado de fichas de dominó de tal manera que se
// construya una cadena correcta de fichas (los puntos en una de las mitades de una ficha concuerdan con
// los puntos que tiene la mitad vecina de la ficha adyacente) y que los puntos de las mitades de aquellas
// fichas que no tengan vecino (fichas primera y última) concuerden uno con el otro.
// Ejemplo 1:
// Dadas las fichas [2|1], [2|3] y [1|3], el resultado del computo fruto de su construcción debe retornar
// algunas de las siguientes opciones:
// ✓ [1|2] [2|3] [3|1] ó
// ✓ [3|2] [2|1] [1|3] ó
// ✓ [1|3] [3|2] [2|1], etc.
// Como es posible observar, los números primero y último son los mismos.
// Ejemplo 2:
// Dadas las fichas [1|2], [4|1] y [2|3] la cadena resultado no es válida:
// o [4|1] [1|2] [2|3]
// Los números primero y último no son los mismos.

// Solución
class Ficha {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    toString() {
        return `[${this.a}|${this.b}]`;
    }

    getAB() {
        return [this.a, this.b];
    }

    getBA() {
        return [this.b, this.a];
    }
    equals(ficha) {
        return (this.a == ficha.a && this.b == ficha.b) || (this.a == ficha.b && this.b == ficha.a);
    }
}

function eliminarDuplicidadDeFichas(listaFichas) {
    for (let i = 0; i < listaFichas.length; i++) {
        for (let j = 0; j < listaFichas.length; j++) {
            if (i != j) {
                if (listaFichas[i].equals(listaFichas[j])) {
                    listaFichas.splice(j, 1);
                    eliminarDuplicidadDeFichas(listaFichas);
                }
            }
        }
    }
}

// funcion que construye un objeto de tipo Lista de fichas de dominó
function stringToFichas(fichas, strict = false) {
    let listaFichas = [];
    // let regex = /\[(\d)\|(\d)\]/g;
    // Validar numeros de 0 a 6
    let regex = /\[(\d{1,2})\|(\d{1,2})\]/g;
    if (strict) {
        regex = /\[(\d)\|(\d)\]/g;
    }
    let match;
    while (match = regex.exec(fichas)) {
        let a = match[1];
        let b = match[2];
        if (a >= 0 && a <= 6 && b >= 0 && b <= 6) {
            listaFichas.push(new Ficha(a, b));
        } else {
            if (strict) {
                return [];
            }
        }
    }
    console.log(listaFichas);
    // Validar que las fichas no sean iguales, ya sea en el orden a-b o b-a usando backtracking
    // Si la ficha es igual a la anterior, se elimina de la lista
    eliminarDuplicidadDeFichas(listaFichas);
    return listaFichas;
}

// Coinstruir todo el dominó
let dominos = [];
for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
        dominos.push("[" + i + "|" + j + "]");
    }
}

tests = [
    "r",
    "[1|2]",
    "[2|1] [2|3][1|3]",
    "[1|2] [4|1] [2|3]",
    "[1|2] [4|1]",
    "[7|2] [4|9]", // El maximo valor de una ficha es 6
    "[4|adfasdfdas] [1|2] [4|]",// No es válida retornar cadena vacía
    "[1|2] [4|1] [2|3] [3|1] [3|1] [2|1]",
    dominos.toString()
]

for (let i = 0; i < tests.length; i++) {
    console.log('Test ' + (i + 1));
    console.log(stringToFichas(tests[i], true));
}