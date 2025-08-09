"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAccount } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await deleteAccount();
      await signOut();
      setConfirmText("");
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 px-4 py-3">
      <div className="rounded-md border border-dashed border-destructive p-3 px-4">
        <div className="flex flex-col items-start">
          <h2 className="text-lg font-bold">Account Deletion</h2>
          <p className="text-sm text-zinc-400">
            Permanently delete your account.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="mt-2"
              variant="destructive"
              isLoading={isLoading}
            >
              <Trash2 className="mr-1" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Deleting your account will remove
                all of your information from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex flex-col gap-2">
              <Label>Type `DELETE` to confirm</Label>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type here..."
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onConfirm}
                disabled={confirmText !== "DELETE"}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Page;
