import React, { FC } from "react";
import OverallRoutes from "./route/route";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./context/context";

const App: FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <OverallRoutes />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
