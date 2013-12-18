# zuul-mp [![build status](https://secure.travis-ci.org/thlorenz/zuul-mp.png)](http://travis-ci.org/thlorenz/zuul-mp)

Runs your mocha tests with zuul and phantomjs locally or on a build server.

![zuul-mp](https://github.com/thlorenz/zuul-mp/raw/master/assets/zuul-mp.gif)

## Installation

    npm install zuul-mp

## Usage

Invoke `zuul-mp` with the same arguments you would pass to [zuul](https://github.com/defunctzombie/zuul).

You can also include arguments for [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs#usage). 

#### Examples

```sh
zuul-mp test.js

# Override reporter
zuul-mp test.js --reporter list

# Override default port
zuul-mp test.js --local 3100
```

Here `--reporter list` is picked up by mocha-phantomjs and all other arguments by zuul.

Additionally the [`.zuul.yml`](https://github.com/defunctzombie/zuul/wiki/Zuul.yml) is picked up and treated the exact
same way as it is when running zuul directly.

## API

You can use zuul-mp's main function directly to launch it from other tools.

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="zuulmp"><span class="type-signature"></span>zuulmp<span class="signature">(args, cwd, cb)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Starts up a zuul server and runs mocha-phantomjs against it.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>args</code></td>
<td class="type">
<span class="param-type">Array.&lt;String></span>
</td>
<td class="description last"><p>arguments passed to zuul and phantomjs</p></td>
</tr>
<tr>
<td class="name"><code>cwd</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>working directory to be used for zuul and mocha-phantomjs</p></td>
</tr>
<tr>
<td class="name"><code>cb</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>called back with eventual error and the exit code (0 if all went good)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/zuul-mp/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/zuul-mp/blob/master/index.js#L54">lineno 54</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
