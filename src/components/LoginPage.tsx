import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User } from "lucide-react";

interface LoginPageProps {
  onLogin: (role: string) => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role: string) => {
    // Mock authentication - in real app, this would validate credentials
    if (username && password) {
      onLogin(role);
    }
  };

  return (
    <div className="min-h-screen bg-gov-bg-light">
      {/* Government Header */}
      <header className="bg-gov-header text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Shield className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold">Government Member Management System</h1>
              <p className="text-blue-200">Secure Administrative Portal</p>
            </div>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-md shadow-xl border-gov-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gov-header">Administrator Login</CardTitle>
            <CardDescription>
              Please select your role and enter credentials to access the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gov-border focus:ring-gov-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gov-border focus:ring-gov-primary"
              />
            </div>
            
            <div className="pt-4 space-y-3">
              <Button
                onClick={() => handleLogin("admin1")}
                className="w-full bg-gov-primary hover:bg-gov-primary-light text-white"
                disabled={!username || !password}
              >
                <User className="w-4 h-4 mr-2" />
                Administrator Login
              </Button>
              
              <Button
                onClick={() => handleLogin("head1")}
                className="w-full bg-gov-secondary hover:bg-orange-600 text-white"
                disabled={!username || !password}
              >
                <Shield className="w-4 h-4 mr-2" />
                Head1 Login
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground pt-4 border-t">
              <p>Demo credentials: Use any username/password combination</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;