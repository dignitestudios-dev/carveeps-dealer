import React, { createContext, useEffect, useState } from "react";

export const ModalContext = createContext();

export const ToggleProvider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (isToggled) {
      setState(true);
    }
  }, [isToggled, state]);

  const toggleState = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <ModalContext.Provider value={{ isToggled, toggleState, state, setState }}>
      {children}
    </ModalContext.Provider>
  );
};
