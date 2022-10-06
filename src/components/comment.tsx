

const CommentBox = (author: any) => {
    
    
    return (
        
        <div className="rounded-xl card w-full max-w-[500px] bg-base-100 shadow-xl">
        <div className="card-body">
            <h2 className="card-title pb-4"><img className="w-[25px]" src="/user.png" />{author.author}</h2>
            <p>{author.content}
            </p>
        </div>
        </div>
    )
}

export default CommentBox;