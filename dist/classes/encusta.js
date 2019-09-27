"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Encuesta {
    constructor() {
        this.opciones = ['opcion1', 'opcion2', 'opcion3', 'opcion3', 'opcion4'];
        this.valores = [0, 0, 0, 0, 0];
    }
    getDatos() {
        return [
            { data: this.valores, label: 'Encuesnta' }
        ];
    }
    ingrementar(opcion, valor) {
        this.valores[opcion] = this.valores[opcion] + valor;
        return this.getDatos();
    }
}
exports.Encuesta = Encuesta;
