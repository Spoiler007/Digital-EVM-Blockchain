import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/wallet/Wallet";
import Navigation from "../../components/navigation/Navigation";
import "./AccountList.css";

const AccountList = ({ saveAccount }) => {
  const { web3 } = useContext(WalletContext);
  const [account, setAccount] = useState("");
  useEffect(() => {
    const allAccounts = async () => {
      var select = document.getElementById("selectNumber");

      //array of accounts available in ganache
      var options = await web3.eth.getAccounts();

      for (var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
      }
    };
    web3 && allAccounts();
  }, [web3]);
  const selectAccount = async () => {
    let selectedAccountAddress = document.getElementById("selectNumber").value;
    setAccount(selectedAccountAddress);

    if (
      selectedAccountAddress &&
      selectedAccountAddress !== "Choose an account"
    ) {
      saveAccount(selectedAccountAddress);
    }
  };
  return (
    <div className="ac-list-wrapper">
      <Navigation account={account} />
      <div className="ac-list-container">
      <div className="back-all">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
	<defs>
	<radialGradient id="Gradient1" cx="50%" cy="50%" fx="0.441602%" fy="50%" r=".5"><animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(255, 0, 255, 1)"></stop><stop offset="100%" stop-color="rgba(255, 0, 255, 0)"></stop></radialGradient>
	<radialGradient id="Gradient2" cx="50%" cy="50%" fx="2.68147%" fy="50%" r=".5"><animate attributeName="fx" dur="23.5s" values="0%;3%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(255, 255, 0, 1)"></stop><stop offset="100%" stop-color="rgba(255, 255, 0, 0)"></stop></radialGradient>
	<radialGradient id="Gradient3" cx="50%" cy="50%" fx="0.836536%" fy="50%" r=".5"><animate attributeName="fx" dur="21.5s" values="0%;3%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(0, 255, 255, 1)"></stop><stop offset="100%" stop-color="rgba(0, 255, 255, 0)"></stop></radialGradient>
	<radialGradient id="Gradient4" cx="50%" cy="50%" fx="4.56417%" fy="50%" r=".5"><animate attributeName="fx" dur="23s" values="0%;5%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(0, 255, 0, 1)"></stop><stop offset="100%" stop-color="rgba(0, 255, 0, 0)"></stop></radialGradient>
	<radialGradient id="Gradient5" cx="50%" cy="50%" fx="2.65405%" fy="50%" r=".5"><animate attributeName="fx" dur="24.5s" values="0%;5%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(0,0,255, 1)"></stop><stop offset="100%" stop-color="rgba(0,0,255, 0)"></stop></radialGradient>
	<radialGradient id="Gradient6" cx="50%" cy="50%" fx="0.981338%" fy="50%" r=".5"><animate attributeName="fx" dur="25.5s" values="0%;5%;0%" repeatCount="indefinite"></animate><stop offset="0%" stop-color="rgba(255,0,0, 1)"></stop><stop offset="100%" stop-color="rgba(255,0,0, 0)"></stop></radialGradient>
	</defs>

	<rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)"><animate attributeName="x" dur="20s" values="25%;0%;25%" repeatCount="indefinite"></animate><animate attributeName="y" dur="21s" values="0%;25%;0%" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite"></animateTransform></rect>
	<rect x="-2.17916%" y="35.4267%" width="100%" height="100%" fill="url(#Gradient2)" transform="rotate(255.072 50 50)"><animate attributeName="x" dur="23s" values="-25%;0%;-25%" repeatCount="indefinite"></animate><animate attributeName="y" dur="24s" values="0%;50%;0%" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite"></animateTransform>
	</rect>
	<rect x="9.00483%" y="14.5733%" width="100%" height="100%" fill="url(#Gradient3)" transform="rotate(139.903 50 50)"><animate attributeName="x" dur="25s" values="0%;25%;0%" repeatCount="indefinite"></animate><animate attributeName="y" dur="12s" values="0%;25%;0%" repeatCount="indefinite"></animate><animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="9s" repeatCount="indefinite"></animateTransform>
	</rect>
	</svg>
  </div> 
      <div className="home-box">
        <img src="/hm.png" alt="voteGIF" autoPlay width={240} />
        <h1 className="ac-list-title">
          Revolutionalitised <span className="span">voting system</span>
          <br />
          through blockchain
        </h1>
        <form className="ac-list-form" id="myForm">
          <select
            className="innerBox"
            id="selectNumber"
            onChange={selectAccount}
            defaultValue=""
          >
            <option disabled value="">
              Choose an account
            </option>
          </select>
        </form>
        <p className="note">
          *Go to Menu: Register for New candidate & Voter for a standin person
        </p>
        </div>
      </div>
    </div>
  );
};
AccountList.propTypes = {
  saveAccount: PropTypes.func.isRequired, // Change PropTypes.node to PropTypes.func
};

export default AccountList;
