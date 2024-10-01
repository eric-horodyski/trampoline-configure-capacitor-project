#!/usr/bin/env node

import { MobileProject } from '@capacitor/trampoline';

const config = { ios: { path: 'ios/App' }, android: { path: 'android' } };
const project = new MobileProject('../', config);

await project.load();

project

console.log(project);