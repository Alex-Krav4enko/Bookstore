// способ доставки
document.addEventListener('DOMContentLoaded', function (e) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-fbb-store-api.herokuapp.com/order/delivery');
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            var delivery = JSON.parse(xhr.responseText);
            
            var newDiv = document.createElement('div');
            newDiv.className = "text2"; 
            
            delivery.forEach(function (item) {
                var cloneDiv = newDiv.cloneNode(true);
                
                cloneDiv.innerHTML = '<label><input class="order__radio delivery" type="radio" name="delivery" value="' + item.id + '">' + item.name + '</label>';
                
                orderDelivery.appendChild(cloneDiv);
            }); 
            
            deliveryMass = delivery;
            
        }
    });
    
    xhr.send(); 
});

// способ оплаты
document.addEventListener('DOMContentLoaded', function (e) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-fbb-store-api.herokuapp.com/order/payment');
    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            var payment = JSON.parse(xhr.responseText);
            
            var newDiv = document.createElement('div');
            newDiv.className = "text2"; 
            
            payment.forEach(function (item) {
                var cloneDiv = newDiv.cloneNode(true);
                
                cloneDiv.innerHTML = '<label><input class="order__radio payment" type="radio" name="payment" value="' + item.id + '" disabled="disabled">' + item.title + '</label>';
                
                orderPayment.appendChild(cloneDiv);  
            });
                    
            var paymentCollection = document.getElementsByClassName('payment');
            
            paymentCollection = Array.prototype.slice.call(paymentCollection);
            
            orderDelivery.onclick = function(e) {
                paymentCollection.forEach(function (item) {
                    item.checked = false;
                    item.disabled = true;
                });
                
                paymentId = undefined;
                
                var target = e.target;
                while(target != orderDelivery) {
                    if (target.tagName == 'INPUT') {
                        deliveryId = target.value;
                        payment.forEach(function (item, j) {
                            for (var i = 0; i < item.availableFor.length; i++) {
                                if (item.availableFor[i] == deliveryId) {
                                    paymentCollection[j].disabled = false;
                                }
                            }
                        });
                        
                        deliveryMass.forEach(function (item) {
                            if (item.id == deliveryId) {
                                if (item.needAdress) {
                                    orderHide.style.display = 'block';
                                } else {
                                    orderHide.style.display = 'none';
                                }
                                    
                                orderPrice.textContent = priceOrder + item.price;
                            }
                        });
                    }
                    target = target.parentNode;
                }
            }
            
            orderPayment.onclick = function(e) {
                var target = e.target;
                while(target != orderPayment) {
                    if (target.tagName == 'INPUT') {
                        paymentId = target.value; 
                    }
                    target = target.parentNode;
                }
            }
        }
    });
    
    xhr.send(); 
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
        
    var value1 = yourName.value;
    var value2 = phone.value;
    var value3 = email.value;
    var value4 = orderComment.value;
    var value5 = address.value;
        
    var xhr = new XMLHttpRequest();
        
    var json = JSON.stringify({
        manager: "krav4enko@mail.ru",
        book: bookNumber,
        name: value1,
        phone: value2,
        email: value3,
        comment: value4,
        delivery: {
            id: deliveryId,
            address: value5
        },
        payment: {
            id: paymentId,
            currency: bookCurrency
        }
    });
    
    xhr.open('POST', 'https://netology-fbb-store-api.herokuapp.com/order');
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.addEventListener('load', function () {
        if (xhr.status === 400) {
            var error = JSON.parse(xhr.responseText);
            var message = error.message;
            
            if (message.indexOf("name") != -1) {
                yourName.style.borderColor = 'red';
            } else {
                yourName.style.borderColor = 'black';
            }
            
            if (message.indexOf("phone") != -1) {
                phone.style.borderColor = 'red';
            } else {
                phone.style.borderColor = 'black';
            }
            
            if (message.indexOf("email") != -1) {
                email.style.borderColor = 'red';
            } else {
                email.style.borderColor = 'black';
            }
            
            if (message.indexOf("comment") != -1) {
                orderComment.style.borderColor = 'red';
            }   else {
                orderComment.style.borderColor = 'black';
            }          
            
            if (message.indexOf("address") != -1) {
                address.style.borderColor = 'red';
            } else {
                address.style.borderColor = 'black';
            }             
            
            if (message.indexOf("Delivery undefined not found") != -1) {
                alert('вы не указали способ доставки');
            }            
            
            if (message.indexOf("Payment") != -1) {
                alert('вы не указали способ оплаты');
            }
        }
        
        if (xhr.status === 200) {
            yourName.style.borderColor = 'black';
            phone.style.borderColor = 'black';
            email.style.borderColor = 'black';
            orderComment.style.borderColor = 'black';
            address.style.borderColor = 'black';
            
            showOrder.style.display = 'none';
            showOrderSend.style.display = 'block';
        }
    });
    
    xhr.send(json);  
});