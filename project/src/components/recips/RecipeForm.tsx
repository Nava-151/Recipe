import { useForm } from "react-hook-form"
import { array, object, string } from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal, TextField, Button } from "@mui/material"
import { Box } from "@mui/system"
import { colorStyle, modalStyle } from "../../style/style"
import Errors from "./Errors"
import IngredientInput from "./IngredientInput"
import { addRecipe, fetchRecipes } from "../../store/RecipeSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import Recipe from "../../type/Recipe"
import { useContext, useState } from "react"
import { UserContext } from "../../App"

const schema = object().shape(({
    title: string().min(3).max(50).required(),
    description: string().min(10).notRequired(),
    ingredients: array().of(string().required()).required(),
    instructions: string().required()
}))



const ReciepeForm = () => {
    const user = useContext(UserContext);

    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const {
        formState: { errors },
        register,
        handleSubmit,
        setValue,
    } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data: any) => {
        const recipe: Recipe = {
            title: data.title,
            description: data.description,
            AutherId: user[0].userId,
            ingredients: data.ingredients,
            instructions: data.instructions
        }
        dispatch(addRecipe(recipe));
        dispatch(fetchRecipes());
        setOpen(false);
    }

    const handleIngredientsChange = (newIngredients: string[]) => {
        setValue("ingredients", newIngredients);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        ...modalStyle,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4, 
                        width: '400px', 
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2, 
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Title"
                            type="text"
                            {...register("title")}
                            fullWidth 
                        />
                        {errors.title && <Errors message={errors.title.message || " "} />}

                        <TextField
                            label="Description"
                            type="text"
                            {...register("description")}
                            fullWidth
                        />
                        {errors.description && <Errors message={errors.description.message || " "} />}

                        <IngredientInput onIngredientsChange={handleIngredientsChange} />
                        {errors.ingredients && <Errors message={errors.ingredients.message || " "} />}

                        <TextField
                            size="medium"
                            label="Instructions"
                            type="text"
                            {...register("instructions")}
                            fullWidth 
                        />
                        {errors.instructions && <Errors message={errors.instructions.message || " "} />}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={colorStyle} 
                        >
                            Add
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    )
}
export default ReciepeForm


