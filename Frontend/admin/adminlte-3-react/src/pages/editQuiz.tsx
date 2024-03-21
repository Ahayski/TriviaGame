import { API } from "@app/lib/axios";
import { QuizType } from "@app/types/InterfaceType";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EditQuiz = () => {
  const { id } = useParams();
  const [dataId, setDataId] = useState<any>({
    question: "",
    answer: "",
    options: [],
  });
  //   console.log("data", dataId);
  const hendelGetId = async () => {
    try {
      const response = await API.get(`/quizzes/${id}`);
      //   console.log("idget", response.data);

      setDataId(response.data.data);
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  };

  const [isloding, setIsLoding] = useState(true);
  const [dataQuiz, setDataQuiz] = useState<QuizType>({
    question: dataId?.question,
    answer: dataId.answer,
    options: dataId.options,
  });
  const naviget = useNavigate();
  // console.log(dataQuiz.options);
  const hendelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await API.put(`/quizzes/${id}`, dataQuiz);
      //   console.log(response.data);
      toast.success("Edit Quiz succeed!");
      setIsLoding(false);
      naviget("/quiz");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    hendelGetId();
  }, []);
  return (
    <div>
      <h1 className="text-gray-800 ml-2">Edit Quiz</h1>
      <form method="POST" onSubmit={hendelSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="question">Masukan nama question</label>
            <input
              type="text"
              name="question"
              className="form-control"
              id="question"
              value={dataId?.question}
              placeholder="masukan question"
              required
              onChange={(e) => {
                setDataQuiz({ ...dataQuiz, question: e.target.value });
                setDataId({ ...dataId, question: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="answer">Masukan Answer</label>
            <input
              type="text"
              name="answer"
              className="form-control"
              id="answer"
              value={dataId?.answer}
              placeholder="masukan nama answer"
              required
              onChange={(e) => {
                setDataQuiz({ ...dataQuiz, answer: e.target.value });
                setDataId({ ...dataId, answer: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="options">Masukan options Jawaban []</label>
            <input
              type="text"
              name="options"
              className="form-control"
              id="options"
              value={dataId?.options}
              onChange={(e) => {
                setDataQuiz({
                  ...dataQuiz,
                  options: e.target.value.split(","),
                }); // Memisahkan nilai string menjadi array
                setDataId({ ...dataId, options: e.target.value.split(",") });
              }}
              placeholder="masukan options"
              required
            />
          </div>
        </div>
        <div className="card-footer">
          {/* {isloding ? (
          
            <div className="spinner-grow" role="status">
              <span className="sr-only ">Loading...</span>
            </div>
          )} */}
          <button type="submit" className="btn btn-primary ">
            <i className="fas fa-save"></i> Simpan
          </button>

          <button type="submit" className="btn btn-secondary ml-3">
            <a href="/quiz" style={{ color: "white" }}>
              <i className="fa fa-undo"></i> Cancel
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};
