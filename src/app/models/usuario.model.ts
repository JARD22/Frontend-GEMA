export class Usuario{
    constructor(
        public id:number,
        public correo:string,
        public nombre:string,
        public rol:string,
        public intentos:string,
    ){

    }
}