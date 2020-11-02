import { makeBracket } from "./bracketer";

type C = { id: string };

test("two contestants", () => {
  const brkt = makeBracket<C>([{ id: "1" }, { id: "2" }]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [{ id: "1" }, { id: "2" }],
    },
  });
});

test("three contestants", () => {
  const brkt = makeBracket<C>([{ id: "1" }, { id: "2" }, { id: "3" }]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [
        {
          match: {
            contestants: [{ id: "1" }, { id: "2" }],
          },
        },
        { id: "3" },
      ],
    },
  });
});

test("four contestants", () => {
  const brkt = makeBracket<C>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
  ]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [
        {
          match: {
            contestants: [{ id: "1" }, { id: "2" }],
          },
        },
        {
          match: {
            contestants: [{ id: "3" }, { id: "4" }],
          },
        },
      ],
    },
  });
});

test("five contestants", () => {
  const brkt = makeBracket<C>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [
        {
          match: {
            contestants: [
              {
                match: {
                  contestants: [{ id: "1" }, { id: "2" }],
                },
              },
              { id: "3" },
            ],
          },
        },
        {
          match: {
            contestants: [{ id: "4" }, { id: "5" }],
          },
        },
      ],
    },
  });
});

test("six contestants", () => {
  const brkt = makeBracket<C>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
  ]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [
        {
          match: {
            contestants: [
              {
                match: {
                  contestants: [{ id: "1" }, { id: "2" }],
                },
              },
              { id: "3" },
            ],
          },
        },
        {
          match: {
            contestants: [
              {
                match: {
                  contestants: [{ id: "4" }, { id: "5" }],
                },
              },
              { id: "6" },
            ],
          },
        },
      ],
    },
  });
});

test("seven contestants", () => {
  const brkt = makeBracket<C>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
  ]);
  expect(brkt).toMatchObject({
    match: {
      contestants: [
        {
          match: {
            contestants: [
              {
                match: {
                  contestants: [{ id: "1" }, { id: "2" }],
                },
              },
              {
                match: {
                  contestants: [{ id: "3" }, { id: "4" }],
                },
              },
            ],
          },
        },
        {
          match: {
            contestants: [
              {
                match: {
                  contestants: [{ id: "5" }, { id: "6" }],
                },
              },
              { id: "7" },
            ],
          },
        },
      ],
    },
  });
});
