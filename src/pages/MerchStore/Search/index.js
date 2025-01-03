import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { actionCreator, types } from "../../../store";
import { connect } from "react-redux";
import { Card, CardBody, Row, Col, Container } from "reactstrap";
import Swal from "sweetalert2";
import Header from "../../../components/MerchStore/Header";
import Footer from "../../../components/MerchStore/Footer";
import "./styles.css";

const SearchScreen = ({ app, authentication, ...props }) => {
  let navigate = useNavigate();
  const { key } = useParams();
  const { products } = app;
  const [searchResults, setSearchResults] = React.useState([]);
  const [screenHeight, setScreenHeight] = React.useState(window.innerHeight);

  // React.useEffect(() => {
  //   setSearchResults(app.searchData);
  // }, [app.searchData]);

  React.useEffect(() => {
    searchProducts(key);
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [key]);

  const searchProducts = async (searchKey) => {
    const lowercaseSearchKey = searchKey.toLowerCase();

    setSearchResults(
      products
        .filter((item) => {
          const lowercaseTags =
            item?.Tags?.map((tag) => tag.toLowerCase()) || []; // Lowercase each tag
          const lowercaseProductName = item["Product Name"].toLowerCase();

          return (
            lowercaseTags.some((tag) => tag.includes(lowercaseSearchKey)) ||
            lowercaseProductName.includes(lowercaseSearchKey)
          );
        })
        .map((product) => product)
    );

    // await props.actionCreator({
    //   type: types.SEARCH_PRODUCTS,
    //   payload: searchKey,
    // });
  };

  //meta title
  document.title = "CIIT Merch | Search Products";

  return (
    <React.Fragment>
      <Header />

      <div className="auth-page">
        {/* Render Breadcrumbs */}
        <Container
          className="container"
          style={{
            height: screenHeight,
          }}
        >
          <Row>
            <Col className="searchResult">
              <h5 className="mb-3">Search Result:</h5>
              <span className="text-muted metaKey">"{key}"</span>
            </Col>
          </Row>
          <Row>
            {searchResults.length > 0 ? (
              searchResults.map((item, index) => (
                <Col lg={6} key={index}>
                  <a href={`/product/${item["Product ID"]}`}>
                    <Card>
                      <Row className="g-0 align-items-center">
                        <Col md={4}>
                          <img
                            className="card-img img-fluid"
                            src={item["Images"][0].url}
                            alt={item["Product Name"]}
                          />
                        </Col>
                        <Col md={8}>
                          <CardBody>
                            <h5 className="card-title">
                              {item["Product Name"]}
                            </h5>
                            <p className="card-text text-muted">
                              {item["Product Description"]}
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                ₱{" "}
                                {parseInt(item["Price"]).toLocaleString(
                                  "en-US"
                                )}
                              </small>
                            </p>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
                  </a>
                </Col>
              ))
            ) : (
              <Col>
                <p>No search result found.</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ app, authentication }) => ({
  app,
  authentication,
});

export default connect(mapStateToProps, { actionCreator })(SearchScreen);
