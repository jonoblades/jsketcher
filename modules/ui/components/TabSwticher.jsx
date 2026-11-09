import React, {Fragment} from 'react';
import MaterialIcon from 'ui/components/MaterialIcon';
import cx from 'classnames';

import ls from './TabSwitcher.css';

export default function TabSwitcher({children, className}) {

  return <div className={cx(ls.root, className, 'disable-selection')}>
    {children}
  </div>  
}

export function Tab({label, active, readOnly, onSwitch, onDetach, onClose}) {
  return <span className={cx(ls.tab, active && ls.active)} onClick={onSwitch}>
    {label} 
    {!readOnly && <Fragment>
      <MaterialIcon fw icon='expand' className={ls.expand} onClick={onDetach}/>
      <MaterialIcon fw icon='close' className={ls.close} onClick={onClose} />
    </Fragment>}
  </span>;
}