const { FuseBox, CSSPlugin, BabelPlugin, WebIndexPlugin } = require("fuse-box");

const fuse = FuseBox.init({
  homeDir: "src",
  output: "dist/$name.js",
  plugins: [
    CSSPlugin(),
	BabelPlugin({
	    presets: ["es2015"]
	}),
    WebIndexPlugin({
		title: 'Pixi Task',
		path: ".",
		template: 'index.html'
	})
  ]
});

fuse.dev();

fuse.bundle("app")
  .instructions("> index.js")
  .watch()
  .hmr();

fuse.run();
