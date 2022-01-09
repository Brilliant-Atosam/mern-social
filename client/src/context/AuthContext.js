import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
const INTIAL_STATE = {
  user: {
    profilePicture: 'person/5.jpeg',
    coverPicture: 'post/5.jpeg',
    followers: ['617031dbbf0c951ef8f12930'],
    followings: ['617031dbbf0c951ef8f12930'],
    isAdmin: false,
    _id: '617031ccbf0c951ef8f1292e',
    username: 'ato',
    email: 'ato@sam.me',
    password: '$2b$10$mFIfNdLdR6rdwKbXRK4/BeYJtWMa1joEYSE1rP/4d9d8.0i3WbA8q',
    createdAt: '2021-10-20T15:12:12.725Z',
    updatedAt: '2021-10-21T14:18:07.582Z',
    __v: 0,
    city: 'Accra',
    from: 'Wiawso',
    relationship: 'Complicated',
    desc: 'Love is the death of duty!',
  },
  isFetching: false,
  error: false,
};
export const AuthContext = createContext(INTIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INTIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
