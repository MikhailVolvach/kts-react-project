import React from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";

import Recipes from "@pages/RecipeListPage";
import Recipe from "@pages/RecipePage";

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipe">
              <Route path=":id" element={<Recipe />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
