import React from "react";

import WithLoader from "components/WithLoader";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import RecipePageStore from "store/RecipePageStore";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";

import RecipePageBody from "./components/RecipePageBody";
import RecipePageHeader from "./components/RecipePageHeader";

const RecipePage = () => {
    const { id } = useParams();
    const recipePageStore = useLocalStore(() => new RecipePageStore(`${id}/information`));

    React.useEffect(() => {
        recipePageStore.getRecipeList();
    }, [id, recipePageStore]);

    return (
        <div className={"recipe"}>
            <WithLoader loading={recipePageStore?.meta === Meta.loading}>
                <div className={"recipe__container"}>
                    <RecipePageHeader image={recipePageStore?.list[0]?.image} />
                    <RecipePageBody
                        title={recipePageStore?.list[0]?.title}
                        readyInMinutes={recipePageStore?.list[0]?.readyInMinutes}
                        aggregateLikes={recipePageStore?.list[0]?.aggregateLikes}
                        summary={recipePageStore?.list[0]?.summary}
                    />
                </div>
            </WithLoader>
        </div>
    );
};

export default observer(RecipePage);
