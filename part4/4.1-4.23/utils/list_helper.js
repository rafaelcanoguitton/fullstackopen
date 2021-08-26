const dummy = (blogs) => {
  return 1;
};
const totalLikes=(blogs)=>{
  const reducer=(sum,item)=>{
    return sum + item.likes;
  }
  if(blogs.length===0){
    return 0;
  }
  return blogs.reduce(reducer,0);
}
module.exports = {
  dummy,
  totalLikes
};
