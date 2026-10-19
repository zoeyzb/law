import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('index.html');
const html = readFileSync(source, 'utf8');
if (!html.includes('<!DOCTYPE html>') || !html.includes('</html>')) {
  throw new Error('index.html is missing or incomplete');
}

mkdirSync(resolve('dist'), { recursive: true });
copyFileSync(source, resolve('dist/index.html'));
console.log('Built dist/index.html');
