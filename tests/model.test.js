const test = require("node:test")
const assert = require("node:assert/strict")

const { parseAccounts } = require("../Model.js")

test("parseAccounts marks the current account", () => {
  const accounts = parseAccounts([
    "EMAIL\tNETWORK\tNETWORK URL\t",
    "one@example.com\tacme\thttps://acme.twingate.com\t*",
    "two@example.com\tother\thttps://other.twingate.com\t"
  ].join("\n"))

  assert.deepEqual(accounts, [
    {
      email: "one@example.com",
      network: "acme",
      networkUrl: "https://acme.twingate.com",
      current: true
    },
    {
      email: "two@example.com",
      network: "other",
      networkUrl: "https://other.twingate.com",
      current: false
    }
  ])
})

test("parseAccounts supports legacy output without a current marker", () => {
  const accounts = parseAccounts(
    "EMAIL\tNETWORK\tNETWORK URL\nuser@example.com\tacme\thttps://acme.twingate.com"
  )

  assert.equal(accounts.length, 1)
  assert.equal(accounts[0].current, false)
})

test("parseAccounts returns an empty list for empty or unrelated output", () => {
  assert.deepEqual(parseAccounts(""), [])
  assert.deepEqual(parseAccounts("No accounts are available"), [])
})
