export const fetchErrorHandler = (err: any) => {
    if (!err) return
    switch (err.code) {
        case 404:
            // Error handler
            break
        default:
        // Default
    }
}
