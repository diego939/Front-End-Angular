export class Nivel {
    id?: number;
    nivel: number;
    descripcion: string;

    constructor(
                nivel: number,
                descripcion: string
            ){
                this.nivel = nivel;
                this.descripcion = descripcion;
             }
}
