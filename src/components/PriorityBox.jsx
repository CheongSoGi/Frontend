import styles from "./PriorityBox.module.scss";
import { PriorityButton } from "./Button";
import { Contents } from "./Contents";

export const PriorityBox = (props) => {
  return (
    <div className={styles.container}>
      <PriorityButton>
        <span>{props.rank}{"순위"}</span>
      </PriorityButton>
      <Contents check={props.check} content={props.content}></Contents>
    </div>
  );
};
