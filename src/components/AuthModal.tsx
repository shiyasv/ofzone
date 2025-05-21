
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Demo login just closes the modal without actual authentication
    onClose();
  };

  const handleAdminLogin = () => {
    setEmail("shiyasv999@gmail.com");
    setPassword("shiyasv9048262120");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <LockKeyhole className="h-6 w-6 text-blue-600" />
          </div>
          <DialogTitle className="text-center text-xl">Welcome Back</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to access your Offzone account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <p className="text-xs text-right text-blue-500 hover:underline cursor-pointer">
                Forgot password?
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-col gap-2">
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Authenticating..." : "Sign in"}
            </Button>
            
            <div className="relative my-4 w-full">
              <Separator className="absolute inset-0 m-auto" />
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-xs text-muted-foreground">Quick access</span>
              </div>
            </div>
            
            <div className="flex gap-2 w-full">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
              >
                Admin Login
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleDemoLogin} 
                className="flex-1"
              >
                Demo User
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
