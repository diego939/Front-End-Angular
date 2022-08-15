export class Proyecto {
    id?: number;
    nombre: string;
    descripcion: string;
    imageProyecto: string;

    constructor(
                nombre: string,
                descripcion: string,
                imageProyecto: string
                ){
                    this.nombre = nombre;
                    this.descripcion = descripcion;
                    this.imageProyecto = imageProyecto;
                }
}
