#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function updateProjectConfig(config) {
  const currentYear = new Date().getFullYear();
  
  // Update package.json
  const packageJsonPath = join(projectRoot, 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = config.projectName;
  packageJson.description = config.description;
  packageJson.author = config.author;
  
  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  // Update API title in plugins
  const pluginsPath = join(projectRoot, 'src/plugins/index.ts');
  let pluginsContent = readFileSync(pluginsPath, 'utf8');
  
  pluginsContent = pluginsContent.replace(
    'title: \'FastAPI TypeScript API\',',
    `title: '${config.apiTitle}',`
  );
  pluginsContent = pluginsContent.replace(
    'description: \'Modern API built with FastAPI and TypeScript\',',
    `description: '${config.description}',`
  );
  
  writeFileSync(pluginsPath, pluginsContent);
  
  // Update root route message
  const routesPath = join(projectRoot, 'src/routes/index.ts');
  let routesContent = readFileSync(routesPath, 'utf8');
  
  routesContent = routesContent.replace(
    'message: \'FastAPI TypeScript API Boilerplate\',',
    `message: '${config.apiTitle}',`
  );
  
  writeFileSync(routesPath, routesContent);
  
  // Update README
  const readmePath = join(projectRoot, 'README.md');
  let readmeContent = readFileSync(readmePath, 'utf8');
  
  readmeContent = readmeContent.replace(
    '# FastAPI + TypeScript API Boilerplate',
    `# ${config.apiTitle}`
  );
  readmeContent = readmeContent.replace(
    'A modern, production-ready FastAPI + TypeScript API boilerplate with comprehensive tooling and best practices for rapid development.',
    config.description
  );
  
  writeFileSync(readmePath, readmeContent);
  
  // Update LICENSE
  const licensePath = join(projectRoot, 'LICENSE');
  let licenseContent = readFileSync(licensePath, 'utf8');
  
  const copyrightHolder = config.author || config.apiTitle;
  licenseContent = licenseContent.replace(
    'Copyright (c) 2024 FastAPI TypeScript API Boilerplate',
    `Copyright (c) ${currentYear} ${copyrightHolder}`
  );
  
  writeFileSync(licensePath, licenseContent);
  
  console.log('\n✅ Project configuration updated successfully!');
  console.log(`\n📦 Project: ${config.projectName}`);
  console.log(`📝 Description: ${config.description}`);
  console.log(`👤 Author: ${config.author}`);
  console.log(`📄 License: MIT (${currentYear} ${copyrightHolder})`);
  console.log(`\n🚀 Next steps:`);
  console.log(`1. Run: pnpm install`);
  console.log(`2. Run: pnpm dev`);
  console.log(`3. Open: http://localhost:3000`);
  console.log(`4. Docs: http://localhost:3000/docs`);
}

async function main() {
  console.log('🚀 FastAPI + TypeScript Boilerplate Setup\n');
  
  const projectName = await question('Enter project name (kebab-case): ');
  const apiTitle = await question('Enter API title: ');
  const description = await question('Enter project description: ');
  const author = await question('Enter author name: ');
  
  const config = {
    projectName: projectName || 'my-api',
    apiTitle: apiTitle || 'My API',
    description: description || 'A modern API built with FastAPI and TypeScript',
    author: author || '',
  };
  
  console.log('\n📋 Configuration:');
  console.log(`Project Name: ${config.projectName}`);
  console.log(`API Title: ${config.apiTitle}`);
  console.log(`Description: ${config.description}`);
  console.log(`Author: ${config.author}`);
  
  const confirm = await question('\nProceed with this configuration? (y/N): ');
  
  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    await updateProjectConfig(config);
  } else {
    console.log('Setup cancelled.');
  }
  
  rl.close();
}

main().catch(console.error); 