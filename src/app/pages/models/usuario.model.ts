export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        // La ? indica que es opcional. Si no lo tiene es obligatorio
        public img?: string,
        public role?: string,
        public google?: string,
        public _id?: string
    ) {}
}