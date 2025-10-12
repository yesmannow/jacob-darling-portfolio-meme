import React from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/interactive/CustomCursor";
import ScrollToTop from "./components/utils/ScrollToTop";
import LogoIntro from "./components/animations/LogoIntro";
import BackgroundLogos from "./components/animations/BackgroundLogos";
import "./styles/globals.css";

const App: React.FC = () => (
  <div className="app">
    <LogoIntro />
    <BackgroundLogos />
    <CustomCursor />
    <ScrollToTop />
    <Header />
    <AppRouter />
    <Footer />
  </div>
);

export default App;