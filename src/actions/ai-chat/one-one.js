import axios from "axios"

export default async function oneOneChatAction(message) {
    try {
        const response = await axios.post('api/ai-interview/one-one', message, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: 'include',
        })

        // console.log("AI Response:", response.data.response)

        if (response.status === 200) {
            return response.data.response
        } else {
            return "sorry, I didn't understand that. Could you please repeat?"
        }
        
    } catch (error) {
        console.error(error)
    }
}