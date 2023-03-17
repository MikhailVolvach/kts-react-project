import React from "react";

import "./App.scss";

import Recipes from "pages/RecipeListPage";
import Recipe from "pages/RecipePage";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import { Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

function App() {
  useQueryParamsStoreInit();

  return (
    <div className="app">
      <div className="app__container">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/recipe">
            <Route path=":id" element={<Recipe />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
