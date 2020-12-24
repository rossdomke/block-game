import { BlockCell } from './Block';

const smallL:BlockCell[][] = [
  [{filled: true},  {filled: false}],
  [{filled: true},  {filled: true}]
];
const l:BlockCell[][] = [
  [{filled: true},  {filled: false}],
  [{filled: true},  {filled: false}],
  [{filled: true},  {filled: true}]
];
const bigL:BlockCell[][] = [
  [{filled: true}, {filled: false}, {filled: false}],
  [{filled: true}, {filled: false}, {filled: false}],
  [{filled: true}, {filled: true}, {filled: true}],
];

const i:BlockCell[][] = [
  [{filled: true}, {filled: true}, {filled: true}]
];

const smallI:BlockCell[][] = [
  [{filled: true}, {filled: true}]
];

const s:BlockCell[][] = [
  [{filled: false}, {filled: true}, {filled: true}],
  [{filled: true}, {filled: true}, {filled: false}]
];

const t:BlockCell[][] = [
  [{filled: false}, {filled: true}, {filled: false}],
  [{filled: true}, {filled: true}, {filled: true}]
];

const o:BlockCell[][] = [
  [{filled: true}, {filled: true}],
  [{filled: true}, {filled: true}]
];
const smallO:BlockCell[][] = [
  [{filled: true}]
]

const bigO:BlockCell[][] = [
  [{filled: true}, {filled: true}, {filled: true}],
  [{filled: true}, {filled: true}, {filled: true}],
  [{filled: true}, {filled: true}, {filled: true}]
];


export { smallL, l, bigL, i, smallI, s, t, o, smallO, bigO }