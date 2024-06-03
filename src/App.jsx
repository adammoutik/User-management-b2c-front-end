import { Dashboard, Auth } from "@/layouts";
import { CookiesProvider } from "react-cookie";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Navigate, Route, Router, Routes } from "react-router-dom";

function App() {
  
  return (
    <CookiesProvider>
        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
    </CookiesProvider>
  );
}

export default App;
