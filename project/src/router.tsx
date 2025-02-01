import { createBrowserRouter } from "react-router";
import UserName from "./components/UserName";
import AllRecipes from "./components/recips/AllRecipes";
import ReciepeDisplay from "./components/recips/RecipeDesplay";
import RecipeForm from "./components/recips/RecipeForm";
import AppLayout from "./components/AppLayout";
import App from "./App";
import HomePage from "./components/user/HomePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <><AppLayout /></>,
        children: [
            { path: "all", element: <AllRecipes />, 
                children: [{ path: ":id", element: <ReciepeDisplay />, errorElement: <>Error</> }] 
            }
            , { path: "add", element: <RecipeForm />, errorElement: <>Error</> }
            , { path: "form", element: <RecipeForm />, errorElement: <>Error</> }
            ,{path: "home",element:<HomePage/> }
            
        ]
    }
])



