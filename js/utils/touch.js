export const touchStart = (startEvent, sliderList, callbackNext, callbackPrev) => {
  let startX = startEvent.changedTouches[0].clientX;

  const touchMove = (moveEvent) => {
    let shiftX = startX - moveEvent.changedTouches[0].clientX;

    if (shiftX > 0) {
      callbackNext();
      sliderList.removeEventListener(`touchmove`, touchMove);
    } else if (shiftX < 0) {
      callbackPrev();
      sliderList.removeEventListener(`touchmove`, touchMove);
    }
  };

  const touchEnd = () => {
    sliderList.removeEventListener(`touchmove`, touchMove);
    sliderList.removeEventListener(`touchend`, touchEnd);
  };

  sliderList.addEventListener(`touchmove`, touchMove);
  sliderList.addEventListener(`touchend`, touchEnd);
};
