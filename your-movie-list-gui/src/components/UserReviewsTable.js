
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import Modal from './Modal';
import DeleteReviewModal from './DeleteReviewModal';

//styles
const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif'
    },
    
})

//column metadata
const columns = [
    { id: 'movieName', label: 'Movie title', align: 'center'},
    { id: 'rating', label: 'Rating', align: 'center' },
    {
      id: 'review',
      label: 'Review',
      align: 'center',
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
    }
  ];
  

const UserReviewsTable = (props) => {
    const reviews = props.reviews
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const[openModal, setOpenModal] = useState(false)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    
    return (
    <ThemeProvider theme={theme}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440}}>
            <Table stickyHeader aria-label="reviews table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell 
                            key={column.id}
                            align={column.align}
                            style={{fontWeight: "bold", color: "#ffffff", backgroundColor: "#0000ff"}}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                {reviews
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((review) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={review.id} >
                        {columns.map((column) => {
                            const value = review[column.id];
                            if(column.id === 'actions') {
                                return (
                                    <TableCell key={column.id} align={column.align} style={{ fontWeight: "bold" }}>
                                      <Modal openModal={openModal} setOpenModal={setOpenModal} review={review}/>
                                      <DeleteReviewModal reviewId = {review.id}/>
                                    </TableCell>
                                )
                            }
                            return (
                                <TableCell 
                                    key={column.id} 
                                    align={column.align} 
                                    style={{fontWeight: "bold", maxWidth: 300, overflow: 'hidden'}}
                                    onClick={()=>navigate(`/review/${review.id}`)}>
                                    {value}
                                </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={reviews.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
      </ThemeProvider>
    );
   

}

export default UserReviewsTable;