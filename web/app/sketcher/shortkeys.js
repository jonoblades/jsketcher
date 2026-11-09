import {keymap} from './keymaps/default'
import {bindShortcut} from 'ui/keyboardShortcuts';
import {getSketcherActionIndex} from "./actions";

export function initShortkeys(ctx) {

  for (const action of Object.keys(keymap)) {
    bindShortcut(keymap[action], e =>{
      e.preventDefault();//prevent the browser to execute it's keyboard handlers.
    
       getSketcherActionIndex()[action].invoke(ctx,e);
    
    });
  }
}
