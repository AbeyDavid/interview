import "./App.css";
import { Routes, Route} from "react-router"
import { BrowserRouter } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import UsersHomePage from "./UsersHomePage";
import AdminHomePage from "./AdminHomePage";

function App() {
    return (
        <div style={{textAlign:"center"}}>
          <BrowserRouter>
            <Routes>
               <Route path="/" element={<Register/>} />
               <Route path="/login" element={<Login/>} />
               <Route path="/userHome" element={<UsersHomePage/>} />
               <Route path="/adminHome" element={<AdminHomePage/>} />
            </Routes> 
            </BrowserRouter>
        </div>
    );
}

export default App;
