import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navigation.css";
import ConnectedAccount from "./ConnectedAccount";

const Navigation = ({ account }) => {
  // const [hGlow, setHglow] = useState(false);
  // const [cGlow, setcglow] = useState(false);
  // const [vGlow, setvglow] = useState(false);
  // const [lGlow, setlglow] = useState(false);
  // function homeFun(){
  //   setHglow(true);
  //   setcglow(false);
  //   setvglow(false);
  //   setlglow(false);
  // }
  // function candidateFun(){
  //   setHglow(false);
  //   setcglow(true);
  //   setvglow(false);
  //   setlglow(false);
  // }
  return (
    <header>
      <nav>
        <div className="connected-account">
          <ConnectedAccount account={account} />
        </div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/candidate">
              Candidate
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/voter">
              Voter
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/election-commision">
              Election Commision
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
