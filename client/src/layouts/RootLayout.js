import styles from './RootLayout.module.scss'
import {Outlet} from "react-router"
import {Header} from "../components/Header"
export const RootLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <div className={styles.mainBlock}>
        <Outlet />
      </div>
    </div>
  )
}
