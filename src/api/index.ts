export const fetchWeatherData = async (cityName: string, unit: string) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`,
  );

  return await response.json();
};
