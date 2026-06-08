#!/usr/bin/env node
const { spawnSync } = require('child_process');
const os = require('os');
const isWindows = os.platform() === 'win32';
const ALLOWED = new Set(['node','npm','pnpm','yarn','vercel']);
function log(m){console.error(m)}
function has(c){try{if(isWindows)return spawnSync('where',[c],{stdio:'ignore'}).status===0;return spawnSync('sh',['-c','command -v "$1"','--',c],{stdio:'ignore'}).status===0}catch{return false}}
function out(c,a){try{const r=spawnSync(c,a,{encoding:'utf8',stdio:['pipe','pipe','ignore'],shell:isWindows});return r.status===0?(r.stdout||'').trim():null}catch{return null}}
log('=== Vercel CLI Install ===');
if(!has('node')){log('Node.js not installed');process.exit(1)}
log('Node: '+out('node',['-v']));
if(has('vercel')){log('Already installed: '+out('vercel',['--version']));console.log(JSON.stringify({status:'already_installed'}));process.exit(0)}
const pm=has('pnpm')?'pnpm':has('yarn')?'yarn':has('npm')?'npm':null;
if(!pm){log('No pkg manager');process.exit(1)}
log('Using: '+pm);
const cmds={pnpm:['pnpm',['add','-g','vercel']],yarn:['yarn',['global','add','vercel']],npm:['npm',['install','-g','vercel']]};
const e=cmds[pm];
const r=spawnSync(e[0],e[1],{stdio:'inherit',shell:isWindows});
if(r.status!==0){log('Install failed');process.exit(1)}
if(has('vercel')){log('Success!');console.log(JSON.stringify({status:'success'}))}else{log('Failed');process.exit(1)}
