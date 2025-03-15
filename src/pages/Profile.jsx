import React, { useState } from 'react';
import { motion } from 'motion/react'; 
import { useNavigate } from 'react-router';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Developer',
    profileImg: 'https://via.placeholder.com/150',
    bio: 'A passionate developer with a love for learning new technologies.',
    gender: 'Male',
    age: 28
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 onClick={()=>navigate('/')} className='text-md mb-4 bg-blue-400 w-fit px-2 py-1 rounded-md text-white cursor-pointer'>back</h1>
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={'https://avatar.iran.liara.run/public/47'}
            loading='lazy'
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="text-2xl font-semibold text-gray-800 bg-transparent border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              user.name
            )}
          </h2>
        </motion.div>

        <form>
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-600">Bio</label>
            {isEditing ? (
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                rows="4"
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">{user.bio}</p>
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-600">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">{user.email}</p>
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-600">Role</label>
            {isEditing ? (
              <input
                type="text"
                name="role"
                value={user.role}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">{user.role}</p>
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-600">Gender</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">{user.gender}</p>
            )}
          </motion.div>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-600">Age</label>
            {isEditing ? (
              <input
                type="number"
                name="age"
                value={user.age}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none"
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">{user.age}</p>
            )}
          </motion.div>

          <motion.div
            className="flex justify-end space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserProfile;
