import { getAllSponsorsService, editSponsorService, addNewSponsorService } from "../services/sponsor.services.js";


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

const getAllSponsorsController = async (req, res) => {
    const sponsors = await getAllSponsorsService();
    if (!sponsors)
    {
        res.status(500).json({
            error: 500,
            message: 'Unable To Retrieve All Sponsors'
        })
    }
    else
        res.json(sponsors);
}

const editSponsorController = async (req, res) => {
    const editedSponsor = await  editSponsorService(req.body);

    if (!editedSponsor)
    {
        res.status(400).json({
            error: 400,
            message: 'Data Provided Is Invalid'
        });
    }
    else
    {
        res.json(editedSponsor);
    }
}

export {
    addNewSponsorController,
    getAllSponsorsController,
    editSponsorController
};