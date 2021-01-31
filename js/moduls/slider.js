import {debounce} from "../utils/debounce.js";
import {touchStart} from "../utils/touch.js";
import {
  AMOUNT_OF_ELEMENTS_TO_SLIDE,
  BUTTON_DEBOUNCE_INTERVAL,
  DEFAULT_TRANSITION,
  DIRECTION,
  POSITION
} from "../consts.js";

export class Slider {
  constructor(root) {
    this._slider = root;
    this._sliderWrapper = this._slider.querySelector(`.slider__wrapper`);
    this._sliderList = this._slider.querySelector(`.slider__list`);
    this._sliderItem = this._slider.querySelector(`.slider__item`);
    this._sliderNextButton = this._slider.querySelector(`.slider__button--next`);
    this._sliderPrevButton = this._slider.querySelector(`.slider__button--prev`);

    this._isMoved = false;
    this._sliderDirection = DIRECTION.RIGHT;
    this._sliderCildren = this._sliderList.children;
    this._sliderStep = this._sliderItem.offsetWidth * AMOUNT_OF_ELEMENTS_TO_SLIDE;

    this._setNextButtonClickHandler = this._setNextButtonClickHandler.bind(this);
    this._setPrevButtonClickHandler = this._setPrevButtonClickHandler.bind(this);

    this._moveNext = this._moveNext.bind(this);
    this._movePrev = this._movePrev.bind(this);
  }

  init() {
    this._setNextButtonClickHandler();
    this._setPrevButtonClickHandler();

    this._setTransitionStartHandler();
    this._setTransitionEndHandler();

    this._setTouchStartHandler();
  }

  _getTranslate(tx = 0, ty = 0, tz = 0) {
    return `translate3d(${tx}px, ${ty}px, ${tz}px)`;
  }

  _setTransform(direction) {
    this._sliderList.style.transform = this._getTranslate(direction * this._sliderStep);
  }

  _replaceItems(place) {
    const arrayItems = [...this._sliderCildren];

    const firstGroup = arrayItems.slice(0, AMOUNT_OF_ELEMENTS_TO_SLIDE);
    const lastGroup = arrayItems.slice(arrayItems.length - AMOUNT_OF_ELEMENTS_TO_SLIDE);

    const fragment = document.createDocumentFragment();

    if (place === POSITION.START) {
      lastGroup.forEach((elem) => fragment.appendChild(elem));
      this._sliderList.prepend(fragment);
    }
    if (place === POSITION.END) {
      firstGroup.forEach((elem) => fragment.appendChild(elem));
      this._sliderList.append(fragment);
    }
  }

  _moveNext() {
    if (this._sliderDirection === DIRECTION.LEFT) {
      this._sliderDirection = DIRECTION.RIGHT;
      this._replaceItems(POSITION.START);
    }

    this._sliderWrapper.style.justifyContent = `flex-start`;
    this._sliderList.style.justifyContent = `flex-start`;

    this._setTransform(this._sliderDirection);
  }

  _movePrev() {
    if (this._sliderDirection === DIRECTION.RIGHT) {
      this._sliderDirection = DIRECTION.LEFT;
      this._replaceItems(POSITION.END);
    }

    this._sliderWrapper.style.justifyContent = `flex-end`;
    this._sliderList.style.justifyContent = `flex-end`;

    this._setTransform(this._sliderDirection);
  }

  _setNextButtonClickHandler() {
    this._sliderNextButton.addEventListener(`click`, debounce(
        this._moveNext, BUTTON_DEBOUNCE_INTERVAL));
  }

  _setPrevButtonClickHandler() {
    this._sliderPrevButton.addEventListener(`click`, debounce(
        this._movePrev, BUTTON_DEBOUNCE_INTERVAL));
  }

  _setTransitionStartHandler() {
    this._sliderList.addEventListener(`transitionstart`, (evt) => {
      if (evt.target === this._sliderList) {
        this._slider.classList.add(`slider--in-move`);
      }
    });
  }

  _resetToDefault() {
    this._replaceItems(this._sliderDirection === DIRECTION.LEFT
      ? POSITION.START
      : POSITION.END);

    this._slider.classList.remove(`slider--in-move`);
    this._sliderList.style.transition = `none`;
    this._setTransform(0);
    setTimeout(() => {
      this._sliderList.style.transition = DEFAULT_TRANSITION;
      this._isMoved = false;
    });
  }

  _setTransitionEndHandler() {
    this._sliderList.addEventListener(`transitionend`, (evt) => {
      if (evt.target === this._sliderList) {
        this._resetToDefault();
      }
    });
  }

  _setTouchStartHandler() {
    this._sliderList.addEventListener(`touchstart`, (evt) => {
      if (!this._isMoved) {
        debounce(
            touchStart(evt, this._sliderList,
                this._moveNext, this._movePrev), BUTTON_DEBOUNCE_INTERVAL);

        this._isMoved = true;
      }
    });
  }
}
