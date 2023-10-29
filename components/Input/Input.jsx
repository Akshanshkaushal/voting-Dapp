import React, { useContext } from "react";
import Style from "./input.module.css";
import { ST } from "next/dist/shared/lib/utils";
const Input = ({ inputType, title, placeholder, handleClick }) => {
  return (
    <div className={Style.input}>
      <p>{title}</p>
      {inputType === "text" ? (
        <div className={Style.input_box}>
          <input
            type="text"
            className={Style.input_box_form}
            placeholder={placeholder}
            onChnage={handleClick}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Input;
