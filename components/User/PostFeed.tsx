import Link from "next/link";

const PostFeed = ({ posts, admin }: any) => {
  return posts
    ? posts.map((post: any) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
};

export default PostFeed;
function PostItem({ post, admin = false }: { post: any; admin: boolean }) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card flex ">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="">💗 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button className="btn btn-primary">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-warning">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
