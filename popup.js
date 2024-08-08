document.addEventListener("DOMContentLoaded", function () {
  const numberInput = document.getElementById("number-input");
  const increaseButton = document.getElementById("increase");
  const decreaseButton = document.getElementById("decrease");
  const submitButton = document.getElementById("submit");

  const savedValue = localStorage.getItem("numberInputValue");
  let winner = parseInt(savedValue) ?? 1;
  numberInput.value = parseInt(savedValue) ?? 1;

  numberInput.focus();
  numberInput.select();

  const saveValue = () => {
    winner = parseInt(numberInput.value);
    localStorage.setItem("numberInputValue", numberInput.value);
  };

  increaseButton.addEventListener("click", function () {
    numberInput.value = parseInt(numberInput.value) + 1;
    saveValue();
  });

  decreaseButton.addEventListener("click", function () {
    numberInput.value = parseInt(numberInput.value) - 1;
    saveValue();
  });

  numberInput.addEventListener("input", saveValue);

  submitButton.addEventListener("click", function () {
    saveValue();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "overrideWinner", winner: winner },
        (response) => {
          window.close();
        }
      );
    });
  });
});
