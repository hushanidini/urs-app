import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "reactstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/index";

// import Login from "./pages/Auth/Login/Login";
// import Register from "./pages/Auth/Register/Register";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Profile from "./pages/Profile";
// import EditProfile from "./pages/Profile/EditProfile/EditProfile";
// import SuccessRegistered from "./pages/Auth/SuccessRegistered/SuccessRegistered";
import Router from "./Router";

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 300,
      }}
      role='alert'
    >
      <h2>Sorry,</h2>
      <p style={{ fontSize: 18 }}>Something went wrong</p>
      <Button onClick={resetErrorBoundary}>Try Refresh</Button>
    </div>
  );
}
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // staleTime: Infinity,
      },
    },
  });

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Router />
            {/* <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/edit-profile' element={<EditProfile />}></Route>
                <Route path='/success' element={<SuccessRegistered />}></Route>
              </Routes> */}
          </BrowserRouter>
          <ToastContainer autoClose={3500} />
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
