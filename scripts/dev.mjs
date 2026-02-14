import { spawn } from 'node:child_process';

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const spawnOptions = {
  stdio: 'inherit',
  shell: process.platform === 'win32'
};

const processes = [
  { name: 'backend', child: spawn(npmCommand, ['run', 'dev', '--prefix', 'backend'], spawnOptions) },
  { name: 'front', child: spawn(npmCommand, ['run', 'dev', '--prefix', 'front'], spawnOptions) }
];

let shuttingDown = false;

const stopAll = (exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const { child } of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }

  setTimeout(() => process.exit(exitCode), 300).unref();
};

for (const { name, child } of processes) {
  child.on('error', (error) => {
    console.error(`[${name}] failed to start`, error);
    stopAll(1);
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    if (code === 0 || signal === 'SIGTERM' || signal === 'SIGINT') {
      stopAll(0);
      return;
    }

    console.error(
      `[${name}] exited unexpectedly` +
        (typeof code === 'number' ? ` (code: ${code})` : '') +
        (signal ? ` (signal: ${signal})` : '')
    );
    stopAll(typeof code === 'number' ? code : 1);
  });
}

process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
