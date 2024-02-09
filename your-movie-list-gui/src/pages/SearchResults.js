import { useLocation, useNavigate } from "react-router-dom";
import "../css/searchresults.css"
import { useState, useEffect } from "react";
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

//styles
const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand, sans-serif'
    },
    
})

//column metadata
const columns = [
    { id: 'poster', label: 'Movie poster', align: 'center'},
    { id: 'name', label: 'Movie name', align: 'center' },
    {
      id: 'length',
      label: 'Length',
      align: 'center',
    }
  ];


const SearchResults = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query')
    const[movies, setMovies] = useState(null)
    const[pending, setPending] = useState(true)
    const[error, setError] = useState(false)
    const[errorMessage, setErrorMessage] = useState(null)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const navigate = useNavigate()

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    useEffect(() => {
        setError(false)
        setPending(true)
        fetch(`insert api url here/movies/name/${query}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else if(response.status === 404) {
                setError(true)
                setErrorMessage("No movies found")
                setPending(false)
            }
            else{
                throw new Error()
            }
        })
        .then(data => {
            setMovies(data)
            setPending(false)
        })
        .catch(() => {
            setError(true)
            setErrorMessage("An error has occurred while fetching movies")
            setPending(false)
        })
    }, [query]);

    return (
        <div className="search-results">
            {pending && <p>Loading...</p>}
            {!pending && error && <p>{errorMessage}</p>}
            {!pending && !error &&
                <ThemeProvider theme={theme}>
                    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
                        <TableContainer>
                        <Table stickyHeader aria-label="search results">
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
                            {movies
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((movie) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={movie.id} >
                                    {columns.map((column) => {
                                        const value = movie[column.id];
                                        if(column.id === 'poster'){
                                            return (
                                                <TableCell 
                                                    key={column.id} 
                                                    align={column.align} 
                                                    style={{maxWidth: 300}}
                                                    onClick={()=>navigate(`/movie/${movie.id}`)}>
                                                        <img 
                                                            src={`data:image/jpeg;base64, ${movie.poster}`}
                                                            className="movie-image" 
                                                            alt='movie' 
                                                            title={movie.name}
                                                        />
                                                </TableCell>
                                            );
                                        }
                                        return (
                                            <TableCell 
                                                key={column.id} 
                                                align={column.align} 
                                                style={{fontWeight: "bold", maxWidth: 300, overflow: 'hidden'}}
                                                onClick={()=>navigate(`/movie/${movie.id}`)}>
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
                            count={movies.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </ThemeProvider>
            }
        </div>
    );
}
 
export default SearchResults;