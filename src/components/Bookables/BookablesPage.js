import { Route, Routes } from "react-router-dom";
import { lazy } from "react";


const BookablesView = lazy(() => import("./BookablesView")) ;
const BookableEdit = lazy(() => import("./BookableEdit"));
const BookableNew = lazy(() => import("./BookableNew"));

export default function BookablesPage(){
    return(
        <Routes>
            <Route path="/:id" element={<BookablesView />} />

            <Route path="/" element={<BookablesView />} />

            <Route path="/:id/edit" element={<BookableEdit />} />

            <Route path="/new" element={<BookableNew />} />
        </Routes>
    )
}