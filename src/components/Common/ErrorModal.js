import React from "react";
import { connect } from "react-redux";
import { actionCreator, types } from "../../store";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import withRouter from "../../components/Common/withRouter";

const ErrorModal = ({
  show,
  onDeleteClick,
  onCloseClick,
  message,
  component,
  statusCode,
  setErrorModal,
  ...props
}) => {
  React.useEffect(() => {
    if (component.errorMessage && (statusCode === 403 || statusCode === 500)) {
      setErrorModal(true);

      const interval = setInterval(() => {
        props.actionCreator({
          type: types.LOGOUT_USER,
          payload: {
            history: props.router.navigate,
          },
        });
      }, 4000);

      //Clearing the interval
      return () => {
        clearInterval(interval);
      };
    }
  }, [component]);

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h4>{message}</h4>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

// export default ErrorModal;
const mapStateToProps = ({ app }) => ({
  app,
});

export default withRouter(
  connect(mapStateToProps, { actionCreator })(ErrorModal)
);
