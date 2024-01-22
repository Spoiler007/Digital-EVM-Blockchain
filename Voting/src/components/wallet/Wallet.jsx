import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import ABI from "../../ABI/ABI.json";

const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3("HTTP://127.0.0.1:7545");
      const contractAddress = "0x120c7e012A2Da4e8a1a4d6F455517136fB18988F";
      //to create contract instance - abi and contract address
      const contract = new web3.eth.Contract(ABI, contractAddress);
      setState({ web3: web3, contract: contract });
    };
    init();
  }, []);

  return (
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
