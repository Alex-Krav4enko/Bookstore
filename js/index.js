var logo = document.querySelector('.logo');
var footerImg = document.querySelector('.footer__img');
var spaceNumber = document.querySelector('.spaceNumber');
var showIndex = document.querySelector('.body__show3');
var showAbout = document.querySelector('.body__show1');
var showBook = document.querySelector('.body__show2');
var showOrder = document.querySelector('.body__show4');
var showOrderSend = document.querySelector('.body__show5');
var bookListWrapp = document.querySelector('.bookList__wrapp');
var bookListButton = document.querySelector('.bookList__button');
var bookElem = document.querySelector('.book__elem');
var bookTextElem = document.querySelector('.bookText');
var commentsElem1 = document.querySelector('.comments_1');
var commentsElem2 = document.querySelector('.comments_2');
var button = document.querySelector('.button');
var orderImg = document.querySelector('.order__img');
var orderTitleMark = document.querySelector('.order__title_mark');
var orderPrice = document.querySelector('.order__price');
var orderComment = document.querySelector('.orderComment');
var orderPayment = document.querySelector('.order__payment');
var orderDelivery = document.querySelector('.order__delivery');
var form = document.querySelector('.order__form');
var orderHide = document.querySelector('.order__hide');
var yourName = document.querySelector('.name');
var phone = document.querySelector('.phone');
var email = document.querySelector('.email');
var address = document.querySelector('.address');
var eye = document.querySelector('.eye');
var eyePupil = document.querySelector('.eye__pupil');

var bookNumber;
var bookCurrency;
var deliveryId;
var paymentId;
var deliveryMass;
var priceOrder;

logo.onclick = goToIndex;
footerImg.onclick = goToAbout;

function goToIndex() {
    showIndex.style.display = 'block';
    showAbout.style.display = 'none';
    showBook.style.display = 'none';
    showOrder.style.display = 'none';
    showOrderSend.style.display = 'none';
}

function goToAbout() {
    showIndex.style.display = 'none';
    showAbout.style.display = 'block';
    showBook.style.display = 'none';
    showOrder.style.display = 'none';
    showOrderSend.style.display = 'none';
}

