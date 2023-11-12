import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faCalendar,
  faStopwatch,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Nav.module.scss";
import chartImage from "../images/chart.png";
import moneyImage from "../images/money.png";
import calendarImage from "../images/cal.png";
import gearImage from "../images/gear.png";

export const NavItem = ({ to, image, text }) => {
  return (
    <li className={styles.item}>
      <Link to={to}>
        <p>{text}</p>
        <img src = {image} alt={text} width="25" height="25" />
        
      </Link>
    </li>
  );
};

export const NavBottom = () => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.container}>
        <NavItem to="/consume" image={moneyImage} text="소비 보기" />
        <NavItem to="/calendar" image ={ calendarImage} text="달력 보기" />
        <NavItem to="/period" image ={ chartImage} text="기간별 보기" />
        <NavItem to="/settings" image ={ gearImage}text="환경 설정" />
      </ul>
    </nav>
  );
};
