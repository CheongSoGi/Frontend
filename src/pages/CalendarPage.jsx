import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Title } from "../components/Title";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dummyData from '../utils/dummyData.json';
import { PriorityButton } from "../components/Button";
import { Contents } from "../components/Contents";

export default function CalendarPage() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    //백에 보내줄 string 포맷팅(아직 사용 안함 백엔드에 "20231111"형태로 보내면 json받아옴)
    const currentDate = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
    const [value, setValue] = useState(dayjs());
    const [priorityButtons, setPriorityButtons] = useState([]);
    const [checkButtons, setCheckButtons] = useState([]);
    //오늘 날짜 기준으로 state 설정
 
    useEffect(() => {
        fetch("http://13.209.254.86:8080/sobi/readAll")
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));


        //dummyData는 json으로 받아온다고 가정, utils/dummyData.json에 있음
        //백에서 받은 json이용해서 날짜 파싱(어차피 특정일 선택은 한번만 해도 되므로 딱 한번만)
        const priorityButton =
            <PriorityButton>{dummyData[0].data.day}일</PriorityButton>
        //map iterator돌리면서 받아온 json에서 checking여부와, sobiname추출해서 표시
        const checkButtons = dummyData.map((item) => (
            <Contents check={item.checking} content={item.sobiname}></Contents>
        ));
        //state로 선언해둔 버튼들 useEffect시 동적 생성되도록 설정
        setPriorityButtons([priorityButton]);
        setCheckButtons(checkButtons);
      }, [value]);

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Title>달력 보기</Title>
        <DateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider>
      {priorityButtons}
      {checkButtons}

      //이렇게 하면 동적으로 버튼들 생성됨!
      
    </MainLayout>
  );
}






