---
layout: post
title:  "OrbitDB 0.24 released"
excerpt: "Release notes for OrbitDB v0.24"
tags: []
date: 2020-5-21
author: tabcat
---

# OrbitDB v0.24.1

> Now with js-ipfs 0.44 support!

We're releasing v0.24.1 today! There's a couple fun changes in this release! Here's the tl;dr:

- JS-IPFS 0.44 support
- Store operations are now queued
- Docstore gets a new operation
- Oplog events are emitted

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
- [@lidel](https://github.com/lidel)
- [@Mistakia](https://github.com/Mistakia)
- [@msterle](https://github.com/msterle)
- [@oed](https://github.com/oed)
- [@phillmac](https://github.com/phillmac)
- [@ptoner](https://github.com/ptoner)
- [@Shamb0t](https://github.com/Shamb0t)
- [@spartanz51](https://github.com/spartanz51)
- [@tabcat](https://github.com/tabcat)
- [@tyleryasaka](https://github.com/tyleryasaka)
- [@vasa-develop](https://github.com/vasa-develop)
- [@vaultec81](https://github.com/vaultec81)
- [@vvp](https://github.com/vvp)
- [@Xmader](https://github.com/Xmader)
- [@zachferland](https://github.com/zachferland)
- And anyone else we've unintentionally left out, who has helped out or been on [the Gitter](https://gitter.im/orbitdb/Lobby) or supported us in any way.

---

#### Changes:

- [JS-IPFS 0.44 Support](#js-ipfs-0.44-support)
- [Store Operation Queue](#store-operation-queue)
- [Docstore putAll Operation](#docstore-putall-operation)
- [Oplog Events](#oplog-events)
- [orbit-db tests](#orbit-db-tests)
- [orbit-db-store sync method](#orbit-db-store-sync-method)
- [Electron Renderer FS Shim](#electron-renderer-fs-shim)
- [Re-exports](#re-exports)

### JS-IPFS 0.44 Support
Until now the newest versions of js-ipfs were not supported. This was primarly because of js-ipfs api's move to async iteration starting in version 0.41. Now js-ipfs versions 0.41-0.44 are supported.

Relevant PRs:
- https://github.com/orbitdb/orbit-db-store/pull/86
- https://github.com/orbitdb/orbit-db/pull/782

### Store Operation Queue
All included stores (and any store extending orbit-db-store v3.3.0+) now queues operations. Any update sent to a store is executed sequentially and the store's close method now awaits for the queue to empty.

Relevant PRs:
- https://github.com/orbitdb/orbit-db-store/pull/85
- https://github.com/orbitdb/orbit-db-store/pull/91

### Docstore putAll Operation
A new method was added to the docstore named 'putAll'. This method allows for multiple keys to be set in the docstore in one oplog entry. This comes with some significant [performance benefits](https://gist.github.com/phillmac/155ed1eb232e75fda4a793e7672460fd). Something to note is any nodes running an older version of the docstore will ignore any changes made by putAll operations.

Relevant PRs:
- https://github.com/orbitdb/orbit-db-docstore/pull/36

### Oplog Events
It is now possible to listen for specific store operations as they are added to the store. To learn more about how to use this you can review the [documentation](https://github.com/orbitdb/orbit-db-store#events) and look at event `log.op.${operation}`.

Relevant PRs:
- https://github.com/orbitdb/orbit-db-store/pull/87

### orbit-db tests
Tests now use [orbit-db-test-utils](https://github.com/orbitdb/orbit-db-test-utils) package to deduplicate test utilities. It had already been used in most subpackages like [orbit-db-store](https://github.com/orbitdb/orbit-db-store) but now it's used in the [orbit-db](https://github.com/orbitdb/orbit-db) repo!

Relevant PRs: 
- https://github.com/orbitdb/orbit-db-test-utils/pull/11
- https://github.com/orbitdb/orbit-db/pull/794

### orbit-db-store sync method
A method on orbit-db-store named sync is now an async method and only resolves after oplog heads have been added.

Relevant PRs:
- https://github.com/orbitdb/orbit-db-store/pull/38
- https://github.com/orbitdb/orbit-db-store/pull/84

### Electron Renderer FS Shim
Fixes a bug related to the native filesystem when used in electron.

Relevant PRs:
- https://github.com/orbitdb/orbit-db/pull/783
- https://github.com/orbitdb/orbit-db/pull/795

### Re-exports
Now import AccessControllers, Identities, and/or Keystore modules from OrbitDB with object destructuring like so:

`const { AccessControllers, Identities, Keystore } = require('orbit-db')`

Relevant PRs:
- https://github.com/orbitdb/orbit-db/pull/785

---

And that's it! As always, if you have any questions, reach out to us on GitHub at any of the relevant repositories, or on [our Gitter](https://gitter.im/orbitdb/Lobby).
