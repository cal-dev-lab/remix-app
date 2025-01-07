import { useLoaderData, Link } from "@remix-run/react";
import API from "../../utils/API/API";

export async function loader() {
  const api = new API(process.env.DATABASE_URL);

  try {
    const { data } = await api.get('/users');
    return { users: data }
  } catch (error) {
    return { error: "Failed to fetch users :/" }
  }
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>();

  return (
    <section>
      <h1>List of current users</h1>

      <Link to="/create-user">Add a user</Link>

      {
        users ? (
          users.map(user => (
            <p>{user.firstName} {user.lastName}</p>
          ))
        ) : (
          <p>Looks like there are no users available!</p>
        )
      }
    </section>
  )
}
