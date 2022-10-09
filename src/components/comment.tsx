

const CommentBox = (author: any) => {
    
    
    return (
        <>
        <div className="card w-full max-w-[500px] bg-base-200 shadow-md">
        <div className="card-body">
            <h2 className="card-title pb-4"><img className="w-[25px]" src="/user.png" />{author.author}</h2>
            <p>{author.content}
            </p>
        </div>
        </div>
        <div className=" divider"></div>
        </>
    )
}

export default CommentBox;