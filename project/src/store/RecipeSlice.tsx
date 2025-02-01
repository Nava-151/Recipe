import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Recipe from "../type/Recipe";
import { useContext } from "react";
import { UserContext } from "../App";

export const fetchRecipes = createAsyncThunk('recipes/fetch', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:3000/api/recipes');
        return response.data as Recipe[];
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});


export const addRecipe = createAsyncThunk('recipes/add', async (recipe: Recipe, thunkAPI) => {
    console.log(recipe.AutherId + recipe.description + " " + recipe.title + " " + recipe.instructions + " " + "in add ");
    try {
        const response = await axios.post('http://localhost:3000/api/recipes', recipe, { headers: { "user-id": recipe.AutherId } });
        return response.data as Recipe;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { list: [] as Recipe[] },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.fulfilled,
                (state, action: PayloadAction<Recipe[]>) => {
                    console.log('succses')
                    state.list = [...action.payload]
                })
            .addCase(fetchRecipes.rejected,
                () => {
                    alert('failed in getting recipe something went worng :{')
                }
            )
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    console.log("sucsses");
                    state.list = [...state.list, { ...action.payload }]
                })
            .addCase(addRecipe.rejected,
                () => {
                    alert('failed in adding recipe something went worng :{')
                }
            )
    }
});

export default recipesSlice;