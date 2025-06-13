const SimpleStorage = artifacts.require("SimpleStorage");

contract("SimpleStorage", accounts => {
    it("should store the value 42", async () => {
        const instance = await SimpleStorage.deployed();
        await instance.set(42, { from: accounts[0]});
        const stored = await instance.get();
        assert.equal(stored.toNumber(), 42, "The value 42 was not stored")

    });

     it("should overwrite the value", async () => {
    const instance = await SimpleStorage.deployed();
    await instance.set(100, { from: accounts[0] });

    const stored = await instance.get();
    assert.equal(stored.toNumber(), 100, "The value was not updated to 100.");
  });
})