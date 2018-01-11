const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
/* istanbul ignore next */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};

const Grid = {
  functional: true,

  render: (h, props) => {
    const data = props.data;
    const children = props.children;
    let completeClass = 'l-grid';

    if (data.attrs && typeof data.attrs !== 'undefined') {
      if (data.attrs.size && data.attrs.size !== 'undefined') {
        completeClass += `-g${data.attrs.size}`;
      }

      for (let key in data.attrs) {
        let val = data.attrs[key];

        if (key === 'size') {
          continue;
        }

        if (!val) {
          completeClass += '-' + camelCase(key);
          continue;
        }

        if (key.match(/(xs|ms|sm|md|lg|xl)/)) {
          completeClass += `_${key}-${val}`;
        }
      }

      // let attrKeys = Object.keys(data.attrs);

      // let sizeAttrIdx = attrKeys.findIndex((key) => {
      //   return key.match(/^size-[0-9]{1,2}/);
      // });

      // if (sizeAttrIdx > -1) {
      //   let sizeAttr = attrKeys[sizeAttrIdx];
      //   let size = sizeAttr.replace('size-', '');
      //   completeClass += `-${size}`;
      //   delete attrKeys[sizeAttrIdx];
      // }

      // attrKeys.forEach((key) => {
      //   if (key.match(/(xs|sm|md|lg)/)) {
      //     completeClass += '_' + key;
      //   } else {
      //     completeClass += '-' + key;
      //   }
      // });
    }

    data.staticClass = data.staticClass ? `${completeClass} ${data.staticClass}` : `${completeClass}`

    delete data.attrs

    return h('div', data, children)
  }
}


const Flex = {
  functional: true,

  render: (h, props) => {
    const data = props.data;
    const children = props.children;
    let completeClass = 'l-flex';

    if (data.attrs && typeof data.attrs !== 'undefined') {
      if (data.attrs.size && data.attrs.size !== 'undefined') {
        completeClass += `-${data.attrs.size}`;
      }

      for (let key in data.attrs) {
        let val = data.attrs[key];

        if (key === 'size') {
          continue;
        }

        if ((typeof val === 'string' && val === '') || (typeof val === 'boolean' && val)) {
          completeClass += '-' + camelCase(key);
          continue;
        }

        if (key.match(/(xs|ms|sm|md|lg|xl)/)) {
          completeClass += `_${key}-${val}`;
        }
      }

      // let attrKeys = Object.keys(data.attrs);

      // let sizeAttrIdx = attrKeys.findIndex((key) => {
      //   return key.match(/^size-[0-9]{1,2}/);
      // });

      // if (sizeAttrIdx > -1) {
      //   let sizeAttr = attrKeys[sizeAttrIdx];
      //   let size = sizeAttr.replace('size-', '');
      //   completeClass += `-${size}`;
      //   delete attrKeys[sizeAttrIdx];
      // }

      // attrKeys.forEach((key) => {
      //   if (key.match(/(xs|sm|md|lg)/)) {
      //     completeClass += '_' + key;
      //   } else {
      //     completeClass += '-' + key;
      //   }
      // });
    }

    data.staticClass = data.staticClass ? `${completeClass} ${data.staticClass}` : `${completeClass}`

    delete data.attrs

    return h('div', data, children)
  }
}

const Col = {
  functional: true,

  render: (h, props) => {
    const data = props.data;
    const children = props.children;
    let completeClass = 'l-col';
    let newAttrs = {};

    if (data.attrs && typeof data.attrs !== 'undefined') {
      if (data.attrs.size && data.attrs.size !== 'undefined') {
        completeClass += `-${data.attrs.size}`;
      }

      for (let key in data.attrs) {
        let val = data.attrs[key];

        if (key === 'size' || key === 'flex' || key === 'offset-left' || key === 'offset-right') {
          continue;
        }

        if (key === 'w' || key === 'h' || key === 'x' || key === 'y') {
          completeClass += `-${key}-${val}`;
          continue;
        }

        if (!val) {
          completeClass += '-' + key;
          continue;
        }

        if (key.match(/(xs|ms|sm|md|lg|xl)/)) {
          completeClass += `_${key}-${val}`;
        }
      }

      if (typeof data.attrs.flex === 'string') {
        completeClass += ' l-flex';
      }

      if (typeof data.attrs['push-left'] === 'string' && data.attrs['push-left'].length > 0) {
        newAttrs['data-push-left'] = data.attrs['push-left'].replace(' ', '_');
      }

      if (typeof data.attrs['push-right'] === 'string' && data.attrs['push-right'].length > 0) {
        newAttrs['data-push-right'] = data.attrs['push-right'].replace(' ', '_');
      }
    }

    data.staticClass = data.staticClass ? `${completeClass} ${data.staticClass}` : `${completeClass}`

    data.attrs = newAttrs;

    return h('div', data, children)
  }
}

module.exports =  {
	install: function (Vue) {
		Vue.component('l-flex', Flex);
		Vue.component('l-col', Col);
    Vue.component('l-grid', Grid);
	}
};