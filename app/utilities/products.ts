const API_ROOT_URL = process.env.API_ROOT_URL;

const fetchApi = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_ROOT_URL}${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error("Error: fetchApi,", {
      endpoint,
      error
    });
    throw error;
  }
}
/**
 * Calls products API and and returns products list
 * @returns products list
 */
export const getProductList = async () => await fetchApi('/products');


/**
 * Calls specific product details to show all product details
 * gets productId as an argument and will use it to call API
 * @param productId
 * @returns products details
 */
export const getProductDetails = async (productId: number) => await fetchApi(`/products/${productId}`);