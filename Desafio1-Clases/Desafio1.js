class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros || {nombre: [], autor: []};
        this.mascotas = mascotas || [];
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas = [...this.mascotas, mascota];
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros = [...this.libros, {nombre: nombre, autor: autor}];
    }

    getBookNames() {
        return this.libros.map(({nombre}) => nombre);
    }
}

const usuario = new Usuario ('Luis','Perez',[{nombre: "Juego de tronos", autor: "George R. R. Martin"}], ["perro", "gato"]);

console.log(`Bienvenido ${usuario.getFullName()}`);
console.log(`El usuario posee ${usuario.countMascotas()} mascotas`);

usuario.addMascota("caballo");
usuario.addMascota("serpiente");
console.log(`El usuario posee ${usuario.countMascotas()} mascotas`);

usuario.addBook("El principito", "Antoine de Saint-Exupéry");
usuario.addBook("Harry Potter y el Caliz de Fuego", "J. K. Rowling");
console.log(`Los libros favoritos del usuario son: ${usuario.getBookNames()}`);
