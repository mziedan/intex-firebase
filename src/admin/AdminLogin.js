const AdminLoginPage = () => {
  return `
    <section class="admin-login">
      <h2>Admin Login</h2>
      <form class="login-form">
        <input type="text" id="username" placeholder="Username" required>
        <input type="password" id="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
    </section>
  `;
};

export default AdminLoginPage;