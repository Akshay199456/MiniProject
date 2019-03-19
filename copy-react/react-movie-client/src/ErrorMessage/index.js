import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorMessage = (props) => {
  // console.log("Props from ErrorMessage: ", props)
  return (
    <Message negative>
      {props.errorMessage}
    </Message>
  )
}

export default ErrorMessage;
