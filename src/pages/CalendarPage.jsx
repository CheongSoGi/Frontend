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
import { GrayButton } from "../components/Button";
import { Contents } from "../components/Contents";

export default function CalendarPage() {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [day, setDay] = useState(currentDate.getMonth() + 1);
  
//백에 보내줄 string 포맷팅(아직 사용 안함 백엔드에 "20231111"형태로 보내면 json받아옴)
  const [value, setValue] = useState(dayjs());
  const [grayButton, setGrayButton] = useState([]);
  const [checkButtons, setCheckButtons] = useState([]);
  const [jsonData, setJsonData] = useState([]); //백에서 받아온 json데이터 저장

    //오늘 날짜 기준으로 state 설정
 
    useEffect(() => {
        fetch(`http://13.209.254.86:8080/sobi/month/${year}/${month}`)
          .then((response) => response.json())
          .then((data) => setJsonData(data))
          .catch((error) => console.error(error));
          console.log(jsonData);
    },[year,month]);

        
    useEffect(() => {
      fetch(`http://13.209.254.86:8080/sobi/month/readDate/${year}/${month}/${day}/`)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));


      if (jsonData.length > 0) {
        console.log(value);
        //item.date.day === day
      const filteredData = jsonData.filter((item) => console.log(item.date.slice(-2)));
      const GrayButtons = filteredData.length > 0 ? (
        <GrayButton>{filteredData[0].date.slice(-2)} 일</GrayButton>
      ) : [];
      const checkButtons = filteredData.map((item) => (
        <Contents check={item.checking} content={item.sobiname}></Contents>
      ));
      setGrayButton(GrayButtons);
      setCheckButtons(checkButtons);
    } else {
      setGrayButton([]);
      setCheckButtons([]);
    }
  }, [value,jsonData,year,month,day]);

    const handleDateChange = (newValue) => {
      setValue(newValue);
      setYear(newValue.year()); // year 업데이트
      setMonth(newValue.month() + 1); // month 업데이트
      setDay(newValue.date()); // day 업데이트
};
//{"year":2021,"month":11,"day":11}

  return (
    <MainLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Title>달력 보기</Title>
        <DateCalendar
          value={value}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      {grayButton}
      {checkButtons}

      
    </MainLayout>
  );
}






