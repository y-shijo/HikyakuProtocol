import axios from 'axios'

require('dotenv').config()

const EMAIL_JS_BASE_URL = 'https://api.emailjs.com/api/v1.0/email'

function sendMail(email: string, fromAddress: string, link: string, name: string, message: string) {
    console.log(`sendMail: Initilization`)

    // Construct Data
    const data = {
        service_id: process.env.EMAIL_JS_SERVICE_ID,
        template_id: process.env.EMAIL_JS_TEMPLATE_ID,
        user_id: process.env.EMAIL_JS_USER_ID,
        accessToken: process.env.EMAIL_JS_ACCESS_TOKEN,
        template_params: {
            to_address: email,
            from_address: fromAddress,
            link: link,
            name: name,
            message: message,
        },
    }

    // Send email
    axios.post(EMAIL_JS_BASE_URL + '/send', data)
    console.log(`sendMail: Mail sent with params ${JSON.stringify(data.template_params, null, 2)}`)
}

export { sendMail }
