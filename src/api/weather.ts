import reqAxios from './reqAxios';

export async function getWeather(lat: string, lon: string) {
  const response = await reqAxios().get(`integration/weather?lat=${lat}&lon=${lon}`);
  return response.data;
}