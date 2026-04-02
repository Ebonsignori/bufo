"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/new-main-tadpole.tsx
var new_main_tadpole_exports = {};
__export(new_main_tadpole_exports, {
  default: () => NewMainTadpole
});
module.exports = __toCommonJS(new_main_tadpole_exports);
var import_api = require("@raycast/api");
var import_react = require("react");

// ../packages/core/dist/config.js
var import_fs = require("fs");
var import_path = require("path");
var import_os = require("os");

// ../node_modules/js-yaml/dist/js-yaml.mjs
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
  return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];
  return [sequence];
}
function extend(target, source) {
  var index, length, key, sourceKeys;
  if (source) {
    sourceKeys = Object.keys(source);
    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }
  return target;
}
function repeat(string, count) {
  var result = "", cycle;
  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }
  return result;
}
function isNegativeZero(number) {
  return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
  isNothing: isNothing_1,
  isObject: isObject_1,
  toArray: toArray_1,
  repeat: repeat_1,
  isNegativeZero: isNegativeZero_1,
  extend: extend_1
};
function formatError(exception2, compact) {
  var where = "", message = exception2.reason || "(unknown reason)";
  if (!exception2.mark) return message;
  if (exception2.mark.name) {
    where += 'in "' + exception2.mark.name + '" ';
  }
  where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
  if (!compact && exception2.mark.snippet) {
    where += "\n\n" + exception2.mark.snippet;
  }
  return message + " " + where;
}
function YAMLException$1(reason, mark) {
  Error.call(this);
  this.name = "YAMLException";
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack || "";
  }
}
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
  return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = "";
  var tail = "";
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
  if (position - lineStart > maxHalfLength) {
    head = " ... ";
    lineStart = position - maxHalfLength + head.length;
  }
  if (lineEnd - position > maxHalfLength) {
    tail = " ...";
    lineEnd = position + maxHalfLength - tail.length;
  }
  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
    pos: position - lineStart + head.length
    // relative position
  };
}
function padStart(string, max) {
  return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
  options = Object.create(options || null);
  if (!mark.buffer) return null;
  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent !== "number") options.indent = 1;
  if (typeof options.linesBefore !== "number") options.linesBefore = 3;
  if (typeof options.linesAfter !== "number") options.linesAfter = 2;
  var re = /\r?\n|\r|\0/g;
  var lineStarts = [0];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;
  while (match = re.exec(mark.buffer)) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);
    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }
  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
  var result = "", i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
  }
  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
  }
  return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
];
var YAML_NODE_KINDS = [
  "scalar",
  "sequence",
  "mapping"
];
function compileStyleAliases(map2) {
  var result = {};
  if (map2 !== null) {
    Object.keys(map2).forEach(function(style) {
      map2[style].forEach(function(alias) {
        result[String(alias)] = style;
      });
    });
  }
  return result;
}
function Type$1(tag, options) {
  options = options || {};
  Object.keys(options).forEach(function(name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });
  this.options = options;
  this.tag = tag;
  this.kind = options["kind"] || null;
  this.resolve = options["resolve"] || function() {
    return true;
  };
  this.construct = options["construct"] || function(data) {
    return data;
  };
  this.instanceOf = options["instanceOf"] || null;
  this.predicate = options["predicate"] || null;
  this.represent = options["represent"] || null;
  this.representName = options["representName"] || null;
  this.defaultStyle = options["defaultStyle"] || null;
  this.multi = options["multi"] || false;
  this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}
var type = Type$1;
function compileList(schema2, name) {
  var result = [];
  schema2[name].forEach(function(currentType) {
    var newIndex = result.length;
    result.forEach(function(previousType, previousIndex) {
      if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
        newIndex = previousIndex;
      }
    });
    result[newIndex] = currentType;
  });
  return result;
}
function compileMap() {
  var result = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, index, length;
  function collectType(type2) {
    if (type2.multi) {
      result.multi[type2.kind].push(type2);
      result.multi["fallback"].push(type2);
    } else {
      result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
    }
  }
  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}
function Schema$1(definition) {
  return this.extend(definition);
}
Schema$1.prototype.extend = function extend2(definition) {
  var implicit = [];
  var explicit = [];
  if (definition instanceof type) {
    explicit.push(definition);
  } else if (Array.isArray(definition)) {
    explicit = explicit.concat(definition);
  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);
  } else {
    throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  }
  implicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
    if (type$1.loadKind && type$1.loadKind !== "scalar") {
      throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    }
    if (type$1.multi) {
      throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }
  });
  explicit.forEach(function(type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    }
  });
  var result = Object.create(Schema$1.prototype);
  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);
  result.compiledImplicit = compileList(result, "implicit");
  result.compiledExplicit = compileList(result, "explicit");
  result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
  return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(data) {
    return data !== null ? data : "";
  }
});
var seq = new type("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(data) {
    return data !== null ? data : [];
  }
});
var map = new type("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(data) {
    return data !== null ? data : {};
  }
});
var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});
function resolveYamlNull(data) {
  if (data === null) return true;
  var max = data.length;
  return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
  return null;
}
function isNull(object) {
  return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
  if (data === null) return false;
  var max = data.length;
  return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
  return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
  return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function(object) {
      return object ? "true" : "false";
    },
    uppercase: function(object) {
      return object ? "TRUE" : "FALSE";
    },
    camelcase: function(object) {
      return object ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  if (data === null) return false;
  var max = data.length, index = 0, hasDigits = false, ch;
  if (!max) return false;
  ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max) return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (ch !== "0" && ch !== "1") return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "o") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_") continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
  }
  if (ch === "_") return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_") continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_") return false;
  return true;
}
function constructYamlInteger(data) {
  var value = data, sign = 1, ch;
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-") sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0") return 0;
  if (ch === "0") {
    if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
    if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
}
var int = new type("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary: function(obj) {
      return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
    },
    octal: function(obj) {
      return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
    },
    decimal: function(obj) {
      return obj.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(obj) {
      return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function resolveYamlFloat(data) {
  if (data === null) return false;
  if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  data[data.length - 1] === "_") {
    return false;
  }
  return true;
}
function constructYamlFloat(data) {
  var value, sign;
  value = data.replace(/_/g, "").toLowerCase();
  sign = value[0] === "-" ? -1 : 1;
  if ("+-".indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }
  if (value === ".inf") {
    return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  } else if (value === ".nan") {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
  var res;
  if (isNaN(object)) {
    switch (style) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  } else if (common.isNegativeZero(object)) {
    return "-0.0";
  }
  res = object.toString(10);
  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var float = new type("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: "lowercase"
});
var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
);
var YAML_TIMESTAMP_REGEXP = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}
function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
  if (match === null) throw new Error("Date resolve error");
  year = +match[1];
  month = +match[2] - 1;
  day = +match[3];
  if (!match[4]) {
    return new Date(Date.UTC(year, month, day));
  }
  hour = +match[4];
  minute = +match[5];
  second = +match[6];
  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) {
      fraction += "0";
    }
    fraction = +fraction;
  }
  if (match[9]) {
    tz_hour = +match[10];
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 6e4;
    if (match[9] === "-") delta = -delta;
  }
  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
  if (delta) date.setTime(date.getTime() - delta);
  return date;
}
function representYamlTimestamp(object) {
  return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null) return false;
  var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    code = map2.indexOf(data.charAt(idx));
    if (code > 64) continue;
    if (code < 0) return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
  for (idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map2.indexOf(input.charAt(idx));
  }
  tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Uint8Array(result);
}
function representYamlBinary(object) {
  var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
  for (idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  tail = max % 3;
  if (tail === 0) {
    result += map2[bits >> 18 & 63];
    result += map2[bits >> 12 & 63];
    result += map2[bits >> 6 & 63];
    result += map2[bits & 63];
  } else if (tail === 2) {
    result += map2[bits >> 10 & 63];
    result += map2[bits >> 4 & 63];
    result += map2[bits << 2 & 63];
    result += map2[64];
  } else if (tail === 1) {
    result += map2[bits >> 2 & 63];
    result += map2[bits << 4 & 63];
    result += map2[64];
    result += map2[64];
  }
  return result;
}
function isBinary(obj) {
  return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
  if (data === null) return true;
  var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;
    if (_toString$2.call(pair) !== "[object Object]") return false;
    for (pairKey in pair) {
      if (_hasOwnProperty$3.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }
    if (!pairHasKey) return false;
    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }
  return true;
}
function constructYamlOmap(data) {
  return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
  if (data === null) return true;
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    if (_toString$1.call(pair) !== "[object Object]") return false;
    keys = Object.keys(pair);
    if (keys.length !== 1) return false;
    result[index] = [keys[0], pair[keys[0]]];
  }
  return true;
}
function constructYamlPairs(data) {
  if (data === null) return [];
  var index, length, pair, keys, result, object = data;
  result = new Array(object.length);
  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    keys = Object.keys(pair);
    result[index] = [keys[0], pair[keys[0]]];
  }
  return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null) return true;
  var key, object = data;
  for (key in object) {
    if (_hasOwnProperty$2.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: resolveYamlSet,
  construct: constructYamlSet
});
var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});
var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
  return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
  return c === 10 || c === 13;
}
function is_WHITE_SPACE(c) {
  return c === 9 || c === 32;
}
function is_WS_OR_EOL(c) {
  return c === 9 || c === 32 || c === 10 || c === 13;
}
function is_FLOW_INDICATOR(c) {
  return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
}
function fromHexCode(c) {
  var lc;
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  lc = c | 32;
  if (97 <= lc && lc <= 102) {
    return lc - 97 + 10;
  }
  return -1;
}
function escapedHexLen(c) {
  if (c === 120) {
    return 2;
  }
  if (c === 117) {
    return 4;
  }
  if (c === 85) {
    return 8;
  }
  return 0;
}
function fromDecimalCode(c) {
  if (48 <= c && c <= 57) {
    return c - 48;
  }
  return -1;
}
function simpleEscapeSequence(c) {
  return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
}
function charFromCodepoint(c) {
  if (c <= 65535) {
    return String.fromCharCode(c);
  }
  return String.fromCharCode(
    (c - 65536 >> 10) + 55296,
    (c - 65536 & 1023) + 56320
  );
}
function setProperty(object, key, value) {
  if (key === "__proto__") {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value
    });
  } else {
    object[key] = value;
  }
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
for (i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}
var i;
function State$1(input, options) {
  this.input = input;
  this.filename = options["filename"] || null;
  this.schema = options["schema"] || _default;
  this.onWarning = options["onWarning"] || null;
  this.legacy = options["legacy"] || false;
  this.json = options["json"] || false;
  this.listener = options["listener"] || null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap = this.schema.compiledTypeMap;
  this.length = input.length;
  this.position = 0;
  this.line = 0;
  this.lineStart = 0;
  this.lineIndent = 0;
  this.firstTabInLine = -1;
  this.documents = [];
}
function generateError(state, message) {
  var mark = {
    name: state.filename,
    buffer: state.input.slice(0, -1),
    // omit trailing \0
    position: state.position,
    line: state.line,
    column: state.position - state.lineStart
  };
  mark.snippet = snippet(mark);
  return new exception(message, mark);
}
function throwError(state, message) {
  throw generateError(state, message);
}
function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}
var directiveHandlers = {
  YAML: function handleYamlDirective(state, name, args) {
    var match, major, minor;
    if (state.version !== null) {
      throwError(state, "duplication of %YAML directive");
    }
    if (args.length !== 1) {
      throwError(state, "YAML directive accepts exactly one argument");
    }
    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
    if (match === null) {
      throwError(state, "ill-formed argument of the YAML directive");
    }
    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);
    if (major !== 1) {
      throwError(state, "unacceptable YAML version of the document");
    }
    state.version = args[0];
    state.checkLineBreaks = minor < 2;
    if (minor !== 1 && minor !== 2) {
      throwWarning(state, "unsupported YAML version of the document");
    }
  },
  TAG: function handleTagDirective(state, name, args) {
    var handle, prefix;
    if (args.length !== 2) {
      throwError(state, "TAG directive accepts exactly two arguments");
    }
    handle = args[0];
    prefix = args[1];
    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
    }
    if (_hasOwnProperty$1.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }
    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
    }
    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, "tag prefix is malformed: " + prefix);
    }
    state.tagMap[handle] = prefix;
  }
};
function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;
  if (start < end) {
    _result = state.input.slice(start, end);
    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
          throwError(state, "expected valid JSON character");
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, "the stream contains non-printable characters");
    }
    state.result += _result;
  }
}
function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;
  if (!common.isObject(source)) {
    throwError(state, "cannot merge mappings; the provided source object is unacceptable");
  }
  sourceKeys = Object.keys(source);
  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];
    if (!_hasOwnProperty$1.call(destination, key)) {
      setProperty(destination, key, source[key]);
      overridableKeys[key] = true;
    }
  }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
  var index, quantity;
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);
    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, "nested arrays are not supported inside keys");
      }
      if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
        keyNode[index] = "[object Object]";
      }
    }
  }
  if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
    keyNode = "[object Object]";
  }
  keyNode = String(keyNode);
  if (_result === null) {
    _result = {};
  }
  if (keyTag === "tag:yaml.org,2002:merge") {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, "duplicated mapping key");
    }
    setProperty(_result, keyNode, valueNode);
    delete overridableKeys[keyNode];
  }
  return _result;
}
function readLineBreak(state) {
  var ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 10) {
    state.position++;
  } else if (ch === 13) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 10) {
      state.position++;
    }
  } else {
    throwError(state, "a line break is expected");
  }
  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 9 && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    if (allowComments && ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 10 && ch !== 13 && ch !== 0);
    }
    if (is_EOL(ch)) {
      readLineBreak(state);
      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;
      while (ch === 32) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }
  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, "deficient indentation");
  }
  return lineBreaks;
}
function testDocumentSeparator(state) {
  var _position = state.position, ch;
  ch = state.input.charCodeAt(_position);
  if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
    _position += 3;
    ch = state.input.charCodeAt(_position);
    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }
  return false;
}
function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += " ";
  } else if (count > 1) {
    state.result += common.repeat("\n", count - 1);
  }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
  ch = state.input.charCodeAt(state.position);
  if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
    return false;
  }
  if (ch === 63 || ch === 45) {
    following = state.input.charCodeAt(state.position + 1);
    if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }
  state.kind = "scalar";
  state.result = "";
  captureStart = captureEnd = state.position;
  hasPendingContent = false;
  while (ch !== 0) {
    if (ch === 58) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }
    } else if (ch === 35) {
      preceding = state.input.charCodeAt(state.position - 1);
      if (is_WS_OR_EOL(preceding)) {
        break;
      }
    } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;
    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);
      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }
    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }
    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }
    ch = state.input.charCodeAt(++state.position);
  }
  captureSegment(state, captureStart, captureEnd, false);
  if (state.result) {
    return true;
  }
  state.kind = _kind;
  state.result = _result;
  return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
  var ch, captureStart, captureEnd;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 39) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 39) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (ch === 39) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a single quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 34) {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  state.position++;
  captureStart = captureEnd = state.position;
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 34) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;
    } else if (ch === 92) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);
      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;
      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;
        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);
          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;
          } else {
            throwError(state, "expected hexadecimal character");
          }
        }
        state.result += charFromCodepoint(hexResult);
        state.position++;
      } else {
        throwError(state, "unknown escape sequence");
      }
      captureStart = captureEnd = state.position;
    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;
    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, "unexpected end of the document within a double quoted scalar");
    } else {
      state.position++;
      captureEnd = state.position;
    }
  }
  throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
  var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 91) {
    terminator = 93;
    isMapping = false;
    _result = [];
  } else if (ch === 123) {
    terminator = 125;
    isMapping = true;
    _result = {};
  } else {
    return false;
  }
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(++state.position);
  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? "mapping" : "sequence";
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, "missed comma between flow collection entries");
    } else if (ch === 44) {
      throwError(state, "expected the node content, but found ','");
    }
    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;
    if (ch === 63) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }
    _line = state.line;
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if ((isExplicitPair || state.line === _line) && ch === 58) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }
    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }
    skipSeparationSpace(state, true, nodeIndent);
    ch = state.input.charCodeAt(state.position);
    if (ch === 44) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }
  throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
  var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch === 124) {
    folding = false;
  } else if (ch === 62) {
    folding = true;
  } else {
    return false;
  }
  state.kind = "scalar";
  state.result = "";
  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);
    if (ch === 43 || ch === 45) {
      if (CHOMPING_CLIP === chomping) {
        chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, "repeat of a chomping mode identifier");
      }
    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, "repeat of an indentation width identifier");
      }
    } else {
      break;
    }
  }
  if (is_WHITE_SPACE(ch)) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (is_WHITE_SPACE(ch));
    if (ch === 35) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (!is_EOL(ch) && ch !== 0);
    }
  }
  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;
    ch = state.input.charCodeAt(state.position);
    while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }
    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }
    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }
    if (state.lineIndent < textIndent) {
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) {
          state.result += "\n";
        }
      }
      break;
    }
    if (folding) {
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat("\n", emptyLines + 1);
      } else if (emptyLines === 0) {
        if (didReadContent) {
          state.result += " ";
        }
      } else {
        state.result += common.repeat("\n", emptyLines);
      }
    } else {
      state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
    }
    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;
    while (!is_EOL(ch) && ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, state.position, false);
  }
  return true;
}
function readBlockSequence(state, nodeIndent) {
  var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    if (ch !== 45) {
      break;
    }
    following = state.input.charCodeAt(state.position + 1);
    if (!is_WS_OR_EOL(following)) {
      break;
    }
    detected = true;
    state.position++;
    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }
    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a sequence entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "sequence";
    state.result = _result;
    return true;
  }
  return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
  var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
  if (state.firstTabInLine !== -1) return false;
  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }
  ch = state.input.charCodeAt(state.position);
  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, "tab characters must not be used in indentation");
    }
    following = state.input.charCodeAt(state.position + 1);
    _line = state.line;
    if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
      if (ch === 63) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        detected = true;
        atExplicitKey = true;
        allowCompact = true;
      } else if (atExplicitKey) {
        atExplicitKey = false;
        allowCompact = true;
      } else {
        throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
      }
      state.position += 1;
      ch = following;
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;
      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        break;
      }
      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 58) {
          ch = state.input.charCodeAt(++state.position);
          if (!is_WS_OR_EOL(ch)) {
            throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
          }
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;
        } else if (detected) {
          throwError(state, "can not read an implicit mapping pair; a colon is missed");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      } else if (detected) {
        throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true;
      }
    }
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }
      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }
      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }
    if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
      throwError(state, "bad indentation of a mapping entry");
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = "mapping";
    state.result = _result;
  }
  return detected;
}
function readTagProperty(state) {
  var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 33) return false;
  if (state.tag !== null) {
    throwError(state, "duplication of a tag property");
  }
  ch = state.input.charCodeAt(++state.position);
  if (ch === 60) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);
  } else if (ch === 33) {
    isNamed = true;
    tagHandle = "!!";
    ch = state.input.charCodeAt(++state.position);
  } else {
    tagHandle = "!";
  }
  _position = state.position;
  if (isVerbatim) {
    do {
      ch = state.input.charCodeAt(++state.position);
    } while (ch !== 0 && ch !== 62);
    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, "unexpected end of the stream within a verbatim tag");
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      if (ch === 33) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);
          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, "named tag handle cannot contain such characters");
          }
          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, "tag suffix cannot contain exclamation marks");
        }
      }
      ch = state.input.charCodeAt(++state.position);
    }
    tagName = state.input.slice(_position, state.position);
    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, "tag suffix cannot contain flow indicator characters");
    }
  }
  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, "tag name cannot contain such characters: " + tagName);
  }
  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, "tag name is malformed: " + tagName);
  }
  if (isVerbatim) {
    state.tag = tagName;
  } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;
  } else if (tagHandle === "!") {
    state.tag = "!" + tagName;
  } else if (tagHandle === "!!") {
    state.tag = "tag:yaml.org,2002:" + tagName;
  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }
  return true;
}
function readAnchorProperty(state) {
  var _position, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 38) return false;
  if (state.anchor !== null) {
    throwError(state, "duplication of an anchor property");
  }
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an anchor node must contain at least one character");
  }
  state.anchor = state.input.slice(_position, state.position);
  return true;
}
function readAlias(state) {
  var _position, alias, ch;
  ch = state.input.charCodeAt(state.position);
  if (ch !== 42) return false;
  ch = state.input.charCodeAt(++state.position);
  _position = state.position;
  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }
  if (state.position === _position) {
    throwError(state, "name of an alias node must contain at least one character");
  }
  alias = state.input.slice(_position, state.position);
  if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }
  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
  if (state.listener !== null) {
    state.listener("open", state);
  }
  state.tag = null;
  state.anchor = null;
  state.kind = null;
  state.result = null;
  allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;
      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }
  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }
  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }
  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }
    blockIndent = state.position - state.lineStart;
    if (indentStatus === 1) {
      if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;
        } else if (readAlias(state)) {
          hasContent = true;
          if (state.tag !== null || state.anchor !== null) {
            throwError(state, "alias node should not have any properties");
          }
        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;
          if (state.tag === null) {
            state.tag = "?";
          }
        }
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }
  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }
  } else if (state.tag === "?") {
    if (state.result !== null && state.kind !== "scalar") {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }
    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type2 = state.implicitTypes[typeIndex];
      if (type2.resolve(state.result)) {
        state.result = type2.construct(state.result);
        state.tag = type2.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== "!") {
    if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
      type2 = state.typeMap[state.kind || "fallback"][state.tag];
    } else {
      type2 = null;
      typeList = state.typeMap.multi[state.kind || "fallback"];
      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type2 = typeList[typeIndex];
          break;
        }
      }
    }
    if (!type2) {
      throwError(state, "unknown tag !<" + state.tag + ">");
    }
    if (state.result !== null && type2.kind !== state.kind) {
      throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
    }
    if (!type2.resolve(state.result, state.tag)) {
      throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
    } else {
      state.result = type2.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }
  if (state.listener !== null) {
    state.listener("close", state);
  }
  return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
  var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = /* @__PURE__ */ Object.create(null);
  state.anchorMap = /* @__PURE__ */ Object.create(null);
  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);
    ch = state.input.charCodeAt(state.position);
    if (state.lineIndent > 0 || ch !== 37) {
      break;
    }
    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];
    if (directiveName.length < 1) {
      throwError(state, "directive name must not be less than one character in length");
    }
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && !is_EOL(ch));
        break;
      }
      if (is_EOL(ch)) break;
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveArgs.push(state.input.slice(_position, state.position));
    }
    if (ch !== 0) readLineBreak(state);
    if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }
  skipSeparationSpace(state, true, -1);
  if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);
  } else if (hasDirectives) {
    throwError(state, "directives end mark is expected");
  }
  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);
  if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, "non-ASCII line breaks are interpreted as content");
  }
  state.documents.push(state.result);
  if (state.position === state.lineStart && testDocumentSeparator(state)) {
    if (state.input.charCodeAt(state.position) === 46) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }
  if (state.position < state.length - 1) {
    throwError(state, "end of the stream or a document separator is expected");
  } else {
    return;
  }
}
function loadDocuments(input, options) {
  input = String(input);
  options = options || {};
  if (input.length !== 0) {
    if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
      input += "\n";
    }
    if (input.charCodeAt(0) === 65279) {
      input = input.slice(1);
    }
  }
  var state = new State$1(input, options);
  var nullpos = input.indexOf("\0");
  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, "null byte is not allowed in input");
  }
  state.input += "\0";
  while (state.input.charCodeAt(state.position) === 32) {
    state.lineIndent += 1;
    state.position += 1;
  }
  while (state.position < state.length - 1) {
    readDocument(state);
  }
  return state.documents;
}
function loadAll$1(input, iterator, options) {
  if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
    options = iterator;
    iterator = null;
  }
  var documents = loadDocuments(input, options);
  if (typeof iterator !== "function") {
    return documents;
  }
  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}
function load$1(input, options) {
  var documents = loadDocuments(input, options);
  if (documents.length === 0) {
    return void 0;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
  loadAll: loadAll_1,
  load: load_1
};
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 65279;
var CHAR_TAB = 9;
var CHAR_LINE_FEED = 10;
var CHAR_CARRIAGE_RETURN = 13;
var CHAR_SPACE = 32;
var CHAR_EXCLAMATION = 33;
var CHAR_DOUBLE_QUOTE = 34;
var CHAR_SHARP = 35;
var CHAR_PERCENT = 37;
var CHAR_AMPERSAND = 38;
var CHAR_SINGLE_QUOTE = 39;
var CHAR_ASTERISK = 42;
var CHAR_COMMA = 44;
var CHAR_MINUS = 45;
var CHAR_COLON = 58;
var CHAR_EQUALS = 61;
var CHAR_GREATER_THAN = 62;
var CHAR_QUESTION = 63;
var CHAR_COMMERCIAL_AT = 64;
var CHAR_LEFT_SQUARE_BRACKET = 91;
var CHAR_RIGHT_SQUARE_BRACKET = 93;
var CHAR_GRAVE_ACCENT = 96;
var CHAR_LEFT_CURLY_BRACKET = 123;
var CHAR_VERTICAL_LINE = 124;
var CHAR_RIGHT_CURLY_BRACKET = 125;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0] = "\\0";
ESCAPE_SEQUENCES[7] = "\\a";
ESCAPE_SEQUENCES[8] = "\\b";
ESCAPE_SEQUENCES[9] = "\\t";
ESCAPE_SEQUENCES[10] = "\\n";
ESCAPE_SEQUENCES[11] = "\\v";
ESCAPE_SEQUENCES[12] = "\\f";
ESCAPE_SEQUENCES[13] = "\\r";
ESCAPE_SEQUENCES[27] = "\\e";
ESCAPE_SEQUENCES[34] = '\\"';
ESCAPE_SEQUENCES[92] = "\\\\";
ESCAPE_SEQUENCES[133] = "\\N";
ESCAPE_SEQUENCES[160] = "\\_";
ESCAPE_SEQUENCES[8232] = "\\L";
ESCAPE_SEQUENCES[8233] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema2, map2) {
  var result, keys, index, length, tag, style, type2;
  if (map2 === null) return {};
  result = {};
  keys = Object.keys(map2);
  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map2[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = "tag:yaml.org,2002:" + tag.slice(2);
    }
    type2 = schema2.compiledTypeMap["fallback"][tag];
    if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
      style = type2.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
function encodeHex(character) {
  var string, handle, length;
  string = character.toString(16).toUpperCase();
  if (character <= 255) {
    handle = "x";
    length = 2;
  } else if (character <= 65535) {
    handle = "u";
    length = 4;
  } else if (character <= 4294967295) {
    handle = "U";
    length = 8;
  } else {
    throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
  }
  return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1;
var QUOTING_TYPE_DOUBLE = 2;
function State(options) {
  this.schema = options["schema"] || _default;
  this.indent = Math.max(1, options["indent"] || 2);
  this.noArrayIndent = options["noArrayIndent"] || false;
  this.skipInvalid = options["skipInvalid"] || false;
  this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
  this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
  this.sortKeys = options["sortKeys"] || false;
  this.lineWidth = options["lineWidth"] || 80;
  this.noRefs = options["noRefs"] || false;
  this.noCompatMode = options["noCompatMode"] || false;
  this.condenseFlow = options["condenseFlow"] || false;
  this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes = options["forceQuotes"] || false;
  this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;
  this.tag = null;
  this.result = "";
  this.duplicates = [];
  this.usedDuplicates = null;
}
function indentString(string, spaces) {
  var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
  while (position < length) {
    next = string.indexOf("\n", position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }
    if (line.length && line !== "\n") result += ind;
    result += line;
  }
  return result;
}
function generateNextLine(state, level) {
  return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str2) {
  var index, length, type2;
  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type2 = state.implicitTypes[index];
    if (type2.resolve(str2)) {
      return true;
    }
  }
  return false;
}
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}
function isPrintable(c) {
  return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
}
function isNsCharOrWhitespace(c) {
  return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    (inblock ? (
      // c = flow-in
      cIsNsCharOrWhitespace
    ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
  );
}
function isPlainSafeFirst(c) {
  return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
function isPlainSafeLast(c) {
  return !isWhitespace(c) && c !== CHAR_COLON;
}
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 56320 && second <= 57343) {
      return (first - 55296) * 1024 + second - 56320 + 65536;
    }
  }
  return first;
}
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1;
var STYLE_SINGLE = 2;
var STYLE_LITERAL = 3;
var STYLE_FOLDED = 4;
var STYLE_DOUBLE = 5;
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false;
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1;
  var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
  if (singleLineOnly || forceQuotes) {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
          i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
  }
  if (!hasLineBreak && !hasFoldableLine) {
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function() {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
      }
    }
    var indent = state.indent * Math.max(1, level);
    var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
    var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
    function testAmbiguity(string2) {
      return testImplicitResolving(state, string2);
    }
    switch (chooseScalarStyle(
      string,
      singleLineOnly,
      state.indent,
      lineWidth,
      testAmbiguity,
      state.quotingType,
      state.forceQuotes && !iskey,
      inblock
    )) {
      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception("impossible error: invalid scalar style");
    }
  })();
}
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
  var clip = string[string.length - 1] === "\n";
  var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
  var chomp = keep ? "+" : clip ? "" : "-";
  return indentIndicator + chomp + "\n";
}
function dropEndingNewline(string) {
  return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
function foldString(string, width) {
  var lineRe = /(\n+)([^\n]*)/g;
  var result = (function() {
    var nextLF = string.indexOf("\n");
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  })();
  var prevMoreIndented = string[0] === "\n" || string[0] === " ";
  var moreIndented;
  var match;
  while (match = lineRe.exec(string)) {
    var prefix = match[1], line = match[2];
    moreIndented = line[0] === " ";
    result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }
  return result;
}
function foldLine(line, width) {
  if (line === "" || line[0] === " ") return line;
  var breakRe = / [^ ]/g;
  var match;
  var start = 0, end, curr = 0, next = 0;
  var result = "";
  while (match = breakRe.exec(line)) {
    next = match.index;
    if (next - start > width) {
      end = curr > start ? curr : next;
      result += "\n" + line.slice(start, end);
      start = end + 1;
    }
    curr = next;
  }
  result += "\n";
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }
  return result.slice(1);
}
function escapeString(string) {
  var result = "";
  var char = 0;
  var escapeSeq;
  for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];
    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 65536) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }
  return result;
}
function writeFlowSequence(state, level, object) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
      if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
  var _result = "", _tag = state.tag, index, length, value;
  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];
    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }
    if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
      if (!compact || _result !== "") {
        _result += generateNextLine(state, level);
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += "-";
      } else {
        _result += "- ";
      }
      _result += state.dump;
    }
  }
  state.tag = _tag;
  state.dump = _result || "[]";
}
function writeFlowMapping(state, level, object) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (_result !== "") pairBuffer += ", ";
    if (state.condenseFlow) pairBuffer += '"';
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level, objectKey, false, false)) {
      continue;
    }
    if (state.dump.length > 1024) pairBuffer += "? ";
    pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
    if (!writeNode(state, level, objectValue, false, false)) {
      continue;
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
  var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
  if (state.sortKeys === true) {
    objectKeyList.sort();
  } else if (typeof state.sortKeys === "function") {
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    throw new exception("sortKeys must be a boolean or a function");
  }
  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = "";
    if (!compact || _result !== "") {
      pairBuffer += generateNextLine(state, level);
    }
    objectKey = objectKeyList[index];
    objectValue = object[objectKey];
    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }
    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue;
    }
    explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += "?";
      } else {
        pairBuffer += "? ";
      }
    }
    pairBuffer += state.dump;
    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }
    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue;
    }
    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ":";
    } else {
      pairBuffer += ": ";
    }
    pairBuffer += state.dump;
    _result += pairBuffer;
  }
  state.tag = _tag;
  state.dump = _result || "{}";
}
function detectType(state, object, explicit) {
  var _result, typeList, index, length, type2, style;
  typeList = explicit ? state.explicitTypes : state.implicitTypes;
  for (index = 0, length = typeList.length; index < length; index += 1) {
    type2 = typeList[index];
    if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
      if (explicit) {
        if (type2.multi && type2.representName) {
          state.tag = type2.representName(object);
        } else {
          state.tag = type2.tag;
        }
      } else {
        state.tag = "?";
      }
      if (type2.represent) {
        style = state.styleMap[type2.tag] || type2.defaultStyle;
        if (_toString.call(type2.represent) === "[object Function]") {
          _result = type2.represent(object, style);
        } else if (_hasOwnProperty.call(type2.represent, style)) {
          _result = type2.represent[style](object, style);
        } else {
          throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
        }
        state.dump = _result;
      }
      return true;
    }
  }
  return false;
}
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;
  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }
  var type2 = _toString.call(state.dump);
  var inblock = block;
  var tagStr;
  if (block) {
    block = state.flowLevel < 0 || state.flowLevel > level;
  }
  var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }
  if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
    compact = false;
  }
  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = "*ref_" + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type2 === "[object Object]") {
      if (block && Object.keys(state.dump).length !== 0) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object Array]") {
      if (block && state.dump.length !== 0) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = "&ref_" + duplicateIndex + " " + state.dump;
        }
      }
    } else if (type2 === "[object String]") {
      if (state.tag !== "?") {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type2 === "[object Undefined]") {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception("unacceptable kind of an object to dump " + type2);
    }
    if (state.tag !== null && state.tag !== "?") {
      tagStr = encodeURI(
        state.tag[0] === "!" ? state.tag.slice(1) : state.tag
      ).replace(/!/g, "%21");
      if (state.tag[0] === "!") {
        tagStr = "!" + tagStr;
      } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
        tagStr = "!!" + tagStr.slice(18);
      } else {
        tagStr = "!<" + tagStr + ">";
      }
      state.dump = tagStr + " " + state.dump;
    }
  }
  return true;
}
function getDuplicateReferences(object, state) {
  var objects = [], duplicatesIndexes = [], index, length;
  inspectNode(object, objects, duplicatesIndexes);
  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList, index, length;
  if (object !== null && typeof object === "object") {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);
      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);
        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}
