import React, { useEffect, useState } from "react";
import axios from "axios";
import "./certificates.css";

const Certificates = () => {
  const [data, setData] = useState(null);
  const [item, setItem] = useState({ docType: "" });
  const [isAvailable, setAvailable] = useState(false);
  const { docType } = item;

  const handleChange = (e) => {
    e.persist();
    //     console.log(e.target.value);

    setItem((prevState) => ({
      ...prevState,
      docType: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${docType}`);
    const responseObject = { type: `${docType}` };
    axios
      .post("/student/reqDoc", responseObject, {
        headers: {
          "auth-token": localStorage.token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const fetchAllData = async () => {
    const headers = {
      headers: {
        "auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
    };
    const getCertificates = await axios.get(
      "/student/viewcertificate",
      headers
    );
    setData(getCertificates.data);
    console.log(typeof data === "string");
    if (typeof data === "string") {
      setAvailable(false);
    }
  };

  fetchAllData();

  return (
    <div className="certificates-student">
      <h3 className="p-3">Send a request for the type of document you need.</h3>
      <div className="card col-md-8 mx-auto p-3 shadow">
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault1"
                    value="Bonafide"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Bonafide Certificate
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="Last Sem Grade Report"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Last semester's grade report
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="Fee Receipt"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Fee Receipt
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault1"
                    value="Migration Certificate"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Migration Certificate
                  </label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="flexRadioDefault2"
                    value="Course Report"
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Course Summary/Report
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-50 mx-auto">
            Send Request
          </button>
        </form>
      </div>
      <h6 className="certificate-note p-3">
        Note: If the view certificate button is not visible, the admin hasn't
        uploaded the document that you requested for previously, Or no request
        has been sent to admin.
      </h6>
      <h4>
        Below are the Links to certificates that have been uploaded previously.
      </h4>
      {isAvailable === false ? (
        <div>No request sent to admin</div>
      ) : (
        <div>
          {data?.map((item, key) => {
            return (
              <div>
                <button type="submit" className="btn-lg btn-primary m-2 w-25">
                  <a
                    key={key}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-links"
                  >
                    {item.type}
                  </a>
                </button>
                <br />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Certificates;
