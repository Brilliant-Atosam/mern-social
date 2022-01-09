import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = 'http://localhost:3001/images/';
  const desc = useRef();
  const[file, setFile] = useState(null)
  const handleSubmit = async e =>{
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }
    if(file){
      const data = new FormData()
      const filename = Date.now() + file.name;
      data.append('name', filename)
      data.append('file', file)
      newPost.img = filename
      console.log(file)
      try{
        const res = await axios.post('http://localhost:3001/upload', data);
        console.log(res)
      } catch(err){
        console.log(err)
      }
    }
    try {
    const res =  await axios.post('http://localhost:3001/posts', newPost)
    window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='share'>
      <div className='shareWrapper'>
        <div className='shareTop'>
          <img
            className='shareProfileImg'
            src={PF + user.profilePicture}
            alt={user.username + "'s profile picture"}
          />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className='shareInput'
            ref={desc}
          />
        </div>
        <hr className='shareHr' />
        <form className='shareBottom' onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className='shareOptions'>
            <div className='shareOption'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <label htmlFor='file' className='shareOptionText'>Photo or Video</label>
              <input type='file' id='file' onChange={e=> setFile(e.target.files[0])} accept='.png, .jpeg, .jpg' name='file' />
            </div>
            <div className='shareOption'>
              <Label htmlColor='blue' className='shareIcon' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className='shareOption'>
              <Room htmlColor='green' className='shareIcon' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className='shareOption'>
              <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>
          <button className='shareButton' type='submit'>Share</button>
        </form>
      </div>
    </div>
  );
}
