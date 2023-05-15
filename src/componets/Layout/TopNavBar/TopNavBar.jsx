/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-undef */

import React, { useState } from "react";
import "./header.css";
import {
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Dropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";
import { useLogout } from "../../../hooks/auth.hooks";
import { cleanLocalStorage } from "../../../utils";
import pageUrlGenerator from "../../../pages/pageUrlGenerator";
import Userpic from "./../../../assets/images/profile_img.png";
// import {
//   fetchUserProfileWithToken,
//   clearState,
// } from "../../../redux/userSlice";

export default function TopNavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const token = localStorage.getItem("urs-authtoken");

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  

  // useEffect(() => {
  //   dispatch(fetchUserProfileWithToken());
  // }, []);

  // const { isFetching, isError } = useSelector(userSelector);

  // useEffect(() => {
  //   if (isError) {
  //     dispatch(clearState());
  //     navigate("/");
  //   }
  // }, [isError]);

  // logout using react query
  const { mutateAsync: logout } = useLogout();

  const onSignOut = async () => {
    try {
      cleanLocalStorage();
      window.location.href = `${window.location.origin}`;

      // login api not working properly therefore I have did it as above. but following is the correct way to 
      if (isEmpty(token)) {
        cleanLocalStorage();
        window.location.href = `${window.location.origin}`;
      } else {
        const res = await logout();
        if (res.status) {
          toast.success(res.message);
          cleanLocalStorage();
          window.location.href = `${window.location.origin}`;
        } else {
          toast.error(res.message);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };

  const { fullname, avatar } = useSelector((state) => ({
    fullname: state.user.fullname,
    avatar: state.user?.authUser?.profile_image?.thumb,
  }));
  return (
    <div>
      <Row className='main_header'>
        <Col xs='3' lg='3'>
          <NavbarBrand href='/' className='company_name'>
            ABC Company
          </NavbarBrand>
        </Col>
        <Col xs='9' lg='9'>
          <div className='header_right_wrap'>
            <div className='user_dropdown'>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                  <span className='user_name'>{fullname ? fullname : "Mr Jone Broker"}</span>
                  <div className='user_profile_pic'>
                    <img src={avatar ? avatar : Userpic} />
                  </div>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      navigate(pageUrlGenerator.editProfile());
                    }}
                  >
                    Edit Profile
                  </DropdownItem>
                  <DropdownItem onClick={onSignOut}>Sign Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
