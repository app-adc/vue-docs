import "./chunk-PZ5AY32C.js";

// node_modules/adc-directive/dist/index.mjs
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
function mapArray(items) {
  return items.reduce((pre, cur) => {
    if (Array.isArray(cur))
      pre.push(...mapArray(cur));
    else
      pre.push(cur);
    return pre;
  }, []);
}
function chunkArray(items, n) {
  const result = [];
  for (let i = 0; i <= items.length; i += n) {
    result.push(items.slice(i, i + n));
  }
  return result.filter((v) => v.length);
}
function checkItemDuplicate(items, next) {
  const mapItems = items.map(next);
  const uniqueValues = new Set(mapItems);
  return uniqueValues.size !== items.length;
}
function ci(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    case 10:
      return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));
    case 11:
      return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));
    case 12:
      return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));
    case 13:
      return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));
    case 14:
      return mn(
        lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))
      );
    case 15:
      return no(
        mn(
          lm(
            kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))
          )
        )
      );
    case 16:
      return op(
        no(
          mn(
            lm(
              kl(
                jk(
                  ij(
                    hi(
                      gh(fg(ef(de(cd(bc(ab(a)))))))
                    )
                  )
                )
              )
            )
          )
        )
      );
    default: {
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
function withCi(ab, bc, cd, de, ef, fg, gh, hi, ij) {
  switch (arguments.length) {
    case 1:
      return ab;
    case 2:
      return function() {
        return bc(ab.apply(null, arguments));
      };
    case 3:
      return function() {
        return cd(bc(ab.apply(null, arguments)));
      };
    case 4:
      return function() {
        return de(cd(bc(ab.apply(null, arguments))));
      };
    case 5:
      return function() {
        return ef(de(cd(bc(ab.apply(null, arguments)))));
      };
    case 6:
      return function() {
        return fg(ef(de(cd(bc(ab.apply(null, arguments))))));
      };
    case 7:
      return function() {
        return gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))));
      };
    case 8:
      return function() {
        return hi(
          gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))))
        );
      };
    case 9:
      return function() {
        return ij(
          hi(
            gh(fg(ef(de(cd(bc(ab.apply(null, arguments)))))))
          )
        );
      };
  }
  return;
}
var isObject = (v) => typeof v === "object" && v != null;
var isNumber = (v) => toRegExp("number").test(String(v));
var EnumRegExp = {
  character: /\w/,
  notCharacter: /\W/,
  number: /\d/,
  notNumber: /\D/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  thai: /\u0E00-\u0E7F/
};
function toCombineText(items, prefix = " ") {
  if (!Array.isArray(items))
    return "";
  return items.filter((v) => v && typeof v === "string" || typeof v === "number").join(prefix);
}
function toHasKey(text) {
  if (typeof text != "string" && typeof text != "number")
    return "";
  let str = String(text || "").replace(/[^a-zA-Z0-9_\u0E00-\u0E7F ]/g, "");
  return str.replace(/ /g, "").toLocaleLowerCase();
}
var toNumber = (v) => isNumber(v) ? Number(v) ? Number(v) : 0 : 0;
function toCurrency(number, decimal = 0) {
  let value = toNumber(number);
  return value.toLocaleString("en-US", {
    style: "decimal",
    maximumFractionDigits: 2,
    minimumFractionDigits: decimal
  });
}
function toRandomNumber(number1, number2 = 0) {
  const n1 = typeof number1 == "number" ? number1 : 0;
  const n2 = typeof number2 == "number" ? number2 : 0;
  const min = Math.min(n1, n2);
  const res = Math.abs(n1 - n2);
  const result = Math.round(Math.random() * res + min);
  return result || 0;
}
function toUid(count = 13, character) {
  let result = "";
  let characters = character || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return result;
}
function toChangePositionArray(items) {
  if (!Array.isArray(items))
    return [];
  for (let j, x, i = items.length; i; j = parseInt(Math.random() * i + ""), x = items[--i], items[i] = items[j], items[j] = x)
    ;
  return items;
}
function toDate(date) {
  if (date.toLocaleLowerCase().includes("z"))
    return new Date(date);
  let [_date, time] = date.split(" ");
  _date = _date.replace(toRegExp("notCharacter", "g"), "-");
  const re = /(\d{2})-(\d{2})-(\d{4})/g;
  const check = /(\d{4})-(\d{2})-(\d{2})/;
  _date = _date.replace(re, "$3-$2-$1");
  const fullDate = toCombineText([_date, time]);
  if (check.test(String(_date)))
    return new Date(fullDate);
  else
    return /* @__PURE__ */ new Date();
}
function toRegExp(type, flags) {
  return new RegExp(EnumRegExp[type], flags);
}
function toConvertData(content, allow = true) {
  if (allow)
    return JSON.stringify(content).replace(/'|"|null|undefined/g, "");
  else
    return JSON.stringify(content).replace(/'|"/g, "");
}
function dateDiff(a, b = /* @__PURE__ */ new Date()) {
  const diffMs = Math.abs(a.valueOf() - b.valueOf());
  const secs = Math.floor(Math.abs(diffMs) / 1e3);
  const mins = Math.floor(secs / 60);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  return {
    days,
    hours: hours % 24,
    // ชั่วโมงที่ไม่เท่ากันถ้าเทียบวันเดียวกัน
    hoursTotal: hours,
    // ชั่วโมงทั้งหมด
    minutesTotal: mins,
    //นาทีทั้งหมด
    minutes: mins % 60,
    // นาทีที่ไม่เท่ากันถ้าเทียบวันเดียวกัน
    seconds: secs % 60,
    secondsTotal: secs
  };
}
function dateDiffToString(a, b = /* @__PURE__ */ new Date(), local = "th") {
  const { minutesTotal, days } = dateDiff(a, b);
  const isTh = local == "th";
  let suffix = isTh ? "ที่แล้ว" : " ago";
  const years = Math.floor(days / 365);
  const months = Math.floor(days / 30);
  const hours = Math.floor(minutesTotal / 60);
  if (a.valueOf() > b.valueOf())
    suffix = "";
  if (years)
    return years + ` ${isTh ? "ปี" : "year"}${suffix}`;
  else if (months)
    return months + ` ${isTh ? "เดือน" : "months"}${suffix}`;
  else if (days)
    return days + ` ${isTh ? "วัน" : "days"}${suffix}`;
  else if (hours)
    return hours + ` ${isTh ? "ชั่วโมง" : "mins"}${suffix}`;
  else if (minutesTotal)
    return minutesTotal + ` ${isTh ? "นาที" : "mins"}${suffix}`;
  else
    return isTh ? "นาทีที่แล้ว" : "a few seconds ago";
}
function addDate(value, day) {
  const event = new Date(value.valueOf());
  const res = event.getDate() + day;
  event.setDate(res);
  return event;
}
function addMonth(value, month) {
  const event = new Date(value.valueOf());
  const res = event.getMonth() + month;
  event.setMonth(res);
  return event;
}
function addHour(value, hour) {
  const event = new Date(value.valueOf());
  const res = event.getHours() + hour;
  event.setHours(res);
  return event;
}
function addMinute(value, minute) {
  const event = new Date(value.valueOf());
  const res = event.getMinutes() + minute;
  event.setMinutes(res);
  return event;
}
function dateToCombine(value) {
  const year = value.getFullYear().toString();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate().toString().padStart(2, "0");
  const hour = value.getHours().toString().padStart(2, "0");
  const minute = value.getMinutes().toString().padStart(2, "0");
  const second = value.getSeconds().toString().padStart(2, "0");
  const valueOfDate = toCombineText([year, month, day], "-");
  const valueOfTime = toCombineText([hour, minute, second], ":");
  const valueOfValue = toCombineText([valueOfDate, valueOfTime], " ");
  const th = value.toLocaleDateString("th", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit"
  });
  return {
    year: year.toString(),
    month,
    day,
    hour,
    minute,
    second,
    valueOfDate,
    valueOfTime,
    valueOfValue,
    th
  };
}
var withDateDiff = (a) => (b) => dateDiff(a, b);
function withAddMonth(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number")
      return addMonth(a, b);
    else
      return addMonth(b, +a);
  };
}
function withAddDate(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number")
      return addDate(a, b);
    else
      return addDate(b, +a);
  };
}
function withAddHour(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number")
      return addHour(a, b);
    else
      return addHour(b, +a);
  };
}
function withAddMinute(a) {
  return function(b) {
    if (a instanceof Date && typeof b === "number")
      return addMinute(a, b);
    else
      return addMinute(b, +a);
  };
}
function withCombineText(a) {
  return function(b) {
    if (Array.isArray(a) && typeof b == "string")
      return toCombineText(a, b);
    else
      return toCombineText(b, typeof a == "string" ? a : " ");
  };
}
function mapToKeys(key) {
  return key.replace(/\[([^\[\]]*)\]/g, ".$1.").split(".").filter((t) => t).filter((t) => t !== "length");
}
function checkObject(payload, keyNames) {
  if (typeof payload != "object" || payload == null)
    return false;
  const keys = keyNames.map((key) => mapToKeys(key));
  let isValue = false;
  for (let k = 0; k < keys.length; k++) {
    let items = keys[k];
    let data = payload;
    for (let i = 0; i < items.length; i++) {
      data = data[items[i]];
      isValue = data !== void 0;
      if (isValue == false) {
        break;
      }
    }
    if (isValue == false) {
      break;
    }
  }
  return isValue;
}
function mergeObject(...objects) {
  return mapArray(objects).reduce((prev, obj) => {
    if (isObject(obj)) {
      Object.keys(obj).forEach((key) => {
        const preValue = obj[key];
        const value = prev[key];
        if (Array.isArray(value) && Array.isArray(preValue)) {
          prev[key] = value.concat(...preValue);
        } else if (isObject(value) && isObject(preValue)) {
          prev[key] = mergeObject(value, preValue);
        } else {
          prev[key] = preValue;
        }
      });
    }
    return prev;
  }, {});
}
function createObj(payload, key) {
  if (checkObject(payload, [key])) {
    let keys = mapToKeys(key);
    let length = keys.length;
    let data = payload;
    keys.forEach((_key, index) => {
      const dataValue = data[_key];
      if (dataValue) {
        if (Array.isArray(dataValue))
          data = data = { [`${_key}`]: data[_key] };
        else if (typeof dataValue == "object")
          data = dataValue;
        else
          data = { [`${_key}`]: data[_key] };
      }
      if (index === length - 1) {
        keys.reverse().forEach((k, indexKey) => {
          if (indexKey != 0) {
            data = { [`${k}`]: __spreadValues({}, data) };
          }
        });
        payload = Object.assign(data);
      }
    });
    return payload;
  }
  return {};
}
function selectObject(payload, items) {
  if (typeof payload != "object" || payload == null)
    return {};
  const objArray = [];
  items.forEach((keys) => {
    if (checkObject(payload, [keys])) {
      objArray.push(createObj(payload, keys));
    }
  });
  return mergeObject(objArray);
}
function checkNestedValue(content, rules) {
  let conditions = [];
  const keys = Object.keys(rules);
  JSON.stringify(content, (_, nestedValue) => {
    keys.forEach((key) => {
      if (Array.isArray(rules[key]) && Array.isArray(nestedValue[key]) || rules[key] && typeof rules[key] == "object" && nestedValue[key] && typeof nestedValue[key] == "object") {
        const check = toConvertData(nestedValue[key]) == toConvertData(rules[key]);
        conditions.push(check);
      } else {
        conditions.push(nestedValue[key] == rules[key]);
      }
    });
    return nestedValue;
  });
  return conditions.filter((v) => v).length === keys.length;
}
function runProcess(items, next, startIndex = 0) {
  return _runProcess(items, next, startIndex);
}
function _runProcess(items, next, startIndex = 0) {
  const [index, length] = Array.isArray(startIndex) ? startIndex : [startIndex, items.length];
  const n = Array.isArray(startIndex) ? 1 : 0;
  if (index < length + n && index < items.length) {
    const data = items[index];
    next(data, index);
    _runProcess(items, next, [index + 1, length]);
  }
}
function validateObject(payload, keys, msgError = "") {
  if (typeof payload != "object" || !Array.isArray(keys)) {
    return {
      status: -1,
      message: "Error Data is Invalid!!"
    };
  }
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    if (!checkObject(payload, [key])) {
      return {
        status: 0,
        message: `!!${msgError} (${key} is undefined)`
      };
    }
  }
  return {
    status: 1,
    message: ""
  };
}
export {
  addDate,
  addHour,
  addMinute,
  addMonth,
  checkItemDuplicate,
  checkNestedValue,
  checkObject,
  chunkArray,
  ci,
  createObj,
  dateDiff,
  dateDiffToString,
  dateToCombine,
  mapArray,
  mapToKeys,
  mergeObject,
  runProcess,
  selectObject,
  toChangePositionArray,
  toCombineText,
  toConvertData,
  toCurrency,
  toDate,
  toHasKey,
  toNumber,
  toRandomNumber,
  toRegExp,
  toUid,
  validateObject,
  withAddDate,
  withAddHour,
  withAddMinute,
  withAddMonth,
  withCi,
  withCombineText,
  withDateDiff
};
//# sourceMappingURL=adc-directive.js.map
