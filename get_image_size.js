const fs = require('fs');
['public/LxColorWall.png', 'public/lxcolorwalldark.png', 'public/colorwall.png'].forEach(f => {
  const b = Buffer.alloc(24);
  const fd = fs.openSync(f, 'r');
  fs.readSync(fd, b, 0, 24, 0);
  fs.closeSync(fd);
  console.log(f, b.readUInt32BE(16) + 'x' + b.readUInt32BE(20));
});
