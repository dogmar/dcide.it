import InteractiveSort from "./interactive-sort";

import Chance from "chance";

const seedGenerator = new Chance();
const seed = process.env.SEED || seedGenerator.hash();

const chance = new Chance(seed);

test("sorts 1", () => {
  const sortedList = [1];
  const list = [1];
  const sorter = InteractiveSort(list);

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = sorter.nextMatch())) {
    if (match[0] === match[1]) {
      sorter.answerMatch(0);
    } else if (match[0] < match[1]) {
      sorter.answerMatch(-1);
    } else {
      sorter.answerMatch(1);
    }
  }
  expect(sorter.sortedList()).toEqual(sortedList);
});

test("sorts 2", () => {
  const sortedList = [1, 2];
  const list = [2, 1];
  const sorter = InteractiveSort(list);

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = sorter.nextMatch())) {
    if (match[0] === match[1]) {
      sorter.answerMatch(0);
    } else if (match[0] < match[1]) {
      sorter.answerMatch(-1);
    } else {
      sorter.answerMatch(1);
    }
  }
  expect(sorter.sortedList()).toEqual(sortedList);
});

test("sorts 3", () => {
  const sortedList = [1, 2, 3];
  const list = [2, 1, 3];
  const sorter = InteractiveSort(list);

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = sorter.nextMatch())) {
    if (match[0] === match[1]) {
      sorter.answerMatch(0);
    } else if (match[0] < match[1]) {
      sorter.answerMatch(-1);
    } else {
      sorter.answerMatch(1);
    }
  }
  expect(sorter.sortedList()).toEqual(sortedList);
});

test("sorts array", () => {
  const list = Array.from({ length: 50 }, () =>
    chance.integer({ min: 0, max: 99 })
  );
  const sortedList = [...list];
  sortedList.sort((a,b)=> a - b);
  const sorter = InteractiveSort(list);

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = sorter.nextMatch())) {
    if (match[0] === match[1]) {
      sorter.answerMatch(0);
    } else if (match[0] < match[1]) {
      sorter.answerMatch(-1);
    } else {
      sorter.answerMatch(1);
    }
  }
  expect(sorter.sortedList()).toEqual(sortedList);
});
