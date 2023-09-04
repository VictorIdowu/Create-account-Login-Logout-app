import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  const forLogOut = props.sure;
  const forDelete = props.yes;
  const action = forLogOut ? props.logOut : props.onClose;

  const btnFill = forLogOut ? "Logout" : "OK";
  return (
    <div className={classes.modal}>
      <div>
        <h3>{props.msg}</h3>
        {forLogOut && (
          <div className={classes.action}>
            {!forDelete && <button onClick={action}>{btnFill}</button>}
            {forDelete && <button onClick={props.delete}>Delete</button>}

            <button className={classes["cancel-btn"]} onClick={props.onClose}>
              Cancel
            </button>
          </div>
        )}
        {!forLogOut && <button onClick={props.onClose}>{btnFill}</button>}
      </div>
    </div>
  );
};

const portalEl = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            props.onRetry();
          }}
        />,
        portalEl
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={() => {
            props.onRetry();
          }}
          msg={props.msg}
          sure={props.youSure}
          logOut={props.logOut}
          delete={props.delete}
          yes={props.yes}
        />,
        portalEl
      )}
    </Fragment>
  );
};

export default Modal;
