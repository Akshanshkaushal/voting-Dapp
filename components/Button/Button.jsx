import Style from "./Button.module.css";
const Button = ({ btnName, handleClick, classstyles }) => (
  <button
    className={Style.button}
    type="button"
    onClick={handleClick}
    {...btnName}
  ></button>
);
