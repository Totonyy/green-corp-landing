const INCREASE_NUMBER_ANIMATION_SPEED = 60;

function increaseNumberAnimationStep(i, element, endNumber) {
	if (i <= endNumber) {
		if (i === endNumber) {
			element.innerText = i + '+';
		} else {
			element.innerText = i;
		}
		i +=200;

		setTimeout(function () {
			increaseNumberAnimationStep(i, element, endNumber);
		}, INCREASE_NUMBER_ANIMATION_SPEED);
	}
};

function initIncreaseNumberAnimation() {
	const element = document.querySelector(".features__clients-count");
	increaseNumberAnimationStep(0, element, 5000)
};


document.querySelector('#budget').addEventListener('change', function handleSelectChange(event) {
  if (event.target.value === 'other') {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form__group');
    formContainer.classList.add('form__other-input'); // Задание 1
 
    const input = document.createElement('input');
    input.placeholder = "Введите ваш вариант";
    input.type = "text"; // Задание 2
      
    formContainer.appendChild(input);
    document.querySelector('.form form').insertBefore(formContainer, document.querySelector('.form__submit')); // Задание 3
  }
 
  const otherInput = document.querySelector('.form__other-input');
  if (event.target.value !== 'other' && otherInput) { // Задание 5
  document.querySelector('.form form').removeChild(otherInput); // Задание 4
  }
});

let animationInited = false;
function updateScroll() {
  if (window.scrollY > 0) {
    document.querySelector('header').classList.add('header__scrolled');
  } else {
    document.querySelector('header').classList.remove('header__scrolled');
  }

  let windowBottomPosition = window.scrollY + window.innerHeight; //Свойство window.scrollY возвращает позицию скролла, но проблема в том, что эта позиция скролла считается до верхнего угла окна. Нам нужен нижний край окна, поэтому к позиции скролла нужно прибавить высоту окна
  let countElementPosition = document.querySelector('.features__clients-count').offsetTop; //Свойство offsetTop возвращает расстояние от верхней части страницы до элемента

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
};
window.addEventListener('scroll', updateScroll);


//плавный скролл к якорю при клике на кнопку
//не работает =( 
function addSmoothScroll(anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
};
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  addSmoothScroll(anchor);
});

addSmoothScroll(document.querySelector('.more-button')); //возможно, в этом дело

/* добавили внутрь addSmoothScroll

function onLinkClick(event) {
  event.preventDefault(); //предотвратите поведение ссылки по умолчанию, чтобы она не сместила экран к элементу. Воспользуйтесь для этого event.preventDefault
  document.querySelector(event.target.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
  });
};
*/