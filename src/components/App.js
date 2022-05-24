import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../assets/styles/reset.css'

// import Header from "./Header";
// import Footer from "./Footer";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
// import HabitsScreen from "./HabitsScreen";
// import TodayScreen from "./TodayScreen";
// import HistoryScreen from "./HistoryScreen";


export default function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/cadastro" element={<RegisterScreen />} />
        {/* <Route path="/habitos" element={<HabitsScreen />} />
        <Route path="/hoje" element={<TodayScreen />} />  
        <Route path="/historico" element={<HistoryScreen />} />   */}
      </Routes>
    </BrowserRouter>
  );
}