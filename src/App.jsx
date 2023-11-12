import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./styles/global.scss";

import NavLayout from "./layouts/NavLayout";

import HomePage from "./pages/HomePage";
import CalendarPage from "./pages/CalendarPage";
import ConsumePage from "./pages/ConsumePage";
import NotFoundPage from "./pages/NotFoundPage";
import PeriodPage from "./pages/PeriodPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>

        <Route path="/" element={<NavLayout />}>
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/period" element={<PeriodPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/consume" element={<ConsumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
