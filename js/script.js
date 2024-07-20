const getTime = () => {
  const date = new Date();
  return {
    minute: date.getMinutes(),
    second: date.getSeconds(),
    hour: date.getHours(),
  };
};

const addZero = (number) => (number < 10 ? `0${number}` : number);

const calculateAngles = ({ minute, second, hour }) => {
  const secondAngle = (360 / 60) * second;
  const minuteAngle = (360 / 60) * minute + (6 / 360) * secondAngle;
  const hourAngle =
    (360 / 12) * (hour > 12 ? hour - 12 : hour) + (30 / 360) * minuteAngle;

  return {
    secondAngle,
    minuteAngle,
    hourAngle,
  };
};

const updateClockHands = ({ secondAngle, minuteAngle, hourAngle }) => {
  const secondNeedle = document.querySelector(".second");
  const minuteNeedle = document.querySelector(".minute");
  const hourNeedle = document.querySelector(".hour");

  if (secondNeedle) secondNeedle.style.transform = `rotate(${secondAngle}deg)`;
  if (minuteNeedle) minuteNeedle.style.transform = `rotate(${minuteAngle}deg)`;
  if (hourNeedle) hourNeedle.style.transform = `rotate(${hourAngle}deg)`;
};

const updateDigitalClock = ({ hour, minute, second }) => {
  const digitalClock = document.querySelector(".digital");

  if (digitalClock) {
    const formattedHour = hour > 12 ? addZero(hour - 12) : addZero(hour);
    const period = hour >= 12 ? " PM" : " AM";
    digitalClock.innerHTML = `${formattedHour}:${addZero(minute)}:${addZero(
      second
    )}${period}`;
  }
};

const updateTime = () => {
  const currentTime = getTime();
  const angles = calculateAngles(currentTime);

  updateClockHands(angles);
  updateDigitalClock(currentTime);
};

setInterval(updateTime, 1000);
