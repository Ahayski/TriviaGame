import { useAvatar } from "@app/hooks/Avatar/useAvatar";
import { useQuiz } from "@app/hooks/Quiz/useQuiz";
import { useDiamon } from "@app/hooks/diamon/useDiamon";
import { RootType } from "@app/types/storeType";
import { ContentHeader } from "@components";
import { useEffect } from "react";

import { useSelector } from "react-redux";

const Dashboard = () => {
  const avatar = useSelector((state: RootType) => state.avatar.data.data);
  const diamon = useSelector((state: RootType) => state.diamon.data.data);
  const quiz = useSelector((state: RootType) => state.quiz.data.data);
  const { handleGetAvatars } = useAvatar();
  const { hendelGetDiamon } = useDiamon();
  const { hendelGetQuiz } = useQuiz();

  useEffect(() => {
    handleGetAvatars();
    hendelGetDiamon();
    hendelGetQuiz();
  }, []);
  return (
    <div>
      <ContentHeader title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>
                    {avatar.length ? (
                      avatar.length
                    ) : (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </h3>

                  <p>Avatar</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="/avatar" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    {diamon.length ? (
                      diamon.length
                    ) : (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </h3>

                  <p>Diamon</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <a href="/diamon" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>44</h3>

                  <p>Admin user </p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  {quiz.length ? (
                    <h3>{quiz.length}</h3>
                  ) : (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}

                  <p>Kuis Wakanda</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <a href="/quiz" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
