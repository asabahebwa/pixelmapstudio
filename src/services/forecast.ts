interface Location {
  lat: number;
  lng: number;
}

interface LocationItem {
  key: string;
  location: Location;
}

export const getBulkWeatherData = async (locations: LocationItem[]) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=bulk&days=1&aqi=yes&alerts=no`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locations: locations.map((item) => ({
            q: `${item.location.lat},${item.location.lng}`,
            custom_id: item.key,
          })),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
