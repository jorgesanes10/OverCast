export const getPreferredUnitOfMeasurement = () => {
  const imperialLanguages = ['en-US', 'en-LR', 'my-MM', 'en-MM'];

  return imperialLanguages.includes(window.navigator.language)
    ? 'imperial'
    : 'metric';
};

export const convertUTCToLocalTime = (utc: number, timezoneOffset: number) => {
  const localSunriseTime = new Date(utc * 1000 - timezoneOffset);

  return localSunriseTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }); // Format as HH:mm
};
