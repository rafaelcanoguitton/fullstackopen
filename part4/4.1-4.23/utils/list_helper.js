const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return -1;
  }
  let maxVal = blogs[0].likes;
  let maxIndex = 0;
  for (var i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > maxVal) {
      maxIndex = i;
      maxVal = blogs[i].likes;
    }
  }
  return blogs[maxIndex];
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
