import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../wallet/Wallet";
import "./CandidateDisplay.css";




const CandidateDisplay = () => {
  const {contract} = useContext(WalletContext)
  const [list,setList] = useState([])
  useEffect(()=>{
    const getCandidateList = async()=>{
      const candidateInfo = await contract.methods.candidateList().call();
      setList(candidateInfo)
      // console.log(candidateInfo[1]);
    } 
    contract && getCandidateList()
  },[contract])
  
  return (
    <div className="table-container">
    <div className="candidate-box">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
      {list ? (list.map((candidate)=>{
        return (<tr key={candidate.candidateId}>
          <td>{candidate.name}</td>
          <td>{candidate.party}</td>
          <td>{candidate.votes}</td>
        </tr>)
      })):<p></p>}
        </tbody>
      </table>
      </div>
    </div>
  );
};
export default CandidateDisplay;
