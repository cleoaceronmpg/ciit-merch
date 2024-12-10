import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Breadcrumbs from "../../../components/MerchStore/Common/Breadcrumb";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

import { Container } from "reactstrap";

const Cart = ({ cart, ...props }) => {
  const [shoppingCart, setShoppingCart] = React.useState([]);
  const [subTotal, setSubTotal] = React.useState(null);
  let navigate = useNavigate();

  React.useEffect(() => {
    // collection && setCatalog(collection);
    cart.data && setShoppingCart(cart.data);
    cart.data && computeSubTotal(cart.data);

    console.log(cart.data);
  }, [cart.data]);

  const removeItemInCart = async (id) => {
    await props.actionCreator({
      type: types.REMOVE_CART,
      payload: { id: id },
    });
  };

  const computeSubTotal = async (data) => {
    const totalPrice = data.reduce((acc, product) => {
      // Remove non-numeric characters from price and convert to number
      const numericPrice = parseFloat(product.price.replace(/[^0-9.-]+/g, ""));
      // Add to accumulator: price * quantity
      return acc + numericPrice * product.quantity;
    }, 0);

    setSubTotal(totalPrice);
  };

  const plusQuantity = async (id) => {
    const newCartData = shoppingCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: parseInt(item.quantity) + 1,
            totalPrice: parseFloat(item.price) * parseInt(item.quantity + 1),
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
      item.id === id
        ? item.quantity > 1
          ? {
              ...item,
              quantity: parseInt(item.quantity) - 1,
              totalPrice: parseFloat(item.price) * parseInt(item.quantity - 1),
            }
          : item
        : item
    );

    await props.actionCreator({
      type: types.UPDATE_CART,
      payload: newCartData,
    });
  };

  //meta title
  document.title = "CIIT Merch | Cart";

  return (
    <React.Fragment>
      <Header />
      <div
        className="page-content"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <Container>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Home" breadcrumbItem={"Shopping cart"} />

          <div
            style={{
              marginBottom: 4,
            }}
          >
            {shoppingCart.length > 0 ? (
              <div className="cart page-width">
                <div className="cart-page-top"></div>
                <div className="cart-page-middle">
                  <div
                    className="grid gap-16 grid-cols-1 grid-cols-4 cart-container"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    <div className="col-span-1 col-span-3">
                      <div id="shopping-cart-items">
                        <table className="items-table listing">
                          <thead>
                            <tr>
                              <td>
                                <span>Product</span>
                              </td>
                              <td>
                                <span>Price</span>
                              </td>
                              <td className="hidden md-table-cell">
                                <span>Quantity</span>
                              </td>
                              <td className="hidden md-table-cell">
                                <span>Total</span>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {shoppingCart.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  <div className="flex justify-start space-x-4 product-info">
                                    <div
                                      className="product-image flex justify-center items-center"
                                      style={{
                                        marginRight: 10,
                                      }}
                                    >
                                      <img
                                        className="self-center"
                                        src={item.img}
                                        alt={item.title}
                                        height={100}
                                        width={100}
                                      />
                                    </div>
                                    <div className="cart-tem-info">
                                      <a
                                        href="#"
                                        style={{
                                          fontWeight: 600,
                                          color: "inherit",
                                        }}
                                        onClick={() => {
                                          navigate(`/product/${item.id}`);
                                        }}
                                      >
                                        {item.title}
                                      </a>
                                      <div className="cart-item-variant-options mt-2">
                                        <ul
                                          style={{
                                            listStyle: "none",
                                            margin: 0,
                                            padding: 0,
                                          }}
                                        >
                                          <li>
                                            <span className="attribute-name">
                                              Size:{" "}
                                            </span>
                                            <span>{item.size}</span>
                                          </li>
                                          <li>
                                            <span className="attribute-name">
                                              Color:{" "}
                                            </span>
                                            <span>{item.color}</span>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="mt-2">
                                        <a
                                          href="#"
                                          className="text-textSubdued underline"
                                          onClick={() =>
                                            removeItemInCart(item.id)
                                          }
                                        >
                                          <span>Remove</span>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <span className="sale-price">
                                      ₱
                                      {parseInt(item.price).toLocaleString(
                                        "en-US"
                                      )}{" "}
                                      PHP
                                    </span>
                                  </div>
                                </td>
                                <td className="hidden md-table-cell">
                                  <div
                                    className="qty-box grid grid-cols-3 border"
                                    style={{
                                      borderColor: "rgb(204 204 204)",
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      padding: 10,
                                    }}
                                  >
                                    <button
                                      className="flex justify-center items-center"
                                      type="button"
                                      style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        backgroundImage: "none",
                                      }}
                                      onClick={() => minusQuantity(item.id)}
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
                                    {/* <input
                                    type="text"
                                    defaultValue={item.quantity}
                                    readOnly={true}
                                    style={{
                                      border: "none",
                                      textAlign: "center",
                                    }}
                                  /> */}
                                    <div
                                      style={{
                                        width: 130,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span>{item.quantity}</span>
                                    </div>
                                    <button
                                      className="flex justify-center items-center"
                                      type="button"
                                      style={{
                                        border: "none",
                                        backgroundColor: "transparent",
                                        backgroundImage: "none",
                                      }}
                                      onClick={() => plusQuantity(item.id)}
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
                                </td>
                                <td className="hidden md-table-cell">
                                  {item?.totalPrice ? (
                                    <span>
                                      ₱
                                      {parseInt(item.totalPrice).toLocaleString(
                                        "en-US"
                                      )}{" "}
                                      PHP
                                    </span>
                                  ) : (
                                    <span>
                                      ₱
                                      {parseInt(item.price).toLocaleString(
                                        "en-US"
                                      )}{" "}
                                      PHP
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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
                          <div
                            className="grid grid-cols-3 gap-8"
                            style={{ width: "300px" }}
                          >
                            <div className="col-span-2">
                              <div className="form-field-container null">
                                <div className="field-wrapper flex flex-grow">
                                  <input
                                    type="text"
                                    name="coupon"
                                    placeholder="Enter coupon code"
                                    defaultValue=""
                                    style={{
                                      border: "#c9cccf solid 1px",
                                      borderTopColor: "#aeb4b9",
                                      borderRadius: "4px",
                                      padding: "1rem 1.2rem",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-span-1">
                              <button type="button" className="button primary">
                                <span>Apply</span>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-span-1 col-span-3">
                      <div className="summary">
                        <div className="grid grid-cols-1 gap-8">
                          <h4>Order summary</h4>
                          <div className="flex justify-between gap-12">
                            <div>Sub total</div>
                            <div className="text-right">
                              ₱ {parseInt(subTotal).toLocaleString("en-US")}
                            </div>
                          </div>
                          <div className="summary-row grand-total flex justify-between">
                            <div>
                              <div>
                                <div className="font-bold">
                                  <span
                                    style={{
                                      fontWeight: 700,
                                    }}
                                  >
                                    Total
                                  </span>
                                </div>
                                <div>
                                  <span className="italic">
                                    (Inclusive of tax ₱0.00)
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div></div>
                              <div className="grand-total-value">
                                ₱ {parseInt(subTotal).toLocaleString("en-US")}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="shopping-cart-checkout-btn flex justify-between mt-8">
                          <a href="/checkout" className="button primary">
                            <span>CHECKOUT</span>
                          </a>
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
                    <a href="/home" className="button primary">
                      <span>
                        <span className="flex space-x-4">
                          <span className="self-center">CONTINUE SHOPPING</span>{" "}
                          <svg
                            className="self-center"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            style={{
                              width: "2.5rem",
                              height: "2.5rem",
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            ></path>
                          </svg>
                        </span>
                      </span>
                    </a>
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

const mapStateToProps = ({ cart, authentication }) => ({
  cart,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(Cart);
