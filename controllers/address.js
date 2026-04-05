import 'dotenv/config';

const autoComplete = async(req, res, next) => {
    try {

        const address = req.body.input;
        console.log(process.env.GOOGLE_API_KEY)
        if (!address) {
            error.status = 400;
            throw error;
        }
        
        const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                "X-Goog-Api-Key": process.env.GOOGLE_API_KEY
            },
            body: JSON.stringify({input: address})
        })
        const data = await response.json()
        res.status(200).json(data);
        
    } catch(error) {
        next(error)
    }
}

export { autoComplete }