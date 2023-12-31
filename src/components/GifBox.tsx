import React, { useState } from 'react'
import styles from '@/styles/search.module.css'
import Image from 'next/image'
import { GifBoxProps } from '@/types'
import { toast } from 'sonner'

const GifBox: React.FC<GifBoxProps> = ({
  imgSrc = '/a.jpg',
  iconSrc = '/fav-icon.svg',
  name,
  userName,
}) => {
  const [loading, setLoading] = useState(true)
  const handleImageLoad = () => {
    setLoading(false)
  }
  if (loading) {
    toast.loading('Loading....')
  }
  return (
    <div className={styles.giphyBox}>
      <div className={styles.imgBox}>
        <Image
          onLoad={handleImageLoad}
          priority
          src={imgSrc}
          alt="gif"
          fill
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className={styles.detailsBox}>
        <div className={styles.userDetail}>
          <p className={styles.cntName}>{name}</p>
          <span className={styles.cntUsername}>{userName}</span>
        </div>
        <div className={styles.favIcon}>
          <Image src={iconSrc} alt="star-icon" width={24} height={24} />
        </div>
      </div>
    </div>
  )
}

export default GifBox
