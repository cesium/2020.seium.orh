import React, { useState } from "react";
import styles from "style.module.css";
import windowDimensions from "../utils/WindowDimensions";

const Button = (props) => {
  let { width } = windowDimensions();

  // let [content, setContent] = useState(props.children);
  let buttonProps = () => {
    if (width >= 1200) {
      return { horizontal: "55px", vertical: "17px", size: "12px" };
    } else if (width >= 992) {
      return { horizontal: "50px", vertical: "15px", size: "10px" };
    } else if (width >= 768) {
      return { horizontal: "40px", vertical: "13px", size: "8px" };
    } else {
      return { horizontal: "30px", vertical: "11px", size: "8px" };
    }
  };

  if (props.children.length === 0) {
    return <div style={{ display: "none" }}></div>;
  }

  let buttonStyle =
    props.children.length <= 3
      ? {
          // display:'flex',
          justifyContent: "center",
          backgroundColor: props.background,
          border: "rgba(255,255,255,0.1) 1px solid",
          borderRadius: "40px",
          padding: "0px 16px 3px",
          fontSize: "18px",
          minWidth: "48px",
        }
      : {
          display: "inline-block",
          backgroundColor: props.background,
          border: "rgba(255,255,255,0.1) 1px solid",
          borderRadius: "40px",
          paddingTop: buttonProps().vertical,
          paddingBottom: buttonProps().vertical,
          paddingLeft: buttonProps().horizontal,
          paddingRight: buttonProps().horizontal,
          fontSize: buttonProps().size,
        };

  // if (props.children === "+" && !props.clickDisabled) {
  //   return (
  //     <div
  //       onClick={() => {
  //         if (content === "+") setContent("-");
  //         else setContent("+");
  //       }}
  //       className="button"
  //       style={{ ...buttonStyle, ...props.style }}
  //     >
  //       {content}
  //     </div>
  //   );
  // }

  return (
    <div
      onClick={props.onClick}
      className={styles.button}
      style={{ ...buttonStyle, ...props.style }}
    >
      {props.children}
    </div>
  );
};

export default Button;
