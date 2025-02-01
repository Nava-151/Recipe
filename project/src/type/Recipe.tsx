type Recipe = {

    id?: number,
    title: string,
    description: string,
    AutherId?: number,
    ingredients: string[],
    instructions: string

}
export default Recipe;