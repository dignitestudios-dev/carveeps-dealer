import React, { useState } from 'react'
import PasswordModal from '../ReportAccess/PasswordModal'

const InitialPage = () => {
    const [showModal, setShowModal] = useState(true)
  return (
    <div>
      <PasswordModal />
    </div>
  )
}

export default InitialPage
