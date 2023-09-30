import styles from './CreateHeroForm.module.scss'
import {Button, Form, Input, List, message, Space, Spin, Upload} from "antd"
import TextArea from "antd/es/input/TextArea"
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons"
import {useEffect, useState} from "react"
import {HeroImage} from "../HeroeImage/HeroImage"
import {
  useCreateSuperheroMutation,
   useUpdateSuperheroMutation,
  useUploadImageMutation
} from "../../store/queries/superheroesApi"
import {useNavigate} from "react-router"


export const CreateHeroForm = ({initialValues, operationType = 'create', getSuperheroesAgain}, ) => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const openNotification = (type, content) => {
    messageApi.open({type,content })
  }

  useEffect(() => {
    if (operationType === 'update' && initialValues) {
      setImageLinks(initialValues.Images)
    }

  },[operationType])


  const [loading, setLoading] = useState(false) // image upload status
  const [imageLinks, setImageLinks] = useState([])  //image links arr


  const [uploadImage, { isError }] = useUploadImageMutation()

  const [createSuperhero, { isLoading, isError: isErrorCreatingHero }] = useCreateSuperheroMutation()
  const [updateSuperhero, { isLoading: isUpdatingLoading , isError: isErrorUpdatingHero }] = useUpdateSuperheroMutation()


  const onSendData = async (values) => {
    if (!imageLinks.length) {
      openNotification('warning', 'You need to upload an image to create a superhero')
      return
    }

    const body = {
      nickname: values.nickname,
      real_name: values.real_name,
      origin_description: values.origin_description,
      superpowers: values.superpowers,
      catch_phrase: values.catch_phrase,
      Images: imageLinks,
    }

    console.log('MY BODE', body)

    if (operationType === 'create') {
      try {
        const result = await createSuperhero(body).unwrap()
        console.log('NEW hero CREATED Success', result)
        getSuperheroesAgain() //reload all heros
        handleResetForm()
        clearLinks()
        openNotification('success', 'The superhero has been successfully created')
      } catch (error) {
        console.error('Creating superhero error:', error)
        if (error.data.message) {
          openNotification('error', error.data.message)
        }
      }
    } else {
      try {
        const result = await updateSuperhero({body: body, id: initialValues._id}).unwrap()

        if (result.success) {
          handleResetForm()
          clearLinks()
          navigate(`/superhero/${initialValues._id}`)
          openNotification('success', 'The superhero has been successfully created')
          window.location.reload()
        }
        console.log('NEW hero UPDATED Success', result)
      } catch (error) {
        console.error('Updating superhero error:', error)
      }
    }

  }


  //operations with links arr
  const removeLink = (link) => {
    setImageLinks(state => state.filter(str => str !== link))
  }
  const addLink = (link) => {
    setImageLinks((state) => [...state, link])
  }
  const clearLinks = () => {
    setImageLinks([])
  }


  //Upload image to server
  const handleUpload = async (options) => {
    const { file } = options
    try {
      setLoading(true)
      const response = await uploadImageToServer(file)
      addLink(response[0].url)
    } catch (error) {
      console.error('File upload error:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImageToServer = async (file) => {
    console.log(file)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const result = await uploadImage(formData).unwrap()
      console.log('Image success', result)
      return result
    } catch (error) {
      console.error('Error image uploading:', error)
    }
  }


  const [form] = Form.useForm()
  const handleResetForm = () => {
    form.resetFields()
  }

  return (
    <>
      {contextHolder}

      {isLoading
        ? <Spin size={'large'}/>
        :<Form
          form={form}
          initialValues={operationType === 'update' ? initialValues : {}}
          layout={"vertical"}
          onFinish={onSendData}
        >
          <Form.Item
            label="Nickname"
            name="nickname"
            rules={[
              {
                required: true,
                message: 'Please input Nickname!',
                whitespace: true
              },
            ]}
          >
            <Input
              allowClear
              placeholder="Nickname"
            />
          </Form.Item>


          <Form.Item
            label="Real name"
            name="real_name"
            rules={[
              {
                required: true,
                message: 'Please input Real name!',
                whitespace: true
              },
            ]}
          >
            <Input
              allowClear
              placeholder="Real name"
            />
          </Form.Item>


          <Form.Item
            label="Description"
            name="origin_description"
            rules={[
              {
                required: true,
                message: 'Please input Description!',
                whitespace: true
              },
            ]}
          >
            <TextArea
              placeholder="Description"
              allowClear
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />

          </Form.Item>


          <Form.Item
            label="Catch phrase"
            name="catch_phrase"
            rules={[
              {
                required: true,
                message: 'Please input Catch phrase!',
                whitespace: true
              },
            ]}
          >
            <TextArea
              placeholder="Catch phrase"
              allowClear
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />

          </Form.Item>



          <Form.Item
            label="Superpowers"
            name="superpowers"
            rules={[
              {
                required: true,
                message: 'Please input superpowers!',
              },
            ]}
          >

            <Form.List name="superpowers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={name}
                        rules={[
                          {
                            required: true,
                            message: 'Missing first name',
                          },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                    >
                      Add superpower
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            label="Images"
            rules={[
              {
                required: true,
                message: 'Please add images!',
              },
            ]}
          >
            <>
              <Upload
                customRequest={handleUpload}
                showUploadList={false}
                accept="image/*"
                multiple
              >
                <div className={styles.loadFileBtnWrapper}>
                  <Button icon={<UploadOutlined />}>Add image</Button>
                </div>
              </Upload>
              {loading && <Spin />}
              {isError && <div>Uploading error</div>}
              <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={imageLinks}
                renderItem={(link, idx) => (
                  <List.Item key={idx}>
                    <HeroImage
                      link={link}
                      removeLink={removeLink}
                      addLink={addLink}
                    />
                  </List.Item>
                )}
              />
            </>
          </Form.Item>

          <Form.Item >
            <Button
              type="primary"
              htmlType="submit"
            >
              {operationType === 'create' ? 'Create superhero': 'Update superhero'}

            </Button>
          </Form.Item>

        </Form>
      }
    </>
  )
}
