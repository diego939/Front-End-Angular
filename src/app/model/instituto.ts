export class Instituto {
    id?: number;
    instituto: string;
    titulo: string;
    anioIngreso: string;
    anioEgreso: string;
    imageInstituto: string;

    constructor(
        instituto: string,
        titulo: string,
        anioIngreso: string,
        anioEgreso: string,
        imageInstituto: string,
        ){
            this.instituto = instituto;
            this.titulo = titulo;
            this.anioIngreso = anioIngreso;
            this.anioEgreso = anioEgreso;
            this.imageInstituto = imageInstituto;
        }
}
