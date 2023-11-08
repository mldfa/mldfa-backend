import {  addNewSponsorService, getSponsorExcelService } from "../services/sponsor.services.js";


const addNewSponsorController = async (req, res) => {
    const sponsor = await addNewSponsorService(req.body);
    if (!sponsor)
    {
        res.status(400).json({
            error: 400,
            message: 'Invalid Sponsor Data'
        });
    }
    else {
        res.json(sponsor);
    }
}

const getSponsorExcelController = async (req, res) => {

    await getSponsorExcelService(res);
}

export {
    addNewSponsorController,
    getSponsorExcelController
};