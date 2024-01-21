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