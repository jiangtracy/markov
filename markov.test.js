/** Command-line tool to generate Markov text. */
let {MarkovMachine} = require("./markov.js");

describe("makeChains function", function () {

  test("make chains", function () {
    let text = "the cat in the hat";
    let chains = {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]};
    let mm = new MarkovMachine(text);
    expect(mm.makeChains()).toEqual(chains);
  });

  test("make chains", function () {
    let text = "the moon is orbiting the earth";
    let chains = {"the": ["moon", "earth"], "moon": ["is"], "is": ["orbiting"], "orbiting": ["the"], "earth": [null]}
    let mm = new MarkovMachine(text);
    expect(mm.makeChains()).toEqual(chains);
  });

  test("make chains 3", function () {
    let text = "the cat in the hat in the cat";
    let chains = {"the": ["cat", "hat", "cat"], "cat": ["in", null], "in": ["the", "the"], "hat": ["in"]};
    let mm = new MarkovMachine(text);
    expect(mm.makeChains()).toEqual(chains);
  });

});




describe("getText function", function () {

  test("getText 1", function () {
    let text = "the cat in the hat";
    let mm = new MarkovMachine(text);
    let UniqueWords = new Set(mm.words);
    let newText = mm.getText(numWords = 20);
    for (word of newText.split(" ")){
      expect(UniqueWords).toContain(word);
    }
  });

  test("getText 2", function () {
    let text = "the moon is orbiting the earth";
    let mm = new MarkovMachine(text);
    let UniqueWords = new Set(mm.words);
    let newText = mm.getText(numWords = 20);
    for (word of newText.split(" ")){
      expect(UniqueWords).toContain(word);
    }
  });

});


