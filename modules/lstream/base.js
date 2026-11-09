import {DistinctStream} from './distinct';
import {FilterStream} from './filter';
import {MapStream} from './map';
import {PairwiseStream} from './pairwise';
import {ScanStream} from './scan';
import {StateStream} from './state';
import {ThrottleStream} from './throttle';
import {configureStreamOperators, StreamBase} from './streamBase';

configureStreamOperators({
  DistinctStream,
  FilterStream,
  MapStream,
  PairwiseStream,
  ScanStream,
  StateStream,
  ThrottleStream
});

export {StreamBase};
