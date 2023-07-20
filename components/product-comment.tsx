import { CommentDTO } from "@/types/comment.model";
import Image from "next/image";
import RatingStars from "./rating-stars";
import { dateFormatting, enUS } from "@/sanity/utils/date-helpers";

interface ProductCommentProp {
  comment: CommentDTO
}

function ProductComment({comment}: ProductCommentProp) {
  if (!comment) { return null; }

  return (
    <div className="text-sm">
      <div className="flex items-center my-1">
        <Image 
          src="/user-64.png"
          alt="user icon"
          width={24}
          height={24} 
          className="sepia"/>
        <span className="mx-4">{comment.name}</span>
      </div>
      <div className="flex items-center">
        <RatingStars id={comment._id} stars={comment.stars} />
        <span className="mx-4 font-semibold">{comment.title}</span>
      </div>
      <div className="font-light">Reviewed on {comment._createdAt.toLocaleDateString(enUS, dateFormatting.MMMddYYYY)}</div>
      <div className="my-1">
        {comment.comment}
      </div>
    </div>
  )
}

export default ProductComment;