import React, { useState, useEffect } from "react";
import { API, API_Golang } from "../lib/axios";
import { error } from "console";
import { useAvatar } from "@app/hooks/Avatar/useAvatar";
import { useSelector } from "react-redux";
import { RootType } from "@app/types/storeType";
import axios from "axios";

export const Avatar = () => {
  // Define state to store the avatars
  const dataAvatar = useSelector((state: RootType) => state.avatar.data.data);
  console.log("data", dataAvatar);
  const { handleGetAvatars, hendelDeleteAvatar } = useAvatar();
  const [avatarData, setAvatarData] = useState([]);
  // const GetAvatar = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://db8d-118-99-107-173.ngrok-free.app/api/avatars"
  //     );
  //     console.log("res", response);
  //     setAvatarData(response.data.data);

  //     const dataBro = JSON.stringify(response.data);
  //     console.log(dataBro);
  //     // Jika respons adalah data JSON yang diharapkan, set data avatar
  //   } catch (error) {
  //     console.log("Terjadi kesalahan:", error);
  //   }
  // };
  // console.log("avatarGO", avatarData);
  useEffect(() => {
    // GetAvatar();
    handleGetAvatars();
  }, []);

  return (
    <div>
      <div>
        <h1 className="mb-2 ml-4 text-gray-800 text-bold">Avatar</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Image</th>
              <th scope="col">Price</th>{" "}
              {/* Corrected typo: "price" to "Price" */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataAvatar.length ? (
              <>
                {dataAvatar.map((avatar, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={avatar.avatarImage} width={50} alt={`avatar`} />
                    </td>
                    <td>{avatar.price}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => hendelDeleteAvatar(avatar.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center "
                style={{
                  width: "100%",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                <div
                  className="spinner-border"
                  style={{ width: "5rem", height: "5rem" }}
                  role="status"
                >
                  <span className="sr-only ">Loading...</span>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Avatar;
