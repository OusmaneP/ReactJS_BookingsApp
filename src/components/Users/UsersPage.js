import { useContext, useState } from "react";
import UserDetails from "./UserDetails";
import UsersList from "./UsersList";
import UserContext from "./UserContext";
import { useQueryClient } from "react-query";
import getData from "../../utils/api";

export default function UsersPage() {

  const [user, setUser] = useState(null);

  const loggedInUser = useContext(UserContext);

  const currentUser = user || loggedInUser;

  const queryClient = useQueryClient();


  return (
    <main className="users-page">
      <UsersList user={currentUser} setUser={setUser} />
      <UserDetails user={user.id} />
    </main>
  );
}
