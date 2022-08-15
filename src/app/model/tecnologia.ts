export class Tecnologia {
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

