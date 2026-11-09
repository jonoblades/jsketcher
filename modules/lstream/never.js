import {StreamBase} from './streamBase';
import {NOOP} from '../gems/func';

export class NeverStream extends StreamBase {

  attach(observer) {
    return NOOP;
  }

  next(value) {
  }
}

NeverStream.INSTANCE = new NeverStream();

