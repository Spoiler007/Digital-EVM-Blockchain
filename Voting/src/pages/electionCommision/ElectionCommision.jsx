import { useContext, useEffect, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/wallet/Wallet";
import "./ElectionCommision.css";
import { toast } from "react-hot-toast";

const ElectionCommision = ({account}) => {
  const {contract} = useContext(WalletContext);
const [winner,setWinner] = useState("No Winner");

const dateToSecond = (dateTimeString)=>{
const date = new Date(dateTimeString);
// console.log("date",Math.floor(date.getTime() / 1000));
return Math.floor(date.getDate() / 1000);
}

const startVoting = async(e)=>{
  e.preventDefault();
  const startTime = document.querySelector("#start").value;
  const endTime = document.querySelector("#end").value;
  const startTimeSeconds = dateToSecond(startTime);
  const endTimeSeconds = dateToSecond(endTime);
  // console.log(startTimeSeconds,endTimeSeconds);
  

  const time = {
    startTimeSeconds,
    endTimeSeconds
  }

  try{
    const res = await fetch("http://localhost:3000/api/time-bound",{
    method:"POST",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(time)
    })
    const data = await res.json()
    // console.log(data)
    if(data.message==="Voting Timer Started"){  
      await contract.methods.voteTime(startTimeSeconds,endTimeSeconds).send({from:account,gas:480000})
      alert("Voting Started")
    }
    else{
      alert("Voting Time must be Less Than 24 hours")
    }
  }
  catch(error){
console.log(error)
  }


}

useEffect(()=>{
  const winnerInfo = async()=>{
    const winner = await contract.methods.winner().call();
    if(winner==="0x0000000000000000000000000000000000000000"){
      setWinner("No Winner")
    }
    else{

      setWinner(winner);
    }
  }
  contract && winnerInfo()
},[contract]);


const resultDeclare = async()=>{
 await contract.methods.result().send({from:account});
 alert("Result Declare");
}
const emergencyDeclare = async()=>{
 await contract.methods.emergency().send({from:account});
 alert("Emergency Declare");
}

  return (
    <>
      <div>
        <Navigation account={account} />
        <div className="election-wrapper">
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
          <h2>
            Winner is: {winner}<br />
          </h2>
          <form className="election-form" onSubmit={startVoting}>
            <label htmlFor="start">Start Time</label>
            <input type="datetime-local" id="start" required />

            <label htmlFor="end">End Time</label>
            <input type="datetime-local" id="end" required />

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
        <div className="admin-actions">
          <button className="emerBtn" onClick={emergencyDeclare}>
            Emergency
          </button>
          <button className="resultBtn" onClick={resultDeclare}>
            Result
          </button>
        </div>
      </div>
    </>
  );
};

ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};

export default ElectionCommision;