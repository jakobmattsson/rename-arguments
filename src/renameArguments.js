exports.introspect = function(f) {
  return /\(([\s\S]*?)\)/.exec(f)[1].split(/[ ,\n\r\t]+/).filter(function(arg) { return arg; });
};

exports.renameArguments = function(__somethingUnique, argNames) {
  return eval("(function(" + argNames.join(', ') + ") { return __somethingUnique.apply(this, arguments); });")
};
