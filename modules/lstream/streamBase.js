let operators;

export function configureStreamOperators(streamOperators) {
  operators = streamOperators;
}

export class StreamBase {

  attach(observer) {}

  map(fn) {
    return new operators.MapStream(this, fn);
  }

  filter(predicate) {
    return new operators.FilterStream(this, predicate);
  }

  pairwise(first) {
    return new operators.PairwiseStream(this, first);
  }

  scan(initAccumulator, scanFunc) {
    return new operators.ScanStream(this, initAccumulator, scanFunc);
  }

  remember(initialValue, usingStream) {
    if (!usingStream) {
      usingStream = operators.StateStream;
    }
    const stateStream = new usingStream(initialValue);
    this.attach(v => stateStream.next(v));
    return stateStream;
  }

  distinct() {
    return new operators.DistinctStream(this);
  }

  throttle(delay, accumulator) {
    return new operators.ThrottleStream(this, delay, accumulator);
  }

  pipe(otherStream) {
    return this.attach(v => otherStream.next(v));
  }
}