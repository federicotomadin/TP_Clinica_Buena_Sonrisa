export class Turno {
    key?: string;
    comentario?: string;
    dniPaciente?: string;
    fecha?: Date;
    matriculaMedico?: string;
    nombreMedico?: string;

    constructor(fecha?:any){
        this.fecha=new Date(fecha);
    }
}



