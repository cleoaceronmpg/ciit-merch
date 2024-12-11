import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreator, types } from "../../../store";

//import Breadcrumbs
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";
import { Button, Container, Row, Col } from "reactstrap";
import hoodie from "../../../assets/images/banner-hoodie.png";
import deliveryBan from "../../../assets/images/delivery-ban.png";
import securePayment from "../../../assets/images/secure-payment.png";
import bannerAds from "../../../assets/images/banner-ads.png";

import { collectionData, featureProductsData } from "./data";

const Home = ({ authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Home";

  return (
    <React.Fragment>
      <Header />
      <div className="pageCustomContent">
        <Container>
          <Row className="bannerContainer">
            <Col className="bannerTagLineContainer" lg={6}>
              <div className="tagline">
                <p>Gear Up for a Back-to-School Deal!</p>
                <h5
                  style={{
                    fontWeight: 900,
                    fontSize: 35,
                    color: "#545454",
                  }}
                >
                  Get a FREE Pin
                </h5>
                <p
                  style={{
                    marginTop: 20,
                  }}
                >
                  When you{" "}
                  <span
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    PRE-ORDER
                  </span>{" "}
                  a CIIT Old School Hoodie or
                </p>
                <p>Oversized T-shirt on January 4 to January 7, 2025!</p>
              </div>
              <div className="orderNow">
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#FF5400",
                    borderColor: "#FF5400",
                    fontWeight: 700,
                  }}
                  color="primary"
                >
                  Order now
                </Button>
              </div>
            </Col>

            <Col
              className="bannerImageContainer"
              lg={6}
              style={{
                paddingLeft: "0px",
                paddingRight: "0px",
              }}
            >
              <img src={hoodie} className="bannerImage" />
            </Col>
          </Row>
          <div className="midTransContainer">
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
              <Col>
                <h5 className="officialFont">The Official CIIT Merch</h5>
              </Col>
              <Col>
                <img src={deliveryBan} className="deliveryBan" />
                <span>Delivery or Pick-up</span>
              </Col>
              <Col>
                <img src={securePayment} className="securePayment" />
                <span>Delivery or Pick-up</span>
              </Col>
            </Row>
          </div>
          <div className="featuresContainer">
            <Row>
              <Col xxl={4} xl={4} md={4}>
                <h5>Featured Products</h5>
                <img src={bannerAds} className="bannerAds" />
              </Col>
              <Col>container 2</Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ authentication }) => ({ authentication });

export default connect(mapStateToProps, { actionCreator })(Home);
