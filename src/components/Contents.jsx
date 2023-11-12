import styles from "./Contents.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleDot } from "@fortawesome/free-solid-svg-icons";

import { CheckButton } from "./Button";
<FontAwesomeIcon icon="fa-solid fa-square-check" />;
export const Contents = (props) => {
  return (
    <div className={styles.content}>
      {props.check ? (
        <CheckButton icon={faCheck} />
      ) : (
        <CheckButton icon={faCircleDot} />
      )}
      <p>{props.content}</p>
    </div>
  );
};
