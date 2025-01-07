
// app/routes/create-user/index.tsx
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node"; // For returning JSON responses
import API from '../../utils/API/API'; // Assuming the API client is defined elsewhere

export const action = async ({ request }: ActionArgs) => {
  const formData = new URLSearchParams(await request.text());

  // Extract user data directly from formData
  const newUser = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email')
  };

  const api = new API('http://localhost:10000'); // Your API base URL

  try {
    const { data } = await api.post('/users', newUser, {
      headers: {
        'Content-Type': 'application/json', // Ensure it's JSON
      },
    });

    return json({ user: data });
  } catch (error) {
    console.error('Error creating user:', error);

    // If the error is an API error, log more details
    if (error.response) {
      console.error("API error details:", await error.response.json());
    }

    // Return a generic error message
    return json(
      { error: 'Failed to create user. Please try again.' },
      { status: 400 }
    );
  }
};

export default function CreateUserForm() {
  const actionData = useActionData<typeof action>(); // Access data from the action

  return (
    <section>
      <h1>Create a User</h1>

      {actionData?.error && (
        <div style={{ color: 'red' }}>
          <p>{actionData.error}</p>
        </div>
      )}

      {actionData?.user && (
        <div style={{ color: 'green' }}>
          <p>
            Successfully created user: {actionData.user.firstName}{" "}
            {actionData.user.lastName}
          </p>
        </div>
      )}

      <Form method="post">
        <div>
          <label htmlFor="firstName">First name</label>
          <input name="firstName" id="firstName" required />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <input name="lastName" id="lastName" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <button type="submit">Submit</button>
      </Form>
    </section>
  );
}

