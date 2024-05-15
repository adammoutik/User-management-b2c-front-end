import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <CookiesProvider>
    <Routes>
      
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
    </CookiesProvider>
  );
}

export default App;
