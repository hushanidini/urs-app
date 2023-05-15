import React, { useState } from "react";
import { Container, Row, Col, CardImg, Input } from "reactstrap";
import { useSelector } from "react-redux";
import "./Profile.css";
import Userpic from "./../../assets/images/profile_img.png";

const Profile = () => {
  const {
    userdetails,
    profileImage,
  } = useSelector(state => ({
    userdetails: state.user?.userdetails,
    profileImage: state.user?.userdetails?.profile_image?.thumb,
  }))
  const [avatar, setAvatar] = useState(null);

  // const dispatch = useDispatch();

  

//   useEffect(() => {
//     dispatch(fetchUserProfileWithToken());
//   }, []);

//  const { isFetching, isError } = useSelector(userSelector);

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(clearState());
  //     navigate("/");
  //   }
  // }, [isError]);
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
      <Container
        fluid
        className='d-flex justify-content-center align-items-center'
      >
        <div>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <div className='avatar-wrapper mb-3'>
                {avatar ? (
                  <CardImg
                    src={URL.createObjectURL(avatar)}
                    alt='Avatar'
                    className='avatar'
                  />
                ) : (
                  <CardImg src={profileImage? profileImage : Userpic} alt='Avatar' className='avatar' />
                )}
                <Input
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  className='avatar-input'
                />
              </div>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_title'>Welcome</h2>
              <h3 className='profile_sub_title'>{ 'Mr Jone Broker'}</h3>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_key_text'>Email Address</h2>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_value_text'>{'jon@gmail.com'}</h2>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_key_text'>Name</h2>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_value_text'>{'Jone Broker'}</h2>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_key_text'>Gender</h2>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_value_text'>{'Male'}</h2>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_key_text'>Date Of Birth</h2>
            </Col>
            <Col xs={12} md={6} lg={6}>
              <h2 className='profile_details_value_text'>{'31-07-1989'}</h2>
            </Col>
          </Row>
        </div>
      
      </Container>
  );
};

export default Profile;
