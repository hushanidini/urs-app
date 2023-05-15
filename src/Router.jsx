/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfileWithToken} from "./redux/userSlice";
// import isEmpty from 'lodash/isEmpty';
// import { useGetProfileReq } from "./hooks/user.hooks";
import DashboardRouter from "./pages/DashboardRouter";
import PageOverlayLoader from "./componets/PageOverlayLoader";

const Login = React.lazy(() => import("./pages/Auth/Login/Login"));
const CreateAccount = React.lazy(() =>
  import("./pages/Auth/Register/Register")
);
const SuccessRegistered = React.lazy(() =>
  import("./pages/Auth/SuccessRegistered/SuccessRegistered")
);

function UnknownRouteFallback() {

  return <Navigate to={`/dashboard`} />;
}

function Router() {
  const token = localStorage.getItem("urs-authtoken");
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log('token', token)
  // const { isLoading } = useGetProfileReq({
  //   onSuccess: (data) => {
  //     dispatch(signupUser(data));
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  //   enabled: !!token && !user,
  // });



  // useEffect(() => {
  //   dispatch(fetchUserProfileWithToken());
  // }, []);



  // const routeChange = () =>{ 
  //   let path = `/`; 
  //   navigate(path);
  // }

  // React.useEffect(() => {
  //   if (isEmpty(token)) {
  //     routeChange();
  //   }
  // }, [token]);

  // if (isLoading) {
  //   return (
  //     <Row className='justify-content-center align-item-center h-vh-100'>
  //       <Col className='my-auto'>
  //         <Spinner variant='primary' animation='border' />
  //       </Col>
  //     </Row>
  //   );
  // }

  return (
    <Suspense fallback={<PageOverlayLoader />}>
      {user.access_token || token? (
        <Routes>
          <Route path='/dashboard/*' element={<DashboardRouter />} />
          <Route path='*' element={<UnknownRouteFallback />} />
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<Login />}></Route>

          <Route path='/register' element={<CreateAccount />} />
          <Route
            path='/success-registered'
            element={<SuccessRegistered />}
          ></Route>

          <Route path='*' element={<Navigate to={"/"} replace />} />
        </Routes>
      )}
    </Suspense>
  );
}

export default Router;
