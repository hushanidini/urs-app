import React, { Suspense, lazy} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { useQueryClient } from 'react-query';
import { Spinner } from 'reactstrap';
import Layout from '../componets/Layout';
// import useUrlQueryParams from '../hooks/useUrlQueryParams';

function DashboardRouter() {
   
    const Profile = lazy(() => import(/* webpackPrefetch: true */ './Profile'));
    const EditProfile = lazy(() => import(/* webpackPrefetch: true */ './Profile/EditProfile/EditProfile'));

  
    return (
      <Layout>
        <Suspense
          fallback={
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Spinner variant="primary" animation="border" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      
      </Layout>
    );
  }
  
  export default DashboardRouter;