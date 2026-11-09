import * as React from "react";
import {BsCheckCircle, BsQuestionCircle} from "react-icons/bs";
import MaterialIcon from "ui/components/MaterialIcon";

export function Status({success}: {
  success?: boolean
}) {

  if (success === true) {
    return <span><BsCheckCircle style={{
      color: 'green'
    }}/> success</span>
  } else if (success === false) {
    return <span><MaterialIcon icon="cancel" style={{
      color: 'red'
    }}/> fail</span>
  } else {
    return <span><BsQuestionCircle style={{
      color: 'orange'
    }}/> unknown</span>
  }

}