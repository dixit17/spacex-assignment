import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchContainer from "./component/launches/LaunchContainer";
const App: React.FC = () => {
  return (
    <div className="w-100 h-100 overflow-hidden">
      <main className="w-100 h-100">
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/launches" />} />
        <Route path="/launches" element={<LaunchContainer />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
      </main>
    </div>
  );
};

export default App;
