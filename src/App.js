/** @format */

import { Routes, Route, Navigate } from "react-router-dom";
import Listuser from "./components/users/Listuser";
import Createuser from "./components/users/Createuser";
import Edituser from "./components/users/Edituser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />{" "}
        {/* Redirect root to /users */}
        <Route path="/users" element={<Listuser />} />
        <Route path="/users/create" element={<Createuser />} />
        <Route path="/users/edit/:id" element={<Edituser />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

//for run
// npx json-server --watch db.json --port 4000
//npm run start
//Endpoints:
// http://localhost:4000/users
