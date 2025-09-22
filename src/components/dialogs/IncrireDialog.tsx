import { useEffect, useRef, useState } from "react";
import "./InscrireDialog.scss";
import { logo } from "@/utils/assets";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequestService from "@/services/RequestService";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  courseName: string;
  courseId: string;
}

const IncrireDialog = ({ open, onClose, courseName , courseId }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [formState, setFormState] = useState({ fullname: "", email: "", phone: "", courseName , courseId});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
  
    try {
      const requestService = RequestService.getInstance();
      
      const requestData = {
        requirements: {
          email: formState.email,
          name: formState.fullname,
          phonenumber: formState.phone,
          yearJoinedUni: (new Date()).getFullYear().toString(),
        },
        course: courseId,
        status: "pending",
        user: null,
        attachements:[]
      };
  
      await requestService.createRequest(requestData);
      
      setShowSuccess(true);
      handleClick();
      setFormState({ fullname: "", email: "", phone: "", courseName,courseId});
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1000);
    } catch (error) {
      setMessage("Une erreur s'est produite lors de l'envoi de votre inscription.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleClick = () => {
    toast.success('Merci pour votre soumission ! Nous vous appellerons plus tard.', {
      position: "bottom-center",
      autoClose: 10000,
      hideProgressBar: true,
      closeOnClick: true, 
      pauseOnHover: true, 
      draggable: true,
      progress: undefined, 
    });
  };

  return (
    <dialog open={open} className="incrire" ref={dialogRef}>
      <div className="dialog-container">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="content">
          <h4>S'inscrire</h4>
          <p>Entrez vos informations pour vous inscrire au cours.</p>
          {message && <p className="message">{message}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullname">Nom complet</label>
            <input
              type="text"
              id="fullname"
              placeholder="Entrez votre nom complet"
              value={formState.fullname}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Numéro de téléphone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Entrez votre numéro de téléphone"
              value={formState.phone}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Rejoindre le cours"}
            </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              zIndex: 10
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                transition: { type: "spring", duration: 0.5 }
              }}
            >
              <Check size={48} color="#22c55e" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer/>
    </dialog>
  );
};

export default IncrireDialog;
