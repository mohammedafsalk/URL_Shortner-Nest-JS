import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import { MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Userhomepage from "./pages/Userhomepage";
import UserRedirect from "./pages/UserRedirect";

function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const { user, refresh } = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    (async function () {
      let { data } = await axios.get("/auth/checkLogin");
      if (!data.success) {
        dispatch({
          type: "user",
          payload: { login: false, details: null },
        });
      }
      dispatch({
        type: "user",
        payload: { login: data.loggedIn, details: data.user },
      });
    })();
  }, [refresh]);

  return (
    <MDBContainer fluid>
      <div className="app">
        <Routes>
          {user.login && (
            <>
              <Route path="/" element={<Userhomepage />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
              <Route path="/:id" element={<UserRedirect />} />
            </>
          )}

          {user.login === false && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </MDBContainer>
  );
}

export default App;
