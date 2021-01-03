import os from 'os';
import { exec } from 'child_process';
import async from 'async';

import { COMMANDS, EXPR } from '../utils/constants';
import { execClean } from '../utils/exec';

function interfaceTypeFor (name, cb) {
  exec(
    `${COMMANDS.INTERFACE_TYPE}${name}`,
    (err) => cb(null, err ? EXPR.WIRED : EXPR.WIRELESS)
  );
}

function macAddrFor (name, cb) {
  execClean(
    `${COMMANDS.MAC_ADDR_PRFX}${name}${COMMANDS.MAC_ADDR_SFFX}`,
    cb
  );
}

function gatewayIPFor (name, cb) {
  execClean(
    `${COMMANDS.GATEWAY_IP_PRFX}${name}${COMMANDS.GATEWAY_IP_SFFX}`,
    cb
  );
}

function netmaskFor (name, cb) {
  execClean(
    `${COMMANDS.NETMASK_PRFX}${name}${COMMANDS.NETMASK_SFFX}`,
    cb
  );
}

function getActiveInterface (cb) {
  exec(
    COMMANDS.ACTIVE_INTERFACE,
    (err, stdout) => {
      if (err) return cb(err);

      const out = stdout
        .toString()
        .trim()
        .split('\n');

      if (out.length === 0 || out[0] === '') return cb(new Error('Not found'));
      cb(null, out[0]);
    }
  );
}

function getInterfaces (cb) {

  let count = 0;

  const stdoutF = [];
  const devs = os.networkInterfaces();

  for (const key in devs) {
    if (key !== EXPR.LOOPBACK_1 && key !== EXPR.LOOPBACK_2 && !key.match(/^tun/)) {

      count++;
      const obj = { name: key };

      devs[key].forEach(({ family, address }) => {
        if (family == EXPR.IPV4) Object.assign(obj, { ip_address: address });
      });

      ((obj) => {
        const { name } = obj;

        async.parallel([
          (cb) => macAddrFor(name, cb),
          (cb) => gatewayIPFor(name, cb),
          (cb) => netmaskFor(name, cb),
          (cb) => interfaceTypeFor(name, cb)
        ],
        (err, results) => {
          Object.assign(
            obj,
            {
              mac_address: results[0],
              gateway_ip: results[1],
              netmask: results[2],
              type: results[3]
            }
          );

          stdoutF.push(obj);
          --count || cb(null, stdoutF);
        });
      })(obj);
    }
  }

  if (count === 0) cb(new Error('Not found'));
}

export {
  interfaceTypeFor,
  macAddrFor,
  gatewayIPFor,
  netmaskFor,
  getActiveInterface,
  getInterfaces
};
