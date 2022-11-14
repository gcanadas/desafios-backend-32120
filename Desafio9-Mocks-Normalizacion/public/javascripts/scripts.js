(function () {
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productURL = document.getElementById('productURL');

    const productsTable = document.getElementById('productsTable');

    const titleMessages = document.getElementById('titleMessages');

    const messageForm = document.getElementById('messageForm');
    const messageNombre = document.getElementById('messageNombre');
    const messageApellido = document.getElementById('messageApellido');
    const messageEdad = document.getElementById('messageEdad');
    const messageAlias = document.getElementById('messageAlias');
    const messageAvatar = document.getElementById('messageAvatar');
    const messageText = document.getElementById('messageText');
    const showMessage = document.getElementById('showMessage');


    let products = [];
    let messages = [];
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const socket = io();
    


    function updateTable(producto) {
        document.getElementById("nonProducts").style.display = "none";
        document.getElementById("showProducts").style.display = "block";
        fetch('./javascripts/templates/productTemplate.hbs')
            .then(template => template.text())
            .then(text => {
                const fila = document.createElement('tr');
                template = Handlebars.compile(text);
                fila.innerHTML = template(producto);
                productsTable.appendChild(fila);
            });
    };

    function updateChat(messages) {
        fetch('./javascripts/templates/messageTemplate.hbs')
            .then(template => template.text())
            .then(text => {
                const li = document.createElement('li');
                template = Handlebars.compile(text);
                li.innerHTML = template(messages);
                showMessage.appendChild(li);
            })
    };

    function validateForm (event) {

    };

    function validateMessage (){
        if(emailRegex.test(messageEmail.value) && messageText){
            const data = {
                author: {
                    email: messageEmail.value,
                    Nombre: messageNombre.value,
                    Apellido: messageApellido.value,
                    Edad: messageEdad.value,
                    alias: messageAlias.value,
                    avatar: messageAvatar.value,
                },
                text: {
                    date: Date().toLocaleString(),
                    text: messageText.value,
                },
            }
            socket.emit('newMessage', data);
            messageText.value = '';
            messageText.focus();
        }else{
            alert('Para enviar mensajes debe introducir un mail válido y un mensaje');
        }
    };

    function desnormalizar (message){
        const autorScheme = new normalizr.schema.Entity( 'author', {}, { idAttribute: 'email' });

        const mensajeScheme = new normalizr.schema.Entity('mensaje', { 
            author: autorScheme 
        });
        const allMensajes = new normalizr.schema.Entity('mensaje', { 
            text: [mensajeScheme],
        });
        const reversedMensajes = normalizr.denormalize( message.result, allMensajes, message.entities );

        const normalizedSize = JSON.stringify(message).length;
        const originalSize = JSON.stringify(reversedMensajes).length;
        const totalCompresion = ((normalizedSize * 100) / originalSize).toFixed(2);

        titleMessages.innerText = `Centro de Mensajes (Porcentaje de compresion: ${totalCompresion}%)`;
        console.log(`Porcentaje de compresion: ${totalCompresion}%`);
        return reversedMensajes
    }

    socket.on('connect', () => {
        console.log('Conectados al servidor');
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        validateMessage();
    })

    productForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        const data = {
            title: productName.value,
            price: productPrice.value,
            thumbnail: productURL.value,
        };

        socket.emit('newProduct', data);
        productForm.reset();
        productName.focus();
    })

    socket.on('productNotification', (data) => {
        products.push(data);
        updateTable(data);
    })

    socket.on('historyProducts', (data) => {
        products = data;
        if(data.length){
            productsTable.innerHTML = '';
            products.forEach((data) => {
                updateTable(data);
            });
        }
    });

    socket.on('historyMessage', (message) => {
        const reversedMensajes = desnormalizar(message);
        if(messages == ""){
            messages = reversedMensajes.mensaje;
            if(messages.length){
                messages.forEach((messages) => {
                    updateChat(messages);
                });
            }
        }
    });

    socket.on('messageNotification', (message) => {
        messages.push(message);
        updateChat(message);
    })

})();