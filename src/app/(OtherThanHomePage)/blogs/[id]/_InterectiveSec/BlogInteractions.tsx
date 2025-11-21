"use client";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { FaRegComments } from "react-icons/fa";

const BlogInteractions = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [active, setActive] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    setActive("like");
    console.log("Liked this blog!");
  };

  const handleDislike = () => {
    setDislikes((prev) => prev + 1);
    setActive("dislike");
    console.log("Disliked this blog!");
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log("New Comment:", comment);
    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="mt-12">
      {/* Interactions Header */}
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Share Your Thoughts
      </h2>

      {/* Like / Dislike Buttons */}
      <div className="flex items-center gap-6 mb-10">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 p-2 rounded-md transition-all shadow-sm ${
            active === "like"
              ? "bg-accent text-white scale-105"
              : "bg-accent/30 text-white hover:bg-accent/40"
          }`}
        >
          <ThumbsUp className="w-5 h-5" /> {likes}
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-2 p-2 rounded-md transition-all shadow-sm ${
            active === "dislike"
              ? "bg-red-600 text-white scale-105"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          <ThumbsDown className="w-5 h-5" /> {dislikes}
        </button>
        <div className="bg-slate-500 p-2 rounded-md flex items-center gap-2 text-white">
          <FaRegComments className="w-5 h-5" /> {dislikes}
        </div>
      </div>

      {/* Comment Section */}
      <div className="bg-gray-50 dark:bg-gray-950 rounded-2xl p-6 shadow-sm">
        <form onSubmit={handleComment} className="space-y-4">
          <label className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-fourth">
            <MessageSquare className="w-5 h-5 text-accent" />
            Leave a comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your thoughts..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent/50 outline-none transition bg-transparent"
          />
          <button
            type="submit"
            className="bg-accent/80 text-white font-medium px-5 py-2 rounded-lg hover:bg-accent transition-all"
          >
            Post Comment
          </button>
        </form>

        {/* Display Comments */}
        {comments.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-gray-700 dark:text-fourth">
              Recent Comments:
            </h3>
            {comments.map((c, i) => (
              <div
                key={i}
                className="bg-transparent p-3 rounded-lg shadow-sm border border-gray-100"
              >
                <p className="text-gray-700 dark:text-fourth">{c}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogInteractions;
