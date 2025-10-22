import React from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

// api
import appServices from "../../../api/services/app";

const Cart = ({ app, cart, ...props }) => {
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [subTotal, setSubTotal] = React.useState(null);
  const [promoCode, setPromoCode] = React.useState(null);
  const [promoCodeSubmitted, setPromoCodeSubmitted] = React.useState(false);
  let navigate = useNavigate();

  React.useEffect(() => {
    clearPromoCode();
  }, []);

  React.useEffect(() => {
    if (!cart.loading) {
      if (promoCodeSubmitted && cart.error) {
        Swal.fire({
          icon: "error",
          title: `${promoCode}`,
          text: cart.errorMessage,
        });
        setPromoCodeSubmitted(false);
      }

      if (promoCodeSubmitted && !cart.error && cart.promoCode) {
        Swal.fire({
          icon: "success",
          title: `${cart.promoCode?.PromoCode}`,
          text: "You have successfully applied a promo code.",
        });
        setPromoCodeSubmitted(false);
      }
    }
  }, [cart.loading]);

  React.useEffect(() => {
    // collection && setCatalog(collection);
    app.products.length > 0 && cartDataHandler(cart.data);
    cart.data && computeSubTotal(cart.data);
  }, [cart.data, app.products]);

  React.useEffect(() => {
    cart.promoCode?.Amount &&
      computeSubTotalWithDiscount(cart.promoCode?.Amount);
  }, [cart.promoCode]);

  const cartDataHandler = async (data) => {
    if (data.length > 0) {
      const updatedArray = data.map((item) => {
        const match = app.products.find((second) => second.id === item.id);

        if (match) {
          // Merge the fields from the second array into the first array item
          return {
            ...item,
            Images: match.Images,
          };
        }

        // If no match, return the original item
        return item;
      });

      setShoppingCart(updatedArray);
    } else {
      setShoppingCart([]);
    }
  };

  const removeItemInCart = async (id) => {
    await props.actionCreator({
      type: types.REMOVE_CART,
      payload: { uid: id },
    });
  };

  const computeSubTotal = async (data) => {
    const TotalAmount = data.reduce((acc, product) => {
      // Remove non-numeric characters from price and convert to number
      const numericPrice = product?.Price
        ? parseFloat(product?.Price.replace(/[^0-9.-]+/g, ""))
        : parseFloat(product?.price.replace(/[^0-9.-]+/g, ""));
      // Add to accumulator: price * quantity
      return acc + numericPrice * product.Quantity;
    }, 0);

    setSubTotal(TotalAmount);
  };

  const computeSubTotalWithDiscount = async (Amount) => {
    const discountedAmount = parseFloat(subTotal) * parseFloat(Amount / 100);

    const newSubTotal = parseFloat(subTotal) - discountedAmount;

    setSubTotal(newSubTotal);
  };

  const plusQuantity = async (id) => {
    const newCartData = shoppingCart.map((item) =>
      item.uid === id
        ? {
            ...item,
            Quantity: parseInt(item.Quantity) + 1,
            TotalAmount: parseFloat(item.Price) * parseInt(item.Quantity + 1),
          }
        : item
    );

    await props.actionCreator({
      type: types.UPDATE_CART,
      payload: newCartData,
    });
  };

  const minusQuantity = async (id) => {
    const newCartData = shoppingCart.map((item) =>
      item.uid === id
        ? item.Quantity > 1
          ? {
              ...item,
              Quantity: parseInt(item.Quantity) - 1,
              TotalAmount: parseFloat(item.Price) * parseInt(item.Quantity - 1),
            }
          : item
        : item
    );

    await props.actionCreator({
      type: types.UPDATE_CART,
      payload: newCartData,
    });
  };

  const checkStockBeforeCheckout = async () => {
    if (shoppingCart.length > 0) {
      let listOfNoStockItems = [];

      for (let cart of shoppingCart) {
        let stockResult = await appServices.api.fnGetRemainingStocks({
          recordId: cart["Product ID"],
          size: cart["Size"],
          color: cart["Color"],
        });

        let remainingStock = stockResult.reduce((acc, currentItem) => {
          const remainingStocks = currentItem?.fields["Remaining Stocks"];
          return acc + parseInt(remainingStocks, 10);
        }, 0);

        if (!remainingStock) {
          Swal.fire({
            icon: "error",
            title: `${cart["Product Name"]}`,
            text: "This product is currently out of stock. Feel free to check out our other merchandise. Thank you!",
          });

          listOfNoStockItems.push(cart["Product ID"]);
          break;
        }
      }

      if (!listOfNoStockItems.length) {
        navigate("/checkout", { state: { isFromCart: true } });
      }
    }
  };

  const validateAnApplyPromoCode = async () => {
    if (promoCode) {
      await props.actionCreator({
        type: types.APPLY_PROMO_CODE,
        payload: { promoCode: promoCode },
      });

      setPromoCodeSubmitted(true);
    } else {
      Swal.fire({
        icon: "error",
        title: `Promotion Code`,
        text: "Promo code cannot be empty.",
      });
    }
  };

  const clearPromoCode = async () => {
    await props.actionCreator({
      type: types.CLEAR_PROMO_CODE,
    });
  };

  //meta title
  document.title = "CIIT Merch | Cart";

  return (
    <React.Fragment>
      <Header />
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <Container>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Home"
            breadcrumbItem={"Shopping cart"}
            url="/home"
          />

          <div
            style={{
              marginBottom: 4,
            }}
          >
            {shoppingCart.length > 0 ? (
              <div className="cart page-width">
                <div className="cart-page-top"></div>
                <div className="cart-page-middle">
                  <div className="cart-container">
                    <div className="shopping-cart">
                      <div id="shopping-cart-items">
                        {shoppingCart.map((item, index) => (
                          <div className="product-item" key={index}>
                            <div className="product-item__remove-item">
                              <a
                                href="#"
                                className="text-textSubdued underline"
                                onClick={() => removeItemInCart(item.uid)}
                              >
                                <i className="dripicons-trash"></i>
                              </a>
                            </div>
                            <div className="product-item__product-info">
                              <div className="product-item__product-details">
                                <div className="product-image">
                                  {item?.Images ? (
                                    <img
                                      className="self-center"
                                      src={item?.Images[0]?.url || ""}
                                      alt={item["Product Name"]}
                                    />
                                  ) : (
                                    <p className="text-muted">No Image</p>
                                  )}
                                </div>
                                <div className="product-item__product-description">
                                  <div className="product-item__product-name">
                                    <a
                                      href="#"
                                      style={{
                                        fontWeight: 600,
                                        color: "inherit",
                                      }}
                                      onClick={() => {
                                        navigate(
                                          `/product/${item["Product ID"]}`
                                        );
                                      }}
                                    >
                                      {item["Product Name"]}
                                    </a>
                                  </div>
                                  <div className="shopping-cart-items__options">
                                    <ul className="shopping-cart-items__options-list">
                                      <li className="shopping-cart-items__option">
                                        <span className="attribute-name">
                                          Size:{" "}
                                        </span>
                                        <span>{item.Size}</span>
                                      </li>
                                      <li className="shopping-cart-items__option">
                                        <span className="attribute-name">
                                          Color:{" "}
                                        </span>
                                        <span>{item.Color}</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="quantity-input-container">
                                <div className="quantity-input qty-box border">
                                  <button
                                    className="flex justify-center items-center"
                                    type="button"
                                    style={{
                                      border: "none",
                                      backgroundColor: "transparent",
                                      backgroundImage: "none",
                                    }}
                                    onClick={() => minusQuantity(item.uid)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      className="icon icon-minus"
                                      fill="none"
                                      viewBox="0 0 10 2"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </button>
                                  <div
                                    style={{
                                      width: 130,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span>{item.Quantity}</span>
                                  </div>
                                  <button
                                    className="flex justify-center items-center"
                                    type="button"
                                    style={{
                                      border: "none",
                                      backgroundColor: "transparent",
                                      backgroundImage: "none",
                                    }}
                                    onClick={() => plusQuantity(item.uid)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      className="icon icon-plus"
                                      fill="none"
                                      viewBox="0 0 10 10"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          marginTop: 25,
                        }}
                      >
                        <form
                          id="couponForm"
                          action="/api/carts/bcd26eb4-8d59-4747-865f-73fe50ba71c2/coupons"
                          method="POST"
                        >
                          <p style={{ fontWeight: 600 }}>Promotion code?</p>
                          <div className="promotion-code-form">
                            <input
                              className="promotion-code-form__input"
                              type="text"
                              name="coupon"
                              placeholder="Enter coupon code"
                              onChange={(e) => {
                                setPromoCode(e.target.value);
                              }}
                            />
                            <Button
                              className="btn btn-primary w-100 waves-effect waves-light"
                              type="button"
                              style={{
                                backgroundColor: "#ff5400",
                                borderColor: "#ff5400",
                                maxWidth: "50%",
                              }}
                              onClick={() => {
                                validateAnApplyPromoCode();
                              }}
                              color="primary"
                            >
                              <span>Apply</span>
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="order-summary">
                      <div className="summary">
                        <div>
                          <h4 className="order-summary-header">
                            Order summary
                          </h4>
                          <div className="subtotal">
                            <h5>Subtotal</h5>
                            <h5>₱ {parseFloat(subTotal).toFixed(2)}</h5>
                          </div>
                          {cart.promoCode && (
                            <div className="discount">
                              <h5>Promo Code Discount</h5>
                              <h5>{cart.promoCode?.Amount}% OFF</h5>
                            </div>
                          )}
                          <div className="grand-total">
                            <h5>Total</h5>
                            <h3>₱ {parseFloat(subTotal).toFixed(2)}</h3>
                          </div>
                        </div>
                        <div className="shopping-cart__checkout-btn">
                          <Button
                            className="btn btn-primary w-100 waves-effect waves-light"
                            type="button"
                            style={{
                              backgroundColor: "#ff5400",
                              borderColor: "#ff5400",
                              maxWidth: "50%",
                            }}
                            color="primary"
                            onClick={() => {
                              checkStockBeforeCheckout();
                            }}
                          >
                            <span>CHECKOUT</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-page-bottom"></div>
              </div>
            ) : (
              <div
                className="empty-shopping-cart w-100"
                style={{
                  marginTop: 150,
                }}
              >
                <div>
                  <div className="text-center">
                    <h2>Shopping cart</h2>
                  </div>
                  <div className="mt-8 text-center">
                    <span>Your cart is empty!</span>
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button
                      className="btn btn-primary w-100 waves-effect waves-light"
                      onClick={() => {
                        navigate("/home");
                      }}
                      style={{
                        backgroundColor: "#ff5400",
                        borderColor: "#ff5400",
                        maxWidth: "40%",
                      }}
                      color="primary"
                    >
                      <span>Continue to Shopping</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, cart, authentication }) => ({
  app,
  cart,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Cart);
