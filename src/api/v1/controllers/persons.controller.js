//===========================================
//FIC: New Controllers for WEB/PWA ¡NO SAP!
//===========================================
//FIC: Add Many Persons for WEB/PWA
export const addManyPersonsPWA = async (req, res, next) => {
    try {
        const personsAdded = await personsServices.addManyPersonsPWA(req.body);
        if (personsAdded.fail) {
            res.status(409).json(personsAdded);
        } else if (personsAdded.success) {
            res.status(201).json(personsAdded);
        }
    } catch (error) {
        next(error);
    }
};