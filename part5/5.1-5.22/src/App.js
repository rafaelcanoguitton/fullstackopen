import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogout=async(event)=>{
    setUsername("");
    setPassword("");
    setUser(null);
    window.localStorage.removeItem('blogToken');
  }
  const handleLogin = async (event) => {
    console.log('i get here');
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log(user);
      setUser(user);
      setUsername(user.username);
      setPassword("");
      window.localStorage.setItem('blogToken',JSON.stringify(user))
    } catch (exepction) {
      console.log(exepction);
      //Implement set message
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
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{" "}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{" "}
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      
      <h2>blogs</h2>
      <div>{username} logged in <button onClick={handleLogout}>logout</button></div>
      <br/>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
