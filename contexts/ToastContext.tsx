"use client";

import * as Toast from "@radix-ui/react-toast";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import styles from "./Toast.module.scss";

// Estrutura de um toast
interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: "success" | "error" | "info";
}

// Contexto para expor a função de mostrar o toast
interface ToastContextType {
  showToast: (
    title: string,
    options?: { description?: string; type?: ToastMessage["type"] }
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provedor do Toast
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (
      title: string,
      options: { description?: string; type?: ToastMessage["type"] } = {}
    ) => {
      const { description, type = "info" } = options;
      const id = new Date().toISOString();
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, type },
      ]);
    },
    []
  );

  const handleOpenChange = (id: string, open: boolean) => {
    if (!open) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider swipeDirection="right" swipeThreshold={200} label="Notificação">
        {toasts.map(({ id, title, description, type }) => (
          <Toast.Root
            key={id}
            className={`${styles.toastRoot} ${styles[type]}`}
            open={true}
            onOpenChange={(open) => handleOpenChange(id, open)}
            duration={5000}
          >
            <div className={styles.toastHeader}>
              <Toast.Title className={styles.toastTitle}>{title}</Toast.Title>
              <Toast.Close />
            </div>
            {description && (
              <Toast.Description className={styles.toastDescription}>
                {description}
              </Toast.Description>
            )}
          </Toast.Root>
        ))}
        <Toast.Viewport className={styles.toastViewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

// Hook customizado para usar o toast facilmente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider.");
  }
  return context;
};
