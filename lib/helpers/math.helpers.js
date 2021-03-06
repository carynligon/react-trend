"use strict";

exports.__esModule = true;
/* eslint-disable no-restricted-properties */

/** normalize
 * This lets us translate a value from one scale to another.
 *
 * @param {Number} value - Our initial value to translate
 * @param {Number} min - the current minimum value possible
 * @param {Number} max - the current maximum value possible
 * @param {Number} scaleMin - the min value of the scale we're translating to
 * @param {Number} scaleMax - the max value of the scale we're translating to
 *
 * @returns {Number} the value on its new scale
 */
var normalize = exports.normalize = function normalize(_ref) {
  var value = _ref.value,
      min = _ref.min,
      max = _ref.max,
      _ref$scaleMin = _ref.scaleMin,
      scaleMin = _ref$scaleMin === undefined ? 0 : _ref$scaleMin,
      _ref$scaleMax = _ref.scaleMax,
      scaleMax = _ref$scaleMax === undefined ? 1 : _ref$scaleMax;

  // If the `min` and `max` are the same value, it means our dataset is flat.
  // For now, let's assume that flat data should be aligned to the bottom.
  if (min === max) {
    return scaleMin;
  }

  return scaleMin + (value - min) * (scaleMax - scaleMin) / (max - min);
};

/** moveTo
 * the coordinate that lies at a midpoint between 2 lines, based on the radius
 *
 * @param {Object} to - Our initial point
 * @param {Number} to.x - The x value of our initial point
 * @param {Number} to.y - The y value of our initial point
 * @param {Object} from - Our final point
 * @param {Number} from.x - The x value of our final point
 * @param {Number} from.y - The y value of our final point
 * @param {Number} radius - The distance away from the final point
 *
 * @returns {Object} an object holding the x/y coordinates of the midpoint.
 */
var moveTo = exports.moveTo = function moveTo(to, from, radius) {
  var vector = { x: to.x - from.x, y: to.y - from.y };
  var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  var unitVector = { x: vector.x / length, y: vector.y / length };

  return {
    x: from.x + unitVector.x * radius,
    y: from.y + unitVector.y * radius
  };
};

/** getDistanceBetween
 * Simple formula derived from pythagoras to calculate the distance between
 * 2 points on a plane.
 *
 * @param {Object} p1 - Our initial point
 * @param {Number} p1.x - The x value of our initial point
 * @param {Number} p1.y - The y value of our initial point
 * @param {Object} p2 - Our final point
 * @param {Number} p2.x - The x value of our final point
 * @param {Number} p2.y - The y value of our final point
 *
 * @returns {Number} the distance between the points.
 */
var getDistanceBetween = exports.getDistanceBetween = function getDistanceBetween(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/** checkForCollinearPoints
 * Figure out if the midpoint fits perfectly on a line between the two others.
 *
 * @param {Object} p1 - Our initial point
 * @param {Number} p1.x - The x value of our initial point
 * @param {Number} p1.y - The y value of our initial point
 * @param {Object} p2 - Our mid-point
 * @param {Number} p2.x - The x value of our mid-point
 * @param {Number} p2.y - The y value of our mid-point
 * @param {Object} p3 - Our final point
 * @param {Number} p3.x - The x value of our final point
 * @param {Number} p3.y - The y value of our final point

 * @returns {Boolean} whether or not p2 sits on the line between p1 and p3.
 */
var checkForCollinearPoints = exports.checkForCollinearPoints = function checkForCollinearPoints(p1, p2, p3) {
  return (p1.y - p2.y) * (p1.x - p3.x) === (p1.y - p3.y) * (p1.x - p2.x);
};