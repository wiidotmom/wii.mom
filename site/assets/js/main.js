const LUNAR_MONTH = 29.530588853;

const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzoffset = date.getTimezoneOffset();

  return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
};

const getLunarAge = (date = new Date()) => {
  const percent = getLunarAgePercent(date);
  const age = percent * LUNAR_MONTH;
  return age;
};

const getLunarAgePercent = (date = new Date()) => {
  const normalize = value => {
    value = value - Math.floor(value);
    if (value < 0) {
      value = value + 1;
    }
    return value;
  };

  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
};

const getLunarPhase = (date = new Date()) => {
  const age = getLunarAge(date);
  if (age < 1.84566) {
    return "New";
  } else if (age < 5.53699) {
    return "Waxing Crescent";
  } else if (age < 9.22831) {
    return "First Quarter";
  } else if (age < 12.91963) {
    return "Waxing Gibbous";
  } else if (age < 16.61096) {
    return "Full";
  } else if (age < 20.30228) {
    return "Waning Gibbous";
  } else if (age < 23.99361) {
    return "Last Quarter";
  } else if (age < 27.68493) {
    return "Waning Crescent";
  }
  return "New";
};

const getOffsetFromLunarPhase = (phase) => {
  switch (phase) {
    case "New": {
      return "-12px -44px";
    }
    case "Waxing Crescent": {
      return "-44px -44px";
    }
    case "First Quarter": {
      return "-76px -44px";
    }
    case "Waxing Gibbous": {
      return "-108px -44px";
    }
    case "Waning Gibbous": {
      return "-44px -12px";
    }
    case "Last Quarter": {
      return "-76px -12px";
    }
    case "Waning Crescent": {
      return "-108px -12px";
    }
    default: { // Full
      return "-12px -12px";
    }
  }
};

const moonElement = document.getElementById("today-moon-phase");
moonElement.style.objectPosition = getOffsetFromLunarPhase(getLunarPhase());
moonElement.title = getLunarPhase();

const dateElement = document.getElementById("today-date");
dateElement.textContent = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
});
