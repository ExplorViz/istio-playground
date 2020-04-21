const core = require('@actions/core');
const github = require('@actions/github');
const toolCache = require('@actions/tool-cache');
const path = require('path');

async function installIstio() {
  try {
    // `who-to-greet` input defined in action metadata file
    console.log(`Installing istio`);
    const version = core.getInput('version');
    const os = 'linux'
    const url = `https://github.com/istio/istio/releases/download/${version}/istio-${version}-${os}.tar.gz`
    const downloadIstioScript = await toolCache.downloadTool(url);
  
    const tempDirectory = path.join('home', 'actions', 'temp');
    await toolCache.extractTar(downloadIstioScript, tempDirectory);
  
    const toolPath = await toolCache.cacheDir(tempDirectory, "istio", version);
    core.addPath(path.join(toolPath, 'bin'));
    core.debug(`istio is cached under ${toolPath}`);
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

installIstio()