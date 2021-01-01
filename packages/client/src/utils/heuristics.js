import { typeGenerative } from './utils.helpers';

const typeChecks = [
	'Arguments',
	'Function',
	'String',
	'Number',
	'Date',
  'RegExp',
  'Object'
  ].reduce(typeGenerative, {});

function isSerialized (_) {
  if (typeof _ === 'string') {
    try {
      JSON.parse(_);
      return true;
    } catch (ex) {
      return false;
    }
  }
}

export {
  typeChecks,
  isSerialized
};
