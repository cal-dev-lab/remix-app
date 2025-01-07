import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <p>Welcome to the main menu</p>
      <Link to="users"><p>Users</p></Link>
    </div>
  );
}
