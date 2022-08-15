export class Certificado {
    id?: number;
    nombre: string;
    imagen: string;

    constructor(
                nombre: string,
                imagen: string
                ){
                    this.nombre = nombre;
                    this.imagen = imagen;
                }
}
