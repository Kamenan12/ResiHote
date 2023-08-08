import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    idDoc: "",
    userhote: "",
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    hote: "",
    residencedences: "",
    reservations: "",
    affaire: ""
    
}


export const getHoteSlice = createSlice({
    name: "get_hote",
    initialState,
    reducers: {
        getHote: (state, actions) => {
            state.idDoc = actions.payload.idDoc
            state.userhote = actions.payload.user
            state.nom = actions.payload.nom
            state.prenom = actions.payload.prenom
            state.pseudo = actions.payload.pseudo
            state.email = actions.payload.email
            state.hote = actions.payload.hote
            state.residences = actions.payload.residences
            state.reservations = actions.payload.reservations
            state.affaire = actions.payload.affaire
        }
    }
})


export const {getHote} = getHoteSlice.actions

export default getHoteSlice.reducer