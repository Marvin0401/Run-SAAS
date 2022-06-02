/******/ (function (modules) {
  // webpackBootstrap
  /******/ // install a JSONP callback for chunk loading
  /******/ function webpackJsonpCallback(data) {
    /******/ var chunkIds = data[0];
    /******/ var moreModules = data[1];
    /******/ var executeModules = data[2];
    /******/ // add "moreModules" to the modules object,
    /******/ // then flag all "chunkIds" as loaded and fire callback
    /******/ var moduleId,
      chunkId,
      i = 0,
      resolves = [];
    /******/ for (; i < chunkIds.length; i++) {
      /******/ chunkId = chunkIds[i];
      /******/ if (installedChunks[chunkId]) {
        /******/ resolves.push(installedChunks[chunkId][0]);
        /******/
      }
      /******/ installedChunks[chunkId] = 0;
      /******/
    }
    /******/ for (moduleId in moreModules) {
      /******/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /******/ modules[moduleId] = moreModules[moduleId];
        /******/
      }
      /******/
    }
    /******/ if (parentJsonpFunction) parentJsonpFunction(data);
    /******/ while (resolves.length) {
      /******/ resolves.shift()();
      /******/
    }
    /******/
    /******/ // add entry modules from loaded chunk to deferred list
    /******/ deferredModules.push.apply(deferredModules, executeModules || []);
    /******/
    /******/ // run deferred modules when all chunks ready
    /******/ return checkDeferredModules();
    /******/
  }
  /******/ function checkDeferredModules() {
    /******/ var result;
    /******/ for (var i = 0; i < deferredModules.length; i++) {
      /******/ var deferredModule = deferredModules[i];
      /******/ var fulfilled = true;
      /******/ for (var j = 1; j < deferredModule.length; j++) {
        /******/ var depId = deferredModule[j];
        /******/ if (installedChunks[depId] !== 0) fulfilled = false;
        /******/
      }
      /******/ if (fulfilled) {
        /******/ deferredModules.splice(i--, 1);
        /******/ result = __webpack_require__(
          (__webpack_require__.s = deferredModule[0])
        );
        /******/
      }
      /******/
    }
    /******/ return result;
    /******/
  }
  /******/
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // object to store loaded and loading chunks
  /******/ var installedChunks = {
    /******/ 1: 0,
    /******/
  };
  /******/
  /******/ var deferredModules = [];
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // define __esModule on exports
  /******/ __webpack_require__.r = function (exports) {
    /******/ Object.defineProperty(exports, "__esModule", { value: true });
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "/";
  /******/
  /******/ var jsonpArray = (window["webpackJsonp"] =
    window["webpackJsonp"] || []);
  /******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  /******/ jsonpArray.push = webpackJsonpCallback;
  /******/ jsonpArray = jsonpArray.slice();
  /******/ for (var i = 0; i < jsonpArray.length; i++)
    webpackJsonpCallback(jsonpArray[i]);
  /******/ var parentJsonpFunction = oldJsonpFunction;
  /******/
  /******/
  /******/ // add entry module to deferred list
  /******/ deferredModules.push([9, 0]);
  /******/ // run deferred modules when ready
  /******/ return checkDeferredModules();
  /******/
})(
  /************************************************************************/
  /******/ [
    ,
    /* 0 */ /* 1 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      // CONCATENATED MODULE: ./src/utils/translate.js
      const enProperties = {
        "zs.billed.monthly": "Billed Monthly",
        "zs.billed.quaterly": "Billed Quarterly",
        "zs.billed.yearly": "Billed Yearly",
        "zs.billed.weekly": "Billed Weekly",
        "zs.billed.biyearly": "Billed Bi-Yearly",
        "zs.billed.every.months": "Billed every {{number}} Months",
        "zs.billed.every.years": "Billed every {{number}} Years",
        "zs.billed.every.weeks": "Billed every {{number}} Weeks",
      };
      const frProperties = {
        "zs.billed.monthly": "Facturé mensuellement",
        "zs.billed.quaterly": "Facturé trimestriellement",
        "zs.billed.yearly": "Facturé annuellement",
        "zs.billed.weekly": "Facturé chaque semaine",
        "zs.billed.biyearly": "Facturé semestriellement",
        "zs.billed.every.months": "Facturé à chaque {{number}} mois",
        "zs.billed.every.years": "Facturé à chaque {{number}} semaines",
        "zs.billed.every.weeks": "Facturé toutes les {{number}} semaines",
      };
      const esProperties = {
        "zs.billed.monthly": "Facturado mensualmente",
        "zs.billed.quaterly": "Facturado trimestralmente",
        "zs.billed.yearly": "Facturado anualmente",
        "zs.billed.weekly": "Facturado semanalmente",
        "zs.billed.biyearly": "Facturado bianual",
        "zs.billed.every.months": "Facturado cada {{number}} meses",
        "zs.billed.every.years": "Facturado cada {{number}} años",
        "zs.billed.every.weeks": "Facturado cada {{number}} semanas",
      };
      const deProperties = {
        "zs.billed.monthly": "Monatliche Rechnung",
        "zs.billed.quaterly": "Vierteljährliche Rechnung",
        "zs.billed.yearly": "Jährliche Rechnung",
        "zs.billed.weekly": "Wöchentliche Rechnung",
        "zs.billed.biyearly": "Halbjährliche Rechnung",
        "zs.billed.every.months": "Rechnung alle {{number}} Monate",
        "zs.billed.every.years": "Rechnung alle {{number}} Jahre",
        "zs.billed.every.weeks": "Rechnung alle {{number}} Wochen",
      };
      const pt_brProperties = {
        "zs.billed.monthly": "Cobrado mensalmente",
        "zs.billed.quaterly": "Cobrado trimestralmente",
        "zs.billed.yearly": "Cobrado anualmente",
        "zs.billed.weekly": "Cobrado semanalmente",
        "zs.billed.biyearly": "Cobrado bianualmente",
        "zs.billed.every.months": "Cobrado a cada {{number}} meses",
        "zs.billed.every.years": "Cobrado a cada {{number}} anos",
        "zs.billed.every.weeks": "Cobrado a cada {{number}} semanas",
      };
      const ptProperties = {
        "zs.billed.monthly": "Faturado(a) mensalmente",
        "zs.billed.quaterly": "Faturado(a) trimestralmente",
        "zs.billed.yearly": "Faturado(a) anualmente",
        "zs.billed.weekly": "Faturado(a) semanalmente",
        "zs.billed.biyearly": "Faturado(a) semestralmente",
        "zs.billed.every.months": "Faturado(a) a cada {{number}} meses",
        "zs.billed.every.years": "Faturado(a) a cada {{number}} anos",
        "zs.billed.every.weeks": "Faturado(a) a cada {{number}} semanas",
      };
      const itProperties = {
        "zs.billed.monthly": "Fatturato mensile",
        "zs.billed.quaterly": "Fatturato trimestrale",
        "zs.billed.yearly": "Fatturato annuale",
        "zs.billed.weekly": "Fatturato settimanale",
        "zs.billed.biyearly": "Fatturato biennale",
        "zs.billed.every.months": "Fatturato ogni {{number}} mesi",
        "zs.billed.every.years": "Fatturato ogni {{number}} anni",
        "zs.billed.every.weeks": "Fatturato ogni {{number}} settimane",
      };
      const nlProperties = {
        "zs.billed.monthly": "Facturering per maand",
        "zs.billed.quaterly": "Facturering per kwartaal",
        "zs.billed.yearly": "Facturering per jaar",
        "zs.billed.weekly": "Facturering per week",
        "zs.billed.biyearly": "Facturering per twee jaar",
        "zs.billed.every.months": "Facturering elke {{number}} maanden",
        "zs.billed.every.years": "Facturering elke {{number}} jaar",
        "zs.billed.every.weeks": "Facturering elke {{number}} weken",
      };
      const svProperties = {
        "zs.billed.monthly": "Faktureras m\u00e5nadsvis",
        "zs.billed.quaterly": "Faktureras kvartalsvis",
        "zs.billed.yearly": "Faktureras \u00e5rsvis",
        "zs.billed.weekly": "Faktureras veckovis",
        "zs.billed.biyearly": "Faktureras halv\u00e5rsvis",
        "zs.billed.every.months": "Faktureras var {{number}} m\u00e5nad",
        "zs.billed.every.years": "Faktureras vart {{number}} \u00e5r",
        "zs.billed.every.weeks": "Faktureras var {{number}} vecka",
      };

      function replaceArgs(content, args) {
        if (args && typeof args === "object") {
          Object.keys(args).forEach((key, index) => {
            content = content.replace(`{{${key}}}`, args[key]);
          });
        }

        return content;
      }

      function getTraslatedContent(freqKey, args, langCode) {
        let translatedContent = "";

        if (langCode === "fr") {
          translatedContent = frProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "es") {
          translatedContent = esProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "de") {
          translatedContent = deProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "pt_br") {
          translatedContent = pt_brProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "pt") {
          translatedContent = ptProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "it") {
          translatedContent = itProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "nl") {
          translatedContent = nlProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        } else if (langCode === "sv") {
          translatedContent = svProperties[freqKey] || enProperties[freqKey];
          return replaceArgs(translatedContent, args);
        }

        translatedContent = enProperties[freqKey];
        return replaceArgs(translatedContent, args);
      }
      // EXTERNAL MODULE: ./src/utils/validation.js
      var validation = __webpack_require__(2);

      // CONCATENATED MODULE: ./src/utils/common.js

      /* harmony default export */ var common = (__webpack_exports__["a"] = {
        insetIntoDOM(element, iframeDOM) {
          element.innerHTML = "";
          element.appendChild(iframeDOM);
        },

        getAsQueryString(params) {
          var value;
          var queryString = Object.keys(params)
            .map((key) => {
              value = params[key];

              if (typeof value === "object" || typeof value === "array") {
                value = JSON.stringify(value);
              }

              return key + "=" + value;
            })
            .join("&");
          return queryString;
        },

        getAddonQs(value = []) {
          value = value.map((addon) => {
            return {
              addon_code: addon.addon_code,
              addon_quantity: validation["a" /* default */].isNumber(
                addon.addon_quantity
              )
                ? addon.addon_quantity
                : 0,
            };
          });
          let addonsQP = value
            .map((item, arrIndex) => {
              return Object.keys(item)
                .map((arrkey) => {
                  return `${arrkey}[${arrIndex}]=${item[arrkey]}`;
                })
                .join("&");
            })
            .join("&");
          return encodeURI(addonsQP);
        },

        getArrayQueryString(params, arrayQs = []) {
          var value;
          var queryString = Object.keys(params)
            .map((key) => {
              value = params[key];

              if (typeof value === "object" || typeof value === "array") {
                if (arrayQs.includes(key)) {
                  if (Array.isArray(value)) {
                    value = value.map((item, arrIndex) => {
                      return Object.keys(item)
                        .map((arrkey) => {
                          return `${arrkey}[${arrIndex}]=${item[arrkey]}`;
                        })
                        .join("&");
                    });
                  } else {
                    value = Object.keys(objItem)
                      .map((objKey, objIndex) => {
                        return `${objKey}[${objIndex}]=${objItem[objKey]}`;
                      })
                      .join("&");
                  }
                } else {
                  value = JSON.stringify(value);
                }
              }

              return key + "=" + value;
            })
            .join("&");
          return queryString;
        },

        getQueryStringObject() {
          var url = window.location.href;
          var queryString = url.substring(url.indexOf("#") + 1);
          var params = {},
            queries,
            temp,
            i,
            l; // Split into key/value pairs

          queries = queryString.split("&"); // Convert the array of strings into an object

          var value;

          for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split("=");
            params[temp[0]] = this.parseValue(temp[1]);
          }

          return params;
        },

        parseValue(value) {
          try {
            value = JSON.parse(decodeURIComponent(value));
          } catch (e) {
            return decodeURIComponent(value);
          }

          return value;
        },

        lightenDarkenColor(col, amt) {
          var usePound = false;

          if (col[0] == "#") {
            col = col.slice(1);
            usePound = true;
          }

          var num = parseInt(col, 16);
          var r = (num >> 16) + amt;
          if (r > 255) r = 255;
          else if (r < 0) r = 0;
          var b = ((num >> 8) & 0x00ff) + amt;
          if (b > 255) b = 255;
          else if (b < 0) b = 0;
          var g = (num & 0x0000ff) + amt;
          if (g > 255) g = 255;
          else if (g < 0) g = 0;
          return (
            (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
          );
        },

        getFreqRecurVal(unit, interval_unit, frequency, langCode = "en") {
          let freqRecurValHash = {
            "1_months": "zs.billed.monthly",
            "6_months": "zs.billed.biyearly",
            "3_months": "zs.billed.quaterly",
            "1_years": "zs.billed.yearly",
            "1_weeks": "zs.billed.weekly",
          };
          let intervalUnitHash = {
            months: "zs.billed.every.months",
            weeks: "zs.billed.every.weeks",
            years: "zs.billed.every.years",
          };
          let freqKey =
            freqRecurValHash[frequency] || intervalUnitHash[interval_unit];
          return getTraslatedContent(
            freqKey,
            {
              number: unit,
            },
            langCode
          );
        },

        unEscapeExpression(string) {
          if (string) {
            string = string.replace(/&#x27;/g, `'`);
            string = string.replace(/&#39;/g, `'`);
            string = string.replace(/&amp;/g, `&`);
            return string;
          }
        },

        getPriceCaption(setupFee, priceCaption, currencySymbol) {
          priceCaption = priceCaption.replace(
            "%setupfee%",
            `${currencySymbol}${setupFee}`
          );
          return priceCaption;
        },

        getOrigin(isProd) {
          if (isProd) {
            var assetBaseUrl = "https://js.zohostatic.com/books/zfwidgets";
            var isStaging = assetBaseUrl.indexOf("zbooks-cent7") != -1;
            var originIndex = isStaging
              ? assetBaseUrl.indexOf("/zfwidgets")
              : assetBaseUrl.indexOf("/books/zfwidgets");
            var srcOrigin = assetBaseUrl.substring(0, originIndex);
            return srcOrigin;
          }

          return "https://js.zohostatic.com/books/zfwidgets";
        },

        openUrl(planUrl, isOpenSameTab) {
          if (isOpenSameTab) {
            window.top.location.href = planUrl;
          } else {
            window.open(planUrl);
          }
        },
      });

      /***/
    },
    /* 2 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony default export */ __webpack_exports__["a"] = {
        validateElement(id) {
          var elements = [];

          if (typeof id === "object") {
            var element;

            for (var i = 0; i < id.length; i++) {
              element = document.getElementById(id[i]);

              if (element) {
                elements.push(element);
              }
            }
          } else if (typeof id === "string") {
            if (document.getElementById(id)) {
              elements.push(document.getElementById(id));
            }
          } else {
            console.log("Invalid Value Passed for ID");
            return;
          }

          if (!elements.length) {
            console.log("No Element found in the given ID");
            return;
          }

          return elements;
        },

        convertToString(obj) {
          if (typeof obj === "number") {
            obj += "";
          }

          return obj;
        },

        isNumber(obj) {
          let value = this.convertToString(obj);
          let regex = /\d+\.\d+|\d+\.|\d+|\.\d+|\-\d+\.\d+|\-\d+\.|\-\d+/;
          let output = regex.exec(value);

          if (output == null) {
            return false;
          }

          if (output[0].length === value.length) {
            return true;
          }

          return false;
        },
      };

      /***/
    },
    /* 3 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony default export */ __webpack_exports__["a"] = {
        product_url: "https://subscriptions.zoho.com",
      };

      /***/
    },
    /* 4 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      const getJson = (requestUrl) => {
        return new Promise((resolve, reject) => {
          let xhr = new XMLHttpRequest();
          xhr.open("GET", requestUrl, true);
          xhr.send();

          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              let jsonRes = JSON.parse(xhr.response);
              resolve(jsonRes);
            }
          };

          xhr.onerror = () => {
            reject(xhr.statusText);
          };
        });
      };

      /* harmony default export */ __webpack_exports__["a"] = {
        getJson,
      };

      /***/
    },
    ,
    ,
    /* 5 */ /* 6 */ /* 7 */
    /***/ function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);

      // EXTERNAL MODULE: ./node_modules/preact/dist/preact.mjs
      var preact = __webpack_require__(0);

      // EXTERNAL MODULE: ./src/utils/constants.js
      var constants = __webpack_require__(3);

      // EXTERNAL MODULE: ./src/utils/common.js + 1 modules
      var common = __webpack_require__(1);

      // CONCATENATED MODULE: ./src/components/PricingTable/Elegant/PlanItem/index.js

      class PlanItem_App extends preact["Component"] {
        constructor(props) {
          super(props);
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model,
            plan = _this$props.plan;
          let productUrl =
            data.product_url || constants["a" /* default */].product_url;
          let recurringPrice = plan.recurring_price;

          if (data.price_precision) {
            recurringPrice = plan.recurring_price.toFixed(data.price_precision);
          }

          if (data.formatted) {
            let currSym = model.currency_symbol;
            let formattedPrice = plan.recurring_price_formatted;
            let priceArr = formattedPrice.split(currSym);
            recurringPrice = priceArr[1] ? priceArr[1] : plan.recurring_price;
          }

          return Object(preact["h"])(
            "li",
            {
              class: "plan-item",
            },
            Object(preact["h"])(
              "div",
              {
                class: `plan-block ${
                  data.popularPlans.includes(plan.plan_code) ? "popular" : ""
                }`,
              },
              data.popularPlans.includes(plan.plan_code) &&
                Object(preact["h"])(
                  "div",
                  {
                    class: "most-popular",
                  },
                  "Most Popular"
                ),
              Object(preact["h"])(
                "h3",
                {
                  id: "plan-name",
                },
                plan.name
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "pricing-img",
                },
                Object(preact["h"])("img", {
                  class: "icon-basic",
                  src: plan.image_id
                    ? `${productUrl}/Templates_PlanImage_${plan.plan_code}.zbfs?product_digest=${data.product_id}`
                    : "https://js.zohostatic.com/books/zfwidgets" +
                      "/assets/images/plan.png",
                })
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "main-price",
                },
                Object(preact["h"])(
                  "span",
                  {
                    class: "price-figure",
                  },
                  Object(preact["h"])("small", null, model.currency_symbol),
                  Object(preact["h"])(
                    "span",
                    {
                      class: "basic-plan price-value",
                    },
                    Object(preact["h"])(
                      "span",
                      {
                        class: "otherCurrency",
                        id: "plan-amount",
                      },
                      " ",
                      recurringPrice,
                      " "
                    )
                  )
                ),
                Object(preact["h"])(
                  "span",
                  {
                    class: "price-term",
                  },
                  plan.billing_cycles !== 1 &&
                    Object(preact["h"])(
                      "span",
                      null,
                      common["a" /* default */].getFreqRecurVal(
                        plan.interval,
                        plan.interval_unit,
                        plan.unitIntervalConcatenated,
                        data.language_code
                      ),
                      " "
                    )
                ),
                data.price_caption &&
                  Object(preact["h"])(
                    "span",
                    {
                      class: "price-caption",
                    },
                    common["a" /* default */].getPriceCaption(
                      plan.setup_fee,
                      data.price_caption,
                      model.currency_symbol
                    )
                  ),
                Object(preact["h"])(
                  "span",
                  {
                    class: "goal",
                  },
                  Object(preact["h"])(
                    "a",
                    {
                      class: "rounded cursor-pointer",
                      onClick: (e) =>
                        common["a" /* default */].openUrl(
                          plan.planUrl,
                          data.open_inSameTab
                        ),
                    },
                    common["a" /* default */].unEscapeExpression(
                      data.button_text
                    )
                  )
                )
              ),
              plan.features.length > 0 &&
                Object(preact["h"])(
                  "ul",
                  {
                    id: "price-features",
                    class: "price-features",
                    style: "border-top: 1px solid #ededed;padding-bottom: 7px;",
                  },
                  plan.features.map((feature, index) =>
                    Object(preact["h"])(
                      "li",
                      null,
                      Object(preact["h"])(
                        "p",
                        {
                          style: "position:relative;",
                        },
                        common["a" /* default */].unEscapeExpression(feature)
                      )
                    )
                  )
                ),
              plan.addons.length > 0 &&
                Object(preact["h"])(
                  "div",
                  {
                    class: "included-addons-sec",
                    style:
                      "border-top: 1px solid #ededed; padding-bottom: 15px; padding-top: 10px;",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "addon-text",
                    },
                    "Included Addons"
                  ),
                  Object(preact["h"])(
                    "div",
                    null,
                    plan.addons.map((addon) => addon.name).join(", ")
                  )
                )
            )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/Elegant/index.js

      class Elegant_App extends preact["Component"] {
        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model;
          let isPopularPlanExist = data.popularPlans.length;
          let planWidth = "30%";

          if (model.plans.length > 3) {
            planWidth = "20%";
          }

          document.documentElement.style.setProperty("--plan-width", planWidth);
          return Object(preact["h"])(
            "div",
            {
              class: `pricing-table ${isPopularPlanExist ? "popular" : ""}`,
            },
            Object(preact["h"])(
              "ul",
              {
                class: "clearfix elegant",
              },
              model.plans.length &&
                model.plans.map((plan, index) =>
                  Object(preact["h"])(PlanItem_App, {
                    model: model,
                    data: data,
                    plan: plan,
                  })
                )
            )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/Solo/PlanItem/index.js

      class Solo_PlanItem_App extends preact["Component"] {
        constructor(props) {
          super(props);
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model,
            plan = _this$props.plan,
            index = _this$props.index;
          let planUrl = this.state.planUrl;
          let recurringPrice = plan.recurring_price;

          if (data.price_precision) {
            recurringPrice = plan.recurring_price.toFixed(data.price_precision);
          }

          if (data.formatted) {
            let currSym = model.currency_symbol;
            let formattedPrice = plan.recurring_price_formatted;
            let priceArr = formattedPrice.split(currSym);
            recurringPrice = priceArr[1] ? priceArr[1] : plan.recurring_price;
          }

          return Object(preact["h"])(
            "div",
            {
              id: "pricing-table",
              class: "pricing-table clearfix",
            },
            Object(preact["h"])(
              "div",
              {
                class: "solo-template-container",
              },
              Object(preact["h"])(
                "div",
                {
                  class: "pricing-section-container",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "pricing-section",
                  },
                  Object(preact["h"])(
                    "span",
                    {
                      class: "price-amount",
                    },
                    model.currency_symbol,
                    recurringPrice
                  ),
                  " ",
                  plan.billing_cycles !== 1 &&
                    Object(preact["h"])(
                      "div",
                      {
                        style: "padding-bottom: 5px",
                      },
                      " / ",
                      plan.interval,
                      " ",
                      plan.interval_unit,
                      " "
                    ),
                  Object(preact["h"])(
                    "div",
                    {
                      style: "font-weight:600",
                    },
                    "For one subscription"
                  )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "inner-div",
                },
                data.price_caption &&
                  Object(preact["h"])(
                    "span",
                    {
                      class: "price-caption",
                    },
                    common["a" /* default */].getPriceCaption(
                      plan.setup_fee,
                      data.price_caption,
                      model.currency_symbol
                    )
                  )
              ),
              Object(preact["h"])("div", {
                class: "band-div",
              }),
              Object(preact["h"])(
                "div",
                {
                  class: "price-features clearfix",
                },
                plan.features.length > 0 &&
                  Object(preact["h"])(
                    "ul",
                    null,
                    plan.features.map((feature, index) =>
                      Object(preact["h"])(
                        "li",
                        {
                          class: "d-flex",
                        },
                        Object(preact["h"])("span", {
                          class: "ticks",
                        }),
                        Object(preact["h"])(
                          "p",
                          null,
                          common["a" /* default */].unEscapeExpression(feature)
                        )
                      )
                    )
                  )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "pricing-button",
                  style: "text-align: center;margin-bottom: 20px;",
                },
                Object(preact["h"])(
                  "a",
                  {
                    style:
                      "padding: 10px 12px; min-width: 110px; display: inline-block;",
                    class: "btn btn-primary rounded cursor-pointer",
                    onClick: (e) =>
                      common["a" /* default */].openUrl(
                        plan.planUrl,
                        data.open_inSameTab
                      ),
                  },
                  common["a" /* default */].unEscapeExpression(data.button_text)
                )
              ),
              plan.addons.length > 0 &&
                Object(preact["h"])(
                  "div",
                  {
                    class: "included-addons-sec solo-template",
                    style:
                      "border-top: 1px solid #ededed; padding-bottom: 15px; padding-top: 10px;",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "addon-text",
                    },
                    "Included Addons"
                  ),
                  Object(preact["h"])(
                    "div",
                    null,
                    plan.addons.map((addon) => addon.name).join(", ")
                  )
                )
            )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/Solo/index.js

      class Solo_App extends preact["Component"] {
        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model;
          return Object(preact["h"])(
            "div",
            {
              class: "pricing-table clearfix",
            },
            model.plans.length &&
              model.plans.map((plan, index) =>
                Object(preact["h"])(Solo_PlanItem_App, {
                  model: model,
                  data: data,
                  plan: plan,
                })
              )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/Combo/PlanItem/index.js

      class Combo_PlanItem_App extends preact["Component"] {
        constructor(props) {
          super(props);
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model,
            plan = _this$props.plan;
          let productUrl =
            data.product_url || constants["a" /* default */].product_url;
          let imgSrc = plan.image_id
            ? `${productUrl}/Templates_PlanImage_${plan.plan_code}.zbfs?product_digest=${data.product_id}`
            : "https://js.zohostatic.com/books/zfwidgets" +
              "/assets/images/plan.png";
          let recurringPrice = plan.recurring_price;

          if (data.price_precision) {
            recurringPrice = plan.recurring_price.toFixed(data.price_precision);
          }

          if (data.formatted) {
            let currSym = model.currency_symbol;
            let formattedPrice = plan.recurring_price_formatted;
            let priceArr = formattedPrice.split(currSym);
            recurringPrice = priceArr[1] ? priceArr[1] : plan.recurring_price;
          }

          return Object(preact["h"])(
            "div",
            {
              class: `combo row ${
                data.popularPlans.includes(plan.plan_code) ? "popular" : ""
              }`,
            },
            Object(preact["h"])(
              "div",
              {
                class: "combo-wrapper",
              },
              Object(preact["h"])(
                "div",
                {
                  class:
                    "hv-center-container col-10 combo-plan align-items-center text-center",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "img-container",
                    style: `${
                      plan.image_id
                        ? ""
                        : "border-radius: 50%; border: 1px solid #D6E4EC;"
                    }`,
                  },
                  Object(preact["h"])("img", {
                    src: imgSrc,
                    style: "width: 45px; margin:auto;",
                  })
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex col-25 combo-plan align-items-center",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "col-100 combo-plan-wrapper",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "plan-name",
                    },
                    plan.name
                  ),
                  Object(preact["h"])(
                    "div",
                    null,
                    Object(preact["h"])(
                      "small",
                      {
                        class: "combo-currency",
                      },
                      model.currency_symbol
                    ),
                    Object(preact["h"])(
                      "span",
                      {
                        class: "combo-value",
                      },
                      recurringPrice
                    ),
                    plan.billing_cycles !== 1 &&
                      Object(preact["h"])(
                        "div",
                        null,
                        Object(preact["h"])(
                          "small",
                          {
                            class: "price-freq",
                            style: "color: #777;",
                          },
                          common["a" /* default */].getFreqRecurVal(
                            plan.interval,
                            plan.interval_unit,
                            plan.unitIntervalConcatenated,
                            data.language_code
                          )
                        )
                      )
                  )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex combo-body",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "col-100",
                  },
                  plan.features.length > 0 &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "price-features-common combo_pro col-100",
                      },
                      Object(preact["h"])(
                        "ul",
                        null,
                        plan.features.map((feature, index) =>
                          Object(preact["h"])(
                            "li",
                            {
                              class: "d-flex",
                            },
                            Object(preact["h"])("span", {
                              class: "ticks",
                            }),
                            Object(preact["h"])(
                              "p",
                              null,
                              common["a" /* default */].unEscapeExpression(
                                feature
                              )
                            )
                          )
                        )
                      )
                    ),
                  plan.addons.length > 0 &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "included-addons-sec combo-template",
                        style:
                          "border-top: 1px solid #ededed; padding-bottom: 15px; padding-top: 10px;",
                      },
                      Object(preact["h"])(
                        "div",
                        {
                          class: "addon-text",
                        },
                        "Included Addons"
                      ),
                      Object(preact["h"])(
                        "div",
                        null,
                        plan.addons.map((addon) => addon.name).join(", ")
                      )
                    )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex col-20 hv-center-container subscribe-button",
                },
                Object(preact["h"])(
                  "a",
                  {
                    style:
                      "padding:10px 12px;min-width:100px;text-align: center;",
                    class: "btn btn-primary rounded cursor-pointer",
                    onClick: (e) =>
                      common["a" /* default */].openUrl(
                        plan.planUrl,
                        data.open_inSameTab
                      ),
                  },
                  common["a" /* default */].unEscapeExpression(data.button_text)
                )
              )
            ),
            data.price_caption &&
              Object(preact["h"])(
                "div",
                {
                  class: "price-caption",
                },
                common["a" /* default */].getPriceCaption(
                  plan.setup_fee,
                  data.price_caption,
                  model.currency_symbol
                )
              )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/Combo/index.js

      class Combo_App extends preact["Component"] {
        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model;
          return Object(preact["h"])(
            "div",
            {
              class: "combo-container pricing-table clearfix",
            },
            model.plans.length &&
              model.plans.map((plan, index) =>
                Object(preact["h"])(Combo_PlanItem_App, {
                  model: model,
                  data: data,
                  plan: plan,
                })
              )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/ComboPro/PlanItem/index.js

      const colorHash = [
        {
          color: "#1C90FB",
          lightColor: "#F9FCFF",
        },
        {
          color: "#2AC193",
          lightColor: "#F7FDFB",
        },
        {
          color: "#FC7357",
          lightColor: "#FFFAF9",
        },
        {
          color: "#FC5A81",
          lightColor: "#FFF8FA",
        },
      ];
      class ComboPro_PlanItem_App extends preact["Component"] {
        constructor(props) {
          super(props);
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model,
            plan = _this$props.plan,
            index = _this$props.index;
          let recurringPrice = plan.recurring_price;

          if (data.price_precision) {
            recurringPrice = plan.recurring_price.toFixed(data.price_precision);
          }

          if (data.formatted) {
            let currSym = model.currency_symbol;
            let formattedPrice = plan.recurring_price_formatted;
            let priceArr = formattedPrice.split(currSym);
            recurringPrice = priceArr[1] ? priceArr[1] : plan.recurring_price;
          }

          return Object(preact["h"])(
            "div",
            {
              class: `combo row ${
                data.popularPlans.includes(plan.plan_code) ? "popular" : ""
              }`,
            },
            Object(preact["h"])(
              "div",
              {
                class: "combo-wrapper",
              },
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex col-25 combo-plan align-items-center",
                  style: `background-color:${
                    colorHash[index % 4].lightColor
                  }; border-left-color: ${colorHash[index % 4].color};`,
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "col-100 combo-plan-wrapper",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "plan-name",
                      style: `color:${colorHash[index % 4].color};`,
                    },
                    plan.name
                  ),
                  Object(preact["h"])(
                    "div",
                    null,
                    Object(preact["h"])(
                      "small",
                      {
                        class: "combo-currency",
                      },
                      model.currency_symbol
                    ),
                    Object(preact["h"])(
                      "span",
                      {
                        class: "combo-value",
                      },
                      recurringPrice
                    ),
                    plan.billing_cycles !== 1 &&
                      Object(preact["h"])(
                        "div",
                        null,
                        Object(preact["h"])(
                          "small",
                          {
                            class: "price-freq",
                            style: "color: #777;",
                          },
                          common["a" /* default */].getFreqRecurVal(
                            plan.interval,
                            plan.interval_unit,
                            plan.unitIntervalConcatenated,
                            data.language_code
                          )
                        )
                      )
                  )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex combo-body",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "col-100",
                  },
                  plan.features.length > 0 &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "price-features-common combo_pro col-100",
                      },
                      Object(preact["h"])(
                        "ul",
                        null,
                        plan.features.map((feature, index) =>
                          Object(preact["h"])(
                            "li",
                            {
                              class: "d-flex",
                            },
                            Object(preact["h"])("span", {
                              class: "ticks",
                            }),
                            Object(preact["h"])(
                              "p",
                              null,
                              common["a" /* default */].unEscapeExpression(
                                feature
                              )
                            )
                          )
                        )
                      )
                    ),
                  plan.addons.length > 0 &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "included-addons-sec combo-pro-template",
                        style:
                          "border-top: 1px solid #ededed; padding-bottom: 15px; padding-top: 10px;",
                      },
                      Object(preact["h"])(
                        "div",
                        {
                          class: "addon-text",
                        },
                        "Included Addons"
                      ),
                      Object(preact["h"])(
                        "div",
                        null,
                        plan.addons.map((addon) => addon.name).join(", ")
                      )
                    )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "d-flex col-20 hv-center-container subscribe-button",
                },
                Object(preact["h"])(
                  "a",
                  {
                    data: "hai",
                    style: `padding:10px 12px;min-width:100px;text-align: center;background-color:${
                      colorHash[index % 4].color
                    }; border-color: ${colorHash[index % 4].color};`,
                    class: "btn btn-primary rounded cursor-pointer",
                    onClick: (e) =>
                      common["a" /* default */].openUrl(
                        plan.planUrl,
                        data.open_inSameTab
                      ),
                  },
                  common["a" /* default */].unEscapeExpression(data.button_text)
                )
              )
            ),
            data.price_caption &&
              Object(preact["h"])(
                "div",
                {
                  class: "price-caption pro",
                  style: `background-color:${colorHash[index % 4].lightColor}`,
                },
                common["a" /* default */].getPriceCaption(
                  plan.setup_fee,
                  data.price_caption,
                  model.currency_symbol
                )
              )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/ComboPro/index.js

      class ComboPro_App extends preact["Component"] {
        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model;
          return Object(preact["h"])(
            "div",
            {
              class: "combo-container pricing-table clearfix",
            },
            model.plans.length &&
              model.plans.map((plan, index) =>
                Object(preact["h"])(ComboPro_PlanItem_App, {
                  model: model,
                  data: data,
                  plan: plan,
                  index: index,
                })
              )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/ElegantPro/PlanItem/index.js

      class ElegantPro_PlanItem_App extends preact["Component"] {
        constructor(props) {
          super(props);
        }

        addQueryparams(url, params) {
          const queryString = Object.entries(params)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
          return `${url}?${queryString}`;
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model,
            plan = _this$props.plan;
          let recurringPrice = plan.recurring_price;

          if (data.price_precision) {
            recurringPrice = plan.recurring_price.toFixed(data.price_precision);
          }

          if (data.formatted) {
            let currSym = model.currency_symbol;
            let formattedPrice = plan.recurring_price_formatted;
            let priceArr = formattedPrice.split(currSym);
            recurringPrice = priceArr[1] ? priceArr[1] : plan.recurring_price;
          }

          return Object(preact["h"])(
            "li",
            {
              class: "plan-item",
            },
            Object(preact["h"])(
              "div",
              {
                class: `plan-block ${
                  data.popularPlans.includes(plan.plan_code)
                    ? "elegant-pro-popular"
                    : ""
                }`,
              },
              data.popularPlans.includes(plan.plan_code) &&
                Object(preact["h"])(
                  "div",
                  {
                    class: "ribbon",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "ribbon-inner",
                    },
                    Object(preact["h"])("small", null, "MOST POPULAR")
                  )
                ),
              Object(preact["h"])(
                "div",
                {
                  id: "plan-name",
                  class: "plan-name",
                },
                plan.name
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "main-price",
                },
                Object(preact["h"])(
                  "span",
                  {
                    class: "price-figure",
                  },
                  Object(preact["h"])("small", null, model.currency_symbol),
                  Object(preact["h"])(
                    "span",
                    {
                      class: "basic-plan price-value",
                    },
                    Object(preact["h"])(
                      "span",
                      {
                        class: "otherCurrency",
                        id: "plan-amount",
                      },
                      " ",
                      recurringPrice,
                      " "
                    )
                  )
                ),
                Object(preact["h"])(
                  "span",
                  {
                    class: "price-term",
                  },
                  plan.billing_cycles !== 1 &&
                    Object(preact["h"])(
                      "span",
                      null,
                      " ",
                      common["a" /* default */].getFreqRecurVal(
                        plan.interval,
                        plan.interval_unit,
                        plan.unitIntervalConcatenated,
                        data.language_code
                      )
                    )
                ),
                data.price_caption &&
                  Object(preact["h"])(
                    "span",
                    {
                      class: "price-caption",
                    },
                    common["a" /* default */].getPriceCaption(
                      plan.setup_fee,
                      data.price_caption,
                      model.currency_symbol
                    )
                  ),
                Object(preact["h"])(
                  "span",
                  {
                    class: "goal",
                  },
                  Object(preact["h"])(
                    "a",
                    {
                      class: "rounded cursor-pointer",
                      onClick: (e) =>
                        common["a" /* default */].openUrl(
                          data.queryParams && Object.keys(data.queryParams)
                            ? this.addQueryparams(
                                plan.planUrl,
                                data.queryParams
                              )
                            : plan.planUrl,
                          data.open_inSameTab
                        ),
                    },
                    common["a" /* default */].unEscapeExpression(
                      data.button_text
                    )
                  )
                )
              ),
              plan.addons.length > 0 &&
                Object(preact["h"])(
                  "div",
                  {
                    class: "included-addons-sec",
                    style:
                      "border-top: 1px solid #ededed; padding-bottom: 15px; padding-top: 10px;",
                  },
                  Object(preact["h"])(
                    "div",
                    {
                      class: "addon-text",
                    },
                    "Included Addons"
                  ),
                  Object(preact["h"])(
                    "div",
                    null,
                    plan.addons.map((addon) => addon.name).join(", ")
                  )
                ),
              plan.features.length > 0 &&
                Object(preact["h"])(
                  "ul",
                  {
                    id: "price-features",
                    class: "price-features",
                    style: "border-top: 1px solid #ededed;padding-bottom: 7px;",
                  },
                  plan.features.map((feature, index) =>
                    Object(preact["h"])(
                      "li",
                      null,
                      Object(preact["h"])(
                        "p",
                        {
                          style: "position:relative;",
                        },
                        common["a" /* default */].unEscapeExpression(feature)
                      )
                    )
                  )
                )
            )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/ElegantPro/index.js

      class ElegantPro_App extends preact["Component"] {
        render() {
          let _this$props = this.props,
            data = _this$props.data,
            model = _this$props.model;
          let isPopularPlanExist = data.popularPlans.length;
          let planWidth = "30%";

          if (model.plans.length > 3) {
            planWidth = "20%";
          }

          document.documentElement.style.setProperty("--plan-width", planWidth);
          return Object(preact["h"])(
            "div",
            {
              class: `pricing-table ${isPopularPlanExist ? "popular" : ""}`,
            },
            Object(preact["h"])(
              "ul",
              {
                class: "clearfix elegant",
              },
              model.plans.length &&
                model.plans.map((plan, index) =>
                  Object(preact["h"])(ElegantPro_PlanItem_App, {
                    model: model,
                    data: data,
                    plan: plan,
                  })
                )
            )
          );
        }
      }
      // EXTERNAL MODULE: ./src/utils/adapter.js
      var adapter = __webpack_require__(4);

      // CONCATENATED MODULE: ./src/static/assets/svgs/arrow-left-svg.js

      class arrow_left_svg_ArrowLeftSVG extends preact["Component"] {
        render() {
          return Object(preact["h"])(
            "svg",
            {
              id: "a8395ff5-769b-4df5-9d6a-3b20e4691ea5",
              "data-name": "Layer 1",
              viewBox: "0 0 213.68 346.79",
            },
            Object(preact["h"])("path", {
              d: "M118.93,263.64,312.62,427a10,10,0,0,0,16.44-7.64V92.62A10,10,0,0,0,312.62,85L118.93,248.36A10,10,0,0,0,118.93,263.64Z",
              transform: "translate(-115.38 -82.6)",
            })
          );
        }
      }
      // CONCATENATED MODULE: ./src/static/assets/svgs/arrow-right-svg.js

      class arrow_right_svg_ArrowRight extends preact["Component"] {
        render() {
          return Object(preact["h"])(
            "svg",
            {
              id: "a2cdafd8-a155-473b-875b-f41e0e975c4d",
              "data-name": "Layer 1",
              viewBox: "0 0 213.68 346.79",
            },
            Object(preact["h"])("path", {
              d: "M359.17,248.57,165.48,85.19A10,10,0,0,0,149,92.84V419.59a10,10,0,0,0,16.45,7.64L359.17,263.86A10,10,0,0,0,359.17,248.57Z",
              transform: "translate(-149.03 -82.82)",
            })
          );
        }
      }
      // CONCATENATED MODULE: ./src/static/assets/svgs/caret-svg.js

      class caret_svg_CaretSVG extends preact["Component"] {
        render() {
          return Object(preact["h"])(
            "span",
            null,
            Object(preact["h"])(
              "svg",
              {
                viewBox: "0 0 432.5 280.2",
              },
              Object(preact["h"])("path", {
                d: "M415.5 26.4c-15.6-15.6-40.9-15.6-56.6 0L216.3 169 73.6 26.4C58 10.7 32.7 10.7 17 26.4S1.4 67.3 17 82.9l171 171c7.8 7.8 18 11.7 28.3 11.7 10.2 0 20.5-3.9 28.3-11.7l170.9-171c15.6-15.6 15.6-40.9 0-56.5z",
                fill: "#1d1d1b",
              })
            )
          );
        }
      }
      // CONCATENATED MODULE: ./src/components/PricingTable/index.js

      class PricingTable_App extends preact["Component"] {
        constructor(props) {
          super(props);
          this.state = {
            isLoading: true,
            selectedTxn: "invoices",
            model: null,
            selectedGroupFrequency: null,
            selectedPricebookId: null,
          };
          this.loadProductDetails().then((model) => {
            let includedPlans = [];

            if (props.data.is_group_by_frequency) {
              props.data.group_options.map((planGroup) => {
                includedPlans = includedPlans.concat(planGroup.plans);
              });
            } else {
              includedPlans = this.props.data.plans;
            }

            let selectedGroupFrequency;

            if (includedPlans.length === 0) {
              includedPlans = [model.plans[0]];
            }

            let associatedPlan,
              filteredPlanList = [];
            includedPlans.forEach((plan) => {
              associatedPlan = model.plans.find(
                (x) => x.plan_code === plan.plan_code
              );
              /*
          * server response will contain only active plans in the product.
          * If the customer marks a plan inactive and doesn't remove the show in widget option and update the embed code, then the plan will be listed
          in the embed code but not included in server response.
          * Hence added if check.
          */

              if (associatedPlan) {
                associatedPlan.addons = this.computeAddons(
                  plan.selectedAddons,
                  associatedPlan.addons
                );
                associatedPlan.planUrl = (plan.selectedAddons || []).length
                  ? `${associatedPlan.url}?${common[
                      "a" /* default */
                    ].getAddonQs(plan.selectedAddons)}`
                  : associatedPlan.url;
                associatedPlan.features = this.computeDescription(
                  associatedPlan.description,
                  associatedPlan.store_markup_description
                );
                associatedPlan.unitIntervalConcatenated = `${associatedPlan.interval}_${associatedPlan.interval_unit}`;

                if (
                  associatedPlan.show_in_widget &&
                  associatedPlan.status === "active"
                ) {
                  filteredPlanList.push(associatedPlan);
                }
              }
            });
            model.plans = filteredPlanList;
            model.pricebooks = props.data.pricebooks || [];
            props.data.popularPlans = [];

            if (props.data.most_popular_plan) {
              props.data.popularPlans = [props.data.most_popular_plan];
            }

            if (props.data.is_group_by_frequency) {
              var popularPlans = props.data.group_options
                .map((group) => group.most_popular_plan)
                .filter((value, index, self) => self.indexOf(value) === index);
              props.data.popularPlans = popularPlans;
              var frequencyGroups = model.plans
                .map((plan) => plan.unitIntervalConcatenated)
                .filter((value, index, self) => self.indexOf(value) === index);
              selectedGroupFrequency = frequencyGroups[0];
              this.props.includedFrequencyGroups =
                props.data.group_options.filter((plan) => {
                  return frequencyGroups.find(
                    (x) => x === plan.frequency_recurrence_value
                  );
                });
            }
            /*
             ** Clone Plans to filter it for grouping plans Based in interval_unit
             */

            model.allPlans = JSON.parse(JSON.stringify(model.plans));
            var pricebookList = model.pricebooks || [];
            var basePricebook = pricebookList[0] || {};
            let selectedPricebookId = basePricebook.pricebook_id || "";
            let isFrequencyDropdown = props.data.isFrequencyDropdown || false;
            let defaultFrequencyDropdown = isFrequencyDropdown;
            let isCurrencyDropdown = props.data.isCurrencyDropdown || false;
            let defaultCurrencyDropdown = isCurrencyDropdown;
            this.setState({
              model,
              isLoading: false,
              selectedGroupFrequency,
              selectedPricebookId,
              isFrequencyDropdown,
              isCurrencyDropdown,
              defaultFrequencyDropdown,
              defaultCurrencyDropdown,
            });
          });
          this._handleGroupingPlan = this._handleGroupingPlan.bind(this);
          this.windowResize = this.windowResize.bind(this);
        }

        computeDescription(planDesc, widgetDesc) {
          if (widgetDesc) {
            return widgetDesc.split("|");
          }

          if (planDesc) {
            return planDesc.split("|");
          }

          return [];
        }

        computeAddons(selectedAddons = [], planAddons = []) {
          let addons = [];
          selectedAddons.forEach((addon) => {
            addons.push(
              planAddons.find((x) => x.addon_code === addon.addon_code)
            );
          });
          return addons;
        }

        componentDidUpdate() {
          var queryString = common["a" /* default */].getQueryStringObject();
          window.parent.postMessage(
            {
              eventName: "resizeFrameHeight",
              height: document.getElementById("app").clientHeight + 50,
            },
            "*"
          );
          let isCurrencyDropdown = this.state.isCurrencyDropdown;
          let currencyTabDom = document.getElementById("currency-tab");

          if (currencyTabDom && !isCurrencyDropdown) {
            if (currencyTabDom.clientWidth < currencyTabDom.scrollWidth) {
              document.getElementById("left-scroll").style.display = "block";
              document.getElementById("right-scroll").style.display = "block";
            } else {
              currencyTabDom.style.position = "unset";
              currencyTabDom.style.marginLeft = "0px";
              document.getElementById("cur-container").style.width = "auto";
            }
          }
        }

        windowResize() {
          let appElement = document.querySelector("#app");
          let maxWidth = appElement.offsetWidth;

          if (maxWidth <= "650") {
            this.setState({
              isCurrencyDropdown: true,
              isFrequencyDropdown: true,
            });
          } else {
            let _this$state = this.state,
              isFrequencyDropdown = _this$state.isFrequencyDropdown,
              isCurrencyDropdown = _this$state.isCurrencyDropdown,
              defaultFrequencyDropdown = _this$state.defaultFrequencyDropdown,
              defaultCurrencyDropdown = _this$state.defaultCurrencyDropdown;

            if (
              isFrequencyDropdown !== defaultFrequencyDropdown &&
              isCurrencyDropdown !== defaultCurrencyDropdown
            ) {
              this.setState({
                isFrequencyDropdown: defaultFrequencyDropdown,
                isCurrencyDropdown: defaultCurrencyDropdown,
              });
            } else if (isCurrencyDropdown !== defaultCurrencyDropdown) {
              this.setState({
                isCurrencyDropdown: defaultCurrencyDropdown,
              });
            } else if (isFrequencyDropdown !== defaultFrequencyDropdown) {
              this.setState({
                isFrequencyDropdown: defaultFrequencyDropdown,
              });
            }
          }
        }

        componentWillMount() {
          window.addEventListener("resize", this.windowResize);
        }

        componentWillUnmount() {
          window.removeEventListener("resize", this.windowResize);
        }

        _handleGroupingPlan(event) {
          let target = event.target;
          let selectedGroupFrequency = target.getAttribute("name");
          this.setState({
            selectedGroupFrequency,
            listOpen: false,
            pricebookListOpen: false,
          });
        }

        _handleGroupingPricebooks(pricebook = {}) {
          let _pricebook$plans = pricebook.plans,
            currencyBasedPlans =
              _pricebook$plans === void 0 ? [] : _pricebook$plans,
            _pricebook$pricebook_ = pricebook.pricebook_id,
            pricebook_id =
              _pricebook$pricebook_ === void 0 ? "" : _pricebook$pricebook_,
            _pricebook$currency_s = pricebook.currency_symbol,
            currency_symbol =
              _pricebook$currency_s === void 0 ? "" : _pricebook$currency_s;

          let _this$state2 = this.state,
            _this$state2$model = _this$state2.model,
            _this$state2$model2 =
              _this$state2$model === void 0 ? {} : _this$state2$model,
            _this$state2$model2$a = _this$state2$model2.allPlans,
            allPlans =
              _this$state2$model2$a === void 0 ? [] : _this$state2$model2$a,
            _this$state2$model3 = _this$state2.model,
            model = _this$state2$model3 === void 0 ? {} : _this$state2$model3;

          allPlans.map((plan) => {
            let currencyBasedPlan =
              currencyBasedPlans.find((currPlan) => {
                return currPlan.plan_code === plan.plan_code;
              }) || {};
            plan.url = currencyBasedPlan.url || "";
            plan.planUrl = (plan.addons || []).length
              ? `${currencyBasedPlan.url}?${common[
                  "a" /* default */
                ].getAddonQs(plan.addons)}`
              : currencyBasedPlan.url;
            plan.recurring_price = currencyBasedPlan.recurring_price;
            plan.recurring_price_formatted =
              currencyBasedPlan.recurring_price_formatted;
          });
          model.currency_symbol = currency_symbol;
          this.setState({
            selectedPricebookId: pricebook_id,
            pricebookListOpen: false,
            listOpen: false,
          });
        }

        handleClickOutside() {
          this.setState((prevState) => ({
            listOpen: prevState.listOpen
              ? !prevState.listOpen
              : prevState.listOpen,
            pricebookListOpen: prevState.pricebookListOpen
              ? !prevState.pricebookListOpen
              : prevState.pricebookListOpen,
          }));
        }

        toggleList() {
          this.setState((prevState) => ({
            listOpen: !prevState.listOpen,
            pricebookListOpen: false,
          }));
        }

        togglePBList() {
          this.setState((prevState) => ({
            pricebookListOpen: !prevState.pricebookListOpen,
            listOpen: false,
          }));
        }

        scrollLeft() {
          let leftBtn = document.getElementById("currency-tab");
          let scrollValue = 0;
          var scrollTimer = setInterval(() => {
            leftBtn.scrollLeft -= 50;
            scrollValue += 50;

            if (scrollValue >= 150) {
              clearInterval(scrollTimer);
            }
          }, 50);
        }

        scrollRight() {
          let rightBtn = document.getElementById("currency-tab");
          let scrollValue = 0;
          var scrollTimer = setInterval(() => {
            rightBtn.scrollLeft += 50;
            scrollValue += 50;

            if (scrollValue >= 150) {
              clearInterval(scrollTimer);
            }
          }, 50);
        }

        loadProductDetails() {
          let data = this.props.data;
          let themeColor = (data.theme && data.theme.color) || "#7758AF";
          let themeColorLight =
            (data.theme && data.theme.theme_color_light) || "#7758AF";
          document.documentElement.style.setProperty(
            "--theme-color",
            themeColor
          );
          document.documentElement.style.setProperty(
            "--theme-light-color",
            themeColorLight ||
              common["a" /* default */].lightenDarkenColor(themeColor, 165)
          );
          let product_digest = data.product_id;
          let productUrl =
            data.product_url || constants["a" /* default */].product_url;
          let requestUrl = `${productUrl}/api/v1/widgets/products?product_digest=${product_digest}&showchild=true&formatneeded=true`;
          return adapter["a" /* default */]
            .getJson(requestUrl)
            .then(({ product }) => {
              return product;
            })
            .catch((err) => {
              console.log(err);
            });
        }

        render() {
          let _this$props = this.props,
            data = _this$props.data,
            _this$props$includedF = _this$props.includedFrequencyGroups,
            includedFrequencyGroups =
              _this$props$includedF === void 0 ? [] : _this$props$includedF;
          let _this$state3 = this.state,
            _this$state3$model = _this$state3.model,
            model = _this$state3$model === void 0 ? {} : _this$state3$model,
            listOpen = _this$state3.listOpen,
            pricebookListOpen = _this$state3.pricebookListOpen,
            isLoading = _this$state3.isLoading,
            selectedGroupFrequency = _this$state3.selectedGroupFrequency,
            _this$state3$selected = _this$state3.selectedPricebookId,
            selectedPricebookId =
              _this$state3$selected === void 0 ? "" : _this$state3$selected,
            isFrequencyDropdown = _this$state3.isFrequencyDropdown,
            isCurrencyDropdown = _this$state3.isCurrencyDropdown;

          if (isLoading) {
            return "Loading...";
          }

          if (selectedGroupFrequency) {
            model.plans = model.allPlans.filter((plan) => {
              return plan.unitIntervalConcatenated === selectedGroupFrequency;
            });
          } else {
            model.plans = model.allPlans || [];
          }

          let components = {
            elegant: Elegant_App,
            elegant_pro: ElegantPro_App,
            combo: Combo_App,
            combo_pro: ComboPro_App,
            solo: Solo_App,
          };
          let PricingTableComponent = components[data.template];
          let canShowCurrencyTab = false;
          let canShowCurrencyDropdown = false;

          if ((model.pricebooks || []).length > 1) {
            canShowCurrencyDropdown = isCurrencyDropdown;
            canShowCurrencyTab = !isCurrencyDropdown;
          }

          let canShowFrequencyTab = false;
          let canShowFrequencyDropdown = false;

          if ((includedFrequencyGroups || []).length > 1) {
            canShowFrequencyDropdown = isFrequencyDropdown;
            canShowFrequencyTab = !isFrequencyDropdown;
          }

          let canShowCurrencyTabOnly =
            canShowCurrencyTab &&
            !(canShowFrequencyTab || canShowFrequencyDropdown);
          let canShowFrequencyTabOnly =
            canShowFrequencyTab &&
            !(canShowCurrencyTab || canShowCurrencyDropdown);
          let canShowCurrencyDropdownOnly =
            canShowCurrencyDropdown &&
            !(canShowFrequencyDropdown || canShowFrequencyTab);
          let isTabAlignMiddle =
            canShowCurrencyTabOnly || canShowFrequencyTabOnly;

          if (model.plans.length) {
            return Object(preact["h"])(
              "div",
              {
                class: "pricing-table-main",
              },
              Object(preact["h"])(
                "div",
                {
                  class: "pricing-table-header",
                },
                Object(preact["h"])(
                  "div",
                  {
                    class: "filters d-flex",
                    style: `${
                      canShowCurrencyDropdownOnly
                        ? "justify-content: flex-end"
                        : ""
                    }`,
                  },
                  canShowFrequencyTab &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: `frequency-nav d-flex align-items-center ${
                          isTabAlignMiddle ? "m-auto" : ""
                        }`,
                      },
                      Object(preact["h"])(
                        "ul",
                        {
                          class: "navs",
                        },
                        includedFrequencyGroups.map((item) =>
                          Object(preact["h"])(
                            "li",
                            {
                              class: "nav-item float-left",
                            },
                            Object(preact["h"])(
                              "a",
                              {
                                class: `nav-link frequency ${
                                  selectedGroupFrequency ===
                                  item.frequency_recurrence_value
                                    ? "active"
                                    : ""
                                }`,
                                name: item.frequency_recurrence_value,
                                onClick: this._handleGroupingPlan,
                              },
                              item.frequency
                            )
                          )
                        )
                      )
                    ),
                  canShowFrequencyDropdown &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "frequency-dropown float-left",
                      },
                      Object(preact["h"])(
                        "div",
                        {
                          className: "dd-header d-flex",
                          onClick: () => this.toggleList(),
                        },
                        Object(preact["h"])(
                          "div",
                          {
                            className: "dd-header-title",
                          },
                          includedFrequencyGroups.find(
                            (frequencyRecurrence) =>
                              frequencyRecurrence.frequency_recurrence_value ===
                              selectedGroupFrequency
                          ).frequency
                        ),
                        Object(preact["h"])(
                          "div",
                          {
                            class: `line-arrow ${listOpen ? "down-arrow" : ""}`,
                          },
                          Object(preact["h"])(caret_svg_CaretSVG, null)
                        )
                      ),
                      listOpen &&
                        Object(preact["h"])(
                          "ul",
                          {
                            className: "dd-list",
                          },
                          includedFrequencyGroups.map((item) =>
                            Object(preact["h"])(
                              "li",
                              {
                                class: `dd-list-item frequency ${
                                  selectedGroupFrequency ===
                                  item.frequency_recurrence_value
                                    ? "active"
                                    : ""
                                }`,
                                name: item.frequency_recurrence_value,
                                onClick: this._handleGroupingPlan,
                              },
                              item.frequency
                            )
                          )
                        )
                    ),
                  canShowCurrencyTab &&
                    Object(preact["h"])(
                      "div",
                      {
                        id: "cur-container",
                        class: `currency-nav clearfix d-flex align-items-center ${
                          isTabAlignMiddle ? "m-auto" : ""
                        }`,
                      },
                      Object(preact["h"])(
                        "div",
                        {
                          id: "left-scroll",
                          class: "left-scroll float-left cursor-pointer",
                          onClick: () => this.scrollLeft(),
                        },
                        Object(preact["h"])(arrow_left_svg_ArrowLeftSVG, null)
                      ),
                      Object(preact["h"])(
                        "ul",
                        {
                          id: "currency-tab",
                          class: "navs",
                        },
                        model.pricebooks.map((pricebook) =>
                          Object(preact["h"])(
                            "li",
                            {
                              class: "nav-item float-left",
                            },
                            Object(preact["h"])(
                              "a",
                              {
                                class: `nav-link ${
                                  selectedPricebookId === pricebook.pricebook_id
                                    ? "active"
                                    : ""
                                }`,
                                name: pricebook.currency_code,
                                onClick: () =>
                                  this._handleGroupingPricebooks(pricebook),
                              },
                              pricebook.currency_code
                            )
                          )
                        )
                      ),
                      Object(preact["h"])(
                        "div",
                        {
                          id: "right-scroll",
                          class: "right-scroll float-right cursor-pointer",
                          onClick: () => this.scrollRight(),
                        },
                        Object(preact["h"])(arrow_right_svg_ArrowRight, null)
                      )
                    ),
                  canShowCurrencyDropdown &&
                    Object(preact["h"])(
                      "div",
                      {
                        class: "currency-dropdown float-right",
                      },
                      Object(preact["h"])(
                        "div",
                        {
                          className: "dd-header",
                          onClick: () => this.togglePBList(),
                          style: "display: flex",
                        },
                        Object(preact["h"])(
                          "div",
                          {
                            className: "dd-header-title",
                          },
                          model.pricebooks.find(
                            (pricebook) =>
                              pricebook.pricebook_id === selectedPricebookId
                          ).currency_code
                        ),
                        Object(preact["h"])(
                          "div",
                          {
                            class: `line-arrow ${
                              pricebookListOpen ? "down-arrow" : ""
                            }`,
                          },
                          Object(preact["h"])(caret_svg_CaretSVG, null)
                        )
                      ),
                      pricebookListOpen &&
                        Object(preact["h"])(
                          "ul",
                          {
                            className: "dd-list",
                          },
                          model.pricebooks.map((pricebook) =>
                            Object(preact["h"])(
                              "li",
                              {
                                class: `dd-list-item ${
                                  selectedPricebookId === pricebook.pricebook_id
                                    ? "active"
                                    : ""
                                }`,
                                onClick: () =>
                                  this._handleGroupingPricebooks(pricebook),
                              },
                              pricebook.currency_code
                            )
                          )
                        )
                    )
                )
              ),
              Object(preact["h"])(
                "div",
                {
                  class: "pricing-table-body",
                  onClick: () => this.handleClickOutside(),
                },
                Object(preact["h"])(PricingTableComponent, {
                  model: model,
                  data: data,
                })
              )
            );
          } else {
            return Object(preact["h"])(
              "div",
              {
                style: "text-align: center;margin-top: 30px;color: orange;",
              },
              "No Plans associated..."
            );
          }
        }
      }
      // CONCATENATED MODULE: ./src/pricing-table.js

      function receiveMessage(event) {
        var queryString = common["a" /* default */].getQueryStringObject();

        if (
          (event.origin === "null" ||
            event.origin === queryString.frame_origin) &&
          event.data.type === "zf-widget-data"
        ) {
          Object(preact["render"])(
            Object(preact["h"])(PricingTable_App, {
              data: event.data.options,
            }),
            document.getElementById("app")
          );
        }
      }

      window.addEventListener("message", receiveMessage, false);
      var pricing_table_queryString =
        common["a" /* default */].getQueryStringObject();
      window.parent.postMessage(
        {
          is_zf_widget_ready: true,
        },
        "*"
      );

      /***/
    },
    /* 8 */
    /***/ function (module, exports) {
      // removed by extract-text-webpack-plugin
      /***/
    },
    /* 9 */
    /***/ function (module, exports, __webpack_require__) {
      __webpack_require__(7);
      module.exports = __webpack_require__(8);

      /***/
    },
    /******/
  ]
);
