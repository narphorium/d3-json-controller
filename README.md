# d3-json-controller

This plugin helps to bind hierarchical JSON data to D3 visualizations. You can you JSONPath queries to specify which slice of the JSON data a particular visualization uses and then register that visualization as a listener so that the controller sends the subset of that data the overlaps with the current index into the data. This allows you to have diagrams which can step through time. You can also use this to provide mouseover capabilities which extract data for whichever part of the diagram a user is hovering the mouse cursor over.

This is not an officially supported Google product.

## Installing

If you use NPM, `npm install json-controller`. Otherwise, download the [latest release](https://github.com/narphorium/d3-json-controller/releases/latest).

## API Reference

Simply pass you whole JSON object into the constructor to create a new controller:

```js
var controller = d3.JSONController(data)
```

Then, you can register visualizations like this:

```js
controller.registerListener(myViz.update.bind(myViz), '$.path.to.data')
```

Now, whenever the controller path is updated, it will call `myViz.update(data, duration, path)` where `data` is the subset of the full dataset that intersects with '$.path.to.data' and the current path of the controller. `duration` is a default animation length in milliseconds, passed from the controller so that all visualizations can update at the same speed, if you want. `path` is the materialized path for the `data` which matches both '$.path.to.data' and the current controller path.

The controller path can be set by calling:

```js
controller.goto(0, 0)
```

Where the first parameter is the path level and the second parameter is the path index. Indices should be integers to index into JSON arrays and strings to index into JSON maps. This allows use to navigate the data at multiple levels.

You can also use the UI widget to allow the user to navigate the data.

```js
var controls = controller.controls(d3.select('#widget', 0)
```

This creates HTML controls in the 'widget' element which allow the user to step through different indices at level 0 in the JSON data. Currently, only integer indices are supported by the controls widget.
