import React, { useEffect, useState } from 'react'
import './home.css';
import Navbar from '../navbar/Navbar';
import useData from '../../hooks/useData';
import axios from 'axios';

function Home() {
    const [postText, setPostText] = useState("");
    const [comment, setComment] = useState("");
    const { allPosts, setAllPosts } = useData();


    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        const url = "http://localhost:5000/home/";
        axios.get(url)
            .then((res) => {
                setAllPosts(res.data);
            })
            .catch(error => {
                console.log(error);
                alert("server is not started");
            })
    }

    const handleAllPost = () => {
        if (postText === "") {
            alert("please fill the input");
        }
        else {
            const url = "http://localhost:5000/home/";
            const currentDate = new Date();
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const formattedDate = day + ' / ' + month + ' / ' + year;
            const obj = {
                postText,
                photo: "https://images.pexels.com/photos/17821306/pexels-photo-17821306/free-photo-of-landscape-of-hills-and-mountains.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                liked: false,
                date: formattedDate,
                comments: ["first comment", "second comment", "third comment", "fourth comment"]
            }

            axios.post(url, obj)
                .then(() => {
                    allPosts.push(obj);
                    setPostText("");
                })
                .catch((err) => { console.log(err) });

            const formContainer = document.getElementById("formContainer");
            const container = document.getElementById("container");
            formContainer.style.display = "none";
            container.classList.remove("blur");
        }
    }

    const handleLike = (index) => {
        const updatedPosts = [...allPosts];
        updatedPosts[index].liked = !updatedPosts[index].liked;
        setAllPosts(updatedPosts);
    };


    const getPostData = () => {
        const container = document.getElementById("container");
        const formContainer = document.getElementById("formContainer");
        formContainer.style.display = "block";
        container.classList.add("blur");
    };

    const goBack = (event) => {
        const container = document.getElementById("container");
        const formContainer = document.getElementById("formContainer");
        if (event.target === container) {
            formContainer.style.display = "none";
            container.classList.remove("blur");
        }
    }

    const handleComment = (index) => {
        if (comment === "") {
            alert("Please write any comment")
        }
        else {
            allPosts[index].comments.push(comment);
            setComment("");
        }

    };

    const getCommentsData = () => {
        const container = document.getElementById("commentContainer");
        const commentsContainer = document.getElementById("commentsContainer");
        commentsContainer.style.display = "block";
        container.classList.add("blur");
    }
    const goBackForComment = (event) => {
        const container = document.getElementById("commentContainer");
        const commentsContainer = document.getElementById("commentsContainer");
        if (event.target === container) {
            commentsContainer.style.display = "none";
            container.classList.remove("blur");
        }
    }


    return (
        <div>
            <Navbar />
            <div className='body'>
                <div>
                    <ul>
                        <li className='side-bar'><i className="fa-regular fa-circle-user fa-xl"></i> {localStorage.getItem("userName")}</li>
                        <li className='side-bar'><i className="fa-solid fa-user-group fa-xl"></i> Friends</li>
                        <li className='side-bar'><i className="fa-solid fa-clock-rotate-left fa-xl"></i> Memories</li>
                        <li className='side-bar'><i className="fa-solid fa-bookmark fa-xl"></i> Saved</li>
                        <li className='side-bar'><i className="fa-solid fa-users fa-xl"></i> Groups</li>
                        <li className='side-bar'><i className="fa-solid fa-video fa-xl"></i> Video</li>
                        <li className='side-bar'><i className="fa-regular fa-calendar fa-xl"></i> Events</li>
                    </ul>
                </div>
                <div>

                    <div className='add-post'>
                        <div style={{ padding: "10px", marginBottom: "5px" }}>
                            <i className="fa-regular fa-circle-user fa-2xl"></i> &nbsp;&nbsp;
                            <span onClick={getPostData} className='add-post-text'>What's on your mind, User?</span>
                            <div onClick={goBack} id='container'>
                                <div className="form-container" id="formContainer">
                                    <div className='add-post-form' id="myForm">
                                        <center>
                                            <h3>Create Post</h3>
                                        </center>
                                        <hr style={{ marginTop: "5px", marginBottom: "15px", borderTop: "1px solid #f0f0f0" }} />
                                        <i className="fa-regular fa-circle-user fa-2xl"></i> &nbsp;&nbsp;
                                        <span>{localStorage.getItem("userName")}</span> <br />
                                        <input className='post-text' id='post-text' onChange={e => setPostText(e.target.value)} value={postText} type="text" placeholder="What's on your mind, User?" />
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", marginBottom: "5px" }}>
                                            <span className='photo-form'>Photos: <input type="file" id="" /> </span>
                                            <span className='video-form'>Videos: <input type="file" id="" /></span>
                                        </div>
                                        <button onClick={handleAllPost} className='add-a-post'>Post</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr style={{ width: "95%", margin: "0 auto", borderTop: "1px solid #f0f0f0" }} />
                        <div className='add-post-type'>
                            <span className='add-pic-videos'>Live Video</span>
                            <span onClick={getPostData} className='add-pic-videos'>Photo/Video</span>
                            <span className='add-pic-videos'>Feeling/activity</span>
                        </div>
                    </div>

                    {allPosts.map((posts, index) => {
                        return (
                            <div key={index} className='post'>
                                <div className='post-details'>
                                    <div>
                                        <i style={{ marginTop: "16px" }} className="fa-regular fa-circle-user fa-2xl"></i></div>
                                    <div>
                                        <p className='post-user-name'>{localStorage.getItem("userName")}</p>
                                        <p className='date' id='date'>{posts.date}</p>
                                    </div>
                                </div>
                                <p style={{ margin: "4px" }}>{posts.postText}</p>
                                <div>
                                    <img className='post-image' src={posts.photo} alt="..." />
                                </div>
                                <hr style={{ width: "95%", margin: "0 auto", marginTop: "10px", borderTop: "1px solid #f0f0f0" }} />

                                {/* likes and comments  */}

                                <div className='like-comment'>

                                    {/* like */}
                                    <p style={{ color: posts.liked ? "blue" : "black" }}
                                        id='likeText'
                                        onClick={() => handleLike(index)} >
                                        <i id='like'
                                            style={{ color: posts.liked ? "blue" : "black" }} className="fa-regular fa-thumbs-up"></i>
                                        Like </p>

                                    {/* comments */}
                                    <p style={{ cursor: "pointer" }} onClick={getCommentsData}><i style={{ color: "black" }} className="fa-regular fa-comment"></i> Comment <sup>{posts.comments.length}</sup></p>
                                    <div onClick={goBackForComment} className='comment-container' id='commentContainer'>
                                        <div className="comments-container" id="commentsContainer">
                                            <div id="myForm">
                                                <div className='heading'>
                                                    <center>
                                                        <h3>{localStorage.getItem("userName")}'s Post</h3>
                                                    </center>
                                                    <hr style={{ marginTop: "5px", marginBottom: "15px", borderTop: "1px solid #f0f0f0" }} />
                                                </div>
                                                <div className='show-comments'>
                                                    {allPosts[index].comments.map((element) => {
                                                        return (
                                                            <div className='show-comment'>
                                                                <i style={{ marginTop: "20px", }} className="fa-regular fa-circle-user fa-xl"></i>
                                                                <div className='comments'>
                                                                    <p style={{ fontSize: "13px", fontWeight: "600" }}>{localStorage.getItem("userName")}</p>
                                                                    <p style={{ fontSize: "13px" }}>{element}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div style={{ marginTop: "25px", display: "flex" }}>
                                                    <span><i style={{ marginTop: "16px", }} className="fa-regular fa-circle-user fa-xl"></i></span>
                                                    <span className='comment'>
                                                        <input type="text"
                                                            id="comment"
                                                            className='comment-inp'
                                                            placeholder='Write a comment...'
                                                            onChange={e => setComment(e.target.value)}
                                                            value={comment} />
                                                        <i style={{ cursor: "pointer", marginTop: "10px", marginRight: "16px" }} onClick={() => handleComment(index)} className="fa-regular fa-paper-plane fa-lg"></i>
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr style={{ width: "95%", margin: "0 auto", marginTop: "10px", borderTop: "1px solid #f0f0f0" }} />

                                <div style={{ marginTop: "10px", display: "flex" }}>
                                    <span><i style={{ marginTop: "16px", }} className="fa-regular fa-circle-user fa-xl"></i></span>
                                    <span className='comment'>
                                        <input type="text"
                                            id="comment"
                                            className='comment-inp'
                                            placeholder='Write a comment...'
                                            onChange={e => setComment(e.target.value)}
                                            value={comment} />
                                        <i style={{ cursor: "pointer", marginTop: "10px", marginRight: "16px" }} onClick={() => handleComment(index)} className="fa-regular fa-paper-plane fa-lg"></i>
                                    </span>

                                </div>
                            </div>
                        )
                    })}

                </div>
                <div className='friends'>
                    <h3 style={{ marginBottom: "20px" }}>Contacts</h3>
                    <ul>
                        <li className='user-friend'><i className="fa-regular fa-circle-user fa-2xl"></i> User's Friend 1</li>
                        <li className='user-friend'><i className="fa-regular fa-circle-user fa-2xl"></i> User's Friend 1</li>
                        <li className='user-friend'><i className="fa-regular fa-circle-user fa-2xl"></i> User's Friend 1</li>
                        <li className='user-friend'><i className="fa-regular fa-circle-user fa-2xl"></i> User's Friend 1</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home
