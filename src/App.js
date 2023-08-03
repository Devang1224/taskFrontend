import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Signin from "./pages/signUp/Signin";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { taskContext } from "./helpers/TaskProvider";
import ErrorPage from "./pages/errorPage/ErrorPage";



function App() {

  const {userId} = useContext(taskContext);
  
  const ProtectedRoute = ({ children }) => {
    if (!userId || typeof userId === "undefined") {
      return <Navigate to="login" />;
    }
    return children;
  };


  return (
  
    <div className="App" >
    <BrowserRouter>
      <Routes>
        <Route path="/">
        <Route index element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Signin />} />
            <Route path="*" element={<ErrorPage/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );

}

export default App;
