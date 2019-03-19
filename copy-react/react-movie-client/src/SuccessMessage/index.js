import React from 'react'
import { Message } from 'semantic-ui-react'


const SuccessMessage = (props) => {
  // console.log("Props from SuccessMessage: ", props)
  return (
    <Message positive>
      {props.successMessage}
    </Message>
  )
}

export default SuccessMessage;
