(function () {
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productURL = document.getElementById('productURL');

    const productsTable = document.getElementById('productsTable');
    const nonProducts = document.getElementById('nonProducts');
    const showProducts = document.getElementById('showProducts');


    let products = [];
    const socket = io();

    function updateTable(producto) {
        document.getElementById("nonProducts").style.display = "none";
        document.getElementById("showProducts").style.display = "block";
        fetch('./javascripts/templates/productTemplate.hbs')
            .then(template => template.text())
            .then(text => {
                const fila = document.createElement("tr");
                template = Handlebars.compile(text);
                fila.innerHTML = template(producto);
                productsTable.appendChild(fila);
            })
    }

    socket.on('connect', () => {
        console.log('Conectados al servidor');
    });

    productForm.addEventListener('submit', (event) =>{
        event.preventDefault();
        const data = {
            title: productName.value,
            price: productPrice.value,
            thumbnail: productURL.value,
        };

        socket.emit('newProduct', data);
        productName.value = '';
        productPrice.value = '';
        productURL.value = '';
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

})();