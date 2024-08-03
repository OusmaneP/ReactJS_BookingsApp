import "../App.css";
import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";
import { QueryClient, QueryClientProvider } from "react-query";
import { lazy, Suspense } from "react";

import UserPicker from "./Users/UserPicker";
import UserContext from "./Users/UserContext";
import PageSpinner from "./UI/PageSpinner";
import ErrorBoundary from "./UI/ErrorBoundary";

const queryClient = new QueryClient();

const BookablesPage = lazy(() => import("./Bookables/BookablesPage"));
const BookingsPage = lazy(() => import("./Bookings/BookingsPage"));
const UsersPage = lazy(() => import("./Users/UsersPage"));

function App() {
  const [user, setUser] = useState();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={user}>
        <Router>
          <div className="App">
            <header>
              <nav>
                <ul>
                  <li>
                    <Link to="/bookings" className="btn btn-header">
                      <FaCalendarAlt />
                      <span>Bookings</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/bookables" className="btn btn-header">
                      <FaDoorOpen />
                      <span>Bookables</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/users" className="btn btn-header">
                      <FaUsers />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <UserPicker user={user} setUser={setUser} />
            </header>

            <ErrorBoundary
              fallback={
                <Fragment>
                  <h1>Something went wrong!</h1>
                  <p>Try reloading the page.</p>
                </Fragment>
              }
            >
              <Suspense fallback={<PageSpinner />}>
                <Routes>
                  <Route path="/bookings" element={<BookingsPage />} />
                  <Route path="/bookables/*" element={<BookablesPage />} />
                  <Route path="/users" element={<UsersPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </Router>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
