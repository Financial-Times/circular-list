
/*jshint node:true*/

'use strict';

/**
 * Create a circularly-linked list
 *
 * Adapted from original
 * version by James Coglan.
 *
 * @fileOverview
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 */

/**
 * Expose `CircularList`
 */

exports.CircularList = CircularList;

/**
 * @constructor
 */
function CircularList(maxLength) {


  if (maxLength && maxLength > 0) this.maxLength = maxLength;

  /**
   * The length of the linked list
   *
   * @type number
   */
  this.length = 0;

  /**
   * The first item in the linked list
   *
   * @type Object
   */
  this.first = null;

  /**
   * The last item in the linked list
   *
   * @type Object
   */
  this.last = null;
}


/**
 * Explicit item object to
 * allow items to belong to
 * more than one linked list
 * at a time
 *
 * To hold a reference to a
 * CircularList.Item within
 * a completely different CircularList
 * the CircularList.Item should
 * be passed as the data to a
 * new CircularList.Item to be
 * used in the new CircularList.
 *
 * If you don't wrap the reference
 * in a new Item, then if you append
 * an already existing reference to
 * a different CircularList the
 * behaviour is undefined.
 *
 * @example
 * myList.append(new CircularList.Item(someObject));
 *
 * @constructor
 * @param {Object} data
 */
CircularList.Item = function (data) {
  this.prev = null;
  this.next = null;
  this.list = null;
  this.data = data;
};

/**
 * Append an object
 * to the linked list
 *
 * @param {Object} item The item to append
 */
CircularList.prototype.append = function (item) {
  if (this.first === null) {
    item.prev = item;
    item.next = item;
    this.first = item;
    this.last = item;
  } else {
    item.prev = this.last;
    item.next = this.first;
    this.first.prev = item;
    this.last.next = item;
    this.last = item;
  }

  item.list = this;
  this.length++;
  if (this.maxLength && this.length > this.maxLength) {
    this.remove(this.first);
  }
};

/**
 * Remove an item from
 * the linked list
 *
 * @param {Object} item The item to remove
 */
CircularList.prototype.remove = function (item) {

  // Exit early if the item isn't in the list
  if (!this.length || this !== item.list) {
    return;
  }

  if (this.length > 1) {
    item.prev.next = item.next;
    item.next.prev = item.prev;

    if (item === this.first) {
      this.first = item.next;
    }

    if (item === this.last) {
      this.last = item.prev;
    }
  } else {
    this.first = null;
    this.last = null;
  }

  item.prev = null;
  item.next = null;
  this.length--;
};

CircularList.prototype.pop = function (item) {
  var data = this.last.data;
  this.remove(this.last);
  return data;
};

/**
 * Convert the linked
 * list to an Array
 *
 * The first item in the list is the first item in the array.
 *
 * @return {Array}
 */
CircularList.prototype.toArray = function () {
  var i, item, array, length = this.length;

  array = new Array(length);
  item = this.first;

  for (i = 0; i < length; i++) {
    array[i] = item;
    item = item.next;
  }

  return array;
};

/**
 * Convert the linked
 * list to an Array where the CircularList item is just it's data.
 *
 * The first item in the list is the first item in the array.
 *
 * @return {Array}
 */
CircularList.prototype.toDataArray = function () {
  var i, item, array, length = this.length;

  array = new Array(length);
  item = this.first;

  for (i = 0; i < length; i++) {
    array[i] = item.data;
    item = item.next;
  }

  return array;
};

/**
 * Insert an item after one
 * already in the linked list
 *
 * @param {Object} item The reference item
 * @param {Object} newItem The item to insert
 */
CircularList.prototype.insertAfter = function (item, newItem) {
  newItem.prev = item;
  newItem.next = item.next;
  item.next.prev = newItem;
  item.next = newItem;

  if (newItem.prev === this.last) {
    this.last = newItem;
  }

  newItem.list = this;
  this.length++;
  if (this.maxLength && this.length > this.maxLength) {
    this.remove(this.first);
  }
};

/**
 * Destroy the CircularList,
 * and unlink the member items
 */
CircularList.prototype.destroy = function () {
  var i, thisItem, nextItem, length = this.length;

  thisItem = this.first;

  for (i = 0; i < length; i++) {
    nextItem = thisItem.next;

    delete thisItem.prev;
    delete thisItem.next;
    delete thisItem.list;

    thisItem = nextItem;
  }

  delete this.length;
  delete this.first;
  delete this.last;
};
