import { v4 as uuid } from "uuid";

interface Identifiable {
  id: string;
}

interface Matchup<T extends Identifiable> {
  id: string;
  match: {
    winner?: T["id"];
    contestants: (T | Matchup<T>)[];
  };
}
function getMatchID<T>(contestants: T) {
  return uuid();
}

function chunkArray<T>(a: T[], n: number, balanced: boolean = true) {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
}

function makeBracket<Contestant extends Identifiable>(
  contestants: Contestant[],
  options?: { maxContestants: number; balanced: boolean; [i: string]: any }
): Matchup<Contestant> | null {
  const seedCount = contestants.length;
  const MIN_CONTESTANTS = 2;
  const maxContestants = options?.maxContestants || 2;
  const balanced = options?.balanced || true;
  if (seedCount < MIN_CONTESTANTS) {
    return null;
  }
  let splits = chunkArray(contestants, maxContestants, balanced);
  let contests = splits.map((c) => {
    return makeBracket<Contestant>(c, options) || c[0];
  });

  return {
    id: getMatchID(contests),
    match: {
      contestants: contests,
    },
  };
}

export { makeBracket };
