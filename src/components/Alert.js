import React, { useContext } from "react";
import { FaWindowClose } from "react-icons/fa";
import { UserContex } from "../context/user";

export default function Alert() {
  const { alert, hideAlert } = useContext(UserContex);

  let css = "alert-container";
  if (alert.show) {
    css += " alert-show";
    if (alert.type === "danger") {
      css += " alert-danger";
    }
  }
  return (
    <div className={css}>
      <div className="alert">
        <p>{alert.show && alert.msg}</p>
        <button className="alert-close" onClick={hideAlert}>
          <FaWindowClose />
        </button>
      </div>
    </div>
  );
}
