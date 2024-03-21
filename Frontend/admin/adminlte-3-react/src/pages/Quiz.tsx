import { useQuiz } from "@app/hooks/Quiz/useQuiz";
import { API } from "@app/lib/axios";
import { RootType } from "@app/types/storeType";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const Quiz = () => {
  const naviget = useNavigate();
  const { hendelGetQuiz, hendelDeleteQuiz } = useQuiz();
  const dataQuiz = useSelector((state: RootType) => state.quiz.data.data);
  useEffect(() => {
    hendelGetQuiz();
  }, []);
  return (
    <div>
      <div>
        <h1 className="mb-2 ml-4 text-gray-800 text-bold">Quiz</h1>
        <Link to={"/addQuiz"}>
          <button className="btn btn-primary ml-4">
            <i
              className="fas fa-plus-square abs"
              style={{ paddingRight: "6px" }}
            ></i>{" "}
            Add Quiz
          </button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Question</th>
              <th scope="col">answer</th>
              <th scope="col">Options</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataQuiz.length ? (
              <>
                {dataQuiz.map((quiz, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{quiz.question}</td>
                    <td>{quiz.answer}</td>
                    <td>
                      <ol>
                        {quiz.options.map((option: any) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ol>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => hendelDeleteQuiz(quiz.id)}
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
