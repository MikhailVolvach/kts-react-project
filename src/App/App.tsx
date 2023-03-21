import React from "react";

import "./App.scss";

import RecipeListPage from "pages/RecipeListPage";
import RecipePage from "pages/RecipePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";

function App() {
    useQueryParamsStoreInit();

    return (
        <div className="app">
            <div className="app__container">
                <Routes>
                    <Route path="/" element={<RecipeListPage />} />
                    <Route path="/recipe">
                        <Route path=":id" element={<RecipePage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
