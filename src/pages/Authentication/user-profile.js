import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from 'reactstrap';

// Formik Validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import withRouter from '../../components/Common/withRouter';
import { actionCreator, types } from '../../store';

//Import Breadcrumb
import Breadcrumb from '../../components/Common/Breadcrumb';
import ErrorModal from '../../components/Common/ErrorModal';

import avatar from '../../assets/images/users/avatar-1.jpg';

const UserProfile = ({ profile, authentication, ...props }) => {
  //meta title
  document.title = 'Profile | EMS | Camp';
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})/;
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [id, setid] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);
  const [errorModal, setErrorModal] = React.useState(false);

  //NOTIFICATION
  const handleNotification = async () => {
    await props.actionCreator({ type: types.CLEAR_PROFILE });
    toast(profile.message, {
      position: 'top-right',
      hideProgressBar: true,
      className: 'bg-success text-white',
    });
  };

  const handleErrorNotification = async () => {
    await props.actionCreator({ type: types.CLEAR_PROFILE_ERROR_MESSAGE });
    toast(profile.errorMessage, {
      position: 'top-right',
      hideProgressBar: true,
      className: 'bg-danger text-white',
    });
  };

  React.useEffect(() => {
    props.actionCreator({
      type: types.GET_PROFILE,
    });
  }, []);

  React.useEffect(() => {
    profile.isProfileSubmitted && handleNotification();
    profile.error && profile.errorMessage && handleErrorNotification();
    setname(
      profile.data &&
        profile?.data?.data.firstname + ' ' + profile?.data?.data.lastname,
    );
    setemail(profile.data && profile?.data?.data.email);
    setid(profile?.data?.data.id || '');
  }, [profile]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(passwordRules, {
          message:
            'Must contain 10 Characters, one Uppercase, one Lowercase, one Number and one Special Character',
        })
        .matches(/^\S*$/, 'White Spaces are not allowed')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      props.actionCreator({
        type: types.EDIT_PROFILE,
        payload: {
          password: values.password,
        },
      });
    },
  });

  return (
    <React.Fragment>
      <ErrorModal
        component={profile}
        statusCode={profile.status}
        show={errorModal}
        onCloseClick={() => setErrorModal(false)}
        message={profile.errorMessage}
        setErrorModal={setErrorModal}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb
            title="Dashboard"
            titleLink="/dashboard"
            breadcrumbItem="Profile"
          />

          <Row>
            <Col lg="12">
              {/* {profile.error && profile.error ? (
                <Alert color="danger">{profile.error}</Alert>
              ) : null}
              {profile.success ? (
                <Alert color="success">{profile.success}</Alert>
              ) : null} */}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      {/* <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      /> */}
                      <img
                        src="https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                        alt="default"
                        className="rounded-circle border"
                        style={{ height: '28px', width: '28px' }}
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email || ''}</p>
                        <p className="mb-0">Id no: #{id}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Change Password</h4> */}

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Label className="form-label">Change Password</Label>
                <div className="mb-5 input-group" style={{ width: '40%' }}>
                  <Input
                    name="password"
                    className="form-control"
                    type={passwordShow ? 'text' : 'password'}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.password || ''}
                    invalid={
                      validation.touched.password && validation.errors.password
                        ? true
                        : false
                    }
                    autoComplete="new-password"
                  />
                  <button
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="btn btn-light shadow-none ms-0"
                    type="button"
                    id="password-addon"
                  >
                    <i
                      className={`mdi ${!passwordShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'}`}
                    ></i>
                  </button>
                  {validation.touched.password && validation.errors.password ? (
                    <FormFeedback type="invalid">
                      {validation.errors.password}
                    </FormFeedback>
                  ) : null}
                  <Input name="id" value={id} type="hidden" />
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary save-user">
                    Save
                  </button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

const mapStateToProps = ({ profile, authentication }) => ({
  profile,
  authentication,
});

export default withRouter(
  connect(mapStateToProps, { actionCreator })(UserProfile),
);
