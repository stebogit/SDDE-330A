const execSync = require('child_process').execSync
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const parser = new xml2js.Parser({ attrkey: 'ATTR' })
const dir = '../neo4j-4.4/community'
const allComponents = getComponentList()
const results = {}

main()

////////////////////////////////////////

async function main () {
  for (const component of allComponents) {
    const instability = await calculateInstability(component)
    if (instability === false) continue
    const abstraction = await calculateAbstraction(component)
    if (abstraction === false) continue
    results[component] = {
      instability, abstraction,
    }
  }

  console.log(results)
}

async function calculateAbstraction (component) {
  const src = `${dir}/${component}/src`
  if (!fs.existsSync(src)) return false

  let abstractCount = 0
  const files = getFiles(`${src}/main`)
  for (const file of files) {
    if (isAbstract(file)) abstractCount += 1
  }

  const abstraction = round(abstractCount / files.length)
  return abstraction
}

async function calculateInstability (component) {
  const dependencies = await getDependencies(component)

  const fanOut = dependencies.length
  if (!fanOut) return false

  let fanIn = 0
  for (const cmpt of allComponents) {
    if (cmpt === component) continue
    const dpndcs = await getDependencies(cmpt)
    if (dpndcs.find(dp => dp === `neo4j-${component}`)) fanIn += 1
  }

  const instability = round(fanOut / (fanIn + fanOut))
  return instability
}

async function getDependencies (component) {
  let xmlFile = fs.readFileSync(path.resolve(`${dir}/${component}/pom.xml`), 'utf8')
  const result = await parser.parseStringPromise(xmlFile)

  if (!result.project.dependencies || !result.project.dependencies.length) return []

  return result.project.dependencies[0].dependency.reduce((res, d) => {
    if (d.scope !== 'test') res.push(d.artifactId[0])
    return res
  }, [])
}

function getFiles (main) {
  return execSync(`find ${main}/* -name "*.java"`, { encoding: 'utf-8' })
    .split('\n')
    .filter(file => path.basename(file, '.java') !== '' && path.basename(file, '.java') !== 'package-info')
}

function isAbstract (file) {
  const cmd = `egrep -ci 'abstract class|public interface' ${file} 2>/dev/null`
  let output
  try {
    output = execSync(cmd, { encoding: 'utf-8' })
  } catch (ex) {
    output = ex.stdout
  }

  return output.replace('\n', '') > 0
}

function getComponentList () {
  return execSync(`for dir in ${dir}/*/; do echo "$dir"; done`, { encoding: 'utf-8' })
    .split('\n')
    .map(l => l.replace(`${dir}/`, '').replace(`/`, ''))
    .filter(l => l !== '')
}

function round (num) {
  return Math.round(num * 100) / 100
}

/*
{
  'batch-insert': { instability: 0.8, abstraction: 0.33 },
  bolt: { instability: 0.83, abstraction: 0.26 },
  buffers: { instability: 0.67, abstraction: 0 },
  capabilities: { instability: 0.78, abstraction: 0.31 },
  codegen: { instability: 0.93, abstraction: 0.28 },
  collections: { instability: 0.47, abstraction: 0.31 },
  'command-line': { instability: 0.38, abstraction: 0.44 },
  common: { instability: 0.22, abstraction: 0.44 },
  concurrent: { instability: 0.75, abstraction: 0.5 },
  configuration: { instability: 0.57, abstraction: 0.15 },
  'consistency-check': { instability: 0.92, abstraction: 0.2 },
  csv: { instability: 0.86, abstraction: 0.37 },
  'data-collector': { instability: 0.89, abstraction: 0.14 },
  dbms: { instability: 0.81, abstraction: 0.18 },
  diagnostics: { instability: 0.5, abstraction: 0.75 },
  fabric: { instability: 0.8, abstraction: 0.23 },
  'fulltext-index': { instability: 0.67, abstraction: 0.03 },
  'graph-algo': { instability: 0.86, abstraction: 0.35 },
  'graphdb-api': { instability: 0.46, abstraction: 0.51 },
  'id-generator': { instability: 0.75, abstraction: 0.22 },
  'import-tool': { instability: 0.9, abstraction: 0 },
  'import-util': { instability: 0.83, abstraction: 0.41 },
  index: { instability: 0.79, abstraction: 0.25 },
  io: { instability: 0.47, abstraction: 0.46 },
  'kernel-api': { instability: 0.77, abstraction: 0.64 },
  kernel: { instability: 0.74, abstraction: 0.27 },
  layout: { instability: 0.33, abstraction: 0.13 },
  lock: { instability: 0.6, abstraction: 0.5 },
  logging: { instability: 0.5, abstraction: 0.33 },
  'lucene-index': { instability: 0.81, abstraction: 0.28 },
  monitoring: { instability: 0.86, abstraction: 0.67 },
  native: { instability: 0.67, abstraction: 0.29 },
  'neo4j-exceptions': { instability: 1, abstraction: 0.03 },
  'neo4j-harness': { instability: 1, abstraction: 0.31 },
  neo4j: { instability: 1, abstraction: 0.29 },
  'procedure-api': { instability: 0.25, abstraction: 0.15 },
  procedure: { instability: 0.86, abstraction: 0.12 },
  'push-to-cloud': { instability: 1, abstraction: 0.33 },
  'random-values': { instability: 0.33, abstraction: 0.22 },
  'record-storage-engine': { instability: 0.84, abstraction: 0.22 },
  resource: { instability: 0.25, abstraction: 0.75 },
  schema: { instability: 0.89, abstraction: 0.43 },
  security: { instability: 0.82, abstraction: 0.24 },
  'server-api': { instability: 1, abstraction: 0.53 },
  server: { instability: 0.94, abstraction: 0.12 },
  'spatial-index': { instability: 0.67, abstraction: 0.3 },
  ssl: { instability: 0.82, abstraction: 0 },
  'storage-engine-api': { instability: 0.7, abstraction: 0.65 },
  'storage-engine-util': { instability: 0.8, abstraction: 0.17 },
  'token-api': { instability: 0.75, abstraction: 0.44 },
  unsafe: { instability: 0.5, abstraction: 0 },
  values: { instability: 0.44, abstraction: 0.39 },
  wal: { instability: 0.67, abstraction: 0.36 }
}
 */
