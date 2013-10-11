/* jshint node:true*/
/* globals buster, assert, refute, CircularList*/

buster.testCase('CircularList', {
	'Append should append objects to the end of the list' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var obj = {};
		var itemA = new CircularList.CircularList.Item(obj);
		var itemB = new CircularList.CircularList.Item(obj + {"o": 1});

		list.append(itemA);

		assert.equals(list.length, 1);

		list.append(itemB);

		assert.equals(list.length, 2);

		// Assert that item A was attached to the previous property of the new item in order to make this circular.
		assert.equals(itemB.prev, itemA);

		// Assert that itemB was also attached to the next property of the first item.
		assert.equals(itemA.next, itemB);

		// Assert that item B was attached to the previous property of item A.
		assert.equals(itemA.prev, itemB);
	},
	'Remove should remove an item from the linked list' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var itemA = new CircularList.CircularList.Item({A:1}),
			itemB = new CircularList.CircularList.Item({B:2}),
			itemC = new CircularList.CircularList.Item({C:2});

		list.append(itemA);
		list.append(itemB);
		list.append(itemC);

		assert.equals(list.length, 3);

		list.remove(itemB);

		assert.equals(list.length, 2);

		refute.equals(itemB.next, itemC);
		assert.equals(itemA.next, itemC);
		assert.equals(itemC.prev, itemA);
		assert.equals(itemA.prev, itemC);

		list.remove(itemA);

		assert.equals(list.length, 1);

		refute.equals(itemA.next, itemC);
		refute.equals(itemA.prev, itemC);

		assert.equals(itemC.next, itemC);
		assert.equals(itemC.prev, itemC);

		list.remove(new CircularList.CircularList.Item({C:{C:2}}));

		// We tried removing an item that doesn't exist in the list.
		refute.equals(list.length, 0);

		list.remove(itemC);

		assert.equals(list.length, 0);
	},
	'To array should return an array representation of the circularly linked list' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var itemA = new CircularList.CircularList.Item({A:1}),
			itemB = new CircularList.CircularList.Item({B:2}),
			itemC = new CircularList.CircularList.Item({C:3});


		list.append(itemA);
		list.append(itemB);
		list.append(itemC);

		var resultingArray = list.toArray();

		assert.equals(resultingArray[0], itemA);
		assert.equals(resultingArray[1], itemB);
		assert.equals(resultingArray[2], itemC);

		assert.equals(resultingArray.length, list.length);
	},
	'Insert an item after an already exisiting item in the linked list' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var itemA = new CircularList.CircularList.Item({A:1}),
			itemB = new CircularList.CircularList.Item({B:2}),
			itemC = new CircularList.CircularList.Item({C:3});

		list.append(itemA);
		list.append(itemB);
		list.append(itemC);

		assert.equals(itemC.next, itemA);

		var itemD = new CircularList.CircularList.Item({D:4});

		list.insertAfter(itemB, itemD);

		assert.equals(list.length, 4);
		assert.equals(itemB.next, itemD);
	},
	'Inserting an item after the last item in the linked list should update CircularList#last' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var itemA = new CircularList.CircularList.Item({A:1}),
			itemB = new CircularList.CircularList.Item({B:2}),
			itemC = new CircularList.CircularList.Item({C:3});

		list.append(itemA);
		list.append(itemB);
		list.append(itemC);

		assert.equals(itemC.next, itemA);

		var itemD = new CircularList.CircularList.Item({D:4});

		list.insertAfter(itemC, itemD);

		assert.equals(list.length, 4);
		assert.equals(itemC.next, itemD);
		assert.equals(list.last, itemD);
	},
	'CircularList#destroy should unset properties on member items which are not explicitly a CircularList.CircularList.Item object' : function() {
		'use strict';
		var list = new CircularList.CircularList();

		var itemA = {A:1},
			itemB = {B:2},
			itemC = {C:3};

		list.append(itemA);
		list.append(itemB);
		list.append(itemC);

		assert.equals(list.length, 3);

		list.destroy();

		refute.defined(itemA.prev);
		refute.defined(itemA.next);
		refute.defined(itemA.list);

		refute.defined(itemB.prev);
		refute.defined(itemB.next);
		refute.defined(itemB.list);

		refute.defined(itemC.prev);
		refute.defined(itemC.next);
		refute.defined(itemC.list);

		refute.defined(list.length);
		refute.defined(list.first);
		refute.defined(list.last);
	}
});