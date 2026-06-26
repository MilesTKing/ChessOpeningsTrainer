import styles from './App.module.css'
import pageStyles from './pages/Page.module.css'
import Header from './components/nav/Header.tsx'
function App() {
  return (
      <div className={pageStyles.page}>
        <div><Header></Header></div>
      </div>
)
}

export default App
