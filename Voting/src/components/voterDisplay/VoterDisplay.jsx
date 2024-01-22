import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./VoterDisplay.css";

const VoterDisplay = () => {

  const {contract} = useContext(WalletContext);
  const [voterlist,setVoterList] = useState([]);
  useEffect(()=>{
    const getVoterList = async()=>{
      const voterInfo = await contract.methods.voterList().call();
      console.log(voterInfo)
      setVoterList(voterInfo);
      // console.log(getVoterList[0])
    };
    contract && getVoterList();
  },[contract]);
  return (
    <div className="table-container">
    <div className="table-box">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {voterlist ? (voterlist.map((voter)=>{
            return(
              <tr key={voter.voterId}>
                <td>{voter.name}</td>
                <td>{voter.age}</td>
                <td>{voter.gender}</td>
              </tr>
            );
          })):<p></p>}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default VoterDisplay;
