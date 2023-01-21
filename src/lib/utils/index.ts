import fs from 'fs';
import os from 'os';
import path from 'path';

const asyncPipe = (...fns) => x => fns.reduce(async (promise, fn) => fn(await promise), x)

const exists = val => (val !== null && val !== undefined)

// Create reusable extension checkers, such as isYaml() or isJson(), etc
const fileType = extension => fileName => {
  const ext = path.basename(fileName).split('.')
  if (ext.length > 1 && ext[1] === extension) return true
  return false
}

const fileExists = file => {
  return fs.existsSync(file)
}

// Searches backwards up the filesystem tree from $PWD
const findUp = (filePath) => {
  const dir = path.dirname(filePath)
  const fileName = path.basename(filePath)
  const files = fs.readdirSync(dir)
  const file = files.filter((f) => f === fileName)
  if (file.length) return path.join(dir, fileName)
  if (dir === '/' && !file.length) return ''
  return findUp(path.join(path.dirname(dir), fileName))
}

// Something like: Fri, 05/13/2022, 15:40:01 EDT
const formattedDate = (isoDateString) => {
  return  new Date(isoDateString).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    timeZoneName: 'short',
    hour12: false,
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const getAllFiles = (dirPath, filesList = []) => {
  if (!dirPath) return []
  const files = fs.readdirSync(dirPath)

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      filesList = (getAllFiles(path.join(dirPath, file), filesList))
    } else {
      filesList.push(path.join(dirPath, file))
    }
  })

  return filesList
}

const isKubernetes = () => {
  if (process.env.KUBERNETES_PORT) return true
  return false
}

const mktmpdir = (prefix) => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix))
  return tempDir
}

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

// Check that the required key has been provided
const requires = (keys) => (obj) => {
  keys.forEach((key) => {
    if (!exists(obj[key])) throw new Error(`Missing required parameter ${ key }`);
  })
  return obj;
}

const sortObjectsByDate = (objects, dateProp) => {
  return objects.sort((a, b) => {
    const bdate = new Date(b[dateProp])
    const adate = new Date(a[dateProp])
    return bdate > adate ? 1 : bdate < adate ? -1 : 0
  })
}

const tmpVersionFile = () => {
  fs.writeFileSync('/tmp/version', '0.0.0')
  return '/tmp/version'
}

const trace = label => value => {
  console.log(`\n${label}: ${JSON.stringify(value, null, 2)}\n`);
  return value;
}

export {
  asyncPipe,
  fileExists,
  fileType,
  findUp,
  formattedDate,
  getAllFiles,
  isKubernetes,
  mktmpdir,
  pipe,
  requires,
  sortObjectsByDate,
  tmpVersionFile,
  trace
}
