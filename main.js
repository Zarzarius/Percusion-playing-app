function removeTransition(evt) {
  if (!evt.target.classList.contains("key")) {
    return;
  }

  if (evt.propertyName !== "transform") {
    return;
  }

  evt.target.classList.remove("key--playing");
}

const compareKeyCodes = (keyCode) => (elem) => +elem.dataset.key === +keyCode;

function playSound(keyCode) {
  const findElemByKeyCode = compareKeyCodes(keyCode);

  const sound = Array.from(document.querySelectorAll(".sound")).find(
    findElemByKeyCode
  );

  if (!sound) {
    return;
  }

  const key = Array.from(document.querySelectorAll(".key")).find(
    findElemByKeyCode
  );

  key.classList.add("key--playing");

  sound.currentTime = 0; // rewind to the start
  sound.play();
}

const keys = document.querySelector(".keys");

keys.addEventListener("click", function onClickPlaySound(evt) {
  const key = evt.target.closest(".key");

  if (!key) {
    return;
  }

  playSound(key.dataset.key);
});

// Because the 'transitionend' event is bubbling
// we can delegate handling it to the keys' parent
keys.addEventListener("transitionend", removeTransition);

window.addEventListener("keydown", function onKeyDownPlaySound(evt) {
  const evtKeyCode = evt.keyCode || evt.which;

  if (evtKeyCode === 32) {
    if (document.activeElement.classList.contains(".key")) {
      return playSound(document.activeElement.dataset.key);
    }
  }

  playSound(evtKeyCode);
});
