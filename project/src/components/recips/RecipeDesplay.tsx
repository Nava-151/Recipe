import {  useParams } from "react-router";
import Reciepe from "../../type/Recipe";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux"
import Recipe from "../../type/Recipe";
import { Paper, Typography } from "@mui/material";
import { Box, Grid } from "@mui/system";

const ReciepeDisplay = () => {
    let currentRecipe: Recipe | undefined;
    const { id } = useParams();
    const reciepeList: Reciepe[] = useSelector((state: RootState) => state.recipes.list);
    if (id)
        currentRecipe = reciepeList.find(r => r.id == +id)

    return (
        <>
         
            <Box sx={{ width: '70%', height: '100vh', display: 'flex', padding: "10%" }}>
                <Box sx={{ flex: 3, backgroundColor: '#f0f0f0', padding: 2 }}>
                    {currentRecipe && (
                        <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                            <Typography variant="h5" gutterBottom>
                                {currentRecipe.title}
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                {currentRecipe.description}
                            </Typography>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Ingredients:
                            </Typography>
                            <Box component="ul" sx={{ paddingLeft: 2 }}>
                                {currentRecipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        <Typography variant="body2">{ingredient}</Typography>
                                    </li>
                                ))}
                            </Box>
                            <Typography variant="h6" sx={{ marginTop: 2 }}>
                                Instructions:
                            </Typography>
                            <Typography variant="body1">{currentRecipe.instructions}</Typography>
                        </Paper>)
                    }
                </Box>
                
            </Box>
        </>
    )
}
export default ReciepeDisplay

