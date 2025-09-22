import { FaX } from "react-icons/fa6";
import { FaCheck, FaLock, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./SignupDialog.scss";
import logo from "../../assets/logo.png";

const SignupDialog = ({ onClose, isOpen }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="dialog-overlay" onClick={onClose}></div>
          <motion.dialog
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            open={isOpen}
            className="signup"
          >
            <div className="actions">
              <button onClick={onClose}><FaX /></button>
            </div>
            
            <div className="auth-container">
              <div className="logo-container">
                <img src={logo} alt="Logo" className="app-logo" />
              </div>
              
              <h2>Accédez à nos formations</h2>
              
              <div className="info-section">
                <p>Avant de pouvoir vous inscrire à une formation, créez votre compte gratuit pour :</p>
                
                <ul className="benefits-list">
                  <li>
                    <div className="icon-circle">
                      <FaCheck />
                    </div>
                    <span>Accéder à toutes nos formations financées</span>
                  </li>
                  <li>
                    <div className="icon-circle">
                      <FaCheck />
                    </div>
                    <span>Suivre votre progression personnalisée</span>
                  </li>
                  <li>
                    <div className="icon-circle">
                      <FaCheck />
                    </div>
                    <span>Obtenir des certifications reconnues</span>
                  </li>
                </ul>
              </div>
              
              <div className="auth-buttons">
                <a href="#" className="auth-btn login-btn">
                  <FaUser className="btn-icon" />
                  <span>Connectez-vous</span>
                </a>
                <a href="#" className="auth-btn signup-btn">
                  <FaLock className="btn-icon" />
                  <span>Créer un compte</span>
                </a>
              </div>
              
              <div className="terms-notice">
                En vous inscrivant, vous acceptez nos <a href="#">conditions d'utilisation</a> et notre <a href="#">politique de confidentialité</a>.
              </div>
              
              <div className="iframe-placeholder">
                {/* Placeholder for future iframe implementation */}
              </div>
            </div>
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default SignupDialog;