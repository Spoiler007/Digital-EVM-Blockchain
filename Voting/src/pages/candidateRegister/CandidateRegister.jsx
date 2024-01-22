import { useContext } from "react";
import PropTypes from "prop-types";
import CandidateDisplay from "../../components/candidateDisplay/CandidateDisplay";
import Navigation from "../../components/navigation/Navigation";
import { WalletContext } from "../../components/wallet/Wallet";
import { toast } from "react-hot-toast";
import "./CandidateRegister.css";

const CandidateRegister = ({ account }) => {
  console.log(account)
  const {contract} = useContext(WalletContext);
  // console.log(contract)

  const candidateRegistration = async(e)=>{
    e.preventDefault();
    const name = document.querySelector("#name").value;
    const party = document.querySelector("#party").value;
    const age = document.querySelector("#age").value;
    const gender = document.querySelector("#gender").value;
    // console.log(name,party);
    const partyData = {
      party,
      gender
    }

    try{
      const res = await fetch("http://localhost:3000/api/candidate-verification",{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(partyData)
      })
      const data = await res.json()
      // console.log(data)
      if(data.message==="Gender and Party Are Valid"){
      
        await contract.methods.candidateRegister(name,party,age,gender).send({from:account,gas:480000})
        alert("Registration Successful")
      }
      else{
        alert("Registration Not Successful")
      }
    }
    catch(error){
console.log(error)
    }

  }

  return (
    <>
      <Navigation account={account} />
      <div className="reg-cand-wrapper">
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
        <div className="reg-img-wrapper">
          <h1>Welcome to Candidate Register</h1>
          <p>Make your votes count towards the voter you like</p>
          <img src="/register.png" width={300}></img>
        </div>
        <form className="can-reg-form" onSubmit={candidateRegistration}>
          <h3>Register</h3>
          <label htmlFor="name">Name</label>
          <input type="text" id="name"></input>

          <label className="label1" htmlFor="party">
            Party
          </label>
          <input type="text" id="party"></input>

          <label htmlFor="age">Age</label>
          <input type="text" id="age"></input>

          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender"></input>

          <button className="regBtn" type="submit">
            Register
          </button>
        </form>
      </div>
      <CandidateDisplay />
    </>
  );
};
CandidateRegister.propTypes = {
  account: PropTypes.node.isRequired,
};
export default CandidateRegister;
