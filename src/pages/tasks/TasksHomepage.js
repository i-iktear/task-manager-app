import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import { listTasks, deleteTaskAction } from "../../redux/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";

const TasksHomepage = ({ history }) => {
  // const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const getTaskList = useSelector((state) => state.getTaskList);
  const { loading, tasks } = getTaskList;

  const deleteTask = useSelector((state) => state.deleteTask);
  const { loading: deleteLoading, success } = deleteTask;

  useEffect(() => {
    dispatch(listTasks());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteTaskAction(id));
    }
  };

  return (
    <>
      <center>
        <b>Tasks List</b> <i className="far fa-list-alt"></i>
      </center>
      {loading || deleteLoading ? (
        <Loader />
      ) : (
        <div>
          <LinkContainer to={`/add/task`}>
            <Button className="ml-auto" variant="primary">
              Create Task
            </Button>
          </LinkContainer>
          <br />
          <br />
        </div>
      )}

      {tasks?.length > 0 && (
        <>
          <Table striped hover resposnsive="true" className="table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>date</th>
                <th>Assigned To</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task?.id}>
                  <td>
                    <LinkContainer to={`/update/task/${task.id}`}>
                      <div style={{ cursor: "pointer" }}>{task?.title}</div>
                    </LinkContainer>
                  </td>
                  <td>{task?.description}</td>
                  <td>{task?.date}</td>
                  <td>{task?.assignTo}</td>
                  <td>
                    <LinkContainer to={`/update/task/${task.id}`}>
                      <Button variant="info" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => {
                        deleteHandler(task.id);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default TasksHomepage;
