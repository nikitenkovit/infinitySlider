// убирает фокус при клике на элемент. Фокус с клавиатуры остаётся доступным

export const setOnClickBlur = () => {
  const selectors = [`a[href]`, `button`];

  document.addEventListener(`click`, (evt) => {
    selectors.forEach((selector) => {
      const clickedElement = evt.target.closest(selector);

      if (clickedElement && clickedElement === document.activeElement) {
        clickedElement.blur();
      }
    });
  });
};
