# Security review: Remote trust lab

Date: 12 October 2026
Reviewer: lce_te
Scope: one server script (five RemoteEvents: GrantCoins, BuyItem, SaveData, SellItem, AdminCommand) in a test game I built for this review. It is a lab, not a client game.
Method: manual code review, then each finding tested in a private, unpublished place using a test client that fires the same remote calls an exploiter would. Every fix was re-tested against the same attacks.

## Summary

Five findings: four Critical, one High. Every one comes from the same mistake: the server believes what the client tells it. After the fixes, all five attacks fail and normal gameplay still works. Fix first: SaveData and AdminCommand, because they give an exploiter total control in one call.

| # | Finding | Severity | Status |
|---|---|---|---|
| 1 | GrantCoins: client chooses the amount | Critical | Verified fixed |
| 2 | BuyItem: client chooses the price | Critical | Verified fixed |
| 3 | SaveData: server saves a client-supplied table | Critical | Verified fixed |
| 4 | SellItem: race condition double spend | High | Verified fixed |
| 5 | AdminCommand: client supplies its own rank | Critical | Verified fixed |

## Findings

### 1. GrantCoins (Critical)

- What is wrong: the remote adds whatever number the client sends to the player's coins.
- How it can be abused: `GrantCoins:FireServer(1000000)`. Result in the test: 100 coins became 1,000,100.
- Impact: unlimited currency for any player.
- Fix: the client only says which pickup it touched, and the server looks up the reward in its own table, with a rate limit. Better still, detect pickups on the server and remove the remote.
- Verification: the same call is ignored.

### 2. BuyItem (Critical)

- What is wrong: The client supplies the price. Negative values pass the `coins >= -5000` check, so subtracting one increases the player's coin balance.
- How it can be abused: `BuyItem:FireServer("Sword", -5000)`. Result: bought a Sword and gained 5,000 coins.
- Impact: unlimited currency and free items.
- Fix: the server keeps a catalog of prices and ignores any price the client sends. Unknown item ids are rejected.
- Verification: the same call buys one Sword at the real price of 100.

### 3. SaveData (Critical)

- What is wrong: The client submits its entire profile, which the server stores without validation.
- How it can be abused: send a table with any coins, level and inventory. Result: coins 999,999, level 100, 99 Swords.
- Impact: total control over the player's state. In a real game this would also be written to the DataStore.
- Fix: delete the remote. Deleting SaveData removes the client's ability to write arbitrary profile data at all. Validation would still treat client-provided values as authoritative and could miss unexpected fields or malicious changes. The server should own the profile and save only state produced by trusted server logic.
- Verification: the remote no longer exists, so the call cannot be made.

### 4. SellItem (High)

- What is wrong: The server verifies that the player owns the item, waits to simulate a DataStore or marketplace call, and then removes it. Requests received during the delay can all pass the ownership check.
- How it can be abused: fire the remote 20 times at once. `task.wait` pauses the first call before the item is removed. It does not lock the inventory or reserve the item. While the first call is waiting, the other 19 calls run, see that the Sword is still present, and pass the same ownership check. They then all resume and award coins. Result: 2 Swords sold 20 times, coins 100 to 1,100, Sword count -18.
- Impact: duplicated currency for items the player never had.
- Fix: change the state first, then yield. Each call then sees the updated inventory.
- Verification: the same 20 calls sell exactly 2 Swords and the count stops at 0.

### 5. AdminCommand (Critical)

- What is wrong: The server determines admin status using a `rank` value supplied by the client.
- How it can be abused: `AdminCommand:FireServer("givecoins", name, 50000, 99)`. Result: +50,000 coins.
- Impact: any player can run admin commands.
- Fix: check the player's UserId against a server-side allowlist, allow only known commands, and validate the arguments (type, integer, range).
- Verification: the same call is ignored.

## Recommendations

1. Never trust the client for values, prices, identity or ownership. The client asks for an action, the server decides the result.
2. Validate every remote argument: type, range, whole number, not NaN.
3. Keep prices, rewards and permissions in server-side tables.
4. Change state before any yield (DataStore, MarketplaceService, task.wait) so concurrent calls cannot reuse a stale check.
5. Rate-limit any remote a client can spam.

## Out of scope

Anything not in the five remotes: DataStore schema, anti-cheat for movement or physics, Roblox platform issues, third-party free models, and any live game. Real games will have flaws this lab does not show.
