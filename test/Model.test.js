const Model = require('../Model')
//importo i moduli di jest
const { test, expect } = require("@jest/globals");

// Model dovrebbe essere una classe (crea un'istanza della classe Model)
test("Model dovrebbe essere una classe (crea un'istanza della classe Model)", () => {

    const instance = new Model()

    expect(instance).toBeInstanceOf(Model)
})

// L'istanza di model dovrebbe richiedere il nome del file json da usare in fase di creazione dell'istanza
test("L'istanza di model dovrebbe richiedere il nome del file json da usare in fase di creazione dell'istanza", () => {

    const instance = new Model()


})

