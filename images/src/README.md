# Images Source Folder

#### Why this is here

This folder is for the images you get pretty much anywhere - all of the images that you haven't yet optimized for the web. Put them in here, and then run:

    gulp

...which will go around shrinking them. As an example, it took the `luca-ruegg-756818-unsplash` and shrunk it down to around 8% of the size that it was before.

If you don't have Gulp installed, you can get it by doing this:

```sh
$ npm install --global gulp
# And, in this directory...
$ npm install
```

Never embed images in `images/src` in a blogpost; they should always be copied over to `images` automatically by Gulp, and that will ensure that you're serving up nice issues to your users. The way to embed them is using this syntax:

```markdown
Look at our orbiting moon!

![The moon, orbiting](images/luca-ruegg-756818-unsplash.jpg)
```

Note that the path is relative to where the Markdown file is. This will look pretty much like this:

![The moon, orbiting](images/luca-ruegg-756818-unsplash.jpg)

You _can_ add images directly to images without running Gulp, but they just won't be as small as your users might like. But that's always an option as needed.

#### Questions?

Ping [@RichardLitt](mailto:richard@burntfen.com) if you've got questions about this, on GitHub at @RichardLitt or on Twitter at [@richlitt](https://twitter.com/richlitt).
