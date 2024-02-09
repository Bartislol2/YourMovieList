import { useState, useEffect } from "react";
import "../css/profile.css"
import UserReviewsTable from "../components/UserReviewsTable";
const Profile = () => {
    const isLoggedIn = localStorage.getItem("jwtToken") !== null;
    const[hasReviews, setHasReviews] = useState(null);
    const[pendingReviews, setPendingReviews] = useState(true)
    const[error, setError] = useState(false)
    const[reviews, setReviews] = useState(null)

    useEffect(() => {
        fetch(`insert api url here/reviews/user/${localStorage.getItem("username")}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            else{
                throw new Error()
            }
        })
        .then(data => {
            if(data){
                setReviews(data)
                setHasReviews(true)
            }
            else {
                setHasReviews(false)
            }
            setPendingReviews(false)
        })
        .catch(() => {
            setError(true)
            setPendingReviews(false)
        })
    }, []);

    return (
        <div className="user-profile">
            {!isLoggedIn && 
                <h2>You're not currently logged in.</h2>
            }
            {isLoggedIn &&
                <div className="profile-contents">
                    <h2>Your username: {localStorage.getItem("username")}</h2>
                    <h2>Your reviews: </h2>
                    {pendingReviews && <p>Loading...</p>}
                    {!pendingReviews && error && <p>An error has occured while fetching your reviews</p>}
                    {!pendingReviews && !error &&
                        <div className="user-reviews">
                            {hasReviews &&
                                <UserReviewsTable reviews={reviews}/>
                            }
                            {!hasReviews &&
                                <p>You have no reviews</p>
                            }
                        </div>
                    }
                </div>

            }
        </div>
      );
}
 
export default Profile;