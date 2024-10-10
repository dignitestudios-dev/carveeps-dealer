import React, { createContext, useState } from 'react';

export const DropdownState = createContext();

const ToggleStateContext  = ({ children }) => {
  const [state, setState] = useState(false);

  const toggleState = () => {
    setState(prevState => !prevState);
  };

  return (
    <DropdownState.Provider value={{ state, toggleState }}>
      {children}
    </DropdownState.Provider>
  );
};

export default ToggleStateContext ;
