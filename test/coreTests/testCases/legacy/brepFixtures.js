import overlapFaceEdge1HalfIntersectIn from './data/brep/overlap.face.edge1.half.intersect/in.json';
import overlapFaceEdge1HalfIntersectOut from './data/brep/overlap.face.edge1.half.intersect/out.json';
import overlapFaceEdge1HalfSubtractIn from './data/brep/overlap.face.edge1.half.subtract/in.json';
import overlapFaceEdge1HalfSubtractOut from './data/brep/overlap.face.edge1.half.subtract/out.json';
import overlapFaceEdge1IntersectIn from './data/brep/overlap.face.edge1.intersect/in.json';
import overlapFaceEdge1IntersectOut from './data/brep/overlap.face.edge1.intersect/out.json';
import overlapFaceEdge1SubtractIn from './data/brep/overlap.face.edge1.subtract/in.json';
import overlapFaceEdge1SubtractOut from './data/brep/overlap.face.edge1.subtract/out.json';
import overlapFaceEdge2HalfIntersectIn from './data/brep/overlap.face.edge2.half.intersect/in.json';
import overlapFaceEdge2HalfIntersectOut from './data/brep/overlap.face.edge2.half.intersect/out.json';
import overlapFaceEdge2HalfSubtractIn from './data/brep/overlap.face.edge2.half.subtract/in.json';
import overlapFaceEdge2HalfSubtractOut from './data/brep/overlap.face.edge2.half.subtract/out.json';
import overlapFaceEdge2IntersectIn from './data/brep/overlap.face.edge2.intersect/in.json';
import overlapFaceEdge2IntersectOut from './data/brep/overlap.face.edge2.intersect/out.json';
import overlapFaceEdge2SubtractIn from './data/brep/overlap.face.edge2.subtract/in.json';
import overlapFaceEdge2SubtractOut from './data/brep/overlap.face.edge2.subtract/out.json';
import overlapFaceHalfIntersectIn from './data/brep/overlap.face.half.intersect/in.json';
import overlapFaceHalfIntersectOut from './data/brep/overlap.face.half.intersect/out.json';
import overlapFaceHalfSubtractIn from './data/brep/overlap.face.half.subtract/in.json';
import overlapFaceHalfSubtractOut from './data/brep/overlap.face.half.subtract/out.json';
import overlapFaceInsideHalfIntersectIn from './data/brep/overlap.face.inside.half.intersect/in.json';
import overlapFaceInsideHalfIntersectOut from './data/brep/overlap.face.inside.half.intersect/out.json';
import overlapFaceInsideHalfSubtractIn from './data/brep/overlap.face.inside.half.subtract/in.json';
import overlapFaceInsideHalfSubtractOut from './data/brep/overlap.face.inside.half.subtract/out.json';
import overlapFaceInsideIntersectIn from './data/brep/overlap.face.inside.intersect/in.json';
import overlapFaceInsideIntersectOut from './data/brep/overlap.face.inside.intersect/out.json';
import overlapFaceInsideSubtractIn from './data/brep/overlap.face.inside.subtract/in.json';
import overlapFaceInsideSubtractOut from './data/brep/overlap.face.inside.subtract/out.json';
import overlapFaceIntersectIn from './data/brep/overlap.face.intersect/in.json';
import overlapFaceIntersectOut from './data/brep/overlap.face.intersect/out.json';
import overlapFaceSubtractIn from './data/brep/overlap.face.subtract/in.json';
import overlapFaceSubtractOut from './data/brep/overlap.face.subtract/out.json';
import overlapKissEdgeHalfIntersectIn from './data/brep/overlap.kiss.edge.half.intersect/in.json';
import overlapKissEdgeHalfIntersectOut from './data/brep/overlap.kiss.edge.half.intersect/out.json';
import overlapKissEdgeHalfSubtractIn from './data/brep/overlap.kiss.edge.half.subtract/in.json';
import overlapKissEdgeHalfSubtractOut from './data/brep/overlap.kiss.edge.half.subtract/out.json';
import overlapKissEdgeIntersectIn from './data/brep/overlap.kiss.edge.intersect/in.json';
import overlapKissEdgeIntersectOut from './data/brep/overlap.kiss.edge.intersect/out.json';
import overlapKissEdgeSubtractIn from './data/brep/overlap.kiss.edge.subtract/in.json';
import overlapKissEdgeSubtractOut from './data/brep/overlap.kiss.edge.subtract/out.json';
import overlapKissEdge4HalfIntersectIn from './data/brep/overlap.kiss.edge4.half.intersect/in.json';
import overlapKissEdge4HalfIntersectOut from './data/brep/overlap.kiss.edge4.half.intersect/out.json';
import overlapKissEdge4HalfSubtractIn from './data/brep/overlap.kiss.edge4.half.subtract/in.json';
import overlapKissEdge4HalfSubtractOut from './data/brep/overlap.kiss.edge4.half.subtract/out.json';
import overlapKissEdge4IntersectIn from './data/brep/overlap.kiss.edge4.intersect/in.json';
import overlapKissEdge4IntersectOut from './data/brep/overlap.kiss.edge4.intersect/out.json';
import overlapKissEdge4SubtractIn from './data/brep/overlap.kiss.edge4.subtract/in.json';
import overlapKissEdge4SubtractOut from './data/brep/overlap.kiss.edge4.subtract/out.json';
import simpleIntersectIn from './data/brep/simple.intersect/in.json';
import simpleIntersectOut from './data/brep/simple.intersect/out.json';
import simpleSubtractIn from './data/brep/simple.subtract/in.json';
import simpleSubtractOut from './data/brep/simple.subtract/out.json';
import simpleUnionIn from './data/brep/simple.union/in.json';
import simpleUnionOut from './data/brep/simple.union/out.json';
import starIntersectIn from './data/brep/star.intersect/in.json';
import starIntersectOut from './data/brep/star.intersect/out.json';
import starSubtractIn from './data/brep/star.subtract/in.json';
import starSubtractOut from './data/brep/star.subtract/out.json';

