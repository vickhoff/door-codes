import 'dotenv/config';

const autoComplete = async(req, res, next) => {
    try {

        const address = req.body.input;
        if (!address) {
            const err = new Error('Input is required');
            err.status = 400;
            throw err;
        }
        
        const response = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
                "X-Goog-Api-Key": process.env.GOOGLE_API_KEY
            },
            body: JSON.stringify({
                input: address,
                "includedPrimaryTypes": ["address"],
                "locationBias": {
                    "circle": {
                        "center": {
                            "latitude": 62.45211239799033,
                            "longitude": 15.279218389073096
                        },
                        "radius": 50000.0
                    }
                }
            })
        })
        const data = await response.json()
        res.status(200).json(data);
        
    } catch(error) {
        next(error)
    }
}

export { autoComplete }