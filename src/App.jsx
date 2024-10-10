import { Route, Routes } from "react-router";
import "./App.css";
import { routes } from "./constants/routes";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        {routes.map((route, index) => {
          return <Route path={route.url} element={route.page} key={index} />;
        })}
        
      </Routes>
    </div>
  );
}

export default App;
