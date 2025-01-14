import { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { useQuery } from "react-query";
import getData from "../../utils/api";

export default function UserPicker({ user, setUser }) {
  const {data : users = [], status} = useQuery(
    "users",
    () => getData("http://localhost:3001/users")
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value, 10);
    const selectedUser = users.find(u => u.id === selectedID);

    setUser(selectedUser);
  }

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <select 
    className="user-picker"
    onChange={handleSelect}
    value={user?.id}
    >
      {users.map((u) => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}
