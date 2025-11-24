"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
}

export default function Dropdown({ trigger, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        {trigger(isOpen)}
      </div>
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {children}
      </div>
    </div>
  );
}
