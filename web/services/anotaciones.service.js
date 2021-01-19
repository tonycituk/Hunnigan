'use-strict';
var anotaciones;

let URL = "https://hunnigan-dev.herokuapp.com/";

//Obtener todas las anotaciones
function getAllAnotaciones() {
    fetch(URL+'anotaciones')
    .then(response  => response.json())
    .then(data => anotaciones = data);
}

//Agregar una anotacion
function addAnotacion(name, content, libreta) {
    fetch(URL+ 'anotacion', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: name, 
        content: content,
        libreta: libreta
    }),
})
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
})
    .catch((error) => {
    console.error('Error:', error);
});
}

//Actualizar una anotacion
function updateAnotacion(id, name, content, libreta) {
    fetch(URL+ 'anotacion/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name, 
            content: content,
            libreta: libreta
        }),
    })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
    })
        .catch((error) => {
        console.error('Error:', error);
    });
}

//Eliminar una anotacion
function deleteAnotacion(id) {
    let req = new XMLHttpRequest();
    req.open('DELETE', URL + 'anotacion/' + id, true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                console.info(req.responseText);
                getAllAnotaciones();
            }
            else {
                console.error("Error loading page\n");
            }
        }
    };
    req.send(null);
}