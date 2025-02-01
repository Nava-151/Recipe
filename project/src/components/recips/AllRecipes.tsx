
import { Link } from "react-router-dom";
import Recipe from "../../type/Recipe";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchRecipes } from "../../store/RecipeSlice";
import { Box, Typography } from "@mui/material";
import ReciepeDisplay from "./RecipeDesplay";

const AllRecipes = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchRecipes());
    }, [dispatch]);

    const recipesList: Recipe[] = useSelector((state: RootState) => state.recipes.list);

    return (
        <>
            <Box sx={{ display: 'flex', height: '100vh', margin: "7%", backgroundColor:"white", opacity: 0.9 }}>

                <Box width={'100%'}>
                    <ReciepeDisplay/>
                </Box>

                <Box sx={{ width: '15%', padding: 2, borderLeft: '1px solid #ccc' }}>
                    <Typography variant="h6">My Recipes List:</Typography>
                    {recipesList.map(recipe => (
                        <Link key={recipe.id} to={`/all/${recipe.id}`}>
                            <hr />
                            {recipe.title}
                        </Link>
                    ))}
                </Box>

            </Box>

        </>
    );
};

export default AllRecipes;
