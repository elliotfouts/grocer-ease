const dropUndefined = (object) => {
  const keys = Object.keys(object);

	keys.forEach(key => {
    if (object[key] == undefined)
      delete object[key];
    else if (typeof object[key] == 'object')
      object[key] = dropUndefined(object[key]);
  });

  return object;
};

module.exports = dropUndefined;
