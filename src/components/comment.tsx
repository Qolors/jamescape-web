

const CommentBox = (author: any) => {
    
    return (
        
        <div className="card max-w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">{author.author}</h2>
            <p>{author.content}
            </p>
        </div>
        </div>
    )
}

export default CommentBox;