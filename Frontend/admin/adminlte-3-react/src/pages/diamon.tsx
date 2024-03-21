import React, { useState, useEffect } from "react";
import { API } from "../lib/axios";
import { error } from "console";
import { useAvatar } from "@app/hooks/Avatar/useAvatar";
import { useSelector } from "react-redux";
import { RootType } from "@app/types/storeType";
import { useDiamon } from "@app/hooks/diamon/useDiamon";

export const Diamon = () => {
  const { hendelGetDiamon, hendelDeleteDiamon } = useDiamon();
  const dataDiamon = useSelector((state: RootType) => state.diamon.data.data);
  useEffect(() => {
    hendelGetDiamon();
  }, [dataDiamon]);

  return (
    <div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Image</th>
              <th scope="col">amount</th>
              <th scope="col">Price</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataDiamon.map((diamon, index) => (
              <tr key={diamon.id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={diamon.image}
                    alt="image"
                    style={{ width: "120px", height: "90px" }}
                  />
                </td>
                <td>{diamon.amount}</td>
                <td>Rp.{diamon.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      hendelDeleteDiamon(diamon.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Diamon;
