import { FaArrowRight } from "react-icons/fa";
import "./BlogPostCard.scss";
export interface BlogPostCardType{
  img:string;
  date:Date;
  commentsCount:number;
  title:string;
}
const BlogPostCard = ({post}:{post:BlogPostCardType}) => {
  return (
    <article className="blog-post">
      <img src={post.img} alt="" />
      <div className="details">
        <div className="info">
          <span></span>
          <span>Comments({post.commentsCount})</span>
        </div>
        {post.title}
      </div>
      <button className="read-more"><span>Read More</span><FaArrowRight/></button>
    </article>
  )
}

export default BlogPostCard
