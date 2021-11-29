import { authService } from 'fbase'

export default function Home() {
  const logout = event => {
    authService.signOut();
  }
  return (
    <div>
      <h3>Home page</h3>
      <button onClick={logout}>Logout</button>
    </div>
  )
}