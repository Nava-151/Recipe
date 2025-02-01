import { useForm } from "react-hook-form"
import { array, object, string } from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal, TextField, Button } from "@mui/material"
import { Box } from "@mui/system"
import { modalStyle } from "../../style/style"
import Errors from "./Errors"
import IngredientInput from "./IngredientInput"
import { addRecipe } from "../../store/RecipeSlice"
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
        debugger
        console.log("on submit" + user[0].address);
        const recipe: Recipe = {
            title: data.title,
            description: data.description,
            AutherId: user[0].userId,
            ingredients: data.ingredients,
            instructions: data.instructions
        }
        console.log(recipe);
        dispatch(addRecipe(recipe));
        setOpen(false);
    }

    const handleIngredientsChange = (newIngredients: string[]) => {
        setValue("ingredients", newIngredients);
    };
    console.log(user[0].address);

    return (
        <>
        
            <Modal open={open} onClose={() => setOpen(false)} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Box sx={modalStyle}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField label="title" type="text" {...register("title")} />
                        {errors.title && <Errors message={errors.title.message || " "} />}

                        <TextField label="description" type="text" {...register("description")} />
                        {errors.description && <Errors message={errors.description.message || " "} />}

                        <IngredientInput onIngredientsChange={handleIngredientsChange} />
                        {errors.ingredients && <Errors message={errors.ingredients.message || " "} />}

                        <TextField size="medium" label="instructions" type="text" {...register("instructions")}></TextField>
                        {errors.instructions && <Errors message={errors.instructions.message || " "} />}

                        <Button type="submit">Add</Button>
                    </form>
                </Box>
            </Modal >
        </>
    )
}
export default ReciepeForm


