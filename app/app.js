import imagesDataImport from './images.js';

const sliderArrowLeft = document.querySelector('.slider__arrow--left'); 
const sliderArrowRight = document.querySelector('.slider__arrow--right');
const slider = document.querySelector('.slider__inner');
const dotsHolder = document.querySelector('.slider__dots');
const burgerButton = document.querySelector('.burger-menu');

const sliderItemsLength = imagesDataImport.imagePaths.length - 1
let singleSliderItemWidth = 0
let slideIndex = 0

sliderArrowLeft.addEventListener('click', moveSliderLeft);
sliderArrowRight.addEventListener('click', moveSliderRight);
burgerButton.addEventListener('click', toggleMenuVisibility);

function checkActiveDot(dotIndex) {
  slideIndex = dotIndex
  calculateLeftPosition()
  calculateDotVisibility()
}

function moveSliderLeft() {
  if (slideIndex === 0) {
    slideIndex = sliderItemsLength
  } else {
    slideIndex--
  }
  calculateLeftPosition()
  calculateDotVisibility()
};

function moveSliderRight() {
  if (slideIndex === sliderItemsLength) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  calculateLeftPosition() 
  calculateDotVisibility()
};

function calculateLeftPosition() {
  slider.style.left = -(slideIndex * singleSliderItemWidth) + 'px'
}

function calculateDotVisibility() {
  const dots = document.querySelectorAll('.slider__dot')
  dots.forEach(dot => {
    dot.classList.remove('slider__dot--active')
  })
  const selectedDot = dots[slideIndex]
  selectedDot.classList.add('slider__dot--active')
}

function createSliderImages() {
  const imagePaths = imagesDataImport.imagePaths
  for (let index = 0; index < imagePaths.length; index++) {
    createImageElement(imagePaths[index])
  }
  const sliderItems = document.querySelectorAll('.slider__image')
  singleSliderItemWidth = sliderItems[0].offsetWidth
}

function createImageElement(path) {
  const imageElementHolder = document.createElement('div')
  const imageElement = document.createElement('img')
  imageElement.setAttribute('src', path)
  imageElement.setAttribute('alt', 'Slider image')
  imageElementHolder.classList.add('slider__image')

  imageElementHolder.appendChild(imageElement)
  slider.appendChild(imageElementHolder)
}

function createSliderDots() {
  const dotsAmmount = imagesDataImport.imagePaths.length
  for (let index = 0; index < dotsAmmount; index++) {
    createDot(index)
  }
}

function createDot(index) {
  const dot = document.createElement('div')
  dot.classList.add('slider__dot')
  dot.addEventListener('click', () => {
    checkActiveDot(index)
  })
  dotsHolder.appendChild(dot)
}

function toggleMenuVisibility() {
  const menuElement = document.querySelector('.mobile__menu');
  menuElement.classList.toggle('mobile__menu--active');
  burgerButton.classList.toggle('active');
}

createSliderImages()
createSliderDots()
calculateDotVisibility()

