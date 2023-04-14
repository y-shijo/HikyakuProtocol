async function main() {
    console.log('Main: Started')

    // sendMailTo('yoshinobushijo02264@gmail.com')
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
