import styles from './HeroCard.module.scss'

export const HeroCard = ({heroData}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={`http://localhost:5000${heroData.Images[0]}`} alt="superhero"/>
      </div>
      <div className={styles.contentWrapper}>
        <h2>{heroData.nickname}</h2>
      </div>
    </div>
  )
}
