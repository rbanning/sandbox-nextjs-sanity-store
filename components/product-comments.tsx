import { CommentDTO } from "@/types/comment.model";
import ProductComment from "./product-comment";

interface ProductCommentsProps {
  comments?: CommentDTO[]
}

function ProductComments({comments}: ProductCommentsProps) {

  return (
    <div>
      {comments && comments.length > 0 && comments.map(comment => (
        <div key={comment._id} className="mt-4 mb-8">
          <ProductComment comment={comment} />
        </div>
      ))}
      {(!comments || comments.length === 0) && (
        <div>
          No comments, yet.  Be the first one to review...
        </div>
      )}
    </div>
  )
}

export default ProductComments;