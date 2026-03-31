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
function loadSession(projectAlias, sessionName, activeSessions) {
  const sessionDir = (0, import_path.join)(SESSIONS_DIR, projectAlias, sessionName);
  const sessionFile = (0, import_path.join)(sessionDir, "session.yaml");
  if (!(0, import_fs.existsSync)(sessionFile)) return void 0;
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
  if (!(0, import_fs.existsSync)(projectSessionsDir)) return [];
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
      if (!(0, import_fs.statSync)(fullPath).isDirectory()) continue;
    } catch {
      continue;
    }
    const session = loadSession(projectAlias, entry, activeSessions);
    if (session) sessions.push(session);
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

// src/lib/iterm.ts
var import_child_process = require("child_process");
function sanitizeSessionId(id) {
  if (!/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(id)) {
    throw new Error(`Invalid iTerm2 session ID: ${JSON.stringify(id)}`);
  }
  return id;
}
function runAppleScriptSync(script, timeoutMs = 5e3) {
  const result = (0, import_child_process.spawnSync)("/usr/bin/osascript", [], {
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

// src/lib/exec.ts
var import_child_process2 = require("child_process");
function runInShell(args) {
  return `zsh -ilc 'bufo ${args}' 2>&1`;
}
function runBufoAsync(args, stdin) {
  return new Promise((resolve, reject) => {
    const child = (0, import_child_process2.exec)(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2xpc3Qtc2Vzc2lvbnMudHN4IiwgIi4uL25vZGVfbW9kdWxlcy9kZXF1YWwvbGl0ZS9pbmRleC5tanMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2luZGV4LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VQcm9taXNlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VEZWVwTWVtby50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTGF0ZXN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9zaG93RmFpbHVyZVRvYXN0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VDYWNoZWRTdGF0ZS50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaGVscGVycy50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy90eXBlLWhhc2hlci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQ2FjaGVkUHJvbWlzZS50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlRmV0Y2gudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2ZldGNoLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VFeGVjLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3NpZ25hbC1leGl0LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VTdHJlYW1KU09OLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy92ZW5kb3JzL3N0cmVhbS1jaGFpbi50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdmVuZG9ycy9zdHJlYW0tanNvbi50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlU1FMLnRzeCIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvc3FsLXV0aWxzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy91c2VGb3JtLnRzeCIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlQUkudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3VzZUZyZWNlbmN5U29ydGluZy50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvdXNlTG9jYWxTdG9yYWdlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2luZGV4LnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL2F2YXRhci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9jb2xvci50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvaWNvbi9mYXZpY29uLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9pY29uL3Byb2dyZXNzLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9pbmRleC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvb2F1dGgvT0F1dGhTZXJ2aWNlLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9vYXV0aC9wcm92aWRlcnMudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL29hdXRoL3dpdGhBY2Nlc3NUb2tlbi50c3giLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL2NyZWF0ZURlZXBsaW5rLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9leGVjdXRlU1FMLnRzIiwgIi4uL25vZGVfbW9kdWxlcy9AcmF5Y2FzdC91dGlscy9kaXN0L3NyYy9ydW4tYXBwbGVzY3JpcHQudHMiLCAiLi4vbm9kZV9tb2R1bGVzL0ByYXljYXN0L3V0aWxzL2Rpc3Qvc3JjL3J1bi1wb3dlcnNoZWxsLXNjcmlwdC50cyIsICIuLi9ub2RlX21vZHVsZXMvQHJheWNhc3QvdXRpbHMvZGlzdC9zcmMvY2FjaGUudHMiLCAiLi4vc3JjL2xpYi9jb25maWcudHMiLCAiLi4vbm9kZV9tb2R1bGVzL2pzLXlhbWwvZGlzdC9qcy15YW1sLm1qcyIsICIuLi9zcmMvbGliL2l0ZXJtLnRzIiwgIi4uL3NyYy9saWIvZXhlYy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcbiAgTGlzdCxcbiAgQWN0aW9uUGFuZWwsXG4gIEFjdGlvbixcbiAgSWNvbixcbiAgQ29sb3IsXG4gIENsaXBib2FyZCxcbiAgc2hvd1RvYXN0LFxuICBUb2FzdCxcbiAgY29uZmlybUFsZXJ0LFxuICBBbGVydCxcbiAgY2xvc2VNYWluV2luZG93LFxufSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG5pbXBvcnQgeyBidWZvRXhpc3RzLCBnZXRBbGxTZXNzaW9ucyB9IGZyb20gXCIuL2xpYi9jb25maWdcIjtcbmltcG9ydCB7IGZvY3VzU2Vzc2lvbiB9IGZyb20gXCIuL2xpYi9pdGVybVwiO1xuaW1wb3J0IHsgcnVuQnVmb0FzeW5jIH0gZnJvbSBcIi4vbGliL2V4ZWNcIjtcbmltcG9ydCB7IGdldEFjdGl2ZVNlc3Npb25zIH0gZnJvbSBcIi4vbGliL2l0ZXJtXCI7XG5pbXBvcnQgdHlwZSB7IEJ1Zm9TZXNzaW9uIH0gZnJvbSBcIi4vbGliL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RTZXNzaW9ucygpIHtcbiAgaWYgKCFidWZvRXhpc3RzKCkpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPExpc3Q+XG4gICAgICAgIDxMaXN0LkVtcHR5Vmlld1xuICAgICAgICAgIHRpdGxlPVwiQnVmbyBOb3QgQ29uZmlndXJlZFwiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJSdW4gYGJ1Zm8gaW5pdGAgaW4geW91ciB0ZXJtaW5hbCB0byBzZXQgdXAgYnVmby5cIlxuICAgICAgICAgIGljb249e0ljb24uV2FybmluZ31cbiAgICAgICAgLz5cbiAgICAgIDwvTGlzdD5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIHJldmFsaWRhdGUgfSA9IHVzZUNhY2hlZFByb21pc2UoXG4gICAgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgYWN0aXZlU2Vzc2lvbnMgPSBnZXRBY3RpdmVTZXNzaW9ucygpO1xuICAgICAgcmV0dXJuIGdldEFsbFNlc3Npb25zKGFjdGl2ZVNlc3Npb25zKTtcbiAgICB9LFxuICAgIFtdLFxuICAgIHsga2VlcFByZXZpb3VzRGF0YTogdHJ1ZSB9XG4gICk7XG5cbiAgY29uc3QgZ3JvdXBzID0gZGF0YSA/PyBbXTtcbiAgY29uc3QgdG90YWxTZXNzaW9ucyA9IGdyb3Vwcy5yZWR1Y2UoKHN1bSwgZykgPT4gc3VtICsgZy5zZXNzaW9ucy5sZW5ndGgsIDApO1xuXG4gIC8vIFNvcnQgZWFjaCBncm91cDogYWN0aXZlIHNlc3Npb25zIGZpcnN0XG4gIGNvbnN0IHNvcnRlZEdyb3VwcyA9IGdyb3Vwcy5tYXAoKGcpID0+ICh7XG4gICAgLi4uZyxcbiAgICBzZXNzaW9uczogWy4uLmcuc2Vzc2lvbnNdLnNvcnQoKGEsIGIpID0+IE51bWJlcihiLmFjdGl2ZSkgLSBOdW1iZXIoYS5hY3RpdmUpKSxcbiAgfSkpO1xuXG4gIC8vIFByb2plY3RzIHdpdGggYW55IGFjdGl2ZSBzZXNzaW9ucyBmaXJzdFxuICBzb3J0ZWRHcm91cHMuc29ydChcbiAgICAoYSwgYikgPT5cbiAgICAgIE51bWJlcihiLnNlc3Npb25zLnNvbWUoKHMpID0+IHMuYWN0aXZlKSkgLSBOdW1iZXIoYS5zZXNzaW9ucy5zb21lKChzKSA9PiBzLmFjdGl2ZSkpXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gc2VhcmNoQmFyUGxhY2Vob2xkZXI9XCJGaWx0ZXIgc2Vzc2lvbnMuLi5cIj5cbiAgICAgIHtncm91cHMubGVuZ3RoID09PSAwICYmICFpc0xvYWRpbmcgJiYgKFxuICAgICAgICA8TGlzdC5FbXB0eVZpZXdcbiAgICAgICAgICB0aXRsZT1cIk5vIFNlc3Npb25zIEZvdW5kXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIlN0YXJ0IGEgc2Vzc2lvbiB3aXRoIGBidWZvIHNlc3Npb24gc3RhcnQgPG5hbWU+YCBvciB1c2UgTmV3IFNlc3Npb24uXCJcbiAgICAgICAgICBpY29uPXtJY29uLkRlc2t0b3B9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3NvcnRlZEdyb3Vwcy5tYXAoKHsgcHJvamVjdEFsaWFzLCBzZXNzaW9ucyB9KSA9PiAoXG4gICAgICAgIDxMaXN0LlNlY3Rpb25cbiAgICAgICAgICBrZXk9e3Byb2plY3RBbGlhc31cbiAgICAgICAgICB0aXRsZT17YEAke3Byb2plY3RBbGlhc31gfVxuICAgICAgICAgIHN1YnRpdGxlPXtgJHtzZXNzaW9ucy5sZW5ndGh9IHNlc3Npb24ocylgfVxuICAgICAgICA+XG4gICAgICAgICAge3Nlc3Npb25zLm1hcCgoc2Vzc2lvbikgPT4gKFxuICAgICAgICAgICAgPFNlc3Npb25JdGVtXG4gICAgICAgICAgICAgIGtleT17YCR7cHJvamVjdEFsaWFzfS0ke3Nlc3Npb24ubmFtZX1gfVxuICAgICAgICAgICAgICBzZXNzaW9uPXtzZXNzaW9ufVxuICAgICAgICAgICAgICBwcm9qZWN0QWxpYXM9e3Byb2plY3RBbGlhc31cbiAgICAgICAgICAgICAgcmV2YWxpZGF0ZT17cmV2YWxpZGF0ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvTGlzdC5TZWN0aW9uPlxuICAgICAgKSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuXG5mdW5jdGlvbiBTZXNzaW9uSXRlbSh7XG4gIHNlc3Npb24sXG4gIHByb2plY3RBbGlhcyxcbiAgcmV2YWxpZGF0ZSxcbn06IHtcbiAgc2Vzc2lvbjogQnVmb1Nlc3Npb247XG4gIHByb2plY3RBbGlhczogc3RyaW5nO1xuICByZXZhbGlkYXRlOiAoKSA9PiB2b2lkO1xufSkge1xuICBjb25zdCBzdWJ0aXRsZSA9IHNlc3Npb24uc3VtbWFyeSB8fCBzZXNzaW9uLnR5cGU7XG5cbiAgY29uc3QgYWNjZXNzb3JpZXM6IExpc3QuSXRlbS5BY2Nlc3NvcnlbXSA9IFtdO1xuICBpZiAoc2Vzc2lvbi5hY3RpdmUpIHtcbiAgICBhY2Nlc3Nvcmllcy5wdXNoKHsgaWNvbjogeyBzb3VyY2U6IEljb24uQ2lyY2xlLCB0aW50Q29sb3I6IENvbG9yLkdyZWVuIH0sIHRvb2x0aXA6IFwiQWN0aXZlXCIgfSk7XG4gIH1cbiAgaWYgKHNlc3Npb24udHlwZSA9PT0gXCJyZXZpZXdcIikge1xuICAgIGFjY2Vzc29yaWVzLnB1c2goeyB0YWc6IHsgdmFsdWU6IFwiUkVWSUVXXCIsIGNvbG9yOiBDb2xvci5CbHVlIH0gfSk7XG4gIH0gZWxzZSBpZiAoc2Vzc2lvbi50eXBlID09PSBcImNvdXJ0XCIpIHtcbiAgICBhY2Nlc3Nvcmllcy5wdXNoKHsgdGFnOiB7IHZhbHVlOiBcIkNPVVJUXCIsIGNvbG9yOiBDb2xvci5QdXJwbGUgfSB9KTtcbiAgfVxuICBpZiAoc2Vzc2lvbi5oYXNSZXZpZXdPdXRwdXQpIHtcbiAgICBhY2Nlc3Nvcmllcy5wdXNoKHsgdGFnOiB7IHZhbHVlOiBcInNhdmVkXCIsIGNvbG9yOiBDb2xvci5HcmVlbiB9IH0pO1xuICB9XG5cbiAgY29uc3QgaWNvbiA9IHNlc3Npb24uYWN0aXZlXG4gICAgPyB7IHNvdXJjZTogSWNvbi5UZXJtaW5hbCwgdGludENvbG9yOiBDb2xvci5HcmVlbiB9XG4gICAgOiB7IHNvdXJjZTogSWNvbi5UZXJtaW5hbCwgdGludENvbG9yOiBDb2xvci5TZWNvbmRhcnlUZXh0IH07XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdC5JdGVtXG4gICAgICB0aXRsZT17c2Vzc2lvbi5uYW1lfVxuICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgaWNvbj17aWNvbn1cbiAgICAgIGFjY2Vzc29yaWVzPXthY2Nlc3Nvcmllc31cbiAgICAgIGFjdGlvbnM9e1xuICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgPEFjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgICB7c2Vzc2lvbi5hY3RpdmUgJiYgc2Vzc2lvbi5sYXlvdXQ/LnRlcm1pbmFsX3NpZCAmJiAoXG4gICAgICAgICAgICAgIDxBY3Rpb25cbiAgICAgICAgICAgICAgICB0aXRsZT1cIkZvY3VzIFNlc3Npb25cIlxuICAgICAgICAgICAgICAgIGljb249e0ljb24uRXllfVxuICAgICAgICAgICAgICAgIG9uQWN0aW9uPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBmb2N1c1Nlc3Npb24oc2Vzc2lvbi5sYXlvdXQhLnRlcm1pbmFsX3NpZCk7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBjbG9zZU1haW5XaW5kb3coKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxBY3Rpb25cbiAgICAgICAgICAgICAgdGl0bGU9XCJSZXN1bWUgU2Vzc2lvblwiXG4gICAgICAgICAgICAgIGljb249e0ljb24uUGxheX1cbiAgICAgICAgICAgICAgc2hvcnRjdXQ9e3sgbW9kaWZpZXJzOiBbXCJjbWRcIl0sIGtleTogXCJvXCIgfX1cbiAgICAgICAgICAgICAgb25BY3Rpb249e2FzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuQW5pbWF0ZWQsIHRpdGxlOiBcIlJlc3VtaW5nIHNlc3Npb24uLi5cIiB9KTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgcnVuQnVmb0FzeW5jKGBAJHtwcm9qZWN0QWxpYXN9IHNlc3Npb24gcmVzdW1lICR7c2Vzc2lvbi5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIlNlc3Npb24gcmVzdW1lZFwiIH0pO1xuICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJGYWlsZWQgdG8gcmVzdW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFN0cmluZyhlKSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICAgIDxBY3Rpb25QYW5lbC5TZWN0aW9uPlxuICAgICAgICAgICAgPEFjdGlvblxuICAgICAgICAgICAgICB0aXRsZT1cIkNvcHkgU2Vzc2lvbiBOYW1lXCJcbiAgICAgICAgICAgICAgaWNvbj17SWNvbi5DbGlwYm9hcmR9XG4gICAgICAgICAgICAgIHNob3J0Y3V0PXt7IG1vZGlmaWVyczogW1wiY21kXCJdLCBrZXk6IFwiYlwiIH19XG4gICAgICAgICAgICAgIG9uQWN0aW9uPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgQ2xpcGJvYXJkLmNvcHkoc2Vzc2lvbi5uYW1lKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBzaG93VG9hc3QoeyBzdHlsZTogVG9hc3QuU3R5bGUuU3VjY2VzcywgdGl0bGU6IFwiU2Vzc2lvbiBuYW1lIGNvcGllZFwiIH0pO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgPEFjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgIHRpdGxlPVwiRGVsZXRlIFNlc3Npb25cIlxuICAgICAgICAgICAgICBpY29uPXtJY29uLlhNYXJrQ2lyY2xlfVxuICAgICAgICAgICAgICBzdHlsZT17QWN0aW9uLlN0eWxlLkRlc3RydWN0aXZlfVxuICAgICAgICAgICAgICBzaG9ydGN1dD17eyBtb2RpZmllcnM6IFtcImNtZFwiLCBcInNoaWZ0XCJdLCBrZXk6IFwiZFwiIH19XG4gICAgICAgICAgICAgIG9uQWN0aW9uPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgYXdhaXQgY29uZmlybUFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIFNlc3Npb24/XCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBUaGlzIHdpbGwgcGVybWFuZW50bHkgZGVsZXRlIHRoZSBzZXNzaW9uIFwiJHtzZXNzaW9uLm5hbWV9XCIgdW5kZXIgQCR7cHJvamVjdEFsaWFzfS4gVGhpcyBjYW5ub3QgYmUgdW5kb25lLmAsXG4gICAgICAgICAgICAgICAgICAgIHByaW1hcnlBY3Rpb246IHsgdGl0bGU6IFwiRGVsZXRlXCIsIHN0eWxlOiBBbGVydC5BY3Rpb25TdHlsZS5EZXN0cnVjdGl2ZSB9LFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7IHN0eWxlOiBUb2FzdC5TdHlsZS5BbmltYXRlZCwgdGl0bGU6IFwiRGVsZXRpbmcgc2Vzc2lvbi4uLlwiIH0pO1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyBcInlcXG5cIiBhcyBzdGRpbiB0byBieXBhc3MgdGhlIGludGVyYWN0aXZlIHkvTiBjb25maXJtYXRpb24gcHJvbXB0IGluIHRoZSBDTElcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcnVuQnVmb0FzeW5jKGBAJHtwcm9qZWN0QWxpYXN9IHNlc3Npb24gZGVsZXRlICR7c2Vzc2lvbi5uYW1lfWAsIFwieVxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2hvd1RvYXN0KHsgc3R5bGU6IFRvYXN0LlN0eWxlLlN1Y2Nlc3MsIHRpdGxlOiBcIlNlc3Npb24gZGVsZXRlZFwiIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFRvYXN0LlN0eWxlLkZhaWx1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlIGZhaWxlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFN0cmluZyhlKSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsLlNlY3Rpb24+XG4gICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICB9XG4gICAgLz5cbiAgKTtcbn1cbiIsICJ2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlcXVhbChmb28sIGJhcikge1xuXHR2YXIgY3RvciwgbGVuO1xuXHRpZiAoZm9vID09PSBiYXIpIHJldHVybiB0cnVlO1xuXG5cdGlmIChmb28gJiYgYmFyICYmIChjdG9yPWZvby5jb25zdHJ1Y3RvcikgPT09IGJhci5jb25zdHJ1Y3Rvcikge1xuXHRcdGlmIChjdG9yID09PSBEYXRlKSByZXR1cm4gZm9vLmdldFRpbWUoKSA9PT0gYmFyLmdldFRpbWUoKTtcblx0XHRpZiAoY3RvciA9PT0gUmVnRXhwKSByZXR1cm4gZm9vLnRvU3RyaW5nKCkgPT09IGJhci50b1N0cmluZygpO1xuXG5cdFx0aWYgKGN0b3IgPT09IEFycmF5KSB7XG5cdFx0XHRpZiAoKGxlbj1mb28ubGVuZ3RoKSA9PT0gYmFyLmxlbmd0aCkge1xuXHRcdFx0XHR3aGlsZSAobGVuLS0gJiYgZGVxdWFsKGZvb1tsZW5dLCBiYXJbbGVuXSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGxlbiA9PT0gLTE7XG5cdFx0fVxuXG5cdFx0aWYgKCFjdG9yIHx8IHR5cGVvZiBmb28gPT09ICdvYmplY3QnKSB7XG5cdFx0XHRsZW4gPSAwO1xuXHRcdFx0Zm9yIChjdG9yIGluIGZvbykge1xuXHRcdFx0XHRpZiAoaGFzLmNhbGwoZm9vLCBjdG9yKSAmJiArK2xlbiAmJiAhaGFzLmNhbGwoYmFyLCBjdG9yKSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZiAoIShjdG9yIGluIGJhcikgfHwgIWRlcXVhbChmb29bY3Rvcl0sIGJhcltjdG9yXSkpIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBPYmplY3Qua2V5cyhiYXIpLmxlbmd0aCA9PT0gbGVuO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBmb28gIT09IGZvbyAmJiBiYXIgIT09IGJhcjtcbn1cbiIsICIvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIm5vZGVcIiAvPlxuXG5leHBvcnQgeyB1c2VQcm9taXNlIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuZXhwb3J0IHsgdXNlQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VDYWNoZWRTdGF0ZVwiO1xuZXhwb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSB9IGZyb20gXCIuL3VzZUNhY2hlZFByb21pc2VcIjtcbmV4cG9ydCB7IHVzZUZldGNoIH0gZnJvbSBcIi4vdXNlRmV0Y2hcIjtcbmV4cG9ydCB7IHVzZUV4ZWMgfSBmcm9tIFwiLi91c2VFeGVjXCI7XG5leHBvcnQgeyB1c2VTdHJlYW1KU09OIH0gZnJvbSBcIi4vdXNlU3RyZWFtSlNPTlwiO1xuZXhwb3J0IHsgdXNlU1FMIH0gZnJvbSBcIi4vdXNlU1FMXCI7XG5leHBvcnQgeyB1c2VGb3JtLCBGb3JtVmFsaWRhdGlvbiB9IGZyb20gXCIuL3VzZUZvcm1cIjtcbmV4cG9ydCB7IHVzZUFJIH0gZnJvbSBcIi4vdXNlQUlcIjtcbmV4cG9ydCB7IHVzZUZyZWNlbmN5U29ydGluZyB9IGZyb20gXCIuL3VzZUZyZWNlbmN5U29ydGluZ1wiO1xuZXhwb3J0IHsgdXNlTG9jYWxTdG9yYWdlIH0gZnJvbSBcIi4vdXNlTG9jYWxTdG9yYWdlXCI7XG5cbmV4cG9ydCB7IGdldEF2YXRhckljb24sIGdldEZhdmljb24sIGdldFByb2dyZXNzSWNvbiB9IGZyb20gXCIuL2ljb25cIjtcblxuZXhwb3J0IHsgT0F1dGhTZXJ2aWNlLCB3aXRoQWNjZXNzVG9rZW4sIGdldEFjY2Vzc1Rva2VuIH0gZnJvbSBcIi4vb2F1dGhcIjtcblxuZXhwb3J0IHsgY3JlYXRlRGVlcGxpbmssIGNyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rLCBjcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmssIERlZXBsaW5rVHlwZSB9IGZyb20gXCIuL2NyZWF0ZURlZXBsaW5rXCI7XG5leHBvcnQgeyBleGVjdXRlU1FMIH0gZnJvbSBcIi4vZXhlY3V0ZVNRTFwiO1xuZXhwb3J0IHsgcnVuQXBwbGVTY3JpcHQgfSBmcm9tIFwiLi9ydW4tYXBwbGVzY3JpcHRcIjtcbmV4cG9ydCB7IHJ1blBvd2VyU2hlbGxTY3JpcHQgfSBmcm9tIFwiLi9ydW4tcG93ZXJzaGVsbC1zY3JpcHRcIjtcbmV4cG9ydCB7IHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiLi9zaG93RmFpbHVyZVRvYXN0XCI7XG5leHBvcnQgeyB3aXRoQ2FjaGUgfSBmcm9tIFwiLi9jYWNoZVwiO1xuXG5leHBvcnQgdHlwZSB7IFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuZXhwb3J0IHR5cGUgeyBDYWNoZWRQcm9taXNlT3B0aW9ucyB9IGZyb20gXCIuL3VzZUNhY2hlZFByb21pc2VcIjtcbmV4cG9ydCB0eXBlIHtcbiAgT0F1dGhTZXJ2aWNlT3B0aW9ucyxcbiAgT25BdXRob3JpemVQYXJhbXMsXG4gIFdpdGhBY2Nlc3NUb2tlbkNvbXBvbmVudE9yRm4sXG4gIFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zLFxuICBQcm92aWRlck9wdGlvbnMsXG59IGZyb20gXCIuL29hdXRoXCI7XG5leHBvcnQgdHlwZSB7IEFzeW5jU3RhdGUsIE11dGF0ZVByb21pc2UgfSBmcm9tIFwiLi90eXBlc1wiO1xuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIFJlZk9iamVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZW52aXJvbm1lbnQsIExhdW5jaFR5cGUsIFRvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgdXNlRGVlcE1lbW8gfSBmcm9tIFwiLi91c2VEZWVwTWVtb1wiO1xuaW1wb3J0IHtcbiAgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlLFxuICBNdXRhdGVQcm9taXNlLFxuICBVc2VQcm9taXNlUmV0dXJuVHlwZSxcbiAgQXN5bmNTdGF0ZSxcbiAgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLFxuICBVbndyYXBSZXR1cm4sXG4gIFBhZ2luYXRpb25PcHRpb25zLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIi4vc2hvd0ZhaWx1cmVUb2FzdFwiO1xuXG5leHBvcnQgdHlwZSBQcm9taXNlT3B0aW9uczxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlIHwgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlPiA9IHtcbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIGFuIGBBYm9ydENvbnRyb2xsZXJgIHRvIGNhbmNlbCBhIHByZXZpb3VzIGNhbGwgd2hlbiB0cmlnZ2VyaW5nIGEgbmV3IG9uZVxuICAgKi9cbiAgYWJvcnRhYmxlPzogUmVmT2JqZWN0PEFib3J0Q29udHJvbGxlciB8IG51bGwgfCB1bmRlZmluZWQ+O1xuICAvKipcbiAgICogV2hldGhlciB0byBhY3R1YWxseSBleGVjdXRlIHRoZSBmdW5jdGlvbiBvciBub3QuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciBjYXNlcyB3aGVyZSBvbmUgb2YgdGhlIGZ1bmN0aW9uJ3MgYXJndW1lbnRzIGRlcGVuZHMgb24gc29tZXRoaW5nIHRoYXRcbiAgICogbWlnaHQgbm90IGJlIGF2YWlsYWJsZSByaWdodCBhd2F5IChmb3IgZXhhbXBsZSwgZGVwZW5kcyBvbiBzb21lIHVzZXIgaW5wdXRzKS4gQmVjYXVzZSBSZWFjdCByZXF1aXJlc1xuICAgKiBldmVyeSBob29rcyB0byBiZSBkZWZpbmVkIG9uIHRoZSByZW5kZXIsIHRoaXMgZmxhZyBlbmFibGVzIHlvdSB0byBkZWZpbmUgdGhlIGhvb2sgcmlnaHQgYXdheSBidXRcbiAgICogd2FpdCB1dGlsIHlvdSBoYXZlIGFsbCB0aGUgYXJndW1lbnRzIHJlYWR5IHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uLlxuICAgKi9cbiAgZXhlY3V0ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBPcHRpb25zIGZvciB0aGUgZ2VuZXJpYyBmYWlsdXJlIHRvYXN0LlxuICAgKiBJdCBhbGxvd3MgeW91IHRvIGN1c3RvbWl6ZSB0aGUgdGl0bGUsIG1lc3NhZ2UsIGFuZCBwcmltYXJ5IGFjdGlvbiBvZiB0aGUgZmFpbHVyZSB0b2FzdC5cbiAgICovXG4gIGZhaWx1cmVUb2FzdE9wdGlvbnM/OiBQYXJ0aWFsPFBpY2s8VG9hc3QuT3B0aW9ucywgXCJ0aXRsZVwiIHwgXCJwcmltYXJ5QWN0aW9uXCIgfCBcIm1lc3NhZ2VcIj4+O1xuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gYW4gZXhlY3V0aW9uIGZhaWxzLiBCeSBkZWZhdWx0IGl0IHdpbGwgbG9nIHRoZSBlcnJvciBhbmQgc2hvd1xuICAgKiBhIGdlbmVyaWMgZmFpbHVyZSB0b2FzdC5cbiAgICovXG4gIG9uRXJyb3I/OiAoZXJyb3I6IEVycm9yKSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV4ZWN1dGlvbiBzdWNjZWVkcy5cbiAgICovXG4gIG9uRGF0YT86IChkYXRhOiBVbndyYXBSZXR1cm48VD4sIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uT3B0aW9uczxVbndyYXBSZXR1cm48VD4+KSA9PiB2b2lkIHwgUHJvbWlzZTx2b2lkPjtcbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIGFuIGV4ZWN1dGlvbiB3aWxsIHN0YXJ0XG4gICAqL1xuICBvbldpbGxFeGVjdXRlPzogKHBhcmFtZXRlcnM6IFBhcmFtZXRlcnM8VD4pID0+IHZvaWQ7XG59O1xuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgaW4gYW5vdGhlciBmdW5jdGlvbiwgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZ1bmN0aW9uLlxuICpcbiAqIEByZW1hcmsgVGhpcyBvdmVybG9hZCBzaG91bGQgYmUgdXNlZCB3aGVuIHdvcmtpbmcgd2l0aCBwYWdpbmF0ZWQgZGF0YSBzb3VyY2VzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHNldFRpbWVvdXQgfSBmcm9tIFwibm9kZTp0aW1lcnMvcHJvbWlzZXNcIjtcbiAqIGltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4gKiBpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlUHJvbWlzZSB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICpcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHBhZ2luYXRpb24gfSA9IHVzZVByb21pc2UoXG4gKiAgICAgKHNlYXJjaFRleHQ6IHN0cmluZykgPT4gYXN5bmMgKG9wdGlvbnM6IHsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAqICAgICAgIGF3YWl0IHNldFRpbWVvdXQoMjAwKTtcbiAqICAgICAgIGNvbnN0IG5ld0RhdGEgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNSB9LCAoX3YsIGluZGV4KSA9PiAoe1xuICogICAgICAgICBpbmRleCxcbiAqICAgICAgICAgcGFnZTogb3B0aW9ucy5wYWdlLFxuICogICAgICAgICB0ZXh0OiBzZWFyY2hUZXh0LFxuICogICAgICAgfSkpO1xuICogICAgICAgcmV0dXJuIHsgZGF0YTogbmV3RGF0YSwgaGFzTW9yZTogb3B0aW9ucy5wYWdlIDwgMTAgfTtcbiAqICAgICB9LFxuICogICAgIFtzZWFyY2hUZXh0XVxuICogICApO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gb25TZWFyY2hUZXh0Q2hhbmdlPXtzZXRTZWFyY2hUZXh0fSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufT5cbiAqICAgICAgIHtkYXRhPy5tYXAoKGl0ZW0pID0+IChcbiAqICAgICAgICAgPExpc3QuSXRlbVxuICogICAgICAgICAgIGtleT17YCR7aXRlbS5wYWdlfSAke2l0ZW0uaW5kZXh9ICR7aXRlbS50ZXh0fWB9XG4gKiAgICAgICAgICAgdGl0bGU9e2BQYWdlICR7aXRlbS5wYWdlfSBJdGVtICR7aXRlbS5pbmRleH1gfVxuICogICAgICAgICAgIHN1YnRpdGxlPXtpdGVtLnRleHR9XG4gKiAgICAgICAgIC8+XG4gKiAgICAgICApKX1cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U8W10+PihcbiAgZm46IFQsXG4pOiBVc2VQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZT4oXG4gIGZuOiBULFxuICBhcmdzOiBQYXJhbWV0ZXJzPFQ+LFxuICBvcHRpb25zPzogUHJvbWlzZU9wdGlvbnM8VD4sXG4pOiBVc2VQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4+O1xuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZ1bmN0aW9uLlxuICpcbiAqIEByZW1hcmsgVGhlIGZ1bmN0aW9uIGlzIGFzc3VtZWQgdG8gYmUgY29uc3RhbnQgKGVnLiBjaGFuZ2luZyBpdCB3b24ndCB0cmlnZ2VyIGEgcmV2YWxpZGF0aW9uKS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyB1c2VQcm9taXNlIH0gZnJvbSAnQHJheWNhc3QvdXRpbHMnO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KCk7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCByZXZhbGlkYXRlIH0gPSB1c2VQcm9taXNlKGFzeW5jICh1cmw6IHN0cmluZykgPT4ge1xuICogICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCB7IHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCB9KTtcbiAqICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gKiAgICAgcmV0dXJuIHJlc3VsdFxuICogICB9LFxuICogICBbJ2h0dHBzOi8vYXBpLmV4YW1wbGUnXSxcbiAqICAge1xuICogICAgIGFib3J0YWJsZVxuICogICB9KTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPERldGFpbFxuICogICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gKiAgICAgICBtYXJrZG93bj17ZGF0YX1cbiAqICAgICAgIGFjdGlvbnM9e1xuICogICAgICAgICA8QWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgPEFjdGlvbiB0aXRsZT1cIlJlbG9hZFwiIG9uQWN0aW9uPXsoKSA9PiByZXZhbGlkYXRlKCl9IC8+XG4gKiAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gKiAgICAgICB9XG4gKiAgICAgLz5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZTxbXT4+KGZuOiBUKTogVXNlUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+PjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2U+KFxuICBmbjogVCxcbiAgYXJnczogUGFyYW1ldGVyczxUPixcbiAgb3B0aW9ucz86IFByb21pc2VPcHRpb25zPFQ+LFxuKTogVXNlUHJvbWlzZVJldHVyblR5cGU8VW53cmFwUmV0dXJuPFQ+PjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVByb21pc2U8VCBleHRlbmRzIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSB8IEZ1bmN0aW9uUmV0dXJuaW5nUGFnaW5hdGVkUHJvbWlzZT4oXG4gIGZuOiBULFxuICBhcmdzPzogUGFyYW1ldGVyczxUPixcbiAgb3B0aW9ucz86IFByb21pc2VPcHRpb25zPFQ+LFxuKTogVXNlUHJvbWlzZVJldHVyblR5cGU8YW55PiB7XG4gIGNvbnN0IGxhc3RDYWxsSWQgPSB1c2VSZWYoMCk7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0XSA9IHVzZVN0YXRlPEFzeW5jU3RhdGU8VW53cmFwUmV0dXJuPFQ+Pj4oeyBpc0xvYWRpbmc6IHRydWUgfSk7XG5cbiAgY29uc3QgZm5SZWYgPSB1c2VMYXRlc3QoZm4pO1xuICBjb25zdCBsYXRlc3RBYm9ydGFibGUgPSB1c2VMYXRlc3Qob3B0aW9ucz8uYWJvcnRhYmxlKTtcbiAgY29uc3QgbGF0ZXN0QXJncyA9IHVzZUxhdGVzdChhcmdzIHx8IFtdKTtcbiAgY29uc3QgbGF0ZXN0T25FcnJvciA9IHVzZUxhdGVzdChvcHRpb25zPy5vbkVycm9yKTtcbiAgY29uc3QgbGF0ZXN0T25EYXRhID0gdXNlTGF0ZXN0KG9wdGlvbnM/Lm9uRGF0YSk7XG4gIGNvbnN0IGxhdGVzdE9uV2lsbEV4ZWN1dGUgPSB1c2VMYXRlc3Qob3B0aW9ucz8ub25XaWxsRXhlY3V0ZSk7XG4gIGNvbnN0IGxhdGVzdEZhaWx1cmVUb2FzdCA9IHVzZUxhdGVzdChvcHRpb25zPy5mYWlsdXJlVG9hc3RPcHRpb25zKTtcbiAgY29uc3QgbGF0ZXN0VmFsdWUgPSB1c2VMYXRlc3Qoc3RhdGUuZGF0YSk7XG4gIGNvbnN0IGxhdGVzdENhbGxiYWNrID0gdXNlUmVmPCguLi5hcmdzOiBQYXJhbWV0ZXJzPFQ+KSA9PiBQcm9taXNlPFVud3JhcFJldHVybjxUPj4+KG51bGwpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25BcmdzUmVmID0gdXNlUmVmPFBhZ2luYXRpb25PcHRpb25zPih7IHBhZ2U6IDAgfSk7XG4gIGNvbnN0IHVzZVBhZ2luYXRpb25SZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBoYXNNb3JlUmVmID0gdXNlUmVmKHRydWUpO1xuICBjb25zdCBwYWdlU2l6ZVJlZiA9IHVzZVJlZig1MCk7XG5cbiAgY29uc3QgYWJvcnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGxhdGVzdEFib3J0YWJsZS5jdXJyZW50KSB7XG4gICAgICBsYXRlc3RBYm9ydGFibGUuY3VycmVudC5jdXJyZW50Py5hYm9ydCgpO1xuICAgICAgbGF0ZXN0QWJvcnRhYmxlLmN1cnJlbnQuY3VycmVudCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuICsrbGFzdENhbGxJZC5jdXJyZW50O1xuICB9LCBbbGF0ZXN0QWJvcnRhYmxlXSk7XG5cbiAgY29uc3QgY2FsbGJhY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoLi4uYXJnczogUGFyYW1ldGVyczxUPik6IFByb21pc2U8VW53cmFwUmV0dXJuPFQ+PiA9PiB7XG4gICAgICBjb25zdCBjYWxsSWQgPSBhYm9ydCgpO1xuXG4gICAgICBsYXRlc3RPbldpbGxFeGVjdXRlLmN1cnJlbnQ/LihhcmdzKTtcblxuICAgICAgc2V0KChwcmV2U3RhdGUpID0+ICh7IC4uLnByZXZTdGF0ZSwgaXNMb2FkaW5nOiB0cnVlIH0pKTtcblxuICAgICAgY29uc3QgcHJvbWlzZU9yUGFnaW5hdGVkUHJvbWlzZSA9IGJpbmRQcm9taXNlSWZOZWVkZWQoZm5SZWYuY3VycmVudCkoLi4uYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpIHtcbiAgICAgICAgaWYgKGVycm9yLm5hbWUgPT0gXCJBYm9ydEVycm9yXCIpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbElkID09PSBsYXN0Q2FsbElkLmN1cnJlbnQpIHtcbiAgICAgICAgICAvLyBoYW5kbGUgZXJyb3JzXG4gICAgICAgICAgaWYgKGxhdGVzdE9uRXJyb3IuY3VycmVudCkge1xuICAgICAgICAgICAgbGF0ZXN0T25FcnJvci5jdXJyZW50KGVycm9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVudmlyb25tZW50LmxhdW5jaFR5cGUgIT09IExhdW5jaFR5cGUuQmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7XG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiRmFpbGVkIHRvIGZldGNoIGxhdGVzdCBkYXRhXCIsXG4gICAgICAgICAgICAgICAgcHJpbWFyeUFjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiUmV0cnlcIixcbiAgICAgICAgICAgICAgICAgIG9uQWN0aW9uKHRvYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRvYXN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGF0ZXN0Q2FsbGJhY2suY3VycmVudD8uKC4uLigobGF0ZXN0QXJncy5jdXJyZW50IHx8IFtdKSBhcyBQYXJhbWV0ZXJzPFQ+KSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4ubGF0ZXN0RmFpbHVyZVRvYXN0LmN1cnJlbnQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXQoeyBlcnJvciwgaXNMb2FkaW5nOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBwcm9taXNlT3JQYWdpbmF0ZWRQcm9taXNlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdXNlUGFnaW5hdGlvblJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHByb21pc2VPclBhZ2luYXRlZFByb21pc2UocGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCkudGhlbihcbiAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRvbyBjb21wbGljYXRlZCBmb3IgVFNcbiAgICAgICAgICAoeyBkYXRhLCBoYXNNb3JlLCBjdXJzb3IgfTogeyBkYXRhOiBVbndyYXBSZXR1cm48VD47IGhhc01vcmU6IGJvb2xlYW47IGN1cnNvcj86IGFueSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoY2FsbElkID09PSBsYXN0Q2FsbElkLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50LmN1cnNvciA9IGN1cnNvcjtcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50Lmxhc3RJdGVtID0gZGF0YT8uW2RhdGEubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAobGF0ZXN0T25EYXRhLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICBsYXRlc3RPbkRhdGEuY3VycmVudChkYXRhLCBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChoYXNNb3JlKSB7XG4gICAgICAgICAgICAgICAgcGFnZVNpemVSZWYuY3VycmVudCA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGhhc01vcmVSZWYuY3VycmVudCA9IGhhc01vcmU7XG5cbiAgICAgICAgICAgICAgc2V0KChwcmV2aW91c0RhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5wYWdlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhLCBpc0xvYWRpbmc6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3Igd2Uga25vdyBpdCdzIGFuIGFycmF5IGhlcmVcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiAocHJldmlvdXNEYXRhLmRhdGEgfHwgW10pPy5jb25jYXQoZGF0YSksIGlzTG9hZGluZzogZmFsc2UgfTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yOiB1bmtub3duKSA9PiB7XG4gICAgICAgICAgICBoYXNNb3JlUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVFcnJvcihlcnJvcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgKSBhcyBQcm9taXNlPFVud3JhcFJldHVybjxUPj47XG4gICAgICB9XG5cbiAgICAgIHVzZVBhZ2luYXRpb25SZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHByb21pc2VPclBhZ2luYXRlZFByb21pc2UudGhlbigoZGF0YTogVW53cmFwUmV0dXJuPFQ+KSA9PiB7XG4gICAgICAgIGlmIChjYWxsSWQgPT09IGxhc3RDYWxsSWQuY3VycmVudCkge1xuICAgICAgICAgIGlmIChsYXRlc3RPbkRhdGEuY3VycmVudCkge1xuICAgICAgICAgICAgbGF0ZXN0T25EYXRhLmN1cnJlbnQoZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldCh7IGRhdGEsIGlzTG9hZGluZzogZmFsc2UgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH0sIGhhbmRsZUVycm9yKSBhcyBQcm9taXNlPFVud3JhcFJldHVybjxUPj47XG4gICAgfSxcbiAgICBbXG4gICAgICBsYXRlc3RPbkRhdGEsXG4gICAgICBsYXRlc3RPbkVycm9yLFxuICAgICAgbGF0ZXN0QXJncyxcbiAgICAgIGZuUmVmLFxuICAgICAgc2V0LFxuICAgICAgbGF0ZXN0Q2FsbGJhY2ssXG4gICAgICBsYXRlc3RPbldpbGxFeGVjdXRlLFxuICAgICAgcGFnaW5hdGlvbkFyZ3NSZWYsXG4gICAgICBsYXRlc3RGYWlsdXJlVG9hc3QsXG4gICAgICBhYm9ydCxcbiAgICBdLFxuICApO1xuXG4gIGxhdGVzdENhbGxiYWNrLmN1cnJlbnQgPSBjYWxsYmFjaztcblxuICBjb25zdCByZXZhbGlkYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIC8vIHJlc2V0IHRoZSBwYWdpbmF0aW9uXG4gICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCA9IHsgcGFnZTogMCB9O1xuXG4gICAgY29uc3QgYXJncyA9IChsYXRlc3RBcmdzLmN1cnJlbnQgfHwgW10pIGFzIFBhcmFtZXRlcnM8VD47XG4gICAgcmV0dXJuIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICB9LCBbY2FsbGJhY2ssIGxhdGVzdEFyZ3NdKTtcblxuICBjb25zdCBtdXRhdGUgPSB1c2VDYWxsYmFjazxNdXRhdGVQcm9taXNlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4sIHVuZGVmaW5lZD4+KFxuICAgIGFzeW5jIChhc3luY1VwZGF0ZSwgb3B0aW9ucykgPT4ge1xuICAgICAgbGV0IGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlOiBBd2FpdGVkPFJldHVyblR5cGU8VD4+IHwgdW5kZWZpbmVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9wdGlvbnM/Lm9wdGltaXN0aWNVcGRhdGUpIHtcbiAgICAgICAgICAvLyBjYW5jZWwgdGhlIGluLWZsaWdodCByZXF1ZXN0IHRvIG1ha2Ugc3VyZSBpdCB3b24ndCBvdmVyd3JpdGUgdGhlIG9wdGltaXN0aWMgdXBkYXRlXG4gICAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBcImZ1bmN0aW9uXCIgJiYgb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgZGF0YSBiZWZvcmUgdGhlIG9wdGltaXN0aWMgdXBkYXRlLFxuICAgICAgICAgICAgLy8gYnV0IG9ubHkgaWYgd2UgbmVlZCBpdCAoZWcuIG9ubHkgd2hlbiB3ZSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcm9sbGJhY2sgYWZ0ZXIpXG4gICAgICAgICAgICBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShsYXRlc3RWYWx1ZS5jdXJyZW50Py52YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IG9wdGlvbnMub3B0aW1pc3RpY1VwZGF0ZTtcbiAgICAgICAgICBzZXQoKHByZXZTdGF0ZSkgPT4gKHsgLi4ucHJldlN0YXRlLCBkYXRhOiB1cGRhdGUocHJldlN0YXRlLmRhdGEpIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXdhaXQgYXN5bmNVcGRhdGU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IG9wdGlvbnMucm9sbGJhY2tPbkVycm9yO1xuICAgICAgICAgIHNldCgocHJldlN0YXRlKSA9PiAoeyAuLi5wcmV2U3RhdGUsIGRhdGE6IHVwZGF0ZShwcmV2U3RhdGUuZGF0YSkgfSkpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnM/Lm9wdGltaXN0aWNVcGRhdGUgJiYgb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBmYWxzZSkge1xuICAgICAgICAgIHNldCgocHJldlN0YXRlKSA9PiAoeyAuLi5wcmV2U3RhdGUsIGRhdGE6IGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlIH0pKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAob3B0aW9ucz8uc2hvdWxkUmV2YWxpZGF0ZUFmdGVyICE9PSBmYWxzZSkge1xuICAgICAgICAgIGlmIChlbnZpcm9ubWVudC5sYXVuY2hUeXBlID09PSBMYXVuY2hUeXBlLkJhY2tncm91bmQgfHwgZW52aXJvbm1lbnQuY29tbWFuZE1vZGUgPT09IFwibWVudS1iYXJcIikge1xuICAgICAgICAgICAgLy8gd2hlbiBpbiB0aGUgYmFja2dyb3VuZCBvciBpbiBhIG1lbnUgYmFyLCB3ZSBhcmUgZ29pbmcgdG8gYXdhaXQgdGhlIHJldmFsaWRhdGlvblxuICAgICAgICAgICAgLy8gdG8gbWFrZSBzdXJlIHdlIGdldCB0aGUgcmlnaHQgZGF0YSBhdCB0aGUgZW5kIG9mIHRoZSBtdXRhdGlvblxuICAgICAgICAgICAgYXdhaXQgcmV2YWxpZGF0ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXZhbGlkYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbcmV2YWxpZGF0ZSwgbGF0ZXN0VmFsdWUsIHNldCwgYWJvcnRdLFxuICApO1xuXG4gIGNvbnN0IG9uTG9hZE1vcmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5wYWdlICs9IDE7XG4gICAgY29uc3QgYXJncyA9IChsYXRlc3RBcmdzLmN1cnJlbnQgfHwgW10pIGFzIFBhcmFtZXRlcnM8VD47XG4gICAgY2FsbGJhY2soLi4uYXJncyk7XG4gIH0sIFtwYWdpbmF0aW9uQXJnc1JlZiwgbGF0ZXN0QXJncywgY2FsbGJhY2tdKTtcblxuICAvLyByZXZhbGlkYXRlIHdoZW4gdGhlIGFyZ3MgY2hhbmdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gcmVzZXQgdGhlIHBhZ2luYXRpb25cbiAgICBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50ID0geyBwYWdlOiAwIH07XG5cbiAgICBpZiAob3B0aW9ucz8uZXhlY3V0ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGNhbGxiYWNrKC4uLigoYXJncyB8fCBbXSkgYXMgUGFyYW1ldGVyczxUPikpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjYW5jZWwgdGhlIHByZXZpb3VzIHJlcXVlc3QgaWYgd2UgZG9uJ3Qgd2FudCB0byBleGVjdXRlIGFueW1vcmVcbiAgICAgIGFib3J0KCk7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgfSwgW3VzZURlZXBNZW1vKFthcmdzLCBvcHRpb25zPy5leGVjdXRlLCBjYWxsYmFja10pLCBsYXRlc3RBYm9ydGFibGUsIHBhZ2luYXRpb25BcmdzUmVmXSk7XG5cbiAgLy8gYWJvcnQgcmVxdWVzdCB3aGVuIHVubW91bnRpbmdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbYWJvcnRdKTtcblxuICAvLyB3ZSBvbmx5IHdhbnQgdG8gc2hvdyB0aGUgbG9hZGluZyBpbmRpY2F0b3IgaWYgdGhlIHByb21pc2UgaXMgZXhlY3V0aW5nXG4gIGNvbnN0IGlzTG9hZGluZyA9IG9wdGlvbnM/LmV4ZWN1dGUgIT09IGZhbHNlID8gc3RhdGUuaXNMb2FkaW5nIDogZmFsc2U7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBsb2FkaW5nIGlzIGhhcyBzb21lIGZpeGVkIHZhbHVlIGluIHRoZSBlbnVtIHdoaWNoXG4gIGNvbnN0IHN0YXRlV2l0aExvYWRpbmdGaXhlZDogQXN5bmNTdGF0ZTxBd2FpdGVkPFJldHVyblR5cGU8VD4+PiA9IHsgLi4uc3RhdGUsIGlzTG9hZGluZyB9O1xuXG4gIGNvbnN0IHBhZ2luYXRpb24gPSB1c2VQYWdpbmF0aW9uUmVmLmN1cnJlbnRcbiAgICA/IHtcbiAgICAgICAgcGFnZVNpemU6IHBhZ2VTaXplUmVmLmN1cnJlbnQsXG4gICAgICAgIGhhc01vcmU6IGhhc01vcmVSZWYuY3VycmVudCxcbiAgICAgICAgb25Mb2FkTW9yZSxcbiAgICAgIH1cbiAgICA6IHVuZGVmaW5lZDtcblxuICByZXR1cm4geyAuLi5zdGF0ZVdpdGhMb2FkaW5nRml4ZWQsIHJldmFsaWRhdGUsIG11dGF0ZSwgcGFnaW5hdGlvbiB9O1xufVxuXG4vKiogQmluZCB0aGUgZm4gaWYgaXQncyBhIFByb21pc2UgbWV0aG9kICovXG5mdW5jdGlvbiBiaW5kUHJvbWlzZUlmTmVlZGVkPFQ+KGZuOiBUKTogVCB7XG4gIGlmIChmbiA9PT0gKFByb21pc2UuYWxsIGFzIGFueSkpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRoaXMgaXMgZmluZVxuICAgIHJldHVybiBmbi5iaW5kKFByb21pc2UpO1xuICB9XG4gIGlmIChmbiA9PT0gKFByb21pc2UucmFjZSBhcyBhbnkpKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciB0aGlzIGlzIGZpbmVcbiAgICByZXR1cm4gZm4uYmluZChQcm9taXNlKTtcbiAgfVxuICBpZiAoZm4gPT09IChQcm9taXNlLnJlc29sdmUgYXMgYW55KSkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhpcyBpcyBmaW5lXG4gICAgcmV0dXJuIGZuLmJpbmQoUHJvbWlzZSBhcyBhbnkpO1xuICB9XG4gIGlmIChmbiA9PT0gKFByb21pc2UucmVqZWN0IGFzIGFueSkpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHRoaXMgaXMgZmluZVxuICAgIHJldHVybiBmbi5iaW5kKFByb21pc2UpO1xuICB9XG4gIHJldHVybiBmbjtcbn1cbiIsICJpbXBvcnQgeyB1c2VSZWYsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGRlcXVhbCB9IGZyb20gXCJkZXF1YWwvbGl0ZVwiO1xuXG4vKipcbiAqIEBwYXJhbSB2YWx1ZSB0aGUgdmFsdWUgdG8gYmUgbWVtb2l6ZWQgKHVzdWFsbHkgYSBkZXBlbmRlbmN5IGxpc3QpXG4gKiBAcmV0dXJucyBhIG1lbW9pemVkIHZlcnNpb24gb2YgdGhlIHZhbHVlIGFzIGxvbmcgYXMgaXQgcmVtYWlucyBkZWVwbHkgZXF1YWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZURlZXBNZW1vPFQ+KHZhbHVlOiBUKSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZjxUPih2YWx1ZSk7XG4gIGNvbnN0IHNpZ25hbFJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuXG4gIGlmICghZGVxdWFsKHZhbHVlLCByZWYuY3VycmVudCkpIHtcbiAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICAgIHNpZ25hbFJlZi5jdXJyZW50ICs9IDE7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIHJldHVybiB1c2VNZW1vKCgpID0+IHJlZi5jdXJyZW50LCBbc2lnbmFsUmVmLmN1cnJlbnRdKTtcbn1cbiIsICJpbXBvcnQgeyB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBsYXRlc3Qgc3RhdGUuXG4gKlxuICogVGhpcyBpcyBtb3N0bHkgdXNlZnVsIHRvIGdldCBhY2Nlc3MgdG8gdGhlIGxhdGVzdCB2YWx1ZSBvZiBzb21lIHByb3BzIG9yIHN0YXRlIGluc2lkZSBhbiBhc3luY2hyb25vdXMgY2FsbGJhY2ssIGluc3RlYWQgb2YgdGhhdCB2YWx1ZSBhdCB0aGUgdGltZSB0aGUgY2FsbGJhY2sgd2FzIGNyZWF0ZWQgZnJvbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUxhdGVzdDxUPih2YWx1ZTogVCk6IHsgcmVhZG9ubHkgY3VycmVudDogVCB9IHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKHZhbHVlKTtcbiAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIHJlZjtcbn1cbiIsICJpbXBvcnQgKiBhcyBmcyBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBDbGlwYm9hcmQsIGVudmlyb25tZW50LCBvcGVuLCBUb2FzdCwgc2hvd1RvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuXG4vKipcbiAqIFNob3dzIGEgZmFpbHVyZSBUb2FzdCBmb3IgYSBnaXZlbiBFcnJvci5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgc2hvd0hVRCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHJ1bkFwcGxlU2NyaXB0LCBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gKCkge1xuICogICB0cnkge1xuICogICAgIGNvbnN0IHJlcyA9IGF3YWl0IHJ1bkFwcGxlU2NyaXB0KFxuICogICAgICAgYFxuICogICAgICAgb24gcnVuIGFyZ3ZcbiAqICAgICAgICAgcmV0dXJuIFwiaGVsbG8sIFwiICYgaXRlbSAxIG9mIGFyZ3YgJiBcIi5cIlxuICogICAgICAgZW5kIHJ1blxuICogICAgICAgYCxcbiAqICAgICAgIFtcIndvcmxkXCJdXG4gKiAgICAgKTtcbiAqICAgICBhd2FpdCBzaG93SFVEKHJlcyk7XG4gKiAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgICAgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwgeyB0aXRsZTogXCJDb3VsZCBub3QgcnVuIEFwcGxlU2NyaXB0XCIgfSk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZhaWx1cmVUb2FzdChcbiAgZXJyb3I6IHVua25vd24sXG4gIG9wdGlvbnM/OiBQYXJ0aWFsPFBpY2s8VG9hc3QuT3B0aW9ucywgXCJ0aXRsZVwiIHwgXCJwcmltYXJ5QWN0aW9uXCIgfCBcIm1lc3NhZ2VcIj4+LFxuKSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcik7XG4gIHJldHVybiBzaG93VG9hc3Qoe1xuICAgIHN0eWxlOiBUb2FzdC5TdHlsZS5GYWlsdXJlLFxuICAgIHRpdGxlOiBvcHRpb25zPy50aXRsZSA/PyBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCIsXG4gICAgbWVzc2FnZTogb3B0aW9ucz8ubWVzc2FnZSA/PyBtZXNzYWdlLFxuICAgIHByaW1hcnlBY3Rpb246IG9wdGlvbnM/LnByaW1hcnlBY3Rpb24gPz8gaGFuZGxlRXJyb3JUb2FzdEFjdGlvbihlcnJvciksXG4gICAgc2Vjb25kYXJ5QWN0aW9uOiBvcHRpb25zPy5wcmltYXJ5QWN0aW9uID8gaGFuZGxlRXJyb3JUb2FzdEFjdGlvbihlcnJvcikgOiB1bmRlZmluZWQsXG4gIH0pO1xufVxuXG5jb25zdCBoYW5kbGVFcnJvclRvYXN0QWN0aW9uID0gKGVycm9yOiB1bmtub3duKTogVG9hc3QuQWN0aW9uT3B0aW9ucyA9PiB7XG4gIGxldCBwcml2YXRlRXh0ZW5zaW9uID0gdHJ1ZTtcbiAgbGV0IHRpdGxlID0gXCJbRXh0ZW5zaW9uIE5hbWVdLi4uXCI7XG4gIGxldCBleHRlbnNpb25VUkwgPSBcIlwiO1xuICB0cnkge1xuICAgIGNvbnN0IHBhY2thZ2VKU09OID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGVudmlyb25tZW50LmFzc2V0c1BhdGgsIFwiLi5cIiwgXCJwYWNrYWdlLmpzb25cIiksIFwidXRmOFwiKSk7XG4gICAgdGl0bGUgPSBgWyR7cGFja2FnZUpTT04udGl0bGV9XS4uLmA7XG4gICAgZXh0ZW5zaW9uVVJMID0gYGh0dHBzOi8vcmF5Y2FzdC5jb20vJHtwYWNrYWdlSlNPTi5vd25lciB8fCBwYWNrYWdlSlNPTi5hdXRob3J9LyR7cGFja2FnZUpTT04ubmFtZX1gO1xuICAgIGlmICghcGFja2FnZUpTT04ub3duZXIgfHwgcGFja2FnZUpTT04uYWNjZXNzID09PSBcInB1YmxpY1wiKSB7XG4gICAgICBwcml2YXRlRXh0ZW5zaW9uID0gZmFsc2U7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBuby1vcFxuICB9XG5cbiAgLy8gaWYgaXQncyBhIHByaXZhdGUgZXh0ZW5zaW9uLCB3ZSBjYW4ndCBjb25zdHJ1Y3QgdGhlIFVSTCB0byByZXBvcnQgdGhlIGVycm9yXG4gIC8vIHNvIHdlIGZhbGxiYWNrIHRvIGNvcHlpbmcgdGhlIGVycm9yIHRvIHRoZSBjbGlwYm9hcmRcbiAgY29uc3QgZmFsbGJhY2sgPSBlbnZpcm9ubWVudC5pc0RldmVsb3BtZW50IHx8IHByaXZhdGVFeHRlbnNpb247XG5cbiAgY29uc3Qgc3RhY2sgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3I/LnN0YWNrIHx8IGVycm9yPy5tZXNzYWdlIHx8IFwiXCIgOiBTdHJpbmcoZXJyb3IpO1xuXG4gIHJldHVybiB7XG4gICAgdGl0bGU6IGZhbGxiYWNrID8gXCJDb3B5IExvZ3NcIiA6IFwiUmVwb3J0IEVycm9yXCIsXG4gICAgb25BY3Rpb24odG9hc3QpIHtcbiAgICAgIHRvYXN0LmhpZGUoKTtcbiAgICAgIGlmIChmYWxsYmFjaykge1xuICAgICAgICBDbGlwYm9hcmQuY29weShzdGFjayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVuKFxuICAgICAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vcmF5Y2FzdC9leHRlbnNpb25zL2lzc3Vlcy9uZXc/JmxhYmVscz1leHRlbnNpb24lMkNidWcmdGVtcGxhdGU9ZXh0ZW5zaW9uX2J1Z19yZXBvcnQueW1sJnRpdGxlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgdGl0bGUsXG4gICAgICAgICAgKX0mZXh0ZW5zaW9uLXVybD0ke2VuY29kZVVSSShleHRlbnNpb25VUkwpfSZkZXNjcmlwdGlvbj0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICAgIGAjIyMjIEVycm9yOlxuXFxgXFxgXFxgXG4ke3N0YWNrfVxuXFxgXFxgXFxgXG5gLFxuICAgICAgICAgICl9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgRGlzcGF0Y2gsIFNldFN0YXRlQWN0aW9uLCB1c2VTeW5jRXh0ZXJuYWxTdG9yZSwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQ2FjaGUgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IHJlcGxhY2VyLCByZXZpdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5jb25zdCByb290Q2FjaGUgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sKFwiY2FjaGUgd2l0aG91dCBuYW1lc3BhY2VcIik7XG5jb25zdCBjYWNoZU1hcCA9IC8qICNfX1BVUkVfXyAqLyBuZXcgTWFwPHN0cmluZyB8IHN5bWJvbCwgQ2FjaGU+KCk7XG5cbi8qKlxuICogUmV0dXJucyBhIHN0YXRlZnVsIHZhbHVlLCBhbmQgYSBmdW5jdGlvbiB0byB1cGRhdGUgaXQuIFRoZSB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQHJlbWFyayBUaGUgdmFsdWUgbmVlZHMgdG8gYmUgSlNPTiBzZXJpYWxpemFibGUuXG4gKlxuICogQHBhcmFtIGtleSAtIFRoZSB1bmlxdWUgaWRlbnRpZmllciBvZiB0aGUgc3RhdGUuIFRoaXMgY2FuIGJlIHVzZWQgdG8gc2hhcmUgdGhlIHN0YXRlIGFjcm9zcyBjb21wb25lbnRzIGFuZC9vciBjb21tYW5kcy5cbiAqIEBwYXJhbSBpbml0aWFsU3RhdGUgLSBUaGUgaW5pdGlhbCB2YWx1ZSBvZiB0aGUgc3RhdGUgaWYgdGhlcmUgYXJlbid0IGFueSBpbiB0aGUgQ2FjaGUgeWV0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkU3RhdGU8VD4oXG4gIGtleTogc3RyaW5nLFxuICBpbml0aWFsU3RhdGU6IFQsXG4gIGNvbmZpZz86IHsgY2FjaGVOYW1lc3BhY2U/OiBzdHJpbmcgfSxcbik6IFtULCBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxUPj5dO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUNhY2hlZFN0YXRlPFQgPSB1bmRlZmluZWQ+KGtleTogc3RyaW5nKTogW1QgfCB1bmRlZmluZWQsIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPFQgfCB1bmRlZmluZWQ+Pl07XG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkU3RhdGU8VD4oXG4gIGtleTogc3RyaW5nLFxuICBpbml0aWFsU3RhdGU/OiBULFxuICBjb25maWc/OiB7IGNhY2hlTmFtZXNwYWNlPzogc3RyaW5nIH0sXG4pOiBbVCwgRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+XSB7XG4gIGNvbnN0IGNhY2hlS2V5ID0gY29uZmlnPy5jYWNoZU5hbWVzcGFjZSB8fCByb290Q2FjaGU7XG4gIGNvbnN0IGNhY2hlID1cbiAgICBjYWNoZU1hcC5nZXQoY2FjaGVLZXkpIHx8IGNhY2hlTWFwLnNldChjYWNoZUtleSwgbmV3IENhY2hlKHsgbmFtZXNwYWNlOiBjb25maWc/LmNhY2hlTmFtZXNwYWNlIH0pKS5nZXQoY2FjaGVLZXkpO1xuXG4gIGlmICghY2FjaGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGNhY2hlXCIpO1xuICB9XG5cbiAgY29uc3Qga2V5UmVmID0gdXNlTGF0ZXN0KGtleSk7XG4gIGNvbnN0IGluaXRpYWxWYWx1ZVJlZiA9IHVzZUxhdGVzdChpbml0aWFsU3RhdGUpO1xuXG4gIGNvbnN0IGNhY2hlZFN0YXRlID0gdXNlU3luY0V4dGVybmFsU3RvcmUoY2FjaGUuc3Vic2NyaWJlLCAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5UmVmLmN1cnJlbnQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiQ291bGQgbm90IGdldCBDYWNoZSBkYXRhOlwiLCBlcnJvcik7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgc3RhdGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGNhY2hlZFN0YXRlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBpZiAoY2FjaGVkU3RhdGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGNhY2hlZFN0YXRlLCByZXZpdmVyKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyB0aGUgZGF0YSBnb3QgY29ycnVwdGVkIHNvbWVob3dcbiAgICAgICAgY29uc29sZS53YXJuKFwiVGhlIGNhY2hlZCBkYXRhIGlzIGNvcnJ1cHRlZFwiLCBlcnIpO1xuICAgICAgICByZXR1cm4gaW5pdGlhbFZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbml0aWFsVmFsdWVSZWYuY3VycmVudDtcbiAgICB9XG4gIH0sIFtjYWNoZWRTdGF0ZSwgaW5pdGlhbFZhbHVlUmVmXSk7XG5cbiAgY29uc3Qgc3RhdGVSZWYgPSB1c2VMYXRlc3Qoc3RhdGUpO1xuXG4gIGNvbnN0IHNldFN0YXRlQW5kQ2FjaGUgPSB1c2VDYWxsYmFjayhcbiAgICAodXBkYXRlcjogU2V0U3RhdGVBY3Rpb248VD4pID0+IHtcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgc3RydWdnbGVzIHRvIGluZmVyIHRoZSB0eXBlcyBhcyBUIGNvdWxkIHBvdGVudGlhbGx5IGJlIGEgZnVuY3Rpb25cbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdHlwZW9mIHVwZGF0ZXIgPT09IFwiZnVuY3Rpb25cIiA/IHVwZGF0ZXIoc3RhdGVSZWYuY3VycmVudCkgOiB1cGRhdGVyO1xuICAgICAgaWYgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjYWNoZS5zZXQoa2V5UmVmLmN1cnJlbnQsIFwidW5kZWZpbmVkXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZpZWRWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlLCByZXBsYWNlcik7XG4gICAgICAgIGNhY2hlLnNldChrZXlSZWYuY3VycmVudCwgc3RyaW5naWZpZWRWYWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3VmFsdWU7XG4gICAgfSxcbiAgICBbY2FjaGUsIGtleVJlZiwgc3RhdGVSZWZdLFxuICApO1xuXG4gIHJldHVybiBbc3RhdGUsIHNldFN0YXRlQW5kQ2FjaGVdO1xufVxuIiwgImltcG9ydCBjcnlwdG8gZnJvbSBcIm5vZGU6Y3J5cHRvXCI7XG5pbXBvcnQgeyB0eXBlSGFzaGVyIH0gZnJvbSBcIi4vdmVuZG9ycy90eXBlLWhhc2hlclwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VyKHRoaXM6IGFueSwga2V5OiBzdHJpbmcsIF92YWx1ZTogdW5rbm93bikge1xuICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIHJldHVybiBgX19yYXljYXN0X2NhY2hlZF9kYXRlX18ke3ZhbHVlLnRvSVNPU3RyaW5nKCl9YDtcbiAgfVxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgIHJldHVybiBgX19yYXljYXN0X2NhY2hlZF9idWZmZXJfXyR7dmFsdWUudG9TdHJpbmcoXCJiYXNlNjRcIil9YDtcbiAgfVxuICByZXR1cm4gX3ZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmV2aXZlcihfa2V5OiBzdHJpbmcsIHZhbHVlOiB1bmtub3duKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdmFsdWUuc3RhcnRzV2l0aChcIl9fcmF5Y2FzdF9jYWNoZWRfZGF0ZV9fXCIpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlLnJlcGxhY2UoXCJfX3JheWNhc3RfY2FjaGVkX2RhdGVfX1wiLCBcIlwiKSk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5zdGFydHNXaXRoKFwiX19yYXljYXN0X2NhY2hlZF9idWZmZXJfX1wiKSkge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh2YWx1ZS5yZXBsYWNlKFwiX19yYXljYXN0X2NhY2hlZF9idWZmZXJfX1wiLCBcIlwiKSwgXCJiYXNlNjRcIik7XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzaChvYmplY3Q6IGFueSkge1xuICBjb25zdCBoYXNoaW5nU3RyZWFtID0gY3J5cHRvLmNyZWF0ZUhhc2goXCJzaGExXCIpO1xuICBjb25zdCBoYXNoZXIgPSB0eXBlSGFzaGVyKGhhc2hpbmdTdHJlYW0pO1xuICBoYXNoZXIuZGlzcGF0Y2gob2JqZWN0KTtcblxuICByZXR1cm4gaGFzaGluZ1N0cmVhbS5kaWdlc3QoXCJoZXhcIik7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcyAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuaW1wb3J0IGNyeXB0byBmcm9tIFwibm9kZTpjcnlwdG9cIjtcblxuLyoqIENoZWNrIGlmIHRoZSBnaXZlbiBmdW5jdGlvbiBpcyBhIG5hdGl2ZSBmdW5jdGlvbiAqL1xuZnVuY3Rpb24gaXNOYXRpdmVGdW5jdGlvbihmOiBhbnkpIHtcbiAgaWYgKHR5cGVvZiBmICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgZXhwID0gL15mdW5jdGlvblxccytcXHcqXFxzKlxcKFxccypcXClcXHMqe1xccytcXFtuYXRpdmUgY29kZVxcXVxccyt9JC9pO1xuICByZXR1cm4gZXhwLmV4ZWMoRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZikpICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBoYXNoUmVwbGFjZXIodmFsdWU6IGFueSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHR5cGVIYXNoZXIoXG4gIHdyaXRlVG86XG4gICAgfCBjcnlwdG8uSGFzaFxuICAgIHwge1xuICAgICAgICBidWY6IHN0cmluZztcbiAgICAgICAgd3JpdGU6IChiOiBhbnkpID0+IHZvaWQ7XG4gICAgICAgIGVuZDogKGI6IGFueSkgPT4gdm9pZDtcbiAgICAgICAgcmVhZDogKCkgPT4gc3RyaW5nO1xuICAgICAgfSxcbiAgY29udGV4dDogYW55W10gPSBbXSxcbikge1xuICBmdW5jdGlvbiB3cml0ZShzdHI6IHN0cmluZykge1xuICAgIGlmIChcInVwZGF0ZVwiIGluIHdyaXRlVG8pIHtcbiAgICAgIHJldHVybiB3cml0ZVRvLnVwZGF0ZShzdHIsIFwidXRmOFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHdyaXRlVG8ud3JpdGUoc3RyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGRpc3BhdGNoOiBmdW5jdGlvbiAodmFsdWU6IGFueSkge1xuICAgICAgdmFsdWUgPSBoYXNoUmVwbGFjZXIodmFsdWUpO1xuXG4gICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHRoaXNbXCJfbnVsbFwiXSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzW1wiX1wiICsgdHlwZV0odmFsdWUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgX29iamVjdDogZnVuY3Rpb24gKG9iamVjdDogYW55KSB7XG4gICAgICBjb25zdCBwYXR0ZXJuID0gL1xcW29iamVjdCAoLiopXFxdL2k7XG4gICAgICBjb25zdCBvYmpTdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KTtcbiAgICAgIGxldCBvYmpUeXBlID0gcGF0dGVybi5leGVjKG9ialN0cmluZyk/LlsxXSA/PyBcInVua25vd246W1wiICsgb2JqU3RyaW5nICsgXCJdXCI7XG4gICAgICBvYmpUeXBlID0gb2JqVHlwZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBsZXQgb2JqZWN0TnVtYmVyID0gbnVsbCBhcyBhbnk7XG5cbiAgICAgIGlmICgob2JqZWN0TnVtYmVyID0gY29udGV4dC5pbmRleE9mKG9iamVjdCkpID49IDApIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChcIltDSVJDVUxBUjpcIiArIG9iamVjdE51bWJlciArIFwiXVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dC5wdXNoKG9iamVjdCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqZWN0KSkge1xuICAgICAgICB3cml0ZShcImJ1ZmZlcjpcIik7XG4gICAgICAgIHJldHVybiB3cml0ZShvYmplY3QudG9TdHJpbmcoXCJ1dGY4XCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9ialR5cGUgIT09IFwib2JqZWN0XCIgJiYgb2JqVHlwZSAhPT0gXCJmdW5jdGlvblwiICYmIG9ialR5cGUgIT09IFwiYXN5bmNmdW5jdGlvblwiKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKHRoaXNbXCJfXCIgKyBvYmpUeXBlXSkge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICB0aGlzW1wiX1wiICsgb2JqVHlwZV0ob2JqZWN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb2JqZWN0IHR5cGUgXCInICsgb2JqVHlwZSArICdcIicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gICAgICAgIGtleXMgPSBrZXlzLnNvcnQoKTtcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRvIGluY29ycG9yYXRlIHNwZWNpYWwgcHJvcGVydGllcywgc29cbiAgICAgICAgLy8gVHlwZXMgd2l0aCBkaWZmZXJlbnQgcHJvdG90eXBlcyB3aWxsIHByb2R1Y2VcbiAgICAgICAgLy8gYSBkaWZmZXJlbnQgaGFzaCBhbmQgb2JqZWN0cyBkZXJpdmVkIGZyb21cbiAgICAgICAgLy8gZGlmZmVyZW50IGZ1bmN0aW9ucyAoYG5ldyBGb29gLCBgbmV3IEJhcmApIHdpbGxcbiAgICAgICAgLy8gcHJvZHVjZSBkaWZmZXJlbnQgaGFzaGVzLlxuICAgICAgICAvLyBXZSBuZXZlciBkbyB0aGlzIGZvciBuYXRpdmUgZnVuY3Rpb25zIHNpbmNlIHNvbWVcbiAgICAgICAgLy8gc2VlbSB0byBicmVhayBiZWNhdXNlIG9mIHRoYXQuXG4gICAgICAgIGlmICghaXNOYXRpdmVGdW5jdGlvbihvYmplY3QpKSB7XG4gICAgICAgICAga2V5cy5zcGxpY2UoMCwgMCwgXCJwcm90b3R5cGVcIiwgXCJfX3Byb3RvX19cIiwgXCJjb25zdHJ1Y3RvclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyaXRlKFwib2JqZWN0OlwiICsga2V5cy5sZW5ndGggKyBcIjpcIik7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4ga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICBzZWxmLmRpc3BhdGNoKGtleSk7XG4gICAgICAgICAgd3JpdGUoXCI6XCIpO1xuICAgICAgICAgIHNlbGYuZGlzcGF0Y2gob2JqZWN0W2tleV0pO1xuICAgICAgICAgIHdyaXRlKFwiLFwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBfYXJyYXk6IGZ1bmN0aW9uIChhcnI6IGFueVtdLCB1bm9yZGVyZWQ6IGJvb2xlYW4pIHtcbiAgICAgIHVub3JkZXJlZCA9IHR5cGVvZiB1bm9yZGVyZWQgIT09IFwidW5kZWZpbmVkXCIgPyB1bm9yZGVyZWQgOiBmYWxzZTsgLy8gZGVmYXVsdCB0byBvcHRpb25zLnVub3JkZXJlZEFycmF5c1xuXG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIHdyaXRlKFwiYXJyYXk6XCIgKyBhcnIubGVuZ3RoICsgXCI6XCIpO1xuICAgICAgaWYgKCF1bm9yZGVyZWQgfHwgYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeTogYW55KSB7XG4gICAgICAgICAgc2VsZi5kaXNwYXRjaChlbnRyeSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSB1bm9yZGVyZWQgY2FzZSBpcyBhIGxpdHRsZSBtb3JlIGNvbXBsaWNhdGVkOlxuICAgICAgLy8gc2luY2UgdGhlcmUgaXMgbm8gY2Fub25pY2FsIG9yZGVyaW5nIG9uIG9iamVjdHMsXG4gICAgICAvLyBpLmUuIHthOjF9IDwge2E6Mn0gYW5kIHthOjF9ID4ge2E6Mn0gYXJlIGJvdGggZmFsc2UsXG4gICAgICAvLyB3ZSBmaXJzdCBzZXJpYWxpemUgZWFjaCBlbnRyeSB1c2luZyBhIFBhc3NUaHJvdWdoIHN0cmVhbVxuICAgICAgLy8gYmVmb3JlIHNvcnRpbmcuXG4gICAgICAvLyBhbHNvOiB3ZSBjYW7igJl0IHVzZSB0aGUgc2FtZSBjb250ZXh0IGFycmF5IGZvciBhbGwgZW50cmllc1xuICAgICAgLy8gc2luY2UgdGhlIG9yZGVyIG9mIGhhc2hpbmcgc2hvdWxkICpub3QqIG1hdHRlci4gaW5zdGVhZCxcbiAgICAgIC8vIHdlIGtlZXAgdHJhY2sgb2YgdGhlIGFkZGl0aW9ucyB0byBhIGNvcHkgb2YgdGhlIGNvbnRleHQgYXJyYXlcbiAgICAgIC8vIGFuZCBhZGQgYWxsIG9mIHRoZW0gdG8gdGhlIGdsb2JhbCBjb250ZXh0IGFycmF5IHdoZW4gd2XigJlyZSBkb25lXG4gICAgICBsZXQgY29udGV4dEFkZGl0aW9uczogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSBhcnIubWFwKGZ1bmN0aW9uIChlbnRyeTogYW55KSB7XG4gICAgICAgIGNvbnN0IHN0cm0gPSBQYXNzVGhyb3VnaCgpO1xuICAgICAgICBjb25zdCBsb2NhbENvbnRleHQgPSBjb250ZXh0LnNsaWNlKCk7IC8vIG1ha2UgY29weVxuICAgICAgICBjb25zdCBoYXNoZXIgPSB0eXBlSGFzaGVyKHN0cm0sIGxvY2FsQ29udGV4dCk7XG4gICAgICAgIGhhc2hlci5kaXNwYXRjaChlbnRyeSk7XG4gICAgICAgIC8vIHRha2Ugb25seSB3aGF0IHdhcyBhZGRlZCB0byBsb2NhbENvbnRleHQgYW5kIGFwcGVuZCBpdCB0byBjb250ZXh0QWRkaXRpb25zXG4gICAgICAgIGNvbnRleHRBZGRpdGlvbnMgPSBjb250ZXh0QWRkaXRpb25zLmNvbmNhdChsb2NhbENvbnRleHQuc2xpY2UoY29udGV4dC5sZW5ndGgpKTtcbiAgICAgICAgcmV0dXJuIHN0cm0ucmVhZCgpLnRvU3RyaW5nKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnRleHQgPSBjb250ZXh0LmNvbmNhdChjb250ZXh0QWRkaXRpb25zKTtcbiAgICAgIGVudHJpZXMuc29ydCgpO1xuICAgICAgdGhpcy5fYXJyYXkoZW50cmllcywgZmFsc2UpO1xuICAgIH0sXG4gICAgX2RhdGU6IGZ1bmN0aW9uIChkYXRlOiBEYXRlKSB7XG4gICAgICB3cml0ZShcImRhdGU6XCIgKyBkYXRlLnRvSlNPTigpKTtcbiAgICB9LFxuICAgIF9zeW1ib2w6IGZ1bmN0aW9uIChzeW06IHN5bWJvbCkge1xuICAgICAgd3JpdGUoXCJzeW1ib2w6XCIgKyBzeW0udG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfZXJyb3I6IGZ1bmN0aW9uIChlcnI6IEVycm9yKSB7XG4gICAgICB3cml0ZShcImVycm9yOlwiICsgZXJyLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX2Jvb2xlYW46IGZ1bmN0aW9uIChib29sOiBib29sZWFuKSB7XG4gICAgICB3cml0ZShcImJvb2w6XCIgKyBib29sLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX3N0cmluZzogZnVuY3Rpb24gKHN0cmluZzogc3RyaW5nKSB7XG4gICAgICB3cml0ZShcInN0cmluZzpcIiArIHN0cmluZy5sZW5ndGggKyBcIjpcIik7XG4gICAgICB3cml0ZShzdHJpbmcudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfZnVuY3Rpb246IGZ1bmN0aW9uIChmbjogYW55KSB7XG4gICAgICB3cml0ZShcImZuOlwiKTtcbiAgICAgIGlmIChpc05hdGl2ZUZ1bmN0aW9uKGZuKSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKFwiW25hdGl2ZV1cIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRpc3BhdGNoKGZuLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYWtlIHN1cmUgd2UgY2FuIHN0aWxsIGRpc3Rpbmd1aXNoIG5hdGl2ZSBmdW5jdGlvbnNcbiAgICAgIC8vIGJ5IHRoZWlyIG5hbWUsIG90aGVyd2lzZSBTdHJpbmcgYW5kIEZ1bmN0aW9uIHdpbGxcbiAgICAgIC8vIGhhdmUgdGhlIHNhbWUgaGFzaFxuICAgICAgdGhpcy5kaXNwYXRjaChcImZ1bmN0aW9uLW5hbWU6XCIgKyBTdHJpbmcoZm4ubmFtZSkpO1xuXG4gICAgICB0aGlzLl9vYmplY3QoZm4pO1xuICAgIH0sXG4gICAgX251bWJlcjogZnVuY3Rpb24gKG51bWJlcjogbnVtYmVyKSB7XG4gICAgICB3cml0ZShcIm51bWJlcjpcIiArIG51bWJlci50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF94bWw6IGZ1bmN0aW9uICh4bWw6IGFueSkge1xuICAgICAgd3JpdGUoXCJ4bWw6XCIgKyB4bWwudG9TdHJpbmcoKSk7XG4gICAgfSxcbiAgICBfbnVsbDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJOdWxsXCIpO1xuICAgIH0sXG4gICAgX3VuZGVmaW5lZDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJVbmRlZmluZWRcIik7XG4gICAgfSxcbiAgICBfcmVnZXhwOiBmdW5jdGlvbiAocmVnZXg6IFJlZ0V4cCkge1xuICAgICAgd3JpdGUoXCJyZWdleDpcIiArIHJlZ2V4LnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgX3VpbnQ4YXJyYXk6IGZ1bmN0aW9uIChhcnI6IFVpbnQ4QXJyYXkpIHtcbiAgICAgIHdyaXRlKFwidWludDhhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX3VpbnQ4Y2xhbXBlZGFycmF5OiBmdW5jdGlvbiAoYXJyOiBVaW50OENsYW1wZWRBcnJheSkge1xuICAgICAgd3JpdGUoXCJ1aW50OGNsYW1wZWRhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2ludDhhcnJheTogZnVuY3Rpb24gKGFycjogSW50OEFycmF5KSB7XG4gICAgICB3cml0ZShcImludDhhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX3VpbnQxNmFycmF5OiBmdW5jdGlvbiAoYXJyOiBVaW50MTZBcnJheSkge1xuICAgICAgd3JpdGUoXCJ1aW50MTZhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2ludDE2YXJyYXk6IGZ1bmN0aW9uIChhcnI6IEludDE2QXJyYXkpIHtcbiAgICAgIHdyaXRlKFwiaW50MTZhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX3VpbnQzMmFycmF5OiBmdW5jdGlvbiAoYXJyOiBVaW50MzJBcnJheSkge1xuICAgICAgd3JpdGUoXCJ1aW50MzJhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2ludDMyYXJyYXk6IGZ1bmN0aW9uIChhcnI6IEludDMyQXJyYXkpIHtcbiAgICAgIHdyaXRlKFwiaW50MzJhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2Zsb2F0MzJhcnJheTogZnVuY3Rpb24gKGFycjogRmxvYXQzMkFycmF5KSB7XG4gICAgICB3cml0ZShcImZsb2F0MzJhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2Zsb2F0NjRhcnJheTogZnVuY3Rpb24gKGFycjogRmxvYXQ2NEFycmF5KSB7XG4gICAgICB3cml0ZShcImZsb2F0NjRhcnJheTpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycikpO1xuICAgIH0sXG4gICAgX2FycmF5YnVmZmVyOiBmdW5jdGlvbiAoYXJyOiBBcnJheUJ1ZmZlcikge1xuICAgICAgd3JpdGUoXCJhcnJheWJ1ZmZlcjpcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoKG5ldyBVaW50OEFycmF5KGFycikpO1xuICAgIH0sXG4gICAgX3VybDogZnVuY3Rpb24gKHVybDogVVJMKSB7XG4gICAgICB3cml0ZShcInVybDpcIiArIHVybC50b1N0cmluZygpKTtcbiAgICB9LFxuICAgIF9tYXA6IGZ1bmN0aW9uIChtYXA6IE1hcDxhbnksIGFueT4pIHtcbiAgICAgIHdyaXRlKFwibWFwOlwiKTtcbiAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20obWFwKTtcbiAgICAgIHRoaXMuX2FycmF5KGFyciwgdHJ1ZSk7XG4gICAgfSxcbiAgICBfc2V0OiBmdW5jdGlvbiAoc2V0OiBTZXQ8YW55Pikge1xuICAgICAgd3JpdGUoXCJzZXQ6XCIpO1xuICAgICAgY29uc3QgYXJyID0gQXJyYXkuZnJvbShzZXQpO1xuICAgICAgdGhpcy5fYXJyYXkoYXJyLCB0cnVlKTtcbiAgICB9LFxuICAgIF9maWxlOiBmdW5jdGlvbiAoZmlsZTogYW55KSB7XG4gICAgICB3cml0ZShcImZpbGU6XCIpO1xuICAgICAgdGhpcy5kaXNwYXRjaChbZmlsZS5uYW1lLCBmaWxlLnNpemUsIGZpbGUudHlwZSwgZmlsZS5sYXN0TW9kaWZpZWRdKTtcbiAgICB9LFxuICAgIF9ibG9iOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJIYXNoaW5nIEJsb2Igb2JqZWN0cyBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZFxcblwiICtcbiAgICAgICAgICBcIihzZWUgaHR0cHM6Ly9naXRodWIuY29tL3B1bGVvcy9vYmplY3QtaGFzaC9pc3N1ZXMvMjYpXFxuXCIgK1xuICAgICAgICAgICdVc2UgXCJvcHRpb25zLnJlcGxhY2VyXCIgb3IgXCJvcHRpb25zLmlnbm9yZVVua25vd25cIlxcbicsXG4gICAgICApO1xuICAgIH0sXG4gICAgX2RvbXdpbmRvdzogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJkb213aW5kb3dcIik7XG4gICAgfSxcbiAgICBfYmlnaW50OiBmdW5jdGlvbiAobnVtYmVyOiBiaWdpbnQpIHtcbiAgICAgIHdyaXRlKFwiYmlnaW50OlwiICsgbnVtYmVyLnRvU3RyaW5nKCkpO1xuICAgIH0sXG4gICAgLyogTm9kZS5qcyBzdGFuZGFyZCBuYXRpdmUgb2JqZWN0cyAqL1xuICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInByb2Nlc3NcIik7XG4gICAgfSxcbiAgICBfdGltZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwidGltZXJcIik7XG4gICAgfSxcbiAgICBfcGlwZTogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJwaXBlXCIpO1xuICAgIH0sXG4gICAgX3RjcDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ0Y3BcIik7XG4gICAgfSxcbiAgICBfdWRwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInVkcFwiKTtcbiAgICB9LFxuICAgIF90dHk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwidHR5XCIpO1xuICAgIH0sXG4gICAgX3N0YXR3YXRjaGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcInN0YXR3YXRjaGVyXCIpO1xuICAgIH0sXG4gICAgX3NlY3VyZWNvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwic2VjdXJlY29udGV4dFwiKTtcbiAgICB9LFxuICAgIF9jb25uZWN0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImNvbm5lY3Rpb25cIik7XG4gICAgfSxcbiAgICBfemxpYjogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJ6bGliXCIpO1xuICAgIH0sXG4gICAgX2NvbnRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwiY29udGV4dFwiKTtcbiAgICB9LFxuICAgIF9ub2Rlc2NyaXB0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcIm5vZGVzY3JpcHRcIik7XG4gICAgfSxcbiAgICBfaHR0cHBhcnNlcjogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJodHRwcGFyc2VyXCIpO1xuICAgIH0sXG4gICAgX2RhdGF2aWV3OiBmdW5jdGlvbiAoKSB7XG4gICAgICB3cml0ZShcImRhdGF2aWV3XCIpO1xuICAgIH0sXG4gICAgX3NpZ25hbDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJzaWduYWxcIik7XG4gICAgfSxcbiAgICBfZnNldmVudDogZnVuY3Rpb24gKCkge1xuICAgICAgd3JpdGUoXCJmc2V2ZW50XCIpO1xuICAgIH0sXG4gICAgX3Rsc3dyYXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdyaXRlKFwidGxzd3JhcFwiKTtcbiAgICB9LFxuICB9O1xufVxuXG4vLyBNaW5pLWltcGxlbWVudGF0aW9uIG9mIHN0cmVhbS5QYXNzVGhyb3VnaFxuLy8gV2UgYXJlIGZhciBmcm9tIGhhdmluZyBuZWVkIGZvciB0aGUgZnVsbCBpbXBsZW1lbnRhdGlvbiwgYW5kIHdlIGNhblxuLy8gbWFrZSBhc3N1bXB0aW9ucyBsaWtlIFwibWFueSB3cml0ZXMsIHRoZW4gb25seSBvbmUgZmluYWwgcmVhZFwiXG4vLyBhbmQgd2UgY2FuIGlnbm9yZSBlbmNvZGluZyBzcGVjaWZpY3NcbmZ1bmN0aW9uIFBhc3NUaHJvdWdoKCkge1xuICByZXR1cm4ge1xuICAgIGJ1ZjogXCJcIixcblxuICAgIHdyaXRlOiBmdW5jdGlvbiAoYjogc3RyaW5nKSB7XG4gICAgICB0aGlzLmJ1ZiArPSBiO1xuICAgIH0sXG5cbiAgICBlbmQ6IGZ1bmN0aW9uIChiOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuYnVmICs9IGI7XG4gICAgfSxcblxuICAgIHJlYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmJ1ZjtcbiAgICB9LFxuICB9O1xufVxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlLFxuICBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZSxcbiAgTXV0YXRlUHJvbWlzZSxcbiAgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLFxuICBVbndyYXBSZXR1cm4sXG4gIFBhZ2luYXRpb25PcHRpb25zLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgdXNlQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VDYWNoZWRTdGF0ZVwiO1xuaW1wb3J0IHsgdXNlUHJvbWlzZSwgUHJvbWlzZU9wdGlvbnMgfSBmcm9tIFwiLi91c2VQcm9taXNlXCI7XG5pbXBvcnQgeyB1c2VMYXRlc3QgfSBmcm9tIFwiLi91c2VMYXRlc3RcIjtcbmltcG9ydCB7IGhhc2ggfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbi8vIFN5bWJvbCB0byBkaWZmZXJlbnRpYXRlIGFuIGVtcHR5IGNhY2hlIGZyb20gYHVuZGVmaW5lZGBcbmNvbnN0IGVtcHR5Q2FjaGUgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sKCk7XG5cbmV4cG9ydCB0eXBlIENhY2hlZFByb21pc2VPcHRpb25zPFxuICBUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlIHwgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLFxuICBVLFxuPiA9IFByb21pc2VPcHRpb25zPFQ+ICYge1xuICAvKipcbiAgICogVGhlIGluaXRpYWwgZGF0YSBpZiB0aGVyZSBhcmVuJ3QgYW55IGluIHRoZSBDYWNoZSB5ZXQuXG4gICAqL1xuICBpbml0aWFsRGF0YT86IFU7XG4gIC8qKlxuICAgKiBUZWxscyB0aGUgaG9vayB0byBrZWVwIHRoZSBwcmV2aW91cyByZXN1bHRzIGluc3RlYWQgb2YgcmV0dXJuaW5nIHRoZSBpbml0aWFsIHZhbHVlXG4gICAqIGlmIHRoZXJlIGFyZW4ndCBhbnkgaW4gdGhlIGNhY2hlIGZvciB0aGUgbmV3IGFyZ3VtZW50cy5cbiAgICogVGhpcyBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIHdoZW4gdXNlZCBmb3IgZGF0YSBmb3IgYSBMaXN0IHRvIGF2b2lkIGZsaWNrZXJpbmcuXG4gICAqL1xuICBrZWVwUHJldmlvdXNEYXRhPzogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogV3JhcHMgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgUHJvbWlzZSBpbiBhbm90aGVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZnVuY3Rpb24uIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAcmVtYXJrIFRoaXMgb3ZlcmxvYWQgc2hvdWxkIGJlIHVzZWQgd2hlbiB3b3JraW5nIHdpdGggcGFnaW5hdGVkIGRhdGEgc291cmNlcy5cbiAqIEByZW1hcmsgV2hlbiBwYWdpbmF0aW5nLCBvbmx5IHRoZSBmaXJzdCBwYWdlIHdpbGwgYmUgY2FjaGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGltcG9ydCB7IHNldFRpbWVvdXQgfSBmcm9tIFwibm9kZTp0aW1lcnMvcHJvbWlzZXNcIjtcbiAqIGltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG4gKiBpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICpcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEsIHBhZ2luYXRpb24gfSA9IHVzZUNhY2hlZFByb21pc2UoXG4gKiAgICAgKHNlYXJjaFRleHQ6IHN0cmluZykgPT4gYXN5bmMgKG9wdGlvbnM6IHsgcGFnZTogbnVtYmVyIH0pID0+IHtcbiAqICAgICAgIGF3YWl0IHNldFRpbWVvdXQoMjAwKTtcbiAqICAgICAgIGNvbnN0IG5ld0RhdGEgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAyNSB9LCAoX3YsIGluZGV4KSA9PiAoe1xuICogICAgICAgICBpbmRleCxcbiAqICAgICAgICAgcGFnZTogb3B0aW9ucy5wYWdlLFxuICogICAgICAgICB0ZXh0OiBzZWFyY2hUZXh0LFxuICogICAgICAgfSkpO1xuICogICAgICAgcmV0dXJuIHsgZGF0YTogbmV3RGF0YSwgaGFzTW9yZTogb3B0aW9ucy5wYWdlIDwgMTAgfTtcbiAqICAgICB9LFxuICogICAgIFtzZWFyY2hUZXh0XSxcbiAqICAgKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IG9uU2VhcmNoVGV4dENoYW5nZT17c2V0U2VhcmNoVGV4dH0gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0+XG4gKiAgICAgICB7ZGF0YT8ubWFwKChpdGVtKSA9PiAoXG4gKiAgICAgICAgIDxMaXN0Lkl0ZW1cbiAqICAgICAgICAgICBrZXk9e2Ake2l0ZW0ucGFnZX0gJHtpdGVtLmluZGV4fSAke2l0ZW0udGV4dH1gfVxuICogICAgICAgICAgIHRpdGxlPXtgUGFnZSAke2l0ZW0ucGFnZX0gSXRlbSAke2l0ZW0uaW5kZXh9YH1cbiAqICAgICAgICAgICBzdWJ0aXRsZT17aXRlbS50ZXh0fVxuICogICAgICAgICAvPlxuICogICAgICAgKSl9XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U8W10+PihcbiAgZm46IFQsXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4sIHVuZGVmaW5lZD47XG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBVIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gIGZuOiBULFxuICBhcmdzOiBQYXJhbWV0ZXJzPFQ+LFxuICBvcHRpb25zPzogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4sIFU+O1xuXG4vKipcbiAqIFdyYXBzIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIFByb21pc2UgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZ1bmN0aW9uLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQHJlbWFyayBUaGUgdmFsdWUgbmVlZHMgdG8gYmUgSlNPTiBzZXJpYWxpemFibGUuXG4gKiBAcmVtYXJrIFRoZSBmdW5jdGlvbiBpcyBhc3N1bWVkIHRvIGJlIGNvbnN0YW50IChlZy4gY2hhbmdpbmcgaXQgd29uJ3QgdHJpZ2dlciBhIHJldmFsaWRhdGlvbikuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgdXNlQ2FjaGVkUHJvbWlzZSB9IGZyb20gJ0ByYXljYXN0L3V0aWxzJztcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPigpO1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcmV2YWxpZGF0ZSB9ID0gdXNlQ2FjaGVkUHJvbWlzZShhc3luYyAodXJsOiBzdHJpbmcpID0+IHtcbiAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgeyBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwgfSk7XG4gKiAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICogICAgIHJldHVybiByZXN1bHRcbiAqICAgfSxcbiAqICAgWydodHRwczovL2FwaS5leGFtcGxlJ10sXG4gKiAgIHtcbiAqICAgICBhYm9ydGFibGVcbiAqICAgfSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxEZXRhaWxcbiAqICAgICAgIGlzTG9hZGluZz17aXNMb2FkaW5nfVxuICogICAgICAgbWFya2Rvd249e2RhdGF9XG4gKiAgICAgICBhY3Rpb25zPXtcbiAqICAgICAgICAgPEFjdGlvblBhbmVsPlxuICogICAgICAgICAgIDxBY3Rpb24gdGl0bGU9XCJSZWxvYWRcIiBvbkFjdGlvbj17KCkgPT4gcmV2YWxpZGF0ZSgpfSAvPlxuICogICAgICAgICA8L0FjdGlvblBhbmVsPlxuICogICAgICAgfVxuICogICAgIC8+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRQcm9taXNlPFQgZXh0ZW5kcyBGdW5jdGlvblJldHVybmluZ1Byb21pc2U8W10+PihcbiAgZm46IFQsXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxVbndyYXBSZXR1cm48VD4sIHVuZGVmaW5lZD47XG5leHBvcnQgZnVuY3Rpb24gdXNlQ2FjaGVkUHJvbWlzZTxUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlLCBVID0gdW5kZWZpbmVkPihcbiAgZm46IFQsXG4gIGFyZ3M6IFBhcmFtZXRlcnM8VD4sXG4gIG9wdGlvbnM/OiBDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFVud3JhcFJldHVybjxUPiwgVT47XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VDYWNoZWRQcm9taXNlPFxuICBUIGV4dGVuZHMgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlIHwgRnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBVIGV4dGVuZHMgYW55W10gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4+KGZuOiBULCBhcmdzPzogUGFyYW1ldGVyczxUPiwgb3B0aW9ucz86IENhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+KSB7XG4gIC8qKlxuICAgKiBUaGUgaG9vayBnZW5lcmF0ZXMgYSBjYWNoZSBrZXkgZnJvbSB0aGUgcHJvbWlzZSBpdCByZWNlaXZlcyAmIGl0cyBhcmd1bWVudHMuXG4gICAqIFNvbWV0aW1lcyB0aGF0J3Mgbm90IGVub3VnaCB0byBndWFyYW50ZWUgdW5pcXVlbmVzcywgc28gaG9va3MgdGhhdCBidWlsZCBvbiB0b3Agb2YgYHVzZUNhY2hlZFByb21pc2VgIGNhblxuICAgKiB1c2UgYW4gYGludGVybmFsX2NhY2hlS2V5U3VmZml4YCB0byBoZWxwIGl0LlxuICAgKlxuICAgKiBAcmVtYXJrIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICovXG4gIGNvbnN0IHtcbiAgICBpbml0aWFsRGF0YSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIGludGVybmFsX2NhY2hlS2V5U3VmZml4LFxuICAgIC4uLnVzZVByb21pc2VPcHRpb25zXG4gIH06IENhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+ICYgeyBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeD86IHN0cmluZyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgbGFzdFVwZGF0ZUZyb20gPSB1c2VSZWY8XCJjYWNoZVwiIHwgXCJwcm9taXNlXCI+KG51bGwpO1xuXG4gIGNvbnN0IFtjYWNoZWREYXRhLCBtdXRhdGVDYWNoZV0gPSB1c2VDYWNoZWRTdGF0ZTx0eXBlb2YgZW1wdHlDYWNoZSB8IChVbndyYXBSZXR1cm48VD4gfCBVKT4oXG4gICAgaGFzaChhcmdzIHx8IFtdKSArIGludGVybmFsX2NhY2hlS2V5U3VmZml4LFxuICAgIGVtcHR5Q2FjaGUsXG4gICAge1xuICAgICAgY2FjaGVOYW1lc3BhY2U6IGhhc2goZm4pLFxuICAgIH0sXG4gICk7XG5cbiAgLy8gVXNlIGEgcmVmIHRvIHN0b3JlIHByZXZpb3VzIHJldHVybmVkIGRhdGEuIFVzZSB0aGUgaW5pdGFsIGRhdGEgYXMgaXRzIGluaXRhbCB2YWx1ZSBmcm9tIHRoZSBjYWNoZS5cbiAgY29uc3QgbGFnZ3lEYXRhUmVmID0gdXNlUmVmPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4gfCBVPihjYWNoZWREYXRhICE9PSBlbXB0eUNhY2hlID8gY2FjaGVkRGF0YSA6IChpbml0aWFsRGF0YSBhcyBVKSk7XG4gIGNvbnN0IHBhZ2luYXRpb25BcmdzUmVmID0gdXNlUmVmPFBhZ2luYXRpb25PcHRpb25zPFVud3JhcFJldHVybjxUPiB8IFU+IHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG4gIGNvbnN0IHtcbiAgICBtdXRhdGU6IF9tdXRhdGUsXG4gICAgcmV2YWxpZGF0ZSxcbiAgICAuLi5zdGF0ZVxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgZm4gaGFzIHRoZSBzYW1lIHNpZ25hdHVyZSBpbiBib3RoIHVzZVByb21pc2UgYW5kIHVzZUNhY2hlZFByb21pc2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICB9ID0gdXNlUHJvbWlzZShmbiwgYXJncyB8fCAoW10gYXMgYW55IGFzIFBhcmFtZXRlcnM8VD4pLCB7XG4gICAgLi4udXNlUHJvbWlzZU9wdGlvbnMsXG4gICAgb25EYXRhKGRhdGEsIHBhZ2luYXRpb24pIHtcbiAgICAgIHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQgPSBwYWdpbmF0aW9uO1xuICAgICAgaWYgKHVzZVByb21pc2VPcHRpb25zLm9uRGF0YSkge1xuICAgICAgICB1c2VQcm9taXNlT3B0aW9ucy5vbkRhdGEoZGF0YSwgcGFnaW5hdGlvbik7XG4gICAgICB9XG4gICAgICBpZiAocGFnaW5hdGlvbiAmJiBwYWdpbmF0aW9uLnBhZ2UgPiAwKSB7XG4gICAgICAgIC8vIGRvbid0IGNhY2hlIGJleW9uZCB0aGUgZmlyc3QgcGFnZVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsYXN0VXBkYXRlRnJvbS5jdXJyZW50ID0gXCJwcm9taXNlXCI7XG4gICAgICBsYWdneURhdGFSZWYuY3VycmVudCA9IGRhdGE7XG4gICAgICBtdXRhdGVDYWNoZShkYXRhKTtcbiAgICB9LFxuICB9KTtcblxuICBsZXQgcmV0dXJuZWREYXRhOiBVIHwgQXdhaXRlZDxSZXR1cm5UeXBlPFQ+PiB8IFVud3JhcFJldHVybjxUPjtcbiAgY29uc3QgcGFnaW5hdGlvbiA9IHN0YXRlLnBhZ2luYXRpb247XG4gIC8vIHdoZW4gcGFnaW5hdGluZywgb25seSB0aGUgZmlyc3QgcGFnZSBnZXRzIGNhY2hlZCwgc28gd2UgcmV0dXJuIHRoZSBkYXRhIHdlIGdldCBmcm9tIGB1c2VQcm9taXNlYCwgYmVjYXVzZVxuICAvLyBpdCB3aWxsIGJlIGFjY3VtdWxhdGVkLlxuICBpZiAocGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudCAmJiBwYWdpbmF0aW9uQXJnc1JlZi5jdXJyZW50LnBhZ2UgPiAwICYmIHN0YXRlLmRhdGEpIHtcbiAgICByZXR1cm5lZERhdGEgPSBzdGF0ZS5kYXRhIGFzIFVud3JhcFJldHVybjxUPjtcbiAgICAvLyBpZiB0aGUgbGF0ZXN0IHVwZGF0ZSBpZiBmcm9tIHRoZSBQcm9taXNlLCB3ZSBrZWVwIGl0XG4gIH0gZWxzZSBpZiAobGFzdFVwZGF0ZUZyb20uY3VycmVudCA9PT0gXCJwcm9taXNlXCIpIHtcbiAgICByZXR1cm5lZERhdGEgPSBsYWdneURhdGFSZWYuY3VycmVudDtcbiAgfSBlbHNlIGlmIChrZWVwUHJldmlvdXNEYXRhICYmIGNhY2hlZERhdGEgIT09IGVtcHR5Q2FjaGUpIHtcbiAgICAvLyBpZiB3ZSB3YW50IHRvIGtlZXAgdGhlIGxhdGVzdCBkYXRhLCB3ZSBwaWNrIHRoZSBjYWNoZSBidXQgb25seSBpZiBpdCdzIG5vdCBlbXB0eVxuICAgIHJldHVybmVkRGF0YSA9IGNhY2hlZERhdGE7XG4gICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgIHBhZ2luYXRpb24uaGFzTW9yZSA9IHRydWU7XG4gICAgICBwYWdpbmF0aW9uLnBhZ2VTaXplID0gY2FjaGVkRGF0YS5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2UgaWYgKGtlZXBQcmV2aW91c0RhdGEgJiYgY2FjaGVkRGF0YSA9PT0gZW1wdHlDYWNoZSkge1xuICAgIC8vIGlmIHRoZSBjYWNoZSBpcyBlbXB0eSwgd2Ugd2lsbCByZXR1cm4gdGhlIHByZXZpb3VzIGRhdGFcbiAgICByZXR1cm5lZERhdGEgPSBsYWdneURhdGFSZWYuY3VycmVudDtcbiAgICAvLyB0aGVyZSBhcmUgbm8gc3BlY2lhbCBjYXNlcywgc28gZWl0aGVyIHJldHVybiB0aGUgY2FjaGUgb3IgaW5pdGlhbCBkYXRhXG4gIH0gZWxzZSBpZiAoY2FjaGVkRGF0YSAhPT0gZW1wdHlDYWNoZSkge1xuICAgIHJldHVybmVkRGF0YSA9IGNhY2hlZERhdGE7XG4gICAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICAgIHBhZ2luYXRpb24uaGFzTW9yZSA9IHRydWU7XG4gICAgICBwYWdpbmF0aW9uLnBhZ2VTaXplID0gY2FjaGVkRGF0YS5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybmVkRGF0YSA9IGluaXRpYWxEYXRhIGFzIFU7XG4gIH1cblxuICBjb25zdCBsYXRlc3REYXRhID0gdXNlTGF0ZXN0KHJldHVybmVkRGF0YSk7XG5cbiAgLy8gd2UgcmV3cml0ZSB0aGUgbXV0YXRlIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2FjaGUgaW5zdGVhZFxuICBjb25zdCBtdXRhdGUgPSB1c2VDYWxsYmFjazxNdXRhdGVQcm9taXNlPEF3YWl0ZWQ8UmV0dXJuVHlwZTxUPj4gfCBVPj4oXG4gICAgYXN5bmMgKGFzeW5jVXBkYXRlLCBvcHRpb25zKSA9PiB7XG4gICAgICBsZXQgZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGU7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob3B0aW9ucz8ub3B0aW1pc3RpY1VwZGF0ZSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBcImZ1bmN0aW9uXCIgJiYgb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgZGF0YSBiZWZvcmUgdGhlIG9wdGltaXN0aWMgdXBkYXRlLFxuICAgICAgICAgICAgLy8gYnV0IG9ubHkgaWYgd2UgbmVlZCBpdCAoZWcuIG9ubHkgd2hlbiB3ZSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcm9sbGJhY2sgYWZ0ZXIpXG4gICAgICAgICAgICBkYXRhQmVmb3JlT3B0aW1pc3RpY1VwZGF0ZSA9IHN0cnVjdHVyZWRDbG9uZShsYXRlc3REYXRhLmN1cnJlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBkYXRhID0gb3B0aW9ucy5vcHRpbWlzdGljVXBkYXRlKGxhdGVzdERhdGEuY3VycmVudCk7XG4gICAgICAgICAgbGFzdFVwZGF0ZUZyb20uY3VycmVudCA9IFwiY2FjaGVcIjtcbiAgICAgICAgICBsYWdneURhdGFSZWYuY3VycmVudCA9IGRhdGE7XG4gICAgICAgICAgbXV0YXRlQ2FjaGUoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF3YWl0IF9tdXRhdGUoYXN5bmNVcGRhdGUsIHsgc2hvdWxkUmV2YWxpZGF0ZUFmdGVyOiBvcHRpb25zPy5zaG91bGRSZXZhbGlkYXRlQWZ0ZXIgfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zPy5yb2xsYmFja09uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSBvcHRpb25zLnJvbGxiYWNrT25FcnJvcihsYXRlc3REYXRhLmN1cnJlbnQpO1xuICAgICAgICAgIGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPSBcImNhY2hlXCI7XG4gICAgICAgICAgbGFnZ3lEYXRhUmVmLmN1cnJlbnQgPSBkYXRhO1xuICAgICAgICAgIG11dGF0ZUNhY2hlKGRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbnM/Lm9wdGltaXN0aWNVcGRhdGUgJiYgb3B0aW9ucz8ucm9sbGJhY2tPbkVycm9yICE9PSBmYWxzZSkge1xuICAgICAgICAgIGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPSBcImNhY2hlXCI7XG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3aGVuIHVuZGVmaW5lZCwgaXQncyBleHBlY3RlZFxuICAgICAgICAgIGxhZ2d5RGF0YVJlZi5jdXJyZW50ID0gZGF0YUJlZm9yZU9wdGltaXN0aWNVcGRhdGU7XG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciB3aGVuIHVuZGVmaW5lZCwgaXQncyBleHBlY3RlZFxuICAgICAgICAgIG11dGF0ZUNhY2hlKGRhdGFCZWZvcmVPcHRpbWlzdGljVXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfSxcbiAgICBbbXV0YXRlQ2FjaGUsIF9tdXRhdGUsIGxhdGVzdERhdGEsIGxhZ2d5RGF0YVJlZiwgbGFzdFVwZGF0ZUZyb21dLFxuICApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNhY2hlZERhdGEgIT09IGVtcHR5Q2FjaGUpIHtcbiAgICAgIGxhc3RVcGRhdGVGcm9tLmN1cnJlbnQgPSBcImNhY2hlXCI7XG4gICAgICBsYWdneURhdGFSZWYuY3VycmVudCA9IGNhY2hlZERhdGE7XG4gICAgfVxuICB9LCBbY2FjaGVkRGF0YV0pO1xuXG4gIHJldHVybiB7XG4gICAgZGF0YTogcmV0dXJuZWREYXRhLFxuICAgIGlzTG9hZGluZzogc3RhdGUuaXNMb2FkaW5nLFxuICAgIGVycm9yOiBzdGF0ZS5lcnJvcixcbiAgICBtdXRhdGU6IHBhZ2luYXRpb25BcmdzUmVmLmN1cnJlbnQgJiYgcGFnaW5hdGlvbkFyZ3NSZWYuY3VycmVudC5wYWdlID4gMCA/IF9tdXRhdGUgOiBtdXRhdGUsXG4gICAgcGFnaW5hdGlvbixcbiAgICByZXZhbGlkYXRlLFxuICB9O1xufVxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUNhY2hlZFByb21pc2UsIENhY2hlZFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlQ2FjaGVkUHJvbWlzZVwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZSwgVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgaXNKU09OIH0gZnJvbSBcIi4vZmV0Y2gtdXRpbHNcIjtcbmltcG9ydCB7IGhhc2ggfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGRlZmF1bHRQYXJzaW5nKHJlc3BvbnNlOiBSZXNwb25zZSkge1xuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICB9XG5cbiAgY29uc3QgY29udGVudFR5cGVIZWFkZXIgPSByZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKTtcblxuICBpZiAoY29udGVudFR5cGVIZWFkZXIgJiYgaXNKU09OKGNvbnRlbnRUeXBlSGVhZGVyKSkge1xuICAgIHJldHVybiBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1hcHBpbmc8ViwgVCBleHRlbmRzIHVua25vd25bXT4ocmVzdWx0OiBWKTogeyBkYXRhOiBUOyBoYXNNb3JlPzogYm9vbGVhbjsgY3Vyc29yPzogYW55IH0ge1xuICByZXR1cm4geyBkYXRhOiByZXN1bHQgYXMgdW5rbm93biBhcyBULCBoYXNNb3JlOiBmYWxzZSB9O1xufVxuXG50eXBlIFJlcXVlc3RJbmZvID0gc3RyaW5nIHwgVVJMIHwgZ2xvYmFsVGhpcy5SZXF1ZXN0O1xudHlwZSBQYWdpbmF0ZWRSZXF1ZXN0SW5mbyA9IChwYWdpbmF0aW9uOiB7IHBhZ2U6IG51bWJlcjsgbGFzdEl0ZW0/OiBhbnk7IGN1cnNvcj86IGFueSB9KSA9PiBSZXF1ZXN0SW5mbztcblxuLyoqXG4gKiBGZXRjaGVzIHRoZSBwYWdpbmF0ZWRVUkwgYW5kIHJldHVybnMgdGhlIHtAbGluayBBc3luY1N0YXRlfSBjb3JyZXNwb25kaW5nIHRvIHRoZSBleGVjdXRpb24gb2YgdGhlIGZldGNoLiBUaGUgbGFzdCB2YWx1ZSB3aWxsIGJlIGtlcHQgYmV0d2VlbiBjb21tYW5kIHJ1bnMuXG4gKlxuICogQHJlbWFyayBUaGlzIG92ZXJsb2FkIHNob3VsZCBiZSB1c2VkIHdoZW4gd29ya2luZyB3aXRoIHBhZ2luYXRlZCBkYXRhIHNvdXJjZXMuXG4gKiBAcmVtYXJrIFdoZW4gcGFnaW5hdGluZywgb25seSB0aGUgZmlyc3QgcGFnZSB3aWxsIGJlIGNhY2hlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBJY29uLCBJbWFnZSwgTGlzdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZUZldGNoIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKiBpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuICpcbiAqIHR5cGUgU2VhcmNoUmVzdWx0ID0geyBjb21wYW5pZXM6IENvbXBhbnlbXTsgcGFnZTogbnVtYmVyOyB0b3RhbFBhZ2VzOiBudW1iZXIgfTtcbiAqIHR5cGUgQ29tcGFueSA9IHsgaWQ6IG51bWJlcjsgbmFtZTogc3RyaW5nOyBzbWFsbExvZ29Vcmw/OiBzdHJpbmcgfTtcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcGFnaW5hdGlvbiB9ID0gdXNlRmV0Y2goXG4gKiAgICAgKG9wdGlvbnMpID0+XG4gKiAgICAgICBcImh0dHBzOi8vYXBpLnljb21iaW5hdG9yLmNvbS92MC4xL2NvbXBhbmllcz9cIiArXG4gKiAgICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHsgcGFnZTogU3RyaW5nKG9wdGlvbnMucGFnZSArIDEpLCBxOiBzZWFyY2hUZXh0IH0pLnRvU3RyaW5nKCksXG4gKiAgICAge1xuICogICAgICAgbWFwUmVzdWx0KHJlc3VsdDogU2VhcmNoUmVzdWx0KSB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAgZGF0YTogcmVzdWx0LmNvbXBhbmllcyxcbiAqICAgICAgICAgICBoYXNNb3JlOiByZXN1bHQucGFnZSA8IHJlc3VsdC50b3RhbFBhZ2VzLFxuICogICAgICAgICB9O1xuICogICAgICAgfSxcbiAqICAgICAgIGtlZXBQcmV2aW91c0RhdGE6IHRydWUsXG4gKiAgICAgICBpbml0aWFsRGF0YTogW10sXG4gKiAgICAgfSxcbiAqICAgKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHBhZ2luYXRpb249e3BhZ2luYXRpb259IG9uU2VhcmNoVGV4dENoYW5nZT17c2V0U2VhcmNoVGV4dH0+XG4gKiAgICAgICB7ZGF0YS5tYXAoKGNvbXBhbnkpID0+IChcbiAqICAgICAgICAgPExpc3QuSXRlbVxuICogICAgICAgICAgIGtleT17Y29tcGFueS5pZH1cbiAqICAgICAgICAgICBpY29uPXt7IHNvdXJjZTogY29tcGFueS5zbWFsbExvZ29VcmwgPz8gSWNvbi5NaW51c0NpcmNsZSwgbWFzazogSW1hZ2UuTWFzay5Sb3VuZGVkUmVjdGFuZ2xlIH19XG4gKiAgICAgICAgICAgdGl0bGU9e2NvbXBhbnkubmFtZX1cbiAqICAgICAgICAgLz5cbiAqICAgICAgICkpfVxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlRmV0Y2g8ViA9IHVua25vd24sIFUgPSB1bmRlZmluZWQsIFQgZXh0ZW5kcyB1bmtub3duW10gPSB1bmtub3duW10+KFxuICB1cmw6IFBhZ2luYXRlZFJlcXVlc3RJbmZvLFxuICBvcHRpb25zOiBSZXF1ZXN0SW5pdCAmIHtcbiAgICBtYXBSZXN1bHQ6IChyZXN1bHQ6IFYpID0+IHsgZGF0YTogVDsgaGFzTW9yZT86IGJvb2xlYW47IGN1cnNvcj86IGFueSB9O1xuICAgIHBhcnNlUmVzcG9uc2U/OiAocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiBQcm9taXNlPFY+O1xuICB9ICYgT21pdDxDYWNoZWRQcm9taXNlT3B0aW9uczwodXJsOiBSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiBQcm9taXNlPFQ+LCBVPiwgXCJhYm9ydGFibGVcIj4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPjtcbi8qKlxuICogRmV0Y2ggdGhlIFVSTCBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgZmV0Y2guIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyB1c2VGZXRjaCB9IGZyb20gJ0ByYXljYXN0L3V0aWxzJztcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSwgcmV2YWxpZGF0ZSB9ID0gdXNlRmV0Y2goJ2h0dHBzOi8vYXBpLmV4YW1wbGUnKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPERldGFpbFxuICogICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmd9XG4gKiAgICAgICBtYXJrZG93bj17ZGF0YX1cbiAqICAgICAgIGFjdGlvbnM9e1xuICogICAgICAgICA8QWN0aW9uUGFuZWw+XG4gKiAgICAgICAgICAgPEFjdGlvbiB0aXRsZT1cIlJlbG9hZFwiIG9uQWN0aW9uPXsoKSA9PiByZXZhbGlkYXRlKCl9IC8+XG4gKiAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gKiAgICAgICB9XG4gKiAgICAgLz5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZldGNoPFYgPSB1bmtub3duLCBVID0gdW5kZWZpbmVkLCBUID0gVj4oXG4gIHVybDogUmVxdWVzdEluZm8sXG4gIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCAmIHtcbiAgICBtYXBSZXN1bHQ/OiAocmVzdWx0OiBWKSA9PiB7IGRhdGE6IFQ7IGhhc01vcmU/OiBib29sZWFuOyBjdXJzb3I/OiBhbnkgfTtcbiAgICBwYXJzZVJlc3BvbnNlPzogKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gUHJvbWlzZTxWPjtcbiAgfSAmIE9taXQ8Q2FjaGVkUHJvbWlzZU9wdGlvbnM8KHVybDogUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxUPiwgVT4sIFwiYWJvcnRhYmxlXCI+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT4gJiB7IHBhZ2luYXRpb246IHVuZGVmaW5lZCB9O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmV0Y2g8ViA9IHVua25vd24sIFUgPSB1bmRlZmluZWQsIFQgZXh0ZW5kcyB1bmtub3duW10gPSB1bmtub3duW10+KFxuICB1cmw6IFJlcXVlc3RJbmZvIHwgUGFnaW5hdGVkUmVxdWVzdEluZm8sXG4gIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCAmIHtcbiAgICBtYXBSZXN1bHQ/OiAocmVzdWx0OiBWKSA9PiB7IGRhdGE6IFQ7IGhhc01vcmU/OiBib29sZWFuOyBjdXJzb3I/OiBhbnkgfTtcbiAgICBwYXJzZVJlc3BvbnNlPzogKHJlc3BvbnNlOiBSZXNwb25zZSkgPT4gUHJvbWlzZTxWPjtcbiAgfSAmIE9taXQ8Q2FjaGVkUHJvbWlzZU9wdGlvbnM8KHVybDogUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4gUHJvbWlzZTxUPiwgVT4sIFwiYWJvcnRhYmxlXCI+LFxuKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT4ge1xuICBjb25zdCB7XG4gICAgcGFyc2VSZXNwb25zZSxcbiAgICBtYXBSZXN1bHQsXG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgICAuLi5mZXRjaE9wdGlvbnNcbiAgfSA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3QgdXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnM6IENhY2hlZFByb21pc2VPcHRpb25zPCh1cmw6IFJlcXVlc3RJbmZvLCBvcHRpb25zPzogUmVxdWVzdEluaXQpID0+IFByb21pc2U8VD4sIFU+ID0ge1xuICAgIGluaXRpYWxEYXRhLFxuICAgIGV4ZWN1dGUsXG4gICAga2VlcFByZXZpb3VzRGF0YSxcbiAgICBvbkVycm9yLFxuICAgIG9uRGF0YSxcbiAgICBvbldpbGxFeGVjdXRlLFxuICAgIGZhaWx1cmVUb2FzdE9wdGlvbnMsXG4gIH07XG5cbiAgY29uc3QgcGFyc2VSZXNwb25zZVJlZiA9IHVzZUxhdGVzdChwYXJzZVJlc3BvbnNlIHx8IGRlZmF1bHRQYXJzaW5nKTtcbiAgY29uc3QgbWFwUmVzdWx0UmVmID0gdXNlTGF0ZXN0KG1hcFJlc3VsdCB8fCBkZWZhdWx0TWFwcGluZyk7XG4gIGNvbnN0IHVybFJlZiA9IHVzZVJlZjxSZXF1ZXN0SW5mbyB8IFBhZ2luYXRlZFJlcXVlc3RJbmZvPihudWxsKTtcbiAgY29uc3QgZmlyc3RQYWdlVXJsUmVmID0gdXNlUmVmPFJlcXVlc3RJbmZvIHwgdW5kZWZpbmVkPihudWxsKTtcbiAgY29uc3QgZmlyc3RQYWdlVXJsID0gdHlwZW9mIHVybCA9PT0gXCJmdW5jdGlvblwiID8gdXJsKHsgcGFnZTogMCB9KSA6IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIFdoZW4gcGFnaW5hdGluZywgYHVybGAgaXMgYSBgUGFnaW5hdGVkUmVxdWVzdEluZm9gLCBzbyB3ZSBvbmx5IHdhbnQgdG8gdXBkYXRlIHRoZSByZWYgd2hlbiB0aGUgYGZpcnN0UGFnZVVybGAgY2hhbmdlcy5cbiAgICogV2hlbiBub3QgcGFnaW5hdGluZywgYHVybGAgaXMgYSBgUmVxdWVzdEluZm9gLCBzbyB3ZSB3YW50IHRvIHVwZGF0ZSB0aGUgcmVmIHdoZW5ldmVyIGB1cmxgIGNoYW5nZXMuXG4gICAqL1xuICBpZiAoIXVybFJlZi5jdXJyZW50IHx8IHR5cGVvZiBmaXJzdFBhZ2VVcmxSZWYuY3VycmVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCBmaXJzdFBhZ2VVcmxSZWYuY3VycmVudCAhPT0gZmlyc3RQYWdlVXJsKSB7XG4gICAgdXJsUmVmLmN1cnJlbnQgPSB1cmw7XG4gIH1cbiAgZmlyc3RQYWdlVXJsUmVmLmN1cnJlbnQgPSBmaXJzdFBhZ2VVcmw7XG4gIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KG51bGwpO1xuXG4gIGNvbnN0IHBhZ2luYXRlZEZuOiBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2U8W1BhZ2luYXRlZFJlcXVlc3RJbmZvLCB0eXBlb2YgZmV0Y2hPcHRpb25zXSwgVD4gPSB1c2VDYWxsYmFjayhcbiAgICAodXJsOiBQYWdpbmF0ZWRSZXF1ZXN0SW5mbywgb3B0aW9ucz86IFJlcXVlc3RJbml0KSA9PiBhc3luYyAocGFnaW5hdGlvbjogeyBwYWdlOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsKHBhZ2luYXRpb24pLCB7IHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCwgLi4ub3B0aW9ucyB9KTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IChhd2FpdCBwYXJzZVJlc3BvbnNlUmVmLmN1cnJlbnQocmVzKSkgYXMgVjtcbiAgICAgIHJldHVybiBtYXBSZXN1bHRSZWYuY3VycmVudD8uKHBhcnNlZCk7XG4gICAgfSxcbiAgICBbcGFyc2VSZXNwb25zZVJlZiwgbWFwUmVzdWx0UmVmXSxcbiAgKTtcbiAgY29uc3QgZm46IEZ1bmN0aW9uUmV0dXJuaW5nUHJvbWlzZTxbUmVxdWVzdEluZm8sIFJlcXVlc3RJbml0P10sIFQ+ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHVybDogUmVxdWVzdEluZm8sIG9wdGlvbnM/OiBSZXF1ZXN0SW5pdCkgPT4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7IHNpZ25hbDogYWJvcnRhYmxlLmN1cnJlbnQ/LnNpZ25hbCwgLi4ub3B0aW9ucyB9KTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IChhd2FpdCBwYXJzZVJlc3BvbnNlUmVmLmN1cnJlbnQocmVzKSkgYXMgVjtcbiAgICAgIGNvbnN0IG1hcHBlZCA9IG1hcFJlc3VsdFJlZi5jdXJyZW50KHBhcnNlZCk7XG4gICAgICByZXR1cm4gbWFwcGVkPy5kYXRhIGFzIHVua25vd24gYXMgVDtcbiAgICB9LFxuICAgIFtwYXJzZVJlc3BvbnNlUmVmLCBtYXBSZXN1bHRSZWZdLFxuICApO1xuXG4gIGNvbnN0IHByb21pc2UgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoZmlyc3RQYWdlVXJsUmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybiBwYWdpbmF0ZWRGbjtcbiAgICB9XG4gICAgcmV0dXJuIGZuO1xuICB9LCBbZmlyc3RQYWdlVXJsUmVmLCBmbiwgcGFnaW5hdGVkRm5dKTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIGxhc3RJdGVtIGNhbid0IGJlIGluZmVycmVkIHByb3Blcmx5XG4gIHJldHVybiB1c2VDYWNoZWRQcm9taXNlKHByb21pc2UsIFt1cmxSZWYuY3VycmVudCBhcyBQYWdpbmF0ZWRSZXF1ZXN0SW5mbywgZmV0Y2hPcHRpb25zXSwge1xuICAgIC4uLnVzZUNhY2hlZFByb21pc2VPcHRpb25zLFxuICAgIGludGVybmFsX2NhY2hlS2V5U3VmZml4OiBmaXJzdFBhZ2VVcmxSZWYuY3VycmVudCArIGhhc2gobWFwUmVzdWx0UmVmLmN1cnJlbnQpICsgaGFzaChwYXJzZVJlc3BvbnNlUmVmLmN1cnJlbnQpLFxuICAgIGFib3J0YWJsZSxcbiAgfSk7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIGlzSlNPTihjb250ZW50VHlwZUhlYWRlcjogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xuICBpZiAoY29udGVudFR5cGVIZWFkZXIpIHtcbiAgICBjb25zdCBtZWRpYVR5cGUgPSBwYXJzZUNvbnRlbnRUeXBlKGNvbnRlbnRUeXBlSGVhZGVyKTtcblxuICAgIGlmICghbWVkaWFUeXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhVHlwZS5zdWJ0eXBlID09PSBcImpzb25cIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG1lZGlhVHlwZS5zdWZmaXggPT09IFwianNvblwiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAobWVkaWFUeXBlLnN1ZmZpeCAmJiAvXFxianNvblxcYi9pLnRlc3QobWVkaWFUeXBlLnN1ZmZpeCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChtZWRpYVR5cGUuc3VidHlwZSAmJiAvXFxianNvblxcYi9pLnRlc3QobWVkaWFUeXBlLnN1YnR5cGUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFJlZ0V4cCB0byBtYXRjaCB0eXBlIGluIFJGQyA2ODM4IHdpdGggYW4gb3B0aW9uYWwgdHJhaWxpbmcgYDtgIGJlY2F1c2Ugc29tZSBBcHBsZSBBUElzIHJldHVybnMgb25lLi4uXG4gKlxuICogdHlwZS1uYW1lID0gcmVzdHJpY3RlZC1uYW1lXG4gKiBzdWJ0eXBlLW5hbWUgPSByZXN0cmljdGVkLW5hbWVcbiAqIHJlc3RyaWN0ZWQtbmFtZSA9IHJlc3RyaWN0ZWQtbmFtZS1maXJzdCAqMTI2cmVzdHJpY3RlZC1uYW1lLWNoYXJzXG4gKiByZXN0cmljdGVkLW5hbWUtZmlyc3QgID0gQUxQSEEgLyBESUdJVFxuICogcmVzdHJpY3RlZC1uYW1lLWNoYXJzICA9IEFMUEhBIC8gRElHSVQgLyBcIiFcIiAvIFwiI1wiIC9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBcIiRcIiAvIFwiJlwiIC8gXCItXCIgLyBcIl5cIiAvIFwiX1wiXG4gKiByZXN0cmljdGVkLW5hbWUtY2hhcnMgPS8gXCIuXCIgOyBDaGFyYWN0ZXJzIGJlZm9yZSBmaXJzdCBkb3QgYWx3YXlzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDsgc3BlY2lmeSBhIGZhY2V0IG5hbWVcbiAqIHJlc3RyaWN0ZWQtbmFtZS1jaGFycyA9LyBcIitcIiA7IENoYXJhY3RlcnMgYWZ0ZXIgbGFzdCBwbHVzIGFsd2F5c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7IHNwZWNpZnkgYSBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXhcbiAqIEFMUEhBID0gICV4NDEtNUEgLyAleDYxLTdBICAgOyBBLVogLyBhLXpcbiAqIERJR0lUID0gICV4MzAtMzkgICAgICAgICAgICAgOyAwLTlcbiAqL1xuY29uc3QgTUVESUFfVFlQRV9SRUdFWFAgPSAvXihbQS1aYS16MC05XVtBLVphLXowLTkhIyQmXl8tXXswLDEyNn0pXFwvKFtBLVphLXowLTldW0EtWmEtejAtOSEjJCZeXy4rLV17MCwxMjZ9KTs/JC87XG5cbmZ1bmN0aW9uIHBhcnNlQ29udGVudFR5cGUoaGVhZGVyOiBzdHJpbmcpIHtcbiAgY29uc3QgaGVhZGVyRGVsaW1pdGF0aW9uaW5kZXggPSBoZWFkZXIuaW5kZXhPZihcIjtcIik7XG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gaGVhZGVyRGVsaW1pdGF0aW9uaW5kZXggIT09IC0xID8gaGVhZGVyLnNsaWNlKDAsIGhlYWRlckRlbGltaXRhdGlvbmluZGV4KS50cmltKCkgOiBoZWFkZXIudHJpbSgpO1xuXG4gIGNvbnN0IG1hdGNoID0gTUVESUFfVFlQRV9SRUdFWFAuZXhlYyhjb250ZW50VHlwZS50b0xvd2VyQ2FzZSgpLnRvTG93ZXJDYXNlKCkpO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0eXBlID0gbWF0Y2hbMV07XG4gIGxldCBzdWJ0eXBlID0gbWF0Y2hbMl07XG4gIGxldCBzdWZmaXg7XG5cbiAgLy8gc3VmZml4IGFmdGVyIGxhc3QgK1xuICBjb25zdCBpbmRleCA9IHN1YnR5cGUubGFzdEluZGV4T2YoXCIrXCIpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgc3VmZml4ID0gc3VidHlwZS5zdWJzdHJpbmcoaW5kZXggKyAxKTtcbiAgICBzdWJ0eXBlID0gc3VidHlwZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHsgdHlwZSwgc3VidHlwZSwgc3VmZml4IH07XG59XG4iLCAiLypcbiAqIEluc3BpcmVkIGJ5IEV4ZWNhXG4gKi9cblxuaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IHVzZUNhY2hlZFByb21pc2UsIENhY2hlZFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlQ2FjaGVkUHJvbWlzZVwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQge1xuICBnZXRTcGF3bmVkUHJvbWlzZSxcbiAgZ2V0U3Bhd25lZFJlc3VsdCxcbiAgaGFuZGxlT3V0cHV0LFxuICBkZWZhdWx0UGFyc2luZyxcbiAgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcixcbn0gZnJvbSBcIi4vZXhlYy11dGlsc1wiO1xuXG50eXBlIEV4ZWNPcHRpb25zID0ge1xuICAvKipcbiAgICogSWYgYHRydWVgLCBydW5zIHRoZSBjb21tYW5kIGluc2lkZSBvZiBhIHNoZWxsLiBVc2VzIGAvYmluL3NoYC4gQSBkaWZmZXJlbnQgc2hlbGwgY2FuIGJlIHNwZWNpZmllZCBhcyBhIHN0cmluZy4gVGhlIHNoZWxsIHNob3VsZCB1bmRlcnN0YW5kIHRoZSBgLWNgIHN3aXRjaC5cbiAgICpcbiAgICogV2UgcmVjb21tZW5kIGFnYWluc3QgdXNpbmcgdGhpcyBvcHRpb24gc2luY2UgaXQgaXM6XG4gICAqIC0gbm90IGNyb3NzLXBsYXRmb3JtLCBlbmNvdXJhZ2luZyBzaGVsbC1zcGVjaWZpYyBzeW50YXguXG4gICAqIC0gc2xvd2VyLCBiZWNhdXNlIG9mIHRoZSBhZGRpdGlvbmFsIHNoZWxsIGludGVycHJldGF0aW9uLlxuICAgKiAtIHVuc2FmZSwgcG90ZW50aWFsbHkgYWxsb3dpbmcgY29tbWFuZCBpbmplY3Rpb24uXG4gICAqXG4gICAqIEBkZWZhdWx0IGZhbHNlXG4gICAqL1xuICBzaGVsbD86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIC8qKlxuICAgKiBTdHJpcCB0aGUgZmluYWwgbmV3bGluZSBjaGFyYWN0ZXIgZnJvbSB0aGUgb3V0cHV0LlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBzdHJpcEZpbmFsTmV3bGluZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5IG9mIHRoZSBjaGlsZCBwcm9jZXNzLlxuICAgKiBAZGVmYXVsdCBwcm9jZXNzLmN3ZCgpXG4gICAqL1xuICBjd2Q/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFbnZpcm9ubWVudCBrZXktdmFsdWUgcGFpcnMuIEV4dGVuZHMgYXV0b21hdGljYWxseSBmcm9tIGBwcm9jZXNzLmVudmAuXG4gICAqIEBkZWZhdWx0IHByb2Nlc3MuZW52XG4gICAqL1xuICBlbnY/OiBOb2RlSlMuUHJvY2Vzc0VudjtcbiAgLyoqXG4gICAqIFNwZWNpZnkgdGhlIGNoYXJhY3RlciBlbmNvZGluZyB1c2VkIHRvIGRlY29kZSB0aGUgc3Rkb3V0IGFuZCBzdGRlcnIgb3V0cHV0LiBJZiBzZXQgdG8gYFwiYnVmZmVyXCJgLCB0aGVuIHN0ZG91dCBhbmQgc3RkZXJyIHdpbGwgYmUgYSBCdWZmZXIgaW5zdGVhZCBvZiBhIHN0cmluZy5cbiAgICpcbiAgICogQGRlZmF1bHQgXCJ1dGY4XCJcbiAgICovXG4gIGVuY29kaW5nPzogQnVmZmVyRW5jb2RpbmcgfCBcImJ1ZmZlclwiO1xuICAvKipcbiAgICogV3JpdGUgc29tZSBpbnB1dCB0byB0aGUgYHN0ZGluYCBvZiB5b3VyIGJpbmFyeS5cbiAgICovXG4gIGlucHV0Pzogc3RyaW5nIHwgQnVmZmVyO1xuICAvKiogSWYgdGltZW91dCBpcyBncmVhdGVyIHRoYW4gYDBgLCB0aGUgcGFyZW50IHdpbGwgc2VuZCB0aGUgc2lnbmFsIGBTSUdURVJNYCBpZiB0aGUgY2hpbGQgcnVucyBsb25nZXIgdGhhbiB0aW1lb3V0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQGRlZmF1bHQgMTAwMDBcbiAgICovXG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59O1xuXG5jb25zdCBTUEFDRVNfUkVHRVhQID0gLyArL2c7XG5mdW5jdGlvbiBwYXJzZUNvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBhcmdzPzogc3RyaW5nW10pIHtcbiAgaWYgKGFyZ3MpIHtcbiAgICByZXR1cm4gW2NvbW1hbmQsIC4uLmFyZ3NdO1xuICB9XG4gIGNvbnN0IHRva2Vuczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChjb25zdCB0b2tlbiBvZiBjb21tYW5kLnRyaW0oKS5zcGxpdChTUEFDRVNfUkVHRVhQKSkge1xuICAgIC8vIEFsbG93IHNwYWNlcyB0byBiZSBlc2NhcGVkIGJ5IGEgYmFja3NsYXNoIGlmIG5vdCBtZWFudCBhcyBhIGRlbGltaXRlclxuICAgIGNvbnN0IHByZXZpb3VzVG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdO1xuICAgIGlmIChwcmV2aW91c1Rva2VuICYmIHByZXZpb3VzVG9rZW4uZW5kc1dpdGgoXCJcXFxcXCIpKSB7XG4gICAgICAvLyBNZXJnZSBwcmV2aW91cyB0b2tlbiB3aXRoIGN1cnJlbnQgb25lXG4gICAgICB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdID0gYCR7cHJldmlvdXNUb2tlbi5zbGljZSgwLCAtMSl9ICR7dG9rZW59YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b2tlbnM7XG59XG5cbnR5cGUgRXhlY0NhY2hlZFByb21pc2VPcHRpb25zPFQsIFU+ID0gT21pdDxcbiAgQ2FjaGVkUHJvbWlzZU9wdGlvbnM8XG4gICAgKF9jb21tYW5kOiBzdHJpbmcsIF9hcmdzOiBzdHJpbmdbXSwgX29wdGlvbnM/OiBFeGVjT3B0aW9ucywgaW5wdXQ/OiBzdHJpbmcgfCBCdWZmZXIpID0+IFByb21pc2U8VD4sXG4gICAgVVxuICA+LFxuICBcImFib3J0YWJsZVwiXG4+O1xuXG4vKipcbiAqIEV4ZWN1dGVzIGEgY29tbWFuZCBhbmQgcmV0dXJucyB0aGUge0BsaW5rIEFzeW5jU3RhdGV9IGNvcnJlc3BvbmRpbmcgdG8gdGhlIGV4ZWN1dGlvbiBvZiB0aGUgY29tbWFuZC4gVGhlIGxhc3QgdmFsdWUgd2lsbCBiZSBrZXB0IGJldHdlZW4gY29tbWFuZCBydW5zLlxuICpcbiAqIEByZW1hcmsgV2hlbiBzcGVjaWZ5aW5nIHRoZSBhcmd1bWVudHMgdmlhIHRoZSBgY29tbWFuZGAgc3RyaW5nLCBpZiB0aGUgZmlsZSBvciBhbiBhcmd1bWVudCBvZiB0aGUgY29tbWFuZCBjb250YWlucyBzcGFjZXMsIHRoZXkgbXVzdCBiZSBlc2NhcGVkIHdpdGggYmFja3NsYXNoZXMuIFRoaXMgbWF0dGVycyBlc3BlY2lhbGx5IGlmIGBjb21tYW5kYCBpcyBub3QgYSBjb25zdGFudCBidXQgYSB2YXJpYWJsZSwgZm9yIGV4YW1wbGUgd2l0aCBgX19kaXJuYW1lYCBvciBgcHJvY2Vzcy5jd2QoKWAuIEV4Y2VwdCBmb3Igc3BhY2VzLCBubyBlc2NhcGluZy9xdW90aW5nIGlzIG5lZWRlZC5cbiAqXG4gKiBUaGUgYHNoZWxsYCBvcHRpb24gbXVzdCBiZSB1c2VkIGlmIHRoZSBjb21tYW5kIHVzZXMgc2hlbGwtc3BlY2lmaWMgZmVhdHVyZXMgKGZvciBleGFtcGxlLCBgJiZgIG9yIGB8fGApLCBhcyBvcHBvc2VkIHRvIGJlaW5nIGEgc2ltcGxlIGZpbGUgZm9sbG93ZWQgYnkgaXRzIGFyZ3VtZW50cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyB1c2VFeGVjIH0gZnJvbSAnQHJheWNhc3QvdXRpbHMnO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCByZXZhbGlkYXRlIH0gPSB1c2VFeGVjKFwiYnJld1wiLCBbXCJpbmZvXCIsIFwiLS1qc29uPXYyXCIsIFwiLS1pbnN0YWxsZWRcIl0pO1xuICogICBjb25zdCByZXN1bHRzID0gdXNlTWVtbzx7fVtdPigoKSA9PiBKU09OLnBhcnNlKGRhdGEgfHwgXCJbXVwiKSwgW2RhdGFdKTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlxuICogICAgICB7KGRhdGEgfHwgW10pLm1hcCgoaXRlbSkgPT4gKFxuICogICAgICAgIDxMaXN0Lkl0ZW0ga2V5PXtpdGVtLmlkfSB0aXRsZT17aXRlbS5uYW1lfSAvPlxuICogICAgICApKX1cbiAqICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH07XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUV4ZWM8VCA9IEJ1ZmZlciwgVSA9IHVuZGVmaW5lZD4oXG4gIGNvbW1hbmQ6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBCdWZmZXIsIEV4ZWNPcHRpb25zPjtcbiAgfSAmIEV4ZWNPcHRpb25zICYge1xuICAgICAgZW5jb2Rpbmc6IFwiYnVmZmVyXCI7XG4gICAgfSAmIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUV4ZWM8VCA9IHN0cmluZywgVSA9IHVuZGVmaW5lZD4oXG4gIGNvbW1hbmQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBFeGVjT3B0aW9ucz47XG4gIH0gJiBFeGVjT3B0aW9ucyAmIHtcbiAgICAgIGVuY29kaW5nPzogQnVmZmVyRW5jb2Rpbmc7XG4gICAgfSAmIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUV4ZWM8VCA9IEJ1ZmZlciwgVSA9IHVuZGVmaW5lZD4oXG4gIGZpbGU6IHN0cmluZyxcbiAgLyoqXG4gICAqIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZmlsZS4gTm8gZXNjYXBpbmcvcXVvdGluZyBpcyBuZWVkZWQuXG4gICAqXG4gICAqIElmIGRlZmluZWQsIHRoZSBjb21tYW5kcyBuZWVkcyB0byBiZSBhIGZpbGUgdG8gZXhlY3V0ZS4gSWYgdW5kZWZpbmVkLCB0aGUgYXJndW1lbnRzIHdpbGwgYmUgcGFyc2VkIGZyb20gdGhlIGNvbW1hbmQuXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXSxcbiAgb3B0aW9uczoge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBCdWZmZXIsIEV4ZWNPcHRpb25zPjtcbiAgfSAmIEV4ZWNPcHRpb25zICYge1xuICAgICAgZW5jb2Rpbmc6IFwiYnVmZmVyXCI7XG4gICAgfSAmIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUV4ZWM8VCA9IHN0cmluZywgVSA9IHVuZGVmaW5lZD4oXG4gIGZpbGU6IHN0cmluZyxcbiAgLyoqXG4gICAqIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZmlsZS4gTm8gZXNjYXBpbmcvcXVvdGluZyBpcyBuZWVkZWQuXG4gICAqXG4gICAqIElmIGRlZmluZWQsIHRoZSBjb21tYW5kcyBuZWVkcyB0byBiZSBhIGZpbGUgdG8gZXhlY3V0ZS4gSWYgdW5kZWZpbmVkLCB0aGUgYXJndW1lbnRzIHdpbGwgYmUgcGFyc2VkIGZyb20gdGhlIGNvbW1hbmQuXG4gICAqL1xuICBhcmdzOiBzdHJpbmdbXSxcbiAgb3B0aW9ucz86IHtcbiAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBFeGVjT3B0aW9ucz47XG4gIH0gJiBFeGVjT3B0aW9ucyAmIHtcbiAgICAgIGVuY29kaW5nPzogQnVmZmVyRW5jb2Rpbmc7XG4gICAgfSAmIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPixcbik6IFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlPFQsIFU+O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUV4ZWM8VCwgVSA9IHVuZGVmaW5lZD4oXG4gIGNvbW1hbmQ6IHN0cmluZyxcbiAgb3B0aW9uc09yQXJncz86XG4gICAgfCBzdHJpbmdbXVxuICAgIHwgKHtcbiAgICAgICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIEJ1ZmZlciwgRXhlY09wdGlvbnM+IHwgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEV4ZWNPcHRpb25zPjtcbiAgICAgIH0gJiBFeGVjT3B0aW9ucyAmXG4gICAgICAgIEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPiksXG4gIG9wdGlvbnM/OiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIEJ1ZmZlciwgRXhlY09wdGlvbnM+IHwgUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEV4ZWNPcHRpb25zPjtcbiAgfSAmIEV4ZWNPcHRpb25zICZcbiAgICBFeGVjQ2FjaGVkUHJvbWlzZU9wdGlvbnM8VCwgVT4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxULCBVPiB7XG4gIGNvbnN0IHtcbiAgICBwYXJzZU91dHB1dCxcbiAgICBpbnB1dCxcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICAgIC4uLmV4ZWNPcHRpb25zXG4gIH0gPSBBcnJheS5pc0FycmF5KG9wdGlvbnNPckFyZ3MpID8gb3B0aW9ucyB8fCB7fSA6IG9wdGlvbnNPckFyZ3MgfHwge307XG5cbiAgY29uc3QgdXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnM6IEV4ZWNDYWNoZWRQcm9taXNlT3B0aW9uczxULCBVPiA9IHtcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICB9O1xuXG4gIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KG51bGwpO1xuICBjb25zdCBwYXJzZU91dHB1dFJlZiA9IHVzZUxhdGVzdChwYXJzZU91dHB1dCB8fCBkZWZhdWx0UGFyc2luZyk7XG5cbiAgY29uc3QgZm4gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoX2NvbW1hbmQ6IHN0cmluZywgX2FyZ3M6IHN0cmluZ1tdLCBfb3B0aW9ucz86IEV4ZWNPcHRpb25zLCBpbnB1dD86IHN0cmluZyB8IEJ1ZmZlcikgPT4ge1xuICAgICAgY29uc3QgW2ZpbGUsIC4uLmFyZ3NdID0gcGFyc2VDb21tYW5kKF9jb21tYW5kLCBfYXJncyk7XG4gICAgICBjb25zdCBjb21tYW5kID0gW2ZpbGUsIC4uLmFyZ3NdLmpvaW4oXCIgXCIpO1xuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBzdHJpcEZpbmFsTmV3bGluZTogdHJ1ZSxcbiAgICAgICAgLi4uX29wdGlvbnMsXG4gICAgICAgIHRpbWVvdXQ6IF9vcHRpb25zPy50aW1lb3V0IHx8IDEwMDAwLFxuICAgICAgICBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwsXG4gICAgICAgIGVuY29kaW5nOiBfb3B0aW9ucz8uZW5jb2RpbmcgPT09IG51bGwgPyBcImJ1ZmZlclwiIDogX29wdGlvbnM/LmVuY29kaW5nIHx8IFwidXRmOFwiLFxuICAgICAgICBlbnY6IHsgUEFUSDogXCIvdXNyL2xvY2FsL2JpbjovdXNyL2JpbjovYmluOi91c3Ivc2Jpbjovc2JpblwiLCAuLi5wcm9jZXNzLmVudiwgLi4uX29wdGlvbnM/LmVudiB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgc3Bhd25lZCA9IGNoaWxkUHJvY2Vzcy5zcGF3bihmaWxlLCBhcmdzLCBvcHRpb25zKTtcbiAgICAgIGNvbnN0IHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCwgb3B0aW9ucyk7XG5cbiAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICBzcGF3bmVkLnN0ZGluLmVuZChpbnB1dCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFt7IGVycm9yLCBleGl0Q29kZSwgc2lnbmFsLCB0aW1lZE91dCB9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0KFxuICAgICAgICBzcGF3bmVkLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICBzcGF3bmVkUHJvbWlzZSxcbiAgICAgICk7XG4gICAgICBjb25zdCBzdGRvdXQgPSBoYW5kbGVPdXRwdXQob3B0aW9ucywgc3Rkb3V0UmVzdWx0KTtcbiAgICAgIGNvbnN0IHN0ZGVyciA9IGhhbmRsZU91dHB1dChvcHRpb25zLCBzdGRlcnJSZXN1bHQpO1xuXG4gICAgICByZXR1cm4gcGFyc2VPdXRwdXRSZWYuY3VycmVudCh7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdG9vIG1hbnkgZ2VuZXJpY3MsIEkgZ2l2ZSB1cFxuICAgICAgICBzdGRvdXQsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdG9vIG1hbnkgZ2VuZXJpY3MsIEkgZ2l2ZSB1cFxuICAgICAgICBzdGRlcnIsXG4gICAgICAgIGVycm9yLFxuICAgICAgICBleGl0Q29kZSxcbiAgICAgICAgc2lnbmFsLFxuICAgICAgICB0aW1lZE91dCxcbiAgICAgICAgY29tbWFuZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcGFyZW50RXJyb3I6IG5ldyBFcnJvcigpLFxuICAgICAgfSkgYXMgVDtcbiAgICB9LFxuICAgIFtwYXJzZU91dHB1dFJlZl0sXG4gICk7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBUIGNhbid0IGJlIGEgUHJvbWlzZSBzbyBpdCdzIGFjdHVhbGx5IHRoZSBzYW1lXG4gIHJldHVybiB1c2VDYWNoZWRQcm9taXNlKGZuLCBbY29tbWFuZCwgQXJyYXkuaXNBcnJheShvcHRpb25zT3JBcmdzKSA/IG9wdGlvbnNPckFyZ3MgOiBbXSwgZXhlY09wdGlvbnMsIGlucHV0XSwge1xuICAgIC4uLnVzZUNhY2hlZFByb21pc2VPcHRpb25zLFxuICAgIGFib3J0YWJsZSxcbiAgfSk7XG59XG4iLCAiaW1wb3J0IGNoaWxkUHJvY2VzcyBmcm9tIFwibm9kZTpjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQgeyBjb25zdGFudHMgYXMgQnVmZmVyQ29uc3RhbnRzIH0gZnJvbSBcIm5vZGU6YnVmZmVyXCI7XG5pbXBvcnQgU3RyZWFtIGZyb20gXCJub2RlOnN0cmVhbVwiO1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSBcIm5vZGU6dXRpbFwiO1xuaW1wb3J0IHsgb25FeGl0IH0gZnJvbSBcIi4vdmVuZG9ycy9zaWduYWwtZXhpdFwiO1xuXG5leHBvcnQgdHlwZSBTcGF3bmVkUHJvbWlzZSA9IFByb21pc2U8e1xuICBleGl0Q29kZTogbnVtYmVyIHwgbnVsbDtcbiAgZXJyb3I/OiBFcnJvcjtcbiAgc2lnbmFsOiBOb2RlSlMuU2lnbmFscyB8IG51bGw7XG4gIHRpbWVkT3V0OiBib29sZWFuO1xufT47XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGF3bmVkUHJvbWlzZShcbiAgc3Bhd25lZDogY2hpbGRQcm9jZXNzLkNoaWxkUHJvY2Vzc1dpdGhvdXROdWxsU3RyZWFtcyxcbiAgeyB0aW1lb3V0IH06IHsgdGltZW91dD86IG51bWJlciB9ID0ge30sXG4pOiBTcGF3bmVkUHJvbWlzZSB7XG4gIGNvbnN0IHNwYXduZWRQcm9taXNlOiBTcGF3bmVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzcGF3bmVkLm9uKFwiZXhpdFwiLCAoZXhpdENvZGUsIHNpZ25hbCkgPT4ge1xuICAgICAgcmVzb2x2ZSh7IGV4aXRDb2RlLCBzaWduYWwsIHRpbWVkT3V0OiBmYWxzZSB9KTtcbiAgICB9KTtcblxuICAgIHNwYXduZWQub24oXCJlcnJvclwiLCAoZXJyb3IpID0+IHtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfSk7XG5cbiAgICBpZiAoc3Bhd25lZC5zdGRpbikge1xuICAgICAgc3Bhd25lZC5zdGRpbi5vbihcImVycm9yXCIsIChlcnJvcikgPT4ge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCByZW1vdmVFeGl0SGFuZGxlciA9IG9uRXhpdCgoKSA9PiB7XG4gICAgc3Bhd25lZC5raWxsKCk7XG4gIH0pO1xuXG4gIGlmICh0aW1lb3V0ID09PSAwIHx8IHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBzcGF3bmVkUHJvbWlzZS5maW5hbGx5KCgpID0+IHJlbW92ZUV4aXRIYW5kbGVyKCkpO1xuICB9XG5cbiAgbGV0IHRpbWVvdXRJZDogTm9kZUpTLlRpbWVvdXQ7XG4gIGNvbnN0IHRpbWVvdXRQcm9taXNlOiBTcGF3bmVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzcGF3bmVkLmtpbGwoXCJTSUdURVJNXCIpO1xuICAgICAgcmVqZWN0KE9iamVjdC5hc3NpZ24obmV3IEVycm9yKFwiVGltZWQgb3V0XCIpLCB7IHRpbWVkT3V0OiB0cnVlLCBzaWduYWw6IFwiU0lHVEVSTVwiIH0pKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfSk7XG5cbiAgY29uc3Qgc2FmZVNwYXduZWRQcm9taXNlID0gc3Bhd25lZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gIH0pO1xuXG4gIHJldHVybiBQcm9taXNlLnJhY2UoW3RpbWVvdXRQcm9taXNlLCBzYWZlU3Bhd25lZFByb21pc2VdKS5maW5hbGx5KCgpID0+IHJlbW92ZUV4aXRIYW5kbGVyKCkpO1xufVxuXG5jbGFzcyBNYXhCdWZmZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoXCJUaGUgb3V0cHV0IGlzIHRvbyBiaWdcIik7XG4gICAgdGhpcy5uYW1lID0gXCJNYXhCdWZmZXJFcnJvclwiO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1ZmZlclN0cmVhbTxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihvcHRpb25zOiB7IGVuY29kaW5nOiBCdWZmZXJFbmNvZGluZyB8IFwiYnVmZmVyXCIgfSkge1xuICBjb25zdCB7IGVuY29kaW5nIH0gPSBvcHRpb25zO1xuICBjb25zdCBpc0J1ZmZlciA9IGVuY29kaW5nID09PSBcImJ1ZmZlclwiO1xuXG4gIC8vIEB0cy1leHBlY3QtZXJyb3IgbWlzc2luZyB0aGUgbWV0aG9kcyB3ZSBhcmUgYWRkaW5nIGJlbG93XG4gIGNvbnN0IHN0cmVhbTogU3RyZWFtLlBhc3NUaHJvdWdoICYgeyBnZXRCdWZmZXJlZFZhbHVlOiAoKSA9PiBUOyBnZXRCdWZmZXJlZExlbmd0aDogKCkgPT4gbnVtYmVyIH0gPVxuICAgIG5ldyBTdHJlYW0uUGFzc1Rocm91Z2goeyBvYmplY3RNb2RlOiBmYWxzZSB9KTtcblxuICBpZiAoZW5jb2RpbmcgJiYgZW5jb2RpbmcgIT09IFwiYnVmZmVyXCIpIHtcbiAgICBzdHJlYW0uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuICB9XG5cbiAgbGV0IGxlbmd0aCA9IDA7XG4gIGNvbnN0IGNodW5rczogYW55W10gPSBbXTtcblxuICBzdHJlYW0ub24oXCJkYXRhXCIsIChjaHVuaykgPT4ge1xuICAgIGNodW5rcy5wdXNoKGNodW5rKTtcblxuICAgIGxlbmd0aCArPSBjaHVuay5sZW5ndGg7XG4gIH0pO1xuXG4gIHN0cmVhbS5nZXRCdWZmZXJlZFZhbHVlID0gKCkgPT4ge1xuICAgIHJldHVybiAoaXNCdWZmZXIgPyBCdWZmZXIuY29uY2F0KGNodW5rcywgbGVuZ3RoKSA6IGNodW5rcy5qb2luKFwiXCIpKSBhcyBUO1xuICB9O1xuXG4gIHN0cmVhbS5nZXRCdWZmZXJlZExlbmd0aCA9ICgpID0+IGxlbmd0aDtcblxuICByZXR1cm4gc3RyZWFtO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTdHJlYW08VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4oXG4gIGlucHV0U3RyZWFtOiBTdHJlYW0uUmVhZGFibGUsXG4gIG9wdGlvbnM6IHsgZW5jb2Rpbmc6IEJ1ZmZlckVuY29kaW5nIHwgXCJidWZmZXJcIiB9LFxuKSB7XG4gIGNvbnN0IHN0cmVhbSA9IGJ1ZmZlclN0cmVhbTxUPihvcHRpb25zKTtcblxuICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgcmVqZWN0UHJvbWlzZSA9IChlcnJvcjogRXJyb3IgJiB7IGJ1ZmZlcmVkRGF0YT86IFQgfSkgPT4ge1xuICAgICAgLy8gRG9uJ3QgcmV0cmlldmUgYW4gb3ZlcnNpemVkIGJ1ZmZlci5cbiAgICAgIGlmIChlcnJvciAmJiBzdHJlYW0uZ2V0QnVmZmVyZWRMZW5ndGgoKSA8PSBCdWZmZXJDb25zdGFudHMuTUFYX0xFTkdUSCkge1xuICAgICAgICBlcnJvci5idWZmZXJlZERhdGEgPSBzdHJlYW0uZ2V0QnVmZmVyZWRWYWx1ZSgpO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH07XG5cbiAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcHJvbWlzaWZ5KFN0cmVhbS5waXBlbGluZSkoaW5wdXRTdHJlYW0sIHN0cmVhbSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlamVjdFByb21pc2UoZXJyb3IgYXMgYW55KTtcbiAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgc3RyZWFtLm9uKFwiZGF0YVwiLCAoKSA9PiB7XG4gICAgICAvLyA4MG1iXG4gICAgICBpZiAoc3RyZWFtLmdldEJ1ZmZlcmVkTGVuZ3RoKCkgPiAxMDAwICogMTAwMCAqIDgwKSB7XG4gICAgICAgIHJlamVjdFByb21pc2UobmV3IE1heEJ1ZmZlckVycm9yKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gc3RyZWFtLmdldEJ1ZmZlcmVkVmFsdWUoKTtcbn1cblxuLy8gT24gZmFpbHVyZSwgYHJlc3VsdC5zdGRvdXR8c3RkZXJyYCBzaG91bGQgY29udGFpbiB0aGUgY3VycmVudGx5IGJ1ZmZlcmVkIHN0cmVhbVxuYXN5bmMgZnVuY3Rpb24gZ2V0QnVmZmVyZWREYXRhPFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KHN0cmVhbTogU3RyZWFtLlJlYWRhYmxlLCBzdHJlYW1Qcm9taXNlOiBQcm9taXNlPFQ+KSB7XG4gIHN0cmVhbS5kZXN0cm95KCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgc3RyZWFtUHJvbWlzZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gKGVycm9yIGFzIGFueSBhcyB7IGJ1ZmZlcmVkRGF0YTogVCB9KS5idWZmZXJlZERhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNwYXduZWRSZXN1bHQ8VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4oXG4gIHsgc3Rkb3V0LCBzdGRlcnIgfTogY2hpbGRQcm9jZXNzLkNoaWxkUHJvY2Vzc1dpdGhvdXROdWxsU3RyZWFtcyxcbiAgeyBlbmNvZGluZyB9OiB7IGVuY29kaW5nOiBCdWZmZXJFbmNvZGluZyB8IFwiYnVmZmVyXCIgfSxcbiAgcHJvY2Vzc0RvbmU6IFNwYXduZWRQcm9taXNlLFxuKSB7XG4gIGNvbnN0IHN0ZG91dFByb21pc2UgPSBnZXRTdHJlYW08VD4oc3Rkb3V0LCB7IGVuY29kaW5nIH0pO1xuICBjb25zdCBzdGRlcnJQcm9taXNlID0gZ2V0U3RyZWFtPFQ+KHN0ZGVyciwgeyBlbmNvZGluZyB9KTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBQcm9taXNlLmFsbChbcHJvY2Vzc0RvbmUsIHN0ZG91dFByb21pc2UsIHN0ZGVyclByb21pc2VdKTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB7XG4gICAgICAgIGVycm9yOiBlcnJvciBhcyBFcnJvcixcbiAgICAgICAgZXhpdENvZGU6IG51bGwsXG4gICAgICAgIHNpZ25hbDogZXJyb3Iuc2lnbmFsIGFzIE5vZGVKUy5TaWduYWxzIHwgbnVsbCxcbiAgICAgICAgdGltZWRPdXQ6IChlcnJvci50aW1lZE91dCBhcyBib29sZWFuKSB8fCBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBnZXRCdWZmZXJlZERhdGEoc3Rkb3V0LCBzdGRvdXRQcm9taXNlKSxcbiAgICAgIGdldEJ1ZmZlcmVkRGF0YShzdGRlcnIsIHN0ZGVyclByb21pc2UpLFxuICAgIF0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmlwRmluYWxOZXdsaW5lPFQgZXh0ZW5kcyBzdHJpbmcgfCBCdWZmZXI+KGlucHV0OiBUKSB7XG4gIGNvbnN0IExGID0gdHlwZW9mIGlucHV0ID09PSBcInN0cmluZ1wiID8gXCJcXG5cIiA6IFwiXFxuXCIuY2hhckNvZGVBdCgwKTtcbiAgY29uc3QgQ1IgPSB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIgPyBcIlxcclwiIDogXCJcXHJcIi5jaGFyQ29kZUF0KDApO1xuXG4gIGlmIChpbnB1dFtpbnB1dC5sZW5ndGggLSAxXSA9PT0gTEYpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdlIGFyZSBkb2luZyBzb21lIG5hc3R5IHN0dWZmIGhlcmVcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDAsIC0xKTtcbiAgfVxuXG4gIGlmIChpbnB1dFtpbnB1dC5sZW5ndGggLSAxXSA9PT0gQ1IpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIHdlIGFyZSBkb2luZyBzb21lIG5hc3R5IHN0dWZmIGhlcmVcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDAsIC0xKTtcbiAgfVxuXG4gIHJldHVybiBpbnB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU91dHB1dDxUIGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyPihvcHRpb25zOiB7IHN0cmlwRmluYWxOZXdsaW5lPzogYm9vbGVhbiB9LCB2YWx1ZTogVCkge1xuICBpZiAob3B0aW9ucy5zdHJpcEZpbmFsTmV3bGluZSkge1xuICAgIHJldHVybiBzdHJpcEZpbmFsTmV3bGluZSh2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldEVycm9yUHJlZml4KHtcbiAgdGltZWRPdXQsXG4gIHRpbWVvdXQsXG4gIHNpZ25hbCxcbiAgZXhpdENvZGUsXG59OiB7XG4gIGV4aXRDb2RlOiBudW1iZXIgfCBudWxsO1xuICBzaWduYWw6IE5vZGVKUy5TaWduYWxzIHwgbnVsbDtcbiAgdGltZWRPdXQ6IGJvb2xlYW47XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59KSB7XG4gIGlmICh0aW1lZE91dCkge1xuICAgIHJldHVybiBgdGltZWQgb3V0IGFmdGVyICR7dGltZW91dH0gbWlsbGlzZWNvbmRzYDtcbiAgfVxuXG4gIGlmIChzaWduYWwgIT09IHVuZGVmaW5lZCAmJiBzaWduYWwgIT09IG51bGwpIHtcbiAgICByZXR1cm4gYHdhcyBraWxsZWQgd2l0aCAke3NpZ25hbH1gO1xuICB9XG5cbiAgaWYgKGV4aXRDb2RlICE9PSB1bmRlZmluZWQgJiYgZXhpdENvZGUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gYGZhaWxlZCB3aXRoIGV4aXQgY29kZSAke2V4aXRDb2RlfWA7XG4gIH1cblxuICByZXR1cm4gXCJmYWlsZWRcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUVycm9yKHtcbiAgc3Rkb3V0LFxuICBzdGRlcnIsXG4gIGVycm9yLFxuICBzaWduYWwsXG4gIGV4aXRDb2RlLFxuICBjb21tYW5kLFxuICB0aW1lZE91dCxcbiAgb3B0aW9ucyxcbiAgcGFyZW50RXJyb3IsXG59OiB7XG4gIHN0ZG91dDogc3RyaW5nIHwgQnVmZmVyO1xuICBzdGRlcnI6IHN0cmluZyB8IEJ1ZmZlcjtcbiAgZXJyb3I/OiBFcnJvcjtcbiAgZXhpdENvZGU6IG51bWJlciB8IG51bGw7XG4gIHNpZ25hbDogTm9kZUpTLlNpZ25hbHMgfCBudWxsO1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgY29tbWFuZDogc3RyaW5nO1xuICBvcHRpb25zPzogeyB0aW1lb3V0PzogbnVtYmVyIH07XG4gIHBhcmVudEVycm9yOiBFcnJvcjtcbn0pIHtcbiAgY29uc3QgcHJlZml4ID0gZ2V0RXJyb3JQcmVmaXgoeyB0aW1lZE91dCwgdGltZW91dDogb3B0aW9ucz8udGltZW91dCwgc2lnbmFsLCBleGl0Q29kZSB9KTtcbiAgY29uc3QgZXhlY2FNZXNzYWdlID0gYENvbW1hbmQgJHtwcmVmaXh9OiAke2NvbW1hbmR9YDtcbiAgY29uc3Qgc2hvcnRNZXNzYWdlID0gZXJyb3IgPyBgJHtleGVjYU1lc3NhZ2V9XFxuJHtlcnJvci5tZXNzYWdlfWAgOiBleGVjYU1lc3NhZ2U7XG4gIGNvbnN0IG1lc3NhZ2UgPSBbc2hvcnRNZXNzYWdlLCBzdGRlcnIsIHN0ZG91dF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCJcXG5cIik7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgICBlcnJvci5vcmlnaW5hbE1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICB9IGVsc2Uge1xuICAgIGVycm9yID0gcGFyZW50RXJyb3I7XG4gIH1cblxuICBlcnJvci5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5zaG9ydE1lc3NhZ2UgPSBzaG9ydE1lc3NhZ2U7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLmNvbW1hbmQgPSBjb21tYW5kO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5leGl0Q29kZSA9IGV4aXRDb2RlO1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIG5vdCBvbiBFcnJvclxuICBlcnJvci5zaWduYWwgPSBzaWduYWw7XG4gIC8vIEB0cy1leHBlY3QtZXJyb3Igbm90IG9uIEVycm9yXG4gIGVycm9yLnN0ZG91dCA9IHN0ZG91dDtcbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBub3Qgb24gRXJyb3JcbiAgZXJyb3Iuc3RkZXJyID0gc3RkZXJyO1xuXG4gIGlmIChcImJ1ZmZlcmVkRGF0YVwiIGluIGVycm9yKSB7XG4gICAgZGVsZXRlIGVycm9yW1wiYnVmZmVyZWREYXRhXCJdO1xuICB9XG5cbiAgcmV0dXJuIGVycm9yO1xufVxuXG5leHBvcnQgdHlwZSBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFxuICBULFxuICBEZWNvZGVkT3V0cHV0IGV4dGVuZHMgc3RyaW5nIHwgQnVmZmVyID0gc3RyaW5nIHwgQnVmZmVyLFxuICBPcHRpb25zID0gdW5rbm93bixcbj4gPSAoYXJnczoge1xuICAvKiogVGhlIG91dHB1dCBvZiB0aGUgcHJvY2VzcyBvbiBzdGRvdXQuICovXG4gIHN0ZG91dDogRGVjb2RlZE91dHB1dDtcbiAgLyoqIFRoZSBvdXRwdXQgb2YgdGhlIHByb2Nlc3Mgb24gc3RkZXJyLiAqL1xuICBzdGRlcnI6IERlY29kZWRPdXRwdXQ7XG4gIGVycm9yPzogRXJyb3I7XG4gIC8qKiBUaGUgbnVtZXJpYyBleGl0IGNvZGUgb2YgdGhlIHByb2Nlc3MgdGhhdCB3YXMgcnVuLiAqL1xuICBleGl0Q29kZTogbnVtYmVyIHwgbnVsbDtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBzaWduYWwgdGhhdCB3YXMgdXNlZCB0byB0ZXJtaW5hdGUgdGhlIHByb2Nlc3MuIEZvciBleGFtcGxlLCBTSUdGUEUuXG4gICAqXG4gICAqIElmIGEgc2lnbmFsIHRlcm1pbmF0ZWQgdGhlIHByb2Nlc3MsIHRoaXMgcHJvcGVydHkgaXMgZGVmaW5lZC4gT3RoZXJ3aXNlIGl0IGlzIG51bGwuXG4gICAqL1xuICBzaWduYWw6IE5vZGVKUy5TaWduYWxzIHwgbnVsbDtcbiAgLyoqIFdoZXRoZXIgdGhlIHByb2Nlc3MgdGltZWQgb3V0LiAqL1xuICB0aW1lZE91dDogYm9vbGVhbjtcbiAgLyoqIFRoZSBjb21tYW5kIHRoYXQgd2FzIHJ1biwgZm9yIGxvZ2dpbmcgcHVycG9zZXMuICovXG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgb3B0aW9ucz86IE9wdGlvbnM7XG59KSA9PiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFBhcnNpbmc8VCBleHRlbmRzIHN0cmluZyB8IEJ1ZmZlcj4oe1xuICBzdGRvdXQsXG4gIHN0ZGVycixcbiAgZXJyb3IsXG4gIGV4aXRDb2RlLFxuICBzaWduYWwsXG4gIHRpbWVkT3V0LFxuICBjb21tYW5kLFxuICBvcHRpb25zLFxuICBwYXJlbnRFcnJvcixcbn06IHtcbiAgc3Rkb3V0OiBUO1xuICBzdGRlcnI6IFQ7XG4gIGVycm9yPzogRXJyb3I7XG4gIGV4aXRDb2RlOiBudW1iZXIgfCBudWxsO1xuICBzaWduYWw6IE5vZGVKUy5TaWduYWxzIHwgbnVsbDtcbiAgdGltZWRPdXQ6IGJvb2xlYW47XG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgb3B0aW9ucz86IHsgdGltZW91dD86IG51bWJlciB9O1xuICBwYXJlbnRFcnJvcjogRXJyb3I7XG59KSB7XG4gIGlmIChlcnJvciB8fCBleGl0Q29kZSAhPT0gMCB8fCBzaWduYWwgIT09IG51bGwpIHtcbiAgICBjb25zdCByZXR1cm5lZEVycm9yID0gbWFrZUVycm9yKHtcbiAgICAgIGVycm9yLFxuICAgICAgZXhpdENvZGUsXG4gICAgICBzaWduYWwsXG4gICAgICBzdGRvdXQsXG4gICAgICBzdGRlcnIsXG4gICAgICBjb21tYW5kLFxuICAgICAgdGltZWRPdXQsXG4gICAgICBvcHRpb25zLFxuICAgICAgcGFyZW50RXJyb3IsXG4gICAgfSk7XG5cbiAgICB0aHJvdyByZXR1cm5lZEVycm9yO1xuICB9XG5cbiAgcmV0dXJuIHN0ZG91dDtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8vIE5vdGU6IHNpbmNlIG55YyB1c2VzIHRoaXMgbW9kdWxlIHRvIG91dHB1dCBjb3ZlcmFnZSwgYW55IGxpbmVzXG4vLyB0aGF0IGFyZSBpbiB0aGUgZGlyZWN0IHN5bmMgZmxvdyBvZiBueWMncyBvdXRwdXRDb3ZlcmFnZSBhcmVcbi8vIGlnbm9yZWQsIHNpbmNlIHdlIGNhbiBuZXZlciBnZXQgY292ZXJhZ2UgZm9yIHRoZW0uXG4vLyBncmFiIGEgcmVmZXJlbmNlIHRvIG5vZGUncyByZWFsIHByb2Nlc3Mgb2JqZWN0IHJpZ2h0IGF3YXlcblxuY29uc3QgcHJvY2Vzc09rID0gKHByb2Nlc3M6IGFueSkgPT5cbiAgISFwcm9jZXNzICYmXG4gIHR5cGVvZiBwcm9jZXNzID09PSBcIm9iamVjdFwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLnJlbW92ZUxpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3MuZW1pdCA9PT0gXCJmdW5jdGlvblwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLnJlYWxseUV4aXQgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5saXN0ZW5lcnMgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2YgcHJvY2Vzcy5raWxsID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIHByb2Nlc3MucGlkID09PSBcIm51bWJlclwiICYmXG4gIHR5cGVvZiBwcm9jZXNzLm9uID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBrRXhpdEVtaXR0ZXIgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcInNpZ25hbC1leGl0IGVtaXR0ZXJcIik7XG4vLyB0ZWVueSBzcGVjaWFsIHB1cnBvc2UgZWVcbmNsYXNzIEVtaXR0ZXIge1xuICBlbWl0dGVkID0ge1xuICAgIGFmdGVyRXhpdDogZmFsc2UsXG4gICAgZXhpdDogZmFsc2UsXG4gIH07XG4gIGxpc3RlbmVycyA9IHtcbiAgICBhZnRlckV4aXQ6IFtdLFxuICAgIGV4aXQ6IFtdLFxuICB9O1xuICBjb3VudCA9IDA7XG4gIGlkID0gTWF0aC5yYW5kb20oKTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmIChnbG9iYWxba0V4aXRFbWl0dGVyXSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIGdsb2JhbFtrRXhpdEVtaXR0ZXJdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrRXhpdEVtaXR0ZXIsIHtcbiAgICAgIHZhbHVlOiB0aGlzLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG4gIG9uKGV2OiBhbnksIGZuOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdGhpcy5saXN0ZW5lcnNbZXZdLnB1c2goZm4pO1xuICB9XG4gIHJlbW92ZUxpc3RlbmVyKGV2OiBhbnksIGZuOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgbGlzdCA9IHRoaXMubGlzdGVuZXJzW2V2XTtcbiAgICBjb25zdCBpID0gbGlzdC5pbmRleE9mKGZuKTtcbiAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICBpZiAoaSA9PT0gMCAmJiBsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cbiAgZW1pdChldjogYW55LCBjb2RlOiBhbnksIHNpZ25hbDogYW55KTogYW55IHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgaWYgKHRoaXMuZW1pdHRlZFtldl0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIHRoaXMuZW1pdHRlZFtldl0gPSB0cnVlO1xuICAgIGxldCByZXQgPSBmYWxzZTtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgZm9yIChjb25zdCBmbiBvZiB0aGlzLmxpc3RlbmVyc1tldl0pIHtcbiAgICAgIHJldCA9IGZuKGNvZGUsIHNpZ25hbCkgPT09IHRydWUgfHwgcmV0O1xuICAgIH1cbiAgICBpZiAoZXYgPT09IFwiZXhpdFwiKSB7XG4gICAgICByZXQgPSB0aGlzLmVtaXQoXCJhZnRlckV4aXRcIiwgY29kZSwgc2lnbmFsKSB8fCByZXQ7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuY2xhc3MgU2lnbmFsRXhpdEZhbGxiYWNrIHtcbiAgb25FeGl0KCkge1xuICAgIHJldHVybiAoKSA9PiB7fTtcbiAgfVxuICBsb2FkKCkge31cbiAgdW5sb2FkKCkge31cbn1cbmNsYXNzIFNpZ25hbEV4aXQge1xuICAvLyBcIlNJR0hVUFwiIHRocm93cyBhbiBgRU5PU1lTYCBlcnJvciBvbiBXaW5kb3dzLFxuICAvLyBzbyB1c2UgYSBzdXBwb3J0ZWQgc2lnbmFsIGluc3RlYWRcbiAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gIC8vIEB0cy1pZ25vcmVcbiAgI2h1cFNpZyA9IHByb2Nlc3MucGxhdGZvcm0gPT09IFwid2luMzJcIiA/IFwiU0lHSU5UXCIgOiBcIlNJR0hVUFwiO1xuICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAjZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG4gICNwcm9jZXNzOiBhbnk7XG4gICNvcmlnaW5hbFByb2Nlc3NFbWl0OiBhbnk7XG4gICNvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0OiBhbnk7XG4gICNzaWdMaXN0ZW5lcnMgPSB7fTtcbiAgI2xvYWRlZCA9IGZhbHNlO1xuICAjc2lnbmFsczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3RydWN0b3IocHJvY2VzczogYW55KSB7XG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBub3QgdGhlIHNldCBvZiBhbGwgcG9zc2libGUgc2lnbmFscy5cbiAgICAgKlxuICAgICAqIEl0IElTLCBob3dldmVyLCB0aGUgc2V0IG9mIGFsbCBzaWduYWxzIHRoYXQgdHJpZ2dlclxuICAgICAqIGFuIGV4aXQgb24gZWl0aGVyIExpbnV4IG9yIEJTRCBzeXN0ZW1zLiAgTGludXggaXMgYVxuICAgICAqIHN1cGVyc2V0IG9mIHRoZSBzaWduYWwgbmFtZXMgc3VwcG9ydGVkIG9uIEJTRCwgYW5kXG4gICAgICogdGhlIHVua25vd24gc2lnbmFscyBqdXN0IGZhaWwgdG8gcmVnaXN0ZXIsIHNvIHdlIGNhblxuICAgICAqIGNhdGNoIHRoYXQgZWFzaWx5IGVub3VnaC5cbiAgICAgKlxuICAgICAqIFdpbmRvd3Mgc2lnbmFscyBhcmUgYSBkaWZmZXJlbnQgc2V0LCBzaW5jZSB0aGVyZSBhcmVcbiAgICAgKiBzaWduYWxzIHRoYXQgdGVybWluYXRlIFdpbmRvd3MgcHJvY2Vzc2VzLCBidXQgZG9uJ3RcbiAgICAgKiB0ZXJtaW5hdGUgKG9yIGRvbid0IGV2ZW4gZXhpc3QpIG9uIFBvc2l4IHN5c3RlbXMuXG4gICAgICpcbiAgICAgKiBEb24ndCBib3RoZXIgd2l0aCBTSUdLSUxMLiAgSXQncyB1bmNhdGNoYWJsZSwgd2hpY2hcbiAgICAgKiBtZWFucyB0aGF0IHdlIGNhbid0IGZpcmUgYW55IGNhbGxiYWNrcyBhbnl3YXkuXG4gICAgICpcbiAgICAgKiBJZiBhIHVzZXIgZG9lcyBoYXBwZW4gdG8gcmVnaXN0ZXIgYSBoYW5kbGVyIG9uIGEgbm9uLVxuICAgICAqIGZhdGFsIHNpZ25hbCBsaWtlIFNJR1dJTkNIIG9yIHNvbWV0aGluZywgYW5kIHRoZW5cbiAgICAgKiBleGl0LCBpdCdsbCBlbmQgdXAgZmlyaW5nIGBwcm9jZXNzLmVtaXQoJ2V4aXQnKWAsIHNvXG4gICAgICogdGhlIGhhbmRsZXIgd2lsbCBiZSBmaXJlZCBhbnl3YXkuXG4gICAgICpcbiAgICAgKiBTSUdCVVMsIFNJR0ZQRSwgU0lHU0VHViBhbmQgU0lHSUxMLCB3aGVuIG5vdCByYWlzZWRcbiAgICAgKiBhcnRpZmljaWFsbHksIGluaGVyZW50bHkgbGVhdmUgdGhlIHByb2Nlc3MgaW4gYVxuICAgICAqIHN0YXRlIGZyb20gd2hpY2ggaXQgaXMgbm90IHNhZmUgdG8gdHJ5IGFuZCBlbnRlciBKU1xuICAgICAqIGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICB0aGlzLiNzaWduYWxzLnB1c2goXCJTSUdIVVBcIiwgXCJTSUdJTlRcIiwgXCJTSUdURVJNXCIpO1xuICAgIGlmIChnbG9iYWxUaGlzLnByb2Nlc3MucGxhdGZvcm0gIT09IFwid2luMzJcIikge1xuICAgICAgdGhpcy4jc2lnbmFscy5wdXNoKFxuICAgICAgICBcIlNJR0FMUk1cIixcbiAgICAgICAgXCJTSUdBQlJUXCIsXG4gICAgICAgIFwiU0lHVlRBTFJNXCIsXG4gICAgICAgIFwiU0lHWENQVVwiLFxuICAgICAgICBcIlNJR1hGU1pcIixcbiAgICAgICAgXCJTSUdVU1IyXCIsXG4gICAgICAgIFwiU0lHVFJBUFwiLFxuICAgICAgICBcIlNJR1NZU1wiLFxuICAgICAgICBcIlNJR1FVSVRcIixcbiAgICAgICAgXCJTSUdJT1RcIixcbiAgICAgICAgLy8gc2hvdWxkIGRldGVjdCBwcm9maWxlciBhbmQgZW5hYmxlL2Rpc2FibGUgYWNjb3JkaW5nbHkuXG4gICAgICAgIC8vIHNlZSAjMjFcbiAgICAgICAgLy8gJ1NJR1BST0YnXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoZ2xvYmFsVGhpcy5wcm9jZXNzLnBsYXRmb3JtID09PSBcImxpbnV4XCIpIHtcbiAgICAgIHRoaXMuI3NpZ25hbHMucHVzaChcIlNJR0lPXCIsIFwiU0lHUE9MTFwiLCBcIlNJR1BXUlwiLCBcIlNJR1NUS0ZMVFwiKTtcbiAgICB9XG4gICAgdGhpcy4jcHJvY2VzcyA9IHByb2Nlc3M7XG4gICAgLy8geyA8c2lnbmFsPjogPGxpc3RlbmVyIGZuPiwgLi4uIH1cbiAgICB0aGlzLiNzaWdMaXN0ZW5lcnMgPSB7fTtcbiAgICBmb3IgKGNvbnN0IHNpZyBvZiB0aGlzLiNzaWduYWxzKSB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICB0aGlzLiNzaWdMaXN0ZW5lcnNbc2lnXSA9ICgpID0+IHtcbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG90aGVyIGxpc3RlbmVycywgYW4gZXhpdCBpcyBjb21pbmchXG4gICAgICAgIC8vIFNpbXBsZXN0IHdheTogcmVtb3ZlIHVzIGFuZCB0aGVuIHJlLXNlbmQgdGhlIHNpZ25hbC5cbiAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoaXMgd2lsbCBraWxsIHRoZSBwcm9jZXNzLCBzbyB3ZSBjYW5cbiAgICAgICAgLy8gc2FmZWx5IGVtaXQgbm93LlxuICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLiNwcm9jZXNzLmxpc3RlbmVycyhzaWcpO1xuICAgICAgICBsZXQgeyBjb3VudCB9ID0gdGhpcy4jZW1pdHRlcjtcbiAgICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIHRoZSBmYWN0IHRoYXQgc2lnbmFsLWV4aXQgdjMgYW5kIHNpZ25hbFxuICAgICAgICAvLyBleGl0IHY0IGFyZSBub3QgYXdhcmUgb2YgZWFjaCBvdGhlciwgYW5kIGVhY2ggd2lsbCBhdHRlbXB0IHRvIGxldFxuICAgICAgICAvLyB0aGUgb3RoZXIgaGFuZGxlIGl0LCBzbyBuZWl0aGVyIG9mIHRoZW0gZG8uIFRvIGNvcnJlY3QgdGhpcywgd2VcbiAgICAgICAgLy8gZGV0ZWN0IGlmIHdlJ3JlIHRoZSBvbmx5IGhhbmRsZXIgKmV4Y2VwdCogZm9yIHByZXZpb3VzIHZlcnNpb25zXG4gICAgICAgIC8vIG9mIHNpZ25hbC1leGl0LCBhbmQgaW5jcmVtZW50IGJ5IHRoZSBjb3VudCBvZiBsaXN0ZW5lcnMgaXQgaGFzXG4gICAgICAgIC8vIGNyZWF0ZWQuXG4gICAgICAgIC8qIGM4IGlnbm9yZSBzdGFydCAqL1xuICAgICAgICBjb25zdCBwID0gcHJvY2VzcztcbiAgICAgICAgaWYgKHR5cGVvZiBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBwLl9fc2lnbmFsX2V4aXRfZW1pdHRlcl9fLmNvdW50ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgY291bnQgKz0gcC5fX3NpZ25hbF9leGl0X2VtaXR0ZXJfXy5jb3VudDtcbiAgICAgICAgfVxuICAgICAgICAvKiBjOCBpZ25vcmUgc3RvcCAqL1xuICAgICAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gY291bnQpIHtcbiAgICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgICAgIGNvbnN0IHJldCA9IHRoaXMuI2VtaXR0ZXIuZW1pdChcImV4aXRcIiwgbnVsbCwgc2lnKTtcbiAgICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgICAgICBjb25zdCBzID0gc2lnID09PSBcIlNJR0hVUFwiID8gdGhpcy4jaHVwU2lnIDogc2lnO1xuICAgICAgICAgIGlmICghcmV0KSBwcm9jZXNzLmtpbGwocHJvY2Vzcy5waWQsIHMpO1xuICAgICAgICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMuI29yaWdpbmFsUHJvY2Vzc1JlYWxseUV4aXQgPSBwcm9jZXNzLnJlYWxseUV4aXQ7XG4gICAgdGhpcy4jb3JpZ2luYWxQcm9jZXNzRW1pdCA9IHByb2Nlc3MuZW1pdDtcbiAgfVxuICBvbkV4aXQoY2I6IGFueSwgb3B0czogYW55KSB7XG4gICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgaWYgKCFwcm9jZXNzT2sodGhpcy4jcHJvY2VzcykpIHtcbiAgICAgIHJldHVybiAoKSA9PiB7fTtcbiAgICB9XG4gICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICBpZiAodGhpcy4jbG9hZGVkID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICAgIGNvbnN0IGV2ID0gb3B0cz8uYWx3YXlzTGFzdCA/IFwiYWZ0ZXJFeGl0XCIgOiBcImV4aXRcIjtcbiAgICB0aGlzLiNlbWl0dGVyLm9uKGV2LCBjYik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMuI2VtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoZXYsIGNiKTtcbiAgICAgIGlmICh0aGlzLiNlbWl0dGVyLmxpc3RlbmVyc1tcImV4aXRcIl0ubGVuZ3RoID09PSAwICYmIHRoaXMuI2VtaXR0ZXIubGlzdGVuZXJzW1wiYWZ0ZXJFeGl0XCJdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnVubG9hZCgpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgbG9hZCgpIHtcbiAgICBpZiAodGhpcy4jbG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuI2xvYWRlZCA9IHRydWU7XG4gICAgLy8gVGhpcyBpcyB0aGUgbnVtYmVyIG9mIG9uU2lnbmFsRXhpdCdzIHRoYXQgYXJlIGluIHBsYXkuXG4gICAgLy8gSXQncyBpbXBvcnRhbnQgc28gdGhhdCB3ZSBjYW4gY291bnQgdGhlIGNvcnJlY3QgbnVtYmVyIG9mXG4gICAgLy8gbGlzdGVuZXJzIG9uIHNpZ25hbHMsIGFuZCBkb24ndCB3YWl0IGZvciB0aGUgb3RoZXIgb25lIHRvXG4gICAgLy8gaGFuZGxlIGl0IGluc3RlYWQgb2YgdXMuXG4gICAgdGhpcy4jZW1pdHRlci5jb3VudCArPSAxO1xuICAgIGZvciAoY29uc3Qgc2lnIG9mIHRoaXMuI3NpZ25hbHMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgZm4gPSB0aGlzLiNzaWdMaXN0ZW5lcnNbc2lnXTtcbiAgICAgICAgaWYgKGZuKSB0aGlzLiNwcm9jZXNzLm9uKHNpZywgZm4pO1xuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLiNwcm9jZXNzLmVtaXQgPSAoZXY6IGFueSwgLi4uYTogYW55KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy4jcHJvY2Vzc0VtaXQoZXYsIC4uLmEpO1xuICAgIH07XG4gICAgdGhpcy4jcHJvY2Vzcy5yZWFsbHlFeGl0ID0gKGNvZGU6IGFueSkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuI3Byb2Nlc3NSZWFsbHlFeGl0KGNvZGUpO1xuICAgIH07XG4gIH1cbiAgdW5sb2FkKCkge1xuICAgIGlmICghdGhpcy4jbG9hZGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuI2xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuI3NpZ25hbHMuZm9yRWFjaCgoc2lnKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMuI3NpZ0xpc3RlbmVyc1tzaWddO1xuICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICBpZiAoIWxpc3RlbmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkxpc3RlbmVyIG5vdCBkZWZpbmVkIGZvciBzaWduYWw6IFwiICsgc2lnKTtcbiAgICAgIH1cbiAgICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLiNwcm9jZXNzLnJlbW92ZUxpc3RlbmVyKHNpZywgbGlzdGVuZXIpO1xuICAgICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgLy8gbm8tb3BcbiAgICAgIH1cbiAgICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgfSk7XG4gICAgdGhpcy4jcHJvY2Vzcy5lbWl0ID0gdGhpcy4jb3JpZ2luYWxQcm9jZXNzRW1pdDtcbiAgICB0aGlzLiNwcm9jZXNzLnJlYWxseUV4aXQgPSB0aGlzLiNvcmlnaW5hbFByb2Nlc3NSZWFsbHlFeGl0O1xuICAgIHRoaXMuI2VtaXR0ZXIuY291bnQgLT0gMTtcbiAgfVxuICAjcHJvY2Vzc1JlYWxseUV4aXQoY29kZTogYW55KSB7XG4gICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgaWYgKCFwcm9jZXNzT2sodGhpcy4jcHJvY2VzcykpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlID0gY29kZSB8fCAwO1xuICAgIC8qIGM4IGlnbm9yZSBzdG9wICovXG4gICAgdGhpcy4jZW1pdHRlci5lbWl0KFwiZXhpdFwiLCB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlLCBudWxsKTtcbiAgICByZXR1cm4gdGhpcy4jb3JpZ2luYWxQcm9jZXNzUmVhbGx5RXhpdC5jYWxsKHRoaXMuI3Byb2Nlc3MsIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUpO1xuICB9XG4gICNwcm9jZXNzRW1pdChldjogYW55LCAuLi5hcmdzOiBhbnkpIHtcbiAgICBjb25zdCBvZyA9IHRoaXMuI29yaWdpbmFsUHJvY2Vzc0VtaXQ7XG4gICAgaWYgKGV2ID09PSBcImV4aXRcIiAmJiBwcm9jZXNzT2sodGhpcy4jcHJvY2VzcykpIHtcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICB0aGlzLiNwcm9jZXNzLmV4aXRDb2RlID0gYXJnc1swXTtcbiAgICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICB9XG4gICAgICAvKiBjOCBpZ25vcmUgc3RhcnQgKi9cbiAgICAgIGNvbnN0IHJldCA9IG9nLmNhbGwodGhpcy4jcHJvY2VzcywgZXYsIC4uLmFyZ3MpO1xuICAgICAgLyogYzggaWdub3JlIHN0YXJ0ICovXG4gICAgICB0aGlzLiNlbWl0dGVyLmVtaXQoXCJleGl0XCIsIHRoaXMuI3Byb2Nlc3MuZXhpdENvZGUsIG51bGwpO1xuICAgICAgLyogYzggaWdub3JlIHN0b3AgKi9cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBvZy5jYWxsKHRoaXMuI3Byb2Nlc3MsIGV2LCAuLi5hcmdzKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IHNpZ25hbEV4aXQ6IFNpZ25hbEV4aXQgfCBTaWduYWxFeGl0RmFsbGJhY2sgfCBudWxsID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IG9uRXhpdCA9IChcbiAgY2I6IGFueSxcbiAgb3B0cz86IHtcbiAgICBhbHdheXNMYXN0PzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgfSxcbikgPT4ge1xuICBpZiAoIXNpZ25hbEV4aXQpIHtcbiAgICBzaWduYWxFeGl0ID0gcHJvY2Vzc09rKHByb2Nlc3MpID8gbmV3IFNpZ25hbEV4aXQocHJvY2VzcykgOiBuZXcgU2lnbmFsRXhpdEZhbGxiYWNrKCk7XG4gIH1cbiAgcmV0dXJuIHNpZ25hbEV4aXQub25FeGl0KGNiLCBvcHRzKTtcbn07XG4iLCAiaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtLCBjcmVhdGVXcml0ZVN0cmVhbSwgbWtkaXJTeW5jLCBTdGF0cyB9IGZyb20gXCJub2RlOmZzXCI7XG5pbXBvcnQgeyBzdGF0IH0gZnJvbSBcIm5vZGU6ZnMvcHJvbWlzZXNcIjtcbmltcG9ydCB7IGpvaW4sIG5vcm1hbGl6ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IHBpcGVsaW5lIH0gZnJvbSBcIm5vZGU6c3RyZWFtL3Byb21pc2VzXCI7XG5pbXBvcnQgeyB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDaGFpbiBmcm9tIFwiLi92ZW5kb3JzL3N0cmVhbS1jaGFpblwiO1xuaW1wb3J0IHsgcGFyc2VyLCBQaWNrUGFyc2VyLCBTdHJlYW1BcnJheSB9IGZyb20gXCIuL3ZlbmRvcnMvc3RyZWFtLWpzb25cIjtcbmltcG9ydCB7IGlzSlNPTiB9IGZyb20gXCIuL2ZldGNoLXV0aWxzXCI7XG5pbXBvcnQgeyBGbGF0dGVuLCBGdW5jdGlvblJldHVybmluZ1BhZ2luYXRlZFByb21pc2UsIFVzZUNhY2hlZFByb21pc2VSZXR1cm5UeXBlIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IENhY2hlZFByb21pc2VPcHRpb25zLCB1c2VDYWNoZWRQcm9taXNlIH0gZnJvbSBcIi4vdXNlQ2FjaGVkUHJvbWlzZVwiO1xuaW1wb3J0IHsgaGFzaCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxudHlwZSBSZXF1ZXN0SW5mbyA9IHN0cmluZyB8IFVSTCB8IGdsb2JhbFRoaXMuUmVxdWVzdDtcblxuYXN5bmMgZnVuY3Rpb24gY2FjaGUodXJsOiBSZXF1ZXN0SW5mbywgZGVzdGluYXRpb246IHN0cmluZywgZmV0Y2hPcHRpb25zPzogUmVxdWVzdEluaXQpIHtcbiAgaWYgKHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgfHwgdXJsLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpIHx8IHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpIHtcbiAgICByZXR1cm4gYXdhaXQgY2FjaGVVUkwodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgfSBlbHNlIGlmICh1cmwuc3RhcnRzV2l0aChcImZpbGU6Ly9cIikpIHtcbiAgICByZXR1cm4gYXdhaXQgY2FjaGVGaWxlKFxuICAgICAgbm9ybWFsaXplKGRlY29kZVVSSUNvbXBvbmVudChuZXcgVVJMKHVybCkucGF0aG5hbWUpKSxcbiAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgZmV0Y2hPcHRpb25zPy5zaWduYWwgPyBmZXRjaE9wdGlvbnMuc2lnbmFsIDogdW5kZWZpbmVkLFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiT25seSBIVFRQKFMpIG9yIGZpbGUgVVJMcyBhcmUgc3VwcG9ydGVkXCIpO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhY2hlVVJMKHVybDogUmVxdWVzdEluZm8sIGRlc3RpbmF0aW9uOiBzdHJpbmcsIGZldGNoT3B0aW9ucz86IFJlcXVlc3RJbml0KSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBmZXRjaE9wdGlvbnMpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggVVJMXCIpO1xuICB9XG5cbiAgaWYgKCFpc0pTT04ocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJjb250ZW50LXR5cGVcIikpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVVJMIGRvZXMgbm90IHJldHVybiBKU09OXCIpO1xuICB9XG4gIGlmICghcmVzcG9uc2UuYm9keSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byByZXRyaWV2ZSBleHBlY3RlZCBKU09OIGNvbnRlbnQ6IFJlc3BvbnNlIGJvZHkgaXMgbWlzc2luZyBvciBpbmFjY2Vzc2libGUuXCIpO1xuICB9XG4gIGF3YWl0IHBpcGVsaW5lKFxuICAgIHJlc3BvbnNlLmJvZHkgYXMgdW5rbm93biBhcyBOb2RlSlMuUmVhZGFibGVTdHJlYW0sXG4gICAgY3JlYXRlV3JpdGVTdHJlYW0oZGVzdGluYXRpb24pLFxuICAgIGZldGNoT3B0aW9ucz8uc2lnbmFsID8geyBzaWduYWw6IGZldGNoT3B0aW9ucy5zaWduYWwgfSA6IHVuZGVmaW5lZCxcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FjaGVGaWxlKHNvdXJjZTogc3RyaW5nLCBkZXN0aW5hdGlvbjogc3RyaW5nLCBhYm9ydFNpZ25hbD86IEFib3J0U2lnbmFsKSB7XG4gIGF3YWl0IHBpcGVsaW5lKFxuICAgIGNyZWF0ZVJlYWRTdHJlYW0oc291cmNlKSxcbiAgICBjcmVhdGVXcml0ZVN0cmVhbShkZXN0aW5hdGlvbiksXG4gICAgYWJvcnRTaWduYWwgPyB7IHNpZ25hbDogYWJvcnRTaWduYWwgfSA6IHVuZGVmaW5lZCxcbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2FjaGVVUkxJZk5lY2Vzc2FyeShcbiAgdXJsOiBSZXF1ZXN0SW5mbyxcbiAgZm9sZGVyOiBzdHJpbmcsXG4gIGZpbGVOYW1lOiBzdHJpbmcsXG4gIGZvcmNlVXBkYXRlOiBib29sZWFuLFxuICBmZXRjaE9wdGlvbnM/OiBSZXF1ZXN0SW5pdCxcbikge1xuICBjb25zdCBkZXN0aW5hdGlvbiA9IGpvaW4oZm9sZGVyLCBmaWxlTmFtZSk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBzdGF0KGZvbGRlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBta2RpclN5bmMoZm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICBhd2FpdCBjYWNoZSh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZm9yY2VVcGRhdGUpIHtcbiAgICBhd2FpdCBjYWNoZSh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBzdGF0czogU3RhdHMgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgc3RhdHMgPSBhd2FpdCBzdGF0KGRlc3RpbmF0aW9uKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGF3YWl0IGNhY2hlKHVybCwgZGVzdGluYXRpb24sIGZldGNoT3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB1cmwgPT09IFwib2JqZWN0XCIgfHwgdXJsLnN0YXJ0c1dpdGgoXCJodHRwOi8vXCIpIHx8IHVybC5zdGFydHNXaXRoKFwiaHR0cHM6Ly9cIikpIHtcbiAgICBjb25zdCBoZWFkUmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIHsgLi4uZmV0Y2hPcHRpb25zLCBtZXRob2Q6IFwiSEVBRFwiIH0pO1xuICAgIGlmICghaGVhZFJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmV0Y2ggVVJMXCIpO1xuICAgIH1cblxuICAgIGlmICghaXNKU09OKGhlYWRSZXNwb25zZS5oZWFkZXJzLmdldChcImNvbnRlbnQtdHlwZVwiKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVSTCBkb2VzIG5vdCByZXR1cm4gSlNPTlwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0TW9kaWZpZWQgPSBEYXRlLnBhcnNlKGhlYWRSZXNwb25zZS5oZWFkZXJzLmdldChcImxhc3QtbW9kaWZpZWRcIikgPz8gXCJcIik7XG4gICAgaWYgKHN0YXRzLnNpemUgPT09IDAgfHwgTnVtYmVyLmlzTmFOKGxhc3RNb2RpZmllZCkgfHwgbGFzdE1vZGlmaWVkID4gc3RhdHMubXRpbWVNcykge1xuICAgICAgYXdhaXQgY2FjaGUodXJsLCBkZXN0aW5hdGlvbiwgZmV0Y2hPcHRpb25zKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gZWxzZSBpZiAodXJsLnN0YXJ0c1dpdGgoXCJmaWxlOi8vXCIpKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNvdXJjZVN0YXRzID0gYXdhaXQgc3RhdChub3JtYWxpemUoZGVjb2RlVVJJQ29tcG9uZW50KG5ldyBVUkwodXJsKS5wYXRobmFtZSkpKTtcbiAgICAgIGlmIChzb3VyY2VTdGF0cy5tdGltZU1zID4gc3RhdHMubXRpbWVNcykge1xuICAgICAgICBhd2FpdCBjYWNoZSh1cmwsIGRlc3RpbmF0aW9uLCBmZXRjaE9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlNvdXJjZSBmaWxlIGNvdWxkIG5vdCBiZSByZWFkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IEhUVFAoUykgb3IgZmlsZSBVUkxzIGFyZSBzdXBwb3J0ZWRcIik7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24qIHN0cmVhbUpzb25GaWxlPFQ+KFxuICBmaWxlUGF0aDogc3RyaW5nLFxuICBwYWdlU2l6ZTogbnVtYmVyLFxuICBhYm9ydFNpZ25hbD86IEFib3J0U2lnbmFsLFxuICBkYXRhUGF0aD86IHN0cmluZyB8IFJlZ0V4cCxcbiAgZmlsdGVyRm4/OiAoaXRlbTogRmxhdHRlbjxUPikgPT4gYm9vbGVhbixcbiAgdHJhbnNmb3JtRm4/OiAoaXRlbTogYW55KSA9PiBULFxuKTogQXN5bmNHZW5lcmF0b3I8VCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW10+IHtcbiAgbGV0IHBhZ2U6IFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdID0gW10gYXMgVCBleHRlbmRzIHVua25vd25bXSA/IFQgOiBUW107XG5cbiAgY29uc3QgcGlwZWxpbmUgPSBDaGFpbihbXG4gICAgY3JlYXRlUmVhZFN0cmVhbShmaWxlUGF0aCksXG4gICAgZGF0YVBhdGggPyBQaWNrUGFyc2VyKHsgZmlsdGVyOiBkYXRhUGF0aCB9KSA6IHBhcnNlcigpLFxuICAgIFN0cmVhbUFycmF5KCksXG4gICAgKGRhdGE6IGFueSkgPT4gdHJhbnNmb3JtRm4/LihkYXRhLnZhbHVlKSA/PyBkYXRhLnZhbHVlLFxuICBdKTtcblxuICBhYm9ydFNpZ25hbD8uYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsICgpID0+IHtcbiAgICBwaXBlbGluZS5kZXN0cm95KCk7XG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgZm9yIGF3YWl0IChjb25zdCBkYXRhIG9mIHBpcGVsaW5lKSB7XG4gICAgICBpZiAoYWJvcnRTaWduYWw/LmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgaWYgKCFmaWx0ZXJGbiB8fCBmaWx0ZXJGbihkYXRhKSkge1xuICAgICAgICBwYWdlLnB1c2goZGF0YSk7XG4gICAgICB9XG4gICAgICBpZiAocGFnZS5sZW5ndGggPj0gcGFnZVNpemUpIHtcbiAgICAgICAgeWllbGQgcGFnZTtcbiAgICAgICAgcGFnZSA9IFtdIGFzIFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHBpcGVsaW5lLmRlc3Ryb3koKTtcbiAgICB0aHJvdyBlO1xuICB9XG5cbiAgaWYgKHBhZ2UubGVuZ3RoID4gMCkge1xuICAgIHlpZWxkIHBhZ2U7XG4gIH1cblxuICByZXR1cm4gW107XG59XG5cbnR5cGUgT3B0aW9uczxUPiA9IHtcbiAgLyoqXG4gICAqIFRoZSBob29rIGV4cGVjdHMgdG8gaXRlcmF0ZSB0aHJvdWdoIGFuIGFycmF5IG9mIGRhdGEsIHNvIGJ5IGRlZmF1bHQsIGl0IGFzc3VtZXMgdGhlIEpTT04gaXQgcmVjZWl2ZXMgaXRzZWxmIHJlcHJlc2VudHMgYW4gYXJyYXkuIEhvd2V2ZXIsIHNvbWV0aW1lcyB0aGUgYXJyYXkgb2YgZGF0YSBpcyB3cmFwcGVkIGluIGFuIG9iamVjdCxcbiAgICogaS5lLiBgeyBcInN1Y2Nlc3NcIjogdHJ1ZSwgXCJkYXRhXCI6IFvigKZdIH1gLCBvciBldmVuIGB7IFwic3VjY2Vzc1wiOiB0cnVlLCBcInJlc3VsdHNcIjogeyBcImRhdGFcIjogW+KApl0gfSB9YC4gSW4gdGhvc2UgY2FzZXMsIHlvdSBjYW4gdXNlIGBkYXRhUGF0aGAgdG8gc3BlY2lmeSB3aGVyZSB0aGUgZGF0YSBhcnJheSBjYW4gYmUgZm91bmQuXG4gICAqXG4gICAqIEByZW1hcmsgSWYgeW91ciBKU09OIG9iamVjdCBoYXMgbXVsdGlwbGUgYXJyYXlzIHRoYXQgeW91IHdhbnQgdG8gc3RyZWFtIGRhdGEgZnJvbSwgeW91IGNhbiBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHN0cmVhbSB0aHJvdWdoIGFsbCBvZiB0aGVtLlxuICAgKlxuICAgKiBAZXhhbXBsZSBGb3IgYHsgXCJzdWNjZXNzXCI6IHRydWUsIFwiZGF0YVwiOiBb4oCmXSB9YCwgZGF0YVBhdGggd291bGQgYmUgYGRhdGFgXG4gICAqIEBleGFtcGxlIEZvciBgeyBcInN1Y2Nlc3NcIjogdHJ1ZSwgXCJyZXN1bHRzXCI6IHsgXCJkYXRhXCI6IFvigKZdIH0gfWAsIGRhdGFQYXRoIHdvdWxkIGJlIGByZXN1bHRzLmRhdGFgXG4gICAqIEBleGFtcGxlIEZvciBgeyBcInN1Y2Nlc3NcIjogdHJ1ZSwgXCJyZXN1bHRzXCI6IHsgXCJmaXJzdF9saXN0XCI6IFvigKZdLCBcInNlY29uZF9saXN0XCI6IFvigKZdLCBcInRoaXJkX2xpc3RcIjogW+KApl0gfSB9YCwgZGF0YVBhdGggd291bGQgYmUgYC9ecmVzdWx0c1xcLihmaXJzdF9saXN0fHNlY29uZF9saXN0fHRoaXJkX2xpc3QpJFxuL2AuXG4gICAqL1xuICBkYXRhUGF0aD86IHN0cmluZyB8IFJlZ0V4cDtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdG8gZGVjaWRlIHdoZXRoZXIgYSBwYXJ0aWN1bGFyIGl0ZW0gc2hvdWxkIGJlIGtlcHQgb3Igbm90LlxuICAgKiBEZWZhdWx0cyB0byBgdW5kZWZpbmVkYCwga2VlcGluZyBhbnkgZW5jb3VudGVyZWQgaXRlbS5cbiAgICpcbiAgICogQHJlbWFyayBUaGUgaG9vayB3aWxsIHJldmFsaWRhdGUgZXZlcnkgdGltZSB0aGUgZmlsdGVyIGZ1bmN0aW9uIGNoYW5nZXMsIHNvIHlvdSBuZWVkIHRvIHVzZSBbdXNlQ2FsbGJhY2tdKGh0dHBzOi8vcmVhY3QuZGV2L3JlZmVyZW5jZS9yZWFjdC91c2VDYWxsYmFjaykgdG8gbWFrZSBzdXJlIGl0IG9ubHkgY2hhbmdlcyB3aGVuIGl0IG5lZWRzIHRvLlxuICAgKi9cbiAgZmlsdGVyPzogKGl0ZW06IEZsYXR0ZW48VD4pID0+IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggaXRlbSBhcyBpdCBpcyBlbmNvdW50ZXJlZC4gVXNlZnVsIGZvciBhIGNvdXBsZSBvZiB0aGluZ3M6XG4gICAqIDEuIGVuc3VyaW5nIHRoYXQgYWxsIGl0ZW1zIGhhdmUgdGhlIGV4cGVjdGVkIHByb3BlcnRpZXMsIGFuZCwgYXMgb24gb3B0aW1pemF0aW9uLCBmb3IgZ2V0dGluZyByaWQgb2YgdGhlIHByb3BlcnRpZXMgdGhhdCB5b3UgZG9uJ3QgY2FyZSBhYm91dC5cbiAgICogMi4gd2hlbiB0b3AtbGV2ZWwgb2JqZWN0cyBhY3R1YWxseSByZXByZXNlbnQgbmVzdGVkIGRhdGEsIHdoaWNoIHNob3VsZCBiZSBmbGF0dGVuZWQuIEluIHRoaXMgY2FzZSwgYHRyYW5zZm9ybWAgY2FuIHJldHVybiBhbiBhcnJheSBvZiBpdGVtcywgYW5kIHRoZSBob29rIHdpbGwgc3RyZWFtIHRocm91Z2ggZWFjaCBvbmUgb2YgdGhvc2UgaXRlbXMsXG4gICAqIHBhc3NpbmcgdGhlbSB0byBgZmlsdGVyYCBldGMuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGEgcGFzc3Rocm91Z2ggZnVuY3Rpb24gaWYgbm90IHByb3ZpZGVkLlxuICAgKlxuICAgKiBAcmVtYXJrIFRoZSBob29rIHdpbGwgcmV2YWxpZGF0ZSBldmVyeSB0aW1lIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gY2hhbmdlcywgc28gaXQgaXMgaW1wb3J0YW50IHRvIHVzZSBbdXNlQ2FsbGJhY2tdKGh0dHBzOi8vcmVhY3QuZGV2L3JlZmVyZW5jZS9yZWFjdC91c2VDYWxsYmFjaykgdG8gZW5zdXJlIGl0IG9ubHkgY2hhbmdlcyB3aGVuIG5lY2Vzc2FyeSB0byBwcmV2ZW50IHVubmVjZXNzYXJ5IHJlLXJlbmRlcnMgb3IgY29tcHV0YXRpb25zLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGBcbiAgICogLy8gRm9yIGRhdGE6IGB7IFwiZGF0YVwiOiBbIHsgXCJ0eXBlXCI6IFwiZm9sZGVyXCIsIFwibmFtZVwiOiBcIml0ZW0gMVwiLCBcImNoaWxkcmVuXCI6IFsgeyBcInR5cGVcIjogXCJpdGVtXCIsIFwibmFtZVwiOiBcIml0ZW0gMlwiIH0sIHsgXCJ0eXBlXCI6IFwiaXRlbVwiLCBcIm5hbWVcIjogXCJpdGVtIDNcIiB9IF0gfSwgeyBcInR5cGVcIjogXCJmb2xkZXJcIiwgXCJuYW1lXCI6IFwiaXRlbSA0XCIsIGNoaWxkcmVuOiBbXSB9IF0gfWBcbiAgICpcbiAgICogdHlwZSBJdGVtID0ge1xuICAgKiAgdHlwZTogXCJpdGVtXCI7XG4gICAqICBuYW1lOiBzdHJpbmc7XG4gICAqIH07XG4gICAqXG4gICAqIHR5cGUgRm9sZGVyID0ge1xuICAgKiAgIHR5cGU6IFwiZm9sZGVyXCI7XG4gICAqICAgbmFtZTogc3RyaW5nO1xuICAgKiAgIGNoaWxkcmVuOiAoSXRlbSB8IEZvbGRlcilbXTtcbiAgICogfTtcbiAgICpcbiAgICogZnVuY3Rpb24gZmxhdHRlbihpdGVtOiBJdGVtIHwgRm9sZGVyKTogeyBuYW1lOiBzdHJpbmcgfVtdIHtcbiAgICogICBjb25zdCBmbGF0dGVuZWQ6IHsgbmFtZTogc3RyaW5nIH1bXSA9IFtdO1xuICAgKiAgIGlmIChpdGVtLnR5cGUgPT09IFwiZm9sZGVyXCIpIHtcbiAgICogICAgIGZsYXR0ZW5lZC5wdXNoKC4uLml0ZW0uY2hpbGRyZW4ubWFwKGZsYXR0ZW4pLmZsYXQoKSk7XG4gICAqICAgfVxuICAgKiAgIGlmIChpdGVtLnR5cGUgPT09IFwiaXRlbVwiKSB7XG4gICAqICAgICBmbGF0dGVuZWQucHVzaCh7IG5hbWU6IGl0ZW0ubmFtZSB9KTtcbiAgICogICB9XG4gICAqICAgcmV0dXJuIGZsYXR0ZW5lZDtcbiAgICogfVxuICAgKlxuICAgKiBjb25zdCB0cmFuc2Zvcm0gPSB1c2VDYWxsYmFjayhmbGF0dGVuLCBbXSk7XG4gICAqIGNvbnN0IGZpbHRlciA9IHVzZUNhbGxiYWNrKChpdGVtOiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAqICAg4oCmXG4gICAqIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgdHJhbnNmb3JtPzogKGl0ZW06IGFueSkgPT4gVDtcbiAgLyoqXG4gICAqIFRoZSBhbW91bnQgb2YgaXRlbXMgdG8gcmV0dXJuIGZvciBlYWNoIHBhZ2UuXG4gICAqIERlZmF1bHRzIHRvIGAyMGAuXG4gICAqL1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbn07XG5cbi8qKlxuICogVGFrZXMgYSBgaHR0cDovL2AsIGBodHRwczovL2Agb3IgYGZpbGU6Ly8vYCBVUkwgcG9pbnRpbmcgdG8gYSBKU09OIHJlc291cmNlLCBjYWNoZXMgaXQgdG8gdGhlIGNvbW1hbmQncyBzdXBwb3J0XG4gKiBmb2xkZXIsIGFuZCBzdHJlYW1zIHRocm91Z2ggaXRzIGNvbnRlbnQuIFVzZWZ1bCB3aGVuIGRlYWxpbmcgd2l0aCBsYXJnZSBKU09OIGFycmF5cyB3aGljaCB3b3VsZCBiZSB0b28gYmlnIHRvIGZpdFxuICogaW4gdGhlIGNvbW1hbmQncyBtZW1vcnkuXG4gKlxuICogQHJlbWFyayBUaGUgSlNPTiByZXNvdXJjZSBuZWVkcyB0byBjb25zaXN0IG9mIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlU3RyZWFtSlNPTiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIHR5cGUgRm9ybXVsYSA9IHsgbmFtZTogc3RyaW5nOyBkZXNjPzogc3RyaW5nIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpbigpOiBSZWFjdC5KU1guRWxlbWVudCB7XG4gKiAgIGNvbnN0IHsgZGF0YSwgaXNMb2FkaW5nLCBwYWdpbmF0aW9uIH0gPSB1c2VTdHJlYW1KU09OPEZvcm11bGE+KFwiaHR0cHM6Ly9mb3JtdWxhZS5icmV3LnNoL2FwaS9mb3JtdWxhLmpzb25cIik7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfSBwYWdpbmF0aW9uPXtwYWdpbmF0aW9ufT5cbiAqICAgICAgIDxMaXN0LlNlY3Rpb24gdGl0bGU9XCJGb3JtdWxhZVwiPlxuICogICAgICAgICB7ZGF0YT8ubWFwKChkKSA9PiA8TGlzdC5JdGVtIGtleT17ZC5uYW1lfSB0aXRsZT17ZC5uYW1lfSBzdWJ0aXRsZT17ZC5kZXNjfSAvPil9XG4gKiAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBMaXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlU3RyZWFtSlNPTiB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICogaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuICogaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG4gKlxuICogdHlwZSBGb3JtdWxhID0geyBuYW1lOiBzdHJpbmc7IGRlc2M/OiBzdHJpbmcgfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNYWluKCk6IFJlYWN0LkpTWC5FbGVtZW50IHtcbiAqICAgY29uc3QgeyBkYXRhLCBpc0xvYWRpbmcsIHBhZ2luYXRpb24gfSA9IHVzZVN0cmVhbUpTT048Rm9ybXVsYT4oYGZpbGU6Ly8vJHtqb2luKGhvbWVkaXIoKSwgXCJEb3dubG9hZHNcIiwgXCJmb3JtdWxhZS5qc29uXCIpfWApO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0+XG4gKiAgICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiRm9ybXVsYWVcIj5cbiAqICAgICAgICAge2RhdGE/Lm1hcCgoZCkgPT4gPExpc3QuSXRlbSBrZXk9e2QubmFtZX0gdGl0bGU9e2QubmFtZX0gc3VidGl0bGU9e2QuZGVzY30gLz4pfVxuICogICAgICAgPC9MaXN0LlNlY3Rpb24+XG4gKiAgICAgPC9MaXN0PlxuICogICApO1xuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdHJlYW1KU09OPFQsIFUgPSB1bmtub3duPih1cmw6IFJlcXVlc3RJbmZvKTogVXNlQ2FjaGVkUHJvbWlzZVJldHVyblR5cGU8VCwgVT47XG5cbi8qKlxuICogVGFrZXMgYSBgaHR0cDovL2AsIGBodHRwczovL2Agb3IgYGZpbGU6Ly8vYCBVUkwgcG9pbnRpbmcgdG8gYSBKU09OIHJlc291cmNlLCBjYWNoZXMgaXQgdG8gdGhlIGNvbW1hbmQncyBzdXBwb3J0XG4gKiBmb2xkZXIsIGFuZCBzdHJlYW1zIHRocm91Z2ggaXRzIGNvbnRlbnQuIFVzZWZ1bCB3aGVuIGRlYWxpbmcgd2l0aCBsYXJnZSBKU09OIGFycmF5cyB3aGljaCB3b3VsZCBiZSB0b28gYmlnIHRvIGZpdFxuICogaW4gdGhlIGNvbW1hbmQncyBtZW1vcnkuXG4gKlxuICogQHJlbWFyayBUaGUgSlNPTiByZXNvdXJjZSBuZWVkcyB0byBjb25zaXN0IG9mIGFuIGFycmF5IG9mIG9iamVjdHNcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBMaXN0LCBlbnZpcm9ubWVudCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZVN0cmVhbUpTT04gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqIGltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbiAqIGltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuICpcbiAqIHR5cGUgRm9ybXVsYSA9IHsgbmFtZTogc3RyaW5nOyBkZXNjPzogc3RyaW5nIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpbigpOiBSZWFjdC5KU1guRWxlbWVudCB7XG4gKiAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICpcbiAqICAgY29uc3QgZm9ybXVsYUZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICogICAgIChpdGVtOiBGb3JtdWxhKSA9PiB7XG4gKiAgICAgICBpZiAoIXNlYXJjaFRleHQpIHJldHVybiB0cnVlO1xuICogICAgICAgcmV0dXJuIGl0ZW0ubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICogICAgIH0sXG4gKiAgICAgW3NlYXJjaFRleHRdLFxuICogICApO1xuICpcbiAqICAgY29uc3QgZm9ybXVsYVRyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChpdGVtOiBhbnkpOiBGb3JtdWxhID0+IHtcbiAqICAgICByZXR1cm4geyBuYW1lOiBpdGVtLm5hbWUsIGRlc2M6IGl0ZW0uZGVzYyB9O1xuICogICB9LCBbXSk7XG4gKlxuICogICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgcGFnaW5hdGlvbiB9ID0gdXNlU3RyZWFtSlNPTihcImh0dHBzOi8vZm9ybXVsYWUuYnJldy5zaC9hcGkvZm9ybXVsYS5qc29uXCIsIHtcbiAqICAgICBpbml0aWFsRGF0YTogW10gYXMgRm9ybXVsYVtdLFxuICogICAgIHBhZ2VTaXplOiAyMCxcbiAqICAgICBmaWx0ZXI6IGZvcm11bGFGaWx0ZXIsXG4gKiAgICAgdHJhbnNmb3JtOiBmb3JtdWxhVHJhbnNmb3JtLFxuICogICB9KTtcbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IHBhZ2luYXRpb249e3BhZ2luYXRpb259IG9uU2VhcmNoVGV4dENoYW5nZT17c2V0U2VhcmNoVGV4dH0+XG4gKiAgICAgICA8TGlzdC5TZWN0aW9uIHRpdGxlPVwiRm9ybXVsYWVcIj5cbiAqICAgICAgICAge2RhdGEubWFwKChkKSA9PiAoXG4gKiAgICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2QubmFtZX0gdGl0bGU9e2QubmFtZX0gc3VidGl0bGU9e2QuZGVzY30gLz5cbiAqICAgICAgICAgKSl9XG4gKiAgICAgICA8L0xpc3QuU2VjdGlvbj5cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGAgc3VwcG9ydCBmb2xkZXIsIGFuZCBzdHJlYW1zIHRocm91Z2ggaXRzIGNvbnRlbnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgTGlzdCwgZW52aXJvbm1lbnQgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG4gKiBpbXBvcnQgeyB1c2VTdHJlYW1KU09OIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKiBpbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbiAqIGltcG9ydCB7IGhvbWVkaXIgfSBmcm9tIFwib3NcIjtcbiAqIGltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuICpcbiAqIHR5cGUgRm9ybXVsYSA9IHsgbmFtZTogc3RyaW5nOyBkZXNjPzogc3RyaW5nIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWFpbigpOiBSZWFjdC5KU1guRWxlbWVudCB7XG4gKiAgIGNvbnN0IFtzZWFyY2hUZXh0LCBzZXRTZWFyY2hUZXh0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICpcbiAqICAgY29uc3QgZm9ybXVsYUZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICogICAgIChpdGVtOiBGb3JtdWxhKSA9PiB7XG4gKiAgICAgICBpZiAoIXNlYXJjaFRleHQpIHJldHVybiB0cnVlO1xuICogICAgICAgcmV0dXJuIGl0ZW0ubmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICogICAgIH0sXG4gKiAgICAgW3NlYXJjaFRleHRdLFxuICogICApO1xuICpcbiAqICAgY29uc3QgZm9ybXVsYVRyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChpdGVtOiBhbnkpOiBGb3JtdWxhID0+IHtcbiAqICAgICByZXR1cm4geyBuYW1lOiBpdGVtLm5hbWUsIGRlc2M6IGl0ZW0uZGVzYyB9O1xuICogICB9LCBbXSk7XG4gKlxuICogICBjb25zdCB7IGRhdGEsIGlzTG9hZGluZywgcGFnaW5hdGlvbiB9ID0gdXNlU3RyZWFtSlNPTihgZmlsZTovLy8ke2pvaW4oaG9tZWRpcigpLCBcIkRvd25sb2Fkc1wiLCBcImZvcm11bGFlLmpzb25cIil9YCwge1xuICogICAgIGluaXRpYWxEYXRhOiBbXSBhcyBGb3JtdWxhW10sXG4gKiAgICAgcGFnZVNpemU6IDIwLFxuICogICAgIGZpbHRlcjogZm9ybXVsYUZpbHRlcixcbiAqICAgICB0cmFuc2Zvcm06IGZvcm11bGFUcmFuc2Zvcm0sXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8TGlzdCBpc0xvYWRpbmc9e2lzTG9hZGluZ30gcGFnaW5hdGlvbj17cGFnaW5hdGlvbn0gb25TZWFyY2hUZXh0Q2hhbmdlPXtzZXRTZWFyY2hUZXh0fT5cbiAqICAgICAgIDxMaXN0LlNlY3Rpb24gdGl0bGU9XCJGb3JtdWxhZVwiPlxuICogICAgICAgICB7ZGF0YS5tYXAoKGQpID0+IChcbiAqICAgICAgICAgICA8TGlzdC5JdGVtIGtleT17ZC5uYW1lfSB0aXRsZT17ZC5uYW1lfSBzdWJ0aXRsZT17ZC5kZXNjfSAvPlxuICogICAgICAgICApKX1cbiAqICAgICAgIDwvTGlzdC5TZWN0aW9uPlxuICogICAgIDwvTGlzdD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlU3RyZWFtSlNPTjxULCBVIGV4dGVuZHMgYW55W10gPSBhbnlbXT4oXG4gIHVybDogUmVxdWVzdEluZm8sXG4gIG9wdGlvbnM6IE9wdGlvbnM8VD4gJiBSZXF1ZXN0SW5pdCAmIE9taXQ8Q2FjaGVkUHJvbWlzZU9wdGlvbnM8RnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBVPiwgXCJhYm9ydGFibGVcIj4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXSwgVT47XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VTdHJlYW1KU09OPFQsIFUgZXh0ZW5kcyBhbnlbXSA9IGFueVtdPihcbiAgdXJsOiBSZXF1ZXN0SW5mbyxcbiAgb3B0aW9ucz86IE9wdGlvbnM8VD4gJiBSZXF1ZXN0SW5pdCAmIE9taXQ8Q2FjaGVkUHJvbWlzZU9wdGlvbnM8RnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBVPiwgXCJhYm9ydGFibGVcIj4sXG4pOiBVc2VDYWNoZWRQcm9taXNlUmV0dXJuVHlwZTxUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXSwgVT4ge1xuICBjb25zdCB7XG4gICAgaW5pdGlhbERhdGEsXG4gICAgZXhlY3V0ZSxcbiAgICBrZWVwUHJldmlvdXNEYXRhLFxuICAgIG9uRXJyb3IsXG4gICAgb25EYXRhLFxuICAgIG9uV2lsbEV4ZWN1dGUsXG4gICAgZmFpbHVyZVRvYXN0T3B0aW9ucyxcbiAgICBkYXRhUGF0aCxcbiAgICBmaWx0ZXIsXG4gICAgdHJhbnNmb3JtLFxuICAgIHBhZ2VTaXplID0gMjAsXG4gICAgLi4uZmV0Y2hPcHRpb25zXG4gIH0gPSBvcHRpb25zID8/IHt9O1xuICBjb25zdCBwcmV2aW91c1VybCA9IHVzZVJlZjxSZXF1ZXN0SW5mbz4obnVsbCk7XG4gIGNvbnN0IHByZXZpb3VzRGVzdGluYXRpb24gPSB1c2VSZWY8c3RyaW5nPihudWxsKTtcblxuICBjb25zdCB1c2VDYWNoZWRQcm9taXNlT3B0aW9uczogQ2FjaGVkUHJvbWlzZU9wdGlvbnM8RnVuY3Rpb25SZXR1cm5pbmdQYWdpbmF0ZWRQcm9taXNlLCBVPiA9IHtcbiAgICBpbml0aWFsRGF0YSxcbiAgICBleGVjdXRlLFxuICAgIGtlZXBQcmV2aW91c0RhdGEsXG4gICAgb25FcnJvcixcbiAgICBvbkRhdGEsXG4gICAgb25XaWxsRXhlY3V0ZSxcbiAgICBmYWlsdXJlVG9hc3RPcHRpb25zLFxuICB9O1xuXG4gIGNvbnN0IGdlbmVyYXRvclJlZiA9IHVzZVJlZjxBc3luY0dlbmVyYXRvcjxUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXT4gfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udHJvbGxlclJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaGFzTW9yZVJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgcmV0dXJuIHVzZUNhY2hlZFByb21pc2UoXG4gICAgKFxuICAgICAgdXJsOiBSZXF1ZXN0SW5mbyxcbiAgICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgICBmZXRjaE9wdGlvbnM6IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuICAgICAgZGF0YVBhdGg6IHN0cmluZyB8IFJlZ0V4cCB8IHVuZGVmaW5lZCxcbiAgICAgIGZpbHRlcjogKChpdGVtOiBGbGF0dGVuPFQ+KSA9PiBib29sZWFuKSB8IHVuZGVmaW5lZCxcbiAgICAgIHRyYW5zZm9ybTogKChpdGVtOiB1bmtub3duKSA9PiBUKSB8IHVuZGVmaW5lZCxcbiAgICApID0+XG4gICAgICBhc3luYyAoeyBwYWdlIH0pID0+IHtcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBoYXNoKHVybCkgKyBcIi5qc29uXCI7XG4gICAgICAgIGNvbnN0IGZvbGRlciA9IGVudmlyb25tZW50LnN1cHBvcnRQYXRoO1xuICAgICAgICBpZiAocGFnZSA9PT0gMCkge1xuICAgICAgICAgIGNvbnRyb2xsZXJSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgICAgICBjb250cm9sbGVyUmVmLmN1cnJlbnQgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBqb2luKGZvbGRlciwgZmlsZU5hbWUpO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEZvcmNlIHVwZGF0ZSB0aGUgY2FjaGUgd2hlbiB0aGUgVVJMIGNoYW5nZXMgYnV0IHRoZSBjYWNoZSBkZXN0aW5hdGlvbiBkb2VzIG5vdC5cbiAgICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBmb3JjZUNhY2hlVXBkYXRlID0gQm9vbGVhbihcbiAgICAgICAgICAgIHByZXZpb3VzVXJsLmN1cnJlbnQgJiZcbiAgICAgICAgICAgICAgcHJldmlvdXNVcmwuY3VycmVudCAhPT0gdXJsICYmXG4gICAgICAgICAgICAgIHByZXZpb3VzRGVzdGluYXRpb24uY3VycmVudCAmJlxuICAgICAgICAgICAgICBwcmV2aW91c0Rlc3RpbmF0aW9uLmN1cnJlbnQgPT09IGRlc3RpbmF0aW9uLFxuICAgICAgICAgICk7XG4gICAgICAgICAgcHJldmlvdXNVcmwuY3VycmVudCA9IHVybDtcbiAgICAgICAgICBwcmV2aW91c0Rlc3RpbmF0aW9uLmN1cnJlbnQgPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICBhd2FpdCBjYWNoZVVSTElmTmVjZXNzYXJ5KHVybCwgZm9sZGVyLCBmaWxlTmFtZSwgZm9yY2VDYWNoZVVwZGF0ZSwge1xuICAgICAgICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyUmVmLmN1cnJlbnQ/LnNpZ25hbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBnZW5lcmF0b3JSZWYuY3VycmVudCA9IHN0cmVhbUpzb25GaWxlKFxuICAgICAgICAgICAgZGVzdGluYXRpb24sXG4gICAgICAgICAgICBwYWdlU2l6ZSxcbiAgICAgICAgICAgIGNvbnRyb2xsZXJSZWYuY3VycmVudD8uc2lnbmFsLFxuICAgICAgICAgICAgZGF0YVBhdGgsXG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICB0cmFuc2Zvcm0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWdlbmVyYXRvclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHsgaGFzTW9yZTogaGFzTW9yZVJlZi5jdXJyZW50LCBkYXRhOiBbXSBhcyBUIGV4dGVuZHMgdW5rbm93bltdID8gVCA6IFRbXSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgdmFsdWU6IG5ld0RhdGEsIGRvbmUgfSA9IGF3YWl0IGdlbmVyYXRvclJlZi5jdXJyZW50Lm5leHQoKTtcbiAgICAgICAgaGFzTW9yZVJlZi5jdXJyZW50ID0gIWRvbmU7XG4gICAgICAgIHJldHVybiB7IGhhc01vcmU6IGhhc01vcmVSZWYuY3VycmVudCwgZGF0YTogKG5ld0RhdGEgPz8gW10pIGFzIFQgZXh0ZW5kcyB1bmtub3duW10gPyBUIDogVFtdIH07XG4gICAgICB9LFxuICAgIFt1cmwsIHBhZ2VTaXplLCBmZXRjaE9wdGlvbnMsIGRhdGFQYXRoLCBmaWx0ZXIsIHRyYW5zZm9ybV0sXG4gICAgdXNlQ2FjaGVkUHJvbWlzZU9wdGlvbnMsXG4gICk7XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50ICovXG5pbXBvcnQgeyBSZWFkYWJsZSwgV3JpdGFibGUsIER1cGxleCB9IGZyb20gXCJub2RlOnN0cmVhbVwiO1xuXG5leHBvcnQgY29uc3Qgbm9uZSA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5ub25lXCIpO1xuY29uc3Qgc3RvcCA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5zdG9wXCIpO1xuXG5jb25zdCBmaW5hbFN5bWJvbCA9IC8qICNfX1BVUkVfXyAqLyBTeW1ib2wuZm9yKFwib2JqZWN0LXN0cmVhbS5maW5hbFwiKTtcbmNvbnN0IG1hbnlTeW1ib2wgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0ubWFueVwiKTtcbmNvbnN0IGZsdXNoU3ltYm9sID0gLyogI19fUFVSRV9fICovIFN5bWJvbC5mb3IoXCJvYmplY3Qtc3RyZWFtLmZsdXNoXCIpO1xuY29uc3QgZkxpc3RTeW1ib2wgPSAvKiAjX19QVVJFX18gKi8gU3ltYm9sLmZvcihcIm9iamVjdC1zdHJlYW0uZkxpc3RcIik7XG5cbmNvbnN0IGZpbmFsVmFsdWUgPSAodmFsdWU6IGFueSkgPT4gKHsgW2ZpbmFsU3ltYm9sXTogMSwgdmFsdWUgfSk7XG5leHBvcnQgY29uc3QgbWFueSA9ICh2YWx1ZXM6IGFueSkgPT4gKHsgW21hbnlTeW1ib2xdOiAxLCB2YWx1ZXMgfSk7XG5cbmNvbnN0IGlzRmluYWxWYWx1ZSA9IChvOiBhbnkpID0+IG8gJiYgb1tmaW5hbFN5bWJvbF0gPT09IDE7XG5jb25zdCBpc01hbnkgPSAobzogYW55KSA9PiBvICYmIG9bbWFueVN5bWJvbF0gPT09IDE7XG5jb25zdCBpc0ZsdXNoYWJsZSA9IChvOiBhbnkpID0+IG8gJiYgb1tmbHVzaFN5bWJvbF0gPT09IDE7XG5jb25zdCBpc0Z1bmN0aW9uTGlzdCA9IChvOiBhbnkpID0+IG8gJiYgb1tmTGlzdFN5bWJvbF0gPT09IDE7XG5cbmNvbnN0IGdldEZpbmFsVmFsdWUgPSAobzogYW55KSA9PiBvLnZhbHVlO1xuY29uc3QgZ2V0TWFueVZhbHVlcyA9IChvOiBhbnkpID0+IG8udmFsdWVzO1xuY29uc3QgZ2V0RnVuY3Rpb25MaXN0ID0gKG86IGFueSkgPT4gby5mTGlzdDtcblxuZXhwb3J0IGNvbnN0IGNvbWJpbmVNYW55TXV0ID0gKGE6IGFueSwgYjogYW55KSA9PiB7XG4gIGNvbnN0IHZhbHVlcyA9IGEgPT09IG5vbmUgPyBbXSA6IGE/LlttYW55U3ltYm9sXSA9PT0gMSA/IGEudmFsdWVzIDogW2FdO1xuICBpZiAoYiA9PT0gbm9uZSkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfSBlbHNlIGlmIChiPy5bbWFueVN5bWJvbF0gPT09IDEpIHtcbiAgICB2YWx1ZXMucHVzaCguLi5iLnZhbHVlcyk7XG4gIH0gZWxzZSB7XG4gICAgdmFsdWVzLnB1c2goYik7XG4gIH1cbiAgcmV0dXJuIG1hbnkodmFsdWVzKTtcbn07XG5cbmV4cG9ydCBjb25zdCBmbHVzaGFibGUgPSAod3JpdGU6ICh2YWx1ZTogYW55KSA9PiBhbnksIGZpbmFsID0gbnVsbCkgPT4ge1xuICBjb25zdCBmbiA9IGZpbmFsID8gKHZhbHVlOiBhbnkpID0+ICh2YWx1ZSA9PT0gbm9uZSA/IGZpbmFsVmFsdWUodW5kZWZpbmVkKSA6IHdyaXRlKHZhbHVlKSkgOiB3cml0ZTtcbiAgLy8gQHRzLWlnbm9yZVxuICBmbltmbHVzaFN5bWJvbF0gPSAxO1xuICByZXR1cm4gZm47XG59O1xuXG5jb25zdCBzZXRGdW5jdGlvbkxpc3QgPSAobzogYW55LCBmbnM6IGFueSkgPT4ge1xuICBvLmZMaXN0ID0gZm5zO1xuICBvW2ZMaXN0U3ltYm9sXSA9IDE7XG4gIHJldHVybiBvO1xufTtcblxuLy8gaXMqTm9kZVN0cmVhbSBmdW5jdGlvbnMgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi9tYXN0ZXIvbGliL2ludGVybmFsL3N0cmVhbXMvdXRpbHMuanNcbmNvbnN0IGlzUmVhZGFibGVOb2RlU3RyZWFtID0gKG9iajogYW55KSA9PlxuICBvYmogJiZcbiAgdHlwZW9mIG9iai5waXBlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgdHlwZW9mIG9iai5vbiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICghb2JqLl93cml0YWJsZVN0YXRlIHx8ICh0eXBlb2Ygb2JqLl9yZWFkYWJsZVN0YXRlID09PSBcIm9iamVjdFwiID8gb2JqLl9yZWFkYWJsZVN0YXRlLnJlYWRhYmxlIDogbnVsbCkgIT09IGZhbHNlKSAmJiAvLyBEdXBsZXhcbiAgKCFvYmouX3dyaXRhYmxlU3RhdGUgfHwgb2JqLl9yZWFkYWJsZVN0YXRlKTsgLy8gV3JpdGFibGUgaGFzIC5waXBlLlxuXG5jb25zdCBpc1dyaXRhYmxlTm9kZVN0cmVhbSA9IChvYmo6IGFueSkgPT5cbiAgb2JqICYmXG4gIHR5cGVvZiBvYmoud3JpdGUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2Ygb2JqLm9uID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgKCFvYmouX3JlYWRhYmxlU3RhdGUgfHwgKHR5cGVvZiBvYmouX3dyaXRhYmxlU3RhdGUgPT09IFwib2JqZWN0XCIgPyBvYmouX3dyaXRhYmxlU3RhdGUud3JpdGFibGUgOiBudWxsKSAhPT0gZmFsc2UpOyAvLyBEdXBsZXhcblxuY29uc3QgaXNEdXBsZXhOb2RlU3RyZWFtID0gKG9iajogYW55KSA9PlxuICBvYmogJiZcbiAgdHlwZW9mIG9iai5waXBlID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgb2JqLl9yZWFkYWJsZVN0YXRlICYmXG4gIHR5cGVvZiBvYmoub24gPT09IFwiZnVuY3Rpb25cIiAmJlxuICB0eXBlb2Ygb2JqLndyaXRlID09PSBcImZ1bmN0aW9uXCI7XG5cbmNvbnN0IGlzUmVhZGFibGVXZWJTdHJlYW0gPSAob2JqOiBhbnkpID0+IG9iaiAmJiBnbG9iYWxUaGlzLlJlYWRhYmxlU3RyZWFtICYmIG9iaiBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuUmVhZGFibGVTdHJlYW07XG5cbmNvbnN0IGlzV3JpdGFibGVXZWJTdHJlYW0gPSAob2JqOiBhbnkpID0+IG9iaiAmJiBnbG9iYWxUaGlzLldyaXRhYmxlU3RyZWFtICYmIG9iaiBpbnN0YW5jZW9mIGdsb2JhbFRoaXMuV3JpdGFibGVTdHJlYW07XG5cbmNvbnN0IGlzRHVwbGV4V2ViU3RyZWFtID0gKG9iajogYW55KSA9PlxuICBvYmogJiZcbiAgZ2xvYmFsVGhpcy5SZWFkYWJsZVN0cmVhbSAmJlxuICBvYmoucmVhZGFibGUgaW5zdGFuY2VvZiBnbG9iYWxUaGlzLlJlYWRhYmxlU3RyZWFtICYmXG4gIGdsb2JhbFRoaXMuV3JpdGFibGVTdHJlYW0gJiZcbiAgb2JqLndyaXRhYmxlIGluc3RhbmNlb2YgZ2xvYmFsVGhpcy5Xcml0YWJsZVN0cmVhbTtcblxuY29uc3QgZ3JvdXBGdW5jdGlvbnMgPSAob3V0cHV0OiBhbnksIGZuOiBhbnksIGluZGV4OiBhbnksIGZuczogYW55KSA9PiB7XG4gIGlmIChcbiAgICBpc0R1cGxleE5vZGVTdHJlYW0oZm4pIHx8XG4gICAgKCFpbmRleCAmJiBpc1JlYWRhYmxlTm9kZVN0cmVhbShmbikpIHx8XG4gICAgKGluZGV4ID09PSBmbnMubGVuZ3RoIC0gMSAmJiBpc1dyaXRhYmxlTm9kZVN0cmVhbShmbikpXG4gICkge1xuICAgIG91dHB1dC5wdXNoKGZuKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG4gIGlmIChpc0R1cGxleFdlYlN0cmVhbShmbikpIHtcbiAgICBvdXRwdXQucHVzaChEdXBsZXguZnJvbVdlYihmbiwgeyBvYmplY3RNb2RlOiB0cnVlIH0pKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG4gIGlmICghaW5kZXggJiYgaXNSZWFkYWJsZVdlYlN0cmVhbShmbikpIHtcbiAgICBvdXRwdXQucHVzaChSZWFkYWJsZS5mcm9tV2ViKGZuLCB7IG9iamVjdE1vZGU6IHRydWUgfSkpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgaWYgKGluZGV4ID09PSBmbnMubGVuZ3RoIC0gMSAmJiBpc1dyaXRhYmxlV2ViU3RyZWFtKGZuKSkge1xuICAgIG91dHB1dC5wdXNoKFdyaXRhYmxlLmZyb21XZWIoZm4sIHsgb2JqZWN0TW9kZTogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBpZiAodHlwZW9mIGZuICE9IFwiZnVuY3Rpb25cIikgdGhyb3cgVHlwZUVycm9yKFwiSXRlbSAjXCIgKyBpbmRleCArIFwiIGlzIG5vdCBhIHByb3BlciBzdHJlYW0sIG5vciBhIGZ1bmN0aW9uLlwiKTtcbiAgaWYgKCFvdXRwdXQubGVuZ3RoKSBvdXRwdXQucHVzaChbXSk7XG4gIGNvbnN0IGxhc3QgPSBvdXRwdXRbb3V0cHV0Lmxlbmd0aCAtIDFdO1xuICBpZiAoQXJyYXkuaXNBcnJheShsYXN0KSkge1xuICAgIGxhc3QucHVzaChmbik7XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0LnB1c2goW2ZuXSk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmNsYXNzIFN0b3AgZXh0ZW5kcyBFcnJvciB7fVxuXG5leHBvcnQgY29uc3QgYXNTdHJlYW0gPSAoZm46IGFueSkgPT4ge1xuICBpZiAodHlwZW9mIGZuICE9IFwiZnVuY3Rpb25cIikgdGhyb3cgVHlwZUVycm9yKFwiT25seSBhIGZ1bmN0aW9uIGlzIGFjY2VwdGVkIGFzIHRoZSBmaXJzdCBhcmd1bWVudFwiKTtcblxuICAvLyBwdW1wIHZhcmlhYmxlc1xuICBsZXQgcGF1c2VkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIGxldCByZXNvbHZlUGF1c2VkOiAoKHZhbHVlOiB2b2lkIHwgUHJvbWlzZUxpa2U8dm9pZD4pID0+IHZvaWQpIHwgbnVsbCA9IG51bGw7XG4gIGNvbnN0IHF1ZXVlOiBhbnlbXSA9IFtdO1xuXG4gIC8vIHBhdXNlL3Jlc3VtZVxuICBjb25zdCByZXN1bWU6IGFueSA9ICgpID0+IHtcbiAgICBpZiAoIXJlc29sdmVQYXVzZWQpIHJldHVybjtcbiAgICByZXNvbHZlUGF1c2VkKCk7XG4gICAgcmVzb2x2ZVBhdXNlZCA9IG51bGw7XG4gICAgcGF1c2VkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG4gIGNvbnN0IHBhdXNlOiBhbnkgPSAoKSA9PiB7XG4gICAgaWYgKHJlc29sdmVQYXVzZWQpIHJldHVybjtcbiAgICBwYXVzZWQgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gKHJlc29sdmVQYXVzZWQgPSByZXNvbHZlKSk7XG4gIH07XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICBsZXQgc3RyZWFtOiBEdXBsZXg7IC8vIHdpbGwgYmUgYXNzaWduZWQgbGF0ZXJcblxuICAvLyBkYXRhIHByb2Nlc3NpbmdcbiAgY29uc3QgcHVzaFJlc3VsdHM6IGFueSA9ICh2YWx1ZXM6IGFueSkgPT4ge1xuICAgIGlmICh2YWx1ZXMgJiYgdHlwZW9mIHZhbHVlcy5uZXh0ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICBxdWV1ZS5wdXNoKHZhbHVlcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGFycmF5XG4gICAgcXVldWUucHVzaCh2YWx1ZXNbU3ltYm9sLml0ZXJhdG9yXSgpKTtcbiAgfTtcbiAgY29uc3QgcHVtcDogYW55ID0gYXN5bmMgKCkgPT4ge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IHBhdXNlZDtcbiAgICAgIGNvbnN0IGdlbiA9IHF1ZXVlW3F1ZXVlLmxlbmd0aCAtIDFdO1xuICAgICAgbGV0IHJlc3VsdCA9IGdlbi5uZXh0KCk7XG4gICAgICBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQudGhlbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgIHF1ZXVlLnBvcCgpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGxldCB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdmFsdWUgPSBhd2FpdCB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHNhbml0aXplKHZhbHVlKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHNhbml0aXplOiBhbnkgPSBhc3luYyAodmFsdWU6IGFueSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBub25lKSByZXR1cm47XG4gICAgaWYgKHZhbHVlID09PSBzdG9wKSB0aHJvdyBuZXcgU3RvcCgpO1xuXG4gICAgaWYgKGlzTWFueSh2YWx1ZSkpIHtcbiAgICAgIHB1c2hSZXN1bHRzKGdldE1hbnlWYWx1ZXModmFsdWUpKTtcbiAgICAgIHJldHVybiBwdW1wKCk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmluYWxWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIC8vIGEgZmluYWwgdmFsdWUgaXMgbm90IHN1cHBvcnRlZCwgaXQgaXMgdHJlYXRlZCBhcyBhIHJlZ3VsYXIgdmFsdWVcbiAgICAgIHZhbHVlID0gZ2V0RmluYWxWYWx1ZSh2YWx1ZSk7XG4gICAgICByZXR1cm4gcHJvY2Vzc1ZhbHVlKHZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXN0cmVhbS5wdXNoKHZhbHVlKSkge1xuICAgICAgcGF1c2UoKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHByb2Nlc3NDaHVuazogYW55ID0gYXN5bmMgKGNodW5rOiBhbnksIGVuY29kaW5nOiBhbnkpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBmbihjaHVuaywgZW5jb2RpbmcpO1xuICAgICAgYXdhaXQgcHJvY2Vzc1ZhbHVlKHZhbHVlKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgU3RvcCkge1xuICAgICAgICBzdHJlYW0ucHVzaChudWxsKTtcbiAgICAgICAgc3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuICBjb25zdCBwcm9jZXNzVmFsdWU6IGFueSA9IGFzeW5jICh2YWx1ZTogYW55KSA9PiB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gdGhlbmFibGVcbiAgICAgIHJldHVybiB2YWx1ZS50aGVuKCh2YWx1ZTogYW55KSA9PiBwcm9jZXNzVmFsdWUodmFsdWUpKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5uZXh0ID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICBwdXNoUmVzdWx0cyh2YWx1ZSk7XG4gICAgICByZXR1cm4gcHVtcCgpO1xuICAgIH1cbiAgICByZXR1cm4gc2FuaXRpemUodmFsdWUpO1xuICB9O1xuXG4gIHN0cmVhbSA9IG5ldyBEdXBsZXgoXG4gICAgT2JqZWN0LmFzc2lnbih7IHdyaXRhYmxlT2JqZWN0TW9kZTogdHJ1ZSwgcmVhZGFibGVPYmplY3RNb2RlOiB0cnVlIH0sIHVuZGVmaW5lZCwge1xuICAgICAgd3JpdGUoY2h1bms6IGFueSwgZW5jb2Rpbmc6IGFueSwgY2FsbGJhY2s6IGFueSkge1xuICAgICAgICBwcm9jZXNzQ2h1bmsoY2h1bmssIGVuY29kaW5nKS50aGVuKFxuICAgICAgICAgICgpID0+IGNhbGxiYWNrKG51bGwpLFxuICAgICAgICAgIChlcnJvcjogYW55KSA9PiBjYWxsYmFjayhlcnJvciksXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgZmluYWwoY2FsbGJhY2s6IGFueSkge1xuICAgICAgICBpZiAoIWlzRmx1c2hhYmxlKGZuKSkge1xuICAgICAgICAgIHN0cmVhbS5wdXNoKG51bGwpO1xuICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzQ2h1bmsobm9uZSwgbnVsbCkudGhlbihcbiAgICAgICAgICAoKSA9PiAoc3RyZWFtLnB1c2gobnVsbCksIGNhbGxiYWNrKG51bGwpKSxcbiAgICAgICAgICAoZXJyb3I6IGFueSkgPT4gY2FsbGJhY2soZXJyb3IpLFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHJlYWQoKSB7XG4gICAgICAgIHJlc3VtZSgpO1xuICAgICAgfSxcbiAgICB9KSxcbiAgKTtcblxuICByZXR1cm4gc3RyZWFtO1xufTtcblxuY29uc3QgcHJvZHVjZVN0cmVhbXMgPSAoaXRlbTogYW55KSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgaWYgKCFpdGVtLmxlbmd0aCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGl0ZW0ubGVuZ3RoID09IDEpIHJldHVybiBpdGVtWzBdICYmIGFzU3RyZWFtKGl0ZW1bMF0pO1xuICAgIHJldHVybiBhc1N0cmVhbShnZW4oLi4uaXRlbSkpO1xuICB9XG4gIHJldHVybiBpdGVtO1xufTtcblxuY29uc3QgbmV4dDogYW55ID0gYXN5bmMgZnVuY3Rpb24qICh2YWx1ZTogYW55LCBmbnM6IGFueSwgaW5kZXg6IGFueSkge1xuICBmb3IgKGxldCBpID0gaW5kZXg7IGkgPD0gZm5zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZS50aGVuID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLy8gdGhlbmFibGVcbiAgICAgIHZhbHVlID0gYXdhaXQgdmFsdWU7XG4gICAgfVxuICAgIGlmICh2YWx1ZSA9PT0gbm9uZSkgYnJlYWs7XG4gICAgaWYgKHZhbHVlID09PSBzdG9wKSB0aHJvdyBuZXcgU3RvcCgpO1xuICAgIGlmIChpc0ZpbmFsVmFsdWUodmFsdWUpKSB7XG4gICAgICB5aWVsZCBnZXRGaW5hbFZhbHVlKHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNNYW55KHZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsdWVzID0gZ2V0TWFueVZhbHVlcyh2YWx1ZSk7XG4gICAgICBpZiAoaSA9PSBmbnMubGVuZ3RoKSB7XG4gICAgICAgIHlpZWxkKiB2YWx1ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHZhbHVlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgIHlpZWxkKiBuZXh0KHZhbHVlc1tqXSwgZm5zLCBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubmV4dCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgZm9yICg7Oykge1xuICAgICAgICBsZXQgZGF0YSA9IHZhbHVlLm5leHQoKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIGRhdGEudGhlbiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICBkYXRhID0gYXdhaXQgZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YS5kb25lKSBicmVhaztcbiAgICAgICAgaWYgKGkgPT0gZm5zLmxlbmd0aCkge1xuICAgICAgICAgIHlpZWxkIGRhdGEudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgeWllbGQqIG5leHQoZGF0YS52YWx1ZSwgZm5zLCBpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpID09IGZucy5sZW5ndGgpIHtcbiAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNvbnN0IGYgPSBmbnNbaV07XG4gICAgdmFsdWUgPSBmKHZhbHVlKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdlbiA9ICguLi5mbnM6IGFueSkgPT4ge1xuICBmbnMgPSBmbnNcbiAgICAuZmlsdGVyKChmbjogYW55KSA9PiBmbilcbiAgICAuZmxhdChJbmZpbml0eSlcbiAgICAubWFwKChmbjogYW55KSA9PiAoaXNGdW5jdGlvbkxpc3QoZm4pID8gZ2V0RnVuY3Rpb25MaXN0KGZuKSA6IGZuKSlcbiAgICAuZmxhdChJbmZpbml0eSk7XG4gIGlmICghZm5zLmxlbmd0aCkge1xuICAgIGZucyA9IFsoeDogYW55KSA9PiB4XTtcbiAgfVxuICBsZXQgZmx1c2hlZCA9IGZhbHNlO1xuICBsZXQgZyA9IGFzeW5jIGZ1bmN0aW9uKiAodmFsdWU6IGFueSkge1xuICAgIGlmIChmbHVzaGVkKSB0aHJvdyBFcnJvcihcIkNhbGwgdG8gYSBmbHVzaGVkIHBpcGUuXCIpO1xuICAgIGlmICh2YWx1ZSAhPT0gbm9uZSkge1xuICAgICAgeWllbGQqIG5leHQodmFsdWUsIGZucywgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZsdXNoZWQgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmbnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY29uc3QgZiA9IGZuc1tpXTtcbiAgICAgICAgaWYgKGlzRmx1c2hhYmxlKGYpKSB7XG4gICAgICAgICAgeWllbGQqIG5leHQoZihub25lKSwgZm5zLCBpICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIGNvbnN0IG5lZWRUb0ZsdXNoID0gZm5zLnNvbWUoKGZuOiBhbnkpID0+IGlzRmx1c2hhYmxlKGZuKSk7XG4gIGlmIChuZWVkVG9GbHVzaCkgZyA9IGZsdXNoYWJsZShnKTtcbiAgcmV0dXJuIHNldEZ1bmN0aW9uTGlzdChnLCBmbnMpO1xufTtcblxuY29uc3Qgd3JpdGUgPSAoaW5wdXQ6IGFueSwgY2h1bms6IGFueSwgZW5jb2Rpbmc6IGFueSwgY2FsbGJhY2s6IGFueSkgPT4ge1xuICBsZXQgZXJyb3I6IGFueSA9IG51bGw7XG4gIHRyeSB7XG4gICAgaW5wdXQud3JpdGUoY2h1bmssIGVuY29kaW5nLCAoZTogYW55KSA9PiBjYWxsYmFjayhlIHx8IGVycm9yKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlcnJvciA9IGU7XG4gIH1cbn07XG5cbmNvbnN0IGZpbmFsID0gKGlucHV0OiBhbnksIGNhbGxiYWNrOiBhbnkpID0+IHtcbiAgbGV0IGVycm9yOiBhbnkgPSBudWxsO1xuICB0cnkge1xuICAgIGlucHV0LmVuZChudWxsLCBudWxsLCAoZTogYW55KSA9PiBjYWxsYmFjayhlIHx8IGVycm9yKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlcnJvciA9IGU7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWQgPSAob3V0cHV0OiBhbnkpID0+IHtcbiAgb3V0cHV0LnJlc3VtZSgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhaW4oZm5zOiBhbnkpIHtcbiAgZm5zID0gZm5zLmZsYXQoSW5maW5pdHkpLmZpbHRlcigoZm46IGFueSkgPT4gZm4pO1xuXG4gIGNvbnN0IHN0cmVhbXMgPSBmbnNcbiAgICAgIC5tYXAoKGZuOiBhbnkpID0+IChpc0Z1bmN0aW9uTGlzdChmbikgPyBnZXRGdW5jdGlvbkxpc3QoZm4pIDogZm4pKVxuICAgICAgLmZsYXQoSW5maW5pdHkpXG4gICAgICAucmVkdWNlKGdyb3VwRnVuY3Rpb25zLCBbXSlcbiAgICAgIC5tYXAocHJvZHVjZVN0cmVhbXMpXG4gICAgICAuZmlsdGVyKChzOiBhbnkpID0+IHMpLFxuICAgIGlucHV0ID0gc3RyZWFtc1swXSxcbiAgICBvdXRwdXQgPSBzdHJlYW1zLnJlZHVjZSgob3V0cHV0OiBhbnksIGl0ZW06IGFueSkgPT4gKG91dHB1dCAmJiBvdXRwdXQucGlwZShpdGVtKSkgfHwgaXRlbSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxuICBsZXQgc3RyZWFtOiBEdXBsZXg7IC8vIHdpbGwgYmUgYXNzaWduZWQgbGF0ZXJcblxuICBsZXQgd3JpdGVNZXRob2QgPSAoY2h1bms6IGFueSwgZW5jb2Rpbmc6IGFueSwgY2FsbGJhY2s6IGFueSkgPT4gd3JpdGUoaW5wdXQsIGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spLFxuICAgIGZpbmFsTWV0aG9kID0gKGNhbGxiYWNrOiBhbnkpID0+IGZpbmFsKGlucHV0LCBjYWxsYmFjayksXG4gICAgcmVhZE1ldGhvZCA9ICgpID0+IHJlYWQob3V0cHV0KTtcblxuICBpZiAoIWlzV3JpdGFibGVOb2RlU3RyZWFtKGlucHV0KSkge1xuICAgIHdyaXRlTWV0aG9kID0gKF8xLCBfMiwgY2FsbGJhY2spID0+IGNhbGxiYWNrKG51bGwpO1xuICAgIGZpbmFsTWV0aG9kID0gKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhudWxsKTtcbiAgICBpbnB1dC5vbihcImVuZFwiLCAoKSA9PiBzdHJlYW0uZW5kKCkpO1xuICB9XG5cbiAgaWYgKGlzUmVhZGFibGVOb2RlU3RyZWFtKG91dHB1dCkpIHtcbiAgICBvdXRwdXQub24oXCJkYXRhXCIsIChjaHVuazogYW55KSA9PiAhc3RyZWFtLnB1c2goY2h1bmspICYmIG91dHB1dC5wYXVzZSgpKTtcbiAgICBvdXRwdXQub24oXCJlbmRcIiwgKCkgPT4gc3RyZWFtLnB1c2gobnVsbCkpO1xuICB9IGVsc2Uge1xuICAgIHJlYWRNZXRob2QgPSAoKSA9PiB7fTsgLy8gbm9wXG4gICAgb3V0cHV0Lm9uKFwiZmluaXNoXCIsICgpID0+IHN0cmVhbS5wdXNoKG51bGwpKTtcbiAgfVxuXG4gIHN0cmVhbSA9IG5ldyBEdXBsZXgoXG4gICAgT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgd3JpdGFibGVPYmplY3RNb2RlOiB0cnVlLCByZWFkYWJsZU9iamVjdE1vZGU6IHRydWUgfSxcbiAgICAgIHtcbiAgICAgICAgcmVhZGFibGU6IGlzUmVhZGFibGVOb2RlU3RyZWFtKG91dHB1dCksXG4gICAgICAgIHdyaXRhYmxlOiBpc1dyaXRhYmxlTm9kZVN0cmVhbShpbnB1dCksXG4gICAgICAgIHdyaXRlOiB3cml0ZU1ldGhvZCxcbiAgICAgICAgZmluYWw6IGZpbmFsTWV0aG9kLFxuICAgICAgICByZWFkOiByZWFkTWV0aG9kLFxuICAgICAgfSxcbiAgICApLFxuICApO1xuICAvLyBAdHMtaWdub3JlXG4gIHN0cmVhbS5zdHJlYW1zID0gc3RyZWFtcztcbiAgLy8gQHRzLWlnbm9yZVxuICBzdHJlYW0uaW5wdXQgPSBpbnB1dDtcbiAgLy8gQHRzLWlnbm9yZVxuICBzdHJlYW0ub3V0cHV0ID0gb3V0cHV0O1xuXG4gIGlmICghaXNSZWFkYWJsZU5vZGVTdHJlYW0ob3V0cHV0KSkge1xuICAgIHN0cmVhbS5yZXN1bWUoKTtcbiAgfVxuXG4gIC8vIGNvbm5lY3QgZXZlbnRzXG4gIHN0cmVhbXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiBpdGVtLm9uKFwiZXJyb3JcIiwgKGVycm9yOiBhbnkpID0+IHN0cmVhbS5lbWl0KFwiZXJyb3JcIiwgZXJyb3IpKSk7XG5cbiAgcmV0dXJuIHN0cmVhbTtcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnQgKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZWxlc3MtZXNjYXBlICovXG5pbXBvcnQgeyBmbHVzaGFibGUsIGdlbiwgbWFueSwgbm9uZSwgY29tYmluZU1hbnlNdXQgfSBmcm9tIFwiLi9zdHJlYW0tY2hhaW5cIjtcbmltcG9ydCB7IFN0cmluZ0RlY29kZXIgfSBmcm9tIFwibm9kZTpzdHJpbmdfZGVjb2RlclwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwibm9kZTpldmVudHNcIjtcblxuY29uc3QgZml4VXRmOFN0cmVhbSA9ICgpID0+IHtcbiAgY29uc3Qgc3RyaW5nRGVjb2RlciA9IG5ldyBTdHJpbmdEZWNvZGVyKCk7XG4gIGxldCBpbnB1dCA9IFwiXCI7XG4gIHJldHVybiBmbHVzaGFibGUoKGNodW5rOiBhbnkpID0+IHtcbiAgICBpZiAoY2h1bmsgPT09IG5vbmUpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGlucHV0ICsgc3RyaW5nRGVjb2Rlci5lbmQoKTtcbiAgICAgIGlucHV0ID0gXCJcIjtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2h1bmsgPT0gXCJzdHJpbmdcIikge1xuICAgICAgaWYgKCFpbnB1dCkgcmV0dXJuIGNodW5rO1xuICAgICAgY29uc3QgcmVzdWx0ID0gaW5wdXQgKyBjaHVuaztcbiAgICAgIGlucHV0ID0gXCJcIjtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGlmIChjaHVuayBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgICAgY29uc3QgcmVzdWx0ID0gaW5wdXQgKyBzdHJpbmdEZWNvZGVyLndyaXRlKGNodW5rKTtcbiAgICAgIGlucHV0ID0gXCJcIjtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBhIHN0cmluZyBvciBhIEJ1ZmZlclwiKTtcbiAgfSk7XG59O1xuXG5jb25zdCBwYXR0ZXJucyA9IHtcbiAgdmFsdWUxOiAvW1xcXCJcXHtcXFtcXF1cXC1cXGRdfHRydWVcXGJ8ZmFsc2VcXGJ8bnVsbFxcYnxcXHN7MSwyNTZ9L3ksXG4gIHN0cmluZzogL1teXFx4MDAtXFx4MWZcXFwiXFxcXF17MSwyNTZ9fFxcXFxbYmZucnRcXFwiXFxcXFxcL118XFxcXHVbXFxkYS1mQS1GXXs0fXxcXFwiL3ksXG4gIGtleTE6IC9bXFxcIlxcfV18XFxzezEsMjU2fS95LFxuICBjb2xvbjogL1xcOnxcXHN7MSwyNTZ9L3ksXG4gIGNvbW1hOiAvW1xcLFxcXVxcfV18XFxzezEsMjU2fS95LFxuICB3czogL1xcc3sxLDI1Nn0veSxcbiAgbnVtYmVyU3RhcnQ6IC9cXGQveSxcbiAgbnVtYmVyRGlnaXQ6IC9cXGR7MCwyNTZ9L3ksXG4gIG51bWJlckZyYWN0aW9uOiAvW1xcLmVFXS95LFxuICBudW1iZXJFeHBvbmVudDogL1tlRV0veSxcbiAgbnVtYmVyRXhwU2lnbjogL1stK10veSxcbn07XG5jb25zdCBNQVhfUEFUVEVSTl9TSVpFID0gMTY7XG5cbmNvbnN0IHZhbHVlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHsgdHJ1ZTogdHJ1ZSwgZmFsc2U6IGZhbHNlLCBudWxsOiBudWxsIH0sXG4gIGV4cGVjdGVkOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0geyBvYmplY3Q6IFwib2JqZWN0U3RvcFwiLCBhcnJheTogXCJhcnJheVN0b3BcIiwgXCJcIjogXCJkb25lXCIgfTtcblxuLy8gbG9uZyBoZXhhZGVjaW1hbCBjb2RlczogXFx1WFhYWFxuY29uc3QgZnJvbUhleCA9IChzOiBzdHJpbmcpID0+IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQocy5zbGljZSgyKSwgMTYpKTtcblxuLy8gc2hvcnQgY29kZXM6IFxcYiBcXGYgXFxuIFxcciBcXHQgXFxcIiBcXFxcIFxcL1xuY29uc3QgY29kZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIGI6IFwiXFxiXCIsXG4gIGY6IFwiXFxmXCIsXG4gIG46IFwiXFxuXCIsXG4gIHI6IFwiXFxyXCIsXG4gIHQ6IFwiXFx0XCIsXG4gICdcIic6ICdcIicsXG4gIFwiXFxcXFwiOiBcIlxcXFxcIixcbiAgXCIvXCI6IFwiL1wiLFxufTtcblxuY29uc3QganNvblBhcnNlciA9IChvcHRpb25zPzogYW55KSA9PiB7XG4gIGxldCBwYWNrS2V5cyA9IHRydWUsXG4gICAgcGFja1N0cmluZ3MgPSB0cnVlLFxuICAgIHBhY2tOdW1iZXJzID0gdHJ1ZSxcbiAgICBzdHJlYW1LZXlzID0gdHJ1ZSxcbiAgICBzdHJlYW1TdHJpbmdzID0gdHJ1ZSxcbiAgICBzdHJlYW1OdW1iZXJzID0gdHJ1ZSxcbiAgICBqc29uU3RyZWFtaW5nID0gZmFsc2U7XG5cbiAgaWYgKG9wdGlvbnMpIHtcbiAgICBcInBhY2tWYWx1ZXNcIiBpbiBvcHRpb25zICYmIChwYWNrS2V5cyA9IHBhY2tTdHJpbmdzID0gcGFja051bWJlcnMgPSBvcHRpb25zLnBhY2tWYWx1ZXMpO1xuICAgIFwicGFja0tleXNcIiBpbiBvcHRpb25zICYmIChwYWNrS2V5cyA9IG9wdGlvbnMucGFja0tleXMpO1xuICAgIFwicGFja1N0cmluZ3NcIiBpbiBvcHRpb25zICYmIChwYWNrU3RyaW5ncyA9IG9wdGlvbnMucGFja1N0cmluZ3MpO1xuICAgIFwicGFja051bWJlcnNcIiBpbiBvcHRpb25zICYmIChwYWNrTnVtYmVycyA9IG9wdGlvbnMucGFja051bWJlcnMpO1xuICAgIFwic3RyZWFtVmFsdWVzXCIgaW4gb3B0aW9ucyAmJiAoc3RyZWFtS2V5cyA9IHN0cmVhbVN0cmluZ3MgPSBzdHJlYW1OdW1iZXJzID0gb3B0aW9ucy5zdHJlYW1WYWx1ZXMpO1xuICAgIFwic3RyZWFtS2V5c1wiIGluIG9wdGlvbnMgJiYgKHN0cmVhbUtleXMgPSBvcHRpb25zLnN0cmVhbUtleXMpO1xuICAgIFwic3RyZWFtU3RyaW5nc1wiIGluIG9wdGlvbnMgJiYgKHN0cmVhbVN0cmluZ3MgPSBvcHRpb25zLnN0cmVhbVN0cmluZ3MpO1xuICAgIFwic3RyZWFtTnVtYmVyc1wiIGluIG9wdGlvbnMgJiYgKHN0cmVhbU51bWJlcnMgPSBvcHRpb25zLnN0cmVhbU51bWJlcnMpO1xuICAgIGpzb25TdHJlYW1pbmcgPSBvcHRpb25zLmpzb25TdHJlYW1pbmc7XG4gIH1cblxuICAhcGFja0tleXMgJiYgKHN0cmVhbUtleXMgPSB0cnVlKTtcbiAgIXBhY2tTdHJpbmdzICYmIChzdHJlYW1TdHJpbmdzID0gdHJ1ZSk7XG4gICFwYWNrTnVtYmVycyAmJiAoc3RyZWFtTnVtYmVycyA9IHRydWUpO1xuXG4gIGxldCBkb25lID0gZmFsc2UsXG4gICAgZXhwZWN0ID0ganNvblN0cmVhbWluZyA/IFwiZG9uZVwiIDogXCJ2YWx1ZVwiLFxuICAgIHBhcmVudCA9IFwiXCIsXG4gICAgb3Blbk51bWJlciA9IGZhbHNlLFxuICAgIGFjY3VtdWxhdG9yID0gXCJcIixcbiAgICBidWZmZXIgPSBcIlwiO1xuXG4gIGNvbnN0IHN0YWNrOiBhbnlbXSA9IFtdO1xuXG4gIHJldHVybiBmbHVzaGFibGUoKGJ1ZjogYW55KSA9PiB7XG4gICAgY29uc3QgdG9rZW5zOiBhbnlbXSA9IFtdO1xuXG4gICAgaWYgKGJ1ZiA9PT0gbm9uZSkge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSBidWY7XG4gICAgfVxuXG4gICAgbGV0IG1hdGNoOiBhbnk7XG4gICAgbGV0IHZhbHVlOiBhbnk7XG4gICAgbGV0IGluZGV4ID0gMDtcblxuICAgIG1haW46IGZvciAoOzspIHtcbiAgICAgIHN3aXRjaCAoZXhwZWN0KSB7XG4gICAgICAgIGNhc2UgXCJ2YWx1ZTFcIjpcbiAgICAgICAgY2FzZSBcInZhbHVlXCI6XG4gICAgICAgICAgcGF0dGVybnMudmFsdWUxLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMudmFsdWUxLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoZG9uZSB8fCBpbmRleCArIE1BWF9QQVRURVJOX1NJWkUgPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGEgdmFsdWVcIik7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBoYXMgZXhwZWN0ZWQgYSB2YWx1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlICdcIic6XG4gICAgICAgICAgICAgIGlmIChzdHJlYW1TdHJpbmdzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnRTdHJpbmdcIiB9KTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwie1wiOlxuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnRPYmplY3RcIiB9KTtcbiAgICAgICAgICAgICAgc3RhY2sucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgICBwYXJlbnQgPSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcImtleTFcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiW1wiOlxuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnRBcnJheVwiIH0pO1xuICAgICAgICAgICAgICBzdGFjay5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgIHBhcmVudCA9IFwiYXJyYXlcIjtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJ2YWx1ZTFcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiXVwiOlxuICAgICAgICAgICAgICBpZiAoZXhwZWN0ICE9PSBcInZhbHVlMVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiB1bmV4cGVjdGVkIHRva2VuICddJ1wiKTtcbiAgICAgICAgICAgICAgaWYgKG9wZW5OdW1iZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZE51bWJlclwiIH0pO1xuICAgICAgICAgICAgICAgIG9wZW5OdW1iZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocGFja051bWJlcnMpIHtcbiAgICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciA9IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmRBcnJheVwiIH0pO1xuICAgICAgICAgICAgICBwYXJlbnQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiLVwiOlxuICAgICAgICAgICAgICBvcGVuTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnROdW1iZXJcIiB9LCB7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IFwiLVwiIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciA9IFwiLVwiKTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJTdGFydFwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIwXCI6XG4gICAgICAgICAgICAgIG9wZW5OdW1iZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykge1xuICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdGFydE51bWJlclwiIH0sIHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogXCIwXCIgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yID0gXCIwXCIpO1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckZyYWN0aW9uXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjFcIjpcbiAgICAgICAgICAgIGNhc2UgXCIyXCI6XG4gICAgICAgICAgICBjYXNlIFwiM1wiOlxuICAgICAgICAgICAgY2FzZSBcIjRcIjpcbiAgICAgICAgICAgIGNhc2UgXCI1XCI6XG4gICAgICAgICAgICBjYXNlIFwiNlwiOlxuICAgICAgICAgICAgY2FzZSBcIjdcIjpcbiAgICAgICAgICAgIGNhc2UgXCI4XCI6XG4gICAgICAgICAgICBjYXNlIFwiOVwiOlxuICAgICAgICAgICAgICBvcGVuTnVtYmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnROdW1iZXJcIiB9LCB7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciA9IHZhbHVlKTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJEaWdpdFwiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0cnVlXCI6XG4gICAgICAgICAgICBjYXNlIFwiZmFsc2VcIjpcbiAgICAgICAgICAgIGNhc2UgXCJudWxsXCI6XG4gICAgICAgICAgICAgIGlmIChidWZmZXIubGVuZ3RoIC0gaW5kZXggPT09IHZhbHVlLmxlbmd0aCAmJiAhZG9uZSkgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IHZhbHVlICsgXCJWYWx1ZVwiLCB2YWx1ZTogdmFsdWVzW3ZhbHVlXSB9KTtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAvLyBkZWZhdWx0OiAvLyB3c1xuICAgICAgICAgIH1cbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJrZXlWYWxcIjpcbiAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgIHBhdHRlcm5zLnN0cmluZy5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLnN0cmluZy5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCAmJiAoZG9uZSB8fCBidWZmZXIubGVuZ3RoIC0gaW5kZXggPj0gNikpXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGVzY2FwZWQgY2hhcmFjdGVyc1wiKTtcbiAgICAgICAgICAgIGlmIChkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgaGFzIGV4cGVjdGVkIGEgc3RyaW5nIHZhbHVlXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgaWYgKGV4cGVjdCA9PT0gXCJrZXlWYWxcIikge1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtS2V5cykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZEtleVwiIH0pO1xuICAgICAgICAgICAgICBpZiAocGFja0tleXMpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwia2V5VmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBleHBlY3QgPSBcImNvbG9uXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtU3RyaW5ncykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZFN0cmluZ1wiIH0pO1xuICAgICAgICAgICAgICBpZiAocGFja1N0cmluZ3MpIHtcbiAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RyaW5nVmFsdWVcIiwgdmFsdWU6IGFjY3VtdWxhdG9yIH0pO1xuICAgICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUubGVuZ3RoID4gMSAmJiB2YWx1ZS5jaGFyQXQoMCkgPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICBjb25zdCB0ID0gdmFsdWUubGVuZ3RoID09IDIgPyBjb2Rlc1t2YWx1ZS5jaGFyQXQoMSldIDogZnJvbUhleCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoZXhwZWN0ID09PSBcImtleVZhbFwiID8gc3RyZWFtS2V5cyA6IHN0cmVhbVN0cmluZ3MpIHtcbiAgICAgICAgICAgICAgdG9rZW5zLnB1c2goeyBuYW1lOiBcInN0cmluZ0NodW5rXCIsIHZhbHVlOiB0IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGV4cGVjdCA9PT0gXCJrZXlWYWxcIiA/IHBhY2tLZXlzIDogcGFja1N0cmluZ3MpIHtcbiAgICAgICAgICAgICAgYWNjdW11bGF0b3IgKz0gdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGV4cGVjdCA9PT0gXCJrZXlWYWxcIiA/IHN0cmVhbUtleXMgOiBzdHJlYW1TdHJpbmdzKSB7XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJzdHJpbmdDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXhwZWN0ID09PSBcImtleVZhbFwiID8gcGFja0tleXMgOiBwYWNrU3RyaW5ncykge1xuICAgICAgICAgICAgICBhY2N1bXVsYXRvciArPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwia2V5MVwiOlxuICAgICAgICBjYXNlIFwia2V5XCI6XG4gICAgICAgICAgcGF0dGVybnMua2V5MS5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLmtleTEuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYW4gb2JqZWN0IGtleVwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICdcIicpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1LZXlzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwic3RhcnRLZXlcIiB9KTtcbiAgICAgICAgICAgIGV4cGVjdCA9IFwia2V5VmFsXCI7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIGlmIChleHBlY3QgIT09IFwia2V5MVwiKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiB1bmV4cGVjdGVkIHRva2VuICd9J1wiKTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJlbmRPYmplY3RcIiB9KTtcbiAgICAgICAgICAgIHBhcmVudCA9IHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiY29sb25cIjpcbiAgICAgICAgICBwYXR0ZXJucy5jb2xvbi5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLmNvbG9uLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkICc6J1wiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICB2YWx1ZSA9PT0gXCI6XCIgJiYgKGV4cGVjdCA9IFwidmFsdWVcIik7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiYXJyYXlTdG9wXCI6XG4gICAgICAgIGNhc2UgXCJvYmplY3RTdG9wXCI6XG4gICAgICAgICAgcGF0dGVybnMuY29tbWEubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5jb21tYS5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCAnLCdcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcGVuTnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZE51bWJlclwiIH0pO1xuICAgICAgICAgICAgb3Blbk51bWJlciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHBhY2tOdW1iZXJzKSB7XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IFwiLFwiKSB7XG4gICAgICAgICAgICBleHBlY3QgPSBleHBlY3QgPT09IFwiYXJyYXlTdG9wXCIgPyBcInZhbHVlXCIgOiBcImtleVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwifVwiIHx8IHZhbHVlID09PSBcIl1cIikge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIn1cIiA/IGV4cGVjdCA9PT0gXCJhcnJheVN0b3BcIiA6IGV4cGVjdCAhPT0gXCJhcnJheVN0b3BcIikge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCAnXCIgKyAoZXhwZWN0ID09PSBcImFycmF5U3RvcFwiID8gXCJdXCIgOiBcIn1cIikgKyBcIidcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IG5hbWU6IHZhbHVlID09PSBcIn1cIiA/IFwiZW5kT2JqZWN0XCIgOiBcImVuZEFycmF5XCIgfSk7XG4gICAgICAgICAgICBwYXJlbnQgPSBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gbnVtYmVyIGNodW5rc1xuICAgICAgICBjYXNlIFwibnVtYmVyU3RhcnRcIjogLy8gWzAtOV1cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJTdGFydC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlclN0YXJ0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGEgc3RhcnRpbmcgZGlnaXRcIik7XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbWF0Y2hbMF07XG4gICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICBleHBlY3QgPSB2YWx1ZSA9PT0gXCIwXCIgPyBcIm51bWJlckZyYWN0aW9uXCIgOiBcIm51bWJlckRpZ2l0XCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRGlnaXRcIjogLy8gWzAtOV0qXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRGlnaXQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJEaWdpdC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCB8fCBkb25lKSB0aHJvdyBuZXcgRXJyb3IoXCJQYXJzZXIgY2Fubm90IHBhcnNlIGlucHV0OiBleHBlY3RlZCBhIGRpZ2l0XCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRnJhY3Rpb25cIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJGcmFjdGlvblwiOiAvLyBbXFwuZUVdP1xuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckZyYWN0aW9uLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyRnJhY3Rpb24uZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBleHBlY3RlZFtwYXJlbnRdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IHZhbHVlID09PSBcIi5cIiA/IFwibnVtYmVyRnJhY1N0YXJ0XCIgOiBcIm51bWJlckV4cFNpZ25cIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJGcmFjU3RhcnRcIjogLy8gWzAtOV1cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJTdGFydC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlclN0YXJ0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcnNlciBjYW5ub3QgcGFyc2UgaW5wdXQ6IGV4cGVjdGVkIGEgZnJhY3Rpb25hbCBwYXJ0IG9mIGEgbnVtYmVyXCIpO1xuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJGcmFjRGlnaXRcIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJGcmFjRGlnaXRcIjogLy8gWzAtOV0qXG4gICAgICAgICAgcGF0dGVybnMubnVtYmVyRGlnaXQubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJEaWdpdC5leGVjKGJ1ZmZlcik7XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgICAgcGFja051bWJlcnMgJiYgKGFjY3VtdWxhdG9yICs9IHZhbHVlKTtcbiAgICAgICAgICAgIGluZGV4ICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBleHBlY3QgPSBcIm51bWJlckV4cG9uZW50XCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRXhwb25lbnRcIjogLy8gW2VFXT9cbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJFeHBvbmVudC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckV4cG9uZW50LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IGV4cGVjdGVkW3BhcmVudF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gXCJkb25lXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChzdHJlYW1OdW1iZXJzKSB0b2tlbnMucHVzaCh7IG5hbWU6IFwibnVtYmVyQ2h1bmtcIiwgdmFsdWU6IHZhbHVlIH0pO1xuICAgICAgICAgIHBhY2tOdW1iZXJzICYmIChhY2N1bXVsYXRvciArPSB2YWx1ZSk7XG4gICAgICAgICAgZXhwZWN0ID0gXCJudW1iZXJFeHBTaWduXCI7XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibnVtYmVyRXhwU2lnblwiOiAvLyBbLStdP1xuICAgICAgICAgIHBhdHRlcm5zLm51bWJlckV4cFNpZ24ubGFzdEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgbWF0Y2ggPSBwYXR0ZXJucy5udW1iZXJFeHBTaWduLmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRXhwU3RhcnRcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9uZSkgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGhhcyBleHBlY3RlZCBhbiBleHBvbmVudCB2YWx1ZSBvZiBhIG51bWJlclwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRXhwU3RhcnRcIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJFeHBTdGFydFwiOiAvLyBbMC05XVxuICAgICAgICAgIHBhdHRlcm5zLm51bWJlclN0YXJ0Lmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMubnVtYmVyU3RhcnQuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGggfHwgZG9uZSlcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogZXhwZWN0ZWQgYW4gZXhwb25lbnQgcGFydCBvZiBhIG51bWJlclwiKTtcbiAgICAgICAgICAgIGJyZWFrIG1haW47IC8vIHdhaXQgZm9yIG1vcmUgaW5wdXRcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsdWUgPSBtYXRjaFswXTtcbiAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcIm51bWJlckNodW5rXCIsIHZhbHVlOiB2YWx1ZSB9KTtcbiAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgIGV4cGVjdCA9IFwibnVtYmVyRXhwRGlnaXRcIjtcbiAgICAgICAgICBpbmRleCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJudW1iZXJFeHBEaWdpdFwiOiAvLyBbMC05XSpcbiAgICAgICAgICBwYXR0ZXJucy5udW1iZXJEaWdpdC5sYXN0SW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtYXRjaCA9IHBhdHRlcm5zLm51bWJlckRpZ2l0LmV4ZWMoYnVmZmVyKTtcbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbU51bWJlcnMpIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJDaHVua1wiLCB2YWx1ZTogdmFsdWUgfSk7XG4gICAgICAgICAgICBwYWNrTnVtYmVycyAmJiAoYWNjdW11bGF0b3IgKz0gdmFsdWUpO1xuICAgICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBidWZmZXIubGVuZ3RoIHx8IGRvbmUpIHtcbiAgICAgICAgICAgICAgZXhwZWN0ID0gZXhwZWN0ZWRbcGFyZW50XTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhayBtYWluOyAvLyB3YWl0IGZvciBtb3JlIGlucHV0XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZG9uZVwiOlxuICAgICAgICAgIHBhdHRlcm5zLndzLmxhc3RJbmRleCA9IGluZGV4O1xuICAgICAgICAgIG1hdGNoID0gcGF0dGVybnMud3MuZXhlYyhidWZmZXIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgaWYgKGpzb25TdHJlYW1pbmcpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QgPSBcInZhbHVlXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyc2VyIGNhbm5vdCBwYXJzZSBpbnB1dDogdW5leHBlY3RlZCBjaGFyYWN0ZXJzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWsgbWFpbjsgLy8gd2FpdCBmb3IgbW9yZSBpbnB1dFxuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG1hdGNoWzBdO1xuICAgICAgICAgIGlmIChvcGVuTnVtYmVyKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZE51bWJlclwiIH0pO1xuICAgICAgICAgICAgb3Blbk51bWJlciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHBhY2tOdW1iZXJzKSB7XG4gICAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaW5kZXggKz0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZG9uZSAmJiBvcGVuTnVtYmVyKSB7XG4gICAgICBpZiAoc3RyZWFtTnVtYmVycykgdG9rZW5zLnB1c2goeyBuYW1lOiBcImVuZE51bWJlclwiIH0pO1xuICAgICAgb3Blbk51bWJlciA9IGZhbHNlO1xuICAgICAgaWYgKHBhY2tOdW1iZXJzKSB7XG4gICAgICAgIHRva2Vucy5wdXNoKHsgbmFtZTogXCJudW1iZXJWYWx1ZVwiLCB2YWx1ZTogYWNjdW11bGF0b3IgfSk7XG4gICAgICAgIGFjY3VtdWxhdG9yID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgYnVmZmVyID0gYnVmZmVyLnNsaWNlKGluZGV4KTtcbiAgICByZXR1cm4gdG9rZW5zLmxlbmd0aCA/IG1hbnkodG9rZW5zKSA6IG5vbmU7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlciA9IChvcHRpb25zPzogYW55KSA9PiBnZW4oZml4VXRmOFN0cmVhbSgpLCBqc29uUGFyc2VyKG9wdGlvbnMpKTtcblxuY29uc3Qgd2l0aFBhcnNlciA9IChmbjogYW55LCBvcHRpb25zPzogYW55KSA9PiBnZW4ocGFyc2VyKG9wdGlvbnMpLCBmbihvcHRpb25zKSk7XG5cbmNvbnN0IGNoZWNrYWJsZVRva2VucyA9IHtcbiAgICBzdGFydE9iamVjdDogMSxcbiAgICBzdGFydEFycmF5OiAxLFxuICAgIHN0YXJ0U3RyaW5nOiAxLFxuICAgIHN0YXJ0TnVtYmVyOiAxLFxuICAgIG51bGxWYWx1ZTogMSxcbiAgICB0cnVlVmFsdWU6IDEsXG4gICAgZmFsc2VWYWx1ZTogMSxcbiAgICBzdHJpbmdWYWx1ZTogMSxcbiAgICBudW1iZXJWYWx1ZTogMSxcbiAgfSxcbiAgc3RvcFRva2VucyA9IHtcbiAgICBzdGFydE9iamVjdDogXCJlbmRPYmplY3RcIixcbiAgICBzdGFydEFycmF5OiBcImVuZEFycmF5XCIsXG4gICAgc3RhcnRTdHJpbmc6IFwiZW5kU3RyaW5nXCIsXG4gICAgc3RhcnROdW1iZXI6IFwiZW5kTnVtYmVyXCIsXG4gIH0sXG4gIG9wdGlvbmFsVG9rZW5zID0geyBlbmRTdHJpbmc6IFwic3RyaW5nVmFsdWVcIiwgZW5kTnVtYmVyOiBcIm51bWJlclZhbHVlXCIgfTtcblxuY29uc3QgZGVmYXVsdEZpbHRlciA9IChfc3RhY2s6IHN0cmluZ1tdLCBfYTogYW55KSA9PiB0cnVlO1xuXG5jb25zdCBzdHJpbmdGaWx0ZXIgPSAoc3RyaW5nOiBzdHJpbmcsIHNlcGFyYXRvcjogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHN0cmluZ1dpdGhTZXBhcmF0b3IgPSBzdHJpbmcgKyBzZXBhcmF0b3I7XG4gIHJldHVybiAoc3RhY2s6IHN0cmluZ1tdLCBfYTogYW55KSA9PiB7XG4gICAgY29uc3QgcGF0aCA9IHN0YWNrLmpvaW4oc2VwYXJhdG9yKTtcbiAgICByZXR1cm4gcGF0aCA9PT0gc3RyaW5nIHx8IHBhdGguc3RhcnRzV2l0aChzdHJpbmdXaXRoU2VwYXJhdG9yKTtcbiAgfTtcbn07XG5cbmNvbnN0IHJlZ0V4cEZpbHRlciA9IChyZWdFeHA6IFJlZ0V4cCwgc2VwYXJhdG9yOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIChzdGFjazogc3RyaW5nW10sIF9hOiBhbnkpID0+IHJlZ0V4cC50ZXN0KHN0YWNrLmpvaW4oc2VwYXJhdG9yKSk7XG59O1xuXG5jb25zdCBmaWx0ZXJCYXNlID1cbiAgKHtcbiAgICBzcGVjaWFsQWN0aW9uID0gXCJhY2NlcHRcIixcbiAgICBkZWZhdWx0QWN0aW9uID0gXCJpZ25vcmVcIixcbiAgICBub25DaGVja2FibGVBY3Rpb24gPSBcInByb2Nlc3Mta2V5XCIsXG4gICAgdHJhbnNpdGlvbiA9IHVuZGVmaW5lZCBhcyBhbnksXG4gIH0gPSB7fSkgPT5cbiAgKG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IG9uY2UgPSBvcHRpb25zPy5vbmNlLFxuICAgICAgc2VwYXJhdG9yID0gb3B0aW9ucz8ucGF0aFNlcGFyYXRvciB8fCBcIi5cIjtcbiAgICBsZXQgZmlsdGVyID0gZGVmYXVsdEZpbHRlcixcbiAgICAgIHN0cmVhbUtleXMgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZmlsdGVyID0gc3RyaW5nRmlsdGVyKG9wdGlvbnMuZmlsdGVyLCBzZXBhcmF0b3IpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmZpbHRlciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICBmaWx0ZXIgPSByZWdFeHBGaWx0ZXIob3B0aW9ucy5maWx0ZXIsIHNlcGFyYXRvcik7XG4gICAgICB9XG4gICAgICBpZiAoXCJzdHJlYW1WYWx1ZXNcIiBpbiBvcHRpb25zKSBzdHJlYW1LZXlzID0gb3B0aW9ucy5zdHJlYW1WYWx1ZXM7XG4gICAgICBpZiAoXCJzdHJlYW1LZXlzXCIgaW4gb3B0aW9ucykgc3RyZWFtS2V5cyA9IG9wdGlvbnMuc3RyZWFtS2V5cztcbiAgICB9XG4gICAgY29uc3Qgc2FuaXRpemVkT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMsIHsgZmlsdGVyLCBzdHJlYW1LZXlzLCBzZXBhcmF0b3IgfSk7XG4gICAgbGV0IHN0YXRlID0gXCJjaGVja1wiO1xuICAgIGNvbnN0IHN0YWNrOiBhbnlbXSA9IFtdO1xuICAgIGxldCBkZXB0aCA9IDAsXG4gICAgICBwcmV2aW91c1Rva2VuID0gXCJcIixcbiAgICAgIGVuZFRva2VuID0gXCJcIixcbiAgICAgIG9wdGlvbmFsVG9rZW4gPSBcIlwiLFxuICAgICAgc3RhcnRUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgcmV0dXJuIGZsdXNoYWJsZSgoY2h1bmspID0+IHtcbiAgICAgIC8vIHRoZSBmbHVzaFxuICAgICAgaWYgKGNodW5rID09PSBub25lKSByZXR1cm4gdHJhbnNpdGlvbiA/IHRyYW5zaXRpb24oW10sIG51bGwsIFwiZmx1c2hcIiwgc2FuaXRpemVkT3B0aW9ucykgOiBub25lO1xuXG4gICAgICAvLyBwcm9jZXNzIHRoZSBvcHRpb25hbCB2YWx1ZSB0b2tlbiAodW5maW5pc2hlZClcbiAgICAgIGlmIChvcHRpb25hbFRva2VuKSB7XG4gICAgICAgIGlmIChvcHRpb25hbFRva2VuID09PSBjaHVuay5uYW1lKSB7XG4gICAgICAgICAgbGV0IHJldHVyblRva2VuID0gbm9uZTtcbiAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwicHJvY2Vzcy1rZXlcIjpcbiAgICAgICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gPSBjaHVuay52YWx1ZTtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFjY2VwdC12YWx1ZVwiOlxuICAgICAgICAgICAgICByZXR1cm5Ub2tlbiA9IGNodW5rO1xuICAgICAgICAgICAgICBzdGF0ZSA9IG9uY2UgPyBcInBhc3NcIiA6IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBzdGF0ZSA9IG9uY2UgPyBcImFsbFwiIDogXCJjaGVja1wiO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgb3B0aW9uYWxUb2tlbiA9IFwiXCI7XG4gICAgICAgICAgcmV0dXJuIHJldHVyblRva2VuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbmFsVG9rZW4gPSBcIlwiO1xuICAgICAgICBzdGF0ZSA9IG9uY2UgJiYgc3RhdGUgIT09IFwicHJvY2Vzcy1rZXlcIiA/IFwicGFzc1wiIDogXCJjaGVja1wiO1xuICAgICAgfVxuXG4gICAgICBsZXQgcmV0dXJuVG9rZW46IGFueSA9IG5vbmU7XG5cbiAgICAgIHJlY2hlY2s6IGZvciAoOzspIHtcbiAgICAgICAgLy8gYWNjZXB0L3JlamVjdCB0b2tlbnNcbiAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgIGNhc2UgXCJwcm9jZXNzLWtleVwiOlxuICAgICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IFwiZW5kS2V5XCIpIG9wdGlvbmFsVG9rZW4gPSBcImtleVZhbHVlXCI7XG4gICAgICAgICAgICByZXR1cm4gbm9uZTtcbiAgICAgICAgICBjYXNlIFwicGFzc1wiOlxuICAgICAgICAgICAgcmV0dXJuIG5vbmU7XG4gICAgICAgICAgY2FzZSBcImFsbFwiOlxuICAgICAgICAgICAgcmV0dXJuIGNodW5rO1xuICAgICAgICAgIGNhc2UgXCJhY2NlcHRcIjpcbiAgICAgICAgICBjYXNlIFwicmVqZWN0XCI6XG4gICAgICAgICAgICBpZiAoc3RhcnRUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm5Ub2tlbiA9IHRyYW5zaXRpb24oc3RhY2ssIGNodW5rLCBzdGF0ZSwgc2FuaXRpemVkT3B0aW9ucykgfHwgbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY2h1bmsubmFtZSkge1xuICAgICAgICAgICAgICBjYXNlIFwic3RhcnRPYmplY3RcIjpcbiAgICAgICAgICAgICAgY2FzZSBcInN0YXJ0QXJyYXlcIjpcbiAgICAgICAgICAgICAgICArK2RlcHRoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwiZW5kT2JqZWN0XCI6XG4gICAgICAgICAgICAgIGNhc2UgXCJlbmRBcnJheVwiOlxuICAgICAgICAgICAgICAgIC0tZGVwdGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwiYWNjZXB0XCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSBjb21iaW5lTWFueU11dChyZXR1cm5Ub2tlbiwgY2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFkZXB0aCkge1xuICAgICAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGUgPT09IFwiYWNjZXB0XCIgPyBcInBhc3NcIiA6IFwiYWxsXCI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Ub2tlbjtcbiAgICAgICAgICBjYXNlIFwiYWNjZXB0LXZhbHVlXCI6XG4gICAgICAgICAgY2FzZSBcInJlamVjdC12YWx1ZVwiOlxuICAgICAgICAgICAgaWYgKHN0YXJ0VHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICBzdGFydFRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSB0cmFuc2l0aW9uKHN0YWNrLCBjaHVuaywgc3RhdGUsIHNhbml0aXplZE9wdGlvbnMpIHx8IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdGUgPT09IFwiYWNjZXB0LXZhbHVlXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSBjb21iaW5lTWFueU11dChyZXR1cm5Ub2tlbiwgY2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNodW5rLm5hbWUgPT09IGVuZFRva2VuKSB7XG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgb3B0aW9uYWxUb2tlbiA9IG9wdGlvbmFsVG9rZW5zW2VuZFRva2VuXSB8fCBcIlwiO1xuICAgICAgICAgICAgICBlbmRUb2tlbiA9IFwiXCI7XG4gICAgICAgICAgICAgIGlmICghb3B0aW9uYWxUb2tlbikge1xuICAgICAgICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlID09PSBcImFjY2VwdC12YWx1ZVwiID8gXCJwYXNzXCIgOiBcImFsbFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5Ub2tlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgbGFzdCBpbmRleCBpbiB0aGUgc3RhY2tcbiAgICAgICAgaWYgKHR5cGVvZiBzdGFja1tzdGFjay5sZW5ndGggLSAxXSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgLy8gYXJyYXlcbiAgICAgICAgICBzd2l0Y2ggKGNodW5rLm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJzdGFydE9iamVjdFwiOlxuICAgICAgICAgICAgY2FzZSBcInN0YXJ0QXJyYXlcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdGFydFN0cmluZ1wiOlxuICAgICAgICAgICAgY2FzZSBcInN0YXJ0TnVtYmVyXCI6XG4gICAgICAgICAgICBjYXNlIFwibnVsbFZhbHVlXCI6XG4gICAgICAgICAgICBjYXNlIFwidHJ1ZVZhbHVlXCI6XG4gICAgICAgICAgICBjYXNlIFwiZmFsc2VWYWx1ZVwiOlxuICAgICAgICAgICAgICArK3N0YWNrW3N0YWNrLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJudW1iZXJWYWx1ZVwiOlxuICAgICAgICAgICAgICBpZiAocHJldmlvdXNUb2tlbiAhPT0gXCJlbmROdW1iZXJcIikgKytzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RyaW5nVmFsdWVcIjpcbiAgICAgICAgICAgICAgaWYgKHByZXZpb3VzVG9rZW4gIT09IFwiZW5kU3RyaW5nXCIpICsrc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY2h1bmsubmFtZSA9PT0gXCJrZXlWYWx1ZVwiKSBzdGFja1tzdGFjay5sZW5ndGggLSAxXSA9IGNodW5rLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzVG9rZW4gPSBjaHVuay5uYW1lO1xuXG4gICAgICAgIC8vIGNoZWNrIHRoZSB0b2tlblxuICAgICAgICBjb25zdCBhY3Rpb24gPVxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBjaGVja2FibGVUb2tlbnNbY2h1bmsubmFtZV0gIT09IDEgPyBub25DaGVja2FibGVBY3Rpb24gOiBmaWx0ZXIoc3RhY2ssIGNodW5rKSA/IHNwZWNpYWxBY3Rpb24gOiBkZWZhdWx0QWN0aW9uO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZW5kVG9rZW4gPSBzdG9wVG9rZW5zW2NodW5rLm5hbWVdIHx8IFwiXCI7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSBcInByb2Nlc3Mta2V5XCI6XG4gICAgICAgICAgICBpZiAoY2h1bmsubmFtZSA9PT0gXCJzdGFydEtleVwiKSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJwcm9jZXNzLWtleVwiO1xuICAgICAgICAgICAgICBjb250aW51ZSByZWNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImFjY2VwdC10b2tlblwiOlxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgaWYgKGVuZFRva2VuICYmIG9wdGlvbmFsVG9rZW5zW2VuZFRva2VuXSkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwiYWNjZXB0LXZhbHVlXCI7XG4gICAgICAgICAgICAgIHN0YXJ0VHJhbnNpdGlvbiA9ICEhdHJhbnNpdGlvbjtcbiAgICAgICAgICAgICAgY29udGludWUgcmVjaGVjaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uKSByZXR1cm5Ub2tlbiA9IHRyYW5zaXRpb24oc3RhY2ssIGNodW5rLCBhY3Rpb24sIHNhbml0aXplZE9wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuVG9rZW4gPSBjb21iaW5lTWFueU11dChyZXR1cm5Ub2tlbiwgY2h1bmspO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImFjY2VwdFwiOlxuICAgICAgICAgICAgaWYgKGVuZFRva2VuKSB7XG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgc3RhdGUgPSBvcHRpb25hbFRva2Vuc1tlbmRUb2tlbl0gPyBcImFjY2VwdC12YWx1ZVwiIDogXCJhY2NlcHRcIjtcbiAgICAgICAgICAgICAgc3RhcnRUcmFuc2l0aW9uID0gISF0cmFuc2l0aW9uO1xuICAgICAgICAgICAgICBjb250aW51ZSByZWNoZWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHJldHVyblRva2VuID0gdHJhbnNpdGlvbihzdGFjaywgY2h1bmssIGFjdGlvbiwgc2FuaXRpemVkT3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm5Ub2tlbiA9IGNvbWJpbmVNYW55TXV0KHJldHVyblRva2VuLCBjaHVuayk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwicmVqZWN0XCI6XG4gICAgICAgICAgICBpZiAoZW5kVG9rZW4pIHtcbiAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICBzdGF0ZSA9IG9wdGlvbmFsVG9rZW5zW2VuZFRva2VuXSA/IFwicmVqZWN0LXZhbHVlXCIgOiBcInJlamVjdFwiO1xuICAgICAgICAgICAgICBzdGFydFRyYW5zaXRpb24gPSAhIXRyYW5zaXRpb247XG4gICAgICAgICAgICAgIGNvbnRpbnVlIHJlY2hlY2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbikgcmV0dXJuVG9rZW4gPSB0cmFuc2l0aW9uKHN0YWNrLCBjaHVuaywgYWN0aW9uLCBzYW5pdGl6ZWRPcHRpb25zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJwYXNzXCI6XG4gICAgICAgICAgICBzdGF0ZSA9IFwicGFzc1wiO1xuICAgICAgICAgICAgY29udGludWUgcmVjaGVjaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgdGhlIHN0YWNrXG4gICAgICBzd2l0Y2ggKGNodW5rLm5hbWUpIHtcbiAgICAgICAgY2FzZSBcInN0YXJ0T2JqZWN0XCI6XG4gICAgICAgICAgc3RhY2sucHVzaChudWxsKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcInN0YXJ0QXJyYXlcIjpcbiAgICAgICAgICBzdGFjay5wdXNoKC0xKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVuZE9iamVjdFwiOlxuICAgICAgICBjYXNlIFwiZW5kQXJyYXlcIjpcbiAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldHVyblRva2VuO1xuICAgIH0pO1xuICB9O1xuXG5leHBvcnQgY29uc3QgUGlja1BhcnNlciA9IChvcHRpb25zPzogYW55KSA9PiB3aXRoUGFyc2VyKGZpbHRlckJhc2UoKSwgT2JqZWN0LmFzc2lnbih7IHBhY2tLZXlzOiB0cnVlIH0sIG9wdGlvbnMpKTtcblxuY2xhc3MgQ291bnRlciB7XG4gIGRlcHRoOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGluaXRpYWxEZXB0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5kZXB0aCA9IGluaXRpYWxEZXB0aDtcbiAgfVxuICBzdGFydE9iamVjdCgpIHtcbiAgICArK3RoaXMuZGVwdGg7XG4gIH1cbiAgZW5kT2JqZWN0KCkge1xuICAgIC0tdGhpcy5kZXB0aDtcbiAgfVxuICBzdGFydEFycmF5KCkge1xuICAgICsrdGhpcy5kZXB0aDtcbiAgfVxuICBlbmRBcnJheSgpIHtcbiAgICAtLXRoaXMuZGVwdGg7XG4gIH1cbn1cblxuY2xhc3MgQXNzZW1ibGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgc3RhdGljIGNvbm5lY3RUbyhzdHJlYW06IGFueSwgb3B0aW9uczogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBBc3NlbWJsZXIob3B0aW9ucykuY29ubmVjdFRvKHN0cmVhbSk7XG4gIH1cblxuICBzdGFjazogYW55O1xuICBjdXJyZW50OiBhbnk7XG4gIGtleTogYW55O1xuICBkb25lOiBib29sZWFuO1xuICByZXZpdmVyOiBhbnk7XG4gIC8vIEB0cy1pZ25vcmVcbiAgc3RyaW5nVmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICB0YXBDaGFpbjogKGNodW5rOiBhbnkpID0+IGFueTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBhbnkpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLmtleSA9IG51bGw7XG4gICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgdGhpcy5yZXZpdmVyID0gdHlwZW9mIG9wdGlvbnMucmV2aXZlciA9PSBcImZ1bmN0aW9uXCIgJiYgb3B0aW9ucy5yZXZpdmVyO1xuICAgICAgaWYgKHRoaXMucmV2aXZlcikge1xuICAgICAgICB0aGlzLnN0cmluZ1ZhbHVlID0gdGhpcy5fc2F2ZVZhbHVlID0gdGhpcy5fc2F2ZVZhbHVlV2l0aFJldml2ZXI7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9ucy5udW1iZXJBc1N0cmluZykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubnVtYmVyVmFsdWUgPSB0aGlzLnN0cmluZ1ZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGFwQ2hhaW4gPSAoY2h1bmspID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICh0aGlzW2NodW5rLm5hbWVdKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpc1tjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbm9uZTtcbiAgICB9O1xuXG4gICAgdGhpcy5zdHJpbmdWYWx1ZSA9IHRoaXMuX3NhdmVWYWx1ZTtcbiAgfVxuXG4gIGNvbm5lY3RUbyhzdHJlYW06IGFueSkge1xuICAgIHN0cmVhbS5vbihcImRhdGFcIiwgKGNodW5rOiBhbnkpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICh0aGlzW2NodW5rLm5hbWVdKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpc1tjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkgdGhpcy5lbWl0KFwiZG9uZVwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCBkZXB0aCgpIHtcbiAgICByZXR1cm4gKHRoaXMuc3RhY2subGVuZ3RoID4+IDEpICsgKHRoaXMuZG9uZSA/IDAgOiAxKTtcbiAgfVxuXG4gIGdldCBwYXRoKCkge1xuICAgIGNvbnN0IHBhdGg6IGFueVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YWNrLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBjb25zdCBrZXkgPSB0aGlzLnN0YWNrW2kgKyAxXTtcbiAgICAgIHBhdGgucHVzaChrZXkgPT09IG51bGwgPyB0aGlzLnN0YWNrW2ldLmxlbmd0aCA6IGtleSk7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZHJvcFRvTGV2ZWwobGV2ZWw6IGFueSkge1xuICAgIGlmIChsZXZlbCA8IHRoaXMuZGVwdGgpIHtcbiAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAobGV2ZWwgLSAxKSA8PCAxO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnN0YWNrW2luZGV4XTtcbiAgICAgICAgdGhpcy5rZXkgPSB0aGlzLnN0YWNrW2luZGV4ICsgMV07XG4gICAgICAgIHRoaXMuc3RhY2suc3BsaWNlKGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5rZXkgPSBudWxsO1xuICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNvbnN1bWUoY2h1bms6IGFueSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzW2NodW5rLm5hbWVdICYmIHRoaXNbY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAga2V5VmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMua2V5ID0gdmFsdWU7XG4gIH1cblxuICAvL3N0cmluZ1ZhbHVlKCkgLSBhbGlhc2VkIGJlbG93IHRvIF9zYXZlVmFsdWUoKVxuXG4gIG51bWJlclZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLl9zYXZlVmFsdWUocGFyc2VGbG9hdCh2YWx1ZSkpO1xuICB9XG4gIG51bGxWYWx1ZSgpIHtcbiAgICB0aGlzLl9zYXZlVmFsdWUobnVsbCk7XG4gIH1cbiAgdHJ1ZVZhbHVlKCkge1xuICAgIHRoaXMuX3NhdmVWYWx1ZSh0cnVlKTtcbiAgfVxuICBmYWxzZVZhbHVlKCkge1xuICAgIHRoaXMuX3NhdmVWYWx1ZShmYWxzZSk7XG4gIH1cblxuICBzdGFydE9iamVjdCgpIHtcbiAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFjay5wdXNoKHRoaXMuY3VycmVudCwgdGhpcy5rZXkpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnQgPSBuZXcgT2JqZWN0KCk7XG4gICAgdGhpcy5rZXkgPSBudWxsO1xuICB9XG5cbiAgZW5kT2JqZWN0KCkge1xuICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICB0aGlzLmtleSA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgdGhpcy5fc2F2ZVZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzdGFydEFycmF5KCkge1xuICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5jdXJyZW50LCB0aGlzLmtleSk7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudCA9IFtdO1xuICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgfVxuXG4gIGVuZEFycmF5KCkge1xuICAgIGlmICh0aGlzLnN0YWNrLmxlbmd0aCkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICB0aGlzLmtleSA9IHRoaXMuc3RhY2sucG9wKCk7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnN0YWNrLnBvcCgpO1xuICAgICAgdGhpcy5fc2F2ZVZhbHVlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBfc2F2ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY3VycmVudCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5wdXNoKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycmVudFt0aGlzLmtleV0gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5rZXkgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBfc2F2ZVZhbHVlV2l0aFJldml2ZXIodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucmV2aXZlcihcIlwiLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMucmV2aXZlcihcIlwiICsgdGhpcy5jdXJyZW50Lmxlbmd0aCwgdmFsdWUpO1xuICAgICAgICB0aGlzLmN1cnJlbnQucHVzaCh2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuY3VycmVudFt0aGlzLmN1cnJlbnQubGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gdGhpcy5yZXZpdmVyKHRoaXMua2V5LCB2YWx1ZSk7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50W3RoaXMua2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc3RyZWFtQmFzZSA9XG4gICh7IHB1c2gsIGZpcnN0LCBsZXZlbCB9OiBhbnkpID0+XG4gIChvcHRpb25zID0ge30gYXMgYW55KSA9PiB7XG4gICAgY29uc3QgeyBvYmplY3RGaWx0ZXIsIGluY2x1ZGVVbmRlY2lkZWQgfSA9IG9wdGlvbnM7XG4gICAgbGV0IGFzbSA9IG5ldyBBc3NlbWJsZXIob3B0aW9ucykgYXMgYW55LFxuICAgICAgc3RhdGUgPSBmaXJzdCA/IFwiZmlyc3RcIiA6IFwiY2hlY2tcIixcbiAgICAgIHNhdmVkQXNtID0gbnVsbCBhcyBhbnk7XG5cbiAgICBpZiAodHlwZW9mIG9iamVjdEZpbHRlciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIC8vIG5vIG9iamVjdCBmaWx0ZXIgKyBubyBmaXJzdCBjaGVja1xuICAgICAgaWYgKHN0YXRlID09PSBcImNoZWNrXCIpXG4gICAgICAgIHJldHVybiAoY2h1bms6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChhc21bY2h1bmsubmFtZV0pIHtcbiAgICAgICAgICAgIGFzbVtjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHVzaChhc20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9uZTtcbiAgICAgICAgfTtcbiAgICAgIC8vIG5vIG9iamVjdCBmaWx0ZXJcbiAgICAgIHJldHVybiAoY2h1bms6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgICBmaXJzdChjaHVuayk7XG4gICAgICAgICAgICBzdGF0ZSA9IFwiYWNjZXB0XCI7XG4gICAgICAgICAgLy8gZmFsbCB0aHJvdWdoXG4gICAgICAgICAgY2FzZSBcImFjY2VwdFwiOlxuICAgICAgICAgICAgaWYgKGFzbVtjaHVuay5uYW1lXSkge1xuICAgICAgICAgICAgICBhc21bY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwdXNoKGFzbSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub25lO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBvYmplY3QgZmlsdGVyICsgYSBwb3NzaWJsZSBmaXJzdCBjaGVja1xuICAgIHJldHVybiAoY2h1bms6IGFueSkgPT4ge1xuICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICBjYXNlIFwiZmlyc3RcIjpcbiAgICAgICAgICBmaXJzdChjaHVuayk7XG4gICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgIC8vIGZhbGwgdGhyb3VnaFxuICAgICAgICBjYXNlIFwiY2hlY2tcIjpcbiAgICAgICAgICBpZiAoYXNtW2NodW5rLm5hbWVdKSB7XG4gICAgICAgICAgICBhc21bY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gb2JqZWN0RmlsdGVyKGFzbSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJhY2NlcHRcIjtcbiAgICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHJldHVybiBwdXNoKGFzbSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHJldHVybiBwdXNoKGFzbSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIHN0YXRlID0gXCJyZWplY3RcIjtcbiAgICAgICAgICAgICAgc2F2ZWRBc20gPSBhc207XG4gICAgICAgICAgICAgIGFzbSA9IG5ldyBDb3VudGVyKHNhdmVkQXNtLmRlcHRoKTtcbiAgICAgICAgICAgICAgc2F2ZWRBc20uZHJvcFRvTGV2ZWwobGV2ZWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHJldHVybiBwdXNoKGFzbSwgIWluY2x1ZGVVbmRlY2lkZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImFjY2VwdFwiOlxuICAgICAgICAgIGlmIChhc21bY2h1bmsubmFtZV0pIHtcbiAgICAgICAgICAgIGFzbVtjaHVuay5uYW1lXShjaHVuay52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoYXNtLmRlcHRoID09PSBsZXZlbCkge1xuICAgICAgICAgICAgICBzdGF0ZSA9IFwiY2hlY2tcIjtcbiAgICAgICAgICAgICAgcmV0dXJuIHB1c2goYXNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJyZWplY3RcIjpcbiAgICAgICAgICBpZiAoYXNtW2NodW5rLm5hbWVdKSB7XG4gICAgICAgICAgICBhc21bY2h1bmsubmFtZV0oY2h1bmsudmFsdWUpO1xuICAgICAgICAgICAgaWYgKGFzbS5kZXB0aCA9PT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgc3RhdGUgPSBcImNoZWNrXCI7XG4gICAgICAgICAgICAgIGFzbSA9IHNhdmVkQXNtO1xuICAgICAgICAgICAgICBzYXZlZEFzbSA9IG51bGw7XG4gICAgICAgICAgICAgIHJldHVybiBwdXNoKGFzbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vbmU7XG4gICAgfTtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IFN0cmVhbUFycmF5ID0gKG9wdGlvbnM/OiBhbnkpID0+IHtcbiAgbGV0IGtleSA9IDA7XG4gIHJldHVybiBzdHJlYW1CYXNlKHtcbiAgICBsZXZlbDogMSxcblxuICAgIGZpcnN0KGNodW5rOiBhbnkpIHtcbiAgICAgIGlmIChjaHVuay5uYW1lICE9PSBcInN0YXJ0QXJyYXlcIikgdGhyb3cgbmV3IEVycm9yKFwiVG9wLWxldmVsIG9iamVjdCBzaG91bGQgYmUgYW4gYXJyYXkuXCIpO1xuICAgIH0sXG5cbiAgICBwdXNoKGFzbTogYW55LCBkaXNjYXJkOiBhbnkpIHtcbiAgICAgIGlmIChhc20uY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGRpc2NhcmQpIHtcbiAgICAgICAgICArK2tleTtcbiAgICAgICAgICBhc20uY3VycmVudC5wb3AoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBrZXk6IGtleSsrLCB2YWx1ZTogYXNtLmN1cnJlbnQucG9wKCkgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vbmU7XG4gICAgfSxcbiAgfSkob3B0aW9ucyk7XG59O1xuIiwgImltcG9ydCB7IExpc3QsIE1lbnVCYXJFeHRyYSwgSWNvbiwgb3BlbiwgTGF1bmNoVHlwZSwgZW52aXJvbm1lbnQsIEFjdGlvblBhbmVsLCBBY3Rpb24gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBvcyBmcm9tIFwibm9kZTpvc1wiO1xuaW1wb3J0IHsgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVByb21pc2UsIFByb21pc2VPcHRpb25zIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuaW1wb3J0IHsgdXNlTGF0ZXN0IH0gZnJvbSBcIi4vdXNlTGF0ZXN0XCI7XG5pbXBvcnQgeyBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIi4vc2hvd0ZhaWx1cmVUb2FzdFwiO1xuaW1wb3J0IHsgYmFzZUV4ZWN1dGVTUUwsIFBlcm1pc3Npb25FcnJvciwgaXNQZXJtaXNzaW9uRXJyb3IgfSBmcm9tIFwiLi9zcWwtdXRpbHNcIjtcblxuLyoqXG4gKiBFeGVjdXRlcyBhIHF1ZXJ5IG9uIGEgbG9jYWwgU1FMIGRhdGFiYXNlIGFuZCByZXR1cm5zIHRoZSB7QGxpbmsgQXN5bmNTdGF0ZX0gY29ycmVzcG9uZGluZyB0byB0aGUgcXVlcnkgb2YgdGhlIGNvbW1hbmQuIFRoZSBsYXN0IHZhbHVlIHdpbGwgYmUga2VwdCBiZXR3ZWVuIGNvbW1hbmQgcnVucy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyB1c2VTUUwgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqIGltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuICogaW1wb3J0IHsgaG9tZWRpciB9IGZyb20gXCJvc1wiO1xuICpcbiAqIGNvbnN0IE5PVEVTX0RCID0gcmVzb2x2ZShob21lZGlyKCksIFwiTGlicmFyeS9Hcm91cCBDb250YWluZXJzL2dyb3VwLmNvbS5hcHBsZS5ub3Rlcy9Ob3RlU3RvcmUuc3FsaXRlXCIpO1xuICogY29uc3Qgbm90ZXNRdWVyeSA9IGBTRUxFQ1QgaWQsIHRpdGxlIEZST00gLi4uYDtcbiAqIHR5cGUgTm90ZUl0ZW0gPSB7XG4gKiAgIGlkOiBzdHJpbmc7XG4gKiAgIHRpdGxlOiBzdHJpbmc7XG4gKiB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQoKSB7XG4gKiAgIGNvbnN0IHsgaXNMb2FkaW5nLCBkYXRhLCBwZXJtaXNzaW9uVmlldyB9ID0gdXNlU1FMPE5vdGVJdGVtPihOT1RFU19EQiwgbm90ZXNRdWVyeSk7XG4gKlxuICogICBpZiAocGVybWlzc2lvblZpZXcpIHtcbiAqICAgICByZXR1cm4gcGVybWlzc2lvblZpZXc7XG4gKiAgIH1cbiAqXG4gKiAgIHJldHVybiAoXG4gKiAgICAgPExpc3QgaXNMb2FkaW5nPXtpc0xvYWRpbmd9PlxuICogICAgICAgeyhkYXRhIHx8IFtdKS5tYXAoKGl0ZW0pID0+IChcbiAqICAgICAgICAgPExpc3QuSXRlbSBrZXk9e2l0ZW0uaWR9IHRpdGxlPXtpdGVtLnRpdGxlfSAvPlxuICogICAgICAgKSl9XG4gKiAgICAgPC9MaXN0PlxuICogICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VTUUw8VCA9IHVua25vd24+KFxuICBkYXRhYmFzZVBhdGg6IHN0cmluZyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICAvKiogQSBzdHJpbmcgZXhwbGFpbmluZyB3aHkgdGhlIGV4dGVuc2lvbiBuZWVkcyBmdWxsIGRpc2sgYWNjZXNzLiBGb3IgZXhhbXBsZSwgdGhlIEFwcGxlIE5vdGVzIGV4dGVuc2lvbiB1c2VzIGBcIlRoaXMgaXMgcmVxdWlyZWQgdG8gc2VhcmNoIHlvdXIgQXBwbGUgTm90ZXMuXCJgLiBXaGlsZSBpdCBpcyBvcHRpb25hbCwgd2UgcmVjb21tZW5kIHNldHRpbmcgaXQgdG8gaGVscCB1c2VycyB1bmRlcnN0YW5kLiAqL1xuICAgIHBlcm1pc3Npb25QcmltaW5nPzogc3RyaW5nO1xuICB9ICYgT21pdDxQcm9taXNlT3B0aW9uczwoZGF0YWJhc2U6IHN0cmluZywgcXVlcnk6IHN0cmluZykgPT4gUHJvbWlzZTxUW10+PiwgXCJhYm9ydGFibGVcIj4sXG4pIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICBjb25zdCB7IHBlcm1pc3Npb25QcmltaW5nLCAuLi51c2VQcm9taXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcblxuICBjb25zdCBbcGVybWlzc2lvblZpZXcsIHNldFBlcm1pc3Npb25WaWV3XSA9IHVzZVN0YXRlPFJlYWN0LkpTWC5FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhdGVzdE9wdGlvbnMgPSB1c2VMYXRlc3Qob3B0aW9ucyB8fCB7fSk7XG4gIGNvbnN0IGFib3J0YWJsZSA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXI+KG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZUVycm9yID0gdXNlQ2FsbGJhY2soXG4gICAgKF9lcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoX2Vycm9yKTtcbiAgICAgIGNvbnN0IGVycm9yID1cbiAgICAgICAgX2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgX2Vycm9yLm1lc3NhZ2UuaW5jbHVkZXMoXCJhdXRob3JpemF0aW9uIGRlbmllZFwiKVxuICAgICAgICAgID8gbmV3IFBlcm1pc3Npb25FcnJvcihcIllvdSBkbyBub3QgaGF2ZSBwZXJtaXNzaW9uIHRvIGFjY2VzcyB0aGUgZGF0YWJhc2UuXCIpXG4gICAgICAgICAgOiAoX2Vycm9yIGFzIEVycm9yKTtcblxuICAgICAgaWYgKGlzUGVybWlzc2lvbkVycm9yKGVycm9yKSkge1xuICAgICAgICBzZXRQZXJtaXNzaW9uVmlldyg8UGVybWlzc2lvbkVycm9yU2NyZWVuIHByaW1pbmc9e2xhdGVzdE9wdGlvbnMuY3VycmVudC5wZXJtaXNzaW9uUHJpbWluZ30gLz4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGxhdGVzdE9wdGlvbnMuY3VycmVudC5vbkVycm9yKSB7XG4gICAgICAgICAgbGF0ZXN0T3B0aW9ucy5jdXJyZW50Lm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChlbnZpcm9ubWVudC5sYXVuY2hUeXBlICE9PSBMYXVuY2hUeXBlLkJhY2tncm91bmQpIHtcbiAgICAgICAgICAgIHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHtcbiAgICAgICAgICAgICAgdGl0bGU6IFwiQ2Fubm90IHF1ZXJ5IHRoZSBkYXRhXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIFtsYXRlc3RPcHRpb25zXSxcbiAgKTtcblxuICBjb25zdCBmbiA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghZXhpc3RzU3luYyhkYXRhYmFzZVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgZGF0YWJhc2UgZG9lcyBub3QgZXhpc3RcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzeW5jIChkYXRhYmFzZVBhdGg6IHN0cmluZywgcXVlcnk6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgYWJvcnRTaWduYWwgPSBhYm9ydGFibGUuY3VycmVudD8uc2lnbmFsO1xuICAgICAgcmV0dXJuIGJhc2VFeGVjdXRlU1FMPFQ+KGRhdGFiYXNlUGF0aCwgcXVlcnksIHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9KTtcbiAgICB9O1xuICB9LCBbZGF0YWJhc2VQYXRoXSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi51c2VQcm9taXNlKGZuLCBbZGF0YWJhc2VQYXRoLCBxdWVyeV0sIHsgLi4udXNlUHJvbWlzZU9wdGlvbnMsIG9uRXJyb3I6IGhhbmRsZUVycm9yIH0pLFxuICAgIHBlcm1pc3Npb25WaWV3LFxuICB9O1xufVxuXG5mdW5jdGlvbiBQZXJtaXNzaW9uRXJyb3JTY3JlZW4ocHJvcHM6IHsgcHJpbWluZz86IHN0cmluZyB9KSB7XG4gIGNvbnN0IG1hY29zVmVudHVyYUFuZExhdGVyID0gcGFyc2VJbnQob3MucmVsZWFzZSgpLnNwbGl0KFwiLlwiKVswXSkgPj0gMjI7XG4gIGNvbnN0IHByZWZlcmVuY2VzU3RyaW5nID0gbWFjb3NWZW50dXJhQW5kTGF0ZXIgPyBcIlNldHRpbmdzXCIgOiBcIlByZWZlcmVuY2VzXCI7XG5cbiAgY29uc3QgYWN0aW9uID0gbWFjb3NWZW50dXJhQW5kTGF0ZXJcbiAgICA/IHtcbiAgICAgICAgdGl0bGU6IFwiT3BlbiBTeXN0ZW0gU2V0dGluZ3MgLT4gUHJpdmFjeVwiLFxuICAgICAgICB0YXJnZXQ6IFwieC1hcHBsZS5zeXN0ZW1wcmVmZXJlbmNlczpjb20uYXBwbGUucHJlZmVyZW5jZS5zZWN1cml0eT9Qcml2YWN5X0FsbEZpbGVzXCIsXG4gICAgICB9XG4gICAgOiB7XG4gICAgICAgIHRpdGxlOiBcIk9wZW4gU3lzdGVtIFByZWZlcmVuY2VzIC0+IFNlY3VyaXR5XCIsXG4gICAgICAgIHRhcmdldDogXCJ4LWFwcGxlLnN5c3RlbXByZWZlcmVuY2VzOmNvbS5hcHBsZS5wcmVmZXJlbmNlLnNlY3VyaXR5P1ByaXZhY3lfQWxsRmlsZXNcIixcbiAgICAgIH07XG5cbiAgaWYgKGVudmlyb25tZW50LmNvbW1hbmRNb2RlID09PSBcIm1lbnUtYmFyXCIpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1lbnVCYXJFeHRyYSBpY29uPXtJY29uLldhcm5pbmd9IHRpdGxlPXtlbnZpcm9ubWVudC5jb21tYW5kTmFtZX0+XG4gICAgICAgIDxNZW51QmFyRXh0cmEuSXRlbVxuICAgICAgICAgIHRpdGxlPVwiUmF5Y2FzdCBuZWVkcyBmdWxsIGRpc2sgYWNjZXNzXCJcbiAgICAgICAgICB0b29sdGlwPXtgWW91IGNhbiByZXZlcnQgdGhpcyBhY2Nlc3MgaW4gJHtwcmVmZXJlbmNlc1N0cmluZ30gd2hlbmV2ZXIgeW91IHdhbnRgfVxuICAgICAgICAvPlxuICAgICAgICB7cHJvcHMucHJpbWluZyA/IChcbiAgICAgICAgICA8TWVudUJhckV4dHJhLkl0ZW1cbiAgICAgICAgICAgIHRpdGxlPXtwcm9wcy5wcmltaW5nfVxuICAgICAgICAgICAgdG9vbHRpcD17YFlvdSBjYW4gcmV2ZXJ0IHRoaXMgYWNjZXNzIGluICR7cHJlZmVyZW5jZXNTdHJpbmd9IHdoZW5ldmVyIHlvdSB3YW50YH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPE1lbnVCYXJFeHRyYS5TZXBhcmF0b3IgLz5cbiAgICAgICAgPE1lbnVCYXJFeHRyYS5JdGVtIHRpdGxlPXthY3Rpb24udGl0bGV9IG9uQWN0aW9uPXsoKSA9PiBvcGVuKGFjdGlvbi50YXJnZXQpfSAvPlxuICAgICAgPC9NZW51QmFyRXh0cmE+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPExpc3Q+XG4gICAgICA8TGlzdC5FbXB0eVZpZXdcbiAgICAgICAgaWNvbj17e1xuICAgICAgICAgIHNvdXJjZToge1xuICAgICAgICAgICAgbGlnaHQ6IFwiaHR0cHM6Ly9yYXljYXN0LmNvbS91cGxvYWRzL2V4dGVuc2lvbnMtdXRpbHMtc2VjdXJpdHktcGVybWlzc2lvbnMtbGlnaHQucG5nXCIsXG4gICAgICAgICAgICBkYXJrOiBcImh0dHBzOi8vcmF5Y2FzdC5jb20vdXBsb2Fkcy9leHRlbnNpb25zLXV0aWxzLXNlY3VyaXR5LXBlcm1pc3Npb25zLWRhcmsucG5nXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9XCJSYXljYXN0IG5lZWRzIGZ1bGwgZGlzayBhY2Nlc3MuXCJcbiAgICAgICAgZGVzY3JpcHRpb249e2Ake1xuICAgICAgICAgIHByb3BzLnByaW1pbmcgPyBwcm9wcy5wcmltaW5nICsgXCJcXG5cIiA6IFwiXCJcbiAgICAgICAgfVlvdSBjYW4gcmV2ZXJ0IHRoaXMgYWNjZXNzIGluICR7cHJlZmVyZW5jZXNTdHJpbmd9IHdoZW5ldmVyIHlvdSB3YW50LmB9XG4gICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAgICAgICAgICAgIDxBY3Rpb24uT3BlbiB7Li4uYWN0aW9ufSAvPlxuICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9MaXN0PlxuICApO1xufVxuIiwgImltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHsgY29weUZpbGUsIG1rZGlyLCB3cml0ZUZpbGUgfSBmcm9tIFwibm9kZTpmcy9wcm9taXNlc1wiO1xuaW1wb3J0IG9zIGZyb20gXCJub2RlOm9zXCI7XG5pbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGdldFNwYXduZWRQcm9taXNlLCBnZXRTcGF3bmVkUmVzdWx0IH0gZnJvbSBcIi4vZXhlYy11dGlsc1wiO1xuaW1wb3J0IHsgaGFzaCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5uYW1lID0gXCJQZXJtaXNzaW9uRXJyb3JcIjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQZXJtaXNzaW9uRXJyb3IoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBQZXJtaXNzaW9uRXJyb3Ige1xuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5uYW1lID09PSBcIlBlcm1pc3Npb25FcnJvclwiO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmFzZUV4ZWN1dGVTUUw8VCA9IHVua25vd24+KFxuICBkYXRhYmFzZVBhdGg6IHN0cmluZyxcbiAgcXVlcnk6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICBzaWduYWw/OiBBYm9ydFNpZ25hbDtcbiAgfSxcbik6IFByb21pc2U8VFtdPiB7XG4gIGlmICghZXhpc3RzU3luYyhkYXRhYmFzZVBhdGgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGRhdGFiYXNlIGRvZXMgbm90IGV4aXN0XCIpO1xuICB9XG5cbiAgbGV0IHNxbGl0ZTM6IHR5cGVvZiBpbXBvcnQoXCJub2RlOnNxbGl0ZVwiKTtcbiAgdHJ5IHtcbiAgICAvLyB0aGlzIGlzIGEgYml0IHVnbHkgYnV0IHdlIGNhbid0IGRpcmVjdGx5IGltcG9ydCBcIm5vZGU6c3FsaXRlXCIgaGVyZSBiZWNhdXNlIHBhcmNlbCB3aWxsIGhvaXN0IGl0IGFueXdheSBhbmQgaXQgd2lsbCBicmVhayB3aGVuIGl0J3Mgbm90IGF2YWlsYWJsZVxuICAgIGNvbnN0IGR5bmFtaWNJbXBvcnQgPSAobW9kdWxlOiBzdHJpbmcpID0+IGltcG9ydChtb2R1bGUpO1xuICAgIHNxbGl0ZTMgPSBhd2FpdCBkeW5hbWljSW1wb3J0KFwibm9kZTpzcWxpdGVcIik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgLy8gSWYgc3FsaXRlMyBpcyBub3QgYXZhaWxhYmxlLCB3ZSBmYWxsYmFjayB0byB1c2luZyB0aGUgc3FsaXRlMyBDTEkgKGF2YWlsYWJsZSBvbiBtYWNPUyBhbmQgTGludXggYnkgZGVmYXVsdCkuXG4gICAgcmV0dXJuIHNxbGl0ZUZhbGxiYWNrPFQ+KGRhdGFiYXNlUGF0aCwgcXVlcnksIG9wdGlvbnMpO1xuICB9XG5cbiAgbGV0IGRiID0gbmV3IHNxbGl0ZTMuRGF0YWJhc2VTeW5jKGRhdGFiYXNlUGF0aCwgeyBvcGVuOiBmYWxzZSwgcmVhZE9ubHk6IHRydWUgfSk7XG5cbiAgY29uc3QgYWJvcnRTaWduYWwgPSBvcHRpb25zPy5zaWduYWw7XG5cbiAgdHJ5IHtcbiAgICBkYi5vcGVuKCk7XG5cbiAgICBjb25zdCBzdGF0ZW1lbnQgPSBkYi5wcmVwYXJlKHF1ZXJ5KTtcbiAgICBjaGVja0Fib3J0ZWQoYWJvcnRTaWduYWwpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gc3RhdGVtZW50LmFsbCgpO1xuXG4gICAgZGIuY2xvc2UoKTtcblxuICAgIHJldHVybiByZXN1bHQgYXMgVFtdO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgaWYgKGVycm9yLmVycmNvZGUgPT09IDUgfHwgZXJyb3IuZXJyY29kZSA9PT0gMTQgfHwgZXJyb3IubWVzc2FnZS5tYXRjaChcIig1KVwiKSB8fCBlcnJvci5tZXNzYWdlLm1hdGNoKFwiKDE0KVwiKSkge1xuICAgICAgLy8gVGhhdCBtZWFucyB0aGF0IHRoZSBEQiBpcyBidXN5IGJlY2F1c2Ugb2YgYW5vdGhlciBhcHAgaXMgbG9ja2luZyBpdFxuICAgICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gQ2hyb21lIG9yIEFyYyBpcyBvcGVuZWQ6IHRoZXkgbG9jayB0aGUgSGlzdG9yeSBkYi5cbiAgICAgIC8vIEFzIGFuIHVnbHkgd29ya2Fyb3VuZCwgd2UgZHVwbGljYXRlIHRoZSBmaWxlIGFuZCByZWFkIHRoYXQgaW5zdGVhZFxuICAgICAgLy8gKHdpdGggdmZzIHVuaXggLSBub25lIHRvIGp1c3Qgbm90IGNhcmUgYWJvdXQgbG9ja3MpXG4gICAgICBsZXQgd29ya2Fyb3VuZENvcGllZERiOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBpZiAoIXdvcmthcm91bmRDb3BpZWREYikge1xuICAgICAgICBjb25zdCB0ZW1wRm9sZGVyID0gcGF0aC5qb2luKG9zLnRtcGRpcigpLCBcInVzZVNRTFwiLCBoYXNoKGRhdGFiYXNlUGF0aCkpO1xuICAgICAgICBhd2FpdCBta2Rpcih0ZW1wRm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICAgICAgICB3b3JrYXJvdW5kQ29waWVkRGIgPSBwYXRoLmpvaW4odGVtcEZvbGRlciwgXCJkYi5kYlwiKTtcbiAgICAgICAgYXdhaXQgY29weUZpbGUoZGF0YWJhc2VQYXRoLCB3b3JrYXJvdW5kQ29waWVkRGIpO1xuXG4gICAgICAgIGF3YWl0IHdyaXRlRmlsZSh3b3JrYXJvdW5kQ29waWVkRGIgKyBcIi1zaG1cIiwgXCJcIik7XG4gICAgICAgIGF3YWl0IHdyaXRlRmlsZSh3b3JrYXJvdW5kQ29waWVkRGIgKyBcIi13YWxcIiwgXCJcIik7XG5cbiAgICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcbiAgICAgIH1cblxuICAgICAgZGIgPSBuZXcgc3FsaXRlMy5EYXRhYmFzZVN5bmMod29ya2Fyb3VuZENvcGllZERiLCB7IG9wZW46IGZhbHNlLCByZWFkT25seTogdHJ1ZSB9KTtcbiAgICAgIGRiLm9wZW4oKTtcbiAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgICAgIGNvbnN0IHN0YXRlbWVudCA9IGRiLnByZXBhcmUocXVlcnkpO1xuICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gc3RhdGVtZW50LmFsbCgpO1xuXG4gICAgICBkYi5jbG9zZSgpO1xuXG4gICAgICByZXR1cm4gcmVzdWx0IGFzIFRbXTtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzcWxpdGVGYWxsYmFjazxUID0gdW5rbm93bj4oXG4gIGRhdGFiYXNlUGF0aDogc3RyaW5nLFxuICBxdWVyeTogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIHNpZ25hbD86IEFib3J0U2lnbmFsO1xuICB9LFxuKTogUHJvbWlzZTxUW10+IHtcbiAgY29uc3QgYWJvcnRTaWduYWwgPSBvcHRpb25zPy5zaWduYWw7XG5cbiAgbGV0IHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24oXCJzcWxpdGUzXCIsIFtcIi0tanNvblwiLCBcIi0tcmVhZG9ubHlcIiwgZGF0YWJhc2VQYXRoLCBxdWVyeV0sIHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9KTtcbiAgbGV0IHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCk7XG4gIGxldCBbeyBlcnJvciwgZXhpdENvZGUsIHNpZ25hbCB9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0PHN0cmluZz4oXG4gICAgc3Bhd25lZCxcbiAgICB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSxcbiAgICBzcGF3bmVkUHJvbWlzZSxcbiAgKTtcbiAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcblxuICBpZiAoc3RkZXJyUmVzdWx0Lm1hdGNoKFwiKDUpXCIpIHx8IHN0ZGVyclJlc3VsdC5tYXRjaChcIigxNClcIikpIHtcbiAgICAvLyBUaGF0IG1lYW5zIHRoYXQgdGhlIERCIGlzIGJ1c3kgYmVjYXVzZSBvZiBhbm90aGVyIGFwcCBpcyBsb2NraW5nIGl0XG4gICAgLy8gVGhpcyBoYXBwZW5zIHdoZW4gQ2hyb21lIG9yIEFyYyBpcyBvcGVuZWQ6IHRoZXkgbG9jayB0aGUgSGlzdG9yeSBkYi5cbiAgICAvLyBBcyBhbiB1Z2x5IHdvcmthcm91bmQsIHdlIGR1cGxpY2F0ZSB0aGUgZmlsZSBhbmQgcmVhZCB0aGF0IGluc3RlYWRcbiAgICAvLyAod2l0aCB2ZnMgdW5peCAtIG5vbmUgdG8ganVzdCBub3QgY2FyZSBhYm91dCBsb2NrcylcbiAgICBsZXQgd29ya2Fyb3VuZENvcGllZERiOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWYgKCF3b3JrYXJvdW5kQ29waWVkRGIpIHtcbiAgICAgIGNvbnN0IHRlbXBGb2xkZXIgPSBwYXRoLmpvaW4ob3MudG1wZGlyKCksIFwidXNlU1FMXCIsIGhhc2goZGF0YWJhc2VQYXRoKSk7XG4gICAgICBhd2FpdCBta2Rpcih0ZW1wRm9sZGVyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG5cbiAgICAgIHdvcmthcm91bmRDb3BpZWREYiA9IHBhdGguam9pbih0ZW1wRm9sZGVyLCBcImRiLmRiXCIpO1xuICAgICAgYXdhaXQgY29weUZpbGUoZGF0YWJhc2VQYXRoLCB3b3JrYXJvdW5kQ29waWVkRGIpO1xuXG4gICAgICBhd2FpdCB3cml0ZUZpbGUod29ya2Fyb3VuZENvcGllZERiICsgXCItc2htXCIsIFwiXCIpO1xuICAgICAgYXdhaXQgd3JpdGVGaWxlKHdvcmthcm91bmRDb3BpZWREYiArIFwiLXdhbFwiLCBcIlwiKTtcblxuICAgICAgY2hlY2tBYm9ydGVkKGFib3J0U2lnbmFsKTtcbiAgICB9XG5cbiAgICBzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKFwic3FsaXRlM1wiLCBbXCItLWpzb25cIiwgXCItLXJlYWRvbmx5XCIsIFwiLS12ZnNcIiwgXCJ1bml4LW5vbmVcIiwgd29ya2Fyb3VuZENvcGllZERiLCBxdWVyeV0sIHtcbiAgICAgIHNpZ25hbDogYWJvcnRTaWduYWwsXG4gICAgfSk7XG4gICAgc3Bhd25lZFByb21pc2UgPSBnZXRTcGF3bmVkUHJvbWlzZShzcGF3bmVkKTtcbiAgICBbeyBlcnJvciwgZXhpdENvZGUsIHNpZ25hbCB9LCBzdGRvdXRSZXN1bHQsIHN0ZGVyclJlc3VsdF0gPSBhd2FpdCBnZXRTcGF3bmVkUmVzdWx0PHN0cmluZz4oXG4gICAgICBzcGF3bmVkLFxuICAgICAgeyBlbmNvZGluZzogXCJ1dGYtOFwiIH0sXG4gICAgICBzcGF3bmVkUHJvbWlzZSxcbiAgICApO1xuICAgIGNoZWNrQWJvcnRlZChhYm9ydFNpZ25hbCk7XG4gIH1cblxuICBpZiAoZXJyb3IgfHwgZXhpdENvZGUgIT09IDAgfHwgc2lnbmFsICE9PSBudWxsKSB7XG4gICAgaWYgKHN0ZGVyclJlc3VsdC5pbmNsdWRlcyhcImF1dGhvcml6YXRpb24gZGVuaWVkXCIpKSB7XG4gICAgICB0aHJvdyBuZXcgUGVybWlzc2lvbkVycm9yKFwiWW91IGRvIG5vdCBoYXZlIHBlcm1pc3Npb24gdG8gYWNjZXNzIHRoZSBkYXRhYmFzZS5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihzdGRlcnJSZXN1bHQgfHwgXCJVbmtub3duIGVycm9yXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBKU09OLnBhcnNlKHN0ZG91dFJlc3VsdC50cmltKCkgfHwgXCJbXVwiKSBhcyBUW107XG59XG5cbmZ1bmN0aW9uIGNoZWNrQWJvcnRlZChzaWduYWw/OiBBYm9ydFNpZ25hbCkge1xuICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXCJhYm9ydGVkXCIpO1xuICAgIGVycm9yLm5hbWUgPSBcIkFib3J0RXJyb3JcIjtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIiwgImltcG9ydCB7IEZvcm0gfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgU2V0U3RhdGVBY3Rpb24gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuXG4vKipcbiAqIFNob3J0aGFuZHMgZm9yIGNvbW1vbiB2YWxpZGF0aW9uIGNhc2VzXG4gKi9cbmV4cG9ydCBlbnVtIEZvcm1WYWxpZGF0aW9uIHtcbiAgLyoqIFNob3cgYW4gZXJyb3Igd2hlbiB0aGUgdmFsdWUgb2YgdGhlIGl0ZW0gaXMgZW1wdHkgKi9cbiAgUmVxdWlyZWQgPSBcInJlcXVpcmVkXCIsXG59XG5cbnR5cGUgVmFsaWRhdGlvbkVycm9yID0gc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbDtcbnR5cGUgVmFsaWRhdG9yPFZhbHVlVHlwZT4gPSAoKHZhbHVlOiBWYWx1ZVR5cGUgfCB1bmRlZmluZWQpID0+IFZhbGlkYXRpb25FcnJvcikgfCBGb3JtVmFsaWRhdGlvbjtcblxuZnVuY3Rpb24gdmFsaWRhdGlvbkVycm9yPFZhbHVlVHlwZT4oXG4gIHZhbGlkYXRpb246IFZhbGlkYXRvcjxWYWx1ZVR5cGU+IHwgdW5kZWZpbmVkLFxuICB2YWx1ZTogVmFsdWVUeXBlIHwgdW5kZWZpbmVkLFxuKTogVmFsaWRhdGlvbkVycm9yIHtcbiAgaWYgKHZhbGlkYXRpb24pIHtcbiAgICBpZiAodHlwZW9mIHZhbGlkYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIHZhbGlkYXRpb24odmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvbiA9PT0gRm9ybVZhbGlkYXRpb24uUmVxdWlyZWQpIHtcbiAgICAgIGxldCB2YWx1ZUlzVmFsaWQgPSB0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGw7XG4gICAgICBpZiAodmFsdWVJc1ZhbGlkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgdmFsdWVJc1ZhbGlkID0gdmFsdWUubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICB2YWx1ZUlzVmFsaWQgPSB2YWx1ZS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgdmFsdWVJc1ZhbGlkID0gdmFsdWUuZ2V0VGltZSgpID4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCF2YWx1ZUlzVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuIFwiVGhlIGl0ZW0gaXMgcmVxdWlyZWRcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudHlwZSBWYWxpZGF0aW9uPFQgZXh0ZW5kcyBGb3JtLlZhbHVlcz4gPSB7IFtpZCBpbiBrZXlvZiBUXT86IFZhbGlkYXRvcjxUW2lkXT4gfTtcblxuaW50ZXJmYWNlIEZvcm1Qcm9wczxUIGV4dGVuZHMgRm9ybS5WYWx1ZXM+IHtcbiAgLyoqIEZ1bmN0aW9uIHRvIHBhc3MgdG8gdGhlIGBvblN1Ym1pdGAgcHJvcCBvZiB0aGUgYDxBY3Rpb24uU3VibWl0Rm9ybT5gIGVsZW1lbnQuIEl0IHdyYXBzIHRoZSBpbml0aWFsIGBvblN1Ym1pdGAgYXJndW1lbnQgd2l0aCBzb21lIGdvb2RpZXMgcmVsYXRlZCB0byB0aGUgdmFsaWRhdGlvbi4gKi9cbiAgaGFuZGxlU3VibWl0OiAodmFsdWVzOiBUKSA9PiB2b2lkIHwgYm9vbGVhbiB8IFByb21pc2U8dm9pZCB8IGJvb2xlYW4+O1xuICAvKiogVGhlIHByb3BzIHRoYXQgbXVzdCBiZSBwYXNzZWQgdG8gdGhlIGA8Rm9ybS5JdGVtPmAgZWxlbWVudHMgdG8gaGFuZGxlIHRoZSB2YWxpZGF0aW9ucy4gKi9cbiAgaXRlbVByb3BzOiB7XG4gICAgW2lkIGluIGtleW9mIFJlcXVpcmVkPFQ+XTogUGFydGlhbDxGb3JtLkl0ZW1Qcm9wczxUW2lkXT4+ICYge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byBwcm9ncmFtbWF0aWNhbGx5IHNldCB0aGUgdmFsaWRhdGlvbiBvZiBhIHNwZWNpZmljIGZpZWxkLiAqL1xuICBzZXRWYWxpZGF0aW9uRXJyb3I6IChpZDoga2V5b2YgVCwgZXJyb3I6IFZhbGlkYXRpb25FcnJvcikgPT4gdm9pZDtcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBzZXQgdGhlIHZhbHVlIG9mIGEgc3BlY2lmaWMgZmllbGQuICovXG4gIHNldFZhbHVlOiA8SyBleHRlbmRzIGtleW9mIFQ+KGlkOiBLLCB2YWx1ZTogU2V0U3RhdGVBY3Rpb248VFtLXT4pID0+IHZvaWQ7XG4gIC8qKiBUaGUgY3VycmVudCB2YWx1ZXMgb2YgdGhlIGZvcm0uICovXG4gIHZhbHVlczogVDtcbiAgLyoqIEZ1bmN0aW9uIHRoYXQgY2FuIGJlIHVzZWQgdG8gcHJvZ3JhbW1hdGljYWxseSBmb2N1cyBhIHNwZWNpZmljIGZpZWxkLiAqL1xuICBmb2N1czogKGlkOiBrZXlvZiBUKSA9PiB2b2lkO1xuICAvKiogRnVuY3Rpb24gdGhhdCBjYW4gYmUgdXNlZCB0byByZXNldCB0aGUgdmFsdWVzIG9mIHRoZSBGb3JtLiAqL1xuICByZXNldDogKGluaXRpYWxWYWx1ZXM/OiBQYXJ0aWFsPFQ+KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIEhvb2sgdGhhdCBwcm92aWRlcyBhIGhpZ2gtbGV2ZWwgaW50ZXJmYWNlIHRvIHdvcmsgd2l0aCBGb3JtcywgYW5kIG1vcmUgcGFydGljdWxhcmx5LCB3aXRoIEZvcm0gdmFsaWRhdGlvbnMuIEl0IGluY29ycG9yYXRlcyBhbGwgdGhlIGdvb2QgcHJhY3RpY2VzIHRvIHByb3ZpZGUgYSBncmVhdCBVc2VyIEV4cGVyaWVuY2UgZm9yIHlvdXIgRm9ybXMuXG4gKlxuICogQHJldHVybnMgYW4gb2JqZWN0IHdoaWNoIGNvbnRhaW5zIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyBhbmQgcHJvcHMgdG8gcHJvdmlkZSBhIGdvb2QgVXNlciBFeHBlcmllbmNlIGluIHlvdXIgRm9ybS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBpbXBvcnQgeyBBY3Rpb24sIEFjdGlvblBhbmVsLCBGb3JtLCBzaG93VG9hc3QsIFRvYXN0IH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgdXNlRm9ybSwgRm9ybVZhbGlkYXRpb24gfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBpbnRlcmZhY2UgU2lnblVwRm9ybVZhbHVlcyB7XG4gKiAgIG5pY2tuYW1lOiBzdHJpbmc7XG4gKiAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gKiB9XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgeyBoYW5kbGVTdWJtaXQsIGl0ZW1Qcm9wcyB9ID0gdXNlRm9ybTxTaWduVXBGb3JtVmFsdWVzPih7XG4gKiAgICAgb25TdWJtaXQodmFsdWVzKSB7XG4gKiAgICAgICBzaG93VG9hc3QoVG9hc3QuU3R5bGUuU3VjY2VzcywgXCJZYXkhXCIsIGAke3ZhbHVlcy5uaWNrbmFtZX0gYWNjb3VudCBjcmVhdGVkYCk7XG4gKiAgICAgfSxcbiAqICAgICB2YWxpZGF0aW9uOiB7XG4gKiAgICAgICBuaWNrbmFtZTogRm9ybVZhbGlkYXRpb24uUmVxdWlyZWQsXG4gKiAgICAgICBwYXNzd29yZDogKHZhbHVlKSA9PiB7XG4gKiAgICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPCA4KSB7XG4gKiAgICAgICAgICAgcmV0dXJuIFwiUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IHN5bWJvbHNcIjtcbiAqICAgICAgICAgfSBlbHNlIGlmICghdmFsdWUpIHtcbiAqICAgICAgICAgICByZXR1cm4gXCJUaGUgaXRlbSBpcyByZXF1aXJlZFwiO1xuICogICAgICAgICB9XG4gKiAgICAgICB9LFxuICogICAgIH0sXG4gKiAgIH0pO1xuICpcbiAqICAgcmV0dXJuIChcbiAqICAgICA8Rm9ybVxuICogICAgICAgYWN0aW9ucz17XG4gKiAgICAgICAgIDxBY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICA8QWN0aW9uLlN1Ym1pdEZvcm0gdGl0bGU9XCJTdWJtaXRcIiBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSAvPlxuICogICAgICAgICA8L0FjdGlvblBhbmVsPlxuICogICAgICAgfVxuICogICAgID5cbiAqICAgICAgIDxGb3JtLlRleHRGaWVsZCB0aXRsZT1cIk5pY2tuYW1lXCIgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIG5pY2tuYW1lXCIgey4uLml0ZW1Qcm9wcy5uaWNrbmFtZX0gLz5cbiAqICAgICAgIDxGb3JtLlBhc3N3b3JkRmllbGRcbiAqICAgICAgICAgdGl0bGU9XCJQYXNzd29yZFwiXG4gKiAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgcGFzc3dvcmQgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzIGxvbmdcIlxuICogICAgICAgICB7Li4uaXRlbVByb3BzLnBhc3N3b3JkfVxuICogICAgICAgLz5cbiAqICAgICA8L0Zvcm0+XG4gKiAgICk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm08VCBleHRlbmRzIEZvcm0uVmFsdWVzPihwcm9wczoge1xuICAvKiogQ2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRoZSBmb3JtIGlzIHN1Ym1pdHRlZCBhbmQgYWxsIHZhbGlkYXRpb25zIHBhc3MuICovXG4gIG9uU3VibWl0OiAodmFsdWVzOiBUKSA9PiB2b2lkIHwgYm9vbGVhbiB8IFByb21pc2U8dm9pZCB8IGJvb2xlYW4+O1xuICAvKiogVGhlIGluaXRpYWwgdmFsdWVzIHRvIHNldCB3aGVuIHRoZSBGb3JtIGlzIGZpcnN0IHJlbmRlcmVkLiAqL1xuICBpbml0aWFsVmFsdWVzPzogUGFydGlhbDxUPjtcbiAgLyoqIFRoZSB2YWxpZGF0aW9uIHJ1bGVzIGZvciB0aGUgRm9ybS4gQSB2YWxpZGF0aW9uIGZvciBhIEZvcm0gaXRlbSBpcyBhIGZ1bmN0aW9uIHRoYXQgdGFrZXMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGl0ZW0gYXMgYW4gYXJndW1lbnQgYW5kIG11c3QgcmV0dXJuIGEgc3RyaW5nIHdoZW4gdGhlIHZhbGlkYXRpb24gaXMgZmFpbGluZy5cbiAgICpcbiAgICogVGhlcmUgYXJlIGFsc28gc29tZSBzaG9ydGhhbmRzIGZvciBjb21tb24gY2FzZXMsIHNlZSB7QGxpbmsgRm9ybVZhbGlkYXRpb259LlxuICAgKiAqL1xuICB2YWxpZGF0aW9uPzogVmFsaWRhdGlvbjxUPjtcbn0pOiBGb3JtUHJvcHM8VD4ge1xuICBjb25zdCB7IG9uU3VibWl0OiBfb25TdWJtaXQsIHZhbGlkYXRpb24sIGluaXRpYWxWYWx1ZXMgPSB7fSB9ID0gcHJvcHM7XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciBpdCdzIGZpbmUgaWYgd2UgZG9uJ3Qgc3BlY2lmeSBhbGwgdGhlIHZhbHVlc1xuICBjb25zdCBbdmFsdWVzLCBzZXRWYWx1ZXNdID0gdXNlU3RhdGU8VD4oaW5pdGlhbFZhbHVlcyk7XG4gIGNvbnN0IFtlcnJvcnMsIHNldEVycm9yc10gPSB1c2VTdGF0ZTx7IFtpZCBpbiBrZXlvZiBUXT86IFZhbGlkYXRpb25FcnJvciB9Pih7fSk7XG4gIGNvbnN0IHJlZnMgPSB1c2VSZWY8eyBbaWQgaW4ga2V5b2YgVF0/OiBGb3JtLkl0ZW1SZWZlcmVuY2UgfT4oe30pO1xuXG4gIGNvbnN0IGxhdGVzdFZhbGlkYXRpb24gPSB1c2VMYXRlc3Q8VmFsaWRhdGlvbjxUPj4odmFsaWRhdGlvbiB8fCB7fSk7XG4gIGNvbnN0IGxhdGVzdE9uU3VibWl0ID0gdXNlTGF0ZXN0KF9vblN1Ym1pdCk7XG5cbiAgY29uc3QgZm9jdXMgPSB1c2VDYWxsYmFjayhcbiAgICAoaWQ6IGtleW9mIFQpID0+IHtcbiAgICAgIHJlZnMuY3VycmVudFtpZF0/LmZvY3VzKCk7XG4gICAgfSxcbiAgICBbcmVmc10sXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHZhbHVlczogVCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgbGV0IHZhbGlkYXRpb25FcnJvcnM6IGZhbHNlIHwgeyBba2V5IGluIGtleW9mIFRdPzogVmFsaWRhdGlvbkVycm9yIH0gPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgW2lkLCB2YWxpZGF0aW9uXSBvZiBPYmplY3QuZW50cmllcyhsYXRlc3RWYWxpZGF0aW9uLmN1cnJlbnQpKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gdmFsaWRhdGlvbkVycm9yKHZhbGlkYXRpb24sIHZhbHVlc1tpZF0pO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBpZiAoIXZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvcnMgPSB7fTtcbiAgICAgICAgICAgIC8vIHdlIGZvY3VzIHRoZSBmaXJzdCBpdGVtIHRoYXQgaGFzIGFuIGVycm9yXG4gICAgICAgICAgICBmb2N1cyhpZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvcnNbaWQgYXMga2V5b2YgVF0gPSBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICAgICAgc2V0RXJyb3JzKHZhbGlkYXRpb25FcnJvcnMpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBsYXRlc3RPblN1Ym1pdC5jdXJyZW50KHZhbHVlcyk7XG4gICAgICByZXR1cm4gdHlwZW9mIHJlc3VsdCA9PT0gXCJib29sZWFuXCIgPyByZXN1bHQgOiB0cnVlO1xuICAgIH0sXG4gICAgW2xhdGVzdFZhbGlkYXRpb24sIGxhdGVzdE9uU3VibWl0LCBmb2N1c10sXG4gICk7XG5cbiAgY29uc3Qgc2V0VmFsaWRhdGlvbkVycm9yID0gdXNlQ2FsbGJhY2soXG4gICAgKGlkOiBrZXlvZiBULCBlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PiB7XG4gICAgICBzZXRFcnJvcnMoKGVycm9ycykgPT4gKHsgLi4uZXJyb3JzLCBbaWRdOiBlcnJvciB9KSk7XG4gICAgfSxcbiAgICBbc2V0RXJyb3JzXSxcbiAgKTtcblxuICBjb25zdCBzZXRWYWx1ZSA9IHVzZUNhbGxiYWNrKFxuICAgIGZ1bmN0aW9uIDxLIGV4dGVuZHMga2V5b2YgVD4oaWQ6IEssIHZhbHVlOiBTZXRTdGF0ZUFjdGlvbjxUW0tdPikge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUUyBpcyBhbHdheXMgY29uZnVzZWQgYWJvdXQgU2V0U3RhdGVBY3Rpb24sIGJ1dCBpdCdzIGZpbmUgaGVyZVxuICAgICAgc2V0VmFsdWVzKCh2YWx1ZXMpID0+ICh7IC4uLnZhbHVlcywgW2lkXTogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB2YWx1ZSh2YWx1ZXNbaWRdKSA6IHZhbHVlIH0pKTtcbiAgICB9LFxuICAgIFtzZXRWYWx1ZXNdLFxuICApO1xuXG4gIGNvbnN0IGl0ZW1Qcm9wcyA9IHVzZU1lbW88eyBbaWQgaW4ga2V5b2YgUmVxdWlyZWQ8VD5dOiBQYXJ0aWFsPEZvcm0uSXRlbVByb3BzPFRbaWRdPj4gJiB7IGlkOiBzdHJpbmcgfSB9PigoKSA9PiB7XG4gICAgLy8gd2UgaGF2ZSB0byB1c2UgYSBwcm94eSBiZWNhdXNlIHdlIGRvbid0IGFjdHVhbGx5IGhhdmUgYW55IG9iamVjdCB0byBpdGVyYXRlIHRocm91Z2hcbiAgICAvLyBzbyBpbnN0ZWFkIHdlIGR5bmFtaWNhbGx5IGNyZWF0ZSB0aGUgcHJvcHMgd2hlbiByZXF1aXJlZFxuICAgIHJldHVybiBuZXcgUHJveHk8eyBbaWQgaW4ga2V5b2YgUmVxdWlyZWQ8VD5dOiBQYXJ0aWFsPEZvcm0uSXRlbVByb3BzPFRbaWRdPj4gJiB7IGlkOiBzdHJpbmcgfSB9PihcbiAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgdGhlIHdob2xlIHBvaW50IG9mIGEgcHJveHkuLi5cbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBnZXQodGFyZ2V0LCBpZDoga2V5b2YgVCkge1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBsYXRlc3RWYWxpZGF0aW9uLmN1cnJlbnRbaWRdO1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2lkXTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yc1tpZF0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHZhbGlkYXRpb25FcnJvcih2YWxpZGF0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgICAgc2V0VmFsaWRhdGlvbkVycm9yKGlkLCB1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZXRWYWx1ZShpZCwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQmx1cihldmVudCkge1xuICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IHZhbGlkYXRpb25FcnJvcih2YWxpZGF0aW9uLCBldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBzZXRWYWxpZGF0aW9uRXJyb3IoaWQsIGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yOiBlcnJvcnNbaWRdLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAvLyB3ZSBzaG91bGRuJ3QgcmV0dXJuIGB1bmRlZmluZWRgIG90aGVyd2lzZSBpdCB3aWxsIGJlIGFuIHVuY29udHJvbGxlZCBjb21wb25lbnRcbiAgICAgICAgICAgIHZhbHVlOiB0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogdmFsdWUsXG4gICAgICAgICAgICByZWY6IChpbnN0YW5jZTogRm9ybS5JdGVtUmVmZXJlbmNlKSA9PiB7XG4gICAgICAgICAgICAgIHJlZnMuY3VycmVudFtpZF0gPSBpbnN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSBhcyBQYXJ0aWFsPEZvcm0uSXRlbVByb3BzPFRba2V5b2YgVF0+PiAmIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICB9LCBbZXJyb3JzLCBsYXRlc3RWYWxpZGF0aW9uLCBzZXRWYWxpZGF0aW9uRXJyb3IsIHZhbHVlcywgcmVmcywgc2V0VmFsdWVdKTtcblxuICBjb25zdCByZXNldCA9IHVzZUNhbGxiYWNrKFxuICAgICh2YWx1ZXM/OiBQYXJ0aWFsPFQ+KSA9PiB7XG4gICAgICBzZXRFcnJvcnMoe30pO1xuICAgICAgT2JqZWN0LmVudHJpZXMocmVmcy5jdXJyZW50KS5mb3JFYWNoKChbaWQsIHJlZl0pID0+IHtcbiAgICAgICAgaWYgKCF2YWx1ZXM/LltpZF0pIHtcbiAgICAgICAgICByZWY/LnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGl0J3MgZmluZSBpZiB3ZSBkb24ndCBzcGVjaWZ5IGFsbCB0aGUgdmFsdWVzXG4gICAgICAgIHNldFZhbHVlcyh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3NldFZhbHVlcywgc2V0RXJyb3JzLCByZWZzXSxcbiAgKTtcblxuICByZXR1cm4geyBoYW5kbGVTdWJtaXQsIHNldFZhbGlkYXRpb25FcnJvciwgc2V0VmFsdWUsIHZhbHVlcywgaXRlbVByb3BzLCBmb2N1cywgcmVzZXQgfTtcbn1cbiIsICJpbXBvcnQgeyB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBSSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IFByb21pc2VPcHRpb25zLCB1c2VQcm9taXNlIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuaW1wb3J0IHsgRnVuY3Rpb25SZXR1cm5pbmdQcm9taXNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBTdHJlYW0gYSBwcm9tcHQgY29tcGxldGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgRGV0YWlsLCBMYXVuY2hQcm9wcyB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZSBBSSB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbW1hbmQocHJvcHM6IExhdW5jaFByb3BzPHsgYXJndW1lbnRzOiB7IHByb21wdDogc3RyaW5nIH0gfT4pIHtcbiAqICAgY29uc3QgeyBpc0xvYWRpbmcsIGRhdGEgfSA9IHVzZUFJKHByb3BzLmFyZ3VtZW50cy5wcm9tcHQpO1xuICpcbiAqICAgcmV0dXJuIDxEZXRhaWwgaXNMb2FkaW5nPXtpc0xvYWRpbmd9IG1hcmtkb3duPXtkYXRhfSAvPjtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlQUkoXG4gIHByb21wdDogc3RyaW5nLFxuICBvcHRpb25zOiB7XG4gICAgLyoqXG4gICAgICogQ29uY3JldGUgdGFza3MsIHN1Y2ggYXMgZml4aW5nIGdyYW1tYXIsIHJlcXVpcmUgbGVzcyBjcmVhdGl2aXR5IHdoaWxlIG9wZW4tZW5kZWQgcXVlc3Rpb25zLCBzdWNoIGFzIGdlbmVyYXRpbmcgaWRlYXMsIHJlcXVpcmUgbW9yZS5cbiAgICAgKiBJZiBhIG51bWJlciBpcyBwYXNzZWQsIGl0IG5lZWRzIHRvIGJlIGluIHRoZSByYW5nZSAwLTIuIEZvciBsYXJnZXIgdmFsdWVzLCAyIHdpbGwgYmUgdXNlZC4gRm9yIGxvd2VyIHZhbHVlcywgMCB3aWxsIGJlIHVzZWQuXG4gICAgICovXG4gICAgY3JlYXRpdml0eT86IEFJLkNyZWF0aXZpdHk7XG4gICAgLyoqXG4gICAgICogVGhlIEFJIG1vZGVsIHRvIHVzZSB0byBhbnN3ZXIgdG8gdGhlIHByb21wdC5cbiAgICAgKi9cbiAgICBtb2RlbD86IEFJLk1vZGVsO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc3RyZWFtIHRoZSBhbnN3ZXIgb3Igb25seSB1cGRhdGUgdGhlIGRhdGEgd2hlbiB0aGUgZW50aXJlIGFuc3dlciBoYXMgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICBzdHJlYW0/OiBib29sZWFuO1xuICB9ICYgT21pdDxQcm9taXNlT3B0aW9uczxGdW5jdGlvblJldHVybmluZ1Byb21pc2U+LCBcImFib3J0YWJsZVwiPiA9IHt9LFxuKSB7XG4gIGNvbnN0IHsgY3JlYXRpdml0eSwgc3RyZWFtLCBtb2RlbCwgLi4udXNlUHJvbWlzZU9wdGlvbnMgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBhYm9ydGFibGUgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyPihudWxsKTtcbiAgY29uc3QgeyBpc0xvYWRpbmcsIGVycm9yLCByZXZhbGlkYXRlIH0gPSB1c2VQcm9taXNlKFxuICAgIGFzeW5jIChwcm9tcHQ6IHN0cmluZywgY3JlYXRpdml0eT86IEFJLkNyZWF0aXZpdHksIHNob3VsZFN0cmVhbT86IGJvb2xlYW4pID0+IHtcbiAgICAgIHNldERhdGEoXCJcIik7XG4gICAgICBjb25zdCBzdHJlYW0gPSBBSS5hc2socHJvbXB0LCB7IGNyZWF0aXZpdHksIG1vZGVsLCBzaWduYWw6IGFib3J0YWJsZS5jdXJyZW50Py5zaWduYWwgfSk7XG4gICAgICBpZiAoc2hvdWxkU3RyZWFtID09PSBmYWxzZSkge1xuICAgICAgICBzZXREYXRhKGF3YWl0IHN0cmVhbSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHJlYW0ub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XG4gICAgICAgICAgc2V0RGF0YSgoeCkgPT4geCArIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgc3RyZWFtO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3Byb21wdCwgY3JlYXRpdml0eSwgc3RyZWFtXSxcbiAgICB7IC4uLnVzZVByb21pc2VPcHRpb25zLCBhYm9ydGFibGUgfSxcbiAgKTtcblxuICByZXR1cm4geyBpc0xvYWRpbmcsIGRhdGEsIGVycm9yLCByZXZhbGlkYXRlIH07XG59XG4iLCAiaW1wb3J0IHsgdXNlTWVtbywgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUxhdGVzdCB9IGZyb20gXCIuL3VzZUxhdGVzdFwiO1xuaW1wb3J0IHsgdXNlQ2FjaGVkU3RhdGUgfSBmcm9tIFwiLi91c2VDYWNoZWRTdGF0ZVwiO1xuXG4vLyBUaGUgYWxnb3JpdGhtIGJlbG93IGlzIGluc3BpcmVkIGJ5IHRoZSBvbmUgdXNlZCBieSBGaXJlZm94OlxuLy8gaHR0cHM6Ly93aWtpLm1vemlsbGEub3JnL1VzZXI6SmVzc2UvTmV3RnJlY2VuY3lcblxudHlwZSBGcmVjZW5jeSA9IHtcbiAgbGFzdFZpc2l0ZWQ6IG51bWJlcjtcbiAgZnJlY2VuY3k6IG51bWJlcjtcbn07XG5cbmNvbnN0IEhBTEZfTElGRV9EQVlTID0gMTA7XG5cbmNvbnN0IE1TX1BFUl9EQVkgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBWSVNJVF9UWVBFX1BPSU5UUyA9IHtcbiAgRGVmYXVsdDogMTAwLFxuICBFbWJlZDogMCxcbiAgQm9va21hcms6IDE0MCxcbn07XG5cbmZ1bmN0aW9uIGdldE5ld0ZyZWNlbmN5KGl0ZW0/OiBGcmVjZW5jeSk6IEZyZWNlbmN5IHtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgbGFzdFZpc2l0ZWQgPSBpdGVtID8gaXRlbS5sYXN0VmlzaXRlZCA6IDA7XG4gIGNvbnN0IGZyZWNlbmN5ID0gaXRlbSA/IGl0ZW0uZnJlY2VuY3kgOiAwO1xuXG4gIGNvbnN0IHZpc2l0QWdlSW5EYXlzID0gKG5vdyAtIGxhc3RWaXNpdGVkKSAvIE1TX1BFUl9EQVk7XG4gIGNvbnN0IERFQ0FZX1JBVEVfQ09OU1RBTlQgPSBNYXRoLmxvZygyKSAvIChIQUxGX0xJRkVfREFZUyAqIE1TX1BFUl9EQVkpO1xuICBjb25zdCBjdXJyZW50VmlzaXRWYWx1ZSA9IFZJU0lUX1RZUEVfUE9JTlRTLkRlZmF1bHQgKiBNYXRoLmV4cCgtREVDQVlfUkFURV9DT05TVEFOVCAqIHZpc2l0QWdlSW5EYXlzKTtcbiAgY29uc3QgdG90YWxWaXNpdFZhbHVlID0gZnJlY2VuY3kgKyBjdXJyZW50VmlzaXRWYWx1ZTtcblxuICByZXR1cm4ge1xuICAgIGxhc3RWaXNpdGVkOiBub3csXG4gICAgZnJlY2VuY3k6IHRvdGFsVmlzaXRWYWx1ZSxcbiAgfTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGRlZmF1bHRLZXkgPSAoaXRlbTogYW55KTogc3RyaW5nID0+IHtcbiAgaWYgKFxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICh0eXBlb2YgaXRlbSAhPT0gXCJvYmplY3RcIiB8fCAhaXRlbSB8fCAhKFwiaWRcIiBpbiBpdGVtKSB8fCB0eXBlb2YgaXRlbS5pZCAhPSBcInN0cmluZ1wiKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTcGVjaWZ5IGEga2V5IGZ1bmN0aW9uIG9yIG1ha2Ugc3VyZSB5b3VyIGl0ZW1zIGhhdmUgYW4gJ2lkJyBwcm9wZXJ0eVwiKTtcbiAgfVxuICByZXR1cm4gaXRlbS5pZDtcbn07XG5cbi8qKlxuICogU29ydCBhbiBhcnJheSBieSBpdHMgZnJlY2VuY3kgYW5kIHByb3ZpZGUgbWV0aG9kcyB0byB1cGRhdGUgdGhlIGZyZWNlbmN5IG9mIGl0cyBpdGVtcy5cbiAqIEZyZWNlbmN5IGlzIGEgbWVhc3VyZSB0aGF0IGNvbWJpbmVzIGZyZXF1ZW5jeSBhbmQgcmVjZW5jeS4gVGhlIG1vcmUgb2Z0ZW4gYW4gaXRlbSBpcyB2aXNpdGVkL3VzZWQsIGFuZCB0aGUgbW9yZSByZWNlbnRseSBhbiBpdGVtIGlzIHZpc2l0ZWQvdXNlZCwgdGhlIGhpZ2hlciBpdCB3aWxsIHJhbmsuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogaW1wb3J0IHsgTGlzdCwgQWN0aW9uUGFuZWwsIEFjdGlvbiwgSWNvbiB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHVzZUZldGNoLCB1c2VGcmVjZW5jeVNvcnRpbmcgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDb21tYW5kKCkge1xuICogICBjb25zdCB7IGlzTG9hZGluZywgZGF0YSB9ID0gdXNlRmV0Y2goXCJodHRwczovL2FwaS5leGFtcGxlXCIpO1xuICogICBjb25zdCB7IGRhdGE6IHNvcnRlZERhdGEsIHZpc2l0SXRlbSwgcmVzZXRSYW5raW5nIH0gPSB1c2VGcmVjZW5jeVNvcnRpbmcoZGF0YSk7XG4gKlxuICogICByZXR1cm4gKFxuICogICAgIDxMaXN0IGlzTG9hZGluZz17aXNMb2FkaW5nfT5cbiAqICAgICAgIHtzb3J0ZWREYXRhLm1hcCgoaXRlbSkgPT4gKFxuICogICAgICAgICA8TGlzdC5JdGVtXG4gKiAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICogICAgICAgICAgIHRpdGxlPXtpdGVtLnRpdGxlfVxuICogICAgICAgICAgIGFjdGlvbnM9e1xuICogICAgICAgICAgICAgPEFjdGlvblBhbmVsPlxuICogICAgICAgICAgICAgICA8QWN0aW9uLk9wZW5JbkJyb3dzZXIgdXJsPXtpdGVtLnVybH0gb25PcGVuPXsoKSA9PiB2aXNpdEl0ZW0oaXRlbSl9IC8+XG4gKiAgICAgICAgICAgICAgIDxBY3Rpb24uQ29weVRvQ2xpcGJvYXJkIHRpdGxlPVwiQ29weSBMaW5rXCIgY29udGVudD17aXRlbS51cmx9IG9uQ29weT17KCkgPT4gdmlzaXRJdGVtKGl0ZW0pfSAvPlxuICogICAgICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiUmVzZXQgUmFua2luZ1wiIGljb249e0ljb24uQXJyb3dDb3VudGVyQ2xvY2t3aXNlfSBvbkFjdGlvbj17KCkgPT4gcmVzZXRSYW5raW5nKGl0ZW0pfSAvPlxuICogICAgICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAqICAgICAgICAgICB9XG4gKiAgICAgICAgIC8+XG4gKiAgICAgICApKX1cbiAqICAgICA8L0xpc3Q+XG4gKiAgICk7XG4gKiB9O1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VGcmVjZW5jeVNvcnRpbmc8VCBleHRlbmRzIHsgaWQ6IHN0cmluZyB9PihcbiAgZGF0YT86IFRbXSxcbiAgb3B0aW9ucz86IHsgbmFtZXNwYWNlPzogc3RyaW5nOyBrZXk/OiAoaXRlbTogVCkgPT4gc3RyaW5nOyBzb3J0VW52aXNpdGVkPzogKGE6IFQsIGI6IFQpID0+IG51bWJlciB9LFxuKToge1xuICBkYXRhOiBUW107XG4gIHZpc2l0SXRlbTogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG4gIHJlc2V0UmFua2luZzogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZyZWNlbmN5U29ydGluZzxUPihcbiAgZGF0YTogVFtdIHwgdW5kZWZpbmVkLFxuICBvcHRpb25zOiB7IG5hbWVzcGFjZT86IHN0cmluZzsga2V5OiAoaXRlbTogVCkgPT4gc3RyaW5nOyBzb3J0VW52aXNpdGVkPzogKGE6IFQsIGI6IFQpID0+IG51bWJlciB9LFxuKToge1xuICBkYXRhOiBUW107XG4gIHZpc2l0SXRlbTogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG4gIHJlc2V0UmFua2luZzogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUZyZWNlbmN5U29ydGluZzxUPihcbiAgZGF0YT86IFRbXSxcbiAgb3B0aW9ucz86IHsgbmFtZXNwYWNlPzogc3RyaW5nOyBrZXk/OiAoaXRlbTogVCkgPT4gc3RyaW5nOyBzb3J0VW52aXNpdGVkPzogKGE6IFQsIGI6IFQpID0+IG51bWJlciB9LFxuKToge1xuICBkYXRhOiBUW107XG4gIHZpc2l0SXRlbTogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG4gIHJlc2V0UmFua2luZzogKGl0ZW06IFQpID0+IFByb21pc2U8dm9pZD47XG59IHtcbiAgY29uc3Qga2V5UmVmID0gdXNlTGF0ZXN0KG9wdGlvbnM/LmtleSB8fCBkZWZhdWx0S2V5KTtcbiAgY29uc3Qgc29ydFVudmlzaXRlZFJlZiA9IHVzZUxhdGVzdChvcHRpb25zPy5zb3J0VW52aXNpdGVkKTtcblxuICBjb25zdCBbc3RvcmVkRnJlY2VuY2llcywgc2V0U3RvcmVkRnJlY2VuY2llc10gPSB1c2VDYWNoZWRTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBGcmVjZW5jeSB8IHVuZGVmaW5lZD4+KFxuICAgIGByYXljYXN0X2ZyZWNlbmN5XyR7b3B0aW9ucz8ubmFtZXNwYWNlfWAsXG4gICAge30sXG4gICk7XG5cbiAgY29uc3QgdmlzaXRJdGVtID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgZnVuY3Rpb24gdXBkYXRlRnJlY2VuY3koaXRlbTogVCkge1xuICAgICAgY29uc3QgaXRlbUtleSA9IGtleVJlZi5jdXJyZW50KGl0ZW0pO1xuXG4gICAgICBzZXRTdG9yZWRGcmVjZW5jaWVzKChzdG9yZWRGcmVjZW5jaWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGZyZWNlbmN5ID0gc3RvcmVkRnJlY2VuY2llc1tpdGVtS2V5XTtcbiAgICAgICAgY29uc3QgbmV3RnJlY2VuY3kgPSBnZXROZXdGcmVjZW5jeShmcmVjZW5jeSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdG9yZWRGcmVjZW5jaWVzLFxuICAgICAgICAgIFtpdGVtS2V5XTogbmV3RnJlY2VuY3ksXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtrZXlSZWYsIHNldFN0b3JlZEZyZWNlbmNpZXNdLFxuICApO1xuXG4gIGNvbnN0IHJlc2V0UmFua2luZyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIGZ1bmN0aW9uIHJlbW92ZUZyZWNlbmN5KGl0ZW06IFQpIHtcbiAgICAgIGNvbnN0IGl0ZW1LZXkgPSBrZXlSZWYuY3VycmVudChpdGVtKTtcblxuICAgICAgc2V0U3RvcmVkRnJlY2VuY2llcygoc3RvcmVkRnJlY2VuY2llcykgPT4ge1xuICAgICAgICBjb25zdCBuZXdGcmVuY2VuY2llcyA9IHsgLi4uc3RvcmVkRnJlY2VuY2llcyB9O1xuICAgICAgICBkZWxldGUgbmV3RnJlbmNlbmNpZXNbaXRlbUtleV07XG5cbiAgICAgICAgcmV0dXJuIG5ld0ZyZW5jZW5jaWVzO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBba2V5UmVmLCBzZXRTdG9yZWRGcmVjZW5jaWVzXSxcbiAgKTtcblxuICBjb25zdCBzb3J0ZWREYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgZnJlY2VuY3lBID0gc3RvcmVkRnJlY2VuY2llc1trZXlSZWYuY3VycmVudChhKV07XG4gICAgICBjb25zdCBmcmVjZW5jeUIgPSBzdG9yZWRGcmVjZW5jaWVzW2tleVJlZi5jdXJyZW50KGIpXTtcblxuICAgICAgLy8gSWYgYSBoYXMgYSBmcmVjZW5jeSwgYnV0IGIgZG9lc24ndCwgYSBzaG91bGQgY29tZSBmaXJzdFxuICAgICAgaWYgKGZyZWNlbmN5QSAmJiAhZnJlY2VuY3lCKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYiBoYXMgYSBmcmVjZW5jeSwgYnV0IGEgZG9lc24ndCwgYiBzaG91bGQgY29tZSBmaXJzdFxuICAgICAgaWYgKCFmcmVjZW5jeUEgJiYgZnJlY2VuY3lCKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBib3RoIGZyZWNlbmNpZXMgYXJlIGRlZmluZWQscHV0IHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVyIGZyZWNlbmN5IGZpcnN0XG4gICAgICBpZiAoZnJlY2VuY3lBICYmIGZyZWNlbmN5Qikge1xuICAgICAgICByZXR1cm4gZnJlY2VuY3lCLmZyZWNlbmN5IC0gZnJlY2VuY3lBLmZyZWNlbmN5O1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBib3RoIGZyZWNlbmNpZXMgYXJlIHVuZGVmaW5lZCwga2VlcCB0aGUgb3JpZ2luYWwgb3JkZXJcbiAgICAgIHJldHVybiBzb3J0VW52aXNpdGVkUmVmLmN1cnJlbnQgPyBzb3J0VW52aXNpdGVkUmVmLmN1cnJlbnQoYSwgYikgOiAwO1xuICAgIH0pO1xuICB9LCBbc3RvcmVkRnJlY2VuY2llcywgZGF0YSwga2V5UmVmLCBzb3J0VW52aXNpdGVkUmVmXSk7XG5cbiAgcmV0dXJuIHsgZGF0YTogc29ydGVkRGF0YSwgdmlzaXRJdGVtLCByZXNldFJhbmtpbmcgfTtcbn1cbiIsICJpbXBvcnQgeyBMb2NhbFN0b3JhZ2UgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyBzaG93RmFpbHVyZVRvYXN0IH0gZnJvbSBcIi4vc2hvd0ZhaWx1cmVUb2FzdFwiO1xuaW1wb3J0IHsgcmVwbGFjZXIsIHJldml2ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgeyB1c2VQcm9taXNlIH0gZnJvbSBcIi4vdXNlUHJvbWlzZVwiO1xuXG4vKipcbiAqIEEgaG9vayB0byBtYW5hZ2UgYSB2YWx1ZSBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqXG4gKiBAcmVtYXJrIFRoZSB2YWx1ZSBpcyBzdG9yZWQgYXMgYSBKU09OIHN0cmluZyBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqXG4gKiBAcGFyYW0ga2V5IC0gVGhlIGtleSB0byB1c2UgZm9yIHRoZSB2YWx1ZSBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqIEBwYXJhbSBpbml0aWFsVmFsdWUgLSBUaGUgaW5pdGlhbCB2YWx1ZSB0byB1c2UgaWYgdGhlIGtleSBkb2Vzbid0IGV4aXN0IGluIHRoZSBsb2NhbCBzdG9yYWdlLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICogLSBgdmFsdWVgOiBUaGUgdmFsdWUgZnJvbSB0aGUgbG9jYWwgc3RvcmFnZSBvciB0aGUgaW5pdGlhbCB2YWx1ZSBpZiB0aGUga2V5IGRvZXNuJ3QgZXhpc3QuXG4gKiAtIGBzZXRWYWx1ZWA6IEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqIC0gYHJlbW92ZVZhbHVlYDogQSBmdW5jdGlvbiB0byByZW1vdmUgdGhlIHZhbHVlIGZyb20gdGhlIGxvY2FsIHN0b3JhZ2UuXG4gKiAtIGBpc0xvYWRpbmdgOiBBIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdmFsdWUgaXMgbG9hZGluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb25zdCB7IHZhbHVlLCBzZXRWYWx1ZSB9ID0gdXNlTG9jYWxTdG9yYWdlPHN0cmluZz4oXCJteS1rZXlcIik7XG4gKiBjb25zdCB7IHZhbHVlLCBzZXRWYWx1ZSB9ID0gdXNlTG9jYWxTdG9yYWdlPHN0cmluZz4oXCJteS1rZXlcIiwgXCJkZWZhdWx0IHZhbHVlXCIpO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VMb2NhbFN0b3JhZ2U8VD4oa2V5OiBzdHJpbmcsIGluaXRpYWxWYWx1ZT86IFQpIHtcbiAgY29uc3Qge1xuICAgIGRhdGE6IHZhbHVlLFxuICAgIGlzTG9hZGluZyxcbiAgICBtdXRhdGUsXG4gIH0gPSB1c2VQcm9taXNlKFxuICAgIGFzeW5jIChzdG9yYWdlS2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCBMb2NhbFN0b3JhZ2UuZ2V0SXRlbTxzdHJpbmc+KHN0b3JhZ2VLZXkpO1xuXG4gICAgICByZXR1cm4gdHlwZW9mIGl0ZW0gIT09IFwidW5kZWZpbmVkXCIgPyAoSlNPTi5wYXJzZShpdGVtLCByZXZpdmVyKSBhcyBUKSA6IGluaXRpYWxWYWx1ZTtcbiAgICB9LFxuICAgIFtrZXldLFxuICApO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHNldFZhbHVlKHZhbHVlOiBUKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IG11dGF0ZShMb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlLCByZXBsYWNlcikpLCB7XG4gICAgICAgIG9wdGltaXN0aWNVcGRhdGUodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYXdhaXQgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwgeyB0aXRsZTogXCJGYWlsZWQgdG8gc2V0IHZhbHVlIGluIGxvY2FsIHN0b3JhZ2VcIiB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiByZW1vdmVWYWx1ZSgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbXV0YXRlKExvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSksIHtcbiAgICAgICAgb3B0aW1pc3RpY1VwZGF0ZSgpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGF3YWl0IHNob3dGYWlsdXJlVG9hc3QoZXJyb3IsIHsgdGl0bGU6IFwiRmFpbGVkIHRvIHJlbW92ZSB2YWx1ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcIiB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyB2YWx1ZSwgc2V0VmFsdWUsIHJlbW92ZVZhbHVlLCBpc0xvYWRpbmcgfTtcbn1cbiIsICJleHBvcnQgeyBnZXRBdmF0YXJJY29uIH0gZnJvbSBcIi4vYXZhdGFyXCI7XG5leHBvcnQgeyBnZXRGYXZpY29uIH0gZnJvbSBcIi4vZmF2aWNvblwiO1xuZXhwb3J0IHsgZ2V0UHJvZ3Jlc3NJY29uIH0gZnJvbSBcIi4vcHJvZ3Jlc3NcIjtcbiIsICJpbXBvcnQgdHlwZSB7IEltYWdlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgc2xpZ2h0bHlMaWdodGVyQ29sb3IsIHNsaWdodGx5RGFya2VyQ29sb3IgfSBmcm9tIFwiLi9jb2xvclwiO1xuXG5mdW5jdGlvbiBnZXRXaG9sZUNoYXJBbmRJKHN0cjogc3RyaW5nLCBpOiBudW1iZXIpOiBbc3RyaW5nLCBudW1iZXJdIHtcbiAgY29uc3QgY29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuXG4gIGlmIChOdW1iZXIuaXNOYU4oY29kZSkpIHtcbiAgICByZXR1cm4gW1wiXCIsIGldO1xuICB9XG4gIGlmIChjb2RlIDwgMHhkODAwIHx8IGNvZGUgPiAweGRmZmYpIHtcbiAgICByZXR1cm4gW3N0ci5jaGFyQXQoaSksIGldOyAvLyBOb3JtYWwgY2hhcmFjdGVyLCBrZWVwaW5nICdpJyB0aGUgc2FtZVxuICB9XG5cbiAgLy8gSGlnaCBzdXJyb2dhdGUgKGNvdWxkIGNoYW5nZSBsYXN0IGhleCB0byAweERCN0YgdG8gdHJlYXQgaGlnaCBwcml2YXRlXG4gIC8vIHN1cnJvZ2F0ZXMgYXMgc2luZ2xlIGNoYXJhY3RlcnMpXG4gIGlmICgweGQ4MDAgPD0gY29kZSAmJiBjb2RlIDw9IDB4ZGJmZikge1xuICAgIGlmIChzdHIubGVuZ3RoIDw9IGkgKyAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIaWdoIHN1cnJvZ2F0ZSB3aXRob3V0IGZvbGxvd2luZyBsb3cgc3Vycm9nYXRlXCIpO1xuICAgIH1cbiAgICBjb25zdCBuZXh0ID0gc3RyLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgIGlmICgweGRjMDAgPiBuZXh0IHx8IG5leHQgPiAweGRmZmYpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhpZ2ggc3Vycm9nYXRlIHdpdGhvdXQgZm9sbG93aW5nIGxvdyBzdXJyb2dhdGVcIik7XG4gICAgfVxuICAgIHJldHVybiBbc3RyLmNoYXJBdChpKSArIHN0ci5jaGFyQXQoaSArIDEpLCBpICsgMV07XG4gIH1cblxuICAvLyBMb3cgc3Vycm9nYXRlICgweERDMDAgPD0gY29kZSAmJiBjb2RlIDw9IDB4REZGRilcbiAgaWYgKGkgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJMb3cgc3Vycm9nYXRlIHdpdGhvdXQgcHJlY2VkaW5nIGhpZ2ggc3Vycm9nYXRlXCIpO1xuICB9XG5cbiAgY29uc3QgcHJldiA9IHN0ci5jaGFyQ29kZUF0KGkgLSAxKTtcblxuICAvLyAoY291bGQgY2hhbmdlIGxhc3QgaGV4IHRvIDB4REI3RiB0byB0cmVhdCBoaWdoIHByaXZhdGUgc3Vycm9nYXRlc1xuICAvLyBhcyBzaW5nbGUgY2hhcmFjdGVycylcbiAgaWYgKDB4ZDgwMCA+IHByZXYgfHwgcHJldiA+IDB4ZGJmZikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkxvdyBzdXJyb2dhdGUgd2l0aG91dCBwcmVjZWRpbmcgaGlnaCBzdXJyb2dhdGVcIik7XG4gIH1cblxuICAvLyBSZXR1cm4gdGhlIG5leHQgY2hhcmFjdGVyIGluc3RlYWQgKGFuZCBpbmNyZW1lbnQpXG4gIHJldHVybiBbc3RyLmNoYXJBdChpICsgMSksIGkgKyAxXTtcbn1cblxuY29uc3QgYXZhdGFyQ29sb3JTZXQgPSBbXG4gIFwiI0RDODI5QVwiLCAvLyBQaW5rXG4gIFwiI0Q2NDg1NFwiLCAvLyBSZWRcbiAgXCIjRDQ3NjAwXCIsIC8vIFllbGxvd09yYW5nZVxuICBcIiNEMzZDRERcIiwgLy8gTWFnZW50YVxuICBcIiM1MkE5RTRcIiwgLy8gQXF1YVxuICBcIiM3ODcxRThcIiwgLy8gSW5kaWdvXG4gIFwiIzcwOTIwRlwiLCAvLyBZZWxsb3dHcmVlblxuICBcIiM0M0I5M0FcIiwgLy8gR3JlZW5cbiAgXCIjRUI2QjNFXCIsIC8vIE9yYW5nZVxuICBcIiMyNkI3OTVcIiwgLy8gQmx1ZUdyZWVuXG4gIFwiI0Q4NUE5QlwiLCAvLyBIb3RQaW5rXG4gIFwiI0EwNjdEQ1wiLCAvLyBQdXJwbGVcbiAgXCIjQkQ5NTAwXCIsIC8vIFllbGxvd1xuICBcIiM1Mzg1RDlcIiwgLy8gQmx1ZVxuXTtcblxuLyoqXG4gKiBJY29uIHRvIHJlcHJlc2VudCBhbiBhdmF0YXIgd2hlbiB5b3UgZG9uJ3QgaGF2ZSBvbmUuIFRoZSBnZW5lcmF0ZWQgYXZhdGFyXG4gKiB3aWxsIGJlIGdlbmVyYXRlZCBmcm9tIHRoZSBpbml0aWFscyBvZiB0aGUgbmFtZSBhbmQgaGF2ZSBhIGNvbG9yZnVsIGJ1dCBjb25zaXN0ZW50IGJhY2tncm91bmQuXG4gKlxuICogQHJldHVybnMgYW4gSW1hZ2UgdGhhdCBjYW4gYmUgdXNlZCB3aGVyZSBSYXljYXN0IGV4cGVjdHMgdGhlbS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiA8TGlzdC5JdGVtIGljb249e2dldEF2YXRhckljb24oJ01hdGhpZXUgRHV0b3VyJyl9IHRpdGxlPVwiUHJvamVjdFwiIC8+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEF2YXRhckljb24oXG4gIG5hbWU6IHN0cmluZyxcbiAgb3B0aW9ucz86IHtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gYmFja2dyb3VuZCBjb2xvclxuICAgICAqL1xuICAgIGJhY2tncm91bmQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgYSBncmFkaWVudCBmb3IgdGhlIGJhY2tncm91bmQgb3Igbm90LlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBncmFkaWVudD86IGJvb2xlYW47XG4gIH0sXG4pOiBJbWFnZS5Bc3NldCB7XG4gIGNvbnN0IHdvcmRzID0gbmFtZS50cmltKCkuc3BsaXQoXCIgXCIpO1xuICBsZXQgaW5pdGlhbHM6IHN0cmluZztcbiAgaWYgKHdvcmRzLmxlbmd0aCA9PSAxICYmIGdldFdob2xlQ2hhckFuZEkod29yZHNbMF0sIDApWzBdKSB7XG4gICAgaW5pdGlhbHMgPSBnZXRXaG9sZUNoYXJBbmRJKHdvcmRzWzBdLCAwKVswXTtcbiAgfSBlbHNlIGlmICh3b3Jkcy5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgZmlyc3RXb3JkRmlyc3RMZXR0ZXIgPSBnZXRXaG9sZUNoYXJBbmRJKHdvcmRzWzBdLCAwKVswXSB8fCBcIlwiO1xuICAgIGNvbnN0IGxhc3RXb3JkRmlyc3RMZXR0ZXIgPSBnZXRXaG9sZUNoYXJBbmRJKHdvcmRzW3dvcmRzLmxlbmd0aCAtIDFdLCAwKVswXSA/PyBcIlwiO1xuICAgIGluaXRpYWxzID0gZmlyc3RXb3JkRmlyc3RMZXR0ZXIgKyBsYXN0V29yZEZpcnN0TGV0dGVyO1xuICB9IGVsc2Uge1xuICAgIGluaXRpYWxzID0gXCJcIjtcbiAgfVxuXG4gIGxldCBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcblxuICBpZiAob3B0aW9ucz8uYmFja2dyb3VuZCkge1xuICAgIGJhY2tncm91bmRDb2xvciA9IG9wdGlvbnM/LmJhY2tncm91bmQ7XG4gIH0gZWxzZSB7XG4gICAgbGV0IGluaXRpYWxzQ2hhckluZGV4ID0gMDtcbiAgICBsZXQgW2NoYXIsIGldID0gZ2V0V2hvbGVDaGFyQW5kSShpbml0aWFscywgMCk7XG4gICAgd2hpbGUgKGNoYXIpIHtcbiAgICAgIGluaXRpYWxzQ2hhckluZGV4ICs9IGNoYXIuY2hhckNvZGVBdCgwKTtcbiAgICAgIFtjaGFyLCBpXSA9IGdldFdob2xlQ2hhckFuZEkoaW5pdGlhbHMsIGkgKyAxKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2xvckluZGV4ID0gaW5pdGlhbHNDaGFySW5kZXggJSBhdmF0YXJDb2xvclNldC5sZW5ndGg7XG4gICAgYmFja2dyb3VuZENvbG9yID0gYXZhdGFyQ29sb3JTZXRbY29sb3JJbmRleF07XG4gIH1cblxuICBjb25zdCBwYWRkaW5nID0gMDtcbiAgY29uc3QgcmFkaXVzID0gNTAgLSBwYWRkaW5nO1xuXG4gIGNvbnN0IHN2ZyA9IGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjEwMHB4XCIgaGVpZ2h0PVwiMTAwcHhcIj5cbiAgJHtcbiAgICBvcHRpb25zPy5ncmFkaWVudCAhPT0gZmFsc2VcbiAgICAgID8gYDxkZWZzPlxuICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiR3JhZGllbnRcIiB4MT1cIjAuMjVcIiB4Mj1cIjAuNzVcIiB5MT1cIjBcIiB5Mj1cIjFcIj5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wLWNvbG9yPVwiJHtzbGlnaHRseUxpZ2h0ZXJDb2xvcihiYWNrZ3JvdW5kQ29sb3IpfVwiLz5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNTAlXCIgc3RvcC1jb2xvcj1cIiR7YmFja2dyb3VuZENvbG9yfVwiLz5cbiAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3AtY29sb3I9XCIke3NsaWdodGx5RGFya2VyQ29sb3IoYmFja2dyb3VuZENvbG9yKX1cIi8+XG4gICAgICA8L2xpbmVhckdyYWRpZW50PlxuICA8L2RlZnM+YFxuICAgICAgOiBcIlwiXG4gIH1cbiAgICAgIDxjaXJjbGUgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiJHtyYWRpdXN9XCIgZmlsbD1cIiR7XG4gICAgICAgIG9wdGlvbnM/LmdyYWRpZW50ICE9PSBmYWxzZSA/IFwidXJsKCNHcmFkaWVudClcIiA6IGJhY2tncm91bmRDb2xvclxuICAgICAgfVwiIC8+XG4gICAgICAke1xuICAgICAgICBpbml0aWFsc1xuICAgICAgICAgID8gYDx0ZXh0IHg9XCI1MFwiIHk9XCI4MFwiIGZvbnQtc2l6ZT1cIiR7XG4gICAgICAgICAgICAgIHJhZGl1cyAtIDFcbiAgICAgICAgICAgIH1cIiBmb250LWZhbWlseT1cIkludGVyLCBzYW5zLXNlcmlmXCIgdGV4dC1hbmNob3I9XCJtaWRkbGVcIiBmaWxsPVwid2hpdGVcIj4ke2luaXRpYWxzLnRvVXBwZXJDYXNlKCl9PC90ZXh0PmBcbiAgICAgICAgICA6IFwiXCJcbiAgICAgIH1cbiAgICA8L3N2Zz5cbiAgYC5yZXBsYWNlQWxsKFwiXFxuXCIsIFwiXCIpO1xuICByZXR1cm4gYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChzdmcpfWA7XG59XG4iLCAiZnVuY3Rpb24gaGV4VG9SR0IoaGV4OiBzdHJpbmcpIHtcbiAgbGV0IHIgPSAwO1xuICBsZXQgZyA9IDA7XG4gIGxldCBiID0gMDtcblxuICAvLyAzIGRpZ2l0c1xuICBpZiAoaGV4Lmxlbmd0aCA9PT0gNCkge1xuICAgIHIgPSBwYXJzZUludChgJHtoZXhbMV19JHtoZXhbMV19YCwgMTYpO1xuICAgIGcgPSBwYXJzZUludChgJHtoZXhbMl19JHtoZXhbMl19YCwgMTYpO1xuICAgIGIgPSBwYXJzZUludChgJHtoZXhbM119JHtoZXhbM119YCwgMTYpO1xuXG4gICAgLy8gNiBkaWdpdHNcbiAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09PSA3KSB7XG4gICAgciA9IHBhcnNlSW50KGAke2hleFsxXX0ke2hleFsyXX1gLCAxNik7XG4gICAgZyA9IHBhcnNlSW50KGAke2hleFszXX0ke2hleFs0XX1gLCAxNik7XG4gICAgYiA9IHBhcnNlSW50KGAke2hleFs1XX0ke2hleFs2XX1gLCAxNik7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBNYWxmb3JtZWQgaGV4IGNvbG9yOiAke2hleH1gKTtcbiAgfVxuXG4gIHJldHVybiB7IHIsIGcsIGIgfTtcbn1cblxuZnVuY3Rpb24gcmdiVG9IZXgoeyByLCBnLCBiIH06IHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9KSB7XG4gIGxldCByU3RyaW5nID0gci50b1N0cmluZygxNik7XG4gIGxldCBnU3RyaW5nID0gZy50b1N0cmluZygxNik7XG4gIGxldCBiU3RyaW5nID0gYi50b1N0cmluZygxNik7XG5cbiAgaWYgKHJTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgclN0cmluZyA9IGAwJHtyU3RyaW5nfWA7XG4gIH1cbiAgaWYgKGdTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgZ1N0cmluZyA9IGAwJHtnU3RyaW5nfWA7XG4gIH1cbiAgaWYgKGJTdHJpbmcubGVuZ3RoID09PSAxKSB7XG4gICAgYlN0cmluZyA9IGAwJHtiU3RyaW5nfWA7XG4gIH1cblxuICByZXR1cm4gYCMke3JTdHJpbmd9JHtnU3RyaW5nfSR7YlN0cmluZ31gO1xufVxuXG5mdW5jdGlvbiByZ2JUb0hTTCh7IHIsIGcsIGIgfTogeyByOiBudW1iZXI7IGc6IG51bWJlcjsgYjogbnVtYmVyIH0pIHtcbiAgLy8gTWFrZSByLCBnLCBhbmQgYiBmcmFjdGlvbnMgb2YgMVxuICByIC89IDI1NTtcbiAgZyAvPSAyNTU7XG4gIGIgLz0gMjU1O1xuXG4gIC8vIEZpbmQgZ3JlYXRlc3QgYW5kIHNtYWxsZXN0IGNoYW5uZWwgdmFsdWVzXG4gIGNvbnN0IGNtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgY29uc3QgY21heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICBjb25zdCBkZWx0YSA9IGNtYXggLSBjbWluO1xuICBsZXQgaCA9IDA7XG4gIGxldCBzID0gMDtcbiAgbGV0IGwgPSAwO1xuXG4gIC8vIENhbGN1bGF0ZSBodWVcbiAgLy8gTm8gZGlmZmVyZW5jZVxuICBpZiAoZGVsdGEgPT09IDApIHtcbiAgICBoID0gMDtcbiAgfVxuICAvLyBSZWQgaXMgbWF4XG4gIGVsc2UgaWYgKGNtYXggPT09IHIpIHtcbiAgICBoID0gKChnIC0gYikgLyBkZWx0YSkgJSA2O1xuICB9XG4gIC8vIEdyZWVuIGlzIG1heFxuICBlbHNlIGlmIChjbWF4ID09PSBnKSB7XG4gICAgaCA9IChiIC0gcikgLyBkZWx0YSArIDI7XG4gIH1cbiAgLy8gQmx1ZSBpcyBtYXhcbiAgZWxzZSB7XG4gICAgaCA9IChyIC0gZykgLyBkZWx0YSArIDQ7XG4gIH1cblxuICBoID0gTWF0aC5yb3VuZChoICogNjApO1xuXG4gIC8vIE1ha2UgbmVnYXRpdmUgaHVlcyBwb3NpdGl2ZSBiZWhpbmQgMzYwwrBcbiAgaWYgKGggPCAwKSB7XG4gICAgaCArPSAzNjA7XG4gIH1cblxuICAvLyBDYWxjdWxhdGUgbGlnaHRuZXNzXG4gIGwgPSAoY21heCArIGNtaW4pIC8gMjtcblxuICAvLyBDYWxjdWxhdGUgc2F0dXJhdGlvblxuICBzID0gZGVsdGEgPT09IDAgPyAwIDogZGVsdGEgLyAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpO1xuXG4gIC8vIE11bHRpcGx5IGwgYW5kIHMgYnkgMTAwXG4gIHMgPSArKHMgKiAxMDApLnRvRml4ZWQoMSk7XG4gIGwgPSArKGwgKiAxMDApLnRvRml4ZWQoMSk7XG5cbiAgcmV0dXJuIHsgaCwgcywgbCB9O1xufVxuXG5mdW5jdGlvbiBoc2xUb1JHQih7IGgsIHMsIGwgfTogeyBoOiBudW1iZXI7IHM6IG51bWJlcjsgbDogbnVtYmVyIH0pIHtcbiAgLy8gTXVzdCBiZSBmcmFjdGlvbnMgb2YgMVxuICBzIC89IDEwMDtcbiAgbCAvPSAxMDA7XG5cbiAgY29uc3QgYyA9ICgxIC0gTWF0aC5hYnMoMiAqIGwgLSAxKSkgKiBzO1xuICBjb25zdCB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKChoIC8gNjApICUgMikgLSAxKSk7XG4gIGNvbnN0IG0gPSBsIC0gYyAvIDI7XG4gIGxldCByID0gMDtcbiAgbGV0IGcgPSAwO1xuICBsZXQgYiA9IDA7XG5cbiAgaWYgKGggPj0gMCAmJiBoIDwgNjApIHtcbiAgICByID0gYztcbiAgICBnID0geDtcbiAgICBiID0gMDtcbiAgfSBlbHNlIGlmIChoID49IDYwICYmIGggPCAxMjApIHtcbiAgICByID0geDtcbiAgICBnID0gYztcbiAgICBiID0gMDtcbiAgfSBlbHNlIGlmIChoID49IDEyMCAmJiBoIDwgMTgwKSB7XG4gICAgciA9IDA7XG4gICAgZyA9IGM7XG4gICAgYiA9IHg7XG4gIH0gZWxzZSBpZiAoaCA+PSAxODAgJiYgaCA8IDI0MCkge1xuICAgIHIgPSAwO1xuICAgIGcgPSB4O1xuICAgIGIgPSBjO1xuICB9IGVsc2UgaWYgKGggPj0gMjQwICYmIGggPCAzMDApIHtcbiAgICByID0geDtcbiAgICBnID0gMDtcbiAgICBiID0gYztcbiAgfSBlbHNlIGlmIChoID49IDMwMCAmJiBoIDwgMzYwKSB7XG4gICAgciA9IGM7XG4gICAgZyA9IDA7XG4gICAgYiA9IHg7XG4gIH1cbiAgciA9IE1hdGgucm91bmQoKHIgKyBtKSAqIDI1NSk7XG4gIGcgPSBNYXRoLnJvdW5kKChnICsgbSkgKiAyNTUpO1xuICBiID0gTWF0aC5yb3VuZCgoYiArIG0pICogMjU1KTtcblxuICByZXR1cm4geyByLCBnLCBiIH07XG59XG5cbmZ1bmN0aW9uIGhleFRvSFNMKGhleDogc3RyaW5nKSB7XG4gIHJldHVybiByZ2JUb0hTTChoZXhUb1JHQihoZXgpKTtcbn1cblxuZnVuY3Rpb24gaHNsVG9IZXgoaHNsOiB7IGg6IG51bWJlcjsgczogbnVtYmVyOyBsOiBudW1iZXIgfSkge1xuICByZXR1cm4gcmdiVG9IZXgoaHNsVG9SR0IoaHNsKSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICByZXR1cm4gbWluIDwgbWF4ID8gKHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZSkgOiB2YWx1ZSA8IG1heCA/IG1heCA6IHZhbHVlID4gbWluID8gbWluIDogdmFsdWU7XG59XG5cbmNvbnN0IG9mZnNldCA9IDEyO1xuXG5leHBvcnQgZnVuY3Rpb24gc2xpZ2h0bHlEYXJrZXJDb2xvcihoZXg6IHN0cmluZykge1xuICBjb25zdCBoc2wgPSBoZXhUb0hTTChoZXgpO1xuXG4gIHJldHVybiBoc2xUb0hleCh7XG4gICAgaDogaHNsLmgsXG4gICAgczogaHNsLnMsXG4gICAgbDogY2xhbXAoaHNsLmwgLSBvZmZzZXQsIDAsIDEwMCksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2xpZ2h0bHlMaWdodGVyQ29sb3IoaGV4OiBzdHJpbmcpIHtcbiAgY29uc3QgaHNsID0gaGV4VG9IU0woaGV4KTtcblxuICByZXR1cm4gaHNsVG9IZXgoe1xuICAgIGg6IGhzbC5oLFxuICAgIHM6IGhzbC5zLFxuICAgIGw6IGNsYW1wKGhzbC5sICsgb2Zmc2V0LCAwLCAxMDApLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgeyBJY29uLCBJbWFnZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG4vKipcbiAqIEljb24gc2hvd2luZyB0aGUgZmF2aWNvbiBvZiBhIHdlYnNpdGUuXG4gKlxuICogQSBmYXZpY29uIChmYXZvcml0ZSBpY29uKSBpcyBhIHRpbnkgaWNvbiBpbmNsdWRlZCBhbG9uZyB3aXRoIGEgd2Vic2l0ZSwgd2hpY2ggaXMgZGlzcGxheWVkIGluIHBsYWNlcyBsaWtlIHRoZSBicm93c2VyJ3MgYWRkcmVzcyBiYXIsIHBhZ2UgdGFicywgYW5kIGJvb2ttYXJrcyBtZW51LlxuICpcbiAqIEBwYXJhbSB1cmwgVGhlIFVSTCBvZiB0aGUgd2Vic2l0ZSB0byByZXByZXNlbnQuXG4gKlxuICogQHJldHVybnMgYW4gSW1hZ2UgdGhhdCBjYW4gYmUgdXNlZCB3aGVyZSBSYXljYXN0IGV4cGVjdHMgdGhlbS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiA8TGlzdC5JdGVtIGljb249e2dldEZhdmljb24oXCJodHRwczovL3JheWNhc3QuY29tXCIpfSB0aXRsZT1cIlJheWNhc3QgV2Vic2l0ZVwiIC8+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZhdmljb24oXG4gIHVybDogc3RyaW5nIHwgVVJMLFxuICBvcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIFNpemUgb2YgdGhlIEZhdmljb25cbiAgICAgKiBAZGVmYXVsdCA2NFxuICAgICAqL1xuICAgIHNpemU/OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogRmFsbGJhY2sgaWNvbiBpbiBjYXNlIHRoZSBGYXZpY29uIGlzIG5vdCBmb3VuZC5cbiAgICAgKiBAZGVmYXVsdCBJY29uLkxpbmtcbiAgICAgKi9cbiAgICBmYWxsYmFjaz86IEltYWdlLkZhbGxiYWNrO1xuICAgIC8qKlxuICAgICAqIEEge0BsaW5rIEltYWdlLk1hc2t9IHRvIGFwcGx5IHRvIHRoZSBGYXZpY29uLlxuICAgICAqL1xuICAgIG1hc2s/OiBJbWFnZS5NYXNrO1xuICB9LFxuKTogSW1hZ2UuSW1hZ2VMaWtlIHtcbiAgdHJ5IHtcbiAgICAvLyBhIGZ1bmMgYWRkaW5nIGh0dHBzOi8vIHRvIHRoZSBVUkxcbiAgICAvLyBmb3IgY2FzZXMgd2hlcmUgdGhlIFVSTCBpcyBub3QgYSBmdWxsIFVSTFxuICAgIC8vIGUuZy4gXCJyYXljYXN0LmNvbVwiXG4gICAgY29uc3Qgc2FuaXRpemUgPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XG4gICAgICAgIHJldHVybiBgaHR0cHM6Ly8ke3VybH1gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVybDtcbiAgICB9O1xuXG4gICAgY29uc3QgdXJsT2JqID0gdHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIiA/IG5ldyBVUkwoc2FuaXRpemUodXJsKSkgOiB1cmw7XG4gICAgY29uc3QgaG9zdG5hbWUgPSB1cmxPYmouaG9zdG5hbWU7XG5cbiAgICBjb25zdCBmYXZpY29uUHJvdmlkZXI6IFwibm9uZVwiIHwgXCJyYXljYXN0XCIgfCBcImFwcGxlXCIgfCBcImdvb2dsZVwiIHwgXCJkdWNrRHVja0dvXCIgfCBcImR1Y2tkdWNrZ29cIiB8IFwibGVnYWN5XCIgPVxuICAgICAgKHByb2Nlc3MuZW52LkZBVklDT05fUFJPVklERVIgYXMgYW55KSA/PyBcInJheWNhc3RcIjtcblxuICAgIHN3aXRjaCAoZmF2aWNvblByb3ZpZGVyKSB7XG4gICAgICBjYXNlIFwibm9uZVwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogb3B0aW9ucz8uZmFsbGJhY2sgPz8gSWNvbi5MaW5rLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnM/Lm1hc2ssXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwiYXBwbGVcIjpcbiAgICAgICAgLy8gd2UgY2FuJ3Qgc3VwcG9ydCBhcHBsZSBmYXZpY29ucyBhcyBpdCdzIGEgbmF0aXZlIEFQSVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNvdXJjZTogb3B0aW9ucz8uZmFsbGJhY2sgPz8gSWNvbi5MaW5rLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnM/Lm1hc2ssXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwiZHVja2R1Y2tnb1wiOlxuICAgICAgY2FzZSBcImR1Y2tEdWNrR29cIjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IGBodHRwczovL2ljb25zLmR1Y2tkdWNrZ28uY29tL2lwMy8ke2hvc3RuYW1lfS5pY29gLFxuICAgICAgICAgIGZhbGxiYWNrOiBvcHRpb25zPy5mYWxsYmFjayA/PyBJY29uLkxpbmssXG4gICAgICAgICAgbWFzazogb3B0aW9ucz8ubWFzayxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJnb29nbGVcIjpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IGBodHRwczovL3d3dy5nb29nbGUuY29tL3MyL2Zhdmljb25zP3N6PSR7b3B0aW9ucz8uc2l6ZSA/PyA2NH0mZG9tYWluPSR7aG9zdG5hbWV9YCxcbiAgICAgICAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gSWNvbi5MaW5rLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnM/Lm1hc2ssXG4gICAgICAgIH07XG4gICAgICBjYXNlIFwibGVnYWN5XCI6XG4gICAgICBjYXNlIFwicmF5Y2FzdFwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzb3VyY2U6IGBodHRwczovL2FwaS5yYXkuc28vZmF2aWNvbj91cmw9JHtob3N0bmFtZX0mc2l6ZT0ke29wdGlvbnM/LnNpemUgPz8gNjR9YCxcbiAgICAgICAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gSWNvbi5MaW5rLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnM/Lm1hc2ssXG4gICAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlKTtcbiAgICByZXR1cm4gSWNvbi5MaW5rO1xuICB9XG59XG4iLCAiaW1wb3J0IHsgZW52aXJvbm1lbnQsIENvbG9yIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHR5cGUgeyBJbWFnZSB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcblxuZnVuY3Rpb24gcG9sYXJUb0NhcnRlc2lhbihjZW50ZXJYOiBudW1iZXIsIGNlbnRlclk6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGFuZ2xlSW5EZWdyZWVzOiBudW1iZXIpIHtcbiAgY29uc3QgYW5nbGVJblJhZGlhbnMgPSAoKGFuZ2xlSW5EZWdyZWVzIC0gOTApICogTWF0aC5QSSkgLyAxODAuMDtcblxuICByZXR1cm4ge1xuICAgIHg6IGNlbnRlclggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZUluUmFkaWFucyksXG4gICAgeTogY2VudGVyWSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlSW5SYWRpYW5zKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVBcmMoeDogbnVtYmVyLCB5OiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBzdGFydEFuZ2xlOiBudW1iZXIsIGVuZEFuZ2xlOiBudW1iZXIpIHtcbiAgY29uc3Qgc3RhcnQgPSBwb2xhclRvQ2FydGVzaWFuKHgsIHksIHJhZGl1cywgZW5kQW5nbGUpO1xuICBjb25zdCBlbmQgPSBwb2xhclRvQ2FydGVzaWFuKHgsIHksIHJhZGl1cywgc3RhcnRBbmdsZSk7XG5cbiAgY29uc3QgbGFyZ2VBcmNGbGFnID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlIDw9IDE4MCA/IFwiMFwiIDogXCIxXCI7XG5cbiAgY29uc3QgZCA9IFtcIk1cIiwgc3RhcnQueCwgc3RhcnQueSwgXCJBXCIsIHJhZGl1cywgcmFkaXVzLCAwLCBsYXJnZUFyY0ZsYWcsIDAsIGVuZC54LCBlbmQueV0uam9pbihcIiBcIik7XG5cbiAgcmV0dXJuIGQ7XG59XG5cbi8qKlxuICogSWNvbiB0byByZXByZXNlbnQgdGhlIHByb2dyZXNzIG9mIF9zb21ldGhpbmdfLlxuICpcbiAqIEBwYXJhbSBwcm9ncmVzcyBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxLlxuICogQHBhcmFtIGNvbG9yIEhleCBjb2xvciAoZGVmYXVsdCBgXCIjRkY2MzYzXCJgKSBvciBDb2xvci5cbiAqXG4gKiBAcmV0dXJucyBhbiBJbWFnZSB0aGF0IGNhbiBiZSB1c2VkIHdoZXJlIFJheWNhc3QgZXhwZWN0cyB0aGVtLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIDxMaXN0Lkl0ZW0gaWNvbj17Z2V0UHJvZ3Jlc3NJY29uKDAuMSl9IHRpdGxlPVwiUHJvamVjdFwiIC8+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyZXNzSWNvbihcbiAgcHJvZ3Jlc3M6IG51bWJlcixcbiAgY29sb3I6IENvbG9yIHwgc3RyaW5nID0gQ29sb3IuUmVkLFxuICBvcHRpb25zPzogeyBiYWNrZ3JvdW5kPzogQ29sb3IgfCBzdHJpbmc7IGJhY2tncm91bmRPcGFjaXR5PzogbnVtYmVyIH0sXG4pOiBJbWFnZS5Bc3NldCB7XG4gIGNvbnN0IGJhY2tncm91bmQgPSBvcHRpb25zPy5iYWNrZ3JvdW5kIHx8IChlbnZpcm9ubWVudC5hcHBlYXJhbmNlID09PSBcImxpZ2h0XCIgPyBcImJsYWNrXCIgOiBcIndoaXRlXCIpO1xuICBjb25zdCBiYWNrZ3JvdW5kT3BhY2l0eSA9IG9wdGlvbnM/LmJhY2tncm91bmRPcGFjaXR5IHx8IDAuMTtcblxuICBjb25zdCBzdHJva2UgPSAxMDtcbiAgY29uc3QgcGFkZGluZyA9IDU7XG4gIGNvbnN0IHJhZGl1cyA9IDUwIC0gcGFkZGluZyAtIHN0cm9rZSAvIDI7XG5cbiAgY29uc3Qgc3ZnID0gYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMTAwcHhcIiBoZWlnaHQ9XCIxMDBweFwiPlxuICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIke3JhZGl1c31cIiBzdHJva2Utd2lkdGg9XCIke3N0cm9rZX1cIiBzdHJva2U9XCIke1xuICAgICAgICBwcm9ncmVzcyA8IDEgPyBiYWNrZ3JvdW5kIDogY29sb3JcbiAgICAgIH1cIiBvcGFjaXR5PVwiJHtwcm9ncmVzcyA8IDEgPyBiYWNrZ3JvdW5kT3BhY2l0eSA6IFwiMVwifVwiIGZpbGw9XCJub25lXCIgLz5cbiAgICAgICR7XG4gICAgICAgIHByb2dyZXNzID4gMCAmJiBwcm9ncmVzcyA8IDFcbiAgICAgICAgICA/IGA8cGF0aCBkPVwiJHtkZXNjcmliZUFyYyhcbiAgICAgICAgICAgICAgNTAsXG4gICAgICAgICAgICAgIDUwLFxuICAgICAgICAgICAgICByYWRpdXMsXG4gICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgIHByb2dyZXNzICogMzYwLFxuICAgICAgICAgICAgKX1cIiBzdHJva2U9XCIke2NvbG9yfVwiIHN0cm9rZS13aWR0aD1cIiR7c3Ryb2tlfVwiIGZpbGw9XCJub25lXCIgLz5gXG4gICAgICAgICAgOiBcIlwiXG4gICAgICB9XG4gICAgPC9zdmc+XG4gIGAucmVwbGFjZUFsbChcIlxcblwiLCBcIlwiKTtcbiAgcmV0dXJuIGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoc3ZnKX1gO1xufVxuIiwgImV4cG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gXCIuL09BdXRoU2VydmljZVwiO1xuZXhwb3J0IHsgd2l0aEFjY2Vzc1Rva2VuLCBnZXRBY2Nlc3NUb2tlbiB9IGZyb20gXCIuL3dpdGhBY2Nlc3NUb2tlblwiO1xuXG5leHBvcnQgdHlwZSB7IFdpdGhBY2Nlc3NUb2tlbkNvbXBvbmVudE9yRm4gfSBmcm9tIFwiLi93aXRoQWNjZXNzVG9rZW5cIjtcbmV4cG9ydCB0eXBlIHtcbiAgT25BdXRob3JpemVQYXJhbXMsXG4gIE9BdXRoU2VydmljZU9wdGlvbnMsXG4gIFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zLFxuICBQcm92aWRlck9wdGlvbnMsXG59IGZyb20gXCIuL3R5cGVzXCI7XG4iLCAiaW1wb3J0IHsgQ29sb3IsIE9BdXRoIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgUFJPVklERVJfQ0xJRU5UX0lEUyB9IGZyb20gXCIuL3Byb3ZpZGVyc1wiO1xuaW1wb3J0IHR5cGUge1xuICBPQXV0aFNlcnZpY2VPcHRpb25zLFxuICBPbkF1dGhvcml6ZVBhcmFtcyxcbiAgUHJvdmlkZXJPcHRpb25zLFxuICBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucyxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqXG4gKiBDbGFzcyBhbGxvd2luZyB0byBjcmVhdGUgYW4gT0F1dGggc2VydmljZSB1c2luZyB0aGUgdGhlIFBLQ0UgKFByb29mIEtleSBmb3IgQ29kZSBFeGNoYW5nZSkgZmxvdy5cbiAqXG4gKiBUaGlzIHNlcnZpY2UgaXMgY2FwYWJsZSBvZiBzdGFydGluZyB0aGUgYXV0aG9yaXphdGlvbiBwcm9jZXNzLCBmZXRjaGluZyBhbmQgcmVmcmVzaGluZyB0b2tlbnMsXG4gKiBhcyB3ZWxsIGFzIG1hbmFnaW5nIHRoZSBhdXRoZW50aWNhdGlvbiBzdGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb2F1dGhDbGllbnQgPSBuZXcgT0F1dGguUEtDRUNsaWVudCh7IC4uLiB9KTtcbiAqIGNvbnN0IG9hdXRoU2VydmljZSA9IG5ldyBPQXV0aFNlcnZpY2Uoe1xuICogICBjbGllbnQ6IG9hdXRoQ2xpZW50LFxuICogICBjbGllbnRJZDogJ3lvdXItY2xpZW50LWlkJyxcbiAqICAgc2NvcGU6ICdyZXF1aXJlZCBzY29wZXMnLFxuICogICBhdXRob3JpemVVcmw6ICdodHRwczovL3Byb3ZpZGVyLmNvbS9vYXV0aC9hdXRob3JpemUnLFxuICogICB0b2tlblVybDogJ2h0dHBzOi8vcHJvdmlkZXIuY29tL29hdXRoL3Rva2VuJyxcbiAqICAgcmVmcmVzaFRva2VuVXJsOiAnaHR0cHM6Ly9wcm92aWRlci5jb20vb2F1dGgvdG9rZW4nLFxuICogICBleHRyYVBhcmFtZXRlcnM6IHsgJ2FkZGl0aW9uYWxfcGFyYW0nOiAndmFsdWUnIH1cbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBjbGFzcyBPQXV0aFNlcnZpY2UgaW1wbGVtZW50cyBPQXV0aFNlcnZpY2VPcHRpb25zIHtcbiAgcHVibGljIGNsaWVudElkOiBzdHJpbmc7XG4gIHB1YmxpYyBzY29wZTogc3RyaW5nO1xuICBwdWJsaWMgY2xpZW50OiBPQXV0aC5QS0NFQ2xpZW50O1xuICBwdWJsaWMgZXh0cmFQYXJhbWV0ZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgcHVibGljIGF1dGhvcml6ZVVybDogc3RyaW5nO1xuICBwdWJsaWMgdG9rZW5Vcmw6IHN0cmluZztcbiAgcHVibGljIHJlZnJlc2hUb2tlblVybD86IHN0cmluZztcbiAgcHVibGljIGJvZHlFbmNvZGluZz86IFwianNvblwiIHwgXCJ1cmwtZW5jb2RlZFwiO1xuICBwdWJsaWMgcGVyc29uYWxBY2Nlc3NUb2tlbj86IHN0cmluZztcbiAgb25BdXRob3JpemU/OiAocGFyYW1zOiBPbkF1dGhvcml6ZVBhcmFtcykgPT4gdm9pZDtcbiAgdG9rZW5SZXNwb25zZVBhcnNlcjogKHJlc3BvbnNlOiB1bmtub3duKSA9PiBPQXV0aC5Ub2tlblJlc3BvbnNlO1xuICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogKHJlc3BvbnNlOiB1bmtub3duKSA9PiBPQXV0aC5Ub2tlblJlc3BvbnNlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IE9BdXRoU2VydmljZU9wdGlvbnMpIHtcbiAgICB0aGlzLmNsaWVudElkID0gb3B0aW9ucy5jbGllbnRJZDtcbiAgICB0aGlzLnNjb3BlID0gQXJyYXkuaXNBcnJheShvcHRpb25zLnNjb3BlKSA/IG9wdGlvbnMuc2NvcGUuam9pbihcIiBcIikgOiBvcHRpb25zLnNjb3BlO1xuICAgIHRoaXMucGVyc29uYWxBY2Nlc3NUb2tlbiA9IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbjtcbiAgICB0aGlzLmJvZHlFbmNvZGluZyA9IG9wdGlvbnMuYm9keUVuY29kaW5nO1xuICAgIHRoaXMuY2xpZW50ID0gb3B0aW9ucy5jbGllbnQ7XG4gICAgdGhpcy5leHRyYVBhcmFtZXRlcnMgPSBvcHRpb25zLmV4dHJhUGFyYW1ldGVycztcbiAgICB0aGlzLmF1dGhvcml6ZVVybCA9IG9wdGlvbnMuYXV0aG9yaXplVXJsO1xuICAgIHRoaXMudG9rZW5VcmwgPSBvcHRpb25zLnRva2VuVXJsO1xuICAgIHRoaXMucmVmcmVzaFRva2VuVXJsID0gb3B0aW9ucy5yZWZyZXNoVG9rZW5Vcmw7XG4gICAgdGhpcy5vbkF1dGhvcml6ZSA9IG9wdGlvbnMub25BdXRob3JpemU7XG4gICAgdGhpcy50b2tlblJlc3BvbnNlUGFyc2VyID0gb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyID8/ICgoeCkgPT4geCBhcyBPQXV0aC5Ub2tlblJlc3BvbnNlKTtcbiAgICB0aGlzLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyID0gb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlciA/PyAoKHgpID0+IHggYXMgT0F1dGguVG9rZW5SZXNwb25zZSk7XG4gICAgdGhpcy5hdXRob3JpemUgPSB0aGlzLmF1dGhvcml6ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzYW5hIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgYXNhbmEgPSBPQXV0aFNlcnZpY2UuYXNhbmEoeyBzY29wZTogJ2RlZmF1bHQnIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBhc2FuYShvcHRpb25zOiBQcm92aWRlcldpdGhEZWZhdWx0Q2xpZW50T3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgT0F1dGhTZXJ2aWNlKHtcbiAgICAgIGNsaWVudDogbmV3IE9BdXRoLlBLQ0VDbGllbnQoe1xuICAgICAgICByZWRpcmVjdE1ldGhvZDogT0F1dGguUmVkaXJlY3RNZXRob2QuV2ViLFxuICAgICAgICBwcm92aWRlck5hbWU6IFwiQXNhbmFcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI1MVwiIGhlaWdodD1cIjIzMlwiIGZpbGw9XCJub25lXCI+PHBhdGggZmlsbD1cIiNGMDZBNkFcIiBkPVwiTTE3OS4zODMgNTQuMzczYzAgMzAuMDE3LTI0LjMzNyA1NC4zNzQtNTQuMzU0IDU0LjM3NC0zMC4wMzUgMC01NC4zNzMtMjQuMzM4LTU0LjM3My01NC4zNzRDNzAuNjU2IDI0LjMzOCA5NC45OTMgMCAxMjUuMDI5IDBjMzAuMDE3IDAgNTQuMzU0IDI0LjMzOCA1NC4zNTQgNTQuMzczWk01NC4zOTMgMTIyLjMzQzI0LjM3NiAxMjIuMzMuMDIgMTQ2LjY2OC4wMiAxNzYuNjg1YzAgMzAuMDE3IDI0LjMzNyA1NC4zNzMgNTQuMzczIDU0LjM3MyAzMC4wMzUgMCA1NC4zNzMtMjQuMzM4IDU0LjM3My01NC4zNzMgMC0zMC4wMTctMjQuMzM4LTU0LjM1NS01NC4zNzMtNTQuMzU1Wm0xNDEuMjUzIDBjLTMwLjAzNSAwLTU0LjM3MyAyNC4zMzgtNTQuMzczIDU0LjM3NCAwIDMwLjAzNSAyNC4zMzggNTQuMzczIDU0LjM3MyA1NC4zNzMgMzAuMDE3IDAgNTQuMzc0LTI0LjMzOCA1NC4zNzQtNTQuMzczIDAtMzAuMDM2LTI0LjMzOC01NC4zNzQtNTQuMzc0LTU0LjM3NFpcIi8+PC9zdmc+YCxcbiAgICAgICAgKX1gLFxuICAgICAgICBwcm92aWRlcklkOiBcImFzYW5hXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBBc2FuYSBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkID8/IFBST1ZJREVSX0NMSUVOVF9JRFMuYXNhbmEsXG4gICAgICBhdXRob3JpemVVcmw6IG9wdGlvbnMuYXV0aG9yaXplVXJsID8/IFwiaHR0cHM6Ly9hc2FuYS5vYXV0aC5yYXljYXN0LmNvbS9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9hc2FuYS5vYXV0aC5yYXljYXN0LmNvbS90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnJlZnJlc2hUb2tlblVybCA/PyBcImh0dHBzOi8vYXNhbmEub2F1dGgucmF5Y2FzdC5jb20vcmVmcmVzaC10b2tlblwiLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBvbkF1dGhvcml6ZTogb3B0aW9ucy5vbkF1dGhvcml6ZSxcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXRIdWIgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBnaXRodWIgPSBPQXV0aFNlcnZpY2UuZ2l0aHViKHsgc2NvcGU6ICdyZXBvIHVzZXInIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnaXRodWIob3B0aW9uczogUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIkdpdEh1YlwiLFxuICAgICAgICBwcm92aWRlckljb246IHtcbiAgICAgICAgICBzb3VyY2U6IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCI2NFwiIGhlaWdodD1cIjY0XCIgdmlld0JveD1cIjAgMCAxNiAxNlwiPjxwYXRoIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBkPVwiTTggMEMzLjU4IDAgMCAzLjU4IDAgOGMwIDMuNTQgMi4yOSA2LjUzIDUuNDcgNy41OS40LjA3LjU1LS4xNy41NS0uMzggMC0uMTktLjAxLS44Mi0uMDEtMS40OS0yLjAxLjM3LTIuNTMtLjQ5LTIuNjktLjk0LS4wOS0uMjMtLjQ4LS45NC0uODItMS4xMy0uMjgtLjE1LS42OC0uNTItLjAxLS41My42My0uMDEgMS4wOC41OCAxLjIzLjgyLjcyIDEuMjEgMS44Ny44NyAyLjMzLjY2LjA3LS41Mi4yOC0uODcuNTEtMS4wNy0xLjc4LS4yLTMuNjQtLjg5LTMuNjQtMy45NSAwLS44Ny4zMS0xLjU5LjgyLTIuMTUtLjA4LS4yLS4zNi0xLjAyLjA4LTIuMTIgMCAwIC42Ny0uMjEgMi4yLjgyLjY0LS4xOCAxLjMyLS4yNyAyLS4yNy42OCAwIDEuMzYuMDkgMiAuMjcgMS41My0xLjA0IDIuMi0uODIgMi4yLS44Mi40NCAxLjEuMTYgMS45Mi4wOCAyLjEyLjUxLjU2LjgyIDEuMjcuODIgMi4xNSAwIDMuMDctMS44NyAzLjc1LTMuNjUgMy45NS4yOS4yNS41NC43My41NCAxLjQ4IDAgMS4wNy0uMDEgMS45My0uMDEgMi4yIDAgLjIxLjE1LjQ2LjU1LjM4QTguMDEzIDguMDEzIDAgMCAwIDE2IDhjMC00LjQyLTMuNTgtOC04LTh6XCIvPjwvc3ZnPmAsXG4gICAgICAgICAgKX1gLFxuXG4gICAgICAgICAgdGludENvbG9yOiBDb2xvci5QcmltYXJ5VGV4dCxcbiAgICAgICAgfSxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJnaXRodWJcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIEdpdEh1YiBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkID8/IFBST1ZJREVSX0NMSUVOVF9JRFMuZ2l0aHViLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vZ2l0aHViLm9hdXRoLnJheWNhc3QuY29tL2F1dGhvcml6ZVwiLFxuICAgICAgdG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwgPz8gXCJodHRwczovL2dpdGh1Yi5vYXV0aC5yYXljYXN0LmNvbS90b2tlblwiLFxuICAgICAgcmVmcmVzaFRva2VuVXJsOiBvcHRpb25zLnJlZnJlc2hUb2tlblVybCA/PyBcImh0dHBzOi8vZ2l0aHViLm9hdXRoLnJheWNhc3QuY29tL3JlZnJlc2gtdG9rZW5cIixcbiAgICAgIHNjb3BlOiBvcHRpb25zLnNjb3BlLFxuICAgICAgcGVyc29uYWxBY2Nlc3NUb2tlbjogb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR29vZ2xlIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgZ29vZ2xlID0gT0F1dGhTZXJ2aWNlLmdvb2dsZSh7XG4gICAqICAgY2xpZW50SWQ6ICdjdXN0b20tY2xpZW50LWlkJyxcbiAgICogICBhdXRob3JpemVVcmw6ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvdjIvYXV0aCcsXG4gICAqICAgdG9rZW5Vcmw6ICdodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbicsXG4gICAqICAgc2NvcGU6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLnJlYWRvbmx5JyxcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnb29nbGUob3B0aW9uczogUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5BcHBVUkksXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJHb29nbGVcIixcbiAgICAgICAgcHJvdmlkZXJJY29uOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIiB2aWV3Qm94PVwiMCAwIDQ4IDQ4XCI+PHBhdGggZmlsbD1cIiNFQTQzMzVcIiBkPVwiTTI0IDkuNWMzLjU0IDAgNi43MSAxLjIyIDkuMjEgMy42bDYuODUtNi44NUMzNS45IDIuMzggMzAuNDcgMCAyNCAwIDE0LjYyIDAgNi41MSA1LjM4IDIuNTYgMTMuMjJsNy45OCA2LjE5QzEyLjQzIDEzLjcyIDE3Ljc0IDkuNSAyNCA5LjV6XCIvPjxwYXRoIGZpbGw9XCIjNDI4NUY0XCIgZD1cIk00Ni45OCAyNC41NWMwLTEuNTctLjE1LTMuMDktLjM4LTQuNTVIMjR2OS4wMmgxMi45NGMtLjU4IDIuOTYtMi4yNiA1LjQ4LTQuNzggNy4xOGw3LjczIDZjNC41MS00LjE4IDcuMDktMTAuMzYgNy4wOS0xNy42NXpcIi8+PHBhdGggZmlsbD1cIiNGQkJDMDVcIiBkPVwiTTEwLjUzIDI4LjU5Yy0uNDgtMS40NS0uNzYtMi45OS0uNzYtNC41OXMuMjctMy4xNC43Ni00LjU5bC03Ljk4LTYuMTlDLjkyIDE2LjQ2IDAgMjAuMTIgMCAyNGMwIDMuODguOTIgNy41NCAyLjU2IDEwLjc4bDcuOTctNi4xOXpcIi8+PHBhdGggZmlsbD1cIiMzNEE4NTNcIiBkPVwiTTI0IDQ4YzYuNDggMCAxMS45My0yLjEzIDE1Ljg5LTUuODFsLTcuNzMtNmMtMi4xNSAxLjQ1LTQuOTIgMi4zLTguMTYgMi4zLTYuMjYgMC0xMS41Ny00LjIyLTEzLjQ3LTkuOTFsLTcuOTggNi4xOUM2LjUxIDQyLjYyIDE0LjYyIDQ4IDI0IDQ4elwiLz48cGF0aCBmaWxsPVwibm9uZVwiIGQ9XCJNMCAwaDQ4djQ4SDB6XCIvPjwvc3ZnPmAsXG4gICAgICAgICl9YCxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJnb29nbGVcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIEdvb2dsZSBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi92Mi9hdXRoXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMudG9rZW5VcmwsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIGJvZHlFbmNvZGluZzogb3B0aW9ucy5ib2R5RW5jb2RpbmcgPz8gXCJ1cmwtZW5jb2RlZFwiLFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICB0b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlZnJlc2hSZXNwb25zZVBhcnNlcixcbiAgICAgIHRva2VuUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZXNwb25zZVBhcnNlcixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBKaXJhIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgamlyYSA9IE9BdXRoU2VydmljZS5qaXJhKHtcbiAgICogICBjbGllbnRJZDogJ2N1c3RvbS1jbGllbnQtaWQnLFxuICAgKiAgIGF1dGhvcml6ZVVybDogJ2h0dHBzOi8vYXV0aC5hdGxhc3NpYW4uY29tL2F1dGhvcml6ZScsXG4gICAqICAgdG9rZW5Vcmw6ICdodHRwczovL2FwaS5hdGxhc3NpYW4uY29tL29hdXRoL3Rva2VuJyxcbiAgICogICBzY29wZTogJ3JlYWQ6amlyYS11c2VyIHJlYWQ6amlyYS13b3JrIG9mZmxpbmVfYWNjZXNzJ1xuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGppcmEob3B0aW9uczogUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJKaXJhXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIgd2lkdGg9XCIyMzYxXCIgaGVpZ2h0PVwiMjUwMFwiIHZpZXdCb3g9XCIyLjU5IDAgMjE0LjA5MSAyMjRcIj48bGluZWFyR3JhZGllbnQgaWQ9XCJhXCIgeDE9XCIxMDIuNFwiIHgyPVwiNTYuMTVcIiB5MT1cIjIxOC42M1wiIHkyPVwiMTcyLjM5XCIgZ3JhZGllbnRUcmFuc2Zvcm09XCJtYXRyaXgoMSAwIDAgLTEgMCAyNjQpXCIgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+PHN0b3Agb2Zmc2V0PVwiLjE4XCIgc3RvcC1jb2xvcj1cIiMwMDUyY2NcIi8+PHN0b3Agb2Zmc2V0PVwiMVwiIHN0b3AtY29sb3I9XCIjMjY4NGZmXCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHhsaW5rOmhyZWY9XCIjYVwiIGlkPVwiYlwiIHgxPVwiMTE0LjY1XCIgeDI9XCIxNjAuODFcIiB5MT1cIjg1Ljc3XCIgeTI9XCIxMzEuOTJcIi8+PHBhdGggZmlsbD1cIiMyNjg0ZmZcIiBkPVwiTTIxNC4wNiAxMDUuNzMgMTE3LjY3IDkuMzQgMTA4LjMzIDAgMzUuNzcgNzIuNTYgMi41OSAxMDUuNzNhOC44OSA4Ljg5IDAgMCAwIDAgMTIuNTRsNjYuMjkgNjYuMjlMMTA4LjMzIDIyNGw3Mi41NS03Mi41NiAxLjEzLTEuMTIgMzIuMDUtMzJhOC44NyA4Ljg3IDAgMCAwIDAtMTIuNTl6bS0xMDUuNzMgMzkuMzlMNzUuMjEgMTEybDMzLjEyLTMzLjEyTDE0MS40NCAxMTJ6XCIvPjxwYXRoIGZpbGw9XCJ1cmwoI2EpXCIgZD1cIk0xMDguMzMgNzguODhhNTUuNzUgNTUuNzUgMCAwIDEtLjI0LTc4LjYxTDM1LjYyIDcyLjcxbDM5LjQ0IDM5LjQ0elwiLz48cGF0aCBmaWxsPVwidXJsKCNiKVwiIGQ9XCJtMTQxLjUzIDExMS45MS0zMy4yIDMzLjIxYTU1Ljc3IDU1Ljc3IDAgMCAxIDAgNzguODZMMTgxIDE1MS4zNXpcIi8+PC9zdmc+YCxcbiAgICAgICAgKX1gLFxuICAgICAgICBwcm92aWRlcklkOiBcImppcmFcIixcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ29ubmVjdCB5b3VyIEppcmEgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCxcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL2F1dGguYXRsYXNzaWFuLmNvbS9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9hdXRoLmF0bGFzc2lhbi5jb20vb2F1dGgvdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy5yZWZyZXNoVG9rZW5VcmwsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIHBlcnNvbmFsQWNjZXNzVG9rZW46IG9wdGlvbnMucGVyc29uYWxBY2Nlc3NUb2tlbixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgYm9keUVuY29kaW5nOiBvcHRpb25zLmJvZHlFbmNvZGluZyxcbiAgICAgIHRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyLFxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjogb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpbmVhciBPQXV0aCBzZXJ2aWNlIHByb3ZpZGVkIG91dCBvZiB0aGUgYm94LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGxpbmVhciA9IE9BdXRoU2VydmljZS5saW5lYXIoeyBzY29wZTogJ3JlYWQgd3JpdGUnIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBsaW5lYXIob3B0aW9uczogUHJvdmlkZXJXaXRoRGVmYXVsdENsaWVudE9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IE9BdXRoU2VydmljZSh7XG4gICAgICBjbGllbnQ6IG5ldyBPQXV0aC5QS0NFQ2xpZW50KHtcbiAgICAgICAgcmVkaXJlY3RNZXRob2Q6IE9BdXRoLlJlZGlyZWN0TWV0aG9kLldlYixcbiAgICAgICAgcHJvdmlkZXJOYW1lOiBcIkxpbmVhclwiLFxuICAgICAgICBwcm92aWRlckljb246IHtcbiAgICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICAgIGxpZ2h0OiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIiMyMjIzMjZcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiPjxwYXRoIGQ9XCJNMS4yMjU0MSA2MS41MjI4Yy0uMjIyNS0uOTQ4NS45MDc0OC0xLjU0NTkgMS41OTYzOC0uODU3TDM5LjMzNDIgOTcuMTc4MmMuNjg4OS42ODg5LjA5MTUgMS44MTg5LS44NTcgMS41OTY0QzIwLjA1MTUgOTQuNDUyMiA1LjU0Nzc5IDc5Ljk0ODUgMS4yMjU0MSA2MS41MjI4Wk0uMDAxODkxMzUgNDYuODg5MWMtLjAxNzY0Mzc1LjI4MzMuMDg4ODcyMTUuNTU5OS4yODk1NzE2NS43NjA2TDUyLjM1MDMgOTkuNzA4NWMuMjAwNy4yMDA3LjQ3NzMuMzA3NS43NjA2LjI4OTYgMi4zNjkyLS4xNDc2IDQuNjkzOC0uNDYgNi45NjI0LS45MjU5Ljc2NDUtLjE1NyAxLjAzMDEtMS4wOTYzLjQ3ODItMS42NDgxTDIuNTc1OTUgMzkuNDQ4NWMtLjU1MTg2LS41NTE5LTEuNDkxMTctLjI4NjMtMS42NDgxNzQuNDc4Mi0uNDY1OTE1IDIuMjY4Ni0uNzc4MzIgNC41OTMyLS45MjU4ODQ2NSA2Ljk2MjRaTTQuMjEwOTMgMjkuNzA1NGMtLjE2NjQ5LjM3MzgtLjA4MTY5LjgxMDYuMjA3NjUgMS4xbDY0Ljc3NjAyIDY0Ljc3NmMuMjg5NC4yODk0LjcyNjIuMzc0MiAxLjEuMjA3NyAxLjc4NjEtLjc5NTYgMy41MTcxLTEuNjkyNyA1LjE4NTUtMi42ODQuNTUyMS0uMzI4LjYzNzMtMS4wODY3LjE4MzItMS41NDA3TDguNDM1NjYgMjQuMzM2N2MtLjQ1NDA5LS40NTQxLTEuMjEyNzEtLjM2ODktMS41NDA3NC4xODMyLS45OTEzMiAxLjY2ODQtMS44ODg0MyAzLjM5OTQtMi42ODM5OSA1LjE4NTVaTTEyLjY1ODcgMTguMDc0Yy0uMzcwMS0uMzcwMS0uMzkzLS45NjM3LS4wNDQzLTEuMzU0MUMyMS43Nzk1IDYuNDU5MzEgMzUuMTExNCAwIDQ5Ljk1MTkgMCA3Ny41OTI3IDAgMTAwIDIyLjQwNzMgMTAwIDUwLjA0ODFjMCAxNC44NDA1LTYuNDU5MyAyOC4xNzI0LTE2LjcxOTkgMzcuMzM3NS0uMzkwMy4zNDg3LS45ODQuMzI1OC0xLjM1NDItLjA0NDNMMTIuNjU4NyAxOC4wNzRaXCIvPjwvc3ZnPmAsXG4gICAgICAgICAgICApfWAsXG4gICAgICAgICAgICBkYXJrOiBgZGF0YTppbWFnZS9zdmcreG1sLCR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIiNmZmZcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiPjxwYXRoIGQ9XCJNMS4yMjU0MSA2MS41MjI4Yy0uMjIyNS0uOTQ4NS45MDc0OC0xLjU0NTkgMS41OTYzOC0uODU3TDM5LjMzNDIgOTcuMTc4MmMuNjg4OS42ODg5LjA5MTUgMS44MTg5LS44NTcgMS41OTY0QzIwLjA1MTUgOTQuNDUyMiA1LjU0Nzc5IDc5Ljk0ODUgMS4yMjU0MSA2MS41MjI4Wk0uMDAxODkxMzUgNDYuODg5MWMtLjAxNzY0Mzc1LjI4MzMuMDg4ODcyMTUuNTU5OS4yODk1NzE2NS43NjA2TDUyLjM1MDMgOTkuNzA4NWMuMjAwNy4yMDA3LjQ3NzMuMzA3NS43NjA2LjI4OTYgMi4zNjkyLS4xNDc2IDQuNjkzOC0uNDYgNi45NjI0LS45MjU5Ljc2NDUtLjE1NyAxLjAzMDEtMS4wOTYzLjQ3ODItMS42NDgxTDIuNTc1OTUgMzkuNDQ4NWMtLjU1MTg2LS41NTE5LTEuNDkxMTctLjI4NjMtMS42NDgxNzQuNDc4Mi0uNDY1OTE1IDIuMjY4Ni0uNzc4MzIgNC41OTMyLS45MjU4ODQ2NSA2Ljk2MjRaTTQuMjEwOTMgMjkuNzA1NGMtLjE2NjQ5LjM3MzgtLjA4MTY5LjgxMDYuMjA3NjUgMS4xbDY0Ljc3NjAyIDY0Ljc3NmMuMjg5NC4yODk0LjcyNjIuMzc0MiAxLjEuMjA3NyAxLjc4NjEtLjc5NTYgMy41MTcxLTEuNjkyNyA1LjE4NTUtMi42ODQuNTUyMS0uMzI4LjYzNzMtMS4wODY3LjE4MzItMS41NDA3TDguNDM1NjYgMjQuMzM2N2MtLjQ1NDA5LS40NTQxLTEuMjEyNzEtLjM2ODktMS41NDA3NC4xODMyLS45OTEzMiAxLjY2ODQtMS44ODg0MyAzLjM5OTQtMi42ODM5OSA1LjE4NTVaTTEyLjY1ODcgMTguMDc0Yy0uMzcwMS0uMzcwMS0uMzkzLS45NjM3LS4wNDQzLTEuMzU0MUMyMS43Nzk1IDYuNDU5MzEgMzUuMTExNCAwIDQ5Ljk1MTkgMCA3Ny41OTI3IDAgMTAwIDIyLjQwNzMgMTAwIDUwLjA0ODFjMCAxNC44NDA1LTYuNDU5MyAyOC4xNzI0LTE2LjcxOTkgMzcuMzM3NS0uMzkwMy4zNDg3LS45ODQuMzI1OC0xLjM1NDItLjA0NDNMMTIuNjU4NyAxOC4wNzRaXCIgLz48L3N2Zz5gLFxuICAgICAgICAgICAgKX1gLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb3ZpZGVySWQ6IFwibGluZWFyXCIsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgeW91ciBMaW5lYXIgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCA/PyBQUk9WSURFUl9DTElFTlRfSURTLmxpbmVhcixcbiAgICAgIGF1dGhvcml6ZVVybDogb3B0aW9ucy5hdXRob3JpemVVcmwgPz8gXCJodHRwczovL2xpbmVhci5vYXV0aC5yYXljYXN0LmNvbS9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly9saW5lYXIub2F1dGgucmF5Y2FzdC5jb20vdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy5yZWZyZXNoVG9rZW5VcmwgPz8gXCJodHRwczovL2xpbmVhci5vYXV0aC5yYXljYXN0LmNvbS9yZWZyZXNoLXRva2VuXCIsXG4gICAgICBzY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIGV4dHJhUGFyYW1ldGVyczoge1xuICAgICAgICBhY3RvcjogXCJ1c2VyXCIsXG4gICAgICB9LFxuICAgICAgb25BdXRob3JpemU6IG9wdGlvbnMub25BdXRob3JpemUsXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2xhY2sgT0F1dGggc2VydmljZSBwcm92aWRlZCBvdXQgb2YgdGhlIGJveC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBzbGFjayA9IE9BdXRoU2VydmljZS5zbGFjayh7IHNjb3BlOiAnZW1vamk6cmVhZCcgfSlcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNsYWNrKG9wdGlvbnM6IFByb3ZpZGVyV2l0aERlZmF1bHRDbGllbnRPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJTbGFja1wiLFxuICAgICAgICBwcm92aWRlckljb246IGBkYXRhOmltYWdlL3N2Zyt4bWwsJHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCI3MyA3MyAxMjQgMTI0XCI+PHN0eWxlPi5zdDB7ZmlsbDojZTAxZTVhfS5zdDF7ZmlsbDojMzZjNWYwfS5zdDJ7ZmlsbDojMmViNjdkfS5zdDN7ZmlsbDojZWNiMjJlfTwvc3R5bGU+PHBhdGggZD1cIk05OS40IDE1MS4yYzAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOS03LjEgMC0xMi45LTUuOC0xMi45LTEyLjkgMC03LjEgNS44LTEyLjkgMTIuOS0xMi45aDEyLjl2MTIuOXpNMTA1LjkgMTUxLjJjMC03LjEgNS44LTEyLjkgMTIuOS0xMi45czEyLjkgNS44IDEyLjkgMTIuOXYzMi4zYzAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOXMtMTIuOS01LjgtMTIuOS0xMi45di0zMi4zelwiIGNsYXNzPVwic3QwXCIvPjxwYXRoIGQ9XCJNMTE4LjggOTkuNGMtNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45IDAtNy4xIDUuOC0xMi45IDEyLjktMTIuOXMxMi45IDUuOCAxMi45IDEyLjl2MTIuOWgtMTIuOXpNMTE4LjggMTA1LjljNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45cy01LjggMTIuOS0xMi45IDEyLjlIODYuNWMtNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45czUuOC0xMi45IDEyLjktMTIuOWgzMi4zelwiIGNsYXNzPVwic3QxXCIvPjxwYXRoIGQ9XCJNMTcwLjYgMTE4LjhjMC03LjEgNS44LTEyLjkgMTIuOS0xMi45IDcuMSAwIDEyLjkgNS44IDEyLjkgMTIuOXMtNS44IDEyLjktMTIuOSAxMi45aC0xMi45di0xMi45ek0xNjQuMSAxMTguOGMwIDcuMS01LjggMTIuOS0xMi45IDEyLjktNy4xIDAtMTIuOS01LjgtMTIuOS0xMi45Vjg2LjVjMC03LjEgNS44LTEyLjkgMTIuOS0xMi45IDcuMSAwIDEyLjkgNS44IDEyLjkgMTIuOXYzMi4zelwiIGNsYXNzPVwic3QyXCIvPjxwYXRoIGQ9XCJNMTUxLjIgMTcwLjZjNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45IDAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOS03LjEgMC0xMi45LTUuOC0xMi45LTEyLjl2LTEyLjloMTIuOXpNMTUxLjIgMTY0LjFjLTcuMSAwLTEyLjktNS44LTEyLjktMTIuOSAwLTcuMSA1LjgtMTIuOSAxMi45LTEyLjloMzIuM2M3LjEgMCAxMi45IDUuOCAxMi45IDEyLjkgMCA3LjEtNS44IDEyLjktMTIuOSAxMi45aC0zMi4zelwiIGNsYXNzPVwic3QzXCIvPjwvc3ZnPmAsXG4gICAgICAgICl9YCxcbiAgICAgICAgcHJvdmlkZXJJZDogXCJzbGFja1wiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgU2xhY2sgYWNjb3VudFwiLFxuICAgICAgfSksXG4gICAgICBjbGllbnRJZDogb3B0aW9ucy5jbGllbnRJZCA/PyBQUk9WSURFUl9DTElFTlRfSURTLnNsYWNrLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vc2xhY2sub2F1dGgucmF5Y2FzdC5jb20vYXV0aG9yaXplXCIsXG4gICAgICB0b2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vc2xhY2sub2F1dGgucmF5Y2FzdC5jb20vdG9rZW5cIixcbiAgICAgIHJlZnJlc2hUb2tlblVybDogb3B0aW9ucy50b2tlblVybCA/PyBcImh0dHBzOi8vc2xhY2sub2F1dGgucmF5Y2FzdC5jb20vcmVmcmVzaC10b2tlblwiLFxuICAgICAgc2NvcGU6IFwiXCIsXG4gICAgICBleHRyYVBhcmFtZXRlcnM6IHtcbiAgICAgICAgdXNlcl9zY29wZTogb3B0aW9ucy5zY29wZSxcbiAgICAgIH0sXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMudG9rZW5VcmwgPyBvcHRpb25zLmJvZHlFbmNvZGluZyA/PyBcInVybC1lbmNvZGVkXCIgOiBcImpzb25cIixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgdG9rZW5SZXNwb25zZVBhcnNlcjpcbiAgICAgICAgb3B0aW9ucy50b2tlblJlc3BvbnNlUGFyc2VyID8/XG4gICAgICAgICgocmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY2Nlc3NfdG9rZW46IHJlc3BvbnNlLmF1dGhlZF91c2VyLmFjY2Vzc190b2tlbixcbiAgICAgICAgICAgIHNjb3BlOiByZXNwb25zZS5hdXRoZWRfdXNlci5zY29wZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBab29tIE9BdXRoIHNlcnZpY2UgcHJvdmlkZWQgb3V0IG9mIHRoZSBib3guXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgem9vbSA9IE9BdXRoU2VydmljZS56b29tKHtcbiAgICogICBjbGllbnRJZDogJ2N1c3RvbS1jbGllbnQtaWQnLFxuICAgKiAgIGF1dGhvcml6ZVVybDogJ2h0dHBzOi8vem9vbS51cy9vYXV0aC9hdXRob3JpemUnLFxuICAgKiAgIHRva2VuVXJsOiAnaHR0cHM6Ly96b29tLnVzL29hdXRoL3Rva2VuJyxcbiAgICogICBzY29wZTogJ21lZXRpbmc6d3JpdGUnLFxuICAgKiAgIHBlcnNvbmFsQWNjZXNzVG9rZW46ICdwZXJzb25hbC1hY2Nlc3MtdG9rZW4nLFxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHpvb20ob3B0aW9uczogUHJvdmlkZXJPcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyBPQXV0aFNlcnZpY2Uoe1xuICAgICAgY2xpZW50OiBuZXcgT0F1dGguUEtDRUNsaWVudCh7XG4gICAgICAgIHJlZGlyZWN0TWV0aG9kOiBPQXV0aC5SZWRpcmVjdE1ldGhvZC5XZWIsXG4gICAgICAgIHByb3ZpZGVyTmFtZTogXCJab29tXCIsXG4gICAgICAgIHByb3ZpZGVySWNvbjogYGRhdGE6aW1hZ2Uvc3ZnK3htbCwke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAzNTEuODQ1IDgwXCI+PHBhdGggZD1cIk03My43ODYgNzguODM1SDEwLjg4QTEwLjg0MiAxMC44NDIgMCAwIDEgLjgzMyA3Mi4xMjJhMTAuODQxIDEwLjg0MSAwIDAgMSAyLjM1Ny0xMS44NUw0Ni43NjQgMTYuN2gtMzEuMjNDNi45NTQgMTYuNjk5IDAgOS43NDQgMCAxLjE2NWg1OC4wMTRjNC40MTQgMCA4LjM1NyAyLjYzNCAxMC4wNDYgNi43MTJhMTAuODQzIDEwLjg0MyAwIDAgMS0yLjM1NiAxMS44NUwyMi4xMyA2My4zMDJoMzYuMTIyYzguNTggMCAxNS41MzQgNi45NTUgMTUuNTM0IDE1LjUzNFptMjc4LjA1OS00OC41NDRDMzUxLjg0NSAxMy41ODggMzM4LjI1NiAwIDMyMS41NTMgMGMtOC45MzQgMC0xNi45NzUgMy44OS0yMi41MjQgMTAuMDYzQzI5My40OCAzLjg5IDI4NS40NCAwIDI3Ni41MDUgMGMtMTYuNzAzIDAtMzAuMjkxIDEzLjU4OC0zMC4yOTEgMzAuMjkxdjQ4LjU0NGM4LjU3OSAwIDE1LjUzNC02Ljk1NSAxNS41MzQtMTUuNTM0di0zMy4wMWMwLTguMTM3IDYuNjItMTQuNzU3IDE0Ljc1Ny0xNC43NTdzMTQuNzU3IDYuNjIgMTQuNzU3IDE0Ljc1N3YzMy4wMWMwIDguNTggNi45NTUgMTUuNTM0IDE1LjUzNCAxNS41MzRWMzAuMjkxYzAtOC4xMzcgNi42Mi0xNC43NTcgMTQuNzU3LTE0Ljc1N3MxNC43NTggNi42MiAxNC43NTggMTQuNzU3djMzLjAxYzAgOC41OCA2Ljk1NCAxNS41MzQgMTUuNTM0IDE1LjUzNFYzMC4yOTFaTTIzOC40NDcgNDBjMCAyMi4wOTEtMTcuOTA5IDQwLTQwIDQwcy00MC0xNy45MDktNDAtNDAgMTcuOTA4LTQwIDQwLTQwIDQwIDE3LjkwOSA0MCA0MFptLTE1LjUzNCAwYzAtMTMuNTEyLTEwLjk1NC0yNC40NjYtMjQuNDY2LTI0LjQ2NlMxNzMuOTggMjYuNDg4IDE3My45OCA0MHMxMC45NTMgMjQuNDY2IDI0LjQ2NiAyNC40NjZTMjIyLjkxMyA1My41MTIgMjIyLjkxMyA0MFptLTcwLjY4IDBjMCAyMi4wOTEtMTcuOTA5IDQwLTQwIDQwcy00MC0xNy45MDktNDAtNDAgMTcuOTA5LTQwIDQwLTQwIDQwIDE3LjkwOSA0MCA0MFptLTE1LjUzNCAwYzAtMTMuNTEyLTEwLjk1NC0yNC40NjYtMjQuNDY2LTI0LjQ2NlM4Ny43NjcgMjYuNDg4IDg3Ljc2NyA0MHMxMC45NTQgMjQuNDY2IDI0LjQ2NiAyNC40NjZTMTM2LjY5OSA1My41MTIgMTM2LjY5OSA0MFpcIiBzdHlsZT1cImZpbGw6IzBiNWNmZlwiLz48L3N2Zz5gLFxuICAgICAgICApfWAsXG4gICAgICAgIHByb3ZpZGVySWQ6IFwiem9vbVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDb25uZWN0IHlvdXIgWm9vbSBhY2NvdW50XCIsXG4gICAgICB9KSxcbiAgICAgIGNsaWVudElkOiBvcHRpb25zLmNsaWVudElkLFxuICAgICAgYXV0aG9yaXplVXJsOiBvcHRpb25zLmF1dGhvcml6ZVVybCA/PyBcImh0dHBzOi8vem9vbS51cy9vYXV0aC9hdXRob3JpemVcIixcbiAgICAgIHRva2VuVXJsOiBvcHRpb25zLnRva2VuVXJsID8/IFwiaHR0cHM6Ly96b29tLnVzL29hdXRoL3Rva2VuXCIsXG4gICAgICByZWZyZXNoVG9rZW5Vcmw6IG9wdGlvbnMucmVmcmVzaFRva2VuVXJsLFxuICAgICAgc2NvcGU6IG9wdGlvbnMuc2NvcGUsXG4gICAgICBwZXJzb25hbEFjY2Vzc1Rva2VuOiBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4sXG4gICAgICBib2R5RW5jb2Rpbmc6IG9wdGlvbnMuYm9keUVuY29kaW5nID8/IFwidXJsLWVuY29kZWRcIixcbiAgICAgIG9uQXV0aG9yaXplOiBvcHRpb25zLm9uQXV0aG9yaXplLFxuICAgICAgdG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXI6IG9wdGlvbnMudG9rZW5SZWZyZXNoUmVzcG9uc2VQYXJzZXIsXG4gICAgICB0b2tlblJlc3BvbnNlUGFyc2VyOiBvcHRpb25zLnRva2VuUmVzcG9uc2VQYXJzZXIsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhdGVzIHRoZSBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3Mgb3IgcmVmcmVzaGVzIGV4aXN0aW5nIHRva2VucyBpZiBuZWNlc3NhcnkuXG4gICAqIElmIHRoZSBjdXJyZW50IHRva2VuIHNldCBoYXMgYSByZWZyZXNoIHRva2VuIGFuZCBpdCBpcyBleHBpcmVkLCB0aGVuIHRoZSBmdW5jdGlvbiB3aWxsIHJlZnJlc2ggdGhlIHRva2Vucy5cbiAgICogSWYgbm8gdG9rZW5zIGV4aXN0LCBpdCB3aWxsIGluaXRpYXRlIHRoZSBPQXV0aCBhdXRob3JpemF0aW9uIHByb2Nlc3MgYW5kIGZldGNoIHRoZSB0b2tlbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGFjY2VzcyB0b2tlbiBvYnRhaW5lZCBmcm9tIHRoZSBhdXRob3JpemF0aW9uIGZsb3csIG9yIG51bGwgaWYgdGhlIHRva2VuIGNvdWxkIG5vdCBiZSBvYnRhaW5lZC5cbiAgICovXG4gIGFzeW5jIGF1dGhvcml6ZSgpIHtcbiAgICBjb25zdCBjdXJyZW50VG9rZW5TZXQgPSBhd2FpdCB0aGlzLmNsaWVudC5nZXRUb2tlbnMoKTtcbiAgICBpZiAoY3VycmVudFRva2VuU2V0Py5hY2Nlc3NUb2tlbikge1xuICAgICAgaWYgKGN1cnJlbnRUb2tlblNldC5yZWZyZXNoVG9rZW4gJiYgY3VycmVudFRva2VuU2V0LmlzRXhwaXJlZCgpKSB7XG4gICAgICAgIGNvbnN0IHRva2VucyA9IGF3YWl0IHRoaXMucmVmcmVzaFRva2Vucyh7XG4gICAgICAgICAgdG9rZW46IGN1cnJlbnRUb2tlblNldC5yZWZyZXNoVG9rZW4sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluIHRoZSBjYXNlIHdoZXJlIHRoZSByZWZyZXNoIHRva2VuIGZsb3dzIGZhaWxzLCBub3RoaW5nIGlzIHJldHVybmVkIGFuZCB0aGUgYXV0aG9yaXplIGZ1bmN0aW9uIGlzIGNhbGxlZCBhZ2Fpbi5cbiAgICAgICAgaWYgKHRva2Vucykge1xuICAgICAgICAgIGF3YWl0IHRoaXMuY2xpZW50LnNldFRva2Vucyh0b2tlbnMpO1xuICAgICAgICAgIHJldHVybiB0b2tlbnMuYWNjZXNzX3Rva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VycmVudFRva2VuU2V0LmFjY2Vzc1Rva2VuO1xuICAgIH1cblxuICAgIGNvbnN0IGF1dGhSZXF1ZXN0ID0gYXdhaXQgdGhpcy5jbGllbnQuYXV0aG9yaXphdGlvblJlcXVlc3Qoe1xuICAgICAgZW5kcG9pbnQ6IHRoaXMuYXV0aG9yaXplVXJsLFxuICAgICAgY2xpZW50SWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIGV4dHJhUGFyYW1ldGVyczogdGhpcy5leHRyYVBhcmFtZXRlcnMsXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IGF1dGhvcml6YXRpb25Db2RlIH0gPSBhd2FpdCB0aGlzLmNsaWVudC5hdXRob3JpemUoYXV0aFJlcXVlc3QpO1xuICAgIGNvbnN0IHRva2VucyA9IGF3YWl0IHRoaXMuZmV0Y2hUb2tlbnMoe1xuICAgICAgYXV0aFJlcXVlc3QsXG4gICAgICBhdXRob3JpemF0aW9uQ29kZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuY2xpZW50LnNldFRva2Vucyh0b2tlbnMpO1xuXG4gICAgcmV0dXJuIHRva2Vucy5hY2Nlc3NfdG9rZW47XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGZldGNoVG9rZW5zKHtcbiAgICBhdXRoUmVxdWVzdCxcbiAgICBhdXRob3JpemF0aW9uQ29kZSxcbiAgfToge1xuICAgIGF1dGhSZXF1ZXN0OiBPQXV0aC5BdXRob3JpemF0aW9uUmVxdWVzdDtcbiAgICBhdXRob3JpemF0aW9uQ29kZTogc3RyaW5nO1xuICB9KSB7XG4gICAgbGV0IG9wdGlvbnM7XG4gICAgaWYgKHRoaXMuYm9keUVuY29kaW5nID09PSBcInVybC1lbmNvZGVkXCIpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICAgIHBhcmFtcy5hcHBlbmQoXCJjbGllbnRfaWRcIiwgdGhpcy5jbGllbnRJZCk7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiY29kZVwiLCBhdXRob3JpemF0aW9uQ29kZSk7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiY29kZV92ZXJpZmllclwiLCBhdXRoUmVxdWVzdC5jb2RlVmVyaWZpZXIpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImdyYW50X3R5cGVcIiwgXCJhdXRob3JpemF0aW9uX2NvZGVcIik7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwicmVkaXJlY3RfdXJpXCIsIGF1dGhSZXF1ZXN0LnJlZGlyZWN0VVJJKTtcblxuICAgICAgb3B0aW9ucyA9IHsgYm9keTogcGFyYW1zIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgICAgY29kZTogYXV0aG9yaXphdGlvbkNvZGUsXG4gICAgICAgICAgY29kZV92ZXJpZmllcjogYXV0aFJlcXVlc3QuY29kZVZlcmlmaWVyLFxuICAgICAgICAgIGdyYW50X3R5cGU6IFwiYXV0aG9yaXphdGlvbl9jb2RlXCIsXG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiBhdXRoUmVxdWVzdC5yZWRpcmVjdFVSSSxcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnRva2VuVXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIC4uLm9wdGlvbnMgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc29sZS5lcnJvcihcImZldGNoIHRva2VucyBlcnJvcjpcIiwgcmVzcG9uc2VUZXh0KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXJyb3Igd2hpbGUgZmV0Y2hpbmcgdG9rZW5zOiAke3Jlc3BvbnNlLnN0YXR1c30gKCR7cmVzcG9uc2Uuc3RhdHVzVGV4dH0pXFxuJHtyZXNwb25zZVRleHR9YCk7XG4gICAgfVxuICAgIGNvbnN0IHRva2VucyA9IHRoaXMudG9rZW5SZXNwb25zZVBhcnNlcihhd2FpdCByZXNwb25zZS5qc29uKCkpO1xuXG4gICAgLy8gU29tZSBjbGllbnRzIHN1Y2ggYXMgTGluZWFyIGNhbiByZXR1cm4gYSBzY29wZSBhcnJheSBpbnN0ZWFkIG9mIGEgc3RyaW5nXG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodG9rZW5zLnNjb3BlKSA/IHsgLi4udG9rZW5zLCBzY29wZTogdG9rZW5zLnNjb3BlLmpvaW4oXCIgXCIpIH0gOiB0b2tlbnM7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlZnJlc2hUb2tlbnMoeyB0b2tlbiB9OiB7IHRva2VuOiBzdHJpbmcgfSkge1xuICAgIGxldCBvcHRpb25zO1xuICAgIGlmICh0aGlzLmJvZHlFbmNvZGluZyA9PT0gXCJ1cmwtZW5jb2RlZFwiKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgICBwYXJhbXMuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHRoaXMuY2xpZW50SWQpO1xuICAgICAgcGFyYW1zLmFwcGVuZChcInJlZnJlc2hfdG9rZW5cIiwgdG9rZW4pO1xuICAgICAgcGFyYW1zLmFwcGVuZChcImdyYW50X3R5cGVcIiwgXCJyZWZyZXNoX3Rva2VuXCIpO1xuXG4gICAgICBvcHRpb25zID0geyBib2R5OiBwYXJhbXMgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0b2tlbixcbiAgICAgICAgICBncmFudF90eXBlOiBcInJlZnJlc2hfdG9rZW5cIixcbiAgICAgICAgfSksXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh0aGlzLnJlZnJlc2hUb2tlblVybCA/PyB0aGlzLnRva2VuVXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIC4uLm9wdGlvbnMgfSk7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgY29uc3QgcmVzcG9uc2VUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgY29uc29sZS5lcnJvcihcInJlZnJlc2ggdG9rZW5zIGVycm9yOlwiLCByZXNwb25zZVRleHQpO1xuICAgICAgLy8gSWYgdGhlIHJlZnJlc2ggdG9rZW4gaXMgaW52YWxpZCwgc3RvcCB0aGUgZmxvdyBoZXJlLCBsb2cgb3V0IHRoZSB1c2VyIGFuZCBwcm9tcHQgdGhlbSB0byByZS1hdXRob3JpemUuXG4gICAgICB0aGlzLmNsaWVudC5kZXNjcmlwdGlvbiA9IGAke3RoaXMuY2xpZW50LnByb3ZpZGVyTmFtZX0gbmVlZHMgeW91IHRvIHNpZ24taW4gYWdhaW4uIFByZXNzIOKPjiBvciBjbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIGNvbnRpbnVlLmA7XG4gICAgICBhd2FpdCB0aGlzLmNsaWVudC5yZW1vdmVUb2tlbnMoKTtcbiAgICAgIGF3YWl0IHRoaXMuYXV0aG9yaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRva2VuUmVzcG9uc2UgPSB0aGlzLnRva2VuUmVmcmVzaFJlc3BvbnNlUGFyc2VyKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgICB0b2tlblJlc3BvbnNlLnJlZnJlc2hfdG9rZW4gPSB0b2tlblJlc3BvbnNlLnJlZnJlc2hfdG9rZW4gPz8gdG9rZW47XG4gICAgICByZXR1cm4gdG9rZW5SZXNwb25zZTtcbiAgICB9XG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgUFJPVklERVJfQ0xJRU5UX0lEUyA9IHtcbiAgYXNhbmE6IFwiMTE5MTIwMTc0NTY4NDMxMlwiLFxuICBnaXRodWI6IFwiNzIzNWZlOGQ0MjE1N2YxZjM4YzBcIixcbiAgbGluZWFyOiBcImM4ZmYzN2I5MjI1YzNjOWFlZmQ3ZDY2ZWEwZTViNmYxXCIsXG4gIHNsYWNrOiBcIjg1MTc1Njg4NDY5Mi41NTQ2OTI3MjkwMjEyXCIsXG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVudmlyb25tZW50LCBPQXV0aCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB0eXBlIHsgT0F1dGhUeXBlLCBPbkF1dGhvcml6ZVBhcmFtcyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmxldCB0b2tlbjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5sZXQgdHlwZTogT0F1dGhUeXBlIHwgbnVsbCA9IG51bGw7XG5sZXQgYXV0aG9yaXplOiBQcm9taXNlPHN0cmluZz4gfCBudWxsID0gbnVsbDtcbmxldCBnZXRJZFRva2VuOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4gfCBudWxsID0gbnVsbDtcbmxldCBvbkF1dGhvcml6ZTogUHJvbWlzZTx2b2lkPiB8IG51bGwgPSBudWxsO1xuXG50eXBlIFdpdGhBY2Nlc3NUb2tlblBhcmFtZXRlcnMgPSB7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBpbnN0YW5jZSBvZiBhIFBLQ0UgQ2xpZW50IHRoYXQgeW91IGNhbiBjcmVhdGUgdXNpbmcgUmF5Y2FzdCBBUEkuXG4gICAqIFRoaXMgY2xpZW50IGlzIHVzZWQgdG8gcmV0dXJuIHRoZSBgaWRUb2tlbmAgYXMgcGFydCBvZiB0aGUgYG9uQXV0aG9yaXplYCBjYWxsYmFjay5cbiAgICovXG4gIGNsaWVudD86IE9BdXRoLlBLQ0VDbGllbnQ7XG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgaW5pdGlhdGVzIHRoZSBPQXV0aCB0b2tlbiByZXRyaWV2YWwgcHJvY2Vzc1xuICAgKiBAcmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhY2Nlc3MgdG9rZW4uXG4gICAqL1xuICBhdXRob3JpemU6ICgpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYW4gYWxyZWFkeSBvYnRhaW5lZCBwZXJzb25hbCBhY2Nlc3MgdG9rZW5cbiAgICovXG4gIHBlcnNvbmFsQWNjZXNzVG9rZW4/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCBvbmNlIHRoZSB1c2VyIGhhcyBiZWVuIHByb3Blcmx5IGxvZ2dlZCBpbiB0aHJvdWdoIE9BdXRoLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyBvZiB0aGUgY2FsbGJhY2tcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudG9rZW4gLSBUaGUgcmV0cmlldmVkIGFjY2VzcyB0b2tlblxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50eXBlIC0gVGhlIGFjY2VzcyB0b2tlbidzIHR5cGUgKGVpdGhlciBgb2F1dGhgIG9yIGBwZXJzb25hbGApXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlkVG9rZW4gLSBUaGUgb3B0aW9uYWwgaWQgdG9rZW4uIFRoZSBgaWRUb2tlbmAgaXMgcmV0dXJuZWQgaWYgYG9wdGlvbnMuY2xpZW50YCBpcyBwcm92aWRlZCBhbmQgaWYgaXQncyByZXR1cm5lZCBpbiB0aGUgaW5pdGlhbCB0b2tlbiBzZXQuXG4gICAqL1xuICBvbkF1dGhvcml6ZT86IChwYXJhbXM6IE9uQXV0aG9yaXplUGFyYW1zKSA9PiB2b2lkO1xufTtcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IChmb3IgYSB2aWV3L21lbnUtYmFyIGNvbW1hbmRzKSBvciBmdW5jdGlvbiAoZm9yIGEgbm8tdmlldyBjb21tYW5kKSB0aGF0IGlzIHBhc3NlZCB0byB3aXRoQWNjZXNzVG9rZW4uXG4gKi9cbmV4cG9ydCB0eXBlIFdpdGhBY2Nlc3NUb2tlbkNvbXBvbmVudE9yRm48VCA9IGFueSwgVSA9IGFueT4gPSAoKHBhcmFtczogVCkgPT4gUHJvbWlzZTxVPiB8IFUpIHwgUmVhY3QuQ29tcG9uZW50VHlwZTxUPjtcblxuLyoqXG4gKiBIaWdoZXItb3JkZXIgY29tcG9uZW50IHRvIHdyYXAgYSBnaXZlbiBjb21wb25lbnQgb3IgZnVuY3Rpb24gYW5kIHNldCBhbiBhY2Nlc3MgdG9rZW4gaW4gYSBzaGFyZWQgZ2xvYmFsIHZhcmlhYmxlLlxuICpcbiAqIFRoZSBmdW5jdGlvbiBpbnRlcmNlcHRzIHRoZSBjb21wb25lbnQgcmVuZGVyaW5nIHByb2Nlc3MgdG8gZWl0aGVyIGZldGNoIGFuIE9BdXRoIHRva2VuIGFzeW5jaHJvbm91c2x5XG4gKiBvciB1c2UgYSBwcm92aWRlZCBwZXJzb25hbCBhY2Nlc3MgdG9rZW4uIEEgZ2xvYmFsIHZhcmlhYmxlIHdpbGwgYmUgdGhlbiBzZXQgd2l0aCB0aGUgcmVjZWl2ZWQgdG9rZW5cbiAqIHRoYXQgeW91IGNhbiBnZXQgd2l0aCB0aGUgYGdldEFjY2Vzc1Rva2VuYCBmdW5jdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgRGV0YWlsIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgT0F1dGhTZXJ2aWNlLCBnZXRBY2Nlc3NUb2tlbiwgd2l0aEFjY2Vzc1Rva2VuIH0gZnJvbSBcIkByYXljYXN0L3V0aWxzXCI7XG4gKlxuICogY29uc3QgZ2l0aHViID0gT0F1dGhTZXJ2aWNlLmdpdGh1Yih7IHNjb3BlOiBcIm5vdGlmaWNhdGlvbnMgcmVwbyByZWFkOm9yZyByZWFkOnVzZXIgcmVhZDpwcm9qZWN0XCIgfSk7XG4gKlxuICogZnVuY3Rpb24gQXV0aG9yaXplZENvbXBvbmVudCgpIHtcbiAqICBjb25zdCB7IHRva2VuIH0gPSBnZXRBY2Nlc3NUb2tlbigpO1xuICogIC4uLlxuICogfVxuICpcbiAqIGV4cG9ydCBkZWZhdWx0IHdpdGhBY2Nlc3NUb2tlbihnaXRodWIpKEF1dGhvcml6ZWRDb21wb25lbnQpO1xuICogYGBgXG4gKlxuICogQHJldHVybnMge1JlYWN0LkNvbXBvbmVudFR5cGU8VD59IFRoZSB3cmFwcGVkIGNvbXBvbmVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhBY2Nlc3NUb2tlbjxUID0gYW55LCBVID0gYW55PihcbiAgb3B0aW9uczogV2l0aEFjY2Vzc1Rva2VuUGFyYW1ldGVycyxcbik6IDxWIGV4dGVuZHMgV2l0aEFjY2Vzc1Rva2VuQ29tcG9uZW50T3JGbjxULCBVPj4oXG4gIGZuT3JDb21wb25lbnQ6IFYsXG4pID0+IFYgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnRUeXBlPFQ+ID8gUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8VD4gOiAocHJvcHM6IFQpID0+IFByb21pc2U8VT47XG5leHBvcnQgZnVuY3Rpb24gd2l0aEFjY2Vzc1Rva2VuPFQ+KG9wdGlvbnM6IFdpdGhBY2Nlc3NUb2tlblBhcmFtZXRlcnMpIHtcbiAgaWYgKGVudmlyb25tZW50LmNvbW1hbmRNb2RlID09PSBcIm5vLXZpZXdcIikge1xuICAgIHJldHVybiAoZm46IChwcm9wczogVCkgPT4gUHJvbWlzZTx2b2lkPiB8ICgoKSA9PiB2b2lkKSkgPT4ge1xuICAgICAgY29uc3Qgbm9WaWV3Rm4gPSBhc3luYyAocHJvcHM6IFQpID0+IHtcbiAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgIHRva2VuID0gb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuID8/IChhd2FpdCBvcHRpb25zLmF1dGhvcml6ZSgpKTtcbiAgICAgICAgICB0eXBlID0gb3B0aW9ucy5wZXJzb25hbEFjY2Vzc1Rva2VuID8gXCJwZXJzb25hbFwiIDogXCJvYXV0aFwiO1xuICAgICAgICAgIGNvbnN0IGlkVG9rZW4gPSAoYXdhaXQgb3B0aW9ucy5jbGllbnQ/LmdldFRva2VucygpKT8uaWRUb2tlbjtcblxuICAgICAgICAgIGlmIChvcHRpb25zLm9uQXV0aG9yaXplKSB7XG4gICAgICAgICAgICBhd2FpdCBQcm9taXNlLnJlc29sdmUob3B0aW9ucy5vbkF1dGhvcml6ZSh7IHRva2VuLCB0eXBlLCBpZFRva2VuIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm4ocHJvcHMpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIG5vVmlld0ZuO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gKENvbXBvbmVudDogUmVhY3QuQ29tcG9uZW50VHlwZTxUPikgPT4ge1xuICAgIGNvbnN0IFdyYXBwZWRDb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudFR5cGU8VD4gPSAocHJvcHMpID0+IHtcbiAgICAgIGlmIChvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW4pIHtcbiAgICAgICAgdG9rZW4gPSBvcHRpb25zLnBlcnNvbmFsQWNjZXNzVG9rZW47XG4gICAgICAgIHR5cGUgPSBcInBlcnNvbmFsXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWF1dGhvcml6ZSkge1xuICAgICAgICAgIGF1dGhvcml6ZSA9IG9wdGlvbnMuYXV0aG9yaXplKCk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW4gPSBSZWFjdC51c2UoYXV0aG9yaXplKTtcbiAgICAgICAgdHlwZSA9IFwib2F1dGhcIjtcbiAgICAgIH1cblxuICAgICAgbGV0IGlkVG9rZW46IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGlmIChvcHRpb25zLmNsaWVudCkge1xuICAgICAgICBpZiAoIWdldElkVG9rZW4pIHtcbiAgICAgICAgICBnZXRJZFRva2VuID0gb3B0aW9ucy5jbGllbnQ/LmdldFRva2VucygpLnRoZW4oKHRva2VucykgPT4gdG9rZW5zPy5pZFRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBpZFRva2VuID0gUmVhY3QudXNlKGdldElkVG9rZW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5vbkF1dGhvcml6ZSkge1xuICAgICAgICBpZiAoIW9uQXV0aG9yaXplKSB7XG4gICAgICAgICAgb25BdXRob3JpemUgPSBQcm9taXNlLnJlc29sdmUob3B0aW9ucy5vbkF1dGhvcml6ZSh7IHRva2VuOiB0b2tlbiEsIHR5cGUsIGlkVG9rZW4gfSkpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWN0LnVzZShvbkF1dGhvcml6ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAgIC8vIEB0cy1pZ25vcmUgdG9vIGNvbXBsaWNhdGVkIGZvciBUU1xuICAgICAgcmV0dXJuIDxDb21wb25lbnQgey4uLnByb3BzfSAvPjtcbiAgICB9O1xuXG4gICAgV3JhcHBlZENvbXBvbmVudC5kaXNwbGF5TmFtZSA9IGB3aXRoQWNjZXNzVG9rZW4oJHtDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9uZW50Lm5hbWV9KWA7XG5cbiAgICByZXR1cm4gV3JhcHBlZENvbXBvbmVudDtcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhY2Nlc3MgdG9rZW4gYW5kIGl0cyB0eXBlLiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBtdXN0IGJlIGNhbGxlZCBpbiBhIGNvbXBvbmVudCB3cmFwcGVkIHdpdGggYHdpdGhBY2Nlc3NUb2tlbmAuXG4gKlxuICogV2lsbCB0aHJvdyBhbiBFcnJvciBpZiBjYWxsZWQgb3V0c2lkZSBvZiBhIGZ1bmN0aW9uIG9yIGNvbXBvbmVudCB3cmFwcGVkIHdpdGggYHdpdGhBY2Nlc3NUb2tlbmBcbiAqXG4gKiBAcmV0dXJucyB7eyB0b2tlbjogc3RyaW5nLCB0eXBlOiBcIm9hdXRoXCIgfCBcInBlcnNvbmFsXCIgfX0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGB0b2tlbmBcbiAqIGFuZCBpdHMgYHR5cGVgLCB3aGVyZSB0eXBlIGNhbiBiZSBlaXRoZXIgJ29hdXRoJyBmb3IgT0F1dGggdG9rZW5zIG9yICdwZXJzb25hbCcgZm9yIGFcbiAqIHBlcnNvbmFsIGFjY2VzcyB0b2tlbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjY2Vzc1Rva2VuKCk6IHtcbiAgdG9rZW46IHN0cmluZztcbiAgLyoqIGBvYXV0aGAgZm9yIE9BdXRoIHRva2VucyBvciBgcGVyc29uYWxgIGZvciBwZXJzb25hbCBhY2Nlc3MgdG9rZW4gKi9cbiAgdHlwZTogXCJvYXV0aFwiIHwgXCJwZXJzb25hbFwiO1xufSB7XG4gIGlmICghdG9rZW4gfHwgIXR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnZXRBY2Nlc3NUb2tlbiBtdXN0IGJlIHVzZWQgd2hlbiBhdXRoZW50aWNhdGVkIChlZy4gdXNlZCBpbnNpZGUgYHdpdGhBY2Nlc3NUb2tlbmApXCIpO1xuICB9XG5cbiAgcmV0dXJuIHsgdG9rZW4sIHR5cGUgfTtcbn1cbiIsICJpbXBvcnQgeyBlbnZpcm9ubWVudCwgTGF1bmNoUHJvcHMsIExhdW5jaFR5cGUgfSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcblxuZXhwb3J0IGVudW0gRGVlcGxpbmtUeXBlIHtcbiAgLyoqIEEgc2NyaXB0IGNvbW1hbmQgKi9cbiAgU2NyaXB0Q29tbWFuZCA9IFwic2NyaXB0LWNvbW1hbmRcIixcbiAgLyoqIEFuIGV4dGVuc2lvbiBjb21tYW5kICovXG4gIEV4dGVuc2lvbiA9IFwiZXh0ZW5zaW9uXCIsXG59XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBkZWVwbGluayB0byBhIHNjcmlwdCBjb21tYW5kLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmtPcHRpb25zID0ge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgZGVlcGxpbmssIHdoaWNoIHNob3VsZCBiZSBcInNjcmlwdC1jb21tYW5kXCIuXG4gICAqL1xuICB0eXBlOiBEZWVwbGlua1R5cGUuU2NyaXB0Q29tbWFuZDtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBjb21tYW5kLlxuICAgKi9cbiAgY29tbWFuZDogc3RyaW5nO1xuICAvKipcbiAgICogSWYgdGhlIGNvbW1hbmQgYWNjZXB0cyBhcmd1bWVudHMsIHRoZXkgY2FuIGJlIHBhc3NlZCB1c2luZyB0aGlzIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICovXG4gIGFyZ3VtZW50cz86IHN0cmluZ1tdO1xufTtcblxuLyoqXG4gKiBCYXNlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIGEgZGVlcGxpbmsgdG8gYW4gZXh0ZW5zaW9uLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdGVFeHRlbnNpb25EZWVwbGlua0Jhc2VPcHRpb25zID0ge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgZGVlcGxpbmssIHdoaWNoIHNob3VsZCBiZSBcImV4dGVuc2lvblwiLlxuICAgKi9cbiAgdHlwZT86IERlZXBsaW5rVHlwZS5FeHRlbnNpb247XG4gIC8qKlxuICAgKiBUaGUgY29tbWFuZCBhc3NvY2lhdGVkIHdpdGggdGhlIGV4dGVuc2lvbi5cbiAgICovXG4gIGNvbW1hbmQ6IHN0cmluZztcbiAgLyoqXG4gICAqIEVpdGhlciBcInVzZXJJbml0aWF0ZWRcIiwgd2hpY2ggcnVucyB0aGUgY29tbWFuZCBpbiB0aGUgZm9yZWdyb3VuZCwgb3IgXCJiYWNrZ3JvdW5kXCIsIHdoaWNoIHNraXBzIGJyaW5naW5nIFJheWNhc3QgdG8gdGhlIGZyb250LlxuICAgKi9cbiAgbGF1bmNoVHlwZT86IExhdW5jaFR5cGU7XG4gIC8qKlxuICAgKiBJZiB0aGUgY29tbWFuZCBhY2NlcHRzIGFyZ3VtZW50cywgdGhleSBjYW4gYmUgcGFzc2VkIHVzaW5nIHRoaXMgcXVlcnkgcGFyYW1ldGVyLlxuICAgKi9cbiAgYXJndW1lbnRzPzogTGF1bmNoUHJvcHNbXCJhcmd1bWVudHNcIl07XG4gIC8qKlxuICAgKiBJZiB0aGUgY29tbWFuZCBtYWtlIHVzZSBvZiBMYXVuY2hDb250ZXh0LCBpdCBjYW4gYmUgcGFzc2VkIHVzaW5nIHRoaXMgcXVlcnkgcGFyYW1ldGVyLlxuICAgKi9cbiAgY29udGV4dD86IExhdW5jaFByb3BzW1wibGF1bmNoQ29udGV4dFwiXTtcbiAgLyoqXG4gICAqIFNvbWUgdGV4dCB0byBwcmVmaWxsIHRoZSBzZWFyY2ggYmFyIG9yIGZpcnN0IHRleHQgaW5wdXQgb2YgdGhlIGNvbW1hbmRcbiAgICovXG4gIGZhbGxiYWNrVGV4dD86IHN0cmluZztcbn07XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBkZWVwbGluayB0byBhbiBleHRlbnNpb24gZnJvbSBhbm90aGVyIGV4dGVuc2lvbi5cbiAqIFJlcXVpcmVzIGJvdGggdGhlIG93bmVyT3JBdXRob3JOYW1lIGFuZCBleHRlbnNpb25OYW1lLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdGVJbnRlckV4dGVuc2lvbkRlZXBsaW5rT3B0aW9ucyA9IENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rQmFzZU9wdGlvbnMgJiB7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgb3duZXIgb3IgYXV0aG9yIG9mIHRoZSBleHRlbnNpb24uXG4gICAqL1xuICBvd25lck9yQXV0aG9yTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIGV4dGVuc2lvbi5cbiAgICovXG4gIGV4dGVuc2lvbk5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogT3B0aW9ucyBmb3IgY3JlYXRpbmcgYSBkZWVwbGluayB0byBhbiBleHRlbnNpb24uXG4gKi9cbmV4cG9ydCB0eXBlIENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rT3B0aW9ucyA9IENyZWF0ZUludGVyRXh0ZW5zaW9uRGVlcGxpbmtPcHRpb25zIHwgQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtCYXNlT3B0aW9ucztcblxuLyoqXG4gKiBPcHRpb25zIGZvciBjcmVhdGluZyBhIGRlZXBsaW5rLlxuICovXG5leHBvcnQgdHlwZSBDcmVhdGVEZWVwbGlua09wdGlvbnMgPSBDcmVhdGVTY3JpcHRDb21tYW5kRGVlcGxpbmtPcHRpb25zIHwgQ3JlYXRlRXh0ZW5zaW9uRGVlcGxpbmtPcHRpb25zO1xuXG5mdW5jdGlvbiBnZXRQcm90b2NvbCgpIHtcbiAgcmV0dXJuIGVudmlyb25tZW50LnJheWNhc3RWZXJzaW9uLmluY2x1ZGVzKFwiYWxwaGFcIikgPyBcInJheWNhc3RpbnRlcm5hbDovL1wiIDogXCJyYXljYXN0Oi8vXCI7XG59XG5cbmZ1bmN0aW9uIGdldE93bmVyT3JBdXRob3JOYW1lKCkge1xuICBjb25zdCBwYWNrYWdlSlNPTiA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihlbnZpcm9ubWVudC5hc3NldHNQYXRoLCBcIi4uXCIsIFwicGFja2FnZS5qc29uXCIpLCBcInV0ZjhcIikpO1xuICByZXR1cm4gcGFja2FnZUpTT04ub3duZXIgfHwgcGFja2FnZUpTT04uYXV0aG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rKG9wdGlvbnM6IENyZWF0ZVNjcmlwdENvbW1hbmREZWVwbGlua09wdGlvbnMpOiBzdHJpbmcge1xuICBsZXQgdXJsID0gYCR7Z2V0UHJvdG9jb2woKX1zY3JpcHQtY29tbWFuZHMvJHtvcHRpb25zLmNvbW1hbmR9YDtcblxuICBpZiAob3B0aW9ucy5hcmd1bWVudHMpIHtcbiAgICBsZXQgcGFyYW1zID0gXCJcIjtcbiAgICBmb3IgKGNvbnN0IGFyZyBvZiBvcHRpb25zLmFyZ3VtZW50cykge1xuICAgICAgcGFyYW1zICs9IFwiJmFyZ3VtZW50cz1cIiArIGVuY29kZVVSSUNvbXBvbmVudChhcmcpO1xuICAgIH1cbiAgICB1cmwgKz0gXCI/XCIgKyBwYXJhbXMuc3Vic3RyaW5nKDEpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rKG9wdGlvbnM6IENyZWF0ZUV4dGVuc2lvbkRlZXBsaW5rT3B0aW9ucyk6IHN0cmluZyB7XG4gIGxldCBvd25lck9yQXV0aG9yTmFtZSA9IGdldE93bmVyT3JBdXRob3JOYW1lKCk7XG4gIGxldCBleHRlbnNpb25OYW1lID0gZW52aXJvbm1lbnQuZXh0ZW5zaW9uTmFtZTtcblxuICBpZiAoXCJvd25lck9yQXV0aG9yTmFtZVwiIGluIG9wdGlvbnMgJiYgXCJleHRlbnNpb25OYW1lXCIgaW4gb3B0aW9ucykge1xuICAgIG93bmVyT3JBdXRob3JOYW1lID0gb3B0aW9ucy5vd25lck9yQXV0aG9yTmFtZTtcbiAgICBleHRlbnNpb25OYW1lID0gb3B0aW9ucy5leHRlbnNpb25OYW1lO1xuICB9XG5cbiAgbGV0IHVybCA9IGAke2dldFByb3RvY29sKCl9ZXh0ZW5zaW9ucy8ke293bmVyT3JBdXRob3JOYW1lfS8ke2V4dGVuc2lvbk5hbWV9LyR7b3B0aW9ucy5jb21tYW5kfWA7XG5cbiAgbGV0IHBhcmFtcyA9IFwiXCI7XG4gIGlmIChvcHRpb25zLmxhdW5jaFR5cGUpIHtcbiAgICBwYXJhbXMgKz0gXCImbGF1bmNoVHlwZT1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmxhdW5jaFR5cGUpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuYXJndW1lbnRzKSB7XG4gICAgcGFyYW1zICs9IFwiJmFyZ3VtZW50cz1cIiArIGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShvcHRpb25zLmFyZ3VtZW50cykpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuY29udGV4dCkge1xuICAgIHBhcmFtcyArPSBcIiZjb250ZXh0PVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuY29udGV4dCkpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuZmFsbGJhY2tUZXh0KSB7XG4gICAgcGFyYW1zICs9IFwiJmZhbGxiYWNrVGV4dD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChvcHRpb25zLmZhbGxiYWNrVGV4dCk7XG4gIH1cblxuICBpZiAocGFyYW1zKSB7XG4gICAgdXJsICs9IFwiP1wiICsgcGFyYW1zLnN1YnN0cmluZygxKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlZXBsaW5rIHRvIGEgc2NyaXB0IGNvbW1hbmQgb3IgZXh0ZW5zaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGVlcGxpbmsob3B0aW9uczogQ3JlYXRlRGVlcGxpbmtPcHRpb25zKTogc3RyaW5nIHtcbiAgaWYgKG9wdGlvbnMudHlwZSA9PT0gRGVlcGxpbmtUeXBlLlNjcmlwdENvbW1hbmQpIHtcbiAgICByZXR1cm4gY3JlYXRlU2NyaXB0Q29tbWFuZERlZXBsaW5rKG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVFeHRlbnNpb25EZWVwbGluayhvcHRpb25zKTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGJhc2VFeGVjdXRlU1FMIH0gZnJvbSBcIi4vc3FsLXV0aWxzXCI7XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBTUUwgcXVlcnkgb24gYSBsb2NhbCBTUUxpdGUgZGF0YWJhc2UgYW5kIHJldHVybnMgdGhlIHF1ZXJ5IHJlc3VsdCBpbiBKU09OIGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0gZGF0YWJhc2VQYXRoIC0gVGhlIHBhdGggdG8gdGhlIFNRTGl0ZSBkYXRhYmFzZSBmaWxlLlxuICogQHBhcmFtIHF1ZXJ5IC0gVGhlIFNRTCBxdWVyeSB0byBleGVjdXRlLlxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIHF1ZXJ5IHJlc3VsdHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IGNsb3NlTWFpbldpbmRvdywgQ2xpcGJvYXJkIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgZXhlY3V0ZVNRTCB9IGZyb20gXCJAcmF5Y2FzdC91dGlsc1wiO1xuICpcbiAqIHR5cGUgTWVzc2FnZSA9IHsgYm9keTogc3RyaW5nOyBjb2RlOiBzdHJpbmcgfTtcbiAqXG4gKiBjb25zdCBEQl9QQVRIID0gXCIvcGF0aC90by9jaGF0LmRiXCI7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAqICAgY29uc3QgcXVlcnkgPSBgU0VMRUNUIGJvZHksIGNvZGUgRlJPTSAuLi5gXG4gKlxuICogICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGV4ZWN1dGVTUUw8TWVzc2FnZT4oREJfUEFUSCwgcXVlcnkpO1xuICpcbiAqICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAqICAgICBjb25zdCBsYXRlc3RDb2RlID0gbWVzc2FnZXNbMF0uY29kZTtcbiAqICAgICBhd2FpdCBDbGlwYm9hcmQucGFzdGUobGF0ZXN0Q29kZSk7XG4gKiAgICAgYXdhaXQgY2xvc2VNYWluV2luZG93KCk7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVNRTDxUID0gdW5rbm93bj4oZGF0YWJhc2VQYXRoOiBzdHJpbmcsIHF1ZXJ5OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGJhc2VFeGVjdXRlU1FMPFQ+KGRhdGFiYXNlUGF0aCwgcXVlcnkpO1xufVxuIiwgImltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHtcbiAgZGVmYXVsdFBhcnNpbmcsXG4gIGdldFNwYXduZWRQcm9taXNlLFxuICBnZXRTcGF3bmVkUmVzdWx0LFxuICBoYW5kbGVPdXRwdXQsXG4gIFBhcnNlRXhlY091dHB1dEhhbmRsZXIsXG59IGZyb20gXCIuL2V4ZWMtdXRpbHNcIjtcblxudHlwZSBBcHBsZVNjcmlwdE9wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBCeSBkZWZhdWx0LCBgcnVuQXBwbGVTY3JpcHRgIHJldHVybnMgaXRzIHJlc3VsdHMgaW4gaHVtYW4tcmVhZGFibGUgZm9ybTogc3RyaW5ncyBkbyBub3QgaGF2ZSBxdW90ZXMgYXJvdW5kIHRoZW0sIGNoYXJhY3RlcnMgYXJlIG5vdCBlc2NhcGVkLCBicmFjZXMgZm9yIGxpc3RzIGFuZCByZWNvcmRzIGFyZSBvbWl0dGVkLCBldGMuIFRoaXMgaXMgZ2VuZXJhbGx5IG1vcmUgdXNlZnVsLCBidXQgY2FuIGludHJvZHVjZSBhbWJpZ3VpdGllcy4gRm9yIGV4YW1wbGUsIHRoZSBsaXN0cyBge1wiZm9vXCIsIFwiYmFyXCJ9YCBhbmQgYHt7XCJmb29cIiwge1wiYmFyXCJ9fX1gIHdvdWxkIGJvdGggYmUgZGlzcGxheWVkIGFzIOKAmGZvbywgYmFy4oCZLiBUbyBzZWUgdGhlIHJlc3VsdHMgaW4gYW4gdW5hbWJpZ3VvdXMgZm9ybSB0aGF0IGNvdWxkIGJlIHJlY29tcGlsZWQgaW50byB0aGUgc2FtZSB2YWx1ZSwgc2V0IGBodW1hblJlYWRhYmxlT3V0cHV0YCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiBAZGVmYXVsdCB0cnVlXG4gICAqL1xuICBodW1hblJlYWRhYmxlT3V0cHV0PzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIHNjcmlwdCBpcyB1c2luZyBbYEFwcGxlU2NyaXB0YF0oaHR0cHM6Ly9kZXZlbG9wZXIuYXBwbGUuY29tL2xpYnJhcnkvYXJjaGl2ZS9kb2N1bWVudGF0aW9uL0FwcGxlU2NyaXB0L0NvbmNlcHR1YWwvQXBwbGVTY3JpcHRMYW5nR3VpZGUvaW50cm9kdWN0aW9uL0FTTFJfaW50cm8uaHRtbCMvL2FwcGxlX3JlZi9kb2MvdWlkL1RQNDAwMDA5ODMpIG9yIFtgSmF2YVNjcmlwdGBdKGh0dHBzOi8vZGV2ZWxvcGVyLmFwcGxlLmNvbS9saWJyYXJ5L2FyY2hpdmUvcmVsZWFzZW5vdGVzL0ludGVyYXBwbGljYXRpb25Db21tdW5pY2F0aW9uL1JOLUphdmFTY3JpcHRGb3JBdXRvbWF0aW9uL0FydGljbGVzL0ludHJvZHVjdGlvbi5odG1sIy8vYXBwbGVfcmVmL2RvYy91aWQvVFA0MDAxNDUwOC1DSDExMS1TVzEpLlxuICAgKlxuICAgKiBAZGVmYXVsdCBcIkFwcGxlU2NyaXB0XCJcbiAgICovXG4gIGxhbmd1YWdlPzogXCJBcHBsZVNjcmlwdFwiIHwgXCJKYXZhU2NyaXB0XCI7XG4gIC8qKlxuICAgKiBBIFNpZ25hbCBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGFib3J0IHRoZSByZXF1ZXN0IGlmIHJlcXVpcmVkIHZpYSBhbiBBYm9ydENvbnRyb2xsZXIgb2JqZWN0LlxuICAgKi9cbiAgc2lnbmFsPzogQWJvcnRTaWduYWw7XG4gIC8qKiBJZiB0aW1lb3V0IGlzIGdyZWF0ZXIgdGhhbiBgMGAsIHRoZSBwYXJlbnQgd2lsbCBzZW5kIHRoZSBzaWduYWwgYFNJR1RFUk1gIGlmIHRoZSBjaGlsZCBydW5zIGxvbmdlciB0aGFuIHRpbWVvdXQgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAZGVmYXVsdCAxMDAwMFxuICAgKi9cbiAgdGltZW91dD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgYW4gQXBwbGVTY3JpcHQgc2NyaXB0LlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBzaG93SFVEIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuICogaW1wb3J0IHsgcnVuQXBwbGVTY3JpcHQsIHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gKiAgIHRyeSB7XG4gKiAgICAgY29uc3QgcmVzID0gYXdhaXQgcnVuQXBwbGVTY3JpcHQoXG4gKiAgICAgICBgXG4gKiAgICAgICBvbiBydW4gYXJndlxuICogICAgICAgICByZXR1cm4gXCJoZWxsbywgXCIgJiBpdGVtIDEgb2YgYXJndiAmIFwiLlwiXG4gKiAgICAgICBlbmQgcnVuXG4gKiAgICAgICBgLFxuICogICAgICAgW1wid29ybGRcIl1cbiAqICAgICApO1xuICogICAgIGF3YWl0IHNob3dIVUQocmVzKTtcbiAqICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAqICAgICBzaG93RmFpbHVyZVRvYXN0KGVycm9yLCB7IHRpdGxlOiBcIkNvdWxkIG5vdCBydW4gQXBwbGVTY3JpcHRcIiB9KTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5BcHBsZVNjcmlwdDxUID0gc3RyaW5nPihcbiAgc2NyaXB0OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcHBsZVNjcmlwdE9wdGlvbnMgJiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgQXBwbGVTY3JpcHRPcHRpb25zPjtcbiAgfSxcbik6IFByb21pc2U8c3RyaW5nPjtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5BcHBsZVNjcmlwdDxUID0gc3RyaW5nPihcbiAgc2NyaXB0OiBzdHJpbmcsXG4gIC8qKlxuICAgKiBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIHNjcmlwdC5cbiAgICovXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICBvcHRpb25zPzogQXBwbGVTY3JpcHRPcHRpb25zICYge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIEFwcGxlU2NyaXB0T3B0aW9ucz47XG4gIH0sXG4pOiBQcm9taXNlPHN0cmluZz47XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcnVuQXBwbGVTY3JpcHQ8VCA9IHN0cmluZz4oXG4gIHNjcmlwdDogc3RyaW5nLFxuICBvcHRpb25zT3JBcmdzPzpcbiAgICB8IHN0cmluZ1tdXG4gICAgfCAoQXBwbGVTY3JpcHRPcHRpb25zICYge1xuICAgICAgICBwYXJzZU91dHB1dD86IFBhcnNlRXhlY091dHB1dEhhbmRsZXI8VCwgc3RyaW5nLCBBcHBsZVNjcmlwdE9wdGlvbnM+O1xuICAgICAgfSksXG4gIG9wdGlvbnM/OiBBcHBsZVNjcmlwdE9wdGlvbnMgJiB7XG4gICAgcGFyc2VPdXRwdXQ/OiBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyPFQsIHN0cmluZywgQXBwbGVTY3JpcHRPcHRpb25zPjtcbiAgfSxcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcImRhcndpblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQXBwbGVTY3JpcHQgaXMgb25seSBzdXBwb3J0ZWQgb24gbWFjT1NcIik7XG4gIH1cblxuICBjb25zdCB7IGh1bWFuUmVhZGFibGVPdXRwdXQsIGxhbmd1YWdlLCB0aW1lb3V0LCAuLi5leGVjT3B0aW9ucyB9ID0gQXJyYXkuaXNBcnJheShvcHRpb25zT3JBcmdzKVxuICAgID8gb3B0aW9ucyB8fCB7fVxuICAgIDogb3B0aW9uc09yQXJncyB8fCB7fTtcblxuICBjb25zdCBvdXRwdXRBcmd1bWVudHMgPSBodW1hblJlYWRhYmxlT3V0cHV0ICE9PSBmYWxzZSA/IFtdIDogW1wiLXNzXCJdO1xuICBpZiAobGFuZ3VhZ2UgPT09IFwiSmF2YVNjcmlwdFwiKSB7XG4gICAgb3V0cHV0QXJndW1lbnRzLnB1c2goXCItbFwiLCBcIkphdmFTY3JpcHRcIik7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uc09yQXJncykpIHtcbiAgICBvdXRwdXRBcmd1bWVudHMucHVzaChcIi1cIiwgLi4ub3B0aW9uc09yQXJncyk7XG4gIH1cblxuICBjb25zdCBzcGF3bmVkID0gY2hpbGRQcm9jZXNzLnNwYXduKFwib3Nhc2NyaXB0XCIsIG91dHB1dEFyZ3VtZW50cywge1xuICAgIC4uLmV4ZWNPcHRpb25zLFxuICAgIGVudjogeyBQQVRIOiBcIi91c3IvbG9jYWwvYmluOi91c3IvYmluOi9iaW46L3Vzci9zYmluOi9zYmluXCIgfSxcbiAgfSk7XG4gIGNvbnN0IHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCwgeyB0aW1lb3V0OiB0aW1lb3V0ID8/IDEwMDAwIH0pO1xuXG4gIHNwYXduZWQuc3RkaW4uZW5kKHNjcmlwdCk7XG5cbiAgY29uc3QgW3sgZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwsIHRpbWVkT3V0IH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQ8c3RyaW5nPihcbiAgICBzcGF3bmVkLFxuICAgIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0sXG4gICAgc3Bhd25lZFByb21pc2UsXG4gICk7XG4gIGNvbnN0IHN0ZG91dCA9IGhhbmRsZU91dHB1dCh7IHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlIH0sIHN0ZG91dFJlc3VsdCk7XG4gIGNvbnN0IHN0ZGVyciA9IGhhbmRsZU91dHB1dCh7IHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlIH0sIHN0ZGVyclJlc3VsdCk7XG5cbiAgcmV0dXJuIGRlZmF1bHRQYXJzaW5nKHtcbiAgICBzdGRvdXQsXG4gICAgc3RkZXJyLFxuICAgIGVycm9yLFxuICAgIGV4aXRDb2RlLFxuICAgIHNpZ25hbCxcbiAgICB0aW1lZE91dCxcbiAgICBjb21tYW5kOiBcIm9zYXNjcmlwdFwiLFxuICAgIG9wdGlvbnMsXG4gICAgcGFyZW50RXJyb3I6IG5ldyBFcnJvcigpLFxuICB9KTtcbn1cbiIsICJpbXBvcnQgY2hpbGRQcm9jZXNzIGZyb20gXCJub2RlOmNoaWxkX3Byb2Nlc3NcIjtcbmltcG9ydCB7XG4gIGRlZmF1bHRQYXJzaW5nLFxuICBnZXRTcGF3bmVkUHJvbWlzZSxcbiAgZ2V0U3Bhd25lZFJlc3VsdCxcbiAgaGFuZGxlT3V0cHV0LFxuICBQYXJzZUV4ZWNPdXRwdXRIYW5kbGVyLFxufSBmcm9tIFwiLi9leGVjLXV0aWxzXCI7XG5cbnR5cGUgUG93ZXJTaGVsbFNjcmlwdE9wdGlvbnMgPSB7XG4gIC8qKlxuICAgKiBBIFNpZ25hbCBvYmplY3QgdGhhdCBhbGxvd3MgeW91IHRvIGFib3J0IHRoZSByZXF1ZXN0IGlmIHJlcXVpcmVkIHZpYSBhbiBBYm9ydENvbnRyb2xsZXIgb2JqZWN0LlxuICAgKi9cbiAgc2lnbmFsPzogQWJvcnRTaWduYWw7XG4gIC8qKiBJZiB0aW1lb3V0IGlzIGdyZWF0ZXIgdGhhbiBgMGAsIHRoZSBwYXJlbnQgd2lsbCBzZW5kIHRoZSBzaWduYWwgYFNJR1RFUk1gIGlmIHRoZSBjaGlsZCBydW5zIGxvbmdlciB0aGFuIHRpbWVvdXQgbWlsbGlzZWNvbmRzLlxuICAgKlxuICAgKiBAZGVmYXVsdCAxMDAwMFxuICAgKi9cbiAgdGltZW91dD86IG51bWJlcjtcbn07XG5cbi8qKlxuICogRXhlY3V0ZXMgYSBQb3dlclNoZWxsIHNjcmlwdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgc2hvd0hVRCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbiAqIGltcG9ydCB7IHJ1blBvd2VyU2hlbGxTY3JpcHQsIHNob3dGYWlsdXJlVG9hc3QgfSBmcm9tIFwiQHJheWNhc3QvdXRpbHNcIjtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gKiAgIHRyeSB7XG4gKiAgICAgY29uc3QgcmVzID0gYXdhaXQgcnVuUG93ZXJTaGVsbFNjcmlwdChcbiAqICAgICAgIGBcbiAqICAgICAgIFdyaXRlLUhvc3QgXCJoZWxsbywgd29ybGQuXCJcbiAqICAgICAgIGAsXG4gKiAgICAgKTtcbiAqICAgICBhd2FpdCBzaG93SFVEKHJlcyk7XG4gKiAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgICAgc2hvd0ZhaWx1cmVUb2FzdChlcnJvciwgeyB0aXRsZTogXCJDb3VsZCBub3QgcnVuIFBvd2VyU2hlbGxcIiB9KTtcbiAqICAgfVxuICogfVxuICogYGBgXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5Qb3dlclNoZWxsU2NyaXB0PFQgPSBzdHJpbmc+KFxuICBzY3JpcHQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IFBvd2VyU2hlbGxTY3JpcHRPcHRpb25zICYge1xuICAgIHBhcnNlT3V0cHV0PzogUGFyc2VFeGVjT3V0cHV0SGFuZGxlcjxULCBzdHJpbmcsIFBvd2VyU2hlbGxTY3JpcHRPcHRpb25zPjtcbiAgfSxcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSBcIndpbjMyXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3dlclNoZWxsIGlzIG9ubHkgc3VwcG9ydGVkIG9uIFdpbmRvd3NcIik7XG4gIH1cblxuICBjb25zdCB7IHRpbWVvdXQsIC4uLmV4ZWNPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IG91dHB1dEFyZ3VtZW50cyA9IFtcIi1Ob0xvZ29cIiwgXCItTm9Qcm9maWxlXCIsIFwiLU5vbkludGVyYWN0aXZlXCIsIFwiLUNvbW1hbmRcIiwgXCItXCJdO1xuXG4gIGNvbnN0IHNwYXduZWQgPSBjaGlsZFByb2Nlc3Muc3Bhd24oXCJwb3dlcnNoZWxsLmV4ZVwiLCBvdXRwdXRBcmd1bWVudHMsIHtcbiAgICAuLi5leGVjT3B0aW9ucyxcbiAgfSk7XG4gIGNvbnN0IHNwYXduZWRQcm9taXNlID0gZ2V0U3Bhd25lZFByb21pc2Uoc3Bhd25lZCwgeyB0aW1lb3V0OiB0aW1lb3V0ID8/IDEwMDAwIH0pO1xuXG4gIHNwYXduZWQuc3RkaW4uZW5kKHNjcmlwdCk7XG5cbiAgY29uc3QgW3sgZXJyb3IsIGV4aXRDb2RlLCBzaWduYWwsIHRpbWVkT3V0IH0sIHN0ZG91dFJlc3VsdCwgc3RkZXJyUmVzdWx0XSA9IGF3YWl0IGdldFNwYXduZWRSZXN1bHQ8c3RyaW5nPihcbiAgICBzcGF3bmVkLFxuICAgIHsgZW5jb2Rpbmc6IFwidXRmOFwiIH0sXG4gICAgc3Bhd25lZFByb21pc2UsXG4gICk7XG4gIGNvbnN0IHN0ZG91dCA9IGhhbmRsZU91dHB1dCh7IHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlIH0sIHN0ZG91dFJlc3VsdCk7XG4gIGNvbnN0IHN0ZGVyciA9IGhhbmRsZU91dHB1dCh7IHN0cmlwRmluYWxOZXdsaW5lOiB0cnVlIH0sIHN0ZGVyclJlc3VsdCk7XG5cbiAgcmV0dXJuIGRlZmF1bHRQYXJzaW5nKHtcbiAgICBzdGRvdXQsXG4gICAgc3RkZXJyLFxuICAgIGVycm9yLFxuICAgIGV4aXRDb2RlLFxuICAgIHNpZ25hbCxcbiAgICB0aW1lZE91dCxcbiAgICBjb21tYW5kOiBcInBvd2Vyc2hlbGwuZXhlXCIsXG4gICAgb3B0aW9ucyxcbiAgICBwYXJlbnRFcnJvcjogbmV3IEVycm9yKCksXG4gIH0pO1xufVxuIiwgImltcG9ydCB7IENhY2hlIH0gZnJvbSBcIkByYXljYXN0L2FwaVwiO1xuaW1wb3J0IHsgaGFzaCwgcmVwbGFjZXIsIHJldml2ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbi8qKlxuICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGNhY2hpbmcgZnVuY3Rpb25hbGl0eSB1c2luZyBSYXljYXN0J3MgQ2FjaGUgQVBJLlxuICogQWxsb3dzIGZvciBjYWNoaW5nIG9mIGV4cGVuc2l2ZSBmdW5jdGlvbnMgbGlrZSBwYWdpbmF0ZWQgQVBJIGNhbGxzIHRoYXQgcmFyZWx5IGNoYW5nZS5cbiAqXG4gKiBAcGFyYW0gZm4gLSBUaGUgYXN5bmMgZnVuY3Rpb24gdG8gY2FjaGUgcmVzdWx0cyBmcm9tXG4gKiBAcGFyYW0gb3B0aW9ucyAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBjYWNoZSBiZWhhdmlvclxuICogQHBhcmFtIG9wdGlvbnMudmFsaWRhdGUgLSBPcHRpb25hbCB2YWxpZGF0aW9uIGZ1bmN0aW9uIGZvciBjYWNoZWQgZGF0YVxuICogQHBhcmFtIG9wdGlvbnMubWF4QWdlIC0gTWF4aW11bSBhZ2Ugb2YgY2FjaGVkIGRhdGEgaW4gbWlsbGlzZWNvbmRzXG4gKiBAcmV0dXJucyBBbiBhc3luYyBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHJlc3VsdCBvZiB0aGUgZnVuY3Rpb24sIGVpdGhlciBmcm9tIGNhY2hlIG9yIGZyZXNoIGV4ZWN1dGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogY29uc3QgY2FjaGVkRnVuY3Rpb24gPSB3aXRoQ2FjaGUoZmV0Y2hFeHBlbnNpdmVEYXRhLCB7XG4gKiAgIG1heEFnZTogNSAqIDYwICogMTAwMCAvLyBDYWNoZSBmb3IgNSBtaW51dGVzXG4gKiB9KTtcbiAqXG4gKiBjb25zdCByZXN1bHQgPSBhd2FpdCBjYWNoZWRGdW5jdGlvbihxdWVyeSk7XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHdpdGhDYWNoZTxGbiBleHRlbmRzICguLi5hcmdzOiBhbnkpID0+IFByb21pc2U8YW55Pj4oXG4gIGZuOiBGbixcbiAgb3B0aW9ucz86IHtcbiAgICAvKiogZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgY2FjaGVkIGRhdGEgYW5kIHJldHVybnMgYSBib29sZWFuIGRlcGVuZGluZyBvbiB3aGV0aGVyIHRoZSBkYXRhIGlzIHN0aWxsIHZhbGlkIG9yIG5vdC4gKi9cbiAgICB2YWxpZGF0ZT86IChkYXRhOiBBd2FpdGVkPFJldHVyblR5cGU8Rm4+PikgPT4gYm9vbGVhbjtcbiAgICAvKiogTWF4aW11bSBhZ2Ugb2YgY2FjaGVkIGRhdGEgaW4gbWlsbGlzZWNvbmRzIGFmdGVyIHdoaWNoIHRoZSBkYXRhIHdpbGwgYmUgY29uc2lkZXJlZCBpbnZhbGlkICovXG4gICAgbWF4QWdlPzogbnVtYmVyO1xuICB9LFxuKTogRm4gJiB7IGNsZWFyQ2FjaGU6ICgpID0+IHZvaWQgfSB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IENhY2hlKHsgbmFtZXNwYWNlOiBoYXNoKGZuKSB9KTtcblxuICBjb25zdCB3cmFwcGVkRm4gPSBhc3luYyAoLi4uYXJnczogUGFyYW1ldGVyczxGbj4pID0+IHtcbiAgICBjb25zdCBrZXkgPVxuICAgICAgaGFzaChhcmdzIHx8IFtdKSArIChvcHRpb25zIGFzIHVua25vd24gYXMgeyBpbnRlcm5hbF9jYWNoZUtleVN1ZmZpeD86IHN0cmluZyB9KT8uaW50ZXJuYWxfY2FjaGVLZXlTdWZmaXg7XG4gICAgY29uc3QgY2FjaGVkID0gY2FjaGUuZ2V0KGtleSk7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgY29uc3QgeyBkYXRhLCB0aW1lc3RhbXAgfSA9IEpTT04ucGFyc2UoY2FjaGVkLCByZXZpdmVyKTtcbiAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IG9wdGlvbnM/Lm1heEFnZSAmJiBEYXRlLm5vdygpIC0gdGltZXN0YW1wID4gb3B0aW9ucy5tYXhBZ2U7XG4gICAgICBpZiAoIWlzRXhwaXJlZCAmJiAoIW9wdGlvbnM/LnZhbGlkYXRlIHx8IG9wdGlvbnMudmFsaWRhdGUoZGF0YSkpKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZm4oLi4uYXJncyk7XG4gICAgY2FjaGUuc2V0KFxuICAgICAga2V5LFxuICAgICAgSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIHtcbiAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICB9LFxuICAgICAgICByZXBsYWNlcixcbiAgICAgICksXG4gICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHdyYXBwZWRGbi5jbGVhckNhY2hlID0gKCkgPT4ge1xuICAgIGNhY2hlLmNsZWFyKCk7XG4gIH07XG5cbiAgLy8gQHRzLWV4cGVjdC1lcnJvciB0b28gY29tcGxleCBmb3IgVFNcbiAgcmV0dXJuIHdyYXBwZWRGbjtcbn1cbiIsICJpbXBvcnQgeyByZWFkRmlsZVN5bmMsIGV4aXN0c1N5bmMsIHJlYWRkaXJTeW5jLCBzdGF0U3luYyB9IGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBob21lZGlyIH0gZnJvbSBcIm9zXCI7XG5pbXBvcnQgKiBhcyB5YW1sIGZyb20gXCJqcy15YW1sXCI7XG5pbXBvcnQgdHlwZSB7IEJ1Zm9Qcm9qZWN0LCBHbG9iYWxDb25maWcsIFRhZHBvbGVNZXRhLCBUYWRwb2xlU3RhdGUsIEJ1Zm9TZXNzaW9uLCBTZXNzaW9uTGF5b3V0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgQlVGT19ESVIgPSBqb2luKGhvbWVkaXIoKSwgXCIuYnVmb1wiKTtcbmNvbnN0IFBST0pFQ1RTX0RJUiA9IGpvaW4oQlVGT19ESVIsIFwicHJvamVjdHNcIik7XG5jb25zdCBTVEFURV9ESVIgPSBqb2luKEJVRk9fRElSLCBcInN0YXRlXCIpO1xuY29uc3QgU0VTU0lPTlNfRElSID0gam9pbihCVUZPX0RJUiwgXCJzZXNzaW9uc1wiKTtcbmNvbnN0IEdMT0JBTF9DT05GSUcgPSBqb2luKEJVRk9fRElSLCBcImNvbmZpZy55YW1sXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnVmb0RpcigpOiBzdHJpbmcge1xuICByZXR1cm4gQlVGT19ESVI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWZvRXhpc3RzKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZXhpc3RzU3luYyhCVUZPX0RJUik7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZFBhdGgocDogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHAuc3RhcnRzV2l0aChcIn4vXCIpIHx8IHAgPT09IFwiflwiKSB7XG4gICAgcmV0dXJuIGpvaW4oaG9tZWRpcigpLCBwLnNsaWNlKDIpKTtcbiAgfVxuICByZXR1cm4gcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRHbG9iYWxDb25maWcoKTogR2xvYmFsQ29uZmlnIHtcbiAgaWYgKCFleGlzdHNTeW5jKEdMT0JBTF9DT05GSUcpKSByZXR1cm4ge307XG4gIHRyeSB7XG4gICAgY29uc3QgcmF3ID0gcmVhZEZpbGVTeW5jKEdMT0JBTF9DT05GSUcsIFwidXRmLThcIik7XG4gICAgcmV0dXJuICh5YW1sLmxvYWQocmF3KSBhcyBHbG9iYWxDb25maWcpIHx8IHt9O1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRQcm9qZWN0KGFsaWFzOiBzdHJpbmcsIGZpbGVQYXRoOiBzdHJpbmcpOiBCdWZvUHJvamVjdCB7XG4gIGNvbnN0IHJhdyA9IHJlYWRGaWxlU3luYyhmaWxlUGF0aCwgXCJ1dGYtOFwiKTtcbiAgY29uc3QgZG9jID0geWFtbC5sb2FkKHJhdykgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbiAgLy8gU3VwcG9ydCBib3RoIG5ldyB0YWRwb2xlczogYW5kIGxlZ2FjeSB3b3Jrc3BhY2VzOiBrZXlzXG4gIGNvbnN0IHRhZHBvbGVzID0gKGRvYy50YWRwb2xlcyBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgfHxcbiAgICAoZG9jLndvcmtzcGFjZXMgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHx8IHt9O1xuICBjb25zdCBwb3J0cyA9IChkb2MucG9ydHMgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIHx8IHt9O1xuXG4gIHJldHVybiB7XG4gICAgYWxpYXMsXG4gICAgc2Vzc2lvbl9uYW1lOiAoZG9jLnNlc3Npb25fbmFtZSBhcyBzdHJpbmcpIHx8IGFsaWFzLFxuICAgIHRhZHBvbGVfYmFzZTogZXhwYW5kUGF0aChcbiAgICAgIChkb2MudGFkcG9sZV9iYXNlIGFzIHN0cmluZykgfHwgKGRvYy53b3Jrc3BhY2VfYmFzZSBhcyBzdHJpbmcpIHx8IFwiXCJcbiAgICApLFxuICAgIG1haW5fcmVwbzogZXhwYW5kUGF0aCgoZG9jLm1haW5fcmVwbyBhcyBzdHJpbmcpIHx8IFwiXCIpLFxuICAgIHRhZHBvbGVzOiB7XG4gICAgICBjb3VudDogKHRhZHBvbGVzLmNvdW50IGFzIG51bWJlcikgfHwgNSxcbiAgICAgIHByZWZpeDogKHRhZHBvbGVzLnByZWZpeCBhcyBzdHJpbmcpIHx8IFwidGFkcG9sZVwiLFxuICAgICAgYnJhbmNoX3BhdHRlcm46ICh0YWRwb2xlcy5icmFuY2hfcGF0dGVybiBhcyBzdHJpbmcpIHx8IFwidGFkcG9sZS17Tn1cIixcbiAgICB9LFxuICAgIHBvcnRzOiBwb3J0c1xuICAgICAgPyB7XG4gICAgICAgICAgYXBpX2Jhc2U6IHBvcnRzLmFwaV9iYXNlIGFzIG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICAgICAgICBhcHBfYmFzZTogcG9ydHMuYXBwX2Jhc2UgYXMgbnVtYmVyIHwgdW5kZWZpbmVkLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBsYXlvdXQ6IGRvYy5sYXlvdXQgYXMgQnVmb1Byb2plY3RbXCJsYXlvdXRcIl0sXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNjb3ZlclByb2plY3RzKCk6IEJ1Zm9Qcm9qZWN0W10ge1xuICBpZiAoIWV4aXN0c1N5bmMoUFJPSkVDVFNfRElSKSkgcmV0dXJuIFtdO1xuICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKFBST0pFQ1RTX0RJUikuZmlsdGVyKChmKSA9PiBmLmVuZHNXaXRoKFwiLnlhbWxcIikgfHwgZi5lbmRzV2l0aChcIi55bWxcIikpO1xuICBjb25zdCBwcm9qZWN0czogQnVmb1Byb2plY3RbXSA9IFtdO1xuICBmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcbiAgICBjb25zdCBhbGlhcyA9IGZpbGUucmVwbGFjZSgvXFwueWE/bWwkLywgXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIHByb2plY3RzLnB1c2gobG9hZFByb2plY3QoYWxpYXMsIGpvaW4oUFJPSkVDVFNfRElSLCBmaWxlKSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gc2tpcCBpbnZhbGlkIGNvbmZpZ3NcbiAgICB9XG4gIH1cbiAgY29uc3QgZGVmYXVsdEFsaWFzID0gbG9hZEdsb2JhbENvbmZpZygpLmRlZmF1bHRfcHJvamVjdDtcbiAgaWYgKGRlZmF1bHRBbGlhcykge1xuICAgIHByb2plY3RzLnNvcnQoKGEsIGIpID0+IChhLmFsaWFzID09PSBkZWZhdWx0QWxpYXMgPyAtMSA6IGIuYWxpYXMgPT09IGRlZmF1bHRBbGlhcyA/IDEgOiAwKSk7XG4gIH1cbiAgcmV0dXJuIHByb2plY3RzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFRhZHBvbGVTdGF0ZShzZXNzaW9uTmFtZTogc3RyaW5nLCBudW06IG51bWJlcik6IFRhZHBvbGVTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gIC8vIFByZWZlciB0cDxOPi5qc29uLCBmYWxsIGJhY2sgdG8gbGVnYWN5IHdzPE4+Lmpzb25cbiAgbGV0IHN0YXRlRmlsZSA9IGpvaW4oU1RBVEVfRElSLCBzZXNzaW9uTmFtZSwgYHRwJHtudW19Lmpzb25gKTtcbiAgaWYgKCFleGlzdHNTeW5jKHN0YXRlRmlsZSkpIHtcbiAgICBzdGF0ZUZpbGUgPSBqb2luKFNUQVRFX0RJUiwgc2Vzc2lvbk5hbWUsIGB3cyR7bnVtfS5qc29uYCk7XG4gIH1cbiAgaWYgKCFleGlzdHNTeW5jKHN0YXRlRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHN0YXRlRmlsZSwgXCJ1dGYtOFwiKSkgYXMgVGFkcG9sZVN0YXRlO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGFkcG9sZU1ldGEodGFkcG9sZURpcjogc3RyaW5nKTogVGFkcG9sZU1ldGEgfCB1bmRlZmluZWQge1xuICBjb25zdCBtZXRhRmlsZSA9IGpvaW4odGFkcG9sZURpciwgXCIuYnVmby1tZXRhXCIpO1xuICBpZiAoIWV4aXN0c1N5bmMobWV0YUZpbGUpKSByZXR1cm4gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhtZXRhRmlsZSwgXCJ1dGYtOFwiKSkgYXMgVGFkcG9sZU1ldGE7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGFkcG9sZUxvY2tlZCh0YWRwb2xlRGlyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGV4aXN0c1N5bmMoam9pbih0YWRwb2xlRGlyLCBcIi5idWZvLWxvY2tcIikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q3VzdG9tTmFtZSh0YWRwb2xlRGlyOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBuYW1lRmlsZSA9IGpvaW4odGFkcG9sZURpciwgXCIuYnVmby1uYW1lXCIpO1xuICBpZiAoIWV4aXN0c1N5bmMobmFtZUZpbGUpKSByZXR1cm4gdW5kZWZpbmVkO1xuICB0cnkge1xuICAgIHJldHVybiByZWFkRmlsZVN5bmMobmFtZUZpbGUsIFwidXRmLThcIikudHJpbSgpIHx8IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFNlc3Npb24oXG4gIHByb2plY3RBbGlhczogc3RyaW5nLFxuICBzZXNzaW9uTmFtZTogc3RyaW5nLFxuICBhY3RpdmVTZXNzaW9ucz86IFNldDxzdHJpbmc+XG4pOiBCdWZvU2Vzc2lvbiB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHNlc3Npb25EaXIgPSBqb2luKFNFU1NJT05TX0RJUiwgcHJvamVjdEFsaWFzLCBzZXNzaW9uTmFtZSk7XG4gIGNvbnN0IHNlc3Npb25GaWxlID0gam9pbihzZXNzaW9uRGlyLCBcInNlc3Npb24ueWFtbFwiKTtcbiAgaWYgKCFleGlzdHNTeW5jKHNlc3Npb25GaWxlKSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICBjb25zdCByYXcgPSByZWFkRmlsZVN5bmMoc2Vzc2lvbkZpbGUsIFwidXRmLThcIik7XG4gICAgY29uc3QgZG9jID0geWFtbC5sb2FkKHJhdykgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbiAgICBsZXQgbGF5b3V0OiBTZXNzaW9uTGF5b3V0IHwgdW5kZWZpbmVkO1xuICAgIGNvbnN0IGxheW91dEZpbGUgPSBqb2luKHNlc3Npb25EaXIsIFwibGF5b3V0Lmpzb25cIik7XG4gICAgaWYgKGV4aXN0c1N5bmMobGF5b3V0RmlsZSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxheW91dCA9IEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGxheW91dEZpbGUsIFwidXRmLThcIikpIGFzIFNlc3Npb25MYXlvdXQ7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gc3RhbGUgb3IgbWFsZm9ybWVkIGxheW91dCBcdTIwMTQgaWdub3JlXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYWN0aXZlID0gbGF5b3V0Py5tYWluX3NpZCA/IChhY3RpdmVTZXNzaW9ucz8uaGFzKGxheW91dC5tYWluX3NpZCkgPz8gZmFsc2UpIDogZmFsc2U7XG4gICAgY29uc3QgaGFzUmV2aWV3T3V0cHV0ID0gZXhpc3RzU3luYyhqb2luKHNlc3Npb25EaXIsIFwicmV2aWV3LW91dHB1dC5tZFwiKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogKGRvYy5uYW1lIGFzIHN0cmluZykgfHwgc2Vzc2lvbk5hbWUsXG4gICAgICBwcm9qZWN0OiAoZG9jLnByb2plY3QgYXMgc3RyaW5nKSB8fCBwcm9qZWN0QWxpYXMsXG4gICAgICBjcmVhdGVkOiAoZG9jLmNyZWF0ZWQgYXMgc3RyaW5nKSB8fCBcIlwiLFxuICAgICAgbGFzdF9hY2Nlc3NlZDogKGRvYy5sYXN0X2FjY2Vzc2VkIGFzIHN0cmluZykgfHwgXCJcIixcbiAgICAgIHN1bW1hcnk6IChkb2Muc3VtbWFyeSBhcyBzdHJpbmcpIHx8IFwiXCIsXG4gICAgICB0eXBlOiAoKGRvYy50eXBlIGFzIHN0cmluZykgfHwgXCJnZW5lcmFsXCIpIGFzIEJ1Zm9TZXNzaW9uW1widHlwZVwiXSxcbiAgICAgIHByczogZG9jLnBycyBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZCxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGhhc1Jldmlld091dHB1dCxcbiAgICAgIGxheW91dCxcbiAgICB9O1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNjb3ZlclNlc3Npb25zKFxuICBwcm9qZWN0QWxpYXM6IHN0cmluZyxcbiAgYWN0aXZlU2Vzc2lvbnM/OiBTZXQ8c3RyaW5nPlxuKTogQnVmb1Nlc3Npb25bXSB7XG4gIGNvbnN0IHByb2plY3RTZXNzaW9uc0RpciA9IGpvaW4oU0VTU0lPTlNfRElSLCBwcm9qZWN0QWxpYXMpO1xuICBpZiAoIWV4aXN0c1N5bmMocHJvamVjdFNlc3Npb25zRGlyKSkgcmV0dXJuIFtdO1xuICBsZXQgZW50cmllczogc3RyaW5nW107XG4gIHRyeSB7XG4gICAgZW50cmllcyA9IHJlYWRkaXJTeW5jKHByb2plY3RTZXNzaW9uc0Rpcik7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCBzZXNzaW9uczogQnVmb1Nlc3Npb25bXSA9IFtdO1xuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4ocHJvamVjdFNlc3Npb25zRGlyLCBlbnRyeSk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc3RhdFN5bmMoZnVsbFBhdGgpLmlzRGlyZWN0b3J5KCkpIGNvbnRpbnVlO1xuICAgIH0gY2F0Y2gge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGNvbnN0IHNlc3Npb24gPSBsb2FkU2Vzc2lvbihwcm9qZWN0QWxpYXMsIGVudHJ5LCBhY3RpdmVTZXNzaW9ucyk7XG4gICAgaWYgKHNlc3Npb24pIHNlc3Npb25zLnB1c2goc2Vzc2lvbik7XG4gIH1cbiAgcmV0dXJuIHNlc3Npb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxsU2Vzc2lvbnMoXG4gIGFjdGl2ZVNlc3Npb25zPzogU2V0PHN0cmluZz5cbik6IHsgcHJvamVjdEFsaWFzOiBzdHJpbmc7IHNlc3Npb25zOiBCdWZvU2Vzc2lvbltdIH1bXSB7XG4gIGNvbnN0IHByb2plY3RzID0gZGlzY292ZXJQcm9qZWN0cygpO1xuICBjb25zdCByZXN1bHQ6IHsgcHJvamVjdEFsaWFzOiBzdHJpbmc7IHNlc3Npb25zOiBCdWZvU2Vzc2lvbltdIH1bXSA9IFtdO1xuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcbiAgICBjb25zdCBzZXNzaW9ucyA9IGRpc2NvdmVyU2Vzc2lvbnMocHJvamVjdC5hbGlhcywgYWN0aXZlU2Vzc2lvbnMpO1xuICAgIGlmIChzZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQucHVzaCh7IHByb2plY3RBbGlhczogcHJvamVjdC5hbGlhcywgc2Vzc2lvbnMgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iLCAiXG4vKiEganMteWFtbCA0LjEuMSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWNhL2pzLXlhbWwgQGxpY2Vuc2UgTUlUICovXG5mdW5jdGlvbiBpc05vdGhpbmcoc3ViamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJykgfHwgKHN1YmplY3QgPT09IG51bGwpO1xufVxuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcpICYmIChzdWJqZWN0ICE9PSBudWxsKTtcbn1cblxuXG5mdW5jdGlvbiB0b0FycmF5KHNlcXVlbmNlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHNlcXVlbmNlKSkgcmV0dXJuIHNlcXVlbmNlO1xuICBlbHNlIGlmIChpc05vdGhpbmcoc2VxdWVuY2UpKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIFsgc2VxdWVuY2UgXTtcbn1cblxuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGluZGV4LCBsZW5ndGgsIGtleSwgc291cmNlS2V5cztcblxuICBpZiAoc291cmNlKSB7XG4gICAgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gc291cmNlS2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICBrZXkgPSBzb3VyY2VLZXlzW2luZGV4XTtcbiAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuXG5mdW5jdGlvbiByZXBlYXQoc3RyaW5nLCBjb3VudCkge1xuICB2YXIgcmVzdWx0ID0gJycsIGN5Y2xlO1xuXG4gIGZvciAoY3ljbGUgPSAwOyBjeWNsZSA8IGNvdW50OyBjeWNsZSArPSAxKSB7XG4gICAgcmVzdWx0ICs9IHN0cmluZztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gaXNOZWdhdGl2ZVplcm8obnVtYmVyKSB7XG4gIHJldHVybiAobnVtYmVyID09PSAwKSAmJiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSAxIC8gbnVtYmVyKTtcbn1cblxuXG52YXIgaXNOb3RoaW5nXzEgICAgICA9IGlzTm90aGluZztcbnZhciBpc09iamVjdF8xICAgICAgID0gaXNPYmplY3Q7XG52YXIgdG9BcnJheV8xICAgICAgICA9IHRvQXJyYXk7XG52YXIgcmVwZWF0XzEgICAgICAgICA9IHJlcGVhdDtcbnZhciBpc05lZ2F0aXZlWmVyb18xID0gaXNOZWdhdGl2ZVplcm87XG52YXIgZXh0ZW5kXzEgICAgICAgICA9IGV4dGVuZDtcblxudmFyIGNvbW1vbiA9IHtcblx0aXNOb3RoaW5nOiBpc05vdGhpbmdfMSxcblx0aXNPYmplY3Q6IGlzT2JqZWN0XzEsXG5cdHRvQXJyYXk6IHRvQXJyYXlfMSxcblx0cmVwZWF0OiByZXBlYXRfMSxcblx0aXNOZWdhdGl2ZVplcm86IGlzTmVnYXRpdmVaZXJvXzEsXG5cdGV4dGVuZDogZXh0ZW5kXzFcbn07XG5cbi8vIFlBTUwgZXJyb3IgY2xhc3MuIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODQ1ODk4NFxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKGV4Y2VwdGlvbiwgY29tcGFjdCkge1xuICB2YXIgd2hlcmUgPSAnJywgbWVzc2FnZSA9IGV4Y2VwdGlvbi5yZWFzb24gfHwgJyh1bmtub3duIHJlYXNvbiknO1xuXG4gIGlmICghZXhjZXB0aW9uLm1hcmspIHJldHVybiBtZXNzYWdlO1xuXG4gIGlmIChleGNlcHRpb24ubWFyay5uYW1lKSB7XG4gICAgd2hlcmUgKz0gJ2luIFwiJyArIGV4Y2VwdGlvbi5tYXJrLm5hbWUgKyAnXCIgJztcbiAgfVxuXG4gIHdoZXJlICs9ICcoJyArIChleGNlcHRpb24ubWFyay5saW5lICsgMSkgKyAnOicgKyAoZXhjZXB0aW9uLm1hcmsuY29sdW1uICsgMSkgKyAnKSc7XG5cbiAgaWYgKCFjb21wYWN0ICYmIGV4Y2VwdGlvbi5tYXJrLnNuaXBwZXQpIHtcbiAgICB3aGVyZSArPSAnXFxuXFxuJyArIGV4Y2VwdGlvbi5tYXJrLnNuaXBwZXQ7XG4gIH1cblxuICByZXR1cm4gbWVzc2FnZSArICcgJyArIHdoZXJlO1xufVxuXG5cbmZ1bmN0aW9uIFlBTUxFeGNlcHRpb24kMShyZWFzb24sIG1hcmspIHtcbiAgLy8gU3VwZXIgY29uc3RydWN0b3JcbiAgRXJyb3IuY2FsbCh0aGlzKTtcblxuICB0aGlzLm5hbWUgPSAnWUFNTEV4Y2VwdGlvbic7XG4gIHRoaXMucmVhc29uID0gcmVhc29uO1xuICB0aGlzLm1hcmsgPSBtYXJrO1xuICB0aGlzLm1lc3NhZ2UgPSBmb3JtYXRFcnJvcih0aGlzLCBmYWxzZSk7XG5cbiAgLy8gSW5jbHVkZSBzdGFjayB0cmFjZSBpbiBlcnJvciBvYmplY3RcbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgLy8gQ2hyb21lIGFuZCBOb2RlSlNcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGRiwgSUUgMTArIGFuZCBTYWZhcmkgNisuIEZhbGxiYWNrIGZvciBvdGhlcnNcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFjayB8fCAnJztcbiAgfVxufVxuXG5cbi8vIEluaGVyaXQgZnJvbSBFcnJvclxuWUFNTEV4Y2VwdGlvbiQxLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbllBTUxFeGNlcHRpb24kMS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBZQU1MRXhjZXB0aW9uJDE7XG5cblxuWUFNTEV4Y2VwdGlvbiQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGNvbXBhY3QpIHtcbiAgcmV0dXJuIHRoaXMubmFtZSArICc6ICcgKyBmb3JtYXRFcnJvcih0aGlzLCBjb21wYWN0KTtcbn07XG5cblxudmFyIGV4Y2VwdGlvbiA9IFlBTUxFeGNlcHRpb24kMTtcblxuLy8gZ2V0IHNuaXBwZXQgZm9yIGEgc2luZ2xlIGxpbmUsIHJlc3BlY3RpbmcgbWF4TGVuZ3RoXG5mdW5jdGlvbiBnZXRMaW5lKGJ1ZmZlciwgbGluZVN0YXJ0LCBsaW5lRW5kLCBwb3NpdGlvbiwgbWF4TGluZUxlbmd0aCkge1xuICB2YXIgaGVhZCA9ICcnO1xuICB2YXIgdGFpbCA9ICcnO1xuICB2YXIgbWF4SGFsZkxlbmd0aCA9IE1hdGguZmxvb3IobWF4TGluZUxlbmd0aCAvIDIpIC0gMTtcblxuICBpZiAocG9zaXRpb24gLSBsaW5lU3RhcnQgPiBtYXhIYWxmTGVuZ3RoKSB7XG4gICAgaGVhZCA9ICcgLi4uICc7XG4gICAgbGluZVN0YXJ0ID0gcG9zaXRpb24gLSBtYXhIYWxmTGVuZ3RoICsgaGVhZC5sZW5ndGg7XG4gIH1cblxuICBpZiAobGluZUVuZCAtIHBvc2l0aW9uID4gbWF4SGFsZkxlbmd0aCkge1xuICAgIHRhaWwgPSAnIC4uLic7XG4gICAgbGluZUVuZCA9IHBvc2l0aW9uICsgbWF4SGFsZkxlbmd0aCAtIHRhaWwubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdHI6IGhlYWQgKyBidWZmZXIuc2xpY2UobGluZVN0YXJ0LCBsaW5lRW5kKS5yZXBsYWNlKC9cXHQvZywgJ1x1MjE5MicpICsgdGFpbCxcbiAgICBwb3M6IHBvc2l0aW9uIC0gbGluZVN0YXJ0ICsgaGVhZC5sZW5ndGggLy8gcmVsYXRpdmUgcG9zaXRpb25cbiAgfTtcbn1cblxuXG5mdW5jdGlvbiBwYWRTdGFydChzdHJpbmcsIG1heCkge1xuICByZXR1cm4gY29tbW9uLnJlcGVhdCgnICcsIG1heCAtIHN0cmluZy5sZW5ndGgpICsgc3RyaW5nO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VTbmlwcGV0KG1hcmssIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IE9iamVjdC5jcmVhdGUob3B0aW9ucyB8fCBudWxsKTtcblxuICBpZiAoIW1hcmsuYnVmZmVyKSByZXR1cm4gbnVsbDtcblxuICBpZiAoIW9wdGlvbnMubWF4TGVuZ3RoKSBvcHRpb25zLm1heExlbmd0aCA9IDc5O1xuICBpZiAodHlwZW9mIG9wdGlvbnMuaW5kZW50ICAgICAgIT09ICdudW1iZXInKSBvcHRpb25zLmluZGVudCAgICAgID0gMTtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmxpbmVzQmVmb3JlICE9PSAnbnVtYmVyJykgb3B0aW9ucy5saW5lc0JlZm9yZSA9IDM7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5saW5lc0FmdGVyICAhPT0gJ251bWJlcicpIG9wdGlvbnMubGluZXNBZnRlciAgPSAyO1xuXG4gIHZhciByZSA9IC9cXHI/XFxufFxccnxcXDAvZztcbiAgdmFyIGxpbmVTdGFydHMgPSBbIDAgXTtcbiAgdmFyIGxpbmVFbmRzID0gW107XG4gIHZhciBtYXRjaDtcbiAgdmFyIGZvdW5kTGluZU5vID0gLTE7XG5cbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMobWFyay5idWZmZXIpKSkge1xuICAgIGxpbmVFbmRzLnB1c2gobWF0Y2guaW5kZXgpO1xuICAgIGxpbmVTdGFydHMucHVzaChtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG5cbiAgICBpZiAobWFyay5wb3NpdGlvbiA8PSBtYXRjaC5pbmRleCAmJiBmb3VuZExpbmVObyA8IDApIHtcbiAgICAgIGZvdW5kTGluZU5vID0gbGluZVN0YXJ0cy5sZW5ndGggLSAyO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmb3VuZExpbmVObyA8IDApIGZvdW5kTGluZU5vID0gbGluZVN0YXJ0cy5sZW5ndGggLSAxO1xuXG4gIHZhciByZXN1bHQgPSAnJywgaSwgbGluZTtcbiAgdmFyIGxpbmVOb0xlbmd0aCA9IE1hdGgubWluKG1hcmsubGluZSArIG9wdGlvbnMubGluZXNBZnRlciwgbGluZUVuZHMubGVuZ3RoKS50b1N0cmluZygpLmxlbmd0aDtcbiAgdmFyIG1heExpbmVMZW5ndGggPSBvcHRpb25zLm1heExlbmd0aCAtIChvcHRpb25zLmluZGVudCArIGxpbmVOb0xlbmd0aCArIDMpO1xuXG4gIGZvciAoaSA9IDE7IGkgPD0gb3B0aW9ucy5saW5lc0JlZm9yZTsgaSsrKSB7XG4gICAgaWYgKGZvdW5kTGluZU5vIC0gaSA8IDApIGJyZWFrO1xuICAgIGxpbmUgPSBnZXRMaW5lKFxuICAgICAgbWFyay5idWZmZXIsXG4gICAgICBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vIC0gaV0sXG4gICAgICBsaW5lRW5kc1tmb3VuZExpbmVObyAtIGldLFxuICAgICAgbWFyay5wb3NpdGlvbiAtIChsaW5lU3RhcnRzW2ZvdW5kTGluZU5vXSAtIGxpbmVTdGFydHNbZm91bmRMaW5lTm8gLSBpXSksXG4gICAgICBtYXhMaW5lTGVuZ3RoXG4gICAgKTtcbiAgICByZXN1bHQgPSBjb21tb24ucmVwZWF0KCcgJywgb3B0aW9ucy5pbmRlbnQpICsgcGFkU3RhcnQoKG1hcmsubGluZSAtIGkgKyAxKS50b1N0cmluZygpLCBsaW5lTm9MZW5ndGgpICtcbiAgICAgICcgfCAnICsgbGluZS5zdHIgKyAnXFxuJyArIHJlc3VsdDtcbiAgfVxuXG4gIGxpbmUgPSBnZXRMaW5lKG1hcmsuYnVmZmVyLCBsaW5lU3RhcnRzW2ZvdW5kTGluZU5vXSwgbGluZUVuZHNbZm91bmRMaW5lTm9dLCBtYXJrLnBvc2l0aW9uLCBtYXhMaW5lTGVuZ3RoKTtcbiAgcmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJyAnLCBvcHRpb25zLmluZGVudCkgKyBwYWRTdGFydCgobWFyay5saW5lICsgMSkudG9TdHJpbmcoKSwgbGluZU5vTGVuZ3RoKSArXG4gICAgJyB8ICcgKyBsaW5lLnN0ciArICdcXG4nO1xuICByZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnLScsIG9wdGlvbnMuaW5kZW50ICsgbGluZU5vTGVuZ3RoICsgMyArIGxpbmUucG9zKSArICdeJyArICdcXG4nO1xuXG4gIGZvciAoaSA9IDE7IGkgPD0gb3B0aW9ucy5saW5lc0FmdGVyOyBpKyspIHtcbiAgICBpZiAoZm91bmRMaW5lTm8gKyBpID49IGxpbmVFbmRzLmxlbmd0aCkgYnJlYWs7XG4gICAgbGluZSA9IGdldExpbmUoXG4gICAgICBtYXJrLmJ1ZmZlcixcbiAgICAgIGxpbmVTdGFydHNbZm91bmRMaW5lTm8gKyBpXSxcbiAgICAgIGxpbmVFbmRzW2ZvdW5kTGluZU5vICsgaV0sXG4gICAgICBtYXJrLnBvc2l0aW9uIC0gKGxpbmVTdGFydHNbZm91bmRMaW5lTm9dIC0gbGluZVN0YXJ0c1tmb3VuZExpbmVObyArIGldKSxcbiAgICAgIG1heExpbmVMZW5ndGhcbiAgICApO1xuICAgIHJlc3VsdCArPSBjb21tb24ucmVwZWF0KCcgJywgb3B0aW9ucy5pbmRlbnQpICsgcGFkU3RhcnQoKG1hcmsubGluZSArIGkgKyAxKS50b1N0cmluZygpLCBsaW5lTm9MZW5ndGgpICtcbiAgICAgICcgfCAnICsgbGluZS5zdHIgKyAnXFxuJztcbiAgfVxuXG4gIHJldHVybiByZXN1bHQucmVwbGFjZSgvXFxuJC8sICcnKTtcbn1cblxuXG52YXIgc25pcHBldCA9IG1ha2VTbmlwcGV0O1xuXG52YXIgVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TID0gW1xuICAna2luZCcsXG4gICdtdWx0aScsXG4gICdyZXNvbHZlJyxcbiAgJ2NvbnN0cnVjdCcsXG4gICdpbnN0YW5jZU9mJyxcbiAgJ3ByZWRpY2F0ZScsXG4gICdyZXByZXNlbnQnLFxuICAncmVwcmVzZW50TmFtZScsXG4gICdkZWZhdWx0U3R5bGUnLFxuICAnc3R5bGVBbGlhc2VzJ1xuXTtcblxudmFyIFlBTUxfTk9ERV9LSU5EUyA9IFtcbiAgJ3NjYWxhcicsXG4gICdzZXF1ZW5jZScsXG4gICdtYXBwaW5nJ1xuXTtcblxuZnVuY3Rpb24gY29tcGlsZVN0eWxlQWxpYXNlcyhtYXApIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGlmIChtYXAgIT09IG51bGwpIHtcbiAgICBPYmplY3Qua2V5cyhtYXApLmZvckVhY2goZnVuY3Rpb24gKHN0eWxlKSB7XG4gICAgICBtYXBbc3R5bGVdLmZvckVhY2goZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgIHJlc3VsdFtTdHJpbmcoYWxpYXMpXSA9IHN0eWxlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBUeXBlJDEodGFnLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIE9iamVjdC5rZXlzKG9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoVFlQRV9DT05TVFJVQ1RPUl9PUFRJT05TLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdVbmtub3duIG9wdGlvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG1ldCBpbiBkZWZpbml0aW9uIG9mIFwiJyArIHRhZyArICdcIiBZQU1MIHR5cGUuJyk7XG4gICAgfVxuICB9KTtcblxuICAvLyBUT0RPOiBBZGQgdGFnIGZvcm1hdCBjaGVjay5cbiAgdGhpcy5vcHRpb25zICAgICAgID0gb3B0aW9uczsgLy8ga2VlcCBvcmlnaW5hbCBvcHRpb25zIGluIGNhc2UgdXNlciB3YW50cyB0byBleHRlbmQgdGhpcyB0eXBlIGxhdGVyXG4gIHRoaXMudGFnICAgICAgICAgICA9IHRhZztcbiAgdGhpcy5raW5kICAgICAgICAgID0gb3B0aW9uc1sna2luZCddICAgICAgICAgIHx8IG51bGw7XG4gIHRoaXMucmVzb2x2ZSAgICAgICA9IG9wdGlvbnNbJ3Jlc29sdmUnXSAgICAgICB8fCBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xuICB0aGlzLmNvbnN0cnVjdCAgICAgPSBvcHRpb25zWydjb25zdHJ1Y3QnXSAgICAgfHwgZnVuY3Rpb24gKGRhdGEpIHsgcmV0dXJuIGRhdGE7IH07XG4gIHRoaXMuaW5zdGFuY2VPZiAgICA9IG9wdGlvbnNbJ2luc3RhbmNlT2YnXSAgICB8fCBudWxsO1xuICB0aGlzLnByZWRpY2F0ZSAgICAgPSBvcHRpb25zWydwcmVkaWNhdGUnXSAgICAgfHwgbnVsbDtcbiAgdGhpcy5yZXByZXNlbnQgICAgID0gb3B0aW9uc1sncmVwcmVzZW50J10gICAgIHx8IG51bGw7XG4gIHRoaXMucmVwcmVzZW50TmFtZSA9IG9wdGlvbnNbJ3JlcHJlc2VudE5hbWUnXSB8fCBudWxsO1xuICB0aGlzLmRlZmF1bHRTdHlsZSAgPSBvcHRpb25zWydkZWZhdWx0U3R5bGUnXSAgfHwgbnVsbDtcbiAgdGhpcy5tdWx0aSAgICAgICAgID0gb3B0aW9uc1snbXVsdGknXSAgICAgICAgIHx8IGZhbHNlO1xuICB0aGlzLnN0eWxlQWxpYXNlcyAgPSBjb21waWxlU3R5bGVBbGlhc2VzKG9wdGlvbnNbJ3N0eWxlQWxpYXNlcyddIHx8IG51bGwpO1xuXG4gIGlmIChZQU1MX05PREVfS0lORFMuaW5kZXhPZih0aGlzLmtpbmQpID09PSAtMSkge1xuICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1Vua25vd24ga2luZCBcIicgKyB0aGlzLmtpbmQgKyAnXCIgaXMgc3BlY2lmaWVkIGZvciBcIicgKyB0YWcgKyAnXCIgWUFNTCB0eXBlLicpO1xuICB9XG59XG5cbnZhciB0eXBlID0gVHlwZSQxO1xuXG4vKmVzbGludC1kaXNhYmxlIG1heC1sZW4qL1xuXG5cblxuXG5cbmZ1bmN0aW9uIGNvbXBpbGVMaXN0KHNjaGVtYSwgbmFtZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgc2NoZW1hW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKGN1cnJlbnRUeXBlKSB7XG4gICAgdmFyIG5ld0luZGV4ID0gcmVzdWx0Lmxlbmd0aDtcblxuICAgIHJlc3VsdC5mb3JFYWNoKGZ1bmN0aW9uIChwcmV2aW91c1R5cGUsIHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIGlmIChwcmV2aW91c1R5cGUudGFnID09PSBjdXJyZW50VHlwZS50YWcgJiZcbiAgICAgICAgICBwcmV2aW91c1R5cGUua2luZCA9PT0gY3VycmVudFR5cGUua2luZCAmJlxuICAgICAgICAgIHByZXZpb3VzVHlwZS5tdWx0aSA9PT0gY3VycmVudFR5cGUubXVsdGkpIHtcblxuICAgICAgICBuZXdJbmRleCA9IHByZXZpb3VzSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXN1bHRbbmV3SW5kZXhdID0gY3VycmVudFR5cGU7XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuZnVuY3Rpb24gY29tcGlsZU1hcCgvKiBsaXN0cy4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBzY2FsYXI6IHt9LFxuICAgICAgICBzZXF1ZW5jZToge30sXG4gICAgICAgIG1hcHBpbmc6IHt9LFxuICAgICAgICBmYWxsYmFjazoge30sXG4gICAgICAgIG11bHRpOiB7XG4gICAgICAgICAgc2NhbGFyOiBbXSxcbiAgICAgICAgICBzZXF1ZW5jZTogW10sXG4gICAgICAgICAgbWFwcGluZzogW10sXG4gICAgICAgICAgZmFsbGJhY2s6IFtdXG4gICAgICAgIH1cbiAgICAgIH0sIGluZGV4LCBsZW5ndGg7XG5cbiAgZnVuY3Rpb24gY29sbGVjdFR5cGUodHlwZSkge1xuICAgIGlmICh0eXBlLm11bHRpKSB7XG4gICAgICByZXN1bHQubXVsdGlbdHlwZS5raW5kXS5wdXNoKHR5cGUpO1xuICAgICAgcmVzdWx0Lm11bHRpWydmYWxsYmFjayddLnB1c2godHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFt0eXBlLmtpbmRdW3R5cGUudGFnXSA9IHJlc3VsdFsnZmFsbGJhY2snXVt0eXBlLnRhZ10gPSB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGFyZ3VtZW50c1tpbmRleF0uZm9yRWFjaChjb2xsZWN0VHlwZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBTY2hlbWEkMShkZWZpbml0aW9uKSB7XG4gIHJldHVybiB0aGlzLmV4dGVuZChkZWZpbml0aW9uKTtcbn1cblxuXG5TY2hlbWEkMS5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKGRlZmluaXRpb24pIHtcbiAgdmFyIGltcGxpY2l0ID0gW107XG4gIHZhciBleHBsaWNpdCA9IFtdO1xuXG4gIGlmIChkZWZpbml0aW9uIGluc3RhbmNlb2YgdHlwZSkge1xuICAgIC8vIFNjaGVtYS5leHRlbmQodHlwZSlcbiAgICBleHBsaWNpdC5wdXNoKGRlZmluaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uKSkge1xuICAgIC8vIFNjaGVtYS5leHRlbmQoWyB0eXBlMSwgdHlwZTIsIC4uLiBdKVxuICAgIGV4cGxpY2l0ID0gZXhwbGljaXQuY29uY2F0KGRlZmluaXRpb24pO1xuXG4gIH0gZWxzZSBpZiAoZGVmaW5pdGlvbiAmJiAoQXJyYXkuaXNBcnJheShkZWZpbml0aW9uLmltcGxpY2l0KSB8fCBBcnJheS5pc0FycmF5KGRlZmluaXRpb24uZXhwbGljaXQpKSkge1xuICAgIC8vIFNjaGVtYS5leHRlbmQoeyBleHBsaWNpdDogWyB0eXBlMSwgdHlwZTIsIC4uLiBdLCBpbXBsaWNpdDogWyB0eXBlMSwgdHlwZTIsIC4uLiBdIH0pXG4gICAgaWYgKGRlZmluaXRpb24uaW1wbGljaXQpIGltcGxpY2l0ID0gaW1wbGljaXQuY29uY2F0KGRlZmluaXRpb24uaW1wbGljaXQpO1xuICAgIGlmIChkZWZpbml0aW9uLmV4cGxpY2l0KSBleHBsaWNpdCA9IGV4cGxpY2l0LmNvbmNhdChkZWZpbml0aW9uLmV4cGxpY2l0KTtcblxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1NjaGVtYS5leHRlbmQgYXJndW1lbnQgc2hvdWxkIGJlIGEgVHlwZSwgWyBUeXBlIF0sICcgK1xuICAgICAgJ29yIGEgc2NoZW1hIGRlZmluaXRpb24gKHsgaW1wbGljaXQ6IFsuLi5dLCBleHBsaWNpdDogWy4uLl0gfSknKTtcbiAgfVxuXG4gIGltcGxpY2l0LmZvckVhY2goZnVuY3Rpb24gKHR5cGUkMSkge1xuICAgIGlmICghKHR5cGUkMSBpbnN0YW5jZW9mIHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdTcGVjaWZpZWQgbGlzdCBvZiBZQU1MIHR5cGVzIChvciBhIHNpbmdsZSBUeXBlIG9iamVjdCkgY29udGFpbnMgYSBub24tVHlwZSBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUkMS5sb2FkS2luZCAmJiB0eXBlJDEubG9hZEtpbmQgIT09ICdzY2FsYXInKSB7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdUaGVyZSBpcyBhIG5vbi1zY2FsYXIgdHlwZSBpbiB0aGUgaW1wbGljaXQgbGlzdCBvZiBhIHNjaGVtYS4gSW1wbGljaXQgcmVzb2x2aW5nIG9mIHN1Y2ggdHlwZXMgaXMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZSQxLm11bHRpKSB7XG4gICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdUaGVyZSBpcyBhIG11bHRpIHR5cGUgaW4gdGhlIGltcGxpY2l0IGxpc3Qgb2YgYSBzY2hlbWEuIE11bHRpIHRhZ3MgY2FuIG9ubHkgYmUgbGlzdGVkIGFzIGV4cGxpY2l0LicpO1xuICAgIH1cbiAgfSk7XG5cbiAgZXhwbGljaXQuZm9yRWFjaChmdW5jdGlvbiAodHlwZSQxKSB7XG4gICAgaWYgKCEodHlwZSQxIGluc3RhbmNlb2YgdHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ1NwZWNpZmllZCBsaXN0IG9mIFlBTUwgdHlwZXMgKG9yIGEgc2luZ2xlIFR5cGUgb2JqZWN0KSBjb250YWlucyBhIG5vbi1UeXBlIG9iamVjdC4nKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciByZXN1bHQgPSBPYmplY3QuY3JlYXRlKFNjaGVtYSQxLnByb3RvdHlwZSk7XG5cbiAgcmVzdWx0LmltcGxpY2l0ID0gKHRoaXMuaW1wbGljaXQgfHwgW10pLmNvbmNhdChpbXBsaWNpdCk7XG4gIHJlc3VsdC5leHBsaWNpdCA9ICh0aGlzLmV4cGxpY2l0IHx8IFtdKS5jb25jYXQoZXhwbGljaXQpO1xuXG4gIHJlc3VsdC5jb21waWxlZEltcGxpY2l0ID0gY29tcGlsZUxpc3QocmVzdWx0LCAnaW1wbGljaXQnKTtcbiAgcmVzdWx0LmNvbXBpbGVkRXhwbGljaXQgPSBjb21waWxlTGlzdChyZXN1bHQsICdleHBsaWNpdCcpO1xuICByZXN1bHQuY29tcGlsZWRUeXBlTWFwICA9IGNvbXBpbGVNYXAocmVzdWx0LmNvbXBpbGVkSW1wbGljaXQsIHJlc3VsdC5jb21waWxlZEV4cGxpY2l0KTtcblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG52YXIgc2NoZW1hID0gU2NoZW1hJDE7XG5cbnZhciBzdHIgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6c3RyJywge1xuICBraW5kOiAnc2NhbGFyJyxcbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiAnJzsgfVxufSk7XG5cbnZhciBzZXEgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6c2VxJywge1xuICBraW5kOiAnc2VxdWVuY2UnLFxuICBjb25zdHJ1Y3Q6IGZ1bmN0aW9uIChkYXRhKSB7IHJldHVybiBkYXRhICE9PSBudWxsID8gZGF0YSA6IFtdOyB9XG59KTtcblxudmFyIG1hcCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjptYXAnLCB7XG4gIGtpbmQ6ICdtYXBwaW5nJyxcbiAgY29uc3RydWN0OiBmdW5jdGlvbiAoZGF0YSkgeyByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiB7fTsgfVxufSk7XG5cbnZhciBmYWlsc2FmZSA9IG5ldyBzY2hlbWEoe1xuICBleHBsaWNpdDogW1xuICAgIHN0cixcbiAgICBzZXEsXG4gICAgbWFwXG4gIF1cbn0pO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbE51bGwoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIG1heCA9IGRhdGEubGVuZ3RoO1xuXG4gIHJldHVybiAobWF4ID09PSAxICYmIGRhdGEgPT09ICd+JykgfHxcbiAgICAgICAgIChtYXggPT09IDQgJiYgKGRhdGEgPT09ICdudWxsJyB8fCBkYXRhID09PSAnTnVsbCcgfHwgZGF0YSA9PT0gJ05VTEwnKSk7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNOdWxsKG9iamVjdCkge1xuICByZXR1cm4gb2JqZWN0ID09PSBudWxsO1xufVxuXG52YXIgX251bGwgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bnVsbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sTnVsbCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sTnVsbCxcbiAgcHJlZGljYXRlOiBpc051bGwsXG4gIHJlcHJlc2VudDoge1xuICAgIGNhbm9uaWNhbDogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ34nOyAgICB9LFxuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ251bGwnOyB9LFxuICAgIHVwcGVyY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ05VTEwnOyB9LFxuICAgIGNhbWVsY2FzZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gJ051bGwnOyB9LFxuICAgIGVtcHR5OiAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gJyc7ICAgICB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbEJvb2xlYW4oZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBtYXggPSBkYXRhLmxlbmd0aDtcblxuICByZXR1cm4gKG1heCA9PT0gNCAmJiAoZGF0YSA9PT0gJ3RydWUnIHx8IGRhdGEgPT09ICdUcnVlJyB8fCBkYXRhID09PSAnVFJVRScpKSB8fFxuICAgICAgICAgKG1heCA9PT0gNSAmJiAoZGF0YSA9PT0gJ2ZhbHNlJyB8fCBkYXRhID09PSAnRmFsc2UnIHx8IGRhdGEgPT09ICdGQUxTRScpKTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEJvb2xlYW4oZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJ3RydWUnIHx8XG4gICAgICAgICBkYXRhID09PSAnVHJ1ZScgfHxcbiAgICAgICAgIGRhdGEgPT09ICdUUlVFJztcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbn1cblxudmFyIGJvb2wgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6Ym9vbCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQm9vbGVhbixcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sQm9vbGVhbixcbiAgcHJlZGljYXRlOiBpc0Jvb2xlYW4sXG4gIHJlcHJlc2VudDoge1xuICAgIGxvd2VyY2FzZTogZnVuY3Rpb24gKG9iamVjdCkgeyByZXR1cm4gb2JqZWN0ID8gJ3RydWUnIDogJ2ZhbHNlJzsgfSxcbiAgICB1cHBlcmNhc2U6IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIG9iamVjdCA/ICdUUlVFJyA6ICdGQUxTRSc7IH0sXG4gICAgY2FtZWxjYXNlOiBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgPyAnVHJ1ZScgOiAnRmFsc2UnOyB9XG4gIH0sXG4gIGRlZmF1bHRTdHlsZTogJ2xvd2VyY2FzZSdcbn0pO1xuXG5mdW5jdGlvbiBpc0hleENvZGUoYykge1xuICByZXR1cm4gKCgweDMwLyogMCAqLyA8PSBjKSAmJiAoYyA8PSAweDM5LyogOSAqLykpIHx8XG4gICAgICAgICAoKDB4NDEvKiBBICovIDw9IGMpICYmIChjIDw9IDB4NDYvKiBGICovKSkgfHxcbiAgICAgICAgICgoMHg2MS8qIGEgKi8gPD0gYykgJiYgKGMgPD0gMHg2Ni8qIGYgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNPY3RDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzNy8qIDcgKi8pKTtcbn1cblxuZnVuY3Rpb24gaXNEZWNDb2RlKGMpIHtcbiAgcmV0dXJuICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgaWYgKGRhdGEgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblxuICB2YXIgbWF4ID0gZGF0YS5sZW5ndGgsXG4gICAgICBpbmRleCA9IDAsXG4gICAgICBoYXNEaWdpdHMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIGlmICghbWF4KSByZXR1cm4gZmFsc2U7XG5cbiAgY2ggPSBkYXRhW2luZGV4XTtcblxuICAvLyBzaWduXG4gIGlmIChjaCA9PT0gJy0nIHx8IGNoID09PSAnKycpIHtcbiAgICBjaCA9IGRhdGFbKytpbmRleF07XG4gIH1cblxuICBpZiAoY2ggPT09ICcwJykge1xuICAgIC8vIDBcbiAgICBpZiAoaW5kZXggKyAxID09PSBtYXgpIHJldHVybiB0cnVlO1xuICAgIGNoID0gZGF0YVsrK2luZGV4XTtcblxuICAgIC8vIGJhc2UgMiwgYmFzZSA4LCBiYXNlIDE2XG5cbiAgICBpZiAoY2ggPT09ICdiJykge1xuICAgICAgLy8gYmFzZSAyXG4gICAgICBpbmRleCsrO1xuXG4gICAgICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICAgICAgY2ggPSBkYXRhW2luZGV4XTtcbiAgICAgICAgaWYgKGNoID09PSAnXycpIGNvbnRpbnVlO1xuICAgICAgICBpZiAoY2ggIT09ICcwJyAmJiBjaCAhPT0gJzEnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuXG5cbiAgICBpZiAoY2ggPT09ICd4Jykge1xuICAgICAgLy8gYmFzZSAxNlxuICAgICAgaW5kZXgrKztcblxuICAgICAgZm9yICg7IGluZGV4IDwgbWF4OyBpbmRleCsrKSB7XG4gICAgICAgIGNoID0gZGF0YVtpbmRleF07XG4gICAgICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFpc0hleENvZGUoZGF0YS5jaGFyQ29kZUF0KGluZGV4KSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaGFzRGlnaXRzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNEaWdpdHMgJiYgY2ggIT09ICdfJztcbiAgICB9XG5cblxuICAgIGlmIChjaCA9PT0gJ28nKSB7XG4gICAgICAvLyBiYXNlIDhcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGZvciAoOyBpbmRleCA8IG1heDsgaW5kZXgrKykge1xuICAgICAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBpZiAoY2ggPT09ICdfJykgY29udGludWU7XG4gICAgICAgIGlmICghaXNPY3RDb2RlKGRhdGEuY2hhckNvZGVBdChpbmRleCkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGhhc0RpZ2l0cyA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzRGlnaXRzICYmIGNoICE9PSAnXyc7XG4gICAgfVxuICB9XG5cbiAgLy8gYmFzZSAxMCAoZXhjZXB0IDApXG5cbiAgLy8gdmFsdWUgc2hvdWxkIG5vdCBzdGFydCB3aXRoIGBfYDtcbiAgaWYgKGNoID09PSAnXycpIHJldHVybiBmYWxzZTtcblxuICBmb3IgKDsgaW5kZXggPCBtYXg7IGluZGV4KyspIHtcbiAgICBjaCA9IGRhdGFbaW5kZXhdO1xuICAgIGlmIChjaCA9PT0gJ18nKSBjb250aW51ZTtcbiAgICBpZiAoIWlzRGVjQ29kZShkYXRhLmNoYXJDb2RlQXQoaW5kZXgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYXNEaWdpdHMgPSB0cnVlO1xuICB9XG5cbiAgLy8gU2hvdWxkIGhhdmUgZGlnaXRzIGFuZCBzaG91bGQgbm90IGVuZCB3aXRoIGBfYFxuICBpZiAoIWhhc0RpZ2l0cyB8fCBjaCA9PT0gJ18nKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxJbnRlZ2VyKGRhdGEpIHtcbiAgdmFyIHZhbHVlID0gZGF0YSwgc2lnbiA9IDEsIGNoO1xuXG4gIGlmICh2YWx1ZS5pbmRleE9mKCdfJykgIT09IC0xKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9fL2csICcnKTtcbiAgfVxuXG4gIGNoID0gdmFsdWVbMF07XG5cbiAgaWYgKGNoID09PSAnLScgfHwgY2ggPT09ICcrJykge1xuICAgIGlmIChjaCA9PT0gJy0nKSBzaWduID0gLTE7XG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcbiAgICBjaCA9IHZhbHVlWzBdO1xuICB9XG5cbiAgaWYgKHZhbHVlID09PSAnMCcpIHJldHVybiAwO1xuXG4gIGlmIChjaCA9PT0gJzAnKSB7XG4gICAgaWYgKHZhbHVlWzFdID09PSAnYicpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDIpO1xuICAgIGlmICh2YWx1ZVsxXSA9PT0gJ3gnKSByZXR1cm4gc2lnbiAqIHBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCAxNik7XG4gICAgaWYgKHZhbHVlWzFdID09PSAnbycpIHJldHVybiBzaWduICogcGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIDgpO1xuICB9XG5cbiAgcmV0dXJuIHNpZ24gKiBwYXJzZUludCh2YWx1ZSwgMTApO1xufVxuXG5mdW5jdGlvbiBpc0ludGVnZXIob2JqZWN0KSB7XG4gIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkpID09PSAnW29iamVjdCBOdW1iZXJdJyAmJlxuICAgICAgICAgKG9iamVjdCAlIDEgPT09IDAgJiYgIWNvbW1vbi5pc05lZ2F0aXZlWmVybyhvYmplY3QpKTtcbn1cblxudmFyIGludCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjppbnQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEludGVnZXIsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbEludGVnZXIsXG4gIHByZWRpY2F0ZTogaXNJbnRlZ2VyLFxuICByZXByZXNlbnQ6IHtcbiAgICBiaW5hcnk6ICAgICAgZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqID49IDAgPyAnMGInICsgb2JqLnRvU3RyaW5nKDIpIDogJy0wYicgKyBvYmoudG9TdHJpbmcoMikuc2xpY2UoMSk7IH0sXG4gICAgb2N0YWw6ICAgICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiA+PSAwID8gJzBvJyAgKyBvYmoudG9TdHJpbmcoOCkgOiAnLTBvJyAgKyBvYmoudG9TdHJpbmcoOCkuc2xpY2UoMSk7IH0sXG4gICAgZGVjaW1hbDogICAgIGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iai50b1N0cmluZygxMCk7IH0sXG4gICAgLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuICAgIGhleGFkZWNpbWFsOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogPj0gMCA/ICcweCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgOiAgJy0weCcgKyBvYmoudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkuc2xpY2UoMSk7IH1cbiAgfSxcbiAgZGVmYXVsdFN0eWxlOiAnZGVjaW1hbCcsXG4gIHN0eWxlQWxpYXNlczoge1xuICAgIGJpbmFyeTogICAgICBbIDIsICAnYmluJyBdLFxuICAgIG9jdGFsOiAgICAgICBbIDgsICAnb2N0JyBdLFxuICAgIGRlY2ltYWw6ICAgICBbIDEwLCAnZGVjJyBdLFxuICAgIGhleGFkZWNpbWFsOiBbIDE2LCAnaGV4JyBdXG4gIH1cbn0pO1xuXG52YXIgWUFNTF9GTE9BVF9QQVRURVJOID0gbmV3IFJlZ0V4cChcbiAgLy8gMi41ZTQsIDIuNSBhbmQgaW50ZWdlcnNcbiAgJ14oPzpbLStdPyg/OlswLTldWzAtOV9dKikoPzpcXFxcLlswLTlfXSopPyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIC4yZTQsIC4yXG4gIC8vIHNwZWNpYWwgY2FzZSwgc2VlbXMgbm90IGZyb20gc3BlY1xuICAnfFxcXFwuWzAtOV9dKyg/OltlRV1bLStdP1swLTldKyk/JyArXG4gIC8vIC5pbmZcbiAgJ3xbLStdP1xcXFwuKD86aW5mfEluZnxJTkYpJyArXG4gIC8vIC5uYW5cbiAgJ3xcXFxcLig/Om5hbnxOYU58TkFOKSkkJyk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sRmxvYXQoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICghWUFNTF9GTE9BVF9QQVRURVJOLnRlc3QoZGF0YSkgfHxcbiAgICAgIC8vIFF1aWNrIGhhY2sgdG8gbm90IGFsbG93IGludGVnZXJzIGVuZCB3aXRoIGBfYFxuICAgICAgLy8gUHJvYmFibHkgc2hvdWxkIHVwZGF0ZSByZWdleHAgJiBjaGVjayBzcGVlZFxuICAgICAgZGF0YVtkYXRhLmxlbmd0aCAtIDFdID09PSAnXycpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY29uc3RydWN0WWFtbEZsb2F0KGRhdGEpIHtcbiAgdmFyIHZhbHVlLCBzaWduO1xuXG4gIHZhbHVlICA9IGRhdGEucmVwbGFjZSgvXy9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgc2lnbiAgID0gdmFsdWVbMF0gPT09ICctJyA/IC0xIDogMTtcblxuICBpZiAoJystJy5pbmRleE9mKHZhbHVlWzBdKSA+PSAwKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gJy5pbmYnKSB7XG4gICAgcmV0dXJuIChzaWduID09PSAxKSA/IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSA6IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcblxuICB9IGVsc2UgaWYgKHZhbHVlID09PSAnLm5hbicpIHtcbiAgICByZXR1cm4gTmFOO1xuICB9XG4gIHJldHVybiBzaWduICogcGFyc2VGbG9hdCh2YWx1ZSwgMTApO1xufVxuXG5cbnZhciBTQ0lFTlRJRklDX1dJVEhPVVRfRE9UID0gL15bLStdP1swLTldK2UvO1xuXG5mdW5jdGlvbiByZXByZXNlbnRZYW1sRmxvYXQob2JqZWN0LCBzdHlsZSkge1xuICB2YXIgcmVzO1xuXG4gIGlmIChpc05hTihvYmplY3QpKSB7XG4gICAgc3dpdGNoIChzdHlsZSkge1xuICAgICAgY2FzZSAnbG93ZXJjYXNlJzogcmV0dXJuICcubmFuJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLk5BTic7XG4gICAgICBjYXNlICdjYW1lbGNhc2UnOiByZXR1cm4gJy5OYU4nO1xuICAgIH1cbiAgfSBlbHNlIGlmIChOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFkgPT09IG9iamVjdCkge1xuICAgIHN3aXRjaCAoc3R5bGUpIHtcbiAgICAgIGNhc2UgJ2xvd2VyY2FzZSc6IHJldHVybiAnLmluZic7XG4gICAgICBjYXNlICd1cHBlcmNhc2UnOiByZXR1cm4gJy5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICcuSW5mJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZID09PSBvYmplY3QpIHtcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlICdsb3dlcmNhc2UnOiByZXR1cm4gJy0uaW5mJztcbiAgICAgIGNhc2UgJ3VwcGVyY2FzZSc6IHJldHVybiAnLS5JTkYnO1xuICAgICAgY2FzZSAnY2FtZWxjYXNlJzogcmV0dXJuICctLkluZic7XG4gICAgfVxuICB9IGVsc2UgaWYgKGNvbW1vbi5pc05lZ2F0aXZlWmVybyhvYmplY3QpKSB7XG4gICAgcmV0dXJuICctMC4wJztcbiAgfVxuXG4gIHJlcyA9IG9iamVjdC50b1N0cmluZygxMCk7XG5cbiAgLy8gSlMgc3RyaW5naWZpZXIgY2FuIGJ1aWxkIHNjaWVudGlmaWMgZm9ybWF0IHdpdGhvdXQgZG90czogNWUtMTAwLFxuICAvLyB3aGlsZSBZQU1MIHJlcXVyZXMgZG90OiA1LmUtMTAwLiBGaXggaXQgd2l0aCBzaW1wbGUgaGFja1xuXG4gIHJldHVybiBTQ0lFTlRJRklDX1dJVEhPVVRfRE9ULnRlc3QocmVzKSA/IHJlcy5yZXBsYWNlKCdlJywgJy5lJykgOiByZXM7XG59XG5cbmZ1bmN0aW9uIGlzRmxvYXQob2JqZWN0KSB7XG4gIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IE51bWJlcl0nKSAmJlxuICAgICAgICAgKG9iamVjdCAlIDEgIT09IDAgfHwgY29tbW9uLmlzTmVnYXRpdmVaZXJvKG9iamVjdCkpO1xufVxuXG52YXIgZmxvYXQgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6ZmxvYXQnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbEZsb2F0LFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxGbG9hdCxcbiAgcHJlZGljYXRlOiBpc0Zsb2F0LFxuICByZXByZXNlbnQ6IHJlcHJlc2VudFlhbWxGbG9hdCxcbiAgZGVmYXVsdFN0eWxlOiAnbG93ZXJjYXNlJ1xufSk7XG5cbnZhciBqc29uID0gZmFpbHNhZmUuZXh0ZW5kKHtcbiAgaW1wbGljaXQ6IFtcbiAgICBfbnVsbCxcbiAgICBib29sLFxuICAgIGludCxcbiAgICBmbG9hdFxuICBdXG59KTtcblxudmFyIGNvcmUgPSBqc29uO1xuXG52YXIgWUFNTF9EQVRFX1JFR0VYUCA9IG5ldyBSZWdFeHAoXG4gICdeKFswLTldWzAtOV1bMC05XVswLTldKScgICAgICAgICAgKyAvLyBbMV0geWVhclxuICAnLShbMC05XVswLTldKScgICAgICAgICAgICAgICAgICAgICsgLy8gWzJdIG1vbnRoXG4gICctKFswLTldWzAtOV0pJCcpOyAgICAgICAgICAgICAgICAgICAvLyBbM10gZGF5XG5cbnZhciBZQU1MX1RJTUVTVEFNUF9SRUdFWFAgPSBuZXcgUmVnRXhwKFxuICAnXihbMC05XVswLTldWzAtOV1bMC05XSknICAgICAgICAgICsgLy8gWzFdIHllYXJcbiAgJy0oWzAtOV1bMC05XT8pJyAgICAgICAgICAgICAgICAgICArIC8vIFsyXSBtb250aFxuICAnLShbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICsgLy8gWzNdIGRheVxuICAnKD86W1R0XXxbIFxcXFx0XSspJyAgICAgICAgICAgICAgICAgKyAvLyAuLi5cbiAgJyhbMC05XVswLTldPyknICAgICAgICAgICAgICAgICAgICArIC8vIFs0XSBob3VyXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNV0gbWludXRlXG4gICc6KFswLTldWzAtOV0pJyAgICAgICAgICAgICAgICAgICAgKyAvLyBbNl0gc2Vjb25kXG4gICcoPzpcXFxcLihbMC05XSopKT8nICAgICAgICAgICAgICAgICArIC8vIFs3XSBmcmFjdGlvblxuICAnKD86WyBcXFxcdF0qKFp8KFstK10pKFswLTldWzAtOV0/KScgKyAvLyBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyXG4gICcoPzo6KFswLTldWzAtOV0pKT8pKT8kJyk7ICAgICAgICAgICAvLyBbMTFdIHR6X21pbnV0ZVxuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFRpbWVzdGFtcChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIGlmIChZQU1MX0RBVEVfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICBpZiAoWUFNTF9USU1FU1RBTVBfUkVHRVhQLmV4ZWMoZGF0YSkgIT09IG51bGwpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAoZGF0YSkge1xuICB2YXIgbWF0Y2gsIHllYXIsIG1vbnRoLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBmcmFjdGlvbiA9IDAsXG4gICAgICBkZWx0YSA9IG51bGwsIHR6X2hvdXIsIHR6X21pbnV0ZSwgZGF0ZTtcblxuICBtYXRjaCA9IFlBTUxfREFURV9SRUdFWFAuZXhlYyhkYXRhKTtcbiAgaWYgKG1hdGNoID09PSBudWxsKSBtYXRjaCA9IFlBTUxfVElNRVNUQU1QX1JFR0VYUC5leGVjKGRhdGEpO1xuXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdEYXRlIHJlc29sdmUgZXJyb3InKTtcblxuICAvLyBtYXRjaDogWzFdIHllYXIgWzJdIG1vbnRoIFszXSBkYXlcblxuICB5ZWFyID0gKyhtYXRjaFsxXSk7XG4gIG1vbnRoID0gKyhtYXRjaFsyXSkgLSAxOyAvLyBKUyBtb250aCBzdGFydHMgd2l0aCAwXG4gIGRheSA9ICsobWF0Y2hbM10pO1xuXG4gIGlmICghbWF0Y2hbNF0pIHsgLy8gbm8gaG91clxuICAgIHJldHVybiBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5KSk7XG4gIH1cblxuICAvLyBtYXRjaDogWzRdIGhvdXIgWzVdIG1pbnV0ZSBbNl0gc2Vjb25kIFs3XSBmcmFjdGlvblxuXG4gIGhvdXIgPSArKG1hdGNoWzRdKTtcbiAgbWludXRlID0gKyhtYXRjaFs1XSk7XG4gIHNlY29uZCA9ICsobWF0Y2hbNl0pO1xuXG4gIGlmIChtYXRjaFs3XSkge1xuICAgIGZyYWN0aW9uID0gbWF0Y2hbN10uc2xpY2UoMCwgMyk7XG4gICAgd2hpbGUgKGZyYWN0aW9uLmxlbmd0aCA8IDMpIHsgLy8gbWlsbGktc2Vjb25kc1xuICAgICAgZnJhY3Rpb24gKz0gJzAnO1xuICAgIH1cbiAgICBmcmFjdGlvbiA9ICtmcmFjdGlvbjtcbiAgfVxuXG4gIC8vIG1hdGNoOiBbOF0gdHogWzldIHR6X3NpZ24gWzEwXSB0el9ob3VyIFsxMV0gdHpfbWludXRlXG5cbiAgaWYgKG1hdGNoWzldKSB7XG4gICAgdHpfaG91ciA9ICsobWF0Y2hbMTBdKTtcbiAgICB0el9taW51dGUgPSArKG1hdGNoWzExXSB8fCAwKTtcbiAgICBkZWx0YSA9ICh0el9ob3VyICogNjAgKyB0el9taW51dGUpICogNjAwMDA7IC8vIGRlbHRhIGluIG1pbGktc2Vjb25kc1xuICAgIGlmIChtYXRjaFs5XSA9PT0gJy0nKSBkZWx0YSA9IC1kZWx0YTtcbiAgfVxuXG4gIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgZnJhY3Rpb24pKTtcblxuICBpZiAoZGVsdGEpIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSAtIGRlbHRhKTtcblxuICByZXR1cm4gZGF0ZTtcbn1cblxuZnVuY3Rpb24gcmVwcmVzZW50WWFtbFRpbWVzdGFtcChvYmplY3QgLyosIHN0eWxlKi8pIHtcbiAgcmV0dXJuIG9iamVjdC50b0lTT1N0cmluZygpO1xufVxuXG52YXIgdGltZXN0YW1wID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOnRpbWVzdGFtcCcsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sVGltZXN0YW1wLFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxUaW1lc3RhbXAsXG4gIGluc3RhbmNlT2Y6IERhdGUsXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbFRpbWVzdGFtcFxufSk7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sTWVyZ2UoZGF0YSkge1xuICByZXR1cm4gZGF0YSA9PT0gJzw8JyB8fCBkYXRhID09PSBudWxsO1xufVxuXG52YXIgbWVyZ2UgPSBuZXcgdHlwZSgndGFnOnlhbWwub3JnLDIwMDI6bWVyZ2UnLCB7XG4gIGtpbmQ6ICdzY2FsYXInLFxuICByZXNvbHZlOiByZXNvbHZlWWFtbE1lcmdlXG59KTtcblxuLyplc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlKi9cblxuXG5cblxuXG4vLyBbIDY0LCA2NSwgNjYgXSAtPiBbIHBhZGRpbmcsIENSLCBMRiBdXG52YXIgQkFTRTY0X01BUCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPVxcblxccic7XG5cblxuZnVuY3Rpb24gcmVzb2x2ZVlhbWxCaW5hcnkoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBjb2RlLCBpZHgsIGJpdGxlbiA9IDAsIG1heCA9IGRhdGEubGVuZ3RoLCBtYXAgPSBCQVNFNjRfTUFQO1xuXG4gIC8vIENvbnZlcnQgb25lIGJ5IG9uZS5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgY29kZSA9IG1hcC5pbmRleE9mKGRhdGEuY2hhckF0KGlkeCkpO1xuXG4gICAgLy8gU2tpcCBDUi9MRlxuICAgIGlmIChjb2RlID4gNjQpIGNvbnRpbnVlO1xuXG4gICAgLy8gRmFpbCBvbiBpbGxlZ2FsIGNoYXJhY3RlcnNcbiAgICBpZiAoY29kZSA8IDApIHJldHVybiBmYWxzZTtcblxuICAgIGJpdGxlbiArPSA2O1xuICB9XG5cbiAgLy8gSWYgdGhlcmUgYXJlIGFueSBiaXRzIGxlZnQsIHNvdXJjZSB3YXMgY29ycnVwdGVkXG4gIHJldHVybiAoYml0bGVuICUgOCkgPT09IDA7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxCaW5hcnkoZGF0YSkge1xuICB2YXIgaWR4LCB0YWlsYml0cyxcbiAgICAgIGlucHV0ID0gZGF0YS5yZXBsYWNlKC9bXFxyXFxuPV0vZywgJycpLCAvLyByZW1vdmUgQ1IvTEYgJiBwYWRkaW5nIHRvIHNpbXBsaWZ5IHNjYW5cbiAgICAgIG1heCA9IGlucHV0Lmxlbmd0aCxcbiAgICAgIG1hcCA9IEJBU0U2NF9NQVAsXG4gICAgICBiaXRzID0gMCxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIC8vIENvbGxlY3QgYnkgNio0IGJpdHMgKDMgYnl0ZXMpXG5cbiAgZm9yIChpZHggPSAwOyBpZHggPCBtYXg7IGlkeCsrKSB7XG4gICAgaWYgKChpZHggJSA0ID09PSAwKSAmJiBpZHgpIHtcbiAgICAgIHJlc3VsdC5wdXNoKChiaXRzID4+IDE2KSAmIDB4RkYpO1xuICAgICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gOCkgJiAweEZGKTtcbiAgICAgIHJlc3VsdC5wdXNoKGJpdHMgJiAweEZGKTtcbiAgICB9XG5cbiAgICBiaXRzID0gKGJpdHMgPDwgNikgfCBtYXAuaW5kZXhPZihpbnB1dC5jaGFyQXQoaWR4KSk7XG4gIH1cblxuICAvLyBEdW1wIHRhaWxcblxuICB0YWlsYml0cyA9IChtYXggJSA0KSAqIDY7XG5cbiAgaWYgKHRhaWxiaXRzID09PSAwKSB7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTYpICYgMHhGRik7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gOCkgJiAweEZGKTtcbiAgICByZXN1bHQucHVzaChiaXRzICYgMHhGRik7XG4gIH0gZWxzZSBpZiAodGFpbGJpdHMgPT09IDE4KSB7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMTApICYgMHhGRik7XG4gICAgcmVzdWx0LnB1c2goKGJpdHMgPj4gMikgJiAweEZGKTtcbiAgfSBlbHNlIGlmICh0YWlsYml0cyA9PT0gMTIpIHtcbiAgICByZXN1bHQucHVzaCgoYml0cyA+PiA0KSAmIDB4RkYpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHJlc3VsdCk7XG59XG5cbmZ1bmN0aW9uIHJlcHJlc2VudFlhbWxCaW5hcnkob2JqZWN0IC8qLCBzdHlsZSovKSB7XG4gIHZhciByZXN1bHQgPSAnJywgYml0cyA9IDAsIGlkeCwgdGFpbCxcbiAgICAgIG1heCA9IG9iamVjdC5sZW5ndGgsXG4gICAgICBtYXAgPSBCQVNFNjRfTUFQO1xuXG4gIC8vIENvbnZlcnQgZXZlcnkgdGhyZWUgYnl0ZXMgdG8gNCBBU0NJSSBjaGFyYWN0ZXJzLlxuXG4gIGZvciAoaWR4ID0gMDsgaWR4IDwgbWF4OyBpZHgrKykge1xuICAgIGlmICgoaWR4ICUgMyA9PT0gMCkgJiYgaWR4KSB7XG4gICAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiAxMikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNikgJiAweDNGXTtcbiAgICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICAgIH1cblxuICAgIGJpdHMgPSAoYml0cyA8PCA4KSArIG9iamVjdFtpZHhdO1xuICB9XG5cbiAgLy8gRHVtcCB0YWlsXG5cbiAgdGFpbCA9IG1heCAlIDM7XG5cbiAgaWYgKHRhaWwgPT09IDApIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDE4KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMTIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFsoYml0cyA+PiA2KSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbYml0cyAmIDB4M0ZdO1xuICB9IGVsc2UgaWYgKHRhaWwgPT09IDIpIHtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzID4+IDEwKSAmIDB4M0ZdO1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gNCkgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDIpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH0gZWxzZSBpZiAodGFpbCA9PT0gMSkge1xuICAgIHJlc3VsdCArPSBtYXBbKGJpdHMgPj4gMikgJiAweDNGXTtcbiAgICByZXN1bHQgKz0gbWFwWyhiaXRzIDw8IDQpICYgMHgzRl07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gICAgcmVzdWx0ICs9IG1hcFs2NF07XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAgJ1tvYmplY3QgVWludDhBcnJheV0nO1xufVxuXG52YXIgYmluYXJ5ID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOmJpbmFyeScsIHtcbiAga2luZDogJ3NjYWxhcicsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sQmluYXJ5LFxuICBjb25zdHJ1Y3Q6IGNvbnN0cnVjdFlhbWxCaW5hcnksXG4gIHByZWRpY2F0ZTogaXNCaW5hcnksXG4gIHJlcHJlc2VudDogcmVwcmVzZW50WWFtbEJpbmFyeVxufSk7XG5cbnZhciBfaGFzT3duUHJvcGVydHkkMyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgX3RvU3RyaW5nJDIgICAgICAgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbE9tYXAoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIG9iamVjdEtleXMgPSBbXSwgaW5kZXgsIGxlbmd0aCwgcGFpciwgcGFpcktleSwgcGFpckhhc0tleSxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgcGFpciA9IG9iamVjdFtpbmRleF07XG4gICAgcGFpckhhc0tleSA9IGZhbHNlO1xuXG4gICAgaWYgKF90b1N0cmluZyQyLmNhbGwocGFpcikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHBhaXJLZXkgaW4gcGFpcikge1xuICAgICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQzLmNhbGwocGFpciwgcGFpcktleSkpIHtcbiAgICAgICAgaWYgKCFwYWlySGFzS2V5KSBwYWlySGFzS2V5ID0gdHJ1ZTtcbiAgICAgICAgZWxzZSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYWlySGFzS2V5KSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAob2JqZWN0S2V5cy5pbmRleE9mKHBhaXJLZXkpID09PSAtMSkgb2JqZWN0S2V5cy5wdXNoKHBhaXJLZXkpO1xuICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxPbWFwKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgIT09IG51bGwgPyBkYXRhIDogW107XG59XG5cbnZhciBvbWFwID0gbmV3IHR5cGUoJ3RhZzp5YW1sLm9yZywyMDAyOm9tYXAnLCB7XG4gIGtpbmQ6ICdzZXF1ZW5jZScsXG4gIHJlc29sdmU6IHJlc29sdmVZYW1sT21hcCxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sT21hcFxufSk7XG5cbnZhciBfdG9TdHJpbmckMSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIHJlc29sdmVZYW1sUGFpcnMoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG5cbiAgdmFyIGluZGV4LCBsZW5ndGgsIHBhaXIsIGtleXMsIHJlc3VsdCxcbiAgICAgIG9iamVjdCA9IGRhdGE7XG5cbiAgcmVzdWx0ID0gbmV3IEFycmF5KG9iamVjdC5sZW5ndGgpO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBvYmplY3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXIgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAgaWYgKF90b1N0cmluZyQxLmNhbGwocGFpcikgIT09ICdbb2JqZWN0IE9iamVjdF0nKSByZXR1cm4gZmFsc2U7XG5cbiAgICBrZXlzID0gT2JqZWN0LmtleXMocGFpcik7XG5cbiAgICBpZiAoa2V5cy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcblxuICAgIHJlc3VsdFtpbmRleF0gPSBbIGtleXNbMF0sIHBhaXJba2V5c1swXV0gXTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjb25zdHJ1Y3RZYW1sUGFpcnMoZGF0YSkge1xuICBpZiAoZGF0YSA9PT0gbnVsbCkgcmV0dXJuIFtdO1xuXG4gIHZhciBpbmRleCwgbGVuZ3RoLCBwYWlyLCBrZXlzLCByZXN1bHQsXG4gICAgICBvYmplY3QgPSBkYXRhO1xuXG4gIHJlc3VsdCA9IG5ldyBBcnJheShvYmplY3QubGVuZ3RoKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBwYWlyID0gb2JqZWN0W2luZGV4XTtcblxuICAgIGtleXMgPSBPYmplY3Qua2V5cyhwYWlyKTtcblxuICAgIHJlc3VsdFtpbmRleF0gPSBbIGtleXNbMF0sIHBhaXJba2V5c1swXV0gXTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBwYWlycyA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpwYWlycycsIHtcbiAga2luZDogJ3NlcXVlbmNlJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxQYWlycyxcbiAgY29uc3RydWN0OiBjb25zdHJ1Y3RZYW1sUGFpcnNcbn0pO1xuXG52YXIgX2hhc093blByb3BlcnR5JDIgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiByZXNvbHZlWWFtbFNldChkYXRhKSB7XG4gIGlmIChkYXRhID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcblxuICB2YXIga2V5LCBvYmplY3QgPSBkYXRhO1xuXG4gIGZvciAoa2V5IGluIG9iamVjdCkge1xuICAgIGlmIChfaGFzT3duUHJvcGVydHkkMi5jYWxsKG9iamVjdCwga2V5KSkge1xuICAgICAgaWYgKG9iamVjdFtrZXldICE9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbnN0cnVjdFlhbWxTZXQoZGF0YSkge1xuICByZXR1cm4gZGF0YSAhPT0gbnVsbCA/IGRhdGEgOiB7fTtcbn1cblxudmFyIHNldCA9IG5ldyB0eXBlKCd0YWc6eWFtbC5vcmcsMjAwMjpzZXQnLCB7XG4gIGtpbmQ6ICdtYXBwaW5nJyxcbiAgcmVzb2x2ZTogcmVzb2x2ZVlhbWxTZXQsXG4gIGNvbnN0cnVjdDogY29uc3RydWN0WWFtbFNldFxufSk7XG5cbnZhciBfZGVmYXVsdCA9IGNvcmUuZXh0ZW5kKHtcbiAgaW1wbGljaXQ6IFtcbiAgICB0aW1lc3RhbXAsXG4gICAgbWVyZ2VcbiAgXSxcbiAgZXhwbGljaXQ6IFtcbiAgICBiaW5hcnksXG4gICAgb21hcCxcbiAgICBwYWlycyxcbiAgICBzZXRcbiAgXVxufSk7XG5cbi8qZXNsaW50LWRpc2FibGUgbWF4LWxlbixuby11c2UtYmVmb3JlLWRlZmluZSovXG5cblxuXG5cblxuXG5cbnZhciBfaGFzT3duUHJvcGVydHkkMSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cblxudmFyIENPTlRFWFRfRkxPV19JTiAgID0gMTtcbnZhciBDT05URVhUX0ZMT1dfT1VUICA9IDI7XG52YXIgQ09OVEVYVF9CTE9DS19JTiAgPSAzO1xudmFyIENPTlRFWFRfQkxPQ0tfT1VUID0gNDtcblxuXG52YXIgQ0hPTVBJTkdfQ0xJUCAgPSAxO1xudmFyIENIT01QSU5HX1NUUklQID0gMjtcbnZhciBDSE9NUElOR19LRUVQICA9IDM7XG5cblxudmFyIFBBVFRFUk5fTk9OX1BSSU5UQUJMRSAgICAgICAgID0gL1tcXHgwMC1cXHgwOFxceDBCXFx4MENcXHgwRS1cXHgxRlxceDdGLVxceDg0XFx4ODYtXFx4OUZcXHVGRkZFXFx1RkZGRl18W1xcdUQ4MDAtXFx1REJGRl0oPyFbXFx1REMwMC1cXHVERkZGXSl8KD86W15cXHVEODAwLVxcdURCRkZdfF4pW1xcdURDMDAtXFx1REZGRl0vO1xudmFyIFBBVFRFUk5fTk9OX0FTQ0lJX0xJTkVfQlJFQUtTID0gL1tcXHg4NVxcdTIwMjhcXHUyMDI5XS87XG52YXIgUEFUVEVSTl9GTE9XX0lORElDQVRPUlMgICAgICAgPSAvWyxcXFtcXF1cXHtcXH1dLztcbnZhciBQQVRURVJOX1RBR19IQU5ETEUgICAgICAgICAgICA9IC9eKD86IXwhIXwhW2EtelxcLV0rISkkL2k7XG52YXIgUEFUVEVSTl9UQUdfVVJJICAgICAgICAgICAgICAgPSAvXig/OiF8W14sXFxbXFxdXFx7XFx9XSkoPzolWzAtOWEtZl17Mn18WzAtOWEtelxcLSM7XFwvXFw/OkAmPVxcK1xcJCxfXFwuIX5cXConXFwoXFwpXFxbXFxdXSkqJC9pO1xuXG5cbmZ1bmN0aW9uIF9jbGFzcyhvYmopIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopOyB9XG5cbmZ1bmN0aW9uIGlzX0VPTChjKSB7XG4gIHJldHVybiAoYyA9PT0gMHgwQS8qIExGICovKSB8fCAoYyA9PT0gMHgwRC8qIENSICovKTtcbn1cblxuZnVuY3Rpb24gaXNfV0hJVEVfU1BBQ0UoYykge1xuICByZXR1cm4gKGMgPT09IDB4MDkvKiBUYWIgKi8pIHx8IChjID09PSAweDIwLyogU3BhY2UgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19XU19PUl9FT0woYykge1xuICByZXR1cm4gKGMgPT09IDB4MDkvKiBUYWIgKi8pIHx8XG4gICAgICAgICAoYyA9PT0gMHgyMC8qIFNwYWNlICovKSB8fFxuICAgICAgICAgKGMgPT09IDB4MEEvKiBMRiAqLykgfHxcbiAgICAgICAgIChjID09PSAweDBELyogQ1IgKi8pO1xufVxuXG5mdW5jdGlvbiBpc19GTE9XX0lORElDQVRPUihjKSB7XG4gIHJldHVybiBjID09PSAweDJDLyogLCAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg1Qi8qIFsgKi8gfHxcbiAgICAgICAgIGMgPT09IDB4NUQvKiBdICovIHx8XG4gICAgICAgICBjID09PSAweDdCLyogeyAqLyB8fFxuICAgICAgICAgYyA9PT0gMHg3RC8qIH0gKi87XG59XG5cbmZ1bmN0aW9uIGZyb21IZXhDb2RlKGMpIHtcbiAgdmFyIGxjO1xuXG4gIGlmICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKSB7XG4gICAgcmV0dXJuIGMgLSAweDMwO1xuICB9XG5cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlKi9cbiAgbGMgPSBjIHwgMHgyMDtcblxuICBpZiAoKDB4NjEvKiBhICovIDw9IGxjKSAmJiAobGMgPD0gMHg2Ni8qIGYgKi8pKSB7XG4gICAgcmV0dXJuIGxjIC0gMHg2MSArIDEwO1xuICB9XG5cbiAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVkSGV4TGVuKGMpIHtcbiAgaWYgKGMgPT09IDB4NzgvKiB4ICovKSB7IHJldHVybiAyOyB9XG4gIGlmIChjID09PSAweDc1LyogdSAqLykgeyByZXR1cm4gNDsgfVxuICBpZiAoYyA9PT0gMHg1NS8qIFUgKi8pIHsgcmV0dXJuIDg7IH1cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGZyb21EZWNpbWFsQ29kZShjKSB7XG4gIGlmICgoMHgzMC8qIDAgKi8gPD0gYykgJiYgKGMgPD0gMHgzOS8qIDkgKi8pKSB7XG4gICAgcmV0dXJuIGMgLSAweDMwO1xuICB9XG5cbiAgcmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBzaW1wbGVFc2NhcGVTZXF1ZW5jZShjKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIGluZGVudCAqL1xuICByZXR1cm4gKGMgPT09IDB4MzAvKiAwICovKSA/ICdcXHgwMCcgOlxuICAgICAgICAoYyA9PT0gMHg2MS8qIGEgKi8pID8gJ1xceDA3JyA6XG4gICAgICAgIChjID09PSAweDYyLyogYiAqLykgPyAnXFx4MDgnIDpcbiAgICAgICAgKGMgPT09IDB4NzQvKiB0ICovKSA/ICdcXHgwOScgOlxuICAgICAgICAoYyA9PT0gMHgwOS8qIFRhYiAqLykgPyAnXFx4MDknIDpcbiAgICAgICAgKGMgPT09IDB4NkUvKiBuICovKSA/ICdcXHgwQScgOlxuICAgICAgICAoYyA9PT0gMHg3Ni8qIHYgKi8pID8gJ1xceDBCJyA6XG4gICAgICAgIChjID09PSAweDY2LyogZiAqLykgPyAnXFx4MEMnIDpcbiAgICAgICAgKGMgPT09IDB4NzIvKiByICovKSA/ICdcXHgwRCcgOlxuICAgICAgICAoYyA9PT0gMHg2NS8qIGUgKi8pID8gJ1xceDFCJyA6XG4gICAgICAgIChjID09PSAweDIwLyogU3BhY2UgKi8pID8gJyAnIDpcbiAgICAgICAgKGMgPT09IDB4MjIvKiBcIiAqLykgPyAnXFx4MjInIDpcbiAgICAgICAgKGMgPT09IDB4MkYvKiAvICovKSA/ICcvJyA6XG4gICAgICAgIChjID09PSAweDVDLyogXFwgKi8pID8gJ1xceDVDJyA6XG4gICAgICAgIChjID09PSAweDRFLyogTiAqLykgPyAnXFx4ODUnIDpcbiAgICAgICAgKGMgPT09IDB4NUYvKiBfICovKSA/ICdcXHhBMCcgOlxuICAgICAgICAoYyA9PT0gMHg0Qy8qIEwgKi8pID8gJ1xcdTIwMjgnIDpcbiAgICAgICAgKGMgPT09IDB4NTAvKiBQICovKSA/ICdcXHUyMDI5JyA6ICcnO1xufVxuXG5mdW5jdGlvbiBjaGFyRnJvbUNvZGVwb2ludChjKSB7XG4gIGlmIChjIDw9IDB4RkZGRikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICB9XG4gIC8vIEVuY29kZSBVVEYtMTYgc3Vycm9nYXRlIHBhaXJcbiAgLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVVRGLTE2I0NvZGVfcG9pbnRzX1UuMkIwMTAwMDBfdG9fVS4yQjEwRkZGRlxuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAoKGMgLSAweDAxMDAwMCkgPj4gMTApICsgMHhEODAwLFxuICAgICgoYyAtIDB4MDEwMDAwKSAmIDB4MDNGRikgKyAweERDMDBcbiAgKTtcbn1cblxuLy8gc2V0IGEgcHJvcGVydHkgb2YgYSBsaXRlcmFsIG9iamVjdCwgd2hpbGUgcHJvdGVjdGluZyBhZ2FpbnN0IHByb3RvdHlwZSBwb2xsdXRpb24sXG4vLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVjYS9qcy15YW1sL2lzc3Vlcy8xNjQgZm9yIG1vcmUgZGV0YWlsc1xuZnVuY3Rpb24gc2V0UHJvcGVydHkob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIC8vIHVzZWQgZm9yIHRoaXMgc3BlY2lmaWMga2V5IG9ubHkgYmVjYXVzZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgaXMgc2xvd1xuICBpZiAoa2V5ID09PSAnX19wcm90b19fJykge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG52YXIgc2ltcGxlRXNjYXBlQ2hlY2sgPSBuZXcgQXJyYXkoMjU2KTsgLy8gaW50ZWdlciwgZm9yIGZhc3QgYWNjZXNzXG52YXIgc2ltcGxlRXNjYXBlTWFwID0gbmV3IEFycmF5KDI1Nik7XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIHNpbXBsZUVzY2FwZUNoZWNrW2ldID0gc2ltcGxlRXNjYXBlU2VxdWVuY2UoaSkgPyAxIDogMDtcbiAgc2ltcGxlRXNjYXBlTWFwW2ldID0gc2ltcGxlRXNjYXBlU2VxdWVuY2UoaSk7XG59XG5cblxuZnVuY3Rpb24gU3RhdGUkMShpbnB1dCwgb3B0aW9ucykge1xuICB0aGlzLmlucHV0ID0gaW5wdXQ7XG5cbiAgdGhpcy5maWxlbmFtZSAgPSBvcHRpb25zWydmaWxlbmFtZSddICB8fCBudWxsO1xuICB0aGlzLnNjaGVtYSAgICA9IG9wdGlvbnNbJ3NjaGVtYSddICAgIHx8IF9kZWZhdWx0O1xuICB0aGlzLm9uV2FybmluZyA9IG9wdGlvbnNbJ29uV2FybmluZyddIHx8IG51bGw7XG4gIC8vIChIaWRkZW4pIFJlbW92ZT8gbWFrZXMgdGhlIGxvYWRlciB0byBleHBlY3QgWUFNTCAxLjEgZG9jdW1lbnRzXG4gIC8vIGlmIHN1Y2ggZG9jdW1lbnRzIGhhdmUgbm8gZXhwbGljaXQgJVlBTUwgZGlyZWN0aXZlXG4gIHRoaXMubGVnYWN5ICAgID0gb3B0aW9uc1snbGVnYWN5J10gICAgfHwgZmFsc2U7XG5cbiAgdGhpcy5qc29uICAgICAgPSBvcHRpb25zWydqc29uJ10gICAgICB8fCBmYWxzZTtcbiAgdGhpcy5saXN0ZW5lciAgPSBvcHRpb25zWydsaXN0ZW5lciddICB8fCBudWxsO1xuXG4gIHRoaXMuaW1wbGljaXRUeXBlcyA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkSW1wbGljaXQ7XG4gIHRoaXMudHlwZU1hcCAgICAgICA9IHRoaXMuc2NoZW1hLmNvbXBpbGVkVHlwZU1hcDtcblxuICB0aGlzLmxlbmd0aCAgICAgPSBpbnB1dC5sZW5ndGg7XG4gIHRoaXMucG9zaXRpb24gICA9IDA7XG4gIHRoaXMubGluZSAgICAgICA9IDA7XG4gIHRoaXMubGluZVN0YXJ0ICA9IDA7XG4gIHRoaXMubGluZUluZGVudCA9IDA7XG5cbiAgLy8gcG9zaXRpb24gb2YgZmlyc3QgbGVhZGluZyB0YWIgaW4gdGhlIGN1cnJlbnQgbGluZSxcbiAgLy8gdXNlZCB0byBtYWtlIHN1cmUgdGhlcmUgYXJlIG5vIHRhYnMgaW4gdGhlIGluZGVudGF0aW9uXG4gIHRoaXMuZmlyc3RUYWJJbkxpbmUgPSAtMTtcblxuICB0aGlzLmRvY3VtZW50cyA9IFtdO1xuXG4gIC8qXG4gIHRoaXMudmVyc2lvbjtcbiAgdGhpcy5jaGVja0xpbmVCcmVha3M7XG4gIHRoaXMudGFnTWFwO1xuICB0aGlzLmFuY2hvck1hcDtcbiAgdGhpcy50YWc7XG4gIHRoaXMuYW5jaG9yO1xuICB0aGlzLmtpbmQ7XG4gIHRoaXMucmVzdWx0OyovXG5cbn1cblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVycm9yKHN0YXRlLCBtZXNzYWdlKSB7XG4gIHZhciBtYXJrID0ge1xuICAgIG5hbWU6ICAgICBzdGF0ZS5maWxlbmFtZSxcbiAgICBidWZmZXI6ICAgc3RhdGUuaW5wdXQuc2xpY2UoMCwgLTEpLCAvLyBvbWl0IHRyYWlsaW5nIFxcMFxuICAgIHBvc2l0aW9uOiBzdGF0ZS5wb3NpdGlvbixcbiAgICBsaW5lOiAgICAgc3RhdGUubGluZSxcbiAgICBjb2x1bW46ICAgc3RhdGUucG9zaXRpb24gLSBzdGF0ZS5saW5lU3RhcnRcbiAgfTtcblxuICBtYXJrLnNuaXBwZXQgPSBzbmlwcGV0KG1hcmspO1xuXG4gIHJldHVybiBuZXcgZXhjZXB0aW9uKG1lc3NhZ2UsIG1hcmspO1xufVxuXG5mdW5jdGlvbiB0aHJvd0Vycm9yKHN0YXRlLCBtZXNzYWdlKSB7XG4gIHRocm93IGdlbmVyYXRlRXJyb3Ioc3RhdGUsIG1lc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiB0aHJvd1dhcm5pbmcoc3RhdGUsIG1lc3NhZ2UpIHtcbiAgaWYgKHN0YXRlLm9uV2FybmluZykge1xuICAgIHN0YXRlLm9uV2FybmluZy5jYWxsKG51bGwsIGdlbmVyYXRlRXJyb3Ioc3RhdGUsIG1lc3NhZ2UpKTtcbiAgfVxufVxuXG5cbnZhciBkaXJlY3RpdmVIYW5kbGVycyA9IHtcblxuICBZQU1MOiBmdW5jdGlvbiBoYW5kbGVZYW1sRGlyZWN0aXZlKHN0YXRlLCBuYW1lLCBhcmdzKSB7XG5cbiAgICB2YXIgbWF0Y2gsIG1ham9yLCBtaW5vcjtcblxuICAgIGlmIChzdGF0ZS52ZXJzaW9uICE9PSBudWxsKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgJVlBTUwgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnWUFNTCBkaXJlY3RpdmUgYWNjZXB0cyBleGFjdGx5IG9uZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIG1hdGNoID0gL14oWzAtOV0rKVxcLihbMC05XSspJC8uZXhlYyhhcmdzWzBdKTtcblxuICAgIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2lsbC1mb3JtZWQgYXJndW1lbnQgb2YgdGhlIFlBTUwgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgbWFqb3IgPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgIG1pbm9yID0gcGFyc2VJbnQobWF0Y2hbMl0sIDEwKTtcblxuICAgIGlmIChtYWpvciAhPT0gMSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBZQU1MIHZlcnNpb24gb2YgdGhlIGRvY3VtZW50Jyk7XG4gICAgfVxuXG4gICAgc3RhdGUudmVyc2lvbiA9IGFyZ3NbMF07XG4gICAgc3RhdGUuY2hlY2tMaW5lQnJlYWtzID0gKG1pbm9yIDwgMik7XG5cbiAgICBpZiAobWlub3IgIT09IDEgJiYgbWlub3IgIT09IDIpIHtcbiAgICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ3Vuc3VwcG9ydGVkIFlBTUwgdmVyc2lvbiBvZiB0aGUgZG9jdW1lbnQnKTtcbiAgICB9XG4gIH0sXG5cbiAgVEFHOiBmdW5jdGlvbiBoYW5kbGVUYWdEaXJlY3RpdmUoc3RhdGUsIG5hbWUsIGFyZ3MpIHtcblxuICAgIHZhciBoYW5kbGUsIHByZWZpeDtcblxuICAgIGlmIChhcmdzLmxlbmd0aCAhPT0gMikge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ1RBRyBkaXJlY3RpdmUgYWNjZXB0cyBleGFjdGx5IHR3byBhcmd1bWVudHMnKTtcbiAgICB9XG5cbiAgICBoYW5kbGUgPSBhcmdzWzBdO1xuICAgIHByZWZpeCA9IGFyZ3NbMV07XG5cbiAgICBpZiAoIVBBVFRFUk5fVEFHX0hBTkRMRS50ZXN0KGhhbmRsZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdpbGwtZm9ybWVkIHRhZyBoYW5kbGUgKGZpcnN0IGFyZ3VtZW50KSBvZiB0aGUgVEFHIGRpcmVjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmIChfaGFzT3duUHJvcGVydHkkMS5jYWxsKHN0YXRlLnRhZ01hcCwgaGFuZGxlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZXJlIGlzIGEgcHJldmlvdXNseSBkZWNsYXJlZCBzdWZmaXggZm9yIFwiJyArIGhhbmRsZSArICdcIiB0YWcgaGFuZGxlJyk7XG4gICAgfVxuXG4gICAgaWYgKCFQQVRURVJOX1RBR19VUkkudGVzdChwcmVmaXgpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaWxsLWZvcm1lZCB0YWcgcHJlZml4IChzZWNvbmQgYXJndW1lbnQpIG9mIHRoZSBUQUcgZGlyZWN0aXZlJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByZWZpeCA9IGRlY29kZVVSSUNvbXBvbmVudChwcmVmaXgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBwcmVmaXggaXMgbWFsZm9ybWVkOiAnICsgcHJlZml4KTtcbiAgICB9XG5cbiAgICBzdGF0ZS50YWdNYXBbaGFuZGxlXSA9IHByZWZpeDtcbiAgfVxufTtcblxuXG5mdW5jdGlvbiBjYXB0dXJlU2VnbWVudChzdGF0ZSwgc3RhcnQsIGVuZCwgY2hlY2tKc29uKSB7XG4gIHZhciBfcG9zaXRpb24sIF9sZW5ndGgsIF9jaGFyYWN0ZXIsIF9yZXN1bHQ7XG5cbiAgaWYgKHN0YXJ0IDwgZW5kKSB7XG4gICAgX3Jlc3VsdCA9IHN0YXRlLmlucHV0LnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgaWYgKGNoZWNrSnNvbikge1xuICAgICAgZm9yIChfcG9zaXRpb24gPSAwLCBfbGVuZ3RoID0gX3Jlc3VsdC5sZW5ndGg7IF9wb3NpdGlvbiA8IF9sZW5ndGg7IF9wb3NpdGlvbiArPSAxKSB7XG4gICAgICAgIF9jaGFyYWN0ZXIgPSBfcmVzdWx0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcbiAgICAgICAgaWYgKCEoX2NoYXJhY3RlciA9PT0gMHgwOSB8fFxuICAgICAgICAgICAgICAoMHgyMCA8PSBfY2hhcmFjdGVyICYmIF9jaGFyYWN0ZXIgPD0gMHgxMEZGRkYpKSkge1xuICAgICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdleHBlY3RlZCB2YWxpZCBKU09OIGNoYXJhY3RlcicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChQQVRURVJOX05PTl9QUklOVEFCTEUudGVzdChfcmVzdWx0KSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RoZSBzdHJlYW0gY29udGFpbnMgbm9uLXByaW50YWJsZSBjaGFyYWN0ZXJzJyk7XG4gICAgfVxuXG4gICAgc3RhdGUucmVzdWx0ICs9IF9yZXN1bHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VNYXBwaW5ncyhzdGF0ZSwgZGVzdGluYXRpb24sIHNvdXJjZSwgb3ZlcnJpZGFibGVLZXlzKSB7XG4gIHZhciBzb3VyY2VLZXlzLCBrZXksIGluZGV4LCBxdWFudGl0eTtcblxuICBpZiAoIWNvbW1vbi5pc09iamVjdChzb3VyY2UpKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCBtZXJnZSBtYXBwaW5nczsgdGhlIHByb3ZpZGVkIHNvdXJjZSBvYmplY3QgaXMgdW5hY2NlcHRhYmxlJyk7XG4gIH1cblxuICBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICBmb3IgKGluZGV4ID0gMCwgcXVhbnRpdHkgPSBzb3VyY2VLZXlzLmxlbmd0aDsgaW5kZXggPCBxdWFudGl0eTsgaW5kZXggKz0gMSkge1xuICAgIGtleSA9IHNvdXJjZUtleXNbaW5kZXhdO1xuXG4gICAgaWYgKCFfaGFzT3duUHJvcGVydHkkMS5jYWxsKGRlc3RpbmF0aW9uLCBrZXkpKSB7XG4gICAgICBzZXRQcm9wZXJ0eShkZXN0aW5hdGlvbiwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICBvdmVycmlkYWJsZUtleXNba2V5XSA9IHRydWU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUsXG4gIHN0YXJ0TGluZSwgc3RhcnRMaW5lU3RhcnQsIHN0YXJ0UG9zKSB7XG5cbiAgdmFyIGluZGV4LCBxdWFudGl0eTtcblxuICAvLyBUaGUgb3V0cHV0IGlzIGEgcGxhaW4gb2JqZWN0IGhlcmUsIHNvIGtleXMgY2FuIG9ubHkgYmUgc3RyaW5ncy5cbiAgLy8gV2UgbmVlZCB0byBjb252ZXJ0IGtleU5vZGUgdG8gYSBzdHJpbmcsIGJ1dCBkb2luZyBzbyBjYW4gaGFuZyB0aGUgcHJvY2Vzc1xuICAvLyAoZGVlcGx5IG5lc3RlZCBhcnJheXMgdGhhdCBleHBsb2RlIGV4cG9uZW50aWFsbHkgdXNpbmcgYWxpYXNlcykuXG4gIGlmIChBcnJheS5pc0FycmF5KGtleU5vZGUpKSB7XG4gICAga2V5Tm9kZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGtleU5vZGUpO1xuXG4gICAgZm9yIChpbmRleCA9IDAsIHF1YW50aXR5ID0ga2V5Tm9kZS5sZW5ndGg7IGluZGV4IDwgcXVhbnRpdHk7IGluZGV4ICs9IDEpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGtleU5vZGVbaW5kZXhdKSkge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmVzdGVkIGFycmF5cyBhcmUgbm90IHN1cHBvcnRlZCBpbnNpZGUga2V5cycpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGtleU5vZGUgPT09ICdvYmplY3QnICYmIF9jbGFzcyhrZXlOb2RlW2luZGV4XSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgIGtleU5vZGVbaW5kZXhdID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQXZvaWQgY29kZSBleGVjdXRpb24gaW4gbG9hZCgpIHZpYSB0b1N0cmluZyBwcm9wZXJ0eVxuICAvLyAoc3RpbGwgdXNlIGl0cyBvd24gdG9TdHJpbmcgZm9yIGFycmF5cywgdGltZXN0YW1wcyxcbiAgLy8gYW5kIHdoYXRldmVyIHVzZXIgc2NoZW1hIGV4dGVuc2lvbnMgaGFwcGVuIHRvIGhhdmUgQEB0b1N0cmluZ1RhZylcbiAgaWYgKHR5cGVvZiBrZXlOb2RlID09PSAnb2JqZWN0JyAmJiBfY2xhc3Moa2V5Tm9kZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAga2V5Tm9kZSA9ICdbb2JqZWN0IE9iamVjdF0nO1xuICB9XG5cblxuICBrZXlOb2RlID0gU3RyaW5nKGtleU5vZGUpO1xuXG4gIGlmIChfcmVzdWx0ID09PSBudWxsKSB7XG4gICAgX3Jlc3VsdCA9IHt9O1xuICB9XG5cbiAgaWYgKGtleVRhZyA9PT0gJ3RhZzp5YW1sLm9yZywyMDAyOm1lcmdlJykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlTm9kZSkpIHtcbiAgICAgIGZvciAoaW5kZXggPSAwLCBxdWFudGl0eSA9IHZhbHVlTm9kZS5sZW5ndGg7IGluZGV4IDwgcXVhbnRpdHk7IGluZGV4ICs9IDEpIHtcbiAgICAgICAgbWVyZ2VNYXBwaW5ncyhzdGF0ZSwgX3Jlc3VsdCwgdmFsdWVOb2RlW2luZGV4XSwgb3ZlcnJpZGFibGVLZXlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VNYXBwaW5ncyhzdGF0ZSwgX3Jlc3VsdCwgdmFsdWVOb2RlLCBvdmVycmlkYWJsZUtleXMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoIXN0YXRlLmpzb24gJiZcbiAgICAgICAgIV9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwob3ZlcnJpZGFibGVLZXlzLCBrZXlOb2RlKSAmJlxuICAgICAgICBfaGFzT3duUHJvcGVydHkkMS5jYWxsKF9yZXN1bHQsIGtleU5vZGUpKSB7XG4gICAgICBzdGF0ZS5saW5lID0gc3RhcnRMaW5lIHx8IHN0YXRlLmxpbmU7XG4gICAgICBzdGF0ZS5saW5lU3RhcnQgPSBzdGFydExpbmVTdGFydCB8fCBzdGF0ZS5saW5lU3RhcnQ7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiA9IHN0YXJ0UG9zIHx8IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0ZWQgbWFwcGluZyBrZXknKTtcbiAgICB9XG5cbiAgICBzZXRQcm9wZXJ0eShfcmVzdWx0LCBrZXlOb2RlLCB2YWx1ZU5vZGUpO1xuICAgIGRlbGV0ZSBvdmVycmlkYWJsZUtleXNba2V5Tm9kZV07XG4gIH1cblxuICByZXR1cm4gX3Jlc3VsdDtcbn1cblxuZnVuY3Rpb24gcmVhZExpbmVCcmVhayhzdGF0ZSkge1xuICB2YXIgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4MEEvKiBMRiAqLykge1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gIH0gZWxzZSBpZiAoY2ggPT09IDB4MEQvKiBDUiAqLykge1xuICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgaWYgKHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pID09PSAweDBBLyogTEYgKi8pIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICdhIGxpbmUgYnJlYWsgaXMgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIHN0YXRlLmxpbmUgKz0gMTtcbiAgc3RhdGUubGluZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG4gIHN0YXRlLmZpcnN0VGFiSW5MaW5lID0gLTE7XG59XG5cbmZ1bmN0aW9uIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGFsbG93Q29tbWVudHMsIGNoZWNrSW5kZW50KSB7XG4gIHZhciBsaW5lQnJlYWtzID0gMCxcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgd2hpbGUgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgaWYgKGNoID09PSAweDA5LyogVGFiICovICYmIHN0YXRlLmZpcnN0VGFiSW5MaW5lID09PSAtMSkge1xuICAgICAgICBzdGF0ZS5maXJzdFRhYkluTGluZSA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfVxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChhbGxvd0NvbW1lbnRzICYmIGNoID09PSAweDIzLyogIyAqLykge1xuICAgICAgZG8ge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9IHdoaWxlIChjaCAhPT0gMHgwQS8qIExGICovICYmIGNoICE9PSAweDBELyogQ1IgKi8gJiYgY2ggIT09IDApO1xuICAgIH1cblxuICAgIGlmIChpc19FT0woY2gpKSB7XG4gICAgICByZWFkTGluZUJyZWFrKHN0YXRlKTtcblxuICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgIGxpbmVCcmVha3MrKztcbiAgICAgIHN0YXRlLmxpbmVJbmRlbnQgPSAwO1xuXG4gICAgICB3aGlsZSAoY2ggPT09IDB4MjAvKiBTcGFjZSAqLykge1xuICAgICAgICBzdGF0ZS5saW5lSW5kZW50Kys7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoZWNrSW5kZW50ICE9PSAtMSAmJiBsaW5lQnJlYWtzICE9PSAwICYmIHN0YXRlLmxpbmVJbmRlbnQgPCBjaGVja0luZGVudCkge1xuICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ2RlZmljaWVudCBpbmRlbnRhdGlvbicpO1xuICB9XG5cbiAgcmV0dXJuIGxpbmVCcmVha3M7XG59XG5cbmZ1bmN0aW9uIHRlc3REb2N1bWVudFNlcGFyYXRvcihzdGF0ZSkge1xuICB2YXIgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb24sXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uKTtcblxuICAvLyBDb25kaXRpb24gc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCBpcyB0ZXN0ZWRcbiAgLy8gaW4gcGFyZW50IG9uIGVhY2ggY2FsbCwgZm9yIGVmZmljaWVuY3kuIE5vIG5lZWRzIHRvIHRlc3QgaGVyZSBhZ2Fpbi5cbiAgaWYgKChjaCA9PT0gMHgyRC8qIC0gKi8gfHwgY2ggPT09IDB4MkUvKiAuICovKSAmJlxuICAgICAgY2ggPT09IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoX3Bvc2l0aW9uICsgMSkgJiZcbiAgICAgIGNoID09PSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KF9wb3NpdGlvbiArIDIpKSB7XG5cbiAgICBfcG9zaXRpb24gKz0gMztcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChfcG9zaXRpb24pO1xuXG4gICAgaWYgKGNoID09PSAwIHx8IGlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgY291bnQpIHtcbiAgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgc3RhdGUucmVzdWx0ICs9ICcgJztcbiAgfSBlbHNlIGlmIChjb3VudCA+IDEpIHtcbiAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgY291bnQgLSAxKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIHJlYWRQbGFpblNjYWxhcihzdGF0ZSwgbm9kZUluZGVudCwgd2l0aGluRmxvd0NvbGxlY3Rpb24pIHtcbiAgdmFyIHByZWNlZGluZyxcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIGNhcHR1cmVTdGFydCxcbiAgICAgIGNhcHR1cmVFbmQsXG4gICAgICBoYXNQZW5kaW5nQ29udGVudCxcbiAgICAgIF9saW5lLFxuICAgICAgX2xpbmVTdGFydCxcbiAgICAgIF9saW5lSW5kZW50LFxuICAgICAgX2tpbmQgPSBzdGF0ZS5raW5kLFxuICAgICAgX3Jlc3VsdCA9IHN0YXRlLnJlc3VsdCxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGlzX1dTX09SX0VPTChjaCkgICAgICB8fFxuICAgICAgaXNfRkxPV19JTkRJQ0FUT1IoY2gpIHx8XG4gICAgICBjaCA9PT0gMHgyMy8qICMgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI2LyogJiAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4MkEvKiAqICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyMS8qICEgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDdDLyogfCAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4M0UvKiA+ICovICAgIHx8XG4gICAgICBjaCA9PT0gMHgyNy8qICcgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDIyLyogXCIgKi8gICAgfHxcbiAgICAgIGNoID09PSAweDI1LyogJSAqLyAgICB8fFxuICAgICAgY2ggPT09IDB4NDAvKiBAICovICAgIHx8XG4gICAgICBjaCA9PT0gMHg2MC8qIGAgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoY2ggPT09IDB4M0YvKiA/ICovIHx8IGNoID09PSAweDJELyogLSAqLykge1xuICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgIGlmIChpc19XU19PUl9FT0woZm9sbG93aW5nKSB8fFxuICAgICAgICB3aXRoaW5GbG93Q29sbGVjdGlvbiAmJiBpc19GTE9XX0lORElDQVRPUihmb2xsb3dpbmcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcbiAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuICBoYXNQZW5kaW5nQ29udGVudCA9IGZhbHNlO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgzQS8qIDogKi8pIHtcbiAgICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpIHx8XG4gICAgICAgICAgd2l0aGluRmxvd0NvbGxlY3Rpb24gJiYgaXNfRkxPV19JTkRJQ0FUT1IoZm9sbG93aW5nKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBwcmVjZWRpbmcgPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uIC0gMSk7XG5cbiAgICAgIGlmIChpc19XU19PUl9FT0wocHJlY2VkaW5nKSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkgfHxcbiAgICAgICAgICAgICAgIHdpdGhpbkZsb3dDb2xsZWN0aW9uICYmIGlzX0ZMT1dfSU5ESUNBVE9SKGNoKSkge1xuICAgICAgYnJlYWs7XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIF9saW5lID0gc3RhdGUubGluZTtcbiAgICAgIF9saW5lU3RhcnQgPSBzdGF0ZS5saW5lU3RhcnQ7XG4gICAgICBfbGluZUluZGVudCA9IHN0YXRlLmxpbmVJbmRlbnQ7XG4gICAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCBmYWxzZSwgLTEpO1xuXG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA+PSBub2RlSW5kZW50KSB7XG4gICAgICAgIGhhc1BlbmRpbmdDb250ZW50ID0gdHJ1ZTtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5wb3NpdGlvbiA9IGNhcHR1cmVFbmQ7XG4gICAgICAgIHN0YXRlLmxpbmUgPSBfbGluZTtcbiAgICAgICAgc3RhdGUubGluZVN0YXJ0ID0gX2xpbmVTdGFydDtcbiAgICAgICAgc3RhdGUubGluZUluZGVudCA9IF9saW5lSW5kZW50O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaGFzUGVuZGluZ0NvbnRlbnQpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIGZhbHNlKTtcbiAgICAgIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIHN0YXRlLmxpbmUgLSBfbGluZSk7XG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgICBoYXNQZW5kaW5nQ29udGVudCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb24gKyAxO1xuICAgIH1cblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgfVxuXG4gIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIGZhbHNlKTtcblxuICBpZiAoc3RhdGUucmVzdWx0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gX2tpbmQ7XG4gIHN0YXRlLnJlc3VsdCA9IF9yZXN1bHQ7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcmVhZFNpbmdsZVF1b3RlZFNjYWxhcihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgY2gsXG4gICAgICBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQ7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggIT09IDB4MjcvKiAnICovKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGUua2luZCA9ICdzY2FsYXInO1xuICBzdGF0ZS5yZXN1bHQgPSAnJztcbiAgc3RhdGUucG9zaXRpb24rKztcbiAgY2FwdHVyZVN0YXJ0ID0gY2FwdHVyZUVuZCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlICgoY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSkgIT09IDApIHtcbiAgICBpZiAoY2ggPT09IDB4MjcvKiAnICovKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgdHJ1ZSk7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICAgIGlmIChjaCA9PT0gMHgyNy8qICcgKi8pIHtcbiAgICAgICAgY2FwdHVyZVN0YXJ0ID0gc3RhdGUucG9zaXRpb247XG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChpc19FT0woY2gpKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBjYXB0dXJlRW5kLCB0cnVlKTtcbiAgICAgIHdyaXRlRm9sZGVkTGluZXMoc3RhdGUsIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIGZhbHNlLCBub2RlSW5kZW50KSk7XG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB9IGVsc2UgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBzdGF0ZS5saW5lU3RhcnQgJiYgdGVzdERvY3VtZW50U2VwYXJhdG9yKHN0YXRlKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBkb2N1bWVudCB3aXRoaW4gYSBzaW5nbGUgcXVvdGVkIHNjYWxhcicpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgc2luZ2xlIHF1b3RlZCBzY2FsYXInKTtcbn1cblxuZnVuY3Rpb24gcmVhZERvdWJsZVF1b3RlZFNjYWxhcihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgY2FwdHVyZVN0YXJ0LFxuICAgICAgY2FwdHVyZUVuZCxcbiAgICAgIGhleExlbmd0aCxcbiAgICAgIGhleFJlc3VsdCxcbiAgICAgIHRtcCxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDIyLyogXCIgKi8pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuICBzdGF0ZS5wb3NpdGlvbisrO1xuICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIGlmIChjaCA9PT0gMHgyMi8qIFwiICovKSB7XG4gICAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgdHJ1ZSk7XG4gICAgICBzdGF0ZS5wb3NpdGlvbisrO1xuICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDVDLyogXFwgKi8pIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIHN0YXRlLnBvc2l0aW9uLCB0cnVlKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpO1xuXG4gICAgICAgIC8vIFRPRE86IHJld29yayB0byBpbmxpbmUgZm4gd2l0aCBubyB0eXBlIGNhc3Q/XG4gICAgICB9IGVsc2UgaWYgKGNoIDwgMjU2ICYmIHNpbXBsZUVzY2FwZUNoZWNrW2NoXSkge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gc2ltcGxlRXNjYXBlTWFwW2NoXTtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcblxuICAgICAgfSBlbHNlIGlmICgodG1wID0gZXNjYXBlZEhleExlbihjaCkpID4gMCkge1xuICAgICAgICBoZXhMZW5ndGggPSB0bXA7XG4gICAgICAgIGhleFJlc3VsdCA9IDA7XG5cbiAgICAgICAgZm9yICg7IGhleExlbmd0aCA+IDA7IGhleExlbmd0aC0tKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gICAgICAgICAgaWYgKCh0bXAgPSBmcm9tSGV4Q29kZShjaCkpID49IDApIHtcbiAgICAgICAgICAgIGhleFJlc3VsdCA9IChoZXhSZXN1bHQgPDwgNCkgKyB0bXA7XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2V4cGVjdGVkIGhleGFkZWNpbWFsIGNoYXJhY3RlcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjaGFyRnJvbUNvZGVwb2ludChoZXhSZXN1bHQpO1xuXG4gICAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmtub3duIGVzY2FwZSBzZXF1ZW5jZScpO1xuICAgICAgfVxuXG4gICAgICBjYXB0dXJlU3RhcnQgPSBjYXB0dXJlRW5kID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB9IGVsc2UgaWYgKGlzX0VPTChjaCkpIHtcbiAgICAgIGNhcHR1cmVTZWdtZW50KHN0YXRlLCBjYXB0dXJlU3RhcnQsIGNhcHR1cmVFbmQsIHRydWUpO1xuICAgICAgd3JpdGVGb2xkZWRMaW5lcyhzdGF0ZSwgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgZmFsc2UsIG5vZGVJbmRlbnQpKTtcbiAgICAgIGNhcHR1cmVTdGFydCA9IGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcblxuICAgIH0gZWxzZSBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIGRvY3VtZW50IHdpdGhpbiBhIGRvdWJsZSBxdW90ZWQgc2NhbGFyJyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgIGNhcHR1cmVFbmQgPSBzdGF0ZS5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0aHJvd0Vycm9yKHN0YXRlLCAndW5leHBlY3RlZCBlbmQgb2YgdGhlIHN0cmVhbSB3aXRoaW4gYSBkb3VibGUgcXVvdGVkIHNjYWxhcicpO1xufVxuXG5mdW5jdGlvbiByZWFkRmxvd0NvbGxlY3Rpb24oc3RhdGUsIG5vZGVJbmRlbnQpIHtcbiAgdmFyIHJlYWROZXh0ID0gdHJ1ZSxcbiAgICAgIF9saW5lLFxuICAgICAgX2xpbmVTdGFydCxcbiAgICAgIF9wb3MsXG4gICAgICBfdGFnICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9yZXN1bHQsXG4gICAgICBfYW5jaG9yICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIGZvbGxvd2luZyxcbiAgICAgIHRlcm1pbmF0b3IsXG4gICAgICBpc1BhaXIsXG4gICAgICBpc0V4cGxpY2l0UGFpcixcbiAgICAgIGlzTWFwcGluZyxcbiAgICAgIG92ZXJyaWRhYmxlS2V5cyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBrZXlOb2RlLFxuICAgICAga2V5VGFnLFxuICAgICAgdmFsdWVOb2RlLFxuICAgICAgY2g7XG5cbiAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICBpZiAoY2ggPT09IDB4NUIvKiBbICovKSB7XG4gICAgdGVybWluYXRvciA9IDB4NUQ7LyogXSAqL1xuICAgIGlzTWFwcGluZyA9IGZhbHNlO1xuICAgIF9yZXN1bHQgPSBbXTtcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHg3Qi8qIHsgKi8pIHtcbiAgICB0ZXJtaW5hdG9yID0gMHg3RDsvKiB9ICovXG4gICAgaXNNYXBwaW5nID0gdHJ1ZTtcbiAgICBfcmVzdWx0ID0ge307XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB3aGlsZSAoY2ggIT09IDApIHtcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IHRlcm1pbmF0b3IpIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uKys7XG4gICAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgICAgc3RhdGUuYW5jaG9yID0gX2FuY2hvcjtcbiAgICAgIHN0YXRlLmtpbmQgPSBpc01hcHBpbmcgPyAnbWFwcGluZycgOiAnc2VxdWVuY2UnO1xuICAgICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoIXJlYWROZXh0KSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbWlzc2VkIGNvbW1hIGJldHdlZW4gZmxvdyBjb2xsZWN0aW9uIGVudHJpZXMnKTtcbiAgICB9IGVsc2UgaWYgKGNoID09PSAweDJDLyogLCAqLykge1xuICAgICAgLy8gXCJmbG93IGNvbGxlY3Rpb24gZW50cmllcyBjYW4gbmV2ZXIgYmUgY29tcGxldGVseSBlbXB0eVwiLCBhcyBwZXIgWUFNTCAxLjIsIHNlY3Rpb24gNy40XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCBcImV4cGVjdGVkIHRoZSBub2RlIGNvbnRlbnQsIGJ1dCBmb3VuZCAnLCdcIik7XG4gICAgfVxuXG4gICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgaXNQYWlyID0gaXNFeHBsaWNpdFBhaXIgPSBmYWxzZTtcblxuICAgIGlmIChjaCA9PT0gMHgzRi8qID8gKi8pIHtcbiAgICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgICAgaWYgKGlzX1dTX09SX0VPTChmb2xsb3dpbmcpKSB7XG4gICAgICAgIGlzUGFpciA9IGlzRXhwbGljaXRQYWlyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUucG9zaXRpb24rKztcbiAgICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgbm9kZUluZGVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2xpbmUgPSBzdGF0ZS5saW5lOyAvLyBTYXZlIHRoZSBjdXJyZW50IGxpbmUuXG4gICAgX2xpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICBfcG9zID0gc3RhdGUucG9zaXRpb247XG4gICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgIGtleVRhZyA9IHN0YXRlLnRhZztcbiAgICBrZXlOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmICgoaXNFeHBsaWNpdFBhaXIgfHwgc3RhdGUubGluZSA9PT0gX2xpbmUpICYmIGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgaXNQYWlyID0gdHJ1ZTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIG5vZGVJbmRlbnQpO1xuICAgICAgY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfRkxPV19JTiwgZmFsc2UsIHRydWUpO1xuICAgICAgdmFsdWVOb2RlID0gc3RhdGUucmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChpc01hcHBpbmcpIHtcbiAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUsIF9saW5lLCBfbGluZVN0YXJ0LCBfcG9zKTtcbiAgICB9IGVsc2UgaWYgKGlzUGFpcikge1xuICAgICAgX3Jlc3VsdC5wdXNoKHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIG51bGwsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUsIF9saW5lLCBfbGluZVN0YXJ0LCBfcG9zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9yZXN1bHQucHVzaChrZXlOb2RlKTtcbiAgICB9XG5cbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCBub2RlSW5kZW50KTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoY2ggPT09IDB4MkMvKiAsICovKSB7XG4gICAgICByZWFkTmV4dCA9IHRydWU7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWROZXh0ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZXhwZWN0ZWQgZW5kIG9mIHRoZSBzdHJlYW0gd2l0aGluIGEgZmxvdyBjb2xsZWN0aW9uJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9ja1NjYWxhcihzdGF0ZSwgbm9kZUluZGVudCkge1xuICB2YXIgY2FwdHVyZVN0YXJ0LFxuICAgICAgZm9sZGluZyxcbiAgICAgIGNob21waW5nICAgICAgID0gQ0hPTVBJTkdfQ0xJUCxcbiAgICAgIGRpZFJlYWRDb250ZW50ID0gZmFsc2UsXG4gICAgICBkZXRlY3RlZEluZGVudCA9IGZhbHNlLFxuICAgICAgdGV4dEluZGVudCAgICAgPSBub2RlSW5kZW50LFxuICAgICAgZW1wdHlMaW5lcyAgICAgPSAwLFxuICAgICAgYXRNb3JlSW5kZW50ZWQgPSBmYWxzZSxcbiAgICAgIHRtcCxcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDdDLyogfCAqLykge1xuICAgIGZvbGRpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIGlmIChjaCA9PT0gMHgzRS8qID4gKi8pIHtcbiAgICBmb2xkaW5nID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0ZS5raW5kID0gJ3NjYWxhcic7XG4gIHN0YXRlLnJlc3VsdCA9ICcnO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgIGlmIChjaCA9PT0gMHgyQi8qICsgKi8gfHwgY2ggPT09IDB4MkQvKiAtICovKSB7XG4gICAgICBpZiAoQ0hPTVBJTkdfQ0xJUCA9PT0gY2hvbXBpbmcpIHtcbiAgICAgICAgY2hvbXBpbmcgPSAoY2ggPT09IDB4MkIvKiArICovKSA/IENIT01QSU5HX0tFRVAgOiBDSE9NUElOR19TVFJJUDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93RXJyb3Ioc3RhdGUsICdyZXBlYXQgb2YgYSBjaG9tcGluZyBtb2RlIGlkZW50aWZpZXInKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoKHRtcCA9IGZyb21EZWNpbWFsQ29kZShjaCkpID49IDApIHtcbiAgICAgIGlmICh0bXAgPT09IDApIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBleHBsaWNpdCBpbmRlbnRhdGlvbiB3aWR0aCBvZiBhIGJsb2NrIHNjYWxhcjsgaXQgY2Fubm90IGJlIGxlc3MgdGhhbiBvbmUnKTtcbiAgICAgIH0gZWxzZSBpZiAoIWRldGVjdGVkSW5kZW50KSB7XG4gICAgICAgIHRleHRJbmRlbnQgPSBub2RlSW5kZW50ICsgdG1wIC0gMTtcbiAgICAgICAgZGV0ZWN0ZWRJbmRlbnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3JlcGVhdCBvZiBhbiBpbmRlbnRhdGlvbiB3aWR0aCBpZGVudGlmaWVyJyk7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgIGRvIHsgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pOyB9XG4gICAgd2hpbGUgKGlzX1dISVRFX1NQQUNFKGNoKSk7XG5cbiAgICBpZiAoY2ggPT09IDB4MjMvKiAjICovKSB7XG4gICAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgICAgd2hpbGUgKCFpc19FT0woY2gpICYmIChjaCAhPT0gMCkpO1xuICAgIH1cbiAgfVxuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIHJlYWRMaW5lQnJlYWsoc3RhdGUpO1xuICAgIHN0YXRlLmxpbmVJbmRlbnQgPSAwO1xuXG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgIHdoaWxlICgoIWRldGVjdGVkSW5kZW50IHx8IHN0YXRlLmxpbmVJbmRlbnQgPCB0ZXh0SW5kZW50KSAmJlxuICAgICAgICAgICAoY2ggPT09IDB4MjAvKiBTcGFjZSAqLykpIHtcbiAgICAgIHN0YXRlLmxpbmVJbmRlbnQrKztcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoIWRldGVjdGVkSW5kZW50ICYmIHN0YXRlLmxpbmVJbmRlbnQgPiB0ZXh0SW5kZW50KSB7XG4gICAgICB0ZXh0SW5kZW50ID0gc3RhdGUubGluZUluZGVudDtcbiAgICB9XG5cbiAgICBpZiAoaXNfRU9MKGNoKSkge1xuICAgICAgZW1wdHlMaW5lcysrO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gRW5kIG9mIHRoZSBzY2FsYXIuXG4gICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCB0ZXh0SW5kZW50KSB7XG5cbiAgICAgIC8vIFBlcmZvcm0gdGhlIGNob21waW5nLlxuICAgICAgaWYgKGNob21waW5nID09PSBDSE9NUElOR19LRUVQKSB7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBkaWRSZWFkQ29udGVudCA/IDEgKyBlbXB0eUxpbmVzIDogZW1wdHlMaW5lcyk7XG4gICAgICB9IGVsc2UgaWYgKGNob21waW5nID09PSBDSE9NUElOR19DTElQKSB7XG4gICAgICAgIGlmIChkaWRSZWFkQ29udGVudCkgeyAvLyBpLmUuIG9ubHkgaWYgdGhlIHNjYWxhciBpcyBub3QgZW1wdHkuXG4gICAgICAgICAgc3RhdGUucmVzdWx0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEJyZWFrIHRoaXMgYHdoaWxlYCBjeWNsZSBhbmQgZ28gdG8gdGhlIGZ1bmNpdG9uJ3MgZXBpbG9ndWUuXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBGb2xkZWQgc3R5bGU6IHVzZSBmYW5jeSBydWxlcyB0byBoYW5kbGUgbGluZSBicmVha3MuXG4gICAgaWYgKGZvbGRpbmcpIHtcblxuICAgICAgLy8gTGluZXMgc3RhcnRpbmcgd2l0aCB3aGl0ZSBzcGFjZSBjaGFyYWN0ZXJzIChtb3JlLWluZGVudGVkIGxpbmVzKSBhcmUgbm90IGZvbGRlZC5cbiAgICAgIGlmIChpc19XSElURV9TUEFDRShjaCkpIHtcbiAgICAgICAgYXRNb3JlSW5kZW50ZWQgPSB0cnVlO1xuICAgICAgICAvLyBleGNlcHQgZm9yIHRoZSBmaXJzdCBjb250ZW50IGxpbmUgKGNmLiBFeGFtcGxlIDguMSlcbiAgICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcblxuICAgICAgLy8gRW5kIG9mIG1vcmUtaW5kZW50ZWQgYmxvY2suXG4gICAgICB9IGVsc2UgaWYgKGF0TW9yZUluZGVudGVkKSB7XG4gICAgICAgIGF0TW9yZUluZGVudGVkID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnJlc3VsdCArPSBjb21tb24ucmVwZWF0KCdcXG4nLCBlbXB0eUxpbmVzICsgMSk7XG5cbiAgICAgIC8vIEp1c3Qgb25lIGxpbmUgYnJlYWsgLSBwZXJjZWl2ZSBhcyB0aGUgc2FtZSBsaW5lLlxuICAgICAgfSBlbHNlIGlmIChlbXB0eUxpbmVzID09PSAwKSB7XG4gICAgICAgIGlmIChkaWRSZWFkQ29udGVudCkgeyAvLyBpLmUuIG9ubHkgaWYgd2UgaGF2ZSBhbHJlYWR5IHJlYWQgc29tZSBzY2FsYXIgY29udGVudC5cbiAgICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gJyAnO1xuICAgICAgICB9XG5cbiAgICAgIC8vIFNldmVyYWwgbGluZSBicmVha3MgLSBwZXJjZWl2ZSBhcyBkaWZmZXJlbnQgbGluZXMuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS5yZXN1bHQgKz0gY29tbW9uLnJlcGVhdCgnXFxuJywgZW1wdHlMaW5lcyk7XG4gICAgICB9XG5cbiAgICAvLyBMaXRlcmFsIHN0eWxlOiBqdXN0IGFkZCBleGFjdCBudW1iZXIgb2YgbGluZSBicmVha3MgYmV0d2VlbiBjb250ZW50IGxpbmVzLlxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBLZWVwIGFsbCBsaW5lIGJyZWFrcyBleGNlcHQgdGhlIGhlYWRlciBsaW5lIGJyZWFrLlxuICAgICAgc3RhdGUucmVzdWx0ICs9IGNvbW1vbi5yZXBlYXQoJ1xcbicsIGRpZFJlYWRDb250ZW50ID8gMSArIGVtcHR5TGluZXMgOiBlbXB0eUxpbmVzKTtcbiAgICB9XG5cbiAgICBkaWRSZWFkQ29udGVudCA9IHRydWU7XG4gICAgZGV0ZWN0ZWRJbmRlbnQgPSB0cnVlO1xuICAgIGVtcHR5TGluZXMgPSAwO1xuICAgIGNhcHR1cmVTdGFydCA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gICAgd2hpbGUgKCFpc19FT0woY2gpICYmIChjaCAhPT0gMCkpIHtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBjYXB0dXJlU2VnbWVudChzdGF0ZSwgY2FwdHVyZVN0YXJ0LCBzdGF0ZS5wb3NpdGlvbiwgZmFsc2UpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9ja1NlcXVlbmNlKHN0YXRlLCBub2RlSW5kZW50KSB7XG4gIHZhciBfbGluZSxcbiAgICAgIF90YWcgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIF9hbmNob3IgICA9IHN0YXRlLmFuY2hvcixcbiAgICAgIF9yZXN1bHQgICA9IFtdLFxuICAgICAgZm9sbG93aW5nLFxuICAgICAgZGV0ZWN0ZWQgID0gZmFsc2UsXG4gICAgICBjaDtcblxuICAvLyB0aGVyZSBpcyBhIGxlYWRpbmcgdGFiIGJlZm9yZSB0aGlzIHRva2VuLCBzbyBpdCBjYW4ndCBiZSBhIGJsb2NrIHNlcXVlbmNlL21hcHBpbmc7XG4gIC8vIGl0IGNhbiBzdGlsbCBiZSBmbG93IHNlcXVlbmNlL21hcHBpbmcgb3IgYSBzY2FsYXJcbiAgaWYgKHN0YXRlLmZpcnN0VGFiSW5MaW5lICE9PSAtMSkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IF9yZXN1bHQ7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIHdoaWxlIChjaCAhPT0gMCkge1xuICAgIGlmIChzdGF0ZS5maXJzdFRhYkluTGluZSAhPT0gLTEpIHtcbiAgICAgIHN0YXRlLnBvc2l0aW9uID0gc3RhdGUuZmlyc3RUYWJJbkxpbmU7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFiIGNoYXJhY3RlcnMgbXVzdCBub3QgYmUgdXNlZCBpbiBpbmRlbnRhdGlvbicpO1xuICAgIH1cblxuICAgIGlmIChjaCAhPT0gMHgyRC8qIC0gKi8pIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvbGxvd2luZyA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24gKyAxKTtcblxuICAgIGlmICghaXNfV1NfT1JfRU9MKGZvbGxvd2luZykpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICBzdGF0ZS5wb3NpdGlvbisrO1xuXG4gICAgaWYgKHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKSkge1xuICAgICAgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPD0gbm9kZUluZGVudCkge1xuICAgICAgICBfcmVzdWx0LnB1c2gobnVsbCk7XG4gICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9saW5lID0gc3RhdGUubGluZTtcbiAgICBjb21wb3NlTm9kZShzdGF0ZSwgbm9kZUluZGVudCwgQ09OVEVYVF9CTE9DS19JTiwgZmFsc2UsIHRydWUpO1xuICAgIF9yZXN1bHQucHVzaChzdGF0ZS5yZXN1bHQpO1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoKHN0YXRlLmxpbmUgPT09IF9saW5lIHx8IHN0YXRlLmxpbmVJbmRlbnQgPiBub2RlSW5kZW50KSAmJiAoY2ggIT09IDApKSB7XG4gICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnYmFkIGluZGVudGF0aW9uIG9mIGEgc2VxdWVuY2UgZW50cnknKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBub2RlSW5kZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoZGV0ZWN0ZWQpIHtcbiAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgc3RhdGUua2luZCA9ICdzZXF1ZW5jZSc7XG4gICAgc3RhdGUucmVzdWx0ID0gX3Jlc3VsdDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHJlYWRCbG9ja01hcHBpbmcoc3RhdGUsIG5vZGVJbmRlbnQsIGZsb3dJbmRlbnQpIHtcbiAgdmFyIGZvbGxvd2luZyxcbiAgICAgIGFsbG93Q29tcGFjdCxcbiAgICAgIF9saW5lLFxuICAgICAgX2tleUxpbmUsXG4gICAgICBfa2V5TGluZVN0YXJ0LFxuICAgICAgX2tleVBvcyxcbiAgICAgIF90YWcgICAgICAgICAgPSBzdGF0ZS50YWcsXG4gICAgICBfYW5jaG9yICAgICAgID0gc3RhdGUuYW5jaG9yLFxuICAgICAgX3Jlc3VsdCAgICAgICA9IHt9LFxuICAgICAgb3ZlcnJpZGFibGVLZXlzID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGtleVRhZyAgICAgICAgPSBudWxsLFxuICAgICAga2V5Tm9kZSAgICAgICA9IG51bGwsXG4gICAgICB2YWx1ZU5vZGUgICAgID0gbnVsbCxcbiAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZSxcbiAgICAgIGRldGVjdGVkICAgICAgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIC8vIHRoZXJlIGlzIGEgbGVhZGluZyB0YWIgYmVmb3JlIHRoaXMgdG9rZW4sIHNvIGl0IGNhbid0IGJlIGEgYmxvY2sgc2VxdWVuY2UvbWFwcGluZztcbiAgLy8gaXQgY2FuIHN0aWxsIGJlIGZsb3cgc2VxdWVuY2UvbWFwcGluZyBvciBhIHNjYWxhclxuICBpZiAoc3RhdGUuZmlyc3RUYWJJbkxpbmUgIT09IC0xKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gX3Jlc3VsdDtcbiAgfVxuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgd2hpbGUgKGNoICE9PSAwKSB7XG4gICAgaWYgKCFhdEV4cGxpY2l0S2V5ICYmIHN0YXRlLmZpcnN0VGFiSW5MaW5lICE9PSAtMSkge1xuICAgICAgc3RhdGUucG9zaXRpb24gPSBzdGF0ZS5maXJzdFRhYkluTGluZTtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWIgY2hhcmFjdGVycyBtdXN0IG5vdCBiZSB1c2VkIGluIGluZGVudGF0aW9uJyk7XG4gICAgfVxuXG4gICAgZm9sbG93aW5nID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbiArIDEpO1xuICAgIF9saW5lID0gc3RhdGUubGluZTsgLy8gU2F2ZSB0aGUgY3VycmVudCBsaW5lLlxuXG4gICAgLy9cbiAgICAvLyBFeHBsaWNpdCBub3RhdGlvbiBjYXNlLiBUaGVyZSBhcmUgdHdvIHNlcGFyYXRlIGJsb2NrczpcbiAgICAvLyBmaXJzdCBmb3IgdGhlIGtleSAoZGVub3RlZCBieSBcIj9cIikgYW5kIHNlY29uZCBmb3IgdGhlIHZhbHVlIChkZW5vdGVkIGJ5IFwiOlwiKVxuICAgIC8vXG4gICAgaWYgKChjaCA9PT0gMHgzRi8qID8gKi8gfHwgY2ggPT09IDB4M0EvKiA6ICovKSAmJiBpc19XU19PUl9FT0woZm9sbG93aW5nKSkge1xuXG4gICAgICBpZiAoY2ggPT09IDB4M0YvKiA/ICovKSB7XG4gICAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAgc3RvcmVNYXBwaW5nUGFpcihzdGF0ZSwgX3Jlc3VsdCwgb3ZlcnJpZGFibGVLZXlzLCBrZXlUYWcsIGtleU5vZGUsIG51bGwsIF9rZXlMaW5lLCBfa2V5TGluZVN0YXJ0LCBfa2V5UG9zKTtcbiAgICAgICAgICBrZXlUYWcgPSBrZXlOb2RlID0gdmFsdWVOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRldGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IHRydWU7XG4gICAgICAgIGFsbG93Q29tcGFjdCA9IHRydWU7XG5cbiAgICAgIH0gZWxzZSBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgICAgICAvLyBpLmUuIDB4M0EvKiA6ICovID09PSBjaGFyYWN0ZXIgYWZ0ZXIgdGhlIGV4cGxpY2l0IGtleS5cbiAgICAgICAgYXRFeHBsaWNpdEtleSA9IGZhbHNlO1xuICAgICAgICBhbGxvd0NvbXBhY3QgPSB0cnVlO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnaW5jb21wbGV0ZSBleHBsaWNpdCBtYXBwaW5nIHBhaXI7IGEga2V5IG5vZGUgaXMgbWlzc2VkOyBvciBmb2xsb3dlZCBieSBhIG5vbi10YWJ1bGF0ZWQgZW1wdHkgbGluZScpO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICAgICAgY2ggPSBmb2xsb3dpbmc7XG5cbiAgICAvL1xuICAgIC8vIEltcGxpY2l0IG5vdGF0aW9uIGNhc2UuIEZsb3ctc3R5bGUgbm9kZSBhcyB0aGUga2V5IGZpcnN0LCB0aGVuIFwiOlwiLCBhbmQgdGhlIHZhbHVlLlxuICAgIC8vXG4gICAgfSBlbHNlIHtcbiAgICAgIF9rZXlMaW5lID0gc3RhdGUubGluZTtcbiAgICAgIF9rZXlMaW5lU3RhcnQgPSBzdGF0ZS5saW5lU3RhcnQ7XG4gICAgICBfa2V5UG9zID0gc3RhdGUucG9zaXRpb247XG5cbiAgICAgIGlmICghY29tcG9zZU5vZGUoc3RhdGUsIGZsb3dJbmRlbnQsIENPTlRFWFRfRkxPV19PVVQsIGZhbHNlLCB0cnVlKSkge1xuICAgICAgICAvLyBOZWl0aGVyIGltcGxpY2l0IG5vciBleHBsaWNpdCBub3RhdGlvbi5cbiAgICAgICAgLy8gUmVhZGluZyBpcyBkb25lLiBHbyB0byB0aGUgZXBpbG9ndWUuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUpIHtcbiAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICB3aGlsZSAoaXNfV0hJVEVfU1BBQ0UoY2gpKSB7XG4gICAgICAgICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNoID09PSAweDNBLyogOiAqLykge1xuICAgICAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICAgICAgICAgIGlmICghaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Egd2hpdGVzcGFjZSBjaGFyYWN0ZXIgaXMgZXhwZWN0ZWQgYWZ0ZXIgdGhlIGtleS12YWx1ZSBzZXBhcmF0b3Igd2l0aGluIGEgYmxvY2sgbWFwcGluZycpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAgICBzdG9yZU1hcHBpbmdQYWlyKHN0YXRlLCBfcmVzdWx0LCBvdmVycmlkYWJsZUtleXMsIGtleVRhZywga2V5Tm9kZSwgbnVsbCwgX2tleUxpbmUsIF9rZXlMaW5lU3RhcnQsIF9rZXlQb3MpO1xuICAgICAgICAgICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGV0ZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGF0RXhwbGljaXRLZXkgPSBmYWxzZTtcbiAgICAgICAgICBhbGxvd0NvbXBhY3QgPSBmYWxzZTtcbiAgICAgICAgICBrZXlUYWcgPSBzdGF0ZS50YWc7XG4gICAgICAgICAga2V5Tm9kZSA9IHN0YXRlLnJlc3VsdDtcblxuICAgICAgICB9IGVsc2UgaWYgKGRldGVjdGVkKSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2NhbiBub3QgcmVhZCBhbiBpbXBsaWNpdCBtYXBwaW5nIHBhaXI7IGEgY29sb24gaXMgbWlzc2VkJyk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgICAgICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgICAgICAgcmV0dXJuIHRydWU7IC8vIEtlZXAgdGhlIHJlc3VsdCBvZiBgY29tcG9zZU5vZGVgLlxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSBpZiAoZGV0ZWN0ZWQpIHtcbiAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2NhbiBub3QgcmVhZCBhIGJsb2NrIG1hcHBpbmcgZW50cnk7IGEgbXVsdGlsaW5lIGtleSBtYXkgbm90IGJlIGFuIGltcGxpY2l0IGtleScpO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgICAgICBzdGF0ZS5hbmNob3IgPSBfYW5jaG9yO1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gS2VlcCB0aGUgcmVzdWx0IG9mIGBjb21wb3NlTm9kZWAuXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBDb21tb24gcmVhZGluZyBjb2RlIGZvciBib3RoIGV4cGxpY2l0IGFuZCBpbXBsaWNpdCBub3RhdGlvbnMuXG4gICAgLy9cbiAgICBpZiAoc3RhdGUubGluZSA9PT0gX2xpbmUgfHwgc3RhdGUubGluZUluZGVudCA+IG5vZGVJbmRlbnQpIHtcbiAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgIF9rZXlMaW5lID0gc3RhdGUubGluZTtcbiAgICAgICAgX2tleUxpbmVTdGFydCA9IHN0YXRlLmxpbmVTdGFydDtcbiAgICAgICAgX2tleVBvcyA9IHN0YXRlLnBvc2l0aW9uO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcG9zZU5vZGUoc3RhdGUsIG5vZGVJbmRlbnQsIENPTlRFWFRfQkxPQ0tfT1VULCB0cnVlLCBhbGxvd0NvbXBhY3QpKSB7XG4gICAgICAgIGlmIChhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgICAga2V5Tm9kZSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWx1ZU5vZGUgPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFhdEV4cGxpY2l0S2V5KSB7XG4gICAgICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCB2YWx1ZU5vZGUsIF9rZXlMaW5lLCBfa2V5TGluZVN0YXJ0LCBfa2V5UG9zKTtcbiAgICAgICAga2V5VGFnID0ga2V5Tm9kZSA9IHZhbHVlTm9kZSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKChzdGF0ZS5saW5lID09PSBfbGluZSB8fCBzdGF0ZS5saW5lSW5kZW50ID4gbm9kZUluZGVudCkgJiYgKGNoICE9PSAwKSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2JhZCBpbmRlbnRhdGlvbiBvZiBhIG1hcHBpbmcgZW50cnknKTtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBub2RlSW5kZW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBFcGlsb2d1ZS5cbiAgLy9cblxuICAvLyBTcGVjaWFsIGNhc2U6IGxhc3QgbWFwcGluZydzIG5vZGUgY29udGFpbnMgb25seSB0aGUga2V5IGluIGV4cGxpY2l0IG5vdGF0aW9uLlxuICBpZiAoYXRFeHBsaWNpdEtleSkge1xuICAgIHN0b3JlTWFwcGluZ1BhaXIoc3RhdGUsIF9yZXN1bHQsIG92ZXJyaWRhYmxlS2V5cywga2V5VGFnLCBrZXlOb2RlLCBudWxsLCBfa2V5TGluZSwgX2tleUxpbmVTdGFydCwgX2tleVBvcyk7XG4gIH1cblxuICAvLyBFeHBvc2UgdGhlIHJlc3VsdGluZyBtYXBwaW5nLlxuICBpZiAoZGV0ZWN0ZWQpIHtcbiAgICBzdGF0ZS50YWcgPSBfdGFnO1xuICAgIHN0YXRlLmFuY2hvciA9IF9hbmNob3I7XG4gICAgc3RhdGUua2luZCA9ICdtYXBwaW5nJztcbiAgICBzdGF0ZS5yZXN1bHQgPSBfcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGRldGVjdGVkO1xufVxuXG5mdW5jdGlvbiByZWFkVGFnUHJvcGVydHkoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbixcbiAgICAgIGlzVmVyYmF0aW0gPSBmYWxzZSxcbiAgICAgIGlzTmFtZWQgICAgPSBmYWxzZSxcbiAgICAgIHRhZ0hhbmRsZSxcbiAgICAgIHRhZ05hbWUsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyMS8qICEgKi8pIHJldHVybiBmYWxzZTtcblxuICBpZiAoc3RhdGUudGFnICE9PSBudWxsKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2R1cGxpY2F0aW9uIG9mIGEgdGFnIHByb3BlcnR5Jyk7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoID09PSAweDNDLyogPCAqLykge1xuICAgIGlzVmVyYmF0aW0gPSB0cnVlO1xuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcblxuICB9IGVsc2UgaWYgKGNoID09PSAweDIxLyogISAqLykge1xuICAgIGlzTmFtZWQgPSB0cnVlO1xuICAgIHRhZ0hhbmRsZSA9ICchISc7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuXG4gIH0gZWxzZSB7XG4gICAgdGFnSGFuZGxlID0gJyEnO1xuICB9XG5cbiAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgaWYgKGlzVmVyYmF0aW0pIHtcbiAgICBkbyB7IGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTsgfVxuICAgIHdoaWxlIChjaCAhPT0gMCAmJiBjaCAhPT0gMHgzRS8qID4gKi8pO1xuXG4gICAgaWYgKHN0YXRlLnBvc2l0aW9uIDwgc3RhdGUubGVuZ3RoKSB7XG4gICAgICB0YWdOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmV4cGVjdGVkIGVuZCBvZiB0aGUgc3RyZWFtIHdpdGhpbiBhIHZlcmJhdGltIHRhZycpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkpIHtcblxuICAgICAgaWYgKGNoID09PSAweDIxLyogISAqLykge1xuICAgICAgICBpZiAoIWlzTmFtZWQpIHtcbiAgICAgICAgICB0YWdIYW5kbGUgPSBzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24gLSAxLCBzdGF0ZS5wb3NpdGlvbiArIDEpO1xuXG4gICAgICAgICAgaWYgKCFQQVRURVJOX1RBR19IQU5ETEUudGVzdCh0YWdIYW5kbGUpKSB7XG4gICAgICAgICAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZWQgdGFnIGhhbmRsZSBjYW5ub3QgY29udGFpbiBzdWNoIGNoYXJhY3RlcnMnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpc05hbWVkID0gdHJ1ZTtcbiAgICAgICAgICBfcG9zaXRpb24gPSBzdGF0ZS5wb3NpdGlvbiArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3RhZyBzdWZmaXggY2Fubm90IGNvbnRhaW4gZXhjbGFtYXRpb24gbWFya3MnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgdGFnTmFtZSA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuXG4gICAgaWYgKFBBVFRFUk5fRkxPV19JTkRJQ0FUT1JTLnRlc3QodGFnTmFtZSkpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgc3VmZml4IGNhbm5vdCBjb250YWluIGZsb3cgaW5kaWNhdG9yIGNoYXJhY3RlcnMnKTtcbiAgICB9XG4gIH1cblxuICBpZiAodGFnTmFtZSAmJiAhUEFUVEVSTl9UQUdfVVJJLnRlc3QodGFnTmFtZSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAndGFnIG5hbWUgY2Fubm90IGNvbnRhaW4gc3VjaCBjaGFyYWN0ZXJzOiAnICsgdGFnTmFtZSk7XG4gIH1cblxuICB0cnkge1xuICAgIHRhZ05hbWUgPSBkZWNvZGVVUklDb21wb25lbnQodGFnTmFtZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd0YWcgbmFtZSBpcyBtYWxmb3JtZWQ6ICcgKyB0YWdOYW1lKTtcbiAgfVxuXG4gIGlmIChpc1ZlcmJhdGltKSB7XG4gICAgc3RhdGUudGFnID0gdGFnTmFtZTtcblxuICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoc3RhdGUudGFnTWFwLCB0YWdIYW5kbGUpKSB7XG4gICAgc3RhdGUudGFnID0gc3RhdGUudGFnTWFwW3RhZ0hhbmRsZV0gKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnIScpIHtcbiAgICBzdGF0ZS50YWcgPSAnIScgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSBpZiAodGFnSGFuZGxlID09PSAnISEnKSB7XG4gICAgc3RhdGUudGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWdOYW1lO1xuXG4gIH0gZWxzZSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuZGVjbGFyZWQgdGFnIGhhbmRsZSBcIicgKyB0YWdIYW5kbGUgKyAnXCInKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQW5jaG9yUHJvcGVydHkoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbixcbiAgICAgIGNoO1xuXG4gIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgaWYgKGNoICE9PSAweDI2LyogJiAqLykgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZHVwbGljYXRpb24gb2YgYW4gYW5jaG9yIHByb3BlcnR5Jyk7XG4gIH1cblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbmNob3Igbm9kZSBtdXN0IGNvbnRhaW4gYXQgbGVhc3Qgb25lIGNoYXJhY3RlcicpO1xuICB9XG5cbiAgc3RhdGUuYW5jaG9yID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiByZWFkQWxpYXMoc3RhdGUpIHtcbiAgdmFyIF9wb3NpdGlvbiwgYWxpYXMsXG4gICAgICBjaDtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmIChjaCAhPT0gMHgyQS8qICogKi8pIHJldHVybiBmYWxzZTtcblxuICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gIF9wb3NpdGlvbiA9IHN0YXRlLnBvc2l0aW9uO1xuXG4gIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSAmJiAhaXNfRkxPV19JTkRJQ0FUT1IoY2gpKSB7XG4gICAgY2ggPSBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KCsrc3RhdGUucG9zaXRpb24pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnBvc2l0aW9uID09PSBfcG9zaXRpb24pIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbmFtZSBvZiBhbiBhbGlhcyBub2RlIG11c3QgY29udGFpbiBhdCBsZWFzdCBvbmUgY2hhcmFjdGVyJyk7XG4gIH1cblxuICBhbGlhcyA9IHN0YXRlLmlucHV0LnNsaWNlKF9wb3NpdGlvbiwgc3RhdGUucG9zaXRpb24pO1xuXG4gIGlmICghX2hhc093blByb3BlcnR5JDEuY2FsbChzdGF0ZS5hbmNob3JNYXAsIGFsaWFzKSkge1xuICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmlkZW50aWZpZWQgYWxpYXMgXCInICsgYWxpYXMgKyAnXCInKTtcbiAgfVxuXG4gIHN0YXRlLnJlc3VsdCA9IHN0YXRlLmFuY2hvck1hcFthbGlhc107XG4gIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNvbXBvc2VOb2RlKHN0YXRlLCBwYXJlbnRJbmRlbnQsIG5vZGVDb250ZXh0LCBhbGxvd1RvU2VlaywgYWxsb3dDb21wYWN0KSB7XG4gIHZhciBhbGxvd0Jsb2NrU3R5bGVzLFxuICAgICAgYWxsb3dCbG9ja1NjYWxhcnMsXG4gICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMsXG4gICAgICBpbmRlbnRTdGF0dXMgPSAxLCAvLyAxOiB0aGlzPnBhcmVudCwgMDogdGhpcz1wYXJlbnQsIC0xOiB0aGlzPHBhcmVudFxuICAgICAgYXROZXdMaW5lICA9IGZhbHNlLFxuICAgICAgaGFzQ29udGVudCA9IGZhbHNlLFxuICAgICAgdHlwZUluZGV4LFxuICAgICAgdHlwZVF1YW50aXR5LFxuICAgICAgdHlwZUxpc3QsXG4gICAgICB0eXBlLFxuICAgICAgZmxvd0luZGVudCxcbiAgICAgIGJsb2NrSW5kZW50O1xuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdvcGVuJywgc3RhdGUpO1xuICB9XG5cbiAgc3RhdGUudGFnICAgID0gbnVsbDtcbiAgc3RhdGUuYW5jaG9yID0gbnVsbDtcbiAgc3RhdGUua2luZCAgID0gbnVsbDtcbiAgc3RhdGUucmVzdWx0ID0gbnVsbDtcblxuICBhbGxvd0Jsb2NrU3R5bGVzID0gYWxsb3dCbG9ja1NjYWxhcnMgPSBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPVxuICAgIENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCB8fFxuICAgIENPTlRFWFRfQkxPQ0tfSU4gID09PSBub2RlQ29udGV4dDtcblxuICBpZiAoYWxsb3dUb1NlZWspIHtcbiAgICBpZiAoc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpKSB7XG4gICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuXG4gICAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAxO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgaW5kZW50U3RhdHVzID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUubGluZUluZGVudCA8IHBhcmVudEluZGVudCkge1xuICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxKSB7XG4gICAgd2hpbGUgKHJlYWRUYWdQcm9wZXJ0eShzdGF0ZSkgfHwgcmVhZEFuY2hvclByb3BlcnR5KHN0YXRlKSkge1xuICAgICAgaWYgKHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKSkge1xuICAgICAgICBhdE5ld0xpbmUgPSB0cnVlO1xuICAgICAgICBhbGxvd0Jsb2NrQ29sbGVjdGlvbnMgPSBhbGxvd0Jsb2NrU3R5bGVzO1xuXG4gICAgICAgIGlmIChzdGF0ZS5saW5lSW5kZW50ID4gcGFyZW50SW5kZW50KSB7XG4gICAgICAgICAgaW5kZW50U3RhdHVzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmxpbmVJbmRlbnQgPCBwYXJlbnRJbmRlbnQpIHtcbiAgICAgICAgICBpbmRlbnRTdGF0dXMgPSAtMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsb3dCbG9ja0NvbGxlY3Rpb25zID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucykge1xuICAgIGFsbG93QmxvY2tDb2xsZWN0aW9ucyA9IGF0TmV3TGluZSB8fCBhbGxvd0NvbXBhY3Q7XG4gIH1cblxuICBpZiAoaW5kZW50U3RhdHVzID09PSAxIHx8IENPTlRFWFRfQkxPQ0tfT1VUID09PSBub2RlQ29udGV4dCkge1xuICAgIGlmIChDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0IHx8IENPTlRFWFRfRkxPV19PVVQgPT09IG5vZGVDb250ZXh0KSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBmbG93SW5kZW50ID0gcGFyZW50SW5kZW50ICsgMTtcbiAgICB9XG5cbiAgICBibG9ja0luZGVudCA9IHN0YXRlLnBvc2l0aW9uIC0gc3RhdGUubGluZVN0YXJ0O1xuXG4gICAgaWYgKGluZGVudFN0YXR1cyA9PT0gMSkge1xuICAgICAgaWYgKGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJlxuICAgICAgICAgIChyZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpIHx8XG4gICAgICAgICAgIHJlYWRCbG9ja01hcHBpbmcoc3RhdGUsIGJsb2NrSW5kZW50LCBmbG93SW5kZW50KSkgfHxcbiAgICAgICAgICByZWFkRmxvd0NvbGxlY3Rpb24oc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKChhbGxvd0Jsb2NrU2NhbGFycyAmJiByZWFkQmxvY2tTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB8fFxuICAgICAgICAgICAgcmVhZFNpbmdsZVF1b3RlZFNjYWxhcihzdGF0ZSwgZmxvd0luZGVudCkgfHxcbiAgICAgICAgICAgIHJlYWREb3VibGVRdW90ZWRTY2FsYXIoc3RhdGUsIGZsb3dJbmRlbnQpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWFkQWxpYXMoc3RhdGUpKSB7XG4gICAgICAgICAgaGFzQ29udGVudCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsIHx8IHN0YXRlLmFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2FsaWFzIG5vZGUgc2hvdWxkIG5vdCBoYXZlIGFueSBwcm9wZXJ0aWVzJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAocmVhZFBsYWluU2NhbGFyKHN0YXRlLCBmbG93SW5kZW50LCBDT05URVhUX0ZMT1dfSU4gPT09IG5vZGVDb250ZXh0KSkge1xuICAgICAgICAgIGhhc0NvbnRlbnQgPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKHN0YXRlLnRhZyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhdGUudGFnID0gJz8nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZS5hbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaW5kZW50U3RhdHVzID09PSAwKSB7XG4gICAgICAvLyBTcGVjaWFsIGNhc2U6IGJsb2NrIHNlcXVlbmNlcyBhcmUgYWxsb3dlZCB0byBoYXZlIHNhbWUgaW5kZW50YXRpb24gbGV2ZWwgYXMgdGhlIHBhcmVudC5cbiAgICAgIC8vIGh0dHA6Ly93d3cueWFtbC5vcmcvc3BlYy8xLjIvc3BlYy5odG1sI2lkMjc5OTc4NFxuICAgICAgaGFzQ29udGVudCA9IGFsbG93QmxvY2tDb2xsZWN0aW9ucyAmJiByZWFkQmxvY2tTZXF1ZW5jZShzdGF0ZSwgYmxvY2tJbmRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS50YWcgPT09IG51bGwpIHtcbiAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICBzdGF0ZS5hbmNob3JNYXBbc3RhdGUuYW5jaG9yXSA9IHN0YXRlLnJlc3VsdDtcbiAgICB9XG5cbiAgfSBlbHNlIGlmIChzdGF0ZS50YWcgPT09ICc/Jykge1xuICAgIC8vIEltcGxpY2l0IHJlc29sdmluZyBpcyBub3QgYWxsb3dlZCBmb3Igbm9uLXNjYWxhciB0eXBlcywgYW5kICc/J1xuICAgIC8vIG5vbi1zcGVjaWZpYyB0YWcgaXMgb25seSBhdXRvbWF0aWNhbGx5IGFzc2lnbmVkIHRvIHBsYWluIHNjYWxhcnMuXG4gICAgLy9cbiAgICAvLyBXZSBvbmx5IG5lZWQgdG8gY2hlY2sga2luZCBjb25mb3JtaXR5IGluIGNhc2UgdXNlciBleHBsaWNpdGx5IGFzc2lnbnMgJz8nXG4gICAgLy8gdGFnLCBmb3IgZXhhbXBsZSBsaWtlIHRoaXM6IFwiITw/PiBbMF1cIlxuICAgIC8vXG4gICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiBzdGF0ZS5raW5kICE9PSAnc2NhbGFyJykge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3VuYWNjZXB0YWJsZSBub2RlIGtpbmQgZm9yICE8Pz4gdGFnOyBpdCBzaG91bGQgYmUgXCJzY2FsYXJcIiwgbm90IFwiJyArIHN0YXRlLmtpbmQgKyAnXCInKTtcbiAgICB9XG5cbiAgICBmb3IgKHR5cGVJbmRleCA9IDAsIHR5cGVRdWFudGl0eSA9IHN0YXRlLmltcGxpY2l0VHlwZXMubGVuZ3RoOyB0eXBlSW5kZXggPCB0eXBlUXVhbnRpdHk7IHR5cGVJbmRleCArPSAxKSB7XG4gICAgICB0eXBlID0gc3RhdGUuaW1wbGljaXRUeXBlc1t0eXBlSW5kZXhdO1xuXG4gICAgICBpZiAodHlwZS5yZXNvbHZlKHN0YXRlLnJlc3VsdCkpIHsgLy8gYHN0YXRlLnJlc3VsdGAgdXBkYXRlZCBpbiByZXNvbHZlciBpZiBtYXRjaGVkXG4gICAgICAgIHN0YXRlLnJlc3VsdCA9IHR5cGUuY29uc3RydWN0KHN0YXRlLnJlc3VsdCk7XG4gICAgICAgIHN0YXRlLnRhZyA9IHR5cGUudGFnO1xuICAgICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhdGUuYW5jaG9yTWFwW3N0YXRlLmFuY2hvcl0gPSBzdGF0ZS5yZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHN0YXRlLnRhZyAhPT0gJyEnKSB7XG4gICAgaWYgKF9oYXNPd25Qcm9wZXJ0eSQxLmNhbGwoc3RhdGUudHlwZU1hcFtzdGF0ZS5raW5kIHx8ICdmYWxsYmFjayddLCBzdGF0ZS50YWcpKSB7XG4gICAgICB0eXBlID0gc3RhdGUudHlwZU1hcFtzdGF0ZS5raW5kIHx8ICdmYWxsYmFjayddW3N0YXRlLnRhZ107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxvb2tpbmcgZm9yIG11bHRpIHR5cGVcbiAgICAgIHR5cGUgPSBudWxsO1xuICAgICAgdHlwZUxpc3QgPSBzdGF0ZS50eXBlTWFwLm11bHRpW3N0YXRlLmtpbmQgfHwgJ2ZhbGxiYWNrJ107XG5cbiAgICAgIGZvciAodHlwZUluZGV4ID0gMCwgdHlwZVF1YW50aXR5ID0gdHlwZUxpc3QubGVuZ3RoOyB0eXBlSW5kZXggPCB0eXBlUXVhbnRpdHk7IHR5cGVJbmRleCArPSAxKSB7XG4gICAgICAgIGlmIChzdGF0ZS50YWcuc2xpY2UoMCwgdHlwZUxpc3RbdHlwZUluZGV4XS50YWcubGVuZ3RoKSA9PT0gdHlwZUxpc3RbdHlwZUluZGV4XS50YWcpIHtcbiAgICAgICAgICB0eXBlID0gdHlwZUxpc3RbdHlwZUluZGV4XTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdHlwZSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ3Vua25vd24gdGFnICE8JyArIHN0YXRlLnRhZyArICc+Jyk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLnJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlLmtpbmQgIT09IHN0YXRlLmtpbmQpIHtcbiAgICAgIHRocm93RXJyb3Ioc3RhdGUsICd1bmFjY2VwdGFibGUgbm9kZSBraW5kIGZvciAhPCcgKyBzdGF0ZS50YWcgKyAnPiB0YWc7IGl0IHNob3VsZCBiZSBcIicgKyB0eXBlLmtpbmQgKyAnXCIsIG5vdCBcIicgKyBzdGF0ZS5raW5kICsgJ1wiJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlLnJlc29sdmUoc3RhdGUucmVzdWx0LCBzdGF0ZS50YWcpKSB7IC8vIGBzdGF0ZS5yZXN1bHRgIHVwZGF0ZWQgaW4gcmVzb2x2ZXIgaWYgbWF0Y2hlZFxuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2Nhbm5vdCByZXNvbHZlIGEgbm9kZSB3aXRoICE8JyArIHN0YXRlLnRhZyArICc+IGV4cGxpY2l0IHRhZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5yZXN1bHQgPSB0eXBlLmNvbnN0cnVjdChzdGF0ZS5yZXN1bHQsIHN0YXRlLnRhZyk7XG4gICAgICBpZiAoc3RhdGUuYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgIHN0YXRlLmFuY2hvck1hcFtzdGF0ZS5hbmNob3JdID0gc3RhdGUucmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdGF0ZS5saXN0ZW5lciAhPT0gbnVsbCkge1xuICAgIHN0YXRlLmxpc3RlbmVyKCdjbG9zZScsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gc3RhdGUudGFnICE9PSBudWxsIHx8ICBzdGF0ZS5hbmNob3IgIT09IG51bGwgfHwgaGFzQ29udGVudDtcbn1cblxuZnVuY3Rpb24gcmVhZERvY3VtZW50KHN0YXRlKSB7XG4gIHZhciBkb2N1bWVudFN0YXJ0ID0gc3RhdGUucG9zaXRpb24sXG4gICAgICBfcG9zaXRpb24sXG4gICAgICBkaXJlY3RpdmVOYW1lLFxuICAgICAgZGlyZWN0aXZlQXJncyxcbiAgICAgIGhhc0RpcmVjdGl2ZXMgPSBmYWxzZSxcbiAgICAgIGNoO1xuXG4gIHN0YXRlLnZlcnNpb24gPSBudWxsO1xuICBzdGF0ZS5jaGVja0xpbmVCcmVha3MgPSBzdGF0ZS5sZWdhY3k7XG4gIHN0YXRlLnRhZ01hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHN0YXRlLmFuY2hvck1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgd2hpbGUgKChjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoc3RhdGUucG9zaXRpb24pKSAhPT0gMCkge1xuICAgIHNraXBTZXBhcmF0aW9uU3BhY2Uoc3RhdGUsIHRydWUsIC0xKTtcblxuICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbik7XG5cbiAgICBpZiAoc3RhdGUubGluZUluZGVudCA+IDAgfHwgY2ggIT09IDB4MjUvKiAlICovKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBoYXNEaXJlY3RpdmVzID0gdHJ1ZTtcbiAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgICB3aGlsZSAoY2ggIT09IDAgJiYgIWlzX1dTX09SX0VPTChjaCkpIHtcbiAgICAgIGNoID0gc3RhdGUuaW5wdXQuY2hhckNvZGVBdCgrK3N0YXRlLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBkaXJlY3RpdmVOYW1lID0gc3RhdGUuaW5wdXQuc2xpY2UoX3Bvc2l0aW9uLCBzdGF0ZS5wb3NpdGlvbik7XG4gICAgZGlyZWN0aXZlQXJncyA9IFtdO1xuXG4gICAgaWYgKGRpcmVjdGl2ZU5hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2RpcmVjdGl2ZSBuYW1lIG11c3Qgbm90IGJlIGxlc3MgdGhhbiBvbmUgY2hhcmFjdGVyIGluIGxlbmd0aCcpO1xuICAgIH1cblxuICAgIHdoaWxlIChjaCAhPT0gMCkge1xuICAgICAgd2hpbGUgKGlzX1dISVRFX1NQQUNFKGNoKSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaCA9PT0gMHgyMy8qICMgKi8pIHtcbiAgICAgICAgZG8geyBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7IH1cbiAgICAgICAgd2hpbGUgKGNoICE9PSAwICYmICFpc19FT0woY2gpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc19FT0woY2gpKSBicmVhaztcblxuICAgICAgX3Bvc2l0aW9uID0gc3RhdGUucG9zaXRpb247XG5cbiAgICAgIHdoaWxlIChjaCAhPT0gMCAmJiAhaXNfV1NfT1JfRU9MKGNoKSkge1xuICAgICAgICBjaCA9IHN0YXRlLmlucHV0LmNoYXJDb2RlQXQoKytzdGF0ZS5wb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGRpcmVjdGl2ZUFyZ3MucHVzaChzdGF0ZS5pbnB1dC5zbGljZShfcG9zaXRpb24sIHN0YXRlLnBvc2l0aW9uKSk7XG4gICAgfVxuXG4gICAgaWYgKGNoICE9PSAwKSByZWFkTGluZUJyZWFrKHN0YXRlKTtcblxuICAgIGlmIChfaGFzT3duUHJvcGVydHkkMS5jYWxsKGRpcmVjdGl2ZUhhbmRsZXJzLCBkaXJlY3RpdmVOYW1lKSkge1xuICAgICAgZGlyZWN0aXZlSGFuZGxlcnNbZGlyZWN0aXZlTmFtZV0oc3RhdGUsIGRpcmVjdGl2ZU5hbWUsIGRpcmVjdGl2ZUFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvd1dhcm5pbmcoc3RhdGUsICd1bmtub3duIGRvY3VtZW50IGRpcmVjdGl2ZSBcIicgKyBkaXJlY3RpdmVOYW1lICsgJ1wiJyk7XG4gICAgfVxuICB9XG5cbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5saW5lSW5kZW50ID09PSAwICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uKSAgICAgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMSkgPT09IDB4MkQvKiAtICovICYmXG4gICAgICBzdGF0ZS5pbnB1dC5jaGFyQ29kZUF0KHN0YXRlLnBvc2l0aW9uICsgMikgPT09IDB4MkQvKiAtICovKSB7XG4gICAgc3RhdGUucG9zaXRpb24gKz0gMztcbiAgICBza2lwU2VwYXJhdGlvblNwYWNlKHN0YXRlLCB0cnVlLCAtMSk7XG5cbiAgfSBlbHNlIGlmIChoYXNEaXJlY3RpdmVzKSB7XG4gICAgdGhyb3dFcnJvcihzdGF0ZSwgJ2RpcmVjdGl2ZXMgZW5kIG1hcmsgaXMgZXhwZWN0ZWQnKTtcbiAgfVxuXG4gIGNvbXBvc2VOb2RlKHN0YXRlLCBzdGF0ZS5saW5lSW5kZW50IC0gMSwgQ09OVEVYVF9CTE9DS19PVVQsIGZhbHNlLCB0cnVlKTtcbiAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuXG4gIGlmIChzdGF0ZS5jaGVja0xpbmVCcmVha3MgJiZcbiAgICAgIFBBVFRFUk5fTk9OX0FTQ0lJX0xJTkVfQlJFQUtTLnRlc3Qoc3RhdGUuaW5wdXQuc2xpY2UoZG9jdW1lbnRTdGFydCwgc3RhdGUucG9zaXRpb24pKSkge1xuICAgIHRocm93V2FybmluZyhzdGF0ZSwgJ25vbi1BU0NJSSBsaW5lIGJyZWFrcyBhcmUgaW50ZXJwcmV0ZWQgYXMgY29udGVudCcpO1xuICB9XG5cbiAgc3RhdGUuZG9jdW1lbnRzLnB1c2goc3RhdGUucmVzdWx0KTtcblxuICBpZiAoc3RhdGUucG9zaXRpb24gPT09IHN0YXRlLmxpbmVTdGFydCAmJiB0ZXN0RG9jdW1lbnRTZXBhcmF0b3Ioc3RhdGUpKSB7XG5cbiAgICBpZiAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MkUvKiAuICovKSB7XG4gICAgICBzdGF0ZS5wb3NpdGlvbiArPSAzO1xuICAgICAgc2tpcFNlcGFyYXRpb25TcGFjZShzdGF0ZSwgdHJ1ZSwgLTEpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoc3RhdGUucG9zaXRpb24gPCAoc3RhdGUubGVuZ3RoIC0gMSkpIHtcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnZW5kIG9mIHRoZSBzdHJlYW0gb3IgYSBkb2N1bWVudCBzZXBhcmF0b3IgaXMgZXhwZWN0ZWQnKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKSB7XG4gIGlucHV0ID0gU3RyaW5nKGlucHV0KTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCAhPT0gMCkge1xuXG4gICAgLy8gQWRkIHRhaWxpbmcgYFxcbmAgaWYgbm90IGV4aXN0c1xuICAgIGlmIChpbnB1dC5jaGFyQ29kZUF0KGlucHV0Lmxlbmd0aCAtIDEpICE9PSAweDBBLyogTEYgKi8gJiZcbiAgICAgICAgaW5wdXQuY2hhckNvZGVBdChpbnB1dC5sZW5ndGggLSAxKSAhPT0gMHgwRC8qIENSICovKSB7XG4gICAgICBpbnB1dCArPSAnXFxuJztcbiAgICB9XG5cbiAgICAvLyBTdHJpcCBCT01cbiAgICBpZiAoaW5wdXQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDEpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzdGF0ZSA9IG5ldyBTdGF0ZSQxKGlucHV0LCBvcHRpb25zKTtcblxuICB2YXIgbnVsbHBvcyA9IGlucHV0LmluZGV4T2YoJ1xcMCcpO1xuXG4gIGlmIChudWxscG9zICE9PSAtMSkge1xuICAgIHN0YXRlLnBvc2l0aW9uID0gbnVsbHBvcztcbiAgICB0aHJvd0Vycm9yKHN0YXRlLCAnbnVsbCBieXRlIGlzIG5vdCBhbGxvd2VkIGluIGlucHV0Jyk7XG4gIH1cblxuICAvLyBVc2UgMCBhcyBzdHJpbmcgdGVybWluYXRvci4gVGhhdCBzaWduaWZpY2FudGx5IHNpbXBsaWZpZXMgYm91bmRzIGNoZWNrLlxuICBzdGF0ZS5pbnB1dCArPSAnXFwwJztcblxuICB3aGlsZSAoc3RhdGUuaW5wdXQuY2hhckNvZGVBdChzdGF0ZS5wb3NpdGlvbikgPT09IDB4MjAvKiBTcGFjZSAqLykge1xuICAgIHN0YXRlLmxpbmVJbmRlbnQgKz0gMTtcbiAgICBzdGF0ZS5wb3NpdGlvbiArPSAxO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLnBvc2l0aW9uIDwgKHN0YXRlLmxlbmd0aCAtIDEpKSB7XG4gICAgcmVhZERvY3VtZW50KHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZS5kb2N1bWVudHM7XG59XG5cblxuZnVuY3Rpb24gbG9hZEFsbCQxKGlucHV0LCBpdGVyYXRvciwgb3B0aW9ucykge1xuICBpZiAoaXRlcmF0b3IgIT09IG51bGwgJiYgdHlwZW9mIGl0ZXJhdG9yID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRpb25zID0gaXRlcmF0b3I7XG4gICAgaXRlcmF0b3IgPSBudWxsO1xuICB9XG5cbiAgdmFyIGRvY3VtZW50cyA9IGxvYWREb2N1bWVudHMoaW5wdXQsIG9wdGlvbnMpO1xuXG4gIGlmICh0eXBlb2YgaXRlcmF0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRzO1xuICB9XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBkb2N1bWVudHMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIGl0ZXJhdG9yKGRvY3VtZW50c1tpbmRleF0pO1xuICB9XG59XG5cblxuZnVuY3Rpb24gbG9hZCQxKGlucHV0LCBvcHRpb25zKSB7XG4gIHZhciBkb2N1bWVudHMgPSBsb2FkRG9jdW1lbnRzKGlucHV0LCBvcHRpb25zKTtcblxuICBpZiAoZG9jdW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgbm8tdW5kZWZpbmVkKi9cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9IGVsc2UgaWYgKGRvY3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gZG9jdW1lbnRzWzBdO1xuICB9XG4gIHRocm93IG5ldyBleGNlcHRpb24oJ2V4cGVjdGVkIGEgc2luZ2xlIGRvY3VtZW50IGluIHRoZSBzdHJlYW0sIGJ1dCBmb3VuZCBtb3JlJyk7XG59XG5cblxudmFyIGxvYWRBbGxfMSA9IGxvYWRBbGwkMTtcbnZhciBsb2FkXzEgICAgPSBsb2FkJDE7XG5cbnZhciBsb2FkZXIgPSB7XG5cdGxvYWRBbGw6IGxvYWRBbGxfMSxcblx0bG9hZDogbG9hZF8xXG59O1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lKi9cblxuXG5cblxuXG52YXIgX3RvU3RyaW5nICAgICAgID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBfaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgQ0hBUl9CT00gICAgICAgICAgICAgICAgICA9IDB4RkVGRjtcbnZhciBDSEFSX1RBQiAgICAgICAgICAgICAgICAgID0gMHgwOTsgLyogVGFiICovXG52YXIgQ0hBUl9MSU5FX0ZFRUQgICAgICAgICAgICA9IDB4MEE7IC8qIExGICovXG52YXIgQ0hBUl9DQVJSSUFHRV9SRVRVUk4gICAgICA9IDB4MEQ7IC8qIENSICovXG52YXIgQ0hBUl9TUEFDRSAgICAgICAgICAgICAgICA9IDB4MjA7IC8qIFNwYWNlICovXG52YXIgQ0hBUl9FWENMQU1BVElPTiAgICAgICAgICA9IDB4MjE7IC8qICEgKi9cbnZhciBDSEFSX0RPVUJMRV9RVU9URSAgICAgICAgID0gMHgyMjsgLyogXCIgKi9cbnZhciBDSEFSX1NIQVJQICAgICAgICAgICAgICAgID0gMHgyMzsgLyogIyAqL1xudmFyIENIQVJfUEVSQ0VOVCAgICAgICAgICAgICAgPSAweDI1OyAvKiAlICovXG52YXIgQ0hBUl9BTVBFUlNBTkQgICAgICAgICAgICA9IDB4MjY7IC8qICYgKi9cbnZhciBDSEFSX1NJTkdMRV9RVU9URSAgICAgICAgID0gMHgyNzsgLyogJyAqL1xudmFyIENIQVJfQVNURVJJU0sgICAgICAgICAgICAgPSAweDJBOyAvKiAqICovXG52YXIgQ0hBUl9DT01NQSAgICAgICAgICAgICAgICA9IDB4MkM7IC8qICwgKi9cbnZhciBDSEFSX01JTlVTICAgICAgICAgICAgICAgID0gMHgyRDsgLyogLSAqL1xudmFyIENIQVJfQ09MT04gICAgICAgICAgICAgICAgPSAweDNBOyAvKiA6ICovXG52YXIgQ0hBUl9FUVVBTFMgICAgICAgICAgICAgICA9IDB4M0Q7IC8qID0gKi9cbnZhciBDSEFSX0dSRUFURVJfVEhBTiAgICAgICAgID0gMHgzRTsgLyogPiAqL1xudmFyIENIQVJfUVVFU1RJT04gICAgICAgICAgICAgPSAweDNGOyAvKiA/ICovXG52YXIgQ0hBUl9DT01NRVJDSUFMX0FUICAgICAgICA9IDB4NDA7IC8qIEAgKi9cbnZhciBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQgID0gMHg1QjsgLyogWyAqL1xudmFyIENIQVJfUklHSFRfU1FVQVJFX0JSQUNLRVQgPSAweDVEOyAvKiBdICovXG52YXIgQ0hBUl9HUkFWRV9BQ0NFTlQgICAgICAgICA9IDB4NjA7IC8qIGAgKi9cbnZhciBDSEFSX0xFRlRfQ1VSTFlfQlJBQ0tFVCAgID0gMHg3QjsgLyogeyAqL1xudmFyIENIQVJfVkVSVElDQUxfTElORSAgICAgICAgPSAweDdDOyAvKiB8ICovXG52YXIgQ0hBUl9SSUdIVF9DVVJMWV9CUkFDS0VUICA9IDB4N0Q7IC8qIH0gKi9cblxudmFyIEVTQ0FQRV9TRVFVRU5DRVMgPSB7fTtcblxuRVNDQVBFX1NFUVVFTkNFU1sweDAwXSAgID0gJ1xcXFwwJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwN10gICA9ICdcXFxcYSc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MDhdICAgPSAnXFxcXGInO1xuRVNDQVBFX1NFUVVFTkNFU1sweDA5XSAgID0gJ1xcXFx0JztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwQV0gICA9ICdcXFxcbic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MEJdICAgPSAnXFxcXHYnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDBDXSAgID0gJ1xcXFxmJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHgwRF0gICA9ICdcXFxccic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MUJdICAgPSAnXFxcXGUnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIyXSAgID0gJ1xcXFxcIic7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4NUNdICAgPSAnXFxcXFxcXFwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDg1XSAgID0gJ1xcXFxOJztcbkVTQ0FQRV9TRVFVRU5DRVNbMHhBMF0gICA9ICdcXFxcXyc7XG5FU0NBUEVfU0VRVUVOQ0VTWzB4MjAyOF0gPSAnXFxcXEwnO1xuRVNDQVBFX1NFUVVFTkNFU1sweDIwMjldID0gJ1xcXFxQJztcblxudmFyIERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYID0gW1xuICAneScsICdZJywgJ3llcycsICdZZXMnLCAnWUVTJywgJ29uJywgJ09uJywgJ09OJyxcbiAgJ24nLCAnTicsICdubycsICdObycsICdOTycsICdvZmYnLCAnT2ZmJywgJ09GRidcbl07XG5cbnZhciBERVBSRUNBVEVEX0JBU0U2MF9TWU5UQVggPSAvXlstK10/WzAtOV9dKyg/OjpbMC05X10rKSsoPzpcXC5bMC05X10qKT8kLztcblxuZnVuY3Rpb24gY29tcGlsZVN0eWxlTWFwKHNjaGVtYSwgbWFwKSB7XG4gIHZhciByZXN1bHQsIGtleXMsIGluZGV4LCBsZW5ndGgsIHRhZywgc3R5bGUsIHR5cGU7XG5cbiAgaWYgKG1hcCA9PT0gbnVsbCkgcmV0dXJuIHt9O1xuXG4gIHJlc3VsdCA9IHt9O1xuICBrZXlzID0gT2JqZWN0LmtleXMobWFwKTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdGFnID0ga2V5c1tpbmRleF07XG4gICAgc3R5bGUgPSBTdHJpbmcobWFwW3RhZ10pO1xuXG4gICAgaWYgKHRhZy5zbGljZSgwLCAyKSA9PT0gJyEhJykge1xuICAgICAgdGFnID0gJ3RhZzp5YW1sLm9yZywyMDAyOicgKyB0YWcuc2xpY2UoMik7XG4gICAgfVxuICAgIHR5cGUgPSBzY2hlbWEuY29tcGlsZWRUeXBlTWFwWydmYWxsYmFjayddW3RhZ107XG5cbiAgICBpZiAodHlwZSAmJiBfaGFzT3duUHJvcGVydHkuY2FsbCh0eXBlLnN0eWxlQWxpYXNlcywgc3R5bGUpKSB7XG4gICAgICBzdHlsZSA9IHR5cGUuc3R5bGVBbGlhc2VzW3N0eWxlXTtcbiAgICB9XG5cbiAgICByZXN1bHRbdGFnXSA9IHN0eWxlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZW5jb2RlSGV4KGNoYXJhY3Rlcikge1xuICB2YXIgc3RyaW5nLCBoYW5kbGUsIGxlbmd0aDtcblxuICBzdHJpbmcgPSBjaGFyYWN0ZXIudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKGNoYXJhY3RlciA8PSAweEZGKSB7XG4gICAgaGFuZGxlID0gJ3gnO1xuICAgIGxlbmd0aCA9IDI7XG4gIH0gZWxzZSBpZiAoY2hhcmFjdGVyIDw9IDB4RkZGRikge1xuICAgIGhhbmRsZSA9ICd1JztcbiAgICBsZW5ndGggPSA0O1xuICB9IGVsc2UgaWYgKGNoYXJhY3RlciA8PSAweEZGRkZGRkZGKSB7XG4gICAgaGFuZGxlID0gJ1UnO1xuICAgIGxlbmd0aCA9IDg7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignY29kZSBwb2ludCB3aXRoaW4gYSBzdHJpbmcgbWF5IG5vdCBiZSBncmVhdGVyIHRoYW4gMHhGRkZGRkZGRicpO1xuICB9XG5cbiAgcmV0dXJuICdcXFxcJyArIGhhbmRsZSArIGNvbW1vbi5yZXBlYXQoJzAnLCBsZW5ndGggLSBzdHJpbmcubGVuZ3RoKSArIHN0cmluZztcbn1cblxuXG52YXIgUVVPVElOR19UWVBFX1NJTkdMRSA9IDEsXG4gICAgUVVPVElOR19UWVBFX0RPVUJMRSA9IDI7XG5cbmZ1bmN0aW9uIFN0YXRlKG9wdGlvbnMpIHtcbiAgdGhpcy5zY2hlbWEgICAgICAgID0gb3B0aW9uc1snc2NoZW1hJ10gfHwgX2RlZmF1bHQ7XG4gIHRoaXMuaW5kZW50ICAgICAgICA9IE1hdGgubWF4KDEsIChvcHRpb25zWydpbmRlbnQnXSB8fCAyKSk7XG4gIHRoaXMubm9BcnJheUluZGVudCA9IG9wdGlvbnNbJ25vQXJyYXlJbmRlbnQnXSB8fCBmYWxzZTtcbiAgdGhpcy5za2lwSW52YWxpZCAgID0gb3B0aW9uc1snc2tpcEludmFsaWQnXSB8fCBmYWxzZTtcbiAgdGhpcy5mbG93TGV2ZWwgICAgID0gKGNvbW1vbi5pc05vdGhpbmcob3B0aW9uc1snZmxvd0xldmVsJ10pID8gLTEgOiBvcHRpb25zWydmbG93TGV2ZWwnXSk7XG4gIHRoaXMuc3R5bGVNYXAgICAgICA9IGNvbXBpbGVTdHlsZU1hcCh0aGlzLnNjaGVtYSwgb3B0aW9uc1snc3R5bGVzJ10gfHwgbnVsbCk7XG4gIHRoaXMuc29ydEtleXMgICAgICA9IG9wdGlvbnNbJ3NvcnRLZXlzJ10gfHwgZmFsc2U7XG4gIHRoaXMubGluZVdpZHRoICAgICA9IG9wdGlvbnNbJ2xpbmVXaWR0aCddIHx8IDgwO1xuICB0aGlzLm5vUmVmcyAgICAgICAgPSBvcHRpb25zWydub1JlZnMnXSB8fCBmYWxzZTtcbiAgdGhpcy5ub0NvbXBhdE1vZGUgID0gb3B0aW9uc1snbm9Db21wYXRNb2RlJ10gfHwgZmFsc2U7XG4gIHRoaXMuY29uZGVuc2VGbG93ICA9IG9wdGlvbnNbJ2NvbmRlbnNlRmxvdyddIHx8IGZhbHNlO1xuICB0aGlzLnF1b3RpbmdUeXBlICAgPSBvcHRpb25zWydxdW90aW5nVHlwZSddID09PSAnXCInID8gUVVPVElOR19UWVBFX0RPVUJMRSA6IFFVT1RJTkdfVFlQRV9TSU5HTEU7XG4gIHRoaXMuZm9yY2VRdW90ZXMgICA9IG9wdGlvbnNbJ2ZvcmNlUXVvdGVzJ10gfHwgZmFsc2U7XG4gIHRoaXMucmVwbGFjZXIgICAgICA9IHR5cGVvZiBvcHRpb25zWydyZXBsYWNlciddID09PSAnZnVuY3Rpb24nID8gb3B0aW9uc1sncmVwbGFjZXInXSA6IG51bGw7XG5cbiAgdGhpcy5pbXBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRJbXBsaWNpdDtcbiAgdGhpcy5leHBsaWNpdFR5cGVzID0gdGhpcy5zY2hlbWEuY29tcGlsZWRFeHBsaWNpdDtcblxuICB0aGlzLnRhZyA9IG51bGw7XG4gIHRoaXMucmVzdWx0ID0gJyc7XG5cbiAgdGhpcy5kdXBsaWNhdGVzID0gW107XG4gIHRoaXMudXNlZER1cGxpY2F0ZXMgPSBudWxsO1xufVxuXG4vLyBJbmRlbnRzIGV2ZXJ5IGxpbmUgaW4gYSBzdHJpbmcuIEVtcHR5IGxpbmVzIChcXG4gb25seSkgYXJlIG5vdCBpbmRlbnRlZC5cbmZ1bmN0aW9uIGluZGVudFN0cmluZyhzdHJpbmcsIHNwYWNlcykge1xuICB2YXIgaW5kID0gY29tbW9uLnJlcGVhdCgnICcsIHNwYWNlcyksXG4gICAgICBwb3NpdGlvbiA9IDAsXG4gICAgICBuZXh0ID0gLTEsXG4gICAgICByZXN1bHQgPSAnJyxcbiAgICAgIGxpbmUsXG4gICAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXG4gIHdoaWxlIChwb3NpdGlvbiA8IGxlbmd0aCkge1xuICAgIG5leHQgPSBzdHJpbmcuaW5kZXhPZignXFxuJywgcG9zaXRpb24pO1xuICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbik7XG4gICAgICBwb3NpdGlvbiA9IGxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluZSA9IHN0cmluZy5zbGljZShwb3NpdGlvbiwgbmV4dCArIDEpO1xuICAgICAgcG9zaXRpb24gPSBuZXh0ICsgMTtcbiAgICB9XG5cbiAgICBpZiAobGluZS5sZW5ndGggJiYgbGluZSAhPT0gJ1xcbicpIHJlc3VsdCArPSBpbmQ7XG5cbiAgICByZXN1bHQgKz0gbGluZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKSB7XG4gIHJldHVybiAnXFxuJyArIGNvbW1vbi5yZXBlYXQoJyAnLCBzdGF0ZS5pbmRlbnQgKiBsZXZlbCk7XG59XG5cbmZ1bmN0aW9uIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyKSB7XG4gIHZhciBpbmRleCwgbGVuZ3RoLCB0eXBlO1xuXG4gIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSBzdGF0ZS5pbXBsaWNpdFR5cGVzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB0eXBlID0gc3RhdGUuaW1wbGljaXRUeXBlc1tpbmRleF07XG5cbiAgICBpZiAodHlwZS5yZXNvbHZlKHN0cikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gWzMzXSBzLXdoaXRlIDo6PSBzLXNwYWNlIHwgcy10YWJcbmZ1bmN0aW9uIGlzV2hpdGVzcGFjZShjKSB7XG4gIHJldHVybiBjID09PSBDSEFSX1NQQUNFIHx8IGMgPT09IENIQVJfVEFCO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgdGhlIGNoYXJhY3RlciBjYW4gYmUgcHJpbnRlZCB3aXRob3V0IGVzY2FwaW5nLlxuLy8gRnJvbSBZQU1MIDEuMjogXCJhbnkgYWxsb3dlZCBjaGFyYWN0ZXJzIGtub3duIHRvIGJlIG5vbi1wcmludGFibGVcbi8vIHNob3VsZCBhbHNvIGJlIGVzY2FwZWQuIFtIb3dldmVyLF0gVGhpcyBpc25cdTIwMTl0IG1hbmRhdG9yeVwiXG4vLyBEZXJpdmVkIGZyb20gbmItY2hhciAtIFxcdCAtICN4ODUgLSAjeEEwIC0gI3gyMDI4IC0gI3gyMDI5LlxuZnVuY3Rpb24gaXNQcmludGFibGUoYykge1xuICByZXR1cm4gICgweDAwMDIwIDw9IGMgJiYgYyA8PSAweDAwMDA3RSlcbiAgICAgIHx8ICgoMHgwMDBBMSA8PSBjICYmIGMgPD0gMHgwMEQ3RkYpICYmIGMgIT09IDB4MjAyOCAmJiBjICE9PSAweDIwMjkpXG4gICAgICB8fCAoKDB4MEUwMDAgPD0gYyAmJiBjIDw9IDB4MDBGRkZEKSAmJiBjICE9PSBDSEFSX0JPTSlcbiAgICAgIHx8ICAoMHgxMDAwMCA8PSBjICYmIGMgPD0gMHgxMEZGRkYpO1xufVxuXG4vLyBbMzRdIG5zLWNoYXIgOjo9IG5iLWNoYXIgLSBzLXdoaXRlXG4vLyBbMjddIG5iLWNoYXIgOjo9IGMtcHJpbnRhYmxlIC0gYi1jaGFyIC0gYy1ieXRlLW9yZGVyLW1hcmtcbi8vIFsyNl0gYi1jaGFyICA6Oj0gYi1saW5lLWZlZWQgfCBiLWNhcnJpYWdlLXJldHVyblxuLy8gSW5jbHVkaW5nIHMtd2hpdGUgKGZvciBzb21lIHJlYXNvbiwgZXhhbXBsZXMgZG9lc24ndCBtYXRjaCBzcGVjcyBpbiB0aGlzIGFzcGVjdClcbi8vIG5zLWNoYXIgOjo9IGMtcHJpbnRhYmxlIC0gYi1saW5lLWZlZWQgLSBiLWNhcnJpYWdlLXJldHVybiAtIGMtYnl0ZS1vcmRlci1tYXJrXG5mdW5jdGlvbiBpc05zQ2hhck9yV2hpdGVzcGFjZShjKSB7XG4gIHJldHVybiBpc1ByaW50YWJsZShjKVxuICAgICYmIGMgIT09IENIQVJfQk9NXG4gICAgLy8gLSBiLWNoYXJcbiAgICAmJiBjICE9PSBDSEFSX0NBUlJJQUdFX1JFVFVSTlxuICAgICYmIGMgIT09IENIQVJfTElORV9GRUVEO1xufVxuXG4vLyBbMTI3XSAgbnMtcGxhaW4tc2FmZShjKSA6Oj0gYyA9IGZsb3ctb3V0ICBcdTIxRDIgbnMtcGxhaW4tc2FmZS1vdXRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gZmxvdy1pbiAgIFx1MjFEMiBucy1wbGFpbi1zYWZlLWluXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGJsb2NrLWtleSBcdTIxRDIgbnMtcGxhaW4tc2FmZS1vdXRcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjID0gZmxvdy1rZXkgIFx1MjFEMiBucy1wbGFpbi1zYWZlLWluXG4vLyBbMTI4XSBucy1wbGFpbi1zYWZlLW91dCA6Oj0gbnMtY2hhclxuLy8gWzEyOV0gIG5zLXBsYWluLXNhZmUtaW4gOjo9IG5zLWNoYXIgLSBjLWZsb3ctaW5kaWNhdG9yXG4vLyBbMTMwXSAgbnMtcGxhaW4tY2hhcihjKSA6Oj0gICggbnMtcGxhaW4tc2FmZShjKSAtIFx1MjAxQzpcdTIwMUQgLSBcdTIwMUMjXHUyMDFEIClcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKCAvKiBBbiBucy1jaGFyIHByZWNlZGluZyAqLyBcdTIwMUMjXHUyMDFEIClcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKCBcdTIwMUM6XHUyMDFEIC8qIEZvbGxvd2VkIGJ5IGFuIG5zLXBsYWluLXNhZmUoYykgKi8gKVxuZnVuY3Rpb24gaXNQbGFpblNhZmUoYywgcHJldiwgaW5ibG9jaykge1xuICB2YXIgY0lzTnNDaGFyT3JXaGl0ZXNwYWNlID0gaXNOc0NoYXJPcldoaXRlc3BhY2UoYyk7XG4gIHZhciBjSXNOc0NoYXIgPSBjSXNOc0NoYXJPcldoaXRlc3BhY2UgJiYgIWlzV2hpdGVzcGFjZShjKTtcbiAgcmV0dXJuIChcbiAgICAvLyBucy1wbGFpbi1zYWZlXG4gICAgaW5ibG9jayA/IC8vIGMgPSBmbG93LWluXG4gICAgICBjSXNOc0NoYXJPcldoaXRlc3BhY2VcbiAgICAgIDogY0lzTnNDaGFyT3JXaGl0ZXNwYWNlXG4gICAgICAgIC8vIC0gYy1mbG93LWluZGljYXRvclxuICAgICAgICAmJiBjICE9PSBDSEFSX0NPTU1BXG4gICAgICAgICYmIGMgIT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVFxuICAgICAgICAmJiBjICE9PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUXG4gICAgICAgICYmIGMgIT09IENIQVJfTEVGVF9DVVJMWV9CUkFDS0VUXG4gICAgICAgICYmIGMgIT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0tFVFxuICApXG4gICAgLy8gbnMtcGxhaW4tY2hhclxuICAgICYmIGMgIT09IENIQVJfU0hBUlAgLy8gZmFsc2Ugb24gJyMnXG4gICAgJiYgIShwcmV2ID09PSBDSEFSX0NPTE9OICYmICFjSXNOc0NoYXIpIC8vIGZhbHNlIG9uICc6ICdcbiAgICB8fCAoaXNOc0NoYXJPcldoaXRlc3BhY2UocHJldikgJiYgIWlzV2hpdGVzcGFjZShwcmV2KSAmJiBjID09PSBDSEFSX1NIQVJQKSAvLyBjaGFuZ2UgdG8gdHJ1ZSBvbiAnW14gXSMnXG4gICAgfHwgKHByZXYgPT09IENIQVJfQ09MT04gJiYgY0lzTnNDaGFyKTsgLy8gY2hhbmdlIHRvIHRydWUgb24gJzpbXiBdJ1xufVxuXG4vLyBTaW1wbGlmaWVkIHRlc3QgZm9yIHZhbHVlcyBhbGxvd2VkIGFzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgaW4gcGxhaW4gc3R5bGUuXG5mdW5jdGlvbiBpc1BsYWluU2FmZUZpcnN0KGMpIHtcbiAgLy8gVXNlcyBhIHN1YnNldCBvZiBucy1jaGFyIC0gYy1pbmRpY2F0b3JcbiAgLy8gd2hlcmUgbnMtY2hhciA9IG5iLWNoYXIgLSBzLXdoaXRlLlxuICAvLyBObyBzdXBwb3J0IG9mICggKCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQy1cdTIwMUQgKSAvKiBGb2xsb3dlZCBieSBhbiBucy1wbGFpbi1zYWZlKGMpKSAqLyApIHBhcnRcbiAgcmV0dXJuIGlzUHJpbnRhYmxlKGMpICYmIGMgIT09IENIQVJfQk9NXG4gICAgJiYgIWlzV2hpdGVzcGFjZShjKSAvLyAtIHMtd2hpdGVcbiAgICAvLyAtIChjLWluZGljYXRvciA6Oj1cbiAgICAvLyBcdTIwMUMtXHUyMDFEIHwgXHUyMDFDP1x1MjAxRCB8IFx1MjAxQzpcdTIwMUQgfCBcdTIwMUMsXHUyMDFEIHwgXHUyMDFDW1x1MjAxRCB8IFx1MjAxQ11cdTIwMUQgfCBcdTIwMUN7XHUyMDFEIHwgXHUyMDFDfVx1MjAxRFxuICAgICYmIGMgIT09IENIQVJfTUlOVVNcbiAgICAmJiBjICE9PSBDSEFSX1FVRVNUSU9OXG4gICAgJiYgYyAhPT0gQ0hBUl9DT0xPTlxuICAgICYmIGMgIT09IENIQVJfQ09NTUFcbiAgICAmJiBjICE9PSBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUXG4gICAgJiYgYyAhPT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNLRVRcbiAgICAmJiBjICE9PSBDSEFSX1JJR0hUX0NVUkxZX0JSQUNLRVRcbiAgICAvLyB8IFx1MjAxQyNcdTIwMUQgfCBcdTIwMUMmXHUyMDFEIHwgXHUyMDFDKlx1MjAxRCB8IFx1MjAxQyFcdTIwMUQgfCBcdTIwMUN8XHUyMDFEIHwgXHUyMDFDPVx1MjAxRCB8IFx1MjAxQz5cdTIwMUQgfCBcdTIwMUMnXHUyMDFEIHwgXHUyMDFDXCJcdTIwMURcbiAgICAmJiBjICE9PSBDSEFSX1NIQVJQXG4gICAgJiYgYyAhPT0gQ0hBUl9BTVBFUlNBTkRcbiAgICAmJiBjICE9PSBDSEFSX0FTVEVSSVNLXG4gICAgJiYgYyAhPT0gQ0hBUl9FWENMQU1BVElPTlxuICAgICYmIGMgIT09IENIQVJfVkVSVElDQUxfTElORVxuICAgICYmIGMgIT09IENIQVJfRVFVQUxTXG4gICAgJiYgYyAhPT0gQ0hBUl9HUkVBVEVSX1RIQU5cbiAgICAmJiBjICE9PSBDSEFSX1NJTkdMRV9RVU9URVxuICAgICYmIGMgIT09IENIQVJfRE9VQkxFX1FVT1RFXG4gICAgLy8gfCBcdTIwMUMlXHUyMDFEIHwgXHUyMDFDQFx1MjAxRCB8IFx1MjAxQ2BcdTIwMUQpXG4gICAgJiYgYyAhPT0gQ0hBUl9QRVJDRU5UXG4gICAgJiYgYyAhPT0gQ0hBUl9DT01NRVJDSUFMX0FUXG4gICAgJiYgYyAhPT0gQ0hBUl9HUkFWRV9BQ0NFTlQ7XG59XG5cbi8vIFNpbXBsaWZpZWQgdGVzdCBmb3IgdmFsdWVzIGFsbG93ZWQgYXMgdGhlIGxhc3QgY2hhcmFjdGVyIGluIHBsYWluIHN0eWxlLlxuZnVuY3Rpb24gaXNQbGFpblNhZmVMYXN0KGMpIHtcbiAgLy8ganVzdCBub3Qgd2hpdGVzcGFjZSBvciBjb2xvbiwgaXQgd2lsbCBiZSBjaGVja2VkIHRvIGJlIHBsYWluIGNoYXJhY3RlciBsYXRlclxuICByZXR1cm4gIWlzV2hpdGVzcGFjZShjKSAmJiBjICE9PSBDSEFSX0NPTE9OO1xufVxuXG4vLyBTYW1lIGFzICdzdHJpbmcnLmNvZGVQb2ludEF0KHBvcyksIGJ1dCB3b3JrcyBpbiBvbGRlciBicm93c2Vycy5cbmZ1bmN0aW9uIGNvZGVQb2ludEF0KHN0cmluZywgcG9zKSB7XG4gIHZhciBmaXJzdCA9IHN0cmluZy5jaGFyQ29kZUF0KHBvcyksIHNlY29uZDtcbiAgaWYgKGZpcnN0ID49IDB4RDgwMCAmJiBmaXJzdCA8PSAweERCRkYgJiYgcG9zICsgMSA8IHN0cmluZy5sZW5ndGgpIHtcbiAgICBzZWNvbmQgPSBzdHJpbmcuY2hhckNvZGVBdChwb3MgKyAxKTtcbiAgICBpZiAoc2Vjb25kID49IDB4REMwMCAmJiBzZWNvbmQgPD0gMHhERkZGKSB7XG4gICAgICAvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcbiAgICAgIHJldHVybiAoZmlyc3QgLSAweEQ4MDApICogMHg0MDAgKyBzZWNvbmQgLSAweERDMDAgKyAweDEwMDAwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmlyc3Q7XG59XG5cbi8vIERldGVybWluZXMgd2hldGhlciBibG9jayBpbmRlbnRhdGlvbiBpbmRpY2F0b3IgaXMgcmVxdWlyZWQuXG5mdW5jdGlvbiBuZWVkSW5kZW50SW5kaWNhdG9yKHN0cmluZykge1xuICB2YXIgbGVhZGluZ1NwYWNlUmUgPSAvXlxcbiogLztcbiAgcmV0dXJuIGxlYWRpbmdTcGFjZVJlLnRlc3Qoc3RyaW5nKTtcbn1cblxudmFyIFNUWUxFX1BMQUlOICAgPSAxLFxuICAgIFNUWUxFX1NJTkdMRSAgPSAyLFxuICAgIFNUWUxFX0xJVEVSQUwgPSAzLFxuICAgIFNUWUxFX0ZPTERFRCAgPSA0LFxuICAgIFNUWUxFX0RPVUJMRSAgPSA1O1xuXG4vLyBEZXRlcm1pbmVzIHdoaWNoIHNjYWxhciBzdHlsZXMgYXJlIHBvc3NpYmxlIGFuZCByZXR1cm5zIHRoZSBwcmVmZXJyZWQgc3R5bGUuXG4vLyBsaW5lV2lkdGggPSAtMSA9PiBubyBsaW1pdC5cbi8vIFByZS1jb25kaXRpb25zOiBzdHIubGVuZ3RoID4gMC5cbi8vIFBvc3QtY29uZGl0aW9uczpcbi8vICAgIFNUWUxFX1BMQUlOIG9yIFNUWUxFX1NJTkdMRSA9PiBubyBcXG4gYXJlIGluIHRoZSBzdHJpbmcuXG4vLyAgICBTVFlMRV9MSVRFUkFMID0+IG5vIGxpbmVzIGFyZSBzdWl0YWJsZSBmb3IgZm9sZGluZyAob3IgbGluZVdpZHRoIGlzIC0xKS5cbi8vICAgIFNUWUxFX0ZPTERFRCA9PiBhIGxpbmUgPiBsaW5lV2lkdGggYW5kIGNhbiBiZSBmb2xkZWQgKGFuZCBsaW5lV2lkdGggIT0gLTEpLlxuZnVuY3Rpb24gY2hvb3NlU2NhbGFyU3R5bGUoc3RyaW5nLCBzaW5nbGVMaW5lT25seSwgaW5kZW50UGVyTGV2ZWwsIGxpbmVXaWR0aCxcbiAgdGVzdEFtYmlndW91c1R5cGUsIHF1b3RpbmdUeXBlLCBmb3JjZVF1b3RlcywgaW5ibG9jaykge1xuXG4gIHZhciBpO1xuICB2YXIgY2hhciA9IDA7XG4gIHZhciBwcmV2Q2hhciA9IG51bGw7XG4gIHZhciBoYXNMaW5lQnJlYWsgPSBmYWxzZTtcbiAgdmFyIGhhc0ZvbGRhYmxlTGluZSA9IGZhbHNlOyAvLyBvbmx5IGNoZWNrZWQgaWYgc2hvdWxkVHJhY2tXaWR0aFxuICB2YXIgc2hvdWxkVHJhY2tXaWR0aCA9IGxpbmVXaWR0aCAhPT0gLTE7XG4gIHZhciBwcmV2aW91c0xpbmVCcmVhayA9IC0xOyAvLyBjb3VudCB0aGUgZmlyc3QgbGluZSBjb3JyZWN0bHlcbiAgdmFyIHBsYWluID0gaXNQbGFpblNhZmVGaXJzdChjb2RlUG9pbnRBdChzdHJpbmcsIDApKVxuICAgICAgICAgICYmIGlzUGxhaW5TYWZlTGFzdChjb2RlUG9pbnRBdChzdHJpbmcsIHN0cmluZy5sZW5ndGggLSAxKSk7XG5cbiAgaWYgKHNpbmdsZUxpbmVPbmx5IHx8IGZvcmNlUXVvdGVzKSB7XG4gICAgLy8gQ2FzZTogbm8gYmxvY2sgc3R5bGVzLlxuICAgIC8vIENoZWNrIGZvciBkaXNhbGxvd2VkIGNoYXJhY3RlcnMgdG8gcnVsZSBvdXQgcGxhaW4gYW5kIHNpbmdsZS5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgY2hhciA+PSAweDEwMDAwID8gaSArPSAyIDogaSsrKSB7XG4gICAgICBjaGFyID0gY29kZVBvaW50QXQoc3RyaW5nLCBpKTtcbiAgICAgIGlmICghaXNQcmludGFibGUoY2hhcikpIHtcbiAgICAgICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgICAgIH1cbiAgICAgIHBsYWluID0gcGxhaW4gJiYgaXNQbGFpblNhZmUoY2hhciwgcHJldkNoYXIsIGluYmxvY2spO1xuICAgICAgcHJldkNoYXIgPSBjaGFyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBDYXNlOiBibG9jayBzdHlsZXMgcGVybWl0dGVkLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBjaGFyID49IDB4MTAwMDAgPyBpICs9IDIgOiBpKyspIHtcbiAgICAgIGNoYXIgPSBjb2RlUG9pbnRBdChzdHJpbmcsIGkpO1xuICAgICAgaWYgKGNoYXIgPT09IENIQVJfTElORV9GRUVEKSB7XG4gICAgICAgIGhhc0xpbmVCcmVhayA9IHRydWU7XG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBsaW5lIGNhbiBiZSBmb2xkZWQuXG4gICAgICAgIGlmIChzaG91bGRUcmFja1dpZHRoKSB7XG4gICAgICAgICAgaGFzRm9sZGFibGVMaW5lID0gaGFzRm9sZGFibGVMaW5lIHx8XG4gICAgICAgICAgICAvLyBGb2xkYWJsZSBsaW5lID0gdG9vIGxvbmcsIGFuZCBub3QgbW9yZS1pbmRlbnRlZC5cbiAgICAgICAgICAgIChpIC0gcHJldmlvdXNMaW5lQnJlYWsgLSAxID4gbGluZVdpZHRoICYmXG4gICAgICAgICAgICAgc3RyaW5nW3ByZXZpb3VzTGluZUJyZWFrICsgMV0gIT09ICcgJyk7XG4gICAgICAgICAgcHJldmlvdXNMaW5lQnJlYWsgPSBpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFpc1ByaW50YWJsZShjaGFyKSkge1xuICAgICAgICByZXR1cm4gU1RZTEVfRE9VQkxFO1xuICAgICAgfVxuICAgICAgcGxhaW4gPSBwbGFpbiAmJiBpc1BsYWluU2FmZShjaGFyLCBwcmV2Q2hhciwgaW5ibG9jayk7XG4gICAgICBwcmV2Q2hhciA9IGNoYXI7XG4gICAgfVxuICAgIC8vIGluIGNhc2UgdGhlIGVuZCBpcyBtaXNzaW5nIGEgXFxuXG4gICAgaGFzRm9sZGFibGVMaW5lID0gaGFzRm9sZGFibGVMaW5lIHx8IChzaG91bGRUcmFja1dpZHRoICYmXG4gICAgICAoaSAtIHByZXZpb3VzTGluZUJyZWFrIC0gMSA+IGxpbmVXaWR0aCAmJlxuICAgICAgIHN0cmluZ1twcmV2aW91c0xpbmVCcmVhayArIDFdICE9PSAnICcpKTtcbiAgfVxuICAvLyBBbHRob3VnaCBldmVyeSBzdHlsZSBjYW4gcmVwcmVzZW50IFxcbiB3aXRob3V0IGVzY2FwaW5nLCBwcmVmZXIgYmxvY2sgc3R5bGVzXG4gIC8vIGZvciBtdWx0aWxpbmUsIHNpbmNlIHRoZXkncmUgbW9yZSByZWFkYWJsZSBhbmQgdGhleSBkb24ndCBhZGQgZW1wdHkgbGluZXMuXG4gIC8vIEFsc28gcHJlZmVyIGZvbGRpbmcgYSBzdXBlci1sb25nIGxpbmUuXG4gIGlmICghaGFzTGluZUJyZWFrICYmICFoYXNGb2xkYWJsZUxpbmUpIHtcbiAgICAvLyBTdHJpbmdzIGludGVycHJldGFibGUgYXMgYW5vdGhlciB0eXBlIGhhdmUgdG8gYmUgcXVvdGVkO1xuICAgIC8vIGUuZy4gdGhlIHN0cmluZyAndHJ1ZScgdnMuIHRoZSBib29sZWFuIHRydWUuXG4gICAgaWYgKHBsYWluICYmICFmb3JjZVF1b3RlcyAmJiAhdGVzdEFtYmlndW91c1R5cGUoc3RyaW5nKSkge1xuICAgICAgcmV0dXJuIFNUWUxFX1BMQUlOO1xuICAgIH1cbiAgICByZXR1cm4gcXVvdGluZ1R5cGUgPT09IFFVT1RJTkdfVFlQRV9ET1VCTEUgPyBTVFlMRV9ET1VCTEUgOiBTVFlMRV9TSU5HTEU7XG4gIH1cbiAgLy8gRWRnZSBjYXNlOiBibG9jayBpbmRlbnRhdGlvbiBpbmRpY2F0b3IgY2FuIG9ubHkgaGF2ZSBvbmUgZGlnaXQuXG4gIGlmIChpbmRlbnRQZXJMZXZlbCA+IDkgJiYgbmVlZEluZGVudEluZGljYXRvcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIFNUWUxFX0RPVUJMRTtcbiAgfVxuICAvLyBBdCB0aGlzIHBvaW50IHdlIGtub3cgYmxvY2sgc3R5bGVzIGFyZSB2YWxpZC5cbiAgLy8gUHJlZmVyIGxpdGVyYWwgc3R5bGUgdW5sZXNzIHdlIHdhbnQgdG8gZm9sZC5cbiAgaWYgKCFmb3JjZVF1b3Rlcykge1xuICAgIHJldHVybiBoYXNGb2xkYWJsZUxpbmUgPyBTVFlMRV9GT0xERUQgOiBTVFlMRV9MSVRFUkFMO1xuICB9XG4gIHJldHVybiBxdW90aW5nVHlwZSA9PT0gUVVPVElOR19UWVBFX0RPVUJMRSA/IFNUWUxFX0RPVUJMRSA6IFNUWUxFX1NJTkdMRTtcbn1cblxuLy8gTm90ZTogbGluZSBicmVha2luZy9mb2xkaW5nIGlzIGltcGxlbWVudGVkIGZvciBvbmx5IHRoZSBmb2xkZWQgc3R5bGUuXG4vLyBOQi4gV2UgZHJvcCB0aGUgbGFzdCB0cmFpbGluZyBuZXdsaW5lIChpZiBhbnkpIG9mIGEgcmV0dXJuZWQgYmxvY2sgc2NhbGFyXG4vLyAgc2luY2UgdGhlIGR1bXBlciBhZGRzIGl0cyBvd24gbmV3bGluZS4gVGhpcyBhbHdheXMgd29ya3M6XG4vLyAgICBcdTIwMjIgTm8gZW5kaW5nIG5ld2xpbmUgPT4gdW5hZmZlY3RlZDsgYWxyZWFkeSB1c2luZyBzdHJpcCBcIi1cIiBjaG9tcGluZy5cbi8vICAgIFx1MjAyMiBFbmRpbmcgbmV3bGluZSAgICA9PiByZW1vdmVkIHRoZW4gcmVzdG9yZWQuXG4vLyAgSW1wb3J0YW50bHksIHRoaXMga2VlcHMgdGhlIFwiK1wiIGNob21wIGluZGljYXRvciBmcm9tIGdhaW5pbmcgYW4gZXh0cmEgbGluZS5cbmZ1bmN0aW9uIHdyaXRlU2NhbGFyKHN0YXRlLCBzdHJpbmcsIGxldmVsLCBpc2tleSwgaW5ibG9jaykge1xuICBzdGF0ZS5kdW1wID0gKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHN0YXRlLnF1b3RpbmdUeXBlID09PSBRVU9USU5HX1RZUEVfRE9VQkxFID8gJ1wiXCInIDogXCInJ1wiO1xuICAgIH1cbiAgICBpZiAoIXN0YXRlLm5vQ29tcGF0TW9kZSkge1xuICAgICAgaWYgKERFUFJFQ0FURURfQk9PTEVBTlNfU1lOVEFYLmluZGV4T2Yoc3RyaW5nKSAhPT0gLTEgfHwgREVQUkVDQVRFRF9CQVNFNjBfU1lOVEFYLnRlc3Qoc3RyaW5nKSkge1xuICAgICAgICByZXR1cm4gc3RhdGUucXVvdGluZ1R5cGUgPT09IFFVT1RJTkdfVFlQRV9ET1VCTEUgPyAoJ1wiJyArIHN0cmluZyArICdcIicpIDogKFwiJ1wiICsgc3RyaW5nICsgXCInXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBzdGF0ZS5pbmRlbnQgKiBNYXRoLm1heCgxLCBsZXZlbCk7IC8vIG5vIDAtaW5kZW50IHNjYWxhcnNcbiAgICAvLyBBcyBpbmRlbnRhdGlvbiBnZXRzIGRlZXBlciwgbGV0IHRoZSB3aWR0aCBkZWNyZWFzZSBtb25vdG9uaWNhbGx5XG4gICAgLy8gdG8gdGhlIGxvd2VyIGJvdW5kIG1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKS5cbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBpbXBsaWVzXG4gICAgLy8gIHN0YXRlLmxpbmVXaWR0aCBcdTIyNjQgNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGlzIGZpeGVkIGF0IHRoZSBsb3dlciBib3VuZC5cbiAgICAvLyAgc3RhdGUubGluZVdpZHRoID4gNDAgKyBzdGF0ZS5pbmRlbnQ6IHdpZHRoIGRlY3JlYXNlcyB1bnRpbCB0aGUgbG93ZXIgYm91bmQuXG4gICAgLy8gVGhpcyBiZWhhdmVzIGJldHRlciB0aGFuIGEgY29uc3RhbnQgbWluaW11bSB3aWR0aCB3aGljaCBkaXNhbGxvd3MgbmFycm93ZXIgb3B0aW9ucyxcbiAgICAvLyBvciBhbiBpbmRlbnQgdGhyZXNob2xkIHdoaWNoIGNhdXNlcyB0aGUgd2lkdGggdG8gc3VkZGVubHkgaW5jcmVhc2UuXG4gICAgdmFyIGxpbmVXaWR0aCA9IHN0YXRlLmxpbmVXaWR0aCA9PT0gLTFcbiAgICAgID8gLTEgOiBNYXRoLm1heChNYXRoLm1pbihzdGF0ZS5saW5lV2lkdGgsIDQwKSwgc3RhdGUubGluZVdpZHRoIC0gaW5kZW50KTtcblxuICAgIC8vIFdpdGhvdXQga25vd2luZyBpZiBrZXlzIGFyZSBpbXBsaWNpdC9leHBsaWNpdCwgYXNzdW1lIGltcGxpY2l0IGZvciBzYWZldHkuXG4gICAgdmFyIHNpbmdsZUxpbmVPbmx5ID0gaXNrZXlcbiAgICAgIC8vIE5vIGJsb2NrIHN0eWxlcyBpbiBmbG93IG1vZGUuXG4gICAgICB8fCAoc3RhdGUuZmxvd0xldmVsID4gLTEgJiYgbGV2ZWwgPj0gc3RhdGUuZmxvd0xldmVsKTtcbiAgICBmdW5jdGlvbiB0ZXN0QW1iaWd1aXR5KHN0cmluZykge1xuICAgICAgcmV0dXJuIHRlc3RJbXBsaWNpdFJlc29sdmluZyhzdGF0ZSwgc3RyaW5nKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNob29zZVNjYWxhclN0eWxlKHN0cmluZywgc2luZ2xlTGluZU9ubHksIHN0YXRlLmluZGVudCwgbGluZVdpZHRoLFxuICAgICAgdGVzdEFtYmlndWl0eSwgc3RhdGUucXVvdGluZ1R5cGUsIHN0YXRlLmZvcmNlUXVvdGVzICYmICFpc2tleSwgaW5ibG9jaykpIHtcblxuICAgICAgY2FzZSBTVFlMRV9QTEFJTjpcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIGNhc2UgU1RZTEVfU0lOR0xFOlxuICAgICAgICByZXR1cm4gXCInXCIgKyBzdHJpbmcucmVwbGFjZSgvJy9nLCBcIicnXCIpICsgXCInXCI7XG4gICAgICBjYXNlIFNUWUxFX0xJVEVSQUw6XG4gICAgICAgIHJldHVybiAnfCcgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhzdHJpbmcsIGluZGVudCkpO1xuICAgICAgY2FzZSBTVFlMRV9GT0xERUQ6XG4gICAgICAgIHJldHVybiAnPicgKyBibG9ja0hlYWRlcihzdHJpbmcsIHN0YXRlLmluZGVudClcbiAgICAgICAgICArIGRyb3BFbmRpbmdOZXdsaW5lKGluZGVudFN0cmluZyhmb2xkU3RyaW5nKHN0cmluZywgbGluZVdpZHRoKSwgaW5kZW50KSk7XG4gICAgICBjYXNlIFNUWUxFX0RPVUJMRTpcbiAgICAgICAgcmV0dXJuICdcIicgKyBlc2NhcGVTdHJpbmcoc3RyaW5nKSArICdcIic7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uKCdpbXBvc3NpYmxlIGVycm9yOiBpbnZhbGlkIHNjYWxhciBzdHlsZScpO1xuICAgIH1cbiAgfSgpKTtcbn1cblxuLy8gUHJlLWNvbmRpdGlvbnM6IHN0cmluZyBpcyB2YWxpZCBmb3IgYSBibG9jayBzY2FsYXIsIDEgPD0gaW5kZW50UGVyTGV2ZWwgPD0gOS5cbmZ1bmN0aW9uIGJsb2NrSGVhZGVyKHN0cmluZywgaW5kZW50UGVyTGV2ZWwpIHtcbiAgdmFyIGluZGVudEluZGljYXRvciA9IG5lZWRJbmRlbnRJbmRpY2F0b3Ioc3RyaW5nKSA/IFN0cmluZyhpbmRlbnRQZXJMZXZlbCkgOiAnJztcblxuICAvLyBub3RlIHRoZSBzcGVjaWFsIGNhc2U6IHRoZSBzdHJpbmcgJ1xcbicgY291bnRzIGFzIGEgXCJ0cmFpbGluZ1wiIGVtcHR5IGxpbmUuXG4gIHZhciBjbGlwID0gICAgICAgICAgc3RyaW5nW3N0cmluZy5sZW5ndGggLSAxXSA9PT0gJ1xcbic7XG4gIHZhciBrZWVwID0gY2xpcCAmJiAoc3RyaW5nW3N0cmluZy5sZW5ndGggLSAyXSA9PT0gJ1xcbicgfHwgc3RyaW5nID09PSAnXFxuJyk7XG4gIHZhciBjaG9tcCA9IGtlZXAgPyAnKycgOiAoY2xpcCA/ICcnIDogJy0nKTtcblxuICByZXR1cm4gaW5kZW50SW5kaWNhdG9yICsgY2hvbXAgKyAnXFxuJztcbn1cblxuLy8gKFNlZSB0aGUgbm90ZSBmb3Igd3JpdGVTY2FsYXIuKVxuZnVuY3Rpb24gZHJvcEVuZGluZ05ld2xpbmUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmdbc3RyaW5nLmxlbmd0aCAtIDFdID09PSAnXFxuJyA/IHN0cmluZy5zbGljZSgwLCAtMSkgOiBzdHJpbmc7XG59XG5cbi8vIE5vdGU6IGEgbG9uZyBsaW5lIHdpdGhvdXQgYSBzdWl0YWJsZSBicmVhayBwb2ludCB3aWxsIGV4Y2VlZCB0aGUgd2lkdGggbGltaXQuXG4vLyBQcmUtY29uZGl0aW9uczogZXZlcnkgY2hhciBpbiBzdHIgaXNQcmludGFibGUsIHN0ci5sZW5ndGggPiAwLCB3aWR0aCA+IDAuXG5mdW5jdGlvbiBmb2xkU3RyaW5nKHN0cmluZywgd2lkdGgpIHtcbiAgLy8gSW4gZm9sZGVkIHN0eWxlLCAkayQgY29uc2VjdXRpdmUgbmV3bGluZXMgb3V0cHV0IGFzICRrKzEkIG5ld2xpbmVzXHUyMDE0XG4gIC8vIHVubGVzcyB0aGV5J3JlIGJlZm9yZSBvciBhZnRlciBhIG1vcmUtaW5kZW50ZWQgbGluZSwgb3IgYXQgdGhlIHZlcnlcbiAgLy8gYmVnaW5uaW5nIG9yIGVuZCwgaW4gd2hpY2ggY2FzZSAkayQgbWFwcyB0byAkayQuXG4gIC8vIFRoZXJlZm9yZSwgcGFyc2UgZWFjaCBjaHVuayBhcyBuZXdsaW5lKHMpIGZvbGxvd2VkIGJ5IGEgY29udGVudCBsaW5lLlxuICB2YXIgbGluZVJlID0gLyhcXG4rKShbXlxcbl0qKS9nO1xuXG4gIC8vIGZpcnN0IGxpbmUgKHBvc3NpYmx5IGFuIGVtcHR5IGxpbmUpXG4gIHZhciByZXN1bHQgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBuZXh0TEYgPSBzdHJpbmcuaW5kZXhPZignXFxuJyk7XG4gICAgbmV4dExGID0gbmV4dExGICE9PSAtMSA/IG5leHRMRiA6IHN0cmluZy5sZW5ndGg7XG4gICAgbGluZVJlLmxhc3RJbmRleCA9IG5leHRMRjtcbiAgICByZXR1cm4gZm9sZExpbmUoc3RyaW5nLnNsaWNlKDAsIG5leHRMRiksIHdpZHRoKTtcbiAgfSgpKTtcbiAgLy8gSWYgd2UgaGF2ZW4ndCByZWFjaGVkIHRoZSBmaXJzdCBjb250ZW50IGxpbmUgeWV0LCBkb24ndCBhZGQgYW4gZXh0cmEgXFxuLlxuICB2YXIgcHJldk1vcmVJbmRlbnRlZCA9IHN0cmluZ1swXSA9PT0gJ1xcbicgfHwgc3RyaW5nWzBdID09PSAnICc7XG4gIHZhciBtb3JlSW5kZW50ZWQ7XG5cbiAgLy8gcmVzdCBvZiB0aGUgbGluZXNcbiAgdmFyIG1hdGNoO1xuICB3aGlsZSAoKG1hdGNoID0gbGluZVJlLmV4ZWMoc3RyaW5nKSkpIHtcbiAgICB2YXIgcHJlZml4ID0gbWF0Y2hbMV0sIGxpbmUgPSBtYXRjaFsyXTtcbiAgICBtb3JlSW5kZW50ZWQgPSAobGluZVswXSA9PT0gJyAnKTtcbiAgICByZXN1bHQgKz0gcHJlZml4XG4gICAgICArICghcHJldk1vcmVJbmRlbnRlZCAmJiAhbW9yZUluZGVudGVkICYmIGxpbmUgIT09ICcnXG4gICAgICAgID8gJ1xcbicgOiAnJylcbiAgICAgICsgZm9sZExpbmUobGluZSwgd2lkdGgpO1xuICAgIHByZXZNb3JlSW5kZW50ZWQgPSBtb3JlSW5kZW50ZWQ7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBHcmVlZHkgbGluZSBicmVha2luZy5cbi8vIFBpY2tzIHRoZSBsb25nZXN0IGxpbmUgdW5kZXIgdGhlIGxpbWl0IGVhY2ggdGltZSxcbi8vIG90aGVyd2lzZSBzZXR0bGVzIGZvciB0aGUgc2hvcnRlc3QgbGluZSBvdmVyIHRoZSBsaW1pdC5cbi8vIE5CLiBNb3JlLWluZGVudGVkIGxpbmVzICpjYW5ub3QqIGJlIGZvbGRlZCwgYXMgdGhhdCB3b3VsZCBhZGQgYW4gZXh0cmEgXFxuLlxuZnVuY3Rpb24gZm9sZExpbmUobGluZSwgd2lkdGgpIHtcbiAgaWYgKGxpbmUgPT09ICcnIHx8IGxpbmVbMF0gPT09ICcgJykgcmV0dXJuIGxpbmU7XG5cbiAgLy8gU2luY2UgYSBtb3JlLWluZGVudGVkIGxpbmUgYWRkcyBhIFxcbiwgYnJlYWtzIGNhbid0IGJlIGZvbGxvd2VkIGJ5IGEgc3BhY2UuXG4gIHZhciBicmVha1JlID0gLyBbXiBdL2c7IC8vIG5vdGU6IHRoZSBtYXRjaCBpbmRleCB3aWxsIGFsd2F5cyBiZSA8PSBsZW5ndGgtMi5cbiAgdmFyIG1hdGNoO1xuICAvLyBzdGFydCBpcyBhbiBpbmNsdXNpdmUgaW5kZXguIGVuZCwgY3VyciwgYW5kIG5leHQgYXJlIGV4Y2x1c2l2ZS5cbiAgdmFyIHN0YXJ0ID0gMCwgZW5kLCBjdXJyID0gMCwgbmV4dCA9IDA7XG4gIHZhciByZXN1bHQgPSAnJztcblxuICAvLyBJbnZhcmlhbnRzOiAwIDw9IHN0YXJ0IDw9IGxlbmd0aC0xLlxuICAvLyAgIDAgPD0gY3VyciA8PSBuZXh0IDw9IG1heCgwLCBsZW5ndGgtMikuIGN1cnIgLSBzdGFydCA8PSB3aWR0aC5cbiAgLy8gSW5zaWRlIHRoZSBsb29wOlxuICAvLyAgIEEgbWF0Y2ggaW1wbGllcyBsZW5ndGggPj0gMiwgc28gY3VyciBhbmQgbmV4dCBhcmUgPD0gbGVuZ3RoLTIuXG4gIHdoaWxlICgobWF0Y2ggPSBicmVha1JlLmV4ZWMobGluZSkpKSB7XG4gICAgbmV4dCA9IG1hdGNoLmluZGV4O1xuICAgIC8vIG1haW50YWluIGludmFyaWFudDogY3VyciAtIHN0YXJ0IDw9IHdpZHRoXG4gICAgaWYgKG5leHQgLSBzdGFydCA+IHdpZHRoKSB7XG4gICAgICBlbmQgPSAoY3VyciA+IHN0YXJ0KSA/IGN1cnIgOiBuZXh0OyAvLyBkZXJpdmUgZW5kIDw9IGxlbmd0aC0yXG4gICAgICByZXN1bHQgKz0gJ1xcbicgKyBsaW5lLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgLy8gc2tpcCB0aGUgc3BhY2UgdGhhdCB3YXMgb3V0cHV0IGFzIFxcblxuICAgICAgc3RhcnQgPSBlbmQgKyAxOyAgICAgICAgICAgICAgICAgICAgLy8gZGVyaXZlIHN0YXJ0IDw9IGxlbmd0aC0xXG4gICAgfVxuICAgIGN1cnIgPSBuZXh0O1xuICB9XG5cbiAgLy8gQnkgdGhlIGludmFyaWFudHMsIHN0YXJ0IDw9IGxlbmd0aC0xLCBzbyB0aGVyZSBpcyBzb21ldGhpbmcgbGVmdCBvdmVyLlxuICAvLyBJdCBpcyBlaXRoZXIgdGhlIHdob2xlIHN0cmluZyBvciBhIHBhcnQgc3RhcnRpbmcgZnJvbSBub24td2hpdGVzcGFjZS5cbiAgcmVzdWx0ICs9ICdcXG4nO1xuICAvLyBJbnNlcnQgYSBicmVhayBpZiB0aGUgcmVtYWluZGVyIGlzIHRvbyBsb25nIGFuZCB0aGVyZSBpcyBhIGJyZWFrIGF2YWlsYWJsZS5cbiAgaWYgKGxpbmUubGVuZ3RoIC0gc3RhcnQgPiB3aWR0aCAmJiBjdXJyID4gc3RhcnQpIHtcbiAgICByZXN1bHQgKz0gbGluZS5zbGljZShzdGFydCwgY3VycikgKyAnXFxuJyArIGxpbmUuc2xpY2UoY3VyciArIDEpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCArPSBsaW5lLnNsaWNlKHN0YXJ0KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuc2xpY2UoMSk7IC8vIGRyb3AgZXh0cmEgXFxuIGpvaW5lclxufVxuXG4vLyBFc2NhcGVzIGEgZG91YmxlLXF1b3RlZCBzdHJpbmcuXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcoc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgdmFyIGNoYXIgPSAwO1xuICB2YXIgZXNjYXBlU2VxO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgY2hhciA+PSAweDEwMDAwID8gaSArPSAyIDogaSsrKSB7XG4gICAgY2hhciA9IGNvZGVQb2ludEF0KHN0cmluZywgaSk7XG4gICAgZXNjYXBlU2VxID0gRVNDQVBFX1NFUVVFTkNFU1tjaGFyXTtcblxuICAgIGlmICghZXNjYXBlU2VxICYmIGlzUHJpbnRhYmxlKGNoYXIpKSB7XG4gICAgICByZXN1bHQgKz0gc3RyaW5nW2ldO1xuICAgICAgaWYgKGNoYXIgPj0gMHgxMDAwMCkgcmVzdWx0ICs9IHN0cmluZ1tpICsgMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSBlc2NhcGVTZXEgfHwgZW5jb2RlSGV4KGNoYXIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvd1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ID0gJycsXG4gICAgICBfdGFnICAgID0gc3RhdGUudGFnLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICB2YWx1ZTtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICB2YWx1ZSA9IG9iamVjdFtpbmRleF07XG5cbiAgICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICAgIHZhbHVlID0gc3RhdGUucmVwbGFjZXIuY2FsbChvYmplY3QsIFN0cmluZyhpbmRleCksIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyBXcml0ZSBvbmx5IHZhbGlkIGVsZW1lbnRzLCBwdXQgbnVsbCBpbnN0ZWFkIG9mIGludmFsaWQgZWxlbWVudHMuXG4gICAgaWYgKHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIHZhbHVlLCBmYWxzZSwgZmFsc2UpIHx8XG4gICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBudWxsLCBmYWxzZSwgZmFsc2UpKSkge1xuXG4gICAgICBpZiAoX3Jlc3VsdCAhPT0gJycpIF9yZXN1bHQgKz0gJywnICsgKCFzdGF0ZS5jb25kZW5zZUZsb3cgPyAnICcgOiAnJyk7XG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9ICdbJyArIF9yZXN1bHQgKyAnXSc7XG59XG5cbmZ1bmN0aW9uIHdyaXRlQmxvY2tTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgY29tcGFjdCkge1xuICB2YXIgX3Jlc3VsdCA9ICcnLFxuICAgICAgX3RhZyAgICA9IHN0YXRlLnRhZyxcbiAgICAgIGluZGV4LFxuICAgICAgbGVuZ3RoLFxuICAgICAgdmFsdWU7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgdmFsdWUgPSBvYmplY3RbaW5kZXhdO1xuXG4gICAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgICB2YWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwob2JqZWN0LCBTdHJpbmcoaW5kZXgpLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLy8gV3JpdGUgb25seSB2YWxpZCBlbGVtZW50cywgcHV0IG51bGwgaW5zdGVhZCBvZiBpbnZhbGlkIGVsZW1lbnRzLlxuICAgIGlmICh3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgdmFsdWUsIHRydWUsIHRydWUsIGZhbHNlLCB0cnVlKSB8fFxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd3JpdGVOb2RlKHN0YXRlLCBsZXZlbCArIDEsIG51bGwsIHRydWUsIHRydWUsIGZhbHNlLCB0cnVlKSkpIHtcblxuICAgICAgaWYgKCFjb21wYWN0IHx8IF9yZXN1bHQgIT09ICcnKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gZ2VuZXJhdGVOZXh0TGluZShzdGF0ZSwgbGV2ZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICAgIF9yZXN1bHQgKz0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3Jlc3VsdCArPSAnLSAnO1xuICAgICAgfVxuXG4gICAgICBfcmVzdWx0ICs9IHN0YXRlLmR1bXA7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ1tdJzsgLy8gRW1wdHkgc2VxdWVuY2UgaWYgbm8gdmFsaWQgdmFsdWVzLlxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb3dNYXBwaW5nKHN0YXRlLCBsZXZlbCwgb2JqZWN0KSB7XG4gIHZhciBfcmVzdWx0ICAgICAgID0gJycsXG4gICAgICBfdGFnICAgICAgICAgID0gc3RhdGUudGFnLFxuICAgICAgb2JqZWN0S2V5TGlzdCA9IE9iamVjdC5rZXlzKG9iamVjdCksXG4gICAgICBpbmRleCxcbiAgICAgIGxlbmd0aCxcbiAgICAgIG9iamVjdEtleSxcbiAgICAgIG9iamVjdFZhbHVlLFxuICAgICAgcGFpckJ1ZmZlcjtcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG5cbiAgICBwYWlyQnVmZmVyID0gJyc7XG4gICAgaWYgKF9yZXN1bHQgIT09ICcnKSBwYWlyQnVmZmVyICs9ICcsICc7XG5cbiAgICBpZiAoc3RhdGUuY29uZGVuc2VGbG93KSBwYWlyQnVmZmVyICs9ICdcIic7XG5cbiAgICBvYmplY3RLZXkgPSBvYmplY3RLZXlMaXN0W2luZGV4XTtcbiAgICBvYmplY3RWYWx1ZSA9IG9iamVjdFtvYmplY3RLZXldO1xuXG4gICAgaWYgKHN0YXRlLnJlcGxhY2VyKSB7XG4gICAgICBvYmplY3RWYWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwob2JqZWN0LCBvYmplY3RLZXksIG9iamVjdFZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdEtleSwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCBrZXk7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlLmR1bXAubGVuZ3RoID4gMTAyNCkgcGFpckJ1ZmZlciArPSAnPyAnO1xuXG4gICAgcGFpckJ1ZmZlciArPSBzdGF0ZS5kdW1wICsgKHN0YXRlLmNvbmRlbnNlRmxvdyA/ICdcIicgOiAnJykgKyAnOicgKyAoc3RhdGUuY29uZGVuc2VGbG93ID8gJycgOiAnICcpO1xuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsLCBvYmplY3RWYWx1ZSwgZmFsc2UsIGZhbHNlKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCB2YWx1ZS5cbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICAvLyBCb3RoIGtleSBhbmQgdmFsdWUgYXJlIHZhbGlkLlxuICAgIF9yZXN1bHQgKz0gcGFpckJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRlLnRhZyA9IF90YWc7XG4gIHN0YXRlLmR1bXAgPSAneycgKyBfcmVzdWx0ICsgJ30nO1xufVxuXG5mdW5jdGlvbiB3cml0ZUJsb2NrTWFwcGluZyhzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgY29tcGFjdCkge1xuICB2YXIgX3Jlc3VsdCAgICAgICA9ICcnLFxuICAgICAgX3RhZyAgICAgICAgICA9IHN0YXRlLnRhZyxcbiAgICAgIG9iamVjdEtleUxpc3QgPSBPYmplY3Qua2V5cyhvYmplY3QpLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGgsXG4gICAgICBvYmplY3RLZXksXG4gICAgICBvYmplY3RWYWx1ZSxcbiAgICAgIGV4cGxpY2l0UGFpcixcbiAgICAgIHBhaXJCdWZmZXI7XG5cbiAgLy8gQWxsb3cgc29ydGluZyBrZXlzIHNvIHRoYXQgdGhlIG91dHB1dCBmaWxlIGlzIGRldGVybWluaXN0aWNcbiAgaWYgKHN0YXRlLnNvcnRLZXlzID09PSB0cnVlKSB7XG4gICAgLy8gRGVmYXVsdCBzb3J0aW5nXG4gICAgb2JqZWN0S2V5TGlzdC5zb3J0KCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHN0YXRlLnNvcnRLZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gQ3VzdG9tIHNvcnQgZnVuY3Rpb25cbiAgICBvYmplY3RLZXlMaXN0LnNvcnQoc3RhdGUuc29ydEtleXMpO1xuICB9IGVsc2UgaWYgKHN0YXRlLnNvcnRLZXlzKSB7XG4gICAgLy8gU29tZXRoaW5nIGlzIHdyb25nXG4gICAgdGhyb3cgbmV3IGV4Y2VwdGlvbignc29ydEtleXMgbXVzdCBiZSBhIGJvb2xlYW4gb3IgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdEtleUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHBhaXJCdWZmZXIgPSAnJztcblxuICAgIGlmICghY29tcGFjdCB8fCBfcmVzdWx0ICE9PSAnJykge1xuICAgICAgcGFpckJ1ZmZlciArPSBnZW5lcmF0ZU5leHRMaW5lKHN0YXRlLCBsZXZlbCk7XG4gICAgfVxuXG4gICAgb2JqZWN0S2V5ID0gb2JqZWN0S2V5TGlzdFtpbmRleF07XG4gICAgb2JqZWN0VmFsdWUgPSBvYmplY3Rbb2JqZWN0S2V5XTtcblxuICAgIGlmIChzdGF0ZS5yZXBsYWNlcikge1xuICAgICAgb2JqZWN0VmFsdWUgPSBzdGF0ZS5yZXBsYWNlci5jYWxsKG9iamVjdCwgb2JqZWN0S2V5LCBvYmplY3RWYWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCF3cml0ZU5vZGUoc3RhdGUsIGxldmVsICsgMSwgb2JqZWN0S2V5LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCBrZXkuXG4gICAgfVxuXG4gICAgZXhwbGljaXRQYWlyID0gKHN0YXRlLnRhZyAhPT0gbnVsbCAmJiBzdGF0ZS50YWcgIT09ICc/JykgfHxcbiAgICAgICAgICAgICAgICAgICAoc3RhdGUuZHVtcCAmJiBzdGF0ZS5kdW1wLmxlbmd0aCA+IDEwMjQpO1xuXG4gICAgaWYgKGV4cGxpY2l0UGFpcikge1xuICAgICAgaWYgKHN0YXRlLmR1bXAgJiYgQ0hBUl9MSU5FX0ZFRUQgPT09IHN0YXRlLmR1bXAuY2hhckNvZGVBdCgwKSkge1xuICAgICAgICBwYWlyQnVmZmVyICs9ICc/JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhaXJCdWZmZXIgKz0gJz8gJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYWlyQnVmZmVyICs9IHN0YXRlLmR1bXA7XG5cbiAgICBpZiAoZXhwbGljaXRQYWlyKSB7XG4gICAgICBwYWlyQnVmZmVyICs9IGdlbmVyYXRlTmV4dExpbmUoc3RhdGUsIGxldmVsKTtcbiAgICB9XG5cbiAgICBpZiAoIXdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwgKyAxLCBvYmplY3RWYWx1ZSwgdHJ1ZSwgZXhwbGljaXRQYWlyKSkge1xuICAgICAgY29udGludWU7IC8vIFNraXAgdGhpcyBwYWlyIGJlY2F1c2Ugb2YgaW52YWxpZCB2YWx1ZS5cbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZHVtcCAmJiBDSEFSX0xJTkVfRkVFRCA9PT0gc3RhdGUuZHVtcC5jaGFyQ29kZUF0KDApKSB7XG4gICAgICBwYWlyQnVmZmVyICs9ICc6JztcbiAgICB9IGVsc2Uge1xuICAgICAgcGFpckJ1ZmZlciArPSAnOiAnO1xuICAgIH1cblxuICAgIHBhaXJCdWZmZXIgKz0gc3RhdGUuZHVtcDtcblxuICAgIC8vIEJvdGgga2V5IGFuZCB2YWx1ZSBhcmUgdmFsaWQuXG4gICAgX3Jlc3VsdCArPSBwYWlyQnVmZmVyO1xuICB9XG5cbiAgc3RhdGUudGFnID0gX3RhZztcbiAgc3RhdGUuZHVtcCA9IF9yZXN1bHQgfHwgJ3t9JzsgLy8gRW1wdHkgbWFwcGluZyBpZiBubyB2YWxpZCBwYWlycy5cbn1cblxuZnVuY3Rpb24gZGV0ZWN0VHlwZShzdGF0ZSwgb2JqZWN0LCBleHBsaWNpdCkge1xuICB2YXIgX3Jlc3VsdCwgdHlwZUxpc3QsIGluZGV4LCBsZW5ndGgsIHR5cGUsIHN0eWxlO1xuXG4gIHR5cGVMaXN0ID0gZXhwbGljaXQgPyBzdGF0ZS5leHBsaWNpdFR5cGVzIDogc3RhdGUuaW1wbGljaXRUeXBlcztcblxuICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdHlwZUxpc3QubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gMSkge1xuICAgIHR5cGUgPSB0eXBlTGlzdFtpbmRleF07XG5cbiAgICBpZiAoKHR5cGUuaW5zdGFuY2VPZiAgfHwgdHlwZS5wcmVkaWNhdGUpICYmXG4gICAgICAgICghdHlwZS5pbnN0YW5jZU9mIHx8ICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIChvYmplY3QgaW5zdGFuY2VvZiB0eXBlLmluc3RhbmNlT2YpKSkgJiZcbiAgICAgICAgKCF0eXBlLnByZWRpY2F0ZSAgfHwgdHlwZS5wcmVkaWNhdGUob2JqZWN0KSkpIHtcblxuICAgICAgaWYgKGV4cGxpY2l0KSB7XG4gICAgICAgIGlmICh0eXBlLm11bHRpICYmIHR5cGUucmVwcmVzZW50TmFtZSkge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IHR5cGUucmVwcmVzZW50TmFtZShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnRhZyA9IHR5cGUudGFnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS50YWcgPSAnPyc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnJlcHJlc2VudCkge1xuICAgICAgICBzdHlsZSA9IHN0YXRlLnN0eWxlTWFwW3R5cGUudGFnXSB8fCB0eXBlLmRlZmF1bHRTdHlsZTtcblxuICAgICAgICBpZiAoX3RvU3RyaW5nLmNhbGwodHlwZS5yZXByZXNlbnQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgICAgX3Jlc3VsdCA9IHR5cGUucmVwcmVzZW50KG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2UgaWYgKF9oYXNPd25Qcm9wZXJ0eS5jYWxsKHR5cGUucmVwcmVzZW50LCBzdHlsZSkpIHtcbiAgICAgICAgICBfcmVzdWx0ID0gdHlwZS5yZXByZXNlbnRbc3R5bGVdKG9iamVjdCwgc3R5bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJyE8JyArIHR5cGUudGFnICsgJz4gdGFnIHJlc29sdmVyIGFjY2VwdHMgbm90IFwiJyArIHN0eWxlICsgJ1wiIHN0eWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZS5kdW1wID0gX3Jlc3VsdDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBTZXJpYWxpemVzIGBvYmplY3RgIGFuZCB3cml0ZXMgaXQgdG8gZ2xvYmFsIGByZXN1bHRgLlxuLy8gUmV0dXJucyB0cnVlIG9uIHN1Y2Nlc3MsIG9yIGZhbHNlIG9uIGludmFsaWQgb2JqZWN0LlxuLy9cbmZ1bmN0aW9uIHdyaXRlTm9kZShzdGF0ZSwgbGV2ZWwsIG9iamVjdCwgYmxvY2ssIGNvbXBhY3QsIGlza2V5LCBpc2Jsb2Nrc2VxKSB7XG4gIHN0YXRlLnRhZyA9IG51bGw7XG4gIHN0YXRlLmR1bXAgPSBvYmplY3Q7XG5cbiAgaWYgKCFkZXRlY3RUeXBlKHN0YXRlLCBvYmplY3QsIGZhbHNlKSkge1xuICAgIGRldGVjdFR5cGUoc3RhdGUsIG9iamVjdCwgdHJ1ZSk7XG4gIH1cblxuICB2YXIgdHlwZSA9IF90b1N0cmluZy5jYWxsKHN0YXRlLmR1bXApO1xuICB2YXIgaW5ibG9jayA9IGJsb2NrO1xuICB2YXIgdGFnU3RyO1xuXG4gIGlmIChibG9jaykge1xuICAgIGJsb2NrID0gKHN0YXRlLmZsb3dMZXZlbCA8IDAgfHwgc3RhdGUuZmxvd0xldmVsID4gbGV2ZWwpO1xuICB9XG5cbiAgdmFyIG9iamVjdE9yQXJyYXkgPSB0eXBlID09PSAnW29iamVjdCBPYmplY3RdJyB8fCB0eXBlID09PSAnW29iamVjdCBBcnJheV0nLFxuICAgICAgZHVwbGljYXRlSW5kZXgsXG4gICAgICBkdXBsaWNhdGU7XG5cbiAgaWYgKG9iamVjdE9yQXJyYXkpIHtcbiAgICBkdXBsaWNhdGVJbmRleCA9IHN0YXRlLmR1cGxpY2F0ZXMuaW5kZXhPZihvYmplY3QpO1xuICAgIGR1cGxpY2F0ZSA9IGR1cGxpY2F0ZUluZGV4ICE9PSAtMTtcbiAgfVxuXG4gIGlmICgoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB8fCBkdXBsaWNhdGUgfHwgKHN0YXRlLmluZGVudCAhPT0gMiAmJiBsZXZlbCA+IDApKSB7XG4gICAgY29tcGFjdCA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKGR1cGxpY2F0ZSAmJiBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0pIHtcbiAgICBzdGF0ZS5kdW1wID0gJypyZWZfJyArIGR1cGxpY2F0ZUluZGV4O1xuICB9IGVsc2Uge1xuICAgIGlmIChvYmplY3RPckFycmF5ICYmIGR1cGxpY2F0ZSAmJiAhc3RhdGUudXNlZER1cGxpY2F0ZXNbZHVwbGljYXRlSW5kZXhdKSB7XG4gICAgICBzdGF0ZS51c2VkRHVwbGljYXRlc1tkdXBsaWNhdGVJbmRleF0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIGlmIChibG9jayAmJiAoT2JqZWN0LmtleXMoc3RhdGUuZHVtcCkubGVuZ3RoICE9PSAwKSkge1xuICAgICAgICB3cml0ZUJsb2NrTWFwcGluZyhzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXAsIGNvbXBhY3QpO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyaXRlRmxvd01hcHBpbmcoc3RhdGUsIGxldmVsLCBzdGF0ZS5kdW1wKTtcbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyAnICcgKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICBpZiAoYmxvY2sgJiYgKHN0YXRlLmR1bXAubGVuZ3RoICE9PSAwKSkge1xuICAgICAgICBpZiAoc3RhdGUubm9BcnJheUluZGVudCAmJiAhaXNibG9ja3NlcSAmJiBsZXZlbCA+IDApIHtcbiAgICAgICAgICB3cml0ZUJsb2NrU2VxdWVuY2Uoc3RhdGUsIGxldmVsIC0gMSwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3JpdGVCbG9ja1NlcXVlbmNlKHN0YXRlLCBsZXZlbCwgc3RhdGUuZHVtcCwgY29tcGFjdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGR1cGxpY2F0ZSkge1xuICAgICAgICAgIHN0YXRlLmR1bXAgPSAnJnJlZl8nICsgZHVwbGljYXRlSW5kZXggKyBzdGF0ZS5kdW1wO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cml0ZUZsb3dTZXF1ZW5jZShzdGF0ZSwgbGV2ZWwsIHN0YXRlLmR1bXApO1xuICAgICAgICBpZiAoZHVwbGljYXRlKSB7XG4gICAgICAgICAgc3RhdGUuZHVtcCA9ICcmcmVmXycgKyBkdXBsaWNhdGVJbmRleCArICcgJyArIHN0YXRlLmR1bXA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IFN0cmluZ10nKSB7XG4gICAgICBpZiAoc3RhdGUudGFnICE9PSAnPycpIHtcbiAgICAgICAgd3JpdGVTY2FsYXIoc3RhdGUsIHN0YXRlLmR1bXAsIGxldmVsLCBpc2tleSwgaW5ibG9jayk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBVbmRlZmluZWRdJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhdGUuc2tpcEludmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICAgIHRocm93IG5ldyBleGNlcHRpb24oJ3VuYWNjZXB0YWJsZSBraW5kIG9mIGFuIG9iamVjdCB0byBkdW1wICcgKyB0eXBlKTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUudGFnICE9PSBudWxsICYmIHN0YXRlLnRhZyAhPT0gJz8nKSB7XG4gICAgICAvLyBOZWVkIHRvIGVuY29kZSBhbGwgY2hhcmFjdGVycyBleGNlcHQgdGhvc2UgYWxsb3dlZCBieSB0aGUgc3BlYzpcbiAgICAgIC8vXG4gICAgICAvLyBbMzVdIG5zLWRlYy1kaWdpdCAgICA6Oj0gIFsjeDMwLSN4MzldIC8qIDAtOSAqL1xuICAgICAgLy8gWzM2XSBucy1oZXgtZGlnaXQgICAgOjo9ICBucy1kZWMtZGlnaXRcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHwgWyN4NDEtI3g0Nl0gLyogQS1GICovIHwgWyN4NjEtI3g2Nl0gLyogYS1mICovXG4gICAgICAvLyBbMzddIG5zLWFzY2lpLWxldHRlciA6Oj0gIFsjeDQxLSN4NUFdIC8qIEEtWiAqLyB8IFsjeDYxLSN4N0FdIC8qIGEteiAqL1xuICAgICAgLy8gWzM4XSBucy13b3JkLWNoYXIgICAgOjo9ICBucy1kZWMtZGlnaXQgfCBucy1hc2NpaS1sZXR0ZXIgfCBcdTIwMUMtXHUyMDFEXG4gICAgICAvLyBbMzldIG5zLXVyaS1jaGFyICAgICA6Oj0gIFx1MjAxQyVcdTIwMUQgbnMtaGV4LWRpZ2l0IG5zLWhleC1kaWdpdCB8IG5zLXdvcmQtY2hhciB8IFx1MjAxQyNcdTIwMURcbiAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHwgXHUyMDFDO1x1MjAxRCB8IFx1MjAxQy9cdTIwMUQgfCBcdTIwMUM/XHUyMDFEIHwgXHUyMDFDOlx1MjAxRCB8IFx1MjAxQ0BcdTIwMUQgfCBcdTIwMUMmXHUyMDFEIHwgXHUyMDFDPVx1MjAxRCB8IFx1MjAxQytcdTIwMUQgfCBcdTIwMUMkXHUyMDFEIHwgXHUyMDFDLFx1MjAxRFxuICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgfCBcdTIwMUNfXHUyMDFEIHwgXHUyMDFDLlx1MjAxRCB8IFx1MjAxQyFcdTIwMUQgfCBcdTIwMUN+XHUyMDFEIHwgXHUyMDFDKlx1MjAxRCB8IFx1MjAxQydcdTIwMUQgfCBcdTIwMUMoXHUyMDFEIHwgXHUyMDFDKVx1MjAxRCB8IFx1MjAxQ1tcdTIwMUQgfCBcdTIwMUNdXHUyMDFEXG4gICAgICAvL1xuICAgICAgLy8gQWxzbyBuZWVkIHRvIGVuY29kZSAnIScgYmVjYXVzZSBpdCBoYXMgc3BlY2lhbCBtZWFuaW5nIChlbmQgb2YgdGFnIHByZWZpeCkuXG4gICAgICAvL1xuICAgICAgdGFnU3RyID0gZW5jb2RlVVJJKFxuICAgICAgICBzdGF0ZS50YWdbMF0gPT09ICchJyA/IHN0YXRlLnRhZy5zbGljZSgxKSA6IHN0YXRlLnRhZ1xuICAgICAgKS5yZXBsYWNlKC8hL2csICclMjEnKTtcblxuICAgICAgaWYgKHN0YXRlLnRhZ1swXSA9PT0gJyEnKSB7XG4gICAgICAgIHRhZ1N0ciA9ICchJyArIHRhZ1N0cjtcbiAgICAgIH0gZWxzZSBpZiAodGFnU3RyLnNsaWNlKDAsIDE4KSA9PT0gJ3RhZzp5YW1sLm9yZywyMDAyOicpIHtcbiAgICAgICAgdGFnU3RyID0gJyEhJyArIHRhZ1N0ci5zbGljZSgxOCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YWdTdHIgPSAnITwnICsgdGFnU3RyICsgJz4nO1xuICAgICAgfVxuXG4gICAgICBzdGF0ZS5kdW1wID0gdGFnU3RyICsgJyAnICsgc3RhdGUuZHVtcDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0RHVwbGljYXRlUmVmZXJlbmNlcyhvYmplY3QsIHN0YXRlKSB7XG4gIHZhciBvYmplY3RzID0gW10sXG4gICAgICBkdXBsaWNhdGVzSW5kZXhlcyA9IFtdLFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGg7XG5cbiAgaW5zcGVjdE5vZGUob2JqZWN0LCBvYmplY3RzLCBkdXBsaWNhdGVzSW5kZXhlcyk7XG5cbiAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IGR1cGxpY2F0ZXNJbmRleGVzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IDEpIHtcbiAgICBzdGF0ZS5kdXBsaWNhdGVzLnB1c2gob2JqZWN0c1tkdXBsaWNhdGVzSW5kZXhlc1tpbmRleF1dKTtcbiAgfVxuICBzdGF0ZS51c2VkRHVwbGljYXRlcyA9IG5ldyBBcnJheShsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBpbnNwZWN0Tm9kZShvYmplY3QsIG9iamVjdHMsIGR1cGxpY2F0ZXNJbmRleGVzKSB7XG4gIHZhciBvYmplY3RLZXlMaXN0LFxuICAgICAgaW5kZXgsXG4gICAgICBsZW5ndGg7XG5cbiAgaWYgKG9iamVjdCAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgIGluZGV4ID0gb2JqZWN0cy5pbmRleE9mKG9iamVjdCk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgaWYgKGR1cGxpY2F0ZXNJbmRleGVzLmluZGV4T2YoaW5kZXgpID09PSAtMSkge1xuICAgICAgICBkdXBsaWNhdGVzSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb2JqZWN0cy5wdXNoKG9iamVjdCk7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iamVjdCkpIHtcbiAgICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IG9iamVjdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgaW5zcGVjdE5vZGUob2JqZWN0W2luZGV4XSwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmplY3RLZXlMaXN0ID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gb2JqZWN0S2V5TGlzdC5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgICAgaW5zcGVjdE5vZGUob2JqZWN0W29iamVjdEtleUxpc3RbaW5kZXhdXSwgb2JqZWN0cywgZHVwbGljYXRlc0luZGV4ZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGR1bXAkMShpbnB1dCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgc3RhdGUgPSBuZXcgU3RhdGUob3B0aW9ucyk7XG5cbiAgaWYgKCFzdGF0ZS5ub1JlZnMpIGdldER1cGxpY2F0ZVJlZmVyZW5jZXMoaW5wdXQsIHN0YXRlKTtcblxuICB2YXIgdmFsdWUgPSBpbnB1dDtcblxuICBpZiAoc3RhdGUucmVwbGFjZXIpIHtcbiAgICB2YWx1ZSA9IHN0YXRlLnJlcGxhY2VyLmNhbGwoeyAnJzogdmFsdWUgfSwgJycsIHZhbHVlKTtcbiAgfVxuXG4gIGlmICh3cml0ZU5vZGUoc3RhdGUsIDAsIHZhbHVlLCB0cnVlLCB0cnVlKSkgcmV0dXJuIHN0YXRlLmR1bXAgKyAnXFxuJztcblxuICByZXR1cm4gJyc7XG59XG5cbnZhciBkdW1wXzEgPSBkdW1wJDE7XG5cbnZhciBkdW1wZXIgPSB7XG5cdGR1bXA6IGR1bXBfMVxufTtcblxuZnVuY3Rpb24gcmVuYW1lZChmcm9tLCB0bykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRnVuY3Rpb24geWFtbC4nICsgZnJvbSArICcgaXMgcmVtb3ZlZCBpbiBqcy15YW1sIDQuICcgK1xuICAgICAgJ1VzZSB5YW1sLicgKyB0byArICcgaW5zdGVhZCwgd2hpY2ggaXMgbm93IHNhZmUgYnkgZGVmYXVsdC4nKTtcbiAgfTtcbn1cblxuXG52YXIgVHlwZSAgICAgICAgICAgICAgICA9IHR5cGU7XG52YXIgU2NoZW1hICAgICAgICAgICAgICA9IHNjaGVtYTtcbnZhciBGQUlMU0FGRV9TQ0hFTUEgICAgID0gZmFpbHNhZmU7XG52YXIgSlNPTl9TQ0hFTUEgICAgICAgICA9IGpzb247XG52YXIgQ09SRV9TQ0hFTUEgICAgICAgICA9IGNvcmU7XG52YXIgREVGQVVMVF9TQ0hFTUEgICAgICA9IF9kZWZhdWx0O1xudmFyIGxvYWQgICAgICAgICAgICAgICAgPSBsb2FkZXIubG9hZDtcbnZhciBsb2FkQWxsICAgICAgICAgICAgID0gbG9hZGVyLmxvYWRBbGw7XG52YXIgZHVtcCAgICAgICAgICAgICAgICA9IGR1bXBlci5kdW1wO1xudmFyIFlBTUxFeGNlcHRpb24gICAgICAgPSBleGNlcHRpb247XG5cbi8vIFJlLWV4cG9ydCBhbGwgdHlwZXMgaW4gY2FzZSB1c2VyIHdhbnRzIHRvIGNyZWF0ZSBjdXN0b20gc2NoZW1hXG52YXIgdHlwZXMgPSB7XG4gIGJpbmFyeTogICAgYmluYXJ5LFxuICBmbG9hdDogICAgIGZsb2F0LFxuICBtYXA6ICAgICAgIG1hcCxcbiAgbnVsbDogICAgICBfbnVsbCxcbiAgcGFpcnM6ICAgICBwYWlycyxcbiAgc2V0OiAgICAgICBzZXQsXG4gIHRpbWVzdGFtcDogdGltZXN0YW1wLFxuICBib29sOiAgICAgIGJvb2wsXG4gIGludDogICAgICAgaW50LFxuICBtZXJnZTogICAgIG1lcmdlLFxuICBvbWFwOiAgICAgIG9tYXAsXG4gIHNlcTogICAgICAgc2VxLFxuICBzdHI6ICAgICAgIHN0clxufTtcblxuLy8gUmVtb3ZlZCBmdW5jdGlvbnMgZnJvbSBKUy1ZQU1MIDMuMC54XG52YXIgc2FmZUxvYWQgICAgICAgICAgICA9IHJlbmFtZWQoJ3NhZmVMb2FkJywgJ2xvYWQnKTtcbnZhciBzYWZlTG9hZEFsbCAgICAgICAgID0gcmVuYW1lZCgnc2FmZUxvYWRBbGwnLCAnbG9hZEFsbCcpO1xudmFyIHNhZmVEdW1wICAgICAgICAgICAgPSByZW5hbWVkKCdzYWZlRHVtcCcsICdkdW1wJyk7XG5cbnZhciBqc1lhbWwgPSB7XG5cdFR5cGU6IFR5cGUsXG5cdFNjaGVtYTogU2NoZW1hLFxuXHRGQUlMU0FGRV9TQ0hFTUE6IEZBSUxTQUZFX1NDSEVNQSxcblx0SlNPTl9TQ0hFTUE6IEpTT05fU0NIRU1BLFxuXHRDT1JFX1NDSEVNQTogQ09SRV9TQ0hFTUEsXG5cdERFRkFVTFRfU0NIRU1BOiBERUZBVUxUX1NDSEVNQSxcblx0bG9hZDogbG9hZCxcblx0bG9hZEFsbDogbG9hZEFsbCxcblx0ZHVtcDogZHVtcCxcblx0WUFNTEV4Y2VwdGlvbjogWUFNTEV4Y2VwdGlvbixcblx0dHlwZXM6IHR5cGVzLFxuXHRzYWZlTG9hZDogc2FmZUxvYWQsXG5cdHNhZmVMb2FkQWxsOiBzYWZlTG9hZEFsbCxcblx0c2FmZUR1bXA6IHNhZmVEdW1wXG59O1xuXG5leHBvcnQgeyBDT1JFX1NDSEVNQSwgREVGQVVMVF9TQ0hFTUEsIEZBSUxTQUZFX1NDSEVNQSwgSlNPTl9TQ0hFTUEsIFNjaGVtYSwgVHlwZSwgWUFNTEV4Y2VwdGlvbiwganNZYW1sIGFzIGRlZmF1bHQsIGR1bXAsIGxvYWQsIGxvYWRBbGwsIHNhZmVEdW1wLCBzYWZlTG9hZCwgc2FmZUxvYWRBbGwsIHR5cGVzIH07XG4iLCAiaW1wb3J0IHsgc3Bhd25TeW5jIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuLyoqXG4gKiBWYWxpZGF0ZSB0aGF0IGEgc2Vzc2lvbiBJRCBpcyBhIHNhZmUgaVRlcm0yIFVVSUQgYmVmb3JlIGVtYmVkZGluZyBpdCBpblxuICogQXBwbGVTY3JpcHQuIGlUZXJtMiBzZXNzaW9uIElEcyBhcmUgYWx3YXlzIGh5cGhlbmF0ZWQgVVVJRHM7IGFueXRoaW5nIGVsc2VcbiAqIGlzIHVuZXhwZWN0ZWQgYW5kIGNvdWxkIGluZGljYXRlIGluamVjdGlvbi5cbiAqL1xuZnVuY3Rpb24gc2FuaXRpemVTZXNzaW9uSWQoaWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGlmIChcbiAgICAhL15bMC05QS1GYS1mXXs4fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXs0fS1bMC05QS1GYS1mXXsxMn0kLy50ZXN0KGlkKVxuICApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaVRlcm0yIHNlc3Npb24gSUQ6ICR7SlNPTi5zdHJpbmdpZnkoaWQpfWApO1xuICB9XG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBSdW4gYW4gQXBwbGVTY3JpcHQgYnkgcGFzc2luZyBpdCBvbiBzdGRpbiB0byBvc2FzY3JpcHQuXG4gKiBBdm9pZHMgc2hlbGwtcXVvdGluZyBpc3N1ZXMgYW5kIGFyZ3VtZW50LWxlbmd0aCBsaW1pdHMuXG4gKi9cbmZ1bmN0aW9uIHJ1bkFwcGxlU2NyaXB0U3luYyhzY3JpcHQ6IHN0cmluZywgdGltZW91dE1zID0gNTAwMCk6IHN0cmluZyB7XG4gIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhcIi91c3IvYmluL29zYXNjcmlwdFwiLCBbXSwge1xuICAgIGlucHV0OiBzY3JpcHQsXG4gICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgICB0aW1lb3V0OiB0aW1lb3V0TXMsXG4gIH0pO1xuICBpZiAocmVzdWx0LmVycm9yKSB0aHJvdyByZXN1bHQuZXJyb3I7XG4gIHJldHVybiAocmVzdWx0LnN0ZG91dCBhcyBzdHJpbmcpID8/IFwiXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb2N1c1Nlc3Npb24oc2Vzc2lvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgc2FmZUlkID0gc2FuaXRpemVTZXNzaW9uSWQoc2Vzc2lvbklkKTtcbiAgY29uc3Qgc2NyaXB0ID0gYFxuICAgIHRlbGwgYXBwbGljYXRpb24gXCJpVGVybTJcIlxuICAgICAgYWN0aXZhdGVcbiAgICAgIHJlcGVhdCB3aXRoIHcgaW4gd2luZG93c1xuICAgICAgICB0ZWxsIHdcbiAgICAgICAgICByZXBlYXQgd2l0aCB0IGluIHRhYnNcbiAgICAgICAgICAgIHRlbGwgdFxuICAgICAgICAgICAgICByZXBlYXQgd2l0aCBzIGluIHNlc3Npb25zXG4gICAgICAgICAgICAgICAgaWYgKHVuaXF1ZSBJRCBvZiBzKSBpcyBcIiR7c2FmZUlkfVwiIHRoZW5cbiAgICAgICAgICAgICAgICAgIHNlbGVjdCB0XG4gICAgICAgICAgICAgICAgICBzZWxlY3Qgc1xuICAgICAgICAgICAgICAgICAgdGVsbCB3IHRvIHNlbGVjdFxuICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgZW5kIGlmXG4gICAgICAgICAgICAgIGVuZCByZXBlYXRcbiAgICAgICAgICAgIGVuZCB0ZWxsXG4gICAgICAgICAgZW5kIHJlcGVhdFxuICAgICAgICBlbmQgdGVsbFxuICAgICAgZW5kIHJlcGVhdFxuICAgIGVuZCB0ZWxsXG4gIGA7XG4gIHRyeSB7XG4gICAgcnVuQXBwbGVTY3JpcHRTeW5jKHNjcmlwdCk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlUZXJtMiBtYXkgbm90IGJlIHJ1bm5pbmdcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlU2Vzc2lvbnMoKTogU2V0PHN0cmluZz4ge1xuICBjb25zdCBzY3JpcHQgPSBgXG4gICAgdGVsbCBhcHBsaWNhdGlvbiBcImlUZXJtMlwiXG4gICAgICBzZXQgYWxsSURzIHRvIHt9XG4gICAgICByZXBlYXQgd2l0aCB3IGluIHdpbmRvd3NcbiAgICAgICAgdGVsbCB3XG4gICAgICAgICAgcmVwZWF0IHdpdGggdCBpbiB0YWJzXG4gICAgICAgICAgICB0ZWxsIHRcbiAgICAgICAgICAgICAgcmVwZWF0IHdpdGggcyBpbiBzZXNzaW9uc1xuICAgICAgICAgICAgICAgIHNldCBlbmQgb2YgYWxsSURzIHRvICh1bmlxdWUgSUQgb2YgcylcbiAgICAgICAgICAgICAgZW5kIHJlcGVhdFxuICAgICAgICAgICAgZW5kIHRlbGxcbiAgICAgICAgICBlbmQgcmVwZWF0XG4gICAgICAgIGVuZCB0ZWxsXG4gICAgICBlbmQgcmVwZWF0XG4gICAgICBzZXQgQXBwbGVTY3JpcHQncyB0ZXh0IGl0ZW0gZGVsaW1pdGVycyB0byBcIixcIlxuICAgICAgcmV0dXJuIGFsbElEcyBhcyB0ZXh0XG4gICAgZW5kIHRlbGxcbiAgYDtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXN1bHQgPSBydW5BcHBsZVNjcmlwdFN5bmMoc2NyaXB0KS50cmltKCk7XG4gICAgaWYgKCFyZXN1bHQpIHJldHVybiBuZXcgU2V0KCk7XG4gICAgcmV0dXJuIG5ldyBTZXQocmVzdWx0LnNwbGl0KFwiLFwiKS5tYXAoKHMpID0+IHMudHJpbSgpKSk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBuZXcgU2V0KCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcm1SdW5uaW5nKCk6IGJvb2xlYW4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHNwYXduU3luYyhcInBncmVwXCIsIFtcIi14XCIsIFwiaVRlcm0yXCJdLCB7IGVuY29kaW5nOiBcInV0Zi04XCIgfSk7XG4gICAgcmV0dXJuIChyZXN1bHQuc3Rkb3V0IGFzIHN0cmluZykudHJpbSgpLmxlbmd0aCA+IDA7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwgImltcG9ydCB7IGV4ZWNTeW5jLCBleGVjIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuZnVuY3Rpb24gcnVuSW5TaGVsbChhcmdzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYHpzaCAtaWxjICdidWZvICR7YXJnc30nIDI+JjFgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQnVmb1N5bmMoYXJnczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGV4ZWNTeW5jKHJ1bkluU2hlbGwoYXJncyksIHsgZW5jb2Rpbmc6IFwidXRmLThcIiwgdGltZW91dDogMzAwMDAgfSkudHJpbSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuQnVmb0FzeW5jKGFyZ3M6IHN0cmluZywgc3RkaW4/OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNoaWxkID0gZXhlYyhcbiAgICAgIHJ1bkluU2hlbGwoYXJncyksXG4gICAgICB7XG4gICAgICAgIGVuY29kaW5nOiBcInV0Zi04XCIsXG4gICAgICAgIHRpbWVvdXQ6IDAsIC8vIG5vIHRpbWVvdXQgXHUyMDE0IHNvbWUgb3BlcmF0aW9ucyAod29ya3RyZWUgY3JlYXRpb24sIG5wbSBpbnN0YWxsKSB0YWtlIG1pbnV0ZXNcbiAgICAgIH0sXG4gICAgICAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHN0ZG91dC50cmltKCkpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gICAgaWYgKHN0ZGluICE9PSB1bmRlZmluZWQgJiYgY2hpbGQuc3RkaW4pIHtcbiAgICAgIGNoaWxkLnN0ZGluLndyaXRlKHN0ZGluKTtcbiAgICAgIGNoaWxkLnN0ZGluLmVuZCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRHaXRCcmFuY2goZGlyOiBzdHJpbmcpOiBzdHJpbmcge1xuICB0cnkge1xuICAgIHJldHVybiBleGVjU3luYyhgZ2l0IC1DIFwiJHtkaXJ9XCIgcmV2LXBhcnNlIC0tYWJicmV2LXJlZiBIRUFEIDI+L2Rldi9udWxsYCwge1xuICAgICAgZW5jb2Rpbmc6IFwidXRmLThcIixcbiAgICAgIHRpbWVvdXQ6IDUwMDAsXG4gICAgfSkudHJpbSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJ1bmtub3duXCI7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFBQSxjQVlPO0E7Ozs7OztBQ1pQLElBQUksTUFBTSxPQUFPLFVBQVU7QUFFcEIsU0FBUyxPQUFPLEtBQUssS0FBSztBQUNoQyxNQUFJLE1BQU07QUFDVixNQUFJLFFBQVEsSUFBSyxRQUFPO0FBRXhCLE1BQUksT0FBTyxRQUFRLE9BQUssSUFBSSxpQkFBaUIsSUFBSSxhQUFhO0FBQzdELFFBQUksU0FBUyxLQUFNLFFBQU8sSUFBSSxRQUFRLE1BQU0sSUFBSSxRQUFRO0FBQ3hELFFBQUksU0FBUyxPQUFRLFFBQU8sSUFBSSxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBRTVELFFBQUksU0FBUyxPQUFPO0FBQ25CLFdBQUssTUFBSSxJQUFJLFlBQVksSUFBSSxRQUFRO0FBQ3BDLGVBQU8sU0FBUyxPQUFPLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUU7QUFBQSxNQUM1QztBQUNBLGFBQU8sUUFBUTtBQUFBLElBQ2hCO0FBRUEsUUFBSSxDQUFDLFFBQVEsT0FBTyxRQUFRLFVBQVU7QUFDckMsWUFBTTtBQUNOLFdBQUssUUFBUSxLQUFLO0FBQ2pCLFlBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRyxRQUFPO0FBQ2pFLFlBQUksRUFBRSxRQUFRLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEVBQUcsUUFBTztBQUFBLE1BQzdEO0FBQ0EsYUFBTyxPQUFPLEtBQUssR0FBRyxFQUFFLFdBQVc7QUFBQSxJQUNwQztBQUFBLEVBQ0Q7QUFFQSxTQUFPLFFBQVEsT0FBTyxRQUFRO0FBQy9CO0E7Ozs7OztBR3JCTyxTQUFTLDBDQUFlLE9BQVE7QUFDckMsUUFBTSxPQUFNLEdBQUEsYUFBQUMsUUFBVSxLQUFBO0FBQ3RCLFFBQU0sYUFBWSxHQUFBLGFBQUFBLFFBQWUsQ0FBQTtBQUVqQyxNQUFJLEVBQUMsR0FBQSxRQUFPLE9BQU8sSUFBSSxPQUFPLEdBQUc7QUFDL0IsUUFBSSxVQUFVO0FBQ2QsY0FBVSxXQUFXO0VBQ3ZCO0FBR0EsVUFBTyxHQUFBLGFBQUFDLFNBQVEsTUFBTSxJQUFJLFNBQVM7SUFBQyxVQUFVO0dBQVE7QUFDdkQ7QUNYTyxTQUFTLDBDQUFhLE9BQVE7QUFDbkMsUUFBTSxPQUFNLEdBQUEsYUFBQUQsUUFBTyxLQUFBO0FBQ25CLE1BQUksVUFBVTtBQUNkLFNBQU87QUFDVDtBQ2tCTyxTQUFTLDBDQUNkLE9BQ0EsU0FBNkU7QUFFN0UsUUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxPQUFPLEtBQUE7QUFDaEUsVUFBTyxHQUFBLFdBQUFFLFdBQVU7SUFDZixRQUFPLEdBQUEsV0FBQUMsT0FBTSxNQUFNO0lBQ25CLE9BQU8sU0FBUyxTQUFTO0lBQ3pCLFNBQVMsU0FBUyxXQUFXO0lBQzdCLGVBQWUsU0FBUyxpQkFBaUIsNkNBQXVCLEtBQUE7SUFDaEUsaUJBQWlCLFNBQVMsZ0JBQWdCLDZDQUF1QixLQUFBLElBQVM7RUFDNUUsQ0FBQTtBQUNGO0FBRUEsSUFBTSwrQ0FBeUIsQ0FBQyxVQUFBO0FBQzlCLE1BQUksbUJBQW1CO0FBQ3ZCLE1BQUksUUFBUTtBQUNaLE1BQUksZUFBZTtBQUNuQixNQUFJO0FBQ0YsVUFBTSxjQUFjLEtBQUssVUFBTSxlQUFBQyxrQkFBZ0IsaUJBQUFDLE9BQVUsR0FBQSxXQUFBQyxhQUFZLFlBQVksTUFBTSxjQUFBLEdBQWlCLE1BQUEsQ0FBQTtBQUN4RyxZQUFRLElBQUksWUFBWSxLQUFLO0FBQzdCLG1CQUFlLHVCQUF1QixZQUFZLFNBQVMsWUFBWSxNQUFNLElBQUksWUFBWSxJQUFJO0FBQ2pHLFFBQUksQ0FBQyxZQUFZLFNBQVMsWUFBWSxXQUFXLFNBQy9DLG9CQUFtQjtFQUV2QixTQUFTLEtBQUs7RUFFZDtBQUlBLFFBQU0sWUFBVyxHQUFBLFdBQUFBLGFBQVksaUJBQWlCO0FBRTlDLFFBQU0sUUFBUSxpQkFBaUIsUUFBUSxPQUFPLFNBQVMsT0FBTyxXQUFXLEtBQUssT0FBTyxLQUFBO0FBRXJGLFNBQU87SUFDTCxPQUFPLFdBQVcsY0FBYztJQUNoQyxTQUFTLE9BQUs7QUFDWixZQUFNLEtBQUk7QUFDVixVQUFJLFNBQ0YsRUFBQSxHQUFBLFdBQUFDLFdBQVUsS0FBSyxLQUFBO1VBRWYsRUFBQSxHQUFBLFdBQUFDLE1BQ0Usb0hBQW9ILG1CQUNsSCxLQUFBLENBQUEsa0JBQ2lCLFVBQVUsWUFBQSxDQUFBLGdCQUE2QixtQkFDeEQ7O0VBRVYsS0FBQTs7Q0FFRCxDQUFBLEVBQ1k7SUFHVDtFQUNGO0FBQ0Y7QUh3RE8sU0FBUywwQ0FDZCxJQUNBLE1BQ0EsU0FBMkI7QUFFM0IsUUFBTSxjQUFhLEdBQUEsYUFBQVIsUUFBTyxDQUFBO0FBQzFCLFFBQU0sQ0FBQyxPQUFPUyxJQUFBLEtBQU8sR0FBQSxhQUFBQyxVQUFzQztJQUFFLFdBQVc7RUFBSyxDQUFBO0FBRTdFLFFBQU0sU0FBUSxHQUFBLDJDQUFVLEVBQUE7QUFDeEIsUUFBTSxtQkFBa0IsR0FBQSwyQ0FBVSxTQUFTLFNBQUE7QUFDM0MsUUFBTSxjQUFhLEdBQUEsMkNBQVUsUUFBUSxDQUFBLENBQUU7QUFDdkMsUUFBTSxpQkFBZ0IsR0FBQSwyQ0FBVSxTQUFTLE9BQUE7QUFDekMsUUFBTSxnQkFBZSxHQUFBLDJDQUFVLFNBQVMsTUFBQTtBQUN4QyxRQUFNLHVCQUFzQixHQUFBLDJDQUFVLFNBQVMsYUFBQTtBQUMvQyxRQUFNLHNCQUFxQixHQUFBLDJDQUFVLFNBQVMsbUJBQUE7QUFDOUMsUUFBTSxlQUFjLEdBQUEsMkNBQVUsTUFBTSxJQUFJO0FBQ3hDLFFBQU0sa0JBQWlCLEdBQUEsYUFBQVYsUUFBNkQsSUFBQTtBQUVwRixRQUFNLHFCQUFvQixHQUFBLGFBQUFBLFFBQTBCO0lBQUUsTUFBTTtFQUFFLENBQUE7QUFDOUQsUUFBTSxvQkFBbUIsR0FBQSxhQUFBQSxRQUFPLEtBQUE7QUFDaEMsUUFBTSxjQUFhLEdBQUEsYUFBQUEsUUFBTyxJQUFBO0FBQzFCLFFBQU0sZUFBYyxHQUFBLGFBQUFBLFFBQU8sRUFBQTtBQUUzQixRQUFNLFNBQVEsR0FBQSxhQUFBVyxhQUFZLE1BQUE7QUFDeEIsUUFBSSxnQkFBZ0IsU0FBUztBQUMzQixzQkFBZ0IsUUFBUSxTQUFTLE1BQUE7QUFDakMsc0JBQWdCLFFBQVEsVUFBVSxJQUFJLGdCQUFBO0lBQ3hDO0FBQ0EsV0FBTyxFQUFFLFdBQVc7RUFDdEIsR0FBRztJQUFDO0dBQWdCO0FBRXBCLFFBQU0sWUFBVyxHQUFBLGFBQUFBLGFBQ2YsSUFBSUMsVUFBQTtBQUNGLFVBQU0sU0FBUyxNQUFBO0FBRWYsd0JBQW9CLFVBQVVBLEtBQUE7QUFFOUIsSUFBQUgsS0FBSSxDQUFDLGVBQWU7TUFBRSxHQUFHO01BQVcsV0FBVztJQUFLLEVBQUE7QUFFcEQsVUFBTSw0QkFBNEIsMENBQW9CLE1BQU0sT0FBTyxFQUFBLEdBQUtHLEtBQUE7QUFFeEUsYUFBUyxZQUFZLE9BQVU7QUFDN0IsVUFBSSxNQUFNLFFBQVEsYUFDaEIsUUFBTztBQUdULFVBQUksV0FBVyxXQUFXLFNBQVM7QUFFakMsWUFBSSxjQUFjLFFBQ2hCLGVBQWMsUUFBUSxLQUFBO2tCQUVsQixHQUFBLFdBQUFOLGFBQVksZ0JBQWUsR0FBQSxXQUFBTyxZQUFXLFdBQ3hDLEVBQUEsR0FBQSwyQ0FBaUIsT0FBTztVQUN0QixPQUFPO1VBQ1AsZUFBZTtZQUNiLE9BQU87WUFDUCxTQUFTLE9BQUs7QUFDWixvQkFBTSxLQUFJO0FBQ1YsNkJBQWUsVUFBTyxHQUFRLFdBQVcsV0FBVyxDQUFBLENBQUU7WUFDeEQ7VUFDRjtVQUNBLEdBQUcsbUJBQW1CO1FBQ3hCLENBQUE7QUFHSixRQUFBSixLQUFJOztVQUFTLFdBQVc7UUFBTSxDQUFBO01BQ2hDO0FBRUEsYUFBTztJQUNUO0FBRUEsUUFBSSxPQUFPLDhCQUE4QixZQUFZO0FBQ25ELHVCQUFpQixVQUFVO0FBQzNCLGFBQU8sMEJBQTBCLGtCQUFrQixPQUFPLEVBQUU7O1FBRTFELENBQUMsRUFBQSxNQUFNLFNBQVMsT0FBUSxNQUE2RDtBQUNuRixjQUFJLFdBQVcsV0FBVyxTQUFTO0FBQ2pDLGdCQUFJLGtCQUFrQixTQUFTO0FBQzdCLGdDQUFrQixRQUFRLFNBQVM7QUFDbkMsZ0NBQWtCLFFBQVEsV0FBVyxPQUFPLEtBQUssU0FBUyxDQUFBO1lBQzVEO0FBRUEsZ0JBQUksYUFBYSxRQUNmLGNBQWEsUUFBUSxNQUFNLGtCQUFrQixPQUFPO0FBR3RELGdCQUFJLFFBQ0YsYUFBWSxVQUFVLEtBQUs7QUFFN0IsdUJBQVcsVUFBVTtBQUVyQixZQUFBQSxLQUFJLENBQUMsaUJBQUE7QUFDSCxrQkFBSSxrQkFBa0IsUUFBUSxTQUFTLEVBQ3JDLFFBQU87O2dCQUFRLFdBQVc7Y0FBTTtBQUdsQyxxQkFBTztnQkFBRSxPQUFPLGFBQWEsUUFBUSxDQUFBLElBQUssT0FBTyxJQUFBO2dCQUFPLFdBQVc7Y0FBTTtZQUMzRSxDQUFBO1VBQ0Y7QUFFQSxpQkFBTztRQUNUO1FBQ0EsQ0FBQyxVQUFBO0FBQ0MscUJBQVcsVUFBVTtBQUNyQixpQkFBTyxZQUFZLEtBQUE7UUFDckI7TUFBQTtJQUVKO0FBRUEscUJBQWlCLFVBQVU7QUFDM0IsV0FBTywwQkFBMEIsS0FBSyxDQUFDLFNBQUE7QUFDckMsVUFBSSxXQUFXLFdBQVcsU0FBUztBQUNqQyxZQUFJLGFBQWEsUUFDZixjQUFhLFFBQVEsSUFBQTtBQUV2QixRQUFBQSxLQUFJOztVQUFRLFdBQVc7UUFBTSxDQUFBO01BQy9CO0FBRUEsYUFBTztJQUNULEdBQUcsV0FBQTtFQUNMLEdBQ0E7SUFDRTtJQUNBO0lBQ0E7SUFDQTtJQUNBQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7R0FDRDtBQUdILGlCQUFlLFVBQVU7QUFFekIsUUFBTSxjQUFhLEdBQUEsYUFBQUUsYUFBWSxNQUFBO0FBRTdCLHNCQUFrQixVQUFVO01BQUUsTUFBTTtJQUFFO0FBRXRDLFVBQU1DLFFBQVEsV0FBVyxXQUFXLENBQUE7QUFDcEMsV0FBTyxTQUFBLEdBQVlBLEtBQUE7RUFDckIsR0FBRztJQUFDO0lBQVU7R0FBVztBQUV6QixRQUFNLFVBQVMsR0FBQSxhQUFBRCxhQUNiLE9BQU8sYUFBYUcsYUFBQTtBQUNsQixRQUFJO0FBQ0osUUFBSTtBQUNGLFVBQUlBLFVBQVMsa0JBQWtCO0FBRTdCLGNBQUE7QUFFQSxZQUFJLE9BQU9BLFVBQVMsb0JBQW9CLGNBQWNBLFVBQVMsb0JBQW9CO0FBR2pGLHVDQUE2QixnQkFBZ0IsWUFBWSxTQUFTLEtBQUE7QUFFcEUsY0FBTSxTQUFTQSxTQUFRO0FBQ3ZCLFFBQUFMLEtBQUksQ0FBQyxlQUFlO1VBQUUsR0FBRztVQUFXLE1BQU0sT0FBTyxVQUFVLElBQUk7UUFBRSxFQUFBO01BQ25FO0FBQ0EsYUFBTyxNQUFNO0lBQ2YsU0FBUyxLQUFLO0FBQ1osVUFBSSxPQUFPSyxVQUFTLG9CQUFvQixZQUFZO0FBQ2xELGNBQU0sU0FBU0EsU0FBUTtBQUN2QixRQUFBTCxLQUFJLENBQUMsZUFBZTtVQUFFLEdBQUc7VUFBVyxNQUFNLE9BQU8sVUFBVSxJQUFJO1FBQUUsRUFBQTtNQUNuRSxXQUFXSyxVQUFTLG9CQUFvQkEsVUFBUyxvQkFBb0IsTUFDbkUsQ0FBQUwsS0FBSSxDQUFDLGVBQWU7UUFBRSxHQUFHO1FBQVcsTUFBTTtNQUEyQixFQUFBO0FBRXZFLFlBQU07SUFDUixVQUFBO0FBQ0UsVUFBSUssVUFBUywwQkFBMEIsT0FBQTtBQUNyQyxhQUFJLEdBQUEsV0FBQVIsYUFBWSxnQkFBZSxHQUFBLFdBQUFPLFlBQVcsZUFBYyxHQUFBLFdBQUFQLGFBQVksZ0JBQWdCO0FBR2xGLGdCQUFNLFdBQUE7WUFFTixZQUFBOztJQUdOO0VBQ0YsR0FDQTtJQUFDO0lBQVk7SUFBYUc7SUFBSztHQUFNO0FBR3ZDLFFBQU0sY0FBYSxHQUFBLGFBQUFFLGFBQVksTUFBQTtBQUM3QixzQkFBa0IsUUFBUSxRQUFRO0FBQ2xDLFVBQU1DLFFBQVEsV0FBVyxXQUFXLENBQUE7QUFDcEMsYUFBQSxHQUFZQSxLQUFBO0VBQ2QsR0FBRztJQUFDO0lBQW1CO0lBQVk7R0FBUztBQUc1QyxHQUFBLEdBQUEsYUFBQUcsV0FBVSxNQUFBO0FBRVIsc0JBQWtCLFVBQVU7TUFBRSxNQUFNO0lBQUU7QUFFdEMsUUFBSSxTQUFTLFlBQVksTUFDdkIsVUFBQSxHQUFjLFFBQVEsQ0FBQSxDQUFFOztBQUd4QixZQUFBO0VBR0osR0FBRztLQUFDLEdBQUEsMkNBQVk7TUFBQztNQUFNLFNBQVM7TUFBUztLQUFTO0lBQUc7SUFBaUI7R0FBa0I7QUFHeEYsR0FBQSxHQUFBLGFBQUFBLFdBQVUsTUFBQTtBQUNSLFdBQU8sTUFBQTtBQUNMLFlBQUE7SUFDRjtFQUNGLEdBQUc7SUFBQztHQUFNO0FBR1YsUUFBTSxZQUFZLFNBQVMsWUFBWSxRQUFRLE1BQU0sWUFBWTtBQUdqRSxRQUFNLHdCQUE0RDtJQUFFLEdBQUc7O0VBQWlCO0FBRXhGLFFBQU0sYUFBYSxpQkFBaUIsVUFDaEM7SUFDRSxVQUFVLFlBQVk7SUFDdEIsU0FBUyxXQUFXOztFQUV0QixJQUNBO0FBRUosU0FBTztJQUFFLEdBQUc7Ozs7RUFBc0Q7QUFDcEU7QUFHQSxTQUFTLDBDQUF1QixJQUFLO0FBQ25DLE1BQUksT0FBUSxRQUFRO0FBRWxCLFdBQU8sR0FBRyxLQUFLLE9BQUE7QUFFakIsTUFBSSxPQUFRLFFBQVE7QUFFbEIsV0FBTyxHQUFHLEtBQUssT0FBQTtBQUVqQixNQUFJLE9BQVEsUUFBUTtBQUVsQixXQUFPLEdBQUcsS0FBSyxPQUFBO0FBRWpCLE1BQUksT0FBUSxRQUFRO0FBRWxCLFdBQU8sR0FBRyxLQUFLLE9BQUE7QUFFakIsU0FBTztBQUNUO0FNL1hBLFNBQVMsdUNBQWlCLEdBQU07QUFDOUIsTUFBSSxPQUFPLE1BQU0sV0FDZixRQUFPO0FBRVQsUUFBTSxNQUFNO0FBQ1osU0FBTyxJQUFJLEtBQUssU0FBUyxVQUFVLFNBQVMsS0FBSyxDQUFBLENBQUEsTUFBUTtBQUMzRDtBQUVBLFNBQVMsbUNBQWEsT0FBVTtBQUM5QixNQUFJLGlCQUFpQixnQkFDbkIsUUFBTyxNQUFNLFNBQVE7QUFFdkIsU0FBTztBQUNUO0FBRU8sU0FBUywwQ0FDZCxTQVFBLFVBQWlCLENBQUEsR0FBRTtBQUVuQixXQUFTLE1BQU1DLE1BQVc7QUFDeEIsUUFBSSxZQUFZLFFBQ2QsUUFBTyxRQUFRLE9BQU9BLE1BQUssTUFBQTtRQUUzQixRQUFPLFFBQVEsTUFBTUEsSUFBQTtFQUV6QjtBQUVBLFNBQU87SUFDTCxVQUFVLFNBQVUsT0FBVTtBQUM1QixjQUFRLG1DQUFhLEtBQUE7QUFFckIsWUFBTUMsUUFBTyxPQUFPO0FBQ3BCLFVBQUksVUFBVSxLQUNaLE1BQUssT0FBQSxFQUFROztBQUdiLGFBQUssTUFBTUEsS0FBQSxFQUFNLEtBQUE7SUFFckI7SUFDQSxTQUFTLFNBQVUsUUFBVztBQUM1QixZQUFNLFVBQVU7QUFDaEIsWUFBTSxZQUFZLE9BQU8sVUFBVSxTQUFTLEtBQUssTUFBQTtBQUNqRCxVQUFJLFVBQVUsUUFBUSxLQUFLLFNBQUEsSUFBYSxDQUFBLEtBQU0sY0FBYyxZQUFZO0FBQ3hFLGdCQUFVLFFBQVEsWUFBVztBQUU3QixVQUFJLGVBQWU7QUFFbkIsV0FBSyxlQUFlLFFBQVEsUUFBUSxNQUFBLE1BQVksR0FBRztBQUNqRCxhQUFLLFNBQVMsZUFBZSxlQUFlLEdBQUE7QUFDNUM7TUFDRixNQUNFLFNBQVEsS0FBSyxNQUFBO0FBR2YsVUFBSSxPQUFPLFNBQVMsTUFBQSxHQUFTO0FBQzNCLGNBQU0sU0FBQTtBQUNOLGVBQU8sTUFBTSxPQUFPLFNBQVMsTUFBQSxDQUFBO01BQy9CO0FBRUEsVUFBSSxZQUFZLFlBQVksWUFBWSxjQUFjLFlBQVksaUJBQWlCO0FBRWpGLFlBQUksS0FBSyxNQUFNLE9BQUE7QUFFYixlQUFLLE1BQU0sT0FBQSxFQUFTLE1BQUE7WUFFcEIsT0FBTSxJQUFJLE1BQU0sMEJBQTBCLFVBQVUsR0FBQTtNQUV4RCxPQUFPO0FBQ0wsWUFBSSxPQUFPLE9BQU8sS0FBSyxNQUFBO0FBQ3ZCLGVBQU8sS0FBSyxLQUFJO0FBUWhCLFlBQUksQ0FBQyx1Q0FBaUIsTUFBQSxFQUNwQixNQUFLLE9BQU8sR0FBRyxHQUFHLGFBQWEsYUFBYSxhQUFBO0FBRzlDLGNBQU0sWUFBWSxLQUFLLFNBQVMsR0FBQTtBQUNoQyxjQUFNLE9BQU87QUFDYixlQUFPLEtBQUssUUFBUSxTQUFVLEtBQUc7QUFDL0IsZUFBSyxTQUFTLEdBQUE7QUFDZCxnQkFBTSxHQUFBO0FBQ04sZUFBSyxTQUFTLE9BQU8sR0FBQSxDQUFJO0FBQ3pCLGdCQUFNLEdBQUE7UUFDUixDQUFBO01BQ0Y7SUFDRjtJQUNBLFFBQVEsU0FBVSxLQUFZLFdBQWtCO0FBQzlDLGtCQUFZLE9BQU8sY0FBYyxjQUFjLFlBQVk7QUFFM0QsWUFBTSxPQUFPO0FBQ2IsWUFBTSxXQUFXLElBQUksU0FBUyxHQUFBO0FBQzlCLFVBQUksQ0FBQyxhQUFhLElBQUksVUFBVSxHQUFHO0FBQ2pDLFlBQUksUUFBUSxTQUFVLE9BQVU7QUFDOUIsZUFBSyxTQUFTLEtBQUE7UUFDaEIsQ0FBQTtBQUNBO01BQ0Y7QUFXQSxVQUFJLG1CQUEwQixDQUFBO0FBQzlCLFlBQU0sVUFBVSxJQUFJLElBQUksU0FBVSxPQUFVO0FBQzFDLGNBQU0sT0FBTyxrQ0FBQTtBQUNiLGNBQU0sZUFBZSxRQUFRLE1BQUs7QUFDbEMsY0FBTSxTQUFTLDBDQUFXLE1BQU0sWUFBQTtBQUNoQyxlQUFPLFNBQVMsS0FBQTtBQUVoQiwyQkFBbUIsaUJBQWlCLE9BQU8sYUFBYSxNQUFNLFFBQVEsTUFBTSxDQUFBO0FBQzVFLGVBQU8sS0FBSyxLQUFJLEVBQUcsU0FBUTtNQUM3QixDQUFBO0FBQ0EsZ0JBQVUsUUFBUSxPQUFPLGdCQUFBO0FBQ3pCLGNBQVEsS0FBSTtBQUNaLFdBQUssT0FBTyxTQUFTLEtBQUE7SUFDdkI7SUFDQSxPQUFPLFNBQVUsTUFBVTtBQUN6QixZQUFNLFVBQVUsS0FBSyxPQUFNLENBQUE7SUFDN0I7SUFDQSxTQUFTLFNBQVUsS0FBVztBQUM1QixZQUFNLFlBQVksSUFBSSxTQUFRLENBQUE7SUFDaEM7SUFDQSxRQUFRLFNBQVUsS0FBVTtBQUMxQixZQUFNLFdBQVcsSUFBSSxTQUFRLENBQUE7SUFDL0I7SUFDQSxVQUFVLFNBQVVDLE9BQWE7QUFDL0IsWUFBTSxVQUFVQSxNQUFLLFNBQVEsQ0FBQTtJQUMvQjtJQUNBLFNBQVMsU0FBVSxRQUFjO0FBQy9CLFlBQU0sWUFBWSxPQUFPLFNBQVMsR0FBQTtBQUNsQyxZQUFNLE9BQU8sU0FBUSxDQUFBO0lBQ3ZCO0lBQ0EsV0FBVyxTQUFVLElBQU87QUFDMUIsWUFBTSxLQUFBO0FBQ04sVUFBSSx1Q0FBaUIsRUFBQSxFQUNuQixNQUFLLFNBQVMsVUFBQTtVQUVkLE1BQUssU0FBUyxHQUFHLFNBQVEsQ0FBQTtBQU0zQixXQUFLLFNBQVMsbUJBQW1CLE9BQU8sR0FBRyxJQUFJLENBQUE7QUFFL0MsV0FBSyxRQUFRLEVBQUE7SUFDZjtJQUNBLFNBQVMsU0FBVSxRQUFjO0FBQy9CLFlBQU0sWUFBWSxPQUFPLFNBQVEsQ0FBQTtJQUNuQztJQUNBLE1BQU0sU0FBVSxLQUFRO0FBQ3RCLFlBQU0sU0FBUyxJQUFJLFNBQVEsQ0FBQTtJQUM3QjtJQUNBLE9BQU8sV0FBQTtBQUNMLFlBQU0sTUFBQTtJQUNSO0lBQ0EsWUFBWSxXQUFBO0FBQ1YsWUFBTSxXQUFBO0lBQ1I7SUFDQSxTQUFTLFNBQVUsT0FBYTtBQUM5QixZQUFNLFdBQVcsTUFBTSxTQUFRLENBQUE7SUFDakM7SUFDQSxhQUFhLFNBQVUsS0FBZTtBQUNwQyxZQUFNLGFBQUE7QUFDTixXQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBSyxHQUFBLENBQUE7SUFDM0M7SUFDQSxvQkFBb0IsU0FBVSxLQUFzQjtBQUNsRCxZQUFNLG9CQUFBO0FBQ04sV0FBSyxTQUFTLE1BQU0sVUFBVSxNQUFNLEtBQUssR0FBQSxDQUFBO0lBQzNDO0lBQ0EsWUFBWSxTQUFVLEtBQWM7QUFDbEMsWUFBTSxZQUFBO0FBQ04sV0FBSyxTQUFTLE1BQU0sVUFBVSxNQUFNLEtBQUssR0FBQSxDQUFBO0lBQzNDO0lBQ0EsY0FBYyxTQUFVLEtBQWdCO0FBQ3RDLFlBQU0sY0FBQTtBQUNOLFdBQUssU0FBUyxNQUFNLFVBQVUsTUFBTSxLQUFLLEdBQUEsQ0FBQTtJQUMzQztJQUNBLGFBQWEsU0FBVSxLQUFlO0FBQ3BDLFlBQU0sYUFBQTtBQUNOLFdBQUssU0FBUyxNQUFNLFVBQVUsTUFBTSxLQUFLLEdBQUEsQ0FBQTtJQUMzQztJQUNBLGNBQWMsU0FBVSxLQUFnQjtBQUN0QyxZQUFNLGNBQUE7QUFDTixXQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBSyxHQUFBLENBQUE7SUFDM0M7SUFDQSxhQUFhLFNBQVUsS0FBZTtBQUNwQyxZQUFNLGFBQUE7QUFDTixXQUFLLFNBQVMsTUFBTSxVQUFVLE1BQU0sS0FBSyxHQUFBLENBQUE7SUFDM0M7SUFDQSxlQUFlLFNBQVUsS0FBaUI7QUFDeEMsWUFBTSxlQUFBO0FBQ04sV0FBSyxTQUFTLE1BQU0sVUFBVSxNQUFNLEtBQUssR0FBQSxDQUFBO0lBQzNDO0lBQ0EsZUFBZSxTQUFVLEtBQWlCO0FBQ3hDLFlBQU0sZUFBQTtBQUNOLFdBQUssU0FBUyxNQUFNLFVBQVUsTUFBTSxLQUFLLEdBQUEsQ0FBQTtJQUMzQztJQUNBLGNBQWMsU0FBVSxLQUFnQjtBQUN0QyxZQUFNLGNBQUE7QUFDTixXQUFLLFNBQVMsSUFBSSxXQUFXLEdBQUEsQ0FBQTtJQUMvQjtJQUNBLE1BQU0sU0FBVSxLQUFRO0FBQ3RCLFlBQU0sU0FBUyxJQUFJLFNBQVEsQ0FBQTtJQUM3QjtJQUNBLE1BQU0sU0FBVUMsTUFBa0I7QUFDaEMsWUFBTSxNQUFBO0FBQ04sWUFBTSxNQUFNLE1BQU0sS0FBS0EsSUFBQTtBQUN2QixXQUFLLE9BQU8sS0FBSyxJQUFBO0lBQ25CO0lBQ0EsTUFBTSxTQUFVVixNQUFhO0FBQzNCLFlBQU0sTUFBQTtBQUNOLFlBQU0sTUFBTSxNQUFNLEtBQUtBLElBQUE7QUFDdkIsV0FBSyxPQUFPLEtBQUssSUFBQTtJQUNuQjtJQUNBLE9BQU8sU0FBVSxNQUFTO0FBQ3hCLFlBQU0sT0FBQTtBQUNOLFdBQUssU0FBUztRQUFDLEtBQUs7UUFBTSxLQUFLO1FBQU0sS0FBSztRQUFNLEtBQUs7T0FBYTtJQUNwRTtJQUNBLE9BQU8sV0FBQTtBQUNMLFlBQU0sTUFDSiw2SkFBQTtJQUlKO0lBQ0EsWUFBWSxXQUFBO0FBQ1YsWUFBTSxXQUFBO0lBQ1I7SUFDQSxTQUFTLFNBQVUsUUFBYztBQUMvQixZQUFNLFlBQVksT0FBTyxTQUFRLENBQUE7SUFDbkM7O0lBRUEsVUFBVSxXQUFBO0FBQ1IsWUFBTSxTQUFBO0lBQ1I7SUFDQSxRQUFRLFdBQUE7QUFDTixZQUFNLE9BQUE7SUFDUjtJQUNBLE9BQU8sV0FBQTtBQUNMLFlBQU0sTUFBQTtJQUNSO0lBQ0EsTUFBTSxXQUFBO0FBQ0osWUFBTSxLQUFBO0lBQ1I7SUFDQSxNQUFNLFdBQUE7QUFDSixZQUFNLEtBQUE7SUFDUjtJQUNBLE1BQU0sV0FBQTtBQUNKLFlBQU0sS0FBQTtJQUNSO0lBQ0EsY0FBYyxXQUFBO0FBQ1osWUFBTSxhQUFBO0lBQ1I7SUFDQSxnQkFBZ0IsV0FBQTtBQUNkLFlBQU0sZUFBQTtJQUNSO0lBQ0EsYUFBYSxXQUFBO0FBQ1gsWUFBTSxZQUFBO0lBQ1I7SUFDQSxPQUFPLFdBQUE7QUFDTCxZQUFNLE1BQUE7SUFDUjtJQUNBLFVBQVUsV0FBQTtBQUNSLFlBQU0sU0FBQTtJQUNSO0lBQ0EsYUFBYSxXQUFBO0FBQ1gsWUFBTSxZQUFBO0lBQ1I7SUFDQSxhQUFhLFdBQUE7QUFDWCxZQUFNLFlBQUE7SUFDUjtJQUNBLFdBQVcsV0FBQTtBQUNULFlBQU0sVUFBQTtJQUNSO0lBQ0EsU0FBUyxXQUFBO0FBQ1AsWUFBTSxRQUFBO0lBQ1I7SUFDQSxVQUFVLFdBQUE7QUFDUixZQUFNLFNBQUE7SUFDUjtJQUNBLFVBQVUsV0FBQTtBQUNSLFlBQU0sU0FBQTtJQUNSO0VBQ0Y7QUFDRjtBQU1BLFNBQVMsb0NBQUE7QUFDUCxTQUFPO0lBQ0wsS0FBSztJQUVMLE9BQU8sU0FBVSxHQUFTO0FBQ3hCLFdBQUssT0FBTztJQUNkO0lBRUEsS0FBSyxTQUFVLEdBQVM7QUFDdEIsV0FBSyxPQUFPO0lBQ2Q7SUFFQSxNQUFNLFdBQUE7QUFDSixhQUFPLEtBQUs7SUFDZDtFQUNGO0FBQ0Y7QUR0VU8sU0FBUywwQ0FBb0IsS0FBYSxRQUFlO0FBQzlELFFBQU0sUUFBUSxLQUFLLEdBQUE7QUFDbkIsTUFBSSxpQkFBaUIsS0FDbkIsUUFBTywwQkFBMEIsTUFBTSxZQUFXLENBQUE7QUFFcEQsTUFBSSxPQUFPLFNBQVMsS0FBQSxFQUNsQixRQUFPLDRCQUE0QixNQUFNLFNBQVMsUUFBQSxDQUFBO0FBRXBELFNBQU87QUFDVDtBQUVPLFNBQVMsMENBQVEsTUFBYyxPQUFjO0FBQ2xELE1BQUksT0FBTyxVQUFVLFlBQVksTUFBTSxXQUFXLHlCQUFBLEVBQ2hELFFBQU8sSUFBSSxLQUFLLE1BQU0sUUFBUSwyQkFBMkIsRUFBQSxDQUFBO0FBRTNELE1BQUksT0FBTyxVQUFVLFlBQVksTUFBTSxXQUFXLDJCQUFBLEVBQ2hELFFBQU8sT0FBTyxLQUFLLE1BQU0sUUFBUSw2QkFBNkIsRUFBQSxHQUFLLFFBQUE7QUFFckUsU0FBTztBQUNUO0FBRU8sU0FBUywwQ0FBSyxRQUFXO0FBQzlCLFFBQU0saUJBQWdCLEdBQUEsbUJBQUFXLFNBQU8sV0FBVyxNQUFBO0FBQ3hDLFFBQU0sVUFBUyxHQUFBLDJDQUFXLGFBQUE7QUFDMUIsU0FBTyxTQUFTLE1BQUE7QUFFaEIsU0FBTyxjQUFjLE9BQU8sS0FBQTtBQUM5QjtBRDFCQSxJQUFNLGtDQUE0Qix1QkFBTyx5QkFBQTtBQUN6QyxJQUFNLGlDQUEyQixvQkFBSSxJQUFBO0FBZ0I5QixTQUFTLDBDQUNkLEtBQ0EsY0FDQSxRQUFvQztBQUVwQyxRQUFNLFdBQVcsUUFBUSxrQkFBa0I7QUFDM0MsUUFBTSxRQUNKLCtCQUFTLElBQUksUUFBQSxLQUFhLCtCQUFTLElBQUksVUFBVSxLQUFJLEdBQUEsV0FBQUMsT0FBTTtJQUFFLFdBQVcsUUFBUTtFQUFlLENBQUEsQ0FBQSxFQUFJLElBQUksUUFBQTtBQUV6RyxNQUFJLENBQUMsTUFDSCxPQUFNLElBQUksTUFBTSxlQUFBO0FBR2xCLFFBQU0sVUFBUyxHQUFBLDJDQUFVLEdBQUE7QUFDekIsUUFBTSxtQkFBa0IsR0FBQSwyQ0FBVSxZQUFBO0FBRWxDLFFBQU0sZUFBYyxHQUFBLGFBQUFDLHNCQUFxQixNQUFNLFdBQVcsTUFBQTtBQUN4RCxRQUFJO0FBQ0YsYUFBTyxNQUFNLElBQUksT0FBTyxPQUFPO0lBQ2pDLFNBQVMsT0FBTztBQUNkLGNBQVEsTUFBTSw2QkFBNkIsS0FBQTtBQUMzQyxhQUFPO0lBQ1Q7RUFDRixDQUFBO0FBRUEsUUFBTSxTQUFRLEdBQUEsYUFBQXJCLFNBQVEsTUFBQTtBQUNwQixRQUFJLE9BQU8sZ0JBQWdCLGFBQWE7QUFDdEMsVUFBSSxnQkFBZ0IsWUFDbEIsUUFBTztBQUVULFVBQUk7QUFDRixlQUFPLEtBQUssTUFBTSxjQUFhLEdBQUEsMENBQU07TUFDdkMsU0FBUyxLQUFLO0FBRVosZ0JBQVEsS0FBSyxnQ0FBZ0MsR0FBQTtBQUM3QyxlQUFPLGdCQUFnQjtNQUN6QjtJQUNGLE1BQ0UsUUFBTyxnQkFBZ0I7RUFFM0IsR0FBRztJQUFDO0lBQWE7R0FBZ0I7QUFFakMsUUFBTSxZQUFXLEdBQUEsMkNBQVUsS0FBQTtBQUUzQixRQUFNLG9CQUFtQixHQUFBLGFBQUFVLGFBQ3ZCLENBQUMsWUFBQTtBQUVDLFVBQU0sV0FBVyxPQUFPLFlBQVksYUFBYSxRQUFRLFNBQVMsT0FBTyxJQUFJO0FBQzdFLFFBQUksT0FBTyxhQUFhLFlBQ3RCLE9BQU0sSUFBSSxPQUFPLFNBQVMsV0FBQTtTQUNyQjtBQUNMLFlBQU0sbUJBQW1CLEtBQUssVUFBVSxXQUFVLEdBQUEsMENBQU87QUFDekQsWUFBTSxJQUFJLE9BQU8sU0FBUyxnQkFBQTtJQUM1QjtBQUNBLFdBQU87RUFDVCxHQUNBO0lBQUM7SUFBTztJQUFRO0dBQVM7QUFHM0IsU0FBTztJQUFDO0lBQU87O0FBQ2pCO0FHbkVBLElBQU0sbUNBQTZCLHVCQUFBO0FBbUg1QixTQUFTLDBDQUlkLElBQU8sTUFBc0IsU0FBb0M7QUFRakUsUUFBTSxFQUFBLGFBQ08sa0JBQ0sseUJBRWhCLEdBQUcsa0JBQUEsSUFDa0UsV0FBVyxDQUFDO0FBQ25GLFFBQU0sa0JBQWlCLEdBQUEsYUFBQVgsUUFBNEIsSUFBQTtBQUVuRCxRQUFNLENBQUMsWUFBWSxXQUFBLEtBQWUsR0FBQSw0Q0FDaEMsR0FBQSwyQ0FBSyxRQUFRLENBQUEsQ0FBRSxJQUFJLHlCQUNuQixrQ0FDQTtJQUNFLGlCQUFnQixHQUFBLDJDQUFLLEVBQUE7RUFDdkIsQ0FBQTtBQUlGLFFBQU0sZ0JBQWUsR0FBQSxhQUFBQSxRQUFtQyxlQUFlLG1DQUFhLGFBQWMsV0FBQTtBQUNsRyxRQUFNLHFCQUFvQixHQUFBLGFBQUFBLFFBQTJELE1BQUE7QUFFckYsUUFBTSxFQUNKLFFBQVEsU0FBTyxZQUVmLEdBQUcsTUFBQSxLQUdELEdBQUEsMkNBQVcsSUFBSSxRQUFTLENBQUEsR0FBNkI7SUFDdkQsR0FBRztJQUNILE9BQU8sTUFBTXVCLGFBQVU7QUFDckIsd0JBQWtCLFVBQVVBO0FBQzVCLFVBQUksa0JBQWtCLE9BQ3BCLG1CQUFrQixPQUFPLE1BQU1BLFdBQUE7QUFFakMsVUFBSUEsZUFBY0EsWUFBVyxPQUFPO0FBRWxDO0FBRUYscUJBQWUsVUFBVTtBQUN6QixtQkFBYSxVQUFVO0FBQ3ZCLGtCQUFZLElBQUE7SUFDZDtFQUNGLENBQUE7QUFFQSxNQUFJO0FBQ0osUUFBTSxhQUFhLE1BQU07QUFHekIsTUFBSSxrQkFBa0IsV0FBVyxrQkFBa0IsUUFBUSxPQUFPLEtBQUssTUFBTSxLQUMzRSxnQkFBZSxNQUFNO1dBRVosZUFBZSxZQUFZLFVBQ3BDLGdCQUFlLGFBQWE7V0FDbkIsb0JBQW9CLGVBQWUsa0NBQVk7QUFFeEQsbUJBQWU7QUFDZixRQUFJLFlBQVk7QUFDZCxpQkFBVyxVQUFVO0FBQ3JCLGlCQUFXLFdBQVcsV0FBVztJQUNuQztFQUNGLFdBQVcsb0JBQW9CLGVBQWU7QUFFNUMsbUJBQWUsYUFBYTtXQUVuQixlQUFlLGtDQUFZO0FBQ3BDLG1CQUFlO0FBQ2YsUUFBSSxZQUFZO0FBQ2QsaUJBQVcsVUFBVTtBQUNyQixpQkFBVyxXQUFXLFdBQVc7SUFDbkM7RUFDRixNQUNFLGdCQUFlO0FBR2pCLFFBQU0sY0FBYSxHQUFBLDJDQUFVLFlBQUE7QUFHN0IsUUFBTSxVQUFTLEdBQUEsYUFBQVosYUFDYixPQUFPLGFBQWFHLGFBQUE7QUFDbEIsUUFBSTtBQUNKLFFBQUk7QUFDRixVQUFJQSxVQUFTLGtCQUFrQjtBQUM3QixZQUFJLE9BQU9BLFVBQVMsb0JBQW9CLGNBQWNBLFVBQVMsb0JBQW9CO0FBR2pGLHVDQUE2QixnQkFBZ0IsV0FBVyxPQUFPO0FBRWpFLGNBQU0sT0FBT0EsU0FBUSxpQkFBaUIsV0FBVyxPQUFPO0FBQ3hELHVCQUFlLFVBQVU7QUFDekIscUJBQWEsVUFBVTtBQUN2QixvQkFBWSxJQUFBO01BQ2Q7QUFDQSxhQUFPLE1BQU0sUUFBUSxhQUFhO1FBQUUsdUJBQXVCQSxVQUFTO01BQXNCLENBQUE7SUFDNUYsU0FBUyxLQUFLO0FBQ1osVUFBSSxPQUFPQSxVQUFTLG9CQUFvQixZQUFZO0FBQ2xELGNBQU0sT0FBT0EsU0FBUSxnQkFBZ0IsV0FBVyxPQUFPO0FBQ3ZELHVCQUFlLFVBQVU7QUFDekIscUJBQWEsVUFBVTtBQUN2QixvQkFBWSxJQUFBO01BQ2QsV0FBV0EsVUFBUyxvQkFBb0JBLFVBQVMsb0JBQW9CLE9BQU87QUFDMUUsdUJBQWUsVUFBVTtBQUV6QixxQkFBYSxVQUFVO0FBRXZCLG9CQUFZLDBCQUFBO01BQ2Q7QUFDQSxZQUFNO0lBQ1I7RUFDRixHQUNBO0lBQUM7SUFBYTtJQUFTO0lBQVk7SUFBYztHQUFlO0FBR2xFLEdBQUEsR0FBQSxhQUFBQyxXQUFVLE1BQUE7QUFDUixRQUFJLGVBQWUsa0NBQVk7QUFDN0IscUJBQWUsVUFBVTtBQUN6QixtQkFBYSxVQUFVO0lBQ3pCO0VBQ0YsR0FBRztJQUFDO0dBQVc7QUFFZixTQUFPO0lBQ0wsTUFBTTtJQUNOLFdBQVcsTUFBTTtJQUNqQixPQUFPLE1BQU07SUFDYixRQUFRLGtCQUFrQixXQUFXLGtCQUFrQixRQUFRLE9BQU8sSUFBSSxVQUFVOzs7RUFHdEY7QUFDRjs7O0E2QjVRQSxnQkFBZ0U7QUFDaEUsa0JBQXFCO0FBQ3JCLGdCQUF3Qjs7O0FDQXhCLFNBQVMsVUFBVSxTQUFTO0FBQzFCLFNBQVEsT0FBTyxZQUFZLGVBQWlCLFlBQVk7QUFDMUQ7QUFHQSxTQUFTLFNBQVMsU0FBUztBQUN6QixTQUFRLE9BQU8sWUFBWSxZQUFjLFlBQVk7QUFDdkQ7QUFHQSxTQUFTLFFBQVEsVUFBVTtBQUN6QixNQUFJLE1BQU0sUUFBUSxRQUFRLEVBQUcsUUFBTztBQUFBLFdBQzNCLFVBQVUsUUFBUSxFQUFHLFFBQU8sQ0FBQztBQUV0QyxTQUFPLENBQUUsUUFBUztBQUNwQjtBQUdBLFNBQVMsT0FBTyxRQUFRLFFBQVE7QUFDOUIsTUFBSSxPQUFPLFFBQVEsS0FBSztBQUV4QixNQUFJLFFBQVE7QUFDVixpQkFBYSxPQUFPLEtBQUssTUFBTTtBQUUvQixTQUFLLFFBQVEsR0FBRyxTQUFTLFdBQVcsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ3RFLFlBQU0sV0FBVyxLQUFLO0FBQ3RCLGFBQU8sR0FBRyxJQUFJLE9BQU8sR0FBRztBQUFBLElBQzFCO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUdBLFNBQVMsT0FBTyxRQUFRLE9BQU87QUFDN0IsTUFBSSxTQUFTLElBQUk7QUFFakIsT0FBSyxRQUFRLEdBQUcsUUFBUSxPQUFPLFNBQVMsR0FBRztBQUN6QyxjQUFVO0FBQUEsRUFDWjtBQUVBLFNBQU87QUFDVDtBQUdBLFNBQVMsZUFBZSxRQUFRO0FBQzlCLFNBQVEsV0FBVyxLQUFPLE9BQU8sc0JBQXNCLElBQUk7QUFDN0Q7QUFHQSxJQUFJLGNBQW1CO0FBQ3ZCLElBQUksYUFBbUI7QUFDdkIsSUFBSSxZQUFtQjtBQUN2QixJQUFJLFdBQW1CO0FBQ3ZCLElBQUksbUJBQW1CO0FBQ3ZCLElBQUksV0FBbUI7QUFFdkIsSUFBSSxTQUFTO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixnQkFBZ0I7QUFBQSxFQUNoQixRQUFRO0FBQ1Q7QUFLQSxTQUFTLFlBQVlTLFlBQVcsU0FBUztBQUN2QyxNQUFJLFFBQVEsSUFBSSxVQUFVQSxXQUFVLFVBQVU7QUFFOUMsTUFBSSxDQUFDQSxXQUFVLEtBQU0sUUFBTztBQUU1QixNQUFJQSxXQUFVLEtBQUssTUFBTTtBQUN2QixhQUFTLFNBQVNBLFdBQVUsS0FBSyxPQUFPO0FBQUEsRUFDMUM7QUFFQSxXQUFTLE9BQU9BLFdBQVUsS0FBSyxPQUFPLEtBQUssT0FBT0EsV0FBVSxLQUFLLFNBQVMsS0FBSztBQUUvRSxNQUFJLENBQUMsV0FBV0EsV0FBVSxLQUFLLFNBQVM7QUFDdEMsYUFBUyxTQUFTQSxXQUFVLEtBQUs7QUFBQSxFQUNuQztBQUVBLFNBQU8sVUFBVSxNQUFNO0FBQ3pCO0FBR0EsU0FBUyxnQkFBZ0IsUUFBUSxNQUFNO0FBRXJDLFFBQU0sS0FBSyxJQUFJO0FBRWYsT0FBSyxPQUFPO0FBQ1osT0FBSyxTQUFTO0FBQ2QsT0FBSyxPQUFPO0FBQ1osT0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLO0FBR3RDLE1BQUksTUFBTSxtQkFBbUI7QUFFM0IsVUFBTSxrQkFBa0IsTUFBTSxLQUFLLFdBQVc7QUFBQSxFQUNoRCxPQUFPO0FBRUwsU0FBSyxRQUFTLElBQUksTUFBTSxFQUFHLFNBQVM7QUFBQSxFQUN0QztBQUNGO0FBSUEsZ0JBQWdCLFlBQVksT0FBTyxPQUFPLE1BQU0sU0FBUztBQUN6RCxnQkFBZ0IsVUFBVSxjQUFjO0FBR3hDLGdCQUFnQixVQUFVLFdBQVcsU0FBUyxTQUFTLFNBQVM7QUFDOUQsU0FBTyxLQUFLLE9BQU8sT0FBTyxZQUFZLE1BQU0sT0FBTztBQUNyRDtBQUdBLElBQUksWUFBWTtBQUdoQixTQUFTLFFBQVEsUUFBUSxXQUFXLFNBQVMsVUFBVSxlQUFlO0FBQ3BFLE1BQUksT0FBTztBQUNYLE1BQUksT0FBTztBQUNYLE1BQUksZ0JBQWdCLEtBQUssTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJO0FBRXBELE1BQUksV0FBVyxZQUFZLGVBQWU7QUFDeEMsV0FBTztBQUNQLGdCQUFZLFdBQVcsZ0JBQWdCLEtBQUs7QUFBQSxFQUM5QztBQUVBLE1BQUksVUFBVSxXQUFXLGVBQWU7QUFDdEMsV0FBTztBQUNQLGNBQVUsV0FBVyxnQkFBZ0IsS0FBSztBQUFBLEVBQzVDO0FBRUEsU0FBTztBQUFBLElBQ0wsS0FBSyxPQUFPLE9BQU8sTUFBTSxXQUFXLE9BQU8sRUFBRSxRQUFRLE9BQU8sUUFBRyxJQUFJO0FBQUEsSUFDbkUsS0FBSyxXQUFXLFlBQVksS0FBSztBQUFBO0FBQUEsRUFDbkM7QUFDRjtBQUdBLFNBQVMsU0FBUyxRQUFRLEtBQUs7QUFDN0IsU0FBTyxPQUFPLE9BQU8sS0FBSyxNQUFNLE9BQU8sTUFBTSxJQUFJO0FBQ25EO0FBR0EsU0FBUyxZQUFZLE1BQU0sU0FBUztBQUNsQyxZQUFVLE9BQU8sT0FBTyxXQUFXLElBQUk7QUFFdkMsTUFBSSxDQUFDLEtBQUssT0FBUSxRQUFPO0FBRXpCLE1BQUksQ0FBQyxRQUFRLFVBQVcsU0FBUSxZQUFZO0FBQzVDLE1BQUksT0FBTyxRQUFRLFdBQWdCLFNBQVUsU0FBUSxTQUFjO0FBQ25FLE1BQUksT0FBTyxRQUFRLGdCQUFnQixTQUFVLFNBQVEsY0FBYztBQUNuRSxNQUFJLE9BQU8sUUFBUSxlQUFnQixTQUFVLFNBQVEsYUFBYztBQUVuRSxNQUFJLEtBQUs7QUFDVCxNQUFJLGFBQWEsQ0FBRSxDQUFFO0FBQ3JCLE1BQUksV0FBVyxDQUFDO0FBQ2hCLE1BQUk7QUFDSixNQUFJLGNBQWM7QUFFbEIsU0FBUSxRQUFRLEdBQUcsS0FBSyxLQUFLLE1BQU0sR0FBSTtBQUNyQyxhQUFTLEtBQUssTUFBTSxLQUFLO0FBQ3pCLGVBQVcsS0FBSyxNQUFNLFFBQVEsTUFBTSxDQUFDLEVBQUUsTUFBTTtBQUU3QyxRQUFJLEtBQUssWUFBWSxNQUFNLFNBQVMsY0FBYyxHQUFHO0FBQ25ELG9CQUFjLFdBQVcsU0FBUztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUVBLE1BQUksY0FBYyxFQUFHLGVBQWMsV0FBVyxTQUFTO0FBRXZELE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDcEIsTUFBSSxlQUFlLEtBQUssSUFBSSxLQUFLLE9BQU8sUUFBUSxZQUFZLFNBQVMsTUFBTSxFQUFFLFNBQVMsRUFBRTtBQUN4RixNQUFJLGdCQUFnQixRQUFRLGFBQWEsUUFBUSxTQUFTLGVBQWU7QUFFekUsT0FBSyxJQUFJLEdBQUcsS0FBSyxRQUFRLGFBQWEsS0FBSztBQUN6QyxRQUFJLGNBQWMsSUFBSSxFQUFHO0FBQ3pCLFdBQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFdBQVcsY0FBYyxDQUFDO0FBQUEsTUFDMUIsU0FBUyxjQUFjLENBQUM7QUFBQSxNQUN4QixLQUFLLFlBQVksV0FBVyxXQUFXLElBQUksV0FBVyxjQUFjLENBQUM7QUFBQSxNQUNyRTtBQUFBLElBQ0Y7QUFDQSxhQUFTLE9BQU8sT0FBTyxLQUFLLFFBQVEsTUFBTSxJQUFJLFVBQVUsS0FBSyxPQUFPLElBQUksR0FBRyxTQUFTLEdBQUcsWUFBWSxJQUNqRyxRQUFRLEtBQUssTUFBTSxPQUFPO0FBQUEsRUFDOUI7QUFFQSxTQUFPLFFBQVEsS0FBSyxRQUFRLFdBQVcsV0FBVyxHQUFHLFNBQVMsV0FBVyxHQUFHLEtBQUssVUFBVSxhQUFhO0FBQ3hHLFlBQVUsT0FBTyxPQUFPLEtBQUssUUFBUSxNQUFNLElBQUksVUFBVSxLQUFLLE9BQU8sR0FBRyxTQUFTLEdBQUcsWUFBWSxJQUM5RixRQUFRLEtBQUssTUFBTTtBQUNyQixZQUFVLE9BQU8sT0FBTyxLQUFLLFFBQVEsU0FBUyxlQUFlLElBQUksS0FBSyxHQUFHLElBQUk7QUFFN0UsT0FBSyxJQUFJLEdBQUcsS0FBSyxRQUFRLFlBQVksS0FBSztBQUN4QyxRQUFJLGNBQWMsS0FBSyxTQUFTLE9BQVE7QUFDeEMsV0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsV0FBVyxjQUFjLENBQUM7QUFBQSxNQUMxQixTQUFTLGNBQWMsQ0FBQztBQUFBLE1BQ3hCLEtBQUssWUFBWSxXQUFXLFdBQVcsSUFBSSxXQUFXLGNBQWMsQ0FBQztBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUNBLGNBQVUsT0FBTyxPQUFPLEtBQUssUUFBUSxNQUFNLElBQUksVUFBVSxLQUFLLE9BQU8sSUFBSSxHQUFHLFNBQVMsR0FBRyxZQUFZLElBQ2xHLFFBQVEsS0FBSyxNQUFNO0FBQUEsRUFDdkI7QUFFQSxTQUFPLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFDakM7QUFHQSxJQUFJLFVBQVU7QUFFZCxJQUFJLDJCQUEyQjtBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFJLGtCQUFrQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLFNBQVMsb0JBQW9CQyxNQUFLO0FBQ2hDLE1BQUksU0FBUyxDQUFDO0FBRWQsTUFBSUEsU0FBUSxNQUFNO0FBQ2hCLFdBQU8sS0FBS0EsSUFBRyxFQUFFLFFBQVEsU0FBVSxPQUFPO0FBQ3hDLE1BQUFBLEtBQUksS0FBSyxFQUFFLFFBQVEsU0FBVSxPQUFPO0FBQ2xDLGVBQU8sT0FBTyxLQUFLLENBQUMsSUFBSTtBQUFBLE1BQzFCLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxPQUFPLEtBQUssU0FBUztBQUM1QixZQUFVLFdBQVcsQ0FBQztBQUV0QixTQUFPLEtBQUssT0FBTyxFQUFFLFFBQVEsU0FBVSxNQUFNO0FBQzNDLFFBQUkseUJBQXlCLFFBQVEsSUFBSSxNQUFNLElBQUk7QUFDakQsWUFBTSxJQUFJLFVBQVUscUJBQXFCLE9BQU8sZ0NBQWdDLE1BQU0sY0FBYztBQUFBLElBQ3RHO0FBQUEsRUFDRixDQUFDO0FBR0QsT0FBSyxVQUFnQjtBQUNyQixPQUFLLE1BQWdCO0FBQ3JCLE9BQUssT0FBZ0IsUUFBUSxNQUFNLEtBQWM7QUFDakQsT0FBSyxVQUFnQixRQUFRLFNBQVMsS0FBVyxXQUFZO0FBQUUsV0FBTztBQUFBLEVBQU07QUFDNUUsT0FBSyxZQUFnQixRQUFRLFdBQVcsS0FBUyxTQUFVLE1BQU07QUFBRSxXQUFPO0FBQUEsRUFBTTtBQUNoRixPQUFLLGFBQWdCLFFBQVEsWUFBWSxLQUFRO0FBQ2pELE9BQUssWUFBZ0IsUUFBUSxXQUFXLEtBQVM7QUFDakQsT0FBSyxZQUFnQixRQUFRLFdBQVcsS0FBUztBQUNqRCxPQUFLLGdCQUFnQixRQUFRLGVBQWUsS0FBSztBQUNqRCxPQUFLLGVBQWdCLFFBQVEsY0FBYyxLQUFNO0FBQ2pELE9BQUssUUFBZ0IsUUFBUSxPQUFPLEtBQWE7QUFDakQsT0FBSyxlQUFnQixvQkFBb0IsUUFBUSxjQUFjLEtBQUssSUFBSTtBQUV4RSxNQUFJLGdCQUFnQixRQUFRLEtBQUssSUFBSSxNQUFNLElBQUk7QUFDN0MsVUFBTSxJQUFJLFVBQVUsbUJBQW1CLEtBQUssT0FBTyx5QkFBeUIsTUFBTSxjQUFjO0FBQUEsRUFDbEc7QUFDRjtBQUVBLElBQUksT0FBTztBQVFYLFNBQVMsWUFBWUMsU0FBUSxNQUFNO0FBQ2pDLE1BQUksU0FBUyxDQUFDO0FBRWQsRUFBQUEsUUFBTyxJQUFJLEVBQUUsUUFBUSxTQUFVLGFBQWE7QUFDMUMsUUFBSSxXQUFXLE9BQU87QUFFdEIsV0FBTyxRQUFRLFNBQVUsY0FBYyxlQUFlO0FBQ3BELFVBQUksYUFBYSxRQUFRLFlBQVksT0FDakMsYUFBYSxTQUFTLFlBQVksUUFDbEMsYUFBYSxVQUFVLFlBQVksT0FBTztBQUU1QyxtQkFBVztBQUFBLE1BQ2I7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPLFFBQVEsSUFBSTtBQUFBLEVBQ3JCLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUFHQSxTQUFTLGFBQTJCO0FBQ2xDLE1BQUksU0FBUztBQUFBLElBQ1AsUUFBUSxDQUFDO0FBQUEsSUFDVCxVQUFVLENBQUM7QUFBQSxJQUNYLFNBQVMsQ0FBQztBQUFBLElBQ1YsVUFBVSxDQUFDO0FBQUEsSUFDWCxPQUFPO0FBQUEsTUFDTCxRQUFRLENBQUM7QUFBQSxNQUNULFVBQVUsQ0FBQztBQUFBLE1BQ1gsU0FBUyxDQUFDO0FBQUEsTUFDVixVQUFVLENBQUM7QUFBQSxJQUNiO0FBQUEsRUFDRixHQUFHLE9BQU87QUFFZCxXQUFTLFlBQVlDLE9BQU07QUFDekIsUUFBSUEsTUFBSyxPQUFPO0FBQ2QsYUFBTyxNQUFNQSxNQUFLLElBQUksRUFBRSxLQUFLQSxLQUFJO0FBQ2pDLGFBQU8sTUFBTSxVQUFVLEVBQUUsS0FBS0EsS0FBSTtBQUFBLElBQ3BDLE9BQU87QUFDTCxhQUFPQSxNQUFLLElBQUksRUFBRUEsTUFBSyxHQUFHLElBQUksT0FBTyxVQUFVLEVBQUVBLE1BQUssR0FBRyxJQUFJQTtBQUFBLElBQy9EO0FBQUEsRUFDRjtBQUVBLE9BQUssUUFBUSxHQUFHLFNBQVMsVUFBVSxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUc7QUFDckUsY0FBVSxLQUFLLEVBQUUsUUFBUSxXQUFXO0FBQUEsRUFDdEM7QUFDQSxTQUFPO0FBQ1Q7QUFHQSxTQUFTLFNBQVMsWUFBWTtBQUM1QixTQUFPLEtBQUssT0FBTyxVQUFVO0FBQy9CO0FBR0EsU0FBUyxVQUFVLFNBQVMsU0FBU0MsUUFBTyxZQUFZO0FBQ3RELE1BQUksV0FBVyxDQUFDO0FBQ2hCLE1BQUksV0FBVyxDQUFDO0FBRWhCLE1BQUksc0JBQXNCLE1BQU07QUFFOUIsYUFBUyxLQUFLLFVBQVU7QUFBQSxFQUUxQixXQUFXLE1BQU0sUUFBUSxVQUFVLEdBQUc7QUFFcEMsZUFBVyxTQUFTLE9BQU8sVUFBVTtBQUFBLEVBRXZDLFdBQVcsZUFBZSxNQUFNLFFBQVEsV0FBVyxRQUFRLEtBQUssTUFBTSxRQUFRLFdBQVcsUUFBUSxJQUFJO0FBRW5HLFFBQUksV0FBVyxTQUFVLFlBQVcsU0FBUyxPQUFPLFdBQVcsUUFBUTtBQUN2RSxRQUFJLFdBQVcsU0FBVSxZQUFXLFNBQVMsT0FBTyxXQUFXLFFBQVE7QUFBQSxFQUV6RSxPQUFPO0FBQ0wsVUFBTSxJQUFJLFVBQVUsa0hBQzZDO0FBQUEsRUFDbkU7QUFFQSxXQUFTLFFBQVEsU0FBVSxRQUFRO0FBQ2pDLFFBQUksRUFBRSxrQkFBa0IsT0FBTztBQUM3QixZQUFNLElBQUksVUFBVSxvRkFBb0Y7QUFBQSxJQUMxRztBQUVBLFFBQUksT0FBTyxZQUFZLE9BQU8sYUFBYSxVQUFVO0FBQ25ELFlBQU0sSUFBSSxVQUFVLGlIQUFpSDtBQUFBLElBQ3ZJO0FBRUEsUUFBSSxPQUFPLE9BQU87QUFDaEIsWUFBTSxJQUFJLFVBQVUsb0dBQW9HO0FBQUEsSUFDMUg7QUFBQSxFQUNGLENBQUM7QUFFRCxXQUFTLFFBQVEsU0FBVSxRQUFRO0FBQ2pDLFFBQUksRUFBRSxrQkFBa0IsT0FBTztBQUM3QixZQUFNLElBQUksVUFBVSxvRkFBb0Y7QUFBQSxJQUMxRztBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksU0FBUyxPQUFPLE9BQU8sU0FBUyxTQUFTO0FBRTdDLFNBQU8sWUFBWSxLQUFLLFlBQVksQ0FBQyxHQUFHLE9BQU8sUUFBUTtBQUN2RCxTQUFPLFlBQVksS0FBSyxZQUFZLENBQUMsR0FBRyxPQUFPLFFBQVE7QUFFdkQsU0FBTyxtQkFBbUIsWUFBWSxRQUFRLFVBQVU7QUFDeEQsU0FBTyxtQkFBbUIsWUFBWSxRQUFRLFVBQVU7QUFDeEQsU0FBTyxrQkFBbUIsV0FBVyxPQUFPLGtCQUFrQixPQUFPLGdCQUFnQjtBQUVyRixTQUFPO0FBQ1Q7QUFHQSxJQUFJLFNBQVM7QUFFYixJQUFJLE1BQU0sSUFBSSxLQUFLLHlCQUF5QjtBQUFBLEVBQzFDLE1BQU07QUFBQSxFQUNOLFdBQVcsU0FBVSxNQUFNO0FBQUUsV0FBTyxTQUFTLE9BQU8sT0FBTztBQUFBLEVBQUk7QUFDakUsQ0FBQztBQUVELElBQUksTUFBTSxJQUFJLEtBQUsseUJBQXlCO0FBQUEsRUFDMUMsTUFBTTtBQUFBLEVBQ04sV0FBVyxTQUFVLE1BQU07QUFBRSxXQUFPLFNBQVMsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUFHO0FBQ2pFLENBQUM7QUFFRCxJQUFJLE1BQU0sSUFBSSxLQUFLLHlCQUF5QjtBQUFBLEVBQzFDLE1BQU07QUFBQSxFQUNOLFdBQVcsU0FBVSxNQUFNO0FBQUUsV0FBTyxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFBRztBQUNqRSxDQUFDO0FBRUQsSUFBSSxXQUFXLElBQUksT0FBTztBQUFBLEVBQ3hCLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLE1BQU07QUFDN0IsTUFBSSxTQUFTLEtBQU0sUUFBTztBQUUxQixNQUFJLE1BQU0sS0FBSztBQUVmLFNBQVEsUUFBUSxLQUFLLFNBQVMsT0FDdEIsUUFBUSxNQUFNLFNBQVMsVUFBVSxTQUFTLFVBQVUsU0FBUztBQUN2RTtBQUVBLFNBQVMsb0JBQW9CO0FBQzNCLFNBQU87QUFDVDtBQUVBLFNBQVMsT0FBTyxRQUFRO0FBQ3RCLFNBQU8sV0FBVztBQUNwQjtBQUVBLElBQUksUUFBUSxJQUFJLEtBQUssMEJBQTBCO0FBQUEsRUFDN0MsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLElBQ1QsV0FBVyxXQUFZO0FBQUUsYUFBTztBQUFBLElBQVE7QUFBQSxJQUN4QyxXQUFXLFdBQVk7QUFBRSxhQUFPO0FBQUEsSUFBUTtBQUFBLElBQ3hDLFdBQVcsV0FBWTtBQUFFLGFBQU87QUFBQSxJQUFRO0FBQUEsSUFDeEMsV0FBVyxXQUFZO0FBQUUsYUFBTztBQUFBLElBQVE7QUFBQSxJQUN4QyxPQUFXLFdBQVk7QUFBRSxhQUFPO0FBQUEsSUFBUTtBQUFBLEVBQzFDO0FBQUEsRUFDQSxjQUFjO0FBQ2hCLENBQUM7QUFFRCxTQUFTLG1CQUFtQixNQUFNO0FBQ2hDLE1BQUksU0FBUyxLQUFNLFFBQU87QUFFMUIsTUFBSSxNQUFNLEtBQUs7QUFFZixTQUFRLFFBQVEsTUFBTSxTQUFTLFVBQVUsU0FBUyxVQUFVLFNBQVMsV0FDN0QsUUFBUSxNQUFNLFNBQVMsV0FBVyxTQUFTLFdBQVcsU0FBUztBQUN6RTtBQUVBLFNBQVMscUJBQXFCLE1BQU07QUFDbEMsU0FBTyxTQUFTLFVBQ1QsU0FBUyxVQUNULFNBQVM7QUFDbEI7QUFFQSxTQUFTLFVBQVUsUUFBUTtBQUN6QixTQUFPLE9BQU8sVUFBVSxTQUFTLEtBQUssTUFBTSxNQUFNO0FBQ3BEO0FBRUEsSUFBSSxPQUFPLElBQUksS0FBSywwQkFBMEI7QUFBQSxFQUM1QyxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsSUFDVCxXQUFXLFNBQVUsUUFBUTtBQUFFLGFBQU8sU0FBUyxTQUFTO0FBQUEsSUFBUztBQUFBLElBQ2pFLFdBQVcsU0FBVSxRQUFRO0FBQUUsYUFBTyxTQUFTLFNBQVM7QUFBQSxJQUFTO0FBQUEsSUFDakUsV0FBVyxTQUFVLFFBQVE7QUFBRSxhQUFPLFNBQVMsU0FBUztBQUFBLElBQVM7QUFBQSxFQUNuRTtBQUFBLEVBQ0EsY0FBYztBQUNoQixDQUFDO0FBRUQsU0FBUyxVQUFVLEdBQUc7QUFDcEIsU0FBUyxNQUFlLEtBQU8sS0FBSyxNQUMzQixNQUFlLEtBQU8sS0FBSyxNQUMzQixNQUFlLEtBQU8sS0FBSztBQUN0QztBQUVBLFNBQVMsVUFBVSxHQUFHO0FBQ3BCLFNBQVMsTUFBZSxLQUFPLEtBQUs7QUFDdEM7QUFFQSxTQUFTLFVBQVUsR0FBRztBQUNwQixTQUFTLE1BQWUsS0FBTyxLQUFLO0FBQ3RDO0FBRUEsU0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxNQUFJLFNBQVMsS0FBTSxRQUFPO0FBRTFCLE1BQUksTUFBTSxLQUFLLFFBQ1gsUUFBUSxHQUNSLFlBQVksT0FDWjtBQUVKLE1BQUksQ0FBQyxJQUFLLFFBQU87QUFFakIsT0FBSyxLQUFLLEtBQUs7QUFHZixNQUFJLE9BQU8sT0FBTyxPQUFPLEtBQUs7QUFDNUIsU0FBSyxLQUFLLEVBQUUsS0FBSztBQUFBLEVBQ25CO0FBRUEsTUFBSSxPQUFPLEtBQUs7QUFFZCxRQUFJLFFBQVEsTUFBTSxJQUFLLFFBQU87QUFDOUIsU0FBSyxLQUFLLEVBQUUsS0FBSztBQUlqQixRQUFJLE9BQU8sS0FBSztBQUVkO0FBRUEsYUFBTyxRQUFRLEtBQUssU0FBUztBQUMzQixhQUFLLEtBQUssS0FBSztBQUNmLFlBQUksT0FBTyxJQUFLO0FBQ2hCLFlBQUksT0FBTyxPQUFPLE9BQU8sSUFBSyxRQUFPO0FBQ3JDLG9CQUFZO0FBQUEsTUFDZDtBQUNBLGFBQU8sYUFBYSxPQUFPO0FBQUEsSUFDN0I7QUFHQSxRQUFJLE9BQU8sS0FBSztBQUVkO0FBRUEsYUFBTyxRQUFRLEtBQUssU0FBUztBQUMzQixhQUFLLEtBQUssS0FBSztBQUNmLFlBQUksT0FBTyxJQUFLO0FBQ2hCLFlBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxLQUFLLENBQUMsRUFBRyxRQUFPO0FBQy9DLG9CQUFZO0FBQUEsTUFDZDtBQUNBLGFBQU8sYUFBYSxPQUFPO0FBQUEsSUFDN0I7QUFHQSxRQUFJLE9BQU8sS0FBSztBQUVkO0FBRUEsYUFBTyxRQUFRLEtBQUssU0FBUztBQUMzQixhQUFLLEtBQUssS0FBSztBQUNmLFlBQUksT0FBTyxJQUFLO0FBQ2hCLFlBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxLQUFLLENBQUMsRUFBRyxRQUFPO0FBQy9DLG9CQUFZO0FBQUEsTUFDZDtBQUNBLGFBQU8sYUFBYSxPQUFPO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBS0EsTUFBSSxPQUFPLElBQUssUUFBTztBQUV2QixTQUFPLFFBQVEsS0FBSyxTQUFTO0FBQzNCLFNBQUssS0FBSyxLQUFLO0FBQ2YsUUFBSSxPQUFPLElBQUs7QUFDaEIsUUFBSSxDQUFDLFVBQVUsS0FBSyxXQUFXLEtBQUssQ0FBQyxHQUFHO0FBQ3RDLGFBQU87QUFBQSxJQUNUO0FBQ0EsZ0JBQVk7QUFBQSxFQUNkO0FBR0EsTUFBSSxDQUFDLGFBQWEsT0FBTyxJQUFLLFFBQU87QUFFckMsU0FBTztBQUNUO0FBRUEsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxNQUFJLFFBQVEsTUFBTSxPQUFPLEdBQUc7QUFFNUIsTUFBSSxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUk7QUFDN0IsWUFBUSxNQUFNLFFBQVEsTUFBTSxFQUFFO0FBQUEsRUFDaEM7QUFFQSxPQUFLLE1BQU0sQ0FBQztBQUVaLE1BQUksT0FBTyxPQUFPLE9BQU8sS0FBSztBQUM1QixRQUFJLE9BQU8sSUFBSyxRQUFPO0FBQ3ZCLFlBQVEsTUFBTSxNQUFNLENBQUM7QUFDckIsU0FBSyxNQUFNLENBQUM7QUFBQSxFQUNkO0FBRUEsTUFBSSxVQUFVLElBQUssUUFBTztBQUUxQixNQUFJLE9BQU8sS0FBSztBQUNkLFFBQUksTUFBTSxDQUFDLE1BQU0sSUFBSyxRQUFPLE9BQU8sU0FBUyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDOUQsUUFBSSxNQUFNLENBQUMsTUFBTSxJQUFLLFFBQU8sT0FBTyxTQUFTLE1BQU0sTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUMvRCxRQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUssUUFBTyxPQUFPLFNBQVMsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQUEsRUFDaEU7QUFFQSxTQUFPLE9BQU8sU0FBUyxPQUFPLEVBQUU7QUFDbEM7QUFFQSxTQUFTLFVBQVUsUUFBUTtBQUN6QixTQUFRLE9BQU8sVUFBVSxTQUFTLEtBQUssTUFBTSxNQUFPLHNCQUM1QyxTQUFTLE1BQU0sS0FBSyxDQUFDLE9BQU8sZUFBZSxNQUFNO0FBQzNEO0FBRUEsSUFBSSxNQUFNLElBQUksS0FBSyx5QkFBeUI7QUFBQSxFQUMxQyxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsSUFDVCxRQUFhLFNBQVUsS0FBSztBQUFFLGFBQU8sT0FBTyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxRQUFRLElBQUksU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBRztBQUFBLElBQzNHLE9BQWEsU0FBVSxLQUFLO0FBQUUsYUFBTyxPQUFPLElBQUksT0FBUSxJQUFJLFNBQVMsQ0FBQyxJQUFJLFFBQVMsSUFBSSxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUM7QUFBQSxJQUFHO0FBQUEsSUFDN0csU0FBYSxTQUFVLEtBQUs7QUFBRSxhQUFPLElBQUksU0FBUyxFQUFFO0FBQUEsSUFBRztBQUFBO0FBQUEsSUFFdkQsYUFBYSxTQUFVLEtBQUs7QUFBRSxhQUFPLE9BQU8sSUFBSSxPQUFPLElBQUksU0FBUyxFQUFFLEVBQUUsWUFBWSxJQUFLLFFBQVEsSUFBSSxTQUFTLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBRztBQUFBLEVBQzVJO0FBQUEsRUFDQSxjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsSUFDWixRQUFhLENBQUUsR0FBSSxLQUFNO0FBQUEsSUFDekIsT0FBYSxDQUFFLEdBQUksS0FBTTtBQUFBLElBQ3pCLFNBQWEsQ0FBRSxJQUFJLEtBQU07QUFBQSxJQUN6QixhQUFhLENBQUUsSUFBSSxLQUFNO0FBQUEsRUFDM0I7QUFDRixDQUFDO0FBRUQsSUFBSSxxQkFBcUIsSUFBSTtBQUFBO0FBQUEsRUFFM0I7QUFPdUI7QUFFekIsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixNQUFJLFNBQVMsS0FBTSxRQUFPO0FBRTFCLE1BQUksQ0FBQyxtQkFBbUIsS0FBSyxJQUFJO0FBQUE7QUFBQSxFQUc3QixLQUFLLEtBQUssU0FBUyxDQUFDLE1BQU0sS0FBSztBQUNqQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsbUJBQW1CLE1BQU07QUFDaEMsTUFBSSxPQUFPO0FBRVgsVUFBUyxLQUFLLFFBQVEsTUFBTSxFQUFFLEVBQUUsWUFBWTtBQUM1QyxTQUFTLE1BQU0sQ0FBQyxNQUFNLE1BQU0sS0FBSztBQUVqQyxNQUFJLEtBQUssUUFBUSxNQUFNLENBQUMsQ0FBQyxLQUFLLEdBQUc7QUFDL0IsWUFBUSxNQUFNLE1BQU0sQ0FBQztBQUFBLEVBQ3ZCO0FBRUEsTUFBSSxVQUFVLFFBQVE7QUFDcEIsV0FBUSxTQUFTLElBQUssT0FBTyxvQkFBb0IsT0FBTztBQUFBLEVBRTFELFdBQVcsVUFBVSxRQUFRO0FBQzNCLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTyxPQUFPLFdBQVcsT0FBTyxFQUFFO0FBQ3BDO0FBR0EsSUFBSSx5QkFBeUI7QUFFN0IsU0FBUyxtQkFBbUIsUUFBUSxPQUFPO0FBQ3pDLE1BQUk7QUFFSixNQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLFlBQVEsT0FBTztBQUFBLE1BQ2IsS0FBSztBQUFhLGVBQU87QUFBQSxNQUN6QixLQUFLO0FBQWEsZUFBTztBQUFBLE1BQ3pCLEtBQUs7QUFBYSxlQUFPO0FBQUEsSUFDM0I7QUFBQSxFQUNGLFdBQVcsT0FBTyxzQkFBc0IsUUFBUTtBQUM5QyxZQUFRLE9BQU87QUFBQSxNQUNiLEtBQUs7QUFBYSxlQUFPO0FBQUEsTUFDekIsS0FBSztBQUFhLGVBQU87QUFBQSxNQUN6QixLQUFLO0FBQWEsZUFBTztBQUFBLElBQzNCO0FBQUEsRUFDRixXQUFXLE9BQU8sc0JBQXNCLFFBQVE7QUFDOUMsWUFBUSxPQUFPO0FBQUEsTUFDYixLQUFLO0FBQWEsZUFBTztBQUFBLE1BQ3pCLEtBQUs7QUFBYSxlQUFPO0FBQUEsTUFDekIsS0FBSztBQUFhLGVBQU87QUFBQSxJQUMzQjtBQUFBLEVBQ0YsV0FBVyxPQUFPLGVBQWUsTUFBTSxHQUFHO0FBQ3hDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPLFNBQVMsRUFBRTtBQUt4QixTQUFPLHVCQUF1QixLQUFLLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUk7QUFDckU7QUFFQSxTQUFTLFFBQVEsUUFBUTtBQUN2QixTQUFRLE9BQU8sVUFBVSxTQUFTLEtBQUssTUFBTSxNQUFNLHNCQUMzQyxTQUFTLE1BQU0sS0FBSyxPQUFPLGVBQWUsTUFBTTtBQUMxRDtBQUVBLElBQUksUUFBUSxJQUFJLEtBQUssMkJBQTJCO0FBQUEsRUFDOUMsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsY0FBYztBQUNoQixDQUFDO0FBRUQsSUFBSSxPQUFPLFNBQVMsT0FBTztBQUFBLEVBQ3pCLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFFRCxJQUFJLE9BQU87QUFFWCxJQUFJLG1CQUFtQixJQUFJO0FBQUEsRUFDekI7QUFFZ0I7QUFFbEIsSUFBSSx3QkFBd0IsSUFBSTtBQUFBLEVBQzlCO0FBU3dCO0FBRTFCLFNBQVMscUJBQXFCLE1BQU07QUFDbEMsTUFBSSxTQUFTLEtBQU0sUUFBTztBQUMxQixNQUFJLGlCQUFpQixLQUFLLElBQUksTUFBTSxLQUFNLFFBQU87QUFDakQsTUFBSSxzQkFBc0IsS0FBSyxJQUFJLE1BQU0sS0FBTSxRQUFPO0FBQ3RELFNBQU87QUFDVDtBQUVBLFNBQVMsdUJBQXVCLE1BQU07QUFDcEMsTUFBSSxPQUFPLE1BQU0sT0FBTyxLQUFLLE1BQU0sUUFBUSxRQUFRLFdBQVcsR0FDMUQsUUFBUSxNQUFNLFNBQVMsV0FBVztBQUV0QyxVQUFRLGlCQUFpQixLQUFLLElBQUk7QUFDbEMsTUFBSSxVQUFVLEtBQU0sU0FBUSxzQkFBc0IsS0FBSyxJQUFJO0FBRTNELE1BQUksVUFBVSxLQUFNLE9BQU0sSUFBSSxNQUFNLG9CQUFvQjtBQUl4RCxTQUFPLENBQUUsTUFBTSxDQUFDO0FBQ2hCLFVBQVEsQ0FBRSxNQUFNLENBQUMsSUFBSztBQUN0QixRQUFNLENBQUUsTUFBTSxDQUFDO0FBRWYsTUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO0FBQ2IsV0FBTyxJQUFJLEtBQUssS0FBSyxJQUFJLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFBQSxFQUM1QztBQUlBLFNBQU8sQ0FBRSxNQUFNLENBQUM7QUFDaEIsV0FBUyxDQUFFLE1BQU0sQ0FBQztBQUNsQixXQUFTLENBQUUsTUFBTSxDQUFDO0FBRWxCLE1BQUksTUFBTSxDQUFDLEdBQUc7QUFDWixlQUFXLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQzlCLFdBQU8sU0FBUyxTQUFTLEdBQUc7QUFDMUIsa0JBQVk7QUFBQSxJQUNkO0FBQ0EsZUFBVyxDQUFDO0FBQUEsRUFDZDtBQUlBLE1BQUksTUFBTSxDQUFDLEdBQUc7QUFDWixjQUFVLENBQUUsTUFBTSxFQUFFO0FBQ3BCLGdCQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUs7QUFDM0IsYUFBUyxVQUFVLEtBQUssYUFBYTtBQUNyQyxRQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUssU0FBUSxDQUFDO0FBQUEsRUFDakM7QUFFQSxTQUFPLElBQUksS0FBSyxLQUFLLElBQUksTUFBTSxPQUFPLEtBQUssTUFBTSxRQUFRLFFBQVEsUUFBUSxDQUFDO0FBRTFFLE1BQUksTUFBTyxNQUFLLFFBQVEsS0FBSyxRQUFRLElBQUksS0FBSztBQUU5QyxTQUFPO0FBQ1Q7QUFFQSxTQUFTLHVCQUF1QixRQUFvQjtBQUNsRCxTQUFPLE9BQU8sWUFBWTtBQUM1QjtBQUVBLElBQUksWUFBWSxJQUFJLEtBQUssK0JBQStCO0FBQUEsRUFDdEQsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUNiLENBQUM7QUFFRCxTQUFTLGlCQUFpQixNQUFNO0FBQzlCLFNBQU8sU0FBUyxRQUFRLFNBQVM7QUFDbkM7QUFFQSxJQUFJLFFBQVEsSUFBSSxLQUFLLDJCQUEyQjtBQUFBLEVBQzlDLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFDWCxDQUFDO0FBU0QsSUFBSSxhQUFhO0FBR2pCLFNBQVMsa0JBQWtCLE1BQU07QUFDL0IsTUFBSSxTQUFTLEtBQU0sUUFBTztBQUUxQixNQUFJLE1BQU0sS0FBSyxTQUFTLEdBQUcsTUFBTSxLQUFLLFFBQVFILE9BQU07QUFHcEQsT0FBSyxNQUFNLEdBQUcsTUFBTSxLQUFLLE9BQU87QUFDOUIsV0FBT0EsS0FBSSxRQUFRLEtBQUssT0FBTyxHQUFHLENBQUM7QUFHbkMsUUFBSSxPQUFPLEdBQUk7QUFHZixRQUFJLE9BQU8sRUFBRyxRQUFPO0FBRXJCLGNBQVU7QUFBQSxFQUNaO0FBR0EsU0FBUSxTQUFTLE1BQU87QUFDMUI7QUFFQSxTQUFTLG9CQUFvQixNQUFNO0FBQ2pDLE1BQUksS0FBSyxVQUNMLFFBQVEsS0FBSyxRQUFRLFlBQVksRUFBRSxHQUNuQyxNQUFNLE1BQU0sUUFDWkEsT0FBTSxZQUNOLE9BQU8sR0FDUCxTQUFTLENBQUM7QUFJZCxPQUFLLE1BQU0sR0FBRyxNQUFNLEtBQUssT0FBTztBQUM5QixRQUFLLE1BQU0sTUFBTSxLQUFNLEtBQUs7QUFDMUIsYUFBTyxLQUFNLFFBQVEsS0FBTSxHQUFJO0FBQy9CLGFBQU8sS0FBTSxRQUFRLElBQUssR0FBSTtBQUM5QixhQUFPLEtBQUssT0FBTyxHQUFJO0FBQUEsSUFDekI7QUFFQSxXQUFRLFFBQVEsSUFBS0EsS0FBSSxRQUFRLE1BQU0sT0FBTyxHQUFHLENBQUM7QUFBQSxFQUNwRDtBQUlBLGFBQVksTUFBTSxJQUFLO0FBRXZCLE1BQUksYUFBYSxHQUFHO0FBQ2xCLFdBQU8sS0FBTSxRQUFRLEtBQU0sR0FBSTtBQUMvQixXQUFPLEtBQU0sUUFBUSxJQUFLLEdBQUk7QUFDOUIsV0FBTyxLQUFLLE9BQU8sR0FBSTtBQUFBLEVBQ3pCLFdBQVcsYUFBYSxJQUFJO0FBQzFCLFdBQU8sS0FBTSxRQUFRLEtBQU0sR0FBSTtBQUMvQixXQUFPLEtBQU0sUUFBUSxJQUFLLEdBQUk7QUFBQSxFQUNoQyxXQUFXLGFBQWEsSUFBSTtBQUMxQixXQUFPLEtBQU0sUUFBUSxJQUFLLEdBQUk7QUFBQSxFQUNoQztBQUVBLFNBQU8sSUFBSSxXQUFXLE1BQU07QUFDOUI7QUFFQSxTQUFTLG9CQUFvQixRQUFvQjtBQUMvQyxNQUFJLFNBQVMsSUFBSSxPQUFPLEdBQUcsS0FBSyxNQUM1QixNQUFNLE9BQU8sUUFDYkEsT0FBTTtBQUlWLE9BQUssTUFBTSxHQUFHLE1BQU0sS0FBSyxPQUFPO0FBQzlCLFFBQUssTUFBTSxNQUFNLEtBQU0sS0FBSztBQUMxQixnQkFBVUEsS0FBSyxRQUFRLEtBQU0sRUFBSTtBQUNqQyxnQkFBVUEsS0FBSyxRQUFRLEtBQU0sRUFBSTtBQUNqQyxnQkFBVUEsS0FBSyxRQUFRLElBQUssRUFBSTtBQUNoQyxnQkFBVUEsS0FBSSxPQUFPLEVBQUk7QUFBQSxJQUMzQjtBQUVBLFlBQVEsUUFBUSxLQUFLLE9BQU8sR0FBRztBQUFBLEVBQ2pDO0FBSUEsU0FBTyxNQUFNO0FBRWIsTUFBSSxTQUFTLEdBQUc7QUFDZCxjQUFVQSxLQUFLLFFBQVEsS0FBTSxFQUFJO0FBQ2pDLGNBQVVBLEtBQUssUUFBUSxLQUFNLEVBQUk7QUFDakMsY0FBVUEsS0FBSyxRQUFRLElBQUssRUFBSTtBQUNoQyxjQUFVQSxLQUFJLE9BQU8sRUFBSTtBQUFBLEVBQzNCLFdBQVcsU0FBUyxHQUFHO0FBQ3JCLGNBQVVBLEtBQUssUUFBUSxLQUFNLEVBQUk7QUFDakMsY0FBVUEsS0FBSyxRQUFRLElBQUssRUFBSTtBQUNoQyxjQUFVQSxLQUFLLFFBQVEsSUFBSyxFQUFJO0FBQ2hDLGNBQVVBLEtBQUksRUFBRTtBQUFBLEVBQ2xCLFdBQVcsU0FBUyxHQUFHO0FBQ3JCLGNBQVVBLEtBQUssUUFBUSxJQUFLLEVBQUk7QUFDaEMsY0FBVUEsS0FBSyxRQUFRLElBQUssRUFBSTtBQUNoQyxjQUFVQSxLQUFJLEVBQUU7QUFDaEIsY0FBVUEsS0FBSSxFQUFFO0FBQUEsRUFDbEI7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLFNBQVMsS0FBSztBQUNyQixTQUFPLE9BQU8sVUFBVSxTQUFTLEtBQUssR0FBRyxNQUFPO0FBQ2xEO0FBRUEsSUFBSSxTQUFTLElBQUksS0FBSyw0QkFBNEI7QUFBQSxFQUNoRCxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQ2IsQ0FBQztBQUVELElBQUksb0JBQW9CLE9BQU8sVUFBVTtBQUN6QyxJQUFJLGNBQW9CLE9BQU8sVUFBVTtBQUV6QyxTQUFTLGdCQUFnQixNQUFNO0FBQzdCLE1BQUksU0FBUyxLQUFNLFFBQU87QUFFMUIsTUFBSSxhQUFhLENBQUMsR0FBRyxPQUFPLFFBQVEsTUFBTSxTQUFTLFlBQy9DLFNBQVM7QUFFYixPQUFLLFFBQVEsR0FBRyxTQUFTLE9BQU8sUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ2xFLFdBQU8sT0FBTyxLQUFLO0FBQ25CLGlCQUFhO0FBRWIsUUFBSSxZQUFZLEtBQUssSUFBSSxNQUFNLGtCQUFtQixRQUFPO0FBRXpELFNBQUssV0FBVyxNQUFNO0FBQ3BCLFVBQUksa0JBQWtCLEtBQUssTUFBTSxPQUFPLEdBQUc7QUFDekMsWUFBSSxDQUFDLFdBQVksY0FBYTtBQUFBLFlBQ3pCLFFBQU87QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxXQUFZLFFBQU87QUFFeEIsUUFBSSxXQUFXLFFBQVEsT0FBTyxNQUFNLEdBQUksWUFBVyxLQUFLLE9BQU87QUFBQSxRQUMxRCxRQUFPO0FBQUEsRUFDZDtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsa0JBQWtCLE1BQU07QUFDL0IsU0FBTyxTQUFTLE9BQU8sT0FBTyxDQUFDO0FBQ2pDO0FBRUEsSUFBSSxPQUFPLElBQUksS0FBSywwQkFBMEI7QUFBQSxFQUM1QyxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQ2IsQ0FBQztBQUVELElBQUksY0FBYyxPQUFPLFVBQVU7QUFFbkMsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixNQUFJLFNBQVMsS0FBTSxRQUFPO0FBRTFCLE1BQUksT0FBTyxRQUFRLE1BQU0sTUFBTSxRQUMzQixTQUFTO0FBRWIsV0FBUyxJQUFJLE1BQU0sT0FBTyxNQUFNO0FBRWhDLE9BQUssUUFBUSxHQUFHLFNBQVMsT0FBTyxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUc7QUFDbEUsV0FBTyxPQUFPLEtBQUs7QUFFbkIsUUFBSSxZQUFZLEtBQUssSUFBSSxNQUFNLGtCQUFtQixRQUFPO0FBRXpELFdBQU8sT0FBTyxLQUFLLElBQUk7QUFFdkIsUUFBSSxLQUFLLFdBQVcsRUFBRyxRQUFPO0FBRTlCLFdBQU8sS0FBSyxJQUFJLENBQUUsS0FBSyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFFO0FBQUEsRUFDM0M7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLG1CQUFtQixNQUFNO0FBQ2hDLE1BQUksU0FBUyxLQUFNLFFBQU8sQ0FBQztBQUUzQixNQUFJLE9BQU8sUUFBUSxNQUFNLE1BQU0sUUFDM0IsU0FBUztBQUViLFdBQVMsSUFBSSxNQUFNLE9BQU8sTUFBTTtBQUVoQyxPQUFLLFFBQVEsR0FBRyxTQUFTLE9BQU8sUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ2xFLFdBQU8sT0FBTyxLQUFLO0FBRW5CLFdBQU8sT0FBTyxLQUFLLElBQUk7QUFFdkIsV0FBTyxLQUFLLElBQUksQ0FBRSxLQUFLLENBQUMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUU7QUFBQSxFQUMzQztBQUVBLFNBQU87QUFDVDtBQUVBLElBQUksUUFBUSxJQUFJLEtBQUssMkJBQTJCO0FBQUEsRUFDOUMsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsV0FBVztBQUNiLENBQUM7QUFFRCxJQUFJLG9CQUFvQixPQUFPLFVBQVU7QUFFekMsU0FBUyxlQUFlLE1BQU07QUFDNUIsTUFBSSxTQUFTLEtBQU0sUUFBTztBQUUxQixNQUFJLEtBQUssU0FBUztBQUVsQixPQUFLLE9BQU8sUUFBUTtBQUNsQixRQUFJLGtCQUFrQixLQUFLLFFBQVEsR0FBRyxHQUFHO0FBQ3ZDLFVBQUksT0FBTyxHQUFHLE1BQU0sS0FBTSxRQUFPO0FBQUEsSUFDbkM7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxpQkFBaUIsTUFBTTtBQUM5QixTQUFPLFNBQVMsT0FBTyxPQUFPLENBQUM7QUFDakM7QUFFQSxJQUFJLE1BQU0sSUFBSSxLQUFLLHlCQUF5QjtBQUFBLEVBQzFDLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFDYixDQUFDO0FBRUQsSUFBSSxXQUFXLEtBQUssT0FBTztBQUFBLEVBQ3pCLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGLENBQUM7QUFVRCxJQUFJLG9CQUFvQixPQUFPLFVBQVU7QUFHekMsSUFBSSxrQkFBb0I7QUFDeEIsSUFBSSxtQkFBb0I7QUFDeEIsSUFBSSxtQkFBb0I7QUFDeEIsSUFBSSxvQkFBb0I7QUFHeEIsSUFBSSxnQkFBaUI7QUFDckIsSUFBSSxpQkFBaUI7QUFDckIsSUFBSSxnQkFBaUI7QUFHckIsSUFBSSx3QkFBZ0M7QUFDcEMsSUFBSSxnQ0FBZ0M7QUFDcEMsSUFBSSwwQkFBZ0M7QUFDcEMsSUFBSSxxQkFBZ0M7QUFDcEMsSUFBSSxrQkFBZ0M7QUFHcEMsU0FBUyxPQUFPLEtBQUs7QUFBRSxTQUFPLE9BQU8sVUFBVSxTQUFTLEtBQUssR0FBRztBQUFHO0FBRW5FLFNBQVMsT0FBTyxHQUFHO0FBQ2pCLFNBQVEsTUFBTSxNQUFrQixNQUFNO0FBQ3hDO0FBRUEsU0FBUyxlQUFlLEdBQUc7QUFDekIsU0FBUSxNQUFNLEtBQW1CLE1BQU07QUFDekM7QUFFQSxTQUFTLGFBQWEsR0FBRztBQUN2QixTQUFRLE1BQU0sS0FDTixNQUFNLE1BQ04sTUFBTSxNQUNOLE1BQU07QUFDaEI7QUFFQSxTQUFTLGtCQUFrQixHQUFHO0FBQzVCLFNBQU8sTUFBTSxNQUNOLE1BQU0sTUFDTixNQUFNLE1BQ04sTUFBTSxPQUNOLE1BQU07QUFDZjtBQUVBLFNBQVMsWUFBWSxHQUFHO0FBQ3RCLE1BQUk7QUFFSixNQUFLLE1BQWUsS0FBTyxLQUFLLElBQWM7QUFDNUMsV0FBTyxJQUFJO0FBQUEsRUFDYjtBQUdBLE9BQUssSUFBSTtBQUVULE1BQUssTUFBZSxNQUFRLE1BQU0sS0FBYztBQUM5QyxXQUFPLEtBQUssS0FBTztBQUFBLEVBQ3JCO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxjQUFjLEdBQUc7QUFDeEIsTUFBSSxNQUFNLEtBQWE7QUFBRSxXQUFPO0FBQUEsRUFBRztBQUNuQyxNQUFJLE1BQU0sS0FBYTtBQUFFLFdBQU87QUFBQSxFQUFHO0FBQ25DLE1BQUksTUFBTSxJQUFhO0FBQUUsV0FBTztBQUFBLEVBQUc7QUFDbkMsU0FBTztBQUNUO0FBRUEsU0FBUyxnQkFBZ0IsR0FBRztBQUMxQixNQUFLLE1BQWUsS0FBTyxLQUFLLElBQWM7QUFDNUMsV0FBTyxJQUFJO0FBQUEsRUFDYjtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMscUJBQXFCLEdBQUc7QUFFL0IsU0FBUSxNQUFNLEtBQWUsT0FDdEIsTUFBTSxLQUFlLFNBQ3JCLE1BQU0sS0FBZSxPQUNyQixNQUFNLE1BQWUsTUFDckIsTUFBTSxJQUFpQixNQUN2QixNQUFNLE1BQWUsT0FDckIsTUFBTSxNQUFlLE9BQ3JCLE1BQU0sTUFBZSxPQUNyQixNQUFNLE1BQWUsT0FDckIsTUFBTSxNQUFlLFNBQ3JCLE1BQU0sS0FBbUIsTUFDekIsTUFBTSxLQUFlLE1BQ3JCLE1BQU0sS0FBZSxNQUNyQixNQUFNLEtBQWUsT0FDckIsTUFBTSxLQUFlLFNBQ3JCLE1BQU0sS0FBZSxTQUNyQixNQUFNLEtBQWUsV0FDckIsTUFBTSxLQUFlLFdBQVc7QUFDekM7QUFFQSxTQUFTLGtCQUFrQixHQUFHO0FBQzVCLE1BQUksS0FBSyxPQUFRO0FBQ2YsV0FBTyxPQUFPLGFBQWEsQ0FBQztBQUFBLEVBQzlCO0FBR0EsU0FBTyxPQUFPO0FBQUEsS0FDVixJQUFJLFNBQWEsTUFBTTtBQUFBLEtBQ3ZCLElBQUksUUFBWSxRQUFVO0FBQUEsRUFDOUI7QUFDRjtBQUlBLFNBQVMsWUFBWSxRQUFRLEtBQUssT0FBTztBQUV2QyxNQUFJLFFBQVEsYUFBYTtBQUN2QixXQUFPLGVBQWUsUUFBUSxLQUFLO0FBQUEsTUFDakMsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILE9BQU87QUFDTCxXQUFPLEdBQUcsSUFBSTtBQUFBLEVBQ2hCO0FBQ0Y7QUFFQSxJQUFJLG9CQUFvQixJQUFJLE1BQU0sR0FBRztBQUNyQyxJQUFJLGtCQUFrQixJQUFJLE1BQU0sR0FBRztBQUNuQyxLQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSztBQUM1QixvQkFBa0IsQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksSUFBSTtBQUNyRCxrQkFBZ0IsQ0FBQyxJQUFJLHFCQUFxQixDQUFDO0FBQzdDO0FBSFM7QUFNVCxTQUFTLFFBQVEsT0FBTyxTQUFTO0FBQy9CLE9BQUssUUFBUTtBQUViLE9BQUssV0FBWSxRQUFRLFVBQVUsS0FBTTtBQUN6QyxPQUFLLFNBQVksUUFBUSxRQUFRLEtBQVE7QUFDekMsT0FBSyxZQUFZLFFBQVEsV0FBVyxLQUFLO0FBR3pDLE9BQUssU0FBWSxRQUFRLFFBQVEsS0FBUTtBQUV6QyxPQUFLLE9BQVksUUFBUSxNQUFNLEtBQVU7QUFDekMsT0FBSyxXQUFZLFFBQVEsVUFBVSxLQUFNO0FBRXpDLE9BQUssZ0JBQWdCLEtBQUssT0FBTztBQUNqQyxPQUFLLFVBQWdCLEtBQUssT0FBTztBQUVqQyxPQUFLLFNBQWEsTUFBTTtBQUN4QixPQUFLLFdBQWE7QUFDbEIsT0FBSyxPQUFhO0FBQ2xCLE9BQUssWUFBYTtBQUNsQixPQUFLLGFBQWE7QUFJbEIsT0FBSyxpQkFBaUI7QUFFdEIsT0FBSyxZQUFZLENBQUM7QUFZcEI7QUFHQSxTQUFTLGNBQWMsT0FBTyxTQUFTO0FBQ3JDLE1BQUksT0FBTztBQUFBLElBQ1QsTUFBVSxNQUFNO0FBQUEsSUFDaEIsUUFBVSxNQUFNLE1BQU0sTUFBTSxHQUFHLEVBQUU7QUFBQTtBQUFBLElBQ2pDLFVBQVUsTUFBTTtBQUFBLElBQ2hCLE1BQVUsTUFBTTtBQUFBLElBQ2hCLFFBQVUsTUFBTSxXQUFXLE1BQU07QUFBQSxFQUNuQztBQUVBLE9BQUssVUFBVSxRQUFRLElBQUk7QUFFM0IsU0FBTyxJQUFJLFVBQVUsU0FBUyxJQUFJO0FBQ3BDO0FBRUEsU0FBUyxXQUFXLE9BQU8sU0FBUztBQUNsQyxRQUFNLGNBQWMsT0FBTyxPQUFPO0FBQ3BDO0FBRUEsU0FBUyxhQUFhLE9BQU8sU0FBUztBQUNwQyxNQUFJLE1BQU0sV0FBVztBQUNuQixVQUFNLFVBQVUsS0FBSyxNQUFNLGNBQWMsT0FBTyxPQUFPLENBQUM7QUFBQSxFQUMxRDtBQUNGO0FBR0EsSUFBSSxvQkFBb0I7QUFBQSxFQUV0QixNQUFNLFNBQVMsb0JBQW9CLE9BQU8sTUFBTSxNQUFNO0FBRXBELFFBQUksT0FBTyxPQUFPO0FBRWxCLFFBQUksTUFBTSxZQUFZLE1BQU07QUFDMUIsaUJBQVcsT0FBTyxnQ0FBZ0M7QUFBQSxJQUNwRDtBQUVBLFFBQUksS0FBSyxXQUFXLEdBQUc7QUFDckIsaUJBQVcsT0FBTyw2Q0FBNkM7QUFBQSxJQUNqRTtBQUVBLFlBQVEsdUJBQXVCLEtBQUssS0FBSyxDQUFDLENBQUM7QUFFM0MsUUFBSSxVQUFVLE1BQU07QUFDbEIsaUJBQVcsT0FBTywyQ0FBMkM7QUFBQSxJQUMvRDtBQUVBLFlBQVEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQzdCLFlBQVEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBRTdCLFFBQUksVUFBVSxHQUFHO0FBQ2YsaUJBQVcsT0FBTywyQ0FBMkM7QUFBQSxJQUMvRDtBQUVBLFVBQU0sVUFBVSxLQUFLLENBQUM7QUFDdEIsVUFBTSxrQkFBbUIsUUFBUTtBQUVqQyxRQUFJLFVBQVUsS0FBSyxVQUFVLEdBQUc7QUFDOUIsbUJBQWEsT0FBTywwQ0FBMEM7QUFBQSxJQUNoRTtBQUFBLEVBQ0Y7QUFBQSxFQUVBLEtBQUssU0FBUyxtQkFBbUIsT0FBTyxNQUFNLE1BQU07QUFFbEQsUUFBSSxRQUFRO0FBRVosUUFBSSxLQUFLLFdBQVcsR0FBRztBQUNyQixpQkFBVyxPQUFPLDZDQUE2QztBQUFBLElBQ2pFO0FBRUEsYUFBUyxLQUFLLENBQUM7QUFDZixhQUFTLEtBQUssQ0FBQztBQUVmLFFBQUksQ0FBQyxtQkFBbUIsS0FBSyxNQUFNLEdBQUc7QUFDcEMsaUJBQVcsT0FBTyw2REFBNkQ7QUFBQSxJQUNqRjtBQUVBLFFBQUksa0JBQWtCLEtBQUssTUFBTSxRQUFRLE1BQU0sR0FBRztBQUNoRCxpQkFBVyxPQUFPLGdEQUFnRCxTQUFTLGNBQWM7QUFBQSxJQUMzRjtBQUVBLFFBQUksQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLEdBQUc7QUFDakMsaUJBQVcsT0FBTyw4REFBOEQ7QUFBQSxJQUNsRjtBQUVBLFFBQUk7QUFDRixlQUFTLG1CQUFtQixNQUFNO0FBQUEsSUFDcEMsU0FBUyxLQUFLO0FBQ1osaUJBQVcsT0FBTyw4QkFBOEIsTUFBTTtBQUFBLElBQ3hEO0FBRUEsVUFBTSxPQUFPLE1BQU0sSUFBSTtBQUFBLEVBQ3pCO0FBQ0Y7QUFHQSxTQUFTLGVBQWUsT0FBTyxPQUFPLEtBQUssV0FBVztBQUNwRCxNQUFJLFdBQVcsU0FBUyxZQUFZO0FBRXBDLE1BQUksUUFBUSxLQUFLO0FBQ2YsY0FBVSxNQUFNLE1BQU0sTUFBTSxPQUFPLEdBQUc7QUFFdEMsUUFBSSxXQUFXO0FBQ2IsV0FBSyxZQUFZLEdBQUcsVUFBVSxRQUFRLFFBQVEsWUFBWSxTQUFTLGFBQWEsR0FBRztBQUNqRixxQkFBYSxRQUFRLFdBQVcsU0FBUztBQUN6QyxZQUFJLEVBQUUsZUFBZSxLQUNkLE1BQVEsY0FBYyxjQUFjLFVBQVk7QUFDckQscUJBQVcsT0FBTywrQkFBK0I7QUFBQSxRQUNuRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFdBQVcsc0JBQXNCLEtBQUssT0FBTyxHQUFHO0FBQzlDLGlCQUFXLE9BQU8sOENBQThDO0FBQUEsSUFDbEU7QUFFQSxVQUFNLFVBQVU7QUFBQSxFQUNsQjtBQUNGO0FBRUEsU0FBUyxjQUFjLE9BQU8sYUFBYSxRQUFRLGlCQUFpQjtBQUNsRSxNQUFJLFlBQVksS0FBSyxPQUFPO0FBRTVCLE1BQUksQ0FBQyxPQUFPLFNBQVMsTUFBTSxHQUFHO0FBQzVCLGVBQVcsT0FBTyxtRUFBbUU7QUFBQSxFQUN2RjtBQUVBLGVBQWEsT0FBTyxLQUFLLE1BQU07QUFFL0IsT0FBSyxRQUFRLEdBQUcsV0FBVyxXQUFXLFFBQVEsUUFBUSxVQUFVLFNBQVMsR0FBRztBQUMxRSxVQUFNLFdBQVcsS0FBSztBQUV0QixRQUFJLENBQUMsa0JBQWtCLEtBQUssYUFBYSxHQUFHLEdBQUc7QUFDN0Msa0JBQVksYUFBYSxLQUFLLE9BQU8sR0FBRyxDQUFDO0FBQ3pDLHNCQUFnQixHQUFHLElBQUk7QUFBQSxJQUN6QjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsaUJBQWlCLE9BQU8sU0FBUyxpQkFBaUIsUUFBUSxTQUFTLFdBQzFFLFdBQVcsZ0JBQWdCLFVBQVU7QUFFckMsTUFBSSxPQUFPO0FBS1gsTUFBSSxNQUFNLFFBQVEsT0FBTyxHQUFHO0FBQzFCLGNBQVUsTUFBTSxVQUFVLE1BQU0sS0FBSyxPQUFPO0FBRTVDLFNBQUssUUFBUSxHQUFHLFdBQVcsUUFBUSxRQUFRLFFBQVEsVUFBVSxTQUFTLEdBQUc7QUFDdkUsVUFBSSxNQUFNLFFBQVEsUUFBUSxLQUFLLENBQUMsR0FBRztBQUNqQyxtQkFBVyxPQUFPLDZDQUE2QztBQUFBLE1BQ2pFO0FBRUEsVUFBSSxPQUFPLFlBQVksWUFBWSxPQUFPLFFBQVEsS0FBSyxDQUFDLE1BQU0sbUJBQW1CO0FBQy9FLGdCQUFRLEtBQUssSUFBSTtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFLQSxNQUFJLE9BQU8sWUFBWSxZQUFZLE9BQU8sT0FBTyxNQUFNLG1CQUFtQjtBQUN4RSxjQUFVO0FBQUEsRUFDWjtBQUdBLFlBQVUsT0FBTyxPQUFPO0FBRXhCLE1BQUksWUFBWSxNQUFNO0FBQ3BCLGNBQVUsQ0FBQztBQUFBLEVBQ2I7QUFFQSxNQUFJLFdBQVcsMkJBQTJCO0FBQ3hDLFFBQUksTUFBTSxRQUFRLFNBQVMsR0FBRztBQUM1QixXQUFLLFFBQVEsR0FBRyxXQUFXLFVBQVUsUUFBUSxRQUFRLFVBQVUsU0FBUyxHQUFHO0FBQ3pFLHNCQUFjLE9BQU8sU0FBUyxVQUFVLEtBQUssR0FBRyxlQUFlO0FBQUEsTUFDakU7QUFBQSxJQUNGLE9BQU87QUFDTCxvQkFBYyxPQUFPLFNBQVMsV0FBVyxlQUFlO0FBQUEsSUFDMUQ7QUFBQSxFQUNGLE9BQU87QUFDTCxRQUFJLENBQUMsTUFBTSxRQUNQLENBQUMsa0JBQWtCLEtBQUssaUJBQWlCLE9BQU8sS0FDaEQsa0JBQWtCLEtBQUssU0FBUyxPQUFPLEdBQUc7QUFDNUMsWUFBTSxPQUFPLGFBQWEsTUFBTTtBQUNoQyxZQUFNLFlBQVksa0JBQWtCLE1BQU07QUFDMUMsWUFBTSxXQUFXLFlBQVksTUFBTTtBQUNuQyxpQkFBVyxPQUFPLHdCQUF3QjtBQUFBLElBQzVDO0FBRUEsZ0JBQVksU0FBUyxTQUFTLFNBQVM7QUFDdkMsV0FBTyxnQkFBZ0IsT0FBTztBQUFBLEVBQ2hDO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxjQUFjLE9BQU87QUFDNUIsTUFBSTtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLE1BQUksT0FBTyxJQUFjO0FBQ3ZCLFVBQU07QUFBQSxFQUNSLFdBQVcsT0FBTyxJQUFjO0FBQzlCLFVBQU07QUFDTixRQUFJLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUSxNQUFNLElBQWM7QUFDM0QsWUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGLE9BQU87QUFDTCxlQUFXLE9BQU8sMEJBQTBCO0FBQUEsRUFDOUM7QUFFQSxRQUFNLFFBQVE7QUFDZCxRQUFNLFlBQVksTUFBTTtBQUN4QixRQUFNLGlCQUFpQjtBQUN6QjtBQUVBLFNBQVMsb0JBQW9CLE9BQU8sZUFBZSxhQUFhO0FBQzlELE1BQUksYUFBYSxHQUNiLEtBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTlDLFNBQU8sT0FBTyxHQUFHO0FBQ2YsV0FBTyxlQUFlLEVBQUUsR0FBRztBQUN6QixVQUFJLE9BQU8sS0FBaUIsTUFBTSxtQkFBbUIsSUFBSTtBQUN2RCxjQUFNLGlCQUFpQixNQUFNO0FBQUEsTUFDL0I7QUFDQSxXQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsSUFDOUM7QUFFQSxRQUFJLGlCQUFpQixPQUFPLElBQWE7QUFDdkMsU0FBRztBQUNELGFBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxNQUM5QyxTQUFTLE9BQU8sTUFBZ0IsT0FBTyxNQUFnQixPQUFPO0FBQUEsSUFDaEU7QUFFQSxRQUFJLE9BQU8sRUFBRSxHQUFHO0FBQ2Qsb0JBQWMsS0FBSztBQUVuQixXQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUMxQztBQUNBLFlBQU0sYUFBYTtBQUVuQixhQUFPLE9BQU8sSUFBaUI7QUFDN0IsY0FBTTtBQUNOLGFBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxNQUM5QztBQUFBLElBQ0YsT0FBTztBQUNMO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGdCQUFnQixNQUFNLGVBQWUsS0FBSyxNQUFNLGFBQWEsYUFBYTtBQUM1RSxpQkFBYSxPQUFPLHVCQUF1QjtBQUFBLEVBQzdDO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxzQkFBc0IsT0FBTztBQUNwQyxNQUFJLFlBQVksTUFBTSxVQUNsQjtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsU0FBUztBQUlyQyxPQUFLLE9BQU8sTUFBZSxPQUFPLE9BQzlCLE9BQU8sTUFBTSxNQUFNLFdBQVcsWUFBWSxDQUFDLEtBQzNDLE9BQU8sTUFBTSxNQUFNLFdBQVcsWUFBWSxDQUFDLEdBQUc7QUFFaEQsaUJBQWE7QUFFYixTQUFLLE1BQU0sTUFBTSxXQUFXLFNBQVM7QUFFckMsUUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFLEdBQUc7QUFDaEMsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxpQkFBaUIsT0FBTyxPQUFPO0FBQ3RDLE1BQUksVUFBVSxHQUFHO0FBQ2YsVUFBTSxVQUFVO0FBQUEsRUFDbEIsV0FBVyxRQUFRLEdBQUc7QUFDcEIsVUFBTSxVQUFVLE9BQU8sT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUFBLEVBQy9DO0FBQ0Y7QUFHQSxTQUFTLGdCQUFnQixPQUFPLFlBQVksc0JBQXNCO0FBQ2hFLE1BQUksV0FDQSxXQUNBLGNBQ0EsWUFDQSxtQkFDQSxPQUNBLFlBQ0EsYUFDQSxRQUFRLE1BQU0sTUFDZCxVQUFVLE1BQU0sUUFDaEI7QUFFSixPQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUUxQyxNQUFJLGFBQWEsRUFBRSxLQUNmLGtCQUFrQixFQUFFLEtBQ3BCLE9BQU8sTUFDUCxPQUFPLE1BQ1AsT0FBTyxNQUNQLE9BQU8sTUFDUCxPQUFPLE9BQ1AsT0FBTyxNQUNQLE9BQU8sTUFDUCxPQUFPLE1BQ1AsT0FBTyxNQUNQLE9BQU8sTUFDUCxPQUFPLElBQWE7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE9BQU8sTUFBZSxPQUFPLElBQWE7QUFDNUMsZ0JBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFFckQsUUFBSSxhQUFhLFNBQVMsS0FDdEIsd0JBQXdCLGtCQUFrQixTQUFTLEdBQUc7QUFDeEQsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPO0FBQ2IsUUFBTSxTQUFTO0FBQ2YsaUJBQWUsYUFBYSxNQUFNO0FBQ2xDLHNCQUFvQjtBQUVwQixTQUFPLE9BQU8sR0FBRztBQUNmLFFBQUksT0FBTyxJQUFhO0FBQ3RCLGtCQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBRXJELFVBQUksYUFBYSxTQUFTLEtBQ3RCLHdCQUF3QixrQkFBa0IsU0FBUyxHQUFHO0FBQ3hEO0FBQUEsTUFDRjtBQUFBLElBRUYsV0FBVyxPQUFPLElBQWE7QUFDN0Isa0JBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFFckQsVUFBSSxhQUFhLFNBQVMsR0FBRztBQUMzQjtBQUFBLE1BQ0Y7QUFBQSxJQUVGLFdBQVksTUFBTSxhQUFhLE1BQU0sYUFBYSxzQkFBc0IsS0FBSyxLQUNsRSx3QkFBd0Isa0JBQWtCLEVBQUUsR0FBRztBQUN4RDtBQUFBLElBRUYsV0FBVyxPQUFPLEVBQUUsR0FBRztBQUNyQixjQUFRLE1BQU07QUFDZCxtQkFBYSxNQUFNO0FBQ25CLG9CQUFjLE1BQU07QUFDcEIsMEJBQW9CLE9BQU8sT0FBTyxFQUFFO0FBRXBDLFVBQUksTUFBTSxjQUFjLFlBQVk7QUFDbEMsNEJBQW9CO0FBQ3BCLGFBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBQzFDO0FBQUEsTUFDRixPQUFPO0FBQ0wsY0FBTSxXQUFXO0FBQ2pCLGNBQU0sT0FBTztBQUNiLGNBQU0sWUFBWTtBQUNsQixjQUFNLGFBQWE7QUFDbkI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFFBQUksbUJBQW1CO0FBQ3JCLHFCQUFlLE9BQU8sY0FBYyxZQUFZLEtBQUs7QUFDckQsdUJBQWlCLE9BQU8sTUFBTSxPQUFPLEtBQUs7QUFDMUMscUJBQWUsYUFBYSxNQUFNO0FBQ2xDLDBCQUFvQjtBQUFBLElBQ3RCO0FBRUEsUUFBSSxDQUFDLGVBQWUsRUFBRSxHQUFHO0FBQ3ZCLG1CQUFhLE1BQU0sV0FBVztBQUFBLElBQ2hDO0FBRUEsU0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLEVBQzlDO0FBRUEsaUJBQWUsT0FBTyxjQUFjLFlBQVksS0FBSztBQUVyRCxNQUFJLE1BQU0sUUFBUTtBQUNoQixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTztBQUNiLFFBQU0sU0FBUztBQUNmLFNBQU87QUFDVDtBQUVBLFNBQVMsdUJBQXVCLE9BQU8sWUFBWTtBQUNqRCxNQUFJLElBQ0EsY0FBYztBQUVsQixPQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUUxQyxNQUFJLE9BQU8sSUFBYTtBQUN0QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTztBQUNiLFFBQU0sU0FBUztBQUNmLFFBQU07QUFDTixpQkFBZSxhQUFhLE1BQU07QUFFbEMsVUFBUSxLQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUSxPQUFPLEdBQUc7QUFDMUQsUUFBSSxPQUFPLElBQWE7QUFDdEIscUJBQWUsT0FBTyxjQUFjLE1BQU0sVUFBVSxJQUFJO0FBQ3hELFdBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFFNUMsVUFBSSxPQUFPLElBQWE7QUFDdEIsdUJBQWUsTUFBTTtBQUNyQixjQUFNO0FBQ04scUJBQWEsTUFBTTtBQUFBLE1BQ3JCLE9BQU87QUFDTCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBRUYsV0FBVyxPQUFPLEVBQUUsR0FBRztBQUNyQixxQkFBZSxPQUFPLGNBQWMsWUFBWSxJQUFJO0FBQ3BELHVCQUFpQixPQUFPLG9CQUFvQixPQUFPLE9BQU8sVUFBVSxDQUFDO0FBQ3JFLHFCQUFlLGFBQWEsTUFBTTtBQUFBLElBRXBDLFdBQVcsTUFBTSxhQUFhLE1BQU0sYUFBYSxzQkFBc0IsS0FBSyxHQUFHO0FBQzdFLGlCQUFXLE9BQU8sOERBQThEO0FBQUEsSUFFbEYsT0FBTztBQUNMLFlBQU07QUFDTixtQkFBYSxNQUFNO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBRUEsYUFBVyxPQUFPLDREQUE0RDtBQUNoRjtBQUVBLFNBQVMsdUJBQXVCLE9BQU8sWUFBWTtBQUNqRCxNQUFJLGNBQ0EsWUFDQSxXQUNBLFdBQ0EsS0FDQTtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLE1BQUksT0FBTyxJQUFhO0FBQ3RCLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPO0FBQ2IsUUFBTSxTQUFTO0FBQ2YsUUFBTTtBQUNOLGlCQUFlLGFBQWEsTUFBTTtBQUVsQyxVQUFRLEtBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRLE9BQU8sR0FBRztBQUMxRCxRQUFJLE9BQU8sSUFBYTtBQUN0QixxQkFBZSxPQUFPLGNBQWMsTUFBTSxVQUFVLElBQUk7QUFDeEQsWUFBTTtBQUNOLGFBQU87QUFBQSxJQUVULFdBQVcsT0FBTyxJQUFhO0FBQzdCLHFCQUFlLE9BQU8sY0FBYyxNQUFNLFVBQVUsSUFBSTtBQUN4RCxXQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBRTVDLFVBQUksT0FBTyxFQUFFLEdBQUc7QUFDZCw0QkFBb0IsT0FBTyxPQUFPLFVBQVU7QUFBQSxNQUc5QyxXQUFXLEtBQUssT0FBTyxrQkFBa0IsRUFBRSxHQUFHO0FBQzVDLGNBQU0sVUFBVSxnQkFBZ0IsRUFBRTtBQUNsQyxjQUFNO0FBQUEsTUFFUixZQUFZLE1BQU0sY0FBYyxFQUFFLEtBQUssR0FBRztBQUN4QyxvQkFBWTtBQUNaLG9CQUFZO0FBRVosZUFBTyxZQUFZLEdBQUcsYUFBYTtBQUNqQyxlQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBRTVDLGVBQUssTUFBTSxZQUFZLEVBQUUsTUFBTSxHQUFHO0FBQ2hDLHlCQUFhLGFBQWEsS0FBSztBQUFBLFVBRWpDLE9BQU87QUFDTCx1QkFBVyxPQUFPLGdDQUFnQztBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUVBLGNBQU0sVUFBVSxrQkFBa0IsU0FBUztBQUUzQyxjQUFNO0FBQUEsTUFFUixPQUFPO0FBQ0wsbUJBQVcsT0FBTyx5QkFBeUI7QUFBQSxNQUM3QztBQUVBLHFCQUFlLGFBQWEsTUFBTTtBQUFBLElBRXBDLFdBQVcsT0FBTyxFQUFFLEdBQUc7QUFDckIscUJBQWUsT0FBTyxjQUFjLFlBQVksSUFBSTtBQUNwRCx1QkFBaUIsT0FBTyxvQkFBb0IsT0FBTyxPQUFPLFVBQVUsQ0FBQztBQUNyRSxxQkFBZSxhQUFhLE1BQU07QUFBQSxJQUVwQyxXQUFXLE1BQU0sYUFBYSxNQUFNLGFBQWEsc0JBQXNCLEtBQUssR0FBRztBQUM3RSxpQkFBVyxPQUFPLDhEQUE4RDtBQUFBLElBRWxGLE9BQU87QUFDTCxZQUFNO0FBQ04sbUJBQWEsTUFBTTtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUVBLGFBQVcsT0FBTyw0REFBNEQ7QUFDaEY7QUFFQSxTQUFTLG1CQUFtQixPQUFPLFlBQVk7QUFDN0MsTUFBSSxXQUFXLE1BQ1gsT0FDQSxZQUNBLE1BQ0EsT0FBVyxNQUFNLEtBQ2pCLFNBQ0EsVUFBVyxNQUFNLFFBQ2pCLFdBQ0EsWUFDQSxRQUNBLGdCQUNBLFdBQ0Esa0JBQWtCLHVCQUFPLE9BQU8sSUFBSSxHQUNwQyxTQUNBLFFBQ0EsV0FDQTtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLE1BQUksT0FBTyxJQUFhO0FBQ3RCLGlCQUFhO0FBQ2IsZ0JBQVk7QUFDWixjQUFVLENBQUM7QUFBQSxFQUNiLFdBQVcsT0FBTyxLQUFhO0FBQzdCLGlCQUFhO0FBQ2IsZ0JBQVk7QUFDWixjQUFVLENBQUM7QUFBQSxFQUNiLE9BQU87QUFDTCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksTUFBTSxXQUFXLE1BQU07QUFDekIsVUFBTSxVQUFVLE1BQU0sTUFBTSxJQUFJO0FBQUEsRUFDbEM7QUFFQSxPQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBRTVDLFNBQU8sT0FBTyxHQUFHO0FBQ2Ysd0JBQW9CLE9BQU8sTUFBTSxVQUFVO0FBRTNDLFNBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLFFBQUksT0FBTyxZQUFZO0FBQ3JCLFlBQU07QUFDTixZQUFNLE1BQU07QUFDWixZQUFNLFNBQVM7QUFDZixZQUFNLE9BQU8sWUFBWSxZQUFZO0FBQ3JDLFlBQU0sU0FBUztBQUNmLGFBQU87QUFBQSxJQUNULFdBQVcsQ0FBQyxVQUFVO0FBQ3BCLGlCQUFXLE9BQU8sOENBQThDO0FBQUEsSUFDbEUsV0FBVyxPQUFPLElBQWE7QUFFN0IsaUJBQVcsT0FBTywwQ0FBMEM7QUFBQSxJQUM5RDtBQUVBLGFBQVMsVUFBVSxZQUFZO0FBQy9CLGFBQVMsaUJBQWlCO0FBRTFCLFFBQUksT0FBTyxJQUFhO0FBQ3RCLGtCQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBRXJELFVBQUksYUFBYSxTQUFTLEdBQUc7QUFDM0IsaUJBQVMsaUJBQWlCO0FBQzFCLGNBQU07QUFDTiw0QkFBb0IsT0FBTyxNQUFNLFVBQVU7QUFBQSxNQUM3QztBQUFBLElBQ0Y7QUFFQSxZQUFRLE1BQU07QUFDZCxpQkFBYSxNQUFNO0FBQ25CLFdBQU8sTUFBTTtBQUNiLGdCQUFZLE9BQU8sWUFBWSxpQkFBaUIsT0FBTyxJQUFJO0FBQzNELGFBQVMsTUFBTTtBQUNmLGNBQVUsTUFBTTtBQUNoQix3QkFBb0IsT0FBTyxNQUFNLFVBQVU7QUFFM0MsU0FBSyxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFFMUMsU0FBSyxrQkFBa0IsTUFBTSxTQUFTLFVBQVUsT0FBTyxJQUFhO0FBQ2xFLGVBQVM7QUFDVCxXQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQzVDLDBCQUFvQixPQUFPLE1BQU0sVUFBVTtBQUMzQyxrQkFBWSxPQUFPLFlBQVksaUJBQWlCLE9BQU8sSUFBSTtBQUMzRCxrQkFBWSxNQUFNO0FBQUEsSUFDcEI7QUFFQSxRQUFJLFdBQVc7QUFDYix1QkFBaUIsT0FBTyxTQUFTLGlCQUFpQixRQUFRLFNBQVMsV0FBVyxPQUFPLFlBQVksSUFBSTtBQUFBLElBQ3ZHLFdBQVcsUUFBUTtBQUNqQixjQUFRLEtBQUssaUJBQWlCLE9BQU8sTUFBTSxpQkFBaUIsUUFBUSxTQUFTLFdBQVcsT0FBTyxZQUFZLElBQUksQ0FBQztBQUFBLElBQ2xILE9BQU87QUFDTCxjQUFRLEtBQUssT0FBTztBQUFBLElBQ3RCO0FBRUEsd0JBQW9CLE9BQU8sTUFBTSxVQUFVO0FBRTNDLFNBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLFFBQUksT0FBTyxJQUFhO0FBQ3RCLGlCQUFXO0FBQ1gsV0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLElBQzlDLE9BQU87QUFDTCxpQkFBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBRUEsYUFBVyxPQUFPLHVEQUF1RDtBQUMzRTtBQUVBLFNBQVMsZ0JBQWdCLE9BQU8sWUFBWTtBQUMxQyxNQUFJLGNBQ0EsU0FDQSxXQUFpQixlQUNqQixpQkFBaUIsT0FDakIsaUJBQWlCLE9BQ2pCLGFBQWlCLFlBQ2pCLGFBQWlCLEdBQ2pCLGlCQUFpQixPQUNqQixLQUNBO0FBRUosT0FBSyxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFFMUMsTUFBSSxPQUFPLEtBQWE7QUFDdEIsY0FBVTtBQUFBLEVBQ1osV0FBVyxPQUFPLElBQWE7QUFDN0IsY0FBVTtBQUFBLEVBQ1osT0FBTztBQUNMLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPO0FBQ2IsUUFBTSxTQUFTO0FBRWYsU0FBTyxPQUFPLEdBQUc7QUFDZixTQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBRTVDLFFBQUksT0FBTyxNQUFlLE9BQU8sSUFBYTtBQUM1QyxVQUFJLGtCQUFrQixVQUFVO0FBQzlCLG1CQUFZLE9BQU8sS0FBZSxnQkFBZ0I7QUFBQSxNQUNwRCxPQUFPO0FBQ0wsbUJBQVcsT0FBTyxzQ0FBc0M7QUFBQSxNQUMxRDtBQUFBLElBRUYsWUFBWSxNQUFNLGdCQUFnQixFQUFFLE1BQU0sR0FBRztBQUMzQyxVQUFJLFFBQVEsR0FBRztBQUNiLG1CQUFXLE9BQU8sOEVBQThFO0FBQUEsTUFDbEcsV0FBVyxDQUFDLGdCQUFnQjtBQUMxQixxQkFBYSxhQUFhLE1BQU07QUFDaEMseUJBQWlCO0FBQUEsTUFDbkIsT0FBTztBQUNMLG1CQUFXLE9BQU8sMkNBQTJDO0FBQUEsTUFDL0Q7QUFBQSxJQUVGLE9BQU87QUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxlQUFlLEVBQUUsR0FBRztBQUN0QixPQUFHO0FBQUUsV0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLElBQUcsU0FDN0MsZUFBZSxFQUFFO0FBRXhCLFFBQUksT0FBTyxJQUFhO0FBQ3RCLFNBQUc7QUFBRSxhQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsTUFBRyxTQUM3QyxDQUFDLE9BQU8sRUFBRSxLQUFNLE9BQU87QUFBQSxJQUNoQztBQUFBLEVBQ0Y7QUFFQSxTQUFPLE9BQU8sR0FBRztBQUNmLGtCQUFjLEtBQUs7QUFDbkIsVUFBTSxhQUFhO0FBRW5CLFNBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLFlBQVEsQ0FBQyxrQkFBa0IsTUFBTSxhQUFhLGVBQ3RDLE9BQU8sSUFBa0I7QUFDL0IsWUFBTTtBQUNOLFdBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxJQUM5QztBQUVBLFFBQUksQ0FBQyxrQkFBa0IsTUFBTSxhQUFhLFlBQVk7QUFDcEQsbUJBQWEsTUFBTTtBQUFBLElBQ3JCO0FBRUEsUUFBSSxPQUFPLEVBQUUsR0FBRztBQUNkO0FBQ0E7QUFBQSxJQUNGO0FBR0EsUUFBSSxNQUFNLGFBQWEsWUFBWTtBQUdqQyxVQUFJLGFBQWEsZUFBZTtBQUM5QixjQUFNLFVBQVUsT0FBTyxPQUFPLE1BQU0saUJBQWlCLElBQUksYUFBYSxVQUFVO0FBQUEsTUFDbEYsV0FBVyxhQUFhLGVBQWU7QUFDckMsWUFBSSxnQkFBZ0I7QUFDbEIsZ0JBQU0sVUFBVTtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUdBO0FBQUEsSUFDRjtBQUdBLFFBQUksU0FBUztBQUdYLFVBQUksZUFBZSxFQUFFLEdBQUc7QUFDdEIseUJBQWlCO0FBRWpCLGNBQU0sVUFBVSxPQUFPLE9BQU8sTUFBTSxpQkFBaUIsSUFBSSxhQUFhLFVBQVU7QUFBQSxNQUdsRixXQUFXLGdCQUFnQjtBQUN6Qix5QkFBaUI7QUFDakIsY0FBTSxVQUFVLE9BQU8sT0FBTyxNQUFNLGFBQWEsQ0FBQztBQUFBLE1BR3BELFdBQVcsZUFBZSxHQUFHO0FBQzNCLFlBQUksZ0JBQWdCO0FBQ2xCLGdCQUFNLFVBQVU7QUFBQSxRQUNsQjtBQUFBLE1BR0YsT0FBTztBQUNMLGNBQU0sVUFBVSxPQUFPLE9BQU8sTUFBTSxVQUFVO0FBQUEsTUFDaEQ7QUFBQSxJQUdGLE9BQU87QUFFTCxZQUFNLFVBQVUsT0FBTyxPQUFPLE1BQU0saUJBQWlCLElBQUksYUFBYSxVQUFVO0FBQUEsSUFDbEY7QUFFQSxxQkFBaUI7QUFDakIscUJBQWlCO0FBQ2pCLGlCQUFhO0FBQ2IsbUJBQWUsTUFBTTtBQUVyQixXQUFPLENBQUMsT0FBTyxFQUFFLEtBQU0sT0FBTyxHQUFJO0FBQ2hDLFdBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxJQUM5QztBQUVBLG1CQUFlLE9BQU8sY0FBYyxNQUFNLFVBQVUsS0FBSztBQUFBLEVBQzNEO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxrQkFBa0IsT0FBTyxZQUFZO0FBQzVDLE1BQUksT0FDQSxPQUFZLE1BQU0sS0FDbEIsVUFBWSxNQUFNLFFBQ2xCLFVBQVksQ0FBQyxHQUNiLFdBQ0EsV0FBWSxPQUNaO0FBSUosTUFBSSxNQUFNLG1CQUFtQixHQUFJLFFBQU87QUFFeEMsTUFBSSxNQUFNLFdBQVcsTUFBTTtBQUN6QixVQUFNLFVBQVUsTUFBTSxNQUFNLElBQUk7QUFBQSxFQUNsQztBQUVBLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLFNBQU8sT0FBTyxHQUFHO0FBQ2YsUUFBSSxNQUFNLG1CQUFtQixJQUFJO0FBQy9CLFlBQU0sV0FBVyxNQUFNO0FBQ3ZCLGlCQUFXLE9BQU8sZ0RBQWdEO0FBQUEsSUFDcEU7QUFFQSxRQUFJLE9BQU8sSUFBYTtBQUN0QjtBQUFBLElBQ0Y7QUFFQSxnQkFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUVyRCxRQUFJLENBQUMsYUFBYSxTQUFTLEdBQUc7QUFDNUI7QUFBQSxJQUNGO0FBRUEsZUFBVztBQUNYLFVBQU07QUFFTixRQUFJLG9CQUFvQixPQUFPLE1BQU0sRUFBRSxHQUFHO0FBQ3hDLFVBQUksTUFBTSxjQUFjLFlBQVk7QUFDbEMsZ0JBQVEsS0FBSyxJQUFJO0FBQ2pCLGFBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBQzFDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxZQUFRLE1BQU07QUFDZCxnQkFBWSxPQUFPLFlBQVksa0JBQWtCLE9BQU8sSUFBSTtBQUM1RCxZQUFRLEtBQUssTUFBTSxNQUFNO0FBQ3pCLHdCQUFvQixPQUFPLE1BQU0sRUFBRTtBQUVuQyxTQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUUxQyxTQUFLLE1BQU0sU0FBUyxTQUFTLE1BQU0sYUFBYSxlQUFnQixPQUFPLEdBQUk7QUFDekUsaUJBQVcsT0FBTyxxQ0FBcUM7QUFBQSxJQUN6RCxXQUFXLE1BQU0sYUFBYSxZQUFZO0FBQ3hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFVBQVU7QUFDWixVQUFNLE1BQU07QUFDWixVQUFNLFNBQVM7QUFDZixVQUFNLE9BQU87QUFDYixVQUFNLFNBQVM7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQUVBLFNBQVMsaUJBQWlCLE9BQU8sWUFBWSxZQUFZO0FBQ3ZELE1BQUksV0FDQSxjQUNBLE9BQ0EsVUFDQSxlQUNBLFNBQ0EsT0FBZ0IsTUFBTSxLQUN0QixVQUFnQixNQUFNLFFBQ3RCLFVBQWdCLENBQUMsR0FDakIsa0JBQWtCLHVCQUFPLE9BQU8sSUFBSSxHQUNwQyxTQUFnQixNQUNoQixVQUFnQixNQUNoQixZQUFnQixNQUNoQixnQkFBZ0IsT0FDaEIsV0FBZ0IsT0FDaEI7QUFJSixNQUFJLE1BQU0sbUJBQW1CLEdBQUksUUFBTztBQUV4QyxNQUFJLE1BQU0sV0FBVyxNQUFNO0FBQ3pCLFVBQU0sVUFBVSxNQUFNLE1BQU0sSUFBSTtBQUFBLEVBQ2xDO0FBRUEsT0FBSyxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFFMUMsU0FBTyxPQUFPLEdBQUc7QUFDZixRQUFJLENBQUMsaUJBQWlCLE1BQU0sbUJBQW1CLElBQUk7QUFDakQsWUFBTSxXQUFXLE1BQU07QUFDdkIsaUJBQVcsT0FBTyxnREFBZ0Q7QUFBQSxJQUNwRTtBQUVBLGdCQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3JELFlBQVEsTUFBTTtBQU1kLFNBQUssT0FBTyxNQUFlLE9BQU8sT0FBZ0IsYUFBYSxTQUFTLEdBQUc7QUFFekUsVUFBSSxPQUFPLElBQWE7QUFDdEIsWUFBSSxlQUFlO0FBQ2pCLDJCQUFpQixPQUFPLFNBQVMsaUJBQWlCLFFBQVEsU0FBUyxNQUFNLFVBQVUsZUFBZSxPQUFPO0FBQ3pHLG1CQUFTLFVBQVUsWUFBWTtBQUFBLFFBQ2pDO0FBRUEsbUJBQVc7QUFDWCx3QkFBZ0I7QUFDaEIsdUJBQWU7QUFBQSxNQUVqQixXQUFXLGVBQWU7QUFFeEIsd0JBQWdCO0FBQ2hCLHVCQUFlO0FBQUEsTUFFakIsT0FBTztBQUNMLG1CQUFXLE9BQU8sbUdBQW1HO0FBQUEsTUFDdkg7QUFFQSxZQUFNLFlBQVk7QUFDbEIsV0FBSztBQUFBLElBS1AsT0FBTztBQUNMLGlCQUFXLE1BQU07QUFDakIsc0JBQWdCLE1BQU07QUFDdEIsZ0JBQVUsTUFBTTtBQUVoQixVQUFJLENBQUMsWUFBWSxPQUFPLFlBQVksa0JBQWtCLE9BQU8sSUFBSSxHQUFHO0FBR2xFO0FBQUEsTUFDRjtBQUVBLFVBQUksTUFBTSxTQUFTLE9BQU87QUFDeEIsYUFBSyxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFFMUMsZUFBTyxlQUFlLEVBQUUsR0FBRztBQUN6QixlQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsUUFDOUM7QUFFQSxZQUFJLE9BQU8sSUFBYTtBQUN0QixlQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBRTVDLGNBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRztBQUNyQix1QkFBVyxPQUFPLHlGQUF5RjtBQUFBLFVBQzdHO0FBRUEsY0FBSSxlQUFlO0FBQ2pCLDZCQUFpQixPQUFPLFNBQVMsaUJBQWlCLFFBQVEsU0FBUyxNQUFNLFVBQVUsZUFBZSxPQUFPO0FBQ3pHLHFCQUFTLFVBQVUsWUFBWTtBQUFBLFVBQ2pDO0FBRUEscUJBQVc7QUFDWCwwQkFBZ0I7QUFDaEIseUJBQWU7QUFDZixtQkFBUyxNQUFNO0FBQ2Ysb0JBQVUsTUFBTTtBQUFBLFFBRWxCLFdBQVcsVUFBVTtBQUNuQixxQkFBVyxPQUFPLDBEQUEwRDtBQUFBLFFBRTlFLE9BQU87QUFDTCxnQkFBTSxNQUFNO0FBQ1osZ0JBQU0sU0FBUztBQUNmLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BRUYsV0FBVyxVQUFVO0FBQ25CLG1CQUFXLE9BQU8sZ0ZBQWdGO0FBQUEsTUFFcEcsT0FBTztBQUNMLGNBQU0sTUFBTTtBQUNaLGNBQU0sU0FBUztBQUNmLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUtBLFFBQUksTUFBTSxTQUFTLFNBQVMsTUFBTSxhQUFhLFlBQVk7QUFDekQsVUFBSSxlQUFlO0FBQ2pCLG1CQUFXLE1BQU07QUFDakIsd0JBQWdCLE1BQU07QUFDdEIsa0JBQVUsTUFBTTtBQUFBLE1BQ2xCO0FBRUEsVUFBSSxZQUFZLE9BQU8sWUFBWSxtQkFBbUIsTUFBTSxZQUFZLEdBQUc7QUFDekUsWUFBSSxlQUFlO0FBQ2pCLG9CQUFVLE1BQU07QUFBQSxRQUNsQixPQUFPO0FBQ0wsc0JBQVksTUFBTTtBQUFBLFFBQ3BCO0FBQUEsTUFDRjtBQUVBLFVBQUksQ0FBQyxlQUFlO0FBQ2xCLHlCQUFpQixPQUFPLFNBQVMsaUJBQWlCLFFBQVEsU0FBUyxXQUFXLFVBQVUsZUFBZSxPQUFPO0FBQzlHLGlCQUFTLFVBQVUsWUFBWTtBQUFBLE1BQ2pDO0FBRUEsMEJBQW9CLE9BQU8sTUFBTSxFQUFFO0FBQ25DLFdBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBQUEsSUFDNUM7QUFFQSxTQUFLLE1BQU0sU0FBUyxTQUFTLE1BQU0sYUFBYSxlQUFnQixPQUFPLEdBQUk7QUFDekUsaUJBQVcsT0FBTyxvQ0FBb0M7QUFBQSxJQUN4RCxXQUFXLE1BQU0sYUFBYSxZQUFZO0FBQ3hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFPQSxNQUFJLGVBQWU7QUFDakIscUJBQWlCLE9BQU8sU0FBUyxpQkFBaUIsUUFBUSxTQUFTLE1BQU0sVUFBVSxlQUFlLE9BQU87QUFBQSxFQUMzRztBQUdBLE1BQUksVUFBVTtBQUNaLFVBQU0sTUFBTTtBQUNaLFVBQU0sU0FBUztBQUNmLFVBQU0sT0FBTztBQUNiLFVBQU0sU0FBUztBQUFBLEVBQ2pCO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxnQkFBZ0IsT0FBTztBQUM5QixNQUFJLFdBQ0EsYUFBYSxPQUNiLFVBQWEsT0FDYixXQUNBLFNBQ0E7QUFFSixPQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUUxQyxNQUFJLE9BQU8sR0FBYSxRQUFPO0FBRS9CLE1BQUksTUFBTSxRQUFRLE1BQU07QUFDdEIsZUFBVyxPQUFPLCtCQUErQjtBQUFBLEVBQ25EO0FBRUEsT0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUU1QyxNQUFJLE9BQU8sSUFBYTtBQUN0QixpQkFBYTtBQUNiLFNBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxFQUU5QyxXQUFXLE9BQU8sSUFBYTtBQUM3QixjQUFVO0FBQ1YsZ0JBQVk7QUFDWixTQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsRUFFOUMsT0FBTztBQUNMLGdCQUFZO0FBQUEsRUFDZDtBQUVBLGNBQVksTUFBTTtBQUVsQixNQUFJLFlBQVk7QUFDZCxPQUFHO0FBQUUsV0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLElBQUcsU0FDN0MsT0FBTyxLQUFLLE9BQU87QUFFMUIsUUFBSSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBQ2pDLGdCQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBQ3JELFdBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxJQUM5QyxPQUFPO0FBQ0wsaUJBQVcsT0FBTyxvREFBb0Q7QUFBQSxJQUN4RTtBQUFBLEVBQ0YsT0FBTztBQUNMLFdBQU8sT0FBTyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUc7QUFFcEMsVUFBSSxPQUFPLElBQWE7QUFDdEIsWUFBSSxDQUFDLFNBQVM7QUFDWixzQkFBWSxNQUFNLE1BQU0sTUFBTSxZQUFZLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFFL0QsY0FBSSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsR0FBRztBQUN2Qyx1QkFBVyxPQUFPLGlEQUFpRDtBQUFBLFVBQ3JFO0FBRUEsb0JBQVU7QUFDVixzQkFBWSxNQUFNLFdBQVc7QUFBQSxRQUMvQixPQUFPO0FBQ0wscUJBQVcsT0FBTyw2Q0FBNkM7QUFBQSxRQUNqRTtBQUFBLE1BQ0Y7QUFFQSxXQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsSUFDOUM7QUFFQSxjQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRXJELFFBQUksd0JBQXdCLEtBQUssT0FBTyxHQUFHO0FBQ3pDLGlCQUFXLE9BQU8scURBQXFEO0FBQUEsSUFDekU7QUFBQSxFQUNGO0FBRUEsTUFBSSxXQUFXLENBQUMsZ0JBQWdCLEtBQUssT0FBTyxHQUFHO0FBQzdDLGVBQVcsT0FBTyw4Q0FBOEMsT0FBTztBQUFBLEVBQ3pFO0FBRUEsTUFBSTtBQUNGLGNBQVUsbUJBQW1CLE9BQU87QUFBQSxFQUN0QyxTQUFTLEtBQUs7QUFDWixlQUFXLE9BQU8sNEJBQTRCLE9BQU87QUFBQSxFQUN2RDtBQUVBLE1BQUksWUFBWTtBQUNkLFVBQU0sTUFBTTtBQUFBLEVBRWQsV0FBVyxrQkFBa0IsS0FBSyxNQUFNLFFBQVEsU0FBUyxHQUFHO0FBQzFELFVBQU0sTUFBTSxNQUFNLE9BQU8sU0FBUyxJQUFJO0FBQUEsRUFFeEMsV0FBVyxjQUFjLEtBQUs7QUFDNUIsVUFBTSxNQUFNLE1BQU07QUFBQSxFQUVwQixXQUFXLGNBQWMsTUFBTTtBQUM3QixVQUFNLE1BQU0sdUJBQXVCO0FBQUEsRUFFckMsT0FBTztBQUNMLGVBQVcsT0FBTyw0QkFBNEIsWUFBWSxHQUFHO0FBQUEsRUFDL0Q7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLG1CQUFtQixPQUFPO0FBQ2pDLE1BQUksV0FDQTtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLE1BQUksT0FBTyxHQUFhLFFBQU87QUFFL0IsTUFBSSxNQUFNLFdBQVcsTUFBTTtBQUN6QixlQUFXLE9BQU8sbUNBQW1DO0FBQUEsRUFDdkQ7QUFFQSxPQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQzVDLGNBQVksTUFBTTtBQUVsQixTQUFPLE9BQU8sS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsa0JBQWtCLEVBQUUsR0FBRztBQUM5RCxTQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsRUFDOUM7QUFFQSxNQUFJLE1BQU0sYUFBYSxXQUFXO0FBQ2hDLGVBQVcsT0FBTyw0REFBNEQ7QUFBQSxFQUNoRjtBQUVBLFFBQU0sU0FBUyxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUTtBQUMxRCxTQUFPO0FBQ1Q7QUFFQSxTQUFTLFVBQVUsT0FBTztBQUN4QixNQUFJLFdBQVcsT0FDWDtBQUVKLE9BQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLE1BQUksT0FBTyxHQUFhLFFBQU87QUFFL0IsT0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUM1QyxjQUFZLE1BQU07QUFFbEIsU0FBTyxPQUFPLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEdBQUc7QUFDOUQsU0FBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLEVBQzlDO0FBRUEsTUFBSSxNQUFNLGFBQWEsV0FBVztBQUNoQyxlQUFXLE9BQU8sMkRBQTJEO0FBQUEsRUFDL0U7QUFFQSxVQUFRLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRW5ELE1BQUksQ0FBQyxrQkFBa0IsS0FBSyxNQUFNLFdBQVcsS0FBSyxHQUFHO0FBQ25ELGVBQVcsT0FBTyx5QkFBeUIsUUFBUSxHQUFHO0FBQUEsRUFDeEQ7QUFFQSxRQUFNLFNBQVMsTUFBTSxVQUFVLEtBQUs7QUFDcEMsc0JBQW9CLE9BQU8sTUFBTSxFQUFFO0FBQ25DLFNBQU87QUFDVDtBQUVBLFNBQVMsWUFBWSxPQUFPLGNBQWMsYUFBYSxhQUFhLGNBQWM7QUFDaEYsTUFBSSxrQkFDQSxtQkFDQSx1QkFDQSxlQUFlLEdBQ2YsWUFBYSxPQUNiLGFBQWEsT0FDYixXQUNBLGNBQ0EsVUFDQUUsT0FDQSxZQUNBO0FBRUosTUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixVQUFNLFNBQVMsUUFBUSxLQUFLO0FBQUEsRUFDOUI7QUFFQSxRQUFNLE1BQVM7QUFDZixRQUFNLFNBQVM7QUFDZixRQUFNLE9BQVM7QUFDZixRQUFNLFNBQVM7QUFFZixxQkFBbUIsb0JBQW9CLHdCQUNyQyxzQkFBc0IsZUFDdEIscUJBQXNCO0FBRXhCLE1BQUksYUFBYTtBQUNmLFFBQUksb0JBQW9CLE9BQU8sTUFBTSxFQUFFLEdBQUc7QUFDeEMsa0JBQVk7QUFFWixVQUFJLE1BQU0sYUFBYSxjQUFjO0FBQ25DLHVCQUFlO0FBQUEsTUFDakIsV0FBVyxNQUFNLGVBQWUsY0FBYztBQUM1Qyx1QkFBZTtBQUFBLE1BQ2pCLFdBQVcsTUFBTSxhQUFhLGNBQWM7QUFDMUMsdUJBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxpQkFBaUIsR0FBRztBQUN0QixXQUFPLGdCQUFnQixLQUFLLEtBQUssbUJBQW1CLEtBQUssR0FBRztBQUMxRCxVQUFJLG9CQUFvQixPQUFPLE1BQU0sRUFBRSxHQUFHO0FBQ3hDLG9CQUFZO0FBQ1osZ0NBQXdCO0FBRXhCLFlBQUksTUFBTSxhQUFhLGNBQWM7QUFDbkMseUJBQWU7QUFBQSxRQUNqQixXQUFXLE1BQU0sZUFBZSxjQUFjO0FBQzVDLHlCQUFlO0FBQUEsUUFDakIsV0FBVyxNQUFNLGFBQWEsY0FBYztBQUMxQyx5QkFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRixPQUFPO0FBQ0wsZ0NBQXdCO0FBQUEsTUFDMUI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksdUJBQXVCO0FBQ3pCLDRCQUF3QixhQUFhO0FBQUEsRUFDdkM7QUFFQSxNQUFJLGlCQUFpQixLQUFLLHNCQUFzQixhQUFhO0FBQzNELFFBQUksb0JBQW9CLGVBQWUscUJBQXFCLGFBQWE7QUFDdkUsbUJBQWE7QUFBQSxJQUNmLE9BQU87QUFDTCxtQkFBYSxlQUFlO0FBQUEsSUFDOUI7QUFFQSxrQkFBYyxNQUFNLFdBQVcsTUFBTTtBQUVyQyxRQUFJLGlCQUFpQixHQUFHO0FBQ3RCLFVBQUksMEJBQ0Msa0JBQWtCLE9BQU8sV0FBVyxLQUNwQyxpQkFBaUIsT0FBTyxhQUFhLFVBQVUsTUFDaEQsbUJBQW1CLE9BQU8sVUFBVSxHQUFHO0FBQ3pDLHFCQUFhO0FBQUEsTUFDZixPQUFPO0FBQ0wsWUFBSyxxQkFBcUIsZ0JBQWdCLE9BQU8sVUFBVSxLQUN2RCx1QkFBdUIsT0FBTyxVQUFVLEtBQ3hDLHVCQUF1QixPQUFPLFVBQVUsR0FBRztBQUM3Qyx1QkFBYTtBQUFBLFFBRWYsV0FBVyxVQUFVLEtBQUssR0FBRztBQUMzQix1QkFBYTtBQUViLGNBQUksTUFBTSxRQUFRLFFBQVEsTUFBTSxXQUFXLE1BQU07QUFDL0MsdUJBQVcsT0FBTywyQ0FBMkM7QUFBQSxVQUMvRDtBQUFBLFFBRUYsV0FBVyxnQkFBZ0IsT0FBTyxZQUFZLG9CQUFvQixXQUFXLEdBQUc7QUFDOUUsdUJBQWE7QUFFYixjQUFJLE1BQU0sUUFBUSxNQUFNO0FBQ3RCLGtCQUFNLE1BQU07QUFBQSxVQUNkO0FBQUEsUUFDRjtBQUVBLFlBQUksTUFBTSxXQUFXLE1BQU07QUFDekIsZ0JBQU0sVUFBVSxNQUFNLE1BQU0sSUFBSSxNQUFNO0FBQUEsUUFDeEM7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLGlCQUFpQixHQUFHO0FBRzdCLG1CQUFhLHlCQUF5QixrQkFBa0IsT0FBTyxXQUFXO0FBQUEsSUFDNUU7QUFBQSxFQUNGO0FBRUEsTUFBSSxNQUFNLFFBQVEsTUFBTTtBQUN0QixRQUFJLE1BQU0sV0FBVyxNQUFNO0FBQ3pCLFlBQU0sVUFBVSxNQUFNLE1BQU0sSUFBSSxNQUFNO0FBQUEsSUFDeEM7QUFBQSxFQUVGLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFPNUIsUUFBSSxNQUFNLFdBQVcsUUFBUSxNQUFNLFNBQVMsVUFBVTtBQUNwRCxpQkFBVyxPQUFPLHNFQUFzRSxNQUFNLE9BQU8sR0FBRztBQUFBLElBQzFHO0FBRUEsU0FBSyxZQUFZLEdBQUcsZUFBZSxNQUFNLGNBQWMsUUFBUSxZQUFZLGNBQWMsYUFBYSxHQUFHO0FBQ3ZHLE1BQUFBLFFBQU8sTUFBTSxjQUFjLFNBQVM7QUFFcEMsVUFBSUEsTUFBSyxRQUFRLE1BQU0sTUFBTSxHQUFHO0FBQzlCLGNBQU0sU0FBU0EsTUFBSyxVQUFVLE1BQU0sTUFBTTtBQUMxQyxjQUFNLE1BQU1BLE1BQUs7QUFDakIsWUFBSSxNQUFNLFdBQVcsTUFBTTtBQUN6QixnQkFBTSxVQUFVLE1BQU0sTUFBTSxJQUFJLE1BQU07QUFBQSxRQUN4QztBQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDNUIsUUFBSSxrQkFBa0IsS0FBSyxNQUFNLFFBQVEsTUFBTSxRQUFRLFVBQVUsR0FBRyxNQUFNLEdBQUcsR0FBRztBQUM5RSxNQUFBQSxRQUFPLE1BQU0sUUFBUSxNQUFNLFFBQVEsVUFBVSxFQUFFLE1BQU0sR0FBRztBQUFBLElBQzFELE9BQU87QUFFTCxNQUFBQSxRQUFPO0FBQ1AsaUJBQVcsTUFBTSxRQUFRLE1BQU0sTUFBTSxRQUFRLFVBQVU7QUFFdkQsV0FBSyxZQUFZLEdBQUcsZUFBZSxTQUFTLFFBQVEsWUFBWSxjQUFjLGFBQWEsR0FBRztBQUM1RixZQUFJLE1BQU0sSUFBSSxNQUFNLEdBQUcsU0FBUyxTQUFTLEVBQUUsSUFBSSxNQUFNLE1BQU0sU0FBUyxTQUFTLEVBQUUsS0FBSztBQUNsRixVQUFBQSxRQUFPLFNBQVMsU0FBUztBQUN6QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQ0EsT0FBTTtBQUNULGlCQUFXLE9BQU8sbUJBQW1CLE1BQU0sTUFBTSxHQUFHO0FBQUEsSUFDdEQ7QUFFQSxRQUFJLE1BQU0sV0FBVyxRQUFRQSxNQUFLLFNBQVMsTUFBTSxNQUFNO0FBQ3JELGlCQUFXLE9BQU8sa0NBQWtDLE1BQU0sTUFBTSwwQkFBMEJBLE1BQUssT0FBTyxhQUFhLE1BQU0sT0FBTyxHQUFHO0FBQUEsSUFDckk7QUFFQSxRQUFJLENBQUNBLE1BQUssUUFBUSxNQUFNLFFBQVEsTUFBTSxHQUFHLEdBQUc7QUFDMUMsaUJBQVcsT0FBTyxrQ0FBa0MsTUFBTSxNQUFNLGdCQUFnQjtBQUFBLElBQ2xGLE9BQU87QUFDTCxZQUFNLFNBQVNBLE1BQUssVUFBVSxNQUFNLFFBQVEsTUFBTSxHQUFHO0FBQ3JELFVBQUksTUFBTSxXQUFXLE1BQU07QUFDekIsY0FBTSxVQUFVLE1BQU0sTUFBTSxJQUFJLE1BQU07QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxNQUFNLGFBQWEsTUFBTTtBQUMzQixVQUFNLFNBQVMsU0FBUyxLQUFLO0FBQUEsRUFDL0I7QUFDQSxTQUFPLE1BQU0sUUFBUSxRQUFTLE1BQU0sV0FBVyxRQUFRO0FBQ3pEO0FBRUEsU0FBUyxhQUFhLE9BQU87QUFDM0IsTUFBSSxnQkFBZ0IsTUFBTSxVQUN0QixXQUNBLGVBQ0EsZUFDQSxnQkFBZ0IsT0FDaEI7QUFFSixRQUFNLFVBQVU7QUFDaEIsUUFBTSxrQkFBa0IsTUFBTTtBQUM5QixRQUFNLFNBQVMsdUJBQU8sT0FBTyxJQUFJO0FBQ2pDLFFBQU0sWUFBWSx1QkFBTyxPQUFPLElBQUk7QUFFcEMsVUFBUSxLQUFLLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUSxPQUFPLEdBQUc7QUFDMUQsd0JBQW9CLE9BQU8sTUFBTSxFQUFFO0FBRW5DLFNBQUssTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRO0FBRTFDLFFBQUksTUFBTSxhQUFhLEtBQUssT0FBTyxJQUFhO0FBQzlDO0FBQUEsSUFDRjtBQUVBLG9CQUFnQjtBQUNoQixTQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQzVDLGdCQUFZLE1BQU07QUFFbEIsV0FBTyxPQUFPLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRztBQUNwQyxXQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsSUFDOUM7QUFFQSxvQkFBZ0IsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLFFBQVE7QUFDM0Qsb0JBQWdCLENBQUM7QUFFakIsUUFBSSxjQUFjLFNBQVMsR0FBRztBQUM1QixpQkFBVyxPQUFPLDhEQUE4RDtBQUFBLElBQ2xGO0FBRUEsV0FBTyxPQUFPLEdBQUc7QUFDZixhQUFPLGVBQWUsRUFBRSxHQUFHO0FBQ3pCLGFBQUssTUFBTSxNQUFNLFdBQVcsRUFBRSxNQUFNLFFBQVE7QUFBQSxNQUM5QztBQUVBLFVBQUksT0FBTyxJQUFhO0FBQ3RCLFdBQUc7QUFBRSxlQUFLLE1BQU0sTUFBTSxXQUFXLEVBQUUsTUFBTSxRQUFRO0FBQUEsUUFBRyxTQUM3QyxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUU7QUFDN0I7QUFBQSxNQUNGO0FBRUEsVUFBSSxPQUFPLEVBQUUsRUFBRztBQUVoQixrQkFBWSxNQUFNO0FBRWxCLGFBQU8sT0FBTyxLQUFLLENBQUMsYUFBYSxFQUFFLEdBQUc7QUFDcEMsYUFBSyxNQUFNLE1BQU0sV0FBVyxFQUFFLE1BQU0sUUFBUTtBQUFBLE1BQzlDO0FBRUEsb0JBQWMsS0FBSyxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sUUFBUSxDQUFDO0FBQUEsSUFDakU7QUFFQSxRQUFJLE9BQU8sRUFBRyxlQUFjLEtBQUs7QUFFakMsUUFBSSxrQkFBa0IsS0FBSyxtQkFBbUIsYUFBYSxHQUFHO0FBQzVELHdCQUFrQixhQUFhLEVBQUUsT0FBTyxlQUFlLGFBQWE7QUFBQSxJQUN0RSxPQUFPO0FBQ0wsbUJBQWEsT0FBTyxpQ0FBaUMsZ0JBQWdCLEdBQUc7QUFBQSxJQUMxRTtBQUFBLEVBQ0Y7QUFFQSxzQkFBb0IsT0FBTyxNQUFNLEVBQUU7QUFFbkMsTUFBSSxNQUFNLGVBQWUsS0FDckIsTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRLE1BQVUsTUFDL0MsTUFBTSxNQUFNLFdBQVcsTUFBTSxXQUFXLENBQUMsTUFBTSxNQUMvQyxNQUFNLE1BQU0sV0FBVyxNQUFNLFdBQVcsQ0FBQyxNQUFNLElBQWE7QUFDOUQsVUFBTSxZQUFZO0FBQ2xCLHdCQUFvQixPQUFPLE1BQU0sRUFBRTtBQUFBLEVBRXJDLFdBQVcsZUFBZTtBQUN4QixlQUFXLE9BQU8saUNBQWlDO0FBQUEsRUFDckQ7QUFFQSxjQUFZLE9BQU8sTUFBTSxhQUFhLEdBQUcsbUJBQW1CLE9BQU8sSUFBSTtBQUN2RSxzQkFBb0IsT0FBTyxNQUFNLEVBQUU7QUFFbkMsTUFBSSxNQUFNLG1CQUNOLDhCQUE4QixLQUFLLE1BQU0sTUFBTSxNQUFNLGVBQWUsTUFBTSxRQUFRLENBQUMsR0FBRztBQUN4RixpQkFBYSxPQUFPLGtEQUFrRDtBQUFBLEVBQ3hFO0FBRUEsUUFBTSxVQUFVLEtBQUssTUFBTSxNQUFNO0FBRWpDLE1BQUksTUFBTSxhQUFhLE1BQU0sYUFBYSxzQkFBc0IsS0FBSyxHQUFHO0FBRXRFLFFBQUksTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRLE1BQU0sSUFBYTtBQUMxRCxZQUFNLFlBQVk7QUFDbEIsMEJBQW9CLE9BQU8sTUFBTSxFQUFFO0FBQUEsSUFDckM7QUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLE1BQU0sV0FBWSxNQUFNLFNBQVMsR0FBSTtBQUN2QyxlQUFXLE9BQU8sdURBQXVEO0FBQUEsRUFDM0UsT0FBTztBQUNMO0FBQUEsRUFDRjtBQUNGO0FBR0EsU0FBUyxjQUFjLE9BQU8sU0FBUztBQUNyQyxVQUFRLE9BQU8sS0FBSztBQUNwQixZQUFVLFdBQVcsQ0FBQztBQUV0QixNQUFJLE1BQU0sV0FBVyxHQUFHO0FBR3RCLFFBQUksTUFBTSxXQUFXLE1BQU0sU0FBUyxDQUFDLE1BQU0sTUFDdkMsTUFBTSxXQUFXLE1BQU0sU0FBUyxDQUFDLE1BQU0sSUFBYztBQUN2RCxlQUFTO0FBQUEsSUFDWDtBQUdBLFFBQUksTUFBTSxXQUFXLENBQUMsTUFBTSxPQUFRO0FBQ2xDLGNBQVEsTUFBTSxNQUFNLENBQUM7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFFBQVEsSUFBSSxRQUFRLE9BQU8sT0FBTztBQUV0QyxNQUFJLFVBQVUsTUFBTSxRQUFRLElBQUk7QUFFaEMsTUFBSSxZQUFZLElBQUk7QUFDbEIsVUFBTSxXQUFXO0FBQ2pCLGVBQVcsT0FBTyxtQ0FBbUM7QUFBQSxFQUN2RDtBQUdBLFFBQU0sU0FBUztBQUVmLFNBQU8sTUFBTSxNQUFNLFdBQVcsTUFBTSxRQUFRLE1BQU0sSUFBaUI7QUFDakUsVUFBTSxjQUFjO0FBQ3BCLFVBQU0sWUFBWTtBQUFBLEVBQ3BCO0FBRUEsU0FBTyxNQUFNLFdBQVksTUFBTSxTQUFTLEdBQUk7QUFDMUMsaUJBQWEsS0FBSztBQUFBLEVBQ3BCO0FBRUEsU0FBTyxNQUFNO0FBQ2Y7QUFHQSxTQUFTLFVBQVUsT0FBTyxVQUFVLFNBQVM7QUFDM0MsTUFBSSxhQUFhLFFBQVEsT0FBTyxhQUFhLFlBQVksT0FBTyxZQUFZLGFBQWE7QUFDdkYsY0FBVTtBQUNWLGVBQVc7QUFBQSxFQUNiO0FBRUEsTUFBSSxZQUFZLGNBQWMsT0FBTyxPQUFPO0FBRTVDLE1BQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxXQUFTLFFBQVEsR0FBRyxTQUFTLFVBQVUsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ3pFLGFBQVMsVUFBVSxLQUFLLENBQUM7QUFBQSxFQUMzQjtBQUNGO0FBR0EsU0FBUyxPQUFPLE9BQU8sU0FBUztBQUM5QixNQUFJLFlBQVksY0FBYyxPQUFPLE9BQU87QUFFNUMsTUFBSSxVQUFVLFdBQVcsR0FBRztBQUUxQixXQUFPO0FBQUEsRUFDVCxXQUFXLFVBQVUsV0FBVyxHQUFHO0FBQ2pDLFdBQU8sVUFBVSxDQUFDO0FBQUEsRUFDcEI7QUFDQSxRQUFNLElBQUksVUFBVSwwREFBMEQ7QUFDaEY7QUFHQSxJQUFJLFlBQVk7QUFDaEIsSUFBSSxTQUFZO0FBRWhCLElBQUksU0FBUztBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUNQO0FBUUEsSUFBSSxZQUFrQixPQUFPLFVBQVU7QUFDdkMsSUFBSSxrQkFBa0IsT0FBTyxVQUFVO0FBRXZDLElBQUksV0FBNEI7QUFDaEMsSUFBSSxXQUE0QjtBQUNoQyxJQUFJLGlCQUE0QjtBQUNoQyxJQUFJLHVCQUE0QjtBQUNoQyxJQUFJLGFBQTRCO0FBQ2hDLElBQUksbUJBQTRCO0FBQ2hDLElBQUksb0JBQTRCO0FBQ2hDLElBQUksYUFBNEI7QUFDaEMsSUFBSSxlQUE0QjtBQUNoQyxJQUFJLGlCQUE0QjtBQUNoQyxJQUFJLG9CQUE0QjtBQUNoQyxJQUFJLGdCQUE0QjtBQUNoQyxJQUFJLGFBQTRCO0FBQ2hDLElBQUksYUFBNEI7QUFDaEMsSUFBSSxhQUE0QjtBQUNoQyxJQUFJLGNBQTRCO0FBQ2hDLElBQUksb0JBQTRCO0FBQ2hDLElBQUksZ0JBQTRCO0FBQ2hDLElBQUkscUJBQTRCO0FBQ2hDLElBQUksMkJBQTRCO0FBQ2hDLElBQUksNEJBQTRCO0FBQ2hDLElBQUksb0JBQTRCO0FBQ2hDLElBQUksMEJBQTRCO0FBQ2hDLElBQUkscUJBQTRCO0FBQ2hDLElBQUksMkJBQTRCO0FBRWhDLElBQUksbUJBQW1CLENBQUM7QUFFeEIsaUJBQWlCLENBQUksSUFBTTtBQUMzQixpQkFBaUIsQ0FBSSxJQUFNO0FBQzNCLGlCQUFpQixDQUFJLElBQU07QUFDM0IsaUJBQWlCLENBQUksSUFBTTtBQUMzQixpQkFBaUIsRUFBSSxJQUFNO0FBQzNCLGlCQUFpQixFQUFJLElBQU07QUFDM0IsaUJBQWlCLEVBQUksSUFBTTtBQUMzQixpQkFBaUIsRUFBSSxJQUFNO0FBQzNCLGlCQUFpQixFQUFJLElBQU07QUFDM0IsaUJBQWlCLEVBQUksSUFBTTtBQUMzQixpQkFBaUIsRUFBSSxJQUFNO0FBQzNCLGlCQUFpQixHQUFJLElBQU07QUFDM0IsaUJBQWlCLEdBQUksSUFBTTtBQUMzQixpQkFBaUIsSUFBTSxJQUFJO0FBQzNCLGlCQUFpQixJQUFNLElBQUk7QUFFM0IsSUFBSSw2QkFBNkI7QUFBQSxFQUMvQjtBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBTztBQUFBLEVBQU87QUFBQSxFQUFPO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUMzQztBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBTTtBQUFBLEVBQU07QUFBQSxFQUFNO0FBQUEsRUFBTztBQUFBLEVBQU87QUFDNUM7QUFFQSxJQUFJLDJCQUEyQjtBQUUvQixTQUFTLGdCQUFnQkQsU0FBUUQsTUFBSztBQUNwQyxNQUFJLFFBQVEsTUFBTSxPQUFPLFFBQVEsS0FBSyxPQUFPRTtBQUU3QyxNQUFJRixTQUFRLEtBQU0sUUFBTyxDQUFDO0FBRTFCLFdBQVMsQ0FBQztBQUNWLFNBQU8sT0FBTyxLQUFLQSxJQUFHO0FBRXRCLE9BQUssUUFBUSxHQUFHLFNBQVMsS0FBSyxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUc7QUFDaEUsVUFBTSxLQUFLLEtBQUs7QUFDaEIsWUFBUSxPQUFPQSxLQUFJLEdBQUcsQ0FBQztBQUV2QixRQUFJLElBQUksTUFBTSxHQUFHLENBQUMsTUFBTSxNQUFNO0FBQzVCLFlBQU0sdUJBQXVCLElBQUksTUFBTSxDQUFDO0FBQUEsSUFDMUM7QUFDQSxJQUFBRSxRQUFPRCxRQUFPLGdCQUFnQixVQUFVLEVBQUUsR0FBRztBQUU3QyxRQUFJQyxTQUFRLGdCQUFnQixLQUFLQSxNQUFLLGNBQWMsS0FBSyxHQUFHO0FBQzFELGNBQVFBLE1BQUssYUFBYSxLQUFLO0FBQUEsSUFDakM7QUFFQSxXQUFPLEdBQUcsSUFBSTtBQUFBLEVBQ2hCO0FBRUEsU0FBTztBQUNUO0FBRUEsU0FBUyxVQUFVLFdBQVc7QUFDNUIsTUFBSSxRQUFRLFFBQVE7QUFFcEIsV0FBUyxVQUFVLFNBQVMsRUFBRSxFQUFFLFlBQVk7QUFFNUMsTUFBSSxhQUFhLEtBQU07QUFDckIsYUFBUztBQUNULGFBQVM7QUFBQSxFQUNYLFdBQVcsYUFBYSxPQUFRO0FBQzlCLGFBQVM7QUFDVCxhQUFTO0FBQUEsRUFDWCxXQUFXLGFBQWEsWUFBWTtBQUNsQyxhQUFTO0FBQ1QsYUFBUztBQUFBLEVBQ1gsT0FBTztBQUNMLFVBQU0sSUFBSSxVQUFVLCtEQUErRDtBQUFBLEVBQ3JGO0FBRUEsU0FBTyxPQUFPLFNBQVMsT0FBTyxPQUFPLEtBQUssU0FBUyxPQUFPLE1BQU0sSUFBSTtBQUN0RTtBQUdBLElBQUksc0JBQXNCO0FBQTFCLElBQ0ksc0JBQXNCO0FBRTFCLFNBQVMsTUFBTSxTQUFTO0FBQ3RCLE9BQUssU0FBZ0IsUUFBUSxRQUFRLEtBQUs7QUFDMUMsT0FBSyxTQUFnQixLQUFLLElBQUksR0FBSSxRQUFRLFFBQVEsS0FBSyxDQUFFO0FBQ3pELE9BQUssZ0JBQWdCLFFBQVEsZUFBZSxLQUFLO0FBQ2pELE9BQUssY0FBZ0IsUUFBUSxhQUFhLEtBQUs7QUFDL0MsT0FBSyxZQUFpQixPQUFPLFVBQVUsUUFBUSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsV0FBVztBQUN2RixPQUFLLFdBQWdCLGdCQUFnQixLQUFLLFFBQVEsUUFBUSxRQUFRLEtBQUssSUFBSTtBQUMzRSxPQUFLLFdBQWdCLFFBQVEsVUFBVSxLQUFLO0FBQzVDLE9BQUssWUFBZ0IsUUFBUSxXQUFXLEtBQUs7QUFDN0MsT0FBSyxTQUFnQixRQUFRLFFBQVEsS0FBSztBQUMxQyxPQUFLLGVBQWdCLFFBQVEsY0FBYyxLQUFLO0FBQ2hELE9BQUssZUFBZ0IsUUFBUSxjQUFjLEtBQUs7QUFDaEQsT0FBSyxjQUFnQixRQUFRLGFBQWEsTUFBTSxNQUFNLHNCQUFzQjtBQUM1RSxPQUFLLGNBQWdCLFFBQVEsYUFBYSxLQUFLO0FBQy9DLE9BQUssV0FBZ0IsT0FBTyxRQUFRLFVBQVUsTUFBTSxhQUFhLFFBQVEsVUFBVSxJQUFJO0FBRXZGLE9BQUssZ0JBQWdCLEtBQUssT0FBTztBQUNqQyxPQUFLLGdCQUFnQixLQUFLLE9BQU87QUFFakMsT0FBSyxNQUFNO0FBQ1gsT0FBSyxTQUFTO0FBRWQsT0FBSyxhQUFhLENBQUM7QUFDbkIsT0FBSyxpQkFBaUI7QUFDeEI7QUFHQSxTQUFTLGFBQWEsUUFBUSxRQUFRO0FBQ3BDLE1BQUksTUFBTSxPQUFPLE9BQU8sS0FBSyxNQUFNLEdBQy9CLFdBQVcsR0FDWCxPQUFPLElBQ1AsU0FBUyxJQUNULE1BQ0EsU0FBUyxPQUFPO0FBRXBCLFNBQU8sV0FBVyxRQUFRO0FBQ3hCLFdBQU8sT0FBTyxRQUFRLE1BQU0sUUFBUTtBQUNwQyxRQUFJLFNBQVMsSUFBSTtBQUNmLGFBQU8sT0FBTyxNQUFNLFFBQVE7QUFDNUIsaUJBQVc7QUFBQSxJQUNiLE9BQU87QUFDTCxhQUFPLE9BQU8sTUFBTSxVQUFVLE9BQU8sQ0FBQztBQUN0QyxpQkFBVyxPQUFPO0FBQUEsSUFDcEI7QUFFQSxRQUFJLEtBQUssVUFBVSxTQUFTLEtBQU0sV0FBVTtBQUU1QyxjQUFVO0FBQUEsRUFDWjtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsaUJBQWlCLE9BQU8sT0FBTztBQUN0QyxTQUFPLE9BQU8sT0FBTyxPQUFPLEtBQUssTUFBTSxTQUFTLEtBQUs7QUFDdkQ7QUFFQSxTQUFTLHNCQUFzQixPQUFPRSxNQUFLO0FBQ3pDLE1BQUksT0FBTyxRQUFRRjtBQUVuQixPQUFLLFFBQVEsR0FBRyxTQUFTLE1BQU0sY0FBYyxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUc7QUFDL0UsSUFBQUEsUUFBTyxNQUFNLGNBQWMsS0FBSztBQUVoQyxRQUFJQSxNQUFLLFFBQVFFLElBQUcsR0FBRztBQUNyQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFHQSxTQUFTLGFBQWEsR0FBRztBQUN2QixTQUFPLE1BQU0sY0FBYyxNQUFNO0FBQ25DO0FBTUEsU0FBUyxZQUFZLEdBQUc7QUFDdEIsU0FBUyxNQUFXLEtBQUssS0FBSyxPQUNyQixPQUFXLEtBQUssS0FBSyxTQUFhLE1BQU0sUUFBVSxNQUFNLFFBQ3hELFNBQVcsS0FBSyxLQUFLLFNBQWEsTUFBTSxZQUN4QyxTQUFXLEtBQUssS0FBSztBQUNoQztBQU9BLFNBQVMscUJBQXFCLEdBQUc7QUFDL0IsU0FBTyxZQUFZLENBQUMsS0FDZixNQUFNLFlBRU4sTUFBTSx3QkFDTixNQUFNO0FBQ2I7QUFXQSxTQUFTLFlBQVksR0FBRyxNQUFNLFNBQVM7QUFDckMsTUFBSSx3QkFBd0IscUJBQXFCLENBQUM7QUFDbEQsTUFBSSxZQUFZLHlCQUF5QixDQUFDLGFBQWEsQ0FBQztBQUN4RDtBQUFBO0FBQUEsS0FFRTtBQUFBO0FBQUEsTUFDRTtBQUFBLFFBQ0UseUJBRUcsTUFBTSxjQUNOLE1BQU0sNEJBQ04sTUFBTSw2QkFDTixNQUFNLDJCQUNOLE1BQU0sNkJBR1YsTUFBTSxjQUNOLEVBQUUsU0FBUyxjQUFjLENBQUMsY0FDekIscUJBQXFCLElBQUksS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLLE1BQU0sY0FDM0QsU0FBUyxjQUFjO0FBQUE7QUFDL0I7QUFHQSxTQUFTLGlCQUFpQixHQUFHO0FBSTNCLFNBQU8sWUFBWSxDQUFDLEtBQUssTUFBTSxZQUMxQixDQUFDLGFBQWEsQ0FBQyxLQUdmLE1BQU0sY0FDTixNQUFNLGlCQUNOLE1BQU0sY0FDTixNQUFNLGNBQ04sTUFBTSw0QkFDTixNQUFNLDZCQUNOLE1BQU0sMkJBQ04sTUFBTSw0QkFFTixNQUFNLGNBQ04sTUFBTSxrQkFDTixNQUFNLGlCQUNOLE1BQU0sb0JBQ04sTUFBTSxzQkFDTixNQUFNLGVBQ04sTUFBTSxxQkFDTixNQUFNLHFCQUNOLE1BQU0scUJBRU4sTUFBTSxnQkFDTixNQUFNLHNCQUNOLE1BQU07QUFDYjtBQUdBLFNBQVMsZ0JBQWdCLEdBQUc7QUFFMUIsU0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLE1BQU07QUFDbkM7QUFHQSxTQUFTLFlBQVksUUFBUSxLQUFLO0FBQ2hDLE1BQUksUUFBUSxPQUFPLFdBQVcsR0FBRyxHQUFHO0FBQ3BDLE1BQUksU0FBUyxTQUFVLFNBQVMsU0FBVSxNQUFNLElBQUksT0FBTyxRQUFRO0FBQ2pFLGFBQVMsT0FBTyxXQUFXLE1BQU0sQ0FBQztBQUNsQyxRQUFJLFVBQVUsU0FBVSxVQUFVLE9BQVE7QUFFeEMsY0FBUSxRQUFRLFNBQVUsT0FBUSxTQUFTLFFBQVM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFHQSxTQUFTLG9CQUFvQixRQUFRO0FBQ25DLE1BQUksaUJBQWlCO0FBQ3JCLFNBQU8sZUFBZSxLQUFLLE1BQU07QUFDbkM7QUFFQSxJQUFJLGNBQWdCO0FBQXBCLElBQ0ksZUFBZ0I7QUFEcEIsSUFFSSxnQkFBZ0I7QUFGcEIsSUFHSSxlQUFnQjtBQUhwQixJQUlJLGVBQWdCO0FBU3BCLFNBQVMsa0JBQWtCLFFBQVEsZ0JBQWdCLGdCQUFnQixXQUNqRSxtQkFBbUIsYUFBYSxhQUFhLFNBQVM7QUFFdEQsTUFBSTtBQUNKLE1BQUksT0FBTztBQUNYLE1BQUksV0FBVztBQUNmLE1BQUksZUFBZTtBQUNuQixNQUFJLGtCQUFrQjtBQUN0QixNQUFJLG1CQUFtQixjQUFjO0FBQ3JDLE1BQUksb0JBQW9CO0FBQ3hCLE1BQUksUUFBUSxpQkFBaUIsWUFBWSxRQUFRLENBQUMsQ0FBQyxLQUN4QyxnQkFBZ0IsWUFBWSxRQUFRLE9BQU8sU0FBUyxDQUFDLENBQUM7QUFFakUsTUFBSSxrQkFBa0IsYUFBYTtBQUdqQyxTQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxRQUFRLFFBQVUsS0FBSyxJQUFJLEtBQUs7QUFDN0QsYUFBTyxZQUFZLFFBQVEsQ0FBQztBQUM1QixVQUFJLENBQUMsWUFBWSxJQUFJLEdBQUc7QUFDdEIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxjQUFRLFNBQVMsWUFBWSxNQUFNLFVBQVUsT0FBTztBQUNwRCxpQkFBVztBQUFBLElBQ2I7QUFBQSxFQUNGLE9BQU87QUFFTCxTQUFLLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxRQUFRLFFBQVUsS0FBSyxJQUFJLEtBQUs7QUFDN0QsYUFBTyxZQUFZLFFBQVEsQ0FBQztBQUM1QixVQUFJLFNBQVMsZ0JBQWdCO0FBQzNCLHVCQUFlO0FBRWYsWUFBSSxrQkFBa0I7QUFDcEIsNEJBQWtCO0FBQUEsVUFFZixJQUFJLG9CQUFvQixJQUFJLGFBQzVCLE9BQU8sb0JBQW9CLENBQUMsTUFBTTtBQUNyQyw4QkFBb0I7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsV0FBVyxDQUFDLFlBQVksSUFBSSxHQUFHO0FBQzdCLGVBQU87QUFBQSxNQUNUO0FBQ0EsY0FBUSxTQUFTLFlBQVksTUFBTSxVQUFVLE9BQU87QUFDcEQsaUJBQVc7QUFBQSxJQUNiO0FBRUEsc0JBQWtCLG1CQUFvQixxQkFDbkMsSUFBSSxvQkFBb0IsSUFBSSxhQUM1QixPQUFPLG9CQUFvQixDQUFDLE1BQU07QUFBQSxFQUN2QztBQUlBLE1BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUI7QUFHckMsUUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLGtCQUFrQixNQUFNLEdBQUc7QUFDdkQsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPLGdCQUFnQixzQkFBc0IsZUFBZTtBQUFBLEVBQzlEO0FBRUEsTUFBSSxpQkFBaUIsS0FBSyxvQkFBb0IsTUFBTSxHQUFHO0FBQ3JELFdBQU87QUFBQSxFQUNUO0FBR0EsTUFBSSxDQUFDLGFBQWE7QUFDaEIsV0FBTyxrQkFBa0IsZUFBZTtBQUFBLEVBQzFDO0FBQ0EsU0FBTyxnQkFBZ0Isc0JBQXNCLGVBQWU7QUFDOUQ7QUFRQSxTQUFTLFlBQVksT0FBTyxRQUFRLE9BQU8sT0FBTyxTQUFTO0FBQ3pELFFBQU0sUUFBUSxXQUFZO0FBQ3hCLFFBQUksT0FBTyxXQUFXLEdBQUc7QUFDdkIsYUFBTyxNQUFNLGdCQUFnQixzQkFBc0IsT0FBTztBQUFBLElBQzVEO0FBQ0EsUUFBSSxDQUFDLE1BQU0sY0FBYztBQUN2QixVQUFJLDJCQUEyQixRQUFRLE1BQU0sTUFBTSxNQUFNLHlCQUF5QixLQUFLLE1BQU0sR0FBRztBQUM5RixlQUFPLE1BQU0sZ0JBQWdCLHNCQUF1QixNQUFNLFNBQVMsTUFBUSxNQUFNLFNBQVM7QUFBQSxNQUM1RjtBQUFBLElBQ0Y7QUFFQSxRQUFJLFNBQVMsTUFBTSxTQUFTLEtBQUssSUFBSSxHQUFHLEtBQUs7QUFRN0MsUUFBSSxZQUFZLE1BQU0sY0FBYyxLQUNoQyxLQUFLLEtBQUssSUFBSSxLQUFLLElBQUksTUFBTSxXQUFXLEVBQUUsR0FBRyxNQUFNLFlBQVksTUFBTTtBQUd6RSxRQUFJLGlCQUFpQixTQUVmLE1BQU0sWUFBWSxNQUFNLFNBQVMsTUFBTTtBQUM3QyxhQUFTLGNBQWNDLFNBQVE7QUFDN0IsYUFBTyxzQkFBc0IsT0FBT0EsT0FBTTtBQUFBLElBQzVDO0FBRUEsWUFBUTtBQUFBLE1BQWtCO0FBQUEsTUFBUTtBQUFBLE1BQWdCLE1BQU07QUFBQSxNQUFRO0FBQUEsTUFDOUQ7QUFBQSxNQUFlLE1BQU07QUFBQSxNQUFhLE1BQU0sZUFBZSxDQUFDO0FBQUEsTUFBTztBQUFBLElBQU8sR0FBRztBQUFBLE1BRXpFLEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVCxLQUFLO0FBQ0gsZUFBTyxNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUksSUFBSTtBQUFBLE1BQzVDLEtBQUs7QUFDSCxlQUFPLE1BQU0sWUFBWSxRQUFRLE1BQU0sTUFBTSxJQUN6QyxrQkFBa0IsYUFBYSxRQUFRLE1BQU0sQ0FBQztBQUFBLE1BQ3BELEtBQUs7QUFDSCxlQUFPLE1BQU0sWUFBWSxRQUFRLE1BQU0sTUFBTSxJQUN6QyxrQkFBa0IsYUFBYSxXQUFXLFFBQVEsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUFBLE1BQzNFLEtBQUs7QUFDSCxlQUFPLE1BQU0sYUFBYSxNQUFNLElBQUk7QUFBQSxNQUN0QztBQUNFLGNBQU0sSUFBSSxVQUFVLHdDQUF3QztBQUFBLElBQ2hFO0FBQUEsRUFDRixHQUFFO0FBQ0o7QUFHQSxTQUFTLFlBQVksUUFBUSxnQkFBZ0I7QUFDM0MsTUFBSSxrQkFBa0Isb0JBQW9CLE1BQU0sSUFBSSxPQUFPLGNBQWMsSUFBSTtBQUc3RSxNQUFJLE9BQWdCLE9BQU8sT0FBTyxTQUFTLENBQUMsTUFBTTtBQUNsRCxNQUFJLE9BQU8sU0FBUyxPQUFPLE9BQU8sU0FBUyxDQUFDLE1BQU0sUUFBUSxXQUFXO0FBQ3JFLE1BQUksUUFBUSxPQUFPLE1BQU8sT0FBTyxLQUFLO0FBRXRDLFNBQU8sa0JBQWtCLFFBQVE7QUFDbkM7QUFHQSxTQUFTLGtCQUFrQixRQUFRO0FBQ2pDLFNBQU8sT0FBTyxPQUFPLFNBQVMsQ0FBQyxNQUFNLE9BQU8sT0FBTyxNQUFNLEdBQUcsRUFBRSxJQUFJO0FBQ3BFO0FBSUEsU0FBUyxXQUFXLFFBQVEsT0FBTztBQUtqQyxNQUFJLFNBQVM7QUFHYixNQUFJLFVBQVUsV0FBWTtBQUN4QixRQUFJLFNBQVMsT0FBTyxRQUFRLElBQUk7QUFDaEMsYUFBUyxXQUFXLEtBQUssU0FBUyxPQUFPO0FBQ3pDLFdBQU8sWUFBWTtBQUNuQixXQUFPLFNBQVMsT0FBTyxNQUFNLEdBQUcsTUFBTSxHQUFHLEtBQUs7QUFBQSxFQUNoRCxHQUFFO0FBRUYsTUFBSSxtQkFBbUIsT0FBTyxDQUFDLE1BQU0sUUFBUSxPQUFPLENBQUMsTUFBTTtBQUMzRCxNQUFJO0FBR0osTUFBSTtBQUNKLFNBQVEsUUFBUSxPQUFPLEtBQUssTUFBTSxHQUFJO0FBQ3BDLFFBQUksU0FBUyxNQUFNLENBQUMsR0FBRyxPQUFPLE1BQU0sQ0FBQztBQUNyQyxtQkFBZ0IsS0FBSyxDQUFDLE1BQU07QUFDNUIsY0FBVSxVQUNMLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLFNBQVMsS0FDOUMsT0FBTyxNQUNULFNBQVMsTUFBTSxLQUFLO0FBQ3hCLHVCQUFtQjtBQUFBLEVBQ3JCO0FBRUEsU0FBTztBQUNUO0FBTUEsU0FBUyxTQUFTLE1BQU0sT0FBTztBQUM3QixNQUFJLFNBQVMsTUFBTSxLQUFLLENBQUMsTUFBTSxJQUFLLFFBQU87QUFHM0MsTUFBSSxVQUFVO0FBQ2QsTUFBSTtBQUVKLE1BQUksUUFBUSxHQUFHLEtBQUssT0FBTyxHQUFHLE9BQU87QUFDckMsTUFBSSxTQUFTO0FBTWIsU0FBUSxRQUFRLFFBQVEsS0FBSyxJQUFJLEdBQUk7QUFDbkMsV0FBTyxNQUFNO0FBRWIsUUFBSSxPQUFPLFFBQVEsT0FBTztBQUN4QixZQUFPLE9BQU8sUUFBUyxPQUFPO0FBQzlCLGdCQUFVLE9BQU8sS0FBSyxNQUFNLE9BQU8sR0FBRztBQUV0QyxjQUFRLE1BQU07QUFBQSxJQUNoQjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBSUEsWUFBVTtBQUVWLE1BQUksS0FBSyxTQUFTLFFBQVEsU0FBUyxPQUFPLE9BQU87QUFDL0MsY0FBVSxLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksT0FBTyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDaEUsT0FBTztBQUNMLGNBQVUsS0FBSyxNQUFNLEtBQUs7QUFBQSxFQUM1QjtBQUVBLFNBQU8sT0FBTyxNQUFNLENBQUM7QUFDdkI7QUFHQSxTQUFTLGFBQWEsUUFBUTtBQUM1QixNQUFJLFNBQVM7QUFDYixNQUFJLE9BQU87QUFDWCxNQUFJO0FBRUosV0FBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsUUFBUSxRQUFVLEtBQUssSUFBSSxLQUFLO0FBQ2pFLFdBQU8sWUFBWSxRQUFRLENBQUM7QUFDNUIsZ0JBQVksaUJBQWlCLElBQUk7QUFFakMsUUFBSSxDQUFDLGFBQWEsWUFBWSxJQUFJLEdBQUc7QUFDbkMsZ0JBQVUsT0FBTyxDQUFDO0FBQ2xCLFVBQUksUUFBUSxNQUFTLFdBQVUsT0FBTyxJQUFJLENBQUM7QUFBQSxJQUM3QyxPQUFPO0FBQ0wsZ0JBQVUsYUFBYSxVQUFVLElBQUk7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxTQUFTLGtCQUFrQixPQUFPLE9BQU8sUUFBUTtBQUMvQyxNQUFJLFVBQVUsSUFDVixPQUFVLE1BQU0sS0FDaEIsT0FDQSxRQUNBO0FBRUosT0FBSyxRQUFRLEdBQUcsU0FBUyxPQUFPLFFBQVEsUUFBUSxRQUFRLFNBQVMsR0FBRztBQUNsRSxZQUFRLE9BQU8sS0FBSztBQUVwQixRQUFJLE1BQU0sVUFBVTtBQUNsQixjQUFRLE1BQU0sU0FBUyxLQUFLLFFBQVEsT0FBTyxLQUFLLEdBQUcsS0FBSztBQUFBLElBQzFEO0FBR0EsUUFBSSxVQUFVLE9BQU8sT0FBTyxPQUFPLE9BQU8sS0FBSyxLQUMxQyxPQUFPLFVBQVUsZUFDakIsVUFBVSxPQUFPLE9BQU8sTUFBTSxPQUFPLEtBQUssR0FBSTtBQUVqRCxVQUFJLFlBQVksR0FBSSxZQUFXLE9BQU8sQ0FBQyxNQUFNLGVBQWUsTUFBTTtBQUNsRSxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxNQUFNO0FBQ1osUUFBTSxPQUFPLE1BQU0sVUFBVTtBQUMvQjtBQUVBLFNBQVMsbUJBQW1CLE9BQU8sT0FBTyxRQUFRLFNBQVM7QUFDekQsTUFBSSxVQUFVLElBQ1YsT0FBVSxNQUFNLEtBQ2hCLE9BQ0EsUUFDQTtBQUVKLE9BQUssUUFBUSxHQUFHLFNBQVMsT0FBTyxRQUFRLFFBQVEsUUFBUSxTQUFTLEdBQUc7QUFDbEUsWUFBUSxPQUFPLEtBQUs7QUFFcEIsUUFBSSxNQUFNLFVBQVU7QUFDbEIsY0FBUSxNQUFNLFNBQVMsS0FBSyxRQUFRLE9BQU8sS0FBSyxHQUFHLEtBQUs7QUFBQSxJQUMxRDtBQUdBLFFBQUksVUFBVSxPQUFPLFFBQVEsR0FBRyxPQUFPLE1BQU0sTUFBTSxPQUFPLElBQUksS0FDekQsT0FBTyxVQUFVLGVBQ2pCLFVBQVUsT0FBTyxRQUFRLEdBQUcsTUFBTSxNQUFNLE1BQU0sT0FBTyxJQUFJLEdBQUk7QUFFaEUsVUFBSSxDQUFDLFdBQVcsWUFBWSxJQUFJO0FBQzlCLG1CQUFXLGlCQUFpQixPQUFPLEtBQUs7QUFBQSxNQUMxQztBQUVBLFVBQUksTUFBTSxRQUFRLG1CQUFtQixNQUFNLEtBQUssV0FBVyxDQUFDLEdBQUc7QUFDN0QsbUJBQVc7QUFBQSxNQUNiLE9BQU87QUFDTCxtQkFBVztBQUFBLE1BQ2I7QUFFQSxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxNQUFNO0FBQ1osUUFBTSxPQUFPLFdBQVc7QUFDMUI7QUFFQSxTQUFTLGlCQUFpQixPQUFPLE9BQU8sUUFBUTtBQUM5QyxNQUFJLFVBQWdCLElBQ2hCLE9BQWdCLE1BQU0sS0FDdEIsZ0JBQWdCLE9BQU8sS0FBSyxNQUFNLEdBQ2xDLE9BQ0EsUUFDQSxXQUNBLGFBQ0E7QUFFSixPQUFLLFFBQVEsR0FBRyxTQUFTLGNBQWMsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBRXpFLGlCQUFhO0FBQ2IsUUFBSSxZQUFZLEdBQUksZUFBYztBQUVsQyxRQUFJLE1BQU0sYUFBYyxlQUFjO0FBRXRDLGdCQUFZLGNBQWMsS0FBSztBQUMvQixrQkFBYyxPQUFPLFNBQVM7QUFFOUIsUUFBSSxNQUFNLFVBQVU7QUFDbEIsb0JBQWMsTUFBTSxTQUFTLEtBQUssUUFBUSxXQUFXLFdBQVc7QUFBQSxJQUNsRTtBQUVBLFFBQUksQ0FBQyxVQUFVLE9BQU8sT0FBTyxXQUFXLE9BQU8sS0FBSyxHQUFHO0FBQ3JEO0FBQUEsSUFDRjtBQUVBLFFBQUksTUFBTSxLQUFLLFNBQVMsS0FBTSxlQUFjO0FBRTVDLGtCQUFjLE1BQU0sUUFBUSxNQUFNLGVBQWUsTUFBTSxNQUFNLE9BQU8sTUFBTSxlQUFlLEtBQUs7QUFFOUYsUUFBSSxDQUFDLFVBQVUsT0FBTyxPQUFPLGFBQWEsT0FBTyxLQUFLLEdBQUc7QUFDdkQ7QUFBQSxJQUNGO0FBRUEsa0JBQWMsTUFBTTtBQUdwQixlQUFXO0FBQUEsRUFDYjtBQUVBLFFBQU0sTUFBTTtBQUNaLFFBQU0sT0FBTyxNQUFNLFVBQVU7QUFDL0I7QUFFQSxTQUFTLGtCQUFrQixPQUFPLE9BQU8sUUFBUSxTQUFTO0FBQ3hELE1BQUksVUFBZ0IsSUFDaEIsT0FBZ0IsTUFBTSxLQUN0QixnQkFBZ0IsT0FBTyxLQUFLLE1BQU0sR0FDbEMsT0FDQSxRQUNBLFdBQ0EsYUFDQSxjQUNBO0FBR0osTUFBSSxNQUFNLGFBQWEsTUFBTTtBQUUzQixrQkFBYyxLQUFLO0FBQUEsRUFDckIsV0FBVyxPQUFPLE1BQU0sYUFBYSxZQUFZO0FBRS9DLGtCQUFjLEtBQUssTUFBTSxRQUFRO0FBQUEsRUFDbkMsV0FBVyxNQUFNLFVBQVU7QUFFekIsVUFBTSxJQUFJLFVBQVUsMENBQTBDO0FBQUEsRUFDaEU7QUFFQSxPQUFLLFFBQVEsR0FBRyxTQUFTLGNBQWMsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ3pFLGlCQUFhO0FBRWIsUUFBSSxDQUFDLFdBQVcsWUFBWSxJQUFJO0FBQzlCLG9CQUFjLGlCQUFpQixPQUFPLEtBQUs7QUFBQSxJQUM3QztBQUVBLGdCQUFZLGNBQWMsS0FBSztBQUMvQixrQkFBYyxPQUFPLFNBQVM7QUFFOUIsUUFBSSxNQUFNLFVBQVU7QUFDbEIsb0JBQWMsTUFBTSxTQUFTLEtBQUssUUFBUSxXQUFXLFdBQVc7QUFBQSxJQUNsRTtBQUVBLFFBQUksQ0FBQyxVQUFVLE9BQU8sUUFBUSxHQUFHLFdBQVcsTUFBTSxNQUFNLElBQUksR0FBRztBQUM3RDtBQUFBLElBQ0Y7QUFFQSxtQkFBZ0IsTUFBTSxRQUFRLFFBQVEsTUFBTSxRQUFRLE9BQ3BDLE1BQU0sUUFBUSxNQUFNLEtBQUssU0FBUztBQUVsRCxRQUFJLGNBQWM7QUFDaEIsVUFBSSxNQUFNLFFBQVEsbUJBQW1CLE1BQU0sS0FBSyxXQUFXLENBQUMsR0FBRztBQUM3RCxzQkFBYztBQUFBLE1BQ2hCLE9BQU87QUFDTCxzQkFBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUVBLGtCQUFjLE1BQU07QUFFcEIsUUFBSSxjQUFjO0FBQ2hCLG9CQUFjLGlCQUFpQixPQUFPLEtBQUs7QUFBQSxJQUM3QztBQUVBLFFBQUksQ0FBQyxVQUFVLE9BQU8sUUFBUSxHQUFHLGFBQWEsTUFBTSxZQUFZLEdBQUc7QUFDakU7QUFBQSxJQUNGO0FBRUEsUUFBSSxNQUFNLFFBQVEsbUJBQW1CLE1BQU0sS0FBSyxXQUFXLENBQUMsR0FBRztBQUM3RCxvQkFBYztBQUFBLElBQ2hCLE9BQU87QUFDTCxvQkFBYztBQUFBLElBQ2hCO0FBRUEsa0JBQWMsTUFBTTtBQUdwQixlQUFXO0FBQUEsRUFDYjtBQUVBLFFBQU0sTUFBTTtBQUNaLFFBQU0sT0FBTyxXQUFXO0FBQzFCO0FBRUEsU0FBUyxXQUFXLE9BQU8sUUFBUSxVQUFVO0FBQzNDLE1BQUksU0FBUyxVQUFVLE9BQU8sUUFBUUgsT0FBTTtBQUU1QyxhQUFXLFdBQVcsTUFBTSxnQkFBZ0IsTUFBTTtBQUVsRCxPQUFLLFFBQVEsR0FBRyxTQUFTLFNBQVMsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ3BFLElBQUFBLFFBQU8sU0FBUyxLQUFLO0FBRXJCLFNBQUtBLE1BQUssY0FBZUEsTUFBSyxlQUN6QixDQUFDQSxNQUFLLGNBQWdCLE9BQU8sV0FBVyxZQUFjLGtCQUFrQkEsTUFBSyxnQkFDN0UsQ0FBQ0EsTUFBSyxhQUFjQSxNQUFLLFVBQVUsTUFBTSxJQUFJO0FBRWhELFVBQUksVUFBVTtBQUNaLFlBQUlBLE1BQUssU0FBU0EsTUFBSyxlQUFlO0FBQ3BDLGdCQUFNLE1BQU1BLE1BQUssY0FBYyxNQUFNO0FBQUEsUUFDdkMsT0FBTztBQUNMLGdCQUFNLE1BQU1BLE1BQUs7QUFBQSxRQUNuQjtBQUFBLE1BQ0YsT0FBTztBQUNMLGNBQU0sTUFBTTtBQUFBLE1BQ2Q7QUFFQSxVQUFJQSxNQUFLLFdBQVc7QUFDbEIsZ0JBQVEsTUFBTSxTQUFTQSxNQUFLLEdBQUcsS0FBS0EsTUFBSztBQUV6QyxZQUFJLFVBQVUsS0FBS0EsTUFBSyxTQUFTLE1BQU0scUJBQXFCO0FBQzFELG9CQUFVQSxNQUFLLFVBQVUsUUFBUSxLQUFLO0FBQUEsUUFDeEMsV0FBVyxnQkFBZ0IsS0FBS0EsTUFBSyxXQUFXLEtBQUssR0FBRztBQUN0RCxvQkFBVUEsTUFBSyxVQUFVLEtBQUssRUFBRSxRQUFRLEtBQUs7QUFBQSxRQUMvQyxPQUFPO0FBQ0wsZ0JBQU0sSUFBSSxVQUFVLE9BQU9BLE1BQUssTUFBTSxpQ0FBaUMsUUFBUSxTQUFTO0FBQUEsUUFDMUY7QUFFQSxjQUFNLE9BQU87QUFBQSxNQUNmO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBS0EsU0FBUyxVQUFVLE9BQU8sT0FBTyxRQUFRLE9BQU8sU0FBUyxPQUFPLFlBQVk7QUFDMUUsUUFBTSxNQUFNO0FBQ1osUUFBTSxPQUFPO0FBRWIsTUFBSSxDQUFDLFdBQVcsT0FBTyxRQUFRLEtBQUssR0FBRztBQUNyQyxlQUFXLE9BQU8sUUFBUSxJQUFJO0FBQUEsRUFDaEM7QUFFQSxNQUFJQSxRQUFPLFVBQVUsS0FBSyxNQUFNLElBQUk7QUFDcEMsTUFBSSxVQUFVO0FBQ2QsTUFBSTtBQUVKLE1BQUksT0FBTztBQUNULFlBQVMsTUFBTSxZQUFZLEtBQUssTUFBTSxZQUFZO0FBQUEsRUFDcEQ7QUFFQSxNQUFJLGdCQUFnQkEsVUFBUyxxQkFBcUJBLFVBQVMsa0JBQ3ZELGdCQUNBO0FBRUosTUFBSSxlQUFlO0FBQ2pCLHFCQUFpQixNQUFNLFdBQVcsUUFBUSxNQUFNO0FBQ2hELGdCQUFZLG1CQUFtQjtBQUFBLEVBQ2pDO0FBRUEsTUFBSyxNQUFNLFFBQVEsUUFBUSxNQUFNLFFBQVEsT0FBUSxhQUFjLE1BQU0sV0FBVyxLQUFLLFFBQVEsR0FBSTtBQUMvRixjQUFVO0FBQUEsRUFDWjtBQUVBLE1BQUksYUFBYSxNQUFNLGVBQWUsY0FBYyxHQUFHO0FBQ3JELFVBQU0sT0FBTyxVQUFVO0FBQUEsRUFDekIsT0FBTztBQUNMLFFBQUksaUJBQWlCLGFBQWEsQ0FBQyxNQUFNLGVBQWUsY0FBYyxHQUFHO0FBQ3ZFLFlBQU0sZUFBZSxjQUFjLElBQUk7QUFBQSxJQUN6QztBQUNBLFFBQUlBLFVBQVMsbUJBQW1CO0FBQzlCLFVBQUksU0FBVSxPQUFPLEtBQUssTUFBTSxJQUFJLEVBQUUsV0FBVyxHQUFJO0FBQ25ELDBCQUFrQixPQUFPLE9BQU8sTUFBTSxNQUFNLE9BQU87QUFDbkQsWUFBSSxXQUFXO0FBQ2IsZ0JBQU0sT0FBTyxVQUFVLGlCQUFpQixNQUFNO0FBQUEsUUFDaEQ7QUFBQSxNQUNGLE9BQU87QUFDTCx5QkFBaUIsT0FBTyxPQUFPLE1BQU0sSUFBSTtBQUN6QyxZQUFJLFdBQVc7QUFDYixnQkFBTSxPQUFPLFVBQVUsaUJBQWlCLE1BQU0sTUFBTTtBQUFBLFFBQ3REO0FBQUEsTUFDRjtBQUFBLElBQ0YsV0FBV0EsVUFBUyxrQkFBa0I7QUFDcEMsVUFBSSxTQUFVLE1BQU0sS0FBSyxXQUFXLEdBQUk7QUFDdEMsWUFBSSxNQUFNLGlCQUFpQixDQUFDLGNBQWMsUUFBUSxHQUFHO0FBQ25ELDZCQUFtQixPQUFPLFFBQVEsR0FBRyxNQUFNLE1BQU0sT0FBTztBQUFBLFFBQzFELE9BQU87QUFDTCw2QkFBbUIsT0FBTyxPQUFPLE1BQU0sTUFBTSxPQUFPO0FBQUEsUUFDdEQ7QUFDQSxZQUFJLFdBQVc7QUFDYixnQkFBTSxPQUFPLFVBQVUsaUJBQWlCLE1BQU07QUFBQSxRQUNoRDtBQUFBLE1BQ0YsT0FBTztBQUNMLDBCQUFrQixPQUFPLE9BQU8sTUFBTSxJQUFJO0FBQzFDLFlBQUksV0FBVztBQUNiLGdCQUFNLE9BQU8sVUFBVSxpQkFBaUIsTUFBTSxNQUFNO0FBQUEsUUFDdEQ7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXQSxVQUFTLG1CQUFtQjtBQUNyQyxVQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JCLG9CQUFZLE9BQU8sTUFBTSxNQUFNLE9BQU8sT0FBTyxPQUFPO0FBQUEsTUFDdEQ7QUFBQSxJQUNGLFdBQVdBLFVBQVMsc0JBQXNCO0FBQ3hDLGFBQU87QUFBQSxJQUNULE9BQU87QUFDTCxVQUFJLE1BQU0sWUFBYSxRQUFPO0FBQzlCLFlBQU0sSUFBSSxVQUFVLDRDQUE0Q0EsS0FBSTtBQUFBLElBQ3RFO0FBRUEsUUFBSSxNQUFNLFFBQVEsUUFBUSxNQUFNLFFBQVEsS0FBSztBQWMzQyxlQUFTO0FBQUEsUUFDUCxNQUFNLElBQUksQ0FBQyxNQUFNLE1BQU0sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLE1BQU07QUFBQSxNQUNwRCxFQUFFLFFBQVEsTUFBTSxLQUFLO0FBRXJCLFVBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxLQUFLO0FBQ3hCLGlCQUFTLE1BQU07QUFBQSxNQUNqQixXQUFXLE9BQU8sTUFBTSxHQUFHLEVBQUUsTUFBTSxzQkFBc0I7QUFDdkQsaUJBQVMsT0FBTyxPQUFPLE1BQU0sRUFBRTtBQUFBLE1BQ2pDLE9BQU87QUFDTCxpQkFBUyxPQUFPLFNBQVM7QUFBQSxNQUMzQjtBQUVBLFlBQU0sT0FBTyxTQUFTLE1BQU0sTUFBTTtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUVBLFNBQVMsdUJBQXVCLFFBQVEsT0FBTztBQUM3QyxNQUFJLFVBQVUsQ0FBQyxHQUNYLG9CQUFvQixDQUFDLEdBQ3JCLE9BQ0E7QUFFSixjQUFZLFFBQVEsU0FBUyxpQkFBaUI7QUFFOUMsT0FBSyxRQUFRLEdBQUcsU0FBUyxrQkFBa0IsUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQzdFLFVBQU0sV0FBVyxLQUFLLFFBQVEsa0JBQWtCLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDekQ7QUFDQSxRQUFNLGlCQUFpQixJQUFJLE1BQU0sTUFBTTtBQUN6QztBQUVBLFNBQVMsWUFBWSxRQUFRLFNBQVMsbUJBQW1CO0FBQ3ZELE1BQUksZUFDQSxPQUNBO0FBRUosTUFBSSxXQUFXLFFBQVEsT0FBTyxXQUFXLFVBQVU7QUFDakQsWUFBUSxRQUFRLFFBQVEsTUFBTTtBQUM5QixRQUFJLFVBQVUsSUFBSTtBQUNoQixVQUFJLGtCQUFrQixRQUFRLEtBQUssTUFBTSxJQUFJO0FBQzNDLDBCQUFrQixLQUFLLEtBQUs7QUFBQSxNQUM5QjtBQUFBLElBQ0YsT0FBTztBQUNMLGNBQVEsS0FBSyxNQUFNO0FBRW5CLFVBQUksTUFBTSxRQUFRLE1BQU0sR0FBRztBQUN6QixhQUFLLFFBQVEsR0FBRyxTQUFTLE9BQU8sUUFBUSxRQUFRLFFBQVEsU0FBUyxHQUFHO0FBQ2xFLHNCQUFZLE9BQU8sS0FBSyxHQUFHLFNBQVMsaUJBQWlCO0FBQUEsUUFDdkQ7QUFBQSxNQUNGLE9BQU87QUFDTCx3QkFBZ0IsT0FBTyxLQUFLLE1BQU07QUFFbEMsYUFBSyxRQUFRLEdBQUcsU0FBUyxjQUFjLFFBQVEsUUFBUSxRQUFRLFNBQVMsR0FBRztBQUN6RSxzQkFBWSxPQUFPLGNBQWMsS0FBSyxDQUFDLEdBQUcsU0FBUyxpQkFBaUI7QUFBQSxRQUN0RTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxPQUFPLE9BQU8sU0FBUztBQUM5QixZQUFVLFdBQVcsQ0FBQztBQUV0QixNQUFJLFFBQVEsSUFBSSxNQUFNLE9BQU87QUFFN0IsTUFBSSxDQUFDLE1BQU0sT0FBUSx3QkFBdUIsT0FBTyxLQUFLO0FBRXRELE1BQUksUUFBUTtBQUVaLE1BQUksTUFBTSxVQUFVO0FBQ2xCLFlBQVEsTUFBTSxTQUFTLEtBQUssRUFBRSxJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUs7QUFBQSxFQUN0RDtBQUVBLE1BQUksVUFBVSxPQUFPLEdBQUcsT0FBTyxNQUFNLElBQUksRUFBRyxRQUFPLE1BQU0sT0FBTztBQUVoRSxTQUFPO0FBQ1Q7QUFFQSxJQUFJLFNBQVM7QUFFYixJQUFJLFNBQVM7QUFBQSxFQUNaLE1BQU07QUFDUDtBQUVBLFNBQVMsUUFBUSxNQUFNLElBQUk7QUFDekIsU0FBTyxXQUFZO0FBQ2pCLFVBQU0sSUFBSSxNQUFNLG1CQUFtQixPQUFPLHdDQUMxQixLQUFLLHlDQUF5QztBQUFBLEVBQ2hFO0FBQ0Y7QUFTQSxJQUFJLE9BQXNCLE9BQU87QUFDakMsSUFBSSxVQUFzQixPQUFPO0FBQ2pDLElBQUksT0FBc0IsT0FBTztBQXFCakMsSUFBSSxXQUFzQixRQUFRLFlBQVksTUFBTTtBQUNwRCxJQUFJLGNBQXNCLFFBQVEsZUFBZSxTQUFTO0FBQzFELElBQUksV0FBc0IsUUFBUSxZQUFZLE1BQU07OztBRHR2SHBELElBQU0sZUFBVyxzQkFBSyxtQkFBUSxHQUFHLE9BQU87QUFDeEMsSUFBTSxtQkFBZSxrQkFBSyxVQUFVLFVBQVU7QUFDOUMsSUFBTSxnQkFBWSxrQkFBSyxVQUFVLE9BQU87QUFDeEMsSUFBTSxtQkFBZSxrQkFBSyxVQUFVLFVBQVU7QUFDOUMsSUFBTSxvQkFBZ0Isa0JBQUssVUFBVSxhQUFhO0FBTTNDLFNBQVMsYUFBc0I7QUFDcEMsYUFBTyxzQkFBVyxRQUFRO0FBQzVCO0FBRUEsU0FBUyxXQUFXLEdBQW1CO0FBQ3JDLE1BQUksRUFBRSxXQUFXLElBQUksS0FBSyxNQUFNLEtBQUs7QUFDbkMsZUFBTyxzQkFBSyxtQkFBUSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFBQSxFQUNuQztBQUNBLFNBQU87QUFDVDtBQUVPLFNBQVMsbUJBQWlDO0FBQy9DLE1BQUksS0FBQyxzQkFBVyxhQUFhLEVBQUcsUUFBTyxDQUFDO0FBQ3hDLE1BQUk7QUFDRixVQUFNLFVBQU0sd0JBQWEsZUFBZSxPQUFPO0FBQy9DLFdBQWEsS0FBSyxHQUFHLEtBQXNCLENBQUM7QUFBQSxFQUM5QyxRQUFRO0FBQ04sV0FBTyxDQUFDO0FBQUEsRUFDVjtBQUNGO0FBRU8sU0FBUyxZQUFZLE9BQWUsVUFBK0I7QUFDeEUsUUFBTSxVQUFNLHdCQUFhLFVBQVUsT0FBTztBQUMxQyxRQUFNLE1BQVcsS0FBSyxHQUFHO0FBR3pCLFFBQU0sV0FBWSxJQUFJLFlBQ25CLElBQUksY0FBMEMsQ0FBQztBQUNsRCxRQUFNLFFBQVMsSUFBSSxTQUFxQyxDQUFDO0FBRXpELFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxjQUFlLElBQUksZ0JBQTJCO0FBQUEsSUFDOUMsY0FBYztBQUFBLE1BQ1gsSUFBSSxnQkFBNEIsSUFBSSxrQkFBNkI7QUFBQSxJQUNwRTtBQUFBLElBQ0EsV0FBVyxXQUFZLElBQUksYUFBd0IsRUFBRTtBQUFBLElBQ3JELFVBQVU7QUFBQSxNQUNSLE9BQVEsU0FBUyxTQUFvQjtBQUFBLE1BQ3JDLFFBQVMsU0FBUyxVQUFxQjtBQUFBLE1BQ3ZDLGdCQUFpQixTQUFTLGtCQUE2QjtBQUFBLElBQ3pEO0FBQUEsSUFDQSxPQUFPLFFBQ0g7QUFBQSxNQUNFLFVBQVUsTUFBTTtBQUFBLE1BQ2hCLFVBQVUsTUFBTTtBQUFBLElBQ2xCLElBQ0E7QUFBQSxJQUNKLFFBQVEsSUFBSTtBQUFBLEVBQ2Q7QUFDRjtBQUVPLFNBQVMsbUJBQWtDO0FBQ2hELE1BQUksS0FBQyxzQkFBVyxZQUFZLEVBQUcsUUFBTyxDQUFDO0FBQ3ZDLFFBQU0sWUFBUSx1QkFBWSxZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLE9BQU8sS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDO0FBQy9GLFFBQU0sV0FBMEIsQ0FBQztBQUNqQyxhQUFXLFFBQVEsT0FBTztBQUN4QixVQUFNLFFBQVEsS0FBSyxRQUFRLFlBQVksRUFBRTtBQUN6QyxRQUFJO0FBQ0YsZUFBUyxLQUFLLFlBQVksV0FBTyxrQkFBSyxjQUFjLElBQUksQ0FBQyxDQUFDO0FBQUEsSUFDNUQsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGO0FBQ0EsUUFBTSxlQUFlLGlCQUFpQixFQUFFO0FBQ3hDLE1BQUksY0FBYztBQUNoQixhQUFTLEtBQUssQ0FBQyxHQUFHLE1BQU8sRUFBRSxVQUFVLGVBQWUsS0FBSyxFQUFFLFVBQVUsZUFBZSxJQUFJLENBQUU7QUFBQSxFQUM1RjtBQUNBLFNBQU87QUFDVDtBQXdDTyxTQUFTLFlBQ2QsY0FDQSxhQUNBLGdCQUN5QjtBQUN6QixRQUFNLGlCQUFhLGtCQUFLLGNBQWMsY0FBYyxXQUFXO0FBQy9ELFFBQU0sa0JBQWMsa0JBQUssWUFBWSxjQUFjO0FBQ25ELE1BQUksS0FBQyxzQkFBVyxXQUFXLEVBQUcsUUFBTztBQUNyQyxNQUFJO0FBQ0YsVUFBTSxVQUFNLHdCQUFhLGFBQWEsT0FBTztBQUM3QyxVQUFNLE1BQVcsS0FBSyxHQUFHO0FBRXpCLFFBQUk7QUFDSixVQUFNLGlCQUFhLGtCQUFLLFlBQVksYUFBYTtBQUNqRCxZQUFJLHNCQUFXLFVBQVUsR0FBRztBQUMxQixVQUFJO0FBQ0YsaUJBQVMsS0FBSyxVQUFNLHdCQUFhLFlBQVksT0FBTyxDQUFDO0FBQUEsTUFDdkQsUUFBUTtBQUFBLE1BRVI7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUFTLFFBQVEsV0FBWSxnQkFBZ0IsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFTO0FBQ3BGLFVBQU0sc0JBQWtCLDBCQUFXLGtCQUFLLFlBQVksa0JBQWtCLENBQUM7QUFFdkUsV0FBTztBQUFBLE1BQ0wsTUFBTyxJQUFJLFFBQW1CO0FBQUEsTUFDOUIsU0FBVSxJQUFJLFdBQXNCO0FBQUEsTUFDcEMsU0FBVSxJQUFJLFdBQXNCO0FBQUEsTUFDcEMsZUFBZ0IsSUFBSSxpQkFBNEI7QUFBQSxNQUNoRCxTQUFVLElBQUksV0FBc0I7QUFBQSxNQUNwQyxNQUFRLElBQUksUUFBbUI7QUFBQSxNQUMvQixLQUFLLElBQUk7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVPLFNBQVMsaUJBQ2QsY0FDQSxnQkFDZTtBQUNmLFFBQU0seUJBQXFCLGtCQUFLLGNBQWMsWUFBWTtBQUMxRCxNQUFJLEtBQUMsc0JBQVcsa0JBQWtCLEVBQUcsUUFBTyxDQUFDO0FBQzdDLE1BQUk7QUFDSixNQUFJO0FBQ0Ysa0JBQVUsdUJBQVksa0JBQWtCO0FBQUEsRUFDMUMsUUFBUTtBQUNOLFdBQU8sQ0FBQztBQUFBLEVBQ1Y7QUFDQSxRQUFNLFdBQTBCLENBQUM7QUFDakMsYUFBVyxTQUFTLFNBQVM7QUFDM0IsVUFBTSxlQUFXLGtCQUFLLG9CQUFvQixLQUFLO0FBQy9DLFFBQUk7QUFDRixVQUFJLEtBQUMsb0JBQVMsUUFBUSxFQUFFLFlBQVksRUFBRztBQUFBLElBQ3pDLFFBQVE7QUFDTjtBQUFBLElBQ0Y7QUFDQSxVQUFNLFVBQVUsWUFBWSxjQUFjLE9BQU8sY0FBYztBQUMvRCxRQUFJLFFBQVMsVUFBUyxLQUFLLE9BQU87QUFBQSxFQUNwQztBQUNBLFNBQU87QUFDVDtBQUVPLFNBQVMsZUFDZCxnQkFDcUQ7QUFDckQsUUFBTSxXQUFXLGlCQUFpQjtBQUNsQyxRQUFNLFNBQThELENBQUM7QUFDckUsYUFBVyxXQUFXLFVBQVU7QUFDOUIsVUFBTSxXQUFXLGlCQUFpQixRQUFRLE9BQU8sY0FBYztBQUMvRCxRQUFJLFNBQVMsU0FBUyxHQUFHO0FBQ3ZCLGFBQU8sS0FBSyxFQUFFLGNBQWMsUUFBUSxPQUFPLFNBQVMsQ0FBQztBQUFBLElBQ3ZEO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FFN01BLDJCQUEwQjtBQU8xQixTQUFTLGtCQUFrQixJQUFvQjtBQUM3QyxNQUNFLENBQUMsZ0ZBQWdGLEtBQUssRUFBRSxHQUN4RjtBQUNBLFVBQU0sSUFBSSxNQUFNLDhCQUE4QixLQUFLLFVBQVUsRUFBRSxDQUFDLEVBQUU7QUFBQSxFQUNwRTtBQUNBLFNBQU87QUFDVDtBQU1BLFNBQVMsbUJBQW1CLFFBQWdCLFlBQVksS0FBYztBQUNwRSxRQUFNLGFBQVMsZ0NBQVUsc0JBQXNCLENBQUMsR0FBRztBQUFBLElBQ2pELE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxFQUNYLENBQUM7QUFDRCxNQUFJLE9BQU8sTUFBTyxPQUFNLE9BQU87QUFDL0IsU0FBUSxPQUFPLFVBQXFCO0FBQ3RDO0FBRU8sU0FBUyxhQUFhLFdBQXlCO0FBQ3BELFFBQU0sU0FBUyxrQkFBa0IsU0FBUztBQUMxQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBDQVF5QixNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYTlDLE1BQUk7QUFDRix1QkFBbUIsTUFBTTtBQUFBLEVBQzNCLFFBQVE7QUFBQSxFQUVSO0FBQ0Y7QUFFTyxTQUFTLG9CQUFpQztBQUMvQyxRQUFNLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JmLE1BQUk7QUFDRixVQUFNLFNBQVMsbUJBQW1CLE1BQU0sRUFBRSxLQUFLO0FBQy9DLFFBQUksQ0FBQyxPQUFRLFFBQU8sb0JBQUksSUFBSTtBQUM1QixXQUFPLElBQUksSUFBSSxPQUFPLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFBQSxFQUN2RCxRQUFRO0FBQ04sV0FBTyxvQkFBSSxJQUFJO0FBQUEsRUFDakI7QUFDRjs7O0FDdEZBLElBQUFJLHdCQUErQjtBQUUvQixTQUFTLFdBQVcsTUFBc0I7QUFDeEMsU0FBTyxrQkFBa0IsSUFBSTtBQUMvQjtBQU1PLFNBQVMsYUFBYSxNQUFjLE9BQWlDO0FBQzFFLFNBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RDLFVBQU0sWUFBUTtBQUFBLE1BQ1osV0FBVyxJQUFJO0FBQUEsTUFDZjtBQUFBLFFBQ0UsVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBO0FBQUEsTUFDWDtBQUFBLE1BQ0EsQ0FBQyxPQUFPLFdBQVc7QUFDakIsWUFBSSxPQUFPO0FBQ1QsaUJBQU8sSUFBSSxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsUUFDakMsT0FBTztBQUNMLGtCQUFRLE9BQU8sS0FBSyxDQUFDO0FBQUEsUUFDdkI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLFFBQUksVUFBVSxVQUFhLE1BQU0sT0FBTztBQUN0QyxZQUFNLE1BQU0sTUFBTSxLQUFLO0FBQ3ZCLFlBQU0sTUFBTSxJQUFJO0FBQUEsSUFDbEI7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0ExQ1BRLElBQUFDLHNCQUFBO0FBSk8sU0FBUixlQUFnQztBQUNyQyxNQUFJLENBQUMsV0FBVyxHQUFHO0FBQ2pCLFdBQ0UsNkNBQUMsb0JBQ0M7QUFBQSxNQUFDLGlCQUFLO0FBQUEsTUFBTDtBQUFBLFFBQ0MsT0FBTTtBQUFBLFFBQ04sYUFBWTtBQUFBLFFBQ1osTUFBTSxpQkFBSztBQUFBO0FBQUEsSUFDYixHQUNGO0FBQUEsRUFFSjtBQUVBLFFBQU0sRUFBRSxNQUFNLFdBQVcsV0FBVyxJQUFJO0FBQUEsSUFDdEMsWUFBWTtBQUNWLFlBQU0saUJBQWlCLGtCQUFrQjtBQUN6QyxhQUFPLGVBQWUsY0FBYztBQUFBLElBQ3RDO0FBQUEsSUFDQSxDQUFDO0FBQUEsSUFDRCxFQUFFLGtCQUFrQixLQUFLO0FBQUEsRUFDM0I7QUFFQSxRQUFNLFNBQVMsUUFBUSxDQUFDO0FBQ3hCLFFBQU0sZ0JBQWdCLE9BQU8sT0FBTyxDQUFDLEtBQUssTUFBTSxNQUFNLEVBQUUsU0FBUyxRQUFRLENBQUM7QUFHMUUsUUFBTSxlQUFlLE9BQU8sSUFBSSxDQUFDLE9BQU87QUFBQSxJQUN0QyxHQUFHO0FBQUEsSUFDSCxVQUFVLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxNQUFNLE9BQU8sRUFBRSxNQUFNLElBQUksT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUFBLEVBQzlFLEVBQUU7QUFHRixlQUFhO0FBQUEsSUFDWCxDQUFDLEdBQUcsTUFDRixPQUFPLEVBQUUsU0FBUyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRSxTQUFTLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0FBQUEsRUFDdEY7QUFFQSxTQUNFLDhDQUFDLG9CQUFLLFdBQXNCLHNCQUFxQixzQkFDOUM7QUFBQSxXQUFPLFdBQVcsS0FBSyxDQUFDLGFBQ3ZCO0FBQUEsTUFBQyxpQkFBSztBQUFBLE1BQUw7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLGFBQVk7QUFBQSxRQUNaLE1BQU0saUJBQUs7QUFBQTtBQUFBLElBQ2I7QUFBQSxJQUVELGFBQWEsSUFBSSxDQUFDLEVBQUUsY0FBYyxTQUFTLE1BQzFDO0FBQUEsTUFBQyxpQkFBSztBQUFBLE1BQUw7QUFBQSxRQUVDLE9BQU8sSUFBSSxZQUFZO0FBQUEsUUFDdkIsVUFBVSxHQUFHLFNBQVMsTUFBTTtBQUFBLFFBRTNCLG1CQUFTLElBQUksQ0FBQyxZQUNiO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFFQztBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUE7QUFBQSxVQUhLLEdBQUcsWUFBWSxJQUFJLFFBQVEsSUFBSTtBQUFBLFFBSXRDLENBQ0Q7QUFBQTtBQUFBLE1BWEk7QUFBQSxJQVlQLENBQ0Q7QUFBQSxLQUNIO0FBRUo7QUFFQSxTQUFTLFlBQVk7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsR0FJRztBQUNELFFBQU0sV0FBVyxRQUFRLFdBQVcsUUFBUTtBQUU1QyxRQUFNLGNBQXFDLENBQUM7QUFDNUMsTUFBSSxRQUFRLFFBQVE7QUFDbEIsZ0JBQVksS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLGlCQUFLLFFBQVEsV0FBVyxrQkFBTSxNQUFNLEdBQUcsU0FBUyxTQUFTLENBQUM7QUFBQSxFQUMvRjtBQUNBLE1BQUksUUFBUSxTQUFTLFVBQVU7QUFDN0IsZ0JBQVksS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLFVBQVUsT0FBTyxrQkFBTSxLQUFLLEVBQUUsQ0FBQztBQUFBLEVBQ2xFLFdBQVcsUUFBUSxTQUFTLFNBQVM7QUFDbkMsZ0JBQVksS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLFNBQVMsT0FBTyxrQkFBTSxPQUFPLEVBQUUsQ0FBQztBQUFBLEVBQ25FO0FBQ0EsTUFBSSxRQUFRLGlCQUFpQjtBQUMzQixnQkFBWSxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sU0FBUyxPQUFPLGtCQUFNLE1BQU0sRUFBRSxDQUFDO0FBQUEsRUFDbEU7QUFFQSxRQUFNLE9BQU8sUUFBUSxTQUNqQixFQUFFLFFBQVEsaUJBQUssVUFBVSxXQUFXLGtCQUFNLE1BQU0sSUFDaEQsRUFBRSxRQUFRLGlCQUFLLFVBQVUsV0FBVyxrQkFBTSxjQUFjO0FBRTVELFNBQ0U7QUFBQSxJQUFDLGlCQUFLO0FBQUEsSUFBTDtBQUFBLE1BQ0MsT0FBTyxRQUFRO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUNFLDhDQUFDLDJCQUNDO0FBQUEsc0RBQUMsd0JBQVksU0FBWixFQUNFO0FBQUEsa0JBQVEsVUFBVSxRQUFRLFFBQVEsZ0JBQ2pDO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFNLGlCQUFLO0FBQUEsY0FDWCxVQUFVLFlBQVk7QUFDcEIsNkJBQWEsUUFBUSxPQUFRLFlBQVk7QUFDekMsMEJBQU0sNkJBQWdCO0FBQUEsY0FDeEI7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVGO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFNO0FBQUEsY0FDTixNQUFNLGlCQUFLO0FBQUEsY0FDWCxVQUFVLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUk7QUFBQSxjQUN6QyxVQUFVLFlBQVk7QUFDcEIsMEJBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sVUFBVSxPQUFPLHNCQUFzQixDQUFDO0FBQzdFLG9CQUFJO0FBQ0Ysd0JBQU0sYUFBYSxJQUFJLFlBQVksbUJBQW1CLFFBQVEsSUFBSSxFQUFFO0FBQ3BFLDRCQUFNLHVCQUFVLEVBQUUsT0FBTyxrQkFBTSxNQUFNLFNBQVMsT0FBTyxrQkFBa0IsQ0FBQztBQUN4RSw2QkFBVztBQUFBLGdCQUNiLFNBQVMsR0FBRztBQUNWLDRCQUFNLHVCQUFVO0FBQUEsb0JBQ2QsT0FBTyxrQkFBTSxNQUFNO0FBQUEsb0JBQ25CLE9BQU87QUFBQSxvQkFDUCxTQUFTLE9BQU8sQ0FBQztBQUFBLGtCQUNuQixDQUFDO0FBQUEsZ0JBQ0g7QUFBQSxjQUNGO0FBQUE7QUFBQSxVQUNGO0FBQUEsV0FDRjtBQUFBLFFBQ0EsNkNBQUMsd0JBQVksU0FBWixFQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFNO0FBQUEsWUFDTixNQUFNLGlCQUFLO0FBQUEsWUFDWCxVQUFVLEVBQUUsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUk7QUFBQSxZQUN6QyxVQUFVLFlBQVk7QUFDcEIsb0JBQU0sc0JBQVUsS0FBSyxRQUFRLElBQUk7QUFDakMsd0JBQU0sdUJBQVUsRUFBRSxPQUFPLGtCQUFNLE1BQU0sU0FBUyxPQUFPLHNCQUFzQixDQUFDO0FBQUEsWUFDOUU7QUFBQTtBQUFBLFFBQ0YsR0FDRjtBQUFBLFFBQ0EsNkNBQUMsd0JBQVksU0FBWixFQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFNO0FBQUEsWUFDTixNQUFNLGlCQUFLO0FBQUEsWUFDWCxPQUFPLG1CQUFPLE1BQU07QUFBQSxZQUNwQixVQUFVLEVBQUUsV0FBVyxDQUFDLE9BQU8sT0FBTyxHQUFHLEtBQUssSUFBSTtBQUFBLFlBQ2xELFVBQVUsWUFBWTtBQUNwQixrQkFDRSxVQUFNLDBCQUFhO0FBQUEsZ0JBQ2pCLE9BQU87QUFBQSxnQkFDUCxTQUFTLDZDQUE2QyxRQUFRLElBQUksWUFBWSxZQUFZO0FBQUEsZ0JBQzFGLGVBQWUsRUFBRSxPQUFPLFVBQVUsT0FBTyxrQkFBTSxZQUFZLFlBQVk7QUFBQSxjQUN6RSxDQUFDLEdBQ0Q7QUFDQSwwQkFBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxVQUFVLE9BQU8sc0JBQXNCLENBQUM7QUFDN0Usb0JBQUk7QUFFRix3QkFBTSxhQUFhLElBQUksWUFBWSxtQkFBbUIsUUFBUSxJQUFJLElBQUksS0FBSztBQUMzRSw0QkFBTSx1QkFBVSxFQUFFLE9BQU8sa0JBQU0sTUFBTSxTQUFTLE9BQU8sa0JBQWtCLENBQUM7QUFDeEUsNkJBQVc7QUFBQSxnQkFDYixTQUFTLEdBQUc7QUFDViw0QkFBTSx1QkFBVTtBQUFBLG9CQUNkLE9BQU8sa0JBQU0sTUFBTTtBQUFBLG9CQUNuQixPQUFPO0FBQUEsb0JBQ1AsU0FBUyxPQUFPLENBQUM7QUFBQSxrQkFDbkIsQ0FBQztBQUFBLGdCQUNIO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQTtBQUFBLFFBQ0YsR0FDRjtBQUFBLFNBQ0Y7QUFBQTtBQUFBLEVBRUo7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2FwaSIsICIkaGdVVzEkdXNlUmVmIiwgIiRoZ1VXMSR1c2VNZW1vIiwgIiRoZ1VXMSRzaG93VG9hc3QiLCAiJGhnVVcxJFRvYXN0IiwgIiRoZ1VXMSRyZWFkRmlsZVN5bmMiLCAiJGhnVVcxJGpvaW4iLCAiJGhnVVcxJGVudmlyb25tZW50IiwgIiRoZ1VXMSRDbGlwYm9hcmQiLCAiJGhnVVcxJG9wZW4iLCAic2V0IiwgIiRoZ1VXMSR1c2VTdGF0ZSIsICIkaGdVVzEkdXNlQ2FsbGJhY2siLCAiYXJncyIsICIkaGdVVzEkTGF1bmNoVHlwZSIsICJvcHRpb25zIiwgIiRoZ1VXMSR1c2VFZmZlY3QiLCAic3RyIiwgInR5cGUiLCAiYm9vbCIsICJtYXAiLCAiJGhnVVcxJG5vZGVjcnlwdG8iLCAiJGhnVVcxJENhY2hlIiwgIiRoZ1VXMSR1c2VTeW5jRXh0ZXJuYWxTdG9yZSIsICJwYWdpbmF0aW9uIiwgImV4Y2VwdGlvbiIsICJtYXAiLCAic2NoZW1hIiwgInR5cGUiLCAiZXh0ZW5kIiwgInN0ciIsICJzdHJpbmciLCAiaW1wb3J0X2NoaWxkX3Byb2Nlc3MiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
