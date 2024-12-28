const PostDetail = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        API.get(`/comments/?post=${postId}`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error('Error fetching comments:', error));
    }, [postId]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        API.post('/comments/', { post: postId, content: newComment })
            .then((response) => {
                setComments((prev) => [...prev, response.data]);
                setNewComment('');
            })
            .catch((error) => console.error('Error posting comment:', error));
    };

    return (
        <div>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                </div>
            ))}
            <form onSubmit={handleCommentSubmit}>
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};
