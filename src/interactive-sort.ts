function InteractiveSort<T>(values: T[]) {

  let subLists: T[][] = values.map((v) => [v]);
  let sortedList: T[] | null = null;

  if (values.length <= 1) {
    sortedList = values;
  }

  let l1i = 0;
  let l1j = 0;

  let l2i = 1;
  let l2j = 0;

  type Matchup = [T, T];
  function nextMatch(): Matchup | null {
    if (sortedList) {
      return null;
    }
    let el1 = subLists[l1i][l1j];
    let el2 = subLists[l2i][l2j];
    return [el1, el2];
  }

  function answerMatch(compareResult: number) {
    if (sortedList) {
      return null;
    }
    // Negative - left moves to lower index
    // Positive - left moves to higher index
    // 0 - Leave alone
    let l1 = subLists[l1i];
    let l2 = subLists[l2i];

    let l1Next: T[] = [];
    let l2Next: T[] = [];
    let subListsOld = [];
    if (compareResult > 0) {
      // Insert left
      l1Next = [...l1.slice(0, l1j), l2[l2j], ...l1.slice(l1j)];
      l2Next = l2.slice(1);
      l1j++;
    } else if (l1.length - 1 === l1j) {
      // Append right
      l1Next = [...l1, ...l2];
    } else {
      // Shift array pointer +1;
      // l1Next = [...l1, l2[0]];
      l1j++;
      l1Next = l1;
      l2Next = l2;
      // l2Next = l2.slice(1);
      // l2j = 0;
    }

    // Reconstruct subLists
    subListsOld = subLists;
    subLists = subLists.slice(0, l1i);
    subLists.push(l1Next);
    if (l2Next.length > 0) {
      subLists.push(l2Next);
    }
    subLists = subLists.concat(subListsOld.slice(l2i + 1));

    // If there's only one sub-list left, then we're done merging!
    if (subLists.length === 1) {
      sortedList = subLists[0];
      subLists = [];
      return;
    }
    if (l2Next.length === 0) {
      l1j = 0;
      l2j = 0;
      l1i = 0;
      for (let i = 0; i < subLists.length - 1; ++i) {
        if (subLists[i + 1].length < subLists[l1i].length) {
          l1i = i;
        }
      }
      l2i = l1i + 1;
    }
  }
  return {
    nextMatch: nextMatch,
    answerMatch: answerMatch,
    sortedList: () => sortedList,
  };
}

export default InteractiveSort;
