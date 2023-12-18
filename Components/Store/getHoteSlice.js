import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    idDoc: "",
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    hote: "",
    residences: "",
    reservations: "",
    affaire: "",
    nombreOccuper: "",
    
}


export const getHoteSlice = createSlice({
    name: "get_hote",
    initialState,
    reducers: {
        getHote: (state, actions) => {
            state.idDoc = actions.payload.idDoc
            state.nombreOccuper = actions.payload.nombreOccuper
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