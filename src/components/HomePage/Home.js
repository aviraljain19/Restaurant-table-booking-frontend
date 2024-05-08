import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext/AuthContext";

const Home = () => {
  const { logoutUserAction, token, error, userId } = useContext(authContext);
  console.log(userId);
  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] flex flex-col items-center  ">
      <h1 className="text-center text-6xl py-10 text-gray-900 italic font-serif font-bold">
        Welcome to Our Restaurant
      </h1>
      <p className="text-center text-xl">
        Book a table now and enjoy a delightful dining experience!
      </p>
      {token && (
        <>
          <Link to="/select-table">
            <button className="mt-20 bg-cyan-400 p-2 rounded-md hover:bg-cyan-600 hover:text-white">
              Book Table
            </button>
          </Link>
          {userId === "663a8adcb973b019a43042f6" && (
            <Link to="/add-table">
              <button className="mt-10 bg-cyan-400 p-2 rounded-md hover:bg-cyan-600 hover:text-white">
                Add Table
              </button>
            </Link>
          )}
        </>
      )}
      {!token && (
        <>
          <Link to="/login">
            <button className="mt-20 bg-cyan-400 p-2 rounded-md hover:bg-cyan-600 hover:text-white">
              Book Table
            </button>
          </Link>
          <Link to="/login">
            <button className="mt-10 bg-cyan-400 p-2 rounded-md hover:bg-cyan-600 hover:text-white">
              Add Table
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
