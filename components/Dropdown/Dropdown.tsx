"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
}

export default function Dropdown({ trigger, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
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
        {React.Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(
              child,
              { closeDropdown } as { closeDropdown: () => void }
            );
          }
          return child;
        })}
      </div>
    </div>
  );
}
