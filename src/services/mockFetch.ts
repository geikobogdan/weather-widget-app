import { getRandomValue } from 'helpers/random';
import { CAPITALS } from 'helpers/euCapitals';

export type IWeather = { title: string; value: string };

export interface WeatherResponse {
  items: IWeather[];
  date: string;
}
export const mockFetch = (capitalValue: string): Promise<WeatherResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!CAPITALS.has(capitalValue.toLowerCase())) {
        reject(null);
      }
      const date = new Date();

      const currentHour = date.getHours();

      const weatherForecasts: IWeather[] = [
        { title: 'Morning (9:00)', value: getRandomValue(0, 20) },
        { title: 'Afternoon (14:00)', value: getRandomValue(0, 20) },
        { title: 'Evening (21:00)', value: getRandomValue(0, 20) },
      ];

      //-----  apply this condition - "if, for example, it is currently afternoon, there's no need to show the morning forecast"  @Bogdan
      if (currentHour > 9) {
        weatherForecasts.shift();
      }

      if (currentHour > 14) {
        weatherForecasts.shift();
      }
      //-----

      resolve({ date: date.toLocaleString().split(',')[0], items: weatherForecasts });
    }, 1500);
  });
};
