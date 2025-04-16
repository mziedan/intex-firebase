// src/admin/ManageSessions.js
const ManageSessions = async () => {
  const fetchSessions = async () => {
    const response = await fetch('/sessions');
    const sessions = await response.json();
    return sessions;
  };

  const createSession = async () => {
    // Simulate creation
    console.log("Create Session");
  };

  const editSession = async (id) => {
    // Simulate edition
    console.log("Edit Session", id);
  };

  const deleteSession = async (id) => {
    // Simulate deletion
    console.log("Delete Session", id);
  };

  const sessions = await fetchSessions();

  let sessionList = "";
  if (sessions && sessions.length > 0) {
    sessionList = sessions
      .map(
        (session) => `
        <li>
          Session ID: ${session.id} - Course ID: ${session.course_id} - Timeslot: ${session.timeslot} - Location: ${session.location}
          <button class="edit-session" data-id="${session.id}">Edit</button>
          <button class="delete-session" data-id="${session.id}">Delete</button>
        </li>
      `
      )
      .join("");
  } else {
    sessionList = "<li>No sessions found.</li>";
  }

  return `
    <section class="manage-sessions">
      <h2>Manage Sessions</h2>
      <button class="create-session">Create Session</button>
      <ul>${sessionList}</ul>
    </section>
    <script>
      document.querySelector('.create-session').addEventListener('click', () => { ${createSession.toString()} createSession(); });
      document.querySelectorAll('.edit-session').forEach(button => button.addEventListener('click', (event) => { ${editSession.toString()} editSession(event.target.dataset.id); }));
      document.querySelectorAll('.delete-session').forEach(button => button.addEventListener('click', (event) => { ${deleteSession.toString()} deleteSession(event.target.dataset.id); }));
    </script>
  `;
};
export default ManageSessions;
