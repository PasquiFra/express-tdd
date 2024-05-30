const slugger = require('../slugger');
const posts = require("../data/posts.json");

//importo i moduli di jest
const { test, expect } = require("@jest/globals");

// createSlug dovrebbe ritornare una stringa

test("createSlug dovrebbe lanciare un errore se non viene passata una stringa", () => {

    expect(() => slugger('', posts)).toThrow();
    expect(() => slugger(null, posts)).toThrow();
    expect(() => slugger(undefined, posts)).toThrow();
    expect(() => slugger(4, posts)).toThrow();

})

// createSlug dovrebbe ritornare una stringa in lowercase

test("createSlug dovrebbe ritornare una stringa in lowercase", () => {

    expect(slugger('Title', posts)).toBe("title");

})

// createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -

test("createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -", () => {

    expect(slugger('Bitcoin is Digital Gold ', posts)).toBe("bitcoin-is-digital-gold");

})