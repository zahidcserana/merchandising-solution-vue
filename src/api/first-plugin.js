export default {
  install(Vue, options) {
    Vue.filter("localeDateString", value => {
      if (!(value instanceof Date)) {
        return value;
      }
      return value.toLocaleDateString();
    });
    Vue.filter("messageAlert", value => {
      console.log(value)
    });
  
    Vue.prototype.$bold = text => {
      return `<b>${text}</b>`;
    };

    Vue.prototype.$upperCase = text => {
      return text.toUpperCase();
    };

    Vue.directive("highlight", {
      inserted(el) {
        el.style.color = "#ffc107";
      }
    });
  }
};
