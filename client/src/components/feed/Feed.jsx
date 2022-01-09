import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import { AuthContext } from '../../context/AuthContext';
// import { Posts } from "../../dummyData";
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`http://localhost:3001/posts/profile/${username}`)
        : await axios.get('http://localhost:3001/posts/timeline/' + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {username === user.username && <Share />}
        {posts.map(p => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
