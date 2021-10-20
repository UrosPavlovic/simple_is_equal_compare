const isEqual = require("./isEqual.js");

describe("IsEqual", () => {
  describe("it should return is value is equal to its pairing", () => {
    it("returns condition without arguments", () => {
      expect(isEqual("ab", "ab")).toEqual(true);
      expect(isEqual("ab", "aa")).toEqual(false);
      expect(isEqual("aa", 1)).toEqual(false);
      expect(isEqual("1", 1)).toEqual(false);
      expect(isEqual(1, 2)).toEqual(false);
      expect(isEqual(12, 12)).toEqual(true);
      expect(isEqual({}, [])).toEqual(false);
      expect(isEqual({}, new Map())).toEqual(false);
      expect(isEqual({}, new Set())).toEqual(false);
      expect(isEqual([], new Set())).toEqual(false);
      expect(isEqual({ a: "1" }, { a: "1" })).toEqual(true);
      expect(isEqual({ a: "1" }, { a: 1 })).toEqual(false);
      expect(isEqual({ a: "1", b: "2" }, { a: "1", b: "2" })).toEqual(true);
      expect(isEqual({ a: "1", b: "2" }, { a: "1", b: "2", c: "3" })).toEqual(false);
      expect(isEqual(["a", "b"], ["a"])).toEqual(false);
      expect(isEqual(["a", "b"], ["a", "b"])).toEqual(true);
      expect(isEqual([{ a: 1 }, { b: 1 }], ["a", "b"])).toEqual(false);
      expect(isEqual([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }])).toEqual(true);
      expect(isEqual([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }, { c: 3 }])).toEqual(false);

      const complexObject1 = { a: { a: 1 } };
      const complexObject2 = { a: { a: 1 } };
      const complexObject3 = { a: { a: 3 } };
      const complexObject4 = { a: { a: [] } };
      const complexObject5 = { a: { a: ["1"] } };
      const complexObject6 = { a: { a: ["1"] } };
      const complexObject7 = { a: { a: [1] } };

      expect(isEqual(complexObject1, complexObject2)).toEqual(true);
      expect(isEqual(complexObject1, complexObject3)).toEqual(false);
      expect(isEqual(complexObject1, complexObject4)).toEqual(false);
      expect(isEqual(complexObject4, complexObject5)).toEqual(false);
      expect(isEqual(complexObject5, complexObject6)).toEqual(true);
      expect(isEqual(complexObject6, complexObject7)).toEqual(false);

      const set1 = new Set();
      const set2 = new Set();
      const set3 = new Set();

      set2.add(1);
      set3.add(1);
      expect(isEqual(set1, set2)).toEqual(false);
      expect(isEqual(set2, set3)).toEqual(true);

      const map1 = new Map();
      const map2 = new Map();
      const map3 = new Map();

      map2["a"] = "a";
      map3["a"] = "a";
      expect(isEqual(map1, map2)).toEqual(false);
      expect(isEqual(map2, map3)).toEqual(true);
    });
  });
});