function dump$1(input, options) {
  options = options || {};
  var state = new State(options);
  if (!state.noRefs) getDuplicateReferences(input, state);
  var value = input;
  if (state.replacer) {
    value = state.replacer.call({ "": value }, "", value);
  }
  if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
  return "";
}
var dump_1 = dump$1;
var dumper = {
  dump: dump_1
};
function renamed(from, to) {
  return function() {
    throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
  };
}
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");

// ../packages/core/dist/config.js
var BUFO_DIR = (0, import_path.join)((0, import_os.homedir)(), ".bufo");
var PROJECTS_DIR = (0, import_path.join)(BUFO_DIR, "projects");
var STATE_DIR = (0, import_path.join)(BUFO_DIR, "state");
var SESSIONS_DIR = (0, import_path.join)(BUFO_DIR, "sessions");
var GLOBAL_CONFIG = (0, import_path.join)(BUFO_DIR, "config.yaml");
function expandPath(p) {
  if (p.startsWith("~/") || p === "~") {
    return (0, import_path.join)((0, import_os.homedir)(), p.slice(2));
  }
  return p;
}
function loadGlobalConfig() {
  if (!(0, import_fs.existsSync)(GLOBAL_CONFIG))
    return {};
  try {
    const raw = (0, import_fs.readFileSync)(GLOBAL_CONFIG, "utf-8");
    return load(raw) || {};
  } catch {
    return {};
  }
}
function loadProject(alias, filePath) {
  const raw = (0, import_fs.readFileSync)(filePath, "utf-8");
  const doc = load(raw);
  const tadpoles = doc.tadpoles || doc.workspaces || {};
  const ports = doc.ports || {};
  return {
    alias,
    session_name: doc.session_name || alias,
    tadpole_base: expandPath(doc.tadpole_base || doc.workspace_base || ""),
    main_repo: expandPath(doc.main_repo || ""),
    tadpoles: {
      count: tadpoles.count || 5,
      prefix: tadpoles.prefix || "tadpole",
      branch_pattern: tadpoles.branch_pattern || "tadpole-{N}"
    },
    ports: ports ? {
      api_base: ports.api_base,
      app_base: ports.app_base
    } : void 0,
    layout: doc.layout
  };
}
function discoverProjects() {
  if (!(0, import_fs.existsSync)(PROJECTS_DIR))
    return [];
  const files = (0, import_fs.readdirSync)(PROJECTS_DIR).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
  const projects = [];
  for (const file of files) {
    const alias = file.replace(/\.ya?ml$/, "");
    try {
      projects.push(loadProject(alias, (0, import_path.join)(PROJECTS_DIR, file)));
    } catch {
    }
  }
  const defaultAlias = loadGlobalConfig().default_project;
  if (defaultAlias) {
    projects.sort((a, b) => a.alias === defaultAlias ? -1 : b.alias === defaultAlias ? 1 : 0);
  }
  return projects;
}

// ../packages/core/dist/exec.js
var import_child_process = require("child_process");
function runInShell(args) {
  return `zsh -ilc 'bufo ${args}' 2>&1`;
}
function runBufoAsync(args, stdin) {
  return new Promise((resolve, reject) => {
    const child = (0, import_child_process.exec)(runInShell(args), {
      encoding: "utf-8",
      timeout: 0
      // no timeout — some operations (worktree creation, npm install) take minutes
    }, (error, stdout) => {
      if (error) {
        reject(new Error(error.message));
      } else {
        resolve(stdout.trim());
      }
    });
    if (stdin !== void 0 && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }
  });
}

