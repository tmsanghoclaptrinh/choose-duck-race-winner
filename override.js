(function () {
  const SELECTED_WINNER_NUMBER = localStorage.getItem("tms-winner");
  const outputColor = "color:yellow; font-size:14px; font-weight: bold;";
  console.log(
    `%c Patched by @tmsanghoclaptrinh - Winner's number is: ${SELECTED_WINNER_NUMBER}`,
    outputColor
  );
  let iframe = document.querySelector('iframe[src*="duck-race"]');

  [window, iframe?.contentWindow]
    .filter((_) => _)
    .forEach((win) => {
      if (!win.ufs_duckRace_originalShuffle)
        win.ufs_duckRace_originalShuffle = win.Array.prototype.shuffle;

      win.Array.prototype.shuffle = function () {
        const result = win.ufs_duckRace_originalShuffle.apply(this, arguments);
        let targetIndex = result.findIndex(
          (i) =>
            i?.name === SELECTED_WINNER_NUMBER ||
            i?.number == SELECTED_WINNER_NUMBER
        );

        if (targetIndex >= 0) {
          let temp = result[0];
          result[0] = result[targetIndex];
          result[targetIndex] = temp;
        }
        return result;
      };
    });
})();
