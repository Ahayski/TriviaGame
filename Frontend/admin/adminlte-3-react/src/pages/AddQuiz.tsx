import { API } from "@app/lib/axios";
import { QuizType } from "@app/types/InterfaceType";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddQuiz = () => {
  const [isloding, setIsLoding] = useState(false);
  const [dataQuiz, setDataQuiz] = useState<QuizType>({
    question: "",
    answer: "",
    options: [],
  });
  const naviget = useNavigate();
  // console.log(dataQuiz.options);
  const hendelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await API.post("/quizzes", dataQuiz);
      console.log(response.data);
      toast.success("Login is succeed!");
      setIsLoding(true);
      naviget("/quiz");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="text-gray-800 ml-2">Add Quiz</h1>
      <form method="POST" onSubmit={hendelSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="question">Masukan nama question</label>
            <input
              type="text"
              name="question"
              className="form-control"
              id="question"
              placeholder="masukan question"
              required
              onChange={(e) => {
                setDataQuiz({ ...dataQuiz, question: e.target.value });
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
              placeholder="masukan nama answer"
              required
              onChange={(e) => {
                setDataQuiz({ ...dataQuiz, answer: e.target.value });
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
              onChange={(e) => {
                setDataQuiz({
                  ...dataQuiz,
                  options: e.target.value.split(","),
                }); // Memisahkan nilai string menjadi array
              }}
              placeholder="masukan options"
              required
            />
          </div>
        </div>
        <div className="card-footer">
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
