//Дождёмся загрузки API и готовности DOM.
  ymaps.ready(init);

  function init() {
      let result = document.getElementById('result'), // для отладки

          // в этой версии координаты просто элементы массива (и они поменяны местами)
          destinations = {
              'moscow': [55.75219030232976,37.59601762897489],
              'ryazan': [54.626480, 39.742375],
          },

          // Создание экземпляра карты и его привязка к контейнеру с
          // заданным id ("map").
          myMap = new ymaps.Map('map', {
              // При инициализации карты обязательно нужно указать
              // её центр и коэффициент масштабирования.
              center: destinations['moscow'], // Москва
              zoom: 17
          });

          let placemark = new ymaps.Placemark(destinations[['moscow']], {}, {
              iconLayout: 'default#image',
              iconImageHref: './img/map-mark.svg',
              iconImageSize: [124, 124],
              iconImageOffset: [-59, -44]
          });
          myMap.geoObjects.add(placemark);




          myMap.controls.remove('geolocationControl'); // удаляем геолокацию
          myMap.controls.remove('searchControl'); // удаляем поиск
          myMap.controls.remove('trafficControl'); // удаляем контроль трафика
          myMap.controls.remove('typeSelector'); // удаляем тип
          myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
          myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
          myMap.controls.remove('rulerControl'); // удаляем контрол правил
          //myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

      // все ок
      // result.textContent = 'map init:';

      // куда скакать
      function clickGoto() {

          // город
          let pos = this.getAttribute('data-goto'); // или this.getAttribute('title')
          // result.textContent = pos;

          // переходим по координатам
          myMap.panTo(destinations[pos], {
              flying: 1
          });

          if(pos != 'moscow') {
              let placemark = new ymaps.Placemark(destinations[[pos]], {}, {
                  iconLayout: 'default#image',
                  iconImageHref: './img/map-mark.svg',
                  iconImageSize: [124, 124],
                  iconImageOffset: [-59, -44]
              });
              myMap.geoObjects.add(placemark);
          }




          return false;
      }

      // навешиваем обработчики
      let col = document.getElementsByClassName('goto');
      for (let i = 0, n = col.length; i < n; ++i) {
          col[i].onclick = clickGoto;

          // result.textContent = result.textContent + ' ' + i;
      }
  }

function activeLinkMap() {
    $('.contacts__link').on('click', function() {
        $('.contacts__link').removeClass('active');
        $(this).addClass('active');
    })
};
activeLinkMap();
