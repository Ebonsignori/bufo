"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/list-tadpoles.tsx
var list_tadpoles_exports = {};
__export(list_tadpoles_exports, {
  default: () => ListTadpoles
});
module.exports = __toCommonJS(list_tadpoles_exports);
var import_api2 = require("@raycast/api");

// node_modules/@raycast/utils/dist/module.js
var import_react = __toESM(require("react"));
var import_api = require("@raycast/api");

// node_modules/dequal/lite/index.mjs
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
  var ctor, len;
  if (foo === bar) return true;
  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) return foo.getTime() === bar.getTime();
    if (ctor === RegExp) return foo.toString() === bar.toString();
    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && dequal(foo[len], bar[len])) ;
      }
      return len === -1;
    }
    if (!ctor || typeof foo === "object") {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
        if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
      }
      return Object.keys(bar).length === len;
    }
  }
  return foo !== foo && bar !== bar;
}

// node_modules/@raycast/utils/dist/module.js
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = __toESM(require("node:path"));
var import_node_crypto = __toESM(require("node:crypto"));
var import_jsx_runtime = require("react/jsx-runtime");
function $a57ed8effbd797c7$export$722debc0e56fea39(value) {
  const ref = (0, import_react.useRef)(value);
  const signalRef = (0, import_react.useRef)(0);
  if (!(0, dequal)(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }
  return (0, import_react.useMemo)(() => ref.current, [
    signalRef.current
  ]);
}
function $bfcf6ee368b3bd9f$export$d4b699e2c1148419(value) {
  const ref = (0, import_react.useRef)(value);
  ref.current = value;
  return ref;
}
function $c718fd03aba6111c$export$80e5033e369189f3(error, options) {
  const message = error instanceof Error ? error.message : String(error);
  return (0, import_api.showToast)({
    style: (0, import_api.Toast).Style.Failure,
    title: options?.title ?? "Something went wrong",
    message: options?.message ?? message,
    primaryAction: options?.primaryAction ?? $c718fd03aba6111c$var$handleErrorToastAction(error),
    secondaryAction: options?.primaryAction ? $c718fd03aba6111c$var$handleErrorToastAction(error) : void 0
  });
}
var $c718fd03aba6111c$var$handleErrorToastAction = (error) => {
  let privateExtension = true;
  let title = "[Extension Name]...";
  let extensionURL = "";
  try {
    const packageJSON = JSON.parse((0, import_node_fs.readFileSync)((0, import_node_path.join)((0, import_api.environment).assetsPath, "..", "package.json"), "utf8"));
    title = `[${packageJSON.title}]...`;
    extensionURL = `https://raycast.com/${packageJSON.owner || packageJSON.author}/${packageJSON.name}`;
    if (!packageJSON.owner || packageJSON.access === "public") privateExtension = false;
  } catch (err) {
  }
  const fallback = (0, import_api.environment).isDevelopment || privateExtension;
  const stack = error instanceof Error ? error?.stack || error?.message || "" : String(error);
  return {
    title: fallback ? "Copy Logs" : "Report Error",
    onAction(toast) {
      toast.hide();
      if (fallback) (0, import_api.Clipboard).copy(stack);
      else (0, import_api.open)(`https://github.com/raycast/extensions/issues/new?&labels=extension%2Cbug&template=extension_bug_report.yml&title=${encodeURIComponent(title)}&extension-url=${encodeURI(extensionURL)}&description=${encodeURIComponent(`#### Error:
\`\`\`
${stack}
\`\`\`
`)}`);
    }
  };
};
function $cefc05764ce5eacd$export$dd6b79aaabe7bc37(fn, args, options) {
  const lastCallId = (0, import_react.useRef)(0);
  const [state, set2] = (0, import_react.useState)({
    isLoading: true
  });
  const fnRef = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(fn);
  const latestAbortable = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(options?.abortable);
  const latestArgs = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(args || []);
  const latestOnError = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(options?.onError);
  const latestOnData = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(options?.onData);
  const latestOnWillExecute = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(options?.onWillExecute);
  const latestFailureToast = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(options?.failureToastOptions);
  const latestValue = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(state.data);
  const latestCallback = (0, import_react.useRef)(null);
  const paginationArgsRef = (0, import_react.useRef)({
    page: 0
  });
  const usePaginationRef = (0, import_react.useRef)(false);
  const hasMoreRef = (0, import_react.useRef)(true);
  const pageSizeRef = (0, import_react.useRef)(50);
  const abort = (0, import_react.useCallback)(() => {
    if (latestAbortable.current) {
      latestAbortable.current.current?.abort();
      latestAbortable.current.current = new AbortController();
    }
    return ++lastCallId.current;
  }, [
    latestAbortable
  ]);
  const callback = (0, import_react.useCallback)((...args2) => {
    const callId = abort();
    latestOnWillExecute.current?.(args2);
    set2((prevState) => ({
      ...prevState,
      isLoading: true
    }));
    const promiseOrPaginatedPromise = $cefc05764ce5eacd$var$bindPromiseIfNeeded(fnRef.current)(...args2);
    function handleError(error) {
      if (error.name == "AbortError") return error;
      if (callId === lastCallId.current) {
        if (latestOnError.current) latestOnError.current(error);
        else if ((0, import_api.environment).launchType !== (0, import_api.LaunchType).Background) (0, $c718fd03aba6111c$export$80e5033e369189f3)(error, {
          title: "Failed to fetch latest data",
          primaryAction: {
            title: "Retry",
            onAction(toast) {
              toast.hide();
              latestCallback.current?.(...latestArgs.current || []);
            }
          },
          ...latestFailureToast.current
        });
        set2({
          error,
          isLoading: false
        });
      }
      return error;
    }
    if (typeof promiseOrPaginatedPromise === "function") {
      usePaginationRef.current = true;
      return promiseOrPaginatedPromise(paginationArgsRef.current).then(
        // @ts-expect-error too complicated for TS
        ({ data, hasMore, cursor }) => {
          if (callId === lastCallId.current) {
            if (paginationArgsRef.current) {
              paginationArgsRef.current.cursor = cursor;
              paginationArgsRef.current.lastItem = data?.[data.length - 1];
            }
            if (latestOnData.current) latestOnData.current(data, paginationArgsRef.current);
            if (hasMore) pageSizeRef.current = data.length;
            hasMoreRef.current = hasMore;
            set2((previousData) => {
              if (paginationArgsRef.current.page === 0) return {
                data,
                isLoading: false
              };
              return {
                data: (previousData.data || [])?.concat(data),
                isLoading: false
              };
            });
          }
          return data;
        },
        (error) => {
          hasMoreRef.current = false;
          return handleError(error);
        }
      );
    }
    usePaginationRef.current = false;
    return promiseOrPaginatedPromise.then((data) => {
      if (callId === lastCallId.current) {
        if (latestOnData.current) latestOnData.current(data);
        set2({
          data,
          isLoading: false
        });
      }
      return data;
    }, handleError);
  }, [
    latestOnData,
    latestOnError,
    latestArgs,
    fnRef,
    set2,
    latestCallback,
    latestOnWillExecute,
    paginationArgsRef,
    latestFailureToast,
    abort
  ]);
  latestCallback.current = callback;
  const revalidate = (0, import_react.useCallback)(() => {
    paginationArgsRef.current = {
      page: 0
    };
    const args2 = latestArgs.current || [];
    return callback(...args2);
  }, [
    callback,
    latestArgs
  ]);
  const mutate = (0, import_react.useCallback)(async (asyncUpdate, options2) => {
    let dataBeforeOptimisticUpdate;
    try {
      if (options2?.optimisticUpdate) {
        abort();
        if (typeof options2?.rollbackOnError !== "function" && options2?.rollbackOnError !== false)
          dataBeforeOptimisticUpdate = structuredClone(latestValue.current?.value);
        const update = options2.optimisticUpdate;
        set2((prevState) => ({
          ...prevState,
          data: update(prevState.data)
        }));
      }
      return await asyncUpdate;
    } catch (err) {
      if (typeof options2?.rollbackOnError === "function") {
        const update = options2.rollbackOnError;
        set2((prevState) => ({
          ...prevState,
          data: update(prevState.data)
        }));
      } else if (options2?.optimisticUpdate && options2?.rollbackOnError !== false) set2((prevState) => ({
        ...prevState,
        data: dataBeforeOptimisticUpdate
      }));
      throw err;
    } finally {
      if (options2?.shouldRevalidateAfter !== false) {
        if ((0, import_api.environment).launchType === (0, import_api.LaunchType).Background || (0, import_api.environment).commandMode === "menu-bar")
          await revalidate();
        else revalidate();
      }
    }
  }, [
    revalidate,
    latestValue,
    set2,
    abort
  ]);
  const onLoadMore = (0, import_react.useCallback)(() => {
    paginationArgsRef.current.page += 1;
    const args2 = latestArgs.current || [];
    callback(...args2);
  }, [
    paginationArgsRef,
    latestArgs,
    callback
  ]);
  (0, import_react.useEffect)(() => {
    paginationArgsRef.current = {
      page: 0
    };
    if (options?.execute !== false) callback(...args || []);
    else
      abort();
  }, [
    (0, $a57ed8effbd797c7$export$722debc0e56fea39)([
      args,
      options?.execute,
      callback
    ]),
    latestAbortable,
    paginationArgsRef
  ]);
  (0, import_react.useEffect)(() => {
    return () => {
      abort();
    };
  }, [
    abort
  ]);
  const isLoading = options?.execute !== false ? state.isLoading : false;
  const stateWithLoadingFixed = {
    ...state,
    isLoading
  };
  const pagination = usePaginationRef.current ? {
    pageSize: pageSizeRef.current,
    hasMore: hasMoreRef.current,
    onLoadMore
  } : void 0;
  return {
    ...stateWithLoadingFixed,
    revalidate,
    mutate,
    pagination
  };
}
function $cefc05764ce5eacd$var$bindPromiseIfNeeded(fn) {
  if (fn === Promise.all)
    return fn.bind(Promise);
  if (fn === Promise.race)
    return fn.bind(Promise);
  if (fn === Promise.resolve)
    return fn.bind(Promise);
  if (fn === Promise.reject)
    return fn.bind(Promise);
  return fn;
}
function $93381684554307cb$var$isNativeFunction(f) {
  if (typeof f !== "function") return false;
  const exp = /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i;
  return exp.exec(Function.prototype.toString.call(f)) !== null;
}
function $93381684554307cb$var$hashReplacer(value) {
  if (value instanceof URLSearchParams) return value.toString();
  return value;
}
function $93381684554307cb$export$fe386877a696ae78(writeTo, context = []) {
  function write(str2) {
    if ("update" in writeTo) return writeTo.update(str2, "utf8");
    else return writeTo.write(str2);
  }
  return {
    dispatch: function(value) {
      value = $93381684554307cb$var$hashReplacer(value);
      const type2 = typeof value;
      if (value === null) this["_null"]();
      else
        this["_" + type2](value);
    },
    _object: function(object) {
      const pattern = /\[object (.*)\]/i;
      const objString = Object.prototype.toString.call(object);
      let objType = pattern.exec(objString)?.[1] ?? "unknown:[" + objString + "]";
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.indexOf(object)) >= 0) {
        this.dispatch("[CIRCULAR:" + objectNumber + "]");
        return;
      } else context.push(object);
      if (Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this["_" + objType])
          this["_" + objType](object);
        else throw new Error('Unknown object type "' + objType + '"');
      } else {
        let keys = Object.keys(object);
        keys = keys.sort();
        if (!$93381684554307cb$var$isNativeFunction(object)) keys.splice(0, 0, "prototype", "__proto__", "constructor");
        write("object:" + keys.length + ":");
        const self = this;
        return keys.forEach(function(key) {
          self.dispatch(key);
          write(":");
          self.dispatch(object[key]);
          write(",");
        });
      }
    },
    _array: function(arr, unordered) {
      unordered = typeof unordered !== "undefined" ? unordered : false;
      const self = this;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        arr.forEach(function(entry) {
          self.dispatch(entry);
        });
        return;
      }
      let contextAdditions = [];
      const entries = arr.map(function(entry) {
        const strm = $93381684554307cb$var$PassThrough();
        const localContext = context.slice();
        const hasher = $93381684554307cb$export$fe386877a696ae78(strm, localContext);
        hasher.dispatch(entry);
        contextAdditions = contextAdditions.concat(localContext.slice(context.length));
        return strm.read().toString();
      });
      context = context.concat(contextAdditions);
      entries.sort();
      this._array(entries, false);
    },
    _date: function(date) {
      write("date:" + date.toJSON());
    },
    _symbol: function(sym) {
      write("symbol:" + sym.toString());
    },
    _error: function(err) {
      write("error:" + err.toString());
    },
    _boolean: function(bool2) {
      write("bool:" + bool2.toString());
    },
    _string: function(string) {
      write("string:" + string.length + ":");
      write(string.toString());
    },
    _function: function(fn) {
      write("fn:");
      if ($93381684554307cb$var$isNativeFunction(fn)) this.dispatch("[native]");
      else this.dispatch(fn.toString());
      this.dispatch("function-name:" + String(fn.name));
      this._object(fn);
    },
    _number: function(number) {
      write("number:" + number.toString());
    },
    _xml: function(xml) {
      write("xml:" + xml.toString());
    },
    _null: function() {
      write("Null");
    },
    _undefined: function() {
      write("Undefined");
    },
    _regexp: function(regex) {
      write("regex:" + regex.toString());
    },
    _uint8array: function(arr) {
      write("uint8array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint8clampedarray: function(arr) {
      write("uint8clampedarray:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _int8array: function(arr) {
      write("int8array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint16array: function(arr) {
      write("uint16array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _int16array: function(arr) {
      write("int16array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _uint32array: function(arr) {
      write("uint32array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _int32array: function(arr) {
      write("int32array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _float32array: function(arr) {
      write("float32array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _float64array: function(arr) {
      write("float64array:");
      this.dispatch(Array.prototype.slice.call(arr));
    },
    _arraybuffer: function(arr) {
      write("arraybuffer:");
      this.dispatch(new Uint8Array(arr));
    },
    _url: function(url) {
      write("url:" + url.toString());
    },
    _map: function(map2) {
      write("map:");
      const arr = Array.from(map2);
      this._array(arr, true);
    },
    _set: function(set2) {
      write("set:");
      const arr = Array.from(set2);
      this._array(arr, true);
    },
    _file: function(file) {
      write("file:");
      this.dispatch([
        file.name,
        file.size,
        file.type,
        file.lastModified
      ]);
    },
    _blob: function() {
      throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
    },
    _domwindow: function() {
      write("domwindow");
    },
    _bigint: function(number) {
      write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    _process: function() {
      write("process");
    },
    _timer: function() {
      write("timer");
    },
    _pipe: function() {
      write("pipe");
    },
    _tcp: function() {
      write("tcp");
    },
    _udp: function() {
      write("udp");
    },
    _tty: function() {
      write("tty");
    },
    _statwatcher: function() {
      write("statwatcher");
    },
    _securecontext: function() {
      write("securecontext");
    },
    _connection: function() {
      write("connection");
    },
    _zlib: function() {
      write("zlib");
    },
    _context: function() {
      write("context");
    },
    _nodescript: function() {
      write("nodescript");
    },
    _httpparser: function() {
      write("httpparser");
    },
    _dataview: function() {
      write("dataview");
    },
    _signal: function() {
      write("signal");
    },
    _fsevent: function() {
      write("fsevent");
    },
    _tlswrap: function() {
      write("tlswrap");
    }
  };
}
function $93381684554307cb$var$PassThrough() {
  return {
    buf: "",
    write: function(b) {
      this.buf += b;
    },
    end: function(b) {
      this.buf += b;
    },
    read: function() {
      return this.buf;
    }
  };
}
function $e2e1ea6dd3b7d2e1$export$b644b65666fe0c18(key, _value) {
  const value = this[key];
  if (value instanceof Date) return `__raycast_cached_date__${value.toISOString()}`;
  if (Buffer.isBuffer(value)) return `__raycast_cached_buffer__${value.toString("base64")}`;
  return _value;
}
function $e2e1ea6dd3b7d2e1$export$63698c10df99509c(_key, value) {
  if (typeof value === "string" && value.startsWith("__raycast_cached_date__")) return new Date(value.replace("__raycast_cached_date__", ""));
  if (typeof value === "string" && value.startsWith("__raycast_cached_buffer__")) return Buffer.from(value.replace("__raycast_cached_buffer__", ""), "base64");
  return value;
}
function $e2e1ea6dd3b7d2e1$export$d6af199866bfb566(object) {
  const hashingStream = (0, import_node_crypto.default).createHash("sha1");
  const hasher = (0, $93381684554307cb$export$fe386877a696ae78)(hashingStream);
  hasher.dispatch(object);
  return hashingStream.digest("hex");
}
var $c40d7eded38ca69c$var$rootCache = /* @__PURE__ */ Symbol("cache without namespace");
var $c40d7eded38ca69c$var$cacheMap = /* @__PURE__ */ new Map();
function $c40d7eded38ca69c$export$14afb9e4c16377d3(key, initialState, config) {
  const cacheKey = config?.cacheNamespace || $c40d7eded38ca69c$var$rootCache;
  const cache = $c40d7eded38ca69c$var$cacheMap.get(cacheKey) || $c40d7eded38ca69c$var$cacheMap.set(cacheKey, new (0, import_api.Cache)({
    namespace: config?.cacheNamespace
  })).get(cacheKey);
  if (!cache) throw new Error("Missing cache");
  const keyRef = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(key);
  const initialValueRef = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(initialState);
  const cachedState = (0, import_react.useSyncExternalStore)(cache.subscribe, () => {
    try {
      return cache.get(keyRef.current);
    } catch (error) {
      console.error("Could not get Cache data:", error);
      return void 0;
    }
  });
  const state = (0, import_react.useMemo)(() => {
    if (typeof cachedState !== "undefined") {
      if (cachedState === "undefined") return void 0;
      try {
        return JSON.parse(cachedState, (0, $e2e1ea6dd3b7d2e1$export$63698c10df99509c));
      } catch (err) {
        console.warn("The cached data is corrupted", err);
        return initialValueRef.current;
      }
    } else return initialValueRef.current;
  }, [
    cachedState,
    initialValueRef
  ]);
  const stateRef = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(state);
  const setStateAndCache = (0, import_react.useCallback)((updater) => {
    const newValue = typeof updater === "function" ? updater(stateRef.current) : updater;
    if (typeof newValue === "undefined") cache.set(keyRef.current, "undefined");
    else {
      const stringifiedValue = JSON.stringify(newValue, (0, $e2e1ea6dd3b7d2e1$export$b644b65666fe0c18));
      cache.set(keyRef.current, stringifiedValue);
    }
    return newValue;
  }, [
    cache,
    keyRef,
    stateRef
  ]);
  return [
    state,
    setStateAndCache
  ];
}
var $a7f3824c7be647eb$var$emptyCache = /* @__PURE__ */ Symbol();
function $a7f3824c7be647eb$export$b15740c74e256244(fn, args, options) {
  const { initialData, keepPreviousData, internal_cacheKeySuffix, ...usePromiseOptions } = options || {};
  const lastUpdateFrom = (0, import_react.useRef)(null);
  const [cachedData, mutateCache] = (0, $c40d7eded38ca69c$export$14afb9e4c16377d3)((0, $e2e1ea6dd3b7d2e1$export$d6af199866bfb566)(args || []) + internal_cacheKeySuffix, $a7f3824c7be647eb$var$emptyCache, {
    cacheNamespace: (0, $e2e1ea6dd3b7d2e1$export$d6af199866bfb566)(fn)
  });
  const laggyDataRef = (0, import_react.useRef)(cachedData !== $a7f3824c7be647eb$var$emptyCache ? cachedData : initialData);
  const paginationArgsRef = (0, import_react.useRef)(void 0);
  const { mutate: _mutate, revalidate, ...state } = (0, $cefc05764ce5eacd$export$dd6b79aaabe7bc37)(fn, args || [], {
    ...usePromiseOptions,
    onData(data, pagination2) {
      paginationArgsRef.current = pagination2;
      if (usePromiseOptions.onData) usePromiseOptions.onData(data, pagination2);
      if (pagination2 && pagination2.page > 0)
        return;
      lastUpdateFrom.current = "promise";
      laggyDataRef.current = data;
      mutateCache(data);
    }
  });
  let returnedData;
  const pagination = state.pagination;
  if (paginationArgsRef.current && paginationArgsRef.current.page > 0 && state.data) returnedData = state.data;
  else if (lastUpdateFrom.current === "promise") returnedData = laggyDataRef.current;
  else if (keepPreviousData && cachedData !== $a7f3824c7be647eb$var$emptyCache) {
    returnedData = cachedData;
    if (pagination) {
      pagination.hasMore = true;
      pagination.pageSize = cachedData.length;
    }
  } else if (keepPreviousData && cachedData === $a7f3824c7be647eb$var$emptyCache)
    returnedData = laggyDataRef.current;
  else if (cachedData !== $a7f3824c7be647eb$var$emptyCache) {
    returnedData = cachedData;
    if (pagination) {
      pagination.hasMore = true;
      pagination.pageSize = cachedData.length;
    }
  } else returnedData = initialData;
  const latestData = (0, $bfcf6ee368b3bd9f$export$d4b699e2c1148419)(returnedData);
  const mutate = (0, import_react.useCallback)(async (asyncUpdate, options2) => {
    let dataBeforeOptimisticUpdate;
    try {
      if (options2?.optimisticUpdate) {
        if (typeof options2?.rollbackOnError !== "function" && options2?.rollbackOnError !== false)
          dataBeforeOptimisticUpdate = structuredClone(latestData.current);
        const data = options2.optimisticUpdate(latestData.current);
        lastUpdateFrom.current = "cache";
        laggyDataRef.current = data;
        mutateCache(data);
      }
      return await _mutate(asyncUpdate, {
        shouldRevalidateAfter: options2?.shouldRevalidateAfter
      });
    } catch (err) {
      if (typeof options2?.rollbackOnError === "function") {
        const data = options2.rollbackOnError(latestData.current);
        lastUpdateFrom.current = "cache";
        laggyDataRef.current = data;
        mutateCache(data);
      } else if (options2?.optimisticUpdate && options2?.rollbackOnError !== false) {
        lastUpdateFrom.current = "cache";
        laggyDataRef.current = dataBeforeOptimisticUpdate;
        mutateCache(dataBeforeOptimisticUpdate);
      }
      throw err;
    }
  }, [
    mutateCache,
    _mutate,
    latestData,
    laggyDataRef,
    lastUpdateFrom
  ]);
  (0, import_react.useEffect)(() => {
    if (cachedData !== $a7f3824c7be647eb$var$emptyCache) {
      lastUpdateFrom.current = "cache";
      laggyDataRef.current = cachedData;
    }
  }, [
    cachedData
  ]);
  return {
    data: returnedData,
    isLoading: state.isLoading,
    error: state.error,
    mutate: paginationArgsRef.current && paginationArgsRef.current.page > 0 ? _mutate : mutate,
    pagination,
    revalidate
  };
}

// src/lib/bufo.ts
var import_fs2 = require("fs");
var import_path2 = require("path");

// src/lib/config.ts
var import_fs = require("fs");
var import_path = require("path");
var import_os = require("os");

// node_modules/js-yaml/dist/js-yaml.mjs
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

// src/lib/config.ts
var BUFO_DIR = (0, import_path.join)((0, import_os.homedir)(), ".bufo");
var PROJECTS_DIR = (0, import_path.join)(BUFO_DIR, "projects");
var STATE_DIR = (0, import_path.join)(BUFO_DIR, "state");
var SESSIONS_DIR = (0, import_path.join)(BUFO_DIR, "sessions");
var GLOBAL_CONFIG = (0, import_path.join)(BUFO_DIR, "config.yaml");
function bufoExists() {
  return (0, import_fs.existsSync)(BUFO_DIR);
}
function expandPath(p) {
  if (p.startsWith("~/") || p === "~") {
    return (0, import_path.join)((0, import_os.homedir)(), p.slice(2));
  }
  return p;
}
function loadGlobalConfig() {
  if (!(0, import_fs.existsSync)(GLOBAL_CONFIG)) return {};
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
    tadpole_base: expandPath(
      doc.tadpole_base || doc.workspace_base || ""
    ),
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
  if (!(0, import_fs.existsSync)(PROJECTS_DIR)) return [];
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
function loadTadpoleState(sessionName, num) {
  let stateFile = (0, import_path.join)(STATE_DIR, sessionName, `tp${num}.json`);
  if (!(0, import_fs.existsSync)(stateFile)) {
    stateFile = (0, import_path.join)(STATE_DIR, sessionName, `ws${num}.json`);
  }
  if (!(0, import_fs.existsSync)(stateFile)) return void 0;
  try {
    return JSON.parse((0, import_fs.readFileSync)(stateFile, "utf-8"));
  } catch {
    return void 0;
  }
}
function loadTadpoleMeta(tadpoleDir) {
  const metaFile = (0, import_path.join)(tadpoleDir, ".bufo-meta");
  if (!(0, import_fs.existsSync)(metaFile)) return void 0;
  try {
    return JSON.parse((0, import_fs.readFileSync)(metaFile, "utf-8"));
  } catch {
    return void 0;
  }
}
function isTadpoleLocked(tadpoleDir) {
  return (0, import_fs.existsSync)((0, import_path.join)(tadpoleDir, ".bufo-lock"));
}
function getCustomName(tadpoleDir) {
  const nameFile = (0, import_path.join)(tadpoleDir, ".bufo-name");
  if (!(0, import_fs.existsSync)(nameFile)) return void 0;
  try {
    return (0, import_fs.readFileSync)(nameFile, "utf-8").trim() || void 0;
  } catch {
    return void 0;
  }
}

// src/lib/exec.ts
var import_child_process = require("child_process");
function runInShell(args) {
  return `zsh -ilc 'bufo ${args}' 2>&1`;
}
function runBufoAsync(args, stdin) {
  return new Promise((resolve, reject) => {
    const child = (0, import_child_process.exec)(
      runInShell(args),
      {
        encoding: "utf-8",
        timeout: 0
        // no timeout — some operations (worktree creation, npm install) take minutes
      },
      (error, stdout) => {
        if (error) {
          reject(new Error(error.message));
        } else {
          resolve(stdout.trim());
        }
      }
    );
    if (stdin !== void 0 && child.stdin) {
      child.stdin.write(stdin);
      child.stdin.end();
    }
  });
}
function getGitBranch(dir) {
  try {
    return (0, import_child_process.execSync)(`git -C "${dir}" rev-parse --abbrev-ref HEAD 2>/dev/null`, {
      encoding: "utf-8",
      timeout: 5e3
    }).trim();
  } catch {
    return "unknown";
  }
}

// src/lib/iterm.ts
var import_child_process2 = require("child_process");
function sanitizeSessionId(id) {
  if (!/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(id)) {
    throw new Error(`Invalid iTerm2 session ID: ${JSON.stringify(id)}`);
  }
  return id;
}
function runAppleScriptSync(script, timeoutMs = 5e3) {
  const result = (0, import_child_process2.spawnSync)("/usr/bin/osascript", [], {
    input: script,
    encoding: "utf-8",
    timeout: timeoutMs
  });
  if (result.error) throw result.error;
  return result.stdout ?? "";
}
function focusSession(sessionId) {
  const safeId = sanitizeSessionId(sessionId);
  const script = `
    tell application "iTerm2"
      activate
      repeat with w in windows
        tell w
          repeat with t in tabs
            tell t
              repeat with s in sessions
                if (unique ID of s) is "${safeId}" then
                  select t
                  select s
                  tell w to select
                  return
                end if
              end repeat
            end tell
          end repeat
        end tell
      end repeat
    end tell
  `;
  try {
    runAppleScriptSync(script);
  } catch {
  }
}
function getActiveSessions() {
  const script = `
    tell application "iTerm2"
      set allIDs to {}
      repeat with w in windows
        tell w
          repeat with t in tabs
            tell t
              repeat with s in sessions
                set end of allIDs to (unique ID of s)
              end repeat
            end tell
          end repeat
        end tell
      end repeat
      set AppleScript's text item delimiters to ","
      return allIDs as text
    end tell
  `;
  try {
    const result = runAppleScriptSync(script).trim();
    if (!result) return /* @__PURE__ */ new Set();
    return new Set(result.split(",").map((s) => s.trim()));
  } catch {
    return /* @__PURE__ */ new Set();
  }
}

// src/lib/bufo.ts
function getTadpoleDir(project, num) {
  return (0, import_path2.join)(project.tadpole_base, `${project.tadpoles.prefix}-${num}`);
}
function discoverTadpoles(project, activeSessions) {
  const tadpoles = [];
  if (!(0, import_fs2.existsSync)(project.tadpole_base)) return tadpoles;
  const prefix = project.tadpoles.prefix;
  const entries = (0, import_fs2.readdirSync)(project.tadpole_base, { withFileTypes: true });
  const nums = entries.filter((e) => e.isDirectory() && e.name.startsWith(`${prefix}-`)).map((e) => parseInt(e.name.slice(prefix.length + 1), 10)).filter((n) => !isNaN(n)).sort((a, b) => a - b);
  for (const i of nums) {
    const dir = getTadpoleDir(project, i);
    const state = loadTadpoleState(project.session_name, i);
    const meta = loadTadpoleMeta(dir);
    const locked = isTadpoleLocked(dir);
    const customName = getCustomName(dir);
    const branch = getGitBranch(dir);
    let active = false;
    if (state && activeSessions) {
      const mainSid = state.panes.main;
      active = mainSid ? activeSessions.has(mainSid) : false;
    }
    tadpoles.push({
      project,
      number: i,
      directory: dir,
      branch,
      locked,
      active,
      meta,
      state,
      customName
    });
  }
  return tadpoles;
}
function getAllTadpoles() {
  const projects = discoverProjects();
  const activeSessions = getActiveSessions();
  const tadpoles = [];
  for (const project of projects) {
    tadpoles.push(...discoverTadpoles(project, activeSessions));
  }
  return { projects, tadpoles };
}
function getTadpoleTitle(tp) {
  if (tp.meta?.pr_title) {
    const name = tp.customName || `tp${tp.number}`;
    return `${name}: ${tp.meta.pr_title}`;
  }
  if (tp.meta?.ticket) {
    const name = tp.customName || `tp${tp.number}`;
    return `${name} (${tp.meta.ticket})`;
  }
  if (tp.customName) return tp.customName;
  return `${tp.project.tadpoles.prefix}-${tp.number}`;
}
function getTadpoleSubtitle(tp) {
  const parts = [];
  if (tp.branch && tp.branch !== "unknown") parts.push(tp.branch);
  if (tp.meta?.type && tp.meta.type !== "tadpole") parts.push(tp.meta.type.toUpperCase());
  return parts.join(" | ");
}

// src/list-tadpoles.tsx
var import_fs3 = require("fs");
var import_path3 = require("path");
var import_jsx_runtime2 = require("react/jsx-runtime");
function ListTadpoles() {
  if (!bufoExists()) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_api2.List, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_api2.List.EmptyView,
      {
        title: "Bufo Not Configured",
        description: "Run `bufo init` in your terminal to set up bufo.",
        icon: import_api2.Icon.Warning
      }
    ) });
  }
  const { data, isLoading, revalidate } = $a7f3824c7be647eb$export$b15740c74e256244(async () => getAllTadpoles(), [], {
    keepPreviousData: true
  });
  const tadpoles = data?.tadpoles ?? [];
  const projects = data?.projects ?? [];
  const grouped = /* @__PURE__ */ new Map();
  for (const tp of tadpoles) {
    const key = tp.project.alias;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(tp);
  }
  for (const [key, tpList] of grouped) {
    grouped.set(key, [...tpList].sort((a, b) => Number(b.active) - Number(a.active)));
  }
  const sortedEntries = [...grouped.entries()].sort(
    ([, a], [, b]) => Number(b.some((tp) => tp.active)) - Number(a.some((tp) => tp.active))
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.List, { isLoading, searchBarPlaceholder: "Filter tadpoles...", children: [
    projects.length === 0 && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_api2.List.EmptyView,
      {
        title: "No Projects Found",
        description: "Run `bufo init` to register a project.",
        icon: import_api2.Icon.Plus
      }
    ),
    tadpoles.length === 0 && projects.length > 0 && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_api2.List.EmptyView,
      {
        title: "No Tadpoles Found",
        description: "Open a tadpole with `bufo tp <N>` or use New Tadpole.",
        icon: import_api2.Icon.Desktop
      }
    ),
    sortedEntries.map(([alias, tpList]) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_api2.List.Section, { title: `@${alias}`, subtitle: `${tpList.length} tadpole(s)`, children: tpList.map((tp) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(TadpoleItem, { tp, revalidate }, `${alias}-${tp.number}`)) }, alias))
  ] });
}
function TadpoleItem({ tp, revalidate }) {
  const title = getTadpoleTitle(tp);
  const subtitle = getTadpoleSubtitle(tp);
  const accessories = [];
  if (tp.active) {
    accessories.push({ icon: { source: import_api2.Icon.Circle, tintColor: import_api2.Color.Green }, tooltip: "Active" });
  }
  if (tp.locked) {
    accessories.push({ icon: { source: import_api2.Icon.Lock, tintColor: import_api2.Color.Orange }, tooltip: "Locked" });
  }
  if (tp.meta?.type === "pr") {
    accessories.push({ tag: { value: `PR`, color: import_api2.Color.Purple } });
  } else if (tp.meta?.type === "ticket") {
    accessories.push({ tag: { value: tp.meta.ticket || "ticket", color: import_api2.Color.Blue } });
  }
  const icon = tp.active ? { source: import_api2.Icon.Terminal, tintColor: import_api2.Color.Green } : { source: import_api2.Icon.Terminal, tintColor: import_api2.Color.SecondaryText };
  const keywords = [
    tp.project.alias,
    tp.project.session_name,
    tp.branch,
    tp.meta?.ticket,
    tp.meta?.pr_title,
    tp.meta?.name,
    tp.customName
  ].filter((k) => !!k);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_api2.List.Item,
    {
      title,
      subtitle,
      icon,
      accessories,
      keywords,
      actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel.Section, { children: [
          tp.active && tp.state?.panes.terminal && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Focus Tadpole",
              icon: import_api2.Icon.Eye,
              onAction: async () => {
                focusSession(tp.state.panes.terminal);
                await (0, import_api2.closeMainWindow)();
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Open Tadpole",
              icon: import_api2.Icon.Play,
              shortcut: { modifiers: ["cmd"], key: "o" },
              onAction: async () => {
                await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Animated, title: "Opening tadpole..." });
                try {
                  await runBufoAsync(`@${tp.project.alias} tp ${tp.number}`);
                  await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Tadpole opened" });
                  revalidate();
                } catch (e) {
                  await (0, import_api2.showToast)({
                    style: import_api2.Toast.Style.Failure,
                    title: "Failed to open",
                    message: String(e)
                  });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel.Section, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: tp.locked ? "Unlock Tadpole" : "Lock Tadpole",
              icon: tp.locked ? import_api2.Icon.LockUnlocked : import_api2.Icon.Lock,
              shortcut: { modifiers: ["cmd"], key: "l" },
              onAction: () => {
                const lockFile = (0, import_path3.join)(tp.directory, ".bufo-lock");
                if (tp.locked) {
                  try {
                    (0, import_fs3.unlinkSync)(lockFile);
                  } catch {
                  }
                } else {
                  (0, import_fs3.writeFileSync)(lockFile, "");
                }
                (0, import_api2.showToast)({
                  style: import_api2.Toast.Style.Success,
                  title: tp.locked ? "Unlocked" : "Locked"
                });
                revalidate();
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Copy Branch Name",
              icon: import_api2.Icon.Clipboard,
              shortcut: { modifiers: ["cmd"], key: "b" },
              onAction: async () => {
                await import_api2.Clipboard.copy(tp.branch);
                await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Branch copied" });
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel.Section, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Cleanup Tadpole",
              icon: import_api2.Icon.Trash,
              style: import_api2.Action.Style.Destructive,
              shortcut: { modifiers: ["cmd", "shift"], key: "c" },
              onAction: async () => {
                if (await (0, import_api2.confirmAlert)({
                  title: "Cleanup Tadpole?",
                  message: `This will close the window and reset @${tp.project.alias} tp${tp.number} to origin/main.`,
                  primaryAction: { title: "Cleanup", style: import_api2.Alert.ActionStyle.Destructive }
                })) {
                  await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Animated, title: "Cleaning up..." });
                  try {
                    await runBufoAsync(`@${tp.project.alias} tp ${tp.number} cleanup`);
                    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Cleaned up" });
                    revalidate();
                  } catch (e) {
                    await (0, import_api2.showToast)({
                      style: import_api2.Toast.Style.Failure,
                      title: "Cleanup failed",
                      message: String(e)
                    });
                  }
                }
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Destroy Tadpole",
              icon: import_api2.Icon.XMarkCircle,
              style: import_api2.Action.Style.Destructive,
              shortcut: { modifiers: ["cmd", "shift"], key: "d" },
              onAction: async () => {
                if (await (0, import_api2.confirmAlert)({
                  title: "Destroy Tadpole?",
                  message: `This will permanently remove @${tp.project.alias} tp${tp.number} and its git worktree. This cannot be undone.`,
                  primaryAction: { title: "Destroy", style: import_api2.Alert.ActionStyle.Destructive }
                })) {
                  await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Animated, title: "Destroying..." });
                  try {
                    await runBufoAsync(`@${tp.project.alias} tp ${tp.number} destroy`);
                    await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Destroyed" });
                    revalidate();
                  } catch (e) {
                    await (0, import_api2.showToast)({
                      style: import_api2.Toast.Style.Failure,
                      title: "Destroy failed",
                      message: String(e)
                    });
                  }
                }
              }
            }
          )
        ] })
      ] })
    }
  );
}
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3QtdGFkcG9sZXMudHN4IiwgIi4uL25vZGVfbW9kdWxlcy9kZXF1YWwvbGl0ZS9pbmRleC5tanMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2luZGV4LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VQcm9taXNlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VEZWVwTWVtby50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTGF0ZXN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9zaG93RmFpbHVyZVRvYXN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VDYWNoZWRTdGF0ZS50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaGVscGVycy50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy90eXBlLWhhc2hlci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQ2FjaGVkUHJvbWlzZS50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlRmV0Y2gudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2ZldGNoLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VFeGVjLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3NpZ25hbC1leGl0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VTdHJlYW1KU09OLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3N0cmVhbS1jaGFpbi50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy9zdHJlYW0tanNvbi50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlU1FMLnRzeCIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvc3FsLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VGb3JtLnRzeCIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQUkudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3VzZUZyZWNlbmN5U29ydGluZy50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTG9jYWxTdG9yYWdlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2luZGV4LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2F2YXRhci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9jb2xvci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9mYXZpY29uLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL3Byb2dyZXNzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9pbmRleC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvb2F1dGgvT0F1dGhTZXJ2aWNlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9wcm92aWRlcnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL29hdXRoL3dpdGhBY2Nlc3NUb2tlbi50c3giLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2NyZWF0ZURlZXBsaW5rLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjdXRlU1FMLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9ydW4tYXBwbGVzY3JpcHQudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3J1bi1wb3dlcnNoZWxsLXNjcmlwdC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvY2FjaGUudHMiLCAiLi4vc3JjL2xpYi9idWZvLnRzIiwgIi4uL3NyYy9saWIvY29uZmlnLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9qcy15YW1sL2Rpc3QvanMteWFtbC5tanMiLCAiLi4vc3JjL2xpYi9leGVjLnRzIiwgIi4uL3NyYy9saWIvaXRlcm0udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7XG4gIExpc3QsXG4gIEFjdGlvblBhbmVsLFxuICBBY3Rpb24sXG4gIEljb24sXG4gIENvbG9yLFxuICBDbGlwYm9hcmQsXG4gIHNob3dUb2FzdCxcbiAgVG9hc3QsXG4gIGNvbmZpcm1BbGVydCxcbiAgQWxlcnQsXG4gIGNsb3NlTWFpbldpbmRvdyxcbn0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuaW1wb3J0IHsgZ2V0QWxsVGFkcG9sZXMsIGdldFRhZHBvbGVUaXRsZSwgZ2V0VGFkcG9sZVN1YnRpdGxlIH0gZnJvbSBcIi4vbGliL2J1Zm9cIjtcbmltcG9ydCB7IGJ1Zm9FeGlzdHMgfSBmcm9tIFwiLi9saWIvY29uZmlnXCI7XG5pbXBvcnQgeyBmb2N1c1Nlc3Npb24gfSBmcm9tIFwiLi9saWIvaXRlcm1cIjtcbmltcG9ydCB7IHJ1bkJ1Zm9Bc3luYyB9IGZyb20gXCIuL2xpYi9leGVjXCI7XG5pbXBvcnQgdHlwZSB7IEJ1Zm9UYWRwb2xlIH0gZnJvbSBcIi4vbGliL3R5cGVzXCI7XG5pbXBvcnQgeyBleGlzdHNTeW5jLCB1bmxpbmtTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdFRhZHBvbGVzKCkge1xuICBpZiAoIWJ1Zm9FeGlzdHMoKSkge1xuICAgIHJldHVybiAoXG4gICAgICA8TGlzdD5cbiAgICAgICAgPExpc3QuRW1wdHlWaWV3XG4gICAgICAgICAgdGl0bGU9XCJCdWZvIE5vdCBDb25maWd1cmVkXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIlJ1biBgYnVmbyBpbml0YCBpbiB5b3VyIHRlcm1pbmFsIHRvIHNldCB1cCBidWZvLlwiXG4gICAgICAgICAgaWNvbj17SWNvbi5XYXJuaW5nfVxuICAgICAgICAvPlxuICAgICAgPC9MaXN0PlxuICAgICk7XG4gIH1cblxuICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgcmV2YWxpZGF0ZSB9ID0gdXNlQ2FjaGVkUHJvbWlzZShhc3luYyAoKSA9PiBnZXRBbGxUYWRwb2xlcygpLCBbXSwge1xuICAgIGtlZXBQcmV2aW91c0RhdGE6IHRydWUsXG4gIH0pO1xuXG4gIGNvbnN0IHRhZHBvbGVzID0gZGF0YT8udGFkcG9sZXMgPz8gW107XG4gIGNvbnN0IHByb2plY3RzID0gZGF0YT8ucHJvamVjdHMgPz8gW107XG5cbiAgLy8gR3JvdXAgYnkgcHJvamVjdCwgYWN0aXZlIHRhZHBvbGVzIGZpcnN0IHdpdGhpbiBlYWNoIGdyb3VwXG4gIGNvbnN0IGdyb3VwZWQgPSBuZXcgTWFwPHN0cmluZywgQnVmb1RhZHBvbGVbXT4oKTtcbiAgZm9yIChjb25zdCB0cCBvZiB0YWRwb2xlcykge1xuICAgIGNvbnN0IGtleSA9IHRwLnByb2plY3QuYWxpYXM7XG4gICAgaWYgKCFncm91cGVkLmhhcyhrZXkpKSBncm91cGVkLnNldChrZXksIFtdKTtcbiAgICBncm91cGVkLmdldChrZXkpIS5wdXNoKHRwKTtcbiAgfVxuICBmb3IgKGNvbnN0IFtrZXksIHRwTGlzdF0gb2YgZ3JvdXBlZCkge1xuICAgIGdyb3VwZWQuc2V0KGtleSwgWy4uLnRwTGlzdF0uc29ydCgoYSwgYikgPT4gTnVtYmVyKGIuYWN0aXZlKSAtIE51bWJlcihhLmFjdGl2ZSkpKTtcbiAgfVxuXG4gIC8vIFByb2plY3RzIHdpdGggYW55IGFjdGl2ZSB0YWRwb2xlcyBmaXJzdFxuICBjb25zdCBzb3J0ZWRFbnRyaWVzID0gWy4uLmdyb3VwZWQuZW50cmllcygpXS5zb3J0KFxuICAgIChbLCBhXSwgWywgYl0pID0+IE51bWJlcihiLnNvbWUoKHRwKSA9PiB0cC5hY3RpdmUpKSAtIE51bWJlcihhLnNvbWUoKHRwKSA9PiB0cC5hY3RpdmUpKVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHNlYXJjaEJhclBsYWNlaG9sZGVyPVwiRmlsdGVyIHRhZHBvbGVzLi4uXCI+XG4gICAgICB7cHJvamVjdHMubGVuZ3RoID09PSAwICYmICFpc0xvYWRpbmcgJiYgKFxuICAgICAgICA8TGlzdC5FbXB0eVZpZXdcbiAgICAgICAgICB0aXRsZT1cIk5vIFByb2plY3RzIEZvdW5kXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIlJ1biBgYnVmbyBpbml0YCB0byByZWdpc3RlciBhIHByb2plY3QuXCJcbiAgICAgICAgICBpY29uPXtJY29uLlBsdXN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3RhZHBvbGVzLmxlbmd0aCA9PT0gMCAmJiBwcm9qZWN0cy5sZW5ndGggPiAwICYmICFpc0xvYWRpbmcgJiYgKFxuICAgICAgICA8TGlzdC5FbXB0eVZpZXdcbiAgICAgICAgICB0aXRsZT1cIk5vIFRhZHBvbGVzIEZvdW5kXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIk9wZW4gYSB0YWRwb2xlIHdpdGggYGJ1Zm8gdHAgPE4+YCBvciB1c2UgTmV3IFRhZHBvbGUuXCJcbiAgICAgICAgICBpY29uPXtJY29uLkRlc2t0b3B9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3NvcnRlZEVudHJpZXMubWFwKChbYWxpYXMsIHRwTGlzdF0pID0+IChcbiAgICAgICAgPExpc3QuU2VjdGlvbiBrZXk9e2FsaWFzfSB0aXRsZT17YEAke2FsaWFzfWB9IHN1YnRpdGxlPXtgJHt0cExpc3QubGVuZ3RofSB0YWRwb2xlKHMpYH0+XG4gICAgICAgICAge3RwTGlzdC5tYXAoKHRwKSA9PiAoXG4gICAgICAgICAgICA8VGFkcG9sZUl0ZW0ga2V5PXtgJHthbGlhc30tJHt0cC5udW1iZXJ9YH0gdHA9e3RwfSByZXZhbGlkYXRlPXtyZXZhbGlkYXRlfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gVGFkcG9sZUl0ZW0oeyB0cCwgcmV2YWxpZGF0ZSB9OiB7IHRwOiBCdWZvVGFkcG9sZTsgcmV2YWxpZGF0ZTogKCkgPT4gdm9pZCB9KSB7XG4gIGNvbnN0IHRpdGxlID0gZ2V0VGFkcG9sZVRpdGxlKHRwKTtcbiAgY29uc3Qgc3VidGl0bGUgPSBnZXRUYWRwb2xlU3VidGl0bGUodHApO1xuXG4gIGNvbnN0IGFjY2Vzc29yaWVzOiBMaXN0Lkl0ZW0uQWNjZXNzb3J5W10gPSBbXTtcbiAgaWYgKHRwLmFjdGl2ZSkge1xuICAgIGFjY2Vzc29yaWVzLnB1c2goeyBpY29uOiB7IHNvdXJjZTogSWNvbi5DaXJjbGUsIHRpbnRDb2xvcjogQ29sb3IuR3JlZW4gfSwgdG9vbHRpcDogXCJBY3RpdmVcIiB9KTtcbiAgfVxuICBpZiAodHAubG9ja2VkKSB7XG4gICAgYWNjZXNzb3JpZXMucHVzaCh7IGljb246IHsgc291cmNlOiBJY29uLkxvY2ssIHRpbnRDb2xvcjogQ29sb3IuT3JhbmdlIH0sIHRvb2x0aXA6IFwiTG9ja2VkXCIgfSk7XG4gIH1cbiAgaWYgKHRwLm1ldGE/LnR5cGUgPT09IFwicHJcIikge1xuICAgIGFjY2Vzc29yaWVzLnB1c2goeyB0YWc6IHsgdmFsdWU6IGBQUmAsIGNvbG9yOiBDb2xvci5QdXJwbGUgfSB9KTtcbiAgfSBlbHNlIGlmICh0cC5tZXRhPy50eXBlID09PSBcInRpY2tldFwiKSB7XG4gICAgYWNjZXNzb3JpZXMucHVzaCh7IHRhZzogeyB2YWx1ZTogdHAubWV0YS50aWNrZXQgfHwgXCJ0aWNrZXRcIiwgY29sb3I6IENvbG9yLkJsdWUgfSB9KTtcbiAgfVxuXG4gIGNvbnN0IGljb24gPSB0cC5hY3RpdmVcbiAgICA/IHsgc291cmNlOiBJY29uLlRlcm1pbmFsLCB0aW50Q29sb3I6IENvbG9yLkdyZWVuIH1cbiAgICA6IHsgc291cmNlOiBJY29uLlRlcm1pbmFsLCB0aW50Q29sb3I6IENvbG9yLlNlY29uZGFyeVRleHQgfTtcblxuICBjb25zdCBrZXl3b3JkcyA9IFtcbiAgICB0cC5wcm9qZWN0LmFsaWFzLFxuICAgIHRwLnByb2plY3Quc2Vzc2lvbl9uYW1lLFxuICAgIHRwLmJyYW5jaCxcbiAgICB0cC5tZXRhPy50aWNrZXQsXG4gICAgdHAubWV0YT8ucHJfdGl0bGUsXG4gICAgdHAubWV0YT8ubmFtZSxcbiAgICB0cC5jdXN0b21OYW1lLFxuICBdLmZpbHRlcigoayk6IGsgaXMgc3RyaW5nID0+ICEhayk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdC5JdGVtXG4gICAgICB0aXRsZT17dGl0bGV9XG4gICAgICBzdWJ0aXRsZT17c3VidGl0bGV9XG4gICAgICBpY29uPXtpY29ufVxuICAgICAgYWNjZXNzb3JpZXM9e2FjY2Vzc29yaWVzfVxuICAgICAga2V5d29yZHM9e2tleXdvcmRzfVxuICAgICAgYWN0aW9ucz17XG4gICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICA8QWN0aW9uUGFuZWwuU2VjdGlvbj5cbiAgICAgICAgICAgIHt0cC5hY3RpdmUgJiYgdHAuc3RhdGU/LnBhbmVzLnRlcm1pbmFsICYmIChcbiAgICAgICAgICAgICAgPEFjdGlvblxuICAgICAgICAgICAgICAgIHRpdGxlPVwiRm9jdXMgVGFkcG9sZVwiXG4gICAgICAgICAgICAgICAgaWNvbj17SWNvbi5FeWV9XG4gICAgICAgICAgICAgICAgb25BY3Rpb249e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGZvY3VzU2Vzc2lvbih0cC5zdGF0ZSEucGFuZXMudGVybWluYWwpO1xuICAgICAgICAgICAgICAgICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiT3BlbiBUYWRwb2xlXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5QbGF5fVxuICAgICAgICAgICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcIm9cIiB9fVxuICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiT3BlbmluZyB0YWRwb2xlLi4uXCIgfSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHJ1bkJ1Zm9Bc3luYyhgQCR7dHAucHJvamVjdC5hbGlhc30gdHAgJHt0cC5udW1iZXJ9YCk7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6IFwiVGFkcG9sZSBvcGVuZWRcIiB9KTtcbiAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRmFpbGVkIHRvIG9wZW5cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogU3RyaW5nKGUpLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgPEFjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPXt0cC5sb2NrZWQgPyBcIlVubG9jayBUYWRwb2xlXCIgOiBcIkxvY2sgVGFkcG9sZVwifVxuICAgICAgICAgICAgICBpY29uPXt0cC5sb2NrZWQgPyBJY29uLkxvY2tVbmxvY2tlZCA6IEljb24uTG9ja31cbiAgICAgICAgICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIl0sIGtleTogXCJsXCIgfX1cbiAgICAgICAgICAgICAgb25BY3Rpb249eygpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NrRmlsZSA9IGpvaW4odHAuZGlyZWN0b3J5LCBcIi5idWZvLWxvY2tcIik7XG4gICAgICAgICAgICAgICAgaWYgKHRwLmxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdW5saW5rU3luYyhsb2NrRmlsZSk7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgICAgICAgLyogYWxyZWFkeSB1bmxvY2tlZCAqL1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB3cml0ZUZpbGVTeW5jKGxvY2tGaWxlLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLFxuICAgICAgICAgICAgICAgICAgdGl0bGU6IHRwLmxvY2tlZCA/IFwiVW5sb2NrZWRcIiA6IFwiTG9ja2VkXCIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxBY3Rpb25cbiAgICAgICAgICAgICAgdGl0bGU9XCJDb3B5IEJyYW5jaCBOYW1lXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5DbGlwYm9hcmR9XG4gICAgICAgICAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiYlwiIH19XG4gICAgICAgICAgICAgIG9uQWN0aW9uPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgQ2xpcGJvYXJkLmNvcHkodHAuYnJhbmNoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6IFwiQnJhbmNoIGNvcGllZFwiIH0pO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgPEFjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiQ2xlYW51cCBUYWRwb2xlXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5UcmFzaH1cbiAgICAgICAgICAgICAgc3R5bGU9e0FjdGlvbi5TdHlsZS5EZXN0cnVjdGl2ZX1cbiAgICAgICAgICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIiwgXCJzaGlmdFwiXSwga2V5OiBcImNcIiB9fVxuICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbmZpcm1BbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkNsZWFudXAgVGFkcG9sZT9cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFRoaXMgd2lsbCBjbG9zZSB0aGUgd2luZG93IGFuZCByZXNldCBAJHt0cC5wcm9qZWN0LmFsaWFzfSB0cCR7dHAubnVtYmVyfSB0byBvcmlnaW4vbWFpbi5gLFxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QWN0aW9uOiB7IHRpdGxlOiBcIkNsZWFudXBcIiwgc3R5bGU6IEFsZXJ0LkFjdGlvblN0eWxlLkRlc3RydWN0aXZlIH0sXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLCB0aXRsZTogXCJDbGVhbmluZyB1cC4uLlwiIH0pO1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcnVuQnVmb0FzeW5jKGBAJHt0cC5wcm9qZWN0LmFsaWFzfSB0cCAke3RwLm51bWJlcn0gY2xlYW51cGApO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6IFwiQ2xlYW5lZCB1cFwiIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQ2xlYW51cCBmYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBTdHJpbmcoZSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVzdHJveSBUYWRwb2xlXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5YTWFya0NpcmNsZX1cbiAgICAgICAgICAgICAgc3R5bGU9e0FjdGlvbi5TdHlsZS5EZXN0cnVjdGl2ZX1cbiAgICAgICAgICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIiwgXCJzaGlmdFwiXSwga2V5OiBcImRcIiB9fVxuICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbmZpcm1BbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlc3Ryb3kgVGFkcG9sZT9cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFRoaXMgd2lsbCBwZXJtYW5lbnRseSByZW1vdmUgQCR7dHAucHJvamVjdC5hbGlhc30gdHAke3RwLm51bWJlcn0gYW5kIGl0cyBnaXQgd29ya3RyZWUuIFRoaXMgY2Fubm90IGJlIHVuZG9uZS5gLFxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QWN0aW9uOiB7IHRpdGxlOiBcIkRlc3Ryb3lcIiwgc3R5bGU6IEFsZXJ0LkFjdGlvblN0eWxlLkRlc3RydWN0aXZlIH0sXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLCB0aXRsZTogXCJEZXN0cm95aW5nLi4uXCIgfSk7XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBydW5CdWZvQXN5bmMoYEAke3RwLnByb2plY3QuYWxpYXN9IHRwICR7dHAubnVtYmVyfSBkZXN0cm95YCk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJEZXN0cm95ZWRcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlc3Ryb3kgZmFpbGVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogU3RyaW5nKGUpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWwuU2VjdGlvbj5cbiAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgIH1cbiAgICAvPlxuICApO1xufVxuIiwgInZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5leHBvcnQgZnVuY3Rpb24gZGVxdWFsKGZvbywgYmFyKSB7XG5cdHZhciBjdG9yLCBsZW47XG5cdGlmIChmb28gPT09IGJhcikgcmV0dXJuIHRydWU7XG5cblx0aWYgKGZvbyAmJiBiYXIgJiYgKGN0b3I9Zm9vLmNvbnN0cnVjdG9yKSA9PT0gYmFyLmNvbnN0cnVjdG9yKSB7XG5cdFx0aWYgKGN0b3IgPT09IERhdGUpIHJldHVybiBmb28uZ2V0VGltZSgpID09PSBiYXIuZ2V0VGltZSgpO1xuXHRcdGlmIChjdG9yID09PSBSZWdFeHApIHJldHVybiBmb28udG9TdHJpbmcoKSA9PT0gYmFyLnRvU3RyaW5nKCk7XG5cblx0XHRpZiAoY3RvciA9PT0gQXJyYXkpIHtcblx0XHRcdGlmICgobGVuPWZvby5sZW5ndGgpID09PSBiYXIubGVuZ3RoKSB7XG5cdFx0XHRcdHdoaWxlIChsZW4tLSAmJiBkZXF1YWwoZm9vW2xlbl0sIGJhcltsZW5dKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbGVuID09PSAtMTtcblx0XHR9XG5cblx0XHRpZiAoIWN0b3IgfHwgdHlwZW9mIGZvbyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdGxlbiA9IDA7XG5cdFx0XHRmb3IgKGN0b3IgaW4gZm9vKSB7XG5cdFx0XHRcdGlmIChoYXMuY2FsbChmb28sIGN0b3IpICYmICsrbGVuICYmICFoYXMuY2FsbChiYXIsIGN0b3IpKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlmICghKGN0b3IgaW4gYmFyKSB8fCAhZGVxdWFsKGZvb1tjdG9yXSwgYmFyW2N0b3JdKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKGJhcikubGVuZ3RoID09PSBsZW47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGZvbyAhPT0gZm9vICYmIGJhciAhPT0gYmFyO1xufVxuIiwgIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwibm9kZVwiIC8+XG5cbmV4cG9ydCB7IHVzZVByb21pc2UgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5leHBvcnQgeyB1c2VDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUNhY2hlZFN0YXRlXCI7XG5leHBvcnQgeyB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSBcIi4vdXNlQ2FjaGVkUHJvbWlzZVwiO1xuZXhwb3J0IHsgdXNlRmV0Y2ggfSBmcm9tIFwiLi91c2VGZXRjaFwiO1xuZXhwb3J0IHsgdXNlRXhlYyB9IGZyb20gXCIuL3VzZUV4ZWNcIjtcbmV4cG9ydCB7IHVzZVN0cmVhbUpTT04gfSBmcm9tIFwiLi91c2VTdHJlYW1KU09OXCI7XG5leHBvcnQgeyB1c2VTUUwgfSBmcm9tIFwiLi91c2VTUUxcIjtcbmV4cG9ydCB7IHVzZUZvcm0sIEZvcm1WYWxpZGF0aW9uIH0gZnJvbSBcIi4vdXNlRm9ybVwiO1xuZXhwb3J0IHsgdXNlQUkgfSBmcm9tIFwiLi91c2VBSVwiO1xuZXhwb3J0IHsgdXNlRnJlY2VuY3lTb3J0aW5nIH0gZnJvbSBcIi4vdXNlRnJlY2VuY3lTb3J0aW5nXCI7XG5leHBvcnQgeyB1c2VMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiLi91c2VMb2NhbFN0b3JhZ2VcIjtcblxuZXhwb3J0IHsgZ2V0QXZhdGFySWNvbiwgZ2V0RmF2aWNvbiwgZ2V0UHJvZ3Jlc3NJY29uIH0gZnJvbSBcIi4vaWNvblwiO1xuXG5leHBvcnQgeyBPQXV0aFNlcnZpY2UsIHdpdGhBY2Nlc3NUb2tlbiwgZ2V0QWNjZXNzVG9rZW4gfSBmcm9tIFwiLi9vYXV0aFwiO1xuXG5leHBvcnQgeyBjcmVhdGVEZWVwbGluaywgY3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmssIGNyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGluaywgRGVlcGxpbmtUeXBlIH0gZnJvbSBcIi4vY3JlYXRlRGVlcGxpbmtcIjtcbmV4cG9ydCB7IGV4ZWN1dGVTUUwgfSBmcm9tIFwiLi9leGVjdXRlU1FMXCI7XG5leHBvcnQgeyBydW5BcHBsZVNjcmlwdCB9IGZyb20gXCIuL3J1bi1hcHBsZXNjcmlwdFwiO1xuZXhwb3J0IHsgcnVuUG93ZXJTaGVsbFNjcmlwdCB9IGZyb20gXCIuL3J1bi1wb3dlcnNoZWxsLXNjcmlwdFwiO1xuZXhwb3J0IHsgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCIuL3Nob3dGYWlsdXJlVG9hc3RcIjtcbmV4cG9ydCB7IHdpdGhDYWNoZSB9IGZyb20gXCIuL2NhY2hlXCI7XG5cbmV4cG9ydCB0eXBlIHsgUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5leHBvcnQgdHlwZSB7IENhY2hlZFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlQ2FjaGVkUHJvbWlzZVwiO1xuZXhwb3J0IHR5cGUge1xuICBPQXV0aFNlcnZpY2VPcHRpb25zLFxuICBPbkF1dGhvcml6ZVBhcmFtcyxcbiAgV2l0aEFjY2Vzc1Rva2VuQ29tcG9uZW50T3JGbixcbiAgUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMsXG4gIFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcIi4vb2F1dGhcIjtcbmV4cG9ydCB0eXBlIHsgQXN5bmNTdGF0ZSwgTXV0YXRlUHJvbWlzZSB9IGZyb20gXCIuL3R5cGVzXCI7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VDYWxsYmFjaywgUmVmT2JqZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCwgTGF1bmNoVHlwZSwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VEZWVwTWVtbyB9IGZyb20gXCIuL3VzZURlZXBNZW1vXCI7XG5pbXBvcnQge1xuICBGdW5jdGlvblJldHVybmluZ1Byb21pc2UsXG4gIE11dGF0ZVByb21pc2UsXG4gIFVzZVByb21pc2VSZXR1cm5UeXBlLFxuICBBc3luY1N0YXRlLFxuICBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsXG4gIFVud3JhcFJldHVybixcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiLi9zaG93RmFpbHVyZVRvYXN0XCI7XG5cbmV4cG9ydCB0eXBlIFByb21pc2VPcHRpb25zPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UgfCBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U+ID0ge1xuICAvKipcbiAgICogQSByZWZlcmVuY2UgdG8gYW4gYEFib3J0Q29udHJvbGxlcmAgdG8gY2FuY2VsIGEgcHJldmlvdXMgY2FsbCB3aGVuIHRyaWdnZXJpbmcgYSBuZXcgb25lXG4gICAqL1xuICBhYm9ydGFibGU/OiBSZWZPYmplY3Q8QWJvcnRDb250cm9sbGVyIHwgbnVsbCB8IHVuZGVmaW5lZD47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGFjdHVhbGx5IGV4ZWN1dGUgdGhlIGZ1bmN0aW9uIG9yIG5vdC5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGNhc2VzIHdoZXJlIG9uZSBvZiB0aGUgZnVuY3Rpb24ncyBhcmd1bWVudHMgZGVwZW5kcyBvbiBzb21ldGhpbmcgdGhhdFxuICAgKiBtaWdodCBub3QgYmUgYXZhaWxhYmxlIHJpZ2h0IGF3YXkgKGZvciBleGFtcGxlLCBkZXBlbmRzIG9uIHNvbWUgdXNlciBpbnB1dHMpLiBCZWNhdXNlIFJlYWN0IHJlcXVpcmVzXG4gICAqIGV2ZXJ5IGhvb2tzIHRvIGJlIGRlZmluZWQgb24gdGhlIHJlbmRlciwgdGhpcyBmbGFnIGVuYWJsZXMgeW91IHRvIGRlZmluZSB0aGUgaG9vayByaWdodCBhd2F5IGJ1dFxuICAgKiB3YWl0IHV0aWwgeW91IGhhdmUgYWxsIHRoZSBhcmd1bWVudHMgcmVhZHkgdG8gZXhlY3V0ZSB0aGUgZnVuY3Rpb24uXG4gICAqL1xuICBleGVjdXRlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIE9wdGlvbnMgZm9yIHRoZSBnZW5lcmljIGZhaWx1cmUgdG9hc3QuXG4gICAqIEl0IGFsbG93cyB5b3UgdG8gY3VzdG9taXplIHRoZSB0aXRsZSwgbWVzc2FnZSwgYW5kIHByaW1hcnkgYWN0aW9uIG9mIHRoZSBmYWlsdXJlIHRvYXN0LlxuICAgKi9cbiAgZmFpbHVyZVRvYXN0T3B0aW9ucz86IFBhcnRpYWw8UGljazxUb2FzdC5PcHRpb25zLCBcInRpdGxlXCIgfCBcInByaW1hcnlBY3Rpb25cIiB8IFwibWVzc2FnZVwiPj47XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBleGVjdXRpb24gZmFpbHMuIEJ5IGRlZmF1bHQgaXQgd2lsbCBsb2cgdGhlIGVycm9yIGFuZCBzaG93XG4gICAqIGEgZ2VuZXJpYyBmYWlsdXJlIHRvYXN0LlxuICAgKi9cbiAgb25FcnJvcj86IChlcnJvcjogRXJyb3IpID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXhlY3V0aW9uIHN1Y2NlZWRzLlxuICAgKi9cbiAgb25EYXRhPzogKGRhdGE6IFVud3JhcFJldHVybjxUPiwgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25PcHRpb25zPFVud3JhcFJldHVybjxUPj4pID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+O1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXhlY3V0aW9uIHdpbGwgc3RhcnRcbiAgICovXG4gIG9uV2lsbEV4ZWN1dGU/OiAocGFyYW1ldGVyczogUGFyYW1ldGVyczxUPikgPT4gdm9pZDtcbn07XG5cbi8qKlxuICogV3JhcHMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBpbiBhbm90aGVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZnVuY3Rpb24uXG4gKlxuICogQHJlbWFyayBUaGlzIG92ZXJsb2FkIHNob3VsZCBiZSB1c2VkIHdoZW4gd29ya2luZyB3aXRoIHBhZ2luYXRlZCBkYXRhIHNvdXJjZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgc2V0VGltZW91dCB9IGZyb20gXCJub2RlOnRpbWVycy9wcm9taXNlc1wiO1xuICogaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbiAqIGltcG9ydCB7IExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VQcm9taXNlIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUoXCJcIik7XG4gKlxuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcGFnaW5hdGlvbiB9ID0gdXNlUHJvbWlzZShcbiAqICAgICAoc2VhcmNoVGV4dDogc3RyaW5nKSA9PiBhc3luYyAob3B0aW9uczogeyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICogICAgICAgYXdhaXQgc2V0VGltZW91dCgyMDApO1xuICogICAgICAgY29uc3QgbmV3RGF0YSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI1IH0sIChfdiwgaW5kZXgpID0+ICh7XG4gKiAgICAgICAgIGluZGV4LFxuICogICAgICAgICBwYWdlOiBvcHRpb25zLnBhZ2UsXG4gKiAgICAgICAgIHRleHQ6IHNlYXJjaFRleHQsXG4gKiAgICAgICB9KSk7XG4gKiAgICAgICByZXR1cm4geyBkYXRhOiBuZXdEYXRhLCBoYXNNb3JlOiBvcHRpb25zLnBhZ2UgPCAxMCB9O1xuICogICAgIH0sXG4gKiAgICAgW3NlYXJjaFRleHRdXG4gKiAgICk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBvblNlYXJjaFRleHRDaGFuZ2U9e3NldFNlYXJjaFRleHR9IHBhZ2luYXRpb249e3BhZ2luYXRpb259PlxuICogICAgICAge2RhdGE/Lm1hcCgoaXRlbSkgPT4gKFxuICogICAgICAgICA8TGlzdC5JdGVtXG4gKiAgICAgICAgICAga2V5PXtgJHtpdGVtLnBhZ2V9ICR7aXRlbS5pbmRleH0gJHtpdGVtLnRleHR9YH1cbiAqICAgICAgICAgICB0aXRsZT17YFBhZ2UgJHtpdGVtLnBhZ2V9IEl0ZW0gJHtpdGVtLmluZGV4fWB9XG4gKiAgICAgICAgICAgc3VidGl0bGU9e2l0ZW0udGV4dH1cbiAqICAgICAgICAgLz5cbiAqICAgICAgICkpfVxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZTxbXT4+KFxuICBmbjogVCxcbik6IFVzZVByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPj47XG5leHBvcnQgZnVuY3Rpb24gdXNlUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPihcbiAgZm46IFQsXG4gIGFyZ3M6IFBhcmFtZXRlcnM8VD4sXG4gIG9wdGlvbnM/OiBQcm9taXNlT3B0aW9uczxUPixcbik6IFVzZVByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPj47XG5cbi8qKlxuICogV3JhcHMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZnVuY3Rpb24uXG4gKlxuICogQHJlbWFyayBUaGUgZnVuY3Rpb24gaXMgYXNzdW1lZCB0byBiZSBjb25zdGFudCAoZWcuIGNoYW5naW5nIGl0IHdvbid0IHRyaWdnZXIgYSByZXZhbGlkYXRpb24pLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHVzZVByb21pc2UgfSBmcm9tICdAcmF5Y2FzdC91dGlscyc7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4oKTtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHJldmFsaWRhdGUgfSA9IHVzZVByb21pc2UoYXN5bmMgKHVybDogc3RyaW5nKSA9PiB7XG4gKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsIH0pO1xuICogICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAqICAgICByZXR1cm4gcmVzdWx0XG4gKiAgIH0sXG4gKiAgIFsnaHR0cHM6Ly9hcGkuZXhhbXBsZSddLFxuICogICB7XG4gKiAgICAgYWJvcnRhYmxlXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8RGV0YWlsXG4gKiAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAqICAgICAgIG1hcmtkb3duPXtkYXRhfVxuICogICAgICAgYWN0aW9ucz17XG4gKiAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiUmVsb2FkXCIgb25BY3Rpb249eygpID0+IHJldmFsaWRhdGUoKX0gLz5cbiAqICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAqICAgICAgIH1cbiAqICAgICAvPlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlPFtdPj4oZm46IFQpOiBVc2VQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZT4oXG4gIGZuOiBULFxuICBhcmdzOiBQYXJhbWV0ZXJzPFQ+LFxuICBvcHRpb25zPzogUHJvbWlzZU9wdGlvbnM8VD4sXG4pOiBVc2VQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4+O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlIHwgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPihcbiAgZm46IFQsXG4gIGFyZ3M/OiBQYXJhbWV0ZXJzPFQ+LFxuICBvcHRpb25zPzogUHJvbWlzZU9wdGlvbnM8VD4sXG4pOiBVc2VQcm9taXNlUmV0dXJuVHlwZTxhbnk+IHtcbiAgY29uc3QgbGFzdENhbGxJZCA9IHVzZVJlZigwKTtcbiAgY29uc3QgW3N0YXRlLCBzZXRdID0gdXNlU3RhdGU8QXN5bmNTdGF0ZTxVbndyYXBSZXR1cm48VD4+Pih7IGlzTG9hZGluZzogdHJ1ZSB9KTtcblxuICBjb25zdCBmblJlZiA9IHVzZUxhdGVzdChmbik7XG4gIGNvbnN0IGxhdGVzdEFib3J0YWJsZSA9IHVzZUxhdGVzdChvcHRpb25zPy5hYm9ydGFibGUpO1xuICBjb25zdCBsYXRlc3RBcmdzID0gdXNlTGF0ZXN0KGFyZ3MgfHwgW10pO1xuICBjb25zdCBsYXRlc3RPbkVycm9yID0gdXNlTGF0ZXN0KG9wdGlvbnM/Lm9uRXJyb3IpO1xuICBjb25zdCBsYXRlc3RPbkRhdGEgPSB1c2VMYXRlc3Qob3B0aW9ucz8ub25EYXRhKTtcbiAgY29uc3QgbGF0ZXN0T25XaWxsRXhlY3V0ZSA9IHVzZUxhdGVzdChvcHRpb25zPy5vbldpbGxFeGVjdXRlKTtcbiAgY29uc3QgbGF0ZXN0RmFpbHVyZVRvYXN0ID0gdXNlTGF0ZXN0KG9wdGlvbnM/LmZhaWx1cmVUb2FzdE9wdGlvbnMpO1xuICBjb25zdCBsYXRlc3RWYWx1ZSA9IHVzZUxhdGVzdChzdGF0ZS5kYXRhKTtcbiAgY29uc3QgbGF0ZXN0Q2FsbGJhY2sgPSB1c2VSZWY8KC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pID0+IFByb21pc2U8VW53cmFwUmV0dXJuPFQ+Pj4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkFyZ3NSZWYgPSB1c2VSZWY8UGFnaW5hdGlvbk9wdGlvbnM+KHsgcGFnZTogMCB9KTtcbiAgY29uc3QgdXNlUGFnaW5hdGlvblJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGhhc01vcmVSZWYgPSB1c2VSZWYodHJ1ZSk7XG4gIGNvbnN0IHBhZ2VTaXplUmVmID0gdXNlUmVmKDUwKTtcblxuICBjb25zdCBhYm9ydCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobGF0ZXN0QWJvcnRhYmxlLmN1cnJlbnQpIHtcbiAgICAgIGxhdGVzdEFib3J0YWJsZS5jdXJyZW50LmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBsYXRlc3RBYm9ydGFibGUuY3VycmVudC5jdXJyZW50ID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIH1cbiAgICByZXR1cm4gKytsYXN0Q2FsbElkLmN1cnJlbnQ7XG4gIH0sIFtsYXRlc3RBYm9ydGFibGVdKTtcblxuICBjb25zdCBjYWxsYmFjayA9IHVzZUNhbGxiYWNrKFxuICAgICguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KTogUHJvbWlzZTxVbndyYXBSZXR1cm48VD4+ID0+IHtcbiAgICAgIGNvbnN0IGNhbGxJZCA9IGFib3J0KCk7XG5cbiAgICAgIGxhdGVzdE9uV2lsbEV4ZWN1dGUuY3VycmVudD8uKGFyZ3MpO1xuXG4gICAgICBzZXQoKHByZXZTdGF0ZSkgPT4gKHsgLi4ucHJldlN0YXRlLCBpc0xvYWRpbmc6IHRydWUgfSkpO1xuXG4gICAgICBjb25zdCBwcm9taXNlT3JQYWdpbmF0ZWRQcm9taXNlID0gYmluZFByb21pc2VJZk5lZWRlZChmblJlZi5jdXJyZW50KSguLi5hcmdzKTtcblxuICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3I6IGFueSkge1xuICAgICAgICBpZiAoZXJyb3IubmFtZSA9PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsSWQgPT09IGxhc3RDYWxsSWQuY3VycmVudCkge1xuICAgICAgICAgIC8vIGhhbmRsZSBlcnJvcnNcbiAgICAgICAgICBpZiAobGF0ZXN0T25FcnJvci5jdXJyZW50KSB7XG4gICAgICAgICAgICBsYXRlc3RPbkVycm9yLmN1cnJlbnQoZXJyb3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZW52aXJvbm1lbnQubGF1bmNoVHlwZSAhPT0gTGF1bmNoVHlwZS5CYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICAgIHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHtcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJGYWlsZWQgdG8gZmV0Y2ggbGF0ZXN0IGRhdGFcIixcbiAgICAgICAgICAgICAgICBwcmltYXJ5QWN0aW9uOiB7XG4gICAgICAgICAgICAgICAgICB0aXRsZTogXCJSZXRyeVwiLFxuICAgICAgICAgICAgICAgICAgb25BY3Rpb24odG9hc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9hc3QuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBsYXRlc3RDYWxsYmFjay5jdXJyZW50Py4oLi4uKChsYXRlc3RBcmdzLmN1cnJlbnQgfHwgW10pIGFzIFBhcmFtZXRlcnM8VD4pKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAuLi5sYXRlc3RGYWlsdXJlVG9hc3QuY3VycmVudCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldCh7IGVycm9yLCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHByb21pc2VPclBhZ2luYXRlZFByb21pc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB1c2VQYWdpbmF0aW9uUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcHJvbWlzZU9yUGFnaW5hdGVkUHJvbWlzZShwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50KS50aGVuKFxuICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdG9vIGNvbXBsaWNhdGVkIGZvciBUU1xuICAgICAgICAgICh7IGRhdGEsIGhhc01vcmUsIGN1cnNvciB9OiB7IGRhdGE6IFVud3JhcFJldHVybjxUPjsgaGFzTW9yZTogYm9vbGVhbjsgY3Vyc29yPzogYW55IH0pID0+IHtcbiAgICAgICAgICAgIGlmIChjYWxsSWQgPT09IGxhc3RDYWxsSWQuY3VycmVudCkge1xuICAgICAgICAgICAgICBpZiAocGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQuY3Vyc29yID0gY3Vyc29yO1xuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQubGFzdEl0ZW0gPSBkYXRhPy5bZGF0YS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChsYXRlc3RPbkRhdGEuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIGxhdGVzdE9uRGF0YS5jdXJyZW50KGRhdGEsIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGhhc01vcmUpIHtcbiAgICAgICAgICAgICAgICBwYWdlU2l6ZVJlZi5jdXJyZW50ID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gaGFzTW9yZTtcblxuICAgICAgICAgICAgICBzZXQoKHByZXZpb3VzRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50LnBhZ2UgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGEsIGlzTG9hZGluZzogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSBrbm93IGl0J3MgYW4gYXJyYXkgaGVyZVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IChwcmV2aW91c0RhdGEuZGF0YSB8fCBbXSk/LmNvbmNhdChkYXRhKSwgaXNMb2FkaW5nOiBmYWxzZSB9O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3I6IHVua25vd24pID0+IHtcbiAgICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZUVycm9yKGVycm9yKTtcbiAgICAgICAgICB9LFxuICAgICAgICApIGFzIFByb21pc2U8VW53cmFwUmV0dXJuPFQ+PjtcbiAgICAgIH1cblxuICAgICAgdXNlUGFnaW5hdGlvblJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICByZXR1cm4gcHJvbWlzZU9yUGFnaW5hdGVkUHJvbWlzZS50aGVuKChkYXRhOiBVbndyYXBSZXR1cm48VD4pID0+IHtcbiAgICAgICAgaWYgKGNhbGxJZCA9PT0gbGFzdENhbGxJZC5jdXJyZW50KSB7XG4gICAgICAgICAgaWYgKGxhdGVzdE9uRGF0YS5jdXJyZW50KSB7XG4gICAgICAgICAgICBsYXRlc3RPbkRhdGEuY3VycmVudChkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0KHsgZGF0YSwgaXNMb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSwgaGFuZGxlRXJyb3IpIGFzIFByb21pc2U8VW53cmFwUmV0dXJuPFQ+PjtcbiAgICB9LFxuICAgIFtcbiAgICAgIGxhdGVzdE9uRGF0YSxcbiAgICAgIGxhdGVzdE9uRXJyb3IsXG4gICAgICBsYXRlc3RBcmdzLFxuICAgICAgZm5SZWYsXG4gICAgICBzZXQsXG4gICAgICBsYXRlc3RDYWxsYmFjayxcbiAgICAgIGxhdGVzdE9uV2lsbEV4ZWN1dGUsXG4gICAgICBwYWdpbmF0aW9uQXJnc1JlZixcbiAgICAgIGxhdGVzdEZhaWx1cmVUb2FzdCxcbiAgICAgIGFib3J0LFxuICAgIF0sXG4gICk7XG5cbiAgbGF0ZXN0Q2FsbGJhY2suY3VycmVudCA9IGNhbGxiYWNrO1xuXG4gIGNvbnN0IHJldmFsaWRhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgLy8gcmVzZXQgdGhlIHBhZ2luYXRpb25cbiAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50ID0geyBwYWdlOiAwIH07XG5cbiAgICBjb25zdCBhcmdzID0gKGxhdGVzdEFyZ3MuY3VycmVudCB8fCBbXSkgYXMgUGFyYW1ldGVyczxUPjtcbiAgICByZXR1cm4gY2FsbGJhY2soLi4uYXJncyk7XG4gIH0sIFtjYWxsYmFjaywgbGF0ZXN0QXJnc10pO1xuXG4gIGNvbnN0IG11dGF0ZSA9IHVzZUNhbGxiYWNrPE11dGF0ZVByb21pc2U8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+PiwgdW5kZWZpbmVkPj4oXG4gICAgYXN5bmMgKGFzeW5jVXBkYXRlLCBvcHRpb25zKSA9PiB7XG4gICAgICBsZXQgZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGU6IEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4gfCB1bmRlZmluZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob3B0aW9ucz8ub3B0aW1pc3RpY1VwZGF0ZSkge1xuICAgICAgICAgIC8vIGNhbmNlbCB0aGUgaW4tZmxpZ2h0IHJlcXVlc3QgdG8gbWFrZSBzdXJlIGl0IHdvbid0IG92ZXJ3cml0ZSB0aGUgb3B0aW1pc3RpYyB1cGRhdGVcbiAgICAgICAgICBhYm9ydCgpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IFwiZnVuY3Rpb25cIiAmJiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBkYXRhIGJlZm9yZSB0aGUgb3B0aW1pc3RpYyB1cGRhdGUsXG4gICAgICAgICAgICAvLyBidXQgb25seSBpZiB3ZSBuZWVkIGl0IChlZy4gb25seSB3aGVuIHdlIHdhbnQgdG8gYXV0b21hdGljYWxseSByb2xsYmFjayBhZnRlcilcbiAgICAgICAgICAgIGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlID0gc3RydWN0dXJlZENsb25lKGxhdGVzdFZhbHVlLmN1cnJlbnQ/LnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdXBkYXRlID0gb3B0aW9ucy5vcHRpbWlzdGljVXBkYXRlO1xuICAgICAgICAgIHNldCgocHJldlN0YXRlKSA9PiAoeyAuLi5wcmV2U3RhdGUsIGRhdGE6IHVwZGF0ZShwcmV2U3RhdGUuZGF0YSkgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCBhc3luY1VwZGF0ZTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlID0gb3B0aW9ucy5yb2xsYmFja09uRXJyb3I7XG4gICAgICAgICAgc2V0KChwcmV2U3RhdGUpID0+ICh7IC4uLnByZXZTdGF0ZSwgZGF0YTogdXBkYXRlKHByZXZTdGF0ZS5kYXRhKSB9KSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucz8ub3B0aW1pc3RpY1VwZGF0ZSAmJiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0KChwcmV2U3RhdGUpID0+ICh7IC4uLnByZXZTdGF0ZSwgZGF0YTogZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGUgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChvcHRpb25zPy5zaG91bGRSZXZhbGlkYXRlQWZ0ZXIgIT09IGZhbHNlKSB7XG4gICAgICAgICAgaWYgKGVudmlyb25tZW50LmxhdW5jaFR5cGUgPT09IExhdW5jaFR5cGUuQmFja2dyb3VuZCB8fCBlbnZpcm9ubWVudC5jb21tYW5kTW9kZSA9PT0gXCJtZW51LWJhclwiKSB7XG4gICAgICAgICAgICAvLyB3aGVuIGluIHRoZSBiYWNrZ3JvdW5kIG9yIGluIGEgbWVudSBiYXIsIHdlIGFyZSBnb2luZyB0byBhd2FpdCB0aGUgcmV2YWxpZGF0aW9uXG4gICAgICAgICAgICAvLyB0byBtYWtlIHN1cmUgd2UgZ2V0IHRoZSByaWdodCBkYXRhIGF0IHRoZSBlbmQgb2YgdGhlIG11dGF0aW9uXG4gICAgICAgICAgICBhd2FpdCByZXZhbGlkYXRlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldmFsaWRhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtyZXZhbGlkYXRlLCBsYXRlc3RWYWx1ZSwgc2V0LCBhYm9ydF0sXG4gICk7XG5cbiAgY29uc3Qgb25Mb2FkTW9yZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50LnBhZ2UgKz0gMTtcbiAgICBjb25zdCBhcmdzID0gKGxhdGVzdEFyZ3MuY3VycmVudCB8fCBbXSkgYXMgUGFyYW1ldGVyczxUPjtcbiAgICBjYWxsYmFjayguLi5hcmdzKTtcbiAgfSwgW3BhZ2luYXRpb25BcmdzUmVmLCBsYXRlc3RBcmdzLCBjYWxsYmFja10pO1xuXG4gIC8vIHJldmFsaWRhdGUgd2hlbiB0aGUgYXJncyBjaGFuZ2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyByZXNldCB0aGUgcGFnaW5hdGlvblxuICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQgPSB7IHBhZ2U6IDAgfTtcblxuICAgIGlmIChvcHRpb25zPy5leGVjdXRlICE9PSBmYWxzZSkge1xuICAgICAgY2FsbGJhY2soLi4uKChhcmdzIHx8IFtdKSBhcyBQYXJhbWV0ZXJzPFQ+KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNhbmNlbCB0aGUgcHJldmlvdXMgcmVxdWVzdCBpZiB3ZSBkb24ndCB3YW50IHRvIGV4ZWN1dGUgYW55bW9yZVxuICAgICAgYWJvcnQoKTtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICB9LCBbdXNlRGVlcE1lbW8oW2FyZ3MsIG9wdGlvbnM/LmV4ZWN1dGUsIGNhbGxiYWNrXSksIGxhdGVzdEFib3J0YWJsZSwgcGFnaW5hdGlvbkFyZ3NSZWZdKTtcblxuICAvLyBhYm9ydCByZXF1ZXN0IHdoZW4gdW5tb3VudGluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhYm9ydCgpO1xuICAgIH07XG4gIH0sIFthYm9ydF0pO1xuXG4gIC8vIHdlIG9ubHkgd2FudCB0byBzaG93IHRoZSBsb2FkaW5nIGluZGljYXRvciBpZiB0aGUgcHJvbWlzZSBpcyBleGVjdXRpbmdcbiAgY29uc3QgaXNMb2FkaW5nID0gb3B0aW9ucz8uZXhlY3V0ZSAhPT0gZmFsc2UgPyBzdGF0ZS5pc0xvYWRpbmcgOiBmYWxzZTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIGxvYWRpbmcgaXMgaGFzIHNvbWUgZml4ZWQgdmFsdWUgaW4gdGhlIGVudW0gd2hpY2hcbiAgY29uc3Qgc3RhdGVXaXRoTG9hZGluZ0ZpeGVkOiBBc3luY1N0YXRlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4+ID0geyAuLi5zdGF0ZSwgaXNMb2FkaW5nIH07XG5cbiAgY29uc3QgcGFnaW5hdGlvbiA9IHVzZVBhZ2luYXRpb25SZWYuY3VycmVudFxuICAgID8ge1xuICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemVSZWYuY3VycmVudCxcbiAgICAgICAgaGFzTW9yZTogaGFzTW9yZVJlZi5jdXJyZW50LFxuICAgICAgICBvbkxvYWRNb3JlLFxuICAgICAgfVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHJldHVybiB7IC4uLnN0YXRlV2l0aExvYWRpbmdGaXhlZCwgcmV2YWxpZGF0ZSwgbXV0YXRlLCBwYWdpbmF0aW9uIH07XG59XG5cbi8qKiBCaW5kIHRoZSBmbiBpZiBpdCdzIGEgUHJvbWlzZSBtZXRob2QgKi9cbmZ1bmN0aW9uIGJpbmRQcm9taXNlSWZOZWVkZWQ8VD4oZm46IFQpOiBUIHtcbiAgaWYgKGZuID09PSAoUHJvbWlzZS5hbGwgYXMgYW55KSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhpcyBpcyBmaW5lXG4gICAgcmV0dXJuIGZuLmJpbmQoUHJvbWlzZSk7XG4gIH1cbiAgaWYgKGZuID09PSAoUHJvbWlzZS5yYWNlIGFzIGFueSkpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRoaXMgaXMgZmluZVxuICAgIHJldHVybiBmbi5iaW5kKFByb21pc2UpO1xuICB9XG4gIGlmIChmbiA9PT0gKFByb21pc2UucmVzb2x2ZSBhcyBhbnkpKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGlzIGlzIGZpbmVcbiAgICByZXR1cm4gZm4uYmluZChQcm9taXNlIGFzIGFueSk7XG4gIH1cbiAgaWYgKGZuID09PSAoUHJvbWlzZS5yZWplY3QgYXMgYW55KSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhpcyBpcyBmaW5lXG4gICAgcmV0dXJuIGZuLmJpbmQoUHJvbWlzZSk7XG4gIH1cbiAgcmV0dXJuIGZuO1xufVxuIiwgImltcG9ydCB7IHVzZVJlZiwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZGVxdWFsIH0gZnJvbSBcImRlcXVhbC9saXRlXCI7XG5cbi8qKlxuICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byBiZSBtZW1vaXplZCAodXN1YWxseSBhIGRlcGVuZGVuY3kgbGlzdClcbiAqIEByZXR1cm5zIGEgbWVtb2l6ZWQgdmVyc2lvbiBvZiB0aGUgdmFsdWUgYXMgbG9uZyBhcyBpdCByZW1haW5zIGRlZXBseSBlcXVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRGVlcE1lbW88VD4odmFsdWU6IFQpIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmPFQ+KHZhbHVlKTtcbiAgY29uc3Qgc2lnbmFsUmVmID0gdXNlUmVmPG51bWJlcj4oMCk7XG5cbiAgaWYgKCFkZXF1YWwodmFsdWUsIHJlZi5jdXJyZW50KSkge1xuICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgc2lnbmFsUmVmLmN1cnJlbnQgKz0gMTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgcmV0dXJuIHVzZU1lbW8oKCkgPT4gcmVmLmN1cnJlbnQsIFtzaWduYWxSZWYuY3VycmVudF0pO1xufVxuIiwgImltcG9ydCB7IHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGxhdGVzdCBzdGF0ZS5cbiAqXG4gKiBUaGlzIGlzIG1vc3RseSB1c2VmdWwgdG8gZ2V0IGFjY2VzcyB0byB0aGUgbGF0ZXN0IHZhbHVlIG9mIHNvbWUgcHJvcHMgb3Igc3RhdGUgaW5zaWRlIGFuIGFzeW5jaHJvbm91cyBjYWxsYmFjaywgaW5zdGVhZCBvZiB0aGF0IHZhbHVlIGF0IHRoZSB0aW1lIHRoZSBjYWxsYmFjayB3YXMgY3JlYXRlZCBmcm9tLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTGF0ZXN0PFQ+KHZhbHVlOiBUKTogeyByZWFkb25seSBjdXJyZW50OiBUIH0ge1xuICBjb25zdCByZWYgPSB1c2VSZWYodmFsdWUpO1xuICByZWYuY3VycmVudCA9IHZhbHVlO1xuICByZXR1cm4gcmVmO1xufVxuIiwgImltcG9ydCAqIGFzIGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IENsaXBib2FyZCwgZW52aXJvbm1lbnQsIG9wZW4sIFRvYXN0LCBzaG93VG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbi8qKlxuICogU2hvd3MgYSBmYWlsdXJlIFRvYXN0IGZvciBhIGdpdmVuIEVycm9yLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBzaG93SFVEIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgcnVuQXBwbGVTY3JpcHQsIHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gKiAgIHRyeSB7XG4gKiAgICAgY29uc3QgcmVzID0gYXdhaXQgcnVuQXBwbGVTY3JpcHQoXG4gKiAgICAgICBgXG4gKiAgICAgICBvbiBydW4gYXJndlxuICogICAgICAgICByZXR1cm4gXCJoZWxsbywgXCIgJiBpdGVtIDEgb2YgYXJndiAmIFwiLlwiXG4gKiAgICAgICBlbmQgcnVuXG4gKiAgICAgICBgLFxuICogICAgICAgW1wid29ybGRcIl1cbiAqICAgICApO1xuICogICAgIGF3YWl0IHNob3dIVUQocmVzKTtcbiAqICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAqICAgICBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7IHRpdGxlOiBcIkNvdWxkIG5vdCBydW4gQXBwbGVTY3JpcHRcIiB9KTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RmFpbHVyZVRvYXN0KFxuICBlcnJvcjogdW5rbm93bixcbiAgb3B0aW9ucz86IFBhcnRpYWw8UGljazxUb2FzdC5PcHRpb25zLCBcInRpdGxlXCIgfCBcInByaW1hcnlBY3Rpb25cIiB8IFwibWVzc2FnZVwiPj4sXG4pIHtcbiAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKTtcbiAgcmV0dXJuIHNob3dUb2FzdCh7XG4gICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgdGl0bGU6IG9wdGlvbnM/LnRpdGxlID8/IFwiU29tZXRoaW5nIHdlbnQgd3JvbmdcIixcbiAgICBtZXNzYWdlOiBvcHRpb25zPy5tZXNzYWdlID8/IG1lc3NhZ2UsXG4gICAgcHJpbWFyeUFjdGlvbjogb3B0aW9ucz8ucHJpbWFyeUFjdGlvbiA/PyBoYW5kbGVFcnJvclRvYXN0QWN0aW9uKGVycm9yKSxcbiAgICBzZWNvbmRhcnlBY3Rpb246IG9wdGlvbnM/LnByaW1hcnlBY3Rpb24gPyBoYW5kbGVFcnJvclRvYXN0QWN0aW9uKGVycm9yKSA6IHVuZGVmaW5lZCxcbiAgfSk7XG59XG5cbmNvbnN0IGhhbmRsZUVycm9yVG9hc3RBY3Rpb24gPSAoZXJyb3I6IHVua25vd24pOiBUb2FzdC5BY3Rpb25PcHRpb25zID0+IHtcbiAgbGV0IHByaXZhdGVFeHRlbnNpb24gPSB0cnVlO1xuICBsZXQgdGl0bGUgPSBcIltFeHRlbnNpb24gTmFtZV0uLi5cIjtcbiAgbGV0IGV4dGVuc2lvblVSTCA9IFwiXCI7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFja2FnZUpTT04gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZW52aXJvbm1lbnQuYXNzZXRzUGF0aCwgXCIuLlwiLCBcInBhY2thZ2UuanNvblwiKSwgXCJ1dGY4XCIpKTtcbiAgICB0aXRsZSA9IGBbJHtwYWNrYWdlSlNPTi50aXRsZX1dLi4uYDtcbiAgICBleHRlbnNpb25VUkwgPSBgaHR0cHM6Ly9yYXljYXN0LmNvbS8ke3BhY2thZ2VKU09OLm93bmVyIHx8IHBhY2thZ2VKU09OLmF1dGhvcn0vJHtwYWNrYWdlSlNPTi5uYW1lfWA7XG4gICAgaWYgKCFwYWNrYWdlSlNPTi5vd25lciB8fCBwYWNrYWdlSlNPTi5hY2Nlc3MgPT09IFwicHVibGljXCIpIHtcbiAgICAgIHByaXZhdGVFeHRlbnNpb24gPSBmYWxzZTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICAvLyBpZiBpdCdzIGEgcHJpdmF0ZSBleHRlbnNpb24sIHdlIGNhbid0IGNvbnN0cnVjdCB0aGUgVVJMIHRvIHJlcG9ydCB0aGUgZXJyb3JcbiAgLy8gc28gd2UgZmFsbGJhY2sgdG8gY29weWluZyB0aGUgZXJyb3IgdG8gdGhlIGNsaXBib2FyZFxuICBjb25zdCBmYWxsYmFjayA9IGVudmlyb25tZW50LmlzRGV2ZWxvcG1lbnQgfHwgcHJpdmF0ZUV4dGVuc2lvbjtcblxuICBjb25zdCBzdGFjayA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvcj8uc3RhY2sgfHwgZXJyb3I/Lm1lc3NhZ2UgfHwgXCJcIiA6IFN0cmluZyhlcnJvcik7XG5cbiAgcmV0dXJuIHtcbiAgICB0aXRsZTogZmFsbGJhY2sgPyBcIkNvcHkgTG9nc1wiIDogXCJSZXBvcnQgRXJyb3JcIixcbiAgICBvbkFjdGlvbih0b2FzdCkge1xuICAgICAgdG9hc3QuaGlkZSgpO1xuICAgICAgaWYgKGZhbGxiYWNrKSB7XG4gICAgICAgIENsaXBib2FyZC5jb3B5KHN0YWNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZW4oXG4gICAgICAgICAgYGh0dHBzOi8vZ2l0aHViLmNvbS9yYXljYXN0L2V4dGVuc2lvbnMvaXNzdWVzL25ldz8mbGFiZWxzPWV4dGVuc2lvbiUyQ2J1ZyZ0ZW1wbGF0ZT1leHRlbnNpb25fYnVnX3JlcG9ydC55bWwmdGl0bGU9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICApfSZleHRlbnNpb24tdXJsPSR7ZW5jb2RlVVJJKGV4dGVuc2lvblVSTCl9JmRlc2NyaXB0aW9uPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgYCMjIyMgRXJyb3I6XG5cXGBcXGBcXGBcbiR7c3RhY2t9XG5cXGBcXGBcXGBcbmAsXG4gICAgICAgICAgKX1gLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCBEaXNwYXRjaCwgU2V0U3RhdGVBY3Rpb24sIHVzZVN5bmNFeHRlcm5hbFN0b3JlLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDYWNoZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgcmVwbGFjZXIsIHJldml2ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmNvbnN0IHJvb3RDYWNoZSA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2woXCJjYWNoZSB3aXRob3V0IG5hbWVzcGFjZVwiKTtcbmNvbnN0IGNhY2hlTWFwID0gLyogI19fUFVSRV9fICovIG5ldyBNYXA8c3RyaW5nIHwgc3ltYm9sLCBDYWNoZT4oKTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgc3RhdGVmdWwgdmFsdWUsIGFuZCBhIGZ1bmN0aW9uIHRvIHVwZGF0ZSBpdC4gVGhlIHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAcmVtYXJrIFRoZSB2YWx1ZSBuZWVkcyB0byBiZSBKU09OIHNlcmlhbGl6YWJsZS5cbiAqXG4gKiBAcGFyYW0ga2V5IC0gVGhlIHVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBzdGF0ZS4gVGhpcyBjYW4gYmUgdXNlZCB0byBzaGFyZSB0aGUgc3RhdGUgYWNyb3NzIGNvbXBvbmVudHMgYW5kL29yIGNvbW1hbmRzLlxuICogQHBhcmFtIGluaXRpYWxTdGF0ZSAtIFRoZSBpbml0aWFsIHZhbHVlIG9mIHRoZSBzdGF0ZSBpZiB0aGVyZSBhcmVuJ3QgYW55IGluIHRoZSBDYWNoZSB5ZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRTdGF0ZTxUPihcbiAga2V5OiBzdHJpbmcsXG4gIGluaXRpYWxTdGF0ZTogVCxcbiAgY29uZmlnPzogeyBjYWNoZU5hbWVzcGFjZT86IHN0cmluZyB9LFxuKTogW1QsIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFQ+Pl07XG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkU3RhdGU8VCA9IHVuZGVmaW5lZD4oa2V5OiBzdHJpbmcpOiBbVCB8IHVuZGVmaW5lZCwgRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VCB8IHVuZGVmaW5lZD4+XTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRTdGF0ZTxUPihcbiAga2V5OiBzdHJpbmcsXG4gIGluaXRpYWxTdGF0ZT86IFQsXG4gIGNvbmZpZz86IHsgY2FjaGVOYW1lc3BhY2U/OiBzdHJpbmcgfSxcbik6IFtULCBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxUPj5dIHtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb25maWc/LmNhY2hlTmFtZXNwYWNlIHx8IHJvb3RDYWNoZTtcbiAgY29uc3QgY2FjaGUgPVxuICAgIGNhY2hlTWFwLmdldChjYWNoZUtleSkgfHwgY2FjaGVNYXAuc2V0KGNhY2hlS2V5LCBuZXcgQ2FjaGUoeyBuYW1lc3BhY2U6IGNvbmZpZz8uY2FjaGVOYW1lc3BhY2UgfSkpLmdldChjYWNoZUtleSk7XG5cbiAgaWYgKCFjYWNoZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgY2FjaGVcIik7XG4gIH1cblxuICBjb25zdCBrZXlSZWYgPSB1c2VMYXRlc3Qoa2V5KTtcbiAgY29uc3QgaW5pdGlhbFZhbHVlUmVmID0gdXNlTGF0ZXN0KGluaXRpYWxTdGF0ZSk7XG5cbiAgY29uc3QgY2FjaGVkU3RhdGUgPSB1c2VTeW5jRXh0ZXJuYWxTdG9yZShjYWNoZS5zdWJzY3JpYmUsICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGNhY2hlLmdldChrZXlSZWYuY3VycmVudCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDb3VsZCBub3QgZ2V0IENhY2hlIGRhdGE6XCIsIGVycm9yKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBzdGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgY2FjaGVkU3RhdGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGlmIChjYWNoZWRTdGF0ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY2FjaGVkU3RhdGUsIHJldml2ZXIpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIHRoZSBkYXRhIGdvdCBjb3JydXB0ZWQgc29tZWhvd1xuICAgICAgICBjb25zb2xlLndhcm4oXCJUaGUgY2FjaGVkIGRhdGEgaXMgY29ycnVwdGVkXCIsIGVycik7XG4gICAgICAgIHJldHVybiBpbml0aWFsVmFsdWVSZWYuY3VycmVudDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZVJlZi5jdXJyZW50O1xuICAgIH1cbiAgfSwgW2NhY2hlZFN0YXRlLCBpbml0aWFsVmFsdWVSZWZdKTtcblxuICBjb25zdCBzdGF0ZVJlZiA9IHVzZUxhdGVzdChzdGF0ZSk7XG5cbiAgY29uc3Qgc2V0U3RhdGVBbmRDYWNoZSA9IHVzZUNhbGxiYWNrKFxuICAgICh1cGRhdGVyOiBTZXRTdGF0ZUFjdGlvbjxUPikgPT4ge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUUyBzdHJ1Z2dsZXMgdG8gaW5mZXIgdGhlIHR5cGVzIGFzIFQgY291bGQgcG90ZW50aWFsbHkgYmUgYSBmdW5jdGlvblxuICAgICAgY29uc3QgbmV3VmFsdWUgPSB0eXBlb2YgdXBkYXRlciA9PT0gXCJmdW5jdGlvblwiID8gdXBkYXRlcihzdGF0ZVJlZi5jdXJyZW50KSA6IHVwZGF0ZXI7XG4gICAgICBpZiAodHlwZW9mIG5ld1ZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGNhY2hlLnNldChrZXlSZWYuY3VycmVudCwgXCJ1bmRlZmluZWRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzdHJpbmdpZmllZFZhbHVlID0gSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUsIHJlcGxhY2VyKTtcbiAgICAgICAgY2FjaGUuc2V0KGtleVJlZi5jdXJyZW50LCBzdHJpbmdpZmllZFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICB9LFxuICAgIFtjYWNoZSwga2V5UmVmLCBzdGF0ZVJlZl0sXG4gICk7XG5cbiAgcmV0dXJuIFtzdGF0ZSwgc2V0U3RhdGVBbmRDYWNoZV07XG59XG4iLCAiaW1wb3J0IGNyeXB0byBmcm9tIFwibm9kZTpjcnlwdG9cIjtcbmltcG9ydCB7IHR5cGVIYXNoZXIgfSBmcm9tIFwiLi92ZW5kb3JzL3R5cGUtaGFzaGVyXCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZXIodGhpczogYW55LCBrZXk6IHN0cmluZywgX3ZhbHVlOiB1bmtub3duKSB7XG4gIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIGBfX3JheWNhc3RfY2FjaGVkX2RhdGVfXyR7dmFsdWUudG9JU09TdHJpbmcoKX1gO1xuICB9XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgcmV0dXJuIGBfX3JheWNhc3RfY2FjaGVkX2J1ZmZlcl9fJHt2YWx1ZS50b1N0cmluZyhcImJhc2U2NFwiKX1gO1xuICB9XG4gIHJldHVybiBfdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZpdmVyKF9rZXk6IHN0cmluZywgdmFsdWU6IHVua25vd24pIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5zdGFydHNXaXRoKFwiX19yYXljYXN0X2NhY2hlZF9kYXRlX19cIikpIHtcbiAgICByZXR1cm4gbmV3IERhdGUodmFsdWUucmVwbGFjZShcIl9fcmF5Y2FzdF9jYWNoZWRfZGF0ZV9fXCIsIFwiXCIpKTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnN0YXJ0c1dpdGgoXCJfX3JheWNhc3RfY2FjaGVkX2J1ZmZlcl9fXCIpKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlLnJlcGxhY2UoXCJfX3JheWNhc3RfY2FjaGVkX2J1ZmZlcl9fXCIsIFwiXCIpLCBcImJhc2U2NFwiKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNoKG9iamVjdDogYW55KSB7XG4gIGNvbnN0IGhhc2hpbmdTdHJlYW0gPSBjcnlwdG8uY3JlYXRlSGFzaChcInNoYTFcIik7XG4gIGNvbnN0IGhhc2hlciA9IHR5cGVIYXNoZXIoaGFzaGluZ1N0cmVhbSk7XG4gIGhhc2hlci5kaXNwYXRjaChvYmplY3QpO1xuXG4gIHJldHVybiBoYXNoaW5nU3RyZWFtLmRpZ2VzdChcImhleFwiKTtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5pbXBvcnQgY3J5cHRvIGZyb20gXCJub2RlOmNyeXB0b1wiO1xuXG4vKiogQ2hlY2sgaWYgdGhlIGdpdmVuIGZ1bmN0aW9uIGlzIGEgbmF0aXZlIGZ1bmN0aW9uICovXG5mdW5jdGlvbiBpc05hdGl2ZUZ1bmN0aW9uKGY6IGFueSkge1xuICBpZiAodHlwZW9mIGYgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBleHAgPSAvXmZ1bmN0aW9uXFxzK1xcdypcXHMqXFwoXFxzKlxcKVxccyp7XFxzK1xcW25hdGl2ZSBjb2RlXFxdXFxzK30kL2k7XG4gIHJldHVybiBleHAuZXhlYyhGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmKSkgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGhhc2hSZXBsYWNlcih2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHlwZUhhc2hlcihcbiAgd3JpdGVUbzpcbiAgICB8IGNyeXB0by5IYXNoXG4gICAgfCB7XG4gICAgICAgIGJ1Zjogc3RyaW5nO1xuICAgICAgICB3cml0ZTogKGI6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgZW5kOiAoYjogYW55KSA9PiB2b2lkO1xuICAgICAgICByZWFkOiAoKSA9PiBzdHJpbmc7XG4gICAgICB9LFxuICBjb250ZXh0OiBhbnlbXSA9IFtdLFxuKSB7XG4gIGZ1bmN0aW9uIHdyaXRlKHN0cjogc3RyaW5nKSB7XG4gICAgaWYgKFwidXBkYXRlXCIgaW4gd3JpdGVUbykge1xuICAgICAgcmV0dXJuIHdyaXRlVG8udXBkYXRlKHN0ciwgXCJ1dGY4XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gd3JpdGVUby53cml0ZShzdHIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZGlzcGF0Y2g6IGZ1bmN0aW9uICh2YWx1ZTogYW55KSB7XG4gICAgICB2YWx1ZSA9IGhhc2hSZXBsYWNlcih2YWx1ZSk7XG5cbiAgICAgIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgdGhpc1tcIl9udWxsXCJdKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXNbXCJfXCIgKyB0eXBlXSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBfb2JqZWN0OiBmdW5jdGlvbiAob2JqZWN0OiBhbnkpIHtcbiAgICAgIGNvbnN0IHBhdHRlcm4gPSAvXFxbb2JqZWN0ICguKilcXF0vaTtcbiAgICAgIGNvbnN0IG9ialN0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpO1xuICAgICAgbGV0IG9ialR5cGUgPSBwYXR0ZXJuLmV4ZWMob2JqU3RyaW5nKT8uWzFdID8/IFwidW5rbm93bjpbXCIgKyBvYmpTdHJpbmcgKyBcIl1cIjtcbiAgICAgIG9ialR5cGUgPSBvYmpUeXBlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGxldCBvYmplY3ROdW1iZXIgPSBudWxsIGFzIGFueTtcblxuICAgICAgaWYgKChvYmplY3ROdW1iZXIgPSBjb250ZXh0LmluZGV4T2Yob2JqZWN0KSkgPj0gMCkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiW0NJUkNVTEFSOlwiICsgb2JqZWN0TnVtYmVyICsgXCJdXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0LnB1c2gob2JqZWN0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgICAgIHdyaXRlKFwiYnVmZmVyOlwiKTtcbiAgICAgICAgcmV0dXJuIHdyaXRlKG9iamVjdC50b1N0cmluZyhcInV0ZjhcIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqVHlwZSAhPT0gXCJvYmplY3RcIiAmJiBvYmpUeXBlICE9PSBcImZ1bmN0aW9uXCIgJiYgb2JqVHlwZSAhPT0gXCJhc3luY2Z1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAodGhpc1tcIl9cIiArIG9ialR5cGVdKSB7XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIHRoaXNbXCJfXCIgKyBvYmpUeXBlXShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBvYmplY3QgdHlwZSBcIicgKyBvYmpUeXBlICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgICAgICAga2V5cyA9IGtleXMuc29ydCgpO1xuICAgICAgICAvLyBNYWtlIHN1cmUgdG8gaW5jb3Jwb3JhdGUgc3BlY2lhbCBwcm9wZXJ0aWVzLCBzb1xuICAgICAgICAvLyBUeXBlcyB3aXRoIGRpZmZlcmVudCBwcm90b3R5cGVzIHdpbGwgcHJvZHVjZVxuICAgICAgICAvLyBhIGRpZmZlcmVudCBoYXNoIGFuZCBvYmplY3RzIGRlcml2ZWQgZnJvbVxuICAgICAgICAvLyBkaWZmZXJlbnQgZnVuY3Rpb25zIChgbmV3IEZvb2AsIGBuZXcgQmFyYCkgd2lsbFxuICAgICAgICAvLyBwcm9kdWNlIGRpZmZlcmVudCBoYXNoZXMuXG4gICAgICAgIC8vIFdlIG5ldmVyIGRvIHRoaXMgZm9yIG5hdGl2ZSBmdW5jdGlvbnMgc2luY2Ugc29tZVxuICAgICAgICAvLyBzZWVtIHRvIGJyZWFrIGJlY2F1c2Ugb2YgdGhhdC5cbiAgICAgICAgaWYgKCFpc05hdGl2ZUZ1bmN0aW9uKG9iamVjdCkpIHtcbiAgICAgICAgICBrZXlzLnNwbGljZSgwLCAwLCBcInByb3RvdHlwZVwiLCBcIl9fcHJvdG9fX1wiLCBcImNvbnN0cnVjdG9yXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JpdGUoXCJvYmplY3Q6XCIgKyBrZXlzLmxlbmd0aCArIFwiOlwiKTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHNlbGYuZGlzcGF0Y2goa2V5KTtcbiAgICAgICAgICB3cml0ZShcIjpcIik7XG4gICAgICAgICAgc2VsZi5kaXNwYXRjaChvYmplY3Rba2V5XSk7XG4gICAgICAgICAgd3JpdGUoXCIsXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIF9hcnJheTogZnVuY3Rpb24gKGFycjogYW55W10sIHVub3JkZXJlZDogYm9vbGVhbikge1xuICAgICAgdW5vcmRlcmVkID0gdHlwZW9mIHVub3JkZXJlZCAhPT0gXCJ1bmRlZmluZWRcIiA/IHVub3JkZXJlZCA6IGZhbHNlOyAvLyBkZWZhdWx0IHRvIG9wdGlvbnMudW5vcmRlcmVkQXJyYXlzXG5cbiAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgd3JpdGUoXCJhcnJheTpcIiArIGFyci5sZW5ndGggKyBcIjpcIik7XG4gICAgICBpZiAoIXVub3JkZXJlZCB8fCBhcnIubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGVudHJ5OiBhbnkpIHtcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoKGVudHJ5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGhlIHVub3JkZXJlZCBjYXNlIGlzIGEgbGl0dGxlIG1vcmUgY29tcGxpY2F0ZWQ6XG4gICAgICAvLyBzaW5jZSB0aGVyZSBpcyBubyBjYW5vbmljYWwgb3JkZXJpbmcgb24gb2JqZWN0cyxcbiAgICAgIC8vIGkuZS4ge2E6MX0gPCB7YToyfSBhbmQge2E6MX0gPiB7YToyfSBhcmUgYm90aCBmYWxzZSxcbiAgICAgIC8vIHdlIGZpcnN0IHNlcmlhbGl6ZSBlYWNoIGVudHJ5IHVzaW5nIGEgUGFzc1Rocm91Z2ggc3RyZWFtXG4gICAgICAvLyBiZWZvcmUgc29ydGluZy5cbiAgICAgIC8vIGFsc286IHdlIGNhbuKAmXQgdXNlIHRoZSBzYW1lIGNvbnRleHQgYXJyYXkgZm9yIGFsbCBlbnRyaWVzXG4gICAgICAvLyBzaW5jZSB0aGUgb3JkZXIgb2YgaGFzaGluZyBzaG91bGQgKm5vdCogbWF0dGVyLiBpbnN0ZWFkLFxuICAgICAgLy8gd2Uga2VlcCB0cmFjayBvZiB0aGUgYWRkaXRpb25zIHRvIGEgY29weSBvZiB0aGUgY29udGV4dCBhcnJheVxuICAgICAgLy8gYW5kIGFkZCBhbGwgb2YgdGhlbSB0byB0aGUgZ2xvYmFsIGNvbnRleHQgYXJyYXkgd2hlbiB3ZeKAmXJlIGRvbmVcbiAgICAgIGxldCBjb250ZXh0QWRkaXRpb25zOiBhbnlbXSA9IFtdO1xuICAgICAgY29uc3QgZW50cmllcyA9IGFyci5tYXAoZnVuY3Rpb24gKGVudHJ5OiBhbnkpIHtcbiAgICAgICAgY29uc3Qgc3RybSA9IFBhc3NUaHJvdWdoKCk7XG4gICAgICAgIGNvbnN0IGxvY2FsQ29udGV4dCA9IGNvbnRleHQuc2xpY2UoKTsgLy8gbWFrZSBjb3B5XG4gICAgICAgIGNvbnN0IGhhc2hlciA9IHR5cGVIYXNoZXIoc3RybSwgbG9jYWxDb250ZXh0KTtcbiAgICAgICAgaGFzaGVyLmRpc3BhdGNoKGVudHJ5KTtcbiAgICAgICAgLy8gdGFrZSBvbmx5IHdoYXQgd2FzIGFkZGVkIHRvIGxvY2FsQ29udGV4dCBhbmQgYXBwZW5kIGl0IHRvIGNvbnRleHRBZGRpdGlvbnNcbiAgICAgICAgY29udGV4dEFkZGl0aW9ucyA9IGNvbnRleHRBZGRpdGlvbnMuY29uY2F0KGxvY2FsQ29udGV4dC5zbGljZShjb250ZXh0Lmxlbmd0aCkpO1xuICAgICAgICByZXR1cm4gc3RybS5yZWFkKCkudG9TdHJpbmcoKTtcbiAgICAgIH0pO1xuICAgICAgY29udGV4dCA9IGNvbnRleHQuY29uY2F0KGNvbnRleHRBZGRpdGlvbnMpO1xuICAgICAgZW50cmllcy5zb3J0KCk7XG4gICAgICB0aGlzLl9hcnJheShlbnRyaWVzLCBmYWxzZSk7XG4gICAgfSxcbiAgICBfZGF0ZTogZnVuY3Rpb24gKGRhdGU6IERhdGUpIHtcbiAgICAgIHdyaXRlKFwiZGF0ZTpcIiArIGRhdGUudG9KU09OKCkpO1xuICAgIH0sXG4gICAgX3N5bWJvbDogZnVuY3Rpb24gKHN5bTogc3ltYm9sKSB7XG4gICAgICB3cml0ZShcInN5bWJvbDpcIiArIHN5bS50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9lcnJvcjogZnVuY3Rpb24gKGVycjogRXJyb3IpIHtcbiAgICAgIHdyaXRlKFwiZXJyb3I6XCIgKyBlcnIudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfYm9vbGVhbjogZnVuY3Rpb24gKGJvb2w6IGJvb2xlYW4pIHtcbiAgICAgIHdyaXRlKFwiYm9vbDpcIiArIGJvb2wudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfc3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nOiBzdHJpbmcpIHtcbiAgICAgIHdyaXRlKFwic3RyaW5nOlwiICsgc3RyaW5nLmxlbmd0aCArIFwiOlwiKTtcbiAgICAgIHdyaXRlKHN0cmluZy50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9mdW5jdGlvbjogZnVuY3Rpb24gKGZuOiBhbnkpIHtcbiAgICAgIHdyaXRlKFwiZm46XCIpO1xuICAgICAgaWYgKGlzTmF0aXZlRnVuY3Rpb24oZm4pKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goXCJbbmF0aXZlXVwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goZm4udG9TdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBjYW4gc3RpbGwgZGlzdGluZ3Vpc2ggbmF0aXZlIGZ1bmN0aW9uc1xuICAgICAgLy8gYnkgdGhlaXIgbmFtZSwgb3RoZXJ3aXNlIFN0cmluZyBhbmQgRnVuY3Rpb24gd2lsbFxuICAgICAgLy8gaGF2ZSB0aGUgc2FtZSBoYXNoXG4gICAgICB0aGlzLmRpc3BhdGNoKFwiZnVuY3Rpb24tbmFtZTpcIiArIFN0cmluZyhmbi5uYW1lKSk7XG5cbiAgICAgIHRoaXMuX29iamVjdChmbik7XG4gICAgfSxcbiAgICBfbnVtYmVyOiBmdW5jdGlvbiAobnVtYmVyOiBudW1iZXIpIHtcbiAgICAgIHdyaXRlKFwibnVtYmVyOlwiICsgbnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX3htbDogZnVuY3Rpb24gKHhtbDogYW55KSB7XG4gICAgICB3cml0ZShcInhtbDpcIiArIHhtbC50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9udWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcIk51bGxcIik7XG4gICAgfSxcbiAgICBfdW5kZWZpbmVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcIlVuZGVmaW5lZFwiKTtcbiAgICB9LFxuICAgIF9yZWdleHA6IGZ1bmN0aW9uIChyZWdleDogUmVnRXhwKSB7XG4gICAgICB3cml0ZShcInJlZ2V4OlwiICsgcmVnZXgudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfdWludDhhcnJheTogZnVuY3Rpb24gKGFycjogVWludDhBcnJheSkge1xuICAgICAgd3JpdGUoXCJ1aW50OGFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfdWludDhjbGFtcGVkYXJyYXk6IGZ1bmN0aW9uIChhcnI6IFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gICAgICB3cml0ZShcInVpbnQ4Y2xhbXBlZGFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfaW50OGFycmF5OiBmdW5jdGlvbiAoYXJyOiBJbnQ4QXJyYXkpIHtcbiAgICAgIHdyaXRlKFwiaW50OGFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfdWludDE2YXJyYXk6IGZ1bmN0aW9uIChhcnI6IFVpbnQxNkFycmF5KSB7XG4gICAgICB3cml0ZShcInVpbnQxNmFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfaW50MTZhcnJheTogZnVuY3Rpb24gKGFycjogSW50MTZBcnJheSkge1xuICAgICAgd3JpdGUoXCJpbnQxNmFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfdWludDMyYXJyYXk6IGZ1bmN0aW9uIChhcnI6IFVpbnQzMkFycmF5KSB7XG4gICAgICB3cml0ZShcInVpbnQzMmFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfaW50MzJhcnJheTogZnVuY3Rpb24gKGFycjogSW50MzJBcnJheSkge1xuICAgICAgd3JpdGUoXCJpbnQzMmFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfZmxvYXQzMmFycmF5OiBmdW5jdGlvbiAoYXJyOiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgIHdyaXRlKFwiZmxvYXQzMmFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfZmxvYXQ2NGFycmF5OiBmdW5jdGlvbiAoYXJyOiBGbG9hdDY0QXJyYXkpIHtcbiAgICAgIHdyaXRlKFwiZmxvYXQ2NGFycmF5OlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKSk7XG4gICAgfSxcbiAgICBfYXJyYXlidWZmZXI6IGZ1bmN0aW9uIChhcnI6IEFycmF5QnVmZmVyKSB7XG4gICAgICB3cml0ZShcImFycmF5YnVmZmVyOlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2gobmV3IFVpbnQ4QXJyYXkoYXJyKSk7XG4gICAgfSxcbiAgICBfdXJsOiBmdW5jdGlvbiAodXJsOiBVUkwpIHtcbiAgICAgIHdyaXRlKFwidXJsOlwiICsgdXJsLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX21hcDogZnVuY3Rpb24gKG1hcDogTWFwPGFueSwgYW55Pikge1xuICAgICAgd3JpdGUoXCJtYXA6XCIpO1xuICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShtYXApO1xuICAgICAgdGhpcy5fYXJyYXkoYXJyLCB0cnVlKTtcbiAgICB9LFxuICAgIF9zZXQ6IGZ1bmN0aW9uIChzZXQ6IFNldDxhbnk+KSB7XG4gICAgICB3cml0ZShcInNldDpcIik7XG4gICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKHNldCk7XG4gICAgICB0aGlzLl9hcnJheShhcnIsIHRydWUpO1xuICAgIH0sXG4gICAgX2ZpbGU6IGZ1bmN0aW9uIChmaWxlOiBhbnkpIHtcbiAgICAgIHdyaXRlKFwiZmlsZTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKFtmaWxlLm5hbWUsIGZpbGUuc2l6ZSwgZmlsZS50eXBlLCBmaWxlLmxhc3RNb2RpZmllZF0pO1xuICAgIH0sXG4gICAgX2Jsb2I6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBcIkhhc2hpbmcgQmxvYiBvYmplY3RzIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkXFxuXCIgK1xuICAgICAgICAgIFwiKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcHVsZW9zL29iamVjdC1oYXNoL2lzc3Vlcy8yNilcXG5cIiArXG4gICAgICAgICAgJ1VzZSBcIm9wdGlvbnMucmVwbGFjZXJcIiBvciBcIm9wdGlvbnMuaWdub3JlVW5rbm93blwiXFxuJyxcbiAgICAgICk7XG4gICAgfSxcbiAgICBfZG9td2luZG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImRvbXdpbmRvd1wiKTtcbiAgICB9LFxuICAgIF9iaWdpbnQ6IGZ1bmN0aW9uIChudW1iZXI6IGJpZ2ludCkge1xuICAgICAgd3JpdGUoXCJiaWdpbnQ6XCIgKyBudW1iZXIudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICAvKiBOb2RlLmpzIHN0YW5kYXJkIG5hdGl2ZSBvYmplY3RzICovXG4gICAgX3Byb2Nlc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwicHJvY2Vzc1wiKTtcbiAgICB9LFxuICAgIF90aW1lcjogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ0aW1lclwiKTtcbiAgICB9LFxuICAgIF9waXBlOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInBpcGVcIik7XG4gICAgfSxcbiAgICBfdGNwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInRjcFwiKTtcbiAgICB9LFxuICAgIF91ZHA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwidWRwXCIpO1xuICAgIH0sXG4gICAgX3R0eTogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ0dHlcIik7XG4gICAgfSxcbiAgICBfc3RhdHdhdGNoZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwic3RhdHdhdGNoZXJcIik7XG4gICAgfSxcbiAgICBfc2VjdXJlY29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJzZWN1cmVjb250ZXh0XCIpO1xuICAgIH0sXG4gICAgX2Nvbm5lY3Rpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiY29ubmVjdGlvblwiKTtcbiAgICB9LFxuICAgIF96bGliOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInpsaWJcIik7XG4gICAgfSxcbiAgICBfY29udGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJjb250ZXh0XCIpO1xuICAgIH0sXG4gICAgX25vZGVzY3JpcHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwibm9kZXNjcmlwdFwiKTtcbiAgICB9LFxuICAgIF9odHRwcGFyc2VyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImh0dHBwYXJzZXJcIik7XG4gICAgfSxcbiAgICBfZGF0YXZpZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiZGF0YXZpZXdcIik7XG4gICAgfSxcbiAgICBfc2lnbmFsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInNpZ25hbFwiKTtcbiAgICB9LFxuICAgIF9mc2V2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImZzZXZlbnRcIik7XG4gICAgfSxcbiAgICBfdGxzd3JhcDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ0bHN3cmFwXCIpO1xuICAgIH0sXG4gIH07XG59XG5cbi8vIE1pbmktaW1wbGVtZW50YXRpb24gb2Ygc3RyZWFtLlBhc3NUaHJvdWdoXG4vLyBXZSBhcmUgZmFyIGZyb20gaGF2aW5nIG5lZWQgZm9yIHRoZSBmdWxsIGltcGxlbWVudGF0aW9uLCBhbmQgd2UgY2FuXG4vLyBtYWtlIGFzc3VtcHRpb25zIGxpa2UgXCJtYW55IHdyaXRlcywgdGhlbiBvbmx5IG9uZSBmaW5hbCByZWFkXCJcbi8vIGFuZCB3ZSBjYW4gaWdub3JlIGVuY29kaW5nIHNwZWNpZmljc1xuZnVuY3Rpb24gUGFzc1Rocm91Z2goKSB7XG4gIHJldHVybiB7XG4gICAgYnVmOiBcIlwiLFxuXG4gICAgd3JpdGU6IGZ1bmN0aW9uIChiOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuYnVmICs9IGI7XG4gICAgfSxcblxuICAgIGVuZDogZnVuY3Rpb24gKGI6IHN0cmluZykge1xuICAgICAgdGhpcy5idWYgKz0gYjtcbiAgICB9LFxuXG4gICAgcmVhZDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYnVmO1xuICAgIH0sXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBGdW5jdGlvblJldHVybmluZ1Byb21pc2UsXG4gIFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlLFxuICBNdXRhdGVQcm9taXNlLFxuICBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsXG4gIFVud3JhcFJldHVybixcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyB1c2VDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUNhY2hlZFN0YXRlXCI7XG5pbXBvcnQgeyB1c2VQcm9taXNlLCBQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgaGFzaCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLy8gU3ltYm9sIHRvIGRpZmZlcmVudGlhdGUgYW4gZW1wdHkgY2FjaGUgZnJvbSBgdW5kZWZpbmVkYFxuY29uc3QgZW1wdHlDYWNoZSA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2woKTtcblxuZXhwb3J0IHR5cGUgQ2FjaGVkUHJvbWlzZU9wdGlvbnM8XG4gIFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UgfCBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsXG4gIFUsXG4+ID0gUHJvbWlzZU9wdGlvbnM8VD4gJiB7XG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBkYXRhIGlmIHRoZXJlIGFyZW4ndCBhbnkgaW4gdGhlIENhY2hlIHlldC5cbiAgICovXG4gIGluaXRpYWxEYXRhPzogVTtcbiAgLyoqXG4gICAqIFRlbGxzIHRoZSBob29rIHRvIGtlZXAgdGhlIHByZXZpb3VzIHJlc3VsdHMgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlIGluaXRpYWwgdmFsdWVcbiAgICogaWYgdGhlcmUgYXJlbid0IGFueSBpbiB0aGUgY2FjaGUgZm9yIHRoZSBuZXcgYXJndW1lbnRzLlxuICAgKiBUaGlzIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgd2hlbiB1c2VkIGZvciBkYXRhIGZvciBhIExpc3QgdG8gYXZvaWQgZmxpY2tlcmluZy5cbiAgICovXG4gIGtlZXBQcmV2aW91c0RhdGE/OiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBXcmFwcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIGluIGFub3RoZXIgZnVuY3Rpb24sIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmdW5jdGlvbi4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEByZW1hcmsgVGhpcyBvdmVybG9hZCBzaG91bGQgYmUgdXNlZCB3aGVuIHdvcmtpbmcgd2l0aCBwYWdpbmF0ZWQgZGF0YSBzb3VyY2VzLlxuICogQHJlbWFyayBXaGVuIHBhZ2luYXRpbmcsIG9ubHkgdGhlIGZpcnN0IHBhZ2Ugd2lsbCBiZSBjYWNoZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgc2V0VGltZW91dCB9IGZyb20gXCJub2RlOnRpbWVycy9wcm9taXNlc1wiO1xuICogaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbiAqIGltcG9ydCB7IExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUoXCJcIik7XG4gKlxuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcGFnaW5hdGlvbiB9ID0gdXNlQ2FjaGVkUHJvbWlzZShcbiAqICAgICAoc2VhcmNoVGV4dDogc3RyaW5nKSA9PiBhc3luYyAob3B0aW9uczogeyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICogICAgICAgYXdhaXQgc2V0VGltZW91dCgyMDApO1xuICogICAgICAgY29uc3QgbmV3RGF0YSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDI1IH0sIChfdiwgaW5kZXgpID0+ICh7XG4gKiAgICAgICAgIGluZGV4LFxuICogICAgICAgICBwYWdlOiBvcHRpb25zLnBhZ2UsXG4gKiAgICAgICAgIHRleHQ6IHNlYXJjaFRleHQsXG4gKiAgICAgICB9KSk7XG4gKiAgICAgICByZXR1cm4geyBkYXRhOiBuZXdEYXRhLCBoYXNNb3JlOiBvcHRpb25zLnBhZ2UgPCAxMCB9O1xuICogICAgIH0sXG4gKiAgICAgW3NlYXJjaFRleHRdLFxuICogICApO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gb25TZWFyY2hUZXh0Q2hhbmdlPXtzZXRTZWFyY2hUZXh0fSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufT5cbiAqICAgICAgIHtkYXRhPy5tYXAoKGl0ZW0pID0+IChcbiAqICAgICAgICAgPExpc3QuSXRlbVxuICogICAgICAgICAgIGtleT17YCR7aXRlbS5wYWdlfSAke2l0ZW0uaW5kZXh9ICR7aXRlbS50ZXh0fWB9XG4gKiAgICAgICAgICAgdGl0bGU9e2BQYWdlICR7aXRlbS5wYWdlfSBJdGVtICR7aXRlbS5pbmRleH1gfVxuICogICAgICAgICAgIHN1YnRpdGxlPXtpdGVtLnRleHR9XG4gKiAgICAgICAgIC8+XG4gKiAgICAgICApKX1cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZTxbXT4+KFxuICBmbjogVCxcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPiwgdW5kZWZpbmVkPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIFUgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcbiAgZm46IFQsXG4gIGFyZ3M6IFBhcmFtZXRlcnM8VD4sXG4gIG9wdGlvbnM/OiBDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPiwgVT47XG5cbi8qKlxuICogV3JhcHMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZnVuY3Rpb24uIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAcmVtYXJrIFRoZSB2YWx1ZSBuZWVkcyB0byBiZSBKU09OIHNlcmlhbGl6YWJsZS5cbiAqIEByZW1hcmsgVGhlIGZ1bmN0aW9uIGlzIGFzc3VtZWQgdG8gYmUgY29uc3RhbnQgKGVnLiBjaGFuZ2luZyBpdCB3b24ndCB0cmlnZ2VyIGEgcmV2YWxpZGF0aW9uKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSAnQHJheWNhc3QvdXRpbHMnO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KCk7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCByZXZhbGlkYXRlIH0gPSB1c2VDYWNoZWRQcm9taXNlKGFzeW5jICh1cmw6IHN0cmluZykgPT4ge1xuICogICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCB9KTtcbiAqICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gKiAgICAgcmV0dXJuIHJlc3VsdFxuICogICB9LFxuICogICBbJ2h0dHBzOi8vYXBpLmV4YW1wbGUnXSxcbiAqICAge1xuICogICAgIGFib3J0YWJsZVxuICogICB9KTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPERldGFpbFxuICogICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gKiAgICAgICBtYXJrZG93bj17ZGF0YX1cbiAqICAgICAgIGFjdGlvbnM9e1xuICogICAgICAgICA8QWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgPEFjdGlvbiB0aXRsZT1cIlJlbG9hZFwiIG9uQWN0aW9uPXsoKSA9PiByZXZhbGlkYXRlKCl9IC8+XG4gKiAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gKiAgICAgICB9XG4gKiAgICAgLz5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZTxbXT4+KFxuICBmbjogVCxcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPiwgdW5kZWZpbmVkPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UsIFUgPSB1bmRlZmluZWQ+KFxuICBmbjogVCxcbiAgYXJnczogUGFyYW1ldGVyczxUPixcbiAgb3B0aW9ucz86IENhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+LCBVPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFByb21pc2U8XG4gIFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UgfCBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIFUgZXh0ZW5kcyBhbnlbXSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcbj4oZm46IFQsIGFyZ3M/OiBQYXJhbWV0ZXJzPFQ+LCBvcHRpb25zPzogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4pIHtcbiAgLyoqXG4gICAqIFRoZSBob29rIGdlbmVyYXRlcyBhIGNhY2hlIGtleSBmcm9tIHRoZSBwcm9taXNlIGl0IHJlY2VpdmVzICYgaXRzIGFyZ3VtZW50cy5cbiAgICogU29tZXRpbWVzIHRoYXQncyBub3QgZW5vdWdoIHRvIGd1YXJhbnRlZSB1bmlxdWVuZXNzLCBzbyBob29rcyB0aGF0IGJ1aWxkIG9uIHRvcCBvZiBgdXNlQ2FjaGVkUHJvbWlzZWAgY2FuXG4gICAqIHVzZSBhbiBgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXhgIHRvIGhlbHAgaXQuXG4gICAqXG4gICAqIEByZW1hcmsgRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKi9cbiAgY29uc3Qge1xuICAgIGluaXRpYWxEYXRhLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXgsXG4gICAgLi4udXNlUHJvbWlzZU9wdGlvbnNcbiAgfTogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4gJiB7IGludGVybmFsX2NhY2hlS2V5U3VmZml4Pzogc3RyaW5nIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBsYXN0VXBkYXRlRnJvbSA9IHVzZVJlZjxcImNhY2hlXCIgfCBcInByb21pc2VcIj4obnVsbCk7XG5cbiAgY29uc3QgW2NhY2hlZERhdGEsIG11dGF0ZUNhY2hlXSA9IHVzZUNhY2hlZFN0YXRlPHR5cGVvZiBlbXB0eUNhY2hlIHwgKFVud3JhcFJldHVybjxUPiB8IFUpPihcbiAgICBoYXNoKGFyZ3MgfHwgW10pICsgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXgsXG4gICAgZW1wdHlDYWNoZSxcbiAgICB7XG4gICAgICBjYWNoZU5hbWVzcGFjZTogaGFzaChmbiksXG4gICAgfSxcbiAgKTtcblxuICAvLyBVc2UgYSByZWYgdG8gc3RvcmUgcHJldmlvdXMgcmV0dXJuZWQgZGF0YS4gVXNlIHRoZSBpbml0YWwgZGF0YSBhcyBpdHMgaW5pdGFsIHZhbHVlIGZyb20gdGhlIGNhY2hlLlxuICBjb25zdCBsYWdneURhdGFSZWYgPSB1c2VSZWY8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+PiB8IFU+KGNhY2hlZERhdGEgIT09IGVtcHR5Q2FjaGUgPyBjYWNoZWREYXRhIDogKGluaXRpYWxEYXRhIGFzIFUpKTtcbiAgY29uc3QgcGFnaW5hdGlvbkFyZ3NSZWYgPSB1c2VSZWY8UGFnaW5hdGlvbk9wdGlvbnM8VW53cmFwUmV0dXJuPFQ+IHwgVT4gfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG5cbiAgY29uc3Qge1xuICAgIG11dGF0ZTogX211dGF0ZSxcbiAgICByZXZhbGlkYXRlLFxuICAgIC4uLnN0YXRlXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBmbiBoYXMgdGhlIHNhbWUgc2lnbmF0dXJlIGluIGJvdGggdXNlUHJvbWlzZSBhbmQgdXNlQ2FjaGVkUHJvbWlzZVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIH0gPSB1c2VQcm9taXNlKGZuLCBhcmdzIHx8IChbXSBhcyBhbnkgYXMgUGFyYW1ldGVyczxUPiksIHtcbiAgICAuLi51c2VQcm9taXNlT3B0aW9ucyxcbiAgICBvbkRhdGEoZGF0YSwgcGFnaW5hdGlvbikge1xuICAgICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCA9IHBhZ2luYXRpb247XG4gICAgICBpZiAodXNlUHJvbWlzZU9wdGlvbnMub25EYXRhKSB7XG4gICAgICAgIHVzZVByb21pc2VPcHRpb25zLm9uRGF0YShkYXRhLCBwYWdpbmF0aW9uKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYWdpbmF0aW9uICYmIHBhZ2luYXRpb24ucGFnZSA+IDApIHtcbiAgICAgICAgLy8gZG9uJ3QgY2FjaGUgYmV5b25kIHRoZSBmaXJzdCBwYWdlXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPSBcInByb21pc2VcIjtcbiAgICAgIGxhZ2d5RGF0YVJlZi5jdXJyZW50ID0gZGF0YTtcbiAgICAgIG11dGF0ZUNhY2hlKGRhdGEpO1xuICAgIH0sXG4gIH0pO1xuXG4gIGxldCByZXR1cm5lZERhdGE6IFUgfCBBd2FpdGVkPFJldHVyblR5cGU8VD4+IHwgVW53cmFwUmV0dXJuPFQ+O1xuICBjb25zdCBwYWdpbmF0aW9uID0gc3RhdGUucGFnaW5hdGlvbjtcbiAgLy8gd2hlbiBwYWdpbmF0aW5nLCBvbmx5IHRoZSBmaXJzdCBwYWdlIGdldHMgY2FjaGVkLCBzbyB3ZSByZXR1cm4gdGhlIGRhdGEgd2UgZ2V0IGZyb20gYHVzZVByb21pc2VgLCBiZWNhdXNlXG4gIC8vIGl0IHdpbGwgYmUgYWNjdW11bGF0ZWQuXG4gIGlmIChwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50ICYmIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQucGFnZSA+IDAgJiYgc3RhdGUuZGF0YSkge1xuICAgIHJldHVybmVkRGF0YSA9IHN0YXRlLmRhdGEgYXMgVW53cmFwUmV0dXJuPFQ+O1xuICAgIC8vIGlmIHRoZSBsYXRlc3QgdXBkYXRlIGlmIGZyb20gdGhlIFByb21pc2UsIHdlIGtlZXAgaXRcbiAgfSBlbHNlIGlmIChsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID09PSBcInByb21pc2VcIikge1xuICAgIHJldHVybmVkRGF0YSA9IGxhZ2d5RGF0YVJlZi5jdXJyZW50O1xuICB9IGVsc2UgaWYgKGtlZXBQcmV2aW91c0RhdGEgJiYgY2FjaGVkRGF0YSAhPT0gZW1wdHlDYWNoZSkge1xuICAgIC8vIGlmIHdlIHdhbnQgdG8ga2VlcCB0aGUgbGF0ZXN0IGRhdGEsIHdlIHBpY2sgdGhlIGNhY2hlIGJ1dCBvbmx5IGlmIGl0J3Mgbm90IGVtcHR5XG4gICAgcmV0dXJuZWREYXRhID0gY2FjaGVkRGF0YTtcbiAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgcGFnaW5hdGlvbi5oYXNNb3JlID0gdHJ1ZTtcbiAgICAgIHBhZ2luYXRpb24ucGFnZVNpemUgPSBjYWNoZWREYXRhLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoa2VlcFByZXZpb3VzRGF0YSAmJiBjYWNoZWREYXRhID09PSBlbXB0eUNhY2hlKSB7XG4gICAgLy8gaWYgdGhlIGNhY2hlIGlzIGVtcHR5LCB3ZSB3aWxsIHJldHVybiB0aGUgcHJldmlvdXMgZGF0YVxuICAgIHJldHVybmVkRGF0YSA9IGxhZ2d5RGF0YVJlZi5jdXJyZW50O1xuICAgIC8vIHRoZXJlIGFyZSBubyBzcGVjaWFsIGNhc2VzLCBzbyBlaXRoZXIgcmV0dXJuIHRoZSBjYWNoZSBvciBpbml0aWFsIGRhdGFcbiAgfSBlbHNlIGlmIChjYWNoZWREYXRhICE9PSBlbXB0eUNhY2hlKSB7XG4gICAgcmV0dXJuZWREYXRhID0gY2FjaGVkRGF0YTtcbiAgICBpZiAocGFnaW5hdGlvbikge1xuICAgICAgcGFnaW5hdGlvbi5oYXNNb3JlID0gdHJ1ZTtcbiAgICAgIHBhZ2luYXRpb24ucGFnZVNpemUgPSBjYWNoZWREYXRhLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuZWREYXRhID0gaW5pdGlhbERhdGEgYXMgVTtcbiAgfVxuXG4gIGNvbnN0IGxhdGVzdERhdGEgPSB1c2VMYXRlc3QocmV0dXJuZWREYXRhKTtcblxuICAvLyB3ZSByZXdyaXRlIHRoZSBtdXRhdGUgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjYWNoZSBpbnN0ZWFkXG4gIGNvbnN0IG11dGF0ZSA9IHVzZUNhbGxiYWNrPE11dGF0ZVByb21pc2U8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+PiB8IFU+PihcbiAgICBhc3luYyAoYXN5bmNVcGRhdGUsIG9wdGlvbnMpID0+IHtcbiAgICAgIGxldCBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChvcHRpb25zPy5vcHRpbWlzdGljVXBkYXRlKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IFwiZnVuY3Rpb25cIiAmJiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBkYXRhIGJlZm9yZSB0aGUgb3B0aW1pc3RpYyB1cGRhdGUsXG4gICAgICAgICAgICAvLyBidXQgb25seSBpZiB3ZSBuZWVkIGl0IChlZy4gb25seSB3aGVuIHdlIHdhbnQgdG8gYXV0b21hdGljYWxseSByb2xsYmFjayBhZnRlcilcbiAgICAgICAgICAgIGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlID0gc3RydWN0dXJlZENsb25lKGxhdGVzdERhdGEuY3VycmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLm9wdGltaXN0aWNVcGRhdGUobGF0ZXN0RGF0YS5jdXJyZW50KTtcbiAgICAgICAgICBsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID0gXCJjYWNoZVwiO1xuICAgICAgICAgIGxhZ2d5RGF0YVJlZi5jdXJyZW50ID0gZGF0YTtcbiAgICAgICAgICBtdXRhdGVDYWNoZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgX211dGF0ZShhc3luY1VwZGF0ZSwgeyBzaG91bGRSZXZhbGlkYXRlQWZ0ZXI6IG9wdGlvbnM/LnNob3VsZFJldmFsaWRhdGVBZnRlciB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IG9wdGlvbnMucm9sbGJhY2tPbkVycm9yKGxhdGVzdERhdGEuY3VycmVudCk7XG4gICAgICAgICAgbGFzdFVwZGF0ZUZyb20uY3VycmVudCA9IFwiY2FjaGVcIjtcbiAgICAgICAgICBsYWdneURhdGFSZWYuY3VycmVudCA9IGRhdGE7XG4gICAgICAgICAgbXV0YXRlQ2FjaGUoZGF0YSk7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucz8ub3B0aW1pc3RpY1VwZGF0ZSAmJiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgIT09IGZhbHNlKSB7XG4gICAgICAgICAgbGFzdFVwZGF0ZUZyb20uY3VycmVudCA9IFwiY2FjaGVcIjtcbiAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdoZW4gdW5kZWZpbmVkLCBpdCdzIGV4cGVjdGVkXG4gICAgICAgICAgbGFnZ3lEYXRhUmVmLmN1cnJlbnQgPSBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZTtcbiAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdoZW4gdW5kZWZpbmVkLCBpdCdzIGV4cGVjdGVkXG4gICAgICAgICAgbXV0YXRlQ2FjaGUoZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9LFxuICAgIFttdXRhdGVDYWNoZSwgX211dGF0ZSwgbGF0ZXN0RGF0YSwgbGFnZ3lEYXRhUmVmLCBsYXN0VXBkYXRlRnJvbV0sXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY2FjaGVkRGF0YSAhPT0gZW1wdHlDYWNoZSkge1xuICAgICAgbGFzdFVwZGF0ZUZyb20uY3VycmVudCA9IFwiY2FjaGVcIjtcbiAgICAgIGxhZ2d5RGF0YVJlZi5jdXJyZW50ID0gY2FjaGVkRGF0YTtcbiAgICB9XG4gIH0sIFtjYWNoZWREYXRhXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhOiByZXR1cm5lZERhdGEsXG4gICAgaXNMb2FkaW5nOiBzdGF0ZS5pc0xvYWRpbmcsXG4gICAgZXJyb3I6IHN0YXRlLmVycm9yLFxuICAgIG11dGF0ZTogcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCAmJiBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50LnBhZ2UgPiAwID8gX211dGF0ZSA6IG11dGF0ZSxcbiAgICBwYWdpbmF0aW9uLFxuICAgIHJldmFsaWRhdGUsXG4gIH07XG59XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSwgQ2FjaGVkUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VDYWNoZWRQcm9taXNlXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlLCBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBpc0pTT04gfSBmcm9tIFwiLi9mZXRjaC11dGlsc1wiO1xuaW1wb3J0IHsgaGFzaCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuYXN5bmMgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmcocmVzcG9uc2U6IFJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIH1cblxuICBjb25zdCBjb250ZW50VHlwZUhlYWRlciA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpO1xuXG4gIGlmIChjb250ZW50VHlwZUhlYWRlciAmJiBpc0pTT04oY29udGVudFR5cGVIZWFkZXIpKSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgfVxuICByZXR1cm4gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TWFwcGluZzxWLCBUIGV4dGVuZHMgdW5rbm93bltdPihyZXN1bHQ6IFYpOiB7IGRhdGE6IFQ7IGhhc01vcmU/OiBib29sZWFuOyBjdXJzb3I/OiBhbnkgfSB7XG4gIHJldHVybiB7IGRhdGE6IHJlc3VsdCBhcyB1bmtub3duIGFzIFQsIGhhc01vcmU6IGZhbHNlIH07XG59XG5cbnR5cGUgUmVxdWVzdEluZm8gPSBzdHJpbmcgfCBVUkwgfCBnbG9iYWxUaGlzLlJlcXVlc3Q7XG50eXBlIFBhZ2luYXRlZFJlcXVlc3RJbmZvID0gKHBhZ2luYXRpb246IHsgcGFnZTogbnVtYmVyOyBsYXN0SXRlbT86IGFueTsgY3Vyc29yPzogYW55IH0pID0+IFJlcXVlc3RJbmZvO1xuXG4vKipcbiAqIEZldGNoZXMgdGhlIHBhZ2luYXRlZFVSTCBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZmV0Y2guIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAcmVtYXJrIFRoaXMgb3ZlcmxvYWQgc2hvdWxkIGJlIHVzZWQgd2hlbiB3b3JraW5nIHdpdGggcGFnaW5hdGVkIGRhdGEgc291cmNlcy5cbiAqIEByZW1hcmsgV2hlbiBwYWdpbmF0aW5nLCBvbmx5IHRoZSBmaXJzdCBwYWdlIHdpbGwgYmUgY2FjaGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IEljb24sIEltYWdlLCBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlRmV0Y2ggfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqIGltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4gKlxuICogdHlwZSBTZWFyY2hSZXN1bHQgPSB7IGNvbXBhbmllczogQ29tcGFueVtdOyBwYWdlOiBudW1iZXI7IHRvdGFsUGFnZXM6IG51bWJlciB9O1xuICogdHlwZSBDb21wYW55ID0geyBpZDogbnVtYmVyOyBuYW1lOiBzdHJpbmc7IHNtYWxsTG9nb1VybD86IHN0cmluZyB9O1xuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUoXCJcIik7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCBwYWdpbmF0aW9uIH0gPSB1c2VGZXRjaChcbiAqICAgICAob3B0aW9ucykgPT5cbiAqICAgICAgIFwiaHR0cHM6Ly9hcGkueWNvbWJpbmF0b3IuY29tL3YwLjEvY29tcGFuaWVzP1wiICtcbiAqICAgICAgIG5ldyBVUkxTZWFyY2hQYXJhbXMoeyBwYWdlOiBTdHJpbmcob3B0aW9ucy5wYWdlICsgMSksIHE6IHNlYXJjaFRleHQgfSkudG9TdHJpbmcoKSxcbiAqICAgICB7XG4gKiAgICAgICBtYXBSZXN1bHQocmVzdWx0OiBTZWFyY2hSZXN1bHQpIHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBkYXRhOiByZXN1bHQuY29tcGFuaWVzLFxuICogICAgICAgICAgIGhhc01vcmU6IHJlc3VsdC5wYWdlIDwgcmVzdWx0LnRvdGFsUGFnZXMsXG4gKiAgICAgICAgIH07XG4gKiAgICAgICB9LFxuICogICAgICAga2VlcFByZXZpb3VzRGF0YTogdHJ1ZSxcbiAqICAgICAgIGluaXRpYWxEYXRhOiBbXSxcbiAqICAgICB9LFxuICogICApO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0gb25TZWFyY2hUZXh0Q2hhbmdlPXtzZXRTZWFyY2hUZXh0fT5cbiAqICAgICAgIHtkYXRhLm1hcCgoY29tcGFueSkgPT4gKFxuICogICAgICAgICA8TGlzdC5JdGVtXG4gKiAgICAgICAgICAga2V5PXtjb21wYW55LmlkfVxuICogICAgICAgICAgIGljb249e3sgc291cmNlOiBjb21wYW55LnNtYWxsTG9nb1VybCA/PyBJY29uLk1pbnVzQ2lyY2xlLCBtYXNrOiBJbWFnZS5NYXNrLlJvdW5kZWRSZWN0YW5nbGUgfX1cbiAqICAgICAgICAgICB0aXRsZT17Y29tcGFueS5uYW1lfVxuICogICAgICAgICAvPlxuICogICAgICAgKSl9XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VGZXRjaDxWID0gdW5rbm93biwgVSA9IHVuZGVmaW5lZCwgVCBleHRlbmRzIHVua25vd25bXSA9IHVua25vd25bXT4oXG4gIHVybDogUGFnaW5hdGVkUmVxdWVzdEluZm8sXG4gIG9wdGlvbnM6IFJlcXVlc3RJbml0ICYge1xuICAgIG1hcFJlc3VsdDogKHJlc3VsdDogVikgPT4geyBkYXRhOiBUOyBoYXNNb3JlPzogYm9vbGVhbjsgY3Vyc29yPzogYW55IH07XG4gICAgcGFyc2VSZXNwb25zZT86IChyZXNwb25zZTogUmVzcG9uc2UpID0+IFByb21pc2U8Vj47XG4gIH0gJiBPbWl0PENhY2hlZFByb21pc2VPcHRpb25zPCh1cmw6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8VD4sIFU+LCBcImFib3J0YWJsZVwiPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuLyoqXG4gKiBGZXRjaCB0aGUgVVJMIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmZXRjaC4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHVzZUZldGNoIH0gZnJvbSAnQHJheWNhc3QvdXRpbHMnO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCByZXZhbGlkYXRlIH0gPSB1c2VGZXRjaCgnaHR0cHM6Ly9hcGkuZXhhbXBsZScpO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8RGV0YWlsXG4gKiAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAqICAgICAgIG1hcmtkb3duPXtkYXRhfVxuICogICAgICAgYWN0aW9ucz17XG4gKiAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiUmVsb2FkXCIgb25BY3Rpb249eygpID0+IHJldmFsaWRhdGUoKX0gLz5cbiAqICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAqICAgICAgIH1cbiAqICAgICAvPlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRmV0Y2g8ViA9IHVua25vd24sIFUgPSB1bmRlZmluZWQsIFQgPSBWPihcbiAgdXJsOiBSZXF1ZXN0SW5mbyxcbiAgb3B0aW9ucz86IFJlcXVlc3RJbml0ICYge1xuICAgIG1hcFJlc3VsdD86IChyZXN1bHQ6IFYpID0+IHsgZGF0YTogVDsgaGFzTW9yZT86IGJvb2xlYW47IGN1cnNvcj86IGFueSB9O1xuICAgIHBhcnNlUmVzcG9uc2U/OiAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiBQcm9taXNlPFY+O1xuICB9ICYgT21pdDxDYWNoZWRQcm9taXNlT3B0aW9uczwodXJsOiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFQ+LCBVPiwgXCJhYm9ydGFibGVcIj4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPiAmIHsgcGFnaW5hdGlvbjogdW5kZWZpbmVkIH07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGZXRjaDxWID0gdW5rbm93biwgVSA9IHVuZGVmaW5lZCwgVCBleHRlbmRzIHVua25vd25bXSA9IHVua25vd25bXT4oXG4gIHVybDogUmVxdWVzdEluZm8gfCBQYWdpbmF0ZWRSZXF1ZXN0SW5mbyxcbiAgb3B0aW9ucz86IFJlcXVlc3RJbml0ICYge1xuICAgIG1hcFJlc3VsdD86IChyZXN1bHQ6IFYpID0+IHsgZGF0YTogVDsgaGFzTW9yZT86IGJvb2xlYW47IGN1cnNvcj86IGFueSB9O1xuICAgIHBhcnNlUmVzcG9uc2U/OiAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiBQcm9taXNlPFY+O1xuICB9ICYgT21pdDxDYWNoZWRQcm9taXNlT3B0aW9uczwodXJsOiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFQ+LCBVPiwgXCJhYm9ydGFibGVcIj4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPiB7XG4gIGNvbnN0IHtcbiAgICBwYXJzZVJlc3BvbnNlLFxuICAgIG1hcFJlc3VsdCxcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICAgIC4uLmZldGNoT3B0aW9uc1xuICB9ID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCB1c2VDYWNoZWRQcm9taXNlT3B0aW9uczogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8KHVybDogUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxUPiwgVT4gPSB7XG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBwYXJzZVJlc3BvbnNlUmVmID0gdXNlTGF0ZXN0KHBhcnNlUmVzcG9uc2UgfHwgZGVmYXVsdFBhcnNpbmcpO1xuICBjb25zdCBtYXBSZXN1bHRSZWYgPSB1c2VMYXRlc3QobWFwUmVzdWx0IHx8IGRlZmF1bHRNYXBwaW5nKTtcbiAgY29uc3QgdXJsUmVmID0gdXNlUmVmPFJlcXVlc3RJbmZvIHwgUGFnaW5hdGVkUmVxdWVzdEluZm8+KG51bGwpO1xuICBjb25zdCBmaXJzdFBhZ2VVcmxSZWYgPSB1c2VSZWY8UmVxdWVzdEluZm8gfCB1bmRlZmluZWQ+KG51bGwpO1xuICBjb25zdCBmaXJzdFBhZ2VVcmwgPSB0eXBlb2YgdXJsID09PSBcImZ1bmN0aW9uXCIgPyB1cmwoeyBwYWdlOiAwIH0pIDogdW5kZWZpbmVkO1xuICAvKipcbiAgICogV2hlbiBwYWdpbmF0aW5nLCBgdXJsYCBpcyBhIGBQYWdpbmF0ZWRSZXF1ZXN0SW5mb2AsIHNvIHdlIG9ubHkgd2FudCB0byB1cGRhdGUgdGhlIHJlZiB3aGVuIHRoZSBgZmlyc3RQYWdlVXJsYCBjaGFuZ2VzLlxuICAgKiBXaGVuIG5vdCBwYWdpbmF0aW5nLCBgdXJsYCBpcyBhIGBSZXF1ZXN0SW5mb2AsIHNvIHdlIHdhbnQgdG8gdXBkYXRlIHRoZSByZWYgd2hlbmV2ZXIgYHVybGAgY2hhbmdlcy5cbiAgICovXG4gIGlmICghdXJsUmVmLmN1cnJlbnQgfHwgdHlwZW9mIGZpcnN0UGFnZVVybFJlZi5jdXJyZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IGZpcnN0UGFnZVVybFJlZi5jdXJyZW50ICE9PSBmaXJzdFBhZ2VVcmwpIHtcbiAgICB1cmxSZWYuY3VycmVudCA9IHVybDtcbiAgfVxuICBmaXJzdFBhZ2VVcmxSZWYuY3VycmVudCA9IGZpcnN0UGFnZVVybDtcbiAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4obnVsbCk7XG5cbiAgY29uc3QgcGFnaW5hdGVkRm46IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZTxbUGFnaW5hdGVkUmVxdWVzdEluZm8sIHR5cGVvZiBmZXRjaE9wdGlvbnNdLCBUPiA9IHVzZUNhbGxiYWNrKFxuICAgICh1cmw6IFBhZ2luYXRlZFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IGFzeW5jIChwYWdpbmF0aW9uOiB7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwocGFnaW5hdGlvbiksIHsgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsLCAuLi5vcHRpb25zIH0pO1xuICAgICAgY29uc3QgcGFyc2VkID0gKGF3YWl0IHBhcnNlUmVzcG9uc2VSZWYuY3VycmVudChyZXMpKSBhcyBWO1xuICAgICAgcmV0dXJuIG1hcFJlc3VsdFJlZi5jdXJyZW50Py4ocGFyc2VkKTtcbiAgICB9LFxuICAgIFtwYXJzZVJlc3BvbnNlUmVmLCBtYXBSZXN1bHRSZWZdLFxuICApO1xuICBjb25zdCBmbjogRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlPFtSZXF1ZXN0SW5mbywgUmVxdWVzdEluaXQ/XSwgVD4gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodXJsOiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsLCAuLi5vcHRpb25zIH0pO1xuICAgICAgY29uc3QgcGFyc2VkID0gKGF3YWl0IHBhcnNlUmVzcG9uc2VSZWYuY3VycmVudChyZXMpKSBhcyBWO1xuICAgICAgY29uc3QgbWFwcGVkID0gbWFwUmVzdWx0UmVmLmN1cnJlbnQocGFyc2VkKTtcbiAgICAgIHJldHVybiBtYXBwZWQ/LmRhdGEgYXMgdW5rbm93biBhcyBUO1xuICAgIH0sXG4gICAgW3BhcnNlUmVzcG9uc2VSZWYsIG1hcFJlc3VsdFJlZl0sXG4gICk7XG5cbiAgY29uc3QgcHJvbWlzZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChmaXJzdFBhZ2VVcmxSZWYuY3VycmVudCkge1xuICAgICAgcmV0dXJuIHBhZ2luYXRlZEZuO1xuICAgIH1cbiAgICByZXR1cm4gZm47XG4gIH0sIFtmaXJzdFBhZ2VVcmxSZWYsIGZuLCBwYWdpbmF0ZWRGbl0pO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgbGFzdEl0ZW0gY2FuJ3QgYmUgaW5mZXJyZWQgcHJvcGVybHlcbiAgcmV0dXJuIHVzZUNhY2hlZFByb21pc2UocHJvbWlzZSwgW3VybFJlZi5jdXJyZW50IGFzIFBhZ2luYXRlZFJlcXVlc3RJbmZvLCBmZXRjaE9wdGlvbnNdLCB7XG4gICAgLi4udXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnMsXG4gICAgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXg6IGZpcnN0UGFnZVVybFJlZi5jdXJyZW50ICsgaGFzaChtYXBSZXN1bHRSZWYuY3VycmVudCkgKyBoYXNoKHBhcnNlUmVzcG9uc2VSZWYuY3VycmVudCksXG4gICAgYWJvcnRhYmxlLFxuICB9KTtcbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaXNKU09OKGNvbnRlbnRUeXBlSGVhZGVyOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gIGlmIChjb250ZW50VHlwZUhlYWRlcikge1xuICAgIGNvbnN0IG1lZGlhVHlwZSA9IHBhcnNlQ29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpO1xuXG4gICAgaWYgKCFtZWRpYVR5cGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobWVkaWFUeXBlLnN1YnR5cGUgPT09IFwianNvblwiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWVkaWFUeXBlLnN1ZmZpeCA9PT0gXCJqc29uXCIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtZWRpYVR5cGUuc3VmZml4ICYmIC9cXGJqc29uXFxiL2kudGVzdChtZWRpYVR5cGUuc3VmZml4KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhVHlwZS5zdWJ0eXBlICYmIC9cXGJqc29uXFxiL2kudGVzdChtZWRpYVR5cGUuc3VidHlwZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogUmVnRXhwIHRvIG1hdGNoIHR5cGUgaW4gUkZDIDY4Mzggd2l0aCBhbiBvcHRpb25hbCB0cmFpbGluZyBgO2AgYmVjYXVzZSBzb21lIEFwcGxlIEFQSXMgcmV0dXJucyBvbmUuLi5cbiAqXG4gKiB0eXBlLW5hbWUgPSByZXN0cmljdGVkLW5hbWVcbiAqIHN1YnR5cGUtbmFtZSA9IHJlc3RyaWN0ZWQtbmFtZVxuICogcmVzdHJpY3RlZC1uYW1lID0gcmVzdHJpY3RlZC1uYW1lLWZpcnN0ICoxMjZyZXN0cmljdGVkLW5hbWUtY2hhcnNcbiAqIHJlc3RyaWN0ZWQtbmFtZS1maXJzdCAgPSBBTFBIQSAvIERJR0lUXG4gKiByZXN0cmljdGVkLW5hbWUtY2hhcnMgID0gQUxQSEEgLyBESUdJVCAvIFwiIVwiIC8gXCIjXCIgL1xuICogICAgICAgICAgICAgICAgICAgICAgICAgIFwiJFwiIC8gXCImXCIgLyBcIi1cIiAvIFwiXlwiIC8gXCJfXCJcbiAqIHJlc3RyaWN0ZWQtbmFtZS1jaGFycyA9LyBcIi5cIiA7IENoYXJhY3RlcnMgYmVmb3JlIGZpcnN0IGRvdCBhbHdheXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyBzcGVjaWZ5IGEgZmFjZXQgbmFtZVxuICogcmVzdHJpY3RlZC1uYW1lLWNoYXJzID0vIFwiK1wiIDsgQ2hhcmFjdGVycyBhZnRlciBsYXN0IHBsdXMgYWx3YXlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgc3BlY2lmeSBhIHN0cnVjdHVyZWQgc3ludGF4IHN1ZmZpeFxuICogQUxQSEEgPSAgJXg0MS01QSAvICV4NjEtN0EgICA7IEEtWiAvIGEtelxuICogRElHSVQgPSAgJXgzMC0zOSAgICAgICAgICAgICA7IDAtOVxuICovXG5jb25zdCBNRURJQV9UWVBFX1JFR0VYUCA9IC9eKFtBLVphLXowLTldW0EtWmEtejAtOSEjJCZeXy1dezAsMTI2fSlcXC8oW0EtWmEtejAtOV1bQS1aYS16MC05ISMkJl5fListXXswLDEyNn0pOz8kLztcblxuZnVuY3Rpb24gcGFyc2VDb250ZW50VHlwZShoZWFkZXI6IHN0cmluZykge1xuICBjb25zdCBoZWFkZXJEZWxpbWl0YXRpb25pbmRleCA9IGhlYWRlci5pbmRleE9mKFwiO1wiKTtcbiAgY29uc3QgY29udGVudFR5cGUgPSBoZWFkZXJEZWxpbWl0YXRpb25pbmRleCAhPT0gLTEgPyBoZWFkZXIuc2xpY2UoMCwgaGVhZGVyRGVsaW1pdGF0aW9uaW5kZXgpLnRyaW0oKSA6IGhlYWRlci50cmltKCk7XG5cbiAgY29uc3QgbWF0Y2ggPSBNRURJQV9UWVBFX1JFR0VYUC5leGVjKGNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCkudG9Mb3dlckNhc2UoKSk7XG5cbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHR5cGUgPSBtYXRjaFsxXTtcbiAgbGV0IHN1YnR5cGUgPSBtYXRjaFsyXTtcbiAgbGV0IHN1ZmZpeDtcblxuICAvLyBzdWZmaXggYWZ0ZXIgbGFzdCArXG4gIGNvbnN0IGluZGV4ID0gc3VidHlwZS5sYXN0SW5kZXhPZihcIitcIik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBzdWZmaXggPSBzdWJ0eXBlLnN1YnN0cmluZyhpbmRleCArIDEpO1xuICAgIHN1YnR5cGUgPSBzdWJ0eXBlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gIH1cblxuICByZXR1cm4geyB0eXBlLCBzdWJ0eXBlLCBzdWZmaXggfTtcbn1cbiIsICIvKlxuICogSW5zcGlyZWQgYnkgRXhlY2FcbiAqL1xuXG5pbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSwgQ2FjaGVkUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VDYWNoZWRQcm9taXNlXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7XG4gIGdldFNwYXduZWRQcm9taXNlLFxuICBnZXRTcGF3bmVkUmVzdWx0LFxuICBoYW5kbGVPdXRwdXQsXG4gIGRlZmF1bHRQYXJzaW5nLFxuICBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyLFxufSBmcm9tIFwiLi9leGVjLXV0aWxzXCI7XG5cbnR5cGUgRXhlY09wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBJZiBgdHJ1ZWAsIHJ1bnMgdGhlIGNvbW1hbmQgaW5zaWRlIG9mIGEgc2hlbGwuIFVzZXMgYC9iaW4vc2hgLiBBIGRpZmZlcmVudCBzaGVsbCBjYW4gYmUgc3BlY2lmaWVkIGFzIGEgc3RyaW5nLiBUaGUgc2hlbGwgc2hvdWxkIHVuZGVyc3RhbmQgdGhlIGAtY2Agc3dpdGNoLlxuICAgKlxuICAgKiBXZSByZWNvbW1lbmQgYWdhaW5zdCB1c2luZyB0aGlzIG9wdGlvbiBzaW5jZSBpdCBpczpcbiAgICogLSBub3QgY3Jvc3MtcGxhdGZvcm0sIGVuY291cmFnaW5nIHNoZWxsLXNwZWNpZmljIHN5bnRheC5cbiAgICogLSBzbG93ZXIsIGJlY2F1c2Ugb2YgdGhlIGFkZGl0aW9uYWwgc2hlbGwgaW50ZXJwcmV0YXRpb24uXG4gICAqIC0gdW5zYWZlLCBwb3RlbnRpYWxseSBhbGxvd2luZyBjb21tYW5kIGluamVjdGlvbi5cbiAgICpcbiAgICogQGRlZmF1bHQgZmFsc2VcbiAgICovXG4gIHNoZWxsPzogYm9vbGVhbiB8IHN0cmluZztcbiAgLyoqXG4gICAqIFN0cmlwIHRoZSBmaW5hbCBuZXdsaW5lIGNoYXJhY3RlciBmcm9tIHRoZSBvdXRwdXQuXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIHN0cmlwRmluYWxOZXdsaW5lPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEN1cnJlbnQgd29ya2luZyBkaXJlY3Rvcnkgb2YgdGhlIGNoaWxkIHByb2Nlc3MuXG4gICAqIEBkZWZhdWx0IHByb2Nlc3MuY3dkKClcbiAgICovXG4gIGN3ZD86IHN0cmluZztcbiAgLyoqXG4gICAqIEVudmlyb25tZW50IGtleS12YWx1ZSBwYWlycy4gRXh0ZW5kcyBhdXRvbWF0aWNhbGx5IGZyb20gYHByb2Nlc3MuZW52YC5cbiAgICogQGRlZmF1bHQgcHJvY2Vzcy5lbnZcbiAgICovXG4gIGVudj86IE5vZGVKUy5Qcm9jZXNzRW52O1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgY2hhcmFjdGVyIGVuY29kaW5nIHVzZWQgdG8gZGVjb2RlIHRoZSBzdGRvdXQgYW5kIHN0ZGVyciBvdXRwdXQuIElmIHNldCB0byBgXCJidWZmZXJcImAsIHRoZW4gc3Rkb3V0IGFuZCBzdGRlcnIgd2lsbCBiZSBhIEJ1ZmZlciBpbnN0ZWFkIG9mIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAZGVmYXVsdCBcInV0ZjhcIlxuICAgKi9cbiAgZW5jb2Rpbmc/OiBCdWZmZXJFbmNvZGluZyB8IFwiYnVmZmVyXCI7XG4gIC8qKlxuICAgKiBXcml0ZSBzb21lIGlucHV0IHRvIHRoZSBgc3RkaW5gIG9mIHlvdXIgYmluYXJ5LlxuICAgKi9cbiAgaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXI7XG4gIC8qKiBJZiB0aW1lb3V0IGlzIGdyZWF0ZXIgdGhhbiBgMGAsIHRoZSBwYXJlbnQgd2lsbCBzZW5kIHRoZSBzaWduYWwgYFNJR1RFUk1gIGlmIHRoZSBjaGlsZCBydW5zIGxvbmdlciB0aGFuIHRpbWVvdXQgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAZGVmYXVsdCAxMDAwMFxuICAgKi9cbiAgdGltZW91dD86IG51bWJlcjtcbn07XG5cbmNvbnN0IFNQQUNFU19SRUdFWFAgPSAvICsvZztcbmZ1bmN0aW9uIHBhcnNlQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGFyZ3M/OiBzdHJpbmdbXSkge1xuICBpZiAoYXJncykge1xuICAgIHJldHVybiBbY29tbWFuZCwgLi4uYXJnc107XG4gIH1cbiAgY29uc3QgdG9rZW5zOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHRva2VuIG9mIGNvbW1hbmQudHJpbSgpLnNwbGl0KFNQQUNFU19SRUdFWFApKSB7XG4gICAgLy8gQWxsb3cgc3BhY2VzIHRvIGJlIGVzY2FwZWQgYnkgYSBiYWNrc2xhc2ggaWYgbm90IG1lYW50IGFzIGEgZGVsaW1pdGVyXG4gICAgY29uc3QgcHJldmlvdXNUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgaWYgKHByZXZpb3VzVG9rZW4gJiYgcHJldmlvdXNUb2tlbi5lbmRzV2l0aChcIlxcXFxcIikpIHtcbiAgICAgIC8vIE1lcmdlIHByZXZpb3VzIHRva2VuIHdpdGggY3VycmVudCBvbmVcbiAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0gPSBgJHtwcmV2aW91c1Rva2VuLnNsaWNlKDAsIC0xKX0gJHt0b2tlbn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxudHlwZSBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4gPSBPbWl0PFxuICBDYWNoZWRQcm9taXNlT3B0aW9uczxcbiAgICAoX2NvbW1hbmQ6IHN0cmluZywgX2FyZ3M6IHN0cmluZ1tdLCBfb3B0aW9ucz86IEV4ZWNPcHRpb25zLCBpbnB1dD86IHN0cmluZyB8IEJ1ZmZlcikgPT4gUHJvbWlzZTxUPixcbiAgICBVXG4gID4sXG4gIFwiYWJvcnRhYmxlXCJcbj47XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBjb21tYW5kIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBjb21tYW5kLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQHJlbWFyayBXaGVuIHNwZWNpZnlpbmcgdGhlIGFyZ3VtZW50cyB2aWEgdGhlIGBjb21tYW5kYCBzdHJpbmcsIGlmIHRoZSBmaWxlIG9yIGFuIGFyZ3VtZW50IG9mIHRoZSBjb21tYW5kIGNvbnRhaW5zIHNwYWNlcywgdGhleSBtdXN0IGJlIGVzY2FwZWQgd2l0aCBiYWNrc2xhc2hlcy4gVGhpcyBtYXR0ZXJzIGVzcGVjaWFsbHkgaWYgYGNvbW1hbmRgIGlzIG5vdCBhIGNvbnN0YW50IGJ1dCBhIHZhcmlhYmxlLCBmb3IgZXhhbXBsZSB3aXRoIGBfX2Rpcm5hbWVgIG9yIGBwcm9jZXNzLmN3ZCgpYC4gRXhjZXB0IGZvciBzcGFjZXMsIG5vIGVzY2FwaW5nL3F1b3RpbmcgaXMgbmVlZGVkLlxuICpcbiAqIFRoZSBgc2hlbGxgIG9wdGlvbiBtdXN0IGJlIHVzZWQgaWYgdGhlIGNvbW1hbmQgdXNlcyBzaGVsbC1zcGVjaWZpYyBmZWF0dXJlcyAoZm9yIGV4YW1wbGUsIGAmJmAgb3IgYHx8YCksIGFzIG9wcG9zZWQgdG8gYmVpbmcgYSBzaW1wbGUgZmlsZSBmb2xsb3dlZCBieSBpdHMgYXJndW1lbnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHVzZUV4ZWMgfSBmcm9tICdAcmF5Y2FzdC91dGlscyc7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHJldmFsaWRhdGUgfSA9IHVzZUV4ZWMoXCJicmV3XCIsIFtcImluZm9cIiwgXCItLWpzb249djJcIiwgXCItLWluc3RhbGxlZFwiXSk7XG4gKiAgIGNvbnN0IHJlc3VsdHMgPSB1c2VNZW1vPHt9W10+KCgpID0+IEpTT04ucGFyc2UoZGF0YSB8fCBcIltdXCIpLCBbZGF0YV0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30+XG4gKiAgICAgIHsoZGF0YSB8fCBbXSkubWFwKChpdGVtKSA9PiAoXG4gKiAgICAgICAgPExpc3QuSXRlbSBrZXk9e2l0ZW0uaWR9IHRpdGxlPXtpdGVtLm5hbWV9IC8+XG4gKiAgICAgICkpfVxuICogICAgPC9MaXN0PlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRXhlYzxUID0gQnVmZmVyLCBVID0gdW5kZWZpbmVkPihcbiAgY29tbWFuZDogc3RyaW5nLFxuICBvcHRpb25zOiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIEJ1ZmZlciwgRXhlY09wdGlvbnM+O1xuICB9ICYgRXhlY09wdGlvbnMgJiB7XG4gICAgICBlbmNvZGluZzogXCJidWZmZXJcIjtcbiAgICB9ICYgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG5leHBvcnQgZnVuY3Rpb24gdXNlRXhlYzxUID0gc3RyaW5nLCBVID0gdW5kZWZpbmVkPihcbiAgY29tbWFuZDogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEV4ZWNPcHRpb25zPjtcbiAgfSAmIEV4ZWNPcHRpb25zICYge1xuICAgICAgZW5jb2Rpbmc/OiBCdWZmZXJFbmNvZGluZztcbiAgICB9ICYgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG5leHBvcnQgZnVuY3Rpb24gdXNlRXhlYzxUID0gQnVmZmVyLCBVID0gdW5kZWZpbmVkPihcbiAgZmlsZTogc3RyaW5nLFxuICAvKipcbiAgICogVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmaWxlLiBObyBlc2NhcGluZy9xdW90aW5nIGlzIG5lZWRlZC5cbiAgICpcbiAgICogSWYgZGVmaW5lZCwgdGhlIGNvbW1hbmRzIG5lZWRzIHRvIGJlIGEgZmlsZSB0byBleGVjdXRlLiBJZiB1bmRlZmluZWQsIHRoZSBhcmd1bWVudHMgd2lsbCBiZSBwYXJzZWQgZnJvbSB0aGUgY29tbWFuZC5cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICBvcHRpb25zOiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIEJ1ZmZlciwgRXhlY09wdGlvbnM+O1xuICB9ICYgRXhlY09wdGlvbnMgJiB7XG4gICAgICBlbmNvZGluZzogXCJidWZmZXJcIjtcbiAgICB9ICYgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG5leHBvcnQgZnVuY3Rpb24gdXNlRXhlYzxUID0gc3RyaW5nLCBVID0gdW5kZWZpbmVkPihcbiAgZmlsZTogc3RyaW5nLFxuICAvKipcbiAgICogVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmaWxlLiBObyBlc2NhcGluZy9xdW90aW5nIGlzIG5lZWRlZC5cbiAgICpcbiAgICogSWYgZGVmaW5lZCwgdGhlIGNvbW1hbmRzIG5lZWRzIHRvIGJlIGEgZmlsZSB0byBleGVjdXRlLiBJZiB1bmRlZmluZWQsIHRoZSBhcmd1bWVudHMgd2lsbCBiZSBwYXJzZWQgZnJvbSB0aGUgY29tbWFuZC5cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICBvcHRpb25zPzoge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEV4ZWNPcHRpb25zPjtcbiAgfSAmIEV4ZWNPcHRpb25zICYge1xuICAgICAgZW5jb2Rpbmc/OiBCdWZmZXJFbmNvZGluZztcbiAgICB9ICYgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG5leHBvcnQgZnVuY3Rpb24gdXNlRXhlYzxULCBVID0gdW5kZWZpbmVkPihcbiAgY29tbWFuZDogc3RyaW5nLFxuICBvcHRpb25zT3JBcmdzPzpcbiAgICB8IHN0cmluZ1tdXG4gICAgfCAoe1xuICAgICAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgQnVmZmVyLCBFeGVjT3B0aW9ucz4gfCBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgRXhlY09wdGlvbnM+O1xuICAgICAgfSAmIEV4ZWNPcHRpb25zICZcbiAgICAgICAgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+KSxcbiAgb3B0aW9ucz86IHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgQnVmZmVyLCBFeGVjT3B0aW9ucz4gfCBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgRXhlY09wdGlvbnM+O1xuICB9ICYgRXhlY09wdGlvbnMgJlxuICAgIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+IHtcbiAgY29uc3Qge1xuICAgIHBhcnNlT3V0cHV0LFxuICAgIGlucHV0LFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gICAgLi4uZXhlY09wdGlvbnNcbiAgfSA9IEFycmF5LmlzQXJyYXkob3B0aW9uc09yQXJncykgPyBvcHRpb25zIHx8IHt9IDogb3B0aW9uc09yQXJncyB8fCB7fTtcblxuICBjb25zdCB1c2VDYWNoZWRQcm9taXNlT3B0aW9uczogRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+ID0ge1xuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4obnVsbCk7XG4gIGNvbnN0IHBhcnNlT3V0cHV0UmVmID0gdXNlTGF0ZXN0KHBhcnNlT3V0cHV0IHx8IGRlZmF1bHRQYXJzaW5nKTtcblxuICBjb25zdCBmbiA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChfY29tbWFuZDogc3RyaW5nLCBfYXJnczogc3RyaW5nW10sIF9vcHRpb25zPzogRXhlY09wdGlvbnMsIGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyKSA9PiB7XG4gICAgICBjb25zdCBbZmlsZSwgLi4uYXJnc10gPSBwYXJzZUNvbW1hbmQoX2NvbW1hbmQsIF9hcmdzKTtcbiAgICAgIGNvbnN0IGNvbW1hbmQgPSBbZmlsZSwgLi4uYXJnc10uam9pbihcIiBcIik7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlLFxuICAgICAgICAuLi5fb3B0aW9ucyxcbiAgICAgICAgdGltZW91dDogX29wdGlvbnM/LnRpbWVvdXQgfHwgMTAwMDAsXG4gICAgICAgIHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCxcbiAgICAgICAgZW5jb2Rpbmc6IF9vcHRpb25zPy5lbmNvZGluZyA9PT0gbnVsbCA/IFwiYnVmZmVyXCIgOiBfb3B0aW9ucz8uZW5jb2RpbmcgfHwgXCJ1dGY4XCIsXG4gICAgICAgIGVudjogeyBQQVRIOiBcIi91c3IvbG9jYWwvYmluOi91c3IvYmluOi9iaW46L3Vzci9zYmluOi9zYmluXCIsIC4uLnByb2Nlc3MuZW52LCAuLi5fb3B0aW9ucz8uZW52IH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKGZpbGUsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgY29uc3Qgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkLCBvcHRpb25zKTtcblxuICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgIHNwYXduZWQuc3RkaW4uZW5kKGlucHV0KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgW3sgZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwsIHRpbWVkT3V0IH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQoXG4gICAgICAgIHNwYXduZWQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHNwYXduZWRQcm9taXNlLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHN0ZG91dCA9IGhhbmRsZU91dHB1dChvcHRpb25zLCBzdGRvdXRSZXN1bHQpO1xuICAgICAgY29uc3Qgc3RkZXJyID0gaGFuZGxlT3V0cHV0KG9wdGlvbnMsIHN0ZGVyclJlc3VsdCk7XG5cbiAgICAgIHJldHVybiBwYXJzZU91dHB1dFJlZi5jdXJyZW50KHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0b28gbWFueSBnZW5lcmljcywgSSBnaXZlIHVwXG4gICAgICAgIHN0ZG91dCxcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0b28gbWFueSBnZW5lcmljcywgSSBnaXZlIHVwXG4gICAgICAgIHN0ZGVycixcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIGV4aXRDb2RlLFxuICAgICAgICBzaWduYWwsXG4gICAgICAgIHRpbWVkT3V0LFxuICAgICAgICBjb21tYW5kLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICBwYXJlbnRFcnJvcjogbmV3IEVycm9yKCksXG4gICAgICB9KSBhcyBUO1xuICAgIH0sXG4gICAgW3BhcnNlT3V0cHV0UmVmXSxcbiAgKTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIFQgY2FuJ3QgYmUgYSBQcm9taXNlIHNvIGl0J3MgYWN0dWFsbHkgdGhlIHNhbWVcbiAgcmV0dXJuIHVzZUNhY2hlZFByb21pc2UoZm4sIFtjb21tYW5kLCBBcnJheS5pc0FycmF5KG9wdGlvbnNPckFyZ3MpID8gb3B0aW9uc09yQXJncyA6IFtdLCBleGVjT3B0aW9ucywgaW5wdXRdLCB7XG4gICAgLi4udXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnMsXG4gICAgYWJvcnRhYmxlLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7IGNvbnN0YW50cyBhcyBCdWZmZXJDb25zdGFudHMgfSBmcm9tIFwibm9kZTpidWZmZXJcIjtcbmltcG9ydCBTdHJlYW0gZnJvbSBcIm5vZGU6c3RyZWFtXCI7XG5pbXBvcnQgeyBwcm9taXNpZnkgfSBmcm9tIFwibm9kZTp1dGlsXCI7XG5pbXBvcnQgeyBvbkV4aXQgfSBmcm9tIFwiLi92ZW5kb3JzL3NpZ25hbC1leGl0XCI7XG5cbmV4cG9ydCB0eXBlIFNwYXduZWRQcm9taXNlID0gUHJvbWlzZTx7XG4gIGV4aXRDb2RlOiBudW1iZXIgfCBudWxsO1xuICBlcnJvcj86IEVycm9yO1xuICBzaWduYWw6IE5vZGVKUy5TaWduYWxzIHwgbnVsbDtcbiAgdGltZWRPdXQ6IGJvb2xlYW47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwYXduZWRQcm9taXNlKFxuICBzcGF3bmVkOiBjaGlsZFByb2Nlc3MuQ2hpbGRQcm9jZXNzV2l0aG91dE51bGxTdHJlYW1zLFxuICB7IHRpbWVvdXQgfTogeyB0aW1lb3V0PzogbnVtYmVyIH0gPSB7fSxcbik6IFNwYXduZWRQcm9taXNlIHtcbiAgY29uc3Qgc3Bhd25lZFByb21pc2U6IFNwYXduZWRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHNwYXduZWQub24oXCJleGl0XCIsIChleGl0Q29kZSwgc2lnbmFsKSA9PiB7XG4gICAgICByZXNvbHZlKHsgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXQ6IGZhbHNlIH0pO1xuICAgIH0pO1xuXG4gICAgc3Bhd25lZC5vbihcImVycm9yXCIsIChlcnJvcikgPT4ge1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIGlmIChzcGF3bmVkLnN0ZGluKSB7XG4gICAgICBzcGF3bmVkLnN0ZGluLm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHJlbW92ZUV4aXRIYW5kbGVyID0gb25FeGl0KCgpID0+IHtcbiAgICBzcGF3bmVkLmtpbGwoKTtcbiAgfSk7XG5cbiAgaWYgKHRpbWVvdXQgPT09IDAgfHwgdGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHNwYXduZWRQcm9taXNlLmZpbmFsbHkoKCkgPT4gcmVtb3ZlRXhpdEhhbmRsZXIoKSk7XG4gIH1cblxuICBsZXQgdGltZW91dElkOiBOb2RlSlMuVGltZW91dDtcbiAgY29uc3QgdGltZW91dFByb21pc2U6IFNwYXduZWRQcm9taXNlID0gbmV3IFByb21pc2UoKF9yZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNwYXduZWQua2lsbChcIlNJR1RFUk1cIik7XG4gICAgICByZWplY3QoT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoXCJUaW1lZCBvdXRcIiksIHsgdGltZWRPdXQ6IHRydWUsIHNpZ25hbDogXCJTSUdURVJNXCIgfSkpO1xuICAgIH0sIHRpbWVvdXQpO1xuICB9KTtcblxuICBjb25zdCBzYWZlU3Bhd25lZFByb21pc2UgPSBzcGF3bmVkUHJvbWlzZS5maW5hbGx5KCgpID0+IHtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFByb21pc2UucmFjZShbdGltZW91dFByb21pc2UsIHNhZmVTcGF3bmVkUHJvbWlzZV0pLmZpbmFsbHkoKCkgPT4gcmVtb3ZlRXhpdEhhbmRsZXIoKSk7XG59XG5cbmNsYXNzIE1heEJ1ZmZlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcIlRoZSBvdXRwdXQgaXMgdG9vIGJpZ1wiKTtcbiAgICB0aGlzLm5hbWUgPSBcIk1heEJ1ZmZlckVycm9yXCI7XG4gIH1cbn1cblxuZnVuY3Rpb24gYnVmZmVyU3RyZWFtPFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KG9wdGlvbnM6IHsgZW5jb2Rpbmc6IEJ1ZmZlckVuY29kaW5nIHwgXCJidWZmZXJcIiB9KSB7XG4gIGNvbnN0IHsgZW5jb2RpbmcgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGlzQnVmZmVyID0gZW5jb2RpbmcgPT09IFwiYnVmZmVyXCI7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBtaXNzaW5nIHRoZSBtZXRob2RzIHdlIGFyZSBhZGRpbmcgYmVsb3dcbiAgY29uc3Qgc3RyZWFtOiBTdHJlYW0uUGFzc1Rocm91Z2ggJiB7IGdldEJ1ZmZlcmVkVmFsdWU6ICgpID0+IFQ7IGdldEJ1ZmZlcmVkTGVuZ3RoOiAoKSA9PiBudW1iZXIgfSA9XG4gICAgbmV3IFN0cmVhbS5QYXNzVGhyb3VnaCh7IG9iamVjdE1vZGU6IGZhbHNlIH0pO1xuXG4gIGlmIChlbmNvZGluZyAmJiBlbmNvZGluZyAhPT0gXCJidWZmZXJcIikge1xuICAgIHN0cmVhbS5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG4gIH1cblxuICBsZXQgbGVuZ3RoID0gMDtcbiAgY29uc3QgY2h1bmtzOiBhbnlbXSA9IFtdO1xuXG4gIHN0cmVhbS5vbihcImRhdGFcIiwgKGNodW5rKSA9PiB7XG4gICAgY2h1bmtzLnB1c2goY2h1bmspO1xuXG4gICAgbGVuZ3RoICs9IGNodW5rLmxlbmd0aDtcbiAgfSk7XG5cbiAgc3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIChpc0J1ZmZlciA/IEJ1ZmZlci5jb25jYXQoY2h1bmtzLCBsZW5ndGgpIDogY2h1bmtzLmpvaW4oXCJcIikpIGFzIFQ7XG4gIH07XG5cbiAgc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuXG4gIHJldHVybiBzdHJlYW07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0cmVhbTxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihcbiAgaW5wdXRTdHJlYW06IFN0cmVhbS5SZWFkYWJsZSxcbiAgb3B0aW9uczogeyBlbmNvZGluZzogQnVmZmVyRW5jb2RpbmcgfCBcImJ1ZmZlclwiIH0sXG4pIHtcbiAgY29uc3Qgc3RyZWFtID0gYnVmZmVyU3RyZWFtPFQ+KG9wdGlvbnMpO1xuXG4gIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCByZWplY3RQcm9taXNlID0gKGVycm9yOiBFcnJvciAmIHsgYnVmZmVyZWREYXRhPzogVCB9KSA9PiB7XG4gICAgICAvLyBEb24ndCByZXRyaWV2ZSBhbiBvdmVyc2l6ZWQgYnVmZmVyLlxuICAgICAgaWYgKGVycm9yICYmIHN0cmVhbS5nZXRCdWZmZXJlZExlbmd0aCgpIDw9IEJ1ZmZlckNvbnN0YW50cy5NQVhfTEVOR1RIKSB7XG4gICAgICAgIGVycm9yLmJ1ZmZlcmVkRGF0YSA9IHN0cmVhbS5nZXRCdWZmZXJlZFZhbHVlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfTtcblxuICAgIChhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBwcm9taXNpZnkoU3RyZWFtLnBpcGVsaW5lKShpbnB1dFN0cmVhbSwgc3RyZWFtKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0UHJvbWlzZShlcnJvciBhcyBhbnkpO1xuICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBzdHJlYW0ub24oXCJkYXRhXCIsICgpID0+IHtcbiAgICAgIC8vIDgwbWJcbiAgICAgIGlmIChzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGgoKSA+IDEwMDAgKiAxMDAwICogODApIHtcbiAgICAgICAgcmVqZWN0UHJvbWlzZShuZXcgTWF4QnVmZmVyRXJyb3IoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSgpO1xufVxuXG4vLyBPbiBmYWlsdXJlLCBgcmVzdWx0LnN0ZG91dHxzdGRlcnJgIHNob3VsZCBjb250YWluIHRoZSBjdXJyZW50bHkgYnVmZmVyZWQgc3RyZWFtXG5hc3luYyBmdW5jdGlvbiBnZXRCdWZmZXJlZERhdGE8VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4oc3RyZWFtOiBTdHJlYW0uUmVhZGFibGUsIHN0cmVhbVByb21pc2U6IFByb21pc2U8VD4pIHtcbiAgc3RyZWFtLmRlc3Ryb3koKTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBzdHJlYW1Qcm9taXNlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAoZXJyb3IgYXMgYW55IGFzIHsgYnVmZmVyZWREYXRhOiBUIH0pLmJ1ZmZlcmVkRGF0YTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3Bhd25lZFJlc3VsdDxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihcbiAgeyBzdGRvdXQsIHN0ZGVyciB9OiBjaGlsZFByb2Nlc3MuQ2hpbGRQcm9jZXNzV2l0aG91dE51bGxTdHJlYW1zLFxuICB7IGVuY29kaW5nIH06IHsgZW5jb2Rpbmc6IEJ1ZmZlckVuY29kaW5nIHwgXCJidWZmZXJcIiB9LFxuICBwcm9jZXNzRG9uZTogU3Bhd25lZFByb21pc2UsXG4pIHtcbiAgY29uc3Qgc3Rkb3V0UHJvbWlzZSA9IGdldFN0cmVhbTxUPihzdGRvdXQsIHsgZW5jb2RpbmcgfSk7XG4gIGNvbnN0IHN0ZGVyclByb21pc2UgPSBnZXRTdHJlYW08VD4oc3RkZXJyLCB7IGVuY29kaW5nIH0pO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IFByb21pc2UuYWxsKFtwcm9jZXNzRG9uZSwgc3Rkb3V0UHJvbWlzZSwgc3RkZXJyUHJvbWlzZV0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgIHtcbiAgICAgICAgZXJyb3I6IGVycm9yIGFzIEVycm9yLFxuICAgICAgICBleGl0Q29kZTogbnVsbCxcbiAgICAgICAgc2lnbmFsOiBlcnJvci5zaWduYWwgYXMgTm9kZUpTLlNpZ25hbHMgfCBudWxsLFxuICAgICAgICB0aW1lZE91dDogKGVycm9yLnRpbWVkT3V0IGFzIGJvb2xlYW4pIHx8IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGdldEJ1ZmZlcmVkRGF0YShzdGRvdXQsIHN0ZG91dFByb21pc2UpLFxuICAgICAgZ2V0QnVmZmVyZWREYXRhKHN0ZGVyciwgc3RkZXJyUHJvbWlzZSksXG4gICAgXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RyaXBGaW5hbE5ld2xpbmU8VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4oaW5wdXQ6IFQpIHtcbiAgY29uc3QgTEYgPSB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIgPyBcIlxcblwiIDogXCJcXG5cIi5jaGFyQ29kZUF0KDApO1xuICBjb25zdCBDUiA9IHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIiA/IFwiXFxyXCIgOiBcIlxcclwiLmNoYXJDb2RlQXQoMCk7XG5cbiAgaWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBMRikge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igd2UgYXJlIGRvaW5nIHNvbWUgbmFzdHkgc3R1ZmYgaGVyZVxuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgLTEpO1xuICB9XG5cbiAgaWYgKGlucHV0W2lucHV0Lmxlbmd0aCAtIDFdID09PSBDUikge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igd2UgYXJlIGRvaW5nIHNvbWUgbmFzdHkgc3R1ZmYgaGVyZVxuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMCwgLTEpO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlT3V0cHV0PFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KG9wdGlvbnM6IHsgc3RyaXBGaW5hbE5ld2xpbmU/OiBib29sZWFuIH0sIHZhbHVlOiBUKSB7XG4gIGlmIChvcHRpb25zLnN0cmlwRmluYWxOZXdsaW5lKSB7XG4gICAgcmV0dXJuIHN0cmlwRmluYWxOZXdsaW5lKHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0RXJyb3JQcmVmaXgoe1xuICB0aW1lZE91dCxcbiAgdGltZW91dCxcbiAgc2lnbmFsLFxuICBleGl0Q29kZSxcbn06IHtcbiAgZXhpdENvZGU6IG51bWJlciB8IG51bGw7XG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgdGltZW91dD86IG51bWJlcjtcbn0pIHtcbiAgaWYgKHRpbWVkT3V0KSB7XG4gICAgcmV0dXJuIGB0aW1lZCBvdXQgYWZ0ZXIgJHt0aW1lb3V0fSBtaWxsaXNlY29uZHNgO1xuICB9XG5cbiAgaWYgKHNpZ25hbCAhPT0gdW5kZWZpbmVkICYmIHNpZ25hbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBgd2FzIGtpbGxlZCB3aXRoICR7c2lnbmFsfWA7XG4gIH1cblxuICBpZiAoZXhpdENvZGUgIT09IHVuZGVmaW5lZCAmJiBleGl0Q29kZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBgZmFpbGVkIHdpdGggZXhpdCBjb2RlICR7ZXhpdENvZGV9YDtcbiAgfVxuXG4gIHJldHVybiBcImZhaWxlZFwiO1xufVxuXG5mdW5jdGlvbiBtYWtlRXJyb3Ioe1xuICBzdGRvdXQsXG4gIHN0ZGVycixcbiAgZXJyb3IsXG4gIHNpZ25hbCxcbiAgZXhpdENvZGUsXG4gIGNvbW1hbmQsXG4gIHRpbWVkT3V0LFxuICBvcHRpb25zLFxuICBwYXJlbnRFcnJvcixcbn06IHtcbiAgc3Rkb3V0OiBzdHJpbmcgfCBCdWZmZXI7XG4gIHN0ZGVycjogc3RyaW5nIHwgQnVmZmVyO1xuICBlcnJvcj86IEVycm9yO1xuICBleGl0Q29kZTogbnVtYmVyIHwgbnVsbDtcbiAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGw7XG4gIHRpbWVkT3V0OiBib29sZWFuO1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIG9wdGlvbnM/OiB7IHRpbWVvdXQ/OiBudW1iZXIgfTtcbiAgcGFyZW50RXJyb3I6IEVycm9yO1xufSkge1xuICBjb25zdCBwcmVmaXggPSBnZXRFcnJvclByZWZpeCh7IHRpbWVkT3V0LCB0aW1lb3V0OiBvcHRpb25zPy50aW1lb3V0LCBzaWduYWwsIGV4aXRDb2RlIH0pO1xuICBjb25zdCBleGVjYU1lc3NhZ2UgPSBgQ29tbWFuZCAke3ByZWZpeH06ICR7Y29tbWFuZH1gO1xuICBjb25zdCBzaG9ydE1lc3NhZ2UgPSBlcnJvciA/IGAke2V4ZWNhTWVzc2FnZX1cXG4ke2Vycm9yLm1lc3NhZ2V9YCA6IGV4ZWNhTWVzc2FnZTtcbiAgY29uc3QgbWVzc2FnZSA9IFtzaG9ydE1lc3NhZ2UsIHN0ZGVyciwgc3Rkb3V0XS5maWx0ZXIoQm9vbGVhbikuam9pbihcIlxcblwiKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICAgIGVycm9yLm9yaWdpbmFsTWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gIH0gZWxzZSB7XG4gICAgZXJyb3IgPSBwYXJlbnRFcnJvcjtcbiAgfVxuXG4gIGVycm9yLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLnNob3J0TWVzc2FnZSA9IHNob3J0TWVzc2FnZTtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3IuY29tbWFuZCA9IGNvbW1hbmQ7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLmV4aXRDb2RlID0gZXhpdENvZGU7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLnNpZ25hbCA9IHNpZ25hbDtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3Iuc3Rkb3V0ID0gc3Rkb3V0O1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5zdGRlcnIgPSBzdGRlcnI7XG5cbiAgaWYgKFwiYnVmZmVyZWREYXRhXCIgaW4gZXJyb3IpIHtcbiAgICBkZWxldGUgZXJyb3JbXCJidWZmZXJlZERhdGFcIl07XG4gIH1cblxuICByZXR1cm4gZXJyb3I7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnNlRXhlY091dHB1dEhhbmRsZXI8XG4gIFQsXG4gIERlY29kZWRPdXRwdXQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXIgPSBzdHJpbmcgfCBCdWZmZXIsXG4gIE9wdGlvbnMgPSB1bmtub3duLFxuPiA9IChhcmdzOiB7XG4gIC8qKiBUaGUgb3V0cHV0IG9mIHRoZSBwcm9jZXNzIG9uIHN0ZG91dC4gKi9cbiAgc3Rkb3V0OiBEZWNvZGVkT3V0cHV0O1xuICAvKiogVGhlIG91dHB1dCBvZiB0aGUgcHJvY2VzcyBvbiBzdGRlcnIuICovXG4gIHN0ZGVycjogRGVjb2RlZE91dHB1dDtcbiAgZXJyb3I/OiBFcnJvcjtcbiAgLyoqIFRoZSBudW1lcmljIGV4aXQgY29kZSBvZiB0aGUgcHJvY2VzcyB0aGF0IHdhcyBydW4uICovXG4gIGV4aXRDb2RlOiBudW1iZXIgfCBudWxsO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIHNpZ25hbCB0aGF0IHdhcyB1c2VkIHRvIHRlcm1pbmF0ZSB0aGUgcHJvY2Vzcy4gRm9yIGV4YW1wbGUsIFNJR0ZQRS5cbiAgICpcbiAgICogSWYgYSBzaWduYWwgdGVybWluYXRlZCB0aGUgcHJvY2VzcywgdGhpcyBwcm9wZXJ0eSBpcyBkZWZpbmVkLiBPdGhlcndpc2UgaXQgaXMgbnVsbC5cbiAgICovXG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsO1xuICAvKiogV2hldGhlciB0aGUgcHJvY2VzcyB0aW1lZCBvdXQuICovXG4gIHRpbWVkT3V0OiBib29sZWFuO1xuICAvKiogVGhlIGNvbW1hbmQgdGhhdCB3YXMgcnVuLCBmb3IgbG9nZ2luZyBwdXJwb3Nlcy4gKi9cbiAgY29tbWFuZDogc3RyaW5nO1xuICBvcHRpb25zPzogT3B0aW9ucztcbn0pID0+IFQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZzxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPih7XG4gIHN0ZG91dCxcbiAgc3RkZXJyLFxuICBlcnJvcixcbiAgZXhpdENvZGUsXG4gIHNpZ25hbCxcbiAgdGltZWRPdXQsXG4gIGNvbW1hbmQsXG4gIG9wdGlvbnMsXG4gIHBhcmVudEVycm9yLFxufToge1xuICBzdGRvdXQ6IFQ7XG4gIHN0ZGVycjogVDtcbiAgZXJyb3I/OiBFcnJvcjtcbiAgZXhpdENvZGU6IG51bWJlciB8IG51bGw7XG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBvcHRpb25zPzogeyB0aW1lb3V0PzogbnVtYmVyIH07XG4gIHBhcmVudEVycm9yOiBFcnJvcjtcbn0pIHtcbiAgaWYgKGVycm9yIHx8IGV4aXRDb2RlICE9PSAwIHx8IHNpZ25hbCAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHJldHVybmVkRXJyb3IgPSBtYWtlRXJyb3Ioe1xuICAgICAgZXJyb3IsXG4gICAgICBleGl0Q29kZSxcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN0ZG91dCxcbiAgICAgIHN0ZGVycixcbiAgICAgIGNvbW1hbmQsXG4gICAgICB0aW1lZE91dCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICBwYXJlbnRFcnJvcixcbiAgICB9KTtcblxuICAgIHRocm93IHJldHVybmVkRXJyb3I7XG4gIH1cblxuICByZXR1cm4gc3Rkb3V0O1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLy8gTm90ZTogc2luY2UgbnljIHVzZXMgdGhpcyBtb2R1bGUgdG8gb3V0cHV0IGNvdmVyYWdlLCBhbnkgbGluZXNcbi8vIHRoYXQgYXJlIGluIHRoZSBkaXJlY3Qgc3luYyBmbG93IG9mIG55YydzIG91dHB1dENvdmVyYWdlIGFyZVxuLy8gaWdub3JlZCwgc2luY2Ugd2UgY2FuIG5ldmVyIGdldCBjb3ZlcmFnZSBmb3IgdGhlbS5cbi8vIGdyYWIgYSByZWZlcmVuY2UgdG8gbm9kZSdzIHJlYWwgcHJvY2VzcyBvYmplY3QgcmlnaHQgYXdheVxuXG5jb25zdCBwcm9jZXNzT2sgPSAocHJvY2VzczogYW55KSA9PlxuICAhIXByb2Nlc3MgJiZcbiAgdHlwZW9mIHByb2Nlc3MgPT09IFwib2JqZWN0XCIgJiZcbiAgdHlwZW9mIHByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5lbWl0ID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3MucmVhbGx5RXhpdCA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLmxpc3RlbmVycyA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLmtpbGwgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5waWQgPT09IFwibnVtYmVyXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3Mub24gPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGtFeGl0RW1pdHRlciA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwic2lnbmFsLWV4aXQgZW1pdHRlclwiKTtcbi8vIHRlZW55IHNwZWNpYWwgcHVycG9zZSBlZVxuY2xhc3MgRW1pdHRlciB7XG4gIGVtaXR0ZWQgPSB7XG4gICAgYWZ0ZXJFeGl0OiBmYWxzZSxcbiAgICBleGl0OiBmYWxzZSxcbiAgfTtcbiAgbGlzdGVuZXJzID0ge1xuICAgIGFmdGVyRXhpdDogW10sXG4gICAgZXhpdDogW10sXG4gIH07XG4gIGNvdW50ID0gMDtcbiAgaWQgPSBNYXRoLnJhbmRvbSgpO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKGdsb2JhbFtrRXhpdEVtaXR0ZXJdKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICByZXR1cm4gZ2xvYmFsW2tFeGl0RW1pdHRlcl07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtFeGl0RW1pdHRlciwge1xuICAgICAgdmFsdWU6IHRoaXMsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgfSk7XG4gIH1cbiAgb24oZXY6IGFueSwgZm46IGFueSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmxpc3RlbmVyc1tldl0ucHVzaChmbik7XG4gIH1cbiAgcmVtb3ZlTGlzdGVuZXIoZXY6IGFueSwgZm46IGFueSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5saXN0ZW5lcnNbZXZdO1xuICAgIGNvbnN0IGkgPSBsaXN0LmluZGV4T2YoZm4pO1xuICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgIGlmIChpID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIGlmIChpID09PSAwICYmIGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICBsaXN0Lmxlbmd0aCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xuICAgIH1cbiAgfVxuICBlbWl0KGV2OiBhbnksIGNvZGU6IGFueSwgc2lnbmFsOiBhbnkpOiBhbnkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodGhpcy5lbWl0dGVkW2V2XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5lbWl0dGVkW2V2XSA9IHRydWU7XG4gICAgbGV0IHJldCA9IGZhbHNlO1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGZuIG9mIHRoaXMubGlzdGVuZXJzW2V2XSkge1xuICAgICAgcmV0ID0gZm4oY29kZSwgc2lnbmFsKSA9PT0gdHJ1ZSB8fCByZXQ7XG4gICAgfVxuICAgIGlmIChldiA9PT0gXCJleGl0XCIpIHtcbiAgICAgIHJldCA9IHRoaXMuZW1pdChcImFmdGVyRXhpdFwiLCBjb2RlLCBzaWduYWwpIHx8IHJldDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5jbGFzcyBTaWduYWxFeGl0RmFsbGJhY2sge1xuICBvbkV4aXQoKSB7XG4gICAgcmV0dXJuICgpID0+IHt9O1xuICB9XG4gIGxvYWQoKSB7fVxuICB1bmxvYWQoKSB7fVxufVxuY2xhc3MgU2lnbmFsRXhpdCB7XG4gIC8vIFwiU0lHSFVQXCIgdGhyb3dzIGFuIGBFTk9TWVNgIGVycm9yIG9uIFdpbmRvd3MsXG4gIC8vIHNvIHVzZSBhIHN1cHBvcnRlZCBzaWduYWwgaW5zdGVhZFxuICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgLy8gQHRzLWlnbm9yZVxuICAjaHVwU2lnID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJ3aW4zMlwiID8gXCJTSUdJTlRcIiA6IFwiU0lHSFVQXCI7XG4gIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICNlbWl0dGVyID0gbmV3IEVtaXR0ZXIoKTtcbiAgI3Byb2Nlc3M6IGFueTtcbiAgI29yaWdpbmFsUHJvY2Vzc0VtaXQ6IGFueTtcbiAgI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQ6IGFueTtcbiAgI3NpZ0xpc3RlbmVycyA9IHt9O1xuICAjbG9hZGVkID0gZmFsc2U7XG4gICNzaWduYWxzOiBzdHJpbmdbXSA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzOiBhbnkpIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIG5vdCB0aGUgc2V0IG9mIGFsbCBwb3NzaWJsZSBzaWduYWxzLlxuICAgICAqXG4gICAgICogSXQgSVMsIGhvd2V2ZXIsIHRoZSBzZXQgb2YgYWxsIHNpZ25hbHMgdGhhdCB0cmlnZ2VyXG4gICAgICogYW4gZXhpdCBvbiBlaXRoZXIgTGludXggb3IgQlNEIHN5c3RlbXMuICBMaW51eCBpcyBhXG4gICAgICogc3VwZXJzZXQgb2YgdGhlIHNpZ25hbCBuYW1lcyBzdXBwb3J0ZWQgb24gQlNELCBhbmRcbiAgICAgKiB0aGUgdW5rbm93biBzaWduYWxzIGp1c3QgZmFpbCB0byByZWdpc3Rlciwgc28gd2UgY2FuXG4gICAgICogY2F0Y2ggdGhhdCBlYXNpbHkgZW5vdWdoLlxuICAgICAqXG4gICAgICogV2luZG93cyBzaWduYWxzIGFyZSBhIGRpZmZlcmVudCBzZXQsIHNpbmNlIHRoZXJlIGFyZVxuICAgICAqIHNpZ25hbHMgdGhhdCB0ZXJtaW5hdGUgV2luZG93cyBwcm9jZXNzZXMsIGJ1dCBkb24ndFxuICAgICAqIHRlcm1pbmF0ZSAob3IgZG9uJ3QgZXZlbiBleGlzdCkgb24gUG9zaXggc3lzdGVtcy5cbiAgICAgKlxuICAgICAqIERvbid0IGJvdGhlciB3aXRoIFNJR0tJTEwuICBJdCdzIHVuY2F0Y2hhYmxlLCB3aGljaFxuICAgICAqIG1lYW5zIHRoYXQgd2UgY2FuJ3QgZmlyZSBhbnkgY2FsbGJhY2tzIGFueXdheS5cbiAgICAgKlxuICAgICAqIElmIGEgdXNlciBkb2VzIGhhcHBlbiB0byByZWdpc3RlciBhIGhhbmRsZXIgb24gYSBub24tXG4gICAgICogZmF0YWwgc2lnbmFsIGxpa2UgU0lHV0lOQ0ggb3Igc29tZXRoaW5nLCBhbmQgdGhlblxuICAgICAqIGV4aXQsIGl0J2xsIGVuZCB1cCBmaXJpbmcgYHByb2Nlc3MuZW1pdCgnZXhpdCcpYCwgc29cbiAgICAgKiB0aGUgaGFuZGxlciB3aWxsIGJlIGZpcmVkIGFueXdheS5cbiAgICAgKlxuICAgICAqIFNJR0JVUywgU0lHRlBFLCBTSUdTRUdWIGFuZCBTSUdJTEwsIHdoZW4gbm90IHJhaXNlZFxuICAgICAqIGFydGlmaWNpYWxseSwgaW5oZXJlbnRseSBsZWF2ZSB0aGUgcHJvY2VzcyBpbiBhXG4gICAgICogc3RhdGUgZnJvbSB3aGljaCBpdCBpcyBub3Qgc2FmZSB0byB0cnkgYW5kIGVudGVyIEpTXG4gICAgICogbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIHRoaXMuI3NpZ25hbHMucHVzaChcIlNJR0hVUFwiLCBcIlNJR0lOVFwiLCBcIlNJR1RFUk1cIik7XG4gICAgaWYgKGdsb2JhbFRoaXMucHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJ3aW4zMlwiKSB7XG4gICAgICB0aGlzLiNzaWduYWxzLnB1c2goXG4gICAgICAgIFwiU0lHQUxSTVwiLFxuICAgICAgICBcIlNJR0FCUlRcIixcbiAgICAgICAgXCJTSUdWVEFMUk1cIixcbiAgICAgICAgXCJTSUdYQ1BVXCIsXG4gICAgICAgIFwiU0lHWEZTWlwiLFxuICAgICAgICBcIlNJR1VTUjJcIixcbiAgICAgICAgXCJTSUdUUkFQXCIsXG4gICAgICAgIFwiU0lHU1lTXCIsXG4gICAgICAgIFwiU0lHUVVJVFwiLFxuICAgICAgICBcIlNJR0lPVFwiLFxuICAgICAgICAvLyBzaG91bGQgZGV0ZWN0IHByb2ZpbGVyIGFuZCBlbmFibGUvZGlzYWJsZSBhY2NvcmRpbmdseS5cbiAgICAgICAgLy8gc2VlICMyMVxuICAgICAgICAvLyAnU0lHUFJPRidcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChnbG9iYWxUaGlzLnByb2Nlc3MucGxhdGZvcm0gPT09IFwibGludXhcIikge1xuICAgICAgdGhpcy4jc2lnbmFscy5wdXNoKFwiU0lHSU9cIiwgXCJTSUdQT0xMXCIsIFwiU0lHUFdSXCIsIFwiU0lHU1RLRkxUXCIpO1xuICAgIH1cbiAgICB0aGlzLiNwcm9jZXNzID0gcHJvY2VzcztcbiAgICAvLyB7IDxzaWduYWw+OiA8bGlzdGVuZXIgZm4+LCAuLi4gfVxuICAgIHRoaXMuI3NpZ0xpc3RlbmVycyA9IHt9O1xuICAgIGZvciAoY29uc3Qgc2lnIG9mIHRoaXMuI3NpZ25hbHMpIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuI3NpZ0xpc3RlbmVyc1tzaWddID0gKCkgPT4ge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gb3RoZXIgbGlzdGVuZXJzLCBhbiBleGl0IGlzIGNvbWluZyFcbiAgICAgICAgLy8gU2ltcGxlc3Qgd2F5OiByZW1vdmUgdXMgYW5kIHRoZW4gcmUtc2VuZCB0aGUgc2lnbmFsLlxuICAgICAgICAvLyBXZSBrbm93IHRoYXQgdGhpcyB3aWxsIGtpbGwgdGhlIHByb2Nlc3MsIHNvIHdlIGNhblxuICAgICAgICAvLyBzYWZlbHkgZW1pdCBub3cuXG4gICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuI3Byb2Nlc3MubGlzdGVuZXJzKHNpZyk7XG4gICAgICAgIGxldCB7IGNvdW50IH0gPSB0aGlzLiNlbWl0dGVyO1xuICAgICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgdGhlIGZhY3QgdGhhdCBzaWduYWwtZXhpdCB2MyBhbmQgc2lnbmFsXG4gICAgICAgIC8vIGV4aXQgdjQgYXJlIG5vdCBhd2FyZSBvZiBlYWNoIG90aGVyLCBhbmQgZWFjaCB3aWxsIGF0dGVtcHQgdG8gbGV0XG4gICAgICAgIC8vIHRoZSBvdGhlciBoYW5kbGUgaXQsIHNvIG5laXRoZXIgb2YgdGhlbSBkby4gVG8gY29ycmVjdCB0aGlzLCB3ZVxuICAgICAgICAvLyBkZXRlY3QgaWYgd2UncmUgdGhlIG9ubHkgaGFuZGxlciAqZXhjZXB0KiBmb3IgcHJldmlvdXMgdmVyc2lvbnNcbiAgICAgICAgLy8gb2Ygc2lnbmFsLWV4aXQsIGFuZCBpbmNyZW1lbnQgYnkgdGhlIGNvdW50IG9mIGxpc3RlbmVycyBpdCBoYXNcbiAgICAgICAgLy8gY3JlYXRlZC5cbiAgICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICAgIGNvbnN0IHAgPSBwcm9jZXNzO1xuICAgICAgICBpZiAodHlwZW9mIHAuX19zaWduYWxfZXhpdF9lbWl0dGVyX18gPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHAuX19zaWduYWxfZXhpdF9lbWl0dGVyX18uY291bnQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBjb3VudCArPSBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fLmNvdW50O1xuICAgICAgICB9XG4gICAgICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgICAgIGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICAgICAgY29uc3QgcmV0ID0gdGhpcy4jZW1pdHRlci5lbWl0KFwiZXhpdFwiLCBudWxsLCBzaWcpO1xuICAgICAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgICAgIGNvbnN0IHMgPSBzaWcgPT09IFwiU0lHSFVQXCIgPyB0aGlzLiNodXBTaWcgOiBzaWc7XG4gICAgICAgICAgaWYgKCFyZXQpIHByb2Nlc3Mua2lsbChwcm9jZXNzLnBpZCwgcyk7XG4gICAgICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy4jb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdCA9IHByb2Nlc3MucmVhbGx5RXhpdDtcbiAgICB0aGlzLiNvcmlnaW5hbFByb2Nlc3NFbWl0ID0gcHJvY2Vzcy5lbWl0O1xuICB9XG4gIG9uRXhpdChjYjogYW55LCBvcHRzOiBhbnkpIHtcbiAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICBpZiAoIXByb2Nlc3NPayh0aGlzLiNwcm9jZXNzKSkge1xuICAgICAgcmV0dXJuICgpID0+IHt9O1xuICAgIH1cbiAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIGlmICh0aGlzLiNsb2FkZWQgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvYWQoKTtcbiAgICB9XG4gICAgY29uc3QgZXYgPSBvcHRzPy5hbHdheXNMYXN0ID8gXCJhZnRlckV4aXRcIiA6IFwiZXhpdFwiO1xuICAgIHRoaXMuI2VtaXR0ZXIub24oZXYsIGNiKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy4jZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihldiwgY2IpO1xuICAgICAgaWYgKHRoaXMuI2VtaXR0ZXIubGlzdGVuZXJzW1wiZXhpdFwiXS5sZW5ndGggPT09IDAgJiYgdGhpcy4jZW1pdHRlci5saXN0ZW5lcnNbXCJhZnRlckV4aXRcIl0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMudW5sb2FkKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBsb2FkKCkge1xuICAgIGlmICh0aGlzLiNsb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4jbG9hZGVkID0gdHJ1ZTtcbiAgICAvLyBUaGlzIGlzIHRoZSBudW1iZXIgb2Ygb25TaWduYWxFeGl0J3MgdGhhdCBhcmUgaW4gcGxheS5cbiAgICAvLyBJdCdzIGltcG9ydGFudCBzbyB0aGF0IHdlIGNhbiBjb3VudCB0aGUgY29ycmVjdCBudW1iZXIgb2ZcbiAgICAvLyBsaXN0ZW5lcnMgb24gc2lnbmFscywgYW5kIGRvbid0IHdhaXQgZm9yIHRoZSBvdGhlciBvbmUgdG9cbiAgICAvLyBoYW5kbGUgaXQgaW5zdGVhZCBvZiB1cy5cbiAgICB0aGlzLiNlbWl0dGVyLmNvdW50ICs9IDE7XG4gICAgZm9yIChjb25zdCBzaWcgb2YgdGhpcy4jc2lnbmFscykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBmbiA9IHRoaXMuI3NpZ0xpc3RlbmVyc1tzaWddO1xuICAgICAgICBpZiAoZm4pIHRoaXMuI3Byb2Nlc3Mub24oc2lnLCBmbik7XG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuI3Byb2Nlc3MuZW1pdCA9IChldjogYW55LCAuLi5hOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiNwcm9jZXNzRW1pdChldiwgLi4uYSk7XG4gICAgfTtcbiAgICB0aGlzLiNwcm9jZXNzLnJlYWxseUV4aXQgPSAoY29kZTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy4jcHJvY2Vzc1JlYWxseUV4aXQoY29kZSk7XG4gICAgfTtcbiAgfVxuICB1bmxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLiNsb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4jbG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy4jc2lnbmFscy5mb3JFYWNoKChzaWcpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGhpcy4jc2lnTGlzdGVuZXJzW3NpZ107XG4gICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTGlzdGVuZXIgbm90IGRlZmluZWQgZm9yIHNpZ25hbDogXCIgKyBzaWcpO1xuICAgICAgfVxuICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuI3Byb2Nlc3MucmVtb3ZlTGlzdGVuZXIoc2lnLCBsaXN0ZW5lcik7XG4gICAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfVxuICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICB9KTtcbiAgICB0aGlzLiNwcm9jZXNzLmVtaXQgPSB0aGlzLiNvcmlnaW5hbFByb2Nlc3NFbWl0O1xuICAgIHRoaXMuI3Byb2Nlc3MucmVhbGx5RXhpdCA9IHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQ7XG4gICAgdGhpcy4jZW1pdHRlci5jb3VudCAtPSAxO1xuICB9XG4gICNwcm9jZXNzUmVhbGx5RXhpdChjb2RlOiBhbnkpIHtcbiAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICBpZiAoIXByb2Nlc3NPayh0aGlzLiNwcm9jZXNzKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUgPSBjb2RlIHx8IDA7XG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICB0aGlzLiNlbWl0dGVyLmVtaXQoXCJleGl0XCIsIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUsIG51bGwpO1xuICAgIHJldHVybiB0aGlzLiNvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0LmNhbGwodGhpcy4jcHJvY2VzcywgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSk7XG4gIH1cbiAgI3Byb2Nlc3NFbWl0KGV2OiBhbnksIC4uLmFyZ3M6IGFueSkge1xuICAgIGNvbnN0IG9nID0gdGhpcy4jb3JpZ2luYWxQcm9jZXNzRW1pdDtcbiAgICBpZiAoZXYgPT09IFwiZXhpdFwiICYmIHByb2Nlc3NPayh0aGlzLiNwcm9jZXNzKSkge1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUgPSBhcmdzWzBdO1xuICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIH1cbiAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgY29uc3QgcmV0ID0gb2cuY2FsbCh0aGlzLiNwcm9jZXNzLCBldiwgLi4uYXJncyk7XG4gICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIHRoaXMuI2VtaXR0ZXIuZW1pdChcImV4aXRcIiwgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSwgbnVsbCk7XG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9nLmNhbGwodGhpcy4jcHJvY2VzcywgZXYsIC4uLmFyZ3MpO1xuICAgIH1cbiAgfVxufVxuXG5sZXQgc2lnbmFsRXhpdDogU2lnbmFsRXhpdCB8IFNpZ25hbEV4aXRGYWxsYmFjayB8IG51bGwgPSBudWxsO1xuXG5leHBvcnQgY29uc3Qgb25FeGl0ID0gKFxuICBjYjogYW55LFxuICBvcHRzPzoge1xuICAgIGFsd2F5c0xhc3Q/OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICB9LFxuKSA9PiB7XG4gIGlmICghc2lnbmFsRXhpdCkge1xuICAgIHNpZ25hbEV4aXQgPSBwcm9jZXNzT2socHJvY2VzcykgPyBuZXcgU2lnbmFsRXhpdChwcm9jZXNzKSA6IG5ldyBTaWduYWxFeGl0RmFsbGJhY2soKTtcbiAgfVxuICByZXR1cm4gc2lnbmFsRXhpdC5vbkV4aXQoY2IsIG9wdHMpO1xufTtcbiIsICJpbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGNyZWF0ZVJlYWRTdHJlYW0sIGNyZWF0ZVdyaXRlU3RyZWFtLCBta2RpclN5bmMsIFN0YXRzIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IHN0YXQgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuaW1wb3J0IHsgam9pbiwgbm9ybWFsaXplIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgcGlwZWxpbmUgfSBmcm9tIFwibm9kZTpzdHJlYW0vcHJvbWlzZXNcIjtcbmltcG9ydCB7IHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENoYWluIGZyb20gXCIuL3ZlbmRvcnMvc3RyZWFtLWNoYWluXCI7XG5pbXBvcnQgeyBwYXJzZXIsIFBpY2tQYXJzZXIsIFN0cmVhbUFycmF5IH0gZnJvbSBcIi4vdmVuZG9ycy9zdHJlYW0tanNvblwiO1xuaW1wb3J0IHsgaXNKU09OIH0gZnJvbSBcIi4vZmV0Y2gtdXRpbHNcIjtcbmltcG9ydCB7IEZsYXR0ZW4sIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgQ2FjaGVkUHJvbWlzZU9wdGlvbnMsIHVzZUNhY2hlZFByb21pc2UgfSBmcm9tIFwiLi91c2VDYWNoZWRQcm9taXNlXCI7XG5pbXBvcnQgeyBoYXNoIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG50eXBlIFJlcXVlc3RJbmZvID0gc3RyaW5nIHwgVVJMIHwgZ2xvYmFsVGhpcy5SZXF1ZXN0O1xuXG5hc3luYyBmdW5jdGlvbiBjYWNoZSh1cmw6IFJlcXVlc3RJbmZvLCBkZXN0aW5hdGlvbjogc3RyaW5nLCBmZXRjaE9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkge1xuICBpZiAodHlwZW9mIHVybCA9PT0gXCJvYmplY3RcIiB8fCB1cmwuc3RhcnRzV2l0aChcImh0dHA6Ly9cIikgfHwgdXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSkge1xuICAgIHJldHVybiBhd2FpdCBjYWNoZVVSTCh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICB9IGVsc2UgaWYgKHVybC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSkge1xuICAgIHJldHVybiBhd2FpdCBjYWNoZUZpbGUoXG4gICAgICBub3JtYWxpemUoZGVjb2RlVVJJQ29tcG9uZW50KG5ldyBVUkwodXJsKS5wYXRobmFtZSkpLFxuICAgICAgZGVzdGluYXRpb24sXG4gICAgICBmZXRjaE9wdGlvbnM/LnNpZ25hbCA/IGZldGNoT3B0aW9ucy5zaWduYWwgOiB1bmRlZmluZWQsXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IEhUVFAoUykgb3IgZmlsZSBVUkxzIGFyZSBzdXBwb3J0ZWRcIik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FjaGVVUkwodXJsOiBSZXF1ZXN0SW5mbywgZGVzdGluYXRpb246IHN0cmluZywgZmV0Y2hPcHRpb25zPzogUmVxdWVzdEluaXQpIHtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIGZldGNoT3B0aW9ucyk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBVUkxcIik7XG4gIH1cblxuICBpZiAoIWlzSlNPTihyZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVUkwgZG9lcyBub3QgcmV0dXJuIEpTT05cIik7XG4gIH1cbiAgaWYgKCFyZXNwb25zZS5ib2R5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHJldHJpZXZlIGV4cGVjdGVkIEpTT04gY29udGVudDogUmVzcG9uc2UgYm9keSBpcyBtaXNzaW5nIG9yIGluYWNjZXNzaWJsZS5cIik7XG4gIH1cbiAgYXdhaXQgcGlwZWxpbmUoXG4gICAgcmVzcG9uc2UuYm9keSBhcyB1bmtub3duIGFzIE5vZGVKUy5SZWFkYWJsZVN0cmVhbSxcbiAgICBjcmVhdGVXcml0ZVN0cmVhbShkZXN0aW5hdGlvbiksXG4gICAgZmV0Y2hPcHRpb25zPy5zaWduYWwgPyB7IHNpZ25hbDogZmV0Y2hPcHRpb25zLnNpZ25hbCB9IDogdW5kZWZpbmVkLFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWNoZUZpbGUoc291cmNlOiBzdHJpbmcsIGRlc3RpbmF0aW9uOiBzdHJpbmcsIGFib3J0U2lnbmFsPzogQWJvcnRTaWduYWwpIHtcbiAgYXdhaXQgcGlwZWxpbmUoXG4gICAgY3JlYXRlUmVhZFN0cmVhbShzb3VyY2UpLFxuICAgIGNyZWF0ZVdyaXRlU3RyZWFtKGRlc3RpbmF0aW9uKSxcbiAgICBhYm9ydFNpZ25hbCA/IHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9IDogdW5kZWZpbmVkLFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWNoZVVSTElmTmVjZXNzYXJ5KFxuICB1cmw6IFJlcXVlc3RJbmZvLFxuICBmb2xkZXI6IHN0cmluZyxcbiAgZmlsZU5hbWU6IHN0cmluZyxcbiAgZm9yY2VVcGRhdGU6IGJvb2xlYW4sXG4gIGZldGNoT3B0aW9ucz86IFJlcXVlc3RJbml0LFxuKSB7XG4gIGNvbnN0IGRlc3RpbmF0aW9uID0gam9pbihmb2xkZXIsIGZpbGVOYW1lKTtcblxuICB0cnkge1xuICAgIGF3YWl0IHN0YXQoZm9sZGVyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIG1rZGlyU3luYyhmb2xkZXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgIGF3YWl0IGNhY2hlKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChmb3JjZVVwZGF0ZSkge1xuICAgIGF3YWl0IGNhY2hlKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHN0YXRzOiBTdGF0cyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICBzdGF0cyA9IGF3YWl0IHN0YXQoZGVzdGluYXRpb24pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgYXdhaXQgY2FjaGUodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIHVybCA9PT0gXCJvYmplY3RcIiB8fCB1cmwuc3RhcnRzV2l0aChcImh0dHA6Ly9cIikgfHwgdXJsLnN0YXJ0c1dpdGgoXCJodHRwczovL1wiKSkge1xuICAgIGNvbnN0IGhlYWRSZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyAuLi5mZXRjaE9wdGlvbnMsIG1ldGhvZDogXCJIRUFEXCIgfSk7XG4gICAgaWYgKCFoZWFkUmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmZXRjaCBVUkxcIik7XG4gICAgfVxuXG4gICAgaWYgKCFpc0pTT04oaGVhZFJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVVJMIGRvZXMgbm90IHJldHVybiBKU09OXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGxhc3RNb2RpZmllZCA9IERhdGUucGFyc2UoaGVhZFJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwibGFzdC1tb2RpZmllZFwiKSA/PyBcIlwiKTtcbiAgICBpZiAoc3RhdHMuc2l6ZSA9PT0gMCB8fCBOdW1iZXIuaXNOYU4obGFzdE1vZGlmaWVkKSB8fCBsYXN0TW9kaWZpZWQgPiBzdGF0cy5tdGltZU1zKSB7XG4gICAgICBhd2FpdCBjYWNoZSh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSBlbHNlIGlmICh1cmwuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc291cmNlU3RhdHMgPSBhd2FpdCBzdGF0KG5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTCh1cmwpLnBhdGhuYW1lKSkpO1xuICAgICAgaWYgKHNvdXJjZVN0YXRzLm10aW1lTXMgPiBzdGF0cy5tdGltZU1zKSB7XG4gICAgICAgIGF3YWl0IGNhY2hlKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU291cmNlIGZpbGUgY291bGQgbm90IGJlIHJlYWRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgSFRUUChTKSBvciBmaWxlIFVSTHMgYXJlIHN1cHBvcnRlZFwiKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiogc3RyZWFtSnNvbkZpbGU8VD4oXG4gIGZpbGVQYXRoOiBzdHJpbmcsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIGFib3J0U2lnbmFsPzogQWJvcnRTaWduYWwsXG4gIGRhdGFQYXRoPzogc3RyaW5nIHwgUmVnRXhwLFxuICBmaWx0ZXJGbj86IChpdGVtOiBGbGF0dGVuPFQ+KSA9PiBib29sZWFuLFxuICB0cmFuc2Zvcm1Gbj86IChpdGVtOiBhbnkpID0+IFQsXG4pOiBBc3luY0dlbmVyYXRvcjxUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXT4ge1xuICBsZXQgcGFnZTogVCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10gPSBbXSBhcyBUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXTtcblxuICBjb25zdCBwaXBlbGluZSA9IENoYWluKFtcbiAgICBjcmVhdGVSZWFkU3RyZWFtKGZpbGVQYXRoKSxcbiAgICBkYXRhUGF0aCA/IFBpY2tQYXJzZXIoeyBmaWx0ZXI6IGRhdGFQYXRoIH0pIDogcGFyc2VyKCksXG4gICAgU3RyZWFtQXJyYXkoKSxcbiAgICAoZGF0YTogYW55KSA9PiB0cmFuc2Zvcm1Gbj8uKGRhdGEudmFsdWUpID8/IGRhdGEudmFsdWUsXG4gIF0pO1xuXG4gIGFib3J0U2lnbmFsPy5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xuICAgIHBpcGVsaW5lLmRlc3Ryb3koKTtcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBmb3IgYXdhaXQgKGNvbnN0IGRhdGEgb2YgcGlwZWxpbmUpIHtcbiAgICAgIGlmIChhYm9ydFNpZ25hbD8uYWJvcnRlZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgICBpZiAoIWZpbHRlckZuIHx8IGZpbHRlckZuKGRhdGEpKSB7XG4gICAgICAgIHBhZ2UucHVzaChkYXRhKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYWdlLmxlbmd0aCA+PSBwYWdlU2l6ZSkge1xuICAgICAgICB5aWVsZCBwYWdlO1xuICAgICAgICBwYWdlID0gW10gYXMgVCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW107XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgcGlwZWxpbmUuZGVzdHJveSgpO1xuICAgIHRocm93IGU7XG4gIH1cblxuICBpZiAocGFnZS5sZW5ndGggPiAwKSB7XG4gICAgeWllbGQgcGFnZTtcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxudHlwZSBPcHRpb25zPFQ+ID0ge1xuICAvKipcbiAgICogVGhlIGhvb2sgZXhwZWN0cyB0byBpdGVyYXRlIHRocm91Z2ggYW4gYXJyYXkgb2YgZGF0YSwgc28gYnkgZGVmYXVsdCwgaXQgYXNzdW1lcyB0aGUgSlNPTiBpdCByZWNlaXZlcyBpdHNlbGYgcmVwcmVzZW50cyBhbiBhcnJheS4gSG93ZXZlciwgc29tZXRpbWVzIHRoZSBhcnJheSBvZiBkYXRhIGlzIHdyYXBwZWQgaW4gYW4gb2JqZWN0LFxuICAgKiBpLmUuIGB7IFwic3VjY2Vzc1wiOiB0cnVlLCBcImRhdGFcIjogW+KApl0gfWAsIG9yIGV2ZW4gYHsgXCJzdWNjZXNzXCI6IHRydWUsIFwicmVzdWx0c1wiOiB7IFwiZGF0YVwiOiBb4oCmXSB9IH1gLiBJbiB0aG9zZSBjYXNlcywgeW91IGNhbiB1c2UgYGRhdGFQYXRoYCB0byBzcGVjaWZ5IHdoZXJlIHRoZSBkYXRhIGFycmF5IGNhbiBiZSBmb3VuZC5cbiAgICpcbiAgICogQHJlbWFyayBJZiB5b3VyIEpTT04gb2JqZWN0IGhhcyBtdWx0aXBsZSBhcnJheXMgdGhhdCB5b3Ugd2FudCB0byBzdHJlYW0gZGF0YSBmcm9tLCB5b3UgY2FuIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gc3RyZWFtIHRocm91Z2ggYWxsIG9mIHRoZW0uXG4gICAqXG4gICAqIEBleGFtcGxlIEZvciBgeyBcInN1Y2Nlc3NcIjogdHJ1ZSwgXCJkYXRhXCI6IFvigKZdIH1gLCBkYXRhUGF0aCB3b3VsZCBiZSBgZGF0YWBcbiAgICogQGV4YW1wbGUgRm9yIGB7IFwic3VjY2Vzc1wiOiB0cnVlLCBcInJlc3VsdHNcIjogeyBcImRhdGFcIjogW+KApl0gfSB9YCwgZGF0YVBhdGggd291bGQgYmUgYHJlc3VsdHMuZGF0YWBcbiAgICogQGV4YW1wbGUgRm9yIGB7IFwic3VjY2Vzc1wiOiB0cnVlLCBcInJlc3VsdHNcIjogeyBcImZpcnN0X2xpc3RcIjogW+KApl0sIFwic2Vjb25kX2xpc3RcIjogW+KApl0sIFwidGhpcmRfbGlzdFwiOiBb4oCmXSB9IH1gLCBkYXRhUGF0aCB3b3VsZCBiZSBgL15yZXN1bHRzXFwuKGZpcnN0X2xpc3R8c2Vjb25kX2xpc3R8dGhpcmRfbGlzdCkkXG4vYC5cbiAgICovXG4gIGRhdGFQYXRoPzogc3RyaW5nIHwgUmVnRXhwO1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBkZWNpZGUgd2hldGhlciBhIHBhcnRpY3VsYXIgaXRlbSBzaG91bGQgYmUga2VwdCBvciBub3QuXG4gICAqIERlZmF1bHRzIHRvIGB1bmRlZmluZWRgLCBrZWVwaW5nIGFueSBlbmNvdW50ZXJlZCBpdGVtLlxuICAgKlxuICAgKiBAcmVtYXJrIFRoZSBob29rIHdpbGwgcmV2YWxpZGF0ZSBldmVyeSB0aW1lIHRoZSBmaWx0ZXIgZnVuY3Rpb24gY2hhbmdlcywgc28geW91IG5lZWQgdG8gdXNlIFt1c2VDYWxsYmFja10oaHR0cHM6Ly9yZWFjdC5kZXYvcmVmZXJlbmNlL3JlYWN0L3VzZUNhbGxiYWNrKSB0byBtYWtlIHN1cmUgaXQgb25seSBjaGFuZ2VzIHdoZW4gaXQgbmVlZHMgdG8uXG4gICAqL1xuICBmaWx0ZXI/OiAoaXRlbTogRmxhdHRlbjxUPikgPT4gYm9vbGVhbjtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gZWFjaCBpdGVtIGFzIGl0IGlzIGVuY291bnRlcmVkLiBVc2VmdWwgZm9yIGEgY291cGxlIG9mIHRoaW5nczpcbiAgICogMS4gZW5zdXJpbmcgdGhhdCBhbGwgaXRlbXMgaGF2ZSB0aGUgZXhwZWN0ZWQgcHJvcGVydGllcywgYW5kLCBhcyBvbiBvcHRpbWl6YXRpb24sIGZvciBnZXR0aW5nIHJpZCBvZiB0aGUgcHJvcGVydGllcyB0aGF0IHlvdSBkb24ndCBjYXJlIGFib3V0LlxuICAgKiAyLiB3aGVuIHRvcC1sZXZlbCBvYmplY3RzIGFjdHVhbGx5IHJlcHJlc2VudCBuZXN0ZWQgZGF0YSwgd2hpY2ggc2hvdWxkIGJlIGZsYXR0ZW5lZC4gSW4gdGhpcyBjYXNlLCBgdHJhbnNmb3JtYCBjYW4gcmV0dXJuIGFuIGFycmF5IG9mIGl0ZW1zLCBhbmQgdGhlIGhvb2sgd2lsbCBzdHJlYW0gdGhyb3VnaCBlYWNoIG9uZSBvZiB0aG9zZSBpdGVtcyxcbiAgICogcGFzc2luZyB0aGVtIHRvIGBmaWx0ZXJgIGV0Yy5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gYSBwYXNzdGhyb3VnaCBmdW5jdGlvbiBpZiBub3QgcHJvdmlkZWQuXG4gICAqXG4gICAqIEByZW1hcmsgVGhlIGhvb2sgd2lsbCByZXZhbGlkYXRlIGV2ZXJ5IHRpbWUgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiBjaGFuZ2VzLCBzbyBpdCBpcyBpbXBvcnRhbnQgdG8gdXNlIFt1c2VDYWxsYmFja10oaHR0cHM6Ly9yZWFjdC5kZXYvcmVmZXJlbmNlL3JlYWN0L3VzZUNhbGxiYWNrKSB0byBlbnN1cmUgaXQgb25seSBjaGFuZ2VzIHdoZW4gbmVjZXNzYXJ5IHRvIHByZXZlbnQgdW5uZWNlc3NhcnkgcmUtcmVuZGVycyBvciBjb21wdXRhdGlvbnMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYFxuICAgKiAvLyBGb3IgZGF0YTogYHsgXCJkYXRhXCI6IFsgeyBcInR5cGVcIjogXCJmb2xkZXJcIiwgXCJuYW1lXCI6IFwiaXRlbSAxXCIsIFwiY2hpbGRyZW5cIjogWyB7IFwidHlwZVwiOiBcIml0ZW1cIiwgXCJuYW1lXCI6IFwiaXRlbSAyXCIgfSwgeyBcInR5cGVcIjogXCJpdGVtXCIsIFwibmFtZVwiOiBcIml0ZW0gM1wiIH0gXSB9LCB7IFwidHlwZVwiOiBcImZvbGRlclwiLCBcIm5hbWVcIjogXCJpdGVtIDRcIiwgY2hpbGRyZW46IFtdIH0gXSB9YFxuICAgKlxuICAgKiB0eXBlIEl0ZW0gPSB7XG4gICAqICB0eXBlOiBcIml0ZW1cIjtcbiAgICogIG5hbWU6IHN0cmluZztcbiAgICogfTtcbiAgICpcbiAgICogdHlwZSBGb2xkZXIgPSB7XG4gICAqICAgdHlwZTogXCJmb2xkZXJcIjtcbiAgICogICBuYW1lOiBzdHJpbmc7XG4gICAqICAgY2hpbGRyZW46IChJdGVtIHwgRm9sZGVyKVtdO1xuICAgKiB9O1xuICAgKlxuICAgKiBmdW5jdGlvbiBmbGF0dGVuKGl0ZW06IEl0ZW0gfCBGb2xkZXIpOiB7IG5hbWU6IHN0cmluZyB9W10ge1xuICAgKiAgIGNvbnN0IGZsYXR0ZW5lZDogeyBuYW1lOiBzdHJpbmcgfVtdID0gW107XG4gICAqICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJmb2xkZXJcIikge1xuICAgKiAgICAgZmxhdHRlbmVkLnB1c2goLi4uaXRlbS5jaGlsZHJlbi5tYXAoZmxhdHRlbikuZmxhdCgpKTtcbiAgICogICB9XG4gICAqICAgaWYgKGl0ZW0udHlwZSA9PT0gXCJpdGVtXCIpIHtcbiAgICogICAgIGZsYXR0ZW5lZC5wdXNoKHsgbmFtZTogaXRlbS5uYW1lIH0pO1xuICAgKiAgIH1cbiAgICogICByZXR1cm4gZmxhdHRlbmVkO1xuICAgKiB9XG4gICAqXG4gICAqIGNvbnN0IHRyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKGZsYXR0ZW4sIFtdKTtcbiAgICogY29uc3QgZmlsdGVyID0gdXNlQ2FsbGJhY2soKGl0ZW06IHsgbmFtZTogc3RyaW5nIH0pID0+IHtcbiAgICogICDigKZcbiAgICogfSlcbiAgICogYGBgXG4gICAqL1xuICB0cmFuc2Zvcm0/OiAoaXRlbTogYW55KSA9PiBUO1xuICAvKipcbiAgICogVGhlIGFtb3VudCBvZiBpdGVtcyB0byByZXR1cm4gZm9yIGVhY2ggcGFnZS5cbiAgICogRGVmYXVsdHMgdG8gYDIwYC5cbiAgICovXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBUYWtlcyBhIGBodHRwOi8vYCwgYGh0dHBzOi8vYCBvciBgZmlsZTovLy9gIFVSTCBwb2ludGluZyB0byBhIEpTT04gcmVzb3VyY2UsIGNhY2hlcyBpdCB0byB0aGUgY29tbWFuZCdzIHN1cHBvcnRcbiAqIGZvbGRlciwgYW5kIHN0cmVhbXMgdGhyb3VnaCBpdHMgY29udGVudC4gVXNlZnVsIHdoZW4gZGVhbGluZyB3aXRoIGxhcmdlIEpTT04gYXJyYXlzIHdoaWNoIHdvdWxkIGJlIHRvbyBiaWcgdG8gZml0XG4gKiBpbiB0aGUgY29tbWFuZCdzIG1lbW9yeS5cbiAqXG4gKiBAcmVtYXJrIFRoZSBKU09OIHJlc291cmNlIG5lZWRzIHRvIGNvbnNpc3Qgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VTdHJlYW1KU09OIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogdHlwZSBGb3JtdWxhID0geyBuYW1lOiBzdHJpbmc7IGRlc2M/OiBzdHJpbmcgfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluKCk6IFJlYWN0LkpTWC5FbGVtZW50IHtcbiAqICAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIHBhZ2luYXRpb24gfSA9IHVzZVN0cmVhbUpTT048Rm9ybXVsYT4oXCJodHRwczovL2Zvcm11bGFlLmJyZXcuc2gvYXBpL2Zvcm11bGEuanNvblwiKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHBhZ2luYXRpb249e3BhZ2luYXRpb259PlxuICogICAgICAgPExpc3QuU2VjdGlvbiB0aXRsZT1cIkZvcm11bGFlXCI+XG4gKiAgICAgICAgIHtkYXRhPy5tYXAoKGQpID0+IDxMaXN0Lkl0ZW0ga2V5PXtkLm5hbWV9IHRpdGxlPXtkLm5hbWV9IHN1YnRpdGxlPXtkLmRlc2N9IC8+KX1cbiAqICAgICAgIDwvTGlzdC5TZWN0aW9uPlxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VTdHJlYW1KU09OIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKiBpbXBvcnQgeyBob21lZGlyIH0gZnJvbSBcIm9zXCI7XG4gKiBpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbiAqXG4gKiB0eXBlIEZvcm11bGEgPSB7IG5hbWU6IHN0cmluZzsgZGVzYz86IHN0cmluZyB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW4oKTogUmVhY3QuSlNYLkVsZW1lbnQge1xuICogICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgcGFnaW5hdGlvbiB9ID0gdXNlU3RyZWFtSlNPTjxGb3JtdWxhPihgZmlsZTovLy8ke2pvaW4oaG9tZWRpcigpLCBcIkRvd25sb2Fkc1wiLCBcImZvcm11bGFlLmpzb25cIil9YCk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufT5cbiAqICAgICAgIDxMaXN0LlNlY3Rpb24gdGl0bGU9XCJGb3JtdWxhZVwiPlxuICogICAgICAgICB7ZGF0YT8ubWFwKChkKSA9PiA8TGlzdC5JdGVtIGtleT17ZC5uYW1lfSB0aXRsZT17ZC5uYW1lfSBzdWJ0aXRsZT17ZC5kZXNjfSAvPil9XG4gKiAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0cmVhbUpTT048VCwgVSA9IHVua25vd24+KHVybDogUmVxdWVzdEluZm8pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcblxuLyoqXG4gKiBUYWtlcyBhIGBodHRwOi8vYCwgYGh0dHBzOi8vYCBvciBgZmlsZTovLy9gIFVSTCBwb2ludGluZyB0byBhIEpTT04gcmVzb3VyY2UsIGNhY2hlcyBpdCB0byB0aGUgY29tbWFuZCdzIHN1cHBvcnRcbiAqIGZvbGRlciwgYW5kIHN0cmVhbXMgdGhyb3VnaCBpdHMgY29udGVudC4gVXNlZnVsIHdoZW4gZGVhbGluZyB3aXRoIGxhcmdlIEpTT04gYXJyYXlzIHdoaWNoIHdvdWxkIGJlIHRvbyBiaWcgdG8gZml0XG4gKiBpbiB0aGUgY29tbWFuZCdzIG1lbW9yeS5cbiAqXG4gKiBAcmVtYXJrIFRoZSBKU09OIHJlc291cmNlIG5lZWRzIHRvIGNvbnNpc3Qgb2YgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IExpc3QsIGVudmlyb25tZW50IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlU3RyZWFtSlNPTiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICogaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuICogaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4gKlxuICogdHlwZSBGb3JtdWxhID0geyBuYW1lOiBzdHJpbmc7IGRlc2M/OiBzdHJpbmcgfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluKCk6IFJlYWN0LkpTWC5FbGVtZW50IHtcbiAqICAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUoXCJcIik7XG4gKlxuICogICBjb25zdCBmb3JtdWxhRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gKiAgICAgKGl0ZW06IEZvcm11bGEpID0+IHtcbiAqICAgICAgIGlmICghc2VhcmNoVGV4dCkgcmV0dXJuIHRydWU7XG4gKiAgICAgICByZXR1cm4gaXRlbS5uYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCk7XG4gKiAgICAgfSxcbiAqICAgICBbc2VhcmNoVGV4dF0sXG4gKiAgICk7XG4gKlxuICogICBjb25zdCBmb3JtdWxhVHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKGl0ZW06IGFueSk6IEZvcm11bGEgPT4ge1xuICogICAgIHJldHVybiB7IG5hbWU6IGl0ZW0ubmFtZSwgZGVzYzogaXRlbS5kZXNjIH07XG4gKiAgIH0sIFtdKTtcbiAqXG4gKiAgIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCBwYWdpbmF0aW9uIH0gPSB1c2VTdHJlYW1KU09OKFwiaHR0cHM6Ly9mb3JtdWxhZS5icmV3LnNoL2FwaS9mb3JtdWxhLmpzb25cIiwge1xuICogICAgIGluaXRpYWxEYXRhOiBbXSBhcyBGb3JtdWxhW10sXG4gKiAgICAgcGFnZVNpemU6IDIwLFxuICogICAgIGZpbHRlcjogZm9ybXVsYUZpbHRlcixcbiAqICAgICB0cmFuc2Zvcm06IGZvcm11bGFUcmFuc2Zvcm0sXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0gb25TZWFyY2hUZXh0Q2hhbmdlPXtzZXRTZWFyY2hUZXh0fT5cbiAqICAgICAgIDxMaXN0LlNlY3Rpb24gdGl0bGU9XCJGb3JtdWxhZVwiPlxuICogICAgICAgICB7ZGF0YS5tYXAoKGQpID0+IChcbiAqICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17ZC5uYW1lfSB0aXRsZT17ZC5uYW1lfSBzdWJ0aXRsZT17ZC5kZXNjfSAvPlxuICogICAgICAgICApKX1cbiAqICAgICAgIDwvTGlzdC5TZWN0aW9uPlxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYCBzdXBwb3J0IGZvbGRlciwgYW5kIHN0cmVhbXMgdGhyb3VnaCBpdHMgY29udGVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBMaXN0LCBlbnZpcm9ubWVudCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZVN0cmVhbUpTT04gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqIGltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuICogaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuICogaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4gKlxuICogdHlwZSBGb3JtdWxhID0geyBuYW1lOiBzdHJpbmc7IGRlc2M/OiBzdHJpbmcgfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluKCk6IFJlYWN0LkpTWC5FbGVtZW50IHtcbiAqICAgY29uc3QgW3NlYXJjaFRleHQsIHNldFNlYXJjaFRleHRdID0gdXNlU3RhdGUoXCJcIik7XG4gKlxuICogICBjb25zdCBmb3JtdWxhRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gKiAgICAgKGl0ZW06IEZvcm11bGEpID0+IHtcbiAqICAgICAgIGlmICghc2VhcmNoVGV4dCkgcmV0dXJuIHRydWU7XG4gKiAgICAgICByZXR1cm4gaXRlbS5uYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGV4dCk7XG4gKiAgICAgfSxcbiAqICAgICBbc2VhcmNoVGV4dF0sXG4gKiAgICk7XG4gKlxuICogICBjb25zdCBmb3JtdWxhVHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKGl0ZW06IGFueSk6IEZvcm11bGEgPT4ge1xuICogICAgIHJldHVybiB7IG5hbWU6IGl0ZW0ubmFtZSwgZGVzYzogaXRlbS5kZXNjIH07XG4gKiAgIH0sIFtdKTtcbiAqXG4gKiAgIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCBwYWdpbmF0aW9uIH0gPSB1c2VTdHJlYW1KU09OKGBmaWxlOi8vLyR7am9pbihob21lZGlyKCksIFwiRG93bmxvYWRzXCIsIFwiZm9ybXVsYWUuanNvblwiKX1gLCB7XG4gKiAgICAgaW5pdGlhbERhdGE6IFtdIGFzIEZvcm11bGFbXSxcbiAqICAgICBwYWdlU2l6ZTogMjAsXG4gKiAgICAgZmlsdGVyOiBmb3JtdWxhRmlsdGVyLFxuICogICAgIHRyYW5zZm9ybTogZm9ybXVsYVRyYW5zZm9ybSxcbiAqICAgfSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufSBvblNlYXJjaFRleHRDaGFuZ2U9e3NldFNlYXJjaFRleHR9PlxuICogICAgICAgPExpc3QuU2VjdGlvbiB0aXRsZT1cIkZvcm11bGFlXCI+XG4gKiAgICAgICAgIHtkYXRhLm1hcCgoZCkgPT4gKFxuICogICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtkLm5hbWV9IHRpdGxlPXtkLm5hbWV9IHN1YnRpdGxlPXtkLmRlc2N9IC8+XG4gKiAgICAgICAgICkpfVxuICogICAgICAgPC9MaXN0LlNlY3Rpb24+XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdHJlYW1KU09OPFQsIFUgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcbiAgdXJsOiBSZXF1ZXN0SW5mbyxcbiAgb3B0aW9uczogT3B0aW9uczxUPiAmIFJlcXVlc3RJbml0ICYgT21pdDxDYWNoZWRQcm9taXNlT3B0aW9uczxGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIFU+LCBcImFib3J0YWJsZVwiPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdLCBVPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0cmVhbUpTT048VCwgVSBleHRlbmRzIGFueVtdID0gYW55W10+KFxuICB1cmw6IFJlcXVlc3RJbmZvLFxuICBvcHRpb25zPzogT3B0aW9uczxUPiAmIFJlcXVlc3RJbml0ICYgT21pdDxDYWNoZWRQcm9taXNlT3B0aW9uczxGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIFU+LCBcImFib3J0YWJsZVwiPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdLCBVPiB7XG4gIGNvbnN0IHtcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICAgIGRhdGFQYXRoLFxuICAgIGZpbHRlcixcbiAgICB0cmFuc2Zvcm0sXG4gICAgcGFnZVNpemUgPSAyMCxcbiAgICAuLi5mZXRjaE9wdGlvbnNcbiAgfSA9IG9wdGlvbnMgPz8ge307XG4gIGNvbnN0IHByZXZpb3VzVXJsID0gdXNlUmVmPFJlcXVlc3RJbmZvPihudWxsKTtcbiAgY29uc3QgcHJldmlvdXNEZXN0aW5hdGlvbiA9IHVzZVJlZjxzdHJpbmc+KG51bGwpO1xuXG4gIGNvbnN0IHVzZUNhY2hlZFByb21pc2VPcHRpb25zOiBDYWNoZWRQcm9taXNlT3B0aW9uczxGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIFU+ID0ge1xuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3QgZ2VuZXJhdG9yUmVmID0gdXNlUmVmPEFzeW5jR2VuZXJhdG9yPFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdPiB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjb250cm9sbGVyUmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBoYXNNb3JlUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICByZXR1cm4gdXNlQ2FjaGVkUHJvbWlzZShcbiAgICAoXG4gICAgICB1cmw6IFJlcXVlc3RJbmZvLFxuICAgICAgcGFnZVNpemU6IG51bWJlcixcbiAgICAgIGZldGNoT3B0aW9uczogUmVxdWVzdEluaXQgfCB1bmRlZmluZWQsXG4gICAgICBkYXRhUGF0aDogc3RyaW5nIHwgUmVnRXhwIHwgdW5kZWZpbmVkLFxuICAgICAgZmlsdGVyOiAoKGl0ZW06IEZsYXR0ZW48VD4pID0+IGJvb2xlYW4pIHwgdW5kZWZpbmVkLFxuICAgICAgdHJhbnNmb3JtOiAoKGl0ZW06IHVua25vd24pID0+IFQpIHwgdW5kZWZpbmVkLFxuICAgICkgPT5cbiAgICAgIGFzeW5jICh7IHBhZ2UgfSkgPT4ge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGhhc2godXJsKSArIFwiLmpzb25cIjtcbiAgICAgICAgY29uc3QgZm9sZGVyID0gZW52aXJvbm1lbnQuc3VwcG9ydFBhdGg7XG4gICAgICAgIGlmIChwYWdlID09PSAwKSB7XG4gICAgICAgICAgY29udHJvbGxlclJlZi5jdXJyZW50Py5hYm9ydCgpO1xuICAgICAgICAgIGNvbnRyb2xsZXJSZWYuY3VycmVudCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGpvaW4oZm9sZGVyLCBmaWxlTmFtZSk7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogRm9yY2UgdXBkYXRlIHRoZSBjYWNoZSB3aGVuIHRoZSBVUkwgY2hhbmdlcyBidXQgdGhlIGNhY2hlIGRlc3RpbmF0aW9uIGRvZXMgbm90LlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGZvcmNlQ2FjaGVVcGRhdGUgPSBCb29sZWFuKFxuICAgICAgICAgICAgcHJldmlvdXNVcmwuY3VycmVudCAmJlxuICAgICAgICAgICAgICBwcmV2aW91c1VybC5jdXJyZW50ICE9PSB1cmwgJiZcbiAgICAgICAgICAgICAgcHJldmlvdXNEZXN0aW5hdGlvbi5jdXJyZW50ICYmXG4gICAgICAgICAgICAgIHByZXZpb3VzRGVzdGluYXRpb24uY3VycmVudCA9PT0gZGVzdGluYXRpb24sXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwcmV2aW91c1VybC5jdXJyZW50ID0gdXJsO1xuICAgICAgICAgIHByZXZpb3VzRGVzdGluYXRpb24uY3VycmVudCA9IGRlc3RpbmF0aW9uO1xuICAgICAgICAgIGF3YWl0IGNhY2hlVVJMSWZOZWNlc3NhcnkodXJsLCBmb2xkZXIsIGZpbGVOYW1lLCBmb3JjZUNhY2hlVXBkYXRlLCB7XG4gICAgICAgICAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXJSZWYuY3VycmVudD8uc2lnbmFsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGdlbmVyYXRvclJlZi5jdXJyZW50ID0gc3RyZWFtSnNvbkZpbGUoXG4gICAgICAgICAgICBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgIHBhZ2VTaXplLFxuICAgICAgICAgICAgY29udHJvbGxlclJlZi5jdXJyZW50Py5zaWduYWwsXG4gICAgICAgICAgICBkYXRhUGF0aCxcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHRyYW5zZm9ybSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZ2VuZXJhdG9yUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICByZXR1cm4geyBoYXNNb3JlOiBoYXNNb3JlUmVmLmN1cnJlbnQsIGRhdGE6IFtdIGFzIFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyB2YWx1ZTogbmV3RGF0YSwgZG9uZSB9ID0gYXdhaXQgZ2VuZXJhdG9yUmVmLmN1cnJlbnQubmV4dCgpO1xuICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSAhZG9uZTtcbiAgICAgICAgcmV0dXJuIHsgaGFzTW9yZTogaGFzTW9yZVJlZi5jdXJyZW50LCBkYXRhOiAobmV3RGF0YSA/PyBbXSkgYXMgVCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10gfTtcbiAgICAgIH0sXG4gICAgW3VybCwgcGFnZVNpemUsIGZldGNoT3B0aW9ucywgZGF0YVBhdGgsIGZpbHRlciwgdHJhbnNmb3JtXSxcbiAgICB1c2VDYWNoZWRQcm9taXNlT3B0aW9ucyxcbiAgKTtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbmltcG9ydCB7IFJlYWRhYmxlLCBXcml0YWJsZSwgRHVwbGV4IH0gZnJvbSBcIm5vZGU6c3RyZWFtXCI7XG5cbmV4cG9ydCBjb25zdCBub25lID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLm5vbmVcIik7XG5jb25zdCBzdG9wID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLnN0b3BcIik7XG5cbmNvbnN0IGZpbmFsU3ltYm9sID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLmZpbmFsXCIpO1xuY29uc3QgbWFueVN5bWJvbCA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5tYW55XCIpO1xuY29uc3QgZmx1c2hTeW1ib2wgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0uZmx1c2hcIik7XG5jb25zdCBmTGlzdFN5bWJvbCA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5mTGlzdFwiKTtcblxuY29uc3QgZmluYWxWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiAoeyBbZmluYWxTeW1ib2xdOiAxLCB2YWx1ZSB9KTtcbmV4cG9ydCBjb25zdCBtYW55ID0gKHZhbHVlczogYW55KSA9PiAoeyBbbWFueVN5bWJvbF06IDEsIHZhbHVlcyB9KTtcblxuY29uc3QgaXNGaW5hbFZhbHVlID0gKG86IGFueSkgPT4gbyAmJiBvW2ZpbmFsU3ltYm9sXSA9PT0gMTtcbmNvbnN0IGlzTWFueSA9IChvOiBhbnkpID0+IG8gJiYgb1ttYW55U3ltYm9sXSA9PT0gMTtcbmNvbnN0IGlzRmx1c2hhYmxlID0gKG86IGFueSkgPT4gbyAmJiBvW2ZsdXNoU3ltYm9sXSA9PT0gMTtcbmNvbnN0IGlzRnVuY3Rpb25MaXN0ID0gKG86IGFueSkgPT4gbyAmJiBvW2ZMaXN0U3ltYm9sXSA9PT0gMTtcblxuY29uc3QgZ2V0RmluYWxWYWx1ZSA9IChvOiBhbnkpID0+IG8udmFsdWU7XG5jb25zdCBnZXRNYW55VmFsdWVzID0gKG86IGFueSkgPT4gby52YWx1ZXM7XG5jb25zdCBnZXRGdW5jdGlvbkxpc3QgPSAobzogYW55KSA9PiBvLmZMaXN0O1xuXG5leHBvcnQgY29uc3QgY29tYmluZU1hbnlNdXQgPSAoYTogYW55LCBiOiBhbnkpID0+IHtcbiAgY29uc3QgdmFsdWVzID0gYSA9PT0gbm9uZSA/IFtdIDogYT8uW21hbnlTeW1ib2xdID09PSAxID8gYS52YWx1ZXMgOiBbYV07XG4gIGlmIChiID09PSBub25lKSB7XG4gICAgLy8gZG8gbm90aGluZ1xuICB9IGVsc2UgaWYgKGI/LlttYW55U3ltYm9sXSA9PT0gMSkge1xuICAgIHZhbHVlcy5wdXNoKC4uLmIudmFsdWVzKTtcbiAgfSBlbHNlIHtcbiAgICB2YWx1ZXMucHVzaChiKTtcbiAgfVxuICByZXR1cm4gbWFueSh2YWx1ZXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IGZsdXNoYWJsZSA9ICh3cml0ZTogKHZhbHVlOiBhbnkpID0+IGFueSwgZmluYWwgPSBudWxsKSA9PiB7XG4gIGNvbnN0IGZuID0gZmluYWwgPyAodmFsdWU6IGFueSkgPT4gKHZhbHVlID09PSBub25lID8gZmluYWxWYWx1ZSh1bmRlZmluZWQpIDogd3JpdGUodmFsdWUpKSA6IHdyaXRlO1xuICAvLyBAdHMtaWdub3JlXG4gIGZuW2ZsdXNoU3ltYm9sXSA9IDE7XG4gIHJldHVybiBmbjtcbn07XG5cbmNvbnN0IHNldEZ1bmN0aW9uTGlzdCA9IChvOiBhbnksIGZuczogYW55KSA9PiB7XG4gIG8uZkxpc3QgPSBmbnM7XG4gIG9bZkxpc3RTeW1ib2xdID0gMTtcbiAgcmV0dXJuIG87XG59O1xuXG4vLyBpcypOb2RlU3RyZWFtIGZ1bmN0aW9ucyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL21hc3Rlci9saWIvaW50ZXJuYWwvc3RyZWFtcy91dGlscy5qc1xuY29uc3QgaXNSZWFkYWJsZU5vZGVTdHJlYW0gPSAob2JqOiBhbnkpID0+XG4gIG9iaiAmJlxuICB0eXBlb2Ygb2JqLnBpcGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2Ygb2JqLm9uID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgKCFvYmouX3dyaXRhYmxlU3RhdGUgfHwgKHR5cGVvZiBvYmouX3JlYWRhYmxlU3RhdGUgPT09IFwib2JqZWN0XCIgPyBvYmouX3JlYWRhYmxlU3RhdGUucmVhZGFibGUgOiBudWxsKSAhPT0gZmFsc2UpICYmIC8vIER1cGxleFxuICAoIW9iai5fd3JpdGFibGVTdGF0ZSB8fCBvYmouX3JlYWRhYmxlU3RhdGUpOyAvLyBXcml0YWJsZSBoYXMgLnBpcGUuXG5cbmNvbnN0IGlzV3JpdGFibGVOb2RlU3RyZWFtID0gKG9iajogYW55KSA9PlxuICBvYmogJiZcbiAgdHlwZW9mIG9iai53cml0ZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBvYmoub24gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAoIW9iai5fcmVhZGFibGVTdGF0ZSB8fCAodHlwZW9mIG9iai5fd3JpdGFibGVTdGF0ZSA9PT0gXCJvYmplY3RcIiA/IG9iai5fd3JpdGFibGVTdGF0ZS53cml0YWJsZSA6IG51bGwpICE9PSBmYWxzZSk7IC8vIER1cGxleFxuXG5jb25zdCBpc0R1cGxleE5vZGVTdHJlYW0gPSAob2JqOiBhbnkpID0+XG4gIG9iaiAmJlxuICB0eXBlb2Ygb2JqLnBpcGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICBvYmouX3JlYWRhYmxlU3RhdGUgJiZcbiAgdHlwZW9mIG9iai5vbiA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBvYmoud3JpdGUgPT09IFwiZnVuY3Rpb25cIjtcblxuY29uc3QgaXNSZWFkYWJsZVdlYlN0cmVhbSA9IChvYmo6IGFueSkgPT4gb2JqICYmIGdsb2JhbFRoaXMuUmVhZGFibGVTdHJlYW0gJiYgb2JqIGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbTtcblxuY29uc3QgaXNXcml0YWJsZVdlYlN0cmVhbSA9IChvYmo6IGFueSkgPT4gb2JqICYmIGdsb2JhbFRoaXMuV3JpdGFibGVTdHJlYW0gJiYgb2JqIGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5Xcml0YWJsZVN0cmVhbTtcblxuY29uc3QgaXNEdXBsZXhXZWJTdHJlYW0gPSAob2JqOiBhbnkpID0+XG4gIG9iaiAmJlxuICBnbG9iYWxUaGlzLlJlYWRhYmxlU3RyZWFtICYmXG4gIG9iai5yZWFkYWJsZSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuUmVhZGFibGVTdHJlYW0gJiZcbiAgZ2xvYmFsVGhpcy5Xcml0YWJsZVN0cmVhbSAmJlxuICBvYmoud3JpdGFibGUgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLldyaXRhYmxlU3RyZWFtO1xuXG5jb25zdCBncm91cEZ1bmN0aW9ucyA9IChvdXRwdXQ6IGFueSwgZm46IGFueSwgaW5kZXg6IGFueSwgZm5zOiBhbnkpID0+IHtcbiAgaWYgKFxuICAgIGlzRHVwbGV4Tm9kZVN0cmVhbShmbikgfHxcbiAgICAoIWluZGV4ICYmIGlzUmVhZGFibGVOb2RlU3RyZWFtKGZuKSkgfHxcbiAgICAoaW5kZXggPT09IGZucy5sZW5ndGggLSAxICYmIGlzV3JpdGFibGVOb2RlU3RyZWFtKGZuKSlcbiAgKSB7XG4gICAgb3V0cHV0LnB1c2goZm4pO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgaWYgKGlzRHVwbGV4V2ViU3RyZWFtKGZuKSkge1xuICAgIG91dHB1dC5wdXNoKER1cGxleC5mcm9tV2ViKGZuLCB7IG9iamVjdE1vZGU6IHRydWUgfSkpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgaWYgKCFpbmRleCAmJiBpc1JlYWRhYmxlV2ViU3RyZWFtKGZuKSkge1xuICAgIG91dHB1dC5wdXNoKFJlYWRhYmxlLmZyb21XZWIoZm4sIHsgb2JqZWN0TW9kZTogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBpZiAoaW5kZXggPT09IGZucy5sZW5ndGggLSAxICYmIGlzV3JpdGFibGVXZWJTdHJlYW0oZm4pKSB7XG4gICAgb3V0cHV0LnB1c2goV3JpdGFibGUuZnJvbVdlYihmbiwgeyBvYmplY3RNb2RlOiB0cnVlIH0pKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG4gIGlmICh0eXBlb2YgZm4gIT0gXCJmdW5jdGlvblwiKSB0aHJvdyBUeXBlRXJyb3IoXCJJdGVtICNcIiArIGluZGV4ICsgXCIgaXMgbm90IGEgcHJvcGVyIHN0cmVhbSwgbm9yIGEgZnVuY3Rpb24uXCIpO1xuICBpZiAoIW91dHB1dC5sZW5ndGgpIG91dHB1dC5wdXNoKFtdKTtcbiAgY29uc3QgbGFzdCA9IG91dHB1dFtvdXRwdXQubGVuZ3RoIC0gMV07XG4gIGlmIChBcnJheS5pc0FycmF5KGxhc3QpKSB7XG4gICAgbGFzdC5wdXNoKGZuKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQucHVzaChbZm5dKTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuY2xhc3MgU3RvcCBleHRlbmRzIEVycm9yIHt9XG5cbmV4cG9ydCBjb25zdCBhc1N0cmVhbSA9IChmbjogYW55KSA9PiB7XG4gIGlmICh0eXBlb2YgZm4gIT0gXCJmdW5jdGlvblwiKSB0aHJvdyBUeXBlRXJyb3IoXCJPbmx5IGEgZnVuY3Rpb24gaXMgYWNjZXB0ZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50XCIpO1xuXG4gIC8vIHB1bXAgdmFyaWFibGVzXG4gIGxldCBwYXVzZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgbGV0IHJlc29sdmVQYXVzZWQ6ICgodmFsdWU6IHZvaWQgfCBQcm9taXNlTGlrZTx2b2lkPikgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcbiAgY29uc3QgcXVldWU6IGFueVtdID0gW107XG5cbiAgLy8gcGF1c2UvcmVzdW1lXG4gIGNvbnN0IHJlc3VtZTogYW55ID0gKCkgPT4ge1xuICAgIGlmICghcmVzb2x2ZVBhdXNlZCkgcmV0dXJuO1xuICAgIHJlc29sdmVQYXVzZWQoKTtcbiAgICByZXNvbHZlUGF1c2VkID0gbnVsbDtcbiAgICBwYXVzZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcbiAgY29uc3QgcGF1c2U6IGFueSA9ICgpID0+IHtcbiAgICBpZiAocmVzb2x2ZVBhdXNlZCkgcmV0dXJuO1xuICAgIHBhdXNlZCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiAocmVzb2x2ZVBhdXNlZCA9IHJlc29sdmUpKTtcbiAgfTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XG4gIGxldCBzdHJlYW06IER1cGxleDsgLy8gd2lsbCBiZSBhc3NpZ25lZCBsYXRlclxuXG4gIC8vIGRhdGEgcHJvY2Vzc2luZ1xuICBjb25zdCBwdXNoUmVzdWx0czogYW55ID0gKHZhbHVlczogYW55KSA9PiB7XG4gICAgaWYgKHZhbHVlcyAmJiB0eXBlb2YgdmFsdWVzLm5leHQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIHF1ZXVlLnB1c2godmFsdWVzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYXJyYXlcbiAgICBxdWV1ZS5wdXNoKHZhbHVlc1tTeW1ib2wuaXRlcmF0b3JdKCkpO1xuICB9O1xuICBjb25zdCBwdW1wOiBhbnkgPSBhc3luYyAoKSA9PiB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgYXdhaXQgcGF1c2VkO1xuICAgICAgY29uc3QgZ2VuID0gcXVldWVbcXVldWUubGVuZ3RoIC0gMV07XG4gICAgICBsZXQgcmVzdWx0ID0gZ2VuLm5leHQoKTtcbiAgICAgIGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCByZXN1bHQ7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgcXVldWUucG9wKCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB2YWx1ZSA9IGF3YWl0IHZhbHVlO1xuICAgICAgfVxuICAgICAgYXdhaXQgc2FuaXRpemUodmFsdWUpO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgc2FuaXRpemU6IGFueSA9IGFzeW5jICh2YWx1ZTogYW55KSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IG5vbmUpIHJldHVybjtcbiAgICBpZiAodmFsdWUgPT09IHN0b3ApIHRocm93IG5ldyBTdG9wKCk7XG5cbiAgICBpZiAoaXNNYW55KHZhbHVlKSkge1xuICAgICAgcHVzaFJlc3VsdHMoZ2V0TWFueVZhbHVlcyh2YWx1ZSkpO1xuICAgICAgcmV0dXJuIHB1bXAoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaW5hbFZhbHVlKHZhbHVlKSkge1xuICAgICAgLy8gYSBmaW5hbCB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkLCBpdCBpcyB0cmVhdGVkIGFzIGEgcmVndWxhciB2YWx1ZVxuICAgICAgdmFsdWUgPSBnZXRGaW5hbFZhbHVlKHZhbHVlKTtcbiAgICAgIHJldHVybiBwcm9jZXNzVmFsdWUodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghc3RyZWFtLnB1c2godmFsdWUpKSB7XG4gICAgICBwYXVzZSgpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc0NodW5rOiBhbnkgPSBhc3luYyAoY2h1bms6IGFueSwgZW5jb2Rpbmc6IGFueSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IGZuKGNodW5rLCBlbmNvZGluZyk7XG4gICAgICBhd2FpdCBwcm9jZXNzVmFsdWUodmFsdWUpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBTdG9wKSB7XG4gICAgICAgIHN0cmVhbS5wdXNoKG51bGwpO1xuICAgICAgICBzdHJlYW0uZGVzdHJveSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHByb2Nlc3NWYWx1ZTogYW55ID0gYXN5bmMgKHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyB0aGVuYWJsZVxuICAgICAgcmV0dXJuIHZhbHVlLnRoZW4oKHZhbHVlOiBhbnkpID0+IHByb2Nlc3NWYWx1ZSh2YWx1ZSkpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLm5leHQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIHB1c2hSZXN1bHRzKHZhbHVlKTtcbiAgICAgIHJldHVybiBwdW1wKCk7XG4gICAgfVxuICAgIHJldHVybiBzYW5pdGl6ZSh2YWx1ZSk7XG4gIH07XG5cbiAgc3RyZWFtID0gbmV3IER1cGxleChcbiAgICBPYmplY3QuYXNzaWduKHsgd3JpdGFibGVPYmplY3RNb2RlOiB0cnVlLCByZWFkYWJsZU9iamVjdE1vZGU6IHRydWUgfSwgdW5kZWZpbmVkLCB7XG4gICAgICB3cml0ZShjaHVuazogYW55LCBlbmNvZGluZzogYW55LCBjYWxsYmFjazogYW55KSB7XG4gICAgICAgIHByb2Nlc3NDaHVuayhjaHVuaywgZW5jb2RpbmcpLnRoZW4oXG4gICAgICAgICAgKCkgPT4gY2FsbGJhY2sobnVsbCksXG4gICAgICAgICAgKGVycm9yOiBhbnkpID0+IGNhbGxiYWNrKGVycm9yKSxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBmaW5hbChjYWxsYmFjazogYW55KSB7XG4gICAgICAgIGlmICghaXNGbHVzaGFibGUoZm4pKSB7XG4gICAgICAgICAgc3RyZWFtLnB1c2gobnVsbCk7XG4gICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3NDaHVuayhub25lLCBudWxsKS50aGVuKFxuICAgICAgICAgICgpID0+IChzdHJlYW0ucHVzaChudWxsKSwgY2FsbGJhY2sobnVsbCkpLFxuICAgICAgICAgIChlcnJvcjogYW55KSA9PiBjYWxsYmFjayhlcnJvciksXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgcmVhZCgpIHtcbiAgICAgICAgcmVzdW1lKCk7XG4gICAgICB9LFxuICAgIH0pLFxuICApO1xuXG4gIHJldHVybiBzdHJlYW07XG59O1xuXG5jb25zdCBwcm9kdWNlU3RyZWFtcyA9IChpdGVtOiBhbnkpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICBpZiAoIWl0ZW0ubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoaXRlbS5sZW5ndGggPT0gMSkgcmV0dXJuIGl0ZW1bMF0gJiYgYXNTdHJlYW0oaXRlbVswXSk7XG4gICAgcmV0dXJuIGFzU3RyZWFtKGdlbiguLi5pdGVtKSk7XG4gIH1cbiAgcmV0dXJuIGl0ZW07XG59O1xuXG5jb25zdCBuZXh0OiBhbnkgPSBhc3luYyBmdW5jdGlvbiogKHZhbHVlOiBhbnksIGZuczogYW55LCBpbmRleDogYW55KSB7XG4gIGZvciAobGV0IGkgPSBpbmRleDsgaSA8PSBmbnMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyB0aGVuYWJsZVxuICAgICAgdmFsdWUgPSBhd2FpdCB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID09PSBub25lKSBicmVhaztcbiAgICBpZiAodmFsdWUgPT09IHN0b3ApIHRocm93IG5ldyBTdG9wKCk7XG4gICAgaWYgKGlzRmluYWxWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIHlpZWxkIGdldEZpbmFsVmFsdWUodmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc01hbnkodmFsdWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBnZXRNYW55VmFsdWVzKHZhbHVlKTtcbiAgICAgIGlmIChpID09IGZucy5sZW5ndGgpIHtcbiAgICAgICAgeWllbGQqIHZhbHVlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdmFsdWVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgeWllbGQqIG5leHQodmFsdWVzW2pdLCBmbnMsIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5uZXh0ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICBmb3IgKDs7KSB7XG4gICAgICAgIGxldCBkYXRhID0gdmFsdWUubmV4dCgpO1xuICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgZGF0YS50aGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGRhdGEgPSBhd2FpdCBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLmRvbmUpIGJyZWFrO1xuICAgICAgICBpZiAoaSA9PSBmbnMubGVuZ3RoKSB7XG4gICAgICAgICAgeWllbGQgZGF0YS52YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB5aWVsZCogbmV4dChkYXRhLnZhbHVlLCBmbnMsIGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGkgPT0gZm5zLmxlbmd0aCkge1xuICAgICAgeWllbGQgdmFsdWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY29uc3QgZiA9IGZuc1tpXTtcbiAgICB2YWx1ZSA9IGYodmFsdWUpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuID0gKC4uLmZuczogYW55KSA9PiB7XG4gIGZucyA9IGZuc1xuICAgIC5maWx0ZXIoKGZuOiBhbnkpID0+IGZuKVxuICAgIC5mbGF0KEluZmluaXR5KVxuICAgIC5tYXAoKGZuOiBhbnkpID0+IChpc0Z1bmN0aW9uTGlzdChmbikgPyBnZXRGdW5jdGlvbkxpc3QoZm4pIDogZm4pKVxuICAgIC5mbGF0KEluZmluaXR5KTtcbiAgaWYgKCFmbnMubGVuZ3RoKSB7XG4gICAgZm5zID0gWyh4OiBhbnkpID0+IHhdO1xuICB9XG4gIGxldCBmbHVzaGVkID0gZmFsc2U7XG4gIGxldCBnID0gYXN5bmMgZnVuY3Rpb24qICh2YWx1ZTogYW55KSB7XG4gICAgaWYgKGZsdXNoZWQpIHRocm93IEVycm9yKFwiQ2FsbCB0byBhIGZsdXNoZWQgcGlwZS5cIik7XG4gICAgaWYgKHZhbHVlICE9PSBub25lKSB7XG4gICAgICB5aWVsZCogbmV4dCh2YWx1ZSwgZm5zLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmx1c2hlZCA9IHRydWU7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBjb25zdCBmID0gZm5zW2ldO1xuICAgICAgICBpZiAoaXNGbHVzaGFibGUoZikpIHtcbiAgICAgICAgICB5aWVsZCogbmV4dChmKG5vbmUpLCBmbnMsIGkgKyAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgY29uc3QgbmVlZFRvRmx1c2ggPSBmbnMuc29tZSgoZm46IGFueSkgPT4gaXNGbHVzaGFibGUoZm4pKTtcbiAgaWYgKG5lZWRUb0ZsdXNoKSBnID0gZmx1c2hhYmxlKGcpO1xuICByZXR1cm4gc2V0RnVuY3Rpb25MaXN0KGcsIGZucyk7XG59O1xuXG5jb25zdCB3cml0ZSA9IChpbnB1dDogYW55LCBjaHVuazogYW55LCBlbmNvZGluZzogYW55LCBjYWxsYmFjazogYW55KSA9PiB7XG4gIGxldCBlcnJvcjogYW55ID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBpbnB1dC53cml0ZShjaHVuaywgZW5jb2RpbmcsIChlOiBhbnkpID0+IGNhbGxiYWNrKGUgfHwgZXJyb3IpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGVycm9yID0gZTtcbiAgfVxufTtcblxuY29uc3QgZmluYWwgPSAoaW5wdXQ6IGFueSwgY2FsbGJhY2s6IGFueSkgPT4ge1xuICBsZXQgZXJyb3I6IGFueSA9IG51bGw7XG4gIHRyeSB7XG4gICAgaW5wdXQuZW5kKG51bGwsIG51bGwsIChlOiBhbnkpID0+IGNhbGxiYWNrKGUgfHwgZXJyb3IpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGVycm9yID0gZTtcbiAgfVxufTtcblxuY29uc3QgcmVhZCA9IChvdXRwdXQ6IGFueSkgPT4ge1xuICBvdXRwdXQucmVzdW1lKCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGFpbihmbnM6IGFueSkge1xuICBmbnMgPSBmbnMuZmxhdChJbmZpbml0eSkuZmlsdGVyKChmbjogYW55KSA9PiBmbik7XG5cbiAgY29uc3Qgc3RyZWFtcyA9IGZuc1xuICAgICAgLm1hcCgoZm46IGFueSkgPT4gKGlzRnVuY3Rpb25MaXN0KGZuKSA/IGdldEZ1bmN0aW9uTGlzdChmbikgOiBmbikpXG4gICAgICAuZmxhdChJbmZpbml0eSlcbiAgICAgIC5yZWR1Y2UoZ3JvdXBGdW5jdGlvbnMsIFtdKVxuICAgICAgLm1hcChwcm9kdWNlU3RyZWFtcylcbiAgICAgIC5maWx0ZXIoKHM6IGFueSkgPT4gcyksXG4gICAgaW5wdXQgPSBzdHJlYW1zWzBdLFxuICAgIG91dHB1dCA9IHN0cmVhbXMucmVkdWNlKChvdXRwdXQ6IGFueSwgaXRlbTogYW55KSA9PiAob3V0cHV0ICYmIG91dHB1dC5waXBlKGl0ZW0pKSB8fCBpdGVtKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XG4gIGxldCBzdHJlYW06IER1cGxleDsgLy8gd2lsbCBiZSBhc3NpZ25lZCBsYXRlclxuXG4gIGxldCB3cml0ZU1ldGhvZCA9IChjaHVuazogYW55LCBlbmNvZGluZzogYW55LCBjYWxsYmFjazogYW55KSA9PiB3cml0ZShpbnB1dCwgY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjayksXG4gICAgZmluYWxNZXRob2QgPSAoY2FsbGJhY2s6IGFueSkgPT4gZmluYWwoaW5wdXQsIGNhbGxiYWNrKSxcbiAgICByZWFkTWV0aG9kID0gKCkgPT4gcmVhZChvdXRwdXQpO1xuXG4gIGlmICghaXNXcml0YWJsZU5vZGVTdHJlYW0oaW5wdXQpKSB7XG4gICAgd3JpdGVNZXRob2QgPSAoXzEsIF8yLCBjYWxsYmFjaykgPT4gY2FsbGJhY2sobnVsbCk7XG4gICAgZmluYWxNZXRob2QgPSAoY2FsbGJhY2spID0+IGNhbGxiYWNrKG51bGwpO1xuICAgIGlucHV0Lm9uKFwiZW5kXCIsICgpID0+IHN0cmVhbS5lbmQoKSk7XG4gIH1cblxuICBpZiAoaXNSZWFkYWJsZU5vZGVTdHJlYW0ob3V0cHV0KSkge1xuICAgIG91dHB1dC5vbihcImRhdGFcIiwgKGNodW5rOiBhbnkpID0+ICFzdHJlYW0ucHVzaChjaHVuaykgJiYgb3V0cHV0LnBhdXNlKCkpO1xuICAgIG91dHB1dC5vbihcImVuZFwiLCAoKSA9PiBzdHJlYW0ucHVzaChudWxsKSk7XG4gIH0gZWxzZSB7XG4gICAgcmVhZE1ldGhvZCA9ICgpID0+IHt9OyAvLyBub3BcbiAgICBvdXRwdXQub24oXCJmaW5pc2hcIiwgKCkgPT4gc3RyZWFtLnB1c2gobnVsbCkpO1xuICB9XG5cbiAgc3RyZWFtID0gbmV3IER1cGxleChcbiAgICBPYmplY3QuYXNzaWduKFxuICAgICAgeyB3cml0YWJsZU9iamVjdE1vZGU6IHRydWUsIHJlYWRhYmxlT2JqZWN0TW9kZTogdHJ1ZSB9LFxuICAgICAge1xuICAgICAgICByZWFkYWJsZTogaXNSZWFkYWJsZU5vZGVTdHJlYW0ob3V0cHV0KSxcbiAgICAgICAgd3JpdGFibGU6IGlzV3JpdGFibGVOb2RlU3RyZWFtKGlucHV0KSxcbiAgICAgICAgd3JpdGU6IHdyaXRlTWV0aG9kLFxuICAgICAgICBmaW5hbDogZmluYWxNZXRob2QsXG4gICAgICAgIHJlYWQ6IHJlYWRNZXRob2QsXG4gICAgICB9LFxuICAgICksXG4gICk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgc3RyZWFtLnN0cmVhbXMgPSBzdHJlYW1zO1xuICAvLyBAdHMtaWdub3JlXG4gIHN0cmVhbS5pbnB1dCA9IGlucHV0O1xuICAvLyBAdHMtaWdub3JlXG4gIHN0cmVhbS5vdXRwdXQgPSBvdXRwdXQ7XG5cbiAgaWYgKCFpc1JlYWRhYmxlTm9kZVN0cmVhbShvdXRwdXQpKSB7XG4gICAgc3RyZWFtLnJlc3VtZSgpO1xuICB9XG5cbiAgLy8gY29ubmVjdCBldmVudHNcbiAgc3RyZWFtcy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IGl0ZW0ub24oXCJlcnJvclwiLCAoZXJyb3I6IGFueSkgPT4gc3RyZWFtLmVtaXQoXCJlcnJvclwiLCBlcnJvcikpKTtcblxuICByZXR1cm4gc3RyZWFtO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cbmltcG9ydCB7IGZsdXNoYWJsZSwgZ2VuLCBtYW55LCBub25lLCBjb21iaW5lTWFueU11dCB9IGZyb20gXCIuL3N0cmVhbS1jaGFpblwiO1xuaW1wb3J0IHsgU3RyaW5nRGVjb2RlciB9IGZyb20gXCJub2RlOnN0cmluZ19kZWNvZGVyXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJub2RlOmV2ZW50c1wiO1xuXG5jb25zdCBmaXhVdGY4U3RyZWFtID0gKCkgPT4ge1xuICBjb25zdCBzdHJpbmdEZWNvZGVyID0gbmV3IFN0cmluZ0RlY29kZXIoKTtcbiAgbGV0IGlucHV0ID0gXCJcIjtcbiAgcmV0dXJuIGZsdXNoYWJsZSgoY2h1bms6IGFueSkgPT4ge1xuICAgIGlmIChjaHVuayA9PT0gbm9uZSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gaW5wdXQgKyBzdHJpbmdEZWNvZGVyLmVuZCgpO1xuICAgICAgaW5wdXQgPSBcIlwiO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjaHVuayA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBpZiAoIWlucHV0KSByZXR1cm4gY2h1bms7XG4gICAgICBjb25zdCByZXN1bHQgPSBpbnB1dCArIGNodW5rO1xuICAgICAgaW5wdXQgPSBcIlwiO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaWYgKGNodW5rIGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBpbnB1dCArIHN0cmluZ0RlY29kZXIud3JpdGUoY2h1bmspO1xuICAgICAgaW5wdXQgPSBcIlwiO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGEgc3RyaW5nIG9yIGEgQnVmZmVyXCIpO1xuICB9KTtcbn07XG5cbmNvbnN0IHBhdHRlcm5zID0ge1xuICB2YWx1ZTE6IC9bXFxcIlxce1xcW1xcXVxcLVxcZF18dHJ1ZVxcYnxmYWxzZVxcYnxudWxsXFxifFxcc3sxLDI1Nn0veSxcbiAgc3RyaW5nOiAvW15cXHgwMC1cXHgxZlxcXCJcXFxcXXsxLDI1Nn18XFxcXFtiZm5ydFxcXCJcXFxcXFwvXXxcXFxcdVtcXGRhLWZBLUZdezR9fFxcXCIveSxcbiAga2V5MTogL1tcXFwiXFx9XXxcXHN7MSwyNTZ9L3ksXG4gIGNvbG9uOiAvXFw6fFxcc3sxLDI1Nn0veSxcbiAgY29tbWE6IC9bXFwsXFxdXFx9XXxcXHN7MSwyNTZ9L3ksXG4gIHdzOiAvXFxzezEsMjU2fS95LFxuICBudW1iZXJTdGFydDogL1xcZC95LFxuICBudW1iZXJEaWdpdDogL1xcZHswLDI1Nn0veSxcbiAgbnVtYmVyRnJhY3Rpb246IC9bXFwuZUVdL3ksXG4gIG51bWJlckV4cG9uZW50OiAvW2VFXS95LFxuICBudW1iZXJFeHBTaWduOiAvWy0rXS95LFxufTtcbmNvbnN0IE1BWF9QQVRURVJOX1NJWkUgPSAxNjtcblxuY29uc3QgdmFsdWVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0geyB0cnVlOiB0cnVlLCBmYWxzZTogZmFsc2UsIG51bGw6IG51bGwgfSxcbiAgZXhwZWN0ZWQ6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7IG9iamVjdDogXCJvYmplY3RTdG9wXCIsIGFycmF5OiBcImFycmF5U3RvcFwiLCBcIlwiOiBcImRvbmVcIiB9O1xuXG4vLyBsb25nIGhleGFkZWNpbWFsIGNvZGVzOiBcXHVYWFhYXG5jb25zdCBmcm9tSGV4ID0gKHM6IHN0cmluZykgPT4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChzLnNsaWNlKDIpLCAxNikpO1xuXG4vLyBzaG9ydCBjb2RlczogXFxiIFxcZiBcXG4gXFxyIFxcdCBcXFwiIFxcXFwgXFwvXG5jb25zdCBjb2RlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgYjogXCJcXGJcIixcbiAgZjogXCJcXGZcIixcbiAgbjogXCJcXG5cIixcbiAgcjogXCJcXHJcIixcbiAgdDogXCJcXHRcIixcbiAgJ1wiJzogJ1wiJyxcbiAgXCJcXFxcXCI6IFwiXFxcXFwiLFxuICBcIi9cIjogXCIvXCIsXG59O1xuXG5jb25zdCBqc29uUGFyc2VyID0gKG9wdGlvbnM/OiBhbnkpID0+IHtcbiAgbGV0IHBhY2tLZXlzID0gdHJ1ZSxcbiAgICBwYWNrU3RyaW5ncyA9IHRydWUsXG4gICAgcGFja051bWJlcnMgPSB0cnVlLFxuICAgIHN0cmVhbUtleXMgPSB0cnVlLFxuICAgIHN0cmVhbVN0cmluZ3MgPSB0cnVlLFxuICAgIHN0cmVhbU51bWJlcnMgPSB0cnVlLFxuICAgIGpzb25TdHJlYW1pbmcgPSBmYWxzZTtcblxuICBpZiAob3B0aW9ucykge1xuICAgIFwicGFja1ZhbHVlc1wiIGluIG9wdGlvbnMgJiYgKHBhY2tLZXlzID0gcGFja1N0cmluZ3MgPSBwYWNrTnVtYmVycyA9IG9wdGlvbnMucGFja1ZhbHVlcyk7XG4gICAgXCJwYWNrS2V5c1wiIGluIG9wdGlvbnMgJiYgKHBhY2tLZXlzID0gb3B0aW9ucy5wYWNrS2V5cyk7XG4gICAgXCJwYWNrU3RyaW5nc1wiIGluIG9wdGlvbnMgJiYgKHBhY2tTdHJpbmdzID0gb3B0aW9ucy5wYWNrU3RyaW5ncyk7XG4gICAgXCJwYWNrTnVtYmVyc1wiIGluIG9wdGlvbnMgJiYgKHBhY2tOdW1iZXJzID0gb3B0aW9ucy5wYWNrTnVtYmVycyk7XG4gICAgXCJzdHJlYW1WYWx1ZXNcIiBpbiBvcHRpb25zICYmIChzdHJlYW1LZXlzID0gc3RyZWFtU3RyaW5ncyA9IHN0cmVhbU51bWJlcnMgPSBvcHRpb25zLnN0cmVhbVZhbHVlcyk7XG4gICAgXCJzdHJlYW1LZXlzXCIgaW4gb3B0aW9ucyAmJiAoc3RyZWFtS2V5cyA9IG9wdGlvbnMuc3RyZWFtS2V5cyk7XG4gICAgXCJzdHJlYW1TdHJpbmdzXCIgaW4gb3B0aW9ucyAmJiAoc3RyZWFtU3RyaW5ncyA9IG9wdGlvbnMuc3RyZWFtU3RyaW5ncyk7XG4gICAgXCJzdHJlYW1OdW1iZXJzXCIgaW4gb3B0aW9ucyAmJiAoc3RyZWFtTnVtYmVycyA9IG9wdGlvbnMuc3RyZWFtTnVtYmVycyk7XG4gICAganNvblN0cmVhbWluZyA9IG9wdGlvbnMuanNvblN0cmVhbWluZztcbiAgfVxuXG4gICFwYWNrS2V5cyAmJiAoc3RyZWFtS2V5cyA9IHRydWUpO1xuICAhcGFja1N0cmluZ3MgJiYgKHN0cmVhbVN0cmluZ3MgPSB0cnVlKTtcbiAgIXBhY2tOdW1iZXJzICYmIChzdHJlYW1OdW1iZXJzID0gdHJ1ZSk7XG5cbiAgbGV0IGRvbmUgPSBmYWxzZSxcbiAgICBleHBlY3QgPSBqc29uU3RyZWFtaW5nID8gXCJkb25lXCIgOiBcInZhbHVlXCIsXG4gICAgcGFyZW50ID0gXCJcIixcbiAgICBvcGVuTnVtYmVyID0gZmFsc2UsXG4gICAgYWNjdW11bGF0b3IgPSBcIlwiLFxuICAgIGJ1ZmZlciA9IFwiXCI7XG5cbiAgY29uc3Qgc3RhY2s6IGFueVtdID0gW107XG5cbiAgcmV0dXJuIGZsdXNoYWJsZSgoYnVmOiBhbnkpID0+IHtcbiAgICBjb25zdCB0b2tlbnM6IGFueVtdID0gW107XG5cbiAgICBpZiAoYnVmID09PSBub25lKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyICs9IGJ1ZjtcbiAgICB9XG5cbiAgICBsZXQgbWF0Y2g6IGFueTtcbiAgICBsZXQgdmFsdWU6IGFueTtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgbWFpbjogZm9yICg7Oykge1xuICAgICAgc3dpdGNoIChleHBlY3QpIHtcbiAgICAgICAgY2FzZSBcInZhbHVlMVwiOlxuICAgICAgICBjYXNlIFwidmFsdWVcIjpcbiAgICAgICAgICBwYXR0ZXJucy52YWx1ZTEubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy52YWx1ZTEuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChkb25lIHx8IGluZGV4ICsgTUFYX1BBVFRFUk5fU0laRSA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYSB2YWx1ZVwiKTtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGhhcyBleHBlY3RlZCBhIHZhbHVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbVN0cmluZ3MpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydFN0cmluZ1wiIH0pO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ7XCI6XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydE9iamVjdFwiIH0pO1xuICAgICAgICAgICAgICBzdGFjay5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgIHBhcmVudCA9IFwib2JqZWN0XCI7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwia2V5MVwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJbXCI6XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydEFycmF5XCIgfSk7XG4gICAgICAgICAgICAgIHN0YWNrLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgcGFyZW50ID0gXCJhcnJheVwiO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcInZhbHVlMVwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJdXCI6XG4gICAgICAgICAgICAgIGlmIChleHBlY3QgIT09IFwidmFsdWUxXCIpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IHVuZXhwZWN0ZWQgdG9rZW4gJ10nXCIpO1xuICAgICAgICAgICAgICBpZiAob3Blbk51bWJlcikge1xuICAgICAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kTnVtYmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgb3Blbk51bWJlciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChwYWNrTnVtYmVycykge1xuICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlclZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZEFycmF5XCIgfSk7XG4gICAgICAgICAgICAgIHBhcmVudCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCItXCI6XG4gICAgICAgICAgICAgIG9wZW5OdW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykge1xuICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydE51bWJlclwiIH0sIHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogXCItXCIgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yID0gXCItXCIpO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlclN0YXJ0XCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjBcIjpcbiAgICAgICAgICAgICAgb3Blbk51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0TnVtYmVyXCIgfSwgeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiBcIjBcIiB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgPSBcIjBcIik7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRnJhY3Rpb25cIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMVwiOlxuICAgICAgICAgICAgY2FzZSBcIjJcIjpcbiAgICAgICAgICAgIGNhc2UgXCIzXCI6XG4gICAgICAgICAgICBjYXNlIFwiNFwiOlxuICAgICAgICAgICAgY2FzZSBcIjVcIjpcbiAgICAgICAgICAgIGNhc2UgXCI2XCI6XG4gICAgICAgICAgICBjYXNlIFwiN1wiOlxuICAgICAgICAgICAgY2FzZSBcIjhcIjpcbiAgICAgICAgICAgIGNhc2UgXCI5XCI6XG4gICAgICAgICAgICAgIG9wZW5OdW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykge1xuICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydE51bWJlclwiIH0sIHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yID0gdmFsdWUpO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckRpZ2l0XCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRydWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJmYWxzZVwiOlxuICAgICAgICAgICAgY2FzZSBcIm51bGxcIjpcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBpbmRleCA9PT0gdmFsdWUubGVuZ3RoICYmICFkb25lKSBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogdmFsdWUgKyBcIlZhbHVlXCIsIHZhbHVlOiB2YWx1ZXNbdmFsdWVdIH0pO1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIC8vIGRlZmF1bHQ6IC8vIHdzXG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImtleVZhbFwiOlxuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgcGF0dGVybnMuc3RyaW5nLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMuc3RyaW5nLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoICYmIChkb25lIHx8IGJ1ZmZlci5sZW5ndGggLSBpbmRleCA+PSA2KSlcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXNjYXBlZCBjaGFyYWN0ZXJzXCIpO1xuICAgICAgICAgICAgaWYgKGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBoYXMgZXhwZWN0ZWQgYSBzdHJpbmcgdmFsdWVcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnXCInKSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ID09PSBcImtleVZhbFwiKSB7XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1LZXlzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kS2V5XCIgfSk7XG4gICAgICAgICAgICAgIGlmIChwYWNrS2V5cykge1xuICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJrZXlWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwiY29sb25cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1TdHJpbmdzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kU3RyaW5nXCIgfSk7XG4gICAgICAgICAgICAgIGlmIChwYWNrU3RyaW5ncykge1xuICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdHJpbmdWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZS5sZW5ndGggPiAxICYmIHZhbHVlLmNoYXJBdCgwKSA9PT0gXCJcXFxcXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHQgPSB2YWx1ZS5sZW5ndGggPT0gMiA/IGNvZGVzW3ZhbHVlLmNoYXJBdCgxKV0gOiBmcm9tSGV4KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChleHBlY3QgPT09IFwia2V5VmFsXCIgPyBzdHJlYW1LZXlzIDogc3RyZWFtU3RyaW5ncykge1xuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RyaW5nQ2h1bmtcIiwgdmFsdWU6IHQgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhwZWN0ID09PSBcImtleVZhbFwiID8gcGFja0tleXMgOiBwYWNrU3RyaW5ncykge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvciArPSB0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ID09PSBcImtleVZhbFwiID8gc3RyZWFtS2V5cyA6IHN0cmVhbVN0cmluZ3MpIHtcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0cmluZ0NodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChleHBlY3QgPT09IFwia2V5VmFsXCIgPyBwYWNrS2V5cyA6IHBhY2tTdHJpbmdzKSB7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yICs9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJrZXkxXCI6XG4gICAgICAgIGNhc2UgXCJrZXlcIjpcbiAgICAgICAgICBwYXR0ZXJucy5rZXkxLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMua2V5MS5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhbiBvYmplY3Qga2V5XCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgaWYgKHN0cmVhbUtleXMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydEtleVwiIH0pO1xuICAgICAgICAgICAgZXhwZWN0ID0gXCJrZXlWYWxcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIn1cIikge1xuICAgICAgICAgICAgaWYgKGV4cGVjdCAhPT0gXCJrZXkxXCIpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IHVuZXhwZWN0ZWQgdG9rZW4gJ30nXCIpO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZE9iamVjdFwiIH0pO1xuICAgICAgICAgICAgcGFyZW50ID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjb2xvblwiOlxuICAgICAgICAgIHBhdHRlcm5zLmNvbG9uLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMuY29sb24uZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgJzonXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIHZhbHVlID09PSBcIjpcIiAmJiAoZXhwZWN0ID0gXCJ2YWx1ZVwiKTtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhcnJheVN0b3BcIjpcbiAgICAgICAgY2FzZSBcIm9iamVjdFN0b3BcIjpcbiAgICAgICAgICBwYXR0ZXJucy5jb21tYS5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLmNvbW1hLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkICcsJ1wiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9wZW5OdW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kTnVtYmVyXCIgfSk7XG4gICAgICAgICAgICBvcGVuTnVtYmVyID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocGFja051bWJlcnMpIHtcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlclZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCIsXCIpIHtcbiAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdCA9PT0gXCJhcnJheVN0b3BcIiA/IFwidmFsdWVcIiA6IFwia2V5XCI7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ9XCIgfHwgdmFsdWUgPT09IFwiXVwiKSB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwifVwiID8gZXhwZWN0ID09PSBcImFycmF5U3RvcFwiIDogZXhwZWN0ICE9PSBcImFycmF5U3RvcFwiKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkICdcIiArIChleHBlY3QgPT09IFwiYXJyYXlTdG9wXCIgPyBcIl1cIiA6IFwifVwiKSArIFwiJ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogdmFsdWUgPT09IFwifVwiID8gXCJlbmRPYmplY3RcIiA6IFwiZW5kQXJyYXlcIiB9KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyBudW1iZXIgY2h1bmtzXG4gICAgICAgIGNhc2UgXCJudW1iZXJTdGFydFwiOiAvLyBbMC05XVxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlclN0YXJ0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyU3RhcnQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYSBzdGFydGluZyBkaWdpdFwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IHZhbHVlID09PSBcIjBcIiA/IFwibnVtYmVyRnJhY3Rpb25cIiA6IFwibnVtYmVyRGlnaXRcIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJEaWdpdFwiOiAvLyBbMC05XSpcbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJEaWdpdC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckRpZ2l0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGEgZGlnaXRcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJGcmFjdGlvblwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckZyYWN0aW9uXCI6IC8vIFtcXC5lRV0/XG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRnJhY3Rpb24ubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJGcmFjdGlvbi5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gdmFsdWUgPT09IFwiLlwiID8gXCJudW1iZXJGcmFjU3RhcnRcIiA6IFwibnVtYmVyRXhwU2lnblwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckZyYWNTdGFydFwiOiAvLyBbMC05XVxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlclN0YXJ0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyU3RhcnQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSlcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYSBmcmFjdGlvbmFsIHBhcnQgb2YgYSBudW1iZXJcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckZyYWNEaWdpdFwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckZyYWNEaWdpdFwiOiAvLyBbMC05XSpcbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJEaWdpdC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckRpZ2l0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRXhwb25lbnRcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJFeHBvbmVudFwiOiAvLyBbZUVdP1xuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckV4cG9uZW50Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRXhwb25lbnQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBcImRvbmVcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckV4cFNpZ25cIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJFeHBTaWduXCI6IC8vIFstK10/XG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRXhwU2lnbi5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckV4cFNpZ24uZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJFeHBTdGFydFwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgaGFzIGV4cGVjdGVkIGFuIGV4cG9uZW50IHZhbHVlIG9mIGEgbnVtYmVyXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJFeHBTdGFydFwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckV4cFN0YXJ0XCI6IC8vIFswLTldXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyU3RhcnQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJTdGFydC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhbiBleHBvbmVudCBwYXJ0IG9mIGEgbnVtYmVyXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJFeHBEaWdpdFwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckV4cERpZ2l0XCI6IC8vIFswLTldKlxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckRpZ2l0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRGlnaXQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJkb25lXCI6XG4gICAgICAgICAgcGF0dGVybnMud3MubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy53cy5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBpZiAoanNvblN0cmVhbWluZykge1xuICAgICAgICAgICAgICAgIGV4cGVjdCA9IFwidmFsdWVcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiB1bmV4cGVjdGVkIGNoYXJhY3RlcnNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKG9wZW5OdW1iZXIpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kTnVtYmVyXCIgfSk7XG4gICAgICAgICAgICBvcGVuTnVtYmVyID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocGFja051bWJlcnMpIHtcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlclZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChkb25lICYmIG9wZW5OdW1iZXIpIHtcbiAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kTnVtYmVyXCIgfSk7XG4gICAgICBvcGVuTnVtYmVyID0gZmFsc2U7XG4gICAgICBpZiAocGFja051bWJlcnMpIHtcbiAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlclZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBidWZmZXIgPSBidWZmZXIuc2xpY2UoaW5kZXgpO1xuICAgIHJldHVybiB0b2tlbnMubGVuZ3RoID8gbWFueSh0b2tlbnMpIDogbm9uZTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgcGFyc2VyID0gKG9wdGlvbnM/OiBhbnkpID0+IGdlbihmaXhVdGY4U3RyZWFtKCksIGpzb25QYXJzZXIob3B0aW9ucykpO1xuXG5jb25zdCB3aXRoUGFyc2VyID0gKGZuOiBhbnksIG9wdGlvbnM/OiBhbnkpID0+IGdlbihwYXJzZXIob3B0aW9ucyksIGZuKG9wdGlvbnMpKTtcblxuY29uc3QgY2hlY2thYmxlVG9rZW5zID0ge1xuICAgIHN0YXJ0T2JqZWN0OiAxLFxuICAgIHN0YXJ0QXJyYXk6IDEsXG4gICAgc3RhcnRTdHJpbmc6IDEsXG4gICAgc3RhcnROdW1iZXI6IDEsXG4gICAgbnVsbFZhbHVlOiAxLFxuICAgIHRydWVWYWx1ZTogMSxcbiAgICBmYWxzZVZhbHVlOiAxLFxuICAgIHN0cmluZ1ZhbHVlOiAxLFxuICAgIG51bWJlclZhbHVlOiAxLFxuICB9LFxuICBzdG9wVG9rZW5zID0ge1xuICAgIHN0YXJ0T2JqZWN0OiBcImVuZE9iamVjdFwiLFxuICAgIHN0YXJ0QXJyYXk6IFwiZW5kQXJyYXlcIixcbiAgICBzdGFydFN0cmluZzogXCJlbmRTdHJpbmdcIixcbiAgICBzdGFydE51bWJlcjogXCJlbmROdW1iZXJcIixcbiAgfSxcbiAgb3B0aW9uYWxUb2tlbnMgPSB7IGVuZFN0cmluZzogXCJzdHJpbmdWYWx1ZVwiLCBlbmROdW1iZXI6IFwibnVtYmVyVmFsdWVcIiB9O1xuXG5jb25zdCBkZWZhdWx0RmlsdGVyID0gKF9zdGFjazogc3RyaW5nW10sIF9hOiBhbnkpID0+IHRydWU7XG5cbmNvbnN0IHN0cmluZ0ZpbHRlciA9IChzdHJpbmc6IHN0cmluZywgc2VwYXJhdG9yOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc3RyaW5nV2l0aFNlcGFyYXRvciA9IHN0cmluZyArIHNlcGFyYXRvcjtcbiAgcmV0dXJuIChzdGFjazogc3RyaW5nW10sIF9hOiBhbnkpID0+IHtcbiAgICBjb25zdCBwYXRoID0gc3RhY2suam9pbihzZXBhcmF0b3IpO1xuICAgIHJldHVybiBwYXRoID09PSBzdHJpbmcgfHwgcGF0aC5zdGFydHNXaXRoKHN0cmluZ1dpdGhTZXBhcmF0b3IpO1xuICB9O1xufTtcblxuY29uc3QgcmVnRXhwRmlsdGVyID0gKHJlZ0V4cDogUmVnRXhwLCBzZXBhcmF0b3I6IHN0cmluZykgPT4ge1xuICByZXR1cm4gKHN0YWNrOiBzdHJpbmdbXSwgX2E6IGFueSkgPT4gcmVnRXhwLnRlc3Qoc3RhY2suam9pbihzZXBhcmF0b3IpKTtcbn07XG5cbmNvbnN0IGZpbHRlckJhc2UgPVxuICAoe1xuICAgIHNwZWNpYWxBY3Rpb24gPSBcImFjY2VwdFwiLFxuICAgIGRlZmF1bHRBY3Rpb24gPSBcImlnbm9yZVwiLFxuICAgIG5vbkNoZWNrYWJsZUFjdGlvbiA9IFwicHJvY2Vzcy1rZXlcIixcbiAgICB0cmFuc2l0aW9uID0gdW5kZWZpbmVkIGFzIGFueSxcbiAgfSA9IHt9KSA9PlxuICAob3B0aW9uczogYW55KSA9PiB7XG4gICAgY29uc3Qgb25jZSA9IG9wdGlvbnM/Lm9uY2UsXG4gICAgICBzZXBhcmF0b3IgPSBvcHRpb25zPy5wYXRoU2VwYXJhdG9yIHx8IFwiLlwiO1xuICAgIGxldCBmaWx0ZXIgPSBkZWZhdWx0RmlsdGVyLFxuICAgICAgc3RyZWFtS2V5cyA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICBmaWx0ZXIgPSBzdHJpbmdGaWx0ZXIob3B0aW9ucy5maWx0ZXIsIHNlcGFyYXRvcik7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMuZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIGZpbHRlciA9IHJlZ0V4cEZpbHRlcihvcHRpb25zLmZpbHRlciwgc2VwYXJhdG9yKTtcbiAgICAgIH1cbiAgICAgIGlmIChcInN0cmVhbVZhbHVlc1wiIGluIG9wdGlvbnMpIHN0cmVhbUtleXMgPSBvcHRpb25zLnN0cmVhbVZhbHVlcztcbiAgICAgIGlmIChcInN0cmVhbUtleXNcIiBpbiBvcHRpb25zKSBzdHJlYW1LZXlzID0gb3B0aW9ucy5zdHJlYW1LZXlzO1xuICAgIH1cbiAgICBjb25zdCBzYW5pdGl6ZWRPcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucywgeyBmaWx0ZXIsIHN0cmVhbUtleXMsIHNlcGFyYXRvciB9KTtcbiAgICBsZXQgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgY29uc3Qgc3RhY2s6IGFueVtdID0gW107XG4gICAgbGV0IGRlcHRoID0gMCxcbiAgICAgIHByZXZpb3VzVG9rZW4gPSBcIlwiLFxuICAgICAgZW5kVG9rZW4gPSBcIlwiLFxuICAgICAgb3B0aW9uYWxUb2tlbiA9IFwiXCIsXG4gICAgICBzdGFydFRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICByZXR1cm4gZmx1c2hhYmxlKChjaHVuaykgPT4ge1xuICAgICAgLy8gdGhlIGZsdXNoXG4gICAgICBpZiAoY2h1bmsgPT09IG5vbmUpIHJldHVybiB0cmFuc2l0aW9uID8gdHJhbnNpdGlvbihbXSwgbnVsbCwgXCJmbHVzaFwiLCBzYW5pdGl6ZWRPcHRpb25zKSA6IG5vbmU7XG5cbiAgICAgIC8vIHByb2Nlc3MgdGhlIG9wdGlvbmFsIHZhbHVlIHRva2VuICh1bmZpbmlzaGVkKVxuICAgICAgaWYgKG9wdGlvbmFsVG9rZW4pIHtcbiAgICAgICAgaWYgKG9wdGlvbmFsVG9rZW4gPT09IGNodW5rLm5hbWUpIHtcbiAgICAgICAgICBsZXQgcmV0dXJuVG9rZW4gPSBub25lO1xuICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwcm9jZXNzLWtleVwiOlxuICAgICAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXSA9IGNodW5rLnZhbHVlO1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWNjZXB0LXZhbHVlXCI6XG4gICAgICAgICAgICAgIHJldHVyblRva2VuID0gY2h1bms7XG4gICAgICAgICAgICAgIHN0YXRlID0gb25jZSA/IFwicGFzc1wiIDogXCJjaGVja1wiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHN0YXRlID0gb25jZSA/IFwiYWxsXCIgOiBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcHRpb25hbFRva2VuID0gXCJcIjtcbiAgICAgICAgICByZXR1cm4gcmV0dXJuVG9rZW47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9uYWxUb2tlbiA9IFwiXCI7XG4gICAgICAgIHN0YXRlID0gb25jZSAmJiBzdGF0ZSAhPT0gXCJwcm9jZXNzLWtleVwiID8gXCJwYXNzXCIgOiBcImNoZWNrXCI7XG4gICAgICB9XG5cbiAgICAgIGxldCByZXR1cm5Ub2tlbjogYW55ID0gbm9uZTtcblxuICAgICAgcmVjaGVjazogZm9yICg7Oykge1xuICAgICAgICAvLyBhY2NlcHQvcmVqZWN0IHRva2Vuc1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgY2FzZSBcInByb2Nlc3Mta2V5XCI6XG4gICAgICAgICAgICBpZiAoY2h1bmsubmFtZSA9PT0gXCJlbmRLZXlcIikgb3B0aW9uYWxUb2tlbiA9IFwia2V5VmFsdWVcIjtcbiAgICAgICAgICAgIHJldHVybiBub25lO1xuICAgICAgICAgIGNhc2UgXCJwYXNzXCI6XG4gICAgICAgICAgICByZXR1cm4gbm9uZTtcbiAgICAgICAgICBjYXNlIFwiYWxsXCI6XG4gICAgICAgICAgICByZXR1cm4gY2h1bms7XG4gICAgICAgICAgY2FzZSBcImFjY2VwdFwiOlxuICAgICAgICAgIGNhc2UgXCJyZWplY3RcIjpcbiAgICAgICAgICAgIGlmIChzdGFydFRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgc3RhcnRUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVyblRva2VuID0gdHJhbnNpdGlvbihzdGFjaywgY2h1bmssIHN0YXRlLCBzYW5pdGl6ZWRPcHRpb25zKSB8fCBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3dpdGNoIChjaHVuay5uYW1lKSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJzdGFydE9iamVjdFwiOlxuICAgICAgICAgICAgICBjYXNlIFwic3RhcnRBcnJheVwiOlxuICAgICAgICAgICAgICAgICsrZGVwdGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRPYmplY3RcIjpcbiAgICAgICAgICAgICAgY2FzZSBcImVuZEFycmF5XCI6XG4gICAgICAgICAgICAgICAgLS1kZXB0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJhY2NlcHRcIikge1xuICAgICAgICAgICAgICByZXR1cm5Ub2tlbiA9IGNvbWJpbmVNYW55TXV0KHJldHVyblRva2VuLCBjaHVuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWRlcHRoKSB7XG4gICAgICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZSA9PT0gXCJhY2NlcHRcIiA/IFwicGFzc1wiIDogXCJhbGxcIjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblRva2VuO1xuICAgICAgICAgIGNhc2UgXCJhY2NlcHQtdmFsdWVcIjpcbiAgICAgICAgICBjYXNlIFwicmVqZWN0LXZhbHVlXCI6XG4gICAgICAgICAgICBpZiAoc3RhcnRUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm5Ub2tlbiA9IHRyYW5zaXRpb24oc3RhY2ssIGNodW5rLCBzdGF0ZSwgc2FuaXRpemVkT3B0aW9ucykgfHwgbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gXCJhY2NlcHQtdmFsdWVcIikge1xuICAgICAgICAgICAgICByZXR1cm5Ub2tlbiA9IGNvbWJpbmVNYW55TXV0KHJldHVyblRva2VuLCBjaHVuayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2h1bmsubmFtZSA9PT0gZW5kVG9rZW4pIHtcbiAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICBvcHRpb25hbFRva2VuID0gb3B0aW9uYWxUb2tlbnNbZW5kVG9rZW5dIHx8IFwiXCI7XG4gICAgICAgICAgICAgIGVuZFRva2VuID0gXCJcIjtcbiAgICAgICAgICAgICAgaWYgKCFvcHRpb25hbFRva2VuKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGUgPT09IFwiYWNjZXB0LXZhbHVlXCIgPyBcInBhc3NcIiA6IFwiYWxsXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblRva2VuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBsYXN0IGluZGV4IGluIHRoZSBzdGFja1xuICAgICAgICBpZiAodHlwZW9mIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAvLyBhcnJheVxuICAgICAgICAgIHN3aXRjaCAoY2h1bmsubmFtZSkge1xuICAgICAgICAgICAgY2FzZSBcInN0YXJ0T2JqZWN0XCI6XG4gICAgICAgICAgICBjYXNlIFwic3RhcnRBcnJheVwiOlxuICAgICAgICAgICAgY2FzZSBcInN0YXJ0U3RyaW5nXCI6XG4gICAgICAgICAgICBjYXNlIFwic3RhcnROdW1iZXJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJudWxsVmFsdWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ0cnVlVmFsdWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJmYWxzZVZhbHVlXCI6XG4gICAgICAgICAgICAgICsrc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm51bWJlclZhbHVlXCI6XG4gICAgICAgICAgICAgIGlmIChwcmV2aW91c1Rva2VuICE9PSBcImVuZE51bWJlclwiKSArK3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdWYWx1ZVwiOlxuICAgICAgICAgICAgICBpZiAocHJldmlvdXNUb2tlbiAhPT0gXCJlbmRTdHJpbmdcIikgKytzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjaHVuay5uYW1lID09PSBcImtleVZhbHVlXCIpIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID0gY2h1bmsudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXNUb2tlbiA9IGNodW5rLm5hbWU7XG5cbiAgICAgICAgLy8gY2hlY2sgdGhlIHRva2VuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9XG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNoZWNrYWJsZVRva2Vuc1tjaHVuay5uYW1lXSAhPT0gMSA/IG5vbkNoZWNrYWJsZUFjdGlvbiA6IGZpbHRlcihzdGFjaywgY2h1bmspID8gc3BlY2lhbEFjdGlvbiA6IGRlZmF1bHRBY3Rpb247XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBlbmRUb2tlbiA9IHN0b3BUb2tlbnNbY2h1bmsubmFtZV0gfHwgXCJcIjtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICBjYXNlIFwicHJvY2Vzcy1rZXlcIjpcbiAgICAgICAgICAgIGlmIChjaHVuay5uYW1lID09PSBcInN0YXJ0S2V5XCIpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcInByb2Nlc3Mta2V5XCI7XG4gICAgICAgICAgICAgIGNvbnRpbnVlIHJlY2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiYWNjZXB0LXRva2VuXCI6XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoZW5kVG9rZW4gJiYgb3B0aW9uYWxUb2tlbnNbZW5kVG9rZW5dKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJhY2NlcHQtdmFsdWVcIjtcbiAgICAgICAgICAgICAgc3RhcnRUcmFuc2l0aW9uID0gISF0cmFuc2l0aW9uO1xuICAgICAgICAgICAgICBjb250aW51ZSByZWNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHJldHVyblRva2VuID0gdHJhbnNpdGlvbihzdGFjaywgY2h1bmssIGFjdGlvbiwgc2FuaXRpemVkT3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm5Ub2tlbiA9IGNvbWJpbmVNYW55TXV0KHJldHVyblRva2VuLCBjaHVuayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiYWNjZXB0XCI6XG4gICAgICAgICAgICBpZiAoZW5kVG9rZW4pIHtcbiAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICBzdGF0ZSA9IG9wdGlvbmFsVG9rZW5zW2VuZFRva2VuXSA/IFwiYWNjZXB0LXZhbHVlXCIgOiBcImFjY2VwdFwiO1xuICAgICAgICAgICAgICBzdGFydFRyYW5zaXRpb24gPSAhIXRyYW5zaXRpb247XG4gICAgICAgICAgICAgIGNvbnRpbnVlIHJlY2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbikgcmV0dXJuVG9rZW4gPSB0cmFuc2l0aW9uKHN0YWNrLCBjaHVuaywgYWN0aW9uLCBzYW5pdGl6ZWRPcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVyblRva2VuID0gY29tYmluZU1hbnlNdXQocmV0dXJuVG9rZW4sIGNodW5rKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJyZWplY3RcIjpcbiAgICAgICAgICAgIGlmIChlbmRUb2tlbikge1xuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIHN0YXRlID0gb3B0aW9uYWxUb2tlbnNbZW5kVG9rZW5dID8gXCJyZWplY3QtdmFsdWVcIiA6IFwicmVqZWN0XCI7XG4gICAgICAgICAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9ICEhdHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgY29udGludWUgcmVjaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uKSByZXR1cm5Ub2tlbiA9IHRyYW5zaXRpb24oc3RhY2ssIGNodW5rLCBhY3Rpb24sIHNhbml0aXplZE9wdGlvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInBhc3NcIjpcbiAgICAgICAgICAgIHN0YXRlID0gXCJwYXNzXCI7XG4gICAgICAgICAgICBjb250aW51ZSByZWNoZWNrO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhY2tcbiAgICAgIHN3aXRjaCAoY2h1bmsubmFtZSkge1xuICAgICAgICBjYXNlIFwic3RhcnRPYmplY3RcIjpcbiAgICAgICAgICBzdGFjay5wdXNoKG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwic3RhcnRBcnJheVwiOlxuICAgICAgICAgIHN0YWNrLnB1c2goLTEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZW5kT2JqZWN0XCI6XG4gICAgICAgIGNhc2UgXCJlbmRBcnJheVwiOlxuICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0dXJuVG9rZW47XG4gICAgfSk7XG4gIH07XG5cbmV4cG9ydCBjb25zdCBQaWNrUGFyc2VyID0gKG9wdGlvbnM/OiBhbnkpID0+IHdpdGhQYXJzZXIoZmlsdGVyQmFzZSgpLCBPYmplY3QuYXNzaWduKHsgcGFja0tleXM6IHRydWUgfSwgb3B0aW9ucykpO1xuXG5jbGFzcyBDb3VudGVyIHtcbiAgZGVwdGg6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoaW5pdGlhbERlcHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLmRlcHRoID0gaW5pdGlhbERlcHRoO1xuICB9XG4gIHN0YXJ0T2JqZWN0KCkge1xuICAgICsrdGhpcy5kZXB0aDtcbiAgfVxuICBlbmRPYmplY3QoKSB7XG4gICAgLS10aGlzLmRlcHRoO1xuICB9XG4gIHN0YXJ0QXJyYXkoKSB7XG4gICAgKyt0aGlzLmRlcHRoO1xuICB9XG4gIGVuZEFycmF5KCkge1xuICAgIC0tdGhpcy5kZXB0aDtcbiAgfVxufVxuXG5jbGFzcyBBc3NlbWJsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzdGF0aWMgY29ubmVjdFRvKHN0cmVhbTogYW55LCBvcHRpb25zOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IEFzc2VtYmxlcihvcHRpb25zKS5jb25uZWN0VG8oc3RyZWFtKTtcbiAgfVxuXG4gIHN0YWNrOiBhbnk7XG4gIGN1cnJlbnQ6IGFueTtcbiAga2V5OiBhbnk7XG4gIGRvbmU6IGJvb2xlYW47XG4gIHJldml2ZXI6IGFueTtcbiAgLy8gQHRzLWlnbm9yZVxuICBzdHJpbmdWYWx1ZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRhcENoYWluOiAoY2h1bms6IGFueSkgPT4gYW55O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGFjayA9IFtdO1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMua2V5ID0gbnVsbDtcbiAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICB0aGlzLnJldml2ZXIgPSB0eXBlb2Ygb3B0aW9ucy5yZXZpdmVyID09IFwiZnVuY3Rpb25cIiAmJiBvcHRpb25zLnJldml2ZXI7XG4gICAgICBpZiAodGhpcy5yZXZpdmVyKSB7XG4gICAgICAgIHRoaXMuc3RyaW5nVmFsdWUgPSB0aGlzLl9zYXZlVmFsdWUgPSB0aGlzLl9zYXZlVmFsdWVXaXRoUmV2aXZlcjtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLm51bWJlckFzU3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5udW1iZXJWYWx1ZSA9IHRoaXMuc3RyaW5nVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50YXBDaGFpbiA9IChjaHVuaykgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgaWYgKHRoaXNbY2h1bmsubmFtZV0pIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBub25lO1xuICAgIH07XG5cbiAgICB0aGlzLnN0cmluZ1ZhbHVlID0gdGhpcy5fc2F2ZVZhbHVlO1xuICB9XG5cbiAgY29ubmVjdFRvKHN0cmVhbTogYW55KSB7XG4gICAgc3RyZWFtLm9uKFwiZGF0YVwiLCAoY2h1bms6IGFueSkgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgaWYgKHRoaXNbY2h1bmsubmFtZV0pIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBpZiAodGhpcy5kb25lKSB0aGlzLmVtaXQoXCJkb25lXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IGRlcHRoKCkge1xuICAgIHJldHVybiAodGhpcy5zdGFjay5sZW5ndGggPj4gMSkgKyAodGhpcy5kb25lID8gMCA6IDEpO1xuICB9XG5cbiAgZ2V0IHBhdGgoKSB7XG4gICAgY29uc3QgcGF0aDogYW55W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhY2subGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuc3RhY2tbaSArIDFdO1xuICAgICAgcGF0aC5wdXNoKGtleSA9PT0gbnVsbCA/IHRoaXMuc3RhY2tbaV0ubGVuZ3RoIDoga2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBkcm9wVG9MZXZlbChsZXZlbDogYW55KSB7XG4gICAgaWYgKGxldmVsIDwgdGhpcy5kZXB0aCkge1xuICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICBjb25zdCBpbmRleCA9IChsZXZlbCAtIDEpIDw8IDE7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc3RhY2tbaW5kZXhdO1xuICAgICAgICB0aGlzLmtleSA9IHRoaXMuc3RhY2tbaW5kZXggKyAxXTtcbiAgICAgICAgdGhpcy5zdGFjay5zcGxpY2UoaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGFjayA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmtleSA9IG51bGw7XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uc3VtZShjaHVuazogYW55KSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXNbY2h1bmsubmFtZV0gJiYgdGhpc1tjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBrZXlWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5rZXkgPSB2YWx1ZTtcbiAgfVxuXG4gIC8vc3RyaW5nVmFsdWUoKSAtIGFsaWFzZWQgYmVsb3cgdG8gX3NhdmVWYWx1ZSgpXG5cbiAgbnVtYmVyVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMuX3NhdmVWYWx1ZShwYXJzZUZsb2F0KHZhbHVlKSk7XG4gIH1cbiAgbnVsbFZhbHVlKCkge1xuICAgIHRoaXMuX3NhdmVWYWx1ZShudWxsKTtcbiAgfVxuICB0cnVlVmFsdWUoKSB7XG4gICAgdGhpcy5fc2F2ZVZhbHVlKHRydWUpO1xuICB9XG4gIGZhbHNlVmFsdWUoKSB7XG4gICAgdGhpcy5fc2F2ZVZhbHVlKGZhbHNlKTtcbiAgfVxuXG4gIHN0YXJ0T2JqZWN0KCkge1xuICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5jdXJyZW50LCB0aGlzLmtleSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudCA9IG5ldyBPYmplY3QoKTtcbiAgICB0aGlzLmtleSA9IG51bGw7XG4gIH1cblxuICBlbmRPYmplY3QoKSB7XG4gICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY3VycmVudDtcbiAgICAgIHRoaXMua2V5ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICB0aGlzLl9zYXZlVmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0QXJyYXkoKSB7XG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhY2sucHVzaCh0aGlzLmN1cnJlbnQsIHRoaXMua2V5KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50ID0gW107XG4gICAgdGhpcy5rZXkgPSBudWxsO1xuICB9XG5cbiAgZW5kQXJyYXkoKSB7XG4gICAgaWYgKHRoaXMuc3RhY2subGVuZ3RoKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY3VycmVudDtcbiAgICAgIHRoaXMua2V5ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICB0aGlzLl9zYXZlVmFsdWUodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIF9zYXZlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50LnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jdXJyZW50W3RoaXMua2V5XSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmtleSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIF9zYXZlVmFsdWVXaXRoUmV2aXZlcih2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5yZXZpdmVyKFwiXCIsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY3VycmVudCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5yZXZpdmVyKFwiXCIgKyB0aGlzLmN1cnJlbnQubGVuZ3RoLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuY3VycmVudC5wdXNoKHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5jdXJyZW50W3RoaXMuY3VycmVudC5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnJldml2ZXIodGhpcy5rZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRbdGhpcy5rZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzdHJlYW1CYXNlID1cbiAgKHsgcHVzaCwgZmlyc3QsIGxldmVsIH06IGFueSkgPT5cbiAgKG9wdGlvbnMgPSB7fSBhcyBhbnkpID0+IHtcbiAgICBjb25zdCB7IG9iamVjdEZpbHRlciwgaW5jbHVkZVVuZGVjaWRlZCB9ID0gb3B0aW9ucztcbiAgICBsZXQgYXNtID0gbmV3IEFzc2VtYmxlcihvcHRpb25zKSBhcyBhbnksXG4gICAgICBzdGF0ZSA9IGZpcnN0ID8gXCJmaXJzdFwiIDogXCJjaGVja1wiLFxuICAgICAgc2F2ZWRBc20gPSBudWxsIGFzIGFueTtcblxuICAgIGlmICh0eXBlb2Ygb2JqZWN0RmlsdGVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gbm8gb2JqZWN0IGZpbHRlciArIG5vIGZpcnN0IGNoZWNrXG4gICAgICBpZiAoc3RhdGUgPT09IFwiY2hlY2tcIilcbiAgICAgICAgcmV0dXJuIChjaHVuazogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGFzbVtjaHVuay5uYW1lXSkge1xuICAgICAgICAgICAgYXNtW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwdXNoKGFzbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBub25lO1xuICAgICAgICB9O1xuICAgICAgLy8gbm8gb2JqZWN0IGZpbHRlclxuICAgICAgcmV0dXJuIChjaHVuazogYW55KSA9PiB7XG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICBjYXNlIFwiZmlyc3RcIjpcbiAgICAgICAgICAgIGZpcnN0KGNodW5rKTtcbiAgICAgICAgICAgIHN0YXRlID0gXCJhY2NlcHRcIjtcbiAgICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgICBjYXNlIFwiYWNjZXB0XCI6XG4gICAgICAgICAgICBpZiAoYXNtW2NodW5rLm5hbWVdKSB7XG4gICAgICAgICAgICAgIGFzbVtjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHB1c2goYXNtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vbmU7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIG9iamVjdCBmaWx0ZXIgKyBhIHBvc3NpYmxlIGZpcnN0IGNoZWNrXG4gICAgcmV0dXJuIChjaHVuazogYW55KSA9PiB7XG4gICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgIGZpcnN0KGNodW5rKTtcbiAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgIGNhc2UgXCJjaGVja1wiOlxuICAgICAgICAgIGlmIChhc21bY2h1bmsubmFtZV0pIHtcbiAgICAgICAgICAgIGFzbVtjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBvYmplY3RGaWx0ZXIoYXNtKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcImFjY2VwdFwiO1xuICAgICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkgcmV0dXJuIHB1c2goYXNtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkgcmV0dXJuIHB1c2goYXNtLCB0cnVlKTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcInJlamVjdFwiO1xuICAgICAgICAgICAgICBzYXZlZEFzbSA9IGFzbTtcbiAgICAgICAgICAgICAgYXNtID0gbmV3IENvdW50ZXIoc2F2ZWRBc20uZGVwdGgpO1xuICAgICAgICAgICAgICBzYXZlZEFzbS5kcm9wVG9MZXZlbChsZXZlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkgcmV0dXJuIHB1c2goYXNtLCAhaW5jbHVkZVVuZGVjaWRlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYWNjZXB0XCI6XG4gICAgICAgICAgaWYgKGFzbVtjaHVuay5uYW1lXSkge1xuICAgICAgICAgICAgYXNtW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAgICAgICByZXR1cm4gcHVzaChhc20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInJlamVjdFwiOlxuICAgICAgICAgIGlmIChhc21bY2h1bmsubmFtZV0pIHtcbiAgICAgICAgICAgIGFzbVtjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgYXNtID0gc2F2ZWRBc207XG4gICAgICAgICAgICAgIHNhdmVkQXNtID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuIHB1c2goYXNtLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9uZTtcbiAgICB9O1xuICB9O1xuXG5leHBvcnQgY29uc3QgU3RyZWFtQXJyYXkgPSAob3B0aW9ucz86IGFueSkgPT4ge1xuICBsZXQga2V5ID0gMDtcbiAgcmV0dXJuIHN0cmVhbUJhc2Uoe1xuICAgIGxldmVsOiAxLFxuXG4gICAgZmlyc3QoY2h1bms6IGFueSkge1xuICAgICAgaWYgKGNodW5rLm5hbWUgIT09IFwic3RhcnRBcnJheVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUb3AtbGV2ZWwgb2JqZWN0IHNob3VsZCBiZSBhbiBhcnJheS5cIik7XG4gICAgfSxcblxuICAgIHB1c2goYXNtOiBhbnksIGRpc2NhcmQ6IGFueSkge1xuICAgICAgaWYgKGFzbS5jdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICBpZiAoZGlzY2FyZCkge1xuICAgICAgICAgICsra2V5O1xuICAgICAgICAgIGFzbS5jdXJyZW50LnBvcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGtleToga2V5KyssIHZhbHVlOiBhc20uY3VycmVudC5wb3AoKSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9uZTtcbiAgICB9LFxuICB9KShvcHRpb25zKTtcbn07XG4iLCAiaW1wb3J0IHsgTGlzdCwgTWVudUJhckV4dHJhLCBJY29uLCBvcGVuLCBMYXVuY2hUeXBlLCBlbnZpcm9ubWVudCwgQWN0aW9uUGFuZWwsIEFjdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlUHJvbWlzZSwgUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiLi9zaG93RmFpbHVyZVRvYXN0XCI7XG5pbXBvcnQgeyBiYXNlRXhlY3V0ZVNRTCwgUGVybWlzc2lvbkVycm9yLCBpc1Blcm1pc3Npb25FcnJvciB9IGZyb20gXCIuL3NxbC11dGlsc1wiO1xuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcXVlcnkgb24gYSBsb2NhbCBTUUwgZGF0YWJhc2UgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBxdWVyeSBvZiB0aGUgY29tbWFuZC4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHVzZVNRTCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICogaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG4gKiBpbXBvcnQgeyBob21lZGlyIH0gZnJvbSBcIm9zXCI7XG4gKlxuICogY29uc3QgTk9URVNfREIgPSByZXNvbHZlKGhvbWVkaXIoKSwgXCJMaWJyYXJ5L0dyb3VwIENvbnRhaW5lcnMvZ3JvdXAuY29tLmFwcGxlLm5vdGVzL05vdGVTdG9yZS5zcWxpdGVcIik7XG4gKiBjb25zdCBub3Rlc1F1ZXJ5ID0gYFNFTEVDVCBpZCwgdGl0bGUgRlJPTSAuLi5gO1xuICogdHlwZSBOb3RlSXRlbSA9IHtcbiAqICAgaWQ6IHN0cmluZztcbiAqICAgdGl0bGU6IHN0cmluZztcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHBlcm1pc3Npb25WaWV3IH0gPSB1c2VTUUw8Tm90ZUl0ZW0+KE5PVEVTX0RCLCBub3Rlc1F1ZXJ5KTtcbiAqXG4gKiAgIGlmIChwZXJtaXNzaW9uVmlldykge1xuICogICAgIHJldHVybiBwZXJtaXNzaW9uVmlldztcbiAqICAgfVxuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30+XG4gKiAgICAgICB7KGRhdGEgfHwgW10pLm1hcCgoaXRlbSkgPT4gKFxuICogICAgICAgICA8TGlzdC5JdGVtIGtleT17aXRlbS5pZH0gdGl0bGU9e2l0ZW0udGl0bGV9IC8+XG4gKiAgICAgICApKX1cbiAqICAgICA8L0xpc3Q+XG4gKiAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVNRTDxUID0gdW5rbm93bj4oXG4gIGRhdGFiYXNlUGF0aDogc3RyaW5nLFxuICBxdWVyeTogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIC8qKiBBIHN0cmluZyBleHBsYWluaW5nIHdoeSB0aGUgZXh0ZW5zaW9uIG5lZWRzIGZ1bGwgZGlzayBhY2Nlc3MuIEZvciBleGFtcGxlLCB0aGUgQXBwbGUgTm90ZXMgZXh0ZW5zaW9uIHVzZXMgYFwiVGhpcyBpcyByZXF1aXJlZCB0byBzZWFyY2ggeW91ciBBcHBsZSBOb3Rlcy5cImAuIFdoaWxlIGl0IGlzIG9wdGlvbmFsLCB3ZSByZWNvbW1lbmQgc2V0dGluZyBpdCB0byBoZWxwIHVzZXJzIHVuZGVyc3RhbmQuICovXG4gICAgcGVybWlzc2lvblByaW1pbmc/OiBzdHJpbmc7XG4gIH0gJiBPbWl0PFByb21pc2VPcHRpb25zPChkYXRhYmFzZTogc3RyaW5nLCBxdWVyeTogc3RyaW5nKSA9PiBQcm9taXNlPFRbXT4+LCBcImFib3J0YWJsZVwiPixcbikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIGNvbnN0IHsgcGVybWlzc2lvblByaW1pbmcsIC4uLnVzZVByb21pc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IFtwZXJtaXNzaW9uVmlldywgc2V0UGVybWlzc2lvblZpZXddID0gdXNlU3RhdGU8UmVhY3QuSlNYLkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGF0ZXN0T3B0aW9ucyA9IHVzZUxhdGVzdChvcHRpb25zIHx8IHt9KTtcbiAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlRXJyb3IgPSB1c2VDYWxsYmFjayhcbiAgICAoX2Vycm9yOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihfZXJyb3IpO1xuICAgICAgY29uc3QgZXJyb3IgPVxuICAgICAgICBfZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBfZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcImF1dGhvcml6YXRpb24gZGVuaWVkXCIpXG4gICAgICAgICAgPyBuZXcgUGVybWlzc2lvbkVycm9yKFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoZSBkYXRhYmFzZS5cIilcbiAgICAgICAgICA6IChfZXJyb3IgYXMgRXJyb3IpO1xuXG4gICAgICBpZiAoaXNQZXJtaXNzaW9uRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgIHNldFBlcm1pc3Npb25WaWV3KDxQZXJtaXNzaW9uRXJyb3JTY3JlZW4gcHJpbWluZz17bGF0ZXN0T3B0aW9ucy5jdXJyZW50LnBlcm1pc3Npb25QcmltaW5nfSAvPik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobGF0ZXN0T3B0aW9ucy5jdXJyZW50Lm9uRXJyb3IpIHtcbiAgICAgICAgICBsYXRlc3RPcHRpb25zLmN1cnJlbnQub25FcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGVudmlyb25tZW50LmxhdW5jaFR5cGUgIT09IExhdW5jaFR5cGUuQmFja2dyb3VuZCkge1xuICAgICAgICAgICAgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwge1xuICAgICAgICAgICAgICB0aXRsZTogXCJDYW5ub3QgcXVlcnkgdGhlIGRhdGFcIixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW2xhdGVzdE9wdGlvbnNdLFxuICApO1xuXG4gIGNvbnN0IGZuID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFleGlzdHNTeW5jKGRhdGFiYXNlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhYmFzZSBkb2VzIG5vdCBleGlzdFwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXN5bmMgKGRhdGFiYXNlUGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBhYm9ydFNpZ25hbCA9IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWw7XG4gICAgICByZXR1cm4gYmFzZUV4ZWN1dGVTUUw8VD4oZGF0YWJhc2VQYXRoLCBxdWVyeSwgeyBzaWduYWw6IGFib3J0U2lnbmFsIH0pO1xuICAgIH07XG4gIH0sIFtkYXRhYmFzZVBhdGhdKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnVzZVByb21pc2UoZm4sIFtkYXRhYmFzZVBhdGgsIHF1ZXJ5XSwgeyAuLi51c2VQcm9taXNlT3B0aW9ucywgb25FcnJvcjogaGFuZGxlRXJyb3IgfSksXG4gICAgcGVybWlzc2lvblZpZXcsXG4gIH07XG59XG5cbmZ1bmN0aW9uIFBlcm1pc3Npb25FcnJvclNjcmVlbihwcm9wczogeyBwcmltaW5nPzogc3RyaW5nIH0pIHtcbiAgY29uc3QgbWFjb3NWZW50dXJhQW5kTGF0ZXIgPSBwYXJzZUludChvcy5yZWxlYXNlKCkuc3BsaXQoXCIuXCIpWzBdKSA+PSAyMjtcbiAgY29uc3QgcHJlZmVyZW5jZXNTdHJpbmcgPSBtYWNvc1ZlbnR1cmFBbmRMYXRlciA/IFwiU2V0dGluZ3NcIiA6IFwiUHJlZmVyZW5jZXNcIjtcblxuICBjb25zdCBhY3Rpb24gPSBtYWNvc1ZlbnR1cmFBbmRMYXRlclxuICAgID8ge1xuICAgICAgICB0aXRsZTogXCJPcGVuIFN5c3RlbSBTZXR0aW5ncyAtPiBQcml2YWN5XCIsXG4gICAgICAgIHRhcmdldDogXCJ4LWFwcGxlLnN5c3RlbXByZWZlcmVuY2VzOmNvbS5hcHBsZS5wcmVmZXJlbmNlLnNlY3VyaXR5P1ByaXZhY3lfQWxsRmlsZXNcIixcbiAgICAgIH1cbiAgICA6IHtcbiAgICAgICAgdGl0bGU6IFwiT3BlbiBTeXN0ZW0gUHJlZmVyZW5jZXMgLT4gU2VjdXJpdHlcIixcbiAgICAgICAgdGFyZ2V0OiBcIngtYXBwbGUuc3lzdGVtcHJlZmVyZW5jZXM6Y29tLmFwcGxlLnByZWZlcmVuY2Uuc2VjdXJpdHk/UHJpdmFjeV9BbGxGaWxlc1wiLFxuICAgICAgfTtcblxuICBpZiAoZW52aXJvbm1lbnQuY29tbWFuZE1vZGUgPT09IFwibWVudS1iYXJcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8TWVudUJhckV4dHJhIGljb249e0ljb24uV2FybmluZ30gdGl0bGU9e2Vudmlyb25tZW50LmNvbW1hbmROYW1lfT5cbiAgICAgICAgPE1lbnVCYXJFeHRyYS5JdGVtXG4gICAgICAgICAgdGl0bGU9XCJSYXljYXN0IG5lZWRzIGZ1bGwgZGlzayBhY2Nlc3NcIlxuICAgICAgICAgIHRvb2x0aXA9e2BZb3UgY2FuIHJldmVydCB0aGlzIGFjY2VzcyBpbiAke3ByZWZlcmVuY2VzU3RyaW5nfSB3aGVuZXZlciB5b3Ugd2FudGB9XG4gICAgICAgIC8+XG4gICAgICAgIHtwcm9wcy5wcmltaW5nID8gKFxuICAgICAgICAgIDxNZW51QmFyRXh0cmEuSXRlbVxuICAgICAgICAgICAgdGl0bGU9e3Byb3BzLnByaW1pbmd9XG4gICAgICAgICAgICB0b29sdGlwPXtgWW91IGNhbiByZXZlcnQgdGhpcyBhY2Nlc3MgaW4gJHtwcmVmZXJlbmNlc1N0cmluZ30gd2hlbmV2ZXIgeW91IHdhbnRgfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8TWVudUJhckV4dHJhLlNlcGFyYXRvciAvPlxuICAgICAgICA8TWVudUJhckV4dHJhLkl0ZW0gdGl0bGU9e2FjdGlvbi50aXRsZX0gb25BY3Rpb249eygpID0+IG9wZW4oYWN0aW9uLnRhcmdldCl9IC8+XG4gICAgICA8L01lbnVCYXJFeHRyYT5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdD5cbiAgICAgIDxMaXN0LkVtcHR5Vmlld1xuICAgICAgICBpY29uPXt7XG4gICAgICAgICAgc291cmNlOiB7XG4gICAgICAgICAgICBsaWdodDogXCJodHRwczovL3JheWNhc3QuY29tL3VwbG9hZHMvZXh0ZW5zaW9ucy11dGlscy1zZWN1cml0eS1wZXJtaXNzaW9ucy1saWdodC5wbmdcIixcbiAgICAgICAgICAgIGRhcms6IFwiaHR0cHM6Ly9yYXljYXN0LmNvbS91cGxvYWRzL2V4dGVuc2lvbnMtdXRpbHMtc2VjdXJpdHktcGVybWlzc2lvbnMtZGFyay5wbmdcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9fVxuICAgICAgICB0aXRsZT1cIlJheWNhc3QgbmVlZHMgZnVsbCBkaXNrIGFjY2Vzcy5cIlxuICAgICAgICBkZXNjcmlwdGlvbj17YCR7XG4gICAgICAgICAgcHJvcHMucHJpbWluZyA/IHByb3BzLnByaW1pbmcgKyBcIlxcblwiIDogXCJcIlxuICAgICAgICB9WW91IGNhbiByZXZlcnQgdGhpcyBhY2Nlc3MgaW4gJHtwcmVmZXJlbmNlc1N0cmluZ30gd2hlbmV2ZXIgeW91IHdhbnQuYH1cbiAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgICAgPEFjdGlvbi5PcGVuIHsuLi5hY3Rpb259IC8+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgfVxuICAgICAgLz5cbiAgICA8L0xpc3Q+XG4gICk7XG59XG4iLCAiaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBjb3B5RmlsZSwgbWtkaXIsIHdyaXRlRmlsZSB9IGZyb20gXCJub2RlOmZzL3Byb21pc2VzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZ2V0U3Bhd25lZFByb21pc2UsIGdldFNwYXduZWRSZXN1bHQgfSBmcm9tIFwiLi9leGVjLXV0aWxzXCI7XG5pbXBvcnQgeyBoYXNoIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm5hbWUgPSBcIlBlcm1pc3Npb25FcnJvclwiO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Blcm1pc3Npb25FcnJvcihlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIFBlcm1pc3Npb25FcnJvciB7XG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIGVycm9yLm5hbWUgPT09IFwiUGVybWlzc2lvbkVycm9yXCI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiYXNlRXhlY3V0ZVNRTDxUID0gdW5rbm93bj4oXG4gIGRhdGFiYXNlUGF0aDogc3RyaW5nLFxuICBxdWVyeTogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIHNpZ25hbD86IEFib3J0U2lnbmFsO1xuICB9LFxuKTogUHJvbWlzZTxUW10+IHtcbiAgaWYgKCFleGlzdHNTeW5jKGRhdGFiYXNlUGF0aCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZGF0YWJhc2UgZG9lcyBub3QgZXhpc3RcIik7XG4gIH1cblxuICBsZXQgc3FsaXRlMzogdHlwZW9mIGltcG9ydChcIm5vZGU6c3FsaXRlXCIpO1xuICB0cnkge1xuICAgIC8vIHRoaXMgaXMgYSBiaXQgdWdseSBidXQgd2UgY2FuJ3QgZGlyZWN0bHkgaW1wb3J0IFwibm9kZTpzcWxpdGVcIiBoZXJlIGJlY2F1c2UgcGFyY2VsIHdpbGwgaG9pc3QgaXQgYW55d2F5IGFuZCBpdCB3aWxsIGJyZWFrIHdoZW4gaXQncyBub3QgYXZhaWxhYmxlXG4gICAgY29uc3QgZHluYW1pY0ltcG9ydCA9IChtb2R1bGU6IHN0cmluZykgPT4gaW1wb3J0KG1vZHVsZSk7XG4gICAgc3FsaXRlMyA9IGF3YWl0IGR5bmFtaWNJbXBvcnQoXCJub2RlOnNxbGl0ZVwiKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBJZiBzcWxpdGUzIGlzIG5vdCBhdmFpbGFibGUsIHdlIGZhbGxiYWNrIHRvIHVzaW5nIHRoZSBzcWxpdGUzIENMSSAoYXZhaWxhYmxlIG9uIG1hY09TIGFuZCBMaW51eCBieSBkZWZhdWx0KS5cbiAgICByZXR1cm4gc3FsaXRlRmFsbGJhY2s8VD4oZGF0YWJhc2VQYXRoLCBxdWVyeSwgb3B0aW9ucyk7XG4gIH1cblxuICBsZXQgZGIgPSBuZXcgc3FsaXRlMy5EYXRhYmFzZVN5bmMoZGF0YWJhc2VQYXRoLCB7IG9wZW46IGZhbHNlLCByZWFkT25seTogdHJ1ZSB9KTtcblxuICBjb25zdCBhYm9ydFNpZ25hbCA9IG9wdGlvbnM/LnNpZ25hbDtcblxuICB0cnkge1xuICAgIGRiLm9wZW4oKTtcblxuICAgIGNvbnN0IHN0YXRlbWVudCA9IGRiLnByZXBhcmUocXVlcnkpO1xuICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBzdGF0ZW1lbnQuYWxsKCk7XG5cbiAgICBkYi5jbG9zZSgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdCBhcyBUW107XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBpZiAoZXJyb3IuZXJyY29kZSA9PT0gNSB8fCBlcnJvci5lcnJjb2RlID09PSAxNCB8fCBlcnJvci5tZXNzYWdlLm1hdGNoKFwiKDUpXCIpIHx8IGVycm9yLm1lc3NhZ2UubWF0Y2goXCIoMTQpXCIpKSB7XG4gICAgICAvLyBUaGF0IG1lYW5zIHRoYXQgdGhlIERCIGlzIGJ1c3kgYmVjYXVzZSBvZiBhbm90aGVyIGFwcCBpcyBsb2NraW5nIGl0XG4gICAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiBDaHJvbWUgb3IgQXJjIGlzIG9wZW5lZDogdGhleSBsb2NrIHRoZSBIaXN0b3J5IGRiLlxuICAgICAgLy8gQXMgYW4gdWdseSB3b3JrYXJvdW5kLCB3ZSBkdXBsaWNhdGUgdGhlIGZpbGUgYW5kIHJlYWQgdGhhdCBpbnN0ZWFkXG4gICAgICAvLyAod2l0aCB2ZnMgdW5peCAtIG5vbmUgdG8ganVzdCBub3QgY2FyZSBhYm91dCBsb2NrcylcbiAgICAgIGxldCB3b3JrYXJvdW5kQ29waWVkRGI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGlmICghd29ya2Fyb3VuZENvcGllZERiKSB7XG4gICAgICAgIGNvbnN0IHRlbXBGb2xkZXIgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIFwidXNlU1FMXCIsIGhhc2goZGF0YWJhc2VQYXRoKSk7XG4gICAgICAgIGF3YWl0IG1rZGlyKHRlbXBGb2xkZXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gICAgICAgIHdvcmthcm91bmRDb3BpZWREYiA9IHBhdGguam9pbih0ZW1wRm9sZGVyLCBcImRiLmRiXCIpO1xuICAgICAgICBhd2FpdCBjb3B5RmlsZShkYXRhYmFzZVBhdGgsIHdvcmthcm91bmRDb3BpZWREYik7XG5cbiAgICAgICAgYXdhaXQgd3JpdGVGaWxlKHdvcmthcm91bmRDb3BpZWREYiArIFwiLXNobVwiLCBcIlwiKTtcbiAgICAgICAgYXdhaXQgd3JpdGVGaWxlKHdvcmthcm91bmRDb3BpZWREYiArIFwiLXdhbFwiLCBcIlwiKTtcblxuICAgICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuICAgICAgfVxuXG4gICAgICBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlU3luYyh3b3JrYXJvdW5kQ29waWVkRGIsIHsgb3BlbjogZmFsc2UsIHJlYWRPbmx5OiB0cnVlIH0pO1xuICAgICAgZGIub3BlbigpO1xuICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICAgICAgY29uc3Qgc3RhdGVtZW50ID0gZGIucHJlcGFyZShxdWVyeSk7XG4gICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBzdGF0ZW1lbnQuYWxsKCk7XG5cbiAgICAgIGRiLmNsb3NlKCk7XG5cbiAgICAgIHJldHVybiByZXN1bHQgYXMgVFtdO1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNxbGl0ZUZhbGxiYWNrPFQgPSB1bmtub3duPihcbiAgZGF0YWJhc2VQYXRoOiBzdHJpbmcsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiB7XG4gICAgc2lnbmFsPzogQWJvcnRTaWduYWw7XG4gIH0sXG4pOiBQcm9taXNlPFRbXT4ge1xuICBjb25zdCBhYm9ydFNpZ25hbCA9IG9wdGlvbnM/LnNpZ25hbDtcblxuICBsZXQgc3Bhd25lZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bihcInNxbGl0ZTNcIiwgW1wiLS1qc29uXCIsIFwiLS1yZWFkb25seVwiLCBkYXRhYmFzZVBhdGgsIHF1ZXJ5XSwgeyBzaWduYWw6IGFib3J0U2lnbmFsIH0pO1xuICBsZXQgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkKTtcbiAgbGV0IFt7IGVycm9yLCBleGl0Q29kZSwgc2lnbmFsIH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQ8c3RyaW5nPihcbiAgICBzcGF3bmVkLFxuICAgIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9LFxuICAgIHNwYXduZWRQcm9taXNlLFxuICApO1xuICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gIGlmIChzdGRlcnJSZXN1bHQubWF0Y2goXCIoNSlcIikgfHwgc3RkZXJyUmVzdWx0Lm1hdGNoKFwiKDE0KVwiKSkge1xuICAgIC8vIFRoYXQgbWVhbnMgdGhhdCB0aGUgREIgaXMgYnVzeSBiZWNhdXNlIG9mIGFub3RoZXIgYXBwIGlzIGxvY2tpbmcgaXRcbiAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiBDaHJvbWUgb3IgQXJjIGlzIG9wZW5lZDogdGhleSBsb2NrIHRoZSBIaXN0b3J5IGRiLlxuICAgIC8vIEFzIGFuIHVnbHkgd29ya2Fyb3VuZCwgd2UgZHVwbGljYXRlIHRoZSBmaWxlIGFuZCByZWFkIHRoYXQgaW5zdGVhZFxuICAgIC8vICh3aXRoIHZmcyB1bml4IC0gbm9uZSB0byBqdXN0IG5vdCBjYXJlIGFib3V0IGxvY2tzKVxuICAgIGxldCB3b3JrYXJvdW5kQ29waWVkRGI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBpZiAoIXdvcmthcm91bmRDb3BpZWREYikge1xuICAgICAgY29uc3QgdGVtcEZvbGRlciA9IHBhdGguam9pbihvcy50bXBkaXIoKSwgXCJ1c2VTUUxcIiwgaGFzaChkYXRhYmFzZVBhdGgpKTtcbiAgICAgIGF3YWl0IG1rZGlyKHRlbXBGb2xkZXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICAgICAgd29ya2Fyb3VuZENvcGllZERiID0gcGF0aC5qb2luKHRlbXBGb2xkZXIsIFwiZGIuZGJcIik7XG4gICAgICBhd2FpdCBjb3B5RmlsZShkYXRhYmFzZVBhdGgsIHdvcmthcm91bmRDb3BpZWREYik7XG5cbiAgICAgIGF3YWl0IHdyaXRlRmlsZSh3b3JrYXJvdW5kQ29waWVkRGIgKyBcIi1zaG1cIiwgXCJcIik7XG4gICAgICBhd2FpdCB3cml0ZUZpbGUod29ya2Fyb3VuZENvcGllZERiICsgXCItd2FsXCIsIFwiXCIpO1xuXG4gICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuICAgIH1cblxuICAgIHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24oXCJzcWxpdGUzXCIsIFtcIi0tanNvblwiLCBcIi0tcmVhZG9ubHlcIiwgXCItLXZmc1wiLCBcInVuaXgtbm9uZVwiLCB3b3JrYXJvdW5kQ29waWVkRGIsIHF1ZXJ5XSwge1xuICAgICAgc2lnbmFsOiBhYm9ydFNpZ25hbCxcbiAgICB9KTtcbiAgICBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQpO1xuICAgIFt7IGVycm9yLCBleGl0Q29kZSwgc2lnbmFsIH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQ8c3RyaW5nPihcbiAgICAgIHNwYXduZWQsXG4gICAgICB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSxcbiAgICAgIHNwYXduZWRQcm9taXNlLFxuICAgICk7XG4gICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcbiAgfVxuXG4gIGlmIChlcnJvciB8fCBleGl0Q29kZSAhPT0gMCB8fCBzaWduYWwgIT09IG51bGwpIHtcbiAgICBpZiAoc3RkZXJyUmVzdWx0LmluY2x1ZGVzKFwiYXV0aG9yaXphdGlvbiBkZW5pZWRcIikpIHtcbiAgICAgIHRocm93IG5ldyBQZXJtaXNzaW9uRXJyb3IoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgdGhlIGRhdGFiYXNlLlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKHN0ZGVyclJlc3VsdCB8fCBcIlVua25vd24gZXJyb3JcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIEpTT04ucGFyc2Uoc3Rkb3V0UmVzdWx0LnRyaW0oKSB8fCBcIltdXCIpIGFzIFRbXTtcbn1cblxuZnVuY3Rpb24gY2hlY2tBYm9ydGVkKHNpZ25hbD86IEFib3J0U2lnbmFsKSB7XG4gIGlmIChzaWduYWw/LmFib3J0ZWQpIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcImFib3J0ZWRcIik7XG4gICAgZXJyb3IubmFtZSA9IFwiQWJvcnRFcnJvclwiO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgRm9ybSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5cbi8qKlxuICogU2hvcnRoYW5kcyBmb3IgY29tbW9uIHZhbGlkYXRpb24gY2FzZXNcbiAqL1xuZXhwb3J0IGVudW0gRm9ybVZhbGlkYXRpb24ge1xuICAvKiogU2hvdyBhbiBlcnJvciB3aGVuIHRoZSB2YWx1ZSBvZiB0aGUgaXRlbSBpcyBlbXB0eSAqL1xuICBSZXF1aXJlZCA9IFwicmVxdWlyZWRcIixcbn1cblxudHlwZSBWYWxpZGF0aW9uRXJyb3IgPSBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsO1xudHlwZSBWYWxpZGF0b3I8VmFsdWVUeXBlPiA9ICgodmFsdWU6IFZhbHVlVHlwZSB8IHVuZGVmaW5lZCkgPT4gVmFsaWRhdGlvbkVycm9yKSB8IEZvcm1WYWxpZGF0aW9uO1xuXG5mdW5jdGlvbiB2YWxpZGF0aW9uRXJyb3I8VmFsdWVUeXBlPihcbiAgdmFsaWRhdGlvbjogVmFsaWRhdG9yPFZhbHVlVHlwZT4gfCB1bmRlZmluZWQsXG4gIHZhbHVlOiBWYWx1ZVR5cGUgfCB1bmRlZmluZWQsXG4pOiBWYWxpZGF0aW9uRXJyb3Ige1xuICBpZiAodmFsaWRhdGlvbikge1xuICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGlvbih2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uID09PSBGb3JtVmFsaWRhdGlvbi5SZXF1aXJlZCkge1xuICAgICAgbGV0IHZhbHVlSXNWYWxpZCA9IHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB2YWx1ZSAhPT0gbnVsbDtcbiAgICAgIGlmICh2YWx1ZUlzVmFsaWQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICAgIHZhbHVlSXNWYWxpZCA9IHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZS5nZXRUaW1lKCkgPiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXZhbHVlSXNWYWxpZCkge1xuICAgICAgICByZXR1cm4gXCJUaGUgaXRlbSBpcyByZXF1aXJlZFwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG50eXBlIFZhbGlkYXRpb248VCBleHRlbmRzIEZvcm0uVmFsdWVzPiA9IHsgW2lkIGluIGtleW9mIFRdPzogVmFsaWRhdG9yPFRbaWRdPiB9O1xuXG5pbnRlcmZhY2UgRm9ybVByb3BzPFQgZXh0ZW5kcyBGb3JtLlZhbHVlcz4ge1xuICAvKiogRnVuY3Rpb24gdG8gcGFzcyB0byB0aGUgYG9uU3VibWl0YCBwcm9wIG9mIHRoZSBgPEFjdGlvbi5TdWJtaXRGb3JtPmAgZWxlbWVudC4gSXQgd3JhcHMgdGhlIGluaXRpYWwgYG9uU3VibWl0YCBhcmd1bWVudCB3aXRoIHNvbWUgZ29vZGllcyByZWxhdGVkIHRvIHRoZSB2YWxpZGF0aW9uLiAqL1xuICBoYW5kbGVTdWJtaXQ6ICh2YWx1ZXM6IFQpID0+IHZvaWQgfCBib29sZWFuIHwgUHJvbWlzZTx2b2lkIHwgYm9vbGVhbj47XG4gIC8qKiBUaGUgcHJvcHMgdGhhdCBtdXN0IGJlIHBhc3NlZCB0byB0aGUgYDxGb3JtLkl0ZW0+YCBlbGVtZW50cyB0byBoYW5kbGUgdGhlIHZhbGlkYXRpb25zLiAqL1xuICBpdGVtUHJvcHM6IHtcbiAgICBbaWQgaW4ga2V5b2YgUmVxdWlyZWQ8VD5dOiBQYXJ0aWFsPEZvcm0uSXRlbVByb3BzPFRbaWRdPj4gJiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgc2V0IHRoZSB2YWxpZGF0aW9uIG9mIGEgc3BlY2lmaWMgZmllbGQuICovXG4gIHNldFZhbGlkYXRpb25FcnJvcjogKGlkOiBrZXlvZiBULCBlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PiB2b2lkO1xuICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9ncmFtbWF0aWNhbGx5IHNldCB0aGUgdmFsdWUgb2YgYSBzcGVjaWZpYyBmaWVsZC4gKi9cbiAgc2V0VmFsdWU6IDxLIGV4dGVuZHMga2V5b2YgVD4oaWQ6IEssIHZhbHVlOiBTZXRTdGF0ZUFjdGlvbjxUW0tdPikgPT4gdm9pZDtcbiAgLyoqIFRoZSBjdXJyZW50IHZhbHVlcyBvZiB0aGUgZm9ybS4gKi9cbiAgdmFsdWVzOiBUO1xuICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9ncmFtbWF0aWNhbGx5IGZvY3VzIGEgc3BlY2lmaWMgZmllbGQuICovXG4gIGZvY3VzOiAoaWQ6IGtleW9mIFQpID0+IHZvaWQ7XG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0IHRoZSB2YWx1ZXMgb2YgdGhlIEZvcm0uICovXG4gIHJlc2V0OiAoaW5pdGlhbFZhbHVlcz86IFBhcnRpYWw8VD4pID0+IHZvaWQ7XG59XG5cbi8qKlxuICogSG9vayB0aGF0IHByb3ZpZGVzIGEgaGlnaC1sZXZlbCBpbnRlcmZhY2UgdG8gd29yayB3aXRoIEZvcm1zLCBhbmQgbW9yZSBwYXJ0aWN1bGFybHksIHdpdGggRm9ybSB2YWxpZGF0aW9ucy4gSXQgaW5jb3Jwb3JhdGVzIGFsbCB0aGUgZ29vZCBwcmFjdGljZXMgdG8gcHJvdmlkZSBhIGdyZWF0IFVzZXIgRXhwZXJpZW5jZSBmb3IgeW91ciBGb3Jtcy5cbiAqXG4gKiBAcmV0dXJucyBhbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgdGhlIG5lY2Vzc2FyeSBtZXRob2RzIGFuZCBwcm9wcyB0byBwcm92aWRlIGEgZ29vZCBVc2VyIEV4cGVyaWVuY2UgaW4geW91ciBGb3JtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IEFjdGlvbiwgQWN0aW9uUGFuZWwsIEZvcm0sIHNob3dUb2FzdCwgVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VGb3JtLCBGb3JtVmFsaWRhdGlvbiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGludGVyZmFjZSBTaWduVXBGb3JtVmFsdWVzIHtcbiAqICAgbmlja25hbWU6IHN0cmluZztcbiAqICAgcGFzc3dvcmQ6IHN0cmluZztcbiAqIH1cbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCB7IGhhbmRsZVN1Ym1pdCwgaXRlbVByb3BzIH0gPSB1c2VGb3JtPFNpZ25VcEZvcm1WYWx1ZXM+KHtcbiAqICAgICBvblN1Ym1pdCh2YWx1ZXMpIHtcbiAqICAgICAgIHNob3dUb2FzdChUb2FzdC5TdHlsZS5TdWNjZXNzLCBcIllheSFcIiwgYCR7dmFsdWVzLm5pY2tuYW1lfSBhY2NvdW50IGNyZWF0ZWRgKTtcbiAqICAgICB9LFxuICogICAgIHZhbGlkYXRpb246IHtcbiAqICAgICAgIG5pY2tuYW1lOiBGb3JtVmFsaWRhdGlvbi5SZXF1aXJlZCxcbiAqICAgICAgIHBhc3N3b3JkOiAodmFsdWUpID0+IHtcbiAqICAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA8IDgpIHtcbiAqICAgICAgICAgICByZXR1cm4gXCJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggc3ltYm9sc1wiO1xuICogICAgICAgICB9IGVsc2UgaWYgKCF2YWx1ZSkge1xuICogICAgICAgICAgIHJldHVybiBcIlRoZSBpdGVtIGlzIHJlcXVpcmVkXCI7XG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgfSxcbiAqICAgfSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxGb3JtXG4gKiAgICAgICBhY3Rpb25zPXtcbiAqICAgICAgICAgPEFjdGlvblBhbmVsPlxuICogICAgICAgICAgIDxBY3Rpb24uU3VibWl0Rm9ybSB0aXRsZT1cIlN1Ym1pdFwiIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IC8+XG4gKiAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gKiAgICAgICB9XG4gKiAgICAgPlxuICogICAgICAgPEZvcm0uVGV4dEZpZWxkIHRpdGxlPVwiTmlja25hbWVcIiBwbGFjZWhvbGRlcj1cIkVudGVyIHlvdXIgbmlja25hbWVcIiB7Li4uaXRlbVByb3BzLm5pY2tuYW1lfSAvPlxuICogICAgICAgPEZvcm0uUGFzc3dvcmRGaWVsZFxuICogICAgICAgICB0aXRsZT1cIlBhc3N3b3JkXCJcbiAqICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciBwYXNzd29yZCBhdCBsZWFzdCA4IGNoYXJhY3RlcnMgbG9uZ1wiXG4gKiAgICAgICAgIHsuLi5pdGVtUHJvcHMucGFzc3dvcmR9XG4gKiAgICAgICAvPlxuICogICAgIDwvRm9ybT5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRm9ybTxUIGV4dGVuZHMgRm9ybS5WYWx1ZXM+KHByb3BzOiB7XG4gIC8qKiBDYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGZvcm0gaXMgc3VibWl0dGVkIGFuZCBhbGwgdmFsaWRhdGlvbnMgcGFzcy4gKi9cbiAgb25TdWJtaXQ6ICh2YWx1ZXM6IFQpID0+IHZvaWQgfCBib29sZWFuIHwgUHJvbWlzZTx2b2lkIHwgYm9vbGVhbj47XG4gIC8qKiBUaGUgaW5pdGlhbCB2YWx1ZXMgdG8gc2V0IHdoZW4gdGhlIEZvcm0gaXMgZmlyc3QgcmVuZGVyZWQuICovXG4gIGluaXRpYWxWYWx1ZXM/OiBQYXJ0aWFsPFQ+O1xuICAvKiogVGhlIHZhbGlkYXRpb24gcnVsZXMgZm9yIHRoZSBGb3JtLiBBIHZhbGlkYXRpb24gZm9yIGEgRm9ybSBpdGVtIGlzIGEgZnVuY3Rpb24gdGhhdCB0YWtlcyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgaXRlbSBhcyBhbiBhcmd1bWVudCBhbmQgbXVzdCByZXR1cm4gYSBzdHJpbmcgd2hlbiB0aGUgdmFsaWRhdGlvbiBpcyBmYWlsaW5nLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgYWxzbyBzb21lIHNob3J0aGFuZHMgZm9yIGNvbW1vbiBjYXNlcywgc2VlIHtAbGluayBGb3JtVmFsaWRhdGlvbn0uXG4gICAqICovXG4gIHZhbGlkYXRpb24/OiBWYWxpZGF0aW9uPFQ+O1xufSk6IEZvcm1Qcm9wczxUPiB7XG4gIGNvbnN0IHsgb25TdWJtaXQ6IF9vblN1Ym1pdCwgdmFsaWRhdGlvbiwgaW5pdGlhbFZhbHVlcyA9IHt9IH0gPSBwcm9wcztcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIGl0J3MgZmluZSBpZiB3ZSBkb24ndCBzcGVjaWZ5IGFsbCB0aGUgdmFsdWVzXG4gIGNvbnN0IFt2YWx1ZXMsIHNldFZhbHVlc10gPSB1c2VTdGF0ZTxUPihpbml0aWFsVmFsdWVzKTtcbiAgY29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlPHsgW2lkIGluIGtleW9mIFRdPzogVmFsaWRhdGlvbkVycm9yIH0+KHt9KTtcbiAgY29uc3QgcmVmcyA9IHVzZVJlZjx7IFtpZCBpbiBrZXlvZiBUXT86IEZvcm0uSXRlbVJlZmVyZW5jZSB9Pih7fSk7XG5cbiAgY29uc3QgbGF0ZXN0VmFsaWRhdGlvbiA9IHVzZUxhdGVzdDxWYWxpZGF0aW9uPFQ+Pih2YWxpZGF0aW9uIHx8IHt9KTtcbiAgY29uc3QgbGF0ZXN0T25TdWJtaXQgPSB1c2VMYXRlc3QoX29uU3VibWl0KTtcblxuICBjb25zdCBmb2N1cyA9IHVzZUNhbGxiYWNrKFxuICAgIChpZDoga2V5b2YgVCkgPT4ge1xuICAgICAgcmVmcy5jdXJyZW50W2lkXT8uZm9jdXMoKTtcbiAgICB9LFxuICAgIFtyZWZzXSxcbiAgKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodmFsdWVzOiBUKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICBsZXQgdmFsaWRhdGlvbkVycm9yczogZmFsc2UgfCB7IFtrZXkgaW4ga2V5b2YgVF0/OiBWYWxpZGF0aW9uRXJyb3IgfSA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBbaWQsIHZhbGlkYXRpb25dIG9mIE9iamVjdC5lbnRyaWVzKGxhdGVzdFZhbGlkYXRpb24uY3VycmVudCkpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSB2YWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbiwgdmFsdWVzW2lkXSk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGlmICghdmFsaWRhdGlvbkVycm9ycykge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuICAgICAgICAgICAgLy8gd2UgZm9jdXMgdGhlIGZpcnN0IGl0ZW0gdGhhdCBoYXMgYW4gZXJyb3JcbiAgICAgICAgICAgIGZvY3VzKGlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yc1tpZCBhcyBrZXlvZiBUXSA9IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmFsaWRhdGlvbkVycm9ycykge1xuICAgICAgICBzZXRFcnJvcnModmFsaWRhdGlvbkVycm9ycyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGxhdGVzdE9uU3VibWl0LmN1cnJlbnQodmFsdWVzKTtcbiAgICAgIHJldHVybiB0eXBlb2YgcmVzdWx0ID09PSBcImJvb2xlYW5cIiA/IHJlc3VsdCA6IHRydWU7XG4gICAgfSxcbiAgICBbbGF0ZXN0VmFsaWRhdGlvbiwgbGF0ZXN0T25TdWJtaXQsIGZvY3VzXSxcbiAgKTtcblxuICBjb25zdCBzZXRWYWxpZGF0aW9uRXJyb3IgPSB1c2VDYWxsYmFjayhcbiAgICAoaWQ6IGtleW9mIFQsIGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IHtcbiAgICAgIHNldEVycm9ycygoZXJyb3JzKSA9PiAoeyAuLi5lcnJvcnMsIFtpZF06IGVycm9yIH0pKTtcbiAgICB9LFxuICAgIFtzZXRFcnJvcnNdLFxuICApO1xuXG4gIGNvbnN0IHNldFZhbHVlID0gdXNlQ2FsbGJhY2soXG4gICAgZnVuY3Rpb24gPEsgZXh0ZW5kcyBrZXlvZiBUPihpZDogSywgdmFsdWU6IFNldFN0YXRlQWN0aW9uPFRbS10+KSB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRTIGlzIGFsd2F5cyBjb25mdXNlZCBhYm91dCBTZXRTdGF0ZUFjdGlvbiwgYnV0IGl0J3MgZmluZSBoZXJlXG4gICAgICBzZXRWYWx1ZXMoKHZhbHVlcykgPT4gKHsgLi4udmFsdWVzLCBbaWRdOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiA/IHZhbHVlKHZhbHVlc1tpZF0pIDogdmFsdWUgfSkpO1xuICAgIH0sXG4gICAgW3NldFZhbHVlc10sXG4gICk7XG5cbiAgY29uc3QgaXRlbVByb3BzID0gdXNlTWVtbzx7IFtpZCBpbiBrZXlvZiBSZXF1aXJlZDxUPl06IFBhcnRpYWw8Rm9ybS5JdGVtUHJvcHM8VFtpZF0+PiAmIHsgaWQ6IHN0cmluZyB9IH0+KCgpID0+IHtcbiAgICAvLyB3ZSBoYXZlIHRvIHVzZSBhIHByb3h5IGJlY2F1c2Ugd2UgZG9uJ3QgYWN0dWFsbHkgaGF2ZSBhbnkgb2JqZWN0IHRvIGl0ZXJhdGUgdGhyb3VnaFxuICAgIC8vIHNvIGluc3RlYWQgd2UgZHluYW1pY2FsbHkgY3JlYXRlIHRoZSBwcm9wcyB3aGVuIHJlcXVpcmVkXG4gICAgcmV0dXJuIG5ldyBQcm94eTx7IFtpZCBpbiBrZXlvZiBSZXF1aXJlZDxUPl06IFBhcnRpYWw8Rm9ybS5JdGVtUHJvcHM8VFtpZF0+PiAmIHsgaWQ6IHN0cmluZyB9IH0+KFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGUgd2hvbGUgcG9pbnQgb2YgYSBwcm94eS4uLlxuICAgICAge30sXG4gICAgICB7XG4gICAgICAgIGdldCh0YXJnZXQsIGlkOiBrZXlvZiBUKSB7XG4gICAgICAgICAgY29uc3QgdmFsaWRhdGlvbiA9IGxhdGVzdFZhbGlkYXRpb24uY3VycmVudFtpZF07XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB2YWx1ZXNbaWRdO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbkNoYW5nZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBpZiAoZXJyb3JzW2lkXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdGlvbkVycm9yKHZhbGlkYXRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgICBzZXRWYWxpZGF0aW9uRXJyb3IoaWQsIHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNldFZhbHVlKGlkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdGlvbkVycm9yKHZhbGlkYXRpb24sIGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIHNldFZhbGlkYXRpb25FcnJvcihpZCwgZXJyb3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGVycm9yc1tpZF0sXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZG4ndCByZXR1cm4gYHVuZGVmaW5lZGAgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgYW4gdW5jb250cm9sbGVkIGNvbXBvbmVudFxuICAgICAgICAgICAgdmFsdWU6IHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiB2YWx1ZSxcbiAgICAgICAgICAgIHJlZjogKGluc3RhbmNlOiBGb3JtLkl0ZW1SZWZlcmVuY2UpID0+IHtcbiAgICAgICAgICAgICAgcmVmcy5jdXJyZW50W2lkXSA9IGluc3RhbmNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9IGFzIFBhcnRpYWw8Rm9ybS5JdGVtUHJvcHM8VFtrZXlvZiBUXT4+ICYgeyBpZDogc3RyaW5nIH07XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICk7XG4gIH0sIFtlcnJvcnMsIGxhdGVzdFZhbGlkYXRpb24sIHNldFZhbGlkYXRpb25FcnJvciwgdmFsdWVzLCByZWZzLCBzZXRWYWx1ZV0pO1xuXG4gIGNvbnN0IHJlc2V0ID0gdXNlQ2FsbGJhY2soXG4gICAgKHZhbHVlcz86IFBhcnRpYWw8VD4pID0+IHtcbiAgICAgIHNldEVycm9ycyh7fSk7XG4gICAgICBPYmplY3QuZW50cmllcyhyZWZzLmN1cnJlbnQpLmZvckVhY2goKFtpZCwgcmVmXSkgPT4ge1xuICAgICAgICBpZiAoIXZhbHVlcz8uW2lkXSkge1xuICAgICAgICAgIHJlZj8ucmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgaXQncyBmaW5lIGlmIHdlIGRvbid0IHNwZWNpZnkgYWxsIHRoZSB2YWx1ZXNcbiAgICAgICAgc2V0VmFsdWVzKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbc2V0VmFsdWVzLCBzZXRFcnJvcnMsIHJlZnNdLFxuICApO1xuXG4gIHJldHVybiB7IGhhbmRsZVN1Ym1pdCwgc2V0VmFsaWRhdGlvbkVycm9yLCBzZXRWYWx1ZSwgdmFsdWVzLCBpdGVtUHJvcHMsIGZvY3VzLCByZXNldCB9O1xufVxuIiwgImltcG9ydCB7IHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFJIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgUHJvbWlzZU9wdGlvbnMsIHVzZVByb21pc2UgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5pbXBvcnQgeyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqIFN0cmVhbSBhIHByb21wdCBjb21wbGV0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBEZXRhaWwsIExhdW5jaFByb3BzIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlIEFJIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZChwcm9wczogTGF1bmNoUHJvcHM8eyBhcmd1bWVudHM6IHsgcHJvbXB0OiBzdHJpbmcgfSB9Pikge1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSB9ID0gdXNlQUkocHJvcHMuYXJndW1lbnRzLnByb21wdCk7XG4gKlxuICogICByZXR1cm4gPERldGFpbCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gbWFya2Rvd249e2RhdGF9IC8+O1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VBSShcbiAgcHJvbXB0OiBzdHJpbmcsXG4gIG9wdGlvbnM6IHtcbiAgICAvKipcbiAgICAgKiBDb25jcmV0ZSB0YXNrcywgc3VjaCBhcyBmaXhpbmcgZ3JhbW1hciwgcmVxdWlyZSBsZXNzIGNyZWF0aXZpdHkgd2hpbGUgb3Blbi1lbmRlZCBxdWVzdGlvbnMsIHN1Y2ggYXMgZ2VuZXJhdGluZyBpZGVhcywgcmVxdWlyZSBtb3JlLlxuICAgICAqIElmIGEgbnVtYmVyIGlzIHBhc3NlZCwgaXQgbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlIDAtMi4gRm9yIGxhcmdlciB2YWx1ZXMsIDIgd2lsbCBiZSB1c2VkLiBGb3IgbG93ZXIgdmFsdWVzLCAwIHdpbGwgYmUgdXNlZC5cbiAgICAgKi9cbiAgICBjcmVhdGl2aXR5PzogQUkuQ3JlYXRpdml0eTtcbiAgICAvKipcbiAgICAgKiBUaGUgQUkgbW9kZWwgdG8gdXNlIHRvIGFuc3dlciB0byB0aGUgcHJvbXB0LlxuICAgICAqL1xuICAgIG1vZGVsPzogQUkuTW9kZWw7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzdHJlYW0gdGhlIGFuc3dlciBvciBvbmx5IHVwZGF0ZSB0aGUgZGF0YSB3aGVuIHRoZSBlbnRpcmUgYW5zd2VyIGhhcyBiZWVuIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHN0cmVhbT86IGJvb2xlYW47XG4gIH0gJiBPbWl0PFByb21pc2VPcHRpb25zPEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZT4sIFwiYWJvcnRhYmxlXCI+ID0ge30sXG4pIHtcbiAgY29uc3QgeyBjcmVhdGl2aXR5LCBzdHJlYW0sIG1vZGVsLCAuLi51c2VQcm9taXNlT3B0aW9ucyB9ID0gb3B0aW9ucztcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KG51bGwpO1xuICBjb25zdCB7IGlzTG9hZGluZywgZXJyb3IsIHJldmFsaWRhdGUgfSA9IHVzZVByb21pc2UoXG4gICAgYXN5bmMgKHByb21wdDogc3RyaW5nLCBjcmVhdGl2aXR5PzogQUkuQ3JlYXRpdml0eSwgc2hvdWxkU3RyZWFtPzogYm9vbGVhbikgPT4ge1xuICAgICAgc2V0RGF0YShcIlwiKTtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IEFJLmFzayhwcm9tcHQsIHsgY3JlYXRpdml0eSwgbW9kZWwsIHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCB9KTtcbiAgICAgIGlmIChzaG91bGRTdHJlYW0gPT09IGZhbHNlKSB7XG4gICAgICAgIHNldERhdGEoYXdhaXQgc3RyZWFtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmVhbS5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcbiAgICAgICAgICBzZXREYXRhKCh4KSA9PiB4ICsgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBzdHJlYW07XG4gICAgICB9XG4gICAgfSxcbiAgICBbcHJvbXB0LCBjcmVhdGl2aXR5LCBzdHJlYW1dLFxuICAgIHsgLi4udXNlUHJvbWlzZU9wdGlvbnMsIGFib3J0YWJsZSB9LFxuICApO1xuXG4gIHJldHVybiB7IGlzTG9hZGluZywgZGF0YSwgZXJyb3IsIHJldmFsaWRhdGUgfTtcbn1cbiIsICJpbXBvcnQgeyB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyB1c2VDYWNoZWRTdGF0ZSB9IGZyb20gXCIuL3VzZUNhY2hlZFN0YXRlXCI7XG5cbi8vIFRoZSBhbGdvcml0aG0gYmVsb3cgaXMgaW5zcGlyZWQgYnkgdGhlIG9uZSB1c2VkIGJ5IEZpcmVmb3g6XG4vLyBodHRwczovL3dpa2kubW96aWxsYS5vcmcvVXNlcjpKZXNzZS9OZXdGcmVjZW5jeVxuXG50eXBlIEZyZWNlbmN5ID0ge1xuICBsYXN0VmlzaXRlZDogbnVtYmVyO1xuICBmcmVjZW5jeTogbnVtYmVyO1xufTtcblxuY29uc3QgSEFMRl9MSUZFX0RBWVMgPSAxMDtcblxuY29uc3QgTVNfUEVSX0RBWSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG5cbmNvbnN0IFZJU0lUX1RZUEVfUE9JTlRTID0ge1xuICBEZWZhdWx0OiAxMDAsXG4gIEVtYmVkOiAwLFxuICBCb29rbWFyazogMTQwLFxufTtcblxuZnVuY3Rpb24gZ2V0TmV3RnJlY2VuY3koaXRlbT86IEZyZWNlbmN5KTogRnJlY2VuY3kge1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBsYXN0VmlzaXRlZCA9IGl0ZW0gPyBpdGVtLmxhc3RWaXNpdGVkIDogMDtcbiAgY29uc3QgZnJlY2VuY3kgPSBpdGVtID8gaXRlbS5mcmVjZW5jeSA6IDA7XG5cbiAgY29uc3QgdmlzaXRBZ2VJbkRheXMgPSAobm93IC0gbGFzdFZpc2l0ZWQpIC8gTVNfUEVSX0RBWTtcbiAgY29uc3QgREVDQVlfUkFURV9DT05TVEFOVCA9IE1hdGgubG9nKDIpIC8gKEhBTEZfTElGRV9EQVlTICogTVNfUEVSX0RBWSk7XG4gIGNvbnN0IGN1cnJlbnRWaXNpdFZhbHVlID0gVklTSVRfVFlQRV9QT0lOVFMuRGVmYXVsdCAqIE1hdGguZXhwKC1ERUNBWV9SQVRFX0NPTlNUQU5UICogdmlzaXRBZ2VJbkRheXMpO1xuICBjb25zdCB0b3RhbFZpc2l0VmFsdWUgPSBmcmVjZW5jeSArIGN1cnJlbnRWaXNpdFZhbHVlO1xuXG4gIHJldHVybiB7XG4gICAgbGFzdFZpc2l0ZWQ6IG5vdyxcbiAgICBmcmVjZW5jeTogdG90YWxWaXNpdFZhbHVlLFxuICB9O1xufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuY29uc3QgZGVmYXVsdEtleSA9IChpdGVtOiBhbnkpOiBzdHJpbmcgPT4ge1xuICBpZiAoXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgKHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiIHx8ICFpdGVtIHx8ICEoXCJpZFwiIGluIGl0ZW0pIHx8IHR5cGVvZiBpdGVtLmlkICE9IFwic3RyaW5nXCIpXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNwZWNpZnkgYSBrZXkgZnVuY3Rpb24gb3IgbWFrZSBzdXJlIHlvdXIgaXRlbXMgaGF2ZSBhbiAnaWQnIHByb3BlcnR5XCIpO1xuICB9XG4gIHJldHVybiBpdGVtLmlkO1xufTtcblxuLyoqXG4gKiBTb3J0IGFuIGFycmF5IGJ5IGl0cyBmcmVjZW5jeSBhbmQgcHJvdmlkZSBtZXRob2RzIHRvIHVwZGF0ZSB0aGUgZnJlY2VuY3kgb2YgaXRzIGl0ZW1zLlxuICogRnJlY2VuY3kgaXMgYSBtZWFzdXJlIHRoYXQgY29tYmluZXMgZnJlcXVlbmN5IGFuZCByZWNlbmN5LiBUaGUgbW9yZSBvZnRlbiBhbiBpdGVtIGlzIHZpc2l0ZWQvdXNlZCwgYW5kIHRoZSBtb3JlIHJlY2VudGx5IGFuIGl0ZW0gaXMgdmlzaXRlZC91c2VkLCB0aGUgaGlnaGVyIGl0IHdpbGwgcmFuay5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBMaXN0LCBBY3Rpb25QYW5lbCwgQWN0aW9uLCBJY29uIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlRmV0Y2gsIHVzZUZyZWNlbmN5U29ydGluZyB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhIH0gPSB1c2VGZXRjaChcImh0dHBzOi8vYXBpLmV4YW1wbGVcIik7XG4gKiAgIGNvbnN0IHsgZGF0YTogc29ydGVkRGF0YSwgdmlzaXRJdGVtLCByZXNldFJhbmtpbmcgfSA9IHVzZUZyZWNlbmN5U29ydGluZyhkYXRhKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlxuICogICAgICAge3NvcnRlZERhdGEubWFwKChpdGVtKSA9PiAoXG4gKiAgICAgICAgIDxMaXN0Lkl0ZW1cbiAqICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gKiAgICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gKiAgICAgICAgICAgYWN0aW9ucz17XG4gKiAgICAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgICAgIDxBY3Rpb24uT3BlbkluQnJvd3NlciB1cmw9e2l0ZW0udXJsfSBvbk9wZW49eygpID0+IHZpc2l0SXRlbShpdGVtKX0gLz5cbiAqICAgICAgICAgICAgICAgPEFjdGlvbi5Db3B5VG9DbGlwYm9hcmQgdGl0bGU9XCJDb3B5IExpbmtcIiBjb250ZW50PXtpdGVtLnVybH0gb25Db3B5PXsoKSA9PiB2aXNpdEl0ZW0oaXRlbSl9IC8+XG4gKiAgICAgICAgICAgICAgIDxBY3Rpb24gdGl0bGU9XCJSZXNldCBSYW5raW5nXCIgaWNvbj17SWNvbi5BcnJvd0NvdW50ZXJDbG9ja3dpc2V9IG9uQWN0aW9uPXsoKSA9PiByZXNldFJhbmtpbmcoaXRlbSl9IC8+XG4gKiAgICAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICogICAgICAgICAgIH1cbiAqICAgICAgICAgLz5cbiAqICAgICAgICkpfVxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZyZWNlbmN5U29ydGluZzxUIGV4dGVuZHMgeyBpZDogc3RyaW5nIH0+KFxuICBkYXRhPzogVFtdLFxuICBvcHRpb25zPzogeyBuYW1lc3BhY2U/OiBzdHJpbmc7IGtleT86IChpdGVtOiBUKSA9PiBzdHJpbmc7IHNvcnRVbnZpc2l0ZWQ/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyIH0sXG4pOiB7XG4gIGRhdGE6IFRbXTtcbiAgdmlzaXRJdGVtOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcmVzZXRSYW5raW5nOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5leHBvcnQgZnVuY3Rpb24gdXNlRnJlY2VuY3lTb3J0aW5nPFQ+KFxuICBkYXRhOiBUW10gfCB1bmRlZmluZWQsXG4gIG9wdGlvbnM6IHsgbmFtZXNwYWNlPzogc3RyaW5nOyBrZXk6IChpdGVtOiBUKSA9PiBzdHJpbmc7IHNvcnRVbnZpc2l0ZWQ/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyIH0sXG4pOiB7XG4gIGRhdGE6IFRbXTtcbiAgdmlzaXRJdGVtOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcmVzZXRSYW5raW5nOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5leHBvcnQgZnVuY3Rpb24gdXNlRnJlY2VuY3lTb3J0aW5nPFQ+KFxuICBkYXRhPzogVFtdLFxuICBvcHRpb25zPzogeyBuYW1lc3BhY2U/OiBzdHJpbmc7IGtleT86IChpdGVtOiBUKSA9PiBzdHJpbmc7IHNvcnRVbnZpc2l0ZWQ/OiAoYTogVCwgYjogVCkgPT4gbnVtYmVyIH0sXG4pOiB7XG4gIGRhdGE6IFRbXTtcbiAgdmlzaXRJdGVtOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcmVzZXRSYW5raW5nOiAoaXRlbTogVCkgPT4gUHJvbWlzZTx2b2lkPjtcbn0ge1xuICBjb25zdCBrZXlSZWYgPSB1c2VMYXRlc3Qob3B0aW9ucz8ua2V5IHx8IGRlZmF1bHRLZXkpO1xuICBjb25zdCBzb3J0VW52aXNpdGVkUmVmID0gdXNlTGF0ZXN0KG9wdGlvbnM/LnNvcnRVbnZpc2l0ZWQpO1xuXG4gIGNvbnN0IFtzdG9yZWRGcmVjZW5jaWVzLCBzZXRTdG9yZWRGcmVjZW5jaWVzXSA9IHVzZUNhY2hlZFN0YXRlPFJlY29yZDxzdHJpbmcsIEZyZWNlbmN5IHwgdW5kZWZpbmVkPj4oXG4gICAgYHJheWNhc3RfZnJlY2VuY3lfJHtvcHRpb25zPy5uYW1lc3BhY2V9YCxcbiAgICB7fSxcbiAgKTtcblxuICBjb25zdCB2aXNpdEl0ZW0gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyBmdW5jdGlvbiB1cGRhdGVGcmVjZW5jeShpdGVtOiBUKSB7XG4gICAgICBjb25zdCBpdGVtS2V5ID0ga2V5UmVmLmN1cnJlbnQoaXRlbSk7XG5cbiAgICAgIHNldFN0b3JlZEZyZWNlbmNpZXMoKHN0b3JlZEZyZWNlbmNpZXMpID0+IHtcbiAgICAgICAgY29uc3QgZnJlY2VuY3kgPSBzdG9yZWRGcmVjZW5jaWVzW2l0ZW1LZXldO1xuICAgICAgICBjb25zdCBuZXdGcmVjZW5jeSA9IGdldE5ld0ZyZWNlbmN5KGZyZWNlbmN5KTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0b3JlZEZyZWNlbmNpZXMsXG4gICAgICAgICAgW2l0ZW1LZXldOiBuZXdGcmVjZW5jeSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2tleVJlZiwgc2V0U3RvcmVkRnJlY2VuY2llc10sXG4gICk7XG5cbiAgY29uc3QgcmVzZXRSYW5raW5nID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlRnJlY2VuY3koaXRlbTogVCkge1xuICAgICAgY29uc3QgaXRlbUtleSA9IGtleVJlZi5jdXJyZW50KGl0ZW0pO1xuXG4gICAgICBzZXRTdG9yZWRGcmVjZW5jaWVzKChzdG9yZWRGcmVjZW5jaWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ZyZW5jZW5jaWVzID0geyAuLi5zdG9yZWRGcmVjZW5jaWVzIH07XG4gICAgICAgIGRlbGV0ZSBuZXdGcmVuY2VuY2llc1tpdGVtS2V5XTtcblxuICAgICAgICByZXR1cm4gbmV3RnJlbmNlbmNpZXM7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtrZXlSZWYsIHNldFN0b3JlZEZyZWNlbmNpZXNdLFxuICApO1xuXG4gIGNvbnN0IHNvcnRlZERhdGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBmcmVjZW5jeUEgPSBzdG9yZWRGcmVjZW5jaWVzW2tleVJlZi5jdXJyZW50KGEpXTtcbiAgICAgIGNvbnN0IGZyZWNlbmN5QiA9IHN0b3JlZEZyZWNlbmNpZXNba2V5UmVmLmN1cnJlbnQoYildO1xuXG4gICAgICAvLyBJZiBhIGhhcyBhIGZyZWNlbmN5LCBidXQgYiBkb2Vzbid0LCBhIHNob3VsZCBjb21lIGZpcnN0XG4gICAgICBpZiAoZnJlY2VuY3lBICYmICFmcmVjZW5jeUIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBiIGhhcyBhIGZyZWNlbmN5LCBidXQgYSBkb2Vzbid0LCBiIHNob3VsZCBjb21lIGZpcnN0XG4gICAgICBpZiAoIWZyZWNlbmN5QSAmJiBmcmVjZW5jeUIpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGJvdGggZnJlY2VuY2llcyBhcmUgZGVmaW5lZCxwdXQgdGhlIG9uZSB3aXRoIHRoZSBoaWdoZXIgZnJlY2VuY3kgZmlyc3RcbiAgICAgIGlmIChmcmVjZW5jeUEgJiYgZnJlY2VuY3lCKSB7XG4gICAgICAgIHJldHVybiBmcmVjZW5jeUIuZnJlY2VuY3kgLSBmcmVjZW5jeUEuZnJlY2VuY3k7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGJvdGggZnJlY2VuY2llcyBhcmUgdW5kZWZpbmVkLCBrZWVwIHRoZSBvcmlnaW5hbCBvcmRlclxuICAgICAgcmV0dXJuIHNvcnRVbnZpc2l0ZWRSZWYuY3VycmVudCA/IHNvcnRVbnZpc2l0ZWRSZWYuY3VycmVudChhLCBiKSA6IDA7XG4gICAgfSk7XG4gIH0sIFtzdG9yZWRGcmVjZW5jaWVzLCBkYXRhLCBrZXlSZWYsIHNvcnRVbnZpc2l0ZWRSZWZdKTtcblxuICByZXR1cm4geyBkYXRhOiBzb3J0ZWREYXRhLCB2aXNpdEl0ZW0sIHJlc2V0UmFua2luZyB9O1xufVxuIiwgImltcG9ydCB7IExvY2FsU3RvcmFnZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiLi9zaG93RmFpbHVyZVRvYXN0XCI7XG5pbXBvcnQgeyByZXBsYWNlciwgcmV2aXZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB7IHVzZVByb21pc2UgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5cbi8qKlxuICogQSBob29rIHRvIG1hbmFnZSBhIHZhbHVlIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICpcbiAqIEByZW1hcmsgVGhlIHZhbHVlIGlzIHN0b3JlZCBhcyBhIEpTT04gc3RyaW5nIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICpcbiAqIEBwYXJhbSBrZXkgLSBUaGUga2V5IHRvIHVzZSBmb3IgdGhlIHZhbHVlIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICogQHBhcmFtIGluaXRpYWxWYWx1ZSAtIFRoZSBpbml0aWFsIHZhbHVlIHRvIHVzZSBpZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3QgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXM6XG4gKiAtIGB2YWx1ZWA6IFRoZSB2YWx1ZSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlIG9yIHRoZSBpbml0aWFsIHZhbHVlIGlmIHRoZSBrZXkgZG9lc24ndCBleGlzdC5cbiAqIC0gYHNldFZhbHVlYDogQSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZhbHVlIGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICogLSBgcmVtb3ZlVmFsdWVgOiBBIGZ1bmN0aW9uIHRvIHJlbW92ZSB0aGUgdmFsdWUgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqIC0gYGlzTG9hZGluZ2A6IEEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB2YWx1ZSBpcyBsb2FkaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGNvbnN0IHsgdmFsdWUsIHNldFZhbHVlIH0gPSB1c2VMb2NhbFN0b3JhZ2U8c3RyaW5nPihcIm15LWtleVwiKTtcbiAqIGNvbnN0IHsgdmFsdWUsIHNldFZhbHVlIH0gPSB1c2VMb2NhbFN0b3JhZ2U8c3RyaW5nPihcIm15LWtleVwiLCBcImRlZmF1bHQgdmFsdWVcIik7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvY2FsU3RvcmFnZTxUPihrZXk6IHN0cmluZywgaW5pdGlhbFZhbHVlPzogVCkge1xuICBjb25zdCB7XG4gICAgZGF0YTogdmFsdWUsXG4gICAgaXNMb2FkaW5nLFxuICAgIG11dGF0ZSxcbiAgfSA9IHVzZVByb21pc2UoXG4gICAgYXN5bmMgKHN0b3JhZ2VLZXk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGF3YWl0IExvY2FsU3RvcmFnZS5nZXRJdGVtPHN0cmluZz4oc3RvcmFnZUtleSk7XG5cbiAgICAgIHJldHVybiB0eXBlb2YgaXRlbSAhPT0gXCJ1bmRlZmluZWRcIiA/IChKU09OLnBhcnNlKGl0ZW0sIHJldml2ZXIpIGFzIFQpIDogaW5pdGlhbFZhbHVlO1xuICAgIH0sXG4gICAgW2tleV0sXG4gICk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gc2V0VmFsdWUodmFsdWU6IFQpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbXV0YXRlKExvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUsIHJlcGxhY2VyKSksIHtcbiAgICAgICAgb3B0aW1pc3RpY1VwZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7IHRpdGxlOiBcIkZhaWxlZCB0byBzZXQgdmFsdWUgaW4gbG9jYWwgc3RvcmFnZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHJlbW92ZVZhbHVlKCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBtdXRhdGUoTG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSwge1xuICAgICAgICBvcHRpbWlzdGljVXBkYXRlKCkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwgeyB0aXRsZTogXCJGYWlsZWQgdG8gcmVtb3ZlIHZhbHVlIGZyb20gbG9jYWwgc3RvcmFnZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IHZhbHVlLCBzZXRWYWx1ZSwgcmVtb3ZlVmFsdWUsIGlzTG9hZGluZyB9O1xufVxuIiwgImV4cG9ydCB7IGdldEF2YXRhckljb24gfSBmcm9tIFwiLi9hdmF0YXJcIjtcbmV4cG9ydCB7IGdldEZhdmljb24gfSBmcm9tIFwiLi9mYXZpY29uXCI7XG5leHBvcnQgeyBnZXRQcm9ncmVzc0ljb24gfSBmcm9tIFwiLi9wcm9ncmVzc1wiO1xuIiwgImltcG9ydCB0eXBlIHsgSW1hZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBzbGlnaHRseUxpZ2h0ZXJDb2xvciwgc2xpZ2h0bHlEYXJrZXJDb2xvciB9IGZyb20gXCIuL2NvbG9yXCI7XG5cbmZ1bmN0aW9uIGdldFdob2xlQ2hhckFuZEkoc3RyOiBzdHJpbmcsIGk6IG51bWJlcik6IFtzdHJpbmcsIG51bWJlcl0ge1xuICBjb25zdCBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XG5cbiAgaWYgKE51bWJlci5pc05hTihjb2RlKSkge1xuICAgIHJldHVybiBbXCJcIiwgaV07XG4gIH1cbiAgaWYgKGNvZGUgPCAweGQ4MDAgfHwgY29kZSA+IDB4ZGZmZikge1xuICAgIHJldHVybiBbc3RyLmNoYXJBdChpKSwgaV07IC8vIE5vcm1hbCBjaGFyYWN0ZXIsIGtlZXBpbmcgJ2knIHRoZSBzYW1lXG4gIH1cblxuICAvLyBIaWdoIHN1cnJvZ2F0ZSAoY291bGQgY2hhbmdlIGxhc3QgaGV4IHRvIDB4REI3RiB0byB0cmVhdCBoaWdoIHByaXZhdGVcbiAgLy8gc3Vycm9nYXRlcyBhcyBzaW5nbGUgY2hhcmFjdGVycylcbiAgaWYgKDB4ZDgwMCA8PSBjb2RlICYmIGNvZGUgPD0gMHhkYmZmKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPD0gaSArIDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhpZ2ggc3Vycm9nYXRlIHdpdGhvdXQgZm9sbG93aW5nIGxvdyBzdXJyb2dhdGVcIik7XG4gICAgfVxuICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckNvZGVBdChpICsgMSk7XG4gICAgaWYgKDB4ZGMwMCA+IG5leHQgfHwgbmV4dCA+IDB4ZGZmZikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGlnaCBzdXJyb2dhdGUgd2l0aG91dCBmb2xsb3dpbmcgbG93IHN1cnJvZ2F0ZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFtzdHIuY2hhckF0KGkpICsgc3RyLmNoYXJBdChpICsgMSksIGkgKyAxXTtcbiAgfVxuXG4gIC8vIExvdyBzdXJyb2dhdGUgKDB4REMwMCA8PSBjb2RlICYmIGNvZGUgPD0gMHhERkZGKVxuICBpZiAoaSA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkxvdyBzdXJyb2dhdGUgd2l0aG91dCBwcmVjZWRpbmcgaGlnaCBzdXJyb2dhdGVcIik7XG4gIH1cblxuICBjb25zdCBwcmV2ID0gc3RyLmNoYXJDb2RlQXQoaSAtIDEpO1xuXG4gIC8vIChjb3VsZCBjaGFuZ2UgbGFzdCBoZXggdG8gMHhEQjdGIHRvIHRyZWF0IGhpZ2ggcHJpdmF0ZSBzdXJyb2dhdGVzXG4gIC8vIGFzIHNpbmdsZSBjaGFyYWN0ZXJzKVxuICBpZiAoMHhkODAwID4gcHJldiB8fCBwcmV2ID4gMHhkYmZmKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTG93IHN1cnJvZ2F0ZSB3aXRob3V0IHByZWNlZGluZyBoaWdoIHN1cnJvZ2F0ZVwiKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgbmV4dCBjaGFyYWN0ZXIgaW5zdGVhZCAoYW5kIGluY3JlbWVudClcbiAgcmV0dXJuIFtzdHIuY2hhckF0KGkgKyAxKSwgaSArIDFdO1xufVxuXG5jb25zdCBhdmF0YXJDb2xvclNldCA9IFtcbiAgXCIjREM4MjlBXCIsIC8vIFBpbmtcbiAgXCIjRDY0ODU0XCIsIC8vIFJlZFxuICBcIiNENDc2MDBcIiwgLy8gWWVsbG93T3JhbmdlXG4gIFwiI0QzNkNERFwiLCAvLyBNYWdlbnRhXG4gIFwiIzUyQTlFNFwiLCAvLyBBcXVhXG4gIFwiIzc4NzFFOFwiLCAvLyBJbmRpZ29cbiAgXCIjNzA5MjBGXCIsIC8vIFllbGxvd0dyZWVuXG4gIFwiIzQzQjkzQVwiLCAvLyBHcmVlblxuICBcIiNFQjZCM0VcIiwgLy8gT3JhbmdlXG4gIFwiIzI2Qjc5NVwiLCAvLyBCbHVlR3JlZW5cbiAgXCIjRDg1QTlCXCIsIC8vIEhvdFBpbmtcbiAgXCIjQTA2N0RDXCIsIC8vIFB1cnBsZVxuICBcIiNCRDk1MDBcIiwgLy8gWWVsbG93XG4gIFwiIzUzODVEOVwiLCAvLyBCbHVlXG5dO1xuXG4vKipcbiAqIEljb24gdG8gcmVwcmVzZW50IGFuIGF2YXRhciB3aGVuIHlvdSBkb24ndCBoYXZlIG9uZS4gVGhlIGdlbmVyYXRlZCBhdmF0YXJcbiAqIHdpbGwgYmUgZ2VuZXJhdGVkIGZyb20gdGhlIGluaXRpYWxzIG9mIHRoZSBuYW1lIGFuZCBoYXZlIGEgY29sb3JmdWwgYnV0IGNvbnNpc3RlbnQgYmFja2dyb3VuZC5cbiAqXG4gKiBAcmV0dXJucyBhbiBJbWFnZSB0aGF0IGNhbiBiZSB1c2VkIHdoZXJlIFJheWNhc3QgZXhwZWN0cyB0aGVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIDxMaXN0Lkl0ZW0gaWNvbj17Z2V0QXZhdGFySWNvbignTWF0aGlldSBEdXRvdXInKX0gdGl0bGU9XCJQcm9qZWN0XCIgLz5cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXZhdGFySWNvbihcbiAgbmFtZTogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIEN1c3RvbSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICovXG4gICAgYmFja2dyb3VuZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSBhIGdyYWRpZW50IGZvciB0aGUgYmFja2dyb3VuZCBvciBub3QuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGdyYWRpZW50PzogYm9vbGVhbjtcbiAgfSxcbik6IEltYWdlLkFzc2V0IHtcbiAgY29uc3Qgd29yZHMgPSBuYW1lLnRyaW0oKS5zcGxpdChcIiBcIik7XG4gIGxldCBpbml0aWFsczogc3RyaW5nO1xuICBpZiAod29yZHMubGVuZ3RoID09IDEgJiYgZ2V0V2hvbGVDaGFyQW5kSSh3b3Jkc1swXSwgMClbMF0pIHtcbiAgICBpbml0aWFscyA9IGdldFdob2xlQ2hhckFuZEkod29yZHNbMF0sIDApWzBdO1xuICB9IGVsc2UgaWYgKHdvcmRzLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBmaXJzdFdvcmRGaXJzdExldHRlciA9IGdldFdob2xlQ2hhckFuZEkod29yZHNbMF0sIDApWzBdIHx8IFwiXCI7XG4gICAgY29uc3QgbGFzdFdvcmRGaXJzdExldHRlciA9IGdldFdob2xlQ2hhckFuZEkod29yZHNbd29yZHMubGVuZ3RoIC0gMV0sIDApWzBdID8/IFwiXCI7XG4gICAgaW5pdGlhbHMgPSBmaXJzdFdvcmRGaXJzdExldHRlciArIGxhc3RXb3JkRmlyc3RMZXR0ZXI7XG4gIH0gZWxzZSB7XG4gICAgaW5pdGlhbHMgPSBcIlwiO1xuICB9XG5cbiAgbGV0IGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuXG4gIGlmIChvcHRpb25zPy5iYWNrZ3JvdW5kKSB7XG4gICAgYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucz8uYmFja2dyb3VuZDtcbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5pdGlhbHNDaGFySW5kZXggPSAwO1xuICAgIGxldCBbY2hhciwgaV0gPSBnZXRXaG9sZUNoYXJBbmRJKGluaXRpYWxzLCAwKTtcbiAgICB3aGlsZSAoY2hhcikge1xuICAgICAgaW5pdGlhbHNDaGFySW5kZXggKz0gY2hhci5jaGFyQ29kZUF0KDApO1xuICAgICAgW2NoYXIsIGldID0gZ2V0V2hvbGVDaGFyQW5kSShpbml0aWFscywgaSArIDEpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbG9ySW5kZXggPSBpbml0aWFsc0NoYXJJbmRleCAlIGF2YXRhckNvbG9yU2V0Lmxlbmd0aDtcbiAgICBiYWNrZ3JvdW5kQ29sb3IgPSBhdmF0YXJDb2xvclNldFtjb2xvckluZGV4XTtcbiAgfVxuXG4gIGNvbnN0IHBhZGRpbmcgPSAwO1xuICBjb25zdCByYWRpdXMgPSA1MCAtIHBhZGRpbmc7XG5cbiAgY29uc3Qgc3ZnID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwcHhcIiBoZWlnaHQ9XCIxMDBweFwiPlxuICAke1xuICAgIG9wdGlvbnM/LmdyYWRpZW50ICE9PSBmYWxzZVxuICAgICAgPyBgPGRlZnM+XG4gICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJHcmFkaWVudFwiIHgxPVwiMC4yNVwiIHgyPVwiMC43NVwiIHkxPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3AtY29sb3I9XCIke3NsaWdodGx5TGlnaHRlckNvbG9yKGJhY2tncm91bmRDb2xvcil9XCIvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCI1MCVcIiBzdG9wLWNvbG9yPVwiJHtiYWNrZ3JvdW5kQ29sb3J9XCIvPlxuICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcC1jb2xvcj1cIiR7c2xpZ2h0bHlEYXJrZXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpfVwiLz5cbiAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gIDwvZGVmcz5gXG4gICAgICA6IFwiXCJcbiAgfVxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIke3JhZGl1c31cIiBmaWxsPVwiJHtcbiAgICAgICAgb3B0aW9ucz8uZ3JhZGllbnQgIT09IGZhbHNlID8gXCJ1cmwoI0dyYWRpZW50KVwiIDogYmFja2dyb3VuZENvbG9yXG4gICAgICB9XCIgLz5cbiAgICAgICR7XG4gICAgICAgIGluaXRpYWxzXG4gICAgICAgICAgPyBgPHRleHQgeD1cIjUwXCIgeT1cIjgwXCIgZm9udC1zaXplPVwiJHtcbiAgICAgICAgICAgICAgcmFkaXVzIC0gMVxuICAgICAgICAgICAgfVwiIGZvbnQtZmFtaWx5PVwiSW50ZXIsIHNhbnMtc2VyaWZcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiIGZpbGw9XCJ3aGl0ZVwiPiR7aW5pdGlhbHMudG9VcHBlckNhc2UoKX08L3RleHQ+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgIDwvc3ZnPlxuICBgLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIik7XG4gIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KHN2Zyl9YDtcbn1cbiIsICJmdW5jdGlvbiBoZXhUb1JHQihoZXg6IHN0cmluZykge1xuICBsZXQgciA9IDA7XG4gIGxldCBnID0gMDtcbiAgbGV0IGIgPSAwO1xuXG4gIC8vIDMgZGlnaXRzXG4gIGlmIChoZXgubGVuZ3RoID09PSA0KSB7XG4gICAgciA9IHBhcnNlSW50KGAke2hleFsxXX0ke2hleFsxXX1gLCAxNik7XG4gICAgZyA9IHBhcnNlSW50KGAke2hleFsyXX0ke2hleFsyXX1gLCAxNik7XG4gICAgYiA9IHBhcnNlSW50KGAke2hleFszXX0ke2hleFszXX1gLCAxNik7XG5cbiAgICAvLyA2IGRpZ2l0c1xuICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT09IDcpIHtcbiAgICByID0gcGFyc2VJbnQoYCR7aGV4WzFdfSR7aGV4WzJdfWAsIDE2KTtcbiAgICBnID0gcGFyc2VJbnQoYCR7aGV4WzNdfSR7aGV4WzRdfWAsIDE2KTtcbiAgICBiID0gcGFyc2VJbnQoYCR7aGV4WzVdfSR7aGV4WzZdfWAsIDE2KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYE1hbGZvcm1lZCBoZXggY29sb3I6ICR7aGV4fWApO1xuICB9XG5cbiAgcmV0dXJuIHsgciwgZywgYiB9O1xufVxuXG5mdW5jdGlvbiByZ2JUb0hleCh7IHIsIGcsIGIgfTogeyByOiBudW1iZXI7IGc6IG51bWJlcjsgYjogbnVtYmVyIH0pIHtcbiAgbGV0IHJTdHJpbmcgPSByLnRvU3RyaW5nKDE2KTtcbiAgbGV0IGdTdHJpbmcgPSBnLnRvU3RyaW5nKDE2KTtcbiAgbGV0IGJTdHJpbmcgPSBiLnRvU3RyaW5nKDE2KTtcblxuICBpZiAoclN0cmluZy5sZW5ndGggPT09IDEpIHtcbiAgICByU3RyaW5nID0gYDAke3JTdHJpbmd9YDtcbiAgfVxuICBpZiAoZ1N0cmluZy5sZW5ndGggPT09IDEpIHtcbiAgICBnU3RyaW5nID0gYDAke2dTdHJpbmd9YDtcbiAgfVxuICBpZiAoYlN0cmluZy5sZW5ndGggPT09IDEpIHtcbiAgICBiU3RyaW5nID0gYDAke2JTdHJpbmd9YDtcbiAgfVxuXG4gIHJldHVybiBgIyR7clN0cmluZ30ke2dTdHJpbmd9JHtiU3RyaW5nfWA7XG59XG5cbmZ1bmN0aW9uIHJnYlRvSFNMKHsgciwgZywgYiB9OiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfSkge1xuICAvLyBNYWtlIHIsIGcsIGFuZCBiIGZyYWN0aW9ucyBvZiAxXG4gIHIgLz0gMjU1O1xuICBnIC89IDI1NTtcbiAgYiAvPSAyNTU7XG5cbiAgLy8gRmluZCBncmVhdGVzdCBhbmQgc21hbGxlc3QgY2hhbm5lbCB2YWx1ZXNcbiAgY29uc3QgY21pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICBjb25zdCBjbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gIGNvbnN0IGRlbHRhID0gY21heCAtIGNtaW47XG4gIGxldCBoID0gMDtcbiAgbGV0IHMgPSAwO1xuICBsZXQgbCA9IDA7XG5cbiAgLy8gQ2FsY3VsYXRlIGh1ZVxuICAvLyBObyBkaWZmZXJlbmNlXG4gIGlmIChkZWx0YSA9PT0gMCkge1xuICAgIGggPSAwO1xuICB9XG4gIC8vIFJlZCBpcyBtYXhcbiAgZWxzZSBpZiAoY21heCA9PT0gcikge1xuICAgIGggPSAoKGcgLSBiKSAvIGRlbHRhKSAlIDY7XG4gIH1cbiAgLy8gR3JlZW4gaXMgbWF4XG4gIGVsc2UgaWYgKGNtYXggPT09IGcpIHtcbiAgICBoID0gKGIgLSByKSAvIGRlbHRhICsgMjtcbiAgfVxuICAvLyBCbHVlIGlzIG1heFxuICBlbHNlIHtcbiAgICBoID0gKHIgLSBnKSAvIGRlbHRhICsgNDtcbiAgfVxuXG4gIGggPSBNYXRoLnJvdW5kKGggKiA2MCk7XG5cbiAgLy8gTWFrZSBuZWdhdGl2ZSBodWVzIHBvc2l0aXZlIGJlaGluZCAzNjDCsFxuICBpZiAoaCA8IDApIHtcbiAgICBoICs9IDM2MDtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBsaWdodG5lc3NcbiAgbCA9IChjbWF4ICsgY21pbikgLyAyO1xuXG4gIC8vIENhbGN1bGF0ZSBzYXR1cmF0aW9uXG4gIHMgPSBkZWx0YSA9PT0gMCA/IDAgOiBkZWx0YSAvICgxIC0gTWF0aC5hYnMoMiAqIGwgLSAxKSk7XG5cbiAgLy8gTXVsdGlwbHkgbCBhbmQgcyBieSAxMDBcbiAgcyA9ICsocyAqIDEwMCkudG9GaXhlZCgxKTtcbiAgbCA9ICsobCAqIDEwMCkudG9GaXhlZCgxKTtcblxuICByZXR1cm4geyBoLCBzLCBsIH07XG59XG5cbmZ1bmN0aW9uIGhzbFRvUkdCKHsgaCwgcywgbCB9OiB7IGg6IG51bWJlcjsgczogbnVtYmVyOyBsOiBudW1iZXIgfSkge1xuICAvLyBNdXN0IGJlIGZyYWN0aW9ucyBvZiAxXG4gIHMgLz0gMTAwO1xuICBsIC89IDEwMDtcblxuICBjb25zdCBjID0gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKSAqIHM7XG4gIGNvbnN0IHggPSBjICogKDEgLSBNYXRoLmFicygoKGggLyA2MCkgJSAyKSAtIDEpKTtcbiAgY29uc3QgbSA9IGwgLSBjIC8gMjtcbiAgbGV0IHIgPSAwO1xuICBsZXQgZyA9IDA7XG4gIGxldCBiID0gMDtcblxuICBpZiAoaCA+PSAwICYmIGggPCA2MCkge1xuICAgIHIgPSBjO1xuICAgIGcgPSB4O1xuICAgIGIgPSAwO1xuICB9IGVsc2UgaWYgKGggPj0gNjAgJiYgaCA8IDEyMCkge1xuICAgIHIgPSB4O1xuICAgIGcgPSBjO1xuICAgIGIgPSAwO1xuICB9IGVsc2UgaWYgKGggPj0gMTIwICYmIGggPCAxODApIHtcbiAgICByID0gMDtcbiAgICBnID0gYztcbiAgICBiID0geDtcbiAgfSBlbHNlIGlmIChoID49IDE4MCAmJiBoIDwgMjQwKSB7XG4gICAgciA9IDA7XG4gICAgZyA9IHg7XG4gICAgYiA9IGM7XG4gIH0gZWxzZSBpZiAoaCA+PSAyNDAgJiYgaCA8IDMwMCkge1xuICAgIHIgPSB4O1xuICAgIGcgPSAwO1xuICAgIGIgPSBjO1xuICB9IGVsc2UgaWYgKGggPj0gMzAwICYmIGggPCAzNjApIHtcbiAgICByID0gYztcbiAgICBnID0gMDtcbiAgICBiID0geDtcbiAgfVxuICByID0gTWF0aC5yb3VuZCgociArIG0pICogMjU1KTtcbiAgZyA9IE1hdGgucm91bmQoKGcgKyBtKSAqIDI1NSk7XG4gIGIgPSBNYXRoLnJvdW5kKChiICsgbSkgKiAyNTUpO1xuXG4gIHJldHVybiB7IHIsIGcsIGIgfTtcbn1cblxuZnVuY3Rpb24gaGV4VG9IU0woaGV4OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHJnYlRvSFNMKGhleFRvUkdCKGhleCkpO1xufVxuXG5mdW5jdGlvbiBoc2xUb0hleChoc2w6IHsgaDogbnVtYmVyOyBzOiBudW1iZXI7IGw6IG51bWJlciB9KSB7XG4gIHJldHVybiByZ2JUb0hleChoc2xUb1JHQihoc2wpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XG4gIHJldHVybiBtaW4gPCBtYXggPyAodmFsdWUgPCBtaW4gPyBtaW4gOiB2YWx1ZSA+IG1heCA/IG1heCA6IHZhbHVlKSA6IHZhbHVlIDwgbWF4ID8gbWF4IDogdmFsdWUgPiBtaW4gPyBtaW4gOiB2YWx1ZTtcbn1cblxuY29uc3Qgb2Zmc2V0ID0gMTI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGlnaHRseURhcmtlckNvbG9yKGhleDogc3RyaW5nKSB7XG4gIGNvbnN0IGhzbCA9IGhleFRvSFNMKGhleCk7XG5cbiAgcmV0dXJuIGhzbFRvSGV4KHtcbiAgICBoOiBoc2wuaCxcbiAgICBzOiBoc2wucyxcbiAgICBsOiBjbGFtcChoc2wubCAtIG9mZnNldCwgMCwgMTAwKSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGlnaHRseUxpZ2h0ZXJDb2xvcihoZXg6IHN0cmluZykge1xuICBjb25zdCBoc2wgPSBoZXhUb0hTTChoZXgpO1xuXG4gIHJldHVybiBoc2xUb0hleCh7XG4gICAgaDogaHNsLmgsXG4gICAgczogaHNsLnMsXG4gICAgbDogY2xhbXAoaHNsLmwgKyBvZmZzZXQsIDAsIDEwMCksXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IEljb24sIEltYWdlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbi8qKlxuICogSWNvbiBzaG93aW5nIHRoZSBmYXZpY29uIG9mIGEgd2Vic2l0ZS5cbiAqXG4gKiBBIGZhdmljb24gKGZhdm9yaXRlIGljb24pIGlzIGEgdGlueSBpY29uIGluY2x1ZGVkIGFsb25nIHdpdGggYSB3ZWJzaXRlLCB3aGljaCBpcyBkaXNwbGF5ZWQgaW4gcGxhY2VzIGxpa2UgdGhlIGJyb3dzZXIncyBhZGRyZXNzIGJhciwgcGFnZSB0YWJzLCBhbmQgYm9va21hcmtzIG1lbnUuXG4gKlxuICogQHBhcmFtIHVybCBUaGUgVVJMIG9mIHRoZSB3ZWJzaXRlIHRvIHJlcHJlc2VudC5cbiAqXG4gKiBAcmV0dXJucyBhbiBJbWFnZSB0aGF0IGNhbiBiZSB1c2VkIHdoZXJlIFJheWNhc3QgZXhwZWN0cyB0aGVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIDxMaXN0Lkl0ZW0gaWNvbj17Z2V0RmF2aWNvbihcImh0dHBzOi8vcmF5Y2FzdC5jb21cIil9IHRpdGxlPVwiUmF5Y2FzdCBXZWJzaXRlXCIgLz5cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmF2aWNvbihcbiAgdXJsOiBzdHJpbmcgfCBVUkwsXG4gIG9wdGlvbnM/OiB7XG4gICAgLyoqXG4gICAgICogU2l6ZSBvZiB0aGUgRmF2aWNvblxuICAgICAqIEBkZWZhdWx0IDY0XG4gICAgICovXG4gICAgc2l6ZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBGYWxsYmFjayBpY29uIGluIGNhc2UgdGhlIEZhdmljb24gaXMgbm90IGZvdW5kLlxuICAgICAqIEBkZWZhdWx0IEljb24uTGlua1xuICAgICAqL1xuICAgIGZhbGxiYWNrPzogSW1hZ2UuRmFsbGJhY2s7XG4gICAgLyoqXG4gICAgICogQSB7QGxpbmsgSW1hZ2UuTWFza30gdG8gYXBwbHkgdG8gdGhlIEZhdmljb24uXG4gICAgICovXG4gICAgbWFzaz86IEltYWdlLk1hc2s7XG4gIH0sXG4pOiBJbWFnZS5JbWFnZUxpa2Uge1xuICB0cnkge1xuICAgIC8vIGEgZnVuYyBhZGRpbmcgaHR0cHM6Ly8gdG8gdGhlIFVSTFxuICAgIC8vIGZvciBjYXNlcyB3aGVyZSB0aGUgVVJMIGlzIG5vdCBhIGZ1bGwgVVJMXG4gICAgLy8gZS5nLiBcInJheWNhc3QuY29tXCJcbiAgICBjb25zdCBzYW5pdGl6ZSA9ICh1cmw6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF1cmwuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcbiAgICAgICAgcmV0dXJuIGBodHRwczovLyR7dXJsfWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH07XG5cbiAgICBjb25zdCB1cmxPYmogPSB0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiID8gbmV3IFVSTChzYW5pdGl6ZSh1cmwpKSA6IHVybDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHVybE9iai5ob3N0bmFtZTtcblxuICAgIGNvbnN0IGZhdmljb25Qcm92aWRlcjogXCJub25lXCIgfCBcInJheWNhc3RcIiB8IFwiYXBwbGVcIiB8IFwiZ29vZ2xlXCIgfCBcImR1Y2tEdWNrR29cIiB8IFwiZHVja2R1Y2tnb1wiIHwgXCJsZWdhY3lcIiA9XG4gICAgICAocHJvY2Vzcy5lbnYuRkFWSUNPTl9QUk9WSURFUiBhcyBhbnkpID8/IFwicmF5Y2FzdFwiO1xuXG4gICAgc3dpdGNoIChmYXZpY29uUHJvdmlkZXIpIHtcbiAgICAgIGNhc2UgXCJub25lXCI6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBvcHRpb25zPy5mYWxsYmFjayA/PyBJY29uLkxpbmssXG4gICAgICAgICAgbWFzazogb3B0aW9ucz8ubWFzayxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJhcHBsZVwiOlxuICAgICAgICAvLyB3ZSBjYW4ndCBzdXBwb3J0IGFwcGxlIGZhdmljb25zIGFzIGl0J3MgYSBuYXRpdmUgQVBJXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBvcHRpb25zPy5mYWxsYmFjayA/PyBJY29uLkxpbmssXG4gICAgICAgICAgbWFzazogb3B0aW9ucz8ubWFzayxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJkdWNrZHVja2dvXCI6XG4gICAgICBjYXNlIFwiZHVja0R1Y2tHb1wiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogYGh0dHBzOi8vaWNvbnMuZHVja2R1Y2tnby5jb20vaXAzLyR7aG9zdG5hbWV9Lmljb2AsXG4gICAgICAgICAgZmFsbGJhY2s6IG9wdGlvbnM/LmZhbGxiYWNrID8/IEljb24uTGluayxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zPy5tYXNrLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcImdvb2dsZVwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogYGh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vczIvZmF2aWNvbnM/c3o9JHtvcHRpb25zPy5zaXplID8/IDY0fSZkb21haW49JHtob3N0bmFtZX1gLFxuICAgICAgICAgIGZhbGxiYWNrOiBvcHRpb25zPy5mYWxsYmFjayA/PyBJY29uLkxpbmssXG4gICAgICAgICAgbWFzazogb3B0aW9ucz8ubWFzayxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJsZWdhY3lcIjpcbiAgICAgIGNhc2UgXCJyYXljYXN0XCI6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogYGh0dHBzOi8vYXBpLnJheS5zby9mYXZpY29uP3VybD0ke2hvc3RuYW1lfSZzaXplPSR7b3B0aW9ucz8uc2l6ZSA/PyA2NH1gLFxuICAgICAgICAgIGZhbGxiYWNrOiBvcHRpb25zPy5mYWxsYmFjayA/PyBJY29uLkxpbmssXG4gICAgICAgICAgbWFzazogb3B0aW9ucz8ubWFzayxcbiAgICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHJldHVybiBJY29uLkxpbms7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBlbnZpcm9ubWVudCwgQ29sb3IgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG5mdW5jdGlvbiBwb2xhclRvQ2FydGVzaWFuKGNlbnRlclg6IG51bWJlciwgY2VudGVyWTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgYW5nbGVJbkRlZ3JlZXM6IG51bWJlcikge1xuICBjb25zdCBhbmdsZUluUmFkaWFucyA9ICgoYW5nbGVJbkRlZ3JlZXMgLSA5MCkgKiBNYXRoLlBJKSAvIDE4MC4wO1xuXG4gIHJldHVybiB7XG4gICAgeDogY2VudGVyWCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlSW5SYWRpYW5zKSxcbiAgICB5OiBjZW50ZXJZICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGVJblJhZGlhbnMpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBkZXNjcmliZUFyYyh4OiBudW1iZXIsIHk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIHN0YXJ0QW5nbGU6IG51bWJlciwgZW5kQW5nbGU6IG51bWJlcikge1xuICBjb25zdCBzdGFydCA9IHBvbGFyVG9DYXJ0ZXNpYW4oeCwgeSwgcmFkaXVzLCBlbmRBbmdsZSk7XG4gIGNvbnN0IGVuZCA9IHBvbGFyVG9DYXJ0ZXNpYW4oeCwgeSwgcmFkaXVzLCBzdGFydEFuZ2xlKTtcblxuICBjb25zdCBsYXJnZUFyY0ZsYWcgPSBlbmRBbmdsZSAtIHN0YXJ0QW5nbGUgPD0gMTgwID8gXCIwXCIgOiBcIjFcIjtcblxuICBjb25zdCBkID0gW1wiTVwiLCBzdGFydC54LCBzdGFydC55LCBcIkFcIiwgcmFkaXVzLCByYWRpdXMsIDAsIGxhcmdlQXJjRmxhZywgMCwgZW5kLngsIGVuZC55XS5qb2luKFwiIFwiKTtcblxuICByZXR1cm4gZDtcbn1cblxuLyoqXG4gKiBJY29uIHRvIHJlcHJlc2VudCB0aGUgcHJvZ3Jlc3Mgb2YgX3NvbWV0aGluZ18uXG4gKlxuICogQHBhcmFtIHByb2dyZXNzIE51bWJlciBiZXR3ZWVuIDAgYW5kIDEuXG4gKiBAcGFyYW0gY29sb3IgSGV4IGNvbG9yIChkZWZhdWx0IGBcIiNGRjYzNjNcImApIG9yIENvbG9yLlxuICpcbiAqIEByZXR1cm5zIGFuIEltYWdlIHRoYXQgY2FuIGJlIHVzZWQgd2hlcmUgUmF5Y2FzdCBleHBlY3RzIHRoZW0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogPExpc3QuSXRlbSBpY29uPXtnZXRQcm9ncmVzc0ljb24oMC4xKX0gdGl0bGU9XCJQcm9qZWN0XCIgLz5cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NJY29uKFxuICBwcm9ncmVzczogbnVtYmVyLFxuICBjb2xvcjogQ29sb3IgfCBzdHJpbmcgPSBDb2xvci5SZWQsXG4gIG9wdGlvbnM/OiB7IGJhY2tncm91bmQ/OiBDb2xvciB8IHN0cmluZzsgYmFja2dyb3VuZE9wYWNpdHk/OiBudW1iZXIgfSxcbik6IEltYWdlLkFzc2V0IHtcbiAgY29uc3QgYmFja2dyb3VuZCA9IG9wdGlvbnM/LmJhY2tncm91bmQgfHwgKGVudmlyb25tZW50LmFwcGVhcmFuY2UgPT09IFwibGlnaHRcIiA/IFwiYmxhY2tcIiA6IFwid2hpdGVcIik7XG4gIGNvbnN0IGJhY2tncm91bmRPcGFjaXR5ID0gb3B0aW9ucz8uYmFja2dyb3VuZE9wYWNpdHkgfHwgMC4xO1xuXG4gIGNvbnN0IHN0cm9rZSA9IDEwO1xuICBjb25zdCBwYWRkaW5nID0gNTtcbiAgY29uc3QgcmFkaXVzID0gNTAgLSBwYWRkaW5nIC0gc3Ryb2tlIC8gMjtcblxuICBjb25zdCBzdmcgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDBweFwiIGhlaWdodD1cIjEwMHB4XCI+XG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIiR7cmFkaXVzfVwiIHN0cm9rZS13aWR0aD1cIiR7c3Ryb2tlfVwiIHN0cm9rZT1cIiR7XG4gICAgICAgIHByb2dyZXNzIDwgMSA/IGJhY2tncm91bmQgOiBjb2xvclxuICAgICAgfVwiIG9wYWNpdHk9XCIke3Byb2dyZXNzIDwgMSA/IGJhY2tncm91bmRPcGFjaXR5IDogXCIxXCJ9XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgICAgJHtcbiAgICAgICAgcHJvZ3Jlc3MgPiAwICYmIHByb2dyZXNzIDwgMVxuICAgICAgICAgID8gYDxwYXRoIGQ9XCIke2Rlc2NyaWJlQXJjKFxuICAgICAgICAgICAgICA1MCxcbiAgICAgICAgICAgICAgNTAsXG4gICAgICAgICAgICAgIHJhZGl1cyxcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgcHJvZ3Jlc3MgKiAzNjAsXG4gICAgICAgICAgICApfVwiIHN0cm9rZT1cIiR7Y29sb3J9XCIgc3Ryb2tlLXdpZHRoPVwiJHtzdHJva2V9XCIgZmlsbD1cIm5vbmVcIiAvPmBcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1cbiAgICA8L3N2Zz5cbiAgYC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpO1xuICByZXR1cm4gYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChzdmcpfWA7XG59XG4iLCAiZXhwb3J0IHsgT0F1dGhTZXJ2aWNlIH0gZnJvbSBcIi4vT0F1dGhTZXJ2aWNlXCI7XG5leHBvcnQgeyB3aXRoQWNjZXNzVG9rZW4sIGdldEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4vd2l0aEFjY2Vzc1Rva2VuXCI7XG5cbmV4cG9ydCB0eXBlIHsgV2l0aEFjY2Vzc1Rva2VuQ29tcG9uZW50T3JGbiB9IGZyb20gXCIuL3dpdGhBY2Nlc3NUb2tlblwiO1xuZXhwb3J0IHR5cGUge1xuICBPbkF1dGhvcml6ZVBhcmFtcyxcbiAgT0F1dGhTZXJ2aWNlT3B0aW9ucyxcbiAgUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMsXG4gIFByb3ZpZGVyT3B0aW9ucyxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcbiIsICJpbXBvcnQgeyBDb2xvciwgT0F1dGggfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBQUk9WSURFUl9DTElFTlRfSURTIH0gZnJvbSBcIi4vcHJvdmlkZXJzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIE9BdXRoU2VydmljZU9wdGlvbnMsXG4gIE9uQXV0aG9yaXplUGFyYW1zLFxuICBQcm92aWRlck9wdGlvbnMsXG4gIFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG4vKipcbiAqIENsYXNzIGFsbG93aW5nIHRvIGNyZWF0ZSBhbiBPQXV0aCBzZXJ2aWNlIHVzaW5nIHRoZSB0aGUgUEtDRSAoUHJvb2YgS2V5IGZvciBDb2RlIEV4Y2hhbmdlKSBmbG93LlxuICpcbiAqIFRoaXMgc2VydmljZSBpcyBjYXBhYmxlIG9mIHN0YXJ0aW5nIHRoZSBhdXRob3JpemF0aW9uIHByb2Nlc3MsIGZldGNoaW5nIGFuZCByZWZyZXNoaW5nIHRva2VucyxcbiAqIGFzIHdlbGwgYXMgbWFuYWdpbmcgdGhlIGF1dGhlbnRpY2F0aW9uIHN0YXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvYXV0aENsaWVudCA9IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHsgLi4uIH0pO1xuICogY29uc3Qgb2F1dGhTZXJ2aWNlID0gbmV3IE9BdXRoU2VydmljZSh7XG4gKiAgIGNsaWVudDogb2F1dGhDbGllbnQsXG4gKiAgIGNsaWVudElkOiAneW91ci1jbGllbnQtaWQnLFxuICogICBzY29wZTogJ3JlcXVpcmVkIHNjb3BlcycsXG4gKiAgIGF1dGhvcml6ZVVybDogJ2h0dHBzOi8vcHJvdmlkZXIuY29tL29hdXRoL2F1dGhvcml6ZScsXG4gKiAgIHRva2VuVXJsOiAnaHR0cHM6Ly9wcm92aWRlci5jb20vb2F1dGgvdG9rZW4nLFxuICogICByZWZyZXNoVG9rZW5Vcmw6ICdodHRwczovL3Byb3ZpZGVyLmNvbS9vYXV0aC90b2tlbicsXG4gKiAgIGV4dHJhUGFyYW1ldGVyczogeyAnYWRkaXRpb25hbF9wYXJhbSc6ICd2YWx1ZScgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGNsYXNzIE9BdXRoU2VydmljZSBpbXBsZW1lbnRzIE9BdXRoU2VydmljZU9wdGlvbnMge1xuICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZztcbiAgcHVibGljIHNjb3BlOiBzdHJpbmc7XG4gIHB1YmxpYyBjbGllbnQ6IE9BdXRoLlBLQ0VDbGllbnQ7XG4gIHB1YmxpYyBleHRyYVBhcmFtZXRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBwdWJsaWMgYXV0aG9yaXplVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyB0b2tlblVybDogc3RyaW5nO1xuICBwdWJsaWMgcmVmcmVzaFRva2VuVXJsPzogc3RyaW5nO1xuICBwdWJsaWMgYm9keUVuY29kaW5nPzogXCJqc29uXCIgfCBcInVybC1lbmNvZGVkXCI7XG4gIHB1YmxpYyBwZXJzb25hbEFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICBvbkF1dGhvcml6ZT86IChwYXJhbXM6IE9uQXV0aG9yaXplUGFyYW1zKSA9PiB2b2lkO1xuICB0b2tlblJlc3BvbnNlUGFyc2VyOiAocmVzcG9uc2U6IHVua25vd24pID0+IE9BdXRoLlRva2VuUmVzcG9uc2U7XG4gIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiAocmVzcG9uc2U6IHVua25vd24pID0+IE9BdXRoLlRva2VuUmVzcG9uc2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT0F1dGhTZXJ2aWNlT3B0aW9ucykge1xuICAgIHRoaXMuY2xpZW50SWQgPSBvcHRpb25zLmNsaWVudElkO1xuICAgIHRoaXMuc2NvcGUgPSBBcnJheS5pc0FycmF5KG9wdGlvbnMuc2NvcGUpID8gb3B0aW9ucy5zY29wZS5qb2luKFwiIFwiKSA6IG9wdGlvbnMuc2NvcGU7XG4gICAgdGhpcy5wZXJzb25hbEFjY2Vzc1Rva2VuID0gb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuO1xuICAgIHRoaXMuYm9keUVuY29kaW5nID0gb3B0aW9ucy5ib2R5RW5jb2Rpbmc7XG4gICAgdGhpcy5jbGllbnQgPSBvcHRpb25zLmNsaWVudDtcbiAgICB0aGlzLmV4dHJhUGFyYW1ldGVycyA9IG9wdGlvbnMuZXh0cmFQYXJhbWV0ZXJzO1xuICAgIHRoaXMuYXV0aG9yaXplVXJsID0gb3B0aW9ucy5hdXRob3JpemVVcmw7XG4gICAgdGhpcy50b2tlblVybCA9IG9wdGlvbnMudG9rZW5Vcmw7XG4gICAgdGhpcy5yZWZyZXNoVG9rZW5VcmwgPSBvcHRpb25zLnJlZnJlc2hUb2tlblVybDtcbiAgICB0aGlzLm9uQXV0aG9yaXplID0gb3B0aW9ucy5vbkF1dGhvcml6ZTtcbiAgICB0aGlzLnRva2VuUmVzcG9uc2VQYXJzZXIgPSBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIgPz8gKCh4KSA9PiB4IGFzIE9BdXRoLlRva2VuUmVzcG9uc2UpO1xuICAgIHRoaXMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIgPSBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyID8/ICgoeCkgPT4geCBhcyBPQXV0aC5Ub2tlblJlc3BvbnNlKTtcbiAgICB0aGlzLmF1dGhvcml6ZSA9IHRoaXMuYXV0aG9yaXplLmJpbmQodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQXNhbmEgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBhc2FuYSA9IE9BdXRoU2VydmljZS5hc2FuYSh7IHNjb3BlOiAnZGVmYXVsdCcgfSlcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGFzYW5hKG9wdGlvbnM6IFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJBc2FuYVwiLFxuICAgICAgICBwcm92aWRlckljb246IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjUxXCIgaGVpZ2h0PVwiMjMyXCIgZmlsbD1cIm5vbmVcIj48cGF0aCBmaWxsPVwiI0YwNkE2QVwiIGQ9XCJNMTc5LjM4MyA1NC4zNzNjMCAzMC4wMTctMjQuMzM3IDU0LjM3NC01NC4zNTQgNTQuMzc0LTMwLjAzNSAwLTU0LjM3My0yNC4zMzgtNTQuMzczLTU0LjM3NEM3MC42NTYgMjQuMzM4IDk0Ljk5MyAwIDEyNS4wMjkgMGMzMC4wMTcgMCA1NC4zNTQgMjQuMzM4IDU0LjM1NCA1NC4zNzNaTTU0LjM5MyAxMjIuMzNDMjQuMzc2IDEyMi4zMy4wMiAxNDYuNjY4LjAyIDE3Ni42ODVjMCAzMC4wMTcgMjQuMzM3IDU0LjM3MyA1NC4zNzMgNTQuMzczIDMwLjAzNSAwIDU0LjM3My0yNC4zMzggNTQuMzczLTU0LjM3MyAwLTMwLjAxNy0yNC4zMzgtNTQuMzU1LTU0LjM3My01NC4zNTVabTE0MS4yNTMgMGMtMzAuMDM1IDAtNTQuMzczIDI0LjMzOC01NC4zNzMgNTQuMzc0IDAgMzAuMDM1IDI0LjMzOCA1NC4zNzMgNTQuMzczIDU0LjM3MyAzMC4wMTcgMCA1NC4zNzQtMjQuMzM4IDU0LjM3NC01NC4zNzMgMC0zMC4wMzYtMjQuMzM4LTU0LjM3NC01NC4zNzQtNTQuMzc0WlwiLz48L3N2Zz5gLFxuICAgICAgICApfWAsXG4gICAgICAgIHByb3ZpZGVySWQ6IFwiYXNhbmFcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIEFzYW5hIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQgPz8gUFJPVklERVJfQ0xJRU5UX0lEUy5hc2FuYSxcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL2FzYW5hLm9hdXRoLnJheWNhc3QuY29tL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL2FzYW5hLm9hdXRoLnJheWNhc3QuY29tL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsID8/IFwiaHR0cHM6Ly9hc2FuYS5vYXV0aC5yYXljYXN0LmNvbS9yZWZyZXNoLXRva2VuXCIsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdpdEh1YiBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGdpdGh1YiA9IE9BdXRoU2VydmljZS5naXRodWIoeyBzY29wZTogJ3JlcG8gdXNlcicgfSlcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdpdGh1YihvcHRpb25zOiBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiR2l0SHViXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjoge1xuICAgICAgICAgIHNvdXJjZTogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjY0XCIgaGVpZ2h0PVwiNjRcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+PHBhdGggZmlsbC1ydWxlPVwiZXZlbm9kZFwiIGQ9XCJNOCAwQzMuNTggMCAwIDMuNTggMCA4YzAgMy41NCAyLjI5IDYuNTMgNS40NyA3LjU5LjQuMDcuNTUtLjE3LjU1LS4zOCAwLS4xOS0uMDEtLjgyLS4wMS0xLjQ5LTIuMDEuMzctMi41My0uNDktMi42OS0uOTQtLjA5LS4yMy0uNDgtLjk0LS44Mi0xLjEzLS4yOC0uMTUtLjY4LS41Mi0uMDEtLjUzLjYzLS4wMSAxLjA4LjU4IDEuMjMuODIuNzIgMS4yMSAxLjg3Ljg3IDIuMzMuNjYuMDctLjUyLjI4LS44Ny41MS0xLjA3LTEuNzgtLjItMy42NC0uODktMy42NC0zLjk1IDAtLjg3LjMxLTEuNTkuODItMi4xNS0uMDgtLjItLjM2LTEuMDIuMDgtMi4xMiAwIDAgLjY3LS4yMSAyLjIuODIuNjQtLjE4IDEuMzItLjI3IDItLjI3LjY4IDAgMS4zNi4wOSAyIC4yNyAxLjUzLTEuMDQgMi4yLS44MiAyLjItLjgyLjQ0IDEuMS4xNiAxLjkyLjA4IDIuMTIuNTEuNTYuODIgMS4yNy44MiAyLjE1IDAgMy4wNy0xLjg3IDMuNzUtMy42NSAzLjk1LjI5LjI1LjU0LjczLjU0IDEuNDggMCAxLjA3LS4wMSAxLjkzLS4wMSAyLjIgMCAuMjEuMTUuNDYuNTUuMzhBOC4wMTMgOC4wMTMgMCAwIDAgMTYgOGMwLTQuNDItMy41OC04LTgtOHpcIi8+PC9zdmc+YCxcbiAgICAgICAgICApfWAsXG5cbiAgICAgICAgICB0aW50Q29sb3I6IENvbG9yLlByaW1hcnlUZXh0LFxuICAgICAgICB9LFxuICAgICAgICBwcm92aWRlcklkOiBcImdpdGh1YlwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgR2l0SHViIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQgPz8gUFJPVklERVJfQ0xJRU5UX0lEUy5naXRodWIsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9naXRodWIub2F1dGgucmF5Y2FzdC5jb20vYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vZ2l0aHViLm9hdXRoLnJheWNhc3QuY29tL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsID8/IFwiaHR0cHM6Ly9naXRodWIub2F1dGgucmF5Y2FzdC5jb20vcmVmcmVzaC10b2tlblwiLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHb29nbGUgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBnb29nbGUgPSBPQXV0aFNlcnZpY2UuZ29vZ2xlKHtcbiAgICogICBjbGllbnRJZDogJ2N1c3RvbS1jbGllbnQtaWQnLFxuICAgKiAgIGF1dGhvcml6ZVVybDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoJyxcbiAgICogICB0b2tlblVybDogJ2h0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuJyxcbiAgICogICBzY29wZTogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUucmVhZG9ubHknLFxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdvb2dsZShvcHRpb25zOiBQcm92aWRlck9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLkFwcFVSSSxcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIkdvb2dsZVwiLFxuICAgICAgICBwcm92aWRlckljb246IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHN0eWxlPVwiZGlzcGxheTpibG9ja1wiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj48cGF0aCBmaWxsPVwiI0VBNDMzNVwiIGQ9XCJNMjQgOS41YzMuNTQgMCA2LjcxIDEuMjIgOS4yMSAzLjZsNi44NS02Ljg1QzM1LjkgMi4zOCAzMC40NyAwIDI0IDAgMTQuNjIgMCA2LjUxIDUuMzggMi41NiAxMy4yMmw3Ljk4IDYuMTlDMTIuNDMgMTMuNzIgMTcuNzQgOS41IDI0IDkuNXpcIi8+PHBhdGggZmlsbD1cIiM0Mjg1RjRcIiBkPVwiTTQ2Ljk4IDI0LjU1YzAtMS41Ny0uMTUtMy4wOS0uMzgtNC41NUgyNHY5LjAyaDEyLjk0Yy0uNTggMi45Ni0yLjI2IDUuNDgtNC43OCA3LjE4bDcuNzMgNmM0LjUxLTQuMTggNy4wOS0xMC4zNiA3LjA5LTE3LjY1elwiLz48cGF0aCBmaWxsPVwiI0ZCQkMwNVwiIGQ9XCJNMTAuNTMgMjguNTljLS40OC0xLjQ1LS43Ni0yLjk5LS43Ni00LjU5cy4yNy0zLjE0Ljc2LTQuNTlsLTcuOTgtNi4xOUMuOTIgMTYuNDYgMCAyMC4xMiAwIDI0YzAgMy44OC45MiA3LjU0IDIuNTYgMTAuNzhsNy45Ny02LjE5elwiLz48cGF0aCBmaWxsPVwiIzM0QTg1M1wiIGQ9XCJNMjQgNDhjNi40OCAwIDExLjkzLTIuMTMgMTUuODktNS44MWwtNy43My02Yy0yLjE1IDEuNDUtNC45MiAyLjMtOC4xNiAyLjMtNi4yNiAwLTExLjU3LTQuMjItMTMuNDctOS45MWwtNy45OCA2LjE5QzYuNTEgNDIuNjIgMTQuNjIgNDggMjQgNDh6XCIvPjxwYXRoIGZpbGw9XCJub25lXCIgZD1cIk0wIDBoNDh2NDhIMHpcIi8+PC9zdmc+YCxcbiAgICAgICAgKX1gLFxuICAgICAgICBwcm92aWRlcklkOiBcImdvb2dsZVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgR29vZ2xlIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGhcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy50b2tlblVybCxcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyA/PyBcInVybC1lbmNvZGVkXCIsXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEppcmEgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBqaXJhID0gT0F1dGhTZXJ2aWNlLmppcmEoe1xuICAgKiAgIGNsaWVudElkOiAnY3VzdG9tLWNsaWVudC1pZCcsXG4gICAqICAgYXV0aG9yaXplVXJsOiAnaHR0cHM6Ly9hdXRoLmF0bGFzc2lhbi5jb20vYXV0aG9yaXplJyxcbiAgICogICB0b2tlblVybDogJ2h0dHBzOi8vYXBpLmF0bGFzc2lhbi5jb20vb2F1dGgvdG9rZW4nLFxuICAgKiAgIHNjb3BlOiAncmVhZDpqaXJhLXVzZXIgcmVhZDpqaXJhLXdvcmsgb2ZmbGluZV9hY2Nlc3MnXG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgamlyYShvcHRpb25zOiBQcm92aWRlck9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIkppcmFcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB3aWR0aD1cIjIzNjFcIiBoZWlnaHQ9XCIyNTAwXCIgdmlld0JveD1cIjIuNTkgMCAyMTQuMDkxIDIyNFwiPjxsaW5lYXJHcmFkaWVudCBpZD1cImFcIiB4MT1cIjEwMi40XCIgeDI9XCI1Ni4xNVwiIHkxPVwiMjE4LjYzXCIgeTI9XCIxNzIuMzlcIiBncmFkaWVudFRyYW5zZm9ybT1cIm1hdHJpeCgxIDAgMCAtMSAwIDI2NClcIiBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj48c3RvcCBvZmZzZXQ9XCIuMThcIiBzdG9wLWNvbG9yPVwiIzAwNTJjY1wiLz48c3RvcCBvZmZzZXQ9XCIxXCIgc3RvcC1jb2xvcj1cIiMyNjg0ZmZcIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgeGxpbms6aHJlZj1cIiNhXCIgaWQ9XCJiXCIgeDE9XCIxMTQuNjVcIiB4Mj1cIjE2MC44MVwiIHkxPVwiODUuNzdcIiB5Mj1cIjEzMS45MlwiLz48cGF0aCBmaWxsPVwiIzI2ODRmZlwiIGQ9XCJNMjE0LjA2IDEwNS43MyAxMTcuNjcgOS4zNCAxMDguMzMgMCAzNS43NyA3Mi41NiAyLjU5IDEwNS43M2E4Ljg5IDguODkgMCAwIDAgMCAxMi41NGw2Ni4yOSA2Ni4yOUwxMDguMzMgMjI0bDcyLjU1LTcyLjU2IDEuMTMtMS4xMiAzMi4wNS0zMmE4Ljg3IDguODcgMCAwIDAgMC0xMi41OXptLTEwNS43MyAzOS4zOUw3NS4yMSAxMTJsMzMuMTItMzMuMTJMMTQxLjQ0IDExMnpcIi8+PHBhdGggZmlsbD1cInVybCgjYSlcIiBkPVwiTTEwOC4zMyA3OC44OGE1NS43NSA1NS43NSAwIDAgMS0uMjQtNzguNjFMMzUuNjIgNzIuNzFsMzkuNDQgMzkuNDR6XCIvPjxwYXRoIGZpbGw9XCJ1cmwoI2IpXCIgZD1cIm0xNDEuNTMgMTExLjkxLTMzLjIgMzMuMjFhNTUuNzcgNTUuNzcgMCAwIDEgMCA3OC44NkwxODEgMTUxLjM1elwiLz48L3N2Zz5gLFxuICAgICAgICApfWAsXG4gICAgICAgIHByb3ZpZGVySWQ6IFwiamlyYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgSmlyYSBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vYXV0aC5hdGxhc3NpYW4uY29tL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbS9vYXV0aC90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnJlZnJlc2hUb2tlblVybCxcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGluZWFyIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgbGluZWFyID0gT0F1dGhTZXJ2aWNlLmxpbmVhcih7IHNjb3BlOiAncmVhZCB3cml0ZScgfSlcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGxpbmVhcihvcHRpb25zOiBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiTGluZWFyXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjoge1xuICAgICAgICAgIHNvdXJjZToge1xuICAgICAgICAgICAgbGlnaHQ6IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwiIzIyMjMyNlwiIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMjAwXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PHBhdGggZD1cIk0xLjIyNTQxIDYxLjUyMjhjLS4yMjI1LS45NDg1LjkwNzQ4LTEuNTQ1OSAxLjU5NjM4LS44NTdMMzkuMzM0MiA5Ny4xNzgyYy42ODg5LjY4ODkuMDkxNSAxLjgxODktLjg1NyAxLjU5NjRDMjAuMDUxNSA5NC40NTIyIDUuNTQ3NzkgNzkuOTQ4NSAxLjIyNTQxIDYxLjUyMjhaTS4wMDE4OTEzNSA0Ni44ODkxYy0uMDE3NjQzNzUuMjgzMy4wODg4NzIxNS41NTk5LjI4OTU3MTY1Ljc2MDZMNTIuMzUwMyA5OS43MDg1Yy4yMDA3LjIwMDcuNDc3My4zMDc1Ljc2MDYuMjg5NiAyLjM2OTItLjE0NzYgNC42OTM4LS40NiA2Ljk2MjQtLjkyNTkuNzY0NS0uMTU3IDEuMDMwMS0xLjA5NjMuNDc4Mi0xLjY0ODFMMi41NzU5NSAzOS40NDg1Yy0uNTUxODYtLjU1MTktMS40OTExNy0uMjg2My0xLjY0ODE3NC40NzgyLS40NjU5MTUgMi4yNjg2LS43NzgzMiA0LjU5MzItLjkyNTg4NDY1IDYuOTYyNFpNNC4yMTA5MyAyOS43MDU0Yy0uMTY2NDkuMzczOC0uMDgxNjkuODEwNi4yMDc2NSAxLjFsNjQuNzc2MDIgNjQuNzc2Yy4yODk0LjI4OTQuNzI2Mi4zNzQyIDEuMS4yMDc3IDEuNzg2MS0uNzk1NiAzLjUxNzEtMS42OTI3IDUuMTg1NS0yLjY4NC41NTIxLS4zMjguNjM3My0xLjA4NjcuMTgzMi0xLjU0MDdMOC40MzU2NiAyNC4zMzY3Yy0uNDU0MDktLjQ1NDEtMS4yMTI3MS0uMzY4OS0xLjU0MDc0LjE4MzItLjk5MTMyIDEuNjY4NC0xLjg4ODQzIDMuMzk5NC0yLjY4Mzk5IDUuMTg1NVpNMTIuNjU4NyAxOC4wNzRjLS4zNzAxLS4zNzAxLS4zOTMtLjk2MzctLjA0NDMtMS4zNTQxQzIxLjc3OTUgNi40NTkzMSAzNS4xMTE0IDAgNDkuOTUxOSAwIDc3LjU5MjcgMCAxMDAgMjIuNDA3MyAxMDAgNTAuMDQ4MWMwIDE0Ljg0MDUtNi40NTkzIDI4LjE3MjQtMTYuNzE5OSAzNy4zMzc1LS4zOTAzLjM0ODctLjk4NC4zMjU4LTEuMzU0Mi0uMDQ0M0wxMi42NTg3IDE4LjA3NFpcIi8+PC9zdmc+YCxcbiAgICAgICAgICAgICl9YCxcbiAgICAgICAgICAgIGRhcms6IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwiI2ZmZlwiIHdpZHRoPVwiMjAwXCIgaGVpZ2h0PVwiMjAwXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PHBhdGggZD1cIk0xLjIyNTQxIDYxLjUyMjhjLS4yMjI1LS45NDg1LjkwNzQ4LTEuNTQ1OSAxLjU5NjM4LS44NTdMMzkuMzM0MiA5Ny4xNzgyYy42ODg5LjY4ODkuMDkxNSAxLjgxODktLjg1NyAxLjU5NjRDMjAuMDUxNSA5NC40NTIyIDUuNTQ3NzkgNzkuOTQ4NSAxLjIyNTQxIDYxLjUyMjhaTS4wMDE4OTEzNSA0Ni44ODkxYy0uMDE3NjQzNzUuMjgzMy4wODg4NzIxNS41NTk5LjI4OTU3MTY1Ljc2MDZMNTIuMzUwMyA5OS43MDg1Yy4yMDA3LjIwMDcuNDc3My4zMDc1Ljc2MDYuMjg5NiAyLjM2OTItLjE0NzYgNC42OTM4LS40NiA2Ljk2MjQtLjkyNTkuNzY0NS0uMTU3IDEuMDMwMS0xLjA5NjMuNDc4Mi0xLjY0ODFMMi41NzU5NSAzOS40NDg1Yy0uNTUxODYtLjU1MTktMS40OTExNy0uMjg2My0xLjY0ODE3NC40NzgyLS40NjU5MTUgMi4yNjg2LS43NzgzMiA0LjU5MzItLjkyNTg4NDY1IDYuOTYyNFpNNC4yMTA5MyAyOS43MDU0Yy0uMTY2NDkuMzczOC0uMDgxNjkuODEwNi4yMDc2NSAxLjFsNjQuNzc2MDIgNjQuNzc2Yy4yODk0LjI4OTQuNzI2Mi4zNzQyIDEuMS4yMDc3IDEuNzg2MS0uNzk1NiAzLjUxNzEtMS42OTI3IDUuMTg1NS0yLjY4NC41NTIxLS4zMjguNjM3My0xLjA4NjcuMTgzMi0xLjU0MDdMOC40MzU2NiAyNC4zMzY3Yy0uNDU0MDktLjQ1NDEtMS4yMTI3MS0uMzY4OS0xLjU0MDc0LjE4MzItLjk5MTMyIDEuNjY4NC0xLjg4ODQzIDMuMzk5NC0yLjY4Mzk5IDUuMTg1NVpNMTIuNjU4NyAxOC4wNzRjLS4zNzAxLS4zNzAxLS4zOTMtLjk2MzctLjA0NDMtMS4zNTQxQzIxLjc3OTUgNi40NTkzMSAzNS4xMTE0IDAgNDkuOTUxOSAwIDc3LjU5MjcgMCAxMDAgMjIuNDA3MyAxMDAgNTAuMDQ4MWMwIDE0Ljg0MDUtNi40NTkzIDI4LjE3MjQtMTYuNzE5OSAzNy4zMzc1LS4zOTAzLjM0ODctLjk4NC4zMjU4LTEuMzU0Mi0uMDQ0M0wxMi42NTg3IDE4LjA3NFpcIiAvPjwvc3ZnPmAsXG4gICAgICAgICAgICApfWAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJsaW5lYXJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIExpbmVhciBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkID8/IFBST1ZJREVSX0NMSUVOVF9JRFMubGluZWFyLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vbGluZWFyLm9hdXRoLnJheWNhc3QuY29tL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL2xpbmVhci5vYXV0aC5yYXljYXN0LmNvbS90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnJlZnJlc2hUb2tlblVybCA/PyBcImh0dHBzOi8vbGluZWFyLm9hdXRoLnJheWNhc3QuY29tL3JlZnJlc2gtdG9rZW5cIixcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgZXh0cmFQYXJhbWV0ZXJzOiB7XG4gICAgICAgIGFjdG9yOiBcInVzZXJcIixcbiAgICAgIH0sXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTbGFjayBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IHNsYWNrID0gT0F1dGhTZXJ2aWNlLnNsYWNrKHsgc2NvcGU6ICdlbW9qaTpyZWFkJyB9KVxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2xhY2sob3B0aW9uczogUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIlNsYWNrXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjczIDczIDEyNCAxMjRcIj48c3R5bGU+LnN0MHtmaWxsOiNlMDFlNWF9LnN0MXtmaWxsOiMzNmM1ZjB9LnN0MntmaWxsOiMyZWI2N2R9LnN0M3tmaWxsOiNlY2IyMmV9PC9zdHlsZT48cGF0aCBkPVwiTTk5LjQgMTUxLjJjMCA3LjEtNS44IDEyLjktMTIuOSAxMi45LTcuMSAwLTEyLjktNS44LTEyLjktMTIuOSAwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjloMTIuOXYxMi45ek0xMDUuOSAxNTEuMmMwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjlzMTIuOSA1LjggMTIuOSAxMi45djMyLjNjMCA3LjEtNS44IDEyLjktMTIuOSAxMi45cy0xMi45LTUuOC0xMi45LTEyLjl2LTMyLjN6XCIgY2xhc3M9XCJzdDBcIi8+PHBhdGggZD1cIk0xMTguOCA5OS40Yy03LjEgMC0xMi45LTUuOC0xMi45LTEyLjkgMC03LjEgNS44LTEyLjkgMTIuOS0xMi45czEyLjkgNS44IDEyLjkgMTIuOXYxMi45aC0xMi45ek0xMTguOCAxMDUuOWM3LjEgMCAxMi45IDUuOCAxMi45IDEyLjlzLTUuOCAxMi45LTEyLjkgMTIuOUg4Ni41Yy03LjEgMC0xMi45LTUuOC0xMi45LTEyLjlzNS44LTEyLjkgMTIuOS0xMi45aDMyLjN6XCIgY2xhc3M9XCJzdDFcIi8+PHBhdGggZD1cIk0xNzAuNiAxMTguOGMwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjkgNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45cy01LjggMTIuOS0xMi45IDEyLjloLTEyLjl2LTEyLjl6TTE2NC4xIDExOC44YzAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOS03LjEgMC0xMi45LTUuOC0xMi45LTEyLjlWODYuNWMwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjkgNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45djMyLjN6XCIgY2xhc3M9XCJzdDJcIi8+PHBhdGggZD1cIk0xNTEuMiAxNzAuNmM3LjEgMCAxMi45IDUuOCAxMi45IDEyLjkgMCA3LjEtNS44IDEyLjktMTIuOSAxMi45LTcuMSAwLTEyLjktNS44LTEyLjktMTIuOXYtMTIuOWgxMi45ek0xNTEuMiAxNjQuMWMtNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45IDAtNy4xIDUuOC0xMi45IDEyLjktMTIuOWgzMi4zYzcuMSAwIDEyLjkgNS44IDEyLjkgMTIuOSAwIDcuMS01LjggMTIuOS0xMi45IDEyLjloLTMyLjN6XCIgY2xhc3M9XCJzdDNcIi8+PC9zdmc+YCxcbiAgICAgICAgKX1gLFxuICAgICAgICBwcm92aWRlcklkOiBcInNsYWNrXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBTbGFjayBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkID8/IFBST1ZJREVSX0NMSUVOVF9JRFMuc2xhY2ssXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9zbGFjay5vYXV0aC5yYXljYXN0LmNvbS9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9zbGFjay5vYXV0aC5yYXljYXN0LmNvbS90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9zbGFjay5vYXV0aC5yYXljYXN0LmNvbS9yZWZyZXNoLXRva2VuXCIsXG4gICAgICBzY29wZTogXCJcIixcbiAgICAgIGV4dHJhUGFyYW1ldGVyczoge1xuICAgICAgICB1c2VyX3Njb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgfSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy50b2tlblVybCA/IG9wdGlvbnMuYm9keUVuY29kaW5nID8/IFwidXJsLWVuY29kZWRcIiA6IFwianNvblwiLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOlxuICAgICAgICBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIgPz9cbiAgICAgICAgKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYXV0aGVkX3VzZXIuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgc2NvcGU6IHJlc3BvbnNlLmF1dGhlZF91c2VyLnNjb3BlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFpvb20gT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCB6b29tID0gT0F1dGhTZXJ2aWNlLnpvb20oe1xuICAgKiAgIGNsaWVudElkOiAnY3VzdG9tLWNsaWVudC1pZCcsXG4gICAqICAgYXV0aG9yaXplVXJsOiAnaHR0cHM6Ly96b29tLnVzL29hdXRoL2F1dGhvcml6ZScsXG4gICAqICAgdG9rZW5Vcmw6ICdodHRwczovL3pvb20udXMvb2F1dGgvdG9rZW4nLFxuICAgKiAgIHNjb3BlOiAnbWVldGluZzp3cml0ZScsXG4gICAqICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogJ3BlcnNvbmFsLWFjY2Vzcy10b2tlbicsXG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgem9vbShvcHRpb25zOiBQcm92aWRlck9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIlpvb21cIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDM1MS44NDUgODBcIj48cGF0aCBkPVwiTTczLjc4NiA3OC44MzVIMTAuODhBMTAuODQyIDEwLjg0MiAwIDAgMSAuODMzIDcyLjEyMmExMC44NDEgMTAuODQxIDAgMCAxIDIuMzU3LTExLjg1TDQ2Ljc2NCAxNi43aC0zMS4yM0M2Ljk1NCAxNi42OTkgMCA5Ljc0NCAwIDEuMTY1aDU4LjAxNGM0LjQxNCAwIDguMzU3IDIuNjM0IDEwLjA0NiA2LjcxMmExMC44NDMgMTAuODQzIDAgMCAxLTIuMzU2IDExLjg1TDIyLjEzIDYzLjMwMmgzNi4xMjJjOC41OCAwIDE1LjUzNCA2Ljk1NSAxNS41MzQgMTUuNTM0Wm0yNzguMDU5LTQ4LjU0NEMzNTEuODQ1IDEzLjU4OCAzMzguMjU2IDAgMzIxLjU1MyAwYy04LjkzNCAwLTE2Ljk3NSAzLjg5LTIyLjUyNCAxMC4wNjNDMjkzLjQ4IDMuODkgMjg1LjQ0IDAgMjc2LjUwNSAwYy0xNi43MDMgMC0zMC4yOTEgMTMuNTg4LTMwLjI5MSAzMC4yOTF2NDguNTQ0YzguNTc5IDAgMTUuNTM0LTYuOTU1IDE1LjUzNC0xNS41MzR2LTMzLjAxYzAtOC4xMzcgNi42Mi0xNC43NTcgMTQuNzU3LTE0Ljc1N3MxNC43NTcgNi42MiAxNC43NTcgMTQuNzU3djMzLjAxYzAgOC41OCA2Ljk1NSAxNS41MzQgMTUuNTM0IDE1LjUzNFYzMC4yOTFjMC04LjEzNyA2LjYyLTE0Ljc1NyAxNC43NTctMTQuNzU3czE0Ljc1OCA2LjYyIDE0Ljc1OCAxNC43NTd2MzMuMDFjMCA4LjU4IDYuOTU0IDE1LjUzNCAxNS41MzQgMTUuNTM0VjMwLjI5MVpNMjM4LjQ0NyA0MGMwIDIyLjA5MS0xNy45MDkgNDAtNDAgNDBzLTQwLTE3LjkwOS00MC00MCAxNy45MDgtNDAgNDAtNDAgNDAgMTcuOTA5IDQwIDQwWm0tMTUuNTM0IDBjMC0xMy41MTItMTAuOTU0LTI0LjQ2Ni0yNC40NjYtMjQuNDY2UzE3My45OCAyNi40ODggMTczLjk4IDQwczEwLjk1MyAyNC40NjYgMjQuNDY2IDI0LjQ2NlMyMjIuOTEzIDUzLjUxMiAyMjIuOTEzIDQwWm0tNzAuNjggMGMwIDIyLjA5MS0xNy45MDkgNDAtNDAgNDBzLTQwLTE3LjkwOS00MC00MCAxNy45MDktNDAgNDAtNDAgNDAgMTcuOTA5IDQwIDQwWm0tMTUuNTM0IDBjMC0xMy41MTItMTAuOTU0LTI0LjQ2Ni0yNC40NjYtMjQuNDY2Uzg3Ljc2NyAyNi40ODggODcuNzY3IDQwczEwLjk1NCAyNC40NjYgMjQuNDY2IDI0LjQ2NlMxMzYuNjk5IDUzLjUxMiAxMzYuNjk5IDQwWlwiIHN0eWxlPVwiZmlsbDojMGI1Y2ZmXCIvPjwvc3ZnPmAsXG4gICAgICAgICl9YCxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJ6b29tXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBab29tIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly96b29tLnVzL29hdXRoL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL3pvb20udXMvb2F1dGgvdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy5yZWZyZXNoVG9rZW5VcmwsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcgPz8gXCJ1cmwtZW5jb2RlZFwiLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2VzcyBvciByZWZyZXNoZXMgZXhpc3RpbmcgdG9rZW5zIGlmIG5lY2Vzc2FyeS5cbiAgICogSWYgdGhlIGN1cnJlbnQgdG9rZW4gc2V0IGhhcyBhIHJlZnJlc2ggdG9rZW4gYW5kIGl0IGlzIGV4cGlyZWQsIHRoZW4gdGhlIGZ1bmN0aW9uIHdpbGwgcmVmcmVzaCB0aGUgdG9rZW5zLlxuICAgKiBJZiBubyB0b2tlbnMgZXhpc3QsIGl0IHdpbGwgaW5pdGlhdGUgdGhlIE9BdXRoIGF1dGhvcml6YXRpb24gcHJvY2VzcyBhbmQgZmV0Y2ggdGhlIHRva2Vucy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCB0aGUgYWNjZXNzIHRva2VuIG9idGFpbmVkIGZyb20gdGhlIGF1dGhvcml6YXRpb24gZmxvdywgb3IgbnVsbCBpZiB0aGUgdG9rZW4gY291bGQgbm90IGJlIG9idGFpbmVkLlxuICAgKi9cbiAgYXN5bmMgYXV0aG9yaXplKCkge1xuICAgIGNvbnN0IGN1cnJlbnRUb2tlblNldCA9IGF3YWl0IHRoaXMuY2xpZW50LmdldFRva2VucygpO1xuICAgIGlmIChjdXJyZW50VG9rZW5TZXQ/LmFjY2Vzc1Rva2VuKSB7XG4gICAgICBpZiAoY3VycmVudFRva2VuU2V0LnJlZnJlc2hUb2tlbiAmJiBjdXJyZW50VG9rZW5TZXQuaXNFeHBpcmVkKCkpIHtcbiAgICAgICAgY29uc3QgdG9rZW5zID0gYXdhaXQgdGhpcy5yZWZyZXNoVG9rZW5zKHtcbiAgICAgICAgICB0b2tlbjogY3VycmVudFRva2VuU2V0LnJlZnJlc2hUb2tlbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW4gdGhlIGNhc2Ugd2hlcmUgdGhlIHJlZnJlc2ggdG9rZW4gZmxvd3MgZmFpbHMsIG5vdGhpbmcgaXMgcmV0dXJuZWQgYW5kIHRoZSBhdXRob3JpemUgZnVuY3Rpb24gaXMgY2FsbGVkIGFnYWluLlxuICAgICAgICBpZiAodG9rZW5zKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5jbGllbnQuc2V0VG9rZW5zKHRva2Vucyk7XG4gICAgICAgICAgcmV0dXJuIHRva2Vucy5hY2Nlc3NfdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJyZW50VG9rZW5TZXQuYWNjZXNzVG9rZW47XG4gICAgfVxuXG4gICAgY29uc3QgYXV0aFJlcXVlc3QgPSBhd2FpdCB0aGlzLmNsaWVudC5hdXRob3JpemF0aW9uUmVxdWVzdCh7XG4gICAgICBlbmRwb2ludDogdGhpcy5hdXRob3JpemVVcmwsXG4gICAgICBjbGllbnRJZDogdGhpcy5jbGllbnRJZCxcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgZXh0cmFQYXJhbWV0ZXJzOiB0aGlzLmV4dHJhUGFyYW1ldGVycyxcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgYXV0aG9yaXphdGlvbkNvZGUgfSA9IGF3YWl0IHRoaXMuY2xpZW50LmF1dGhvcml6ZShhdXRoUmVxdWVzdCk7XG4gICAgY29uc3QgdG9rZW5zID0gYXdhaXQgdGhpcy5mZXRjaFRva2Vucyh7XG4gICAgICBhdXRoUmVxdWVzdCxcbiAgICAgIGF1dGhvcml6YXRpb25Db2RlLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgdGhpcy5jbGllbnQuc2V0VG9rZW5zKHRva2Vucyk7XG5cbiAgICByZXR1cm4gdG9rZW5zLmFjY2Vzc190b2tlbjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZmV0Y2hUb2tlbnMoe1xuICAgIGF1dGhSZXF1ZXN0LFxuICAgIGF1dGhvcml6YXRpb25Db2RlLFxuICB9OiB7XG4gICAgYXV0aFJlcXVlc3Q6IE9BdXRoLkF1dGhvcml6YXRpb25SZXF1ZXN0O1xuICAgIGF1dGhvcml6YXRpb25Db2RlOiBzdHJpbmc7XG4gIH0pIHtcbiAgICBsZXQgb3B0aW9ucztcbiAgICBpZiAodGhpcy5ib2R5RW5jb2RpbmcgPT09IFwidXJsLWVuY29kZWRcIikge1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImNsaWVudF9pZFwiLCB0aGlzLmNsaWVudElkKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJjb2RlXCIsIGF1dGhvcml6YXRpb25Db2RlKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJjb2RlX3ZlcmlmaWVyXCIsIGF1dGhSZXF1ZXN0LmNvZGVWZXJpZmllcik7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiZ3JhbnRfdHlwZVwiLCBcImF1dGhvcml6YXRpb25fY29kZVwiKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJyZWRpcmVjdF91cmlcIiwgYXV0aFJlcXVlc3QucmVkaXJlY3RVUkkpO1xuXG4gICAgICBvcHRpb25zID0geyBib2R5OiBwYXJhbXMgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICBjb2RlOiBhdXRob3JpemF0aW9uQ29kZSxcbiAgICAgICAgICBjb2RlX3ZlcmlmaWVyOiBhdXRoUmVxdWVzdC5jb2RlVmVyaWZpZXIsXG4gICAgICAgICAgZ3JhbnRfdHlwZTogXCJhdXRob3JpemF0aW9uX2NvZGVcIixcbiAgICAgICAgICByZWRpcmVjdF91cmk6IGF1dGhSZXF1ZXN0LnJlZGlyZWN0VVJJLFxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMudG9rZW5VcmwsIHsgbWV0aG9kOiBcIlBPU1RcIiwgLi4ub3B0aW9ucyB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmVycm9yKFwiZmV0Y2ggdG9rZW5zIGVycm9yOlwiLCByZXNwb25zZVRleHQpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJvciB3aGlsZSBmZXRjaGluZyB0b2tlbnM6ICR7cmVzcG9uc2Uuc3RhdHVzfSAoJHtyZXNwb25zZS5zdGF0dXNUZXh0fSlcXG4ke3Jlc3BvbnNlVGV4dH1gKTtcbiAgICB9XG4gICAgY29uc3QgdG9rZW5zID0gdGhpcy50b2tlblJlc3BvbnNlUGFyc2VyKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG5cbiAgICAvLyBTb21lIGNsaWVudHMgc3VjaCBhcyBMaW5lYXIgY2FuIHJldHVybiBhIHNjb3BlIGFycmF5IGluc3RlYWQgb2YgYSBzdHJpbmdcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh0b2tlbnMuc2NvcGUpID8geyAuLi50b2tlbnMsIHNjb3BlOiB0b2tlbnMuc2NvcGUuam9pbihcIiBcIikgfSA6IHRva2VucztcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVmcmVzaFRva2Vucyh7IHRva2VuIH06IHsgdG9rZW46IHN0cmluZyB9KSB7XG4gICAgbGV0IG9wdGlvbnM7XG4gICAgaWYgKHRoaXMuYm9keUVuY29kaW5nID09PSBcInVybC1lbmNvZGVkXCIpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJjbGllbnRfaWRcIiwgdGhpcy5jbGllbnRJZCk7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwicmVmcmVzaF90b2tlblwiLCB0b2tlbik7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiZ3JhbnRfdHlwZVwiLCBcInJlZnJlc2hfdG9rZW5cIik7XG5cbiAgICAgIG9wdGlvbnMgPSB7IGJvZHk6IHBhcmFtcyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHRva2VuLFxuICAgICAgICAgIGdyYW50X3R5cGU6IFwicmVmcmVzaF90b2tlblwiLFxuICAgICAgICB9KSxcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHRoaXMucmVmcmVzaFRva2VuVXJsID8/IHRoaXMudG9rZW5VcmwsIHsgbWV0aG9kOiBcIlBPU1RcIiwgLi4ub3B0aW9ucyB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBjb25zb2xlLmVycm9yKFwicmVmcmVzaCB0b2tlbnMgZXJyb3I6XCIsIHJlc3BvbnNlVGV4dCk7XG4gICAgICAvLyBJZiB0aGUgcmVmcmVzaCB0b2tlbiBpcyBpbnZhbGlkLCBzdG9wIHRoZSBmbG93IGhlcmUsIGxvZyBvdXQgdGhlIHVzZXIgYW5kIHByb21wdCB0aGVtIHRvIHJlLWF1dGhvcml6ZS5cbiAgICAgIHRoaXMuY2xpZW50LmRlc2NyaXB0aW9uID0gYCR7dGhpcy5jbGllbnQucHJvdmlkZXJOYW1lfSBuZWVkcyB5b3UgdG8gc2lnbi1pbiBhZ2Fpbi4gUHJlc3Mg4o+OIG9yIGNsaWNrIHRoZSBidXR0b24gYmVsb3cgdG8gY29udGludWUuYDtcbiAgICAgIGF3YWl0IHRoaXMuY2xpZW50LnJlbW92ZVRva2VucygpO1xuICAgICAgYXdhaXQgdGhpcy5hdXRob3JpemUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9rZW5SZXNwb25zZSA9IHRoaXMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcbiAgICAgIHRva2VuUmVzcG9uc2UucmVmcmVzaF90b2tlbiA9IHRva2VuUmVzcG9uc2UucmVmcmVzaF90b2tlbiA/PyB0b2tlbjtcbiAgICAgIHJldHVybiB0b2tlblJlc3BvbnNlO1xuICAgIH1cbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBQUk9WSURFUl9DTElFTlRfSURTID0ge1xuICBhc2FuYTogXCIxMTkxMjAxNzQ1Njg0MzEyXCIsXG4gIGdpdGh1YjogXCI3MjM1ZmU4ZDQyMTU3ZjFmMzhjMFwiLFxuICBsaW5lYXI6IFwiYzhmZjM3YjkyMjVjM2M5YWVmZDdkNjZlYTBlNWI2ZjFcIixcbiAgc2xhY2s6IFwiODUxNzU2ODg0NjkyLjU1NDY5MjcyOTAyMTJcIixcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQsIE9BdXRoIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHR5cGUgeyBPQXV0aFR5cGUsIE9uQXV0aG9yaXplUGFyYW1zIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxubGV0IHRva2VuOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbmxldCB0eXBlOiBPQXV0aFR5cGUgfCBudWxsID0gbnVsbDtcbmxldCBhdXRob3JpemU6IFByb21pc2U8c3RyaW5nPiB8IG51bGwgPSBudWxsO1xubGV0IGdldElkVG9rZW46IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB8IG51bGwgPSBudWxsO1xubGV0IG9uQXV0aG9yaXplOiBQcm9taXNlPHZvaWQ+IHwgbnVsbCA9IG51bGw7XG5cbnR5cGUgV2l0aEFjY2Vzc1Rva2VuUGFyYW1ldGVycyA9IHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGluc3RhbmNlIG9mIGEgUEtDRSBDbGllbnQgdGhhdCB5b3UgY2FuIGNyZWF0ZSB1c2luZyBSYXljYXN0IEFQSS5cbiAgICogVGhpcyBjbGllbnQgaXMgdXNlZCB0byByZXR1cm4gdGhlIGBpZFRva2VuYCBhcyBwYXJ0IG9mIHRoZSBgb25BdXRob3JpemVgIGNhbGxiYWNrLlxuICAgKi9cbiAgY2xpZW50PzogT0F1dGguUEtDRUNsaWVudDtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBpbml0aWF0ZXMgdGhlIE9BdXRoIHRva2VuIHJldHJpZXZhbCBwcm9jZXNzXG4gICAqIEByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFjY2VzcyB0b2tlbi5cbiAgICovXG4gIGF1dGhvcml6ZTogKCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgc3RyaW5nIHRoYXQgcmVwcmVzZW50cyBhbiBhbHJlYWR5IG9idGFpbmVkIHBlcnNvbmFsIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgcGVyc29uYWxBY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGNhbGxiYWNrIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIG9uY2UgdGhlIHVzZXIgaGFzIGJlZW4gcHJvcGVybHkgbG9nZ2VkIGluIHRocm91Z2ggT0F1dGguXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIG9mIHRoZSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50b2tlbiAtIFRoZSByZXRyaWV2ZWQgYWNjZXNzIHRva2VuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSBUaGUgYWNjZXNzIHRva2VuJ3MgdHlwZSAoZWl0aGVyIGBvYXV0aGAgb3IgYHBlcnNvbmFsYClcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaWRUb2tlbiAtIFRoZSBvcHRpb25hbCBpZCB0b2tlbi4gVGhlIGBpZFRva2VuYCBpcyByZXR1cm5lZCBpZiBgb3B0aW9ucy5jbGllbnRgIGlzIHByb3ZpZGVkIGFuZCBpZiBpdCdzIHJldHVybmVkIGluIHRoZSBpbml0aWFsIHRva2VuIHNldC5cbiAgICovXG4gIG9uQXV0aG9yaXplPzogKHBhcmFtczogT25BdXRob3JpemVQYXJhbXMpID0+IHZvaWQ7XG59O1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgKGZvciBhIHZpZXcvbWVudS1iYXIgY29tbWFuZHMpIG9yIGZ1bmN0aW9uIChmb3IgYSBuby12aWV3IGNvbW1hbmQpIHRoYXQgaXMgcGFzc2VkIHRvIHdpdGhBY2Nlc3NUb2tlbi5cbiAqL1xuZXhwb3J0IHR5cGUgV2l0aEFjY2Vzc1Rva2VuQ29tcG9uZW50T3JGbjxUID0gYW55LCBVID0gYW55PiA9ICgocGFyYW1zOiBUKSA9PiBQcm9taXNlPFU+IHwgVSkgfCBSZWFjdC5Db21wb25lbnRUeXBlPFQ+O1xuXG4vKipcbiAqIEhpZ2hlci1vcmRlciBjb21wb25lbnQgdG8gd3JhcCBhIGdpdmVuIGNvbXBvbmVudCBvciBmdW5jdGlvbiBhbmQgc2V0IGFuIGFjY2VzcyB0b2tlbiBpbiBhIHNoYXJlZCBnbG9iYWwgdmFyaWFibGUuXG4gKlxuICogVGhlIGZ1bmN0aW9uIGludGVyY2VwdHMgdGhlIGNvbXBvbmVudCByZW5kZXJpbmcgcHJvY2VzcyB0byBlaXRoZXIgZmV0Y2ggYW4gT0F1dGggdG9rZW4gYXN5bmNocm9ub3VzbHlcbiAqIG9yIHVzZSBhIHByb3ZpZGVkIHBlcnNvbmFsIGFjY2VzcyB0b2tlbi4gQSBnbG9iYWwgdmFyaWFibGUgd2lsbCBiZSB0aGVuIHNldCB3aXRoIHRoZSByZWNlaXZlZCB0b2tlblxuICogdGhhdCB5b3UgY2FuIGdldCB3aXRoIHRoZSBgZ2V0QWNjZXNzVG9rZW5gIGZ1bmN0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBEZXRhaWwgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyBPQXV0aFNlcnZpY2UsIGdldEFjY2Vzc1Rva2VuLCB3aXRoQWNjZXNzVG9rZW4gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBjb25zdCBnaXRodWIgPSBPQXV0aFNlcnZpY2UuZ2l0aHViKHsgc2NvcGU6IFwibm90aWZpY2F0aW9ucyByZXBvIHJlYWQ6b3JnIHJlYWQ6dXNlciByZWFkOnByb2plY3RcIiB9KTtcbiAqXG4gKiBmdW5jdGlvbiBBdXRob3JpemVkQ29tcG9uZW50KCkge1xuICogIGNvbnN0IHsgdG9rZW4gfSA9IGdldEFjY2Vzc1Rva2VuKCk7XG4gKiAgLi4uXG4gKiB9XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgd2l0aEFjY2Vzc1Rva2VuKGdpdGh1YikoQXV0aG9yaXplZENvbXBvbmVudCk7XG4gKiBgYGBcbiAqXG4gKiBAcmV0dXJucyB7UmVhY3QuQ29tcG9uZW50VHlwZTxUPn0gVGhlIHdyYXBwZWQgY29tcG9uZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aEFjY2Vzc1Rva2VuPFQgPSBhbnksIFUgPSBhbnk+KFxuICBvcHRpb25zOiBXaXRoQWNjZXNzVG9rZW5QYXJhbWV0ZXJzLFxuKTogPFYgZXh0ZW5kcyBXaXRoQWNjZXNzVG9rZW5Db21wb25lbnRPckZuPFQsIFU+PihcbiAgZm5PckNvbXBvbmVudDogVixcbikgPT4gViBleHRlbmRzIFJlYWN0LkNvbXBvbmVudFR5cGU8VD4gPyBSZWFjdC5GdW5jdGlvbkNvbXBvbmVudDxUPiA6IChwcm9wczogVCkgPT4gUHJvbWlzZTxVPjtcbmV4cG9ydCBmdW5jdGlvbiB3aXRoQWNjZXNzVG9rZW48VD4ob3B0aW9uczogV2l0aEFjY2Vzc1Rva2VuUGFyYW1ldGVycykge1xuICBpZiAoZW52aXJvbm1lbnQuY29tbWFuZE1vZGUgPT09IFwibm8tdmlld1wiKSB7XG4gICAgcmV0dXJuIChmbjogKHByb3BzOiBUKSA9PiBQcm9taXNlPHZvaWQ+IHwgKCgpID0+IHZvaWQpKSA9PiB7XG4gICAgICBjb25zdCBub1ZpZXdGbiA9IGFzeW5jIChwcm9wczogVCkgPT4ge1xuICAgICAgICBpZiAoIXRva2VuKSB7XG4gICAgICAgICAgdG9rZW4gPSBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4gPz8gKGF3YWl0IG9wdGlvbnMuYXV0aG9yaXplKCkpO1xuICAgICAgICAgIHR5cGUgPSBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4gPyBcInBlcnNvbmFsXCIgOiBcIm9hdXRoXCI7XG4gICAgICAgICAgY29uc3QgaWRUb2tlbiA9IChhd2FpdCBvcHRpb25zLmNsaWVudD8uZ2V0VG9rZW5zKCkpPy5pZFRva2VuO1xuXG4gICAgICAgICAgaWYgKG9wdGlvbnMub25BdXRob3JpemUpIHtcbiAgICAgICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShvcHRpb25zLm9uQXV0aG9yaXplKHsgdG9rZW4sIHR5cGUsIGlkVG9rZW4gfSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbihwcm9wcyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gbm9WaWV3Rm47XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiAoQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlPFQ+KSA9PiB7XG4gICAgY29uc3QgV3JhcHBlZENvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50VHlwZTxUPiA9IChwcm9wcykgPT4ge1xuICAgICAgaWYgKG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbikge1xuICAgICAgICB0b2tlbiA9IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbjtcbiAgICAgICAgdHlwZSA9IFwicGVyc29uYWxcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghYXV0aG9yaXplKSB7XG4gICAgICAgICAgYXV0aG9yaXplID0gb3B0aW9ucy5hdXRob3JpemUoKTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbiA9IFJlYWN0LnVzZShhdXRob3JpemUpO1xuICAgICAgICB0eXBlID0gXCJvYXV0aFwiO1xuICAgICAgfVxuXG4gICAgICBsZXQgaWRUb2tlbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKG9wdGlvbnMuY2xpZW50KSB7XG4gICAgICAgIGlmICghZ2V0SWRUb2tlbikge1xuICAgICAgICAgIGdldElkVG9rZW4gPSBvcHRpb25zLmNsaWVudD8uZ2V0VG9rZW5zKCkudGhlbigodG9rZW5zKSA9PiB0b2tlbnM/LmlkVG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGlkVG9rZW4gPSBSZWFjdC51c2UoZ2V0SWRUb2tlbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm9uQXV0aG9yaXplKSB7XG4gICAgICAgIGlmICghb25BdXRob3JpemUpIHtcbiAgICAgICAgICBvbkF1dGhvcml6ZSA9IFByb21pc2UucmVzb2x2ZShvcHRpb25zLm9uQXV0aG9yaXplKHsgdG9rZW46IHRva2VuISwgdHlwZSwgaWRUb2tlbiB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgUmVhY3QudXNlKG9uQXV0aG9yaXplKTtcbiAgICAgIH1cblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgICAgLy8gQHRzLWlnbm9yZSB0b28gY29tcGxpY2F0ZWQgZm9yIFRTXG4gICAgICByZXR1cm4gPENvbXBvbmVudCB7Li4ucHJvcHN9IC8+O1xuICAgIH07XG5cbiAgICBXcmFwcGVkQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gYHdpdGhBY2Nlc3NUb2tlbigke0NvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZX0pYDtcblxuICAgIHJldHVybiBXcmFwcGVkQ29tcG9uZW50O1xuICB9O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGFjY2VzcyB0b2tlbiBhbmQgaXRzIHR5cGUuIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIG11c3QgYmUgY2FsbGVkIGluIGEgY29tcG9uZW50IHdyYXBwZWQgd2l0aCBgd2l0aEFjY2Vzc1Rva2VuYC5cbiAqXG4gKiBXaWxsIHRocm93IGFuIEVycm9yIGlmIGNhbGxlZCBvdXRzaWRlIG9mIGEgZnVuY3Rpb24gb3IgY29tcG9uZW50IHdyYXBwZWQgd2l0aCBgd2l0aEFjY2Vzc1Rva2VuYFxuICpcbiAqIEByZXR1cm5zIHt7IHRva2VuOiBzdHJpbmcsIHR5cGU6IFwib2F1dGhcIiB8IFwicGVyc29uYWxcIiB9fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgYHRva2VuYFxuICogYW5kIGl0cyBgdHlwZWAsIHdoZXJlIHR5cGUgY2FuIGJlIGVpdGhlciAnb2F1dGgnIGZvciBPQXV0aCB0b2tlbnMgb3IgJ3BlcnNvbmFsJyBmb3IgYVxuICogcGVyc29uYWwgYWNjZXNzIHRva2VuLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWNjZXNzVG9rZW4oKToge1xuICB0b2tlbjogc3RyaW5nO1xuICAvKiogYG9hdXRoYCBmb3IgT0F1dGggdG9rZW5zIG9yIGBwZXJzb25hbGAgZm9yIHBlcnNvbmFsIGFjY2VzcyB0b2tlbiAqL1xuICB0eXBlOiBcIm9hdXRoXCIgfCBcInBlcnNvbmFsXCI7XG59IHtcbiAgaWYgKCF0b2tlbiB8fCAhdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdldEFjY2Vzc1Rva2VuIG11c3QgYmUgdXNlZCB3aGVuIGF1dGhlbnRpY2F0ZWQgKGVnLiB1c2VkIGluc2lkZSBgd2l0aEFjY2Vzc1Rva2VuYClcIik7XG4gIH1cblxuICByZXR1cm4geyB0b2tlbiwgdHlwZSB9O1xufVxuIiwgImltcG9ydCB7IGVudmlyb25tZW50LCBMYXVuY2hQcm9wcywgTGF1bmNoVHlwZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuXG5leHBvcnQgZW51bSBEZWVwbGlua1R5cGUge1xuICAvKiogQSBzY3JpcHQgY29tbWFuZCAqL1xuICBTY3JpcHRDb21tYW5kID0gXCJzY3JpcHQtY29tbWFuZFwiLFxuICAvKiogQW4gZXh0ZW5zaW9uIGNvbW1hbmQgKi9cbiAgRXh0ZW5zaW9uID0gXCJleHRlbnNpb25cIixcbn1cblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIGRlZXBsaW5rIHRvIGEgc2NyaXB0IGNvbW1hbmQuXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGlua09wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBkZWVwbGluaywgd2hpY2ggc2hvdWxkIGJlIFwic2NyaXB0LWNvbW1hbmRcIi5cbiAgICovXG4gIHR5cGU6IERlZXBsaW5rVHlwZS5TY3JpcHRDb21tYW5kO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGNvbW1hbmQuXG4gICAqL1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBJZiB0aGUgY29tbWFuZCBhY2NlcHRzIGFyZ3VtZW50cywgdGhleSBjYW4gYmUgcGFzc2VkIHVzaW5nIHRoaXMgcXVlcnkgcGFyYW1ldGVyLlxuICAgKi9cbiAgYXJndW1lbnRzPzogc3RyaW5nW107XG59O1xuXG4vKipcbiAqIEJhc2Ugb3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBkZWVwbGluayB0byBhbiBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rQmFzZU9wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBkZWVwbGluaywgd2hpY2ggc2hvdWxkIGJlIFwiZXh0ZW5zaW9uXCIuXG4gICAqL1xuICB0eXBlPzogRGVlcGxpbmtUeXBlLkV4dGVuc2lvbjtcbiAgLyoqXG4gICAqIFRoZSBjb21tYW5kIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXh0ZW5zaW9uLlxuICAgKi9cbiAgY29tbWFuZDogc3RyaW5nO1xuICAvKipcbiAgICogRWl0aGVyIFwidXNlckluaXRpYXRlZFwiLCB3aGljaCBydW5zIHRoZSBjb21tYW5kIGluIHRoZSBmb3JlZ3JvdW5kLCBvciBcImJhY2tncm91bmRcIiwgd2hpY2ggc2tpcHMgYnJpbmdpbmcgUmF5Y2FzdCB0byB0aGUgZnJvbnQuXG4gICAqL1xuICBsYXVuY2hUeXBlPzogTGF1bmNoVHlwZTtcbiAgLyoqXG4gICAqIElmIHRoZSBjb21tYW5kIGFjY2VwdHMgYXJndW1lbnRzLCB0aGV5IGNhbiBiZSBwYXNzZWQgdXNpbmcgdGhpcyBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqL1xuICBhcmd1bWVudHM/OiBMYXVuY2hQcm9wc1tcImFyZ3VtZW50c1wiXTtcbiAgLyoqXG4gICAqIElmIHRoZSBjb21tYW5kIG1ha2UgdXNlIG9mIExhdW5jaENvbnRleHQsIGl0IGNhbiBiZSBwYXNzZWQgdXNpbmcgdGhpcyBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqL1xuICBjb250ZXh0PzogTGF1bmNoUHJvcHNbXCJsYXVuY2hDb250ZXh0XCJdO1xuICAvKipcbiAgICogU29tZSB0ZXh0IHRvIHByZWZpbGwgdGhlIHNlYXJjaCBiYXIgb3IgZmlyc3QgdGV4dCBpbnB1dCBvZiB0aGUgY29tbWFuZFxuICAgKi9cbiAgZmFsbGJhY2tUZXh0Pzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIGRlZXBsaW5rIHRvIGFuIGV4dGVuc2lvbiBmcm9tIGFub3RoZXIgZXh0ZW5zaW9uLlxuICogUmVxdWlyZXMgYm90aCB0aGUgb3duZXJPckF1dGhvck5hbWUgYW5kIGV4dGVuc2lvbk5hbWUuXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0ZUludGVyRXh0ZW5zaW9uRGVlcGxpbmtPcHRpb25zID0gQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtCYXNlT3B0aW9ucyAmIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBvd25lciBvciBhdXRob3Igb2YgdGhlIGV4dGVuc2lvbi5cbiAgICovXG4gIG93bmVyT3JBdXRob3JOYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgZXh0ZW5zaW9uLlxuICAgKi9cbiAgZXh0ZW5zaW9uTmFtZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIGRlZXBsaW5rIHRvIGFuIGV4dGVuc2lvbi5cbiAqL1xuZXhwb3J0IHR5cGUgQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtPcHRpb25zID0gQ3JlYXRlSW50ZXJFeHRlbnNpb25EZWVwbGlua09wdGlvbnMgfCBDcmVhdGVFeHRlbnNpb25EZWVwbGlua0Jhc2VPcHRpb25zO1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgZGVlcGxpbmsuXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0ZURlZXBsaW5rT3B0aW9ucyA9IENyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGlua09wdGlvbnMgfCBDcmVhdGVFeHRlbnNpb25EZWVwbGlua09wdGlvbnM7XG5cbmZ1bmN0aW9uIGdldFByb3RvY29sKCkge1xuICByZXR1cm4gZW52aXJvbm1lbnQucmF5Y2FzdFZlcnNpb24uaW5jbHVkZXMoXCJhbHBoYVwiKSA/IFwicmF5Y2FzdGludGVybmFsOi8vXCIgOiBcInJheWNhc3Q6Ly9cIjtcbn1cblxuZnVuY3Rpb24gZ2V0T3duZXJPckF1dGhvck5hbWUoKSB7XG4gIGNvbnN0IHBhY2thZ2VKU09OID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGVudmlyb25tZW50LmFzc2V0c1BhdGgsIFwiLi5cIiwgXCJwYWNrYWdlLmpzb25cIiksIFwidXRmOFwiKSk7XG4gIHJldHVybiBwYWNrYWdlSlNPTi5vd25lciB8fCBwYWNrYWdlSlNPTi5hdXRob3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmsob3B0aW9uczogQ3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rT3B0aW9ucyk6IHN0cmluZyB7XG4gIGxldCB1cmwgPSBgJHtnZXRQcm90b2NvbCgpfXNjcmlwdC1jb21tYW5kcy8ke29wdGlvbnMuY29tbWFuZH1gO1xuXG4gIGlmIChvcHRpb25zLmFyZ3VtZW50cykge1xuICAgIGxldCBwYXJhbXMgPSBcIlwiO1xuICAgIGZvciAoY29uc3QgYXJnIG9mIG9wdGlvbnMuYXJndW1lbnRzKSB7XG4gICAgICBwYXJhbXMgKz0gXCImYXJndW1lbnRzPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZyk7XG4gICAgfVxuICAgIHVybCArPSBcIj9cIiArIHBhcmFtcy5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmsob3B0aW9uczogQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtPcHRpb25zKTogc3RyaW5nIHtcbiAgbGV0IG93bmVyT3JBdXRob3JOYW1lID0gZ2V0T3duZXJPckF1dGhvck5hbWUoKTtcbiAgbGV0IGV4dGVuc2lvbk5hbWUgPSBlbnZpcm9ubWVudC5leHRlbnNpb25OYW1lO1xuXG4gIGlmIChcIm93bmVyT3JBdXRob3JOYW1lXCIgaW4gb3B0aW9ucyAmJiBcImV4dGVuc2lvbk5hbWVcIiBpbiBvcHRpb25zKSB7XG4gICAgb3duZXJPckF1dGhvck5hbWUgPSBvcHRpb25zLm93bmVyT3JBdXRob3JOYW1lO1xuICAgIGV4dGVuc2lvbk5hbWUgPSBvcHRpb25zLmV4dGVuc2lvbk5hbWU7XG4gIH1cblxuICBsZXQgdXJsID0gYCR7Z2V0UHJvdG9jb2woKX1leHRlbnNpb25zLyR7b3duZXJPckF1dGhvck5hbWV9LyR7ZXh0ZW5zaW9uTmFtZX0vJHtvcHRpb25zLmNvbW1hbmR9YDtcblxuICBsZXQgcGFyYW1zID0gXCJcIjtcbiAgaWYgKG9wdGlvbnMubGF1bmNoVHlwZSkge1xuICAgIHBhcmFtcyArPSBcIiZsYXVuY2hUeXBlPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMubGF1bmNoVHlwZSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5hcmd1bWVudHMpIHtcbiAgICBwYXJhbXMgKz0gXCImYXJndW1lbnRzPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuYXJndW1lbnRzKSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5jb250ZXh0KSB7XG4gICAgcGFyYW1zICs9IFwiJmNvbnRleHQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5jb250ZXh0KSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5mYWxsYmFja1RleHQpIHtcbiAgICBwYXJhbXMgKz0gXCImZmFsbGJhY2tUZXh0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG9wdGlvbnMuZmFsbGJhY2tUZXh0KTtcbiAgfVxuXG4gIGlmIChwYXJhbXMpIHtcbiAgICB1cmwgKz0gXCI/XCIgKyBwYXJhbXMuc3Vic3RyaW5nKDEpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVlcGxpbmsgdG8gYSBzY3JpcHQgY29tbWFuZCBvciBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWVwbGluayhvcHRpb25zOiBDcmVhdGVEZWVwbGlua09wdGlvbnMpOiBzdHJpbmcge1xuICBpZiAob3B0aW9ucy50eXBlID09PSBEZWVwbGlua1R5cGUuU2NyaXB0Q29tbWFuZCkge1xuICAgIHJldHVybiBjcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmsob3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rKG9wdGlvbnMpO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgYmFzZUV4ZWN1dGVTUUwgfSBmcm9tIFwiLi9zcWwtdXRpbHNcIjtcblxuLyoqXG4gKiBFeGVjdXRlcyBhIFNRTCBxdWVyeSBvbiBhIGxvY2FsIFNRTGl0ZSBkYXRhYmFzZSBhbmQgcmV0dXJucyB0aGUgcXVlcnkgcmVzdWx0IGluIEpTT04gZm9ybWF0LlxuICpcbiAqIEBwYXJhbSBkYXRhYmFzZVBhdGggLSBUaGUgcGF0aCB0byB0aGUgU1FMaXRlIGRhdGFiYXNlIGZpbGUuXG4gKiBAcGFyYW0gcXVlcnkgLSBUaGUgU1FMIHF1ZXJ5IHRvIGV4ZWN1dGUuXG4gKiBAcmV0dXJucyBBIFByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhcnJheSBvZiBvYmplY3RzIHJlcHJlc2VudGluZyB0aGUgcXVlcnkgcmVzdWx0cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgY2xvc2VNYWluV2luZG93LCBDbGlwYm9hcmQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyBleGVjdXRlU1FMIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogdHlwZSBNZXNzYWdlID0geyBib2R5OiBzdHJpbmc7IGNvZGU6IHN0cmluZyB9O1xuICpcbiAqIGNvbnN0IERCX1BBVEggPSBcIi9wYXRoL3RvL2NoYXQuZGJcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBxdWVyeSA9IGBTRUxFQ1QgYm9keSwgY29kZSBGUk9NIC4uLmBcbiAqXG4gKiAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZXhlY3V0ZVNRTDxNZXNzYWdlPihEQl9QQVRILCBxdWVyeSk7XG4gKlxuICogICBpZiAobWVzc2FnZXMubGVuZ3RoID4gMCkge1xuICogICAgIGNvbnN0IGxhdGVzdENvZGUgPSBtZXNzYWdlc1swXS5jb2RlO1xuICogICAgIGF3YWl0IENsaXBib2FyZC5wYXN0ZShsYXRlc3RDb2RlKTtcbiAqICAgICBhd2FpdCBjbG9zZU1haW5XaW5kb3coKTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlU1FMPFQgPSB1bmtub3duPihkYXRhYmFzZVBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZykge1xuICByZXR1cm4gYmFzZUV4ZWN1dGVTUUw8VD4oZGF0YWJhc2VQYXRoLCBxdWVyeSk7XG59XG4iLCAiaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0UGFyc2luZyxcbiAgZ2V0U3Bhd25lZFByb21pc2UsXG4gIGdldFNwYXduZWRSZXN1bHQsXG4gIGhhbmRsZU91dHB1dCxcbiAgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcixcbn0gZnJvbSBcIi4vZXhlYy11dGlsc1wiO1xuXG50eXBlIEFwcGxlU2NyaXB0T3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIGBydW5BcHBsZVNjcmlwdGAgcmV0dXJucyBpdHMgcmVzdWx0cyBpbiBodW1hbi1yZWFkYWJsZSBmb3JtOiBzdHJpbmdzIGRvIG5vdCBoYXZlIHF1b3RlcyBhcm91bmQgdGhlbSwgY2hhcmFjdGVycyBhcmUgbm90IGVzY2FwZWQsIGJyYWNlcyBmb3IgbGlzdHMgYW5kIHJlY29yZHMgYXJlIG9taXR0ZWQsIGV0Yy4gVGhpcyBpcyBnZW5lcmFsbHkgbW9yZSB1c2VmdWwsIGJ1dCBjYW4gaW50cm9kdWNlIGFtYmlndWl0aWVzLiBGb3IgZXhhbXBsZSwgdGhlIGxpc3RzIGB7XCJmb29cIiwgXCJiYXJcIn1gIGFuZCBge3tcImZvb1wiLCB7XCJiYXJcIn19fWAgd291bGQgYm90aCBiZSBkaXNwbGF5ZWQgYXMg4oCYZm9vLCBiYXLigJkuIFRvIHNlZSB0aGUgcmVzdWx0cyBpbiBhbiB1bmFtYmlndW91cyBmb3JtIHRoYXQgY291bGQgYmUgcmVjb21waWxlZCBpbnRvIHRoZSBzYW1lIHZhbHVlLCBzZXQgYGh1bWFuUmVhZGFibGVPdXRwdXRgIHRvIGBmYWxzZWAuXG4gICAqXG4gICAqIEBkZWZhdWx0IHRydWVcbiAgICovXG4gIGh1bWFuUmVhZGFibGVPdXRwdXQ/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0aGUgc2NyaXB0IGlzIHVzaW5nIFtgQXBwbGVTY3JpcHRgXShodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vbGlicmFyeS9hcmNoaXZlL2RvY3VtZW50YXRpb24vQXBwbGVTY3JpcHQvQ29uY2VwdHVhbC9BcHBsZVNjcmlwdExhbmdHdWlkZS9pbnRyb2R1Y3Rpb24vQVNMUl9pbnRyby5odG1sIy8vYXBwbGVfcmVmL2RvYy91aWQvVFA0MDAwMDk4Mykgb3IgW2BKYXZhU2NyaXB0YF0oaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvYXJjaGl2ZS9yZWxlYXNlbm90ZXMvSW50ZXJhcHBsaWNhdGlvbkNvbW11bmljYXRpb24vUk4tSmF2YVNjcmlwdEZvckF1dG9tYXRpb24vQXJ0aWNsZXMvSW50cm9kdWN0aW9uLmh0bWwjLy9hcHBsZV9yZWYvZG9jL3VpZC9UUDQwMDE0NTA4LUNIMTExLVNXMSkuXG4gICAqXG4gICAqIEBkZWZhdWx0IFwiQXBwbGVTY3JpcHRcIlxuICAgKi9cbiAgbGFuZ3VhZ2U/OiBcIkFwcGxlU2NyaXB0XCIgfCBcIkphdmFTY3JpcHRcIjtcbiAgLyoqXG4gICAqIEEgU2lnbmFsIG9iamVjdCB0aGF0IGFsbG93cyB5b3UgdG8gYWJvcnQgdGhlIHJlcXVlc3QgaWYgcmVxdWlyZWQgdmlhIGFuIEFib3J0Q29udHJvbGxlciBvYmplY3QuXG4gICAqL1xuICBzaWduYWw/OiBBYm9ydFNpZ25hbDtcbiAgLyoqIElmIHRpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIGAwYCwgdGhlIHBhcmVudCB3aWxsIHNlbmQgdGhlIHNpZ25hbCBgU0lHVEVSTWAgaWYgdGhlIGNoaWxkIHJ1bnMgbG9uZ2VyIHRoYW4gdGltZW91dCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEBkZWZhdWx0IDEwMDAwXG4gICAqL1xuICB0aW1lb3V0PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBhbiBBcHBsZVNjcmlwdCBzY3JpcHQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IHNob3dIVUQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyBydW5BcHBsZVNjcmlwdCwgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAqICAgdHJ5IHtcbiAqICAgICBjb25zdCByZXMgPSBhd2FpdCBydW5BcHBsZVNjcmlwdChcbiAqICAgICAgIGBcbiAqICAgICAgIG9uIHJ1biBhcmd2XG4gKiAgICAgICAgIHJldHVybiBcImhlbGxvLCBcIiAmIGl0ZW0gMSBvZiBhcmd2ICYgXCIuXCJcbiAqICAgICAgIGVuZCBydW5cbiAqICAgICAgIGAsXG4gKiAgICAgICBbXCJ3b3JsZFwiXVxuICogICAgICk7XG4gKiAgICAgYXdhaXQgc2hvd0hVRChyZXMpO1xuICogICB9IGNhdGNoIChlcnJvcikge1xuICogICAgIHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHsgdGl0bGU6IFwiQ291bGQgbm90IHJ1biBBcHBsZVNjcmlwdFwiIH0pO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0PFQgPSBzdHJpbmc+KFxuICBzY3JpcHQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwcGxlU2NyaXB0T3B0aW9ucyAmIHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBBcHBsZVNjcmlwdE9wdGlvbnM+O1xuICB9LFxuKTogUHJvbWlzZTxzdHJpbmc+O1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0PFQgPSBzdHJpbmc+KFxuICBzY3JpcHQ6IHN0cmluZyxcbiAgLyoqXG4gICAqIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgc2NyaXB0LlxuICAgKi9cbiAgYXJnczogc3RyaW5nW10sXG4gIG9wdGlvbnM/OiBBcHBsZVNjcmlwdE9wdGlvbnMgJiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgQXBwbGVTY3JpcHRPcHRpb25zPjtcbiAgfSxcbik6IFByb21pc2U8c3RyaW5nPjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5BcHBsZVNjcmlwdDxUID0gc3RyaW5nPihcbiAgc2NyaXB0OiBzdHJpbmcsXG4gIG9wdGlvbnNPckFyZ3M/OlxuICAgIHwgc3RyaW5nW11cbiAgICB8IChBcHBsZVNjcmlwdE9wdGlvbnMgJiB7XG4gICAgICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEFwcGxlU2NyaXB0T3B0aW9ucz47XG4gICAgICB9KSxcbiAgb3B0aW9ucz86IEFwcGxlU2NyaXB0T3B0aW9ucyAmIHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBBcHBsZVNjcmlwdE9wdGlvbnM+O1xuICB9LFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09IFwiZGFyd2luXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJBcHBsZVNjcmlwdCBpcyBvbmx5IHN1cHBvcnRlZCBvbiBtYWNPU1wiKTtcbiAgfVxuXG4gIGNvbnN0IHsgaHVtYW5SZWFkYWJsZU91dHB1dCwgbGFuZ3VhZ2UsIHRpbWVvdXQsIC4uLmV4ZWNPcHRpb25zIH0gPSBBcnJheS5pc0FycmF5KG9wdGlvbnNPckFyZ3MpXG4gICAgPyBvcHRpb25zIHx8IHt9XG4gICAgOiBvcHRpb25zT3JBcmdzIHx8IHt9O1xuXG4gIGNvbnN0IG91dHB1dEFyZ3VtZW50cyA9IGh1bWFuUmVhZGFibGVPdXRwdXQgIT09IGZhbHNlID8gW10gOiBbXCItc3NcIl07XG4gIGlmIChsYW5ndWFnZSA9PT0gXCJKYXZhU2NyaXB0XCIpIHtcbiAgICBvdXRwdXRBcmd1bWVudHMucHVzaChcIi1sXCIsIFwiSmF2YVNjcmlwdFwiKTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zT3JBcmdzKSkge1xuICAgIG91dHB1dEFyZ3VtZW50cy5wdXNoKFwiLVwiLCAuLi5vcHRpb25zT3JBcmdzKTtcbiAgfVxuXG4gIGNvbnN0IHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24oXCJvc2FzY3JpcHRcIiwgb3V0cHV0QXJndW1lbnRzLCB7XG4gICAgLi4uZXhlY09wdGlvbnMsXG4gICAgZW52OiB7IFBBVEg6IFwiL3Vzci9sb2NhbC9iaW46L3Vzci9iaW46L2JpbjovdXNyL3NiaW46L3NiaW5cIiB9LFxuICB9KTtcbiAgY29uc3Qgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkLCB7IHRpbWVvdXQ6IHRpbWVvdXQgPz8gMTAwMDAgfSk7XG5cbiAgc3Bhd25lZC5zdGRpbi5lbmQoc2NyaXB0KTtcblxuICBjb25zdCBbeyBlcnJvciwgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXQgfSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdDxzdHJpbmc+KFxuICAgIHNwYXduZWQsXG4gICAgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSxcbiAgICBzcGF3bmVkUHJvbWlzZSxcbiAgKTtcbiAgY29uc3Qgc3Rkb3V0ID0gaGFuZGxlT3V0cHV0KHsgc3RyaXBGaW5hbE5ld2xpbmU6IHRydWUgfSwgc3Rkb3V0UmVzdWx0KTtcbiAgY29uc3Qgc3RkZXJyID0gaGFuZGxlT3V0cHV0KHsgc3RyaXBGaW5hbE5ld2xpbmU6IHRydWUgfSwgc3RkZXJyUmVzdWx0KTtcblxuICByZXR1cm4gZGVmYXVsdFBhcnNpbmcoe1xuICAgIHN0ZG91dCxcbiAgICBzdGRlcnIsXG4gICAgZXJyb3IsXG4gICAgZXhpdENvZGUsXG4gICAgc2lnbmFsLFxuICAgIHRpbWVkT3V0LFxuICAgIGNvbW1hbmQ6IFwib3Nhc2NyaXB0XCIsXG4gICAgb3B0aW9ucyxcbiAgICBwYXJlbnRFcnJvcjogbmV3IEVycm9yKCksXG4gIH0pO1xufVxuIiwgImltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHtcbiAgZGVmYXVsdFBhcnNpbmcsXG4gIGdldFNwYXduZWRQcm9taXNlLFxuICBnZXRTcGF3bmVkUmVzdWx0LFxuICBoYW5kbGVPdXRwdXQsXG4gIFBhcnNlRXhlY091dHB1dEhhbmRsZXIsXG59IGZyb20gXCIuL2V4ZWMtdXRpbHNcIjtcblxudHlwZSBQb3dlclNoZWxsU2NyaXB0T3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIEEgU2lnbmFsIG9iamVjdCB0aGF0IGFsbG93cyB5b3UgdG8gYWJvcnQgdGhlIHJlcXVlc3QgaWYgcmVxdWlyZWQgdmlhIGFuIEFib3J0Q29udHJvbGxlciBvYmplY3QuXG4gICAqL1xuICBzaWduYWw/OiBBYm9ydFNpZ25hbDtcbiAgLyoqIElmIHRpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIGAwYCwgdGhlIHBhcmVudCB3aWxsIHNlbmQgdGhlIHNpZ25hbCBgU0lHVEVSTWAgaWYgdGhlIGNoaWxkIHJ1bnMgbG9uZ2VyIHRoYW4gdGltZW91dCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEBkZWZhdWx0IDEwMDAwXG4gICAqL1xuICB0aW1lb3V0PzogbnVtYmVyO1xufTtcblxuLyoqXG4gKiBFeGVjdXRlcyBhIFBvd2VyU2hlbGwgc2NyaXB0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBzaG93SFVEIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgcnVuUG93ZXJTaGVsbFNjcmlwdCwgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAqICAgdHJ5IHtcbiAqICAgICBjb25zdCByZXMgPSBhd2FpdCBydW5Qb3dlclNoZWxsU2NyaXB0KFxuICogICAgICAgYFxuICogICAgICAgV3JpdGUtSG9zdCBcImhlbGxvLCB3b3JsZC5cIlxuICogICAgICAgYCxcbiAqICAgICApO1xuICogICAgIGF3YWl0IHNob3dIVUQocmVzKTtcbiAqICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAqICAgICBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7IHRpdGxlOiBcIkNvdWxkIG5vdCBydW4gUG93ZXJTaGVsbFwiIH0pO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1blBvd2VyU2hlbGxTY3JpcHQ8VCA9IHN0cmluZz4oXG4gIHNjcmlwdDogc3RyaW5nLFxuICBvcHRpb25zPzogUG93ZXJTaGVsbFNjcmlwdE9wdGlvbnMgJiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgUG93ZXJTaGVsbFNjcmlwdE9wdGlvbnM+O1xuICB9LFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09IFwid2luMzJcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlBvd2VyU2hlbGwgaXMgb25seSBzdXBwb3J0ZWQgb24gV2luZG93c1wiKTtcbiAgfVxuXG4gIGNvbnN0IHsgdGltZW91dCwgLi4uZXhlY09wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3Qgb3V0cHV0QXJndW1lbnRzID0gW1wiLU5vTG9nb1wiLCBcIi1Ob1Byb2ZpbGVcIiwgXCItTm9uSW50ZXJhY3RpdmVcIiwgXCItQ29tbWFuZFwiLCBcIi1cIl07XG5cbiAgY29uc3Qgc3Bhd25lZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bihcInBvd2Vyc2hlbGwuZXhlXCIsIG91dHB1dEFyZ3VtZW50cywge1xuICAgIC4uLmV4ZWNPcHRpb25zLFxuICB9KTtcbiAgY29uc3Qgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkLCB7IHRpbWVvdXQ6IHRpbWVvdXQgPz8gMTAwMDAgfSk7XG5cbiAgc3Bhd25lZC5zdGRpbi5lbmQoc2NyaXB0KTtcblxuICBjb25zdCBbeyBlcnJvciwgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXQgfSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdDxzdHJpbmc+KFxuICAgIHNwYXduZWQsXG4gICAgeyBlbmNvZGluZzogXCJ1dGY4XCIgfSxcbiAgICBzcGF3bmVkUHJvbWlzZSxcbiAgKTtcbiAgY29uc3Qgc3Rkb3V0ID0gaGFuZGxlT3V0cHV0KHsgc3RyaXBGaW5hbE5ld2xpbmU6IHRydWUgfSwgc3Rkb3V0UmVzdWx0KTtcbiAgY29uc3Qgc3RkZXJyID0gaGFuZGxlT3V0cHV0KHsgc3RyaXBGaW5hbE5ld2xpbmU6IHRydWUgfSwgc3RkZXJyUmVzdWx0KTtcblxuICByZXR1cm4gZGVmYXVsdFBhcnNpbmcoe1xuICAgIHN0ZG91dCxcbiAgICBzdGRlcnIsXG4gICAgZXJyb3IsXG4gICAgZXhpdENvZGUsXG4gICAgc2lnbmFsLFxuICAgIHRpbWVkT3V0LFxuICAgIGNvbW1hbmQ6IFwicG93ZXJzaGVsbC5leGVcIixcbiAgICBvcHRpb25zLFxuICAgIHBhcmVudEVycm9yOiBuZXcgRXJyb3IoKSxcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgQ2FjaGUgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBoYXNoLCByZXBsYWNlciwgcmV2aXZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLyoqXG4gKiBXcmFwcyBhIGZ1bmN0aW9uIHdpdGggY2FjaGluZyBmdW5jdGlvbmFsaXR5IHVzaW5nIFJheWNhc3QncyBDYWNoZSBBUEkuXG4gKiBBbGxvd3MgZm9yIGNhY2hpbmcgb2YgZXhwZW5zaXZlIGZ1bmN0aW9ucyBsaWtlIHBhZ2luYXRlZCBBUEkgY2FsbHMgdGhhdCByYXJlbHkgY2hhbmdlLlxuICpcbiAqIEBwYXJhbSBmbiAtIFRoZSBhc3luYyBmdW5jdGlvbiB0byBjYWNoZSByZXN1bHRzIGZyb21cbiAqIEBwYXJhbSBvcHRpb25zIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBmb3IgdGhlIGNhY2hlIGJlaGF2aW9yXG4gKiBAcGFyYW0gb3B0aW9ucy52YWxpZGF0ZSAtIE9wdGlvbmFsIHZhbGlkYXRpb24gZnVuY3Rpb24gZm9yIGNhY2hlZCBkYXRhXG4gKiBAcGFyYW0gb3B0aW9ucy5tYXhBZ2UgLSBNYXhpbXVtIGFnZSBvZiBjYWNoZWQgZGF0YSBpbiBtaWxsaXNlY29uZHNcbiAqIEByZXR1cm5zIEFuIGFzeW5jIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbiwgZWl0aGVyIGZyb20gY2FjaGUgb3IgZnJlc2ggZXhlY3V0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBjb25zdCBjYWNoZWRGdW5jdGlvbiA9IHdpdGhDYWNoZShmZXRjaEV4cGVuc2l2ZURhdGEsIHtcbiAqICAgbWF4QWdlOiA1ICogNjAgKiAxMDAwIC8vIENhY2hlIGZvciA1IG1pbnV0ZXNcbiAqIH0pO1xuICpcbiAqIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNhY2hlZEZ1bmN0aW9uKHF1ZXJ5KTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gd2l0aENhY2hlPEZuIGV4dGVuZHMgKC4uLmFyZ3M6IGFueSkgPT4gUHJvbWlzZTxhbnk+PihcbiAgZm46IEZuLFxuICBvcHRpb25zPzoge1xuICAgIC8qKiBmdW5jdGlvbiB0aGF0IHJlY2VpdmVzIHRoZSBjYWNoZWQgZGF0YSBhbmQgcmV0dXJucyBhIGJvb2xlYW4gZGVwZW5kaW5nIG9uIHdoZXRoZXIgdGhlIGRhdGEgaXMgc3RpbGwgdmFsaWQgb3Igbm90LiAqL1xuICAgIHZhbGlkYXRlPzogKGRhdGE6IEF3YWl0ZWQ8UmV0dXJuVHlwZTxGbj4+KSA9PiBib29sZWFuO1xuICAgIC8qKiBNYXhpbXVtIGFnZSBvZiBjYWNoZWQgZGF0YSBpbiBtaWxsaXNlY29uZHMgYWZ0ZXIgd2hpY2ggdGhlIGRhdGEgd2lsbCBiZSBjb25zaWRlcmVkIGludmFsaWQgKi9cbiAgICBtYXhBZ2U/OiBudW1iZXI7XG4gIH0sXG4pOiBGbiAmIHsgY2xlYXJDYWNoZTogKCkgPT4gdm9pZCB9IHtcbiAgY29uc3QgY2FjaGUgPSBuZXcgQ2FjaGUoeyBuYW1lc3BhY2U6IGhhc2goZm4pIH0pO1xuXG4gIGNvbnN0IHdyYXBwZWRGbiA9IGFzeW5jICguLi5hcmdzOiBQYXJhbWV0ZXJzPEZuPikgPT4ge1xuICAgIGNvbnN0IGtleSA9XG4gICAgICBoYXNoKGFyZ3MgfHwgW10pICsgKG9wdGlvbnMgYXMgdW5rbm93biBhcyB7IGludGVybmFsX2NhY2hlS2V5U3VmZml4Pzogc3RyaW5nIH0pPy5pbnRlcm5hbF9jYWNoZUtleVN1ZmZpeDtcbiAgICBjb25zdCBjYWNoZWQgPSBjYWNoZS5nZXQoa2V5KTtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICBjb25zdCB7IGRhdGEsIHRpbWVzdGFtcCB9ID0gSlNPTi5wYXJzZShjYWNoZWQsIHJldml2ZXIpO1xuICAgICAgY29uc3QgaXNFeHBpcmVkID0gb3B0aW9ucz8ubWF4QWdlICYmIERhdGUubm93KCkgLSB0aW1lc3RhbXAgPiBvcHRpb25zLm1heEFnZTtcbiAgICAgIGlmICghaXNFeHBpcmVkICYmICghb3B0aW9ucz8udmFsaWRhdGUgfHwgb3B0aW9ucy52YWxpZGF0ZShkYXRhKSkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBmbiguLi5hcmdzKTtcbiAgICBjYWNoZS5zZXQoXG4gICAgICBrZXksXG4gICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAge1xuICAgICAgICAgIGRhdGE6IHJlc3VsdCxcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICAgIHJlcGxhY2VyLFxuICAgICAgKSxcbiAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgd3JhcHBlZEZuLmNsZWFyQ2FjaGUgPSAoKSA9PiB7XG4gICAgY2FjaGUuY2xlYXIoKTtcbiAgfTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIHRvbyBjb21wbGV4IGZvciBUU1xuICByZXR1cm4gd3JhcHBlZEZuO1xufVxuIiwgImltcG9ydCB7IGV4aXN0c1N5bmMsIHJlYWRkaXJTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB0eXBlIHsgQnVmb1Byb2plY3QsIEJ1Zm9UYWRwb2xlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7XG4gIGRpc2NvdmVyUHJvamVjdHMsXG4gIGxvYWRUYWRwb2xlU3RhdGUsXG4gIGxvYWRUYWRwb2xlTWV0YSxcbiAgaXNUYWRwb2xlTG9ja2VkLFxuICBnZXRDdXN0b21OYW1lLFxufSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IGdldEdpdEJyYW5jaCB9IGZyb20gXCIuL2V4ZWNcIjtcbmltcG9ydCB7IGdldEFjdGl2ZVNlc3Npb25zIH0gZnJvbSBcIi4vaXRlcm1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhZHBvbGVEaXIocHJvamVjdDogQnVmb1Byb2plY3QsIG51bTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvaW4ocHJvamVjdC50YWRwb2xlX2Jhc2UsIGAke3Byb2plY3QudGFkcG9sZXMucHJlZml4fS0ke251bX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyVGFkcG9sZXMocHJvamVjdDogQnVmb1Byb2plY3QsIGFjdGl2ZVNlc3Npb25zPzogU2V0PHN0cmluZz4pOiBCdWZvVGFkcG9sZVtdIHtcbiAgY29uc3QgdGFkcG9sZXM6IEJ1Zm9UYWRwb2xlW10gPSBbXTtcblxuICAvLyBEaXNjb3ZlciBieSBzY2FubmluZyB0aGUgdGFkcG9sZV9iYXNlIGRpcmVjdG9yeSBmb3IgPHByZWZpeD4tPE4+IGRpcnMsXG4gIC8vIHJhdGhlciB0aGFuIGl0ZXJhdGluZyAxLi5jb3VudC4gYGNvdW50YCBjb250cm9scyBob3cgbWFueSB0byAqY3JlYXRlKixcbiAgLy8gbm90IGEgY2VpbGluZyBvbiBob3cgbWFueSBjYW4gZXhpc3QuXG4gIGlmICghZXhpc3RzU3luYyhwcm9qZWN0LnRhZHBvbGVfYmFzZSkpIHJldHVybiB0YWRwb2xlcztcblxuICBjb25zdCBwcmVmaXggPSBwcm9qZWN0LnRhZHBvbGVzLnByZWZpeDtcbiAgY29uc3QgZW50cmllcyA9IHJlYWRkaXJTeW5jKHByb2plY3QudGFkcG9sZV9iYXNlLCB7IHdpdGhGaWxlVHlwZXM6IHRydWUgfSk7XG4gIGNvbnN0IG51bXM6IG51bWJlcltdID0gZW50cmllc1xuICAgIC5maWx0ZXIoKGUpID0+IGUuaXNEaXJlY3RvcnkoKSAmJiBlLm5hbWUuc3RhcnRzV2l0aChgJHtwcmVmaXh9LWApKVxuICAgIC5tYXAoKGUpID0+IHBhcnNlSW50KGUubmFtZS5zbGljZShwcmVmaXgubGVuZ3RoICsgMSksIDEwKSlcbiAgICAuZmlsdGVyKChuKSA9PiAhaXNOYU4obikpXG4gICAgLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcblxuICBmb3IgKGNvbnN0IGkgb2YgbnVtcykge1xuICAgIGNvbnN0IGRpciA9IGdldFRhZHBvbGVEaXIocHJvamVjdCwgaSk7XG5cbiAgICBjb25zdCBzdGF0ZSA9IGxvYWRUYWRwb2xlU3RhdGUocHJvamVjdC5zZXNzaW9uX25hbWUsIGkpO1xuICAgIGNvbnN0IG1ldGEgPSBsb2FkVGFkcG9sZU1ldGEoZGlyKTtcbiAgICBjb25zdCBsb2NrZWQgPSBpc1RhZHBvbGVMb2NrZWQoZGlyKTtcbiAgICBjb25zdCBjdXN0b21OYW1lID0gZ2V0Q3VzdG9tTmFtZShkaXIpO1xuICAgIGNvbnN0IGJyYW5jaCA9IGdldEdpdEJyYW5jaChkaXIpO1xuXG4gICAgbGV0IGFjdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChzdGF0ZSAmJiBhY3RpdmVTZXNzaW9ucykge1xuICAgICAgY29uc3QgbWFpblNpZCA9IHN0YXRlLnBhbmVzLm1haW47XG4gICAgICBhY3RpdmUgPSBtYWluU2lkID8gYWN0aXZlU2Vzc2lvbnMuaGFzKG1haW5TaWQpIDogZmFsc2U7XG4gICAgfVxuXG4gICAgdGFkcG9sZXMucHVzaCh7XG4gICAgICBwcm9qZWN0LFxuICAgICAgbnVtYmVyOiBpLFxuICAgICAgZGlyZWN0b3J5OiBkaXIsXG4gICAgICBicmFuY2gsXG4gICAgICBsb2NrZWQsXG4gICAgICBhY3RpdmUsXG4gICAgICBtZXRhLFxuICAgICAgc3RhdGUsXG4gICAgICBjdXN0b21OYW1lLFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRhZHBvbGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsVGFkcG9sZXMoKTogeyBwcm9qZWN0czogQnVmb1Byb2plY3RbXTsgdGFkcG9sZXM6IEJ1Zm9UYWRwb2xlW10gfSB7XG4gIGNvbnN0IHByb2plY3RzID0gZGlzY292ZXJQcm9qZWN0cygpO1xuICBjb25zdCBhY3RpdmVTZXNzaW9ucyA9IGdldEFjdGl2ZVNlc3Npb25zKCk7XG4gIGNvbnN0IHRhZHBvbGVzOiBCdWZvVGFkcG9sZVtdID0gW107XG5cbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgdGFkcG9sZXMucHVzaCguLi5kaXNjb3ZlclRhZHBvbGVzKHByb2plY3QsIGFjdGl2ZVNlc3Npb25zKSk7XG4gIH1cblxuICByZXR1cm4geyBwcm9qZWN0cywgdGFkcG9sZXMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhZHBvbGVUaXRsZSh0cDogQnVmb1RhZHBvbGUpOiBzdHJpbmcge1xuICBpZiAodHAubWV0YT8ucHJfdGl0bGUpIHtcbiAgICBjb25zdCBuYW1lID0gdHAuY3VzdG9tTmFtZSB8fCBgdHAke3RwLm51bWJlcn1gO1xuICAgIHJldHVybiBgJHtuYW1lfTogJHt0cC5tZXRhLnByX3RpdGxlfWA7XG4gIH1cbiAgaWYgKHRwLm1ldGE/LnRpY2tldCkge1xuICAgIGNvbnN0IG5hbWUgPSB0cC5jdXN0b21OYW1lIHx8IGB0cCR7dHAubnVtYmVyfWA7XG4gICAgcmV0dXJuIGAke25hbWV9ICgke3RwLm1ldGEudGlja2V0fSlgO1xuICB9XG4gIGlmICh0cC5jdXN0b21OYW1lKSByZXR1cm4gdHAuY3VzdG9tTmFtZTtcbiAgcmV0dXJuIGAke3RwLnByb2plY3QudGFkcG9sZXMucHJlZml4fS0ke3RwLm51bWJlcn1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFkcG9sZVN1YnRpdGxlKHRwOiBCdWZvVGFkcG9sZSk6IHN0cmluZyB7XG4gIGNvbnN0IHBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuICBpZiAodHAuYnJhbmNoICYmIHRwLmJyYW5jaCAhPT0gXCJ1bmtub3duXCIpIHBhcnRzLnB1c2godHAuYnJhbmNoKTtcbiAgaWYgKHRwLm1ldGE/LnR5cGUgJiYgdHAubWV0YS50eXBlICE9PSBcInRhZHBvbGVcIikgcGFydHMucHVzaCh0cC5tZXRhLnR5cGUudG9VcHBlckNhc2UoKSk7XG4gIHJldHVybiBwYXJ0cy5qb2luKFwiIHwgXCIpO1xufVxuIiwgImltcG9ydCB7IHJlYWRGaWxlU3luYywgZXhpc3RzU3luYywgcmVhZGRpclN5bmMsIHN0YXRTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSBcImpzLXlhbWxcIjtcbmltcG9ydCB0eXBlIHsgQnVmb1Byb2plY3QsIEdsb2JhbENvbmZpZywgVGFkcG9sZU1ldGEsIFRhZHBvbGVTdGF0ZSwgQnVmb1Nlc3Npb24sIFNlc3Npb25MYXlvdXQgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBCVUZPX0RJUiA9IGpvaW4oaG9tZWRpcigpLCBcIi5idWZvXCIpO1xuY29uc3QgUFJPSkVDVFNfRElSID0gam9pbihCVUZPX0RJUiwgXCJwcm9qZWN0c1wiKTtcbmNvbnN0IFNUQVRFX0RJUiA9IGpvaW4oQlVGT19ESVIsIFwic3RhdGVcIik7XG5jb25zdCBTRVNTSU9OU19ESVIgPSBqb2luKEJVRk9fRElSLCBcInNlc3Npb25zXCIpO1xuY29uc3QgR0xPQkFMX0NPTkZJRyA9IGpvaW4oQlVGT19ESVIsIFwiY29uZmlnLnlhbWxcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdWZvRGlyKCk6IHN0cmluZyB7XG4gIHJldHVybiBCVUZPX0RJUjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1Zm9FeGlzdHMoKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGlzdHNTeW5jKEJVRk9fRElSKTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kUGF0aChwOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAocC5zdGFydHNXaXRoKFwifi9cIikgfHwgcCA9PT0gXCJ+XCIpIHtcbiAgICByZXR1cm4gam9pbihob21lZGlyKCksIHAuc2xpY2UoMikpO1xuICB9XG4gIHJldHVybiBwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEdsb2JhbENvbmZpZygpOiBHbG9iYWxDb25maWcge1xuICBpZiAoIWV4aXN0c1N5bmMoR0xPQkFMX0NPTkZJRykpIHJldHVybiB7fTtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmMoR0xPQkFMX0NPTkZJRywgXCJ1dGYtOFwiKTtcbiAgICByZXR1cm4gKHlhbWwubG9hZChyYXcpIGFzIEdsb2JhbENvbmZpZykgfHwge307XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB7fTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFByb2plY3QoYWxpYXM6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZyk6IEJ1Zm9Qcm9qZWN0IHtcbiAgY29uc3QgcmF3ID0gcmVhZEZpbGVTeW5jKGZpbGVQYXRoLCBcInV0Zi04XCIpO1xuICBjb25zdCBkb2MgPSB5YW1sLmxvYWQocmF3KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuICAvLyBTdXBwb3J0IGJvdGggbmV3IHRhZHBvbGVzOiBhbmQgbGVnYWN5IHdvcmtzcGFjZXM6IGtleXNcbiAgY29uc3QgdGFkcG9sZXMgPSAoZG9jLnRhZHBvbGVzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB8fFxuICAgIChkb2Mud29ya3NwYWNlcyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgfHwge307XG4gIGNvbnN0IHBvcnRzID0gKGRvYy5wb3J0cyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgfHwge307XG5cbiAgcmV0dXJuIHtcbiAgICBhbGlhcyxcbiAgICBzZXNzaW9uX25hbWU6IChkb2Muc2Vzc2lvbl9uYW1lIGFzIHN0cmluZykgfHwgYWxpYXMsXG4gICAgdGFkcG9sZV9iYXNlOiBleHBhbmRQYXRoKFxuICAgICAgKGRvYy50YWRwb2xlX2Jhc2UgYXMgc3RyaW5nKSB8fCAoZG9jLndvcmtzcGFjZV9iYXNlIGFzIHN0cmluZykgfHwgXCJcIlxuICAgICksXG4gICAgbWFpbl9yZXBvOiBleHBhbmRQYXRoKChkb2MubWFpbl9yZXBvIGFzIHN0cmluZykgfHwgXCJcIiksXG4gICAgdGFkcG9sZXM6IHtcbiAgICAgIGNvdW50OiAodGFkcG9sZXMuY291bnQgYXMgbnVtYmVyKSB8fCA1LFxuICAgICAgcHJlZml4OiAodGFkcG9sZXMucHJlZml4IGFzIHN0cmluZykgfHwgXCJ0YWRwb2xlXCIsXG4gICAgICBicmFuY2hfcGF0dGVybjogKHRhZHBvbGVzLmJyYW5jaF9wYXR0ZXJuIGFzIHN0cmluZykgfHwgXCJ0YWRwb2xlLXtOfVwiLFxuICAgIH0sXG4gICAgcG9ydHM6IHBvcnRzXG4gICAgICA/IHtcbiAgICAgICAgICBhcGlfYmFzZTogcG9ydHMuYXBpX2Jhc2UgYXMgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGFwcF9iYXNlOiBwb3J0cy5hcHBfYmFzZSBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGxheW91dDogZG9jLmxheW91dCBhcyBCdWZvUHJvamVjdFtcImxheW91dFwiXSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyUHJvamVjdHMoKTogQnVmb1Byb2plY3RbXSB7XG4gIGlmICghZXhpc3RzU3luYyhQUk9KRUNUU19ESVIpKSByZXR1cm4gW107XG4gIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMoUFJPSkVDVFNfRElSKS5maWx0ZXIoKGYpID0+IGYuZW5kc1dpdGgoXCIueWFtbFwiKSB8fCBmLmVuZHNXaXRoKFwiLnltbFwiKSk7XG4gIGNvbnN0IHByb2plY3RzOiBCdWZvUHJvamVjdFtdID0gW107XG4gIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgIGNvbnN0IGFsaWFzID0gZmlsZS5yZXBsYWNlKC9cXC55YT9tbCQvLCBcIlwiKTtcbiAgICB0cnkge1xuICAgICAgcHJvamVjdHMucHVzaChsb2FkUHJvamVjdChhbGlhcywgam9pbihQUk9KRUNUU19ESVIsIGZpbGUpKSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBza2lwIGludmFsaWQgY29uZmlnc1xuICAgIH1cbiAgfVxuICBjb25zdCBkZWZhdWx0QWxpYXMgPSBsb2FkR2xvYmFsQ29uZmlnKCkuZGVmYXVsdF9wcm9qZWN0O1xuICBpZiAoZGVmYXVsdEFsaWFzKSB7XG4gICAgcHJvamVjdHMuc29ydCgoYSwgYikgPT4gKGEuYWxpYXMgPT09IGRlZmF1bHRBbGlhcyA/IC0xIDogYi5hbGlhcyA9PT0gZGVmYXVsdEFsaWFzID8gMSA6IDApKTtcbiAgfVxuICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGFkcG9sZVN0YXRlKHNlc3Npb25OYW1lOiBzdHJpbmcsIG51bTogbnVtYmVyKTogVGFkcG9sZVN0YXRlIHwgdW5kZWZpbmVkIHtcbiAgLy8gUHJlZmVyIHRwPE4+Lmpzb24sIGZhbGwgYmFjayB0byBsZWdhY3kgd3M8Tj4uanNvblxuICBsZXQgc3RhdGVGaWxlID0gam9pbihTVEFURV9ESVIsIHNlc3Npb25OYW1lLCBgdHAke251bX0uanNvbmApO1xuICBpZiAoIWV4aXN0c1N5bmMoc3RhdGVGaWxlKSkge1xuICAgIHN0YXRlRmlsZSA9IGpvaW4oU1RBVEVfRElSLCBzZXNzaW9uTmFtZSwgYHdzJHtudW19Lmpzb25gKTtcbiAgfVxuICBpZiAoIWV4aXN0c1N5bmMoc3RhdGVGaWxlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoc3RhdGVGaWxlLCBcInV0Zi04XCIpKSBhcyBUYWRwb2xlU3RhdGU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUYWRwb2xlTWV0YSh0YWRwb2xlRGlyOiBzdHJpbmcpOiBUYWRwb2xlTWV0YSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1ldGFGaWxlID0gam9pbih0YWRwb2xlRGlyLCBcIi5idWZvLW1ldGFcIik7XG4gIGlmICghZXhpc3RzU3luYyhtZXRhRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKG1ldGFGaWxlLCBcInV0Zi04XCIpKSBhcyBUYWRwb2xlTWV0YTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUYWRwb2xlTG9ja2VkKHRhZHBvbGVEaXI6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZXhpc3RzU3luYyhqb2luKHRhZHBvbGVEaXIsIFwiLmJ1Zm8tbG9ja1wiKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDdXN0b21OYW1lKHRhZHBvbGVEaXI6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG5hbWVGaWxlID0gam9pbih0YWRwb2xlRGlyLCBcIi5idWZvLW5hbWVcIik7XG4gIGlmICghZXhpc3RzU3luYyhuYW1lRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHJlYWRGaWxlU3luYyhuYW1lRmlsZSwgXCJ1dGYtOFwiKS50cmltKCkgfHwgdW5kZWZpbmVkO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkU2Vzc2lvbihcbiAgcHJvamVjdEFsaWFzOiBzdHJpbmcsXG4gIHNlc3Npb25OYW1lOiBzdHJpbmcsXG4gIGFjdGl2ZVNlc3Npb25zPzogU2V0PHN0cmluZz5cbik6IEJ1Zm9TZXNzaW9uIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc2Vzc2lvbkRpciA9IGpvaW4oU0VTU0lPTlNfRElSLCBwcm9qZWN0QWxpYXMsIHNlc3Npb25OYW1lKTtcbiAgY29uc3Qgc2Vzc2lvbkZpbGUgPSBqb2luKHNlc3Npb25EaXIsIFwic2Vzc2lvbi55YW1sXCIpO1xuICBpZiAoIWV4aXN0c1N5bmMoc2Vzc2lvbkZpbGUpKSByZXR1cm4gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyhzZXNzaW9uRmlsZSwgXCJ1dGYtOFwiKTtcbiAgICBjb25zdCBkb2MgPSB5YW1sLmxvYWQocmF3KSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcblxuICAgIGxldCBsYXlvdXQ6IFNlc3Npb25MYXlvdXQgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGF5b3V0RmlsZSA9IGpvaW4oc2Vzc2lvbkRpciwgXCJsYXlvdXQuanNvblwiKTtcbiAgICBpZiAoZXhpc3RzU3luYyhsYXlvdXRGaWxlKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbGF5b3V0ID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMobGF5b3V0RmlsZSwgXCJ1dGYtOFwiKSkgYXMgU2Vzc2lvbkxheW91dDtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBzdGFsZSBvciBtYWxmb3JtZWQgbGF5b3V0IFx1MjAxNCBpZ25vcmVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmUgPSBsYXlvdXQ/Lm1haW5fc2lkID8gKGFjdGl2ZVNlc3Npb25zPy5oYXMobGF5b3V0Lm1haW5fc2lkKSA/PyBmYWxzZSkgOiBmYWxzZTtcbiAgICBjb25zdCBoYXNSZXZpZXdPdXRwdXQgPSBleGlzdHNTeW5jKGpvaW4oc2Vzc2lvbkRpciwgXCJyZXZpZXctb3V0cHV0Lm1kXCIpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAoZG9jLm5hbWUgYXMgc3RyaW5nKSB8fCBzZXNzaW9uTmFtZSxcbiAgICAgIHByb2plY3Q6IChkb2MucHJvamVjdCBhcyBzdHJpbmcpIHx8IHByb2plY3RBbGlhcyxcbiAgICAgIGNyZWF0ZWQ6IChkb2MuY3JlYXRlZCBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gICAgICBsYXN0X2FjY2Vzc2VkOiAoZG9jLmxhc3RfYWNjZXNzZWQgYXMgc3RyaW5nKSB8fCBcIlwiLFxuICAgICAgc3VtbWFyeTogKGRvYy5zdW1tYXJ5IGFzIHN0cmluZykgfHwgXCJcIixcbiAgICAgIHR5cGU6ICgoZG9jLnR5cGUgYXMgc3RyaW5nKSB8fCBcImdlbmVyYWxcIikgYXMgQnVmb1Nlc3Npb25bXCJ0eXBlXCJdLFxuICAgICAgcHJzOiBkb2MucHJzIGFzIHN0cmluZ1tdIHwgdW5kZWZpbmVkLFxuICAgICAgYWN0aXZlLFxuICAgICAgaGFzUmV2aWV3T3V0cHV0LFxuICAgICAgbGF5b3V0LFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2NvdmVyU2Vzc2lvbnMoXG4gIHByb2plY3RBbGlhczogc3RyaW5nLFxuICBhY3RpdmVTZXNzaW9ucz86IFNldDxzdHJpbmc+XG4pOiBCdWZvU2Vzc2lvbltdIHtcbiAgY29uc3QgcHJvamVjdFNlc3Npb25zRGlyID0gam9pbihTRVNTSU9OU19ESVIsIHByb2plY3RBbGlhcyk7XG4gIGlmICghZXhpc3RzU3luYyhwcm9qZWN0U2Vzc2lvbnNEaXIpKSByZXR1cm4gW107XG4gIGxldCBlbnRyaWVzOiBzdHJpbmdbXTtcbiAgdHJ5IHtcbiAgICBlbnRyaWVzID0gcmVhZGRpclN5bmMocHJvamVjdFNlc3Npb25zRGlyKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IHNlc3Npb25zOiBCdWZvU2Vzc2lvbltdID0gW107XG4gIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgIGNvbnN0IGZ1bGxQYXRoID0gam9pbihwcm9qZWN0U2Vzc2lvbnNEaXIsIGVudHJ5KTtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzdGF0U3luYyhmdWxsUGF0aCkuaXNEaXJlY3RvcnkoKSkgY29udGludWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGxvYWRTZXNzaW9uKHByb2plY3RBbGlhcywgZW50cnksIGFjdGl2ZVNlc3Npb25zKTtcbiAgICBpZiAoc2Vzc2lvbikgc2Vzc2lvbnMucHVzaChzZXNzaW9uKTtcbiAgfVxuICByZXR1cm4gc2Vzc2lvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbGxTZXNzaW9ucyhcbiAgYWN0aXZlU2Vzc2lvbnM/OiBTZXQ8c3RyaW5nPlxuKTogeyBwcm9qZWN0QWxpYXM6IHN0cmluZzsgc2Vzc2lvbnM6IEJ1Zm9TZXNzaW9uW10gfVtdIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkaXNjb3ZlclByb2plY3RzKCk7XG4gIGNvbnN0IHJlc3VsdDogeyBwcm9qZWN0QWxpYXM6IHN0cmluZzsgc2Vzc2lvbnM6IEJ1Zm9TZXNzaW9uW10gfVtdID0gW107XG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGNvbnN0IHNlc3Npb25zID0gZGlzY292ZXJTZXNzaW9ucyhwcm9qZWN0LmFsaWFzLCBhY3RpdmVTZXNzaW9ucyk7XG4gICAgaWYgKHNlc3Npb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJlc3VsdC5wdXNoKHsgcHJvamVjdEFsaWFzOiBwcm9qZWN0LmFsaWFzLCBzZXNzaW9ucyB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsICJcbi8qISBqcy15YW1sIDQuMS4xIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvanMteWFtbCBAbGljZW5zZSBNSVQgKi9cbmZ1bmN0aW9uIGlzTm90aGluZyhzdWJqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnKSB8fCAoc3ViamVjdCA9PT0gbnVsbCk7XG59XG5cblxuZnVuY3Rpb24gaXNPYmplY3Qoc3ViamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JykgJiYgKHN1YmplY3QgIT09IG51bGwpO1xufVxuXG5cbmZ1bmN0aW9uIHRvQXJyYXkoc2VxdWVuY2UpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc2VxdWVuY2UpKSByZXR1cm4gc2VxdWVuY2U7XG4gIGVsc2UgaWYgKGlzTm90aGluZyhzZXF1ZW5jZSkpIHJldHVybiBbXTtcblxuICByZXR1cm4gWyBzZXF1ZW5jZSBdO1xufVxuXG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSkge1xuICB2YXIgaW5kZXgsIGxlbmd0aCwga2V5LCBzb3VyY2VLZXlzO1xuXG4gIGlmIChzb3VyY2UpIHtcbiAgICBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBzb3VyY2VLZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgIGtleSA9IHNvdXJjZUtleXNbaW5kZXhdO1xuICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHJpbmcsIGNvdW50KSB7XG4gIHZhciByZXN1bHQgPSAnJywgY3ljbGU7XG5cbiAgZm9yIChjeWNsZSA9IDA7IGN5Y2xlIDwgY291bnQ7IGN5Y2xlICs9IDEpIHtcbiAgICByZXN1bHQgKz0gc3RyaW5nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBpc05lZ2F0aXZlWmVybyhudW1iZXIpIHtcbiAgcmV0dXJuIChudW1iZXIgPT09IDApICYmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IDEgLyBudW1iZXIpO1xufVxuXG5cbnZhciBpc05vdGhpbmdfMSAgICAgID0gaXNOb3RoaW5nO1xudmFyIGlzT2JqZWN0XzEgICAgICAgPSBpc09iamVjdDtcbnZhciB0b0FycmF5XzEgICAgICAgID0gdG9BcnJheTtcbnZhciByZXBlYXRfMSAgICAgICAgID0gcmVwZWF0O1xudmFyIGlzTmVnYXRpdmVaZXJvXzEgPSBpc05lZ2F0aXZlWmVybztcbnZhciBleHRlbmRfMSAgICAgICAgID0gZXh0ZW5kO1xuXG52YXIgY29tbW9uID0ge1xuXHRpc05vdGhpbmc6IGlzTm90aGluZ18xLFxuXHRpc09iamVjdDogaXNPYmplY3RfMSxcblx0dG9BcnJheTogdG9BcnJheV8xLFxuXHRyZXBlYXQ6IHJlcGVhdF8xLFxuXHRpc05lZ2F0aXZlWmVybzogaXNOZWdhdGl2ZVplcm9fMSxcblx0ZXh0ZW5kOiBleHRlbmRfMVxufTtcblxuLy8gWUFNTCBlcnJvciBjbGFzcy4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NDU4OTg0XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IoZXhjZXB0aW9uLCBjb21wYWN0KSB7XG4gIHZhciB3aGVyZSA9ICcnLCBtZXNzYWdlID0gZXhjZXB0aW9uLnJlYXNvbiB8fCAnKHVua25vd24gcmVhc29uKSc7XG5cbiAgaWYgKCFleGNlcHRpb24ubWFyaykgcmV0dXJuIG1lc3NhZ2U7XG5cbiAgaWYgKGV4Y2VwdGlvbi5tYXJrLm5hbWUpIHtcbiAgICB3aGVyZSArPSAnaW4gXCInICsgZXhjZXB0aW9uLm1hcmsubmFtZSArICdcIiAnO1xuICB9XG5cbiAgd2hlcmUgKz0gJygnICsgKGV4Y2VwdGlvbi5tYXJrLmxpbmUgKyAxKSArICc6JyArIChleGNlcHRpb24ubWFyay5jb2x1bW4gKyAxKSArICcpJztcblxuICBpZiAoIWNvbXBhY3QgJiYgZXhjZXB0aW9uLm1hcmsuc25pcHBldCkge1xuICAgIHdoZXJlICs9ICdcXG5cXG4nICsgZXhjZXB0aW9uLm1hcmsuc25pcHBldDtcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlICsgJyAnICsgd2hlcmU7XG59XG5cblxuZnVuY3Rpb24gWUFNTEV4Y2VwdGlvbiQxKHJlYXNvbiwgbWFyaykge1xuICAvLyBTdXBlciBjb25zdHJ1Y3RvclxuICBFcnJvci5jYWxsKHRoaXMpO1xuXG4gIHRoaXMubmFtZSA9ICdZQU1MRXhjZXB0aW9uJztcbiAgdGhpcy5yZWFzb24gPSByZWFzb247XG4gIHRoaXMubWFyayA9IG1hcms7XG4gIHRoaXMubWVzc2FnZSA9IGZvcm1hdEVycm9yKHRoaXMsIGZhbHNlKTtcblxuICAvLyBJbmNsdWRlIHN0YWNrIHRyYWNlIGluIGVycm9yIG9iamVjdFxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAvLyBDaHJvbWUgYW5kIE5vZGVKU1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZGLCBJRSAxMCsgYW5kIFNhZmFyaSA2Ky4gRmFsbGJhY2sgZm9yIG90aGVyc1xuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrIHx8ICcnO1xuICB9XG59XG5cblxuLy8gSW5oZXJpdCBmcm9tIEVycm9yXG5ZQU1MRXhjZXB0aW9uJDEucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuWUFNTEV4Y2VwdGlvbiQxLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFlBTUxFeGNlcHRpb24kMTtcblxuXG5ZQU1MRXhjZXB0aW9uJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoY29tcGFjdCkge1xuICByZXR1cm4gdGhpcy5uYW1lICsgJzogJyArIGZvcm1hdEVycm9yKHRoaXMsIGNvbXBhY3QpO1xufTtcblxuXG52YXIgZXhjZXB0aW9uID0gWUFNTEV4Y2VwdGlvbiQxO1xuXG4vLyBnZXQgc25pcHBldCBmb3IgYSBzaW5nbGUgbGluZSwgcmVzcGVjdGluZyBtYXhMZW5ndGhcbmZ1bmN0aW9uIGdldExpbmUoYnVmZmVyLCBsaW5lU3RhcnQsIGxpbmVFbmQsIHBvc2l0aW9uLCBtYXhMaW5lTGVuZ3RoKSB7XG4gIHZhciBoZWFkID0gJyc7XG4gIHZhciB0YWlsID0gJyc7XG4gIHZhciBtYXhIYWxmTGVuZ3RoID0gTWF0aC5mbG9vcihtYXhMaW5lTGVuZ3RoIC8gMikgLSAxO1xuXG4gIGlmIChwb3NpdGlvbiAtIGxpbmVTdGFydCA+IG1heEhhbGZMZW5ndGgpIHtcbiAgICBoZWFkID0gJyAuLi4gJztcbiAgICBsaW5lU3RhcnQgPSBwb3NpdGlvbiAtIG1heEhhbGZMZW5ndGggKyBoZWFkLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChsaW5lRW5kIC0gcG9zaXRpb24gPiBtYXhIYWxmTGVuZ3RoKSB7XG4gICAgdGFpbCA9ICcgLi4uJztcbiAgICBsaW5lRW5kID0gcG9zaXRpb24gKyBtYXhIYWxmTGVuZ3RoIC0gdGFpbC5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0cjogaGVhZCArIGJ1ZmZlci5zbGljZShsaW5lU3RhcnQsIGxpbmVFbmQpLnJlcGxhY2UoL1xcdC9nLCAnXHUyMTkyJykgKyB0YWlsLFxuICAgIHBvczogcG9zaXRpb24gLSBsaW5lU3RhcnQgKyBoZWFkLmxlbmd0aCAvLyByZWxhdGl2ZSBwb3NpdGlvblxuICB9O1xufVxuXG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KHN0cmluZywgbWF4KSB7XG4gIHJldHVybiBjb21tb24ucmVwZWF0KCcgJywgbWF4IC0gc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59XG5cblxuZnVuY3Rpb24gbWFrZVNuaXBwZXQobWFyaywgb3B0aW9ucykge1xuICBvcHRpb25zID0gT2JqZWN0LmNyZWF0ZShvcHRpb25zIHx8IG51bGwpO1xuXG4gIGlmICghbWFyay5idWZmZXIpIHJldHVybiBudWxsO1xuXG4gIGlmICghb3B0aW9ucy5tYXhMZW5ndGgpIG9wdGlvbnMubWF4TGVuZ3RoID0gNzk7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbmRlbnQgICAgICAhPT0gJ251bWJlcicpIG9wdGlvbnMuaW5kZW50ICAgICAgPSAxO1xuICBpZiAodHlwZW9mIG9wdGlvbnMubGluZXNCZWZvcmUgIT09ICdudW1iZXInKSBvcHRpb25zLmxpbmVzQmVmb3JlID0gMztcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbmVzQWZ0ZXIgICE9PSAnbnVtYmVyJykgb3B0aW9ucy5saW5lc0FmdGVyICA9IDI7XG5cbiAgdmFyIHJlID0gL1xccj9cXG58XFxyfFxcMC9nO1xuICB2YXIgbGluZVN0YXJ0cyA9IFsgMCBdO1xuICB2YXIgbGluZUVuZHMgPSBbXTtcbiAgdmFyIG1hdGNoO1xuICB2YXIgZm91bmRMaW5lTm8gPSAtMTtcblxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhtYXJrLmJ1ZmZlcikpKSB7XG4gICAgbGluZUVuZHMucHVzaChtYXRjaC5pbmRleCk7XG4gICAgbGluZVN0YXJ0cy5wdXNoKG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKTtcblxuICAgIGlmIChtYXJrLnBvc2l0aW9uIDw9IG1hdGNoLmluZGV4ICYmIGZvdW5kTGluZU5vIDwgMCkge1xuICAgICAgZm91bmRMaW5lTm8gPSBsaW5lU3RhcnRzLmxlbmd0aCAtIDI7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZvdW5kTGluZU5vIDwgMCkgZm91bmRMaW5lTm8gPSBsaW5lU3RhcnRzLmxlbmd0aCAtIDE7XG5cbiAgdmFyIHJlc3VsdCA9ICcnLCBpLCBsaW5lO1xuICB2YXIgbGluZU5vTGVuZ3RoID0gTWF0aC5taW4obWFyay5saW5lICsgb3B0aW9ucy5saW5lc0FmdGVyLCBsaW5lRW5kcy5sZW5ndGgpLnRvU3RyaW5nKCkubGVuZ3RoO1xuICB2YXIgbWF4TGluZUxlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoIC0gKG9wdGlvbnMuaW5kZW50ICsgbGluZU5vTGVuZ3RoICsgMyk7XG5cbiAgZm9yIChpID0gMTsgaSA8PSBvcHRpb25zLmxpbmVzQmVmb3JlOyBpKyspIHtcbiAgICBpZiAoZm91bmRMaW5lTm8gLSBpIDwgMCkgYnJlYWs7XG4gICAgbGluZSA9IGdldExpbmUoXG4gICAgICBtYXJrLmJ1ZmZlcixcbiAgICAgIGxpbmVTdGFydHNbZm91bmRMaW5lTm8gLSBpXSxcbiAgICAgIGxpbmVFbmRzW2ZvdW5kTGluZU5vIC0gaV0sXG4gICAgICBtYXJrLnBvc2l0aW9uIC0gKGxpbmVTdGFydHNbZm91bmRMaW5lTm9dIC0gbGluZVN0YXJ0c1tmb3VuZExpbmVObyAtIGldKSxcbiAgICAgIG1heExpbmVMZW5ndGhcbiAgICApO1xuICAgIHJlc3VsdCA9IGNvbW1vbi5yZXBlYXQoJyAnLCBvcHRpb25zLmluZGVudCkgKyBwYWRTdGFydCgobWFyay5saW5lIC0gaSArIDEpLnRvU3RyaW5nKCksIGxpbmVOb0xlbmd0aCkgK1xuICAgICAgJyB8ICcgKyBsaW5lLnN0ciArICdcXG4nICsgcmVzdWx0O1xuICB9XG5cbiAgbGluZSA9IGdldExpbmUobWFyay5idWZmZXIsIGxpbmVTdGFydHNbZm91bmRMaW5lTm9dLCBsaW5lRW5kc1tmb3VuZExpbmVOb10sIG1hcmsucG9zaXRpb24sIG1heExpbmVMZW5ndGgpO1xuICByZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnICcsIG9wdGlvbnMuaW5kZW50KSArIHBhZFN0YXJ0KChtYXJrLmxpbmUgKyAxKS50b1N0cmluZygpLCBsaW5lTm9MZW5ndGgpICtcbiAgICAnIHwgJyArIGxpbmUuc3RyICsgJ1xcbic7XG4gIHJlc3VsdCArPSBjb21tb24ucmVwZWF0KCctJywgb3B0aW9ucy5pbmRlbnQgKyBsaW5lTm9MZW5ndGggKyAzICsgbGluZS5wb3MpICsgJ14nICsgJ1xcbic7XG5cbiAgZm9yIChpID0gMTsgaSA8PSBvcHRpb25zLmxpbmVzQWZ0ZXI7IGkrKykge1xuICAgIGlmIChmb3VuZExpbmVObyArIGkgPj0gbGluZUVuZHMubGVuZ3RoKSBicmVhaztcbiAgICBsaW5lID0gZ2V0TGluZShcbiAgICAgIG1hcmsuYnVmZmVyLFxuICAgICAgbGluZVN0YXJ0c1tmb3VuZExpbmVObyArIGldLFxuICAgICAgbGluZUVuZHNbZm91bmRMaW5lTm8gKyBpXSxcbiAgICAgIG1hcmsucG9zaXRpb24gLSAobGluZVN0YXJ0c1tmb3VuZExpbmVOb10gLSBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vICsgaV0pLFxuICAgICAgbWF4TGluZUxlbmd0aFxuICAgICk7XG4gICAgcmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJyAnLCBvcHRpb25zLmluZGVudCkgKyBwYWRTdGFydCgobWFyay5saW5lICsgaSArIDEpLnRvU3RyaW5nKCksIGxpbmVOb0xlbmd0aCkgK1xuICAgICAgJyB8ICcgKyBsaW5lLnN0ciArICdcXG4nO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5yZXBsYWNlKC9cXG4kLywgJycpO1xufVxuXG5cbnZhciBzbmlwcGV0ID0gbWFrZVNuaXBwZXQ7XG5cbnZhciBUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMgPSBbXG4gICdraW5kJyxcbiAgJ211bHRpJyxcbiAgJ3Jlc29sdmUnLFxuICAnY29uc3RydWN0JyxcbiAgJ2luc3RhbmNlT2YnLFxuICAncHJlZGljYXRlJyxcbiAgJ3JlcHJlc2VudCcsXG4gICdyZXByZXNlbnROYW1lJyxcbiAgJ2RlZmF1bHRTdHlsZScsXG4gICdzdHlsZUFsaWFzZXMnXG5dO1xuXG52YXIgWUFNTF9OT0RFX0tJTkRTID0gW1xuICAnc2NhbGFyJyxcbiAgJ3NlcXVlbmNlJyxcbiAgJ21hcHBpbmcnXG5dO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVBbGlhc2VzKG1hcCkge1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgaWYgKG1hcCAhPT0gbnVsbCkge1xuICAgIE9iamVjdC5rZXlzKG1hcCkuZm9yRWFjaChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIG1hcFtzdHlsZV0uZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgcmVzdWx0W1N0cmluZyhhbGlhcyldID0gc3R5bGU7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIFR5cGUkMSh0YWcsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChUWVBFX0NPTlNUUlVDVE9SX09QVElPTlMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1Vua25vd24gb3B0aW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbWV0IGluIGRlZmluaXRpb24gb2YgXCInICsgdGFnICsgJ1wiIFlBTUwgdHlwZS4nKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFRPRE86IEFkZCB0YWcgZm9ybWF0IGNoZWNrLlxuICB0aGlzLm9wdGlvbnMgICAgICAgPSBvcHRpb25zOyAvLyBrZWVwIG9yaWdpbmFsIG9wdGlvbnMgaW4gY2FzZSB1c2VyIHdhbnRzIHRvIGV4dGVuZCB0aGlzIHR5cGUgbGF0ZXJcbiAgdGhpcy50YWcgICAgICAgICAgID0gdGFnO1xuICB0aGlzLmtpbmQgICAgICAgICAgPSBvcHRpb25zWydraW5kJ10gICAgICAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXNvbHZlICAgICAgID0gb3B0aW9uc1sncmVzb2x2ZSddICAgICAgIHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07XG4gIHRoaXMuY29uc3RydWN0ICAgICA9IG9wdGlvbnNbJ2NvbnN0cnVjdCddICAgICB8fCBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YTsgfTtcbiAgdGhpcy5pbnN0YW5jZU9mICAgID0gb3B0aW9uc1snaW5zdGFuY2VPZiddICAgIHx8IG51bGw7XG4gIHRoaXMucHJlZGljYXRlICAgICA9IG9wdGlvbnNbJ3ByZWRpY2F0ZSddICAgICB8fCBudWxsO1xuICB0aGlzLnJlcHJlc2VudCAgICAgPSBvcHRpb25zWydyZXByZXNlbnQnXSAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXByZXNlbnROYW1lID0gb3B0aW9uc1sncmVwcmVzZW50TmFtZSddIHx8IG51bGw7XG4gIHRoaXMuZGVmYXVsdFN0eWxlICA9IG9wdGlvbnNbJ2RlZmF1bHRTdHlsZSddICB8fCBudWxsO1xuICB0aGlzLm11bHRpICAgICAgICAgPSBvcHRpb25zWydtdWx0aSddICAgICAgICAgfHwgZmFsc2U7XG4gIHRoaXMuc3R5bGVBbGlhc2VzICA9IGNvbXBpbGVTdHlsZUFsaWFzZXMob3B0aW9uc1snc3R5bGVBbGlhc2VzJ10gfHwgbnVsbCk7XG5cbiAgaWYgKFlBTUxfTk9ERV9LSU5EUy5pbmRleE9mKHRoaXMua2luZCkgPT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignVW5rbm93biBraW5kIFwiJyArIHRoaXMua2luZCArICdcIiBpcyBzcGVjaWZpZWQgZm9yIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gIH1cbn1cblxudmFyIHR5cGUgPSBUeXBlJDE7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbiovXG5cblxuXG5cblxuZnVuY3Rpb24gY29tcGlsZUxpc3Qoc2NoZW1hLCBuYW1lKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcblxuICBzY2hlbWFbbmFtZV0uZm9yRWFjaChmdW5jdGlvbiAoY3VycmVudFR5cGUpIHtcbiAgICB2YXIgbmV3SW5kZXggPSByZXN1bHQubGVuZ3RoO1xuXG4gICAgcmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKHByZXZpb3VzVHlwZSwgcHJldmlvdXNJbmRleCkge1xuICAgICAgaWYgKHByZXZpb3VzVHlwZS50YWcgPT09IGN1cnJlbnRUeXBlLnRhZyAmJlxuICAgICAgICAgIHByZXZpb3VzVHlwZS5raW5kID09PSBjdXJyZW50VHlwZS5raW5kICYmXG4gICAgICAgICAgcHJldmlvdXNUeXBlLm11bHRpID09PSBjdXJyZW50VHlwZS5tdWx0aSkge1xuXG4gICAgICAgIG5ld0luZGV4ID0gcHJldmlvdXNJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlc3VsdFtuZXdJbmRleF0gPSBjdXJyZW50VHlwZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBjb21waWxlTWFwKC8qIGxpc3RzLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHNjYWxhcjoge30sXG4gICAgICAgIHNlcXVlbmNlOiB7fSxcbiAgICAgICAgbWFwcGluZzoge30sXG4gICAgICAgIGZhbGxiYWNrOiB7fSxcbiAgICAgICAgbXVsdGk6IHtcbiAgICAgICAgICBzY2FsYXI6IFtdLFxuICAgICAgICAgIHNlcXVlbmNlOiBbXSxcbiAgICAgICAgICBtYXBwaW5nOiBbXSxcbiAgICAgICAgICBmYWxsYmFjazogW11cbiAgICAgICAgfVxuICAgICAgfSwgaW5kZXgsIGxlbmd0aDtcblxuICBmdW5jdGlvbiBjb2xsZWN0VHlwZSh0eXBlKSB7XG4gICAgaWYgKHR5cGUubXVsdGkpIHtcbiAgICAgIHJlc3VsdC5tdWx0aVt0eXBlLmtpbmRdLnB1c2godHlwZSk7XG4gICAgICByZXN1bHQubXVsdGlbJ2ZhbGxiYWNrJ10ucHVzaCh0eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3R5cGUua2luZF1bdHlwZS50YWddID0gcmVzdWx0WydmYWxsYmFjayddW3R5cGUudGFnXSA9IHR5cGU7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgYXJndW1lbnRzW2luZGV4XS5mb3JFYWNoKGNvbGxlY3RUeXBlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIFNjaGVtYSQxKGRlZmluaXRpb24pIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW5kKGRlZmluaXRpb24pO1xufVxuXG5cblNjaGVtYSQxLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQoZGVmaW5pdGlvbikge1xuICB2YXIgaW1wbGljaXQgPSBbXTtcbiAgdmFyIGV4cGxpY2l0ID0gW107XG5cbiAgaWYgKGRlZmluaXRpb24gaW5zdGFuY2VvZiB0eXBlKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZCh0eXBlKVxuICAgIGV4cGxpY2l0LnB1c2goZGVmaW5pdGlvbik7XG5cbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24pKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZChbIHR5cGUxLCB0eXBlMiwgLi4uIF0pXG4gICAgZXhwbGljaXQgPSBleHBsaWNpdC5jb25jYXQoZGVmaW5pdGlvbik7XG5cbiAgfSBlbHNlIGlmIChkZWZpbml0aW9uICYmIChBcnJheS5pc0FycmF5KGRlZmluaXRpb24uaW1wbGljaXQpIHx8IEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5leHBsaWNpdCkpKSB7XG4gICAgLy8gU2NoZW1hLmV4dGVuZCh7IGV4cGxpY2l0OiBbIHR5cGUxLCB0eXBlMiwgLi4uIF0sIGltcGxpY2l0OiBbIHR5cGUxLCB0eXBlMiwgLi4uIF0gfSlcbiAgICBpZiAoZGVmaW5pdGlvbi5pbXBsaWNpdCkgaW1wbGljaXQgPSBpbXBsaWNpdC5jb25jYXQoZGVmaW5pdGlvbi5pbXBsaWNpdCk7XG4gICAgaWYgKGRlZmluaXRpb24uZXhwbGljaXQpIGV4cGxpY2l0ID0gZXhwbGljaXQuY29uY2F0KGRlZmluaXRpb24uZXhwbGljaXQpO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignU2NoZW1hLmV4dGVuZCBhcmd1bWVudCBzaG91bGQgYmUgYSBUeXBlLCBbIFR5cGUgXSwgJyArXG4gICAgICAnb3IgYSBzY2hlbWEgZGVmaW5pdGlvbiAoeyBpbXBsaWNpdDogWy4uLl0sIGV4cGxpY2l0OiBbLi4uXSB9KScpO1xuICB9XG5cbiAgaW1wbGljaXQuZm9yRWFjaChmdW5jdGlvbiAodHlwZSQxKSB7XG4gICAgaWYgKCEodHlwZSQxIGluc3RhbmNlb2YgdHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1NwZWNpZmllZCBsaXN0IG9mIFlBTUwgdHlwZXMgKG9yIGEgc2luZ2xlIFR5cGUgb2JqZWN0KSBjb250YWlucyBhIG5vbi1UeXBlIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSQxLmxvYWRLaW5kICYmIHR5cGUkMS5sb2FkS2luZCAhPT0gJ3NjYWxhcicpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1RoZXJlIGlzIGEgbm9uLXNjYWxhciB0eXBlIGluIHRoZSBpbXBsaWNpdCBsaXN0IG9mIGEgc2NoZW1hLiBJbXBsaWNpdCByZXNvbHZpbmcgb2Ygc3VjaCB0eXBlcyBpcyBub3Qgc3VwcG9ydGVkLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlJDEubXVsdGkpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1RoZXJlIGlzIGEgbXVsdGkgdHlwZSBpbiB0aGUgaW1wbGljaXQgbGlzdCBvZiBhIHNjaGVtYS4gTXVsdGkgdGFncyBjYW4gb25seSBiZSBsaXN0ZWQgYXMgZXhwbGljaXQuJyk7XG4gICAgfVxuICB9KTtcblxuICBleHBsaWNpdC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlJDEpIHtcbiAgICBpZiAoISh0eXBlJDEgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2YgWUFNTCB0eXBlcyAob3IgYSBzaW5nbGUgVHlwZSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVR5cGUgb2JqZWN0LicpO1xuICAgIH1cbiAgfSk7XG5cbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5jcmVhdGUoU2NoZW1hJDEucHJvdG90eXBlKTtcblxuICByZXN1bHQuaW1wbGljaXQgPSAodGhpcy5pbXBsaWNpdCB8fCBbXSkuY29uY2F0KGltcGxpY2l0KTtcbiAgcmVzdWx0LmV4cGxpY2l0ID0gKHRoaXMuZXhwbGljaXQgfHwgW10pLmNvbmNhdChleHBsaWNpdCk7XG5cbiAgcmVzdWx0LmNvbXBpbGVkSW1wbGljaXQgPSBjb21waWxlTGlzdChyZXN1bHQsICdpbXBsaWNpdCcpO1xuICByZXN1bHQuY29tcGlsZWRFeHBsaWNpdCA9IGNvbXBpbGVMaXN0KHJlc3VsdCwgJ2V4cGxpY2l0Jyk7XG4gIHJlc3VsdC5jb21waWxlZFR5cGVNYXAgID0gY29tcGlsZU1hcChyZXN1bHQuY29tcGlsZWRJbXBsaWNpdCwgcmVzdWx0LmNvbXBpbGVkRXhwbGljaXQpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbnZhciBzY2hlbWEgPSBTY2hlbWEkMTtcblxudmFyIHN0ciA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzdHInLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6ICcnOyB9XG59KTtcblxudmFyIHNlcSA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXEnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107IH1cbn0pO1xuXG52YXIgbWFwID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1hcCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9OyB9XG59KTtcblxudmFyIGZhaWxzYWZlID0gbmV3IHNjaGVtYSh7XG4gIGV4cGxpY2l0OiBbXG4gICAgc3RyLFxuICAgIHNlcSxcbiAgICBtYXBcbiAgXVxufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTnVsbChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGg7XG5cbiAgcmV0dXJuIChtYXggPT09IDEgJiYgZGF0YSA9PT0gJ34nKSB8fFxuICAgICAgICAgKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ251bGwnIHx8IGRhdGEgPT09ICdOdWxsJyB8fCBkYXRhID09PSAnTlVMTCcpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bGwob2JqZWN0KSB7XG4gIHJldHVybiBvYmplY3QgPT09IG51bGw7XG59XG5cbnZhciBfbnVsbCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpudWxsJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxOdWxsLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxOdWxsLFxuICBwcmVkaWNhdGU6IGlzTnVsbCxcbiAgcmVwcmVzZW50OiB7XG4gICAgY2Fub25pY2FsOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnfic7ICAgIH0sXG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnbnVsbCc7IH0sXG4gICAgdXBwZXJjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnTlVMTCc7IH0sXG4gICAgY2FtZWxjYXNlOiBmdW5jdGlvbiAoKSB7IHJldHVybiAnTnVsbCc7IH0sXG4gICAgZW1wdHk6ICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiAnJzsgICAgIH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQm9vbGVhbihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoO1xuXG4gIHJldHVybiAobWF4ID09PSA0ICYmIChkYXRhID09PSAndHJ1ZScgfHwgZGF0YSA9PT0gJ1RydWUnIHx8IGRhdGEgPT09ICdUUlVFJykpIHx8XG4gICAgICAgICAobWF4ID09PSA1ICYmIChkYXRhID09PSAnZmFsc2UnIHx8IGRhdGEgPT09ICdGYWxzZScgfHwgZGF0YSA9PT0gJ0ZBTFNFJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQm9vbGVhbihkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAndHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUcnVlJyB8fFxuICAgICAgICAgZGF0YSA9PT0gJ1RSVUUnO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4ob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xufVxuXG52YXIgYm9vbCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpib29sJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCb29sZWFuLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCb29sZWFuLFxuICBwcmVkaWNhdGU6IGlzQm9vbGVhbixcbiAgcmVwcmVzZW50OiB7XG4gICAgbG93ZXJjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAndHJ1ZScgOiAnZmFsc2UnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ1RSVUUnIDogJ0ZBTFNFJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUcnVlJyA6ICdGYWxzZSc7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG5cbmZ1bmN0aW9uIGlzSGV4Q29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkgfHxcbiAgICAgICAgICgoMHg0MS8qIEEgKi8gPD0gYykgJiYgKGMgPD0gMHg0Ni8qIEYgKi8pKSB8fFxuICAgICAgICAgKCgweDYxLyogYSAqLyA8PSBjKSAmJiAoYyA8PSAweDY2LyogZiAqLykpO1xufVxuXG5mdW5jdGlvbiBpc09jdENvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM3LyogNyAqLykpO1xufVxuXG5mdW5jdGlvbiBpc0RlY0NvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEludGVnZXIoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gMCxcbiAgICAgIGhhc0RpZ2l0cyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgaWYgKCFtYXgpIHJldHVybiBmYWxzZTtcblxuICBjaCA9IGRhdGFbaW5kZXhdO1xuXG4gIC8vIHNpZ25cbiAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgIGNoID0gZGF0YVsrK2luZGV4XTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gJzAnKSB7XG4gICAgLy8gMFxuICAgIGlmIChpbmRleCArIDEgPT09IG1heCkgcmV0dXJuIHRydWU7XG4gICAgY2ggPSBkYXRhWysraW5kZXhdO1xuXG4gICAgLy8gYmFzZSAyLCBiYXNlIDgsIGJhc2UgMTZcblxuICAgIGlmIChjaCA9PT0gJ2InKSB7XG4gICAgICAvLyBiYXNlIDJcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmIChjaCAhPT0gJzAnICYmIGNoICE9PSAnMScpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG5cblxuICAgIGlmIChjaCA9PT0gJ3gnKSB7XG4gICAgICAvLyBiYXNlIDE2XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIWlzSGV4Q29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cblxuXG4gICAgaWYgKGNoID09PSAnbycpIHtcbiAgICAgIC8vIGJhc2UgOFxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFpc09jdENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG4gIH1cblxuICAvLyBiYXNlIDEwIChleGNlcHQgMClcblxuICAvLyB2YWx1ZSBzaG91bGQgbm90IHN0YXJ0IHdpdGggYF9gO1xuICBpZiAoY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgIGlmICghaXNEZWNDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gIH1cblxuICAvLyBTaG91bGQgaGF2ZSBkaWdpdHMgYW5kIHNob3VsZCBub3QgZW5kIHdpdGggYF9gXG4gIGlmICghaGFzRGlnaXRzIHx8IGNoID09PSAnXycpIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEludGVnZXIoZGF0YSkge1xuICB2YXIgdmFsdWUgPSBkYXRhLCBzaWduID0gMSwgY2g7XG5cbiAgaWYgKHZhbHVlLmluZGV4T2YoJ18nKSAhPT0gLTEpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL18vZywgJycpO1xuICB9XG5cbiAgY2ggPSB2YWx1ZVswXTtcblxuICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgaWYgKGNoID09PSAnLScpIHNpZ24gPSAtMTtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICAgIGNoID0gdmFsdWVbMF07XG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcwJykgcmV0dXJuIDA7XG5cbiAgaWYgKGNoID09PSAnMCcpIHtcbiAgICBpZiAodmFsdWVbMV0gPT09ICdiJykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgMik7XG4gICAgaWYgKHZhbHVlWzFdID09PSAneCcpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDE2KTtcbiAgICBpZiAodmFsdWVbMV0gPT09ICdvJykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgOCk7XG4gIH1cblxuICByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGlzSW50ZWdlcihvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSkgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmXG4gICAgICAgICAob2JqZWN0ICUgMSA9PT0gMCAmJiAhY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG52YXIgaW50ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmludCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sSW50ZWdlcixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sSW50ZWdlcixcbiAgcHJlZGljYXRlOiBpc0ludGVnZXIsXG4gIHJlcHJlc2VudDoge1xuICAgIGJpbmFyeTogICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcwYicgKyBvYmoudG9TdHJpbmcoMikgOiAnLTBiJyArIG9iai50b1N0cmluZygyKS5zbGljZSgxKTsgfSxcbiAgICBvY3RhbDogICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMG8nICArIG9iai50b1N0cmluZyg4KSA6ICctMG8nICArIG9iai50b1N0cmluZyg4KS5zbGljZSgxKTsgfSxcbiAgICBkZWNpbWFsOiAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqLnRvU3RyaW5nKDEwKTsgfSxcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGVuICovXG4gICAgaGV4YWRlY2ltYWw6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzB4JyArIG9iai50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSA6ICAnLTB4JyArIG9iai50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5zbGljZSgxKTsgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdkZWNpbWFsJyxcbiAgc3R5bGVBbGlhc2VzOiB7XG4gICAgYmluYXJ5OiAgICAgIFsgMiwgICdiaW4nIF0sXG4gICAgb2N0YWw6ICAgICAgIFsgOCwgICdvY3QnIF0sXG4gICAgZGVjaW1hbDogICAgIFsgMTAsICdkZWMnIF0sXG4gICAgaGV4YWRlY2ltYWw6IFsgMTYsICdoZXgnIF1cbiAgfVxufSk7XG5cbnZhciBZQU1MX0ZMT0FUX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICAvLyAyLjVlNCwgMi41IGFuZCBpbnRlZ2Vyc1xuICAnXig/OlstK10/KD86WzAtOV1bMC05X10qKSg/OlxcXFwuWzAtOV9dKik/KD86W2VFXVstK10/WzAtOV0rKT8nICtcbiAgLy8gLjJlNCwgLjJcbiAgLy8gc3BlY2lhbCBjYXNlLCBzZWVtcyBub3QgZnJvbSBzcGVjXG4gICd8XFxcXC5bMC05X10rKD86W2VFXVstK10/WzAtOV0rKT8nICtcbiAgLy8gLmluZlxuICAnfFstK10/XFxcXC4oPzppbmZ8SW5mfElORiknICtcbiAgLy8gLm5hblxuICAnfFxcXFwuKD86bmFufE5hTnxOQU4pKSQnKTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxGbG9hdChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKCFZQU1MX0ZMT0FUX1BBVFRFUk4udGVzdChkYXRhKSB8fFxuICAgICAgLy8gUXVpY2sgaGFjayB0byBub3QgYWxsb3cgaW50ZWdlcnMgZW5kIHdpdGggYF9gXG4gICAgICAvLyBQcm9iYWJseSBzaG91bGQgdXBkYXRlIHJlZ2V4cCAmIGNoZWNrIHNwZWVkXG4gICAgICBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gPT09ICdfJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sRmxvYXQoZGF0YSkge1xuICB2YXIgdmFsdWUsIHNpZ247XG5cbiAgdmFsdWUgID0gZGF0YS5yZXBsYWNlKC9fL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuICBzaWduICAgPSB2YWx1ZVswXSA9PT0gJy0nID8gLTEgOiAxO1xuXG4gIGlmICgnKy0nLmluZGV4T2YodmFsdWVbMF0pID49IDApIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnLmluZicpIHtcbiAgICByZXR1cm4gKHNpZ24gPT09IDEpID8gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZIDogTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZO1xuXG4gIH0gZWxzZSBpZiAodmFsdWUgPT09ICcubmFuJykge1xuICAgIHJldHVybiBOYU47XG4gIH1cbiAgcmV0dXJuIHNpZ24gKiBwYXJzZUZsb2F0KHZhbHVlLCAxMCk7XG59XG5cblxudmFyIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QgPSAvXlstK10/WzAtOV0rZS87XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxGbG9hdChvYmplY3QsIHN0eWxlKSB7XG4gIHZhciByZXM7XG5cbiAgaWYgKGlzTmFOKG9iamVjdCkpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy5uYW4nO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICcuTkFOJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLk5hTic7XG4gICAgfVxuICB9IGVsc2UgaWYgKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA9PT0gb2JqZWN0KSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcuaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5JbmYnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLS5pbmYnO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICctLklORic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy0uSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpIHtcbiAgICByZXR1cm4gJy0wLjAnO1xuICB9XG5cbiAgcmVzID0gb2JqZWN0LnRvU3RyaW5nKDEwKTtcblxuICAvLyBKUyBzdHJpbmdpZmllciBjYW4gYnVpbGQgc2NpZW50aWZpYyBmb3JtYXQgd2l0aG91dCBkb3RzOiA1ZS0xMDAsXG4gIC8vIHdoaWxlIFlBTUwgcmVxdXJlcyBkb3Q6IDUuZS0xMDAuIEZpeCBpdCB3aXRoIHNpbXBsZSBoYWNrXG5cbiAgcmV0dXJuIFNDSUVOVElGSUNfV0lUSE9VVF9ET1QudGVzdChyZXMpID8gcmVzLnJlcGxhY2UoJ2UnLCAnLmUnKSA6IHJlcztcbn1cblxuZnVuY3Rpb24gaXNGbG9hdChvYmplY3QpIHtcbiAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgTnVtYmVyXScpICYmXG4gICAgICAgICAob2JqZWN0ICUgMSAhPT0gMCB8fCBjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbnZhciBmbG9hdCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpmbG9hdCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sRmxvYXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEZsb2F0LFxuICBwcmVkaWNhdGU6IGlzRmxvYXQsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEZsb2F0LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcblxudmFyIGpzb24gPSBmYWlsc2FmZS5leHRlbmQoe1xuICBpbXBsaWNpdDogW1xuICAgIF9udWxsLFxuICAgIGJvb2wsXG4gICAgaW50LFxuICAgIGZsb2F0XG4gIF1cbn0pO1xuXG52YXIgY29yZSA9IGpzb247XG5cbnZhciBZQU1MX0RBVEVfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgJ14oWzAtOV1bMC05XVswLTldWzAtOV0pJyAgICAgICAgICArIC8vIFsxXSB5ZWFyXG4gICctKFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbMl0gbW9udGhcbiAgJy0oWzAtOV1bMC05XSkkJyk7ICAgICAgICAgICAgICAgICAgIC8vIFszXSBkYXlcblxudmFyIFlBTUxfVElNRVNUQU1QX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgKyAvLyBbM10gZGF5XG4gICcoPzpbVHRdfFsgXFxcXHRdKyknICAgICAgICAgICAgICAgICArIC8vIC4uLlxuICAnKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgICsgLy8gWzRdIGhvdXJcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs1XSBtaW51dGVcbiAgJzooWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFs2XSBzZWNvbmRcbiAgJyg/OlxcXFwuKFswLTldKikpPycgICAgICAgICAgICAgICAgICsgLy8gWzddIGZyYWN0aW9uXG4gICcoPzpbIFxcXFx0XSooWnwoWy0rXSkoWzAtOV1bMC05XT8pJyArIC8vIFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXJcbiAgJyg/OjooWzAtOV1bMC05XSkpPykpPyQnKTsgICAgICAgICAgIC8vIFsxMV0gdHpfbWludXRlXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sVGltZXN0YW1wKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgaWYgKFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIGlmIChZQU1MX1RJTUVTVEFNUF9SRUdFWFAuZXhlYyhkYXRhKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIHZhciBtYXRjaCwgeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uID0gMCxcbiAgICAgIGRlbHRhID0gbnVsbCwgdHpfaG91ciwgdHpfbWludXRlLCBkYXRlO1xuXG4gIG1hdGNoID0gWUFNTF9EQVRFX1JFR0VYUC5leGVjKGRhdGEpO1xuICBpZiAobWF0Y2ggPT09IG51bGwpIG1hdGNoID0gWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSk7XG5cbiAgaWYgKG1hdGNoID09PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0RhdGUgcmVzb2x2ZSBlcnJvcicpO1xuXG4gIC8vIG1hdGNoOiBbMV0geWVhciBbMl0gbW9udGggWzNdIGRheVxuXG4gIHllYXIgPSArKG1hdGNoWzFdKTtcbiAgbW9udGggPSArKG1hdGNoWzJdKSAtIDE7IC8vIEpTIG1vbnRoIHN0YXJ0cyB3aXRoIDBcbiAgZGF5ID0gKyhtYXRjaFszXSk7XG5cbiAgaWYgKCFtYXRjaFs0XSkgeyAvLyBubyBob3VyXG4gICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXkpKTtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbNF0gaG91ciBbNV0gbWludXRlIFs2XSBzZWNvbmQgWzddIGZyYWN0aW9uXG5cbiAgaG91ciA9ICsobWF0Y2hbNF0pO1xuICBtaW51dGUgPSArKG1hdGNoWzVdKTtcbiAgc2Vjb25kID0gKyhtYXRjaFs2XSk7XG5cbiAgaWYgKG1hdGNoWzddKSB7XG4gICAgZnJhY3Rpb24gPSBtYXRjaFs3XS5zbGljZSgwLCAzKTtcbiAgICB3aGlsZSAoZnJhY3Rpb24ubGVuZ3RoIDwgMykgeyAvLyBtaWxsaS1zZWNvbmRzXG4gICAgICBmcmFjdGlvbiArPSAnMCc7XG4gICAgfVxuICAgIGZyYWN0aW9uID0gK2ZyYWN0aW9uO1xuICB9XG5cbiAgLy8gbWF0Y2g6IFs4XSB0eiBbOV0gdHpfc2lnbiBbMTBdIHR6X2hvdXIgWzExXSB0el9taW51dGVcblxuICBpZiAobWF0Y2hbOV0pIHtcbiAgICB0el9ob3VyID0gKyhtYXRjaFsxMF0pO1xuICAgIHR6X21pbnV0ZSA9ICsobWF0Y2hbMTFdIHx8IDApO1xuICAgIGRlbHRhID0gKHR6X2hvdXIgKiA2MCArIHR6X21pbnV0ZSkgKiA2MDAwMDsgLy8gZGVsdGEgaW4gbWlsaS1zZWNvbmRzXG4gICAgaWYgKG1hdGNoWzldID09PSAnLScpIGRlbHRhID0gLWRlbHRhO1xuICB9XG5cbiAgZGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbikpO1xuXG4gIGlmIChkZWx0YSkgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpIC0gZGVsdGEpO1xuXG4gIHJldHVybiBkYXRlO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sVGltZXN0YW1wKG9iamVjdCAvKiwgc3R5bGUqLykge1xuICByZXR1cm4gb2JqZWN0LnRvSVNPU3RyaW5nKCk7XG59XG5cbnZhciB0aW1lc3RhbXAgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6dGltZXN0YW1wJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxUaW1lc3RhbXAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFRpbWVzdGFtcCxcbiAgaW5zdGFuY2VPZjogRGF0ZSxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sVGltZXN0YW1wXG59KTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxNZXJnZShkYXRhKSB7XG4gIHJldHVybiBkYXRhID09PSAnPDwnIHx8IGRhdGEgPT09IG51bGw7XG59XG5cbnZhciBtZXJnZSA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTWVyZ2Vcbn0pO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuXG5cblxuXG5cbi8vIFsgNjQsIDY1LCA2NiBdIC0+IFsgcGFkZGluZywgQ1IsIExGIF1cbnZhciBCQVNFNjRfTUFQID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XFxuXFxyJztcblxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJpbmFyeShkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGNvZGUsIGlkeCwgYml0bGVuID0gMCwgbWF4ID0gZGF0YS5sZW5ndGgsIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBvbmUgYnkgb25lLlxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBjb2RlID0gbWFwLmluZGV4T2YoZGF0YS5jaGFyQXQoaWR4KSk7XG5cbiAgICAvLyBTa2lwIENSL0xGXG4gICAgaWYgKGNvZGUgPiA2NCkgY29udGludWU7XG5cbiAgICAvLyBGYWlsIG9uIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgIGlmIChjb2RlIDwgMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgYml0bGVuICs9IDY7XG4gIH1cblxuICAvLyBJZiB0aGVyZSBhcmUgYW55IGJpdHMgbGVmdCwgc291cmNlIHdhcyBjb3JydXB0ZWRcbiAgcmV0dXJuIChiaXRsZW4gJSA4KSA9PT0gMDtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJpbmFyeShkYXRhKSB7XG4gIHZhciBpZHgsIHRhaWxiaXRzLFxuICAgICAgaW5wdXQgPSBkYXRhLnJlcGxhY2UoL1tcXHJcXG49XS9nLCAnJyksIC8vIHJlbW92ZSBDUi9MRiAmIHBhZGRpbmcgdG8gc2ltcGxpZnkgc2NhblxuICAgICAgbWF4ID0gaW5wdXQubGVuZ3RoLFxuICAgICAgbWFwID0gQkFTRTY0X01BUCxcbiAgICAgIGJpdHMgPSAwLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgLy8gQ29sbGVjdCBieSA2KjQgYml0cyAoMyBieXRlcylcblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBpZiAoKGlkeCAlIDQgPT09IDApICYmIGlkeCkge1xuICAgICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTYpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA2KSB8IG1hcC5pbmRleE9mKGlucHV0LmNoYXJBdChpZHgpKTtcbiAgfVxuXG4gIC8vIER1bXAgdGFpbFxuXG4gIHRhaWxiaXRzID0gKG1heCAlIDQpICogNjtcblxuICBpZiAodGFpbGJpdHMgPT09IDApIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiA4KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKGJpdHMgJiAweEZGKTtcbiAgfSBlbHNlIGlmICh0YWlsYml0cyA9PT0gMTgpIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxMCkgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiAyKSAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxMikge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDQpICYgMHhGRik7XG4gIH1cblxuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkocmVzdWx0KTtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbEJpbmFyeShvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBiaXRzID0gMCwgaWR4LCB0YWlsLFxuICAgICAgbWF4ID0gb2JqZWN0Lmxlbmd0aCxcbiAgICAgIG1hcCA9IEJBU0U2NF9NQVA7XG5cbiAgLy8gQ29udmVydCBldmVyeSB0aHJlZSBieXRlcyB0byA0IEFTQ0lJIGNoYXJhY3RlcnMuXG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgaWYgKChpZHggJSAzID09PSAwKSAmJiBpZHgpIHtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEyKSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDgpICsgb2JqZWN0W2lkeF07XG4gIH1cblxuICAvLyBEdW1wIHRhaWxcblxuICB0YWlsID0gbWF4ICUgMztcblxuICBpZiAodGFpbCA9PT0gMCkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTgpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDYpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFtiaXRzICYgMHgzRl07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMikge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTApICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA0KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfSBlbHNlIGlmICh0YWlsID09PSAxKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPDwgNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgICByZXN1bHQgKz0gbWFwWzY0XTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlzQmluYXJ5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICAnW29iamVjdCBVaW50OEFycmF5XSc7XG59XG5cbnZhciBiaW5hcnkgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6YmluYXJ5Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxCaW5hcnksXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEJpbmFyeSxcbiAgcHJlZGljYXRlOiBpc0JpbmFyeSxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sQmluYXJ5XG59KTtcblxudmFyIF9oYXNPd25Qcm9wZXJ0eSQzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBfdG9TdHJpbmckMiAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sT21hcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgb2JqZWN0S2V5cyA9IFtdLCBpbmRleCwgbGVuZ3RoLCBwYWlyLCBwYWlyS2V5LCBwYWlySGFzS2V5LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcbiAgICBwYWlySGFzS2V5ID0gZmFsc2U7XG5cbiAgICBpZiAoX3RvU3RyaW5nJDIuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAocGFpcktleSBpbiBwYWlyKSB7XG4gICAgICBpZiAoX2hhc093blByb3BlcnR5JDMuY2FsbChwYWlyLCBwYWlyS2V5KSkge1xuICAgICAgICBpZiAoIXBhaXJIYXNLZXkpIHBhaXJIYXNLZXkgPSB0cnVlO1xuICAgICAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXBhaXJIYXNLZXkpIHJldHVybiBmYWxzZTtcblxuICAgIGlmIChvYmplY3RLZXlzLmluZGV4T2YocGFpcktleSkgPT09IC0xKSBvYmplY3RLZXlzLnB1c2gocGFpcktleSk7XG4gICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbE9tYXAoZGF0YSkge1xuICByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBbXTtcbn1cblxudmFyIG9tYXAgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6b21hcCcsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxPbWFwLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxPbWFwXG59KTtcblxudmFyIF90b1N0cmluZyQxID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIgaW5kZXgsIGxlbmd0aCwgcGFpciwga2V5cywgcmVzdWx0LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICByZXN1bHQgPSBuZXcgQXJyYXkob2JqZWN0Lmxlbmd0aCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG5cbiAgICBpZiAoX3RvU3RyaW5nJDEuY2FsbChwYWlyKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHJldHVybiBmYWxzZTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhwYWlyKTtcblxuICAgIGlmIChrZXlzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxQYWlycyhkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gW107XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgcmVzdWx0W2luZGV4XSA9IFsga2V5c1swXSwgcGFpcltrZXlzWzBdXSBdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIHBhaXJzID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnBhaXJzJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFBhaXJzLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxQYWlyc1xufSk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkkMiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sU2V0KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBrZXksIG9iamVjdCA9IGRhdGE7XG5cbiAgZm9yIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQyLmNhbGwob2JqZWN0LCBrZXkpKSB7XG4gICAgICBpZiAob2JqZWN0W2tleV0gIT09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFNldChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IHt9O1xufVxuXG52YXIgc2V0ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNldCcsIHtcbiAga2luZDogJ21hcHBpbmcnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFNldCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sU2V0XG59KTtcblxudmFyIF9kZWZhdWx0ID0gY29yZS5leHRlbmQoe1xuICBpbXBsaWNpdDogW1xuICAgIHRpbWVzdGFtcCxcbiAgICBtZXJnZVxuICBdLFxuICBleHBsaWNpdDogW1xuICAgIGJpbmFyeSxcbiAgICBvbWFwLFxuICAgIHBhaXJzLFxuICAgIHNldFxuICBdXG59KTtcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuLG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxuXG5cblxuXG5cblxudmFyIF9oYXNPd25Qcm9wZXJ0eSQxID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuXG52YXIgQ09OVEVYVF9GTE9XX0lOICAgPSAxO1xudmFyIENPTlRFWFRfRkxPV19PVVQgID0gMjtcbnZhciBDT05URVhUX0JMT0NLX0lOICA9IDM7XG52YXIgQ09OVEVYVF9CTE9DS19PVVQgPSA0O1xuXG5cbnZhciBDSE9NUElOR19DTElQICA9IDE7XG52YXIgQ0hPTVBJTkdfU1RSSVAgPSAyO1xudmFyIENIT01QSU5HX0tFRVAgID0gMztcblxuXG52YXIgUEFUVEVSTl9OT05fUFJJTlRBQkxFICAgICAgICAgPSAvW1xceDAwLVxceDA4XFx4MEJcXHgwQ1xceDBFLVxceDFGXFx4N0YtXFx4ODRcXHg4Ni1cXHg5RlxcdUZGRkVcXHVGRkZGXXxbXFx1RDgwMC1cXHVEQkZGXSg/IVtcXHVEQzAwLVxcdURGRkZdKXwoPzpbXlxcdUQ4MDAtXFx1REJGRl18XilbXFx1REMwMC1cXHVERkZGXS87XG52YXIgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MgPSAvW1xceDg1XFx1MjAyOFxcdTIwMjldLztcbnZhciBQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUyAgICAgICA9IC9bLFxcW1xcXVxce1xcfV0vO1xudmFyIFBBVFRFUk5fVEFHX0hBTkRMRSAgICAgICAgICAgID0gL14oPzohfCEhfCFbYS16XFwtXSshKSQvaTtcbnZhciBQQVRURVJOX1RBR19VUkkgICAgICAgICAgICAgICA9IC9eKD86IXxbXixcXFtcXF1cXHtcXH1dKSg/OiVbMC05YS1mXXsyfXxbMC05YS16XFwtIztcXC9cXD86QCY9XFwrXFwkLF9cXC4hflxcKidcXChcXClcXFtcXF1dKSokL2k7XG5cblxuZnVuY3Rpb24gX2NsYXNzKG9iaikgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7IH1cblxuZnVuY3Rpb24gaXNfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDBBLyogTEYgKi8pIHx8IChjID09PSAweDBELyogQ1IgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19XSElURV9TUEFDRShjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHwgKGMgPT09IDB4MjAvKiBTcGFjZSAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dTX09SX0VPTChjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwOS8qIFRhYiAqLykgfHxcbiAgICAgICAgIChjID09PSAweDIwLyogU3BhY2UgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwQS8qIExGICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX0ZMT1dfSU5ESUNBVE9SKGMpIHtcbiAgcmV0dXJuIGMgPT09IDB4MkMvKiAsICovIHx8XG4gICAgICAgICBjID09PSAweDVCLyogWyAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg1RC8qIF0gKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0IvKiB7ICovIHx8XG4gICAgICAgICBjID09PSAweDdELyogfSAqLztcbn1cblxuZnVuY3Rpb24gZnJvbUhleENvZGUoYykge1xuICB2YXIgbGM7XG5cbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICAvKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UqL1xuICBsYyA9IGMgfCAweDIwO1xuXG4gIGlmICgoMHg2MS8qIGEgKi8gPD0gbGMpICYmIChsYyA8PSAweDY2LyogZiAqLykpIHtcbiAgICByZXR1cm4gbGMgLSAweDYxICsgMTA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGVzY2FwZWRIZXhMZW4oYykge1xuICBpZiAoYyA9PT0gMHg3OC8qIHggKi8pIHsgcmV0dXJuIDI7IH1cbiAgaWYgKGMgPT09IDB4NzUvKiB1ICovKSB7IHJldHVybiA0OyB9XG4gIGlmIChjID09PSAweDU1LyogVSAqLykgeyByZXR1cm4gODsgfVxuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gZnJvbURlY2ltYWxDb2RlKGMpIHtcbiAgaWYgKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHtcbiAgICByZXR1cm4gYyAtIDB4MzA7XG4gIH1cblxuICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIHNpbXBsZUVzY2FwZVNlcXVlbmNlKGMpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgaW5kZW50ICovXG4gIHJldHVybiAoYyA9PT0gMHgzMC8qIDAgKi8pID8gJ1xceDAwJyA6XG4gICAgICAgIChjID09PSAweDYxLyogYSAqLykgPyAnXFx4MDcnIDpcbiAgICAgICAgKGMgPT09IDB4NjIvKiBiICovKSA/ICdcXHgwOCcgOlxuICAgICAgICAoYyA9PT0gMHg3NC8qIHQgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDA5LyogVGFiICovKSA/ICdcXHgwOScgOlxuICAgICAgICAoYyA9PT0gMHg2RS8qIG4gKi8pID8gJ1xceDBBJyA6XG4gICAgICAgIChjID09PSAweDc2LyogdiAqLykgPyAnXFx4MEInIDpcbiAgICAgICAgKGMgPT09IDB4NjYvKiBmICovKSA/ICdcXHgwQycgOlxuICAgICAgICAoYyA9PT0gMHg3Mi8qIHIgKi8pID8gJ1xceDBEJyA6XG4gICAgICAgIChjID09PSAweDY1LyogZSAqLykgPyAnXFx4MUInIDpcbiAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgPyAnICcgOlxuICAgICAgICAoYyA9PT0gMHgyMi8qIFwiICovKSA/ICdcXHgyMicgOlxuICAgICAgICAoYyA9PT0gMHgyRi8qIC8gKi8pID8gJy8nIDpcbiAgICAgICAgKGMgPT09IDB4NUMvKiBcXCAqLykgPyAnXFx4NUMnIDpcbiAgICAgICAgKGMgPT09IDB4NEUvKiBOICovKSA/ICdcXHg4NScgOlxuICAgICAgICAoYyA9PT0gMHg1Ri8qIF8gKi8pID8gJ1xceEEwJyA6XG4gICAgICAgIChjID09PSAweDRDLyogTCAqLykgPyAnXFx1MjAyOCcgOlxuICAgICAgICAoYyA9PT0gMHg1MC8qIFAgKi8pID8gJ1xcdTIwMjknIDogJyc7XG59XG5cbmZ1bmN0aW9uIGNoYXJGcm9tQ29kZXBvaW50KGMpIHtcbiAgaWYgKGMgPD0gMHhGRkZGKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIH1cbiAgLy8gRW5jb2RlIFVURi0xNiBzdXJyb2dhdGUgcGFpclxuICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtMTYjQ29kZV9wb2ludHNfVS4yQjAxMDAwMF90b19VLjJCMTBGRkZGXG4gIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuICAgICgoYyAtIDB4MDEwMDAwKSA+PiAxMCkgKyAweEQ4MDAsXG4gICAgKChjIC0gMHgwMTAwMDApICYgMHgwM0ZGKSArIDB4REMwMFxuICApO1xufVxuXG4vLyBzZXQgYSBwcm9wZXJ0eSBvZiBhIGxpdGVyYWwgb2JqZWN0LCB3aGlsZSBwcm90ZWN0aW5nIGFnYWluc3QgcHJvdG90eXBlIHBvbGx1dGlvbixcbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2pzLXlhbWwvaXNzdWVzLzE2NCBmb3IgbW9yZSBkZXRhaWxzXG5mdW5jdGlvbiBzZXRQcm9wZXJ0eShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgLy8gdXNlZCBmb3IgdGhpcyBzcGVjaWZpYyBrZXkgb25seSBiZWNhdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBpcyBzbG93XG4gIGlmIChrZXkgPT09ICdfX3Byb3RvX18nKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbnZhciBzaW1wbGVFc2NhcGVDaGVjayA9IG5ldyBBcnJheSgyNTYpOyAvLyBpbnRlZ2VyLCBmb3IgZmFzdCBhY2Nlc3NcbnZhciBzaW1wbGVFc2NhcGVNYXAgPSBuZXcgQXJyYXkoMjU2KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgc2ltcGxlRXNjYXBlQ2hlY2tbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKSA/IDEgOiAwO1xuICBzaW1wbGVFc2NhcGVNYXBbaV0gPSBzaW1wbGVFc2NhcGVTZXF1ZW5jZShpKTtcbn1cblxuXG5mdW5jdGlvbiBTdGF0ZSQxKGlucHV0LCBvcHRpb25zKSB7XG4gIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICB0aGlzLmZpbGVuYW1lICA9IG9wdGlvbnNbJ2ZpbGVuYW1lJ10gIHx8IG51bGw7XG4gIHRoaXMuc2NoZW1hICAgID0gb3B0aW9uc1snc2NoZW1hJ10gICAgfHwgX2RlZmF1bHQ7XG4gIHRoaXMub25XYXJuaW5nID0gb3B0aW9uc1snb25XYXJuaW5nJ10gfHwgbnVsbDtcbiAgLy8gKEhpZGRlbikgUmVtb3ZlPyBtYWtlcyB0aGUgbG9hZGVyIHRvIGV4cGVjdCBZQU1MIDEuMSBkb2N1bWVudHNcbiAgLy8gaWYgc3VjaCBkb2N1bWVudHMgaGF2ZSBubyBleHBsaWNpdCAlWUFNTCBkaXJlY3RpdmVcbiAgdGhpcy5sZWdhY3kgICAgPSBvcHRpb25zWydsZWdhY3knXSAgICB8fCBmYWxzZTtcblxuICB0aGlzLmpzb24gICAgICA9IG9wdGlvbnNbJ2pzb24nXSAgICAgIHx8IGZhbHNlO1xuICB0aGlzLmxpc3RlbmVyICA9IG9wdGlvbnNbJ2xpc3RlbmVyJ10gIHx8IG51bGw7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy50eXBlTWFwICAgICAgID0gdGhpcy5zY2hlbWEuY29tcGlsZWRUeXBlTWFwO1xuXG4gIHRoaXMubGVuZ3RoICAgICA9IGlucHV0Lmxlbmd0aDtcbiAgdGhpcy5wb3NpdGlvbiAgID0gMDtcbiAgdGhpcy5saW5lICAgICAgID0gMDtcbiAgdGhpcy5saW5lU3RhcnQgID0gMDtcbiAgdGhpcy5saW5lSW5kZW50ID0gMDtcblxuICAvLyBwb3NpdGlvbiBvZiBmaXJzdCBsZWFkaW5nIHRhYiBpbiB0aGUgY3VycmVudCBsaW5lLFxuICAvLyB1c2VkIHRvIG1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gdGFicyBpbiB0aGUgaW5kZW50YXRpb25cbiAgdGhpcy5maXJzdFRhYkluTGluZSA9IC0xO1xuXG4gIHRoaXMuZG9jdW1lbnRzID0gW107XG5cbiAgLypcbiAgdGhpcy52ZXJzaW9uO1xuICB0aGlzLmNoZWNrTGluZUJyZWFrcztcbiAgdGhpcy50YWdNYXA7XG4gIHRoaXMuYW5jaG9yTWFwO1xuICB0aGlzLnRhZztcbiAgdGhpcy5hbmNob3I7XG4gIHRoaXMua2luZDtcbiAgdGhpcy5yZXN1bHQ7Ki9cblxufVxuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlRXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdmFyIG1hcmsgPSB7XG4gICAgbmFtZTogICAgIHN0YXRlLmZpbGVuYW1lLFxuICAgIGJ1ZmZlcjogICBzdGF0ZS5pbnB1dC5zbGljZSgwLCAtMSksIC8vIG9taXQgdHJhaWxpbmcgXFwwXG4gICAgcG9zaXRpb246IHN0YXRlLnBvc2l0aW9uLFxuICAgIGxpbmU6ICAgICBzdGF0ZS5saW5lLFxuICAgIGNvbHVtbjogICBzdGF0ZS5wb3NpdGlvbiAtIHN0YXRlLmxpbmVTdGFydFxuICB9O1xuXG4gIG1hcmsuc25pcHBldCA9IHNuaXBwZXQobWFyayk7XG5cbiAgcmV0dXJuIG5ldyBleGNlcHRpb24obWVzc2FnZSwgbWFyayk7XG59XG5cbmZ1bmN0aW9uIHRocm93RXJyb3Ioc3RhdGUsIG1lc3NhZ2UpIHtcbiAgdGhyb3cgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIHRocm93V2FybmluZyhzdGF0ZSwgbWVzc2FnZSkge1xuICBpZiAoc3RhdGUub25XYXJuaW5nKSB7XG4gICAgc3RhdGUub25XYXJuaW5nLmNhbGwobnVsbCwgZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkpO1xuICB9XG59XG5cblxudmFyIGRpcmVjdGl2ZUhhbmRsZXJzID0ge1xuXG4gIFlBTUw6IGZ1bmN0aW9uIGhhbmRsZVlhbWxEaXJlY3RpdmUoc3RhdGUsIG5hbWUsIGFyZ3MpIHtcblxuICAgIHZhciBtYXRjaCwgbWFqb3IsIG1pbm9yO1xuXG4gICAgaWYgKHN0YXRlLnZlcnNpb24gIT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiAlWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdZQU1MIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgb25lIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgbWF0Y2ggPSAvXihbMC05XSspXFwuKFswLTldKykkLy5leGVjKGFyZ3NbMF0pO1xuXG4gICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCBhcmd1bWVudCBvZiB0aGUgWUFNTCBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBtYWpvciA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgbWlub3IgPSBwYXJzZUludChtYXRjaFsyXSwgMTApO1xuXG4gICAgaWYgKG1ham9yICE9PSAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIFlBTUwgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS52ZXJzaW9uID0gYXJnc1swXTtcbiAgICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSAobWlub3IgPCAyKTtcblxuICAgIGlmIChtaW5vciAhPT0gMSAmJiBtaW5vciAhPT0gMikge1xuICAgICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAndW5zdXBwb3J0ZWQgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cbiAgfSxcblxuICBUQUc6IGZ1bmN0aW9uIGhhbmRsZVRhZ0RpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIGhhbmRsZSwgcHJlZml4O1xuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnVEFHIGRpcmVjdGl2ZSBhY2NlcHRzIGV4YWN0bHkgdHdvIGFyZ3VtZW50cycpO1xuICAgIH1cblxuICAgIGhhbmRsZSA9IGFyZ3NbMF07XG4gICAgcHJlZml4ID0gYXJnc1sxXTtcblxuICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QoaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgdGFnIGhhbmRsZSAoZmlyc3QgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoc3RhdGUudGFnTWFwLCBoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlcmUgaXMgYSBwcmV2aW91c2x5IGRlY2xhcmVkIHN1ZmZpeCBmb3IgXCInICsgaGFuZGxlICsgJ1wiIHRhZyBoYW5kbGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHByZWZpeCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIHRhZyBwcmVmaXggKHNlY29uZCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJlZml4ID0gZGVjb2RlVVJJQ29tcG9uZW50KHByZWZpeCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHByZWZpeCBpcyBtYWxmb3JtZWQ6ICcgKyBwcmVmaXgpO1xuICAgIH1cblxuICAgIHN0YXRlLnRhZ01hcFtoYW5kbGVdID0gcHJlZml4O1xuICB9XG59O1xuXG5cbmZ1bmN0aW9uIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBzdGFydCwgZW5kLCBjaGVja0pzb24pIHtcbiAgdmFyIF9wb3NpdGlvbiwgX2xlbmd0aCwgX2NoYXJhY3RlciwgX3Jlc3VsdDtcblxuICBpZiAoc3RhcnQgPCBlbmQpIHtcbiAgICBfcmVzdWx0ID0gc3RhdGUuaW5wdXQuc2xpY2Uoc3RhcnQsIGVuZCk7XG5cbiAgICBpZiAoY2hlY2tKc29uKSB7XG4gICAgICBmb3IgKF9wb3NpdGlvbiA9IDAsIF9sZW5ndGggPSBfcmVzdWx0Lmxlbmd0aDsgX3Bvc2l0aW9uIDwgX2xlbmd0aDsgX3Bvc2l0aW9uICs9IDEpIHtcbiAgICAgICAgX2NoYXJhY3RlciA9IF9yZXN1bHQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuICAgICAgICBpZiAoIShfY2hhcmFjdGVyID09PSAweDA5IHx8XG4gICAgICAgICAgICAgICgweDIwIDw9IF9jaGFyYWN0ZXIgJiYgX2NoYXJhY3RlciA8PSAweDEwRkZGRikpKSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2V4cGVjdGVkIHZhbGlkIEpTT04gY2hhcmFjdGVyJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFBBVFRFUk5fTk9OX1BSSU5UQUJMRS50ZXN0KF9yZXN1bHQpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGhlIHN0cmVhbSBjb250YWlucyBub24tcHJpbnRhYmxlIGNoYXJhY3RlcnMnKTtcbiAgICB9XG5cbiAgICBzdGF0ZS5yZXN1bHQgKz0gX3Jlc3VsdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZU1hcHBpbmdzKHN0YXRlLCBkZXN0aW5hdGlvbiwgc291cmNlLCBvdmVycmlkYWJsZUtleXMpIHtcbiAgdmFyIHNvdXJjZUtleXMsIGtleSwgaW5kZXgsIHF1YW50aXR5O1xuXG4gIGlmICghY29tbW9uLmlzT2JqZWN0KHNvdXJjZSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IG1lcmdlIG1hcHBpbmdzOyB0aGUgcHJvdmlkZWQgc291cmNlIG9iamVjdCBpcyB1bmFjY2VwdGFibGUnKTtcbiAgfVxuXG4gIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IHNvdXJjZUtleXMubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAga2V5ID0gc291cmNlS2V5c1tpbmRleF07XG5cbiAgICBpZiAoIV9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoZGVzdGluYXRpb24sIGtleSkpIHtcbiAgICAgIHNldFByb3BlcnR5KGRlc3RpbmF0aW9uLCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIG92ZXJyaWRhYmxlS2V5c1trZXldID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSxcbiAgc3RhcnRMaW5lLCBzdGFydExpbmVTdGFydCwgc3RhcnRQb3MpIHtcblxuICB2YXIgaW5kZXgsIHF1YW50aXR5O1xuXG4gIC8vIFRoZSBvdXRwdXQgaXMgYSBwbGFpbiBvYmplY3QgaGVyZSwgc28ga2V5cyBjYW4gb25seSBiZSBzdHJpbmdzLlxuICAvLyBXZSBuZWVkIHRvIGNvbnZlcnQga2V5Tm9kZSB0byBhIHN0cmluZywgYnV0IGRvaW5nIHNvIGNhbiBoYW5nIHRoZSBwcm9jZXNzXG4gIC8vIChkZWVwbHkgbmVzdGVkIGFycmF5cyB0aGF0IGV4cGxvZGUgZXhwb25lbnRpYWxseSB1c2luZyBhbGlhc2VzKS5cbiAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZSkpIHtcbiAgICBrZXlOb2RlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoa2V5Tm9kZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBrZXlOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5Tm9kZVtpbmRleF0pKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduZXN0ZWQgYXJyYXlzIGFyZSBub3Qgc3VwcG9ydGVkIGluc2lkZSBrZXlzJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGVbaW5kZXhdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAga2V5Tm9kZVtpbmRleF0gPSAnW29iamVjdCBPYmplY3RdJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBdm9pZCBjb2RlIGV4ZWN1dGlvbiBpbiBsb2FkKCkgdmlhIHRvU3RyaW5nIHByb3BlcnR5XG4gIC8vIChzdGlsbCB1c2UgaXRzIG93biB0b1N0cmluZyBmb3IgYXJyYXlzLCB0aW1lc3RhbXBzLFxuICAvLyBhbmQgd2hhdGV2ZXIgdXNlciBzY2hlbWEgZXh0ZW5zaW9ucyBoYXBwZW4gdG8gaGF2ZSBAQHRvU3RyaW5nVGFnKVxuICBpZiAodHlwZW9mIGtleU5vZGUgPT09ICdvYmplY3QnICYmIF9jbGFzcyhrZXlOb2RlKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICBrZXlOb2RlID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gIH1cblxuXG4gIGtleU5vZGUgPSBTdHJpbmcoa2V5Tm9kZSk7XG5cbiAgaWYgKF9yZXN1bHQgPT09IG51bGwpIHtcbiAgICBfcmVzdWx0ID0ge307XG4gIH1cblxuICBpZiAoa2V5VGFnID09PSAndGFnOnlhbWwub3JnLDIwMDI6bWVyZ2UnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVOb2RlKSkge1xuICAgICAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gdmFsdWVOb2RlLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGVbaW5kZXhdLCBvdmVycmlkYWJsZUtleXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBtZXJnZU1hcHBpbmdzKHN0YXRlLCBfcmVzdWx0LCB2YWx1ZU5vZGUsIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghc3RhdGUuanNvbiAmJlxuICAgICAgICAhX2hhc093blByb3BlcnR5JDEuY2FsbChvdmVycmlkYWJsZUtleXMsIGtleU5vZGUpICYmXG4gICAgICAgIF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoX3Jlc3VsdCwga2V5Tm9kZSkpIHtcbiAgICAgIHN0YXRlLmxpbmUgPSBzdGFydExpbmUgfHwgc3RhdGUubGluZTtcbiAgICAgIHN0YXRlLmxpbmVTdGFydCA9IHN0YXJ0TGluZVN0YXJ0IHx8IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIHN0YXRlLnBvc2l0aW9uID0gc3RhcnRQb3MgfHwgc3RhdGUucG9zaXRpb247XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRlZCBtYXBwaW5nIGtleScpO1xuICAgIH1cblxuICAgIHNldFByb3BlcnR5KF9yZXN1bHQsIGtleU5vZGUsIHZhbHVlTm9kZSk7XG4gICAgZGVsZXRlIG92ZXJyaWRhYmxlS2V5c1trZXlOb2RlXTtcbiAgfVxuXG4gIHJldHVybiBfcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZWFkTGluZUJyZWFrKHN0YXRlKSB7XG4gIHZhciBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgwRC8qIENSICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24rKztcbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MEEvKiBMRiAqLykge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2EgbGluZSBicmVhayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgc3RhdGUubGluZSArPSAxO1xuICBzdGF0ZS5saW5lU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgc3RhdGUuZmlyc3RUYWJJbkxpbmUgPSAtMTtcbn1cblxuZnVuY3Rpb24gc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgYWxsb3dDb21tZW50cywgY2hlY2tJbmRlbnQpIHtcbiAgdmFyIGxpbmVCcmVha3MgPSAwLFxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICBpZiAoY2ggPT09IDB4MDkvKiBUYWIgKi8gJiYgc3RhdGUuZmlyc3RUYWJJbkxpbmUgPT09IC0xKSB7XG4gICAgICAgIHN0YXRlLmZpcnN0VGFiSW5MaW5lID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGFsbG93Q29tbWVudHMgJiYgY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBkbyB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH0gd2hpbGUgKGNoICE9PSAweDBBLyogTEYgKi8gJiYgY2ggIT09IDB4MEQvKiBDUiAqLyAmJiBjaCAhPT0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgbGluZUJyZWFrcysrO1xuICAgICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICAgIHdoaWxlIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQrKztcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoY2hlY2tJbmRlbnQgIT09IC0xICYmIGxpbmVCcmVha3MgIT09IDAgJiYgc3RhdGUubGluZUluZGVudCA8IGNoZWNrSW5kZW50KSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnZGVmaWNpZW50IGluZGVudGF0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gbGluZUJyZWFrcztcbn1cblxuZnVuY3Rpb24gdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuXG4gIC8vIENvbmRpdGlvbiBzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0IGlzIHRlc3RlZFxuICAvLyBpbiBwYXJlbnQgb24gZWFjaCBjYWxsLCBmb3IgZWZmaWNpZW5jeS4gTm8gbmVlZHMgdG8gdGVzdCBoZXJlIGFnYWluLlxuICBpZiAoKGNoID09PSAweDJELyogLSAqLyB8fCBjaCA9PT0gMHgyRS8qIC4gKi8pICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAxKSAmJlxuICAgICAgY2ggPT09IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uICsgMikpIHtcblxuICAgIF9wb3NpdGlvbiArPSAzO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDAgfHwgaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBjb3VudCkge1xuICBpZiAoY291bnQgPT09IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgKz0gJyAnO1xuICB9IGVsc2UgaWYgKGNvdW50ID4gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBjb3VudCAtIDEpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gcmVhZFBsYWluU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50LCB3aXRoaW5GbG93Q29sbGVjdGlvbikge1xuICB2YXIgcHJlY2VkaW5nLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgY2FwdHVyZVN0YXJ0LFxuICAgICAgY2FwdHVyZUVuZCxcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50LFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX2xpbmVJbmRlbnQsXG4gICAgICBfa2luZCA9IHN0YXRlLmtpbmQsXG4gICAgICBfcmVzdWx0ID0gc3RhdGUucmVzdWx0LFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoaXNfV1NfT1JfRU9MKGNoKSAgICAgIHx8XG4gICAgICBpc19GTE9XX0lORElDQVRPUihjaCkgfHxcbiAgICAgIGNoID09PSAweDIzLyogIyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjYvKiAmICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyQS8qICogKi8gICAgfHxcbiAgICAgIGNoID09PSAweDIxLyogISAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4N0MvKiB8ICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgzRS8qID4gKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI3LyogJyAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjIvKiBcIiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjUvKiAlICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg0MC8qIEAgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDYwLyogYCAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMHgzRi8qID8gKi8gfHwgY2ggPT09IDB4MkQvKiAtICovKSB7XG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpIHx8XG4gICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihmb2xsb3dpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIHByZWNlZGluZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gLSAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChwcmVjZWRpbmcpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB8fFxuICAgICAgICAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgICBicmVhaztcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2xpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9saW5lSW5kZW50ID0gc3RhdGUubGluZUluZGVudDtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCAtMSk7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID49IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSB0cnVlO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uID0gY2FwdHVyZUVuZDtcbiAgICAgICAgc3RhdGUubGluZSA9IF9saW5lO1xuICAgICAgICBzdGF0ZS5saW5lU3RhcnQgPSBfbGluZVN0YXJ0O1xuICAgICAgICBzdGF0ZS5saW5lSW5kZW50ID0gX2xpbmVJbmRlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChoYXNQZW5kaW5nQ29udGVudCkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc3RhdGUubGluZSAtIF9saW5lKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIGhhc1BlbmRpbmdDb250ZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCFpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbiArIDE7XG4gICAgfVxuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgZmFsc2UpO1xuXG4gIGlmIChzdGF0ZS5yZXN1bHQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSBfa2luZDtcbiAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjaCxcbiAgICAgIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNy8qICcgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBzdGF0ZS5wb3NpdGlvbisrO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgyNy8qICcgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIHRydWUpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIGRvY3VtZW50IHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBzaW5nbGUgcXVvdGVkIHNjYWxhcicpO1xufVxuXG5mdW5jdGlvbiByZWFkRG91YmxlUXVvdGVkU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGV4TGVuZ3RoLFxuICAgICAgaGV4UmVzdWx0LFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjIvKiBcIiAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDIyLyogXCIgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4NUMvKiBcXCAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3b3JrIHRvIGlubGluZSBmbiB3aXRoIG5vIHR5cGUgY2FzdD9cbiAgICAgIH0gZWxzZSBpZiAoY2ggPCAyNTYgJiYgc2ltcGxlRXNjYXBlQ2hlY2tbY2hdKSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBzaW1wbGVFc2NhcGVNYXBbY2hdO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2UgaWYgKCh0bXAgPSBlc2NhcGVkSGV4TGVuKGNoKSkgPiAwKSB7XG4gICAgICAgIGhleExlbmd0aCA9IHRtcDtcbiAgICAgICAgaGV4UmVzdWx0ID0gMDtcblxuICAgICAgICBmb3IgKDsgaGV4TGVuZ3RoID4gMDsgaGV4TGVuZ3RoLS0pIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAoKHRtcCA9IGZyb21IZXhDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgICAgICAgaGV4UmVzdWx0ID0gKGhleFJlc3VsdCA8PCA0KSArIHRtcDtcblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgaGV4YWRlY2ltYWwgY2hhcmFjdGVyJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNoYXJGcm9tQ29kZXBvaW50KGhleFJlc3VsdCk7XG5cbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gZXNjYXBlIHNlcXVlbmNlJyk7XG4gICAgICB9XG5cbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGRvdWJsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgcmVhZE5leHQgPSB0cnVlLFxuICAgICAgX2xpbmUsXG4gICAgICBfbGluZVN0YXJ0LFxuICAgICAgX3BvcyxcbiAgICAgIF90YWcgICAgID0gc3RhdGUudGFnLFxuICAgICAgX3Jlc3VsdCxcbiAgICAgIF9hbmNob3IgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgdGVybWluYXRvcixcbiAgICAgIGlzUGFpcixcbiAgICAgIGlzRXhwbGljaXRQYWlyLFxuICAgICAgaXNNYXBwaW5nLFxuICAgICAgb3ZlcnJpZGFibGVLZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGtleU5vZGUsXG4gICAgICBrZXlUYWcsXG4gICAgICB2YWx1ZU5vZGUsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHg1Qi8qIFsgKi8pIHtcbiAgICB0ZXJtaW5hdG9yID0gMHg1RDsvKiBdICovXG4gICAgaXNNYXBwaW5nID0gZmFsc2U7XG4gICAgX3Jlc3VsdCA9IFtdO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDdCLyogeyAqLykge1xuICAgIHRlcm1pbmF0b3IgPSAweDdEOy8qIH0gKi9cbiAgICBpc01hcHBpbmcgPSB0cnVlO1xuICAgIF9yZXN1bHQgPSB7fTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBfcmVzdWx0O1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gdGVybWluYXRvcikge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgc3RhdGUua2luZCA9IGlzTWFwcGluZyA/ICdtYXBwaW5nJyA6ICdzZXF1ZW5jZSc7XG4gICAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICghcmVhZE5leHQpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdtaXNzZWQgY29tbWEgYmV0d2VlbiBmbG93IGNvbGxlY3Rpb24gZW50cmllcycpO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4MkMvKiAsICovKSB7XG4gICAgICAvLyBcImZsb3cgY29sbGVjdGlvbiBlbnRyaWVzIGNhbiBuZXZlciBiZSBjb21wbGV0ZWx5IGVtcHR5XCIsIGFzIHBlciBZQU1MIDEuMiwgc2VjdGlvbiA3LjRcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsIFwiZXhwZWN0ZWQgdGhlIG5vZGUgY29udGVudCwgYnV0IGZvdW5kICcsJ1wiKTtcbiAgICB9XG5cbiAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICBpc1BhaXIgPSBpc0V4cGxpY2l0UGFpciA9IGZhbHNlO1xuXG4gICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcbiAgICAgICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSB0cnVlO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgbGluZS5cbiAgICBfbGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgIF9wb3MgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICBjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9GTE9XX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAga2V5VGFnID0gc3RhdGUudGFnO1xuICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKChpc0V4cGxpY2l0UGFpciB8fCBzdGF0ZS5saW5lID09PSBfbGluZSkgJiYgY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBpc1BhaXIgPSB0cnVlO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG4gICAgICBjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9GTE9XX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB2YWx1ZU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKGlzTWFwcGluZykge1xuICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9saW5lU3RhcnQsIF9wb3MpO1xuICAgIH0gZWxzZSBpZiAoaXNQYWlyKSB7XG4gICAgICBfcmVzdWx0LnB1c2goc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgbnVsbCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2xpbmUsIF9saW5lU3RhcnQsIF9wb3MpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3Jlc3VsdC5wdXNoKGtleU5vZGUpO1xuICAgIH1cblxuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMHgyQy8qICwgKi8pIHtcbiAgICAgIHJlYWROZXh0ID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhZE5leHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBmbG93IGNvbGxlY3Rpb24nKTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2NhbGFyKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBjYXB0dXJlU3RhcnQsXG4gICAgICBmb2xkaW5nLFxuICAgICAgY2hvbXBpbmcgICAgICAgPSBDSE9NUElOR19DTElQLFxuICAgICAgZGlkUmVhZENvbnRlbnQgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkSW5kZW50ID0gZmFsc2UsXG4gICAgICB0ZXh0SW5kZW50ICAgICA9IG5vZGVJbmRlbnQsXG4gICAgICBlbXB0eUxpbmVzICAgICA9IDAsXG4gICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlLFxuICAgICAgdG1wLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4N0MvKiB8ICovKSB7XG4gICAgZm9sZGluZyA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDNFLyogPiAqLykge1xuICAgIGZvbGRpbmcgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJCLyogKyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICAgIGlmIChDSE9NUElOR19DTElQID09PSBjaG9tcGluZykge1xuICAgICAgICBjaG9tcGluZyA9IChjaCA9PT0gMHgyQi8qICsgKi8pID8gQ0hPTVBJTkdfS0VFUCA6IENIT01QSU5HX1NUUklQO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3JlcGVhdCBvZiBhIGNob21waW5nIG1vZGUgaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICgodG1wID0gZnJvbURlY2ltYWxDb2RlKGNoKSkgPj0gMCkge1xuICAgICAgaWYgKHRtcCA9PT0gMCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGV4cGxpY2l0IGluZGVudGF0aW9uIHdpZHRoIG9mIGEgYmxvY2sgc2NhbGFyOyBpdCBjYW5ub3QgYmUgbGVzcyB0aGFuIG9uZScpO1xuICAgICAgfSBlbHNlIGlmICghZGV0ZWN0ZWRJbmRlbnQpIHtcbiAgICAgICAgdGV4dEluZGVudCA9IG5vZGVJbmRlbnQgKyB0bXAgLSAxO1xuICAgICAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGFuIGluZGVudGF0aW9uIHdpZHRoIGlkZW50aWZpZXInKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKTtcblxuICAgIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSk7XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG4gICAgc3RhdGUubGluZUluZGVudCA9IDA7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgd2hpbGUgKCghZGV0ZWN0ZWRJbmRlbnQgfHwgc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpICYmXG4gICAgICAgICAgIChjaCA9PT0gMHgyMC8qIFNwYWNlICovKSkge1xuICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmICghZGV0ZWN0ZWRJbmRlbnQgJiYgc3RhdGUubGluZUluZGVudCA+IHRleHRJbmRlbnQpIHtcbiAgICAgIHRleHRJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgIH1cblxuICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBlbXB0eUxpbmVzKys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBFbmQgb2YgdGhlIHNjYWxhci5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA8IHRleHRJbmRlbnQpIHtcblxuICAgICAgLy8gUGVyZm9ybSB0aGUgY2hvbXBpbmcuXG4gICAgICBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0tFRVApIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hvbXBpbmcgPT09IENIT01QSU5HX0NMSVApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB0aGUgc2NhbGFyIGlzIG5vdCBlbXB0eS5cbiAgICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gJ1xcbic7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnJlYWsgdGhpcyBgd2hpbGVgIGN5Y2xlIGFuZCBnbyB0byB0aGUgZnVuY2l0b24ncyBlcGlsb2d1ZS5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIEZvbGRlZCBzdHlsZTogdXNlIGZhbmN5IHJ1bGVzIHRvIGhhbmRsZSBsaW5lIGJyZWFrcy5cbiAgICBpZiAoZm9sZGluZykge1xuXG4gICAgICAvLyBMaW5lcyBzdGFydGluZyB3aXRoIHdoaXRlIHNwYWNlIGNoYXJhY3RlcnMgKG1vcmUtaW5kZW50ZWQgbGluZXMpIGFyZSBub3QgZm9sZGVkLlxuICAgICAgaWYgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IHRydWU7XG4gICAgICAgIC8vIGV4Y2VwdCBmb3IgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSAoY2YuIEV4YW1wbGUgOC4xKVxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuXG4gICAgICAvLyBFbmQgb2YgbW9yZS1pbmRlbnRlZCBibG9jay5cbiAgICAgIH0gZWxzZSBpZiAoYXRNb3JlSW5kZW50ZWQpIHtcbiAgICAgICAgYXRNb3JlSW5kZW50ZWQgPSBmYWxzZTtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMgKyAxKTtcblxuICAgICAgLy8gSnVzdCBvbmUgbGluZSBicmVhayAtIHBlcmNlaXZlIGFzIHRoZSBzYW1lIGxpbmUuXG4gICAgICB9IGVsc2UgaWYgKGVtcHR5TGluZXMgPT09IDApIHtcbiAgICAgICAgaWYgKGRpZFJlYWRDb250ZW50KSB7IC8vIGkuZS4gb25seSBpZiB3ZSBoYXZlIGFscmVhZHkgcmVhZCBzb21lIHNjYWxhciBjb250ZW50LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgLy8gU2V2ZXJhbCBsaW5lIGJyZWFrcyAtIHBlcmNlaXZlIGFzIGRpZmZlcmVudCBsaW5lcy5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBlbXB0eUxpbmVzKTtcbiAgICAgIH1cblxuICAgIC8vIExpdGVyYWwgc3R5bGU6IGp1c3QgYWRkIGV4YWN0IG51bWJlciBvZiBsaW5lIGJyZWFrcyBiZXR3ZWVuIGNvbnRlbnQgbGluZXMuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEtlZXAgYWxsIGxpbmUgYnJlYWtzIGV4Y2VwdCB0aGUgaGVhZGVyIGxpbmUgYnJlYWsuXG4gICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgIH1cblxuICAgIGRpZFJlYWRDb250ZW50ID0gdHJ1ZTtcbiAgICBkZXRlY3RlZEluZGVudCA9IHRydWU7XG4gICAgZW1wdHlMaW5lcyA9IDA7XG4gICAgY2FwdHVyZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB3aGlsZSAoIWlzX0VPTChjaCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCBmYWxzZSk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIF9saW5lLFxuICAgICAgX3RhZyAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgX3Jlc3VsdCAgID0gW10sXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBkZXRlY3RlZCAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIC8vIHRoZXJlIGlzIGEgbGVhZGluZyB0YWIgYmVmb3JlIHRoaXMgdG9rZW4sIHNvIGl0IGNhbid0IGJlIGEgYmxvY2sgc2VxdWVuY2UvbWFwcGluZztcbiAgLy8gaXQgY2FuIHN0aWxsIGJlIGZsb3cgc2VxdWVuY2UvbWFwcGluZyBvciBhIHNjYWxhclxuICBpZiAoc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKHN0YXRlLmZpcnN0VGFiSW5MaW5lICE9PSAtMSkge1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGF0ZS5maXJzdFRhYkluTGluZTtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWIgY2hhcmFjdGVycyBtdXN0IG5vdCBiZSB1c2VkIGluIGluZGVudGF0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKGNoICE9PSAweDJELyogLSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgaWYgKCFpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA8PSBub2RlSW5kZW50KSB7XG4gICAgICAgIF9yZXN1bHQucHVzaChudWxsKTtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX0lOLCBmYWxzZSwgdHJ1ZSk7XG4gICAgX3Jlc3VsdC5wdXNoKHN0YXRlLnJlc3VsdCk7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgaW5kZW50YXRpb24gb2YgYSBzZXF1ZW5jZSBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ3NlcXVlbmNlJztcbiAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgbm9kZUluZGVudCwgZmxvd0luZGVudCkge1xuICB2YXIgZm9sbG93aW5nLFxuICAgICAgYWxsb3dDb21wYWN0LFxuICAgICAgX2xpbmUsXG4gICAgICBfa2V5TGluZSxcbiAgICAgIF9rZXlMaW5lU3RhcnQsXG4gICAgICBfa2V5UG9zLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9hbmNob3IgICAgICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgICAgID0ge30sXG4gICAgICBvdmVycmlkYWJsZUtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAga2V5VGFnICAgICAgICA9IG51bGwsXG4gICAgICBrZXlOb2RlICAgICAgID0gbnVsbCxcbiAgICAgIHZhbHVlTm9kZSAgICAgPSBudWxsLFxuICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWQgICAgICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgLy8gdGhlcmUgaXMgYSBsZWFkaW5nIHRhYiBiZWZvcmUgdGhpcyB0b2tlbiwgc28gaXQgY2FuJ3QgYmUgYSBibG9jayBzZXF1ZW5jZS9tYXBwaW5nO1xuICAvLyBpdCBjYW4gc3RpbGwgYmUgZmxvdyBzZXF1ZW5jZS9tYXBwaW5nIG9yIGEgc2NhbGFyXG4gIGlmIChzdGF0ZS5maXJzdFRhYkluTGluZSAhPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBfcmVzdWx0O1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoIWF0RXhwbGljaXRLZXkgJiYgc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXRlLmZpcnN0VGFiSW5MaW5lO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhYiBjaGFyYWN0ZXJzIG11c3Qgbm90IGJlIHVzZWQgaW4gaW5kZW50YXRpb24nKTtcbiAgICB9XG5cbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lOyAvLyBTYXZlIHRoZSBjdXJyZW50IGxpbmUuXG5cbiAgICAvL1xuICAgIC8vIEV4cGxpY2l0IG5vdGF0aW9uIGNhc2UuIFRoZXJlIGFyZSB0d28gc2VwYXJhdGUgYmxvY2tzOlxuICAgIC8vIGZpcnN0IGZvciB0aGUga2V5IChkZW5vdGVkIGJ5IFwiP1wiKSBhbmQgc2Vjb25kIGZvciB0aGUgdmFsdWUgKGRlbm90ZWQgYnkgXCI6XCIpXG4gICAgLy9cbiAgICBpZiAoKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgzQS8qIDogKi8pICYmIGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICAgICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICBhdEV4cGxpY2l0S2V5ID0gdHJ1ZTtcbiAgICAgICAgYWxsb3dDb21wYWN0ID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgIC8vIGkuZS4gMHgzQS8qIDogKi8gPT09IGNoYXJhY3RlciBhZnRlciB0aGUgZXhwbGljaXQga2V5LlxuICAgICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgIGFsbG93Q29tcGFjdCA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbmNvbXBsZXRlIGV4cGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBrZXkgbm9kZSBpcyBtaXNzZWQ7IG9yIGZvbGxvd2VkIGJ5IGEgbm9uLXRhYnVsYXRlZCBlbXB0eSBsaW5lJyk7XG4gICAgICB9XG5cbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDE7XG4gICAgICBjaCA9IGZvbGxvd2luZztcblxuICAgIC8vXG4gICAgLy8gSW1wbGljaXQgbm90YXRpb24gY2FzZS4gRmxvdy1zdHlsZSBub2RlIGFzIHRoZSBrZXkgZmlyc3QsIHRoZW4gXCI6XCIsIGFuZCB0aGUgdmFsdWUuXG4gICAgLy9cbiAgICB9IGVsc2Uge1xuICAgICAgX2tleUxpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgX2tleUxpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgIF9rZXlQb3MgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgaWYgKCFjb21wb3NlTm9kZShzdGF0ZSwgZmxvd0luZGVudCwgQ09OVEVYVF9GTE9XX09VVCwgZmFsc2UsIHRydWUpKSB7XG4gICAgICAgIC8vIE5laXRoZXIgaW1wbGljaXQgbm9yIGV4cGxpY2l0IG5vdGF0aW9uLlxuICAgICAgICAvLyBSZWFkaW5nIGlzIGRvbmUuIEdvIHRvIHRoZSBlcGlsb2d1ZS5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgICAgaWYgKCFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSB3aGl0ZXNwYWNlIGNoYXJhY3RlciBpcyBleHBlY3RlZCBhZnRlciB0aGUga2V5LXZhbHVlIHNlcGFyYXRvciB3aXRoaW4gYSBibG9jayBtYXBwaW5nJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsLCBfa2V5TGluZSwgX2tleUxpbmVTdGFydCwgX2tleVBvcyk7XG4gICAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICAgIGFsbG93Q29tcGFjdCA9IGZhbHNlO1xuICAgICAgICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0ZWN0ZWQpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGFuIGltcGxpY2l0IG1hcHBpbmcgcGFpcjsgYSBjb2xvbiBpcyBtaXNzZWQnKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgcmVzdWx0IG9mIGBjb21wb3NlTm9kZWAuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2FuIG5vdCByZWFkIGEgYmxvY2sgbWFwcGluZyBlbnRyeTsgYSBtdWx0aWxpbmUga2V5IG1heSBub3QgYmUgYW4gaW1wbGljaXQga2V5Jyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIENvbW1vbiByZWFkaW5nIGNvZGUgZm9yIGJvdGggZXhwbGljaXQgYW5kIGltcGxpY2l0IG5vdGF0aW9ucy5cbiAgICAvL1xuICAgIGlmIChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkge1xuICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgX2tleUxpbmUgPSBzdGF0ZS5saW5lO1xuICAgICAgICBfa2V5TGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgICBfa2V5UG9zID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9XG5cbiAgICAgIGlmIChjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9CTE9DS19PVVQsIHRydWUsIGFsbG93Q29tcGFjdCkpIHtcbiAgICAgICAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIHZhbHVlTm9kZSwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoKHN0YXRlLmxpbmUgPT09IF9saW5lIHx8IHN0YXRlLmxpbmVJbmRlbnQgPiBub2RlSW5kZW50KSAmJiAoY2ggIT09IDApKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGluZGVudGF0aW9uIG9mIGEgbWFwcGluZyBlbnRyeScpO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IG5vZGVJbmRlbnQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIEVwaWxvZ3VlLlxuICAvL1xuXG4gIC8vIFNwZWNpYWwgY2FzZTogbGFzdCBtYXBwaW5nJ3Mgbm9kZSBjb250YWlucyBvbmx5IHRoZSBrZXkgaW4gZXhwbGljaXQgbm90YXRpb24uXG4gIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwsIF9rZXlMaW5lLCBfa2V5TGluZVN0YXJ0LCBfa2V5UG9zKTtcbiAgfVxuXG4gIC8vIEV4cG9zZSB0aGUgcmVzdWx0aW5nIG1hcHBpbmcuXG4gIGlmIChkZXRlY3RlZCkge1xuICAgIHN0YXRlLnRhZyA9IF90YWc7XG4gICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICBzdGF0ZS5raW5kID0gJ21hcHBpbmcnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gIH1cblxuICByZXR1cm4gZGV0ZWN0ZWQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgaXNWZXJiYXRpbSA9IGZhbHNlLFxuICAgICAgaXNOYW1lZCAgICA9IGZhbHNlLFxuICAgICAgdGFnSGFuZGxlLFxuICAgICAgdGFnTmFtZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDIxLyogISAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS50YWcgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYSB0YWcgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4M0MvKiA8ICovKSB7XG4gICAgaXNWZXJiYXRpbSA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgaXNOYW1lZCA9IHRydWU7XG4gICAgdGFnSGFuZGxlID0gJyEhJztcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIHtcbiAgICB0YWdIYW5kbGUgPSAnISc7XG4gIH1cblxuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICBpZiAoaXNWZXJiYXRpbSkge1xuICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgd2hpbGUgKGNoICE9PSAwICYmIGNoICE9PSAweDNFLyogPiAqLyk7XG5cbiAgICBpZiAoc3RhdGUucG9zaXRpb24gPCBzdGF0ZS5sZW5ndGgpIHtcbiAgICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgdmVyYmF0aW0gdGFnJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjEvKiAhICovKSB7XG4gICAgICAgIGlmICghaXNOYW1lZCkge1xuICAgICAgICAgIHRhZ0hhbmRsZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiAtIDEsIHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgICAgICBpZiAoIVBBVFRFUk5fVEFHX0hBTkRMRS50ZXN0KHRhZ0hhbmRsZSkpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lZCB0YWcgaGFuZGxlIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVycycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlzTmFtZWQgPSB0cnVlO1xuICAgICAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBleGNsYW1hdGlvbiBtYXJrcycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICB0YWdOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoUEFUVEVSTl9GTE9XX0lORElDQVRPUlMudGVzdCh0YWdOYW1lKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBzdWZmaXggY2Fubm90IGNvbnRhaW4gZmxvdyBpbmRpY2F0b3IgY2hhcmFjdGVycycpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0YWdOYW1lICYmICFQQVRURVJOX1RBR19VUkkudGVzdCh0YWdOYW1lKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgbmFtZSBjYW5ub3QgY29udGFpbiBzdWNoIGNoYXJhY3RlcnM6ICcgKyB0YWdOYW1lKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdGFnTmFtZSA9IGRlY29kZVVSSUNvbXBvbmVudCh0YWdOYW1lKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBuYW1lIGlzIG1hbGZvcm1lZDogJyArIHRhZ05hbWUpO1xuICB9XG5cbiAgaWYgKGlzVmVyYmF0aW0pIHtcbiAgICBzdGF0ZS50YWcgPSB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS50YWdNYXAsIHRhZ0hhbmRsZSkpIHtcbiAgICBzdGF0ZS50YWcgPSBzdGF0ZS50YWdNYXBbdGFnSGFuZGxlXSArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIGlmICh0YWdIYW5kbGUgPT09ICchJykge1xuICAgIHN0YXRlLnRhZyA9ICchJyArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIGlmICh0YWdIYW5kbGUgPT09ICchIScpIHtcbiAgICBzdGF0ZS50YWcgPSAndGFnOnlhbWwub3JnLDIwMDI6JyArIHRhZ05hbWU7XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5kZWNsYXJlZCB0YWcgaGFuZGxlIFwiJyArIHRhZ0hhbmRsZSArICdcIicpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlYWRBbmNob3JQcm9wZXJ0eShzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjYvKiAmICovKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiBhbiBhbmNob3IgcHJvcGVydHknKTtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpICYmICFpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IF9wb3NpdGlvbikge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lIG9mIGFuIGFuY2hvciBub2RlIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgY2hhcmFjdGVyJyk7XG4gIH1cblxuICBzdGF0ZS5hbmNob3IgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlYWRBbGlhcyhzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uLCBhbGlhcyxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDJBLyogKiAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpICYmICFpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IF9wb3NpdGlvbikge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICduYW1lIG9mIGFuIGFsaWFzIG5vZGUgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXInKTtcbiAgfVxuXG4gIGFsaWFzID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKCFfaGFzT3duUHJvcGVydHkkMS5jYWxsKHN0YXRlLmFuY2hvck1hcCwgYWxpYXMpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuaWRlbnRpZmllZCBhbGlhcyBcIicgKyBhbGlhcyArICdcIicpO1xuICB9XG5cbiAgc3RhdGUucmVzdWx0ID0gc3RhdGUuYW5jaG9yTWFwW2FsaWFzXTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZU5vZGUoc3RhdGUsIHBhcmVudEluZGVudCwgbm9kZUNvbnRleHQsIGFsbG93VG9TZWVrLCBhbGxvd0NvbXBhY3QpIHtcbiAgdmFyIGFsbG93QmxvY2tTdHlsZXMsXG4gICAgICBhbGxvd0Jsb2NrU2NhbGFycyxcbiAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyxcbiAgICAgIGluZGVudFN0YXR1cyA9IDEsIC8vIDE6IHRoaXM+cGFyZW50LCAwOiB0aGlzPXBhcmVudCwgLTE6IHRoaXM8cGFyZW50XG4gICAgICBhdE5ld0xpbmUgID0gZmFsc2UsXG4gICAgICBoYXNDb250ZW50ID0gZmFsc2UsXG4gICAgICB0eXBlSW5kZXgsXG4gICAgICB0eXBlUXVhbnRpdHksXG4gICAgICB0eXBlTGlzdCxcbiAgICAgIHR5cGUsXG4gICAgICBmbG93SW5kZW50LFxuICAgICAgYmxvY2tJbmRlbnQ7XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ29wZW4nLCBzdGF0ZSk7XG4gIH1cblxuICBzdGF0ZS50YWcgICAgPSBudWxsO1xuICBzdGF0ZS5hbmNob3IgPSBudWxsO1xuICBzdGF0ZS5raW5kICAgPSBudWxsO1xuICBzdGF0ZS5yZXN1bHQgPSBudWxsO1xuXG4gIGFsbG93QmxvY2tTdHlsZXMgPSBhbGxvd0Jsb2NrU2NhbGFycyA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9XG4gICAgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0IHx8XG4gICAgQ09OVEVYVF9CTE9DS19JTiAgPT09IG5vZGVDb250ZXh0O1xuXG4gIGlmIChhbGxvd1RvU2Vlaykge1xuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGF0TmV3TGluZSA9IHRydWU7XG5cbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEpIHtcbiAgICB3aGlsZSAocmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB8fCByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpKSB7XG4gICAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICAgIGF0TmV3TGluZSA9IHRydWU7XG4gICAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGFsbG93QmxvY2tTdHlsZXM7XG5cbiAgICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zKSB7XG4gICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gYXROZXdMaW5lIHx8IGFsbG93Q29tcGFjdDtcbiAgfVxuXG4gIGlmIChpbmRlbnRTdGF0dXMgPT09IDEgfHwgQ09OVEVYVF9CTE9DS19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgaWYgKENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQgfHwgQ09OVEVYVF9GTE9XX09VVCA9PT0gbm9kZUNvbnRleHQpIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsb3dJbmRlbnQgPSBwYXJlbnRJbmRlbnQgKyAxO1xuICAgIH1cblxuICAgIGJsb2NrSW5kZW50ID0gc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnQ7XG5cbiAgICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgICBpZiAoYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmXG4gICAgICAgICAgKHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCkgfHxcbiAgICAgICAgICAgcmVhZEJsb2NrTWFwcGluZyhzdGF0ZSwgYmxvY2tJbmRlbnQsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgIHJlYWRGbG93Q29sbGVjdGlvbihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGFsbG93QmxvY2tTY2FsYXJzICYmIHJlYWRCbG9ja1NjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHx8XG4gICAgICAgICAgICByZWFkU2luZ2xlUXVvdGVkU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSB8fFxuICAgICAgICAgICAgcmVhZERvdWJsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlYWRBbGlhcyhzdGF0ZSkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgfHwgc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYWxpYXMgbm9kZSBzaG91bGQgbm90IGhhdmUgYW55IHByb3BlcnRpZXMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkUGxhaW5TY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19JTiA9PT0gbm9kZUNvbnRleHQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnID09PSBudWxsKSB7XG4gICAgICAgICAgICBzdGF0ZS50YWcgPSAnPyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbmRlbnRTdGF0dXMgPT09IDApIHtcbiAgICAgIC8vIFNwZWNpYWwgY2FzZTogYmxvY2sgc2VxdWVuY2VzIGFyZSBhbGxvd2VkIHRvIGhhdmUgc2FtZSBpbmRlbnRhdGlvbiBsZXZlbCBhcyB0aGUgcGFyZW50LlxuICAgICAgLy8gaHR0cDovL3d3dy55YW1sLm9yZy9zcGVjLzEuMi9zcGVjLmh0bWwjaWQyNzk5Nzg0XG4gICAgICBoYXNDb250ZW50ID0gYWxsb3dCbG9ja0NvbGxlY3Rpb25zICYmIHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBibG9ja0luZGVudCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnRhZyA9PT0gbnVsbCkge1xuICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgIH1cblxuICB9IGVsc2UgaWYgKHN0YXRlLnRhZyA9PT0gJz8nKSB7XG4gICAgLy8gSW1wbGljaXQgcmVzb2x2aW5nIGlzIG5vdCBhbGxvd2VkIGZvciBub24tc2NhbGFyIHR5cGVzLCBhbmQgJz8nXG4gICAgLy8gbm9uLXNwZWNpZmljIHRhZyBpcyBvbmx5IGF1dG9tYXRpY2FsbHkgYXNzaWduZWQgdG8gcGxhaW4gc2NhbGFycy5cbiAgICAvL1xuICAgIC8vIFdlIG9ubHkgbmVlZCB0byBjaGVjayBraW5kIGNvbmZvcm1pdHkgaW4gY2FzZSB1c2VyIGV4cGxpY2l0bHkgYXNzaWducyAnPydcbiAgICAvLyB0YWcsIGZvciBleGFtcGxlIGxpa2UgdGhpczogXCIhPD8+IFswXVwiXG4gICAgLy9cbiAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHN0YXRlLmtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITw/PiB0YWc7IGl0IHNob3VsZCBiZSBcInNjYWxhclwiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgIH1cblxuICAgIGZvciAodHlwZUluZGV4ID0gMCwgdHlwZVF1YW50aXR5ID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW3R5cGVJbmRleF07XG5cbiAgICAgIGlmICh0eXBlLnJlc29sdmUoc3RhdGUucmVzdWx0KSkgeyAvLyBgc3RhdGUucmVzdWx0YCB1cGRhdGVkIGluIHJlc29sdmVyIGlmIG1hdGNoZWRcbiAgICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0KTtcbiAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoc3RhdGUudGFnICE9PSAnIScpIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ10sIHN0YXRlLnRhZykpIHtcbiAgICAgIHR5cGUgPSBzdGF0ZS50eXBlTWFwW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ11bc3RhdGUudGFnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbG9va2luZyBmb3IgbXVsdGkgdHlwZVxuICAgICAgdHlwZSA9IG51bGw7XG4gICAgICB0eXBlTGlzdCA9IHN0YXRlLnR5cGVNYXAubXVsdGlbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXTtcblxuICAgICAgZm9yICh0eXBlSW5kZXggPSAwLCB0eXBlUXVhbnRpdHkgPSB0eXBlTGlzdC5sZW5ndGg7IHR5cGVJbmRleCA8IHR5cGVRdWFudGl0eTsgdHlwZUluZGV4ICs9IDEpIHtcbiAgICAgICAgaWYgKHN0YXRlLnRhZy5zbGljZSgwLCB0eXBlTGlzdFt0eXBlSW5kZXhdLnRhZy5sZW5ndGgpID09PSB0eXBlTGlzdFt0eXBlSW5kZXhdLnRhZykge1xuICAgICAgICAgIHR5cGUgPSB0eXBlTGlzdFt0eXBlSW5kZXhdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5rbm93biB0YWcgITwnICsgc3RhdGUudGFnICsgJz4nKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUucmVzdWx0ICE9PSBudWxsICYmIHR5cGUua2luZCAhPT0gc3RhdGUua2luZCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBub2RlIGtpbmQgZm9yICE8JyArIHN0YXRlLnRhZyArICc+IHRhZzsgaXQgc2hvdWxkIGJlIFwiJyArIHR5cGUua2luZCArICdcIiwgbm90IFwiJyArIHN0YXRlLmtpbmQgKyAnXCInKTtcbiAgICB9XG5cbiAgICBpZiAoIXR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQsIHN0YXRlLnRhZykpIHsgLy8gYHN0YXRlLnJlc3VsdGAgdXBkYXRlZCBpbiByZXNvbHZlciBpZiBtYXRjaGVkXG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnY2Fubm90IHJlc29sdmUgYSBub2RlIHdpdGggITwnICsgc3RhdGUudGFnICsgJz4gZXhwbGljaXQgdGFnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnJlc3VsdCA9IHR5cGUuY29uc3RydWN0KHN0YXRlLnJlc3VsdCwgc3RhdGUudGFnKTtcbiAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmxpc3RlbmVyICE9PSBudWxsKSB7XG4gICAgc3RhdGUubGlzdGVuZXIoJ2Nsb3NlJywgc3RhdGUpO1xuICB9XG4gIHJldHVybiBzdGF0ZS50YWcgIT09IG51bGwgfHwgIHN0YXRlLmFuY2hvciAhPT0gbnVsbCB8fCBoYXNDb250ZW50O1xufVxuXG5mdW5jdGlvbiByZWFkRG9jdW1lbnQoc3RhdGUpIHtcbiAgdmFyIGRvY3VtZW50U3RhcnQgPSBzdGF0ZS5wb3NpdGlvbixcbiAgICAgIF9wb3NpdGlvbixcbiAgICAgIGRpcmVjdGl2ZU5hbWUsXG4gICAgICBkaXJlY3RpdmVBcmdzLFxuICAgICAgaGFzRGlyZWN0aXZlcyA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgc3RhdGUudmVyc2lvbiA9IG51bGw7XG4gIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IHN0YXRlLmxlZ2FjeTtcbiAgc3RhdGUudGFnTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RhdGUuYW5jaG9yTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gMCB8fCBjaCAhPT0gMHgyNS8qICUgKi8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGhhc0RpcmVjdGl2ZXMgPSB0cnVlO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRpcmVjdGl2ZU5hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcbiAgICBkaXJlY3RpdmVBcmdzID0gW107XG5cbiAgICBpZiAoZGlyZWN0aXZlTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlIG5hbWUgbXVzdCBub3QgYmUgbGVzcyB0aGFuIG9uZSBjaGFyYWN0ZXIgaW4gbGVuZ3RoJyk7XG4gICAgfVxuXG4gICAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX0VPTChjaCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKGlzX0VPTChjaCkpIGJyZWFrO1xuXG4gICAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGlyZWN0aXZlQXJncy5wdXNoKHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pKTtcbiAgICB9XG5cbiAgICBpZiAoY2ggIT09IDApIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuXG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoZGlyZWN0aXZlSGFuZGxlcnMsIGRpcmVjdGl2ZU5hbWUpKSB7XG4gICAgICBkaXJlY3RpdmVIYW5kbGVyc1tkaXJlY3RpdmVOYW1lXShzdGF0ZSwgZGlyZWN0aXZlTmFtZSwgZGlyZWN0aXZlQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ3Vua25vd24gZG9jdW1lbnQgZGlyZWN0aXZlIFwiJyArIGRpcmVjdGl2ZU5hbWUgKyAnXCInKTtcbiAgICB9XG4gIH1cblxuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPT09IDAgJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pICAgICA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKSA9PT0gMHgyRC8qIC0gKi8gJiZcbiAgICAgIHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAyKSA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICB9IGVsc2UgaWYgKGhhc0RpcmVjdGl2ZXMpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZGlyZWN0aXZlcyBlbmQgbWFyayBpcyBleHBlY3RlZCcpO1xuICB9XG5cbiAgY29tcG9zZU5vZGUoc3RhdGUsIHN0YXRlLmxpbmVJbmRlbnQgLSAxLCBDT05URVhUX0JMT0NLX09VVCwgZmFsc2UsIHRydWUpO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgaWYgKHN0YXRlLmNoZWNrTGluZUJyZWFrcyAmJlxuICAgICAgUEFUVEVSTl9OT05fQVNDSUlfTElORV9CUkVBS1MudGVzdChzdGF0ZS5pbnB1dC5zbGljZShkb2N1bWVudFN0YXJ0LCBzdGF0ZS5wb3NpdGlvbikpKSB7XG4gICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAnbm9uLUFTQ0lJIGxpbmUgYnJlYWtzIGFyZSBpbnRlcnByZXRlZCBhcyBjb250ZW50Jyk7XG4gIH1cblxuICBzdGF0ZS5kb2N1bWVudHMucHVzaChzdGF0ZS5yZXN1bHQpO1xuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcblxuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyRS8qIC4gKi8pIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uICs9IDM7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdlbmQgb2YgdGhlIHN0cmVhbSBvciBhIGRvY3VtZW50IHNlcGFyYXRvciBpcyBleHBlY3RlZCcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpIHtcbiAgaW5wdXQgPSBTdHJpbmcoaW5wdXQpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBpZiAoaW5wdXQubGVuZ3RoICE9PSAwKSB7XG5cbiAgICAvLyBBZGQgdGFpbGluZyBgXFxuYCBpZiBub3QgZXhpc3RzXG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgIT09IDB4MEEvKiBMRiAqLyAmJlxuICAgICAgICBpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBELyogQ1IgKi8pIHtcbiAgICAgIGlucHV0ICs9ICdcXG4nO1xuICAgIH1cblxuICAgIC8vIFN0cmlwIEJPTVxuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KDApID09PSAweEZFRkYpIHtcbiAgICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoMSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHN0YXRlID0gbmV3IFN0YXRlJDEoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIHZhciBudWxscG9zID0gaW5wdXQuaW5kZXhPZignXFwwJyk7XG5cbiAgaWYgKG51bGxwb3MgIT09IC0xKSB7XG4gICAgc3RhdGUucG9zaXRpb24gPSBudWxscG9zO1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdudWxsIGJ5dGUgaXMgbm90IGFsbG93ZWQgaW4gaW5wdXQnKTtcbiAgfVxuXG4gIC8vIFVzZSAwIGFzIHN0cmluZyB0ZXJtaW5hdG9yLiBUaGF0IHNpZ25pZmljYW50bHkgc2ltcGxpZmllcyBib3VuZHMgY2hlY2suXG4gIHN0YXRlLmlucHV0ICs9ICdcXDAnO1xuXG4gIHdoaWxlIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgyMC8qIFNwYWNlICovKSB7XG4gICAgc3RhdGUubGluZUluZGVudCArPSAxO1xuICAgIHN0YXRlLnBvc2l0aW9uICs9IDE7XG4gIH1cblxuICB3aGlsZSAoc3RhdGUucG9zaXRpb24gPCAoc3RhdGUubGVuZ3RoIC0gMSkpIHtcbiAgICByZWFkRG9jdW1lbnQoc3RhdGUpO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlLmRvY3VtZW50cztcbn1cblxuXG5mdW5jdGlvbiBsb2FkQWxsJDEoaW5wdXQsIGl0ZXJhdG9yLCBvcHRpb25zKSB7XG4gIGlmIChpdGVyYXRvciAhPT0gbnVsbCAmJiB0eXBlb2YgaXRlcmF0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJykge1xuICAgIG9wdGlvbnMgPSBpdGVyYXRvcjtcbiAgICBpdGVyYXRvciA9IG51bGw7XG4gIH1cblxuICB2YXIgZG9jdW1lbnRzID0gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucyk7XG5cbiAgaWYgKHR5cGVvZiBpdGVyYXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBkb2N1bWVudHM7XG4gIH1cblxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGRvY3VtZW50cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgaXRlcmF0b3IoZG9jdW1lbnRzW2luZGV4XSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkJDEoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdmFyIGRvY3VtZW50cyA9IGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIGlmIChkb2N1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBuby11bmRlZmluZWQqL1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBkb2N1bWVudHNbMF07XG4gIH1cbiAgdGhyb3cgbmV3IGV4Y2VwdGlvbignZXhwZWN0ZWQgYSBzaW5nbGUgZG9jdW1lbnQgaW4gdGhlIHN0cmVhbSwgYnV0IGZvdW5kIG1vcmUnKTtcbn1cblxuXG52YXIgbG9hZEFsbF8xID0gbG9hZEFsbCQxO1xudmFyIGxvYWRfMSAgICA9IGxvYWQkMTtcblxudmFyIGxvYWRlciA9IHtcblx0bG9hZEFsbDogbG9hZEFsbF8xLFxuXHRsb2FkOiBsb2FkXzFcbn07XG5cbi8qZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUqL1xuXG5cblxuXG5cbnZhciBfdG9TdHJpbmcgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIF9oYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBDSEFSX0JPTSAgICAgICAgICAgICAgICAgID0gMHhGRUZGO1xudmFyIENIQVJfVEFCICAgICAgICAgICAgICAgICAgPSAweDA5OyAvKiBUYWIgKi9cbnZhciBDSEFSX0xJTkVfRkVFRCAgICAgICAgICAgID0gMHgwQTsgLyogTEYgKi9cbnZhciBDSEFSX0NBUlJJQUdFX1JFVFVSTiAgICAgID0gMHgwRDsgLyogQ1IgKi9cbnZhciBDSEFSX1NQQUNFICAgICAgICAgICAgICAgID0gMHgyMDsgLyogU3BhY2UgKi9cbnZhciBDSEFSX0VYQ0xBTUFUSU9OICAgICAgICAgID0gMHgyMTsgLyogISAqL1xudmFyIENIQVJfRE9VQkxFX1FVT1RFICAgICAgICAgPSAweDIyOyAvKiBcIiAqL1xudmFyIENIQVJfU0hBUlAgICAgICAgICAgICAgICAgPSAweDIzOyAvKiAjICovXG52YXIgQ0hBUl9QRVJDRU5UICAgICAgICAgICAgICA9IDB4MjU7IC8qICUgKi9cbnZhciBDSEFSX0FNUEVSU0FORCAgICAgICAgICAgID0gMHgyNjsgLyogJiAqL1xudmFyIENIQVJfU0lOR0xFX1FVT1RFICAgICAgICAgPSAweDI3OyAvKiAnICovXG52YXIgQ0hBUl9BU1RFUklTSyAgICAgICAgICAgICA9IDB4MkE7IC8qICogKi9cbnZhciBDSEFSX0NPTU1BICAgICAgICAgICAgICAgID0gMHgyQzsgLyogLCAqL1xudmFyIENIQVJfTUlOVVMgICAgICAgICAgICAgICAgPSAweDJEOyAvKiAtICovXG52YXIgQ0hBUl9DT0xPTiAgICAgICAgICAgICAgICA9IDB4M0E7IC8qIDogKi9cbnZhciBDSEFSX0VRVUFMUyAgICAgICAgICAgICAgID0gMHgzRDsgLyogPSAqL1xudmFyIENIQVJfR1JFQVRFUl9USEFOICAgICAgICAgPSAweDNFOyAvKiA+ICovXG52YXIgQ0hBUl9RVUVTVElPTiAgICAgICAgICAgICA9IDB4M0Y7IC8qID8gKi9cbnZhciBDSEFSX0NPTU1FUkNJQUxfQVQgICAgICAgID0gMHg0MDsgLyogQCAqL1xudmFyIENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCAgPSAweDVCOyAvKiBbICovXG52YXIgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCA9IDB4NUQ7IC8qIF0gKi9cbnZhciBDSEFSX0dSQVZFX0FDQ0VOVCAgICAgICAgID0gMHg2MDsgLyogYCAqL1xudmFyIENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUICAgPSAweDdCOyAvKiB7ICovXG52YXIgQ0hBUl9WRVJUSUNBTF9MSU5FICAgICAgICA9IDB4N0M7IC8qIHwgKi9cbnZhciBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVQgID0gMHg3RDsgLyogfSAqL1xuXG52YXIgRVNDQVBFX1NFUVVFTkNFUyA9IHt9O1xuXG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDBdICAgPSAnXFxcXDAnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA3XSAgID0gJ1xcXFxhJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwOF0gICA9ICdcXFxcYic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDldICAgPSAnXFxcXHQnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBBXSAgID0gJ1xcXFxuJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQl0gICA9ICdcXFxcdic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MENdICAgPSAnXFxcXGYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBEXSAgID0gJ1xcXFxyJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgxQl0gICA9ICdcXFxcZSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjJdICAgPSAnXFxcXFwiJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHg1Q10gICA9ICdcXFxcXFxcXCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4ODVdICAgPSAnXFxcXE4nO1xuRVNDQVBFX1NFUVVFTkNFU1sweEEwXSAgID0gJ1xcXFxfJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMDI4XSA9ICdcXFxcTCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOV0gPSAnXFxcXFAnO1xuXG52YXIgREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVggPSBbXG4gICd5JywgJ1knLCAneWVzJywgJ1llcycsICdZRVMnLCAnb24nLCAnT24nLCAnT04nLFxuICAnbicsICdOJywgJ25vJywgJ05vJywgJ05PJywgJ29mZicsICdPZmYnLCAnT0ZGJ1xuXTtcblxudmFyIERFUFJFQ0FURURfQkFTRTYwX1NZTlRBWCA9IC9eWy0rXT9bMC05X10rKD86OlswLTlfXSspKyg/OlxcLlswLTlfXSopPyQvO1xuXG5mdW5jdGlvbiBjb21waWxlU3R5bGVNYXAoc2NoZW1hLCBtYXApIHtcbiAgdmFyIHJlc3VsdCwga2V5cywgaW5kZXgsIGxlbmd0aCwgdGFnLCBzdHlsZSwgdHlwZTtcblxuICBpZiAobWFwID09PSBudWxsKSByZXR1cm4ge307XG5cbiAgcmVzdWx0ID0ge307XG4gIGtleXMgPSBPYmplY3Qua2V5cyhtYXApO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0YWcgPSBrZXlzW2luZGV4XTtcbiAgICBzdHlsZSA9IFN0cmluZyhtYXBbdGFnXSk7XG5cbiAgICBpZiAodGFnLnNsaWNlKDAsIDIpID09PSAnISEnKSB7XG4gICAgICB0YWcgPSAndGFnOnlhbWwub3JnLDIwMDI6JyArIHRhZy5zbGljZSgyKTtcbiAgICB9XG4gICAgdHlwZSA9IHNjaGVtYS5jb21waWxlZFR5cGVNYXBbJ2ZhbGxiYWNrJ11bdGFnXTtcblxuICAgIGlmICh0eXBlICYmIF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUuc3R5bGVBbGlhc2VzLCBzdHlsZSkpIHtcbiAgICAgIHN0eWxlID0gdHlwZS5zdHlsZUFsaWFzZXNbc3R5bGVdO1xuICAgIH1cblxuICAgIHJlc3VsdFt0YWddID0gc3R5bGU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBlbmNvZGVIZXgoY2hhcmFjdGVyKSB7XG4gIHZhciBzdHJpbmcsIGhhbmRsZSwgbGVuZ3RoO1xuXG4gIHN0cmluZyA9IGNoYXJhY3Rlci50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblxuICBpZiAoY2hhcmFjdGVyIDw9IDB4RkYpIHtcbiAgICBoYW5kbGUgPSAneCc7XG4gICAgbGVuZ3RoID0gMjtcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPD0gMHhGRkZGKSB7XG4gICAgaGFuZGxlID0gJ3UnO1xuICAgIGxlbmd0aCA9IDQ7XG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyIDw9IDB4RkZGRkZGRkYpIHtcbiAgICBoYW5kbGUgPSAnVSc7XG4gICAgbGVuZ3RoID0gODtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdjb2RlIHBvaW50IHdpdGhpbiBhIHN0cmluZyBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiAweEZGRkZGRkZGJyk7XG4gIH1cblxuICByZXR1cm4gJ1xcXFwnICsgaGFuZGxlICsgY29tbW9uLnJlcGVhdCgnMCcsIGxlbmd0aCAtIHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufVxuXG5cbnZhciBRVU9USU5HX1RZUEVfU0lOR0xFID0gMSxcbiAgICBRVU9USU5HX1RZUEVfRE9VQkxFID0gMjtcblxuZnVuY3Rpb24gU3RhdGUob3B0aW9ucykge1xuICB0aGlzLnNjaGVtYSAgICAgICAgPSBvcHRpb25zWydzY2hlbWEnXSB8fCBfZGVmYXVsdDtcbiAgdGhpcy5pbmRlbnQgICAgICAgID0gTWF0aC5tYXgoMSwgKG9wdGlvbnNbJ2luZGVudCddIHx8IDIpKTtcbiAgdGhpcy5ub0FycmF5SW5kZW50ID0gb3B0aW9uc1snbm9BcnJheUluZGVudCddIHx8IGZhbHNlO1xuICB0aGlzLnNraXBJbnZhbGlkICAgPSBvcHRpb25zWydza2lwSW52YWxpZCddIHx8IGZhbHNlO1xuICB0aGlzLmZsb3dMZXZlbCAgICAgPSAoY29tbW9uLmlzTm90aGluZyhvcHRpb25zWydmbG93TGV2ZWwnXSkgPyAtMSA6IG9wdGlvbnNbJ2Zsb3dMZXZlbCddKTtcbiAgdGhpcy5zdHlsZU1hcCAgICAgID0gY29tcGlsZVN0eWxlTWFwKHRoaXMuc2NoZW1hLCBvcHRpb25zWydzdHlsZXMnXSB8fCBudWxsKTtcbiAgdGhpcy5zb3J0S2V5cyAgICAgID0gb3B0aW9uc1snc29ydEtleXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5saW5lV2lkdGggICAgID0gb3B0aW9uc1snbGluZVdpZHRoJ10gfHwgODA7XG4gIHRoaXMubm9SZWZzICAgICAgICA9IG9wdGlvbnNbJ25vUmVmcyddIHx8IGZhbHNlO1xuICB0aGlzLm5vQ29tcGF0TW9kZSAgPSBvcHRpb25zWydub0NvbXBhdE1vZGUnXSB8fCBmYWxzZTtcbiAgdGhpcy5jb25kZW5zZUZsb3cgID0gb3B0aW9uc1snY29uZGVuc2VGbG93J10gfHwgZmFsc2U7XG4gIHRoaXMucXVvdGluZ1R5cGUgICA9IG9wdGlvbnNbJ3F1b3RpbmdUeXBlJ10gPT09ICdcIicgPyBRVU9USU5HX1RZUEVfRE9VQkxFIDogUVVPVElOR19UWVBFX1NJTkdMRTtcbiAgdGhpcy5mb3JjZVF1b3RlcyAgID0gb3B0aW9uc1snZm9yY2VRdW90ZXMnXSB8fCBmYWxzZTtcbiAgdGhpcy5yZXBsYWNlciAgICAgID0gdHlwZW9mIG9wdGlvbnNbJ3JlcGxhY2VyJ10gPT09ICdmdW5jdGlvbicgPyBvcHRpb25zWydyZXBsYWNlciddIDogbnVsbDtcblxuICB0aGlzLmltcGxpY2l0VHlwZXMgPSB0aGlzLnNjaGVtYS5jb21waWxlZEltcGxpY2l0O1xuICB0aGlzLmV4cGxpY2l0VHlwZXMgPSB0aGlzLnNjaGVtYS5jb21waWxlZEV4cGxpY2l0O1xuXG4gIHRoaXMudGFnID0gbnVsbDtcbiAgdGhpcy5yZXN1bHQgPSAnJztcblxuICB0aGlzLmR1cGxpY2F0ZXMgPSBbXTtcbiAgdGhpcy51c2VkRHVwbGljYXRlcyA9IG51bGw7XG59XG5cbi8vIEluZGVudHMgZXZlcnkgbGluZSBpbiBhIHN0cmluZy4gRW1wdHkgbGluZXMgKFxcbiBvbmx5KSBhcmUgbm90IGluZGVudGVkLlxuZnVuY3Rpb24gaW5kZW50U3RyaW5nKHN0cmluZywgc3BhY2VzKSB7XG4gIHZhciBpbmQgPSBjb21tb24ucmVwZWF0KCcgJywgc3BhY2VzKSxcbiAgICAgIHBvc2l0aW9uID0gMCxcbiAgICAgIG5leHQgPSAtMSxcbiAgICAgIHJlc3VsdCA9ICcnLFxuICAgICAgbGluZSxcbiAgICAgIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cbiAgd2hpbGUgKHBvc2l0aW9uIDwgbGVuZ3RoKSB7XG4gICAgbmV4dCA9IHN0cmluZy5pbmRleE9mKCdcXG4nLCBwb3NpdGlvbik7XG4gICAgaWYgKG5leHQgPT09IC0xKSB7XG4gICAgICBsaW5lID0gc3RyaW5nLnNsaWNlKHBvc2l0aW9uKTtcbiAgICAgIHBvc2l0aW9uID0gbGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lID0gc3RyaW5nLnNsaWNlKHBvc2l0aW9uLCBuZXh0ICsgMSk7XG4gICAgICBwb3NpdGlvbiA9IG5leHQgKyAxO1xuICAgIH1cblxuICAgIGlmIChsaW5lLmxlbmd0aCAmJiBsaW5lICE9PSAnXFxuJykgcmVzdWx0ICs9IGluZDtcblxuICAgIHJlc3VsdCArPSBsaW5lO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpIHtcbiAgcmV0dXJuICdcXG4nICsgY29tbW9uLnJlcGVhdCgnICcsIHN0YXRlLmluZGVudCAqIGxldmVsKTtcbn1cblxuZnVuY3Rpb24gdGVzdEltcGxpY2l0UmVzb2x2aW5nKHN0YXRlLCBzdHIpIHtcbiAgdmFyIGluZGV4LCBsZW5ndGgsIHR5cGU7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHN0YXRlLmltcGxpY2l0VHlwZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHR5cGUgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzW2luZGV4XTtcblxuICAgIGlmICh0eXBlLnJlc29sdmUoc3RyKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBbMzNdIHMtd2hpdGUgOjo9IHMtc3BhY2UgfCBzLXRhYlxuZnVuY3Rpb24gaXNXaGl0ZXNwYWNlKGMpIHtcbiAgcmV0dXJuIGMgPT09IENIQVJfU1BBQ0UgfHwgYyA9PT0gQ0hBUl9UQUI7XG59XG5cbi8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgY2hhcmFjdGVyIGNhbiBiZSBwcmludGVkIHdpdGhvdXQgZXNjYXBpbmcuXG4vLyBGcm9tIFlBTUwgMS4yOiBcImFueSBhbGxvd2VkIGNoYXJhY3RlcnMga25vd24gdG8gYmUgbm9uLXByaW50YWJsZVxuLy8gc2hvdWxkIGFsc28gYmUgZXNjYXBlZC4gW0hvd2V2ZXIsXSBUaGlzIGlzblx1MjAxOXQgbWFuZGF0b3J5XCJcbi8vIERlcml2ZWQgZnJvbSBuYi1jaGFyIC0gXFx0IC0gI3g4NSAtICN4QTAgLSAjeDIwMjggLSAjeDIwMjkuXG5mdW5jdGlvbiBpc1ByaW50YWJsZShjKSB7XG4gIHJldHVybiAgKDB4MDAwMjAgPD0gYyAmJiBjIDw9IDB4MDAwMDdFKVxuICAgICAgfHwgKCgweDAwMEExIDw9IGMgJiYgYyA8PSAweDAwRDdGRikgJiYgYyAhPT0gMHgyMDI4ICYmIGMgIT09IDB4MjAyOSlcbiAgICAgIHx8ICgoMHgwRTAwMCA8PSBjICYmIGMgPD0gMHgwMEZGRkQpICYmIGMgIT09IENIQVJfQk9NKVxuICAgICAgfHwgICgweDEwMDAwIDw9IGMgJiYgYyA8PSAweDEwRkZGRik7XG59XG5cbi8vIFszNF0gbnMtY2hhciA6Oj0gbmItY2hhciAtIHMtd2hpdGVcbi8vIFsyN10gbmItY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWNoYXIgLSBjLWJ5dGUtb3JkZXItbWFya1xuLy8gWzI2XSBiLWNoYXIgIDo6PSBiLWxpbmUtZmVlZCB8IGItY2FycmlhZ2UtcmV0dXJuXG4vLyBJbmNsdWRpbmcgcy13aGl0ZSAoZm9yIHNvbWUgcmVhc29uLCBleGFtcGxlcyBkb2Vzbid0IG1hdGNoIHNwZWNzIGluIHRoaXMgYXNwZWN0KVxuLy8gbnMtY2hhciA6Oj0gYy1wcmludGFibGUgLSBiLWxpbmUtZmVlZCAtIGItY2FycmlhZ2UtcmV0dXJuIC0gYy1ieXRlLW9yZGVyLW1hcmtcbmZ1bmN0aW9uIGlzTnNDaGFyT3JXaGl0ZXNwYWNlKGMpIHtcbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpXG4gICAgJiYgYyAhPT0gQ0hBUl9CT01cbiAgICAvLyAtIGItY2hhclxuICAgICYmIGMgIT09IENIQVJfQ0FSUklBR0VfUkVUVVJOXG4gICAgJiYgYyAhPT0gQ0hBUl9MSU5FX0ZFRUQ7XG59XG5cbi8vIFsxMjddICBucy1wbGFpbi1zYWZlKGMpIDo6PSBjID0gZmxvdy1vdXQgIFx1MjFEMiBucy1wbGFpbi1zYWZlLW91dFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBmbG93LWluICAgXHUyMUQyIG5zLXBsYWluLXNhZmUtaW5cbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gYmxvY2sta2V5IFx1MjFEMiBucy1wbGFpbi1zYWZlLW91dFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBmbG93LWtleSAgXHUyMUQyIG5zLXBsYWluLXNhZmUtaW5cbi8vIFsxMjhdIG5zLXBsYWluLXNhZmUtb3V0IDo6PSBucy1jaGFyXG4vLyBbMTI5XSAgbnMtcGxhaW4tc2FmZS1pbiA6Oj0gbnMtY2hhciAtIGMtZmxvdy1pbmRpY2F0b3Jcbi8vIFsxMzBdICBucy1wbGFpbi1jaGFyKGMpIDo6PSAgKCBucy1wbGFpbi1zYWZlKGMpIC0gXHUyMDFDOlx1MjAxRCAtIFx1MjAxQyNcdTIwMUQgKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoIC8qIEFuIG5zLWNoYXIgcHJlY2VkaW5nICovIFx1MjAxQyNcdTIwMUQgKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoIFx1MjAxQzpcdTIwMUQgLyogRm9sbG93ZWQgYnkgYW4gbnMtcGxhaW4tc2FmZShjKSAqLyApXG5mdW5jdGlvbiBpc1BsYWluU2FmZShjLCBwcmV2LCBpbmJsb2NrKSB7XG4gIHZhciBjSXNOc0NoYXJPcldoaXRlc3BhY2UgPSBpc05zQ2hhck9yV2hpdGVzcGFjZShjKTtcbiAgdmFyIGNJc05zQ2hhciA9IGNJc05zQ2hhck9yV2hpdGVzcGFjZSAmJiAhaXNXaGl0ZXNwYWNlKGMpO1xuICByZXR1cm4gKFxuICAgIC8vIG5zLXBsYWluLXNhZmVcbiAgICBpbmJsb2NrID8gLy8gYyA9IGZsb3ctaW5cbiAgICAgIGNJc05zQ2hhck9yV2hpdGVzcGFjZVxuICAgICAgOiBjSXNOc0NoYXJPcldoaXRlc3BhY2VcbiAgICAgICAgLy8gLSBjLWZsb3ctaW5kaWNhdG9yXG4gICAgICAgICYmIGMgIT09IENIQVJfQ09NTUFcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUXG4gICAgICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVRcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUXG4gIClcbiAgICAvLyBucy1wbGFpbi1jaGFyXG4gICAgJiYgYyAhPT0gQ0hBUl9TSEFSUCAvLyBmYWxzZSBvbiAnIydcbiAgICAmJiAhKHByZXYgPT09IENIQVJfQ09MT04gJiYgIWNJc05zQ2hhcikgLy8gZmFsc2Ugb24gJzogJ1xuICAgIHx8IChpc05zQ2hhck9yV2hpdGVzcGFjZShwcmV2KSAmJiAhaXNXaGl0ZXNwYWNlKHByZXYpICYmIGMgPT09IENIQVJfU0hBUlApIC8vIGNoYW5nZSB0byB0cnVlIG9uICdbXiBdIydcbiAgICB8fCAocHJldiA9PT0gQ0hBUl9DT0xPTiAmJiBjSXNOc0NoYXIpOyAvLyBjaGFuZ2UgdG8gdHJ1ZSBvbiAnOlteIF0nXG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYXMgdGhlIGZpcnN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlRmlyc3QoYykge1xuICAvLyBVc2VzIGEgc3Vic2V0IG9mIG5zLWNoYXIgLSBjLWluZGljYXRvclxuICAvLyB3aGVyZSBucy1jaGFyID0gbmItY2hhciAtIHMtd2hpdGUuXG4gIC8vIE5vIHN1cHBvcnQgb2YgKCAoIFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDLVx1MjAxRCApIC8qIEZvbGxvd2VkIGJ5IGFuIG5zLXBsYWluLXNhZmUoYykpICovICkgcGFydFxuICByZXR1cm4gaXNQcmludGFibGUoYykgJiYgYyAhPT0gQ0hBUl9CT01cbiAgICAmJiAhaXNXaGl0ZXNwYWNlKGMpIC8vIC0gcy13aGl0ZVxuICAgIC8vIC0gKGMtaW5kaWNhdG9yIDo6PVxuICAgIC8vIFx1MjAxQy1cdTIwMUQgfCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQyxcdTIwMUQgfCBcdTIwMUNbXHUyMDFEIHwgXHUyMDFDXVx1MjAxRCB8IFx1MjAxQ3tcdTIwMUQgfCBcdTIwMUN9XHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9NSU5VU1xuICAgICYmIGMgIT09IENIQVJfUVVFU1RJT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTE9OXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICAgIC8vIHwgXHUyMDFDI1x1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ3xcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDPlx1MjAxRCB8IFx1MjAxQydcdTIwMUQgfCBcdTIwMUNcIlx1MjAxRFxuICAgICYmIGMgIT09IENIQVJfU0hBUlBcbiAgICAmJiBjICE9PSBDSEFSX0FNUEVSU0FORFxuICAgICYmIGMgIT09IENIQVJfQVNURVJJU0tcbiAgICAmJiBjICE9PSBDSEFSX0VYQ0xBTUFUSU9OXG4gICAgJiYgYyAhPT0gQ0hBUl9WRVJUSUNBTF9MSU5FXG4gICAgJiYgYyAhPT0gQ0hBUl9FUVVBTFNcbiAgICAmJiBjICE9PSBDSEFSX0dSRUFURVJfVEhBTlxuICAgICYmIGMgIT09IENIQVJfU0lOR0xFX1FVT1RFXG4gICAgJiYgYyAhPT0gQ0hBUl9ET1VCTEVfUVVPVEVcbiAgICAvLyB8IFx1MjAxQyVcdTIwMUQgfCBcdTIwMUNAXHUyMDFEIHwgXHUyMDFDYFx1MjAxRClcbiAgICAmJiBjICE9PSBDSEFSX1BFUkNFTlRcbiAgICAmJiBjICE9PSBDSEFSX0NPTU1FUkNJQUxfQVRcbiAgICAmJiBjICE9PSBDSEFSX0dSQVZFX0FDQ0VOVDtcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhcyB0aGUgbGFzdCBjaGFyYWN0ZXIgaW4gcGxhaW4gc3R5bGUuXG5mdW5jdGlvbiBpc1BsYWluU2FmZUxhc3QoYykge1xuICAvLyBqdXN0IG5vdCB3aGl0ZXNwYWNlIG9yIGNvbG9uLCBpdCB3aWxsIGJlIGNoZWNrZWQgdG8gYmUgcGxhaW4gY2hhcmFjdGVyIGxhdGVyXG4gIHJldHVybiAhaXNXaGl0ZXNwYWNlKGMpICYmIGMgIT09IENIQVJfQ09MT047XG59XG5cbi8vIFNhbWUgYXMgJ3N0cmluZycuY29kZVBvaW50QXQocG9zKSwgYnV0IHdvcmtzIGluIG9sZGVyIGJyb3dzZXJzLlxuZnVuY3Rpb24gY29kZVBvaW50QXQoc3RyaW5nLCBwb3MpIHtcbiAgdmFyIGZpcnN0ID0gc3RyaW5nLmNoYXJDb2RlQXQocG9zKSwgc2Vjb25kO1xuICBpZiAoZmlyc3QgPj0gMHhEODAwICYmIGZpcnN0IDw9IDB4REJGRiAmJiBwb3MgKyAxIDwgc3RyaW5nLmxlbmd0aCkge1xuICAgIHNlY29uZCA9IHN0cmluZy5jaGFyQ29kZUF0KHBvcyArIDEpO1xuICAgIGlmIChzZWNvbmQgPj0gMHhEQzAwICYmIHNlY29uZCA8PSAweERGRkYpIHtcbiAgICAgIC8vIGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nI3N1cnJvZ2F0ZS1mb3JtdWxhZVxuICAgICAgcmV0dXJuIChmaXJzdCAtIDB4RDgwMCkgKiAweDQwMCArIHNlY29uZCAtIDB4REMwMCArIDB4MTAwMDA7XG4gICAgfVxuICB9XG4gIHJldHVybiBmaXJzdDtcbn1cblxuLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBpcyByZXF1aXJlZC5cbmZ1bmN0aW9uIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSB7XG4gIHZhciBsZWFkaW5nU3BhY2VSZSA9IC9eXFxuKiAvO1xuICByZXR1cm4gbGVhZGluZ1NwYWNlUmUudGVzdChzdHJpbmcpO1xufVxuXG52YXIgU1RZTEVfUExBSU4gICA9IDEsXG4gICAgU1RZTEVfU0lOR0xFICA9IDIsXG4gICAgU1RZTEVfTElURVJBTCA9IDMsXG4gICAgU1RZTEVfRk9MREVEICA9IDQsXG4gICAgU1RZTEVfRE9VQkxFICA9IDU7XG5cbi8vIERldGVybWluZXMgd2hpY2ggc2NhbGFyIHN0eWxlcyBhcmUgcG9zc2libGUgYW5kIHJldHVybnMgdGhlIHByZWZlcnJlZCBzdHlsZS5cbi8vIGxpbmVXaWR0aCA9IC0xID0+IG5vIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0ci5sZW5ndGggPiAwLlxuLy8gUG9zdC1jb25kaXRpb25zOlxuLy8gICAgU1RZTEVfUExBSU4gb3IgU1RZTEVfU0lOR0xFID0+IG5vIFxcbiBhcmUgaW4gdGhlIHN0cmluZy5cbi8vICAgIFNUWUxFX0xJVEVSQUwgPT4gbm8gbGluZXMgYXJlIHN1aXRhYmxlIGZvciBmb2xkaW5nIChvciBsaW5lV2lkdGggaXMgLTEpLlxuLy8gICAgU1RZTEVfRk9MREVEID0+IGEgbGluZSA+IGxpbmVXaWR0aCBhbmQgY2FuIGJlIGZvbGRlZCAoYW5kIGxpbmVXaWR0aCAhPSAtMSkuXG5mdW5jdGlvbiBjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBpbmRlbnRQZXJMZXZlbCwgbGluZVdpZHRoLFxuICB0ZXN0QW1iaWd1b3VzVHlwZSwgcXVvdGluZ1R5cGUsIGZvcmNlUXVvdGVzLCBpbmJsb2NrKSB7XG5cbiAgdmFyIGk7XG4gIHZhciBjaGFyID0gMDtcbiAgdmFyIHByZXZDaGFyID0gbnVsbDtcbiAgdmFyIGhhc0xpbmVCcmVhayA9IGZhbHNlO1xuICB2YXIgaGFzRm9sZGFibGVMaW5lID0gZmFsc2U7IC8vIG9ubHkgY2hlY2tlZCBpZiBzaG91bGRUcmFja1dpZHRoXG4gIHZhciBzaG91bGRUcmFja1dpZHRoID0gbGluZVdpZHRoICE9PSAtMTtcbiAgdmFyIHByZXZpb3VzTGluZUJyZWFrID0gLTE7IC8vIGNvdW50IHRoZSBmaXJzdCBsaW5lIGNvcnJlY3RseVxuICB2YXIgcGxhaW4gPSBpc1BsYWluU2FmZUZpcnN0KGNvZGVQb2ludEF0KHN0cmluZywgMCkpXG4gICAgICAgICAgJiYgaXNQbGFpblNhZmVMYXN0KGNvZGVQb2ludEF0KHN0cmluZywgc3RyaW5nLmxlbmd0aCAtIDEpKTtcblxuICBpZiAoc2luZ2xlTGluZU9ubHkgfHwgZm9yY2VRdW90ZXMpIHtcbiAgICAvLyBDYXNlOiBubyBibG9jayBzdHlsZXMuXG4gICAgLy8gQ2hlY2sgZm9yIGRpc2FsbG93ZWQgY2hhcmFjdGVycyB0byBydWxlIG91dCBwbGFpbiBhbmQgc2luZ2xlLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBjaGFyID49IDB4MTAwMDAgPyBpICs9IDIgOiBpKyspIHtcbiAgICAgIGNoYXIgPSBjb2RlUG9pbnRBdChzdHJpbmcsIGkpO1xuICAgICAgaWYgKCFpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICAgICAgfVxuICAgICAgcGxhaW4gPSBwbGFpbiAmJiBpc1BsYWluU2FmZShjaGFyLCBwcmV2Q2hhciwgaW5ibG9jayk7XG4gICAgICBwcmV2Q2hhciA9IGNoYXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIENhc2U6IGJsb2NrIHN0eWxlcyBwZXJtaXR0ZWQuXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGNoYXIgPj0gMHgxMDAwMCA/IGkgKz0gMiA6IGkrKykge1xuICAgICAgY2hhciA9IGNvZGVQb2ludEF0KHN0cmluZywgaSk7XG4gICAgICBpZiAoY2hhciA9PT0gQ0hBUl9MSU5FX0ZFRUQpIHtcbiAgICAgICAgaGFzTGluZUJyZWFrID0gdHJ1ZTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGxpbmUgY2FuIGJlIGZvbGRlZC5cbiAgICAgICAgaWYgKHNob3VsZFRyYWNrV2lkdGgpIHtcbiAgICAgICAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHxcbiAgICAgICAgICAgIC8vIEZvbGRhYmxlIGxpbmUgPSB0b28gbG9uZywgYW5kIG5vdCBtb3JlLWluZGVudGVkLlxuICAgICAgICAgICAgKGkgLSBwcmV2aW91c0xpbmVCcmVhayAtIDEgPiBsaW5lV2lkdGggJiZcbiAgICAgICAgICAgICBzdHJpbmdbcHJldmlvdXNMaW5lQnJlYWsgKyAxXSAhPT0gJyAnKTtcbiAgICAgICAgICBwcmV2aW91c0xpbmVCcmVhayA9IGk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gICAgICB9XG4gICAgICBwbGFpbiA9IHBsYWluICYmIGlzUGxhaW5TYWZlKGNoYXIsIHByZXZDaGFyLCBpbmJsb2NrKTtcbiAgICAgIHByZXZDaGFyID0gY2hhcjtcbiAgICB9XG4gICAgLy8gaW4gY2FzZSB0aGUgZW5kIGlzIG1pc3NpbmcgYSBcXG5cbiAgICBoYXNGb2xkYWJsZUxpbmUgPSBoYXNGb2xkYWJsZUxpbmUgfHwgKHNob3VsZFRyYWNrV2lkdGggJiZcbiAgICAgIChpIC0gcHJldmlvdXNMaW5lQnJlYWsgLSAxID4gbGluZVdpZHRoICYmXG4gICAgICAgc3RyaW5nW3ByZXZpb3VzTGluZUJyZWFrICsgMV0gIT09ICcgJykpO1xuICB9XG4gIC8vIEFsdGhvdWdoIGV2ZXJ5IHN0eWxlIGNhbiByZXByZXNlbnQgXFxuIHdpdGhvdXQgZXNjYXBpbmcsIHByZWZlciBibG9jayBzdHlsZXNcbiAgLy8gZm9yIG11bHRpbGluZSwgc2luY2UgdGhleSdyZSBtb3JlIHJlYWRhYmxlIGFuZCB0aGV5IGRvbid0IGFkZCBlbXB0eSBsaW5lcy5cbiAgLy8gQWxzbyBwcmVmZXIgZm9sZGluZyBhIHN1cGVyLWxvbmcgbGluZS5cbiAgaWYgKCFoYXNMaW5lQnJlYWsgJiYgIWhhc0ZvbGRhYmxlTGluZSkge1xuICAgIC8vIFN0cmluZ3MgaW50ZXJwcmV0YWJsZSBhcyBhbm90aGVyIHR5cGUgaGF2ZSB0byBiZSBxdW90ZWQ7XG4gICAgLy8gZS5nLiB0aGUgc3RyaW5nICd0cnVlJyB2cy4gdGhlIGJvb2xlYW4gdHJ1ZS5cbiAgICBpZiAocGxhaW4gJiYgIWZvcmNlUXVvdGVzICYmICF0ZXN0QW1iaWd1b3VzVHlwZShzdHJpbmcpKSB7XG4gICAgICByZXR1cm4gU1RZTEVfUExBSU47XG4gICAgfVxuICAgIHJldHVybiBxdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/IFNUWUxFX0RPVUJMRSA6IFNUWUxFX1NJTkdMRTtcbiAgfVxuICAvLyBFZGdlIGNhc2U6IGJsb2NrIGluZGVudGF0aW9uIGluZGljYXRvciBjYW4gb25seSBoYXZlIG9uZSBkaWdpdC5cbiAgaWYgKGluZGVudFBlckxldmVsID4gOSAmJiBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykpIHtcbiAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICB9XG4gIC8vIEF0IHRoaXMgcG9pbnQgd2Uga25vdyBibG9jayBzdHlsZXMgYXJlIHZhbGlkLlxuICAvLyBQcmVmZXIgbGl0ZXJhbCBzdHlsZSB1bmxlc3Mgd2Ugd2FudCB0byBmb2xkLlxuICBpZiAoIWZvcmNlUXVvdGVzKSB7XG4gICAgcmV0dXJuIGhhc0ZvbGRhYmxlTGluZSA/IFNUWUxFX0ZPTERFRCA6IFNUWUxFX0xJVEVSQUw7XG4gIH1cbiAgcmV0dXJuIHF1b3RpbmdUeXBlID09PSBRVU9USU5HX1RZUEVfRE9VQkxFID8gU1RZTEVfRE9VQkxFIDogU1RZTEVfU0lOR0xFO1xufVxuXG4vLyBOb3RlOiBsaW5lIGJyZWFraW5nL2ZvbGRpbmcgaXMgaW1wbGVtZW50ZWQgZm9yIG9ubHkgdGhlIGZvbGRlZCBzdHlsZS5cbi8vIE5CLiBXZSBkcm9wIHRoZSBsYXN0IHRyYWlsaW5nIG5ld2xpbmUgKGlmIGFueSkgb2YgYSByZXR1cm5lZCBibG9jayBzY2FsYXJcbi8vICBzaW5jZSB0aGUgZHVtcGVyIGFkZHMgaXRzIG93biBuZXdsaW5lLiBUaGlzIGFsd2F5cyB3b3Jrczpcbi8vICAgIFx1MjAyMiBObyBlbmRpbmcgbmV3bGluZSA9PiB1bmFmZmVjdGVkOyBhbHJlYWR5IHVzaW5nIHN0cmlwIFwiLVwiIGNob21waW5nLlxuLy8gICAgXHUyMDIyIEVuZGluZyBuZXdsaW5lICAgID0+IHJlbW92ZWQgdGhlbiByZXN0b3JlZC5cbi8vICBJbXBvcnRhbnRseSwgdGhpcyBrZWVwcyB0aGUgXCIrXCIgY2hvbXAgaW5kaWNhdG9yIGZyb20gZ2FpbmluZyBhbiBleHRyYSBsaW5lLlxuZnVuY3Rpb24gd3JpdGVTY2FsYXIoc3RhdGUsIHN0cmluZywgbGV2ZWwsIGlza2V5LCBpbmJsb2NrKSB7XG4gIHN0YXRlLmR1bXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gc3RhdGUucXVvdGluZ1R5cGUgPT09IFFVT1RJTkdfVFlQRV9ET1VCTEUgPyAnXCJcIicgOiBcIicnXCI7XG4gICAgfVxuICAgIGlmICghc3RhdGUubm9Db21wYXRNb2RlKSB7XG4gICAgICBpZiAoREVQUkVDQVRFRF9CT09MRUFOU19TWU5UQVguaW5kZXhPZihzdHJpbmcpICE9PSAtMSB8fCBERVBSRUNBVEVEX0JBU0U2MF9TWU5UQVgudGVzdChzdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5xdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/ICgnXCInICsgc3RyaW5nICsgJ1wiJykgOiAoXCInXCIgKyBzdHJpbmcgKyBcIidcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGluZGVudCA9IHN0YXRlLmluZGVudCAqIE1hdGgubWF4KDEsIGxldmVsKTsgLy8gbm8gMC1pbmRlbnQgc2NhbGFyc1xuICAgIC8vIEFzIGluZGVudGF0aW9uIGdldHMgZGVlcGVyLCBsZXQgdGhlIHdpZHRoIGRlY3JlYXNlIG1vbm90b25pY2FsbHlcbiAgICAvLyB0byB0aGUgbG93ZXIgYm91bmQgbWluKHN0YXRlLmxpbmVXaWR0aCwgNDApLlxuICAgIC8vIE5vdGUgdGhhdCB0aGlzIGltcGxpZXNcbiAgICAvLyAgc3RhdGUubGluZVdpZHRoIFx1MjI2NCA0MCArIHN0YXRlLmluZGVudDogd2lkdGggaXMgZml4ZWQgYXQgdGhlIGxvd2VyIGJvdW5kLlxuICAgIC8vICBzdGF0ZS5saW5lV2lkdGggPiA0MCArIHN0YXRlLmluZGVudDogd2lkdGggZGVjcmVhc2VzIHVudGlsIHRoZSBsb3dlciBib3VuZC5cbiAgICAvLyBUaGlzIGJlaGF2ZXMgYmV0dGVyIHRoYW4gYSBjb25zdGFudCBtaW5pbXVtIHdpZHRoIHdoaWNoIGRpc2FsbG93cyBuYXJyb3dlciBvcHRpb25zLFxuICAgIC8vIG9yIGFuIGluZGVudCB0aHJlc2hvbGQgd2hpY2ggY2F1c2VzIHRoZSB3aWR0aCB0byBzdWRkZW5seSBpbmNyZWFzZS5cbiAgICB2YXIgbGluZVdpZHRoID0gc3RhdGUubGluZVdpZHRoID09PSAtMVxuICAgICAgPyAtMSA6IE1hdGgubWF4KE1hdGgubWluKHN0YXRlLmxpbmVXaWR0aCwgNDApLCBzdGF0ZS5saW5lV2lkdGggLSBpbmRlbnQpO1xuXG4gICAgLy8gV2l0aG91dCBrbm93aW5nIGlmIGtleXMgYXJlIGltcGxpY2l0L2V4cGxpY2l0LCBhc3N1bWUgaW1wbGljaXQgZm9yIHNhZmV0eS5cbiAgICB2YXIgc2luZ2xlTGluZU9ubHkgPSBpc2tleVxuICAgICAgLy8gTm8gYmxvY2sgc3R5bGVzIGluIGZsb3cgbW9kZS5cbiAgICAgIHx8IChzdGF0ZS5mbG93TGV2ZWwgPiAtMSAmJiBsZXZlbCA+PSBzdGF0ZS5mbG93TGV2ZWwpO1xuICAgIGZ1bmN0aW9uIHRlc3RBbWJpZ3VpdHkoc3RyaW5nKSB7XG4gICAgICByZXR1cm4gdGVzdEltcGxpY2l0UmVzb2x2aW5nKHN0YXRlLCBzdHJpbmcpO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY2hvb3NlU2NhbGFyU3R5bGUoc3RyaW5nLCBzaW5nbGVMaW5lT25seSwgc3RhdGUuaW5kZW50LCBsaW5lV2lkdGgsXG4gICAgICB0ZXN0QW1iaWd1aXR5LCBzdGF0ZS5xdW90aW5nVHlwZSwgc3RhdGUuZm9yY2VRdW90ZXMgJiYgIWlza2V5LCBpbmJsb2NrKSkge1xuXG4gICAgICBjYXNlIFNUWUxFX1BMQUlOOlxuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgY2FzZSBTVFlMRV9TSU5HTEU6XG4gICAgICAgIHJldHVybiBcIidcIiArIHN0cmluZy5yZXBsYWNlKC8nL2csIFwiJydcIikgKyBcIidcIjtcbiAgICAgIGNhc2UgU1RZTEVfTElURVJBTDpcbiAgICAgICAgcmV0dXJuICd8JyArIGJsb2NrSGVhZGVyKHN0cmluZywgc3RhdGUuaW5kZW50KVxuICAgICAgICAgICsgZHJvcEVuZGluZ05ld2xpbmUoaW5kZW50U3RyaW5nKHN0cmluZywgaW5kZW50KSk7XG4gICAgICBjYXNlIFNUWUxFX0ZPTERFRDpcbiAgICAgICAgcmV0dXJuICc+JyArIGJsb2NrSGVhZGVyKHN0cmluZywgc3RhdGUuaW5kZW50KVxuICAgICAgICAgICsgZHJvcEVuZGluZ05ld2xpbmUoaW5kZW50U3RyaW5nKGZvbGRTdHJpbmcoc3RyaW5nLCBsaW5lV2lkdGgpLCBpbmRlbnQpKTtcbiAgICAgIGNhc2UgU1RZTEVfRE9VQkxFOlxuICAgICAgICByZXR1cm4gJ1wiJyArIGVzY2FwZVN0cmluZyhzdHJpbmcpICsgJ1wiJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ2ltcG9zc2libGUgZXJyb3I6IGludmFsaWQgc2NhbGFyIHN0eWxlJyk7XG4gICAgfVxuICB9KCkpO1xufVxuXG4vLyBQcmUtY29uZGl0aW9uczogc3RyaW5nIGlzIHZhbGlkIGZvciBhIGJsb2NrIHNjYWxhciwgMSA8PSBpbmRlbnRQZXJMZXZlbCA8PSA5LlxuZnVuY3Rpb24gYmxvY2tIZWFkZXIoc3RyaW5nLCBpbmRlbnRQZXJMZXZlbCkge1xuICB2YXIgaW5kZW50SW5kaWNhdG9yID0gbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpID8gU3RyaW5nKGluZGVudFBlckxldmVsKSA6ICcnO1xuXG4gIC8vIG5vdGUgdGhlIHNwZWNpYWwgY2FzZTogdGhlIHN0cmluZyAnXFxuJyBjb3VudHMgYXMgYSBcInRyYWlsaW5nXCIgZW1wdHkgbGluZS5cbiAgdmFyIGNsaXAgPSAgICAgICAgICBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJztcbiAgdmFyIGtlZXAgPSBjbGlwICYmIChzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDJdID09PSAnXFxuJyB8fCBzdHJpbmcgPT09ICdcXG4nKTtcbiAgdmFyIGNob21wID0ga2VlcCA/ICcrJyA6IChjbGlwID8gJycgOiAnLScpO1xuXG4gIHJldHVybiBpbmRlbnRJbmRpY2F0b3IgKyBjaG9tcCArICdcXG4nO1xufVxuXG4vLyAoU2VlIHRoZSBub3RlIGZvciB3cml0ZVNjYWxhci4pXG5mdW5jdGlvbiBkcm9wRW5kaW5nTmV3bGluZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdcXG4nID8gc3RyaW5nLnNsaWNlKDAsIC0xKSA6IHN0cmluZztcbn1cblxuLy8gTm90ZTogYSBsb25nIGxpbmUgd2l0aG91dCBhIHN1aXRhYmxlIGJyZWFrIHBvaW50IHdpbGwgZXhjZWVkIHRoZSB3aWR0aCBsaW1pdC5cbi8vIFByZS1jb25kaXRpb25zOiBldmVyeSBjaGFyIGluIHN0ciBpc1ByaW50YWJsZSwgc3RyLmxlbmd0aCA+IDAsIHdpZHRoID4gMC5cbmZ1bmN0aW9uIGZvbGRTdHJpbmcoc3RyaW5nLCB3aWR0aCkge1xuICAvLyBJbiBmb2xkZWQgc3R5bGUsICRrJCBjb25zZWN1dGl2ZSBuZXdsaW5lcyBvdXRwdXQgYXMgJGsrMSQgbmV3bGluZXNcdTIwMTRcbiAgLy8gdW5sZXNzIHRoZXkncmUgYmVmb3JlIG9yIGFmdGVyIGEgbW9yZS1pbmRlbnRlZCBsaW5lLCBvciBhdCB0aGUgdmVyeVxuICAvLyBiZWdpbm5pbmcgb3IgZW5kLCBpbiB3aGljaCBjYXNlICRrJCBtYXBzIHRvICRrJC5cbiAgLy8gVGhlcmVmb3JlLCBwYXJzZSBlYWNoIGNodW5rIGFzIG5ld2xpbmUocykgZm9sbG93ZWQgYnkgYSBjb250ZW50IGxpbmUuXG4gIHZhciBsaW5lUmUgPSAvKFxcbispKFteXFxuXSopL2c7XG5cbiAgLy8gZmlyc3QgbGluZSAocG9zc2libHkgYW4gZW1wdHkgbGluZSlcbiAgdmFyIHJlc3VsdCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG5leHRMRiA9IHN0cmluZy5pbmRleE9mKCdcXG4nKTtcbiAgICBuZXh0TEYgPSBuZXh0TEYgIT09IC0xID8gbmV4dExGIDogc3RyaW5nLmxlbmd0aDtcbiAgICBsaW5lUmUubGFzdEluZGV4ID0gbmV4dExGO1xuICAgIHJldHVybiBmb2xkTGluZShzdHJpbmcuc2xpY2UoMCwgbmV4dExGKSwgd2lkdGgpO1xuICB9KCkpO1xuICAvLyBJZiB3ZSBoYXZlbid0IHJlYWNoZWQgdGhlIGZpcnN0IGNvbnRlbnQgbGluZSB5ZXQsIGRvbid0IGFkZCBhbiBleHRyYSBcXG4uXG4gIHZhciBwcmV2TW9yZUluZGVudGVkID0gc3RyaW5nWzBdID09PSAnXFxuJyB8fCBzdHJpbmdbMF0gPT09ICcgJztcbiAgdmFyIG1vcmVJbmRlbnRlZDtcblxuICAvLyByZXN0IG9mIHRoZSBsaW5lc1xuICB2YXIgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBsaW5lUmUuZXhlYyhzdHJpbmcpKSkge1xuICAgIHZhciBwcmVmaXggPSBtYXRjaFsxXSwgbGluZSA9IG1hdGNoWzJdO1xuICAgIG1vcmVJbmRlbnRlZCA9IChsaW5lWzBdID09PSAnICcpO1xuICAgIHJlc3VsdCArPSBwcmVmaXhcbiAgICAgICsgKCFwcmV2TW9yZUluZGVudGVkICYmICFtb3JlSW5kZW50ZWQgJiYgbGluZSAhPT0gJydcbiAgICAgICAgPyAnXFxuJyA6ICcnKVxuICAgICAgKyBmb2xkTGluZShsaW5lLCB3aWR0aCk7XG4gICAgcHJldk1vcmVJbmRlbnRlZCA9IG1vcmVJbmRlbnRlZDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIEdyZWVkeSBsaW5lIGJyZWFraW5nLlxuLy8gUGlja3MgdGhlIGxvbmdlc3QgbGluZSB1bmRlciB0aGUgbGltaXQgZWFjaCB0aW1lLFxuLy8gb3RoZXJ3aXNlIHNldHRsZXMgZm9yIHRoZSBzaG9ydGVzdCBsaW5lIG92ZXIgdGhlIGxpbWl0LlxuLy8gTkIuIE1vcmUtaW5kZW50ZWQgbGluZXMgKmNhbm5vdCogYmUgZm9sZGVkLCBhcyB0aGF0IHdvdWxkIGFkZCBhbiBleHRyYSBcXG4uXG5mdW5jdGlvbiBmb2xkTGluZShsaW5lLCB3aWR0aCkge1xuICBpZiAobGluZSA9PT0gJycgfHwgbGluZVswXSA9PT0gJyAnKSByZXR1cm4gbGluZTtcblxuICAvLyBTaW5jZSBhIG1vcmUtaW5kZW50ZWQgbGluZSBhZGRzIGEgXFxuLCBicmVha3MgY2FuJ3QgYmUgZm9sbG93ZWQgYnkgYSBzcGFjZS5cbiAgdmFyIGJyZWFrUmUgPSAvIFteIF0vZzsgLy8gbm90ZTogdGhlIG1hdGNoIGluZGV4IHdpbGwgYWx3YXlzIGJlIDw9IGxlbmd0aC0yLlxuICB2YXIgbWF0Y2g7XG4gIC8vIHN0YXJ0IGlzIGFuIGluY2x1c2l2ZSBpbmRleC4gZW5kLCBjdXJyLCBhbmQgbmV4dCBhcmUgZXhjbHVzaXZlLlxuICB2YXIgc3RhcnQgPSAwLCBlbmQsIGN1cnIgPSAwLCBuZXh0ID0gMDtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gIC8vIEludmFyaWFudHM6IDAgPD0gc3RhcnQgPD0gbGVuZ3RoLTEuXG4gIC8vICAgMCA8PSBjdXJyIDw9IG5leHQgPD0gbWF4KDAsIGxlbmd0aC0yKS4gY3VyciAtIHN0YXJ0IDw9IHdpZHRoLlxuICAvLyBJbnNpZGUgdGhlIGxvb3A6XG4gIC8vICAgQSBtYXRjaCBpbXBsaWVzIGxlbmd0aCA+PSAyLCBzbyBjdXJyIGFuZCBuZXh0IGFyZSA8PSBsZW5ndGgtMi5cbiAgd2hpbGUgKChtYXRjaCA9IGJyZWFrUmUuZXhlYyhsaW5lKSkpIHtcbiAgICBuZXh0ID0gbWF0Y2guaW5kZXg7XG4gICAgLy8gbWFpbnRhaW4gaW52YXJpYW50OiBjdXJyIC0gc3RhcnQgPD0gd2lkdGhcbiAgICBpZiAobmV4dCAtIHN0YXJ0ID4gd2lkdGgpIHtcbiAgICAgIGVuZCA9IChjdXJyID4gc3RhcnQpID8gY3VyciA6IG5leHQ7IC8vIGRlcml2ZSBlbmQgPD0gbGVuZ3RoLTJcbiAgICAgIHJlc3VsdCArPSAnXFxuJyArIGxpbmUuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAvLyBza2lwIHRoZSBzcGFjZSB0aGF0IHdhcyBvdXRwdXQgYXMgXFxuXG4gICAgICBzdGFydCA9IGVuZCArIDE7ICAgICAgICAgICAgICAgICAgICAvLyBkZXJpdmUgc3RhcnQgPD0gbGVuZ3RoLTFcbiAgICB9XG4gICAgY3VyciA9IG5leHQ7XG4gIH1cblxuICAvLyBCeSB0aGUgaW52YXJpYW50cywgc3RhcnQgPD0gbGVuZ3RoLTEsIHNvIHRoZXJlIGlzIHNvbWV0aGluZyBsZWZ0IG92ZXIuXG4gIC8vIEl0IGlzIGVpdGhlciB0aGUgd2hvbGUgc3RyaW5nIG9yIGEgcGFydCBzdGFydGluZyBmcm9tIG5vbi13aGl0ZXNwYWNlLlxuICByZXN1bHQgKz0gJ1xcbic7XG4gIC8vIEluc2VydCBhIGJyZWFrIGlmIHRoZSByZW1haW5kZXIgaXMgdG9vIGxvbmcgYW5kIHRoZXJlIGlzIGEgYnJlYWsgYXZhaWxhYmxlLlxuICBpZiAobGluZS5sZW5ndGggLSBzdGFydCA+IHdpZHRoICYmIGN1cnIgPiBzdGFydCkge1xuICAgIHJlc3VsdCArPSBsaW5lLnNsaWNlKHN0YXJ0LCBjdXJyKSArICdcXG4nICsgbGluZS5zbGljZShjdXJyICsgMSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ICs9IGxpbmUuc2xpY2Uoc3RhcnQpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdC5zbGljZSgxKTsgLy8gZHJvcCBleHRyYSBcXG4gam9pbmVyXG59XG5cbi8vIEVzY2FwZXMgYSBkb3VibGUtcXVvdGVkIHN0cmluZy5cbmZ1bmN0aW9uIGVzY2FwZVN0cmluZyhzdHJpbmcpIHtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICB2YXIgY2hhciA9IDA7XG4gIHZhciBlc2NhcGVTZXE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBjaGFyID49IDB4MTAwMDAgPyBpICs9IDIgOiBpKyspIHtcbiAgICBjaGFyID0gY29kZVBvaW50QXQoc3RyaW5nLCBpKTtcbiAgICBlc2NhcGVTZXEgPSBFU0NBUEVfU0VRVUVOQ0VTW2NoYXJdO1xuXG4gICAgaWYgKCFlc2NhcGVTZXEgJiYgaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgIHJlc3VsdCArPSBzdHJpbmdbaV07XG4gICAgICBpZiAoY2hhciA+PSAweDEwMDAwKSByZXN1bHQgKz0gc3RyaW5nW2kgKyAxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ICs9IGVzY2FwZVNlcSB8fCBlbmNvZGVIZXgoY2hhcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIHZhbHVlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHZhbHVlID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgICAgdmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKG9iamVjdCwgU3RyaW5nKGluZGV4KSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFdyaXRlIG9ubHkgdmFsaWQgZWxlbWVudHMsIHB1dCBudWxsIGluc3RlYWQgb2YgaW52YWxpZCBlbGVtZW50cy5cbiAgICBpZiAod3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgdmFsdWUsIGZhbHNlLCBmYWxzZSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG51bGwsIGZhbHNlLCBmYWxzZSkpKSB7XG5cbiAgICAgIGlmIChfcmVzdWx0ICE9PSAnJykgX3Jlc3VsdCArPSAnLCcgKyAoIXN0YXRlLmNvbmRlbnNlRmxvdyA/ICcgJyA6ICcnKTtcbiAgICAgIF9yZXN1bHQgKz0gc3RhdGUuZHVtcDtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gJ1snICsgX3Jlc3VsdCArICddJztcbn1cblxuZnVuY3Rpb24gd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ID0gJycsXG4gICAgICBfdGFnICAgID0gc3RhdGUudGFnLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICB2YWx1ZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB2YWx1ZSA9IG9iamVjdFtpbmRleF07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIHZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIFN0cmluZyhpbmRleCksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLCBwdXQgbnVsbCBpbnN0ZWFkIG9mIGludmFsaWQgZWxlbWVudHMuXG4gICAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCB2YWx1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgbnVsbCwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIHRydWUpKSkge1xuXG4gICAgICBpZiAoIWNvbXBhY3QgfHwgX3Jlc3VsdCAhPT0gJycpIHtcbiAgICAgICAgX3Jlc3VsdCArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgX3Jlc3VsdCArPSAnLSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfcmVzdWx0ICs9ICctICc7XG4gICAgICB9XG5cbiAgICAgIF9yZXN1bHQgKz0gc3RhdGUuZHVtcDtcbiAgICB9XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gX3Jlc3VsdCB8fCAnW10nOyAvLyBFbXB0eSBzZXF1ZW5jZSBpZiBubyB2YWxpZCB2YWx1ZXMuXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvd01hcHBpbmcoc3RhdGUsIGxldmVsLCBvYmplY3QpIHtcbiAgdmFyIF9yZXN1bHQgICAgICAgPSAnJyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgb2JqZWN0S2V5LFxuICAgICAgb2JqZWN0VmFsdWUsXG4gICAgICBwYWlyQnVmZmVyO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcblxuICAgIHBhaXJCdWZmZXIgPSAnJztcbiAgICBpZiAoX3Jlc3VsdCAhPT0gJycpIHBhaXJCdWZmZXIgKz0gJywgJztcblxuICAgIGlmIChzdGF0ZS5jb25kZW5zZUZsb3cpIHBhaXJCdWZmZXIgKz0gJ1wiJztcblxuICAgIG9iamVjdEtleSA9IG9iamVjdEtleUxpc3RbaW5kZXhdO1xuICAgIG9iamVjdFZhbHVlID0gb2JqZWN0W29iamVjdEtleV07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIG9iamVjdFZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIG9iamVjdEtleSwgb2JqZWN0VmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0S2V5LCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KSBwYWlyQnVmZmVyICs9ICc/ICc7XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXAgKyAoc3RhdGUuY29uZGVuc2VGbG93ID8gJ1wiJyA6ICcnKSArICc6JyArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnJyA6ICcgJyk7XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdFZhbHVlLCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICd7JyArIF9yZXN1bHQgKyAnfSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBjb21wYWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgZXhwbGljaXRQYWlyLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICAvLyBBbGxvdyBzb3J0aW5nIGtleXMgc28gdGhhdCB0aGUgb3V0cHV0IGZpbGUgaXMgZGV0ZXJtaW5pc3RpY1xuICBpZiAoc3RhdGUuc29ydEtleXMgPT09IHRydWUpIHtcbiAgICAvLyBEZWZhdWx0IHNvcnRpbmdcbiAgICBvYmplY3RLZXlMaXN0LnNvcnQoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3RhdGUuc29ydEtleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBDdXN0b20gc29ydCBmdW5jdGlvblxuICAgIG9iamVjdEtleUxpc3Quc29ydChzdGF0ZS5zb3J0S2V5cyk7XG4gIH0gZWxzZSBpZiAoc3RhdGUuc29ydEtleXMpIHtcbiAgICAvLyBTb21ldGhpbmcgaXMgd3JvbmdcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdzb3J0S2V5cyBtdXN0IGJlIGEgYm9vbGVhbiBvciBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuXG4gICAgaWYgKCFjb21wYWN0IHx8IF9yZXN1bHQgIT09ICcnKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgICBvYmplY3RWYWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwob2JqZWN0LCBvYmplY3RLZXksIG9iamVjdFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RLZXksIHRydWUsIHRydWUsIHRydWUpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIGtleS5cbiAgICB9XG5cbiAgICBleHBsaWNpdFBhaXIgPSAoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB8fFxuICAgICAgICAgICAgICAgICAgIChzdGF0ZS5kdW1wICYmIHN0YXRlLmR1bXAubGVuZ3RoID4gMTAyNCk7XG5cbiAgICBpZiAoZXhwbGljaXRQYWlyKSB7XG4gICAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIHBhaXJCdWZmZXIgKz0gJz8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFpckJ1ZmZlciArPSAnPyAnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIGlmIChleHBsaWNpdFBhaXIpIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgIH1cblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG9iamVjdFZhbHVlLCB0cnVlLCBleHBsaWNpdFBhaXIpKSB7XG4gICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIHBhaXIgYmVjYXVzZSBvZiBpbnZhbGlkIHZhbHVlLlxuICAgIH1cblxuICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gJzonO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWlyQnVmZmVyICs9ICc6ICc7XG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgLy8gQm90aCBrZXkgYW5kIHZhbHVlIGFyZSB2YWxpZC5cbiAgICBfcmVzdWx0ICs9IHBhaXJCdWZmZXI7XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gX3Jlc3VsdCB8fCAne30nOyAvLyBFbXB0eSBtYXBwaW5nIGlmIG5vIHZhbGlkIHBhaXJzLlxufVxuXG5mdW5jdGlvbiBkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIGV4cGxpY2l0KSB7XG4gIHZhciBfcmVzdWx0LCB0eXBlTGlzdCwgaW5kZXgsIGxlbmd0aCwgdHlwZSwgc3R5bGU7XG5cbiAgdHlwZUxpc3QgPSBleHBsaWNpdCA/IHN0YXRlLmV4cGxpY2l0VHlwZXMgOiBzdGF0ZS5pbXBsaWNpdFR5cGVzO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB0eXBlTGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdHlwZSA9IHR5cGVMaXN0W2luZGV4XTtcblxuICAgIGlmICgodHlwZS5pbnN0YW5jZU9mICB8fCB0eXBlLnByZWRpY2F0ZSkgJiZcbiAgICAgICAgKCF0eXBlLmluc3RhbmNlT2YgfHwgKCh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JykgJiYgKG9iamVjdCBpbnN0YW5jZW9mIHR5cGUuaW5zdGFuY2VPZikpKSAmJlxuICAgICAgICAoIXR5cGUucHJlZGljYXRlICB8fCB0eXBlLnByZWRpY2F0ZShvYmplY3QpKSkge1xuXG4gICAgICBpZiAoZXhwbGljaXQpIHtcbiAgICAgICAgaWYgKHR5cGUubXVsdGkgJiYgdHlwZS5yZXByZXNlbnROYW1lKSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS5yZXByZXNlbnROYW1lKG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gdHlwZS50YWc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLnRhZyA9ICc/JztcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUucmVwcmVzZW50KSB7XG4gICAgICAgIHN0eWxlID0gc3RhdGUuc3R5bGVNYXBbdHlwZS50YWddIHx8IHR5cGUuZGVmYXVsdFN0eWxlO1xuXG4gICAgICAgIGlmIChfdG9TdHJpbmcuY2FsbCh0eXBlLnJlcHJlc2VudCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnQob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5yZXByZXNlbnQsIHN0eWxlKSkge1xuICAgICAgICAgIF9yZXN1bHQgPSB0eXBlLnJlcHJlc2VudFtzdHlsZV0ob2JqZWN0LCBzdHlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignITwnICsgdHlwZS50YWcgKyAnPiB0YWcgcmVzb2x2ZXIgYWNjZXB0cyBub3QgXCInICsgc3R5bGUgKyAnXCIgc3R5bGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLmR1bXAgPSBfcmVzdWx0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFNlcmlhbGl6ZXMgYG9iamVjdGAgYW5kIHdyaXRlcyBpdCB0byBnbG9iYWwgYHJlc3VsdGAuXG4vLyBSZXR1cm5zIHRydWUgb24gc3VjY2Vzcywgb3IgZmFsc2Ugb24gaW52YWxpZCBvYmplY3QuXG4vL1xuZnVuY3Rpb24gd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0LCBibG9jaywgY29tcGFjdCwgaXNrZXksIGlzYmxvY2tzZXEpIHtcbiAgc3RhdGUudGFnID0gbnVsbDtcbiAgc3RhdGUuZHVtcCA9IG9iamVjdDtcblxuICBpZiAoIWRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgZmFsc2UpKSB7XG4gICAgZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCB0cnVlKTtcbiAgfVxuXG4gIHZhciB0eXBlID0gX3RvU3RyaW5nLmNhbGwoc3RhdGUuZHVtcCk7XG4gIHZhciBpbmJsb2NrID0gYmxvY2s7XG4gIHZhciB0YWdTdHI7XG5cbiAgaWYgKGJsb2NrKSB7XG4gICAgYmxvY2sgPSAoc3RhdGUuZmxvd0xldmVsIDwgMCB8fCBzdGF0ZS5mbG93TGV2ZWwgPiBsZXZlbCk7XG4gIH1cblxuICB2YXIgb2JqZWN0T3JBcnJheSA9IHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScsXG4gICAgICBkdXBsaWNhdGVJbmRleCxcbiAgICAgIGR1cGxpY2F0ZTtcblxuICBpZiAob2JqZWN0T3JBcnJheSkge1xuICAgIGR1cGxpY2F0ZUluZGV4ID0gc3RhdGUuZHVwbGljYXRlcy5pbmRleE9mKG9iamVjdCk7XG4gICAgZHVwbGljYXRlID0gZHVwbGljYXRlSW5kZXggIT09IC0xO1xuICB9XG5cbiAgaWYgKChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHx8IGR1cGxpY2F0ZSB8fCAoc3RhdGUuaW5kZW50ICE9PSAyICYmIGxldmVsID4gMCkpIHtcbiAgICBjb21wYWN0ID0gZmFsc2U7XG4gIH1cblxuICBpZiAoZHVwbGljYXRlICYmIHN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSkge1xuICAgIHN0YXRlLmR1bXAgPSAnKnJlZl8nICsgZHVwbGljYXRlSW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9iamVjdE9yQXJyYXkgJiYgZHVwbGljYXRlICYmICFzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0pIHtcbiAgICAgIHN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgaWYgKGJsb2NrICYmIChPYmplY3Qua2V5cyhzdGF0ZS5kdW1wKS5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIHdyaXRlQmxvY2tNYXBwaW5nKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVGbG93TWFwcGluZyhzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXApO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIGlmIChibG9jayAmJiAoc3RhdGUuZHVtcC5sZW5ndGggIT09IDApKSB7XG4gICAgICAgIGlmIChzdGF0ZS5ub0FycmF5SW5kZW50ICYmICFpc2Jsb2Nrc2VxICYmIGxldmVsID4gMCkge1xuICAgICAgICAgIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwgLSAxLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlRmxvd1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgU3RyaW5nXScpIHtcbiAgICAgIGlmIChzdGF0ZS50YWcgIT09ICc/Jykge1xuICAgICAgICB3cml0ZVNjYWxhcihzdGF0ZSwgc3RhdGUuZHVtcCwgbGV2ZWwsIGlza2V5LCBpbmJsb2NrKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IFVuZGVmaW5lZF0nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5za2lwSW52YWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbigndW5hY2NlcHRhYmxlIGtpbmQgb2YgYW4gb2JqZWN0IHRvIGR1bXAgJyArIHR5cGUpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgIC8vIE5lZWQgdG8gZW5jb2RlIGFsbCBjaGFyYWN0ZXJzIGV4Y2VwdCB0aG9zZSBhbGxvd2VkIGJ5IHRoZSBzcGVjOlxuICAgICAgLy9cbiAgICAgIC8vIFszNV0gbnMtZGVjLWRpZ2l0ICAgIDo6PSAgWyN4MzAtI3gzOV0gLyogMC05ICovXG4gICAgICAvLyBbMzZdIG5zLWhleC1kaWdpdCAgICA6Oj0gIG5zLWRlYy1kaWdpdFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfCBbI3g0MS0jeDQ2XSAvKiBBLUYgKi8gfCBbI3g2MS0jeDY2XSAvKiBhLWYgKi9cbiAgICAgIC8vIFszN10gbnMtYXNjaWktbGV0dGVyIDo6PSAgWyN4NDEtI3g1QV0gLyogQS1aICovIHwgWyN4NjEtI3g3QV0gLyogYS16ICovXG4gICAgICAvLyBbMzhdIG5zLXdvcmQtY2hhciAgICA6Oj0gIG5zLWRlYy1kaWdpdCB8IG5zLWFzY2lpLWxldHRlciB8IFx1MjAxQy1cdTIwMURcbiAgICAgIC8vIFszOV0gbnMtdXJpLWNoYXIgICAgIDo6PSAgXHUyMDFDJVx1MjAxRCBucy1oZXgtZGlnaXQgbnMtaGV4LWRpZ2l0IHwgbnMtd29yZC1jaGFyIHwgXHUyMDFDI1x1MjAxRFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfCBcdTIwMUM7XHUyMDFEIHwgXHUyMDFDL1x1MjAxRCB8IFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDQFx1MjAxRCB8IFx1MjAxQyZcdTIwMUQgfCBcdTIwMUM9XHUyMDFEIHwgXHUyMDFDK1x1MjAxRCB8IFx1MjAxQyRcdTIwMUQgfCBcdTIwMUMsXHUyMDFEXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB8IFx1MjAxQ19cdTIwMUQgfCBcdTIwMUMuXHUyMDFEIHwgXHUyMDFDIVx1MjAxRCB8IFx1MjAxQ35cdTIwMUQgfCBcdTIwMUMqXHUyMDFEIHwgXHUyMDFDJ1x1MjAxRCB8IFx1MjAxQyhcdTIwMUQgfCBcdTIwMUMpXHUyMDFEIHwgXHUyMDFDW1x1MjAxRCB8IFx1MjAxQ11cdTIwMURcbiAgICAgIC8vXG4gICAgICAvLyBBbHNvIG5lZWQgdG8gZW5jb2RlICchJyBiZWNhdXNlIGl0IGhhcyBzcGVjaWFsIG1lYW5pbmcgKGVuZCBvZiB0YWcgcHJlZml4KS5cbiAgICAgIC8vXG4gICAgICB0YWdTdHIgPSBlbmNvZGVVUkkoXG4gICAgICAgIHN0YXRlLnRhZ1swXSA9PT0gJyEnID8gc3RhdGUudGFnLnNsaWNlKDEpIDogc3RhdGUudGFnXG4gICAgICApLnJlcGxhY2UoLyEvZywgJyUyMScpO1xuXG4gICAgICBpZiAoc3RhdGUudGFnWzBdID09PSAnIScpIHtcbiAgICAgICAgdGFnU3RyID0gJyEnICsgdGFnU3RyO1xuICAgICAgfSBlbHNlIGlmICh0YWdTdHIuc2xpY2UoMCwgMTgpID09PSAndGFnOnlhbWwub3JnLDIwMDI6Jykge1xuICAgICAgICB0YWdTdHIgPSAnISEnICsgdGFnU3RyLnNsaWNlKDE4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhZ1N0ciA9ICchPCcgKyB0YWdTdHIgKyAnPic7XG4gICAgICB9XG5cbiAgICAgIHN0YXRlLmR1bXAgPSB0YWdTdHIgKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBnZXREdXBsaWNhdGVSZWZlcmVuY2VzKG9iamVjdCwgc3RhdGUpIHtcbiAgdmFyIG9iamVjdHMgPSBbXSxcbiAgICAgIGR1cGxpY2F0ZXNJbmRleGVzID0gW10sXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpbnNwZWN0Tm9kZShvYmplY3QsIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gZHVwbGljYXRlc0luZGV4ZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHN0YXRlLmR1cGxpY2F0ZXMucHVzaChvYmplY3RzW2R1cGxpY2F0ZXNJbmRleGVzW2luZGV4XV0pO1xuICB9XG4gIHN0YXRlLnVzZWREdXBsaWNhdGVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpIHtcbiAgdmFyIG9iamVjdEtleUxpc3QsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aDtcblxuICBpZiAob2JqZWN0ICE9PSBudWxsICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgaW5kZXggPSBvYmplY3RzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBpZiAoZHVwbGljYXRlc0luZGV4ZXMuaW5kZXhPZihpbmRleCkgPT09IC0xKSB7XG4gICAgICAgIGR1cGxpY2F0ZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvYmplY3RzLnB1c2gob2JqZWN0KTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3RbaW5kZXhdLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgICBpbnNwZWN0Tm9kZShvYmplY3Rbb2JqZWN0S2V5TGlzdFtpbmRleF1dLCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHVtcCQxKGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZShvcHRpb25zKTtcblxuICBpZiAoIXN0YXRlLm5vUmVmcykgZ2V0RHVwbGljYXRlUmVmZXJlbmNlcyhpbnB1dCwgc3RhdGUpO1xuXG4gIHZhciB2YWx1ZSA9IGlucHV0O1xuXG4gIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgIHZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbCh7ICcnOiB2YWx1ZSB9LCAnJywgdmFsdWUpO1xuICB9XG5cbiAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgMCwgdmFsdWUsIHRydWUsIHRydWUpKSByZXR1cm4gc3RhdGUuZHVtcCArICdcXG4nO1xuXG4gIHJldHVybiAnJztcbn1cblxudmFyIGR1bXBfMSA9IGR1bXAkMTtcblxudmFyIGR1bXBlciA9IHtcblx0ZHVtcDogZHVtcF8xXG59O1xuXG5mdW5jdGlvbiByZW5hbWVkKGZyb20sIHRvKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiB5YW1sLicgKyBmcm9tICsgJyBpcyByZW1vdmVkIGluIGpzLXlhbWwgNC4gJyArXG4gICAgICAnVXNlIHlhbWwuJyArIHRvICsgJyBpbnN0ZWFkLCB3aGljaCBpcyBub3cgc2FmZSBieSBkZWZhdWx0LicpO1xuICB9O1xufVxuXG5cbnZhciBUeXBlICAgICAgICAgICAgICAgID0gdHlwZTtcbnZhciBTY2hlbWEgICAgICAgICAgICAgID0gc2NoZW1hO1xudmFyIEZBSUxTQUZFX1NDSEVNQSAgICAgPSBmYWlsc2FmZTtcbnZhciBKU09OX1NDSEVNQSAgICAgICAgID0ganNvbjtcbnZhciBDT1JFX1NDSEVNQSAgICAgICAgID0gY29yZTtcbnZhciBERUZBVUxUX1NDSEVNQSAgICAgID0gX2RlZmF1bHQ7XG52YXIgbG9hZCAgICAgICAgICAgICAgICA9IGxvYWRlci5sb2FkO1xudmFyIGxvYWRBbGwgICAgICAgICAgICAgPSBsb2FkZXIubG9hZEFsbDtcbnZhciBkdW1wICAgICAgICAgICAgICAgID0gZHVtcGVyLmR1bXA7XG52YXIgWUFNTEV4Y2VwdGlvbiAgICAgICA9IGV4Y2VwdGlvbjtcblxuLy8gUmUtZXhwb3J0IGFsbCB0eXBlcyBpbiBjYXNlIHVzZXIgd2FudHMgdG8gY3JlYXRlIGN1c3RvbSBzY2hlbWFcbnZhciB0eXBlcyA9IHtcbiAgYmluYXJ5OiAgICBiaW5hcnksXG4gIGZsb2F0OiAgICAgZmxvYXQsXG4gIG1hcDogICAgICAgbWFwLFxuICBudWxsOiAgICAgIF9udWxsLFxuICBwYWlyczogICAgIHBhaXJzLFxuICBzZXQ6ICAgICAgIHNldCxcbiAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gIGJvb2w6ICAgICAgYm9vbCxcbiAgaW50OiAgICAgICBpbnQsXG4gIG1lcmdlOiAgICAgbWVyZ2UsXG4gIG9tYXA6ICAgICAgb21hcCxcbiAgc2VxOiAgICAgICBzZXEsXG4gIHN0cjogICAgICAgc3RyXG59O1xuXG4vLyBSZW1vdmVkIGZ1bmN0aW9ucyBmcm9tIEpTLVlBTUwgMy4wLnhcbnZhciBzYWZlTG9hZCAgICAgICAgICAgID0gcmVuYW1lZCgnc2FmZUxvYWQnLCAnbG9hZCcpO1xudmFyIHNhZmVMb2FkQWxsICAgICAgICAgPSByZW5hbWVkKCdzYWZlTG9hZEFsbCcsICdsb2FkQWxsJyk7XG52YXIgc2FmZUR1bXAgICAgICAgICAgICA9IHJlbmFtZWQoJ3NhZmVEdW1wJywgJ2R1bXAnKTtcblxudmFyIGpzWWFtbCA9IHtcblx0VHlwZTogVHlwZSxcblx0U2NoZW1hOiBTY2hlbWEsXG5cdEZBSUxTQUZFX1NDSEVNQTogRkFJTFNBRkVfU0NIRU1BLFxuXHRKU09OX1NDSEVNQTogSlNPTl9TQ0hFTUEsXG5cdENPUkVfU0NIRU1BOiBDT1JFX1NDSEVNQSxcblx0REVGQVVMVF9TQ0hFTUE6IERFRkFVTFRfU0NIRU1BLFxuXHRsb2FkOiBsb2FkLFxuXHRsb2FkQWxsOiBsb2FkQWxsLFxuXHRkdW1wOiBkdW1wLFxuXHRZQU1MRXhjZXB0aW9uOiBZQU1MRXhjZXB0aW9uLFxuXHR0eXBlczogdHlwZXMsXG5cdHNhZmVMb2FkOiBzYWZlTG9hZCxcblx0c2FmZUxvYWRBbGw6IHNhZmVMb2FkQWxsLFxuXHRzYWZlRHVtcDogc2FmZUR1bXBcbn07XG5cbmV4cG9ydCB7IENPUkVfU0NIRU1BLCBERUZBVUxUX1NDSEVNQSwgRkFJTFNBRkVfU0NIRU1BLCBKU09OX1NDSEVNQSwgU2NoZW1hLCBUeXBlLCBZQU1MRXhjZXB0aW9uLCBqc1lhbWwgYXMgZGVmYXVsdCwgZHVtcCwgbG9hZCwgbG9hZEFsbCwgc2FmZUR1bXAsIHNhZmVMb2FkLCBzYWZlTG9hZEFsbCwgdHlwZXMgfTtcbiIsICJpbXBvcnQgeyBleGVjU3luYywgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbmZ1bmN0aW9uIHJ1bkluU2hlbGwoYXJnczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGB6c2ggLWlsYyAnYnVmbyAke2FyZ3N9JyAyPiYxYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkJ1Zm9TeW5jKGFyZ3M6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBleGVjU3luYyhydW5JblNoZWxsKGFyZ3MpLCB7IGVuY29kaW5nOiBcInV0Zi04XCIsIHRpbWVvdXQ6IDMwMDAwIH0pLnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bkJ1Zm9Bc3luYyhhcmdzOiBzdHJpbmcsIHN0ZGluPzogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGlsZCA9IGV4ZWMoXG4gICAgICBydW5JblNoZWxsKGFyZ3MpLFxuICAgICAge1xuICAgICAgICBlbmNvZGluZzogXCJ1dGYtOFwiLFxuICAgICAgICB0aW1lb3V0OiAwLCAvLyBubyB0aW1lb3V0IFx1MjAxNCBzb21lIG9wZXJhdGlvbnMgKHdvcmt0cmVlIGNyZWF0aW9uLCBucG0gaW5zdGFsbCkgdGFrZSBtaW51dGVzXG4gICAgICB9LFxuICAgICAgKGVycm9yLCBzdGRvdXQpID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICAgIGlmIChzdGRpbiAhPT0gdW5kZWZpbmVkICYmIGNoaWxkLnN0ZGluKSB7XG4gICAgICBjaGlsZC5zdGRpbi53cml0ZShzdGRpbik7XG4gICAgICBjaGlsZC5zdGRpbi5lbmQoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2l0QnJhbmNoKGRpcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZXhlY1N5bmMoYGdpdCAtQyBcIiR7ZGlyfVwiIHJldi1wYXJzZSAtLWFiYnJldi1yZWYgSEVBRCAyPi9kZXYvbnVsbGAsIHtcbiAgICAgIGVuY29kaW5nOiBcInV0Zi04XCIsXG4gICAgICB0aW1lb3V0OiA1MDAwLFxuICAgIH0pLnRyaW0oKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwidW5rbm93blwiO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IGEgc2Vzc2lvbiBJRCBpcyBhIHNhZmUgaVRlcm0yIFVVSUQgYmVmb3JlIGVtYmVkZGluZyBpdCBpblxuICogQXBwbGVTY3JpcHQuIGlUZXJtMiBzZXNzaW9uIElEcyBhcmUgYWx3YXlzIGh5cGhlbmF0ZWQgVVVJRHM7IGFueXRoaW5nIGVsc2VcbiAqIGlzIHVuZXhwZWN0ZWQgYW5kIGNvdWxkIGluZGljYXRlIGluamVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVTZXNzaW9uSWQoaWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChcbiAgICAhL15bMC05QS1GYS1mXXs4fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXsxMn0kLy50ZXN0KGlkKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaVRlcm0yIHNlc3Npb24gSUQ6ICR7SlNPTi5zdHJpbmdpZnkoaWQpfWApO1xuICB9XG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBSdW4gYW4gQXBwbGVTY3JpcHQgYnkgcGFzc2luZyBpdCBvbiBzdGRpbiB0byBvc2FzY3JpcHQuXG4gKiBBdm9pZHMgc2hlbGwtcXVvdGluZyBpc3N1ZXMgYW5kIGFyZ3VtZW50LWxlbmd0aCBsaW1pdHMuXG4gKi9cbmZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0U3luYyhzY3JpcHQ6IHN0cmluZywgdGltZW91dE1zID0gNTAwMCk6IHN0cmluZyB7XG4gIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhcIi91c3IvYmluL29zYXNjcmlwdFwiLCBbXSwge1xuICAgIGlucHV0OiBzY3JpcHQsXG4gICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgICB0aW1lb3V0OiB0aW1lb3V0TXMsXG4gIH0pO1xuICBpZiAocmVzdWx0LmVycm9yKSB0aHJvdyByZXN1bHQuZXJyb3I7XG4gIHJldHVybiAocmVzdWx0LnN0ZG91dCBhcyBzdHJpbmcpID8/IFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c1Nlc3Npb24oc2Vzc2lvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgc2FmZUlkID0gc2FuaXRpemVTZXNzaW9uSWQoc2Vzc2lvbklkKTtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIHRlbGwgYXBwbGljYXRpb24gXCJpVGVybTJcIlxuICAgICAgYWN0aXZhdGVcbiAgICAgIHJlcGVhdCB3aXRoIHcgaW4gd2luZG93c1xuICAgICAgICB0ZWxsIHdcbiAgICAgICAgICByZXBlYXQgd2l0aCB0IGluIHRhYnNcbiAgICAgICAgICAgIHRlbGwgdFxuICAgICAgICAgICAgICByZXBlYXQgd2l0aCBzIGluIHNlc3Npb25zXG4gICAgICAgICAgICAgICAgaWYgKHVuaXF1ZSBJRCBvZiBzKSBpcyBcIiR7c2FmZUlkfVwiIHRoZW5cbiAgICAgICAgICAgICAgICAgIHNlbGVjdCB0XG4gICAgICAgICAgICAgICAgICBzZWxlY3Qgc1xuICAgICAgICAgICAgICAgICAgdGVsbCB3IHRvIHNlbGVjdFxuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgZW5kIGlmXG4gICAgICAgICAgICAgIGVuZCByZXBlYXRcbiAgICAgICAgICAgIGVuZCB0ZWxsXG4gICAgICAgICAgZW5kIHJlcGVhdFxuICAgICAgICBlbmQgdGVsbFxuICAgICAgZW5kIHJlcGVhdFxuICAgIGVuZCB0ZWxsXG4gIGA7XG4gIHRyeSB7XG4gICAgcnVuQXBwbGVTY3JpcHRTeW5jKHNjcmlwdCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlUZXJtMiBtYXkgbm90IGJlIHJ1bm5pbmdcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlU2Vzc2lvbnMoKTogU2V0PHN0cmluZz4ge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgdGVsbCBhcHBsaWNhdGlvbiBcImlUZXJtMlwiXG4gICAgICBzZXQgYWxsSURzIHRvIHt9XG4gICAgICByZXBlYXQgd2l0aCB3IGluIHdpbmRvd3NcbiAgICAgICAgdGVsbCB3XG4gICAgICAgICAgcmVwZWF0IHdpdGggdCBpbiB0YWJzXG4gICAgICAgICAgICB0ZWxsIHRcbiAgICAgICAgICAgICAgcmVwZWF0IHdpdGggcyBpbiBzZXNzaW9uc1xuICAgICAgICAgICAgICAgIHNldCBlbmQgb2YgYWxsSURzIHRvICh1bmlxdWUgSUQgb2YgcylcbiAgICAgICAgICAgICAgZW5kIHJlcGVhdFxuICAgICAgICAgICAgZW5kIHRlbGxcbiAgICAgICAgICBlbmQgcmVwZWF0XG4gICAgICAgIGVuZCB0ZWxsXG4gICAgICBlbmQgcmVwZWF0XG4gICAgICBzZXQgQXBwbGVTY3JpcHQncyB0ZXh0IGl0ZW0gZGVsaW1pdGVycyB0byBcIixcIlxuICAgICAgcmV0dXJuIGFsbElEcyBhcyB0ZXh0XG4gICAgZW5kIHRlbGxcbiAgYDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBydW5BcHBsZVNjcmlwdFN5bmMoc2NyaXB0KS50cmltKCk7XG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBuZXcgU2V0KCk7XG4gICAgcmV0dXJuIG5ldyBTZXQocmVzdWx0LnNwbGl0KFwiLFwiKS5tYXAoKHMpID0+IHMudHJpbSgpKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcm1SdW5uaW5nKCk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhcInBncmVwXCIsIFtcIi14XCIsIFwiaVRlcm0yXCJdLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgcmV0dXJuIChyZXN1bHQuc3Rkb3V0IGFzIHN0cmluZykudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBQUFBLGNBWU87QTs7Ozs7O0FDWlAsSUFBSSxNQUFNLE9BQU8sVUFBVTtBQUVwQixTQUFTLE9BQU8sS0FBSyxLQUFLO0FBQ2hDLE1BQUksTUFBTTtBQUNWLE1BQUksUUFBUSxJQUFLLFFBQU87QUFFeEIsTUFBSSxPQUFPLFFBQVEsT0FBSyxJQUFJLGlCQUFpQixJQUFJLGFBQWE7QUFDN0QsUUFBSSxTQUFTLEtBQU0sUUFBTyxJQUFJLFFBQVEsTUFBTSxJQUFJLFFBQVE7QUFDeEQsUUFBSSxTQUFTLE9BQVEsUUFBTyxJQUFJLFNBQVMsTUFBTSxJQUFJLFNBQVM7QUFFNUQsUUFBSSxTQUFTLE9BQU87QUFDbkIsV0FBSyxNQUFJLElBQUksWUFBWSxJQUFJLFFBQVE7QUFDcEMsZUFBTyxTQUFTLE9BQU8sSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsRUFBRTtBQUFBLE1BQzVDO0FBQ0EsYUFBTyxRQUFRO0FBQUEsSUFDaEI7QUFFQSxRQUFJLENBQUMsUUFBUSxPQUFPLFFBQVEsVUFBVTtBQUNyQyxZQUFNO0FBQ04sV0FBSyxRQUFRLEtBQUs7QUFDakIsWUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssRUFBRSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFHLFFBQU87QUFDakUsWUFBSSxFQUFFLFFBQVEsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFBRyxRQUFPO0FBQUEsTUFDN0Q7QUFDQSxhQUFPLE9BQU8sS0FBSyxHQUFHLEVBQUUsV0FBVztBQUFBLElBQ3BDO0FB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QUFZO0FBQ3BCLG9CQUNFLFVBQU0sMEJBQWE7QUFBQSxrQkFDakIsT0FBTztBQUFBLGtCQUNQLFNBQVMsaUNBQWlDLEdBQUcsUUFBUSxLQUFLLE1BQU0sR0FBRyxNQUFNO0FBQUEsa0JBQ3pFLGVBQWUsRUFBRSxPQUFPLFdBQVcsT0FBTyxrQkFBTSxZQUFZLFlBQVk7QUFBQSxnQkFDMUUsQ0FBQyxHQUNEO0FBQ0EsNEJBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sVUFBVSxPQUFPLGdCQUFnQixDQUFDO0FBQ3ZFLHNCQUFJO0FBQ0YsMEJBQU0sYUFBYSxJQUFJLEdBQUcsUUFBUSxLQUFLLE9BQU8sR0FBRyxNQUFNLFVBQVU7QUFDakUsOEJBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLFlBQVksQ0FBQztBQUNsRSwrQkFBVztBQUFBLGtCQUNiLFNBQVMsR0FBRztBQUNWLDhCQUFNLHVCQUFVO0FBQUEsc0JBQ2QsT0FBTyxrQkFBTSxNQUFNO0FBQUEsc0JBQ25CLE9BQU87QUFBQSxzQkFDUCxTQUFTLE9BQU8sQ0FBQztBQUFBLG9CQUNuQixDQUFDO0FBQUEsa0JBQ0g7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxXQUNGO0FBQUEsU0FDRjtBQUFBO0FBQUEsRUFFSjtBQUVKOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfYXBpIiwgIiRoZ1VXMSR1c2VSZWYiLCAiJGhnVVcxJHVzZU1lbW8iLCAiJGhnVVcxJHNob3dUb2FzdCIsICIkaGdVVzEkVG9hc3QiLCAiJGhnVVcxJHJlYWRGaWxlU3luYyIsICIkaGdVVzEkam9pbiIsICIkaGdVVzEkZW52aXJvbm1lbnQiLCAiJGhnVVcxJENsaXBib2FyZCIsICIkaGdVVzEkb3BlbiIsICJzZXQiLCAiJGhnVVcxJHVzZVN0YXRlIiwgIiRoZ1VXMSR1c2VDYWxsYmFjayIsICJhcmdzIiwgIiRoZ1VXMSRMYXVuY2hUeXBlIiwgIm9wdGlvbnMiLCAiJGhnVVcxJHVzZUVmZmVjdCIsICJzdHIiLCAidHlwZSIsICJib29sIiwgIm1hcCIsICIkaGdVVzEkbm9kZWNyeXB0byIsICIkaGdVVzEkQ2FjaGUiLCAiJGhnVVcxJHVzZVN5bmNFeHRlcm5hbFN0b3JlIiwgInBhZ2luYXRpb24iLCAiaW1wb3J0X2ZzIiwgImltcG9ydF9wYXRoIiwgImV4Y2VwdGlvbiIsICJtYXAiLCAic2NoZW1hIiwgInR5cGUiLCAiZXh0ZW5kIiwgInN0ciIsICJzdHJpbmciLCAiaW1wb3J0X2NoaWxkX3Byb2Nlc3MiLCAiaW1wb3J0X2ZzIiwgImltcG9ydF9wYXRoIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
