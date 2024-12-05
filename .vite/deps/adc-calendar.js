import "./chunk-PZ5AY32C.js";

// node_modules/adc-calendar/dist/index.mjs
var ElementRender = class {
  constructor(id) {
    this.id = id;
  }
  startInit() {
    const check = this.rootEl().querySelector(`[calendar="container"]`);
    if (check) {
      check.remove();
    }
    const style = document.createElement("style");
    style.textContent = css;
    const shadow = this.rootEl();
    shadow.appendChild(style);
    shadow.setAttribute("calendar", "root");
  }
  /**
   * Stops the calendar by removing it from the DOM.
   */
  stop(mileSecond = 200) {
    setTimeout(() => {
      const check = this.rootEl().querySelector(`[calendar="container"]`);
      if (check) {
        check.remove();
      }
    }, mileSecond);
  }
  // protected setStyle(shadow: HTMLElement, style: Record<string, any>) {
  setStyle(shadow, style) {
    const keys = Object.keys(style);
    keys.forEach((k) => {
      if (k in style)
        shadow.style.setProperty(`--${k}`, style[k]) + "!important";
    });
  }
  rootEl() {
    const root = document.querySelector(this.id);
    return root;
  }
  createBox(box, vNode) {
    const el = vNode.el = document.createElement(vNode.tag);
    if (vNode.props) {
      for (const key in vNode.props) {
        const value = vNode.props[key];
        el.setAttribute(key, value);
      }
    }
    if (vNode.children) {
      if (typeof vNode.children === "string") {
        el.textContent = vNode.children;
      } else {
        vNode.children.forEach((child) => {
          this.createBox(el, child);
        });
      }
    }
    if (vNode.methods) {
      for (const key in vNode.methods) {
        const fn = vNode.methods[key];
        el.addEventListener(key, (event) => fn(event));
      }
    }
    box.appendChild(el);
  }
  getLists() {
    return [
      {
        english: "January",
        en: "Jan",
        th: "ม.ค.",
        thai: "มกราคม",
        month_value: "01",
        days: 31,
        year: 0
      },
      {
        english: "February",
        en: "Feb",
        th: "ก.พ.",
        thai: "กุมภาพันธ์",
        month_value: "02",
        days: 27,
        year: 0
      },
      {
        english: "March",
        en: "Mar",
        th: "มี.ค.",
        thai: "มีนาคม",
        month_value: "03",
        days: 31,
        year: 0
      },
      {
        english: "April",
        en: "Apr",
        th: "เม.ย.",
        thai: "เมษายน",
        month_value: "04",
        days: 30,
        year: 0
      },
      {
        english: "May",
        en: "May",
        th: "พ.ค.",
        thai: "พฤษภาคม",
        month_value: "05",
        days: 31,
        year: 0
      },
      {
        english: "June",
        en: "June",
        th: "มิ.ย.",
        thai: "มิถุนายน",
        month_value: "06",
        days: 30,
        year: 0
      },
      {
        english: "July",
        en: "July",
        th: "ก.ค.",
        thai: "กรกฎาคม",
        month_value: "07",
        days: 31,
        year: 0
      },
      {
        english: "August",
        en: "Aug",
        th: "ส.ค.",
        thai: "สิงหาคม",
        month_value: "08",
        days: 31,
        year: 0
      },
      {
        english: "September",
        en: "Sept",
        th: "ก.ย.",
        thai: "กันยายน",
        month_value: "09",
        days: 30,
        year: 0
      },
      {
        english: "October",
        en: "Oct",
        th: "ต.ค.",
        thai: "ตุลาคม",
        month_value: "10",
        days: 31,
        year: 0
      },
      {
        english: "November",
        en: "Nov",
        th: "พ.ย.",
        thai: "พฤศจิกายน",
        month_value: "11",
        days: 30,
        year: 0
      },
      {
        english: "December",
        en: "Dec",
        th: "ธ.ค.",
        thai: "ธันวาคม",
        month_value: "12",
        days: 31,
        year: 0
      }
    ];
  }
  onCheckDisabled(date, min, max) {
    const checkDateDiff_Min = this.onDateDiff(min, date) < 0;
    const checkDateDiff_Max = this.onDateDiff(date, max) < 0;
    return checkDateDiff_Min || checkDateDiff_Max;
  }
  onWeeks(type) {
    const weeks = {
      th: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],
      en: ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]
    };
    return weeks[type];
  }
  checkSameDate(a, b) {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }
  onBeforeAfterDay(date) {
    let first_day = new Date(date.getFullYear(), date.getMonth(), 1);
    let last_day = new Date(
      date.getFullYear(),
      date.getMonth(),
      this.getMonth(date).days
    );
    return [first_day.getDay(), 7 - (last_day.getDay() + 1)];
  }
  onDateDiff(a, b) {
    const _MS_PER_DAY = 1e3 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  getYear(date) {
    const _getFebDays = (year) => {
      let isLeapYear = year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0 || year % 100 === 0 && year % 400 === 0;
      return isLeapYear ? 29 : 28;
    };
    const items = [];
    this.getLists().forEach((m, i) => {
      m.year = date.getFullYear();
      if (i === 1) {
        m.days = _getFebDays(date.getFullYear());
      }
      items.push(m);
    });
    return items;
  }
  getMonth(date) {
    const year = this.getYear(date);
    return year[date.getMonth()];
  }
};
var css = ` 
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

[calendar="root"] {
    --font-family: 'Arial', sans-serif;
    --background: #f3f8fe;
    --picker: #0ea5e9;
    --text-picker: #fff;
    --dateRadius: 50%;
    --disabled: #c3c2c8; /* disabled */
    --current: #ffdfd2;
    --text: #151426;
    --text-week: #1e293b;
    --borderRadius: .75rem;
    --border: none;
    --width: 300px;


    --shadow: none;
    --text-current: #ffffff; /* text current */
    --week-line: #cbd5e1; 

    min-width: 250px;
    max-width: var(--width);

}
[calendar="container"] {
   
    font-family: var(--font-family);
    box-shadow: var(--shadow);
    border-radius: var(--borderRadius);
    border: var(--border);
    width: inherit;
    height: max-content;
    background-color: var(--background);
}
[calendar="header"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: var(--text);
    padding: 0;
}
[calendar="header"] .title {
    padding: 0px;
    cursor: pointer;
    border-radius: 0.625rem;
    position: relative;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
}
.calendar__body {
    padding: 0px;
}
[calendar="body-week"] {
    font-weight: 400;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    color: var(--text);
    font-size: 1rem;
    border-top: 1px solid var(--week-line);
    border-bottom: 1px solid var(--week-line);
}
[calendar="body-week"] div {
    color: var(--text-week);
    height: 36px;
    background: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
}
[calendar="body-day"] {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    color: var(--text);
}
[calendar="body-day"] div {
    display: grid;
    place-items: center;
    padding: 0px;
    position: relative;
    cursor: pointer;
    width: 100%;
    aspect-ratio: 1/1;
    font-size: 1rem;
    transform: scale(1.005, 0.95);
}

div[calendar='disabled'] {
    cursor: no-drop !important;
    background-color: inherit;
    opacity: 0.5;
    pointer-events: none;
    text-decoration: line-through;
    color: var(--text);
}
.d_before,
.d_after {
    color: var(--disabled);
    cursor: pointer;
}
.current_date {
    background-color: var(--current);
    color: var(--text-current);
    font-size: 20px;
    font-weight: 700;
    border-radius: var(--dateRadius);
}

.picker_date[data_type='DAY'] {
    background-color: var(--picker);
    border-radius: var(--dateRadius);
    border: 2px solid #ebf0fc;
    color: var(--text-picker);
}

.first, .last {
    background-color: var(--picker);
    border-radius: var(--dateRadius);
    border: 2px solid #ebf0fc;
    color: var(--text-picker);
    isolation: isolate;
    z-index:1;
    position: relative;
}

.between:not(:is(.first,.last)) {
    position: relative;
    border-radius: 0%;
    color: var(--text-picker);
    background-color: var(--picker);
    border-radius: var(--dateRadius);
    opacity: 0.75;
}

.current_date.between {
    color: var(--text-color);
    
}




.calendar__icon-arrow {
    width: 42px;
    height: 42px;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0px 16px;
}
.calendar__icon-arrow:has(.right) {
    justify-content: flex-end;
}
.calendar--arrow {
    border: solid var(--text);
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
}

.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
}

.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
}

.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

`;
var main_default = ElementRender;
function addMonth(value, month) {
  const event = new Date(value.valueOf());
  const res = event.getMonth() + month;
  event.setMonth(res);
  return event;
}
var Calendar = class extends main_default {
  constructor(id, data) {
    super(id);
    this.category = "DAY";
    this.lang = "en";
    this.year = "th";
    this.min = /* @__PURE__ */ new Date();
    this.max = /* @__PURE__ */ new Date("2200-01-01");
    this.style = {};
    this.value = data.value || /* @__PURE__ */ new Date();
    this.ui_value = data.value || /* @__PURE__ */ new Date();
    this.lang = data.lang || "en";
    this.nextDate = typeof data.nextDate == "function" ? data.nextDate : void 0;
    this.nextMonth = typeof data.nextMonth == "function" ? data.nextMonth : void 0;
    this.year = data.year == "th" ? "th" : "en";
    if (typeof data.style == "object" && data.style != null) {
      this.style = Object.assign(this.style, data.style);
    }
    this.setState(data);
  }
  render() {
    this.startInit();
    const shadow = this.rootEl();
    this.setStyle(shadow, this.style);
    const container = {
      tag: "div",
      props: {
        calendar: `container`
      },
      children: []
    };
    container.children = [this.createHeader(), this.createBody()];
    this.createBox(shadow, container);
  }
  update(data) {
    this.setState(data);
    this.render();
  }
  getState() {
    return {
      id: this.id,
      value: this.value,
      ui_value: this.ui_value,
      el: this.rootEl()
    };
  }
  createHeader() {
    const header = {
      tag: "div",
      props: {
        calendar: `header`
      },
      children: []
    };
    const arrow = (icon) => {
      const res = {
        tag: "div",
        props: {
          class: "calendar__icon-arrow"
        },
        methods: {
          click: () => this.onChangeMonth(icon)
        },
        children: [
          {
            tag: "span",
            props: {
              class: `calendar--arrow ${icon.toLocaleLowerCase()}`
            }
          }
        ]
      };
      return res;
    };
    const yearType = this.year === "th" ? 543 : 0;
    const month = this.getMonth(this.ui_value)[this.lang || "th"];
    const year = this.ui_value.getFullYear() + yearType;
    const title = {
      tag: "div",
      props: {
        class: "title"
      },
      children: `${month} ${year}`
    };
    header.children = [arrow("LEFT"), title, arrow("RIGHT")];
    return header;
  }
  createBody() {
    const body = {
      tag: "div",
      props: {
        calendar: `body`
      },
      children: []
    };
    body.children = [this.createWeeks(), this.createDays()];
    return body;
  }
  createWeeks() {
    const weeks = {
      tag: "div",
      props: {
        calendar: `body-week`
      },
      children: []
    };
    let type_week = ["en", "english"].includes(this.lang) ? "en" : "th";
    this.onWeeks(type_week).forEach((v) => {
      weeks.children.push({
        tag: "div",
        children: v
      });
    });
    return weeks;
  }
  createDays() {
    const days = {
      tag: "div",
      props: {
        calendar: `body-day`
      },
      children: []
    };
    const date = this.ui_value;
    const [first_week, last_week] = this.onBeforeAfterDay(date);
    const _beforeDays = () => {
      const lists = [];
      for (let i = 0; i < first_week; i++) {
        const index_month = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
        const days2 = this.getYear(date)[index_month].days;
        const day = days2 - (first_week - 1) + i;
        const _year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
        lists.push(new Date(_year, index_month, day));
      }
      return lists;
    };
    const beforeLists = [];
    const dayLists = [];
    const afterLists = [];
    _beforeDays().forEach((_date) => {
      beforeLists.push(
        this.createDate(
          _date,
          "d_before",
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    });
    for (let i = 0; i < this.getMonth(date).days; i++) {
      const _date = new Date(date.getFullYear(), date.getMonth(), i + 1);
      const current = this.checkSameDate(/* @__PURE__ */ new Date(), _date) ? " current_date" : "";
      dayLists.push(
        this.createDate(
          _date,
          current,
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    }
    for (let i = 0; i < last_week; i++) {
      const _year = this.ui_value.getMonth() === 11 ? this.ui_value.getFullYear() + 1 : this.ui_value.getFullYear();
      const _month = this.ui_value.getMonth() === 11 ? 0 : this.ui_value.getMonth() + 1;
      const _date = new Date(_year, _month, i + 1);
      afterLists.push(
        this.createDate(
          _date,
          "d_after",
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    }
    days.children = [...beforeLists, ...dayLists, ...afterLists];
    return days;
  }
  createDate(date, className, isDisabled = false) {
    const data = {
      tag: "div",
      props: {
        class: className,
        data_type: this.category
      },
      children: date.getDate() + "",
      methods: {
        click: () => this.onDatePicker(date)
      }
    };
    if (isDisabled)
      data.props["data_calendar"] = "disabled";
    if (this.checkSameDate(date, this.value))
      data.props["class"] += " picker_date";
    return data;
  }
  onDatePicker(date) {
    this.onSetOption("SET_VALUE_AND_UI", date);
    if (typeof this.nextDate == "function") {
      this.nextDate(date);
    }
    this.render();
  }
  onChangeMonth(type) {
    const uiValue = addMonth(this.ui_value, type === "LEFT" ? -1 : 1);
    this.onSetOption("SET_UI", uiValue);
    if (typeof this.nextMonth == "function") {
      this.nextMonth(uiValue);
    }
    this.render();
  }
  setState(data) {
    if (data.min && data.min <= this.value) {
      this.min = data.min;
    }
    if (data.max && data.max >= this.value) {
      this.max = data.max;
    }
    if (data.value) {
      this.onSetOption("SET_VALUE_AND_UI", data.value);
    }
  }
  onSetOption(type, date) {
    if (type === "SET_VALUE_AND_UI") {
      this.ui_value = date;
      this.value = date;
    } else if (type === "SET_UI") {
      this.ui_value = date;
    }
  }
};
var calendar_default = Calendar;
var Calendar2 = class extends main_default {
  constructor(id, data) {
    super(id);
    this.category = "BETWEEN";
    this.lang = "en";
    this.year = "th";
    this.min = /* @__PURE__ */ new Date();
    this.max = /* @__PURE__ */ new Date("2200-01-01");
    this.style = {};
    this.values = [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()];
    this.betweens = [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()];
    const startDate = data.values[0] || /* @__PURE__ */ new Date();
    const endDate = data.values[1] || /* @__PURE__ */ new Date();
    this.values = [startDate, endDate];
    this.ui_value = this.getValues()[0];
    this.betweens = this.values;
    this.lang = data.lang || "en";
    this.nextDate = typeof data.nextDate == "function" ? data.nextDate : void 0;
    this.nextMonth = typeof data.nextMonth == "function" ? data.nextMonth : void 0;
    this.year = data.year == "th" ? "th" : "en";
    if (typeof data.style == "object" && data.style != null) {
      this.style = Object.assign(this.style, data.style);
    }
    this.setState(data);
  }
  render() {
    this.startInit();
    const shadow = this.rootEl();
    this.setStyle(shadow, this.style);
    const container = {
      tag: "div",
      props: {
        calendar: `container`
      },
      children: []
    };
    container.children = [this.createHeader(), this.createBody()];
    this.createBox(shadow, container);
  }
  update(data) {
    this.setState(data);
    this.render();
  }
  getState() {
    return {
      id: this.id,
      value: this.values,
      ui_value: this.ui_value,
      el: this.rootEl()
    };
  }
  createHeader() {
    const header = {
      tag: "div",
      props: {
        calendar: `header`
      },
      children: []
    };
    const arrow = (icon) => {
      const res = {
        tag: "div",
        props: {
          class: "calendar__icon-arrow"
        },
        methods: {
          click: () => this.onChangeMonth(icon)
        },
        children: [
          {
            tag: "span",
            props: {
              class: `calendar--arrow ${icon.toLocaleLowerCase()}`
            }
          }
        ]
      };
      return res;
    };
    const yearType = this.year === "th" ? 543 : 0;
    const month = this.getMonth(this.ui_value)[this.lang || "th"];
    const year = this.ui_value.getFullYear() + yearType;
    const title = {
      tag: "div",
      props: {
        class: "title"
      },
      children: `${month} ${year}`
    };
    header.children = [arrow("LEFT"), title, arrow("RIGHT")];
    return header;
  }
  createBody() {
    const body = {
      tag: "div",
      props: {
        calendar: `body`
      },
      children: []
    };
    body.children = [this.createWeeks(), this.createDays()];
    return body;
  }
  createWeeks() {
    const weeks = {
      tag: "div",
      props: {
        calendar: `body-week`
      },
      children: []
    };
    let type_week = ["en", "english"].includes(this.lang) ? "en" : "th";
    this.onWeeks(type_week).forEach((v) => {
      weeks.children.push({
        tag: "div",
        children: v
      });
    });
    return weeks;
  }
  createDays() {
    const days = {
      tag: "div",
      props: {
        calendar: `body-day`
      },
      children: []
    };
    const date = this.ui_value;
    const [first_week, last_week] = this.onBeforeAfterDay(date);
    const dateBetweens = this.getDatesInRange().map(
      (d) => this.dateToString(d)
    );
    const clsBetween = (date2) => {
      const index = dateBetweens.indexOf(this.dateToString(date2));
      let cls = [];
      if (this.category == "BETWEEN") {
        if (index !== -1)
          cls.push("between");
        if (index == 0)
          cls.push("first");
        if (index == dateBetweens.length - 1)
          cls.push("last");
      }
      return cls.join(" ");
    };
    const _beforeDays = () => {
      const lists = [];
      for (let i = 0; i < first_week; i++) {
        const index_month = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
        const days2 = this.getYear(date)[index_month].days;
        const day = days2 - (first_week - 1) + i;
        const _year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear();
        lists.push(new Date(_year, index_month, day));
      }
      return lists;
    };
    const beforeLists = [];
    const dayLists = [];
    const afterLists = [];
    _beforeDays().forEach((_date) => {
      beforeLists.push(
        this.createDate(
          _date,
          `d_before ${clsBetween(_date)}`,
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    });
    for (let i = 0; i < this.getMonth(date).days; i++) {
      const _date = new Date(date.getFullYear(), date.getMonth(), i + 1);
      const current = this.checkSameDate(/* @__PURE__ */ new Date(), _date) ? " current_date" : "";
      dayLists.push(
        this.createDate(
          _date,
          current + ` ${clsBetween(_date)}`,
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    }
    for (let i = 0; i < last_week; i++) {
      const _year = this.ui_value.getMonth() === 11 ? this.ui_value.getFullYear() + 1 : this.ui_value.getFullYear();
      const _month = this.ui_value.getMonth() === 11 ? 0 : this.ui_value.getMonth() + 1;
      const _date = new Date(_year, _month, i + 1);
      afterLists.push(
        this.createDate(
          _date,
          `d_after ${clsBetween(_date)}`,
          this.onCheckDisabled(_date, this.min, this.max)
        )
      );
    }
    days.children = [...beforeLists, ...dayLists, ...afterLists];
    return days;
  }
  getValues() {
    const startDate = this.values[0] < this.values[1] ? this.values[0] : this.values[1];
    const endDate = this.values[0] > this.values[1] ? this.values[0] : this.values[1];
    this.values = [startDate, endDate];
    return [startDate, endDate];
  }
  getDatesInRange() {
    const lists = [];
    const [startDate, endDate] = this.getValues();
    const date = new Date(startDate.getTime());
    while (date <= endDate) {
      lists.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return lists;
  }
  dateToString(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  }
  createDate(date, className, isDisabled = false) {
    const data = {
      tag: "div",
      props: {
        class: className,
        data_type: this.category
      },
      children: date.getDate() + "",
      methods: {
        click: () => this.onDatePicker(date)
      }
    };
    if (isDisabled)
      data.props["data_calendar"] = "disabled";
    if (this.checkSameDate(date, this.betweens[0]))
      data.props["class"] += " picker_date";
    return data;
  }
  onSortDate(a, b) {
    const startDate = a < b ? a : b;
    const endDate = a > b ? a : b;
    return [startDate, endDate];
  }
  onDatePicker(date) {
    this.category = "DAY";
    if (this.betweens[0] === void 0) {
      this.betweens[0] = date;
    } else if (this.betweens[0] && this.betweens[1] === void 0) {
      this.category = "BETWEEN";
      this.betweens = this.onSortDate(this.betweens[0], date);
      this.values = [this.betweens[0], this.betweens[1]];
      this.onSetOption("SET_VALUE_AND_UI", this.values);
      if (typeof this.nextDate == "function") {
        this.nextDate(this.values);
      }
    } else if (this.betweens[0] && this.betweens[1]) {
      this.betweens[0] = date;
      this.betweens[1] = void 0;
    }
    this.render();
  }
  onChangeMonth(type) {
    const uiValue = addMonth(this.ui_value, type === "LEFT" ? -1 : 1);
    this.onSetOption("SET_UI", [uiValue]);
    if (typeof this.nextMonth == "function") {
      this.nextMonth(uiValue);
    }
    this.render();
  }
  setState(data) {
    const [start, end] = this.getValues();
    if (data.min && data.min <= start) {
      this.min = data.min;
    }
    if (data.max && data.max >= end) {
      this.max = data.max;
    }
    if (data.values) {
      this.onSetOption("SET_VALUE_AND_UI", data.values);
    }
  }
  onSetOption(type, dates) {
    if (type === "SET_VALUE_AND_UI") {
      this.ui_value = dates[0];
      this.values = dates;
    } else if (type === "SET_UI") {
      this.ui_value = dates[0];
    }
  }
};
var calendarBetween_default = Calendar2;
var swCalendar = calendar_default;
var swCalendarBetween = calendarBetween_default;
export {
  swCalendar,
  swCalendarBetween
};
//# sourceMappingURL=adc-calendar.js.map
