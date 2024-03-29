import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Movie from "./pages/Movie"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"
import ReviewPage from "./pages/ReviewPage"
import SearchResults from "./pages/SearchResults";

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className='content'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            <Route path="movie/:id" element={<Movie/>}/>
            <Route path="review/:id" element={<ReviewPage/>}/>
            <Route path="profile" element = {<Profile/>}/>
            <Route path="results"element={<SearchResults/>}/>
          </Routes>
        </div>
        <footer className="footer">
            <p>Author: Bartosz Gawryszewski</p>
            <p>All images were generated by Stable Diffusion AI</p>
          </footer>
      </div>
    </Router>
  );
}

export default App;
