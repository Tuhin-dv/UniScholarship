import { useContext, useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { AuthContext } from "../../../context/AuthContext/AuthContext";


const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users?email=${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
          setLoading(false);
        });
    }
  }, [user, axiosSecure]);

  if (loading) {
    return <div className="text-center py-10 text-lg font-medium">Loading profile...</div>;
  }

  if (!userInfo) {
    return <div className="text-center py-10 text-red-600">User data not found!</div>;
  }

  return (
    <div className="max-w-md mx-auto p-0 mt-10 rounded-3xl shadow-2xl border bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="flex flex-col items-center py-8 px-6">
        <div className="relative mb-4">
          <img
            src={userInfo?.photoURL || "https://i.ibb.co/smh6Qyz/user.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
          />
          <span className="absolute bottom-2 right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">{userInfo?.role || "User"}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight text-center">{userInfo?.name}</h2>
        <p className="text-center text-gray-500 text-base mb-2">{userInfo?.email}</p>
        {userInfo?.role && (
          <span className="inline-block mt-1 px-4 py-1 text-sm font-semibold bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full shadow">{userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}</span>
        )}
      </div>
      <div className="border-t border-purple-100 px-8 py-6 bg-white rounded-b-3xl">
        <h4 className="text-lg font-bold text-purple-700 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Account Info
        </h4>
        <ul className="text-gray-600 text-base mt-1 space-y-2">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <strong>Joined:</strong> {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString() : "-"}
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <strong>Last Login:</strong> {userInfo?.lastLogIn ? new Date(userInfo.lastLogIn).toLocaleString() : "-"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyProfile;
