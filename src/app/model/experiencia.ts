export class Experiencia {
    id?: number;
    puesto: string;
    empresa: string;
    descripcion: string;
    anioIngreso: string;
    anioEgreso: string;
    imageExperiencia: string;

    constructor(
        puesto: string,
        empresa: string,
        descripcion: string,
        anioIngreso: string,
        anioEgreso: string,
        imageExperiencia: string,
        ){
            this.puesto = puesto;
            this.empresa = empresa;
            this.descripcion = descripcion;
            this.anioIngreso = anioIngreso;
            this.anioEgreso = anioEgreso;
            this.imageExperiencia = imageExperiencia;
        }
}
