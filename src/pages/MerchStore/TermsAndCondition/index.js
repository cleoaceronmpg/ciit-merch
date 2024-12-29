import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container } from "reactstrap";
import { actionCreator } from "../../../store";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const TermsAndCondition = ({ account, authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Terms And Condition";

  React.useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Header />

      <div className="auth-page">
        {/* Render Breadcrumbs */}
        <Container fluid className="p-0">
          <Row
            className="g-0"
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Col lg={10} md={10} className="col-xxl-8">
              <div className="auth-full-page-content d-flex p-sm-5 p-4">
                <div className="w-200">
                  <div className="d-flex flex-column h-100">
                    <div className="auth-content my-auto">
                      <div className="text-left">
                        <h5 className="mb-5">Terms and Conditions</h5>
                        <p className="text-muted mt-2">
                          Welcome to{" "}
                          <span style={{ fontWeight: 700 }}>WeAre Merch</span>,
                          owned and operated by D Julliz Scrap Trading. By
                          accessing or using our website and services, you agree
                          to comply with and be bound by the following Terms and
                          Conditions. Please read them carefully before using
                          our site.
                        </p>
                        <p className="text-muted mt-2">
                          By using our website, you confirm that you are at
                          least 18 years old or are accessing the website under
                          the supervision of a parent or legal guardian. If you
                          do not agree to these Terms and Conditions, you may
                          not use this website or its services.
                        </p>
                        <p className="text-muted mt-2">
                          WeAre Merch offers CIIT merchandise for sale through
                          an e-commerce platform. All products are subject to
                          availability, and we reserve the right to limit the
                          sale of any product to any customer or geographic
                          region.
                        </p>

                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              Prices are subject to change without prior notice.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              Product descriptions and images are provided as
                              accurately as possible. However, we do not warrant
                              that all product details are entirely free from
                              error or omissions.
                            </p>
                          </li>
                        </ul>
                        <h5 className="mt-5">Payment Terms</h5>
                        <p className="text-muted mt-2">
                          We accept [insert payment methods, e.g., credit/debit
                          cards, online wallets, bank transfers]. All payments
                          must be made in full before the shipment of goods.
                        </p>
                        <h5 className="mt-5">Shipping and Delivery</h5>
                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              <span style={{ fontWeight: 700 }}>
                                Shipping Time:
                              </span>{" "}
                              Orders are processed and shipped within 3-5
                              business days.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              <span style={{ fontWeight: 700 }}>Delivery:</span>{" "}
                              Estimated delivery times vary based on the
                              destination and courier service.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              <span style={{ fontWeight: 700 }}>
                                Shipping Costs:
                              </span>{" "}
                              Applicable fees are displayed at checkout.
                            </p>
                          </li>
                        </ul>
                        <p className="text-muted mt-2">
                          We are not responsible for delays caused by courier
                          services or force majeure events (e.g.,natural
                          disasters, pandemics, strikes).
                        </p>
                        <h5 className="mt-5">Refund and Return Policy</h5>
                        <h5
                          className="mt-3"
                          style={{
                            marginLeft: 20,
                          }}
                        >
                          Eligibility:
                        </h5>

                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              Returns are accepted within 3 days from the date
                              of receiving with proof of defect.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              Items must be in original condition, unused, and
                              with tags/packaging intact.
                            </p>
                          </li>
                        </ul>
                        <h5
                          className="mt-3"
                          style={{
                            marginLeft: 20,
                          }}
                        >
                          Non-Returnable Items:
                        </h5>

                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              Personalized or custom-made merchandise
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              Clearance or sale items
                            </p>
                          </li>
                        </ul>
                        <h5
                          className="mt-3"
                          style={{
                            marginLeft: 20,
                          }}
                        >
                          Process:
                        </h5>

                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              Customers must notify us of any issues via email
                              at{" "}
                              <a
                                href="mailto:inquiry@wearemerch.ph"
                                style={{
                                  textDecoration: "none",
                                  color: "blue",
                                }}
                              >
                                inquiry@wearemerch.ph
                              </a>{" "}
                              within the return window.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              Once approved, items must be shipped back at the
                              customer’s expense unless the product is defective
                              or incorrect.
                            </p>
                          </li>
                        </ul>
                        <h5
                          className="mt-3"
                          style={{
                            marginLeft: 20,
                          }}
                        >
                          Refunds:
                        </h5>

                        <ul>
                          <li>
                            <p className="text-muted mt-2">
                              Refunds will be processed within 7-10 business
                              days after we receive and inspect the returned
                              item.
                            </p>
                          </li>
                          <li>
                            <p className="text-muted mt-2">
                              Refunds will be issued based on the given account
                              of the customer.{" "}
                              <a
                                href="/privacy-policy"
                                style={{
                                  textDecoration: "none",
                                  color: "blue",
                                }}
                              >
                                Privacy Policy
                              </a>
                            </p>
                          </li>
                        </ul>
                        <p className="text-muted mt-2">
                          Your personal information is collected, used, and
                          stored in accordance with our{" "}
                          <a
                            href="/privacy-policy"
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            Privacy Policy
                          </a>
                          . Please review the{" "}
                          <a
                            href="/privacy-policy"
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            Privacy Policy
                          </a>{" "}
                          for details on how we handle your data.
                        </p>
                        <h5 className="mt-5">Intellectual Property</h5>
                        <p className="text-muted mt-2">
                          All content on this website, including text, images,
                          graphics, and logos, is the property of{" "}
                          <span style={{ fontWeight: 700 }}>
                            D Julliz Scrap Trading
                          </span>{" "}
                          or its content suppliers and is protected by
                          applicable copyright laws. You may not reproduce,
                          distribute, or use our content without prior written
                          consent.
                        </p>
                        <h5 className="mt-5">Limitation of Liability</h5>
                        <p className="text-muted mt-2">
                          WeAre Merch and{" "}
                          <span style={{ fontWeight: 700 }}>
                            D Julliz Scrap Trading
                          </span>{" "}
                          shall not be held liable for any damages arising from
                          the use or inability to use our website or services,
                          including but not limited to direct, indirect,
                          incidental, punitive, or consequential damages.
                        </p>
                        <h5 className="mt-5">Governing Law</h5>
                        <p className="text-muted mt-2">
                          These Terms and Conditions shall be governed by and
                          construed in accordance with the laws of the Republic
                          of the Philippines. Any disputes arising under these
                          terms shall be resolved exclusively in the courts of
                          [Insert City/Province].
                        </p>

                        <h5 className="mt-5">
                          Changes to Terms and Conditions
                        </h5>
                        <p className="text-muted mt-2">
                          We reserve the right to modify or update these Terms
                          and Conditions at any time without prior notice.
                          Changes will take effect immediately upon posting to
                          this website.
                        </p>

                        <h5 className="mt-5">Contact Us</h5>
                        <p className="text-muted mt-2">
                          For any questions or concerns regarding these Terms
                          and Conditions, please contact us at{" "}
                          <a
                            href="mailto:inquiry@wearemerch.ph"
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            inquiry@wearemerch.ph
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ account, authentication }) => ({
  account,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(TermsAndCondition);
