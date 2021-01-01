/* Utils for utils */

function Just (v) {
  return { map, chain, ap };

  function map (fn) {
    return Just(fn(v));
  }

  function chain (fn) {
    return fn(v);
  }

  function ap (other) {
    return other.map(v);
  }
}

function Nothing () {
  return {
    map: Nothing,
    chain: Nothing,
    ap: Nothing
  };
}

function fromNullable (val) {
  if (val == null) return Maybe.Nothing();
  return Maybe.of(val);
}

function Prop (prop) {
  return function (obj) {
    return fromNullable(obj[prop]);
  };
}

const Maybe = {
  Just,
  Nothing,
  of: Just
};

// generative for typecheck reducer
function typeGenerative (obj, name) {
	obj['is' + name] = _ => toString.call(_) == '[object ' + name + ']';
	return obj;
}

export {
  Maybe,
  Prop,
  typeGenerative
};
