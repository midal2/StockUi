import axios from 'axios';

export default function selectProgram(tile) {
  return {
    type: 'PROGRAM_SELECTED',
    payload: tile,
  }
}
