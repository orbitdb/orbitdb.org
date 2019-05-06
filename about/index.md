---
layout: page
title: About OrbitDB
excerpt: "About OrbitDB"
---

<h1 class="site-description center" itemprop="description">Peer-to-Peer Databases for the Decentralized Web</h1>

<p class="center"><a href="https://gitter.im/orbitdb/Lobby"><img src="https://img.shields.io/gitter/room/nwjs/nw.js.svg" alt="Gitter"/></a> <a href="https://circleci.com/gh/orbitdb/orbit-db" alt="CircleCI Status"><img src="https://circleci.com/gh/orbitdb/orbit-db.svg?style=shield" /></a>
<a href="https://www.npmjs.com/package/orbit-db" alt="npm version"><img src="https://badge.fury.io/js/orbit-db.svg" /></a>
<a href="https://www.npmjs.com/package/orbit-db" alt="node"><img src="https://img.shields.io/node/v/orbit-db.svg" /></a></p>

OrbitDB is a **serverless, distributed, peer-to-peer database**. OrbitDB uses [IPFS](https://ipfs.io) as its data storage and [IPFS Pubsub](https://github.com/ipfs/go-ipfs/blob/master/core/commands/pubsub.go#L23) to automatically sync databases with peers. It's an eventually consistent database that uses [CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type) for conflict-free database merges making OrbitDB an excellent choice for decentralized apps (dApps), blockchain applications and offline-first web applications.

**Test it live at [Live demo 1](https://ipfs.io/ipfs/QmeESXh9wPib8Xz7hdRzHuYLDuEUgkYTSuujZ2phQfvznQ/), [Live demo 2](https://ipfs.io/ipfs/QmasHFRj6unJ3nSmtPn97tWDaQWEZw3W9Eh3gUgZktuZDZ/), or [P2P TodoMVC app](https://ipfs.io/ipfs/QmTJGHccriUtq3qf3bvAQUcDUHnBbHNJG2x2FYwYUecN43/)**!


OrbitDB provides various types of databases for different data models and use cases:

- **[log](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdblognameaddress)**: an immutable (append-only) log with traversable history. Useful for *"latest N"* use cases or as a message queue.
- **[feed](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbfeednameaddress)**: a mutable log with traversable history. Entries can be added and removed. Useful for *"shopping cart"* type of use cases, or for example as a feed of blog posts or "tweets".
- **[keyvalue](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbkeyvaluenameaddress)**: a key-value database just like your favourite key-value database.
- **[docs](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbdocsnameaddress-options)**: a document database to which JSON documents can be stored and indexed by a specified key. Useful for building search indices or version controlling documents and data.
- **[counter](https://github.com/orbitdb/orbit-db/blob/master/API.md#orbitdbcounternameaddress)**: Useful for counting events separate from log/feed data.

All databases are [implemented](https://github.com/orbitdb/orbit-db-store) on top of [ipfs-log](https://github.com/orbitdb/ipfs-log), an immutable, operation-based conflict-free replicated data structure (CRDT) for distributed systems. If none of the OrbitDB database types match your needs and/or you need case-specific functionality, you can easily [implement and use a custom database store](https://github.com/orbitdb/orbit-db/blob/master/GUIDE.md#custom-stores) of your own.

## Sponsors

OrbitDB is an open source, open project. Anyone can jump in and hack on it; anyone can create submodules that use it or get involved in the planning project. That having been said, much of the work is currently funded and run by members of [Haja Networks](https://haja.io/).

Other sponsors of work on OrbitDB include:

- [Protocol Labs](https://protocol.ai)
- [Maintainer Mountaineer](https://maintainer.io) and [Burnt Fen Creative](https://burntfen.com)

# Contact

{% include contact.html %}
