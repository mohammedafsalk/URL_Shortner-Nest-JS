import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import toast, { Toaster } from "react-hot-toast";

export default function UserHome() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [urlList, setUrlList] = useState([]);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.details;
  });

  const id = user._id;
  async function handleLogout(e) {
    e.preventDefault();

    await axios.get("/auth/logout");
    dispatch({ type: "refresh" });
  }

  React.useEffect(() => {
    (async function () {
      const { data } = await axios.get("/user/allurls/" + id);
      if (!data.err) {
        setUrlList(data.urls);
      }
    })();
  }, [refresh]);
  async function handleSubmit(e) {
    e.preventDefault();

    let { data } = await axios.post("/user/url", {
      title,
      shortUrl: url,
      userId: id,
    });
    console.log(data);
    if (!data.err) {
      setRefresh(!refresh);
      toast.success("Successfully Created");
      setTitle("");
      setUrl("");
    } else {
      setErrMessage(data.message);
    }
  }

  const handleCopyUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard");
        toast.success("URL copied");
      })
      .catch((error) => {
        console.log("Failed to copy URL:", error);
        toast.error("Failed to copy URL");
      });
  };

  return (
    <div>
      <Toaster />
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0 login-section">
            <MDBCol md="6" className="url-form">
              <MDBCardBody className="d-flex flex-column url-home-body">
                <div className="logout" onClick={handleLogout}>
                  <MDBIcon fas icon="sign-out-alt" />
                  Logout
                </div>
                <div className="url-submit-form">
                  <div className="d-flex flex-row mt-2">
                    <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <div className="url-head d-flex flex-column">
                      <span className="h1 fw-bold mb-0">TinyURL</span>
                      <h6
                        className="fw-normal mt-2"
                        style={{ letterSpacing: "1px" }}
                      >
                        Trim, transform, and triumph with TinyURL
                      </h6>
                    </div>
                  </div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Paste Your Link here
                  </h5>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Title"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Paste your Link"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <MDBBtn
                    className="mb-4 px-5 url-button"
                    color="dark"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Submit
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6" className="home-url">
              <div className="url-text">
                <p className="fw-bold text-center ">Your Recent URLs</p>
              </div>
              {urlList ? (
                <div className="urls">
                  {urlList.map((item) => {
                    return (
                      <MDBCard className="w-100 home-url-card">
                        <MDBCardBody className="url-card">
                          <MDBCardTitle className="text-success">
                            {item.title}
                          </MDBCardTitle>
                          <div className="copy-url">
                            <div className="url-detials">
                              <MDBCardText className="card-text">
                                {item.longUrl}
                              </MDBCardText>
                              <MDBCardText className="card-detials">
                                created by {item.userId.name} on{" "}
                                {new Date(item.createdAt).toLocaleDateString()}.
                              </MDBCardText>
                            </div>
                            <div className="url-icons">
                              <MDBBtn
                                className="mb-1"
                                onClick={() => handleCopyUrl(item.longUrl)}
                              >
                                {" "}
                                Copy
                              </MDBBtn>
                            </div>
                          </div>
                        </MDBCardBody>
                      </MDBCard>
                    );
                  })}
                </div>
              ) : (
                <h4 className="text-center">No data availabe</h4>
              )}
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
