"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var googleForm = function googleForm() {
  // [1] - get all the data first from the form
  var clearBtn = document.querySelector('[data-js-clear-btn]');
  var form = document.querySelector('[data-js-google-form]');
  var recommendRateBtns = document.querySelectorAll('input[name="recommend_rate"]');
  var disappointedRateBtns = document.querySelectorAll('input[name="disappointed_rate"]');
  var learnRateBtns = document.querySelectorAll('input[name="learn_rate"]');
  var challengeRateBtns = document.querySelectorAll('input[name="challenge_rate"]');
  var sessionRateBtns = document.querySelectorAll('input[name="session_rate"]');
  var response = document.querySelector('[data-js-response]'); // this check each radio btn from the list and get their value, otherwise return false

  var validateRadioBtns = function validateRadioBtns(radioBtns) {
    var value;

    var _iterator = _createForOfIteratorHelper(radioBtns),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var radioBtn = _step.value;

        if (radioBtn.checked) {
          value = radioBtn.value;
          break;
        } else {
          value = false;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return value;
  }; // checks radio btn values, if false, adds ".-error" class


  var toggleError = function toggleError(value, dataset) {
    var formBox = document.querySelector(dataset);
    formBox.classList.toggle('-error', !value);
  }; // resets radio btns value and remove ".-error"


  var resetInputValue = function resetInputValue(radioBtns, dataset) {
    var formBox = document.querySelector(dataset);

    var _iterator2 = _createForOfIteratorHelper(radioBtns),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var radioBtn = _step2.value;

        if (radioBtn.checked) {
          radioBtn.checked = false;
          break;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    formBox.classList.remove('-error');
  }; // [2] - start validation when the form submits


  form.addEventListener('submit', function (event) {
    event.preventDefault(); // get each radio btn's value, or else, return false

    var recommendRate = validateRadioBtns(recommendRateBtns);
    var disappointedRate = validateRadioBtns(disappointedRateBtns);
    var learnRate = validateRadioBtns(learnRateBtns);
    var challengeRate = validateRadioBtns(challengeRateBtns);
    var sessionRate = validateRadioBtns(sessionRateBtns);
    var satisfactionRate = learnRate && challengeRate && sessionRate; // if the radio btn's value is false, run this code

    toggleError(recommendRate, '[data-js-recommend-rate]');
    toggleError(disappointedRate, '[data-js-disappointed-rate]');
    toggleError(satisfactionRate, '[data-js-satisfaction-rate]'); // if all data is complete, display the results here

    if (recommendRate && disappointedRate && satisfactionRate) {
      console.log('recommend_rate: ', recommendRate);
      console.log('disappointed_rate: ', disappointedRate);
      console.log('learn_rate: ', learnRate);
      console.log('challenge_rate: ', challengeRate);
      console.log('session_rate: ', sessionRate);
      console.log('response: ', response.value.trim());
    }
  }); // when clicked, reset/remove all values from the inputs

  clearBtn.addEventListener('click', function () {
    resetInputValue(recommendRateBtns, '[data-js-recommend-rate]');
    resetInputValue(disappointedRateBtns, '[data-js-disappointed-rate]');
    resetInputValue(learnRateBtns, '[data-js-satisfaction-rate]');
    resetInputValue(challengeRateBtns, '[data-js-satisfaction-rate]');
    resetInputValue(sessionRateBtns, '[data-js-satisfaction-rate]');
    response.value = '';
  });
}; // make sure the page is loaded first


document.addEventListener('readystatechange', function (event) {
  if (event.target.readyState === 'complete') googleForm();
});