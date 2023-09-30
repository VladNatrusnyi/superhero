import styles from './EditPage.module.scss'
import {useLocation, useNavigate} from "react-router"
import {CreateHeroForm} from "../../components/CreateHeroForm/CreateHeroForm"
import {Button} from "antd"
import {LeftOutlined} from "@ant-design/icons"

export const EditPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state.data ? location.state.data : {}

  console.log('EDIT DATS', data)

  return (
    <div>
      <div
        style={{marginBottom: '20px'}}>
        <Button type="text" onClick={() => navigate(-1)}>
          <LeftOutlined /> go back
        </Button>
      </div>
      <CreateHeroForm
        initialValues={data}
        operationType={'update'}/>
    </div>
  )
}