const fixtures = {
  'overlap.face.edge1.half.intersect': {in: overlapFaceEdge1HalfIntersectIn, out: overlapFaceEdge1HalfIntersectOut},
  'overlap.face.edge1.half.subtract': {in: overlapFaceEdge1HalfSubtractIn, out: overlapFaceEdge1HalfSubtractOut},
  'overlap.face.edge1.intersect': {in: overlapFaceEdge1IntersectIn, out: overlapFaceEdge1IntersectOut},
  'overlap.face.edge1.subtract': {in: overlapFaceEdge1SubtractIn, out: overlapFaceEdge1SubtractOut},
  'overlap.face.edge2.half.intersect': {in: overlapFaceEdge2HalfIntersectIn, out: overlapFaceEdge2HalfIntersectOut},
  'overlap.face.edge2.half.subtract': {in: overlapFaceEdge2HalfSubtractIn, out: overlapFaceEdge2HalfSubtractOut},
  'overlap.face.edge2.intersect': {in: overlapFaceEdge2IntersectIn, out: overlapFaceEdge2IntersectOut},
  'overlap.face.edge2.subtract': {in: overlapFaceEdge2SubtractIn, out: overlapFaceEdge2SubtractOut},
  'overlap.face.half.intersect': {in: overlapFaceHalfIntersectIn, out: overlapFaceHalfIntersectOut},
  'overlap.face.half.subtract': {in: overlapFaceHalfSubtractIn, out: overlapFaceHalfSubtractOut},
  'overlap.face.inside.half.intersect': {in: overlapFaceInsideHalfIntersectIn, out: overlapFaceInsideHalfIntersectOut},
  'overlap.face.inside.half.subtract': {in: overlapFaceInsideHalfSubtractIn, out: overlapFaceInsideHalfSubtractOut},
  'overlap.face.inside.intersect': {in: overlapFaceInsideIntersectIn, out: overlapFaceInsideIntersectOut},
  'overlap.face.inside.subtract': {in: overlapFaceInsideSubtractIn, out: overlapFaceInsideSubtractOut},
  'overlap.face.intersect': {in: overlapFaceIntersectIn, out: overlapFaceIntersectOut},
  'overlap.face.subtract': {in: overlapFaceSubtractIn, out: overlapFaceSubtractOut},
  'overlap.kiss.edge.half.intersect': {in: overlapKissEdgeHalfIntersectIn, out: overlapKissEdgeHalfIntersectOut},
  'overlap.kiss.edge.half.subtract': {in: overlapKissEdgeHalfSubtractIn, out: overlapKissEdgeHalfSubtractOut},
  'overlap.kiss.edge.intersect': {in: overlapKissEdgeIntersectIn, out: overlapKissEdgeIntersectOut},
  'overlap.kiss.edge.subtract': {in: overlapKissEdgeSubtractIn, out: overlapKissEdgeSubtractOut},
  'overlap.kiss.edge4.half.intersect': {in: overlapKissEdge4HalfIntersectIn, out: overlapKissEdge4HalfIntersectOut},
  'overlap.kiss.edge4.half.subtract': {in: overlapKissEdge4HalfSubtractIn, out: overlapKissEdge4HalfSubtractOut},
  'overlap.kiss.edge4.intersect': {in: overlapKissEdge4IntersectIn, out: overlapKissEdge4IntersectOut},
  'overlap.kiss.edge4.subtract': {in: overlapKissEdge4SubtractIn, out: overlapKissEdge4SubtractOut},
  'simple.intersect': {in: simpleIntersectIn, out: simpleIntersectOut},
  'simple.subtract': {in: simpleSubtractIn, out: simpleSubtractOut},
  'simple.union': {in: simpleUnionIn, out: simpleUnionOut},
  'star.intersect': {in: starIntersectIn, out: starIntersectOut},
  'star.subtract': {in: starSubtractIn, out: starSubtractOut}
};

export default fixtures;
