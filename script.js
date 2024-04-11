//Ejercicio 1.
//Creación de Contenido:
//Los usuarios deben poder agregar nuevos elementos de contenido con un título y
//descripción.
//Debe ser posible seleccionar el tipo de contenido que se está creando (nota, tarjeta,
//evento, etc.).

//Recuperamos los datos del usuario del localStorage o se crea un array
let array = JSON.parse(localStorage.getItem("dateUsers")) || []

//Rescatamos los elementos que ha introducido el usuario
const titulo = document.getElementById('titulo');
const descripcion = document.getElementById('descripcion');
const contenido = document.getElementById('contenido');

//Una vez resctados los dos elementos rescatamos el botton
const boton = document.getElementById('botton');
//Creamos variables para botones
let bottonDelete;
let bottonEdit;

//Rescatamos tambien la lista que vamos a usar
let ul = document.getElementById('lista');


//Creamos una funcion que añada al array el objeto rescatado
function anadirArray(title, descrip, content, array){
    const objeto = {
        titulo: title,
        descripcion: descrip,
        contenido: content
    }
console.log(array)
    array.push(objeto);
    return array;
}
if(array!=null && array.length>0){
        //Recorremos el array para contruir el array si hay datos en el LocalStorage
        array.forEach(function(contenido){
            let li = document.createElement("li");
            //Le añadimos contendio al li
    
            //Creamos los botones editar y eliminar
            bottonDelete = document.createElement("button");//<button></button>
            bottonDelete.textContent="Delete";//<button>Delete</button>
            bottonDelete.classList.add("delete");//Le asignamos una class="delete"
    
            bottonEdit = document.createElement("button");//<button></button>
            bottonEdit.textContent="Edit";//<button>Edit</button>
            bottonEdit.classList.add("edit");//Le asignamos una class="edit"

            li.textContent = (`Titulo: ${contenido.titulo}, Descripción: ${contenido.descripcion}, Contenido: ${contenido.contenido}`)
            //Añadimos el boton delete al li
            li.appendChild(bottonDelete);
            //Añadimos el boton edit al li
            li.appendChild(bottonEdit);
            //Lo añadimos al ul
            ul.appendChild(li);

            //Evento que se dispara cuando pulsamos el boton delete
            bottonDelete.addEventListener("click", (e) =>{
            //e hace referencia al evento
            //.target te devuelve la etiqueta en la que te encuentras
            //.parent te devuelve el padre de la etiqueta donde te encuentras
            e.target.parentNode.remove();
            //Le aplicamos un filter a la lista de usuarios donde cada usuario se almacenda temporalmente en item el cual tiene que ser diferente a user
            //que hace referencia al usuario 
            array=array.filter((item)=>{
                return item!==user;
            });
            //Guardamos los nuevos valores del array en el localStorage
            localStorage.setItem('contenidoArray', JSON.stringify(array));
        });
        });
}
//Hacemos un evento que se active cuando se pulse el botón
boton.addEventListener("click", function(e){
    //Por defecto el boton haria submit pero como no queremos eso utilizamos el preventDefault
    e.preventDefault();
    //Llamamos a la funcion para contruir el array
    array = anadirArray(titulo.value, descripcion.value, contenido.value, array);
    //Cada vez que añadamos algo al array debemos actualizar el localStorage
    //Debemos convertir el array a JSON
    let arrayJSON = JSON.stringify(array);
    //Lo almacenamos en el LocalStorage
    localStorage.setItem('contenidoArray', arrayJSON);
    //Creamos un elemento de la lista
    let li = document.createElement('li');
    //Por cada li creamos un botton de editar y un boton eliminar
    let botonEliminar = document.createElement('button');
    let botonEditar = document.createElement('button');
    botonEditar.textContent = "Editar";
    botonEliminar.textContent = "Eliminar";
    //Le añadimos el contenido
    li.textContent = "Tipo: " + contenido.value + " Titulo: " + titulo.value + " Descripción: " + descripcion.value + " ";
    li.appendChild(botonEditar);
    li.appendChild(botonEliminar);
    //Añadimos al ul existente el li
    ul.appendChild(li);
})