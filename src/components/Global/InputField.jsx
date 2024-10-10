import React from "react";
import { styles } from "../../styles/styles";

const InputField = ({
  labelName,
  inputType,
  inputName,
  inputValue,
  onchange,
  placeholder,
  labeltext,
  max,
}) => {
  return (
    <div className="w-full flex flex-col items-start gap-y-2">
      <label htmlFor="" className="text-[13px] font-medium">
        {labelName} <span className="text-[#606060]">{labeltext}</span>
      </label>
      <input
        type={inputType}
        name={inputName}
        value={inputValue}
        onChange={onchange}
        maxLength={max}
        placeholder={placeholder}
        className={`w-full ${styles.bodyBg} h-[60px] px-4 rounded-lg outline-none`}
      />
    </div>
  );
};

export default InputField;
