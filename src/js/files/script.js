// Подключение функционала "Чертогов Фрилансера"
import {
    isMobile
} from "./functions.js";
// Подключение списка активных модулей
import {
    flsModules
} from "./modules.js";

//========================================================================================================================================================


//========================================================================================================================================================

// Подменю

const menuLinks = document.querySelectorAll('.menu__item.menu-item-has-children');

if (menuLinks.length) {
    menuLinks.forEach(link => {
        if (window.innerWidth > 1709) {
            link.addEventListener('mouseover', () => {
                link.classList.add('_hover');
            })
            link.addEventListener('mouseout', () => {
                link.classList.remove('_hover');
                setTimeout(() => {

                }, 2000);
            })
        } else {
            link.addEventListener('click', (e) => {
                const subLiElements = link.querySelectorAll('.sub-menu>li');
                if (e.target.parentElement.classList.contains('_parent')) {
                    link.classList.toggle('_hover')

                    if (subLiElements.length) {
                        subLiElements.forEach(sublink => {
                            sublink.addEventListener('click', (e) => {
                                e.target.classList.contains('menu-item-has-children') ? sublink.classList.toggle('_hover') : null;
                            });
                        })
                    }
                }
            })
        }
    })
}

//========================================================================================================================================================

// Переключение окон попап окон

const popupClose = document.querySelectorAll('.popup__close');

if (popupClose.length) {
    popupClose.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.remove('lock');
        })
    })
}
/* 
const popupForms = document.querySelectorAll('.popup .form');

if (popupForms.length) {
    popupForms.forEach(form => {
        let buttonNext = form.querySelector('.button_next');
        let formFields = form.querySelector('.form__fields');
        let confirmationForm = form.querySelector('.confirmation-form');
        let formInputs = form.querySelectorAll('[data-required]');
        let formErrorField = form.querySelector('.form__errored');
        if (buttonNext) {
            buttonNext.addEventListener('click', () => {
                formInputs.forEach(inp => {
                    if (inp.value != '') {
                        formFields.style.display = 'none';
                        confirmationForm.style.display = 'block';
                    } else {
                        formErrorField.classList.add('show');
                    }
                })
            })
        }
    })
} */

//========================================================================================================================================================

// Передаем в форму завки выбранную услугу

const serviceOrderBtns = document.querySelectorAll('button[data-service-title]');
const serviceOrderInput = document.querySelector('input[name=entry-service]');

if (serviceOrderBtns.length) {
    serviceOrderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            serviceOrderInput.value = btn.dataset.serviceTitle
            console.log('serviceTitle: ', serviceTitle);
        })
    })
}

//========================================================================================================================================================

// Карта и всё что с ней связано

const mapPathes = document.querySelectorAll('.map__image [data-num-place]'),
    contactPlaces = document.querySelectorAll('[data-place-num]'),
    serviceMapList = document.querySelectorAll('.services-map__list'),
    mapPlaces = document.querySelectorAll('.select__option'),
    mapSearch = document.querySelector('.select__input'),
    selOptions = document.querySelector('.select__options'),
    selTitle = document.querySelector('.select__title');

if (mapPathes.length) {

    selTitle.addEventListener('click', () => {
        selOptions.removeAttribute('hidden');
    })

    mapPathes.forEach(path => {
        path.addEventListener('click', () => {
            document.querySelector('.select__value input').placeholder = 'Введите адрес населенного пункта';
            mapPathes.forEach(path => path.classList.remove('_active'));
            path.classList.add('_active')
            contactPlaces.forEach(place => place.classList.remove('_show'));
            contactPlaces[path.dataset.numPlace - 1].classList.add('_show');
            serviceMapList.forEach(place => place.classList.remove('_show'));
            serviceMapList[path.dataset.numPlace - 1].classList.add('_show');
        })

    })

    function mapSearchPlace() {
        mapPlaces.forEach(place => {
            let text = place.innerHTML;
            text.toLowerCase().includes(mapSearch.value.toLowerCase()) ? place.style.display = 'block' : place.style.display = 'none';
        })
    }


    mapPlaces.forEach(place => {
        place.addEventListener('click', () => {
            selOptions.setAttribute('hidden', true);
            let country = place.dataset.numPlace;

            contactPlaces.forEach(place => place.classList.remove('_show'));
            serviceMapList.forEach(place => place.classList.remove('_show'));
            contactPlaces[country - 1].classList.add('_show');
            serviceMapList[country - 1].classList.add('_show');

            mapPathes.forEach(path => {
                path.dataset.numPlace == country ? path.classList.add('_active') : path.classList.remove('_active');
            })
        })
    })

    mapSearch.addEventListener('input', mapSearchPlace);

    document.addEventListener('click', () => {
        mapPlaces.forEach(place => place.style.display = 'block');
    })
}

//========================================================================================================================================================


document.addEventListener( 'wpcf7submit', function( event ) {
    flsModules.popup.close('#service');
    flsModules.popup.close('#service-page');
    flsModules.popup.close('#ads');
    flsModules.popup.open('#success');
}, false );