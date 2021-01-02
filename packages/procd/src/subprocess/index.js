const os = require('os');
const exec = require('child_process').exec;
const async = require('async');

function execClean(cmd, cb) {
  exec(cmd, (err, out) => {
    if (out && out.toString() !== '') cb(null, out.toString().trim());
    else cb(err);
  });
}


function getActiveInterface (cb) {
  const cmd = "netstat -rn | grep UG | awk '{print $NF}'";
  exec(cmd, (err, stdout) => {
    if (err) return cb(err);

    const raw = stdout
      .toString()
      .trim()
      .split('\n');

    if (raw.length === 0 || raw === [ '' ]) return cb(new Error('No active network interface found.'));
    cb(null, raw[0]);
  });
};

function interfaceTypeFor (name, cb) {
  exec('cat /proc/net/wireless | grep ' + name, (err, out) => cb(null, err ? 'Wired' : 'Wireless'));
};

function macAddrFor (name, cb) {
  const cmd = 'cat /sys/class/net/' + name + '/address';
  execClean(cmd, cb);
};

function gatewayIPFor (name, cb) {
  execClean("ip r | grep " + name + " | grep default | cut -d ' ' -f 3 | head -n1", cb);
};

function netmaskFor (name, cb) {
  const cmd = "ifconfig " + name + " 2> /dev/null | egrep 'netmask|Mask:' | awk '{print $4}' | sed 's/Mask://'";
  execClean(cmd, cb);
};

function getInterfaces (cb) {

  let count = 0;

  const list = [];
  const nics = os.networkInterfaces();

  for (const key in nics) {
    if (key !== 'lo0' && key !== 'lo' && !key.match(/^tun/)) {

      count++;
      const obj = { name: key };

      nics[key].forEach(({ family, address }) => {
        if (family == 'IPv4') {
          obj.ip_address = address;
        }
      });

      (function (obj) {
        const { name } = obj;

        async.parallel([
          (cb) => macAddrFor(name, cb),
          (cb) => gatewayIPFor(name, cb),
          (cb) => netmaskFor(name, cb),
          (cb) => interfaceTypeFor(name, cb)
        ],
        (err, results) => {

          if (results[0]) obj.mac_address = results[0];
          if (results[1]) obj.gateway_ip = results[1];
          if (results[2]) obj.netmask = results[2];
          if (results[3]) obj.type = results[3];

          list.push(obj);
          --count || cb(null, list);
        });
      })(obj);
    }
  }

  if (count == 0)
    cb(new Error('No interfaces found.'))
}

getInterfaces((err, list) => {
  if (err) console.log(err);
  else console.log(list);
});
