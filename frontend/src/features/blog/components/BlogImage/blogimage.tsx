import "./blogimage.css";


interface Props{
image:string;
title:string;
}

const BlogImage=({image,title}:Props)=>{
return(

<div className="blog-image">
<img src={image} alt={title}/>
</div>
)
}
export default BlogImage;