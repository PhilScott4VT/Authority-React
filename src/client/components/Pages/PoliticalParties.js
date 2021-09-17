import React, { useContext, useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import PartyInfoService from "../../service/PartyService";
import Body from "../Structure/Body";
import { AlertContext } from "../../context/AlertContext";
import "../../css/politicalparties.css";
import { LinkContainer } from "react-router-bootstrap";
import PartyCard from "./PoliticalParties/partyCard";
import { UserContext } from "../../context/UserContext";
import { ClipLoader } from "react-spinners";

function PoliticalParties(props) {
  var { country } = useParams();
  var [parties, setParties] = useState([]);
  var { setAlert, setAlertType } = useContext(AlertContext);
  var { sessionData, playerData } = useContext(UserContext);
  var [mode, setMode] = useState("active");
  var [loading, setLoading] = useState(true);

  const switchMode = () => {
    if (mode == "active") {
      setMode("defunct");
      setLoading(true);
    }
    if (mode == "defunct") {
      setMode("active");
      setLoading(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      var fetchedParties = await PartyInfoService.fetchParties(country, mode);
      if (!fetchedParties.hasOwnProperty("error")) {
        setParties(fetchedParties);
        setLoading(false);
      } else {
        if (!sessionData.loggedIn) {
          props.history.push(`/`);
          setAlert("Country not found.");
        } else {
          setAlert(`Country not found. Defaulting to ${playerData.nation}`);
          setAlertType("warning");
          var fetchedParties = await PartyInfoService.fetchParties(playerData.nation, mode);
          setParties(fetchedParties);
        }
      }
    }
    fetchData();
  }, [country, mode]);

  if (!loading) {
    return (
      <Body middleColWidth="11">
        <br />
        <h2>Political Parties</h2>
        {mode == "active" && (
          <>
            <span>Parties that are currently operating (more than 0 active members)</span>
            <br />
            <button className="btn btn-danger" onClick={switchMode}>
              Switch To Defunct Parties
            </button>
          </>
        )}
        {mode == "defunct" && (
          <>
            <span>Parties that are currently defunct (0 active members)</span>
            <br />
            <button className="btn btn-danger" onClick={switchMode}>
              Switch To Active Parties
            </button>
          </>
        )}
        {sessionData.loggedIn && playerData.nation == country && (
          <>
            <br />
            <LinkContainer to="/createParty" style={{ marginTop: "3px" }}>
              <button className="btn btn-primary">Create Party</button>
            </LinkContainer>
          </>
        )}
        <hr />
        <div className="row justify-content-center">
          {parties.map((party, idx) => {
            return <PartyCard key={idx} party={party} />;
          })}
        </div>
      </Body>
    );
  } else {
    return (
      <Body>
        <ClipLoader />
      </Body>
    );
  }
}
export default withRouter(PoliticalParties);
