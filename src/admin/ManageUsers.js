const ManageUsers = () => {
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState({
    user_name: '',
    user_email: '',
    user_password: '',
    role: 'user',
  });
  const [editingUser, setEditingUser] = React.useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        fetchUsers();
        setNewUser({ user_name: '', user_email: '', user_password: '', role: 'user' });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`/users/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        fetchUsers();
        setEditingUser(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`/users/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  return `
    <section class="manage-users">
      <h2>Manage Users</h2>

      <h3>Add New User</h3>
      <div>
        <input type="text" placeholder="Name" value="${newUser.user_name}" onInput="this.value = event.target.value;" />
        <input type="email" placeholder="Email" value="${newUser.user_email}" onInput="this.value = event.target.value;" />
        <input type="password" placeholder="Password" value="${newUser.user_password}" onInput="this.value = event.target.value;" />
        <select value="${newUser.role}" onChange="event => this.value = event.target.value">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick="${createUser}">Add User</button>
      </div>

      <h3>User List</h3>
      <ul>
        ${users.map(
          (user) => `
            <li>
              ${
                editingUser?.id === user.id
                  ? `
                    <input type="text" value="${editingUser.user_name}" onInput="this.value = event.target.value;" />
                    <input type="email" value="${editingUser.user_email}" onInput="this.value = event.target.value;" />
                    <select value="${editingUser.role}" onChange="event => this.value = event.target.value">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button onClick="${updateUser}">Save</button>
                    <button onClick="() => setEditingUser(null)">Cancel</button>
                  `
                  : `
                    ${user.user_name} (${user.user_email}) - ${user.role}
                    <button onClick="() => setEditingUser(${JSON.stringify(user)})">Edit</button>
                    <button onClick="() => deleteUser(${user.id})">Delete</button>
                  `
              }
            </li>
          `
        ).join('')}
      </ul>
    </section>
  `;
};
export default ManageUsers;