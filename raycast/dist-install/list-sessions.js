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

// src/list-sessions.tsx
var list_sessions_exports = {};
__export(list_sessions_exports, {
  default: () => ListSessions
});
module.exports = __toCommonJS(list_sessions_exports);
var import_api2 = require("@raycast/api");

// ../node_modules/@raycast/utils/dist/module.js
var import_react = __toESM(require("react"));
var import_api = require("@raycast/api");

// ../node_modules/dequal/lite/index.mjs
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

// ../node_modules/@raycast/utils/dist/module.js
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
function loadSession(projectAlias, sessionName, activeSessions) {
  const sessionDir = (0, import_path.join)(SESSIONS_DIR, projectAlias, sessionName);
  const sessionFile = (0, import_path.join)(sessionDir, "session.yaml");
  if (!(0, import_fs.existsSync)(sessionFile))
    return void 0;
  try {
    const raw = (0, import_fs.readFileSync)(sessionFile, "utf-8");
    const doc = load(raw);
    let layout;
    const layoutFile = (0, import_path.join)(sessionDir, "layout.json");
    if ((0, import_fs.existsSync)(layoutFile)) {
      try {
        layout = JSON.parse((0, import_fs.readFileSync)(layoutFile, "utf-8"));
      } catch {
      }
    }
    const active = layout?.main_sid ? activeSessions?.has(layout.main_sid) ?? false : false;
    const hasReviewOutput = (0, import_fs.existsSync)((0, import_path.join)(sessionDir, "review-output.md"));
    return {
      name: doc.name || sessionName,
      project: doc.project || projectAlias,
      created: doc.created || "",
      last_accessed: doc.last_accessed || "",
      summary: doc.summary || "",
      type: doc.type || "general",
      prs: doc.prs,
      active,
      hasReviewOutput,
      layout
    };
  } catch {
    return void 0;
  }
}
function discoverSessions(projectAlias, activeSessions) {
  const projectSessionsDir = (0, import_path.join)(SESSIONS_DIR, projectAlias);
  if (!(0, import_fs.existsSync)(projectSessionsDir))
    return [];
  let entries;
  try {
    entries = (0, import_fs.readdirSync)(projectSessionsDir);
  } catch {
    return [];
  }
  const sessions = [];
  for (const entry of entries) {
    const fullPath = (0, import_path.join)(projectSessionsDir, entry);
    try {
      if (!(0, import_fs.statSync)(fullPath).isDirectory())
        continue;
    } catch {
      continue;
    }
    const session = loadSession(projectAlias, entry, activeSessions);
    if (session)
      sessions.push(session);
  }
  return sessions;
}
function getAllSessions(activeSessions) {
  const projects = discoverProjects();
  const result = [];
  for (const project of projects) {
    const sessions = discoverSessions(project.alias, activeSessions);
    if (sessions.length > 0) {
      result.push({ projectAlias: project.alias, sessions });
    }
  }
  return result;
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

// ../packages/core/dist/iterm.js
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
  if (result.error)
    throw result.error;
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
    if (!result)
      return /* @__PURE__ */ new Set();
    return new Set(result.split(",").map((s) => s.trim()));
  } catch {
    return /* @__PURE__ */ new Set();
  }
}

// src/list-sessions.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function ListSessions() {
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
  const { data, isLoading, revalidate } = $a7f3824c7be647eb$export$b15740c74e256244(
    async () => {
      const activeSessions = getActiveSessions();
      return getAllSessions(activeSessions);
    },
    [],
    { keepPreviousData: true }
  );
  const groups = data ?? [];
  const totalSessions = groups.reduce((sum, g) => sum + g.sessions.length, 0);
  const sortedGroups = groups.map((g) => ({
    ...g,
    sessions: [...g.sessions].sort((a, b) => Number(b.active) - Number(a.active))
  }));
  sortedGroups.sort(
    (a, b) => Number(b.sessions.some((s) => s.active)) - Number(a.sessions.some((s) => s.active))
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.List, { isLoading, searchBarPlaceholder: "Filter sessions...", children: [
    groups.length === 0 && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_api2.List.EmptyView,
      {
        title: "No Sessions Found",
        description: "Start a session with `bufo session start <name>` or use New Session.",
        icon: import_api2.Icon.Desktop
      }
    ),
    sortedGroups.map(({ projectAlias, sessions }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_api2.List.Section,
      {
        title: `@${projectAlias}`,
        subtitle: `${sessions.length} session(s)`,
        children: sessions.map((session) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SessionItem,
          {
            session,
            projectAlias,
            revalidate
          },
          `${projectAlias}-${session.name}`
        ))
      },
      projectAlias
    ))
  ] });
}
function SessionItem({
  session,
  projectAlias,
  revalidate
}) {
  const subtitle = session.summary || session.type;
  const accessories = [];
  if (session.active) {
    accessories.push({ icon: { source: import_api2.Icon.Circle, tintColor: import_api2.Color.Green }, tooltip: "Active" });
  }
  if (session.type === "review") {
    accessories.push({ tag: { value: "REVIEW", color: import_api2.Color.Blue } });
  } else if (session.type === "court") {
    accessories.push({ tag: { value: "COURT", color: import_api2.Color.Purple } });
  }
  if (session.hasReviewOutput) {
    accessories.push({ tag: { value: "saved", color: import_api2.Color.Green } });
  }
  const icon = session.active ? { source: import_api2.Icon.Terminal, tintColor: import_api2.Color.Green } : { source: import_api2.Icon.Terminal, tintColor: import_api2.Color.SecondaryText };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_api2.List.Item,
    {
      title: session.name,
      subtitle,
      icon,
      accessories,
      actions: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_api2.ActionPanel.Section, { children: [
          session.active && session.layout?.terminal_sid && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Focus Session",
              icon: import_api2.Icon.Eye,
              onAction: async () => {
                focusSession(session.layout.terminal_sid);
                await (0, import_api2.closeMainWindow)();
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            import_api2.Action,
            {
              title: "Resume Session",
              icon: import_api2.Icon.Play,
              shortcut: { modifiers: ["cmd"], key: "o" },
              onAction: async () => {
                await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Animated, title: "Resuming session..." });
                try {
                  await runBufoAsync(`@${projectAlias} session resume ${session.name}`);
                  await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Session resumed" });
                  revalidate();
                } catch (e) {
                  await (0, import_api2.showToast)({
                    style: import_api2.Toast.Style.Failure,
                    title: "Failed to resume",
                    message: String(e)
                  });
                }
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_api2.ActionPanel.Section, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_api2.Action,
          {
            title: "Copy Session Name",
            icon: import_api2.Icon.Clipboard,
            shortcut: { modifiers: ["cmd"], key: "b" },
            onAction: async () => {
              await import_api2.Clipboard.copy(session.name);
              await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Session name copied" });
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_api2.ActionPanel.Section, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_api2.Action,
          {
            title: "Delete Session",
            icon: import_api2.Icon.XMarkCircle,
            style: import_api2.Action.Style.Destructive,
            shortcut: { modifiers: ["cmd", "shift"], key: "d" },
            onAction: async () => {
              if (await (0, import_api2.confirmAlert)({
                title: "Delete Session?",
                message: `This will permanently delete the session "${session.name}" under @${projectAlias}. This cannot be undone.`,
                primaryAction: { title: "Delete", style: import_api2.Alert.ActionStyle.Destructive }
              })) {
                await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Animated, title: "Deleting session..." });
                try {
                  await runBufoAsync(`@${projectAlias} session delete ${session.name}`, "y\n");
                  await (0, import_api2.showToast)({ style: import_api2.Toast.Style.Success, title: "Session deleted" });
                  revalidate();
                } catch (e) {
                  await (0, import_api2.showToast)({
                    style: import_api2.Toast.Style.Failure,
                    title: "Delete failed",
                    message: String(e)
                  });
                }
              }
            }
          }
        ) })
      ] })
    }
  );
}
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.1 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3Qtc2Vzc2lvbnMudHN4IiwgIi4uLy4uL25vZGVfbW9kdWxlcy9kZXF1YWwvbGl0ZS9pbmRleC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VQcm9taXNlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VEZWVwTWVtby50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTGF0ZXN0LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9zaG93RmFpbHVyZVRvYXN0LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VDYWNoZWRTdGF0ZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaGVscGVycy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy90eXBlLWhhc2hlci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQ2FjaGVkUHJvbWlzZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlRmV0Y2gudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2ZldGNoLXV0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VFeGVjLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjLXV0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3NpZ25hbC1leGl0LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VTdHJlYW1KU09OLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3N0cmVhbS1jaGFpbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy9zdHJlYW0tanNvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlU1FMLnRzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvc3FsLXV0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VGb3JtLnRzeCIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQUkudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3VzZUZyZWNlbmN5U29ydGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTG9jYWxTdG9yYWdlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2F2YXRhci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9jb2xvci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9mYXZpY29uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL3Byb2dyZXNzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9pbmRleC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvb2F1dGgvT0F1dGhTZXJ2aWNlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9wcm92aWRlcnMudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL29hdXRoL3dpdGhBY2Nlc3NUb2tlbi50c3giLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2NyZWF0ZURlZXBsaW5rLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjdXRlU1FMLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9ydW4tYXBwbGVzY3JpcHQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3J1bi1wb3dlcnNoZWxsLXNjcmlwdC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvY2FjaGUudHMiLCAiLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvY29uZmlnLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9qcy15YW1sL2Rpc3QvanMteWFtbC5tanMiLCAiLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZXhlYy50cyIsICIuLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9pdGVybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgTGlzdCxcbiAgQWN0aW9uUGFuZWwsXG4gIEFjdGlvbixcbiAgSWNvbixcbiAgQ29sb3IsXG4gIENsaXBib2FyZCxcbiAgc2hvd1RvYXN0LFxuICBUb2FzdCxcbiAgY29uZmlybUFsZXJ0LFxuICBBbGVydCxcbiAgY2xvc2VNYWluV2luZG93LFxufSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG5pbXBvcnQgeyBidWZvRXhpc3RzLCBmb2N1c1Nlc3Npb24sIGdldEFjdGl2ZVNlc3Npb25zLCBnZXRBbGxTZXNzaW9ucywgcnVuQnVmb0FzeW5jIH0gZnJvbSBcIkBidWZvL2NvcmVcIjtcbmltcG9ydCB0eXBlIHsgQnVmb1Nlc3Npb24gfSBmcm9tIFwiQGJ1Zm8vY29yZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaXN0U2Vzc2lvbnMoKSB7XG4gIGlmICghYnVmb0V4aXN0cygpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMaXN0PlxuICAgICAgICA8TGlzdC5FbXB0eVZpZXdcbiAgICAgICAgICB0aXRsZT1cIkJ1Zm8gTm90IENvbmZpZ3VyZWRcIlxuICAgICAgICAgIGRlc2NyaXB0aW9uPVwiUnVuIGBidWZvIGluaXRgIGluIHlvdXIgdGVybWluYWwgdG8gc2V0IHVwIGJ1Zm8uXCJcbiAgICAgICAgICBpY29uPXtJY29uLldhcm5pbmd9XG4gICAgICAgIC8+XG4gICAgICA8L0xpc3Q+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCByZXZhbGlkYXRlIH0gPSB1c2VDYWNoZWRQcm9taXNlKFxuICAgIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZVNlc3Npb25zID0gZ2V0QWN0aXZlU2Vzc2lvbnMoKTtcbiAgICAgIHJldHVybiBnZXRBbGxTZXNzaW9ucyhhY3RpdmVTZXNzaW9ucyk7XG4gICAgfSxcbiAgICBbXSxcbiAgICB7IGtlZXBQcmV2aW91c0RhdGE6IHRydWUgfVxuICApO1xuXG4gIGNvbnN0IGdyb3VwcyA9IGRhdGEgPz8gW107XG4gIGNvbnN0IHRvdGFsU2Vzc2lvbnMgPSBncm91cHMucmVkdWNlKChzdW0sIGcpID0+IHN1bSArIGcuc2Vzc2lvbnMubGVuZ3RoLCAwKTtcblxuICAvLyBTb3J0IGVhY2ggZ3JvdXA6IGFjdGl2ZSBzZXNzaW9ucyBmaXJzdFxuICBjb25zdCBzb3J0ZWRHcm91cHMgPSBncm91cHMubWFwKChnKSA9PiAoe1xuICAgIC4uLmcsXG4gICAgc2Vzc2lvbnM6IFsuLi5nLnNlc3Npb25zXS5zb3J0KChhLCBiKSA9PiBOdW1iZXIoYi5hY3RpdmUpIC0gTnVtYmVyKGEuYWN0aXZlKSksXG4gIH0pKTtcblxuICAvLyBQcm9qZWN0cyB3aXRoIGFueSBhY3RpdmUgc2Vzc2lvbnMgZmlyc3RcbiAgc29ydGVkR3JvdXBzLnNvcnQoXG4gICAgKGEsIGIpID0+XG4gICAgICBOdW1iZXIoYi5zZXNzaW9ucy5zb21lKChzKSA9PiBzLmFjdGl2ZSkpIC0gTnVtYmVyKGEuc2Vzc2lvbnMuc29tZSgocykgPT4gcy5hY3RpdmUpKVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHNlYXJjaEJhclBsYWNlaG9sZGVyPVwiRmlsdGVyIHNlc3Npb25zLi4uXCI+XG4gICAgICB7Z3JvdXBzLmxlbmd0aCA9PT0gMCAmJiAhaXNMb2FkaW5nICYmIChcbiAgICAgICAgPExpc3QuRW1wdHlWaWV3XG4gICAgICAgICAgdGl0bGU9XCJObyBTZXNzaW9ucyBGb3VuZFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJTdGFydCBhIHNlc3Npb24gd2l0aCBgYnVmbyBzZXNzaW9uIHN0YXJ0IDxuYW1lPmAgb3IgdXNlIE5ldyBTZXNzaW9uLlwiXG4gICAgICAgICAgaWNvbj17SWNvbi5EZXNrdG9wfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIHtzb3J0ZWRHcm91cHMubWFwKCh7IHByb2plY3RBbGlhcywgc2Vzc2lvbnMgfSkgPT4gKFxuICAgICAgICA8TGlzdC5TZWN0aW9uXG4gICAgICAgICAga2V5PXtwcm9qZWN0QWxpYXN9XG4gICAgICAgICAgdGl0bGU9e2BAJHtwcm9qZWN0QWxpYXN9YH1cbiAgICAgICAgICBzdWJ0aXRsZT17YCR7c2Vzc2lvbnMubGVuZ3RofSBzZXNzaW9uKHMpYH1cbiAgICAgICAgPlxuICAgICAgICAgIHtzZXNzaW9ucy5tYXAoKHNlc3Npb24pID0+IChcbiAgICAgICAgICAgIDxTZXNzaW9uSXRlbVxuICAgICAgICAgICAgICBrZXk9e2Ake3Byb2plY3RBbGlhc30tJHtzZXNzaW9uLm5hbWV9YH1cbiAgICAgICAgICAgICAgc2Vzc2lvbj17c2Vzc2lvbn1cbiAgICAgICAgICAgICAgcHJvamVjdEFsaWFzPXtwcm9qZWN0QWxpYXN9XG4gICAgICAgICAgICAgIHJldmFsaWRhdGU9e3JldmFsaWRhdGV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cblxuZnVuY3Rpb24gU2Vzc2lvbkl0ZW0oe1xuICBzZXNzaW9uLFxuICBwcm9qZWN0QWxpYXMsXG4gIHJldmFsaWRhdGUsXG59OiB7XG4gIHNlc3Npb246IEJ1Zm9TZXNzaW9uO1xuICBwcm9qZWN0QWxpYXM6IHN0cmluZztcbiAgcmV2YWxpZGF0ZTogKCkgPT4gdm9pZDtcbn0pIHtcbiAgY29uc3Qgc3VidGl0bGUgPSBzZXNzaW9uLnN1bW1hcnkgfHwgc2Vzc2lvbi50eXBlO1xuXG4gIGNvbnN0IGFjY2Vzc29yaWVzOiBMaXN0Lkl0ZW0uQWNjZXNzb3J5W10gPSBbXTtcbiAgaWYgKHNlc3Npb24uYWN0aXZlKSB7XG4gICAgYWNjZXNzb3JpZXMucHVzaCh7IGljb246IHsgc291cmNlOiBJY29uLkNpcmNsZSwgdGludENvbG9yOiBDb2xvci5HcmVlbiB9LCB0b29sdGlwOiBcIkFjdGl2ZVwiIH0pO1xuICB9XG4gIGlmIChzZXNzaW9uLnR5cGUgPT09IFwicmV2aWV3XCIpIHtcbiAgICBhY2Nlc3Nvcmllcy5wdXNoKHsgdGFnOiB7IHZhbHVlOiBcIlJFVklFV1wiLCBjb2xvcjogQ29sb3IuQmx1ZSB9IH0pO1xuICB9IGVsc2UgaWYgKHNlc3Npb24udHlwZSA9PT0gXCJjb3VydFwiKSB7XG4gICAgYWNjZXNzb3JpZXMucHVzaCh7IHRhZzogeyB2YWx1ZTogXCJDT1VSVFwiLCBjb2xvcjogQ29sb3IuUHVycGxlIH0gfSk7XG4gIH1cbiAgaWYgKHNlc3Npb24uaGFzUmV2aWV3T3V0cHV0KSB7XG4gICAgYWNjZXNzb3JpZXMucHVzaCh7IHRhZzogeyB2YWx1ZTogXCJzYXZlZFwiLCBjb2xvcjogQ29sb3IuR3JlZW4gfSB9KTtcbiAgfVxuXG4gIGNvbnN0IGljb24gPSBzZXNzaW9uLmFjdGl2ZVxuICAgID8geyBzb3VyY2U6IEljb24uVGVybWluYWwsIHRpbnRDb2xvcjogQ29sb3IuR3JlZW4gfVxuICAgIDogeyBzb3VyY2U6IEljb24uVGVybWluYWwsIHRpbnRDb2xvcjogQ29sb3IuU2Vjb25kYXJ5VGV4dCB9O1xuXG4gIHJldHVybiAoXG4gICAgPExpc3QuSXRlbVxuICAgICAgdGl0bGU9e3Nlc3Npb24ubmFtZX1cbiAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cbiAgICAgIGljb249e2ljb259XG4gICAgICBhY2Nlc3Nvcmllcz17YWNjZXNzb3JpZXN9XG4gICAgICBhY3Rpb25zPXtcbiAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgIDxBY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICAgICAge3Nlc3Npb24uYWN0aXZlICYmIHNlc3Npb24ubGF5b3V0Py50ZXJtaW5hbF9zaWQgJiYgKFxuICAgICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJGb2N1cyBTZXNzaW9uXCJcbiAgICAgICAgICAgICAgICBpY29uPXtJY29uLkV5ZX1cbiAgICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgZm9jdXNTZXNzaW9uKHNlc3Npb24ubGF5b3V0IS50ZXJtaW5hbF9zaWQpO1xuICAgICAgICAgICAgICAgICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiUmVzdW1lIFNlc3Npb25cIlxuICAgICAgICAgICAgICBpY29uPXtJY29uLlBsYXl9XG4gICAgICAgICAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwib1wiIH19XG4gICAgICAgICAgICAgIG9uQWN0aW9uPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLkFuaW1hdGVkLCB0aXRsZTogXCJSZXN1bWluZyBzZXNzaW9uLi4uXCIgfSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHJ1bkJ1Zm9Bc3luYyhgQCR7cHJvamVjdEFsaWFzfSBzZXNzaW9uIHJlc3VtZSAke3Nlc3Npb24ubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJTZXNzaW9uIHJlc3VtZWRcIiB9KTtcbiAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGUoKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRmFpbGVkIHRvIHJlc3VtZVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBTdHJpbmcoZSksXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWwuU2VjdGlvbj5cbiAgICAgICAgICA8QWN0aW9uUGFuZWwuU2VjdGlvbj5cbiAgICAgICAgICAgIDxBY3Rpb25cbiAgICAgICAgICAgICAgdGl0bGU9XCJDb3B5IFNlc3Npb24gTmFtZVwiXG4gICAgICAgICAgICAgIGljb249e0ljb24uQ2xpcGJvYXJkfVxuICAgICAgICAgICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiXSwga2V5OiBcImJcIiB9fVxuICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IENsaXBib2FyZC5jb3B5KHNlc3Npb24ubmFtZSk7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIlNlc3Npb24gbmFtZSBjb3BpZWRcIiB9KTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICAgIDxBY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICAgICAgPEFjdGlvblxuICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZSBTZXNzaW9uXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5YTWFya0NpcmNsZX1cbiAgICAgICAgICAgICAgc3R5bGU9e0FjdGlvbi5TdHlsZS5EZXN0cnVjdGl2ZX1cbiAgICAgICAgICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIiwgXCJzaGlmdFwiXSwga2V5OiBcImRcIiB9fVxuICAgICAgICAgICAgICBvbkFjdGlvbj17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbmZpcm1BbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBTZXNzaW9uP1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgVGhpcyB3aWxsIHBlcm1hbmVudGx5IGRlbGV0ZSB0aGUgc2Vzc2lvbiBcIiR7c2Vzc2lvbi5uYW1lfVwiIHVuZGVyIEAke3Byb2plY3RBbGlhc30uIFRoaXMgY2Fubm90IGJlIHVuZG9uZS5gLFxuICAgICAgICAgICAgICAgICAgICBwcmltYXJ5QWN0aW9uOiB7IHRpdGxlOiBcIkRlbGV0ZVwiLCBzdHlsZTogQWxlcnQuQWN0aW9uU3R5bGUuRGVzdHJ1Y3RpdmUgfSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuQW5pbWF0ZWQsIHRpdGxlOiBcIkRlbGV0aW5nIHNlc3Npb24uLi5cIiB9KTtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgXCJ5XFxuXCIgYXMgc3RkaW4gdG8gYnlwYXNzIHRoZSBpbnRlcmFjdGl2ZSB5L04gY29uZmlybWF0aW9uIHByb21wdCBpbiB0aGUgQ0xJXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJ1bkJ1Zm9Bc3luYyhgQCR7cHJvamVjdEFsaWFzfSBzZXNzaW9uIGRlbGV0ZSAke3Nlc3Npb24ubmFtZX1gLCBcInlcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5TdWNjZXNzLCB0aXRsZTogXCJTZXNzaW9uIGRlbGV0ZWRcIiB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkRlbGV0ZSBmYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBTdHJpbmcoZSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgfVxuICAgIC8+XG4gICk7XG59XG4iLCAidmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXF1YWwoZm9vLCBiYXIpIHtcblx0dmFyIGN0b3IsIGxlbjtcblx0aWYgKGZvbyA9PT0gYmFyKSByZXR1cm4gdHJ1ZTtcblxuXHRpZiAoZm9vICYmIGJhciAmJiAoY3Rvcj1mb28uY29uc3RydWN0b3IpID09PSBiYXIuY29uc3RydWN0b3IpIHtcblx0XHRpZiAoY3RvciA9PT0gRGF0ZSkgcmV0dXJuIGZvby5nZXRUaW1lKCkgPT09IGJhci5nZXRUaW1lKCk7XG5cdFx0aWYgKGN0b3IgPT09IFJlZ0V4cCkgcmV0dXJuIGZvby50b1N0cmluZygpID09PSBiYXIudG9TdHJpbmcoKTtcblxuXHRcdGlmIChjdG9yID09PSBBcnJheSkge1xuXHRcdFx0aWYgKChsZW49Zm9vLmxlbmd0aCkgPT09IGJhci5sZW5ndGgpIHtcblx0XHRcdFx0d2hpbGUgKGxlbi0tICYmIGRlcXVhbChmb29bbGVuXSwgYmFyW2xlbl0pKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBsZW4gPT09IC0xO1xuXHRcdH1cblxuXHRcdGlmICghY3RvciB8fCB0eXBlb2YgZm9vID09PSAnb2JqZWN0Jykge1xuXHRcdFx0bGVuID0gMDtcblx0XHRcdGZvciAoY3RvciBpbiBmb28pIHtcblx0XHRcdFx0aWYgKGhhcy5jYWxsKGZvbywgY3RvcikgJiYgKytsZW4gJiYgIWhhcy5jYWxsKGJhciwgY3RvcikpIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWYgKCEoY3RvciBpbiBiYXIpIHx8ICFkZXF1YWwoZm9vW2N0b3JdLCBiYXJbY3Rvcl0pKSByZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoYmFyKS5sZW5ndGggPT09IGxlbjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZm9vICE9PSBmb28gJiYgYmFyICE9PSBiYXI7XG59XG4iLCAiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJub2RlXCIgLz5cblxuZXhwb3J0IHsgdXNlUHJvbWlzZSB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcbmV4cG9ydCB7IHVzZUNhY2hlZFN0YXRlIH0gZnJvbSBcIi4vdXNlQ2FjaGVkU3RhdGVcIjtcbmV4cG9ydCB7IHVzZUNhY2hlZFByb21pc2UgfSBmcm9tIFwiLi91c2VDYWNoZWRQcm9taXNlXCI7XG5leHBvcnQgeyB1c2VGZXRjaCB9IGZyb20gXCIuL3VzZUZldGNoXCI7XG5leHBvcnQgeyB1c2VFeGVjIH0gZnJvbSBcIi4vdXNlRXhlY1wiO1xuZXhwb3J0IHsgdXNlU3RyZWFtSlNPTiB9IGZyb20gXCIuL3VzZVN0cmVhbUpTT05cIjtcbmV4cG9ydCB7IHVzZVNRTCB9IGZyb20gXCIuL3VzZVNRTFwiO1xuZXhwb3J0IHsgdXNlRm9ybSwgRm9ybVZhbGlkYXRpb24gfSBmcm9tIFwiLi91c2VGb3JtXCI7XG5leHBvcnQgeyB1c2VBSSB9IGZyb20gXCIuL3VzZUFJXCI7XG5leHBvcnQgeyB1c2VGcmVjZW5jeVNvcnRpbmcgfSBmcm9tIFwiLi91c2VGcmVjZW5jeVNvcnRpbmdcIjtcbmV4cG9ydCB7IHVzZUxvY2FsU3RvcmFnZSB9IGZyb20gXCIuL3VzZUxvY2FsU3RvcmFnZVwiO1xuXG5leHBvcnQgeyBnZXRBdmF0YXJJY29uLCBnZXRGYXZpY29uLCBnZXRQcm9ncmVzc0ljb24gfSBmcm9tIFwiLi9pY29uXCI7XG5cbmV4cG9ydCB7IE9BdXRoU2VydmljZSwgd2l0aEFjY2Vzc1Rva2VuLCBnZXRBY2Nlc3NUb2tlbiB9IGZyb20gXCIuL29hdXRoXCI7XG5cbmV4cG9ydCB7IGNyZWF0ZURlZXBsaW5rLCBjcmVhdGVFeHRlbnNpb25EZWVwbGluaywgY3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rLCBEZWVwbGlua1R5cGUgfSBmcm9tIFwiLi9jcmVhdGVEZWVwbGlua1wiO1xuZXhwb3J0IHsgZXhlY3V0ZVNRTCB9IGZyb20gXCIuL2V4ZWN1dGVTUUxcIjtcbmV4cG9ydCB7IHJ1bkFwcGxlU2NyaXB0IH0gZnJvbSBcIi4vcnVuLWFwcGxlc2NyaXB0XCI7XG5leHBvcnQgeyBydW5Qb3dlclNoZWxsU2NyaXB0IH0gZnJvbSBcIi4vcnVuLXBvd2Vyc2hlbGwtc2NyaXB0XCI7XG5leHBvcnQgeyBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIi4vc2hvd0ZhaWx1cmVUb2FzdFwiO1xuZXhwb3J0IHsgd2l0aENhY2hlIH0gZnJvbSBcIi4vY2FjaGVcIjtcblxuZXhwb3J0IHR5cGUgeyBQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcbmV4cG9ydCB0eXBlIHsgQ2FjaGVkUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VDYWNoZWRQcm9taXNlXCI7XG5leHBvcnQgdHlwZSB7XG4gIE9BdXRoU2VydmljZU9wdGlvbnMsXG4gIE9uQXV0aG9yaXplUGFyYW1zLFxuICBXaXRoQWNjZXNzVG9rZW5Db21wb25lbnRPckZuLFxuICBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucyxcbiAgUHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwiLi9vYXV0aFwiO1xuZXhwb3J0IHR5cGUgeyBBc3luY1N0YXRlLCBNdXRhdGVQcm9taXNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrLCBSZWZPYmplY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudmlyb25tZW50LCBMYXVuY2hUeXBlLCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHVzZURlZXBNZW1vIH0gZnJvbSBcIi4vdXNlRGVlcE1lbW9cIjtcbmltcG9ydCB7XG4gIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSxcbiAgTXV0YXRlUHJvbWlzZSxcbiAgVXNlUHJvbWlzZVJldHVyblR5cGUsXG4gIEFzeW5jU3RhdGUsXG4gIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSxcbiAgVW53cmFwUmV0dXJuLFxuICBQYWdpbmF0aW9uT3B0aW9ucyxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCIuL3Nob3dGYWlsdXJlVG9hc3RcIjtcblxuZXhwb3J0IHR5cGUgUHJvbWlzZU9wdGlvbnM8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSB8IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZT4gPSB7XG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byBhbiBgQWJvcnRDb250cm9sbGVyYCB0byBjYW5jZWwgYSBwcmV2aW91cyBjYWxsIHdoZW4gdHJpZ2dlcmluZyBhIG5ldyBvbmVcbiAgICovXG4gIGFib3J0YWJsZT86IFJlZk9iamVjdDxBYm9ydENvbnRyb2xsZXIgfCBudWxsIHwgdW5kZWZpbmVkPjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gYWN0dWFsbHkgZXhlY3V0ZSB0aGUgZnVuY3Rpb24gb3Igbm90LlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3IgY2FzZXMgd2hlcmUgb25lIG9mIHRoZSBmdW5jdGlvbidzIGFyZ3VtZW50cyBkZXBlbmRzIG9uIHNvbWV0aGluZyB0aGF0XG4gICAqIG1pZ2h0IG5vdCBiZSBhdmFpbGFibGUgcmlnaHQgYXdheSAoZm9yIGV4YW1wbGUsIGRlcGVuZHMgb24gc29tZSB1c2VyIGlucHV0cykuIEJlY2F1c2UgUmVhY3QgcmVxdWlyZXNcbiAgICogZXZlcnkgaG9va3MgdG8gYmUgZGVmaW5lZCBvbiB0aGUgcmVuZGVyLCB0aGlzIGZsYWcgZW5hYmxlcyB5b3UgdG8gZGVmaW5lIHRoZSBob29rIHJpZ2h0IGF3YXkgYnV0XG4gICAqIHdhaXQgdXRpbCB5b3UgaGF2ZSBhbGwgdGhlIGFyZ3VtZW50cyByZWFkeSB0byBleGVjdXRlIHRoZSBmdW5jdGlvbi5cbiAgICovXG4gIGV4ZWN1dGU/OiBib29sZWFuO1xuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIGdlbmVyaWMgZmFpbHVyZSB0b2FzdC5cbiAgICogSXQgYWxsb3dzIHlvdSB0byBjdXN0b21pemUgdGhlIHRpdGxlLCBtZXNzYWdlLCBhbmQgcHJpbWFyeSBhY3Rpb24gb2YgdGhlIGZhaWx1cmUgdG9hc3QuXG4gICAqL1xuICBmYWlsdXJlVG9hc3RPcHRpb25zPzogUGFydGlhbDxQaWNrPFRvYXN0Lk9wdGlvbnMsIFwidGl0bGVcIiB8IFwicHJpbWFyeUFjdGlvblwiIHwgXCJtZXNzYWdlXCI+PjtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV4ZWN1dGlvbiBmYWlscy4gQnkgZGVmYXVsdCBpdCB3aWxsIGxvZyB0aGUgZXJyb3IgYW5kIHNob3dcbiAgICogYSBnZW5lcmljIGZhaWx1cmUgdG9hc3QuXG4gICAqL1xuICBvbkVycm9yPzogKGVycm9yOiBFcnJvcikgPT4gdm9pZCB8IFByb21pc2U8dm9pZD47XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBleGVjdXRpb24gc3VjY2VlZHMuXG4gICAqL1xuICBvbkRhdGE/OiAoZGF0YTogVW53cmFwUmV0dXJuPFQ+LCBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbk9wdGlvbnM8VW53cmFwUmV0dXJuPFQ+PikgPT4gdm9pZCB8IFByb21pc2U8dm9pZD47XG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiBhbiBleGVjdXRpb24gd2lsbCBzdGFydFxuICAgKi9cbiAgb25XaWxsRXhlY3V0ZT86IChwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJzPFQ+KSA9PiB2b2lkO1xufTtcblxuLyoqXG4gKiBXcmFwcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIGluIGFub3RoZXIgZnVuY3Rpb24sIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmVtYXJrIFRoaXMgb3ZlcmxvYWQgc2hvdWxkIGJlIHVzZWQgd2hlbiB3b3JraW5nIHdpdGggcGFnaW5hdGVkIGRhdGEgc291cmNlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBzZXRUaW1lb3V0IH0gZnJvbSBcIm5vZGU6dGltZXJzL3Byb21pc2VzXCI7XG4gKiBpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuICogaW1wb3J0IHsgTGlzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZVByb21pc2UgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAqXG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCBwYWdpbmF0aW9uIH0gPSB1c2VQcm9taXNlKFxuICogICAgIChzZWFyY2hUZXh0OiBzdHJpbmcpID0+IGFzeW5jIChvcHRpb25zOiB7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gKiAgICAgICBhd2FpdCBzZXRUaW1lb3V0KDIwMCk7XG4gKiAgICAgICBjb25zdCBuZXdEYXRhID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjUgfSwgKF92LCBpbmRleCkgPT4gKHtcbiAqICAgICAgICAgaW5kZXgsXG4gKiAgICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZSxcbiAqICAgICAgICAgdGV4dDogc2VhcmNoVGV4dCxcbiAqICAgICAgIH0pKTtcbiAqICAgICAgIHJldHVybiB7IGRhdGE6IG5ld0RhdGEsIGhhc01vcmU6IG9wdGlvbnMucGFnZSA8IDEwIH07XG4gKiAgICAgfSxcbiAqICAgICBbc2VhcmNoVGV4dF1cbiAqICAgKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IG9uU2VhcmNoVGV4dENoYW5nZT17c2V0U2VhcmNoVGV4dH0gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0+XG4gKiAgICAgICB7ZGF0YT8ubWFwKChpdGVtKSA9PiAoXG4gKiAgICAgICAgIDxMaXN0Lkl0ZW1cbiAqICAgICAgICAgICBrZXk9e2Ake2l0ZW0ucGFnZX0gJHtpdGVtLmluZGV4fSAke2l0ZW0udGV4dH1gfVxuICogICAgICAgICAgIHRpdGxlPXtgUGFnZSAke2l0ZW0ucGFnZX0gSXRlbSAke2l0ZW0uaW5kZXh9YH1cbiAqICAgICAgICAgICBzdWJ0aXRsZT17aXRlbS50ZXh0fVxuICogICAgICAgICAvPlxuICogICAgICAgKSl9XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPFtdPj4oXG4gIGZuOiBULFxuKTogVXNlUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U+KFxuICBmbjogVCxcbiAgYXJnczogUGFyYW1ldGVyczxUPixcbiAgb3B0aW9ucz86IFByb21pc2VPcHRpb25zPFQ+LFxuKTogVXNlUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+PjtcblxuLyoqXG4gKiBXcmFwcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmdW5jdGlvbi5cbiAqXG4gKiBAcmVtYXJrIFRoZSBmdW5jdGlvbiBpcyBhc3N1bWVkIHRvIGJlIGNvbnN0YW50IChlZy4gY2hhbmdpbmcgaXQgd29uJ3QgdHJpZ2dlciBhIHJldmFsaWRhdGlvbikuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgdXNlUHJvbWlzZSB9IGZyb20gJ0ByYXljYXN0L3V0aWxzJztcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPigpO1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcmV2YWxpZGF0ZSB9ID0gdXNlUHJvbWlzZShhc3luYyAodXJsOiBzdHJpbmcpID0+IHtcbiAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwgfSk7XG4gKiAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICogICAgIHJldHVybiByZXN1bHRcbiAqICAgfSxcbiAqICAgWydodHRwczovL2FwaS5leGFtcGxlJ10sXG4gKiAgIHtcbiAqICAgICBhYm9ydGFibGVcbiAqICAgfSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxEZXRhaWxcbiAqICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxuICogICAgICAgbWFya2Rvd249e2RhdGF9XG4gKiAgICAgICBhY3Rpb25zPXtcbiAqICAgICAgICAgPEFjdGlvblBhbmVsPlxuICogICAgICAgICAgIDxBY3Rpb24gdGl0bGU9XCJSZWxvYWRcIiBvbkFjdGlvbj17KCkgPT4gcmV2YWxpZGF0ZSgpfSAvPlxuICogICAgICAgICA8L0FjdGlvblBhbmVsPlxuICogICAgICAgfVxuICogICAgIC8+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2U8W10+PihmbjogVCk6IFVzZVByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPj47XG5leHBvcnQgZnVuY3Rpb24gdXNlUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlPihcbiAgZm46IFQsXG4gIGFyZ3M6IFBhcmFtZXRlcnM8VD4sXG4gIG9wdGlvbnM/OiBQcm9taXNlT3B0aW9uczxUPixcbik6IFVzZVByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2UgfCBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U+KFxuICBmbjogVCxcbiAgYXJncz86IFBhcmFtZXRlcnM8VD4sXG4gIG9wdGlvbnM/OiBQcm9taXNlT3B0aW9uczxUPixcbik6IFVzZVByb21pc2VSZXR1cm5UeXBlPGFueT4ge1xuICBjb25zdCBsYXN0Q2FsbElkID0gdXNlUmVmKDApO1xuICBjb25zdCBbc3RhdGUsIHNldF0gPSB1c2VTdGF0ZTxBc3luY1N0YXRlPFVud3JhcFJldHVybjxUPj4+KHsgaXNMb2FkaW5nOiB0cnVlIH0pO1xuXG4gIGNvbnN0IGZuUmVmID0gdXNlTGF0ZXN0KGZuKTtcbiAgY29uc3QgbGF0ZXN0QWJvcnRhYmxlID0gdXNlTGF0ZXN0KG9wdGlvbnM/LmFib3J0YWJsZSk7XG4gIGNvbnN0IGxhdGVzdEFyZ3MgPSB1c2VMYXRlc3QoYXJncyB8fCBbXSk7XG4gIGNvbnN0IGxhdGVzdE9uRXJyb3IgPSB1c2VMYXRlc3Qob3B0aW9ucz8ub25FcnJvcik7XG4gIGNvbnN0IGxhdGVzdE9uRGF0YSA9IHVzZUxhdGVzdChvcHRpb25zPy5vbkRhdGEpO1xuICBjb25zdCBsYXRlc3RPbldpbGxFeGVjdXRlID0gdXNlTGF0ZXN0KG9wdGlvbnM/Lm9uV2lsbEV4ZWN1dGUpO1xuICBjb25zdCBsYXRlc3RGYWlsdXJlVG9hc3QgPSB1c2VMYXRlc3Qob3B0aW9ucz8uZmFpbHVyZVRvYXN0T3B0aW9ucyk7XG4gIGNvbnN0IGxhdGVzdFZhbHVlID0gdXNlTGF0ZXN0KHN0YXRlLmRhdGEpO1xuICBjb25zdCBsYXRlc3RDYWxsYmFjayA9IHVzZVJlZjwoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4gUHJvbWlzZTxVbndyYXBSZXR1cm48VD4+PihudWxsKTtcblxuICBjb25zdCBwYWdpbmF0aW9uQXJnc1JlZiA9IHVzZVJlZjxQYWdpbmF0aW9uT3B0aW9ucz4oeyBwYWdlOiAwIH0pO1xuICBjb25zdCB1c2VQYWdpbmF0aW9uUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgaGFzTW9yZVJlZiA9IHVzZVJlZih0cnVlKTtcbiAgY29uc3QgcGFnZVNpemVSZWYgPSB1c2VSZWYoNTApO1xuXG4gIGNvbnN0IGFib3J0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChsYXRlc3RBYm9ydGFibGUuY3VycmVudCkge1xuICAgICAgbGF0ZXN0QWJvcnRhYmxlLmN1cnJlbnQuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGxhdGVzdEFib3J0YWJsZS5jdXJyZW50LmN1cnJlbnQgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgfVxuICAgIHJldHVybiArK2xhc3RDYWxsSWQuY3VycmVudDtcbiAgfSwgW2xhdGVzdEFib3J0YWJsZV0pO1xuXG4gIGNvbnN0IGNhbGxiYWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKC4uLmFyZ3M6IFBhcmFtZXRlcnM8VD4pOiBQcm9taXNlPFVud3JhcFJldHVybjxUPj4gPT4ge1xuICAgICAgY29uc3QgY2FsbElkID0gYWJvcnQoKTtcblxuICAgICAgbGF0ZXN0T25XaWxsRXhlY3V0ZS5jdXJyZW50Py4oYXJncyk7XG5cbiAgICAgIHNldCgocHJldlN0YXRlKSA9PiAoeyAuLi5wcmV2U3RhdGUsIGlzTG9hZGluZzogdHJ1ZSB9KSk7XG5cbiAgICAgIGNvbnN0IHByb21pc2VPclBhZ2luYXRlZFByb21pc2UgPSBiaW5kUHJvbWlzZUlmTmVlZGVkKGZuUmVmLmN1cnJlbnQpKC4uLmFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjogYW55KSB7XG4gICAgICAgIGlmIChlcnJvci5uYW1lID09IFwiQWJvcnRFcnJvclwiKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxJZCA9PT0gbGFzdENhbGxJZC5jdXJyZW50KSB7XG4gICAgICAgICAgLy8gaGFuZGxlIGVycm9yc1xuICAgICAgICAgIGlmIChsYXRlc3RPbkVycm9yLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGxhdGVzdE9uRXJyb3IuY3VycmVudChlcnJvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlbnZpcm9ubWVudC5sYXVuY2hUeXBlICE9PSBMYXVuY2hUeXBlLkJhY2tncm91bmQpIHtcbiAgICAgICAgICAgICAgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIkZhaWxlZCB0byBmZXRjaCBsYXRlc3QgZGF0YVwiLFxuICAgICAgICAgICAgICAgIHByaW1hcnlBY3Rpb246IHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlJldHJ5XCIsXG4gICAgICAgICAgICAgICAgICBvbkFjdGlvbih0b2FzdCkge1xuICAgICAgICAgICAgICAgICAgICB0b2FzdC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGxhdGVzdENhbGxiYWNrLmN1cnJlbnQ/LiguLi4oKGxhdGVzdEFyZ3MuY3VycmVudCB8fCBbXSkgYXMgUGFyYW1ldGVyczxUPikpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLmxhdGVzdEZhaWx1cmVUb2FzdC5jdXJyZW50LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0KHsgZXJyb3IsIGlzTG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgcHJvbWlzZU9yUGFnaW5hdGVkUHJvbWlzZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHVzZVBhZ2luYXRpb25SZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybiBwcm9taXNlT3JQYWdpbmF0ZWRQcm9taXNlKHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQpLnRoZW4oXG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0b28gY29tcGxpY2F0ZWQgZm9yIFRTXG4gICAgICAgICAgKHsgZGF0YSwgaGFzTW9yZSwgY3Vyc29yIH06IHsgZGF0YTogVW53cmFwUmV0dXJuPFQ+OyBoYXNNb3JlOiBib29sZWFuOyBjdXJzb3I/OiBhbnkgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxJZCA9PT0gbGFzdENhbGxJZC5jdXJyZW50KSB7XG4gICAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5jdXJzb3IgPSBjdXJzb3I7XG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5sYXN0SXRlbSA9IGRhdGE/LltkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGxhdGVzdE9uRGF0YS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgbGF0ZXN0T25EYXRhLmN1cnJlbnQoZGF0YSwgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaGFzTW9yZSkge1xuICAgICAgICAgICAgICAgIHBhZ2VTaXplUmVmLmN1cnJlbnQgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBoYXNNb3JlO1xuXG4gICAgICAgICAgICAgIHNldCgocHJldmlvdXNEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQucGFnZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YSwgaXNMb2FkaW5nOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdlIGtub3cgaXQncyBhbiBhcnJheSBoZXJlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogKHByZXZpb3VzRGF0YS5kYXRhIHx8IFtdKT8uY29uY2F0KGRhdGEpLCBpc0xvYWRpbmc6IGZhbHNlIH07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvcjogdW5rbm93bikgPT4ge1xuICAgICAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gaGFuZGxlRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIH0sXG4gICAgICAgICkgYXMgUHJvbWlzZTxVbndyYXBSZXR1cm48VD4+O1xuICAgICAgfVxuXG4gICAgICB1c2VQYWdpbmF0aW9uUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgIHJldHVybiBwcm9taXNlT3JQYWdpbmF0ZWRQcm9taXNlLnRoZW4oKGRhdGE6IFVud3JhcFJldHVybjxUPikgPT4ge1xuICAgICAgICBpZiAoY2FsbElkID09PSBsYXN0Q2FsbElkLmN1cnJlbnQpIHtcbiAgICAgICAgICBpZiAobGF0ZXN0T25EYXRhLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGxhdGVzdE9uRGF0YS5jdXJyZW50KGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXQoeyBkYXRhLCBpc0xvYWRpbmc6IGZhbHNlIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICB9LCBoYW5kbGVFcnJvcikgYXMgUHJvbWlzZTxVbndyYXBSZXR1cm48VD4+O1xuICAgIH0sXG4gICAgW1xuICAgICAgbGF0ZXN0T25EYXRhLFxuICAgICAgbGF0ZXN0T25FcnJvcixcbiAgICAgIGxhdGVzdEFyZ3MsXG4gICAgICBmblJlZixcbiAgICAgIHNldCxcbiAgICAgIGxhdGVzdENhbGxiYWNrLFxuICAgICAgbGF0ZXN0T25XaWxsRXhlY3V0ZSxcbiAgICAgIHBhZ2luYXRpb25BcmdzUmVmLFxuICAgICAgbGF0ZXN0RmFpbHVyZVRvYXN0LFxuICAgICAgYWJvcnQsXG4gICAgXSxcbiAgKTtcblxuICBsYXRlc3RDYWxsYmFjay5jdXJyZW50ID0gY2FsbGJhY2s7XG5cbiAgY29uc3QgcmV2YWxpZGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAvLyByZXNldCB0aGUgcGFnaW5hdGlvblxuICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQgPSB7IHBhZ2U6IDAgfTtcblxuICAgIGNvbnN0IGFyZ3MgPSAobGF0ZXN0QXJncy5jdXJyZW50IHx8IFtdKSBhcyBQYXJhbWV0ZXJzPFQ+O1xuICAgIHJldHVybiBjYWxsYmFjayguLi5hcmdzKTtcbiAgfSwgW2NhbGxiYWNrLCBsYXRlc3RBcmdzXSk7XG5cbiAgY29uc3QgbXV0YXRlID0gdXNlQ2FsbGJhY2s8TXV0YXRlUHJvbWlzZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+LCB1bmRlZmluZWQ+PihcbiAgICBhc3luYyAoYXN5bmNVcGRhdGUsIG9wdGlvbnMpID0+IHtcbiAgICAgIGxldCBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZTogQXdhaXRlZDxSZXR1cm5UeXBlPFQ+PiB8IHVuZGVmaW5lZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChvcHRpb25zPy5vcHRpbWlzdGljVXBkYXRlKSB7XG4gICAgICAgICAgLy8gY2FuY2VsIHRoZSBpbi1mbGlnaHQgcmVxdWVzdCB0byBtYWtlIHN1cmUgaXQgd29uJ3Qgb3ZlcndyaXRlIHRoZSBvcHRpbWlzdGljIHVwZGF0ZVxuICAgICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gXCJmdW5jdGlvblwiICYmIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGRhdGEgYmVmb3JlIHRoZSBvcHRpbWlzdGljIHVwZGF0ZSxcbiAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGlmIHdlIG5lZWQgaXQgKGVnLiBvbmx5IHdoZW4gd2Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHJvbGxiYWNrIGFmdGVyKVxuICAgICAgICAgICAgZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGUgPSBzdHJ1Y3R1cmVkQ2xvbmUobGF0ZXN0VmFsdWUuY3VycmVudD8udmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1cGRhdGUgPSBvcHRpb25zLm9wdGltaXN0aWNVcGRhdGU7XG4gICAgICAgICAgc2V0KChwcmV2U3RhdGUpID0+ICh7IC4uLnByZXZTdGF0ZSwgZGF0YTogdXBkYXRlKHByZXZTdGF0ZS5kYXRhKSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IGFzeW5jVXBkYXRlO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zdCB1cGRhdGUgPSBvcHRpb25zLnJvbGxiYWNrT25FcnJvcjtcbiAgICAgICAgICBzZXQoKHByZXZTdGF0ZSkgPT4gKHsgLi4ucHJldlN0YXRlLCBkYXRhOiB1cGRhdGUocHJldlN0YXRlLmRhdGEpIH0pKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zPy5vcHRpbWlzdGljVXBkYXRlICYmIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXQoKHByZXZTdGF0ZSkgPT4gKHsgLi4ucHJldlN0YXRlLCBkYXRhOiBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKG9wdGlvbnM/LnNob3VsZFJldmFsaWRhdGVBZnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpZiAoZW52aXJvbm1lbnQubGF1bmNoVHlwZSA9PT0gTGF1bmNoVHlwZS5CYWNrZ3JvdW5kIHx8IGVudmlyb25tZW50LmNvbW1hbmRNb2RlID09PSBcIm1lbnUtYmFyXCIpIHtcbiAgICAgICAgICAgIC8vIHdoZW4gaW4gdGhlIGJhY2tncm91bmQgb3IgaW4gYSBtZW51IGJhciwgd2UgYXJlIGdvaW5nIHRvIGF3YWl0IHRoZSByZXZhbGlkYXRpb25cbiAgICAgICAgICAgIC8vIHRvIG1ha2Ugc3VyZSB3ZSBnZXQgdGhlIHJpZ2h0IGRhdGEgYXQgdGhlIGVuZCBvZiB0aGUgbXV0YXRpb25cbiAgICAgICAgICAgIGF3YWl0IHJldmFsaWRhdGUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgW3JldmFsaWRhdGUsIGxhdGVzdFZhbHVlLCBzZXQsIGFib3J0XSxcbiAgKTtcblxuICBjb25zdCBvbkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQucGFnZSArPSAxO1xuICAgIGNvbnN0IGFyZ3MgPSAobGF0ZXN0QXJncy5jdXJyZW50IHx8IFtdKSBhcyBQYXJhbWV0ZXJzPFQ+O1xuICAgIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICB9LCBbcGFnaW5hdGlvbkFyZ3NSZWYsIGxhdGVzdEFyZ3MsIGNhbGxiYWNrXSk7XG5cbiAgLy8gcmV2YWxpZGF0ZSB3aGVuIHRoZSBhcmdzIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIHJlc2V0IHRoZSBwYWdpbmF0aW9uXG4gICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCA9IHsgcGFnZTogMCB9O1xuXG4gICAgaWYgKG9wdGlvbnM/LmV4ZWN1dGUgIT09IGZhbHNlKSB7XG4gICAgICBjYWxsYmFjayguLi4oKGFyZ3MgfHwgW10pIGFzIFBhcmFtZXRlcnM8VD4pKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY2FuY2VsIHRoZSBwcmV2aW91cyByZXF1ZXN0IGlmIHdlIGRvbid0IHdhbnQgdG8gZXhlY3V0ZSBhbnltb3JlXG4gICAgICBhYm9ydCgpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFt1c2VEZWVwTWVtbyhbYXJncywgb3B0aW9ucz8uZXhlY3V0ZSwgY2FsbGJhY2tdKSwgbGF0ZXN0QWJvcnRhYmxlLCBwYWdpbmF0aW9uQXJnc1JlZl0pO1xuXG4gIC8vIGFib3J0IHJlcXVlc3Qgd2hlbiB1bm1vdW50aW5nXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2Fib3J0XSk7XG5cbiAgLy8gd2Ugb25seSB3YW50IHRvIHNob3cgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGlmIHRoZSBwcm9taXNlIGlzIGV4ZWN1dGluZ1xuICBjb25zdCBpc0xvYWRpbmcgPSBvcHRpb25zPy5leGVjdXRlICE9PSBmYWxzZSA/IHN0YXRlLmlzTG9hZGluZyA6IGZhbHNlO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgbG9hZGluZyBpcyBoYXMgc29tZSBmaXhlZCB2YWx1ZSBpbiB0aGUgZW51bSB3aGljaFxuICBjb25zdCBzdGF0ZVdpdGhMb2FkaW5nRml4ZWQ6IEFzeW5jU3RhdGU8QXdhaXRlZDxSZXR1cm5UeXBlPFQ+Pj4gPSB7IC4uLnN0YXRlLCBpc0xvYWRpbmcgfTtcblxuICBjb25zdCBwYWdpbmF0aW9uID0gdXNlUGFnaW5hdGlvblJlZi5jdXJyZW50XG4gICAgPyB7XG4gICAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZVJlZi5jdXJyZW50LFxuICAgICAgICBoYXNNb3JlOiBoYXNNb3JlUmVmLmN1cnJlbnQsXG4gICAgICAgIG9uTG9hZE1vcmUsXG4gICAgICB9XG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIHsgLi4uc3RhdGVXaXRoTG9hZGluZ0ZpeGVkLCByZXZhbGlkYXRlLCBtdXRhdGUsIHBhZ2luYXRpb24gfTtcbn1cblxuLyoqIEJpbmQgdGhlIGZuIGlmIGl0J3MgYSBQcm9taXNlIG1ldGhvZCAqL1xuZnVuY3Rpb24gYmluZFByb21pc2VJZk5lZWRlZDxUPihmbjogVCk6IFQge1xuICBpZiAoZm4gPT09IChQcm9taXNlLmFsbCBhcyBhbnkpKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGlzIGlzIGZpbmVcbiAgICByZXR1cm4gZm4uYmluZChQcm9taXNlKTtcbiAgfVxuICBpZiAoZm4gPT09IChQcm9taXNlLnJhY2UgYXMgYW55KSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhpcyBpcyBmaW5lXG4gICAgcmV0dXJuIGZuLmJpbmQoUHJvbWlzZSk7XG4gIH1cbiAgaWYgKGZuID09PSAoUHJvbWlzZS5yZXNvbHZlIGFzIGFueSkpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRoaXMgaXMgZmluZVxuICAgIHJldHVybiBmbi5iaW5kKFByb21pc2UgYXMgYW55KTtcbiAgfVxuICBpZiAoZm4gPT09IChQcm9taXNlLnJlamVjdCBhcyBhbnkpKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGlzIGlzIGZpbmVcbiAgICByZXR1cm4gZm4uYmluZChQcm9taXNlKTtcbiAgfVxuICByZXR1cm4gZm47XG59XG4iLCAiaW1wb3J0IHsgdXNlUmVmLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZXF1YWwgfSBmcm9tIFwiZGVxdWFsL2xpdGVcIjtcblxuLyoqXG4gKiBAcGFyYW0gdmFsdWUgdGhlIHZhbHVlIHRvIGJlIG1lbW9pemVkICh1c3VhbGx5IGEgZGVwZW5kZW5jeSBsaXN0KVxuICogQHJldHVybnMgYSBtZW1vaXplZCB2ZXJzaW9uIG9mIHRoZSB2YWx1ZSBhcyBsb25nIGFzIGl0IHJlbWFpbnMgZGVlcGx5IGVxdWFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWVwTWVtbzxUPih2YWx1ZTogVCkge1xuICBjb25zdCByZWYgPSB1c2VSZWY8VD4odmFsdWUpO1xuICBjb25zdCBzaWduYWxSZWYgPSB1c2VSZWY8bnVtYmVyPigwKTtcblxuICBpZiAoIWRlcXVhbCh2YWx1ZSwgcmVmLmN1cnJlbnQpKSB7XG4gICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICBzaWduYWxSZWYuY3VycmVudCArPSAxO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICByZXR1cm4gdXNlTWVtbygoKSA9PiByZWYuY3VycmVudCwgW3NpZ25hbFJlZi5jdXJyZW50XSk7XG59XG4iLCAiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbGF0ZXN0IHN0YXRlLlxuICpcbiAqIFRoaXMgaXMgbW9zdGx5IHVzZWZ1bCB0byBnZXQgYWNjZXNzIHRvIHRoZSBsYXRlc3QgdmFsdWUgb2Ygc29tZSBwcm9wcyBvciBzdGF0ZSBpbnNpZGUgYW4gYXN5bmNocm9ub3VzIGNhbGxiYWNrLCBpbnN0ZWFkIG9mIHRoYXQgdmFsdWUgYXQgdGhlIHRpbWUgdGhlIGNhbGxiYWNrIHdhcyBjcmVhdGVkIGZyb20uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VMYXRlc3Q8VD4odmFsdWU6IFQpOiB7IHJlYWRvbmx5IGN1cnJlbnQ6IFQgfSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZih2YWx1ZSk7XG4gIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gIHJldHVybiByZWY7XG59XG4iLCAiaW1wb3J0ICogYXMgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgQ2xpcGJvYXJkLCBlbnZpcm9ubWVudCwgb3BlbiwgVG9hc3QsIHNob3dUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcblxuLyoqXG4gKiBTaG93cyBhIGZhaWx1cmUgVG9hc3QgZm9yIGEgZ2l2ZW4gRXJyb3IuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IHNob3dIVUQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyBydW5BcHBsZVNjcmlwdCwgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAqICAgdHJ5IHtcbiAqICAgICBjb25zdCByZXMgPSBhd2FpdCBydW5BcHBsZVNjcmlwdChcbiAqICAgICAgIGBcbiAqICAgICAgIG9uIHJ1biBhcmd2XG4gKiAgICAgICAgIHJldHVybiBcImhlbGxvLCBcIiAmIGl0ZW0gMSBvZiBhcmd2ICYgXCIuXCJcbiAqICAgICAgIGVuZCBydW5cbiAqICAgICAgIGAsXG4gKiAgICAgICBbXCJ3b3JsZFwiXVxuICogICAgICk7XG4gKiAgICAgYXdhaXQgc2hvd0hVRChyZXMpO1xuICogICB9IGNhdGNoIChlcnJvcikge1xuICogICAgIHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHsgdGl0bGU6IFwiQ291bGQgbm90IHJ1biBBcHBsZVNjcmlwdFwiIH0pO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dGYWlsdXJlVG9hc3QoXG4gIGVycm9yOiB1bmtub3duLFxuICBvcHRpb25zPzogUGFydGlhbDxQaWNrPFRvYXN0Lk9wdGlvbnMsIFwidGl0bGVcIiB8IFwicHJpbWFyeUFjdGlvblwiIHwgXCJtZXNzYWdlXCI+Pixcbikge1xuICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpO1xuICByZXR1cm4gc2hvd1RvYXN0KHtcbiAgICBzdHlsZTogVG9hc3QuU3R5bGUuRmFpbHVyZSxcbiAgICB0aXRsZTogb3B0aW9ucz8udGl0bGUgPz8gXCJTb21ldGhpbmcgd2VudCB3cm9uZ1wiLFxuICAgIG1lc3NhZ2U6IG9wdGlvbnM/Lm1lc3NhZ2UgPz8gbWVzc2FnZSxcbiAgICBwcmltYXJ5QWN0aW9uOiBvcHRpb25zPy5wcmltYXJ5QWN0aW9uID8/IGhhbmRsZUVycm9yVG9hc3RBY3Rpb24oZXJyb3IpLFxuICAgIHNlY29uZGFyeUFjdGlvbjogb3B0aW9ucz8ucHJpbWFyeUFjdGlvbiA/IGhhbmRsZUVycm9yVG9hc3RBY3Rpb24oZXJyb3IpIDogdW5kZWZpbmVkLFxuICB9KTtcbn1cblxuY29uc3QgaGFuZGxlRXJyb3JUb2FzdEFjdGlvbiA9IChlcnJvcjogdW5rbm93bik6IFRvYXN0LkFjdGlvbk9wdGlvbnMgPT4ge1xuICBsZXQgcHJpdmF0ZUV4dGVuc2lvbiA9IHRydWU7XG4gIGxldCB0aXRsZSA9IFwiW0V4dGVuc2lvbiBOYW1lXS4uLlwiO1xuICBsZXQgZXh0ZW5zaW9uVVJMID0gXCJcIjtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYWNrYWdlSlNPTiA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihlbnZpcm9ubWVudC5hc3NldHNQYXRoLCBcIi4uXCIsIFwicGFja2FnZS5qc29uXCIpLCBcInV0ZjhcIikpO1xuICAgIHRpdGxlID0gYFske3BhY2thZ2VKU09OLnRpdGxlfV0uLi5gO1xuICAgIGV4dGVuc2lvblVSTCA9IGBodHRwczovL3JheWNhc3QuY29tLyR7cGFja2FnZUpTT04ub3duZXIgfHwgcGFja2FnZUpTT04uYXV0aG9yfS8ke3BhY2thZ2VKU09OLm5hbWV9YDtcbiAgICBpZiAoIXBhY2thZ2VKU09OLm93bmVyIHx8IHBhY2thZ2VKU09OLmFjY2VzcyA9PT0gXCJwdWJsaWNcIikge1xuICAgICAgcHJpdmF0ZUV4dGVuc2lvbiA9IGZhbHNlO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gbm8tb3BcbiAgfVxuXG4gIC8vIGlmIGl0J3MgYSBwcml2YXRlIGV4dGVuc2lvbiwgd2UgY2FuJ3QgY29uc3RydWN0IHRoZSBVUkwgdG8gcmVwb3J0IHRoZSBlcnJvclxuICAvLyBzbyB3ZSBmYWxsYmFjayB0byBjb3B5aW5nIHRoZSBlcnJvciB0byB0aGUgY2xpcGJvYXJkXG4gIGNvbnN0IGZhbGxiYWNrID0gZW52aXJvbm1lbnQuaXNEZXZlbG9wbWVudCB8fCBwcml2YXRlRXh0ZW5zaW9uO1xuXG4gIGNvbnN0IHN0YWNrID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yPy5zdGFjayB8fCBlcnJvcj8ubWVzc2FnZSB8fCBcIlwiIDogU3RyaW5nKGVycm9yKTtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiBmYWxsYmFjayA/IFwiQ29weSBMb2dzXCIgOiBcIlJlcG9ydCBFcnJvclwiLFxuICAgIG9uQWN0aW9uKHRvYXN0KSB7XG4gICAgICB0b2FzdC5oaWRlKCk7XG4gICAgICBpZiAoZmFsbGJhY2spIHtcbiAgICAgICAgQ2xpcGJvYXJkLmNvcHkoc3RhY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlbihcbiAgICAgICAgICBgaHR0cHM6Ly9naXRodWIuY29tL3JheWNhc3QvZXh0ZW5zaW9ucy9pc3N1ZXMvbmV3PyZsYWJlbHM9ZXh0ZW5zaW9uJTJDYnVnJnRlbXBsYXRlPWV4dGVuc2lvbl9idWdfcmVwb3J0LnltbCZ0aXRsZT0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICl9JmV4dGVuc2lvbi11cmw9JHtlbmNvZGVVUkkoZXh0ZW5zaW9uVVJMKX0mZGVzY3JpcHRpb249JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICBgIyMjIyBFcnJvcjpcblxcYFxcYFxcYFxuJHtzdGFja31cblxcYFxcYFxcYFxuYCxcbiAgICAgICAgICApfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiwgdXNlU3luY0V4dGVybmFsU3RvcmUsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhY2hlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyByZXBsYWNlciwgcmV2aXZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuY29uc3Qgcm9vdENhY2hlID0gLyogI19fUFVSRV9fICovIFN5bWJvbChcImNhY2hlIHdpdGhvdXQgbmFtZXNwYWNlXCIpO1xuY29uc3QgY2FjaGVNYXAgPSAvKiAjX19QVVJFX18gKi8gbmV3IE1hcDxzdHJpbmcgfCBzeW1ib2wsIENhY2hlPigpO1xuXG4vKipcbiAqIFJldHVybnMgYSBzdGF0ZWZ1bCB2YWx1ZSwgYW5kIGEgZnVuY3Rpb24gdG8gdXBkYXRlIGl0LiBUaGUgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEByZW1hcmsgVGhlIHZhbHVlIG5lZWRzIHRvIGJlIEpTT04gc2VyaWFsaXphYmxlLlxuICpcbiAqIEBwYXJhbSBrZXkgLSBUaGUgdW5pcXVlIGlkZW50aWZpZXIgb2YgdGhlIHN0YXRlLiBUaGlzIGNhbiBiZSB1c2VkIHRvIHNoYXJlIHRoZSBzdGF0ZSBhY3Jvc3MgY29tcG9uZW50cyBhbmQvb3IgY29tbWFuZHMuXG4gKiBAcGFyYW0gaW5pdGlhbFN0YXRlIC0gVGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIHN0YXRlIGlmIHRoZXJlIGFyZW4ndCBhbnkgaW4gdGhlIENhY2hlIHlldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFN0YXRlPFQ+KFxuICBrZXk6IHN0cmluZyxcbiAgaW5pdGlhbFN0YXRlOiBULFxuICBjb25maWc/OiB7IGNhY2hlTmFtZXNwYWNlPzogc3RyaW5nIH0sXG4pOiBbVCwgRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+XTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRTdGF0ZTxUID0gdW5kZWZpbmVkPihrZXk6IHN0cmluZyk6IFtUIHwgdW5kZWZpbmVkLCBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxUIHwgdW5kZWZpbmVkPj5dO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFN0YXRlPFQ+KFxuICBrZXk6IHN0cmluZyxcbiAgaW5pdGlhbFN0YXRlPzogVCxcbiAgY29uZmlnPzogeyBjYWNoZU5hbWVzcGFjZT86IHN0cmluZyB9LFxuKTogW1QsIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFQ+Pl0ge1xuICBjb25zdCBjYWNoZUtleSA9IGNvbmZpZz8uY2FjaGVOYW1lc3BhY2UgfHwgcm9vdENhY2hlO1xuICBjb25zdCBjYWNoZSA9XG4gICAgY2FjaGVNYXAuZ2V0KGNhY2hlS2V5KSB8fCBjYWNoZU1hcC5zZXQoY2FjaGVLZXksIG5ldyBDYWNoZSh7IG5hbWVzcGFjZTogY29uZmlnPy5jYWNoZU5hbWVzcGFjZSB9KSkuZ2V0KGNhY2hlS2V5KTtcblxuICBpZiAoIWNhY2hlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBjYWNoZVwiKTtcbiAgfVxuXG4gIGNvbnN0IGtleVJlZiA9IHVzZUxhdGVzdChrZXkpO1xuICBjb25zdCBpbml0aWFsVmFsdWVSZWYgPSB1c2VMYXRlc3QoaW5pdGlhbFN0YXRlKTtcblxuICBjb25zdCBjYWNoZWRTdGF0ZSA9IHVzZVN5bmNFeHRlcm5hbFN0b3JlKGNhY2hlLnN1YnNjcmliZSwgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleVJlZi5jdXJyZW50KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkNvdWxkIG5vdCBnZXQgQ2FjaGUgZGF0YTpcIiwgZXJyb3IpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHN0YXRlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBjYWNoZWRTdGF0ZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgaWYgKGNhY2hlZFN0YXRlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShjYWNoZWRTdGF0ZSwgcmV2aXZlcik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gdGhlIGRhdGEgZ290IGNvcnJ1cHRlZCBzb21laG93XG4gICAgICAgIGNvbnNvbGUud2FybihcIlRoZSBjYWNoZWQgZGF0YSBpcyBjb3JydXB0ZWRcIiwgZXJyKTtcbiAgICAgICAgcmV0dXJuIGluaXRpYWxWYWx1ZVJlZi5jdXJyZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaW5pdGlhbFZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgfVxuICB9LCBbY2FjaGVkU3RhdGUsIGluaXRpYWxWYWx1ZVJlZl0pO1xuXG4gIGNvbnN0IHN0YXRlUmVmID0gdXNlTGF0ZXN0KHN0YXRlKTtcblxuICBjb25zdCBzZXRTdGF0ZUFuZENhY2hlID0gdXNlQ2FsbGJhY2soXG4gICAgKHVwZGF0ZXI6IFNldFN0YXRlQWN0aW9uPFQ+KSA9PiB7XG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRTIHN0cnVnZ2xlcyB0byBpbmZlciB0aGUgdHlwZXMgYXMgVCBjb3VsZCBwb3RlbnRpYWxseSBiZSBhIGZ1bmN0aW9uXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IHR5cGVvZiB1cGRhdGVyID09PSBcImZ1bmN0aW9uXCIgPyB1cGRhdGVyKHN0YXRlUmVmLmN1cnJlbnQpIDogdXBkYXRlcjtcbiAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgY2FjaGUuc2V0KGtleVJlZi5jdXJyZW50LCBcInVuZGVmaW5lZFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ2lmaWVkVmFsdWUgPSBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSwgcmVwbGFjZXIpO1xuICAgICAgICBjYWNoZS5zZXQoa2V5UmVmLmN1cnJlbnQsIHN0cmluZ2lmaWVkVmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH0sXG4gICAgW2NhY2hlLCBrZXlSZWYsIHN0YXRlUmVmXSxcbiAgKTtcblxuICByZXR1cm4gW3N0YXRlLCBzZXRTdGF0ZUFuZENhY2hlXTtcbn1cbiIsICJpbXBvcnQgY3J5cHRvIGZyb20gXCJub2RlOmNyeXB0b1wiO1xuaW1wb3J0IHsgdHlwZUhhc2hlciB9IGZyb20gXCIuL3ZlbmRvcnMvdHlwZS1oYXNoZXJcIjtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlcih0aGlzOiBhbnksIGtleTogc3RyaW5nLCBfdmFsdWU6IHVua25vd24pIHtcbiAgY29uc3QgdmFsdWUgPSB0aGlzW2tleV07XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICByZXR1cm4gYF9fcmF5Y2FzdF9jYWNoZWRfZGF0ZV9fJHt2YWx1ZS50b0lTT1N0cmluZygpfWA7XG4gIH1cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gYF9fcmF5Y2FzdF9jYWNoZWRfYnVmZmVyX18ke3ZhbHVlLnRvU3RyaW5nKFwiYmFzZTY0XCIpfWA7XG4gIH1cbiAgcmV0dXJuIF92YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJldml2ZXIoX2tleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bikge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnN0YXJ0c1dpdGgoXCJfX3JheWNhc3RfY2FjaGVkX2RhdGVfX1wiKSkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh2YWx1ZS5yZXBsYWNlKFwiX19yYXljYXN0X2NhY2hlZF9kYXRlX19cIiwgXCJcIikpO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUuc3RhcnRzV2l0aChcIl9fcmF5Y2FzdF9jYWNoZWRfYnVmZmVyX19cIikpIHtcbiAgICByZXR1cm4gQnVmZmVyLmZyb20odmFsdWUucmVwbGFjZShcIl9fcmF5Y2FzdF9jYWNoZWRfYnVmZmVyX19cIiwgXCJcIiksIFwiYmFzZTY0XCIpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc2gob2JqZWN0OiBhbnkpIHtcbiAgY29uc3QgaGFzaGluZ1N0cmVhbSA9IGNyeXB0by5jcmVhdGVIYXNoKFwic2hhMVwiKTtcbiAgY29uc3QgaGFzaGVyID0gdHlwZUhhc2hlcihoYXNoaW5nU3RyZWFtKTtcbiAgaGFzaGVyLmRpc3BhdGNoKG9iamVjdCk7XG5cbiAgcmV0dXJuIGhhc2hpbmdTdHJlYW0uZGlnZXN0KFwiaGV4XCIpO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbmltcG9ydCBjcnlwdG8gZnJvbSBcIm5vZGU6Y3J5cHRvXCI7XG5cbi8qKiBDaGVjayBpZiB0aGUgZ2l2ZW4gZnVuY3Rpb24gaXMgYSBuYXRpdmUgZnVuY3Rpb24gKi9cbmZ1bmN0aW9uIGlzTmF0aXZlRnVuY3Rpb24oZjogYW55KSB7XG4gIGlmICh0eXBlb2YgZiAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGV4cCA9IC9eZnVuY3Rpb25cXHMrXFx3KlxccypcXChcXHMqXFwpXFxzKntcXHMrXFxbbmF0aXZlIGNvZGVcXF1cXHMrfSQvaTtcbiAgcmV0dXJuIGV4cC5leGVjKEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGYpKSAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaGFzaFJlcGxhY2VyKHZhbHVlOiBhbnkpOiBzdHJpbmcge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlSGFzaGVyKFxuICB3cml0ZVRvOlxuICAgIHwgY3J5cHRvLkhhc2hcbiAgICB8IHtcbiAgICAgICAgYnVmOiBzdHJpbmc7XG4gICAgICAgIHdyaXRlOiAoYjogYW55KSA9PiB2b2lkO1xuICAgICAgICBlbmQ6IChiOiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIHJlYWQ6ICgpID0+IHN0cmluZztcbiAgICAgIH0sXG4gIGNvbnRleHQ6IGFueVtdID0gW10sXG4pIHtcbiAgZnVuY3Rpb24gd3JpdGUoc3RyOiBzdHJpbmcpIHtcbiAgICBpZiAoXCJ1cGRhdGVcIiBpbiB3cml0ZVRvKSB7XG4gICAgICByZXR1cm4gd3JpdGVUby51cGRhdGUoc3RyLCBcInV0ZjhcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3cml0ZVRvLndyaXRlKHN0cik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaDogZnVuY3Rpb24gKHZhbHVlOiBhbnkpIHtcbiAgICAgIHZhbHVlID0gaGFzaFJlcGxhY2VyKHZhbHVlKTtcblxuICAgICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzW1wiX251bGxcIl0oKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpc1tcIl9cIiArIHR5cGVdKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIF9vYmplY3Q6IGZ1bmN0aW9uIChvYmplY3Q6IGFueSkge1xuICAgICAgY29uc3QgcGF0dGVybiA9IC9cXFtvYmplY3QgKC4qKVxcXS9pO1xuICAgICAgY29uc3Qgb2JqU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCk7XG4gICAgICBsZXQgb2JqVHlwZSA9IHBhdHRlcm4uZXhlYyhvYmpTdHJpbmcpPy5bMV0gPz8gXCJ1bmtub3duOltcIiArIG9ialN0cmluZyArIFwiXVwiO1xuICAgICAgb2JqVHlwZSA9IG9ialR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgbGV0IG9iamVjdE51bWJlciA9IG51bGwgYXMgYW55O1xuXG4gICAgICBpZiAoKG9iamVjdE51bWJlciA9IGNvbnRleHQuaW5kZXhPZihvYmplY3QpKSA+PSAwKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goXCJbQ0lSQ1VMQVI6XCIgKyBvYmplY3ROdW1iZXIgKyBcIl1cIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQucHVzaChvYmplY3QpO1xuICAgICAgfVxuXG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICAgICAgd3JpdGUoXCJidWZmZXI6XCIpO1xuICAgICAgICByZXR1cm4gd3JpdGUob2JqZWN0LnRvU3RyaW5nKFwidXRmOFwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmpUeXBlICE9PSBcIm9iamVjdFwiICYmIG9ialR5cGUgIT09IFwiZnVuY3Rpb25cIiAmJiBvYmpUeXBlICE9PSBcImFzeW5jZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICh0aGlzW1wiX1wiICsgb2JqVHlwZV0pIHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgdGhpc1tcIl9cIiArIG9ialR5cGVdKG9iamVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG9iamVjdCB0eXBlIFwiJyArIG9ialR5cGUgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAgICAgICBrZXlzID0ga2V5cy5zb3J0KCk7XG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0byBpbmNvcnBvcmF0ZSBzcGVjaWFsIHByb3BlcnRpZXMsIHNvXG4gICAgICAgIC8vIFR5cGVzIHdpdGggZGlmZmVyZW50IHByb3RvdHlwZXMgd2lsbCBwcm9kdWNlXG4gICAgICAgIC8vIGEgZGlmZmVyZW50IGhhc2ggYW5kIG9iamVjdHMgZGVyaXZlZCBmcm9tXG4gICAgICAgIC8vIGRpZmZlcmVudCBmdW5jdGlvbnMgKGBuZXcgRm9vYCwgYG5ldyBCYXJgKSB3aWxsXG4gICAgICAgIC8vIHByb2R1Y2UgZGlmZmVyZW50IGhhc2hlcy5cbiAgICAgICAgLy8gV2UgbmV2ZXIgZG8gdGhpcyBmb3IgbmF0aXZlIGZ1bmN0aW9ucyBzaW5jZSBzb21lXG4gICAgICAgIC8vIHNlZW0gdG8gYnJlYWsgYmVjYXVzZSBvZiB0aGF0LlxuICAgICAgICBpZiAoIWlzTmF0aXZlRnVuY3Rpb24ob2JqZWN0KSkge1xuICAgICAgICAgIGtleXMuc3BsaWNlKDAsIDAsIFwicHJvdG90eXBlXCIsIFwiX19wcm90b19fXCIsIFwiY29uc3RydWN0b3JcIik7XG4gICAgICAgIH1cblxuICAgICAgICB3cml0ZShcIm9iamVjdDpcIiArIGtleXMubGVuZ3RoICsgXCI6XCIpO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgc2VsZi5kaXNwYXRjaChrZXkpO1xuICAgICAgICAgIHdyaXRlKFwiOlwiKTtcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoKG9iamVjdFtrZXldKTtcbiAgICAgICAgICB3cml0ZShcIixcIik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgX2FycmF5OiBmdW5jdGlvbiAoYXJyOiBhbnlbXSwgdW5vcmRlcmVkOiBib29sZWFuKSB7XG4gICAgICB1bm9yZGVyZWQgPSB0eXBlb2YgdW5vcmRlcmVkICE9PSBcInVuZGVmaW5lZFwiID8gdW5vcmRlcmVkIDogZmFsc2U7IC8vIGRlZmF1bHQgdG8gb3B0aW9ucy51bm9yZGVyZWRBcnJheXNcblxuICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICB3cml0ZShcImFycmF5OlwiICsgYXJyLmxlbmd0aCArIFwiOlwiKTtcbiAgICAgIGlmICghdW5vcmRlcmVkIHx8IGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoZW50cnk6IGFueSkge1xuICAgICAgICAgIHNlbGYuZGlzcGF0Y2goZW50cnkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgdW5vcmRlcmVkIGNhc2UgaXMgYSBsaXR0bGUgbW9yZSBjb21wbGljYXRlZDpcbiAgICAgIC8vIHNpbmNlIHRoZXJlIGlzIG5vIGNhbm9uaWNhbCBvcmRlcmluZyBvbiBvYmplY3RzLFxuICAgICAgLy8gaS5lLiB7YToxfSA8IHthOjJ9IGFuZCB7YToxfSA+IHthOjJ9IGFyZSBib3RoIGZhbHNlLFxuICAgICAgLy8gd2UgZmlyc3Qgc2VyaWFsaXplIGVhY2ggZW50cnkgdXNpbmcgYSBQYXNzVGhyb3VnaCBzdHJlYW1cbiAgICAgIC8vIGJlZm9yZSBzb3J0aW5nLlxuICAgICAgLy8gYWxzbzogd2UgY2Fu4oCZdCB1c2UgdGhlIHNhbWUgY29udGV4dCBhcnJheSBmb3IgYWxsIGVudHJpZXNcbiAgICAgIC8vIHNpbmNlIHRoZSBvcmRlciBvZiBoYXNoaW5nIHNob3VsZCAqbm90KiBtYXR0ZXIuIGluc3RlYWQsXG4gICAgICAvLyB3ZSBrZWVwIHRyYWNrIG9mIHRoZSBhZGRpdGlvbnMgdG8gYSBjb3B5IG9mIHRoZSBjb250ZXh0IGFycmF5XG4gICAgICAvLyBhbmQgYWRkIGFsbCBvZiB0aGVtIHRvIHRoZSBnbG9iYWwgY29udGV4dCBhcnJheSB3aGVuIHdl4oCZcmUgZG9uZVxuICAgICAgbGV0IGNvbnRleHRBZGRpdGlvbnM6IGFueVtdID0gW107XG4gICAgICBjb25zdCBlbnRyaWVzID0gYXJyLm1hcChmdW5jdGlvbiAoZW50cnk6IGFueSkge1xuICAgICAgICBjb25zdCBzdHJtID0gUGFzc1Rocm91Z2goKTtcbiAgICAgICAgY29uc3QgbG9jYWxDb250ZXh0ID0gY29udGV4dC5zbGljZSgpOyAvLyBtYWtlIGNvcHlcbiAgICAgICAgY29uc3QgaGFzaGVyID0gdHlwZUhhc2hlcihzdHJtLCBsb2NhbENvbnRleHQpO1xuICAgICAgICBoYXNoZXIuZGlzcGF0Y2goZW50cnkpO1xuICAgICAgICAvLyB0YWtlIG9ubHkgd2hhdCB3YXMgYWRkZWQgdG8gbG9jYWxDb250ZXh0IGFuZCBhcHBlbmQgaXQgdG8gY29udGV4dEFkZGl0aW9uc1xuICAgICAgICBjb250ZXh0QWRkaXRpb25zID0gY29udGV4dEFkZGl0aW9ucy5jb25jYXQobG9jYWxDb250ZXh0LnNsaWNlKGNvbnRleHQubGVuZ3RoKSk7XG4gICAgICAgIHJldHVybiBzdHJtLnJlYWQoKS50b1N0cmluZygpO1xuICAgICAgfSk7XG4gICAgICBjb250ZXh0ID0gY29udGV4dC5jb25jYXQoY29udGV4dEFkZGl0aW9ucyk7XG4gICAgICBlbnRyaWVzLnNvcnQoKTtcbiAgICAgIHRoaXMuX2FycmF5KGVudHJpZXMsIGZhbHNlKTtcbiAgICB9LFxuICAgIF9kYXRlOiBmdW5jdGlvbiAoZGF0ZTogRGF0ZSkge1xuICAgICAgd3JpdGUoXCJkYXRlOlwiICsgZGF0ZS50b0pTT04oKSk7XG4gICAgfSxcbiAgICBfc3ltYm9sOiBmdW5jdGlvbiAoc3ltOiBzeW1ib2wpIHtcbiAgICAgIHdyaXRlKFwic3ltYm9sOlwiICsgc3ltLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX2Vycm9yOiBmdW5jdGlvbiAoZXJyOiBFcnJvcikge1xuICAgICAgd3JpdGUoXCJlcnJvcjpcIiArIGVyci50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9ib29sZWFuOiBmdW5jdGlvbiAoYm9vbDogYm9vbGVhbikge1xuICAgICAgd3JpdGUoXCJib29sOlwiICsgYm9vbC50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9zdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmc6IHN0cmluZykge1xuICAgICAgd3JpdGUoXCJzdHJpbmc6XCIgKyBzdHJpbmcubGVuZ3RoICsgXCI6XCIpO1xuICAgICAgd3JpdGUoc3RyaW5nLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX2Z1bmN0aW9uOiBmdW5jdGlvbiAoZm46IGFueSkge1xuICAgICAgd3JpdGUoXCJmbjpcIik7XG4gICAgICBpZiAoaXNOYXRpdmVGdW5jdGlvbihmbikpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChcIltuYXRpdmVdXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChmbi50b1N0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWFrZSBzdXJlIHdlIGNhbiBzdGlsbCBkaXN0aW5ndWlzaCBuYXRpdmUgZnVuY3Rpb25zXG4gICAgICAvLyBieSB0aGVpciBuYW1lLCBvdGhlcndpc2UgU3RyaW5nIGFuZCBGdW5jdGlvbiB3aWxsXG4gICAgICAvLyBoYXZlIHRoZSBzYW1lIGhhc2hcbiAgICAgIHRoaXMuZGlzcGF0Y2goXCJmdW5jdGlvbi1uYW1lOlwiICsgU3RyaW5nKGZuLm5hbWUpKTtcblxuICAgICAgdGhpcy5fb2JqZWN0KGZuKTtcbiAgICB9LFxuICAgIF9udW1iZXI6IGZ1bmN0aW9uIChudW1iZXI6IG51bWJlcikge1xuICAgICAgd3JpdGUoXCJudW1iZXI6XCIgKyBudW1iZXIudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfeG1sOiBmdW5jdGlvbiAoeG1sOiBhbnkpIHtcbiAgICAgIHdyaXRlKFwieG1sOlwiICsgeG1sLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX251bGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiTnVsbFwiKTtcbiAgICB9LFxuICAgIF91bmRlZmluZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiVW5kZWZpbmVkXCIpO1xuICAgIH0sXG4gICAgX3JlZ2V4cDogZnVuY3Rpb24gKHJlZ2V4OiBSZWdFeHApIHtcbiAgICAgIHdyaXRlKFwicmVnZXg6XCIgKyByZWdleC50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF91aW50OGFycmF5OiBmdW5jdGlvbiAoYXJyOiBVaW50OEFycmF5KSB7XG4gICAgICB3cml0ZShcInVpbnQ4YXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF91aW50OGNsYW1wZWRhcnJheTogZnVuY3Rpb24gKGFycjogVWludDhDbGFtcGVkQXJyYXkpIHtcbiAgICAgIHdyaXRlKFwidWludDhjbGFtcGVkYXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9pbnQ4YXJyYXk6IGZ1bmN0aW9uIChhcnI6IEludDhBcnJheSkge1xuICAgICAgd3JpdGUoXCJpbnQ4YXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF91aW50MTZhcnJheTogZnVuY3Rpb24gKGFycjogVWludDE2QXJyYXkpIHtcbiAgICAgIHdyaXRlKFwidWludDE2YXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9pbnQxNmFycmF5OiBmdW5jdGlvbiAoYXJyOiBJbnQxNkFycmF5KSB7XG4gICAgICB3cml0ZShcImludDE2YXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF91aW50MzJhcnJheTogZnVuY3Rpb24gKGFycjogVWludDMyQXJyYXkpIHtcbiAgICAgIHdyaXRlKFwidWludDMyYXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9pbnQzMmFycmF5OiBmdW5jdGlvbiAoYXJyOiBJbnQzMkFycmF5KSB7XG4gICAgICB3cml0ZShcImludDMyYXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9mbG9hdDMyYXJyYXk6IGZ1bmN0aW9uIChhcnI6IEZsb2F0MzJBcnJheSkge1xuICAgICAgd3JpdGUoXCJmbG9hdDMyYXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9mbG9hdDY0YXJyYXk6IGZ1bmN0aW9uIChhcnI6IEZsb2F0NjRBcnJheSkge1xuICAgICAgd3JpdGUoXCJmbG9hdDY0YXJyYXk6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpKTtcbiAgICB9LFxuICAgIF9hcnJheWJ1ZmZlcjogZnVuY3Rpb24gKGFycjogQXJyYXlCdWZmZXIpIHtcbiAgICAgIHdyaXRlKFwiYXJyYXlidWZmZXI6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChuZXcgVWludDhBcnJheShhcnIpKTtcbiAgICB9LFxuICAgIF91cmw6IGZ1bmN0aW9uICh1cmw6IFVSTCkge1xuICAgICAgd3JpdGUoXCJ1cmw6XCIgKyB1cmwudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfbWFwOiBmdW5jdGlvbiAobWFwOiBNYXA8YW55LCBhbnk+KSB7XG4gICAgICB3cml0ZShcIm1hcDpcIik7XG4gICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKG1hcCk7XG4gICAgICB0aGlzLl9hcnJheShhcnIsIHRydWUpO1xuICAgIH0sXG4gICAgX3NldDogZnVuY3Rpb24gKHNldDogU2V0PGFueT4pIHtcbiAgICAgIHdyaXRlKFwic2V0OlwiKTtcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20oc2V0KTtcbiAgICAgIHRoaXMuX2FycmF5KGFyciwgdHJ1ZSk7XG4gICAgfSxcbiAgICBfZmlsZTogZnVuY3Rpb24gKGZpbGU6IGFueSkge1xuICAgICAgd3JpdGUoXCJmaWxlOlwiKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2goW2ZpbGUubmFtZSwgZmlsZS5zaXplLCBmaWxlLnR5cGUsIGZpbGUubGFzdE1vZGlmaWVkXSk7XG4gICAgfSxcbiAgICBfYmxvYjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIFwiSGFzaGluZyBCbG9iIG9iamVjdHMgaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWRcXG5cIiArXG4gICAgICAgICAgXCIoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wdWxlb3Mvb2JqZWN0LWhhc2gvaXNzdWVzLzI2KVxcblwiICtcbiAgICAgICAgICAnVXNlIFwib3B0aW9ucy5yZXBsYWNlclwiIG9yIFwib3B0aW9ucy5pZ25vcmVVbmtub3duXCJcXG4nLFxuICAgICAgKTtcbiAgICB9LFxuICAgIF9kb213aW5kb3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiZG9td2luZG93XCIpO1xuICAgIH0sXG4gICAgX2JpZ2ludDogZnVuY3Rpb24gKG51bWJlcjogYmlnaW50KSB7XG4gICAgICB3cml0ZShcImJpZ2ludDpcIiArIG51bWJlci50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIC8qIE5vZGUuanMgc3RhbmRhcmQgbmF0aXZlIG9iamVjdHMgKi9cbiAgICBfcHJvY2VzczogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJwcm9jZXNzXCIpO1xuICAgIH0sXG4gICAgX3RpbWVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInRpbWVyXCIpO1xuICAgIH0sXG4gICAgX3BpcGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwicGlwZVwiKTtcbiAgICB9LFxuICAgIF90Y3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwidGNwXCIpO1xuICAgIH0sXG4gICAgX3VkcDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ1ZHBcIik7XG4gICAgfSxcbiAgICBfdHR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInR0eVwiKTtcbiAgICB9LFxuICAgIF9zdGF0d2F0Y2hlcjogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJzdGF0d2F0Y2hlclwiKTtcbiAgICB9LFxuICAgIF9zZWN1cmVjb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInNlY3VyZWNvbnRleHRcIik7XG4gICAgfSxcbiAgICBfY29ubmVjdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJjb25uZWN0aW9uXCIpO1xuICAgIH0sXG4gICAgX3psaWI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiemxpYlwiKTtcbiAgICB9LFxuICAgIF9jb250ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImNvbnRleHRcIik7XG4gICAgfSxcbiAgICBfbm9kZXNjcmlwdDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJub2Rlc2NyaXB0XCIpO1xuICAgIH0sXG4gICAgX2h0dHBwYXJzZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiaHR0cHBhcnNlclwiKTtcbiAgICB9LFxuICAgIF9kYXRhdmlldzogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJkYXRhdmlld1wiKTtcbiAgICB9LFxuICAgIF9zaWduYWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwic2lnbmFsXCIpO1xuICAgIH0sXG4gICAgX2ZzZXZlbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiZnNldmVudFwiKTtcbiAgICB9LFxuICAgIF90bHN3cmFwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInRsc3dyYXBcIik7XG4gICAgfSxcbiAgfTtcbn1cblxuLy8gTWluaS1pbXBsZW1lbnRhdGlvbiBvZiBzdHJlYW0uUGFzc1Rocm91Z2hcbi8vIFdlIGFyZSBmYXIgZnJvbSBoYXZpbmcgbmVlZCBmb3IgdGhlIGZ1bGwgaW1wbGVtZW50YXRpb24sIGFuZCB3ZSBjYW5cbi8vIG1ha2UgYXNzdW1wdGlvbnMgbGlrZSBcIm1hbnkgd3JpdGVzLCB0aGVuIG9ubHkgb25lIGZpbmFsIHJlYWRcIlxuLy8gYW5kIHdlIGNhbiBpZ25vcmUgZW5jb2Rpbmcgc3BlY2lmaWNzXG5mdW5jdGlvbiBQYXNzVGhyb3VnaCgpIHtcbiAgcmV0dXJuIHtcbiAgICBidWY6IFwiXCIsXG5cbiAgICB3cml0ZTogZnVuY3Rpb24gKGI6IHN0cmluZykge1xuICAgICAgdGhpcy5idWYgKz0gYjtcbiAgICB9LFxuXG4gICAgZW5kOiBmdW5jdGlvbiAoYjogc3RyaW5nKSB7XG4gICAgICB0aGlzLmJ1ZiArPSBiO1xuICAgIH0sXG5cbiAgICByZWFkOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5idWY7XG4gICAgfSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7XG4gIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSxcbiAgVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGUsXG4gIE11dGF0ZVByb21pc2UsXG4gIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSxcbiAgVW53cmFwUmV0dXJuLFxuICBQYWdpbmF0aW9uT3B0aW9ucyxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IHVzZUNhY2hlZFN0YXRlIH0gZnJvbSBcIi4vdXNlQ2FjaGVkU3RhdGVcIjtcbmltcG9ydCB7IHVzZVByb21pc2UsIFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyBoYXNoIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG4vLyBTeW1ib2wgdG8gZGlmZmVyZW50aWF0ZSBhbiBlbXB0eSBjYWNoZSBmcm9tIGB1bmRlZmluZWRgXG5jb25zdCBlbXB0eUNhY2hlID0gLyogI19fUFVSRV9fICovIFN5bWJvbCgpO1xuXG5leHBvcnQgdHlwZSBDYWNoZWRQcm9taXNlT3B0aW9uczxcbiAgVCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSB8IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSxcbiAgVSxcbj4gPSBQcm9taXNlT3B0aW9uczxUPiAmIHtcbiAgLyoqXG4gICAqIFRoZSBpbml0aWFsIGRhdGEgaWYgdGhlcmUgYXJlbid0IGFueSBpbiB0aGUgQ2FjaGUgeWV0LlxuICAgKi9cbiAgaW5pdGlhbERhdGE/OiBVO1xuICAvKipcbiAgICogVGVsbHMgdGhlIGhvb2sgdG8ga2VlcCB0aGUgcHJldmlvdXMgcmVzdWx0cyBpbnN0ZWFkIG9mIHJldHVybmluZyB0aGUgaW5pdGlhbCB2YWx1ZVxuICAgKiBpZiB0aGVyZSBhcmVuJ3QgYW55IGluIHRoZSBjYWNoZSBmb3IgdGhlIG5ldyBhcmd1bWVudHMuXG4gICAqIFRoaXMgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCB3aGVuIHVzZWQgZm9yIGRhdGEgZm9yIGEgTGlzdCB0byBhdm9pZCBmbGlja2VyaW5nLlxuICAgKi9cbiAga2VlcFByZXZpb3VzRGF0YT86IGJvb2xlYW47XG59O1xuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgaW4gYW5vdGhlciBmdW5jdGlvbiwgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZ1bmN0aW9uLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQHJlbWFyayBUaGlzIG92ZXJsb2FkIHNob3VsZCBiZSB1c2VkIHdoZW4gd29ya2luZyB3aXRoIHBhZ2luYXRlZCBkYXRhIHNvdXJjZXMuXG4gKiBAcmVtYXJrIFdoZW4gcGFnaW5hdGluZywgb25seSB0aGUgZmlyc3QgcGFnZSB3aWxsIGJlIGNhY2hlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBzZXRUaW1lb3V0IH0gZnJvbSBcIm5vZGU6dGltZXJzL3Byb21pc2VzXCI7XG4gKiBpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuICogaW1wb3J0IHsgTGlzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZUNhY2hlZFByb21pc2UgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAqXG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCBwYWdpbmF0aW9uIH0gPSB1c2VDYWNoZWRQcm9taXNlKFxuICogICAgIChzZWFyY2hUZXh0OiBzdHJpbmcpID0+IGFzeW5jIChvcHRpb25zOiB7IHBhZ2U6IG51bWJlciB9KSA9PiB7XG4gKiAgICAgICBhd2FpdCBzZXRUaW1lb3V0KDIwMCk7XG4gKiAgICAgICBjb25zdCBuZXdEYXRhID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjUgfSwgKF92LCBpbmRleCkgPT4gKHtcbiAqICAgICAgICAgaW5kZXgsXG4gKiAgICAgICAgIHBhZ2U6IG9wdGlvbnMucGFnZSxcbiAqICAgICAgICAgdGV4dDogc2VhcmNoVGV4dCxcbiAqICAgICAgIH0pKTtcbiAqICAgICAgIHJldHVybiB7IGRhdGE6IG5ld0RhdGEsIGhhc01vcmU6IG9wdGlvbnMucGFnZSA8IDEwIH07XG4gKiAgICAgfSxcbiAqICAgICBbc2VhcmNoVGV4dF0sXG4gKiAgICk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBvblNlYXJjaFRleHRDaGFuZ2U9e3NldFNlYXJjaFRleHR9IHBhZ2luYXRpb249e3BhZ2luYXRpb259PlxuICogICAgICAge2RhdGE/Lm1hcCgoaXRlbSkgPT4gKFxuICogICAgICAgICA8TGlzdC5JdGVtXG4gKiAgICAgICAgICAga2V5PXtgJHtpdGVtLnBhZ2V9ICR7aXRlbS5pbmRleH0gJHtpdGVtLnRleHR9YH1cbiAqICAgICAgICAgICB0aXRsZT17YFBhZ2UgJHtpdGVtLnBhZ2V9IEl0ZW0gJHtpdGVtLmluZGV4fWB9XG4gKiAgICAgICAgICAgc3VidGl0bGU9e2l0ZW0udGV4dH1cbiAqICAgICAgICAgLz5cbiAqICAgICAgICkpfVxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPFtdPj4oXG4gIGZuOiBULFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+LCB1bmRlZmluZWQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgVSBleHRlbmRzIGFueVtdID0gYW55W10+KFxuICBmbjogVCxcbiAgYXJnczogUGFyYW1ldGVyczxUPixcbiAgb3B0aW9ucz86IENhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+LCBVPjtcblxuLyoqXG4gKiBXcmFwcyBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBQcm9taXNlIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmdW5jdGlvbi4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEByZW1hcmsgVGhlIHZhbHVlIG5lZWRzIHRvIGJlIEpTT04gc2VyaWFsaXphYmxlLlxuICogQHJlbWFyayBUaGUgZnVuY3Rpb24gaXMgYXNzdW1lZCB0byBiZSBjb25zdGFudCAoZWcuIGNoYW5naW5nIGl0IHdvbid0IHRyaWdnZXIgYSByZXZhbGlkYXRpb24pLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHVzZUNhY2hlZFByb21pc2UgfSBmcm9tICdAcmF5Y2FzdC91dGlscyc7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4oKTtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHJldmFsaWRhdGUgfSA9IHVzZUNhY2hlZFByb21pc2UoYXN5bmMgKHVybDogc3RyaW5nKSA9PiB7XG4gKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsIH0pO1xuICogICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAqICAgICByZXR1cm4gcmVzdWx0XG4gKiAgIH0sXG4gKiAgIFsnaHR0cHM6Ly9hcGkuZXhhbXBsZSddLFxuICogICB7XG4gKiAgICAgYWJvcnRhYmxlXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8RGV0YWlsXG4gKiAgICAgICBpc0xvYWRpbmc9e2lzTG9hZGluZ31cbiAqICAgICAgIG1hcmtkb3duPXtkYXRhfVxuICogICAgICAgYWN0aW9ucz17XG4gKiAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiUmVsb2FkXCIgb25BY3Rpb249eygpID0+IHJldmFsaWRhdGUoKX0gLz5cbiAqICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAqICAgICAgIH1cbiAqICAgICAvPlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlPFtdPj4oXG4gIGZuOiBULFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+LCB1bmRlZmluZWQ+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSwgVSA9IHVuZGVmaW5lZD4oXG4gIGZuOiBULFxuICBhcmdzOiBQYXJhbWV0ZXJzPFQ+LFxuICBvcHRpb25zPzogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4sIFU+O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkUHJvbWlzZTxcbiAgVCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSB8IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgVSBleHRlbmRzIGFueVtdIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkLFxuPihmbjogVCwgYXJncz86IFBhcmFtZXRlcnM8VD4sIG9wdGlvbnM/OiBDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPikge1xuICAvKipcbiAgICogVGhlIGhvb2sgZ2VuZXJhdGVzIGEgY2FjaGUga2V5IGZyb20gdGhlIHByb21pc2UgaXQgcmVjZWl2ZXMgJiBpdHMgYXJndW1lbnRzLlxuICAgKiBTb21ldGltZXMgdGhhdCdzIG5vdCBlbm91Z2ggdG8gZ3VhcmFudGVlIHVuaXF1ZW5lc3MsIHNvIGhvb2tzIHRoYXQgYnVpbGQgb24gdG9wIG9mIGB1c2VDYWNoZWRQcm9taXNlYCBjYW5cbiAgICogdXNlIGFuIGBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeGAgdG8gaGVscCBpdC5cbiAgICpcbiAgICogQHJlbWFyayBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqL1xuICBjb25zdCB7XG4gICAgaW5pdGlhbERhdGEsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeCxcbiAgICAuLi51c2VQcm9taXNlT3B0aW9uc1xuICB9OiBDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPiAmIHsgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXg/OiBzdHJpbmcgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGxhc3RVcGRhdGVGcm9tID0gdXNlUmVmPFwiY2FjaGVcIiB8IFwicHJvbWlzZVwiPihudWxsKTtcblxuICBjb25zdCBbY2FjaGVkRGF0YSwgbXV0YXRlQ2FjaGVdID0gdXNlQ2FjaGVkU3RhdGU8dHlwZW9mIGVtcHR5Q2FjaGUgfCAoVW53cmFwUmV0dXJuPFQ+IHwgVSk+KFxuICAgIGhhc2goYXJncyB8fCBbXSkgKyBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeCxcbiAgICBlbXB0eUNhY2hlLFxuICAgIHtcbiAgICAgIGNhY2hlTmFtZXNwYWNlOiBoYXNoKGZuKSxcbiAgICB9LFxuICApO1xuXG4gIC8vIFVzZSBhIHJlZiB0byBzdG9yZSBwcmV2aW91cyByZXR1cm5lZCBkYXRhLiBVc2UgdGhlIGluaXRhbCBkYXRhIGFzIGl0cyBpbml0YWwgdmFsdWUgZnJvbSB0aGUgY2FjaGUuXG4gIGNvbnN0IGxhZ2d5RGF0YVJlZiA9IHVzZVJlZjxBd2FpdGVkPFJldHVyblR5cGU8VD4+IHwgVT4oY2FjaGVkRGF0YSAhPT0gZW1wdHlDYWNoZSA/IGNhY2hlZERhdGEgOiAoaW5pdGlhbERhdGEgYXMgVSkpO1xuICBjb25zdCBwYWdpbmF0aW9uQXJnc1JlZiA9IHVzZVJlZjxQYWdpbmF0aW9uT3B0aW9uczxVbndyYXBSZXR1cm48VD4gfCBVPiB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuICBjb25zdCB7XG4gICAgbXV0YXRlOiBfbXV0YXRlLFxuICAgIHJldmFsaWRhdGUsXG4gICAgLi4uc3RhdGVcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGZuIGhhcyB0aGUgc2FtZSBzaWduYXR1cmUgaW4gYm90aCB1c2VQcm9taXNlIGFuZCB1c2VDYWNoZWRQcm9taXNlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgfSA9IHVzZVByb21pc2UoZm4sIGFyZ3MgfHwgKFtdIGFzIGFueSBhcyBQYXJhbWV0ZXJzPFQ+KSwge1xuICAgIC4uLnVzZVByb21pc2VPcHRpb25zLFxuICAgIG9uRGF0YShkYXRhLCBwYWdpbmF0aW9uKSB7XG4gICAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50ID0gcGFnaW5hdGlvbjtcbiAgICAgIGlmICh1c2VQcm9taXNlT3B0aW9ucy5vbkRhdGEpIHtcbiAgICAgICAgdXNlUHJvbWlzZU9wdGlvbnMub25EYXRhKGRhdGEsIHBhZ2luYXRpb24pO1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2luYXRpb24gJiYgcGFnaW5hdGlvbi5wYWdlID4gMCkge1xuICAgICAgICAvLyBkb24ndCBjYWNoZSBiZXlvbmQgdGhlIGZpcnN0IHBhZ2VcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGFzdFVwZGF0ZUZyb20uY3VycmVudCA9IFwicHJvbWlzZVwiO1xuICAgICAgbGFnZ3lEYXRhUmVmLmN1cnJlbnQgPSBkYXRhO1xuICAgICAgbXV0YXRlQ2FjaGUoZGF0YSk7XG4gICAgfSxcbiAgfSk7XG5cbiAgbGV0IHJldHVybmVkRGF0YTogVSB8IEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4gfCBVbndyYXBSZXR1cm48VD47XG4gIGNvbnN0IHBhZ2luYXRpb24gPSBzdGF0ZS5wYWdpbmF0aW9uO1xuICAvLyB3aGVuIHBhZ2luYXRpbmcsIG9ubHkgdGhlIGZpcnN0IHBhZ2UgZ2V0cyBjYWNoZWQsIHNvIHdlIHJldHVybiB0aGUgZGF0YSB3ZSBnZXQgZnJvbSBgdXNlUHJvbWlzZWAsIGJlY2F1c2VcbiAgLy8gaXQgd2lsbCBiZSBhY2N1bXVsYXRlZC5cbiAgaWYgKHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQgJiYgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5wYWdlID4gMCAmJiBzdGF0ZS5kYXRhKSB7XG4gICAgcmV0dXJuZWREYXRhID0gc3RhdGUuZGF0YSBhcyBVbndyYXBSZXR1cm48VD47XG4gICAgLy8gaWYgdGhlIGxhdGVzdCB1cGRhdGUgaWYgZnJvbSB0aGUgUHJvbWlzZSwgd2Uga2VlcCBpdFxuICB9IGVsc2UgaWYgKGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPT09IFwicHJvbWlzZVwiKSB7XG4gICAgcmV0dXJuZWREYXRhID0gbGFnZ3lEYXRhUmVmLmN1cnJlbnQ7XG4gIH0gZWxzZSBpZiAoa2VlcFByZXZpb3VzRGF0YSAmJiBjYWNoZWREYXRhICE9PSBlbXB0eUNhY2hlKSB7XG4gICAgLy8gaWYgd2Ugd2FudCB0byBrZWVwIHRoZSBsYXRlc3QgZGF0YSwgd2UgcGljayB0aGUgY2FjaGUgYnV0IG9ubHkgaWYgaXQncyBub3QgZW1wdHlcbiAgICByZXR1cm5lZERhdGEgPSBjYWNoZWREYXRhO1xuICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICBwYWdpbmF0aW9uLmhhc01vcmUgPSB0cnVlO1xuICAgICAgcGFnaW5hdGlvbi5wYWdlU2l6ZSA9IGNhY2hlZERhdGEubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIGlmIChrZWVwUHJldmlvdXNEYXRhICYmIGNhY2hlZERhdGEgPT09IGVtcHR5Q2FjaGUpIHtcbiAgICAvLyBpZiB0aGUgY2FjaGUgaXMgZW1wdHksIHdlIHdpbGwgcmV0dXJuIHRoZSBwcmV2aW91cyBkYXRhXG4gICAgcmV0dXJuZWREYXRhID0gbGFnZ3lEYXRhUmVmLmN1cnJlbnQ7XG4gICAgLy8gdGhlcmUgYXJlIG5vIHNwZWNpYWwgY2FzZXMsIHNvIGVpdGhlciByZXR1cm4gdGhlIGNhY2hlIG9yIGluaXRpYWwgZGF0YVxuICB9IGVsc2UgaWYgKGNhY2hlZERhdGEgIT09IGVtcHR5Q2FjaGUpIHtcbiAgICByZXR1cm5lZERhdGEgPSBjYWNoZWREYXRhO1xuICAgIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgICBwYWdpbmF0aW9uLmhhc01vcmUgPSB0cnVlO1xuICAgICAgcGFnaW5hdGlvbi5wYWdlU2l6ZSA9IGNhY2hlZERhdGEubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm5lZERhdGEgPSBpbml0aWFsRGF0YSBhcyBVO1xuICB9XG5cbiAgY29uc3QgbGF0ZXN0RGF0YSA9IHVzZUxhdGVzdChyZXR1cm5lZERhdGEpO1xuXG4gIC8vIHdlIHJld3JpdGUgdGhlIG11dGF0ZSBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNhY2hlIGluc3RlYWRcbiAgY29uc3QgbXV0YXRlID0gdXNlQ2FsbGJhY2s8TXV0YXRlUHJvbWlzZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+IHwgVT4+KFxuICAgIGFzeW5jIChhc3luY1VwZGF0ZSwgb3B0aW9ucykgPT4ge1xuICAgICAgbGV0IGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9wdGlvbnM/Lm9wdGltaXN0aWNVcGRhdGUpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gXCJmdW5jdGlvblwiICYmIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGRhdGEgYmVmb3JlIHRoZSBvcHRpbWlzdGljIHVwZGF0ZSxcbiAgICAgICAgICAgIC8vIGJ1dCBvbmx5IGlmIHdlIG5lZWQgaXQgKGVnLiBvbmx5IHdoZW4gd2Ugd2FudCB0byBhdXRvbWF0aWNhbGx5IHJvbGxiYWNrIGFmdGVyKVxuICAgICAgICAgICAgZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGUgPSBzdHJ1Y3R1cmVkQ2xvbmUobGF0ZXN0RGF0YS5jdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZGF0YSA9IG9wdGlvbnMub3B0aW1pc3RpY1VwZGF0ZShsYXRlc3REYXRhLmN1cnJlbnQpO1xuICAgICAgICAgIGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPSBcImNhY2hlXCI7XG4gICAgICAgICAgbGFnZ3lEYXRhUmVmLmN1cnJlbnQgPSBkYXRhO1xuICAgICAgICAgIG11dGF0ZUNhY2hlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhd2FpdCBfbXV0YXRlKGFzeW5jVXBkYXRlLCB7IHNob3VsZFJldmFsaWRhdGVBZnRlcjogb3B0aW9ucz8uc2hvdWxkUmV2YWxpZGF0ZUFmdGVyIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gb3B0aW9ucy5yb2xsYmFja09uRXJyb3IobGF0ZXN0RGF0YS5jdXJyZW50KTtcbiAgICAgICAgICBsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID0gXCJjYWNoZVwiO1xuICAgICAgICAgIGxhZ2d5RGF0YVJlZi5jdXJyZW50ID0gZGF0YTtcbiAgICAgICAgICBtdXRhdGVDYWNoZShkYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zPy5vcHRpbWlzdGljVXBkYXRlICYmIG9wdGlvbnM/LnJvbGxiYWNrT25FcnJvciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID0gXCJjYWNoZVwiO1xuICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igd2hlbiB1bmRlZmluZWQsIGl0J3MgZXhwZWN0ZWRcbiAgICAgICAgICBsYWdneURhdGFSZWYuY3VycmVudCA9IGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlO1xuICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igd2hlbiB1bmRlZmluZWQsIGl0J3MgZXhwZWN0ZWRcbiAgICAgICAgICBtdXRhdGVDYWNoZShkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH0sXG4gICAgW211dGF0ZUNhY2hlLCBfbXV0YXRlLCBsYXRlc3REYXRhLCBsYWdneURhdGFSZWYsIGxhc3RVcGRhdGVGcm9tXSxcbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjYWNoZWREYXRhICE9PSBlbXB0eUNhY2hlKSB7XG4gICAgICBsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID0gXCJjYWNoZVwiO1xuICAgICAgbGFnZ3lEYXRhUmVmLmN1cnJlbnQgPSBjYWNoZWREYXRhO1xuICAgIH1cbiAgfSwgW2NhY2hlZERhdGFdKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGE6IHJldHVybmVkRGF0YSxcbiAgICBpc0xvYWRpbmc6IHN0YXRlLmlzTG9hZGluZyxcbiAgICBlcnJvcjogc3RhdGUuZXJyb3IsXG4gICAgbXV0YXRlOiBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50ICYmIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQucGFnZSA+IDAgPyBfbXV0YXRlIDogbXV0YXRlLFxuICAgIHBhZ2luYXRpb24sXG4gICAgcmV2YWxpZGF0ZSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlLCBDYWNoZWRQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZUNhY2hlZFByb21pc2VcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBGdW5jdGlvblJldHVybmluZ1Byb21pc2UsIFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGlzSlNPTiB9IGZyb20gXCIuL2ZldGNoLXV0aWxzXCI7XG5pbXBvcnQgeyBoYXNoIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5hc3luYyBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZyhyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRlbnRUeXBlSGVhZGVyID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIik7XG5cbiAgaWYgKGNvbnRlbnRUeXBlSGVhZGVyICYmIGlzSlNPTihjb250ZW50VHlwZUhlYWRlcikpIHtcbiAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICB9XG4gIHJldHVybiBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRNYXBwaW5nPFYsIFQgZXh0ZW5kcyB1bmtub3duW10+KHJlc3VsdDogVik6IHsgZGF0YTogVDsgaGFzTW9yZT86IGJvb2xlYW47IGN1cnNvcj86IGFueSB9IHtcbiAgcmV0dXJuIHsgZGF0YTogcmVzdWx0IGFzIHVua25vd24gYXMgVCwgaGFzTW9yZTogZmFsc2UgfTtcbn1cblxudHlwZSBSZXF1ZXN0SW5mbyA9IHN0cmluZyB8IFVSTCB8IGdsb2JhbFRoaXMuUmVxdWVzdDtcbnR5cGUgUGFnaW5hdGVkUmVxdWVzdEluZm8gPSAocGFnaW5hdGlvbjogeyBwYWdlOiBudW1iZXI7IGxhc3RJdGVtPzogYW55OyBjdXJzb3I/OiBhbnkgfSkgPT4gUmVxdWVzdEluZm87XG5cbi8qKlxuICogRmV0Y2hlcyB0aGUgcGFnaW5hdGVkVVJMIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgZXhlY3V0aW9uIG9mIHRoZSBmZXRjaC4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEByZW1hcmsgVGhpcyBvdmVybG9hZCBzaG91bGQgYmUgdXNlZCB3aGVuIHdvcmtpbmcgd2l0aCBwYWdpbmF0ZWQgZGF0YSBzb3VyY2VzLlxuICogQHJlbWFyayBXaGVuIHBhZ2luYXRpbmcsIG9ubHkgdGhlIGZpcnN0IHBhZ2Ugd2lsbCBiZSBjYWNoZWQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgSWNvbiwgSW1hZ2UsIExpc3QgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICogaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbiAqXG4gKiB0eXBlIFNlYXJjaFJlc3VsdCA9IHsgY29tcGFuaWVzOiBDb21wYW55W107IHBhZ2U6IG51bWJlcjsgdG90YWxQYWdlczogbnVtYmVyIH07XG4gKiB0eXBlIENvbXBhbnkgPSB7IGlkOiBudW1iZXI7IG5hbWU6IHN0cmluZzsgc21hbGxMb2dvVXJsPzogc3RyaW5nIH07XG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHBhZ2luYXRpb24gfSA9IHVzZUZldGNoKFxuICogICAgIChvcHRpb25zKSA9PlxuICogICAgICAgXCJodHRwczovL2FwaS55Y29tYmluYXRvci5jb20vdjAuMS9jb21wYW5pZXM/XCIgK1xuICogICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyh7IHBhZ2U6IFN0cmluZyhvcHRpb25zLnBhZ2UgKyAxKSwgcTogc2VhcmNoVGV4dCB9KS50b1N0cmluZygpLFxuICogICAgIHtcbiAqICAgICAgIG1hcFJlc3VsdChyZXN1bHQ6IFNlYXJjaFJlc3VsdCkge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGRhdGE6IHJlc3VsdC5jb21wYW5pZXMsXG4gKiAgICAgICAgICAgaGFzTW9yZTogcmVzdWx0LnBhZ2UgPCByZXN1bHQudG90YWxQYWdlcyxcbiAqICAgICAgICAgfTtcbiAqICAgICAgIH0sXG4gKiAgICAgICBrZWVwUHJldmlvdXNEYXRhOiB0cnVlLFxuICogICAgICAgaW5pdGlhbERhdGE6IFtdLFxuICogICAgIH0sXG4gKiAgICk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufSBvblNlYXJjaFRleHRDaGFuZ2U9e3NldFNlYXJjaFRleHR9PlxuICogICAgICAge2RhdGEubWFwKChjb21wYW55KSA9PiAoXG4gKiAgICAgICAgIDxMaXN0Lkl0ZW1cbiAqICAgICAgICAgICBrZXk9e2NvbXBhbnkuaWR9XG4gKiAgICAgICAgICAgaWNvbj17eyBzb3VyY2U6IGNvbXBhbnkuc21hbGxMb2dvVXJsID8/IEljb24uTWludXNDaXJjbGUsIG1hc2s6IEltYWdlLk1hc2suUm91bmRlZFJlY3RhbmdsZSB9fVxuICogICAgICAgICAgIHRpdGxlPXtjb21wYW55Lm5hbWV9XG4gKiAgICAgICAgIC8+XG4gKiAgICAgICApKX1cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoPFYgPSB1bmtub3duLCBVID0gdW5kZWZpbmVkLCBUIGV4dGVuZHMgdW5rbm93bltdID0gdW5rbm93bltdPihcbiAgdXJsOiBQYWdpbmF0ZWRSZXF1ZXN0SW5mbyxcbiAgb3B0aW9uczogUmVxdWVzdEluaXQgJiB7XG4gICAgbWFwUmVzdWx0OiAocmVzdWx0OiBWKSA9PiB7IGRhdGE6IFQ7IGhhc01vcmU/OiBib29sZWFuOyBjdXJzb3I/OiBhbnkgfTtcbiAgICBwYXJzZVJlc3BvbnNlPzogKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gUHJvbWlzZTxWPjtcbiAgfSAmIE9taXQ8Q2FjaGVkUHJvbWlzZU9wdGlvbnM8KHVybDogUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxUPiwgVT4sIFwiYWJvcnRhYmxlXCI+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG4vKipcbiAqIEZldGNoIHRoZSBVUkwgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZldGNoLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgdXNlRmV0Y2ggfSBmcm9tICdAcmF5Y2FzdC91dGlscyc7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHJldmFsaWRhdGUgfSA9IHVzZUZldGNoKCdodHRwczovL2FwaS5leGFtcGxlJyk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxEZXRhaWxcbiAqICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxuICogICAgICAgbWFya2Rvd249e2RhdGF9XG4gKiAgICAgICBhY3Rpb25zPXtcbiAqICAgICAgICAgPEFjdGlvblBhbmVsPlxuICogICAgICAgICAgIDxBY3Rpb24gdGl0bGU9XCJSZWxvYWRcIiBvbkFjdGlvbj17KCkgPT4gcmV2YWxpZGF0ZSgpfSAvPlxuICogICAgICAgICA8L0FjdGlvblBhbmVsPlxuICogICAgICAgfVxuICogICAgIC8+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VGZXRjaDxWID0gdW5rbm93biwgVSA9IHVuZGVmaW5lZCwgVCA9IFY+KFxuICB1cmw6IFJlcXVlc3RJbmZvLFxuICBvcHRpb25zPzogUmVxdWVzdEluaXQgJiB7XG4gICAgbWFwUmVzdWx0PzogKHJlc3VsdDogVikgPT4geyBkYXRhOiBUOyBoYXNNb3JlPzogYm9vbGVhbjsgY3Vyc29yPzogYW55IH07XG4gICAgcGFyc2VSZXNwb25zZT86IChyZXNwb25zZTogUmVzcG9uc2UpID0+IFByb21pc2U8Vj47XG4gIH0gJiBPbWl0PENhY2hlZFByb21pc2VPcHRpb25zPCh1cmw6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8VD4sIFU+LCBcImFib3J0YWJsZVwiPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+ICYgeyBwYWdpbmF0aW9uOiB1bmRlZmluZWQgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoPFYgPSB1bmtub3duLCBVID0gdW5kZWZpbmVkLCBUIGV4dGVuZHMgdW5rbm93bltdID0gdW5rbm93bltdPihcbiAgdXJsOiBSZXF1ZXN0SW5mbyB8IFBhZ2luYXRlZFJlcXVlc3RJbmZvLFxuICBvcHRpb25zPzogUmVxdWVzdEluaXQgJiB7XG4gICAgbWFwUmVzdWx0PzogKHJlc3VsdDogVikgPT4geyBkYXRhOiBUOyBoYXNNb3JlPzogYm9vbGVhbjsgY3Vyc29yPzogYW55IH07XG4gICAgcGFyc2VSZXNwb25zZT86IChyZXNwb25zZTogUmVzcG9uc2UpID0+IFByb21pc2U8Vj47XG4gIH0gJiBPbWl0PENhY2hlZFByb21pc2VPcHRpb25zPCh1cmw6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8VD4sIFU+LCBcImFib3J0YWJsZVwiPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+IHtcbiAgY29uc3Qge1xuICAgIHBhcnNlUmVzcG9uc2UsXG4gICAgbWFwUmVzdWx0LFxuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gICAgLi4uZmV0Y2hPcHRpb25zXG4gIH0gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IHVzZUNhY2hlZFByb21pc2VPcHRpb25zOiBDYWNoZWRQcm9taXNlT3B0aW9uczwodXJsOiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFQ+LCBVPiA9IHtcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICB9O1xuXG4gIGNvbnN0IHBhcnNlUmVzcG9uc2VSZWYgPSB1c2VMYXRlc3QocGFyc2VSZXNwb25zZSB8fCBkZWZhdWx0UGFyc2luZyk7XG4gIGNvbnN0IG1hcFJlc3VsdFJlZiA9IHVzZUxhdGVzdChtYXBSZXN1bHQgfHwgZGVmYXVsdE1hcHBpbmcpO1xuICBjb25zdCB1cmxSZWYgPSB1c2VSZWY8UmVxdWVzdEluZm8gfCBQYWdpbmF0ZWRSZXF1ZXN0SW5mbz4obnVsbCk7XG4gIGNvbnN0IGZpcnN0UGFnZVVybFJlZiA9IHVzZVJlZjxSZXF1ZXN0SW5mbyB8IHVuZGVmaW5lZD4obnVsbCk7XG4gIGNvbnN0IGZpcnN0UGFnZVVybCA9IHR5cGVvZiB1cmwgPT09IFwiZnVuY3Rpb25cIiA/IHVybCh7IHBhZ2U6IDAgfSkgOiB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBXaGVuIHBhZ2luYXRpbmcsIGB1cmxgIGlzIGEgYFBhZ2luYXRlZFJlcXVlc3RJbmZvYCwgc28gd2Ugb25seSB3YW50IHRvIHVwZGF0ZSB0aGUgcmVmIHdoZW4gdGhlIGBmaXJzdFBhZ2VVcmxgIGNoYW5nZXMuXG4gICAqIFdoZW4gbm90IHBhZ2luYXRpbmcsIGB1cmxgIGlzIGEgYFJlcXVlc3RJbmZvYCwgc28gd2Ugd2FudCB0byB1cGRhdGUgdGhlIHJlZiB3aGVuZXZlciBgdXJsYCBjaGFuZ2VzLlxuICAgKi9cbiAgaWYgKCF1cmxSZWYuY3VycmVudCB8fCB0eXBlb2YgZmlyc3RQYWdlVXJsUmVmLmN1cnJlbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgZmlyc3RQYWdlVXJsUmVmLmN1cnJlbnQgIT09IGZpcnN0UGFnZVVybCkge1xuICAgIHVybFJlZi5jdXJyZW50ID0gdXJsO1xuICB9XG4gIGZpcnN0UGFnZVVybFJlZi5jdXJyZW50ID0gZmlyc3RQYWdlVXJsO1xuICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPihudWxsKTtcblxuICBjb25zdCBwYWdpbmF0ZWRGbjogRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPFtQYWdpbmF0ZWRSZXF1ZXN0SW5mbywgdHlwZW9mIGZldGNoT3B0aW9uc10sIFQ+ID0gdXNlQ2FsbGJhY2soXG4gICAgKHVybDogUGFnaW5hdGVkUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4gYXN5bmMgKHBhZ2luYXRpb246IHsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybChwYWdpbmF0aW9uKSwgeyBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwsIC4uLm9wdGlvbnMgfSk7XG4gICAgICBjb25zdCBwYXJzZWQgPSAoYXdhaXQgcGFyc2VSZXNwb25zZVJlZi5jdXJyZW50KHJlcykpIGFzIFY7XG4gICAgICByZXR1cm4gbWFwUmVzdWx0UmVmLmN1cnJlbnQ/LihwYXJzZWQpO1xuICAgIH0sXG4gICAgW3BhcnNlUmVzcG9uc2VSZWYsIG1hcFJlc3VsdFJlZl0sXG4gICk7XG4gIGNvbnN0IGZuOiBGdW5jdGlvblJldHVybmluZ1Byb21pc2U8W1JlcXVlc3RJbmZvLCBSZXF1ZXN0SW5pdD9dLCBUPiA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh1cmw6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwgeyBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwsIC4uLm9wdGlvbnMgfSk7XG4gICAgICBjb25zdCBwYXJzZWQgPSAoYXdhaXQgcGFyc2VSZXNwb25zZVJlZi5jdXJyZW50KHJlcykpIGFzIFY7XG4gICAgICBjb25zdCBtYXBwZWQgPSBtYXBSZXN1bHRSZWYuY3VycmVudChwYXJzZWQpO1xuICAgICAgcmV0dXJuIG1hcHBlZD8uZGF0YSBhcyB1bmtub3duIGFzIFQ7XG4gICAgfSxcbiAgICBbcGFyc2VSZXNwb25zZVJlZiwgbWFwUmVzdWx0UmVmXSxcbiAgKTtcblxuICBjb25zdCBwcm9taXNlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKGZpcnN0UGFnZVVybFJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm4gcGFnaW5hdGVkRm47XG4gICAgfVxuICAgIHJldHVybiBmbjtcbiAgfSwgW2ZpcnN0UGFnZVVybFJlZiwgZm4sIHBhZ2luYXRlZEZuXSk7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBsYXN0SXRlbSBjYW4ndCBiZSBpbmZlcnJlZCBwcm9wZXJseVxuICByZXR1cm4gdXNlQ2FjaGVkUHJvbWlzZShwcm9taXNlLCBbdXJsUmVmLmN1cnJlbnQgYXMgUGFnaW5hdGVkUmVxdWVzdEluZm8sIGZldGNoT3B0aW9uc10sIHtcbiAgICAuLi51c2VDYWNoZWRQcm9taXNlT3B0aW9ucyxcbiAgICBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeDogZmlyc3RQYWdlVXJsUmVmLmN1cnJlbnQgKyBoYXNoKG1hcFJlc3VsdFJlZi5jdXJyZW50KSArIGhhc2gocGFyc2VSZXNwb25zZVJlZi5jdXJyZW50KSxcbiAgICBhYm9ydGFibGUsXG4gIH0pO1xufVxuIiwgImV4cG9ydCBmdW5jdGlvbiBpc0pTT04oY29udGVudFR5cGVIZWFkZXI6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuIHtcbiAgaWYgKGNvbnRlbnRUeXBlSGVhZGVyKSB7XG4gICAgY29uc3QgbWVkaWFUeXBlID0gcGFyc2VDb250ZW50VHlwZShjb250ZW50VHlwZUhlYWRlcik7XG5cbiAgICBpZiAoIW1lZGlhVHlwZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChtZWRpYVR5cGUuc3VidHlwZSA9PT0gXCJqc29uXCIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtZWRpYVR5cGUuc3VmZml4ID09PSBcImpzb25cIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhVHlwZS5zdWZmaXggJiYgL1xcYmpzb25cXGIvaS50ZXN0KG1lZGlhVHlwZS5zdWZmaXgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWVkaWFUeXBlLnN1YnR5cGUgJiYgL1xcYmpzb25cXGIvaS50ZXN0KG1lZGlhVHlwZS5zdWJ0eXBlKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZWdFeHAgdG8gbWF0Y2ggdHlwZSBpbiBSRkMgNjgzOCB3aXRoIGFuIG9wdGlvbmFsIHRyYWlsaW5nIGA7YCBiZWNhdXNlIHNvbWUgQXBwbGUgQVBJcyByZXR1cm5zIG9uZS4uLlxuICpcbiAqIHR5cGUtbmFtZSA9IHJlc3RyaWN0ZWQtbmFtZVxuICogc3VidHlwZS1uYW1lID0gcmVzdHJpY3RlZC1uYW1lXG4gKiByZXN0cmljdGVkLW5hbWUgPSByZXN0cmljdGVkLW5hbWUtZmlyc3QgKjEyNnJlc3RyaWN0ZWQtbmFtZS1jaGFyc1xuICogcmVzdHJpY3RlZC1uYW1lLWZpcnN0ICA9IEFMUEhBIC8gRElHSVRcbiAqIHJlc3RyaWN0ZWQtbmFtZS1jaGFycyAgPSBBTFBIQSAvIERJR0lUIC8gXCIhXCIgLyBcIiNcIiAvXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgXCIkXCIgLyBcIiZcIiAvIFwiLVwiIC8gXCJeXCIgLyBcIl9cIlxuICogcmVzdHJpY3RlZC1uYW1lLWNoYXJzID0vIFwiLlwiIDsgQ2hhcmFjdGVycyBiZWZvcmUgZmlyc3QgZG90IGFsd2F5c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IHNwZWNpZnkgYSBmYWNldCBuYW1lXG4gKiByZXN0cmljdGVkLW5hbWUtY2hhcnMgPS8gXCIrXCIgOyBDaGFyYWN0ZXJzIGFmdGVyIGxhc3QgcGx1cyBhbHdheXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOyBzcGVjaWZ5IGEgc3RydWN0dXJlZCBzeW50YXggc3VmZml4XG4gKiBBTFBIQSA9ICAleDQxLTVBIC8gJXg2MS03QSAgIDsgQS1aIC8gYS16XG4gKiBESUdJVCA9ICAleDMwLTM5ICAgICAgICAgICAgIDsgMC05XG4gKi9cbmNvbnN0IE1FRElBX1RZUEVfUkVHRVhQID0gL14oW0EtWmEtejAtOV1bQS1aYS16MC05ISMkJl5fLV17MCwxMjZ9KVxcLyhbQS1aYS16MC05XVtBLVphLXowLTkhIyQmXl8uKy1dezAsMTI2fSk7PyQvO1xuXG5mdW5jdGlvbiBwYXJzZUNvbnRlbnRUeXBlKGhlYWRlcjogc3RyaW5nKSB7XG4gIGNvbnN0IGhlYWRlckRlbGltaXRhdGlvbmluZGV4ID0gaGVhZGVyLmluZGV4T2YoXCI7XCIpO1xuICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlckRlbGltaXRhdGlvbmluZGV4ICE9PSAtMSA/IGhlYWRlci5zbGljZSgwLCBoZWFkZXJEZWxpbWl0YXRpb25pbmRleCkudHJpbSgpIDogaGVhZGVyLnRyaW0oKTtcblxuICBjb25zdCBtYXRjaCA9IE1FRElBX1RZUEVfUkVHRVhQLmV4ZWMoY29udGVudFR5cGUudG9Mb3dlckNhc2UoKS50b0xvd2VyQ2FzZSgpKTtcblxuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdHlwZSA9IG1hdGNoWzFdO1xuICBsZXQgc3VidHlwZSA9IG1hdGNoWzJdO1xuICBsZXQgc3VmZml4O1xuXG4gIC8vIHN1ZmZpeCBhZnRlciBsYXN0ICtcbiAgY29uc3QgaW5kZXggPSBzdWJ0eXBlLmxhc3RJbmRleE9mKFwiK1wiKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIHN1ZmZpeCA9IHN1YnR5cGUuc3Vic3RyaW5nKGluZGV4ICsgMSk7XG4gICAgc3VidHlwZSA9IHN1YnR5cGUuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgfVxuXG4gIHJldHVybiB7IHR5cGUsIHN1YnR5cGUsIHN1ZmZpeCB9O1xufVxuIiwgIi8qXG4gKiBJbnNwaXJlZCBieSBFeGVjYVxuICovXG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlLCBDYWNoZWRQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZUNhY2hlZFByb21pc2VcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHtcbiAgZ2V0U3Bhd25lZFByb21pc2UsXG4gIGdldFNwYXduZWRSZXN1bHQsXG4gIGhhbmRsZU91dHB1dCxcbiAgZGVmYXVsdFBhcnNpbmcsXG4gIFBhcnNlRXhlY091dHB1dEhhbmRsZXIsXG59IGZyb20gXCIuL2V4ZWMtdXRpbHNcIjtcblxudHlwZSBFeGVjT3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIElmIGB0cnVlYCwgcnVucyB0aGUgY29tbWFuZCBpbnNpZGUgb2YgYSBzaGVsbC4gVXNlcyBgL2Jpbi9zaGAuIEEgZGlmZmVyZW50IHNoZWxsIGNhbiBiZSBzcGVjaWZpZWQgYXMgYSBzdHJpbmcuIFRoZSBzaGVsbCBzaG91bGQgdW5kZXJzdGFuZCB0aGUgYC1jYCBzd2l0Y2guXG4gICAqXG4gICAqIFdlIHJlY29tbWVuZCBhZ2FpbnN0IHVzaW5nIHRoaXMgb3B0aW9uIHNpbmNlIGl0IGlzOlxuICAgKiAtIG5vdCBjcm9zcy1wbGF0Zm9ybSwgZW5jb3VyYWdpbmcgc2hlbGwtc3BlY2lmaWMgc3ludGF4LlxuICAgKiAtIHNsb3dlciwgYmVjYXVzZSBvZiB0aGUgYWRkaXRpb25hbCBzaGVsbCBpbnRlcnByZXRhdGlvbi5cbiAgICogLSB1bnNhZmUsIHBvdGVudGlhbGx5IGFsbG93aW5nIGNvbW1hbmQgaW5qZWN0aW9uLlxuICAgKlxuICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgKi9cbiAgc2hlbGw/OiBib29sZWFuIHwgc3RyaW5nO1xuICAvKipcbiAgICogU3RyaXAgdGhlIGZpbmFsIG5ld2xpbmUgY2hhcmFjdGVyIGZyb20gdGhlIG91dHB1dC5cbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgc3RyaXBGaW5hbE5ld2xpbmU/OiBib29sZWFuO1xuICAvKipcbiAgICogQ3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSBvZiB0aGUgY2hpbGQgcHJvY2Vzcy5cbiAgICogQGRlZmF1bHQgcHJvY2Vzcy5jd2QoKVxuICAgKi9cbiAgY3dkPzogc3RyaW5nO1xuICAvKipcbiAgICogRW52aXJvbm1lbnQga2V5LXZhbHVlIHBhaXJzLiBFeHRlbmRzIGF1dG9tYXRpY2FsbHkgZnJvbSBgcHJvY2Vzcy5lbnZgLlxuICAgKiBAZGVmYXVsdCBwcm9jZXNzLmVudlxuICAgKi9cbiAgZW52PzogTm9kZUpTLlByb2Nlc3NFbnY7XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHRoZSBjaGFyYWN0ZXIgZW5jb2RpbmcgdXNlZCB0byBkZWNvZGUgdGhlIHN0ZG91dCBhbmQgc3RkZXJyIG91dHB1dC4gSWYgc2V0IHRvIGBcImJ1ZmZlclwiYCwgdGhlbiBzdGRvdXQgYW5kIHN0ZGVyciB3aWxsIGJlIGEgQnVmZmVyIGluc3RlYWQgb2YgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBkZWZhdWx0IFwidXRmOFwiXG4gICAqL1xuICBlbmNvZGluZz86IEJ1ZmZlckVuY29kaW5nIHwgXCJidWZmZXJcIjtcbiAgLyoqXG4gICAqIFdyaXRlIHNvbWUgaW5wdXQgdG8gdGhlIGBzdGRpbmAgb2YgeW91ciBiaW5hcnkuXG4gICAqL1xuICBpbnB1dD86IHN0cmluZyB8IEJ1ZmZlcjtcbiAgLyoqIElmIHRpbWVvdXQgaXMgZ3JlYXRlciB0aGFuIGAwYCwgdGhlIHBhcmVudCB3aWxsIHNlbmQgdGhlIHNpZ25hbCBgU0lHVEVSTWAgaWYgdGhlIGNoaWxkIHJ1bnMgbG9uZ2VyIHRoYW4gdGltZW91dCBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEBkZWZhdWx0IDEwMDAwXG4gICAqL1xuICB0aW1lb3V0PzogbnVtYmVyO1xufTtcblxuY29uc3QgU1BBQ0VTX1JFR0VYUCA9IC8gKy9nO1xuZnVuY3Rpb24gcGFyc2VDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgYXJncz86IHN0cmluZ1tdKSB7XG4gIGlmIChhcmdzKSB7XG4gICAgcmV0dXJuIFtjb21tYW5kLCAuLi5hcmdzXTtcbiAgfVxuICBjb25zdCB0b2tlbnM6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgdG9rZW4gb2YgY29tbWFuZC50cmltKCkuc3BsaXQoU1BBQ0VTX1JFR0VYUCkpIHtcbiAgICAvLyBBbGxvdyBzcGFjZXMgdG8gYmUgZXNjYXBlZCBieSBhIGJhY2tzbGFzaCBpZiBub3QgbWVhbnQgYXMgYSBkZWxpbWl0ZXJcbiAgICBjb25zdCBwcmV2aW91c1Rva2VuID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICBpZiAocHJldmlvdXNUb2tlbiAmJiBwcmV2aW91c1Rva2VuLmVuZHNXaXRoKFwiXFxcXFwiKSkge1xuICAgICAgLy8gTWVyZ2UgcHJldmlvdXMgdG9rZW4gd2l0aCBjdXJyZW50IG9uZVxuICAgICAgdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSA9IGAke3ByZXZpb3VzVG9rZW4uc2xpY2UoMCwgLTEpfSAke3Rva2VufWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufVxuXG50eXBlIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPiA9IE9taXQ8XG4gIENhY2hlZFByb21pc2VPcHRpb25zPFxuICAgIChfY29tbWFuZDogc3RyaW5nLCBfYXJnczogc3RyaW5nW10sIF9vcHRpb25zPzogRXhlY09wdGlvbnMsIGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyKSA9PiBQcm9taXNlPFQ+LFxuICAgIFVcbiAgPixcbiAgXCJhYm9ydGFibGVcIlxuPjtcblxuLyoqXG4gKiBFeGVjdXRlcyBhIGNvbW1hbmQgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGNvbW1hbmQuIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAcmVtYXJrIFdoZW4gc3BlY2lmeWluZyB0aGUgYXJndW1lbnRzIHZpYSB0aGUgYGNvbW1hbmRgIHN0cmluZywgaWYgdGhlIGZpbGUgb3IgYW4gYXJndW1lbnQgb2YgdGhlIGNvbW1hbmQgY29udGFpbnMgc3BhY2VzLCB0aGV5IG11c3QgYmUgZXNjYXBlZCB3aXRoIGJhY2tzbGFzaGVzLiBUaGlzIG1hdHRlcnMgZXNwZWNpYWxseSBpZiBgY29tbWFuZGAgaXMgbm90IGEgY29uc3RhbnQgYnV0IGEgdmFyaWFibGUsIGZvciBleGFtcGxlIHdpdGggYF9fZGlybmFtZWAgb3IgYHByb2Nlc3MuY3dkKClgLiBFeGNlcHQgZm9yIHNwYWNlcywgbm8gZXNjYXBpbmcvcXVvdGluZyBpcyBuZWVkZWQuXG4gKlxuICogVGhlIGBzaGVsbGAgb3B0aW9uIG11c3QgYmUgdXNlZCBpZiB0aGUgY29tbWFuZCB1c2VzIHNoZWxsLXNwZWNpZmljIGZlYXR1cmVzIChmb3IgZXhhbXBsZSwgYCYmYCBvciBgfHxgKSwgYXMgb3Bwb3NlZCB0byBiZWluZyBhIHNpbXBsZSBmaWxlIGZvbGxvd2VkIGJ5IGl0cyBhcmd1bWVudHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgdXNlRXhlYyB9IGZyb20gJ0ByYXljYXN0L3V0aWxzJztcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcmV2YWxpZGF0ZSB9ID0gdXNlRXhlYyhcImJyZXdcIiwgW1wiaW5mb1wiLCBcIi0tanNvbj12MlwiLCBcIi0taW5zdGFsbGVkXCJdKTtcbiAqICAgY29uc3QgcmVzdWx0cyA9IHVzZU1lbW88e31bXT4oKCkgPT4gSlNPTi5wYXJzZShkYXRhIHx8IFwiW11cIiksIFtkYXRhXSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cbiAqICAgICAgeyhkYXRhIHx8IFtdKS5tYXAoKGl0ZW0pID0+IChcbiAqICAgICAgICA8TGlzdC5JdGVtIGtleT17aXRlbS5pZH0gdGl0bGU9e2l0ZW0ubmFtZX0gLz5cbiAqICAgICAgKSl9XG4gKiAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VFeGVjPFQgPSBCdWZmZXIsIFUgPSB1bmRlZmluZWQ+KFxuICBjb21tYW5kOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgQnVmZmVyLCBFeGVjT3B0aW9ucz47XG4gIH0gJiBFeGVjT3B0aW9ucyAmIHtcbiAgICAgIGVuY29kaW5nOiBcImJ1ZmZlclwiO1xuICAgIH0gJiBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFeGVjPFQgPSBzdHJpbmcsIFUgPSB1bmRlZmluZWQ+KFxuICBjb21tYW5kOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgRXhlY09wdGlvbnM+O1xuICB9ICYgRXhlY09wdGlvbnMgJiB7XG4gICAgICBlbmNvZGluZz86IEJ1ZmZlckVuY29kaW5nO1xuICAgIH0gJiBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFeGVjPFQgPSBCdWZmZXIsIFUgPSB1bmRlZmluZWQ+KFxuICBmaWxlOiBzdHJpbmcsXG4gIC8qKlxuICAgKiBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZpbGUuIE5vIGVzY2FwaW5nL3F1b3RpbmcgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBJZiBkZWZpbmVkLCB0aGUgY29tbWFuZHMgbmVlZHMgdG8gYmUgYSBmaWxlIHRvIGV4ZWN1dGUuIElmIHVuZGVmaW5lZCwgdGhlIGFyZ3VtZW50cyB3aWxsIGJlIHBhcnNlZCBmcm9tIHRoZSBjb21tYW5kLlxuICAgKi9cbiAgYXJnczogc3RyaW5nW10sXG4gIG9wdGlvbnM6IHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgQnVmZmVyLCBFeGVjT3B0aW9ucz47XG4gIH0gJiBFeGVjT3B0aW9ucyAmIHtcbiAgICAgIGVuY29kaW5nOiBcImJ1ZmZlclwiO1xuICAgIH0gJiBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFeGVjPFQgPSBzdHJpbmcsIFUgPSB1bmRlZmluZWQ+KFxuICBmaWxlOiBzdHJpbmcsXG4gIC8qKlxuICAgKiBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZpbGUuIE5vIGVzY2FwaW5nL3F1b3RpbmcgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBJZiBkZWZpbmVkLCB0aGUgY29tbWFuZHMgbmVlZHMgdG8gYmUgYSBmaWxlIHRvIGV4ZWN1dGUuIElmIHVuZGVmaW5lZCwgdGhlIGFyZ3VtZW50cyB3aWxsIGJlIHBhcnNlZCBmcm9tIHRoZSBjb21tYW5kLlxuICAgKi9cbiAgYXJnczogc3RyaW5nW10sXG4gIG9wdGlvbnM/OiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgRXhlY09wdGlvbnM+O1xuICB9ICYgRXhlY09wdGlvbnMgJiB7XG4gICAgICBlbmNvZGluZz86IEJ1ZmZlckVuY29kaW5nO1xuICAgIH0gJiBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFeGVjPFQsIFUgPSB1bmRlZmluZWQ+KFxuICBjb21tYW5kOiBzdHJpbmcsXG4gIG9wdGlvbnNPckFyZ3M/OlxuICAgIHwgc3RyaW5nW11cbiAgICB8ICh7XG4gICAgICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBCdWZmZXIsIEV4ZWNPcHRpb25zPiB8IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBFeGVjT3B0aW9ucz47XG4gICAgICB9ICYgRXhlY09wdGlvbnMgJlxuICAgICAgICBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4pLFxuICBvcHRpb25zPzoge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBCdWZmZXIsIEV4ZWNPcHRpb25zPiB8IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBFeGVjT3B0aW9ucz47XG4gIH0gJiBFeGVjT3B0aW9ucyAmXG4gICAgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT4ge1xuICBjb25zdCB7XG4gICAgcGFyc2VPdXRwdXQsXG4gICAgaW5wdXQsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgICAuLi5leGVjT3B0aW9uc1xuICB9ID0gQXJyYXkuaXNBcnJheShvcHRpb25zT3JBcmdzKSA/IG9wdGlvbnMgfHwge30gOiBvcHRpb25zT3JBcmdzIHx8IHt9O1xuXG4gIGNvbnN0IHVzZUNhY2hlZFByb21pc2VPcHRpb25zOiBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4gPSB7XG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPihudWxsKTtcbiAgY29uc3QgcGFyc2VPdXRwdXRSZWYgPSB1c2VMYXRlc3QocGFyc2VPdXRwdXQgfHwgZGVmYXVsdFBhcnNpbmcpO1xuXG4gIGNvbnN0IGZuID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKF9jb21tYW5kOiBzdHJpbmcsIF9hcmdzOiBzdHJpbmdbXSwgX29wdGlvbnM/OiBFeGVjT3B0aW9ucywgaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXIpID0+IHtcbiAgICAgIGNvbnN0IFtmaWxlLCAuLi5hcmdzXSA9IHBhcnNlQ29tbWFuZChfY29tbWFuZCwgX2FyZ3MpO1xuICAgICAgY29uc3QgY29tbWFuZCA9IFtmaWxlLCAuLi5hcmdzXS5qb2luKFwiIFwiKTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgc3RyaXBGaW5hbE5ld2xpbmU6IHRydWUsXG4gICAgICAgIC4uLl9vcHRpb25zLFxuICAgICAgICB0aW1lb3V0OiBfb3B0aW9ucz8udGltZW91dCB8fCAxMDAwMCxcbiAgICAgICAgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsLFxuICAgICAgICBlbmNvZGluZzogX29wdGlvbnM/LmVuY29kaW5nID09PSBudWxsID8gXCJidWZmZXJcIiA6IF9vcHRpb25zPy5lbmNvZGluZyB8fCBcInV0ZjhcIixcbiAgICAgICAgZW52OiB7IFBBVEg6IFwiL3Vzci9sb2NhbC9iaW46L3Vzci9iaW46L2JpbjovdXNyL3NiaW46L3NiaW5cIiwgLi4ucHJvY2Vzcy5lbnYsIC4uLl9vcHRpb25zPy5lbnYgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24oZmlsZSwgYXJncywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQsIG9wdGlvbnMpO1xuXG4gICAgICBpZiAoaW5wdXQpIHtcbiAgICAgICAgc3Bhd25lZC5zdGRpbi5lbmQoaW5wdXQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBbeyBlcnJvciwgZXhpdENvZGUsIHNpZ25hbCwgdGltZWRPdXQgfSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdChcbiAgICAgICAgc3Bhd25lZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgc3Bhd25lZFByb21pc2UsXG4gICAgICApO1xuICAgICAgY29uc3Qgc3Rkb3V0ID0gaGFuZGxlT3V0cHV0KG9wdGlvbnMsIHN0ZG91dFJlc3VsdCk7XG4gICAgICBjb25zdCBzdGRlcnIgPSBoYW5kbGVPdXRwdXQob3B0aW9ucywgc3RkZXJyUmVzdWx0KTtcblxuICAgICAgcmV0dXJuIHBhcnNlT3V0cHV0UmVmLmN1cnJlbnQoe1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRvbyBtYW55IGdlbmVyaWNzLCBJIGdpdmUgdXBcbiAgICAgICAgc3Rkb3V0LFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRvbyBtYW55IGdlbmVyaWNzLCBJIGdpdmUgdXBcbiAgICAgICAgc3RkZXJyLFxuICAgICAgICBlcnJvcixcbiAgICAgICAgZXhpdENvZGUsXG4gICAgICAgIHNpZ25hbCxcbiAgICAgICAgdGltZWRPdXQsXG4gICAgICAgIGNvbW1hbmQsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHBhcmVudEVycm9yOiBuZXcgRXJyb3IoKSxcbiAgICAgIH0pIGFzIFQ7XG4gICAgfSxcbiAgICBbcGFyc2VPdXRwdXRSZWZdLFxuICApO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgVCBjYW4ndCBiZSBhIFByb21pc2Ugc28gaXQncyBhY3R1YWxseSB0aGUgc2FtZVxuICByZXR1cm4gdXNlQ2FjaGVkUHJvbWlzZShmbiwgW2NvbW1hbmQsIEFycmF5LmlzQXJyYXkob3B0aW9uc09yQXJncykgPyBvcHRpb25zT3JBcmdzIDogW10sIGV4ZWNPcHRpb25zLCBpbnB1dF0sIHtcbiAgICAuLi51c2VDYWNoZWRQcm9taXNlT3B0aW9ucyxcbiAgICBhYm9ydGFibGUsXG4gIH0pO1xufVxuIiwgImltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgY29uc3RhbnRzIGFzIEJ1ZmZlckNvbnN0YW50cyB9IGZyb20gXCJub2RlOmJ1ZmZlclwiO1xuaW1wb3J0IFN0cmVhbSBmcm9tIFwibm9kZTpzdHJlYW1cIjtcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJub2RlOnV0aWxcIjtcbmltcG9ydCB7IG9uRXhpdCB9IGZyb20gXCIuL3ZlbmRvcnMvc2lnbmFsLWV4aXRcIjtcblxuZXhwb3J0IHR5cGUgU3Bhd25lZFByb21pc2UgPSBQcm9taXNlPHtcbiAgZXhpdENvZGU6IG51bWJlciB8IG51bGw7XG4gIGVycm9yPzogRXJyb3I7XG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Bhd25lZFByb21pc2UoXG4gIHNwYXduZWQ6IGNoaWxkUHJvY2Vzcy5DaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMsXG4gIHsgdGltZW91dCB9OiB7IHRpbWVvdXQ/OiBudW1iZXIgfSA9IHt9LFxuKTogU3Bhd25lZFByb21pc2Uge1xuICBjb25zdCBzcGF3bmVkUHJvbWlzZTogU3Bhd25lZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgc3Bhd25lZC5vbihcImV4aXRcIiwgKGV4aXRDb2RlLCBzaWduYWwpID0+IHtcbiAgICAgIHJlc29sdmUoeyBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dDogZmFsc2UgfSk7XG4gICAgfSk7XG5cbiAgICBzcGF3bmVkLm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNwYXduZWQuc3RkaW4pIHtcbiAgICAgIHNwYXduZWQuc3RkaW4ub24oXCJlcnJvclwiLCAoZXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcmVtb3ZlRXhpdEhhbmRsZXIgPSBvbkV4aXQoKCkgPT4ge1xuICAgIHNwYXduZWQua2lsbCgpO1xuICB9KTtcblxuICBpZiAodGltZW91dCA9PT0gMCB8fCB0aW1lb3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc3Bhd25lZFByb21pc2UuZmluYWxseSgoKSA9PiByZW1vdmVFeGl0SGFuZGxlcigpKTtcbiAgfVxuXG4gIGxldCB0aW1lb3V0SWQ6IE5vZGVKUy5UaW1lb3V0O1xuICBjb25zdCB0aW1lb3V0UHJvbWlzZTogU3Bhd25lZFByb21pc2UgPSBuZXcgUHJvbWlzZSgoX3Jlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc3Bhd25lZC5raWxsKFwiU0lHVEVSTVwiKTtcbiAgICAgIHJlamVjdChPYmplY3QuYXNzaWduKG5ldyBFcnJvcihcIlRpbWVkIG91dFwiKSwgeyB0aW1lZE91dDogdHJ1ZSwgc2lnbmFsOiBcIlNJR1RFUk1cIiB9KSk7XG4gICAgfSwgdGltZW91dCk7XG4gIH0pO1xuXG4gIGNvbnN0IHNhZmVTcGF3bmVkUHJvbWlzZSA9IHNwYXduZWRQcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5yYWNlKFt0aW1lb3V0UHJvbWlzZSwgc2FmZVNwYXduZWRQcm9taXNlXSkuZmluYWxseSgoKSA9PiByZW1vdmVFeGl0SGFuZGxlcigpKTtcbn1cblxuY2xhc3MgTWF4QnVmZmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKFwiVGhlIG91dHB1dCBpcyB0b28gYmlnXCIpO1xuICAgIHRoaXMubmFtZSA9IFwiTWF4QnVmZmVyRXJyb3JcIjtcbiAgfVxufVxuXG5mdW5jdGlvbiBidWZmZXJTdHJlYW08VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4ob3B0aW9uczogeyBlbmNvZGluZzogQnVmZmVyRW5jb2RpbmcgfCBcImJ1ZmZlclwiIH0pIHtcbiAgY29uc3QgeyBlbmNvZGluZyB9ID0gb3B0aW9ucztcbiAgY29uc3QgaXNCdWZmZXIgPSBlbmNvZGluZyA9PT0gXCJidWZmZXJcIjtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIG1pc3NpbmcgdGhlIG1ldGhvZHMgd2UgYXJlIGFkZGluZyBiZWxvd1xuICBjb25zdCBzdHJlYW06IFN0cmVhbS5QYXNzVGhyb3VnaCAmIHsgZ2V0QnVmZmVyZWRWYWx1ZTogKCkgPT4gVDsgZ2V0QnVmZmVyZWRMZW5ndGg6ICgpID0+IG51bWJlciB9ID1cbiAgICBuZXcgU3RyZWFtLlBhc3NUaHJvdWdoKHsgb2JqZWN0TW9kZTogZmFsc2UgfSk7XG5cbiAgaWYgKGVuY29kaW5nICYmIGVuY29kaW5nICE9PSBcImJ1ZmZlclwiKSB7XG4gICAgc3RyZWFtLnNldEVuY29kaW5nKGVuY29kaW5nKTtcbiAgfVxuXG4gIGxldCBsZW5ndGggPSAwO1xuICBjb25zdCBjaHVua3M6IGFueVtdID0gW107XG5cbiAgc3RyZWFtLm9uKFwiZGF0YVwiLCAoY2h1bmspID0+IHtcbiAgICBjaHVua3MucHVzaChjaHVuayk7XG5cbiAgICBsZW5ndGggKz0gY2h1bmsubGVuZ3RoO1xuICB9KTtcblxuICBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gKGlzQnVmZmVyID8gQnVmZmVyLmNvbmNhdChjaHVua3MsIGxlbmd0aCkgOiBjaHVua3Muam9pbihcIlwiKSkgYXMgVDtcbiAgfTtcblxuICBzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGggPSAoKSA9PiBsZW5ndGg7XG5cbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RyZWFtPFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KFxuICBpbnB1dFN0cmVhbTogU3RyZWFtLlJlYWRhYmxlLFxuICBvcHRpb25zOiB7IGVuY29kaW5nOiBCdWZmZXJFbmNvZGluZyB8IFwiYnVmZmVyXCIgfSxcbikge1xuICBjb25zdCBzdHJlYW0gPSBidWZmZXJTdHJlYW08VD4ob3B0aW9ucyk7XG5cbiAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlamVjdFByb21pc2UgPSAoZXJyb3I6IEVycm9yICYgeyBidWZmZXJlZERhdGE/OiBUIH0pID0+IHtcbiAgICAgIC8vIERvbid0IHJldHJpZXZlIGFuIG92ZXJzaXplZCBidWZmZXIuXG4gICAgICBpZiAoZXJyb3IgJiYgc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPD0gQnVmZmVyQ29uc3RhbnRzLk1BWF9MRU5HVEgpIHtcbiAgICAgICAgZXJyb3IuYnVmZmVyZWREYXRhID0gc3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUoKTtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9O1xuXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByb21pc2lmeShTdHJlYW0ucGlwZWxpbmUpKGlucHV0U3RyZWFtLCBzdHJlYW0pO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZWplY3RQcm9taXNlKGVycm9yIGFzIGFueSk7XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIHN0cmVhbS5vbihcImRhdGFcIiwgKCkgPT4ge1xuICAgICAgLy8gODBtYlxuICAgICAgaWYgKHN0cmVhbS5nZXRCdWZmZXJlZExlbmd0aCgpID4gMTAwMCAqIDEwMDAgKiA4MCkge1xuICAgICAgICByZWplY3RQcm9taXNlKG5ldyBNYXhCdWZmZXJFcnJvcigpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHN0cmVhbS5nZXRCdWZmZXJlZFZhbHVlKCk7XG59XG5cbi8vIE9uIGZhaWx1cmUsIGByZXN1bHQuc3Rkb3V0fHN0ZGVycmAgc2hvdWxkIGNvbnRhaW4gdGhlIGN1cnJlbnRseSBidWZmZXJlZCBzdHJlYW1cbmFzeW5jIGZ1bmN0aW9uIGdldEJ1ZmZlcmVkRGF0YTxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihzdHJlYW06IFN0cmVhbS5SZWFkYWJsZSwgc3RyZWFtUHJvbWlzZTogUHJvbWlzZTxUPikge1xuICBzdHJlYW0uZGVzdHJveSgpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHN0cmVhbVByb21pc2U7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIChlcnJvciBhcyBhbnkgYXMgeyBidWZmZXJlZERhdGE6IFQgfSkuYnVmZmVyZWREYXRhO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTcGF3bmVkUmVzdWx0PFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KFxuICB7IHN0ZG91dCwgc3RkZXJyIH06IGNoaWxkUHJvY2Vzcy5DaGlsZFByb2Nlc3NXaXRob3V0TnVsbFN0cmVhbXMsXG4gIHsgZW5jb2RpbmcgfTogeyBlbmNvZGluZzogQnVmZmVyRW5jb2RpbmcgfCBcImJ1ZmZlclwiIH0sXG4gIHByb2Nlc3NEb25lOiBTcGF3bmVkUHJvbWlzZSxcbikge1xuICBjb25zdCBzdGRvdXRQcm9taXNlID0gZ2V0U3RyZWFtPFQ+KHN0ZG91dCwgeyBlbmNvZGluZyB9KTtcbiAgY29uc3Qgc3RkZXJyUHJvbWlzZSA9IGdldFN0cmVhbTxUPihzdGRlcnIsIHsgZW5jb2RpbmcgfSk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgUHJvbWlzZS5hbGwoW3Byb2Nlc3NEb25lLCBzdGRvdXRQcm9taXNlLCBzdGRlcnJQcm9taXNlXSk7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAge1xuICAgICAgICBlcnJvcjogZXJyb3IgYXMgRXJyb3IsXG4gICAgICAgIGV4aXRDb2RlOiBudWxsLFxuICAgICAgICBzaWduYWw6IGVycm9yLnNpZ25hbCBhcyBOb2RlSlMuU2lnbmFscyB8IG51bGwsXG4gICAgICAgIHRpbWVkT3V0OiAoZXJyb3IudGltZWRPdXQgYXMgYm9vbGVhbikgfHwgZmFsc2UsXG4gICAgICB9LFxuICAgICAgZ2V0QnVmZmVyZWREYXRhKHN0ZG91dCwgc3Rkb3V0UHJvbWlzZSksXG4gICAgICBnZXRCdWZmZXJlZERhdGEoc3RkZXJyLCBzdGRlcnJQcm9taXNlKSxcbiAgICBdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzdHJpcEZpbmFsTmV3bGluZTxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihpbnB1dDogVCkge1xuICBjb25zdCBMRiA9IHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIiA/IFwiXFxuXCIgOiBcIlxcblwiLmNoYXJDb2RlQXQoMCk7XG4gIGNvbnN0IENSID0gdHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiID8gXCJcXHJcIiA6IFwiXFxyXCIuY2hhckNvZGVBdCgwKTtcblxuICBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gPT09IExGKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSBhcmUgZG9pbmcgc29tZSBuYXN0eSBzdHVmZiBoZXJlXG4gICAgaW5wdXQgPSBpbnB1dC5zbGljZSgwLCAtMSk7XG4gIH1cblxuICBpZiAoaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV0gPT09IENSKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3ZSBhcmUgZG9pbmcgc29tZSBuYXN0eSBzdHVmZiBoZXJlXG4gICAgaW5wdXQgPSBpbnB1dC5zbGljZSgwLCAtMSk7XG4gIH1cblxuICByZXR1cm4gaW5wdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVPdXRwdXQ8VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4ob3B0aW9uczogeyBzdHJpcEZpbmFsTmV3bGluZT86IGJvb2xlYW4gfSwgdmFsdWU6IFQpIHtcbiAgaWYgKG9wdGlvbnMuc3RyaXBGaW5hbE5ld2xpbmUpIHtcbiAgICByZXR1cm4gc3RyaXBGaW5hbE5ld2xpbmUodmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRFcnJvclByZWZpeCh7XG4gIHRpbWVkT3V0LFxuICB0aW1lb3V0LFxuICBzaWduYWwsXG4gIGV4aXRDb2RlLFxufToge1xuICBleGl0Q29kZTogbnVtYmVyIHwgbnVsbDtcbiAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGw7XG4gIHRpbWVkT3V0OiBib29sZWFuO1xuICB0aW1lb3V0PzogbnVtYmVyO1xufSkge1xuICBpZiAodGltZWRPdXQpIHtcbiAgICByZXR1cm4gYHRpbWVkIG91dCBhZnRlciAke3RpbWVvdXR9IG1pbGxpc2Vjb25kc2A7XG4gIH1cblxuICBpZiAoc2lnbmFsICE9PSB1bmRlZmluZWQgJiYgc2lnbmFsICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGB3YXMga2lsbGVkIHdpdGggJHtzaWduYWx9YDtcbiAgfVxuXG4gIGlmIChleGl0Q29kZSAhPT0gdW5kZWZpbmVkICYmIGV4aXRDb2RlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHtleGl0Q29kZX1gO1xuICB9XG5cbiAgcmV0dXJuIFwiZmFpbGVkXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VFcnJvcih7XG4gIHN0ZG91dCxcbiAgc3RkZXJyLFxuICBlcnJvcixcbiAgc2lnbmFsLFxuICBleGl0Q29kZSxcbiAgY29tbWFuZCxcbiAgdGltZWRPdXQsXG4gIG9wdGlvbnMsXG4gIHBhcmVudEVycm9yLFxufToge1xuICBzdGRvdXQ6IHN0cmluZyB8IEJ1ZmZlcjtcbiAgc3RkZXJyOiBzdHJpbmcgfCBCdWZmZXI7XG4gIGVycm9yPzogRXJyb3I7XG4gIGV4aXRDb2RlOiBudW1iZXIgfCBudWxsO1xuICBzaWduYWw6IE5vZGVKUy5TaWduYWxzIHwgbnVsbDtcbiAgdGltZWRPdXQ6IGJvb2xlYW47XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgb3B0aW9ucz86IHsgdGltZW91dD86IG51bWJlciB9O1xuICBwYXJlbnRFcnJvcjogRXJyb3I7XG59KSB7XG4gIGNvbnN0IHByZWZpeCA9IGdldEVycm9yUHJlZml4KHsgdGltZWRPdXQsIHRpbWVvdXQ6IG9wdGlvbnM/LnRpbWVvdXQsIHNpZ25hbCwgZXhpdENvZGUgfSk7XG4gIGNvbnN0IGV4ZWNhTWVzc2FnZSA9IGBDb21tYW5kICR7cHJlZml4fTogJHtjb21tYW5kfWA7XG4gIGNvbnN0IHNob3J0TWVzc2FnZSA9IGVycm9yID8gYCR7ZXhlY2FNZXNzYWdlfVxcbiR7ZXJyb3IubWVzc2FnZX1gIDogZXhlY2FNZXNzYWdlO1xuICBjb25zdCBtZXNzYWdlID0gW3Nob3J0TWVzc2FnZSwgc3RkZXJyLCBzdGRvdXRdLmZpbHRlcihCb29sZWFuKS5qb2luKFwiXFxuXCIpO1xuXG4gIGlmIChlcnJvcikge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gICAgZXJyb3Iub3JpZ2luYWxNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgfSBlbHNlIHtcbiAgICBlcnJvciA9IHBhcmVudEVycm9yO1xuICB9XG5cbiAgZXJyb3IubWVzc2FnZSA9IG1lc3NhZ2U7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3Iuc2hvcnRNZXNzYWdlID0gc2hvcnRNZXNzYWdlO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5jb21tYW5kID0gY29tbWFuZDtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3IuZXhpdENvZGUgPSBleGl0Q29kZTtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3Iuc2lnbmFsID0gc2lnbmFsO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5zdGRvdXQgPSBzdGRvdXQ7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLnN0ZGVyciA9IHN0ZGVycjtcblxuICBpZiAoXCJidWZmZXJlZERhdGFcIiBpbiBlcnJvcikge1xuICAgIGRlbGV0ZSBlcnJvcltcImJ1ZmZlcmVkRGF0YVwiXTtcbiAgfVxuXG4gIHJldHVybiBlcnJvcjtcbn1cblxuZXhwb3J0IHR5cGUgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxcbiAgVCxcbiAgRGVjb2RlZE91dHB1dCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlciA9IHN0cmluZyB8IEJ1ZmZlcixcbiAgT3B0aW9ucyA9IHVua25vd24sXG4+ID0gKGFyZ3M6IHtcbiAgLyoqIFRoZSBvdXRwdXQgb2YgdGhlIHByb2Nlc3Mgb24gc3Rkb3V0LiAqL1xuICBzdGRvdXQ6IERlY29kZWRPdXRwdXQ7XG4gIC8qKiBUaGUgb3V0cHV0IG9mIHRoZSBwcm9jZXNzIG9uIHN0ZGVyci4gKi9cbiAgc3RkZXJyOiBEZWNvZGVkT3V0cHV0O1xuICBlcnJvcj86IEVycm9yO1xuICAvKiogVGhlIG51bWVyaWMgZXhpdCBjb2RlIG9mIHRoZSBwcm9jZXNzIHRoYXQgd2FzIHJ1bi4gKi9cbiAgZXhpdENvZGU6IG51bWJlciB8IG51bGw7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgc2lnbmFsIHRoYXQgd2FzIHVzZWQgdG8gdGVybWluYXRlIHRoZSBwcm9jZXNzLiBGb3IgZXhhbXBsZSwgU0lHRlBFLlxuICAgKlxuICAgKiBJZiBhIHNpZ25hbCB0ZXJtaW5hdGVkIHRoZSBwcm9jZXNzLCB0aGlzIHByb3BlcnR5IGlzIGRlZmluZWQuIE90aGVyd2lzZSBpdCBpcyBudWxsLlxuICAgKi9cbiAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGw7XG4gIC8qKiBXaGV0aGVyIHRoZSBwcm9jZXNzIHRpbWVkIG91dC4gKi9cbiAgdGltZWRPdXQ6IGJvb2xlYW47XG4gIC8qKiBUaGUgY29tbWFuZCB0aGF0IHdhcyBydW4sIGZvciBsb2dnaW5nIHB1cnBvc2VzLiAqL1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIG9wdGlvbnM/OiBPcHRpb25zO1xufSkgPT4gVDtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nPFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KHtcbiAgc3Rkb3V0LFxuICBzdGRlcnIsXG4gIGVycm9yLFxuICBleGl0Q29kZSxcbiAgc2lnbmFsLFxuICB0aW1lZE91dCxcbiAgY29tbWFuZCxcbiAgb3B0aW9ucyxcbiAgcGFyZW50RXJyb3IsXG59OiB7XG4gIHN0ZG91dDogVDtcbiAgc3RkZXJyOiBUO1xuICBlcnJvcj86IEVycm9yO1xuICBleGl0Q29kZTogbnVtYmVyIHwgbnVsbDtcbiAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGw7XG4gIHRpbWVkT3V0OiBib29sZWFuO1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIG9wdGlvbnM/OiB7IHRpbWVvdXQ/OiBudW1iZXIgfTtcbiAgcGFyZW50RXJyb3I6IEVycm9yO1xufSkge1xuICBpZiAoZXJyb3IgfHwgZXhpdENvZGUgIT09IDAgfHwgc2lnbmFsICE9PSBudWxsKSB7XG4gICAgY29uc3QgcmV0dXJuZWRFcnJvciA9IG1ha2VFcnJvcih7XG4gICAgICBlcnJvcixcbiAgICAgIGV4aXRDb2RlLFxuICAgICAgc2lnbmFsLFxuICAgICAgc3Rkb3V0LFxuICAgICAgc3RkZXJyLFxuICAgICAgY29tbWFuZCxcbiAgICAgIHRpbWVkT3V0LFxuICAgICAgb3B0aW9ucyxcbiAgICAgIHBhcmVudEVycm9yLFxuICAgIH0pO1xuXG4gICAgdGhyb3cgcmV0dXJuZWRFcnJvcjtcbiAgfVxuXG4gIHJldHVybiBzdGRvdXQ7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vLyBOb3RlOiBzaW5jZSBueWMgdXNlcyB0aGlzIG1vZHVsZSB0byBvdXRwdXQgY292ZXJhZ2UsIGFueSBsaW5lc1xuLy8gdGhhdCBhcmUgaW4gdGhlIGRpcmVjdCBzeW5jIGZsb3cgb2YgbnljJ3Mgb3V0cHV0Q292ZXJhZ2UgYXJlXG4vLyBpZ25vcmVkLCBzaW5jZSB3ZSBjYW4gbmV2ZXIgZ2V0IGNvdmVyYWdlIGZvciB0aGVtLlxuLy8gZ3JhYiBhIHJlZmVyZW5jZSB0byBub2RlJ3MgcmVhbCBwcm9jZXNzIG9iamVjdCByaWdodCBhd2F5XG5cbmNvbnN0IHByb2Nlc3NPayA9IChwcm9jZXNzOiBhbnkpID0+XG4gICEhcHJvY2VzcyAmJlxuICB0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLmVtaXQgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5yZWFsbHlFeGl0ID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3MubGlzdGVuZXJzID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3Mua2lsbCA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLnBpZCA9PT0gXCJudW1iZXJcIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5vbiA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3Qga0V4aXRFbWl0dGVyID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJzaWduYWwtZXhpdCBlbWl0dGVyXCIpO1xuLy8gdGVlbnkgc3BlY2lhbCBwdXJwb3NlIGVlXG5jbGFzcyBFbWl0dGVyIHtcbiAgZW1pdHRlZCA9IHtcbiAgICBhZnRlckV4aXQ6IGZhbHNlLFxuICAgIGV4aXQ6IGZhbHNlLFxuICB9O1xuICBsaXN0ZW5lcnMgPSB7XG4gICAgYWZ0ZXJFeGl0OiBbXSxcbiAgICBleGl0OiBbXSxcbiAgfTtcbiAgY291bnQgPSAwO1xuICBpZCA9IE1hdGgucmFuZG9tKCk7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAoZ2xvYmFsW2tFeGl0RW1pdHRlcl0pIHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHJldHVybiBnbG9iYWxba0V4aXRFbWl0dGVyXTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGdsb2JhbCwga0V4aXRFbWl0dGVyLCB7XG4gICAgICB2YWx1ZTogdGhpcyxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuICBvbihldjogYW55LCBmbjogYW55KSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMubGlzdGVuZXJzW2V2XS5wdXNoKGZuKTtcbiAgfVxuICByZW1vdmVMaXN0ZW5lcihldjogYW55LCBmbjogYW55KSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLmxpc3RlbmVyc1tldl07XG4gICAgY29uc3QgaSA9IGxpc3QuaW5kZXhPZihmbik7XG4gICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgaWYgKGkgPT09IDAgJiYgbGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG4gIGVtaXQoZXY6IGFueSwgY29kZTogYW55LCBzaWduYWw6IGFueSk6IGFueSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0aGlzLmVtaXR0ZWRbZXZdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmVtaXR0ZWRbZXZdID0gdHJ1ZTtcbiAgICBsZXQgcmV0ID0gZmFsc2U7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGZvciAoY29uc3QgZm4gb2YgdGhpcy5saXN0ZW5lcnNbZXZdKSB7XG4gICAgICByZXQgPSBmbihjb2RlLCBzaWduYWwpID09PSB0cnVlIHx8IHJldDtcbiAgICB9XG4gICAgaWYgKGV2ID09PSBcImV4aXRcIikge1xuICAgICAgcmV0ID0gdGhpcy5lbWl0KFwiYWZ0ZXJFeGl0XCIsIGNvZGUsIHNpZ25hbCkgfHwgcmV0O1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmNsYXNzIFNpZ25hbEV4aXRGYWxsYmFjayB7XG4gIG9uRXhpdCgpIHtcbiAgICByZXR1cm4gKCkgPT4ge307XG4gIH1cbiAgbG9hZCgpIHt9XG4gIHVubG9hZCgpIHt9XG59XG5jbGFzcyBTaWduYWxFeGl0IHtcbiAgLy8gXCJTSUdIVVBcIiB0aHJvd3MgYW4gYEVOT1NZU2AgZXJyb3Igb24gV2luZG93cyxcbiAgLy8gc28gdXNlIGEgc3VwcG9ydGVkIHNpZ25hbCBpbnN0ZWFkXG4gIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAvLyBAdHMtaWdub3JlXG4gICNodXBTaWcgPSBwcm9jZXNzLnBsYXRmb3JtID09PSBcIndpbjMyXCIgPyBcIlNJR0lOVFwiIDogXCJTSUdIVVBcIjtcbiAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgI2VtaXR0ZXIgPSBuZXcgRW1pdHRlcigpO1xuICAjcHJvY2VzczogYW55O1xuICAjb3JpZ2luYWxQcm9jZXNzRW1pdDogYW55O1xuICAjb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdDogYW55O1xuICAjc2lnTGlzdGVuZXJzID0ge307XG4gICNsb2FkZWQgPSBmYWxzZTtcbiAgI3NpZ25hbHM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0cnVjdG9yKHByb2Nlc3M6IGFueSkge1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgbm90IHRoZSBzZXQgb2YgYWxsIHBvc3NpYmxlIHNpZ25hbHMuXG4gICAgICpcbiAgICAgKiBJdCBJUywgaG93ZXZlciwgdGhlIHNldCBvZiBhbGwgc2lnbmFscyB0aGF0IHRyaWdnZXJcbiAgICAgKiBhbiBleGl0IG9uIGVpdGhlciBMaW51eCBvciBCU0Qgc3lzdGVtcy4gIExpbnV4IGlzIGFcbiAgICAgKiBzdXBlcnNldCBvZiB0aGUgc2lnbmFsIG5hbWVzIHN1cHBvcnRlZCBvbiBCU0QsIGFuZFxuICAgICAqIHRoZSB1bmtub3duIHNpZ25hbHMganVzdCBmYWlsIHRvIHJlZ2lzdGVyLCBzbyB3ZSBjYW5cbiAgICAgKiBjYXRjaCB0aGF0IGVhc2lseSBlbm91Z2guXG4gICAgICpcbiAgICAgKiBXaW5kb3dzIHNpZ25hbHMgYXJlIGEgZGlmZmVyZW50IHNldCwgc2luY2UgdGhlcmUgYXJlXG4gICAgICogc2lnbmFscyB0aGF0IHRlcm1pbmF0ZSBXaW5kb3dzIHByb2Nlc3NlcywgYnV0IGRvbid0XG4gICAgICogdGVybWluYXRlIChvciBkb24ndCBldmVuIGV4aXN0KSBvbiBQb3NpeCBzeXN0ZW1zLlxuICAgICAqXG4gICAgICogRG9uJ3QgYm90aGVyIHdpdGggU0lHS0lMTC4gIEl0J3MgdW5jYXRjaGFibGUsIHdoaWNoXG4gICAgICogbWVhbnMgdGhhdCB3ZSBjYW4ndCBmaXJlIGFueSBjYWxsYmFja3MgYW55d2F5LlxuICAgICAqXG4gICAgICogSWYgYSB1c2VyIGRvZXMgaGFwcGVuIHRvIHJlZ2lzdGVyIGEgaGFuZGxlciBvbiBhIG5vbi1cbiAgICAgKiBmYXRhbCBzaWduYWwgbGlrZSBTSUdXSU5DSCBvciBzb21ldGhpbmcsIGFuZCB0aGVuXG4gICAgICogZXhpdCwgaXQnbGwgZW5kIHVwIGZpcmluZyBgcHJvY2Vzcy5lbWl0KCdleGl0JylgLCBzb1xuICAgICAqIHRoZSBoYW5kbGVyIHdpbGwgYmUgZmlyZWQgYW55d2F5LlxuICAgICAqXG4gICAgICogU0lHQlVTLCBTSUdGUEUsIFNJR1NFR1YgYW5kIFNJR0lMTCwgd2hlbiBub3QgcmFpc2VkXG4gICAgICogYXJ0aWZpY2lhbGx5LCBpbmhlcmVudGx5IGxlYXZlIHRoZSBwcm9jZXNzIGluIGFcbiAgICAgKiBzdGF0ZSBmcm9tIHdoaWNoIGl0IGlzIG5vdCBzYWZlIHRvIHRyeSBhbmQgZW50ZXIgSlNcbiAgICAgKiBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgdGhpcy4jc2lnbmFscy5wdXNoKFwiU0lHSFVQXCIsIFwiU0lHSU5UXCIsIFwiU0lHVEVSTVwiKTtcbiAgICBpZiAoZ2xvYmFsVGhpcy5wcm9jZXNzLnBsYXRmb3JtICE9PSBcIndpbjMyXCIpIHtcbiAgICAgIHRoaXMuI3NpZ25hbHMucHVzaChcbiAgICAgICAgXCJTSUdBTFJNXCIsXG4gICAgICAgIFwiU0lHQUJSVFwiLFxuICAgICAgICBcIlNJR1ZUQUxSTVwiLFxuICAgICAgICBcIlNJR1hDUFVcIixcbiAgICAgICAgXCJTSUdYRlNaXCIsXG4gICAgICAgIFwiU0lHVVNSMlwiLFxuICAgICAgICBcIlNJR1RSQVBcIixcbiAgICAgICAgXCJTSUdTWVNcIixcbiAgICAgICAgXCJTSUdRVUlUXCIsXG4gICAgICAgIFwiU0lHSU9UXCIsXG4gICAgICAgIC8vIHNob3VsZCBkZXRlY3QgcHJvZmlsZXIgYW5kIGVuYWJsZS9kaXNhYmxlIGFjY29yZGluZ2x5LlxuICAgICAgICAvLyBzZWUgIzIxXG4gICAgICAgIC8vICdTSUdQUk9GJ1xuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGdsb2JhbFRoaXMucHJvY2Vzcy5wbGF0Zm9ybSA9PT0gXCJsaW51eFwiKSB7XG4gICAgICB0aGlzLiNzaWduYWxzLnB1c2goXCJTSUdJT1wiLCBcIlNJR1BPTExcIiwgXCJTSUdQV1JcIiwgXCJTSUdTVEtGTFRcIik7XG4gICAgfVxuICAgIHRoaXMuI3Byb2Nlc3MgPSBwcm9jZXNzO1xuICAgIC8vIHsgPHNpZ25hbD46IDxsaXN0ZW5lciBmbj4sIC4uLiB9XG4gICAgdGhpcy4jc2lnTGlzdGVuZXJzID0ge307XG4gICAgZm9yIChjb25zdCBzaWcgb2YgdGhpcy4jc2lnbmFscykge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgdGhpcy4jc2lnTGlzdGVuZXJzW3NpZ10gPSAoKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBubyBvdGhlciBsaXN0ZW5lcnMsIGFuIGV4aXQgaXMgY29taW5nIVxuICAgICAgICAvLyBTaW1wbGVzdCB3YXk6IHJlbW92ZSB1cyBhbmQgdGhlbiByZS1zZW5kIHRoZSBzaWduYWwuXG4gICAgICAgIC8vIFdlIGtub3cgdGhhdCB0aGlzIHdpbGwga2lsbCB0aGUgcHJvY2Vzcywgc28gd2UgY2FuXG4gICAgICAgIC8vIHNhZmVseSBlbWl0IG5vdy5cbiAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy4jcHJvY2Vzcy5saXN0ZW5lcnMoc2lnKTtcbiAgICAgICAgbGV0IHsgY291bnQgfSA9IHRoaXMuI2VtaXR0ZXI7XG4gICAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciB0aGUgZmFjdCB0aGF0IHNpZ25hbC1leGl0IHYzIGFuZCBzaWduYWxcbiAgICAgICAgLy8gZXhpdCB2NCBhcmUgbm90IGF3YXJlIG9mIGVhY2ggb3RoZXIsIGFuZCBlYWNoIHdpbGwgYXR0ZW1wdCB0byBsZXRcbiAgICAgICAgLy8gdGhlIG90aGVyIGhhbmRsZSBpdCwgc28gbmVpdGhlciBvZiB0aGVtIGRvLiBUbyBjb3JyZWN0IHRoaXMsIHdlXG4gICAgICAgIC8vIGRldGVjdCBpZiB3ZSdyZSB0aGUgb25seSBoYW5kbGVyICpleGNlcHQqIGZvciBwcmV2aW91cyB2ZXJzaW9uc1xuICAgICAgICAvLyBvZiBzaWduYWwtZXhpdCwgYW5kIGluY3JlbWVudCBieSB0aGUgY291bnQgb2YgbGlzdGVuZXJzIGl0IGhhc1xuICAgICAgICAvLyBjcmVhdGVkLlxuICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgICAgY29uc3QgcCA9IHByb2Nlc3M7XG4gICAgICAgIGlmICh0eXBlb2YgcC5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfXyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgcC5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfXy5jb3VudCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGNvdW50ICs9IHAuX19zaWduYWxfZXhpdF9lbWl0dGVyX18uY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IGNvdW50KSB7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgICAgICBjb25zdCByZXQgPSB0aGlzLiNlbWl0dGVyLmVtaXQoXCJleGl0XCIsIG51bGwsIHNpZyk7XG4gICAgICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICAgICAgY29uc3QgcyA9IHNpZyA9PT0gXCJTSUdIVVBcIiA/IHRoaXMuI2h1cFNpZyA6IHNpZztcbiAgICAgICAgICBpZiAoIXJldCkgcHJvY2Vzcy5raWxsKHByb2Nlc3MucGlkLCBzKTtcbiAgICAgICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLiNvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0ID0gcHJvY2Vzcy5yZWFsbHlFeGl0O1xuICAgIHRoaXMuI29yaWdpbmFsUHJvY2Vzc0VtaXQgPSBwcm9jZXNzLmVtaXQ7XG4gIH1cbiAgb25FeGl0KGNiOiBhbnksIG9wdHM6IGFueSkge1xuICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgIGlmICghcHJvY2Vzc09rKHRoaXMuI3Byb2Nlc3MpKSB7XG4gICAgICByZXR1cm4gKCkgPT4ge307XG4gICAgfVxuICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgaWYgKHRoaXMuI2xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgICBjb25zdCBldiA9IG9wdHM/LmFsd2F5c0xhc3QgPyBcImFmdGVyRXhpdFwiIDogXCJleGl0XCI7XG4gICAgdGhpcy4jZW1pdHRlci5vbihldiwgY2IpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLiNlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKGV2LCBjYik7XG4gICAgICBpZiAodGhpcy4jZW1pdHRlci5saXN0ZW5lcnNbXCJleGl0XCJdLmxlbmd0aCA9PT0gMCAmJiB0aGlzLiNlbWl0dGVyLmxpc3RlbmVyc1tcImFmdGVyRXhpdFwiXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy51bmxvYWQoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGxvYWQoKSB7XG4gICAgaWYgKHRoaXMuI2xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLiNsb2FkZWQgPSB0cnVlO1xuICAgIC8vIFRoaXMgaXMgdGhlIG51bWJlciBvZiBvblNpZ25hbEV4aXQncyB0aGF0IGFyZSBpbiBwbGF5LlxuICAgIC8vIEl0J3MgaW1wb3J0YW50IHNvIHRoYXQgd2UgY2FuIGNvdW50IHRoZSBjb3JyZWN0IG51bWJlciBvZlxuICAgIC8vIGxpc3RlbmVycyBvbiBzaWduYWxzLCBhbmQgZG9uJ3Qgd2FpdCBmb3IgdGhlIG90aGVyIG9uZSB0b1xuICAgIC8vIGhhbmRsZSBpdCBpbnN0ZWFkIG9mIHVzLlxuICAgIHRoaXMuI2VtaXR0ZXIuY291bnQgKz0gMTtcbiAgICBmb3IgKGNvbnN0IHNpZyBvZiB0aGlzLiNzaWduYWxzKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IGZuID0gdGhpcy4jc2lnTGlzdGVuZXJzW3NpZ107XG4gICAgICAgIGlmIChmbikgdGhpcy4jcHJvY2Vzcy5vbihzaWcsIGZuKTtcbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgLy8gbm8tb3BcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4jcHJvY2Vzcy5lbWl0ID0gKGV2OiBhbnksIC4uLmE6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuI3Byb2Nlc3NFbWl0KGV2LCAuLi5hKTtcbiAgICB9O1xuICAgIHRoaXMuI3Byb2Nlc3MucmVhbGx5RXhpdCA9IChjb2RlOiBhbnkpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLiNwcm9jZXNzUmVhbGx5RXhpdChjb2RlKTtcbiAgICB9O1xuICB9XG4gIHVubG9hZCgpIHtcbiAgICBpZiAoIXRoaXMuI2xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLiNsb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLiNzaWduYWxzLmZvckVhY2goKHNpZykgPT4ge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLiNzaWdMaXN0ZW5lcnNbc2lnXTtcbiAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMaXN0ZW5lciBub3QgZGVmaW5lZCBmb3Igc2lnbmFsOiBcIiArIHNpZyk7XG4gICAgICB9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy4jcHJvY2Vzcy5yZW1vdmVMaXN0ZW5lcihzaWcsIGxpc3RlbmVyKTtcbiAgICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIH0pO1xuICAgIHRoaXMuI3Byb2Nlc3MuZW1pdCA9IHRoaXMuI29yaWdpbmFsUHJvY2Vzc0VtaXQ7XG4gICAgdGhpcy4jcHJvY2Vzcy5yZWFsbHlFeGl0ID0gdGhpcy4jb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdDtcbiAgICB0aGlzLiNlbWl0dGVyLmNvdW50IC09IDE7XG4gIH1cbiAgI3Byb2Nlc3NSZWFsbHlFeGl0KGNvZGU6IGFueSkge1xuICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgIGlmICghcHJvY2Vzc09rKHRoaXMuI3Byb2Nlc3MpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSA9IGNvZGUgfHwgMDtcbiAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgIHRoaXMuI2VtaXR0ZXIuZW1pdChcImV4aXRcIiwgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSwgbnVsbCk7XG4gICAgcmV0dXJuIHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQuY2FsbCh0aGlzLiNwcm9jZXNzLCB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlKTtcbiAgfVxuICAjcHJvY2Vzc0VtaXQoZXY6IGFueSwgLi4uYXJnczogYW55KSB7XG4gICAgY29uc3Qgb2cgPSB0aGlzLiNvcmlnaW5hbFByb2Nlc3NFbWl0O1xuICAgIGlmIChldiA9PT0gXCJleGl0XCIgJiYgcHJvY2Vzc09rKHRoaXMuI3Byb2Nlc3MpKSB7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgdGhpcy4jcHJvY2Vzcy5leGl0Q29kZSA9IGFyZ3NbMF07XG4gICAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgfVxuICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICBjb25zdCByZXQgPSBvZy5jYWxsKHRoaXMuI3Byb2Nlc3MsIGV2LCAuLi5hcmdzKTtcbiAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgdGhpcy4jZW1pdHRlci5lbWl0KFwiZXhpdFwiLCB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlLCBudWxsKTtcbiAgICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb2cuY2FsbCh0aGlzLiNwcm9jZXNzLCBldiwgLi4uYXJncyk7XG4gICAgfVxuICB9XG59XG5cbmxldCBzaWduYWxFeGl0OiBTaWduYWxFeGl0IHwgU2lnbmFsRXhpdEZhbGxiYWNrIHwgbnVsbCA9IG51bGw7XG5cbmV4cG9ydCBjb25zdCBvbkV4aXQgPSAoXG4gIGNiOiBhbnksXG4gIG9wdHM/OiB7XG4gICAgYWx3YXlzTGFzdD86IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIH0sXG4pID0+IHtcbiAgaWYgKCFzaWduYWxFeGl0KSB7XG4gICAgc2lnbmFsRXhpdCA9IHByb2Nlc3NPayhwcm9jZXNzKSA/IG5ldyBTaWduYWxFeGl0KHByb2Nlc3MpIDogbmV3IFNpZ25hbEV4aXRGYWxsYmFjaygpO1xuICB9XG4gIHJldHVybiBzaWduYWxFeGl0Lm9uRXhpdChjYiwgb3B0cyk7XG59O1xuIiwgImltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgY3JlYXRlUmVhZFN0cmVhbSwgY3JlYXRlV3JpdGVTdHJlYW0sIG1rZGlyU3luYywgU3RhdHMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgc3RhdCB9IGZyb20gXCJub2RlOmZzL3Byb21pc2VzXCI7XG5pbXBvcnQgeyBqb2luLCBub3JtYWxpemUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBwaXBlbGluZSB9IGZyb20gXCJub2RlOnN0cmVhbS9wcm9taXNlc1wiO1xuaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ2hhaW4gZnJvbSBcIi4vdmVuZG9ycy9zdHJlYW0tY2hhaW5cIjtcbmltcG9ydCB7IHBhcnNlciwgUGlja1BhcnNlciwgU3RyZWFtQXJyYXkgfSBmcm9tIFwiLi92ZW5kb3JzL3N0cmVhbS1qc29uXCI7XG5pbXBvcnQgeyBpc0pTT04gfSBmcm9tIFwiLi9mZXRjaC11dGlsc1wiO1xuaW1wb3J0IHsgRmxhdHRlbiwgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBDYWNoZWRQcm9taXNlT3B0aW9ucywgdXNlQ2FjaGVkUHJvbWlzZSB9IGZyb20gXCIuL3VzZUNhY2hlZFByb21pc2VcIjtcbmltcG9ydCB7IGhhc2ggfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbnR5cGUgUmVxdWVzdEluZm8gPSBzdHJpbmcgfCBVUkwgfCBnbG9iYWxUaGlzLlJlcXVlc3Q7XG5cbmFzeW5jIGZ1bmN0aW9uIGNhY2hlKHVybDogUmVxdWVzdEluZm8sIGRlc3RpbmF0aW9uOiBzdHJpbmcsIGZldGNoT3B0aW9ucz86IFJlcXVlc3RJbml0KSB7XG4gIGlmICh0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiIHx8IHVybC5zdGFydHNXaXRoKFwiaHR0cDovL1wiKSB8fCB1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKSB7XG4gICAgcmV0dXJuIGF3YWl0IGNhY2hlVVJMKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gIH0gZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKSB7XG4gICAgcmV0dXJuIGF3YWl0IGNhY2hlRmlsZShcbiAgICAgIG5vcm1hbGl6ZShkZWNvZGVVUklDb21wb25lbnQobmV3IFVSTCh1cmwpLnBhdGhuYW1lKSksXG4gICAgICBkZXN0aW5hdGlvbixcbiAgICAgIGZldGNoT3B0aW9ucz8uc2lnbmFsID8gZmV0Y2hPcHRpb25zLnNpZ25hbCA6IHVuZGVmaW5lZCxcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk9ubHkgSFRUUChTKSBvciBmaWxlIFVSTHMgYXJlIHN1cHBvcnRlZFwiKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjYWNoZVVSTCh1cmw6IFJlcXVlc3RJbmZvLCBkZXN0aW5hdGlvbjogc3RyaW5nLCBmZXRjaE9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgZmV0Y2hPcHRpb25zKTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIFVSTFwiKTtcbiAgfVxuXG4gIGlmICghaXNKU09OKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiY29udGVudC10eXBlXCIpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVSTCBkb2VzIG5vdCByZXR1cm4gSlNPTlwiKTtcbiAgfVxuICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcmV0cmlldmUgZXhwZWN0ZWQgSlNPTiBjb250ZW50OiBSZXNwb25zZSBib2R5IGlzIG1pc3Npbmcgb3IgaW5hY2Nlc3NpYmxlLlwiKTtcbiAgfVxuICBhd2FpdCBwaXBlbGluZShcbiAgICByZXNwb25zZS5ib2R5IGFzIHVua25vd24gYXMgTm9kZUpTLlJlYWRhYmxlU3RyZWFtLFxuICAgIGNyZWF0ZVdyaXRlU3RyZWFtKGRlc3RpbmF0aW9uKSxcbiAgICBmZXRjaE9wdGlvbnM/LnNpZ25hbCA/IHsgc2lnbmFsOiBmZXRjaE9wdGlvbnMuc2lnbmFsIH0gOiB1bmRlZmluZWQsXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhY2hlRmlsZShzb3VyY2U6IHN0cmluZywgZGVzdGluYXRpb246IHN0cmluZywgYWJvcnRTaWduYWw/OiBBYm9ydFNpZ25hbCkge1xuICBhd2FpdCBwaXBlbGluZShcbiAgICBjcmVhdGVSZWFkU3RyZWFtKHNvdXJjZSksXG4gICAgY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGluYXRpb24pLFxuICAgIGFib3J0U2lnbmFsID8geyBzaWduYWw6IGFib3J0U2lnbmFsIH0gOiB1bmRlZmluZWQsXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhY2hlVVJMSWZOZWNlc3NhcnkoXG4gIHVybDogUmVxdWVzdEluZm8sXG4gIGZvbGRlcjogc3RyaW5nLFxuICBmaWxlTmFtZTogc3RyaW5nLFxuICBmb3JjZVVwZGF0ZTogYm9vbGVhbixcbiAgZmV0Y2hPcHRpb25zPzogUmVxdWVzdEluaXQsXG4pIHtcbiAgY29uc3QgZGVzdGluYXRpb24gPSBqb2luKGZvbGRlciwgZmlsZU5hbWUpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgc3RhdChmb2xkZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgbWtkaXJTeW5jKGZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgYXdhaXQgY2FjaGUodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGZvcmNlVXBkYXRlKSB7XG4gICAgYXdhaXQgY2FjaGUodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgc3RhdHM6IFN0YXRzIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIHN0YXRzID0gYXdhaXQgc3RhdChkZXN0aW5hdGlvbik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhd2FpdCBjYWNoZSh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdXJsID09PSBcIm9iamVjdFwiIHx8IHVybC5zdGFydHNXaXRoKFwiaHR0cDovL1wiKSB8fCB1cmwuc3RhcnRzV2l0aChcImh0dHBzOi8vXCIpKSB7XG4gICAgY29uc3QgaGVhZFJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IC4uLmZldGNoT3B0aW9ucywgbWV0aG9kOiBcIkhFQURcIiB9KTtcbiAgICBpZiAoIWhlYWRSZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGZldGNoIFVSTFwiKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzSlNPTihoZWFkUmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVUkwgZG9lcyBub3QgcmV0dXJuIEpTT05cIik7XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdE1vZGlmaWVkID0gRGF0ZS5wYXJzZShoZWFkUmVzcG9uc2UuaGVhZGVycy5nZXQoXCJsYXN0LW1vZGlmaWVkXCIpID8/IFwiXCIpO1xuICAgIGlmIChzdGF0cy5zaXplID09PSAwIHx8IE51bWJlci5pc05hTihsYXN0TW9kaWZpZWQpIHx8IGxhc3RNb2RpZmllZCA+IHN0YXRzLm10aW1lTXMpIHtcbiAgICAgIGF3YWl0IGNhY2hlKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9IGVsc2UgaWYgKHVybC5zdGFydHNXaXRoKFwiZmlsZTovL1wiKSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzb3VyY2VTdGF0cyA9IGF3YWl0IHN0YXQobm9ybWFsaXplKGRlY29kZVVSSUNvbXBvbmVudChuZXcgVVJMKHVybCkucGF0aG5hbWUpKSk7XG4gICAgICBpZiAoc291cmNlU3RhdHMubXRpbWVNcyA+IHN0YXRzLm10aW1lTXMpIHtcbiAgICAgICAgYXdhaXQgY2FjaGUodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTb3VyY2UgZmlsZSBjb3VsZCBub3QgYmUgcmVhZFwiKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBIVFRQKFMpIG9yIGZpbGUgVVJMcyBhcmUgc3VwcG9ydGVkXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uKiBzdHJlYW1Kc29uRmlsZTxUPihcbiAgZmlsZVBhdGg6IHN0cmluZyxcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgYWJvcnRTaWduYWw/OiBBYm9ydFNpZ25hbCxcbiAgZGF0YVBhdGg/OiBzdHJpbmcgfCBSZWdFeHAsXG4gIGZpbHRlckZuPzogKGl0ZW06IEZsYXR0ZW48VD4pID0+IGJvb2xlYW4sXG4gIHRyYW5zZm9ybUZuPzogKGl0ZW06IGFueSkgPT4gVCxcbik6IEFzeW5jR2VuZXJhdG9yPFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdPiB7XG4gIGxldCBwYWdlOiBUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXSA9IFtdIGFzIFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdO1xuXG4gIGNvbnN0IHBpcGVsaW5lID0gQ2hhaW4oW1xuICAgIGNyZWF0ZVJlYWRTdHJlYW0oZmlsZVBhdGgpLFxuICAgIGRhdGFQYXRoID8gUGlja1BhcnNlcih7IGZpbHRlcjogZGF0YVBhdGggfSkgOiBwYXJzZXIoKSxcbiAgICBTdHJlYW1BcnJheSgpLFxuICAgIChkYXRhOiBhbnkpID0+IHRyYW5zZm9ybUZuPy4oZGF0YS52YWx1ZSkgPz8gZGF0YS52YWx1ZSxcbiAgXSk7XG5cbiAgYWJvcnRTaWduYWw/LmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCAoKSA9PiB7XG4gICAgcGlwZWxpbmUuZGVzdHJveSgpO1xuICB9KTtcblxuICB0cnkge1xuICAgIGZvciBhd2FpdCAoY29uc3QgZGF0YSBvZiBwaXBlbGluZSkge1xuICAgICAgaWYgKGFib3J0U2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICAgIGlmICghZmlsdGVyRm4gfHwgZmlsdGVyRm4oZGF0YSkpIHtcbiAgICAgICAgcGFnZS5wdXNoKGRhdGEpO1xuICAgICAgfVxuICAgICAgaWYgKHBhZ2UubGVuZ3RoID49IHBhZ2VTaXplKSB7XG4gICAgICAgIHlpZWxkIHBhZ2U7XG4gICAgICAgIHBhZ2UgPSBbXSBhcyBUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXTtcbiAgICAgIH1cbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBwaXBlbGluZS5kZXN0cm95KCk7XG4gICAgdGhyb3cgZTtcbiAgfVxuXG4gIGlmIChwYWdlLmxlbmd0aCA+IDApIHtcbiAgICB5aWVsZCBwYWdlO1xuICB9XG5cbiAgcmV0dXJuIFtdO1xufVxuXG50eXBlIE9wdGlvbnM8VD4gPSB7XG4gIC8qKlxuICAgKiBUaGUgaG9vayBleHBlY3RzIHRvIGl0ZXJhdGUgdGhyb3VnaCBhbiBhcnJheSBvZiBkYXRhLCBzbyBieSBkZWZhdWx0LCBpdCBhc3N1bWVzIHRoZSBKU09OIGl0IHJlY2VpdmVzIGl0c2VsZiByZXByZXNlbnRzIGFuIGFycmF5LiBIb3dldmVyLCBzb21ldGltZXMgdGhlIGFycmF5IG9mIGRhdGEgaXMgd3JhcHBlZCBpbiBhbiBvYmplY3QsXG4gICAqIGkuZS4gYHsgXCJzdWNjZXNzXCI6IHRydWUsIFwiZGF0YVwiOiBb4oCmXSB9YCwgb3IgZXZlbiBgeyBcInN1Y2Nlc3NcIjogdHJ1ZSwgXCJyZXN1bHRzXCI6IHsgXCJkYXRhXCI6IFvigKZdIH0gfWAuIEluIHRob3NlIGNhc2VzLCB5b3UgY2FuIHVzZSBgZGF0YVBhdGhgIHRvIHNwZWNpZnkgd2hlcmUgdGhlIGRhdGEgYXJyYXkgY2FuIGJlIGZvdW5kLlxuICAgKlxuICAgKiBAcmVtYXJrIElmIHlvdXIgSlNPTiBvYmplY3QgaGFzIG11bHRpcGxlIGFycmF5cyB0aGF0IHlvdSB3YW50IHRvIHN0cmVhbSBkYXRhIGZyb20sIHlvdSBjYW4gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBzdHJlYW0gdGhyb3VnaCBhbGwgb2YgdGhlbS5cbiAgICpcbiAgICogQGV4YW1wbGUgRm9yIGB7IFwic3VjY2Vzc1wiOiB0cnVlLCBcImRhdGFcIjogW+KApl0gfWAsIGRhdGFQYXRoIHdvdWxkIGJlIGBkYXRhYFxuICAgKiBAZXhhbXBsZSBGb3IgYHsgXCJzdWNjZXNzXCI6IHRydWUsIFwicmVzdWx0c1wiOiB7IFwiZGF0YVwiOiBb4oCmXSB9IH1gLCBkYXRhUGF0aCB3b3VsZCBiZSBgcmVzdWx0cy5kYXRhYFxuICAgKiBAZXhhbXBsZSBGb3IgYHsgXCJzdWNjZXNzXCI6IHRydWUsIFwicmVzdWx0c1wiOiB7IFwiZmlyc3RfbGlzdFwiOiBb4oCmXSwgXCJzZWNvbmRfbGlzdFwiOiBb4oCmXSwgXCJ0aGlyZF9saXN0XCI6IFvigKZdIH0gfWAsIGRhdGFQYXRoIHdvdWxkIGJlIGAvXnJlc3VsdHNcXC4oZmlyc3RfbGlzdHxzZWNvbmRfbGlzdHx0aGlyZF9saXN0KSRcbi9gLlxuICAgKi9cbiAgZGF0YVBhdGg/OiBzdHJpbmcgfCBSZWdFeHA7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGRlY2lkZSB3aGV0aGVyIGEgcGFydGljdWxhciBpdGVtIHNob3VsZCBiZSBrZXB0IG9yIG5vdC5cbiAgICogRGVmYXVsdHMgdG8gYHVuZGVmaW5lZGAsIGtlZXBpbmcgYW55IGVuY291bnRlcmVkIGl0ZW0uXG4gICAqXG4gICAqIEByZW1hcmsgVGhlIGhvb2sgd2lsbCByZXZhbGlkYXRlIGV2ZXJ5IHRpbWUgdGhlIGZpbHRlciBmdW5jdGlvbiBjaGFuZ2VzLCBzbyB5b3UgbmVlZCB0byB1c2UgW3VzZUNhbGxiYWNrXShodHRwczovL3JlYWN0LmRldi9yZWZlcmVuY2UvcmVhY3QvdXNlQ2FsbGJhY2spIHRvIG1ha2Ugc3VyZSBpdCBvbmx5IGNoYW5nZXMgd2hlbiBpdCBuZWVkcyB0by5cbiAgICovXG4gIGZpbHRlcj86IChpdGVtOiBGbGF0dGVuPFQ+KSA9PiBib29sZWFuO1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGl0ZW0gYXMgaXQgaXMgZW5jb3VudGVyZWQuIFVzZWZ1bCBmb3IgYSBjb3VwbGUgb2YgdGhpbmdzOlxuICAgKiAxLiBlbnN1cmluZyB0aGF0IGFsbCBpdGVtcyBoYXZlIHRoZSBleHBlY3RlZCBwcm9wZXJ0aWVzLCBhbmQsIGFzIG9uIG9wdGltaXphdGlvbiwgZm9yIGdldHRpbmcgcmlkIG9mIHRoZSBwcm9wZXJ0aWVzIHRoYXQgeW91IGRvbid0IGNhcmUgYWJvdXQuXG4gICAqIDIuIHdoZW4gdG9wLWxldmVsIG9iamVjdHMgYWN0dWFsbHkgcmVwcmVzZW50IG5lc3RlZCBkYXRhLCB3aGljaCBzaG91bGQgYmUgZmxhdHRlbmVkLiBJbiB0aGlzIGNhc2UsIGB0cmFuc2Zvcm1gIGNhbiByZXR1cm4gYW4gYXJyYXkgb2YgaXRlbXMsIGFuZCB0aGUgaG9vayB3aWxsIHN0cmVhbSB0aHJvdWdoIGVhY2ggb25lIG9mIHRob3NlIGl0ZW1zLFxuICAgKiBwYXNzaW5nIHRoZW0gdG8gYGZpbHRlcmAgZXRjLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBhIHBhc3N0aHJvdWdoIGZ1bmN0aW9uIGlmIG5vdCBwcm92aWRlZC5cbiAgICpcbiAgICogQHJlbWFyayBUaGUgaG9vayB3aWxsIHJldmFsaWRhdGUgZXZlcnkgdGltZSB0aGUgdHJhbnNmb3JtIGZ1bmN0aW9uIGNoYW5nZXMsIHNvIGl0IGlzIGltcG9ydGFudCB0byB1c2UgW3VzZUNhbGxiYWNrXShodHRwczovL3JlYWN0LmRldi9yZWZlcmVuY2UvcmVhY3QvdXNlQ2FsbGJhY2spIHRvIGVuc3VyZSBpdCBvbmx5IGNoYW5nZXMgd2hlbiBuZWNlc3NhcnkgdG8gcHJldmVudCB1bm5lY2Vzc2FyeSByZS1yZW5kZXJzIG9yIGNvbXB1dGF0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgXG4gICAqIC8vIEZvciBkYXRhOiBgeyBcImRhdGFcIjogWyB7IFwidHlwZVwiOiBcImZvbGRlclwiLCBcIm5hbWVcIjogXCJpdGVtIDFcIiwgXCJjaGlsZHJlblwiOiBbIHsgXCJ0eXBlXCI6IFwiaXRlbVwiLCBcIm5hbWVcIjogXCJpdGVtIDJcIiB9LCB7IFwidHlwZVwiOiBcIml0ZW1cIiwgXCJuYW1lXCI6IFwiaXRlbSAzXCIgfSBdIH0sIHsgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsIFwibmFtZVwiOiBcIml0ZW0gNFwiLCBjaGlsZHJlbjogW10gfSBdIH1gXG4gICAqXG4gICAqIHR5cGUgSXRlbSA9IHtcbiAgICogIHR5cGU6IFwiaXRlbVwiO1xuICAgKiAgbmFtZTogc3RyaW5nO1xuICAgKiB9O1xuICAgKlxuICAgKiB0eXBlIEZvbGRlciA9IHtcbiAgICogICB0eXBlOiBcImZvbGRlclwiO1xuICAgKiAgIG5hbWU6IHN0cmluZztcbiAgICogICBjaGlsZHJlbjogKEl0ZW0gfCBGb2xkZXIpW107XG4gICAqIH07XG4gICAqXG4gICAqIGZ1bmN0aW9uIGZsYXR0ZW4oaXRlbTogSXRlbSB8IEZvbGRlcik6IHsgbmFtZTogc3RyaW5nIH1bXSB7XG4gICAqICAgY29uc3QgZmxhdHRlbmVkOiB7IG5hbWU6IHN0cmluZyB9W10gPSBbXTtcbiAgICogICBpZiAoaXRlbS50eXBlID09PSBcImZvbGRlclwiKSB7XG4gICAqICAgICBmbGF0dGVuZWQucHVzaCguLi5pdGVtLmNoaWxkcmVuLm1hcChmbGF0dGVuKS5mbGF0KCkpO1xuICAgKiAgIH1cbiAgICogICBpZiAoaXRlbS50eXBlID09PSBcIml0ZW1cIikge1xuICAgKiAgICAgZmxhdHRlbmVkLnB1c2goeyBuYW1lOiBpdGVtLm5hbWUgfSk7XG4gICAqICAgfVxuICAgKiAgIHJldHVybiBmbGF0dGVuZWQ7XG4gICAqIH1cbiAgICpcbiAgICogY29uc3QgdHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soZmxhdHRlbiwgW10pO1xuICAgKiBjb25zdCBmaWx0ZXIgPSB1c2VDYWxsYmFjaygoaXRlbTogeyBuYW1lOiBzdHJpbmcgfSkgPT4ge1xuICAgKiAgIOKAplxuICAgKiB9KVxuICAgKiBgYGBcbiAgICovXG4gIHRyYW5zZm9ybT86IChpdGVtOiBhbnkpID0+IFQ7XG4gIC8qKlxuICAgKiBUaGUgYW1vdW50IG9mIGl0ZW1zIHRvIHJldHVybiBmb3IgZWFjaCBwYWdlLlxuICAgKiBEZWZhdWx0cyB0byBgMjBgLlxuICAgKi9cbiAgcGFnZVNpemU/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIFRha2VzIGEgYGh0dHA6Ly9gLCBgaHR0cHM6Ly9gIG9yIGBmaWxlOi8vL2AgVVJMIHBvaW50aW5nIHRvIGEgSlNPTiByZXNvdXJjZSwgY2FjaGVzIGl0IHRvIHRoZSBjb21tYW5kJ3Mgc3VwcG9ydFxuICogZm9sZGVyLCBhbmQgc3RyZWFtcyB0aHJvdWdoIGl0cyBjb250ZW50LiBVc2VmdWwgd2hlbiBkZWFsaW5nIHdpdGggbGFyZ2UgSlNPTiBhcnJheXMgd2hpY2ggd291bGQgYmUgdG9vIGJpZyB0byBmaXRcbiAqIGluIHRoZSBjb21tYW5kJ3MgbWVtb3J5LlxuICpcbiAqIEByZW1hcmsgVGhlIEpTT04gcmVzb3VyY2UgbmVlZHMgdG8gY29uc2lzdCBvZiBhbiBhcnJheSBvZiBvYmplY3RzXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgTGlzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZVN0cmVhbUpTT04gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiB0eXBlIEZvcm11bGEgPSB7IG5hbWU6IHN0cmluZzsgZGVzYz86IHN0cmluZyB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW4oKTogUmVhY3QuSlNYLkVsZW1lbnQge1xuICogICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgcGFnaW5hdGlvbiB9ID0gdXNlU3RyZWFtSlNPTjxGb3JtdWxhPihcImh0dHBzOi8vZm9ybXVsYWUuYnJldy5zaC9hcGkvZm9ybXVsYS5qc29uXCIpO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0+XG4gKiAgICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiRm9ybXVsYWVcIj5cbiAqICAgICAgICAge2RhdGE/Lm1hcCgoZCkgPT4gPExpc3QuSXRlbSBrZXk9e2QubmFtZX0gdGl0bGU9e2QubmFtZX0gc3VidGl0bGU9e2QuZGVzY30gLz4pfVxuICogICAgICAgPC9MaXN0LlNlY3Rpb24+XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgTGlzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZVN0cmVhbUpTT04gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqIGltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbiAqIGltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuICpcbiAqIHR5cGUgRm9ybXVsYSA9IHsgbmFtZTogc3RyaW5nOyBkZXNjPzogc3RyaW5nIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpbigpOiBSZWFjdC5KU1guRWxlbWVudCB7XG4gKiAgIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCBwYWdpbmF0aW9uIH0gPSB1c2VTdHJlYW1KU09OPEZvcm11bGE+KGBmaWxlOi8vLyR7am9pbihob21lZGlyKCksIFwiRG93bmxvYWRzXCIsIFwiZm9ybXVsYWUuanNvblwiKX1gKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHBhZ2luYXRpb249e3BhZ2luYXRpb259PlxuICogICAgICAgPExpc3QuU2VjdGlvbiB0aXRsZT1cIkZvcm11bGFlXCI+XG4gKiAgICAgICAgIHtkYXRhPy5tYXAoKGQpID0+IDxMaXN0Lkl0ZW0ga2V5PXtkLm5hbWV9IHRpdGxlPXtkLm5hbWV9IHN1YnRpdGxlPXtkLmRlc2N9IC8+KX1cbiAqICAgICAgIDwvTGlzdC5TZWN0aW9uPlxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RyZWFtSlNPTjxULCBVID0gdW5rbm93bj4odXJsOiBSZXF1ZXN0SW5mbyk6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuXG4vKipcbiAqIFRha2VzIGEgYGh0dHA6Ly9gLCBgaHR0cHM6Ly9gIG9yIGBmaWxlOi8vL2AgVVJMIHBvaW50aW5nIHRvIGEgSlNPTiByZXNvdXJjZSwgY2FjaGVzIGl0IHRvIHRoZSBjb21tYW5kJ3Mgc3VwcG9ydFxuICogZm9sZGVyLCBhbmQgc3RyZWFtcyB0aHJvdWdoIGl0cyBjb250ZW50LiBVc2VmdWwgd2hlbiBkZWFsaW5nIHdpdGggbGFyZ2UgSlNPTiBhcnJheXMgd2hpY2ggd291bGQgYmUgdG9vIGJpZyB0byBmaXRcbiAqIGluIHRoZSBjb21tYW5kJ3MgbWVtb3J5LlxuICpcbiAqIEByZW1hcmsgVGhlIEpTT04gcmVzb3VyY2UgbmVlZHMgdG8gY29uc2lzdCBvZiBhbiBhcnJheSBvZiBvYmplY3RzXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgTGlzdCwgZW52aXJvbm1lbnQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VTdHJlYW1KU09OIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKiBpbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG4gKiBpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbiAqXG4gKiB0eXBlIEZvcm11bGEgPSB7IG5hbWU6IHN0cmluZzsgZGVzYz86IHN0cmluZyB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW4oKTogUmVhY3QuSlNYLkVsZW1lbnQge1xuICogICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAqXG4gKiAgIGNvbnN0IGZvcm11bGFGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAqICAgICAoaXRlbTogRm9ybXVsYSkgPT4ge1xuICogICAgICAgaWYgKCFzZWFyY2hUZXh0KSByZXR1cm4gdHJ1ZTtcbiAqICAgICAgIHJldHVybiBpdGVtLm5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAqICAgICB9LFxuICogICAgIFtzZWFyY2hUZXh0XSxcbiAqICAgKTtcbiAqXG4gKiAgIGNvbnN0IGZvcm11bGFUcmFuc2Zvcm0gPSB1c2VDYWxsYmFjaygoaXRlbTogYW55KTogRm9ybXVsYSA9PiB7XG4gKiAgICAgcmV0dXJuIHsgbmFtZTogaXRlbS5uYW1lLCBkZXNjOiBpdGVtLmRlc2MgfTtcbiAqICAgfSwgW10pO1xuICpcbiAqICAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIHBhZ2luYXRpb24gfSA9IHVzZVN0cmVhbUpTT04oXCJodHRwczovL2Zvcm11bGFlLmJyZXcuc2gvYXBpL2Zvcm11bGEuanNvblwiLCB7XG4gKiAgICAgaW5pdGlhbERhdGE6IFtdIGFzIEZvcm11bGFbXSxcbiAqICAgICBwYWdlU2l6ZTogMjAsXG4gKiAgICAgZmlsdGVyOiBmb3JtdWxhRmlsdGVyLFxuICogICAgIHRyYW5zZm9ybTogZm9ybXVsYVRyYW5zZm9ybSxcbiAqICAgfSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufSBvblNlYXJjaFRleHRDaGFuZ2U9e3NldFNlYXJjaFRleHR9PlxuICogICAgICAgPExpc3QuU2VjdGlvbiB0aXRsZT1cIkZvcm11bGFlXCI+XG4gKiAgICAgICAgIHtkYXRhLm1hcCgoZCkgPT4gKFxuICogICAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtkLm5hbWV9IHRpdGxlPXtkLm5hbWV9IHN1YnRpdGxlPXtkLmRlc2N9IC8+XG4gKiAgICAgICAgICkpfVxuICogICAgICAgPC9MaXN0LlNlY3Rpb24+XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgIHN1cHBvcnQgZm9sZGVyLCBhbmQgc3RyZWFtcyB0aHJvdWdoIGl0cyBjb250ZW50LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IExpc3QsIGVudmlyb25tZW50IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlU3RyZWFtSlNPTiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICogaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG4gKiBpbXBvcnQgeyBob21lZGlyIH0gZnJvbSBcIm9zXCI7XG4gKiBpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbiAqXG4gKiB0eXBlIEZvcm11bGEgPSB7IG5hbWU6IHN0cmluZzsgZGVzYz86IHN0cmluZyB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1haW4oKTogUmVhY3QuSlNYLkVsZW1lbnQge1xuICogICBjb25zdCBbc2VhcmNoVGV4dCwgc2V0U2VhcmNoVGV4dF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAqXG4gKiAgIGNvbnN0IGZvcm11bGFGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAqICAgICAoaXRlbTogRm9ybXVsYSkgPT4ge1xuICogICAgICAgaWYgKCFzZWFyY2hUZXh0KSByZXR1cm4gdHJ1ZTtcbiAqICAgICAgIHJldHVybiBpdGVtLm5hbWUudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXh0KTtcbiAqICAgICB9LFxuICogICAgIFtzZWFyY2hUZXh0XSxcbiAqICAgKTtcbiAqXG4gKiAgIGNvbnN0IGZvcm11bGFUcmFuc2Zvcm0gPSB1c2VDYWxsYmFjaygoaXRlbTogYW55KTogRm9ybXVsYSA9PiB7XG4gKiAgICAgcmV0dXJuIHsgbmFtZTogaXRlbS5uYW1lLCBkZXNjOiBpdGVtLmRlc2MgfTtcbiAqICAgfSwgW10pO1xuICpcbiAqICAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIHBhZ2luYXRpb24gfSA9IHVzZVN0cmVhbUpTT04oYGZpbGU6Ly8vJHtqb2luKGhvbWVkaXIoKSwgXCJEb3dubG9hZHNcIiwgXCJmb3JtdWxhZS5qc29uXCIpfWAsIHtcbiAqICAgICBpbml0aWFsRGF0YTogW10gYXMgRm9ybXVsYVtdLFxuICogICAgIHBhZ2VTaXplOiAyMCxcbiAqICAgICBmaWx0ZXI6IGZvcm11bGFGaWx0ZXIsXG4gKiAgICAgdHJhbnNmb3JtOiBmb3JtdWxhVHJhbnNmb3JtLFxuICogICB9KTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHBhZ2luYXRpb249e3BhZ2luYXRpb259IG9uU2VhcmNoVGV4dENoYW5nZT17c2V0U2VhcmNoVGV4dH0+XG4gKiAgICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiRm9ybXVsYWVcIj5cbiAqICAgICAgICAge2RhdGEubWFwKChkKSA9PiAoXG4gKiAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2QubmFtZX0gdGl0bGU9e2QubmFtZX0gc3VidGl0bGU9e2QuZGVzY30gLz5cbiAqICAgICAgICAgKSl9XG4gKiAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0cmVhbUpTT048VCwgVSBleHRlbmRzIGFueVtdID0gYW55W10+KFxuICB1cmw6IFJlcXVlc3RJbmZvLFxuICBvcHRpb25zOiBPcHRpb25zPFQ+ICYgUmVxdWVzdEluaXQgJiBPbWl0PENhY2hlZFByb21pc2VPcHRpb25zPEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgVT4sIFwiYWJvcnRhYmxlXCI+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10sIFU+O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RyZWFtSlNPTjxULCBVIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gIHVybDogUmVxdWVzdEluZm8sXG4gIG9wdGlvbnM/OiBPcHRpb25zPFQ+ICYgUmVxdWVzdEluaXQgJiBPbWl0PENhY2hlZFByb21pc2VPcHRpb25zPEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgVT4sIFwiYWJvcnRhYmxlXCI+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10sIFU+IHtcbiAgY29uc3Qge1xuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gICAgZGF0YVBhdGgsXG4gICAgZmlsdGVyLFxuICAgIHRyYW5zZm9ybSxcbiAgICBwYWdlU2l6ZSA9IDIwLFxuICAgIC4uLmZldGNoT3B0aW9uc1xuICB9ID0gb3B0aW9ucyA/PyB7fTtcbiAgY29uc3QgcHJldmlvdXNVcmwgPSB1c2VSZWY8UmVxdWVzdEluZm8+KG51bGwpO1xuICBjb25zdCBwcmV2aW91c0Rlc3RpbmF0aW9uID0gdXNlUmVmPHN0cmluZz4obnVsbCk7XG5cbiAgY29uc3QgdXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnM6IENhY2hlZFByb21pc2VPcHRpb25zPEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZSwgVT4gPSB7XG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0b3JSZWYgPSB1c2VSZWY8QXN5bmNHZW5lcmF0b3I8VCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10+IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRyb2xsZXJSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGhhc01vcmVSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHJldHVybiB1c2VDYWNoZWRQcm9taXNlKFxuICAgIChcbiAgICAgIHVybDogUmVxdWVzdEluZm8sXG4gICAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgICAgZmV0Y2hPcHRpb25zOiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCxcbiAgICAgIGRhdGFQYXRoOiBzdHJpbmcgfCBSZWdFeHAgfCB1bmRlZmluZWQsXG4gICAgICBmaWx0ZXI6ICgoaXRlbTogRmxhdHRlbjxUPikgPT4gYm9vbGVhbikgfCB1bmRlZmluZWQsXG4gICAgICB0cmFuc2Zvcm06ICgoaXRlbTogdW5rbm93bikgPT4gVCkgfCB1bmRlZmluZWQsXG4gICAgKSA9PlxuICAgICAgYXN5bmMgKHsgcGFnZSB9KSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gaGFzaCh1cmwpICsgXCIuanNvblwiO1xuICAgICAgICBjb25zdCBmb2xkZXIgPSBlbnZpcm9ubWVudC5zdXBwb3J0UGF0aDtcbiAgICAgICAgaWYgKHBhZ2UgPT09IDApIHtcbiAgICAgICAgICBjb250cm9sbGVyUmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICAgICAgY29udHJvbGxlclJlZi5jdXJyZW50ID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gam9pbihmb2xkZXIsIGZpbGVOYW1lKTtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBGb3JjZSB1cGRhdGUgdGhlIGNhY2hlIHdoZW4gdGhlIFVSTCBjaGFuZ2VzIGJ1dCB0aGUgY2FjaGUgZGVzdGluYXRpb24gZG9lcyBub3QuXG4gICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgZm9yY2VDYWNoZVVwZGF0ZSA9IEJvb2xlYW4oXG4gICAgICAgICAgICBwcmV2aW91c1VybC5jdXJyZW50ICYmXG4gICAgICAgICAgICAgIHByZXZpb3VzVXJsLmN1cnJlbnQgIT09IHVybCAmJlxuICAgICAgICAgICAgICBwcmV2aW91c0Rlc3RpbmF0aW9uLmN1cnJlbnQgJiZcbiAgICAgICAgICAgICAgcHJldmlvdXNEZXN0aW5hdGlvbi5jdXJyZW50ID09PSBkZXN0aW5hdGlvbixcbiAgICAgICAgICApO1xuICAgICAgICAgIHByZXZpb3VzVXJsLmN1cnJlbnQgPSB1cmw7XG4gICAgICAgICAgcHJldmlvdXNEZXN0aW5hdGlvbi5jdXJyZW50ID0gZGVzdGluYXRpb247XG4gICAgICAgICAgYXdhaXQgY2FjaGVVUkxJZk5lY2Vzc2FyeSh1cmwsIGZvbGRlciwgZmlsZU5hbWUsIGZvcmNlQ2FjaGVVcGRhdGUsIHtcbiAgICAgICAgICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlclJlZi5jdXJyZW50Py5zaWduYWwsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZ2VuZXJhdG9yUmVmLmN1cnJlbnQgPSBzdHJlYW1Kc29uRmlsZShcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgICAgICAgcGFnZVNpemUsXG4gICAgICAgICAgICBjb250cm9sbGVyUmVmLmN1cnJlbnQ/LnNpZ25hbCxcbiAgICAgICAgICAgIGRhdGFQYXRoLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgdHJhbnNmb3JtLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFnZW5lcmF0b3JSZWYuY3VycmVudCkge1xuICAgICAgICAgIHJldHVybiB7IGhhc01vcmU6IGhhc01vcmVSZWYuY3VycmVudCwgZGF0YTogW10gYXMgVCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10gfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHZhbHVlOiBuZXdEYXRhLCBkb25lIH0gPSBhd2FpdCBnZW5lcmF0b3JSZWYuY3VycmVudC5uZXh0KCk7XG4gICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9ICFkb25lO1xuICAgICAgICByZXR1cm4geyBoYXNNb3JlOiBoYXNNb3JlUmVmLmN1cnJlbnQsIGRhdGE6IChuZXdEYXRhID8/IFtdKSBhcyBUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXSB9O1xuICAgICAgfSxcbiAgICBbdXJsLCBwYWdlU2l6ZSwgZmV0Y2hPcHRpb25zLCBkYXRhUGF0aCwgZmlsdGVyLCB0cmFuc2Zvcm1dLFxuICAgIHVzZUNhY2hlZFByb21pc2VPcHRpb25zLFxuICApO1xufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudCAqL1xuaW1wb3J0IHsgUmVhZGFibGUsIFdyaXRhYmxlLCBEdXBsZXggfSBmcm9tIFwibm9kZTpzdHJlYW1cIjtcblxuZXhwb3J0IGNvbnN0IG5vbmUgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0ubm9uZVwiKTtcbmNvbnN0IHN0b3AgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0uc3RvcFwiKTtcblxuY29uc3QgZmluYWxTeW1ib2wgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0uZmluYWxcIik7XG5jb25zdCBtYW55U3ltYm9sID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLm1hbnlcIik7XG5jb25zdCBmbHVzaFN5bWJvbCA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5mbHVzaFwiKTtcbmNvbnN0IGZMaXN0U3ltYm9sID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLmZMaXN0XCIpO1xuXG5jb25zdCBmaW5hbFZhbHVlID0gKHZhbHVlOiBhbnkpID0+ICh7IFtmaW5hbFN5bWJvbF06IDEsIHZhbHVlIH0pO1xuZXhwb3J0IGNvbnN0IG1hbnkgPSAodmFsdWVzOiBhbnkpID0+ICh7IFttYW55U3ltYm9sXTogMSwgdmFsdWVzIH0pO1xuXG5jb25zdCBpc0ZpbmFsVmFsdWUgPSAobzogYW55KSA9PiBvICYmIG9bZmluYWxTeW1ib2xdID09PSAxO1xuY29uc3QgaXNNYW55ID0gKG86IGFueSkgPT4gbyAmJiBvW21hbnlTeW1ib2xdID09PSAxO1xuY29uc3QgaXNGbHVzaGFibGUgPSAobzogYW55KSA9PiBvICYmIG9bZmx1c2hTeW1ib2xdID09PSAxO1xuY29uc3QgaXNGdW5jdGlvbkxpc3QgPSAobzogYW55KSA9PiBvICYmIG9bZkxpc3RTeW1ib2xdID09PSAxO1xuXG5jb25zdCBnZXRGaW5hbFZhbHVlID0gKG86IGFueSkgPT4gby52YWx1ZTtcbmNvbnN0IGdldE1hbnlWYWx1ZXMgPSAobzogYW55KSA9PiBvLnZhbHVlcztcbmNvbnN0IGdldEZ1bmN0aW9uTGlzdCA9IChvOiBhbnkpID0+IG8uZkxpc3Q7XG5cbmV4cG9ydCBjb25zdCBjb21iaW5lTWFueU11dCA9IChhOiBhbnksIGI6IGFueSkgPT4ge1xuICBjb25zdCB2YWx1ZXMgPSBhID09PSBub25lID8gW10gOiBhPy5bbWFueVN5bWJvbF0gPT09IDEgPyBhLnZhbHVlcyA6IFthXTtcbiAgaWYgKGIgPT09IG5vbmUpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH0gZWxzZSBpZiAoYj8uW21hbnlTeW1ib2xdID09PSAxKSB7XG4gICAgdmFsdWVzLnB1c2goLi4uYi52YWx1ZXMpO1xuICB9IGVsc2Uge1xuICAgIHZhbHVlcy5wdXNoKGIpO1xuICB9XG4gIHJldHVybiBtYW55KHZhbHVlcyk7XG59O1xuXG5leHBvcnQgY29uc3QgZmx1c2hhYmxlID0gKHdyaXRlOiAodmFsdWU6IGFueSkgPT4gYW55LCBmaW5hbCA9IG51bGwpID0+IHtcbiAgY29uc3QgZm4gPSBmaW5hbCA/ICh2YWx1ZTogYW55KSA9PiAodmFsdWUgPT09IG5vbmUgPyBmaW5hbFZhbHVlKHVuZGVmaW5lZCkgOiB3cml0ZSh2YWx1ZSkpIDogd3JpdGU7XG4gIC8vIEB0cy1pZ25vcmVcbiAgZm5bZmx1c2hTeW1ib2xdID0gMTtcbiAgcmV0dXJuIGZuO1xufTtcblxuY29uc3Qgc2V0RnVuY3Rpb25MaXN0ID0gKG86IGFueSwgZm5zOiBhbnkpID0+IHtcbiAgby5mTGlzdCA9IGZucztcbiAgb1tmTGlzdFN5bWJvbF0gPSAxO1xuICByZXR1cm4gbztcbn07XG5cbi8vIGlzKk5vZGVTdHJlYW0gZnVuY3Rpb25zIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvbWFzdGVyL2xpYi9pbnRlcm5hbC9zdHJlYW1zL3V0aWxzLmpzXG5jb25zdCBpc1JlYWRhYmxlTm9kZVN0cmVhbSA9IChvYmo6IGFueSkgPT5cbiAgb2JqICYmXG4gIHR5cGVvZiBvYmoucGlwZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBvYmoub24gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAoIW9iai5fd3JpdGFibGVTdGF0ZSB8fCAodHlwZW9mIG9iai5fcmVhZGFibGVTdGF0ZSA9PT0gXCJvYmplY3RcIiA/IG9iai5fcmVhZGFibGVTdGF0ZS5yZWFkYWJsZSA6IG51bGwpICE9PSBmYWxzZSkgJiYgLy8gRHVwbGV4XG4gICghb2JqLl93cml0YWJsZVN0YXRlIHx8IG9iai5fcmVhZGFibGVTdGF0ZSk7IC8vIFdyaXRhYmxlIGhhcyAucGlwZS5cblxuY29uc3QgaXNXcml0YWJsZU5vZGVTdHJlYW0gPSAob2JqOiBhbnkpID0+XG4gIG9iaiAmJlxuICB0eXBlb2Ygb2JqLndyaXRlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIG9iai5vbiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICghb2JqLl9yZWFkYWJsZVN0YXRlIHx8ICh0eXBlb2Ygb2JqLl93cml0YWJsZVN0YXRlID09PSBcIm9iamVjdFwiID8gb2JqLl93cml0YWJsZVN0YXRlLndyaXRhYmxlIDogbnVsbCkgIT09IGZhbHNlKTsgLy8gRHVwbGV4XG5cbmNvbnN0IGlzRHVwbGV4Tm9kZVN0cmVhbSA9IChvYmo6IGFueSkgPT5cbiAgb2JqICYmXG4gIHR5cGVvZiBvYmoucGlwZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gIG9iai5fcmVhZGFibGVTdGF0ZSAmJlxuICB0eXBlb2Ygb2JqLm9uID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIG9iai53cml0ZSA9PT0gXCJmdW5jdGlvblwiO1xuXG5jb25zdCBpc1JlYWRhYmxlV2ViU3RyZWFtID0gKG9iajogYW55KSA9PiBvYmogJiYgZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbSAmJiBvYmogaW5zdGFuY2VvZiBnbG9iYWxUaGlzLlJlYWRhYmxlU3RyZWFtO1xuXG5jb25zdCBpc1dyaXRhYmxlV2ViU3RyZWFtID0gKG9iajogYW55KSA9PiBvYmogJiYgZ2xvYmFsVGhpcy5Xcml0YWJsZVN0cmVhbSAmJiBvYmogaW5zdGFuY2VvZiBnbG9iYWxUaGlzLldyaXRhYmxlU3RyZWFtO1xuXG5jb25zdCBpc0R1cGxleFdlYlN0cmVhbSA9IChvYmo6IGFueSkgPT5cbiAgb2JqICYmXG4gIGdsb2JhbFRoaXMuUmVhZGFibGVTdHJlYW0gJiZcbiAgb2JqLnJlYWRhYmxlIGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbSAmJlxuICBnbG9iYWxUaGlzLldyaXRhYmxlU3RyZWFtICYmXG4gIG9iai53cml0YWJsZSBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuV3JpdGFibGVTdHJlYW07XG5cbmNvbnN0IGdyb3VwRnVuY3Rpb25zID0gKG91dHB1dDogYW55LCBmbjogYW55LCBpbmRleDogYW55LCBmbnM6IGFueSkgPT4ge1xuICBpZiAoXG4gICAgaXNEdXBsZXhOb2RlU3RyZWFtKGZuKSB8fFxuICAgICghaW5kZXggJiYgaXNSZWFkYWJsZU5vZGVTdHJlYW0oZm4pKSB8fFxuICAgIChpbmRleCA9PT0gZm5zLmxlbmd0aCAtIDEgJiYgaXNXcml0YWJsZU5vZGVTdHJlYW0oZm4pKVxuICApIHtcbiAgICBvdXRwdXQucHVzaChmbik7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBpZiAoaXNEdXBsZXhXZWJTdHJlYW0oZm4pKSB7XG4gICAgb3V0cHV0LnB1c2goRHVwbGV4LmZyb21XZWIoZm4sIHsgb2JqZWN0TW9kZTogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBpZiAoIWluZGV4ICYmIGlzUmVhZGFibGVXZWJTdHJlYW0oZm4pKSB7XG4gICAgb3V0cHV0LnB1c2goUmVhZGFibGUuZnJvbVdlYihmbiwgeyBvYmplY3RNb2RlOiB0cnVlIH0pKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG4gIGlmIChpbmRleCA9PT0gZm5zLmxlbmd0aCAtIDEgJiYgaXNXcml0YWJsZVdlYlN0cmVhbShmbikpIHtcbiAgICBvdXRwdXQucHVzaChXcml0YWJsZS5mcm9tV2ViKGZuLCB7IG9iamVjdE1vZGU6IHRydWUgfSkpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBmbiAhPSBcImZ1bmN0aW9uXCIpIHRocm93IFR5cGVFcnJvcihcIkl0ZW0gI1wiICsgaW5kZXggKyBcIiBpcyBub3QgYSBwcm9wZXIgc3RyZWFtLCBub3IgYSBmdW5jdGlvbi5cIik7XG4gIGlmICghb3V0cHV0Lmxlbmd0aCkgb3V0cHV0LnB1c2goW10pO1xuICBjb25zdCBsYXN0ID0gb3V0cHV0W291dHB1dC5sZW5ndGggLSAxXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobGFzdCkpIHtcbiAgICBsYXN0LnB1c2goZm4pO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dC5wdXNoKFtmbl0pO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5jbGFzcyBTdG9wIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IGNvbnN0IGFzU3RyZWFtID0gKGZuOiBhbnkpID0+IHtcbiAgaWYgKHR5cGVvZiBmbiAhPSBcImZ1bmN0aW9uXCIpIHRocm93IFR5cGVFcnJvcihcIk9ubHkgYSBmdW5jdGlvbiBpcyBhY2NlcHRlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnRcIik7XG5cbiAgLy8gcHVtcCB2YXJpYWJsZXNcbiAgbGV0IHBhdXNlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICBsZXQgcmVzb2x2ZVBhdXNlZDogKCh2YWx1ZTogdm9pZCB8IFByb21pc2VMaWtlPHZvaWQ+KSA9PiB2b2lkKSB8IG51bGwgPSBudWxsO1xuICBjb25zdCBxdWV1ZTogYW55W10gPSBbXTtcblxuICAvLyBwYXVzZS9yZXN1bWVcbiAgY29uc3QgcmVzdW1lOiBhbnkgPSAoKSA9PiB7XG4gICAgaWYgKCFyZXNvbHZlUGF1c2VkKSByZXR1cm47XG4gICAgcmVzb2x2ZVBhdXNlZCgpO1xuICAgIHJlc29sdmVQYXVzZWQgPSBudWxsO1xuICAgIHBhdXNlZCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuICBjb25zdCBwYXVzZTogYW55ID0gKCkgPT4ge1xuICAgIGlmIChyZXNvbHZlUGF1c2VkKSByZXR1cm47XG4gICAgcGF1c2VkID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IChyZXNvbHZlUGF1c2VkID0gcmVzb2x2ZSkpO1xuICB9O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgbGV0IHN0cmVhbTogRHVwbGV4OyAvLyB3aWxsIGJlIGFzc2lnbmVkIGxhdGVyXG5cbiAgLy8gZGF0YSBwcm9jZXNzaW5nXG4gIGNvbnN0IHB1c2hSZXN1bHRzOiBhbnkgPSAodmFsdWVzOiBhbnkpID0+IHtcbiAgICBpZiAodmFsdWVzICYmIHR5cGVvZiB2YWx1ZXMubmV4dCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgcXVldWUucHVzaCh2YWx1ZXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhcnJheVxuICAgIHF1ZXVlLnB1c2godmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0oKSk7XG4gIH07XG4gIGNvbnN0IHB1bXA6IGFueSA9IGFzeW5jICgpID0+IHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoKSB7XG4gICAgICBhd2FpdCBwYXVzZWQ7XG4gICAgICBjb25zdCBnZW4gPSBxdWV1ZVtxdWV1ZS5sZW5ndGggLSAxXTtcbiAgICAgIGxldCByZXN1bHQgPSBnZW4ubmV4dCgpO1xuICAgICAgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQuZG9uZSkge1xuICAgICAgICBxdWV1ZS5wb3AoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBsZXQgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLnRoZW4gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHZhbHVlID0gYXdhaXQgdmFsdWU7XG4gICAgICB9XG4gICAgICBhd2FpdCBzYW5pdGl6ZSh2YWx1ZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBzYW5pdGl6ZTogYW55ID0gYXN5bmMgKHZhbHVlOiBhbnkpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gbm9uZSkgcmV0dXJuO1xuICAgIGlmICh2YWx1ZSA9PT0gc3RvcCkgdGhyb3cgbmV3IFN0b3AoKTtcblxuICAgIGlmIChpc01hbnkodmFsdWUpKSB7XG4gICAgICBwdXNoUmVzdWx0cyhnZXRNYW55VmFsdWVzKHZhbHVlKSk7XG4gICAgICByZXR1cm4gcHVtcCgpO1xuICAgIH1cblxuICAgIGlmIChpc0ZpbmFsVmFsdWUodmFsdWUpKSB7XG4gICAgICAvLyBhIGZpbmFsIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQsIGl0IGlzIHRyZWF0ZWQgYXMgYSByZWd1bGFyIHZhbHVlXG4gICAgICB2YWx1ZSA9IGdldEZpbmFsVmFsdWUodmFsdWUpO1xuICAgICAgcmV0dXJuIHByb2Nlc3NWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFzdHJlYW0ucHVzaCh2YWx1ZSkpIHtcbiAgICAgIHBhdXNlKCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBwcm9jZXNzQ2h1bms6IGFueSA9IGFzeW5jIChjaHVuazogYW55LCBlbmNvZGluZzogYW55KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gZm4oY2h1bmssIGVuY29kaW5nKTtcbiAgICAgIGF3YWl0IHByb2Nlc3NWYWx1ZSh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIFN0b3ApIHtcbiAgICAgICAgc3RyZWFtLnB1c2gobnVsbCk7XG4gICAgICAgIHN0cmVhbS5kZXN0cm95KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgcHJvY2Vzc1ZhbHVlOiBhbnkgPSBhc3luYyAodmFsdWU6IGFueSkgPT4ge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIHRoZW5hYmxlXG4gICAgICByZXR1cm4gdmFsdWUudGhlbigodmFsdWU6IGFueSkgPT4gcHJvY2Vzc1ZhbHVlKHZhbHVlKSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubmV4dCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgcHVzaFJlc3VsdHModmFsdWUpO1xuICAgICAgcmV0dXJuIHB1bXAoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNhbml0aXplKHZhbHVlKTtcbiAgfTtcblxuICBzdHJlYW0gPSBuZXcgRHVwbGV4KFxuICAgIE9iamVjdC5hc3NpZ24oeyB3cml0YWJsZU9iamVjdE1vZGU6IHRydWUsIHJlYWRhYmxlT2JqZWN0TW9kZTogdHJ1ZSB9LCB1bmRlZmluZWQsIHtcbiAgICAgIHdyaXRlKGNodW5rOiBhbnksIGVuY29kaW5nOiBhbnksIGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgcHJvY2Vzc0NodW5rKGNodW5rLCBlbmNvZGluZykudGhlbihcbiAgICAgICAgICAoKSA9PiBjYWxsYmFjayhudWxsKSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gY2FsbGJhY2soZXJyb3IpLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGZpbmFsKGNhbGxiYWNrOiBhbnkpIHtcbiAgICAgICAgaWYgKCFpc0ZsdXNoYWJsZShmbikpIHtcbiAgICAgICAgICBzdHJlYW0ucHVzaChudWxsKTtcbiAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzc0NodW5rKG5vbmUsIG51bGwpLnRoZW4oXG4gICAgICAgICAgKCkgPT4gKHN0cmVhbS5wdXNoKG51bGwpLCBjYWxsYmFjayhudWxsKSksXG4gICAgICAgICAgKGVycm9yOiBhbnkpID0+IGNhbGxiYWNrKGVycm9yKSxcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICByZWFkKCkge1xuICAgICAgICByZXN1bWUoKTtcbiAgICAgIH0sXG4gICAgfSksXG4gICk7XG5cbiAgcmV0dXJuIHN0cmVhbTtcbn07XG5cbmNvbnN0IHByb2R1Y2VTdHJlYW1zID0gKGl0ZW06IGFueSkgPT4ge1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGlmICghaXRlbS5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgIGlmIChpdGVtLmxlbmd0aCA9PSAxKSByZXR1cm4gaXRlbVswXSAmJiBhc1N0cmVhbShpdGVtWzBdKTtcbiAgICByZXR1cm4gYXNTdHJlYW0oZ2VuKC4uLml0ZW0pKTtcbiAgfVxuICByZXR1cm4gaXRlbTtcbn07XG5cbmNvbnN0IG5leHQ6IGFueSA9IGFzeW5jIGZ1bmN0aW9uKiAodmFsdWU6IGFueSwgZm5zOiBhbnksIGluZGV4OiBhbnkpIHtcbiAgZm9yIChsZXQgaSA9IGluZGV4OyBpIDw9IGZucy5sZW5ndGg7ICsraSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIHRoZW5hYmxlXG4gICAgICB2YWx1ZSA9IGF3YWl0IHZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT09IG5vbmUpIGJyZWFrO1xuICAgIGlmICh2YWx1ZSA9PT0gc3RvcCkgdGhyb3cgbmV3IFN0b3AoKTtcbiAgICBpZiAoaXNGaW5hbFZhbHVlKHZhbHVlKSkge1xuICAgICAgeWllbGQgZ2V0RmluYWxWYWx1ZSh2YWx1ZSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGlzTWFueSh2YWx1ZSkpIHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGdldE1hbnlWYWx1ZXModmFsdWUpO1xuICAgICAgaWYgKGkgPT0gZm5zLmxlbmd0aCkge1xuICAgICAgICB5aWVsZCogdmFsdWVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWx1ZXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICB5aWVsZCogbmV4dCh2YWx1ZXNbal0sIGZucywgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLm5leHQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIGZvciAoOzspIHtcbiAgICAgICAgbGV0IGRhdGEgPSB2YWx1ZS5uZXh0KCk7XG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiBkYXRhLnRoZW4gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgZGF0YSA9IGF3YWl0IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEuZG9uZSkgYnJlYWs7XG4gICAgICAgIGlmIChpID09IGZucy5sZW5ndGgpIHtcbiAgICAgICAgICB5aWVsZCBkYXRhLnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHlpZWxkKiBuZXh0KGRhdGEudmFsdWUsIGZucywgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaSA9PSBmbnMubGVuZ3RoKSB7XG4gICAgICB5aWVsZCB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBmID0gZm5zW2ldO1xuICAgIHZhbHVlID0gZih2YWx1ZSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZW4gPSAoLi4uZm5zOiBhbnkpID0+IHtcbiAgZm5zID0gZm5zXG4gICAgLmZpbHRlcigoZm46IGFueSkgPT4gZm4pXG4gICAgLmZsYXQoSW5maW5pdHkpXG4gICAgLm1hcCgoZm46IGFueSkgPT4gKGlzRnVuY3Rpb25MaXN0KGZuKSA/IGdldEZ1bmN0aW9uTGlzdChmbikgOiBmbikpXG4gICAgLmZsYXQoSW5maW5pdHkpO1xuICBpZiAoIWZucy5sZW5ndGgpIHtcbiAgICBmbnMgPSBbKHg6IGFueSkgPT4geF07XG4gIH1cbiAgbGV0IGZsdXNoZWQgPSBmYWxzZTtcbiAgbGV0IGcgPSBhc3luYyBmdW5jdGlvbiogKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAoZmx1c2hlZCkgdGhyb3cgRXJyb3IoXCJDYWxsIHRvIGEgZmx1c2hlZCBwaXBlLlwiKTtcbiAgICBpZiAodmFsdWUgIT09IG5vbmUpIHtcbiAgICAgIHlpZWxkKiBuZXh0KHZhbHVlLCBmbnMsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbHVzaGVkID0gdHJ1ZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNvbnN0IGYgPSBmbnNbaV07XG4gICAgICAgIGlmIChpc0ZsdXNoYWJsZShmKSkge1xuICAgICAgICAgIHlpZWxkKiBuZXh0KGYobm9uZSksIGZucywgaSArIDEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBjb25zdCBuZWVkVG9GbHVzaCA9IGZucy5zb21lKChmbjogYW55KSA9PiBpc0ZsdXNoYWJsZShmbikpO1xuICBpZiAobmVlZFRvRmx1c2gpIGcgPSBmbHVzaGFibGUoZyk7XG4gIHJldHVybiBzZXRGdW5jdGlvbkxpc3QoZywgZm5zKTtcbn07XG5cbmNvbnN0IHdyaXRlID0gKGlucHV0OiBhbnksIGNodW5rOiBhbnksIGVuY29kaW5nOiBhbnksIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgbGV0IGVycm9yOiBhbnkgPSBudWxsO1xuICB0cnkge1xuICAgIGlucHV0LndyaXRlKGNodW5rLCBlbmNvZGluZywgKGU6IGFueSkgPT4gY2FsbGJhY2soZSB8fCBlcnJvcikpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlO1xuICB9XG59O1xuXG5jb25zdCBmaW5hbCA9IChpbnB1dDogYW55LCBjYWxsYmFjazogYW55KSA9PiB7XG4gIGxldCBlcnJvcjogYW55ID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBpbnB1dC5lbmQobnVsbCwgbnVsbCwgKGU6IGFueSkgPT4gY2FsbGJhY2soZSB8fCBlcnJvcikpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyb3IgPSBlO1xuICB9XG59O1xuXG5jb25zdCByZWFkID0gKG91dHB1dDogYW55KSA9PiB7XG4gIG91dHB1dC5yZXN1bWUoKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoYWluKGZuczogYW55KSB7XG4gIGZucyA9IGZucy5mbGF0KEluZmluaXR5KS5maWx0ZXIoKGZuOiBhbnkpID0+IGZuKTtcblxuICBjb25zdCBzdHJlYW1zID0gZm5zXG4gICAgICAubWFwKChmbjogYW55KSA9PiAoaXNGdW5jdGlvbkxpc3QoZm4pID8gZ2V0RnVuY3Rpb25MaXN0KGZuKSA6IGZuKSlcbiAgICAgIC5mbGF0KEluZmluaXR5KVxuICAgICAgLnJlZHVjZShncm91cEZ1bmN0aW9ucywgW10pXG4gICAgICAubWFwKHByb2R1Y2VTdHJlYW1zKVxuICAgICAgLmZpbHRlcigoczogYW55KSA9PiBzKSxcbiAgICBpbnB1dCA9IHN0cmVhbXNbMF0sXG4gICAgb3V0cHV0ID0gc3RyZWFtcy5yZWR1Y2UoKG91dHB1dDogYW55LCBpdGVtOiBhbnkpID0+IChvdXRwdXQgJiYgb3V0cHV0LnBpcGUoaXRlbSkpIHx8IGl0ZW0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcbiAgbGV0IHN0cmVhbTogRHVwbGV4OyAvLyB3aWxsIGJlIGFzc2lnbmVkIGxhdGVyXG5cbiAgbGV0IHdyaXRlTWV0aG9kID0gKGNodW5rOiBhbnksIGVuY29kaW5nOiBhbnksIGNhbGxiYWNrOiBhbnkpID0+IHdyaXRlKGlucHV0LCBjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKSxcbiAgICBmaW5hbE1ldGhvZCA9IChjYWxsYmFjazogYW55KSA9PiBmaW5hbChpbnB1dCwgY2FsbGJhY2spLFxuICAgIHJlYWRNZXRob2QgPSAoKSA9PiByZWFkKG91dHB1dCk7XG5cbiAgaWYgKCFpc1dyaXRhYmxlTm9kZVN0cmVhbShpbnB1dCkpIHtcbiAgICB3cml0ZU1ldGhvZCA9IChfMSwgXzIsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhudWxsKTtcbiAgICBmaW5hbE1ldGhvZCA9IChjYWxsYmFjaykgPT4gY2FsbGJhY2sobnVsbCk7XG4gICAgaW5wdXQub24oXCJlbmRcIiwgKCkgPT4gc3RyZWFtLmVuZCgpKTtcbiAgfVxuXG4gIGlmIChpc1JlYWRhYmxlTm9kZVN0cmVhbShvdXRwdXQpKSB7XG4gICAgb3V0cHV0Lm9uKFwiZGF0YVwiLCAoY2h1bms6IGFueSkgPT4gIXN0cmVhbS5wdXNoKGNodW5rKSAmJiBvdXRwdXQucGF1c2UoKSk7XG4gICAgb3V0cHV0Lm9uKFwiZW5kXCIsICgpID0+IHN0cmVhbS5wdXNoKG51bGwpKTtcbiAgfSBlbHNlIHtcbiAgICByZWFkTWV0aG9kID0gKCkgPT4ge307IC8vIG5vcFxuICAgIG91dHB1dC5vbihcImZpbmlzaFwiLCAoKSA9PiBzdHJlYW0ucHVzaChudWxsKSk7XG4gIH1cblxuICBzdHJlYW0gPSBuZXcgRHVwbGV4KFxuICAgIE9iamVjdC5hc3NpZ24oXG4gICAgICB7IHdyaXRhYmxlT2JqZWN0TW9kZTogdHJ1ZSwgcmVhZGFibGVPYmplY3RNb2RlOiB0cnVlIH0sXG4gICAgICB7XG4gICAgICAgIHJlYWRhYmxlOiBpc1JlYWRhYmxlTm9kZVN0cmVhbShvdXRwdXQpLFxuICAgICAgICB3cml0YWJsZTogaXNXcml0YWJsZU5vZGVTdHJlYW0oaW5wdXQpLFxuICAgICAgICB3cml0ZTogd3JpdGVNZXRob2QsXG4gICAgICAgIGZpbmFsOiBmaW5hbE1ldGhvZCxcbiAgICAgICAgcmVhZDogcmVhZE1ldGhvZCxcbiAgICAgIH0sXG4gICAgKSxcbiAgKTtcbiAgLy8gQHRzLWlnbm9yZVxuICBzdHJlYW0uc3RyZWFtcyA9IHN0cmVhbXM7XG4gIC8vIEB0cy1pZ25vcmVcbiAgc3RyZWFtLmlucHV0ID0gaW5wdXQ7XG4gIC8vIEB0cy1pZ25vcmVcbiAgc3RyZWFtLm91dHB1dCA9IG91dHB1dDtcblxuICBpZiAoIWlzUmVhZGFibGVOb2RlU3RyZWFtKG91dHB1dCkpIHtcbiAgICBzdHJlYW0ucmVzdW1lKCk7XG4gIH1cblxuICAvLyBjb25uZWN0IGV2ZW50c1xuICBzdHJlYW1zLmZvckVhY2goKGl0ZW06IGFueSkgPT4gaXRlbS5vbihcImVycm9yXCIsIChlcnJvcjogYW55KSA9PiBzdHJlYW0uZW1pdChcImVycm9yXCIsIGVycm9yKSkpO1xuXG4gIHJldHVybiBzdHJlYW07XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLWVzY2FwZSAqL1xuaW1wb3J0IHsgZmx1c2hhYmxlLCBnZW4sIG1hbnksIG5vbmUsIGNvbWJpbmVNYW55TXV0IH0gZnJvbSBcIi4vc3RyZWFtLWNoYWluXCI7XG5pbXBvcnQgeyBTdHJpbmdEZWNvZGVyIH0gZnJvbSBcIm5vZGU6c3RyaW5nX2RlY29kZXJcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIm5vZGU6ZXZlbnRzXCI7XG5cbmNvbnN0IGZpeFV0ZjhTdHJlYW0gPSAoKSA9PiB7XG4gIGNvbnN0IHN0cmluZ0RlY29kZXIgPSBuZXcgU3RyaW5nRGVjb2RlcigpO1xuICBsZXQgaW5wdXQgPSBcIlwiO1xuICByZXR1cm4gZmx1c2hhYmxlKChjaHVuazogYW55KSA9PiB7XG4gICAgaWYgKGNodW5rID09PSBub25lKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBpbnB1dCArIHN0cmluZ0RlY29kZXIuZW5kKCk7XG4gICAgICBpbnB1dCA9IFwiXCI7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNodW5rID09IFwic3RyaW5nXCIpIHtcbiAgICAgIGlmICghaW5wdXQpIHJldHVybiBjaHVuaztcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGlucHV0ICsgY2h1bms7XG4gICAgICBpbnB1dCA9IFwiXCI7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBpZiAoY2h1bmsgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGlucHV0ICsgc3RyaW5nRGVjb2Rlci53cml0ZShjaHVuayk7XG4gICAgICBpbnB1dCA9IFwiXCI7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYSBCdWZmZXJcIik7XG4gIH0pO1xufTtcblxuY29uc3QgcGF0dGVybnMgPSB7XG4gIHZhbHVlMTogL1tcXFwiXFx7XFxbXFxdXFwtXFxkXXx0cnVlXFxifGZhbHNlXFxifG51bGxcXGJ8XFxzezEsMjU2fS95LFxuICBzdHJpbmc6IC9bXlxceDAwLVxceDFmXFxcIlxcXFxdezEsMjU2fXxcXFxcW2JmbnJ0XFxcIlxcXFxcXC9dfFxcXFx1W1xcZGEtZkEtRl17NH18XFxcIi95LFxuICBrZXkxOiAvW1xcXCJcXH1dfFxcc3sxLDI1Nn0veSxcbiAgY29sb246IC9cXDp8XFxzezEsMjU2fS95LFxuICBjb21tYTogL1tcXCxcXF1cXH1dfFxcc3sxLDI1Nn0veSxcbiAgd3M6IC9cXHN7MSwyNTZ9L3ksXG4gIG51bWJlclN0YXJ0OiAvXFxkL3ksXG4gIG51bWJlckRpZ2l0OiAvXFxkezAsMjU2fS95LFxuICBudW1iZXJGcmFjdGlvbjogL1tcXC5lRV0veSxcbiAgbnVtYmVyRXhwb25lbnQ6IC9bZUVdL3ksXG4gIG51bWJlckV4cFNpZ246IC9bLStdL3ksXG59O1xuY29uc3QgTUFYX1BBVFRFUk5fU0laRSA9IDE2O1xuXG5jb25zdCB2YWx1ZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7IHRydWU6IHRydWUsIGZhbHNlOiBmYWxzZSwgbnVsbDogbnVsbCB9LFxuICBleHBlY3RlZDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHsgb2JqZWN0OiBcIm9iamVjdFN0b3BcIiwgYXJyYXk6IFwiYXJyYXlTdG9wXCIsIFwiXCI6IFwiZG9uZVwiIH07XG5cbi8vIGxvbmcgaGV4YWRlY2ltYWwgY29kZXM6IFxcdVhYWFhcbmNvbnN0IGZyb21IZXggPSAoczogc3RyaW5nKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KHMuc2xpY2UoMiksIDE2KSk7XG5cbi8vIHNob3J0IGNvZGVzOiBcXGIgXFxmIFxcbiBcXHIgXFx0IFxcXCIgXFxcXCBcXC9cbmNvbnN0IGNvZGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICBiOiBcIlxcYlwiLFxuICBmOiBcIlxcZlwiLFxuICBuOiBcIlxcblwiLFxuICByOiBcIlxcclwiLFxuICB0OiBcIlxcdFwiLFxuICAnXCInOiAnXCInLFxuICBcIlxcXFxcIjogXCJcXFxcXCIsXG4gIFwiL1wiOiBcIi9cIixcbn07XG5cbmNvbnN0IGpzb25QYXJzZXIgPSAob3B0aW9ucz86IGFueSkgPT4ge1xuICBsZXQgcGFja0tleXMgPSB0cnVlLFxuICAgIHBhY2tTdHJpbmdzID0gdHJ1ZSxcbiAgICBwYWNrTnVtYmVycyA9IHRydWUsXG4gICAgc3RyZWFtS2V5cyA9IHRydWUsXG4gICAgc3RyZWFtU3RyaW5ncyA9IHRydWUsXG4gICAgc3RyZWFtTnVtYmVycyA9IHRydWUsXG4gICAganNvblN0cmVhbWluZyA9IGZhbHNlO1xuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgXCJwYWNrVmFsdWVzXCIgaW4gb3B0aW9ucyAmJiAocGFja0tleXMgPSBwYWNrU3RyaW5ncyA9IHBhY2tOdW1iZXJzID0gb3B0aW9ucy5wYWNrVmFsdWVzKTtcbiAgICBcInBhY2tLZXlzXCIgaW4gb3B0aW9ucyAmJiAocGFja0tleXMgPSBvcHRpb25zLnBhY2tLZXlzKTtcbiAgICBcInBhY2tTdHJpbmdzXCIgaW4gb3B0aW9ucyAmJiAocGFja1N0cmluZ3MgPSBvcHRpb25zLnBhY2tTdHJpbmdzKTtcbiAgICBcInBhY2tOdW1iZXJzXCIgaW4gb3B0aW9ucyAmJiAocGFja051bWJlcnMgPSBvcHRpb25zLnBhY2tOdW1iZXJzKTtcbiAgICBcInN0cmVhbVZhbHVlc1wiIGluIG9wdGlvbnMgJiYgKHN0cmVhbUtleXMgPSBzdHJlYW1TdHJpbmdzID0gc3RyZWFtTnVtYmVycyA9IG9wdGlvbnMuc3RyZWFtVmFsdWVzKTtcbiAgICBcInN0cmVhbUtleXNcIiBpbiBvcHRpb25zICYmIChzdHJlYW1LZXlzID0gb3B0aW9ucy5zdHJlYW1LZXlzKTtcbiAgICBcInN0cmVhbVN0cmluZ3NcIiBpbiBvcHRpb25zICYmIChzdHJlYW1TdHJpbmdzID0gb3B0aW9ucy5zdHJlYW1TdHJpbmdzKTtcbiAgICBcInN0cmVhbU51bWJlcnNcIiBpbiBvcHRpb25zICYmIChzdHJlYW1OdW1iZXJzID0gb3B0aW9ucy5zdHJlYW1OdW1iZXJzKTtcbiAgICBqc29uU3RyZWFtaW5nID0gb3B0aW9ucy5qc29uU3RyZWFtaW5nO1xuICB9XG5cbiAgIXBhY2tLZXlzICYmIChzdHJlYW1LZXlzID0gdHJ1ZSk7XG4gICFwYWNrU3RyaW5ncyAmJiAoc3RyZWFtU3RyaW5ncyA9IHRydWUpO1xuICAhcGFja051bWJlcnMgJiYgKHN0cmVhbU51bWJlcnMgPSB0cnVlKTtcblxuICBsZXQgZG9uZSA9IGZhbHNlLFxuICAgIGV4cGVjdCA9IGpzb25TdHJlYW1pbmcgPyBcImRvbmVcIiA6IFwidmFsdWVcIixcbiAgICBwYXJlbnQgPSBcIlwiLFxuICAgIG9wZW5OdW1iZXIgPSBmYWxzZSxcbiAgICBhY2N1bXVsYXRvciA9IFwiXCIsXG4gICAgYnVmZmVyID0gXCJcIjtcblxuICBjb25zdCBzdGFjazogYW55W10gPSBbXTtcblxuICByZXR1cm4gZmx1c2hhYmxlKChidWY6IGFueSkgPT4ge1xuICAgIGNvbnN0IHRva2VuczogYW55W10gPSBbXTtcblxuICAgIGlmIChidWYgPT09IG5vbmUpIHtcbiAgICAgIGRvbmUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgKz0gYnVmO1xuICAgIH1cblxuICAgIGxldCBtYXRjaDogYW55O1xuICAgIGxldCB2YWx1ZTogYW55O1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICBtYWluOiBmb3IgKDs7KSB7XG4gICAgICBzd2l0Y2ggKGV4cGVjdCkge1xuICAgICAgICBjYXNlIFwidmFsdWUxXCI6XG4gICAgICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgICAgIHBhdHRlcm5zLnZhbHVlMS5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLnZhbHVlMS5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGRvbmUgfHwgaW5kZXggKyBNQVhfUEFUVEVSTl9TSVpFIDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhIHZhbHVlXCIpO1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgaGFzIGV4cGVjdGVkIGEgdmFsdWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSAnXCInOlxuICAgICAgICAgICAgICBpZiAoc3RyZWFtU3RyaW5ncykgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0U3RyaW5nXCIgfSk7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIntcIjpcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0T2JqZWN0XCIgfSk7XG4gICAgICAgICAgICAgIHN0YWNrLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgcGFyZW50ID0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJrZXkxXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIltcIjpcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0QXJyYXlcIiB9KTtcbiAgICAgICAgICAgICAgc3RhY2sucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgICBwYXJlbnQgPSBcImFycmF5XCI7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwidmFsdWUxXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIl1cIjpcbiAgICAgICAgICAgICAgaWYgKGV4cGVjdCAhPT0gXCJ2YWx1ZTFcIikgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogdW5leHBlY3RlZCB0b2tlbiAnXSdcIik7XG4gICAgICAgICAgICAgIGlmIChvcGVuTnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmROdW1iZXJcIiB9KTtcbiAgICAgICAgICAgICAgICBvcGVuTnVtYmVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tOdW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyVmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICAgICAgICAgICAgYWNjdW11bGF0b3IgPSBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kQXJyYXlcIiB9KTtcbiAgICAgICAgICAgICAgcGFyZW50ID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIi1cIjpcbiAgICAgICAgICAgICAgb3Blbk51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0TnVtYmVyXCIgfSwgeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiBcIi1cIiB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgPSBcIi1cIik7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyU3RhcnRcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiMFwiOlxuICAgICAgICAgICAgICBvcGVuTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnROdW1iZXJcIiB9LCB7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IFwiMFwiIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciA9IFwiMFwiKTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJGcmFjdGlvblwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIxXCI6XG4gICAgICAgICAgICBjYXNlIFwiMlwiOlxuICAgICAgICAgICAgY2FzZSBcIjNcIjpcbiAgICAgICAgICAgIGNhc2UgXCI0XCI6XG4gICAgICAgICAgICBjYXNlIFwiNVwiOlxuICAgICAgICAgICAgY2FzZSBcIjZcIjpcbiAgICAgICAgICAgIGNhc2UgXCI3XCI6XG4gICAgICAgICAgICBjYXNlIFwiOFwiOlxuICAgICAgICAgICAgY2FzZSBcIjlcIjpcbiAgICAgICAgICAgICAgb3Blbk51bWJlciA9IHRydWU7XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0TnVtYmVyXCIgfSwgeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgPSB2YWx1ZSk7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRGlnaXRcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidHJ1ZVwiOlxuICAgICAgICAgICAgY2FzZSBcImZhbHNlXCI6XG4gICAgICAgICAgICBjYXNlIFwibnVsbFwiOlxuICAgICAgICAgICAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGluZGV4ID09PSB2YWx1ZS5sZW5ndGggJiYgIWRvbmUpIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiB2YWx1ZSArIFwiVmFsdWVcIiwgdmFsdWU6IHZhbHVlc1t2YWx1ZV0gfSk7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gZGVmYXVsdDogLy8gd3NcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwia2V5VmFsXCI6XG4gICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICBwYXR0ZXJucy5zdHJpbmcubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5zdHJpbmcuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggJiYgKGRvbmUgfHwgYnVmZmVyLmxlbmd0aCAtIGluZGV4ID49IDYpKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBlc2NhcGVkIGNoYXJhY3RlcnNcIik7XG4gICAgICAgICAgICBpZiAoZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGhhcyBleHBlY3RlZCBhIHN0cmluZyB2YWx1ZVwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICdcIicpIHtcbiAgICAgICAgICAgIGlmIChleHBlY3QgPT09IFwia2V5VmFsXCIpIHtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbUtleXMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmRLZXlcIiB9KTtcbiAgICAgICAgICAgICAgaWYgKHBhY2tLZXlzKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcImtleVZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJjb2xvblwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbVN0cmluZ3MpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmRTdHJpbmdcIiB9KTtcbiAgICAgICAgICAgICAgaWYgKHBhY2tTdHJpbmdzKSB7XG4gICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0cmluZ1ZhbHVlXCIsIHZhbHVlOiBhY2N1bXVsYXRvciB9KTtcbiAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlLmxlbmd0aCA+IDEgJiYgdmFsdWUuY2hhckF0KDApID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgY29uc3QgdCA9IHZhbHVlLmxlbmd0aCA9PSAyID8gY29kZXNbdmFsdWUuY2hhckF0KDEpXSA6IGZyb21IZXgodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGV4cGVjdCA9PT0gXCJrZXlWYWxcIiA/IHN0cmVhbUtleXMgOiBzdHJlYW1TdHJpbmdzKSB7XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdHJpbmdDaHVua1wiLCB2YWx1ZTogdCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChleHBlY3QgPT09IFwia2V5VmFsXCIgPyBwYWNrS2V5cyA6IHBhY2tTdHJpbmdzKSB7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yICs9IHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChleHBlY3QgPT09IFwia2V5VmFsXCIgPyBzdHJlYW1LZXlzIDogc3RyZWFtU3RyaW5ncykge1xuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RyaW5nQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cGVjdCA9PT0gXCJrZXlWYWxcIiA/IHBhY2tLZXlzIDogcGFja1N0cmluZ3MpIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3IgKz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImtleTFcIjpcbiAgICAgICAgY2FzZSBcImtleVwiOlxuICAgICAgICAgIHBhdHRlcm5zLmtleTEubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5rZXkxLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGFuIG9iamVjdCBrZXlcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAnXCInKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtS2V5cykgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0YXJ0S2V5XCIgfSk7XG4gICAgICAgICAgICBleHBlY3QgPSBcImtleVZhbFwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwifVwiKSB7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ICE9PSBcImtleTFcIikgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogdW5leHBlY3RlZCB0b2tlbiAnfSdcIik7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwiZW5kT2JqZWN0XCIgfSk7XG4gICAgICAgICAgICBwYXJlbnQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImNvbG9uXCI6XG4gICAgICAgICAgcGF0dGVybnMuY29sb24ubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5jb2xvbi5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCAnOidcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgdmFsdWUgPT09IFwiOlwiICYmIChleHBlY3QgPSBcInZhbHVlXCIpO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFycmF5U3RvcFwiOlxuICAgICAgICBjYXNlIFwib2JqZWN0U3RvcFwiOlxuICAgICAgICAgIHBhdHRlcm5zLmNvbW1hLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMuY29tbWEuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgJywnXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3Blbk51bWJlcikge1xuICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmROdW1iZXJcIiB9KTtcbiAgICAgICAgICAgIG9wZW5OdW1iZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwYWNrTnVtYmVycykge1xuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyVmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBcIixcIikge1xuICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ID09PSBcImFycmF5U3RvcFwiID8gXCJ2YWx1ZVwiIDogXCJrZXlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcIn1cIiB8fCB2YWx1ZSA9PT0gXCJdXCIpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJ9XCIgPyBleHBlY3QgPT09IFwiYXJyYXlTdG9wXCIgOiBleHBlY3QgIT09IFwiYXJyYXlTdG9wXCIpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgJ1wiICsgKGV4cGVjdCA9PT0gXCJhcnJheVN0b3BcIiA/IFwiXVwiIDogXCJ9XCIpICsgXCInXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiB2YWx1ZSA9PT0gXCJ9XCIgPyBcImVuZE9iamVjdFwiIDogXCJlbmRBcnJheVwiIH0pO1xuICAgICAgICAgICAgcGFyZW50ID0gc3RhY2sucG9wKCk7XG4gICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIG51bWJlciBjaHVua3NcbiAgICAgICAgY2FzZSBcIm51bWJlclN0YXJ0XCI6IC8vIFswLTldXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyU3RhcnQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJTdGFydC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhIHN0YXJ0aW5nIGRpZ2l0XCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gdmFsdWUgPT09IFwiMFwiID8gXCJudW1iZXJGcmFjdGlvblwiIDogXCJudW1iZXJEaWdpdFwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckRpZ2l0XCI6IC8vIFswLTldKlxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckRpZ2l0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRGlnaXQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYSBkaWdpdFwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckZyYWN0aW9uXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRnJhY3Rpb25cIjogLy8gW1xcLmVFXT9cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJGcmFjdGlvbi5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckZyYWN0aW9uLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSB2YWx1ZSA9PT0gXCIuXCIgPyBcIm51bWJlckZyYWNTdGFydFwiIDogXCJudW1iZXJFeHBTaWduXCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRnJhY1N0YXJ0XCI6IC8vIFswLTldXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyU3RhcnQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJTdGFydC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKVxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhIGZyYWN0aW9uYWwgcGFydCBvZiBhIG51bWJlclwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRnJhY0RpZ2l0XCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRnJhY0RpZ2l0XCI6IC8vIFswLTldKlxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckRpZ2l0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRGlnaXQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJFeHBvbmVudFwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckV4cG9uZW50XCI6IC8vIFtlRV0/XG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRXhwb25lbnQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJFeHBvbmVudC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwiZG9uZVwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRXhwU2lnblwiO1xuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIm51bWJlckV4cFNpZ25cIjogLy8gWy0rXT9cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJFeHBTaWduLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRXhwU2lnbi5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckV4cFN0YXJ0XCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBoYXMgZXhwZWN0ZWQgYW4gZXhwb25lbnQgdmFsdWUgb2YgYSBudW1iZXJcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckV4cFN0YXJ0XCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRXhwU3RhcnRcIjogLy8gWzAtOV1cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJTdGFydC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlclN0YXJ0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGFuIGV4cG9uZW50IHBhcnQgb2YgYSBudW1iZXJcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckV4cERpZ2l0XCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRXhwRGlnaXRcIjogLy8gWzAtOV0qXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRGlnaXQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJEaWdpdC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImRvbmVcIjpcbiAgICAgICAgICBwYXR0ZXJucy53cy5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLndzLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmIChqc29uU3RyZWFtaW5nKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0ID0gXCJ2YWx1ZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IHVuZXhwZWN0ZWQgY2hhcmFjdGVyc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAob3Blbk51bWJlcikge1xuICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmROdW1iZXJcIiB9KTtcbiAgICAgICAgICAgIG9wZW5OdW1iZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChwYWNrTnVtYmVycykge1xuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyVmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRvbmUgJiYgb3Blbk51bWJlcikge1xuICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmROdW1iZXJcIiB9KTtcbiAgICAgIG9wZW5OdW1iZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYWNrTnVtYmVycykge1xuICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyVmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGJ1ZmZlciA9IGJ1ZmZlci5zbGljZShpbmRleCk7XG4gICAgcmV0dXJuIHRva2Vucy5sZW5ndGggPyBtYW55KHRva2VucykgOiBub25lO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwYXJzZXIgPSAob3B0aW9ucz86IGFueSkgPT4gZ2VuKGZpeFV0ZjhTdHJlYW0oKSwganNvblBhcnNlcihvcHRpb25zKSk7XG5cbmNvbnN0IHdpdGhQYXJzZXIgPSAoZm46IGFueSwgb3B0aW9ucz86IGFueSkgPT4gZ2VuKHBhcnNlcihvcHRpb25zKSwgZm4ob3B0aW9ucykpO1xuXG5jb25zdCBjaGVja2FibGVUb2tlbnMgPSB7XG4gICAgc3RhcnRPYmplY3Q6IDEsXG4gICAgc3RhcnRBcnJheTogMSxcbiAgICBzdGFydFN0cmluZzogMSxcbiAgICBzdGFydE51bWJlcjogMSxcbiAgICBudWxsVmFsdWU6IDEsXG4gICAgdHJ1ZVZhbHVlOiAxLFxuICAgIGZhbHNlVmFsdWU6IDEsXG4gICAgc3RyaW5nVmFsdWU6IDEsXG4gICAgbnVtYmVyVmFsdWU6IDEsXG4gIH0sXG4gIHN0b3BUb2tlbnMgPSB7XG4gICAgc3RhcnRPYmplY3Q6IFwiZW5kT2JqZWN0XCIsXG4gICAgc3RhcnRBcnJheTogXCJlbmRBcnJheVwiLFxuICAgIHN0YXJ0U3RyaW5nOiBcImVuZFN0cmluZ1wiLFxuICAgIHN0YXJ0TnVtYmVyOiBcImVuZE51bWJlclwiLFxuICB9LFxuICBvcHRpb25hbFRva2VucyA9IHsgZW5kU3RyaW5nOiBcInN0cmluZ1ZhbHVlXCIsIGVuZE51bWJlcjogXCJudW1iZXJWYWx1ZVwiIH07XG5cbmNvbnN0IGRlZmF1bHRGaWx0ZXIgPSAoX3N0YWNrOiBzdHJpbmdbXSwgX2E6IGFueSkgPT4gdHJ1ZTtcblxuY29uc3Qgc3RyaW5nRmlsdGVyID0gKHN0cmluZzogc3RyaW5nLCBzZXBhcmF0b3I6IHN0cmluZykgPT4ge1xuICBjb25zdCBzdHJpbmdXaXRoU2VwYXJhdG9yID0gc3RyaW5nICsgc2VwYXJhdG9yO1xuICByZXR1cm4gKHN0YWNrOiBzdHJpbmdbXSwgX2E6IGFueSkgPT4ge1xuICAgIGNvbnN0IHBhdGggPSBzdGFjay5qb2luKHNlcGFyYXRvcik7XG4gICAgcmV0dXJuIHBhdGggPT09IHN0cmluZyB8fCBwYXRoLnN0YXJ0c1dpdGgoc3RyaW5nV2l0aFNlcGFyYXRvcik7XG4gIH07XG59O1xuXG5jb25zdCByZWdFeHBGaWx0ZXIgPSAocmVnRXhwOiBSZWdFeHAsIHNlcGFyYXRvcjogc3RyaW5nKSA9PiB7XG4gIHJldHVybiAoc3RhY2s6IHN0cmluZ1tdLCBfYTogYW55KSA9PiByZWdFeHAudGVzdChzdGFjay5qb2luKHNlcGFyYXRvcikpO1xufTtcblxuY29uc3QgZmlsdGVyQmFzZSA9XG4gICh7XG4gICAgc3BlY2lhbEFjdGlvbiA9IFwiYWNjZXB0XCIsXG4gICAgZGVmYXVsdEFjdGlvbiA9IFwiaWdub3JlXCIsXG4gICAgbm9uQ2hlY2thYmxlQWN0aW9uID0gXCJwcm9jZXNzLWtleVwiLFxuICAgIHRyYW5zaXRpb24gPSB1bmRlZmluZWQgYXMgYW55LFxuICB9ID0ge30pID0+XG4gIChvcHRpb25zOiBhbnkpID0+IHtcbiAgICBjb25zdCBvbmNlID0gb3B0aW9ucz8ub25jZSxcbiAgICAgIHNlcGFyYXRvciA9IG9wdGlvbnM/LnBhdGhTZXBhcmF0b3IgfHwgXCIuXCI7XG4gICAgbGV0IGZpbHRlciA9IGRlZmF1bHRGaWx0ZXIsXG4gICAgICBzdHJlYW1LZXlzID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGZpbHRlciA9IHN0cmluZ0ZpbHRlcihvcHRpb25zLmZpbHRlciwgc2VwYXJhdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5maWx0ZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgZmlsdGVyID0gcmVnRXhwRmlsdGVyKG9wdGlvbnMuZmlsdGVyLCBzZXBhcmF0b3IpO1xuICAgICAgfVxuICAgICAgaWYgKFwic3RyZWFtVmFsdWVzXCIgaW4gb3B0aW9ucykgc3RyZWFtS2V5cyA9IG9wdGlvbnMuc3RyZWFtVmFsdWVzO1xuICAgICAgaWYgKFwic3RyZWFtS2V5c1wiIGluIG9wdGlvbnMpIHN0cmVhbUtleXMgPSBvcHRpb25zLnN0cmVhbUtleXM7XG4gICAgfVxuICAgIGNvbnN0IHNhbml0aXplZE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zLCB7IGZpbHRlciwgc3RyZWFtS2V5cywgc2VwYXJhdG9yIH0pO1xuICAgIGxldCBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICBjb25zdCBzdGFjazogYW55W10gPSBbXTtcbiAgICBsZXQgZGVwdGggPSAwLFxuICAgICAgcHJldmlvdXNUb2tlbiA9IFwiXCIsXG4gICAgICBlbmRUb2tlbiA9IFwiXCIsXG4gICAgICBvcHRpb25hbFRva2VuID0gXCJcIixcbiAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgIHJldHVybiBmbHVzaGFibGUoKGNodW5rKSA9PiB7XG4gICAgICAvLyB0aGUgZmx1c2hcbiAgICAgIGlmIChjaHVuayA9PT0gbm9uZSkgcmV0dXJuIHRyYW5zaXRpb24gPyB0cmFuc2l0aW9uKFtdLCBudWxsLCBcImZsdXNoXCIsIHNhbml0aXplZE9wdGlvbnMpIDogbm9uZTtcblxuICAgICAgLy8gcHJvY2VzcyB0aGUgb3B0aW9uYWwgdmFsdWUgdG9rZW4gKHVuZmluaXNoZWQpXG4gICAgICBpZiAob3B0aW9uYWxUb2tlbikge1xuICAgICAgICBpZiAob3B0aW9uYWxUb2tlbiA9PT0gY2h1bmsubmFtZSkge1xuICAgICAgICAgIGxldCByZXR1cm5Ub2tlbiA9IG5vbmU7XG4gICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcInByb2Nlc3Mta2V5XCI6XG4gICAgICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID0gY2h1bmsudmFsdWU7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhY2NlcHQtdmFsdWVcIjpcbiAgICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSBjaHVuaztcbiAgICAgICAgICAgICAgc3RhdGUgPSBvbmNlID8gXCJwYXNzXCIgOiBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgc3RhdGUgPSBvbmNlID8gXCJhbGxcIiA6IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wdGlvbmFsVG9rZW4gPSBcIlwiO1xuICAgICAgICAgIHJldHVybiByZXR1cm5Ub2tlbjtcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25hbFRva2VuID0gXCJcIjtcbiAgICAgICAgc3RhdGUgPSBvbmNlICYmIHN0YXRlICE9PSBcInByb2Nlc3Mta2V5XCIgPyBcInBhc3NcIiA6IFwiY2hlY2tcIjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJldHVyblRva2VuOiBhbnkgPSBub25lO1xuXG4gICAgICByZWNoZWNrOiBmb3IgKDs7KSB7XG4gICAgICAgIC8vIGFjY2VwdC9yZWplY3QgdG9rZW5zXG4gICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICBjYXNlIFwicHJvY2Vzcy1rZXlcIjpcbiAgICAgICAgICAgIGlmIChjaHVuay5uYW1lID09PSBcImVuZEtleVwiKSBvcHRpb25hbFRva2VuID0gXCJrZXlWYWx1ZVwiO1xuICAgICAgICAgICAgcmV0dXJuIG5vbmU7XG4gICAgICAgICAgY2FzZSBcInBhc3NcIjpcbiAgICAgICAgICAgIHJldHVybiBub25lO1xuICAgICAgICAgIGNhc2UgXCJhbGxcIjpcbiAgICAgICAgICAgIHJldHVybiBjaHVuaztcbiAgICAgICAgICBjYXNlIFwiYWNjZXB0XCI6XG4gICAgICAgICAgY2FzZSBcInJlamVjdFwiOlxuICAgICAgICAgICAgaWYgKHN0YXJ0VHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICBzdGFydFRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSB0cmFuc2l0aW9uKHN0YWNrLCBjaHVuaywgc3RhdGUsIHNhbml0aXplZE9wdGlvbnMpIHx8IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzd2l0Y2ggKGNodW5rLm5hbWUpIHtcbiAgICAgICAgICAgICAgY2FzZSBcInN0YXJ0T2JqZWN0XCI6XG4gICAgICAgICAgICAgIGNhc2UgXCJzdGFydEFycmF5XCI6XG4gICAgICAgICAgICAgICAgKytkZXB0aDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImVuZE9iamVjdFwiOlxuICAgICAgICAgICAgICBjYXNlIFwiZW5kQXJyYXlcIjpcbiAgICAgICAgICAgICAgICAtLWRlcHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcImFjY2VwdFwiKSB7XG4gICAgICAgICAgICAgIHJldHVyblRva2VuID0gY29tYmluZU1hbnlNdXQocmV0dXJuVG9rZW4sIGNodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZGVwdGgpIHtcbiAgICAgICAgICAgICAgaWYgKG9uY2UpIHtcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlID09PSBcImFjY2VwdFwiID8gXCJwYXNzXCIgOiBcImFsbFwiO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVG9rZW47XG4gICAgICAgICAgY2FzZSBcImFjY2VwdC12YWx1ZVwiOlxuICAgICAgICAgIGNhc2UgXCJyZWplY3QtdmFsdWVcIjpcbiAgICAgICAgICAgIGlmIChzdGFydFRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgc3RhcnRUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVyblRva2VuID0gdHJhbnNpdGlvbihzdGFjaywgY2h1bmssIHN0YXRlLCBzYW5pdGl6ZWRPcHRpb25zKSB8fCBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRlID09PSBcImFjY2VwdC12YWx1ZVwiKSB7XG4gICAgICAgICAgICAgIHJldHVyblRva2VuID0gY29tYmluZU1hbnlNdXQocmV0dXJuVG9rZW4sIGNodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjaHVuay5uYW1lID09PSBlbmRUb2tlbikge1xuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIG9wdGlvbmFsVG9rZW4gPSBvcHRpb25hbFRva2Vuc1tlbmRUb2tlbl0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgZW5kVG9rZW4gPSBcIlwiO1xuICAgICAgICAgICAgICBpZiAoIW9wdGlvbmFsVG9rZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZSA9PT0gXCJhY2NlcHQtdmFsdWVcIiA/IFwicGFzc1wiIDogXCJhbGxcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVG9rZW47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1cGRhdGUgdGhlIGxhc3QgaW5kZXggaW4gdGhlIHN0YWNrXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIC8vIGFycmF5XG4gICAgICAgICAgc3dpdGNoIChjaHVuay5uYW1lKSB7XG4gICAgICAgICAgICBjYXNlIFwic3RhcnRPYmplY3RcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdGFydEFycmF5XCI6XG4gICAgICAgICAgICBjYXNlIFwic3RhcnRTdHJpbmdcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdGFydE51bWJlclwiOlxuICAgICAgICAgICAgY2FzZSBcIm51bGxWYWx1ZVwiOlxuICAgICAgICAgICAgY2FzZSBcInRydWVWYWx1ZVwiOlxuICAgICAgICAgICAgY2FzZSBcImZhbHNlVmFsdWVcIjpcbiAgICAgICAgICAgICAgKytzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibnVtYmVyVmFsdWVcIjpcbiAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVG9rZW4gIT09IFwiZW5kTnVtYmVyXCIpICsrc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0cmluZ1ZhbHVlXCI6XG4gICAgICAgICAgICAgIGlmIChwcmV2aW91c1Rva2VuICE9PSBcImVuZFN0cmluZ1wiKSArK3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IFwia2V5VmFsdWVcIikgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gPSBjaHVuay52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91c1Rva2VuID0gY2h1bmsubmFtZTtcblxuICAgICAgICAvLyBjaGVjayB0aGUgdG9rZW5cbiAgICAgICAgY29uc3QgYWN0aW9uID1cbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgY2hlY2thYmxlVG9rZW5zW2NodW5rLm5hbWVdICE9PSAxID8gbm9uQ2hlY2thYmxlQWN0aW9uIDogZmlsdGVyKHN0YWNrLCBjaHVuaykgPyBzcGVjaWFsQWN0aW9uIDogZGVmYXVsdEFjdGlvbjtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGVuZFRva2VuID0gc3RvcFRva2Vuc1tjaHVuay5uYW1lXSB8fCBcIlwiO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgICAgIGNhc2UgXCJwcm9jZXNzLWtleVwiOlxuICAgICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IFwic3RhcnRLZXlcIikge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwicHJvY2Vzcy1rZXlcIjtcbiAgICAgICAgICAgICAgY29udGludWUgcmVjaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJhY2NlcHQtdG9rZW5cIjpcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGlmIChlbmRUb2tlbiAmJiBvcHRpb25hbFRva2Vuc1tlbmRUb2tlbl0pIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcImFjY2VwdC12YWx1ZVwiO1xuICAgICAgICAgICAgICBzdGFydFRyYW5zaXRpb24gPSAhIXRyYW5zaXRpb247XG4gICAgICAgICAgICAgIGNvbnRpbnVlIHJlY2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbikgcmV0dXJuVG9rZW4gPSB0cmFuc2l0aW9uKHN0YWNrLCBjaHVuaywgYWN0aW9uLCBzYW5pdGl6ZWRPcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVyblRva2VuID0gY29tYmluZU1hbnlNdXQocmV0dXJuVG9rZW4sIGNodW5rKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJhY2NlcHRcIjpcbiAgICAgICAgICAgIGlmIChlbmRUb2tlbikge1xuICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgIHN0YXRlID0gb3B0aW9uYWxUb2tlbnNbZW5kVG9rZW5dID8gXCJhY2NlcHQtdmFsdWVcIiA6IFwiYWNjZXB0XCI7XG4gICAgICAgICAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9ICEhdHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgY29udGludWUgcmVjaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uKSByZXR1cm5Ub2tlbiA9IHRyYW5zaXRpb24oc3RhY2ssIGNodW5rLCBhY3Rpb24sIHNhbml0aXplZE9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSBjb21iaW5lTWFueU11dChyZXR1cm5Ub2tlbiwgY2h1bmspO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInJlamVjdFwiOlxuICAgICAgICAgICAgaWYgKGVuZFRva2VuKSB7XG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgc3RhdGUgPSBvcHRpb25hbFRva2Vuc1tlbmRUb2tlbl0gPyBcInJlamVjdC12YWx1ZVwiIDogXCJyZWplY3RcIjtcbiAgICAgICAgICAgICAgc3RhcnRUcmFuc2l0aW9uID0gISF0cmFuc2l0aW9uO1xuICAgICAgICAgICAgICBjb250aW51ZSByZWNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHJldHVyblRva2VuID0gdHJhbnNpdGlvbihzdGFjaywgY2h1bmssIGFjdGlvbiwgc2FuaXRpemVkT3B0aW9ucyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicGFzc1wiOlxuICAgICAgICAgICAgc3RhdGUgPSBcInBhc3NcIjtcbiAgICAgICAgICAgIGNvbnRpbnVlIHJlY2hlY2s7XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIHRoZSBzdGFja1xuICAgICAgc3dpdGNoIChjaHVuay5uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJzdGFydE9iamVjdFwiOlxuICAgICAgICAgIHN0YWNrLnB1c2gobnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJzdGFydEFycmF5XCI6XG4gICAgICAgICAgc3RhY2sucHVzaCgtMSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJlbmRPYmplY3RcIjpcbiAgICAgICAgY2FzZSBcImVuZEFycmF5XCI6XG4gICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXR1cm5Ub2tlbjtcbiAgICB9KTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IFBpY2tQYXJzZXIgPSAob3B0aW9ucz86IGFueSkgPT4gd2l0aFBhcnNlcihmaWx0ZXJCYXNlKCksIE9iamVjdC5hc3NpZ24oeyBwYWNrS2V5czogdHJ1ZSB9LCBvcHRpb25zKSk7XG5cbmNsYXNzIENvdW50ZXIge1xuICBkZXB0aDogbnVtYmVyO1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsRGVwdGg6IG51bWJlcikge1xuICAgIHRoaXMuZGVwdGggPSBpbml0aWFsRGVwdGg7XG4gIH1cbiAgc3RhcnRPYmplY3QoKSB7XG4gICAgKyt0aGlzLmRlcHRoO1xuICB9XG4gIGVuZE9iamVjdCgpIHtcbiAgICAtLXRoaXMuZGVwdGg7XG4gIH1cbiAgc3RhcnRBcnJheSgpIHtcbiAgICArK3RoaXMuZGVwdGg7XG4gIH1cbiAgZW5kQXJyYXkoKSB7XG4gICAgLS10aGlzLmRlcHRoO1xuICB9XG59XG5cbmNsYXNzIEFzc2VtYmxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHN0YXRpYyBjb25uZWN0VG8oc3RyZWFtOiBhbnksIG9wdGlvbnM6IGFueSkge1xuICAgIHJldHVybiBuZXcgQXNzZW1ibGVyKG9wdGlvbnMpLmNvbm5lY3RUbyhzdHJlYW0pO1xuICB9XG5cbiAgc3RhY2s6IGFueTtcbiAgY3VycmVudDogYW55O1xuICBrZXk6IGFueTtcbiAgZG9uZTogYm9vbGVhbjtcbiAgcmV2aXZlcjogYW55O1xuICAvLyBAdHMtaWdub3JlXG4gIHN0cmluZ1ZhbHVlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdGFwQ2hhaW46IChjaHVuazogYW55KSA9PiBhbnk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogYW55KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YWNrID0gW107XG4gICAgdGhpcy5jdXJyZW50ID0gdGhpcy5rZXkgPSBudWxsO1xuICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMucmV2aXZlciA9IHR5cGVvZiBvcHRpb25zLnJldml2ZXIgPT0gXCJmdW5jdGlvblwiICYmIG9wdGlvbnMucmV2aXZlcjtcbiAgICAgIGlmICh0aGlzLnJldml2ZXIpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdWYWx1ZSA9IHRoaXMuX3NhdmVWYWx1ZSA9IHRoaXMuX3NhdmVWYWx1ZVdpdGhSZXZpdmVyO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMubnVtYmVyQXNTdHJpbmcpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLm51bWJlclZhbHVlID0gdGhpcy5zdHJpbmdWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRhcENoYWluID0gKGNodW5rKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpZiAodGhpc1tjaHVuay5uYW1lXSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXNbY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm4gdGhpcy5jdXJyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vbmU7XG4gICAgfTtcblxuICAgIHRoaXMuc3RyaW5nVmFsdWUgPSB0aGlzLl9zYXZlVmFsdWU7XG4gIH1cblxuICBjb25uZWN0VG8oc3RyZWFtOiBhbnkpIHtcbiAgICBzdHJlYW0ub24oXCJkYXRhXCIsIChjaHVuazogYW55KSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBpZiAodGhpc1tjaHVuay5uYW1lXSkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXNbY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHRoaXMuZW1pdChcImRvbmVcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQgZGVwdGgoKSB7XG4gICAgcmV0dXJuICh0aGlzLnN0YWNrLmxlbmd0aCA+PiAxKSArICh0aGlzLmRvbmUgPyAwIDogMSk7XG4gIH1cblxuICBnZXQgcGF0aCgpIHtcbiAgICBjb25zdCBwYXRoOiBhbnlbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFjay5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgY29uc3Qga2V5ID0gdGhpcy5zdGFja1tpICsgMV07XG4gICAgICBwYXRoLnB1c2goa2V5ID09PSBudWxsID8gdGhpcy5zdGFja1tpXS5sZW5ndGggOiBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuXG4gIGRyb3BUb0xldmVsKGxldmVsOiBhbnkpIHtcbiAgICBpZiAobGV2ZWwgPCB0aGlzLmRlcHRoKSB7XG4gICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gKGxldmVsIC0gMSkgPDwgMTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5zdGFja1tpbmRleF07XG4gICAgICAgIHRoaXMua2V5ID0gdGhpcy5zdGFja1tpbmRleCArIDFdO1xuICAgICAgICB0aGlzLnN0YWNrLnNwbGljZShpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YWNrID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMua2V5ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb25zdW1lKGNodW5rOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpc1tjaHVuay5uYW1lXSAmJiB0aGlzW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGtleVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLmtleSA9IHZhbHVlO1xuICB9XG5cbiAgLy9zdHJpbmdWYWx1ZSgpIC0gYWxpYXNlZCBiZWxvdyB0byBfc2F2ZVZhbHVlKClcblxuICBudW1iZXJWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy5fc2F2ZVZhbHVlKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgfVxuICBudWxsVmFsdWUoKSB7XG4gICAgdGhpcy5fc2F2ZVZhbHVlKG51bGwpO1xuICB9XG4gIHRydWVWYWx1ZSgpIHtcbiAgICB0aGlzLl9zYXZlVmFsdWUodHJ1ZSk7XG4gIH1cbiAgZmFsc2VWYWx1ZSgpIHtcbiAgICB0aGlzLl9zYXZlVmFsdWUoZmFsc2UpO1xuICB9XG5cbiAgc3RhcnRPYmplY3QoKSB7XG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhY2sucHVzaCh0aGlzLmN1cnJlbnQsIHRoaXMua2V5KTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50ID0gbmV3IE9iamVjdCgpO1xuICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgfVxuXG4gIGVuZE9iamVjdCgpIHtcbiAgICBpZiAodGhpcy5zdGFjay5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jdXJyZW50O1xuICAgICAgdGhpcy5rZXkgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgIHRoaXMuX3NhdmVWYWx1ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRBcnJheSgpIHtcbiAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFjay5wdXNoKHRoaXMuY3VycmVudCwgdGhpcy5rZXkpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnQgPSBbXTtcbiAgICB0aGlzLmtleSA9IG51bGw7XG4gIH1cblxuICBlbmRBcnJheSgpIHtcbiAgICBpZiAodGhpcy5zdGFjay5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jdXJyZW50O1xuICAgICAgdGhpcy5rZXkgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5zdGFjay5wb3AoKTtcbiAgICAgIHRoaXMuX3NhdmVWYWx1ZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgX3NhdmVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB0aGlzLmN1cnJlbnQucHVzaCh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJlbnRbdGhpcy5rZXldID0gdmFsdWU7XG4gICAgICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgX3NhdmVWYWx1ZVdpdGhSZXZpdmVyKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnJldml2ZXIoXCJcIiwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmFsdWUgPSB0aGlzLnJldml2ZXIoXCJcIiArIHRoaXMuY3VycmVudC5sZW5ndGgsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50LnB1c2godmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmN1cnJlbnRbdGhpcy5jdXJyZW50Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRoaXMucmV2aXZlcih0aGlzLmtleSwgdmFsdWUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudFt0aGlzLmtleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHN0cmVhbUJhc2UgPVxuICAoeyBwdXNoLCBmaXJzdCwgbGV2ZWwgfTogYW55KSA9PlxuICAob3B0aW9ucyA9IHt9IGFzIGFueSkgPT4ge1xuICAgIGNvbnN0IHsgb2JqZWN0RmlsdGVyLCBpbmNsdWRlVW5kZWNpZGVkIH0gPSBvcHRpb25zO1xuICAgIGxldCBhc20gPSBuZXcgQXNzZW1ibGVyKG9wdGlvbnMpIGFzIGFueSxcbiAgICAgIHN0YXRlID0gZmlyc3QgPyBcImZpcnN0XCIgOiBcImNoZWNrXCIsXG4gICAgICBzYXZlZEFzbSA9IG51bGwgYXMgYW55O1xuXG4gICAgaWYgKHR5cGVvZiBvYmplY3RGaWx0ZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvLyBubyBvYmplY3QgZmlsdGVyICsgbm8gZmlyc3QgY2hlY2tcbiAgICAgIGlmIChzdGF0ZSA9PT0gXCJjaGVja1wiKVxuICAgICAgICByZXR1cm4gKGNodW5rOiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoYXNtW2NodW5rLm5hbWVdKSB7XG4gICAgICAgICAgICBhc21bY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHB1c2goYXNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vbmU7XG4gICAgICAgIH07XG4gICAgICAvLyBubyBvYmplY3QgZmlsdGVyXG4gICAgICByZXR1cm4gKGNodW5rOiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgZmlyc3QoY2h1bmspO1xuICAgICAgICAgICAgc3RhdGUgPSBcImFjY2VwdFwiO1xuICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICAgIGNhc2UgXCJhY2NlcHRcIjpcbiAgICAgICAgICAgIGlmIChhc21bY2h1bmsubmFtZV0pIHtcbiAgICAgICAgICAgICAgYXNtW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHVzaChhc20pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9uZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gb2JqZWN0IGZpbHRlciArIGEgcG9zc2libGUgZmlyc3QgY2hlY2tcbiAgICByZXR1cm4gKGNodW5rOiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgZmlyc3QoY2h1bmspO1xuICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAvLyBmYWxsIHRocm91Z2hcbiAgICAgICAgY2FzZSBcImNoZWNrXCI6XG4gICAgICAgICAgaWYgKGFzbVtjaHVuay5uYW1lXSkge1xuICAgICAgICAgICAgYXNtW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IG9iamVjdEZpbHRlcihhc20pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwiYWNjZXB0XCI7XG4gICAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSByZXR1cm4gcHVzaChhc20pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSByZXR1cm4gcHVzaChhc20sIHRydWUpO1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwicmVqZWN0XCI7XG4gICAgICAgICAgICAgIHNhdmVkQXNtID0gYXNtO1xuICAgICAgICAgICAgICBhc20gPSBuZXcgQ291bnRlcihzYXZlZEFzbS5kZXB0aCk7XG4gICAgICAgICAgICAgIHNhdmVkQXNtLmRyb3BUb0xldmVsKGxldmVsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSByZXR1cm4gcHVzaChhc20sICFpbmNsdWRlVW5kZWNpZGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJhY2NlcHRcIjpcbiAgICAgICAgICBpZiAoYXNtW2NodW5rLm5hbWVdKSB7XG4gICAgICAgICAgICBhc21bY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIHJldHVybiBwdXNoKGFzbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwicmVqZWN0XCI6XG4gICAgICAgICAgaWYgKGFzbVtjaHVuay5uYW1lXSkge1xuICAgICAgICAgICAgYXNtW2NodW5rLm5hbWVdKGNodW5rLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChhc20uZGVwdGggPT09IGxldmVsKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJjaGVja1wiO1xuICAgICAgICAgICAgICBhc20gPSBzYXZlZEFzbTtcbiAgICAgICAgICAgICAgc2F2ZWRBc20gPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm4gcHVzaChhc20sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiBub25lO1xuICAgIH07XG4gIH07XG5cbmV4cG9ydCBjb25zdCBTdHJlYW1BcnJheSA9IChvcHRpb25zPzogYW55KSA9PiB7XG4gIGxldCBrZXkgPSAwO1xuICByZXR1cm4gc3RyZWFtQmFzZSh7XG4gICAgbGV2ZWw6IDEsXG5cbiAgICBmaXJzdChjaHVuazogYW55KSB7XG4gICAgICBpZiAoY2h1bmsubmFtZSAhPT0gXCJzdGFydEFycmF5XCIpIHRocm93IG5ldyBFcnJvcihcIlRvcC1sZXZlbCBvYmplY3Qgc2hvdWxkIGJlIGFuIGFycmF5LlwiKTtcbiAgICB9LFxuXG4gICAgcHVzaChhc206IGFueSwgZGlzY2FyZDogYW55KSB7XG4gICAgICBpZiAoYXNtLmN1cnJlbnQubGVuZ3RoKSB7XG4gICAgICAgIGlmIChkaXNjYXJkKSB7XG4gICAgICAgICAgKytrZXk7XG4gICAgICAgICAgYXNtLmN1cnJlbnQucG9wKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsga2V5OiBrZXkrKywgdmFsdWU6IGFzbS5jdXJyZW50LnBvcCgpIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBub25lO1xuICAgIH0sXG4gIH0pKG9wdGlvbnMpO1xufTtcbiIsICJpbXBvcnQgeyBMaXN0LCBNZW51QmFyRXh0cmEsIEljb24sIG9wZW4sIExhdW5jaFR5cGUsIGVudmlyb25tZW50LCBBY3Rpb25QYW5lbCwgQWN0aW9uIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgb3MgZnJvbSBcIm5vZGU6b3NcIjtcbmltcG9ydCB7IHVzZVJlZiwgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VQcm9taXNlLCBQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCIuL3Nob3dGYWlsdXJlVG9hc3RcIjtcbmltcG9ydCB7IGJhc2VFeGVjdXRlU1FMLCBQZXJtaXNzaW9uRXJyb3IsIGlzUGVybWlzc2lvbkVycm9yIH0gZnJvbSBcIi4vc3FsLXV0aWxzXCI7XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBxdWVyeSBvbiBhIGxvY2FsIFNRTCBkYXRhYmFzZSBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHF1ZXJ5IG9mIHRoZSBjb21tYW5kLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgdXNlU1FMIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKiBpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbiAqIGltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbiAqXG4gKiBjb25zdCBOT1RFU19EQiA9IHJlc29sdmUoaG9tZWRpcigpLCBcIkxpYnJhcnkvR3JvdXAgQ29udGFpbmVycy9ncm91cC5jb20uYXBwbGUubm90ZXMvTm90ZVN0b3JlLnNxbGl0ZVwiKTtcbiAqIGNvbnN0IG5vdGVzUXVlcnkgPSBgU0VMRUNUIGlkLCB0aXRsZSBGUk9NIC4uLmA7XG4gKiB0eXBlIE5vdGVJdGVtID0ge1xuICogICBpZDogc3RyaW5nO1xuICogICB0aXRsZTogc3RyaW5nO1xuICogfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcGVybWlzc2lvblZpZXcgfSA9IHVzZVNRTDxOb3RlSXRlbT4oTk9URVNfREIsIG5vdGVzUXVlcnkpO1xuICpcbiAqICAgaWYgKHBlcm1pc3Npb25WaWV3KSB7XG4gKiAgICAgcmV0dXJuIHBlcm1pc3Npb25WaWV3O1xuICogICB9XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cbiAqICAgICAgIHsoZGF0YSB8fCBbXSkubWFwKChpdGVtKSA9PiAoXG4gKiAgICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtpdGVtLmlkfSB0aXRsZT17aXRlbS50aXRsZX0gLz5cbiAqICAgICAgICkpfVxuICogICAgIDwvTGlzdD5cbiAqICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlU1FMPFQgPSB1bmtub3duPihcbiAgZGF0YWJhc2VQYXRoOiBzdHJpbmcsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiB7XG4gICAgLyoqIEEgc3RyaW5nIGV4cGxhaW5pbmcgd2h5IHRoZSBleHRlbnNpb24gbmVlZHMgZnVsbCBkaXNrIGFjY2Vzcy4gRm9yIGV4YW1wbGUsIHRoZSBBcHBsZSBOb3RlcyBleHRlbnNpb24gdXNlcyBgXCJUaGlzIGlzIHJlcXVpcmVkIHRvIHNlYXJjaCB5b3VyIEFwcGxlIE5vdGVzLlwiYC4gV2hpbGUgaXQgaXMgb3B0aW9uYWwsIHdlIHJlY29tbWVuZCBzZXR0aW5nIGl0IHRvIGhlbHAgdXNlcnMgdW5kZXJzdGFuZC4gKi9cbiAgICBwZXJtaXNzaW9uUHJpbWluZz86IHN0cmluZztcbiAgfSAmIE9taXQ8UHJvbWlzZU9wdGlvbnM8KGRhdGFiYXNlOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpID0+IFByb21pc2U8VFtdPj4sIFwiYWJvcnRhYmxlXCI+LFxuKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgeyBwZXJtaXNzaW9uUHJpbWluZywgLi4udXNlUHJvbWlzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3QgW3Blcm1pc3Npb25WaWV3LCBzZXRQZXJtaXNzaW9uVmlld10gPSB1c2VTdGF0ZTxSZWFjdC5KU1guRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXRlc3RPcHRpb25zID0gdXNlTGF0ZXN0KG9wdGlvbnMgfHwge30pO1xuICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVFcnJvciA9IHVzZUNhbGxiYWNrKFxuICAgIChfZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKF9lcnJvcik7XG4gICAgICBjb25zdCBlcnJvciA9XG4gICAgICAgIF9lcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIF9lcnJvci5tZXNzYWdlLmluY2x1ZGVzKFwiYXV0aG9yaXphdGlvbiBkZW5pZWRcIilcbiAgICAgICAgICA/IG5ldyBQZXJtaXNzaW9uRXJyb3IoXCJZb3UgZG8gbm90IGhhdmUgcGVybWlzc2lvbiB0byBhY2Nlc3MgdGhlIGRhdGFiYXNlLlwiKVxuICAgICAgICAgIDogKF9lcnJvciBhcyBFcnJvcik7XG5cbiAgICAgIGlmIChpc1Blcm1pc3Npb25FcnJvcihlcnJvcikpIHtcbiAgICAgICAgc2V0UGVybWlzc2lvblZpZXcoPFBlcm1pc3Npb25FcnJvclNjcmVlbiBwcmltaW5nPXtsYXRlc3RPcHRpb25zLmN1cnJlbnQucGVybWlzc2lvblByaW1pbmd9IC8+KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChsYXRlc3RPcHRpb25zLmN1cnJlbnQub25FcnJvcikge1xuICAgICAgICAgIGxhdGVzdE9wdGlvbnMuY3VycmVudC5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoZW52aXJvbm1lbnQubGF1bmNoVHlwZSAhPT0gTGF1bmNoVHlwZS5CYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7XG4gICAgICAgICAgICAgIHRpdGxlOiBcIkNhbm5vdCBxdWVyeSB0aGUgZGF0YVwiLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbbGF0ZXN0T3B0aW9uc10sXG4gICk7XG5cbiAgY29uc3QgZm4gPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIWV4aXN0c1N5bmMoZGF0YWJhc2VQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGRhdGFiYXNlIGRvZXMgbm90IGV4aXN0XCIpO1xuICAgIH1cblxuICAgIHJldHVybiBhc3luYyAoZGF0YWJhc2VQYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGFib3J0U2lnbmFsID0gYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbDtcbiAgICAgIHJldHVybiBiYXNlRXhlY3V0ZVNRTDxUPihkYXRhYmFzZVBhdGgsIHF1ZXJ5LCB7IHNpZ25hbDogYWJvcnRTaWduYWwgfSk7XG4gICAgfTtcbiAgfSwgW2RhdGFiYXNlUGF0aF0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4udXNlUHJvbWlzZShmbiwgW2RhdGFiYXNlUGF0aCwgcXVlcnldLCB7IC4uLnVzZVByb21pc2VPcHRpb25zLCBvbkVycm9yOiBoYW5kbGVFcnJvciB9KSxcbiAgICBwZXJtaXNzaW9uVmlldyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGVybWlzc2lvbkVycm9yU2NyZWVuKHByb3BzOiB7IHByaW1pbmc/OiBzdHJpbmcgfSkge1xuICBjb25zdCBtYWNvc1ZlbnR1cmFBbmRMYXRlciA9IHBhcnNlSW50KG9zLnJlbGVhc2UoKS5zcGxpdChcIi5cIilbMF0pID49IDIyO1xuICBjb25zdCBwcmVmZXJlbmNlc1N0cmluZyA9IG1hY29zVmVudHVyYUFuZExhdGVyID8gXCJTZXR0aW5nc1wiIDogXCJQcmVmZXJlbmNlc1wiO1xuXG4gIGNvbnN0IGFjdGlvbiA9IG1hY29zVmVudHVyYUFuZExhdGVyXG4gICAgPyB7XG4gICAgICAgIHRpdGxlOiBcIk9wZW4gU3lzdGVtIFNldHRpbmdzIC0+IFByaXZhY3lcIixcbiAgICAgICAgdGFyZ2V0OiBcIngtYXBwbGUuc3lzdGVtcHJlZmVyZW5jZXM6Y29tLmFwcGxlLnByZWZlcmVuY2Uuc2VjdXJpdHk/UHJpdmFjeV9BbGxGaWxlc1wiLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICB0aXRsZTogXCJPcGVuIFN5c3RlbSBQcmVmZXJlbmNlcyAtPiBTZWN1cml0eVwiLFxuICAgICAgICB0YXJnZXQ6IFwieC1hcHBsZS5zeXN0ZW1wcmVmZXJlbmNlczpjb20uYXBwbGUucHJlZmVyZW5jZS5zZWN1cml0eT9Qcml2YWN5X0FsbEZpbGVzXCIsXG4gICAgICB9O1xuXG4gIGlmIChlbnZpcm9ubWVudC5jb21tYW5kTW9kZSA9PT0gXCJtZW51LWJhclwiKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZW51QmFyRXh0cmEgaWNvbj17SWNvbi5XYXJuaW5nfSB0aXRsZT17ZW52aXJvbm1lbnQuY29tbWFuZE5hbWV9PlxuICAgICAgICA8TWVudUJhckV4dHJhLkl0ZW1cbiAgICAgICAgICB0aXRsZT1cIlJheWNhc3QgbmVlZHMgZnVsbCBkaXNrIGFjY2Vzc1wiXG4gICAgICAgICAgdG9vbHRpcD17YFlvdSBjYW4gcmV2ZXJ0IHRoaXMgYWNjZXNzIGluICR7cHJlZmVyZW5jZXNTdHJpbmd9IHdoZW5ldmVyIHlvdSB3YW50YH1cbiAgICAgICAgLz5cbiAgICAgICAge3Byb3BzLnByaW1pbmcgPyAoXG4gICAgICAgICAgPE1lbnVCYXJFeHRyYS5JdGVtXG4gICAgICAgICAgICB0aXRsZT17cHJvcHMucHJpbWluZ31cbiAgICAgICAgICAgIHRvb2x0aXA9e2BZb3UgY2FuIHJldmVydCB0aGlzIGFjY2VzcyBpbiAke3ByZWZlcmVuY2VzU3RyaW5nfSB3aGVuZXZlciB5b3Ugd2FudGB9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxNZW51QmFyRXh0cmEuU2VwYXJhdG9yIC8+XG4gICAgICAgIDxNZW51QmFyRXh0cmEuSXRlbSB0aXRsZT17YWN0aW9uLnRpdGxlfSBvbkFjdGlvbj17KCkgPT4gb3BlbihhY3Rpb24udGFyZ2V0KX0gLz5cbiAgICAgIDwvTWVudUJhckV4dHJhPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxMaXN0PlxuICAgICAgPExpc3QuRW1wdHlWaWV3XG4gICAgICAgIGljb249e3tcbiAgICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICAgIGxpZ2h0OiBcImh0dHBzOi8vcmF5Y2FzdC5jb20vdXBsb2Fkcy9leHRlbnNpb25zLXV0aWxzLXNlY3VyaXR5LXBlcm1pc3Npb25zLWxpZ2h0LnBuZ1wiLFxuICAgICAgICAgICAgZGFyazogXCJodHRwczovL3JheWNhc3QuY29tL3VwbG9hZHMvZXh0ZW5zaW9ucy11dGlscy1zZWN1cml0eS1wZXJtaXNzaW9ucy1kYXJrLnBuZ1wiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH19XG4gICAgICAgIHRpdGxlPVwiUmF5Y2FzdCBuZWVkcyBmdWxsIGRpc2sgYWNjZXNzLlwiXG4gICAgICAgIGRlc2NyaXB0aW9uPXtgJHtcbiAgICAgICAgICBwcm9wcy5wcmltaW5nID8gcHJvcHMucHJpbWluZyArIFwiXFxuXCIgOiBcIlwiXG4gICAgICAgIH1Zb3UgY2FuIHJldmVydCB0aGlzIGFjY2VzcyBpbiAke3ByZWZlcmVuY2VzU3RyaW5nfSB3aGVuZXZlciB5b3Ugd2FudC5gfVxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICA8QWN0aW9uLk9wZW4gey4uLmFjdGlvbn0gLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiIsICJpbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCB7IGNvcHlGaWxlLCBta2Rpciwgd3JpdGVGaWxlIH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBnZXRTcGF3bmVkUHJvbWlzZSwgZ2V0U3Bhd25lZFJlc3VsdCB9IGZyb20gXCIuL2V4ZWMtdXRpbHNcIjtcbmltcG9ydCB7IGhhc2ggfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmV4cG9ydCBjbGFzcyBQZXJtaXNzaW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9IFwiUGVybWlzc2lvbkVycm9yXCI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGVybWlzc2lvbkVycm9yKGVycm9yOiB1bmtub3duKTogZXJyb3IgaXMgUGVybWlzc2lvbkVycm9yIHtcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubmFtZSA9PT0gXCJQZXJtaXNzaW9uRXJyb3JcIjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJhc2VFeGVjdXRlU1FMPFQgPSB1bmtub3duPihcbiAgZGF0YWJhc2VQYXRoOiBzdHJpbmcsXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiB7XG4gICAgc2lnbmFsPzogQWJvcnRTaWduYWw7XG4gIH0sXG4pOiBQcm9taXNlPFRbXT4ge1xuICBpZiAoIWV4aXN0c1N5bmMoZGF0YWJhc2VQYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBkYXRhYmFzZSBkb2VzIG5vdCBleGlzdFwiKTtcbiAgfVxuXG4gIGxldCBzcWxpdGUzOiB0eXBlb2YgaW1wb3J0KFwibm9kZTpzcWxpdGVcIik7XG4gIHRyeSB7XG4gICAgLy8gdGhpcyBpcyBhIGJpdCB1Z2x5IGJ1dCB3ZSBjYW4ndCBkaXJlY3RseSBpbXBvcnQgXCJub2RlOnNxbGl0ZVwiIGhlcmUgYmVjYXVzZSBwYXJjZWwgd2lsbCBob2lzdCBpdCBhbnl3YXkgYW5kIGl0IHdpbGwgYnJlYWsgd2hlbiBpdCdzIG5vdCBhdmFpbGFibGVcbiAgICBjb25zdCBkeW5hbWljSW1wb3J0ID0gKG1vZHVsZTogc3RyaW5nKSA9PiBpbXBvcnQobW9kdWxlKTtcbiAgICBzcWxpdGUzID0gYXdhaXQgZHluYW1pY0ltcG9ydChcIm5vZGU6c3FsaXRlXCIpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIC8vIElmIHNxbGl0ZTMgaXMgbm90IGF2YWlsYWJsZSwgd2UgZmFsbGJhY2sgdG8gdXNpbmcgdGhlIHNxbGl0ZTMgQ0xJIChhdmFpbGFibGUgb24gbWFjT1MgYW5kIExpbnV4IGJ5IGRlZmF1bHQpLlxuICAgIHJldHVybiBzcWxpdGVGYWxsYmFjazxUPihkYXRhYmFzZVBhdGgsIHF1ZXJ5LCBvcHRpb25zKTtcbiAgfVxuXG4gIGxldCBkYiA9IG5ldyBzcWxpdGUzLkRhdGFiYXNlU3luYyhkYXRhYmFzZVBhdGgsIHsgb3BlbjogZmFsc2UsIHJlYWRPbmx5OiB0cnVlIH0pO1xuXG4gIGNvbnN0IGFib3J0U2lnbmFsID0gb3B0aW9ucz8uc2lnbmFsO1xuXG4gIHRyeSB7XG4gICAgZGIub3BlbigpO1xuXG4gICAgY29uc3Qgc3RhdGVtZW50ID0gZGIucHJlcGFyZShxdWVyeSk7XG4gICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHN0YXRlbWVudC5hbGwoKTtcblxuICAgIGRiLmNsb3NlKCk7XG5cbiAgICByZXR1cm4gcmVzdWx0IGFzIFRbXTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGlmIChlcnJvci5lcnJjb2RlID09PSA1IHx8IGVycm9yLmVycmNvZGUgPT09IDE0IHx8IGVycm9yLm1lc3NhZ2UubWF0Y2goXCIoNSlcIikgfHwgZXJyb3IubWVzc2FnZS5tYXRjaChcIigxNClcIikpIHtcbiAgICAgIC8vIFRoYXQgbWVhbnMgdGhhdCB0aGUgREIgaXMgYnVzeSBiZWNhdXNlIG9mIGFub3RoZXIgYXBwIGlzIGxvY2tpbmcgaXRcbiAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIENocm9tZSBvciBBcmMgaXMgb3BlbmVkOiB0aGV5IGxvY2sgdGhlIEhpc3RvcnkgZGIuXG4gICAgICAvLyBBcyBhbiB1Z2x5IHdvcmthcm91bmQsIHdlIGR1cGxpY2F0ZSB0aGUgZmlsZSBhbmQgcmVhZCB0aGF0IGluc3RlYWRcbiAgICAgIC8vICh3aXRoIHZmcyB1bml4IC0gbm9uZSB0byBqdXN0IG5vdCBjYXJlIGFib3V0IGxvY2tzKVxuICAgICAgbGV0IHdvcmthcm91bmRDb3BpZWREYjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKCF3b3JrYXJvdW5kQ29waWVkRGIpIHtcbiAgICAgICAgY29uc3QgdGVtcEZvbGRlciA9IHBhdGguam9pbihvcy50bXBkaXIoKSwgXCJ1c2VTUUxcIiwgaGFzaChkYXRhYmFzZVBhdGgpKTtcbiAgICAgICAgYXdhaXQgbWtkaXIodGVtcEZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgICAgICAgd29ya2Fyb3VuZENvcGllZERiID0gcGF0aC5qb2luKHRlbXBGb2xkZXIsIFwiZGIuZGJcIik7XG4gICAgICAgIGF3YWl0IGNvcHlGaWxlKGRhdGFiYXNlUGF0aCwgd29ya2Fyb3VuZENvcGllZERiKTtcblxuICAgICAgICBhd2FpdCB3cml0ZUZpbGUod29ya2Fyb3VuZENvcGllZERiICsgXCItc2htXCIsIFwiXCIpO1xuICAgICAgICBhd2FpdCB3cml0ZUZpbGUod29ya2Fyb3VuZENvcGllZERiICsgXCItd2FsXCIsIFwiXCIpO1xuXG4gICAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG4gICAgICB9XG5cbiAgICAgIGRiID0gbmV3IHNxbGl0ZTMuRGF0YWJhc2VTeW5jKHdvcmthcm91bmRDb3BpZWREYiwgeyBvcGVuOiBmYWxzZSwgcmVhZE9ubHk6IHRydWUgfSk7XG4gICAgICBkYi5vcGVuKCk7XG4gICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gICAgICBjb25zdCBzdGF0ZW1lbnQgPSBkYi5wcmVwYXJlKHF1ZXJ5KTtcbiAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IHN0YXRlbWVudC5hbGwoKTtcblxuICAgICAgZGIuY2xvc2UoKTtcblxuICAgICAgcmV0dXJuIHJlc3VsdCBhcyBUW107XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3FsaXRlRmFsbGJhY2s8VCA9IHVua25vd24+KFxuICBkYXRhYmFzZVBhdGg6IHN0cmluZyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICBzaWduYWw/OiBBYm9ydFNpZ25hbDtcbiAgfSxcbik6IFByb21pc2U8VFtdPiB7XG4gIGNvbnN0IGFib3J0U2lnbmFsID0gb3B0aW9ucz8uc2lnbmFsO1xuXG4gIGxldCBzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKFwic3FsaXRlM1wiLCBbXCItLWpzb25cIiwgXCItLXJlYWRvbmx5XCIsIGRhdGFiYXNlUGF0aCwgcXVlcnldLCB7IHNpZ25hbDogYWJvcnRTaWduYWwgfSk7XG4gIGxldCBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQpO1xuICBsZXQgW3sgZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwgfSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdDxzdHJpbmc+KFxuICAgIHNwYXduZWQsXG4gICAgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0sXG4gICAgc3Bhd25lZFByb21pc2UsXG4gICk7XG4gIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgaWYgKHN0ZGVyclJlc3VsdC5tYXRjaChcIig1KVwiKSB8fCBzdGRlcnJSZXN1bHQubWF0Y2goXCIoMTQpXCIpKSB7XG4gICAgLy8gVGhhdCBtZWFucyB0aGF0IHRoZSBEQiBpcyBidXN5IGJlY2F1c2Ugb2YgYW5vdGhlciBhcHAgaXMgbG9ja2luZyBpdFxuICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIENocm9tZSBvciBBcmMgaXMgb3BlbmVkOiB0aGV5IGxvY2sgdGhlIEhpc3RvcnkgZGIuXG4gICAgLy8gQXMgYW4gdWdseSB3b3JrYXJvdW5kLCB3ZSBkdXBsaWNhdGUgdGhlIGZpbGUgYW5kIHJlYWQgdGhhdCBpbnN0ZWFkXG4gICAgLy8gKHdpdGggdmZzIHVuaXggLSBub25lIHRvIGp1c3Qgbm90IGNhcmUgYWJvdXQgbG9ja3MpXG4gICAgbGV0IHdvcmthcm91bmRDb3BpZWREYjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmICghd29ya2Fyb3VuZENvcGllZERiKSB7XG4gICAgICBjb25zdCB0ZW1wRm9sZGVyID0gcGF0aC5qb2luKG9zLnRtcGRpcigpLCBcInVzZVNRTFwiLCBoYXNoKGRhdGFiYXNlUGF0aCkpO1xuICAgICAgYXdhaXQgbWtkaXIodGVtcEZvbGRlciwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gICAgICB3b3JrYXJvdW5kQ29waWVkRGIgPSBwYXRoLmpvaW4odGVtcEZvbGRlciwgXCJkYi5kYlwiKTtcbiAgICAgIGF3YWl0IGNvcHlGaWxlKGRhdGFiYXNlUGF0aCwgd29ya2Fyb3VuZENvcGllZERiKTtcblxuICAgICAgYXdhaXQgd3JpdGVGaWxlKHdvcmthcm91bmRDb3BpZWREYiArIFwiLXNobVwiLCBcIlwiKTtcbiAgICAgIGF3YWl0IHdyaXRlRmlsZSh3b3JrYXJvdW5kQ29waWVkRGIgKyBcIi13YWxcIiwgXCJcIik7XG5cbiAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG4gICAgfVxuXG4gICAgc3Bhd25lZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bihcInNxbGl0ZTNcIiwgW1wiLS1qc29uXCIsIFwiLS1yZWFkb25seVwiLCBcIi0tdmZzXCIsIFwidW5peC1ub25lXCIsIHdvcmthcm91bmRDb3BpZWREYiwgcXVlcnldLCB7XG4gICAgICBzaWduYWw6IGFib3J0U2lnbmFsLFxuICAgIH0pO1xuICAgIHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCk7XG4gICAgW3sgZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwgfSwgc3Rkb3V0UmVzdWx0LCBzdGRlcnJSZXN1bHRdID0gYXdhaXQgZ2V0U3Bhd25lZFJlc3VsdDxzdHJpbmc+KFxuICAgICAgc3Bhd25lZCxcbiAgICAgIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9LFxuICAgICAgc3Bhd25lZFByb21pc2UsXG4gICAgKTtcbiAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuICB9XG5cbiAgaWYgKGVycm9yIHx8IGV4aXRDb2RlICE9PSAwIHx8IHNpZ25hbCAhPT0gbnVsbCkge1xuICAgIGlmIChzdGRlcnJSZXN1bHQuaW5jbHVkZXMoXCJhdXRob3JpemF0aW9uIGRlbmllZFwiKSkge1xuICAgICAgdGhyb3cgbmV3IFBlcm1pc3Npb25FcnJvcihcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGUgZGF0YWJhc2UuXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Ioc3RkZXJyUmVzdWx0IHx8IFwiVW5rbm93biBlcnJvclwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gSlNPTi5wYXJzZShzdGRvdXRSZXN1bHQudHJpbSgpIHx8IFwiW11cIikgYXMgVFtdO1xufVxuXG5mdW5jdGlvbiBjaGVja0Fib3J0ZWQoc2lnbmFsPzogQWJvcnRTaWduYWwpIHtcbiAgaWYgKHNpZ25hbD8uYWJvcnRlZCkge1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwiYWJvcnRlZFwiKTtcbiAgICBlcnJvci5uYW1lID0gXCJBYm9ydEVycm9yXCI7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBGb3JtIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcblxuLyoqXG4gKiBTaG9ydGhhbmRzIGZvciBjb21tb24gdmFsaWRhdGlvbiBjYXNlc1xuICovXG5leHBvcnQgZW51bSBGb3JtVmFsaWRhdGlvbiB7XG4gIC8qKiBTaG93IGFuIGVycm9yIHdoZW4gdGhlIHZhbHVlIG9mIHRoZSBpdGVtIGlzIGVtcHR5ICovXG4gIFJlcXVpcmVkID0gXCJyZXF1aXJlZFwiLFxufVxuXG50eXBlIFZhbGlkYXRpb25FcnJvciA9IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG50eXBlIFZhbGlkYXRvcjxWYWx1ZVR5cGU+ID0gKCh2YWx1ZTogVmFsdWVUeXBlIHwgdW5kZWZpbmVkKSA9PiBWYWxpZGF0aW9uRXJyb3IpIHwgRm9ybVZhbGlkYXRpb247XG5cbmZ1bmN0aW9uIHZhbGlkYXRpb25FcnJvcjxWYWx1ZVR5cGU+KFxuICB2YWxpZGF0aW9uOiBWYWxpZGF0b3I8VmFsdWVUeXBlPiB8IHVuZGVmaW5lZCxcbiAgdmFsdWU6IFZhbHVlVHlwZSB8IHVuZGVmaW5lZCxcbik6IFZhbGlkYXRpb25FcnJvciB7XG4gIGlmICh2YWxpZGF0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiB2YWxpZGF0aW9uKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb24gPT09IEZvcm1WYWxpZGF0aW9uLlJlcXVpcmVkKSB7XG4gICAgICBsZXQgdmFsdWVJc1ZhbGlkID0gdHlwZW9mIHZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIHZhbHVlICE9PSBudWxsO1xuICAgICAgaWYgKHZhbHVlSXNWYWxpZCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgICAgICAgIHZhbHVlSXNWYWxpZCA9IHZhbHVlLmxlbmd0aCA+IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgdmFsdWVJc1ZhbGlkID0gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgICAgIHZhbHVlSXNWYWxpZCA9IHZhbHVlLmdldFRpbWUoKSA+IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghdmFsdWVJc1ZhbGlkKSB7XG4gICAgICAgIHJldHVybiBcIlRoZSBpdGVtIGlzIHJlcXVpcmVkXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnR5cGUgVmFsaWRhdGlvbjxUIGV4dGVuZHMgRm9ybS5WYWx1ZXM+ID0geyBbaWQgaW4ga2V5b2YgVF0/OiBWYWxpZGF0b3I8VFtpZF0+IH07XG5cbmludGVyZmFjZSBGb3JtUHJvcHM8VCBleHRlbmRzIEZvcm0uVmFsdWVzPiB7XG4gIC8qKiBGdW5jdGlvbiB0byBwYXNzIHRvIHRoZSBgb25TdWJtaXRgIHByb3Agb2YgdGhlIGA8QWN0aW9uLlN1Ym1pdEZvcm0+YCBlbGVtZW50LiBJdCB3cmFwcyB0aGUgaW5pdGlhbCBgb25TdWJtaXRgIGFyZ3VtZW50IHdpdGggc29tZSBnb29kaWVzIHJlbGF0ZWQgdG8gdGhlIHZhbGlkYXRpb24uICovXG4gIGhhbmRsZVN1Ym1pdDogKHZhbHVlczogVCkgPT4gdm9pZCB8IGJvb2xlYW4gfCBQcm9taXNlPHZvaWQgfCBib29sZWFuPjtcbiAgLyoqIFRoZSBwcm9wcyB0aGF0IG11c3QgYmUgcGFzc2VkIHRvIHRoZSBgPEZvcm0uSXRlbT5gIGVsZW1lbnRzIHRvIGhhbmRsZSB0aGUgdmFsaWRhdGlvbnMuICovXG4gIGl0ZW1Qcm9wczoge1xuICAgIFtpZCBpbiBrZXlvZiBSZXF1aXJlZDxUPl06IFBhcnRpYWw8Rm9ybS5JdGVtUHJvcHM8VFtpZF0+PiAmIHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBzZXQgdGhlIHZhbGlkYXRpb24gb2YgYSBzcGVjaWZpYyBmaWVsZC4gKi9cbiAgc2V0VmFsaWRhdGlvbkVycm9yOiAoaWQ6IGtleW9mIFQsIGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IHZvaWQ7XG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgc2V0IHRoZSB2YWx1ZSBvZiBhIHNwZWNpZmljIGZpZWxkLiAqL1xuICBzZXRWYWx1ZTogPEsgZXh0ZW5kcyBrZXlvZiBUPihpZDogSywgdmFsdWU6IFNldFN0YXRlQWN0aW9uPFRbS10+KSA9PiB2b2lkO1xuICAvKiogVGhlIGN1cnJlbnQgdmFsdWVzIG9mIHRoZSBmb3JtLiAqL1xuICB2YWx1ZXM6IFQ7XG4gIC8qKiBGdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkIHRvIHByb2dyYW1tYXRpY2FsbHkgZm9jdXMgYSBzcGVjaWZpYyBmaWVsZC4gKi9cbiAgZm9jdXM6IChpZDoga2V5b2YgVCkgPT4gdm9pZDtcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQgdGhlIHZhbHVlcyBvZiB0aGUgRm9ybS4gKi9cbiAgcmVzZXQ6IChpbml0aWFsVmFsdWVzPzogUGFydGlhbDxUPikgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBIb29rIHRoYXQgcHJvdmlkZXMgYSBoaWdoLWxldmVsIGludGVyZmFjZSB0byB3b3JrIHdpdGggRm9ybXMsIGFuZCBtb3JlIHBhcnRpY3VsYXJseSwgd2l0aCBGb3JtIHZhbGlkYXRpb25zLiBJdCBpbmNvcnBvcmF0ZXMgYWxsIHRoZSBnb29kIHByYWN0aWNlcyB0byBwcm92aWRlIGEgZ3JlYXQgVXNlciBFeHBlcmllbmNlIGZvciB5b3VyIEZvcm1zLlxuICpcbiAqIEByZXR1cm5zIGFuIG9iamVjdCB3aGljaCBjb250YWlucyB0aGUgbmVjZXNzYXJ5IG1ldGhvZHMgYW5kIHByb3BzIHRvIHByb3ZpZGUgYSBnb29kIFVzZXIgRXhwZXJpZW5jZSBpbiB5b3VyIEZvcm0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25QYW5lbCwgRm9ybSwgc2hvd1RvYXN0LCBUb2FzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZUZvcm0sIEZvcm1WYWxpZGF0aW9uIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogaW50ZXJmYWNlIFNpZ25VcEZvcm1WYWx1ZXMge1xuICogICBuaWNrbmFtZTogc3RyaW5nO1xuICogICBwYXNzd29yZDogc3RyaW5nO1xuICogfVxuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHsgaGFuZGxlU3VibWl0LCBpdGVtUHJvcHMgfSA9IHVzZUZvcm08U2lnblVwRm9ybVZhbHVlcz4oe1xuICogICAgIG9uU3VibWl0KHZhbHVlcykge1xuICogICAgICAgc2hvd1RvYXN0KFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIFwiWWF5IVwiLCBgJHt2YWx1ZXMubmlja25hbWV9IGFjY291bnQgY3JlYXRlZGApO1xuICogICAgIH0sXG4gKiAgICAgdmFsaWRhdGlvbjoge1xuICogICAgICAgbmlja25hbWU6IEZvcm1WYWxpZGF0aW9uLlJlcXVpcmVkLFxuICogICAgICAgcGFzc3dvcmQ6ICh2YWx1ZSkgPT4ge1xuICogICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoIDwgOCkge1xuICogICAgICAgICAgIHJldHVybiBcIlBhc3N3b3JkIG11c3QgYmUgYXQgbGVhc3QgOCBzeW1ib2xzXCI7XG4gKiAgICAgICAgIH0gZWxzZSBpZiAoIXZhbHVlKSB7XG4gKiAgICAgICAgICAgcmV0dXJuIFwiVGhlIGl0ZW0gaXMgcmVxdWlyZWRcIjtcbiAqICAgICAgICAgfVxuICogICAgICAgfSxcbiAqICAgICB9LFxuICogICB9KTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPEZvcm1cbiAqICAgICAgIGFjdGlvbnM9e1xuICogICAgICAgICA8QWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgPEFjdGlvbi5TdWJtaXRGb3JtIHRpdGxlPVwiU3VibWl0XCIgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gLz5cbiAqICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAqICAgICAgIH1cbiAqICAgICA+XG4gKiAgICAgICA8Rm9ybS5UZXh0RmllbGQgdGl0bGU9XCJOaWNrbmFtZVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBuaWNrbmFtZVwiIHsuLi5pdGVtUHJvcHMubmlja25hbWV9IC8+XG4gKiAgICAgICA8Rm9ybS5QYXNzd29yZEZpZWxkXG4gKiAgICAgICAgIHRpdGxlPVwiUGFzc3dvcmRcIlxuICogICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHBhc3N3b3JkIGF0IGxlYXN0IDggY2hhcmFjdGVycyBsb25nXCJcbiAqICAgICAgICAgey4uLml0ZW1Qcm9wcy5wYXNzd29yZH1cbiAqICAgICAgIC8+XG4gKiAgICAgPC9Gb3JtPlxuICogICApO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtPFQgZXh0ZW5kcyBGb3JtLlZhbHVlcz4ocHJvcHM6IHtcbiAgLyoqIENhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgZm9ybSBpcyBzdWJtaXR0ZWQgYW5kIGFsbCB2YWxpZGF0aW9ucyBwYXNzLiAqL1xuICBvblN1Ym1pdDogKHZhbHVlczogVCkgPT4gdm9pZCB8IGJvb2xlYW4gfCBQcm9taXNlPHZvaWQgfCBib29sZWFuPjtcbiAgLyoqIFRoZSBpbml0aWFsIHZhbHVlcyB0byBzZXQgd2hlbiB0aGUgRm9ybSBpcyBmaXJzdCByZW5kZXJlZC4gKi9cbiAgaW5pdGlhbFZhbHVlcz86IFBhcnRpYWw8VD47XG4gIC8qKiBUaGUgdmFsaWRhdGlvbiBydWxlcyBmb3IgdGhlIEZvcm0uIEEgdmFsaWRhdGlvbiBmb3IgYSBGb3JtIGl0ZW0gaXMgYSBmdW5jdGlvbiB0aGF0IHRha2VzIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoZSBpdGVtIGFzIGFuIGFyZ3VtZW50IGFuZCBtdXN0IHJldHVybiBhIHN0cmluZyB3aGVuIHRoZSB2YWxpZGF0aW9uIGlzIGZhaWxpbmcuXG4gICAqXG4gICAqIFRoZXJlIGFyZSBhbHNvIHNvbWUgc2hvcnRoYW5kcyBmb3IgY29tbW9uIGNhc2VzLCBzZWUge0BsaW5rIEZvcm1WYWxpZGF0aW9ufS5cbiAgICogKi9cbiAgdmFsaWRhdGlvbj86IFZhbGlkYXRpb248VD47XG59KTogRm9ybVByb3BzPFQ+IHtcbiAgY29uc3QgeyBvblN1Ym1pdDogX29uU3VibWl0LCB2YWxpZGF0aW9uLCBpbml0aWFsVmFsdWVzID0ge30gfSA9IHByb3BzO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgaXQncyBmaW5lIGlmIHdlIGRvbid0IHNwZWNpZnkgYWxsIHRoZSB2YWx1ZXNcbiAgY29uc3QgW3ZhbHVlcywgc2V0VmFsdWVzXSA9IHVzZVN0YXRlPFQ+KGluaXRpYWxWYWx1ZXMpO1xuICBjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGU8eyBbaWQgaW4ga2V5b2YgVF0/OiBWYWxpZGF0aW9uRXJyb3IgfT4oe30pO1xuICBjb25zdCByZWZzID0gdXNlUmVmPHsgW2lkIGluIGtleW9mIFRdPzogRm9ybS5JdGVtUmVmZXJlbmNlIH0+KHt9KTtcblxuICBjb25zdCBsYXRlc3RWYWxpZGF0aW9uID0gdXNlTGF0ZXN0PFZhbGlkYXRpb248VD4+KHZhbGlkYXRpb24gfHwge30pO1xuICBjb25zdCBsYXRlc3RPblN1Ym1pdCA9IHVzZUxhdGVzdChfb25TdWJtaXQpO1xuXG4gIGNvbnN0IGZvY3VzID0gdXNlQ2FsbGJhY2soXG4gICAgKGlkOiBrZXlvZiBUKSA9PiB7XG4gICAgICByZWZzLmN1cnJlbnRbaWRdPy5mb2N1cygpO1xuICAgIH0sXG4gICAgW3JlZnNdLFxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh2YWx1ZXM6IFQpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgIGxldCB2YWxpZGF0aW9uRXJyb3JzOiBmYWxzZSB8IHsgW2tleSBpbiBrZXlvZiBUXT86IFZhbGlkYXRpb25FcnJvciB9ID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IFtpZCwgdmFsaWRhdGlvbl0gb2YgT2JqZWN0LmVudHJpZXMobGF0ZXN0VmFsaWRhdGlvbi5jdXJyZW50KSkge1xuICAgICAgICBjb25zdCBlcnJvciA9IHZhbGlkYXRpb25FcnJvcih2YWxpZGF0aW9uLCB2YWx1ZXNbaWRdKTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgaWYgKCF2YWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzID0ge307XG4gICAgICAgICAgICAvLyB3ZSBmb2N1cyB0aGUgZmlyc3QgaXRlbSB0aGF0IGhhcyBhbiBlcnJvclxuICAgICAgICAgICAgZm9jdXMoaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzW2lkIGFzIGtleW9mIFRdID0gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgICAgIHNldEVycm9ycyh2YWxpZGF0aW9uRXJyb3JzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgbGF0ZXN0T25TdWJtaXQuY3VycmVudCh2YWx1ZXMpO1xuICAgICAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT09IFwiYm9vbGVhblwiID8gcmVzdWx0IDogdHJ1ZTtcbiAgICB9LFxuICAgIFtsYXRlc3RWYWxpZGF0aW9uLCBsYXRlc3RPblN1Ym1pdCwgZm9jdXNdLFxuICApO1xuXG4gIGNvbnN0IHNldFZhbGlkYXRpb25FcnJvciA9IHVzZUNhbGxiYWNrKFxuICAgIChpZDoga2V5b2YgVCwgZXJyb3I6IFZhbGlkYXRpb25FcnJvcikgPT4ge1xuICAgICAgc2V0RXJyb3JzKChlcnJvcnMpID0+ICh7IC4uLmVycm9ycywgW2lkXTogZXJyb3IgfSkpO1xuICAgIH0sXG4gICAgW3NldEVycm9yc10sXG4gICk7XG5cbiAgY29uc3Qgc2V0VmFsdWUgPSB1c2VDYWxsYmFjayhcbiAgICBmdW5jdGlvbiA8SyBleHRlbmRzIGtleW9mIFQ+KGlkOiBLLCB2YWx1ZTogU2V0U3RhdGVBY3Rpb248VFtLXT4pIHtcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgaXMgYWx3YXlzIGNvbmZ1c2VkIGFib3V0IFNldFN0YXRlQWN0aW9uLCBidXQgaXQncyBmaW5lIGhlcmVcbiAgICAgIHNldFZhbHVlcygodmFsdWVzKSA9PiAoeyAuLi52YWx1ZXMsIFtpZF06IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdmFsdWUodmFsdWVzW2lkXSkgOiB2YWx1ZSB9KSk7XG4gICAgfSxcbiAgICBbc2V0VmFsdWVzXSxcbiAgKTtcblxuICBjb25zdCBpdGVtUHJvcHMgPSB1c2VNZW1vPHsgW2lkIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogUGFydGlhbDxGb3JtLkl0ZW1Qcm9wczxUW2lkXT4+ICYgeyBpZDogc3RyaW5nIH0gfT4oKCkgPT4ge1xuICAgIC8vIHdlIGhhdmUgdG8gdXNlIGEgcHJveHkgYmVjYXVzZSB3ZSBkb24ndCBhY3R1YWxseSBoYXZlIGFueSBvYmplY3QgdG8gaXRlcmF0ZSB0aHJvdWdoXG4gICAgLy8gc28gaW5zdGVhZCB3ZSBkeW5hbWljYWxseSBjcmVhdGUgdGhlIHByb3BzIHdoZW4gcmVxdWlyZWRcbiAgICByZXR1cm4gbmV3IFByb3h5PHsgW2lkIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogUGFydGlhbDxGb3JtLkl0ZW1Qcm9wczxUW2lkXT4+ICYgeyBpZDogc3RyaW5nIH0gfT4oXG4gICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRoZSB3aG9sZSBwb2ludCBvZiBhIHByb3h5Li4uXG4gICAgICB7fSxcbiAgICAgIHtcbiAgICAgICAgZ2V0KHRhcmdldCwgaWQ6IGtleW9mIFQpIHtcbiAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gbGF0ZXN0VmFsaWRhdGlvbi5jdXJyZW50W2lkXTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpZF07XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvcnNbaWRdKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB2YWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIHNldFZhbGlkYXRpb25FcnJvcihpZCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2V0VmFsdWUoaWQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkJsdXIoZXZlbnQpIHtcbiAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSB2YWxpZGF0aW9uRXJyb3IodmFsaWRhdGlvbiwgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgc2V0VmFsaWRhdGlvbkVycm9yKGlkLCBlcnJvcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogZXJyb3JzW2lkXSxcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkbid0IHJldHVybiBgdW5kZWZpbmVkYCBvdGhlcndpc2UgaXQgd2lsbCBiZSBhbiB1bmNvbnRyb2xsZWQgY29tcG9uZW50XG4gICAgICAgICAgICB2YWx1ZTogdHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IHZhbHVlLFxuICAgICAgICAgICAgcmVmOiAoaW5zdGFuY2U6IEZvcm0uSXRlbVJlZmVyZW5jZSkgPT4ge1xuICAgICAgICAgICAgICByZWZzLmN1cnJlbnRbaWRdID0gaW5zdGFuY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0gYXMgUGFydGlhbDxGb3JtLkl0ZW1Qcm9wczxUW2tleW9mIFRdPj4gJiB7IGlkOiBzdHJpbmcgfTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgKTtcbiAgfSwgW2Vycm9ycywgbGF0ZXN0VmFsaWRhdGlvbiwgc2V0VmFsaWRhdGlvbkVycm9yLCB2YWx1ZXMsIHJlZnMsIHNldFZhbHVlXSk7XG5cbiAgY29uc3QgcmVzZXQgPSB1c2VDYWxsYmFjayhcbiAgICAodmFsdWVzPzogUGFydGlhbDxUPikgPT4ge1xuICAgICAgc2V0RXJyb3JzKHt9KTtcbiAgICAgIE9iamVjdC5lbnRyaWVzKHJlZnMuY3VycmVudCkuZm9yRWFjaCgoW2lkLCByZWZdKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWVzPy5baWRdKSB7XG4gICAgICAgICAgcmVmPy5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBpdCdzIGZpbmUgaWYgd2UgZG9uJ3Qgc3BlY2lmeSBhbGwgdGhlIHZhbHVlc1xuICAgICAgICBzZXRWYWx1ZXModmFsdWVzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZXRWYWx1ZXMsIHNldEVycm9ycywgcmVmc10sXG4gICk7XG5cbiAgcmV0dXJuIHsgaGFuZGxlU3VibWl0LCBzZXRWYWxpZGF0aW9uRXJyb3IsIHNldFZhbHVlLCB2YWx1ZXMsIGl0ZW1Qcm9wcywgZm9jdXMsIHJlc2V0IH07XG59XG4iLCAiaW1wb3J0IHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQUkgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBQcm9taXNlT3B0aW9ucywgdXNlUHJvbWlzZSB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcbmltcG9ydCB7IEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogU3RyZWFtIGEgcHJvbXB0IGNvbXBsZXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IERldGFpbCwgTGF1bmNoUHJvcHMgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2UgQUkgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKHByb3BzOiBMYXVuY2hQcm9wczx7IGFyZ3VtZW50czogeyBwcm9tcHQ6IHN0cmluZyB9IH0+KSB7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhIH0gPSB1c2VBSShwcm9wcy5hcmd1bWVudHMucHJvbXB0KTtcbiAqXG4gKiAgIHJldHVybiA8RGV0YWlsIGlzTG9hZGluZz17aXNMb2FkaW5nfSBtYXJrZG93bj17ZGF0YX0gLz47XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUFJKFxuICBwcm9tcHQ6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIC8qKlxuICAgICAqIENvbmNyZXRlIHRhc2tzLCBzdWNoIGFzIGZpeGluZyBncmFtbWFyLCByZXF1aXJlIGxlc3MgY3JlYXRpdml0eSB3aGlsZSBvcGVuLWVuZGVkIHF1ZXN0aW9ucywgc3VjaCBhcyBnZW5lcmF0aW5nIGlkZWFzLCByZXF1aXJlIG1vcmUuXG4gICAgICogSWYgYSBudW1iZXIgaXMgcGFzc2VkLCBpdCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2UgMC0yLiBGb3IgbGFyZ2VyIHZhbHVlcywgMiB3aWxsIGJlIHVzZWQuIEZvciBsb3dlciB2YWx1ZXMsIDAgd2lsbCBiZSB1c2VkLlxuICAgICAqL1xuICAgIGNyZWF0aXZpdHk/OiBBSS5DcmVhdGl2aXR5O1xuICAgIC8qKlxuICAgICAqIFRoZSBBSSBtb2RlbCB0byB1c2UgdG8gYW5zd2VyIHRvIHRoZSBwcm9tcHQuXG4gICAgICovXG4gICAgbW9kZWw/OiBBSS5Nb2RlbDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHN0cmVhbSB0aGUgYW5zd2VyIG9yIG9ubHkgdXBkYXRlIHRoZSBkYXRhIHdoZW4gdGhlIGVudGlyZSBhbnN3ZXIgaGFzIGJlZW4gcmVjZWl2ZWQuXG4gICAgICovXG4gICAgc3RyZWFtPzogYm9vbGVhbjtcbiAgfSAmIE9taXQ8UHJvbWlzZU9wdGlvbnM8RnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlPiwgXCJhYm9ydGFibGVcIj4gPSB7fSxcbikge1xuICBjb25zdCB7IGNyZWF0aXZpdHksIHN0cmVhbSwgbW9kZWwsIC4uLnVzZVByb21pc2VPcHRpb25zIH0gPSBvcHRpb25zO1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgYWJvcnRhYmxlID0gdXNlUmVmPEFib3J0Q29udHJvbGxlcj4obnVsbCk7XG4gIGNvbnN0IHsgaXNMb2FkaW5nLCBlcnJvciwgcmV2YWxpZGF0ZSB9ID0gdXNlUHJvbWlzZShcbiAgICBhc3luYyAocHJvbXB0OiBzdHJpbmcsIGNyZWF0aXZpdHk/OiBBSS5DcmVhdGl2aXR5LCBzaG91bGRTdHJlYW0/OiBib29sZWFuKSA9PiB7XG4gICAgICBzZXREYXRhKFwiXCIpO1xuICAgICAgY29uc3Qgc3RyZWFtID0gQUkuYXNrKHByb21wdCwgeyBjcmVhdGl2aXR5LCBtb2RlbCwgc2lnbmFsOiBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsIH0pO1xuICAgICAgaWYgKHNob3VsZFN0cmVhbSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2V0RGF0YShhd2FpdCBzdHJlYW0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyZWFtLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xuICAgICAgICAgIHNldERhdGEoKHgpID0+IHggKyBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHN0cmVhbTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtwcm9tcHQsIGNyZWF0aXZpdHksIHN0cmVhbV0sXG4gICAgeyAuLi51c2VQcm9taXNlT3B0aW9ucywgYWJvcnRhYmxlIH0sXG4gICk7XG5cbiAgcmV0dXJuIHsgaXNMb2FkaW5nLCBkYXRhLCBlcnJvciwgcmV2YWxpZGF0ZSB9O1xufVxuIiwgImltcG9ydCB7IHVzZU1lbW8sIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IHVzZUNhY2hlZFN0YXRlIH0gZnJvbSBcIi4vdXNlQ2FjaGVkU3RhdGVcIjtcblxuLy8gVGhlIGFsZ29yaXRobSBiZWxvdyBpcyBpbnNwaXJlZCBieSB0aGUgb25lIHVzZWQgYnkgRmlyZWZveDpcbi8vIGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9Vc2VyOkplc3NlL05ld0ZyZWNlbmN5XG5cbnR5cGUgRnJlY2VuY3kgPSB7XG4gIGxhc3RWaXNpdGVkOiBudW1iZXI7XG4gIGZyZWNlbmN5OiBudW1iZXI7XG59O1xuXG5jb25zdCBIQUxGX0xJRkVfREFZUyA9IDEwO1xuXG5jb25zdCBNU19QRVJfREFZID0gMjQgKiA2MCAqIDYwICogMTAwMDtcblxuY29uc3QgVklTSVRfVFlQRV9QT0lOVFMgPSB7XG4gIERlZmF1bHQ6IDEwMCxcbiAgRW1iZWQ6IDAsXG4gIEJvb2ttYXJrOiAxNDAsXG59O1xuXG5mdW5jdGlvbiBnZXROZXdGcmVjZW5jeShpdGVtPzogRnJlY2VuY3kpOiBGcmVjZW5jeSB7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGNvbnN0IGxhc3RWaXNpdGVkID0gaXRlbSA/IGl0ZW0ubGFzdFZpc2l0ZWQgOiAwO1xuICBjb25zdCBmcmVjZW5jeSA9IGl0ZW0gPyBpdGVtLmZyZWNlbmN5IDogMDtcblxuICBjb25zdCB2aXNpdEFnZUluRGF5cyA9IChub3cgLSBsYXN0VmlzaXRlZCkgLyBNU19QRVJfREFZO1xuICBjb25zdCBERUNBWV9SQVRFX0NPTlNUQU5UID0gTWF0aC5sb2coMikgLyAoSEFMRl9MSUZFX0RBWVMgKiBNU19QRVJfREFZKTtcbiAgY29uc3QgY3VycmVudFZpc2l0VmFsdWUgPSBWSVNJVF9UWVBFX1BPSU5UUy5EZWZhdWx0ICogTWF0aC5leHAoLURFQ0FZX1JBVEVfQ09OU1RBTlQgKiB2aXNpdEFnZUluRGF5cyk7XG4gIGNvbnN0IHRvdGFsVmlzaXRWYWx1ZSA9IGZyZWNlbmN5ICsgY3VycmVudFZpc2l0VmFsdWU7XG5cbiAgcmV0dXJuIHtcbiAgICBsYXN0VmlzaXRlZDogbm93LFxuICAgIGZyZWNlbmN5OiB0b3RhbFZpc2l0VmFsdWUsXG4gIH07XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5jb25zdCBkZWZhdWx0S2V5ID0gKGl0ZW06IGFueSk6IHN0cmluZyA9PiB7XG4gIGlmIChcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAodHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIgfHwgIWl0ZW0gfHwgIShcImlkXCIgaW4gaXRlbSkgfHwgdHlwZW9mIGl0ZW0uaWQgIT0gXCJzdHJpbmdcIilcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3BlY2lmeSBhIGtleSBmdW5jdGlvbiBvciBtYWtlIHN1cmUgeW91ciBpdGVtcyBoYXZlIGFuICdpZCcgcHJvcGVydHlcIik7XG4gIH1cbiAgcmV0dXJuIGl0ZW0uaWQ7XG59O1xuXG4vKipcbiAqIFNvcnQgYW4gYXJyYXkgYnkgaXRzIGZyZWNlbmN5IGFuZCBwcm92aWRlIG1ldGhvZHMgdG8gdXBkYXRlIHRoZSBmcmVjZW5jeSBvZiBpdHMgaXRlbXMuXG4gKiBGcmVjZW5jeSBpcyBhIG1lYXN1cmUgdGhhdCBjb21iaW5lcyBmcmVxdWVuY3kgYW5kIHJlY2VuY3kuIFRoZSBtb3JlIG9mdGVuIGFuIGl0ZW0gaXMgdmlzaXRlZC91c2VkLCBhbmQgdGhlIG1vcmUgcmVjZW50bHkgYW4gaXRlbSBpcyB2aXNpdGVkL3VzZWQsIHRoZSBoaWdoZXIgaXQgd2lsbCByYW5rLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IExpc3QsIEFjdGlvblBhbmVsLCBBY3Rpb24sIEljb24gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VGZXRjaCwgdXNlRnJlY2VuY3lTb3J0aW5nIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEgfSA9IHVzZUZldGNoKFwiaHR0cHM6Ly9hcGkuZXhhbXBsZVwiKTtcbiAqICAgY29uc3QgeyBkYXRhOiBzb3J0ZWREYXRhLCB2aXNpdEl0ZW0sIHJlc2V0UmFua2luZyB9ID0gdXNlRnJlY2VuY3lTb3J0aW5nKGRhdGEpO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30+XG4gKiAgICAgICB7c29ydGVkRGF0YS5tYXAoKGl0ZW0pID0+IChcbiAqICAgICAgICAgPExpc3QuSXRlbVxuICogICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAqICAgICAgICAgICB0aXRsZT17aXRlbS50aXRsZX1cbiAqICAgICAgICAgICBhY3Rpb25zPXtcbiAqICAgICAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICAgICAgPEFjdGlvbi5PcGVuSW5Ccm93c2VyIHVybD17aXRlbS51cmx9IG9uT3Blbj17KCkgPT4gdmlzaXRJdGVtKGl0ZW0pfSAvPlxuICogICAgICAgICAgICAgICA8QWN0aW9uLkNvcHlUb0NsaXBib2FyZCB0aXRsZT1cIkNvcHkgTGlua1wiIGNvbnRlbnQ9e2l0ZW0udXJsfSBvbkNvcHk9eygpID0+IHZpc2l0SXRlbShpdGVtKX0gLz5cbiAqICAgICAgICAgICAgICAgPEFjdGlvbiB0aXRsZT1cIlJlc2V0IFJhbmtpbmdcIiBpY29uPXtJY29uLkFycm93Q291bnRlckNsb2Nrd2lzZX0gb25BY3Rpb249eygpID0+IHJlc2V0UmFua2luZyhpdGVtKX0gLz5cbiAqICAgICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgfVxuICogICAgICAgICAvPlxuICogICAgICAgKSl9XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRnJlY2VuY3lTb3J0aW5nPFQgZXh0ZW5kcyB7IGlkOiBzdHJpbmcgfT4oXG4gIGRhdGE/OiBUW10sXG4gIG9wdGlvbnM/OiB7IG5hbWVzcGFjZT86IHN0cmluZzsga2V5PzogKGl0ZW06IFQpID0+IHN0cmluZzsgc29ydFVudmlzaXRlZD86IChhOiBULCBiOiBUKSA9PiBudW1iZXIgfSxcbik6IHtcbiAgZGF0YTogVFtdO1xuICB2aXNpdEl0ZW06IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZXNldFJhbmtpbmc6IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VGcmVjZW5jeVNvcnRpbmc8VD4oXG4gIGRhdGE6IFRbXSB8IHVuZGVmaW5lZCxcbiAgb3B0aW9uczogeyBuYW1lc3BhY2U/OiBzdHJpbmc7IGtleTogKGl0ZW06IFQpID0+IHN0cmluZzsgc29ydFVudmlzaXRlZD86IChhOiBULCBiOiBUKSA9PiBudW1iZXIgfSxcbik6IHtcbiAgZGF0YTogVFtdO1xuICB2aXNpdEl0ZW06IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZXNldFJhbmtpbmc6IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xufTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VGcmVjZW5jeVNvcnRpbmc8VD4oXG4gIGRhdGE/OiBUW10sXG4gIG9wdGlvbnM/OiB7IG5hbWVzcGFjZT86IHN0cmluZzsga2V5PzogKGl0ZW06IFQpID0+IHN0cmluZzsgc29ydFVudmlzaXRlZD86IChhOiBULCBiOiBUKSA9PiBudW1iZXIgfSxcbik6IHtcbiAgZGF0YTogVFtdO1xuICB2aXNpdEl0ZW06IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZXNldFJhbmtpbmc6IChpdGVtOiBUKSA9PiBQcm9taXNlPHZvaWQ+O1xufSB7XG4gIGNvbnN0IGtleVJlZiA9IHVzZUxhdGVzdChvcHRpb25zPy5rZXkgfHwgZGVmYXVsdEtleSk7XG4gIGNvbnN0IHNvcnRVbnZpc2l0ZWRSZWYgPSB1c2VMYXRlc3Qob3B0aW9ucz8uc29ydFVudmlzaXRlZCk7XG5cbiAgY29uc3QgW3N0b3JlZEZyZWNlbmNpZXMsIHNldFN0b3JlZEZyZWNlbmNpZXNdID0gdXNlQ2FjaGVkU3RhdGU8UmVjb3JkPHN0cmluZywgRnJlY2VuY3kgfCB1bmRlZmluZWQ+PihcbiAgICBgcmF5Y2FzdF9mcmVjZW5jeV8ke29wdGlvbnM/Lm5hbWVzcGFjZX1gLFxuICAgIHt9LFxuICApO1xuXG4gIGNvbnN0IHZpc2l0SXRlbSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUZyZWNlbmN5KGl0ZW06IFQpIHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlSZWYuY3VycmVudChpdGVtKTtcblxuICAgICAgc2V0U3RvcmVkRnJlY2VuY2llcygoc3RvcmVkRnJlY2VuY2llcykgPT4ge1xuICAgICAgICBjb25zdCBmcmVjZW5jeSA9IHN0b3JlZEZyZWNlbmNpZXNbaXRlbUtleV07XG4gICAgICAgIGNvbnN0IG5ld0ZyZWNlbmN5ID0gZ2V0TmV3RnJlY2VuY3koZnJlY2VuY3kpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RvcmVkRnJlY2VuY2llcyxcbiAgICAgICAgICBbaXRlbUtleV06IG5ld0ZyZWNlbmN5LFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBba2V5UmVmLCBzZXRTdG9yZWRGcmVjZW5jaWVzXSxcbiAgKTtcblxuICBjb25zdCByZXNldFJhbmtpbmcgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyBmdW5jdGlvbiByZW1vdmVGcmVjZW5jeShpdGVtOiBUKSB7XG4gICAgICBjb25zdCBpdGVtS2V5ID0ga2V5UmVmLmN1cnJlbnQoaXRlbSk7XG5cbiAgICAgIHNldFN0b3JlZEZyZWNlbmNpZXMoKHN0b3JlZEZyZWNlbmNpZXMpID0+IHtcbiAgICAgICAgY29uc3QgbmV3RnJlbmNlbmNpZXMgPSB7IC4uLnN0b3JlZEZyZWNlbmNpZXMgfTtcbiAgICAgICAgZGVsZXRlIG5ld0ZyZW5jZW5jaWVzW2l0ZW1LZXldO1xuXG4gICAgICAgIHJldHVybiBuZXdGcmVuY2VuY2llcztcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2tleVJlZiwgc2V0U3RvcmVkRnJlY2VuY2llc10sXG4gICk7XG5cbiAgY29uc3Qgc29ydGVkRGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IGZyZWNlbmN5QSA9IHN0b3JlZEZyZWNlbmNpZXNba2V5UmVmLmN1cnJlbnQoYSldO1xuICAgICAgY29uc3QgZnJlY2VuY3lCID0gc3RvcmVkRnJlY2VuY2llc1trZXlSZWYuY3VycmVudChiKV07XG5cbiAgICAgIC8vIElmIGEgaGFzIGEgZnJlY2VuY3ksIGJ1dCBiIGRvZXNuJ3QsIGEgc2hvdWxkIGNvbWUgZmlyc3RcbiAgICAgIGlmIChmcmVjZW5jeUEgJiYgIWZyZWNlbmN5Qikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGIgaGFzIGEgZnJlY2VuY3ksIGJ1dCBhIGRvZXNuJ3QsIGIgc2hvdWxkIGNvbWUgZmlyc3RcbiAgICAgIGlmICghZnJlY2VuY3lBICYmIGZyZWNlbmN5Qikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYm90aCBmcmVjZW5jaWVzIGFyZSBkZWZpbmVkLHB1dCB0aGUgb25lIHdpdGggdGhlIGhpZ2hlciBmcmVjZW5jeSBmaXJzdFxuICAgICAgaWYgKGZyZWNlbmN5QSAmJiBmcmVjZW5jeUIpIHtcbiAgICAgICAgcmV0dXJuIGZyZWNlbmN5Qi5mcmVjZW5jeSAtIGZyZWNlbmN5QS5mcmVjZW5jeTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYm90aCBmcmVjZW5jaWVzIGFyZSB1bmRlZmluZWQsIGtlZXAgdGhlIG9yaWdpbmFsIG9yZGVyXG4gICAgICByZXR1cm4gc29ydFVudmlzaXRlZFJlZi5jdXJyZW50ID8gc29ydFVudmlzaXRlZFJlZi5jdXJyZW50KGEsIGIpIDogMDtcbiAgICB9KTtcbiAgfSwgW3N0b3JlZEZyZWNlbmNpZXMsIGRhdGEsIGtleVJlZiwgc29ydFVudmlzaXRlZFJlZl0pO1xuXG4gIHJldHVybiB7IGRhdGE6IHNvcnRlZERhdGEsIHZpc2l0SXRlbSwgcmVzZXRSYW5raW5nIH07XG59XG4iLCAiaW1wb3J0IHsgTG9jYWxTdG9yYWdlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgc2hvd0ZhaWx1cmVUb2FzdCB9IGZyb20gXCIuL3Nob3dGYWlsdXJlVG9hc3RcIjtcbmltcG9ydCB7IHJlcGxhY2VyLCByZXZpdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgdXNlUHJvbWlzZSB9IGZyb20gXCIuL3VzZVByb21pc2VcIjtcblxuLyoqXG4gKiBBIGhvb2sgdG8gbWFuYWdlIGEgdmFsdWUgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKlxuICogQHJlbWFyayBUaGUgdmFsdWUgaXMgc3RvcmVkIGFzIGEgSlNPTiBzdHJpbmcgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKlxuICogQHBhcmFtIGtleSAtIFRoZSBrZXkgdG8gdXNlIGZvciB0aGUgdmFsdWUgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gVGhlIGluaXRpYWwgdmFsdWUgdG8gdXNlIGlmIHRoZSBrZXkgZG9lc24ndCBleGlzdCBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAqIC0gYHZhbHVlYDogVGhlIHZhbHVlIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2Ugb3IgdGhlIGluaXRpYWwgdmFsdWUgaWYgdGhlIGtleSBkb2Vzbid0IGV4aXN0LlxuICogLSBgc2V0VmFsdWVgOiBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmFsdWUgaW4gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKiAtIGByZW1vdmVWYWx1ZWA6IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSB2YWx1ZSBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlLlxuICogLSBgaXNMb2FkaW5nYDogQSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHZhbHVlIGlzIGxvYWRpbmcuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUgfSA9IHVzZUxvY2FsU3RvcmFnZTxzdHJpbmc+KFwibXkta2V5XCIpO1xuICogY29uc3QgeyB2YWx1ZSwgc2V0VmFsdWUgfSA9IHVzZUxvY2FsU3RvcmFnZTxzdHJpbmc+KFwibXkta2V5XCIsIFwiZGVmYXVsdCB2YWx1ZVwiKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9jYWxTdG9yYWdlPFQ+KGtleTogc3RyaW5nLCBpbml0aWFsVmFsdWU/OiBUKSB7XG4gIGNvbnN0IHtcbiAgICBkYXRhOiB2YWx1ZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgbXV0YXRlLFxuICB9ID0gdXNlUHJvbWlzZShcbiAgICBhc3luYyAoc3RvcmFnZUtleTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gYXdhaXQgTG9jYWxTdG9yYWdlLmdldEl0ZW08c3RyaW5nPihzdG9yYWdlS2V5KTtcblxuICAgICAgcmV0dXJuIHR5cGVvZiBpdGVtICE9PSBcInVuZGVmaW5lZFwiID8gKEpTT04ucGFyc2UoaXRlbSwgcmV2aXZlcikgYXMgVCkgOiBpbml0aWFsVmFsdWU7XG4gICAgfSxcbiAgICBba2V5XSxcbiAgKTtcblxuICBhc3luYyBmdW5jdGlvbiBzZXRWYWx1ZSh2YWx1ZTogVCkge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBtdXRhdGUoTG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgcmVwbGFjZXIpKSwge1xuICAgICAgICBvcHRpbWlzdGljVXBkYXRlKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHsgdGl0bGU6IFwiRmFpbGVkIHRvIHNldCB2YWx1ZSBpbiBsb2NhbCBzdG9yYWdlXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gcmVtb3ZlVmFsdWUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG11dGF0ZShMb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpLCB7XG4gICAgICAgIG9wdGltaXN0aWNVcGRhdGUoKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBhd2FpdCBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7IHRpdGxlOiBcIkZhaWxlZCB0byByZW1vdmUgdmFsdWUgZnJvbSBsb2NhbCBzdG9yYWdlXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgdmFsdWUsIHNldFZhbHVlLCByZW1vdmVWYWx1ZSwgaXNMb2FkaW5nIH07XG59XG4iLCAiZXhwb3J0IHsgZ2V0QXZhdGFySWNvbiB9IGZyb20gXCIuL2F2YXRhclwiO1xuZXhwb3J0IHsgZ2V0RmF2aWNvbiB9IGZyb20gXCIuL2Zhdmljb25cIjtcbmV4cG9ydCB7IGdldFByb2dyZXNzSWNvbiB9IGZyb20gXCIuL3Byb2dyZXNzXCI7XG4iLCAiaW1wb3J0IHR5cGUgeyBJbWFnZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IHNsaWdodGx5TGlnaHRlckNvbG9yLCBzbGlnaHRseURhcmtlckNvbG9yIH0gZnJvbSBcIi4vY29sb3JcIjtcblxuZnVuY3Rpb24gZ2V0V2hvbGVDaGFyQW5kSShzdHI6IHN0cmluZywgaTogbnVtYmVyKTogW3N0cmluZywgbnVtYmVyXSB7XG4gIGNvbnN0IGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcblxuICBpZiAoTnVtYmVyLmlzTmFOKGNvZGUpKSB7XG4gICAgcmV0dXJuIFtcIlwiLCBpXTtcbiAgfVxuICBpZiAoY29kZSA8IDB4ZDgwMCB8fCBjb2RlID4gMHhkZmZmKSB7XG4gICAgcmV0dXJuIFtzdHIuY2hhckF0KGkpLCBpXTsgLy8gTm9ybWFsIGNoYXJhY3Rlciwga2VlcGluZyAnaScgdGhlIHNhbWVcbiAgfVxuXG4gIC8vIEhpZ2ggc3Vycm9nYXRlIChjb3VsZCBjaGFuZ2UgbGFzdCBoZXggdG8gMHhEQjdGIHRvIHRyZWF0IGhpZ2ggcHJpdmF0ZVxuICAvLyBzdXJyb2dhdGVzIGFzIHNpbmdsZSBjaGFyYWN0ZXJzKVxuICBpZiAoMHhkODAwIDw9IGNvZGUgJiYgY29kZSA8PSAweGRiZmYpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA8PSBpICsgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGlnaCBzdXJyb2dhdGUgd2l0aG91dCBmb2xsb3dpbmcgbG93IHN1cnJvZ2F0ZVwiKTtcbiAgICB9XG4gICAgY29uc3QgbmV4dCA9IHN0ci5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICBpZiAoMHhkYzAwID4gbmV4dCB8fCBuZXh0ID4gMHhkZmZmKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIaWdoIHN1cnJvZ2F0ZSB3aXRob3V0IGZvbGxvd2luZyBsb3cgc3Vycm9nYXRlXCIpO1xuICAgIH1cbiAgICByZXR1cm4gW3N0ci5jaGFyQXQoaSkgKyBzdHIuY2hhckF0KGkgKyAxKSwgaSArIDFdO1xuICB9XG5cbiAgLy8gTG93IHN1cnJvZ2F0ZSAoMHhEQzAwIDw9IGNvZGUgJiYgY29kZSA8PSAweERGRkYpXG4gIGlmIChpID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTG93IHN1cnJvZ2F0ZSB3aXRob3V0IHByZWNlZGluZyBoaWdoIHN1cnJvZ2F0ZVwiKTtcbiAgfVxuXG4gIGNvbnN0IHByZXYgPSBzdHIuY2hhckNvZGVBdChpIC0gMSk7XG5cbiAgLy8gKGNvdWxkIGNoYW5nZSBsYXN0IGhleCB0byAweERCN0YgdG8gdHJlYXQgaGlnaCBwcml2YXRlIHN1cnJvZ2F0ZXNcbiAgLy8gYXMgc2luZ2xlIGNoYXJhY3RlcnMpXG4gIGlmICgweGQ4MDAgPiBwcmV2IHx8IHByZXYgPiAweGRiZmYpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb3cgc3Vycm9nYXRlIHdpdGhvdXQgcHJlY2VkaW5nIGhpZ2ggc3Vycm9nYXRlXCIpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBuZXh0IGNoYXJhY3RlciBpbnN0ZWFkIChhbmQgaW5jcmVtZW50KVxuICByZXR1cm4gW3N0ci5jaGFyQXQoaSArIDEpLCBpICsgMV07XG59XG5cbmNvbnN0IGF2YXRhckNvbG9yU2V0ID0gW1xuICBcIiNEQzgyOUFcIiwgLy8gUGlua1xuICBcIiNENjQ4NTRcIiwgLy8gUmVkXG4gIFwiI0Q0NzYwMFwiLCAvLyBZZWxsb3dPcmFuZ2VcbiAgXCIjRDM2Q0REXCIsIC8vIE1hZ2VudGFcbiAgXCIjNTJBOUU0XCIsIC8vIEFxdWFcbiAgXCIjNzg3MUU4XCIsIC8vIEluZGlnb1xuICBcIiM3MDkyMEZcIiwgLy8gWWVsbG93R3JlZW5cbiAgXCIjNDNCOTNBXCIsIC8vIEdyZWVuXG4gIFwiI0VCNkIzRVwiLCAvLyBPcmFuZ2VcbiAgXCIjMjZCNzk1XCIsIC8vIEJsdWVHcmVlblxuICBcIiNEODVBOUJcIiwgLy8gSG90UGlua1xuICBcIiNBMDY3RENcIiwgLy8gUHVycGxlXG4gIFwiI0JEOTUwMFwiLCAvLyBZZWxsb3dcbiAgXCIjNTM4NUQ5XCIsIC8vIEJsdWVcbl07XG5cbi8qKlxuICogSWNvbiB0byByZXByZXNlbnQgYW4gYXZhdGFyIHdoZW4geW91IGRvbid0IGhhdmUgb25lLiBUaGUgZ2VuZXJhdGVkIGF2YXRhclxuICogd2lsbCBiZSBnZW5lcmF0ZWQgZnJvbSB0aGUgaW5pdGlhbHMgb2YgdGhlIG5hbWUgYW5kIGhhdmUgYSBjb2xvcmZ1bCBidXQgY29uc2lzdGVudCBiYWNrZ3JvdW5kLlxuICpcbiAqIEByZXR1cm5zIGFuIEltYWdlIHRoYXQgY2FuIGJlIHVzZWQgd2hlcmUgUmF5Y2FzdCBleHBlY3RzIHRoZW0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogPExpc3QuSXRlbSBpY29uPXtnZXRBdmF0YXJJY29uKCdNYXRoaWV1IER1dG91cicpfSB0aXRsZT1cIlByb2plY3RcIiAvPlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmF0YXJJY29uKFxuICBuYW1lOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiB7XG4gICAgLyoqXG4gICAgICogQ3VzdG9tIGJhY2tncm91bmQgY29sb3JcbiAgICAgKi9cbiAgICBiYWNrZ3JvdW5kPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gdXNlIGEgZ3JhZGllbnQgZm9yIHRoZSBiYWNrZ3JvdW5kIG9yIG5vdC5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZ3JhZGllbnQ/OiBib29sZWFuO1xuICB9LFxuKTogSW1hZ2UuQXNzZXQge1xuICBjb25zdCB3b3JkcyA9IG5hbWUudHJpbSgpLnNwbGl0KFwiIFwiKTtcbiAgbGV0IGluaXRpYWxzOiBzdHJpbmc7XG4gIGlmICh3b3Jkcy5sZW5ndGggPT0gMSAmJiBnZXRXaG9sZUNoYXJBbmRJKHdvcmRzWzBdLCAwKVswXSkge1xuICAgIGluaXRpYWxzID0gZ2V0V2hvbGVDaGFyQW5kSSh3b3Jkc1swXSwgMClbMF07XG4gIH0gZWxzZSBpZiAod29yZHMubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGZpcnN0V29yZEZpcnN0TGV0dGVyID0gZ2V0V2hvbGVDaGFyQW5kSSh3b3Jkc1swXSwgMClbMF0gfHwgXCJcIjtcbiAgICBjb25zdCBsYXN0V29yZEZpcnN0TGV0dGVyID0gZ2V0V2hvbGVDaGFyQW5kSSh3b3Jkc1t3b3Jkcy5sZW5ndGggLSAxXSwgMClbMF0gPz8gXCJcIjtcbiAgICBpbml0aWFscyA9IGZpcnN0V29yZEZpcnN0TGV0dGVyICsgbGFzdFdvcmRGaXJzdExldHRlcjtcbiAgfSBlbHNlIHtcbiAgICBpbml0aWFscyA9IFwiXCI7XG4gIH1cblxuICBsZXQgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG5cbiAgaWYgKG9wdGlvbnM/LmJhY2tncm91bmQpIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zPy5iYWNrZ3JvdW5kO1xuICB9IGVsc2Uge1xuICAgIGxldCBpbml0aWFsc0NoYXJJbmRleCA9IDA7XG4gICAgbGV0IFtjaGFyLCBpXSA9IGdldFdob2xlQ2hhckFuZEkoaW5pdGlhbHMsIDApO1xuICAgIHdoaWxlIChjaGFyKSB7XG4gICAgICBpbml0aWFsc0NoYXJJbmRleCArPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG4gICAgICBbY2hhciwgaV0gPSBnZXRXaG9sZUNoYXJBbmRJKGluaXRpYWxzLCBpICsgMSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29sb3JJbmRleCA9IGluaXRpYWxzQ2hhckluZGV4ICUgYXZhdGFyQ29sb3JTZXQubGVuZ3RoO1xuICAgIGJhY2tncm91bmRDb2xvciA9IGF2YXRhckNvbG9yU2V0W2NvbG9ySW5kZXhdO1xuICB9XG5cbiAgY29uc3QgcGFkZGluZyA9IDA7XG4gIGNvbnN0IHJhZGl1cyA9IDUwIC0gcGFkZGluZztcblxuICBjb25zdCBzdmcgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIxMDBweFwiIGhlaWdodD1cIjEwMHB4XCI+XG4gICR7XG4gICAgb3B0aW9ucz8uZ3JhZGllbnQgIT09IGZhbHNlXG4gICAgICA/IGA8ZGVmcz5cbiAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cIkdyYWRpZW50XCIgeDE9XCIwLjI1XCIgeDI9XCIwLjc1XCIgeTE9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcC1jb2xvcj1cIiR7c2xpZ2h0bHlMaWdodGVyQ29sb3IoYmFja2dyb3VuZENvbG9yKX1cIi8+XG4gICAgICAgIDxzdG9wIG9mZnNldD1cIjUwJVwiIHN0b3AtY29sb3I9XCIke2JhY2tncm91bmRDb2xvcn1cIi8+XG4gICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wLWNvbG9yPVwiJHtzbGlnaHRseURhcmtlckNvbG9yKGJhY2tncm91bmRDb2xvcil9XCIvPlxuICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgPC9kZWZzPmBcbiAgICAgIDogXCJcIlxuICB9XG4gICAgICA8Y2lyY2xlIGN4PVwiNTBcIiBjeT1cIjUwXCIgcj1cIiR7cmFkaXVzfVwiIGZpbGw9XCIke1xuICAgICAgICBvcHRpb25zPy5ncmFkaWVudCAhPT0gZmFsc2UgPyBcInVybCgjR3JhZGllbnQpXCIgOiBiYWNrZ3JvdW5kQ29sb3JcbiAgICAgIH1cIiAvPlxuICAgICAgJHtcbiAgICAgICAgaW5pdGlhbHNcbiAgICAgICAgICA/IGA8dGV4dCB4PVwiNTBcIiB5PVwiODBcIiBmb250LXNpemU9XCIke1xuICAgICAgICAgICAgICByYWRpdXMgLSAxXG4gICAgICAgICAgICB9XCIgZm9udC1mYW1pbHk9XCJJbnRlciwgc2Fucy1zZXJpZlwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgZmlsbD1cIndoaXRlXCI+JHtpbml0aWFscy50b1VwcGVyQ2FzZSgpfTwvdGV4dD5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9XG4gICAgPC9zdmc+XG4gIGAucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKTtcbiAgcmV0dXJuIGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoc3ZnKX1gO1xufVxuIiwgImZ1bmN0aW9uIGhleFRvUkdCKGhleDogc3RyaW5nKSB7XG4gIGxldCByID0gMDtcbiAgbGV0IGcgPSAwO1xuICBsZXQgYiA9IDA7XG5cbiAgLy8gMyBkaWdpdHNcbiAgaWYgKGhleC5sZW5ndGggPT09IDQpIHtcbiAgICByID0gcGFyc2VJbnQoYCR7aGV4WzFdfSR7aGV4WzFdfWAsIDE2KTtcbiAgICBnID0gcGFyc2VJbnQoYCR7aGV4WzJdfSR7aGV4WzJdfWAsIDE2KTtcbiAgICBiID0gcGFyc2VJbnQoYCR7aGV4WzNdfSR7aGV4WzNdfWAsIDE2KTtcblxuICAgIC8vIDYgZGlnaXRzXG4gIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PT0gNykge1xuICAgIHIgPSBwYXJzZUludChgJHtoZXhbMV19JHtoZXhbMl19YCwgMTYpO1xuICAgIGcgPSBwYXJzZUludChgJHtoZXhbM119JHtoZXhbNF19YCwgMTYpO1xuICAgIGIgPSBwYXJzZUludChgJHtoZXhbNV19JHtoZXhbNl19YCwgMTYpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgTWFsZm9ybWVkIGhleCBjb2xvcjogJHtoZXh9YCk7XG4gIH1cblxuICByZXR1cm4geyByLCBnLCBiIH07XG59XG5cbmZ1bmN0aW9uIHJnYlRvSGV4KHsgciwgZywgYiB9OiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfSkge1xuICBsZXQgclN0cmluZyA9IHIudG9TdHJpbmcoMTYpO1xuICBsZXQgZ1N0cmluZyA9IGcudG9TdHJpbmcoMTYpO1xuICBsZXQgYlN0cmluZyA9IGIudG9TdHJpbmcoMTYpO1xuXG4gIGlmIChyU3RyaW5nLmxlbmd0aCA9PT0gMSkge1xuICAgIHJTdHJpbmcgPSBgMCR7clN0cmluZ31gO1xuICB9XG4gIGlmIChnU3RyaW5nLmxlbmd0aCA9PT0gMSkge1xuICAgIGdTdHJpbmcgPSBgMCR7Z1N0cmluZ31gO1xuICB9XG4gIGlmIChiU3RyaW5nLmxlbmd0aCA9PT0gMSkge1xuICAgIGJTdHJpbmcgPSBgMCR7YlN0cmluZ31gO1xuICB9XG5cbiAgcmV0dXJuIGAjJHtyU3RyaW5nfSR7Z1N0cmluZ30ke2JTdHJpbmd9YDtcbn1cblxuZnVuY3Rpb24gcmdiVG9IU0woeyByLCBnLCBiIH06IHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9KSB7XG4gIC8vIE1ha2UgciwgZywgYW5kIGIgZnJhY3Rpb25zIG9mIDFcbiAgciAvPSAyNTU7XG4gIGcgLz0gMjU1O1xuICBiIC89IDI1NTtcblxuICAvLyBGaW5kIGdyZWF0ZXN0IGFuZCBzbWFsbGVzdCBjaGFubmVsIHZhbHVlc1xuICBjb25zdCBjbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gIGNvbnN0IGNtYXggPSBNYXRoLm1heChyLCBnLCBiKTtcbiAgY29uc3QgZGVsdGEgPSBjbWF4IC0gY21pbjtcbiAgbGV0IGggPSAwO1xuICBsZXQgcyA9IDA7XG4gIGxldCBsID0gMDtcblxuICAvLyBDYWxjdWxhdGUgaHVlXG4gIC8vIE5vIGRpZmZlcmVuY2VcbiAgaWYgKGRlbHRhID09PSAwKSB7XG4gICAgaCA9IDA7XG4gIH1cbiAgLy8gUmVkIGlzIG1heFxuICBlbHNlIGlmIChjbWF4ID09PSByKSB7XG4gICAgaCA9ICgoZyAtIGIpIC8gZGVsdGEpICUgNjtcbiAgfVxuICAvLyBHcmVlbiBpcyBtYXhcbiAgZWxzZSBpZiAoY21heCA9PT0gZykge1xuICAgIGggPSAoYiAtIHIpIC8gZGVsdGEgKyAyO1xuICB9XG4gIC8vIEJsdWUgaXMgbWF4XG4gIGVsc2Uge1xuICAgIGggPSAociAtIGcpIC8gZGVsdGEgKyA0O1xuICB9XG5cbiAgaCA9IE1hdGgucm91bmQoaCAqIDYwKTtcblxuICAvLyBNYWtlIG5lZ2F0aXZlIGh1ZXMgcG9zaXRpdmUgYmVoaW5kIDM2MMKwXG4gIGlmIChoIDwgMCkge1xuICAgIGggKz0gMzYwO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIGxpZ2h0bmVzc1xuICBsID0gKGNtYXggKyBjbWluKSAvIDI7XG5cbiAgLy8gQ2FsY3VsYXRlIHNhdHVyYXRpb25cbiAgcyA9IGRlbHRhID09PSAwID8gMCA6IGRlbHRhIC8gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKTtcblxuICAvLyBNdWx0aXBseSBsIGFuZCBzIGJ5IDEwMFxuICBzID0gKyhzICogMTAwKS50b0ZpeGVkKDEpO1xuICBsID0gKyhsICogMTAwKS50b0ZpeGVkKDEpO1xuXG4gIHJldHVybiB7IGgsIHMsIGwgfTtcbn1cblxuZnVuY3Rpb24gaHNsVG9SR0IoeyBoLCBzLCBsIH06IHsgaDogbnVtYmVyOyBzOiBudW1iZXI7IGw6IG51bWJlciB9KSB7XG4gIC8vIE11c3QgYmUgZnJhY3Rpb25zIG9mIDFcbiAgcyAvPSAxMDA7XG4gIGwgLz0gMTAwO1xuXG4gIGNvbnN0IGMgPSAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpICogcztcbiAgY29uc3QgeCA9IGMgKiAoMSAtIE1hdGguYWJzKCgoaCAvIDYwKSAlIDIpIC0gMSkpO1xuICBjb25zdCBtID0gbCAtIGMgLyAyO1xuICBsZXQgciA9IDA7XG4gIGxldCBnID0gMDtcbiAgbGV0IGIgPSAwO1xuXG4gIGlmIChoID49IDAgJiYgaCA8IDYwKSB7XG4gICAgciA9IGM7XG4gICAgZyA9IHg7XG4gICAgYiA9IDA7XG4gIH0gZWxzZSBpZiAoaCA+PSA2MCAmJiBoIDwgMTIwKSB7XG4gICAgciA9IHg7XG4gICAgZyA9IGM7XG4gICAgYiA9IDA7XG4gIH0gZWxzZSBpZiAoaCA+PSAxMjAgJiYgaCA8IDE4MCkge1xuICAgIHIgPSAwO1xuICAgIGcgPSBjO1xuICAgIGIgPSB4O1xuICB9IGVsc2UgaWYgKGggPj0gMTgwICYmIGggPCAyNDApIHtcbiAgICByID0gMDtcbiAgICBnID0geDtcbiAgICBiID0gYztcbiAgfSBlbHNlIGlmIChoID49IDI0MCAmJiBoIDwgMzAwKSB7XG4gICAgciA9IHg7XG4gICAgZyA9IDA7XG4gICAgYiA9IGM7XG4gIH0gZWxzZSBpZiAoaCA+PSAzMDAgJiYgaCA8IDM2MCkge1xuICAgIHIgPSBjO1xuICAgIGcgPSAwO1xuICAgIGIgPSB4O1xuICB9XG4gIHIgPSBNYXRoLnJvdW5kKChyICsgbSkgKiAyNTUpO1xuICBnID0gTWF0aC5yb3VuZCgoZyArIG0pICogMjU1KTtcbiAgYiA9IE1hdGgucm91bmQoKGIgKyBtKSAqIDI1NSk7XG5cbiAgcmV0dXJuIHsgciwgZywgYiB9O1xufVxuXG5mdW5jdGlvbiBoZXhUb0hTTChoZXg6IHN0cmluZykge1xuICByZXR1cm4gcmdiVG9IU0woaGV4VG9SR0IoaGV4KSk7XG59XG5cbmZ1bmN0aW9uIGhzbFRvSGV4KGhzbDogeyBoOiBudW1iZXI7IHM6IG51bWJlcjsgbDogbnVtYmVyIH0pIHtcbiAgcmV0dXJuIHJnYlRvSGV4KGhzbFRvUkdCKGhzbCkpO1xufVxuXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcbiAgcmV0dXJuIG1pbiA8IG1heCA/ICh2YWx1ZSA8IG1pbiA/IG1pbiA6IHZhbHVlID4gbWF4ID8gbWF4IDogdmFsdWUpIDogdmFsdWUgPCBtYXggPyBtYXggOiB2YWx1ZSA+IG1pbiA/IG1pbiA6IHZhbHVlO1xufVxuXG5jb25zdCBvZmZzZXQgPSAxMjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNsaWdodGx5RGFya2VyQ29sb3IoaGV4OiBzdHJpbmcpIHtcbiAgY29uc3QgaHNsID0gaGV4VG9IU0woaGV4KTtcblxuICByZXR1cm4gaHNsVG9IZXgoe1xuICAgIGg6IGhzbC5oLFxuICAgIHM6IGhzbC5zLFxuICAgIGw6IGNsYW1wKGhzbC5sIC0gb2Zmc2V0LCAwLCAxMDApLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNsaWdodGx5TGlnaHRlckNvbG9yKGhleDogc3RyaW5nKSB7XG4gIGNvbnN0IGhzbCA9IGhleFRvSFNMKGhleCk7XG5cbiAgcmV0dXJuIGhzbFRvSGV4KHtcbiAgICBoOiBoc2wuaCxcbiAgICBzOiBoc2wucyxcbiAgICBsOiBjbGFtcChoc2wubCArIG9mZnNldCwgMCwgMTAwKSxcbiAgfSk7XG59XG4iLCAiaW1wb3J0IHsgSWNvbiwgSW1hZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcblxuLyoqXG4gKiBJY29uIHNob3dpbmcgdGhlIGZhdmljb24gb2YgYSB3ZWJzaXRlLlxuICpcbiAqIEEgZmF2aWNvbiAoZmF2b3JpdGUgaWNvbikgaXMgYSB0aW55IGljb24gaW5jbHVkZWQgYWxvbmcgd2l0aCBhIHdlYnNpdGUsIHdoaWNoIGlzIGRpc3BsYXllZCBpbiBwbGFjZXMgbGlrZSB0aGUgYnJvd3NlcidzIGFkZHJlc3MgYmFyLCBwYWdlIHRhYnMsIGFuZCBib29rbWFya3MgbWVudS5cbiAqXG4gKiBAcGFyYW0gdXJsIFRoZSBVUkwgb2YgdGhlIHdlYnNpdGUgdG8gcmVwcmVzZW50LlxuICpcbiAqIEByZXR1cm5zIGFuIEltYWdlIHRoYXQgY2FuIGJlIHVzZWQgd2hlcmUgUmF5Y2FzdCBleHBlY3RzIHRoZW0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogPExpc3QuSXRlbSBpY29uPXtnZXRGYXZpY29uKFwiaHR0cHM6Ly9yYXljYXN0LmNvbVwiKX0gdGl0bGU9XCJSYXljYXN0IFdlYnNpdGVcIiAvPlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGYXZpY29uKFxuICB1cmw6IHN0cmluZyB8IFVSTCxcbiAgb3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBTaXplIG9mIHRoZSBGYXZpY29uXG4gICAgICogQGRlZmF1bHQgNjRcbiAgICAgKi9cbiAgICBzaXplPzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIEZhbGxiYWNrIGljb24gaW4gY2FzZSB0aGUgRmF2aWNvbiBpcyBub3QgZm91bmQuXG4gICAgICogQGRlZmF1bHQgSWNvbi5MaW5rXG4gICAgICovXG4gICAgZmFsbGJhY2s/OiBJbWFnZS5GYWxsYmFjaztcbiAgICAvKipcbiAgICAgKiBBIHtAbGluayBJbWFnZS5NYXNrfSB0byBhcHBseSB0byB0aGUgRmF2aWNvbi5cbiAgICAgKi9cbiAgICBtYXNrPzogSW1hZ2UuTWFzaztcbiAgfSxcbik6IEltYWdlLkltYWdlTGlrZSB7XG4gIHRyeSB7XG4gICAgLy8gYSBmdW5jIGFkZGluZyBodHRwczovLyB0byB0aGUgVVJMXG4gICAgLy8gZm9yIGNhc2VzIHdoZXJlIHRoZSBVUkwgaXMgbm90IGEgZnVsbCBVUkxcbiAgICAvLyBlLmcuIFwicmF5Y2FzdC5jb21cIlxuICAgIGNvbnN0IHNhbml0aXplID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIXVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vJHt1cmx9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfTtcblxuICAgIGNvbnN0IHVybE9iaiA9IHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIgPyBuZXcgVVJMKHNhbml0aXplKHVybCkpIDogdXJsO1xuICAgIGNvbnN0IGhvc3RuYW1lID0gdXJsT2JqLmhvc3RuYW1lO1xuXG4gICAgY29uc3QgZmF2aWNvblByb3ZpZGVyOiBcIm5vbmVcIiB8IFwicmF5Y2FzdFwiIHwgXCJhcHBsZVwiIHwgXCJnb29nbGVcIiB8IFwiZHVja0R1Y2tHb1wiIHwgXCJkdWNrZHVja2dvXCIgfCBcImxlZ2FjeVwiID1cbiAgICAgIChwcm9jZXNzLmVudi5GQVZJQ09OX1BST1ZJREVSIGFzIGFueSkgPz8gXCJyYXljYXN0XCI7XG5cbiAgICBzd2l0Y2ggKGZhdmljb25Qcm92aWRlcikge1xuICAgICAgY2FzZSBcIm5vbmVcIjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IG9wdGlvbnM/LmZhbGxiYWNrID8/IEljb24uTGluayxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zPy5tYXNrLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcImFwcGxlXCI6XG4gICAgICAgIC8vIHdlIGNhbid0IHN1cHBvcnQgYXBwbGUgZmF2aWNvbnMgYXMgaXQncyBhIG5hdGl2ZSBBUElcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IG9wdGlvbnM/LmZhbGxiYWNrID8/IEljb24uTGluayxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zPy5tYXNrLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcImR1Y2tkdWNrZ29cIjpcbiAgICAgIGNhc2UgXCJkdWNrRHVja0dvXCI6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBgaHR0cHM6Ly9pY29ucy5kdWNrZHVja2dvLmNvbS9pcDMvJHtob3N0bmFtZX0uaWNvYCxcbiAgICAgICAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gSWNvbi5MaW5rLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnM/Lm1hc2ssXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwiZ29vZ2xlXCI6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBgaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9zMi9mYXZpY29ucz9zej0ke29wdGlvbnM/LnNpemUgPz8gNjR9JmRvbWFpbj0ke2hvc3RuYW1lfWAsXG4gICAgICAgICAgZmFsbGJhY2s6IG9wdGlvbnM/LmZhbGxiYWNrID8/IEljb24uTGluayxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zPy5tYXNrLFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcImxlZ2FjeVwiOlxuICAgICAgY2FzZSBcInJheWNhc3RcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc291cmNlOiBgaHR0cHM6Ly9hcGkucmF5LnNvL2Zhdmljb24/dXJsPSR7aG9zdG5hbWV9JnNpemU9JHtvcHRpb25zPy5zaXplID8/IDY0fWAsXG4gICAgICAgICAgZmFsbGJhY2s6IG9wdGlvbnM/LmZhbGxiYWNrID8/IEljb24uTGluayxcbiAgICAgICAgICBtYXNrOiBvcHRpb25zPy5tYXNrLFxuICAgICAgICB9O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgcmV0dXJuIEljb24uTGluaztcbiAgfVxufVxuIiwgImltcG9ydCB7IGVudmlyb25tZW50LCBDb2xvciB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB0eXBlIHsgSW1hZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5cbmZ1bmN0aW9uIHBvbGFyVG9DYXJ0ZXNpYW4oY2VudGVyWDogbnVtYmVyLCBjZW50ZXJZOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBhbmdsZUluRGVncmVlczogbnVtYmVyKSB7XG4gIGNvbnN0IGFuZ2xlSW5SYWRpYW5zID0gKChhbmdsZUluRGVncmVlcyAtIDkwKSAqIE1hdGguUEkpIC8gMTgwLjA7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGVJblJhZGlhbnMpLFxuICAgIHk6IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZUluUmFkaWFucyksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlQXJjKHg6IG51bWJlciwgeTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgc3RhcnRBbmdsZTogbnVtYmVyLCBlbmRBbmdsZTogbnVtYmVyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gcG9sYXJUb0NhcnRlc2lhbih4LCB5LCByYWRpdXMsIGVuZEFuZ2xlKTtcbiAgY29uc3QgZW5kID0gcG9sYXJUb0NhcnRlc2lhbih4LCB5LCByYWRpdXMsIHN0YXJ0QW5nbGUpO1xuXG4gIGNvbnN0IGxhcmdlQXJjRmxhZyA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZSA8PSAxODAgPyBcIjBcIiA6IFwiMVwiO1xuXG4gIGNvbnN0IGQgPSBbXCJNXCIsIHN0YXJ0LngsIHN0YXJ0LnksIFwiQVwiLCByYWRpdXMsIHJhZGl1cywgMCwgbGFyZ2VBcmNGbGFnLCAwLCBlbmQueCwgZW5kLnldLmpvaW4oXCIgXCIpO1xuXG4gIHJldHVybiBkO1xufVxuXG4vKipcbiAqIEljb24gdG8gcmVwcmVzZW50IHRoZSBwcm9ncmVzcyBvZiBfc29tZXRoaW5nXy5cbiAqXG4gKiBAcGFyYW0gcHJvZ3Jlc3MgTnVtYmVyIGJldHdlZW4gMCBhbmQgMS5cbiAqIEBwYXJhbSBjb2xvciBIZXggY29sb3IgKGRlZmF1bHQgYFwiI0ZGNjM2M1wiYCkgb3IgQ29sb3IuXG4gKlxuICogQHJldHVybnMgYW4gSW1hZ2UgdGhhdCBjYW4gYmUgdXNlZCB3aGVyZSBSYXljYXN0IGV4cGVjdHMgdGhlbS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiA8TGlzdC5JdGVtIGljb249e2dldFByb2dyZXNzSWNvbigwLjEpfSB0aXRsZT1cIlByb2plY3RcIiAvPlxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmVzc0ljb24oXG4gIHByb2dyZXNzOiBudW1iZXIsXG4gIGNvbG9yOiBDb2xvciB8IHN0cmluZyA9IENvbG9yLlJlZCxcbiAgb3B0aW9ucz86IHsgYmFja2dyb3VuZD86IENvbG9yIHwgc3RyaW5nOyBiYWNrZ3JvdW5kT3BhY2l0eT86IG51bWJlciB9LFxuKTogSW1hZ2UuQXNzZXQge1xuICBjb25zdCBiYWNrZ3JvdW5kID0gb3B0aW9ucz8uYmFja2dyb3VuZCB8fCAoZW52aXJvbm1lbnQuYXBwZWFyYW5jZSA9PT0gXCJsaWdodFwiID8gXCJibGFja1wiIDogXCJ3aGl0ZVwiKTtcbiAgY29uc3QgYmFja2dyb3VuZE9wYWNpdHkgPSBvcHRpb25zPy5iYWNrZ3JvdW5kT3BhY2l0eSB8fCAwLjE7XG5cbiAgY29uc3Qgc3Ryb2tlID0gMTA7XG4gIGNvbnN0IHBhZGRpbmcgPSA1O1xuICBjb25zdCByYWRpdXMgPSA1MCAtIHBhZGRpbmcgLSBzdHJva2UgLyAyO1xuXG4gIGNvbnN0IHN2ZyA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMTAwcHhcIj5cbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiJHtyYWRpdXN9XCIgc3Ryb2tlLXdpZHRoPVwiJHtzdHJva2V9XCIgc3Ryb2tlPVwiJHtcbiAgICAgICAgcHJvZ3Jlc3MgPCAxID8gYmFja2dyb3VuZCA6IGNvbG9yXG4gICAgICB9XCIgb3BhY2l0eT1cIiR7cHJvZ3Jlc3MgPCAxID8gYmFja2dyb3VuZE9wYWNpdHkgOiBcIjFcIn1cIiBmaWxsPVwibm9uZVwiIC8+XG4gICAgICAke1xuICAgICAgICBwcm9ncmVzcyA+IDAgJiYgcHJvZ3Jlc3MgPCAxXG4gICAgICAgICAgPyBgPHBhdGggZD1cIiR7ZGVzY3JpYmVBcmMoXG4gICAgICAgICAgICAgIDUwLFxuICAgICAgICAgICAgICA1MCxcbiAgICAgICAgICAgICAgcmFkaXVzLFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICBwcm9ncmVzcyAqIDM2MCxcbiAgICAgICAgICAgICl9XCIgc3Ryb2tlPVwiJHtjb2xvcn1cIiBzdHJva2Utd2lkdGg9XCIke3N0cm9rZX1cIiBmaWxsPVwibm9uZVwiIC8+YFxuICAgICAgICAgIDogXCJcIlxuICAgICAgfVxuICAgIDwvc3ZnPlxuICBgLnJlcGxhY2VBbGwoXCJcXG5cIiwgXCJcIik7XG4gIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KHN2Zyl9YDtcbn1cbiIsICJleHBvcnQgeyBPQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi9PQXV0aFNlcnZpY2VcIjtcbmV4cG9ydCB7IHdpdGhBY2Nlc3NUb2tlbiwgZ2V0QWNjZXNzVG9rZW4gfSBmcm9tIFwiLi93aXRoQWNjZXNzVG9rZW5cIjtcblxuZXhwb3J0IHR5cGUgeyBXaXRoQWNjZXNzVG9rZW5Db21wb25lbnRPckZuIH0gZnJvbSBcIi4vd2l0aEFjY2Vzc1Rva2VuXCI7XG5leHBvcnQgdHlwZSB7XG4gIE9uQXV0aG9yaXplUGFyYW1zLFxuICBPQXV0aFNlcnZpY2VPcHRpb25zLFxuICBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucyxcbiAgUHJvdmlkZXJPcHRpb25zLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuIiwgImltcG9ydCB7IENvbG9yLCBPQXV0aCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IFBST1ZJREVSX0NMSUVOVF9JRFMgfSBmcm9tIFwiLi9wcm92aWRlcnNcIjtcbmltcG9ydCB0eXBlIHtcbiAgT0F1dGhTZXJ2aWNlT3B0aW9ucyxcbiAgT25BdXRob3JpemVQYXJhbXMsXG4gIFByb3ZpZGVyT3B0aW9ucyxcbiAgUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8qKlxuICogQ2xhc3MgYWxsb3dpbmcgdG8gY3JlYXRlIGFuIE9BdXRoIHNlcnZpY2UgdXNpbmcgdGhlIHRoZSBQS0NFIChQcm9vZiBLZXkgZm9yIENvZGUgRXhjaGFuZ2UpIGZsb3cuXG4gKlxuICogVGhpcyBzZXJ2aWNlIGlzIGNhcGFibGUgb2Ygc3RhcnRpbmcgdGhlIGF1dGhvcml6YXRpb24gcHJvY2VzcywgZmV0Y2hpbmcgYW5kIHJlZnJlc2hpbmcgdG9rZW5zLFxuICogYXMgd2VsbCBhcyBtYW5hZ2luZyB0aGUgYXV0aGVudGljYXRpb24gc3RhdGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9hdXRoQ2xpZW50ID0gbmV3IE9BdXRoLlBLQ0VDbGllbnQoeyAuLi4gfSk7XG4gKiBjb25zdCBvYXV0aFNlcnZpY2UgPSBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAqICAgY2xpZW50OiBvYXV0aENsaWVudCxcbiAqICAgY2xpZW50SWQ6ICd5b3VyLWNsaWVudC1pZCcsXG4gKiAgIHNjb3BlOiAncmVxdWlyZWQgc2NvcGVzJyxcbiAqICAgYXV0aG9yaXplVXJsOiAnaHR0cHM6Ly9wcm92aWRlci5jb20vb2F1dGgvYXV0aG9yaXplJyxcbiAqICAgdG9rZW5Vcmw6ICdodHRwczovL3Byb3ZpZGVyLmNvbS9vYXV0aC90b2tlbicsXG4gKiAgIHJlZnJlc2hUb2tlblVybDogJ2h0dHBzOi8vcHJvdmlkZXIuY29tL29hdXRoL3Rva2VuJyxcbiAqICAgZXh0cmFQYXJhbWV0ZXJzOiB7ICdhZGRpdGlvbmFsX3BhcmFtJzogJ3ZhbHVlJyB9XG4gKiB9KTtcbiAqIGBgYFxuICovXG5leHBvcnQgY2xhc3MgT0F1dGhTZXJ2aWNlIGltcGxlbWVudHMgT0F1dGhTZXJ2aWNlT3B0aW9ucyB7XG4gIHB1YmxpYyBjbGllbnRJZDogc3RyaW5nO1xuICBwdWJsaWMgc2NvcGU6IHN0cmluZztcbiAgcHVibGljIGNsaWVudDogT0F1dGguUEtDRUNsaWVudDtcbiAgcHVibGljIGV4dHJhUGFyYW1ldGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG4gIHB1YmxpYyBhdXRob3JpemVVcmw6IHN0cmluZztcbiAgcHVibGljIHRva2VuVXJsOiBzdHJpbmc7XG4gIHB1YmxpYyByZWZyZXNoVG9rZW5Vcmw/OiBzdHJpbmc7XG4gIHB1YmxpYyBib2R5RW5jb2Rpbmc/OiBcImpzb25cIiB8IFwidXJsLWVuY29kZWRcIjtcbiAgcHVibGljIHBlcnNvbmFsQWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIG9uQXV0aG9yaXplPzogKHBhcmFtczogT25BdXRob3JpemVQYXJhbXMpID0+IHZvaWQ7XG4gIHRva2VuUmVzcG9uc2VQYXJzZXI6IChyZXNwb25zZTogdW5rbm93bikgPT4gT0F1dGguVG9rZW5SZXNwb25zZTtcbiAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IChyZXNwb25zZTogdW5rbm93bikgPT4gT0F1dGguVG9rZW5SZXNwb25zZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBPQXV0aFNlcnZpY2VPcHRpb25zKSB7XG4gICAgdGhpcy5jbGllbnRJZCA9IG9wdGlvbnMuY2xpZW50SWQ7XG4gICAgdGhpcy5zY29wZSA9IEFycmF5LmlzQXJyYXkob3B0aW9ucy5zY29wZSkgPyBvcHRpb25zLnNjb3BlLmpvaW4oXCIgXCIpIDogb3B0aW9ucy5zY29wZTtcbiAgICB0aGlzLnBlcnNvbmFsQWNjZXNzVG9rZW4gPSBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW47XG4gICAgdGhpcy5ib2R5RW5jb2RpbmcgPSBvcHRpb25zLmJvZHlFbmNvZGluZztcbiAgICB0aGlzLmNsaWVudCA9IG9wdGlvbnMuY2xpZW50O1xuICAgIHRoaXMuZXh0cmFQYXJhbWV0ZXJzID0gb3B0aW9ucy5leHRyYVBhcmFtZXRlcnM7XG4gICAgdGhpcy5hdXRob3JpemVVcmwgPSBvcHRpb25zLmF1dGhvcml6ZVVybDtcbiAgICB0aGlzLnRva2VuVXJsID0gb3B0aW9ucy50b2tlblVybDtcbiAgICB0aGlzLnJlZnJlc2hUb2tlblVybCA9IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsO1xuICAgIHRoaXMub25BdXRob3JpemUgPSBvcHRpb25zLm9uQXV0aG9yaXplO1xuICAgIHRoaXMudG9rZW5SZXNwb25zZVBhcnNlciA9IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlciA/PyAoKHgpID0+IHggYXMgT0F1dGguVG9rZW5SZXNwb25zZSk7XG4gICAgdGhpcy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlciA9IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIgPz8gKCh4KSA9PiB4IGFzIE9BdXRoLlRva2VuUmVzcG9uc2UpO1xuICAgIHRoaXMuYXV0aG9yaXplID0gdGhpcy5hdXRob3JpemUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc2FuYSBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGFzYW5hID0gT0F1dGhTZXJ2aWNlLmFzYW5hKHsgc2NvcGU6ICdkZWZhdWx0JyB9KVxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgYXNhbmEob3B0aW9uczogUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIkFzYW5hXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNTFcIiBoZWlnaHQ9XCIyMzJcIiBmaWxsPVwibm9uZVwiPjxwYXRoIGZpbGw9XCIjRjA2QTZBXCIgZD1cIk0xNzkuMzgzIDU0LjM3M2MwIDMwLjAxNy0yNC4zMzcgNTQuMzc0LTU0LjM1NCA1NC4zNzQtMzAuMDM1IDAtNTQuMzczLTI0LjMzOC01NC4zNzMtNTQuMzc0QzcwLjY1NiAyNC4zMzggOTQuOTkzIDAgMTI1LjAyOSAwYzMwLjAxNyAwIDU0LjM1NCAyNC4zMzggNTQuMzU0IDU0LjM3M1pNNTQuMzkzIDEyMi4zM0MyNC4zNzYgMTIyLjMzLjAyIDE0Ni42NjguMDIgMTc2LjY4NWMwIDMwLjAxNyAyNC4zMzcgNTQuMzczIDU0LjM3MyA1NC4zNzMgMzAuMDM1IDAgNTQuMzczLTI0LjMzOCA1NC4zNzMtNTQuMzczIDAtMzAuMDE3LTI0LjMzOC01NC4zNTUtNTQuMzczLTU0LjM1NVptMTQxLjI1MyAwYy0zMC4wMzUgMC01NC4zNzMgMjQuMzM4LTU0LjM3MyA1NC4zNzQgMCAzMC4wMzUgMjQuMzM4IDU0LjM3MyA1NC4zNzMgNTQuMzczIDMwLjAxNyAwIDU0LjM3NC0yNC4zMzggNTQuMzc0LTU0LjM3MyAwLTMwLjAzNi0yNC4zMzgtNTQuMzc0LTU0LjM3NC01NC4zNzRaXCIvPjwvc3ZnPmAsXG4gICAgICAgICl9YCxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJhc2FuYVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgQXNhbmEgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCA/PyBQUk9WSURFUl9DTElFTlRfSURTLmFzYW5hLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vYXNhbmEub2F1dGgucmF5Y2FzdC5jb20vYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vYXNhbmEub2F1dGgucmF5Y2FzdC5jb20vdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy5yZWZyZXNoVG9rZW5VcmwgPz8gXCJodHRwczovL2FzYW5hLm9hdXRoLnJheWNhc3QuY29tL3JlZnJlc2gtdG9rZW5cIixcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2l0SHViIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgZ2l0aHViID0gT0F1dGhTZXJ2aWNlLmdpdGh1Yih7IHNjb3BlOiAncmVwbyB1c2VyJyB9KVxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2l0aHViKG9wdGlvbnM6IFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJHaXRIdWJcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiB7XG4gICAgICAgICAgc291cmNlOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNjRcIiBoZWlnaHQ9XCI2NFwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj48cGF0aCBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk04IDBDMy41OCAwIDAgMy41OCAwIDhjMCAzLjU0IDIuMjkgNi41MyA1LjQ3IDcuNTkuNC4wNy41NS0uMTcuNTUtLjM4IDAtLjE5LS4wMS0uODItLjAxLTEuNDktMi4wMS4zNy0yLjUzLS40OS0yLjY5LS45NC0uMDktLjIzLS40OC0uOTQtLjgyLTEuMTMtLjI4LS4xNS0uNjgtLjUyLS4wMS0uNTMuNjMtLjAxIDEuMDguNTggMS4yMy44Mi43MiAxLjIxIDEuODcuODcgMi4zMy42Ni4wNy0uNTIuMjgtLjg3LjUxLTEuMDctMS43OC0uMi0zLjY0LS44OS0zLjY0LTMuOTUgMC0uODcuMzEtMS41OS44Mi0yLjE1LS4wOC0uMi0uMzYtMS4wMi4wOC0yLjEyIDAgMCAuNjctLjIxIDIuMi44Mi42NC0uMTggMS4zMi0uMjcgMi0uMjcuNjggMCAxLjM2LjA5IDIgLjI3IDEuNTMtMS4wNCAyLjItLjgyIDIuMi0uODIuNDQgMS4xLjE2IDEuOTIuMDggMi4xMi41MS41Ni44MiAxLjI3LjgyIDIuMTUgMCAzLjA3LTEuODcgMy43NS0zLjY1IDMuOTUuMjkuMjUuNTQuNzMuNTQgMS40OCAwIDEuMDctLjAxIDEuOTMtLjAxIDIuMiAwIC4yMS4xNS40Ni41NS4zOEE4LjAxMyA4LjAxMyAwIDAgMCAxNiA4YzAtNC40Mi0zLjU4LTgtOC04elwiLz48L3N2Zz5gLFxuICAgICAgICAgICl9YCxcblxuICAgICAgICAgIHRpbnRDb2xvcjogQ29sb3IuUHJpbWFyeVRleHQsXG4gICAgICAgIH0sXG4gICAgICAgIHByb3ZpZGVySWQ6IFwiZ2l0aHViXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBHaXRIdWIgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCA/PyBQUk9WSURFUl9DTElFTlRfSURTLmdpdGh1YixcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL2dpdGh1Yi5vYXV0aC5yYXljYXN0LmNvbS9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9naXRodWIub2F1dGgucmF5Y2FzdC5jb20vdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy5yZWZyZXNoVG9rZW5VcmwgPz8gXCJodHRwczovL2dpdGh1Yi5vYXV0aC5yYXljYXN0LmNvbS9yZWZyZXNoLXRva2VuXCIsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdvb2dsZSBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGdvb2dsZSA9IE9BdXRoU2VydmljZS5nb29nbGUoe1xuICAgKiAgIGNsaWVudElkOiAnY3VzdG9tLWNsaWVudC1pZCcsXG4gICAqICAgYXV0aG9yaXplVXJsOiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3YyL2F1dGgnLFxuICAgKiAgIHRva2VuVXJsOiAnaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4nLFxuICAgKiAgIHNjb3BlOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC9kcml2ZS5yZWFkb25seScsXG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ29vZ2xlKG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuQXBwVVJJLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiR29vZ2xlXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgc3R5bGU9XCJkaXNwbGF5OmJsb2NrXCIgdmlld0JveD1cIjAgMCA0OCA0OFwiPjxwYXRoIGZpbGw9XCIjRUE0MzM1XCIgZD1cIk0yNCA5LjVjMy41NCAwIDYuNzEgMS4yMiA5LjIxIDMuNmw2Ljg1LTYuODVDMzUuOSAyLjM4IDMwLjQ3IDAgMjQgMCAxNC42MiAwIDYuNTEgNS4zOCAyLjU2IDEzLjIybDcuOTggNi4xOUMxMi40MyAxMy43MiAxNy43NCA5LjUgMjQgOS41elwiLz48cGF0aCBmaWxsPVwiIzQyODVGNFwiIGQ9XCJNNDYuOTggMjQuNTVjMC0xLjU3LS4xNS0zLjA5LS4zOC00LjU1SDI0djkuMDJoMTIuOTRjLS41OCAyLjk2LTIuMjYgNS40OC00Ljc4IDcuMThsNy43MyA2YzQuNTEtNC4xOCA3LjA5LTEwLjM2IDcuMDktMTcuNjV6XCIvPjxwYXRoIGZpbGw9XCIjRkJCQzA1XCIgZD1cIk0xMC41MyAyOC41OWMtLjQ4LTEuNDUtLjc2LTIuOTktLjc2LTQuNTlzLjI3LTMuMTQuNzYtNC41OWwtNy45OC02LjE5Qy45MiAxNi40NiAwIDIwLjEyIDAgMjRjMCAzLjg4LjkyIDcuNTQgMi41NiAxMC43OGw3Ljk3LTYuMTl6XCIvPjxwYXRoIGZpbGw9XCIjMzRBODUzXCIgZD1cIk0yNCA0OGM2LjQ4IDAgMTEuOTMtMi4xMyAxNS44OS01LjgxbC03LjczLTZjLTIuMTUgMS40NS00LjkyIDIuMy04LjE2IDIuMy02LjI2IDAtMTEuNTctNC4yMi0xMy40Ny05LjkxbC03Ljk4IDYuMTlDNi41MSA0Mi42MiAxNC42MiA0OCAyNCA0OHpcIi8+PHBhdGggZmlsbD1cIm5vbmVcIiBkPVwiTTAgMGg0OHY0OEgwelwiLz48L3N2Zz5gLFxuICAgICAgICApfWAsXG4gICAgICAgIHByb3ZpZGVySWQ6IFwiZ29vZ2xlXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBHb29nbGUgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCxcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdjIvYXV0aFwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nID8/IFwidXJsLWVuY29kZWRcIixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSmlyYSBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGppcmEgPSBPQXV0aFNlcnZpY2UuamlyYSh7XG4gICAqICAgY2xpZW50SWQ6ICdjdXN0b20tY2xpZW50LWlkJyxcbiAgICogICBhdXRob3JpemVVcmw6ICdodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbS9hdXRob3JpemUnLFxuICAgKiAgIHRva2VuVXJsOiAnaHR0cHM6Ly9hcGkuYXRsYXNzaWFuLmNvbS9vYXV0aC90b2tlbicsXG4gICAqICAgc2NvcGU6ICdyZWFkOmppcmEtdXNlciByZWFkOmppcmEtd29yayBvZmZsaW5lX2FjY2VzcydcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBqaXJhKG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiSmlyYVwiLFxuICAgICAgICBwcm92aWRlckljb246IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHdpZHRoPVwiMjM2MVwiIGhlaWdodD1cIjI1MDBcIiB2aWV3Qm94PVwiMi41OSAwIDIxNC4wOTEgMjI0XCI+PGxpbmVhckdyYWRpZW50IGlkPVwiYVwiIHgxPVwiMTAyLjRcIiB4Mj1cIjU2LjE1XCIgeTE9XCIyMTguNjNcIiB5Mj1cIjE3Mi4zOVwiIGdyYWRpZW50VHJhbnNmb3JtPVwibWF0cml4KDEgMCAwIC0xIDAgMjY0KVwiIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPjxzdG9wIG9mZnNldD1cIi4xOFwiIHN0b3AtY29sb3I9XCIjMDA1MmNjXCIvPjxzdG9wIG9mZnNldD1cIjFcIiBzdG9wLWNvbG9yPVwiIzI2ODRmZlwiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4bGluazpocmVmPVwiI2FcIiBpZD1cImJcIiB4MT1cIjExNC42NVwiIHgyPVwiMTYwLjgxXCIgeTE9XCI4NS43N1wiIHkyPVwiMTMxLjkyXCIvPjxwYXRoIGZpbGw9XCIjMjY4NGZmXCIgZD1cIk0yMTQuMDYgMTA1LjczIDExNy42NyA5LjM0IDEwOC4zMyAwIDM1Ljc3IDcyLjU2IDIuNTkgMTA1LjczYTguODkgOC44OSAwIDAgMCAwIDEyLjU0bDY2LjI5IDY2LjI5TDEwOC4zMyAyMjRsNzIuNTUtNzIuNTYgMS4xMy0xLjEyIDMyLjA1LTMyYTguODcgOC44NyAwIDAgMCAwLTEyLjU5em0tMTA1LjczIDM5LjM5TDc1LjIxIDExMmwzMy4xMi0zMy4xMkwxNDEuNDQgMTEyelwiLz48cGF0aCBmaWxsPVwidXJsKCNhKVwiIGQ9XCJNMTA4LjMzIDc4Ljg4YTU1Ljc1IDU1Ljc1IDAgMCAxLS4yNC03OC42MUwzNS42MiA3Mi43MWwzOS40NCAzOS40NHpcIi8+PHBhdGggZmlsbD1cInVybCgjYilcIiBkPVwibTE0MS41MyAxMTEuOTEtMzMuMiAzMy4yMWE1NS43NyA1NS43NyAwIDAgMSAwIDc4Ljg2TDE4MSAxNTEuMzV6XCIvPjwvc3ZnPmAsXG4gICAgICAgICl9YCxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJqaXJhXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBKaXJhIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9hdXRoLmF0bGFzc2lhbi5jb20vYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vYXV0aC5hdGxhc3NpYW4uY29tL29hdXRoL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaW5lYXIgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBsaW5lYXIgPSBPQXV0aFNlcnZpY2UubGluZWFyKHsgc2NvcGU6ICdyZWFkIHdyaXRlJyB9KVxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbGluZWFyKG9wdGlvbnM6IFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJMaW5lYXJcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiB7XG4gICAgICAgICAgc291cmNlOiB7XG4gICAgICAgICAgICBsaWdodDogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCIjMjIyMzI2XCIgd2lkdGg9XCIyMDBcIiBoZWlnaHQ9XCIyMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj48cGF0aCBkPVwiTTEuMjI1NDEgNjEuNTIyOGMtLjIyMjUtLjk0ODUuOTA3NDgtMS41NDU5IDEuNTk2MzgtLjg1N0wzOS4zMzQyIDk3LjE3ODJjLjY4ODkuNjg4OS4wOTE1IDEuODE4OS0uODU3IDEuNTk2NEMyMC4wNTE1IDk0LjQ1MjIgNS41NDc3OSA3OS45NDg1IDEuMjI1NDEgNjEuNTIyOFpNLjAwMTg5MTM1IDQ2Ljg4OTFjLS4wMTc2NDM3NS4yODMzLjA4ODg3MjE1LjU1OTkuMjg5NTcxNjUuNzYwNkw1Mi4zNTAzIDk5LjcwODVjLjIwMDcuMjAwNy40NzczLjMwNzUuNzYwNi4yODk2IDIuMzY5Mi0uMTQ3NiA0LjY5MzgtLjQ2IDYuOTYyNC0uOTI1OS43NjQ1LS4xNTcgMS4wMzAxLTEuMDk2My40NzgyLTEuNjQ4MUwyLjU3NTk1IDM5LjQ0ODVjLS41NTE4Ni0uNTUxOS0xLjQ5MTE3LS4yODYzLTEuNjQ4MTc0LjQ3ODItLjQ2NTkxNSAyLjI2ODYtLjc3ODMyIDQuNTkzMi0uOTI1ODg0NjUgNi45NjI0Wk00LjIxMDkzIDI5LjcwNTRjLS4xNjY0OS4zNzM4LS4wODE2OS44MTA2LjIwNzY1IDEuMWw2NC43NzYwMiA2NC43NzZjLjI4OTQuMjg5NC43MjYyLjM3NDIgMS4xLjIwNzcgMS43ODYxLS43OTU2IDMuNTE3MS0xLjY5MjcgNS4xODU1LTIuNjg0LjU1MjEtLjMyOC42MzczLTEuMDg2Ny4xODMyLTEuNTQwN0w4LjQzNTY2IDI0LjMzNjdjLS40NTQwOS0uNDU0MS0xLjIxMjcxLS4zNjg5LTEuNTQwNzQuMTgzMi0uOTkxMzIgMS42Njg0LTEuODg4NDMgMy4zOTk0LTIuNjgzOTkgNS4xODU1Wk0xMi42NTg3IDE4LjA3NGMtLjM3MDEtLjM3MDEtLjM5My0uOTYzNy0uMDQ0My0xLjM1NDFDMjEuNzc5NSA2LjQ1OTMxIDM1LjExMTQgMCA0OS45NTE5IDAgNzcuNTkyNyAwIDEwMCAyMi40MDczIDEwMCA1MC4wNDgxYzAgMTQuODQwNS02LjQ1OTMgMjguMTcyNC0xNi43MTk5IDM3LjMzNzUtLjM5MDMuMzQ4Ny0uOTg0LjMyNTgtMS4zNTQyLS4wNDQzTDEyLjY1ODcgMTguMDc0WlwiLz48L3N2Zz5gLFxuICAgICAgICAgICAgKX1gLFxuICAgICAgICAgICAgZGFyazogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCIjZmZmXCIgd2lkdGg9XCIyMDBcIiBoZWlnaHQ9XCIyMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj48cGF0aCBkPVwiTTEuMjI1NDEgNjEuNTIyOGMtLjIyMjUtLjk0ODUuOTA3NDgtMS41NDU5IDEuNTk2MzgtLjg1N0wzOS4zMzQyIDk3LjE3ODJjLjY4ODkuNjg4OS4wOTE1IDEuODE4OS0uODU3IDEuNTk2NEMyMC4wNTE1IDk0LjQ1MjIgNS41NDc3OSA3OS45NDg1IDEuMjI1NDEgNjEuNTIyOFpNLjAwMTg5MTM1IDQ2Ljg4OTFjLS4wMTc2NDM3NS4yODMzLjA4ODg3MjE1LjU1OTkuMjg5NTcxNjUuNzYwNkw1Mi4zNTAzIDk5LjcwODVjLjIwMDcuMjAwNy40NzczLjMwNzUuNzYwNi4yODk2IDIuMzY5Mi0uMTQ3NiA0LjY5MzgtLjQ2IDYuOTYyNC0uOTI1OS43NjQ1LS4xNTcgMS4wMzAxLTEuMDk2My40NzgyLTEuNjQ4MUwyLjU3NTk1IDM5LjQ0ODVjLS41NTE4Ni0uNTUxOS0xLjQ5MTE3LS4yODYzLTEuNjQ4MTc0LjQ3ODItLjQ2NTkxNSAyLjI2ODYtLjc3ODMyIDQuNTkzMi0uOTI1ODg0NjUgNi45NjI0Wk00LjIxMDkzIDI5LjcwNTRjLS4xNjY0OS4zNzM4LS4wODE2OS44MTA2LjIwNzY1IDEuMWw2NC43NzYwMiA2NC43NzZjLjI4OTQuMjg5NC43MjYyLjM3NDIgMS4xLjIwNzcgMS43ODYxLS43OTU2IDMuNTE3MS0xLjY5MjcgNS4xODU1LTIuNjg0LjU1MjEtLjMyOC42MzczLTEuMDg2Ny4xODMyLTEuNTQwN0w4LjQzNTY2IDI0LjMzNjdjLS40NTQwOS0uNDU0MS0xLjIxMjcxLS4zNjg5LTEuNTQwNzQuMTgzMi0uOTkxMzIgMS42Njg0LTEuODg4NDMgMy4zOTk0LTIuNjgzOTkgNS4xODU1Wk0xMi42NTg3IDE4LjA3NGMtLjM3MDEtLjM3MDEtLjM5My0uOTYzNy0uMDQ0My0xLjM1NDFDMjEuNzc5NSA2LjQ1OTMxIDM1LjExMTQgMCA0OS45NTE5IDAgNzcuNTkyNyAwIDEwMCAyMi40MDczIDEwMCA1MC4wNDgxYzAgMTQuODQwNS02LjQ1OTMgMjguMTcyNC0xNi43MTk5IDM3LjMzNzUtLjM5MDMuMzQ4Ny0uOTg0LjMyNTgtMS4zNTQyLS4wNDQzTDEyLjY1ODcgMTguMDc0WlwiIC8+PC9zdmc+YCxcbiAgICAgICAgICAgICl9YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBwcm92aWRlcklkOiBcImxpbmVhclwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgTGluZWFyIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQgPz8gUFJPVklERVJfQ0xJRU5UX0lEUy5saW5lYXIsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9saW5lYXIub2F1dGgucmF5Y2FzdC5jb20vYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vbGluZWFyLm9hdXRoLnJheWNhc3QuY29tL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsID8/IFwiaHR0cHM6Ly9saW5lYXIub2F1dGgucmF5Y2FzdC5jb20vcmVmcmVzaC10b2tlblwiLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBleHRyYVBhcmFtZXRlcnM6IHtcbiAgICAgICAgYWN0b3I6IFwidXNlclwiLFxuICAgICAgfSxcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNsYWNrIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgc2xhY2sgPSBPQXV0aFNlcnZpY2Uuc2xhY2soeyBzY29wZTogJ2Vtb2ppOnJlYWQnIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzbGFjayhvcHRpb25zOiBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiU2xhY2tcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiNzMgNzMgMTI0IDEyNFwiPjxzdHlsZT4uc3Qwe2ZpbGw6I2UwMWU1YX0uc3Qxe2ZpbGw6IzM2YzVmMH0uc3Qye2ZpbGw6IzJlYjY3ZH0uc3Qze2ZpbGw6I2VjYjIyZX08L3N0eWxlPjxwYXRoIGQ9XCJNOTkuNCAxNTEuMmMwIDcuMS01LjggMTIuOS0xMi45IDEyLjktNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45IDAtNy4xIDUuOC0xMi45IDEyLjktMTIuOWgxMi45djEyLjl6TTEwNS45IDE1MS4yYzAtNy4xIDUuOC0xMi45IDEyLjktMTIuOXMxMi45IDUuOCAxMi45IDEyLjl2MzIuM2MwIDcuMS01LjggMTIuOS0xMi45IDEyLjlzLTEyLjktNS44LTEyLjktMTIuOXYtMzIuM3pcIiBjbGFzcz1cInN0MFwiLz48cGF0aCBkPVwiTTExOC44IDk5LjRjLTcuMSAwLTEyLjktNS44LTEyLjktMTIuOSAwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjlzMTIuOSA1LjggMTIuOSAxMi45djEyLjloLTEyLjl6TTExOC44IDEwNS45YzcuMSAwIDEyLjkgNS44IDEyLjkgMTIuOXMtNS44IDEyLjktMTIuOSAxMi45SDg2LjVjLTcuMSAwLTEyLjktNS44LTEyLjktMTIuOXM1LjgtMTIuOSAxMi45LTEyLjloMzIuM3pcIiBjbGFzcz1cInN0MVwiLz48cGF0aCBkPVwiTTE3MC42IDExOC44YzAtNy4xIDUuOC0xMi45IDEyLjktMTIuOSA3LjEgMCAxMi45IDUuOCAxMi45IDEyLjlzLTUuOCAxMi45LTEyLjkgMTIuOWgtMTIuOXYtMTIuOXpNMTY0LjEgMTE4LjhjMCA3LjEtNS44IDEyLjktMTIuOSAxMi45LTcuMSAwLTEyLjktNS44LTEyLjktMTIuOVY4Ni41YzAtNy4xIDUuOC0xMi45IDEyLjktMTIuOSA3LjEgMCAxMi45IDUuOCAxMi45IDEyLjl2MzIuM3pcIiBjbGFzcz1cInN0MlwiLz48cGF0aCBkPVwiTTE1MS4yIDE3MC42YzcuMSAwIDEyLjkgNS44IDEyLjkgMTIuOSAwIDcuMS01LjggMTIuOS0xMi45IDEyLjktNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45di0xMi45aDEyLjl6TTE1MS4yIDE2NC4xYy03LjEgMC0xMi45LTUuOC0xMi45LTEyLjkgMC03LjEgNS44LTEyLjkgMTIuOS0xMi45aDMyLjNjNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45IDAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOWgtMzIuM3pcIiBjbGFzcz1cInN0M1wiLz48L3N2Zz5gLFxuICAgICAgICApfWAsXG4gICAgICAgIHByb3ZpZGVySWQ6IFwic2xhY2tcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIFNsYWNrIGFjY291bnRcIixcbiAgICAgIH0pLFxuICAgICAgY2xpZW50SWQ6IG9wdGlvbnMuY2xpZW50SWQgPz8gUFJPVklERVJfQ0xJRU5UX0lEUy5zbGFjayxcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL3NsYWNrLm9hdXRoLnJheWNhc3QuY29tL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL3NsYWNrLm9hdXRoLnJheWNhc3QuY29tL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL3NsYWNrLm9hdXRoLnJheWNhc3QuY29tL3JlZnJlc2gtdG9rZW5cIixcbiAgICAgIHNjb3BlOiBcIlwiLFxuICAgICAgZXh0cmFQYXJhbWV0ZXJzOiB7XG4gICAgICAgIHVzZXJfc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICB9LFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLnRva2VuVXJsID8gb3B0aW9ucy5ib2R5RW5jb2RpbmcgPz8gXCJ1cmwtZW5jb2RlZFwiIDogXCJqc29uXCIsXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6XG4gICAgICAgIG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlciA/P1xuICAgICAgICAoKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiByZXNwb25zZS5hdXRoZWRfdXNlci5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICBzY29wZTogcmVzcG9uc2UuYXV0aGVkX3VzZXIuc2NvcGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogWm9vbSBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IHpvb20gPSBPQXV0aFNlcnZpY2Uuem9vbSh7XG4gICAqICAgY2xpZW50SWQ6ICdjdXN0b20tY2xpZW50LWlkJyxcbiAgICogICBhdXRob3JpemVVcmw6ICdodHRwczovL3pvb20udXMvb2F1dGgvYXV0aG9yaXplJyxcbiAgICogICB0b2tlblVybDogJ2h0dHBzOi8vem9vbS51cy9vYXV0aC90b2tlbicsXG4gICAqICAgc2NvcGU6ICdtZWV0aW5nOndyaXRlJyxcbiAgICogICBwZXJzb25hbEFjY2Vzc1Rva2VuOiAncGVyc29uYWwtYWNjZXNzLXRva2VuJyxcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB6b29tKG9wdGlvbnM6IFByb3ZpZGVyT3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiWm9vbVwiLFxuICAgICAgICBwcm92aWRlckljb246IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMzUxLjg0NSA4MFwiPjxwYXRoIGQ9XCJNNzMuNzg2IDc4LjgzNUgxMC44OEExMC44NDIgMTAuODQyIDAgMCAxIC44MzMgNzIuMTIyYTEwLjg0MSAxMC44NDEgMCAwIDEgMi4zNTctMTEuODVMNDYuNzY0IDE2LjdoLTMxLjIzQzYuOTU0IDE2LjY5OSAwIDkuNzQ0IDAgMS4xNjVoNTguMDE0YzQuNDE0IDAgOC4zNTcgMi42MzQgMTAuMDQ2IDYuNzEyYTEwLjg0MyAxMC44NDMgMCAwIDEtMi4zNTYgMTEuODVMMjIuMTMgNjMuMzAyaDM2LjEyMmM4LjU4IDAgMTUuNTM0IDYuOTU1IDE1LjUzNCAxNS41MzRabTI3OC4wNTktNDguNTQ0QzM1MS44NDUgMTMuNTg4IDMzOC4yNTYgMCAzMjEuNTUzIDBjLTguOTM0IDAtMTYuOTc1IDMuODktMjIuNTI0IDEwLjA2M0MyOTMuNDggMy44OSAyODUuNDQgMCAyNzYuNTA1IDBjLTE2LjcwMyAwLTMwLjI5MSAxMy41ODgtMzAuMjkxIDMwLjI5MXY0OC41NDRjOC41NzkgMCAxNS41MzQtNi45NTUgMTUuNTM0LTE1LjUzNHYtMzMuMDFjMC04LjEzNyA2LjYyLTE0Ljc1NyAxNC43NTctMTQuNzU3czE0Ljc1NyA2LjYyIDE0Ljc1NyAxNC43NTd2MzMuMDFjMCA4LjU4IDYuOTU1IDE1LjUzNCAxNS41MzQgMTUuNTM0VjMwLjI5MWMwLTguMTM3IDYuNjItMTQuNzU3IDE0Ljc1Ny0xNC43NTdzMTQuNzU4IDYuNjIgMTQuNzU4IDE0Ljc1N3YzMy4wMWMwIDguNTggNi45NTQgMTUuNTM0IDE1LjUzNCAxNS41MzRWMzAuMjkxWk0yMzguNDQ3IDQwYzAgMjIuMDkxLTE3LjkwOSA0MC00MCA0MHMtNDAtMTcuOTA5LTQwLTQwIDE3LjkwOC00MCA0MC00MCA0MCAxNy45MDkgNDAgNDBabS0xNS41MzQgMGMwLTEzLjUxMi0xMC45NTQtMjQuNDY2LTI0LjQ2Ni0yNC40NjZTMTczLjk4IDI2LjQ4OCAxNzMuOTggNDBzMTAuOTUzIDI0LjQ2NiAyNC40NjYgMjQuNDY2UzIyMi45MTMgNTMuNTEyIDIyMi45MTMgNDBabS03MC42OCAwYzAgMjIuMDkxLTE3LjkwOSA0MC00MCA0MHMtNDAtMTcuOTA5LTQwLTQwIDE3LjkwOS00MCA0MC00MCA0MCAxNy45MDkgNDAgNDBabS0xNS41MzQgMGMwLTEzLjUxMi0xMC45NTQtMjQuNDY2LTI0LjQ2Ni0yNC40NjZTODcuNzY3IDI2LjQ4OCA4Ny43NjcgNDBzMTAuOTU0IDI0LjQ2NiAyNC40NjYgMjQuNDY2UzEzNi42OTkgNTMuNTEyIDEzNi42OTkgNDBaXCIgc3R5bGU9XCJmaWxsOiMwYjVjZmZcIi8+PC9zdmc+YCxcbiAgICAgICAgKX1gLFxuICAgICAgICBwcm92aWRlcklkOiBcInpvb21cIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIFpvb20gYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCxcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL3pvb20udXMvb2F1dGgvYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vem9vbS51cy9vYXV0aC90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnJlZnJlc2hUb2tlblVybCxcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyA/PyBcInVybC1lbmNvZGVkXCIsXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlcyB0aGUgT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzIG9yIHJlZnJlc2hlcyBleGlzdGluZyB0b2tlbnMgaWYgbmVjZXNzYXJ5LlxuICAgKiBJZiB0aGUgY3VycmVudCB0b2tlbiBzZXQgaGFzIGEgcmVmcmVzaCB0b2tlbiBhbmQgaXQgaXMgZXhwaXJlZCwgdGhlbiB0aGUgZnVuY3Rpb24gd2lsbCByZWZyZXNoIHRoZSB0b2tlbnMuXG4gICAqIElmIG5vIHRva2VucyBleGlzdCwgaXQgd2lsbCBpbml0aWF0ZSB0aGUgT0F1dGggYXV0aG9yaXphdGlvbiBwcm9jZXNzIGFuZCBmZXRjaCB0aGUgdG9rZW5zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBhY2Nlc3MgdG9rZW4gb2J0YWluZWQgZnJvbSB0aGUgYXV0aG9yaXphdGlvbiBmbG93LCBvciBudWxsIGlmIHRoZSB0b2tlbiBjb3VsZCBub3QgYmUgb2J0YWluZWQuXG4gICAqL1xuICBhc3luYyBhdXRob3JpemUoKSB7XG4gICAgY29uc3QgY3VycmVudFRva2VuU2V0ID0gYXdhaXQgdGhpcy5jbGllbnQuZ2V0VG9rZW5zKCk7XG4gICAgaWYgKGN1cnJlbnRUb2tlblNldD8uYWNjZXNzVG9rZW4pIHtcbiAgICAgIGlmIChjdXJyZW50VG9rZW5TZXQucmVmcmVzaFRva2VuICYmIGN1cnJlbnRUb2tlblNldC5pc0V4cGlyZWQoKSkge1xuICAgICAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0aGlzLnJlZnJlc2hUb2tlbnMoe1xuICAgICAgICAgIHRva2VuOiBjdXJyZW50VG9rZW5TZXQucmVmcmVzaFRva2VuLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbiB0aGUgY2FzZSB3aGVyZSB0aGUgcmVmcmVzaCB0b2tlbiBmbG93cyBmYWlscywgbm90aGluZyBpcyByZXR1cm5lZCBhbmQgdGhlIGF1dGhvcml6ZSBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW4uXG4gICAgICAgIGlmICh0b2tlbnMpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNsaWVudC5zZXRUb2tlbnModG9rZW5zKTtcbiAgICAgICAgICByZXR1cm4gdG9rZW5zLmFjY2Vzc190b2tlbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnJlbnRUb2tlblNldC5hY2Nlc3NUb2tlbjtcbiAgICB9XG5cbiAgICBjb25zdCBhdXRoUmVxdWVzdCA9IGF3YWl0IHRoaXMuY2xpZW50LmF1dGhvcml6YXRpb25SZXF1ZXN0KHtcbiAgICAgIGVuZHBvaW50OiB0aGlzLmF1dGhvcml6ZVVybCxcbiAgICAgIGNsaWVudElkOiB0aGlzLmNsaWVudElkLFxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICBleHRyYVBhcmFtZXRlcnM6IHRoaXMuZXh0cmFQYXJhbWV0ZXJzLFxuICAgIH0pO1xuXG4gICAgY29uc3QgeyBhdXRob3JpemF0aW9uQ29kZSB9ID0gYXdhaXQgdGhpcy5jbGllbnQuYXV0aG9yaXplKGF1dGhSZXF1ZXN0KTtcbiAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0aGlzLmZldGNoVG9rZW5zKHtcbiAgICAgIGF1dGhSZXF1ZXN0LFxuICAgICAgYXV0aG9yaXphdGlvbkNvZGUsXG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLmNsaWVudC5zZXRUb2tlbnModG9rZW5zKTtcblxuICAgIHJldHVybiB0b2tlbnMuYWNjZXNzX3Rva2VuO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBmZXRjaFRva2Vucyh7XG4gICAgYXV0aFJlcXVlc3QsXG4gICAgYXV0aG9yaXphdGlvbkNvZGUsXG4gIH06IHtcbiAgICBhdXRoUmVxdWVzdDogT0F1dGguQXV0aG9yaXphdGlvblJlcXVlc3Q7XG4gICAgYXV0aG9yaXphdGlvbkNvZGU6IHN0cmluZztcbiAgfSkge1xuICAgIGxldCBvcHRpb25zO1xuICAgIGlmICh0aGlzLmJvZHlFbmNvZGluZyA9PT0gXCJ1cmwtZW5jb2RlZFwiKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHRoaXMuY2xpZW50SWQpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImNvZGVcIiwgYXV0aG9yaXphdGlvbkNvZGUpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImNvZGVfdmVyaWZpZXJcIiwgYXV0aFJlcXVlc3QuY29kZVZlcmlmaWVyKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJncmFudF90eXBlXCIsIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcInJlZGlyZWN0X3VyaVwiLCBhdXRoUmVxdWVzdC5yZWRpcmVjdFVSSSk7XG5cbiAgICAgIG9wdGlvbnMgPSB7IGJvZHk6IHBhcmFtcyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0ge1xuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICAgIGNvZGU6IGF1dGhvcml6YXRpb25Db2RlLFxuICAgICAgICAgIGNvZGVfdmVyaWZpZXI6IGF1dGhSZXF1ZXN0LmNvZGVWZXJpZmllcixcbiAgICAgICAgICBncmFudF90eXBlOiBcImF1dGhvcml6YXRpb25fY29kZVwiLFxuICAgICAgICAgIHJlZGlyZWN0X3VyaTogYXV0aFJlcXVlc3QucmVkaXJlY3RVUkksXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy50b2tlblVybCwgeyBtZXRob2Q6IFwiUE9TVFwiLCAuLi5vcHRpb25zIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJmZXRjaCB0b2tlbnMgZXJyb3I6XCIsIHJlc3BvbnNlVGV4dCk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVycm9yIHdoaWxlIGZldGNoaW5nIHRva2VuczogJHtyZXNwb25zZS5zdGF0dXN9ICgke3Jlc3BvbnNlLnN0YXR1c1RleHR9KVxcbiR7cmVzcG9uc2VUZXh0fWApO1xuICAgIH1cbiAgICBjb25zdCB0b2tlbnMgPSB0aGlzLnRva2VuUmVzcG9uc2VQYXJzZXIoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcblxuICAgIC8vIFNvbWUgY2xpZW50cyBzdWNoIGFzIExpbmVhciBjYW4gcmV0dXJuIGEgc2NvcGUgYXJyYXkgaW5zdGVhZCBvZiBhIHN0cmluZ1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHRva2Vucy5zY29wZSkgPyB7IC4uLnRva2Vucywgc2NvcGU6IHRva2Vucy5zY29wZS5qb2luKFwiIFwiKSB9IDogdG9rZW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZWZyZXNoVG9rZW5zKHsgdG9rZW4gfTogeyB0b2tlbjogc3RyaW5nIH0pIHtcbiAgICBsZXQgb3B0aW9ucztcbiAgICBpZiAodGhpcy5ib2R5RW5jb2RpbmcgPT09IFwidXJsLWVuY29kZWRcIikge1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImNsaWVudF9pZFwiLCB0aGlzLmNsaWVudElkKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJyZWZyZXNoX3Rva2VuXCIsIHRva2VuKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJncmFudF90eXBlXCIsIFwicmVmcmVzaF90b2tlblwiKTtcblxuICAgICAgb3B0aW9ucyA9IHsgYm9keTogcGFyYW1zIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgICAgcmVmcmVzaF90b2tlbjogdG9rZW4sXG4gICAgICAgICAgZ3JhbnRfdHlwZTogXCJyZWZyZXNoX3Rva2VuXCIsXG4gICAgICAgIH0pLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godGhpcy5yZWZyZXNoVG9rZW5VcmwgPz8gdGhpcy50b2tlblVybCwgeyBtZXRob2Q6IFwiUE9TVFwiLCAuLi5vcHRpb25zIH0pO1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJyZWZyZXNoIHRva2VucyBlcnJvcjpcIiwgcmVzcG9uc2VUZXh0KTtcbiAgICAgIC8vIElmIHRoZSByZWZyZXNoIHRva2VuIGlzIGludmFsaWQsIHN0b3AgdGhlIGZsb3cgaGVyZSwgbG9nIG91dCB0aGUgdXNlciBhbmQgcHJvbXB0IHRoZW0gdG8gcmUtYXV0aG9yaXplLlxuICAgICAgdGhpcy5jbGllbnQuZGVzY3JpcHRpb24gPSBgJHt0aGlzLmNsaWVudC5wcm92aWRlck5hbWV9IG5lZWRzIHlvdSB0byBzaWduLWluIGFnYWluLiBQcmVzcyDij44gb3IgY2xpY2sgdGhlIGJ1dHRvbiBiZWxvdyB0byBjb250aW51ZS5gO1xuICAgICAgYXdhaXQgdGhpcy5jbGllbnQucmVtb3ZlVG9rZW5zKCk7XG4gICAgICBhd2FpdCB0aGlzLmF1dGhvcml6ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b2tlblJlc3BvbnNlID0gdGhpcy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcihhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuICAgICAgdG9rZW5SZXNwb25zZS5yZWZyZXNoX3Rva2VuID0gdG9rZW5SZXNwb25zZS5yZWZyZXNoX3Rva2VuID8/IHRva2VuO1xuICAgICAgcmV0dXJuIHRva2VuUmVzcG9uc2U7XG4gICAgfVxuICB9XG59XG4iLCAiZXhwb3J0IGNvbnN0IFBST1ZJREVSX0NMSUVOVF9JRFMgPSB7XG4gIGFzYW5hOiBcIjExOTEyMDE3NDU2ODQzMTJcIixcbiAgZ2l0aHViOiBcIjcyMzVmZThkNDIxNTdmMWYzOGMwXCIsXG4gIGxpbmVhcjogXCJjOGZmMzdiOTIyNWMzYzlhZWZkN2Q2NmVhMGU1YjZmMVwiLFxuICBzbGFjazogXCI4NTE3NTY4ODQ2OTIuNTU0NjkyNzI5MDIxMlwiLFxufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBlbnZpcm9ubWVudCwgT0F1dGggfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgdHlwZSB7IE9BdXRoVHlwZSwgT25BdXRob3JpemVQYXJhbXMgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5sZXQgdG9rZW46IHN0cmluZyB8IG51bGwgPSBudWxsO1xubGV0IHR5cGU6IE9BdXRoVHlwZSB8IG51bGwgPSBudWxsO1xubGV0IGF1dGhvcml6ZTogUHJvbWlzZTxzdHJpbmc+IHwgbnVsbCA9IG51bGw7XG5sZXQgZ2V0SWRUb2tlbjogUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+IHwgbnVsbCA9IG51bGw7XG5sZXQgb25BdXRob3JpemU6IFByb21pc2U8dm9pZD4gfCBudWxsID0gbnVsbDtcblxudHlwZSBXaXRoQWNjZXNzVG9rZW5QYXJhbWV0ZXJzID0ge1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgaW5zdGFuY2Ugb2YgYSBQS0NFIENsaWVudCB0aGF0IHlvdSBjYW4gY3JlYXRlIHVzaW5nIFJheWNhc3QgQVBJLlxuICAgKiBUaGlzIGNsaWVudCBpcyB1c2VkIHRvIHJldHVybiB0aGUgYGlkVG9rZW5gIGFzIHBhcnQgb2YgdGhlIGBvbkF1dGhvcml6ZWAgY2FsbGJhY2suXG4gICAqL1xuICBjbGllbnQ/OiBPQXV0aC5QS0NFQ2xpZW50O1xuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGluaXRpYXRlcyB0aGUgT0F1dGggdG9rZW4gcmV0cmlldmFsIHByb2Nlc3NcbiAgICogQHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYWNjZXNzIHRva2VuLlxuICAgKi9cbiAgYXV0aG9yaXplOiAoKSA9PiBQcm9taXNlPHN0cmluZz47XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBzdHJpbmcgdGhhdCByZXByZXNlbnRzIGFuIGFscmVhZHkgb2J0YWluZWQgcGVyc29uYWwgYWNjZXNzIHRva2VuXG4gICAqL1xuICBwZXJzb25hbEFjY2Vzc1Rva2VuPzogc3RyaW5nO1xuICAvKipcbiAgICogQW4gb3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgb25jZSB0aGUgdXNlciBoYXMgYmVlbiBwcm9wZXJseSBsb2dnZWQgaW4gdGhyb3VnaCBPQXV0aC5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgb2YgdGhlIGNhbGxiYWNrXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnRva2VuIC0gVGhlIHJldHJpZXZlZCBhY2Nlc3MgdG9rZW5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHlwZSAtIFRoZSBhY2Nlc3MgdG9rZW4ncyB0eXBlIChlaXRoZXIgYG9hdXRoYCBvciBgcGVyc29uYWxgKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pZFRva2VuIC0gVGhlIG9wdGlvbmFsIGlkIHRva2VuLiBUaGUgYGlkVG9rZW5gIGlzIHJldHVybmVkIGlmIGBvcHRpb25zLmNsaWVudGAgaXMgcHJvdmlkZWQgYW5kIGlmIGl0J3MgcmV0dXJuZWQgaW4gdGhlIGluaXRpYWwgdG9rZW4gc2V0LlxuICAgKi9cbiAgb25BdXRob3JpemU/OiAocGFyYW1zOiBPbkF1dGhvcml6ZVBhcmFtcykgPT4gdm9pZDtcbn07XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCAoZm9yIGEgdmlldy9tZW51LWJhciBjb21tYW5kcykgb3IgZnVuY3Rpb24gKGZvciBhIG5vLXZpZXcgY29tbWFuZCkgdGhhdCBpcyBwYXNzZWQgdG8gd2l0aEFjY2Vzc1Rva2VuLlxuICovXG5leHBvcnQgdHlwZSBXaXRoQWNjZXNzVG9rZW5Db21wb25lbnRPckZuPFQgPSBhbnksIFUgPSBhbnk+ID0gKChwYXJhbXM6IFQpID0+IFByb21pc2U8VT4gfCBVKSB8IFJlYWN0LkNvbXBvbmVudFR5cGU8VD47XG5cbi8qKlxuICogSGlnaGVyLW9yZGVyIGNvbXBvbmVudCB0byB3cmFwIGEgZ2l2ZW4gY29tcG9uZW50IG9yIGZ1bmN0aW9uIGFuZCBzZXQgYW4gYWNjZXNzIHRva2VuIGluIGEgc2hhcmVkIGdsb2JhbCB2YXJpYWJsZS5cbiAqXG4gKiBUaGUgZnVuY3Rpb24gaW50ZXJjZXB0cyB0aGUgY29tcG9uZW50IHJlbmRlcmluZyBwcm9jZXNzIHRvIGVpdGhlciBmZXRjaCBhbiBPQXV0aCB0b2tlbiBhc3luY2hyb25vdXNseVxuICogb3IgdXNlIGEgcHJvdmlkZWQgcGVyc29uYWwgYWNjZXNzIHRva2VuLiBBIGdsb2JhbCB2YXJpYWJsZSB3aWxsIGJlIHRoZW4gc2V0IHdpdGggdGhlIHJlY2VpdmVkIHRva2VuXG4gKiB0aGF0IHlvdSBjYW4gZ2V0IHdpdGggdGhlIGBnZXRBY2Nlc3NUb2tlbmAgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IERldGFpbCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IE9BdXRoU2VydmljZSwgZ2V0QWNjZXNzVG9rZW4sIHdpdGhBY2Nlc3NUb2tlbiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGNvbnN0IGdpdGh1YiA9IE9BdXRoU2VydmljZS5naXRodWIoeyBzY29wZTogXCJub3RpZmljYXRpb25zIHJlcG8gcmVhZDpvcmcgcmVhZDp1c2VyIHJlYWQ6cHJvamVjdFwiIH0pO1xuICpcbiAqIGZ1bmN0aW9uIEF1dGhvcml6ZWRDb21wb25lbnQoKSB7XG4gKiAgY29uc3QgeyB0b2tlbiB9ID0gZ2V0QWNjZXNzVG9rZW4oKTtcbiAqICAuLi5cbiAqIH1cbiAqXG4gKiBleHBvcnQgZGVmYXVsdCB3aXRoQWNjZXNzVG9rZW4oZ2l0aHViKShBdXRob3JpemVkQ29tcG9uZW50KTtcbiAqIGBgYFxuICpcbiAqIEByZXR1cm5zIHtSZWFjdC5Db21wb25lbnRUeXBlPFQ+fSBUaGUgd3JhcHBlZCBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQWNjZXNzVG9rZW48VCA9IGFueSwgVSA9IGFueT4oXG4gIG9wdGlvbnM6IFdpdGhBY2Nlc3NUb2tlblBhcmFtZXRlcnMsXG4pOiA8ViBleHRlbmRzIFdpdGhBY2Nlc3NUb2tlbkNvbXBvbmVudE9yRm48VCwgVT4+KFxuICBmbk9yQ29tcG9uZW50OiBWLFxuKSA9PiBWIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50VHlwZTxUPiA/IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PFQ+IDogKHByb3BzOiBUKSA9PiBQcm9taXNlPFU+O1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhBY2Nlc3NUb2tlbjxUPihvcHRpb25zOiBXaXRoQWNjZXNzVG9rZW5QYXJhbWV0ZXJzKSB7XG4gIGlmIChlbnZpcm9ubWVudC5jb21tYW5kTW9kZSA9PT0gXCJuby12aWV3XCIpIHtcbiAgICByZXR1cm4gKGZuOiAocHJvcHM6IFQpID0+IFByb21pc2U8dm9pZD4gfCAoKCkgPT4gdm9pZCkpID0+IHtcbiAgICAgIGNvbnN0IG5vVmlld0ZuID0gYXN5bmMgKHByb3BzOiBUKSA9PiB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICB0b2tlbiA9IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbiA/PyAoYXdhaXQgb3B0aW9ucy5hdXRob3JpemUoKSk7XG4gICAgICAgICAgdHlwZSA9IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbiA/IFwicGVyc29uYWxcIiA6IFwib2F1dGhcIjtcbiAgICAgICAgICBjb25zdCBpZFRva2VuID0gKGF3YWl0IG9wdGlvbnMuY2xpZW50Py5nZXRUb2tlbnMoKSk/LmlkVG9rZW47XG5cbiAgICAgICAgICBpZiAob3B0aW9ucy5vbkF1dGhvcml6ZSkge1xuICAgICAgICAgICAgYXdhaXQgUHJvbWlzZS5yZXNvbHZlKG9wdGlvbnMub25BdXRob3JpemUoeyB0b2tlbiwgdHlwZSwgaWRUb2tlbiB9KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZuKHByb3BzKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBub1ZpZXdGbjtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIChDb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudFR5cGU8VD4pID0+IHtcbiAgICBjb25zdCBXcmFwcGVkQ29tcG9uZW50OiBSZWFjdC5Db21wb25lbnRUeXBlPFQ+ID0gKHByb3BzKSA9PiB7XG4gICAgICBpZiAob3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIHRva2VuID0gb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuO1xuICAgICAgICB0eXBlID0gXCJwZXJzb25hbFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFhdXRob3JpemUpIHtcbiAgICAgICAgICBhdXRob3JpemUgPSBvcHRpb25zLmF1dGhvcml6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuID0gUmVhY3QudXNlKGF1dGhvcml6ZSk7XG4gICAgICAgIHR5cGUgPSBcIm9hdXRoXCI7XG4gICAgICB9XG5cbiAgICAgIGxldCBpZFRva2VuOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAob3B0aW9ucy5jbGllbnQpIHtcbiAgICAgICAgaWYgKCFnZXRJZFRva2VuKSB7XG4gICAgICAgICAgZ2V0SWRUb2tlbiA9IG9wdGlvbnMuY2xpZW50Py5nZXRUb2tlbnMoKS50aGVuKCh0b2tlbnMpID0+IHRva2Vucz8uaWRUb2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgaWRUb2tlbiA9IFJlYWN0LnVzZShnZXRJZFRva2VuKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMub25BdXRob3JpemUpIHtcbiAgICAgICAgaWYgKCFvbkF1dGhvcml6ZSkge1xuICAgICAgICAgIG9uQXV0aG9yaXplID0gUHJvbWlzZS5yZXNvbHZlKG9wdGlvbnMub25BdXRob3JpemUoeyB0b2tlbjogdG9rZW4hLCB0eXBlLCBpZFRva2VuIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBSZWFjdC51c2Uob25BdXRob3JpemUpO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAvLyBAdHMtaWdub3JlIHRvbyBjb21wbGljYXRlZCBmb3IgVFNcbiAgICAgIHJldHVybiA8Q29tcG9uZW50IHsuLi5wcm9wc30gLz47XG4gICAgfTtcblxuICAgIFdyYXBwZWRDb21wb25lbnQuZGlzcGxheU5hbWUgPSBgd2l0aEFjY2Vzc1Rva2VuKCR7Q29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvbmVudC5uYW1lfSlgO1xuXG4gICAgcmV0dXJuIFdyYXBwZWRDb21wb25lbnQ7XG4gIH07XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYWNjZXNzIHRva2VuIGFuZCBpdHMgdHlwZS4gTm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gbXVzdCBiZSBjYWxsZWQgaW4gYSBjb21wb25lbnQgd3JhcHBlZCB3aXRoIGB3aXRoQWNjZXNzVG9rZW5gLlxuICpcbiAqIFdpbGwgdGhyb3cgYW4gRXJyb3IgaWYgY2FsbGVkIG91dHNpZGUgb2YgYSBmdW5jdGlvbiBvciBjb21wb25lbnQgd3JhcHBlZCB3aXRoIGB3aXRoQWNjZXNzVG9rZW5gXG4gKlxuICogQHJldHVybnMge3sgdG9rZW46IHN0cmluZywgdHlwZTogXCJvYXV0aFwiIHwgXCJwZXJzb25hbFwiIH19IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBgdG9rZW5gXG4gKiBhbmQgaXRzIGB0eXBlYCwgd2hlcmUgdHlwZSBjYW4gYmUgZWl0aGVyICdvYXV0aCcgZm9yIE9BdXRoIHRva2VucyBvciAncGVyc29uYWwnIGZvciBhXG4gKiBwZXJzb25hbCBhY2Nlc3MgdG9rZW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY2Nlc3NUb2tlbigpOiB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIC8qKiBgb2F1dGhgIGZvciBPQXV0aCB0b2tlbnMgb3IgYHBlcnNvbmFsYCBmb3IgcGVyc29uYWwgYWNjZXNzIHRva2VuICovXG4gIHR5cGU6IFwib2F1dGhcIiB8IFwicGVyc29uYWxcIjtcbn0ge1xuICBpZiAoIXRva2VuIHx8ICF0eXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2V0QWNjZXNzVG9rZW4gbXVzdCBiZSB1c2VkIHdoZW4gYXV0aGVudGljYXRlZCAoZWcuIHVzZWQgaW5zaWRlIGB3aXRoQWNjZXNzVG9rZW5gKVwiKTtcbiAgfVxuXG4gIHJldHVybiB7IHRva2VuLCB0eXBlIH07XG59XG4iLCAiaW1wb3J0IHsgZW52aXJvbm1lbnQsIExhdW5jaFByb3BzLCBMYXVuY2hUeXBlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IGZzIGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5cbmV4cG9ydCBlbnVtIERlZXBsaW5rVHlwZSB7XG4gIC8qKiBBIHNjcmlwdCBjb21tYW5kICovXG4gIFNjcmlwdENvbW1hbmQgPSBcInNjcmlwdC1jb21tYW5kXCIsXG4gIC8qKiBBbiBleHRlbnNpb24gY29tbWFuZCAqL1xuICBFeHRlbnNpb24gPSBcImV4dGVuc2lvblwiLFxufVxuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgZGVlcGxpbmsgdG8gYSBzY3JpcHQgY29tbWFuZC5cbiAqL1xuZXhwb3J0IHR5cGUgQ3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rT3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIGRlZXBsaW5rLCB3aGljaCBzaG91bGQgYmUgXCJzY3JpcHQtY29tbWFuZFwiLlxuICAgKi9cbiAgdHlwZTogRGVlcGxpbmtUeXBlLlNjcmlwdENvbW1hbmQ7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgY29tbWFuZC5cbiAgICovXG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgLyoqXG4gICAqIElmIHRoZSBjb21tYW5kIGFjY2VwdHMgYXJndW1lbnRzLCB0aGV5IGNhbiBiZSBwYXNzZWQgdXNpbmcgdGhpcyBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqL1xuICBhcmd1bWVudHM/OiBzdHJpbmdbXTtcbn07XG5cbi8qKlxuICogQmFzZSBvcHRpb25zIGZvciBjcmVhdGluZyBhIGRlZXBsaW5rIHRvIGFuIGV4dGVuc2lvbi5cbiAqL1xuZXhwb3J0IHR5cGUgQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtCYXNlT3B0aW9ucyA9IHtcbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIGRlZXBsaW5rLCB3aGljaCBzaG91bGQgYmUgXCJleHRlbnNpb25cIi5cbiAgICovXG4gIHR5cGU/OiBEZWVwbGlua1R5cGUuRXh0ZW5zaW9uO1xuICAvKipcbiAgICogVGhlIGNvbW1hbmQgYXNzb2NpYXRlZCB3aXRoIHRoZSBleHRlbnNpb24uXG4gICAqL1xuICBjb21tYW5kOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFaXRoZXIgXCJ1c2VySW5pdGlhdGVkXCIsIHdoaWNoIHJ1bnMgdGhlIGNvbW1hbmQgaW4gdGhlIGZvcmVncm91bmQsIG9yIFwiYmFja2dyb3VuZFwiLCB3aGljaCBza2lwcyBicmluZ2luZyBSYXljYXN0IHRvIHRoZSBmcm9udC5cbiAgICovXG4gIGxhdW5jaFR5cGU/OiBMYXVuY2hUeXBlO1xuICAvKipcbiAgICogSWYgdGhlIGNvbW1hbmQgYWNjZXB0cyBhcmd1bWVudHMsIHRoZXkgY2FuIGJlIHBhc3NlZCB1c2luZyB0aGlzIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICovXG4gIGFyZ3VtZW50cz86IExhdW5jaFByb3BzW1wiYXJndW1lbnRzXCJdO1xuICAvKipcbiAgICogSWYgdGhlIGNvbW1hbmQgbWFrZSB1c2Ugb2YgTGF1bmNoQ29udGV4dCwgaXQgY2FuIGJlIHBhc3NlZCB1c2luZyB0aGlzIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICovXG4gIGNvbnRleHQ/OiBMYXVuY2hQcm9wc1tcImxhdW5jaENvbnRleHRcIl07XG4gIC8qKlxuICAgKiBTb21lIHRleHQgdG8gcHJlZmlsbCB0aGUgc2VhcmNoIGJhciBvciBmaXJzdCB0ZXh0IGlucHV0IG9mIHRoZSBjb21tYW5kXG4gICAqL1xuICBmYWxsYmFja1RleHQ/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgZGVlcGxpbmsgdG8gYW4gZXh0ZW5zaW9uIGZyb20gYW5vdGhlciBleHRlbnNpb24uXG4gKiBSZXF1aXJlcyBib3RoIHRoZSBvd25lck9yQXV0aG9yTmFtZSBhbmQgZXh0ZW5zaW9uTmFtZS5cbiAqL1xuZXhwb3J0IHR5cGUgQ3JlYXRlSW50ZXJFeHRlbnNpb25EZWVwbGlua09wdGlvbnMgPSBDcmVhdGVFeHRlbnNpb25EZWVwbGlua0Jhc2VPcHRpb25zICYge1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG93bmVyIG9yIGF1dGhvciBvZiB0aGUgZXh0ZW5zaW9uLlxuICAgKi9cbiAgb3duZXJPckF1dGhvck5hbWU6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBleHRlbnNpb24uXG4gICAqL1xuICBleHRlbnNpb25OYW1lOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIE9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgZGVlcGxpbmsgdG8gYW4gZXh0ZW5zaW9uLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdGVFeHRlbnNpb25EZWVwbGlua09wdGlvbnMgPSBDcmVhdGVJbnRlckV4dGVuc2lvbkRlZXBsaW5rT3B0aW9ucyB8IENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rQmFzZU9wdGlvbnM7XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBkZWVwbGluay5cbiAqL1xuZXhwb3J0IHR5cGUgQ3JlYXRlRGVlcGxpbmtPcHRpb25zID0gQ3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rT3B0aW9ucyB8IENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rT3B0aW9ucztcblxuZnVuY3Rpb24gZ2V0UHJvdG9jb2woKSB7XG4gIHJldHVybiBlbnZpcm9ubWVudC5yYXljYXN0VmVyc2lvbi5pbmNsdWRlcyhcImFscGhhXCIpID8gXCJyYXljYXN0aW50ZXJuYWw6Ly9cIiA6IFwicmF5Y2FzdDovL1wiO1xufVxuXG5mdW5jdGlvbiBnZXRPd25lck9yQXV0aG9yTmFtZSgpIHtcbiAgY29uc3QgcGFja2FnZUpTT04gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZW52aXJvbm1lbnQuYXNzZXRzUGF0aCwgXCIuLlwiLCBcInBhY2thZ2UuanNvblwiKSwgXCJ1dGY4XCIpKTtcbiAgcmV0dXJuIHBhY2thZ2VKU09OLm93bmVyIHx8IHBhY2thZ2VKU09OLmF1dGhvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGluayhvcHRpb25zOiBDcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmtPcHRpb25zKTogc3RyaW5nIHtcbiAgbGV0IHVybCA9IGAke2dldFByb3RvY29sKCl9c2NyaXB0LWNvbW1hbmRzLyR7b3B0aW9ucy5jb21tYW5kfWA7XG5cbiAgaWYgKG9wdGlvbnMuYXJndW1lbnRzKSB7XG4gICAgbGV0IHBhcmFtcyA9IFwiXCI7XG4gICAgZm9yIChjb25zdCBhcmcgb2Ygb3B0aW9ucy5hcmd1bWVudHMpIHtcbiAgICAgIHBhcmFtcyArPSBcIiZhcmd1bWVudHM9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoYXJnKTtcbiAgICB9XG4gICAgdXJsICs9IFwiP1wiICsgcGFyYW1zLnN1YnN0cmluZygxKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFeHRlbnNpb25EZWVwbGluayhvcHRpb25zOiBDcmVhdGVFeHRlbnNpb25EZWVwbGlua09wdGlvbnMpOiBzdHJpbmcge1xuICBsZXQgb3duZXJPckF1dGhvck5hbWUgPSBnZXRPd25lck9yQXV0aG9yTmFtZSgpO1xuICBsZXQgZXh0ZW5zaW9uTmFtZSA9IGVudmlyb25tZW50LmV4dGVuc2lvbk5hbWU7XG5cbiAgaWYgKFwib3duZXJPckF1dGhvck5hbWVcIiBpbiBvcHRpb25zICYmIFwiZXh0ZW5zaW9uTmFtZVwiIGluIG9wdGlvbnMpIHtcbiAgICBvd25lck9yQXV0aG9yTmFtZSA9IG9wdGlvbnMub3duZXJPckF1dGhvck5hbWU7XG4gICAgZXh0ZW5zaW9uTmFtZSA9IG9wdGlvbnMuZXh0ZW5zaW9uTmFtZTtcbiAgfVxuXG4gIGxldCB1cmwgPSBgJHtnZXRQcm90b2NvbCgpfWV4dGVuc2lvbnMvJHtvd25lck9yQXV0aG9yTmFtZX0vJHtleHRlbnNpb25OYW1lfS8ke29wdGlvbnMuY29tbWFuZH1gO1xuXG4gIGxldCBwYXJhbXMgPSBcIlwiO1xuICBpZiAob3B0aW9ucy5sYXVuY2hUeXBlKSB7XG4gICAgcGFyYW1zICs9IFwiJmxhdW5jaFR5cGU9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5sYXVuY2hUeXBlKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmFyZ3VtZW50cykge1xuICAgIHBhcmFtcyArPSBcIiZhcmd1bWVudHM9XCIgKyBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5hcmd1bWVudHMpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmNvbnRleHQpIHtcbiAgICBwYXJhbXMgKz0gXCImY29udGV4dD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShvcHRpb25zLmNvbnRleHQpKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmZhbGxiYWNrVGV4dCkge1xuICAgIHBhcmFtcyArPSBcIiZmYWxsYmFja1RleHQ9XCIgKyBlbmNvZGVVUklDb21wb25lbnQob3B0aW9ucy5mYWxsYmFja1RleHQpO1xuICB9XG5cbiAgaWYgKHBhcmFtcykge1xuICAgIHVybCArPSBcIj9cIiArIHBhcmFtcy5zdWJzdHJpbmcoMSk7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWVwbGluayB0byBhIHNjcmlwdCBjb21tYW5kIG9yIGV4dGVuc2lvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlZXBsaW5rKG9wdGlvbnM6IENyZWF0ZURlZXBsaW5rT3B0aW9ucyk6IHN0cmluZyB7XG4gIGlmIChvcHRpb25zLnR5cGUgPT09IERlZXBsaW5rVHlwZS5TY3JpcHRDb21tYW5kKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGluayhvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmsob3B0aW9ucyk7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBiYXNlRXhlY3V0ZVNRTCB9IGZyb20gXCIuL3NxbC11dGlsc1wiO1xuXG4vKipcbiAqIEV4ZWN1dGVzIGEgU1FMIHF1ZXJ5IG9uIGEgbG9jYWwgU1FMaXRlIGRhdGFiYXNlIGFuZCByZXR1cm5zIHRoZSBxdWVyeSByZXN1bHQgaW4gSlNPTiBmb3JtYXQuXG4gKlxuICogQHBhcmFtIGRhdGFiYXNlUGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBTUUxpdGUgZGF0YWJhc2UgZmlsZS5cbiAqIEBwYXJhbSBxdWVyeSAtIFRoZSBTUUwgcXVlcnkgdG8gZXhlY3V0ZS5cbiAqIEByZXR1cm5zIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IG9mIG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBxdWVyeSByZXN1bHRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBjbG9zZU1haW5XaW5kb3csIENsaXBib2FyZCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IGV4ZWN1dGVTUUwgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiB0eXBlIE1lc3NhZ2UgPSB7IGJvZHk6IHN0cmluZzsgY29kZTogc3RyaW5nIH07XG4gKlxuICogY29uc3QgREJfUEFUSCA9IFwiL3BhdGgvdG8vY2hhdC5kYlwiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHF1ZXJ5ID0gYFNFTEVDVCBib2R5LCBjb2RlIEZST00gLi4uYFxuICpcbiAqICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBleGVjdXRlU1FMPE1lc3NhZ2U+KERCX1BBVEgsIHF1ZXJ5KTtcbiAqXG4gKiAgIGlmIChtZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gKiAgICAgY29uc3QgbGF0ZXN0Q29kZSA9IG1lc3NhZ2VzWzBdLmNvZGU7XG4gKiAgICAgYXdhaXQgQ2xpcGJvYXJkLnBhc3RlKGxhdGVzdENvZGUpO1xuICogICAgIGF3YWl0IGNsb3NlTWFpbldpbmRvdygpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVTUUw8VCA9IHVua25vd24+KGRhdGFiYXNlUGF0aDogc3RyaW5nLCBxdWVyeTogc3RyaW5nKSB7XG4gIHJldHVybiBiYXNlRXhlY3V0ZVNRTDxUPihkYXRhYmFzZVBhdGgsIHF1ZXJ5KTtcbn1cbiIsICJpbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7XG4gIGRlZmF1bHRQYXJzaW5nLFxuICBnZXRTcGF3bmVkUHJvbWlzZSxcbiAgZ2V0U3Bhd25lZFJlc3VsdCxcbiAgaGFuZGxlT3V0cHV0LFxuICBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyLFxufSBmcm9tIFwiLi9leGVjLXV0aWxzXCI7XG5cbnR5cGUgQXBwbGVTY3JpcHRPcHRpb25zID0ge1xuICAvKipcbiAgICogQnkgZGVmYXVsdCwgYHJ1bkFwcGxlU2NyaXB0YCByZXR1cm5zIGl0cyByZXN1bHRzIGluIGh1bWFuLXJlYWRhYmxlIGZvcm06IHN0cmluZ3MgZG8gbm90IGhhdmUgcXVvdGVzIGFyb3VuZCB0aGVtLCBjaGFyYWN0ZXJzIGFyZSBub3QgZXNjYXBlZCwgYnJhY2VzIGZvciBsaXN0cyBhbmQgcmVjb3JkcyBhcmUgb21pdHRlZCwgZXRjLiBUaGlzIGlzIGdlbmVyYWxseSBtb3JlIHVzZWZ1bCwgYnV0IGNhbiBpbnRyb2R1Y2UgYW1iaWd1aXRpZXMuIEZvciBleGFtcGxlLCB0aGUgbGlzdHMgYHtcImZvb1wiLCBcImJhclwifWAgYW5kIGB7e1wiZm9vXCIsIHtcImJhclwifX19YCB3b3VsZCBib3RoIGJlIGRpc3BsYXllZCBhcyDigJhmb28sIGJhcuKAmS4gVG8gc2VlIHRoZSByZXN1bHRzIGluIGFuIHVuYW1iaWd1b3VzIGZvcm0gdGhhdCBjb3VsZCBiZSByZWNvbXBpbGVkIGludG8gdGhlIHNhbWUgdmFsdWUsIHNldCBgaHVtYW5SZWFkYWJsZU91dHB1dGAgdG8gYGZhbHNlYC5cbiAgICpcbiAgICogQGRlZmF1bHQgdHJ1ZVxuICAgKi9cbiAgaHVtYW5SZWFkYWJsZU91dHB1dD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBzY3JpcHQgaXMgdXNpbmcgW2BBcHBsZVNjcmlwdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L2FyY2hpdmUvZG9jdW1lbnRhdGlvbi9BcHBsZVNjcmlwdC9Db25jZXB0dWFsL0FwcGxlU2NyaXB0TGFuZ0d1aWRlL2ludHJvZHVjdGlvbi9BU0xSX2ludHJvLmh0bWwjLy9hcHBsZV9yZWYvZG9jL3VpZC9UUDQwMDAwOTgzKSBvciBbYEphdmFTY3JpcHRgXShodHRwczovL2RldmVsb3Blci5hcHBsZS5jb20vbGlicmFyeS9hcmNoaXZlL3JlbGVhc2Vub3Rlcy9JbnRlcmFwcGxpY2F0aW9uQ29tbXVuaWNhdGlvbi9STi1KYXZhU2NyaXB0Rm9yQXV0b21hdGlvbi9BcnRpY2xlcy9JbnRyb2R1Y3Rpb24uaHRtbCMvL2FwcGxlX3JlZi9kb2MvdWlkL1RQNDAwMTQ1MDgtQ0gxMTEtU1cxKS5cbiAgICpcbiAgICogQGRlZmF1bHQgXCJBcHBsZVNjcmlwdFwiXG4gICAqL1xuICBsYW5ndWFnZT86IFwiQXBwbGVTY3JpcHRcIiB8IFwiSmF2YVNjcmlwdFwiO1xuICAvKipcbiAgICogQSBTaWduYWwgb2JqZWN0IHRoYXQgYWxsb3dzIHlvdSB0byBhYm9ydCB0aGUgcmVxdWVzdCBpZiByZXF1aXJlZCB2aWEgYW4gQWJvcnRDb250cm9sbGVyIG9iamVjdC5cbiAgICovXG4gIHNpZ25hbD86IEFib3J0U2lnbmFsO1xuICAvKiogSWYgdGltZW91dCBpcyBncmVhdGVyIHRoYW4gYDBgLCB0aGUgcGFyZW50IHdpbGwgc2VuZCB0aGUgc2lnbmFsIGBTSUdURVJNYCBpZiB0aGUgY2hpbGQgcnVucyBsb25nZXIgdGhhbiB0aW1lb3V0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQGRlZmF1bHQgMTAwMDBcbiAgICovXG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIGFuIEFwcGxlU2NyaXB0IHNjcmlwdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgc2hvd0hVRCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHJ1bkFwcGxlU2NyaXB0LCBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICogICB0cnkge1xuICogICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJ1bkFwcGxlU2NyaXB0KFxuICogICAgICAgYFxuICogICAgICAgb24gcnVuIGFyZ3ZcbiAqICAgICAgICAgcmV0dXJuIFwiaGVsbG8sIFwiICYgaXRlbSAxIG9mIGFyZ3YgJiBcIi5cIlxuICogICAgICAgZW5kIHJ1blxuICogICAgICAgYCxcbiAqICAgICAgIFtcIndvcmxkXCJdXG4gKiAgICAgKTtcbiAqICAgICBhd2FpdCBzaG93SFVEKHJlcyk7XG4gKiAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgICAgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwgeyB0aXRsZTogXCJDb3VsZCBub3QgcnVuIEFwcGxlU2NyaXB0XCIgfSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuQXBwbGVTY3JpcHQ8VCA9IHN0cmluZz4oXG4gIHNjcmlwdDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBwbGVTY3JpcHRPcHRpb25zICYge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEFwcGxlU2NyaXB0T3B0aW9ucz47XG4gIH0sXG4pOiBQcm9taXNlPHN0cmluZz47XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuQXBwbGVTY3JpcHQ8VCA9IHN0cmluZz4oXG4gIHNjcmlwdDogc3RyaW5nLFxuICAvKipcbiAgICogVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBzY3JpcHQuXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXSxcbiAgb3B0aW9ucz86IEFwcGxlU2NyaXB0T3B0aW9ucyAmIHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBBcHBsZVNjcmlwdE9wdGlvbnM+O1xuICB9LFxuKTogUHJvbWlzZTxzdHJpbmc+O1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0PFQgPSBzdHJpbmc+KFxuICBzY3JpcHQ6IHN0cmluZyxcbiAgb3B0aW9uc09yQXJncz86XG4gICAgfCBzdHJpbmdbXVxuICAgIHwgKEFwcGxlU2NyaXB0T3B0aW9ucyAmIHtcbiAgICAgICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgQXBwbGVTY3JpcHRPcHRpb25zPjtcbiAgICAgIH0pLFxuICBvcHRpb25zPzogQXBwbGVTY3JpcHRPcHRpb25zICYge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEFwcGxlU2NyaXB0T3B0aW9ucz47XG4gIH0sXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJkYXJ3aW5cIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFwcGxlU2NyaXB0IGlzIG9ubHkgc3VwcG9ydGVkIG9uIG1hY09TXCIpO1xuICB9XG5cbiAgY29uc3QgeyBodW1hblJlYWRhYmxlT3V0cHV0LCBsYW5ndWFnZSwgdGltZW91dCwgLi4uZXhlY09wdGlvbnMgfSA9IEFycmF5LmlzQXJyYXkob3B0aW9uc09yQXJncylcbiAgICA/IG9wdGlvbnMgfHwge31cbiAgICA6IG9wdGlvbnNPckFyZ3MgfHwge307XG5cbiAgY29uc3Qgb3V0cHV0QXJndW1lbnRzID0gaHVtYW5SZWFkYWJsZU91dHB1dCAhPT0gZmFsc2UgPyBbXSA6IFtcIi1zc1wiXTtcbiAgaWYgKGxhbmd1YWdlID09PSBcIkphdmFTY3JpcHRcIikge1xuICAgIG91dHB1dEFyZ3VtZW50cy5wdXNoKFwiLWxcIiwgXCJKYXZhU2NyaXB0XCIpO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnNPckFyZ3MpKSB7XG4gICAgb3V0cHV0QXJndW1lbnRzLnB1c2goXCItXCIsIC4uLm9wdGlvbnNPckFyZ3MpO1xuICB9XG5cbiAgY29uc3Qgc3Bhd25lZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bihcIm9zYXNjcmlwdFwiLCBvdXRwdXRBcmd1bWVudHMsIHtcbiAgICAuLi5leGVjT3B0aW9ucyxcbiAgICBlbnY6IHsgUEFUSDogXCIvdXNyL2xvY2FsL2JpbjovdXNyL2JpbjovYmluOi91c3Ivc2Jpbjovc2JpblwiIH0sXG4gIH0pO1xuICBjb25zdCBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQsIHsgdGltZW91dDogdGltZW91dCA/PyAxMDAwMCB9KTtcblxuICBzcGF3bmVkLnN0ZGluLmVuZChzY3JpcHQpO1xuXG4gIGNvbnN0IFt7IGVycm9yLCBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dCB9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0PHN0cmluZz4oXG4gICAgc3Bhd25lZCxcbiAgICB7IGVuY29kaW5nOiBcInV0ZjhcIiB9LFxuICAgIHNwYXduZWRQcm9taXNlLFxuICApO1xuICBjb25zdCBzdGRvdXQgPSBoYW5kbGVPdXRwdXQoeyBzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSB9LCBzdGRvdXRSZXN1bHQpO1xuICBjb25zdCBzdGRlcnIgPSBoYW5kbGVPdXRwdXQoeyBzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSB9LCBzdGRlcnJSZXN1bHQpO1xuXG4gIHJldHVybiBkZWZhdWx0UGFyc2luZyh7XG4gICAgc3Rkb3V0LFxuICAgIHN0ZGVycixcbiAgICBlcnJvcixcbiAgICBleGl0Q29kZSxcbiAgICBzaWduYWwsXG4gICAgdGltZWRPdXQsXG4gICAgY29tbWFuZDogXCJvc2FzY3JpcHRcIixcbiAgICBvcHRpb25zLFxuICAgIHBhcmVudEVycm9yOiBuZXcgRXJyb3IoKSxcbiAgfSk7XG59XG4iLCAiaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0UGFyc2luZyxcbiAgZ2V0U3Bhd25lZFByb21pc2UsXG4gIGdldFNwYXduZWRSZXN1bHQsXG4gIGhhbmRsZU91dHB1dCxcbiAgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcixcbn0gZnJvbSBcIi4vZXhlYy11dGlsc1wiO1xuXG50eXBlIFBvd2VyU2hlbGxTY3JpcHRPcHRpb25zID0ge1xuICAvKipcbiAgICogQSBTaWduYWwgb2JqZWN0IHRoYXQgYWxsb3dzIHlvdSB0byBhYm9ydCB0aGUgcmVxdWVzdCBpZiByZXF1aXJlZCB2aWEgYW4gQWJvcnRDb250cm9sbGVyIG9iamVjdC5cbiAgICovXG4gIHNpZ25hbD86IEFib3J0U2lnbmFsO1xuICAvKiogSWYgdGltZW91dCBpcyBncmVhdGVyIHRoYW4gYDBgLCB0aGUgcGFyZW50IHdpbGwgc2VuZCB0aGUgc2lnbmFsIGBTSUdURVJNYCBpZiB0aGUgY2hpbGQgcnVucyBsb25nZXIgdGhhbiB0aW1lb3V0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQGRlZmF1bHQgMTAwMDBcbiAgICovXG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGVzIGEgUG93ZXJTaGVsbCBzY3JpcHQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IHNob3dIVUQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyBydW5Qb3dlclNoZWxsU2NyaXB0LCBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICogICB0cnkge1xuICogICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJ1blBvd2VyU2hlbGxTY3JpcHQoXG4gKiAgICAgICBgXG4gKiAgICAgICBXcml0ZS1Ib3N0IFwiaGVsbG8sIHdvcmxkLlwiXG4gKiAgICAgICBgLFxuICogICAgICk7XG4gKiAgICAgYXdhaXQgc2hvd0hVRChyZXMpO1xuICogICB9IGNhdGNoIChlcnJvcikge1xuICogICAgIHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHsgdGl0bGU6IFwiQ291bGQgbm90IHJ1biBQb3dlclNoZWxsXCIgfSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuUG93ZXJTaGVsbFNjcmlwdDxUID0gc3RyaW5nPihcbiAgc2NyaXB0OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBQb3dlclNoZWxsU2NyaXB0T3B0aW9ucyAmIHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBQb3dlclNoZWxsU2NyaXB0T3B0aW9ucz47XG4gIH0sXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gXCJ3aW4zMlwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiUG93ZXJTaGVsbCBpcyBvbmx5IHN1cHBvcnRlZCBvbiBXaW5kb3dzXCIpO1xuICB9XG5cbiAgY29uc3QgeyB0aW1lb3V0LCAuLi5leGVjT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCBvdXRwdXRBcmd1bWVudHMgPSBbXCItTm9Mb2dvXCIsIFwiLU5vUHJvZmlsZVwiLCBcIi1Ob25JbnRlcmFjdGl2ZVwiLCBcIi1Db21tYW5kXCIsIFwiLVwiXTtcblxuICBjb25zdCBzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKFwicG93ZXJzaGVsbC5leGVcIiwgb3V0cHV0QXJndW1lbnRzLCB7XG4gICAgLi4uZXhlY09wdGlvbnMsXG4gIH0pO1xuICBjb25zdCBzcGF3bmVkUHJvbWlzZSA9IGdldFNwYXduZWRQcm9taXNlKHNwYXduZWQsIHsgdGltZW91dDogdGltZW91dCA/PyAxMDAwMCB9KTtcblxuICBzcGF3bmVkLnN0ZGluLmVuZChzY3JpcHQpO1xuXG4gIGNvbnN0IFt7IGVycm9yLCBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dCB9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0PHN0cmluZz4oXG4gICAgc3Bhd25lZCxcbiAgICB7IGVuY29kaW5nOiBcInV0ZjhcIiB9LFxuICAgIHNwYXduZWRQcm9taXNlLFxuICApO1xuICBjb25zdCBzdGRvdXQgPSBoYW5kbGVPdXRwdXQoeyBzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSB9LCBzdGRvdXRSZXN1bHQpO1xuICBjb25zdCBzdGRlcnIgPSBoYW5kbGVPdXRwdXQoeyBzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSB9LCBzdGRlcnJSZXN1bHQpO1xuXG4gIHJldHVybiBkZWZhdWx0UGFyc2luZyh7XG4gICAgc3Rkb3V0LFxuICAgIHN0ZGVycixcbiAgICBlcnJvcixcbiAgICBleGl0Q29kZSxcbiAgICBzaWduYWwsXG4gICAgdGltZWRPdXQsXG4gICAgY29tbWFuZDogXCJwb3dlcnNoZWxsLmV4ZVwiLFxuICAgIG9wdGlvbnMsXG4gICAgcGFyZW50RXJyb3I6IG5ldyBFcnJvcigpLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBDYWNoZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGhhc2gsIHJlcGxhY2VyLCByZXZpdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG4vKipcbiAqIFdyYXBzIGEgZnVuY3Rpb24gd2l0aCBjYWNoaW5nIGZ1bmN0aW9uYWxpdHkgdXNpbmcgUmF5Y2FzdCdzIENhY2hlIEFQSS5cbiAqIEFsbG93cyBmb3IgY2FjaGluZyBvZiBleHBlbnNpdmUgZnVuY3Rpb25zIGxpa2UgcGFnaW5hdGVkIEFQSSBjYWxscyB0aGF0IHJhcmVseSBjaGFuZ2UuXG4gKlxuICogQHBhcmFtIGZuIC0gVGhlIGFzeW5jIGZ1bmN0aW9uIHRvIGNhY2hlIHJlc3VsdHMgZnJvbVxuICogQHBhcmFtIG9wdGlvbnMgLSBPcHRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgY2FjaGUgYmVoYXZpb3JcbiAqIEBwYXJhbSBvcHRpb25zLnZhbGlkYXRlIC0gT3B0aW9uYWwgdmFsaWRhdGlvbiBmdW5jdGlvbiBmb3IgY2FjaGVkIGRhdGFcbiAqIEBwYXJhbSBvcHRpb25zLm1heEFnZSAtIE1heGltdW0gYWdlIG9mIGNhY2hlZCBkYXRhIGluIG1pbGxpc2Vjb25kc1xuICogQHJldHVybnMgQW4gYXN5bmMgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSByZXN1bHQgb2YgdGhlIGZ1bmN0aW9uLCBlaXRoZXIgZnJvbSBjYWNoZSBvciBmcmVzaCBleGVjdXRpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGNvbnN0IGNhY2hlZEZ1bmN0aW9uID0gd2l0aENhY2hlKGZldGNoRXhwZW5zaXZlRGF0YSwge1xuICogICBtYXhBZ2U6IDUgKiA2MCAqIDEwMDAgLy8gQ2FjaGUgZm9yIDUgbWludXRlc1xuICogfSk7XG4gKlxuICogY29uc3QgcmVzdWx0ID0gYXdhaXQgY2FjaGVkRnVuY3Rpb24ocXVlcnkpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoQ2FjaGU8Rm4gZXh0ZW5kcyAoLi4uYXJnczogYW55KSA9PiBQcm9taXNlPGFueT4+KFxuICBmbjogRm4sXG4gIG9wdGlvbnM/OiB7XG4gICAgLyoqIGZ1bmN0aW9uIHRoYXQgcmVjZWl2ZXMgdGhlIGNhY2hlZCBkYXRhIGFuZCByZXR1cm5zIGEgYm9vbGVhbiBkZXBlbmRpbmcgb24gd2hldGhlciB0aGUgZGF0YSBpcyBzdGlsbCB2YWxpZCBvciBub3QuICovXG4gICAgdmFsaWRhdGU/OiAoZGF0YTogQXdhaXRlZDxSZXR1cm5UeXBlPEZuPj4pID0+IGJvb2xlYW47XG4gICAgLyoqIE1heGltdW0gYWdlIG9mIGNhY2hlZCBkYXRhIGluIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCB0aGUgZGF0YSB3aWxsIGJlIGNvbnNpZGVyZWQgaW52YWxpZCAqL1xuICAgIG1heEFnZT86IG51bWJlcjtcbiAgfSxcbik6IEZuICYgeyBjbGVhckNhY2hlOiAoKSA9PiB2b2lkIH0ge1xuICBjb25zdCBjYWNoZSA9IG5ldyBDYWNoZSh7IG5hbWVzcGFjZTogaGFzaChmbikgfSk7XG5cbiAgY29uc3Qgd3JhcHBlZEZuID0gYXN5bmMgKC4uLmFyZ3M6IFBhcmFtZXRlcnM8Rm4+KSA9PiB7XG4gICAgY29uc3Qga2V5ID1cbiAgICAgIGhhc2goYXJncyB8fCBbXSkgKyAob3B0aW9ucyBhcyB1bmtub3duIGFzIHsgaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXg/OiBzdHJpbmcgfSk/LmludGVybmFsX2NhY2hlS2V5U3VmZml4O1xuICAgIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChrZXkpO1xuICAgIGlmIChjYWNoZWQpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSwgdGltZXN0YW1wIH0gPSBKU09OLnBhcnNlKGNhY2hlZCwgcmV2aXZlcik7XG4gICAgICBjb25zdCBpc0V4cGlyZWQgPSBvcHRpb25zPy5tYXhBZ2UgJiYgRGF0ZS5ub3coKSAtIHRpbWVzdGFtcCA+IG9wdGlvbnMubWF4QWdlO1xuICAgICAgaWYgKCFpc0V4cGlyZWQgJiYgKCFvcHRpb25zPy52YWxpZGF0ZSB8fCBvcHRpb25zLnZhbGlkYXRlKGRhdGEpKSkge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZuKC4uLmFyZ3MpO1xuICAgIGNhY2hlLnNldChcbiAgICAgIGtleSxcbiAgICAgIEpTT04uc3RyaW5naWZ5KFxuICAgICAgICB7XG4gICAgICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVwbGFjZXIsXG4gICAgICApLFxuICAgICk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB3cmFwcGVkRm4uY2xlYXJDYWNoZSA9ICgpID0+IHtcbiAgICBjYWNoZS5jbGVhcigpO1xuICB9O1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgdG9vIGNvbXBsZXggZm9yIFRTXG4gIHJldHVybiB3cmFwcGVkRm47XG59XG4iLCAiaW1wb3J0IHsgcmVhZEZpbGVTeW5jLCBleGlzdHNTeW5jLCByZWFkZGlyU3luYywgc3RhdFN5bmMgfSBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuaW1wb3J0ICogYXMgeWFtbCBmcm9tIFwianMteWFtbFwiO1xuaW1wb3J0IHR5cGUgeyBCdWZvUHJvamVjdCwgR2xvYmFsQ29uZmlnLCBUYWRwb2xlTWV0YSwgVGFkcG9sZVN0YXRlLCBCdWZvU2Vzc2lvbiwgU2Vzc2lvbkxheW91dCB9IGZyb20gXCIuL3R5cGVzLmpzXCI7XG5cbmNvbnN0IEJVRk9fRElSID0gam9pbihob21lZGlyKCksIFwiLmJ1Zm9cIik7XG5jb25zdCBQUk9KRUNUU19ESVIgPSBqb2luKEJVRk9fRElSLCBcInByb2plY3RzXCIpO1xuY29uc3QgU1RBVEVfRElSID0gam9pbihCVUZPX0RJUiwgXCJzdGF0ZVwiKTtcbmNvbnN0IFNFU1NJT05TX0RJUiA9IGpvaW4oQlVGT19ESVIsIFwic2Vzc2lvbnNcIik7XG5jb25zdCBHTE9CQUxfQ09ORklHID0gam9pbihCVUZPX0RJUiwgXCJjb25maWcueWFtbFwiKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJ1Zm9EaXIoKTogc3RyaW5nIHtcbiAgcmV0dXJuIEJVRk9fRElSO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVmb0V4aXN0cygpOiBib29sZWFuIHtcbiAgcmV0dXJuIGV4aXN0c1N5bmMoQlVGT19ESVIpO1xufVxuXG5mdW5jdGlvbiBleHBhbmRQYXRoKHA6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChwLnN0YXJ0c1dpdGgoXCJ+L1wiKSB8fCBwID09PSBcIn5cIikge1xuICAgIHJldHVybiBqb2luKGhvbWVkaXIoKSwgcC5zbGljZSgyKSk7XG4gIH1cbiAgcmV0dXJuIHA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkR2xvYmFsQ29uZmlnKCk6IEdsb2JhbENvbmZpZyB7XG4gIGlmICghZXhpc3RzU3luYyhHTE9CQUxfQ09ORklHKSkgcmV0dXJuIHt9O1xuICB0cnkge1xuICAgIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyhHTE9CQUxfQ09ORklHLCBcInV0Zi04XCIpO1xuICAgIHJldHVybiAoeWFtbC5sb2FkKHJhdykgYXMgR2xvYmFsQ29uZmlnKSB8fCB7fTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkUHJvamVjdChhbGlhczogc3RyaW5nLCBmaWxlUGF0aDogc3RyaW5nKTogQnVmb1Byb2plY3Qge1xuICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmMoZmlsZVBhdGgsIFwidXRmLThcIik7XG4gIGNvbnN0IGRvYyA9IHlhbWwubG9hZChyYXcpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG4gIC8vIFN1cHBvcnQgYm90aCBuZXcgdGFkcG9sZXM6IGFuZCBsZWdhY3kgd29ya3NwYWNlczoga2V5c1xuICBjb25zdCB0YWRwb2xlcyA9IChkb2MudGFkcG9sZXMgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHx8XG4gICAgKGRvYy53b3Jrc3BhY2VzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB8fCB7fTtcbiAgY29uc3QgcG9ydHMgPSAoZG9jLnBvcnRzIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KSB8fCB7fTtcblxuICByZXR1cm4ge1xuICAgIGFsaWFzLFxuICAgIHNlc3Npb25fbmFtZTogKGRvYy5zZXNzaW9uX25hbWUgYXMgc3RyaW5nKSB8fCBhbGlhcyxcbiAgICB0YWRwb2xlX2Jhc2U6IGV4cGFuZFBhdGgoXG4gICAgICAoZG9jLnRhZHBvbGVfYmFzZSBhcyBzdHJpbmcpIHx8IChkb2Mud29ya3NwYWNlX2Jhc2UgYXMgc3RyaW5nKSB8fCBcIlwiXG4gICAgKSxcbiAgICBtYWluX3JlcG86IGV4cGFuZFBhdGgoKGRvYy5tYWluX3JlcG8gYXMgc3RyaW5nKSB8fCBcIlwiKSxcbiAgICB0YWRwb2xlczoge1xuICAgICAgY291bnQ6ICh0YWRwb2xlcy5jb3VudCBhcyBudW1iZXIpIHx8IDUsXG4gICAgICBwcmVmaXg6ICh0YWRwb2xlcy5wcmVmaXggYXMgc3RyaW5nKSB8fCBcInRhZHBvbGVcIixcbiAgICAgIGJyYW5jaF9wYXR0ZXJuOiAodGFkcG9sZXMuYnJhbmNoX3BhdHRlcm4gYXMgc3RyaW5nKSB8fCBcInRhZHBvbGUte059XCIsXG4gICAgfSxcbiAgICBwb3J0czogcG9ydHNcbiAgICAgID8ge1xuICAgICAgICAgIGFwaV9iYXNlOiBwb3J0cy5hcGlfYmFzZSBhcyBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAgICAgICAgYXBwX2Jhc2U6IHBvcnRzLmFwcF9iYXNlIGFzIG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgbGF5b3V0OiBkb2MubGF5b3V0IGFzIEJ1Zm9Qcm9qZWN0W1wibGF5b3V0XCJdLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzY292ZXJQcm9qZWN0cygpOiBCdWZvUHJvamVjdFtdIHtcbiAgaWYgKCFleGlzdHNTeW5jKFBST0pFQ1RTX0RJUikpIHJldHVybiBbXTtcbiAgY29uc3QgZmlsZXMgPSByZWFkZGlyU3luYyhQUk9KRUNUU19ESVIpLmZpbHRlcigoZikgPT4gZi5lbmRzV2l0aChcIi55YW1sXCIpIHx8IGYuZW5kc1dpdGgoXCIueW1sXCIpKTtcbiAgY29uc3QgcHJvamVjdHM6IEJ1Zm9Qcm9qZWN0W10gPSBbXTtcbiAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgY29uc3QgYWxpYXMgPSBmaWxlLnJlcGxhY2UoL1xcLnlhP21sJC8sIFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBwcm9qZWN0cy5wdXNoKGxvYWRQcm9qZWN0KGFsaWFzLCBqb2luKFBST0pFQ1RTX0RJUiwgZmlsZSkpKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIHNraXAgaW52YWxpZCBjb25maWdzXG4gICAgfVxuICB9XG4gIGNvbnN0IGRlZmF1bHRBbGlhcyA9IGxvYWRHbG9iYWxDb25maWcoKS5kZWZhdWx0X3Byb2plY3Q7XG4gIGlmIChkZWZhdWx0QWxpYXMpIHtcbiAgICBwcm9qZWN0cy5zb3J0KChhLCBiKSA9PiAoYS5hbGlhcyA9PT0gZGVmYXVsdEFsaWFzID8gLTEgOiBiLmFsaWFzID09PSBkZWZhdWx0QWxpYXMgPyAxIDogMCkpO1xuICB9XG4gIHJldHVybiBwcm9qZWN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUYWRwb2xlU3RhdGUoc2Vzc2lvbk5hbWU6IHN0cmluZywgbnVtOiBudW1iZXIpOiBUYWRwb2xlU3RhdGUgfCB1bmRlZmluZWQge1xuICAvLyBQcmVmZXIgdHA8Tj4uanNvbiwgZmFsbCBiYWNrIHRvIGxlZ2FjeSB3czxOPi5qc29uXG4gIGxldCBzdGF0ZUZpbGUgPSBqb2luKFNUQVRFX0RJUiwgc2Vzc2lvbk5hbWUsIGB0cCR7bnVtfS5qc29uYCk7XG4gIGlmICghZXhpc3RzU3luYyhzdGF0ZUZpbGUpKSB7XG4gICAgc3RhdGVGaWxlID0gam9pbihTVEFURV9ESVIsIHNlc3Npb25OYW1lLCBgd3Mke251bX0uanNvbmApO1xuICB9XG4gIGlmICghZXhpc3RzU3luYyhzdGF0ZUZpbGUpKSByZXR1cm4gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhzdGF0ZUZpbGUsIFwidXRmLThcIikpIGFzIFRhZHBvbGVTdGF0ZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRhZHBvbGVNZXRhKHRhZHBvbGVEaXI6IHN0cmluZyk6IFRhZHBvbGVNZXRhIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWV0YUZpbGUgPSBqb2luKHRhZHBvbGVEaXIsIFwiLmJ1Zm8tbWV0YVwiKTtcbiAgaWYgKCFleGlzdHNTeW5jKG1ldGFGaWxlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMobWV0YUZpbGUsIFwidXRmLThcIikpIGFzIFRhZHBvbGVNZXRhO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RhZHBvbGVMb2NrZWQodGFkcG9sZURpcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBleGlzdHNTeW5jKGpvaW4odGFkcG9sZURpciwgXCIuYnVmby1sb2NrXCIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEN1c3RvbU5hbWUodGFkcG9sZURpcjogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbmFtZUZpbGUgPSBqb2luKHRhZHBvbGVEaXIsIFwiLmJ1Zm8tbmFtZVwiKTtcbiAgaWYgKCFleGlzdHNTeW5jKG5hbWVGaWxlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gcmVhZEZpbGVTeW5jKG5hbWVGaWxlLCBcInV0Zi04XCIpLnRyaW0oKSB8fCB1bmRlZmluZWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRTZXNzaW9uKFxuICBwcm9qZWN0QWxpYXM6IHN0cmluZyxcbiAgc2Vzc2lvbk5hbWU6IHN0cmluZyxcbiAgYWN0aXZlU2Vzc2lvbnM/OiBTZXQ8c3RyaW5nPlxuKTogQnVmb1Nlc3Npb24gfCB1bmRlZmluZWQge1xuICBjb25zdCBzZXNzaW9uRGlyID0gam9pbihTRVNTSU9OU19ESVIsIHByb2plY3RBbGlhcywgc2Vzc2lvbk5hbWUpO1xuICBjb25zdCBzZXNzaW9uRmlsZSA9IGpvaW4oc2Vzc2lvbkRpciwgXCJzZXNzaW9uLnlhbWxcIik7XG4gIGlmICghZXhpc3RzU3luYyhzZXNzaW9uRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gcmVhZEZpbGVTeW5jKHNlc3Npb25GaWxlLCBcInV0Zi04XCIpO1xuICAgIGNvbnN0IGRvYyA9IHlhbWwubG9hZChyYXcpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG4gICAgbGV0IGxheW91dDogU2Vzc2lvbkxheW91dCB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBsYXlvdXRGaWxlID0gam9pbihzZXNzaW9uRGlyLCBcImxheW91dC5qc29uXCIpO1xuICAgIGlmIChleGlzdHNTeW5jKGxheW91dEZpbGUpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBsYXlvdXQgPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhsYXlvdXRGaWxlLCBcInV0Zi04XCIpKSBhcyBTZXNzaW9uTGF5b3V0O1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIHN0YWxlIG9yIG1hbGZvcm1lZCBsYXlvdXQgXHUyMDE0IGlnbm9yZVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGFjdGl2ZSA9IGxheW91dD8ubWFpbl9zaWQgPyAoYWN0aXZlU2Vzc2lvbnM/LmhhcyhsYXlvdXQubWFpbl9zaWQpID8/IGZhbHNlKSA6IGZhbHNlO1xuICAgIGNvbnN0IGhhc1Jldmlld091dHB1dCA9IGV4aXN0c1N5bmMoam9pbihzZXNzaW9uRGlyLCBcInJldmlldy1vdXRwdXQubWRcIikpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IChkb2MubmFtZSBhcyBzdHJpbmcpIHx8IHNlc3Npb25OYW1lLFxuICAgICAgcHJvamVjdDogKGRvYy5wcm9qZWN0IGFzIHN0cmluZykgfHwgcHJvamVjdEFsaWFzLFxuICAgICAgY3JlYXRlZDogKGRvYy5jcmVhdGVkIGFzIHN0cmluZykgfHwgXCJcIixcbiAgICAgIGxhc3RfYWNjZXNzZWQ6IChkb2MubGFzdF9hY2Nlc3NlZCBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gICAgICBzdW1tYXJ5OiAoZG9jLnN1bW1hcnkgYXMgc3RyaW5nKSB8fCBcIlwiLFxuICAgICAgdHlwZTogKChkb2MudHlwZSBhcyBzdHJpbmcpIHx8IFwiZ2VuZXJhbFwiKSBhcyBCdWZvU2Vzc2lvbltcInR5cGVcIl0sXG4gICAgICBwcnM6IGRvYy5wcnMgYXMgc3RyaW5nW10gfCB1bmRlZmluZWQsXG4gICAgICBhY3RpdmUsXG4gICAgICBoYXNSZXZpZXdPdXRwdXQsXG4gICAgICBsYXlvdXQsXG4gICAgfTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzY292ZXJTZXNzaW9ucyhcbiAgcHJvamVjdEFsaWFzOiBzdHJpbmcsXG4gIGFjdGl2ZVNlc3Npb25zPzogU2V0PHN0cmluZz5cbik6IEJ1Zm9TZXNzaW9uW10ge1xuICBjb25zdCBwcm9qZWN0U2Vzc2lvbnNEaXIgPSBqb2luKFNFU1NJT05TX0RJUiwgcHJvamVjdEFsaWFzKTtcbiAgaWYgKCFleGlzdHNTeW5jKHByb2plY3RTZXNzaW9uc0RpcikpIHJldHVybiBbXTtcbiAgbGV0IGVudHJpZXM6IHN0cmluZ1tdO1xuICB0cnkge1xuICAgIGVudHJpZXMgPSByZWFkZGlyU3luYyhwcm9qZWN0U2Vzc2lvbnNEaXIpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3Qgc2Vzc2lvbnM6IEJ1Zm9TZXNzaW9uW10gPSBbXTtcbiAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgY29uc3QgZnVsbFBhdGggPSBqb2luKHByb2plY3RTZXNzaW9uc0RpciwgZW50cnkpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXN0YXRTeW5jKGZ1bGxQYXRoKS5pc0RpcmVjdG9yeSgpKSBjb250aW51ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBzZXNzaW9uID0gbG9hZFNlc3Npb24ocHJvamVjdEFsaWFzLCBlbnRyeSwgYWN0aXZlU2Vzc2lvbnMpO1xuICAgIGlmIChzZXNzaW9uKSBzZXNzaW9ucy5wdXNoKHNlc3Npb24pO1xuICB9XG4gIHJldHVybiBzZXNzaW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbFNlc3Npb25zKFxuICBhY3RpdmVTZXNzaW9ucz86IFNldDxzdHJpbmc+XG4pOiB7IHByb2plY3RBbGlhczogc3RyaW5nOyBzZXNzaW9uczogQnVmb1Nlc3Npb25bXSB9W10ge1xuICBjb25zdCBwcm9qZWN0cyA9IGRpc2NvdmVyUHJvamVjdHMoKTtcbiAgY29uc3QgcmVzdWx0OiB7IHByb2plY3RBbGlhczogc3RyaW5nOyBzZXNzaW9uczogQnVmb1Nlc3Npb25bXSB9W10gPSBbXTtcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgY29uc3Qgc2Vzc2lvbnMgPSBkaXNjb3ZlclNlc3Npb25zKHByb2plY3QuYWxpYXMsIGFjdGl2ZVNlc3Npb25zKTtcbiAgICBpZiAoc2Vzc2lvbnMubGVuZ3RoID4gMCkge1xuICAgICAgcmVzdWx0LnB1c2goeyBwcm9qZWN0QWxpYXM6IHByb2plY3QuYWxpYXMsIHNlc3Npb25zIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIiwgIlxuLyohIGpzLXlhbWwgNC4xLjEgaHR0cHM6Ly9naXRodWIuY29tL25vZGVjYS9qcy15YW1sIEBsaWNlbnNlIE1JVCAqL1xuZnVuY3Rpb24gaXNOb3RoaW5nKHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcpIHx8IChzdWJqZWN0ID09PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiBpc09iamVjdChzdWJqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIHN1YmplY3QgPT09ICdvYmplY3QnKSAmJiAoc3ViamVjdCAhPT0gbnVsbCk7XG59XG5cblxuZnVuY3Rpb24gdG9BcnJheShzZXF1ZW5jZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShzZXF1ZW5jZSkpIHJldHVybiBzZXF1ZW5jZTtcbiAgZWxzZSBpZiAoaXNOb3RoaW5nKHNlcXVlbmNlKSkgcmV0dXJuIFtdO1xuXG4gIHJldHVybiBbIHNlcXVlbmNlIF07XG59XG5cblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCBrZXksIHNvdXJjZUtleXM7XG5cbiAgaWYgKHNvdXJjZSkge1xuICAgIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHNvdXJjZUtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAga2V5ID0gc291cmNlS2V5c1tpbmRleF07XG4gICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxuZnVuY3Rpb24gcmVwZWF0KHN0cmluZywgY291bnQpIHtcbiAgdmFyIHJlc3VsdCA9ICcnLCBjeWNsZTtcblxuICBmb3IgKGN5Y2xlID0gMDsgY3ljbGUgPCBjb3VudDsgY3ljbGUgKz0gMSkge1xuICAgIHJlc3VsdCArPSBzdHJpbmc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGlzTmVnYXRpdmVaZXJvKG51bWJlcikge1xuICByZXR1cm4gKG51bWJlciA9PT0gMCkgJiYgKE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA9PT0gMSAvIG51bWJlcik7XG59XG5cblxudmFyIGlzTm90aGluZ18xICAgICAgPSBpc05vdGhpbmc7XG52YXIgaXNPYmplY3RfMSAgICAgICA9IGlzT2JqZWN0O1xudmFyIHRvQXJyYXlfMSAgICAgICAgPSB0b0FycmF5O1xudmFyIHJlcGVhdF8xICAgICAgICAgPSByZXBlYXQ7XG52YXIgaXNOZWdhdGl2ZVplcm9fMSA9IGlzTmVnYXRpdmVaZXJvO1xudmFyIGV4dGVuZF8xICAgICAgICAgPSBleHRlbmQ7XG5cbnZhciBjb21tb24gPSB7XG5cdGlzTm90aGluZzogaXNOb3RoaW5nXzEsXG5cdGlzT2JqZWN0OiBpc09iamVjdF8xLFxuXHR0b0FycmF5OiB0b0FycmF5XzEsXG5cdHJlcGVhdDogcmVwZWF0XzEsXG5cdGlzTmVnYXRpdmVaZXJvOiBpc05lZ2F0aXZlWmVyb18xLFxuXHRleHRlbmQ6IGV4dGVuZF8xXG59O1xuXG4vLyBZQU1MIGVycm9yIGNsYXNzLiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg0NTg5ODRcblxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcihleGNlcHRpb24sIGNvbXBhY3QpIHtcbiAgdmFyIHdoZXJlID0gJycsIG1lc3NhZ2UgPSBleGNlcHRpb24ucmVhc29uIHx8ICcodW5rbm93biByZWFzb24pJztcblxuICBpZiAoIWV4Y2VwdGlvbi5tYXJrKSByZXR1cm4gbWVzc2FnZTtcblxuICBpZiAoZXhjZXB0aW9uLm1hcmsubmFtZSkge1xuICAgIHdoZXJlICs9ICdpbiBcIicgKyBleGNlcHRpb24ubWFyay5uYW1lICsgJ1wiICc7XG4gIH1cblxuICB3aGVyZSArPSAnKCcgKyAoZXhjZXB0aW9uLm1hcmsubGluZSArIDEpICsgJzonICsgKGV4Y2VwdGlvbi5tYXJrLmNvbHVtbiArIDEpICsgJyknO1xuXG4gIGlmICghY29tcGFjdCAmJiBleGNlcHRpb24ubWFyay5zbmlwcGV0KSB7XG4gICAgd2hlcmUgKz0gJ1xcblxcbicgKyBleGNlcHRpb24ubWFyay5zbmlwcGV0O1xuICB9XG5cbiAgcmV0dXJuIG1lc3NhZ2UgKyAnICcgKyB3aGVyZTtcbn1cblxuXG5mdW5jdGlvbiBZQU1MRXhjZXB0aW9uJDEocmVhc29uLCBtYXJrKSB7XG4gIC8vIFN1cGVyIGNvbnN0cnVjdG9yXG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgdGhpcy5uYW1lID0gJ1lBTUxFeGNlcHRpb24nO1xuICB0aGlzLnJlYXNvbiA9IHJlYXNvbjtcbiAgdGhpcy5tYXJrID0gbWFyaztcbiAgdGhpcy5tZXNzYWdlID0gZm9ybWF0RXJyb3IodGhpcywgZmFsc2UpO1xuXG4gIC8vIEluY2x1ZGUgc3RhY2sgdHJhY2UgaW4gZXJyb3Igb2JqZWN0XG4gIGlmIChFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSkge1xuICAgIC8vIENocm9tZSBhbmQgTm9kZUpTXG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gRkYsIElFIDEwKyBhbmQgU2FmYXJpIDYrLiBGYWxsYmFjayBmb3Igb3RoZXJzXG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2sgfHwgJyc7XG4gIH1cbn1cblxuXG4vLyBJbmhlcml0IGZyb20gRXJyb3JcbllBTUxFeGNlcHRpb24kMS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5ZQU1MRXhjZXB0aW9uJDEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gWUFNTEV4Y2VwdGlvbiQxO1xuXG5cbllBTUxFeGNlcHRpb24kMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyhjb21wYWN0KSB7XG4gIHJldHVybiB0aGlzLm5hbWUgKyAnOiAnICsgZm9ybWF0RXJyb3IodGhpcywgY29tcGFjdCk7XG59O1xuXG5cbnZhciBleGNlcHRpb24gPSBZQU1MRXhjZXB0aW9uJDE7XG5cbi8vIGdldCBzbmlwcGV0IGZvciBhIHNpbmdsZSBsaW5lLCByZXNwZWN0aW5nIG1heExlbmd0aFxuZnVuY3Rpb24gZ2V0TGluZShidWZmZXIsIGxpbmVTdGFydCwgbGluZUVuZCwgcG9zaXRpb24sIG1heExpbmVMZW5ndGgpIHtcbiAgdmFyIGhlYWQgPSAnJztcbiAgdmFyIHRhaWwgPSAnJztcbiAgdmFyIG1heEhhbGZMZW5ndGggPSBNYXRoLmZsb29yKG1heExpbmVMZW5ndGggLyAyKSAtIDE7XG5cbiAgaWYgKHBvc2l0aW9uIC0gbGluZVN0YXJ0ID4gbWF4SGFsZkxlbmd0aCkge1xuICAgIGhlYWQgPSAnIC4uLiAnO1xuICAgIGxpbmVTdGFydCA9IHBvc2l0aW9uIC0gbWF4SGFsZkxlbmd0aCArIGhlYWQubGVuZ3RoO1xuICB9XG5cbiAgaWYgKGxpbmVFbmQgLSBwb3NpdGlvbiA+IG1heEhhbGZMZW5ndGgpIHtcbiAgICB0YWlsID0gJyAuLi4nO1xuICAgIGxpbmVFbmQgPSBwb3NpdGlvbiArIG1heEhhbGZMZW5ndGggLSB0YWlsLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RyOiBoZWFkICsgYnVmZmVyLnNsaWNlKGxpbmVTdGFydCwgbGluZUVuZCkucmVwbGFjZSgvXFx0L2csICdcdTIxOTInKSArIHRhaWwsXG4gICAgcG9zOiBwb3NpdGlvbiAtIGxpbmVTdGFydCArIGhlYWQubGVuZ3RoIC8vIHJlbGF0aXZlIHBvc2l0aW9uXG4gIH07XG59XG5cblxuZnVuY3Rpb24gcGFkU3RhcnQoc3RyaW5nLCBtYXgpIHtcbiAgcmV0dXJuIGNvbW1vbi5yZXBlYXQoJyAnLCBtYXggLSBzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn1cblxuXG5mdW5jdGlvbiBtYWtlU25pcHBldChtYXJrLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG9wdGlvbnMgfHwgbnVsbCk7XG5cbiAgaWYgKCFtYXJrLmJ1ZmZlcikgcmV0dXJuIG51bGw7XG5cbiAgaWYgKCFvcHRpb25zLm1heExlbmd0aCkgb3B0aW9ucy5tYXhMZW5ndGggPSA3OTtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmluZGVudCAgICAgICE9PSAnbnVtYmVyJykgb3B0aW9ucy5pbmRlbnQgICAgICA9IDE7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5saW5lc0JlZm9yZSAhPT0gJ251bWJlcicpIG9wdGlvbnMubGluZXNCZWZvcmUgPSAzO1xuICBpZiAodHlwZW9mIG9wdGlvbnMubGluZXNBZnRlciAgIT09ICdudW1iZXInKSBvcHRpb25zLmxpbmVzQWZ0ZXIgID0gMjtcblxuICB2YXIgcmUgPSAvXFxyP1xcbnxcXHJ8XFwwL2c7XG4gIHZhciBsaW5lU3RhcnRzID0gWyAwIF07XG4gIHZhciBsaW5lRW5kcyA9IFtdO1xuICB2YXIgbWF0Y2g7XG4gIHZhciBmb3VuZExpbmVObyA9IC0xO1xuXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKG1hcmsuYnVmZmVyKSkpIHtcbiAgICBsaW5lRW5kcy5wdXNoKG1hdGNoLmluZGV4KTtcbiAgICBsaW5lU3RhcnRzLnB1c2gobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuXG4gICAgaWYgKG1hcmsucG9zaXRpb24gPD0gbWF0Y2guaW5kZXggJiYgZm91bmRMaW5lTm8gPCAwKSB7XG4gICAgICBmb3VuZExpbmVObyA9IGxpbmVTdGFydHMubGVuZ3RoIC0gMjtcbiAgICB9XG4gIH1cblxuICBpZiAoZm91bmRMaW5lTm8gPCAwKSBmb3VuZExpbmVObyA9IGxpbmVTdGFydHMubGVuZ3RoIC0gMTtcblxuICB2YXIgcmVzdWx0ID0gJycsIGksIGxpbmU7XG4gIHZhciBsaW5lTm9MZW5ndGggPSBNYXRoLm1pbihtYXJrLmxpbmUgKyBvcHRpb25zLmxpbmVzQWZ0ZXIsIGxpbmVFbmRzLmxlbmd0aCkudG9TdHJpbmcoKS5sZW5ndGg7XG4gIHZhciBtYXhMaW5lTGVuZ3RoID0gb3B0aW9ucy5tYXhMZW5ndGggLSAob3B0aW9ucy5pbmRlbnQgKyBsaW5lTm9MZW5ndGggKyAzKTtcblxuICBmb3IgKGkgPSAxOyBpIDw9IG9wdGlvbnMubGluZXNCZWZvcmU7IGkrKykge1xuICAgIGlmIChmb3VuZExpbmVObyAtIGkgPCAwKSBicmVhaztcbiAgICBsaW5lID0gZ2V0TGluZShcbiAgICAgIG1hcmsuYnVmZmVyLFxuICAgICAgbGluZVN0YXJ0c1tmb3VuZExpbmVObyAtIGldLFxuICAgICAgbGluZUVuZHNbZm91bmRMaW5lTm8gLSBpXSxcbiAgICAgIG1hcmsucG9zaXRpb24gLSAobGluZVN0YXJ0c1tmb3VuZExpbmVOb10gLSBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vIC0gaV0pLFxuICAgICAgbWF4TGluZUxlbmd0aFxuICAgICk7XG4gICAgcmVzdWx0ID0gY29tbW9uLnJlcGVhdCgnICcsIG9wdGlvbnMuaW5kZW50KSArIHBhZFN0YXJ0KChtYXJrLmxpbmUgLSBpICsgMSkudG9TdHJpbmcoKSwgbGluZU5vTGVuZ3RoKSArXG4gICAgICAnIHwgJyArIGxpbmUuc3RyICsgJ1xcbicgKyByZXN1bHQ7XG4gIH1cblxuICBsaW5lID0gZ2V0TGluZShtYXJrLmJ1ZmZlciwgbGluZVN0YXJ0c1tmb3VuZExpbmVOb10sIGxpbmVFbmRzW2ZvdW5kTGluZU5vXSwgbWFyay5wb3NpdGlvbiwgbWF4TGluZUxlbmd0aCk7XG4gIHJlc3VsdCArPSBjb21tb24ucmVwZWF0KCcgJywgb3B0aW9ucy5pbmRlbnQpICsgcGFkU3RhcnQoKG1hcmsubGluZSArIDEpLnRvU3RyaW5nKCksIGxpbmVOb0xlbmd0aCkgK1xuICAgICcgfCAnICsgbGluZS5zdHIgKyAnXFxuJztcbiAgcmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJy0nLCBvcHRpb25zLmluZGVudCArIGxpbmVOb0xlbmd0aCArIDMgKyBsaW5lLnBvcykgKyAnXicgKyAnXFxuJztcblxuICBmb3IgKGkgPSAxOyBpIDw9IG9wdGlvbnMubGluZXNBZnRlcjsgaSsrKSB7XG4gICAgaWYgKGZvdW5kTGluZU5vICsgaSA+PSBsaW5lRW5kcy5sZW5ndGgpIGJyZWFrO1xuICAgIGxpbmUgPSBnZXRMaW5lKFxuICAgICAgbWFyay5idWZmZXIsXG4gICAgICBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vICsgaV0sXG4gICAgICBsaW5lRW5kc1tmb3VuZExpbmVObyArIGldLFxuICAgICAgbWFyay5wb3NpdGlvbiAtIChsaW5lU3RhcnRzW2ZvdW5kTGluZU5vXSAtIGxpbmVTdGFydHNbZm91bmRMaW5lTm8gKyBpXSksXG4gICAgICBtYXhMaW5lTGVuZ3RoXG4gICAgKTtcbiAgICByZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnICcsIG9wdGlvbnMuaW5kZW50KSArIHBhZFN0YXJ0KChtYXJrLmxpbmUgKyBpICsgMSkudG9TdHJpbmcoKSwgbGluZU5vTGVuZ3RoKSArXG4gICAgICAnIHwgJyArIGxpbmUuc3RyICsgJ1xcbic7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LnJlcGxhY2UoL1xcbiQvLCAnJyk7XG59XG5cblxudmFyIHNuaXBwZXQgPSBtYWtlU25pcHBldDtcblxudmFyIFRZUEVfQ09OU1RSVUNUT1JfT1BUSU9OUyA9IFtcbiAgJ2tpbmQnLFxuICAnbXVsdGknLFxuICAncmVzb2x2ZScsXG4gICdjb25zdHJ1Y3QnLFxuICAnaW5zdGFuY2VPZicsXG4gICdwcmVkaWNhdGUnLFxuICAncmVwcmVzZW50JyxcbiAgJ3JlcHJlc2VudE5hbWUnLFxuICAnZGVmYXVsdFN0eWxlJyxcbiAgJ3N0eWxlQWxpYXNlcydcbl07XG5cbnZhciBZQU1MX05PREVfS0lORFMgPSBbXG4gICdzY2FsYXInLFxuICAnc2VxdWVuY2UnLFxuICAnbWFwcGluZydcbl07XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZUFsaWFzZXMobWFwKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBpZiAobWFwICE9PSBudWxsKSB7XG4gICAgT2JqZWN0LmtleXMobWFwKS5mb3JFYWNoKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgbWFwW3N0eWxlXS5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICByZXN1bHRbU3RyaW5nKGFsaWFzKV0gPSBzdHlsZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gVHlwZSQxKHRhZywgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKFRZUEVfQ09OU1RSVUNUT1JfT1BUSU9OUy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignVW5rbm93biBvcHRpb24gXCInICsgbmFtZSArICdcIiBpcyBtZXQgaW4gZGVmaW5pdGlvbiBvZiBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVE9ETzogQWRkIHRhZyBmb3JtYXQgY2hlY2suXG4gIHRoaXMub3B0aW9ucyAgICAgICA9IG9wdGlvbnM7IC8vIGtlZXAgb3JpZ2luYWwgb3B0aW9ucyBpbiBjYXNlIHVzZXIgd2FudHMgdG8gZXh0ZW5kIHRoaXMgdHlwZSBsYXRlclxuICB0aGlzLnRhZyAgICAgICAgICAgPSB0YWc7XG4gIHRoaXMua2luZCAgICAgICAgICA9IG9wdGlvbnNbJ2tpbmQnXSAgICAgICAgICB8fCBudWxsO1xuICB0aGlzLnJlc29sdmUgICAgICAgPSBvcHRpb25zWydyZXNvbHZlJ10gICAgICAgfHwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgdGhpcy5jb25zdHJ1Y3QgICAgID0gb3B0aW9uc1snY29uc3RydWN0J10gICAgIHx8IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhOyB9O1xuICB0aGlzLmluc3RhbmNlT2YgICAgPSBvcHRpb25zWydpbnN0YW5jZU9mJ10gICAgfHwgbnVsbDtcbiAgdGhpcy5wcmVkaWNhdGUgICAgID0gb3B0aW9uc1sncHJlZGljYXRlJ10gICAgIHx8IG51bGw7XG4gIHRoaXMucmVwcmVzZW50ICAgICA9IG9wdGlvbnNbJ3JlcHJlc2VudCddICAgICB8fCBudWxsO1xuICB0aGlzLnJlcHJlc2VudE5hbWUgPSBvcHRpb25zWydyZXByZXNlbnROYW1lJ10gfHwgbnVsbDtcbiAgdGhpcy5kZWZhdWx0U3R5bGUgID0gb3B0aW9uc1snZGVmYXVsdFN0eWxlJ10gIHx8IG51bGw7XG4gIHRoaXMubXVsdGkgICAgICAgICA9IG9wdGlvbnNbJ211bHRpJ10gICAgICAgICB8fCBmYWxzZTtcbiAgdGhpcy5zdHlsZUFsaWFzZXMgID0gY29tcGlsZVN0eWxlQWxpYXNlcyhvcHRpb25zWydzdHlsZUFsaWFzZXMnXSB8fCBudWxsKTtcblxuICBpZiAoWUFNTF9OT0RFX0tJTkRTLmluZGV4T2YodGhpcy5raW5kKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdVbmtub3duIGtpbmQgXCInICsgdGhpcy5raW5kICsgJ1wiIGlzIHNwZWNpZmllZCBmb3IgXCInICsgdGFnICsgJ1wiIFlBTUwgdHlwZS4nKTtcbiAgfVxufVxuXG52YXIgdHlwZSA9IFR5cGUkMTtcblxuLyplc2xpbnQtZGlzYWJsZSBtYXgtbGVuKi9cblxuXG5cblxuXG5mdW5jdGlvbiBjb21waWxlTGlzdChzY2hlbWEsIG5hbWUpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIHNjaGVtYVtuYW1lXS5mb3JFYWNoKGZ1bmN0aW9uIChjdXJyZW50VHlwZSkge1xuICAgIHZhciBuZXdJbmRleCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgICByZXN1bHQuZm9yRWFjaChmdW5jdGlvbiAocHJldmlvdXNUeXBlLCBwcmV2aW91c0luZGV4KSB7XG4gICAgICBpZiAocHJldmlvdXNUeXBlLnRhZyA9PT0gY3VycmVudFR5cGUudGFnICYmXG4gICAgICAgICAgcHJldmlvdXNUeXBlLmtpbmQgPT09IGN1cnJlbnRUeXBlLmtpbmQgJiZcbiAgICAgICAgICBwcmV2aW91c1R5cGUubXVsdGkgPT09IGN1cnJlbnRUeXBlLm11bHRpKSB7XG5cbiAgICAgICAgbmV3SW5kZXggPSBwcmV2aW91c0luZGV4O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmVzdWx0W25ld0luZGV4XSA9IGN1cnJlbnRUeXBlO1xuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGNvbXBpbGVNYXAoLyogbGlzdHMuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgc2NhbGFyOiB7fSxcbiAgICAgICAgc2VxdWVuY2U6IHt9LFxuICAgICAgICBtYXBwaW5nOiB7fSxcbiAgICAgICAgZmFsbGJhY2s6IHt9LFxuICAgICAgICBtdWx0aToge1xuICAgICAgICAgIHNjYWxhcjogW10sXG4gICAgICAgICAgc2VxdWVuY2U6IFtdLFxuICAgICAgICAgIG1hcHBpbmc6IFtdLFxuICAgICAgICAgIGZhbGxiYWNrOiBbXVxuICAgICAgICB9XG4gICAgICB9LCBpbmRleCwgbGVuZ3RoO1xuXG4gIGZ1bmN0aW9uIGNvbGxlY3RUeXBlKHR5cGUpIHtcbiAgICBpZiAodHlwZS5tdWx0aSkge1xuICAgICAgcmVzdWx0Lm11bHRpW3R5cGUua2luZF0ucHVzaCh0eXBlKTtcbiAgICAgIHJlc3VsdC5tdWx0aVsnZmFsbGJhY2snXS5wdXNoKHR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbdHlwZS5raW5kXVt0eXBlLnRhZ10gPSByZXN1bHRbJ2ZhbGxiYWNrJ11bdHlwZS50YWddID0gdHlwZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBhcmd1bWVudHNbaW5kZXhdLmZvckVhY2goY29sbGVjdFR5cGUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gU2NoZW1hJDEoZGVmaW5pdGlvbikge1xuICByZXR1cm4gdGhpcy5leHRlbmQoZGVmaW5pdGlvbik7XG59XG5cblxuU2NoZW1hJDEucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChkZWZpbml0aW9uKSB7XG4gIHZhciBpbXBsaWNpdCA9IFtdO1xuICB2YXIgZXhwbGljaXQgPSBbXTtcblxuICBpZiAoZGVmaW5pdGlvbiBpbnN0YW5jZW9mIHR5cGUpIHtcbiAgICAvLyBTY2hlbWEuZXh0ZW5kKHR5cGUpXG4gICAgZXhwbGljaXQucHVzaChkZWZpbml0aW9uKTtcblxuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbikpIHtcbiAgICAvLyBTY2hlbWEuZXh0ZW5kKFsgdHlwZTEsIHR5cGUyLCAuLi4gXSlcbiAgICBleHBsaWNpdCA9IGV4cGxpY2l0LmNvbmNhdChkZWZpbml0aW9uKTtcblxuICB9IGVsc2UgaWYgKGRlZmluaXRpb24gJiYgKEFycmF5LmlzQXJyYXkoZGVmaW5pdGlvbi5pbXBsaWNpdCkgfHwgQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmV4cGxpY2l0KSkpIHtcbiAgICAvLyBTY2hlbWEuZXh0ZW5kKHsgZXhwbGljaXQ6IFsgdHlwZTEsIHR5cGUyLCAuLi4gXSwgaW1wbGljaXQ6IFsgdHlwZTEsIHR5cGUyLCAuLi4gXSB9KVxuICAgIGlmIChkZWZpbml0aW9uLmltcGxpY2l0KSBpbXBsaWNpdCA9IGltcGxpY2l0LmNvbmNhdChkZWZpbml0aW9uLmltcGxpY2l0KTtcbiAgICBpZiAoZGVmaW5pdGlvbi5leHBsaWNpdCkgZXhwbGljaXQgPSBleHBsaWNpdC5jb25jYXQoZGVmaW5pdGlvbi5leHBsaWNpdCk7XG5cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdTY2hlbWEuZXh0ZW5kIGFyZ3VtZW50IHNob3VsZCBiZSBhIFR5cGUsIFsgVHlwZSBdLCAnICtcbiAgICAgICdvciBhIHNjaGVtYSBkZWZpbml0aW9uICh7IGltcGxpY2l0OiBbLi4uXSwgZXhwbGljaXQ6IFsuLi5dIH0pJyk7XG4gIH1cblxuICBpbXBsaWNpdC5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlJDEpIHtcbiAgICBpZiAoISh0eXBlJDEgaW5zdGFuY2VvZiB0eXBlKSkge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignU3BlY2lmaWVkIGxpc3Qgb2YgWUFNTCB0eXBlcyAob3IgYSBzaW5nbGUgVHlwZSBvYmplY3QpIGNvbnRhaW5zIGEgbm9uLVR5cGUgb2JqZWN0LicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlJDEubG9hZEtpbmQgJiYgdHlwZSQxLmxvYWRLaW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignVGhlcmUgaXMgYSBub24tc2NhbGFyIHR5cGUgaW4gdGhlIGltcGxpY2l0IGxpc3Qgb2YgYSBzY2hlbWEuIEltcGxpY2l0IHJlc29sdmluZyBvZiBzdWNoIHR5cGVzIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUkMS5tdWx0aSkge1xuICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignVGhlcmUgaXMgYSBtdWx0aSB0eXBlIGluIHRoZSBpbXBsaWNpdCBsaXN0IG9mIGEgc2NoZW1hLiBNdWx0aSB0YWdzIGNhbiBvbmx5IGJlIGxpc3RlZCBhcyBleHBsaWNpdC4nKTtcbiAgICB9XG4gIH0pO1xuXG4gIGV4cGxpY2l0LmZvckVhY2goZnVuY3Rpb24gKHR5cGUkMSkge1xuICAgIGlmICghKHR5cGUkMSBpbnN0YW5jZW9mIHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdTcGVjaWZpZWQgbGlzdCBvZiBZQU1MIHR5cGVzIChvciBhIHNpbmdsZSBUeXBlIG9iamVjdCkgY29udGFpbnMgYSBub24tVHlwZSBvYmplY3QuJyk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgcmVzdWx0ID0gT2JqZWN0LmNyZWF0ZShTY2hlbWEkMS5wcm90b3R5cGUpO1xuXG4gIHJlc3VsdC5pbXBsaWNpdCA9ICh0aGlzLmltcGxpY2l0IHx8IFtdKS5jb25jYXQoaW1wbGljaXQpO1xuICByZXN1bHQuZXhwbGljaXQgPSAodGhpcy5leHBsaWNpdCB8fCBbXSkuY29uY2F0KGV4cGxpY2l0KTtcblxuICByZXN1bHQuY29tcGlsZWRJbXBsaWNpdCA9IGNvbXBpbGVMaXN0KHJlc3VsdCwgJ2ltcGxpY2l0Jyk7XG4gIHJlc3VsdC5jb21waWxlZEV4cGxpY2l0ID0gY29tcGlsZUxpc3QocmVzdWx0LCAnZXhwbGljaXQnKTtcbiAgcmVzdWx0LmNvbXBpbGVkVHlwZU1hcCAgPSBjb21waWxlTWFwKHJlc3VsdC5jb21waWxlZEltcGxpY2l0LCByZXN1bHQuY29tcGlsZWRFeHBsaWNpdCk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxudmFyIHNjaGVtYSA9IFNjaGVtYSQxO1xuXG52YXIgc3RyID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnN0cicsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogJyc7IH1cbn0pO1xuXG52YXIgc2VxID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnNlcScsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiBbXTsgfVxufSk7XG5cbnZhciBtYXAgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bWFwJywge1xuICBraW5kOiAnbWFwcGluZycsXG4gIGNvbnN0cnVjdDogZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307IH1cbn0pO1xuXG52YXIgZmFpbHNhZmUgPSBuZXcgc2NoZW1hKHtcbiAgZXhwbGljaXQ6IFtcbiAgICBzdHIsXG4gICAgc2VxLFxuICAgIG1hcFxuICBdXG59KTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxOdWxsKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gMSAmJiBkYXRhID09PSAnficpIHx8XG4gICAgICAgICAobWF4ID09PSA0ICYmIChkYXRhID09PSAnbnVsbCcgfHwgZGF0YSA9PT0gJ051bGwnIHx8IGRhdGEgPT09ICdOVUxMJykpO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbChvYmplY3QpIHtcbiAgcmV0dXJuIG9iamVjdCA9PT0gbnVsbDtcbn1cblxudmFyIF9udWxsID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm51bGwnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE51bGwsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE51bGwsXG4gIHByZWRpY2F0ZTogaXNOdWxsLFxuICByZXByZXNlbnQ6IHtcbiAgICBjYW5vbmljYWw6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICd+JzsgICAgfSxcbiAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdudWxsJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOVUxMJzsgfSxcbiAgICBjYW1lbGNhc2U6IGZ1bmN0aW9uICgpIHsgcmV0dXJuICdOdWxsJzsgfSxcbiAgICBlbXB0eTogICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuICcnOyAgICAgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxCb29sZWFuKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGg7XG5cbiAgcmV0dXJuIChtYXggPT09IDQgJiYgKGRhdGEgPT09ICd0cnVlJyB8fCBkYXRhID09PSAnVHJ1ZScgfHwgZGF0YSA9PT0gJ1RSVUUnKSkgfHxcbiAgICAgICAgIChtYXggPT09IDUgJiYgKGRhdGEgPT09ICdmYWxzZScgfHwgZGF0YSA9PT0gJ0ZhbHNlJyB8fCBkYXRhID09PSAnRkFMU0UnKSk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxCb29sZWFuKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgPT09ICd0cnVlJyB8fFxuICAgICAgICAgZGF0YSA9PT0gJ1RydWUnIHx8XG4gICAgICAgICBkYXRhID09PSAnVFJVRSc7XG59XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBCb29sZWFuXSc7XG59XG5cbnZhciBib29sID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmJvb2wnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEJvb2xlYW4sXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEJvb2xlYW4sXG4gIHByZWRpY2F0ZTogaXNCb29sZWFuLFxuICByZXByZXNlbnQ6IHtcbiAgICBsb3dlcmNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICd0cnVlJyA6ICdmYWxzZSc7IH0sXG4gICAgdXBwZXJjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAnVFJVRScgOiAnRkFMU0UnOyB9LFxuICAgIGNhbWVsY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ1RydWUnIDogJ0ZhbHNlJzsgfVxuICB9LFxuICBkZWZhdWx0U3R5bGU6ICdsb3dlcmNhc2UnXG59KTtcblxuZnVuY3Rpb24gaXNIZXhDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKSB8fFxuICAgICAgICAgKCgweDQxLyogQSAqLyA8PSBjKSAmJiAoYyA8PSAweDQ2LyogRiAqLykpIHx8XG4gICAgICAgICAoKDB4NjEvKiBhICovIDw9IGMpICYmIChjIDw9IDB4NjYvKiBmICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzT2N0Q29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzcvKiA3ICovKSk7XG59XG5cbmZ1bmN0aW9uIGlzRGVjQ29kZShjKSB7XG4gIHJldHVybiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSk7XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sSW50ZWdlcihkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoLFxuICAgICAgaW5kZXggPSAwLFxuICAgICAgaGFzRGlnaXRzID0gZmFsc2UsXG4gICAgICBjaDtcblxuICBpZiAoIW1heCkgcmV0dXJuIGZhbHNlO1xuXG4gIGNoID0gZGF0YVtpbmRleF07XG5cbiAgLy8gc2lnblxuICBpZiAoY2ggPT09ICctJyB8fCBjaCA9PT0gJysnKSB7XG4gICAgY2ggPSBkYXRhWysraW5kZXhdO1xuICB9XG5cbiAgaWYgKGNoID09PSAnMCcpIHtcbiAgICAvLyAwXG4gICAgaWYgKGluZGV4ICsgMSA9PT0gbWF4KSByZXR1cm4gdHJ1ZTtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG5cbiAgICAvLyBiYXNlIDIsIGJhc2UgOCwgYmFzZSAxNlxuXG4gICAgaWYgKGNoID09PSAnYicpIHtcbiAgICAgIC8vIGJhc2UgMlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGNoICE9PSAnMCcgJiYgY2ggIT09ICcxJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cblxuXG4gICAgaWYgKGNoID09PSAneCcpIHtcbiAgICAgIC8vIGJhc2UgMTZcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmICghaXNIZXhDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG5cbiAgICBpZiAoY2ggPT09ICdvJykge1xuICAgICAgLy8gYmFzZSA4XG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoIWlzT2N0Q29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGhhc0RpZ2l0cyAmJiBjaCAhPT0gJ18nO1xuICAgIH1cbiAgfVxuXG4gIC8vIGJhc2UgMTAgKGV4Y2VwdCAwKVxuXG4gIC8vIHZhbHVlIHNob3VsZCBub3Qgc3RhcnQgd2l0aCBgX2A7XG4gIGlmIChjaCA9PT0gJ18nKSByZXR1cm4gZmFsc2U7XG5cbiAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgaWYgKCFpc0RlY0NvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFNob3VsZCBoYXZlIGRpZ2l0cyBhbmQgc2hvdWxkIG5vdCBlbmQgd2l0aCBgX2BcbiAgaWYgKCFoYXNEaWdpdHMgfHwgY2ggPT09ICdfJykgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sSW50ZWdlcihkYXRhKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGEsIHNpZ24gPSAxLCBjaDtcblxuICBpZiAodmFsdWUuaW5kZXhPZignXycpICE9PSAtMSkge1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXy9nLCAnJyk7XG4gIH1cblxuICBjaCA9IHZhbHVlWzBdO1xuXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBpZiAoY2ggPT09ICctJykgc2lnbiA9IC0xO1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gICAgY2ggPSB2YWx1ZVswXTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gJzAnKSByZXR1cm4gMDtcblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ2InKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCAyKTtcbiAgICBpZiAodmFsdWVbMV0gPT09ICd4JykgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgMTYpO1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ28nKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCA4KTtcbiAgfVxuXG4gIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUsIDEwKTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlZ2VyKG9iamVjdCkge1xuICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpKSA9PT0gJ1tvYmplY3QgTnVtYmVyXScgJiZcbiAgICAgICAgIChvYmplY3QgJSAxID09PSAwICYmICFjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSk7XG59XG5cbnZhciBpbnQgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6aW50Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxJbnRlZ2VyLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxJbnRlZ2VyLFxuICBwcmVkaWNhdGU6IGlzSW50ZWdlcixcbiAgcmVwcmVzZW50OiB7XG4gICAgYmluYXJ5OiAgICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzBiJyArIG9iai50b1N0cmluZygyKSA6ICctMGInICsgb2JqLnRvU3RyaW5nKDIpLnNsaWNlKDEpOyB9LFxuICAgIG9jdGFsOiAgICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcwbycgICsgb2JqLnRvU3RyaW5nKDgpIDogJy0wbycgICsgb2JqLnRvU3RyaW5nKDgpLnNsaWNlKDEpOyB9LFxuICAgIGRlY2ltYWw6ICAgICBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmoudG9TdHJpbmcoMTApOyB9LFxuICAgIC8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbiAgICBoZXhhZGVjaW1hbDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpIDogICctMHgnICsgb2JqLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpLnNsaWNlKDEpOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2RlY2ltYWwnLFxuICBzdHlsZUFsaWFzZXM6IHtcbiAgICBiaW5hcnk6ICAgICAgWyAyLCAgJ2JpbicgXSxcbiAgICBvY3RhbDogICAgICAgWyA4LCAgJ29jdCcgXSxcbiAgICBkZWNpbWFsOiAgICAgWyAxMCwgJ2RlYycgXSxcbiAgICBoZXhhZGVjaW1hbDogWyAxNiwgJ2hleCcgXVxuICB9XG59KTtcblxudmFyIFlBTUxfRkxPQVRfUEFUVEVSTiA9IG5ldyBSZWdFeHAoXG4gIC8vIDIuNWU0LCAyLjUgYW5kIGludGVnZXJzXG4gICdeKD86Wy0rXT8oPzpbMC05XVswLTlfXSopKD86XFxcXC5bMC05X10qKT8oPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAuMmU0LCAuMlxuICAvLyBzcGVjaWFsIGNhc2UsIHNlZW1zIG5vdCBmcm9tIHNwZWNcbiAgJ3xcXFxcLlswLTlfXSsoPzpbZUVdWy0rXT9bMC05XSspPycgK1xuICAvLyAuaW5mXG4gICd8Wy0rXT9cXFxcLig/OmluZnxJbmZ8SU5GKScgK1xuICAvLyAubmFuXG4gICd8XFxcXC4oPzpuYW58TmFOfE5BTikpJCcpO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEZsb2F0KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICBpZiAoIVlBTUxfRkxPQVRfUEFUVEVSTi50ZXN0KGRhdGEpIHx8XG4gICAgICAvLyBRdWljayBoYWNrIHRvIG5vdCBhbGxvdyBpbnRlZ2VycyBlbmQgd2l0aCBgX2BcbiAgICAgIC8vIFByb2JhYmx5IHNob3VsZCB1cGRhdGUgcmVnZXhwICYgY2hlY2sgc3BlZWRcbiAgICAgIGRhdGFbZGF0YS5sZW5ndGggLSAxXSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxGbG9hdChkYXRhKSB7XG4gIHZhciB2YWx1ZSwgc2lnbjtcblxuICB2YWx1ZSAgPSBkYXRhLnJlcGxhY2UoL18vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIHNpZ24gICA9IHZhbHVlWzBdID09PSAnLScgPyAtMSA6IDE7XG5cbiAgaWYgKCcrLScuaW5kZXhPZih2YWx1ZVswXSkgPj0gMCkge1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH1cblxuICBpZiAodmFsdWUgPT09ICcuaW5mJykge1xuICAgIHJldHVybiAoc2lnbiA9PT0gMSkgPyBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgOiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XG5cbiAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJy5uYW4nKSB7XG4gICAgcmV0dXJuIE5hTjtcbiAgfVxuICByZXR1cm4gc2lnbiAqIHBhcnNlRmxvYXQodmFsdWUsIDEwKTtcbn1cblxuXG52YXIgU0NJRU5USUZJQ19XSVRIT1VUX0RPVCA9IC9eWy0rXT9bMC05XStlLztcblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbEZsb2F0KG9iamVjdCwgc3R5bGUpIHtcbiAgdmFyIHJlcztcblxuICBpZiAoaXNOYU4ob2JqZWN0KSkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLm5hbic7XG4gICAgICBjYXNlICd1cHBlcmNhc2UnOiByZXR1cm4gJy5OQU4nO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICcuTmFOJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZID09PSBvYmplY3QpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy5pbmYnO1xuICAgICAgY2FzZSAndXBwZXJjYXNlJzogcmV0dXJuICcuSU5GJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLkluZic7XG4gICAgfVxuICB9IGVsc2UgaWYgKE51bWJlci5ORUdBVElWRV9JTkZJTklUWSA9PT0gb2JqZWN0KSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICctLmluZic7XG4gICAgICBjYXNlICd1cHBlcmNhc2UnOiByZXR1cm4gJy0uSU5GJztcbiAgICAgIGNhc2UgJ2NhbWVsY2FzZSc6IHJldHVybiAnLS5JbmYnO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjb21tb24uaXNOZWdhdGl2ZVplcm8ob2JqZWN0KSkge1xuICAgIHJldHVybiAnLTAuMCc7XG4gIH1cblxuICByZXMgPSBvYmplY3QudG9TdHJpbmcoMTApO1xuXG4gIC8vIEpTIHN0cmluZ2lmaWVyIGNhbiBidWlsZCBzY2llbnRpZmljIGZvcm1hdCB3aXRob3V0IGRvdHM6IDVlLTEwMCxcbiAgLy8gd2hpbGUgWUFNTCByZXF1cmVzIGRvdDogNS5lLTEwMC4gRml4IGl0IHdpdGggc2ltcGxlIGhhY2tcblxuICByZXR1cm4gU0NJRU5USUZJQ19XSVRIT1VUX0RPVC50ZXN0KHJlcykgPyByZXMucmVwbGFjZSgnZScsICcuZScpIDogcmVzO1xufVxuXG5mdW5jdGlvbiBpc0Zsb2F0KG9iamVjdCkge1xuICByZXR1cm4gKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBOdW1iZXJdJykgJiZcbiAgICAgICAgIChvYmplY3QgJSAxICE9PSAwIHx8IGNvbW1vbi5pc05lZ2F0aXZlWmVybyhvYmplY3QpKTtcbn1cblxudmFyIGZsb2F0ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmZsb2F0Jywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxGbG9hdCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sRmxvYXQsXG4gIHByZWRpY2F0ZTogaXNGbG9hdCxcbiAgcmVwcmVzZW50OiByZXByZXNlbnRZYW1sRmxvYXQsXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuXG52YXIganNvbiA9IGZhaWxzYWZlLmV4dGVuZCh7XG4gIGltcGxpY2l0OiBbXG4gICAgX251bGwsXG4gICAgYm9vbCxcbiAgICBpbnQsXG4gICAgZmxvYXRcbiAgXVxufSk7XG5cbnZhciBjb3JlID0ganNvbjtcblxudmFyIFlBTUxfREFURV9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICAnXihbMC05XVswLTldWzAtOV1bMC05XSknICAgICAgICAgICsgLy8gWzFdIHllYXJcbiAgJy0oWzAtOV1bMC05XSknICAgICAgICAgICAgICAgICAgICArIC8vIFsyXSBtb250aFxuICAnLShbMC05XVswLTldKSQnKTsgICAgICAgICAgICAgICAgICAgLy8gWzNdIGRheVxuXG52YXIgWUFNTF9USU1FU1RBTVBfUkVHRVhQID0gbmV3IFJlZ0V4cChcbiAgJ14oWzAtOV1bMC05XVswLTldWzAtOV0pJyAgICAgICAgICArIC8vIFsxXSB5ZWFyXG4gICctKFswLTldWzAtOV0/KScgICAgICAgICAgICAgICAgICAgKyAvLyBbMl0gbW9udGhcbiAgJy0oWzAtOV1bMC05XT8pJyAgICAgICAgICAgICAgICAgICArIC8vIFszXSBkYXlcbiAgJyg/OltUdF18WyBcXFxcdF0rKScgICAgICAgICAgICAgICAgICsgLy8gLi4uXG4gICcoWzAtOV1bMC05XT8pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNF0gaG91clxuICAnOihbMC05XVswLTldKScgICAgICAgICAgICAgICAgICAgICsgLy8gWzVdIG1pbnV0ZVxuICAnOihbMC05XVswLTldKScgICAgICAgICAgICAgICAgICAgICsgLy8gWzZdIHNlY29uZFxuICAnKD86XFxcXC4oWzAtOV0qKSk/JyAgICAgICAgICAgICAgICAgKyAvLyBbN10gZnJhY3Rpb25cbiAgJyg/OlsgXFxcXHRdKihafChbLStdKShbMC05XVswLTldPyknICsgLy8gWzhdIHR6IFs5XSB0el9zaWduIFsxMF0gdHpfaG91clxuICAnKD86OihbMC05XVswLTldKSk/KSk/JCcpOyAgICAgICAgICAgLy8gWzExXSB0el9taW51dGVcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxUaW1lc3RhbXAoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICBpZiAoWUFNTF9EQVRFX1JFR0VYUC5leGVjKGRhdGEpICE9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKFlBTUxfVElNRVNUQU1QX1JFR0VYUC5leGVjKGRhdGEpICE9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sVGltZXN0YW1wKGRhdGEpIHtcbiAgdmFyIG1hdGNoLCB5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgZnJhY3Rpb24gPSAwLFxuICAgICAgZGVsdGEgPSBudWxsLCB0el9ob3VyLCB0el9taW51dGUsIGRhdGU7XG5cbiAgbWF0Y2ggPSBZQU1MX0RBVEVfUkVHRVhQLmV4ZWMoZGF0YSk7XG4gIGlmIChtYXRjaCA9PT0gbnVsbCkgbWF0Y2ggPSBZQU1MX1RJTUVTVEFNUF9SRUdFWFAuZXhlYyhkYXRhKTtcblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHRocm93IG5ldyBFcnJvcignRGF0ZSByZXNvbHZlIGVycm9yJyk7XG5cbiAgLy8gbWF0Y2g6IFsxXSB5ZWFyIFsyXSBtb250aCBbM10gZGF5XG5cbiAgeWVhciA9ICsobWF0Y2hbMV0pO1xuICBtb250aCA9ICsobWF0Y2hbMl0pIC0gMTsgLy8gSlMgbW9udGggc3RhcnRzIHdpdGggMFxuICBkYXkgPSArKG1hdGNoWzNdKTtcblxuICBpZiAoIW1hdGNoWzRdKSB7IC8vIG5vIGhvdXJcbiAgICByZXR1cm4gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSkpO1xuICB9XG5cbiAgLy8gbWF0Y2g6IFs0XSBob3VyIFs1XSBtaW51dGUgWzZdIHNlY29uZCBbN10gZnJhY3Rpb25cblxuICBob3VyID0gKyhtYXRjaFs0XSk7XG4gIG1pbnV0ZSA9ICsobWF0Y2hbNV0pO1xuICBzZWNvbmQgPSArKG1hdGNoWzZdKTtcblxuICBpZiAobWF0Y2hbN10pIHtcbiAgICBmcmFjdGlvbiA9IG1hdGNoWzddLnNsaWNlKDAsIDMpO1xuICAgIHdoaWxlIChmcmFjdGlvbi5sZW5ndGggPCAzKSB7IC8vIG1pbGxpLXNlY29uZHNcbiAgICAgIGZyYWN0aW9uICs9ICcwJztcbiAgICB9XG4gICAgZnJhY3Rpb24gPSArZnJhY3Rpb247XG4gIH1cblxuICAvLyBtYXRjaDogWzhdIHR6IFs5XSB0el9zaWduIFsxMF0gdHpfaG91ciBbMTFdIHR6X21pbnV0ZVxuXG4gIGlmIChtYXRjaFs5XSkge1xuICAgIHR6X2hvdXIgPSArKG1hdGNoWzEwXSk7XG4gICAgdHpfbWludXRlID0gKyhtYXRjaFsxMV0gfHwgMCk7XG4gICAgZGVsdGEgPSAodHpfaG91ciAqIDYwICsgdHpfbWludXRlKSAqIDYwMDAwOyAvLyBkZWx0YSBpbiBtaWxpLXNlY29uZHNcbiAgICBpZiAobWF0Y2hbOV0gPT09ICctJykgZGVsdGEgPSAtZGVsdGE7XG4gIH1cblxuICBkYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoeWVhciwgbW9udGgsIGRheSwgaG91ciwgbWludXRlLCBzZWNvbmQsIGZyYWN0aW9uKSk7XG5cbiAgaWYgKGRlbHRhKSBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgLSBkZWx0YSk7XG5cbiAgcmV0dXJuIGRhdGU7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxUaW1lc3RhbXAob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHJldHVybiBvYmplY3QudG9JU09TdHJpbmcoKTtcbn1cblxudmFyIHRpbWVzdGFtcCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjp0aW1lc3RhbXAnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbFRpbWVzdGFtcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sVGltZXN0YW1wLFxuICBpbnN0YW5jZU9mOiBEYXRlLFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxUaW1lc3RhbXBcbn0pO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbE1lcmdlKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgPT09ICc8PCcgfHwgZGF0YSA9PT0gbnVsbDtcbn1cblxudmFyIG1lcmdlID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm1lcmdlJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxNZXJnZVxufSk7XG5cbi8qZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSovXG5cblxuXG5cblxuLy8gWyA2NCwgNjUsIDY2IF0gLT4gWyBwYWRkaW5nLCBDUiwgTEYgXVxudmFyIEJBU0U2NF9NQVAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cXG5cXHInO1xuXG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sQmluYXJ5KGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgY29kZSwgaWR4LCBiaXRsZW4gPSAwLCBtYXggPSBkYXRhLmxlbmd0aCwgbWFwID0gQkFTRTY0X01BUDtcblxuICAvLyBDb252ZXJ0IG9uZSBieSBvbmUuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGNvZGUgPSBtYXAuaW5kZXhPZihkYXRhLmNoYXJBdChpZHgpKTtcblxuICAgIC8vIFNraXAgQ1IvTEZcbiAgICBpZiAoY29kZSA+IDY0KSBjb250aW51ZTtcblxuICAgIC8vIEZhaWwgb24gaWxsZWdhbCBjaGFyYWN0ZXJzXG4gICAgaWYgKGNvZGUgPCAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBiaXRsZW4gKz0gNjtcbiAgfVxuXG4gIC8vIElmIHRoZXJlIGFyZSBhbnkgYml0cyBsZWZ0LCBzb3VyY2Ugd2FzIGNvcnJ1cHRlZFxuICByZXR1cm4gKGJpdGxlbiAlIDgpID09PSAwO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sQmluYXJ5KGRhdGEpIHtcbiAgdmFyIGlkeCwgdGFpbGJpdHMsXG4gICAgICBpbnB1dCA9IGRhdGEucmVwbGFjZSgvW1xcclxcbj1dL2csICcnKSwgLy8gcmVtb3ZlIENSL0xGICYgcGFkZGluZyB0byBzaW1wbGlmeSBzY2FuXG4gICAgICBtYXggPSBpbnB1dC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQLFxuICAgICAgYml0cyA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICAvLyBDb2xsZWN0IGJ5IDYqNCBiaXRzICgzIGJ5dGVzKVxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgNCA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQucHVzaCgoYml0cyA+PiAxNikgJiAweEZGKTtcbiAgICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgICByZXN1bHQucHVzaChiaXRzICYgMHhGRik7XG4gICAgfVxuXG4gICAgYml0cyA9IChiaXRzIDw8IDYpIHwgbWFwLmluZGV4T2YoaW5wdXQuY2hhckF0KGlkeCkpO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbGJpdHMgPSAobWF4ICUgNCkgKiA2O1xuXG4gIGlmICh0YWlsYml0cyA9PT0gMCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDE2KSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDgpICYgMHhGRik7XG4gICAgcmVzdWx0LnB1c2goYml0cyAmIDB4RkYpO1xuICB9IGVsc2UgaWYgKHRhaWxiaXRzID09PSAxOCkge1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDEwKSAmIDB4RkYpO1xuICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDIpICYgMHhGRik7XG4gIH0gZWxzZSBpZiAodGFpbGJpdHMgPT09IDEyKSB7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gNCkgJiAweEZGKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgVWludDhBcnJheShyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sQmluYXJ5KG9iamVjdCAvKiwgc3R5bGUqLykge1xuICB2YXIgcmVzdWx0ID0gJycsIGJpdHMgPSAwLCBpZHgsIHRhaWwsXG4gICAgICBtYXggPSBvYmplY3QubGVuZ3RoLFxuICAgICAgbWFwID0gQkFTRTY0X01BUDtcblxuICAvLyBDb252ZXJ0IGV2ZXJ5IHRocmVlIGJ5dGVzIHRvIDQgQVNDSUkgY2hhcmFjdGVycy5cblxuICBmb3IgKGlkeCA9IDA7IGlkeCA8IG1heDsgaWR4KyspIHtcbiAgICBpZiAoKGlkeCAlIDMgPT09IDApICYmIGlkeCkge1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxOCkgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTIpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDYpICYgMHgzRl07XG4gICAgICByZXN1bHQgKz0gbWFwW2JpdHMgJiAweDNGXTtcbiAgICB9XG5cbiAgICBiaXRzID0gKGJpdHMgPDwgOCkgKyBvYmplY3RbaWR4XTtcbiAgfVxuXG4gIC8vIER1bXAgdGFpbFxuXG4gIHRhaWwgPSBtYXggJSAzO1xuXG4gIGlmICh0YWlsID09PSAwKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxOCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwW2JpdHMgJiAweDNGXTtcbiAgfSBlbHNlIGlmICh0YWlsID09PSAyKSB7XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDQpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA8PCAyKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbNjRdO1xuICB9IGVsc2UgaWYgKHRhaWwgPT09IDEpIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA8PCA0KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbNjRdO1xuICAgIHJlc3VsdCArPSBtYXBbNjRdO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gaXNCaW5hcnkob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gICdbb2JqZWN0IFVpbnQ4QXJyYXldJztcbn1cblxudmFyIGJpbmFyeSA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpiaW5hcnknLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEJpbmFyeSxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQmluYXJ5LFxuICBwcmVkaWNhdGU6IGlzQmluYXJ5LFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxCaW5hcnlcbn0pO1xuXG52YXIgX2hhc093blByb3BlcnR5JDMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIF90b1N0cmluZyQyICAgICAgID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxPbWFwKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBvYmplY3RLZXlzID0gW10sIGluZGV4LCBsZW5ndGgsIHBhaXIsIHBhaXJLZXksIHBhaXJIYXNLZXksXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuICAgIHBhaXJIYXNLZXkgPSBmYWxzZTtcblxuICAgIGlmIChfdG9TdHJpbmckMi5jYWxsKHBhaXIpICE9PSAnW29iamVjdCBPYmplY3RdJykgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChwYWlyS2V5IGluIHBhaXIpIHtcbiAgICAgIGlmIChfaGFzT3duUHJvcGVydHkkMy5jYWxsKHBhaXIsIHBhaXJLZXkpKSB7XG4gICAgICAgIGlmICghcGFpckhhc0tleSkgcGFpckhhc0tleSA9IHRydWU7XG4gICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcGFpckhhc0tleSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKG9iamVjdEtleXMuaW5kZXhPZihwYWlyS2V5KSA9PT0gLTEpIG9iamVjdEtleXMucHVzaChwYWlyS2V5KTtcbiAgICBlbHNlIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sT21hcChkYXRhKSB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IFtdO1xufVxuXG52YXIgb21hcCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpvbWFwJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE9tYXAsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbE9tYXBcbn0pO1xuXG52YXIgX3RvU3RyaW5nJDEgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiB0cnVlO1xuXG4gIHZhciBpbmRleCwgbGVuZ3RoLCBwYWlyLCBrZXlzLCByZXN1bHQsXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIHJlc3VsdCA9IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChfdG9TdHJpbmckMS5jYWxsKHBhaXIpICE9PSAnW29iamVjdCBPYmplY3RdJykgcmV0dXJuIGZhbHNlO1xuXG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHBhaXIpO1xuXG4gICAgaWYgKGtleXMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbFBhaXJzKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBbXTtcblxuICB2YXIgaW5kZXgsIGxlbmd0aCwgcGFpciwga2V5cywgcmVzdWx0LFxuICAgICAgb2JqZWN0ID0gZGF0YTtcblxuICByZXN1bHQgPSBuZXcgQXJyYXkob2JqZWN0Lmxlbmd0aCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMocGFpcik7XG5cbiAgICByZXN1bHRbaW5kZXhdID0gWyBrZXlzWzBdLCBwYWlyW2tleXNbMF1dIF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgcGFpcnMgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6cGFpcnMnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sUGFpcnMsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFBhaXJzXG59KTtcblxudmFyIF9oYXNPd25Qcm9wZXJ0eSQyID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxTZXQoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGtleSwgb2JqZWN0ID0gZGF0YTtcblxuICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoX2hhc093blByb3BlcnR5JDIuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgIGlmIChvYmplY3Rba2V5XSAhPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sU2V0KGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDoge307XG59XG5cbnZhciBzZXQgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6c2V0Jywge1xuICBraW5kOiAnbWFwcGluZycsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sU2V0LFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxTZXRcbn0pO1xuXG52YXIgX2RlZmF1bHQgPSBjb3JlLmV4dGVuZCh7XG4gIGltcGxpY2l0OiBbXG4gICAgdGltZXN0YW1wLFxuICAgIG1lcmdlXG4gIF0sXG4gIGV4cGxpY2l0OiBbXG4gICAgYmluYXJ5LFxuICAgIG9tYXAsXG4gICAgcGFpcnMsXG4gICAgc2V0XG4gIF1cbn0pO1xuXG4vKmVzbGludC1kaXNhYmxlIG1heC1sZW4sbm8tdXNlLWJlZm9yZS1kZWZpbmUqL1xuXG5cblxuXG5cblxuXG52YXIgX2hhc093blByb3BlcnR5JDEgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5cbnZhciBDT05URVhUX0ZMT1dfSU4gICA9IDE7XG52YXIgQ09OVEVYVF9GTE9XX09VVCAgPSAyO1xudmFyIENPTlRFWFRfQkxPQ0tfSU4gID0gMztcbnZhciBDT05URVhUX0JMT0NLX09VVCA9IDQ7XG5cblxudmFyIENIT01QSU5HX0NMSVAgID0gMTtcbnZhciBDSE9NUElOR19TVFJJUCA9IDI7XG52YXIgQ0hPTVBJTkdfS0VFUCAgPSAzO1xuXG5cbnZhciBQQVRURVJOX05PTl9QUklOVEFCTEUgICAgICAgICA9IC9bXFx4MDAtXFx4MDhcXHgwQlxceDBDXFx4MEUtXFx4MUZcXHg3Ri1cXHg4NFxceDg2LVxceDlGXFx1RkZGRVxcdUZGRkZdfFtcXHVEODAwLVxcdURCRkZdKD8hW1xcdURDMDAtXFx1REZGRl0pfCg/OlteXFx1RDgwMC1cXHVEQkZGXXxeKVtcXHVEQzAwLVxcdURGRkZdLztcbnZhciBQQVRURVJOX05PTl9BU0NJSV9MSU5FX0JSRUFLUyA9IC9bXFx4ODVcXHUyMDI4XFx1MjAyOV0vO1xudmFyIFBBVFRFUk5fRkxPV19JTkRJQ0FUT1JTICAgICAgID0gL1ssXFxbXFxdXFx7XFx9XS87XG52YXIgUEFUVEVSTl9UQUdfSEFORExFICAgICAgICAgICAgPSAvXig/OiF8ISF8IVthLXpcXC1dKyEpJC9pO1xudmFyIFBBVFRFUk5fVEFHX1VSSSAgICAgICAgICAgICAgID0gL14oPzohfFteLFxcW1xcXVxce1xcfV0pKD86JVswLTlhLWZdezJ9fFswLTlhLXpcXC0jO1xcL1xcPzpAJj1cXCtcXCQsX1xcLiF+XFwqJ1xcKFxcKVxcW1xcXV0pKiQvaTtcblxuXG5mdW5jdGlvbiBfY2xhc3Mob2JqKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTsgfVxuXG5mdW5jdGlvbiBpc19FT0woYykge1xuICByZXR1cm4gKGMgPT09IDB4MEEvKiBMRiAqLykgfHwgKGMgPT09IDB4MEQvKiBDUiAqLyk7XG59XG5cbmZ1bmN0aW9uIGlzX1dISVRFX1NQQUNFKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fCAoYyA9PT0gMHgyMC8qIFNwYWNlICovKTtcbn1cblxuZnVuY3Rpb24gaXNfV1NfT1JfRU9MKGMpIHtcbiAgcmV0dXJuIChjID09PSAweDA5LyogVGFiICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MjAvKiBTcGFjZSAqLykgfHxcbiAgICAgICAgIChjID09PSAweDBBLyogTEYgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgwRC8qIENSICovKTtcbn1cblxuZnVuY3Rpb24gaXNfRkxPV19JTkRJQ0FUT1IoYykge1xuICByZXR1cm4gYyA9PT0gMHgyQy8qICwgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4NUIvKiBbICovIHx8XG4gICAgICAgICBjID09PSAweDVELyogXSAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg3Qi8qIHsgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4N0QvKiB9ICovO1xufVxuXG5mdW5jdGlvbiBmcm9tSGV4Q29kZShjKSB7XG4gIHZhciBsYztcblxuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSovXG4gIGxjID0gYyB8IDB4MjA7XG5cbiAgaWYgKCgweDYxLyogYSAqLyA8PSBsYykgJiYgKGxjIDw9IDB4NjYvKiBmICovKSkge1xuICAgIHJldHVybiBsYyAtIDB4NjEgKyAxMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlZEhleExlbihjKSB7XG4gIGlmIChjID09PSAweDc4LyogeCAqLykgeyByZXR1cm4gMjsgfVxuICBpZiAoYyA9PT0gMHg3NS8qIHUgKi8pIHsgcmV0dXJuIDQ7IH1cbiAgaWYgKGMgPT09IDB4NTUvKiBVICovKSB7IHJldHVybiA4OyB9XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBmcm9tRGVjaW1hbENvZGUoYykge1xuICBpZiAoKDB4MzAvKiAwICovIDw9IGMpICYmIChjIDw9IDB4MzkvKiA5ICovKSkge1xuICAgIHJldHVybiBjIC0gMHgzMDtcbiAgfVxuXG4gIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlRXNjYXBlU2VxdWVuY2UoYykge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBpbmRlbnQgKi9cbiAgcmV0dXJuIChjID09PSAweDMwLyogMCAqLykgPyAnXFx4MDAnIDpcbiAgICAgICAgKGMgPT09IDB4NjEvKiBhICovKSA/ICdcXHgwNycgOlxuICAgICAgICAoYyA9PT0gMHg2Mi8qIGIgKi8pID8gJ1xceDA4JyA6XG4gICAgICAgIChjID09PSAweDc0LyogdCAqLykgPyAnXFx4MDknIDpcbiAgICAgICAgKGMgPT09IDB4MDkvKiBUYWIgKi8pID8gJ1xceDA5JyA6XG4gICAgICAgIChjID09PSAweDZFLyogbiAqLykgPyAnXFx4MEEnIDpcbiAgICAgICAgKGMgPT09IDB4NzYvKiB2ICovKSA/ICdcXHgwQicgOlxuICAgICAgICAoYyA9PT0gMHg2Ni8qIGYgKi8pID8gJ1xceDBDJyA6XG4gICAgICAgIChjID09PSAweDcyLyogciAqLykgPyAnXFx4MEQnIDpcbiAgICAgICAgKGMgPT09IDB4NjUvKiBlICovKSA/ICdcXHgxQicgOlxuICAgICAgICAoYyA9PT0gMHgyMC8qIFNwYWNlICovKSA/ICcgJyA6XG4gICAgICAgIChjID09PSAweDIyLyogXCIgKi8pID8gJ1xceDIyJyA6XG4gICAgICAgIChjID09PSAweDJGLyogLyAqLykgPyAnLycgOlxuICAgICAgICAoYyA9PT0gMHg1Qy8qIFxcICovKSA/ICdcXHg1QycgOlxuICAgICAgICAoYyA9PT0gMHg0RS8qIE4gKi8pID8gJ1xceDg1JyA6XG4gICAgICAgIChjID09PSAweDVGLyogXyAqLykgPyAnXFx4QTAnIDpcbiAgICAgICAgKGMgPT09IDB4NEMvKiBMICovKSA/ICdcXHUyMDI4JyA6XG4gICAgICAgIChjID09PSAweDUwLyogUCAqLykgPyAnXFx1MjAyOScgOiAnJztcbn1cblxuZnVuY3Rpb24gY2hhckZyb21Db2RlcG9pbnQoYykge1xuICBpZiAoYyA8PSAweEZGRkYpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgfVxuICAvLyBFbmNvZGUgVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyXG4gIC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1VURi0xNiNDb2RlX3BvaW50c19VLjJCMDEwMDAwX3RvX1UuMkIxMEZGRkZcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXG4gICAgKChjIC0gMHgwMTAwMDApID4+IDEwKSArIDB4RDgwMCxcbiAgICAoKGMgLSAweDAxMDAwMCkgJiAweDAzRkYpICsgMHhEQzAwXG4gICk7XG59XG5cbi8vIHNldCBhIHByb3BlcnR5IG9mIGEgbGl0ZXJhbCBvYmplY3QsIHdoaWxlIHByb3RlY3RpbmcgYWdhaW5zdCBwcm90b3R5cGUgcG9sbHV0aW9uLFxuLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlY2EvanMteWFtbC9pc3N1ZXMvMTY0IGZvciBtb3JlIGRldGFpbHNcbmZ1bmN0aW9uIHNldFByb3BlcnR5KG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICAvLyB1c2VkIGZvciB0aGlzIHNwZWNpZmljIGtleSBvbmx5IGJlY2F1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGlzIHNsb3dcbiAgaWYgKGtleSA9PT0gJ19fcHJvdG9fXycpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxudmFyIHNpbXBsZUVzY2FwZUNoZWNrID0gbmV3IEFycmF5KDI1Nik7IC8vIGludGVnZXIsIGZvciBmYXN0IGFjY2Vzc1xudmFyIHNpbXBsZUVzY2FwZU1hcCA9IG5ldyBBcnJheSgyNTYpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBzaW1wbGVFc2NhcGVDaGVja1tpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpID8gMSA6IDA7XG4gIHNpbXBsZUVzY2FwZU1hcFtpXSA9IHNpbXBsZUVzY2FwZVNlcXVlbmNlKGkpO1xufVxuXG5cbmZ1bmN0aW9uIFN0YXRlJDEoaW5wdXQsIG9wdGlvbnMpIHtcbiAgdGhpcy5pbnB1dCA9IGlucHV0O1xuXG4gIHRoaXMuZmlsZW5hbWUgID0gb3B0aW9uc1snZmlsZW5hbWUnXSAgfHwgbnVsbDtcbiAgdGhpcy5zY2hlbWEgICAgPSBvcHRpb25zWydzY2hlbWEnXSAgICB8fCBfZGVmYXVsdDtcbiAgdGhpcy5vbldhcm5pbmcgPSBvcHRpb25zWydvbldhcm5pbmcnXSB8fCBudWxsO1xuICAvLyAoSGlkZGVuKSBSZW1vdmU/IG1ha2VzIHRoZSBsb2FkZXIgdG8gZXhwZWN0IFlBTUwgMS4xIGRvY3VtZW50c1xuICAvLyBpZiBzdWNoIGRvY3VtZW50cyBoYXZlIG5vIGV4cGxpY2l0ICVZQU1MIGRpcmVjdGl2ZVxuICB0aGlzLmxlZ2FjeSAgICA9IG9wdGlvbnNbJ2xlZ2FjeSddICAgIHx8IGZhbHNlO1xuXG4gIHRoaXMuanNvbiAgICAgID0gb3B0aW9uc1snanNvbiddICAgICAgfHwgZmFsc2U7XG4gIHRoaXMubGlzdGVuZXIgID0gb3B0aW9uc1snbGlzdGVuZXInXSAgfHwgbnVsbDtcblxuICB0aGlzLmltcGxpY2l0VHlwZXMgPSB0aGlzLnNjaGVtYS5jb21waWxlZEltcGxpY2l0O1xuICB0aGlzLnR5cGVNYXAgICAgICAgPSB0aGlzLnNjaGVtYS5jb21waWxlZFR5cGVNYXA7XG5cbiAgdGhpcy5sZW5ndGggICAgID0gaW5wdXQubGVuZ3RoO1xuICB0aGlzLnBvc2l0aW9uICAgPSAwO1xuICB0aGlzLmxpbmUgICAgICAgPSAwO1xuICB0aGlzLmxpbmVTdGFydCAgPSAwO1xuICB0aGlzLmxpbmVJbmRlbnQgPSAwO1xuXG4gIC8vIHBvc2l0aW9uIG9mIGZpcnN0IGxlYWRpbmcgdGFiIGluIHRoZSBjdXJyZW50IGxpbmUsXG4gIC8vIHVzZWQgdG8gbWFrZSBzdXJlIHRoZXJlIGFyZSBubyB0YWJzIGluIHRoZSBpbmRlbnRhdGlvblxuICB0aGlzLmZpcnN0VGFiSW5MaW5lID0gLTE7XG5cbiAgdGhpcy5kb2N1bWVudHMgPSBbXTtcblxuICAvKlxuICB0aGlzLnZlcnNpb247XG4gIHRoaXMuY2hlY2tMaW5lQnJlYWtzO1xuICB0aGlzLnRhZ01hcDtcbiAgdGhpcy5hbmNob3JNYXA7XG4gIHRoaXMudGFnO1xuICB0aGlzLmFuY2hvcjtcbiAgdGhpcy5raW5kO1xuICB0aGlzLnJlc3VsdDsqL1xuXG59XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICB2YXIgbWFyayA9IHtcbiAgICBuYW1lOiAgICAgc3RhdGUuZmlsZW5hbWUsXG4gICAgYnVmZmVyOiAgIHN0YXRlLmlucHV0LnNsaWNlKDAsIC0xKSwgLy8gb21pdCB0cmFpbGluZyBcXDBcbiAgICBwb3NpdGlvbjogc3RhdGUucG9zaXRpb24sXG4gICAgbGluZTogICAgIHN0YXRlLmxpbmUsXG4gICAgY29sdW1uOiAgIHN0YXRlLnBvc2l0aW9uIC0gc3RhdGUubGluZVN0YXJ0XG4gIH07XG5cbiAgbWFyay5zbmlwcGV0ID0gc25pcHBldChtYXJrKTtcblxuICByZXR1cm4gbmV3IGV4Y2VwdGlvbihtZXNzYWdlLCBtYXJrKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dFcnJvcihzdGF0ZSwgbWVzc2FnZSkge1xuICB0aHJvdyBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKTtcbn1cblxuZnVuY3Rpb24gdGhyb3dXYXJuaW5nKHN0YXRlLCBtZXNzYWdlKSB7XG4gIGlmIChzdGF0ZS5vbldhcm5pbmcpIHtcbiAgICBzdGF0ZS5vbldhcm5pbmcuY2FsbChudWxsLCBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSk7XG4gIH1cbn1cblxuXG52YXIgZGlyZWN0aXZlSGFuZGxlcnMgPSB7XG5cbiAgWUFNTDogZnVuY3Rpb24gaGFuZGxlWWFtbERpcmVjdGl2ZShzdGF0ZSwgbmFtZSwgYXJncykge1xuXG4gICAgdmFyIG1hdGNoLCBtYWpvciwgbWlub3I7XG5cbiAgICBpZiAoc3RhdGUudmVyc2lvbiAhPT0gbnVsbCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mICVZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ1lBTUwgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSBvbmUgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBtYXRjaCA9IC9eKFswLTldKylcXC4oWzAtOV0rKSQvLmV4ZWMoYXJnc1swXSk7XG5cbiAgICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIGFyZ3VtZW50IG9mIHRoZSBZQU1MIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIG1ham9yID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICBtaW5vciA9IHBhcnNlSW50KG1hdGNoWzJdLCAxMCk7XG5cbiAgICBpZiAobWFqb3IgIT09IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgWUFNTCB2ZXJzaW9uIG9mIHRoZSBkb2N1bWVudCcpO1xuICAgIH1cblxuICAgIHN0YXRlLnZlcnNpb24gPSBhcmdzWzBdO1xuICAgIHN0YXRlLmNoZWNrTGluZUJyZWFrcyA9IChtaW5vciA8IDIpO1xuXG4gICAgaWYgKG1pbm9yICE9PSAxICYmIG1pbm9yICE9PSAyKSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bnN1cHBvcnRlZCBZQU1MIHZlcnNpb24gb2YgdGhlIGRvY3VtZW50Jyk7XG4gICAgfVxuICB9LFxuXG4gIFRBRzogZnVuY3Rpb24gaGFuZGxlVGFnRGlyZWN0aXZlKHN0YXRlLCBuYW1lLCBhcmdzKSB7XG5cbiAgICB2YXIgaGFuZGxlLCBwcmVmaXg7XG5cbiAgICBpZiAoYXJncy5sZW5ndGggIT09IDIpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdUQUcgZGlyZWN0aXZlIGFjY2VwdHMgZXhhY3RseSB0d28gYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlID0gYXJnc1swXTtcbiAgICBwcmVmaXggPSBhcmdzWzFdO1xuXG4gICAgaWYgKCFQQVRURVJOX1RBR19IQU5ETEUudGVzdChoYW5kbGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgaGFuZGxlIChmaXJzdCBhcmd1bWVudCkgb2YgdGhlIFRBRyBkaXJlY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS50YWdNYXAsIGhhbmRsZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0aGVyZSBpcyBhIHByZXZpb3VzbHkgZGVjbGFyZWQgc3VmZml4IGZvciBcIicgKyBoYW5kbGUgKyAnXCIgdGFnIGhhbmRsZScpO1xuICAgIH1cblxuICAgIGlmICghUEFUVEVSTl9UQUdfVVJJLnRlc3QocHJlZml4KSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgdGFnIHByZWZpeCAoc2Vjb25kIGFyZ3VtZW50KSBvZiB0aGUgVEFHIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcmVmaXggPSBkZWNvZGVVUklDb21wb25lbnQocHJlZml4KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgcHJlZml4IGlzIG1hbGZvcm1lZDogJyArIHByZWZpeCk7XG4gICAgfVxuXG4gICAgc3RhdGUudGFnTWFwW2hhbmRsZV0gPSBwcmVmaXg7XG4gIH1cbn07XG5cblxuZnVuY3Rpb24gY2FwdHVyZVNlZ21lbnQoc3RhdGUsIHN0YXJ0LCBlbmQsIGNoZWNrSnNvbikge1xuICB2YXIgX3Bvc2l0aW9uLCBfbGVuZ3RoLCBfY2hhcmFjdGVyLCBfcmVzdWx0O1xuXG4gIGlmIChzdGFydCA8IGVuZCkge1xuICAgIF9yZXN1bHQgPSBzdGF0ZS5pbnB1dC5zbGljZShzdGFydCwgZW5kKTtcblxuICAgIGlmIChjaGVja0pzb24pIHtcbiAgICAgIGZvciAoX3Bvc2l0aW9uID0gMCwgX2xlbmd0aCA9IF9yZXN1bHQubGVuZ3RoOyBfcG9zaXRpb24gPCBfbGVuZ3RoOyBfcG9zaXRpb24gKz0gMSkge1xuICAgICAgICBfY2hhcmFjdGVyID0gX3Jlc3VsdC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG4gICAgICAgIGlmICghKF9jaGFyYWN0ZXIgPT09IDB4MDkgfHxcbiAgICAgICAgICAgICAgKDB4MjAgPD0gX2NoYXJhY3RlciAmJiBfY2hhcmFjdGVyIDw9IDB4MTBGRkZGKSkpIHtcbiAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZXhwZWN0ZWQgdmFsaWQgSlNPTiBjaGFyYWN0ZXInKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoUEFUVEVSTl9OT05fUFJJTlRBQkxFLnRlc3QoX3Jlc3VsdCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0aGUgc3RyZWFtIGNvbnRhaW5zIG5vbi1wcmludGFibGUgY2hhcmFjdGVycycpO1xuICAgIH1cblxuICAgIHN0YXRlLnJlc3VsdCArPSBfcmVzdWx0O1xuICB9XG59XG5cbmZ1bmN0aW9uIG1lcmdlTWFwcGluZ3Moc3RhdGUsIGRlc3RpbmF0aW9uLCBzb3VyY2UsIG92ZXJyaWRhYmxlS2V5cykge1xuICB2YXIgc291cmNlS2V5cywga2V5LCBpbmRleCwgcXVhbnRpdHk7XG5cbiAgaWYgKCFjb21tb24uaXNPYmplY3Qoc291cmNlKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW5ub3QgbWVyZ2UgbWFwcGluZ3M7IHRoZSBwcm92aWRlZCBzb3VyY2Ugb2JqZWN0IGlzIHVuYWNjZXB0YWJsZScpO1xuICB9XG5cbiAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgcXVhbnRpdHk7IGluZGV4ICs9IDEpIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcblxuICAgIGlmICghX2hhc093blByb3BlcnR5JDEuY2FsbChkZXN0aW5hdGlvbiwga2V5KSkge1xuICAgICAgc2V0UHJvcGVydHkoZGVzdGluYXRpb24sIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgb3ZlcnJpZGFibGVLZXlzW2tleV0gPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLFxuICBzdGFydExpbmUsIHN0YXJ0TGluZVN0YXJ0LCBzdGFydFBvcykge1xuXG4gIHZhciBpbmRleCwgcXVhbnRpdHk7XG5cbiAgLy8gVGhlIG91dHB1dCBpcyBhIHBsYWluIG9iamVjdCBoZXJlLCBzbyBrZXlzIGNhbiBvbmx5IGJlIHN0cmluZ3MuXG4gIC8vIFdlIG5lZWQgdG8gY29udmVydCBrZXlOb2RlIHRvIGEgc3RyaW5nLCBidXQgZG9pbmcgc28gY2FuIGhhbmcgdGhlIHByb2Nlc3NcbiAgLy8gKGRlZXBseSBuZXN0ZWQgYXJyYXlzIHRoYXQgZXhwbG9kZSBleHBvbmVudGlhbGx5IHVzaW5nIGFsaWFzZXMpLlxuICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlKSkge1xuICAgIGtleU5vZGUgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChrZXlOb2RlKTtcblxuICAgIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IGtleU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShrZXlOb2RlW2luZGV4XSkpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25lc3RlZCBhcnJheXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIGtleXMnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBrZXlOb2RlID09PSAnb2JqZWN0JyAmJiBfY2xhc3Moa2V5Tm9kZVtpbmRleF0pID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICBrZXlOb2RlW2luZGV4XSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEF2b2lkIGNvZGUgZXhlY3V0aW9uIGluIGxvYWQoKSB2aWEgdG9TdHJpbmcgcHJvcGVydHlcbiAgLy8gKHN0aWxsIHVzZSBpdHMgb3duIHRvU3RyaW5nIGZvciBhcnJheXMsIHRpbWVzdGFtcHMsXG4gIC8vIGFuZCB3aGF0ZXZlciB1c2VyIHNjaGVtYSBleHRlbnNpb25zIGhhcHBlbiB0byBoYXZlIEBAdG9TdHJpbmdUYWcpXG4gIGlmICh0eXBlb2Yga2V5Tm9kZSA9PT0gJ29iamVjdCcgJiYgX2NsYXNzKGtleU5vZGUpID09PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgIGtleU5vZGUgPSAnW29iamVjdCBPYmplY3RdJztcbiAgfVxuXG5cbiAga2V5Tm9kZSA9IFN0cmluZyhrZXlOb2RlKTtcblxuICBpZiAoX3Jlc3VsdCA9PT0gbnVsbCkge1xuICAgIF9yZXN1bHQgPSB7fTtcbiAgfVxuXG4gIGlmIChrZXlUYWcgPT09ICd0YWc6eWFtbC5vcmcsMjAwMjptZXJnZScpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZU5vZGUpKSB7XG4gICAgICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSB2YWx1ZU5vZGUubGVuZ3RoOyBpbmRleCA8IHF1YW50aXR5OyBpbmRleCArPSAxKSB7XG4gICAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZVtpbmRleF0sIG92ZXJyaWRhYmxlS2V5cyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lcmdlTWFwcGluZ3Moc3RhdGUsIF9yZXN1bHQsIHZhbHVlTm9kZSwgb3ZlcnJpZGFibGVLZXlzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFzdGF0ZS5qc29uICYmXG4gICAgICAgICFfaGFzT3duUHJvcGVydHkkMS5jYWxsKG92ZXJyaWRhYmxlS2V5cywga2V5Tm9kZSkgJiZcbiAgICAgICAgX2hhc093blByb3BlcnR5JDEuY2FsbChfcmVzdWx0LCBrZXlOb2RlKSkge1xuICAgICAgc3RhdGUubGluZSA9IHN0YXJ0TGluZSB8fCBzdGF0ZS5saW5lO1xuICAgICAgc3RhdGUubGluZVN0YXJ0ID0gc3RhcnRMaW5lU3RhcnQgfHwgc3RhdGUubGluZVN0YXJ0O1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGFydFBvcyB8fCBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGVkIG1hcHBpbmcga2V5Jyk7XG4gICAgfVxuXG4gICAgc2V0UHJvcGVydHkoX3Jlc3VsdCwga2V5Tm9kZSwgdmFsdWVOb2RlKTtcbiAgICBkZWxldGUgb3ZlcnJpZGFibGVLZXlzW2tleU5vZGVdO1xuICB9XG5cbiAgcmV0dXJuIF9yZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRMaW5lQnJlYWsoc3RhdGUpIHtcbiAgdmFyIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDBBLyogTEYgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICB9IGVsc2UgaWYgKGNoID09PSAweDBELyogQ1IgKi8pIHtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIGlmIChzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSA9PT0gMHgwQS8qIExGICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYSBsaW5lIGJyZWFrIGlzIGV4cGVjdGVkJyk7XG4gIH1cblxuICBzdGF0ZS5saW5lICs9IDE7XG4gIHN0YXRlLmxpbmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xuICBzdGF0ZS5maXJzdFRhYkluTGluZSA9IC0xO1xufVxuXG5mdW5jdGlvbiBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBhbGxvd0NvbW1lbnRzLCBjaGVja0luZGVudCkge1xuICB2YXIgbGluZUJyZWFrcyA9IDAsXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgIGlmIChjaCA9PT0gMHgwOS8qIFRhYiAqLyAmJiBzdGF0ZS5maXJzdFRhYkluTGluZSA9PT0gLTEpIHtcbiAgICAgICAgc3RhdGUuZmlyc3RUYWJJbkxpbmUgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIH1cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoYWxsb3dDb21tZW50cyAmJiBjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgIGRvIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfSB3aGlsZSAoY2ggIT09IDB4MEEvKiBMRiAqLyAmJiBjaCAhPT0gMHgwRC8qIENSICovICYmIGNoICE9PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBsaW5lQnJlYWtzKys7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgICAgd2hpbGUgKGNoID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICAgICAgc3RhdGUubGluZUluZGVudCsrO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGVja0luZGVudCAhPT0gLTEgJiYgbGluZUJyZWFrcyAhPT0gMCAmJiBzdGF0ZS5saW5lSW5kZW50IDwgY2hlY2tJbmRlbnQpIHtcbiAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICdkZWZpY2llbnQgaW5kZW50YXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiBsaW5lQnJlYWtzO1xufVxuXG5mdW5jdGlvbiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbik7XG5cbiAgLy8gQ29uZGl0aW9uIHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgaXMgdGVzdGVkXG4gIC8vIGluIHBhcmVudCBvbiBlYWNoIGNhbGwsIGZvciBlZmZpY2llbmN5LiBObyBuZWVkcyB0byB0ZXN0IGhlcmUgYWdhaW4uXG4gIGlmICgoY2ggPT09IDB4MkQvKiAtICovIHx8IGNoID09PSAweDJFLyogLiAqLykgJiZcbiAgICAgIGNoID09PSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbiArIDEpICYmXG4gICAgICBjaCA9PT0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24gKyAyKSkge1xuXG4gICAgX3Bvc2l0aW9uICs9IDM7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMCB8fCBpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIGNvdW50KSB7XG4gIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHN0YXRlLnJlc3VsdCArPSAnICc7XG4gIH0gZWxzZSBpZiAoY291bnQgPiAxKSB7XG4gICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGNvdW50IC0gMSk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiByZWFkUGxhaW5TY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQsIHdpdGhpbkZsb3dDb2xsZWN0aW9uKSB7XG4gIHZhciBwcmVjZWRpbmcsXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICBjYXB0dXJlU3RhcnQsXG4gICAgICBjYXB0dXJlRW5kLFxuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQsXG4gICAgICBfbGluZSxcbiAgICAgIF9saW5lU3RhcnQsXG4gICAgICBfbGluZUluZGVudCxcbiAgICAgIF9raW5kID0gc3RhdGUua2luZCxcbiAgICAgIF9yZXN1bHQgPSBzdGF0ZS5yZXN1bHQsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChpc19XU19PUl9FT0woY2gpICAgICAgfHxcbiAgICAgIGlzX0ZMT1dfSU5ESUNBVE9SKGNoKSB8fFxuICAgICAgY2ggPT09IDB4MjMvKiAjICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNi8qICYgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDJBLyogKiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjEvKiAhICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg3Qy8qIHwgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDNFLyogPiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MjcvKiAnICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyMi8qIFwiICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNS8qICUgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDQwLyogQCAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4NjAvKiBgICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGNoID09PSAweDNGLyogPyAqLyB8fCBjaCA9PT0gMHgyRC8qIC0gKi8pIHtcbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoaXNfV1NfT1JfRU9MKGZvbGxvd2luZykgfHxcbiAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoZm9sbG93aW5nKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4M0EvKiA6ICovKSB7XG4gICAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgIGlmIChpc19XU19PUl9FT0woZm9sbG93aW5nKSB8fFxuICAgICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGZvbGxvd2luZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgcHJlY2VkaW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiAtIDEpO1xuXG4gICAgICBpZiAoaXNfV1NfT1JfRU9MKHByZWNlZGluZykpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHx8XG4gICAgICAgICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihjaCkpIHtcbiAgICAgIGJyZWFrO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgICBfbGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgX2xpbmVJbmRlbnQgPSBzdGF0ZS5saW5lSW5kZW50O1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIC0xKTtcblxuICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPj0gbm9kZUluZGVudCkge1xuICAgICAgICBoYXNQZW5kaW5nQ29udGVudCA9IHRydWU7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucG9zaXRpb24gPSBjYXB0dXJlRW5kO1xuICAgICAgICBzdGF0ZS5saW5lID0gX2xpbmU7XG4gICAgICAgIHN0YXRlLmxpbmVTdGFydCA9IF9saW5lU3RhcnQ7XG4gICAgICAgIHN0YXRlLmxpbmVJbmRlbnQgPSBfbGluZUluZGVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1BlbmRpbmdDb250ZW50KSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBzdGF0ZS5saW5lIC0gX2xpbmUpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgaGFzUGVuZGluZ0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uICsgMTtcbiAgICB9XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIH1cblxuICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCBmYWxzZSk7XG5cbiAgaWYgKHN0YXRlLnJlc3VsdCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9IF9raW5kO1xuICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlYWRTaW5nbGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNoLFxuICAgICAgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI3LyogJyAqLykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRlLmtpbmQgPSAnc2NhbGFyJztcbiAgc3RhdGUucmVzdWx0ID0gJyc7XG4gIHN0YXRlLnBvc2l0aW9uKys7XG4gIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoKGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikpICE9PSAwKSB7XG4gICAgaWYgKGNoID09PSAweDI3LyogJyAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICBpZiAoY2ggPT09IDB4MjcvKiAnICovKSB7XG4gICAgICAgIGNhcHR1cmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgY2FwdHVyZUVuZCwgdHJ1ZSk7XG4gICAgICB3cml0ZUZvbGRlZExpbmVzKHN0YXRlLCBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgbm9kZUluZGVudCkpO1xuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gc3RhdGUubGluZVN0YXJ0ICYmIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgZG9jdW1lbnQgd2l0aGluIGEgc2luZ2xlIHF1b3RlZCBzY2FsYXInKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIHNpbmdsZSBxdW90ZWQgc2NhbGFyJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGNhcHR1cmVFbmQsXG4gICAgICBoZXhMZW5ndGgsXG4gICAgICBoZXhSZXN1bHQsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyMi8qIFwiICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcbiAgc3RhdGUucG9zaXRpb24rKztcbiAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4MjIvKiBcIiAqLykge1xuICAgICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIHRydWUpO1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHg1Qy8qIFxcICovKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgdHJ1ZSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KTtcblxuICAgICAgICAvLyBUT0RPOiByZXdvcmsgdG8gaW5saW5lIGZuIHdpdGggbm8gdHlwZSBjYXN0P1xuICAgICAgfSBlbHNlIGlmIChjaCA8IDI1NiAmJiBzaW1wbGVFc2NhcGVDaGVja1tjaF0pIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IHNpbXBsZUVzY2FwZU1hcFtjaF07XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICAgIH0gZWxzZSBpZiAoKHRtcCA9IGVzY2FwZWRIZXhMZW4oY2gpKSA+IDApIHtcbiAgICAgICAgaGV4TGVuZ3RoID0gdG1wO1xuICAgICAgICBoZXhSZXN1bHQgPSAwO1xuXG4gICAgICAgIGZvciAoOyBoZXhMZW5ndGggPiAwOyBoZXhMZW5ndGgtLSkge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICgodG1wID0gZnJvbUhleENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICAgICAgICBoZXhSZXN1bHQgPSAoaGV4UmVzdWx0IDw8IDQpICsgdG1wO1xuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCBoZXhhZGVjaW1hbCBjaGFyYWN0ZXInKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY2hhckZyb21Db2RlcG9pbnQoaGV4UmVzdWx0KTtcblxuICAgICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5rbm93biBlc2NhcGUgc2VxdWVuY2UnKTtcbiAgICAgIH1cblxuICAgICAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCB0cnVlKTtcbiAgICAgIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KSk7XG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB9IGVsc2UgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBkb2N1bWVudCB3aXRoaW4gYSBkb3VibGUgcXVvdGVkIHNjYWxhcicpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgZG91YmxlIHF1b3RlZCBzY2FsYXInKTtcbn1cblxuZnVuY3Rpb24gcmVhZEZsb3dDb2xsZWN0aW9uKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciByZWFkTmV4dCA9IHRydWUsXG4gICAgICBfbGluZSxcbiAgICAgIF9saW5lU3RhcnQsXG4gICAgICBfcG9zLFxuICAgICAgX3RhZyAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBfcmVzdWx0LFxuICAgICAgX2FuY2hvciAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBmb2xsb3dpbmcsXG4gICAgICB0ZXJtaW5hdG9yLFxuICAgICAgaXNQYWlyLFxuICAgICAgaXNFeHBsaWNpdFBhaXIsXG4gICAgICBpc01hcHBpbmcsXG4gICAgICBvdmVycmlkYWJsZUtleXMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAga2V5Tm9kZSxcbiAgICAgIGtleVRhZyxcbiAgICAgIHZhbHVlTm9kZSxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDVCLyogWyAqLykge1xuICAgIHRlcm1pbmF0b3IgPSAweDVEOy8qIF0gKi9cbiAgICBpc01hcHBpbmcgPSBmYWxzZTtcbiAgICBfcmVzdWx0ID0gW107XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4N0IvKiB7ICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4N0Q7LyogfSAqL1xuICAgIGlzTWFwcGluZyA9IHRydWU7XG4gICAgX3Jlc3VsdCA9IHt9O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSB0ZXJtaW5hdG9yKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICBzdGF0ZS5raW5kID0gaXNNYXBwaW5nID8gJ21hcHBpbmcnIDogJ3NlcXVlbmNlJztcbiAgICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKCFyZWFkTmV4dCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ21pc3NlZCBjb21tYSBiZXR3ZWVuIGZsb3cgY29sbGVjdGlvbiBlbnRyaWVzJyk7XG4gICAgfSBlbHNlIGlmIChjaCA9PT0gMHgyQy8qICwgKi8pIHtcbiAgICAgIC8vIFwiZmxvdyBjb2xsZWN0aW9uIGVudHJpZXMgY2FuIG5ldmVyIGJlIGNvbXBsZXRlbHkgZW1wdHlcIiwgYXMgcGVyIFlBTUwgMS4yLCBzZWN0aW9uIDcuNFxuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgXCJleHBlY3RlZCB0aGUgbm9kZSBjb250ZW50LCBidXQgZm91bmQgJywnXCIpO1xuICAgIH1cblxuICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgIGlzUGFpciA9IGlzRXhwbGljaXRQYWlyID0gZmFsc2U7XG5cbiAgICBpZiAoY2ggPT09IDB4M0YvKiA/ICovKSB7XG4gICAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICAgIGlmIChpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuICAgICAgICBpc1BhaXIgPSBpc0V4cGxpY2l0UGFpciA9IHRydWU7XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9saW5lID0gc3RhdGUubGluZTsgLy8gU2F2ZSB0aGUgY3VycmVudCBsaW5lLlxuICAgIF9saW5lU3RhcnQgPSBzdGF0ZS5saW5lU3RhcnQ7XG4gICAgX3BvcyA9IHN0YXRlLnBvc2l0aW9uO1xuICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBrZXlUYWcgPSBzdGF0ZS50YWc7XG4gICAga2V5Tm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoKGlzRXhwbGljaXRQYWlyIHx8IHN0YXRlLmxpbmUgPT09IF9saW5lKSAmJiBjaCA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgIGlzUGFpciA9IHRydWU7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcbiAgICAgIGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0ZMT1dfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICAgIHZhbHVlTm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXBwaW5nKSB7XG4gICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBfbGluZSwgX2xpbmVTdGFydCwgX3Bvcyk7XG4gICAgfSBlbHNlIGlmIChpc1BhaXIpIHtcbiAgICAgIF9yZXN1bHQucHVzaChzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBudWxsLCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBfbGluZSwgX2xpbmVTdGFydCwgX3BvcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfcmVzdWx0LnB1c2goa2V5Tm9kZSk7XG4gICAgfVxuXG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAweDJDLyogLCAqLykge1xuICAgICAgcmVhZE5leHQgPSB0cnVlO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFkTmV4dCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIGZsb3cgY29sbGVjdGlvbicpO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIGNhcHR1cmVTdGFydCxcbiAgICAgIGZvbGRpbmcsXG4gICAgICBjaG9tcGluZyAgICAgICA9IENIT01QSU5HX0NMSVAsXG4gICAgICBkaWRSZWFkQ29udGVudCA9IGZhbHNlLFxuICAgICAgZGV0ZWN0ZWRJbmRlbnQgPSBmYWxzZSxcbiAgICAgIHRleHRJbmRlbnQgICAgID0gbm9kZUluZGVudCxcbiAgICAgIGVtcHR5TGluZXMgICAgID0gMCxcbiAgICAgIGF0TW9yZUluZGVudGVkID0gZmFsc2UsXG4gICAgICB0bXAsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHg3Qy8qIHwgKi8pIHtcbiAgICBmb2xkaW5nID0gZmFsc2U7XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4M0UvKiA+ICovKSB7XG4gICAgZm9sZGluZyA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDB4MkIvKiArICovIHx8IGNoID09PSAweDJELyogLSAqLykge1xuICAgICAgaWYgKENIT01QSU5HX0NMSVAgPT09IGNob21waW5nKSB7XG4gICAgICAgIGNob21waW5nID0gKGNoID09PSAweDJCLyogKyAqLykgPyBDSE9NUElOR19LRUVQIDogQ0hPTVBJTkdfU1RSSVA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAncmVwZWF0IG9mIGEgY2hvbXBpbmcgbW9kZSBpZGVudGlmaWVyJyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCh0bXAgPSBmcm9tRGVjaW1hbENvZGUoY2gpKSA+PSAwKSB7XG4gICAgICBpZiAodG1wID09PSAwKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgZXhwbGljaXQgaW5kZW50YXRpb24gd2lkdGggb2YgYSBibG9jayBzY2FsYXI7IGl0IGNhbm5vdCBiZSBsZXNzIHRoYW4gb25lJyk7XG4gICAgICB9IGVsc2UgaWYgKCFkZXRlY3RlZEluZGVudCkge1xuICAgICAgICB0ZXh0SW5kZW50ID0gbm9kZUluZGVudCArIHRtcCAtIDE7XG4gICAgICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdyZXBlYXQgb2YgYW4gaW5kZW50YXRpb24gd2lkdGggaWRlbnRpZmllcicpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpO1xuXG4gICAgaWYgKGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKTtcbiAgICB9XG4gIH1cblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICByZWFkTGluZUJyZWFrKHN0YXRlKTtcbiAgICBzdGF0ZS5saW5lSW5kZW50ID0gMDtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICB3aGlsZSAoKCFkZXRlY3RlZEluZGVudCB8fCBzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkgJiZcbiAgICAgICAgICAgKGNoID09PSAweDIwLyogU3BhY2UgKi8pKSB7XG4gICAgICBzdGF0ZS5saW5lSW5kZW50Kys7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKCFkZXRlY3RlZEluZGVudCAmJiBzdGF0ZS5saW5lSW5kZW50ID4gdGV4dEluZGVudCkge1xuICAgICAgdGV4dEluZGVudCA9IHN0YXRlLmxpbmVJbmRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGVtcHR5TGluZXMrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIEVuZCBvZiB0aGUgc2NhbGFyLlxuICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgdGV4dEluZGVudCkge1xuXG4gICAgICAvLyBQZXJmb3JtIHRoZSBjaG9tcGluZy5cbiAgICAgIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfS0VFUCkge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZGlkUmVhZENvbnRlbnQgPyAxICsgZW1wdHlMaW5lcyA6IGVtcHR5TGluZXMpO1xuICAgICAgfSBlbHNlIGlmIChjaG9tcGluZyA9PT0gQ0hPTVBJTkdfQ0xJUCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHRoZSBzY2FsYXIgaXMgbm90IGVtcHR5LlxuICAgICAgICAgIHN0YXRlLnJlc3VsdCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCcmVhayB0aGlzIGB3aGlsZWAgY3ljbGUgYW5kIGdvIHRvIHRoZSBmdW5jaXRvbidzIGVwaWxvZ3VlLlxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gRm9sZGVkIHN0eWxlOiB1c2UgZmFuY3kgcnVsZXMgdG8gaGFuZGxlIGxpbmUgYnJlYWtzLlxuICAgIGlmIChmb2xkaW5nKSB7XG5cbiAgICAgIC8vIExpbmVzIHN0YXJ0aW5nIHdpdGggd2hpdGUgc3BhY2UgY2hhcmFjdGVycyAobW9yZS1pbmRlbnRlZCBsaW5lcykgYXJlIG5vdCBmb2xkZWQuXG4gICAgICBpZiAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgIGF0TW9yZUluZGVudGVkID0gdHJ1ZTtcbiAgICAgICAgLy8gZXhjZXB0IGZvciB0aGUgZmlyc3QgY29udGVudCBsaW5lIChjZi4gRXhhbXBsZSA4LjEpXG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG5cbiAgICAgIC8vIEVuZCBvZiBtb3JlLWluZGVudGVkIGJsb2NrLlxuICAgICAgfSBlbHNlIGlmIChhdE1vcmVJbmRlbnRlZCkge1xuICAgICAgICBhdE1vcmVJbmRlbnRlZCA9IGZhbHNlO1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZW1wdHlMaW5lcyArIDEpO1xuXG4gICAgICAvLyBKdXN0IG9uZSBsaW5lIGJyZWFrIC0gcGVyY2VpdmUgYXMgdGhlIHNhbWUgbGluZS5cbiAgICAgIH0gZWxzZSBpZiAoZW1wdHlMaW5lcyA9PT0gMCkge1xuICAgICAgICBpZiAoZGlkUmVhZENvbnRlbnQpIHsgLy8gaS5lLiBvbmx5IGlmIHdlIGhhdmUgYWxyZWFkeSByZWFkIHNvbWUgc2NhbGFyIGNvbnRlbnQuXG4gICAgICAgICAgc3RhdGUucmVzdWx0ICs9ICcgJztcbiAgICAgICAgfVxuXG4gICAgICAvLyBTZXZlcmFsIGxpbmUgYnJlYWtzIC0gcGVyY2VpdmUgYXMgZGlmZmVyZW50IGxpbmVzLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGVtcHR5TGluZXMpO1xuICAgICAgfVxuXG4gICAgLy8gTGl0ZXJhbCBzdHlsZToganVzdCBhZGQgZXhhY3QgbnVtYmVyIG9mIGxpbmUgYnJlYWtzIGJldHdlZW4gY29udGVudCBsaW5lcy5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gS2VlcCBhbGwgbGluZSBicmVha3MgZXhjZXB0IHRoZSBoZWFkZXIgbGluZSBicmVhay5cbiAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG4gICAgfVxuXG4gICAgZGlkUmVhZENvbnRlbnQgPSB0cnVlO1xuICAgIGRldGVjdGVkSW5kZW50ID0gdHJ1ZTtcbiAgICBlbXB0eUxpbmVzID0gMDtcbiAgICBjYXB0dXJlU3RhcnQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIHdoaWxlICghaXNfRU9MKGNoKSAmJiAoY2ggIT09IDApKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgY2FwdHVyZVNlZ21lbnQoc3RhdGUsIGNhcHR1cmVTdGFydCwgc3RhdGUucG9zaXRpb24sIGZhbHNlKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgX2xpbmUsXG4gICAgICBfdGFnICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBfYW5jaG9yICAgPSBzdGF0ZS5hbmNob3IsXG4gICAgICBfcmVzdWx0ICAgPSBbXSxcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIGRldGVjdGVkICA9IGZhbHNlLFxuICAgICAgY2g7XG5cbiAgLy8gdGhlcmUgaXMgYSBsZWFkaW5nIHRhYiBiZWZvcmUgdGhpcyB0b2tlbiwgc28gaXQgY2FuJ3QgYmUgYSBibG9jayBzZXF1ZW5jZS9tYXBwaW5nO1xuICAvLyBpdCBjYW4gc3RpbGwgYmUgZmxvdyBzZXF1ZW5jZS9tYXBwaW5nIG9yIGEgc2NhbGFyXG4gIGlmIChzdGF0ZS5maXJzdFRhYkluTGluZSAhPT0gLTEpIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBfcmVzdWx0O1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBpZiAoc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXRlLmZpcnN0VGFiSW5MaW5lO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhYiBjaGFyYWN0ZXJzIG11c3Qgbm90IGJlIHVzZWQgaW4gaW5kZW50YXRpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoY2ggIT09IDB4MkQvKiAtICovKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb2xsb3dpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSk7XG5cbiAgICBpZiAoIWlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50IDw9IG5vZGVJbmRlbnQpIHtcbiAgICAgICAgX3Jlc3VsdC5wdXNoKG51bGwpO1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfQkxPQ0tfSU4sIGZhbHNlLCB0cnVlKTtcbiAgICBfcmVzdWx0LnB1c2goc3RhdGUucmVzdWx0KTtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIHNlcXVlbmNlIGVudHJ5Jyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgbm9kZUluZGVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnc2VxdWVuY2UnO1xuICAgIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZWFkQmxvY2tNYXBwaW5nKHN0YXRlLCBub2RlSW5kZW50LCBmbG93SW5kZW50KSB7XG4gIHZhciBmb2xsb3dpbmcsXG4gICAgICBhbGxvd0NvbXBhY3QsXG4gICAgICBfbGluZSxcbiAgICAgIF9rZXlMaW5lLFxuICAgICAgX2tleUxpbmVTdGFydCxcbiAgICAgIF9rZXlQb3MsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgX2FuY2hvciAgICAgICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIF9yZXN1bHQgICAgICAgPSB7fSxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBrZXlUYWcgICAgICAgID0gbnVsbCxcbiAgICAgIGtleU5vZGUgICAgICAgPSBudWxsLFxuICAgICAgdmFsdWVOb2RlICAgICA9IG51bGwsXG4gICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2UsXG4gICAgICBkZXRlY3RlZCAgICAgID0gZmFsc2UsXG4gICAgICBjaDtcblxuICAvLyB0aGVyZSBpcyBhIGxlYWRpbmcgdGFiIGJlZm9yZSB0aGlzIHRva2VuLCBzbyBpdCBjYW4ndCBiZSBhIGJsb2NrIHNlcXVlbmNlL21hcHBpbmc7XG4gIC8vIGl0IGNhbiBzdGlsbCBiZSBmbG93IHNlcXVlbmNlL21hcHBpbmcgb3IgYSBzY2FsYXJcbiAgaWYgKHN0YXRlLmZpcnN0VGFiSW5MaW5lICE9PSAtMSkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGlmICghYXRFeHBsaWNpdEtleSAmJiBzdGF0ZS5maXJzdFRhYkluTGluZSAhPT0gLTEpIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uID0gc3RhdGUuZmlyc3RUYWJJbkxpbmU7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFiIGNoYXJhY3RlcnMgbXVzdCBub3QgYmUgdXNlZCBpbiBpbmRlbnRhdGlvbicpO1xuICAgIH1cblxuICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcbiAgICBfbGluZSA9IHN0YXRlLmxpbmU7IC8vIFNhdmUgdGhlIGN1cnJlbnQgbGluZS5cblxuICAgIC8vXG4gICAgLy8gRXhwbGljaXQgbm90YXRpb24gY2FzZS4gVGhlcmUgYXJlIHR3byBzZXBhcmF0ZSBibG9ja3M6XG4gICAgLy8gZmlyc3QgZm9yIHRoZSBrZXkgKGRlbm90ZWQgYnkgXCI/XCIpIGFuZCBzZWNvbmQgZm9yIHRoZSB2YWx1ZSAoZGVub3RlZCBieSBcIjpcIilcbiAgICAvL1xuICAgIGlmICgoY2ggPT09IDB4M0YvKiA/ICovIHx8IGNoID09PSAweDNBLyogOiAqLykgJiYgaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcblxuICAgICAgaWYgKGNoID09PSAweDNGLyogPyAqLykge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsLCBfa2V5TGluZSwgX2tleUxpbmVTdGFydCwgX2tleVBvcyk7XG4gICAgICAgICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBkZXRlY3RlZCA9IHRydWU7XG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSB0cnVlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2UgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICAgICAgLy8gaS5lLiAweDNBLyogOiAqLyA9PT0gY2hhcmFjdGVyIGFmdGVyIHRoZSBleHBsaWNpdCBrZXkuXG4gICAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgYWxsb3dDb21wYWN0ID0gdHJ1ZTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2luY29tcGxldGUgZXhwbGljaXQgbWFwcGluZyBwYWlyOyBhIGtleSBub2RlIGlzIG1pc3NlZDsgb3IgZm9sbG93ZWQgYnkgYSBub24tdGFidWxhdGVkIGVtcHR5IGxpbmUnKTtcbiAgICAgIH1cblxuICAgICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgICAgIGNoID0gZm9sbG93aW5nO1xuXG4gICAgLy9cbiAgICAvLyBJbXBsaWNpdCBub3RhdGlvbiBjYXNlLiBGbG93LXN0eWxlIG5vZGUgYXMgdGhlIGtleSBmaXJzdCwgdGhlbiBcIjpcIiwgYW5kIHRoZSB2YWx1ZS5cbiAgICAvL1xuICAgIH0gZWxzZSB7XG4gICAgICBfa2V5TGluZSA9IHN0YXRlLmxpbmU7XG4gICAgICBfa2V5TGluZVN0YXJ0ID0gc3RhdGUubGluZVN0YXJ0O1xuICAgICAgX2tleVBvcyA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgICBpZiAoIWNvbXBvc2VOb2RlKHN0YXRlLCBmbG93SW5kZW50LCBDT05URVhUX0ZMT1dfT1VULCBmYWxzZSwgdHJ1ZSkpIHtcbiAgICAgICAgLy8gTmVpdGhlciBpbXBsaWNpdCBub3IgZXhwbGljaXQgbm90YXRpb24uXG4gICAgICAgIC8vIFJlYWRpbmcgaXMgZG9uZS4gR28gdG8gdGhlIGVwaWxvZ3VlLlxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmxpbmUgPT09IF9saW5lKSB7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgd2hpbGUgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjaCA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgICAgICBpZiAoIWlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdhIHdoaXRlc3BhY2UgY2hhcmFjdGVyIGlzIGV4cGVjdGVkIGFmdGVyIHRoZSBrZXktdmFsdWUgc2VwYXJhdG9yIHdpdGhpbiBhIGJsb2NrIG1hcHBpbmcnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwsIF9rZXlMaW5lLCBfa2V5TGluZVN0YXJ0LCBfa2V5UG9zKTtcbiAgICAgICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICBhdEV4cGxpY2l0S2V5ID0gZmFsc2U7XG4gICAgICAgICAgYWxsb3dDb21wYWN0ID0gZmFsc2U7XG4gICAgICAgICAga2V5VGFnID0gc3RhdGUudGFnO1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG5cbiAgICAgICAgfSBlbHNlIGlmIChkZXRlY3RlZCkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYW4gaW1wbGljaXQgbWFwcGluZyBwYWlyOyBhIGNvbG9uIGlzIG1pc3NlZCcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgICAgIHJldHVybiB0cnVlOyAvLyBLZWVwIHRoZSByZXN1bHQgb2YgYGNvbXBvc2VOb2RlYC5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2UgaWYgKGRldGVjdGVkKSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW4gbm90IHJlYWQgYSBibG9jayBtYXBwaW5nIGVudHJ5OyBhIG11bHRpbGluZSBrZXkgbWF5IG5vdCBiZSBhbiBpbXBsaWNpdCBrZXknKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUudGFnID0gX3RhZztcbiAgICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgdGhlIHJlc3VsdCBvZiBgY29tcG9zZU5vZGVgLlxuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gQ29tbW9uIHJlYWRpbmcgY29kZSBmb3IgYm90aCBleHBsaWNpdCBhbmQgaW1wbGljaXQgbm90YXRpb25zLlxuICAgIC8vXG4gICAgaWYgKHN0YXRlLmxpbmUgPT09IF9saW5lIHx8IHN0YXRlLmxpbmVJbmRlbnQgPiBub2RlSW5kZW50KSB7XG4gICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICBfa2V5TGluZSA9IHN0YXRlLmxpbmU7XG4gICAgICAgIF9rZXlMaW5lU3RhcnQgPSBzdGF0ZS5saW5lU3RhcnQ7XG4gICAgICAgIF9rZXlQb3MgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvc2VOb2RlKHN0YXRlLCBub2RlSW5kZW50LCBDT05URVhUX0JMT0NLX09VVCwgdHJ1ZSwgYWxsb3dDb21wYWN0KSkge1xuICAgICAgICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAgIGtleU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghYXRFeHBsaWNpdEtleSkge1xuICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgdmFsdWVOb2RlLCBfa2V5TGluZSwgX2tleUxpbmVTdGFydCwgX2tleVBvcyk7XG4gICAgICAgIGtleVRhZyA9IGtleU5vZGUgPSB2YWx1ZU5vZGUgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmICgoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdiYWQgaW5kZW50YXRpb24gb2YgYSBtYXBwaW5nIGVudHJ5Jyk7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgbm9kZUluZGVudCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gRXBpbG9ndWUuXG4gIC8vXG5cbiAgLy8gU3BlY2lhbCBjYXNlOiBsYXN0IG1hcHBpbmcncyBub2RlIGNvbnRhaW5zIG9ubHkgdGhlIGtleSBpbiBleHBsaWNpdCBub3RhdGlvbi5cbiAgaWYgKGF0RXhwbGljaXRLZXkpIHtcbiAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICB9XG5cbiAgLy8gRXhwb3NlIHRoZSByZXN1bHRpbmcgbWFwcGluZy5cbiAgaWYgKGRldGVjdGVkKSB7XG4gICAgc3RhdGUudGFnID0gX3RhZztcbiAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgIHN0YXRlLmtpbmQgPSAnbWFwcGluZyc7XG4gICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBkZXRlY3RlZDtcbn1cblxuZnVuY3Rpb24gcmVhZFRhZ1Byb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBpc1ZlcmJhdGltID0gZmFsc2UsXG4gICAgICBpc05hbWVkICAgID0gZmFsc2UsXG4gICAgICB0YWdIYW5kbGUsXG4gICAgICB0YWdOYW1lLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjEvKiAhICovKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkdXBsaWNhdGlvbiBvZiBhIHRhZyBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCA9PT0gMHgzQy8qIDwgKi8pIHtcbiAgICBpc1ZlcmJhdGltID0gdHJ1ZTtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICBpc05hbWVkID0gdHJ1ZTtcbiAgICB0YWdIYW5kbGUgPSAnISEnO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB9IGVsc2Uge1xuICAgIHRhZ0hhbmRsZSA9ICchJztcbiAgfVxuXG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICB3aGlsZSAoY2ggIT09IDAgJiYgY2ggIT09IDB4M0UvKiA+ICovKTtcblxuICAgIGlmIChzdGF0ZS5wb3NpdGlvbiA8IHN0YXRlLmxlbmd0aCkge1xuICAgICAgdGFnTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSB2ZXJiYXRpbSB0YWcnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgyMS8qICEgKi8pIHtcbiAgICAgICAgaWYgKCFpc05hbWVkKSB7XG4gICAgICAgICAgdGFnSGFuZGxlID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uIC0gMSwgc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgICAgIGlmICghUEFUVEVSTl9UQUdfSEFORExFLnRlc3QodGFnSGFuZGxlKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWVkIHRhZyBoYW5kbGUgY2Fubm90IGNvbnRhaW4gc3VjaCBjaGFyYWN0ZXJzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaXNOYW1lZCA9IHRydWU7XG4gICAgICAgICAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb24gKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgc3VmZml4IGNhbm5vdCBjb250YWluIGV4Y2xhbWF0aW9uIG1hcmtzJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIHRhZ05hbWUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChQQVRURVJOX0ZMT1dfSU5ESUNBVE9SUy50ZXN0KHRhZ05hbWUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIHN1ZmZpeCBjYW5ub3QgY29udGFpbiBmbG93IGluZGljYXRvciBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhZ05hbWUgJiYgIVBBVFRFUk5fVEFHX1VSSS50ZXN0KHRhZ05hbWUpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBuYW1lIGNhbm5vdCBjb250YWluIHN1Y2ggY2hhcmFjdGVyczogJyArIHRhZ05hbWUpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB0YWdOYW1lID0gZGVjb2RlVVJJQ29tcG9uZW50KHRhZ05hbWUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIG5hbWUgaXMgbWFsZm9ybWVkOiAnICsgdGFnTmFtZSk7XG4gIH1cblxuICBpZiAoaXNWZXJiYXRpbSkge1xuICAgIHN0YXRlLnRhZyA9IHRhZ05hbWU7XG5cbiAgfSBlbHNlIGlmIChfaGFzT3duUHJvcGVydHkkMS5jYWxsKHN0YXRlLnRhZ01hcCwgdGFnSGFuZGxlKSkge1xuICAgIHN0YXRlLnRhZyA9IHN0YXRlLnRhZ01hcFt0YWdIYW5kbGVdICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEnKSB7XG4gICAgc3RhdGUudGFnID0gJyEnICsgdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKHRhZ0hhbmRsZSA9PT0gJyEhJykge1xuICAgIHN0YXRlLnRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnTmFtZTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmRlY2xhcmVkIHRhZyBoYW5kbGUgXCInICsgdGFnSGFuZGxlICsgJ1wiJyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyNi8qICYgKi8pIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mIGFuIGFuY2hvciBwcm9wZXJ0eScpO1xuICB9XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYW5jaG9yIG5vZGUgbXVzdCBjb250YWluIGF0IGxlYXN0IG9uZSBjaGFyYWN0ZXInKTtcbiAgfVxuXG4gIHN0YXRlLmFuY2hvciA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gcmVhZEFsaWFzKHN0YXRlKSB7XG4gIHZhciBfcG9zaXRpb24sIGFsaWFzLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MkEvKiAqICovKSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbjtcblxuICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkgJiYgIWlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGlmIChzdGF0ZS5wb3NpdGlvbiA9PT0gX3Bvc2l0aW9uKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ25hbWUgb2YgYW4gYWxpYXMgbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgYWxpYXMgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoIV9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoc3RhdGUuYW5jaG9yTWFwLCBhbGlhcykpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5pZGVudGlmaWVkIGFsaWFzIFwiJyArIGFsaWFzICsgJ1wiJyk7XG4gIH1cblxuICBzdGF0ZS5yZXN1bHQgPSBzdGF0ZS5hbmNob3JNYXBbYWxpYXNdO1xuICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb21wb3NlTm9kZShzdGF0ZSwgcGFyZW50SW5kZW50LCBub2RlQ29udGV4dCwgYWxsb3dUb1NlZWssIGFsbG93Q29tcGFjdCkge1xuICB2YXIgYWxsb3dCbG9ja1N0eWxlcyxcbiAgICAgIGFsbG93QmxvY2tTY2FsYXJzLFxuICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zLFxuICAgICAgaW5kZW50U3RhdHVzID0gMSwgLy8gMTogdGhpcz5wYXJlbnQsIDA6IHRoaXM9cGFyZW50LCAtMTogdGhpczxwYXJlbnRcbiAgICAgIGF0TmV3TGluZSAgPSBmYWxzZSxcbiAgICAgIGhhc0NvbnRlbnQgPSBmYWxzZSxcbiAgICAgIHR5cGVJbmRleCxcbiAgICAgIHR5cGVRdWFudGl0eSxcbiAgICAgIHR5cGVMaXN0LFxuICAgICAgdHlwZSxcbiAgICAgIGZsb3dJbmRlbnQsXG4gICAgICBibG9ja0luZGVudDtcblxuICBpZiAoc3RhdGUubGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5saXN0ZW5lcignb3BlbicsIHN0YXRlKTtcbiAgfVxuXG4gIHN0YXRlLnRhZyAgICA9IG51bGw7XG4gIHN0YXRlLmFuY2hvciA9IG51bGw7XG4gIHN0YXRlLmtpbmQgICA9IG51bGw7XG4gIHN0YXRlLnJlc3VsdCA9IG51bGw7XG5cbiAgYWxsb3dCbG9ja1N0eWxlcyA9IGFsbG93QmxvY2tTY2FsYXJzID0gYWxsb3dCbG9ja0NvbGxlY3Rpb25zID1cbiAgICBDT05URVhUX0JMT0NLX09VVCA9PT0gbm9kZUNvbnRleHQgfHxcbiAgICBDT05URVhUX0JMT0NLX0lOICA9PT0gbm9kZUNvbnRleHQ7XG5cbiAgaWYgKGFsbG93VG9TZWVrKSB7XG4gICAgaWYgKHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKSkge1xuICAgICAgYXROZXdMaW5lID0gdHJ1ZTtcblxuICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgaW5kZW50U3RhdHVzID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA9PT0gcGFyZW50SW5kZW50KSB7XG4gICAgICAgIGluZGVudFN0YXR1cyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgaW5kZW50U3RhdHVzID0gLTE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGluZGVudFN0YXR1cyA9PT0gMSkge1xuICAgIHdoaWxlIChyZWFkVGFnUHJvcGVydHkoc3RhdGUpIHx8IHJlYWRBbmNob3JQcm9wZXJ0eShzdGF0ZSkpIHtcbiAgICAgIGlmIChza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSkpIHtcbiAgICAgICAgYXROZXdMaW5lID0gdHJ1ZTtcbiAgICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gYWxsb3dCbG9ja1N0eWxlcztcblxuICAgICAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IHBhcmVudEluZGVudCkge1xuICAgICAgICAgIGluZGVudFN0YXR1cyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA9PT0gcGFyZW50SW5kZW50KSB7XG4gICAgICAgICAgaW5kZW50U3RhdHVzID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50IDwgcGFyZW50SW5kZW50KSB7XG4gICAgICAgICAgaW5kZW50U3RhdHVzID0gLTE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChhbGxvd0Jsb2NrQ29sbGVjdGlvbnMpIHtcbiAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBhdE5ld0xpbmUgfHwgYWxsb3dDb21wYWN0O1xuICB9XG5cbiAgaWYgKGluZGVudFN0YXR1cyA9PT0gMSB8fCBDT05URVhUX0JMT0NLX09VVCA9PT0gbm9kZUNvbnRleHQpIHtcbiAgICBpZiAoQ09OVEVYVF9GTE9XX0lOID09PSBub2RlQ29udGV4dCB8fCBDT05URVhUX0ZMT1dfT1VUID09PSBub2RlQ29udGV4dCkge1xuICAgICAgZmxvd0luZGVudCA9IHBhcmVudEluZGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxvd0luZGVudCA9IHBhcmVudEluZGVudCArIDE7XG4gICAgfVxuXG4gICAgYmxvY2tJbmRlbnQgPSBzdGF0ZS5wb3NpdGlvbiAtIHN0YXRlLmxpbmVTdGFydDtcblxuICAgIGlmIChpbmRlbnRTdGF0dXMgPT09IDEpIHtcbiAgICAgIGlmIChhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgJiZcbiAgICAgICAgICAocmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIGJsb2NrSW5kZW50KSB8fFxuICAgICAgICAgICByZWFkQmxvY2tNYXBwaW5nKHN0YXRlLCBibG9ja0luZGVudCwgZmxvd0luZGVudCkpIHx8XG4gICAgICAgICAgcmVhZEZsb3dDb2xsZWN0aW9uKHN0YXRlLCBmbG93SW5kZW50KSkge1xuICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgoYWxsb3dCbG9ja1NjYWxhcnMgJiYgcmVhZEJsb2NrU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSkgfHxcbiAgICAgICAgICAgIHJlYWRTaW5nbGVRdW90ZWRTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpIHx8XG4gICAgICAgICAgICByZWFkRG91YmxlUXVvdGVkU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50KSkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVhZEFsaWFzKHN0YXRlKSkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCB8fCBzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdhbGlhcyBub2RlIHNob3VsZCBub3QgaGF2ZSBhbnkgcHJvcGVydGllcycpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlYWRQbGFpblNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCwgQ09OVEVYVF9GTE9XX0lOID09PSBub2RlQ29udGV4dCkpIHtcbiAgICAgICAgICBoYXNDb250ZW50ID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzdGF0ZS50YWcgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlLnRhZyA9ICc/JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGluZGVudFN0YXR1cyA9PT0gMCkge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlOiBibG9jayBzZXF1ZW5jZXMgYXJlIGFsbG93ZWQgdG8gaGF2ZSBzYW1lIGluZGVudGF0aW9uIGxldmVsIGFzIHRoZSBwYXJlbnQuXG4gICAgICAvLyBodHRwOi8vd3d3LnlhbWwub3JnL3NwZWMvMS4yL3NwZWMuaHRtbCNpZDI3OTk3ODRcbiAgICAgIGhhc0NvbnRlbnQgPSBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgJiYgcmVhZEJsb2NrU2VxdWVuY2Uoc3RhdGUsIGJsb2NrSW5kZW50KTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUudGFnID09PSBudWxsKSB7XG4gICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAoc3RhdGUudGFnID09PSAnPycpIHtcbiAgICAvLyBJbXBsaWNpdCByZXNvbHZpbmcgaXMgbm90IGFsbG93ZWQgZm9yIG5vbi1zY2FsYXIgdHlwZXMsIGFuZCAnPydcbiAgICAvLyBub24tc3BlY2lmaWMgdGFnIGlzIG9ubHkgYXV0b21hdGljYWxseSBhc3NpZ25lZCB0byBwbGFpbiBzY2FsYXJzLlxuICAgIC8vXG4gICAgLy8gV2Ugb25seSBuZWVkIHRvIGNoZWNrIGtpbmQgY29uZm9ybWl0eSBpbiBjYXNlIHVzZXIgZXhwbGljaXRseSBhc3NpZ25zICc/J1xuICAgIC8vIHRhZywgZm9yIGV4YW1wbGUgbGlrZSB0aGlzOiBcIiE8Pz4gWzBdXCJcbiAgICAvL1xuICAgIGlmIChzdGF0ZS5yZXN1bHQgIT09IG51bGwgJiYgc3RhdGUua2luZCAhPT0gJ3NjYWxhcicpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgbm9kZSBraW5kIGZvciAhPD8+IHRhZzsgaXQgc2hvdWxkIGJlIFwic2NhbGFyXCIsIG5vdCBcIicgKyBzdGF0ZS5raW5kICsgJ1wiJyk7XG4gICAgfVxuXG4gICAgZm9yICh0eXBlSW5kZXggPSAwLCB0eXBlUXVhbnRpdHkgPSBzdGF0ZS5pbXBsaWNpdFR5cGVzLmxlbmd0aDsgdHlwZUluZGV4IDwgdHlwZVF1YW50aXR5OyB0eXBlSW5kZXggKz0gMSkge1xuICAgICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbdHlwZUluZGV4XTtcblxuICAgICAgaWYgKHR5cGUucmVzb2x2ZShzdGF0ZS5yZXN1bHQpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgICBzdGF0ZS5yZXN1bHQgPSB0eXBlLmNvbnN0cnVjdChzdGF0ZS5yZXN1bHQpO1xuICAgICAgICBzdGF0ZS50YWcgPSB0eXBlLnRhZztcbiAgICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChzdGF0ZS50YWcgIT09ICchJykge1xuICAgIGlmIChfaGFzT3duUHJvcGVydHkkMS5jYWxsKHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXSwgc3RhdGUudGFnKSkge1xuICAgICAgdHlwZSA9IHN0YXRlLnR5cGVNYXBbc3RhdGUua2luZCB8fCAnZmFsbGJhY2snXVtzdGF0ZS50YWddO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsb29raW5nIGZvciBtdWx0aSB0eXBlXG4gICAgICB0eXBlID0gbnVsbDtcbiAgICAgIHR5cGVMaXN0ID0gc3RhdGUudHlwZU1hcC5tdWx0aVtzdGF0ZS5raW5kIHx8ICdmYWxsYmFjayddO1xuXG4gICAgICBmb3IgKHR5cGVJbmRleCA9IDAsIHR5cGVRdWFudGl0eSA9IHR5cGVMaXN0Lmxlbmd0aDsgdHlwZUluZGV4IDwgdHlwZVF1YW50aXR5OyB0eXBlSW5kZXggKz0gMSkge1xuICAgICAgICBpZiAoc3RhdGUudGFnLnNsaWNlKDAsIHR5cGVMaXN0W3R5cGVJbmRleF0udGFnLmxlbmd0aCkgPT09IHR5cGVMaXN0W3R5cGVJbmRleF0udGFnKSB7XG4gICAgICAgICAgdHlwZSA9IHR5cGVMaXN0W3R5cGVJbmRleF07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXR5cGUpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmtub3duIHRhZyAhPCcgKyBzdGF0ZS50YWcgKyAnPicpO1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5yZXN1bHQgIT09IG51bGwgJiYgdHlwZS5raW5kICE9PSBzdGF0ZS5raW5kKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5hY2NlcHRhYmxlIG5vZGUga2luZCBmb3IgITwnICsgc3RhdGUudGFnICsgJz4gdGFnOyBpdCBzaG91bGQgYmUgXCInICsgdHlwZS5raW5kICsgJ1wiLCBub3QgXCInICsgc3RhdGUua2luZCArICdcIicpO1xuICAgIH1cblxuICAgIGlmICghdHlwZS5yZXNvbHZlKHN0YXRlLnJlc3VsdCwgc3RhdGUudGFnKSkgeyAvLyBgc3RhdGUucmVzdWx0YCB1cGRhdGVkIGluIHJlc29sdmVyIGlmIG1hdGNoZWRcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdjYW5ub3QgcmVzb2x2ZSBhIG5vZGUgd2l0aCAhPCcgKyBzdGF0ZS50YWcgKyAnPiBleHBsaWNpdCB0YWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucmVzdWx0ID0gdHlwZS5jb25zdHJ1Y3Qoc3RhdGUucmVzdWx0LCBzdGF0ZS50YWcpO1xuICAgICAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUubGlzdGVuZXIgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5saXN0ZW5lcignY2xvc2UnLCBzdGF0ZSk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlLnRhZyAhPT0gbnVsbCB8fCAgc3RhdGUuYW5jaG9yICE9PSBudWxsIHx8IGhhc0NvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYWREb2N1bWVudChzdGF0ZSkge1xuICB2YXIgZG9jdW1lbnRTdGFydCA9IHN0YXRlLnBvc2l0aW9uLFxuICAgICAgX3Bvc2l0aW9uLFxuICAgICAgZGlyZWN0aXZlTmFtZSxcbiAgICAgIGRpcmVjdGl2ZUFyZ3MsXG4gICAgICBoYXNEaXJlY3RpdmVzID0gZmFsc2UsXG4gICAgICBjaDtcblxuICBzdGF0ZS52ZXJzaW9uID0gbnVsbDtcbiAgc3RhdGUuY2hlY2tMaW5lQnJlYWtzID0gc3RhdGUubGVnYWN5O1xuICBzdGF0ZS50YWdNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBzdGF0ZS5hbmNob3JNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPiAwIHx8IGNoICE9PSAweDI1LyogJSAqLykge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaGFzRGlyZWN0aXZlcyA9IHRydWU7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19XU19PUl9FT0woY2gpKSB7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGlyZWN0aXZlTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuICAgIGRpcmVjdGl2ZUFyZ3MgPSBbXTtcblxuICAgIGlmIChkaXJlY3RpdmVOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdkaXJlY3RpdmUgbmFtZSBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gb25lIGNoYXJhY3RlciBpbiBsZW5ndGgnKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICAgIHdoaWxlIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfRU9MKGNoKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNfRU9MKGNoKSkgYnJlYWs7XG5cbiAgICAgIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkaXJlY3RpdmVBcmdzLnB1c2goc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChjaCAhPT0gMCkgcmVhZExpbmVCcmVhayhzdGF0ZSk7XG5cbiAgICBpZiAoX2hhc093blByb3BlcnR5JDEuY2FsbChkaXJlY3RpdmVIYW5kbGVycywgZGlyZWN0aXZlTmFtZSkpIHtcbiAgICAgIGRpcmVjdGl2ZUhhbmRsZXJzW2RpcmVjdGl2ZU5hbWVdKHN0YXRlLCBkaXJlY3RpdmVOYW1lLCBkaXJlY3RpdmVBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3dXYXJuaW5nKHN0YXRlLCAndW5rbm93biBkb2N1bWVudCBkaXJlY3RpdmUgXCInICsgZGlyZWN0aXZlTmFtZSArICdcIicpO1xuICAgIH1cbiAgfVxuXG4gIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICBpZiAoc3RhdGUubGluZUluZGVudCA9PT0gMCAmJlxuICAgICAgc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgICAgID09PSAweDJELyogLSAqLyAmJlxuICAgICAgc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpID09PSAweDJELyogLSAqLyAmJlxuICAgICAgc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDIpID09PSAweDJELyogLSAqLykge1xuICAgIHN0YXRlLnBvc2l0aW9uICs9IDM7XG4gICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIH0gZWxzZSBpZiAoaGFzRGlyZWN0aXZlcykge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdkaXJlY3RpdmVzIGVuZCBtYXJrIGlzIGV4cGVjdGVkJyk7XG4gIH1cblxuICBjb21wb3NlTm9kZShzdGF0ZSwgc3RhdGUubGluZUluZGVudCAtIDEsIENPTlRFWFRfQkxPQ0tfT1VULCBmYWxzZSwgdHJ1ZSk7XG4gIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICBpZiAoc3RhdGUuY2hlY2tMaW5lQnJlYWtzICYmXG4gICAgICBQQVRURVJOX05PTl9BU0NJSV9MSU5FX0JSRUFLUy50ZXN0KHN0YXRlLmlucHV0LnNsaWNlKGRvY3VtZW50U3RhcnQsIHN0YXRlLnBvc2l0aW9uKSkpIHtcbiAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICdub24tQVNDSUkgbGluZSBicmVha3MgYXJlIGludGVycHJldGVkIGFzIGNvbnRlbnQnKTtcbiAgfVxuXG4gIHN0YXRlLmRvY3VtZW50cy5wdXNoKHN0YXRlLnJlc3VsdCk7XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkge1xuXG4gICAgaWYgKHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pID09PSAweDJFLyogLiAqLykge1xuICAgICAgc3RhdGUucG9zaXRpb24gKz0gMztcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uIDwgKHN0YXRlLmxlbmd0aCAtIDEpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2VuZCBvZiB0aGUgc3RyZWFtIG9yIGEgZG9jdW1lbnQgc2VwYXJhdG9yIGlzIGV4cGVjdGVkJyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cblxuZnVuY3Rpb24gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucykge1xuICBpbnB1dCA9IFN0cmluZyhpbnB1dCk7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChpbnB1dC5sZW5ndGggIT09IDApIHtcblxuICAgIC8vIEFkZCB0YWlsaW5nIGBcXG5gIGlmIG5vdCBleGlzdHNcbiAgICBpZiAoaW5wdXQuY2hhckNvZGVBdChpbnB1dC5sZW5ndGggLSAxKSAhPT0gMHgwQS8qIExGICovICYmXG4gICAgICAgIGlucHV0LmNoYXJDb2RlQXQoaW5wdXQubGVuZ3RoIC0gMSkgIT09IDB4MEQvKiBDUiAqLykge1xuICAgICAgaW5wdXQgKz0gJ1xcbic7XG4gICAgfVxuXG4gICAgLy8gU3RyaXAgQk9NXG4gICAgaWYgKGlucHV0LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgICAgaW5wdXQgPSBpbnB1dC5zbGljZSgxKTtcbiAgICB9XG4gIH1cblxuICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUkMShpbnB1dCwgb3B0aW9ucyk7XG5cbiAgdmFyIG51bGxwb3MgPSBpbnB1dC5pbmRleE9mKCdcXDAnKTtcblxuICBpZiAobnVsbHBvcyAhPT0gLTEpIHtcbiAgICBzdGF0ZS5wb3NpdGlvbiA9IG51bGxwb3M7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ251bGwgYnl0ZSBpcyBub3QgYWxsb3dlZCBpbiBpbnB1dCcpO1xuICB9XG5cbiAgLy8gVXNlIDAgYXMgc3RyaW5nIHRlcm1pbmF0b3IuIFRoYXQgc2lnbmlmaWNhbnRseSBzaW1wbGlmaWVzIGJvdW5kcyBjaGVjay5cbiAgc3RhdGUuaW5wdXQgKz0gJ1xcMCc7XG5cbiAgd2hpbGUgKHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pID09PSAweDIwLyogU3BhY2UgKi8pIHtcbiAgICBzdGF0ZS5saW5lSW5kZW50ICs9IDE7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMTtcbiAgfVxuXG4gIHdoaWxlIChzdGF0ZS5wb3NpdGlvbiA8IChzdGF0ZS5sZW5ndGggLSAxKSkge1xuICAgIHJlYWREb2N1bWVudChzdGF0ZSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGUuZG9jdW1lbnRzO1xufVxuXG5cbmZ1bmN0aW9uIGxvYWRBbGwkMShpbnB1dCwgaXRlcmF0b3IsIG9wdGlvbnMpIHtcbiAgaWYgKGl0ZXJhdG9yICE9PSBudWxsICYmIHR5cGVvZiBpdGVyYXRvciA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgb3B0aW9ucyA9IGl0ZXJhdG9yO1xuICAgIGl0ZXJhdG9yID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAodHlwZW9mIGl0ZXJhdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50cztcbiAgfVxuXG4gIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZG9jdW1lbnRzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBpdGVyYXRvcihkb2N1bWVudHNbaW5kZXhdKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGxvYWQkMShpbnB1dCwgb3B0aW9ucykge1xuICB2YXIgZG9jdW1lbnRzID0gbG9hZERvY3VtZW50cyhpbnB1dCwgb3B0aW9ucyk7XG5cbiAgaWYgKGRvY3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIG5vLXVuZGVmaW5lZCovXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmIChkb2N1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50c1swXTtcbiAgfVxuICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdleHBlY3RlZCBhIHNpbmdsZSBkb2N1bWVudCBpbiB0aGUgc3RyZWFtLCBidXQgZm91bmQgbW9yZScpO1xufVxuXG5cbnZhciBsb2FkQWxsXzEgPSBsb2FkQWxsJDE7XG52YXIgbG9hZF8xICAgID0gbG9hZCQxO1xuXG52YXIgbG9hZGVyID0ge1xuXHRsb2FkQWxsOiBsb2FkQWxsXzEsXG5cdGxvYWQ6IGxvYWRfMVxufTtcblxuLyplc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSovXG5cblxuXG5cblxudmFyIF90b1N0cmluZyAgICAgICA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgX2hhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIENIQVJfQk9NICAgICAgICAgICAgICAgICAgPSAweEZFRkY7XG52YXIgQ0hBUl9UQUIgICAgICAgICAgICAgICAgICA9IDB4MDk7IC8qIFRhYiAqL1xudmFyIENIQVJfTElORV9GRUVEICAgICAgICAgICAgPSAweDBBOyAvKiBMRiAqL1xudmFyIENIQVJfQ0FSUklBR0VfUkVUVVJOICAgICAgPSAweDBEOyAvKiBDUiAqL1xudmFyIENIQVJfU1BBQ0UgICAgICAgICAgICAgICAgPSAweDIwOyAvKiBTcGFjZSAqL1xudmFyIENIQVJfRVhDTEFNQVRJT04gICAgICAgICAgPSAweDIxOyAvKiAhICovXG52YXIgQ0hBUl9ET1VCTEVfUVVPVEUgICAgICAgICA9IDB4MjI7IC8qIFwiICovXG52YXIgQ0hBUl9TSEFSUCAgICAgICAgICAgICAgICA9IDB4MjM7IC8qICMgKi9cbnZhciBDSEFSX1BFUkNFTlQgICAgICAgICAgICAgID0gMHgyNTsgLyogJSAqL1xudmFyIENIQVJfQU1QRVJTQU5EICAgICAgICAgICAgPSAweDI2OyAvKiAmICovXG52YXIgQ0hBUl9TSU5HTEVfUVVPVEUgICAgICAgICA9IDB4Mjc7IC8qICcgKi9cbnZhciBDSEFSX0FTVEVSSVNLICAgICAgICAgICAgID0gMHgyQTsgLyogKiAqL1xudmFyIENIQVJfQ09NTUEgICAgICAgICAgICAgICAgPSAweDJDOyAvKiAsICovXG52YXIgQ0hBUl9NSU5VUyAgICAgICAgICAgICAgICA9IDB4MkQ7IC8qIC0gKi9cbnZhciBDSEFSX0NPTE9OICAgICAgICAgICAgICAgID0gMHgzQTsgLyogOiAqL1xudmFyIENIQVJfRVFVQUxTICAgICAgICAgICAgICAgPSAweDNEOyAvKiA9ICovXG52YXIgQ0hBUl9HUkVBVEVSX1RIQU4gICAgICAgICA9IDB4M0U7IC8qID4gKi9cbnZhciBDSEFSX1FVRVNUSU9OICAgICAgICAgICAgID0gMHgzRjsgLyogPyAqL1xudmFyIENIQVJfQ09NTUVSQ0lBTF9BVCAgICAgICAgPSAweDQwOyAvKiBAICovXG52YXIgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUICA9IDB4NUI7IC8qIFsgKi9cbnZhciBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUID0gMHg1RDsgLyogXSAqL1xudmFyIENIQVJfR1JBVkVfQUNDRU5UICAgICAgICAgPSAweDYwOyAvKiBgICovXG52YXIgQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVQgICA9IDB4N0I7IC8qIHsgKi9cbnZhciBDSEFSX1ZFUlRJQ0FMX0xJTkUgICAgICAgID0gMHg3QzsgLyogfCAqL1xudmFyIENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVCAgPSAweDdEOyAvKiB9ICovXG5cbnZhciBFU0NBUEVfU0VRVUVOQ0VTID0ge307XG5cbkVTQ0FQRV9TRVFVRU5DRVNbMHgwMF0gICA9ICdcXFxcMCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDddICAgPSAnXFxcXGEnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA4XSAgID0gJ1xcXFxiJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwOV0gICA9ICdcXFxcdCc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MEFdICAgPSAnXFxcXG4nO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBCXSAgID0gJ1xcXFx2JztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQ10gICA9ICdcXFxcZic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MERdICAgPSAnXFxcXHInO1xuRVNDQVBFX1NFUVVFTkNFU1sweDFCXSAgID0gJ1xcXFxlJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMl0gICA9ICdcXFxcXCInO1xuRVNDQVBFX1NFUVVFTkNFU1sweDVDXSAgID0gJ1xcXFxcXFxcJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHg4NV0gICA9ICdcXFxcTic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4QTBdICAgPSAnXFxcXF8nO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIwMjhdID0gJ1xcXFxMJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgyMDI5XSA9ICdcXFxcUCc7XG5cbnZhciBERVBSRUNBVEVEX0JPT0xFQU5TX1NZTlRBWCA9IFtcbiAgJ3knLCAnWScsICd5ZXMnLCAnWWVzJywgJ1lFUycsICdvbicsICdPbicsICdPTicsXG4gICduJywgJ04nLCAnbm8nLCAnTm8nLCAnTk8nLCAnb2ZmJywgJ09mZicsICdPRkYnXG5dO1xuXG52YXIgREVQUkVDQVRFRF9CQVNFNjBfU1lOVEFYID0gL15bLStdP1swLTlfXSsoPzo6WzAtOV9dKykrKD86XFwuWzAtOV9dKik/JC87XG5cbmZ1bmN0aW9uIGNvbXBpbGVTdHlsZU1hcChzY2hlbWEsIG1hcCkge1xuICB2YXIgcmVzdWx0LCBrZXlzLCBpbmRleCwgbGVuZ3RoLCB0YWcsIHN0eWxlLCB0eXBlO1xuXG4gIGlmIChtYXAgPT09IG51bGwpIHJldHVybiB7fTtcblxuICByZXN1bHQgPSB7fTtcbiAga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHRhZyA9IGtleXNbaW5kZXhdO1xuICAgIHN0eWxlID0gU3RyaW5nKG1hcFt0YWddKTtcblxuICAgIGlmICh0YWcuc2xpY2UoMCwgMikgPT09ICchIScpIHtcbiAgICAgIHRhZyA9ICd0YWc6eWFtbC5vcmcsMjAwMjonICsgdGFnLnNsaWNlKDIpO1xuICAgIH1cbiAgICB0eXBlID0gc2NoZW1hLmNvbXBpbGVkVHlwZU1hcFsnZmFsbGJhY2snXVt0YWddO1xuXG4gICAgaWYgKHR5cGUgJiYgX2hhc093blByb3BlcnR5LmNhbGwodHlwZS5zdHlsZUFsaWFzZXMsIHN0eWxlKSkge1xuICAgICAgc3R5bGUgPSB0eXBlLnN0eWxlQWxpYXNlc1tzdHlsZV07XG4gICAgfVxuXG4gICAgcmVzdWx0W3RhZ10gPSBzdHlsZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUhleChjaGFyYWN0ZXIpIHtcbiAgdmFyIHN0cmluZywgaGFuZGxlLCBsZW5ndGg7XG5cbiAgc3RyaW5nID0gY2hhcmFjdGVyLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuXG4gIGlmIChjaGFyYWN0ZXIgPD0gMHhGRikge1xuICAgIGhhbmRsZSA9ICd4JztcbiAgICBsZW5ndGggPSAyO1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkYpIHtcbiAgICBoYW5kbGUgPSAndSc7XG4gICAgbGVuZ3RoID0gNDtcbiAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPD0gMHhGRkZGRkZGRikge1xuICAgIGhhbmRsZSA9ICdVJztcbiAgICBsZW5ndGggPSA4O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBleGNlcHRpb24oJ2NvZGUgcG9pbnQgd2l0aGluIGEgc3RyaW5nIG1heSBub3QgYmUgZ3JlYXRlciB0aGFuIDB4RkZGRkZGRkYnKTtcbiAgfVxuXG4gIHJldHVybiAnXFxcXCcgKyBoYW5kbGUgKyBjb21tb24ucmVwZWF0KCcwJywgbGVuZ3RoIC0gc3RyaW5nLmxlbmd0aCkgKyBzdHJpbmc7XG59XG5cblxudmFyIFFVT1RJTkdfVFlQRV9TSU5HTEUgPSAxLFxuICAgIFFVT1RJTkdfVFlQRV9ET1VCTEUgPSAyO1xuXG5mdW5jdGlvbiBTdGF0ZShvcHRpb25zKSB7XG4gIHRoaXMuc2NoZW1hICAgICAgICA9IG9wdGlvbnNbJ3NjaGVtYSddIHx8IF9kZWZhdWx0O1xuICB0aGlzLmluZGVudCAgICAgICAgPSBNYXRoLm1heCgxLCAob3B0aW9uc1snaW5kZW50J10gfHwgMikpO1xuICB0aGlzLm5vQXJyYXlJbmRlbnQgPSBvcHRpb25zWydub0FycmF5SW5kZW50J10gfHwgZmFsc2U7XG4gIHRoaXMuc2tpcEludmFsaWQgICA9IG9wdGlvbnNbJ3NraXBJbnZhbGlkJ10gfHwgZmFsc2U7XG4gIHRoaXMuZmxvd0xldmVsICAgICA9IChjb21tb24uaXNOb3RoaW5nKG9wdGlvbnNbJ2Zsb3dMZXZlbCddKSA/IC0xIDogb3B0aW9uc1snZmxvd0xldmVsJ10pO1xuICB0aGlzLnN0eWxlTWFwICAgICAgPSBjb21waWxlU3R5bGVNYXAodGhpcy5zY2hlbWEsIG9wdGlvbnNbJ3N0eWxlcyddIHx8IG51bGwpO1xuICB0aGlzLnNvcnRLZXlzICAgICAgPSBvcHRpb25zWydzb3J0S2V5cyddIHx8IGZhbHNlO1xuICB0aGlzLmxpbmVXaWR0aCAgICAgPSBvcHRpb25zWydsaW5lV2lkdGgnXSB8fCA4MDtcbiAgdGhpcy5ub1JlZnMgICAgICAgID0gb3B0aW9uc1snbm9SZWZzJ10gfHwgZmFsc2U7XG4gIHRoaXMubm9Db21wYXRNb2RlICA9IG9wdGlvbnNbJ25vQ29tcGF0TW9kZSddIHx8IGZhbHNlO1xuICB0aGlzLmNvbmRlbnNlRmxvdyAgPSBvcHRpb25zWydjb25kZW5zZUZsb3cnXSB8fCBmYWxzZTtcbiAgdGhpcy5xdW90aW5nVHlwZSAgID0gb3B0aW9uc1sncXVvdGluZ1R5cGUnXSA9PT0gJ1wiJyA/IFFVT1RJTkdfVFlQRV9ET1VCTEUgOiBRVU9USU5HX1RZUEVfU0lOR0xFO1xuICB0aGlzLmZvcmNlUXVvdGVzICAgPSBvcHRpb25zWydmb3JjZVF1b3RlcyddIHx8IGZhbHNlO1xuICB0aGlzLnJlcGxhY2VyICAgICAgPSB0eXBlb2Ygb3B0aW9uc1sncmVwbGFjZXInXSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnNbJ3JlcGxhY2VyJ10gOiBudWxsO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMuZXhwbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkRXhwbGljaXQ7XG5cbiAgdGhpcy50YWcgPSBudWxsO1xuICB0aGlzLnJlc3VsdCA9ICcnO1xuXG4gIHRoaXMuZHVwbGljYXRlcyA9IFtdO1xuICB0aGlzLnVzZWREdXBsaWNhdGVzID0gbnVsbDtcbn1cblxuLy8gSW5kZW50cyBldmVyeSBsaW5lIGluIGEgc3RyaW5nLiBFbXB0eSBsaW5lcyAoXFxuIG9ubHkpIGFyZSBub3QgaW5kZW50ZWQuXG5mdW5jdGlvbiBpbmRlbnRTdHJpbmcoc3RyaW5nLCBzcGFjZXMpIHtcbiAgdmFyIGluZCA9IGNvbW1vbi5yZXBlYXQoJyAnLCBzcGFjZXMpLFxuICAgICAgcG9zaXRpb24gPSAwLFxuICAgICAgbmV4dCA9IC0xLFxuICAgICAgcmVzdWx0ID0gJycsXG4gICAgICBsaW5lLFxuICAgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcblxuICB3aGlsZSAocG9zaXRpb24gPCBsZW5ndGgpIHtcbiAgICBuZXh0ID0gc3RyaW5nLmluZGV4T2YoJ1xcbicsIHBvc2l0aW9uKTtcbiAgICBpZiAobmV4dCA9PT0gLTEpIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24pO1xuICAgICAgcG9zaXRpb24gPSBsZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpbmUgPSBzdHJpbmcuc2xpY2UocG9zaXRpb24sIG5leHQgKyAxKTtcbiAgICAgIHBvc2l0aW9uID0gbmV4dCArIDE7XG4gICAgfVxuXG4gICAgaWYgKGxpbmUubGVuZ3RoICYmIGxpbmUgIT09ICdcXG4nKSByZXN1bHQgKz0gaW5kO1xuXG4gICAgcmVzdWx0ICs9IGxpbmU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCkge1xuICByZXR1cm4gJ1xcbicgKyBjb21tb24ucmVwZWF0KCcgJywgc3RhdGUuaW5kZW50ICogbGV2ZWwpO1xufVxuXG5mdW5jdGlvbiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cikge1xuICB2YXIgaW5kZXgsIGxlbmd0aCwgdHlwZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc3RhdGUuaW1wbGljaXRUeXBlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdHlwZSA9IHN0YXRlLmltcGxpY2l0VHlwZXNbaW5kZXhdO1xuXG4gICAgaWYgKHR5cGUucmVzb2x2ZShzdHIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIFszM10gcy13aGl0ZSA6Oj0gcy1zcGFjZSB8IHMtdGFiXG5mdW5jdGlvbiBpc1doaXRlc3BhY2UoYykge1xuICByZXR1cm4gYyA9PT0gQ0hBUl9TUEFDRSB8fCBjID09PSBDSEFSX1RBQjtcbn1cblxuLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBjaGFyYWN0ZXIgY2FuIGJlIHByaW50ZWQgd2l0aG91dCBlc2NhcGluZy5cbi8vIEZyb20gWUFNTCAxLjI6IFwiYW55IGFsbG93ZWQgY2hhcmFjdGVycyBrbm93biB0byBiZSBub24tcHJpbnRhYmxlXG4vLyBzaG91bGQgYWxzbyBiZSBlc2NhcGVkLiBbSG93ZXZlcixdIFRoaXMgaXNuXHUyMDE5dCBtYW5kYXRvcnlcIlxuLy8gRGVyaXZlZCBmcm9tIG5iLWNoYXIgLSBcXHQgLSAjeDg1IC0gI3hBMCAtICN4MjAyOCAtICN4MjAyOS5cbmZ1bmN0aW9uIGlzUHJpbnRhYmxlKGMpIHtcbiAgcmV0dXJuICAoMHgwMDAyMCA8PSBjICYmIGMgPD0gMHgwMDAwN0UpXG4gICAgICB8fCAoKDB4MDAwQTEgPD0gYyAmJiBjIDw9IDB4MDBEN0ZGKSAmJiBjICE9PSAweDIwMjggJiYgYyAhPT0gMHgyMDI5KVxuICAgICAgfHwgKCgweDBFMDAwIDw9IGMgJiYgYyA8PSAweDAwRkZGRCkgJiYgYyAhPT0gQ0hBUl9CT00pXG4gICAgICB8fCAgKDB4MTAwMDAgPD0gYyAmJiBjIDw9IDB4MTBGRkZGKTtcbn1cblxuLy8gWzM0XSBucy1jaGFyIDo6PSBuYi1jaGFyIC0gcy13aGl0ZVxuLy8gWzI3XSBuYi1jaGFyIDo6PSBjLXByaW50YWJsZSAtIGItY2hhciAtIGMtYnl0ZS1vcmRlci1tYXJrXG4vLyBbMjZdIGItY2hhciAgOjo9IGItbGluZS1mZWVkIHwgYi1jYXJyaWFnZS1yZXR1cm5cbi8vIEluY2x1ZGluZyBzLXdoaXRlIChmb3Igc29tZSByZWFzb24sIGV4YW1wbGVzIGRvZXNuJ3QgbWF0Y2ggc3BlY3MgaW4gdGhpcyBhc3BlY3QpXG4vLyBucy1jaGFyIDo6PSBjLXByaW50YWJsZSAtIGItbGluZS1mZWVkIC0gYi1jYXJyaWFnZS1yZXR1cm4gLSBjLWJ5dGUtb3JkZXItbWFya1xuZnVuY3Rpb24gaXNOc0NoYXJPcldoaXRlc3BhY2UoYykge1xuICByZXR1cm4gaXNQcmludGFibGUoYylcbiAgICAmJiBjICE9PSBDSEFSX0JPTVxuICAgIC8vIC0gYi1jaGFyXG4gICAgJiYgYyAhPT0gQ0hBUl9DQVJSSUFHRV9SRVRVUk5cbiAgICAmJiBjICE9PSBDSEFSX0xJTkVfRkVFRDtcbn1cblxuLy8gWzEyN10gIG5zLXBsYWluLXNhZmUoYykgOjo9IGMgPSBmbG93LW91dCAgXHUyMUQyIG5zLXBsYWluLXNhZmUtb3V0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGZsb3ctaW4gICBcdTIxRDIgbnMtcGxhaW4tc2FmZS1pblxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBibG9jay1rZXkgXHUyMUQyIG5zLXBsYWluLXNhZmUtb3V0XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGZsb3cta2V5ICBcdTIxRDIgbnMtcGxhaW4tc2FmZS1pblxuLy8gWzEyOF0gbnMtcGxhaW4tc2FmZS1vdXQgOjo9IG5zLWNoYXJcbi8vIFsxMjldICBucy1wbGFpbi1zYWZlLWluIDo6PSBucy1jaGFyIC0gYy1mbG93LWluZGljYXRvclxuLy8gWzEzMF0gIG5zLXBsYWluLWNoYXIoYykgOjo9ICAoIG5zLXBsYWluLXNhZmUoYykgLSBcdTIwMUM6XHUyMDFEIC0gXHUyMDFDI1x1MjAxRCApXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICggLyogQW4gbnMtY2hhciBwcmVjZWRpbmcgKi8gXHUyMDFDI1x1MjAxRCApXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICggXHUyMDFDOlx1MjAxRCAvKiBGb2xsb3dlZCBieSBhbiBucy1wbGFpbi1zYWZlKGMpICovIClcbmZ1bmN0aW9uIGlzUGxhaW5TYWZlKGMsIHByZXYsIGluYmxvY2spIHtcbiAgdmFyIGNJc05zQ2hhck9yV2hpdGVzcGFjZSA9IGlzTnNDaGFyT3JXaGl0ZXNwYWNlKGMpO1xuICB2YXIgY0lzTnNDaGFyID0gY0lzTnNDaGFyT3JXaGl0ZXNwYWNlICYmICFpc1doaXRlc3BhY2UoYyk7XG4gIHJldHVybiAoXG4gICAgLy8gbnMtcGxhaW4tc2FmZVxuICAgIGluYmxvY2sgPyAvLyBjID0gZmxvdy1pblxuICAgICAgY0lzTnNDaGFyT3JXaGl0ZXNwYWNlXG4gICAgICA6IGNJc05zQ2hhck9yV2hpdGVzcGFjZVxuICAgICAgICAvLyAtIGMtZmxvdy1pbmRpY2F0b3JcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9DT01NQVxuICAgICAgICAmJiBjICE9PSBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVRcbiAgICAgICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVFxuICAgICAgICAmJiBjICE9PSBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVFxuICAgICAgICAmJiBjICE9PSBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVRcbiAgKVxuICAgIC8vIG5zLXBsYWluLWNoYXJcbiAgICAmJiBjICE9PSBDSEFSX1NIQVJQIC8vIGZhbHNlIG9uICcjJ1xuICAgICYmICEocHJldiA9PT0gQ0hBUl9DT0xPTiAmJiAhY0lzTnNDaGFyKSAvLyBmYWxzZSBvbiAnOiAnXG4gICAgfHwgKGlzTnNDaGFyT3JXaGl0ZXNwYWNlKHByZXYpICYmICFpc1doaXRlc3BhY2UocHJldikgJiYgYyA9PT0gQ0hBUl9TSEFSUCkgLy8gY2hhbmdlIHRvIHRydWUgb24gJ1teIF0jJ1xuICAgIHx8IChwcmV2ID09PSBDSEFSX0NPTE9OICYmIGNJc05zQ2hhcik7IC8vIGNoYW5nZSB0byB0cnVlIG9uICc6W14gXSdcbn1cblxuLy8gU2ltcGxpZmllZCB0ZXN0IGZvciB2YWx1ZXMgYWxsb3dlZCBhcyB0aGUgZmlyc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmVGaXJzdChjKSB7XG4gIC8vIFVzZXMgYSBzdWJzZXQgb2YgbnMtY2hhciAtIGMtaW5kaWNhdG9yXG4gIC8vIHdoZXJlIG5zLWNoYXIgPSBuYi1jaGFyIC0gcy13aGl0ZS5cbiAgLy8gTm8gc3VwcG9ydCBvZiAoICggXHUyMDFDP1x1MjAxRCB8IFx1MjAxQzpcdTIwMUQgfCBcdTIwMUMtXHUyMDFEICkgLyogRm9sbG93ZWQgYnkgYW4gbnMtcGxhaW4tc2FmZShjKSkgKi8gKSBwYXJ0XG4gIHJldHVybiBpc1ByaW50YWJsZShjKSAmJiBjICE9PSBDSEFSX0JPTVxuICAgICYmICFpc1doaXRlc3BhY2UoYykgLy8gLSBzLXdoaXRlXG4gICAgLy8gLSAoYy1pbmRpY2F0b3IgOjo9XG4gICAgLy8gXHUyMDFDLVx1MjAxRCB8IFx1MjAxQz9cdTIwMUQgfCBcdTIwMUM6XHUyMDFEIHwgXHUyMDFDLFx1MjAxRCB8IFx1MjAxQ1tcdTIwMUQgfCBcdTIwMUNdXHUyMDFEIHwgXHUyMDFDe1x1MjAxRCB8IFx1MjAxQ31cdTIwMURcbiAgICAmJiBjICE9PSBDSEFSX01JTlVTXG4gICAgJiYgYyAhPT0gQ0hBUl9RVUVTVElPTlxuICAgICYmIGMgIT09IENIQVJfQ09MT05cbiAgICAmJiBjICE9PSBDSEFSX0NPTU1BXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVFxuICAgICYmIGMgIT09IENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUXG4gICAgLy8gfCBcdTIwMUMjXHUyMDFEIHwgXHUyMDFDJlx1MjAxRCB8IFx1MjAxQypcdTIwMUQgfCBcdTIwMUMhXHUyMDFEIHwgXHUyMDFDfFx1MjAxRCB8IFx1MjAxQz1cdTIwMUQgfCBcdTIwMUM+XHUyMDFEIHwgXHUyMDFDJ1x1MjAxRCB8IFx1MjAxQ1wiXHUyMDFEXG4gICAgJiYgYyAhPT0gQ0hBUl9TSEFSUFxuICAgICYmIGMgIT09IENIQVJfQU1QRVJTQU5EXG4gICAgJiYgYyAhPT0gQ0hBUl9BU1RFUklTS1xuICAgICYmIGMgIT09IENIQVJfRVhDTEFNQVRJT05cbiAgICAmJiBjICE9PSBDSEFSX1ZFUlRJQ0FMX0xJTkVcbiAgICAmJiBjICE9PSBDSEFSX0VRVUFMU1xuICAgICYmIGMgIT09IENIQVJfR1JFQVRFUl9USEFOXG4gICAgJiYgYyAhPT0gQ0hBUl9TSU5HTEVfUVVPVEVcbiAgICAmJiBjICE9PSBDSEFSX0RPVUJMRV9RVU9URVxuICAgIC8vIHwgXHUyMDFDJVx1MjAxRCB8IFx1MjAxQ0BcdTIwMUQgfCBcdTIwMUNgXHUyMDFEKVxuICAgICYmIGMgIT09IENIQVJfUEVSQ0VOVFxuICAgICYmIGMgIT09IENIQVJfQ09NTUVSQ0lBTF9BVFxuICAgICYmIGMgIT09IENIQVJfR1JBVkVfQUNDRU5UO1xufVxuXG4vLyBTaW1wbGlmaWVkIHRlc3QgZm9yIHZhbHVlcyBhbGxvd2VkIGFzIHRoZSBsYXN0IGNoYXJhY3RlciBpbiBwbGFpbiBzdHlsZS5cbmZ1bmN0aW9uIGlzUGxhaW5TYWZlTGFzdChjKSB7XG4gIC8vIGp1c3Qgbm90IHdoaXRlc3BhY2Ugb3IgY29sb24sIGl0IHdpbGwgYmUgY2hlY2tlZCB0byBiZSBwbGFpbiBjaGFyYWN0ZXIgbGF0ZXJcbiAgcmV0dXJuICFpc1doaXRlc3BhY2UoYykgJiYgYyAhPT0gQ0hBUl9DT0xPTjtcbn1cblxuLy8gU2FtZSBhcyAnc3RyaW5nJy5jb2RlUG9pbnRBdChwb3MpLCBidXQgd29ya3MgaW4gb2xkZXIgYnJvd3NlcnMuXG5mdW5jdGlvbiBjb2RlUG9pbnRBdChzdHJpbmcsIHBvcykge1xuICB2YXIgZmlyc3QgPSBzdHJpbmcuY2hhckNvZGVBdChwb3MpLCBzZWNvbmQ7XG4gIGlmIChmaXJzdCA+PSAweEQ4MDAgJiYgZmlyc3QgPD0gMHhEQkZGICYmIHBvcyArIDEgPCBzdHJpbmcubGVuZ3RoKSB7XG4gICAgc2Vjb25kID0gc3RyaW5nLmNoYXJDb2RlQXQocG9zICsgMSk7XG4gICAgaWYgKHNlY29uZCA+PSAweERDMDAgJiYgc2Vjb25kIDw9IDB4REZGRikge1xuICAgICAgLy8gaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmcjc3Vycm9nYXRlLWZvcm11bGFlXG4gICAgICByZXR1cm4gKGZpcnN0IC0gMHhEODAwKSAqIDB4NDAwICsgc2Vjb25kIC0gMHhEQzAwICsgMHgxMDAwMDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpcnN0O1xufVxuXG4vLyBEZXRlcm1pbmVzIHdoZXRoZXIgYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGlzIHJlcXVpcmVkLlxuZnVuY3Rpb24gbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpIHtcbiAgdmFyIGxlYWRpbmdTcGFjZVJlID0gL15cXG4qIC87XG4gIHJldHVybiBsZWFkaW5nU3BhY2VSZS50ZXN0KHN0cmluZyk7XG59XG5cbnZhciBTVFlMRV9QTEFJTiAgID0gMSxcbiAgICBTVFlMRV9TSU5HTEUgID0gMixcbiAgICBTVFlMRV9MSVRFUkFMID0gMyxcbiAgICBTVFlMRV9GT0xERUQgID0gNCxcbiAgICBTVFlMRV9ET1VCTEUgID0gNTtcblxuLy8gRGV0ZXJtaW5lcyB3aGljaCBzY2FsYXIgc3R5bGVzIGFyZSBwb3NzaWJsZSBhbmQgcmV0dXJucyB0aGUgcHJlZmVycmVkIHN0eWxlLlxuLy8gbGluZVdpZHRoID0gLTEgPT4gbm8gbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogc3RyLmxlbmd0aCA+IDAuXG4vLyBQb3N0LWNvbmRpdGlvbnM6XG4vLyAgICBTVFlMRV9QTEFJTiBvciBTVFlMRV9TSU5HTEUgPT4gbm8gXFxuIGFyZSBpbiB0aGUgc3RyaW5nLlxuLy8gICAgU1RZTEVfTElURVJBTCA9PiBubyBsaW5lcyBhcmUgc3VpdGFibGUgZm9yIGZvbGRpbmcgKG9yIGxpbmVXaWR0aCBpcyAtMSkuXG4vLyAgICBTVFlMRV9GT0xERUQgPT4gYSBsaW5lID4gbGluZVdpZHRoIGFuZCBjYW4gYmUgZm9sZGVkIChhbmQgbGluZVdpZHRoICE9IC0xKS5cbmZ1bmN0aW9uIGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIGluZGVudFBlckxldmVsLCBsaW5lV2lkdGgsXG4gIHRlc3RBbWJpZ3VvdXNUeXBlLCBxdW90aW5nVHlwZSwgZm9yY2VRdW90ZXMsIGluYmxvY2spIHtcblxuICB2YXIgaTtcbiAgdmFyIGNoYXIgPSAwO1xuICB2YXIgcHJldkNoYXIgPSBudWxsO1xuICB2YXIgaGFzTGluZUJyZWFrID0gZmFsc2U7XG4gIHZhciBoYXNGb2xkYWJsZUxpbmUgPSBmYWxzZTsgLy8gb25seSBjaGVja2VkIGlmIHNob3VsZFRyYWNrV2lkdGhcbiAgdmFyIHNob3VsZFRyYWNrV2lkdGggPSBsaW5lV2lkdGggIT09IC0xO1xuICB2YXIgcHJldmlvdXNMaW5lQnJlYWsgPSAtMTsgLy8gY291bnQgdGhlIGZpcnN0IGxpbmUgY29ycmVjdGx5XG4gIHZhciBwbGFpbiA9IGlzUGxhaW5TYWZlRmlyc3QoY29kZVBvaW50QXQoc3RyaW5nLCAwKSlcbiAgICAgICAgICAmJiBpc1BsYWluU2FmZUxhc3QoY29kZVBvaW50QXQoc3RyaW5nLCBzdHJpbmcubGVuZ3RoIC0gMSkpO1xuXG4gIGlmIChzaW5nbGVMaW5lT25seSB8fCBmb3JjZVF1b3Rlcykge1xuICAgIC8vIENhc2U6IG5vIGJsb2NrIHN0eWxlcy5cbiAgICAvLyBDaGVjayBmb3IgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzIHRvIHJ1bGUgb3V0IHBsYWluIGFuZCBzaW5nbGUuXG4gICAgZm9yIChpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGNoYXIgPj0gMHgxMDAwMCA/IGkgKz0gMiA6IGkrKykge1xuICAgICAgY2hhciA9IGNvZGVQb2ludEF0KHN0cmluZywgaSk7XG4gICAgICBpZiAoIWlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gICAgICB9XG4gICAgICBwbGFpbiA9IHBsYWluICYmIGlzUGxhaW5TYWZlKGNoYXIsIHByZXZDaGFyLCBpbmJsb2NrKTtcbiAgICAgIHByZXZDaGFyID0gY2hhcjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gQ2FzZTogYmxvY2sgc3R5bGVzIHBlcm1pdHRlZC5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgY2hhciA+PSAweDEwMDAwID8gaSArPSAyIDogaSsrKSB7XG4gICAgICBjaGFyID0gY29kZVBvaW50QXQoc3RyaW5nLCBpKTtcbiAgICAgIGlmIChjaGFyID09PSBDSEFSX0xJTkVfRkVFRCkge1xuICAgICAgICBoYXNMaW5lQnJlYWsgPSB0cnVlO1xuICAgICAgICAvLyBDaGVjayBpZiBhbnkgbGluZSBjYW4gYmUgZm9sZGVkLlxuICAgICAgICBpZiAoc2hvdWxkVHJhY2tXaWR0aCkge1xuICAgICAgICAgIGhhc0ZvbGRhYmxlTGluZSA9IGhhc0ZvbGRhYmxlTGluZSB8fFxuICAgICAgICAgICAgLy8gRm9sZGFibGUgbGluZSA9IHRvbyBsb25nLCBhbmQgbm90IG1vcmUtaW5kZW50ZWQuXG4gICAgICAgICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpO1xuICAgICAgICAgIHByZXZpb3VzTGluZUJyZWFrID0gaTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldkNoYXIsIGluYmxvY2spO1xuICAgICAgcHJldkNoYXIgPSBjaGFyO1xuICAgIH1cbiAgICAvLyBpbiBjYXNlIHRoZSBlbmQgaXMgbWlzc2luZyBhIFxcblxuICAgIGhhc0ZvbGRhYmxlTGluZSA9IGhhc0ZvbGRhYmxlTGluZSB8fCAoc2hvdWxkVHJhY2tXaWR0aCAmJlxuICAgICAgKGkgLSBwcmV2aW91c0xpbmVCcmVhayAtIDEgPiBsaW5lV2lkdGggJiZcbiAgICAgICBzdHJpbmdbcHJldmlvdXNMaW5lQnJlYWsgKyAxXSAhPT0gJyAnKSk7XG4gIH1cbiAgLy8gQWx0aG91Z2ggZXZlcnkgc3R5bGUgY2FuIHJlcHJlc2VudCBcXG4gd2l0aG91dCBlc2NhcGluZywgcHJlZmVyIGJsb2NrIHN0eWxlc1xuICAvLyBmb3IgbXVsdGlsaW5lLCBzaW5jZSB0aGV5J3JlIG1vcmUgcmVhZGFibGUgYW5kIHRoZXkgZG9uJ3QgYWRkIGVtcHR5IGxpbmVzLlxuICAvLyBBbHNvIHByZWZlciBmb2xkaW5nIGEgc3VwZXItbG9uZyBsaW5lLlxuICBpZiAoIWhhc0xpbmVCcmVhayAmJiAhaGFzRm9sZGFibGVMaW5lKSB7XG4gICAgLy8gU3RyaW5ncyBpbnRlcnByZXRhYmxlIGFzIGFub3RoZXIgdHlwZSBoYXZlIHRvIGJlIHF1b3RlZDtcbiAgICAvLyBlLmcuIHRoZSBzdHJpbmcgJ3RydWUnIHZzLiB0aGUgYm9vbGVhbiB0cnVlLlxuICAgIGlmIChwbGFpbiAmJiAhZm9yY2VRdW90ZXMgJiYgIXRlc3RBbWJpZ3VvdXNUeXBlKHN0cmluZykpIHtcbiAgICAgIHJldHVybiBTVFlMRV9QTEFJTjtcbiAgICB9XG4gICAgcmV0dXJuIHF1b3RpbmdUeXBlID09PSBRVU9USU5HX1RZUEVfRE9VQkxFID8gU1RZTEVfRE9VQkxFIDogU1RZTEVfU0lOR0xFO1xuICB9XG4gIC8vIEVkZ2UgY2FzZTogYmxvY2sgaW5kZW50YXRpb24gaW5kaWNhdG9yIGNhbiBvbmx5IGhhdmUgb25lIGRpZ2l0LlxuICBpZiAoaW5kZW50UGVyTGV2ZWwgPiA5ICYmIG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSkge1xuICAgIHJldHVybiBTVFlMRV9ET1VCTEU7XG4gIH1cbiAgLy8gQXQgdGhpcyBwb2ludCB3ZSBrbm93IGJsb2NrIHN0eWxlcyBhcmUgdmFsaWQuXG4gIC8vIFByZWZlciBsaXRlcmFsIHN0eWxlIHVubGVzcyB3ZSB3YW50IHRvIGZvbGQuXG4gIGlmICghZm9yY2VRdW90ZXMpIHtcbiAgICByZXR1cm4gaGFzRm9sZGFibGVMaW5lID8gU1RZTEVfRk9MREVEIDogU1RZTEVfTElURVJBTDtcbiAgfVxuICByZXR1cm4gcXVvdGluZ1R5cGUgPT09IFFVT1RJTkdfVFlQRV9ET1VCTEUgPyBTVFlMRV9ET1VCTEUgOiBTVFlMRV9TSU5HTEU7XG59XG5cbi8vIE5vdGU6IGxpbmUgYnJlYWtpbmcvZm9sZGluZyBpcyBpbXBsZW1lbnRlZCBmb3Igb25seSB0aGUgZm9sZGVkIHN0eWxlLlxuLy8gTkIuIFdlIGRyb3AgdGhlIGxhc3QgdHJhaWxpbmcgbmV3bGluZSAoaWYgYW55KSBvZiBhIHJldHVybmVkIGJsb2NrIHNjYWxhclxuLy8gIHNpbmNlIHRoZSBkdW1wZXIgYWRkcyBpdHMgb3duIG5ld2xpbmUuIFRoaXMgYWx3YXlzIHdvcmtzOlxuLy8gICAgXHUyMDIyIE5vIGVuZGluZyBuZXdsaW5lID0+IHVuYWZmZWN0ZWQ7IGFscmVhZHkgdXNpbmcgc3RyaXAgXCItXCIgY2hvbXBpbmcuXG4vLyAgICBcdTIwMjIgRW5kaW5nIG5ld2xpbmUgICAgPT4gcmVtb3ZlZCB0aGVuIHJlc3RvcmVkLlxuLy8gIEltcG9ydGFudGx5LCB0aGlzIGtlZXBzIHRoZSBcIitcIiBjaG9tcCBpbmRpY2F0b3IgZnJvbSBnYWluaW5nIGFuIGV4dHJhIGxpbmUuXG5mdW5jdGlvbiB3cml0ZVNjYWxhcihzdGF0ZSwgc3RyaW5nLCBsZXZlbCwgaXNrZXksIGluYmxvY2spIHtcbiAgc3RhdGUuZHVtcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHN0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBzdGF0ZS5xdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/ICdcIlwiJyA6IFwiJydcIjtcbiAgICB9XG4gICAgaWYgKCFzdGF0ZS5ub0NvbXBhdE1vZGUpIHtcbiAgICAgIGlmIChERVBSRUNBVEVEX0JPT0xFQU5TX1NZTlRBWC5pbmRleE9mKHN0cmluZykgIT09IC0xIHx8IERFUFJFQ0FURURfQkFTRTYwX1NZTlRBWC50ZXN0KHN0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnF1b3RpbmdUeXBlID09PSBRVU9USU5HX1RZUEVfRE9VQkxFID8gKCdcIicgKyBzdHJpbmcgKyAnXCInKSA6IChcIidcIiArIHN0cmluZyArIFwiJ1wiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaW5kZW50ID0gc3RhdGUuaW5kZW50ICogTWF0aC5tYXgoMSwgbGV2ZWwpOyAvLyBubyAwLWluZGVudCBzY2FsYXJzXG4gICAgLy8gQXMgaW5kZW50YXRpb24gZ2V0cyBkZWVwZXIsIGxldCB0aGUgd2lkdGggZGVjcmVhc2UgbW9ub3RvbmljYWxseVxuICAgIC8vIHRvIHRoZSBsb3dlciBib3VuZCBtaW4oc3RhdGUubGluZVdpZHRoLCA0MCkuXG4gICAgLy8gTm90ZSB0aGF0IHRoaXMgaW1wbGllc1xuICAgIC8vICBzdGF0ZS5saW5lV2lkdGggXHUyMjY0IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBpcyBmaXhlZCBhdCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCA+IDQwICsgc3RhdGUuaW5kZW50OiB3aWR0aCBkZWNyZWFzZXMgdW50aWwgdGhlIGxvd2VyIGJvdW5kLlxuICAgIC8vIFRoaXMgYmVoYXZlcyBiZXR0ZXIgdGhhbiBhIGNvbnN0YW50IG1pbmltdW0gd2lkdGggd2hpY2ggZGlzYWxsb3dzIG5hcnJvd2VyIG9wdGlvbnMsXG4gICAgLy8gb3IgYW4gaW5kZW50IHRocmVzaG9sZCB3aGljaCBjYXVzZXMgdGhlIHdpZHRoIHRvIHN1ZGRlbmx5IGluY3JlYXNlLlxuICAgIHZhciBsaW5lV2lkdGggPSBzdGF0ZS5saW5lV2lkdGggPT09IC0xXG4gICAgICA/IC0xIDogTWF0aC5tYXgoTWF0aC5taW4oc3RhdGUubGluZVdpZHRoLCA0MCksIHN0YXRlLmxpbmVXaWR0aCAtIGluZGVudCk7XG5cbiAgICAvLyBXaXRob3V0IGtub3dpbmcgaWYga2V5cyBhcmUgaW1wbGljaXQvZXhwbGljaXQsIGFzc3VtZSBpbXBsaWNpdCBmb3Igc2FmZXR5LlxuICAgIHZhciBzaW5nbGVMaW5lT25seSA9IGlza2V5XG4gICAgICAvLyBObyBibG9jayBzdHlsZXMgaW4gZmxvdyBtb2RlLlxuICAgICAgfHwgKHN0YXRlLmZsb3dMZXZlbCA+IC0xICYmIGxldmVsID49IHN0YXRlLmZsb3dMZXZlbCk7XG4gICAgZnVuY3Rpb24gdGVzdEFtYmlndWl0eShzdHJpbmcpIHtcbiAgICAgIHJldHVybiB0ZXN0SW1wbGljaXRSZXNvbHZpbmcoc3RhdGUsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjaG9vc2VTY2FsYXJTdHlsZShzdHJpbmcsIHNpbmdsZUxpbmVPbmx5LCBzdGF0ZS5pbmRlbnQsIGxpbmVXaWR0aCxcbiAgICAgIHRlc3RBbWJpZ3VpdHksIHN0YXRlLnF1b3RpbmdUeXBlLCBzdGF0ZS5mb3JjZVF1b3RlcyAmJiAhaXNrZXksIGluYmxvY2spKSB7XG5cbiAgICAgIGNhc2UgU1RZTEVfUExBSU46XG4gICAgICAgIHJldHVybiBzdHJpbmc7XG4gICAgICBjYXNlIFNUWUxFX1NJTkdMRTpcbiAgICAgICAgcmV0dXJuIFwiJ1wiICsgc3RyaW5nLnJlcGxhY2UoLycvZywgXCInJ1wiKSArIFwiJ1wiO1xuICAgICAgY2FzZSBTVFlMRV9MSVRFUkFMOlxuICAgICAgICByZXR1cm4gJ3wnICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoc3RyaW5nLCBpbmRlbnQpKTtcbiAgICAgIGNhc2UgU1RZTEVfRk9MREVEOlxuICAgICAgICByZXR1cm4gJz4nICsgYmxvY2tIZWFkZXIoc3RyaW5nLCBzdGF0ZS5pbmRlbnQpXG4gICAgICAgICAgKyBkcm9wRW5kaW5nTmV3bGluZShpbmRlbnRTdHJpbmcoZm9sZFN0cmluZyhzdHJpbmcsIGxpbmVXaWR0aCksIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9ET1VCTEU6XG4gICAgICAgIHJldHVybiAnXCInICsgZXNjYXBlU3RyaW5nKHN0cmluZykgKyAnXCInO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignaW1wb3NzaWJsZSBlcnJvcjogaW52YWxpZCBzY2FsYXIgc3R5bGUnKTtcbiAgICB9XG4gIH0oKSk7XG59XG5cbi8vIFByZS1jb25kaXRpb25zOiBzdHJpbmcgaXMgdmFsaWQgZm9yIGEgYmxvY2sgc2NhbGFyLCAxIDw9IGluZGVudFBlckxldmVsIDw9IDkuXG5mdW5jdGlvbiBibG9ja0hlYWRlcihzdHJpbmcsIGluZGVudFBlckxldmVsKSB7XG4gIHZhciBpbmRlbnRJbmRpY2F0b3IgPSBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykgPyBTdHJpbmcoaW5kZW50UGVyTGV2ZWwpIDogJyc7XG5cbiAgLy8gbm90ZSB0aGUgc3BlY2lhbCBjYXNlOiB0aGUgc3RyaW5nICdcXG4nIGNvdW50cyBhcyBhIFwidHJhaWxpbmdcIiBlbXB0eSBsaW5lLlxuICB2YXIgY2xpcCA9ICAgICAgICAgIHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMV0gPT09ICdcXG4nO1xuICB2YXIga2VlcCA9IGNsaXAgJiYgKHN0cmluZ1tzdHJpbmcubGVuZ3RoIC0gMl0gPT09ICdcXG4nIHx8IHN0cmluZyA9PT0gJ1xcbicpO1xuICB2YXIgY2hvbXAgPSBrZWVwID8gJysnIDogKGNsaXAgPyAnJyA6ICctJyk7XG5cbiAgcmV0dXJuIGluZGVudEluZGljYXRvciArIGNob21wICsgJ1xcbic7XG59XG5cbi8vIChTZWUgdGhlIG5vdGUgZm9yIHdyaXRlU2NhbGFyLilcbmZ1bmN0aW9uIGRyb3BFbmRpbmdOZXdsaW5lKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbicgPyBzdHJpbmcuc2xpY2UoMCwgLTEpIDogc3RyaW5nO1xufVxuXG4vLyBOb3RlOiBhIGxvbmcgbGluZSB3aXRob3V0IGEgc3VpdGFibGUgYnJlYWsgcG9pbnQgd2lsbCBleGNlZWQgdGhlIHdpZHRoIGxpbWl0LlxuLy8gUHJlLWNvbmRpdGlvbnM6IGV2ZXJ5IGNoYXIgaW4gc3RyIGlzUHJpbnRhYmxlLCBzdHIubGVuZ3RoID4gMCwgd2lkdGggPiAwLlxuZnVuY3Rpb24gZm9sZFN0cmluZyhzdHJpbmcsIHdpZHRoKSB7XG4gIC8vIEluIGZvbGRlZCBzdHlsZSwgJGskIGNvbnNlY3V0aXZlIG5ld2xpbmVzIG91dHB1dCBhcyAkaysxJCBuZXdsaW5lc1x1MjAxNFxuICAvLyB1bmxlc3MgdGhleSdyZSBiZWZvcmUgb3IgYWZ0ZXIgYSBtb3JlLWluZGVudGVkIGxpbmUsIG9yIGF0IHRoZSB2ZXJ5XG4gIC8vIGJlZ2lubmluZyBvciBlbmQsIGluIHdoaWNoIGNhc2UgJGskIG1hcHMgdG8gJGskLlxuICAvLyBUaGVyZWZvcmUsIHBhcnNlIGVhY2ggY2h1bmsgYXMgbmV3bGluZShzKSBmb2xsb3dlZCBieSBhIGNvbnRlbnQgbGluZS5cbiAgdmFyIGxpbmVSZSA9IC8oXFxuKykoW15cXG5dKikvZztcblxuICAvLyBmaXJzdCBsaW5lIChwb3NzaWJseSBhbiBlbXB0eSBsaW5lKVxuICB2YXIgcmVzdWx0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dExGID0gc3RyaW5nLmluZGV4T2YoJ1xcbicpO1xuICAgIG5leHRMRiA9IG5leHRMRiAhPT0gLTEgPyBuZXh0TEYgOiBzdHJpbmcubGVuZ3RoO1xuICAgIGxpbmVSZS5sYXN0SW5kZXggPSBuZXh0TEY7XG4gICAgcmV0dXJuIGZvbGRMaW5lKHN0cmluZy5zbGljZSgwLCBuZXh0TEYpLCB3aWR0aCk7XG4gIH0oKSk7XG4gIC8vIElmIHdlIGhhdmVuJ3QgcmVhY2hlZCB0aGUgZmlyc3QgY29udGVudCBsaW5lIHlldCwgZG9uJ3QgYWRkIGFuIGV4dHJhIFxcbi5cbiAgdmFyIHByZXZNb3JlSW5kZW50ZWQgPSBzdHJpbmdbMF0gPT09ICdcXG4nIHx8IHN0cmluZ1swXSA9PT0gJyAnO1xuICB2YXIgbW9yZUluZGVudGVkO1xuXG4gIC8vIHJlc3Qgb2YgdGhlIGxpbmVzXG4gIHZhciBtYXRjaDtcbiAgd2hpbGUgKChtYXRjaCA9IGxpbmVSZS5leGVjKHN0cmluZykpKSB7XG4gICAgdmFyIHByZWZpeCA9IG1hdGNoWzFdLCBsaW5lID0gbWF0Y2hbMl07XG4gICAgbW9yZUluZGVudGVkID0gKGxpbmVbMF0gPT09ICcgJyk7XG4gICAgcmVzdWx0ICs9IHByZWZpeFxuICAgICAgKyAoIXByZXZNb3JlSW5kZW50ZWQgJiYgIW1vcmVJbmRlbnRlZCAmJiBsaW5lICE9PSAnJ1xuICAgICAgICA/ICdcXG4nIDogJycpXG4gICAgICArIGZvbGRMaW5lKGxpbmUsIHdpZHRoKTtcbiAgICBwcmV2TW9yZUluZGVudGVkID0gbW9yZUluZGVudGVkO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gR3JlZWR5IGxpbmUgYnJlYWtpbmcuXG4vLyBQaWNrcyB0aGUgbG9uZ2VzdCBsaW5lIHVuZGVyIHRoZSBsaW1pdCBlYWNoIHRpbWUsXG4vLyBvdGhlcndpc2Ugc2V0dGxlcyBmb3IgdGhlIHNob3J0ZXN0IGxpbmUgb3ZlciB0aGUgbGltaXQuXG4vLyBOQi4gTW9yZS1pbmRlbnRlZCBsaW5lcyAqY2Fubm90KiBiZSBmb2xkZWQsIGFzIHRoYXQgd291bGQgYWRkIGFuIGV4dHJhIFxcbi5cbmZ1bmN0aW9uIGZvbGRMaW5lKGxpbmUsIHdpZHRoKSB7XG4gIGlmIChsaW5lID09PSAnJyB8fCBsaW5lWzBdID09PSAnICcpIHJldHVybiBsaW5lO1xuXG4gIC8vIFNpbmNlIGEgbW9yZS1pbmRlbnRlZCBsaW5lIGFkZHMgYSBcXG4sIGJyZWFrcyBjYW4ndCBiZSBmb2xsb3dlZCBieSBhIHNwYWNlLlxuICB2YXIgYnJlYWtSZSA9IC8gW14gXS9nOyAvLyBub3RlOiB0aGUgbWF0Y2ggaW5kZXggd2lsbCBhbHdheXMgYmUgPD0gbGVuZ3RoLTIuXG4gIHZhciBtYXRjaDtcbiAgLy8gc3RhcnQgaXMgYW4gaW5jbHVzaXZlIGluZGV4LiBlbmQsIGN1cnIsIGFuZCBuZXh0IGFyZSBleGNsdXNpdmUuXG4gIHZhciBzdGFydCA9IDAsIGVuZCwgY3VyciA9IDAsIG5leHQgPSAwO1xuICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgLy8gSW52YXJpYW50czogMCA8PSBzdGFydCA8PSBsZW5ndGgtMS5cbiAgLy8gICAwIDw9IGN1cnIgPD0gbmV4dCA8PSBtYXgoMCwgbGVuZ3RoLTIpLiBjdXJyIC0gc3RhcnQgPD0gd2lkdGguXG4gIC8vIEluc2lkZSB0aGUgbG9vcDpcbiAgLy8gICBBIG1hdGNoIGltcGxpZXMgbGVuZ3RoID49IDIsIHNvIGN1cnIgYW5kIG5leHQgYXJlIDw9IGxlbmd0aC0yLlxuICB3aGlsZSAoKG1hdGNoID0gYnJlYWtSZS5leGVjKGxpbmUpKSkge1xuICAgIG5leHQgPSBtYXRjaC5pbmRleDtcbiAgICAvLyBtYWludGFpbiBpbnZhcmlhbnQ6IGN1cnIgLSBzdGFydCA8PSB3aWR0aFxuICAgIGlmIChuZXh0IC0gc3RhcnQgPiB3aWR0aCkge1xuICAgICAgZW5kID0gKGN1cnIgPiBzdGFydCkgPyBjdXJyIDogbmV4dDsgLy8gZGVyaXZlIGVuZCA8PSBsZW5ndGgtMlxuICAgICAgcmVzdWx0ICs9ICdcXG4nICsgbGluZS5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgIC8vIHNraXAgdGhlIHNwYWNlIHRoYXQgd2FzIG91dHB1dCBhcyBcXG5cbiAgICAgIHN0YXJ0ID0gZW5kICsgMTsgICAgICAgICAgICAgICAgICAgIC8vIGRlcml2ZSBzdGFydCA8PSBsZW5ndGgtMVxuICAgIH1cbiAgICBjdXJyID0gbmV4dDtcbiAgfVxuXG4gIC8vIEJ5IHRoZSBpbnZhcmlhbnRzLCBzdGFydCA8PSBsZW5ndGgtMSwgc28gdGhlcmUgaXMgc29tZXRoaW5nIGxlZnQgb3Zlci5cbiAgLy8gSXQgaXMgZWl0aGVyIHRoZSB3aG9sZSBzdHJpbmcgb3IgYSBwYXJ0IHN0YXJ0aW5nIGZyb20gbm9uLXdoaXRlc3BhY2UuXG4gIHJlc3VsdCArPSAnXFxuJztcbiAgLy8gSW5zZXJ0IGEgYnJlYWsgaWYgdGhlIHJlbWFpbmRlciBpcyB0b28gbG9uZyBhbmQgdGhlcmUgaXMgYSBicmVhayBhdmFpbGFibGUuXG4gIGlmIChsaW5lLmxlbmd0aCAtIHN0YXJ0ID4gd2lkdGggJiYgY3VyciA+IHN0YXJ0KSB7XG4gICAgcmVzdWx0ICs9IGxpbmUuc2xpY2Uoc3RhcnQsIGN1cnIpICsgJ1xcbicgKyBsaW5lLnNsaWNlKGN1cnIgKyAxKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0LnNsaWNlKDEpOyAvLyBkcm9wIGV4dHJhIFxcbiBqb2luZXJcbn1cblxuLy8gRXNjYXBlcyBhIGRvdWJsZS1xdW90ZWQgc3RyaW5nLlxuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIHZhciBjaGFyID0gMDtcbiAgdmFyIGVzY2FwZVNlcTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGNoYXIgPj0gMHgxMDAwMCA/IGkgKz0gMiA6IGkrKykge1xuICAgIGNoYXIgPSBjb2RlUG9pbnRBdChzdHJpbmcsIGkpO1xuICAgIGVzY2FwZVNlcSA9IEVTQ0FQRV9TRVFVRU5DRVNbY2hhcl07XG5cbiAgICBpZiAoIWVzY2FwZVNlcSAmJiBpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgcmVzdWx0ICs9IHN0cmluZ1tpXTtcbiAgICAgIGlmIChjaGFyID49IDB4MTAwMDApIHJlc3VsdCArPSBzdHJpbmdbaSArIDFdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgKz0gZXNjYXBlU2VxIHx8IGVuY29kZUhleChjaGFyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiB3cml0ZUZsb3dTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCkge1xuICB2YXIgX3Jlc3VsdCA9ICcnLFxuICAgICAgX3RhZyAgICA9IHN0YXRlLnRhZyxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgdmFsdWU7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdmFsdWUgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgICB2YWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwob2JqZWN0LCBTdHJpbmcoaW5kZXgpLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gV3JpdGUgb25seSB2YWxpZCBlbGVtZW50cywgcHV0IG51bGwgaW5zdGVhZCBvZiBpbnZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCB2YWx1ZSwgZmFsc2UsIGZhbHNlKSB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgbnVsbCwgZmFsc2UsIGZhbHNlKSkpIHtcblxuICAgICAgaWYgKF9yZXN1bHQgIT09ICcnKSBfcmVzdWx0ICs9ICcsJyArICghc3RhdGUuY29uZGVuc2VGbG93ID8gJyAnIDogJycpO1xuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSAnWycgKyBfcmVzdWx0ICsgJ10nO1xufVxuXG5mdW5jdGlvbiB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgPSAnJyxcbiAgICAgIF90YWcgICAgPSBzdGF0ZS50YWcsXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIHZhbHVlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHZhbHVlID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgICAgdmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKG9iamVjdCwgU3RyaW5nKGluZGV4KSwgdmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFdyaXRlIG9ubHkgdmFsaWQgZWxlbWVudHMsIHB1dCBudWxsIGluc3RlYWQgb2YgaW52YWxpZCBlbGVtZW50cy5cbiAgICBpZiAod3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIHZhbHVlLCB0cnVlLCB0cnVlLCBmYWxzZSwgdHJ1ZSkgfHxcbiAgICAgICAgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBudWxsLCB0cnVlLCB0cnVlLCBmYWxzZSwgdHJ1ZSkpKSB7XG5cbiAgICAgIGlmICghY29tcGFjdCB8fCBfcmVzdWx0ICE9PSAnJykge1xuICAgICAgICBfcmVzdWx0ICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBfcmVzdWx0ICs9ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0gJztcbiAgICAgIH1cblxuICAgICAgX3Jlc3VsdCArPSBzdGF0ZS5kdW1wO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICdbXSc7IC8vIEVtcHR5IHNlcXVlbmNlIGlmIG5vIHZhbGlkIHZhbHVlcy5cbn1cblxuZnVuY3Rpb24gd3JpdGVGbG93TWFwcGluZyhzdGF0ZSwgbGV2ZWwsIG9iamVjdCkge1xuICB2YXIgX3Jlc3VsdCAgICAgICA9ICcnLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICBvYmplY3RLZXksXG4gICAgICBvYmplY3RWYWx1ZSxcbiAgICAgIHBhaXJCdWZmZXI7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuXG4gICAgcGFpckJ1ZmZlciA9ICcnO1xuICAgIGlmIChfcmVzdWx0ICE9PSAnJykgcGFpckJ1ZmZlciArPSAnLCAnO1xuXG4gICAgaWYgKHN0YXRlLmNvbmRlbnNlRmxvdykgcGFpckJ1ZmZlciArPSAnXCInO1xuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgICAgb2JqZWN0VmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKG9iamVjdCwgb2JqZWN0S2V5LCBvYmplY3RWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RLZXksIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5O1xuICAgIH1cblxuICAgIGlmIChzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpIHBhaXJCdWZmZXIgKz0gJz8gJztcblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcCArIChzdGF0ZS5jb25kZW5zZUZsb3cgPyAnXCInIDogJycpICsgJzonICsgKHN0YXRlLmNvbmRlbnNlRmxvdyA/ICcnIDogJyAnKTtcblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCwgb2JqZWN0VmFsdWUsIGZhbHNlLCBmYWxzZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgLy8gQm90aCBrZXkgYW5kIHZhbHVlIGFyZSB2YWxpZC5cbiAgICBfcmVzdWx0ICs9IHBhaXJCdWZmZXI7XG4gIH1cblxuICBzdGF0ZS50YWcgPSBfdGFnO1xuICBzdGF0ZS5kdW1wID0gJ3snICsgX3Jlc3VsdCArICd9Jztcbn1cblxuZnVuY3Rpb24gd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBvYmplY3QsIGNvbXBhY3QpIHtcbiAgdmFyIF9yZXN1bHQgICAgICAgPSAnJyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgb2JqZWN0S2V5LFxuICAgICAgb2JqZWN0VmFsdWUsXG4gICAgICBleHBsaWNpdFBhaXIsXG4gICAgICBwYWlyQnVmZmVyO1xuXG4gIC8vIEFsbG93IHNvcnRpbmcga2V5cyBzbyB0aGF0IHRoZSBvdXRwdXQgZmlsZSBpcyBkZXRlcm1pbmlzdGljXG4gIGlmIChzdGF0ZS5zb3J0S2V5cyA9PT0gdHJ1ZSkge1xuICAgIC8vIERlZmF1bHQgc29ydGluZ1xuICAgIG9iamVjdEtleUxpc3Quc29ydCgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzdGF0ZS5zb3J0S2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEN1c3RvbSBzb3J0IGZ1bmN0aW9uXG4gICAgb2JqZWN0S2V5TGlzdC5zb3J0KHN0YXRlLnNvcnRLZXlzKTtcbiAgfSBlbHNlIGlmIChzdGF0ZS5zb3J0S2V5cykge1xuICAgIC8vIFNvbWV0aGluZyBpcyB3cm9uZ1xuICAgIHRocm93IG5ldyBleGNlcHRpb24oJ3NvcnRLZXlzIG11c3QgYmUgYSBib29sZWFuIG9yIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3RLZXlMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyQnVmZmVyID0gJyc7XG5cbiAgICBpZiAoIWNvbXBhY3QgfHwgX3Jlc3VsdCAhPT0gJycpIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgIH1cblxuICAgIG9iamVjdEtleSA9IG9iamVjdEtleUxpc3RbaW5kZXhdO1xuICAgIG9iamVjdFZhbHVlID0gb2JqZWN0W29iamVjdEtleV07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIG9iamVjdFZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIG9iamVjdEtleSwgb2JqZWN0VmFsdWUpO1xuICAgIH1cblxuICAgIGlmICghd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG9iamVjdEtleSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQga2V5LlxuICAgIH1cblxuICAgIGV4cGxpY2l0UGFpciA9IChzdGF0ZS50YWcgIT09IG51bGwgJiYgc3RhdGUudGFnICE9PSAnPycpIHx8XG4gICAgICAgICAgICAgICAgICAgKHN0YXRlLmR1bXAgJiYgc3RhdGUuZHVtcC5sZW5ndGggPiAxMDI0KTtcblxuICAgIGlmIChleHBsaWNpdFBhaXIpIHtcbiAgICAgIGlmIChzdGF0ZS5kdW1wICYmIENIQVJfTElORV9GRUVEID09PSBzdGF0ZS5kdW1wLmNoYXJDb2RlQXQoMCkpIHtcbiAgICAgICAgcGFpckJ1ZmZlciArPSAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/ICc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0VmFsdWUsIHRydWUsIGV4cGxpY2l0UGFpcikpIHtcbiAgICAgIGNvbnRpbnVlOyAvLyBTa2lwIHRoaXMgcGFpciBiZWNhdXNlIG9mIGludmFsaWQgdmFsdWUuXG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOic7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJCdWZmZXIgKz0gJzogJztcbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICAvLyBCb3RoIGtleSBhbmQgdmFsdWUgYXJlIHZhbGlkLlxuICAgIF9yZXN1bHQgKz0gcGFpckJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSBfcmVzdWx0IHx8ICd7fSc7IC8vIEVtcHR5IG1hcHBpbmcgaWYgbm8gdmFsaWQgcGFpcnMuXG59XG5cbmZ1bmN0aW9uIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgZXhwbGljaXQpIHtcbiAgdmFyIF9yZXN1bHQsIHR5cGVMaXN0LCBpbmRleCwgbGVuZ3RoLCB0eXBlLCBzdHlsZTtcblxuICB0eXBlTGlzdCA9IGV4cGxpY2l0ID8gc3RhdGUuZXhwbGljaXRUeXBlcyA6IHN0YXRlLmltcGxpY2l0VHlwZXM7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHR5cGVMaXN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gdHlwZUxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKCh0eXBlLmluc3RhbmNlT2YgIHx8IHR5cGUucHJlZGljYXRlKSAmJlxuICAgICAgICAoIXR5cGUuaW5zdGFuY2VPZiB8fCAoKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnKSAmJiAob2JqZWN0IGluc3RhbmNlb2YgdHlwZS5pbnN0YW5jZU9mKSkpICYmXG4gICAgICAgICghdHlwZS5wcmVkaWNhdGUgIHx8IHR5cGUucHJlZGljYXRlKG9iamVjdCkpKSB7XG5cbiAgICAgIGlmIChleHBsaWNpdCkge1xuICAgICAgICBpZiAodHlwZS5tdWx0aSAmJiB0eXBlLnJlcHJlc2VudE5hbWUpIHtcbiAgICAgICAgICBzdGF0ZS50YWcgPSB0eXBlLnJlcHJlc2VudE5hbWUob2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS50YWcgPSB0eXBlLnRhZztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGUudGFnID0gJz8nO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS5yZXByZXNlbnQpIHtcbiAgICAgICAgc3R5bGUgPSBzdGF0ZS5zdHlsZU1hcFt0eXBlLnRhZ10gfHwgdHlwZS5kZWZhdWx0U3R5bGU7XG5cbiAgICAgICAgaWYgKF90b1N0cmluZy5jYWxsKHR5cGUucmVwcmVzZW50KSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJykge1xuICAgICAgICAgIF9yZXN1bHQgPSB0eXBlLnJlcHJlc2VudChvYmplY3QsIHN0eWxlKTtcbiAgICAgICAgfSBlbHNlIGlmIChfaGFzT3duUHJvcGVydHkuY2FsbCh0eXBlLnJlcHJlc2VudCwgc3R5bGUpKSB7XG4gICAgICAgICAgX3Jlc3VsdCA9IHR5cGUucmVwcmVzZW50W3N0eWxlXShvYmplY3QsIHN0eWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCchPCcgKyB0eXBlLnRhZyArICc+IHRhZyByZXNvbHZlciBhY2NlcHRzIG5vdCBcIicgKyBzdHlsZSArICdcIiBzdHlsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUuZHVtcCA9IF9yZXN1bHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gU2VyaWFsaXplcyBgb2JqZWN0YCBhbmQgd3JpdGVzIGl0IHRvIGdsb2JhbCBgcmVzdWx0YC5cbi8vIFJldHVybnMgdHJ1ZSBvbiBzdWNjZXNzLCBvciBmYWxzZSBvbiBpbnZhbGlkIG9iamVjdC5cbi8vXG5mdW5jdGlvbiB3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3QsIGJsb2NrLCBjb21wYWN0LCBpc2tleSwgaXNibG9ja3NlcSkge1xuICBzdGF0ZS50YWcgPSBudWxsO1xuICBzdGF0ZS5kdW1wID0gb2JqZWN0O1xuXG4gIGlmICghZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBmYWxzZSkpIHtcbiAgICBkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIHRydWUpO1xuICB9XG5cbiAgdmFyIHR5cGUgPSBfdG9TdHJpbmcuY2FsbChzdGF0ZS5kdW1wKTtcbiAgdmFyIGluYmxvY2sgPSBibG9jaztcbiAgdmFyIHRhZ1N0cjtcblxuICBpZiAoYmxvY2spIHtcbiAgICBibG9jayA9IChzdGF0ZS5mbG93TGV2ZWwgPCAwIHx8IHN0YXRlLmZsb3dMZXZlbCA+IGxldmVsKTtcbiAgfVxuXG4gIHZhciBvYmplY3RPckFycmF5ID0gdHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgfHwgdHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICAgIGR1cGxpY2F0ZUluZGV4LFxuICAgICAgZHVwbGljYXRlO1xuXG4gIGlmIChvYmplY3RPckFycmF5KSB7XG4gICAgZHVwbGljYXRlSW5kZXggPSBzdGF0ZS5kdXBsaWNhdGVzLmluZGV4T2Yob2JqZWN0KTtcbiAgICBkdXBsaWNhdGUgPSBkdXBsaWNhdGVJbmRleCAhPT0gLTE7XG4gIH1cblxuICBpZiAoKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHwgZHVwbGljYXRlIHx8IChzdGF0ZS5pbmRlbnQgIT09IDIgJiYgbGV2ZWwgPiAwKSkge1xuICAgIGNvbXBhY3QgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChkdXBsaWNhdGUgJiYgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgc3RhdGUuZHVtcCA9ICcqcmVmXycgKyBkdXBsaWNhdGVJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2JqZWN0T3JBcnJheSAmJiBkdXBsaWNhdGUgJiYgIXN0YXRlLnVzZWREdXBsaWNhdGVzW2R1cGxpY2F0ZUluZGV4XSkge1xuICAgICAgc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICBpZiAoYmxvY2sgJiYgKE9iamVjdC5rZXlzKHN0YXRlLmR1bXApLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgd3JpdGVCbG9ja01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wLCBjb21wYWN0KTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCk7XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgaWYgKGJsb2NrICYmIChzdGF0ZS5kdW1wLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgaWYgKHN0YXRlLm5vQXJyYXlJbmRlbnQgJiYgIWlzYmxvY2tzZXEgJiYgbGV2ZWwgPiAwKSB7XG4gICAgICAgICAgd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBsZXZlbCAtIDEsIHN0YXRlLmR1bXAsIGNvbXBhY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXAsIGNvbXBhY3QpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkdXBsaWNhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5kdW1wID0gJyZyZWZfJyArIGR1cGxpY2F0ZUluZGV4ICsgc3RhdGUuZHVtcDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JpdGVGbG93U2VxdWVuY2Uoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wKTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBTdHJpbmddJykge1xuICAgICAgaWYgKHN0YXRlLnRhZyAhPT0gJz8nKSB7XG4gICAgICAgIHdyaXRlU2NhbGFyKHN0YXRlLCBzdGF0ZS5kdW1wLCBsZXZlbCwgaXNrZXksIGluYmxvY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ1tvYmplY3QgVW5kZWZpbmVkXScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXRlLnNraXBJbnZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCd1bmFjY2VwdGFibGUga2luZCBvZiBhbiBvYmplY3QgdG8gZHVtcCAnICsgdHlwZSk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/Jykge1xuICAgICAgLy8gTmVlZCB0byBlbmNvZGUgYWxsIGNoYXJhY3RlcnMgZXhjZXB0IHRob3NlIGFsbG93ZWQgYnkgdGhlIHNwZWM6XG4gICAgICAvL1xuICAgICAgLy8gWzM1XSBucy1kZWMtZGlnaXQgICAgOjo9ICBbI3gzMC0jeDM5XSAvKiAwLTkgKi9cbiAgICAgIC8vIFszNl0gbnMtaGV4LWRpZ2l0ICAgIDo6PSAgbnMtZGVjLWRpZ2l0XG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB8IFsjeDQxLSN4NDZdIC8qIEEtRiAqLyB8IFsjeDYxLSN4NjZdIC8qIGEtZiAqL1xuICAgICAgLy8gWzM3XSBucy1hc2NpaS1sZXR0ZXIgOjo9ICBbI3g0MS0jeDVBXSAvKiBBLVogKi8gfCBbI3g2MS0jeDdBXSAvKiBhLXogKi9cbiAgICAgIC8vIFszOF0gbnMtd29yZC1jaGFyICAgIDo6PSAgbnMtZGVjLWRpZ2l0IHwgbnMtYXNjaWktbGV0dGVyIHwgXHUyMDFDLVx1MjAxRFxuICAgICAgLy8gWzM5XSBucy11cmktY2hhciAgICAgOjo9ICBcdTIwMUMlXHUyMDFEIG5zLWhleC1kaWdpdCBucy1oZXgtZGlnaXQgfCBucy13b3JkLWNoYXIgfCBcdTIwMUMjXHUyMDFEXG4gICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB8IFx1MjAxQztcdTIwMUQgfCBcdTIwMUMvXHUyMDFEIHwgXHUyMDFDP1x1MjAxRCB8IFx1MjAxQzpcdTIwMUQgfCBcdTIwMUNAXHUyMDFEIHwgXHUyMDFDJlx1MjAxRCB8IFx1MjAxQz1cdTIwMUQgfCBcdTIwMUMrXHUyMDFEIHwgXHUyMDFDJFx1MjAxRCB8IFx1MjAxQyxcdTIwMURcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHwgXHUyMDFDX1x1MjAxRCB8IFx1MjAxQy5cdTIwMUQgfCBcdTIwMUMhXHUyMDFEIHwgXHUyMDFDflx1MjAxRCB8IFx1MjAxQypcdTIwMUQgfCBcdTIwMUMnXHUyMDFEIHwgXHUyMDFDKFx1MjAxRCB8IFx1MjAxQylcdTIwMUQgfCBcdTIwMUNbXHUyMDFEIHwgXHUyMDFDXVx1MjAxRFxuICAgICAgLy9cbiAgICAgIC8vIEFsc28gbmVlZCB0byBlbmNvZGUgJyEnIGJlY2F1c2UgaXQgaGFzIHNwZWNpYWwgbWVhbmluZyAoZW5kIG9mIHRhZyBwcmVmaXgpLlxuICAgICAgLy9cbiAgICAgIHRhZ1N0ciA9IGVuY29kZVVSSShcbiAgICAgICAgc3RhdGUudGFnWzBdID09PSAnIScgPyBzdGF0ZS50YWcuc2xpY2UoMSkgOiBzdGF0ZS50YWdcbiAgICAgICkucmVwbGFjZSgvIS9nLCAnJTIxJyk7XG5cbiAgICAgIGlmIChzdGF0ZS50YWdbMF0gPT09ICchJykge1xuICAgICAgICB0YWdTdHIgPSAnIScgKyB0YWdTdHI7XG4gICAgICB9IGVsc2UgaWYgKHRhZ1N0ci5zbGljZSgwLCAxOCkgPT09ICd0YWc6eWFtbC5vcmcsMjAwMjonKSB7XG4gICAgICAgIHRhZ1N0ciA9ICchIScgKyB0YWdTdHIuc2xpY2UoMTgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFnU3RyID0gJyE8JyArIHRhZ1N0ciArICc+JztcbiAgICAgIH1cblxuICAgICAgc3RhdGUuZHVtcCA9IHRhZ1N0ciArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMob2JqZWN0LCBzdGF0ZSkge1xuICB2YXIgb2JqZWN0cyA9IFtdLFxuICAgICAgZHVwbGljYXRlc0luZGV4ZXMgPSBbXSxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGluc3BlY3ROb2RlKG9iamVjdCwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBkdXBsaWNhdGVzSW5kZXhlcy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgc3RhdGUuZHVwbGljYXRlcy5wdXNoKG9iamVjdHNbZHVwbGljYXRlc0luZGV4ZXNbaW5kZXhdXSk7XG4gIH1cbiAgc3RhdGUudXNlZER1cGxpY2F0ZXMgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gaW5zcGVjdE5vZGUob2JqZWN0LCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcykge1xuICB2YXIgb2JqZWN0S2V5TGlzdCxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoO1xuXG4gIGlmIChvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpIHtcbiAgICBpbmRleCA9IG9iamVjdHMuaW5kZXhPZihvYmplY3QpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGlmIChkdXBsaWNhdGVzSW5kZXhlcy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgZHVwbGljYXRlc0luZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG9iamVjdHMucHVzaChvYmplY3QpO1xuXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvYmplY3QpKSB7XG4gICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtpbmRleF0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgICAgICAgIGluc3BlY3ROb2RlKG9iamVjdFtvYmplY3RLZXlMaXN0W2luZGV4XV0sIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkdW1wJDEoaW5wdXQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHN0YXRlID0gbmV3IFN0YXRlKG9wdGlvbnMpO1xuXG4gIGlmICghc3RhdGUubm9SZWZzKSBnZXREdXBsaWNhdGVSZWZlcmVuY2VzKGlucHV0LCBzdGF0ZSk7XG5cbiAgdmFyIHZhbHVlID0gaW5wdXQ7XG5cbiAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgdmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKHsgJyc6IHZhbHVlIH0sICcnLCB2YWx1ZSk7XG4gIH1cblxuICBpZiAod3JpdGVOb2RlKHN0YXRlLCAwLCB2YWx1ZSwgdHJ1ZSwgdHJ1ZSkpIHJldHVybiBzdGF0ZS5kdW1wICsgJ1xcbic7XG5cbiAgcmV0dXJuICcnO1xufVxuXG52YXIgZHVtcF8xID0gZHVtcCQxO1xuXG52YXIgZHVtcGVyID0ge1xuXHRkdW1wOiBkdW1wXzFcbn07XG5cbmZ1bmN0aW9uIHJlbmFtZWQoZnJvbSwgdG8pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Z1bmN0aW9uIHlhbWwuJyArIGZyb20gKyAnIGlzIHJlbW92ZWQgaW4ganMteWFtbCA0LiAnICtcbiAgICAgICdVc2UgeWFtbC4nICsgdG8gKyAnIGluc3RlYWQsIHdoaWNoIGlzIG5vdyBzYWZlIGJ5IGRlZmF1bHQuJyk7XG4gIH07XG59XG5cblxudmFyIFR5cGUgICAgICAgICAgICAgICAgPSB0eXBlO1xudmFyIFNjaGVtYSAgICAgICAgICAgICAgPSBzY2hlbWE7XG52YXIgRkFJTFNBRkVfU0NIRU1BICAgICA9IGZhaWxzYWZlO1xudmFyIEpTT05fU0NIRU1BICAgICAgICAgPSBqc29uO1xudmFyIENPUkVfU0NIRU1BICAgICAgICAgPSBjb3JlO1xudmFyIERFRkFVTFRfU0NIRU1BICAgICAgPSBfZGVmYXVsdDtcbnZhciBsb2FkICAgICAgICAgICAgICAgID0gbG9hZGVyLmxvYWQ7XG52YXIgbG9hZEFsbCAgICAgICAgICAgICA9IGxvYWRlci5sb2FkQWxsO1xudmFyIGR1bXAgICAgICAgICAgICAgICAgPSBkdW1wZXIuZHVtcDtcbnZhciBZQU1MRXhjZXB0aW9uICAgICAgID0gZXhjZXB0aW9uO1xuXG4vLyBSZS1leHBvcnQgYWxsIHR5cGVzIGluIGNhc2UgdXNlciB3YW50cyB0byBjcmVhdGUgY3VzdG9tIHNjaGVtYVxudmFyIHR5cGVzID0ge1xuICBiaW5hcnk6ICAgIGJpbmFyeSxcbiAgZmxvYXQ6ICAgICBmbG9hdCxcbiAgbWFwOiAgICAgICBtYXAsXG4gIG51bGw6ICAgICAgX251bGwsXG4gIHBhaXJzOiAgICAgcGFpcnMsXG4gIHNldDogICAgICAgc2V0LFxuICB0aW1lc3RhbXA6IHRpbWVzdGFtcCxcbiAgYm9vbDogICAgICBib29sLFxuICBpbnQ6ICAgICAgIGludCxcbiAgbWVyZ2U6ICAgICBtZXJnZSxcbiAgb21hcDogICAgICBvbWFwLFxuICBzZXE6ICAgICAgIHNlcSxcbiAgc3RyOiAgICAgICBzdHJcbn07XG5cbi8vIFJlbW92ZWQgZnVuY3Rpb25zIGZyb20gSlMtWUFNTCAzLjAueFxudmFyIHNhZmVMb2FkICAgICAgICAgICAgPSByZW5hbWVkKCdzYWZlTG9hZCcsICdsb2FkJyk7XG52YXIgc2FmZUxvYWRBbGwgICAgICAgICA9IHJlbmFtZWQoJ3NhZmVMb2FkQWxsJywgJ2xvYWRBbGwnKTtcbnZhciBzYWZlRHVtcCAgICAgICAgICAgID0gcmVuYW1lZCgnc2FmZUR1bXAnLCAnZHVtcCcpO1xuXG52YXIganNZYW1sID0ge1xuXHRUeXBlOiBUeXBlLFxuXHRTY2hlbWE6IFNjaGVtYSxcblx0RkFJTFNBRkVfU0NIRU1BOiBGQUlMU0FGRV9TQ0hFTUEsXG5cdEpTT05fU0NIRU1BOiBKU09OX1NDSEVNQSxcblx0Q09SRV9TQ0hFTUE6IENPUkVfU0NIRU1BLFxuXHRERUZBVUxUX1NDSEVNQTogREVGQVVMVF9TQ0hFTUEsXG5cdGxvYWQ6IGxvYWQsXG5cdGxvYWRBbGw6IGxvYWRBbGwsXG5cdGR1bXA6IGR1bXAsXG5cdFlBTUxFeGNlcHRpb246IFlBTUxFeGNlcHRpb24sXG5cdHR5cGVzOiB0eXBlcyxcblx0c2FmZUxvYWQ6IHNhZmVMb2FkLFxuXHRzYWZlTG9hZEFsbDogc2FmZUxvYWRBbGwsXG5cdHNhZmVEdW1wOiBzYWZlRHVtcFxufTtcblxuZXhwb3J0IHsgQ09SRV9TQ0hFTUEsIERFRkFVTFRfU0NIRU1BLCBGQUlMU0FGRV9TQ0hFTUEsIEpTT05fU0NIRU1BLCBTY2hlbWEsIFR5cGUsIFlBTUxFeGNlcHRpb24sIGpzWWFtbCBhcyBkZWZhdWx0LCBkdW1wLCBsb2FkLCBsb2FkQWxsLCBzYWZlRHVtcCwgc2FmZUxvYWQsIHNhZmVMb2FkQWxsLCB0eXBlcyB9O1xuIiwgImltcG9ydCB7IGV4ZWNTeW5jLCBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuZnVuY3Rpb24gcnVuSW5TaGVsbChhcmdzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYHpzaCAtaWxjICdidWZvICR7YXJnc30nIDI+JjFgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQnVmb1N5bmMoYXJnczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGV4ZWNTeW5jKHJ1bkluU2hlbGwoYXJncyksIHsgZW5jb2Rpbmc6IFwidXRmLThcIiwgdGltZW91dDogMzAwMDAgfSkudHJpbSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQnVmb0FzeW5jKGFyZ3M6IHN0cmluZywgc3RkaW4/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkID0gZXhlYyhcbiAgICAgIHJ1bkluU2hlbGwoYXJncyksXG4gICAgICB7XG4gICAgICAgIGVuY29kaW5nOiBcInV0Zi04XCIsXG4gICAgICAgIHRpbWVvdXQ6IDAsIC8vIG5vIHRpbWVvdXQgXHUyMDE0IHNvbWUgb3BlcmF0aW9ucyAod29ya3RyZWUgY3JlYXRpb24sIG5wbSBpbnN0YWxsKSB0YWtlIG1pbnV0ZXNcbiAgICAgIH0sXG4gICAgICAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHN0ZG91dC50cmltKCkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHN0ZGluICE9PSB1bmRlZmluZWQgJiYgY2hpbGQuc3RkaW4pIHtcbiAgICAgIGNoaWxkLnN0ZGluLndyaXRlKHN0ZGluKTtcbiAgICAgIGNoaWxkLnN0ZGluLmVuZCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHaXRCcmFuY2goZGlyOiBzdHJpbmcpOiBzdHJpbmcge1xuICB0cnkge1xuICAgIHJldHVybiBleGVjU3luYyhgZ2l0IC1DIFwiJHtkaXJ9XCIgcmV2LXBhcnNlIC0tYWJicmV2LXJlZiBIRUFEIDI+L2Rldi9udWxsYCwge1xuICAgICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgfSkudHJpbSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJ1bmtub3duXCI7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBzcGF3blN5bmMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuXG4vKipcbiAqIFZhbGlkYXRlIHRoYXQgYSBzZXNzaW9uIElEIGlzIGEgc2FmZSBpVGVybTIgVVVJRCBiZWZvcmUgZW1iZWRkaW5nIGl0IGluXG4gKiBBcHBsZVNjcmlwdC4gaVRlcm0yIHNlc3Npb24gSURzIGFyZSBhbHdheXMgaHlwaGVuYXRlZCBVVUlEczsgYW55dGhpbmcgZWxzZVxuICogaXMgdW5leHBlY3RlZCBhbmQgY291bGQgaW5kaWNhdGUgaW5qZWN0aW9uLlxuICovXG5mdW5jdGlvbiBzYW5pdGl6ZVNlc3Npb25JZChpZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKFxuICAgICEvXlswLTlBLUZhLWZdezh9LVswLTlBLUZhLWZdezR9LVswLTlBLUZhLWZdezR9LVswLTlBLUZhLWZdezR9LVswLTlBLUZhLWZdezEyfSQvLnRlc3QoaWQpXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpVGVybTIgc2Vzc2lvbiBJRDogJHtKU09OLnN0cmluZ2lmeShpZCl9YCk7XG4gIH1cbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIFJ1biBhbiBBcHBsZVNjcmlwdCBieSBwYXNzaW5nIGl0IG9uIHN0ZGluIHRvIG9zYXNjcmlwdC5cbiAqIEF2b2lkcyBzaGVsbC1xdW90aW5nIGlzc3VlcyBhbmQgYXJndW1lbnQtbGVuZ3RoIGxpbWl0cy5cbiAqL1xuZnVuY3Rpb24gcnVuQXBwbGVTY3JpcHRTeW5jKHNjcmlwdDogc3RyaW5nLCB0aW1lb3V0TXMgPSA1MDAwKTogc3RyaW5nIHtcbiAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKFwiL3Vzci9iaW4vb3Nhc2NyaXB0XCIsIFtdLCB7XG4gICAgaW5wdXQ6IHNjcmlwdCxcbiAgICBlbmNvZGluZzogXCJ1dGYtOFwiLFxuICAgIHRpbWVvdXQ6IHRpbWVvdXRNcyxcbiAgfSk7XG4gIGlmIChyZXN1bHQuZXJyb3IpIHRocm93IHJlc3VsdC5lcnJvcjtcbiAgcmV0dXJuIChyZXN1bHQuc3Rkb3V0IGFzIHN0cmluZykgPz8gXCJcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvY3VzU2Vzc2lvbihzZXNzaW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICBjb25zdCBzYWZlSWQgPSBzYW5pdGl6ZVNlc3Npb25JZChzZXNzaW9uSWQpO1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgdGVsbCBhcHBsaWNhdGlvbiBcImlUZXJtMlwiXG4gICAgICBhY3RpdmF0ZVxuICAgICAgcmVwZWF0IHdpdGggdyBpbiB3aW5kb3dzXG4gICAgICAgIHRlbGwgd1xuICAgICAgICAgIHJlcGVhdCB3aXRoIHQgaW4gdGFic1xuICAgICAgICAgICAgdGVsbCB0XG4gICAgICAgICAgICAgIHJlcGVhdCB3aXRoIHMgaW4gc2Vzc2lvbnNcbiAgICAgICAgICAgICAgICBpZiAodW5pcXVlIElEIG9mIHMpIGlzIFwiJHtzYWZlSWR9XCIgdGhlblxuICAgICAgICAgICAgICAgICAgc2VsZWN0IHRcbiAgICAgICAgICAgICAgICAgIHNlbGVjdCBzXG4gICAgICAgICAgICAgICAgICB0ZWxsIHcgdG8gc2VsZWN0XG4gICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICBlbmQgaWZcbiAgICAgICAgICAgICAgZW5kIHJlcGVhdFxuICAgICAgICAgICAgZW5kIHRlbGxcbiAgICAgICAgICBlbmQgcmVwZWF0XG4gICAgICAgIGVuZCB0ZWxsXG4gICAgICBlbmQgcmVwZWF0XG4gICAgZW5kIHRlbGxcbiAgYDtcbiAgdHJ5IHtcbiAgICBydW5BcHBsZVNjcmlwdFN5bmMoc2NyaXB0KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gaVRlcm0yIG1heSBub3QgYmUgcnVubmluZ1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3RpdmVTZXNzaW9ucygpOiBTZXQ8c3RyaW5nPiB7XG4gIGNvbnN0IHNjcmlwdCA9IGBcbiAgICB0ZWxsIGFwcGxpY2F0aW9uIFwiaVRlcm0yXCJcbiAgICAgIHNldCBhbGxJRHMgdG8ge31cbiAgICAgIHJlcGVhdCB3aXRoIHcgaW4gd2luZG93c1xuICAgICAgICB0ZWxsIHdcbiAgICAgICAgICByZXBlYXQgd2l0aCB0IGluIHRhYnNcbiAgICAgICAgICAgIHRlbGwgdFxuICAgICAgICAgICAgICByZXBlYXQgd2l0aCBzIGluIHNlc3Npb25zXG4gICAgICAgICAgICAgICAgc2V0IGVuZCBvZiBhbGxJRHMgdG8gKHVuaXF1ZSBJRCBvZiBzKVxuICAgICAgICAgICAgICBlbmQgcmVwZWF0XG4gICAgICAgICAgICBlbmQgdGVsbFxuICAgICAgICAgIGVuZCByZXBlYXRcbiAgICAgICAgZW5kIHRlbGxcbiAgICAgIGVuZCByZXBlYXRcbiAgICAgIHNldCBBcHBsZVNjcmlwdCdzIHRleHQgaXRlbSBkZWxpbWl0ZXJzIHRvIFwiLFwiXG4gICAgICByZXR1cm4gYWxsSURzIGFzIHRleHRcbiAgICBlbmQgdGVsbFxuICBgO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJ1bkFwcGxlU2NyaXB0U3luYyhzY3JpcHQpLnRyaW0oKTtcbiAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIG5ldyBTZXQoKTtcbiAgICByZXR1cm4gbmV3IFNldChyZXN1bHQuc3BsaXQoXCIsXCIpLm1hcCgocykgPT4gcy50cmltKCkpKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG5ldyBTZXQoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJdGVybVJ1bm5pbmcoKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzdWx0ID0gc3Bhd25TeW5jKFwicGdyZXBcIiwgW1wiLXhcIiwgXCJpVGVybTJcIl0sIHsgZW5jb2Rpbmc6IFwidXRmLThcIiB9KTtcbiAgICByZXR1cm4gKHJlc3VsdC5zdGRvdXQgYXMgc3RyaW5nKS50cmltKCkubGVuZ3RoID4gMDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBQUEsY0FZTztBOzs7Ozs7QUNaUCxJQUFJLE1BQU0sT0FBTyxVQUFVO0FBRXBCLFNBQVMsT0FBTyxLQUFLLEtBQUs7QUFDaEMsTUFBSSxNQUFNO0FBQ1YsTUFBSSxRQUFRLElBQUssUUFBTztBQUV4QixNQUFJLE9BQU8sUUFBUSxPQUFLLElBQUksaUJBQWlCLElBQUksYUFBYTtBQUM3RCxRQUFJLFNBQVMsS0FBTSxRQUFPLElBQUksUUFBUSxNQUFNLElBQUksUUFBUTtBQUN4RCxRQUFJLFNBQVMsT0FBUSxRQUFPLElBQUksU0FBUyxNQUFNLElBQUksU0FBUztBQUU1RCxRQUFJLFNBQVMsT0FBTztBQUNuQixXQUFLLE1BQUksSUFBSSxZQUFZLElBQUksUUFBUTtBQUNwQyxlQUFPLFNBQVMsT0FBTyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFO0FBQUEsTUFDNUM7QUFDQSxhQUFPLFFBQVE7QUFBQSxJQUNoQjtBQUVBLFFBQUksQ0FBQyxRQUFRLE9BQU8sUUFBUSxVQUFVO0FBQ3JDLFlBQU07QUFDTixXQUFLLFFBQVEsS0FBSztBQUNqQixZQUFJLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUcsUUFBTztBQUNqRSxZQUFJLEVBQUUsUUFBUSxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxFQUFHLFFBQU87QUFBQSxNQUM3RDtBQUNBLGFBQU8sT0FBTyxLQUFLLEdBQUcsRUFBRSxXQUFXO0FBQUEsSUFDcEM7QUFBQSxFQUNEO0FBRUEsU0FBTyxRQUFRLE9BQU8sUUFBUTtBQUMvQjtBOzs7Ozs7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QUFDO0FBQUE7QUFBQSxZQUNDLE9BQU07QUFBQSxZQUNOLE1BQU0saUJBQUs7QUFBQSxZQUNYLE9BQU8sbUJBQU8sTUFBTTtBQUFBLFlBQ3BCLFVBQVUsRUFBRSxXQUFXLENBQUMsT0FBTyxPQUFPLEdBQUcsS0FBSyxJQUFJO0FBQUEsWUFDbEQsVUFBVSxZQUFZO0FBQ3BCLGtCQUNFLFVBQU0sMEJBQWE7QUFBQSxnQkFDakIsT0FBTztBQUFBLGdCQUNQLFNBQVMsNkNBQTZDLFFBQVEsSUFBSSxZQUFZLFlBQVk7QUFBQSxnQkFDMUYsZUFBZSxFQUFFLE9BQU8sVUFBVSxPQUFPLGtCQUFNLFlBQVksWUFBWTtBQUFBLGNBQ3pFLENBQUMsR0FDRDtBQUNBLDBCQUFNLHVCQUFVLEVBQUUsT0FBTyxrQkFBTSxNQUFNLFVBQVUsT0FBTyxzQkFBc0IsQ0FBQztBQUM3RSxvQkFBSTtBQUVGLHdCQUFNLGFBQWEsSUFBSSxZQUFZLG1CQUFtQixRQUFRLElBQUksSUFBSSxLQUFLO0FBQzNFLDRCQUFNLHVCQUFVLEVBQUUsT0FBTyxrQkFBTSxNQUFNLFNBQVMsT0FBTyxrQkFBa0IsQ0FBQztBQUN4RSw2QkFBVztBQUFBLGdCQUNiLFNBQVMsR0FBRztBQUNWLDRCQUFNLHVCQUFVO0FBQUEsb0JBQ2QsT0FBTyxrQkFBTSxNQUFNO0FBQUEsb0JBQ25CLE9BQU87QUFBQSxvQkFDUCxTQUFTLE9BQU8sQ0FBQztBQUFBLGtCQUNuQixDQUFDO0FBQUEsZ0JBQ0g7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBO0FBQUEsUUFDRixHQUNGO0FBQUEsU0FDRjtBQUFBO0FBQUEsRUFFSjtBQUVKOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfYXBpIiwgIiRoZ1VXMSR1c2VSZWYiLCAiJGhnVVcxJHVzZU1lbW8iLCAiJGhnVVcxJHNob3dUb2FzdCIsICIkaGdVVzEkVG9hc3QiLCAiJGhnVVcxJHJlYWRGaWxlU3luYyIsICIkaGdVVzEkam9pbiIsICIkaGdVVzEkZW52aXJvbm1lbnQiLCAiJGhnVVcxJENsaXBib2FyZCIsICIkaGdVVzEkb3BlbiIsICJzZXQiLCAiJGhnVVcxJHVzZVN0YXRlIiwgIiRoZ1VXMSR1c2VDYWxsYmFjayIsICJhcmdzIiwgIiRoZ1VXMSRMYXVuY2hUeXBlIiwgIm9wdGlvbnMiLCAiJGhnVVcxJHVzZUVmZmVjdCIsICJzdHIiLCAidHlwZSIsICJib29sIiwgIm1hcCIsICIkaGdVVzEkbm9kZWNyeXB0byIsICIkaGdVVzEkQ2FjaGUiLCAiJGhnVVcxJHVzZVN5bmNFeHRlcm5hbFN0b3JlIiwgInBhZ2luYXRpb24iLCAiZXhjZXB0aW9uIiwgIm1hcCIsICJzY2hlbWEiLCAidHlwZSIsICJleHRlbmQiLCAic3RyIiwgInN0cmluZyIsICJpbXBvcnRfY2hpbGRfcHJvY2VzcyIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
