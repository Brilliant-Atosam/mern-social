import './rightbar.css';
import { Users } from "../../dummyData";
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {Link} from 'react-router-dom'
import {Add} from '@material-ui/icons'
export default function Rightbar({user}) {
  const { user:currentUser } = useContext(AuthContext);
  const PF = 'http://localhost:3001/images/';
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const friendsList = await axios.get(
        'http://localhost:3001/users/friends/' + user._id
      );
      setFriends(friendsList.data);
    };
    fetchFriends();
  }, [user._id]);
  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src={`${PF}gift.png`} alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className='rightbarAd' src={`${PF}ad.png`} alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className='rightbarBtn'>
         Follow <Add/>
        </button>
      )}
        <h4 className='rightbarTitle'>User information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>{user.relationship}</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        <div className='rightbarFollowings'>
          {friends.map(friend => (
        <Link to={'/profile/' + friend.username}>
            <div className='rightbarFollowing'>
              <img
                src={PF + friend.profilePicture}
                alt=''
                className='rightbarFollowingImg'
                />
              <span className='rightbarFollowingName'>{friend.username}</span>
            </div>
          </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {currentUser ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
