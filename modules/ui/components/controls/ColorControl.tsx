import React, {useState} from 'react';
import {HexColorPicker} from 'react-colorful';
import Button from "ui/components/controls/Button";
import {CgColorPicker} from "react-icons/cg";
import {Dialog} from "ui/components/Dialog";
import ButtonGroup from "ui/components/controls/ButtonGroup";
import {RiDeleteBack2Line} from "react-icons/ri";

interface ColorControlProps {

  value: string;

  onChange: any;

  dialogTitle?: any

}

export function ColorControl(props: ColorControlProps) {
  const [open, setOpen] = useState(false);
  const {onChange, value} = props;
  const style = value ? { backgroundColor: value } : undefined;

  return <React.Fragment>
    <ButtonGroup>
      <span style={{
        alignItems: 'center',
        display: 'inline-flex',
        padding: '0 3px',
        fontFamily: 'monospace',
        ...style
      }}>{value||<NoValue/>}</span>
      <Button compact onClick={() => onChange(null)}><RiDeleteBack2Line /></Button>
      <Button compact onClick={() => setOpen(true)}><CgColorPicker /></Button>
    </ButtonGroup>
    {open && <ColorDialog value={value||'white'} onChange={onChange} onClose={() => setOpen(false)} title={props.dialogTitle}/>}
  </React.Fragment>
}

function ColorDialog({onChange, value, title, onClose}) {
  return <Dialog title={title||'color'} onClose={onClose} compact>
    <HexColorPicker color={value} onChange={onChange}/>
  </Dialog>
}

function NoValue() {
  return <span style={{fontStyle: 'italic'}}>{'<not set>'}</span>;
}