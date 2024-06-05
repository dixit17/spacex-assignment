import React from "react";
import "./App.css";
import LaunchContainer from "./component/launches/LaunchContainer";
const App: React.FC = () => {
  return (
    <div className="w-100 h-100 overflow-hidden">
      <main className="w-100 h-100">
        <LaunchContainer />
      </main>
    </div>
  );
};

export default App;
