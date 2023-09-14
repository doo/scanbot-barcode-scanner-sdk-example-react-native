import chokidar from 'chokidar';
import fs from 'fs';

const srcDir = 'node_modules/react-native-scanbot-barcode-scanner-sdk/';
const destDir = '../../scanbot-barcode-sdk-react-native/';

console.log('Local SDK files synchronize started.');

const watcher = chokidar.watch(srcDir, {
  ignored:
    /((^|[/\\])\..)|(scanbot-barcode-scanner-sdk\/node_modules.*)|(ios\/Pods.*)|(android\/build.*)/, // ignore dotfiles
  persistent: true,
});

watcher.on('add', file => {
  console.log('Adding ' + file.replace(srcDir, ''));
});

watcher.on('change', file => {
  console.log('\nSynchronizing source file: ' + file.replace(srcDir, ''));
  const src = file;
  const dst = file.replace(srcDir, destDir);
  const options = {overwrite: true, recursive: true};
  fs.cp(src, dst, options, () => {
    console.log('\nCopied ' + src + ' to ' + dst);
  });
});
