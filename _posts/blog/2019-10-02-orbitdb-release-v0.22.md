---
layout: post
title:  "OrbitDB 0.22 released"
excerpt: "Release notes for OrbitDB v0.22"
tags: []
date: 2019-10-02
author: richardlitt
---

# OrbitDB v0.22

> It's a lot faster and there are more cool options

We're releasing v0.22 today! The last release was on [TR], and the OrbitDB team has been working hard since then to make sure that this next release makes OrbitDB faster, easier, and more delightful to work with. Here's the tl;dr:

- **Significant** performance improvements (by significant, we mean 10x)
- Better concurrency across the board
- Lots of small bug fixes and a few option improvements

This wouldn't have been possible without our community. So, thank you to:
- [@1083](https://github.com/1083)
- [@alanshaw](https://github.com/alanshaw)
- [@Aphelionz](https://github.com/Aphelionz)
- [@basraven](https://github.com/basraven)
- [@chmanie](https://github.com/chmanie)
- [@Gadzook8](https://github.com/Gadzook8)
- [@Haadcode](https://github.com/Haadcode)
- [@JaniAnttonen](https://github.com/JaniAnttonen)
- [@KristianWahlroos](https://github.com/KristianWahlroos)
- [@Mistakia](https://github.com/Mistakia)
- [@oed](https://github.com/oed)
- [@phillmac](https://github.com/phillmac)
- [@ptoner](https://github.com/ptoner)
- [@Shamb0t](https://github.com/Shamb0t)
- [@spartanz51](https://github.com/spartanz51)
- [@tabcat](https://github.com/tabcat)
- [@vaultec81](https://github.com/vaultec81)
- [@vvp](https://github.com/vvp)
- [@zachferland](https://github.com/zachferland)
- And anyone else we've unintentionally left out, who has helped out or been on [the Gitter](https://gitter.im/orbitdb/Lobby) or supported us in any way.

The rest of this post will be fairly technical. Here's a ToC:

- [Performance Improvements](#part-1-performance-improvements)
  - [Better concurrency in `ipfs-log`](#better-concurrency-in-ipfs-log)
  - [Concurrency Tuning](#concurrency-tuning)
  - [Introducing the [OrbitDB Storage Adapter](https://github.com/orbitdb/orbit-db-storage-adapter)](#introducing-the-orbitdb-storage-adapterhttpsgithubcomorbitdborbit-db-storage-adapter)
    - [Things the reader should know](#things-the-reader-should-know)
- [Other Options](#other-options)
  - [Concurrent Browser Tab support:](#concurrent-browser-tab-support)
  - [entryIndex module](#entryindex-module)
  - [Hash tiebreaker](#hash-tiebreaker)
- [Other Stuff](#other-stuff)
  - [js-ipfs 0.37 support](#js-ipfs-037-support)
  - [Refactor: identity.id instead of identity.key](#refactor-identityid-instead-of-identitykey)
  - [New formats in ipfs-io](#new-formats-in-ipfs-io)
  - [A metafield in the manifest](#a-metafield-in-the-manifest)
  - [General bugfixes and updates:](#general-bugfixes-and-updates)

## Performance Improvements

Before:

```
$ node benchmarks/benchmark-add.js
47 queries per second, 47 queries in 1 seconds (Oplog: 47)
39 queries per second, 86 queries in 2 seconds (Oplog: 86)
43 queries per second, 129 queries in 3 seconds (Oplog: 129)
38 queries per second, 167 queries in 4 seconds (Oplog: 167)
38 queries per second, 205 queries in 5 seconds (Oplog: 205)
35 queries per second, 240 queries in 6 seconds (Oplog: 241)
35 queries per second, 275 queries in 7 seconds (Oplog: 275)
39 queries per second, 314 queries in 8 seconds (Oplog: 314)
40 queries per second, 354 queries in 9 seconds (Oplog: 354)
--> Average of 39.1 q/s in the last 10 seconds
```

After

```
$ node benchmarks/benchmark-add.js
431 queries per second, 431 queries in 1 seconds (Oplog: 431)
471 queries per second, 902 queries in 2 seconds (Oplog: 902)
476 queries per second, 1378 queries in 3 seconds (Oplog: 1378)
492 queries per second, 1870 queries in 4 seconds (Oplog: 1870)
493 queries per second, 2363 queries in 5 seconds (Oplog: 2363)
496 queries per second, 2859 queries in 6 seconds (Oplog: 2859)
492 queries per second, 3351 queries in 7 seconds (Oplog: 3351)
498 queries per second, 3849 queries in 8 seconds (Oplog: 3849)
504 queries per second, 4353 queries in 9 seconds (Oplog: 4353)
```

Here's how we did this.

### Better concurrency in `ipfs-log`

Certain expensive operations in `ipfs-log` have been refactored to be concurrent instead of serial.

Relevant PRs:
- [ipfs-log/pull/261](https://github.com/orbitdb/ipfs-log/pull/261)

### Concurrency Tuning

We've adjusted the default concurrency during traversal to balance load times with write performance.

Relevant PRs:
- [orbit-db-store/pull/55](https://github.com/orbitdb/orbit-db-store/pull/55)
- [orbit-db-store/pull/66](https://github.com/orbitdb/orbit-db-store/pull/66)

### Introducing the [OrbitDB Storage Adapter](https://github.com/orbitdb/orbit-db-storage-adapter)

OrbitDB keeps local-only data stores for its keystore and cache. OrbitDB uses `level` for this, but OrbitDB is now compatible with _any library that implements abstract leveldown_.

Our automated tests currently run with the following leveldown implementations

- jsondown
- sqldown
- redisdown
- leveljs
- memdown
- localdown
- fruitdown

Relevant PRs:
- [localstorage-level-migration/pull/4](https://github.com/orbitdb/localstorage-level-migration/pull/4)
- [orbit-db-cache/pull/12](https://github.com/orbitdb/orbit-db-cache/pull/12)
- [orbit-db-storage-adapter/pull/2](https://github.com/orbitdb/orbit-db-storage-adapter/pull/2)
- [orbit-db-storage-adapter/pull/1](https://github.com/orbitdb/orbit-db-storage-adapter/pull/1)
- [ipfs-log/pull/251](https://github.com/orbitdb/ipfs-log/pull/251)
- [orbit-db-identity-provider/pull/29](https://github.com/orbitdb/orbit-db-identity-provider/pull/29)
- [orbit-db-keystore/pull/30](https://github.com/orbitdb/orbit-db-keystore/pull/30)
- [orbit-db/pull/623](https://github.com/orbitdb/orbit-db/pull/623)
- [orbit-db-store/pull/76](https://github.com/orbitdb/orbit-db-store/pull/76)
- [orbit-db/pull/692](https://github.com/orbitdb/orbit-db/pull/692)
- [orbit-db-store/pull/75](https://github.com/orbitdb/orbit-db-store/pull/75)
- [orbit-db-cache/pull/15](https://github.com/orbitdb/orbit-db-cache/pull/15)
- [orbit-db/pull/687](https://github.com/orbitdb/orbit-db/pull/687)
- [orbit-db-store/pull/74](https://github.com/orbitdb/orbit-db-store/pull/74)
- [orbit-db-cache/pull/14](https://github.com/orbitdb/orbit-db-cache/pull/14)
- [orbit-db-store/pull/72](https://github.com/orbitdb/orbit-db-store/pull/72)
- [orbit-db/pull/677](https://github.com/orbitdb/orbit-db/pull/677)
- [orbit-db-identity-provider/pull/45](https://github.com/orbitdb/orbit-db-identity-provider/pull/45)
- [orbit-db/pull/674](https://github.com/orbitdb/orbit-db/pull/674)
- [orbit-db-store/pull/71](https://github.com/orbitdb/orbit-db-store/pull/71)
- [orbit-db-store/pull/69](https://github.com/orbitdb/orbit-db-store/pull/69)
- [orbit-db-identity-provider/pull/44](https://github.com/orbitdb/orbit-db-identity-provider/pull/44)
- [orbit-db-keystore/pull/36](https://github.com/orbitdb/orbit-db-keystore/pull/36)
- [localstorage-level-migration/pull/5](https://github.com/orbitdb/localstorage-level-migration/pull/5)
- [orbit-db-keystore/pull/35](https://github.com/orbitdb/orbit-db-keystore/pull/35)
- [orbit-db-keystore/pull/34](https://github.com/orbitdb/orbit-db-keystore/pull/34)
- [orbit-db/pull/674](https://github.com/orbitdb/orbit-db/pull/674)

#### Things the reader should know

1. A Cache schema migration is required for 0.21 -> 0.22. **The migration
should happen automatically with no user action,** but if you have problems
create an issue in [orbitdb/orbit-db](https://github.com/orbitdb/orbit-db).
2. This is not required, but we are moving toward a first-principle of OrbitDB being a singleton orchestrator for _an entire_ node.


## Other Options

- Custom Sort function - You can now pass in `sortFn` to `orbitdb.create` to provide your own, custom sorting algorithm.
- Timeout - The Timeout option is now passed through all `ipfs-log` fetches and traversals.
- skipManifest - This option allows the user to skip the manifest step when using a custom access controller.
- `format` options - `orbit-db-io` now supports ProtoBuf, CBOR, and Raw formats when creating DAG nodes.

Relevant PRs:

Adding timeout option to ipfs-log `from[a-zA-Z]*` functions:
- [ipfs-log/pull/259](https://github.com/orbitdb/ipfs-log/pull/259)
- [ipfs-log/pull/258](https://github.com/orbitdb/ipfs-log/pull/258)
- [orbit-db-store/pull/61](https://github.com/orbitdb/orbit-db-store/pull/61)

skipManifest:
- [orbit-db-access-controllers/pull/33](https://github.com/orbitdb/orbit-db-access-controllers/pull/33)
- [orbit-db/pull/631](https://github.com/orbitdb/orbit-db/pull/631)

format option:
- [orbit-db/pull/625](https://github.com/orbitdb/orbit-db/pull/625)


### Concurrent Browser Tab support:

Browser users can now utilize multiple tabs with the same OrbitDB ID and expect deterministic sorting

Relevant PRs:
- [orbit-db/pull/651](https://github.com/orbitdb/orbit-db/pull/651)
- [orbit-db-store/pull/59](https://github.com/orbitdb/orbit-db-store/pull/59)

### entryIndex module

Further refactoring of our codebase to allow the entryIndex to be more swappable and pluggable in `ipfs-log`:

- [ipfs-log/pull/254/files](https://github.com/orbitdb/ipfs-log/pull/254/files)

### Hash tiebreaker

We've extended the Lamport Clock model so that not only does it match by "time" and fall back to "ID", but now there's a third fallback layer - the "content ID":

So if the same ID writes the same time from two different devices, it will compare the hashes to finally complete the sort deterministically.

- [ipfs-log/pull/257](https://github.com/orbitdb/ipfs-log/pull/257)

---------------------------

## Other Stuff

### js-ipfs 0.37 support

We now support js-ipfs 0.37 across the board. We're also working on supporting 0.38, and already have that enabled in the `develop` branch in orbitdb/orbit-db.

Relevant PRs:
- [orbit-db/pull/644](https://github.com/orbitdb/orbit-db/pull/644)
- [orbit-db-access-controllers/pull/34](https://github.com/orbitdb/orbit-db-access-controllers/pull/34)
- [orbit-db-store/pull/56](https://github.com/orbitdb/orbit-db-store/pull/56)
- [ipfs-log/pull/253](https://github.com/orbitdb/ipfs-log/pull/253)
- [orbit-db-io/pull/4](https://github.com/orbitdb/orbit-db-io/pull/4)

### Refactor: identity.id instead of identity.key

We're now using `identity.id` instead of `identity.key` in the access controllers.

- [orbit-db-access-controllers/pull/32](https://github.com/orbitdb/orbit-db-access-controllers/pull/32)

### New formats in ipfs-io

You can now write the arguments for orbit-db-io directly, without needing to stringify.

- [orbit-db-io/pull/3](https://github.com/orbitdb/orbit-db-io/pull/3)

### A metafield in the manifest

Users now have the ability to add additional data to the db manifest. This could be useful when wanting to package information with the db that should not change during the lifetime of the db. An example could be adding a public ECDH key that the owner of the db controls. (Thanks, [@tabcat](https://github.com/tabcat)!)

- [orbitdb/orbit-db/pull/681](https://github.com/orbitdb/orbit-db/pull/681)

### General bugfixes and updates:

To save you reading endless issues you may have already known about, here is a general list of PRs with bugfixes and updates. The tl:dr of this is that we've made OrbitDB better, and you shouldn't have to change anything for these to take effect.

- [orbit-db-identity-provider/pull/40](https://github.com/orbitdb/orbit-db-identity-provider/pull/40)
- [orbit-db-access-controllers/pull/36](https://github.com/orbitdb/orbit-db-access-controllers/pull/36)
- [orbit-db-keystore/pull/32/files](https://github.com/orbitdb/orbit-db-keystore/pull/32/files)
- [orbit-db-io/pull/5/files](https://github.com/orbitdb/orbit-db-io/pull/5/files)
- [orbit-db/pull/643](https://github.com/orbitdb/orbit-db/pull/643)
- [orbit-db/pull/624](https://github.com/orbitdb/orbit-db/pull/624)
- [orbit-db/pull/627](https://github.com/orbitdb/orbit-db/pull/627)
- [orbit-db-keystore/pull/28](https://github.com/orbitdb/orbit-db-keystore/pull/28)
- [orbit-db-keystore/pull/26](https://github.com/orbitdb/orbit-db-keystore/pull/26)
- [orbit-db/pull/675](https://github.com/orbitdb/orbit-db/pull/675)
- [orbit-db-store/pull/67](https://github.com/orbitdb/orbit-db-store/pull/67)
- [orbit-db/pull/662](https://github.com/orbitdb/orbit-db/pull/662)
- [orbit-db-store/pull/62](https://github.com/orbitdb/orbit-db-store/pull/62)

And of course, we also have merged lots of tests and doc fixes:
- [orbit-db/pull/652](https://github.com/orbitdb/orbit-db/pull/652)
- [ipfs-log/pull/256/files](https://github.com/orbitdb/ipfs-log/pull/256/files)
- [orbit-db-identity-provider/pull/33](https://github.com/orbitdb/orbit-db-identity-provider/pull/33)
- [orbit-db-cache/pull/13](https://github.com/orbitdb/orbit-db-cache/pull/13)
- [orbit-db/pull/641](https://github.com/orbitdb/orbit-db/pull/641)
- [orbit-db/pull/637](https://github.com/orbitdb/orbit-db/pull/637)
- [orbit-db/pull/636](https://github.com/orbitdb/orbit-db/pull/636)
- [orbit-db/pull/693](https://github.com/orbitdb/orbit-db/pull/693)
- [orbit-db/pull/689](https://github.com/orbitdb/orbit-db/pull/689)
- [orbit-db/pull/684](https://github.com/orbitdb/orbit-db/pull/684)
- [orbit-db-store/pull/70](https://github.com/orbitdb/orbit-db-store/pull/70)
- [ipfs-log/pull/264](https://github.com/orbitdb/ipfs-log/pull/264)
- [orbit-db-store/pull/68](https://github.com/orbitdb/orbit-db-store/pull/68)
- [orbit-db-identity-provider/pull/43](https://github.com/orbitdb/orbit-db-identity-provider/pull/43)
- [orbit-db-identity-provider/pull/41](https://github.com/orbitdb/orbit-db-identity-provider/pull/41)
- [orbit-db/pull/658](https://github.com/orbitdb/orbit-db/pull/658)

And that's it! As always, if you have any questions, reach out to us on GitHub at any of the relevant repositories, or on [our Gitter](https://gitter.im/orbitdb/Lobby).