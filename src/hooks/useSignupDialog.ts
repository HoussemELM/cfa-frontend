// filepath: /Users/mac/myprojects/cfa-frontend/src/hooks/useSignupDialog.ts
import { useState } from 'react';

/**
 * Custom hook to manage the signup dialog state
 * @returns Object containing the dialog state and functions to open/close it
 */
export const useSignupDialog = () => {
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);

  const openSignupDialog = () => setIsSignupDialogOpen(true);
  const closeSignupDialog = () => setIsSignupDialogOpen(false);

  return {
    isSignupDialogOpen,
    openSignupDialog,
    closeSignupDialog
  };
};