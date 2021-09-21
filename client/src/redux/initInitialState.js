import axios from "axios";

const initInitialState = async () => {
  let initialState = {
    cart: {
      items: [],
    },
  };

  try {
    // Getting cart items from Local Storage
    const items = JSON.parse(localStorage.getItem("cart"));
    let stateCart = [];
    // Checking if local storage have ccart items
    if (items) {
      // Looping through local storage cart items to get thier data through the API
      for (let index = 0; index < items.length; index++) {
        const item = items[index];
        const res = await axios.get(`/api/products/${item._id}`);
        // Checking if a product was sent
        if (res.data.product) {
          let nProduct = res.data.product;
          if (item.isPreview) {
            nProduct.price = 30;
          }
          // Checking whether the user have change the qty in localstorage or not
          if (item.qty > res.data.product.inStock) {
            stateCart.push({
              product: nProduct,
              qty: nProduct.inStock,
              isPreview: item.isPreview,
            });
            let ls = [];
            for (let index = 0; index < items.length; index++) {
              const unit = items[index];
              const {
                data: { product },
              } = await axios.get(`/api/products/${unit._id}`);
              if (product) {
                if (product.inStock < unit.qty) {
                  ls.push({
                    _id: product._id,
                    qty: product.inStock,
                    isPreview: item.isPreview,
                  });
                } else {
                  ls.push({
                    _id: product._id,
                    qty: unit.qty,
                    isPreview: item.isPreview,
                  });
                }
              }
            }
            localStorage.setItem("cart", JSON.stringify(ls));
          } else {
            stateCart.push({
              product: nProduct,
              qty: item.qty,
              isPreview: item.isPreview,
            });
          }
        }
      }
      // Modefing initialState
      initialState.cart = { items: stateCart };
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
    return initialState;
  } catch (err) {
    console.log(err);
    return {};
  }
};

export default initInitialState;
