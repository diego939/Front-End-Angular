export class Direccion {
    id?: number;
    pais: string;
    provincia: string;
    localidad: string;
    domicilio: string;

    constructor(
        pais: string,
        provincia: string,
        localidad: string,
        domicilio: string,
    ){
        this.pais = pais;
        this.provincia = provincia;
        this.localidad = localidad;
        this.domicilio = domicilio;
    }
}
