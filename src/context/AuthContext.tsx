import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

//define authentication context object
interface AuthContextType {
  user: User | null;
  signInWithGitHub: () => void;
  signOut: () => void;
}

//creates a React context to share data across components.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//AuthProvider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  //checks existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    //Listen for auth state changes (e.g., login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    //cleanup : Unsubscribe when component unmounts
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGitHub = () => {
    supabase.auth.signInWithOAuth({ provider: "github" });
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGitHub, signOut }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

//custom Hook to simplify access of AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return context;
};
