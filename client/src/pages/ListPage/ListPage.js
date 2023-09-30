import styles from './ListPage.module.scss'
import {useGetAllSuperheroesQuery} from "../../store/queries/superheroesApi";
import {useState} from "react"
import {HeroCard} from "../../components/HeroCard/HeroCard"
import {Collapse, Pagination, Spin} from "antd"
import {PlusOutlined} from "@ant-design/icons"
import {CreateHeroForm} from "../../components/CreateHeroForm/CreateHeroForm"
import {useNavigate} from "react-router"

const pageSize = 5
export const ListPage = () => {
  const navigate = useNavigate()

  const goToSuperheroPage = (id) => {
    navigate(`/superhero/${id}`)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const onChange = (page) => {
    console.log(page)
    setCurrentPage(page)
  }

  const { data, error, isFetching, isLoading, refetch } = useGetAllSuperheroesQuery({page: currentPage, limit: pageSize})

  const getSuperheroesAgain = () => refetch()

  if (isLoading || isFetching) {
    console.log('isLoading', isLoading)
    return <div className={styles.preloader}><Spin size="large"/></div>
  }

  if (error) {
    return <div>Error</div>
  }


  return (
    <div className={styles.wrapper}>
        <Collapse
          style={{
            marginBottom: '20px'
          }}

          size="large"
          items={[{
            label: 'Create new superhero',
            extra: <PlusOutlined />,
            children: <CreateHeroForm getSuperheroesAgain={getSuperheroesAgain}/> }]}
        />
      {data.superheroes && data.superheroes.length ?
        <div>
          <div>
            {data.superheroes.map(hero => {
              return (
                <div key={hero._id} onClick={() => goToSuperheroPage(hero._id)}>
                  <HeroCard
                    heroData={hero}
                  />
                </div>
              )})
            }
          </div>
          <div className={styles.pagination}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              onChange={onChange}
              total={data.totalSuperheroes}
            />
          </div>
        </div>
        : <div className={styles.message}>No superheroes available</div>
      }
    </div>
  )
}
