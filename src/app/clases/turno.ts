export class Turno {
    key?: any;
    comentario?: string;
    dniPaciente?: string;
    fecha?: Date;
    horario?: string;
    matriculaMedico?: string;
    nombre?: string;

    constructor(fecha?: any) {
        this.fecha = new Date(fecha);
        this.key = Math.random();
        this.comentario = '';
        this.dniPaciente = '0';
        this.nombre = 'juan';
    }
}



