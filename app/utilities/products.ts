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