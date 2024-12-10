import React from "react";
import { Row, Col, Container } from "reactstrap";
import "./styles.css";

const PrivacyPolicy = ({ account, authentication, ...props }) => {
  //meta title
  document.title = "CIIT Merch | Privacy Policy";

  return (
    <React.Fragment>
      <div className="auth-page">
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
                        <h5 className="mb-5">Privacy Policy</h5>
                        <p className="text-muted mt-2">
                          At{" "}
                          <span style={{ fontWeight: 700 }}>WeAre Merch</span>,
                          operated by D Julliz Scrap Trading, we are committed
                          to protecting your personal information and respecting
                          your privacy. This Privacy Policy outlines how your
                          information is collected, used, and disclosed when you
                          use our services. By using our website, you consent to
                          the practices described in this Privacy Policy.
                        </p>
                        <p className="text-muted mt-2">
                          This Privacy Policy applies to all users of WeAre
                          Merch’s services, including visitors, account holders,
                          and those who transact on our platform. We encourage
                          you to read this policy carefully to understand our
                          views and practices regarding your personal
                          information.
                        </p>
                        <p className="text-muted mt-2">
                          We collect personal data such as your name, contact
                          information, delivery address, and payment details
                          when you create an account, place an order, or contact
                          customer service. Additional data may be collected
                          automatically, such as device information, IP address,
                          and browsing behavior through cookies and similar
                          technologies.
                        </p>
                        <p className="text-muted mt-2">
                          The information collected is used to process your
                          orders, provide customer support, communicate updates
                          or promotions, and enhance your experience on our
                          platform. Data may also be used for security purposes,
                          such as fraud prevention and compliance with
                          applicable laws.
                        </p>
                        <p className="text-muted mt-2">
                          We may share your personal data with third-party
                          service providers who assist in fulfilling orders,
                          processing payments, and providing logistics and
                          customer support. These providers are bound by
                          confidentiality agreements to ensure the security of
                          your information. Your data may also be disclosed to
                          legal authorities if required by law or to protect the
                          rights and safety of WeAre Merch and its users.
                        </p>
                        <p className="text-muted mt-2">
                          We take reasonable precautions to safeguard your
                          personal information through encryption, secure
                          servers, and restricted access. However, no system is
                          entirely secure, and we cannot guarantee the absolute
                          security of your data.
                        </p>
                        <p className="text-muted mt-2">
                          You have the right to access, correct, or delete your
                          personal data held by us. You may also withdraw
                          consent for specific uses of your data, such as
                          receiving promotional emails, by contacting our
                          customer service or updating your account preferences.
                        </p>
                        <p className="text-muted mt-2">
                          We use cookies to improve website performance,
                          remember your preferences, and analyze traffic
                          patterns. You may choose to disable cookies through
                          your browser settings, but this may limit some
                          features of our platform.
                        </p>
                        <p className="text-muted mt-2">
                          This Privacy Policy may be updated from time to time
                          to reflect changes in our practices or legal
                          requirements. Updates will be effective upon posting
                          to this website, and we encourage you to review the
                          policy periodically.
                        </p>
                        <p className="text-muted mt-2">
                          If you have questions or concerns about this Privacy
                          Policy, please contact us at{" "}
                          <a
                            href="mailto:inquiry@wearemerch.ph"
                            style={{ textDecoration: "none", color: "blue" }}
                          >
                            inquiry@wearemerch.ph
                          </a>
                        </p>
                        <p className="text-muted mt-2">
                          By using our services, you acknowledge that you have
                          read, understood, and agreed to this Privacy Policy.
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
    </React.Fragment>
  );
};

export default PrivacyPolicy;
