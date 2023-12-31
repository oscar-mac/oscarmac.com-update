function checkTime(e) {
    return e < 10 ? "0" + e : e;
}

function startTime() {
    const e = new Date();
    const t = e.getHours();
    let n = e.getMinutes();
    let i = e.getSeconds();

    n = checkTime(n);
    i = checkTime(i);

    document.querySelector("#clock").innerHTML = `${t}:${n}:${i}`;

    setTimeout(startTime, 500);
}

function setTime() {
    const y = 2023; // year
    const m = 8; // month (zero-indexed)
    const d = 26; // day
    const h = 11; // hour (24 hr time)
    const n = 35; // minute
    const updated_at = new Date(y, m, d, h, n, 0);
    const today = new Date();
    const time_since = today - updated_at;

    let time_phrase;
    const hour_ms = 3600000;
    const day_ms = 86400000;
    const week_ms = 1209600000;
    const month_ms = 2628000000;

    if (time_since < hour_ms) time_phrase = "few moments";
    else if (time_since < day_ms) time_phrase = "few hours";
    else if (time_since < day_ms * 2) time_phrase = "day";
    else if (time_since < week_ms) time_phrase = "few days";
    else if (time_since < week_ms * 2) time_phrase = "week";
    else if (time_since < month_ms) time_phrase = "few weeks";
    else if (time_since < month_ms * 2) time_phrase = "month";
    else time_phrase = "months";

    document.querySelector(".last-updated").innerText = `A ${time_phrase} ago`;
}

function setEmailCopy() {
    const el = document.querySelector(".email-copy");

    el.addEventListener("click", function (e) {
        e.preventDefault();

        const text = el.innerText;

        navigator.clipboard.writeText(text).then(
            function () {
                el.innerText = "Email copied!";
            },
            function (err) {
                console.error("Could not copy email.", err);
            }
        );

        setTimeout(function () {
            el.innerText = text;
        }, 2000);
    });
}

function setRandomText(title_element, titles) {
    function getRandomTitle() {
        const current = title_element.innerText;
        let selection = titles[Math.floor(Math.random() * titles.length)];

        while (current === selection) {
            selection = titles[Math.floor(Math.random() * titles.length)];
        }

        return selection;
    }

    title_element.addEventListener("click", function () {
        title_element.innerText = getRandomTitle();
    });
}

function setupRandomText() {
    const jobTitles = [
        "designer",
        "technologist",
        "developer",
        "front-end developer",
        "designer-developer",
    ];

    setRandomText(document.querySelector(".job-title"), jobTitles);
}

let inactiveTimeout;

function showClockContainer() {
    const clockContainer = document.querySelector("#clock-container");
    clockContainer.removeAttribute("style");
}

function hideClockContainer() {
    const clockContainer = document.querySelector("#clock-container");
    setTimeout(() => {
        clockContainer.style.display = "none";
    }, 200);
    resetInactiveTimer();
}

function resetInactiveTimer() {
    clearTimeout(inactiveTimeout);
    inactiveTimeout = setTimeout(showClockContainer, 9000); // 7 seconds (5000 milliseconds)
}

function setupUserActivityListeners() {
    document.addEventListener("mousemove", () => {
        resetInactiveTimer();
        hideClockContainer();
    });

    document.addEventListener("keypress", () => {
        resetInactiveTimer();
        hideClockContainer();
    });

    // Initial setup to start the inactivity timer
    resetInactiveTimer();
}

(function run() {
    setEmailCopy();
    setupRandomText();
    setTime();
    startTime();
    setupUserActivityListeners();
})();

$(document).ready(function() {
  // Check if the device supports hover using touch detection
  var isHoverSupported = !('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

  if (isHoverSupported) {
    // When hovering over a .li-item
    $(".li-item").hover(function() {
      // Get the value of the data-img attribute
      var imgSrc = $(this).data("img");
      // Set the src attribute of the hover-image element
      $("#hover-image").attr("src", imgSrc);
      // Show the hover-image element
      $("#hover-image").show();
    }, function() {
      // When the mouse leaves the .li-item, hide the hover-image
      $("#hover-image").hide();
    });

    // Move the hover-image with the cursor
    $(".li-item").mousemove(function(event) {
      // Calculate the position for the hover-image
      var x = event.pageX + 20;
      var y = event.pageY;
      // Set the position of the hover-image
      $("#hover-image").css({ top: y, left: x });
    });
  }
});
  
