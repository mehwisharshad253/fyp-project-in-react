import Typography from 'antd/es/typography/Typography'
import React from 'react'

const AppFooter = () => {
  return (
    <div className='AppFooter'>
      <Typography.Link href="tel:+92354553546">+92354553546</Typography.Link>
      <Typography.Link href="https://google.com">Privacy Policy</Typography.Link>
      <Typography.Link href="https://google.com">Terms of Use</Typography.Link>
    </div>
  )
}

export default AppFooter