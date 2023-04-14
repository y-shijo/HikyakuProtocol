async function main() {
    console.log('Main: Started')

    // 1. Providerの初期化
    // provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_ENDPOINT);

    // 2. コントラクトのインスタンス
    // const contract = new ethers.Contract(コントラクトアドレス, ABI, provider);

    // 3. 試しでコントラクトと通信
    // await contract.{{スマートコントラクトの関数名}}

    // 4. Subscribeするイベントの定義
    // const eventQuery = contract.filters.ResolveRequested();

    // 5. イベントのSubscribeの開始
    /* contract.on(eventQuery, (イベントで渡される引数) => {
        const mailAddress = {{メールアドレス}}

        sendMailTo(mailAddress)
    })
    */

    // sendMailTo('yoshinobushijo02264@gmail.com')
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
