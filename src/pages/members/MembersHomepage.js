import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import Loader from "../../components/Loader";

const MembersHomepage = ({ history }) => {
  const [membersList, setMembersList] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      const membersListFromStorage = localStorage.getItem("membersList")
        ? JSON.parse(localStorage.getItem("membersList"))
        : null;
      setMembersList(membersListFromStorage);
    }, 1000);
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      const newMembersList = membersList.filter((member) => member.id !== id);
      localStorage.setItem("membersList", JSON.stringify(newMembersList));
      setMembersList(newMembersList);
    }
  };

  return (
    <>
      {isLoading ? <Loader /> : null}
      <center>
        <b>Members List</b> <i className="far fa-list-alt"></i>
      </center>
      <LinkContainer to={`/add/member`}>
        <Button className="ml-auto" variant="primary">
          Add Member
        </Button>
      </LinkContainer>
      <br />
      <br />

      {membersList?.length > 0 && (
        <>
          <Table striped hover resposnsive="true" className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {membersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>
                    {" "}
                    <a href={`  mailto: ${user.email}`}>{user.email}</a>{" "}
                  </td>
                  <td>
                    <LinkContainer to={`/update/member/${user.id}`}>
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
                        deleteHandler(user.id);
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

export default MembersHomepage;
