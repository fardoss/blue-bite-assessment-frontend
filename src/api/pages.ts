import reqAxios from './reqAxios';

export async function getPage(id: string) {
  const response = await reqAxios().get(`page/${id}`);
  return response.data;
}