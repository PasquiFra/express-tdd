const slugger = require('../slugger');
const posts = require("../data/posts.json");

//importo i moduli di jest
const { test, expect } = require("@jest/globals");

// createSlug dovrebbe ritornare una stringa

test("createSlug dovrebbe lanciare un errore se non viene passata una stringa", () => {

    expect(() => slugger(4, posts)).toThrow('Il titolo non può essere un numero');

})

// createSlug dovrebbe ritornare una stringa in lowercase

test("createSlug dovrebbe ritornare una stringa in lowercase", () => {

    expect(slugger('Title', posts)).toBe("title");

})

// createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -

test("createSlug dovrebbe ritornare una stringa con gli spazi sostituiti da -", () => {

    expect(slugger('Bitcoin is Digital Gold ', posts)).toBe("bitcoin-is-digital-gold");

})

// createSlug dovrebbe incrementare di 1 lo slug quando esiste già

test("createSlug dovrebbe incrementare di 1 lo slug quando esiste già", () => {

    expect(slugger('Introduction to Bitcoin', posts)).toBe("introduction-to-bitcoin-1");

})

// createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato

test("createSlug dovrebbe lanciare un errore in caso di titolo non presente o formato errato", () => {

    expect(() => slugger('', posts)).toThrow();
    expect(() => slugger([], posts)).toThrow();
    expect(() => slugger({}, posts)).toThrow();
    expect(() => slugger(null, posts)).toThrow();
    expect(() => slugger(undefined, posts)).toThrow();

})

// createSlug dovrebbe lanciare un errore se manca l'array dei post

test("createSlug dovrebbe lanciare un errore se manca l'array dei post", () => {

    expect(() => slugger('Introduction to Bitcoin')).toThrow();

})

