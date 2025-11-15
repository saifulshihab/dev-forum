"use client";

import { UserType } from "@/generated/prisma";
import { DefaultSession } from "next-auth";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog";

type TSessionUser = {
  id?: string;
  provider?: string;
  accessToken?: string;
  type?: UserType | null;
} & DefaultSession["user"];

type TAuthContext = {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  requireAuth: () => boolean;
  user: TSessionUser | undefined;
};

const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isAuthLoading = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";
  const [user, setUser] = useState<TSessionUser | undefined>(undefined);

  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data.user);
    }
  }, [session.data?.user]);

  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      setOpen(true);
      return true;
    } else {
      setOpen(false);
      return false;
    }
  }, [isAuthenticated]);

  const handleSignIn = () => {
    router.push(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    setOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        requireAuth,
        isAuthLoading,
        isAuthenticated
      }}
    >
      {children}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign In Required</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            You need to sign in to perform this action. You will be returned to
            this page after signing in.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSignIn}>
              Sign In
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
