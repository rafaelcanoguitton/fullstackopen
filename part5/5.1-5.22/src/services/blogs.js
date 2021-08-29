import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const postBlog = async (newBlog, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const response = await axios.post(baseUrl, newBlog,config);
  console.log(response);
  return response.data;
};

export default { getAll, postBlog };
