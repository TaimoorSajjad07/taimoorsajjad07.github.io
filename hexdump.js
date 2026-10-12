// The landing page hexdump. Kept out of index.html so its CSP can forbid inline scripts.
(function () {
  var text = "zainsplace // cyber student. ctfs, bug bounties, cloud.\n";
  var dump = document.getElementById('dump');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var timer = null;

  function hex(n, w) { var s = n.toString(16); while (s.length < w) s = '0' + s; return s; }
  function printable(code) { return code >= 32 && code < 127 ? String.fromCharCode(code) : '.'; }

  function build(perRow, animate) {
    if (timer) { clearInterval(timer); timer = null; }
    var bytes = [];
    for (var i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i));
    var frag = document.createDocumentFragment();
    var pairs = [];
    for (var r = 0; r < bytes.length; r += perRow) {
      var row = document.createElement('span');
      row.className = 'row';
      var off = document.createElement('span');
      off.className = 'off';
      off.textContent = hex(r, 8);
      row.appendChild(off);
      var slice = bytes.slice(r, r + perRow);
      for (var k = 0; k < perRow; k++) {
        if (k === perRow / 2) { var g = document.createElement('span'); g.className = 'gap'; row.appendChild(g); }
        var b = document.createElement('span');
        b.className = 'b';
        b.textContent = k < slice.length ? hex(slice[k], 2) : '  ';
        b.appendChild(document.createTextNode(' '));
        row.appendChild(b);
        if (k < slice.length) { b.dataset.i = r + k; }
      }
      var bar1 = document.createElement('span'); bar1.className = 'bar'; bar1.textContent = ' |'; row.appendChild(bar1);
      for (var j = 0; j < slice.length; j++) {
        var c = document.createElement('span');
        c.className = 'c';
        c.dataset.i = r + j;
        c.textContent = printable(slice[j]);
        row.appendChild(c);
      }
      var bar2 = document.createElement('span'); bar2.className = 'bar'; bar2.textContent = '|'; row.appendChild(bar2);
      frag.appendChild(row);
    }
    dump.textContent = '';
    dump.appendChild(frag);

    var bs = dump.querySelectorAll('.b[data-i]');
    var cs = dump.querySelectorAll('.c');
    function reveal(n) { if (bs[n]) bs[n].classList.add('done'); if (cs[n]) cs[n].classList.add('done'); }
    if (!animate || reduce) {
      for (var n = 0; n < cs.length; n++) reveal(n);
    } else {
      var idx = 0;
      timer = setInterval(function () {
        reveal(idx++);
        if (idx >= cs.length) { clearInterval(timer); timer = null; }
      }, 28);
    }
  }

  dump.addEventListener('mouseover', function (e) {
    var i = e.target && e.target.dataset ? e.target.dataset.i : undefined;
    if (i === undefined) return;
    dump.querySelectorAll('[data-i="' + i + '"]').forEach(function (el) { el.classList.add('on'); });
  });
  dump.addEventListener('mouseout', function () {
    dump.querySelectorAll('.on').forEach(function (el) { el.classList.remove('on'); });
  });

  var narrow = window.matchMedia('(max-width: 40rem)');
  var started = false;
  function render() { build(narrow.matches ? 6 : 16, !started); started = true; }
  narrow.addEventListener('change', render);
  render();
})();