// src/new-main-tadpole.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function NewMainTadpole() {
  const projects = discoverProjects();
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  if (projects.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Form, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Form.Description, { text: "No projects found. Run `bufo init` to register a project." }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_api.Form,
    {
      isLoading: isSubmitting,
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.ActionPanel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_api.Action.SubmitForm,
        {
          title: "Open Main Tadpole",
          onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
              await (0, import_api.showToast)({ style: import_api.Toast.Style.Animated, title: "Opening main tadpole..." });
              await runBufoAsync(`@${values.project} main`);
              await (0, import_api.showToast)({ style: import_api.Toast.Style.Success, title: "Main tadpole opened" });
              (0, import_api.popToRoot)();
            } catch (e) {
              await (0, import_api.showToast)({
                style: import_api.Toast.Style.Failure,
                title: "Failed to open main tadpole",
                message: String(e)
              });
            } finally {
              setIsSubmitting(false);
            }
          }
        }
      ) }),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Form.Dropdown, { id: "project", title: "Project", defaultValue: projects[0]?.alias, children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Form.Dropdown.Item, { value: p.alias, title: `@${p.alias}` }, p.alias)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Form.Description, { text: "Opens the main repo checkout directly \u2014 no worktree is created. Works on whatever branch the repo is currently on." })
      ]
    }
  );
}
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL25ldy1tYWluLXRhZHBvbGUudHN4IiwgIi4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2NvbmZpZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvanMteWFtbC9kaXN0L2pzLXlhbWwubWpzIiwgIi4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2V4ZWMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEZvcm0sIEFjdGlvblBhbmVsLCBBY3Rpb24sIHNob3dUb2FzdCwgVG9hc3QsIHBvcFRvUm9vdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkaXNjb3ZlclByb2plY3RzLCBydW5CdWZvQXN5bmMgfSBmcm9tIFwiQGJ1Zm8vY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOZXdNYWluVGFkcG9sZSgpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkaXNjb3ZlclByb2plY3RzKCk7XG4gIGNvbnN0IFtpc1N1Ym1pdHRpbmcsIHNldElzU3VibWl0dGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgaWYgKHByb2plY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybT5cbiAgICAgICAgPEZvcm0uRGVzY3JpcHRpb24gdGV4dD1cIk5vIHByb2plY3RzIGZvdW5kLiBSdW4gYGJ1Zm8gaW5pdGAgdG8gcmVnaXN0ZXIgYSBwcm9qZWN0LlwiIC8+XG4gICAgICA8L0Zvcm0+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPEZvcm1cbiAgICAgIGlzTG9hZGluZz17aXNTdWJtaXR0aW5nfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm1cbiAgICAgICAgICAgIHRpdGxlPVwiT3BlbiBNYWluIFRhZHBvbGVcIlxuICAgICAgICAgICAgb25TdWJtaXQ9e2FzeW5jICh2YWx1ZXM6IHsgcHJvamVjdDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgc2V0SXNTdWJtaXR0aW5nKHRydWUpO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiT3BlbmluZyBtYWluIHRhZHBvbGUuLi5cIiB9KTtcbiAgICAgICAgICAgICAgICBhd2FpdCBydW5CdWZvQXN5bmMoYEAke3ZhbHVlcy5wcm9qZWN0fSBtYWluYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIk1haW4gdGFkcG9sZSBvcGVuZWRcIiB9KTtcbiAgICAgICAgICAgICAgICBwb3BUb1Jvb3QoKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkZhaWxlZCB0byBvcGVuIG1haW4gdGFkcG9sZVwiLFxuICAgICAgICAgICAgICAgICAgbWVzc2FnZTogU3RyaW5nKGUpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHNldElzU3VibWl0dGluZyhmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8Rm9ybS5Ecm9wZG93biBpZD1cInByb2plY3RcIiB0aXRsZT1cIlByb2plY3RcIiBkZWZhdWx0VmFsdWU9e3Byb2plY3RzWzBdPy5hbGlhc30+XG4gICAgICAgIHtwcm9qZWN0cy5tYXAoKHApID0+IChcbiAgICAgICAgICA8Rm9ybS5Ecm9wZG93bi5JdGVtIGtleT17cC5hbGlhc30gdmFsdWU9e3AuYWxpYXN9IHRpdGxlPXtgQCR7cC5hbGlhc31gfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvRm9ybS5Ecm9wZG93bj5cbiAgICAgIDxGb3JtLkRlc2NyaXB0aW9uIHRleHQ9XCJPcGVucyB0aGUgbWFpbiByZXBvIGNoZWNrb3V0IGRpcmVjdGx5IFx1MjAxNCBubyB3b3JrdHJlZSBpcyBjcmVhdGVkLiBXb3JrcyBvbiB3aGF0ZXZlciBicmFuY2ggdGhlIHJlcG8gaXMgY3VycmVudGx5IG9uLlwiIC8+XG4gICAgPC9Gb3JtPlxuICApO1xufVxuIiwgImltcG9ydCB7IHJlYWRGaWxlU3luYywgZXhpc3RzU3luYywgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSBcImpzLXlhbWxcIjtcbmltcG9ydCB0eXBlIHsgQnVmb1Byb2plY3QsIEdsb2JhbENvbmZpZywgVGFkcG9sZU1ldGEsIFRhZHBvbGVTdGF0ZSwgQnVmb1Nlc3Npb24sIFNlc3Npb25MYXlvdXQgfSBmcm9tIFwiLi90eXBlcy5qc1wiO1xuXG5jb25zdCBCVUZPX0RJUiA9IGpvaW4oaG9tZWRpcigpLCBcIi5idWZvXCIpO1xuY29uc3QgUFJPSkVDVFNfRElSID0gam9pbihCVUZPX0RJUiwgXCJwcm9qZWN0c1wiKTtcbmNvbnN0IFNUQVRFX0RJUiA9IGpvaW4oQlVGT19ESVIsIFwic3RhdGVcIik7XG5jb25zdCBTRVNTSU9OU19ESVIgPSBqb2luKEJVRk9fRElSLCBcInNlc3Npb25zXCIpO1xuY29uc3QgR0xPQkFMX0NPTkZJRyA9IGpvaW4oQlVGT19ESVIsIFwiY29uZmlnLnlhbWxcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdWZvRGlyKCk6IHN0cmluZyB7XG4gIHJldHVybiBCVUZPX0RJUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1Zm9FeGlzdHMoKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGlzdHNTeW5jKEJVRk9fRElSKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kUGF0aChwOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAocC5zdGFydHNXaXRoKFwifi9cIikgfHwgcCA9PT0gXCJ+XCIpIHtcbiAgICByZXR1cm4gam9pbihob21lZGlyKCksIHAuc2xpY2UoMikpO1xuICB9XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEdsb2JhbENvbmZpZygpOiBHbG9iYWxDb25maWcge1xuICBpZiAoIWV4aXN0c1N5bmMoR0xPQkFMX0NPTkZJRykpIHJldHVybiB7fTtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmMoR0xPQkFMX0NPTkZJRywgXCJ1dGYtOFwiKTtcbiAgICByZXR1cm4gKHlhbWwubG9hZChyYXcpIGFzIEdsb2JhbENvbmZpZykgfHwge307XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3QoYWxpYXM6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZyk6IEJ1Zm9Qcm9qZWN0IHtcbiAgY29uc3QgcmF3ID0gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0Zi04XCIpO1xuICBjb25zdCBkb2MgPSB5YW1sLmxvYWQocmF3KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuICAvLyBTdXBwb3J0IGJvdGggbmV3IHRhZHBvbGVzOiBhbmQgbGVnYWN5IHdvcmtzcGFjZXM6IGtleXNcbiAgY29uc3QgdGFkcG9sZXMgPSAoZG9jLnRhZHBvbGVzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB8fFxuICAgIChkb2Mud29ya3NwYWNlcyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgfHwge307XG4gIGNvbnN0IHBvcnRzID0gKGRvYy5wb3J0cyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgfHwge307XG5cbiAgcmV0dXJuIHtcbiAgICBhbGlhcyxcbiAgICBzZXNzaW9uX25hbWU6IChkb2Muc2Vzc2lvbl9uYW1lIGFzIHN0cmluZykgfHwgYWxpYXMsXG4gICAgdGFkcG9sZV9iYXNlOiBleHBhbmRQYXRoKFxuICAgICAgKGRvYy50YWRwb2xlX2Jhc2UgYXMgc3RyaW5nKSB8fCAoZG9jLndvcmtzcGFjZV9iYXNlIGFzIHN0cmluZykgfHwgXCJcIlxuICAgICksXG4gICAgbWFpbl9yZXBvOiBleHBhbmRQYXRoKChkb2MubWFpbl9yZXBvIGFzIHN0cmluZykgfHwgXCJcIiksXG4gICAgdGFkcG9sZXM6IHtcbiAgICAgIGNvdW50OiAodGFkcG9sZXMuY291bnQgYXMgbnVtYmVyKSB8fCA1LFxuICAgICAgcHJlZml4OiAodGFkcG9sZXMucHJlZml4IGFzIHN0cmluZykgfHwgXCJ0YWRwb2xlXCIsXG4gICAgICBicmFuY2hfcGF0dGVybjogKHRhZHBvbGVzLmJyYW5jaF9wYXR0ZXJuIGFzIHN0cmluZykgfHwgXCJ0YWRwb2xlLXtOfVwiLFxuICAgIH0sXG4gICAgcG9ydHM6IHBvcnRzXG4gICAgICA/IHtcbiAgICAgICAgICBhcGlfYmFzZTogcG9ydHMuYXBpX2Jhc2UgYXMgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGFwcF9iYXNlOiBwb3J0cy5hcHBfYmFzZSBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGxheW91dDogZG9jLmxheW91dCBhcyBCdWZvUHJvamVjdFtcImxheW91dFwiXSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyUHJvamVjdHMoKTogQnVmb1Byb2plY3RbXSB7XG4gIGlmICghZXhpc3RzU3luYyhQUk9KRUNUU19ESVIpKSByZXR1cm4gW107XG4gIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoUFJPSkVDVFNfRElSKS5maWx0ZXIoKGYpID0+IGYuZW5kc1dpdGgoXCIueWFtbFwiKSB8fCBmLmVuZHNXaXRoKFwiLnltbFwiKSk7XG4gIGNvbnN0IHByb2plY3RzOiBCdWZvUHJvamVjdFtdID0gW107XG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IGFsaWFzID0gZmlsZS5yZXBsYWNlKC9cXC55YT9tbCQvLCBcIlwiKTtcbiAgICB0cnkge1xuICAgICAgcHJvamVjdHMucHVzaChsb2FkUHJvamVjdChhbGlhcywgam9pbihQUk9KRUNUU19ESVIsIGZpbGUpKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBza2lwIGludmFsaWQgY29uZmlnc1xuICAgIH1cbiAgfVxuICBjb25zdCBkZWZhdWx0QWxpYXMgPSBsb2FkR2xvYmFsQ29uZmlnKCkuZGVmYXVsdF9wcm9qZWN0O1xuICBpZiAoZGVmYXVsdEFsaWFzKSB7XG4gICAgcHJvamVjdHMuc29ydCgoYSwgYikgPT4gKGEuYWxpYXMgPT09IGRlZmF1bHRBbGlhcyA/IC0xIDogYi5hbGlhcyA9PT0gZGVmYXVsdEFsaWFzID8gMSA6IDApKTtcbiAgfVxuICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGFkcG9sZVN0YXRlKHNlc3Npb25OYW1lOiBzdHJpbmcsIG51bTogbnVtYmVyKTogVGFkcG9sZVN0YXRlIHwgdW5kZWZpbmVkIHtcbiAgLy8gUHJlZmVyIHRwPE4+Lmpzb24sIGZhbGwgYmFjayB0byBsZWdhY3kgd3M8Tj4uanNvblxuICBsZXQgc3RhdGVGaWxlID0gam9pbihTVEFURV9ESVIsIHNlc3Npb25OYW1lLCBgdHAke251bX0uanNvbmApO1xuICBpZiAoIWV4aXN0c1N5bmMoc3RhdGVGaWxlKSkge1xuICAgIHN0YXRlRmlsZSA9IGpvaW4oU1RBVEVfRElSLCBzZXNzaW9uTmFtZSwgYHdzJHtudW19Lmpzb25gKTtcbiAgfVxuICBpZiAoIWV4aXN0c1N5bmMoc3RhdGVGaWxlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoc3RhdGVGaWxlLCBcInV0Zi04XCIpKSBhcyBUYWRwb2xlU3RhdGU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUYWRwb2xlTWV0YSh0YWRwb2xlRGlyOiBzdHJpbmcpOiBUYWRwb2xlTWV0YSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1ldGFGaWxlID0gam9pbih0YWRwb2xlRGlyLCBcIi5idWZvLW1ldGFcIik7XG4gIGlmICghZXhpc3RzU3luYyhtZXRhRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKG1ldGFGaWxlLCBcInV0Zi04XCIpKSBhcyBUYWRwb2xlTWV0YTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUYWRwb2xlTG9ja2VkKHRhZHBvbGVEaXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZXhpc3RzU3luYyhqb2luKHRhZHBvbGVEaXIsIFwiLmJ1Zm8tbG9ja1wiKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXN0b21OYW1lKHRhZHBvbGVEaXI6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG5hbWVGaWxlID0gam9pbih0YWRwb2xlRGlyLCBcIi5idWZvLW5hbWVcIik7XG4gIGlmICghZXhpc3RzU3luYyhuYW1lRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhuYW1lRmlsZSwgXCJ1dGYtOFwiKS50cmltKCkgfHwgdW5kZWZpbmVkO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU2Vzc2lvbihcbiAgcHJvamVjdEFsaWFzOiBzdHJpbmcsXG4gIHNlc3Npb25OYW1lOiBzdHJpbmcsXG4gIGFjdGl2ZVNlc3Npb25zPzogU2V0PHN0cmluZz5cbik6IEJ1Zm9TZXNzaW9uIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc2Vzc2lvbkRpciA9IGpvaW4oU0VTU0lPTlNfRElSLCBwcm9qZWN0QWxpYXMsIHNlc3Npb25OYW1lKTtcbiAgY29uc3Qgc2Vzc2lvbkZpbGUgPSBqb2luKHNlc3Npb25EaXIsIFwic2Vzc2lvbi55YW1sXCIpO1xuICBpZiAoIWV4aXN0c1N5bmMoc2Vzc2lvbkZpbGUpKSByZXR1cm4gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyhzZXNzaW9uRmlsZSwgXCJ1dGYtOFwiKTtcbiAgICBjb25zdCBkb2MgPSB5YW1sLmxvYWQocmF3KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuICAgIGxldCBsYXlvdXQ6IFNlc3Npb25MYXlvdXQgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGF5b3V0RmlsZSA9IGpvaW4oc2Vzc2lvbkRpciwgXCJsYXlvdXQuanNvblwiKTtcbiAgICBpZiAoZXhpc3RzU3luYyhsYXlvdXRGaWxlKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGF5b3V0ID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMobGF5b3V0RmlsZSwgXCJ1dGYtOFwiKSkgYXMgU2Vzc2lvbkxheW91dDtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBzdGFsZSBvciBtYWxmb3JtZWQgbGF5b3V0IFx1MjAxNCBpZ25vcmVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmUgPSBsYXlvdXQ/Lm1haW5fc2lkID8gKGFjdGl2ZVNlc3Npb25zPy5oYXMobGF5b3V0Lm1haW5fc2lkKSA/PyBmYWxzZSkgOiBmYWxzZTtcbiAgICBjb25zdCBoYXNSZXZpZXdPdXRwdXQgPSBleGlzdHNTeW5jKGpvaW4oc2Vzc2lvbkRpciwgXCJyZXZpZXctb3V0cHV0Lm1kXCIpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAoZG9jLm5hbWUgYXMgc3RyaW5nKSB8fCBzZXNzaW9uTmFtZSxcbiAgICAgIHByb2plY3Q6IChkb2MucHJvamVjdCBhcyBzdHJpbmcpIHx8IHByb2plY3RBbGlhcyxcbiAgICAgIGNyZWF0ZWQ6IChkb2MuY3JlYXRlZCBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gICAgICBsYXN0X2FjY2Vzc2VkOiAoZG9jLmxhc3RfYWNjZXNzZWQgYXMgc3RyaW5nKSB8fCBcIlwiLFxuICAgICAgc3VtbWFyeTogKGRvYy5zdW1tYXJ5IGFzIHN0cmluZykgfHwgXCJcIixcbiAgICAgIHR5cGU6ICgoZG9jLnR5cGUgYXMgc3RyaW5nKSB8fCBcImdlbmVyYWxcIikgYXMgQnVmb1Nlc3Npb25bXCJ0eXBlXCJdLFxuICAgICAgcHJzOiBkb2MucHJzIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxuICAgICAgYWN0aXZlLFxuICAgICAgaGFzUmV2aWV3T3V0cHV0LFxuICAgICAgbGF5b3V0LFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyU2Vzc2lvbnMoXG4gIHByb2plY3RBbGlhczogc3RyaW5nLFxuICBhY3RpdmVTZXNzaW9ucz86IFNldDxzdHJpbmc+XG4pOiBCdWZvU2Vzc2lvbltdIHtcbiAgY29uc3QgcHJvamVjdFNlc3Npb25zRGlyID0gam9pbihTRVNTSU9OU19ESVIsIHByb2plY3RBbGlhcyk7XG4gIGlmICghZXhpc3RzU3luYyhwcm9qZWN0U2Vzc2lvbnNEaXIpKSByZXR1cm4gW107XG4gIGxldCBlbnRyaWVzOiBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBlbnRyaWVzID0gcmVhZGRpclN5bmMocHJvamVjdFNlc3Npb25zRGlyKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IHNlc3Npb25zOiBCdWZvU2Vzc2lvbltdID0gW107XG4gIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gam9pbihwcm9qZWN0U2Vzc2lvbnNEaXIsIGVudHJ5KTtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzdGF0U3luYyhmdWxsUGF0aCkuaXNEaXJlY3RvcnkoKSkgY29udGludWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGxvYWRTZXNzaW9uKHByb2plY3RBbGlhcywgZW50cnksIGFjdGl2ZVNlc3Npb25zKTtcbiAgICBpZiAoc2Vzc2lvbikgc2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcbiAgfVxuICByZXR1cm4gc2Vzc2lvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxTZXNzaW9ucyhcbiAgYWN0aXZlU2Vzc2lvbnM/OiBTZXQ8c3RyaW5nPlxuKTogeyBwcm9qZWN0QWxpYXM6IHN0cmluZzsgc2Vzc2lvbnM6IEJ1Zm9TZXNzaW9uW10gfVtdIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkaXNjb3ZlclByb2plY3RzKCk7XG4gIGNvbnN0IHJlc3VsdDogeyBwcm9qZWN0QWxpYXM6IHN0cmluZzsgc2Vzc2lvbnM6IEJ1Zm9TZXNzaW9uW10gfVtdID0gW107XG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGNvbnN0IHNlc3Npb25zID0gZGlzY292ZXJTZXNzaW9ucyhwcm9qZWN0LmFsaWFzLCBhY3RpdmVTZXNzaW9ucyk7XG4gICAgaWYgKHNlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlc3VsdC5wdXNoKHsgcHJvamVjdEFsaWFzOiBwcm9qZWN0LmFsaWFzLCBzZXNzaW9ucyB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsICJcbi8qISBqcy15YW1sIDQuMS4xIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvanMteWFtbCBAbGljZW5zZSBNSVQgKi9cbmZ1bmN0aW9uIGlzTm90aGluZyhzdWJqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnKSB8fCAoc3ViamVjdCA9PT0gbnVsbCk7XG59XG5cblxuZnVuY3Rpb24gaXNPYmplY3Qoc3ViamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JykgJiYgKHN1YmplY3QgIT09IG51bGwpO1xufVxuXG5cbmZ1bmN0aW9uIHRvQXJyYXkoc2VxdWVuY2UpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2VxdWVuY2UpKSByZXR1cm4gc2VxdWVuY2U7XG4gIGVsc2UgaWYgKGlzTm90aGluZyhzZXF1ZW5jZSkpIHJldHVybiBbXTtcblxuICByZXR1cm4gWyBzZXF1ZW5jZSBdO1xufVxuXG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSkge1xuICB2YXIgaW5kZXgsIGxlbmd0aCwga2V5LCBzb3VyY2VLZXlzO1xuXG4gIGlmIChzb3VyY2UpIHtcbiAgICBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBzb3VyY2VLZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGtleSA9IHNvdXJjZUtleXNbaW5kZXhdO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHJpbmcsIGNvdW50KSB7XG4gIHZhciByZXN1bHQgPSAnJywgY3ljbGU7XG5cbiAgZm9yIChjeWNsZSA9IDA7IGN5Y2xlIDwgY291bnQ7IGN5Y2xlICs9IDEpIHtcbiAgICByZXN1bHQgKz0gc3RyaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBpc05lZ2F0aXZlWmVybyhudW1iZXIpIHtcbiAgcmV0dXJuIChudW1iZXIgPT09IDApICYmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IDEgLyBudW1iZXIpO1xufVxuXG5cbnZhciBpc05vdGhpbmdfMSAgICAgID0gaXNOb3RoaW5nO1xudmFyIGlzT2JqZWN0XzEgICAgICAgPSBpc09iamVjdDtcbnZhciB0b0FycmF5XzEgICAgICAgID0gdG9BcnJheTtcbnZhciByZXBlYXRfMSAgICAgICAgID0gcmVwZWF0O1xudmFyIGlzTmVnYXRpdmVaZXJvXzEgPSBpc05lZ2F0aXZlWmVybztcbnZhciBleHRlbmRfMSAgICAgICAgID0gZXh0ZW5kO1xuXG52YXIgY29tbW9uID0ge1xuXHRpc05vdGhpbmc6IGlzTm90aGluZ18xLFxuXHRpc09iamVjdDogaXNPYmplY3RfMSxcblx0dG9BcnJheTogdG9BcnJheV8xLFxuXHRyZXBlYXQ6IHJlcGVhdF8xLFxuXHRpc05lZ2F0aXZlWmVybzogaXNOZWdhdGl2ZVplcm9fMSxcblx0ZXh0ZW5kOiBleHRlbmRfMVxufTtcblxuLy8gWUFNTCBlcnJvciBjbGFzcy4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NDU4OTg0XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXhjZXB0aW9uLCBjb21wYWN0KSB7XG4gIHZhciB3aGVyZSA9ICcnLCBtZXNzYWdlID0gZXhjZXB0aW9uLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKSc7XG5cbiAgaWYgKCFleGNlcHRpb24ubWFyaykgcmV0dXJuIG1lc3NhZ2U7XG5cbiAgaWYgKGV4Y2VwdGlvbi5tYXJrLm5hbWUpIHtcbiAgICB3aGVyZSArPSAnaW4gXCInICsgZXhjZXB0aW9uLm1hcmsubmFtZSArICdcIiAnO1xuICB9XG5cbiAgd2hlcmUgKz0gJygnICsgKGV4Y2VwdGlvbi5tYXJrLmxpbmUgKyAxKSArICc6JyArIChleGNlcHRpb24ubWFyay5jb2x1bW4gKyAxKSArICcpJztcblxuICBpZiAoIWNvbXBhY3QgJiYgZXhjZXB0aW9uLm1hcmsuc25pcHBldCkge1xuICAgIHdoZXJlICs9ICdcXG5cXG4nICsgZXhjZXB0aW9uLm1hcmsuc25pcHBldDtcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlICsgJyAnICsgd2hlcmU7XG59XG5cblxuZnVuY3Rpb24gWUFNTEV4Y2VwdGlvbiQxKHJlYXNvbiwgbWFyaykge1xuICAvLyBTdXBlciBjb25zdHJ1Y3RvclxuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMubmFtZSA9ICdZQU1MRXhjZXB0aW9uJztcbiAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gIHRoaXMubWFyayA9IG1hcms7XG4gIHRoaXMubWVzc2FnZSA9IGZvcm1hdEVycm9yKHRoaXMsIGZhbHNlKTtcblxuICAvLyBJbmNsdWRlIHN0YWNrIHRyYWNlIGluIGVycm9yIG9iamVjdFxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAvLyBDaHJvbWUgYW5kIE5vZGVKU1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZGLCBJRSAxMCsgYW5kIFNhZmFyaSA2Ky4gRmFsbGJhY2sgZm9yIG90aGVyc1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrIHx8ICcnO1xuICB9XG59XG5cblxuLy8gSW5oZXJpdCBmcm9tIEVycm9yXG5ZQU1MRXhjZXB0aW9uJDEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuWUFNTEV4Y2VwdGlvbiQxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlBTUxFeGNlcHRpb24kMTtcblxuXG5ZQU1MRXhjZXB0aW9uJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoY29tcGFjdCkge1xuICByZXR1cm4gdGhpcy5uYW1lICsgJzogJyArIGZvcm1hdEVycm9yKHRoaXMsIGNvbXBhY3QpO1xufTtcblxuXG52YXIgZXhjZXB0aW9uID0gWUFNTEV4Y2VwdGlvbiQxO1xuXG4vLyBnZXQgc25pcHBldCBmb3IgYSBzaW5nbGUgbGluZSwgcmVzcGVjdGluZyBtYXhMZW5ndGhcbmZ1bmN0aW9uIGdldExpbmUoYnVmZmVyLCBsaW5lU3RhcnQsIGxpbmVFbmQsIHBvc2l0aW9uLCBtYXhMaW5lTGVuZ3RoKSB7XG4gIHZhciBoZWFkID0gJyc7XG4gIHZhciB0YWlsID0gJyc7XG4gIHZhciBtYXhIYWxmTGVuZ3RoID0gTWF0aC5mbG9vcihtYXhMaW5lTGVuZ3RoIC8gMikgLSAxO1xuXG4gIGlmIChwb3NpdGlvbiAtIGxpbmVTdGFydCA+IG1heEhhbGZMZW5ndGgpIHtcbiAgICBoZWFkID0gJyAuLi4gJztcbiAgICBsaW5lU3RhcnQgPSBwb3NpdGlvbiAtIG1heEhhbGZMZW5ndGggKyBoZWFkLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChsaW5lRW5kIC0gcG9zaXRpb24gPiBtYXhIYWxmTGVuZ3RoKSB7XG4gICAgdGFpbCA9ICcgLi4uJztcbiAgICBsaW5lRW5kID0gcG9zaXRpb24gKyBtYXhIYWxmTGVuZ3RoIC0gdGFpbC5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cjogaGVhZCArIGJ1ZmZlci5zbGljZShsaW5lU3RhcnQsIGxpbmVFbmQpLnJlcGxhY2UoL1xcdC9nLCAnXHUyMTkyJykgKyB0YWlsLFxuICAgIHBvczogcG9zaXRpb24gLSBsaW5lU3RhcnQgKyBoZWFkLmxlbmd0aCAvLyByZWxhdGl2ZSBwb3NpdGlvblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KHN0cmluZywgbWF4KSB7XG4gIHJldHVybiBjb21tb24ucmVwZWF0KCcgJywgbWF4IC0gc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59XG5cblxuZnVuY3Rpb24gbWFrZVNuaXBwZXQobWFyaywgb3B0aW9ucykge1xuICBvcHRpb25zID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zIHx8IG51bGwpO1xuXG4gIGlmICghbWFyay5idWZmZXIpIHJldHVybiBudWxsO1xuXG4gIGlmICghb3B0aW9ucy5tYXhMZW5ndGgpIG9wdGlvbnMubWF4TGVuZ3RoID0gNzk7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbmRlbnQgICAgICAhPT0gJ251bWJlcicpIG9wdGlvbnMuaW5kZW50ICAgICAgPSAxO1xuICBpZiAodHlwZW9mIG9wdGlvbnMubGluZXNCZWZvcmUgIT09ICdudW1iZXInKSBvcHRpb25zLmxpbmVzQmVmb3JlID0gMztcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbmVzQWZ0ZXIgICE9PSAnbnVtYmVyJykgb3B0aW9ucy5saW5lc0FmdGVyICA9IDI7XG5cbiAgdmFyIHJlID0gL1xccj9cXG58XFxyfFxcMC9nO1xuICB2YXIgbGluZVN0YXJ0cyA9IFsgMCBdO1xuICB2YXIgbGluZUVuZHMgPSBbXTtcbiAgdmFyIG1hdGNoO1xuICB2YXIgZm91bmRMaW5lTm8gPSAtMTtcblxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhtYXJrLmJ1ZmZlcikpKSB7XG4gICAgbGluZUVuZHMucHVzaChtYXRjaC5pbmRleCk7XG4gICAgbGluZVN0YXJ0cy5wdXNoKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKTtcblxuICAgIGlmIChtYXJrLnBvc2l0aW9uIDw9IG1hdGNoLmluZGV4ICYmIGZvdW5kTGluZU5vIDwgMCkge1xuICAgICAgZm91bmRMaW5lTm8gPSBsaW5lU3RhcnRzLmxlbmd0aCAtIDI7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZvdW5kTGluZU5vIDwgMCkgZm91bmRMaW5lTm8gPSBsaW5lU3RhcnRzLmxlbmd0aCAtIDE7XG5cbiAgdmFyIHJlc3VsdCA9ICcnLCBpLCBsaW5lO1xuICB2YXIgbGluZU5vTGVuZ3RoID0gTWF0aC5taW4obWFyay5saW5lICsgb3B0aW9ucy5saW5lc0FmdGVyLCBsaW5lRW5kcy5sZW5ndGgpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICB2YXIgbWF4TGluZUxlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoIC0gKG9wdGlvbnMuaW5kZW50ICsgbGluZU5vTGVuZ3RoICsgMyk7XG5cbiAgZm9yIChpID0gMTsgaSA8PSBvcHRpb25zLmxpbmVzQmVmb3JlOyBpKyspIHtcbiAgICBpZiAoZm91bmRMaW5lTm8gLSBpIDwgMCkgYnJlYWs7XG4gICAgbGluZSA9IGdldExpbmUoXG4gICAgICBtYXJrLmJ1ZmZlcixcbiAgICAgIGxpbmVTdGFydHNbZm91bmRMaW5lTm8gLSBpXSxcbiAgICAgIGxpbmVFbmRzW2ZvdW5kTGluZU5vIC0gaV0sXG4gICAgICBtYXJrLnBvc2l0aW9uIC0gKGxpbmVTdGFydHNbZm91bmRMaW5lTm9dIC0gbGluZVN0YXJ0c1tmb3VuZExpbmVObyAtIGldKSxcbiAgICAgIG1heExpbmVMZW5ndGhcbiAgICApO1xuICAgIHJlc3VsdCA9IGNvbW1vbi5yZXBlYXQoJyAnLCBvcHRpb25zLmluZGVudCkgKyBwYWRTdGFydCgobWFyay5saW5lIC0gaSArIDEpLnRvU3RyaW5nKCksIGxpbmVOb0xlbmd0aCkgK1xuICAgICAgJyB8ICcgKyBsaW5lLnN0ciArICdcXG4nICsgcmVzdWx0O1xuICB9XG5cbiAgbGluZSA9IGdldExpbmUobWFyay5idWZmZXIsIGxpbmVTdGFydHNbZm91bmRMaW5lTm9dLCBsaW5lRW5kc1tmb3VuZExpbmVOb10sIG1hcmsucG9zaXRpb24sIG1heExpbmVMZW5ndGgpO1xuICByZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnICcsIG9wdGlvbnMuaW5kZW50KSArIHBhZFN0YXJ0KChtYXJrLmxpbmUgKyAxKS50b1N0cmluZygpLCBsaW5lTm9MZW5ndGgpICtcbiAgICAnIHwgJyArIGxpbmUuc3RyICsgJ1xcbic7XG4gIHJlc3VsdCArPSBjb21tb24ucmVwZWF0KCctJywgb3B0aW9ucy5pbmRlbnQgKyBsaW5lTm9MZW5ndGggKyAzICsgbGluZS5wb3MpICsgJ14nICsgJ1xcbic7XG5cbiAgZm9yIChpID0gMTsgaSA8PSBvcHRpb25zLmxpbmVzQWZ0ZXI7IGkrKykge1xuICAgIGlmIChmb3VuZExpbmVObyArIGkgPj0gbGluZUVuZHMubGVuZ3RoKSBicmVhaztcbiAgICBsaW5lID0gZ2V0TGluZShcbiAgICAgIG1hcmsuYnVmZmVyLFxuICAgICAgbGluZVN0YXJ0c1tmb3VuZExpbmVObyArIGldLFxuICAgICAgbGluZUVuZHNbZm91bmRMaW5lTm8gKyBpXSxcbiAgICAgIG1hcmsucG9zaXRpb24gLSAobGluZVN0YXJ0c1tmb3VuZExpbmVOb10gLSBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vICsgaV0pLFxuICAgICAgbWF4TGluZUxlbmd0aFxuICAgICk7XG4gICAgcmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJyAnLCBvcHRpb25zLmluZGVudCkgKyBwYWRTdGFydCgobWFyay5saW5lICsgaSArIDEpLnRvU3RyaW5nKCksIGxpbmVOb0xlbmd0aCkgK1xuICAgICAgJyB8ICcgKyBsaW5lLnN0ciArICdcXG4nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC9cXG4kLywgJycpO1xufVxuXG5cbnZhciBzbmlwcGV0ID0gbWFrZVNuaXBwZXQ7XG5cbnZhciBUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMgPSBbXG4gICdraW5kJyxcbiAgJ211bHRpJyxcbiAgJ3Jlc29sdmUnLFxuICAnY29uc3RydWN0JyxcbiAgJ2luc3RhbmNlT2YnLFxuICAncHJlZGljYXRlJyxcbiAgJ3JlcHJlc2VudCcsXG4gICdyZXByZXNlbnROYW1lJyxcbiAgJ2RlZmF1bHRTdHlsZScsXG4gICdzdHlsZUFsaWFzZXMnXG5dO1xuXG52YXIgWUFNTF9OT0RFX0tJTkRTID0gW1xuICAnc2NhbGFyJyxcbiAgJ3NlcXVlbmNlJyxcbiAgJ21hcHBpbmcnXG5dO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVBbGlhc2VzKG1hcCkge1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgaWYgKG1hcCAhPT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIG1hcFtzdHlsZV0uZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmVzdWx0W1N0cmluZyhhbGlhcyldID0gc3R5bGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIFR5cGUkMSh0YWcsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1Vua25vd24gb3B0aW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbWV0IGluIGRlZmluaXRpb24gb2YgXCInICsgdGFnICsgJ1wiIFlBTUwgdHlwZS4nKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFRPRE86IEFkZCB0YWcgZm9ybWF0IGNoZWNrLlxuICB0aGlzLm9wdGlvbnMgICAgICAgPSBvcHRpb25zOyAvLyBrZWVwIG9yaWdpbmFsIG9wdGlvbnMgaW4gY2FzZSB1c2VyIHdhbnRzIHRvIGV4dGVuZCB0aGlzIHR5cGUgbGF0ZXJcbiAgdGhpcy50YWcgICAgICAgICAgID0gdGFnO1xuICB0aGlzLmtpbmQgICAgICAgICAgPSBvcHRpb25zWydraW5kJ10gICAgICAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXNvbHZlICAgICAgID0gb3B0aW9uc1sncmVzb2x2ZSddICAgICAgIHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gIHRoaXMuY29uc3RydWN0ICAgICA9IG9wdGlvbnNbJ2NvbnN0cnVjdCddICAgICB8fCBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YTsgfTtcbiAgdGhpcy5pbnN0YW5jZU9mICAgID0gb3B0aW9uc1snaW5zdGFuY2VPZiddICAgIHx8IG51bGw7XG4gIHRoaXMucHJlZGljYXRlICAgICA9IG9wdGlvbnNbJ3ByZWRpY2F0ZSddICAgICB8fCBudWxsO1xuICB0aGlzLnJlcHJlc2VudCAgICAgPSBvcHRpb25zWydyZXByZXNlbnQnXSAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXByZXNlbnROYW1lID0gb3B0aW9uc1sncmVwcmVzZW50TmFtZSddIHx8IG51bGw7XG4gIHRoaXMuZGVmYXVsdFN0eWxlICA9IG9wdGlvbnNbJ2RlZmF1bHRTdHlsZSddICB8fCBudWxsO1xuICB0aGlzLm11bHRpICAgICAgICAgPSBvcHRpb25zWydtdWx0aSddICAgICAgICAgfHwgZmFsc2U7XG4gIHRoaXMuc3R5bGVBbGlhc2VzICA9IGNvbXBpbGVTdHlsZUFsaWFzZXMob3B0aW9uc1snc3R5bGVBbGlhc2VzJ10gfHwgbnVsbCk7XG5cbiAgaWYgKFlBTUxfTk9ERV9LSU5EUy5pbmRleE9mKHRoaXMua2luZCkgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignVW5rbm93biBraW5kIFwiJyArIHRoaXMua2luZCArICdcIiBpcyBzcGVjaWZpZWQgZm9yIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gIH1cbn1cblxudmFyIHR5cGUgPSBUeXBlJDE7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbiovXG5cblxuXG5cblxuZnVuY3Rpb24gY29tcGlsZUxpc3Qoc2NoZW1hLCBuYW1lKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBzY2hlbWFbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFR5cGUpIHtcbiAgICB2YXIgbmV3SW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKHByZXZpb3VzVHlwZSwgcHJldmlvdXNJbmRleCkge1xuICAgICAgaWYgKHByZXZpb3VzVHlwZS50YWcgPT09IGN1cnJlbnRUeXBlLnRhZyAmJlxuICAgICAgICAgIHByZXZpb3VzVHlwZS5raW5kID09PSBjdXJyZW50VHlwZS5raW5kICYmXG4gICAgICAgICAgcHJldmlvdXNUeXBlLm11bHRpID09PSBjdXJyZW50VHlwZS5tdWx0aSkge1xuXG4gICAgICAgIG5ld0luZGV4ID0gcHJldmlvdXNJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlc3VsdFtuZXdJbmRleF0gPSBjdXJyZW50VHlwZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBjb21waWxlTWFwKC8qIGxpc3RzLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHNjYWxhcjoge30sXG4gICAgICAgIHNlcXVlbmNlOiB7fSxcbiAgICAgICAgbWFwcGluZzoge30sXG4gICAgICAgIGZhbGxiYWNrOiB7fSxcbiAgICAgICAgbXVsdGk6IHtcbiAgICAgICAgICBzY2FsYXI6IFtdLFxuICAgICAgICAgIHNlcXVlbmNlOiBbXSxcbiAgICAgICAgICBtYXBwaW5nOiBbXSxcbiAgICAgICAgICBmYWxsYmFjazogW11cbiAgICAgICAgfVxuICAgICAgfSwgaW5kZXgsIGxlbmd0aDtcblxuICBmdW5jdGlvbiBjb2xsZWN0VHlwZSh0eXBlKSB7XG4gICAgaWYgKHR5cGUubXVsdGkpIHtcbiAgICAgIHJlc3VsdC5tdWx0aVt0eXBlLmtpbmRdLnB1c2godHlwZSk7XG4gICAgICByZXN1bHQubXVsdGlbJ2ZhbGxiYWNrJ10ucHVzaCh0eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3R5cGUua2luZF1bdHlwZS50YWddID0gcmVzdWx0WydmYWxsYmFjayddW3R5cGUudGFnXSA9IHR5cGU7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgYXJndW1lbnRzW2luZGV4XS5mb3JFYWNoKGNvbGxlY3RUeXBlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIFNjaGVtYSQxKGRlZmluaXRpb24pIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW5kKGRlZmluaXRpb24pO1xufVxuXG5cblNjaGVtYSQxLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQoZGVmaW5pdGlvbikge1xuICB2YXIgaW1wbGljaXQgPSBbXTtcbiAgdmFyIGV4cGxpY2l0ID0gW107XG5cbiAgaWYgKGRlZmluaXRpb24gaW5zdGFuY2VvZiB0eXBlKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZCh0eXBlKVxuICAgIGV4cGxpY2l0LnB1c2goZGVmaW5pdGlvbik7XG5cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZChbIHR5cGUxLCB0eXBlMiwgLi4uIF0pXG4gICAgZXhwbGljaXQgPSBleHBsaWNpdC5jb25jYXQoZGVmaW5pdGlvbik7XG5cbiAgfSBlbHNlIGlmIChkZWZpbml0aW9uICYmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uaW1wbGljaXQpIHx8IEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5leHBsaWNpdCkpKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZCh7IGV4cGxpY2l0OiBbIHR5cGUxLCB0eXBlMiwgLi4uIF0sIGltcGxpY2l0OiBbIHR5cGUxLCB0eXBlMiwgLi4uIF0gfSlcbiAgICBpZiAoZGVmaW5pdGlvbi5pbXBsaWNpdCkgaW1wbGljaXQgPSBpbXBsaWNpdC5jb25jYXQoZGVmaW5pdGlvbi5pbXBsaWNpdCk7XG4gICAgaWYgKGRlZmluaXRpb24uZXhwbGljaXQpIGV4cGxpY2l0ID0gZXhwbGljaXQuY29uY2F0KGRlZmluaXRpb24uZXhwbGljaXQpO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignU2NoZW1hLmV4dGVuZCBhcmd1bWVudCBzaG91bGQgYmUgYSBUeXBlLCBbIFR5cGUgXSwgJyArXG4gICAgICAnb3IgYSBzY2hlbWEgZGVmaW5pdGlvbiAoeyBpbXBsaWNpdDogWy4uLl0sIGV4cGxpY2l0OiBbLi4uXSB9KScpO1xuICB9XG5cbiAgaW1wbGljaXQuZm9yRWFjaChmdW5jdGlvbiAodHlwZSQxKSB7XG4gICAgaWYgKCEodHlwZSQxIGluc3RhbmNlb2YgdHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1NwZWNpZmllZCBsaXN0IG9mIFlBTUwgdHlwZXMgKG9yIGEgc2luZ2xlIFR5cGUgb2JqZWN0KSBjb250YWlucyBhIG5vbi1UeXBlIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSQxLmxvYWRLaW5kICYmIHR5cGUkMS5sb2FkS2luZCAhPT0gJ3NjYWxhcicpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1RoZXJlIGlzIGEgbm9uLXNjYWxhciB0eXBlIGluIHRoZSBpbXBsaWNpdCBsaXN0IG9mIGEgc2NoZW1hLiBJbXBsaWNpdCByZXNvbHZpbmcgb2Ygc3VjaCB0eXBlcyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlJDEubXVsdGkpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1RoZXJlIGlzIGEgbXVsdGkgdHlwZSBpbiB0aGUgaW1wbGljaXQgbGlzdCBvZiBhIHNjaGVtYS4gTXVsdGkgdGFncyBjYW4gb25seSBiZSBsaXN0ZWQgYXMgZXhwbGljaXQuJyk7XG4gICAgfVxuICB9KTtcblxuICBleHBsaWNpdC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlJDEpIHtcbiAgICBpZiAoISh0eXBlJDEgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2YgWUFNTCB0eXBlcyAob3IgYSBzaW5nbGUgVHlwZSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVR5cGUgb2JqZWN0LicpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoU2NoZW1hJDEucHJvdG90eXBlKTtcblxuICByZXN1bHQuaW1wbGljaXQgPSAodGhpcy5pbXBsaWNpdCB8fCBbXSkuY29uY2F0KGltcGxpY2l0KTtcbiAgcmVzdWx0LmV4cGxpY2l0ID0gKHRoaXMuZXhwbGljaXQgfHwgW10pLmNvbmNhdChleHBsaWNpdCk7XG5cbiAgcmVzdWx0LmNvbXBpbGVkSW1wbGljaXQgPSBjb21waWxlTGlzdChyZXN1bHQsICdpbXBsaWNpdCcpO1xuICByZXN1bHQuY29tcGlsZWRFeHBsaWNpdCA9IGNvbXBpbGVMaXN0KHJlc3VsdCwgJ2V4cGxpY2l0Jyk7XG4gIHJlc3VsdC5jb21waWxlZFR5cGVNYXAgID0gY29tcGlsZU1hcChyZXN1bHQuY29tcGlsZWRJbXBsaWNpdCwgcmVzdWx0LmNvbXBpbGVkRXhwbGljaXQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbnZhciBzY2hlbWEgPSBTY2hlbWEkMTtcblxudmFyIHN0ciA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6ICcnOyB9XG59KTtcblxudmFyIHNlcSA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107IH1cbn0pO1xuXG52YXIgbWFwID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9OyB9XG59KTtcblxudmFyIGZhaWxzYWZlID0gbmV3IHNjaGVtYSh7XG4gIGV4cGxpY2l0OiBbXG4gICAgc3RyLFxuICAgIHNlcSxcbiAgICBtYXBcbiAgXVxufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTnVsbChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGg7XG5cbiAgcmV0dXJuIChtYXggPT09IDEgJiYgZGF0YSA9PT0gJ34nKSB8fFxuICAgICAgICAgKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ251bGwnIHx8IGRhdGEgPT09ICdOdWxsJyB8fCBkYXRhID09PSAnTlVMTCcpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bGwob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT09IG51bGw7XG59XG5cbnZhciBfbnVsbCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxOdWxsLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxOdWxsLFxuICBwcmVkaWNhdGU6IGlzTnVsbCxcbiAgcmVwcmVzZW50OiB7XG4gICAgY2Fub25pY2FsOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnfic7ICAgIH0sXG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnbnVsbCc7IH0sXG4gICAgdXBwZXJjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnTlVMTCc7IH0sXG4gICAgY2FtZWxjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnTnVsbCc7IH0sXG4gICAgZW1wdHk6ICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiAnJzsgICAgIH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQm9vbGVhbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoO1xuXG4gIHJldHVybiAobWF4ID09PSA0ICYmIChkYXRhID09PSAndHJ1ZScgfHwgZGF0YSA9PT0gJ1RydWUnIHx8IGRhdGEgPT09ICdUUlVFJykpIHx8XG4gICAgICAgICAobWF4ID09PSA1ICYmIChkYXRhID09PSAnZmFsc2UnIHx8IGRhdGEgPT09ICdGYWxzZScgfHwgZGF0YSA9PT0gJ0ZBTFNFJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQm9vbGVhbihkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAndHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUcnVlJyB8fFxuICAgICAgICAgZGF0YSA9PT0gJ1RSVUUnO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufVxuXG52YXIgYm9vbCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpib29sJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCb29sZWFuLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCb29sZWFuLFxuICBwcmVkaWNhdGU6IGlzQm9vbGVhbixcbiAgcmVwcmVzZW50OiB7XG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAndHJ1ZScgOiAnZmFsc2UnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ1RSVUUnIDogJ0ZBTFNFJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUcnVlJyA6ICdGYWxzZSc7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG5cbmZ1bmN0aW9uIGlzSGV4Q29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkgfHxcbiAgICAgICAgICgoMHg0MS8qIEEgKi8gPD0gYykgJiYgKGMgPD0gMHg0Ni8qIEYgKi8pKSB8fFxuICAgICAgICAgKCgweDYxLyogYSAqLyA8PSBjKSAmJiAoYyA8PSAweDY2LyogZiAqLykpO1xufVxuXG5mdW5jdGlvbiBpc09jdENvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM3LyogNyAqLykpO1xufVxuXG5mdW5jdGlvbiBpc0RlY0NvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEludGVnZXIoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGhhc0RpZ2l0cyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKCFtYXgpIHJldHVybiBmYWxzZTtcblxuICBjaCA9IGRhdGFbaW5kZXhdO1xuXG4gIC8vIHNpZ25cbiAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgIGNoID0gZGF0YVsrK2luZGV4XTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gJzAnKSB7XG4gICAgLy8gMFxuICAgIGlmIChpbmRleCArIDEgPT09IG1heCkgcmV0dXJuIHRydWU7XG4gICAgY2ggPSBkYXRhWysraW5kZXhdO1xuXG4gICAgLy8gYmFzZSAyLCBiYXNlIDgsIGJhc2UgMTZcblxuICAgIGlmIChjaCA9PT0gJ2InKSB7XG4gICAgICAvLyBiYXNlIDJcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmIChjaCAhPT0gJzAnICYmIGNoICE9PSAnMScpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG5cblxuICAgIGlmIChjaCA9PT0gJ3gnKSB7XG4gICAgICAvLyBiYXNlIDE2XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIWlzSGV4Q29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cblxuXG4gICAgaWYgKGNoID09PSAnbycpIHtcbiAgICAgIC8vIGJhc2UgOFxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFpc09jdENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG4gIH1cblxuICAvLyBiYXNlIDEwIChleGNlcHQgMClcblxuICAvLyB2YWx1ZSBzaG91bGQgbm90IHN0YXJ0IHdpdGggYF9gO1xuICBpZiAoY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgIGlmICghaXNEZWNDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gIH1cblxuICAvLyBTaG91bGQgaGF2ZSBkaWdpdHMgYW5kIHNob3VsZCBub3QgZW5kIHdpdGggYF9gXG4gIGlmICghaGFzRGlnaXRzIHx8IGNoID09PSAnXycpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEludGVnZXIoZGF0YSkge1xuICB2YXIgdmFsdWUgPSBkYXRhLCBzaWduID0gMSwgY2g7XG5cbiAgaWYgKHZhbHVlLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL18vZywgJycpO1xuICB9XG5cbiAgY2ggPSB2YWx1ZVswXTtcblxuICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgaWYgKGNoID09PSAnLScpIHNpZ24gPSAtMTtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICAgIGNoID0gdmFsdWVbMF07XG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcwJykgcmV0dXJuIDA7XG5cbiAgaWYgKGNoID09PSAnMCcpIHtcbiAgICBpZiAodmFsdWVbMV0gPT09ICdiJykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgMik7XG4gICAgaWYgKHZhbHVlWzFdID09PSAneCcpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDE2KTtcbiAgICBpZiAodmFsdWVbMV0gPT09ICdvJykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgOCk7XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmXG4gICAgICAgICAob2JqZWN0ICUgMSA9PT0gMCAmJiAhY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG52YXIgaW50ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sSW50ZWdlcixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sSW50ZWdlcixcbiAgcHJlZGljYXRlOiBpc0ludGVnZXIsXG4gIHJlcHJlc2VudDoge1xuICAgIGJpbmFyeTogICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcwYicgKyBvYmoudG9TdHJpbmcoMikgOiAnLTBiJyArIG9iai50b1N0cmluZygyKS5zbGljZSgxKTsgfSxcbiAgICBvY3RhbDogICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMG8nICArIG9iai50b1N0cmluZyg4KSA6ICctMG8nICArIG9iai50b1N0cmluZyg4KS5zbGljZSgxKTsgfSxcbiAgICBkZWNpbWFsOiAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqLnRvU3RyaW5nKDEwKTsgfSxcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gICAgaGV4YWRlY2ltYWw6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzB4JyArIG9iai50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSA6ICAnLTB4JyArIG9iai50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5zbGljZSgxKTsgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdkZWNpbWFsJyxcbiAgc3R5bGVBbGlhc2VzOiB7XG4gICAgYmluYXJ5OiAgICAgIFsgMiwgICdiaW4nIF0sXG4gICAgb2N0YWw6ICAgICAgIFsgOCwgICdvY3QnIF0sXG4gICAgZGVjaW1hbDogICAgIFsgMTAsICdkZWMnIF0sXG4gICAgaGV4YWRlY2ltYWw6IFsgMTYsICdoZXgnIF1cbiAgfVxufSk7XG5cbnZhciBZQU1MX0ZMT0FUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAvLyAyLjVlNCwgMi41IGFuZCBpbnRlZ2Vyc1xuICAnXig/OlstK10/KD86WzAtOV1bMC05X10qKSg/OlxcXFwuWzAtOV9dKik/KD86W2VFXVstK10/WzAtOV0rKT8nICtcbiAgLy8gLjJlNCwgLjJcbiAgLy8gc3BlY2lhbCBjYXNlLCBzZWVtcyBub3QgZnJvbSBzcGVjXG4gICd8XFxcXC5bMC05X10rKD86W2VFXVstK10/WzAtOV0rKT8nICtcbiAgLy8gLmluZlxuICAnfFstK10/XFxcXC4oPzppbmZ8SW5mfElORiknICtcbiAgLy8gLm5hblxuICAnfFxcXFwuKD86bmFufE5hTnxOQU4pKSQnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxGbG9hdChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKCFZQU1MX0ZMT0FUX1BBVFRFUk4udGVzdChkYXRhKSB8fFxuICAgICAgLy8gUXVpY2sgaGFjayB0byBub3QgYWxsb3cgaW50ZWdlcnMgZW5kIHdpdGggYF9gXG4gICAgICAvLyBQcm9iYWJseSBzaG91bGQgdXBkYXRlIHJlZ2V4cCAmIGNoZWNrIHNwZWVkXG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gPT09ICdfJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sRmxvYXQoZGF0YSkge1xuICB2YXIgdmFsdWUsIHNpZ247XG5cbiAgdmFsdWUgID0gZGF0YS5yZXBsYWNlKC9fL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuICBzaWduICAgPSB2YWx1ZVswXSA9PT0gJy0nID8gLTEgOiAxO1xuXG4gIGlmICgnKy0nLmluZGV4T2YodmFsdWVbMF0pID49IDApIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnLmluZicpIHtcbiAgICByZXR1cm4gKHNpZ24gPT09IDEpID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG4gIH0gZWxzZSBpZiAodmFsdWUgPT09ICcubmFuJykge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgcmV0dXJuIHNpZ24gKiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG59XG5cblxudmFyIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QgPSAvXlstK10/WzAtOV0rZS87XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxGbG9hdChvYmplY3QsIHN0eWxlKSB7XG4gIHZhciByZXM7XG5cbiAgaWYgKGlzTmFOKG9iamVjdCkpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy5uYW4nO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICcuTkFOJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLk5hTic7XG4gICAgfVxuICB9IGVsc2UgaWYgKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA9PT0gb2JqZWN0KSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcuaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5JbmYnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLS5pbmYnO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICctLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy0uSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpIHtcbiAgICByZXR1cm4gJy0wLjAnO1xuICB9XG5cbiAgcmVzID0gb2JqZWN0LnRvU3RyaW5nKDEwKTtcblxuICAvLyBKUyBzdHJpbmdpZmllciBjYW4gYnVpbGQgc2NpZW50aWZpYyBmb3JtYXQgd2l0aG91dCBkb3RzOiA1ZS0xMDAsXG4gIC8vIHdoaWxlIFlBTUwgcmVxdXJlcyBkb3Q6IDUuZS0xMDAuIEZpeCBpdCB3aXRoIHNpbXBsZSBoYWNrXG5cbiAgcmV0dXJuIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QudGVzdChyZXMpID8gcmVzLnJlcGxhY2UoJ2UnLCAnLmUnKSA6IHJlcztcbn1cblxuZnVuY3Rpb24gaXNGbG9hdChvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpICYmXG4gICAgICAgICAob2JqZWN0ICUgMSAhPT0gMCB8fCBjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbnZhciBmbG9hdCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sRmxvYXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEZsb2F0LFxuICBwcmVkaWNhdGU6IGlzRmxvYXQsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEZsb2F0LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcblxudmFyIGpzb24gPSBmYWlsc2FmZS5leHRlbmQoe1xuICBpbXBsaWNpdDogW1xuICAgIF9udWxsLFxuICAgIGJvb2wsXG4gICAgaW50LFxuICAgIGZsb2F0XG4gIF1cbn0pO1xuXG52YXIgY29yZSA9IGpzb247XG5cbnZhciBZQU1MX0RBVEVfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgJ14oWzAtOV1bMC05XVswLTldWzAtOV0pJyAgICAgICAgICArIC8vIFsxXSB5ZWFyXG4gICctKFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbMl0gbW9udGhcbiAgJy0oWzAtOV1bMC05XSkkJyk7ICAgICAgICAgICAgICAgICAgIC8vIFszXSBkYXlcblxudmFyIFlBTUxfVElNRVNUQU1QX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgKyAvLyBbM10gZGF5XG4gICcoPzpbVHRdfFsgXFxcXHRdKyknICAgICAgICAgICAgICAgICArIC8vIC4uLlxuICAnKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgICsgLy8gWzRdIGhvdXJcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs1XSBtaW51dGVcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs2XSBzZWNvbmRcbiAgJyg/OlxcXFwuKFswLTldKikpPycgICAgICAgICAgICAgICAgICsgLy8gWzddIGZyYWN0aW9uXG4gICcoPzpbIFxcXFx0XSooWnwoWy0rXSkoWzAtOV1bMC05XT8pJyArIC8vIFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXJcbiAgJyg/OjooWzAtOV1bMC05XSkpPykpPyQnKTsgICAgICAgICAgIC8vIFsxMV0gdHpfbWludXRlXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sVGltZXN0YW1wKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIGlmIChZQU1MX1RJTUVTVEFNUF9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIHZhciBtYXRjaCwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uID0gMCxcbiAgICAgIGRlbHRhID0gbnVsbCwgdHpfaG91ciwgdHpfbWludXRlLCBkYXRlO1xuXG4gIG1hdGNoID0gWUFNTF9EQVRFX1JFR0VYUC5leGVjKGRhdGEpO1xuICBpZiAobWF0Y2ggPT09IG51bGwpIG1hdGNoID0gWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSk7XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RhdGUgcmVzb2x2ZSBlcnJvcicpO1xuXG4gIC8vIG1hdGNoOiBbMV0geWVhciBbMl0gbW9udGggWzNdIGRheVxuXG4gIHllYXIgPSArKG1hdGNoWzFdKTtcbiAgbW9udGggPSArKG1hdGNoWzJdKSAtIDE7IC8vIEpTIG1vbnRoIHN0YXJ0cyB3aXRoIDBcbiAgZGF5ID0gKyhtYXRjaFszXSk7XG5cbiAgaWYgKCFtYXRjaFs0XSkgeyAvLyBubyBob3VyXG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpKTtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbNF0gaG91ciBbNV0gbWludXRlIFs2XSBzZWNvbmQgWzddIGZyYWN0aW9uXG5cbiAgaG91ciA9ICsobWF0Y2hbNF0pO1xuICBtaW51dGUgPSArKG1hdGNoWzVdKTtcbiAgc2Vjb25kID0gKyhtYXRjaFs2XSk7XG5cbiAgaWYgKG1hdGNoWzddKSB7XG4gICAgZnJhY3Rpb24gPSBtYXRjaFs3XS5zbGljZSgwLCAzKTtcbiAgICB3aGlsZSAoZnJhY3Rpb24ubGVuZ3RoIDwgMykgeyAvLyBtaWxsaS1zZWNvbmRzXG4gICAgICBmcmFjdGlvbiArPSAnMCc7XG4gICAgfVxuICAgIGZyYWN0aW9uID0gK2ZyYWN0aW9uO1xuICB9XG5cbiAgLy8gbWF0Y2g6IFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXIgWzExXSB0el9taW51dGVcblxuICBpZiAobWF0Y2hbOV0pIHtcbiAgICB0el9ob3VyID0gKyhtYXRjaFsxMF0pO1xuICAgIHR6X21pbnV0ZSA9ICsobWF0Y2hbMTFdIHx8IDApO1xuICAgIGRlbHRhID0gKHR6X2hvdXIgKiA2MCArIHR6X21pbnV0ZSkgKiA2MDAwMDsgLy8gZGVsdGEgaW4gbWlsaS1zZWNvbmRzXG4gICAgaWYgKG1hdGNoWzldID09PSAnLScpIGRlbHRhID0gLWRlbHRhO1xuICB9XG5cbiAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbikpO1xuXG4gIGlmIChkZWx0YSkgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpIC0gZGVsdGEpO1xuXG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sVGltZXN0YW1wKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICByZXR1cm4gb2JqZWN0LnRvSVNPU3RyaW5nKCk7XG59XG5cbnZhciB0aW1lc3RhbXAgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6dGltZXN0YW1wJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxUaW1lc3RhbXAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFRpbWVzdGFtcCxcbiAgaW5zdGFuY2VPZjogRGF0ZSxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sVGltZXN0YW1wXG59KTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxNZXJnZShkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAnPDwnIHx8IGRhdGEgPT09IG51bGw7XG59XG5cbnZhciBtZXJnZSA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTWVyZ2Vcbn0pO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuXG5cblxuXG5cbi8vIFsgNjQsIDY1LCA2NiBdIC0+IFsgcGFkZGluZywgQ1IsIExGIF1cbnZhciBCQVNFNjRfTUFQID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XFxuXFxyJztcblxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJpbmFyeShkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGNvZGUsIGlkeCwgYml0bGVuID0gMCwgbWF4ID0gZGF0YS5sZW5ndGgsIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBvbmUgYnkgb25lLlxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBjb2RlID0gbWFwLmluZGV4T2YoZGF0YS5jaGFyQXQoaWR4KSk7XG5cbiAgICAvLyBTa2lwIENSL0xGXG4gICAgaWYgKGNvZGUgPiA2NCkgY29udGludWU7XG5cbiAgICAvLyBGYWlsIG9uIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgIGlmIChjb2RlIDwgMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgYml0bGVuICs9IDY7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgYW55IGJpdHMgbGVmdCwgc291cmNlIHdhcyBjb3JydXB0ZWRcbiAgcmV0dXJuIChiaXRsZW4gJSA4KSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJpbmFyeShkYXRhKSB7XG4gIHZhciBpZHgsIHRhaWxiaXRzLFxuICAgICAgaW5wdXQgPSBkYXRhLnJlcGxhY2UoL1tcXHJcXG49XS9nLCAnJyksIC8vIHJlbW92ZSBDUi9MRiAmIHBhZGRpbmcgdG8gc2ltcGxpZnkgc2NhblxuICAgICAgbWF4ID0gaW5wdXQubGVuZ3RoLFxuICAgICAgbWFwID0gQkFTRTY0X01BUCxcbiAgICAgIGJpdHMgPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgLy8gQ29sbGVjdCBieSA2KjQgYml0cyAoMyBieXRlcylcblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBpZiAoKGlkeCAlIDQgPT09IDApICYmIGlkeCkge1xuICAgICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTYpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA2KSB8IG1hcC5pbmRleE9mKGlucHV0LmNoYXJBdChpZHgpKTtcbiAgfVxuXG4gIC8vIER1bXAgdGFpbFxuXG4gIHRhaWxiaXRzID0gKG1heCAlIDQpICogNjtcblxuICBpZiAodGFpbGJpdHMgPT09IDApIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKGJpdHMgJiAweEZGKTtcbiAgfSBlbHNlIGlmICh0YWlsYml0cyA9PT0gMTgpIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxMCkgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAyKSAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxMikge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDQpICYgMHhGRik7XG4gIH1cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbEJpbmFyeShvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBiaXRzID0gMCwgaWR4LCB0YWlsLFxuICAgICAgbWF4ID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBldmVyeSB0aHJlZSBieXRlcyB0byA0IEFTQ0lJIGNoYXJhY3RlcnMuXG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgaWYgKChpZHggJSAzID09PSAwKSAmJiBpZHgpIHtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEyKSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDgpICsgb2JqZWN0W2lkeF07XG4gIH1cblxuICAvLyBEdW1wIHRhaWxcblxuICB0YWlsID0gbWF4ICUgMztcblxuICBpZiAodGFpbCA9PT0gMCkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDYpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMikge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTApICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA0KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfSBlbHNlIGlmICh0YWlsID09PSAxKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICAnW29iamVjdCBVaW50OEFycmF5XSc7XG59XG5cbnZhciBiaW5hcnkgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6YmluYXJ5Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCaW5hcnksXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEJpbmFyeSxcbiAgcHJlZGljYXRlOiBpc0JpbmFyeSxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sQmluYXJ5XG59KTtcblxudmFyIF9oYXNPd25Qcm9wZXJ0eSQzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfdG9TdHJpbmckMiAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sT21hcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgb2JqZWN0S2V5cyA9IFtdLCBpbmRleCwgbGVuZ3RoLCBwYWlyLCBwYWlyS2V5LCBwYWlySGFzS2V5LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcbiAgICBwYWlySGFzS2V5ID0gZmFsc2U7XG5cbiAgICBpZiAoX3RvU3RyaW5nJDIuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAocGFpcktleSBpbiBwYWlyKSB7XG4gICAgICBpZiAoX2hhc093blByb3BlcnR5JDMuY2FsbChwYWlyLCBwYWlyS2V5KSkge1xuICAgICAgICBpZiAoIXBhaXJIYXNLZXkpIHBhaXJIYXNLZXkgPSB0cnVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBhaXJIYXNLZXkpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChvYmplY3RLZXlzLmluZGV4T2YocGFpcktleSkgPT09IC0xKSBvYmplY3RLZXlzLnB1c2gocGFpcktleSk7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE9tYXAoZGF0YSkge1xuICByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBbXTtcbn1cblxudmFyIG9tYXAgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6b21hcCcsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxPbWFwLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxPbWFwXG59KTtcblxudmFyIF90b1N0cmluZyQxID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgaW5kZXgsIGxlbmd0aCwgcGFpciwga2V5cywgcmVzdWx0LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICByZXN1bHQgPSBuZXcgQXJyYXkob2JqZWN0Lmxlbmd0aCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG5cbiAgICBpZiAoX3RvU3RyaW5nJDEuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhwYWlyKTtcblxuICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gW107XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIHBhaXJzID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFBhaXJzLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxQYWlyc1xufSk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkkMiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sU2V0KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBrZXksIG9iamVjdCA9IGRhdGE7XG5cbiAgZm9yIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQyLmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFNldChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9O1xufVxuXG52YXIgc2V0ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFNldCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sU2V0XG59KTtcblxudmFyIF9kZWZhdWx0ID0gY29yZS5leHRlbmQoe1xuICBpbXBsaWNpdDogW1xuICAgIHRpbWVzdGFtcCxcbiAgICBtZXJnZVxuICBdLFxuICBleHBsaWNpdDogW1xuICAgIGJpbmFyeSxcbiAgICBvbWFwLFxuICAgIHBhaXJzLFxuICAgIHNldFxuICBdXG59KTtcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuLG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxuXG5cblxuXG5cblxudmFyIF9oYXNPd25Qcm9wZXJ0eSQxID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG52YXIgQ09OVEVYVF9GTE9XX0lOICAgPSAxO1xudmFyIENPTlRFWFRfRkxPV19PVVQgID0gMjtcbnZhciBDT05URVhUX0JMT0NLX0lOICA9IDM7XG52YXIgQ09OVEVYVF9CTE9DS19PVVQgPSA0O1xuXG5cbnZhciBDSE9NUElOR19DTElQICA9IDE7XG52YXIgQ0hPTVBJTkdfU1RSSVAgPSAyO1xudmFyIENIT01QSU5HX0tFRVAgID0gMztcblxuXG52YXIgUEFUVEVSTl9OT05fUFJJTlRBQkxFICAgICAgICAgPSAvW1xceDAwLVxceDA4XFx4MEJcXHgwQ1xceDBFLVxceDFGXFx4N0YtXFx4ODRcXHg4Ni1cXHg5RlxcdUZGRkVcXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS87XG52YXIgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MgPSAvW1xceDg1XFx1MjAyOFxcdTIwMjldLztcbnZhciBQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUyAgICAgICA9IC9bLFxcW1xcXVxce1xcfV0vO1xudmFyIFBBVFRFUk5fVEFHX0hBTkRMRSAgICAgICAgICAgID0gL14oPzohfCEhfCFbYS16XFwtXSshKSQvaTtcbnZhciBQQVRURVJOX1RBR19VUkkgICAgICAgICAgICAgICA9IC9eKD86IXxbXixcXFtcXF1cXHtcXH1dKSg/OiVbMC05YS1mXXsyfXxbMC05YS16XFwtIztcXC9cXD86QCY9XFwrXFwkLF9cXC4hflxcKidcXChcXClcXFtcXF1dKSokL2k7XG5cblxuZnVuY3Rpb24gX2NsYXNzKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7IH1cblxuZnVuY3Rpb24gaXNfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDBBLyogTEYgKi8pIHx8IChjID09PSAweDBELyogQ1IgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19XSElURV9TUEFDRShjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHwgKGMgPT09IDB4MjAvKiBTcGFjZSAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dTX09SX0VPTChjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHxcbiAgICAgICAgIChjID09PSAweDIwLyogU3BhY2UgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwQS8qIExGICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX0ZMT1dfSU5ESUNBVE9SKGMpIHtcbiAgcmV0dXJuIGMgPT09IDB4MkMvKiAsICovIHx8XG4gICAgICAgICBjID09PSAweDVCLyogWyAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg1RC8qIF0gKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0IvKiB7ICovIHx8XG4gICAgICAgICBjID09PSAweDdELyogfSAqLztcbn1cblxuZnVuY3Rpb24gZnJvbUhleENvZGUoYykge1xuICB2YXIgbGM7XG5cbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICAvKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuICBsYyA9IGMgfCAweDIwO1xuXG4gIGlmICgoMHg2MS8qIGEgKi8gPD0gbGMpICYmIChsYyA8PSAweDY2LyogZiAqLykpIHtcbiAgICByZXR1cm4gbGMgLSAweDYxICsgMTA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZWRIZXhMZW4oYykge1xuICBpZiAoYyA9PT0gMHg3OC8qIHggKi8pIHsgcmV0dXJuIDI7IH1cbiAgaWYgKGMgPT09IDB4NzUvKiB1ICovKSB7IHJldHVybiA0OyB9XG4gIGlmIChjID09PSAweDU1LyogVSAqLykgeyByZXR1cm4gODsgfVxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZnJvbURlY2ltYWxDb2RlKGMpIHtcbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVzY2FwZVNlcXVlbmNlKGMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG4gIHJldHVybiAoYyA9PT0gMHgzMC8qIDAgKi8pID8gJ1xceDAwJyA6XG4gICAgICAgIChjID09PSAweDYxLyogYSAqLykgPyAnXFx4MDcnIDpcbiAgICAgICAgKGMgPT09IDB4NjIvKiBiICovKSA/ICdcXHgwOCcgOlxuICAgICAgICAoYyA9PT0gMHg3NC8qIHQgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDA5LyogVGFiICovKSA/ICdcXHgwOScgOlxuICAgICAgICAoYyA9PT0gMHg2RS8qIG4gKi8pID8gJ1xceDBBJyA6XG4gICAgICAgIChjID09PSAweDc2LyogdiAqLykgPyAnXFx4MEInIDpcbiAgICAgICAgKGMgPT09IDB4NjYvKiBmICovKSA/ICdcXHgwQycgOlxuICAgICAgICAoYyA9PT0gMHg3Mi8qIHIgKi8pID8gJ1xceDBEJyA6XG4gICAgICAgIChjID09PSAweDY1LyogZSAqLykgPyAnXFx4MUInIDpcbiAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgPyAnICcgOlxuICAgICAgICAoYyA9PT0gMHgyMi8qIFwiICovKSA/ICdcXHgyMicgOlxuICAgICAgICAoYyA9PT0gMHgyRi8qIC8gKi8pID8gJy8nIDpcbiAgICAgICAgKGMgPT09IDB4NUMvKiBcXCAqLykgPyAnXFx4NUMnIDpcbiAgICAgICAgKGMgPT09IDB4NEUvKiBOICovKSA/ICdcXHg4NScgOlxuICAgICAgICAoYyA9PT0gMHg1Ri8qIF8gKi8pID8gJ1xceEEwJyA6XG4gICAgICAgIChjID09PSAweDRDLyogTCAqLykgPyAnXFx1MjAyOCcgOlxuICAgICAgICAoYyA9PT0gMHg1MC8qIFAgKi8pID8gJ1xcdTIwMjknIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNoYXJGcm9tQ29kZXBvaW50KGMpIHtcbiAgaWYgKGMgPD0gMHhGRkZGKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgLy8gRW5jb2RlIFVURi0xNiBzdXJyb2dhdGUgcGFpclxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtMTYjQ29kZV9wb2ludHNfVS4yQjAxMDAwMF90b19VLjJCMTBGRkZGXG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICgoYyAtIDB4MDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsXG4gICAgKChjIC0gMHgwMTAwMDApICYgMHgwM0ZGKSArIDB4REMwMFxuICApO1xufVxuXG4vLyBzZXQgYSBwcm9wZXJ0eSBvZiBhIGxpdGVyYWwgb2JqZWN0LCB3aGlsZSBwcm90ZWN0aW5nIGFnYWluc3QgcHJvdG90eXBlIHBvbGx1dGlvbixcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2pzLXlhbWwvaXNzdWVzLzE2NCBmb3IgbW9yZSBkZXRhaWxzXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgLy8gdXNlZCBmb3IgdGhpcyBzcGVjaWZpYyBrZXkgb25seSBiZWNhdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBzbG93XG4gIGlmIChrZXkgPT09ICdfX3Byb3RvX18nKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbnZhciBzaW1wbGVFc2NhcGVDaGVjayA9IG5ldyBBcnJheSgyNTYpOyAvLyBpbnRlZ2VyLCBmb3IgZmFzdCBhY2Nlc3NcbnZhciBzaW1wbGVFc2NhcGVNYXAgPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgc2ltcGxlRXNjYXBlQ2hlY2tbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKSA/IDEgOiAwO1xuICBzaW1wbGVFc2NhcGVNYXBbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKTtcbn1cblxuXG5mdW5jdGlvbiBTdGF0ZSQxKGlucHV0LCBvcHRpb25zKSB7XG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICB0aGlzLmZpbGVuYW1lICA9IG9wdGlvbnNbJ2ZpbGVuYW1lJ10gIHx8IG51bGw7XG4gIHRoaXMuc2NoZW1hICAgID0gb3B0aW9uc1snc2NoZW1hJ10gICAgfHwgX2RlZmF1bHQ7XG4gIHRoaXMub25XYXJuaW5nID0gb3B0aW9uc1snb25XYXJuaW5nJ10gfHwgbnVsbDtcbiAgLy8gKEhpZGRlbikgUmVtb3ZlPyBtYWtlcyB0aGUgbG9hZGVyIHRvIGV4cGVjdCBZQU1MIDEuMSBkb2N1bWVudHNcbiAgLy8gaWYgc3VjaCBkb2N1bWVudHMgaGF2ZSBubyBleHBsaWNpdCAlWUFNTCBkaXJlY3RpdmVcbiAgdGhpcy5sZWdhY3kgICAgPSBvcHRpb25zWydsZWdhY3knXSAgICB8fCBmYWxzZTtcblxuICB0aGlzLmpzb24gICAgICA9IG9wdGlvbnNbJ2pzb24nXSAgICAgIHx8IGZhbHNlO1xuICB0aGlzLmxpc3RlbmVyICA9IG9wdGlvbnNbJ2xpc3RlbmVyJ10gIHx8IG51bGw7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy50eXBlTWFwICAgICAgID0gdGhpcy5zY2hlbWEuY29tcGlsZWRUeXBlTWFwO1xuXG4gIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgdGhpcy5wb3NpdGlvbiAgID0gMDtcbiAgdGhpcy5saW5lICAgICAgID0gMDtcbiAgdGhpcy5saW5lU3RhcnQgID0gMDtcbiAgdGhpcy5saW5lSW5kZW50ID0gMDtcblxuICAvLyBwb3NpdGlvbiBvZiBmaXJzdCBsZWFkaW5nIHRhYiBpbiB0aGUgY3VycmVudCBsaW5lLFxuICAvLyB1c2VkIHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdGFicyBpbiB0aGUgaW5kZW50YXRpb25cbiAgdGhpcy5maXJzdFRhYkluTGluZSA9IC0xO1xuXG4gIHRoaXMuZG9jdW1lbnRzID0gW107XG5cbiAgLypcbiAgdGhpcy52ZXJzaW9uO1xuICB0aGlzLmNoZWNrTGluZUJyZWFrcztcbiAgdGhpcy50YWdNYXA7XG4gIHRoaXMuYW5jaG9yTWFwO1xuICB0aGlzLnRhZztcbiAgdGhpcy5hbmNob3I7XG4gIHRoaXMua2luZDtcbiAgdGhpcy5yZXN1bHQ7Ki9cblxufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlRXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdmFyIG1hcmsgPSB7XG4gICAgbmFtZTogICAgIHN0YXRlLmZpbGVuYW1lLFxuICAgIGJ1ZmZlcjogICBzdGF0ZS5pbnB1dC5zbGljZSgwLCAtMSksIC8vIG9taXQgdHJhaWxpbmcgXFwwXG4gICAgcG9zaXRpb246IHN0YXRlLnBvc2l0aW9uLFxuICAgIGxpbmU6ICAgICBzdGF0ZS5saW5lLFxuICAgIGNvbHVtbjogICBzdGF0ZS5wb3NpdGlvbiAtIHN0YXRlLmxpbmVTdGFydFxuICB9O1xuXG4gIG1hcmsuc25pcHBldCA9IHNuaXBwZXQobWFyayk7XG5cbiAgcmV0dXJuIG5ldyBleGNlcHRpb24obWVzc2FnZSwgbWFyayk7XG59XG5cbmZ1bmN0aW9uIHRocm93RXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdGhyb3cgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93V2FybmluZyhzdGF0ZSwgbWVzc2FnZSkge1xuICBpZiAoc3RhdGUub25XYXJuaW5nKSB7XG4gICAgc3RhdGUub25XYXJuaW5nLmNhbGwobnVsbCwgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkpO1xuICB9XG59XG5cblxudmFyIGRpcmVjdGl2ZUhhbmRsZXJzID0ge1xuXG4gIFlBTUw6IGZ1bmN0aW9uIGhhbmRsZVlhbWxEaXJlY3RpdmUoc3RhdGUsIG5hbWUsIGFyZ3MpIHtcblxuICAgIHZhciBtYXRjaCwgbWFqb3IsIG1pbm9yO1xuXG4gICAgaWYgKHN0YXRlLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiAlWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdZQU1MIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgb25lIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgbWF0Y2ggPSAvXihbMC05XSspXFwuKFswLTldKykkLy5leGVjKGFyZ3NbMF0pO1xuXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCBhcmd1bWVudCBvZiB0aGUgWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBtYWpvciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgbWlub3IgPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuXG4gICAgaWYgKG1ham9yICE9PSAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIFlBTUwgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS52ZXJzaW9uID0gYXJnc1swXTtcbiAgICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSAobWlub3IgPCAyKTtcblxuICAgIGlmIChtaW5vciAhPT0gMSAmJiBtaW5vciAhPT0gMikge1xuICAgICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAndW5zdXBwb3J0ZWQgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cbiAgfSxcblxuICBUQUc6IGZ1bmN0aW9uIGhhbmRsZVRhZ0RpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIGhhbmRsZSwgcHJlZml4O1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnVEFHIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgdHdvIGFyZ3VtZW50cycpO1xuICAgIH1cblxuICAgIGhhbmRsZSA9IGFyZ3NbMF07XG4gICAgcHJlZml4ID0gYXJnc1sxXTtcblxuICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QoaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgdGFnIGhhbmRsZSAoZmlyc3QgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoc3RhdGUudGFnTWFwLCBoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlcmUgaXMgYSBwcmV2aW91c2x5IGRlY2xhcmVkIHN1ZmZpeCBmb3IgXCInICsgaGFuZGxlICsgJ1wiIHRhZyBoYW5kbGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHByZWZpeCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIHRhZyBwcmVmaXggKHNlY29uZCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJlZml4ID0gZGVjb2RlVVJJQ29tcG9uZW50KHByZWZpeCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHByZWZpeCBpcyBtYWxmb3JtZWQ6ICcgKyBwcmVmaXgpO1xuICAgIH1cblxuICAgIHN0YXRlLnRhZ01hcFtoYW5kbGVdID0gcHJlZml4O1xuICB9XG59O1xuXG5cbmZ1bmN0aW9uIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBzdGFydCwgZW5kLCBjaGVja0pzb24pIHtcbiAgdmFyIF9wb3NpdGlvbiwgX2xlbmd0aCwgX2NoYXJhY3RlciwgX3Jlc3VsdDtcblxuICBpZiAoc3RhcnQgPCBlbmQpIHtcbiAgICBfcmVzdWx0ID0gc3RhdGUuaW5wdXQuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgICBpZiAoY2hlY2tKc29uKSB7XG4gICAgICBmb3IgKF9wb3NpdGlvbiA9IDAsIF9sZW5ndGggPSBfcmVzdWx0Lmxlbmd0aDsgX3Bvc2l0aW9uIDwgX2xlbmd0aDsgX3Bvc2l0aW9uICs9IDEpIHtcbiAgICAgICAgX2NoYXJhY3RlciA9IF9yZXN1bHQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuICAgICAgICBpZiAoIShfY2hhcmFjdGVyID09PSAweDA5IHx8XG4gICAgICAgICAgICAgICgweDIwIDw9IF9jaGFyYWN0ZXIgJiYgX2NoYXJhY3RlciA8PSAweDEwRkZGRikpKSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2V4cGVjdGVkIHZhbGlkIEpTT04gY2hhcmFjdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFBBVFRFUk5fTk9OX1BSSU5UQUJMRS50ZXN0KF9yZXN1bHQpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlIHN0cmVhbSBjb250YWlucyBub24tcHJpbnRhYmxlIGNoYXJhY3RlcnMnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5yZXN1bHQgKz0gX3Jlc3VsdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZU1hcHBpbmdzKHN0YXRlLCBkZXN0aW5hdGlvbiwgc291cmNlLCBvdmVycmlkYWJsZUtleXMpIHtcbiAgdmFyIHNvdXJjZUtleXMsIGtleSwgaW5kZXgsIHF1YW50aXR5O1xuXG4gIGlmICghY29tbW9uLmlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IG1lcmdlIG1hcHBpbmdzOyB0aGUgcHJvdmlkZWQgc291cmNlIG9iamVjdCBpcyB1bmFjY2VwdGFibGUnKTtcbiAgfVxuXG4gIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IHNvdXJjZUtleXMubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpbmRleF07XG5cbiAgICBpZiAoIV9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoZGVzdGluYXRpb24sIGtleSkpIHtcbiAgICAgIHNldFByb3BlcnR5KGRlc3RpbmF0aW9uLCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIG92ZXJyaWRhYmxlS2V5c1trZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSxcbiAgc3RhcnRMaW5lLCBzdGFydExpbmVTdGFydCwgc3RhcnRQb3MpIHtcblxuICB2YXIgaW5kZXgsIHF1YW50aXR5O1xuXG4gIC8vIFRoZSBvdXRwdXQgaXMgYSBwbGFpbiBvYmplY3QgaGVyZSwgc28ga2V5cyBjYW4gb25seSBiZSBzdHJpbmdzLlxuICAvLyBXZSBuZWVkIHRvIGNvbnZlcnQga2V5Tm9kZSB0byBhIHN0cmluZywgYnV0IGRvaW5nIHNvIGNhbiBoYW5nIHRoZSBwcm9jZXNzXG4gIC8vIChkZWVwbHkgbmVzdGVkIGFycmF5cyB0aGF0IGV4cGxvZGUgZXhwb25lbnRpYWxseSB1c2luZyBhbGlhc2VzKS5cbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZSkpIHtcbiAgICBrZXlOb2RlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoa2V5Tm9kZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBrZXlOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZVtpbmRleF0pKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduZXN0ZWQgYXJyYXlzIGFyZSBub3Qgc3VwcG9ydGVkIGluc2lkZSBrZXlzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGVbaW5kZXhdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAga2V5Tm9kZVtpbmRleF0gPSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBdm9pZCBjb2RlIGV4ZWN1dGlvbiBpbiBsb2FkKCkgdmlhIHRvU3RyaW5nIHByb3BlcnR5XG4gIC8vIChzdGlsbCB1c2UgaXRzIG93biB0b1N0cmluZyBmb3IgYXJyYXlzLCB0aW1lc3RhbXBzLFxuICAvLyBhbmQgd2hhdGV2ZXIgdXNlciBzY2hlbWEgZXh0ZW5zaW9ucyBoYXBwZW4gdG8gaGF2ZSBAQHRvU3RyaW5nVGFnKVxuICBpZiAodHlwZW9mIGtleU5vZGUgPT09ICdvYmplY3QnICYmIF9jbGFzcyhrZXlOb2RlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBrZXlOb2RlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuXG4gIGtleU5vZGUgPSBTdHJpbmcoa2V5Tm9kZSk7XG5cbiAgaWYgKF9yZXN1bHQgPT09IG51bGwpIHtcbiAgICBfcmVzdWx0ID0ge307XG4gIH1cblxuICBpZiAoa2V5VGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6bWVyZ2UnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVOb2RlKSkge1xuICAgICAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gdmFsdWVOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGVbaW5kZXhdLCBvdmVycmlkYWJsZUtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGUsIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghc3RhdGUuanNvbiAmJlxuICAgICAgICAhX2hhc093blByb3BlcnR5JDEuY2FsbChvdmVycmlkYWJsZUtleXMsIGtleU5vZGUpICYmXG4gICAgICAgIF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoX3Jlc3VsdCwga2V5Tm9kZSkpIHtcbiAgICAgIHN0YXRlLmxpbmUgPSBzdGFydExpbmUgfHwgc3RhdGUubGluZTtcbiAgICAgIHN0YXRlLmxpbmVTdGFydCA9IHN0YXJ0TGluZVN0YXJ0IHx8IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIHN0YXRlLnBvc2l0aW9uID0gc3RhcnRQb3MgfHwgc3RhdGUucG9zaXRpb247XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRlZCBtYXBwaW5nIGtleScpO1xuICAgIH1cblxuICAgIHNldFByb3BlcnR5KF9yZXN1bHQsIGtleU5vZGUsIHZhbHVlTm9kZSk7XG4gICAgZGVsZXRlIG92ZXJyaWRhYmxlS2V5c1trZXlOb2RlXTtcbiAgfVxuXG4gIHJldHVybiBfcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZWFkTGluZUJyZWFrKHN0YXRlKSB7XG4gIHZhciBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgwRC8qIENSICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MEEvKiBMRiAqLykge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2EgbGluZSBicmVhayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgc3RhdGUubGluZSArPSAxO1xuICBzdGF0ZS5saW5lU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgc3RhdGUuZmlyc3RUYWJJbkxpbmUgPSAtMTtcbn1cblxuZnVuY3Rpb24gc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgYWxsb3dDb21tZW50cywgY2hlY2tJbmRlbnQpIHtcbiAgdmFyIGxpbmVCcmVha3MgPSAwLFxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICBpZiAoY2ggPT09IDB4MDkvKiBUYWIgKi8gJiYgc3RhdGUuZmlyc3RUYWJJbkxpbmUgPT09IC0xKSB7XG4gICAgICAgIHN0YXRlLmZpcnN0VGFiSW5MaW5lID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93Q29tbWVudHMgJiYgY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH0gd2hpbGUgKGNoICE9PSAweDBBLyogTEYgKi8gJiYgY2ggIT09IDB4MEQvKiBDUiAqLyAmJiBjaCAhPT0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgbGluZUJyZWFrcysrO1xuICAgICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQrKztcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoY2hlY2tJbmRlbnQgIT09IC0xICYmIGxpbmVCcmVha3MgIT09IDAgJiYgc3RhdGUubGluZUluZGVudCA8IGNoZWNrSW5kZW50KSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnZGVmaWNpZW50IGluZGVudGF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbGluZUJyZWFrcztcbn1cblxuZnVuY3Rpb24gdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuXG4gIC8vIENvbmRpdGlvbiBzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0IGlzIHRlc3RlZFxuICAvLyBpbiBwYXJlbnQgb24gZWFjaCBjYWxsLCBmb3IgZWZmaWNpZW5jeS4gTm8gbmVlZHMgdG8gdGVzdCBoZXJlIGFnYWluLlxuICBpZiAoKGNoID09PSAweDJELyogLSAqLyB8fCBjaCA9PT0gMHgyRS8qIC4gKi8pICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAxKSAmJlxuICAgICAgY2ggPT09IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uICsgMikpIHtcblxuICAgIF9wb3NpdGlvbiArPSAzO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDAgfHwgaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBjb3VudCkge1xuICBpZiAoY291bnQgPT09IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgKz0gJyAnO1xuICB9IGVsc2UgaWYgKGNvdW50ID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBjb3VudCAtIDEpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gcmVhZFBsYWluU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50LCB3aXRoaW5GbG93Q29sbGVjdGlvbikge1xuICB2YXIgcHJlY2VkaW5nLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgY2FwdHVyZVN0YXJ0LFxuICAgICAgY2FwdHVyZUVuZCxcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50LFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX2xpbmVJbmRlbnQsXG4gICAgICBfa2luZCA9IHN0YXRlLmtpbmQsXG4gICAgICBfcmVzdWx0ID0gc3RhdGUucmVzdWx0LFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoaXNfV1NfT1JfRU9MKGNoKSAgICAgIHx8XG4gICAgICBpc19GTE9XX0lORElDQVRPUihjaCkgfHxcbiAgICAgIGNoID09PSAweDIzLyogIyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjYvKiAmICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyQS8qICogKi8gICAgfHxcbiAgICAgIGNoID09PSAweDIxLyogISAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4N0MvKiB8ICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgzRS8qID4gKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI3LyogJyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjIvKiBcIiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjUvKiAlICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg0MC8qIEAgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDYwLyogYCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMHgzRi8qID8gKi8gfHwgY2ggPT09IDB4MkQvKiAtICovKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpIHx8XG4gICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihmb2xsb3dpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIHByZWNlZGluZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gLSAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChwcmVjZWRpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB8fFxuICAgICAgICAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgICBicmVhaztcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2xpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9saW5lSW5kZW50ID0gc3RhdGUubGluZUluZGVudDtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCAtMSk7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID49IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSB0cnVlO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uID0gY2FwdHVyZUVuZDtcbiAgICAgICAgc3RhdGUubGluZSA9IF9saW5lO1xuICAgICAgICBzdGF0ZS5saW5lU3RhcnQgPSBfbGluZVN0YXJ0O1xuICAgICAgICBzdGF0ZS5saW5lSW5kZW50ID0gX2xpbmVJbmRlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNQZW5kaW5nQ29udGVudCkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc3RhdGUubGluZSAtIF9saW5lKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbiArIDE7XG4gICAgfVxuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuXG4gIGlmIChzdGF0ZS5yZXN1bHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSBfa2luZDtcbiAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjaCxcbiAgICAgIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNy8qICcgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBzdGF0ZS5wb3NpdGlvbisrO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgyNy8qICcgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIHRydWUpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIGRvY3VtZW50IHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBzaW5nbGUgcXVvdGVkIHNjYWxhcicpO1xufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGV4TGVuZ3RoLFxuICAgICAgaGV4UmVzdWx0LFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjIvKiBcIiAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDIyLyogXCIgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4NUMvKiBcXCAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3b3JrIHRvIGlubGluZSBmbiB3aXRoIG5vIHR5cGUgY2FzdD9cbiAgICAgIH0gZWxzZSBpZiAoY2ggPCAyNTYgJiYgc2ltcGxlRXNjYXBlQ2hlY2tbY2hdKSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBzaW1wbGVFc2NhcGVNYXBbY2hdO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2UgaWYgKCh0bXAgPSBlc2NhcGVkSGV4TGVuKGNoKSkgPiAwKSB7XG4gICAgICAgIGhleExlbmd0aCA9IHRtcDtcbiAgICAgICAgaGV4UmVzdWx0ID0gMDtcblxuICAgICAgICBmb3IgKDsgaGV4TGVuZ3RoID4gMDsgaGV4TGVuZ3RoLS0pIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAoKHRtcCA9IGZyb21IZXhDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgICAgICAgaGV4UmVzdWx0ID0gKGhleFJlc3VsdCA8PCA0KSArIHRtcDtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgaGV4YWRlY2ltYWwgY2hhcmFjdGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNoYXJGcm9tQ29kZXBvaW50KGhleFJlc3VsdCk7XG5cbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gZXNjYXBlIHNlcXVlbmNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGRvdWJsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgcmVhZE5leHQgPSB0cnVlLFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX3BvcyxcbiAgICAgIF90YWcgICAgID0gc3RhdGUudGFnLFxuICAgICAgX3Jlc3VsdCxcbiAgICAgIF9hbmNob3IgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgdGVybWluYXRvcixcbiAgICAgIGlzUGFpcixcbiAgICAgIGlzRXhwbGljaXRQYWlyLFxuICAgICAgaXNNYXBwaW5nLFxuICAgICAgb3ZlcnJpZGFibGVLZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGtleU5vZGUsXG4gICAgICBrZXlUYWcsXG4gICAgICB2YWx1ZU5vZGUsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHg1Qi8qIFsgKi8pIHtcbiAgICB0ZXJtaW5hdG9yID0gMHg1RDsvKiBdICovXG4gICAgaXNNYXBwaW5nID0gZmFsc2U7XG4gICAgX3Jlc3VsdCA9IFtdO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDdCLyogeyAqLykge1xuICAgIHRlcm1pbmF0b3IgPSAweDdEOy8qIH0gKi9cbiAgICBpc01hcHBpbmcgPSB0cnVlO1xuICAgIF9yZXN1bHQgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBfcmVzdWx0O1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gdGVybWluYXRvcikge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgc3RhdGUua2luZCA9IGlzTWFwcGluZyA/ICdtYXBwaW5nJyA6ICdzZXF1ZW5jZSc7XG4gICAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghcmVhZE5leHQpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdtaXNzZWQgY29tbWEgYmV0d2VlbiBmbG93IGNvbGxlY3Rpb24gZW50cmllcycpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4MkMvKiAsICovKSB7XG4gICAgICAvLyBcImZsb3cgY29sbGVjdGlvbiBlbnRyaWVzIGNhbiBuZXZlciBiZSBjb21wbGV0ZWx5IGVtcHR5XCIsIGFzIHBlciBZQU1MIDEuMiwgc2VjdGlvbiA3LjRcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsIFwiZXhwZWN0ZWQgdGhlIG5vZGUgY29udGVudCwgYnV0IGZvdW5kICcsJ1wiKTtcbiAgICB9XG5cbiAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICBpc1BhaXIgPSBpc0V4cGxpY2l0UGFpciA9IGZhbHNlO1xuXG4gICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcbiAgICAgICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgbGluZS5cbiAgICBfbGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgIF9wb3MgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICBjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9GTE9XX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAga2V5VGFnID0gc3RhdGUudGFnO1xuICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKChpc0V4cGxpY2l0UGFpciB8fCBzdGF0ZS5saW5lID09PSBfbGluZSkgJiYgY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBpc1BhaXIgPSB0cnVlO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG4gICAgICBjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9GTE9XX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB2YWx1ZU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKGlzTWFwcGluZykge1xuICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9saW5lU3RhcnQsIF9wb3MpO1xuICAgIH0gZWxzZSBpZiAoaXNQYWlyKSB7XG4gICAgICBfcmVzdWx0LnB1c2goc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgbnVsbCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9saW5lU3RhcnQsIF9wb3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3Jlc3VsdC5wdXNoKGtleU5vZGUpO1xuICAgIH1cblxuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMHgyQy8qICwgKi8pIHtcbiAgICAgIHJlYWROZXh0ID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZE5leHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBmbG93IGNvbGxlY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBmb2xkaW5nLFxuICAgICAgY2hvbXBpbmcgICAgICAgPSBDSE9NUElOR19DTElQLFxuICAgICAgZGlkUmVhZENvbnRlbnQgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkSW5kZW50ID0gZmFsc2UsXG4gICAgICB0ZXh0SW5kZW50ICAgICA9IG5vZGVJbmRlbnQsXG4gICAgICBlbXB0eUxpbmVzICAgICA9IDAsXG4gICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlLFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4N0MvKiB8ICovKSB7XG4gICAgZm9sZGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDNFLyogPiAqLykge1xuICAgIGZvbGRpbmcgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJCLyogKyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICAgIGlmIChDSE9NUElOR19DTElQID09PSBjaG9tcGluZykge1xuICAgICAgICBjaG9tcGluZyA9IChjaCA9PT0gMHgyQi8qICsgKi8pID8gQ0hPTVBJTkdfS0VFUCA6IENIT01QSU5HX1NUUklQO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3JlcGVhdCBvZiBhIGNob21waW5nIG1vZGUgaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgodG1wID0gZnJvbURlY2ltYWxDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgaWYgKHRtcCA9PT0gMCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGV4cGxpY2l0IGluZGVudGF0aW9uIHdpZHRoIG9mIGEgYmxvY2sgc2NhbGFyOyBpdCBjYW5ub3QgYmUgbGVzcyB0aGFuIG9uZScpO1xuICAgICAgfSBlbHNlIGlmICghZGV0ZWN0ZWRJbmRlbnQpIHtcbiAgICAgICAgdGV4dEluZGVudCA9IG5vZGVJbmRlbnQgKyB0bXAgLSAxO1xuICAgICAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGFuIGluZGVudGF0aW9uIHdpZHRoIGlkZW50aWZpZXInKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKTtcblxuICAgIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSk7XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG4gICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgd2hpbGUgKCghZGV0ZWN0ZWRJbmRlbnQgfHwgc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpICYmXG4gICAgICAgICAgIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSkge1xuICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmICghZGV0ZWN0ZWRJbmRlbnQgJiYgc3RhdGUubGluZUluZGVudCA+IHRleHRJbmRlbnQpIHtcbiAgICAgIHRleHRJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgIH1cblxuICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBlbXB0eUxpbmVzKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBFbmQgb2YgdGhlIHNjYWxhci5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpIHtcblxuICAgICAgLy8gUGVyZm9ybSB0aGUgY2hvbXBpbmcuXG4gICAgICBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0tFRVApIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0NMSVApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB0aGUgc2NhbGFyIGlzIG5vdCBlbXB0eS5cbiAgICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnJlYWsgdGhpcyBgd2hpbGVgIGN5Y2xlIGFuZCBnbyB0byB0aGUgZnVuY2l0b24ncyBlcGlsb2d1ZS5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIEZvbGRlZCBzdHlsZTogdXNlIGZhbmN5IHJ1bGVzIHRvIGhhbmRsZSBsaW5lIGJyZWFrcy5cbiAgICBpZiAoZm9sZGluZykge1xuXG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMgKG1vcmUtaW5kZW50ZWQgbGluZXMpIGFyZSBub3QgZm9sZGVkLlxuICAgICAgaWYgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IHRydWU7XG4gICAgICAgIC8vIGV4Y2VwdCBmb3IgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSAoY2YuIEV4YW1wbGUgOC4xKVxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuXG4gICAgICAvLyBFbmQgb2YgbW9yZS1pbmRlbnRlZCBibG9jay5cbiAgICAgIH0gZWxzZSBpZiAoYXRNb3JlSW5kZW50ZWQpIHtcbiAgICAgICAgYXRNb3JlSW5kZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMgKyAxKTtcblxuICAgICAgLy8gSnVzdCBvbmUgbGluZSBicmVhayAtIHBlcmNlaXZlIGFzIHRoZSBzYW1lIGxpbmUuXG4gICAgICB9IGVsc2UgaWYgKGVtcHR5TGluZXMgPT09IDApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB3ZSBoYXZlIGFscmVhZHkgcmVhZCBzb21lIHNjYWxhciBjb250ZW50LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgLy8gU2V2ZXJhbCBsaW5lIGJyZWFrcyAtIHBlcmNlaXZlIGFzIGRpZmZlcmVudCBsaW5lcy5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBlbXB0eUxpbmVzKTtcbiAgICAgIH1cblxuICAgIC8vIExpdGVyYWwgc3R5bGU6IGp1c3QgYWRkIGV4YWN0IG51bWJlciBvZiBsaW5lIGJyZWFrcyBiZXR3ZWVuIGNvbnRlbnQgbGluZXMuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEtlZXAgYWxsIGxpbmUgYnJlYWtzIGV4Y2VwdCB0aGUgaGVhZGVyIGxpbmUgYnJlYWsuXG4gICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgIH1cblxuICAgIGRpZFJlYWRDb250ZW50ID0gdHJ1ZTtcbiAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgZW1wdHlMaW5lcyA9IDA7XG4gICAgY2FwdHVyZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIF9saW5lLFxuICAgICAgX3RhZyAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgX3Jlc3VsdCAgID0gW10sXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBkZXRlY3RlZCAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIC8vIHRoZXJlIGlzIGEgbGVhZGluZyB0YWIgYmVmb3JlIHRoaXMgdG9rZW4sIHNvIGl0IGNhbid0IGJlIGEgYmxvY2sgc2VxdWVuY2UvbWFwcGluZztcbiAgLy8gaXQgY2FuIHN0aWxsIGJlIGZsb3cgc2VxdWVuY2UvbWFwcGluZyBvciBhIHNjYWxhclxuICBpZiAoc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKHN0YXRlLmZpcnN0VGFiSW5MaW5lICE9PSAtMSkge1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGF0ZS5maXJzdFRhYkluTGluZTtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWIgY2hhcmFjdGVycyBtdXN0IG5vdCBiZSB1c2VkIGluIGluZGVudGF0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKGNoICE9PSAweDJELyogLSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKCFpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA8PSBub2RlSW5kZW50KSB7XG4gICAgICAgIF9yZXN1bHQucHVzaChudWxsKTtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgX3Jlc3VsdC5wdXNoKHN0YXRlLnJlc3VsdCk7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgaW5kZW50YXRpb24gb2YgYSBzZXF1ZW5jZSBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ3NlcXVlbmNlJztcbiAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgbm9kZUluZGVudCwgZmxvd0luZGVudCkge1xuICB2YXIgZm9sbG93aW5nLFxuICAgICAgYWxsb3dDb21wYWN0LFxuICAgICAgX2xpbmUsXG4gICAgICBfa2V5TGluZSxcbiAgICAgIF9rZXlMaW5lU3RhcnQsXG4gICAgICBfa2V5UG9zLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9hbmNob3IgICAgICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgICAgID0ge30sXG4gICAgICBvdmVycmlkYWJsZUtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAga2V5VGFnICAgICAgICA9IG51bGwsXG4gICAgICBrZXlOb2RlICAgICAgID0gbnVsbCxcbiAgICAgIHZhbHVlTm9kZSAgICAgPSBudWxsLFxuICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWQgICAgICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgLy8gdGhlcmUgaXMgYSBsZWFkaW5nIHRhYiBiZWZvcmUgdGhpcyB0b2tlbiwgc28gaXQgY2FuJ3QgYmUgYSBibG9jayBzZXF1ZW5jZS9tYXBwaW5nO1xuICAvLyBpdCBjYW4gc3RpbGwgYmUgZmxvdyBzZXF1ZW5jZS9tYXBwaW5nIG9yIGEgc2NhbGFyXG4gIGlmIChzdGF0ZS5maXJzdFRhYkluTGluZSAhPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBfcmVzdWx0O1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoIWF0RXhwbGljaXRLZXkgJiYgc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXRlLmZpcnN0VGFiSW5MaW5lO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhYiBjaGFyYWN0ZXJzIG11c3Qgbm90IGJlIHVzZWQgaW4gaW5kZW50YXRpb24nKTtcbiAgICB9XG5cbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lOyAvLyBTYXZlIHRoZSBjdXJyZW50IGxpbmUuXG5cbiAgICAvL1xuICAgIC8vIEV4cGxpY2l0IG5vdGF0aW9uIGNhc2UuIFRoZXJlIGFyZSB0d28gc2VwYXJhdGUgYmxvY2tzOlxuICAgIC8vIGZpcnN0IGZvciB0aGUga2V5IChkZW5vdGVkIGJ5IFwiP1wiKSBhbmQgc2Vjb25kIGZvciB0aGUgdmFsdWUgKGRlbm90ZWQgYnkgXCI6XCIpXG4gICAgLy9cbiAgICBpZiAoKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgzQS8qIDogKi8pICYmIGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICAgICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICBhdEV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICAgICAgYWxsb3dDb21wYWN0ID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgIC8vIGkuZS4gMHgzQS8qIDogKi8gPT09IGNoYXJhY3RlciBhZnRlciB0aGUgZXhwbGljaXQga2V5LlxuICAgICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIGFsbG93Q29tcGFjdCA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbmNvbXBsZXRlIGV4cGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBrZXkgbm9kZSBpcyBtaXNzZWQ7IG9yIGZvbGxvd2VkIGJ5IGEgbm9uLXRhYnVsYXRlZCBlbXB0eSBsaW5lJyk7XG4gICAgICB9XG5cbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDE7XG4gICAgICBjaCA9IGZvbGxvd2luZztcblxuICAgIC8vXG4gICAgLy8gSW1wbGljaXQgbm90YXRpb24gY2FzZS4gRmxvdy1zdHlsZSBub2RlIGFzIHRoZSBrZXkgZmlyc3QsIHRoZW4gXCI6XCIsIGFuZCB0aGUgdmFsdWUuXG4gICAgLy9cbiAgICB9IGVsc2Uge1xuICAgICAgX2tleUxpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2tleUxpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9rZXlQb3MgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgaWYgKCFjb21wb3NlTm9kZShzdGF0ZSwgZmxvd0luZGVudCwgQ09OVEVYVF9GTE9XX09VVCwgZmFsc2UsIHRydWUpKSB7XG4gICAgICAgIC8vIE5laXRoZXIgaW1wbGljaXQgbm9yIGV4cGxpY2l0IG5vdGF0aW9uLlxuICAgICAgICAvLyBSZWFkaW5nIGlzIGRvbmUuIEdvIHRvIHRoZSBlcGlsb2d1ZS5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgICAgaWYgKCFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSB3aGl0ZXNwYWNlIGNoYXJhY3RlciBpcyBleHBlY3RlZCBhZnRlciB0aGUga2V5LXZhbHVlIHNlcGFyYXRvciB3aXRoaW4gYSBibG9jayBtYXBwaW5nJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsLCBfa2V5TGluZSwgX2tleUxpbmVTdGFydCwgX2tleVBvcyk7XG4gICAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICAgIGFsbG93Q29tcGFjdCA9IGZhbHNlO1xuICAgICAgICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0ZWN0ZWQpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGFuIGltcGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBjb2xvbiBpcyBtaXNzZWQnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgcmVzdWx0IG9mIGBjb21wb3NlTm9kZWAuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGEgYmxvY2sgbWFwcGluZyBlbnRyeTsgYSBtdWx0aWxpbmUga2V5IG1heSBub3QgYmUgYW4gaW1wbGljaXQga2V5Jyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIENvbW1vbiByZWFkaW5nIGNvZGUgZm9yIGJvdGggZXhwbGljaXQgYW5kIGltcGxpY2l0IG5vdGF0aW9ucy5cbiAgICAvL1xuICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkge1xuICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgX2tleUxpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgICBfa2V5TGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgICBfa2V5UG9zID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9CTE9DS19PVVQsIHRydWUsIGFsbG93Q29tcGFjdCkpIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoKHN0YXRlLmxpbmUgPT09IF9saW5lIHx8IHN0YXRlLmxpbmVJbmRlbnQgPiBub2RlSW5kZW50KSAmJiAoY2ggIT09IDApKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGluZGVudGF0aW9uIG9mIGEgbWFwcGluZyBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIEVwaWxvZ3VlLlxuICAvL1xuXG4gIC8vIFNwZWNpYWwgY2FzZTogbGFzdCBtYXBwaW5nJ3Mgbm9kZSBjb250YWlucyBvbmx5IHRoZSBrZXkgaW4gZXhwbGljaXQgbm90YXRpb24uXG4gIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwsIF9rZXlMaW5lLCBfa2V5TGluZVN0YXJ0LCBfa2V5UG9zKTtcbiAgfVxuXG4gIC8vIEV4cG9zZSB0aGUgcmVzdWx0aW5nIG1hcHBpbmcuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ21hcHBpbmcnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZGV0ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgaXNWZXJiYXRpbSA9IGZhbHNlLFxuICAgICAgaXNOYW1lZCAgICA9IGZhbHNlLFxuICAgICAgdGFnSGFuZGxlLFxuICAgICAgdGFnTmFtZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDIxLyogISAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYSB0YWcgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4M0MvKiA8ICovKSB7XG4gICAgaXNWZXJiYXRpbSA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgaXNOYW1lZCA9IHRydWU7XG4gICAgdGFnSGFuZGxlID0gJyEhJztcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIHtcbiAgICB0YWdIYW5kbGUgPSAnISc7XG4gIH1cblxuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICBpZiAoaXNWZXJiYXRpbSkge1xuICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgd2hpbGUgKGNoICE9PSAwICYmIGNoICE9PSAweDNFLyogPiAqLyk7XG5cbiAgICBpZiAoc3RhdGUucG9zaXRpb24gPCBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgdmVyYmF0aW0gdGFnJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgICAgIGlmICghaXNOYW1lZCkge1xuICAgICAgICAgIHRhZ0hhbmRsZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiAtIDEsIHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgICAgICBpZiAoIVBBVFRFUk5fVEFHX0hBTkRMRS50ZXN0KHRhZ0hhbmRsZSkpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lZCB0YWcgaGFuZGxlIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVycycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzTmFtZWQgPSB0cnVlO1xuICAgICAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBleGNsYW1hdGlvbiBtYXJrcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0YWdOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoUEFUVEVSTl9GTE9XX0lORElDQVRPUlMudGVzdCh0YWdOYW1lKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBzdWZmaXggY2Fubm90IGNvbnRhaW4gZmxvdyBpbmRpY2F0b3IgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0YWdOYW1lICYmICFQQVRURVJOX1RBR19VUkkudGVzdCh0YWdOYW1lKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgbmFtZSBjYW5ub3QgY29udGFpbiBzdWNoIGNoYXJhY3RlcnM6ICcgKyB0YWdOYW1lKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdGFnTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudCh0YWdOYW1lKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBuYW1lIGlzIG1hbGZvcm1lZDogJyArIHRhZ05hbWUpO1xuICB9XG5cbiAgaWYgKGlzVmVyYmF0aW0pIHtcbiAgICBzdGF0ZS50YWcgPSB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS50YWdNYXAsIHRhZ0hhbmRsZSkpIHtcbiAgICBzdGF0ZS50YWcgPSBzdGF0ZS50YWdNYXBbdGFnSGFuZGxlXSArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIGlmICh0YWdIYW5kbGUgPT09ICchJykge1xuICAgIHN0YXRlLnRhZyA9ICchJyArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIGlmICh0YWdIYW5kbGUgPT09ICchIScpIHtcbiAgICBzdGF0ZS50YWcgPSAndGFnOnlhbWwub3JnLDIwMDI6JyArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5kZWNsYXJlZCB0YWcgaGFuZGxlIFwiJyArIHRhZ0hhbmRsZSArICdcIicpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlYWRBbmNob3JQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjYvKiAmICovKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiBhbiBhbmNob3IgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpICYmICFpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IF9wb3NpdGlvbikge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lIG9mIGFuIGFuY2hvciBub2RlIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgY2hhcmFjdGVyJyk7XG4gIH1cblxuICBzdGF0ZS5hbmNob3IgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlYWRBbGlhcyhzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLCBhbGlhcyxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDJBLyogKiAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpICYmICFpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IF9wb3NpdGlvbikge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lIG9mIGFuIGFsaWFzIG5vZGUgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXInKTtcbiAgfVxuXG4gIGFsaWFzID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKCFfaGFzT3duUHJvcGVydHkkMS5jYWxsKHN0YXRlLmFuY2hvck1hcCwgYWxpYXMpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuaWRlbnRpZmllZCBhbGlhcyBcIicgKyBhbGlhcyArICdcIicpO1xuICB9XG5cbiAgc3RhdGUucmVzdWx0ID0gc3RhdGUuYW5jaG9yTWFwW2FsaWFzXTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZU5vZGUoc3RhdGUsIHBhcmVudEluZGVudCwgbm9kZUNvbnRleHQsIGFsbG93VG9TZWVrLCBhbGxvd0NvbXBhY3QpIHtcbiAgdmFyIGFsbG93QmxvY2tTdHlsZXMsXG4gICAgICBhbGxvd0Jsb2NrU2NhbGFycyxcbiAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyxcbiAgICAgIGluZGVudFN0YXR1cyA9IDEsIC8vIDE6IHRoaXM+cGFyZW50LCAwOiB0aGlzPXBhcmVudCwgLTE6IHRoaXM8cGFyZW50XG4gICAgICBhdE5ld0xpbmUgID0gZmFsc2UsXG4gICAgICBoYXNDb250ZW50ID0gZmFsc2UsXG4gICAgICB0eXBlSW5kZXgsXG4gICAgICB0eXBlUXVhbnRpdHksXG4gICAgICB0eXBlTGlzdCxcbiAgICAgIHR5cGUsXG4gICAgICBmbG93SW5kZW50LFxuICAgICAgYmxvY2tJbmRlbnQ7XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ29wZW4nLCBzdGF0ZSk7XG4gIH1cblxuICBzdGF0ZS50YWcgICAgPSBudWxsO1xuICBzdGF0ZS5hbmNob3IgPSBudWxsO1xuICBzdGF0ZS5raW5kICAgPSBudWxsO1xuICBzdGF0ZS5yZXN1bHQgPSBudWxsO1xuXG4gIGFsbG93QmxvY2tTdHlsZXMgPSBhbGxvd0Jsb2NrU2NhbGFycyA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9XG4gICAgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0IHx8XG4gICAgQ09OVEVYVF9CTE9DS19JTiAgPT09IG5vZGVDb250ZXh0O1xuXG4gIGlmIChhbGxvd1RvU2Vlaykge1xuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGF0TmV3TGluZSA9IHRydWU7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEpIHtcbiAgICB3aGlsZSAocmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB8fCByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpKSB7XG4gICAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICAgIGF0TmV3TGluZSA9IHRydWU7XG4gICAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGFsbG93QmxvY2tTdHlsZXM7XG5cbiAgICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zKSB7XG4gICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gYXROZXdMaW5lIHx8IGFsbG93Q29tcGFjdDtcbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEgfHwgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgaWYgKENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQgfHwgQ09OVEVYVF9GTE9XX09VVCA9PT0gbm9kZUNvbnRleHQpIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQgKyAxO1xuICAgIH1cblxuICAgIGJsb2NrSW5kZW50ID0gc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQ7XG5cbiAgICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmXG4gICAgICAgICAgKHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCkgfHxcbiAgICAgICAgICAgcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgYmxvY2tJbmRlbnQsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGFsbG93QmxvY2tTY2FsYXJzICYmIHJlYWRCbG9ja1NjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHx8XG4gICAgICAgICAgICByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSB8fFxuICAgICAgICAgICAgcmVhZERvdWJsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlYWRBbGlhcyhzdGF0ZSkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgfHwgc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYWxpYXMgbm9kZSBzaG91bGQgbm90IGhhdmUgYW55IHByb3BlcnRpZXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkUGxhaW5TY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWcgPSAnPyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmRlbnRTdGF0dXMgPT09IDApIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZTogYmxvY2sgc2VxdWVuY2VzIGFyZSBhbGxvd2VkIHRvIGhhdmUgc2FtZSBpbmRlbnRhdGlvbiBsZXZlbCBhcyB0aGUgcGFyZW50LlxuICAgICAgLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyNzk5Nzg0XG4gICAgICBoYXNDb250ZW50ID0gYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmIHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnRhZyA9PT0gbnVsbCkge1xuICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgIH1cblxuICB9IGVsc2UgaWYgKHN0YXRlLnRhZyA9PT0gJz8nKSB7XG4gICAgLy8gSW1wbGljaXQgcmVzb2x2aW5nIGlzIG5vdCBhbGxvd2VkIGZvciBub24tc2NhbGFyIHR5cGVzLCBhbmQgJz8nXG4gICAgLy8gbm9uLXNwZWNpZmljIHRhZyBpcyBvbmx5IGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gcGxhaW4gc2NhbGFycy5cbiAgICAvL1xuICAgIC8vIFdlIG9ubHkgbmVlZCB0byBjaGVjayBraW5kIGNvbmZvcm1pdHkgaW4gY2FzZSB1c2VyIGV4cGxpY2l0bHkgYXNzaWducyAnPydcbiAgICAvLyB0YWcsIGZvciBleGFtcGxlIGxpa2UgdGhpczogXCIhPD8+IFswXVwiXG4gICAgLy9cbiAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHN0YXRlLmtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITw/PiB0YWc7IGl0IHNob3VsZCBiZSBcInNjYWxhclwiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgIH1cblxuICAgIGZvciAodHlwZUluZGV4ID0gMCwgdHlwZVF1YW50aXR5ID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW3R5cGVJbmRleF07XG5cbiAgICAgIGlmICh0eXBlLnJlc29sdmUoc3RhdGUucmVzdWx0KSkgeyAvLyBgc3RhdGUucmVzdWx0YCB1cGRhdGVkIGluIHJlc29sdmVyIGlmIG1hdGNoZWRcbiAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdGUudGFnICE9PSAnIScpIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ10sIHN0YXRlLnRhZykpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ11bc3RhdGUudGFnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9va2luZyBmb3IgbXVsdGkgdHlwZVxuICAgICAgdHlwZSA9IG51bGw7XG4gICAgICB0eXBlTGlzdCA9IHN0YXRlLnR5cGVNYXAubXVsdGlbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXTtcblxuICAgICAgZm9yICh0eXBlSW5kZXggPSAwLCB0eXBlUXVhbnRpdHkgPSB0eXBlTGlzdC5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgICAgaWYgKHN0YXRlLnRhZy5zbGljZSgwLCB0eXBlTGlzdFt0eXBlSW5kZXhdLnRhZy5sZW5ndGgpID09PSB0eXBlTGlzdFt0eXBlSW5kZXhdLnRhZykge1xuICAgICAgICAgIHR5cGUgPSB0eXBlTGlzdFt0eXBlSW5kZXhdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5rbm93biB0YWcgITwnICsgc3RhdGUudGFnICsgJz4nKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHR5cGUua2luZCAhPT0gc3RhdGUua2luZCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBub2RlIGtpbmQgZm9yICE8JyArIHN0YXRlLnRhZyArICc+IHRhZzsgaXQgc2hvdWxkIGJlIFwiJyArIHR5cGUua2luZCArICdcIiwgbm90IFwiJyArIHN0YXRlLmtpbmQgKyAnXCInKTtcbiAgICB9XG5cbiAgICBpZiAoIXR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQsIHN0YXRlLnRhZykpIHsgLy8gYHN0YXRlLnJlc3VsdGAgdXBkYXRlZCBpbiByZXNvbHZlciBpZiBtYXRjaGVkXG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IHJlc29sdmUgYSBub2RlIHdpdGggITwnICsgc3RhdGUudGFnICsgJz4gZXhwbGljaXQgdGFnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnJlc3VsdCA9IHR5cGUuY29uc3RydWN0KHN0YXRlLnJlc3VsdCwgc3RhdGUudGFnKTtcbiAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ2Nsb3NlJywgc3RhdGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZS50YWcgIT09IG51bGwgfHwgIHN0YXRlLmFuY2hvciAhPT0gbnVsbCB8fCBoYXNDb250ZW50O1xufVxuXG5mdW5jdGlvbiByZWFkRG9jdW1lbnQoc3RhdGUpIHtcbiAgdmFyIGRvY3VtZW50U3RhcnQgPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIF9wb3NpdGlvbixcbiAgICAgIGRpcmVjdGl2ZU5hbWUsXG4gICAgICBkaXJlY3RpdmVBcmdzLFxuICAgICAgaGFzRGlyZWN0aXZlcyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgc3RhdGUudmVyc2lvbiA9IG51bGw7XG4gIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IHN0YXRlLmxlZ2FjeTtcbiAgc3RhdGUudGFnTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RhdGUuYW5jaG9yTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gMCB8fCBjaCAhPT0gMHgyNS8qICUgKi8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGhhc0RpcmVjdGl2ZXMgPSB0cnVlO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRpcmVjdGl2ZU5hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICBkaXJlY3RpdmVBcmdzID0gW107XG5cbiAgICBpZiAoZGlyZWN0aXZlTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlIG5hbWUgbXVzdCBub3QgYmUgbGVzcyB0aGFuIG9uZSBjaGFyYWN0ZXIgaW4gbGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX0VPTChjaCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzX0VPTChjaCkpIGJyZWFrO1xuXG4gICAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGlyZWN0aXZlQXJncy5wdXNoKHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pKTtcbiAgICB9XG5cbiAgICBpZiAoY2ggIT09IDApIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoZGlyZWN0aXZlSGFuZGxlcnMsIGRpcmVjdGl2ZU5hbWUpKSB7XG4gICAgICBkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmVOYW1lXShzdGF0ZSwgZGlyZWN0aXZlTmFtZSwgZGlyZWN0aXZlQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ3Vua25vd24gZG9jdW1lbnQgZGlyZWN0aXZlIFwiJyArIGRpcmVjdGl2ZU5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH1cblxuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IDAgJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pICAgICA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKSA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAyKSA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICB9IGVsc2UgaWYgKGhhc0RpcmVjdGl2ZXMpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlcyBlbmQgbWFyayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgY29tcG9zZU5vZGUoc3RhdGUsIHN0YXRlLmxpbmVJbmRlbnQgLSAxLCBDT05URVhUX0JMT0NLX09VVCwgZmFsc2UsIHRydWUpO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmNoZWNrTGluZUJyZWFrcyAmJlxuICAgICAgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MudGVzdChzdGF0ZS5pbnB1dC5zbGljZShkb2N1bWVudFN0YXJ0LCBzdGF0ZS5wb3NpdGlvbikpKSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnbm9uLUFTQ0lJIGxpbmUgYnJlYWtzIGFyZSBpbnRlcnByZXRlZCBhcyBjb250ZW50Jyk7XG4gIH1cblxuICBzdGF0ZS5kb2N1bWVudHMucHVzaChzdGF0ZS5yZXN1bHQpO1xuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcblxuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyRS8qIC4gKi8pIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDM7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdlbmQgb2YgdGhlIHN0cmVhbSBvciBhIGRvY3VtZW50IHNlcGFyYXRvciBpcyBleHBlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaW5wdXQubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAvLyBBZGQgdGFpbGluZyBgXFxuYCBpZiBub3QgZXhpc3RzXG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgIT09IDB4MEEvKiBMRiAqLyAmJlxuICAgICAgICBpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBELyogQ1IgKi8pIHtcbiAgICAgIGlucHV0ICs9ICdcXG4nO1xuICAgIH1cblxuICAgIC8vIFN0cmlwIEJPTVxuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHN0YXRlID0gbmV3IFN0YXRlJDEoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIHZhciBudWxscG9zID0gaW5wdXQuaW5kZXhPZignXFwwJyk7XG5cbiAgaWYgKG51bGxwb3MgIT09IC0xKSB7XG4gICAgc3RhdGUucG9zaXRpb24gPSBudWxscG9zO1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdudWxsIGJ5dGUgaXMgbm90IGFsbG93ZWQgaW4gaW5wdXQnKTtcbiAgfVxuXG4gIC8vIFVzZSAwIGFzIHN0cmluZyB0ZXJtaW5hdG9yLiBUaGF0IHNpZ25pZmljYW50bHkgc2ltcGxpZmllcyBib3VuZHMgY2hlY2suXG4gIHN0YXRlLmlucHV0ICs9ICdcXDAnO1xuXG4gIHdoaWxlIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgc3RhdGUubGluZUluZGVudCArPSAxO1xuICAgIHN0YXRlLnBvc2l0aW9uICs9IDE7XG4gIH1cblxuICB3aGlsZSAoc3RhdGUucG9zaXRpb24gPCAoc3RhdGUubGVuZ3RoIC0gMSkpIHtcbiAgICByZWFkRG9jdW1lbnQoc3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlLmRvY3VtZW50cztcbn1cblxuXG5mdW5jdGlvbiBsb2FkQWxsJDEoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmIChpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICB2YXIgZG9jdW1lbnRzID0gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkb2N1bWVudHM7XG4gIH1cblxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGRvY3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgaXRlcmF0b3IoZG9jdW1lbnRzW2luZGV4XSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkJDEoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRvY3VtZW50cyA9IGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIGlmIChkb2N1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby11bmRlZmluZWQqL1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBkb2N1bWVudHNbMF07XG4gIH1cbiAgdGhyb3cgbmV3IGV4Y2VwdGlvbignZXhwZWN0ZWQgYSBzaW5nbGUgZG9jdW1lbnQgaW4gdGhlIHN0cmVhbSwgYnV0IGZvdW5kIG1vcmUnKTtcbn1cblxuXG52YXIgbG9hZEFsbF8xID0gbG9hZEFsbCQxO1xudmFyIGxvYWRfMSAgICA9IGxvYWQkMTtcblxudmFyIGxvYWRlciA9IHtcblx0bG9hZEFsbDogbG9hZEFsbF8xLFxuXHRsb2FkOiBsb2FkXzFcbn07XG5cbi8qZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUqL1xuXG5cblxuXG5cbnZhciBfdG9TdHJpbmcgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBDSEFSX0JPTSAgICAgICAgICAgICAgICAgID0gMHhGRUZGO1xudmFyIENIQVJfVEFCICAgICAgICAgICAgICAgICAgPSAweDA5OyAvKiBUYWIgKi9cbnZhciBDSEFSX0xJTkVfRkVFRCAgICAgICAgICAgID0gMHgwQTsgLyogTEYgKi9cbnZhciBDSEFSX0NBUlJJQUdFX1JFVFVSTiAgICAgID0gMHgwRDsgLyogQ1IgKi9cbnZhciBDSEFSX1NQQUNFICAgICAgICAgICAgICAgID0gMHgyMDsgLyogU3BhY2UgKi9cbnZhciBDSEFSX0VYQ0xBTUFUSU9OICAgICAgICAgID0gMHgyMTsgLyogISAqL1xudmFyIENIQVJfRE9VQkxFX1FVT1RFICAgICAgICAgPSAweDIyOyAvKiBcIiAqL1xudmFyIENIQVJfU0hBUlAgICAgICAgICAgICAgICAgPSAweDIzOyAvKiAjICovXG52YXIgQ0hBUl9QRVJDRU5UICAgICAgICAgICAgICA9IDB4MjU7IC8qICUgKi9cbnZhciBDSEFSX0FNUEVSU0FORCAgICAgICAgICAgID0gMHgyNjsgLyogJiAqL1xudmFyIENIQVJfU0lOR0xFX1FVT1RFICAgICAgICAgPSAweDI3OyAvKiAnICovXG52YXIgQ0hBUl9BU1RFUklTSyAgICAgICAgICAgICA9IDB4MkE7IC8qICogKi9cbnZhciBDSEFSX0NPTU1BICAgICAgICAgICAgICAgID0gMHgyQzsgLyogLCAqL1xudmFyIENIQVJfTUlOVVMgICAgICAgICAgICAgICAgPSAweDJEOyAvKiAtICovXG52YXIgQ0hBUl9DT0xPTiAgICAgICAgICAgICAgICA9IDB4M0E7IC8qIDogKi9cbnZhciBDSEFSX0VRVUFMUyAgICAgICAgICAgICAgID0gMHgzRDsgLyogPSAqL1xudmFyIENIQVJfR1JFQVRFUl9USEFOICAgICAgICAgPSAweDNFOyAvKiA+ICovXG52YXIgQ0hBUl9RVUVTVElPTiAgICAgICAgICAgICA9IDB4M0Y7IC8qID8gKi9cbnZhciBDSEFSX0NPTU1FUkNJQUxfQVQgICAgICAgID0gMHg0MDsgLyogQCAqL1xudmFyIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCAgPSAweDVCOyAvKiBbICovXG52YXIgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCA9IDB4NUQ7IC8qIF0gKi9cbnZhciBDSEFSX0dSQVZFX0FDQ0VOVCAgICAgICAgID0gMHg2MDsgLyogYCAqL1xudmFyIENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUICAgPSAweDdCOyAvKiB7ICovXG52YXIgQ0hBUl9WRVJUSUNBTF9MSU5FICAgICAgICA9IDB4N0M7IC8qIHwgKi9cbnZhciBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVQgID0gMHg3RDsgLyogfSAqL1xuXG52YXIgRVNDQVBFX1NFUVVFTkNFUyA9IHt9O1xuXG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDBdICAgPSAnXFxcXDAnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA3XSAgID0gJ1xcXFxhJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwOF0gICA9ICdcXFxcYic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDldICAgPSAnXFxcXHQnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBBXSAgID0gJ1xcXFxuJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQl0gICA9ICdcXFxcdic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MENdICAgPSAnXFxcXGYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBEXSAgID0gJ1xcXFxyJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgxQl0gICA9ICdcXFxcZSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjJdICAgPSAnXFxcXFwiJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHg1Q10gICA9ICdcXFxcXFxcXCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4ODVdICAgPSAnXFxcXE4nO1xuRVNDQVBFX1NFUVVFTkNFU1sweEEwXSAgID0gJ1xcXFxfJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMDI4XSA9ICdcXFxcTCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOV0gPSAnXFxcXFAnO1xuXG52YXIgREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVggPSBbXG4gICd5JywgJ1knLCAneWVzJywgJ1llcycsICdZRVMnLCAnb24nLCAnT24nLCAnT04nLFxuICAnbicsICdOJywgJ25vJywgJ05vJywgJ05PJywgJ29mZicsICdPZmYnLCAnT0ZGJ1xuXTtcblxudmFyIERFUFJFQ0FURURfQkFTRTYwX1NZTlRBWCA9IC9eWy0rXT9bMC05X10rKD86OlswLTlfXSspKyg/OlxcLlswLTlfXSopPyQvO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVNYXAoc2NoZW1hLCBtYXApIHtcbiAgdmFyIHJlc3VsdCwga2V5cywgaW5kZXgsIGxlbmd0aCwgdGFnLCBzdHlsZSwgdHlwZTtcblxuICBpZiAobWFwID09PSBudWxsKSByZXR1cm4ge307XG5cbiAgcmVzdWx0ID0ge307XG4gIGtleXMgPSBPYmplY3Qua2V5cyhtYXApO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0YWcgPSBrZXlzW2luZGV4XTtcbiAgICBzdHlsZSA9IFN0cmluZyhtYXBbdGFnXSk7XG5cbiAgICBpZiAodGFnLnNsaWNlKDAsIDIpID09PSAnISEnKSB7XG4gICAgICB0YWcgPSAndGFnOnlhbWwub3JnLDIwMDI6JyArIHRhZy5zbGljZSgyKTtcbiAgICB9XG4gICAgdHlwZSA9IHNjaGVtYS5jb21waWxlZFR5cGVNYXBbJ2ZhbGxiYWNrJ11bdGFnXTtcblxuICAgIGlmICh0eXBlICYmIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUuc3R5bGVBbGlhc2VzLCBzdHlsZSkpIHtcbiAgICAgIHN0eWxlID0gdHlwZS5zdHlsZUFsaWFzZXNbc3R5bGVdO1xuICAgIH1cblxuICAgIHJlc3VsdFt0YWddID0gc3R5bGU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBlbmNvZGVIZXgoY2hhcmFjdGVyKSB7XG4gIHZhciBzdHJpbmcsIGhhbmRsZSwgbGVuZ3RoO1xuXG4gIHN0cmluZyA9IGNoYXJhY3Rlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblxuICBpZiAoY2hhcmFjdGVyIDw9IDB4RkYpIHtcbiAgICBoYW5kbGUgPSAneCc7XG4gICAgbGVuZ3RoID0gMjtcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPD0gMHhGRkZGKSB7XG4gICAgaGFuZGxlID0gJ3UnO1xuICAgIGxlbmd0aCA9IDQ7XG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyIDw9IDB4RkZGRkZGRkYpIHtcbiAgICBoYW5kbGUgPSAnVSc7XG4gICAgbGVuZ3RoID0gODtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdjb2RlIHBvaW50IHdpdGhpbiBhIHN0cmluZyBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiAweEZGRkZGRkZGJyk7XG4gIH1cblxuICByZXR1cm4gJ1xcXFwnICsgaGFuZGxlICsgY29tbW9uLnJlcGVhdCgnMCcsIGxlbmd0aCAtIHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufVxuXG5cbnZhciBRVU9USU5HX1RZUEVfU0lOR0xFID0gMSxcbiAgICBRVU9USU5HX1RZUEVfRE9VQkxFID0gMjtcblxuZnVuY3Rpb24gU3RhdGUob3B0aW9ucykge1xuICB0aGlzLnNjaGVtYSAgICAgICAgPSBvcHRpb25zWydzY2hlbWEnXSB8fCBfZGVmYXVsdDtcbiAgdGhpcy5pbmRlbnQgICAgICAgID0gTWF0aC5tYXgoMSwgKG9wdGlvbnNbJ2luZGVudCddIHx8IDIpKTtcbiAgdGhpcy5ub0FycmF5SW5kZW50ID0gb3B0aW9uc1snbm9BcnJheUluZGVudCddIHx8IGZhbHNlO1xuICB0aGlzLnNraXBJbnZhbGlkICAgPSBvcHRpb25zWydza2lwSW52YWxpZCddIHx8IGZhbHNlO1xuICB0aGlzLmZsb3dMZXZlbCAgICAgPSAoY29tbW9uLmlzTm90aGluZyhvcHRpb25zWydmbG93TGV2ZWwnXSkgPyAtMSA6IG9wdGlvbnNbJ2Zsb3dMZXZlbCddKTtcbiAgdGhpcy5zdHlsZU1hcCAgICAgID0gY29tcGlsZVN0eWxlTWFwKHRoaXMuc2NoZW1hLCBvcHRpb25zWydzdHlsZXMnXSB8fCBudWxsKTtcbiAgdGhpcy5zb3J0S2V5cyAgICAgID0gb3B0aW9uc1snc29ydEtleXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5saW5lV2lkdGggICAgID0gb3B0aW9uc1snbGluZVdpZHRoJ10gfHwgODA7XG4gIHRoaXMubm9SZWZzICAgICAgICA9IG9wdGlvbnNbJ25vUmVmcyddIHx8IGZhbHNlO1xuICB0aGlzLm5vQ29tcGF0TW9kZSAgPSBvcHRpb25zWydub0NvbXBhdE1vZGUnXSB8fCBmYWxzZTtcbiAgdGhpcy5jb25kZW5zZUZsb3cgID0gb3B0aW9uc1snY29uZGVuc2VGbG93J10gfHwgZmFsc2U7XG4gIHRoaXMucXVvdGluZ1R5cGUgICA9IG9wdGlvbnNbJ3F1b3RpbmdUeXBlJ10gPT09ICdcIicgPyBRVU9USU5HX1RZUEVfRE9VQkxFIDogUVVPVElOR19UWVBFX1NJTkdMRTtcbiAgdGhpcy5mb3JjZVF1b3RlcyAgID0gb3B0aW9uc1snZm9yY2VRdW90ZXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5yZXBsYWNlciAgICAgID0gdHlwZW9mIG9wdGlvbnNbJ3JlcGxhY2VyJ10gPT09ICdmdW5jdGlvbicgPyBvcHRpb25zWydyZXBsYWNlciddIDogbnVsbDtcblxuICB0aGlzLmltcGxpY2l0VHlwZXMgPSB0aGlzLnNjaGVtYS5jb21waWxlZEltcGxpY2l0O1xuICB0aGlzLmV4cGxpY2l0VHlwZXMgPSB0aGlzLnNjaGVtYS5jb21waWxlZEV4cGxpY2l0O1xuXG4gIHRoaXMudGFnID0gbnVsbDtcbiAgdGhpcy5yZXN1bHQgPSAnJztcblxuICB0aGlzLmR1cGxpY2F0ZXMgPSBbXTtcbiAgdGhpcy51c2VkRHVwbGljYXRlcyA9IG51bGw7XG59XG5cbi8vIEluZGVudHMgZXZlcnkgbGluZSBpbiBhIHN0cmluZy4gRW1wdHkgbGluZXMgKFxcbiBvbmx5KSBhcmUgbm90IGluZGVudGVkLlxuZnVuY3Rpb24gaW5kZW50U3RyaW5nKHN0cmluZywgc3BhY2VzKSB7XG4gIHZhciBpbmQgPSBjb21tb24ucmVwZWF0KCcgJywgc3BhY2VzKSxcbiAgICAgIHBvc2l0aW9uID0gMCxcbiAgICAgIG5leHQgPSAtMSxcbiAgICAgIHJlc3VsdCA9ICcnLFxuICAgICAgbGluZSxcbiAgICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKHBvc2l0aW9uIDwgbGVuZ3RoKSB7XG4gICAgbmV4dCA9IHN0cmluZy5pbmRleE9mKCdcXG4nLCBwb3NpdGlvbik7XG4gICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICBsaW5lID0gc3RyaW5nLnNsaWNlKHBvc2l0aW9uKTtcbiAgICAgIHBvc2l0aW9uID0gbGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lID0gc3RyaW5nLnNsaWNlKHBvc2l0aW9uLCBuZXh0ICsgMSk7XG4gICAgICBwb3NpdGlvbiA9IG5leHQgKyAxO1xuICAgIH1cblxuICAgIGlmIChsaW5lLmxlbmd0aCAmJiBsaW5lICE9PSAnXFxuJykgcmVzdWx0ICs9IGluZDtcblxuICAgIHJlc3VsdCArPSBsaW5lO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpIHtcbiAgcmV0dXJuICdcXG4nICsgY29tbW9uLnJlcGVhdCgnICcsIHN0YXRlLmluZGVudCAqIGxldmVsKTtcbn1cblxuZnVuY3Rpb24gdGVzdEltcGxpY2l0UmVzb2x2aW5nKHN0YXRlLCBzdHIpIHtcbiAgdmFyIGluZGV4LCBsZW5ndGgsIHR5cGU7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHN0YXRlLmltcGxpY2l0VHlwZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW2luZGV4XTtcblxuICAgIGlmICh0eXBlLnJlc29sdmUoc3RyKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBbMzNdIHMtd2hpdGUgOjo9IHMtc3BhY2UgfCBzLXRhYlxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGMpIHtcbiAgcmV0dXJuIGMgPT09IENIQVJfU1BBQ0UgfHwgYyA9PT0gQ0hBUl9UQUI7XG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2hhcmFjdGVyIGNhbiBiZSBwcmludGVkIHdpdGhvdXQgZXNjYXBpbmcuXG4vLyBGcm9tIFlBTUwgMS4yOiBcImFueSBhbGxvd2VkIGNoYXJhY3RlcnMga25vd24gdG8gYmUgbm9uLXByaW50YWJsZVxuLy8gc2hvdWxkIGFsc28gYmUgZXNjYXBlZC4gW0hvd2V2ZXIsXSBUaGlzIGlzblx1MjAxOXQgbWFuZGF0b3J5XCJcbi8vIERlcml2ZWQgZnJvbSBuYi1jaGFyIC0gXFx0IC0gI3g4NSAtICN4QTAgLSAjeDIwMjggLSAjeDIwMjkuXG5mdW5jdGlvbiBpc1ByaW50YWJsZShjKSB7XG4gIHJldHVybiAgKDB4MDAwMjAgPD0gYyAmJiBjIDw9IDB4MDAwMDdFKVxuICAgICAgfHwgKCgweDAwMEExIDw9IGMgJiYgYyA8PSAweDAwRDdGRikgJiYgYyAhPT0gMHgyMDI4ICYmIGMgIT09IDB4MjAyOSlcbiAgICAgIHx8ICgoMHgwRTAwMCA8PSBjICYmIGMgPD0gMHgwMEZGRkQpICYmIGMgIT09IENIQVJfQk9NKVxuICAgICAgfHwgICgweDEwMDAwIDw9IGMgJiYgYyA8PSAweDEwRkZGRik7XG59XG5cbi8vIFszNF0gbnMtY2hhciA6Oj0gbmItY2hhciAtIHMtd2hpdGVcbi8vIFsyN10gbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFya1xuLy8gWzI2XSBiLWNoYXIgIDo6PSBiLWxpbmUtZmVlZCB8IGItY2FycmlhZ2UtcmV0dXJuXG4vLyBJbmNsdWRpbmcgcy13aGl0ZSAoZm9yIHNvbWUgcmVhc29uLCBleGFtcGxlcyBkb2Vzbid0IG1hdGNoIHNwZWNzIGluIHRoaXMgYXNwZWN0KVxuLy8gbnMtY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWxpbmUtZmVlZCAtIGItY2FycmlhZ2UtcmV0dXJuIC0gYy1ieXRlLW9yZGVyLW1hcmtcbmZ1bmN0aW9uIGlzTnNDaGFyT3JXaGl0ZXNwYWNlKGMpIHtcbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpXG4gICAgJiYgYyAhPT0gQ0hBUl9CT01cbiAgICAvLyAtIGItY2hhclxuICAgICYmIGMgIT09IENIQVJfQ0FSUklBR0VfUkVUVVJOXG4gICAgJiYgYyAhPT0gQ0hBUl9MSU5FX0ZFRUQ7XG59XG5cbi8vIFsxMjddICBucy1wbGFpbi1zYWZlKGMpIDo6PSBjID0gZmxvdy1vdXQgIFx1MjFEMiBucy1wbGFpbi1zYWZlLW91dFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBmbG93LWluICAgXHUyMUQyIG5zLXBsYWluLXNhZmUtaW5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gYmxvY2sta2V5IFx1MjFEMiBucy1wbGFpbi1zYWZlLW91dFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBmbG93LWtleSAgXHUyMUQyIG5zLXBsYWluLXNhZmUtaW5cbi8vIFsxMjhdIG5zLXBsYWluLXNhZmUtb3V0IDo6PSBucy1jaGFyXG4vLyBbMTI5XSAgbnMtcGxhaW4tc2FmZS1pbiA6Oj0gbnMtY2hhciAtIGMtZmxvdy1pbmRpY2F0b3Jcbi8vIFsxMzBdICBucy1wbGFpbi1jaGFyKGMpIDo6PSAgKCBucy1wbGFpbi1zYWZlKGMpIC0gXHUyMDFDOlx1MjAxRCAtIFx1MjAxQyNcdTIwMUQgKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoIC8qIEFuIG5zLWNoYXIgcHJlY2VkaW5nICovIFx1MjAxQyNcdTIwMUQgKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoIFx1MjAxQzpcdTIwMUQgLyogRm9sbG93ZWQgYnkgYW4gbnMtcGxhaW4tc2FmZShjKSAqLyApXG5mdW5jdGlvbiBpc1BsYWluU2FmZShjLCBwcmV2LCBpbmJsb2NrKSB7XG4gIHZhciBjSXNOc0NoYXJPcldoaXRlc3BhY2UgPSBpc05zQ2hhck9yV2hpdGVzcGFjZShjKTtcbiAgdmFyIGNJc05zQ2hhciA9IGNJc05zQ2hhck9yV2hpdGVzcGFjZSAmJiAhaXNXaGl0ZXNwYWNlKGMpO1xuICByZXR1cm4gKFxuICAgIC8vIG5zLXBsYWluLXNhZmVcbiAgICBpbmJsb2NrID8gLy8gYyA9IGZsb3ctaW5cbiAgICAgIGNJc05zQ2hhck9yV2hpdGVzcGFjZVxuICAgICAgOiBjSXNOc0NoYXJPcldoaXRlc3BhY2VcbiAgICAgICAgLy8gLSBjLWZsb3ctaW5kaWNhdG9yXG4gICAgICAgICYmIGMgIT09IENIQVJfQ09NTUFcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUXG4gICAgICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVRcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUXG4gIClcbiAgICAvLyBucy1wbGFpbi1jaGFyXG4gICAgJiYgYyAhPT0gQ0hBUl9TSEFSUCAvLyBmYWxzZSBvbiAnIydcbiAgICAmJiAhKHByZXYgPT09IENIQVJfQ09MT04gJiYgIWNJc05zQ2hhcikgLy8gZmFsc2Ugb24gJzogJ1xuICAgIHx8IChpc05zQ2hhck9yV2hpdGVzcGFjZShwcmV2KSAmJiAhaXNXaGl0ZXNwYWNlKHByZXYpICYmIGMgPT09IENIQVJfU0hBUlApIC8vIGNoYW5nZSB0byB0cnVlIG9uICdbXiBdIydcbiAgICB8fCAocHJldiA9PT0gQ0hBUl9DT0xPTiAmJiBjSXNOc0NoYXIpOyAvLyBjaGFuZ2UgdG8gdHJ1ZSBvbiAnOlteIF0nXG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlRmlyc3QoYykge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5zLWNoYXIgLSBjLWluZGljYXRvclxuICAvLyB3aGVyZSBucy1jaGFyID0gbmItY2hhciAtIHMtd2hpdGUuXG4gIC8vIE5vIHN1cHBvcnQgb2YgKCAoIFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDLVx1MjAxRCApIC8qIEZvbGxvd2VkIGJ5IGFuIG5zLXBsYWluLXNhZmUoYykpICovICkgcGFydFxuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgYyAhPT0gQ0hBUl9CT01cbiAgICAmJiAhaXNXaGl0ZXNwYWNlKGMpIC8vIC0gcy13aGl0ZVxuICAgIC8vIC0gKGMtaW5kaWNhdG9yIDo6PVxuICAgIC8vIFx1MjAxQy1cdTIwMUQgfCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQyxcdTIwMUQgfCBcdTIwMUNbXHUyMDFEIHwgXHUyMDFDXVx1MjAxRCB8IFx1MjAxQ3tcdTIwMUQgfCBcdTIwMUN9XHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9NSU5VU1xuICAgICYmIGMgIT09IENIQVJfUVVFU1RJT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTE9OXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIHwgXHUyMDFDI1x1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ3xcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDPlx1MjAxRCB8IFx1MjAxQydcdTIwMUQgfCBcdTIwMUNcIlx1MjAxRFxuICAgICYmIGMgIT09IENIQVJfU0hBUlBcbiAgICAmJiBjICE9PSBDSEFSX0FNUEVSU0FORFxuICAgICYmIGMgIT09IENIQVJfQVNURVJJU0tcbiAgICAmJiBjICE9PSBDSEFSX0VYQ0xBTUFUSU9OXG4gICAgJiYgYyAhPT0gQ0hBUl9WRVJUSUNBTF9MSU5FXG4gICAgJiYgYyAhPT0gQ0hBUl9FUVVBTFNcbiAgICAmJiBjICE9PSBDSEFSX0dSRUFURVJfVEhBTlxuICAgICYmIGMgIT09IENIQVJfU0lOR0xFX1FVT1RFXG4gICAgJiYgYyAhPT0gQ0hBUl9ET1VCTEVfUVVPVEVcbiAgICAvLyB8IFx1MjAxQyVcdTIwMUQgfCBcdTIwMUNAXHUyMDFEIHwgXHUyMDFDYFx1MjAxRClcbiAgICAmJiBjICE9PSBDSEFSX1BFUkNFTlRcbiAgICAmJiBjICE9PSBDSEFSX0NPTU1FUkNJQUxfQVRcbiAgICAmJiBjICE9PSBDSEFSX0dSQVZFX0FDQ0VOVDtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhcyB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gcGxhaW4gc3R5bGUuXG5mdW5jdGlvbiBpc1BsYWluU2FmZUxhc3QoYykge1xuICAvLyBqdXN0IG5vdCB3aGl0ZXNwYWNlIG9yIGNvbG9uLCBpdCB3aWxsIGJlIGNoZWNrZWQgdG8gYmUgcGxhaW4gY2hhcmFjdGVyIGxhdGVyXG4gIHJldHVybiAhaXNXaGl0ZXNwYWNlKGMpICYmIGMgIT09IENIQVJfQ09MT047XG59XG5cbi8vIFNhbWUgYXMgJ3N0cmluZycuY29kZVBvaW50QXQocG9zKSwgYnV0IHdvcmtzIGluIG9sZGVyIGJyb3dzZXJzLlxuZnVuY3Rpb24gY29kZVBvaW50QXQoc3RyaW5nLCBwb3MpIHtcbiAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQocG9zKSwgc2Vjb25kO1xuICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBwb3MgKyAxIDwgc3RyaW5nLmxlbmd0aCkge1xuICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KHBvcyArIDEpO1xuICAgIGlmIChzZWNvbmQgPj0gMHhEQzAwICYmIHNlY29uZCA8PSAweERGRkYpIHtcbiAgICAgIC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgfVxuICB9XG4gIHJldHVybiBmaXJzdDtcbn1cblxuLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBpcyByZXF1aXJlZC5cbmZ1bmN0aW9uIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSB7XG4gIHZhciBsZWFkaW5nU3BhY2VSZSA9IC9eXFxuKiAvO1xuICByZXR1cm4gbGVhZGluZ1NwYWNlUmUudGVzdChzdHJpbmcpO1xufVxuXG52YXIgU1RZTEVfUExBSU4gICA9IDEsXG4gICAgU1RZTEVfU0lOR0xFICA9IDIsXG4gICAgU1RZTEVfTElURVJBTCA9IDMsXG4gICAgU1RZTEVfRk9MREVEICA9IDQsXG4gICAgU1RZTEVfRE9VQkxFICA9IDU7XG5cbi8vIERldGVybWluZXMgd2hpY2ggc2NhbGFyIHN0eWxlcyBhcmUgcG9zc2libGUgYW5kIHJldHVybnMgdGhlIHByZWZlcnJlZCBzdHlsZS5cbi8vIGxpbmVXaWR0aCA9IC0xID0+IG5vIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0ci5sZW5ndGggPiAwLlxuLy8gUG9zdC1jb25kaXRpb25zOlxuLy8gICAgU1RZTEVfUExBSU4gb3IgU1RZTEVfU0lOR0xFID0+IG5vIFxcbiBhcmUgaW4gdGhlIHN0cmluZy5cbi8vICAgIFNUWUxFX0xJVEVSQUwgPT4gbm8gbGluZXMgYXJlIHN1aXRhYmxlIGZvciBmb2xkaW5nIChvciBsaW5lV2lkdGggaXMgLTEpLlxuLy8gICAgU1RZTEVfRk9MREVEID0+IGEgbGluZSA+IGxpbmVXaWR0aCBhbmQgY2FuIGJlIGZvbGRlZCAoYW5kIGxpbmVXaWR0aCAhPSAtMSkuXG5mdW5jdGlvbiBjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBpbmRlbnRQZXJMZXZlbCwgbGluZVdpZHRoLFxuICB0ZXN0QW1iaWd1b3VzVHlwZSwgcXVvdGluZ1R5cGUsIGZvcmNlUXVvdGVzLCBpbmJsb2NrKSB7XG5cbiAgdmFyIGk7XG4gIHZhciBjaGFyID0gMDtcbiAgdmFyIHByZXZDaGFyID0gbnVsbDtcbiAgdmFyIGhhc0xpbmVCcmVhayA9IGZhbHNlO1xuICB2YXIgaGFzRm9sZGFibGVMaW5lID0gZmFsc2U7IC8vIG9ubHkgY2hlY2tlZCBpZiBzaG91bGRUcmFja1dpZHRoXG4gIHZhciBzaG91bGRUcmFja1dpZHRoID0gbGluZVdpZHRoICE9PSAtMTtcbiAgdmFyIHByZXZpb3VzTGluZUJyZWFrID0gLTE7IC8vIGNvdW50IHRoZSBmaXJzdCBsaW5lIGNvcnJlY3RseVxuICB2YXIgcGxhaW4gPSBpc1BsYWluU2FmZUZpcnN0KGNvZGVQb2ludEF0KHN0cmluZywgMCkpXG4gICAgICAgICAgJiYgaXNQbGFpblNhZmVMYXN0KGNvZGVQb2ludEF0KHN0cmluZywgc3RyaW5nLmxlbmd0aCAtIDEpKTtcblxuICBpZiAoc2luZ2xlTGluZU9ubHkgfHwgZm9yY2VRdW90ZXMpIHtcbiAgICAvLyBDYXNlOiBubyBibG9jayBzdHlsZXMuXG4gICAgLy8gQ2hlY2sgZm9yIGRpc2FsbG93ZWQgY2hhcmFjdGVycyB0byBydWxlIG91dCBwbGFpbiBhbmQgc2luZ2xlLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBjaGFyID49IDB4MTAwMDAgPyBpICs9IDIgOiBpKyspIHtcbiAgICAgIGNoYXIgPSBjb2RlUG9pbnRBdChzdHJpbmcsIGkpO1xuICAgICAgaWYgKCFpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICAgICAgfVxuICAgICAgcGxhaW4gPSBwbGFpbiAmJiBpc1BsYWluU2FmZShjaGFyLCBwcmV2Q2hhciwgaW5ibG9jayk7XG4gICAgICBwcmV2Q2hhciA9IGNoYXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIENhc2U6IGJsb2NrIHN0eWxlcyBwZXJtaXR0ZWQuXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGNoYXIgPj0gMHgxMDAwMCA/IGkgKz0gMiA6IGkrKykge1xuICAgICAgY2hhciA9IGNvZGVQb2ludEF0KHN0cmluZywgaSk7XG4gICAgICBpZiAoY2hhciA9PT0gQ0hBUl9MSU5FX0ZFRUQpIHtcbiAgICAgICAgaGFzTGluZUJyZWFrID0gdHJ1ZTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGxpbmUgY2FuIGJlIGZvbGRlZC5cbiAgICAgICAgaWYgKHNob3VsZFRyYWNrV2lkdGgpIHtcbiAgICAgICAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHxcbiAgICAgICAgICAgIC8vIEZvbGRhYmxlIGxpbmUgPSB0b28gbG9uZywgYW5kIG5vdCBtb3JlLWluZGVudGVkLlxuICAgICAgICAgICAgKGkgLSBwcmV2aW91c0xpbmVCcmVhayAtIDEgPiBsaW5lV2lkdGggJiZcbiAgICAgICAgICAgICBzdHJpbmdbcHJldmlvdXNMaW5lQnJlYWsgKyAxXSAhPT0gJyAnKTtcbiAgICAgICAgICBwcmV2aW91c0xpbmVCcmVhayA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gICAgICB9XG4gICAgICBwbGFpbiA9IHBsYWluICYmIGlzUGxhaW5TYWZlKGNoYXIsIHByZXZDaGFyLCBpbmJsb2NrKTtcbiAgICAgIHByZXZDaGFyID0gY2hhcjtcbiAgICB9XG4gICAgLy8gaW4gY2FzZSB0aGUgZW5kIGlzIG1pc3NpbmcgYSBcXG5cbiAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHwgKHNob3VsZFRyYWNrV2lkdGggJiZcbiAgICAgIChpIC0gcHJldmlvdXNMaW5lQnJlYWsgLSAxID4gbGluZVdpZHRoICYmXG4gICAgICAgc3RyaW5nW3ByZXZpb3VzTGluZUJyZWFrICsgMV0gIT09ICcgJykpO1xuICB9XG4gIC8vIEFsdGhvdWdoIGV2ZXJ5IHN0eWxlIGNhbiByZXByZXNlbnQgXFxuIHdpdGhvdXQgZXNjYXBpbmcsIHByZWZlciBibG9jayBzdHlsZXNcbiAgLy8gZm9yIG11bHRpbGluZSwgc2luY2UgdGhleSdyZSBtb3JlIHJlYWRhYmxlIGFuZCB0aGV5IGRvbid0IGFkZCBlbXB0eSBsaW5lcy5cbiAgLy8gQWxzbyBwcmVmZXIgZm9sZGluZyBhIHN1cGVyLWxvbmcgbGluZS5cbiAgaWYgKCFoYXNMaW5lQnJlYWsgJiYgIWhhc0ZvbGRhYmxlTGluZSkge1xuICAgIC8vIFN0cmluZ3MgaW50ZXJwcmV0YWJsZSBhcyBhbm90aGVyIHR5cGUgaGF2ZSB0byBiZSBxdW90ZWQ7XG4gICAgLy8gZS5nLiB0aGUgc3RyaW5nICd0cnVlJyB2cy4gdGhlIGJvb2xlYW4gdHJ1ZS5cbiAgICBpZiAocGxhaW4gJiYgIWZvcmNlUXVvdGVzICYmICF0ZXN0QW1iaWd1b3VzVHlwZShzdHJpbmcpKSB7XG4gICAgICByZXR1cm4gU1RZTEVfUExBSU47XG4gICAgfVxuICAgIHJldHVybiBxdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/IFNUWUxFX0RPVUJMRSA6IFNUWUxFX1NJTkdMRTtcbiAgfVxuICAvLyBFZGdlIGNhc2U6IGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBjYW4gb25seSBoYXZlIG9uZSBkaWdpdC5cbiAgaWYgKGluZGVudFBlckxldmVsID4gOSAmJiBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykpIHtcbiAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICB9XG4gIC8vIEF0IHRoaXMgcG9pbnQgd2Uga25vdyBibG9jayBzdHlsZXMgYXJlIHZhbGlkLlxuICAvLyBQcmVmZXIgbGl0ZXJhbCBzdHlsZSB1bmxlc3Mgd2Ugd2FudCB0byBmb2xkLlxuICBpZiAoIWZvcmNlUXVvdGVzKSB7XG4gICAgcmV0dXJuIGhhc0ZvbGRhYmxlTGluZSA/IFNUWUxFX0ZPTERFRCA6IFNUWUxFX0xJVEVSQUw7XG4gIH1cbiAgcmV0dXJuIHF1b3RpbmdUeXBlID09PSBRVU9USU5HX1RZUEVfRE9VQkxFID8gU1RZTEVfRE9VQkxFIDogU1RZTEVfU0lOR0xFO1xufVxuXG4vLyBOb3RlOiBsaW5lIGJyZWFraW5nL2ZvbGRpbmcgaXMgaW1wbGVtZW50ZWQgZm9yIG9ubHkgdGhlIGZvbGRlZCBzdHlsZS5cbi8vIE5CLiBXZSBkcm9wIHRoZSBsYXN0IHRyYWlsaW5nIG5ld2xpbmUgKGlmIGFueSkgb2YgYSByZXR1cm5lZCBibG9jayBzY2FsYXJcbi8vICBzaW5jZSB0aGUgZHVtcGVyIGFkZHMgaXRzIG93biBuZXdsaW5lLiBUaGlzIGFsd2F5cyB3b3Jrczpcbi8vICAgIFx1MjAyMiBObyBlbmRpbmcgbmV3bGluZSA9PiB1bmFmZmVjdGVkOyBhbHJlYWR5IHVzaW5nIHN0cmlwIFwiLVwiIGNob21waW5nLlxuLy8gICAgXHUyMDIyIEVuZGluZyBuZXdsaW5lICAgID0+IHJlbW92ZWQgdGhlbiByZXN0b3JlZC5cbi8vICBJbXBvcnRhbnRseSwgdGhpcyBrZWVwcyB0aGUgXCIrXCIgY2hvbXAgaW5kaWNhdG9yIGZyb20gZ2FpbmluZyBhbiBleHRyYSBsaW5lLlxuZnVuY3Rpb24gd3JpdGVTY2FsYXIoc3RhdGUsIHN0cmluZywgbGV2ZWwsIGlza2V5LCBpbmJsb2NrKSB7XG4gIHN0YXRlLmR1bXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gc3RhdGUucXVvdGluZ1R5cGUgPT09IFFVT1RJTkdfVFlQRV9ET1VCTEUgPyAnXCJcIicgOiBcIicnXCI7XG4gICAgfVxuICAgIGlmICghc3RhdGUubm9Db21wYXRNb2RlKSB7XG4gICAgICBpZiAoREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVguaW5kZXhPZihzdHJpbmcpICE9PSAtMSB8fCBERVBSRUNBVEVEX0JBU0U2MF9TWU5UQVgudGVzdChzdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5xdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/ICgnXCInICsgc3RyaW5nICsgJ1wiJykgOiAoXCInXCIgKyBzdHJpbmcgKyBcIidcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGluZGVudCA9IHN0YXRlLmluZGVudCAqIE1hdGgubWF4KDEsIGxldmVsKTsgLy8gbm8gMC1pbmRlbnQgc2NhbGFyc1xuICAgIC8vIEFzIGluZGVudGF0aW9uIGdldHMgZGVlcGVyLCBsZXQgdGhlIHdpZHRoIGRlY3JlYXNlIG1vbm90b25pY2FsbHlcbiAgICAvLyB0byB0aGUgbG93ZXIgYm91bmQgbWluKHN0YXRlLmxpbmVXaWR0aCwgNDApLlxuICAgIC8vIE5vdGUgdGhhdCB0aGlzIGltcGxpZXNcbiAgICAvLyAgc3RhdGUubGluZVdpZHRoIFx1MjI2NCA0MCArIHN0YXRlLmluZGVudDogd2lkdGggaXMgZml4ZWQgYXQgdGhlIGxvd2VyIGJvdW5kLlxuICAgIC8vICBzdGF0ZS5saW5lV2lkdGggPiA0MCArIHN0YXRlLmluZGVudDogd2lkdGggZGVjcmVhc2VzIHVudGlsIHRoZSBsb3dlciBib3VuZC5cbiAgICAvLyBUaGlzIGJlaGF2ZXMgYmV0dGVyIHRoYW4gYSBjb25zdGFudCBtaW5pbXVtIHdpZHRoIHdoaWNoIGRpc2FsbG93cyBuYXJyb3dlciBvcHRpb25zLFxuICAgIC8vIG9yIGFuIGluZGVudCB0aHJlc2hvbGQgd2hpY2ggY2F1c2VzIHRoZSB3aWR0aCB0byBzdWRkZW5seSBpbmNyZWFzZS5cbiAgICB2YXIgbGluZVdpZHRoID0gc3RhdGUubGluZVdpZHRoID09PSAtMVxuICAgICAgPyAtMSA6IE1hdGgubWF4KE1hdGgubWluKHN0YXRlLmxpbmVXaWR0aCwgNDApLCBzdGF0ZS5saW5lV2lkdGggLSBpbmRlbnQpO1xuXG4gICAgLy8gV2l0aG91dCBrbm93aW5nIGlmIGtleXMgYXJlIGltcGxpY2l0L2V4cGxpY2l0LCBhc3N1bWUgaW1wbGljaXQgZm9yIHNhZmV0eS5cbiAgICB2YXIgc2luZ2xlTGluZU9ubHkgPSBpc2tleVxuICAgICAgLy8gTm8gYmxvY2sgc3R5bGVzIGluIGZsb3cgbW9kZS5cbiAgICAgIHx8IChzdGF0ZS5mbG93TGV2ZWwgPiAtMSAmJiBsZXZlbCA+PSBzdGF0ZS5mbG93TGV2ZWwpO1xuICAgIGZ1bmN0aW9uIHRlc3RBbWJpZ3VpdHkoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGVzdEltcGxpY2l0UmVzb2x2aW5nKHN0YXRlLCBzdHJpbmcpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY2hvb3NlU2NhbGFyU3R5bGUoc3RyaW5nLCBzaW5nbGVMaW5lT25seSwgc3RhdGUuaW5kZW50LCBsaW5lV2lkdGgsXG4gICAgICB0ZXN0QW1iaWd1aXR5LCBzdGF0ZS5xdW90aW5nVHlwZSwgc3RhdGUuZm9yY2VRdW90ZXMgJiYgIWlza2V5LCBpbmJsb2NrKSkge1xuXG4gICAgICBjYXNlIFNUWUxFX1BMQUlOOlxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgY2FzZSBTVFlMRV9TSU5HTEU6XG4gICAgICAgIHJldHVybiBcIidcIiArIHN0cmluZy5yZXBsYWNlKC8nL2csIFwiJydcIikgKyBcIidcIjtcbiAgICAgIGNhc2UgU1RZTEVfTElURVJBTDpcbiAgICAgICAgcmV0dXJuICd8JyArIGJsb2NrSGVhZGVyKHN0cmluZywgc3RhdGUuaW5kZW50KVxuICAgICAgICAgICsgZHJvcEVuZGluZ05ld2xpbmUoaW5kZW50U3RyaW5nKHN0cmluZywgaW5kZW50KSk7XG4gICAgICBjYXNlIFNUWUxFX0ZPTERFRDpcbiAgICAgICAgcmV0dXJuICc+JyArIGJsb2NrSGVhZGVyKHN0cmluZywgc3RhdGUuaW5kZW50KVxuICAgICAgICAgICsgZHJvcEVuZGluZ05ld2xpbmUoaW5kZW50U3RyaW5nKGZvbGRTdHJpbmcoc3RyaW5nLCBsaW5lV2lkdGgpLCBpbmRlbnQpKTtcbiAgICAgIGNhc2UgU1RZTEVfRE9VQkxFOlxuICAgICAgICByZXR1cm4gJ1wiJyArIGVzY2FwZVN0cmluZyhzdHJpbmcpICsgJ1wiJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ2ltcG9zc2libGUgZXJyb3I6IGludmFsaWQgc2NhbGFyIHN0eWxlJyk7XG4gICAgfVxuICB9KCkpO1xufVxuXG4vLyBQcmUtY29uZGl0aW9uczogc3RyaW5nIGlzIHZhbGlkIGZvciBhIGJsb2NrIHNjYWxhciwgMSA8PSBpbmRlbnRQZXJMZXZlbCA8PSA5LlxuZnVuY3Rpb24gYmxvY2tIZWFkZXIoc3RyaW5nLCBpbmRlbnRQZXJMZXZlbCkge1xuICB2YXIgaW5kZW50SW5kaWNhdG9yID0gbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpID8gU3RyaW5nKGluZGVudFBlckxldmVsKSA6ICcnO1xuXG4gIC8vIG5vdGUgdGhlIHNwZWNpYWwgY2FzZTogdGhlIHN0cmluZyAnXFxuJyBjb3VudHMgYXMgYSBcInRyYWlsaW5nXCIgZW1wdHkgbGluZS5cbiAgdmFyIGNsaXAgPSAgICAgICAgICBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJztcbiAgdmFyIGtlZXAgPSBjbGlwICYmIChzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDJdID09PSAnXFxuJyB8fCBzdHJpbmcgPT09ICdcXG4nKTtcbiAgdmFyIGNob21wID0ga2VlcCA/ICcrJyA6IChjbGlwID8gJycgOiAnLScpO1xuXG4gIHJldHVybiBpbmRlbnRJbmRpY2F0b3IgKyBjaG9tcCArICdcXG4nO1xufVxuXG4vLyAoU2VlIHRoZSBub3RlIGZvciB3cml0ZVNjYWxhci4pXG5mdW5jdGlvbiBkcm9wRW5kaW5nTmV3bGluZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdcXG4nID8gc3RyaW5nLnNsaWNlKDAsIC0xKSA6IHN0cmluZztcbn1cblxuLy8gTm90ZTogYSBsb25nIGxpbmUgd2l0aG91dCBhIHN1aXRhYmxlIGJyZWFrIHBvaW50IHdpbGwgZXhjZWVkIHRoZSB3aWR0aCBsaW1pdC5cbi8vIFByZS1jb25kaXRpb25zOiBldmVyeSBjaGFyIGluIHN0ciBpc1ByaW50YWJsZSwgc3RyLmxlbmd0aCA+IDAsIHdpZHRoID4gMC5cbmZ1bmN0aW9uIGZvbGRTdHJpbmcoc3RyaW5nLCB3aWR0aCkge1xuICAvLyBJbiBmb2xkZWQgc3R5bGUsICRrJCBjb25zZWN1dGl2ZSBuZXdsaW5lcyBvdXRwdXQgYXMgJGsrMSQgbmV3bGluZXNcdTIwMTRcbiAgLy8gdW5sZXNzIHRoZXkncmUgYmVmb3JlIG9yIGFmdGVyIGEgbW9yZS1pbmRlbnRlZCBsaW5lLCBvciBhdCB0aGUgdmVyeVxuICAvLyBiZWdpbm5pbmcgb3IgZW5kLCBpbiB3aGljaCBjYXNlICRrJCBtYXBzIHRvICRrJC5cbiAgLy8gVGhlcmVmb3JlLCBwYXJzZSBlYWNoIGNodW5rIGFzIG5ld2xpbmUocykgZm9sbG93ZWQgYnkgYSBjb250ZW50IGxpbmUuXG4gIHZhciBsaW5lUmUgPSAvKFxcbispKFteXFxuXSopL2c7XG5cbiAgLy8gZmlyc3QgbGluZSAocG9zc2libHkgYW4gZW1wdHkgbGluZSlcbiAgdmFyIHJlc3VsdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5leHRMRiA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcbiAgICBuZXh0TEYgPSBuZXh0TEYgIT09IC0xID8gbmV4dExGIDogc3RyaW5nLmxlbmd0aDtcbiAgICBsaW5lUmUubGFzdEluZGV4ID0gbmV4dExGO1xuICAgIHJldHVybiBmb2xkTGluZShzdHJpbmcuc2xpY2UoMCwgbmV4dExGKSwgd2lkdGgpO1xuICB9KCkpO1xuICAvLyBJZiB3ZSBoYXZlbid0IHJlYWNoZWQgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSB5ZXQsIGRvbid0IGFkZCBhbiBleHRyYSBcXG4uXG4gIHZhciBwcmV2TW9yZUluZGVudGVkID0gc3RyaW5nWzBdID09PSAnXFxuJyB8fCBzdHJpbmdbMF0gPT09ICcgJztcbiAgdmFyIG1vcmVJbmRlbnRlZDtcblxuICAvLyByZXN0IG9mIHRoZSBsaW5lc1xuICB2YXIgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBsaW5lUmUuZXhlYyhzdHJpbmcpKSkge1xuICAgIHZhciBwcmVmaXggPSBtYXRjaFsxXSwgbGluZSA9IG1hdGNoWzJdO1xuICAgIG1vcmVJbmRlbnRlZCA9IChsaW5lWzBdID09PSAnICcpO1xuICAgIHJlc3VsdCArPSBwcmVmaXhcbiAgICAgICsgKCFwcmV2TW9yZUluZGVudGVkICYmICFtb3JlSW5kZW50ZWQgJiYgbGluZSAhPT0gJydcbiAgICAgICAgPyAnXFxuJyA6ICcnKVxuICAgICAgKyBmb2xkTGluZShsaW5lLCB3aWR0aCk7XG4gICAgcHJldk1vcmVJbmRlbnRlZCA9IG1vcmVJbmRlbnRlZDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdyZWVkeSBsaW5lIGJyZWFraW5nLlxuLy8gUGlja3MgdGhlIGxvbmdlc3QgbGluZSB1bmRlciB0aGUgbGltaXQgZWFjaCB0aW1lLFxuLy8gb3RoZXJ3aXNlIHNldHRsZXMgZm9yIHRoZSBzaG9ydGVzdCBsaW5lIG92ZXIgdGhlIGxpbWl0LlxuLy8gTkIuIE1vcmUtaW5kZW50ZWQgbGluZXMgKmNhbm5vdCogYmUgZm9sZGVkLCBhcyB0aGF0IHdvdWxkIGFkZCBhbiBleHRyYSBcXG4uXG5mdW5jdGlvbiBmb2xkTGluZShsaW5lLCB3aWR0aCkge1xuICBpZiAobGluZSA9PT0gJycgfHwgbGluZVswXSA9PT0gJyAnKSByZXR1cm4gbGluZTtcblxuICAvLyBTaW5jZSBhIG1vcmUtaW5kZW50ZWQgbGluZSBhZGRzIGEgXFxuLCBicmVha3MgY2FuJ3QgYmUgZm9sbG93ZWQgYnkgYSBzcGFjZS5cbiAgdmFyIGJyZWFrUmUgPSAvIFteIF0vZzsgLy8gbm90ZTogdGhlIG1hdGNoIGluZGV4IHdpbGwgYWx3YXlzIGJlIDw9IGxlbmd0aC0yLlxuICB2YXIgbWF0Y2g7XG4gIC8vIHN0YXJ0IGlzIGFuIGluY2x1c2l2ZSBpbmRleC4gZW5kLCBjdXJyLCBhbmQgbmV4dCBhcmUgZXhjbHVzaXZlLlxuICB2YXIgc3RhcnQgPSAwLCBlbmQsIGN1cnIgPSAwLCBuZXh0ID0gMDtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gIC8vIEludmFyaWFudHM6IDAgPD0gc3RhcnQgPD0gbGVuZ3RoLTEuXG4gIC8vICAgMCA8PSBjdXJyIDw9IG5leHQgPD0gbWF4KDAsIGxlbmd0aC0yKS4gY3VyciAtIHN0YXJ0IDw9IHdpZHRoLlxuICAvLyBJbnNpZGUgdGhlIGxvb3A6XG4gIC8vICAgQSBtYXRjaCBpbXBsaWVzIGxlbmd0aCA+PSAyLCBzbyBjdXJyIGFuZCBuZXh0IGFyZSA8PSBsZW5ndGgtMi5cbiAgd2hpbGUgKChtYXRjaCA9IGJyZWFrUmUuZXhlYyhsaW5lKSkpIHtcbiAgICBuZXh0ID0gbWF0Y2guaW5kZXg7XG4gICAgLy8gbWFpbnRhaW4gaW52YXJpYW50OiBjdXJyIC0gc3RhcnQgPD0gd2lkdGhcbiAgICBpZiAobmV4dCAtIHN0YXJ0ID4gd2lkdGgpIHtcbiAgICAgIGVuZCA9IChjdXJyID4gc3RhcnQpID8gY3VyciA6IG5leHQ7IC8vIGRlcml2ZSBlbmQgPD0gbGVuZ3RoLTJcbiAgICAgIHJlc3VsdCArPSAnXFxuJyArIGxpbmUuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAvLyBza2lwIHRoZSBzcGFjZSB0aGF0IHdhcyBvdXRwdXQgYXMgXFxuXG4gICAgICBzdGFydCA9IGVuZCArIDE7ICAgICAgICAgICAgICAgICAgICAvLyBkZXJpdmUgc3RhcnQgPD0gbGVuZ3RoLTFcbiAgICB9XG4gICAgY3VyciA9IG5leHQ7XG4gIH1cblxuICAvLyBCeSB0aGUgaW52YXJpYW50cywgc3RhcnQgPD0gbGVuZ3RoLTEsIHNvIHRoZXJlIGlzIHNvbWV0aGluZyBsZWZ0IG92ZXIuXG4gIC8vIEl0IGlzIGVpdGhlciB0aGUgd2hvbGUgc3RyaW5nIG9yIGEgcGFydCBzdGFydGluZyBmcm9tIG5vbi13aGl0ZXNwYWNlLlxuICByZXN1bHQgKz0gJ1xcbic7XG4gIC8vIEluc2VydCBhIGJyZWFrIGlmIHRoZSByZW1haW5kZXIgaXMgdG9vIGxvbmcgYW5kIHRoZXJlIGlzIGEgYnJlYWsgYXZhaWxhYmxlLlxuICBpZiAobGluZS5sZW5ndGggLSBzdGFydCA+IHdpZHRoICYmIGN1cnIgPiBzdGFydCkge1xuICAgIHJlc3VsdCArPSBsaW5lLnNsaWNlKHN0YXJ0LCBjdXJyKSArICdcXG4nICsgbGluZS5zbGljZShjdXJyICsgMSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGxpbmUuc2xpY2Uoc3RhcnQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5zbGljZSgxKTsgLy8gZHJvcCBleHRyYSBcXG4gam9pbmVyXG59XG5cbi8vIEVzY2FwZXMgYSBkb3VibGUtcXVvdGVkIHN0cmluZy5cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyhzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgY2hhciA9IDA7XG4gIHZhciBlc2NhcGVTZXE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBjaGFyID49IDB4MTAwMDAgPyBpICs9IDIgOiBpKyspIHtcbiAgICBjaGFyID0gY29kZVBvaW50QXQoc3RyaW5nLCBpKTtcbiAgICBlc2NhcGVTZXEgPSBFU0NBUEVfU0VRVUVOQ0VTW2NoYXJdO1xuXG4gICAgaWYgKCFlc2NhcGVTZXEgJiYgaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdbaV07XG4gICAgICBpZiAoY2hhciA+PSAweDEwMDAwKSByZXN1bHQgKz0gc3RyaW5nW2kgKyAxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9IGVzY2FwZVNlcSB8fCBlbmNvZGVIZXgoY2hhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIHZhbHVlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHZhbHVlID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgICAgdmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKG9iamVjdCwgU3RyaW5nKGluZGV4KSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFdyaXRlIG9ubHkgdmFsaWQgZWxlbWVudHMsIHB1dCBudWxsIGluc3RlYWQgb2YgaW52YWxpZCBlbGVtZW50cy5cbiAgICBpZiAod3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgdmFsdWUsIGZhbHNlLCBmYWxzZSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG51bGwsIGZhbHNlLCBmYWxzZSkpKSB7XG5cbiAgICAgIGlmIChfcmVzdWx0ICE9PSAnJykgX3Jlc3VsdCArPSAnLCcgKyAoIXN0YXRlLmNvbmRlbnNlRmxvdyA/ICcgJyA6ICcnKTtcbiAgICAgIF9yZXN1bHQgKz0gc3RhdGUuZHVtcDtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gJ1snICsgX3Jlc3VsdCArICddJztcbn1cblxuZnVuY3Rpb24gd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ID0gJycsXG4gICAgICBfdGFnICAgID0gc3RhdGUudGFnLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICB2YWx1ZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB2YWx1ZSA9IG9iamVjdFtpbmRleF07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIHZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIFN0cmluZyhpbmRleCksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLCBwdXQgbnVsbCBpbnN0ZWFkIG9mIGludmFsaWQgZWxlbWVudHMuXG4gICAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCB2YWx1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgbnVsbCwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUpKSkge1xuXG4gICAgICBpZiAoIWNvbXBhY3QgfHwgX3Jlc3VsdCAhPT0gJycpIHtcbiAgICAgICAgX3Jlc3VsdCArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgX3Jlc3VsdCArPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfcmVzdWx0ICs9ICctICc7XG4gICAgICB9XG5cbiAgICAgIF9yZXN1bHQgKz0gc3RhdGUuZHVtcDtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gX3Jlc3VsdCB8fCAnW10nOyAvLyBFbXB0eSBzZXF1ZW5jZSBpZiBubyB2YWxpZCB2YWx1ZXMuXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvd01hcHBpbmcoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgICAgICAgPSAnJyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgb2JqZWN0S2V5LFxuICAgICAgb2JqZWN0VmFsdWUsXG4gICAgICBwYWlyQnVmZmVyO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcblxuICAgIHBhaXJCdWZmZXIgPSAnJztcbiAgICBpZiAoX3Jlc3VsdCAhPT0gJycpIHBhaXJCdWZmZXIgKz0gJywgJztcblxuICAgIGlmIChzdGF0ZS5jb25kZW5zZUZsb3cpIHBhaXJCdWZmZXIgKz0gJ1wiJztcblxuICAgIG9iamVjdEtleSA9IG9iamVjdEtleUxpc3RbaW5kZXhdO1xuICAgIG9iamVjdFZhbHVlID0gb2JqZWN0W29iamVjdEtleV07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIG9iamVjdFZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIG9iamVjdEtleSwgb2JqZWN0VmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0S2V5LCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KSBwYWlyQnVmZmVyICs9ICc/ICc7XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXAgKyAoc3RhdGUuY29uZGVuc2VGbG93ID8gJ1wiJyA6ICcnKSArICc6JyArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnJyA6ICcgJyk7XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdFZhbHVlLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICd7JyArIF9yZXN1bHQgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgZXhwbGljaXRQYWlyLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICAvLyBBbGxvdyBzb3J0aW5nIGtleXMgc28gdGhhdCB0aGUgb3V0cHV0IGZpbGUgaXMgZGV0ZXJtaW5pc3RpY1xuICBpZiAoc3RhdGUuc29ydEtleXMgPT09IHRydWUpIHtcbiAgICAvLyBEZWZhdWx0IHNvcnRpbmdcbiAgICBvYmplY3RLZXlMaXN0LnNvcnQoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhdGUuc29ydEtleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDdXN0b20gc29ydCBmdW5jdGlvblxuICAgIG9iamVjdEtleUxpc3Quc29ydChzdGF0ZS5zb3J0S2V5cyk7XG4gIH0gZWxzZSBpZiAoc3RhdGUuc29ydEtleXMpIHtcbiAgICAvLyBTb21ldGhpbmcgaXMgd3JvbmdcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdzb3J0S2V5cyBtdXN0IGJlIGEgYm9vbGVhbiBvciBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuXG4gICAgaWYgKCFjb21wYWN0IHx8IF9yZXN1bHQgIT09ICcnKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgICBvYmplY3RWYWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwob2JqZWN0LCBvYmplY3RLZXksIG9iamVjdFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RLZXksIHRydWUsIHRydWUsIHRydWUpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleS5cbiAgICB9XG5cbiAgICBleHBsaWNpdFBhaXIgPSAoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB8fFxuICAgICAgICAgICAgICAgICAgIChzdGF0ZS5kdW1wICYmIHN0YXRlLmR1bXAubGVuZ3RoID4gMTAyNCk7XG5cbiAgICBpZiAoZXhwbGljaXRQYWlyKSB7XG4gICAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIHBhaXJCdWZmZXIgKz0gJz8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFpckJ1ZmZlciArPSAnPyAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIGlmIChleHBsaWNpdFBhaXIpIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgIH1cblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG9iamVjdFZhbHVlLCB0cnVlLCBleHBsaWNpdFBhaXIpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gJzonO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWlyQnVmZmVyICs9ICc6ICc7XG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgLy8gQm90aCBrZXkgYW5kIHZhbHVlIGFyZSB2YWxpZC5cbiAgICBfcmVzdWx0ICs9IHBhaXJCdWZmZXI7XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gX3Jlc3VsdCB8fCAne30nOyAvLyBFbXB0eSBtYXBwaW5nIGlmIG5vIHZhbGlkIHBhaXJzLlxufVxuXG5mdW5jdGlvbiBkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIGV4cGxpY2l0KSB7XG4gIHZhciBfcmVzdWx0LCB0eXBlTGlzdCwgaW5kZXgsIGxlbmd0aCwgdHlwZSwgc3R5bGU7XG5cbiAgdHlwZUxpc3QgPSBleHBsaWNpdCA/IHN0YXRlLmV4cGxpY2l0VHlwZXMgOiBzdGF0ZS5pbXBsaWNpdFR5cGVzO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0eXBlTGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdHlwZSA9IHR5cGVMaXN0W2luZGV4XTtcblxuICAgIGlmICgodHlwZS5pbnN0YW5jZU9mICB8fCB0eXBlLnByZWRpY2F0ZSkgJiZcbiAgICAgICAgKCF0eXBlLmluc3RhbmNlT2YgfHwgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgKG9iamVjdCBpbnN0YW5jZW9mIHR5cGUuaW5zdGFuY2VPZikpKSAmJlxuICAgICAgICAoIXR5cGUucHJlZGljYXRlICB8fCB0eXBlLnByZWRpY2F0ZShvYmplY3QpKSkge1xuXG4gICAgICBpZiAoZXhwbGljaXQpIHtcbiAgICAgICAgaWYgKHR5cGUubXVsdGkgJiYgdHlwZS5yZXByZXNlbnROYW1lKSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS5yZXByZXNlbnROYW1lKG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9ICc/JztcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUucmVwcmVzZW50KSB7XG4gICAgICAgIHN0eWxlID0gc3RhdGUuc3R5bGVNYXBbdHlwZS50YWddIHx8IHR5cGUuZGVmYXVsdFN0eWxlO1xuXG4gICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbCh0eXBlLnJlcHJlc2VudCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnQob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5yZXByZXNlbnQsIHN0eWxlKSkge1xuICAgICAgICAgIF9yZXN1bHQgPSB0eXBlLnJlcHJlc2VudFtzdHlsZV0ob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignITwnICsgdHlwZS50YWcgKyAnPiB0YWcgcmVzb2x2ZXIgYWNjZXB0cyBub3QgXCInICsgc3R5bGUgKyAnXCIgc3R5bGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLmR1bXAgPSBfcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFNlcmlhbGl6ZXMgYG9iamVjdGAgYW5kIHdyaXRlcyBpdCB0byBnbG9iYWwgYHJlc3VsdGAuXG4vLyBSZXR1cm5zIHRydWUgb24gc3VjY2Vzcywgb3IgZmFsc2Ugb24gaW52YWxpZCBvYmplY3QuXG4vL1xuZnVuY3Rpb24gd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBibG9jaywgY29tcGFjdCwgaXNrZXksIGlzYmxvY2tzZXEpIHtcbiAgc3RhdGUudGFnID0gbnVsbDtcbiAgc3RhdGUuZHVtcCA9IG9iamVjdDtcblxuICBpZiAoIWRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgZmFsc2UpKSB7XG4gICAgZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHZhciB0eXBlID0gX3RvU3RyaW5nLmNhbGwoc3RhdGUuZHVtcCk7XG4gIHZhciBpbmJsb2NrID0gYmxvY2s7XG4gIHZhciB0YWdTdHI7XG5cbiAgaWYgKGJsb2NrKSB7XG4gICAgYmxvY2sgPSAoc3RhdGUuZmxvd0xldmVsIDwgMCB8fCBzdGF0ZS5mbG93TGV2ZWwgPiBsZXZlbCk7XG4gIH1cblxuICB2YXIgb2JqZWN0T3JBcnJheSA9IHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScsXG4gICAgICBkdXBsaWNhdGVJbmRleCxcbiAgICAgIGR1cGxpY2F0ZTtcblxuICBpZiAob2JqZWN0T3JBcnJheSkge1xuICAgIGR1cGxpY2F0ZUluZGV4ID0gc3RhdGUuZHVwbGljYXRlcy5pbmRleE9mKG9iamVjdCk7XG4gICAgZHVwbGljYXRlID0gZHVwbGljYXRlSW5kZXggIT09IC0xO1xuICB9XG5cbiAgaWYgKChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHx8IGR1cGxpY2F0ZSB8fCAoc3RhdGUuaW5kZW50ICE9PSAyICYmIGxldmVsID4gMCkpIHtcbiAgICBjb21wYWN0ID0gZmFsc2U7XG4gIH1cblxuICBpZiAoZHVwbGljYXRlICYmIHN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSkge1xuICAgIHN0YXRlLmR1bXAgPSAnKnJlZl8nICsgZHVwbGljYXRlSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9iamVjdE9yQXJyYXkgJiYgZHVwbGljYXRlICYmICFzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0pIHtcbiAgICAgIHN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgaWYgKGJsb2NrICYmIChPYmplY3Qua2V5cyhzdGF0ZS5kdW1wKS5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVGbG93TWFwcGluZyhzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXApO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIGlmIChibG9jayAmJiAoc3RhdGUuZHVtcC5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIGlmIChzdGF0ZS5ub0FycmF5SW5kZW50ICYmICFpc2Jsb2Nrc2VxICYmIGxldmVsID4gMCkge1xuICAgICAgICAgIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwgLSAxLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlRmxvd1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICAgIGlmIChzdGF0ZS50YWcgIT09ICc/Jykge1xuICAgICAgICB3cml0ZVNjYWxhcihzdGF0ZSwgc3RhdGUuZHVtcCwgbGV2ZWwsIGlza2V5LCBpbmJsb2NrKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IFVuZGVmaW5lZF0nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5za2lwSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbigndW5hY2NlcHRhYmxlIGtpbmQgb2YgYW4gb2JqZWN0IHRvIGR1bXAgJyArIHR5cGUpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgIC8vIE5lZWQgdG8gZW5jb2RlIGFsbCBjaGFyYWN0ZXJzIGV4Y2VwdCB0aG9zZSBhbGxvd2VkIGJ5IHRoZSBzcGVjOlxuICAgICAgLy9cbiAgICAgIC8vIFszNV0gbnMtZGVjLWRpZ2l0ICAgIDo6PSAgWyN4MzAtI3gzOV0gLyogMC05ICovXG4gICAgICAvLyBbMzZdIG5zLWhleC1kaWdpdCAgICA6Oj0gIG5zLWRlYy1kaWdpdFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfCBbI3g0MS0jeDQ2XSAvKiBBLUYgKi8gfCBbI3g2MS0jeDY2XSAvKiBhLWYgKi9cbiAgICAgIC8vIFszN10gbnMtYXNjaWktbGV0dGVyIDo6PSAgWyN4NDEtI3g1QV0gLyogQS1aICovIHwgWyN4NjEtI3g3QV0gLyogYS16ICovXG4gICAgICAvLyBbMzhdIG5zLXdvcmQtY2hhciAgICA6Oj0gIG5zLWRlYy1kaWdpdCB8IG5zLWFzY2lpLWxldHRlciB8IFx1MjAxQy1cdTIwMURcbiAgICAgIC8vIFszOV0gbnMtdXJpLWNoYXIgICAgIDo6PSAgXHUyMDFDJVx1MjAxRCBucy1oZXgtZGlnaXQgbnMtaGV4LWRpZ2l0IHwgbnMtd29yZC1jaGFyIHwgXHUyMDFDI1x1MjAxRFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfCBcdTIwMUM7XHUyMDFEIHwgXHUyMDFDL1x1MjAxRCB8IFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDQFx1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDK1x1MjAxRCB8IFx1MjAxQyRcdTIwMUQgfCBcdTIwMUMsXHUyMDFEXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB8IFx1MjAxQ19cdTIwMUQgfCBcdTIwMUMuXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ35cdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDJ1x1MjAxRCB8IFx1MjAxQyhcdTIwMUQgfCBcdTIwMUMpXHUyMDFEIHwgXHUyMDFDW1x1MjAxRCB8IFx1MjAxQ11cdTIwMURcbiAgICAgIC8vXG4gICAgICAvLyBBbHNvIG5lZWQgdG8gZW5jb2RlICchJyBiZWNhdXNlIGl0IGhhcyBzcGVjaWFsIG1lYW5pbmcgKGVuZCBvZiB0YWcgcHJlZml4KS5cbiAgICAgIC8vXG4gICAgICB0YWdTdHIgPSBlbmNvZGVVUkkoXG4gICAgICAgIHN0YXRlLnRhZ1swXSA9PT0gJyEnID8gc3RhdGUudGFnLnNsaWNlKDEpIDogc3RhdGUudGFnXG4gICAgICApLnJlcGxhY2UoLyEvZywgJyUyMScpO1xuXG4gICAgICBpZiAoc3RhdGUudGFnWzBdID09PSAnIScpIHtcbiAgICAgICAgdGFnU3RyID0gJyEnICsgdGFnU3RyO1xuICAgICAgfSBlbHNlIGlmICh0YWdTdHIuc2xpY2UoMCwgMTgpID09PSAndGFnOnlhbWwub3JnLDIwMDI6Jykge1xuICAgICAgICB0YWdTdHIgPSAnISEnICsgdGFnU3RyLnNsaWNlKDE4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhZ1N0ciA9ICchPCcgKyB0YWdTdHIgKyAnPic7XG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmR1bXAgPSB0YWdTdHIgKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXREdXBsaWNhdGVSZWZlcmVuY2VzKG9iamVjdCwgc3RhdGUpIHtcbiAgdmFyIG9iamVjdHMgPSBbXSxcbiAgICAgIGR1cGxpY2F0ZXNJbmRleGVzID0gW10sXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpbnNwZWN0Tm9kZShvYmplY3QsIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gZHVwbGljYXRlc0luZGV4ZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHN0YXRlLmR1cGxpY2F0ZXMucHVzaChvYmplY3RzW2R1cGxpY2F0ZXNJbmRleGVzW2luZGV4XV0pO1xuICB9XG4gIHN0YXRlLnVzZWREdXBsaWNhdGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpIHtcbiAgdmFyIG9iamVjdEtleUxpc3QsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpZiAob2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgaW5kZXggPSBvYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoZHVwbGljYXRlc0luZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgIGR1cGxpY2F0ZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3RbaW5kZXhdLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3Rbb2JqZWN0S2V5TGlzdFtpbmRleF1dLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHVtcCQxKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShvcHRpb25zKTtcblxuICBpZiAoIXN0YXRlLm5vUmVmcykgZ2V0RHVwbGljYXRlUmVmZXJlbmNlcyhpbnB1dCwgc3RhdGUpO1xuXG4gIHZhciB2YWx1ZSA9IGlucHV0O1xuXG4gIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgIHZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbCh7ICcnOiB2YWx1ZSB9LCAnJywgdmFsdWUpO1xuICB9XG5cbiAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgMCwgdmFsdWUsIHRydWUsIHRydWUpKSByZXR1cm4gc3RhdGUuZHVtcCArICdcXG4nO1xuXG4gIHJldHVybiAnJztcbn1cblxudmFyIGR1bXBfMSA9IGR1bXAkMTtcblxudmFyIGR1bXBlciA9IHtcblx0ZHVtcDogZHVtcF8xXG59O1xuXG5mdW5jdGlvbiByZW5hbWVkKGZyb20sIHRvKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiB5YW1sLicgKyBmcm9tICsgJyBpcyByZW1vdmVkIGluIGpzLXlhbWwgNC4gJyArXG4gICAgICAnVXNlIHlhbWwuJyArIHRvICsgJyBpbnN0ZWFkLCB3aGljaCBpcyBub3cgc2FmZSBieSBkZWZhdWx0LicpO1xuICB9O1xufVxuXG5cbnZhciBUeXBlICAgICAgICAgICAgICAgID0gdHlwZTtcbnZhciBTY2hlbWEgICAgICAgICAgICAgID0gc2NoZW1hO1xudmFyIEZBSUxTQUZFX1NDSEVNQSAgICAgPSBmYWlsc2FmZTtcbnZhciBKU09OX1NDSEVNQSAgICAgICAgID0ganNvbjtcbnZhciBDT1JFX1NDSEVNQSAgICAgICAgID0gY29yZTtcbnZhciBERUZBVUxUX1NDSEVNQSAgICAgID0gX2RlZmF1bHQ7XG52YXIgbG9hZCAgICAgICAgICAgICAgICA9IGxvYWRlci5sb2FkO1xudmFyIGxvYWRBbGwgICAgICAgICAgICAgPSBsb2FkZXIubG9hZEFsbDtcbnZhciBkdW1wICAgICAgICAgICAgICAgID0gZHVtcGVyLmR1bXA7XG52YXIgWUFNTEV4Y2VwdGlvbiAgICAgICA9IGV4Y2VwdGlvbjtcblxuLy8gUmUtZXhwb3J0IGFsbCB0eXBlcyBpbiBjYXNlIHVzZXIgd2FudHMgdG8gY3JlYXRlIGN1c3RvbSBzY2hlbWFcbnZhciB0eXBlcyA9IHtcbiAgYmluYXJ5OiAgICBiaW5hcnksXG4gIGZsb2F0OiAgICAgZmxvYXQsXG4gIG1hcDogICAgICAgbWFwLFxuICBudWxsOiAgICAgIF9udWxsLFxuICBwYWlyczogICAgIHBhaXJzLFxuICBzZXQ6ICAgICAgIHNldCxcbiAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gIGJvb2w6ICAgICAgYm9vbCxcbiAgaW50OiAgICAgICBpbnQsXG4gIG1lcmdlOiAgICAgbWVyZ2UsXG4gIG9tYXA6ICAgICAgb21hcCxcbiAgc2VxOiAgICAgICBzZXEsXG4gIHN0cjogICAgICAgc3RyXG59O1xuXG4vLyBSZW1vdmVkIGZ1bmN0aW9ucyBmcm9tIEpTLVlBTUwgMy4wLnhcbnZhciBzYWZlTG9hZCAgICAgICAgICAgID0gcmVuYW1lZCgnc2FmZUxvYWQnLCAnbG9hZCcpO1xudmFyIHNhZmVMb2FkQWxsICAgICAgICAgPSByZW5hbWVkKCdzYWZlTG9hZEFsbCcsICdsb2FkQWxsJyk7XG52YXIgc2FmZUR1bXAgICAgICAgICAgICA9IHJlbmFtZWQoJ3NhZmVEdW1wJywgJ2R1bXAnKTtcblxudmFyIGpzWWFtbCA9IHtcblx0VHlwZTogVHlwZSxcblx0U2NoZW1hOiBTY2hlbWEsXG5cdEZBSUxTQUZFX1NDSEVNQTogRkFJTFNBRkVfU0NIRU1BLFxuXHRKU09OX1NDSEVNQTogSlNPTl9TQ0hFTUEsXG5cdENPUkVfU0NIRU1BOiBDT1JFX1NDSEVNQSxcblx0REVGQVVMVF9TQ0hFTUE6IERFRkFVTFRfU0NIRU1BLFxuXHRsb2FkOiBsb2FkLFxuXHRsb2FkQWxsOiBsb2FkQWxsLFxuXHRkdW1wOiBkdW1wLFxuXHRZQU1MRXhjZXB0aW9uOiBZQU1MRXhjZXB0aW9uLFxuXHR0eXBlczogdHlwZXMsXG5cdHNhZmVMb2FkOiBzYWZlTG9hZCxcblx0c2FmZUxvYWRBbGw6IHNhZmVMb2FkQWxsLFxuXHRzYWZlRHVtcDogc2FmZUR1bXBcbn07XG5cbmV4cG9ydCB7IENPUkVfU0NIRU1BLCBERUZBVUxUX1NDSEVNQSwgRkFJTFNBRkVfU0NIRU1BLCBKU09OX1NDSEVNQSwgU2NoZW1hLCBUeXBlLCBZQU1MRXhjZXB0aW9uLCBqc1lhbWwgYXMgZGVmYXVsdCwgZHVtcCwgbG9hZCwgbG9hZEFsbCwgc2FmZUR1bXAsIHNhZmVMb2FkLCBzYWZlTG9hZEFsbCwgdHlwZXMgfTtcbiIsICJpbXBvcnQgeyBleGVjU3luYywgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmZ1bmN0aW9uIHJ1bkluU2hlbGwoYXJnczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB6c2ggLWlsYyAnYnVmbyAke2FyZ3N9JyAyPiYxYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkJ1Zm9TeW5jKGFyZ3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjU3luYyhydW5JblNoZWxsKGFyZ3MpLCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIHRpbWVvdXQ6IDMwMDAwIH0pLnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkJ1Zm9Bc3luYyhhcmdzOiBzdHJpbmcsIHN0ZGluPzogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGlsZCA9IGV4ZWMoXG4gICAgICBydW5JblNoZWxsKGFyZ3MpLFxuICAgICAge1xuICAgICAgICBlbmNvZGluZzogXCJ1dGYtOFwiLFxuICAgICAgICB0aW1lb3V0OiAwLCAvLyBubyB0aW1lb3V0IFx1MjAxNCBzb21lIG9wZXJhdGlvbnMgKHdvcmt0cmVlIGNyZWF0aW9uLCBucG0gaW5zdGFsbCkgdGFrZSBtaW51dGVzXG4gICAgICB9LFxuICAgICAgKGVycm9yLCBzdGRvdXQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICAgIGlmIChzdGRpbiAhPT0gdW5kZWZpbmVkICYmIGNoaWxkLnN0ZGluKSB7XG4gICAgICBjaGlsZC5zdGRpbi53cml0ZShzdGRpbik7XG4gICAgICBjaGlsZC5zdGRpbi5lbmQoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2l0QnJhbmNoKGRpcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZXhlY1N5bmMoYGdpdCAtQyBcIiR7ZGlyfVwiIHJldi1wYXJzZSAtLWFiYnJldi1yZWYgSEVBRCAyPi9kZXYvbnVsbGAsIHtcbiAgICAgIGVuY29kaW5nOiBcInV0Zi04XCIsXG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgIH0pLnRyaW0oKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwidW5rbm93blwiO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBdUU7QUFDdkUsbUJBQXlC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QUFVO0FBQUEsZ0JBQ2QsT0FBTyxpQkFBTSxNQUFNO0FBQUEsZ0JBQ25CLE9BQU87QUFBQSxnQkFDUCxTQUFTLE9BQU8sQ0FBQztBQUFBLGNBQ25CLENBQUM7QUFBQSxZQUNILFVBQUU7QUFDQSw4QkFBZ0IsS0FBSztBQUFBLFlBQ3ZCO0FBQUEsVUFDRjtBQUFBO0FBQUEsTUFDRixHQUNGO0FBQUEsTUFHRjtBQUFBLG9EQUFDLGdCQUFLLFVBQUwsRUFBYyxJQUFHLFdBQVUsT0FBTSxXQUFVLGNBQWMsU0FBUyxDQUFDLEdBQUcsT0FDcEUsbUJBQVMsSUFBSSxDQUFDLE1BQ2IsNENBQUMsZ0JBQUssU0FBUyxNQUFkLEVBQWlDLE9BQU8sRUFBRSxPQUFPLE9BQU8sSUFBSSxFQUFFLEtBQUssTUFBM0MsRUFBRSxLQUE2QyxDQUN6RSxHQUNIO0FBQUEsUUFDQSw0Q0FBQyxnQkFBSyxhQUFMLEVBQWlCLE1BQUssMkhBQXFIO0FBQUE7QUFBQTtBQUFBLEVBQzlJO0FBRUo7IiwKICAibmFtZXMiOiBbImV4Y2VwdGlvbiIsICJtYXAiLCAic2NoZW1hIiwgInR5cGUiLCAiZXh0ZW5kIiwgInN0ciIsICJzdHJpbmciXQp9Cg==
