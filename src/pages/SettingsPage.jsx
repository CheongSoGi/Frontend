import MainLayout from "../layouts/MainLayout";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../components/Title";
import { SettingButton } from "../components/Button";
import styles from "./SettingsPage.module.scss";
import { useState} from "react";
import { useEffect } from "react";
export default function SettingsPage() {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const handleSettingButtonClick = () => {
    setIsPopupVisible(true);console.log(isPopupVisible);
  };
  const handleClosePopup = () => {
    setIsPopupVisible(false);

    console.log(isPopupVisible);
    
  }
  const setting_info = [
    "이메일 연동",
    "결제 정보 연동",
    "엑셀 파일로 내보내기",
    "카테고리 설정",
    "달력 색상 설정",
    "모드 변경(Dark/Light)",
  ];
  const settings = Array.from({ length: setting_info.length }, (_, index) => (
    <SettingButton onClick = {handleSettingButtonClick}>{setting_info[index]}</SettingButton>
  ));

  return (
    <MainLayout>
      <Title>환경 설정</Title>
      <div className={styles.container}>{settings}</div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button onClick={()=>handleClosePopup()}>Close</button>
            <p>추후 서비스 제공 예정입니다</p>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
