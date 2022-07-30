import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { ProtectedRoute } from "./routes/ProtectiveRoute";
import { useSelector } from "react-redux";
import TasksHomepage from "./pages/tasks/TasksHomepage";
import AddMembers from "./pages/members/AddMembers";
import MembersHomepage from "./pages/members/MembersHomepage";
import CreateTask from "./pages/tasks/CreateTask";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Router>
        {userInfo ? <Header /> : null}
        <main className="py-5">
          <Container>
            <Routes>
              <Route path="/" exact element={<LoginScreen />} />
              <Route
                path="/dashboard"
                exact
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                exact
                element={
                  <ProtectedRoute>
                    <TasksHomepage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members"
                exact
                element={
                  <ProtectedRoute>
                    <MembersHomepage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="add/member"
                exact
                element={
                  <ProtectedRoute>
                    <AddMembers />
                  </ProtectedRoute>
                }
              />
              <Route path="update/member/:id" exact element={<AddMembers />} />

              <Route path="add/task" exact element={<CreateTask />} />
              <Route path="update/task/:id" exact element={<CreateTask />} />
            </Routes>
          </Container>
        </main>
        {userInfo ? <Footer /> : null}
      </Router>
    </>
  );
}

export default App;
