export const notfound = (req, res, next)=>{
    res.status(400).json({message:`Not found ${req.originalUrl}`})
    
}

export const errorHandler = (err, req, res, next)=>{
    console.error(200)
    console.status=
    res.statusCode && res.statusCode !==200 ? res.statusCode:500

    res.status(status).json({
        message: err.message || "Server error"
    })

}