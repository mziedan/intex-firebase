  const handleCreate = async () => {
    const newRegistration = {
      course_id: 1,
      user_name: "test",
      user_email: "test@test.com",
      session_id: 1,
    };
    const response = await fetch("/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegistration),
    });
  };

  const handleEdit = async (id) => {
    const editedRegistration = {
      course_id: 1,
      user_name: "edited",
      user_email: "edited@test.com",
      session_id: 1,
    };
    const response = await fetch(`/registrations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRegistration),
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/registrations/${id}`, {
      method: "DELETE",
    });
  };
  const fetchRegistrations = async () => {
    const response = await fetch("/registrations");
    const registrations = await response.json();

    return registrations.map(
      (registration) => `
          <li>
            ${registration.user_name} - ${registration.user_email} - ${registration.session_id}
            <button onclick="handleEdit(${registration.id})">Edit</button>
            <button onclick="handleDelete(${registration.id})">Delete</button>
          </li>
        `
    );
  };
  const registrationsList = fetchRegistrations();
  return `
    <section class="manage-registrations">
      <h2>Manage Registrations</h2><button onclick="handleCreate()">Create Registration</button>
      <ul>${registrationsList}</ul></section>
  `;
};
export default ManageRegistrations;