import "./Home.scss";
import { Navigate } from "react-router-dom";

function Home() {
  
  let isSetup = false;

  return (
    <div className="Home">
      {!isSetup && <Navigate to="/welcome" />}
      Home
    </div>
  );
}

export default Home;
