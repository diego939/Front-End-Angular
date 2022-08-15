export class Habilidad {
    id?: number;
    nombre: string;
    nivelId: number;

    constructor(
                nombre: string,
                nivelId: number,
                )
                {
                    this.nombre = nombre;
                    this.nivelId = nivelId;
                }
}
