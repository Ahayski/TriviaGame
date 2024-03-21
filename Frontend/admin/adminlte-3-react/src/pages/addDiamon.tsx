import React, { useState } from "react";

export const AddDioamon = () => {
  const [dataQuiz, setDataQuiz] = useState({});
  return (
    <div>
      <h1 className="text-gray-800 ml-2">Add Quiz</h1>
      <form action="/avatar/create" method="POST" encType="multipart/form-data">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="avatar_name">Masukan nama avatar</label>
            <input
              type="text"
              name="avatar_name"
              className="form-control"
              id="avatar_name"
              placeholder="masukan nama avatar"
              required
            />
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="image">Masukan image</label>
            <input
              type="file"
              name="image"
              className="form-control"
              id="image"
              placeholder="masukan nama image"
              required
            />
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="price">Masukan harga</label>
            <input
              type="number"
              name="price"
              className="form-control"
              id="price"
              placeholder="masukan nama harga"
              required
            />
          </div>
        </div>
        <div className="card-footer">
          <button type="submit" className="btn btn-primary ">
            <i className="fas fa-save"></i> Simpan
          </button>
          <button type="submit" className="btn btn-secondary ml-3">
            <a href="/avatar" style={{ color: "white" }}>
              <i className="fa fa-undo"></i> Cancel
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};
