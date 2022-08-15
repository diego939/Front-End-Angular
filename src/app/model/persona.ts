
export class Persona {
    id?: number;
    nombres: string;
    apellido: string;
    nacionalidad: string;
    email: string;
    celular: string;
    sobreMi: string;
    ocupacion: string;
    imagePortada: string;
    imagePerfil: string;

    constructor(
        nombres: string,
        apellido: string,
        nacionalidad: string,
        email: string,
        celular: string,
        sobreMi: string,
        ocupacion: string,
        imagePortada: string,
        imagePerfil: string
        ) {
        this.nombres = nombres;
        this.apellido = apellido;
        this.nacionalidad = nacionalidad;
        this.email = email;
        this.celular = celular;
        this.sobreMi = sobreMi;
        this.ocupacion = ocupacion;
        this.imagePortada = imagePortada;
        this.imagePerfil = imagePerfil;
    }
}
