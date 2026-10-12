// The landing page hexdump: a real dump of #dump's data-text, typed in once.
// Kept out of index.html so its CSP can forbid inline scripts.
(function () {
  var dump = document.getElementById('dump');
  if (!dump) return;
  var text = dump.getAttribute('data-text') || '';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var narrow = window.matchMedia('(max-width: 40rem)');
  var timer = null;
  var perRow = 16;
  var rows = [];       // [start, end) byte ranges, one per printed row
  var lit = -1;        // the byte lit with its character, or -1
  var pinned = false;  // a tap keeps it lit until the next tap
  var started = false;

  function hex(n, w) { var s = n.toString(16); while (s.length < w) s = '0' + s; return s; }
  function printable(code) { return code >= 32 && code < 127 ? String.fromCharCode(code) : '.'; }

  // Rows break after a space, so every word stays whole on its row; a word longer than a
  // row is the only thing ever split. Offsets still give each row's true byte position.
  function layout(bytes) {
    var tokens = [], t = 0, out = [], cur = null;
    for (var k = 0; k < bytes.length; k++) {
      if (bytes[k] === 32 || bytes[k] === 10 || k === bytes.length - 1) { tokens.push([t, k + 1]); t = k + 1; }
    }
    tokens.forEach(function (tok) {
      if (cur && tok[1] - cur[0] <= perRow) { cur[1] = tok[1]; return; }
      if (cur) out.push(cur);
      var s = tok[0];
      while (tok[1] - s > perRow) { out.push([s, s + perRow]); s += perRow; }
      cur = [s, tok[1]];
    });
    if (cur) out.push(cur);
    return out;
  }

  function build(animate) {
    if (timer) { clearInterval(timer); timer = null; }
    var bytes = [];
    for (var i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i));
    rows = layout(bytes);
    var frag = document.createDocumentFragment();
    for (var ri = 0; ri < rows.length; ri++) {
      var r = rows[ri][0];
      var row = document.createElement('span');
      row.className = 'row';
      var off = document.createElement('span');
      off.className = 'off';
      off.textContent = hex(r, perRow < 16 ? 4 : 8);
      row.appendChild(off);
      var slice = bytes.slice(r, rows[ri][1]);
      for (var k = 0; k < perRow; k++) {
        if (k === perRow / 2) { var g = document.createElement('span'); g.className = 'gap'; row.appendChild(g); }
        var b = document.createElement('span');
        b.className = 'b';
        b.textContent = k < slice.length ? hex(slice[k], 2) : '  ';
        b.appendChild(document.createTextNode(' '));
        row.appendChild(b);
        if (k < slice.length) b.dataset.i = r + k;
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
    if (lit >= 0) { var keep = lit; lit = -1; light(keep); }

    var bs = dump.querySelectorAll('.b[data-i]');
    var cs = dump.querySelectorAll('.c');
    function reveal(n) { bs[n].classList.add('done'); cs[n].classList.add('done'); }
    function cursor(n) {
      var old = dump.querySelectorAll('.cur');
      for (var o = 0; o < old.length; o++) old[o].classList.remove('cur');
      if (n < cs.length) { bs[n].classList.add('cur'); cs[n].classList.add('cur'); }
    }
    if (!animate || reduce) {
      for (var n = 0; n < cs.length; n++) reveal(n);
      return;
    }
    var idx = 0;
    cursor(0);
    // The typing waits for the mono face, so the columns do not shift mid-line.
    var go = function () {
      if (timer || idx > 0) return;
      timer = setInterval(function () {
        reveal(idx++);
        cursor(idx);
        if (idx >= cs.length) { clearInterval(timer); timer = null; }
      }, 28);
    };
    var fonts = document.fonts && document.fonts.load ? document.fonts.load('400 1em "JetBrains Mono"') : null;
    if (fonts) { fonts.then(go, go); setTimeout(go, 800); } else go();
  }

  function light(i) {
    if (lit === i) return;
    var on = dump.querySelectorAll('.on');
    for (var o = 0; o < on.length; o++) on[o].classList.remove('on');
    lit = i;
    if (i < 0) return;
    var pair = dump.querySelectorAll('[data-i="' + i + '"]');
    for (var p = 0; p < pair.length; p++) pair[p].classList.add('on');
  }
  // The byte in the same column of the row above or below, or that row's last byte.
  function sameColumn(i, step) {
    for (var ri = 0; ri < rows.length; ri++) {
      if (i >= rows[ri][0] && i < rows[ri][1]) {
        var to = rows[ri + step];
        if (!to) return i;
        return Math.min(to[0] + (i - rows[ri][0]), to[1] - 1);
      }
    }
    return i;
  }
  function indexOf(el) { return el && el.dataset && el.dataset.i !== undefined ? Number(el.dataset.i) : -1; }

  // Mouse: the byte or character under the pointer lights its partner.
  dump.addEventListener('pointerover', function (e) { if (e.pointerType === 'mouse' && !pinned) light(indexOf(e.target)); });
  dump.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse' && !pinned) light(-1); });
  // Touch and pen: a tap pins the pair; a tap anywhere else lets it go.
  dump.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse') return;
    var i = indexOf(e.target);
    if (i >= 0) { pinned = true; light(i); }
  });
  document.addEventListener('pointerdown', function (e) {
    if (pinned && !dump.contains(e.target)) { pinned = false; light(-1); }
  });
  // Keyboard: arrows walk the bytes, Home and End jump, Escape lets go.
  dump.addEventListener('focus', function () { if (lit < 0 && dump.matches(':focus-visible')) light(0); });
  dump.addEventListener('blur', function () { if (!pinned) light(-1); });
  dump.addEventListener('keydown', function (e) {
    var last = text.length - 1;
    var i = lit < 0 ? 0 : lit;
    var next;
    switch (e.key) {
      case 'ArrowRight': next = Math.min(last, i + 1); break;
      case 'ArrowLeft': next = Math.max(0, i - 1); break;
      case 'ArrowDown': next = sameColumn(i, 1); break;
      case 'ArrowUp': next = sameColumn(i, -1); break;
      case 'Home': next = 0; break;
      case 'End': next = last; break;
      case 'Escape': pinned = false; light(-1); return;
      default: return;
    }
    e.preventDefault();
    light(next);
  });

  function render() {
    perRow = narrow.matches ? 10 : 16;
    build(!started);
    started = true;
  }
  narrow.addEventListener('change', render);
  render();
})();
