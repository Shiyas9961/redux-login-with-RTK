import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import RequiredAuth from "./features/auth/RequiredAuth";
import Welcome from "./components/Welcome";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes  */}
        <Route index element={<Public/>}/>
        <Route path="login" element={<Login/>} />

        {/* Protected Routes */}
        <Route element={<RequiredAuth />}>
          <Route path="welcome" element={<Welcome />}/>
          <Route path="userslist" element={<UsersList/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
