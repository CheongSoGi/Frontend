import MainLayout from "../layouts/MainLayout";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../components/Title";
import { PeriodButton } from "../components/Button";
import { useState, useEffect } from "react";

import yearImage from "../images/year.png";
import monthImage from "../images/month.png";
import dayImage from "../images/day.png";

export default function PeriodPage() {
  const [jsonData, setJsonData] = useState([]);

  //현재 날짜 받아오기
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayYear = yesterday.getFullYear();
  const yesterdayMonth = yesterday.getMonth() + 1; // 월은 0부터 시작하므로 +1
  const yesterdayDay = yesterday.getDate();

  //백에 보내줄 string 포맷팅(아직 사용 안함 백엔드에 "20231111"형태로 보내면 json받아옴)
  const currentDate = `${todayYear}${todayMonth < 10 ? "0" : ""}${todayMonth}${
    todayDay < 10 ? "0" : ""
  }${todayDay}`;

  useEffect(() => {
    fetch("http://13.209.254.86:8080/sobi/readAll")
      .then((response) => response.json())
      .then((data) => {
        // 받아온 JSON 데이터를 상태에 저장
        setJsonData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  console.log(jsonData);

  // 오늘
  const sobiTodayList = jsonData.filter(
    (d) =>
      d.date.year === todayYear &&
      d.date.month === todayMonth &&
      d.date.day === todayDay
  );
  const sobiTodayTotal = sobiTodayList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("today Money:", sobiTodayTotal);

  // 이번 달
  const sobiCurMonthList = jsonData.filter(
    (d) => d.date.year === todayYear && d.date.month === todayMonth
  );
  const sobiCurMonthTotal = sobiCurMonthList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("cur month Money:", sobiCurMonthTotal);

  // 이번 년
  const sobiCurYearList = jsonData.filter((d) => d.date.year === todayYear);
  const sobiCurYearTotal = sobiCurYearList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("cur year Money:", sobiCurYearTotal);

  // 어제
  const sobiYesterdayList = jsonData.filter(
    (d) =>
      d.date.year === yesterdayYear &&
      d.date.month === yesterdayMonth &&
      d.date.day === yesterdayDay
  );
  const sobiYesterdayTotal = sobiYesterdayList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("yesterday Money:", sobiYesterdayTotal);
  // 저번 달
  const sobiLastMonthList = jsonData.filter(
    (d) =>
      d.date.month === (todayMonth === 1 ? 12 : todayMonth - 1) &&
      d.date.year === (todayMonth === 1 ? todayYear - 1 : todayYear)
  );
  const sobiLastMonthTotal = sobiLastMonthList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("Last month Money:", sobiLastMonthTotal);

  // 작년
  const sobiLastYearList = jsonData.filter(
    (d) => d.date.year === todayYear - 1
  );
  const sobiLastYearTotal = sobiLastYearList.reduce(
    (acc, item) => acc + item.money,
    0
  );
  console.log("Last year Money:", sobiLastYearTotal);

  return (
    <MainLayout>
      <Title>기간별 보기</Title>
      <PeriodButton
        image={yearImage}
        text="전 년 대비"
        prevConsume={sobiLastYearTotal}
        curConsume={sobiCurYearTotal}
      ></PeriodButton>
      <PeriodButton
        image={monthImage}
        text="전 월 대비"
        prevConsume={sobiLastMonthTotal}
        curConsume={sobiCurMonthTotal}
      ></PeriodButton>
      <PeriodButton
        image={dayImage}
        text="전 일 대비"
        prevConsume={sobiYesterdayTotal}
        curConsume={sobiTodayTotal}
      ></PeriodButton>
    </MainLayout>
  );
}
