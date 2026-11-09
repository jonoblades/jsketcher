import React from 'react';

import ls from './RadioButtons.css';

const RadioButtonsContext = React.createContext(null);

export default function RadioButtons({value, onChange, children}) {
  const [groupId] = React.useState(() => 'group_' + GROUP_COUNTER++);
  const context = {
    radioButtonsGroupName: groupId,
    radioButtonsValue: value,
    radioButtonsOnChange: onChange
  };

  return <RadioButtonsContext.Provider value={context}>
    <div>{children}</div>
  </RadioButtonsContext.Provider>;
}

export function RadioButton({value, label}) {
  const context = React.useContext(RadioButtonsContext);
  if (!context) {
    throw new Error('RadioButton must be rendered inside RadioButtons');
  }
  const {radioButtonsGroupName, radioButtonsValue, radioButtonsOnChange} = context;
  const onChange = e => {
    radioButtonsOnChange(e.target.value)
  };
  label = label || value;
  return <label className={ls.radioButton}>
    <input type='radio' name={radioButtonsGroupName} checked={radioButtonsValue === value} 
           value={value} onChange={onChange}/> {label}
    
  </label>
}

let GROUP_COUNTER = 0;