// подключение к серверу
document.addEventListener("DOMContentLoaded", function(event) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://netology-fbb-store-api.herokuapp.com/book');

    xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
            var book = JSON.parse(xhr.responseText);

            var smallCover = [];
            var info = [];
            var bookId = [];

            book.forEach(function (item) {
                smallCover.push(item.cover.small);
                info.push(item.info);
                bookId.push(item.id);
            });

            var newDiv = document.createElement('div');
            newDiv.className = "bookList__item";

            // формирование списка книг
            for (var i = 0; i < 4; i++) {
                var cloneDiv = newDiv.cloneNode(true);

                cloneDiv.innerHTML = '<img class="bookList__img" src="' + smallCover[i] + '" alt="mini book" id="' + bookId[i] + '"><div class="bookList__bookmark bookList__bookmark_green"></div><div class="bookList__text text2">' + info[i] + '</div>';

                bookListWrapp.appendChild(cloneDiv);
            }

            // добавить 4 книги
            bookListButton.onclick = btnClick;

            function btnClick() {
                var plusFour = i + 4;

                for (i; i < plusFour; i++) {
                    if (i < smallCover.length) {
                        var cloneDiv = newDiv.cloneNode(true);

                        cloneDiv.innerHTML = '<img class="bookList__img" src="' + smallCover[i] + '" alt="mini book" id="' + bookId[i] + '"><div class="bookList__bookmark bookList__bookmark_green"></div><div class="bookList__text text2">' + info[i] + '</div>';

                        bookListWrapp.appendChild(cloneDiv);
                    } else {
                       bookListButton.parentNode.removeChild(bookListButton);
                    }
                }
            }

            // формирование книги
            bookListWrapp.onclick = goToBook;

            function goToBook(e) {
                var target = e.target;

                while(target != bookListWrapp) {
                    if (target.tagName == 'IMG') {
                        showIndex.style.display = 'none';
                        showBook.style.display = 'block';
                    }
                    target = target.parentNode;
                }

                book.forEach(function (item) {
                    if (item.id == e.target.id) {
                        bookElem.innerHTML = '<img class="book__img" src="' + item.cover.large + '" alt="book"><div class="book__bookmark"></div>';

                        commentsElem1.innerHTML = '<div class="comments__block"><img class="comments__img" src="' + item.reviews[0].author.pic + '" alt="comment"><div class="comments__text comments__text_arrow text3"><div class="comments__arrow comments__arrow_l"></div>' + item.reviews[0].cite + '<div class="comments__arrow comments__arrow_r"></div></div></div><div class="comments__block"><img class="comments__img" src="' + item.reviews[1].author.pic + '" alt="comment"><div class="comments__text text3">' + item.reviews[1].cite + '</div>';

                        commentsElem2.innerHTML = '<div class="comments__block"><img class="comments__img" src="' + item.features[0].pic + '" alt="comment"><div class="comments__text text3">' + item.features[0].title + '</div></div><div class="comments__block"><img class="comments__img" src="' + item.features[1].pic + '" alt="comment"><div class="comments__text text3">' + item.features[1].title + '</div></div>';

                        bookTextElem.innerHTML = item.description;
                        spaceNumber.textContent = item.price;
                        button.id = item.id;

                        // для заказа
                        bookNumber = item.id;
                        bookCurrency = item.currency;

                        // форматирование числового отображения
                        spaceNumber.textContent = parseInt(spaceNumber.textContent).toLocaleString();
                    }
                });

                // формирование страницы заказа
                button.onclick = goToOrder;

                function goToOrder(e) {
                    var target = e.target;

                    while(target != button) {
                        if (target.tagName == 'SPAN') {
                            target = target.parentNode;
                        }
                    }

                    book.forEach(function (item) {
                        if (item.id == target.id) {
                            orderTitleMark.textContent = item.title;
                            orderPrice.textContent = item.price;
                            orderImg.src = item.cover.large;
                            priceOrder = item.price;
                        }
                    });

                    showBook.style.display = 'none';
                    showOrder.style.display = 'block';

                }

            }

        }

        // глаз
        var coordX;
        var coordY;
        var eyeElem;
        var sizeEye;
        var sizePupil;
        var half;
        var ratioX;
        var ratioY;
        var diff;
        var ugol;
        var diffX;
        var diffY;
        var lineCoordPupX;
        var lineCoordPupY;
        var coordPupX;
        var coordPupY;
        var radius;
        var bottomPage;

        window.onmousemove = function(e) {
            eyeElem = eye.getBoundingClientRect();
            sizeEye = eye.clientWidth;
            sizePupil = eyePupil.offsetWidth;

            half = (sizeEye/2);

            coordX = e.pageX - eyeElem.left - half;
            coordY = e.pageY - eyeElem.top - half - this.scrollY;

            ratioX = (eyeElem.left + half)/(half - sizePupil/2);

            if (coordY < 0) {
                ratioY = (eyeElem.top + half + this.scrollY)/(half - sizePupil/2);
            } else {
                bottomPage = document.body.offsetHeight - eyeElem.top - half - this.scrollY;
                ratioY = (bottomPage)/(half - sizePupil/2);
            }

            coordPupX = coordX / ratioX;
            coordPupY = coordY / ratioY;

            radius = Math.sqrt(Math.pow(coordPupX,2) + Math.pow(coordPupY,2));

            if (radius < (half - sizePupil/2)) {
                eyePupil.style.left = coordPupX + 'px';
                eyePupil.style.top = coordPupY + 'px';

            } else if (radius >= (half - sizePupil/2)) {
                diff = radius - (half - sizePupil/2);
                ugol = Math.sin(coordPupX / radius);

                diffX = diff * Math.cos(ugol);
                diffY = diffX * Math.tan(ugol);

                if (coordPupX > 0) {
                    lineCoordPupX = coordPupX - diffX;
                    lineCoordPupY = coordPupY + diffY;
                } else if (coordPupX <= 0) {
                    lineCoordPupX = coordPupX + diffX;
                    lineCoordPupY = coordPupY - diffY;
                }

                if (coordPupY > 0) {
                    lineCoordPupY = coordPupY - diffY;
                }

                if ((coordPupY > 0) && (coordPupX <= 0)) {
                    lineCoordPupY = coordPupY + diffY;
                }

                eyePupil.style.left = lineCoordPupX + 'px';
                eyePupil.style.top = lineCoordPupY + 'px';
            }
        }
    });

    xhr.send();

});
