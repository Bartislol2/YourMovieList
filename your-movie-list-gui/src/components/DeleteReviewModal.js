import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import React from "react";


//styles
const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif'
    },
    
})

const DeleteReviewModal = (props) => {
    const reviewId = props.reviewId
    const[openDelete, setOpenDelete] = useState(false)
    const[error, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState(null)

    const handleDelete = () => {
        fetch(`insert api url here/reviews/${reviewId}`, 
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
            }
        }).then((response) => {
            if(response.ok) {
                setOpenDelete(false)
                window.location.reload()
            }
            else if(response.status === 401) {
                setErrorMessage("Unauthorized")
                setError(true)
            }
        }).catch((err)=>{
            setErrorMessage("An error has occurred while trying to delete your review")
            setError(true)
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Button style={{minWidth: 100}} variant="contained" color="error" onClick={()=>setOpenDelete(true)}>
                    Delete
                </Button>
                <Dialog
                    open={openDelete}
                    aria-labelledby="delete-dialog-title"
                    aria-describedby="delete-dialog-description"
                >
                    <DialogTitle id="delete-dialog-title">
                        {"Delete review?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="delete-dialog-description">
                            Are you sure you want to delete this review? You cannot revert this change.
                        </DialogContentText>
                            {error &&
                                <DialogContentText style={{color: "#ff0000", textAlign: "center"}}>
                                    {errorMessage}
                                </DialogContentText> 
                            }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>setOpenDelete(false)}>Cancel</Button>
                        <Button sx = {{fontWeight: 'bold'}} onClick={handleDelete} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </ThemeProvider>
     );
}
 
export default DeleteReviewModal;