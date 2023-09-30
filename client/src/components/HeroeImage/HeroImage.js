import styles from './HeroImage.module.scss';
import {useState} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Image, Spin} from 'antd';
import {useDeleteImageMutation} from "../../store/queries/superheroesApi";

export const HeroImage = ({ link, removeLink, addLink }) => {
  const [showIcon, setShowIcon] = useState(false);

  const [deleteImage, { isLoading, isError }] = useDeleteImageMutation();

  const deleteHandler = async () => {
    try {
      removeLink(link)
      await deleteImage(link).unwrap();
    } catch (error) {
      addLink(link)
      console.error('Deleting err:', error);
    }
  }

  const handleMouseEnter = () => {
    setShowIcon(true);
  };

  const handleMouseLeave = () => {
    setShowIcon(false);
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ?
        <div className={styles.spin}>
          <Spin size="large" />
        </div>
        :
        <>
          <Image src={`http://localhost:5000${link}`} />
          {showIcon && (
            <div onClick={deleteHandler} className={styles.icon} >
              <CloseOutlined />
            </div>
          )}
        </>
      }
    </div>
  );
};
