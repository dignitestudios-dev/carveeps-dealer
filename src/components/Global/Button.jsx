import React from "react";
import { styles } from "../../styles/styles";

const Button = ({ onclick, text }) => {
  return (
    <button
      onClick={onclick}
      className={`${styles.bgOrange} text-white w-[300px] lg:w-[460px] h-[52px] font-bold text-base rounded-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
