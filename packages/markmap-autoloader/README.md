# markmap-autoloader

![NPM](https://img.shields.io/npm/v/markmap-autoloader.svg)
![License](https://img.shields.io/npm/l/markmap-autoloader.svg)
![Downloads](https://img.shields.io/npm/dt/markmap-autoloader.svg)

Load markmaps automatically in HTML.

## Usage

HTML:

```html
<style>
.markmap > svg {
  width: 100%;
  height: 300px;
}
</style>

<div class="markmap">
- markmap
  - autoloader
  - transformer
  - view
</div>
```

Autoload all elements matching `.markmap`:

```html
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader"></script>
```

Load manually:

```html
<script>
window.markmap = {
  autoLoader: { manual: true },
};
</script>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader"></script>
<script>
// Render in 5s
setTimeout(() => {
  markmap.autoLoader.renderAll();
}, 5000);
</script>
```

Disable built-in plugins:

```html
<script>
window.markmap = {
  autoLoader: {
    transformPlugins: [],
  },
};
</script>
<script src="https://cdn.jsdelivr.net/npm/markmap-autoloader"></script>
```

## API

### Options

If `window.markmap.autoLoader` is defined before this package is loaded, it will be regarded as autoLoader options.

- `autoLoader.manual` *boolean* default as `false`

    Whether to render markmaps manually. If false, all elements matching `.markmap` will be rendered once this package loads or DOMContentLoaded is emitted, whichever later.

- `autoLoader.transformPlugins` *ITransformPlugin[]*

    Override built-in plugins if provided. Set to `[]` to disable all built-in plugins for auto-loader.

- `autoLoader.onReady` *function*

    Callback when markmap-lib/markmap-view and their dependencies are loaded. We can tweak global options in this callback.

### markmap.autoLoader.renderAll()

Render all elements matching `.markmap`.

### markmap.autoLoader.renderAllUnder(el)

Render all elements matching `.markmap` under container `el`.

### markmap.autoLoader.render(el)

Render markmap in `el`, which is supposed to have the class name `markmap`.
