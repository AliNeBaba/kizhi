let isSeason;
let counterSelectedItems;
let needItems = new Array();
let persone;

//Календарь
function calendar() {
    let calendarImage = document.getElementById('calendar');
    let stepDuration = 1;
    let stepOffset = 70;
    let showHolidays = document.getElementsByClassName('holidays');
    let holidayName;
    let infoHolidays = document.getElementsByClassName('info-holidays');
    let holidayInfo;
    let indexHoliday = 0;
    let indexArrow = 0;

    // Карта календаря в формате [сезон с весны, время, сдвиг]
    // Четные позиции начиная с [0] связаны с показом праздников
    let stepsCalendar = [
        [1, 6, 4],//Пасха
        [1, 5, 10],
        [1, 6, 4],//Благовещение
        [1, 11, 22],
        [1, 6, 4],//Егорий Вешний
        [1, 4, 8],
        [1, 6, 4],//Никола
        [1, 3, 7],
        [1, 6, 4],//Алена
        [1, 3, 6],
        [1, 6, 4],//Еремей Распрягальник
        [2, 8, 17],
        [2, 6, 4],//Петров день
        [2, 8, 16],
        [2, 6, 4],//Ильин день
        [2, 6, 13],
        [3, 6, 4],//Спас
        [3, 1, 2],
        [3, 6, 4],//Успение
        [3, 14, 28],
        [3, 6, 4],//Сдвижение
        [4, 6, 13],
        [4, 6, 4],//Покров
        [4, 14, 28],
        [4, 6, 4],//Михайлов день
        [4, 1, 3],
        [4, 6, 4],//Филиппов день
        [4, 28, 46],
        [4, 6, 4],//Рождество
        [4, 4, 8],
        [4, 6, 4],//Крещение
        [4, 18, 39],
        [4, 10, 10],//Масленица
        [4, 10, 20],
    ];

    // Функции календаря
    function showInfoHoliday() {
        calendarImage.removeEventListener('transitionend', step);
        holidayInfo.style.display = 'block';
        holidayInfo.addEventListener('click', function() {
            holidayInfo.style.display = '';
            step();
            calendarImage.addEventListener('transitionend', step);
        });
    }
    function step() {
        calendarImage.style.transitionDuration = stepDuration+"s";
        calendarImage.style.transform = 'rotate('+stepOffset+'deg)';

        if(indexHoliday == showHolidays.length) {
            holidayName.style.display = '';
            indexArrow = 0;
            indexHoliday = 0;
        };

        if(indexArrow % 2) {
            holidayName = showHolidays[indexHoliday];
            holidayInfo = infoHolidays[indexHoliday];

            ++indexHoliday

            holidayName.style.display = 'block';
            holidayName.addEventListener('click', showInfoHoliday);
        }else if(indexArrow){
            holidayName.style.display = '';
        };

        isSeason = stepsCalendar[indexArrow][0];
        stepDuration = stepsCalendar[indexArrow][1];
        stepOffset += stepsCalendar[indexArrow][2];

        if(isSeason ==  4) {
            document.getElementById('main-background-image').src = 'media/imgs/main-winter.png';
        }else{
            document.getElementById('main-background-image').src = 'media/imgs/main-summer.png';
        };
        
        ++indexArrow;
    };
    step();
    calendarImage.addEventListener('transitionend', step);
};

//Игровое поле
function selectPersone(per) {
    persone = per;
    document.getElementById('interface-'+per).style.display = 'block';
    switch(per) {
        case 'krestyanin':
            counterSelectedItems = 7;
            needItems = [// формат: [пердмет, времена года начиная с весны]
                ['soha', 1, 3],
                ['borona', 3, 3],
                ['sevalka', 1, 3],
                ['coporuga', 1],
                ['gorbusha', 2],
                ['vily', 2, 3],
                ['cep', 3, 4]
            ];
            break;
        case 'pryaha':
            counterSelectedItems = 11;
            needItems = [
                ['cudel', 4],
                ['pryalka', 4],
                ['vereteno', 4],
                ['motoguz', 4],
                ['spica', 4],
                ['parus', 3, 4],
                ['gorbusha', 2],
                ['serp', 3],
                ['lodka', 1, 2, 3, 4],
                ['cow', 1],
                ['grabli', 2]
            ];
            break;
        default:
            counterSelectedItems = 7;
            needItems = [
            ['pila', 3, 4],
            ['topor', 3, 4],
            ['rubanok', 3, 4],
            ['stameska', 3, 4],
            ['lodka', 1, 2, 3, 4],
            ['yakor', 1, 2, 3, 4],
            ['vesla', 1, 2, 3, 4]
        ];
    }
};

function select(obj) {
    let flag = false;

    function trueClose() {
        document.getElementById('title-'+obj).style.display = 'none';

        if(persone == 'pryaha' && obj == 'cow'){
            document.getElementById('pryaha-name-lodka-ves').style.display = 'none';
            document.getElementById('pryaha-img-cow').style.display = 'block';
        }else if(persone == 'pryaha' && obj == 'lodka'){
            document.getElementById('pryaha-name-lodka-ves').style.display = 'none';
            document.getElementById('pryaha-img-lodka').style.display = 'block';
        }else{
            document.getElementById(persone+'-name-'+obj).style.display = 'none';
            document.getElementById(persone+'-img-'+obj).style.display = 'block';
        };
        
        document.getElementById('img-'+obj).style.display = 'none';
        document.getElementById('star-'+obj).style.display = 'none';
    };

    function falseClose() {
        document.getElementById('title-'+obj).style.display = 'none';
        document.getElementById('title-'+obj).style.animationName = '';
    }

    for(let i = 0; i<needItems.length;++i) {
        if(obj == needItems[i][0]) {
            for(let j = 0; j < needItems[i].length;++j) {
                if(isSeason == needItems[i][j]) {
                    flag = true;
                    break;
                }else{continue};
            }
        }else if(flag) {
            break;
        }else{continue};
    };

    document.getElementById('title-'+obj).style.display = 'block';
    document.getElementById('title-'+obj).style.animationName = 'background-'+flag;

    if(flag) {
        document.getElementById('title-'+obj).addEventListener('click', function() {
            trueClose();
            --counterSelectedItems;
            if(!counterSelectedItems) {
                exitWhenDone();
            };
        });
    }else{
        document.getElementById('title-'+obj).addEventListener('click', falseClose);
    };
};

//Звуки
function soundClick(val) {
    let sound = new Audio;
    sound.src = 'media/sounds/'+val+'.mp3';
    sound.play();
};
// Фоновое воспроизведение музыки включается после первого щелчка на стартовой странице.
document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('background-audio').play();
    document.removeEventListener('click', musicPlay);
};

//Возврат на стартовую страницу
function exitWhenDone() {
    document.getElementById('finish').style.display = 'block';
    document.getElementById('start-message').style.zIndex = '-999';
    document.getElementById('show-start-message').checked = true;
    document.getElementById('hide-wall').checked = false;
    soundClick('wall_swipe');
    setInterval('document.location = location', 6000);
}
function backToStart() {
    document.getElementById('hide-info-krestyanin').checked = true;
    document.getElementById('hide-info-pryaha').checked = true;
    document.getElementById('hide-info-lodochnik').checked = true;
    document.getElementById('show-start-message').checked = false;
    document.getElementById('hide-wall').checked = false;
    soundClick('wall_swipe');
    document.getElementById('start-page').addEventListener('transitionend', function(){document.location = location;});
};
