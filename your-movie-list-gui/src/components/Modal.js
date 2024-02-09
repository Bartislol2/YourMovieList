import { Dialog, DialogTitle, TextField, DialogActions, DialogContent, DialogContentText, Button } from "@mui/material";
import React from 'react';
import { useState } from "react";
import "../css/modal.css"
import StarRating from "./StarRating";
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

//styles
const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif'
    }
})

const Modal = (props) => {
    const[openModal, setOpenModal] = useState(false)
    const movieId = props.movieId
    const review = props.review
    const[rating, setRating] = useState(review?review.rating:0)
    const[reviewText, setReviewText] = useState(review?review.review:null)
    const[error, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState(null)

    
    const onChange = (e) => {
        setReviewText(e.target.value)
    }

    const onClose = () => {
        setRating(0)
        setReviewText(null)
    }


    const onCreate = () => {
        fetch(`insert api url here/reviews`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                movieId: movieId,
                username: localStorage.getItem("username"),
                rating: rating,
                review: reviewText
            })
        })
        .then(response => {
            if(response.ok) {
                setOpenModal(false)
                window.location.reload()
            }
            else if(response.status === 400){
                setErrorMessage("You cannot have more than one review")
                setError(true)
            }
            else{
                throw new Error(response)
            }
        })
        .catch(err=>{
            setErrorMessage("An error has occurred while posting your review")
            setError(true)
        })
    }

    const onUpdate = () => {
        fetch(`insert api url here/reviews`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`,
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                id: review.id,
                movieId: review.movieId,
                username: localStorage.getItem("username"),
                rating: rating,
                review: reviewText
            })
        })
        .then(response => {
            if(response.ok) {
                setOpenModal(false)
                window.location.reload()
            }
            else if(response.status === 401){
                setErrorMessage("Unauthorized")
                setError(true)
            }
            else{
                throw new Error(response)
            }
        })
        .catch(err=>{
            setErrorMessage("An error has occurred while updating your review")
            setError(true)
        })
    }


    return ( 
        <React.Fragment>
            {!review && <div className="review-button-background">
                <div className="review-button" onClick={()=>setOpenModal(true)}>
                    <p>Add a review</p>
                 </div>
            </div>}
            {review &&
                <Button style={{minWidth: 100}} variant="contained" color="primary" onClick={()=>setOpenModal(true)}>
                    Update
                </Button> 
            }
            <ThemeProvider theme={theme}>
                <Dialog open={openModal} onClose={onClose}>
                    {!review && <DialogTitle>Create a review</DialogTitle>}
                    {review && <DialogTitle>Update a review</DialogTitle>}
                    <DialogContent>
                        <DialogContentText>
                            Leave a rating and let others on your opinion about the movie!
                        </DialogContentText>
                        <StarRating rating={rating} setRating={setRating}/>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="review"
                            label="Review"
                            multiline
                            defaultValue={reviewText}
                            rows={4}
                            fullWidth
                            variant="outlined"
                            onChange={onChange}
                        />
                        {error &&
                            <DialogContentText style={{color: "#ff0000", textAlign: "center"}}>
                                {errorMessage}
                            </DialogContentText> 
                        }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setOpenModal(false)}>Cancel</Button>
                            {!review && <Button style={{fontWeight: "bold" }} onClick={()=>onCreate()} disabled={rating===0 || !reviewText}>Create</Button>}
                            {review && <Button style={{fontWeight: "bold" }} onClick={()=>onUpdate()} disabled={rating===0 || !reviewText}>Update</Button>}
                        </DialogActions>
                </Dialog>
            </ThemeProvider>
        </React.Fragment>
        );
}
 
export default Modal;