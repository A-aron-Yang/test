// frontend/src/components/Sidebar.jsx
import { useState } from 'react'

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          fontSize: '1.5rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ☰
      </button>

      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: 200,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          background: '#222',
          color: '#fff',
          paddingTop: 60,
          boxSizing: 'border-box'
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[1,2,3,4,5,6].map(n => (
            <li
              key={n}
              style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid #444',
                cursor: 'pointer'
              }}
            >
              Menu {n}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
