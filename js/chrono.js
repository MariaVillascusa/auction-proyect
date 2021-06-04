const DATE = new Date("06/21/2021 0:01 AM");
const DAYS = document.getElementById("days");
const HOURS = document.getElementById("hours");
const MINUTES = document.getElementById("minutes");
const SECONDS = document.getElementById("seconds");
const MILLISECONDS_OF_A_SECOND = 1000;
const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;


const updateCountdown = function(DATETIME) {
    const NOW = new Date();
    const DURATION = DATE - NOW;
    
    const RESULT_DAYS = Math.floor(DURATION / MILLISECONDS_OF_A_DAY);
    const RESULT_HOURS = Math.floor(
      (DURATION % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR
    );
    const RESULT_MINUTES = Math.floor(
      (DURATION % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE
    );
    const RESULT_SECONDS = Math.floor(
      (DURATION % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND
    );
  
    DAYS.textContent = RESULT_DAYS;
    HOURS.textContent = RESULT_HOURS;
    MINUTES.textContent = RESULT_MINUTES;
    SECONDS.textContent = RESULT_SECONDS;
    return DAYS
  }

  export {updateCountdown, MILLISECONDS_OF_A_SECOND};