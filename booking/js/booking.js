document.addEventListener('DOMContentLoaded', () => {
  const areaSelect = document.getElementById('area');
  const citySelect = document.getElementById('city-select');
  const streetSelect = document.getElementById('street-select');

  const regions = {
    kyiv: {
      cities: ['Київ', 'Біла Церква', 'Бровари'],
      streets: {
        Київ: ['Хрещатик', 'Володимирська', 'Грушевського'],
        'Біла Церква': ['Ярослава Мудрого', 'Леваневського', 'Небесної Сотні'],
        Бровари: ['Київська', 'Гагаріна', 'Шевченка']
      }
    },
    'kyiv-city': {
      cities: ['Київ'],
      streets: {
        Київ: ['Хрещатик', 'Володимирська', 'Грушевського']
      }
    },
    vinnytsia: {
      cities: ['Вінниця', 'Жмеринка', 'Могилів-Подільський'],
      streets: {
        Вінниця: ['Соборна', 'Келецька', 'Київська'],
        Жмеринка: ['Вокзальна', 'Грушевського', 'Леніна'],
        'Могилів-Подільський': ['Привокзальна', 'Леніна', 'Шевченка']
      }
    },
    volyn: {
      cities: ['Луцьк', 'Ковель', 'Нововолинськ'],
      streets: {
        Луцьк: ['Лесі Українки', 'Волі', 'Грушевського'],
        Ковель: ['Волі', 'Шевченка', 'Незалежності'],
        Нововолинськ: ['Миру', 'Гагаріна', 'Шахтарська']
      }
    },
    dnipropetrovsk: {
      cities: ['Дніпро', 'Кривий Ріг', 'Кам’янське'],
      streets: {
        Дніпро: ['Січеславська Набережна', 'Короленка', 'Глінки'],
        'Кривий Ріг': ['Героїв АТО', 'Гагаріна', 'Проспект Поштовий'],
        "Кам'янське": ['Центральна', 'Шевченка', 'Леніна']
      }
    },
    donetsk: {
      cities: ['Донецьк', 'Маріуполь', 'Краматорськ'],
      streets: {
        Донецьк: ['Артема', 'Університетська', 'Проспект Ілліча'],
        Маріуполь: ['Леніна', 'Гагаріна', 'Миру'],
        Краматорськ: ['Миру', 'Шевченка', 'Паркова']
      }
    },
    zhytomyr: {
      cities: ['Житомир', 'Бердичів', 'Коростень'],
      streets: {
        Житомир: ['Велика Бердичівська', 'Київська', 'Перемоги'],
        Бердичів: ['Житомирська', 'Леніна', 'Шевченка'],
        Коростень: ['Миру', 'Гагаріна', 'Леніна']
      }
    },
    zakarpattia: {
      cities: ['Ужгород', 'Мукачево', 'Хуст'],
      streets: {
        Ужгород: ['Корзо', 'Грушевського', 'Капушанська'],
        Мукачево: ['Пушкіна', 'Леніна', 'Миру'],
        Хуст: ['Карпатська', 'Шевченка', 'Гагаріна']
      }
    },
    zaporizhia: {
      cities: ['Запоріжжя', 'Мелітополь', 'Бердянськ'],
      streets: {
        Запоріжжя: ['Соборна', 'Перемоги', 'Леніна'],
        Мелітополь: ['Гоголя', 'Інтеркультурна', 'Миру'],
        Бердянськ: ['Леніна', 'Шевченка', 'Морська']
      }
    },
    'ivano-frankivsk': {
      cities: ['Івано-Франківськ', 'Калуш', 'Коломия'],
      streets: {
        'Івано-Франківськ': ['Незалежності', 'Грушевського', 'Мазепи'],
        Калуш: ['Бандери', 'Леніна', 'Шевченка'],
        Коломия: ['Театральна', 'Миру', 'Гагаріна']
      }
    },
  };

  function populateSelect(select, options, defaultOption = 'Оберіть') {
    select.innerHTML = `<option value="">${defaultOption}</option>`;
    options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
    });
  }

  function updateCities() {
    const selectedArea = areaSelect.value;
    citySelect.innerHTML = '<option value="">Оберіть місто</option>';
    streetSelect.innerHTML = '<option value="">Оберіть вулицю</option>';

    if (regions[selectedArea]) {
      populateSelect(citySelect, regions[selectedArea].cities);
    }
  }

  function updateStreets() {
    const selectedArea = areaSelect.value;
    const selectedCity = citySelect.value;
    streetSelect.innerHTML = '<option value="">Оберіть вулицю</option>';

    if (regions[selectedArea] && regions[selectedArea].streets[selectedCity]) {
      populateSelect(streetSelect, regions[selectedArea].streets[selectedCity]);
    }
  }

  areaSelect.addEventListener('change', updateCities);
  citySelect.addEventListener('change', updateStreets);
  updateCities();
});