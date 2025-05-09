// frontend/src/App.jsx
import Sidebar from "./components/MainMenuSideBar"
function App() {
  return (
    <div>
      <Sidebar />
      <main style={{ marginLeft: 0, padding: '2rem' }}>
        <h1>Your Main Content</h1>
        <p>Click the hamburger icon to open the menu.</p>
      </main>
    </div>
  )
}

export default App
