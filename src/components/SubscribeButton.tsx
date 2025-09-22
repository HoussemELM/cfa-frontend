import React from 'react';
import { useSignupDialog } from '../hooks/useSignupDialog';
import SignupDialog from './dialogs/SingupDialog';
import './SubscribeButton.scss';

interface SubscribeButtonProps {
  className?: string;
  text?: string;
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({ 
  className = '', 
  text = 'S\'inscrire',
  variant = 'primary',
  icon
}) => {
  const { isSignupDialogOpen, openSignupDialog, closeSignupDialog } = useSignupDialog();

  return (
    <>
      <button 
        className={`subscribe-button ${variant} ${className}`} 
        onClick={openSignupDialog}
      >
        {icon && <span className="button-icon">{icon}</span>}
        {text}
      </button>
      
      <SignupDialog 
        isOpen={isSignupDialogOpen} 
        onClose={closeSignupDialog} 
      />
    </>
  );
};

export default SubscribeButton;