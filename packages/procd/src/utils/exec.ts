import { exec } from 'child_process';

function execClean (cmd, cb) {
  exec(cmd, (err, out) => {
    if (out && out.toString() !== '') cb(null, out.toString().trim());
    else cb(err);
  });
}

export {
  execClean
};
