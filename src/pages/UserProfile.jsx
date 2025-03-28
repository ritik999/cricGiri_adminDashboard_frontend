import React, { useEffect, useState } from "react";

import { fetchData } from "../utils/fetchFunction";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "flowbite-react";

const UserImageUpdater = () => {
  const [profileCode, setProfileCode] = useState("");
  const [userData, setUserData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  let token = "";

  useEffect(() => {
    if (profileCode == "") setIsValid(true);
  }, [profileCode]);

  const searchData = useMutation({
    mutationFn: () =>
      fetchData(
        `/admin/profile/profilecode`,
        "POST",
        {
          profilecode: profileCode,
        },
        (token = import.meta.env?.VITE_TOKEN)
      ),
    onSuccess: (data) => {
      // console.log(data);
      if (data.hasOwnProperty("status") && data.status == 0) {
        setUserData(null);
        setErrorMessage(`User with code "${profileCode}" not found.`);
      } else {
        setUserData(data);
      }
      // if (Object.keys(data).length > 2) setUserData(data);

      // if (data.hasOwnProperty("result")) setUserData(data);

      // console.log("here", Object.keys(data).length);
    },
    onError: (error) => {
      setUserData(null);

      console.error("Error fetching data: ", error);
    },
  });

  const handleSearchCodeChange = async (e) => {
    const value = e.target.value;
    const numValue = Number(value);
    if (isNaN(numValue) || value.trim() === "") {
      setIsValid(false);
      // console.log(isValid);
      return;
    } else {
      setIsValid(true);
      setProfileCode(numValue);
    }
  };

  //Handling files
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError(""); // Reset previous error

    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB limit
        setFileError("File size exceeds 1MB. Please choose a smaller file.");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
      }
    }
  };

  // Upload new profile image
  const uploadImage = async () => {
    if (!userData || !selectedFile) return;
    const formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`/admin/users/profileimage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env?.VITE_TOKEN}`,
        },
        body: formData,
      });
      const result = await response.json();
      alert(result.message);
      setSelectedFile(null);
      setFileError("");
      searchData.mutate(); // Refresh user data
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="p-5 font-mono">
      <div className="flex flex-col ">
        <label htmlFor="profile_code" className="font-bold font-mono">
          Search User
        </label>
        <input
          name="profile_code"
          type="text"
          value={profileCode}
          onChange={(e) => {
            handleSearchCodeChange(e);
            setProfileCode(e.target.value.replace(/\s/g, ""));
          }}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
          maxLength={10}
          placeholder="Enter Profile Code"
          className="border p-2 rounded w-64"
        />
      </div>
      <div className="flex gap-2">
        <button
          // onClick={fetchUserByProfileCode}
          onClick={() => searchData.mutate()}
          className={`${
            profileCode == "" || !isValid ? `bg-slate-500` : `bg-blue-500`
          } text-white p-2 rounded mt-2 `}
          disabled={!profileCode || !isValid}
        >
          Search User
        </button>
        <button
          onClick={() => {
            setProfileCode("");
            setUserData(null);
            setErrorMessage("");
            setFileError("");
            setIsValid(true);
          }}
          className="bg-red-500 text-white p-2 rounded mt-2"
        >
          Clear
        </button>
      </div>
      {!isValid && (
        <h1 className="text-center text-red-500 font-bold">
          Profile code must contain only numbers (no spaces)
        </h1>
      )}

      {/* {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} */}

      {searchData.isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : searchData.isError ? (
        <h1 className="text-center text-red-500 font-bold">
          Error Fetching user Try again
        </h1>
      ) : userData === null ? (
        <p className="text-red-500 mt-2">{errorMessage}</p>
      ) : (
        <div className="mt-5 p-4 border rounded flex justify-between ">
          <div className="font-mono flex flex-col gap-5">
            <h2 className="font-bold text-cyan-700">User Details</h2>
            <p>
              <strong>Name:</strong> {userData?.full_name || ""}
            </p>
            <p>
              <strong>Email:</strong> {userData?.email_id || "---"}
            </p>
            <p>
              <strong>Phone:</strong> {userData?.mobile_number || ""}
            </p>
            <p>
              <strong>Country:</strong> {userData?.countryName || ""}
            </p>
          </div>

          <div className="mt-3 flex flex-col">
            <img
              src={`${import.meta.env?.VITE_BASE_URL}${
                userData?.profile_image
              }`}
              alt={`${userData?.profile_image?.toString().split("-")[1]}`}
              className="w-44 h-44 rounded-full border"
            />
            <input type="file" onChange={handleFileChange} className="mt-2 " />

            <button
              onClick={uploadImage}
              className={`${
                selectedFile ? "bg-green-500" : "bg-slate-400"
              } text-white p-2 rounded mt-2`}
              disabled={!selectedFile}
            >
              Change Image
            </button>
            {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserImageUpdater;
