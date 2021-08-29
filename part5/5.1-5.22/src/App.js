import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/blogForm"
import Notification from "./components/Notification";
import Togglable from "./components/Togglable"
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message,setMessage]=useState("");
  const [title,setTitle]=useState("");
  const [author,setAuthor]=useState("");
  const [url,setUrl]=useState("");
  const [notification, setNotification]=useState("");
  const [style,setStyle]=useState("");
  const handleLogout=async(event)=>{
    setUsername("");
    setPassword("");
    setUser(null);
    window.localStorage.removeItem('blogToken');
  }
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername(user.username);
      setPassword("");
      window.localStorage.setItem('blogToken',JSON.stringify(user))
      setStyle('success');
      setMessage('Logged in successfully');
      setTimeout(() => {  setMessage(""); }, 4000);
    } catch (exepction) {
      setStyle('error');
      setMessage('Wrong username or password');
      setTimeout(() => {  setMessage(""); }, 4000);
    }
  };
  const handleCreate=async(event)=>{
    event.preventDefault();
    try{
      const blogToPost={
        title:title,
        author:author,
        url:url
      }
      console.log(user.token);
      const newBlog= await blogService.postBlog(blogToPost,user.token);
      setBlogs(blogs.concat(newBlog));
      setStyle('success');
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`);
      setTimeout(() => {  setMessage(""); }, 4000);
    } catch (exception){
      setStyle('error');
      setMessage(`The blog couldn't be added`);
      setTimeout(() => {  setMessage(""); }, 4000);
    }
  };
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('blogToken');
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON);
      setUser(user);
    }
  },[]);
  if (user === null) {
    return (
      <>
      <Notification 
      message={message}
      style={style}
      />
      <LoginForm 
      username={username}
      password={password}
      setPassword={setPassword}
      setUsername={setUsername}
      handleLogin={handleLogin}
      />
      </>
    );
  }
  return (
    <div>
      <Notification 
      message={message}
      style={style}
      />
      <h2>blogs</h2>
      <div>{username} logged in <button onClick={handleLogout}>logout</button></div>
      <br/>
      <Togglable buttonLabel={"New blog"}>
        <BlogForm 
          title={title}
          author={author}
          url={url}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
