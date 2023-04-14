async function main() {
  console.log('hello world')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
