import { useState } from "react";
import LoginPage from "@/components/LoginPage";
import MemberDashboard from "@/components/MemberDashboard";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const handleLogin = (role: string) => {
    setCurrentUser(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <MemberDashboard userRole={currentUser} onLogout={handleLogout} />;
};

export default Index;
