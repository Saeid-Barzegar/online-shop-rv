/**
 * Calls products API and and returns products list
 * @returns products list
 */
export const getProductList = async () => {
  try {
    const rootUrl = process.env.API_ROOT_URL;
    const response = await fetch(`${rootUrl}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: getProductList,", error);
  }
}
/**
 * Calls specific product details to show all product details
 * gets productId as an argument and will use it to call API
 * @param productId
 * @returns products details
 */
export const getProductDetails = async (productId: number) => {
  try {
    const rootUrl = process.env.API_ROOT_URL;
    const response = await fetch(`${rootUrl}/products/${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: getProductDetails,", error);
  }
}