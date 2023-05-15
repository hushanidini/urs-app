import './Layout.css';
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import TopNavBar from './TopNavBar/TopNavBar';
import Footer from './Footer/Footer';
import useWindowSize from '../../hooks/useWindowWidth';
import useToggle from '../../hooks/useToggle';

function Layout({ children }) {
    const { width } = useWindowSize();
    // const { pathname } = useLocation();
    const [desktopCollaps, toggleDesktopCollaps] = useToggle(false);
    const [mobileOpen, toggleMobileOpen] = useToggle(false);
    const reqHistoryInitClose = React.useRef(false);
  
    // const feedCount = useSelector(state => state.notification);
    // const dispatch = useDispatch();
    // const { user } = useSelector(state => ({
    //   user: state.user,
    // }));
  
    // const {
    //     isLoading,
    //     isSuccess,
    //     isError: projectListLoadError,
    //   } = useProjectList(
       
    //     {
    //       refetchOnMount: false,
    //     },
    //   );
  
    useEffect(() => {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflow = 'auto';
    }, []);
  
  
    useEffect(() => {
  
      if (!desktopCollaps && !reqHistoryInitClose.current) {
        reqHistoryInitClose.current = true;
        toggleDesktopCollaps();
      }
  
      if (reqHistoryInitClose.current) {
        reqHistoryInitClose.current = false;
        if (desktopCollaps) {
          toggleDesktopCollaps();
        }
      }
    }, [desktopCollaps, toggleDesktopCollaps]);
  
    // if (isLoading) {
    //   return (
    //     <Row className="justify-content-center align-item-center h-vh-100">
    //       <Col className="my-auto">
    //         <Spinner variant="primary" animation="border" />
    //       </Col>
    //     </Row>
    //   );
    // }
  
    return (
      <>
        <TopNavBar
          className={!desktopCollaps ? 'desktop_expand' : 'desktop_shink'}
          toggleMobileSideNav={toggleMobileOpen}
        />
        <div className="mainContentContainer">
          <main className="d-flex flex-column dashboard">
          
  
            <div
              style={{
                minHeight: width < 992 ? 'calc(100vh - 88px)' : 'calc(100vh - 121px)',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: 12,
              }}
              className={classNames([
                'main_content_container',
                !desktopCollaps ? 'desktop_expand' : 'desktop_shink',
              ])}
            >
              {children}
              <Footer />
            </div>
          </main>
        </div>
      </>
    );
  }
  
  export default Layout;