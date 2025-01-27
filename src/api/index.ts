export const fetchWeatherData = async (
  { lat, lon }: { lat: number; lon: number },
  unit: string,
) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`,
  );

  return await response.json();
};

export const fetchCitiesByName = async (cityName: string) => {
  const API_KEY = import.meta.env.VITE_CITIES_API_KEY;

  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=${API_KEY}`,
  );

  return await response.json();
};
