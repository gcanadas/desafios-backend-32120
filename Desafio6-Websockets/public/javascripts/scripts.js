(function () {
    const productForm = document.getElementById('productForm');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productURL = document.getElementById('productURL');
    const productsTable = document.getElementById('productsTable');

    let products = [];
    const socket = io();

    function updateTable(products = []) {
        productsTable.innerText = '';
        products.forEach((data) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${data.title}</td>
                                <td>$${data.price}</td>
                                <td><img src="${data.thumbnail}" alt="${data.title}"></td>`;
            productsTable.appendChild(tr);
        });
    };

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
        updateTable(data);
    })

})();