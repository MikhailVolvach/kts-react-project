import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";

import Recipe from "../pages/Recipe/Recipe";
import Recipes from "../pages/Recipes/Recipes";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="App">
      <div className="App__container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipe">
              <Route path=":id" element={<Recipe />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
