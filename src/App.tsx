import React from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import "./styles/globals.css";

const App: React.FC = () => (
  <div className="app">
    <Header />
    <AppRouter />
    <Footer />
  </div>
);

export default App;