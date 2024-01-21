import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountList from "./pages/accountList/AccountList";
import CandidateRegister from "./pages/candidateRegister/CandidateRegister";
import ElectionCommision from "./pages/electionCommision/ElectionCommision";
import VoterRegister from "./pages/voterRegister/VoterRegister";
import Wallet from "./components/wallet/Wallet";
import Loader from "./Loader";

function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(true);
  const saveAccount = (address) => {
    setAccount(address);
  };

  useEffect(() => {
   
    setTimeout(() => {
      setLoading(false); 
    }, 2000); 
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: <AccountList saveAccount={saveAccount} /> },
    { path: "/candidate", element: <CandidateRegister account={account} /> },
    { path: "/voter", element: <VoterRegister account={account} /> },
    {
      path: "/election-commision",
      element: <ElectionCommision account={account} />,
    },
  ]);

  return (
    <>
    <Wallet>
      {loading ? (
        // Loader component
        <Loader/>
      ) : (
        // Main content when loading is complete
        <RouterProvider router={router}></RouterProvider>
      )}
    </Wallet>
  </>

  );
}

export default App;
