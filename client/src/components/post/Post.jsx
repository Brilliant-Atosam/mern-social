import './post.css';
import { MoreVert } from '@material-ui/icons';
// import { Users } from "../../dummyData";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
export default function Post({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  // const PF = 'http://localhost:3000/assets/';
  const PF = 'http://localhost:3001/images/';
  const likeHandler = () => {
    try {
      axios.put(`http://localhost:3001/posts/${post._id}/like`, {
        user: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <Link to={`/profile/${user.username}`}>
              <img
                className='postProfileImg'
                src={PF + user.profilePicture}
                alt=''
              />
              <span className='postUsername'>{user.username}</span>
            </Link>
            <span className='postDate'>{format(post.createdAt)}</span>
          </div>
          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>
        <div className='postCenter'>
          <span className='postText'>{post?.desc}</span>
          <img className='postImg' src={PF + post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={PF + 'like.png'}
              onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src={PF + 'heart.png'}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>
              {post.likes.length} people like it
            </span>
          </div>
          <div className='postBottomRight'>
            <span className='postCommentText'>{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
