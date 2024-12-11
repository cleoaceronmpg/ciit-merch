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
import bannerHeroAds from "../../../assets/images/banner-ads.png";

import { collectionData, featureProductsData } from "./data";

const Home = ({ app, authentication, ...props }) => {
  let navigate = useNavigate();
  //meta title
  document.title = "CIIT Merch | Home";

  const [bannerAds, setBannerAds] = React.useState(null);

  React.useEffect(() => {
    console.log("bannerAds", bannerAds);
  }, [bannerAds]);

  React.useEffect(() => {
    //console.log("app", app);
    app.campaignData.length > 0 && bannerAdsHandler();
  }, [app]);

  React.useEffect(() => {
    fetchCampaigns();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await props.actionCreator({
      type: types.GET_PRODUCTS,
    });
  };

  const fetchCampaigns = async () => {
    await props.actionCreator({
      type: types.GET_CAMPAIGN,
    });
  };

  const bannerAdsHandler = () => {
    setBannerAds(
      app.campaignData
        .filter(
          (item) =>
            item?.CampainCategory && item.CampainCategory === "banner ads"
        )
        .map((banner) => banner)[0] || []
    );
  };

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
              {bannerAds && (
                <img
                  src={bannerAds.Image[0]?.url || ""}
                  className="bannerImage"
                  alt="Hero Banner"
                />
              )}
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
            <h5>Featured Products</h5>
            <Row>
              <Col xxl={4} xl={4} md={4}>
                <img src={bannerHeroAds} className="bannerAds" />
              </Col>
              <Col className="featureProducts">
                {app.products.length > 0 &&
                  app.products.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: 10,
                        flexBasis: "20%", // Each column takes 30% of the row
                        boxSizing: "border-box", // Includes padding in the width calculation
                      }}
                    >
                      <img
                        src={item.Images[0].url}
                        width={160}
                        className="featureImage"
                      />
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "#FF5400",
                          borderColor: "#FF5400",
                          fontWeight: 700,
                          marginLeft: 10,
                          marginRight: 10,
                          borderRadius: 8,
                        }}
                        color="primary"
                      >
                        Order now
                      </Button>
                    </div>
                  ))}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, authentication }) => ({ app, authentication });

export default connect(mapStateToProps, { actionCreator })(Home);
