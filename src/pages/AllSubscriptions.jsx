import React from 'react'
import SubscriptionCardGrid from '../components/AllSubscriptions/SubscriptionCardGrid'
import Header from '../components/Subscription/Header'
import NoteToUser from "../components/SubscriptionPlans/NoteToUser"

const AllSubscriptions = () => {
  return (
    <div>
      <Header/>
      <NoteToUser/>
      <SubscriptionCardGrid/>
    </div>
  )
}

export default AllSubscriptions
