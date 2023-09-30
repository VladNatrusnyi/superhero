import styles from './HeroPage.module.scss'
import {useNavigate, useParams} from "react-router"
import {
  useDeleteSuperheroMutation,
  useGetSuperheroQuery
} from "../../store/queries/superheroesApi"
import {Card, List, Typography, Image, Button, Modal, message} from "antd"
import {LeftOutlined} from "@ant-design/icons"
import {useState} from "react"

export const HeroPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [messageApi, contextHolder] = message.useMessage()

  const openNotification = (type, content) => {
    messageApi.open({type,content })
  }


  const { data } = useGetSuperheroQuery({id})

  const [deleteSuperhero] = useDeleteSuperheroMutation()

  const [open, setOpen] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    try {
      await deleteSuperhero(id).unwrap()
      openNotification('success', 'Superhero successfully deleted')
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Deleting err:', error)
      openNotification('error', 'Failed to delete superhero')
    }
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }


  const sendDataToEditPage = () => {
    navigate('/superhero/${data._id}/edit', { state: { data } })
  }


  return (
    <>
      {contextHolder}
      <Modal
        title="Delete confirmation"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete superhero?</p>
      </Modal>

      <div
        style={{marginBottom: '20px'}}>
        <Button type="text" onClick={() => navigate('/')}>
          <LeftOutlined /> go back
        </Button>
      </div>
      {
        data && <div>
          <Card
            title={data.nickname}
            extra={<div className={styles.btnWrapper}>
              <Button type="dashed" onClick={sendDataToEditPage}>Edit</Button>
              <Button danger onClick={showModal}>Delete</Button>
            </div>}
          >
            <div>
              <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={data.Images}
                renderItem={(link, idx) => (
                  <List.Item key={link}>
                    <Image width={200} src={`http://localhost:5000${link}`} alt={data.nickname} />
                  </List.Item>
                )}
              />

              <div>
                <Typography.Title level={4}>Реальне ім'я: {data.real_name}</Typography.Title>
                <Typography.Title level={4}>Description: </Typography.Title>
                <Typography.Paragraph>{data.origin_description}</Typography.Paragraph>
                <Typography.Title level={4}>Суперсили:</Typography.Title>
                <List
                  bordered
                  dataSource={data.superpowers}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
                <Typography.Title level={4}>Легендарна фраза:</Typography.Title>
                <Typography.Paragraph>{data.catch_phrase}</Typography.Paragraph>
              </div>
            </div>
          </Card>
        </div>
      }
    </>

  )
}
